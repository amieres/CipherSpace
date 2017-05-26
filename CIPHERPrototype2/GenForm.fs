namespace CIPHERPrototype1
open Model
open Model2
open WebSharper
open WebSharper.JavaScript
open Rop



[< JavaScript >]
[< Sealed >]
type ReactLoader() =
    inherit WebSharper.Core.Resources.BaseResource("/Resources/react"
        ,  "react.js"
        ,  "react-dom.js"
        ,  "remarkable.min.js")

[< JavaScript ; Require(typeof<ReactLoader>) ; AllowNullLiteral >]
type Attrs [< JavaScript ; Inline "{}" >]  () =
    [< DefaultValue                               >]          val mutable id                      : string
    [< DefaultValue                               >]          val mutable rel                     : string
    [< DefaultValue                               >]          val mutable role                    : string
    [< DefaultValue                               >]          val mutable name                    : string
    [< DefaultValue                               >]          val mutable action                  : string
    [< DefaultValue                               >]          val mutable ``method``              : string
    [< DefaultValue                               >]          val mutable encType                 : string
    [< DefaultValue                               >]          val mutable alt                     : string
    [< DefaultValue                               >]          val mutable ariaControls            : string 
    [< DefaultValue                               >]          val mutable ariaSelected            : string 
    [< DefaultValue                               >]          val mutable ariaExpanded            : string 
    [< DefaultValue                               >]          val mutable ariaHidden              : string 
    [< DefaultValue                               >]          val mutable ariaLabelledby          : string 
    [< DefaultValue                               >]          val mutable href                    : string
    [< DefaultValue                               >]          val mutable scope                   : string
    [< DefaultValue                               >]          val mutable className               : string
    [< DefaultValue                               >]          val mutable placeholder             : string
//    [< DefaultValue                               >]          val mutable dataDismiss             : string
    [< DefaultValue                               >]          val mutable ``type``                : string
    [< DefaultValue                               >]          val mutable value                   : string
    [< DefaultValue                               >]          val mutable defaultValue            : string
    [< DefaultValue                               >]          val mutable style                   : obj
    [< DefaultValue                               >]          val mutable tabIndex                : string
    [< DefaultValue                               >]          val mutable unselectable            : string
    [< DefaultValue                               >]          val mutable label                   : string
    [< DefaultValue                               >]          val mutable title                   : string
    [< DefaultValue                               >]          val mutable src                     : string
    [< DefaultValue                               >]          val mutable disabled                : bool
    [< DefaultValue                               >]          val mutable autofocus               : bool
    [< DefaultValue                               >]          val mutable validations             : InputValidation []
    [< DefaultValue                               >]          val mutable target                  : obj
    [< DefaultValue                               >]          val mutable key                     : obj
    [< DefaultValue                               >]          val mutable button                  : obj
    [< DefaultValue                               >]          val mutable dangerouslySetInnerHTML : obj
    [< DefaultValue                               >]          val mutable cell                    : obj
    [< DefaultValue                               >]          val mutable __html                  : obj
    [< DefaultValue                               >]          val mutable onChange                : obj
    [< DefaultValue                               >]          val mutable onSubmit                : obj
    [< DefaultValue                               >]          val mutable processMessages         : obj -> unit
    [< DefaultValue                               >]          val mutable fieldDefinition         : obj 
    [< DefaultValue                               >]          val mutable updateState             : obj
    [< DefaultValue                               >]          val mutable passState               : obj
    [< DefaultValue                               >]          val mutable onClick                 : obj
    [< DefaultValue                               >]          val mutable maxLength               : int
    [< JavaScript; Inline "$0.preventDefault()"   >]        member   this.preventDefault()                = ()
    [< Inline "$.extend(true, {}, $this, $a)"     >]        member   this.ExtendDeep (a:obj)      : Attrs = X<_>
    

[< JavaScript >]
type Remarkable [< JavaScript ; Inline "new Remarkable()" >] () =
    [< JavaScript; Inline "$0.render($elem)"                                        >]        member this.render(elem: obj): obj = X<_>

[< JavaScript >]
type ReactClass [< JavaScript ; Inline "{}" >]  () = // do not use: use R.createClass instead
    [< DefaultValue                               >]          val mutable dummy                   : unit

