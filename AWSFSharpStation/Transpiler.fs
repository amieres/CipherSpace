module CIPHERPrototype.Transpiler

open Rop
open FsiExe
open Fsi
open System
open System.IO
open System.Reflection
open Microsoft.FSharp.Compiler.SourceCodeServices

type tempFileName(fn) =
    interface IDisposable with
        member this.Dispose() = if File.Exists fn then File.Delete fn

module Re = WebSharper.Core.Resources
module P  = WebSharper.PathConventions
open WebSharper.Compiler
open WebSharper.Compiler.FrontEnd
open WebSharper.Core
open WebSharper.Core.Resources
open WebSharper.Compile.CommandTools

open Microsoft.FSharp.Compiler


type WebSharperError = AST.SourcePos option * CompilationError

let webSharperError2TranspilerError: WebSharperError -> TranspilerError =
    fun                              (posO, error)   ->
        posO 
        |> Option.map (fun pos -> sprintf "%A - %A " pos.Start pos.End)
        |> Option.defaultValue ""
        |>  sprintf "%s%s" <| error.ToString()
        |> ErrWebSharper

let fsharpChecker = 
    lazy ResourceAgent<_, unit>(20, fun _ -> FSharpChecker.Create(keepAssemblyContents = true) )

let CompileToJsW: Context -> WsConfig -> Wrap.Wrapper<string> =
    fun           context    config   -> Wrap.wrapper {
        do!  config.ProjectFile  = null       |> Result.failIfTrue  MustProvideProjectPath
        do!  config.AssemblyFile = null       |> Result.failIfTrue  MustProvideAssemblyOutputPath
        let! compilerOutput      = fsharpChecker.Value.Process(fun c -> c.Compile(config.CompilerArgs) |> Wrap.WAsync)
        let! errors, exitCode    = compilerOutput
        let  fsErrors            = errors |> Array.map fSharpError2TranspilerError |> List.ofArray
        do!  (if exitCode = 0 then Result.succeedWithMsgs () else Result.failWithMsgs) <| fsErrors
        do!  File.Exists config.AssemblyFile  |> Result.failIfFalse (OutputAssemblyNotFound config.AssemblyFile)
        use  toErase             = new tempFileName(config.AssemblyFile)
        let  paths               = [   for r in config.References -> 
                                           Path.GetFullPath r
                                       yield Path.GetFullPath config.AssemblyFile
                                   ]        
        let  aR                  = AssemblyResolver.Create().SearchPaths(paths)
        let  loader              = Loader.Create aR (printfn "%s")
        let  refs                = [ for r in config.References -> loader.LoadFile(r, false) ]
        let  refMeta             =
             System.Threading.Tasks.Task.Run(fun () ->
                 let mutable refErrors = false
                 let metas = refs |> List.choose (fun r -> 
                     try ReadFromAssembly FullMetadata r
                     with e ->
                         eprintfn "WebSharper error %s" e.Message
                         None
                 )
                 if refErrors then None
                 elif List.isEmpty metas then Some WebSharper.Core.Metadata.Info.Empty 
                 else
                     try
                         Some { 
                             WebSharper.Core.Metadata.Info.UnionWithoutDependencies metas with
                                 Dependencies = WebSharper.Core.DependencyGraph.Graph.NewWithDependencyAssemblies(metas |> Seq.map (fun m -> m.Dependencies)).GetData()
                         }
                     with e ->
                         eprintfn "WebSharper error Error merging WebSharper metadata: %s" e.Message
                         None
             )
        let  referencedAsmNames     = paths
                                      |> Seq.map (fun i -> 
                                          let n = Path.GetFileNameWithoutExtension(i)
                                          n, i
                                      ) |> Map.ofSeq
        let  thisName               = Path.GetFileNameWithoutExtension config.AssemblyFile
        let  assemblyResolveHandler = ResolveEventHandler(fun _ e ->
                let assemblyName    = AssemblyName(e.Name).Name
                match Map.tryFind assemblyName referencedAsmNames with
                | Some p when assemblyName = "FSharp.Core" -> typeof<option<_>>.Assembly
                | Some p when assemblyName = thisName      -> Assembly.Load(File.ReadAllBytes(p))
                | Some p                                   -> Assembly.LoadFrom(p)
                | _                                        -> null
            )
        System.AppDomain.CurrentDomain.add_AssemblyResolve(assemblyResolveHandler)
        let! compilerR   = (fun checker -> async.Return <| WebSharper.Compiler.FSharp.WebSharperFSharpCompiler (printfn "%s", checker) |> Wrap.WAsync) |> fsharpChecker.Value.Process
        let! compiler    = compilerR
        let! comp        = compiler.Compile(refMeta, config.CompilerArgs, ".", config.ProjectFile) 
        let  wsErrors    = comp.Errors |> List.map webSharperError2TranspilerError
        do!  List.isEmpty comp.Errors |> Result.failIfFalse (ErrWebSharper <| sprintf "%A" comp.Errors)
        let  assem       = loader.LoadFile config.AssemblyFile
        let! js          = ModifyAssembly (refMeta.Result |> Option.defaultValue WebSharper.Core.Metadata.Info.Empty) 
                                          (comp.ToCurrentMetadata(config.WarnOnly)) config.SourceMap assem
                           |> Result.fromOption NothingToTranslateToJavaScript
        let  thisProject = Path.GetFileNameWithoutExtension config.ProjectFile
        let  ctx = { context with
                       GetAssemblyRendering = fun name -> if name = thisProject || name = config.ProjectFile
                                                          then WebSharper.Core.Resources.Rendering.Skip
                                                          else context.GetAssemblyRendering name 
                   }
        use  stringW  = new System.IO.StringWriter()
        use  writer   = new System.Web.UI.HtmlTextWriter(stringW)
        comp.Graph.Nodes |> comp.Graph.GetDependencies |> comp.Graph.GetResources |> Seq.iter(fun r -> r.Render ctx (fun _ -> writer) )
        //js.RenderDependencies(ctx, writer)
        let  includes = stringW.ToString()
        let  incs     = includes.Split([| "src="; "href=" ; "<" ; ">" |], System.StringSplitOptions.RemoveEmptyEntries)
                        |> Seq.choose(fun v -> if v.[0] = '"' then v.Split([| '"' |], System.StringSplitOptions.RemoveEmptyEntries).[0] |> Some else None)
                        |> Seq.map (fun v -> sprintf "\"%s\"" v) |> String.concat ", "
        let  f        = js.[1..js.Length - 7] |> if List.isEmpty comp.Warnings then id else sprintf "\/*\n%A\n*\/ %s" comp.Warnings
        return          sprintf "CIPHERSpaceLoadFiles([%s], %s);" incs f
    }

