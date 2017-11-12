module CIPHERPrototype.Editor

open System
open System.IO
open System.Text
open Microsoft.FSharp.Compiler.SourceCodeServices

/// Extracts all consecutive identifiers to the left of the charIndex for a specified line of code
let extractIdentTokens line charIndex =
    let sourceTok = FSharpSourceTokenizer([], Some "/home/test.fsx")
    let tokenizer = sourceTok.CreateLineTokenizer(line)

    let rec gatherTokens (tokenizer:FSharpLineTokenizer) state = seq {
      match tokenizer.ScanToken(state) with
      | Some tok, state ->
          yield tok
          yield! gatherTokens tokenizer state
      | None, state -> () }

    let tokens = gatherTokens tokenizer 0L |> Seq.toArray
    let idx = tokens |> Array.tryFindIndex(fun x ->
      charIndex > x.LeftColumn && charIndex <= x.LeftColumn + x.FullMatchedLength)

    match idx with
    | Some(endIndex) ->
        let startIndex =
            tokens.[0..endIndex]
            |> Array.rev
            |> Array.tryFindIndex (fun x -> x.TokenName <> "IDENT" && x.TokenName <> "DOT")
            |> Option.map (fun x -> endIndex - x)
        let startIndex = defaultArg startIndex 0
        let idents = tokens.[startIndex..endIndex] |> Array.filter (fun x -> x.TokenName = "IDENT")
        Some tokens.[endIndex], idents
    | None -> None, Array.empty

/// Parses the line of F# code and builds a list of identifier names in order
/// to be passed into the `GetDeclarations`, `GetMethods`, or other functions
/// For tooltips and overlodas, set identOffset=0; For completion set identOffset=1
let extractNames line charIndex identOffset =
    let charToken, tokens = extractIdentTokens line charIndex
    match charToken with
    | None -> 0, 0, []
    | Some(charToken) ->
        let names = tokens |> Array.map (fun x ->
          line.Substring(x.LeftColumn, x.FullMatchedLength).Trim('`'))
        let takeSize = tokens.Length - identOffset
        let finalList =
          if charToken.TokenName = "IDENT" && Array.length(tokens) > takeSize then
            names |> Seq.take takeSize |> Seq.toList
          else
            names |> Seq.toList
        (charToken.LeftColumn, charToken.LeftColumn + charToken.FullMatchedLength, finalList)

// Mostly boring code to format tooltips reported from method overloads
let htmlEncode (s:string) = 
    s.Trim().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;")

let formatComment cmt (sb:StringBuilder) =
    match cmt with
    | FSharpXmlDoc.Text(s) -> sb.AppendLine(s.Trim()) |> ignore
    | FSharpXmlDoc.XmlDocFileSignature(file, signature) -> ()
    | FSharpXmlDoc.None -> ()

let formatTipElement isSingle el (sbSig:StringBuilder) (sbText:StringBuilder) =
    match el with
    | FSharpToolTipElement.None -> ()
    | FSharpToolTipElement.SingleParameter(it, comment, _ )
    | FSharpToolTipElement.Single(it, comment) ->
        sbSig.AppendLine(htmlEncode it) |> ignore
        formatComment comment sbText
    | FSharpToolTipElement.Group(items) ->
        let items, msg =
          if items.Length > 10 then
            (items |> Seq.take 10 |> List.ofSeq),
            sprintf "   (+%d other overloads)" (items.Length - 10)
          else items, ""
        if isSingle && items.Length > 1 then
          sbSig.AppendLine("Multiple overloads") |> ignore
        for (it, comment) in items do
          sbSig.AppendLine(it) |> ignore
          formatComment comment sbText
        if msg <> null then sbSig.AppendFormat(msg) |> ignore
    | FSharpToolTipElement.CompositionError(err) ->
        sbText.Append("Composition error: " + err) |> ignore
let formatTip tip =
  let sbSig = StringBuilder()
  let sbText = StringBuilder()
  match tip with
  | FSharpToolTipText([single]) -> formatTipElement true single sbSig sbText
  | FSharpToolTipText(its) -> for item in its do formatTipElement false item sbSig sbText
  sbSig.ToString().Trim('\n', '\r'),
  sbText.ToString().Trim('\n', '\r')

