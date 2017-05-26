namespace CIPHERPrototype1

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open Model
open Model2
open Rop

(*[<JavaScript>]
module DimensionForm2 =
    open FancyTree
    open SlickGrid

    type private ThisFormsState = {
        title              : string
        showTable          : bool
        showTree           : bool
        showRelations      : bool
        processing         : bool
        message            : string
        debug              : bool
    }

    type private GeneralInMessage =
        | SlickOut of SlickGridOutMessage
        | TreeOut  of FancyTreeOutMessage

    type private GeneralOutMessage =
        | MessageProcessor of (GeneralInMessage -> unit)

    type private SuperState = {
        formState          : ThisFormsState
        dimGridProcessorO  : (SlickGridInMessage                                                          -> unit) option
        relGridProcessorO  : (SimpleGridInMessage                                                         -> unit) option
        treeViewProcessorO : (FancyTreeInMessage                                                          -> unit) option
        generalProcessorO  : (GeneralInMessage                                                            -> unit) option
        relationsCallback  : (Result<(string * string)                                                []> -> unit) option
        itemsCallback      : (Result<obj                                                              []> -> unit) option
        saveDataCallback   : (Result<RowT[] * Column[] * int[] * string [][] * string [][] * string [][]> -> unit) option
    }

    type private Message =
        | ShowInfo      of string * bool
        | FromDimGrid   of SlickGridOutMessage
        | FromRelGrid   of SimpleGridOutMessage
        | FromTreeView  of FancyTreeOutMessage
        | FromGeneral   of GeneralOutMessage
        | ToDimGrid     of SlickGridInMessage
        | ToRelGrid     of SimpleGridInMessage
        | ToTreeView    of FancyTreeInMessage
        | ToGeneral     of GeneralInMessage
        | ToggleTable
        | ToggleTree
        | ToggleRelations
        | ToggleDebug
        | WhenReceiveRelations   of (Result<(string * string) []                                               > -> unit)
        | WhenReceiveItems       of (Result<obj               []                                               > -> unit)
        | WhenReceiveDimGridData of (Result<RowT[] * Column[] * int[] * string [][] * string [][] * string [][]> -> unit)

    let private createForm_ dimension title (container: Element) token isGuestUser = 
        let mutable globalSetState =  None
        let inline setGlobalSetState f =  match globalSetState with
                                          | None   -> globalSetState <- Some f
                                          | Some _ -> ()

        let rec updateState superState message =
            let state = superState.formState
            if state.debug then printfn "%A" message
            let setState s = 
                globalSetState |> Option.map (fun f -> f s) |> ignore
                { superState with formState = s }
            match message with
            | Message.ShowInfo(msg, p) -> setState {state with message = msg; processing = p}
            | ToDimGrid    msg -> superState.dimGridProcessorO  |> Option.iter(fun f -> msg |> f); superState
            | ToRelGrid    msg -> superState.relGridProcessorO  |> Option.iter(fun f -> msg |> f); superState
            | ToTreeView   msg -> superState.treeViewProcessorO |> Option.iter(fun f -> msg |> f); superState
            | ToGeneral    msg -> superState.generalProcessorO  |> Option.iter(fun f -> msg |> f); superState
            | FromDimGrid  msg -> match msg with
                                  | SlickGridOutMessage.ShowInfo         (a,b)  -> Message.ShowInfo(a,b) |> updateState superState
                                  | SlickGridOutMessage.MessageProcessor  f     -> {superState with dimGridProcessorO  = Some f}
                                  | SlickGridOutMessage.SlickChange _           -> msg |> GeneralInMessage.SlickOut |> ToGeneral |> updateState superState
                                  | SlickGridOutMessage.SaveData(v,c,k,d,ch,ad) -> superState.saveDataCallback |> Option.iter (fun f -> f (Rop.succeed (v,c,k,d,ch,ad))) ; {superState with saveDataCallback = None }
            | FromRelGrid  msg -> match msg with                                  
                                  | SimpleGridOutMessage.ShowInfo        (a,b)  -> Message.ShowInfo(a,b) |> updateState superState
                                  | SimpleGridOutMessage.MessageProcessor f     -> {superState with relGridProcessorO  = Some f}
                                  | Items                                 data  -> superState.itemsCallback     |> Option.iter (fun f -> f (Rop.succeed data          )) ; {superState with itemsCallback = None }
                                  | Columns                               _     -> superState
            | FromTreeView msg -> match msg with                                                                                                                        
                                  | FancyTreeOutMessage.Relations        rels   -> superState.relationsCallback |> Option.iter (fun f -> f (Rop.succeed rels          )) ; {superState with relationsCallback = None }
                                  | FancyTreeOutMessage.ShowInfo         (a,b)  -> Message.ShowInfo(a,b) |> updateState superState
                                  | FancyTreeOutMessage.MessageProcessor  f     -> {superState with treeViewProcessorO = Some f}
                                  | FancyTreeOutMessage.NodeSelected _          -> msg |> GeneralInMessage.TreeOut |> ToGeneral |> updateState superState
            | FromGeneral  msg -> match msg with                                  
                                  | GeneralOutMessage.MessageProcessor    f     -> {superState with generalProcessorO  = Some f}
            | ToggleDebug                                                         -> setState {state with debug = not state.debug}  
            | ToggleTable                                                         -> if state.showTable 
                                                                                     then setState {state with showRelations = false; showTree = true ; showTable = false}  
                                                                                     else setState {state with showRelations = false;                   showTable = true }  
            | ToggleTree                                                          -> if state.showTree 
                                                                                     then setState {state with showRelations = false; showTree = false; showTable = true }
                                                                                     else setState {state with showRelations = false; showTree = true }
            | ToggleRelations                                                     -> if state.showRelations 
                                                                                     then setState {state with showRelations = false; showTree = true }  
                                                                                     else setState {state with showRelations = true ; showTree = true ; showTable = false}
            | WhenReceiveRelations   callback                                     -> {superState with relationsCallback = Some callback }
            | WhenReceiveItems       callback                                     -> {superState with itemsCallback     = Some callback }
            | WhenReceiveDimGridData callback                                     -> {superState with saveDataCallback  = Some callback }

        let globalSetState = "not allowed to use globalSetState from here onwards"

        let initial     = { 
            ThisFormsState.title = title
            processing           = true
            message              = "Initializing..."
            showTable            = true
            showTree             = true
            showRelations        = false
            debug                = false
        }
        let superInitial = {
            formState            = initial
            dimGridProcessorO    = None
            relGridProcessorO    = None
            treeViewProcessorO   = None
            generalProcessorO    = None
            relationsCallback    = None
            itemsCallback        = None
            saveDataCallback     = None
        }
        let processMessages = 
            let processor = processorAgent superInitial updateState
            fun message -> processor.Post message

        let showProcessing txt = (txt, true ) |> Message.ShowInfo |> processMessages
        let showCompleted  txt = (txt, false) |> Message.ShowInfo |> processMessages

        let loadData_() =
            Server.call {
                showProcessing "loading..."       
                let! elements, columns, keys, rels = Server.FetchDimRelsAR_  token dimension
                let  elements                      = elements |> Array.sortBy (fun (_, _, elem_name, _, elem_order, _) -> sortOrder elem_order elem_name)
                let  childrenOf parentCode         =
                        elements
                        |> Array.choose (fun (_, elem_code, elem_name, elem_description, elem_order, _) -> 
                                        rels 
                                        |> Array.tryFind (fun (child_code, parent_code, weight, child_order) -> elem_code = child_code && parentCode = parent_code)
                                        |> Option.map    (fun (_, _, _, child_order) -> (elem_code, elem_name, elem_description) , sortOrder elem_order elem_name |> sortOrder child_order))
                        |> Array.sortBy (fun (elem, order) -> order)
                        |> Array.map    (fun (elem, order) -> elem )
                let  rec createNodes elems =
                        elems
                        |> Array.map (fun (elem_code, elem_name, elem_description) ->
                        let children = childrenOf elem_code
                        let title = elem_name + (match elem_description with 
                                                | Some s when s <> elem_name -> " - " + s
                                                |_       -> "" 
                                                )
                        {   FTNodeIn.key      = elem_code.ToString()
                            FTNodeIn.title    = title
                            FTNodeIn.tag      = strToKey elem_name
                            FTNodeIn.folder   = not (children = [||])
                            FTNodeIn.children = createNodes children
                            FTNodeIn.detail   = null
                        }
                        )
                let  topLevel =
                        elements
                        |> Array.choose (fun (_, elem_code, elem_name, elem_description, _, _) -> 
                            rels 
                            |> Array.exists (fun (child_code, _, _, _) -> elem_code = child_code) 
                            |> function 
                            | true  -> None 
                            | false -> Some (elem_code, elem_name, elem_description)
                        )
                topLevel 
                |> createNodes
                |> FancyTreeInMessage.LoadNodes |> ToTreeView |> processMessages
                let data =
                    elements
                    |> Array.map(fun (dim_code, elem_code, elem_name, elem_description, elem_order, attValues) ->
                        attValues
                        |> Array.append
                            [| box dim_code; box elem_code; box elem_name; box (elem_description |> Option.defaultV ""); box (elem_order |> Option.defaultV "")|]                                
                    )
                let rowHeader = Column (
                                      id         = "#"
                                    , name       = ""
                                    , width      = 30
                                    , selectable = true
                                    , resizable  = false
                                    , sortable   = false
                                    , focusable  = true
                                    , cssClass   = "slick-header-column"
                                )
                (data, Array.append [|rowHeader|] columns, keys) |> SlickGridInMessage.Load |> ToDimGrid |> processMessages
            }

        let treeViewGetRelationsAR () =            
            Async.FromContinuations (fun (callback, ecnt, cancel) ->
               callback |> Message.WhenReceiveRelations       |> processMessages
               FancyTreeInMessage.SendRelations |> ToTreeView |> processMessages
            )

        let dimGridGetDataAR () =            
            Async.FromContinuations (fun (callback, ecnt, cancel) ->
               callback |> Message.WhenReceiveDimGridData    |> processMessages
               SlickGridInMessage.SendData      |> ToDimGrid |> processMessages
            )

        let validateData_ (values:RowT[]) =
            Rop.flow {
                do! Rop.tryProtection()
                let keysPerRowGrouped =
                    values
                    |> Seq.mapi   (fun  i  row  -> match row with
                                                   | ExistingRow(_, vs, _) -> vs
                                                   | NewRow     (_, vs   ) -> vs
                                                   |> (fun vs -> i, unbox<string> vs.[2] |> strToKey))
                    |> Seq.groupBy (fun (i, k ) -> k)
                    |> Seq.toArray
                let undefinedKeys =
                    keysPerRowGrouped
                    |> Seq.filter (fun (k, rs) -> isUndefined k)
                    |> Seq.collect(fun (k, rs) -> rs)
                    |> Seq.map    (fun (i, k ) -> ErrUndefinedKeys(i, [|k|]))
                    |> Seq.toList
                return! if undefinedKeys.IsEmpty then
                           Rop.succeed ()
                        else
                           undefinedKeys |> Failure
                do! Rop.tryProtection()
                let duplicatedKeys = 
                    keysPerRowGrouped
                    |> Seq.filter  (fun (k, rs) -> rs |> Seq.length > 1)
                    |> Seq.collect (fun (k, rs) -> rs)
                    |> Seq.map     (fun (i, k ) -> ErrDuplicatedKeys(i, [| k |]))
                    |> Seq.toList
                return! if duplicatedKeys.IsEmpty then
                           Rop.succeed ()
                        else
                           duplicatedKeys |> Failure
            }
        
        let saveData_ () = 
            Server.callR (Rop.messagesDo (fun failed ms -> if failed then sprintf "%A" ms |> showCompleted))
                {
                showProcessing "Saving..."       
                let! relations         = treeViewGetRelationsAR()
                let! v,c,k,d,ch,ad     = dimGridGetDataAR()
                do!  validateData_ v
                let! guest, (response, data)    = Server.SaveRelsDataAR_ token dimension (d,ch,ad) relations
                data |> SlickGridInMessage.Saved |> ToDimGrid |> processMessages
                showCompleted response //([| 0; 1; 2; 3; 4|] |> Seq.mapi(fun i v -> i, v) |> Seq.groupBy(fun (i,v) -> v) |> Seq.toArray |> sprintf "%A")
            }

        let relGridGetRelationsAR_ () =            
            Async.FromContinuations (fun (callback, ecnt, cancel) ->
               callback |> Message.WhenReceiveItems       |> processMessages
               SimpleGridInMessage.SendItems |> ToRelGrid |> processMessages
            )

        let relGridApply_      () = 
            Server.call {
                showProcessing "Applying..."
                let! data = relGridGetRelationsAR_()
                data 
                |> Array.map(fun obj -> unbox obj)
                |> Array.map(fun (rel: ParentChild) -> strToKey rel.child, strToKey rel.parent)
                |> ApplyRelations |> ToTreeView |> processMessages
                showCompleted ""
            } 


        let aGet  (i: int) (vs: FieldValues) = if vs.Length <= i then "" else (vs.[i] |> fun v -> if isUndefined(v) then "" else unbox v)
        let iKey  (i: int)                   = "i:" + i.ToString()
        let vsName         (vs: FieldValues) = strToKey (aGet 2 vs)
        let vsTitle        (vs: FieldValues) = (aGet 2 vs) + " - " + (aGet 3 vs)
        let nodeI (i: int) (vs: FieldValues) = (iKey i, vsTitle vs, vsName vs)
        let processGeneralInMessages (msg: GeneralInMessage) =
            Rop.flow {
                do! Rop.tryProtection()
                match msg with
                | GeneralInMessage.SlickOut(SlickGridOutMessage.SlickChange(change))           ->
                    match change with                           
                    | Change.DeleteRow(ExistingKey ks)         when ks.Length = 1 -> unbox ks.[0] 
                                                                                     |> FancyTreeInMessage.DeleteNode 
                                                                                     |> ToTreeView |> processMessages
                    | Change.DeleteRow(NewKey      i )                            -> iKey i
                                                                                     |> FancyTreeInMessage.DeleteNode 
                                                                                     |> ToTreeView |> processMessages
                    | Change.ChangeRow(ExistingRow(ks, vs, _)) when ks.Length = 1 -> (unbox<string> ks.[0], vsTitle vs, vsName vs)
                                                                                     |> FancyTreeInMessage.SetTitle
                                                                                     |> ToTreeView |> processMessages
                    | Change.ChangeRow(NewRow     (i , vs   ))                    -> nodeI i vs
                                                                                     |> FancyTreeInMessage.SetTitle
                                                                                     |> ToTreeView |> processMessages
                    | Change.AddRow   (n, vs)                                     -> nodeI n vs
                                                                                     |> FancyTreeInMessage.AddNode
                                                                                     |> ToTreeView |> processMessages
                    | Change.DataSaved addedRows                                  -> addedRows
                                                                                     |> Array.map(fun vs ->
                                                                                     unbox<string> vs.[1], vsTitle vs, vsName vs)
                                                                                     |> FancyTreeInMessage.Saved
                                                                                     |> ToTreeView |> processMessages
                    | Change.RowSelected row                                      -> match row with
                                                                                     | ExistingRow(ks , _, _) -> unbox<string> ks.[0] 
                                                                                     | NewRow     (key, _   ) -> iKey key
                                                                                     |> FancyTreeInMessage.SelectNode
                                                                                     |> ToTreeView |> processMessages
                    | _                                                           -> ()
                | GeneralInMessage.SlickOut(_)                                    -> ()
                | GeneralInMessage.TreeOut(FancyTreeOutMessage.NodeSelected(node))-> if node.key.StartsWith("i:")
                                                                                     then node.key.[2..] |> System.Int32.Parse |> NewKey
                                                                                     else [| node.key :> KeyValue |] |> ExistingKey
                                                                                     |> SlickGridInMessage.SelectRow |> ToDimGrid |> processMessages
                | GeneralInMessage.TreeOut(_)                                     -> ()

            } |> Rop.notifyMessages

        processGeneralInMessages 
        |> GeneralOutMessage.MessageProcessor |> FromGeneral                    |> processMessages                    

        let toggleRelations_   () = ToggleRelations                             |> processMessages
        let toggleTable_       () = ToggleTable                                 |> processMessages  
        let toggleTree_        () = ToggleTree                                  |> processMessages
        let toggleDebug_       () = ToggleDebug                                 |> processMessages
        let relGridClear_      () = SimpleGridInMessage.Clear     |> ToRelGrid  |> processMessages
        let dimGridClear_      () = SlickGridInMessage.Clear      |> ToDimGrid  |> processMessages
                                    FancyTreeInMessage.DataClear  |> ToTreeView |> processMessages
        let dimGridLoad_       () = loadData_()
        let dimGridSave_       () = saveData_()
        let flattenHierarchy_  () = FlattenHierarchy              |> ToTreeView |> processMessages
        let dimUpdateDimension_() = 
            Server.call {
                showProcessing "Updating the model..."
                let! result = Server.UpdateOLAPDimensionAR_ token dimension
                showCompleted result
            } 

        let columns = 
            [|  Column (
                      id         =  "#"
                    , name       =  ""
                    , width      = 30
                    , selectable = false
                    , resizable  = false
                    , sortable   = false
                    , focusable  = false
                    , cssClass   = "slick-header-column"
//                    , field      = ("child"  :> obj)
//                    , editor     = Slick.Editors.Text
                )
                Column (
                      id        =  "child"
                    , name      =  "child"
                    , field     = ("child"  :> obj)
                    , editor    = Slick.Editors.Text
                )
                Column (
                      id        =  "parent"
                    , name      =  "parent"
                    , field     = ("parent" :> obj)
                    , editor    = Slick.Editors.Text
                )
            |]

        let processDimGridMessages  (msg: SlickGridOutMessage ) = msg |> FromDimGrid  |> processMessages
        let processRelGridMessages  (msg: SimpleGridOutMessage) = msg |> FromRelGrid  |> processMessages
        let processTreeViewMessages (msg: FancyTreeOutMessage ) = msg |> FromTreeView |> processMessages 

        let dimGridClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                let dimDataView = SlickGrid.DataView(Some processDimGridMessages)
                dimDataView.createGrid dimDataView container 
            )


        let relGridClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                let createNew (item:obj) (id:int) = box id, item |> unbox<ParentChild> |> box
                SlickGrid.SimpleGrid columns [||] createNew (Some processRelGridMessages) container
                |> Rop.notifyMessages
            )

        let treeViewClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                FancyTree.createFancyTree container None [||] (Some processTreeViewMessages)
            )

        let renderForm (state: ThisFormsState) (setState: ThisFormsState -> unit) =
            setGlobalSetState setState
            let setState = "not allowed to use setState from here onwards"
            let disabled = state.processing || isGuestUser
            R.E               ("div"          , Attrs (className= "panel panel-info flex flexgrow" )
                , R.E         ("div"          , Attrs (className= "panel-heading heading"          )
                    , R.E     ("label"        , Attrs (className= "panel-title text-center"        )
                        , R.t state.title
                    )
                    , ClientForm.validationMsg state.message
                    , R.E     ("div"          , Attrs (className= "btn-toolbar pull-right" )
                        , R.E     ("button"       , Attrs (className= "btn-xs btn-default  pull-right", disabled = disabled, onClick = toggleDebug_ ), R.t ".")
                        , R.E     ("button"       , Attrs (className= "btn btn-default  pull-right"   , disabled = disabled, onClick = dimUpdateDimension_ ), R.t "Update model")
                        , R.E     ("div"          , Attrs (className= "btn-group pull-right" )
                            , R.E ("button"       , Attrs (className= "btn btn-default"      , disabled = disabled, onClick = flattenHierarchy_), R.t "flatten hierarchy")
                        )                         
                        , R.E     ("div"          , Attrs (className= "btn-group pull-right" )
                            , R.E ("button"       , Attrs (className= "btn btn-default"      , disabled = disabled, onClick = dimGridSave_ ), R.t "save"      )
                            , R.E ("button"       , Attrs (className= "btn btn-default"      , disabled = disabled, onClick = dimGridClear_), R.t "remove all")
                            , R.E ("button"       , Attrs (className= "btn btn-default"      , disabled = disabled, onClick = dimGridLoad_ ), R.t "reload"    )
                        )
                        , R.E     ("div"          , Attrs (className= "btn-group pull-right" )
                            , R.E ("button"       , Attrs (className= ("btn btn-" + if state.showTable then "info" else "default"),  onClick = toggleTable_     ), R.t "TABLE"    )
                            , R.E ("button"       , Attrs (className= ("btn btn-" + if state.showTree  then "info" else "default"),  onClick = toggleTree_      ), R.t "TREE"      )
                            , R.E ("button"       , Attrs (className= ("btn btn-" + if state.showRelations then "info" else "default"), disabled = disabled, onClick = toggleRelations_ ), R.t "import hierarchy")
                        )                         
                    )
                )
                , R.E         ("div"          , Attrs (className = "flex-row flexgrow")
                    , R.E     ("div"          , Attrs (className= ("flex flexgrow" + if state.showTable then "" else " hidden"), style = JSON.Parse("""{"flex": "1"}"""))
                        , R.E (dimGridClass )
                    )
                    , R.E     (     "div"          , Attrs (className= ("flex flexgrow" + if state.showTree then "" else " hidden"), style = JSON.Parse("""{"flex": "1"}"""))
                        , R.E (treeViewClass) 
                    )
                    , R.E     (     "div"          , Attrs (className= ("panel panel-info flex flexgrow" + if state.showRelations then "" else " hidden"), style = JSON.Parse("""{"flex": "1"}"""))
                        , R.E ( "div"          , Attrs (className= "panel-heading"                   )
                            , R.E("label"     , Attrs (className= "panel-title text-center"         )
                                , R.t "Paste relations here (ctrl-v):   "
                                , R.E("div"       , Attrs (className= "btn-group pull-right")
                                    , R.E("button", Attrs (className= "btn btn-default"      , disabled = disabled, onClick = relGridClear_ ), R.t "clear"    )
                                    , R.E("button", Attrs (className= "btn btn-default"      , disabled = disabled, onClick = relGridApply_ ), R.t "apply"    )
                                )
                            )
                        )
                        , R.E (relGridClass )
                    )
                )
            )

        loadData_()
        ClientForm.reactRoot2 initial container.Dom renderForm

    let dimensionForm_ (dimension: Dimension) title isGuestUser =
        Browser.withContainerDo "flex flexgrow" (fun container ->
            Server.call { 
                let! token = Server.fetchTokenAR_()
                createForm_ dimension title container token isGuestUser
            }
        ) *)

