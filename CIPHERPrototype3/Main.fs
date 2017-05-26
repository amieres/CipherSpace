namespace CIPHERSpace
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

    let getContentPage (ctx:Context<_>) (cp:string) : ContentPage option =
        let router = Router.Infer<ContentPage>()
        let request = { ctx.Request with Http.Request.Uri = System.Uri(ctx.Request.Uri, "/" + cp) }
        router.Route request

    type Navigation(ctx, user:User, dc) =
        let funcsR =
            Rop.flow {
                let! _Navigation = user.dimByNameR_ dc "_Navigation"
                let! relsS       = _Navigation.RelWithNamesR_()
                let  rels        = relsS |> Seq.toArray
                let! elems       = _Navigation.ElementsR_ dc
                let! attributes  = _Navigation.AttributesR_  ()
                let! attCPage    = attributes |> Array.tryFind(fun attr -> attr.attribute_name = "ContentPage") |> Rop.fromOption (ErrRecordNotFound("Attribute", "ContentPage"))
                let! pageLinks   = _Navigation.AttValsByIdR_  attCPage.attribute_code
                let  findLinkByCodeO_ code = pageLinks |> Array.tryFind (fun attV -> attV.element_code = code)  |> Option.map (fun attV -> attV.value_string) |> function | Some(Some("")) -> None | Some(v) -> v | None -> None
                let  findElemByCodeR_ code = elems     |> Array.tryFind (fun elem -> elem.element_code = code)  |> Rop.fromOption (ErrRecordNotFound("Menu"     , code.ToString()))
                let  findElemByNameR_ name = elems     |> Array.tryFind (fun elem -> elem.element_name = name)  |> Rop.fromOption (ErrRecordNotFound("Menu"     , name           ))
                let  getLink_ name = findElemByNameR_ name 
                                     |> Rop.mapR (fun elem -> 
                                                     elem.element_code 
                                                     |> findLinkByCodeO_ 
                                                     |> function 
                                                        | Some v -> "/EPContent/CPEntry/" + name
                                                        | None   -> "#"
                                                ) 
                                     |> Rop.ifError ("#" + name)
                let  getContent name = findElemByNameR_ name 
                                       |> Rop.mapR (fun elem -> 
                                                        elem.element_code 
                                                        |> findLinkByCodeO_ 
                                                   ) 
                                       |> Rop.ifError None
                let getContentPage_ name = name
                                           |> getContent         |> Option.defaultV "" 
                                           |> getContentPage ctx 
                let  getDescriptionO_ name = 
                    findElemByNameR_ name 
                    |> Rop.mapR (fun elem -> elem.element_description |> Option.bind (fun d -> if d.Trim() = "" then None else Some d)) 
                    |> Rop.ifError None
                return getContentPage_, getLink_, getDescriptionO_
            }
        let getContentPageO_, getLink0_, getDescriptionO_ = 
            match funcsR with
            | Success ((getContentPageO_, getLink0_, getDescriptionO_), _) -> getContentPageO_, getLink0_, getDescriptionO_
            | _                                                            -> (fun s -> None), (fun s-> "#" + s), (fun x -> Some x)
        member this.getLink_        (name:string) = getLink0_        name 
        member this.getContentPageR_(name:string) = getContentPageO_ name |> Rop.fromOption (ErrInvalidContentPageForClient name)
        member this.getDescription_ (name:string) = getDescriptionO_ name |> Option.defaultV name
      
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

    let rec includeFile (ctx: Context<EndPoint>) (nav: Navigation) (user: User) (client: Client) file p1 p2 dc : Result<Element> =
        Rop.flow {
            let file = System.Web.HttpUtility.UrlDecode(file).Replace("|", "/")
            let p1   = System.Web.HttpUtility.UrlDecode(p1)
            let p2   = System.Web.HttpUtility.UrlDecode(p2)
            let rec replace_navs (elems: Web.INode list) =
                let newAttr (attr: Web.INode) =
                    match attr with
                    | attr when attr.IsAttribute && attr.Name   |> Option.defaultV "" = "_nav" 
                                        -> attr.AttributeValue  |> Option.defaultV "" |> nav.getLink_ |> Attr.HRef :> Web.INode
                    | attr              -> attr
                elems
                |> List.map(fun (node: Web.INode) ->
                    if node.IsAttribute then node |> newAttr
                    else match node :?> Element with
                         | TagContent   tag  when tag.Attributes |> Seq.exists (fun attr -> attr.Name = Some "_include")
                                             -> tag.Attributes |> Seq.pick (fun attr -> 
                                                    if attr.Name = Some "_include" 
                                                    then { tag with Contents = [attr.AttributeValue   |> Option.defaultV "" 
                                                                                |> nav.getContentPageR_ 
                                                                                |> Rop.bindR (contentPageR_ ctx nav user client dc)
                                                                                |> Rop.ifError (Div [])
                                                                               ]
                                                         } 
                                                         |> TagContent |> Some
                                                    else None)
                         | TagContent   tag  -> { tag with Attributes = tag.Attributes |> List.map newAttr 
                                                           Contents   = tag.Contents   |> replace_navs
                                                } |> TagContent 
                         | INodeContent node -> node |> newAttr |> INodeContent
                         | elem              -> elem
                        :> Web.INode
                )

            let! info, lastModified = client.getFileInfoR_ file user dc
            let path = System.IO.Path.Combine(ctx.RootFolder, "templates")
            System.IO.Directory.CreateDirectory path |> ignore
            let filename = System.IO.Path.Combine(path, info.object_code.ToString())
            if not (System.IO.File.Exists filename) || System.IO.File.GetLastWriteTime filename < lastModified then
                let! blob, content, code, _ = client.getFileR_ file user dc
                use  bw = new System.IO.BinaryWriter(new System.IO.FileStream(filename, System.IO.FileMode.Create))
                bw.Write(blob)
                bw.Close()
            let parsed =
                Content.Template<DisplayData>(filename)
                            .With("username"  , fun x -> x.userName  )
                            .With("clientname", fun x -> x.clientName)
                            .With("industry"  , fun x -> x.industry  )
                            .With("param1"    , fun x -> x.param1    )
                            .With("param2"    , fun x -> x.param2    )
                            .With("uniqueId"  , fun x -> x.uniqueId )
                            .Run({ userName   = user.name_ dc
                                   clientName = client.name_ dc
                                   industry   = client.industryTypeRO_ dc |> Rop.ifError None |> Option.defaultV ""
                                   param1     = p1
                                   param2     = p2
                                   uniqueId   = System.Guid.NewGuid().ToString().Replace("-", "")
                            })
            return parsed |> Seq.toList |> replace_navs |> Seq.head :?> Element
        }

    and cpNode2 ctx (nav: Navigation) (user: User) (client: Client) dc (includes:string) (code:string) (nodeName:string) =
        let trimA            = Array.map (fun (s:string) -> s.Trim())
        let processIncl (incl:string) =
            let var, name = incl.Split([|"="|], System.StringSplitOptions.None) |> trimA |> (fun a -> a.[0], (a |> Array.last))
            match name with
            | HtmlFrag _ -> System.Web.HttpUtility.UrlDecode(name).Replace("|", "/")
                            |> client.getFileR_ <| user <| dc
                            |> Rop.mapR (fun (blob, content, _, _) -> 
                                 [||]
                               , System.Text.Encoding.UTF8.GetString(blob.[3..]).Replace("</script>", @"<${'/script'}>")
                                 |>sprintf "var %s = parameter => H.Div([H.NewAttr('dangerouslySetInnerHTML', {__html: `%s`})]);" var
                            )
            | _          -> nav.getContentPageR_ name 
                            |> Rop.mapR (contentNode ctx nav user client dc name)
                            |> Rop.mapR (fun (scripts, code) -> 
                                             (scripts, if var = name then code 
                                                       else sprintf "%s\n var %s = %s; var %s_ = %s.$0;" code var name var var
                                        ))
            |> Rop.mapR Some
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
            includes.Split([|","|], System.StringSplitOptions.RemoveEmptyEntries) 
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
                                  |> Option.defaultV ([||], [||])
            )
            |> fun a -> (a |> Array.collect fst), (a |> Array.collect snd)
        let decls = codes |> Array.distinct |> String.concat "\n"
        let final = sprintf """
            var %s = function(parent) { 
            var base = parent.concat(":%s");
            %s
            return (() => %s)(); }(base);""" nodeName nodeName decls code
        scripts, final
    and contentNode ctx (nav: Navigation) (user: User) (client: Client) dc name contentPage : string[] * string =
        let render (e:Web.INode) =
            use stringW   = new System.IO.StringWriter()
            use writer    = new System.Web.UI.HtmlTextWriter(stringW)
            e.Write (ctx.Metadata, writer)
            stringW.ToString().Replace("/", "\\/").Replace("$(", "${")
        match contentPage with
        | CPNode(includes,code)   -> cpNode2 ctx nav user client dc (System.Web.HttpUtility.UrlDecode(includes)) code name |> Rop.succeed
        | CPEntry   entry         -> System.Web.HttpUtility.UrlDecode(entry) |> nav.getContentPageR_ |> Rop.mapR (contentNode ctx nav user client dc (name +  "_" + entry))
        | CPInclude(file, p1, p2) -> includeFile ctx nav user client file p1 p2 dc |> Rop.mapR (fun e -> [| |], e |> render |> sprintf "%s = function (parameter) { return H.Div([H.NewAttr('dangerouslySetInnerHTML', {__html: `%s`})]); }" name)
        | _                       -> contentPage.ToString() |> ErrFeatureNotImplemented |> Rop.fail
        |>  Rop.ifError ([| |], "")
