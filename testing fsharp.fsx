

let max: 't -> 't -> 't when 't : comparison =
     fun a     b  -> if a > b then a else b


open Microsoft.FSharp.Reflection

type V<'T>    =
    | Constant of 'T
    | Tube     of 'T
    | Int      of int

let defV<'R> (p: obj) : V<'R> =
    match p.GetType().ReflectedType with
    | null                  -> Constant (p |> unbox)
    | r when r.Name = "V`1" -> p           |> unbox
    | _                     -> Constant (p |> unbox)

let inline show        (p: ^P ) = printfn "%A" p
let inline show2< ^T>  (p: obj) = p |> defV< ^T> |> printfn "%A"

let i =      8
let j = Tube 8
let k =      "hello"
let l = Tube "hello"
let m = Int  8

defV<int   > i |> show2<int>
defV<int   > j |> show2
defV<string> k |> show2
defV<string> l |> show2

let I : V<int   > = defV i
let J : V<int   > = defV j 
let K : V<string> = defV k
let L : V<string> = defV l
let M : V<obj   > = defV m

show          I
show          J
show          K
show          L
show          M
              
show2         I
show2         J
show2         K
show2         L
show2         M

show2<int   > i
show2<int   > j
show2<string> k
show2<string> l
show2<obj   > m

show2         i
show2         j
show2         k
show2         l
show2         m


type Something = Something with
    static member inline ($) (Something, p) = Constant p

type V<'T> with
    static member inline ($) (_, p:V<_>) = p

let x = Something $ (Constant 7)

let callV: ('a -> 'b) -> V<'a> -> 'b =
       fun f             p     -> match p with
                                  | Constant p' -> f p' 
                                  | Tube     p' -> f p'

type F<'T, 'a> = 'T -> 'a

type FV<'T, 'a> = V<'T> -> 'a

let fv1      = callV
let fv2  f p = callV f p |> fv1
let fv3  f p = callV f p |> fv2
let fv4  f p = callV f p |> fv3
let fv5  f p = callV f p |> fv4
let fv6  f p = callV f p |> fv5
let fv7  f p = callV f p |> fv6
let fv8  f p = callV f p |> fv7
let fv9  f p = callV f p |> fv8
let fv10 f p = callV f p |> fv9

let sum a b = a + b
    
let sumv = fv2 sum

sum 5 9

sumv (Constant 5) (Tube 9)


