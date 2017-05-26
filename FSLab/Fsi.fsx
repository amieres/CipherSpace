#r @"packages\FSharp.Compiler.Service\lib\net45\FSharp.Compiler.Service.dll"
open Microsoft.FSharp.Compiler.SourceCodeServices
open Microsoft.FSharp.Compiler.Interactive.Shell

open System
open System.IO
open System.Text

module Fsi =
    // Intialize output and input streams
    let sbOut = new StringBuilder()
    let sbErr = new StringBuilder()
    let inStream = new StringReader("")
    let outStream = new StringWriter(sbOut)
    let errStream = new StringWriter(sbErr)
    
    // Build command line arguments & start FSI session
    let argv = [| "C:\\fsi.exe" |]
    let allArgs = Array.append argv [|"--noninteractive"|]
    
    let fsiConfig = FsiEvaluationSession.GetDefaultConfiguration()
    let fsiSession = FsiEvaluationSession.Create(fsiConfig, allArgs, inStream, outStream, errStream, true) 
    
    let invoke text = 
        sbOut.Clear() |> ignore
        let (r, errors) = fsiSession.EvalInteractionNonThrowing text
        (sbOut.ToString(), r, errors)
    
(*
fsiSession.EvalInteractionNonThrowing """
type Point = {
    x : int
    y : int
}
"""

fsiSession.EvalExpression """
 { x = 3; y = 9 }
"""


let collectionTest() = 

    for i in 1 .. 200 do
        let defaultArgs = [|"fsi.exe";"--noninteractive";"--nologo";"--gui-"|]
        use inStream = new StringReader("")
        use outStream = new StringWriter()
        use errStream = new StringWriter()

        let fsiConfig = FsiEvaluationSession.GetDefaultConfiguration()
        use session = FsiEvaluationSession.Create(fsiConfig, defaultArgs, inStream, outStream, errStream, collectible=true)
        
        session.EvalInteraction (sprintf "type D = { v : int }")
        let v = session.EvalExpression (sprintf "{ v = 42 * %d }" i)
        printfn "iteration %d, result = %A" i v.Value.ReflectionValue

#r @"packages\FSharp.Management\lib\net40\FSharp.Management.dll"

open FSharp.Management

type fs = FileSystem<".">

fs.

Registry.


open Microsoft.FSharp.Quotations
let expr = <@ 2 * 5 @>


let expr2 x = <@ 2 * %x @>

println expr2

open Microsoft.FSharp.Quotations
open Microsoft.FSharp.Quotations.Patterns
open Microsoft.FSharp.Quotations.DerivedPatterns

let println expr =
    let rec print expr =
        match expr with
        | Application(expr1, expr2) ->
            // Function application.
            print expr1
            printf " "
            print expr2
        | SpecificCall <@@ (+) @@> (_, _, exprList) ->
            // Matches a call to (+). Must appear before Call pattern.
            print exprList.Head
            printf " + "
            print exprList.Tail.Head
        | Call(exprOpt, methodInfo, exprList) ->
            // Method or module function call.
            match exprOpt with
            | Some expr -> print expr
            | None -> printf "%s" methodInfo.DeclaringType.Name
            printf ".%s(" methodInfo.Name
            if (exprList.IsEmpty) then printf ")" else
            print exprList.Head
            for expr in exprList.Tail do
                printf ","
                print expr
            printf ")"
        | Int32(n) ->
            printf "%d" n
        | Lambda(param, body) ->
            // Lambda expression.
            printf "fun (%s:%s) -> " param.Name (param.Type.ToString())
            print body
        | Let(var, expr1, expr2) ->
            // Let binding.
            if (var.IsMutable) then
                printf "let mutable %s = " var.Name
            else
                printf "let %s = " var.Name
            print expr1
            printf " in "
            print expr2
        | PropertyGet(_, propOrValInfo, _) ->
            printf "%s" propOrValInfo.Name
        | String(str) ->
            printf "%s" str
        | Value(value, typ) ->
            printf "%s" (value.ToString())
        | Var(var) ->
            printf "%s" var.Name
        | _ -> printf "%s" (expr.ToString())
    print expr
    printfn ""



type Util() =
    static member replicate(amount, [<System.ParamArray>] xs) = Array.collect (Array.replicate amount) xs


Util.replicate(3, 5., 6.)
Util.replicate (3, [| 3; 5; 6|])
*)