let compileMainW: Context -> seq<string> -> Wrap.Wrapper<string> =
  fun             context    argv        ->
    let wsArgs    = ref WsConfig.Empty
    let refs      = ResizeArray()
    let resources = ResizeArray()
    let fscArgs   = ResizeArray()
    let cArgv     =
        [|
            let isRNext = ref false
            for a in argv do
                match a with
                | "-r" ->
                    isRNext := true
                | _ ->
                    if !isRNext then
                        isRNext := false   
                        yield "-r:" + a
                    else
                        yield a
        |]
    for a in cArgv do
        let setProjectType t = wsArgs := { !wsArgs with ProjectType = Some t }
        try
            match a with
            | "--wig"                          -> setProjectType WIG
            | "--bundle"                       -> setProjectType Bundle
            | "--html"                         -> setProjectType Html
            | "--site"                         -> setProjectType Website
            | StartsWith "--ws:" wsProjectType ->
                match wsProjectType.ToLower() with
                | "site" 
                | "web" 
                | "website" 
                | "export"                     -> setProjectType Website
                | "extension"                  
                | "interfacegenerator"         -> setProjectType WIG
                | "bundle"                     -> setProjectType Bundle
                | "html"                       -> setProjectType Html
                | "ignore"                     -> ()
                | "library"                    -> ()
                | _                            -> invalidArg "type" ("Invalid project type: " + wsProjectType)
            | StartsWith "--project:"        p -> wsArgs := { !wsArgs with ProjectFile   = Path.Combine(Directory.GetCurrentDirectory(), p) }
            | StartsWith "--wsoutput:"       o -> wsArgs := { !wsArgs with OutputDir     = Some o }
            | StartsWith "--keyfile:"        k -> wsArgs := { !wsArgs with KeyFile       = Some k }
            | "--jsmap"                        -> wsArgs := { !wsArgs with SourceMap     = true   } 
            | "--dts"                          -> wsArgs := { !wsArgs with TypeScript    = true   } 
            | "--wswarnonly"                   -> wsArgs := { !wsArgs with WarnOnly      = true   } 
            | "--printjs"                      -> wsArgs := { !wsArgs with PrintJS       = true   }
            | "--debug"                      
            | "--debug+"                     
            | "--debug:full"                 
            | "-g"                           
            | "-g+"                          
            | "-g:full"                        -> wsArgs := { !wsArgs with IsDebug       = true   } ; fscArgs.Add a
            | "--vserrors"                     -> wsArgs := { !wsArgs with VSStyleErrors = true   } ; fscArgs.Add a
            | StartsWith "-o:"               o 
            | StartsWith "--out:"            o -> wsArgs := { !wsArgs with AssemblyFile = o       } ; fscArgs.Add a
            | StartsWith "--doc:"            d -> wsArgs := { !wsArgs with Documentation = Some d } ; fscArgs.Add a
            | StartsWith "-r:"               r             
            | StartsWith "--reference:"      r -> refs.Add      r                                   ; fscArgs.Add a
            | StartsWith "--resource:"       r -> resources.Add r                                   ; fscArgs.Add a
            | _                                ->                                                     fscArgs.Add a  
        with e ->
            failwithf "Parsing argument failed: '%s' - %s" a e.Message
    fscArgs.Add "--define:FSHARP41"
    wsArgs := 
        { !wsArgs with 
            References   = refs |> Seq.distinct |> Array.ofSeq
            Resources    = resources.ToArray()
            CompilerArgs = fscArgs  .ToArray() 
        }
    CompileToJsW context !wsArgs

