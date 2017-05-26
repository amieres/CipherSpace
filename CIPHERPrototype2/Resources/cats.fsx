//#load /FScript/Layouts.fsx
#load          @"Layouts.fsx"

namespace CIPHERSpace

open WebSharper
open WebSharper.JavaScript
open Model
open Model2
open Rop
open ReactHtml


[<JavaScript>]
module SearchFlickr =

    type Model    = { 
                      search   : string 
                      images   : string list
                      vertical : bool
                    }

    let init = {
                      search   = "cats"     
                      images   = []
                      vertical = false
                    }
    
    type Message =
                   | Search of string
                   | Images of string list
                   | Vertical 

    let update msg model =
        match msg with
                   | Search   s  -> { model with search   = s                  }
                   | Images   is -> { model with images   = is                 }
                   | Vertical    -> { model with vertical = not model.vertical }

    [< Inline """$.getJSON($url, $obj)""">]
    let jQueryGetJSON (url:obj) (obj:obj) : unit = X<_>

    module Impure =
      let getJSON cb  url       = jQueryGetJSON url cb

    let mediaUrl :obj->string   = prop "media" >> prop "m"
    let srcs  :obj->string list = prop "items" >> Array.map mediaUrl >> Seq.toList
                                
    let url t   = "http://api.flickr.com/services/feeds/photos_public.gne?tags=" + t + "&format=json&jsoncallback=?"
    let img src = Img [Src src ]

    let view (model: Model) (processMessages: Message -> unit) =
        let processJSON : obj -> unit = srcs >> Images >> processMessages
        let left =
            [ _Style [ _minWidth "222px"; _overflow "hidden" ]
              Input  [Type "text"    ; Value model.search          ] |> OnChange (prop "target" >> prop "value" >> Search >> processMessages)
              Input  [Type "button"  ; Value "search"              ] |> OnClick  (fun _ -> model.search |> url |> Impure.getJSON processJSON)
              Br     []
              Input  [Type "checkbox"; Checked      model.vertical ] |> OnChange (fun _ -> Vertical |> processMessages)
              NText  "vertical"
              Br     []
              Input  [Type "checkbox"; Checked (not model.vertical)] |> OnChange (fun _ -> Vertical |> processMessages)
              NText  "horizontal"
              Br     []
            ]
        let images = model.images |> List.map img |> (fun l -> _Style [ _overflow "auto" ] :: l) 
        let splitter = if model.vertical then Layouts.VerticalSplitter else Layouts.HorizontalSplitter
        splitter [ H2 [NText "Search Flickr"] ] [ H3 [NText "CIPHER BSC."] ] left [ H1[NText "HI"] ] images

    let showForm_    node =
        App.app
            <| init
            <| update
            <| view
        |> App.run node

