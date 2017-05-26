//#load /FScript/Layouts.fsx
#load          @"Layouts.fsx"
//#load /FScript/menu.fsx
#load          @"menu.fsx"


namespace CIPHERSpace

open WebSharper
open WebSharper.JavaScript
open Model
open Model2
open Rop
open ReactHtml

[<JavaScript>]
module TreeElement =

    let mutable generation = 1
    
    type Props     = { 
                       content      : CipherNode
                       expanded     : bool           
                       level        : int
                       hasChildren  : bool
                       toggleExpand : (unit -> unit)
                       layout       : (CipherNode seq -> CipherNode    ) option
                     }

    type Model     = App.Dummy
    let  init      = App.DummyNew
    type Message   =  | Dummy
    let update (props: Props) (msg: Message)  model = match msg with | Dummy -> model

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        generation <- generation + 1
        let layout = props.layout |> Option.defaultV Div
        let symbol = match (props.hasChildren, props.expanded) with
                     | false, _     -> "\uE235 "
                     | true , true  -> "\uE114 " 
                     | true , false -> "\uE080 "
        [  _Style [ _overflow "hidden" ; _textOverflow "ellipsis" ]
           Div [ _Style [ _display "flex" ]
                 Span [ NText symbol; _Style [ _fontFamily "Glyphicons Halflings"
                                               _fontSize   "11px"
                                               _cursor     "pointer"
                                               _paddingLeft (sprintf "%dch" (props.level * 4)) ] ]
                 props.content |> addAttributes [ _Style [_flexGrow 1 ] ]
           ]
           |> OnClick     props.toggleExpand
           |> Hoverable.make [ _Style [ _background "#e6e6e6" ] ]
        ] |> List.toSeq |> layout 

    let app = App.App(init, update, view)

    let next content hasChildren expanded level onClick nextNodeO = 
        app.node { 
            content      = content
            expanded     = expanded   
            level        = level      
            hasChildren  = hasChildren
            toggleExpand = onClick    
            layout       = nextNodeO
        }

    let next2 nextNodeO (content, hasChildren, expanded, level, onClick) = next content hasChildren expanded level onClick nextNodeO

    let memoize f = 
        let cache = ref Map.empty
        fun x -> 
            match (!cache).TryFind(x) with
            | Some res -> res
            | None -> 
                 let res = f x
                 cache := (!cache).Add(x,res)
                 res


    let nextX content onClick nextNodeO (hasChildren, expanded, level) = next content hasChildren expanded level onClick nextNodeO
    let nextM content onClick nextNodeO = memoize (nextX content onClick nextNodeO)

    let nextU content hasChildren expanded level onClick nextNodeO = nextM content onClick nextNodeO <| (hasChildren, expanded, level)


[<JavaScript>]
module TreeElements =

    type RowId = RowId of System.IComparable

    type ITreeEntry =
        abstract member id       : RowId
        abstract member name     : string
        abstract member children : ITreeEntry seq
        abstract member layout   : (CipherNode * bool * bool * int * (unit -> unit) -> CipherNode) option
                                     
    and  TreeDetail = {              
                        entry        : ITreeEntry
                        expanded     : bool
                        level        : int
                      }              
                                     
    type Props =      { elements     : TreeDetail seq
                        setExpanded  : RowId -> bool -> unit
                        layout       : (CipherNode seq -> CipherNode) option
                      }

    let text name = Span [ NText (name) ; _Style [ _paddingRight "1ch" ] ; Draggable true ]   

    let node props : CipherNode =
        let layout       = props.layout       |> Option.defaultV Div
        let elemView (elem: TreeDetail) =
            let entryLayout = elem.entry.layout |> Option.defaultV (fun (content, hasChildren, expanded, level, onClick) -> TreeElement.next content hasChildren expanded level onClick None)
            entryLayout  ( elem.entry.name |> text
                         , elem.entry.children |> Seq.isEmpty |> not
                         , elem.expanded
                         , elem.level
                         , (fun _ -> not elem.expanded |> props.setExpanded elem.entry.id)
                         )
        props.elements |> Seq.map elemView |> Seq.toList |> layout

    let next elements setExpanded nextNodeO = 
        node { 
            elements     = elements
            setExpanded  = setExpanded
            layout       = nextNodeO
        }


[<JavaScript>]
module TreeView =

    type ITreeEntry  = TreeElements.ITreeEntry
    type TreeDetail  = TreeElements.TreeDetail

    let rec flat (elements: ITreeEntry seq) =
        elements |> Seq.collect (fun elem ->
                        seq [
                            yield  elem
                            yield! flat elem.children
                        ]
            )

    type Props     = { elements     : ITreeEntry seq 
                       layout       : (TreeDetail seq * (TreeElements.RowId -> bool -> unit) * (unit -> unit) 
                                                                                             * (unit -> unit) 
                                                                                             * (unit -> unit) 
                                                                                             * (unit -> unit) -> CipherNode) option
                     }
    type Model     = { expanded     : Set<TreeElements.RowId> }
    let init       = { expanded     = Set []                  }
    type Message   =                
        | SetExpanded of TreeElements.RowId * bool
        | Expand      of Set<TreeElements.RowId>
        | Collapse    of Set<TreeElements.RowId>
    let update (props: Props) (msg: Message)  model = 
        match msg with 
        | SetExpanded  (id, exp) -> { model with expanded = if exp then Set.add else Set.remove 
                                                            <| id <| model.expanded }
        | Expand       elems     -> { model with expanded = model.expanded + elems }
        | Collapse     elems     -> { model with expanded = model.expanded - elems }

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        let setExpanded id exp   = (id, exp) |> SetExpanded |> processMessages
        let elementsSet elements = elements |> Seq.map (fun (elem: ITreeEntry) -> elem.id) |> Set
        let expandOne   ()       = props.elements |> flat |> Seq.filter (fun elem -> Set.contains elem.id model.expanded) |> elementsSet |> Expand   |> processMessages
        let collapseOne ()       = props.elements |> flat |> Seq.filter (fun elem -> Set.contains elem.id model.expanded) |> elementsSet |> Collapse |> processMessages
        let expandAll   ()       = props.elements |> flat |> elementsSet |> Expand   |> processMessages
        let collapseAll ()       = props.elements |> flat |> elementsSet |> Collapse |> processMessages
        let rec elemRows level (elems: ITreeEntry seq) =
            elems
            |> Seq.collect (fun elem ->
                let hasChildren = elem.children |> Seq.isEmpty |> not
                let expanded    = Set.contains elem.id model.expanded 
                let item = { TreeDetail.entry    = elem
                             TreeDetail.expanded = expanded
                             TreeDetail.level    = level
                           }
                if hasChildren && expanded
                then Seq.append [ item ] (elem.children |> elemRows (level + 1))
                else seq [item] 
            )
        let elements = props.elements |> elemRows 0
        let layout = props.layout |> Option.defaultV (fun (elements, setExpanded, expandOne, collapseOne, expandAll, collapseAll) -> 
                                                               TreeElements.next elements setExpanded None)
        (elements, setExpanded, expandOne, collapseOne, expandAll, collapseAll) |> layout 

    let app = App.App(init, update, view)

    let next elements nextNodeO =
        app.node {
            elements = elements
            layout   = nextNodeO
        }