let compileW: Context -> string -> seq<string> -> seq<string> -> Wrap.Wrapper<string> =
  fun         context    code      assemblies     defines     ->
    Wrap.wrapper {
        do!  Result.tryProtection()
        let codeBase  = System.Uri(System.Reflection.Assembly.GetExecutingAssembly().CodeBase).LocalPath
        let fn        = System.IO.Path.Combine(System.IO.Path.GetDirectoryName(codeBase), System.IO.Path.GetRandomFileName())
        let src       = System.IO.Path.GetFullPath(System.IO.Path.ChangeExtension(fn, ".fs"))
        let code2     = code.Split([| "\r\n"; "\n" ; "\r" |], System.StringSplitOptions.None)
                        |> Seq.map(fun line -> if line.StartsWith("#r")
                                               then ("//" + line, line)
                                               else (line       , ""  ))
        //printfn "%s" src
        //printfn "%s" (code2 |> Seq.map fst |> String.concat "\r\n" )
        System.IO.File.WriteAllText(src, code2 |> Seq.map fst |> String.concat "\r\n" ) 
        use  toErase  = new tempFileName(src)
        let dll       = System.IO.Path.ChangeExtension(src, ".dll")
        let options   = [|
                           yield! [|
                                  "IGNOREDfsc.exe"
                                  "--noframework"
                                  "--optimize-"
                                  "--tailcalls-" 
                                  "--target:library"
                                  "--warn:3"
                                  "--nowarn:76"
                                  "--vserrors"
                                  "--LCID:1033" 
                                  "--utf8output" 
                                  "--fullpaths"
                                  "--flaterrors" 
                                  "--subsystemversion:6.00"
                                  "--highentropyva+"
                                  "--site"
                                  "--wsoutput:."
                                  "-o:" + dll
                                  "--project:project.xxx"
                                  src 
                                  |]
                           yield! assemblies |> Seq.map ((+) "-r:") |> Seq.toArray 
                           yield! defines    |> Seq.map ((+) "-d:") |> Seq.toArray
                        |]
        return! compileMainW context options
    }