[<JavaScript>]
module MenuBar =
    
    type MenuEntry = {
                      id          : System.Guid
                      name        : string
                      description : string 
                      order       : string 
                      template    : string option
                      content     : string option
                      children    : MenuEntry list
    }

    type Model    = { 
                      search1    : SearchFlickr.Model
                      search2    : SearchFlickr.Model
                      entries    : MenuEntry list
                    }

    type Message =
        | ToSearch1Msg         of SearchFlickr.Message
        | ToSearch2Msg         of SearchFlickr.Message
        | SetMenuEntries       of MenuEntry list

    let update msg model =
        match msg with
        | ToSearch1Msg   msg -> { model with search1    = SearchFlickr.update msg model.search1 }
        | ToSearch2Msg   msg -> { model with search2    = SearchFlickr.update msg model.search2 }
        | SetMenuEntries es  -> { model with entries    = es                                    }

    let loadMenuEntriesW_ token navDim =
        ARop.wrap {
            let! elements, columns, keys, rels = Server.FetchDimRelsAR_  token navDim
            let  getColO_ colname              = columns  |> Seq.choose(fun col -> if col.name = colname then col.field |> unbox<int> |> Some else None) |> Seq.tryHead
            let  getElement (eid: System.Guid) = elements |> Seq.tryFind (fun (_, id, _, _, _, _) -> eid = id)
            let rec menuEntry eid              = getElement eid |> Option.map(fun (_, id, name, desc, order, attribs:obj[]) ->
                                                    {
                                                        id          = eid
                                                        name        = name
                                                        description = desc  |> Option.filter (fun s -> s.Trim() <> "") |> Option.defaultV name
                                                        order       = order |> Option.filter (fun s -> s.Trim() <> "") |> Option.defaultV name
                                                        template    = getColO_ "TemplatePage" |> Option.map (fun i -> attribs.[i - 5] |> unbox)
                                                        content     = getColO_ "ContentPage"  |> Option.map (fun i -> attribs.[i - 5] |> unbox)
                                                        children    = getChildren eid |> Seq.sortBy (fun (c, o) -> Option.defaultV c.order o) |> Seq.map fst |> Seq.toList
                                                    }
                                                 )
            and  getChildren   eid             = rels |> Seq.choose(fun (child, parent, _, order) -> if eid = parent then menuEntry child |> Option.map (fun e -> (e, order)) else None)
            return
                elements 
                |> Seq.choose (fun (_, eid, _, _, _, _) -> if rels |> Seq.exists(fun (child, _, _, _) -> child = eid) |> not then menuEntry eid else None) 
                |> Seq.sortBy (fun e -> e.order) |> Seq.toList
        }

    let initW_ token dim =
        ARop.wrap {
            let! entries = loadMenuEntriesW_ token dim
            return    
                    {
                      search1    = SearchFlickr.init
                      search2    = SearchFlickr.init
                      entries    = entries
                    }
        }    

    let text txt    = [ H3 [NText txt] ; _Style [_background txt] ]

    let menu (model: Model) name = 
        let entries = model.entries |> Seq.choose (fun e -> if e.name = name then Some e.children else None) |> Seq.tryHead |> Option.defaultV []
        entries 
        |> Seq.map (fun e -> Ul[ _Style [_alignSelf "center"]
                                 NAttribute("dangerouslySetInnerHTML", newAttr "__html" e.description :> obj) 
                               ]) 
        |> Seq.toList

    let view (model: Model) (processMessages: Message -> unit) =
        Layouts.BasicContainer 
            [Img [ Src "/EPFile/LOGO.png"; _Style [_maxWidth "20rem" ; _maxHeight "6rem"] ]] 
            (_Style [_display "flex" ] :: (menu model "Second Menu")) 
            (_Style [_display "flex" ] :: (menu model "Main Menu"  ))