[<JavaScript>]
module DimensionForm =
    open FancyTree
    open SlickGrid

    type GeneralInMessage =
        | SlickOut of SlickGridOutMessage
        | TreeOut  of FancyTreeOutMessage

    type GeneralOutMessage =
        | MessageProcessor of (GeneralInMessage -> unit)

    type Model = {
        form               : GenForm.Model
        dialog             : Dialog.Model
        popup              : Popup.Model
        showTable          : bool
        showTree           : bool
        showRelations      : bool
        isGuestUser        : bool
        dimGridProcessorO  : (SlickGridInMessage                                                          -> unit) option
        relGridProcessorO  : (SimpleGridInMessage                                                         -> unit) option
        treeViewProcessorO : (FancyTreeInMessage                                                          -> unit) option
        generalProcessorO  : (GeneralInMessage                                                            -> unit) option
        relationsCallback  : (Result<(string * string)                                                []> -> unit) option
        itemsCallback      : (Result<obj                                                              []> -> unit) option
        saveDataCallback   : (Result<RowT[] * Column[] * int[] * string [][] * string [][] * string [][]> -> unit) option
    }

    let init title isGuestUser = {
        form               = GenForm.init title
        dialog             = Dialog.init
        popup              = Popup.init
        showTable          = true
        showTree           = true
        showRelations      = false
        isGuestUser        = isGuestUser
        dimGridProcessorO  = None
        relGridProcessorO  = None
        treeViewProcessorO = None
        generalProcessorO  = None
        relationsCallback  = None
        itemsCallback      = None
        saveDataCallback   = None
    }

    type Message =
        | ToFormMsg     of GenForm.Message
        | ToDialogMsg   of Dialog.Message
        | ToPopupMsg    of Popup.Message
        | FromDimGrid   of SlickGridOutMessage
        | FromRelGrid   of SimpleGridOutMessage
        | FromTreeView  of FancyTreeOutMessage
        | FromGeneral   of GeneralOutMessage
        | ToDimGrid     of SlickGridInMessage
        | ToRelGrid     of SimpleGridInMessage
        | ToTreeView    of FancyTreeInMessage
        | ToGeneral     of GeneralInMessage
        | ToggleTable
        | ToggleTree
        | ToggleRelations
        | WhenReceiveRelations   of (Result<(string * string) []                                               > -> unit)
        | WhenReceiveItems       of (Result<obj               []                                               > -> unit)
        | WhenReceiveDimGridData of (Result<RowT[] * Column[] * int[] * string [][] * string [][] * string [][]> -> unit)

    let rec update message model =
        if model.form.debug then printfn "%A" message
        match message with
        | ToFormMsg    msg -> {model with form   = GenForm.update msg model.form  }
        | ToPopupMsg   msg -> {model with popup  = Popup.update   msg model.popup }
        | ToDialogMsg  msg -> {model with dialog = Dialog.update  msg model.dialog}
        | ToDimGrid    msg -> model.dimGridProcessorO  |> Option.iter(fun f -> msg |> f); model
        | ToRelGrid    msg -> model.relGridProcessorO  |> Option.iter(fun f -> msg |> f); model
        | ToTreeView   msg -> model.treeViewProcessorO |> Option.iter(fun f -> msg |> f); model
        | ToGeneral    msg -> model.generalProcessorO  |> Option.iter(fun f -> msg |> f); model
        | FromDimGrid  msg -> match msg with
                                | SlickGridOutMessage.ShowInfo         (a,b)  -> GenForm.ShowInfo(a,b) |> ToFormMsg |> update <| model
                                | SlickGridOutMessage.MessageProcessor  f     -> {model with dimGridProcessorO  = Some f}
                                | SlickGridOutMessage.SlickChange _           -> msg |> GeneralInMessage.SlickOut |> ToGeneral |> update <| model
                                | SlickGridOutMessage.SaveData(v,c,k,d,ch,ad) -> model.saveDataCallback |> Option.iter (fun f -> f (Rop.succeed (v,c,k,d,ch,ad))) ; {model with saveDataCallback = None }
        | FromRelGrid  msg -> match msg with                                  
                                | SimpleGridOutMessage.ShowInfo        (a,b)  -> GenForm.ShowInfo(a,b) |> ToFormMsg |> update <| model
                                | SimpleGridOutMessage.MessageProcessor f     -> {model with relGridProcessorO  = Some f}
                                | Items                                 data  -> model.itemsCallback     |> Option.iter (fun f -> f (Rop.succeed data          )) ; {model with itemsCallback = None }
                                | Columns                               _     -> model
        | FromTreeView msg -> match msg with                                                                                                                        
                                | FancyTreeOutMessage.ShowInfo         (a,b)  -> GenForm.ShowInfo(a,b) |> ToFormMsg |> update <| model
                                | FancyTreeOutMessage.Relations        rels   -> model.relationsCallback |> Option.iter (fun f -> f (Rop.succeed rels          )) ; {model with relationsCallback = None }
                                | FancyTreeOutMessage.MessageProcessor  f     -> {model with treeViewProcessorO = Some f}
                                | FancyTreeOutMessage.NodeSelected _          -> msg |> GeneralInMessage.TreeOut |> ToGeneral |> update <| model
        | FromGeneral  msg -> match msg with                                  
                                | GeneralOutMessage.MessageProcessor    f     -> {model with generalProcessorO  = Some f}
        | ToggleTable                                                         -> if model.showTable 
                                                                                    then {model with showRelations = false; showTree = true ; showTable = false}  
                                                                                    else {model with showRelations = false;                   showTable = true }  
        | ToggleTree                                                          -> if model.showTree 
                                                                                    then {model with showRelations = false; showTree = false; showTable = true }
                                                                                    else {model with showRelations = false; showTree = true }
        | ToggleRelations                                                     -> if model.showRelations 
                                                                                    then {model with showRelations = false; showTree = true }  
                                                                                    else {model with showRelations = true ; showTree = true ; showTable = false}
        | WhenReceiveRelations   callback                                     -> {model with relationsCallback = Some callback }
        | WhenReceiveItems       callback                                     -> {model with itemsCallback     = Some callback }
        | WhenReceiveDimGridData callback                                     -> {model with saveDataCallback  = Some callback }

    open ReactHtml

    let runApp_ (token: Auth.Token) (dimension: Dimension) container initModel =
        let mutable globalProcessor: (Message -> unit) option = None
        let setGlobalProcessor_ processMsg = match globalProcessor with | None -> globalProcessor <- processMsg | _    -> ()
        let processMessages msg = globalProcessor |> Option.map (fun f -> f msg) |> ignore

        let showProcessing txt = (txt, true ) |> GenForm.Message.ShowInfo |> ToFormMsg |> processMessages
        let showCompleted  txt = (txt, false) |> GenForm.Message.ShowInfo |> ToFormMsg |> processMessages

        let loadData_() =
            Server.call {
                showProcessing "loading..."       
                let! elements, columns, keys, rels = Server.FetchDimRelsAR_  token dimension
                let  elements                      = elements |> Array.sortBy (fun (_, _, elem_name, _, elem_order, _) -> sortOrder elem_order elem_name)
                let  childrenOf parentCode         =
                        elements
                        |> Array.choose (fun (_, elem_code, elem_name, elem_description, elem_order, _) -> 
                                        rels 
                                        |> Array.tryFind (fun (child_code, parent_code, weight, child_order) -> elem_code = child_code && parentCode = parent_code)
                                        |> Option.map    (fun (_, _, _, child_order) -> (elem_code, elem_name, elem_description) , sortOrder elem_order elem_name |> sortOrder child_order))
                        |> Array.sortBy (fun (elem, order) -> order)
                        |> Array.map    (fun (elem, order) -> elem )
                let  rec createNodes elems =
                        elems
                        |> Array.map (fun (elem_code, elem_name, elem_description) ->
                        let children = childrenOf elem_code
                        let title = elem_name + (match elem_description with 
                                                | Some s when s <> elem_name -> " - " + s
                                                |_       -> "" 
                                                )
                        {   FTNodeIn.key      = elem_code.ToString()
                            FTNodeIn.title    = title
                            FTNodeIn.tag      = strToKey elem_name
                            FTNodeIn.folder   = not (children = [||])
                            FTNodeIn.children = createNodes children
                            FTNodeIn.detail   = null
                        }
                        )
                let  topLevel =
                        elements
                        |> Array.choose (fun (_, elem_code, elem_name, elem_description, _, _) -> 
                            rels 
                            |> Array.exists (fun (child_code, _, _, _) -> elem_code = child_code) 
                            |> function 
                            | true  -> None 
                            | false -> Some (elem_code, elem_name, elem_description)
                        )
                topLevel 
                |> createNodes
                |> FancyTreeInMessage.LoadNodes |> ToTreeView |> processMessages
                let data =
                    elements
                    |> Array.map(fun (dim_code, elem_code, elem_name, elem_description, elem_order, attValues) ->
                        attValues
                        |> Array.append
                            [| box dim_code; box elem_code; box elem_name; box (elem_description |> Option.defaultV ""); box (elem_order |> Option.defaultV "")|]                                
                    )
                let rowHeader = Column (
                                      id         = "#"
                                    , name       = ""
                                    , width      = 30
                                    , selectable = true
                                    , resizable  = false
                                    , sortable   = false
                                    , focusable  = true
                                    , cssClass   = "slick-header-column"
                                )
                (data, Array.append [|rowHeader|] columns, keys) |> SlickGridInMessage.Load |> ToDimGrid |> processMessages
                GenForm.SetModified false |> ToFormMsg |> processMessages
            }

        let treeViewGetRelationsAR () =            
            Async.FromContinuations (fun (callback, ecnt, cancel) ->
               callback |> Message.WhenReceiveRelations       |> processMessages
               FancyTreeInMessage.SendRelations |> ToTreeView |> processMessages
            )

        let dimGridGetDataAR () =            
            Async.FromContinuations (fun (callback, ecnt, cancel) ->
               callback |> Message.WhenReceiveDimGridData    |> processMessages
               SlickGridInMessage.SendData      |> ToDimGrid |> processMessages
            )

        let validateData_ (values:RowT[]) =
            Rop.flow {
                do! Rop.tryProtection()
                let keysPerRowGrouped =
                    values
                    |> Seq.mapi   (fun  i  row  -> match row with
                                                   | ExistingRow(_, vs, _) -> vs
                                                   | NewRow     (_, vs   ) -> vs
                                                   |> (fun vs -> i, unbox<string> vs.[2] |> strToKey))
                    |> Seq.groupBy (fun (i, k ) -> k)
                    |> Seq.toArray
                let undefinedKeys =
                    keysPerRowGrouped
                    |> Seq.filter (fun (k, rs) -> isUndefined k)
                    |> Seq.collect(fun (k, rs) -> rs)
                    |> Seq.map    (fun (i, k ) -> ErrUndefinedKeys(i, [|k|]))
                    |> Seq.toList
                return! if undefinedKeys.IsEmpty then
                           Rop.succeed ()
                        else
                           undefinedKeys |> Failure
                do! Rop.tryProtection()
                let duplicatedKeys = 
                    keysPerRowGrouped
                    |> Seq.filter  (fun (k, rs) -> rs |> Seq.length > 1)
                    |> Seq.collect (fun (k, rs) -> rs)
                    |> Seq.map     (fun (i, k ) -> ErrDuplicatedKeys(i, [| k |]))
                    |> Seq.toList
                return! if duplicatedKeys.IsEmpty then
                           Rop.succeed ()
                        else
                           duplicatedKeys |> Failure
            }
        
        let saveData_ () = 
            Server.callR (Rop.messagesDo (fun failed ms -> if failed then sprintf "%A" ms |> showCompleted))
                {
                showProcessing "Saving..."       
                let! relations         = treeViewGetRelationsAR()
                let! v,c,k,d,ch,ad     = dimGridGetDataAR()
                do!  validateData_ v
                let! guest, (response, data)    = Server.SaveRelsDataAR_ token dimension (d,ch,ad) relations
                data |> SlickGridInMessage.Saved |> ToDimGrid |> processMessages
                GenForm.SetModified false |> ToFormMsg |> processMessages
                showCompleted response //([| 0; 1; 2; 3; 4|] |> Seq.mapi(fun i v -> i, v) |> Seq.groupBy(fun (i,v) -> v) |> Seq.toArray |> sprintf "%A")
            }

        let relGridGetRelationsAR_ () =            
            Async.FromContinuations (fun (callback, ecnt, cancel) ->
               callback |> Message.WhenReceiveItems       |> processMessages
               SimpleGridInMessage.SendItems |> ToRelGrid |> processMessages
            )

        let relGridApply_      () = 
            Server.call {
                showProcessing "Applying..."
                let! data = relGridGetRelationsAR_()
                data 
                |> Array.map(fun obj -> unbox obj)
                |> Array.map(fun (rel: ParentChild) -> strToKey rel.child, strToKey rel.parent)
                |> ApplyRelations |> ToTreeView |> processMessages
                showCompleted ""
                GenForm.SetModified true |> ToFormMsg |> processMessages
            } 


        let aGet  (i: int) (vs: FieldValues) = if vs.Length <= i then "" else (vs.[i] |> fun v -> if isUndefined(v) then "" else unbox v)
        let iKey  (i: int)                   = "i:" + i.ToString()
        let vsName         (vs: FieldValues) = strToKey (aGet 2 vs)
        let vsTitle        (vs: FieldValues) = (aGet 2 vs) + " - " + (aGet 3 vs)
        let nodeI (i: int) (vs: FieldValues) = (iKey i, vsTitle vs, vsName vs)
        let processGeneralInMessages (msg: GeneralInMessage) =
            Rop.flow {
                do! Rop.tryProtection()
                match msg with
                | GeneralInMessage.SlickOut(SlickGridOutMessage.SlickChange(change))           ->
                    match change with                           
                    | Change.DeleteRow(ExistingKey ks)         when ks.Length = 1 -> unbox ks.[0] 
                                                                                     |> FancyTreeInMessage.DeleteNode 
                                                                                     |> ToTreeView |> processMessages
                                                                                     GenForm.SetModified true |> ToFormMsg |> processMessages
                    | Change.DeleteRow(NewKey      i )                            -> iKey i
                                                                                     |> FancyTreeInMessage.DeleteNode 
                                                                                     |> ToTreeView |> processMessages
                                                                                     GenForm.SetModified true |> ToFormMsg |> processMessages
                    | Change.ChangeRow(ExistingRow(ks, vs, _)) when ks.Length = 1 -> (unbox<string> ks.[0], vsTitle vs, vsName vs)
                                                                                     |> FancyTreeInMessage.SetTitle
                                                                                     |> ToTreeView |> processMessages
                                                                                     GenForm.SetModified true |> ToFormMsg |> processMessages
                    | Change.ChangeRow(NewRow     (i , vs   ))                    -> nodeI i vs
                                                                                     |> FancyTreeInMessage.SetTitle
                                                                                     |> ToTreeView |> processMessages
                                                                                     GenForm.SetModified true |> ToFormMsg |> processMessages
                    | Change.AddRow   (n, vs)                                     -> nodeI n vs
                                                                                     |> FancyTreeInMessage.AddNode
                                                                                     |> ToTreeView |> processMessages
                                                                                     GenForm.SetModified true |> ToFormMsg |> processMessages
                    | Change.DataSaved addedRows                                  -> addedRows
                                                                                     |> Array.map(fun vs ->
                                                                                     unbox<string> vs.[1], vsTitle vs, vsName vs)
                                                                                     |> FancyTreeInMessage.Saved
                                                                                     |> ToTreeView |> processMessages
                    | Change.RowSelected row                                      -> match row with
                                                                                     | ExistingRow(ks , _, _) -> unbox<string> ks.[0] 
                                                                                     | NewRow     (key, _   ) -> iKey key
                                                                                     |> FancyTreeInMessage.SelectNode
                                                                                     |> ToTreeView |> processMessages
                    | _                                                           -> ()
                | GeneralInMessage.SlickOut(_)                                    -> ()
                | GeneralInMessage.TreeOut(FancyTreeOutMessage.NodeSelected(node))-> if node.key.StartsWith("i:")
                                                                                     then node.key.[2..] |> System.Int32.Parse |> NewKey
                                                                                     else [| node.key :> KeyValue |] |> ExistingKey
                                                                                     |> SlickGridInMessage.SelectRow |> ToDimGrid |> processMessages
                | GeneralInMessage.TreeOut(_)                                     -> ()

            } |> Rop.notifyMessages


        let toggleRelations_   () = ToggleRelations                             |> processMessages
        let toggleTable_       () = ToggleTable                                 |> processMessages  
        let toggleTree_        () = ToggleTree                                  |> processMessages
        let relGridClear_      () = SimpleGridInMessage.Clear     |> ToRelGrid  |> processMessages
        let dimGridClear_      () = SlickGridInMessage.Clear      |> ToDimGrid  |> processMessages
                                    FancyTreeInMessage.DataClear  |> ToTreeView |> processMessages
                                    GenForm.SetModified true      |> ToFormMsg  |> processMessages
        let dimGridLoad_       () = loadData_()
        let dimGridSave_       () = saveData_()
        let flattenHierarchy_  () = FlattenHierarchy              |> ToTreeView |> processMessages
                                    GenForm.SetModified true      |> ToFormMsg  |> processMessages

        let dimUpdateDimension_() = 
            Server.call {
                showProcessing "Updating the model..."
                let! result = Server.UpdateOLAPDimensionAR_ token dimension
                showCompleted result
            } 

        let columns = 
            [|  Column (
                      id         =  "#"
                    , name       =  ""
                    , width      = 30
                    , selectable = false
                    , resizable  = false
                    , sortable   = false
                    , focusable  = false
                    , cssClass   = "slick-header-column"
//                    , field      = ("child"  :> obj)
//                    , editor     = Slick.Editors.Text
                )
                Column (
                      id        =  "child"
                    , name      =  "child"
                    , field     = ("child"  :> obj)
                    , editor    = Slick.Editors.Text
                )
                Column (
                      id        =  "parent"
                    , name      =  "parent"
                    , field     = ("parent" :> obj)
                    , editor    = Slick.Editors.Text
                )
            |]

        let processDimGridMessages  (msg: SlickGridOutMessage ) = msg |> FromDimGrid  |> processMessages
        let processRelGridMessages  (msg: SimpleGridOutMessage) = msg |> FromRelGrid  |> processMessages
        let processTreeViewMessages (msg: FancyTreeOutMessage ) = msg |> FromTreeView |> processMessages 

        let dimGridClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                let dimDataView = SlickGrid.DataView(Some processDimGridMessages)
                dimDataView.createGrid dimDataView container 
            )


        let relGridClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                let createNew (item:obj) (id:int) = box id, item |> unbox<ParentChild> |> box
                SlickGrid.SimpleGrid columns [||] createNew (Some processRelGridMessages) container
                |> Rop.notifyMessages
            )

        let treeViewClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                FancyTree.createFancyTree container None [||] (Some processTreeViewMessages)
            )

        let view (model: Model) processMessages =
            setGlobalProcessor_ (Some processMessages)
            let disabled = model.form.processing || model.isGuestUser
            GenForm.view 
                            [ "Update model"     , "btn btn-default"      , if disabled then id else dimUpdateDimension_
                              "flatten hierarchy", "btn btn-default"      , if disabled then id else flattenHierarchy_
                              "save"             , "btn btn-default"      , if disabled then id else dimGridSave_ 
                              "remove all"       , "btn btn-default"      , if disabled then id else dimGridClear_
                              "reload"           , "btn btn-default"      , if disabled then id else dimGridLoad_ 
                              "TABLE"            , ("btn btn-" + if model.showTable then "info" else "default"),  toggleTable_
                              "TREE"             , ("btn btn-" + if model.showTree  then "info" else "default"),  toggleTree_ 
                              "import hierarchy" , ("btn btn-" + if model.showRelations then "info" else "default"), if disabled then id else toggleRelations_
                            ]
                    [ Dialog.view "title" [] [] <| model.dialog <| (fun msg -> msg |> ToDialogMsg |> processMessages)
                      Popup.view ["-", id] <| model.popup <| (fun msg -> msg |> ToPopupMsg |> processMessages)
                      Div [ Class "flex-row flexgrow"
                            Div [ Class <| "flex flexgrow" + if model.showTable then "" else " hidden"
                                  Style <| JSON.Parse """{"flex": "1"}"""
                                  ReactObj dimGridClass 
                                ]
                            Div [ Class <| "flex flexgrow" + if model.showTree then "" else " hidden"
                                  Style <| JSON.Parse """{"flex": "1"}"""
                                  ReactObj treeViewClass
                                ]
                            Div [ Class <| "panel panel-info flex flexgrow" + if model.showRelations then "" else " hidden"
                                  Style <| JSON.Parse """{"flex": "1"}"""
                                  Div [ Class "panel-heading"
                                        Label [ Class "panel-title text-center"
                                                NText "Paste relations here (ctrl-v):   "
                                                Div [ Class "btn-group pull-right"
                                                      Button [ Class "btn btn-default"; Disabled model.form.processing ; NText "clear" ] |> OnClick relGridClear_
                                                      Button [ Class "btn btn-default"; Disabled model.form.processing ; NText "apply" ] |> OnClick relGridApply_
                                                    ]
                                              ]
                                       ]
                                  ReactObj relGridClass 
                              ]
                          ]
                      ]
            <| model.form <| (fun msg -> msg |> ToFormMsg |> processMessages)
        
        let initModel' = processGeneralInMessages |> GeneralOutMessage.MessageProcessor |> FromGeneral
                         |> update <| initModel

        App.app
            <| initModel'
            <| update
            <| view 
        |> App.run container
        loadData_()

    let dimensionForm_ (dimension: Dimension) title isGuestUser =
        Browser.withContainerDo "flex flexgrow" (fun container ->
            Server.call { 
                let! token  = Server.fetchTokenAR_()
                init title isGuestUser
                |> runApp_ token dimension container.Dom 
            }
        )