let processJSW: string -> seq<string> -> seq<string> -> Wrap.Wrapper<string> =
  fun           fs        assemblies     defines     ->
    Wrap.wrapper {
        let pu = P.PathUtility.VirtualPaths("/")
        let ctx : Resources.Context =
            {
                DebuggingEnabled = true
                DefaultToHttp = false
                GetSetting = fun (name: string) -> None
                GetAssemblyRendering = fun name ->
                    printfn "GetAssemblyRendering %s" name
                    let aid = P.AssemblyId.Create(name)
                    let url = pu.JavaScriptPath(aid)
                    Re.RenderLink url
                GetWebResourceRendering = fun ty resource ->
                    let id = P.AssemblyId.Create(ty)
                    let kind =
                        if resource.EndsWith(".js") || resource.EndsWith(".ts")
                            then P.ResourceKind.Script
                            else P.ResourceKind.Content
                    P.EmbeddedResource.Create(kind, id, resource)
                    |> pu.EmbeddedPath
                    |> Re.RenderLink
                RenderingCache = System.Collections.Concurrent.ConcurrentDictionary()
                ResourceDependencyCache = System.Collections.Concurrent.ConcurrentDictionary()
            }
        return! compileW ctx fs assemblies defines
    }

type PreproDirective =
| PrepoR      of string
| PrepoDefine of string
| PrepoLoad   of string
| NoPrepo

let processCode: (string -> seq<string> -> seq<string> -> Wrap.Wrapper<string>) -> string -> Wrap.Wrapper<string> =
  fun            processor                                          fsx    ->
    let  quoted (line:string) = line.Trim().Split([| "\""       |], System.StringSplitOptions.RemoveEmptyEntries) |> Seq.tryLast |> Option.defaultValue line
    let  define (line:string) = line.Trim().Split([| "#define " |], System.StringSplitOptions.RemoveEmptyEntries) |> Seq.tryHead |> Option.defaultValue ""
    let  prepro (line:string) = match true with 
                                | true when line.StartsWith("#define") -> ("//" + line, line |> define |> PrepoDefine)
                                | true when line.StartsWith("#r"     ) -> ("//" + line, line |> quoted |> PrepoR     )
                                | true when line.StartsWith("#load"  ) -> ("//" + line, line |> quoted |> PrepoLoad  )
                                | _                                    -> (       line,                   NoPrepo    ) 
    Wrap.wrapper {
        do!  Result.tryProtection()
        let  fsNass   = fsx.Split([| "\r\n"; "\n" ; "\r" |], System.StringSplitOptions.None) |> Seq.map prepro
        let  fs       = fsNass |> Seq.map fst |> String.concat "\r\n"
        let  assembs  = fsNass |> Seq.choose (snd >> (function | PrepoR assemb -> Some assemb | _ -> None)) |> Seq.toList
        let  defines  = fsNass |> Seq.choose (snd >> (function | PrepoDefine d -> Some d      | _ -> None)) |> Seq.toList
        return! processor fs assembs defines
    }

let getJSW: bool     -> string -> Wrap.Wrapper<string> =
  fun       minified    fsx    -> processCode processJSW fsx

let evalFSI: string -> Wrap.Wrapper<string> =
  fun        fsx    -> processCode processFSI fsx

let evalFsiExe: string -> Wrap.Wrapper<string> =
  fun           fsx    -> processCode processFsiExe fsx

let nl = "\r\n"

let errors2string file (ms:ErrMsg list) = ms |> List.map (fun m -> m.ErrMsg) |> String.concat nl |> sprintf "%s: %s" file

let lineDirective  i file = sprintf "# %d @\"%s\"%s" (i+1) file nl
let lineDirective0   file filename = 
    Result.result {
        do! Result.tryProtection()
        return (Path.GetFileNameWithoutExtension file    ) + "_"
             + (Path.GetFileNameWithoutExtension filename)
               |> lineDirective 0
    }  |> Result.withError (errors2string file)

let getWithIncludes : string -> (string -> string) -> string   -> string =
  fun                 start     readFile              filename ->
    Result.result {
        do! Result.tryProtection()
        let path = Path.GetDirectoryName filename
        let mainFile = readFile filename
        return
            mainFile.Split([| nl |], System.StringSplitOptions.None)
            |> Seq.mapi (fun i line ->
                if line.StartsWith(start)
                then let file   = line.[start.Length..].Replace('"', ' ').Replace('@', ' ').Trim()
                     let file2  = if Path.IsPathRooted file then file else Path.Combine(path, file)
                     let inject = readFile file2
                     sprintf "%s%s%s%s" (lineDirective0 file filename) inject nl (lineDirective i filename)
                else line)
            |> Seq.append [ lineDirective 0 filename ]
            |> String.concat nl
    } |> Result.withError (errors2string filename)

let readFile: string -> string =
  fun         name   ->
    Result.result {
        do! Result.tryProtection()
        return System.IO.File.ReadAllText name
    } |> Result.withError (errors2string name)