(*[<JavaScript>]
module DimTree =
    
    type ElemEntry = {
                       id          : System.Guid
                       name        : string
                       description : string option
                       order       : string option
                       attributes  : string list
                       children    : ElemEntry list
                     }

    type Props     = { elements    : ElemEntry list 
                       attributes  : string    list }
                   
    type Model     = { 
                       elements    : ElemEntry list
                       expanded    : Set<System.Guid>
                       selection   : (System.Guid * System.Guid) option * (int * int) option
                       capturing   : bool
                       dragged     : bool
                       editor      : (float * float * float * float * string option * (unit -> unit) option) option
                     }
                   
    let init       = {
                       elements   = []
                       expanded   = Set []
                       selection  = None, None
                       capturing  = false
                       dragged    = false
                       editor     = None
                     }

    type FieldVal =
        | FCode        of string
        | FDescription of string option
        | FOrder       of string option
        | FAttribute   of int * string

    type Message =
        | SetElements        of ElemEntry list
        | SetExpanded        of System.Guid * bool
        | SetSelection       of (System.Guid * System.Guid) option * (int * int) option
        | SetEndSelection    of System.Guid option * int
        | StartSelection     of System.Guid option * int
        | EndSelection       of System.Guid option * int
        | SetEditor          of (float * float * float * float * string option * (unit -> unit) option) option
        | SetValue           of System.Guid * FieldVal

    let double a = a |> Option.map(fun a -> a, a)

    let replaceValue (elements:ElemEntry list) idItem vrf =
        let rec replace (elements:ElemEntry list) idOriginal =
            elements
            |> List.mapFold (fun idO elem ->
                match idO with
                | None                       -> elem, None
                | Some(id) when elem.id = id -> match vrf with
                                                | FCode            v   -> { elem with name        = v  }
                                                | FDescription     vO  -> { elem with description = vO }
                                                | FOrder           vO  -> { elem with order       = vO }
                                                | FAttribute   (i, v ) -> { elem with attributes  = elem.attributes |> List.mapi (fun n x -> if n = i then v else x) }
                                                , None
                | _                          -> let children, newIdO = replace elem.children idO
                                                if newIdO = None then { elem with children = children }
                                                else elem
                                                , newIdO
              ) idOriginal
        let result, _ = replace elements (Some idItem)
        result

    let update (props: Props) (msg: Message)  model =
        let endSelection r c      = match r, model.selection with
                                    | Some (id), (Some(id1, id2), Some(c1, c2)) -> { model with selection = Some(id1, id), Some(c1, c)}
                                    | _        , (None          , Some(c1, c2)) -> { model with selection = None         , Some(c1, c)}
                                    | _                                         -> model
                                    |> fun model' -> { model' with dragged = true }
        match msg with
        | SetElements       elsO -> { model with elements     = elsO }
        | SetSelection    (a, b) -> { model with selection    = a, b }
        | StartSelection  (a, b) -> { model with selection    = double a, Some(b, b) ; capturing = true; dragged = (double a, Some(b, b)) <> model.selection }
        | SetEndSelection (r, c) -> endSelection r c
        | EndSelection    (r, c) -> endSelection r c |> (fun model -> { model with capturing = false})
        | SetEditor         edit -> { model with editor       = edit }
        | SetExpanded  (id, exp) -> { model with expanded     = if exp then Set.add else Set.remove 
                                                                <| id <| model.expanded }
        | SetValue     (id, vrf) -> { model with elements = replaceValue model.elements id vrf }

    [< Inline "$f.call($this, $p1)" >]
    let call f this p1 = X<_>

    let focus e = call e?focus e null

    let preventDefault ev = call ev?preventDefault  ev      null |> ignore

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        let elements = model.elements

        let rec elemRows level (elems: ElemEntry seq) =
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
                then Seq.append [ item ] (elem.children |> elemRows (level + 1))
                else seq [item] 
            )
    
        let getCurrentId1 =
            match model.selection with
            | Some(id1, id2), _ -> Some id1
            | _                 -> None
    
        let getCurrentId2 =
            match model.selection with
            | Some(id1, id2), _ -> Some id2
            | _                 -> None
    
        let getFirstId = elements               |> Seq.tryHead |> Option.map (fun  elem           -> elem.id)
        let getLastId  = elements |> elemRows 0 |> Seq.tryLast |> Option.map (fun (elem, _, _, _) -> elem.id)
    
        let getPriorId0 currId =
            let rows = lazy elemRows 0 elements 
            currId |> Option.bind(fun id ->
                rows.Value 
                |> Seq.tryFindIndex(fun (elem, _, _, _) -> elem.id = id) 
                |> function | Some i when i > 0 -> Some (i - 1) | _ -> None
                |> Option.map (fun j -> Seq.item j rows.Value |> function (elem, _, _, _) -> elem.id)
            )
    
        let getNextId0 currId =
            let rows = lazy elemRows 0 elements 
            currId |> Option.bind(fun id ->
                rows.Value 
                |> Seq.tryFindIndex(fun (elem, _, _, _) -> elem.id = id) 
                |> function | Some i when i + 1 < (Seq.length rows.Value) -> Some (i + 1) | _ -> None
                |> Option.map (fun j -> Seq.item j rows.Value |> function (elem, _, _, _) -> elem.id)
            )
    
        let getCurrentCol1 =
            match model.selection with
            | _, Some(a, b) -> Some a
            | _             -> None
    
        let getCurrentCol2 =
            match model.selection with
            | _, Some(a, b) -> Some b
            | _             -> None
    
        let getFirstCol  = 1
        let getLastCol   = props.attributes.Length + 3
    
        let getPriorCol0 currCol = getFirstCol |> (fun x -> currCol |> Option.bind(fun i -> if i <= x then None else Some (i - 1)))
        let getNextCol0  currCol = getLastCol  |> (fun x -> currCol |> Option.bind(fun i -> if i >= x then None else Some (i + 1)))
    
        let getPriorId1  = getCurrentId1  |> getPriorId0  
        let getPriorId2  = getCurrentId2  |> getPriorId0  
        let getNextId1   = getCurrentId1  |> getNextId0   
        let getNextId2   = getCurrentId2  |> getNextId0   
        let getPriorCol1 = getCurrentCol1 |> getPriorCol0 
        let getPriorCol2 = getCurrentCol2 |> getPriorCol0 
        let getNextCol1  = getCurrentCol1 |> getNextCol0  
        let getNextCol2  = getCurrentCol2 |> getNextCol0  
    
        let closeEditor processMessages : unit = SetEditor None |> processMessages
        let handleKeyEdit (setV: string->unit) (ev:obj) =
            match (ev?key |> unbox, ev?shiftKey, ev?ctrlKey, ev?altKey) with
            | ("Escape"    , _    , _    , _    ) ->                           closeEditor processMessages
            | ("Enter"     , _    , _    , _    ) -> ev?target?value |> setV ; closeEditor processMessages
            | ("ArrowUp"   , false, false, false) -> ev?target?value |> setV ; closeEditor processMessages
                                                     getPriorId1     |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 |> double)              |> processMessages)
            | ("ArrowDown" , false, false, false) -> ev?target?value |> setV ; closeEditor processMessages
                                                     getNextId1      |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 |> double)              |> processMessages)
            | _                                   -> ()
    
        let getClientRect (ev:obj) : obj = call ev?target?getBoundingClientRect ev?target null 
        let openEditor    (ev:obj) v processMessages : unit = getClientRect ev |> (fun r -> r?left, r?top, r?width, r?height, Some v, None) |> Some |> SetEditor |> processMessages
        let handleKeyGrid setV origV (ev:obj) =
            preventDefault ev
            match (ev?key |> unbox, ev?shiftKey, ev?ctrlKey, ev?altKey) with
            | ("Escape"    , _    , _    , _    ) -> SetSelection(None, None) |> processMessages
            | ("Delete"    , false, false, false) -> setV ""
            | ("ArrowUp"   , false, false, false) -> getPriorId1  |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 |> double)              |> processMessages)
            | ("ArrowDown" , false, false, false) -> getNextId1   |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 |> double)              |> processMessages)
            | ("ArrowLeft" , false, false, false) -> getPriorCol1 |> Option.iter (fun c  -> SetSelection(getCurrentId1 |> double, Some(c , c ))               |> processMessages)
            | ("ArrowRight", false, false, false) -> getNextCol1  |> Option.iter (fun c  -> SetSelection(getCurrentId1 |> double, Some(c , c ))               |> processMessages)
            | ("ArrowUp"   , false, true , false) -> getFirstId   |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 |> double)              |> processMessages)
            | ("ArrowDown" , false, true , false) -> getLastId    |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 |> double)              |> processMessages)
            | ("ArrowLeft" , false, true , false) -> getFirstCol  |>             (fun c  -> SetSelection(getCurrentId1 |> double, Some(c , c ))               |> processMessages)
            | ("ArrowRight", false, true , false) -> getLastCol   |>             (fun c  -> SetSelection(getCurrentId1 |> double, Some(c , c ))               |> processMessages)
            | ("ArrowUp"   , true , false, false) -> getPriorId2  |> Option.iter (fun id -> getCurrentCol2 |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowDown" , true , false, false) -> getNextId2   |> Option.iter (fun id -> getCurrentCol2 |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowLeft" , true , false, false) -> getPriorCol2 |> Option.iter (fun c  -> getCurrentId2  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowRight", true , false, false) -> getNextCol2  |> Option.iter (fun c  -> getCurrentId2  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowUp"   , true , true , false) -> getFirstId   |> Option.iter (fun id -> getCurrentCol2 |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowDown" , true , true , false) -> getLastId    |> Option.iter (fun id -> getCurrentCol2 |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowLeft" , true , true , false) -> getFirstCol  |>             (fun c  -> getCurrentId2  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowRight", true , true , false) -> getLastCol   |>             (fun c  -> getCurrentId2  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
            | (v           , false, false, false) 
                                when v.Length = 1 -> openEditor ev     v processMessages
            | ("F2"        , false, false, false) -> openEditor ev origV processMessages
            | _                                   -> ()
    
        let addMoreFields idO rowSelected fields (tag: CipherNode list -> CipherNode) =
            fields
            |> List.mapi (fun i (v, setV) ->
                  let i1 = i + 1
                  let selected = rowSelected && match model.selection with
                                                | _            , Some(a, b) -> (i1 >= a && i1 <=b) || (i1 >= b && i1 <= a)
                                                | _                         -> false
                  let current  = rowSelected && match model.selection with
                                                | Some(id1, _) , Some(a, b) -> Some id1 = idO && i1 = a
                                                | _                         -> false
                  let editor, width, height, handleKey, focus =
                      match current, model.editor with
                      | true , Some (x, y, width, height, vO, _) -> true , width, height, (handleKeyEdit setV  ), vO |> Option.map (fun v -> (fun e -> e?value <- v; focus e; Some (x, y, width, height, None, Some (fun () -> e?value |> setV ; closeEditor processMessages)) |> SetEditor |> processMessages)) |> Option.defaultV focus
                      | _    , _                                 -> false,    0.,     0., (handleKeyGrid setV v), focus
                  let mouseDown, mouseUp, mouseMove =
                      match editor, model.capturing with
                      | true, _     -> null, null, null
                      | _   , true  -> (fun ev -> preventDefault ev
                                                  (idO, i1) |> EndSelection    |> processMessages) :> obj
                                     , (fun ev -> (idO, i1) |> EndSelection    |> processMessages
                                                  if not model.dragged then openEditor ev v processMessages) :> obj
                                     , (fun _  ->  (idO, i1) |> SetEndSelection |> processMessages) :> obj
                      | _   , false -> (fun ev -> preventDefault ev
                                                  match model.editor with | Some (x, y, w, h, v, Some f) -> f() | _ -> ()
                                                  (idO, i1) |> (if ev?shiftKey then EndSelection else StartSelection)  |> processMessages) :> obj
                                      , null, null
                  let ifCurrent =
                      if current then
                          addAttributes [ TabIndex "1" ; _Style [ _background "#F3F3F3" ; _border "1px solid"  ] ]
                          >> OnAfterRender focus
                          >> OnKeyDown   handleKey 
                      else id
                  if editor then
                    tag [ Input [ Type "text" ; _Style [ _width width ; _height height ] ] |> ifCurrent ]
                  else
                    tag [ NText v  
                          _Style [  yield _paddingLeft  "0.5ch"
                                    yield _paddingRight "0.5ch"
                                    yield _overflow     "hidden"
                                    yield _textOverflow "ellipsis"
                                    if selected then
                                         yield _background (if model.capturing then  "#fb1009" else "#b7ddfd") 
                                         yield _border "1px dotted"
                                    else yield _border "1px dotted transparent"]
                        ] |> ifCurrent
                  |> OnMouseDown mouseDown
                  |> OnMouseMove mouseMove
                  |> OnMouseUp   mouseUp
               )
            |> addChildren 

        let setV id fVal (v: string) = 
            let vO = if v.Trim() = "" then None else v.Trim() |> Some
            (id, fVal vO) |> SetValue |> processMessages
        let FAtt i v = FAttribute(i, v |> Option.defaultV "")
        let elemView priorRowSelected (elem: ElemEntry, expanded, symbol, level) =
            let fields = [ elem.name                                  , setV elem.id (Option.defaultV "" >> FCode) ; 
                          (elem.description |> Option.defaultV "")    , setV elem.id FDescription                  ;
                          (elem.order       |> Option.defaultV "")    , setV elem.id FOrder                        ]
                       @ ( elem.attributes  |> List.mapi (fun i a -> a, setV elem.id (FAtt i)) )
            let isRowSelected     = match model.selection with 
                                    | (None      , Some(_, _))                                 -> true
                                    | (Some(a, b), _         ) when a = elem.id || b = elem.id -> true
                                    | _                                                        -> priorRowSelected
            let isNextRowSelected = match model.selection with 
                                    | (Some(a, b), _         ) when a = elem.id && b = a       -> false
                                    | (Some(a, b), _         ) when a = elem.id || b = elem.id -> not priorRowSelected
                                    | _                                                        -> isRowSelected
            Tr [ Td [  _Style [ _overflow "hidden" ; _textOverflow "ellipsis" ]
                       Div [ NText symbol ; _Style [ _display    "inline"
                                                     _fontFamily "Glyphicons Halflings"
                                                     _fontSize   "11px"
                                                     _cursor     "pointer"
                                                     _paddingLeft (sprintf "%dch" (level * 4)) ] ]
                          |> OnClick     (fun _ -> (elem.id, not expanded) |> SetExpanded |> processMessages)
                          |> Hoverable.make [ _Style [ _background "#e6e6e6" ] ]
                       Div [ NText (elem.name) ; _Style [ _display "inline" ; _paddingRight "1ch" ] ; Draggable true ]
                    ]
               ]
            |> addMoreFields (Some elem.id) isRowSelected fields Td
            , isNextRowSelected
        let dummy (v:string) = ()
        let renderDim =
            let fieldNames = [ "Code", dummy ; "Description", dummy ; "Order", dummy ] 
                           @ ( props.attributes |> List.map (fun t -> t, dummy) )
            Table [ _Style [ _whiteSpace "nowrap"; _margin "5px" ; _overflow "auto" ]
                    THead [
                      Tr [ Th [ NText "Element"     ; _Style [ _paddingLeft "3ch" ] ] ]
                      |> addMoreFields None false fieldNames Th
                    ]
                    TBody (elements |> elemRows 0 |> Seq.mapFold elemView false |> fst ) 
                  ]
        match model.elements with
        | [] when props.elements.Length > 0 -> Util.waitImg |> OnAfterRender (fun _ -> props.elements |> SetElements |> processMessages) 
        | _ -> renderDim

    let app = App.App(init, update, view)
*)

