module CIPHERSpace.Transpiler
open Model
open Rop
open System
open System.IO
open System.Diagnostics
open System.Reflection
open WebSharper
open WebSharper.Compiler
open WebSharper.Compile.CommandTools
open WebSharper.Compiler.FrontEnd
open Microsoft.FSharp.Compiler.SourceCodeServices

type tempFileName(fn) =
    interface IDisposable with
        member this.Dispose() = if File.Exists fn then File.Delete fn

module Re = WebSharper.Core.Resources
module P = WebSharper.PathConventions

let TestCompile() =
    let fSharpCore = AppDomain.CurrentDomain.GetAssemblies() |> Array.find (fun (a:System.Reflection.Assembly) -> a.FullName.StartsWith "FSharp.Core");
    let refs              = [
                               "CIPHERPrototype5.dll"
                               "WebSharper.Main.dll"
                               "WebSharper.Core.dll"
                               "WebSharper.Collections.dll"
                               "WebSharper.JavaScript.dll"                        
                            ]
    let basePath          = @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype5\CIPHERPrototype5\bin"
    let sourceFile        = @"D:\Abe\CIPHERWorkspace\TestZafirCompiler\TestZafirCompiler\bin\Debug\test.fs"
    let dllFile           = Path.ChangeExtension(sourceFile, "dll")
    let addPath f         = sprintf f basePath
    let parms             = [ "IGNORED" ]
                          @ [ for ref in refs do yield addPath @"-r:%s\%s" <| ref ]
                          @ [  "--noframework"
                               "--optimize-"
                               "--tailcalls-" 
                               "--target:library"
                               "--warn:3"
                               "--warnaserror:76"
                               "--vserrors"
                               "--LCID:1033" 
                               "--utf8output" 
                               "--fullpaths"
                               "--flaterrors" 
                               "--subsystemversion:6.00"
                               "--highentropyva+"
                               //"--define:FSHARP41"
                               //addPath @"-r:%s\FSharp.Core.dll"
                               @"-o:" + dllFile
                               sourceFile
                            ]
                            |> Array.ofList
    let checker           = FSharpChecker.Create(keepAssemblyContents = true)
    let errors, exitCode  = checker.Compile parms
    let aR                = AssemblyResolver.Create().SearchPaths([| basePath ; addPath @"%s\4.4.0" |])
    let loader            = Loader.Create aR (printfn "%s")
    let assems            = [ for r in refs -> loader.LoadFile(addPath "%s\%s" r, false) ]
    let refMeta           = System.Threading.Tasks.Task.Run(fun () ->
                                let mutable refErrors = false
                                let metas = assems 
                                            |> List.choose (fun r -> 
                                                    try ReadFromAssembly FullMetadata r
                                                    with e -> eprintfn "WebSharper error %s" e.Message
                                                              refErrors <- true
                                                              None
                                               )
                                if   refErrors          then None
                                elif List.isEmpty metas then Some WebSharper.Core.Metadata.Info.Empty 
                                else
                                    try
                                        Some {  WebSharper.Core.Metadata.Info.UnionWithoutDependencies metas with
                                                    Dependencies = WebSharper.Core.DependencyGraph.Graph.NewWithDependencyAssemblies(metas |> Seq.map (fun m -> m.Dependencies)).GetData()
                                             }
                                    with e -> eprintfn "WebSharper error Error merging WebSharper metadata: %s" e.Message
                                              None
                            )
    let compiler          = WebSharper.Compiler.FSharp.WebSharperFSharpCompiler(printfn "%s", checker)
    let comp              = compiler.Compile(refMeta, parms, basePath, @"%s\test.proj") |> Option.get
    let assem             = loader.LoadFile dllFile
    let defaultValue  v   = function | Some x -> x | _ -> v
    let js                = assem
                            |> ModifyAssembly (refMeta.Result |> defaultValue WebSharper.Core.Metadata.Info.Empty) (comp.ToCurrentMetadata(false)) false
    //assem.Write None (addPath @"%s\test.dll")
    let pu = P.PathUtility.VirtualPaths("/")
    let ctx : Resources.Context =
        {
            DebuggingEnabled = true
            DefaultToHttp = false
            GetSetting = fun (name: string) -> None
            GetAssemblyRendering = fun name ->
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
    use  stringW  = new System.IO.StringWriter()
    use  writer   = new System.Web.UI.HtmlTextWriter(stringW)
    comp.Graph.Nodes |> comp.Graph.GetDependencies |> comp.Graph.GetResources |> Seq.iter(fun r -> r.Render ctx (fun _ -> writer) )
    //js.RenderDependencies(ctx, writer)
    let  includes = stringW.ToString()
    includes

let CompileToJsR (context: Core.Resources.Context) (config : WsConfig) : Result<string> =
    Rop.flow {
        do!  config.AssemblyFile <> null     |> Rop.assertR <| ErrExceptionThrown "You must provide assembly output path."
        do!  config.ProjectFile  <> null     |> Rop.assertR <| ErrExceptionThrown "You must provide project file path."   
        let  checker          = FSharpChecker.Create(keepAssemblyContents = true)
        let  errors, exitCode = checker.Compile(config.CompilerArgs)
        do!  exitCode = 0                    |> Rop.assertR <| ErrFSharpCompiler (sprintf "%A" errors  )
        do!  File.Exists config.AssemblyFile |> Rop.assertR <| ErrExceptionThrown "Output assembly not found"
        use  toErase          = new tempFileName(config.AssemblyFile)
        let  paths            = [   for r in config.References -> 
                                        Path.GetFullPath r
                                    yield Path.GetFullPath config.AssemblyFile
                                ]        
        let  aR               = AssemblyResolver.Create().SearchPaths(paths)
        let  loader           = Loader.Create aR (printfn "%s")
        let  refs             = [ for r in config.References -> loader.LoadFile(r, false) ]
        let  refMeta          =
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
        let  compiler    = WebSharper.Compiler.FSharp.WebSharperFSharpCompiler (printfn "%s", checker)
        let! comp        = compiler.Compile(refMeta, config.CompilerArgs, ".", config.ProjectFile) |> Rop.fromOption (ErrFSharpCompiler "Compile returned None")
        do!  List.isEmpty comp.Errors |> Rop.assertR <| ErrWebSharperCompiler (sprintf "%A" comp.Errors) 
        let  assem       = loader.LoadFile config.AssemblyFile
        let! js          = ModifyAssembly (refMeta.Result |> Option.defaultValue WebSharper.Core.Metadata.Info.Empty) 
                                          (comp.ToCurrentMetadata(config.WarnOnly)) config.SourceMap assem
                           |> Rop.fromOption ErrOptionIsNone
        let  thisProject = Path.GetFileNameWithoutExtension config.ProjectFile
        let  ctx = { context with
                       GetAssemblyRendering = fun name -> if name = thisProject 
                                                          then Core.Resources.Rendering.Skip
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

let compileMain context argv =
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
    CompileToJsR context !wsArgs

let compileR_ context (code:string) assemblies = 
    Rop.flow {
        do!  Rop.tryProtection()
        let codeBase  = System.Uri(System.Reflection.Assembly.GetExecutingAssembly().CodeBase).LocalPath
        let fn        = System.IO.Path.Combine(System.IO.Path.GetDirectoryName(codeBase), System.IO.Path.GetRandomFileName())
        let src       = System.IO.Path.GetFullPath(System.IO.Path.ChangeExtension(fn, ".fs"))
        let code2     = code.Split([| "\r\n"; "\n" ; "\r" |], System.StringSplitOptions.None)
                        |> Seq.map(fun line -> if line.StartsWith("#r")
                                               then ("//" + line, line)
                                               else (line       , ""  ))
        System.IO.File.WriteAllText(src, code2 |> Seq.map fst |> String.concat "\r\n" )
        use  toErase  = new tempFileName(src)
        printfn "%s:" src
        let dll       = System.IO.Path.ChangeExtension(src, ".dll")
        let options   = assemblies |> Seq.collect(fun e -> ["-r"; e]) |> Seq.toArray 
                        |> Array.append [|  
                            "IGNOREDfsc.exe"
                            "--noframework"
                            "--optimize-"
                            "--tailcalls-" 
                            "--target:library"
                            "--warn:3"
                            "--warnaserror:76"
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
        return! compileMain context options
    }

let getJSR_ minified (context: Core.Resources.Context) (fsx:string) = 
    let  quoted (line:string) = line.Trim().Split([| "\"" |], System.StringSplitOptions.RemoveEmptyEntries) |> Seq.tryLast
    let  prepro (line:string) = match true with 
                                | true when line.StartsWith("#r"   ) -> ("//" + line, Some line)
                                | true when line.StartsWith("#load") -> ("//" + line, None     )
                                | _                                  -> (       line, None     ) 
    Rop.flow {
        do!  Rop.tryProtection()
        let  fsNass   = fsx.Split([| "\r\n"; "\n" ; "\r" |], System.StringSplitOptions.None) |> Seq.map prepro
        let  fs       = fsNass |> Seq.map fst |> String.concat "\r\n"
        let  assembs  = fsNass |> Seq.choose snd |> Seq.choose quoted |> Seq.toList
        let pu = P.PathUtility.VirtualPaths("/")
        let ctx : Resources.Context =
            {
                DebuggingEnabled = true
                DefaultToHttp = false
                GetSetting = fun (name: string) -> None
                GetAssemblyRendering = fun name ->
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
        return! compileR_ ctx fs assembs
        //return TestCompile()
    }

