namespace CIPHERPrototype1
open Model

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open Rop
open RopJS

type JSEventObj  () =
    [< DefaultValue                               >]          val mutable ctrlKey : bool
    [< DefaultValue                               >]          val mutable altKey  : bool
    [< DefaultValue                               >]          val mutable key     : string
    [< DefaultValue                               >]          val mutable which   : int

type JSEventArg  () =
    [< DefaultValue                               >]          val mutable item  : FieldValues
    [< DefaultValue                               >]          val mutable rows  : int[]
    [< DefaultValue                               >]          val mutable row   : int
    [< DefaultValue                               >]          val mutable cell  : int

type JSEventCallback = FuncWithArgs<JSEventObj * JSEventArg, unit>
                                                                                         
type JSEvent     () =
    [< JavaScript;                                            >]         member this.subscribe         (f: JSEventCallback)  = ()
    [< JavaScript; Inline "$obj.addEventListener($event, $f)" >]  static member      addEventListener  (obj:obj, event:string, f: obj)  = ()

module Slick =
    [< Sealed >]
    type GridLoader() =
        inherit WebSharper.Core.Resources.BaseResource("/"
            , "Resources/SlickGrid-2.2.6/lib/jquery-ui-1.11.3.min.js"
            , "Resources/SlickGrid-2.2.6/lib/jquery.event.drag-2.2.js"
            , "Resources/SlickGrid-2.2.6/slick.core.js"
            , "Resources/SlickGrid-2.2.6/slick.grid.js"
            , "Resources/SlickGrid-2.2.6/slick.editors.js"
            , "Resources/SlickGrid-2.2.6/slick.formatters.js"
            , "Resources/SlickGrid-2.2.6/slick.dataview.js"
            , "Resources/SlickGrid-2.2.6/plugins/slick.cellexternalcopymanager.js"
            , "Resources/SlickGrid-2.2.6/plugins/slick.cellselectionmodel.js"
            , "Resources/SlickGrid-2.2.6/plugins/slick.cellrangedecorator.js"
            , "Resources/SlickGrid-2.2.6/plugins/slick.cellrangeselector.js"
            , "Resources/SlickGrid-2.2.6/plugins/slick.rowselectionmodel.js"
            , "Resources/slick.autocolumnsize.js" 
            , "Resources/jquery-resize.js" 
             
            , "Resources/SlickGrid-2.2.6/slick.grid.css"
            , "Resources/SlickGrid-2.2.6/css/editors.css"
//          , "Resources/SlickGrid-2.2.6/css/smoothness/jquery-ui-1.11.3.custom.min.css"
            )

    type GridOptions = {
            enableColumnReorder  : bool
            enableCellNavigation : bool
            editable             : bool
            enableAddRow         : bool
            autoEdit             : bool
            syncColumnCellResize : bool
            headerRowHeight      : int
         }

    type DataViewOptions = {
            inlineFilters        : bool
         }

    type DataView  [< JavaScript ; Inline "new Slick.Data.DataView($options)" >]                  (options)            =
        [< JavaScript; Inline "$0.beginUpdate()"        >]          member this.beginUpdate       ()                   = ()
        [< JavaScript; Inline "$0.endUpdate()"          >]          member this.endUpdate         ()                   = ()
        [< JavaScript; Inline "$0.setItems($data, 0)"   >]          member this.setItems          (data: obj [][])     = ()
        [< JavaScript; Inline "$0.addItem($item)"       >]          member this.addItem           (item: obj)          = ()
        [< JavaScript; Inline "$0.deleteItem($id)"      >]          member this.deleteItem        (id: obj)            = ()
        [< JavaScript; Inline "$0.getLength()"          >]          member this.getLength         ()                   = 0
        [< JavaScript; Inline "$0.getItems()"           >]          member this.getItems          () : obj [][]        = X<_>
        [< JavaScript; Inline "$0.mapRowsToIds($rows)"  >]          member this.mapRowsToIds    (rows: int []) : obj[] = [| |]
        [< DefaultValue                                 >]          val mutable onRowCountChanged : JSEvent
        [< DefaultValue                                 >]          val mutable onRowsChanged     : JSEvent

    type AutoColumnSize          [< JavaScript ; Inline "new Slick.AutoColumnSize(500)"       >]  ()                   =
        [< JavaScript; Inline "$0.resizeAllColumns()"   >]          member this.resizeAllColumns  ()                   = ()        
                                                                                               
    type CellExternalCopyManager [< JavaScript ; Inline "new Slick.CellExternalCopyManager()" >]  ()                   =
        [< JavaScript; Inline "$0.xxx()"                >]          member this.xxx               ()                   = ()        
                                                                                               
    type RowSelectionModel       [< JavaScript ; Inline "new Slick.RowSelectionModel()"       >]  ()                   =
        [< JavaScript; Inline "$0.xxx()"                >]          member this.xxx               ()                   = ()        

    type CellSelectionModel      [< JavaScript ; Inline "new Slick.CellSelectionModel()"      >]  ()                   =
        [< JavaScript; Inline "$0.xxx()"                >]          member this.xxx               ()                   = ()        

    [< Require(typeof<GridLoader>) ; AllowNullLiteral   >]
    type Grid                    [< JavaScript ; Inline "new Slick.Grid($dom.Dom, $data, $columns, $opts)" >] 
                                                                                                   (dom : Element, 
                                                                                                    data : obj, 
                                                                                                    columns : Column [], 
                                                                                                    opts : GridOptions) =
        [< JavaScript; Inline "$0.invalidateRow($n)"     >]          member this.invalidateRow      (n:int)              = ()
        [< JavaScript; Inline "$0.invalidateRows($rs)"   >]          member this.invalidateRows     (rs:int[])           = ()
        [< JavaScript; Inline "$0.invalidateAllRows()"   >]          member this.invalidateAllRows  ()           = ()
        [< JavaScript; Inline "$0.updateRowCount()"      >]          member this.updateRowCount     ()                   = ()
        [< JavaScript; Inline "$0.render()"              >]          member this.render             ()                   = ()
        [< JavaScript; Inline "$0.registerPlugin($p)"    >]          member this.registerPlugin     (p:obj)              = ()
        [< JavaScript; Inline "$0.setSelectionModel($m)" >]          member this.setSelectionModel  (m:obj)              = ()
        [< JavaScript; Inline "$0.getSelectedRows()"     >]          member this.getSelectedRows    ()                   = [| 0 |]
        [< JavaScript; Inline "$0.setSelectedRows($rs)"  >]          member this.setSelectedRows    (rs:int[])           = ()
        [< JavaScript; Inline "$0.getActiveCell()"       >]          member this.getActiveCell      () :JSEventArg       = X<_>
        [< JavaScript; Inline "$0.setActiveCell($r, $c)" >]          member this.setActiveCell      (r:int, c:int)       = ()
        [< JavaScript; Inline "$0.editActiveCell()"      >]          member this.editActiveCell     ()                   = ()
        [< JavaScript; Inline "$0.getCellEditor()"       >]          member this.getCellEditor      () :obj              = X<_>
        [< JavaScript; Inline "$0.getContainerNode()"    >]          member this.getContainerNode   () :Dom.Element      = X<_>
        [< JavaScript; Inline "$0.setColumns($cols)"     >]          member this.setColumns         (cols : Column [])   = ()
        [< JavaScript; Inline "$0.setData($data)"        >]          member this.setData            (data : obj)         = ()
        [< DefaultValue                                  >]          val mutable onAddNewRow        : JSEvent
        [< DefaultValue                                  >]          val mutable onKeyDown          : JSEvent
        [< DefaultValue                                  >]          val mutable onCellChange       : JSEvent
                                                                                                  
    type EditorsType   [< JavaScript ; Inline "Slick.Editors " >]                            ()                   =
        [< DefaultValue                               >]          val mutable Text : EditorType

    let [< JavaScript; Inline "Slick.Editors"         >]  Editors = new EditorsType()

