namespace CIPHERPrototype1
open Model
open Model2
open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open Rop

[< AllowNullLiteral >]
type Various [< Inline "{}  " >]() =
    [< Inline "$0.focus ()  " >] member this.focus   () = ()
    [< Inline "$0.select()  " >] member this.select  () = ()
    [< Inline "$0.getValue()" >] member this.getValue() = ""

type JSEventObj  () =
    [< DefaultValue                               >]          val mutable ctrlKey : bool
    [< DefaultValue                               >]          val mutable altKey  : bool
    [< DefaultValue                               >]          val mutable key     : string
    [< DefaultValue                               >]          val mutable which   : int

[< AllowNullLiteral >]
type JSEventArg  () =
    [< DefaultValue                               >]          val mutable item  : obj
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

    type Range = {
        fromRow  : int
        fromCell : int
        toRow    : int
        toCell   : int
    }

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

    type DataView  [< Inline "new Slick.Data.DataView($options)" >]                  (options)            =
        [< Inline "$0.beginUpdate()"        >]          member this.beginUpdate       ()                   = ()
        [< Inline "$0.endUpdate()"          >]          member this.endUpdate         ()                   = ()
        [< Inline "$0.setItems($data)"      >]          member this.setItems          (data: obj [])       = ()
        [< Inline "$0.addItem($item)"       >]          member this.addItem           (item: obj)          = ()
        [< Inline "$0.updateItem($id,$item)">]          member this.updateItem        (id:obj, item: obj)  = ()
        [< Inline "$0.deleteItem($id)"      >]          member this.deleteItem        (id: obj)            = ()
        [< Inline "$0.getLength()"          >]          member this.getLength         ()                   = 0
        [< Inline "$0.getItems()"           >]          member this.getItems          () : obj []          = X<_>
        [< Inline "$0.getItem($row)"        >]          member this.getItem           (row:int) : obj      = X<_>
        [< Inline "$0.mapRowsToIds($rows)"  >]          member this.mapRowsToIds    (rows: int []) : obj[] = [| |]
        [< DefaultValue                                 >]          val mutable onRowCountChanged : JSEvent
        [< DefaultValue                                 >]          val mutable onRowsChanged     : JSEvent
        [< DefaultValue                                 >]          val mutable push              : obj

    type AutoColumnSize          [< Inline "new Slick.AutoColumnSize(500)"       >]  ()                   =
        [< JavaScript; Inline "$0.resizeAllColumns()"   >]          member this.resizeAllColumns  ()                   = ()        
                                                                                               
    type CellExternalCopyManager [< Inline "new Slick.CellExternalCopyManager()" >]  ()                   =
        [< JavaScript; Inline "$0.xxx()"                >]          member this.xxx               ()                   = ()        
                                                                                               
    type RowSelectionModel       [< Inline "new Slick.RowSelectionModel()"       >]  ()                   =
        [< JavaScript; Inline "$0.xxx()"                >]          member this.xxx               ()                   = ()        

    type CellSelectionModel      [< Inline "new Slick.CellSelectionModel()"      >]  ()                   =
        [< Inline "$0.getSelectedRanges()"  >]          member this.getSelectedRanges    () : Range[] = [| |]
        [< DefaultValue                                 >]          val mutable onSelectedRangesChanged : JSEvent
        [< Inline "$0.xxx()"                            >]           member this.xxx               ()                   = ()        

    [< Require(typeof<GridLoader>) ; AllowNullLiteral   >]
    type Grid                    [< JavaScript ; Inline "new Slick.Grid($dom, $data, $columns, $opts)" >] 
                                                                                                   ( dom : Dom.Element, 
                                                                                                     data : obj, 
                                                                                                     columns : Column [], 
                                                                                                     opts : GridOptions) =
        [< Inline "$0.invalidateRow($n)"     >]          member this.invalidateRow       (n:int)              = ()
        [< Inline "$0.invalidateRows($rs)"   >]          member this.invalidateRows      (rs:int[])           = ()
        [< Inline "$0.invalidateAllRows()"   >]          member this.invalidateAllRows   ()           = ()
        [< Inline "$0.updateRowCount()"      >]          member this.updateRowCount      ()                   = ()
        [< Inline "$0.render()"              >]          member this.render              ()                   = ()
        [< Inline "$0.registerPlugin($p)"    >]          member this.registerPlugin      (p:obj)              = ()
        [< Inline "$0.setSelectionModel($m)" >]          member this.setSelectionModel   (m:obj)              = ()
        [< Inline "$0.getSelectedRows()"     >]          member this.getSelectedRows     ()                   = [| 0 |]
        [< Inline "$0.setSelectedRows($rs)"  >]          member this.setSelectedRows     (rs:int[])           = ()
        [< Inline "$0.getActiveCell()"       >]          member this.getActiveCell       () :JSEventArg       = X<_>
        [< Inline "$0.setActiveCell($r, $c)" >]          member this.setActiveCell       (r:int, c:int)       = ()
        [< Inline "$0.editActiveCell()"      >]          member this.editActiveCell      ()                   = ()
        [< Inline "$0.autosizeColumns()"     >]          member this.autosizeColumns     ()                   = ()
        [< Inline "$0.getCellEditor()"       >]          member this.getCellEditor       () :obj              = X<_>
        [< Inline "$0.getContainerNode()"    >]          member this.getContainerNode    () :Dom.Element      = X<_>
        [< Inline "$0.setColumns($cols)"     >]          member this.setColumns          (cols : Column [])   = ()
        [< Inline "$0.getColumns()"          >]          member this.getColumns          () : Column []       = X<_>
        [< Inline "$0.setData($data)"        >]          member this.setData             (data : obj)         = ()
        [< DefaultValue                      >]          val mutable onAddNewRow         : JSEvent
        [< DefaultValue                      >]          val mutable onKeyDown           : JSEvent
        [< DefaultValue                      >]          val mutable onCellChange        : JSEvent 
        [< DefaultValue                      >]          val mutable onActiveCellChanged : JSEvent
        [< DefaultValue                      >]          val mutable onDblClick          : JSEvent
        [< DefaultValue                      >]          val mutable onHeaderClick       : JSEvent
          
    [< AllowNullLiteral >]                                                                                        
    type EditorsType   [< JavaScript ; Inline "Slick.Editors " >]                            ()                   =
        [< DefaultValue                               >]          val mutable Text : EditorType

    let [< JavaScript; Inline "Slick.Editors"         >]  Editors = new EditorsType()

