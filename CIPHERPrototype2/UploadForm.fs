namespace CIPHERPrototype1
open Model
open Model2
open WebSharper
open WebSharper.Web
open WebSharper.JavaScript
open WebSharper.Html.Client
open Rop
open FSharp.Data
open FSharp.Data.SqlClient
open Repository
open FSharp.Data.Sql

type FileInfo = {
    id         : System.Guid
    name       : string
    folderName : string
    parentCode : System.Guid option
    contentType: string
    size       : int
    tags       : string
    modified   : string
}

type Folder = {
    id         : System.Guid
    name       : string
    parentCode : System.Guid option
}

module UploadFormServer =
    [<Rpc>]
    let GetFilesInfoAR_ token =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            Rop.flow {
                let! files      = client.getFilesInfoR_ ()
                let! folders    = client.getFoldersR_ ()
                let fileInfos   = files |> Seq.map(fun file ->
                                          { FileInfo.id          = file.object_code
                                            FileInfo.name        = file.object_name      |> Option.defaultV ""
                                            FileInfo.folderName  = file.folder
                                            FileInfo.parentCode  = file.folder_code
                                            FileInfo.contentType = file.content_type     |> Option.defaultV ""
                                            FileInfo.size        = file.file_size        |> Option.defaultV 0
                                            FileInfo.modified    = file.update_timestamp |> Option.defaultV (file.create_timestamp |> Option.defaultV (System.DateTime())) |> fun d -> d.ToString()
                                            FileInfo.tags        = file.theme_tags       |> Option.defaultV ""
                                           }) |> Seq.toArray
                let folderInfos = folders |> Seq.map(fun folder ->
                                        { Folder.id          = folder.folder_code
                                          Folder.name        = folder.folder_name  
                                          Folder.parentCode  = folder.parent_folder
                                         }) |> Seq.toArray
                return folderInfos, fileInfos
            }

    [<Rpc>]
    let DeleteFileAR_ token (fileId: string) (isFolder: bool) =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            if (isFolder)
            then client.deleteFolderR_ (System.Guid fileId)
            else client.deleteFileR_   (System.Guid fileId)
                
    [<Rpc>]
    let MoveToAR_ token (fileId: string) (isFolder: bool) (folderId: string option) =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            let folderId = folderId |> Option.map System.Guid
            if (isFolder)
            then client.moveFolderToR_ (System.Guid fileId) folderId
            else client.moveFileToR_   (System.Guid fileId) folderId
                
    [<Rpc>]
    let RenameFileAR_ token (fileId: string) newName newTags =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            client.renameFileR_   (System.Guid fileId) newName newTags
                
    [<Rpc>]
    let RenameFolderAR_ token (folderId: string) newName =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            client.renameFolderR_ (System.Guid folderId) newName

    [<Rpc>]
    let CreateFolderAR_ token                    newName (parentId: string option) =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            let parentId = parentId |> Option.map System.Guid
            client.createFolderR_ newName parentId

    [<Rpc>]
    let UploadFileAR_ token filename (folderId: string option) (blob: string) fileType fileSize tags (upClient : Client) =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            let folderId = folderId |> Option.map System.Guid
            let blob2 = System.Convert.FromBase64String (blob.Substring(blob.IndexOf(',') + 1))
            upClient.uploadFileR_ filename folderId blob2 user fileType fileSize tags 

                