type RowId =
    | ExistingKey of KeyValues
    | NewKey      of int
type RowT = 
    | ExistingRow of key: KeyValues * values: FieldValues * changed: bool
    | NewRow      of key: int       * values: FieldValues
type RowChange =
    | RowChange
    | RowDelete
type Change  = RowId * RowChange


[< JavaScript >]
module Row =
    let rid = function | ExistingRow(id, _, _) -> ExistingKey id
                       | NewRow     (id, _   ) -> NewKey      id
    let dat = function | ExistingRow(_ , d, _) -> d
                       | NewRow     (_ , d   ) -> d

[< JavaScript >]
module Client =
//    open x

    [< Inline """(!$v)""">]
    let isUndefined v = true

    let gridOptions = { 
        Slick.enableColumnReorder  = true 
        Slick.enableCellNavigation = true 
        Slick.editable             = true 
        Slick.enableAddRow         = true
        Slick.autoEdit             = false
        Slick.syncColumnCellResize = true
        Slick.headerRowHeight      = 45
    }

    let CallServer context asy callback =
        Async.StartWithContinuations(asy, callback
        ,   fun exc -> RopJS.failException context exc |> RopJS.notifyMessages
        ,   fun can -> RopJS.failException context can |> RopJS.notifyMessages
        )