[<JavaScript>]
module DimModel =
    
    type ElemEntry = {
                       id          : System.Guid
                       name        : string
                       description : string option
                       order       : string option
                       attributes  : string list
                       children    : ElemEntry list
                     }

    type DimEntry  = {
                       dim         : Dimension
                       id          : System.Guid
                       name        : string
                       description : string option
                       attributes  : string list
                     }
                   
    type Model     = { 
                       dimension   : DimEntry    option
                       elements    : ElemEntry   list
                       expanded    : Set<System.Guid>
                       hover       : System.Guid option
                       selection   : (System.Guid * System.Guid) option * (int * int) option
                       capturing   : bool
                     }
                   
    let init       = {
                       dimension  = None
                       elements   = []
                       expanded   = Set []
                       hover      = None
                       selection  = None, None
                       capturing  = false
                     }

    type Message =
        | SetDimension       of DimEntry    option
        | SetElements        of ElemEntry   list
        | SetExpanded        of System.Guid * bool
        | SetHover           of System.Guid option
        | SetSelection       of (System.Guid * System.Guid) option * (int * int) option
        | SetEndSelection    of System.Guid option * int
        | StartSelection     of System.Guid option * int
        | EndSelection       of System.Guid option * int

    let double a = a |> Option.map(fun a -> a, a)

    let update msg model =
        let endSelection r c      = match r, model.selection with
                                    | Some (id), (Some(id1, id2), Some(c1, c2)) -> { model with selection = Some(id1, id), Some(c1, c)}
                                    | _        , (None          , Some(c1, c2)) -> { model with selection = None         , Some(c1, c)}
                                    | _                                         -> model
        match msg with
        | SetDimension       dim -> { model with dimension    = dim
                                                 elements     = []  }
        | SetElements        els -> { model with elements     = els }
        | SetHover           idO -> { model with hover        = idO }
        | SetSelection    (a, b) -> { model with selection    = a, b }
        | StartSelection  (a, b) -> { model with selection    = double a, Some(b, b) ; capturing = true}
        | SetEndSelection (r, c) -> endSelection r c
        | EndSelection    (r, c) -> endSelection r c |> (fun model -> { model with capturing = false})
        | SetExpanded  (id, exp) -> { model with expanded     = if exp then Set.add else Set.remove 
                                                                <| id <| model.expanded }

    let preventDefault ev = (ev?preventDefault :> FuncWithOnlyThis<obj, unit>).CallUnsafe(ev       , null) |> ignore
    let focusTable     ev = //(ev?target?focus   :> FuncWithOnlyThis<obj,  obj>).CallUnsafe(ev?target, null) |> ignore
        let table = (ev?target?closest :> FuncWithOnlyThis<obj, obj>).CallUnsafe(ev?target, "table")
        (table?focus :> FuncWithOnlyThis<obj, unit>).CallUnsafe(table, null) |> ignore

    let addMoreFields (model:Model) processMessages id rowSelected fields tag =
        fields
        |> List.mapi (fun i v ->
              let i1 = i + 1
              let selected = rowSelected && match model.selection with
                                            | _            , Some(a, b) -> (i1 >= a && i1 <=b) || (i1 >= b && i1 <= a)
                                            | _                         -> false
              let current  = rowSelected && match model.selection with
                                            | Some(id1, _) , Some(a, b) -> Some id1 = id && i1 = a
                                            | _                         -> false
              
              tag [ _Style <| [ _paddingLeft "0.5ch" ; _paddingRight "0.5ch" ; _overflow "hidden" ; _textOverflow "ellipsis"] 
                                @ (if current 
                                   then [ _background "#EEEEEE" ; _border "1px solid"  ]  
                                   else if selected 
                                        then [ _background (if model.capturing then  "#fb1009" else "#b7ddfd") ; _border "1px dotted"  ] 
                                        else [_border "1px dotted transparent"])
                    NText v
                  ] 
              |> addAttributes [ if current then 
                                    yield TabIndex "1"
                                    yield AutoFocus "" ]
              |> OnMouseDown (fun ev -> preventDefault ev ; focusTable ev
                                        (id, i1) |> (if model.capturing || ev?shiftKey
                                                     then EndSelection else StartSelection )  |> processMessages)
              |> OnMouseOver (fun ev -> if model.capturing then (id, i1)  |> SetEndSelection  |> processMessages)
              |> OnMouseUp   (fun ev -> if model.capturing then (id, i1)  |>    EndSelection  |> processMessages)
           )
        |> addChildren 

    let rec elemRows (model: Model) level (elems: ElemEntry seq) =
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

    let getCurrentId1 (model:Model) =
        match model.selection with
        | Some(id1, id2), _ -> Some id1
        | _                 -> None

    let getCurrentId2 (model:Model) =
        match model.selection with
        | Some(id1, id2), _ -> Some id2
        | _                 -> None

    let getFirstId (model:Model) = model.elements                     |> Seq.tryHead |> Option.map (fun  elem           -> elem.id)
    let getLastId  (model:Model) = model.elements |> elemRows model 0 |> Seq.tryLast |> Option.map (fun (elem, _, _, _) -> elem.id)

    let getPriorId0 (model:Model) currId =
        let rows = lazy elemRows model 0 model.elements 
        currId |> Option.bind(fun id ->
            rows.Value 
            |> Seq.tryFindIndex(fun (elem, _, _, _) -> elem.id = id) 
            |> function | Some i when i > 0 -> Some (i - 1) | _ -> None
            |> Option.map (fun j -> Seq.item j rows.Value |> function (elem, _, _, _) -> elem.id)
        )

    let getNextId0 (model:Model) currId =
        let rows = lazy elemRows model 0 model.elements 
        currId |> Option.bind(fun id ->
            rows.Value 
            |> Seq.tryFindIndex(fun (elem, _, _, _) -> elem.id = id) 
            |> function | Some i when i + 1 < (Seq.length rows.Value) -> Some (i + 1) | _ -> None
            |> Option.map (fun j -> Seq.item j rows.Value |> function (elem, _, _, _) -> elem.id)
        )

    let getCurrentCol1 (model:Model) =
        match model.selection with
        | _, Some(a, b) -> Some a
        | _             -> None

    let getCurrentCol2 (model:Model) =
        match model.selection with
        | _, Some(a, b) -> Some b
        | _             -> None

    let getFirstCol  (model:Model) = Some 1
    let getLastCol   (model:Model) = model.dimension |> Option.map(fun dim -> dim.attributes.Length + 3)

    let getPriorCol0 (model:Model) currCol = getFirstCol model |> Option.bind(fun x -> currCol |> Option.bind(fun i -> if i <= x then None else Some (i - 1)))
    let getNextCol0  (model:Model) currCol = getLastCol  model |> Option.bind(fun x -> currCol |> Option.bind(fun i -> if i >= x then None else Some (i + 1)))

    let getPriorId1  (model:Model) = getCurrentId1  model |> getPriorId0  model
    let getPriorId2  (model:Model) = getCurrentId2  model |> getPriorId0  model
    let getNextId1   (model:Model) = getCurrentId1  model |> getNextId0   model
    let getNextId2   (model:Model) = getCurrentId2  model |> getNextId0   model
    let getPriorCol1 (model:Model) = getCurrentCol1 model |> getPriorCol0 model
    let getPriorCol2 (model:Model) = getCurrentCol2 model |> getPriorCol0 model
    let getNextCol1  (model:Model) = getCurrentCol1 model |> getNextCol0  model
    let getNextCol2  (model:Model) = getCurrentCol2 model |> getNextCol0  model