[< JavaScript ; Require(typeof<ReactLoader>) ; AllowNullLiteral >]
type R() =
    [< Inline "React.createClass($options)"                                   >] static member createClass  (options: ClassOptions): ReactClass = X<_>
    [< Inline "React.createClass({displayName: $name, getInitialState: $init, render:$render})" >] 
                                                                                 static member createClass  (name: string, init: obj, render: obj): ReactClass = X<_>
    [< Inline "React.createClass({displayName: $name, render:$render})"       >]                                                       
                                                                                 static member createClass  (name: string,            render: obj): ReactClass = X<_>
    [< Inline "React.Wrap($elems)"                                            >] static member wrap(elems: obj): obj = X<_>
    [< Inline "React.createElement($elem)"                                    >] static member E(elem: obj                                                       ): R = X<_>
    [< Inline "React.createElement($elem, $attr)"                             >] static member E(elem: obj, attr: Attrs                                          ): R = X<_>
    [< Inline "React.createElement($elem, $attr, $c1)"                        >] static member E(elem: obj, attr: Attrs, c1:R                                    ): R = X<_>
    [< Inline "React.createElement($elem, $attr, $c1,$c2)"                    >] static member E(elem: obj, attr: Attrs, c1:R, c2:R                              ): R = X<_>
    [< Inline "React.createElement($elem, $attr, $c1,$c2,$c3)"                >] static member E(elem: obj, attr: Attrs, c1:R, c2:R, c3:R                        ): R = X<_>
    [< Inline "React.createElement($elem, $attr, $c1,$c2,$c3,$c4)"            >] static member E(elem: obj, attr: Attrs, c1:R, c2:R, c3:R, c4:R                  ): R = X<_>
    [< Inline "React.createElement($elem, $attr, $c1,$c2,$c3,$c4,$c5)"        >] static member E(elem: obj, attr: Attrs, c1:R, c2:R, c3:R, c4:R, c5:R            ): R = X<_>
    [< Inline "React.createElement($elem, $attr, $c1,$c2,$c3,$c4,$c5,$c6)"    >] static member E(elem: obj, attr: Attrs, c1:R, c2:R, c3:R, c4:R, c5:R, c6:R      ): R = X<_>
    [< Inline "React.createElement($elem, $attr, $c1,$c2,$c3,$c4,$c5,$c6,$c7)">] static member E(elem: obj, attr: Attrs, c1:R, c2:R, c3:R, c4:R, c5:R, c6:R, c7:R): R = X<_>
    [< Inline "$text"                                                         >] static member t(text: string                                                    ): R = X<_>
    [< Inline "React.createElement.apply(null, $args)"                        >] static member E_(args:obj[]                                                     ): R = X<_>
    static member E0 (elem: string) (attrs: Attrs list) (children: R list) = 
                        let reduceAtt = 
                            match attrs with
                            | [] -> Attrs()
                            | _  -> attrs |> List.reduce (fun a b -> a.ExtendDeep b)
                        elem :> obj
                        :: (reduceAtt :> obj)
                        :: (children |> Seq.cast<obj> |> Seq.toList)
                        |> function
                           | [] -> R.E(elem, reduceAtt)
                           | l  -> l |> List.toArray |> R.E_
    static member div    (attrs: Attrs list) (children: R list) = R.E0 "div"    attrs                       children
    static member span   (attrs: Attrs list) (children: R list) = R.E0 "span"   attrs                       children
    static member tag tg (attrs: Attrs list) (children: R list) = R.E0 tg       attrs                       children
    static member label  (attrs: Attrs list) (children: R list) = R.E0 "label"  attrs                       children
    static member button label (attrs: Attrs list) f            = R.E0 "button" (Attrs(onClick = f)::attrs) [label]
    static member input typeI (onChange: Attrs -> unit) (attrs: Attrs list) = R.E0 "input"  (Attrs(``type`` = typeI, onChange = onChange)::attrs) []
    static member className (name: string) = Attrs(className = name)
    static member role      (name: string) = Attrs(role      = name)
    static member style     (obj : obj   ) = Attrs(style     = obj )
    static member ``type``  (name: string) = Attrs(``type``  = name)
    static member id        (name: string) = Attrs(id        = name)
    static member onChange  (f   : obj)    = Attrs(onChange  = f   )
    [< Inline "$r.props.onClick = $f "                        >] static member onClick (f: obj -> unit) (r:R) : R = X<_>

and ClassOptions [< JavaScript ; Inline "{}" >]  () =
    [< DefaultValue                               >]          val mutable displayName             : string
    [< DefaultValue                               >]          val mutable getInitialState         : obj
    [< DefaultValue                               >]          val mutable render                  : FuncWithOnlyThis<obj, R   >
    [< DefaultValue                               >]          val mutable componentDidMount       : FuncWithOnlyThis<obj, unit>
    [< DefaultValue                               >]          val mutable shouldComponentUpdate   : FuncWithOnlyThis<obj, bool>