//    let test1 () =
//        CallServer "test1" (Server.test1 "hola") showAnyMessage
        


    type DataView (token, tableName:string) =
        let mutable activeRows    : RowT       []   = [| |]
        let mutable deletedRows   : KeyValues  Set  = Set([])
        let mutable columns       : Column     []   = [| |]
        let mutable grid          : Slick.Grid      = null
        let mutable keyNames      : string[]        = [||]
        let mutable message = Div []

        let showMessage (m:string) =
                message.Clear          ()
                message -< [Text m] |> ignore
        let showAnyMessage a = 
            showMessage (sprintf "%A" a)

        let getNewRowId () =
            let newRowIds = 
                activeRows
                |> Seq.choose (function NewRow(i , _) -> Some i | _ -> None)
                |> Seq.toArray 
            if Array.isEmpty newRowIds
                then 1
                else newRowIds
                     |> Seq.max
                     |> (+) 1
        let ProcessChange (change:Change) =
            match change with
                | ExistingKey(ks), RowDelete -> 
                                                deletedRows <- deletedRows.Add <| ks 
                | ExistingKey(ks), RowChange -> 
                                                let n = activeRows |> Array.findIndex (function ExistingRow(k2, _, _) -> ks = k2 | _ -> false)
                                                Array.get activeRows n
                                                |> function | ExistingRow(rid, d, _) -> Array.set activeRows n (ExistingRow(rid, d, true))
                                                            | _                      -> ()
                                                            
                | _ -> ()
        let ProcessChanges (changes:Change[]) =
            changes
            |> Array.iter ProcessChange

        let columnSizePlugin = new Slick.AutoColumnSize         ()
        let mutable haveAutoColumnSized = false
        let reRender_ () =
            if grid.getContainerNode().ClientWidth > 0.0 then
                if haveAutoColumnSized = false then
                    haveAutoColumnSized <- true
                    columnSizePlugin.resizeAllColumns   ()
            grid.render                         ()            
                
        let activeCell (grid:Slick.Grid) =
            let cell = grid.getActiveCell()
            cell.row, cell.cell
        let getItemMetadata_ =
            new Column     ()
        let emptyItem () = columns |> Array.map (fun c -> c.defaultV)
        let getItem_ i =
            if i >= (Array.length activeRows) 
                then emptyItem ()
                else (Array.get activeRows i) |> Row.dat
        let getLength_ () = 
            Array.length activeRows
        let separateRows rows =
            activeRows
            |> Seq.mapi  (fun  i  r  -> i, r)
            |> Seq.toArray
            |> Array.partition(fun (i, r) -> rows |> Array.exists ((=)i))
        let addItem0_ item = 
            RopJS.flow "addItem0_" {
                do! RopJS.tryProtection()
                let rowId        = getNewRowId ()
                activeRows      <- (Array.append activeRows [| NewRow(rowId, item) |])
            }
        let addItem_ item (grid:Slick.Grid) = 
            RopJS.flow "addItem_" {
                do! RopJS.tryProtection()
                grid.invalidateRow     (getLength_ ()     )
                do! addItem0_          item
                grid.updateRowCount    (                  )
                reRender_              (                  )
            }
        let deleteRows (grid:Slick.Grid) =
            RopJS.flow "deleteRows" {
                do! RopJS.tryProtection()
                let rows  = grid.getSelectedRows     ()
                if rows.Length > 0 then
                    let deleted, remaining = separateRows rows
                    activeRows   <- remaining |> Array.map (fun (i, r) -> r)
                    deleted   
                    |> Array.map (function | (i, ExistingRow(rid, _, _)) -> ExistingKey rid, RowDelete
                                           | (i, NewRow     (rid, _   )) -> NewKey      rid, RowDelete
                                 ) 
                    |> ProcessChanges 
                    let row                    = Array.min rows
                    let _  , col               = activeCell grid
                    grid.setSelectedRows         ([| row                 |])
                    grid.setActiveCell           (   row, col              )
                    grid.invalidateAllRows       (                         )
                    grid.updateRowCount          (                         )
                    reRender_                    (                         )
            } |> RopJS.notifyMessages 
        let editCell  (grid:Slick.Grid) =
            grid.editActiveCell ()
        let editCell2 (grid:Slick.Grid) (c:string) =
            let row, _ = activeCell grid
            if row >= getLength_() then
                addItem_ (emptyItem ()) grid |> RopJS.notifyMessages 
            let editor                  = grid.getCellEditor()
            if editor = null then
                grid.editActiveCell      (                         )
        let subscribeGrid_ (grid:Slick.Grid) =
            grid.onAddNewRow.subscribe    (new JSEventCallback( fun (event, args) ->
                RopJS.flow "onAddNewRow" {
                    do! RopJS.tryProtection()
                    return    addItem_  args.item grid
                } |> RopJS.notifyMessages 
            ))

            grid.onCellChange.subscribe    (new JSEventCallback( fun (event, args) ->
                RopJS.flow "onCellChange" {
                    do! RopJS.tryProtection()
                    (args.row |> Array.get activeRows |> Row.rid, RowChange)
                    |> ProcessChange
                } |> RopJS.notifyMessages 
            ))

            grid.onKeyDown.subscribe      (new JSEventCallback( fun (event, args) ->
                RopJS.flow "onKeyDown" {
                    do! RopJS.tryProtection()
                    if event.ctrlKey || event.altKey then ()
                    else
                        match event.key with
                        | "Delete"             -> deleteRows grid
                        | "F2"                 -> editCell   grid
                        | c  when c.Length = 1 -> editCell2  grid c
                        | _                    -> ()
                } |> RopJS.notifyMessages 
            ))

        let getValue (values:FieldValues) column : obj =
            columns
            |> Array.find (fun col -> col.id = column)
            |> fun col -> Array.get values col.field
        let getKeyValue (values:FieldValues) column =
            getValue values column :?> KeyValue
        let calculateKey (values:FieldValues) =
            keyNames
            |> Array.fold (fun (ks:KeyValue []) name -> Array.append ks [| (getKeyValue values name) |]) [||]
        let composeRow values =
            ExistingRow(calculateKey values, values, false)

        let processSelect response =
            RopJS.flow "processSelect" {
                let! (dataIn, columnsIn, keys)    = response
                keyNames                         <- keys
                columns                          <- columnsIn
                activeRows                       <- dataIn |> Array.map composeRow
                deletedRows                      <- Set [| |]
                columns |> Array.iter               (fun (c:Column) -> c.editor <- Slick.Editors.Text )
                grid.setColumns                     columns                  
                grid.invalidateAllRows              ()                        
                grid.updateRowCount                 ()      
                haveAutoColumnSized              <- false
                reRender_                           ()            
                showMessage                         ""            
            } |> RopJS.notifyMessages 
        let readData_ () =
            showMessage                         "loading..."            
            CallServer "readData_" (Server.FetchQueryDataAR token tableName) processSelect

        let getRowData rid =
            activeRows
            |> Array.find(function | ExistingRow(id, _, _) -> ExistingKey id = rid
                                   | NewRow     (id, _   ) -> NewKey      id = rid
                         )
            |> Row.dat

        let prepareData () =
            let deleted             = deletedRows |> Set.toArray |> Array.map (fun vs -> vs |> Array.map (fun v -> v :> obj))
            let changed             = activeRows  |> Array.choose    (function ExistingRow(id, row, true) -> Some (id, row) | _ -> None)
            let added               = activeRows  |> Array.choose    (function NewRow     (_ , row      ) -> Some row       | _ -> None)
            let changed, changedKey = changed     |> Array.partition (function            (id, row      ) -> id = (calculateKey row)   )
            let deleted             = changedKey  |> Array.map       (function            (id, _        ) -> id  |> Array.map (fun v -> v :> obj)) |> Array.append deleted
            let added               = changedKey  |> Array.map       (function            (_ , row      ) -> row                       ) |> Array.append added
            let changed             = changed     |> Array.map       (function            (_ , row      ) -> row                       )

            let deleted             = deleted     |> Array.map       (fun os -> os |> Array.map (fun o -> o.ToString() ))
            let changed             = changed     |> Array.map       (fun os -> os |> Array.map (fun o -> o.ToString() ))
            let added               = added       |> Array.map       (fun os -> os |> Array.map (fun o -> o.ToString() ))
            deleted, changed, added

        let getKeysPerRow () =
            activeRows
            |> Seq.mapi (fun i -> 
                            function | ExistingRow(ks, _ , false) -> i, ks             
                                     | ExistingRow(_ , vs, true ) -> i, calculateKey vs
                                     | NewRow     (_ , vs       ) -> i, calculateKey vs
                        )

        let validateData () =
            RopJS.flow "validateData" {
                do! RopJS.tryProtection()
                let keysPerRow    = getKeysPerRow ()
                let undefinedKeys =
                    keysPerRow
                    |> Seq.filter (fun (i, ks) -> ks |> Array.exists (fun k -> isUndefined k))
                    |> Seq.map    (fun (i, ks) -> ErrUndefinedKeys(i, ks |> Array.map (fun k -> k :> obj)))
                    |> Seq.toList
                return! if undefinedKeys.IsEmpty then
                           RopJS.succeed ()
                        else
                           undefinedKeys |> Failure
                do! RopJS.tryProtection()
                let duplicatedKeys = 
                    keysPerRow
                    |> Seq.groupBy (fun (i, ks) -> ks)
                    |> Seq.filter  (fun (k, rs) -> rs |> Seq.toArray |> Array.length |> fun l -> l > 1)
                    |> Seq.collect (fun (k, rs) -> rs)
                    |> Seq.map     (fun (i, ks) -> ErrDuplicatedKeys(i, ks |> Array.map (fun k -> k :> obj)))
                    |> Seq.toList
                return! if duplicatedKeys.IsEmpty then
                           RopJS.succeed ()
                        else
                           duplicatedKeys |> Failure
            }

        let processOther response =
            RopJS.flow "processOther" {
                let! r      = response
                showMessage   r
                readData_     ()
            } |> RopJS.notifyMessages

        let saveData_ () =
            RopJS.flow "saveData_" {
                do! RopJS.tryProtection()
                showMessage          "Saving data..."
                let saveData       = prepareData ()
                do! validateData    ()
                let colnames       = columns |> Array.map (fun c -> c.name)
                CallServer "saveData_" (Server.SaveDataAR token tableName colnames saveData ) processOther
            } |> RopJS.notifyMessages 

        let createGrid_ (datav:DataView) (gridElement:Element) =
            RopJS.flow "createGrid_" {
                let gridElement2              = Div [Attr.Class "flexgrow"]
                gridElement                  -< [message] -< [gridElement2] |> ignore
                grid                         <-  new Slick.Grid(gridElement2, datav, columns, gridOptions)
                grid.setSelectionModel          (new Slick.CellSelectionModel     ()                   )
                grid.registerPlugin             (new Slick.CellExternalCopyManager()                   )
                grid.registerPlugin             columnSizePlugin                   
                subscribeGrid_                  grid
                JQuery.JQuery.Of(gridElement2.Dom).Bind("resize", fun _ _ -> reRender_()) |> ignore
                readData_                       ()
            } |> RopJS.notifyMessages 

        member this.getLength       (                 ) = getLength_       ()
        member this.getItemMetadata (i   : int        ) = getItemMetadata_
        member this.getItems        (                 ) = activeRows |> Array.map Row.dat
        member this.getItem         (i   : int        ) = getItem_         i
        member this.addItem         (item: FieldValues) = addItem0_        item |> RopJS.notifyMessages 
        member this.push            (                 ) = addItem0_ (emptyItem ())
        member this.readData        (                 ) = readData_ ()
        member this.saveData        (                 ) = saveData_ ()
        member this.reRender        (                 ) = reRender_ ()
        member this.createGrid      dv el               = createGrid_ dv el



    let GridSync  token tableName =
        let  dataView    = new DataView(token, tableName)
        let  afterRender = dataView.createGrid dataView
        let  divGrid  = Div [Attr.Class "flex flexgrow"]
        let  elements = 
            [
                Div[ 
                    Button [Text "reload"] |>! OnClick (fun _ _ -> dataView.readData())
                    Button [Text "save"  ] |>! OnClick (fun _ _ -> dataView.saveData())
                ]
                divGrid
            ]
        elements, divGrid, afterRender