/// Check specified file and return parsing & type checking results
let checkFile (fileName, source) (checker:FSharpChecker) = async {
    let libs = [| |] //@"-r:D:\Abe\CIPHERWorkspace\Repos\fsharp-web-editors-demo\packages\FSharp.Core\lib\net45\FSharp.Core.dll" |]
    let! options, errors = checker.GetProjectOptionsFromScript(fileName, source, otherFlags = libs) 
    match checker.TryGetRecentCheckResultsForFile(fileName, options, source) with // TryGetRecentTypeCheckResultsForFile
    | Some(parse, check, _) -> return parse, check
    | None ->
        let! parse = checker.ParseFileInProject(fileName, source, options)
        let! answer = checker.CheckFileInProject(parse, fileName, 0, source, options)
        match answer with
        | FSharpCheckFileAnswer.Succeeded(check) -> return parse, check
        | FSharpCheckFileAnswer.Aborted -> return failwith "Parsing did not finish" }

/// Split the input string into an array of lines (using \r\n or \n as separator)
let getLines (s:string) = s.Replace("\r\n", "\n").Split('\n')

/// Get declarations (completion) at the specified line & column (lines are 1-based)
let getDeclarations (fileName, source) (line, col) (checker:FSharpChecker) = async {
    let! parse, check = checkFile (fileName, source) checker
    let textLine      = (getLines source).[line]
    let _, _, names   = extractNames textLine col 1
    let! decls        = check.GetDeclarationListInfo(Some parse, line, col, textLine, names, "", fun _ -> [])
    return [ for it in decls.Items -> it.Name, 1, formatTip it.DescriptionText ] 
  }

/// Get method overloads (for the method before '('). Lines are 1-based
let getMethodOverloads (fileName, source) (line, col) (checker:FSharpChecker) = async {
    let! parse, check = checkFile (fileName, source) checker
    let textLine      = getLines(source).[line]
    match extractNames textLine col 0 with
    | _, _, []    -> return List.empty
    | _, _, names -> let! methods  = check.GetMethodsAlternate(line, col, textLine, Some names)
                     return [ for m in methods.Methods -> formatTip m.Description ] 
  }


type editorError = {
    startLine  : int
    startColumn: int
    endLine    : int
    endColumn  : int
    message    : string
}

type editorDeclaration = {
    name          : string
    glyph         : int
    signature     : string
    documentation : string
}

open WebSharper
open Transpiler
open Rop

[<Rpc>]
let checkSource source =
   Wrap.wrapper {
      let! checkR   = (checkFile ("test.fsx", source)                  >> Wrap.WAsync) |> fsharpChecker.Value.Process
      let! _, check = checkR
      return          check.Errors 
                      |> Array.map (fun err ->
                          { startLine   = err.StartLineAlternate - 1
                            startColumn = err.StartColumn
                            endLine     = err.EndLineAlternate   - 1
                            endColumn   = err.EndColumn
                            message     = err.Message 
                          }
                      )
   } |> Wrap.getAsyncWithDefault (fun _ -> [||])

[<Rpc>]
let methods      source line col =
   Wrap.wrapper {
      let! metsR = (getMethodOverloads ("test.fsx", source) (line, col) >> Wrap.WAsync) |> fsharpChecker.Value.Process
      let! mets  = metsR
      return      mets 
                  |> List.map (fun (a, b) -> a + b)
                  |> List.toArray
   }  |> Wrap.getAsyncWithDefault (fun _ -> [||])

[<Rpc>]
let declarations source line col =
   Wrap.wrapper {
      let! declsR = (getDeclarations   ("test.fsx", source) (line, col) >> Wrap.WAsync) |> fsharpChecker.Value.Process
      let! decls  = declsR
      return       decls 
                   |> List.map (fun (name, glyph, (sg, info)) -> 
                      {  name          = name
                         glyph         = 1
                         signature     = sg
                         documentation = info
                      }
                   ) |> List.toArray
   } |> Wrap.getAsyncWithDefault (fun _ -> [||])

[<Rpc>]
let translate    source minified = Transpiler.translate source minified
    
[<Rpc>]
let evaluate     source          = Transpiler.evaluate  source