(*    let handleKey (model: Model) (processMessages: Message -> unit) ev =
        preventDefault ev
        match (ev?key |> unbox, ev?shiftKey, ev?ctrlKey, ev?altKey) with
        | ("Esc"       , _    , _    , _    ) -> SetSelection(None, None) |> processMessages
        | ("ArrowUp"   , false, false, false) -> getPriorId1  model |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 model |> double)              |> processMessages)
        | ("ArrowDown" , false, false, false) -> getNextId1   model |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 model |> double)              |> processMessages)
        | ("ArrowLeft" , false, false, false) -> getPriorCol1 model |> Option.iter (fun c  -> SetSelection(getCurrentId1 model |> double, Some(c , c ))               |> processMessages)
        | ("ArrowRight", false, false, false) -> getNextCol1  model |> Option.iter (fun c  -> SetSelection(getCurrentId1 model |> double, Some(c , c ))               |> processMessages)
        | ("ArrowUp"   , false, true , false) -> getFirstId   model |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 model |> double)              |> processMessages)
        | ("ArrowDown" , false, true , false) -> getLastId    model |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 model |> double)              |> processMessages)
        | ("ArrowLeft" , false, true , false) -> getFirstCol  model |> Option.iter (fun c  -> SetSelection(getCurrentId1 model |> double, Some(c , c ))               |> processMessages)
        | ("ArrowRight", false, true , false) -> getLastCol   model |> Option.iter (fun c  -> SetSelection(getCurrentId1 model |> double, Some(c , c ))               |> processMessages)
        | ("ArrowUp"   , true , false, false) -> getPriorId2  model |> Option.iter (fun id -> getCurrentCol2 model |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
        | ("ArrowDown" , true , false, false) -> getNextId2   model |> Option.iter (fun id -> getCurrentCol2 model |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
        | ("ArrowLeft" , true , false, false) -> getPriorCol2 model |> Option.iter (fun c  -> getCurrentId2 model  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
        | ("ArrowRight", true , false, false) -> getNextCol2  model |> Option.iter (fun c  -> getCurrentId2 model  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
        | ("ArrowUp"   , true , true , false) -> getFirstId   model |> Option.iter (fun id -> getCurrentCol2 model |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
        | ("ArrowDown" , true , true , false) -> getLastId    model |> Option.iter (fun id -> getCurrentCol2 model |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
        | ("ArrowLeft" , true , true , false) -> getFirstCol  model |> Option.iter (fun c  -> getCurrentId2 model  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
        | ("ArrowRight", true , true , false) -> getLastCol   model |> Option.iter (fun c  -> getCurrentId2 model  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
        | _                                   -> ()
*)
    let handleKey (model: Model) (processMessages: Message -> unit) ev =
        match ev?key |> unbox with
        | "Esc"                              -> SetSelection(None, None) |> processMessages
        | "ArrowUp"     when not ev?shiftKey 
                        && not ev?ctrlKey 
                        && not ev?altKey   -> getPriorId1  model |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 model |> double) |> processMessages)
        | "ArrowDown"   when not ev?shiftKey                
                        && not ev?ctrlKey                 
                        && not ev?altKey   -> getNextId1   model |> Option.iter (fun id -> SetSelection(Some(id, id), getCurrentCol1 model |> double) |> processMessages)
        | "ArrowLeft"   when not ev?shiftKey 
                        && not ev?ctrlKey 
                        && not ev?altKey   -> getPriorCol1 model |> Option.iter (fun i  -> SetSelection(getCurrentId1 model |> double, Some(i , i )) |> processMessages)
        | "ArrowRight"  when not ev?shiftKey 
                        && not ev?ctrlKey 
                        && not ev?altKey   -> getNextCol1  model |> Option.iter (fun i  -> SetSelection(getCurrentId1 model |> double, Some(i , i )) |> processMessages)
        | "ArrowUp"     when     ev?shiftKey 
                        && not ev?ctrlKey 
                        && not ev?altKey   -> getPriorId1  model |> Option.iter (fun id -> getCurrentCol1 model |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
        | "ArrowDown"   when     ev?shiftKey                                                                                           
                        && not ev?ctrlKey                                                                                            
                        && not ev?altKey   -> getNextId1   model |> Option.iter (fun id -> getCurrentCol1 model |> Option.iter (fun c  -> EndSelection(Some id, c) |> processMessages))
        | "ArrowLeft"   when     ev?shiftKey 
                        && not ev?ctrlKey 
                        && not ev?altKey   -> getPriorCol1 model |> Option.iter (fun c  -> getCurrentId1 model  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
        | "ArrowRight"  when     ev?shiftKey 
                        && not ev?ctrlKey 
                        && not ev?altKey   -> getNextCol1  model |> Option.iter (fun c  -> getCurrentId1 model  |> Option.iter (fun id -> EndSelection(Some id, c) |> processMessages))
        | _                                -> ()

    let view (model: Model) (processMessages: Message -> unit) =
        let elemView priorRowSelected (elem: ElemEntry, expanded, symbol, level) =
            let hover = model.hover = Some elem.id
            let rowSelected     = match model.selection with 
                                  | (None      , Some(_, _))                                 -> true
                                  | (Some(a, b), _         ) when a = elem.id || b = elem.id -> true
                                  | _                                                        -> priorRowSelected
            let nextRowSelected = match model.selection with 
                                  | (Some(a, b), _         ) when a = elem.id && b = a       -> false
                                  | (Some(a, b), _         ) when a = elem.id || b = elem.id -> not priorRowSelected
                                  | _                                                        -> rowSelected
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
            |> addMoreFields model processMessages (Some elem.id) rowSelected (elem.name :: (elem.description |> Option.defaultV "") :: (elem.order |> Option.defaultV "") :: elem.attributes) Td
            , nextRowSelected

        model.dimension |>
        function 
        | None     -> Div[]
        | Some dim ->
            [ Table [ 
                _Style [ _whiteSpace "nowrap" ] ; TabIndex "1"
                THead [
                  Tr [ Th [ NText "Element"     ; _Style [ _paddingLeft "3ch" ] ] ]
                  |> addMoreFields model processMessages None false ("Code" :: "Description" :: "Order" :: dim.attributes) Th
                ]
                TBody (model.elements |> elemRows model 0 |> Seq.mapFold elemView false |> fst ) 
              ]
              |> addAttributes [_Style [ _margin "5px" ; _overflow "auto"]]
              |> OnKeyDown (handleKey model processMessages)
            ]
            |> Layouts.BasicContainer 
                [ Span [ NText dim.name ; _Style [ _margin "5px" ; newAttr "fontSize" "24px" ]] 
                  Span [ NText (" " + (dim.description |> Option.defaultV "")) ]] 
                []
            |> addAttribute (_Style [ _flexFlow "column" ])

    let selectDimension_ token (processMessages: Message -> unit) (dim: Dimension) =
        ARop.wrap {
            let! dimensions = Server2.fetchDimensionsAR_ ()
            let! elements, columns, keys, rels = Server.FetchDimRelsAR_  token dim
            let  dimEntryO = dimensions |> Seq.choose (fun (d, id, name, descO) -> 
                        if d = dim 
                        then Some {
                                    dim         = dim
                                    id          = id
                                    name        = name
                                    description = descO
                                    attributes  = columns |> Seq.skip 3 |> Seq.map(fun col -> col.name) |> Seq.toList
                                  }
                        else None) |> Seq.tryHead
            dimEntryO |> SetDimension |> processMessages
            let  getColO_ colname              = columns  |> Seq.choose(fun col -> if col.name = colname then col.field |> unbox<int> |> Some else None) |> Seq.tryHead
            let  getElement (eid: System.Guid) = elements |> Seq.tryFind (fun (_, id, _, _, _, _) -> eid = id)
            let rec elemEntry eid              = getElement eid |> Option.map(fun (_, id, name, desc, order, attribs:obj[]) ->
                                                    {
                                                        id          = eid
                                                        name        = name
                                                        description = desc  
                                                        order       = order 
                                                        attributes  = attribs |> Seq.map unbox |> Seq.toList
                                                        children    = getChildren eid |> Seq.sortBy (fun (c, o) -> o |> Option.defaultV (c.order |> Option.defaultV c.name)) |> Seq.map fst |> Seq.toList
                                                    }
                                                 )
            and  getChildren   eid             = rels |> Seq.choose(fun (child, parent, _, order) -> if eid = parent then elemEntry child |> Option.map (fun e -> (e, order)) else None)
            let elems = elements 
                        |> Seq.choose (fun (_, eid, _, _, _, _) -> if rels |> Seq.exists(fun (child, _, _, _) -> child = eid) |> not then elemEntry eid else None) 
                        |> Seq.sortBy (fun e -> e.order |> Option.filter (fun s -> s.Trim() <> "") |> Option.defaultV e.name) |> Seq.toList
            elems |> SetElements |> processMessages
        }
        |> ARop.call

[<JavaScript>]
module TestFS =
    
    type Model    = { 
                      search1    : SearchFlickr.Model
                      search2    : SearchFlickr.Model
                      menuBar    : MenuBar.Model
                      dimModel   : DimModel.Model
                      token      : Auth.Token
                      dimensions : (Dimension * System.Guid * string * string option)[]
                      selected   : Dimension option
                      hover      : System.Guid option
                    }

    let initW_ dimensions token navDim = 
        ARop.wrap {
            let! menuInit = MenuBar.initW_ token navDim
            return  {
                      search1    = SearchFlickr.init
                      search2    = SearchFlickr.init
                      menuBar    = menuInit
                      dimModel   = DimModel.init
                      token      = token
                      dimensions = dimensions
                      selected   = None
                      hover      = None
                    }
        }
    
    type Message =
        | ToSearch1Msg         of SearchFlickr.Message
        | ToSearch2Msg         of SearchFlickr.Message
        | ToMenuBar            of MenuBar.Message
        | ToDimModel           of DimModel.Message
        | SetHover             of System.Guid option
        | SelectDimension      of Dimension option

    let update msg model =
        match msg with
        | ToSearch1Msg    msg  -> { model with search1    = SearchFlickr.update msg model.search1  }
        | ToSearch2Msg    msg  -> { model with search2    = SearchFlickr.update msg model.search2  }
        | ToMenuBar       msg  -> { model with menuBar    = MenuBar.update      msg model.menuBar  }
        | ToDimModel      msg  -> { model with dimModel   = DimModel.update     msg model.dimModel }
        | SelectDimension dimO -> { model with selected   = dimO                                   }
        | SetHover        idO  -> { model with hover      = idO                                    }

    let text txt    = [ H3 [NText txt] ; _Style [_background txt] ]

    let preventDefault ev               = (ev?preventDefault :> FuncWithOnlyThis<obj, unit>).CallUnsafe(ev, null) |> ignore
    let setData        ev (data:string) = (ev?dataTransfer?setData :> FuncWithOnlyThis<obj, unit  >).CallUnsafe(ev?dataTransfer, "text", data) |> ignore
    let getData        ev      :string  = (ev?dataTransfer?getData :> FuncWithOnlyThis<obj, string>).CallUnsafe(ev?dataTransfer, "text") |> unbox

    let view (model: Model) (processMessages: Message -> unit) =
        let menu     = MenuBar.view model.menuBar   (fun msg -> msg |> (ToMenuBar  >> processMessages))
        let dimModel = DimModel.view model.dimModel (fun msg -> msg |> (ToDimModel >> processMessages)) |> Layouts.Children
        let findDimension  fdim = model.dimensions |> Seq.choose (fun (dim, _, _, _) -> if fdim = (sprintf "%A" dim) then Some dim else None) |> Seq.head 
        let selectDimension dim = 
            dim |> Some |> SelectDimension |> processMessages
            DimModel.selectDimension_ model.token (ToDimModel >> processMessages) dim
        let dimensions = 
            model.dimensions 
            |> Seq.map (fun (dim, _, name, _) -> let hover = model.hover = Some dim.dimensionId 
                                                 let bStyle, back = if Some dim = model.selected 
                                                                    then "groove", "lightblue" 
                                                                    else "none", if hover then "#e6e6e6" else "transparent"
                                                 Div [ _Style [ _padding     "4px"
                                                                _borderStyle bStyle
                                                                _borderWidth "1px"
                                                                _background  back 
                                                                _cursor      "pointer"]
                                                       Draggable true
                                                       H4 [ NText "\uE032 " ; _Style [ _display "inline" ; _fontFamily "Glyphicons Halflings" ] ]
                                                       H4 [ NText name      ; _Style [ _display "inline"                                               ] ] 
                                                     ] 
                                                 |> OnDrop     (fun ev -> preventDefault ev
                                                                          getData ev |> findDimension |> selectDimension
                                                                          )
                                                 |> OnDragStart(fun ev -> setData ev <| sprintf "%A" dim)
                                                 |> OnDragOver (fun ev -> if (getData ev).StartsWith "Dimension" then
                                                                              preventDefault ev
                                                                              if model.hover <> Some dim.dimensionId then dim.dimensionId |> Some |> SetHover |> processMessages)
                                                 |> OnMouseOver(fun _  -> if model.hover <> Some dim.dimensionId then dim.dimensionId |> Some |> SetHover |> processMessages)
                                                 |> OnMouseOut (fun _  ->                    None |> SetHover |> processMessages)
                                                 |> OnClick    (fun _  -> dim |> selectDimension) )
        let dimensionsTitle = Span [ NText "Dimensions" ; _Style [ _margin "5px" ; newAttr "fontSize" "30px" ]]
        let dimensionsPane = Layouts.BasicContainer [ dimensionsTitle ] [] dimensions |> addAttributes [_Style [ _flexFlow "column"               ]] |> Layouts.Children
        let dimensionsView = Layouts.BasicContainer   dimensionsPane    [] dimModel   |> addAttributes [_Style [ _flexFlow "row"    ; _flex "1 0" ]]
        [ dimensionsView
          SearchFlickr.view model.search2     (fun msg -> msg |> ToSearch2Msg |> processMessages) 
          |> addChildren [_Style [ _flex "1 0" ; _background "lightsalmon"] ]
        ]
        |> (fun l ->              _Style [ _display "flex" ] :: l)
        |> Layouts.HorizontalSplitter [menu] (text "green") (text "blue") (text "yellow")
        |> Layouts.Stretch

    let getDimByNameR_ dimensions dimName =
        dimensions 
        |> Seq.choose (fun (dim, cc, name, desc) -> if name = dimName then Some dim else None) 
        |> Seq.tryHead
        |> Rop.fromOption (ErrRecordNotFound ("dimension", dimName))

    let showForm_ node =
        ARop.wrap {
            do!  Rop.tryProtection()
            let! token      = Server.fetchTokenAR_()      
            let! dimensions = Server2.fetchDimensionsAR_()
            let! navDim     = getDimByNameR_ dimensions "_Navigation"
            let! initModel  = initW_ dimensions token navDim
            App.app
                <| initModel
                <| update
                <| view
            |> App.run node
        } 
        |> ARop.call