type Transpiler(fscript: string) =
    member this.EvalFSI   (              ) = evalFSI         fscript
    member this.EvalFsiExe(              ) = evalFsiExe      fscript
    member this.GetJS (minified          ) = getJSW minified fscript
    member this.GetJS (minified, callback) = getJSW minified fscript 
                                             |> Wrap.getResult callback
    member this.GetJS (minified, callback) = getJSW minified fscript
                                             |> Wrap.getResult
                                                  (fun (Result(jsO, errs)) -> 
                                                       jsO 
                                                       |> Option.defaultValue (sprintf "Compilation Failed %s"  <| Result.getMessages errs )
                                                       |> callback )
    member this.Source                     = fscript
    static member Read(fname: string)      = getWithIncludes "#load" readFile fname 
                                             |> Transpiler

let translate source minified = 
    async {
        let! r = Transpiler(source).GetJS(minified) |> Wrap.getAsyncR
        return r |> Result.mapMsgs Result.getMessages
    }

let evaluate source           = 
    async {
        let! r = Transpiler(source).EvalFsiExe() |> Wrap.getAsyncR
        return r |> Result.mapMsgs (Seq.map (fun m -> m.ErrMsg) >> String.concat "\n")
    }

(*
#I @"D:\Abe\CIPHERWorkspace\CIPHERPrototype\ZafirTranspiler\bin\Debug\"
#r "ZafirTranspiler.dll"
open CIPHERPrototype.Transpiler
let dimEd = Transpiler.Read @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype5\CIPHERPrototype5\EPFile\FScript\DimensionEditor2.fsx"
printfn "%s" dimEd.Source
dimEd.GetJS(false, fun js -> printfn "%s" js)


let code =
    """
#r @"D:\Abe\CIPHERWorkspace\CIPHERPrototype\Common\packages\Zafir\lib\net40\WebSharper.Core.dll"
#r @"D:\Abe\CIPHERWorkspace\CIPHERPrototype\Common\packages\Zafir\lib\net40\WebSharper.Main.dll"
#r @"D:\Abe\CIPHERWorkspace\CIPHERPrototype\Common\packages\Zafir\lib\net40\WebSharper.Collections.dll"
#r @"D:\Abe\CIPHERWorkspace\CIPHERPrototype\Common\packages\Zafir\lib\net40\WebSharper.JavaScript.dll"
namespace Test
open WebSharper

[<JavaScript>]
module Test1 =
    let getNumber() = 4.0

[<JavaScript>]
module Test2 =
    let add a b = a + b
    let plus    = <@ fun y -> y + Test1.getNumber() @>
    printfn "%A" plus
"""
    |> Transpiler
code.GetJS(false, fun js -> printfn "%s" js)

let readFile2 name = 
    printfn "%s" name
    let r = readFile name
    printfn "%s" r
    r

getWithIncludes "#load" readFile2 @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype5\CIPHERPrototype5\EPFile\FScript\DimensionEditor2.fsx" 
|> Transpiler

readFile2 "3dcs"

Transpiler("""
#if INTERACTIVE

#r @"D:\Abe\CIPHERWorkspace\CIPHERPrototype\WebServer\bin\CIPHERHtml.dll"
#r @"D:\Abe\CIPHERWorkspace\CIPHERPrototype\WebServer\bin\WebSharper.Core.dll"
#r @"D:\Abe\CIPHERWorkspace\CIPHERPrototype\WebServer\bin\WebSharper.Sitelets.dll"
#r @"D:\Abe\CIPHERWorkspace\CIPHERPrototype\WebServer\bin\WebSharper.Main.dll"
#r @"D:\Abe\CIPHERWorkspace\CIPHERPrototype\WebServer\bin\WebSharper.UI.Next.dll"
#r @"D:\Abe\CIPHERWorkspace\CIPHERPrototype\WebServer\bin\WebSharper.JavaScript.dll"
#else
module Test.Test
#endif

open WebSharper
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
//open CIPHERPrototype.CIPHERHtml

[< JavaScript >]
let main() = 
    divAttr [ attr.``class`` "container"
              attr.style     "height:100%"
            ]
            [ h1 [ text "hello" ] ] 
""").GetJS(false, fun js -> printfn "%s" js)

*)