let rec fvN (ab:F<'a, 'b>) (va: V<'a>) : obj =
             let b = callV ab va
             printfn "%s" <| b.GetType().Name
             let r = box b
             if r.GetType() |> FSharpType.IsFunction 
             then fvN (unbox r) |> box |> unbox
             else r

let sumv = fvN sum
(fvN sum) (Constant 5) (Tube 9)

let (|V|) x =
    match x with
    | :? int as i    -> Constant i
    | :? string as s -> Constant s


// 
// let inline Do () = __SOURCE_FILE__, __LINE__
// 
// Do()
// Do()
// Do()
// Do()
// \
// 
// 
// module Domain =
//     type UnionType = 
//         | Int    of int
//         | Long   of int64
//         | Float  of float
//         | String of string
//     with
//         static member ($) (UnionType, x:int   ) = Int    x
//         static member ($) (UnionType, x:int64 ) = Long   x
//         static member ($) (UnionType, x:float ) = Float  x
//         static member ($) (UnionType, x:string) = String x 
// 
//     let inline (|UnionType|) x = Unchecked.defaultof<UnionType> $ x
// 
// open Domain
// 
// let show x = 
//   match x with
//   | Int    y -> printfn "int   : %d" y
//   | Long   y -> printfn "long  : %d" y
//   | Float  y -> printfn "float : %f" y
//   | String y -> printfn "string: %s" y
// 
// let inline showImplicit (UnionType x) = show x
// 
// showImplicit "Hello world!"
// showImplicit 5
// showImplicit 4.3
// 
// let (|Let|) value input = (value, input)
// 
// // This is useful when writing complex pattern matching
// let flag, num = (true, 2)
// match flag, num with
// | true, (Let "one" (str, 1) | Let "two" (str, 2) | Let "three" (str, 3)) ->
//     // Called when number is between 1 and 3 and assigns textual 
//     // representation of the number to 'str' (so that we can handle all
//     // cases with just a single match clause)
//     printfn "%s" str
// | _ -> 
//     printfn "Something else"
// 
open System
open System.IO
open System.Net
open System.Net.Sockets

let acceptClient (client:TcpClient) handler = async {
   use stream = client.GetStream()
   use reader = new StreamReader(stream)
   let header = reader.ReadLine()
   if not (String.IsNullOrEmpty(header)) then
      use writer = new StreamWriter(stream)
      handler (header, writer)
      writer.Flush()
   }

let startServer (address, port) handler =
   let ip = IPAddress.Parse(address)
   let listener = TcpListener(ip, port)
   listener.Start() 
   async { 
      while true do 
         let! client = listener.AcceptTcpClientAsync() |> Async.AwaitTask
         acceptClient client handler |> Async.Start
   }
   |> Async.Start

type StreamWriter with
   member writer.BinaryWrite(bytes:byte[]) =
      let writer = new BinaryWriter(writer.BaseStream)
      writer.Write(bytes)

let staticContentHandler root (header:string, response:StreamWriter) =
   let parts = header.Split(' ')
   let resource = parts.[1]
   let path = Path.Combine(root, resource.TrimStart('/').TrimStart('\\'))
   if File.Exists(path) then
      response.Write("HTTP/1.1 200 OK\r\n\r\n")
      if resource.EndsWith(".png") then
         let bytes = File.ReadAllBytes(path)
         response.BinaryWrite(bytes) 
      else
         let text = File.ReadAllText(path)
         response.Write(text)
   else
      response.Write("HTTP/1.1 404 Not found\r\n\r\n" + resource + " not found.")

startServer("127.0.0.1", 8080) (staticContentHandler @"D:\Abe")

(*
let inline gmapx m f x = m ? (f) <- x

type GMap   = GMap with
    static member inline (?<-)(GMap, f , x      : int      ) = x
    static member inline (?<-)(GMap, f , x      : string   ) = x
    static member inline (?<-)(GMap, f , x      : bool     ) = x
    static member inline (?<-)(GMap, f , (x, y) : (_ * _)  ) = (f $ x,                    f $ y)
    static member inline (?<-)(GMap, f , xs     : _  list  ) = xs |> List  .map (fun x -> f $ x)
    static member inline (?<-)(GMap, f , xs     : _  option) = xs |> Option.map (fun x -> f $ x)
    static member inline (?<-)(GMap, f , xs     : _ []     ) = xs |> Array .map (fun x -> f $ x)
    static member inline (?<-)(GMap, f , xs     : _ seq    ) = xs |> Seq   .map (fun x -> f $ x)

type Id     = Id
type Inc    = Inc    with static member inline (?<-)(GMap, _ : Inc   , x : int   ) = x + 1
type Upper  = Upper  with static member inline (?<-)(GMap, _ : Upper , x : string) = x.ToUpper()
type Triple = Triple with static member inline (?<-)(GMap, _ : Triple, x : int   ) = x * 3
                          static member inline (?<-)(GMap, _ : Triple, x : string) = x |> String.replicate 3

let inline gmap f x = gmapx GMap f x
type Id     with static member inline ($) (f, x) = gmap f x  // why is ($) necessary in each class?????
type Inc    with static member inline ($) (f, x) = gmap f x  // they just call the same inline function gmap
type Upper  with static member inline ($) (f, x) = gmap f x
type Triple with static member inline ($) (f, x) = gmap f x

// Examples
let c2 = gmap Inc      [(Some "nick", Some 1)] // [("nick", 2)]
let c1 = gmap Id       [(Some "nick", Some 1)] // [("nick", 1)]
let c3 = gmap Upper    [(Some "nick", Some 1)] // [("NICK", 1)]
let c4 = gmap Triple   [(Some "nick", Some 1)] // [(Some "nicknicknick", Some 3)]

let d1 =      Id     $ [(Some "nick", Some 1)] // [("nick", 1)]
let d2 =      Inc    $ [(Some "nick", Some 1)] // [("nick", 2)]
let d3 =      Upper  $ [(Some "nick", Some 1)] // [("NICK", 1)]
let d4 =      Triple $ [(Some "nick", Some 1)] // [(Some "nicknicknick", Some 3)]

Triple $ 6
Triple $ (Upper $ (Inc $ (Some ([("a", 5)], [| 0 ; 1 ; 2 |])))) // Some ([("AAA", 18)], [|3; 6; 9|])
// ^^^^^^ this really taxes the compiler!!!! FSHARP 4.0 could not handle it

Triple $ (Upper $ (Inc $ ())) // Some ([("AAA", 18)], [|3; 6; 9|])

Some ([("a", 5)], [| 0 ; 1 ; 2 |])
|> gmap Inc
|> gmap Upper
|> gmap Triple

Inc $  (Some     5 )
Inc.($)(Triple, "5")
Inc.($)(Inc   ,  5 )

gmap Triple 5

Gxx ? (Triple) <- 5

seq [ for i in 0..10 do yield (Some i, sprintf "%d" i) ] |> gmap Triple
*)

type UnionType<'T> = 
    | Int     of int
    | Long    of int64
    | String  of string
    | Generic of 'T

let inline gmapx (f: ^F) (x: ^A) = f $ x

type GMap     = GMap     with
    static member inline (?<-) (GMap, _       , x:int   ) = Generic x
    static member inline (?<-) (GMap, _       , x:int64 ) = Generic x
    static member inline (?<-) (GMap, _       , x:string) = Generic x
//    static member inline (?<-) (GMap, _       , x       ) = Generic x

type Specific = Specific with
    static member inline ($)   (f: ^F         , x: ^A) : UnionType< _> = gmapx f x
    static member inline (?<-) (GMap, Specific, x:int   ) = Int    x
    static member inline (?<-) (GMap, Specific, x:int64 ) = Long   x
    static member inline (?<-) (GMap, Specific, x:string) = String x

let show x = 
  match x with
  | Int     x -> printfn "int    : %d" x
  | Long    x -> printfn "long   : %d" x
  | String  x -> printfn "string : %s" x
  | Generic x -> printfn "generic: %A" x

let inline showImplicit x = gmapx Specific x |> show

showImplicit "Hello world!"
//showImplicit true
showImplicit 4.3
showImplicit 44
showImplicit 44L





let inline gmapx m f x = m ? (f) <- x

type GMap   = GMap with
    static member inline (?<-)(GMap, f , x                 ) = x
    static member inline (?<-)(GMap, f , x      : string   ) = x
    static member inline (?<-)(GMap, f , x      : bool     ) = x

type Id     = Id
type Inc    = Inc    with static member inline (?<-)(GMap, _ : Inc   , x : int   ) = x + 1
type Upper  = Upper  with static member inline (?<-)(GMap, _ : Upper , x : string) = x.ToUpper()
type Triple = Triple with static member inline (?<-)(GMap, _ : Triple, x : int   ) = x * 3
                          static member inline (?<-)(GMap, _ : Triple, x : string) = x |> String.replicate 3

let inline gmap f x = gmapx GMap f x

gmap Inc 5
gmap Inc "5"


type A = X with static member (?<-) (X, _: obj , x:int) = x + 10
                static member (?<-) (X, "hello", x:int) = x * 8
                static member (?<-) (X, 0      , x:int) = -x 
                static member (?<-) (X, _      , x:int) = 0

type B = Y with static member (?<-) (X, Y      , x:int) = Some x
type C = Z with static member (?<-) (X, Z      , x:int) = x * 10
type D = K 

let y  = X ? (Y      ) <- 5
let z  = X ? (Z      ) <- 5
let he = X ? ("hello") <- 5
let ze = X ? (0      ) <- 5
let on = X ? (4.9    ) <- 5
let nu = X ? (K      ) <- 5

let nu = X ? (null   ) <- 5
let yy = X ? ("Y"    ) <- 5
let ho = X ? ("how"  ) <- 5