[< JavaScript >]
type ReactDOM() =
    [< JavaScript; Inline "ReactDOM.render($elem, $dom)" >] static member render  (elem: obj, dom: Dom.Element): unit = X<_>
    [< JavaScript; Inline "ReactDOM.findDOMNode($elem)"  >] static member findDOMNode  (elem: obj): Dom.Element = X<_>


[< JavaScript >]
type FileReader [< JavaScript ; Inline "new FileReader()" >]  () =
    [< JavaScript; Inline "$0.onload = $callback" >] member this.onload    (callback: obj) = ()
    [< JavaScript; Inline "$0.readAsText($file) " >] member this.readAsText(file    : obj) = ()

[<JavaScript>]
module ReactHtml =

    type ReactNode =
    | NElement   of name:string * children:seq<ReactNode>
    | NText      of string
    | NAttribute of name:string * value:obj
    | NAttrR     of Attrs list
    | ReactR     of R
    | ReactObj   of obj
    | NEmpty

    let addChildren   newChildren node =
        match node with
        | NElement  (name, children) -> NElement (name , Seq.append children newChildren)
        | NText     text             -> NElement ("div", Seq.append [node]   newChildren)
        | NAttribute(_   , _       ) -> NElement ("div", Seq.append [node]   newChildren)
        | NAttrR    attrs            -> NElement ("div", Seq.append [node]   newChildren)
        | ReactR    r                -> node   
        | ReactObj  o                -> node
        | NEmpty                     -> NElement ("div",                     newChildren)

    let addChild  child = addChildren [child]

    let addAttributes = addChildren
    let addAttribute  = addChild

    let Div         children   = NElement   ("div"         , children)
    let Span        children   = NElement   ("span"        , children)
    let Menu        children   = NElement   ("menu"        , children)
    let Img         children   = NElement   ("img"         , children)
    let Ul          children   = NElement   ("ul"          , children)
    let Li          children   = NElement   ("li"          , children)
    let H1          children   = NElement   ("h1"          , children)
    let H2          children   = NElement   ("h2"          , children)
    let H3          children   = NElement   ("h3"          , children)
    let H4          children   = NElement   ("h4"          , children)
    let H5          children   = NElement   ("h5"          , children)
    let H6          children   = NElement   ("h6"          , children)
    let Br          children   = NElement   ("br"          , children)
    let Table       children   = NElement   ("table"       , children)
    let THead       children   = NElement   ("thead"       , children)
    let Th          children   = NElement   ("th"          , children)
    let TBody       children   = NElement   ("tbody"       , children)
    let Tr          children   = NElement   ("tr"          , children)
    let Td          children   = NElement   ("td"          , children)
    let P           children   = NElement   ("p"           , children)
    let A           children   = NElement   ("a"           , children)
    let Label       children   = NElement   ("label"       , children)
    let Input       children   = NElement   ("input"       , children)
    let Select      children   = NElement   ("select"      , children)
    let OptionA     children   = NElement   ("option"      , children)
    let Button      children   = NElement   ("button"      , children)
                                                           
    let NewAttr     name value = NAttribute (name          , value   )
    let Id          id         = NAttribute ("id"          , id      )
    let Key         key        = NAttribute ("key"         , key     )
    let Role        role       = NAttribute ("role"        , role    )
    let Src         src        = NAttribute ("src"         , src     )
    let Href        href       = NAttribute ("href"        , href    )
    let Style       style      = NAttribute ("style"       , style   )
    let Class       clas       = NAttribute ("className"   , clas    )
    let Type        typ        = NAttribute ("type"        , typ     )
    let Value       value      = NAttribute ("value"       , value   )
    let TabIndex    idx        = NAttribute ("tabIndex"    , idx     )
    let AutoFocus   foc        = NAttribute ("autoFocus"   , foc     )
    let Disabled    dis        = NAttribute ("disabled"    , dis     )
    let Placeholder txt        = NAttribute ("placeholder" , txt     )
    let MaxLength   len        = NAttribute ("maxLength"   , len     )
    let Checked     chk        = NAttribute ("checked"     , chk     )
    let Draggable   drg        = NAttribute ("draggable"   , drg     )

    //let OnShow      (f:obj)    = NAttribute ("onShow"      , f       ) |> addAttribute
    let OnClick     (f:obj)    = NAttribute ("onClick"     , f       ) |> addAttribute
    let OnChange    (f:obj)    = NAttribute ("onChange"    , f       ) |> addAttribute
    let OnMouseOver (f:obj)    = NAttribute ("onMouseOver" , f       ) |> addAttribute
    let OnMouseOut  (f:obj)    = NAttribute ("onMouseOut"  , f       ) |> addAttribute
    let OnMouseDown (f:obj)    = NAttribute ("onMouseDown" , f       ) |> addAttribute
    let OnMouseUp   (f:obj)    = NAttribute ("onMouseUp"   , f       ) |> addAttribute
    let OnDrop      (f:obj)    = NAttribute ("onDrop"      , f       ) |> addAttribute
    let OnDragStart (f:obj)    = NAttribute ("onDragStart" , f       ) |> addAttribute
    let OnDragOver  (f:obj)    = NAttribute ("onDragOver"  , f       ) |> addAttribute
    let OnKeyDown   (f:obj)    = NAttribute ("onKeyDown"   , f       ) |> addAttribute

    let newAttr name value =
        let a = Attrs()
        setJVSProp a name value
        a

    let _cursor       cur        = newAttr     "cursor"        cur
    let _margin       mar        = newAttr     "margin"        mar
    let _fontSize     siz        = newAttr     "fontSize"      siz
    let _alignSelf    alg        = newAttr     "alignSelf"     alg
    let _top          top        = newAttr     "top"           top 
    let _bottom       bot        = newAttr     "bottom"        bot 
    let _left         lef        = newAttr     "left"          lef 
    let _right        rig        = newAttr     "right"         rig 
    let _height       hei        = newAttr     "height"        hei 
    let _minHeight    hei        = newAttr     "minHeight"     hei 
    let _maxHeight    hei        = newAttr     "maxHeight"     hei 
    let _width        wid        = newAttr     "width"         wid 
    let _minWidth     wid        = newAttr     "minWidth"      wid 
    let _maxWidth     wid        = newAttr     "maxWidth"      wid 
    let _zIndex       zid        = newAttr     "zIndex"        zid 
    let _position     pos        = newAttr     "position"      pos 
    let _display      dis        = newAttr     "display"       dis 
    let _flexFlow     flo        = newAttr     "flexFlow"      flo 
    let _flex         fle        = newAttr     "flex"          fle 
    let _flexBasis    bas        = newAttr     "flexBasis"     bas 
    let _flexGrow     gro        = newAttr     "flexGrow"      gro 
    let _flexShrink   gro        = newAttr     "flexShrink"    gro 
    let _padding      pad        = newAttr     "padding"       pad 
    let _paddingLeft  lef        = newAttr     "paddingLeft"   lef 
    let _paddingRight rig        = newAttr     "paddingRight"  rig
    let _borderStyle  sty        = newAttr     "borderStyle"   sty
    let _borderWidth  wid        = newAttr     "borderWidth"   wid
    let _marginBottom mar        = newAttr     "marginBottom"  mar
    let _overflow     ove        = newAttr     "overflow"      ove
    let _background   clr        = newAttr     "background"    clr
    let _fontFamily   fml        = newAttr     "fontFamily"    fml
    let _whiteSpace   wsp        = newAttr     "whiteSpace"    wsp 
    let _textOverflow tov        = newAttr     "textOverflow"  tov
    let _border       brd        = newAttr     "border"        brd
                                                           
    let _Style (styles: Attrs seq) =
        styles 
        |> Seq.reduce (fun a b -> JQuery.JQuery.Extend(JQuery.JQuery.Extend(Attrs(), a), b) :?> Attrs )
        |> Style

    let rec toReact (node:ReactNode) : R =
        let attributeR =
            function
            | NElement (tag, children) -> []
            | NText      text          -> []
            | ReactR     r             -> []
            | ReactObj   o             -> []
            | NAttribute (name, value) -> [ newAttr name value ]
            | NAttrR     attrs         -> attrs
            | NEmpty                   -> []
        let rec elementR =
            function
            | NElement (tag, children) -> let subNodes   = children |> Seq.choose  elementR   |> Seq.toList
                                          let attributes = children |> Seq.collect attributeR |> Seq.toList
                                          Some <| R.tag tag attributes subNodes
            | NText      text          -> Some <| R.t text
            | ReactR     r             -> Some <| r
            | ReactObj   o             -> Some <| R.E(o)
            | NAttribute (name, value) -> None
            | NAttrR     attrs         -> None
            | NEmpty                   -> Some null
        elementR node |> Option.defaultV null
                                