(*[< JavaScript >]
module UploadForm =
    open UserFormClient
    open FancyTree

    type private SortBy =
    | SortByFileName
    | SortByDate
    | SortByTheme
    | SortByContentType
    | SortBySize

    type private Dialog = 
        | UploadFile   
        | CreateFolder 
        | Move           of Node
        | RenameFile     of Node
        | RenameFolder   of Node
        | ConfirmDelete  of Node
        | NoDialog

    type private ThisFormState = {
        sortBy       : SortBy list
        folders      : Folder[]
        files        : FileInfo[]
        uploadName   : string
        uploadFolder : string option
        themeTags    : string
        popupMenu    : bool
        showDialog   : Dialog
        dlgTitle     : string
        dlgText      : string
        top          : float
        left         : float
    }

    type private SuperState = {
        formState          : FormState<ThisFormState>
        treeViewProcessorO : (FancyTreeInMessage           -> unit) option
        relationsCallback  : (Result<Node> -> unit) option
    }

    type private Message =
        | ShowInfo        of string * bool
        | GetState        of (FormState<ThisFormState> -> unit)
        | AddValidation   of string * Validations
        | SetFiles        of (Folder []) * (FileInfo[])
        | SetThemeTags    of string
        | SetUploadName   of string
        | SetUploadFolder of string
        | ShowDialog      of Dialog
        | ShowPopup       of float * float
        | FromTreeView    of FancyTreeOutMessage
        | ToTreeView      of FancyTreeInMessage
        | ToggleDebug
        | WhenReceiveSelected   of (Result<Node> -> unit)

    let labelValsM vs (addValidations: string -> Validations -> unit) (validator: string -> Validations) name (onChange: string -> unit) =
        let onChange  v =
            onChange  v
            validator v |> addValidations name 
        (name, getValidationsFor name vs, onChange)

    let rButtons (buttons: seq<string * string * (unit->unit)>) =
        buttons 
        |> Seq.map (fun (text, className, func_) -> R.button text [R.className className] func_)
        |> Seq.toList

    let renderForm_ (state: FormState<_>) (toggleDebug_: unit->unit) buttons (content: obj list) =
        let buttons2 = ((".", "btn-xs btn-default  pull-right", toggleDebug_) :: buttons) |> rButtons 
        R.div                                [R.className "panel panel-info flex flexgrow"]
            [ R.div                          [R.className "panel-heading heading"         ]
                [ R.label                    [R.className "panel-title text-center"       ] [state.title]
                  ClientForm.validationMsg   state.message
                  R.div                      [R.className "btn-toolbar pull-right"        ] buttons2
                ]
              R.div                          [R.className "panel-body"                    ] content
            ]

    let getFileName_ _ =
        let files   = JS.Document.GetElementById("filesel")?files |> unbox<obj[]>
        if files.Length = 0 then
            ""
        else
            let  file    = files.[0] |> unbox<JavaScript.File>
            file.Name

    let private createForm_ (initial: FormState<ThisFormState>) (container: Element) token = 
        let mutable globalSetState =  None
        let inline setGlobalSetState f =  match globalSetState with
                                          | None   -> globalSetState <- Some f
                                          | Some _ -> ()

        let rec updateState superState message =
            let state = superState.formState
            if state.debug then printfn "%A" message
            let setState s = 
                globalSetState |> Option.map (fun f -> f (fun state -> s)) |> ignore
                { superState with formState = s }
            match message with
            | GetState     f                   -> f state; superState
            | Message.ShowInfo(msg, p)         -> setState {state with message = msg; processing = p}
            | AddValidation (name, vs)         -> setState {state with FormState.validations = (addValidationsFor name  state.validations vs) }
            | SetFiles      (folders, files)   -> setState {state with detail = {state.detail with uploadName   = ""
                                                                                                   folders      = folders
                                                                                                   files        = files                      }}
            | SetUploadName        name        -> setState {state with detail = {state.detail with uploadName   = name                       }}
            | SetUploadFolder      folderId    -> setState {state with detail = {state.detail with uploadFolder = if folderId = "" then None else Some folderId}}
            | SetThemeTags         tags        -> setState {state with detail = {state.detail with themeTags    = tags                       }}
            | ShowDialog           show        -> setState {state with detail = {state.detail with showDialog   = show                       }}
            | ShowPopup          (top, left)   -> setState {state with detail = {state.detail with popupMenu    = (top, left) <> (-1.0, -1.0) 
                                                                                                   top          = top
                                                                                                   left         = left                       }}
            | ToTreeView           msg         -> superState.treeViewProcessorO |> Option.iter(fun f -> msg |> f); superState
            | FromTreeView         msg         -> match msg with                                                                                                                        
                                                  | FancyTreeOutMessage.Relations        rels   -> superState //.relationsCallback |> Option.iter (fun f -> f (Rop.succeed rels          )) ; {superState with relationsCallback = None }
                                                  | FancyTreeOutMessage.ShowInfo         (a,b)  -> Message.ShowInfo(a,b) |> updateState superState
                                                  | FancyTreeOutMessage.MessageProcessor  f     -> {superState with treeViewProcessorO = Some f}
                                                  | FancyTreeOutMessage.NodeSelected node       -> superState.relationsCallback |> Option.iter (fun f -> f (Rop.succeed node)); {superState with relationsCallback = None }
            | ToggleDebug                      -> setState {state with debug = not state.debug}  
            | WhenReceiveSelected   callback   -> {superState with relationsCallback = Some callback }

        let globalSetState = "not allowed to use globalSetState from here onwards"

        let superInitial = {
            formState            = initial
            treeViewProcessorO   = None
            relationsCallback    = None
        }
        let processMessages = 
            let processor = processorAgent superInitial updateState
            fun message -> processor.Post message

        let showProcessing txt = (txt, true )   |> Message.ShowInfo      |> processMessages
        let showCompleted  txt = (txt, false)   |> Message.ShowInfo      |> processMessages

        let addValidations   name vs = (name, vs) |> Message.AddValidation |> processMessages
        let clearValidations name = addValidations name (Set[])

        let toggleDebug_  ()      = ToggleDebug                          |> processMessages
        let themeChange_  (v:obj) = unbox v     |> SetThemeTags          |> processMessages
        let uploadChange_ (v:obj) = unbox v     |> SetUploadName         |> processMessages

        let createNodes (detail: ThisFormState) =
            let childrenFolders parent = detail.folders |> Seq.filter (fun folder -> folder.parentCode = parent)
            let childrenFiles   parent = detail.files   |> Seq.filter (fun file   -> file.parentCode   = parent) 
                                         |> Seq.sortBy (fun file ->
                                                detail.sortBy
                                                |> List.map(fun by ->
                                                    match by with
                                                    | SortByFileName    -> file.name.ToLower()        :> System.IComparable
                                                    | SortByDate        -> file.modified              :> System.IComparable
                                                    | SortByTheme       -> file.tags.ToLower()        :> System.IComparable
                                                    | SortByContentType -> file.contentType.ToLower() :> System.IComparable
                                                    | SortBySize        -> file.size                  :> System.IComparable
                                                )
                                            )
            let rec folderNode (folder:Folder option) =
                let folderId   = folder |> Option.map (fun folder -> folder.id)
                let subFolders = childrenFolders folderId |> Seq.map (Some >> folderNode)
                let subFiles   = childrenFiles   folderId |> Seq.map (fun file   -> 
                                                                        {   FTNodeIn.key      = file.id.ToString()
                                                                            FTNodeIn.title    = file.name
                                                                            FTNodeIn.tag      = ""
                                                                            FTNodeIn.folder   = false
                                                                            FTNodeIn.children = [||]
                                                                            FTNodeIn.detail   = file
                                                                        }
                                                             )
                {   FTNodeIn.key      = folder |> Option.map (fun folder -> folder.id.ToString()) |> Option.defaultV "/"
                    FTNodeIn.title    = folder |> Option.map (fun folder -> folder.name         ) |> Option.defaultV "/"
                    FTNodeIn.detail   = folder |> Option.map (fun folder -> folder :> obj       ) |> Option.defaultV null
                    FTNodeIn.tag      = ""
                    FTNodeIn.folder   = true
                    FTNodeIn.children = Seq.append subFolders subFiles |> Seq.toArray
                }
            (folderNode None).children

        let updateTreeView_ () = 
            let update (state: FormState<ThisFormState>) = createNodes state.detail |> FancyTreeInMessage.LoadNodes |> ToTreeView |> processMessages
            update |> GetState |> processMessages

        let reloadFiles_ message =
            Server.call { 
                let! folders, files = UploadFormServer.GetFilesInfoAR_ token
                (folders, files) |> SetFiles |> processMessages
                updateTreeView_ ()
                showCompleted message
            }

        let callServerReloadFiles (call: Async<Result<string>>) =
            Server.call {
                let! result = call
                reloadFiles_ result
            }

        let deleteFile_    (node: Node)           () = UploadFormServer.DeleteFileAR_   token node.key (node.isFolder())       |> callServerReloadFiles 
        let renameFile_    fileId   newName tags  () = UploadFormServer.RenameFileAR_   token fileId   newName tags            |> callServerReloadFiles 
        let moveTo_        (node: Node)   newId   () = UploadFormServer.MoveToAR_       token node.key (node.isFolder()) newId |> callServerReloadFiles 
        let renameFolder_  folderId newName       () = UploadFormServer.RenameFolderAR_ token folderId newName                 |> callServerReloadFiles
        let createFolder_  name folderId          () = UploadFormServer.CreateFolderAR_ token name folderId                    |> callServerReloadFiles

        let uploadFile_ uploadName uploadFolder themeTags () =
            Server.call {
                do! Rop.tryProtection()
                let files   = JS.Document.GetElementById("filesel")?files |> unbox<obj[]>
                if files.Length = 0 then
                    showCompleted "Select a file to upload"
                else
                    let  file    = files.[0] |> unbox<JavaScript.File>
                    sprintf "Uploading file %s ..." file.Name |> showProcessing
                    let rdr = new JavaScript.TextFileReader()
                    rdr.Onloadend <- fun e -> UploadFormServer.UploadFileAR_ token uploadName uploadFolder rdr.Result file.Type file.Size themeTags |> callServerReloadFiles 
                    rdr.ReadAsDataURL(file)
            }

        let treeViewGetSelectedAR_ () =            
            Async.FromContinuations (fun (callback, ecnt, cancel) ->
               callback |> Message.WhenReceiveSelected        |> processMessages
               FancyTreeInMessage.SendSelected |> ToTreeView |> processMessages
            )

        let withSelectedNode f =
            Server.call {
                let! node = treeViewGetSelectedAR_()
                f node
            }

        let processTreeViewMessages (msg: FancyTreeOutMessage ) = msg |> FromTreeView |> processMessages 
        let treeViewClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                JQuery.JQuery(container).Html("""<table class="table table-hover"><thead>
                                                      <tr> <th>Name</th><th>Theme</th><th></th><th>Content</th> <th>Size</th> <th>Modified</th> </tr>
                                                 </thead><tbody></tbody></table>""") |> ignore
                let options = FancyTreeOptions(
                                  extensions    = [| "glyph" ; "clones" ; "table" ; "dnd" |]
                                , dnd           = DnDOptions(
                                                        focusOnClick = true
                                                      , dragStart    = FuncWithArgs(fun (node: Node, data: DnDData) -> true                                     )
                                                      , dragEnter    = FuncWithArgs(fun (node: Node, data: DnDData) -> node.isFolder()                                     )
                                                      , dragDrop     = FuncWithArgs(fun (node: Node, data: DnDData) ->
                                                                                      node.data?detail?id |> SetUploadFolder |> processMessages
                                                                                      data.otherNode |> Move   |> ShowDialog |> processMessages
                                                                                   )
                                                  )
                                , renderColumns = FuncWithArgs(fun (event, data) ->
                                                    let node = data?node |> unbox<Node>
                                                    let file = node.data?detail |> unbox<FileInfo>
                                                    let cols = JQuery.JQuery(node?tr |> unbox<Dom.Element>).Find(">td")
                                                    cols.Eq(2).Html("""<a href="#">:::</a>""").On("click", fun e x -> (e?offsetTop, e?offsetLeft) |> ShowPopup |> processMessages) |> ignore    
                                                    if node.isFolder() |> not then
                                                        cols.Eq(1).Text(file.tags)                |> ignore    
                                                        cols.Eq(3).Text(file.contentType)         |> ignore    
                                                        cols.Eq(4).Text(toLocaleString file.size) |> ignore    
                                                        cols.Eq(5).Text(file.modified)            |> ignore    
                                                  )
                              ) |> Some
                let nodes = createNodes initial.detail
                FancyTree.createFancyTree (container.FirstChild :?> Dom.Element) options nodes (Some processTreeViewMessages)
            )

        let renderMenu_ (close_: unit -> unit) (top: float) (left: float) (menuItems: seq<string * (unit -> unit)>) = 
            let rItems =
                menuItems 
                |> Seq.map (fun (text, func_) ->
                        R.tag "li" [if text = "-" then yield R.className "divider"]
                            [ R.tag "a" [Attrs(tabIndex  = "-1", href = "#", onClick = (fun _ -> close_(); func_()))] [text]]
                    )
                |> Seq.toList
            R.div                         [R.className "dropdown clearfix"; R.id   "contextMenu"]
                [ R.tag "ul"              [R.className "dropdown-menu"    
                                           R.role      "menu"
                                           R.style     (JSON.Parse(sprintf """{"display": "block", "position": "absolute", "marginBottom": "5px", "top": "%fpx", "left" : "%fpx" }""" top left))
                                          ]
                    rItems
                ]

        let renderModal_ (close_: unit -> unit) (title: string) buttons (content: obj list) =
            let buttons2 = buttons |> Seq.map(fun (a, b, f) -> a,b, fun _ -> close_(); f()) |> rButtons
            R.div                         [R.className "modal"
                                           R.id        "dialog"
                                           R.role      "dialog"
                                           R.style     (JSON.Parse """{"display": "block", "position": "absolute", "marginBottom": "5px" }""")
                                          ]
               [ R.div                    [R.className "modal-dialog" ]
                   [ R.div                [R.className "modal-content"]
                       [ R.div            [R.className "modal-header" ]
                           [ R.button "×" [R.className "close"        ] close_
                             R.tag   "h4" [R.className "modal-title"  ] [title  ]
                           ]
                         R.div            [R.className "modal-body"   ] content
                         R.div            [R.className "modal-footer" ] buttons2
                       ]
                   ]
               ]

        let renderMyDialog_ (detail: ThisFormState) (labelValsNothing: string-> (string -> Message) -> string * Set<Validation> * (string -> unit)) =
            let rec path_ (folder: Folder) = 
                match folder.parentCode with
                | None        -> ""
                | Some parent -> detail.folders |> Array.tryFind (fun folder -> folder.id = parent) |> Option.map path_ |> Option.defaultV ""
                |> fun p -> p + "/" + folder.name
            let folders_() = detail.folders |> Array.map(fun folder -> folder.id.ToString(), path_ folder) |> Array.append [|"", "/"|] |> Array.sortBy (fun (k, p) -> p)
            let closeDialog_ () = ShowDialog NoDialog |> processMessages
            match detail.showDialog with
            | UploadFile         -> renderModal_ closeDialog_ "Upload File"     ["Upload", "btn", uploadFile_ detail.uploadName detail.uploadFolder detail.themeTags
                                                                                 "Cancel", "btn", id]
                                    <| [ R.input "file" (getFileName_ >> SetUploadName >> processMessages) [R.id "filesel"]
                                         renderInput  (labelValsNothing "File Name"  SetUploadName  ) (Some detail.uploadName) "text"  "enter file name"  100 None
                                         renderSelect (labelValsNothing "Folder"     SetUploadFolder) detail.uploadFolder (folders_())
                                         renderInput  (labelValsNothing "Theme tags" SetThemeTags   ) (Some detail.themeTags)  "text"  "enter tags"       200 None
                                       ]
            | Move          node -> renderModal_ closeDialog_ "Move to"         ["Ok"    , "btn", moveTo_       node     detail.uploadFolder
                                                                                 "Cancel", "btn", id]
                                    <| [ renderSelect (labelValsNothing "Folder"  SetUploadFolder) detail.uploadFolder (folders_()) ]
            | RenameFile    node -> renderModal_ closeDialog_ "Rename File"     ["Ok"    , "btn", renameFile_   node.key detail.uploadName detail.themeTags
                                                                                 "Cancel", "btn", id] 
                                    <| [ renderInput (labelValsNothing "File Name"    SetUploadName) (Some detail.uploadName) "text"  "enter file name"  100 None
                                         renderInput (labelValsNothing "Theme tags"   SetThemeTags ) (Some detail.themeTags)  "text"  "enter tags"       200 None
                                       ]
            | RenameFolder  node -> renderModal_ closeDialog_ "Rename Folder"   ["Ok"    , "btn", renameFolder_ node.key detail.uploadName 
                                                                                 "Cancel", "btn", id] 
                                    <| [ renderInput (labelValsNothing "Folder Name"  SetUploadName) (Some detail.uploadName) "text"  "enter file name"  100 None ]
            | CreateFolder       -> renderModal_ closeDialog_ "Create Folder"   ["Ok"    , "btn", createFolder_ detail.uploadName detail.uploadFolder
                                                                                 "Cancel", "btn", id] 
                                    <| [ renderSelect (labelValsNothing "Parent Folder" SetUploadFolder) detail.uploadFolder (folders_())
                                         renderInput  (labelValsNothing "Folder Name"   SetUploadName  ) (Some detail.uploadName) "text"  "enter folder name"  100 None
                                       ]
            | ConfirmDelete node -> renderModal_ closeDialog_ "Confirm Delete " ["DELETE", "btn", deleteFile_ node
                                                                                 "Cancel", "btn", id] 
                                    <| [ sprintf "Delete %s %s?" (if node.isFolder() then "folder" else "file")  node.title ]
            | NoDialog           -> "" :> obj
    
        let getTargetFolder (node: Node) =
            if node.isFolder() 
            then Some node.data?detail?id
            else node.data?detail?parentCode 
            |> Option.defaultV "" |> SetUploadFolder |> processMessages

        let getParentFolder (node: Node) = node.data?detail?parentCode |> Option.defaultV "" |> SetUploadFolder |> processMessages

        let treeViewGetSelectedAR_ () =            
            Async.FromContinuations (fun (callback, ecnt, cancel) ->
               callback |> Message.WhenReceiveSelected       |> processMessages
               FancyTreeInMessage.SendSelected |> ToTreeView |> processMessages
            )

        let withSelectedNode f =
            Server.call {
                let! node = treeViewGetSelectedAR_()
                f node
            }

        let renderMyMenu_ (detail: ThisFormState) =
            if detail.popupMenu 
            then renderMenu_ (fun _ -> ShowPopup(-1.0, -1.0) |> processMessages) detail.top detail.left 
                  [ "Upload file"  , fun () -> withSelectedNode 
                                               <| fun node -> getTargetFolder node
                                                              UploadFile             |> ShowDialog    |> processMessages
                    "New folder"   , fun () -> withSelectedNode                      
                                               <| fun node -> getTargetFolder node   
                                                              CreateFolder           |> ShowDialog    |> processMessages
                    "Move"         , fun () -> withSelectedNode                      
                                               <| fun node -> getParentFolder node   
                                                              node |> Move           |> ShowDialog    |> processMessages
                    "Rename"       , fun () -> withSelectedNode 
                                               <| fun node -> 
                                                      let renameObject = 
                                                          if node.isFolder() 
                                                          then RenameFolder 
                                                          else node.data?detail?tags |> SetThemeTags  |> processMessages
                                                               RenameFile
                                                      node.title                     |> SetUploadName |> processMessages
                                                      node |> renameObject           |> ShowDialog    |> processMessages
                    "-"            , fun () -> () 
                    "Delete"       , fun () -> withSelectedNode
                                               <| fun node -> node |> ConfirmDelete  |> ShowDialog    |> processMessages
                  ]
            else "" :> obj

        let renderForm (state: FormState<ThisFormState>) (setState: (FormState<ThisFormState> -> FormState<ThisFormState>) -> unit) =
            setGlobalSetState setState
            let setState = "not allowed to use setState from here onwards"

            let labelValsF validator name onChange = labelValsM state.validations addValidations validator name (fun v -> v |> onChange |> processMessages)
            let labelValsNoEmpty = labelValsF validateEmpty_
            let labelValsNothing = labelValsF validateNothing_
            let labelValsEmail   = labelValsF (validateEmail_ ++ validateEmpty_)

            renderForm_ state toggleDebug_
                        [ "New Folder"  , "btn    btn-default  pull-right", (fun _ -> CreateFolder |> ShowDialog |> processMessages)
                          "Upload File" , "btn    btn-default  pull-right", (fun _ -> UploadFile   |> ShowDialog |> processMessages) 
                        ]
                [ renderMyDialog_ state.detail labelValsNothing
                  renderMyMenu_ state.detail
                  R.E (treeViewClass) 
                ]
            

        ClientForm.reactRoot initial container.Dom renderForm



    let showForm_  title themeTags =
        Browser.withContainerDo "flex flexgrow" (fun container ->
            Server.call { 
                let! token = Server.fetchTokenAR_()
                let! folders, files = UploadFormServer.GetFilesInfoAR_ token
                let initial     = { 
                            title       = title
                            processing  = false
                            message     = ""
                            debug       = false
                            validations = Set []
                            detail      = { folders      = folders
                                            files        = files
                                            sortBy       = [ SortByFileName
                                                             SortByTheme
                                                             SortByDate
                                                             SortByContentType
                                                             SortBySize
                                                           ]
                                            uploadName   = ""
                                            uploadFolder = None
                                            themeTags    = themeTags
                                            popupMenu    = false
                                            showDialog   = NoDialog
                                            dlgTitle     = "HELLO" 
                                            dlgText      = "HOW Are you?"
                                            top          = 0.0
                                            left         = 0.0
                                            }
                        }
                createForm_ initial container token
            }
        )
