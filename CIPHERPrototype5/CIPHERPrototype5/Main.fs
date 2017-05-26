namespace CIPHERSpace
open System
open System.Web
open System.IO

open Model
open Rop
open Model2

open WebSharper
open WebSharper.Sitelets
open WebSharper.Html.Server

module Templating =

    let MainTemplate =
        Content.Template<string * Element>("~/Main.html")
            .With("title", fst)
            .With("body" , snd)

    let mainPage title body : Async<Content<EndPoint>> = Content.WithTemplate MainTemplate (title, body)

    let mainContent title quote = mainPage title (Div [ ClientSide quote ])

module Site =
    open Repository
    open Templating

    //let getContentPage (ctx:Context<_>) (cp:string) : ContentPage option =
    //    let router = Router.Infer<ContentPage>()
    //    let request = { ctx.Request with Http.Request.Uri = System.Uri(ctx.Request.Uri, "/" + cp) }
    //    router.Route request

    type Navigation(ctx, user:User, dc) =
        let funcsR =
            Rop.flow {
                let! _Navigation           = user.dimByNameR_ dc "_Navigation"
                let! relsS                 = _Navigation.RelWithNamesR_()
                let  rels                  = relsS |> Seq.toArray
                let! elems                 = _Navigation.ElementsR_ dc
                let! attributes            = _Navigation.AttributesR_  ()
                let! attCPage              = attributes |> Array.tryFind(fun attr -> attr.attribute_name = "ContentPage" ) |> Rop.fromOption (ErrRecordNotFound("Attribute", "ContentPage"))
                let! attTPage              = attributes |> Array.tryFind(fun attr -> attr.attribute_name = "TemplatePage") |> Rop.fromOption (ErrRecordNotFound("Attribute", "ContentPage"))
                let! cPageVals             = _Navigation.AttValsByIdR_  attCPage.attribute_code
                let! tPageVals             = _Navigation.AttValsByIdR_  attTPage.attribute_code
                let  getCPageO_       code = cPageVals |> Array.tryFind (fun attV -> attV.element_code = code)  |> Option.bind (fun attV -> attV.value_string) |> function | Some "" -> None | v -> v
                let  getTPageO_       code = tPageVals |> Array.tryFind (fun attV -> attV.element_code = code)  |> Option.bind (fun attV -> attV.value_string) |> function | Some "" -> None | v -> v
                let  findElemByCodeR_ code = elems     |> Array.tryFind (fun elem -> elem.element_code = code)  |> Rop.fromOption (ErrRecordNotFound("Menu", code.ToString()))
                let  findElemByNameR_ name = elems     |> Array.tryFind (fun elem -> elem.element_name = name)  |> Rop.fromOption (ErrRecordNotFound("Menu", name           ))
                let  getItemDef_ name      = findElemByNameR_ name 
                                             |> Rop.mapR (fun elem -> 
                                                              elem.element_code |> getCPageO_ |> Option.defaultValue "" 
                                                            , elem.element_code |> getTPageO_ |> Option.defaultValue "" 
                                                         ) 
                let  getDescriptionO_ name = findElemByNameR_ name 
                                             |> Rop.mapR (fun elem -> elem.element_description |> Option.bind (fun d -> if d.Trim() = "" then None else Some d)) 
                                             |> Rop.ifError None
                return getItemDef_, getDescriptionO_
            }
        let getItemDef0R_, getDescriptionO_ = 
            match funcsR with
            | Success ((getItemDefR_, getDescriptionO_), _) -> getItemDefR_         , getDescriptionO_
            | Failure ms                                    -> (fun s -> Failure ms), (fun x -> Some x)

        member this.getItemDefR_    (name:string) = getItemDef0R_ name
        member this.getDescription_ (name:string) = getDescriptionO_ name |> Option.defaultValue name

    type SessionCtx(ctxP:Context<EndPoint>, endpointP: EndPoint, userP:User, clientP:Client, navLP:Lazy<Navigation>, dcP:DataCache) =
        member this.ctx      = ctxP
        member this.endpoint = endpointP
        member this.user     = userP
        member this.client   = clientP
        member this.nav      = navLP.Value
        member this.dc       = dcP

    let getTitle (stx:SessionCtx) =
        match stx.endpoint with
        | EPEntry             
        | EPHome              
        | EPContent CPHomePage   -> "Home"
        | EPLogout               
        | EPContent CPLogout     -> "Logout"
        | EPContent(CPItem n)    
        | EPItem           n     -> n |> HttpUtility.UrlDecode |> stx.nav.getDescription_ 
        | EPContent CPUploadForm -> "Upload Files"
        | EPFile       filename  -> filename
        | EPJavaScript filename  -> filename
        | _                      -> sprintf "%A" stx.endpoint

    type DisplayData = {
        uniqueId  : string
        userName  : string
        clientName: string
        industry  : string
        param1    : string
        param2    : string
    }

    let (|FScript|_| ) (s:string) = if s.ToLower().EndsWith".fsx"  || s.ToLower().EndsWith ".fs" then Some s else None
    let (|HtmlFrag|_|) (s:string) = if s.ToLower().EndsWith".html"                               then Some s else None
    let (|SomeFile|_|) (s:string) = if s.Contains "."                                            then Some s else None

    open System.Text.RegularExpressions

    let rec includeFile (stx:SessionCtx) file p1 p2 : Result<Element> =
        Rop.flow {
            do! Rop.tryProtection()
            let file = HttpUtility.UrlDecode(file).Replace("|", "/")
            let rec replace_navs (elems: Web.INode list) =
                elems
                |> List.map(fun (node: Web.INode) ->
                    if node.IsAttribute then node
                    else match node :?> Element with
                         | TagContent   tag  when tag.Attributes |> Seq.exists (fun attr -> attr.Name = Some "_include")
                                             -> tag.Attributes |> Seq.pick (fun attr -> 
                                                    if attr.Name = Some "_include" 
                                                    then { tag with Contents = [attr.AttributeValue   
                                                                                |> Option.defaultValue "" 
                                                                                |> itemContentPageR stx
                                                                                |> Rop.ifError (Div [])
                                                                               ]
                                                         } 
                                                         |> TagContent |> Some
                                                    else None)
                         | TagContent   tag  -> { tag with Contents   = tag.Contents |> replace_navs } |> TagContent 
                         | _                 -> node :?> Element
                        :> Web.INode
                )

            let! info, lastModified = stx.client.getFileInfoR_ file stx.user stx.dc
            let path = System.IO.Path.Combine(stx.ctx.RootFolder, "templates")
            System.IO.Directory.CreateDirectory path |> ignore
            let filename = System.IO.Path.Combine(path, info.object_code.ToString())
            if not (System.IO.File.Exists filename) || System.IO.File.GetLastWriteTime filename < lastModified then
                let! blob, content, code, _ = stx.client.getFileR_ file stx.user stx.dc
                use  bw = new System.IO.BinaryWriter(new System.IO.FileStream(filename, System.IO.FileMode.Create))
                bw.Write(blob)
                bw.Close()
            let parsed =
                Content.Template<DisplayData>(filename)
                            .With("username"  , fun x -> x.userName  )
                            .With("clientname", fun x -> x.clientName)
                            .With("industry"  , fun x -> x.industry  )
                            .With("uniqueId"  , fun x -> x.uniqueId  )
                            .With("param1"    , fun x -> x.param1    )
                            .With("param2"    , fun x -> x.param2    )
                            .Run({ userName   = stx.user.name_             stx.dc
                                   clientName = stx.client.name_           stx.dc
                                   industry   = stx.client.industryTypeRO_ stx.dc |> Rop.ifError None |> Option.defaultValue ""
                                   uniqueId   = System.Guid.NewGuid().ToString().Replace("-", "")
                                   param1     = p1
                                   param2     = p2
                            })
            return parsed |> Seq.toList |> replace_navs |> Seq.head :?> Element
        }

    and itemDefNode (stx:SessionCtx) (nodeName:string) (resources:string) (code:string) =
        let trimA = Array.map (fun (s:string) -> s.Trim())
        let processIncl (incl:string) =
            let var, name = incl.Split([|"="|], System.StringSplitOptions.None) |> trimA |> (fun a -> a.[0], (a |> Seq.last))
            match name with
            | HtmlFrag _ -> HttpUtility.UrlDecode(name).Replace("|", "/")
                            |> stx.client.getFileR_ <| stx.user <| stx.dc
                            |> Rop.mapR (fun (blob, content, _, _) -> 
                                 [||]
                               , System.Text.Encoding.UTF8.GetString(blob.[3..]).Replace("</script>", @"<${'/script'}>")
                                 |>sprintf "var %s = parameter => { var v =`%s`; return { inner: (t => H.NewTag(t||'div', [ H.__innerHtml(v) ])), outer: () => H.__outerHtml(v) }}" var
                            )
            | _          -> stx.nav.getItemDefR_ name 
                            |> Rop.mapR (fun (resources, code) -> itemDefNode stx name resources code)
                            |> Rop.mapR (fun (scripts  , code) -> 
                                             (scripts  , if var = name then code 
                                                          else sprintf "%s\n var %s = %s; var %s_ = %s.$0;" code var name var var
                                             ))
            |> Rop.mapR    Some
            |> Rop.ifError None
        let subs n vs           = vs |> Array.map (fun v -> sprintf "%s.subscribe(\"%s\", f);" v n) |> String.concat " " |> sprintf "function (f) { %s }"