//    let xxGridSyncRop  token tableName =
//        RopJS.flow "saveData_" {
//            let! token                          = token
//            let elements, divGrid, afterRender  = GridSync token tableName
//            divGrid |>! OnAfterRender afterRender |> ignore
//            return elements
//        }|> function | Success (v, _)  -> v
//                     | Failure ms      -> [ Text (sprintf "%A" ms) :?> Element]


//    let Main () =
//        let input = Input [Attr.Value ""] -< []
//        let output = H1 []
//        Div [
//            input
//            Button [Text "Send"]
//            |>! OnClick (fun _ _ -> CallServer input.Value (fun t -> output.Text <- t))
//            HR []
//            H4 [Attr.Class "text-muted"] -< [Text "The server responded:"]
//            Div [Attr.Class "jumbotron"] -< [output]
//        ] |> ignore

    let LoginForm onLogin =
        let login    = Input [ Attr.PlaceHolder "Username" ]
        let password = Input [ Attr.PlaceHolder "Password"
                               Attr.Type "password"        ]
        let errors   = P []
        let processLogin token =
            RopJS.flow "saveData_" {
                do! RopJS.tryProtection()
                let! t     = token
                onLogin      t
            } |> function | Success _  -> ()
                          | Failure ms -> errors.Text <- sprintf "%A" ms
        Div [
            errors
            login
            password
            Input [Attr.Type "button"; Attr.Value "Enter"]
            |>! OnClick (fun e args ->
                let name = login.Value
                let pwd  = password.Value
                CallServer "LoginOnClick" (Server.LoginAR name pwd) processLogin
            )
        ]

    let LoginBox goLink =
        let mkBox (auth: Auth.Token) =
            Div [ Text (sprintf "%A" auth.Name) ]
        let container = Div [ ]
        let onLogin auth =
            container.Clear()
            container.Append(mkBox auth)
            JS.Window.Location.Href <- goLink
        Div [LoginForm onLogin]
        |> container.Append
        container

    let createPanelTable (options: Auth.Token * string * string) =
        let token, title, table            = options
        let elements, divGrid, afterRender = GridSync token table
        let container                      = Div elements -< [ 
                                                                 Attr.Class "flex flexgrow"
                                                                 Attr.Style "position: relative; height: 100%; width: 100%; " 
                                                             ]
        title, container, (fun () -> divGrid |> afterRender)

    let mutable         mouseStatus = 0
    let onMouseDown _ = mouseStatus <- mouseStatus + 1
    let onMouseUp   _ = mouseStatus <- mouseStatus - 1
    let registerMouseEvents =
        JSEvent.addEventListener(JS.Document?body, "mousedown", onMouseDown)
        JSEvent.addEventListener(JS.Document?body, "mouseup"  , onMouseUp  )

    let mutable instance:int = 1
    let createPanelReport (options: Auth.Token * string * string) =
        let token, report, url   = options
        instance                <- instance + 1
        let cover                = Div [ Attr.Class "iframe-cover-on" ] 
                                   |>! OnMouseEnter (fun cover _ -> 
                                                       if JS.Document?body?style?cursor = "" && mouseStatus = 0 then
                                                                  cover.RemoveClass "iframe-cover-on"
                                                                  cover.AddClass    "iframe-cover-off")
        let iFrame               = IFrame [ 
                                              Attr.Class "flex flexgrow"
                                              Attr.Src (url + instance.ToString())
                                              Attr.FrameBorder "0"
                                              Attr.Height      "100%"
                                              Attr.Width       "100%"
                                          ] |>! OnMouseLeave (fun _ _ -> 
                                                                  cover.RemoveClass "iframe-cover-off"
                                                                  cover.AddClass    "iframe-cover-on")
        let container             = Div [     
                                              Attr.Class "flex flexgrow"
                                              Attr.Style "position: relative; height: 100%; width: 100%; " 
                                        ] -< [ cover; iFrame ]
        report, container, (fun () -> ())

    let getPanelRegister (token: Auth.Token) (panel: PanelClient) =
        match panel with
            | ClientPanelTable (id, title     ) ->          "Table:"   + id , fun () -> createPanelTable  (token, title, id )
            | ClientPanelReport(id, title, url) -> (sprintf "Report:%A"  id), fun () -> createPanelReport (token, title, url)

    let allPanels (token: Auth.Token) (panels: PanelClient list) = 
        panels
        |> List.map (getPanelRegister token)

    let findPanelFromEndPoint endpoint panels =
        panels
        |> List.tryFind (fun panel -> 
                            endpoint = match panel with | ClientPanelTable (id, title    ) -> EPTable  (id, title)
                                                        | ClientPanelReport(id, title,  _) -> EPReport(id, title)
        ) |> RopJS.fromOption ((sprintf "%A"endpoint) |> ErrInvalidEndPointForClient)

    let showPanel (endpoint: EndPoint) =
        let content = Div [Attr.Class "flex flexgrow"]
        async {
            let! token  = Server.fetchTokenAR ()
            let! panels = Server.fetchPanelsAR()
            let  result =
                RopJS.flow "showPanel" {
                    let! token                     = token
                    let! panels                    = panels
                    let! panel                     = findPanelFromEndPoint endpoint panels
                    let title, f                   = getPanelRegister token panel
                    let _, container, after        = f()
                    after()
                    return [ container ]
                }|> function | Success (v, _)     -> v
                             | Failure ms         -> [ Text (sprintf "%A" ms) :?> Element]
            content -< result |> ignore
        }  |> Async.Start
        content

    let createDockEnvironment (createDock) =
        let content = Div [Attr.Class "flex flexgrow"]
        async {
            let! token           = Server.fetchTokenAR ()
            let! panels          = Server.fetchPanelsAR()
            let  result =
                RopJS.flow "createDockEnvironment" {
                    let! token           = token
                    let! panels          = panels
                    let  buttonSave      = Button [Text "save"   ]
                    let  buttonRestore   = Button [Text "restore"]
                    let  allPanels       = allPanels token panels
                    return
                       [
                            Div [
                                buttonSave  
                                buttonRestore
                            ]
                            Div [Attr.Class "flex flexgrow" ; Attr.Id "SinglePane"]
                            |>! OnAfterRender (createDock allPanels buttonSave buttonRestore)
                        ]                                                        
                }|> function | Success (v, _)  -> v
                             | Failure ms      -> [ Text (sprintf "%A" ms) :?> Element]
            content -< result |> ignore
        }  |> Async.Start
        content

    let createCanvasNone() = Div [Attr.Class "flex flexgrow"]