[< JavaScript >]
module ClientForm =
    open Repository

    let validationMsg msg =
        if msg = ""
            then R.t ""
            else R.E("span", Attrs ( className= "alert validation"), R.t msg)

    type VirtualDomRenderer<'M> = 'M -> (('M -> 'M) -> unit) -> R

    let reactRoot<'M> (initial:'M) (domElement: Dom.Element) (children: VirtualDomRenderer<'M>) =
        let virtualChildrenRenderer (this:obj) : R =
            let setState_                       = this?setState :> FuncWithArgs<obj * obj, obj>
            let setState  (newStateF: 'M -> 'M) = setState_.ApplyUnsafe (this, [| newStateF |]) |> ignore
            let state               : 'M        = this?state
            children state setState
        let rootClass = R.createClass("rootClass", (fun () -> initial), FuncWithOnlyThis(virtualChildrenRenderer))
        ReactDOM.render(R.E(rootClass), domElement)

    let reactRoot2<'M> (initial:'M) (domElement: Dom.Element) (children: 'M -> ('M -> unit) -> R) =
        let virtualChildrenRenderer (this:obj) : R =
            let setState_                       = this?setState :> FuncWithArgs<obj * obj, obj>
            let setState  (newState : 'M      ) = setState_.ApplyUnsafe (this, [| newState |]) |> ignore
            let state               : 'M        = this?state
            children state setState
        let rootClass = R.createClass("rootClass", (fun () -> initial), FuncWithOnlyThis(virtualChildrenRenderer))
        ReactDOM.render(R.E(rootClass), domElement)

    // this is where non-react children can be added
    let reactContainerClass className (afterRender: obj -> Dom.Element -> unit) =
        R.createClass(ClassOptions(
                         displayName           = "containerClass"
                       , componentDidMount     = FuncWithOnlyThis(fun this -> afterRender this (ReactDOM.findDOMNode(this)))
                       , shouldComponentUpdate = FuncWithOnlyThis(fun _    -> false)
                       , render                = FuncWithOnlyThis(fun this ->
                            R.E("div", Attrs(className = className))
        )))

    let dataStorageToDataValue dS =
        match dS with
        | SingleValue dV      -> dV
        | _                   -> DUnsupported

    let dataValueToString dV =
        match dV with
        | DText s -> s
        | DNull   -> ""
        | _       -> sprintf "<%A>" dV


    let renderStringInput (fieldDef:FieldDefinition) text (validations:InputValidations) (setText: string -> unit) =
        let groupClass = if fieldDef.preButton = "" && fieldDef.postButton = "" then "" else "input-group "
        let preButton = 
            if fieldDef.preButton  = "" 
                then R.t ""
                else R.E("span", Attrs ( className= "input-group-btn")
                        , R.E ("button"  , Attrs (``type``= "button", className = "btn btn-default"), R.t fieldDef.preButton))
        let postButton = 
            if fieldDef.postButton = "" 
                then R.t ""
                else R.E("span", Attrs ( className= "input-group-btn")
                        , R.E ("button"  , Attrs (``type``= "button", className = "btn btn-default"), R.t fieldDef.postButton))
        let classAlert = if validations.Count = 0 then "" else " alert-danger"
        let onChange (e:Attrs) = setText e.target?value 
        let attrs = 
            Attrs (``type``       = fieldDef.inputType
                    , placeholder = fieldDef.placeholder
                    , value       = text
                    , onChange    = onChange
                    , className   = "form-control" + classAlert
            )
        if fieldDef.maxLen > 0 then attrs.maxLength <- fieldDef.maxLen
        R.E("div", Attrs ( className= "form-group", key = fieldDef.fieldName)
            , R.E("label", Attrs ( className= "textInputLabel"), R.t fieldDef.label)
            , validationMsg (validations |> Set.map (sprintf "%A") |> String.concat ", ")
            , R.E("div", Attrs ( className= groupClass)
                , preButton
                , R.E("input", attrs)
                , postButton
            )
        )

    let renderStringInputDM (fieldDef:FieldDefinition) (state: DataModel) (setState: DataModel -> unit) =
        let value = state.data  |> dataStorageToDataValue 
        let text  = value       |> dataValueToString
        let validations =
            state.validations
            |> Seq.map(fun v -> v.reducePath())
            |> Seq.choose( 
                function
                | InputValidation v -> Some v
                | _ -> None
            ) 
            |> Set
        let setText text =
            let value = 
                if fieldDef.canBeNull && text = ""
                then DNull
                else DText text
            setState { data = SingleValue value; validations = fieldDef.validations value |> Set.map(fun v -> InputValidation v)}
        renderStringInput fieldDef text validations setText

    let renderFormFields (fields: FieldDefinition list) (state: DataModel) (setState: (DataModel -> DataModel) -> unit) =
        let addValidationsFor name validations =
            state.validations 
            |> Set.filter (function |PathValidation(h::_, _) -> h <> name | _ -> true)
            |> Set.union validations
        let getValidationsFor name =
            state.validations
            |> Seq.choose (fun v -> if v.headPathIs name then Some (v.reducePath()) else None)
            |> Set
        let fieldsR =
              fields |> List.choose (fun fd -> 
                if fd.hidden then None
                else renderStringInputDM fd 
                            {data = SingleValue (fd.getter state.data); validations = getValidationsFor fd.fieldName} 
                            (fun subState -> 
                                match subState.data with
                                | SingleValue dV ->
                                        fd.setter dV state.data
                                             |> Option.iter (fun newData -> setState (fun state -> {data        = newData
                                                                                                    validations = subState.validations 
                                                                                                                  |> Set.map (fun v -> v.addPath fd.fieldName)
                                                                                                                  |> addValidationsFor fd.fieldName
                                                                                     }))
                                | _ -> setState (fun state -> {data        = state.data
                                                               validations = Set [ InputValidation (VUnsupportedData "Expected SingleValue")]}))
                     |> Some
                ) 
        R.div [R.className "panel-body flex flexgrow"] fieldsR

    let renderInputForm (formId) (title:string) (children: VirtualDomRenderer<DataModel>) (state: DataModel) (setState: (DataModel -> DataModel) -> unit) =
        let submit (e:Attrs) = 
            if state.validations.Count = 0 then
                Server.call {
                    do! Server.saveSingleRecordData_ formId state.data
                    JS.Window.Location.Reload()
                }
            e.preventDefault()
        let validationMsgs   = 
            state.validations
            |> Seq.map(fun v -> sprintf "%A" v) 
            |> String.concat ",  "
            |> validationMsg
        R.E("form", Attrs ( className= "panel panel-info", onSubmit = submit)
            , R.E("div", Attrs ( className= "panel-heading")
                , R.E ("label", Attrs (className= "panel-title text-center"), R.t title))
            , R.E("div", Attrs ( className= "panel-body")
                , children state setState )
            , R.E("div", Attrs ( className= "panel-footer")
                , R.E ("input"  , Attrs (``type``= "submit", placeholder= "Post", className = "btn btn-primary", disabled = (state.validations.Count > 0)))
                , validationMsgs
            )
        )

    let private newDataArray (data: DataValue []) change =
        let (field, i:int, v: DataValue) = change
        data |> Array.mapi (fun i' v' -> if i = i' then v else v') |> Some
    
    let validateEmailP email =
        let emailPattern = new RegExp("""^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$""")
        let emailStr = dataValueToString email
        if emailPattern.Test(emailStr)
        then Set []
        else Set [ VPatternNotMatch ("not a valid email", emailStr) ]

    let private fieldsFromColumns (columns: ColumnDefinition list) =
        let pathValidations pathItem inputVals =
            inputVals
            |> Set.map (fun iV -> PathValidation([ pathItem ], iV))
        columns
        |> Seq.mapi (fun i c ->
            let getter = fun (ds:DataStorage) -> 
                match ds with 
                | SingleRow data -> data.[i]
                | _              -> DUnsupported
            let setter (v:DataValue) (ds:DataStorage) = 
                match ds with
                | SingleRow data -> (c.ColumnName, i, v) |> newDataArray data |> Option.map SingleRow
                | _              -> None
            {defField getter with 
                    fieldName  = c.ColumnName
                    labelO     = c.Caption
                    maxLen     = c.MaxLength
                    canBeNull  = c.AllowDBNull
                    canBeEmpty = c.AllowDBNull
                    typeF      = c.DataTypeName
                    setter     = setter
            }
        )
        |> Seq.map (fun fd ->
                match fd.fieldName with
                | "industry_type"             -> { fd with labelO      = Some "Industry"   }
                | s when s.EndsWith("_email") -> { fd with postButton  = "Verify" 
                                                           inputType   = "email" 
                                                           validation  = Some (fun dv -> if (fd.canBeNull || fd.canBeEmpty) && (dv = DNull || dv = DText "")
                                                                                         then Set [] 
                                                                                         else fd.basicValidations dv |> Set.union (validateEmailP dv))}
                | _                           -> fd
        )
        |> Seq.toList

    open WebSharper.Html.Client

    let inputForm (formId: InputFormId) = 
        let container = Div [ Attr.Class "flex flexgrow"] |>! OnAfterRender (fun container ->
            Server.call {
                let! title, columns, data   = Server.fetchSingleRecordData_ formId 
                let  fields                 = fieldsFromColumns columns
                let  initial                = { 
                                                data                 = data
                                                validations          = Set []
                                              }
                renderFormFields fields
                |> renderInputForm formId title 
                |> reactRoot initial container.Dom
            } 
        )
        container

open ReactHtml

[< JavaScript >]
module App =

    type App<'model, 'msg> = {
        Model  : 'model
        Update : 'msg   -> 'model         -> 'model
        View   : 'model -> ('msg -> unit) -> ReactNode
    }

    let app init update view =  {
        Model  = init
        Update = update
        View   = view  
    }

    let run container (app: App<'Model, 'Msg>) =
        let render (state: 'Model) (setState: ('Model -> 'Model) -> unit) : R = 
            let processMessages msg =
                setState (fun state -> app.Update msg state)
            app.View state processMessages |> toReact
        ClientForm.reactRoot app.Model container render
        
[< JavaScript >]
module Popup =

    type Model = {
        show  : bool
        top   : float
        left  : float
        baseX : float
        baseY : float
    }

    let init = {
        show  = false
        top   = -1.0
        left  = -1.0
        baseX = 0.0
        baseY = 0.0
    }

    type Message =
        | ShowPopUp  of float * float
        | AdjustBase of float * float
        | HidePopUp      

    let update (message: Message) (model: Model) : Model =
            match message with
            | HidePopUp             -> { model with show  = false }
            | ShowPopUp(top, left)  -> { model with show  = true
                                                    top   = top
                                                    left  = left  }
            | AdjustBase(top, left) -> { model with baseX = left
                                                    baseY = top   }

    let view (menuItems: seq<string * (unit -> unit)>) (model: Model) processMessages = 
        let item (text, func_ : (unit -> unit)) = 
            Li [ if text = "-" then yield Class "divider"
                 yield A  [ TabIndex "-1"; Href "#" ; NText text ] 
                         |> OnClick (fun _ -> HidePopUp |> processMessages; func_()) 
            ]
        if model.show then
            Div [ Class      "dropdown clearfix"; _Style [_display "block"; _position "fixed"; _height "95%"; _width "95%"; _zIndex "100" ] 
                  Menu [ Class "dropdown-menu"  ; Role "menu"
                         _Style [_display "block"; _position "fixed"; _marginBottom "5px"; model.top + model.baseY |> sprintf "%fpx" |> _top ; model.left  + model.baseX |> sprintf "%fpx" |> _left ]
                       ]
                    |> addChildren (menuItems |> Seq.map item )
//                    |> OnShow (fun (e:Dom.Element) -> (model.top - e.GetBoundingClientRect().Top,  model.left - e.GetBoundingClientRect().Left)
//                                                      |> function 
//                                                         | (x, y) as v when abs(x) < 1.0 && abs(y) < 1.0 -> v |> AdjustBase |> processMessages
//                                                         | _                                             -> ())
                ]
            |> OnClick (fun _ -> HidePopUp |> processMessages)
        else NEmpty 

[< JavaScript >]
module Dialog =

    type Model = { show : bool  }
    let init   = { show = false }
    type Message = ShowDialog of bool

    let update (message: Message) (model: Model) : Model =
        match message with
        | ShowDialog show -> {model with show = show }

    let rButtons (buttons: seq<string * string * (unit->unit)>) =
        buttons 
        |> Seq.map (fun (text, className, func_) -> Button [ Class className; Disabled false ; NText text ] |> OnClick func_ )
        |> Seq.toList

    let view title buttons (content: ReactNode list) (model: Model) processMessages =
        if model.show then
            let close_ () = ShowDialog false |> processMessages
            let buttons2 = buttons |> Seq.map(fun (a, b, f) -> a,b, fun _ -> close_(); f()) |> rButtons
            Div [ Id "dialog" ; Role "dialog" ; Class "modal" ; _Style [ _display "block"; _position "fixed"; _marginBottom "5px" ]
                  Div [ Class                         "modal-dialog" 
                        Div [ Class                   "modal-content"
                              Div [ Class             "modal-header" 
                                    Button [ Class    "close"         ; NText "×"   ] |> OnClick close_
                                    H4     [ Class    "modal-title"   ; NText title ]
                                  ]                   
                              Div [ Class             "modal-body"   ] |> addChildren content
                              Div [ Class             "modal-footer" ] |> addChildren buttons2
                        ]
                    ]
                ]
        else NEmpty 

[< JavaScript >]
module GenForm =
    open ReactHtml

    type Model = {
        title       : string
        processing  : bool
        message     : string
        debug       : bool
        modified    : bool
        validations : Set<Validation>
    }

    let init title = {
        title       = title
        processing  = false
        message     = ""
        debug       = false
        modified    = false
        validations = Set []
    }

    type Message =
        | ShowInfo        of string * bool
        | AddValidation   of string * Validations
        | SetModified     of bool
        | SetDebug        of bool
//        | ShowDialog      of Dialog
//        | ShowPopup       of float * float

    let addValidationsFor name validations (newValidations:Validations) =
        validations 
        |> Set.filter (function |PathValidation(h::_, _) -> h <> name | _ -> true)
        |> Set.union (newValidations |> Set.map(fun v -> v.addPath name))

    let getValidationsFor name (validations:Validations) =
        validations
        |> Seq.choose (fun v -> if v.headPathIs name then Some (v.reducePath()) else None)
        |> Set

    let update (message: Message) (model: Model) : Model =
         match message with
            | Message.ShowInfo(msg, p)         -> {model with message     = msg
                                                              processing  = p        }
            | AddValidation (name, vs)         -> {model with validations = (addValidationsFor name model.validations vs) }
            | SetModified    modified          -> {model with modified    = modified }  
            | SetDebug       debug             -> {model with debug       = debug    }
         |> fun model ->
               JS.Window.Onbeforeunload <-  
                    if model.modified
                    then (fun (e:Dom.Event) -> e?returnValue  <- "Changes you made may not be saved.")
                    else (fun (e:Dom.Event) -> ())
               model


    let view buttons (content: ReactNode list) (model: Model) processMessages =
        let buttons2 = ((".", "btn-xs btn-default  pull-right", (fun () -> not model.debug |> SetDebug |> processMessages)) :: buttons) 
                       |> Dialog.rButtons 
        let msg = if   model.message = "" 
                  then NEmpty
                  else Span [ Class "alert validation"        ; NText model.message ]
        Div [ Class                 "panel panel-info flex flexgrow"
              Div [ Class           "panel-heading heading"         
                    Label   [ Class "panel-title text-center" ; NText <| (if model.modified then "*" else "") + model.title ]
                    msg             
                    Div     [ Class "btn-toolbar pull-right"   ] |> addChildren buttons2
                ]                   
              Div           [ Class "panel-body flex flexgrow" ] |> addChildren content
            ]

[< JavaScript >]
module Fields =

    let (++) (a: string -> Validations) (b: string -> Validations) =
        fun v -> Set.union (a v)  (b v)       

    let validateNothing_ = (fun _ -> Set[])

    let validateEmail_ email =
        let emailPattern = new RegExp("""^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$""")
        if email = "" || emailPattern.Test(email)
        then []
        else [ VPatternNotMatch ("not a valid email", email) |> InputValidation]
        |> Set

    let validateEmpty_ v =
        if v <> ""
        then []
        else [ VEmpty |> InputValidation]
        |> Set

    let getValidationsFor name (validations:Validations) =
        validations
        |> Seq.choose (fun v -> if v.headPathIs name then Some (v.reducePath()) else None)
        |> Set

    let validationMsg msg =
        if msg = ""
        then NEmpty
        else Span [ Class "alert validation" ; NText msg ]

    let inputWValidator (label: string) input (onChange: string -> unit) attrs (validations:Validations) addValidations validator =
        let validations' = getValidationsFor label validations 
        let classAlert   = if validations' |> Seq.length = 0 then "" else " alert-danger"
        let onChange' v =
            onChange  v
            GenForm.AddValidation (label, validator v ) |> addValidations
        Div [ Class "form-group flex1"
              Label [ Class "textInputLabel" ; NText label]
              validationMsg (validations' |> Set.map (sprintf "%A") |> String.concat ", ")
              input onChange' <| (Class <| "form-control" + classAlert)::attrs
           ]

    let textWValidator  (label: string) (value: string) (onChange: string -> unit) attrs (validations:Validations) addValidations validator =
        let input (onChange': string -> unit) attrs' = Input [ Type "text" ; Value value ] 
                                                       |> addAttributes attrs'
                                                       |> OnChange (fun e -> onChange' e?target?value)
        inputWValidator  label         input            onChange                  attrs  validations              addValidations validator

    let textNotEmpty   (label: string) (value: string) (onChange: string -> unit) attrs (validations:Validations) addValidations =
        textWValidator label            value           onChange                  attrs  validations              addValidations validateEmpty_

    let textWoValidator label value (onChange: string -> unit) attrs =
        textWValidator  label value  onChange                  attrs (Set[])  (fun _ -> ()) validateNothing_

    let selectWoValidator label value (onChange: string -> unit) options attrs =
        let options2 = options |> Seq.map (fun (key, opt) -> OptionA [Key key ; Value key ; NText opt] )
        let input (onChange': string -> unit) attrs' =
            Select [ Value (value |> Option.defaultV "") ]
               |> addAttributes attrs'
               |> addChildren   options2
               |> OnChange      (fun e -> onChange' e?target?value)
        inputWValidator  label         input             onChange                  attrs  (Set[])  (fun _ -> ()) validateNothing_