[<JavaScript>]
module GridCell =

    type CellState = 
        | Idle
        | Current
        | Selected
        | Capturing
        | Editing of float * float * string option

    type DataIdX = 
         | IdFieldN   of int
         | IdFieldT   of string
         | IdFieldObj of System.IComparable
         | IdTextX
         | IdTextReturn
         | IdCellStateX
         | IdNewEntryX

    type DCellText  = DCellText  of DataTube.Cell<string   , DataIdX, DataIdX>
      with 
        member this.getDataO              = match this with DCellText cell -> cell.getDataO        
        member this.setOnly        v      = match this with DCellText cell -> cell.setOnly         v
        member this.setAndTrigger  v      = match this with DCellText cell -> cell.setAndTrigger   v
        member this.setData        v      = match this with DCellText cell -> cell.setData         v
        member this.subscribe   listenKey = match this with DCellText cell -> cell.subscribe       listenKey
        member this.subCell subKey        = match this with DCellText cell -> cell.subCell         subKey
        member this.getData               = match this with DCellText cell -> cell.getDataO() |> Option.defaultV ""
        member this.cellState             = DCellState (this.subCell IdCellStateX)

    and  DCellState = DCellState of DataTube.Cell<CellState, DataIdX, DataIdX>
      with 
        member this.getDataO              = match this with DCellState cell -> cell.getDataO        
        member this.setOnly        v      = match this with DCellState cell -> cell.setOnly         v
        member this.setAndTrigger  v      = match this with DCellState cell -> cell.setAndTrigger   v
        member this.setData        v      = match this with DCellState cell -> cell.setData         v
        member this.subscribe   listenKey = match this with DCellState cell -> cell.subscribe       listenKey
        member this.subCell subKey        = match this with DCellState cell -> cell.subCell         subKey
        member this.getData               = match this with DCellState cell -> cell.getDataO() |> Option.defaultV Idle

    type Props     = {
                       text       : DCellText
                       cellState  : DCellState
                       editNotify : (obj -> unit) option
                       layout     : (CipherNode seq -> CipherNode) option
                     }
                   
    type Model     = { initEdit   : bool  }
                   
    let init       = { initEdit   = false }

    type Message = 
        | SetInitEdit  of bool
        | Dummy
//        | SetState     of CellState
//        | SetText      of string
//        | SetStateText of CellState * string

    let update (props: Props) (msg: Message)  model =
        match msg with
        | SetInitEdit init     -> { model with initEdit = init }
        | Dummy                -> model

    let focus  e = call e?focus  e null
    let select e = call e?select e null

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        do  props.text.subscribe      IdTextX      (fun _ -> Dummy            |> processMessages)
        do  props.cellState.subscribe IdCellStateX (fun _ -> SetInitEdit true |> processMessages)
        let text      = props.text.getData
        let cellState = props.cellState.getData
        let layout    = props.layout |> Option.defaultV Div
        let afterRender : (obj -> unit) option =
            match cellState with
                 | Editing (width, height, vO) when model.initEdit -> Some (fun e -> e?value <- vO |> Option.defaultV text ; props.editNotify |> Option.iterF e ; SetInitEdit false |> processMessages)
                 | Current      
                 | Editing _ -> Some focus
                 | _         -> None
        let modifiers =
            match cellState with
            | Editing _
            | Current   -> addAttributes [ _Style [ _border "1px solid"  ; _background "#F3F3F3" ] ; TabIndex "1" ]
            | Selected  -> addAttributes [ _Style [ _border "1px dotted" ; _background "#b7ddfd" ] ]
            | Capturing -> addAttributes [ _Style [ _border "1px dotted" ; _background "#fb1009" ] ]
            | _         -> addAttributes [ _Style [ _border "1px dotted transparent"             ] ]
        match cellState with
          | Editing (width, height, initial) -> Input [ Type "text" ; _Style [ _width width ; _height height ] ]
          | _                                -> Div [ NText text
                                                      _Style [  yield _paddingLeft  "0.5ch"
                                                                yield _paddingRight "0.5ch"
                                                                yield _overflow     "hidden"
                                                                yield _textOverflow "ellipsis"
                                                                yield _minWidth     "10ch"
                                                                yield _minHeight    "1.2em"
                                                             ]
                                                    ]
        |> modifiers
        |> (afterRender |> Option.modify (fun f -> OnAfterRender f))
        |> Seq.singleton 
        |> layout

    let app = App.App(init, update, view)

    let node text state editNotify layout = 
        app.node {
                     text       = text
                     cellState  = state
                     editNotify = editNotify
                     layout     = layout
                 }

[<JavaScript>]
module GridRows =

    type IGridEntry =
        abstract member id           : TreeElements.RowId
        abstract member fields       : GridCell.DCellText seq
        abstract member isInsertion  : bool
                                   
    type RowDetail = {             
                        entry        : IGridEntry
                        row          : CipherNode seq
                      }

    type Props =      { 
                        header       : CipherNode seq
                        elements     : RowDetail seq
                        rowLayout    : (CipherNode seq                 -> CipherNode) option
                        layout       : (CipherNode seq * CipherNode seq -> CipherNode) option
                      }

    let node props : CipherNode =
        let rowLayout    =  props.rowLayout  |> Option.defaultV Tr
        let layout       =  props.layout     |> Option.defaultV (fun (h, es) -> Table [ THead [ Tr h ] ; TBody es])
        ( props.header
        , props.elements |> Seq.map (fun elem -> elem.row |> rowLayout) 
        ) |> layout 

    let simpleNode header rows = 
        node { header    = header
               elements  = rows
               rowLayout = None
               layout    = None }

