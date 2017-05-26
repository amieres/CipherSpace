namespace CIPHERSpace
open Model
open Model2
open WebSharper
open WebSharper.Web
open WebSharper.JavaScript
open Rop
open ReactHtml

[<JavaScript>]
module AddToDo =
    type Props     = { onClick : string * int -> unit }
    type Model     = { counter : int }
                   
    let init = { counter = 0 }

    type Message =
        | Increment

    let update msg model =
        match msg with
        | Increment -> { model with counter = model.counter + 1 }

    let mutable input : WebSharper.JavaScript.Dom.Element = null

    let view (props:Props) (model: Model) (processMessages: Message -> unit) =
        Div [
                Input [ NAttribute("ref", fun node -> input <- node) ]
                Button [ NText "Add ToDo"]
                |> OnClick (fun () -> (input?value, model.counter) |> props.onClick
                                      input?value <- ""
                                      Increment |> processMessages
                           )
            ]

    let app = App.app init update view


[<JavaScript>]
module ToDoV =
    type Props     = { 
                       task      : string
                       completed : bool
                       onClick   : obj
                     }
    type Model     = { hover : bool }
                   
    let init = { hover = false }

    type Message =
        | SetHover of bool

    let update msg model =
        match msg with
        | SetHover  hover -> { model with hover = hover } 

    let view (props:Props) (model: Model) (processMessages: Message -> unit) =
        Li [_Style [ newAttr "textDecoration" (if props.completed then "line-through" else "none") 
                     _background (if model.hover then "lightgrey" else "transparent")
                   ]
            NText props.task
          ]
        |> OnClick props.onClick
        |> OnMouseOver (fun _ -> if not model.hover 
                                 then true  |> SetHover    |> processMessages)
        |> OnMouseOut  (fun _ ->      false |> SetHover    |> processMessages)

    let app  = App.app init update view

[<JavaScript>]
module ToDo =
    type Props     = { dummy : bool }
    type Model     = { 
                       task      : string
                       id        : int
                       completed : bool
                     }
                   
    let init_ task id = {
                       task      = task
                       id        = id
                       completed = false
                     }

    type Message =
        | Toggle of int

    let update msg model =
        match msg with
        | Toggle  id -> if model.id = id 
                        then { model with completed = not model.completed } 
                        else model

    let view (props:Props) (model: Model) (processMessages: Message -> unit) =
        ToDoV.app.node {
                       task      = model.task
                       completed = model.completed
                       onClick   = fun () -> model.id |> Toggle |> processMessages
        }

    let app_ task id = App.app (init_ task id) update view

[<JavaScript>]
module ToDos =
    type Filter =
        | All
        | Completed
        | Active

    type Props     = { filter : Filter }
    type Model     = { 
                       toDos : ToDo.Model list
                     }
                   
    let init       = {
                       toDos  = []
                     }

    type Message =
        | AddToDo of string * int
        | ToToDoMsg of ToDo.Message

    let update msg model =
        match msg with
        | AddToDo (task, id) -> { model with toDos  = (ToDo.init_ task id) :: model.toDos       }
        | ToToDoMsg msg      -> { model with toDos  = model.toDos |> List.map (ToDo.update msg) }

    let view (props:Props) (model: Model) (processMessages: Message -> unit) =
        let toDoView toDo = ToDo.view {dummy = true} toDo (ToToDoMsg >> processMessages)
        let filter   = match props.filter with
                       |All       -> id
                       |Completed -> List.filter (fun (toDo:ToDo.Model) ->     toDo.completed)
                       |Active    -> List.filter (fun (toDo:ToDo.Model) -> not toDo.completed) 
        model.toDos |> filter |> List.rev |> List.map toDoView |> Ul

    let app = App.app init update view

