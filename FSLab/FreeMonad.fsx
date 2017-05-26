(**
Free Monad - Interpreter pattern in F#
================================

An analysis of the Free Monad - Interpreter pattern in F# from a definition
created by erdeszt and based on: http://programmers.stackexchange.com/a/242803/145941

The DSL
-------

First we define a DSL for our actions. Each action points to the next action using the `'next` generic type, 
every action has a `'next` that in turn could be a DSL, thus chaining them.
*)
type DSL<'next> =
    | Set of key: string * value: string *  'next
    | Get of key: string *       (string -> 'next)
(** 
* `Get` returns a string which is passed to a function. `id` function can be used to finish the chain.
* `Set` doesn't return anything, so the `'next` portion is the next DSL element in the chain, or a constant like `()` to finish.

Note that used this way `'next` can be anything. It does not have to be a DSL value, so there is no real implication of a chain of DSLs.

This is what 3 actions in the DSL may look like.
*)
let ex1 = Set ("name", "John"
             , Get ("name"
                  , fun name -> Set ("greeting", sprintf "Hello %s" name, () )
                   )
              )
(**
`val ex1 : DSL<DSL<DSL<unit>>> =
  Set ("name","John",Get ("name",<fun:ex1@23-4>))`

Notice how the resulting type `DSL<DSL<DSL<unit>>>` is nested and not generic. 
This means a strongly type function cannot process all posible values.

The Free Monad
--------------

Here comes the Free Monad `ChainDSL` to the rescue.
*)

type ChainDSL<'a> =
    | Do     of DSL<ChainDSL<'a>>
    | Return of 'a

(**
The `Do` option creates a chain of `ChainDSL`s that ends with the `Return` option.
This chain ends up having a type equal to the last `DSL` in the chain.
This is almost like creating a `List` of `DSL`s (`List<DSL<'a>> or DSL<'a> list`), 
except that each `DSL` in the chain can be of a different type.

Lets look at the same value above with `ChainDSL`:
*)

let exF1 = Do (Set ("name", "John"
                  , Do (Get ("name"
                           , fun name -> Do (Set ("greeting", sprintf "Hello %s" name, Return () )) 
                            )
                       )
                   )
              )
(**
`val exF1 : ChainDSL<unit> =
  Do (Set ("name","John",Do (Get ("name",<fun:exF1@49-3>))))`

Compare the resulting type with the prior case: `ChainDSL<unit>` vs `DSL<DSL<DSL<unit>>>`.
No matter how deep the chain is, the value will always be of type `ChainDSL<unit>` or `ChainDSL<string>`.


But creating the chain is much more complex than before.
To solve that, lets create two helper functions: get and set.
*)
let get key       = Do (Get (key, fun value -> Return value))
let set key value = Do (Set (key,     value,   Return ()   ))    
(**
`val get : key:string -> ChainDSL<string>`

`val set : key:string -> value:string -> ChainDSL<unit>`

Notice `get` returns a `ChainDSL<string>` and `set` returns a `ChainDSL<unit>`.
They both return a `ChainDSL` chain with a single `DSL` action.

With these functions we can create Get & Set operations like this:
*)
let setName     name = set "name"     name
let getName          = get "name"
let setGreeting name = set "greeting" (sprintf "Hello %s" name)
(**
but they are not chained together like before.

Binding it together
-------------------

To chain them we will need to define a bind function for the ChainDSL.
We start with a map function for DSL, thus making DSL a functor:
*)
let mapDSL: ('a -> 'b) -> DSL<'a> -> DSL<'b> = 
    fun     f             action  ->
        match action with
        | Get (key,        fNext) -> Get (key,        fNext >> f)
        | Set (key, value,  next) -> Set (key, value,  next |> f)

(**
All `mapDSL` does is apply the function `f` to the `'next` part of the `DSL`.
In other words go to the next node in the chain.

Next we define the bind function for ChainDSL, finally making it a monad:
*)
let bindChain: ('a -> ChainDSL<'b>) -> ChainDSL<'a> -> ChainDSL<'b> =
    fun        fChain                  chainTo      ->
        let rec appendTo chain =
            match chain with
            | Return a   -> fChain a
            | Do     dsl -> Do (mapDSL appendTo dsl)
        appendTo chainTo
(** 
`bindChain` is similar and acts like the List.append function, it concatenates two chains of `ChainDSL`s. 
The difference is that the chain to be appended `fChain` is passed within a function.
`bindChain` navigates recursively down `chainTo` and replaces the last element with the result of `fChain`:

* On the `Do` side `bindChain` calls `mapDSL` to apply the function to the next `ChainDSL` node.
* On the `Return` side it replaces the 'Return a' for a call to the chain to be appended `fChain`.

In a sense `ChainDSL` is actually the opposite of a `List<DSL<'a>>`. In a List new elements are
inserted at the head, here they are attached at the tail end.

Now we can bind setName, getName & setResult from above like this: *)

let exF2 = setName "John" 
           |> bindChain (fun _    -> getName         )
           |> bindChain (fun name -> setGreeting name)

(** 
`val exF2 : ChainDSL<unit> =
  Do (Set ("name","John",Do (Get ("name",<fun:mapDSL@87-2>))))`

which is the same as this: *)

let exF3 = set "name" "John" 
           |> bindChain (fun _ -> get "name"                           )
           |> bindChain (fun v -> set "greeting" (sprintf "Hello %s" v))
(** 
`val exF3 : ChainDSL<unit> =
  Do (Set ("name","John",Do (Get ("name",<fun:mapDSL@87-2>))))`

and this: *)
let (>>=) v f = bindChain f v

let exF4 = set "name" "John" 
           >>= fun _    -> get "name" 
           >>= fun name -> set "greeting" (sprintf "Hello %s" name)
(**
`val exF4 : ChainDSL<unit> =
  Do (Set ("name","John",Do (Get ("name",<fun:mapDSL@87-2>))))`

Using Computational Expressions
-------------------------------

Now lets try it with Computational Expressions.
First we define a builder class.
*)

type ChainDSLBuilder () =
    member this.Return      v = Return v
    member this.ReturnFrom mv = mv
    member this.Zero       () = Return ()
    member this.Bind   (v, f) = v >>= f

let chainDSL = ChainDSLBuilder ()

(**
And now we use the computational expression like this.
*)

let exF5 = chainDSL {
    do!         set "name"     "John"
    let! name = get "name"
    do!         set "greeting" (sprintf "Hello %s" name)
}
(**
`val exF5 : ChainDSL<unit> =
  Do (Set ("name","John",Do (Get ("name",<fun:mapDSL@87-2>))))`

The Interpreter(s)
------------------
  
Now we are going to create an interpreter to execute the AST created.

This first version is very simple it does not store or retrieve any values, just prints out the commands.
*)
(*** define-output:interpreter1 ***)    
let rec interpreter1: ChainDSL<'a> -> 'a =
    fun               chain        ->
        match chain with
        | Return v -> printfn "return %A" v
                      v
        | Do   dsl -> 
            match dsl with
            | Get(key,        nextF) -> printfn "Get %s" key
                                        nextF (sprintf "<get.%s>" key) 
            | Set(key, value, next ) -> printfn "Set %s '%s'" key value
                                        next                           
            |> interpreter1

interpreter1 exF5
(*** include-output:interpreter1 ***)
(**
This next version actually stores and retrieves the values in a `Map` object, and when finished prints its content. 
*)
(*** define-output:interpreter2 ***)    
let interpreter2 chain = 
    let rec interpreter2r: Map<string, string> -> ChainDSL<'a> -> 'a =
        fun                dataStore              chain        ->
            match chain with
            | Return v -> printfn "return %A\n%A" v dataStore
                          v
            | Do   dsl -> 
                match dsl with
                | Get(key,        nextF) -> dataStore 
                                            |> Map.find key 
                                            |> (fun v -> printfn "Get %s -> '%s'" key v ; v )
                                            |> nextF
                                            |> interpreter2r dataStore
                | Set(key, value, next ) -> printfn "Set %s '%s'" key value
                                            next
                                            |> interpreter2r (dataStore |> Map.add key value)

    interpreter2r (Map.ofList []) chain

interpreter2 exF5
(*** include-output:interpreter2 ***)

(**
A slightly longer example:
*)

(*** define-output:interpreter2b ***)    

chainDSL {
    do!           set "first-name" "John"
    do!           set "last-name"  "Smith"
    let! first  = get "first-name"
    let! last   = get "last-name"
    do!           set "full-name" (first + " "  + last)
    let! full   = get "full-name"
    return        sprintf "Hello %s" full
}
|> interpreter2
(** Output:*)
(*** include-output:interpreter2b ***)
(** Return value:*)
(*** include-it:interpreter2b ***)
(**
Trying to replicate this last example without the computational expression 
requires explicitly nesting some of the calls.

It would look like this:

*)
(*** define-output:interpreter2c ***)    

set "first-name" "John" 
>>= fun _     -> set "last-name"  "Smith"            
>>= fun _     -> get "first-name"                    
>>= fun first -> get "last-name" 
                 >>= fun last -> set "full-name" (first + " "  + last)
>>= fun _     -> get "full-name"
>>= fun full  -> Return (sprintf "Hello %s" full)
|> interpreter2
(** Output:*)
(*** include-output:interpreter2c ***)
(** Return value:*)
(*** include-it:interpreter2c ***)

(**
Two in one
----------

So, do we really need two types, the Free Monad and the DSL?

I do not think it is necessary, the free monad helps in binding the elements of the DSL. 
The same can be achieved just by adding the `Return` option to the DSL.

Here is the same implementation with just the DSL type:
*)

module DSL2 =
    type DSL<'a> =
        | Set of key: string * value: string *  DSL<'a>
        | Get of key: string *       (string -> DSL<'a>)
        | Return of 'a
    
    let set key value = Set (key, value,          Return ())
    let get key       = Get (key,        fun v -> Return v )
    
    let bind: ('a -> DSL<'b>) -> DSL<'a> -> DSL<'b> =
        fun   fChain             chainTo ->
           let rec appendTo chain =
               match chain with
               | Set (k, v,  next) -> Set (k, v,  next |> appendTo)
               | Get (k,    fNext) -> Get (k,    fNext >> appendTo)
               | Return  v         -> fChain v
           appendTo chainTo

    let (>>=) v f = bind f v

    let interpreter2 dsl =
        let rec interpreter2r: Map<string, string> -> DSL<'a> -> 'a =
            fun                dataStore              dslR    ->
                match dslR with
                | Return v               -> printfn "return %A\n%A" v dataStore
                                            v
                | Get(key,        nextF) -> dataStore 
                                            |> Map.find key 
                                            |> (fun v -> printfn "Get %s -> '%s'" key v ; v )
                                            |> nextF
                                            |> interpreter2r dataStore
                | Set(key, value, next ) -> printfn "Set %s '%s'" key value
                                            next
                                            |> interpreter2r (dataStore |> Map.add key value)
        interpreter2r (Map.ofList []) dsl

(**
There you have it the DSL definition, helper functions, the bind function and the interpreter.
Here is the last example again.
*)
(*** define-output:dsl2 ***)    

    set "first-name" "John" 
    >>= fun _     -> set "last-name"  "Smith"            
    >>= fun _     -> get "first-name"                    
    >>= fun first -> get "last-name" 
                     >>= fun last -> set "full-name" (first + " "  + last)
    >>= fun _     -> get "full-name"
    >>= fun full  -> Return (sprintf "Hello %s" full)
    |> interpreter2
(** Output:*)
(*** include-output:dsl2 ***)
(** Return value:*)
(*** include-it:dsl2 ***)    
(*** hide ***)
interpreter2 exF1
interpreter2 exF2
interpreter2 exF3
interpreter2 exF4
interpreter2 exF5