//        let matches f0 f subs v = Regex.Matches(v, regex.Replace("%s", f0), RegexOptions.Compiled + RegexOptions.IgnorePatternWhitespace + RegexOptions.ExplicitCapture)
//                                  |> Seq.cast<Match> |> Seq.filter (fun m -> m.Groups.Item("Close").Value <> "") 
//                                  |> Seq.foldBack (fun m (v:string, r) -> v.Substring(0, m.Index), "C.DynNode.node(function(){ return " + f + m.Groups.Item("Close").Value + "; }, " + subs + " ) " + v.Substring(m.Index + m.Length) + r) <| (v, "")
//                                  |> (fun (a,b) -> a + b)
//        let regex = """(?<String>)'.*?'(?<String-String>) |
//                       (?<String>)".*?"(?<String-String>) |
//                       \b (?<Func>)%s(?<Func-Func>) \b \s*
//                         (?<Open>) \(
//                         (
//                           (?<Open>)       \( |
//                           \) (?<Close-Open>) |
//                           [^()']             |
//                           '.*?'              |
//                           ".*?"
//                         )+?
//                       (?(Open)(?!))"""
//        let codeF               = varsContents2 |> Array.map fst |> Array.groupBy(fun (name, vars) -> name)
//                                  |> Array.collect (snd >> Array.mapi (fun i (name, vars) -> 
//                                      let f0 = sprintf "%s_%d" name i
//                                      matches f0 name (subs f0 vars) ))
//                                  |> Array.fold (fun s f -> f s) code // (codeP |> Array.last)
        let scripts, codes  = 
            resources.Split([|","|], System.StringSplitOptions.RemoveEmptyEntries) 
            |> trimA
            |> Array.map (
                fun s ->
                    match s with
                    | HtmlFrag s -> s.Contains "=" |> not
                    | SomeFile _ -> true
                    | _          -> false
                    |> function
                       | true  -> ([| s |], [||])
                       | false -> processIncl s
                                  |> Option.map(fun (scripts, code) -> scripts, [|code|])
                                  |> Option.defaultValue ([||], [||])
            )
            |> fun a -> (a |> Array.collect fst), (a |> Array.collect snd)
        let decls = codes |> Seq.distinct |> String.concat "\n"
        let final = sprintf """
            var %s = function(parent) { 
            var base = parent.concat(":%s");
            %s
            return (() => %s)(); }(base);""" nodeName nodeName decls code
        scripts, final

    and itemDefContentPageR (stx:SessionCtx) resources code =
        let scripts, code = itemDefNode stx "_main_" resources code 
        let scriptsU      = scripts 
                            |> Array.map (function | FScript f -> "/EPJavaScript/FScript/" + f | f -> f)
                            |> Seq.map (fun f -> "\"" + f.Replace("|", "/") + "\"") |> Seq.distinct |> String.concat ","
        includeFile stx "form|Basic.html" scriptsU code

    and itemContentPageR (stx:SessionCtx) item =
        item |> stx.nav.getItemDefR_ |> Rop.bindR (fun (resources, code) -> itemDefContentPageR stx resources code)

    and contentPageR (stx:SessionCtx) contentPage =
        let isGuestUser = stx.user.isGuest_()
        match contentPage with
        | CPNode(resources,code)  -> (HttpUtility.UrlDecode(resources), HttpUtility.UrlDecode(code))
                                                                 ||> itemDefContentPageR stx
        | CPHomePage              -> "Main Menu"                  |> itemContentPageR    stx
        | CPItem     item         -> HttpUtility.UrlDecode item   |> itemContentPageR    stx
        | CPLogout                -> stx.ctx.UserSession.Logout() |> Async.RunSynchronously; Rop.fail ErrUserIsNotLoggedIn
        | CPUploadForm            -> let themeTag = stx.user.themeTagsR_ stx.dc  |> Rop.ifError ""
                                     let client   = stx.client
                                     Div [ ClientSide <@ UploadForm.showForm_ "Upload Files" themeTag client @> ] |> Rop.succeed 
        
    let respondFile (stx:SessionCtx) filename content writeBody =
        Rop.flow{
            let! record, lastModified = stx.client.getFileInfoR_ filename stx.user stx.dc
            let  headerContent  = content |> Option.defaultValue (record.content_type |> Option.defaultValue "text/plain")
            let  headerModified = lastModified.ToString()
            let  headerETag     = record.object_code.ToString()
            let  headers        = [ Http.Header.Custom "Content-Type"  <| headerContent
                                    Http.Header.Custom "Last-Modified" <| headerModified
                                    Http.Header.Custom "ETag"          <| headerETag
                                    Http.Header.Custom "Cache-Control" <| "private, max-age=0"
                                  ]
            let  notModified    = (stx.ctx.Request.Headers |> Seq.exists (fun (h:Http.Header) -> h.Name = "If-Modified-Since" && h.Value = headerModified))
                               && (stx.ctx.Request.Headers |> Seq.exists (fun (h:Http.Header) -> h.Name = "If-None-Match"     && h.Value = headerETag    ))
            return
                if notModified 
                then Content.Custom(Status = Http.Status.Custom 304 (Some "Not Modified"), Headers = headers                       )
                else Content.Custom(Status = Http.Status.Ok                              , Headers = headers, WriteBody = writeBody)                
        }

    let produceFile (stx:SessionCtx) filename =
        let writeBody (s: System.IO.Stream) =
            stx.client.getFileR_ filename stx.user stx.dc
            |> Rop.mapR (fun (blob, _, _, _) -> s.Write(blob, 0, blob.Length)) 
            |> ignore
        respondFile stx filename None writeBody
        
    let javaScriptFile (stx:SessionCtx) filename =
        let getFSFileR_ file = stx.client.getFileR_ file stx.user stx.dc
                               |> Rop.mapR (fun (blob, _, _, _) -> System.Text.Encoding.UTF8.GetString(blob.[3..]))
        let getWithIncludesR_ () =
            Rop.flow {
                let start = "//#load "
                let nl = "\r\n"
                let lineDirective i file = sprintf "# %d @\"%s\"%s" (i+1) file nl
                let lineDirective0  file = (Path.GetFileNameWithoutExtension file    ) + "_"
                                         + (Path.GetFileNameWithoutExtension filename)
                                           |> lineDirective 0
                let! mainFile = getFSFileR_ filename
                return
                    mainFile.Split([| nl |], System.StringSplitOptions.None)
                    |> Seq.mapi (fun i line ->
                        if line.StartsWith(start)
                        then let file   = line.[start.Length..].Trim()
                             let inject = getFSFileR_ file |> Rop.ifError (line + " FILE NOT FOUND ******")
                             sprintf "%s%s%s%s" (lineDirective0 file) inject nl (lineDirective i filename)
                        else line)
                    |> Seq.append [ lineDirective 0 filename ]
                    |> String.concat nl
            }
        let writeBody (s: System.IO.Stream) =
            getWithIncludesR_()
            |> Rop.bindR (Transpiler.getJSR_ false stx.ctx.ResourceContext)
            |> function
               | Failure ms     -> sprintf "%A" ms
               | Success(js, _) -> js
            |> System.Text.Encoding.UTF8.GetBytes
            |> fun blob2 -> s.Write(blob2, 0, blob2.Length) 
        respondFile stx filename (Some "text/javascript") writeBody

    let getUserR (ctx: Context<EndPoint>) =
        ctx.UserSession.GetLoggedInUser()
        |> Async.RunSynchronously
        |> Option.map (fun userCodeS -> User (new System.Guid(userCodeS)))
        |> Rop.fromOption ErrUserIsNotLoggedIn

    [<Website>]
    let Main = 
        let site (ctx: Context<EndPoint>) (endpoint: EndPoint) =
            Rop.flow {
                let! user      = getUserR                ctx
                let  dc        = DataCache()
                let! client    = user.currentClientR_    dc
                let  stx       = SessionCtx(ctx, endpoint, user, client, lazy Navigation(ctx, user, dc), dc)
                let  mainPageL = lazy (getTitle stx |> mainPage)
                return!
                    match endpoint with
                    | EPFile               filename -> HttpUtility.UrlDecode filename |> produceFile      stx 
                    | EPJavaScript         filename -> HttpUtility.UrlDecode filename |> javaScriptFile   stx 
                    | EPItem               item     -> HttpUtility.UrlDecode item     |> itemContentPageR stx  |> Rop.mapR mainPageL.Value
                    | EPContent            content  -> content                        |> contentPageR     stx  |> Rop.mapR mainPageL.Value
                    | EPEntry            | EPHome   -> CPHomePage                     |> contentPageR     stx  |> Rop.mapR mainPageL.Value
                    | EPContent CPLogout | EPLogout -> ctx.UserSession.Logout()       |> Async.RunSynchronously ; Rop.fail ErrUserIsNotLoggedIn
            } |> function 
                    | Success (v, _)                -> v
                    | Failure m                     -> let msg        = if m = [ErrUserIsNotLoggedIn] then None else Some (sprintf "%A" m)
                                                       let goHomeLink = ctx.Link EPHome
                                                       mainContent "Login" <@ LoginForm.showForm_ goHomeLink msg  @>
        Application.MultiPage site




