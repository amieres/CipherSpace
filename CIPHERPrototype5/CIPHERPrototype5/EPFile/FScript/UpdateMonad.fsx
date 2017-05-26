module Test

type UpdateMonad<'TState, 'TUpdate, 'T> =  UM of ('TState -> 'TUpdate * 'T)

let inline unit<  ^S     when ^S :(static member Unit    : ^S            )> ()  : ^S = (^S : (static member Unit    : ^S           ) ()    ) 
let inline (++)<  ^S     when ^S :(static member Combine : ^S * ^S -> ^S )> a b : ^S = (^S : (static member Combine : ^S * ^S -> ^S) (a, b)) 
let inline apply< ^S, ^U when ^U :(static member Apply   : ^S * ^U -> ^S )> s a : ^S = (^U : (static member Apply   : ^S * ^U -> ^S) (s, a)) 

type UpdateBuilder() = 
  member inline x.Return(v)       :      UpdateMonad<'S, 'U, 'T>       = UM (fun s -> (unit(),v))
  member inline x.Bind(UM u1   , f:'T -> UpdateMonad<'S, 'U, 'R>)      = UM (fun s -> let (u1, x)   = u1 s
                                                                                      let (UM u2)   = f x
                                                                                      let (u2, y)   = u2 (apply s u1)
                                                                                      (u1 ++ u2, y)
                                                                            )
  member inline x.Zero()                                               = x.Return ()
  member inline x.Delay(f)                                             = x.Bind(x.Zero(), f)
  member inline x.Combine(c1, c2)                                      = x.Bind(c1, fun () -> c2)
  member inline x.ReturnFrom(m : UpdateMonad<'S, 'P, 'T>)              = m
  member inline x.Using(r,f)                                           = UM(fun s -> use rr = r
                                                                                     let (UM g) = f rr
                                                                                     g s
                                                                           )
  member inline x.For(sq:seq<'V>, f:'V -> UpdateMonad<'S, 'P, unit>)   = let rec loop (en:System.Collections.Generic.IEnumerator<_>) = 
                                                                           if en.MoveNext() then x.Bind(f en.Current, fun _ -> loop en)
                                                                           else x.Zero()
                                                                         x.Using(sq.GetEnumerator(), loop)
  member inline x.While(t       , f:unit -> UpdateMonad<'S, 'P, unit>) = let rec loop () = 
                                                                           if t() then x.Bind(f(), loop)
                                                                           else x.Zero()
                                                                         loop()
                                                                         
let update = UpdateBuilder()

type ReaderState  = int
type ReaderUpdate = 
  | NoUpdate
  static member Unit                        = NoUpdate
  static member Combine(NoUpdate, NoUpdate) = NoUpdate
  static member Apply  (s       , NoUpdate) = s

let read = UM (fun (s:ReaderState) -> (NoUpdate, s))
let readRun (s:ReaderState) (UM f) = f s |> snd

let demo1 = update { 
                      let! v = read
                      return v + 1 
}
let demo2 = update { 
                      let! v = demo1
                      return v + 1 
}
demo2 |> readRun 40

type WriterState = NoState
type WriterUpdate<'TLog> = 
  | Log of list<'TLog>
  static member Unit                  = Log []
  static member Combine(Log a, Log b) = Log(List.append a b)
  static member Apply(NoState, _    ) = NoState

let write    v      = UM (fun s -> (Log [v], ()))
let writeRun (UM f) = let (Log l, v) = f NoState
                      l, v

let demo3 = update {
                       do! write 20
                       return "world" 
}
let demo4 = update {
                       let! w = demo3
                       do! write 10
                       return "Hello " + w 
}

demo4 |> writeRun

let logNumbers = update {
                       for i in 1 .. 10 do 
                         do! write i 
}

logNumbers |> writeRun

type StateState<'T> = State of 'T

type StateUpdate<'T> = 
  | Set of 'T 
  | SetNop
  static member Unit          = SetNop
  static member Combine(a, b) = match a, b with 
                                | SetNop, set
                                | set   , SetNop -> set
                                | Set a , Set b  -> Set b
  static member Apply(os , p) = match p with
                                | SetNop ->       os 
                                | Set ns -> State ns

let set    s        = UM (fun _         -> (Set s , ()))
let get             = UM (fun (State s) -> (SetNop, s ))
let setRun s (UM f) = f (State s) |> snd

let demo5 = update { 
                let! v = get : UpdateMonad<StateState<int>, StateUpdate<int>, int>
                do!  set (v + 2) 
}
let demo6 = update {
                for i in 1 .. 13 do 
                  do! demo5
                return! get 
}
demo6 |> setRun 0

(*// Welcome to Try Joinads!
// Use Ctrl-Enter to run the selected text in F# Interactive. 

type Parser<'T> = Parser of (list<char> -> seq<'T * int * list<char>>)

open System

let item = Parser (function
  | [] -> seq []
  | x::xs -> seq [(x, 1, xs)])

let run (Parser p) input = 
  seq { for (result, _, tail) in p (List.ofSeq input) do
          if tail = [] then yield result }

run item ("h".ToCharArray())
/// Parser that always succeeds without consuming any input
let unit v = Parser (fun input -> seq [(v, 0, input)])

/// Apply the first parser and then continue using 'f'
let bind f (Parser p1) = Parser (fun input ->
  seq { for (a, n1, input') in p1 input do
          let (Parser p2) = f a
          for (result, n2, tail) in p2 input' do
            yield result, n1 + n2, tail })

/// Parser that alwyas fails without consuming any input
let zero = Parser (fun _ -> seq [])

/// Combine the results of two parsers
let plus (Parser p1) (Parser p2) = Parser (fun input ->
  Seq.concat [ p1 input; p2 input ])

/// Computation expression builder for creating parsers
type ParseBuilder() = (*[omit:(...)]*)
  member x.Bind(v, f) = bind f v
  member x.Return(v) = unit v
  member x.ReturnFrom(v) = v

  member x.Combine(a, f) = plus a (f())
  member x.Zero() = zero

  member x.Delay(f) = f
  member x.Run(f) = f()
(*[/omit]*)
let parse = ParseBuilder()

/// Apply function 'f' to the parsed value
let map f p = parse {
  let! v = p
  return f v }

/// Succeeds only when a character matches given predicate
let sat pred = parse {
  let! ch = item
  if pred ch then return ch }

/// Parse a specific character
let char ch = sat ((=) ch)
/// Parse a character other than the specified one
let notChar ch = sat ((<>) ch)

/// Parse one or more repetitions of parser 'p'
let rec some p = parse {
  let! x = p
  let! xs = many p
  return x::xs }

/// Parse zero or more repetitions of parser 'p'
and many p = parse {
  return! some p
  return! unit [] }

/// Parse any number of 'op' chars, followed by the
/// body and then the same number of 'cl' chars.
let rec brackets op cl body = parse {
  let! _ = char op
  let! inner = 
    parse { return! brackets op cl body
            return! body }
  let! _ = char cl
  return inner }

/// Returns the body of a bracketed string
let skipBrackets = brackets '(' ')' (many item)

/// Helper function that converts char list to string
let charsToString l = System.String(Array.ofSeq l)

// Run this line to see the results
run (map charsToString skipBrackets) "(((hello)))"

/// Apply both parsers on the same input 'in parallel'
let merge (Parser p1) (Parser p2) = Parser (fun input ->
  seq { for (a, n1, tail1) in p1 input do
          for (b, n2, tail2) in p2 input do
            if n1 = n2 then yield (a, b), n1, tail1 })

/// Run both parsers and return the results of the first
/// one that does not return empty sequence.
let choose (Parser p1) (Parser p2) = Parser (fun input ->
  match p1 input, p2 input with
  | res, _  when not (Seq.isEmpty res) -> res
  | _, res -> res )

/// Add operations to the F# computation builder
type ParseBuilder with (*[omit:...]*)
  member x.Merge(a, b) = merge a b
  member x.Choose(a, b) = choose a b(*[/omit]*)

(*let skipAllBrackets = 
  let body = parse {
    match! notChar '(', notChar ')' with
    | c, _ -> return c 
  }
  brackets '(' ')' (many body)

run (map charsToString skipAllBrackets) "(((hello)))"

/// Run the parser 'p' specified number of times
let rec replicate n p = (*[omit:(...)]*)parse { 
  let! x = p
  if n = 1 then 
    return [x]
  else
    let! xs = replicate (n - 1) p
    return x::xs }
(*[/omit]*)
/// Parse string 'str' and then accept any further text
let rec startsWith str = (*[omit:(...)]*)parse {
  if str = "" then 
    return! many item
  else
    let! _ = char str.[0]
    return! startsWith (str.Substring(1)) }(*[/omit]*)

/// Returns the input if it is valid Cambridge phone number
let cambridgePhone = parse {
  match! many (sat Char.IsDigit), replicate 10 item, startsWith "1223" with
  | n, _, _ -> return n }

// Run this line to test a number
run cambridgePhone "1223999999"
run cambridgePhone "1865999999"

/// Recognize phone number based on the prefix
let phone = parse {
  match! many (sat Char.IsDigit), replicate 10 item, 
         startsWith "1223", startsWith "1865" with
  | n, _, _, ? -> return "Cambridge: " + string n
  | n, _, ?, _ -> return "Oxford: " + string n 
  | n, _, ?, ? -> return "Other: " + string n }

// Run the parser on sample inputs
run phone "1223999999"
run phone "1865999999"
run phone "1111999999"
*)*)