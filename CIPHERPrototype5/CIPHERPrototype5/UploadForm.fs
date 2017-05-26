namespace CIPHERSpace
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
                                            FileInfo.name        = file.object_name      |> Option.defaultValue ""
                                            FileInfo.folderName  = file.folder
                                            FileInfo.parentCode  = file.folder_code
                                            FileInfo.contentType = file.content_type     |> Option.defaultValue ""
                                            FileInfo.size        = file.file_size        |> Option.defaultValue 0
                                            FileInfo.modified    = file.update_timestamp |> Option.defaultValue (file.create_timestamp |> Option.defaultValue (System.DateTime())) |> fun d -> d.ToString()
                                            FileInfo.tags        = file.theme_tags       |> Option.defaultValue ""
                                           }) |> Seq.toArray
                let folderInfos = folders |> Seq.map(fun folder ->
                                        { Folder.id          = folder.folder_code
                                          Folder.name        = folder.folder_name  
                                          Folder.parentCode  = folder.parent_folder
                                         }) |> Seq.toArray
                return folderInfos, fileInfos
            }

    [<Rpc>]
    let DeleteFileAR_ token fileId isFolder =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            if (isFolder)
            then client.deleteFolderR_ fileId
            else client.deleteFileR_   fileId
                
    [<Rpc>]
    let MoveToAR_ token fileId isFolder folderId =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            if (isFolder)
            then client.moveFolderToR_ fileId folderId
            else client.moveFileToR_   fileId folderId
                
    [<Rpc>]
    let RenameFileAR_ token fileId newName newTags =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            client.renameFileR_   fileId newName newTags
                
    [<Rpc>]
    let RenameFolderAR_ token folderId newName =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            client.renameFolderR_ folderId newName

    [<Rpc>]
    let CreateFolderAR_ token                    newName parentId=
        Server.RpcWithTokenValidation token <| fun user client dc ->
            client.createFolderR_ newName parentId

    [<Rpc>]
    let UploadFileAR_ token filename folderId (blob: string) fileType fileSize tags (upClient : Client) =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            let blob2 = System.Convert.FromBase64String (blob.Substring(blob.IndexOf(',') + 1))
            upClient.uploadFileR_ filename folderId blob2 user fileType fileSize tags 

open ReactHtml

[<JavaScript>]
type Entry =
| EFolder of Folder * Entry seq
| EFile   of FileInfo
with member this.id       = match this with
                            | EFolder(fd, _       ) -> fd.id
                            | EFile   fl            -> fl.id
     member this.children = match this with
                            | EFolder(fd, children) -> children
                            | EFile   fl            -> seq []
     member this.name     = match this with
                            | EFolder(fd, children) -> fd.name
                            | EFile   fl            -> fl.name
     member this.theme    = match this with
                            | EFolder(fd, children) -> ""
                            | EFile   fl            -> fl.tags
     member this.content  = match this with
                            | EFolder(fd, children) -> ""
                            | EFile   fl            -> fl.contentType
     member this.size     = match this with
                            | EFolder(fd, children) -> ""
                            | EFile   fl            -> (toLocaleString fl.size)
     member this.modified = match this with
                            | EFolder(fd, children) -> ""
                            | EFile   fl            -> fl.modified
     member this.isFolder = match this with
                            | EFolder(fd, children) -> true
                            | EFile   fl            -> false
     member this.parentId = match this with
                            | EFolder(fd, children) -> fd.parentCode
                            | EFile   fl            -> fl.parentCode
    
[<JavaScript>]
module FileTreeNode =

    type Props     = { 
                       entry       : Entry
                       expanded    : bool
                       selected    : bool
                       level       : int
                       setExpanded : (System.Guid * bool) -> unit
                       setSelected : System.Guid option   -> unit
                       onClick     : obj                  -> unit
                     }
    type Model     = { 
                       hover     : bool
                     }
                   
    let init       = {
                       hover      = false
                     }

    type Message =
        | SetHover           of bool

    let update (props: Props) (msg: Message)  model =
        match msg with
        | SetHover           hov -> { model with hover    = hov     }

    let addMoreFields tag fields =
        fields
        |> List.map (fun v ->
              tag [ _Style [ _paddingLeft "0.5ch" ; _paddingRight "0.5ch" ; _overflow "hidden" ; _textOverflow "ellipsis"] 
                    v
                  ] 
           )
        |> addChildren 

    let view (props:Props) (model: Model) (processMessages: Message -> unit) =
        let hasChildren = props.entry.children |> Seq.isEmpty |> not
        let symbol      = match (hasChildren, props.expanded) with
                            | false, _     -> "\uE235 "
                            | true , true  -> "\uE114 " 
                            | true , false -> "\uE080 "
        Tr [ Td [  _Style [ _overflow "hidden" ; _textOverflow "ellipsis" ]
                   Div [ NText symbol ; _Style [ _display    "inline"
                                                 _fontFamily "Glyphicons Halflings"
                                                 _fontSize   "11px"
                                                 _cursor     "pointer"
                                                 _paddingLeft (sprintf "%dch" (props.level * 4)) ] ]
                       |> addAttributes (if model.hover then [ _Style [ _background "#e6e6e6" ] ] else [])
                       |> OnMouseOver (fun _ -> if not model.hover 
                                                then true  |> SetHover    |> processMessages)
                       |> OnMouseOut  (fun _ ->      false |> SetHover    |> processMessages)
                       |> OnClick     (fun _ -> (props.entry.id, not props.expanded) |> props.setExpanded)
                   Div [ NText (props.entry.name) ; _Style [ _display "inline" ; _paddingRight "1ch" ] ; Draggable true ]
                ]
            ]
        |> addMoreFields Td [ NText      props.entry.theme 
                              Div[ NText ":::" ; _Style [ _textAlign "center" ] ]
                              |> OnClick (fun ev -> Some props.entry.id |> props.setSelected ; props.onClick ev)
                              NText      props.entry.content
                              Div[ NText props.entry.size ; _Style [ _textAlign "right" ] ]
                              NText      props.entry.modified
                            ] 
        |> addAttributes (if props.selected then [ _Style [ _background "lightblue"] ] else [])
        |> OnClick (fun ev -> Some props.entry.id |> props.setSelected)

    type App = App.App<Props, Model, Message>
    let app = App.App(init, update, view)

