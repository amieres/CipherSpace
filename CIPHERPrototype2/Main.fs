namespace CIPHERPrototype1
open Model
open Model2
open WebSharper
open WebSharper.Sitelets
open Rop
open Repository
open Server

module Dockers =
    open WebSharper.Html.Server

    let allDockers = [
        DockerData(DckEmpty       , "None"        , (fun req -> <@ Browser.createCanvasNone              ()  @> ))
        DockerData(DckSingle      , "Single"      , (fun req -> <@ DckSingle.createDockEnvironment       req @> ))
        DockerData(DckGoldenLayout, "GoldenLayout", (fun req -> <@ DckGoldenLayout.createDockEnvironment req @> ))
        DockerData(DckWCDocker    , "WCDocker"    , (fun req -> <@ DckWCDocker.createDockEnvironment     req @> ))
        DockerData(DckPhosphor    , "Phosphor"    , (fun req -> <@ DckPhosphor.createDockEnvironment     req @> ))
        DockerData(DckDockSpawn   , "DockSpawn"   , (fun req -> <@ DckDockSpawn.createDockEnvironment    req @> ))
    ]

    let quotation quote =
        Div [ClientSide quote ] -< [Attr.Class "flex flexgrow"]
        |> Rop.succeed  

    let private getDockerDataR docker =
        allDockers
        |> Seq.tryFind (function DockerData(docker', title, quotation) -> docker'          = docker)
        |> Rop.fromOption (ErrDockerDefinitionNotFound docker)

    type Docker with
        member this.definitionR_ user (dc: DataCache) = dc.getR (KDocker this) (fun () -> getDockerDataR this)
        member this.nameR_       user  dc             = this.definitionR_ user dc |> Rop.mapR (function DockerData(_, name, _) -> name)
        member this.quotationR_  user  dc request     = this.definitionR_ user dc |> Rop.mapR (function DockerData(_, _, quotation) -> quotation request)
        member this.name_        user  dc             = this.nameR_       user dc |> Rop.ifError (sprintf "<invalid %A>" this)

    type User with
        member this.dockers dc = allDockers

module Templating =
    open WebSharper.Html.Server

    type Page =
        {
            Title      : string
            MenuBar    : list<Element>
            RightMenu  : list<Element>
            Body       : list<Element>
        }

    type RepPage =
        {
            Title      : string
            MenuBar    : list<Element>
            RightMenu  : list<Element>
            Body       : list<Element>
        }




    let MainTemplate =
        Content.Template<Page>("~/Main.html")
            .With("title"     , fun x -> x.Title    )
            .With("menubar"   , fun x -> x.MenuBar  )
            .With("rightmenu" , fun x -> x.RightMenu)
            .With("body"      , fun x -> x.Body     )


    let Main (menuMain, menuSecond) title body : Async<Content<EndPoint>> =
        Content.WithTemplate MainTemplate
            {
                Title     = title
                MenuBar   = menuMain
                RightMenu = menuSecond
                Body      = body
            }

    type LoginPage =
        {
            Title: string
            Form : Element
        }

    let LoginTemplate =
        Content.Template<LoginPage>("~/Login.html")
            .With("title", fun x -> x.Title)
            .With("form" , fun x -> x.Form )

module Site =
    open WebSharper.Html.Server
    open Dockers
    open LoginForm

    let LoginPage goLink =
        let content  = Div [ ClientSide <@ Browser.LoginBox goLink @> ]
        Templating.Main ([],[]) "Login" [ content ]

    let LoginPage2 goLink error =
        Content.WithTemplate Templating.LoginTemplate
            {
                Title = "Login"
                Form  = Form [ ClientSide <@ LoginForm.LoginReactForm goLink error @> ]
            }

    let HomePage        menus title userName = 
        let  content  = TestJM.RenderHomePage_ () //Div [ H1  [Text ("Hello " + userName )]        ]
        Templating.Main menus title [ content ]

    let ReportsPageR       menus title contentR = 
        contentR
        |> Rop.mapR (fun content ->
            Templating.Main menus title [
                content -< [Attr.Class "flex flexgrow"]
            ]
        )

    let SiteMapContent (siteMap: Lazy<Result<Element list * Element list>>) =
        let map  = siteMap.Value
        let menu1, menu2 = map |> Rop.ifError ([], [])
        Div [
            Attr.Class "container"
                
        ] -< [H1 [Text (sprintf "Site Map")]] -< menu1 -< menu2

    let getTitle endpoint user dc =
        match endpoint with
                 | EPLogout                -> "Logout"
                 | EPEntry                 -> "Home"
                 | EPHome                  -> "Home"
                 | EPContent(_, _)         -> "Content"
                 | EPFile(_)               -> ""
                 | EPJavaScript(_)         -> ""

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
                                                        | Some v -> "/EPContent/NM/Main Menu/" + v
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
                return getContentPage_, getLink_
            }
        let getContentPageO_, getLink0_ = 
            match funcsR with
            | Success ((getContentPageO_, getLink0_), _) -> getContentPageO_, getLink0_
            | _                                          -> (fun s -> None), (fun s-> "#" + s)
        member this.getLink_        (name:string) = getLink0_        name 
        member this.getContentPageR_(name:string) = getContentPageO_ name |> Rop.fromOption (ErrInvalidContentPageForClient name)
      
    let createMenus linkF (currentEP: EndPoint) (user: User) (client: Client) dc siteMap =

        let menuDropDown title href side entries =
            LI (if siteMap then [] else [ Attr.Class (if side then "dropdown-submenu" else "dropdown")]) -< [
                A (if siteMap then [] else [ Attr.Class "dropdown-toggle"] )
                    -< [if href <> "" then yield Attr.HRef href] -< [NewAttr "xdata-toggle" "dropdown"] -< [NewAttr "role" "button"] 
                    -< [VerbatimContent title ] -< if side || siteMap then [] else [Span [ Attr.Class "caret"]]
            ] -< [ UL (if siteMap then [] else [ Attr.Class "dropdown-menu" ]) -< entries ]

        let linkHtml href title active = 
            LI [ if active then yield Attr.Class "active" ] -< [
                A [if href <> "" then yield Attr.HRef href] -< [VerbatimContent title]
            ]

        let rec createMenu linkF currentEP user client dc (menuDef: Menu) =
            let getHref linkRef =
                match linkRef with
                | MEndPoint(endPoint, titleO) -> linkF endPoint
                | MLink(link, title)          -> link
                | OnClickR(title, onClick)    -> "#"

            let getLink linkRef =
                match linkRef with
                | MEndPoint(endPoint, titleO) ->
                    let title = titleO |> Option.defaultV (getTitle endPoint user dc)
                    let href  = linkF endPoint
                    linkHtml    href title (endPoint = currentEP)
                | MLink(link, title) ->
                    linkHtml    link title (link = linkF currentEP)
                | OnClickR(title, onClick)     ->
                    linkHtml    "#"  title false -< [ NewAttr "onclick" onClick ]
            menuDef.entries
            |> Seq.map(function
                | LinkME  link  -> link |> getLink
                | SubMenu(menu) ->
                    let link = menu.link |> getLink
                    createMenu linkF currentEP user client dc menu
                    |> menuDropDown menu.name (getHref menu.link) (menuDef.direction = Down && menu.direction = Down)
            )
            |> Seq.toList

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
            let! secondMenuElem  = findElemByNameR_ "Second Menu"
            let! currentMenuElem = 
                match currentEP with
                | EPEntry                     -> findElemByNameR_ "Main Menu"
                | EPHome                      -> findElemByNameR_ "Main Menu"
                | EPContent(NM(_), CPSiteMap) -> findElemByNameR_ "Main Menu"
                | EPContent(NM(navId), _)     -> findElemByNameR_ "Main Menu" //(System.Web.HttpUtility.UrlDecode navId)
                | EPLogout                    -> findElemByNameR_ "Main Menu"
                | EPFile(_)                   -> findElemByNameR_ "Main Menu"
                | EPJavaScript(_)             -> findElemByNameR_ "Main Menu"
            let  addMenuLink_ (elem: dimElement) cpLink = cpLink |> Option.map (fun link -> "/EPContent/NM/" + elem.element_name + "/" + link) |> Option.defaultV ""
            let  elemOrder_       (elem: dimElement) = match elem.element_order with
                                                       | Some(s) when s.Trim() <> "" -> s
                                                       | _                           -> elem.element_name
            let  elemDescription_ (elem: dimElement) = match elem.element_description with
                                                       | Some(s) when s.Trim() <> "" -> s
                                                       | _                           -> elem.element_name
            let  getDescByCode_  code = findElemByCodeR_ code |> Rop.mapR elemDescription_ |> Rop.ifError "..."
            let  getOrderByCode_ code = findElemByCodeR_ code |> Rop.mapR elemOrder_       |> Rop.ifError "..."
            let  hasChildren_ code = rels |> Seq.exists(fun rel -> rel.parent_code = code)
            let rec createSubEntries_ level code =
                rels
                |> Seq.filter(fun rel -> rel.parent_code = code)
                |> Seq.sortBy(fun rel -> match rel.child_order with
                                         | Some(s) when s.Trim() <> "" -> s
                                         | _                           -> getOrderByCode_ rel.child_code
                             )
                |> Seq.map   (fun rel ->
                                  if hasChildren_ rel.child_code then
                                     findElemByCodeR_ rel.child_code |> Rop.mapR (createMenuDef_ level >> SubMenu) |> Rop.ifError (mEndPoint EPHome)
                                  else
                                     MLink(findLinkByCodeO_ rel.child_code |> addMenuLink_ currentMenuElem, getDescByCode_ rel.child_code) |> LinkME
                             )
                |> Seq.toList
            and createMenuDef_ level elem =
                { name          = elemDescription_ elem
                  direction     = if level = 0 then Across else Down
                  entries       = elem.element_code |> createSubEntries_ (level + 1)
                  link          = (findLinkByCodeO_ elem.element_code |> addMenuLink_ currentMenuElem, "") |> MLink
                }
            let  Home  = elems |> Array.filter (fun elem -> elem.element_name <> "Main Menu")
