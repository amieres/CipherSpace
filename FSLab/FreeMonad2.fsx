(**
Free Monad - Interpreter pattern
================================

An analyisis of the Free Monad - Interpreter pattern in F#
created by erdeszt based on: http://programmers.stackexchange.com/a/242803/145941
Try1

*)
type DSL<'v, 'a> =
    | Set of key: string * value: 'v *  DSL<'v, 'a>
    | Get of key: string *       ('v -> DSL<'v, 'a>)
    | Return of 'a

let ex1 = Set ("name", "John"                          , 
              Get ("name"                              , fun name -> 
                   Set ("greeting",  sprintf "Hello %s" name, Return ())
              )
          )

let set key value = Set (key, value,          Return ())
let get key       = Get (key,        fun v -> Return v )

let setName     name = set "name" name
let getName          = get "name"
let setGreeting name = set "greeting" (sprintf "Hello %s" name)

let bind: ('a -> DSL<'v, 'b>) -> DSL<'v, 'a> -> DSL<'v, 'b> =
    fun   fChain                 chainTo     ->
       let rec appendTo: DSL<'v, 'a> -> DSL<'v, 'b> =
           fun           chain       ->
           match chain with
           | Set (k, v,  next) -> Set (k, v,  next |> appendTo)
           | Get (k,    fNext) -> Get (k,    fNext >> appendTo)
           | Return  v         -> fChain v
       appendTo chainTo

let ex2 = setName  "John"
          |> bind (fun _    -> getName)
          |> bind (fun name -> setGreeting name)

let ex3 = set "name"  "John"
          |> bind (fun _    -> get "name"                              )
          |> bind (fun name -> set "greeting" (sprintf "Hello %s" name))

let (>>=) v f = bind f v

let ex4 = setName  "John"
          >>= fun _    -> getName
          >>= fun name -> setGreeting name

let ex5 = set "name"  "John"
          >>= fun _    -> get "name"
          >>= fun name -> set "greeting" (sprintf "Hello %s" name)

type FreeDSLBuilder () =
    member this.Return     x = Return x
    member this.ReturnFrom x = x
    member this.Zero      () = Option<unit>.None
    member this.Bind (ma, f) = bind f ma

let chainDSL = FreeDSLBuilder ()
    
let ex6 = chainDSL {
    do!          setName     "John"
    let! name  = getName
    do!          setGreeting name
}
    
let ex7 = chainDSL {
    do!          set "name"      "John"
    let! name  = get "name"
    do!          set "greeting" (sprintf "Hello %s" name)
}
    
let rec interpreter1: DSL<string, 'a> -> 'a =
    fun              dsl     ->
        match dsl with
        | Return v               -> printfn "return %A" v
                                    v
        | Get(key,        nextF) -> printfn "Get %s" key
                                    nextF (sprintf "<get.%s>" key) 
                                    |> interpreter1
        | Set(key, value, next ) -> printfn "Set %s '%s'" key value
                                    next 
                                    |> interpreter1
        

interpreter1 ex1
interpreter1 ex2
interpreter1 ex3
interpreter1 ex4
interpreter1 ex5
interpreter1 ex6
interpreter1 ex7

let interpreter2 dsl =
    let rec interpreter2r: Map<string, 'v> -> DSL<'v, 'a> -> 'a =
        fun                dataStore              dslR    ->
            match dslR with
            | Return v               -> printfn "return %A\n%A" v dataStore
                                        v
            | Get(key,        nextF) -> dataStore 
                                        |> Map.find key 
                                        |> (fun v -> printfn "Get %s -> %A" key v ; v )
                                        |> nextF
                                        |> interpreter2r dataStore
            | Set(key, value, next ) -> printfn "Set %s %A" key value
                                        next
                                        |> interpreter2r (dataStore |> Map.add key value)
    interpreter2r (Map.ofList []) dsl

interpreter2 ex1
interpreter2 ex2
interpreter2 ex3
interpreter2 ex4
interpreter2 ex5
interpreter2 ex6
interpreter2 ex7

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

set "first-name" "John" 
>>= fun _     -> set "last-name"  "Smith"            
>>= fun _     -> get "first-name"                    
>>= fun first -> get "last-name" 
                 >>= fun last -> set "full-name" (first + " "  + last)
>>= fun _     -> get "full-name"
>>= fun full  -> Return (sprintf "Hello %s" full)
|> interpreter2

set "first-name" 2 
>>= fun _     -> set "last-name"  7            
>>= fun _     -> get "first-name"                    
>>= fun first -> get "last-name" 
                 >>= fun last -> set "full-name" (first + last)
>>= fun _     -> get "full-name"
>>= fun full  -> Return (sprintf "Hello %d" full)
|> interpreter2