//        | CPLogout                -> ctx.UserSession.Logout () |> Async.RunSynchronously; Rop.fail ErrUserIsNotLoggedIn
//        | CPHomePage              -> "Main Menu" |> nav.getContentPageR_ |> Rop.bindR (contentPageR_ ctx nav user client dc)
//        | CPUploadForm            -> let themeTag = user.themeTagsR_ dc |> Rop.ifError ""
//                                     Div [ ClientSide <@ UploadForm.showForm_ "Upload Files" themeTag client @> ] |> Rop.succeed 
    and contentPageR_ ctx (nav: Navigation) (user: User) (client: Client) dc contentPage =
        let cpNode includes nodes =
            let scripts, code = contentNode ctx nav user client dc "_main_" contentPage 
            let scriptsU      = scripts 
                                |> Array.map (function | FScript f -> "/EPJavaScript/FScript/" + f | f -> f)
                                |> Seq.map (fun f -> "\"" + f.Replace("|", "/") + "\"") |> Seq.distinct |> String.concat ","
            includeFile ctx nav user client "form|Basic.html" scriptsU code dc
        let isGuestUser = user.isGuest_()
        match contentPage with
        | CPEntry   entry         -> System.Web.HttpUtility.UrlDecode(entry) |> nav.getContentPageR_ |> Rop.bindR (contentPageR_ ctx nav user client dc)
        | CPInclude(file, p1, p2) -> includeFile ctx nav user client file p1 p2 dc
        | CPNode(includes,code)   -> cpNode (System.Web.HttpUtility.UrlDecode(includes)) (System.Web.HttpUtility.UrlDecode(code))
        | CPLogout                -> ctx.UserSession.Logout () |> Async.RunSynchronously; Rop.fail ErrUserIsNotLoggedIn
        | CPHomePage              -> "Main Menu" |> nav.getContentPageR_ |> Rop.bindR (contentPageR_ ctx nav user client dc)
        | CPUploadForm            -> let themeTag = user.themeTagsR_ dc |> Rop.ifError ""
                                     Div [ ClientSide <@ UploadForm.showForm_ "Upload Files" themeTag client @> ] |> Rop.succeed 
        
    let respondFile ctx (user: User) (client: Client) dc filename content writeBody =
        Rop.flow{
            let! record, lastModified = client.getFileInfoR_ filename user dc
            let  headerContent  = content |> Option.defaultV (record.content_type |> Option.defaultV "text/plain")
            let  headerModified = lastModified.ToString()
            let  headerETag     = record.object_code.ToString()
            let  headers        = [ Http.Header.Custom "Content-Type"  <| headerContent
                                    Http.Header.Custom "Last-Modified" <| headerModified
                                    Http.Header.Custom "ETag"          <| headerETag
                                    Http.Header.Custom "Cache-Control" <| "private, max-age=0"
                                  ]
            let  notModified    = (ctx.Request.Headers |> Seq.exists (fun (h:Http.Header) -> h.Name = "If-Modified-Since" && h.Value = headerModified))
                               && (ctx.Request.Headers |> Seq.exists (fun (h:Http.Header) -> h.Name = "If-None-Match"     && h.Value = headerETag    ))
            return
                if notModified 
                then Content.Custom(Status = Http.Status.Custom 304 (Some "Not Modified"), Headers = headers                       )
                else Content.Custom(Status = Http.Status.Ok                              , Headers = headers, WriteBody = writeBody)                
        }

    let produceFile ctx (user: User) (client: Client) dc filename =
        let writeBody = fun (s: System.IO.Stream) -> client.getFileR_ filename user dc
                                                     |> Rop.mapR (fun (blob, _, _, _) -> s.Write(blob, 0, blob.Length)) 
                                                     |> ignore
        respondFile ctx user client dc filename None writeBody
        
    let javaScriptFile (ctx: Context<EndPoint>) (user: User) (client: Client) dc filename =
        let getFSFileR_ file = client.getFileR_ file user dc
                               |> Rop.mapR (fun (blob, _, _, _) -> System.Text.Encoding.UTF8.GetString(blob.[3..]))
        let getWithIncludesR_ () =
            Rop.flow {
                let start = "//#load "
                let nl = "\r\n"
                let lineDirective i file = sprintf "# %d @\"%s\"%s" (i+1) file nl
                let! mainFile = getFSFileR_ filename
                return
                    mainFile.Split([| nl |], System.StringSplitOptions.None)
                    |> Seq.mapi (fun i line ->
                        if line.StartsWith(start)
                        then let file   = line.[start.Length..].Trim()
                             let inject = getFSFileR_ file |> Rop.ifError (line + " FILE NOT FOUND ******")
                             sprintf "%s%s%s%s" (lineDirective 0 file) inject nl (lineDirective i filename)
                        else line)
                    |> String.concat nl
            }
        let writeBody = fun (s: System.IO.Stream) -> getWithIncludesR_()
                                                     |> Rop.bindR (Transpiler.getJSR_ false ctx.ResourceContext)
                                                     |> function
                                                         | Failure ms     -> sprintf "%A" ms
                                                         | Success(js, _) -> js
                                                     |> System.Text.Encoding.UTF8.GetBytes
                                                     |> fun blob2 -> s.Write(blob2, 0, blob2.Length) 
        respondFile ctx user client dc filename (Some "text/javascript") writeBody

    let getTitle_ endpoint user dc (nav:Lazy<Navigation>) =
        match endpoint with
                 | EPLogout                -> "Logout"
                 | EPEntry                 -> "Home"
                 | EPHome                  -> "Home"
                 | EPContent(CPEntry(n))   -> n |> System.Web.HttpUtility.UrlDecode |> nav.Value.getDescription_ 
                 | EPContent(_)            -> "Content"
                 | EPFile(_)               -> ""
                 | EPJavaScript(_)         -> ""

    let getUserR_ ctx = 
        ctx.UserSession.GetLoggedInUser()
        |> Async.RunSynchronously
        |> Option.map (fun userCodeS -> User (new System.Guid(userCodeS)))
        |> Rop.fromOption ErrUserIsNotLoggedIn

    let site ctx (endpoint: EndPoint) =        
        let goHomeLink = ctx.Link EPHome
        let none: string option = None
        Rop.flow {
            do!  Rop.tryProtection()
            let! user      = getUserR_  ctx
            let  dc        = DataCache()
            let  username  = user.name_              dc
            let! client    = user.currentClientR_    dc
            let  nav       = lazy Navigation(ctx, user, dc)
            let  title     = getTitle_ endpoint user dc nav
            let! result    =
                match endpoint with
                | EPContent(CPLogout)
                | EPLogout                -> ctx.UserSession.Logout () |> Async.RunSynchronously          ;  Rop.fail ErrUserIsNotLoggedIn
                | EPEntry                 
                | EPHome                  -> contentPageR_  ctx nav.Value user client dc CPHomePage |> Rop.mapR (mainPage title)
                | EPFile      (filename)  -> produceFile    ctx           user client dc (System.Web.HttpUtility.UrlDecode filename)
                | EPJavaScript(filename)  -> javaScriptFile ctx           user client dc (System.Web.HttpUtility.UrlDecode filename)
                | EPContent   (content )  -> contentPageR_  ctx nav.Value user client dc content    |> Rop.mapR (mainPage title)
            return result
        } |> function 
                | Success (v, _)                 -> v
                | Failure [ErrUserIsNotLoggedIn] -> mainContent "Login" <@ LoginForm.showForm_ goHomeLink none                    @>
                | Failure m                      -> let msg = Some (sprintf "%A" m)
                                                    mainContent "Login" <@ LoginForm.showForm_ goHomeLink msg @>

    [<Website>]
    let Main = Application.MultiPage site