//            let  topLevel =
//                elems
//                |> Array.filter (fun elem -> rels |> Seq.exists(fun rel -> rel.child_code = elem.element_code) |> not)
//                |> Array.filter (fun elem -> elem.element_name <> "Home")
            let menuMain        = currentMenuElem |> createMenuDef_ 0 
            let menuSecond      = secondMenuElem  |> createMenuDef_ 0 
            return (createMenu linkF currentEP user client dc menuMain, createMenu linkF currentEP user client dc menuSecond)
        }

    type DisplayData = {
        userName  : string
        clientName: string
        industry  : string
        param1    : string
        param2    : string
    }

    let rec includeFile (ctx: Context<EndPoint>) siteMap (nav: Navigation) (user: User) (client: Client) file p1 p2 dc : Result<Element> =
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
                                                                                |> Rop.bindR (contentPageR_ ctx siteMap nav user client dc)
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
                            .Run({ userName   = user.name_ dc
                                   clientName = client.name_ dc
                                   industry   = client.industryTypeRO_ dc |> Rop.ifError None |> Option.defaultV ""
                                   param1     = p1
                                   param2     = p2
                            })
            return parsed |> Seq.toList |> replace_navs |> Seq.head :?> Element
        }

    and contentPageR_ ctx siteMap navigation  (user: User) (client: Client) dc contentPage =
        let isGuestUser = user.isGuest_()
        match contentPage with
        | CPDocker(dock, request) -> (dock.quotationR_ user dc request |> Rop.bindR quotation)
        | CPReport(report)        -> quotation <@ Browser.showPanel contentPage                                           @>
        | CPTable (table)         -> quotation <@ Browser.showPanel contentPage                                           @>
        | CPUserForm              -> quotation <@ UserFormClient.showForm_   "User"                                       @>
        | CPUploadForm            -> let themeTag = user.themeTagsR_ dc |> Rop.ifError ""
                                     quotation <@ UploadForm.showForm_ "Upload Files" themeTag client                     @>
        | CPClientForm            -> quotation <@ ClientFormClient.showForm_  "Company"                                   @>
        | CPDimension(dimension)  -> let dimName = (dimension.name_ dc)
                                     quotation <@ DimensionForm.dimensionForm_ dimension dimName isGuestUser @>
        | CPCubeOlap(cube)        -> let cubeName = cube.name
                                     quotation <@ CubeOlapForm.cubeOlapForm_   cube       cubeName           isGuestUser  @>
        | CPInputForm(form)       -> quotation <@ ClientForm.inputForm form                                               @>
        | CPAbout                 -> quotation <@ AboutForm.showForm_ ()                                                  @>
        | CPFancyTreeTest         -> quotation <@ FancyTreeTestClient.createFancyTree_ ()                                 @>
        | CPTestJM                -> TestJM.RenderHomePage_ () |> Rop.succeed 
        | CPInclude(file, p1, p2) -> includeFile ctx siteMap navigation user client file p1 p2 dc
        | CPLogout                -> ctx.UserSession.Logout () |> Async.RunSynchronously; Rop.fail ErrUserIsNotLoggedIn
        | CPSiteMap               -> SiteMapContent siteMap    |> Rop.succeed
        | CPHomePage              -> "Main Menu" |> navigation.getContentPageR_ |> Rop.bindR (contentPageR_ ctx siteMap navigation user client dc)

    let getUserR ctx = 
        ctx.UserSession.GetLoggedInUser()
        |> Async.RunSynchronously
        |> Option.map (fun userCodeS -> User (new System.Guid(userCodeS)))
        |> Rop.fromOption ErrUserIsNotLoggedIn

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
        

    let site ctx (endpoint: EndPoint) =        
        let goHomeLink = ctx.Link EPHome
        Rop.flow {
            do!  Rop.tryProtection()
            let! user      = getUserR    ctx
            let  dc        = DataCache()
            let navigation = Navigation(ctx, user, dc)
            let  username  = user.name_ dc
            let! client    = user.currentClientR_ dc
            let  title     = getTitle             endpoint user        dc
            let! menuBars  = createMenus ctx.Link endpoint user client dc false
            let  siteMap   = lazy createMenus ctx.Link endpoint user client dc true
            let! result    =
                match endpoint with
                | EPContent(_, CPLogout)
                | EPLogout                -> ctx.UserSession.Logout () |> Async.RunSynchronously          ;  Rop.fail ErrUserIsNotLoggedIn
                | EPEntry                 
                | EPHome                  -> ReportsPageR menuBars title <| contentPageR_ ctx siteMap navigation user client dc CPHomePage
                | EPContent(_, content)   -> ReportsPageR menuBars title <| contentPageR_ ctx siteMap navigation user client dc content
//                | EPFileUpload            -> client.uploadFilesR_ ctx.Request.Files user dc |> Rop.mapR(fun text -> H3[Text text]) |> ReportsPageR menuBars title 
                | EPFile(filename)        -> produceFile    ctx user client dc filename
                | EPJavaScript(filename)  -> javaScriptFile ctx user client dc filename
            return result
        } |> function 
                | Success (v, _)                 -> v
                | Failure [ErrUserIsNotLoggedIn] -> LoginPage2 goHomeLink  None
                | Failure m                      -> LoginPage2 goHomeLink (Some (sprintf "%A" m))

    [<Website>]
    let Main = Application.MultiPage site