module Snippet =

    type StatusSnippet =
        | SnippetNew
        | SnippetInvokedNoValue
        | SnippetInvoked of FsiValue
        | SnippetFailed  of string

    type LetMod =
        | NoMod
        | Mutable
        | Recursive
    with member this.GetText =
           match this with
           | NoMod      -> ""
           | Mutable    -> "mutable"
           | Recursive  -> "rec"

    
    type SnippetType =
        | Module
        | Type   of parms: string
        | Let    of parms: string * Inline: bool * Mod: LetMod
        | Member of parms: string * Inline: bool * Static: bool  
    with member this.GetText : string -> string =
           let sprintfName sta parms mods =
               (mods |> String.concat " ", parms)
               |> function
               | "", "" ->             sprintf "%s %s ="       sta
               | ms, "" ->             sprintf "%s %s %s ="    sta ms
               | "", _  -> fun name -> sprintf "%s %s %s ="    sta    name parms
               | ms, _  -> fun name -> sprintf "%s %s %s %s =" sta ms name parms
           match this with
           | Module                    -> sprintf "module %s = "
           | Type   (parms)            -> fun name -> sprintf "type %s%s = " name parms
           | Let    (parms, inl, mods) -> [ if inl  then yield "inline"
                                            match mods with
                                            | NoMod      -> ()
                                            | Mutable    -> yield "mutable"
                                            | Recursive  -> yield "rec"
                                          ] 
                                          |> sprintfName "let" parms
           | Member (parms, inl, sta)  -> if sta  then "static member"
                                                  else "member" 
                                          |> sprintfName 
                                               <| parms 
                                               <| [ if inl  then yield "inline"] 
                                          |> if sta then id else
                                             fun f name -> f ("this." + name)
                                                  
    let indent (text:string) =
        text.Split '\n'
        |> Array.map (fun l -> "    " + l)
        |> String.concat "\n"

    type SnippetContent =
        | SnippetText of string
        | Snippet     of Snippet
    with member this.GetText : string =
            match this with
            | SnippetText text  -> text
            | Snippet     snip  -> snip.GetText
         static member New(sType, name, desc, def) = Snippet <| Snippet.New(sType, name, desc, def)
         member this.Invoke() =
            match this with
            | Snippet     snip  -> snip.Invoke()
            | SnippetText text  -> let (out, r, errors) = Fsi.invoke text
                                   out + (errors |> Array.map (sprintf "%A") |> String.concat "\n")

    
    and Snippet = {
        id                   : System.Guid
        sType                : SnippetType
        mutable name         : string
        mutable description  : string
        mutable definition   : SnippetContent list
        mutable output       : string
        mutable status       : StatusSnippet
        dependencies         : Guid list
        dependents           : Guid list
    }
    with member this.GetText : string = 
            this.definition
            |> List.map (fun snipC -> snipC.GetText) 
            |> String.concat "\n"
            |> indent
            |> sprintf "%s \n%s\n" (this.sType.GetText this.name)
         member this.Invoke () = 
            let (out, r, errors) = Fsi.invoke this.GetText
            let status = match r with
                         | Choice1Of2 () -> SnippetInvokedNoValue
                         | Choice2Of2  e -> sprintf "%A\n%A" errors e
                                            |> SnippetFailed
            this.status <- status
            this.output <- out
            out + (errors |> Array.map (sprintf "%A") |> String.concat "\n")
         member this.Status    = this.status
         member this.ToString  = sprintf "%s : %A" this.name this.status
         static member New(sType, name, desc, def) = {
                       id           = System.Guid.NewGuid()
                       sType        = sType
                       name         = name
                       description  = desc
                       definition   = def
                       output       = ""
                       status       = SnippetNew
                       dependencies = []
                       dependents   = []
                   }
            
open Snippet

let tailFact = "tailFact"
let snipFact = 
    SnippetContent.New(
      sType = Let ("n", false, NoMod)
    , name  = "fact"
    , desc  = "Factorial function using tail recursion"
    , def   = [
        SnippetContent.New(
          sType = Let ("n m", false, Recursive)
        , name  = tailFact
        , desc  = "Factorial function with tail recursion"
        , def   = [
            SnippetText <| "if n <= 1 then m else"
            SnippetText <| tailFact + " (n - 1) (n * m)"
          ]
        )
        SnippetText <| tailFact + " n 1"
      ]
    )

let snipMath =
    SnippetContent.New(
      sType = Module
    , name  = "Math"
    , desc  = "Math module"
    , def   = [
        snipFact
        SnippetText "let times2 = (*) 2"
      ]
    )
    
printfn "%s" snipMath.GetText
snipMath.Invoke() |> printfn "%s" 

let snip0 = SnippetText """let calc () = Math.fact 10 |> Math.times2"""
snip0.Invoke() |> printfn "%s" 

let snip2 = SnippetText """calc()"""
snip2.Invoke() |> printfn "%s" 
    
snipMath |> function Snippet s -> s.output |> printfn "%s"

let f = 
    function 
    | x -> 
        function 
        | _ -> "something" 

let f = function | x -> x |> function  | _ -> "something" 

f 1