[< JavaScript >]
module SlickGrid =

    type RowId =
        | ExistingKey of KeyValues
        | NewKey      of int
    and RowT = 
        | ExistingRow of key: KeyValues * values: FieldValues * changed: bool
        | NewRow      of key: int       * values: FieldValues
    and Change  =
        | AddRow      of int * FieldValues
        | ChangeRow   of RowT
        | DeleteRow   of RowId
        | DeleteRows  of int[]
        | DataSaved   of addedRows: FieldValues[]
        | DataRead    of values:    FieldValues[] * columns: Column[] * keys: int[]
        | RowSelected of RowT

    and SlickGridInMessage = 
        | Load       of values:    FieldValues[] * columns: Column[] * keys: int[]
        | Saved      of addedRows: FieldValues[]
        | Clear
        | SendData
        | SelectRow  of keys: RowId

    and SlickGridOutMessage = 
        | ShowInfo         of string * bool
        | MessageProcessor of (SlickGridInMessage  -> unit)
        | SlickChange      of Change
        | SaveData         of values: RowT[] * columns: Column[] * keys: int[] * deleted: string [][] * changed: string [][] * added: string [][]

    [<JavaScript>]
    type RowT with
        [<JavaScript>]
        member this.rowId_ () = 
            match this with
            | ExistingRow (key, _, _) -> ExistingKey key
            | NewRow      (key, _   ) -> NewKey      key
        member this.rowData_ () =
            match this with
            | ExistingRow(_ , d, _) -> d
            | NewRow     (_ , d   ) -> d

    let gridOptions = { 
        Slick.enableColumnReorder  = true 
        Slick.enableCellNavigation = true 
        Slick.editable             = true 
        Slick.enableAddRow         = true
        Slick.autoEdit             = false
        Slick.syncColumnCellResize = true
        Slick.headerRowHeight      = 45
    }

    type DataView(processMessage_O: (SlickGridOutMessage -> unit) option) =
        let mutable activeRows    : RowT       []   = [| |]
        let mutable deletedRows   : KeyValues  Set  = Set([])
        let mutable columns       : Column     []   = [| |]
        let mutable grid          : Slick.Grid      = null
        let mutable keyIndexes    : int[]           = [||]
        let mutable doEvents                        = true

        let sendMessage_         msg = processMessage_O |> Option.map (fun f -> msg |> f) |> ignore
        let showInfo_ processing msg = (msg, processing) |> SlickGridOutMessage.ShowInfo |> sendMessage_

        let getNewRowId_ () =
            let newRowIds = 
                activeRows
                |> Seq.choose (function NewRow(i , _) -> Some i | _ -> None)
                |> Seq.toArray 
            if Array.isEmpty newRowIds
                then 1
                else newRowIds
                     |> Seq.max
                     |> (+) 1

        let getKeyValue (values:FieldValues) index =
            (Array.get values index) :?> KeyValue
        let calculateKey (values:FieldValues) =
            keyIndexes
            |> Array.fold (fun (ks:KeyValue []) index -> Array.append ks [| (getKeyValue values index) |]) [||]

        let composeRow_ values =
            ExistingRow(calculateKey values, values, false)
        let separateRows_ rows =
            activeRows
            |> Seq.mapi  (fun  i  r  -> i, r)
            |> Seq.toArray
            |> Array.partition(fun (i, r) -> rows |> Array.exists ((=)i))
        let findInAddedRows_ addedRows values =
            let key = calculateKey values
            addedRows
            |> Array.tryFind (fun row'-> (calculateKey row') = key)
            |> Option.defaultV values
            |> composeRow_
        let rec processChange_ (change:Change) =
            match change with
            | DataRead (dataIn, columnsIn, keys) -> keyIndexes  <- keys
                                                    columns     <- columnsIn
                                                    columns        |> Array.iter (fun (c:Column) -> c.editor <- Slick.Editors.Text )
                                                    activeRows  <- dataIn |> Array.map composeRow_
                                                    deletedRows <- Set []
            | DataSaved   addedRows              -> deletedRows <- Set []
                                                    activeRows  <- addedRows |> Array.map composeRow_
                                                                   |> Array.append (activeRows
                                                                       |> Array.choose (fun row ->
                                                                           match row with
                                                                           | ExistingRow(k, vs, _) when (calculateKey vs) = k -> Some row
                                                                           | _                                                -> None
                                                                       )) 
                                                    grid.invalidateAllRows     ()

            | DeleteRow  (ExistingKey k)         -> deletedRows <- deletedRows.Add <| k
            | DeleteRows  rows                   -> let deleted, remaining = separateRows_ rows
                                                    activeRows   <- remaining |> Array.map (fun (i, r) -> r)
                                                    deleted   
                                                    |> Array.map (function | (i, ExistingRow(rid, _, _)) -> ExistingKey rid |> DeleteRow
                                                                           | (i, NewRow     (rid, _   )) -> NewKey      rid |> DeleteRow
                                                                    ) 
                                                    |> Array.iter processChange_
            | ChangeRow(ExistingRow (k, vals, _))-> let n = activeRows |> Array.findIndex (function ExistingRow(k', _, _) -> k = k' | _ -> false)
                                                    Array.get activeRows n
                                                    |> function | ExistingRow(rid, d, _) -> Array.set activeRows n (ExistingRow(rid, d, true))
                                                                | _                      -> ()
            | AddRow   (rowId, item)             -> activeRows <- (Array.append activeRows [| NewRow(rowId, item) |])
            | _                                  -> ()

            SlickGridOutMessage.SlickChange change |> sendMessage_

        let columnSizePlugin = Slick.AutoColumnSize()
        let mutable haveAutoColumnSized = false
        let reRender_ () =
            if grid.getContainerNode().ClientWidth > 0.0 then
                if haveAutoColumnSized = false then
                    haveAutoColumnSized <- true
                    columnSizePlugin.resizeAllColumns()
            grid.render()            
                
        let activeCell_ () =
            let cell = grid.getActiveCell()
            if cell = null 
            then None
            else Some (cell.row, cell.cell)
        let getItemMetadata0 =
            new Column     ()
        let emptyItem_ () = columns |> Array.map (fun c -> c.defaultV)
        let getItem_ i =
            if i >= (Array.length activeRows) 
                then emptyItem_ ()
                else (Array.get activeRows i).rowData_()
        let getLength_ () = 
            Array.length activeRows
        let addItem0_ item = 
            Rop.flow {
                do! Rop.tryProtection()
                grid.invalidateRow     (getLength_ ()     )
                (getNewRowId_ (), item) |>  Change.AddRow |> processChange_
            }
        let addItem_ item  = 
            Rop.flow {
                do! Rop.tryProtection()
                grid.invalidateRow     (getLength_ ()     )
                do! addItem0_          item
                grid.updateRowCount    (                  )
                reRender_              (                  )
            }
        let deleteRows_ rows =
            Rop.flow {
                do! Rop.tryProtection()
                if rows |> Array.length > 0 then
                    DeleteRows rows |> processChange_
                    let row                    = Array.min rows
                    if grid.getSelectedRows().Length > 0 then
                        grid.setSelectedRows         ([| row                 |])
                    activeCell_ ()
                    |> Option.map( fun (_, col) ->
                        grid.setActiveCell           (   row, col              )
                    ) |> ignore
                    grid.invalidateAllRows       (                         )
                    grid.updateRowCount          (                         )
                    reRender_                    (                         )
            } |> Rop.notifyMessages 
        let editCell_ ()  =
            grid.editActiveCell ()
        let editCell2_ (c:string) =
            activeCell_ () 
            |> Option.map(fun (row, _) ->
                if row >= getLength_() then
                    addItem_ (emptyItem_ ())  |> Rop.notifyMessages 
                let editor                  = grid.getCellEditor()
                if editor = null then
                    grid.editActiveCell      (                         )
            ) |> ignore
        let subscribeGrid_ (grid:Slick.Grid) =
            grid.onAddNewRow.subscribe    (JSEventCallback( fun (event, args) ->
                Rop.flow {
                    do! Rop.tryProtection()
                    return    addItem_  (args.item :?> FieldValues) 
                } |> Rop.notifyMessages 
            ))

            let rowChanged_ row =
                Rop.flow {
                    do! Rop.tryProtection()
                    if doEvents then
                        grid.invalidateRow row
                        row |> Array.get activeRows |> ChangeRow |> processChange_
                }

            grid.onCellChange.subscribe    (JSEventCallback( fun (event, args) ->
                rowChanged_ args.row
                |> Rop.notifyMessages
                reRender_()
            ))

            let pasteOnce_ (rows: seq<string[]>) (colDefs: Column[]) rS cS maxR maxC =
                rows
                |> Seq.iteri(fun i cols ->
                    if maxR = 0 || i < maxR then
                        let r = rS + i
                        let item = if r < activeRows.Length
                                    then activeRows.[r].rowData_()
                                    else emptyItem_()
                        cols
                        |> Seq.iteri(fun j text ->
                            if maxC = 0 || j < maxC then
                                let c = cS + j
                                if c < colDefs.Length && not (isUndefined colDefs.[c].field) then
                                    setJVSProp item                       colDefs.[c].field text
                        )
                        if r < activeRows.Length
                        then rowChanged_ r
                        else addItem0_ item 
                        |> Rop.notifyMessages 
                )

            let pasteMany_ (rows: seq<string[]>) (range: Slick.Range) =
                let colDefs = grid.getColumns()
                let nRows = rows |> Seq.length
                let nCols = rows |> Seq.map (fun cols -> cols |> Array.length) |> Seq.max
                for     i in range.fromRow .. nRows .. range.toRow do
                    let     mR = if range.fromRow  = range.toRow  then 0 else range.toRow - i + 1
                    for j in range.fromCell .. nCols .. range.toCell do
                        let mC = if range.fromCell = range.toCell then 0 else range.toCell- j + 1
                        pasteOnce_ rows colDefs i j mR mC

            let processPasteData (rangeO: Slick.Range option) (text: string) =
                rangeO
                |> Option.iter(fun range ->
                    let rows =
                        text.Split([|"\n\r"; "\n"; "\r"|], System.StringSplitOptions.None)
                        |> (fun rows -> if rows.Length > 1 && rows.[rows.Length - 1] = "" 
                                        then rows.[0.. rows.Length - 2]
                                        else rows)
                        |> Seq.map(fun row -> row.Split([|"\t"|], System.StringSplitOptions.None) )
                    pasteMany_ rows range
                    grid.updateRowCount()
                    reRender_()
                )

            let documentBody_() = JS.Document.GetElementsByTagName("body").Item 0

            let createCaptureArea_ (text: string) (processAfter_: string -> unit) =
                let ta = JS.Document.CreateElement("textarea")
                ta?style?position <- "absolute"
                ta?style?left     <- "-2000px"
                ta?style?top      <- documentBody_()?top
                ta?value          <- text
                documentBody_().AppendChild ta |> ignore
                ta |> box |> unbox<Various> |> (fun ta ->
                    ta.select()
                    ta.focus ())
                let processCapture_ () =
                    let text = ta?value
                    documentBody_().RemoveChild ta |> ignore
                    processAfter_ text
                JS.SetTimeout processCapture_ 100  |> ignore

            let selectionModel = new Slick.CellSelectionModel()

            let getSelectedRange_ () = 
                let ranges = selectionModel.getSelectedRanges()
                if ranges = [||] 
                then activeCell_() |> Option.map(fun (r, c) -> { Slick.Range.fromRow  = r
                                                                 Slick.Range.fromCell = c
                                                                 Slick.Range.toRow    = r
                                                                 Slick.Range.toCell   = c})
                else Some ranges.[0]

            let getSelectedText_ () =
                getSelectedRange_()
                |> Option.map(fun range ->
                    let colDefs = grid.getColumns()
                    [ for i in range.fromRow .. range.toRow do
                        if i < activeRows.Length then
                            let item = activeRows.[i].rowData_()
                            yield
                                [ for j in range.fromCell .. range.toCell do 
                                    if j < colDefs.Length && not (isUndefined colDefs.[j].field) then
                                        yield item |> prop                    colDefs.[j].field                 
                                ] |> String.concat "\t"
                    ] |> String.concat "\n"
                ) |> Option.defaultV ""

            let clearRange_ (rangeO: Slick.Range option) =
                rangeO
                |> Option.iter(fun range ->
                    let colDefs = grid.getColumns()
                    for i in range.fromRow .. range.toRow do
                        if i < activeRows.Length then
                            let item = activeRows.[i].rowData_()
                            for j in range.fromCell .. range.toCell do 
                                if j < colDefs.Length && not (isUndefined colDefs.[j].field) then
                                    setJVSProp item                       colDefs.[j].field  ""
                            rowChanged_ i |> Rop.notifyMessages
                    reRender_()
                )

            let getCellEditor_ () = grid.getCellEditor() |> box |> unbox<Various>

            let pasteData_  () = 
                match getCellEditor_() with
                | editor when editor = null || editor.getValue() = "" 
                                            -> getSelectedRange_() |> processPasteData  |> createCaptureArea_ ""
                | _                         -> ()

            let copyData_   processAfter = 
                match getCellEditor_() with
                | editor when editor = null -> getSelectedText_ () |> (fun text -> createCaptureArea_ text processAfter)
                | _                         -> ()

            let deleteData_ () = 
                match getCellEditor_() with
                | editor when editor = null -> let range = getSelectedRange_()
                                               match range with
                                               | Some(r) when r.fromCell = 0 
                                                           && r.toCell   = columns.Length - 1 -> deleteRows_ [| r.fromRow .. r.toRow |]
                                               | Some(r)                                      -> clearRange_ range
                                               | _                                            -> ()
                | _                         -> ()

            grid.onKeyDown.subscribe      (new JSEventCallback( fun (event, args) ->
                    match event.key , event.ctrlKey, event.altKey with
                    | ("Insert", false, true )
                    | ("V"     , true , false)
                    | ("v"     , true , false) -> pasteData_  ()
                    | ("Insert", true , false)
                    | ("C"     , true , false)
                    | ("c"     , true , false) -> copyData_   (fun _ -> ()           )
                    | ("Delete", false, true )
                    | ("X"     , true , false)
                    | ("x"     , true , false) -> copyData_   (fun _ -> deleteData_())
                    | ("Delete", false, false) -> deleteData_ ()
                    | ("F2"    , false, false) -> editCell_   ()
                    | (c       , false, false) when c.Length = 1 
                                               -> editCell2_ c
                    | _                        -> ()
            ))
            grid.setSelectionModel          ( selectionModel                  )

//            grid.onKeyDown.subscribe      (JSEventCallback( fun (event, args) ->
//                Rop.flow {
//                    do! Rop.tryProtection()
//                    if event.ctrlKey || event.altKey then ()
//                    else
//                        match event.key with
//                        | "Delete" when grid.getCellEditor() = null -> deleteRows_ (grid.getSelectedRows())
//                        | "F2"                 -> editCell_   ()   
//                        | c  when c.Length = 1 -> editCell2_  c
//                        | _                    -> ()
//                } |> Rop.notifyMessages 
//            ))
//
            grid.onDblClick.subscribe (FuncWithArgs(fun (event, args: JSEventArg) ->
                let i = args.row
                if i < (Array.length activeRows) 
                then (Array.get activeRows i) |> RowSelected |> processChange_
            ))

            grid.onHeaderClick.subscribe(FuncWithArgs(fun (event, args: JSEventArg) ->
                Console.Log (sprintf "Event: %O, Args: %O" event args)
            ))

        let removeData_ () = deleteRows_ [|0..(activeRows |> Array.length) - 1|]
        let readData_   dataIn columnsIn keysIn =
            Server.call {
                DataRead (dataIn, columnsIn, keysIn) |> processChange_ 
                grid.setColumns                         columns                  
                grid.updateRowCount                     ()      
                haveAutoColumnSized                  <- false
                reRender_                               ()            
                showInfo_                               false ""            
            }

        let getRowData_ rid =
            activeRows
            |> Array.find(function | ExistingRow(id, _, _) -> ExistingKey id = rid
                                   | NewRow     (id, _   ) -> NewKey      id = rid
                         )
            |> (fun row -> row.rowData_())

        let prepareData_ () =
            let deleted             = deletedRows |> Set.toArray |> Array.map (fun vs -> vs |> Array.map (fun v -> v :> obj))
            let changed             = activeRows  |> Array.choose    (function ExistingRow(id, row, true) -> Some (id, row) | _ -> None)
            let added               = activeRows  |> Array.choose    (function NewRow     (_ , row      ) -> Some row       | _ -> None)
            let changed, changedKey = changed     |> Array.partition (function            (id, row      ) -> id = (calculateKey row)   )
            let deleted             = changedKey  |> Array.map       (function            (id, _        ) -> id  |> Array.map (fun v -> v :> obj)) |> Array.append deleted
            let added               = changedKey  |> Array.map       (function            (_ , row      ) -> row                       )           |> Array.append added
            let changed             = changed     |> Array.map       (function            (_ , row      ) -> row                       )

            let deleted             = deleted     |> Array.map       (fun os -> os |> Array.map (fun o -> if o = null then "" else o.ToString() ))
            let changed             = changed     |> Array.map       (fun os -> os |> Array.map (fun o -> if o = null then "" else o.ToString() ))
            let added               = added       |> Array.map       (fun os -> os |> Array.map (fun o -> if o = null then "" else o.ToString() ))
            deleted, changed, added

        let getSaveData_() =
            let deleted, changed, added = prepareData_()
            activeRows, columns, keyIndexes, deleted, changed, added

        let getKeysPerRow_ () =
            activeRows
            |> Seq.mapi (fun i -> 
                            function | ExistingRow(ks, _ , false) -> i, ks             
                                     | ExistingRow(_ , vs, true ) -> i, calculateKey vs
                                     | NewRow     (_ , vs       ) -> i, calculateKey vs
                        )

        let savedData_ addedRows =
            DataSaved                  addedRows |> processChange_
            reRender_                  ()

        let selectRow_ rowId =
            let col = activeCell_ () |> Option.map( fun (_, col) -> col) |> Option.defaultV 0
            activeRows
            |> Seq.tryFindIndex(fun row -> row.rowId_() = rowId)
            |> Option.iter(fun i ->
                    grid.setActiveCell(i, col)
            ) 

        let inMessagesProcessor (msg: SlickGridInMessage) =
            match msg with
            | SlickGridInMessage.Clear                     -> removeData_ ()
            | SlickGridInMessage.Load(data, columns, keys) -> readData_   data columns keys
            | SlickGridInMessage.Saved(addedRows)          -> savedData_  addedRows
            | SlickGridInMessage.SendData                  -> getSaveData_ () |> SlickGridOutMessage.SaveData |> sendMessage_
            | SlickGridInMessage.SelectRow rowId           -> doEvents <- false
                                                              selectRow_ rowId
                                                              doEvents <- true
                                                              

        let createGrid_ (datav:DataView) (gridElement:Dom.Element) =
            Rop.flow {
                do                               inMessagesProcessor |> SlickGridOutMessage.MessageProcessor  |> sendMessage_
                grid                         <-  new Slick.Grid(gridElement, datav, columns, gridOptions)
                grid.setSelectionModel          (new Slick.CellSelectionModel     ()                   )
                //grid.registerPlugin             (new Slick.CellExternalCopyManager()                   )
                grid.registerPlugin              columnSizePlugin                   
                subscribeGrid_                   grid
                JQuery.JQuery.Of(gridElement).On("resize", fun _ _ -> reRender_()) |> ignore
            } |> Rop.notifyMessages 

        member this.getLength       (                 ) = getLength_       ()
        member this.getItemMetadata (i   : int        ) = getItemMetadata0
        member this.getItems        (                 ) = activeRows |> Array.map (fun row -> row.rowData_())
        member this.getItem         (i   : int        ) = getItem_         i
        member this.addItem         (item: FieldValues) = addItem0_        item |> Rop.notifyMessages 
        member this.push            (                 ) = addItem0_ (emptyItem_ ())
        member this.removeData      (                 ) = removeData_ ()
        member this.readData        (data, cols, keys ) = readData_   data cols keys
        member this.getSaveData     (                 ) = getSaveData_   ()
        member this.savedData       (addedData        ) = savedData_   addedData
        member this.reRender        (                 ) = reRender_   ()
        member this.createGrid      dv el               = createGrid_ dv el



    let GridSync  token (table:Table) =
        let  dataView       = new DataView(None)
        let  saveData()     =
            Server.call {
                let _, columns, _, deleted, changed, added  = dataView.getSaveData()
                let columns = columns |> Array.map(fun col -> col.id)
                let! response, added = Server.SaveDataAR_ token table columns (deleted, changed, added)
                dataView.savedData added
            }
        let readData()      =
            Server.call {
                let! data, columns, keys = Server.FetchQueryDataAR_ token table
                dataView.readData(data, columns, keys)
            }
        let  afterRender el = 
            dataView.createGrid dataView el
            readData()
        let  divGrid  = Div [Attr.Class "flex flexgrow"]
        let  elements = 
            [
                Div[ 
                    Button [Text "reload"] |>! OnClick (fun _ _ -> readData())
                    Button [Text "save"  ] |>! OnClick (fun _ _ -> ())//dataView.saveData())
                ]
                divGrid
            ]
        elements, divGrid, afterRender

    type SimpleGridInMessage  = 
        | Clear
        | SendItems
        | SendColumns
        | SetItems   of obj[] 

    and SimpleGridOutMessage = 
        | ShowInfo         of string * bool
        | MessageProcessor of (SimpleGridInMessage -> unit)
        | Items            of obj[]
        | Columns          of Column[]

    let SimpleGrid columns (data: obj[]) (createNew: obj -> int -> (obj * obj)) (processOutMessage_O: (SimpleGridOutMessage -> unit) option) (gridElement: Dom.Element) =        
        let createNew (item:obj) id =
            let id, item = createNew item id
            item?id <- id
            item
        Rop.flow {
            let sendMessage_  msg = processOutMessage_O |> Option.iter (fun f -> msg |> f)
            let showInfo_ processing msg = (msg, processing) |> SimpleGridOutMessage.ShowInfo |> sendMessage_

            let dataView = Slick.DataView({ Slick.DataViewOptions.inlineFilters = false})
            let grid = Slick.Grid(gridElement, dataView, columns, gridOptions)
//            let columnSizePlugin            = new Slick.AutoColumnSize         ()
            let mutable haveAutoColumnSized = false
            let activeCell_ () =
                let cell = grid.getActiveCell()
                if cell = null 
                then None
                else Some (cell.row, cell.cell)
            let editCell_ ()  =
                grid.editActiveCell ()
            let editCell2_ (c:string) =
                activeCell_ () 
                |> Option.iter(fun (row, _) ->
                    if row >= dataView.getLength() then
                        dataView.addItem         (createNew [||] (dataView.getLength()))
                    let editor                  = grid.getCellEditor()
                    if  editor = null then
                        grid.editActiveCell      (                         )
                )
            let reRender_ ()                =
                if grid.getContainerNode().ClientWidth > 0.0 then
                    if haveAutoColumnSized = false && dataView.getLength() > 1 then
                        haveAutoColumnSized <- true
//                        columnSizePlugin.resizeAllColumns   ()
                grid.render                         ()
            dataView.onRowCountChanged.subscribe (JSEventCallback( fun (event, args) ->
              grid.updateRowCount()
              grid.render()
            ))
            dataView.onRowsChanged.subscribe     (JSEventCallback( fun (event, args) ->
              grid.invalidateRows(args.rows);
              grid.render();
            ))
            dataView.push <- (fun item ->
                dataView.addItem       (createNew item (dataView.getLength()))
            )
            grid.onAddNewRow.subscribe    (JSEventCallback( fun (event, args) ->
                grid.invalidateRow     (dataView.getLength())
                dataView.addItem       (createNew args.item (dataView.getLength()))
                grid.updateRowCount    ()
                reRender_ ()
            ))
            grid.onCellChange.subscribe    (JSEventCallback( fun (event, args) ->
                grid.invalidateRow(args.row);
                let items = dataView.getItems()
                //items.[args.row].[args.cell] <- args.item;
                reRender_ ()
            ))

            let pasteOnce_ (rows: seq<string[]>) (colDefs: Column[]) rS cS maxR maxC =
                rows
                |> Seq.iteri(fun i cols ->
                    if maxR = 0 || i < maxR then
                        let r = rS + i
                        let item = if r < dataView.getLength() 
                                    then dataView.getItem(r)
                                    else r |> createNew [||] 
                        cols
                        |> Seq.iteri(fun j text ->
                            if maxC = 0 || j < maxC then
                                let c = cS + j
                                if c < colDefs.Length && not (isUndefined colDefs.[c].field) then
                                    setJVSProp item                       colDefs.[c].field  text
                        )
                        if r < dataView.getLength()
                        then dataView.updateItem(item?id, item)
                        else dataView.addItem(item)
                )

            let pasteMany_ (rows: seq<string[]>) (range: Slick.Range) =
                let colDefs = grid.getColumns()
                let nRows = rows |> Seq.length
                let nCols = rows |> Seq.map (fun cols -> cols |> Array.length) |> Seq.max
                for     i in range.fromRow .. nRows .. range.toRow do
                    let     mR = if range.fromRow  = range.toRow  then 0 else range.toRow - i + 1
                    for j in range.fromCell .. nCols .. range.toCell do
                        let mC = if range.fromCell = range.toCell then 0 else range.toCell- j + 1
                        pasteOnce_ rows colDefs i j mR mC

            let processPasteData (rangeO: Slick.Range option) (text: string) =
                rangeO
                |> Option.iter(fun range ->
                    let rows =
                        text.Split([|"\n\r"; "\n"; "\r"|], System.StringSplitOptions.None)
                        |> (fun rows -> if rows.Length > 1 && rows.[rows.Length - 1] = "" 
                                        then rows.[0.. rows.Length - 2]
                                        else rows)
                        |> Seq.map(fun row -> row.Split([|"\t"|], System.StringSplitOptions.None) )
                    dataView.beginUpdate()
                    pasteMany_ rows range
                    dataView.endUpdate()
                )

            let createCaptureArea_ (text: string) (processAfter_: string -> unit) =
                let ta = JS.Document.CreateElement("textarea")
                ta?style?position <- "absolute"
                ta?style?left     <- "-2000px"
                ta?style?top      <- gridElement?top
                ta?value          <- text
                gridElement.AppendChild ta |> ignore
                ta |> box |> unbox<Various> |> (fun ta ->
                    ta.select()
                    ta.focus ())
                let processCapture_ () =
                    let text = ta?value
                    gridElement.RemoveChild ta |> ignore
                    processAfter_ text
                JS.SetTimeout processCapture_ 100 |> ignore

            let selectionModel = new Slick.CellSelectionModel()

            let getSelectedRange_ () = 
                let ranges = selectionModel.getSelectedRanges()
                if ranges = [||] 
                then activeCell_() |> Option.map(fun (r, c) -> { Slick.Range.fromRow  = r
                                                                 Slick.Range.fromCell = c
                                                                 Slick.Range.toRow    = r
                                                                 Slick.Range.toCell   = c})
                else Some ranges.[0]

            let getSelectedText_ () =
                getSelectedRange_()
                |> Option.map(fun range ->
                    let colDefs = grid.getColumns()
                    [ for i in range.fromRow .. range.toRow do
                        if i < dataView.getLength() then
                            let item = dataView.getItem(i)
                            yield
                                [ for j in range.fromCell .. range.toCell do 
                                    if j < colDefs.Length && not (isUndefined colDefs.[j].field)  then
                                        yield item |> prop                    colDefs.[j].field 
                                ] |> String.concat "\t"
                    ] |> String.concat "\n"
                ) |> Option.defaultV ""

            let clearRange_ (rangeO: Slick.Range option) =
                rangeO
                |> Option.iter(fun range ->
                    dataView.beginUpdate()
                    let colDefs = grid.getColumns()
                    for i in range.fromRow .. range.toRow do
                        if i < dataView.getLength() then
                            let item = dataView.getItem(i)
                            for j in range.fromCell .. range.toCell do 
                                if j < colDefs.Length && not (isUndefined colDefs.[j].field) then
                                    setJVSProp item                       colDefs.[j].field  ""
                            dataView.updateItem(item?id, item)
                    dataView.endUpdate()
                )

            let getCellEditor_ () = grid.getCellEditor() |> box |> unbox<Various>

            let pasteData_  () = 
                match getCellEditor_() with
                | editor when editor = null || editor.getValue() = "" 
                                            -> getSelectedRange_() |> processPasteData  |> createCaptureArea_ ""
                | _                         -> ()

            let copyData_   processAfter = 
                match getCellEditor_() with
                | editor when editor = null -> getSelectedText_ () |> (fun text -> createCaptureArea_ text processAfter)
                | _                         -> ()

            let deleteData_ () = 
                match getCellEditor_() with
                | editor when editor = null -> let range = getSelectedRange_()
                                               match range with
                                               | Some(r) when r.fromCell = 0 
                                                           && r.toCell   = columns.Length - 1 -> [r.fromRow .. r.toRow] |> Seq.map (fun i -> dataView.getItem(i)?id) |> Seq.iter dataView.deleteItem
                                               | Some(r)                                      -> clearRange_ range
                                               | _                                            -> ()
                | _                         -> ()

            grid.onKeyDown.subscribe      (new JSEventCallback( fun (event, args) ->
                    match event.key , event.ctrlKey, event.altKey with
                    | ("Insert", false, true )
                    | ("V"     , true , false)
                    | ("v"     , true , false) -> pasteData_  ()
                    | ("Insert", true , false)
                    | ("C"     , true , false)
                    | ("c"     , true , false) -> copyData_   (fun _ -> ()           )
                    | ("Delete", false, true )
                    | ("X"     , true , false)
                    | ("x"     , true , false) -> copyData_   (fun _ -> deleteData_())
                    | ("Delete", false, false) -> deleteData_ ()
                    | ("F2"    , false, false) -> editCell_   ()
                    | (c       , false, false) when c.Length = 1 
                                               -> editCell2_ c
                    | _                        -> ()
            ))
            grid.setSelectionModel          ( selectionModel                  )

            //selectionModel.xxx
//            grid.registerPlugin             (new Slick.CellExternalCopyManager()                   )
//            grid.registerPlugin             columnSizePlugin                   
            JQuery.JQuery.Of(gridElement).Bind("resize", fun _ _ -> reRender_() ; grid.autosizeColumns()) |> ignore
            let setItems data = 
                data
                |> Array.iteri(fun i item -> 
                    item?id <- i
                )
                dataView.setItems data
            setItems data
            grid.autosizeColumns()
            let inMessagesProcessor (msg: SimpleGridInMessage) =
                match msg with
                | SimpleGridInMessage.SendItems      -> dataView.getItems() |> SimpleGridOutMessage.Items |> sendMessage_
                | SimpleGridInMessage.Clear          -> dataView.setItems [||] ; grid.autosizeColumns()
                | SimpleGridInMessage.SetItems  data -> setItems data; grid.invalidateAllRows(); reRender_(); grid.autosizeColumns()
                | SimpleGridInMessage.SendColumns    -> grid.getColumns() |> SimpleGridOutMessage.Columns |> sendMessage_
            inMessagesProcessor |> SimpleGridOutMessage.MessageProcessor |> sendMessage_
        }