[< JavaScript >]
module DckSingle =
    let createPanel (f:unit -> string * Element * (unit -> unit)) (docker: Element) =
        let title, container, after = f()
        docker -< [ container ] |> ignore
        after()

    let mutable globalDocker: Element option = None
    let mutable globalPanels: (string * (unit -> string * Element * (unit -> unit))) list = []

    let createDockManager(allPanels: (string * (unit -> string * Element * (unit -> unit))) list) buttonSave buttonRestore (element: Element) =
        RopJS.flow "createDockManager" {
            do! RopJS.tryProtection()
            //buttonSave    |>! OnClick (fun _ _ -> savedLayout <- docker.save()                         ) |> ignore
            //buttonRestore |>! OnClick (fun _ _ ->                docker.restore(savedLayout)           ) |> ignore
            globalDocker <- Some element
            globalPanels <- allPanels
        } |> RopJS.notifyMessages

    let createDockEnvironment () =
        Client.createDockEnvironment createDockManager

    let addPanel id =
        globalDocker |> Option.map(fun docker ->     
            JQuery.JQuery.Of(docker.Dom).Children().Remove() |> ignore
            globalPanels
            |> List.iter (function 
            | (id', f) when id = id' -> createPanel f  docker 
            | _                      -> ()                   )
        )