[< JavaScript >]
module ToDoApp =
    type Filter = ToDos.Filter

    type Props     = { dummy : bool }
    type Model     = { 
                       toDos   : ToDos.Model
                       addToDo : AddToDo.Model
                       filter  : Filter
                     }
                   
    let init       = {
                       toDos   = ToDos.init
                       addToDo = AddToDo.init
                       filter  = ToDos.All
                     }

    type Message =
        | ToAddToDoMsg of AddToDo.Message
        | ToToDosMsg   of ToDos.Message
        | SetFilter    of ToDos.Filter

    let update msg model =
        match msg with
        | SetFilter filter -> { model with filter  = filter                              }
        | ToAddToDoMsg msg -> { model with addToDo = model.addToDo |> AddToDo.update msg }
        | ToToDosMsg   msg -> { model with toDos   = model.toDos   |> ToDos.update   msg }

    let filterView currentFilter filter children onClick =
        if filter = currentFilter 
        then Span children
        else A    [ Href "#" ]
             |> addChildren children
             |> OnClick (fun (ev:Attrs) -> ev.preventDefault() ; onClick filter)

    let mutable counter = 0

    let view (props:Props) (model: Model) (processMessages: Message -> unit) =        
        let onClick (task, id) = (task, id) |> ToDos.AddToDo |> ToToDosMsg |> processMessages
        let addToDoView addToDo = AddToDo.view { onClick = onClick      } addToDo (ToAddToDoMsg >> processMessages)
        let toDosView   toDos   = ToDos.view   { filter  = model.filter } toDos   (ToToDosMsg   >> processMessages)
        let filterView2 = filterView model.filter
        counter <- counter + 1
        Div [
            NText (sprintf "Renders: %d" counter)
            model.addToDo |> addToDoView
            model.toDos   |> toDosView
            B [
                filterView2 ToDos.Filter.All       [ NText "All"       ] (SetFilter >> processMessages)
                NText ", "
                filterView2 ToDos.Filter.Active    [ NText "Active"    ] (SetFilter >> processMessages)
                NText ", "
                filterView2 ToDos.Filter.Completed [ NText "Completed" ] (SetFilter >> processMessages)
            ]
        ]

    let app = App.app init update view

    let showForm_  title themeTags client =
        App.withContainerDo "container" <| fun container ->
            app.run container.Dom {dummy = false}


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
    let GetFilesInfoAR_ () =
        async {
            return
                Rop.flow {
                    let fileInfos  = ["a";"b";"c"] |> Seq.mapi(fun i file ->
                                              { FileInfo.id          = sprintf "00000000-0000-0000-0000-00000000000%d" i |> System.Guid
                                                FileInfo.name        = file 
                                                FileInfo.folderName  = ""
                                                FileInfo.parentCode  = sprintf "F0000000-0000-0000-0000-00000000000%d" i |> System.Guid |> Some
                                                FileInfo.contentType = "content"
                                                FileInfo.size        = i * 888
                                                FileInfo.modified    = "99-99-99"
                                                FileInfo.tags        = ""
                                               }) |> Seq.toArray
                    let folderInfos = ["d";"e";"f"]  |> Seq.mapi(fun i folder ->
                                              { Folder.id            = sprintf "F0000000-0000-0000-0000-00000000000%d" i |> System.Guid
                                                Folder.name          = folder
                                                Folder.parentCode    = None
                                                }) |> Seq.toArray
                    return folderInfos, fileInfos
                }
       }



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

    let update msg model =
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
    let app = App.app init update view

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

    let update msg model =
        match msg with
        | SetSelected        idO -> { model with selected = idO     }
        | SetExpanded  (id, exp) -> { model with expanded = if exp then Set.add else Set.remove 
                                                            <| id <| model.expanded }

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

    let app = App.app init update view

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

    type Upload = Upload of name:string * folder:System.Guid option * tags:string * client: Client

    let rec flattenEntries (entries:Entry seq) =
        Seq.append entries (entries |> Seq.collect (fun entry -> flattenEntries entry.children ))

    type Props = { title   : string }

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
    }

    type Message =
        | SetThemeTags        of string
        | SetUploadName       of string
        | SetUploadFolder     of System.Guid option
        | SetLastUpload       of Upload
        | SetEntries          of Entry seq
        | ShowDialog          of Dialog
        | ToFormMsg           of GenForm.Message
        | ToPopupMsg          of Popup.Message
        | ToDialogMsg         of Dialog.Message
        | ToFileTreeMsg       of FileTree.Message
        | DoAction            of (Model -> Model)

    let rec update message model =
        if model.form.debug then printfn "%A" message
        match message with
        | DoAction             f           -> f model
        | SetUploadName        name        -> {model with uploadName   = name                       }
        | SetUploadFolder      folderId    -> {model with uploadFolder = folderId                   }
        | SetLastUpload        upload      -> {model with lastUpload   = Some upload                }
        | SetThemeTags         tags        -> {model with themeTags    = tags                       }
        | SetEntries           entries     -> {model with entries      = entries                    }
        | ShowDialog           show        -> {model with showDialog   = show                       }
        | ToFormMsg            msg         -> {model with form         = model.form     |> GenForm.update  msg }
        | ToPopupMsg           msg         -> {model with popup        = model.popup    |> Popup.update    msg }
        | ToDialogMsg          msg         -> {model with dialog       = model.dialog   |> Dialog.update   msg }
        | ToFileTreeMsg        msg         -> {model with fileTree     = model.fileTree |> FileTree.update msg }

    let getUploadFileRO_ () =
        Rop.flow {
            do! Rop.tryProtection()
            let files: File[] = JS.Document.GetElementById("filesel")?files
            return Array.tryPick Some files
        }

    let getFileName_ () = 
        Rop.flow {
            let! fileO = getUploadFileRO_()
            return fileO |> Option.map (fun f -> f.Name) |> Option.defaultV ""
        } |> Rop.ifError ""

    let fetchEntries_ (sortBy:FileTree.SortBy list) =
        ARop.wrap {
            let! folders, files = UploadFormServer.GetFilesInfoAR_ ()
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
                let! entries = fetchEntries_ model.fileTree.sortBy
                entries |> SetEntries |> processMessages
                showCompleted message
            } |> ARop.call

        let callServerReloadFiles (call: Async<Result<string>>) =
            ARop.wrap {
                let! result = call
                reloadFiles_ result
            } |> ARop.call

        let doNothing () = ()

        let doUpload_ (file: JavaScript.File) = function
            Upload(uploadName, uploadFolder, themeTags, client) ->
                ARop.wrap {
                    do! Rop.tryProtection()
                    sprintf "Uploading file %s ..." file.Name |> showProcessing
                    let rdr = new JavaScript.TextFileReader()
                    //rdr.Onloadend <- fun e -> UploadFormServer.UploadFileAR_ model.token uploadName uploadFolder rdr.Result file.Type file.Size themeTags client |> callServerReloadFiles 
                    rdr.ReadAsDataURL(file)
                } |> ARop.call

        let uploadFile_ (upload: Upload) () =
            ARop.wrap {
                let! fileO = getUploadFileRO_()
                fileO |> Option.iter(fun file ->
                   upload |> SetLastUpload |> processMessages
                   upload |> doUpload_ file
                )
            } |> ARop.call

        let contentMyDialog_ (model: Model) processMessages =
            let validations        = model.form.validations
            let processValidations = ToFormMsg >> processMessages
            let rec path_ (folder: Folder) = 
                match folder.parentCode with
                | None        -> ""
                | Some parent -> getFolders model |> Seq.tryFind (fun fd -> fd.id = parent) |> Option.map path_ |> Option.defaultV ""
                |> fun p -> p + "/" + folder.name
            let folders_()     = getFolders model |> Seq.map(fun fd -> fd.id.ToString(), path_ fd) |> Seq.append [|"" , "/"|] |> Seq.sortBy snd |> Seq.toArray
            let uploadFolder   = model.uploadFolder |> Option.map (fun id -> id.ToString())
            let setUploadFolder v = if v = "" then None else System.Guid(v) |> Some 
                                    |> SetUploadFolder
            match model.showDialog with
            | UploadFile         -> "Upload File"
                                    , ["Upload", "btn", Upload(model.uploadName, model.uploadFolder, model.themeTags, model.client) |> uploadFile_ 
                                       "Cancel", "btn", id]
                                    , [ Label [NText "Select File:" ; _Style [ _paddingRight "1ch" ; _paddingBottom "1em"]]
                                        Button [NText (getFileName_() |> fun t -> if t = "" then "..." else t)] 
                                        |> OnClick(fun _ -> JQuery.JQuery("#filesel").Click())
                                        Fields.textNotEmpty      "File Name"     model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter file name" ; MaxLength 100 ] validations processValidations
                                        Fields.selectWoValidator "Folder"        uploadFolder           (setUploadFolder >> processMessages) (folders_()) []                                 
                                        Fields.textWoValidator   "Theme tags"    model.themeTags        (SetThemeTags    >> processMessages) [ Placeholder "enter tags"      ; MaxLength 200 ]
                                      ]
            | Move          entry -> "Move to"
                                    , ["Ok"    , "btn", doNothing
                                       "Cancel", "btn", id]
                                    , [ Fields.selectWoValidator "Folder"        uploadFolder           (setUploadFolder >> processMessages) (folders_()) [] ]
            | RenameFile    entry -> "Rename File"
                                    , ["Ok"    , "btn", doNothing
                                       "Cancel", "btn", id] 
                                    , [ Fields.textNotEmpty      "File Name"     model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter file name"  ; MaxLength 100 ] validations processValidations
                                        Fields.textWoValidator   "Theme tags"    model.themeTags        (SetThemeTags    >> processMessages) [ Placeholder "enter tags"       ; MaxLength 200 ]
                                     ]                                                                                                                                    
            | RenameFolder  entry -> "Rename Folder"                                                                                                                       
                                    , ["Ok"    , "btn", doNothing
                                       "Cancel", "btn", id]                                                                                                               
                                    , [ Fields.textNotEmpty      "File Name"     model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter file name"  ; MaxLength 100 ] validations processValidations ]
            | CreateFolder       -> "Create Folder"
                                    , ["Ok"    , "btn", doNothing
                                       "Cancel", "btn", id] 
                                    , [ Fields.selectWoValidator "Parent Folder" uploadFolder           (setUploadFolder >> processMessages) (folders_()) []
                                        Fields.textNotEmpty      "Folder Name"   model.uploadName       (SetUploadName   >> processMessages) [ Placeholder "enter folder name"; MaxLength 100 ] validations processValidations
                                      ]
            | ConfirmDelete entry -> "Confirm Delete "
                                    , ["DELETE", "btn", doNothing
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
            |> fun r -> Popup.ShowPopUp(r?left, r?top) |> ToPopupMsg |> processMessages
        let reUpload = match model.lastUpload with
                        | Some upload when getFileName_() <> "" -> Input  [Type "button" ; Value <| sprintf "Re%A" upload 
                                                                           _Style [ _flex "0 0" ; newAttr "alignSelf" "flex-start"]] 
                                                                   |> OnClick (upload |> uploadFile_)
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
                                                close_    = fun () -> NoDialog |> ShowDialog |> processMessages
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
                let! entries = fetchEntries_ FileTree.init.sortBy
                let initV1 = init themeTags client entries
                let app = App.app
                            <| initV1
                            <| update
                            <| view 
                app.run container.Dom { title = title }
            } |> ARop.call