[<JavaScript>]
module FileTree =

    type SortBy =
        | SortByFileName
        | SortByDate
        | SortByTheme
        | SortByContentType
        | SortBySize

    type Props     = { 
                       entries     : Entry seq
                       onClick     : obj -> unit
                     }
    type Model     = { 
                       sortBy      : SortBy list
                       expanded    : Set<System.Guid>
                       selected    : System.Guid option
                     }
                   
    let init       = {
                       sortBy     = [ SortByFileName
                                      SortByTheme
                                      SortByDate
                                      SortByContentType
                                      SortBySize
                                    ]
                       expanded   = Set []
                       selected   = None
                     }

    type Message =
        | SetExpanded        of System.Guid * bool
        | SetSelected        of System.Guid option

    let update_ (msg: Message)  model =
        match msg with
        | SetSelected        idO -> { model with selected = idO     }
        | SetExpanded  (id, exp) -> { model with expanded = if exp then Set.add else Set.remove 
                                                            <| id <| model.expanded }

    let update (props: Props)  = update_

    let view (props:Props) (model: Model) (processMessages: Message -> unit) =
        let rec elemRows (model: Model) level (elems: Entry seq) =
            elems
            |> Seq.collect (fun elem ->
                let hasChildren = elem.children |> Seq.isEmpty |> not
                let expanded    = Set.contains elem.id model.expanded 
                let item = FileTreeNode.app.node {
                    entry       = elem
                    expanded    = expanded
                    selected    = model.selected = Some elem.id
                    level       = level
                    setExpanded = SetExpanded >> processMessages
                    setSelected = SetSelected >> processMessages
                    onClick     = props.onClick
                }
                if hasChildren && expanded
                then Seq.append [ item ] (elem.children |> elemRows model (level + 1))
                else seq [item] 
            )
        Table [ 
            _Style [ _whiteSpace "nowrap" ]
            THead [
              Tr [ Th [ NText "Element"     ; _Style [ _paddingLeft "3ch" ] ] ]
              |> FileTreeNode.addMoreFields Th [NText "Theme" ; NText "Action" ; NText "Content" ; NText "Size" ; NText "Modified"]
            ]
            TBody (props.entries |> elemRows model 0) 
          ]
          |> addAttributes [_Style [ _margin "5px" ; _overflow "auto"]]

    let app = App.App(init, update, view)

