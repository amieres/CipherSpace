namespace CIPHERSpace
open Model
open Rop

module Transpiler = 
    open Microsoft.FSharp.Quotations

    let libLocation (lib:string) = System.Reflection.Assembly.Load(lib).Location
    let xxxassemblies =
//        let assemblies = [
//                    "WebSharper.Core"
//                    "WebSharper.Main"
//                    "WebSharper.Collections"
//                    "WebSharper.Control"
//                    "WebSharper.Html.Client"
//                    "WebSharper.Html.Client.Element"
//        ]
        let thisAssembly = System.Reflection.Assembly.GetExecutingAssembly()
        let path = System.Uri(thisAssembly.CodeBase).LocalPath |> System.IO.Path.GetDirectoryName
        thisAssembly.GetReferencedAssemblies()
        |> Seq.map (fun aN -> aN.Name)
//        |> Seq.append assemblies
        |> Seq.filter (fun aN -> aN.StartsWith "WebSharper")
        |> Seq.map    (fun aN -> path + @"\" + aN + ".dll") 
        |> Seq.filter (fun n  -> System.IO.File.Exists n)
        |> Seq.toList |> List.append [ thisAssembly.Location ]

    open WebSharper
    module FE = WebSharper.Compiler.FrontEnd
    let translate2JSR_ (assemblyName: string) assemblies =
        Rop.flow {
            do!  Rop.tryProtection()
            use  errors = new System.IO.StringWriter()
            let  loader =  WebSharper.Compiler.FrontEnd.Loader.Create (IntelliFactory.Core.AssemblyResolution.AssemblyResolver.Create()) (fprintfn errors "%O")
            let  options =
                 { WebSharper.Compiler.FrontEnd.Options.Default with
                     ErrorLimit = 5000
                     References =
                         assemblies
                         |> List.map loader.LoadFile }
            let  compiler =  WebSharper.Compiler.FrontEnd.Prepare options (fprintfn errors "%O")
            let! js = assemblyName |> loader.LoadFile |> compiler.Compile |> Rop.fromOption (ErrWebSharperCompiler <| errors.ToString())
            return js
        }

    open Microsoft.FSharp.Compiler.SimpleSourceCodeServices
    let compileR_ (code:string) assemblies inMemory = 
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
            printfn "%s:" src
            printfn "%s" code
            let scs       = SimpleSourceCodeServices()
            let dll       = System.IO.Path.ChangeExtension(src, ".dll")
            let options   = assemblies |> Seq.collect(fun e -> ["-r"; e]) |> Seq.toArray 
                            |> Array.append [|  "IGNOREDfsc.exe"
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
                                                "-o"; dll
                                                "-a"; src |]
            let errors, exitCode, assemblyO =
                if inMemory
                then                        scs.CompileToDynamicAssembly (options, None)
                else let errors, exitCode = scs.Compile options
                     errors, exitCode, None
            System.IO.File.Delete src
            let result = if exitCode = 0 
                         then (Some dll, assemblyO) |> Rop.succeed
                         else Rop.fail (errors |> Seq.map (sprintf "%A") |> String.concat "\n" |> ErrFSharpCompiler)
            return! result
        }

    let evaluateFExprR_ (source: string) assemblies =
        Rop.flow {
            let  code = "module Temp.Main\nlet result() =\n"
                        + (source.Split([|"\r\n" ; "\n"; "\r"|], System.StringSplitOptions.None)
                           |> Array.map (fun l -> "   " + l)
                           |> String.concat "\n")
            let! dllO, assemblyO  = compileR_ code assemblies true
            let  result = assemblyO |> Option.get |> fun assembly ->
                assembly.GetType("Temp.Main").GetMethod("result").Invoke(null, [||])
            return result
        }

    let getJSR_ minified (context: Core.Resources.Context) (fsx:string) = 
        let  quoted (line:string) = line.Trim().Split([| "\"" |], System.StringSplitOptions.RemoveEmptyEntries) |> Array.tryLast
        let  prepro (line:string) = match true with 
                                    | true when line.StartsWith("#r"   ) -> ("//" + line, Some line)
                                    | true when line.StartsWith("#load") -> ("//" + line, None     )
                                    | _                                  -> (       line, None     ) 
        Rop.flow {
            do!  Rop.tryProtection()
            let  fsNass   = fsx.Split([| "\r\n"; "\n" ; "\r" |], System.StringSplitOptions.None) |> Seq.map prepro
            let  fs       = fsNass |> Seq.map fst |> String.concat "\r\n"
            let  assembs  = fsNass |> Seq.choose snd |> Seq.choose quoted |> Seq.toList
            let! dllO, _  = compileR_ fs assembs false
            let  dll      = dllO |> Option.get
            let! js       = translate2JSR_ dll assembs
            let  dllF     = System.IO.Path.GetFileNameWithoutExtension(dll)
            use stringW   = new System.IO.StringWriter()
            use writer    = new System.Web.UI.HtmlTextWriter(stringW)
            let ctx : Resources.Context = { context with
                                               GetAssemblyRendering = fun name -> if name.Name <> dllF 
                                                                                  then context.GetAssemblyRendering name 
                                                                                  else Core.Resources.Rendering.Skip
                                          }
            let dependencies = js.AssemblyInfo.Requirements |> Seq.map fst |> js.Info.GetDependencies 
            dependencies |> Seq.iter(fun r -> r.Render ctx (fun _ -> writer) )
            js.RenderDependencies(ctx, writer)
            let  includes = stringW.ToString()
            let  incs     = includes.Split([| "src="; "href=" ; "<" ; ">" |], System.StringSplitOptions.RemoveEmptyEntries)
                            |> Seq.choose(fun v -> if v.[0] = '"' then v.Split([| '"' |], System.StringSplitOptions.RemoveEmptyEntries).[0] |> Some else None)
                            |> Seq.map (fun v -> sprintf "\"%s\"" v) |> String.concat ", "
            let  f        = (if minified then js.CompressedJavaScript else js.ReadableJavaScript)
            let  result   = sprintf "CIPHERSpaceLoadFiles([%s], %s);" incs f.[1..f.Length - 7]
            System.IO.File.Delete dll
            System.IO.File.Delete (dllF + ".tmp")
            return result
        }