[<JavaScript>]
module GridTable =

    let RowId = TreeElements.RowId

    type RowId = TreeElements.RowId
    type ColId = ColId of System.IComparable

    type CellId = RowId * ColId

    type GridState =
        | Idle
        | Capturing
        | Editing of CellId * float * float * float * float * string option * GridCell.DCellText * obj option
        
    type IGridEntry = GridRows.IGridEntry

    type NextStage = {
                        header          : CipherNode seq
                        rows            : GridRows.RowDetail seq
                        selectedRows    : (IGridEntry seq -> unit) -> unit
                        model           : Model
                        props           : Props
                        processMessages : Message -> unit
                     }               
                                     
    and  Props     = { elements         : IGridEntry seq 
                       columns          : string seq 
                       cellLayout       : (int * CipherNode seq -> CipherNode) option
                       layout           : (NextStage           -> CipherNode) option
                       addElements      : int -> (IGridEntry seq -> unit) -> unit
                     }                  
                                        
    and  Model     = {                  
                       selection        : (RowId * RowId) option * (ColId * ColId) option
                       state            : GridState
                       dragged          : int
                     }
                   
    and  Message =
        | SetSelection    of (RowId * RowId) option * (ColId * ColId) option
        | SetEndSelection of RowId option * ColId
        | StartSelection  of RowId option * ColId
        | EndSelection    of RowId option * ColId
        | SetState        of GridState
        | SetEditorObj    of obj
        | DoThis          of (Model -> unit)

    let init       = {
                       selection      = None, None
                       state          = Idle
                       dragged        = 0
                     }

    let double    a = a  |> Option.map  (fun a -> a, a)

    let createCaptureArea_ (gridElement: WebSharper.JavaScript.Dom.Element) (text: string) (processAfter_: string -> unit) =
        let focused = JS.Document?activeElement
        let ta = JS.Document.CreateElement("textarea")
        ta?style?position <- "absolute"
        ta?style?left     <- "-2000px"
        ta?style?top      <- "0px"
        ta?value          <- text
        gridElement.AppendChild ta |> ignore
        GridCell.select ta
        GridCell.focus  ta
        let processCapture_ () =
            let text = ta?value
            gridElement.RemoveChild ta    |> ignore
            GridCell.focus focused
            processAfter_ text
        JS.SetTimeout processCapture_ 100 |> ignore

    [< Inline "$f.call($this, $p1)" >]
    let call f this p1 = X<_>
    
    let preventDefault ev = call ev?preventDefault  ev      null |> ignore

    let getClientRect (ev:obj) : obj = call ev?target?getBoundingClientRect ev?target null 
    let openEditor    (ev:obj) cellId v (text:GridCell.DCellText) processMessages : unit =
        getClientRect ev 
        |> (fun r -> Editing(cellId, r?left, r?top, r?width, r?height, v, text, None))
        |> SetState |> processMessages

    let closeEditor processMessages : unit = SetState Idle |> processMessages

    let cellState (model: Model) rO rowSelected c =
        let selected = rowSelected && 
                       match model.selection with
                       | _          , Some(a, b) -> (c >= a && c <= b) || (c >= b && c <= a)
                       | _                       -> false
        let current  = rowSelected && 
                       match model.selection with
                       | Some(r1, _), Some(a, b) -> Some r1 = rO && c = a
                       | _                       -> false
        match model.state, current, selected with
        | Editing (_, x, y, width, height, initial, _, _), true, _    -> GridCell.Editing (width, height, initial) 
        | _                                              , true, _    -> GridCell.Current
        | Capturing                                      , _   , true -> GridCell.Capturing
        | _                                              , _   , true -> GridCell.Selected
        | _                                                           -> GridCell.Idle

    let scanFields model f (elem: IGridEntry) rowSelected =
        elem.fields 
        |> Seq.mapi (fun i text -> let state = cellState model (Some elem.id) rowSelected (ColId i)
                                   f elem.id i text state
                    )

    let scanRow (model: Model) (f: IGridEntry -> bool -> 'a) priorRowSelected (elem: IGridEntry) =
        let isRowSelected     = match model.selection with 
                                | (None      , Some(_, _))                                 -> true
                                | (Some(a, b), _         ) when a = elem.id || b = elem.id -> true
                                | _                                                        -> priorRowSelected
        let isNextRowSelected = match model.selection with 
                                | (Some(a, b), _         ) when a = elem.id && b = a       -> false
                                | (Some(a, b), _         ) when a = elem.id || b = elem.id -> not priorRowSelected
                                | _                                                        -> isRowSelected
        f elem isRowSelected
      , isNextRowSelected

    let scanRows (elements: IGridEntry seq) model f =           elements          |> Seq.mapFold (scanRow    model f) false |> fst
    let scanCells elements                  model f = scanRows  elements model                   (scanFields model f)
    let doCells   elements                  model f = scanCells elements model f  |> Seq.collect id |> Seq.iter id

    let update processMessages (props: Props) (msg: Message)  model =
        let endSelection r c = match r, model.selection with
                               | Some (id), (Some(id1, id2), Some(c1, c2)) -> { model with selection = Some(id1, id), Some(c1, c)}
                               | _        , (None          , Some(c1, c2)) -> { model with selection = None         , Some(c1, c)}
                               | _                                         -> model
                               |> fun model' -> { model' with dragged = model.dragged + 1 }
        match msg with
        | DoThis f -> f model ; Choice3Of3 true
        | _ -> let newModel =
                   match msg with
                   | DoThis f               -> model
                   | SetSelection    (a, b) -> { model with selection    = a, b }
                   | StartSelection  (a, b) -> { model with selection    = double a, Some(b, b) ; state = Capturing; dragged = if (double a, Some(b, b)) = model.selection then 0 else 2}
                   | SetEndSelection (r, c) -> endSelection r c
                   | EndSelection    (r, c) -> endSelection r c |> (fun model -> { model with state = Idle})
                   | SetState          s    -> { model with state = s            }
                   | SetEditorObj    obj    -> match model.state with
                                               | Editing (c, x, y, w, h, v, f, _) -> { model with state = Editing (c, x, y, w, h, v, f, Some obj) }
                                               | _                                -> model
               doCells props.elements newModel (fun rId i text state -> 
                                                       match state with
                                                       | GridCell.Current
                                                       | GridCell.Editing _ -> text.cellState.setData state
                                                       | _                  -> text.cellState.setData state)
               newModel |> Choice2Of3

    let pasteSize selection toInt clipsize maxN =
        match selection with
        | Some (p1, p2) -> let i1     = toInt p1 
                           let i2     = toInt p2
                           let sz, i0 = if   i1 = i2 then (clipsize   , i1)
                                        elif i1 < i2 then (i2 - i1 + 1, i1)
                                        else              (i1 - i2 + 1, i2)
                           i0, min (sz + i0 - 1) (maxN - 1)
        | None          -> 0, maxN

    let pasteRegion (props: Props) (model: Model) (nRows, nCols) (maxRows, maxCols) =
        let RowId2I (TreeElements.RowId i) = i :?> int
        let ColId2I (             ColId i) = i :?> int
        match model.selection with
        | None, None -> None
        | rows, cols -> Some(pasteSize rows RowId2I nRows maxRows, pasteSize cols ColId2I nCols maxCols)

    let pasteText (props: Props) (model: Model) (text:string) =
        let pasteCells = text.Split([|"\n\r"; "\n"; "\r"|], System.StringSplitOptions.None)
                         |> (fun rows -> if rows.Length > 1 && rows.[rows.Length - 1] = "" then rows.[0.. rows.Length - 2] else rows)
                         |> Seq.map(fun row -> row.Split([|"\t"|], System.StringSplitOptions.None))
                         |> Seq.toArray
        let nRows = pasteCells.Length
        if  nRows > 0 then
            let insertPoint = scanRows props.elements model 
                              <| (fun row selected -> row.isInsertion)
                              |> Seq.mapi (fun i insertion -> if insertion then Some i else None) |> Seq.tryPick id
            let nCols = pasteCells |> Seq.map Array.length |> Seq.max
            let maxCols =                            props.columns  |> Seq.length
            let maxRows = if insertPoint = None then props.elements |> Seq.length else Microsoft.FSharp.Core.int.MaxValue
            let setCell col1 col2 row1 row2 (cell:GridCell.DCellText) nRow nCol =
                if nCol >= col1 && nCol <= col2 && nRow >= row1 && nRow <= row2 then
                    cell.setData  (match pasteCells.[(nRow - row1) % nRows] |> Array.tryItem ((nCol - col1) % nCols) with 
                                   | Some c -> c
                                   | None   -> "")
            match pasteRegion props model (nRows, nCols) (maxRows, maxCols)  with
            | None                             -> ()
            | Some((row1, row2_), (col1, col2)) ->
                let row2 =
                    match insertPoint with
                    | Some insert when insert >= row1 && insert <= row2_ -> 
                        props.addElements (row2_ - insert + 1) (fun added ->
                            added
                            |> Seq.iteri(fun i row -> 
                                let nRow = insert + i
                                row.fields
                                |> Seq.iteri(fun nCol cell ->
                                    setCell col1 col2 row1 row2_ cell nRow nCol
                                ) 
                            ) 
                        )
                        insert - 1
                    | _   -> row2_
                doCells props.elements
                    <| model 
                    <| fun (TreeElements.RowId nRow_) nCol cell cellState ->
                           let nRow = nRow_ :?> int
                           setCell col1 col2 row1 row2 cell nRow nCol

    let copyText  (elements:IGridEntry seq)  model =
        elements
        |> Seq.filter (fun elem -> not elem.isInsertion)
        |> scanCells 
            <| model
            <| fun rId i cell cellState -> if cellState <> GridCell.Idle then Some cell.getData else None
        |> Seq.filter (Seq.exists ((<>) None)) |> Seq.map (Seq.choose id >> String.concat "\t") |> String.concat "\n"

    let handleKey cellId (text:GridCell.DCellText) (props: Props) (processMessages: Message -> unit) ev (model: Model) =
        let getCurrentId1 =
            match model.selection with
            | Some(id1, id2), _ -> Some id1
            | _                 -> None
    
        let getCurrentId2 =
            match model.selection with
            | Some(id1, id2), _ -> Some id2
            | _                 -> None
    
        let getFirstId  = props.elements |> Seq.tryHead |> Option.map (fun elem -> elem.id)
        let getLastId   = props.elements |> Seq.tryLast |> Option.map (fun elem -> elem.id)
    
        let getPriorId0 (currId:RowId option) : RowId option =
            currId |> Option.bind(fun id ->
                props.elements 
                |> Seq.tryFindIndex(fun elem -> elem.id = id) 
                |> function | Some i when i > 0 -> Some (i - 1) | _ -> None
                |> Option.map (fun j -> Seq.item j props.elements |> function elem -> elem.id)
            )
    
        let getNextId0  (currId:RowId option) : RowId option =
            currId |> Option.bind(fun id ->
                props.elements 
                |> Seq.tryFindIndex(fun elem -> elem.id = id) 
                |> function | Some i when i + 1 < (Seq.length props.elements) -> Some (i + 1) | _ -> None
                |> Option.map (fun j -> Seq.item j props.elements |> function elem -> elem.id)
            )
    
        let getCurrentCol1 =
            match model.selection with
            | _, Some(a, b) -> Some a
            | _             -> None
    
        let getCurrentCol2 =
            match model.selection with
            | _, Some(a, b) -> Some b
            | _             -> None
    
        let getFirstCol  = ColId 0
        let getLastCol   = props.columns |> Seq.length |> (+) -1 :> System.IComparable |> ColId
    
        let getPriorCol0 (currCol:ColId option) : ColId option = getFirstCol |> (fun x -> currCol |> Option.bind(fun (ColId i) -> if (ColId i) <= x then None else Some (ColId (i :?> int - 1))))
        let getNextCol0  (currCol:ColId option) : ColId option = getLastCol  |> (fun x -> currCol |> Option.bind(fun (ColId i) -> if (ColId i) >= x then None else Some (ColId (i :?> int + 1))))
    
        let getPriorId1  = getCurrentId1  |> getPriorId0  
        let getPriorId2  = getCurrentId2  |> getPriorId0  
        let getNextId1   = getCurrentId1  |> getNextId0   
        let getNextId2   = getCurrentId2  |> getNextId0   
        let getPriorCol1 = getCurrentCol1 |> getPriorCol0 
        let getPriorCol2 = getCurrentCol2 |> getPriorCol0 
        let getNextCol1  = getCurrentCol1 |> getNextCol0  
        let getNextCol2  = getCurrentCol2 |> getNextCol0  
    
        let handleKeyEdit (ev:obj) =
            match (ev?key |> unbox, ev?shiftKey, ev?ctrlKey, ev?altKey) with
            | ("Escape"    , _    , _    , _    ) ->                           closeEditor processMessages
            | ("Enter"     , _    , _    , _    ) -> text.setData  ev?target?value ; closeEditor processMessages
            | ("ArrowLeft" , false, false, false) when ev?target?selectionStart = 0 -> 
                                                     text.setData  ev?target?value ; closeEditor processMessages
                                                     getPriorCol1 |> Option.iter (fun c  -> SetSelection(getCurrentId1 |> double, Some(c , c ))               |> processMessages)
            | ("ArrowRight", false, false, false) when ev?target?selectionStart = ev?target?value?length -> 
                                                     text.setData  ev?target?value ; closeEditor processMessages
                                                     getNextCol1  |> Option.iter (fun c  -> SetSelection(getCurrentId1 |> double, Some(c , c ))               |> processMessages)
            | ("ArrowUp"   , false, false, false) -> text.setData  ev?target?value ; closeEditor processMessages
                                                     getPriorId1  |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 |> double)              |> processMessages)
            | ("ArrowDown" , false, false, false) -> text.setData  ev?target?value ; closeEditor processMessages
                                                     getNextId1   |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 |> double)              |> processMessages)
            | _                                   -> ()
    
        let handleKeyGrid (ev:obj) =
            let mutable prevent = true
            match (ev?key |> unbox, ev?shiftKey, ev?ctrlKey, ev?altKey) with
            | ("Escape"    , _    , _    , _    ) -> SetSelection(None, None) |> processMessages
            | ("ArrowUp"   , false, false, false) -> getPriorId1  |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 |> double)              |> processMessages)
            | ("ArrowDown" , false, false, false) -> getNextId1   |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 |> double)              |> processMessages)
            | ("ArrowLeft" , false, false, false) -> getPriorCol1 |> Option.iter (fun c  -> SetSelection(getCurrentId1 |> double, Some(c , c ))               |> processMessages)
            | ("ArrowRight", false, false, false) -> getNextCol1  |> Option.iter (fun c  -> SetSelection(getCurrentId1 |> double, Some(c , c ))               |> processMessages)
            | ("ArrowUp"   , false, true , false) -> getFirstId   |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 |> double)              |> processMessages)
            | ("ArrowDown" , false, true , false) -> getLastId    |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 |> double)              |> processMessages)
            | ("ArrowLeft" , false, true , false) -> getFirstCol  |>             (fun c  -> SetSelection(getCurrentId1 |> double, Some(c , c ))               |> processMessages)
            | ("ArrowRight", false, true , false) -> getLastCol   |>             (fun c  -> SetSelection(getCurrentId1 |> double, Some(c , c ))               |> processMessages)
            | ("ArrowUp"   , true , false, false) -> getPriorId2  |> Option.iter (fun id -> getCurrentCol2 |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowDown" , true , false, false) -> getNextId2   |> Option.iter (fun id -> getCurrentCol2 |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowLeft" , true , false, false) -> getPriorCol2 |> Option.iter (fun c  -> getCurrentId2  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowRight", true , false, false) -> getNextCol2  |> Option.iter (fun c  -> getCurrentId2  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowUp"   , true , true , false) -> getFirstId   |> Option.iter (fun id -> getCurrentCol2 |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowDown" , true , true , false) -> getLastId    |> Option.iter (fun id -> getCurrentCol2 |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowLeft" , true , true , false) -> getFirstCol  |>             (fun c  -> getCurrentId2  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
            | ("ArrowRight", true , true , false) -> getLastCol   |>             (fun c  -> getCurrentId2  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
            | (v           , _    , false, false) 
                                when v.Length = 1 -> openEditor ev cellId (Some v) text processMessages
            | ("F2"        , false, false, false) -> openEditor ev cellId  None    text processMessages
            | ("Delete"    , false, false, false) -> doCells  props.elements (model)     (fun rId i text state -> if state <> GridCell.Idle then      text.setData  "")
            | ("c"         , false, true , false) 
            | ("C"         , false, true , false) -> copyText props.elements (model)
                                                     |> (fun text -> createCaptureArea_ ev?target text (fun _-> ()))
                                                     prevent <- false
            | ("v"         , false, true , false) 
            | ("V"         , false, true , false) -> createCaptureArea_ ev?target "" <| pasteText props (model)
                                                     prevent <- false
            | _                                   -> ()
            if prevent then preventDefault ev
    
        match model.state with
        | Editing _ -> handleKeyEdit ev
        | _         -> handleKeyGrid ev

 //; Some (x, y, width, height, None, Some (fun () -> setVO |> Option.iterF e?value ; closeEditor processMessages)) |> SetEditor |> processMessages))

    let mouseDown (rO, c) (processMessages: Message -> unit) (ev:obj) (model: Model) =
        match model.state with 
        | Editing ((rE, cE), x, y, w, h, v, text, oO)
           when (Some rE, cE) <> (rO, c)       -> oO |> Option.iter (fun o -> text.setData  o?value) ; closeEditor processMessages
                                                  (rO, c) |>                                        StartSelection  |> processMessages
        | Capturing                            -> (rO, c) |>                      EndSelection                      |> processMessages
                                                  preventDefault ev
        | Idle                                 -> (rO, c) |> (if ev?shiftKey then EndSelection else StartSelection) |> processMessages
                                                  preventDefault ev
        | _                                    -> preventDefault ev
        
    let mouseMove (rO, c) (processMessages: Message -> unit) (ev:obj) (model: Model) =
        match model.state with 
        | Capturing -> (rO, c) |> SetEndSelection |> processMessages
        | _         -> ()
        
    let mouseUp (rO, c) (text: GridCell.DCellText) (processMessages: Message -> unit) (ev:obj) (model: Model) =
        match model.state with 
        | Capturing -> (rO, c) |> EndSelection |> processMessages
                       if model.dragged < 2 then rO |> Option.iter (fun r -> openEditor ev (r, c) (Some text.getData) text processMessages)
        | _         -> ()

    let renderField processMessages props model (cellLayout: (int * CipherNode seq) -> CipherNode) rO i (text: GridCell.DCellText) state =
        let inline doThis f = f |> DoThis |> processMessages
        let cellState = text.cellState
        cellState.setOnly state
        let c = ColId i
        let freshModel() = model?__ref |> fun (mail:App.MailboxState<Model>) -> mail.latestModel
        let cellLayout2 s = 
            cellLayout (i, s)
            |> OnMouseDown      (fun ev -> mouseDown            (rO, c)               processMessages ev <| freshModel() )
            |> OnMouseMove      (fun ev -> mouseMove            (rO, c)               processMessages ev <| freshModel() )
            |> OnMouseUp        (fun ev -> mouseUp              (rO, c) text          processMessages ev <| freshModel() )
            |> OnKeyDown        (fun ev -> handleKey (Option.get rO, c) text    props processMessages ev <| freshModel() )
            |> OnClick          (fun ev -> match freshModel().state with
                                           | Editing _ -> ()
                                           | _         ->  call ev?stopPropagation ev ()
                                                           preventDefault ev
                                )
        GridCell.node text cellState (Some (SetEditorObj >> processMessages)) (Some cellLayout2)

    let getSelectedRows (props: Props) f (model: Model) =
        scanRows props.elements model (fun entry selected -> if selected then Some entry else None)
        |> Seq.choose id
        |> f

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        let cellLayout = props.cellLayout |> Option.defaultV (fun (i,s) -> Td s)
        let layout          = props.layout   |> Option.defaultV (fun {header = header; rows = rows} -> GridRows.simpleNode header rows)
        let tubeHeader      = DataTube.Tube<int, GridCell.DataIdX>.New "header"
        let header          = props.columns  
                              |> Seq.mapi (fun i title -> 
                                  let text = GridCell.DCellText(tubeHeader.subCell  (GridCell.IdFieldN i))
                                  text.setOnly title
                                  renderField processMessages props model (fun (i,s) -> Th s) None i text GridCell.Idle 
                              )
        let renderRow (elem: GridRows.IGridEntry) (isRowSelected:bool) =
            let render rId = renderField processMessages props model cellLayout (Some rId)
            { 
                GridRows.RowDetail.entry = elem
                GridRows.RowDetail.row   = scanFields model render elem isRowSelected
            }
          , isRowSelected
        let rows = scanRows props.elements  model renderRow
        layout { header          = header
                 rows            = rows |> Seq.map fst
                 selectedRows    = (fun f -> getSelectedRows props f |> DoThis |> processMessages)
                 model           = model
                 props           = props
                 processMessages = processMessages
               }

    let app = App.App(init, update, view)

    let next elements columns addElements cellLayout nextNodeO =
        app.node {
            elements     = elements
            columns      = columns
            addElements  = addElements 
            cellLayout   = cellLayout
            layout       = nextNodeO
        }

[<JavaScript>]
module DimElements =

    type IdElem =
        | IdName
        | IdDescription
        | IdOrder
        | IdAttribute of int


    type ElemEntry (idP          : TreeElements.RowId
                  , nameP        : string
                  , descriptionP : string option
                  , orderP       : string option
                  , attributesP  : string seq
                  , indexP       : int) = 
        let tube                 = DataTube.Tube<GridCell.DataIdX, GridCell.DataIdX>.New(idP)
        let dTextCell idElem     = idElem :> System.IComparable |> GridCell.IdFieldObj |> tube.subCell |> GridCell.DCellText 
        let _name                = IdName                                                          |> dTextCell
        let _description         = IdDescription                                                   |> dTextCell
        let _order               = IdOrder                                                         |> dTextCell
        let _attributes          = attributesP |> Seq.mapi (fun i v -> let cell = i |> IdAttribute |> dTextCell
                                                                       cell.setOnly v
                                                                       cell
                                   ) |> Seq.toArray
        do _name.setOnly         nameP
        do _description.setOnly (descriptionP |> Option.defaultV "")
        do _order.setOnly       (orderP       |> Option.defaultV "")
        member this.id            = idP
        member this.name          = _name
        member this.description   = _description
        member this.order         = _order
        member this.attributes    = _attributes
        member this.index         = indexP
        member this.changed       = _name.getData        <> nameP 
                                 || _description.getData <> (descriptionP |> Option.defaultV "")
                                 || _order.getData       <> (orderP       |> Option.defaultV "")
                                 || Seq.zip _attributes attributesP |> Seq.exists (fun (a,b) -> a.getData <> b)
        new (idP, entry:ElemEntry)= ElemEntry(idP          = idP
                                            , nameP        = entry.name.getData
                                            , descriptionP = Some entry.description.getData
                                            , orderP       = Some entry.order.getData
                                            , attributesP  = (entry.attributes |> Seq.map (fun at -> at.getData))
                                            , indexP       = entry.index
                                             )
        new (idP, nAt, indexP)    = ElemEntry(idP          = idP
                                            , nameP        = ""
                                            , descriptionP = None
                                            , orderP       = None
                                            , attributesP  = List.init nAt (fun _ -> "") 
                                            , indexP       = indexP
                                             )

    type EntryHier = {
                        elem     : ElemEntry
                        children : EntryHier list
    }

    type AddType = | ChildInsert   of GridTable.RowId
                   | ChildAppend   of GridTable.RowId
                   | SiblingAfter  of GridTable.RowId
                   | SiblingBefore of GridTable.RowId
                   | Append 
                   | Insert

    type SimpleTreeEntry(_id, _name, _children, _layout) =
        interface TreeView.ITreeEntry with 
            member this.id          = _id      
            member this.name        = _name    
            member this.children    = _children
            member this.layout      = _layout

    let rec translateEntry (elem: EntryHier) : TreeView.ITreeEntry =
        SimpleTreeEntry( elem.elem.id
                        ,elem.elem.name.getData
                        ,elem.children |> Seq.map translateEntry
                        ,None
        ) :> TreeView.ITreeEntry

    (*let rec translateTableEntry (elem: ElemEntry) : TreeView.ITreeEntry =
        let fields es = seq[ yield  Seq.append es [ elem.name |> TreeElements.text       ] |> Td
                             yield  [ elem.description |> Option.defaultV ""    |> NText ] |> Td
                             yield  [ elem.order       |> Option.defaultV ""    |> NText ] |> Td
                             yield! elem.attributes    |> Seq.map (fun a -> [ a |> NText ] |> Td )
                           ] |> Seq.toList |> Seq.ofList
        SimpleTreeEntry(
             elem.id
            ,elem.name
            ,elem.children |> Seq.map translateTableEntry
            ,None
        ) :> TreeView.ITreeEntry*)

    type NextStage = {
                       elements        : EntryHier list 
                       columns         : string    seq
                       wait            : CipherNode
                       props           : Props
                       model           : Model
                       processMessages : Message -> unit
                       addElements     : int  -> (EntryHier seq -> unit) -> unit
                       getRelations    : unit -> (string * string) seq
                  }
    
    and  Props     = { dimension       : Dimension option
                       layout          : (NextStage -> CipherNode) option
                       addPoint        : AddType option
                     }
                   
    and  Model     = { 
                       dim             : Dimension option
                       name            : string
                       description     : string    option
                       attributes      : string    list
                       elements        : ElemEntry list
                       rels            : Set<GridTable.RowId * GridTable.RowId>
                       original        : ElemEntry list
                       modified        : bool
                       message         : string
                       processing      : bool
                       newId           : int
                       entryNew        : EntryHier
                     }
                   
    and Message =
        | SetDimension       of Dimension option * string * string option * string list * EntryHier
        | SetElementsRels    of ElemEntry list * Set<GridTable.RowId * GridTable.RowId>
        | SetElements        of ElemEntry list
        | SetModified        of bool
        | DeleteElements     of GridTable.RowId seq
        | AddElements        of AddType * ElemEntry seq
        | AddRelation        of GridTable.RowId * GridTable.RowId
        | AddRelations       of (string * string) seq
        | RemoveRelation     of GridTable.RowId * GridTable.RowId
        | Flatten 
        | SetMessage         of string * bool
        | ReloadData
        | LoadData
        | SaveData
        | DoThis             of (Model -> unit)

    let init       = {
                       dim              = None
                       name             = ""
                       description      = None
                       attributes       = []
                       elements         = []
                       original         = []
                       rels             = Set []
                       modified         = false
                       message          = ""
                       processing       = false
                       newId            = 1111
                       entryNew         = { elem = ElemEntry(GridTable.RowId -1, 0, 999999) ; children = [] } 
                     }

    (*let tableTreeViewNode (props: NextStage) =
        let columns = ["Code" ; "Description" ; "Order" ] @ props.model.attributes |> Seq.map (fun col -> Th [ NText col ] )
        TreeView.app.node
            {
              elements     = props.elements |> Seq.map translateTableEntry
              layout       = None
            }*)

    let treeViewNext nextNodeO { wait = wait ; elements = elements } =
        TreeView.app.node {
                  elements        = elements |> Seq.map translateEntry
                  layout          = nextNodeO      
        } |> Util.combineNodes wait

    let deleteElements (ids: GridTable.RowId seq) (elements:ElemEntry list) (rels:Set<GridTable.RowId * GridTable.RowId>)  =
        let result = elements |> List.filter (fun a      -> ids |> Seq.exists ((=) a.id)                   |> not)
        let relsR  = rels     |>  Seq.filter (fun (a, b) -> ids |> Seq.exists (fun id -> id = a || id = b) |> not)
        result, Set relsR

    let newElements (model :Model) (addElems:ElemEntry seq) = 
        addElems 
        |> Seq.mapi(fun i elem -> 
            if elem.id = GridTable.RowId 0 then 
                ElemEntry(GridTable.RowId(model.newId + i), elem) else elem)

    let addElements model (addType:AddType) (addElems:ElemEntry seq) (elements:ElemEntry seq) : ElemEntry list =
        let newElems = newElements model addElems
        match addType with
        | Insert           -> Seq.append newElems elements
        | Append           -> Seq.append elements newElems
        | ChildInsert   id -> elements // not implemented
        | ChildAppend   id -> elements // not implemented
        | SiblingBefore id -> elements // not implemented
        | SiblingAfter  id -> elements // not implemented
        |> Seq.toList

    let addNewElement (props:Props) processMessages (elem:ElemEntry) (v:obj) =
        if v :?> string <> "" then
            props.addPoint |> Option.iter (fun add -> (add, seq[ ElemEntry(GridTable.RowId 0, elem) ]) |> AddElements |> processMessages)
            elem.name.setData                                   ""
            elem.description.setData                            ""
            elem.order.setData                                  ""
            elem.attributes |> Seq.iter (fun att -> att.setData "")

    let addNewElements (props:Props) processMessages n f model =
        let entryPoint = props.addPoint |> Option.defaultV Append
        let newElements = [1..n] 
                          |> List.map (fun _ -> ElemEntry(TreeElements.RowId 0, model.attributes.Length, 999999))
                          |> newElements model
                          |> Seq.toList
        (entryPoint, newElements |> Seq.ofList) |> AddElements |> processMessages
        newElements |> Seq.map (fun elem -> { elem = elem ; children = [] })
        |> f

    let entryNew processMessages props nAtts=
        let elem = ElemEntry(GridTable.RowId -1, nAtts, 99999)
        elem.name.subscribe                                   GridCell.IdNewEntryX (addNewElement props processMessages elem)
        elem.description.subscribe                            GridCell.IdNewEntryX (addNewElement props processMessages elem)
        elem.order.subscribe                                  GridCell.IdNewEntryX (addNewElement props processMessages elem)
        elem.attributes |> Seq.iter (fun att -> att.subscribe GridCell.IdNewEntryX (addNewElement props processMessages elem))
        { elem     = elem
          children = [] }

    let getElement (model: Model) eid = model.elements |> Seq.tryFind (fun elem -> elem.id = eid)

    let aRopCall processMessages = 
        ARop.getR (fun r ->
            Rop.notifyMessages r
            match r with
            | Success _  -> ()
            | Failure ms -> (sprintf "%A" ms , false)  |> SetMessage   |> processMessages
        )

    let saveData_ processMessages (model: Model) =
        ARop.wrap {
            let! dim = model.dim
            ("saving dimension", true ) |> SetMessage  |> processMessages
            let! token      = Server.fetchTokenAR_ ()
            let rels = model.rels 
                       |> Seq.choose (fun (child, parent) -> getElement model child 
                                                             |> Option.bind (fun ch -> getElement model parent 
                                                                                       |> Option.map(fun p -> ch.name.getData, p.name.getData))) 
                       |> Seq.toArray
            let id2String (TreeElements.RowId id) = id.ToString()
            let elem2Array (elem: ElemEntry) = 
                seq [
                    yield  dim.dimensionId.ToString()
                    yield  id2String elem.id
                    yield  elem.name.getData
                    yield  elem.description.getData
                    yield  elem.order.getData
                    for att in elem.attributes do yield att.getData
                ] |> Seq.toArray
            let deleted         = model.original |> Seq.choose (fun elem -> if model.elements |> Seq.exists (fun elem' -> elem.id = elem'.id) |> not then Some [| id2String elem.id |] else None) |> Seq.toArray
            let added, notAdded = model.elements |> List.partition (fun elem ->    model.original |> Seq.exists (fun elem' -> elem.id = elem'.id) |> not)
            let changed         = notAdded       |> Seq.filter (fun elem -> elem.changed)
            let toArrays (s: ElemEntry seq) = s |> Seq.map elem2Array |> Seq.toArray
            let! newUser, (msg, data)  = Server.SaveRelsDataAR_ token dim (deleted, toArrays changed, toArrays added) rels
            false                        |> SetModified     |> processMessages
            (model.elements, model.rels) |> SetElementsRels |> processMessages
            (msg               , false)  |> SetMessage      |> processMessages
        } |> aRopCall processMessages

    let loadData_ processMessages (props: Props) =
        ARop.wrap {
            do! Rop.tryProtection()
            let! dim                           = props.dimension
            ("loading dimension", true) |> SetMessage |> processMessages
            let! token                         = Server.fetchTokenAR_ ()
            let! dimensions                    = Server2.fetchDimensionsAR_()
            let  _, _, name, descO             = dimensions |> Seq.find (fun (d, _,_,_) -> d = dim)
            let! elements, columns, keys, rels = Server.FetchDimRelsAR_  token dim
            let  elems                         = elements 
                                                 |> Seq.sortBy (fun (_, id, name, desc, order, attribs:obj[]) -> order |> Option.filter (fun s -> s.Trim() <> "") |> Option.defaultV name)
                                                 |> Seq.mapi (fun i (_, id, name, desc, order, attribs:obj[]) ->
                                                        ElemEntry(idP          = GridTable.RowId id
                                                                , nameP        = name
                                                                , descriptionP = desc  
                                                                , orderP       = order 
                                                                , attributesP  = (attribs |> Seq.map unbox |> Seq.toList)
                                                                , indexP       = i
                                                                 )
                                                 ) |> Seq.toList
            let  getColO_ colname              = columns  |> Seq.choose(fun col -> if col.name = colname then col.field |> unbox<int> |> Some else None) |> Seq.tryHead
            let attribs = columns |> Seq.skip 3 |> Seq.map (fun c -> c.name) |> Seq.toList
            (Some dim, name, descO, attribs, entryNew processMessages props attribs.Length) |> SetDimension |> processMessages
            let rels2 = rels |> Seq.map (fun (ch, p, _, _) -> GridTable.RowId ch, GridTable.RowId p) |> Set.ofSeq
            (elems, rels2)   |> SetElementsRels |> processMessages
            false            |> SetModified     |> processMessages 
            ("", false)      |> SetMessage      |> processMessages
        } |> aRopCall processMessages

    let addRelation child parent (rels: Set<GridTable.RowId * GridTable.RowId>) =
        let rec isDescendant  descendant ascendant (rels: Set<GridTable.RowId * GridTable.RowId>) =
            let parents = rels |> Seq.choose (fun (ch, p) -> match ch = descendant with | true -> Some p | false -> None)
            parents |> Seq.fold (fun foundTrue parent -> foundTrue || ascendant = parent || isDescendant parent ascendant rels) false
        if child = parent || isDescendant parent child rels
        then rels
        else rels |> Set.add (child, parent)

    let addRelations (model :Model) rels =
        let findElement name = model.elements |> Seq.tryFind(fun elem -> strToKey elem.name.getData = strToKey name)
        rels
        |> Seq.choose(fun (chN, pN) -> findElement chN 
                                    |> Option.bind(fun ch -> findElement pN |> Option.map (fun p -> ch.id, p.id))
           )
        |> Seq.fold (fun before (ch, p) -> addRelation ch p before) model.rels

    let getRelations (model :Model) =
        let getName eid = eid |> getElement model |> Option.map(fun e -> e.name.getData) |> Option.defaultV ""
        model.rels |> Seq.map(fun (ch, p) -> ch |> getName, p |> getName)

    let rec update (processMessages: Message -> unit) (props: Props) (msg: Message) (model :Model) :Choice<Model, Model, bool> =
        match msg with
        | SetDimension(d, n, de, at, ne) -> Choice1Of3 { model with description = de 
                                                                    dim         = d 
                                                                    name        = n 
                                                                    attributes  = at 
                                                                    elements    = [] 
                                                                    rels        = Set[] 
                                                                    original    = [] 
                                                                    entryNew    = ne
                                                       }
        | SetElementsRels(es, rs)        -> Choice1Of3 { model with elements    = es  |> Seq.toList ; rels = rs ; original = es }
        | SetElements    es              -> Choice1Of3 { model with elements    = es   }
        | SetModified       modi         -> Choice2Of3 { model with modified    = modi }
        | DeleteElements ids             -> let elements, rels = (model.elements, model.rels) ||> deleteElements ids             
                                            Choice1Of3 { model with elements = elements ; rels = rels                        ; modified = true }
        | AddElements   (add,es)         -> Choice1Of3 { model with elements    = model.elements |> addElements model add es ; modified = true ; newId = es |> Seq.length |> (+) model.newId }
        | RemoveRelation(ch, p)          -> Choice1Of3 { model with rels        = model.rels     |> Set.remove (ch, p)       ; modified = model.rels <> (model.rels |> Set.remove (ch, p) )}
        | AddRelation   (ch, p)          -> Choice1Of3 { model with rels        = model.rels     |> addRelation ch p         ; modified = model.rels <> (model.rels |> addRelation ch p   )}
        | AddRelations  rels             -> Choice1Of3 { model with rels        = addRelations model rels                    ; modified = true }
        | Flatten                        -> Choice1Of3 { model with rels        = Set[]                                      ; modified = model.rels <> Set[]                              }
        | SetMessage  (msg, pro)         -> Choice1Of3 { model with message     = msg  ; processing = pro }
        | ReloadData                     -> (None, "", None, [], entryNew processMessages props 0) |> SetDimension |> update processMessages props <| model
        | LoadData                       -> loadData_ processMessages props 
                                            Choice3Of3 true
        | SaveData                       -> saveData_ processMessages model 
                                            Choice3Of3 true
        | DoThis       f                 -> f model
                                            Choice3Of3 true

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        let layout = props.layout |> Option.defaultV (treeViewNext None)
        let emptyNext_ wait = { 
                elements        = []
                columns         = []
                props           = props
                model           = model
                processMessages = fun _  -> ()
                addElements     = fun _ f -> f <| seq []
                wait            = wait
                getRelations    = fun () -> seq []
            }
        let rec entryHier eid = getElement model eid |> Option.map(fun elem -> { elem     = elem
                                                                                 children = getChildren eid |> Seq.sortBy (fun e -> e.elem.index) |> Seq.toList })
        and  getChildren (eid: GridTable.RowId)
                              = model.rels |> Seq.choose(fun (child, parent) -> if parent = eid then entryHier child else None)
        let elems elements = 
            elements 
            |> Seq.choose (fun (elem:ElemEntry) -> if model.rels |> Seq.exists(fun (child, _) -> child = elem.id) |> not then entryHier elem.id else None) 
            |> (fun elems ->
                match props.addPoint with
                | Some Append -> Seq.append elems              [ model.entryNew ]
                | Some Insert -> Seq.append [ model.entryNew ] elems
                | _           -> elems
            ) |> Seq.toList

        match model.dim, props.dimension with
        | Some d1, Some d2 when d1 = d2 -> 
            { 
                elements        = elems model.elements
                columns         = List.append 
                                    [  "Code"       
                                       "Description"
                                       "Order"      
                                    ]
                                    model.attributes 
                props           = props
                model           = model
                processMessages = processMessages
                addElements     = (fun n f -> addNewElements props processMessages n f |> DoThis |> processMessages)
                wait            = NEmpty
                getRelations    = fun () -> getRelations model
            }
        | _, Some d2 -> Util.waitImg 
                        |> if model.processing then id else OnAfterRender (fun _ -> LoadData |> processMessages)
                        |> emptyNext_
        | _          -> NEmpty |> emptyNext_
        |> layout

    let app = App.App(init, update, view)

    let next dimO addPoint nextNodeO = 
        app.node { dimension = dimO
                   layout    = nextNodeO 
                   addPoint  = addPoint }

    let nextD dimO = next dimO None None

[<JavaScript>]                  
module DimensionListAll =

    type DimTuple        = Dimension * System.Guid * string * string option

    type Model           = { dimensions : DimTuple[]                                     }
    let  init            = { dimensions = [||]                                           }
    type Props           = { layout     : (CipherNode * DimTuple seq -> CipherNode) option }
    type Message         =                | SetDimensions of DimTuple[]
    let update (props: Props) (msg: Message)  model = match msg with | SetDimensions   dims -> { model with dimensions = dims     }

    let defLayout (thisNode, dims) = 
        dims |> Seq.cast<ListRender.Item> 
        |> (fun items -> ListRender.next items (Some (unbox >> (fun (_,_,n,_) -> n))) None None)
        |> Util.combineNodes thisNode

    let cb callback =  unbox<DimTuple option> >> callback

    let defLayoutCb callback (thisNode, dims) =
        dims |> Seq.cast<ListRender.Item> 
        |> (fun items -> ListRender.nextCb items (Some (unbox >> (fun (_,_,n,_) -> n))) None (cb callback))
        |> Util.combineNodes thisNode

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        let loadData (_:obj) =
            ARop.wrap {
                do!  Rop.tryProtection()
                let! dimensions = Server2.fetchDimensionsAR_()
                if dimensions.Length > 0 then dimensions |> SetDimensions |> processMessages
            } |> ARop.call
        let layout = props.layout |> Option.defaultV defLayout
        if model.dimensions.Length > 0
        then NEmpty, model.dimensions
        else Util.waitImg |> OnAfterRender loadData, [||]
        |> layout

    let app = App.App(init, update, view)

    let next nextNodeO = app.node { layout = nextNodeO }

    let next0 () = app.node { layout = None }

    let nextCb callback = next (defLayoutCb callback |> Some)

    let nextV  (cell: DataTube.Cell<DimTuple, string, string>) = nextCb cell.setDataO

    let selTuple (cell: DataTube.Cell<DimTuple, string, string>) =  
        match cell.getDataO() with
        | Some (dim, did, name, descO) -> (Some dim, Some did, name, descO |> Option.defaultV "")
        | None                         -> (None    , None    , ""  ,                          "")

[<JavaScript>]                  
module DimAll =

    type DimAll(tube: DataTube.Tube<_,_>, baseId : string) =
        let cell = tube.subCell(baseId)
        member this.view     ()       = DimensionListAll.nextV(cell)
        member this.subscribe key f   = cell.subscribe key (fun _ -> f())
        member this.dyn f             = DynNode.node f (this.subscribe (f.JS.ToString()))
        member this.dimName  ()       = DimensionListAll.selTuple(cell) |> fun (_,_, v, _) -> v
        member this.dimO     ()       = DimensionListAll.selTuple(cell) |> fun (v,_, _, _) -> v
        interface IUIObject with 
            member this.view     ()       = DimensionListAll.nextV(cell)

    let New(t,id) = DimAll(t, id) :> IUIObject |> UIObject

[<JavaScript>]                  
module GridArray =

    type GridEntry (index_, fields_, insertion_) =
        interface GridTable.IGridEntry with 
            member this.id          =  index_
            member this.fields      = fields_
            member this.isInsertion = insertion_

    type Row             = DataTube.Tube<GridCell.DataIdX, GridCell.DataIdX>

    type NextStage       = {
                             props           : Props 
                             model           : Model 
                             processMessages : Message -> unit
                             rows            : GridTable.IGridEntry seq 
                             addElements     : int -> (GridTable.IGridEntry seq -> unit) -> unit
                           }
    
    and  Model           = { 
                             rows            : Row[]
                             insert          : Row
                             newId           : int
                             modified        : bool
                           }                 
    and  Props           = {                 
                             append          : bool
                             columns         : string []
                             layout          : (NextStage -> CipherNode) option          
                           }

    and  Message         =                
        | SetRows    of Row[]
        | AddRows    of Row[]
        | AddRow     of Row
        | DeleteRows of TreeElements.RowId seq
        | Clear
        | DoThis     of (Model -> unit)

    let  init            = { rows            = [||]                                           
                             insert          = Row.New("insert")
                             newId           = 1111
                             modified        = false
                           }

    let row props (r:Row) = props.columns |> Array.mapi (fun i c -> r.subCell(GridCell.IdFieldN i) |> GridCell.DCellText)

    let newRow props i copy = 
        let nr = Row.New i
        let nRow = row props nr
        copy |> Array.iteri (fun i (cell:GridCell.DCellText) -> nRow.[i].setData cell.getData)
        nr

    let addNewRows props model processMessages n f : unit =
        let newRows = [| 1..n |] |> Array.map (fun i -> newRow props (i + model.newId) [| |])
        newRows |> AddRows |> processMessages
        newRows |> Array.map (fun elem -> GridEntry(TreeElements.RowId (elem.id :?> int), row props elem, false) :> GridTable.IGridEntry)
        |> Seq.ofArray
        |> f

    let update (processMessages: Message -> unit) (props: Props) (msg: Message)  model = 
        match msg with 
        | SetRows   rows -> Choice1Of3 { model with rows = rows                              ; newId = model.newId + rows.Length   ; modified = true }
        | AddRows   rows -> Choice1Of3 { model with rows = Array.append model.rows    rows   ; newId = model.newId + rows.Length   ; modified = true }
        | AddRow    row  -> Choice1Of3 { model with rows = Array.append model.rows [| row |] ; newId = model.newId + 1             ; modified = true }
        | Clear          -> Choice1Of3 { model with rows = [||]                                                                    ; modified = true }
        | DeleteRows ids -> Choice1Of3 { model with rows = model.rows 
                                                           |> Array.mapi (fun i r -> if ids |> Seq.exists ((=) (TreeElements.RowId i)) then None else Some r) 
                                                           |> Array.choose id                                                      ; modified = true }
        | DoThis     f   -> f model ; Choice3Of3 true

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        let addNewElement (cell:GridCell.DCellText) (v:obj) =
            if v :?> string <> "" then
                newRow props model.rows.Length (row props model.insert) |> AddRow |> processMessages
                cell.setData ""
        let entryNew =
            let entry = row props model.insert
            entry |> Array.iter (fun cell -> cell.subscribe GridCell.IdNewEntryX <| addNewElement cell)
            entry
        let gridElements =
            model.rows 
            |> Array.mapi(fun i r ->            GridEntry(TreeElements.RowId i, row props r, false ) :> GridTable.IGridEntry)
            |> if not props.append then id
               else (fun a -> Array.append a [| GridEntry(TreeElements.RowId model.rows.Length, entryNew , true  ) :> GridTable.IGridEntry |])
        let layout = props.layout |> Option.defaultV (fun nextStage -> GridTable.next nextStage.rows nextStage.props.columns nextStage.addElements None None )
        {
          props           = props
          model           = model
          processMessages = processMessages
          rows            = gridElements
          addElements     = addNewRows props model processMessages
        }
        |> layout

    let app = App.App(init, update, view)

    let next columns append nextNodeO = 
        app.node { 
                   columns = columns
                   append  = append
                   layout  = nextNodeO 
                 }

[<JavaScript>]
module DimEditor =
    open RenderReact

    type GridTreeEntry(_id, _children, _layout, _fields, _insertion) =
        interface TreeView.ITreeEntry with 
            member this.id          = _id  
            member this.name        = ""
            member this.children    = _children
            member this.layout      = _layout
        interface GridTable.IGridEntry with 
            member this.id          = _id      
            member this.fields      = _fields
            member this.isInsertion = _insertion

    type TreeDetailGridEntry(i:int, detail:TreeElements.TreeDetail) =
        member this.treeDetail = detail
        interface GridTable.IGridEntry with
            member this.id          = TreeElements.RowId i
            member this.fields      = (detail.entry :?> GridTable.IGridEntry).fields
            member this.isInsertion = (detail.entry :?> GridTable.IGridEntry).isInsertion

    type GridTreeEntry2(_entry: TreeView.ITreeEntry,  layout) =
        interface TreeView.ITreeEntry with 
            member this.id          = _entry.id      
            member this.name        = _entry.name    
            member this.children    = _entry.children
            member this.layout      = layout

    let rec translateGridEntry (elem: DimElements.EntryHier) : TreeView.ITreeEntry =
        let fields = seq[ yield  elem.elem.name
                          yield  elem.elem.description
                          yield  elem.elem.order      
                          yield! elem.elem.attributes
                        ] |> Seq.toList
        GridTreeEntry(
             elem.elem.id
            ,elem.children |> Seq.map translateGridEntry
            ,None
            ,fields
            ,elem.elem.id = TreeElements.RowId -1
        ) :> TreeView.ITreeEntry

    [< Inline "$f.call($this, $p1)" >]
    let call1 f this p1 = null
    [< Inline "$f.call($this, $p1, $p2)" >]
    let call2 f this p1 p2 = null

    let gridRowToTreeEntry2 addRelation (elem:GridRows.RowDetail) =
        let detail = (elem.entry :?> TreeDetailGridEntry).treeDetail
        let dragFunctionality =
                addAttribute (Draggable true)
             >> OnDragStart (fun ev -> ev?dataTransfer?effectAllowed <- "move"
                                       detail.entry.id |> (fun (TreeElements.RowId i) -> sprintf "ID-->%s" (i.ToString())) |> call2 ev?dataTransfer?setData ev?dataTransfer "text")
             >> OnDragOver  (fun ev -> GridTable.preventDefault ev)
             >> OnDrop      (fun ev -> let data = (call1 ev?dataTransfer?getData ev?dataTransfer "text").ToString()
                                       if data.StartsWith "ID-->" then
                                           GridTable.preventDefault ev
                                           let code = data.[5..]
                                           (if code.Length > 15 
                                            then System.Guid code :> System.IComparable
                                            else code |> int      :> System.IComparable
                                            |> TreeElements.RowId 
                                            , detail.entry.id) |> addRelation
                            )
        let rest, (first, box) = elem.row |> Seq.skip 1
                               , match (elem.row |> Seq.head) with
                                 | NElement (elem, children) -> children |> Seq.head, NElement (elem, children |> Seq.skip 1)
                                 | first                     -> first               , Td[]
        let layout (content: CipherNode, hasChildren, expanded, level, onClick) =
            Seq.append 
                [ box |> insertChildren [ TreeElement.next first hasChildren expanded level onClick None ] |> dragFunctionality ]
                rest
            |> Tr |> toReact |> ReactR
        { detail with
            entry = GridTreeEntry2(detail.entry, Some layout)
        }

    let treeElementNext = 1

    type Dialog = 
        | NoDialog
        | ConfirmReload
        | ConfirmSelection

    type Model           = { 
                                modified : bool
                                selected : (Dimension * string) option
                                dialog   : Dialog
                           }
    let  init            = { 
                                modified = false
                                selected = None
                                dialog   = NoDialog
                           }
    type Props           = App.Dummy

    type Message         =                
        | SetModified  of bool
        | SetSelected  of (Dimension * string) option
        | SetDialog    of Dialog

    let update (props: Props) (msg: Message)  (model: Model) : Model = 
        match msg with 
        | SetModified    m  -> JS.Window.Onbeforeunload <- match m with
                                                           | true  -> (fun (e:Dom.Event) -> e?returnValue  <- "Changes you made may not be saved.")
                                                           | false -> (fun (e:Dom.Event) -> ())
                               { model with modified = m }
        | SetSelected    s  -> { model with selected = s }
        | SetDialog      d  -> { model with dialog   = d }

    
    let renderCallback fO p : CipherNode = fO |> Option. map (fun f -> f p) |> Option.defaultV NEmpty


    let itemRenderE043  = ItemRender.next2 (NText "\uE043" |> Some) None
    let DimRender (name, selected, onClick) =
        render {
            let! nodes  = ItemRender.next  (NText "\uE043" |> Some) name selected onClick
            return Div nodes
        } <| None
        
    let DimsList fO =
        render {
            let! allDimsWait, dims                                 = DimensionListAll.next
            let  dims2                                             = dims |> Seq.map(fun (dim, _, name, _) -> dim, name) |> Seq.cast
            let! {selected = selected }, processMessages, dimNodes = ListRender.next dims2 (Some (unbox >> snd)) (Some DimRender)
            let  dimsListNodes                                     = Seq.append [H4 [ NText "Dimensions:" ] ; allDimsWait] dimNodes
            let  selectDim (select:(Dimension * string) option)    = select |> unbox |> ListRender.Message.Select |> processMessages
            return renderCallback fO (dimsListNodes, selected |> Option.map unbox<Dimension * string>, selectDim)
        } <| None

    let DimTree (dimElemsNS: DimElements.NextStage) elements fO =
        render {
            let! treeDetails, setExpanded, expandOne, collapseOne, expandAll, collapseAll 
                                                = TreeView.next elements
            let  treeArray                      = treeDetails |> Seq.toArray
            let  getId (TreeElements.RowId i)   = treeArray.[i :?> int].entry.id
            let  translateTreeDetails           = Seq.mapi (fun i elem -> (i,elem) |> TreeDetailGridEntry :> GridTable.IGridEntry)
            let  gridItems                      = treeArray |> translateTreeDetails |> Seq.toList 
            let  addElements                    = fun n f -> dimElemsNS.addElements n ( Seq.map translateGridEntry >> Seq.cast<GridTable.IGridEntry> >> f)
            let! { header       = header
                   rows         = rows
                   selectedRows = selectedRows} = GridTable.next gridItems dimElemsNS.columns addElements (Some (fun (i, s) -> s |> if i = 0 then Div else Td))
            let  addRelation                    = DimElements.AddRelation >> dimElemsNS.processMessages
            let  treeItems                      = rows |> Seq.map (gridRowToTreeEntry2 addRelation)
            let! lines                          = TreeElements.next treeItems setExpanded
            return renderCallback fO (header, lines, selectedRows, expandOne, collapseOne, expandAll, collapseAll, getId)
        } <| None

    let GridRel (disabled:bool) getRelations applyRelations =
        render {
            let! gridArrayNS                    = GridArray.next [| "Child" ; "Parent" |] true
            let! { header       = header
                   rows         = rows
                   selectedRows = selectedRows} = GridTable.next gridArrayNS.rows gridArrayNS.props.columns gridArrayNS.addElements None
            let getRels() =
                let rels = getRelations() |> Seq.toArray
                gridArrayNS.addElements (rels |> Array.length)
                <| Seq.iteri (fun i row ->
                        let ch, p = rels.[i]
                        (row.fields |> Seq.item 0).setData ch
                        (row.fields |> Seq.item 1).setData p
                    )
            let applyRels () =
                gridArrayNS.rows 
                |> Seq.map(fun r -> (r.fields |> Seq.item 0).getData, (r.fields |> Seq.item 1).getData) 
                |> applyRelations
            return
                Layouts.bootstrapPanel 
                  [ 
                    Label [ Class "panel-title text-center"
                            NText "Relations"
                          ]
                    Div [ Class "btn-toolbar pull-right"
                          Div [ Class "btn-group pull-right"                   
                                Button [ Class "btn btn-default  pull-right" ; Disabled disabled ; NText "Clear"        ] |> OnClick (fun () -> GridArray.Clear |> gridArrayNS.processMessages)
                                Button [ Class "btn btn-default  pull-right" ; Disabled disabled ; NText "Delete Rows"  ] |> OnClick (fun () -> selectedRows (fun added -> added |> Seq.map (fun e -> e.id) |> GridArray.DeleteRows |> gridArrayNS.processMessages))
                              ]
                          Div [ Class "btn-group pull-right"                   
                                Button [ Class "btn btn-default  pull-right" ; Disabled disabled ; NText "Apply"        ] |> OnClick (fun () -> gridArrayNS.rows |> Seq.map(fun r -> (r.fields |> Seq.item 0).getData, (r.fields |> Seq.item 1).getData) |> applyRelations)
                                Button [ Class "btn btn-default  pull-right" ; Disabled disabled ; NText "Get Rels"     ] |> OnClick getRels
                              ]
                        ]
                    Div [ NText <| sprintf "before: %d" TreeElement.generation ]
                  ]
                  [Table [ THead [ Tr [ yield  Th []
                                        yield! header ]  ]
                           TBody (rows 
                                  |> Seq.map (fun elem ->  
                                      Tr [ yield Td [ NText "\uE235" ; _Style [ _display "inline" ; _fontFamily "Glyphicons Halflings" ] ]
                                           yield! elem.row 
                                         ]))
                         ] 
                  ] 
                  [] 
        } <| None

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        render {
            let! dimsList, newSel, selectDim    = DimsList
            let! dimElemsNS                     = DimElements.next (model.selected |> Option.map fst) (Some DimElements.Append)
            let  {DimElements.wait = wait; DimElements.elements = elements ; DimElements.getRelations = getRelations } = dimElemsNS
            let! header, lines, selectedRows
               , expandOne, collapseOne
               , expandAll, collapseAll, getId  = DimTree dimElemsNS (elements |> Seq.map translateGridEntry)
            let  nextDimension          (a:obj) = newSel |> SetSelected |> processMessages
            let  reloadDimension        (a:obj) = DimElements.ReloadData |> dimElemsNS.processMessages
            let  sendNewDimSelMsg               = match (newSel <> model.selected), model.modified, model.dialog with
                                                  | true, false, _        -> OnAfterRender nextDimension
                                                  | true, true , NoDialog -> OnAfterRender (fun (a:obj) -> ConfirmSelection |> SetDialog |> processMessages)
                                                  | _   , _    , _        -> id
            let  sendModified                   = if dimElemsNS.model.modified <> model.modified
                                                  then (OnAfterRender (fun _ -> dimElemsNS.model.modified |> SetModified |> processMessages) ) 
                                                  else id 
            let  reloadDataBtn                  = if dimElemsNS.model.modified
                                                  then fun () -> ConfirmReload |> SetDialog |> processMessages
                                                  else reloadDimension
            let  disabled                       = model.selected = None
            let  gridRel                        = GridRel disabled
                                                          getRelations
                                                          (fun rels -> rels |> DimElements.AddRelations |> dimElemsNS.processMessages) 
            let  dialog                         =
                let proceed, cancel = match model.dialog with
                                      | NoDialog         -> (fun () -> ()) , (fun () -> ())
                                      | ConfirmReload    -> reloadDimension, (fun () -> ())
                                      | ConfirmSelection -> nextDimension  , (fun () -> model.selected |> selectDim)
                Dialog.app.node     { title     = sprintf "%A. Changes will be lost!" model.dialog 
                                      buttons   = ["Proceed", "btn", proceed
                                                   "Cancel" , "btn", cancel ]
                                      content   = [ NText "Changes have not been saved. Do you really want to proceed?" ]
                                      show      = model.dialog <> NoDialog
                                      close_    = Some (fun () -> NoDialog |> SetDialog |> processMessages)
                                    }
            return Layouts.leftContentRightNode
                       dimsList
                       [ Layouts.bootstrapPanel
                             [ 
                               Label [ Class "panel-title text-center"
                                       model.selected |> Option.map (snd >> fun n -> if dimElemsNS.model.modified then n + " *" else n) |> Option.defaultV "<-- Select a dimension..." |> NText
                                       dimElemsNS.wait
                                       Span [ _Style [ _color "red" ; _fontSize "1.3rem" ; _fontWeight "normal" ; _fontStyle "italic"]
                                              Class "alert"
                                              NText dimElemsNS.model.message ]
                                     ]
                               Div [ Class "btn-toolbar pull-right"
                                     Div [ Class "btn-group pull-right"
                                           Button [ Class "btn btn-default  pull-right" ; Disabled disabled ; NText "Expand One"   ] |> OnClick expandOne
                                           Button [ Class "btn btn-default  pull-right" ; Disabled disabled ; NText "Collapse One" ] |> OnClick collapseOne
                                           Button [ Class "btn btn-default  pull-right" ; Disabled disabled ; NText "Collapse All" ] |> OnClick collapseAll
                                           Button [ Class "btn btn-default  pull-right" ; Disabled disabled ; NText "Expand All"   ] |> OnClick expandAll
                                         ]
                                     Div [ Class "btn-group pull-right"                   
                                           Button [ Class "btn btn-default  pull-right" ; Disabled disabled ; NText "Flatten"      ] |> OnClick (fun () -> DimElements.Flatten  |> dimElemsNS.processMessages)
                                           Button [ Class "btn btn-default  pull-right" ; Disabled disabled ; NText "Reload"       ] |> OnClick reloadDataBtn
                                           Button [ Class "btn btn-default  pull-right" ; Disabled disabled ; NText "Save"         ] |> OnClick (fun () -> DimElements.SaveData |> dimElemsNS.processMessages)
                                         ]
                                     Div [ Class "btn-group pull-right"                   
                                           Button [ Class "btn btn-default  pull-right" ; Disabled disabled ; NText "Delete Rows"  ] |> OnClick (fun () -> selectedRows (fun sels -> sels |> Seq.map (fun row -> getId row.id) |> DimElements.DeleteElements |> dimElemsNS.processMessages))
                                         ]
                                   ]
                             ]
                             [ 
                               dialog
                               Table [
                                   THead [ Tr header ]
                                   TBody lines
                               ]
                             ]
                             [ 
                                Div [] |> sendNewDimSelMsg |> sendModified
                             ]
                       ]
                       [   _Style [ _flex "1 1 auto" ; _display  "flex" ; _overflow "auto" ]
                           gridRel
                       ]
                     
        } <| None

    let app = App.App(init, update, view)

    let run node = app.run App.DummyNew node
    let node () = app.node App.DummyNew

(*    let runMain2 node =
        dimensionListAll_next 
           (Some (fun items ->
                shift4 ListRender.next 
                   (NText "\uE043" |> Some |> ItemRender.next |> Some)
                   (Some <| fun itm -> itm |> unbox |> function (_,_,name,_) -> name) 
                   (items |> Seq.cast)
                   (Some (fun (model: ListRender.Model) rs ->
                    Layouts.leftAndContentNode
                    <| rs
                    <| (Seq.singleton 
                        <| shift2 DimElements.next 
                                (model.selected |> Option.map (unbox >> fun (dim, _, _, _) -> dim)) 
                                (Some (fun (node, props: DimElements.NextStage) ->
                                    TreeView.app.node {
                                        elements        = props.elements |> List.map translateGridEntry
                                        layout          = 
                                            (Some (fun setExpanded elements ->
                                                 GridTable.app.node {
                                                     elements        = elements  |> Seq.map (fun elem -> elem |> TreeDetailGridEntry :> GridTable.IGridEntry)
                                                     columns         = props.columns   
                                                     cellLayout      = None
                                                     layout          = 
                                                            Tr                              |> Some
                                                         |> TreeElement.next                |> Some
                                                         |> treeElementsNext <| setExpanded |> Some
                                                 }
                                            ))
                                    }
                                ))
                       )
                ))
            ))
        |> Seq.singleton
        |> MainForm.leftAndContentRun  [] <|  node
*)

[<JavaScript>]
module DimSimpleTree =

    let itemRenderE043 = ItemRender.next2 (NText "\uE043" |> Some) None |> Some

    let listRender_next nextNodeO items =
        ListRender.next 
            (items |> Seq.cast)
            (Some <| fun itm -> itm |> unbox |> function (_,_,name,_) -> name) 
            itemRenderE043
            nextNodeO

    let listRender_next2 nextNodeO (thisNode:CipherNode, items) =
        listRender_next nextNodeO items
        |> Util.combineNodes thisNode

    let dimElements_next nextNodeO (model: ListRender.Model, _, rs) =
        Layouts.leftAndContentNode
        <| rs
        <| (Seq.singleton <| DimElements.next nextNodeO None (model.selected |> Option.map (unbox >> fun (dim, _, _, _) -> dim)))

(*    let run node = 
          Div                      |> Some
       |> TreeElement.next2        |> Some
       |> TreeElements.next        |> Some
       |> DimElements.treeViewNext |> Some
       |> DimElements.run  <|  Some(Dimension (System.Guid "b105d295-bcf4-4439-9d81-00b348a196bb")) <| node
*)
    let runMain node =
         None
         |> dimElements_next             |> Some
         |> listRender_next2             |> Some
         |> DimensionListAll.next        |> Seq.singleton
         |> MainForm.leftAndContentRun  <| [] <|  node

         