[< JavaScript >]
module UploadForm =

    type Dialog = 
        | UploadFile   
        | CreateFolder 
        | Move           of Entry
        | RenameFile     of Entry
        | RenameFolder   of Entry
        | ConfirmDelete  of Entry
        | NoDialog

    type Upload = Upload of name:string * folder:System.Guid option * tags:string * client: Client * modified: string

    let rec flattenEntries (entries:Entry seq) =
        Seq.append entries (entries |> Seq.collect (fun entry -> flattenEntries entry.children ))

    type Props = { title   : string 
                   token   : Auth.Token }

    type Model = {
        entries            : Entry seq
        form               : GenForm.Model
        popup              : Popup.Model
        dialog             : Dialog.Model
        fileTree           : FileTree.Model
        uploadName         : string
        uploadFolder       : System.Guid option
        themeTags          : string
        showDialog         : Dialog
        client             : Client
        lastUpload         : Upload option
        timerHandler       : JS.Handle option
    } 
    
    let init themeTags client entries = {
        entries            = entries
        form               = GenForm.init
        popup              = Popup.init
        dialog             = Dialog.init
        fileTree           = FileTree.init
        uploadName         = ""
        uploadFolder       = None
        themeTags          = themeTags
        showDialog         = NoDialog
        client             = client
        lastUpload         = None
        timerHandler       = None
    }

    type Message =
        | SetThemeTags        of string
        | SetUploadName       of string
        | SetUploadFolder     of System.Guid option
        | SetLastUpload       of Upload
        | SetEntries          of Entry seq
        | SetTimerHandler     of JS.Handle option
        | ShowDialog          of Dialog
        | ToFormMsg           of GenForm.Message
        | ToPopupMsg          of Popup.Message
        | ToDialogMsg         of Dialog.Message
        | ToFileTreeMsg       of FileTree.Message
        | DoAction            of (Model -> Model)

    let rec update (props:Props) message model =
        if model.form.debug then printfn "%A" message
        match message with
        | DoAction             f           -> f model
        | SetUploadName        name        -> {model with uploadName   = name                       }
        | SetUploadFolder      folderId    -> {model with uploadFolder = folderId                   }
        | SetLastUpload        upload      -> {model with lastUpload   = Some upload                }
        | SetTimerHandler      handler     -> {model with timerHandler = handler                    }
        | SetThemeTags         tags        -> {model with themeTags    = tags                       }
        | SetEntries           entries     -> {model with entries      = entries                    }
        | ShowDialog           show        -> {model with showDialog   = show                       }
        | ToFormMsg            msg         -> {model with form         = model.form     |> GenForm.update_  msg }
        | ToPopupMsg           msg         -> {model with popup        = model.popup    |> Popup.update_    msg }
        | ToDialogMsg          msg         -> {model with dialog       = model.dialog   |> Dialog.update_   msg }
        | ToFileTreeMsg        msg         -> {model with fileTree     = model.fileTree |> FileTree.update_ msg }

    let getUploadFileRO_ () =
        Rop.flow {
            do! Rop.tryProtection()
            let files: File[] = JS.Document.GetElementById("filesel")?files
            return Array.tryPick Some files
        }

    let getFileName_ () = 
        Rop.flow {
            let! fileO = getUploadFileRO_()
            return fileO |> Option.map (fun f -> f.Name) |> Option.defaultValue ""
        } |> Rop.ifError ""

    let getFileTime_ () = 
        Rop.flow {
            let! fileO = getUploadFileRO_()
            return fileO |> Option.map (fun f -> f.LastModifiedDate.ToUTCString()) |> Option.defaultValue ""
        } |> Rop.ifError ""

    let fetchEntries_ token (sortBy:FileTree.SortBy list) =
        ARop.wrap {
            let! folders, files = UploadFormServer.GetFilesInfoAR_ token
            let childrenFolders parent = folders |> Seq.filter (fun folder -> folder.parentCode = parent)
                                            |> Seq.sortBy (fun folder -> folder.name.ToLower())
            let childrenFiles   parent = files   |> Seq.filter (fun file   -> file.parentCode   = parent) 
                                            |> Seq.sortBy (fun file ->
                                                sortBy
                                                |> List.map(fun by ->
                                                    match by with
                                                    | FileTree.SortByFileName    -> file.name.ToLower()        :> System.IComparable
                                                    | FileTree.SortByDate        -> file.modified              :> System.IComparable
                                                    | FileTree.SortByTheme       -> file.tags.ToLower()        :> System.IComparable
                                                    | FileTree.SortByContentType -> file.contentType.ToLower() :> System.IComparable
                                                    | FileTree.SortBySize        -> file.size                  :> System.IComparable
                                                )
                                            )
            let rec getChildren folderId =
                Seq.append
                    (childrenFolders folderId |> Seq.map (fun fd -> EFolder(fd, fd.id |> Some |> getChildren)))
                    (childrenFiles   folderId |> Seq.map            EFile)
            return getChildren None 
        }

    let getFolders  model = model.entries |> Seq.choose (function EFolder(fd,_) -> Some fd | _ -> None) 
    let flatEntries model = flattenEntries model.entries

    let mutable renders = 0

    let view (props: Props) (model: Model) processMessages =
        renders <- renders + 1
        let showProcessing txt = (txt, true ) |> GenForm.Message.ShowInfo |> ToFormMsg |> processMessages
        let showCompleted  txt = (txt, false) |> GenForm.Message.ShowInfo |> ToFormMsg |> processMessages
        let formView     props = GenForm.view  props model.form     (ToFormMsg     >> processMessages)
        let popupView    props = Popup.view    props model.popup    (ToPopupMsg    >> processMessages)
        let dialogView   props = Dialog.view   props model.dialog   (ToDialogMsg   >> processMessages)
        let fileTreeView props = FileTree.view props model.fileTree (ToFileTreeMsg >> processMessages)

        let reloadFiles_ message =
            ARop.wrap {
                let! entries = fetchEntries_ props.token model.fileTree.sortBy
                entries |> SetEntries |> processMessages
                showCompleted message
            } |> ARop.call

        let callServerReloadFiles (call: Async<Result<string>>) =
            ARop.wrap {
                let! result = call
                reloadFiles_ result
            } |> ARop.call

        let deleteFile_    (entry: Entry)         () = UploadFormServer.DeleteFileAR_   props.token entry.id entry.isFolder       |> callServerReloadFiles 
        let renameFile_    fileId   newName tags  () = UploadFormServer.RenameFileAR_   props.token fileId   newName tags         |> callServerReloadFiles 
        let moveTo_        (entry: Entry)   newId () = UploadFormServer.MoveToAR_       props.token entry.id entry.isFolder newId |> callServerReloadFiles 
        let renameFolder_  folderId newName       () = UploadFormServer.RenameFolderAR_ props.token folderId newName              |> callServerReloadFiles
        let createFolder_  name folderId          () = UploadFormServer.CreateFolderAR_ props.token name folderId                 |> callServerReloadFiles

        let doUpload_ (file: JavaScript.File) = function
            Upload(uploadName, uploadFolder, themeTags, client, _) ->
                ARop.wrap {
                    do! Rop.tryProtection()
                    sprintf "Uploading file %s ..." file.Name |> showProcessing
                    let rdr = new JavaScript.TextFileReader()
                    rdr.Onloadend <- fun e -> UploadFormServer.UploadFileAR_ props.token uploadName uploadFolder rdr.Result file.Type file.Size themeTags client |> callServerReloadFiles 
                    rdr.ReadAsDataURL(file)
                } |> ARop.call


        let rec uploadFile_ (upload: Upload) () =
            ARop.wrap {
                let! fileO = getUploadFileRO_()
                fileO |> Option.iter(fun file ->
                   (fun model -> model.timerHandler |> Option.iter JS.ClearInterval
                                 None |> SetTimerHandler |> update props <| model ) 
                   |> DoAction |> processMessages
                   upload |> SetLastUpload |> processMessages
                   upload |> doUpload_ file
                   upload |> startReUploadTimer
                )
            } |> ARop.call
        and startReUploadTimer upload =
            JS.SetInterval (upload |> checkForReUpload) 2000 
            |> Some |> SetTimerHandler |> processMessages
        and checkForReUpload (upload: Upload) () = 
            match upload with
            Upload(uploadName, uploadFolder, themeTags, client, modified) ->
                let newModified = getFileTime_()
                if uploadName = getFileName_() && modified <> newModified then
                    uploadFile_ (Upload(uploadName, uploadFolder, themeTags, client, newModified)) ()


        let rec path_ (folder: Folder) = 
            match folder.parentCode with
            | None        -> ""
            | Some parent -> getFolders model |> Seq.tryFind (fun fd -> fd.id = parent) |> Option.map path_ |> Option.defaultValue ""
            |> fun p -> p + "/" + folder.name

        let getFolder     id            = getFolders model |> Seq.tryFind (fun fd -> fd.id = id)
        let getFolderPath idO           = idO |> Option.bind getFolder |> Option.map path_ |> Option.defaultValue ""
        let getEntryPath  (entry:Entry) = sprintf "%s/%s" (getFolderPath entry.parentId) entry.name

        let contentMyDialog_ processMessages =
            let validations        = model.form.validations
            let processValidations = ToFormMsg >> processMessages
            let folders_()     = getFolders model |> Seq.map(fun fd -> fd.id.ToString(), path_ fd) |> Seq.append [|"" , "/"|] |> Seq.sortBy snd |> Seq.toArray
            let uploadFolder   = model.uploadFolder |> Option.map (fun id -> id.ToString())
            let setUploadFolder v = if v = "" then None else System.Guid(v) |> Some 
                                    |> SetUploadFolder
            match model.showDialog with
            | UploadFile         -> "Upload File"
                                    , ["Upload", "btn", Upload(model.uploadName, model.uploadFolder, model.themeTags, model.client, getFileTime_()) |> uploadFile_ 
                                       "Cancel", "btn", id]
                                    , [ Label [NText "Select File:" ; _Style [ _paddingRight "1ch" ; _paddingBottom "1em"]]
                                        Button [NText (getFileName_() |> fun t -> if t = "" then "..." else t)] 
                                        |> OnClick(fun _ -> JQuery.JQuery("#filesel").Click())
                                        Fields.textNotEmpty      "File Name"     model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter file name" ; MaxLength 100 ] validations processValidations
                                        Fields.selectWoValidator "Folder"        uploadFolder           (setUploadFolder >> processMessages) (folders_()) []                                 
                                        Fields.textWoValidator   "Theme tags"    model.themeTags        (SetThemeTags    >> processMessages) [ Placeholder "enter tags"      ; MaxLength 200 ]
                                      ]
            | Move          entry -> "Move to"
                                    , ["Ok"    , "btn", moveTo_       entry      model.uploadFolder
                                       "Cancel", "btn", id]
                                    , [ Fields.selectWoValidator "Folder"        uploadFolder           (setUploadFolder >> processMessages) (folders_()) [] ]
            | RenameFile    entry -> "Rename File"
                                    , ["Ok"    , "btn", renameFile_   entry.id   model.uploadName model.themeTags
                                       "Cancel", "btn", id] 
                                    , [ Fields.textNotEmpty      "File Name"     model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter file name"  ; MaxLength 100 ] validations processValidations
                                        Fields.textWoValidator   "Theme tags"    model.themeTags        (SetThemeTags    >> processMessages) [ Placeholder "enter tags"       ; MaxLength 200 ]
                                     ]                                                                                                                                    
            | RenameFolder  entry -> "Rename Folder"                                                                                                                       
                                    , ["Ok"    , "btn", renameFolder_ entry.id   model.uploadName
                                       "Cancel", "btn", id]                                                                                                               
                                    , [ Fields.textNotEmpty      "File Name"     model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter file name"  ; MaxLength 100 ] validations processValidations ]
            | CreateFolder       -> "Create Folder"
                                    , ["Ok"    , "btn", createFolder_            model.uploadName model.uploadFolder
                                       "Cancel", "btn", id] 
                                    , [ Fields.selectWoValidator "Parent Folder" uploadFolder           (setUploadFolder >> processMessages) (folders_()) []
                                        Fields.textNotEmpty      "Folder Name"   model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter folder name"; MaxLength 100 ] validations processValidations
                                      ]
            | ConfirmDelete entry -> "Confirm Delete "
                                    , ["DELETE", "btn", deleteFile_ entry
                                       "Cancel", "btn", id] 
                                    , [ NText <| sprintf "Delete %s %s?" (if entry.isFolder then "folder" else "file")  entry.name ]
            | NoDialog           -> "", [], []

        let setTargetFolder (entry: Entry) =
            if entry.isFolder
            then Some entry.id
            else entry.parentId
            |> SetUploadFolder |> processMessages

        let setParentFolder (entry: Entry) = entry.parentId |> SetUploadFolder |> processMessages

        let menuItems (model:Model) =
            let { client = c} = model
            let withSelectedentry f =
                model.fileTree.selected
                |> Option.iter (fun sel -> 
                    flatEntries model |> Seq.filter(fun e -> e.id = sel)
                    |> Seq.iter f
                )       
            [ "Upload file"  , fun () -> withSelectedentry 
                                         <| fun entry -> setTargetFolder entry
                                                         getFileName_()         |> SetUploadName |> processMessages
                                                         UploadFile             |> ShowDialog    |> processMessages
              "Open "        , fun () -> withSelectedentry                      
                                         <| fun entry -> if not entry.isFolder then JS.Window.Open(sprintf "/EPFile%s" (getEntryPath entry), "blank") |> ignore
              "New folder"   , fun () -> withSelectedentry                      
                                         <| fun entry -> setTargetFolder entry   
                                                         CreateFolder           |> ShowDialog    |> processMessages
              "Move"         , fun () -> withSelectedentry                      
                                         <| fun entry -> setParentFolder entry   
                                                         entry |> Move          |> ShowDialog    |> processMessages
              "Rename"       , fun () -> withSelectedentry 
                                         <| fun entry -> 
                                                 let renameObject = 
                                                     if entry.isFolder
                                                     then RenameFolder 
                                                     else entry.theme            |> SetThemeTags  |> processMessages
                                                          RenameFile
                                                 entry.name                      |> SetUploadName |> processMessages
                                                 entry |> renameObject           |> ShowDialog    |> processMessages
              "-"            , fun () -> () 
              "Delete"       , fun () -> withSelectedentry
                                         <| fun entry -> entry |> ConfirmDelete  |> ShowDialog    |> processMessages
            ]

        let dlgTitle, dlgButtons, dlgContent = contentMyDialog_ processMessages
        let showMenu (e:obj) = 
            call e?target?getBoundingClientRect e?target null
            |> fun r -> Popup.ShowPopUp(r?left, r?top) |> ToPopupMsg |> processMessages

        let reUpload = match model.lastUpload with
                        | Some upload when getFileName_() <> "" -> Input  [Type "button" ; Value <| sprintf "Re%A" upload 
                                                                           _Style [ _flex "0 0" ; _alignSelf "flex-start"]] 
                                                                   |> OnClick       (upload |> uploadFile_)
                        | _                                     -> NEmpty 
        formView 
            { title   = props.title
              buttons = [ "New Folder"  , "btn    btn-default  pull-right", (fun _ -> CreateFolder   |> ShowDialog    |> processMessages)
                          "Upload File" , "btn    btn-default  pull-right", (fun _ -> getFileName_() |> SetUploadName |> processMessages
                                                                                      UploadFile     |> ShowDialog    |> processMessages) 
                        ]
              content = [ NText (sprintf "Renders: %d" renders)
                          dialogView          { title     = dlgTitle
                                                buttons   = dlgButtons 
                                                content   = dlgContent
                                                show      = model.showDialog <> NoDialog
                                                close_    = Some (fun () -> NoDialog |> ShowDialog |> processMessages)
                                              } 
                          popupView           { menuItems = menuItems model }               
                          Input [ Type "file" ; Id "filesel" ; _Style [ _display "none" ]] 
                          |> OnChange (getFileName_ >> SetUploadName   >> processMessages)
                          reUpload
                          fileTreeView        {
                                                entries   = model.entries
                                                onClick   = showMenu
                                              }
                        ]
            }

    [< Require(typeof<BootstrapLoader>) >]
    type Loader2 [< JavaScript ; Inline "{}" >]  () = [< DefaultValue >] val mutable xx : string
                
    let showForm_  title themeTags client =
        let loader = Loader2()
        App.withContainerDo "container" <| fun container ->
            ARop.wrap {
                let! token = Server.fetchTokenAR_()
                let! entries = fetchEntries_ token FileTree.init.sortBy
                let initV1 = init themeTags client entries
                let app = App.App(initV1, update, view)
                app.run { title = title 
                          token = token } container.Dom 
            } |> ARop.call


(*[<JavaScript>]
module FileTree =

    type SortBy =
        | SortByFileName
        | SortByDate
        | SortByTheme
        | SortByContentType
        | SortBySize

    type Entry =
    | EFolder of Folder * Entry seq
    | EFile   of FileInfo
    with member this.id       = match this with
                                | EFolder(fd, _       ) -> fd.id
                                | EFile   fl            -> fl.id
         member this.children = match this with
                                | EFolder(fd, children) -> children
                                | EFile   fl            -> seq []
         member this.name     = match this with
                                | EFolder(fd, children) -> fd.name
                                | EFile   fl            -> fl.name
         member this.theme    = match this with
                                | EFolder(fd, children) -> ""
                                | EFile   fl            -> fl.tags
         member this.content  = match this with
                                | EFolder(fd, children) -> ""
                                | EFile   fl            -> fl.contentType
         member this.size     = match this with
                                | EFolder(fd, children) -> ""
                                | EFile   fl            -> (toLocaleString fl.size)
         member this.modified = match this with
                                | EFolder(fd, children) -> ""
                                | EFile   fl            -> fl.modified
         member this.isFolder = match this with
                                | EFolder(fd, children) -> true
                                | EFile   fl            -> false
         member this.parentId = match this with
                                | EFolder(fd, children) -> fd.parentCode
                                | EFile   fl            -> fl.parentCode
    
    let rec flattenEntries (entries:Entry seq) =
        Seq.append entries (entries |> Seq.collect (fun entry -> flattenEntries entry.children ))

    type Model     = { 
                       entries     : Entry seq
                       sortBy      : SortBy list
                       expanded    : Set<System.Guid>
                       selected    : System.Guid option
                       hover       : System.Guid option
                     }
    with member this.flatEntries = flattenEntries this.entries
                   
    let init       = {
                       entries    = []
                       sortBy     = [ SortByFileName
                                      SortByTheme
                                      SortByDate
                                      SortByContentType
                                      SortBySize
                                    ]
                       expanded   = Set []
                       selected   = None
                       hover      = None
                     }

    type Message =
        | SetElements        of Entry seq
        | SetExpanded        of System.Guid * bool
        | SetHover           of System.Guid option
        | SetSelected        of System.Guid option

    let update (props: Props) (msg: Message)  model =
        match msg with
        | SetElements    entries -> { model with entries  = entries }
        | SetHover           idO -> { model with hover    = idO     }
        | SetSelected        idO -> { model with selected = idO     }
        | SetExpanded  (id, exp) -> { model with expanded = if exp then Set.add else Set.remove 
                                                            <| id <| model.expanded }

    let addMoreFields tag fields =
        fields
        |> List.map (fun v ->
              tag [ _Style [ _paddingLeft "0.5ch" ; _paddingRight "0.5ch" ; _overflow "hidden" ; _textOverflow "ellipsis"] 
                    v
                  ] 
           )
        |> addChildren 

    let rec elemRows (model: Model) level (elems: Entry seq) =
        elems
        |> Seq.collect (fun elem ->
            let hasChildren = elem.children |> Seq.isEmpty |> not
            let expanded    = Set.contains elem.id model.expanded 
            let symbol      = match (hasChildren,expanded) with
                                | false, _     -> "\uE235 "
                                | true , true  -> "\uE114 " 
                                | true , false -> "\uE080 "
            let item = elem, expanded, symbol, level
            if hasChildren && expanded
            then Seq.append [ item ] (elem.children |> elemRows model (level + 1))
            else seq [item] 
        )

    let view doAction (model: Model) (processMessages: Message -> unit) =
        let elemView (elem: Entry, expanded, symbol, level) =
            let hover    = model.hover     = Some elem.id
            let selected = model.selected  = Some elem.id
            Tr [ Td [  _Style [ _overflow "hidden" ; _textOverflow "ellipsis" ]
                       Div [ NText symbol ; _Style [ _display    "inline"
                                                     _fontFamily "Glyphicons Halflings"
                                                     _fontSize   "11px"
                                                     _cursor     "pointer"
                                                     _paddingLeft (sprintf "%dch" (level * 4)) ] ]
                          |> addAttributes (if hover then [ _Style [ _background "#e6e6e6" ] ] else [])
                          |> OnMouseOver (fun _ -> if Some elem.id <> model.hover then 
                                                    elem.id |> Some        |> SetHover    |> processMessages)
                          |> OnMouseOut  (fun _ ->             None        |> SetHover    |> processMessages)
                          |> OnClick     (fun _ -> (elem.id, not expanded) |> SetExpanded |> processMessages)
                       Div [ NText (elem.name) ; _Style [ _display "inline" ; _paddingRight "1ch" ] ; Draggable true ]
                    ]
               ]
            |> addMoreFields Td [ NText      elem.theme 
                                  Div[ NText ":::" ; _Style [ _textAlign "center" ] ]
                                  |> OnClick (fun ev -> Some elem.id |> SetSelected |> processMessages ; doAction ev)
                                  NText      elem.content
                                  Div[ NText elem.size ; _Style [ _textAlign "right" ] ]
                                  NText      elem.modified
                                ] 
            |> addAttributes (if selected then [ _Style [ _background "lightblue"] ] else [])
            |> OnClick (fun ev -> Some elem.id |> SetSelected |> processMessages)

        Table [ 
            _Style [ _whiteSpace "nowrap" ]
            THead [
              Tr [ Th [ NText "Element"     ; _Style [ _paddingLeft "3ch" ] ] ]
              |> addMoreFields Th [NText "Theme" ; NText "Action" ; NText "Content" ; NText "Size" ; NText "Modified"]
            ]
            TBody (model.entries |> elemRows model 0 |> Seq.map elemView) 
          ]
          |> addAttributes [_Style [ _margin "5px" ; _overflow "auto"]]

    let setEntries_ token (model:Model) (processMessages: Message -> unit) (finish: unit -> unit) =
        ARop.wrap {
            let! folders, files = UploadFormServer.GetFilesInfoAR_ token
            let childrenFolders parent = folders |> Seq.filter (fun folder -> folder.parentCode = parent)
                                         |> Seq.sortBy (fun folder -> folder.name.ToLower())
            let childrenFiles   parent = files   |> Seq.filter (fun file   -> file.parentCode   = parent) 
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
            let rec getChildren folderId =
                Seq.append
                    (childrenFolders folderId |> Seq.map (fun fd -> EFolder(fd, fd.id |> Some |> getChildren)))
                    (childrenFiles   folderId |> Seq.map            EFile)
            getChildren None |> SetElements |> processMessages
            finish()
        }
        |> ARop.call


[< JavaScript >]
module UploadForm =

    type Entry = FileTree.Entry

    type Dialog = 
        | UploadFile   
        | CreateFolder 
        | Move           of Entry
        | RenameFile     of Entry
        | RenameFolder   of Entry
        | ConfirmDelete  of Entry
        | NoDialog

    type Upload = Upload of name:string * folder:System.Guid option * tags:string * client: Client

    type Model = {
        form               : GenForm.Model
        dialog             : Dialog.Model
        popup              : Popup.Model
        fileTree           : FileTree.Model
        token              : Auth.Token
        uploadName         : string
        uploadFolder       : System.Guid option
        themeTags          : string
        showDialog         : Dialog
        client             : Client
        lastUpload         : Upload option
    }

    let init token title themeTags client = {
        form               = GenForm.init title
        dialog             = Dialog.init
        popup              = Popup.init
        fileTree           = FileTree.init
        token              = token
        uploadName         = ""
        uploadFolder       = None
        themeTags          = themeTags
        showDialog         = NoDialog
        client             = client
        lastUpload         = None
    }

    type Message =
        | SetThemeTags        of string
        | SetUploadName       of string
        | SetUploadFolder     of System.Guid option
        | SetLastUpload       of Upload
        | ShowDialog          of Dialog
        | ToFormMsg           of GenForm.Message
        | ToDialogMsg         of Dialog.Message
        | ToPopupMsg          of Popup.Message
        | ToFileTreeMsg       of FileTree.Message
        | DoAction            of (Model -> Model)

    let rec update message model =
        if model.form.debug then printfn "%A" message
        match message with
        | DoAction             f           -> f model
        | ToFormMsg            msg         -> {             model with form         = GenForm.update  msg model.form     }
        | ToPopupMsg           msg         -> {             model with popup        = Popup.update    msg model.popup    }
        | ToFileTreeMsg        msg         -> {             model with fileTree     = FileTree.update msg model.fileTree }
        | ToDialogMsg          msg         -> let model' = {model with dialog       = Dialog.update   msg model.dialog   }
                                              match msg with
                                              | Dialog.ShowDialog false -> model' |> update (ShowDialog NoDialog)
                                              | _                       -> model'
        | SetUploadName        name        -> {model with uploadName   = name                       }
        | SetUploadFolder      folderId    -> {model with uploadFolder = folderId                   }
        | SetLastUpload        upload      -> {model with lastUpload   = Some upload                }
        | SetThemeTags         tags        -> {model with themeTags    = tags                       }
        | ShowDialog           show        -> if model.showDialog <> show
                                              then {model with showDialog   = show                       }
                                                   |> update (show <> NoDialog |> Dialog.ShowDialog |> ToDialogMsg)
                                              else model


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

    let view (model: Model) processMessages =
        let showProcessing txt = (txt, true ) |> GenForm.Message.ShowInfo |> ToFormMsg |> processMessages
        let showCompleted  txt = (txt, false) |> GenForm.Message.ShowInfo |> ToFormMsg |> processMessages

        let reloadFiles_ message =
            FileTree.setEntries_ model.token model.fileTree (ToFileTreeMsg >> processMessages)
                (fun () -> showCompleted message)

        let callServerReloadFiles (call: Async<Result<string>>) =
            Server.call {
                let! result = call
                reloadFiles_ result
            }

        let deleteFile_    (entry: Entry)         () = UploadFormServer.DeleteFileAR_   model.token entry.id entry.isFolder       |> callServerReloadFiles 
        let renameFile_    fileId   newName tags  () = UploadFormServer.RenameFileAR_   model.token fileId   newName tags            |> callServerReloadFiles 
        let moveTo_        (entry: Entry)   newId () = UploadFormServer.MoveToAR_       model.token entry.id entry.isFolder newId |> callServerReloadFiles 
        let renameFolder_  folderId newName       () = UploadFormServer.RenameFolderAR_ model.token folderId newName                 |> callServerReloadFiles
        let createFolder_  name folderId          () = UploadFormServer.CreateFolderAR_ model.token name folderId                    |> callServerReloadFiles

        let doUpload_ (file: JavaScript.File) = function
            Upload(uploadName, uploadFolder, themeTags, client) ->
                Server.call {
                    do! Rop.tryProtection()
                    sprintf "Uploading file %s ..." file.Name |> showProcessing
                    let rdr = new JavaScript.TextFileReader()
                    rdr.Onloadend <- fun e -> UploadFormServer.UploadFileAR_ model.token uploadName uploadFolder rdr.Result file.Type file.Size themeTags client |> callServerReloadFiles 
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
            let folders = model.fileTree.entries |> Seq.choose (function FileTree.EFolder(fd,_) -> Some fd | _ -> None) 
            let rec path_ (folder: Folder) = 
                match folder.parentCode with
                | None        -> ""
                | Some parent -> folders |> Seq.tryFind (fun fd -> fd.id = parent) |> Option.map path_ |> Option.defaultV ""
                |> fun p -> p + "/" + folder.name
            let folders_() = folders |> Seq.map(fun fd -> fd.id.ToString(), path_ fd) |> Seq.append [|"" , "/"|] |> Seq.sortBy snd |> Seq.toArray
            let uploadFolder = model.uploadFolder |> Option.map (fun id -> id.ToString())
            let setUploadFolder v = if v = "" then None else System.Guid(v) |> Some 
                                    |> SetUploadFolder
            match model.showDialog with
            | UploadFile         -> "Upload File"
                                    , ["Upload", "btn", Upload(model.uploadName, model.uploadFolder, model.themeTags, model.client) |> uploadFile_ 
                                       "Cancel", "btn", id]
                                    , [ Label [NText "Select File:" ; _Style [ _paddingRight "1ch" ; _paddingBottom "1em"]]
                                        Button [NText (getFileName_() |> fun t -> if t = "" then "..." else t)] 
                                        |> OnClick(fun _ -> JQuery.JQuery("#filesel").Click())
                                        Fields.textNotEmpty      "File Name"     model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter file name" ; MaxLength 100 ] model.form.validations (ToFormMsg >> processMessages)
                                        Fields.selectWoValidator "Folder"        uploadFolder           (setUploadFolder >> processMessages) (folders_()) []                                 
                                        Fields.textWoValidator   "Theme tags"    model.themeTags        (SetThemeTags    >> processMessages) [ Placeholder "enter tags"      ; MaxLength 200 ]
                                      ]
            | Move          entry -> "Move to"
                                    , ["Ok"    , "btn", moveTo_       entry      model.uploadFolder
                                       "Cancel", "btn", id]
                                    , [ Fields.selectWoValidator "Folder"        uploadFolder           (setUploadFolder >> processMessages) (folders_()) [] ]
            | RenameFile    entry -> "Rename File"
                                    , ["Ok"    , "btn", renameFile_   entry.id   model.uploadName model.themeTags
                                       "Cancel", "btn", id] 
                                    , [ Fields.textNotEmpty      "File Name"     model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter file name"  ; MaxLength 100 ] model.form.validations (ToFormMsg >> processMessages)
                                        Fields.textWoValidator   "Theme tags"    model.themeTags        (SetThemeTags    >> processMessages) [ Placeholder "enter tags"       ; MaxLength 200 ]
                                     ]                                                                                                                                    
            | RenameFolder  entry -> "Rename Folder"                                                                                                                       
                                    , ["Ok"    , "btn", renameFolder_ entry.id   model.uploadName                                                                         
                                       "Cancel", "btn", id]                                                                                                               
                                    , [ Fields.textNotEmpty      "File Name"     model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter file name"  ; MaxLength 100 ] model.form.validations (ToFormMsg >> processMessages) ]
            | CreateFolder       -> "Create Folder"
                                    , ["Ok"    , "btn", createFolder_            model.uploadName model.uploadFolder
                                       "Cancel", "btn", id] 
                                    , [ Fields.selectWoValidator "Parent Folder" uploadFolder           (setUploadFolder >> processMessages) (folders_()) []
                                        Fields.textNotEmpty      "Folder Name"   model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter folder name"; MaxLength 100 ] model.form.validations (ToFormMsg >> processMessages)
                                      ]
            | ConfirmDelete entry -> "Confirm Delete "
                                    , ["DELETE", "btn", deleteFile_ entry
                                       "Cancel", "btn", id] 
                                    , [ NText <| sprintf "Delete %s %s?" (if entry.isFolder then "folder" else "file")  entry.name ]
            | NoDialog           -> "", [], []

        let setTargetFolder (entry: Entry) =
            if entry.isFolder
            then Some entry.id
            else entry.parentId
            |> SetUploadFolder |> processMessages

        let setParentFolder (entry: Entry) = entry.parentId |> SetUploadFolder |> processMessages

        let menuItems (model:Model) =
            let withSelectedentry f =
                model.fileTree.selected
                |> Option.iter (fun sel -> 
                    model.fileTree.flatEntries |> Seq.filter(fun e -> e.id = sel)
                    |> Seq.iter f
                )       
            [ "Upload file"  , fun () -> withSelectedentry 
                                         <| fun entry -> setTargetFolder entry
                                                         getFileName_()         |> SetUploadName |> processMessages
                                                         UploadFile             |> ShowDialog    |> processMessages
              "New folder"   , fun () -> withSelectedentry                      
                                         <| fun entry -> setTargetFolder entry   
                                                         CreateFolder           |> ShowDialog    |> processMessages
              "Move"         , fun () -> withSelectedentry                      
                                         <| fun entry -> setParentFolder entry   
                                                         entry |> Move          |> ShowDialog    |> processMessages
              "Rename"       , fun () -> withSelectedentry 
                                         <| fun entry -> 
                                                 let renameObject = 
                                                     if entry.isFolder
                                                     then RenameFolder 
                                                     else entry.theme            |> SetThemeTags  |> processMessages
                                                          RenameFile
                                                 entry.name                      |> SetUploadName |> processMessages
                                                 entry |> renameObject           |> ShowDialog    |> processMessages
              "-"            , fun () -> () 
              "Delete"       , fun () -> withSelectedentry
                                         <| fun entry -> entry |> ConfirmDelete  |> ShowDialog    |> processMessages
            ]

        let dlgTitle, dlgButtons, dlgContent = contentMyDialog_ model processMessages
        let showMenu (e:obj) = 
            call e?target?getBoundingClientRect e?target null
            |> fun r -> Popup.ShowPopUp(r?left, r?top) |> ToPopupMsg       |> processMessages
        let reUpload = match model.lastUpload with
                        | Some upload when getFileName_() <> "" -> Input  [Type "button" ; Value <| sprintf "Re%A" upload 
                                                                           _Style [ _flex "0 0" ; newAttr "alignSelf" "flex-start"]] 
                                                                   |> OnClick       (upload |> uploadFile_)
                                                                   |> OnAfterRender ()
                        | _                                     -> NEmpty 
        GenForm.view 
                        [ "New Folder"  , "btn    btn-default  pull-right", (fun _ -> CreateFolder   |> ShowDialog    |> processMessages)
                          "Upload File" , "btn    btn-default  pull-right", (fun _ -> getFileName_() |> SetUploadName |> processMessages
                                                                                      UploadFile     |> ShowDialog    |> processMessages) 
                        ]
                [ Dialog.view dlgTitle dlgButtons dlgContent <| model.dialog   <| (fun msg -> msg |> ToDialogMsg      |> processMessages)
                  Popup.view (menuItems model)               <| model.popup    <| (fun msg -> msg |> ToPopupMsg       |> processMessages)
                  Input [ Type "file" ; Id "filesel" ; _Style [ _display "none" ]] 
                  |> OnChange (getFileName_ >> SetUploadName   >> processMessages)
                  reUpload
                  FileTree.view  showMenu                    <| model.fileTree <| (fun msg -> msg |> ToFileTreeMsg    |> processMessages)
                ]                                                                                                     
        <|                                                      model.form     <| (fun msg -> msg |> ToFormMsg        |> processMessages)

    [< Require(typeof<BootstrapLoader>) >]
    type Loader2 [< JavaScript ; Inline "{}" >]  () = [< DefaultValue >] val mutable xx : string
                
    let showForm_  title themeTags client =
        let loader = Loader2()
        App.withContainerDo "container" <| fun container ->
            Server.call { 
                let! token = Server.fetchTokenAR_()
                let init = init token title themeTags client
                FileTree.setEntries_ token init.fileTree (fun msg -> 
                    let init = msg |> ToFileTreeMsg |> update <| init
                    App.app
                        <| init
                        <| update
                        <| view 
                    |> App.run container.Dom
                ) id
            }

*)