*)

[< JavaScript >]
module UploadForm =
    open FancyTree

    type SortBy =
        | SortByFileName
        | SortByDate
        | SortByTheme
        | SortByContentType
        | SortBySize

    type Dialog = 
        | UploadFile   
        | CreateFolder 
        | Move           of FancyTree.Node
        | RenameFile     of FancyTree.Node
        | RenameFolder   of FancyTree.Node
        | ConfirmDelete  of FancyTree.Node
        | NoDialog

    type Upload = Upload of name:string * folder:string option * tags:string * client: Client

    type Model = {
        form               : GenForm.Model
        dialog             : Dialog.Model
        popup              : Popup.Model
        treeViewProcessorO : (FancyTreeInMessage -> unit) option
        relationsCallback  : (Result<Node>       -> unit) option
        folders            : Folder[]
        files              : FileInfo[]
        sortBy             : SortBy list
        uploadName         : string
        uploadFolder       : string option
        themeTags          : string
        showDialog         : Dialog
        client             : Client
        lastUpload         : Upload option
    }

    let init title folders files themeTags client = {
        form               = GenForm.init title
        dialog             = Dialog.init
        popup              = Popup.init
        treeViewProcessorO = None
        relationsCallback  = None
        sortBy             = [ SortByFileName
                               SortByTheme
                               SortByDate
                               SortByContentType
                               SortBySize
                             ]
        folders            = folders
        files              = files
        uploadName         = ""
        uploadFolder       = None
        themeTags          = themeTags
        showDialog         = NoDialog
        client             = client
        lastUpload         = None
    }

    type Message =
        | SetFiles            of (Folder []) * (FileInfo[])
        | SetThemeTags        of string
        | SetUploadName       of string
        | SetUploadFolder     of string
        | SetLastUpload       of Upload
        | ShowDialog          of Dialog
        | ToFormMsg           of GenForm.Message
        | ToDialogMsg         of Dialog.Message
        | ToPopupMsg          of Popup.Message
        | ToTreeView          of FancyTreeInMessage
        | FromTreeView        of FancyTreeOutMessage
        | WhenReceiveSelected of (Result<Node> -> unit)
        | DoAction            of (Model -> Model)

    let rec update message model =
        if model.form.debug then printfn "%A" message
        match message with
        | DoAction             f           -> f model
        | ToFormMsg            msg         -> {             model with form         = GenForm.update msg model.form  }
        | ToPopupMsg           msg         -> {             model with popup        = Popup.update   msg model.popup }
        | ToDialogMsg          msg         -> let model' = {model with dialog       = Dialog.update  msg model.dialog}
                                              match msg with
                                              | Dialog.ShowDialog false -> model' |> update (ShowDialog NoDialog)
                                              | _                       -> model'
        | SetFiles      (folders, files)   -> {model with uploadName   = ""
                                                          folders      = folders
                                                          files        = files                      }
        | SetUploadName        name        -> {model with uploadName   = name                       }
        | SetUploadFolder      folderId    -> {model with uploadFolder = if folderId = "" then None else Some folderId}
        | SetLastUpload        upload      -> {model with lastUpload   = Some upload                }
        | SetThemeTags         tags        -> {model with themeTags    = tags                       }
        | ShowDialog           show        -> if model.showDialog <> show
                                              then {model with showDialog   = show                       }
                                                   |> update (show <> NoDialog |> Dialog.ShowDialog |> ToDialogMsg)
                                              else model
        | ToTreeView           msg         -> model.treeViewProcessorO |> Option.iter(fun f -> msg |> f); model
        | FromTreeView         msg         -> match msg with                                                                                                                        
                                                | FancyTreeOutMessage.Relations        rels   -> model //.relationsCallback |> Option.iter (fun f -> f (Rop.succeed rels          )) ; {superState with relationsCallback = None }
                                                | FancyTreeOutMessage.ShowInfo         (a,b)  -> GenForm.ShowInfo(a,b) |> ToFormMsg |> update <| model
                                                | FancyTreeOutMessage.MessageProcessor  f     -> {model with treeViewProcessorO = Some f}
                                                | FancyTreeOutMessage.NodeSelected node       -> model.relationsCallback |> Option.iter (fun f -> f (Rop.succeed node))
                                                                                                 {model with relationsCallback = None }
        | WhenReceiveSelected   callback   -> {model with relationsCallback = Some callback }


    let getUploadFileRO_ () =
        Rop.flow {
            do! Rop.tryProtection()
            let files: File[] = JS.Document.GetElementById("filesel")?files
            return Array.tryHead files
        }

    let getFileName_ () = 
        Rop.flow {
            let! fileO = getUploadFileRO_()
            return fileO |> Option.map (fun f -> f.Name) |> Option.defaultV ""
        } |> Rop.ifError ""

    let createNodes (model: Model) =
        let childrenFolders parent = model.folders |> Seq.filter (fun folder -> folder.parentCode = parent)
        let childrenFiles   parent = model.files   |> Seq.filter (fun file   -> file.parentCode   = parent) 
                                     |> Seq.sortBy (fun file ->
                                            model.sortBy
                                            |> List.map(fun by ->
                                                match by with
                                                | SortByFileName    -> file.name.ToLower()        :> System.IComparable
                                                | SortByDate        -> file.modified              :> System.IComparable
                                                | SortByTheme       -> file.tags.ToLower()        :> System.IComparable
                                                | SortByContentType -> file.contentType.ToLower() :> System.IComparable
                                                | SortBySize        -> file.size                  :> System.IComparable
                                            )
                                        )
        let rec folderNode (folder:Folder option) =
            let folderId   = folder |> Option.map (fun folder -> folder.id)
            let subFolders = childrenFolders folderId |> Seq.map (Some >> folderNode)
            let subFiles   = childrenFiles   folderId |> Seq.map (fun file   -> 
                                                                    {   FTNodeIn.key      = file.id.ToString()
                                                                        FTNodeIn.title    = file.name
                                                                        FTNodeIn.tag      = ""
                                                                        FTNodeIn.folder   = false
                                                                        FTNodeIn.children = [||]
                                                                        FTNodeIn.detail   = file
                                                                    }
                                                         )
            {   FTNodeIn.key      = folder |> Option.map (fun folder -> folder.id.ToString()) |> Option.defaultV "/"
                FTNodeIn.title    = folder |> Option.map (fun folder -> folder.name         ) |> Option.defaultV "/"
                FTNodeIn.detail   = folder |> Option.map (fun folder -> folder :> obj       ) |> Option.defaultV null
                FTNodeIn.tag      = ""
                FTNodeIn.folder   = true
                FTNodeIn.children = Seq.append subFolders subFiles |> Seq.toArray
            }
        (folderNode None).children

    open ReactHtml
    
    let runApp_ (token: Auth.Token) container initModel =
        let mutable globalProcessor: (Message -> unit) option = None
        let setGlobalProcessor_ processMsg = match globalProcessor with | None -> globalProcessor <- processMsg | _    -> ()
        let processMessages msg = globalProcessor |> Option.map (fun f -> f msg) |> ignore

        let showProcessing txt = (txt, true ) |> GenForm.Message.ShowInfo |> ToFormMsg |> processMessages
        let showCompleted  txt = (txt, false) |> GenForm.Message.ShowInfo |> ToFormMsg |> processMessages

        let updateTreeView_ () = 
            let update (model: Model) = createNodes model |> FancyTreeInMessage.LoadNodes |> ToTreeView |> update <| model
            DoAction update |> processMessages

        let reloadFiles_ message =
            Server.call { 
                let! folders, files = UploadFormServer.GetFilesInfoAR_ token
                (folders, files) |> SetFiles |> processMessages
                updateTreeView_ ()
                showCompleted message
            }

        let callServerReloadFiles (call: Async<Result<string>>) =
            Server.call {
                let! result = call
                reloadFiles_ result
            }

        let deleteFile_    (node: Node)           () = UploadFormServer.DeleteFileAR_   token node.key (node.isFolder())       |> callServerReloadFiles 
        let renameFile_    fileId   newName tags  () = UploadFormServer.RenameFileAR_   token fileId   newName tags            |> callServerReloadFiles 
        let moveTo_        (node: Node)   newId   () = UploadFormServer.MoveToAR_       token node.key (node.isFolder()) newId |> callServerReloadFiles 
        let renameFolder_  folderId newName       () = UploadFormServer.RenameFolderAR_ token folderId newName                 |> callServerReloadFiles
        let createFolder_  name folderId          () = UploadFormServer.CreateFolderAR_ token name folderId                    |> callServerReloadFiles

        let doUpload_ (file: JavaScript.File) = function
            Upload(uploadName, uploadFolder, themeTags, client) ->
                Server.call {
                    do! Rop.tryProtection()
                    sprintf "Uploading file %s ..." file.Name |> showProcessing
                    let rdr = new JavaScript.TextFileReader()
                    rdr.Onloadend <- fun e -> UploadFormServer.UploadFileAR_ token uploadName uploadFolder rdr.Result file.Type file.Size themeTags client |> callServerReloadFiles 
                    rdr.ReadAsDataURL(file)
                }

        let uploadFile_ (upload: Upload) () =
            Server.call {
                let! fileO = getUploadFileRO_()
                fileO |> Option.iter(fun file ->
                   upload |> SetLastUpload |> processMessages
                   upload |> doUpload_ file
                )
            }

        let contentMyDialog_ (model: Model) processMessages =
            let rec path_ (folder: Folder) = 
                match folder.parentCode with
                | None        -> ""
                | Some parent -> model.folders |> Array.tryFind (fun folder -> folder.id = parent) |> Option.map path_ |> Option.defaultV ""
                |> fun p -> p + "/" + folder.name
            let folders_() = model.folders |> Array.map(fun folder -> folder.id.ToString(), path_ folder) |> Array.append [|"", "/"|] |> Array.sortBy (fun (k, p) -> p)
            match model.showDialog with
            | UploadFile         -> "Upload File"
                                    , ["Upload", "btn", Upload(model.uploadName, model.uploadFolder, model.themeTags, model.client) |> uploadFile_ 
                                       "Cancel", "btn", id]
                                    , [ Fields.textNotEmpty      "File Name"     model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter file name" ; MaxLength 100 ] model.form.validations (ToFormMsg >> processMessages)
                                        Fields.selectWoValidator "Folder"        model.uploadFolder     (SetUploadFolder >> processMessages) (folders_()) []                                 
                                        Fields.textWoValidator   "Theme tags"    model.themeTags        (SetThemeTags    >> processMessages) [ Placeholder "enter tags"      ; MaxLength 200 ]
                                      ]
            | Move          node -> "Move to"
                                    , ["Ok"    , "btn", moveTo_       node       model.uploadFolder
                                       "Cancel", "btn", id]
                                    , [ Fields.selectWoValidator "Folder"        model.uploadFolder     (SetUploadFolder >> processMessages) (folders_()) [] ]
            | RenameFile    node -> "Rename File"
                                    , ["Ok"    , "btn", renameFile_   node.key   model.uploadName model.themeTags
                                       "Cancel", "btn", id] 
                                    , [ Fields.textNotEmpty      "File Name"     model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter file name"  ; MaxLength 100 ] model.form.validations (ToFormMsg >> processMessages)
                                        Fields.textWoValidator   "Theme tags"    model.themeTags        (SetThemeTags    >> processMessages) [ Placeholder "enter tags"       ; MaxLength 200 ]
                                     ]                                                                                                                                    
            | RenameFolder  node -> "Rename Folder"                                                                                                                       
                                    , ["Ok"    , "btn", renameFolder_ node.key   model.uploadName                                                                         
                                       "Cancel", "btn", id]                                                                                                               
                                    , [ Fields.textNotEmpty      "File Name"     model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter file name"  ; MaxLength 100 ] model.form.validations (ToFormMsg >> processMessages) ]
            | CreateFolder       -> "Create Folder"
                                    , ["Ok"    , "btn", createFolder_            model.uploadName model.uploadFolder
                                       "Cancel", "btn", id] 
                                    , [ Fields.selectWoValidator "Parent Folder" model.uploadFolder     (SetUploadFolder >> processMessages) (folders_()) []
                                        Fields.textNotEmpty      "Folder Name"   model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter folder name"; MaxLength 100 ] model.form.validations (ToFormMsg >> processMessages)
                                      ]
            | ConfirmDelete node -> "Confirm Delete "
                                    , ["DELETE", "btn", deleteFile_ node
                                       "Cancel", "btn", id] 
                                    , [ NText <| sprintf "Delete %s %s?" (if node.isFolder() then "folder" else "file")  node.title ]
            | NoDialog           -> "", [], []

        let setTargetFolder (node: Node) =
            if node.isFolder() 
            then Some node.data?detail?id
            else node.data?detail?parentCode 
            |> Option.defaultV "" |> SetUploadFolder |> processMessages

        let setParentFolder (node: Node) = node.data?detail?parentCode |> Option.defaultV "" |> SetUploadFolder |> processMessages

        let treeViewGetSelectedAR_ () =            
            Async.FromContinuations (fun (callback, ecnt, cancel) ->
               callback |> Message.WhenReceiveSelected        |> processMessages
               FancyTreeInMessage.SendSelected |> ToTreeView |> processMessages
            )

        let withSelectedNode f =
            Server.call {
                let! node = treeViewGetSelectedAR_()
                f node
            }

        let menuItems =
                  [ "Upload file"  , fun () -> withSelectedNode 
                                               <| fun node -> setTargetFolder node
                                                              getFileName_()         |> SetUploadName |> processMessages
                                                              UploadFile             |> ShowDialog    |> processMessages
                    "New folder"   , fun () -> withSelectedNode                      
                                               <| fun node -> setTargetFolder node   
                                                              CreateFolder           |> ShowDialog    |> processMessages
                    "Move"         , fun () -> withSelectedNode                      
                                               <| fun node -> setParentFolder node   
                                                              node |> Move           |> ShowDialog    |> processMessages
                    "Rename"       , fun () -> withSelectedNode 
                                               <| fun node -> 
                                                      let renameObject = 
                                                          if node.isFolder() 
                                                          then RenameFolder 
                                                          else node.data?detail?tags |> SetThemeTags  |> processMessages
                                                               RenameFile
                                                      node.title                     |> SetUploadName |> processMessages
                                                      node |> renameObject           |> ShowDialog    |> processMessages
                    "-"            , fun () -> () 
                    "Delete"       , fun () -> withSelectedNode
                                               <| fun node -> node |> ConfirmDelete  |> ShowDialog    |> processMessages
                  ]



        let processTreeViewMessages (msg: FancyTreeOutMessage ) = msg |> FromTreeView |> processMessages 
        let treeViewClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                JQuery.JQuery(container).Html("""<table class="table table-hover"><thead>
                           <tr> <th>Name</th><th>Theme</th><th></th><th>Content</th> <th>Size</th> <th>Modified</th> </tr>
                                                    </thead><tbody></tbody></table>""") |> ignore
                let options = FancyTreeOptions(
                                  extensions    = [| "glyph" ; "clones" ; "table" ; "dnd" |]
                                , dnd           = DnDOptions(
                                                          focusOnClick = true
                                                        , dragStart    = FuncWithArgs(fun (node: Node, data: DnDData) -> true                                     )
                                                        , dragEnter    = FuncWithArgs(fun (node: Node, data: DnDData) -> node.isFolder()                                     )
                                                        , dragDrop     = FuncWithArgs(fun (node: Node, data: DnDData) ->
                                                                                            node.data?detail?id |> SetUploadFolder |> processMessages
                                                                                            data.otherNode |> Move   |> ShowDialog |> processMessages
                                                                                    )
                                                    )
                                , renderColumns = FuncWithArgs(fun (event, data) ->
                                                    let node = data?node |> unbox<Node>
                                                    let file = node.data?detail |> unbox<FileInfo>
                                                    let cols = JQuery.JQuery(node?tr |> unbox<Dom.Element>).Find(">td")
                                                    cols.Eq(2).Html("""<a href="#"><span class="fancytree-title">:::</span></a>""").On("click", fun e x -> (e.GetBoundingClientRect().Top, e.GetBoundingClientRect().Left) |> Popup.ShowPopUp |> ToPopupMsg |> processMessages) |> ignore    
                                                    if node.isFolder() |> not then
                                                        cols.Eq(1).Text(file.tags)                |> ignore    
                                                        cols.Eq(3).Text(file.contentType)         |> ignore    
                                                        cols.Eq(4).Text(toLocaleString file.size) |> ignore    
                                                        cols.Eq(5).Text(file.modified)            |> ignore    
                                                    )
                                ) |> Some
                let nodes = createNodes initModel
                FancyTree.createFancyTree (container.FirstChild :?> Dom.Element) options nodes (Some processTreeViewMessages)
            )

        let view (model: Model) processMessages =
            setGlobalProcessor_ (Some processMessages)
            let dlgTitle, dlgButtons, dlgContent = contentMyDialog_ model processMessages
            let reUpload = match model.lastUpload with
                           | Some upload when getFileName_() <> "" -> Input  [Type "button" ; Value <| sprintf "Re%A" upload 
                                                                              _Style [ _flex "0 0" ; newAttr "alignSelf" "flex-start"]] 
                                                                      |> OnClick (upload |> uploadFile_)
                           | _                                     -> NEmpty 
            GenForm.view 
                            [ "New Folder"  , "btn    btn-default  pull-right", (fun _ -> CreateFolder   |> ShowDialog    |> processMessages)
                              "Upload File" , "btn    btn-default  pull-right", (fun _ -> getFileName_() |> SetUploadName |> processMessages
                                                                                          UploadFile     |> ShowDialog    |> processMessages) 
                            ]
                    [ Dialog.view dlgTitle dlgButtons dlgContent <| model.dialog <| (fun msg -> msg |> ToDialogMsg |> processMessages)
                      Popup.view menuItems <| model.popup                        <| (fun msg -> msg |> ToPopupMsg  |> processMessages)
                      Input [ Type "file" ; Id "filesel"] |> OnChange (getFileName_ >> SetUploadName   >> processMessages)
                      reUpload
                      ReactObj treeViewClass
                    ]
            <| model.form                                                        <| (fun msg -> msg |> ToFormMsg |> processMessages)
        
        App.app
            <| initModel
            <| update
            <| view 
        |> App.run container


    let showForm_  title themeTags client =
        Browser.withContainerDo "flex flexgrow" (fun container ->
            Server.call { 
                let! token = Server.fetchTokenAR_()
                let! folders, files = UploadFormServer.GetFilesInfoAR_ token
                init title folders files themeTags client
                |> runApp_ token container.Dom
            }
        )