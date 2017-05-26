namespace CIPHERSpace
open Model
open Model2
open WebSharper
open WebSharper.JavaScript
open Rop

[< JavaScript ; Sealed >]
type ReactLoader() =
    inherit WebSharper.Core.Resources.BaseResource("/EPFileX/react"
        ,  "react.js"
        ,  "react-dom.js"
        ,  "remarkable.min.js")

type MainCssLoader()   = inherit WebSharper.Core.Resources.BaseResource("/EPFileX/css/main.css")

[< JavaScript >]
type BootstrapLoader() = 
    inherit WebSharper.Core.Resources.BaseResource("/Resources/"
                                                                     ,  "css/bootstrap.min.css"
                                                                     ,  "js/bootstrap.min.js")


[< JavaScript ; Require(typeof<BootstrapLoader>) ; Require(typeof<MainCssLoader>) >]
type BootstrapLoad [< JavaScript ; Inline "{}" >]  () =
    [< DefaultValue                               >]          val mutable xx                      : string
                                
[< JavaScript ; Require(typeof<ReactLoader>) ; AllowNullLiteral >]
type Attrs [< JavaScript ; Inline "{}" >]  () =
    [< DefaultValue                               >]          val mutable xx                      : string
    [< JavaScript; Inline "$0.preventDefault()"   >]        member   this.preventDefault()                = ()
    [< Inline "$.extend(true, {}, $this, $a)"     >]        member   this.ExtendDeep (a:obj)      : Attrs = X<_>
    

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
    [< Inline "$text"                                                         >] static member t(text: string                                                    ): R = X<_>
    [< Inline "React.createElement.apply(null, $args)"                        >] static member E([<System.ParamArray>] args:obj[]                                       ): R = X<_>
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
    let Form        children   = NElement   ("form"        , children)
    let Img         children   = NElement   ("img"         , children)
    let Ul          children   = NElement   ("ul"          , children)
    let Li          children   = NElement   ("li"          , children)
    let H1          children   = NElement   ("h1"          , children)
    let H2          children   = NElement   ("h2"          , children)
    let H3          children   = NElement   ("h3"          , children)
    let H4          children   = NElement   ("h4"          , children)
    let H5          children   = NElement   ("h5"          , children)
    let H6          children   = NElement   ("h6"          , children)
    let Hr          children   = NElement   ("hr"          , children)
    let Br          children   = NElement   ("br"          , children)
    let Table       children   = NElement   ("table"       , children)
    let THead       children   = NElement   ("thead"       , children)
    let Th          children   = NElement   ("th"          , children)
    let TBody       children   = NElement   ("tbody"       , children)
    let Tr          children   = NElement   ("tr"          , children)
    let Td          children   = NElement   ("td"          , children)
    let P           children   = NElement   ("p"           , children)
    let A           children   = NElement   ("a"           , children)
    let B           children   = NElement   ("b"           , children)
    let Label       children   = NElement   ("label"       , children)
    let Input       children   = NElement   ("input"       , children)
    let Select      children   = NElement   ("select"      , children)
    let OptionA     children   = NElement   ("option"      , children)
    let Button      children   = NElement   ("button"      , children)
    let NewTag tag  children   = NElement   (tag           , children)
                                                           
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
    let OnSubmit    (f:obj)    = NAttribute ("onSubmit"    , f       ) |> addAttribute
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

    let _cursor        cur        = newAttr     "cursor"        cur
    let _margin        mar        = newAttr     "margin"        mar
    let _fontSize      siz        = newAttr     "fontSize"      siz
    let _alignSelf     alg        = newAttr     "alignSelf"     alg
    let _top           top        = newAttr     "top"           top 
    let _bottom        bot        = newAttr     "bottom"        bot 
    let _left          lef        = newAttr     "left"          lef 
    let _right         rig        = newAttr     "right"         rig 
    let _height        hei        = newAttr     "height"        hei 
    let _minHeight     hei        = newAttr     "minHeight"     hei 
    let _maxHeight     hei        = newAttr     "maxHeight"     hei 
    let _width         wid        = newAttr     "width"         wid 
    let _minWidth      wid        = newAttr     "minWidth"      wid 
    let _maxWidth      wid        = newAttr     "maxWidth"      wid 
    let _zIndex        zid        = newAttr     "zIndex"        zid 
    let _position      pos        = newAttr     "position"      pos 
    let _display       dis        = newAttr     "display"       dis 
    let _flexFlow      flo        = newAttr     "flexFlow"      flo 
    let _flex          fle        = newAttr     "flex"          fle 
    let _flexBasis     bas        = newAttr     "flexBasis"     bas 
    let _flexGrow      gro        = newAttr     "flexGrow"      gro 
    let _flexShrink    gro        = newAttr     "flexShrink"    gro 
    let _padding       pad        = newAttr     "padding"       pad 
    let _paddingLeft   lef        = newAttr     "paddingLeft"   lef 
    let _paddingRight  rig        = newAttr     "paddingRight"  rig
    let _paddingTop    top        = newAttr     "paddingTop"    top
    let _paddingBottom bot        = newAttr     "paddingBottom" bot
    let _borderStyle   sty        = newAttr     "borderStyle"   sty
    let _borderWidth   wid        = newAttr     "borderWidth"   wid
    let _marginBottom  mar        = newAttr     "marginBottom"  mar
    let _overflow      ove        = newAttr     "overflow"      ove
    let _background    clr        = newAttr     "background"    clr
    let _fontFamily    fml        = newAttr     "fontFamily"    fml
    let _whiteSpace    wsp        = newAttr     "whiteSpace"    wsp 
    let _textOverflow  tov        = newAttr     "textOverflow"  tov
    let _textAlign     alg        = newAttr     "textAlign"     alg
    let _border        brd        = newAttr     "border"        brd
                                                           
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
                                          Some <| R.E0 tag attributes subNodes
            | NText      text          -> Some <| R.t text
            | ReactR     r             -> Some <| r
            | ReactObj   o             -> Some <| R.E(o)
            | NAttribute (name, value) -> None
            | NAttrR     attrs         -> None
            | NEmpty                   -> Some null
        elementR node |> Option.defaultV null
                                
    type VirtualDomRenderer<'P, 'M> = 'P -> 'M -> (('M -> 'M) -> unit) -> R

     /// this is where non-react children can be added
    let reactContainerClass className (afterRender: obj -> Dom.Element -> unit) =
        R.createClass(ClassOptions(
                         displayName           = "containerClass"
                       , componentDidMount     = FuncWithOnlyThis(fun this -> afterRender this (ReactDOM.findDOMNode(this)))
                       , shouldComponentUpdate = FuncWithOnlyThis(fun _    -> false)
                       , render                = FuncWithOnlyThis(fun this ->
                            Div [Class className]
                            |> toReact
        )))




open ReactHtml

[< JavaScript >]
module App =

    let withContainerDo className f =
        let container = 
            WebSharper.Html.Client.Tags.Div [ WebSharper.Html.Client.Attr.Class className] 
            |>! WebSharper.Html.Client.Operators.OnAfterRender (fun container -> f container)
        container

    type App<'P, 'M, 'msg> (Init:'M, Update: 'msg   -> 'M -> 'M, View:'P -> 'M -> ('msg -> unit) -> ReactNode) =
        let renderer (this:obj) : R =
            let setState_                       = this?setState :> FuncWithArgs<obj * obj, obj>
            let setState  (newStateF: 'M -> 'M) = setState_.ApplyUnsafe (this, [| newStateF |]) |> ignore
            let state               : 'M        = this?state
            let props               : 'P        = this?props
            let processMessages_ (msg:'msg)     = setState (fun state -> Update msg state)
            View props state processMessages_
            |> toReact
        let reactClass = R.createClass("rootClass", (fun () -> Init), FuncWithOnlyThis(renderer))
        member app.init                         = Init
        member app.update                       = Update
        member app.view                         = View
        member app.nodeR          (props:'P)    = R.E(reactClass, props)
        member app.node           (props:'P)    = app.nodeR props |> ReactR
        member app.run container  (props:'P)    = ReactDOM.render(app.nodeR props, container)

/// creates App object
/// to run        use: app.run container props  
/// to integrate  use: app.node props
/// alternatively integrate into model
/// using: app.init, app.update and app.view
    let app init update view = App(init, update, view)
        
[< JavaScript >]
module Popup =

    type Props = {
        menuItems: (string * (unit -> unit)) seq
    }

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
            | ShowPopUp(left, top)  -> { model with show  = true
                                                    top   = top
                                                    left  = left  }
            | AdjustBase(left, top) -> { model with baseX = left
                                                    baseY = top   }

    let view (props: Props) (model: Model) processMessages = 
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
                    |> addChildren (props.menuItems |> Seq.map item )
//                    |> OnShow (fun (e:Dom.Element) -> (model.top - e.GetBoundingClientRect().Top,  model.left - e.GetBoundingClientRect().Left)
//                                                      |> function 
//                                                         | (x, y) as v when abs(x) < 1.0 && abs(y) < 1.0 -> v |> AdjustBase |> processMessages
//                                                         | _                                             -> ())
                ]
            |> OnClick (fun _ -> HidePopUp |> processMessages)
        else NEmpty

    let app = App.app init update view

[< JavaScript >]
module Dialog =

    type Props = { title  : string
                   buttons: seq<string * string * (unit -> unit)>
                   content: ReactNode seq 
                   show   : bool  
                   close_ : unit -> unit }
    type Model = { dummy  : bool  }
    let init   = { dummy  = false }
    type Message = Dummy of bool

    let update (message: Message) (model: Model) : Model =
        match message with
        | Dummy dum -> {model with dummy = dum }

    let rButtons (buttons: (string * string * (unit->unit)) seq) =
        buttons 
        |> Seq.map (fun (text, className, func_) -> Button [ Class className; Disabled false ; NText text ] |> OnClick func_ )
        |> Seq.toList

    let view (props: Props) (model: Model) processMessages =
        if props.show then
            let buttons2  = props.buttons    |> Seq.map (fun (a, b, f) -> a, b, fun () -> props.close_(); f()) |> rButtons
            Div [ Id "dialog" ; Role "dialog" ; Class "modal" ; _Style [ _display "block"; _position "fixed"; _marginBottom "5px" ]
                  Div [ Class                         "modal-dialog" 
                        Div [ Class                   "modal-content"
                              Div [ Class             "modal-header" 
                                    Button [ Class    "close"         ; NText "×"         ] |> OnClick props.close_
                                    H4     [ Class    "modal-title"   ; NText props.title ]
                                  ]                   
                              Div [ Class             "modal-body"   ] |> addChildren props.content
                              Div [ Class             "modal-footer" ] |> addChildren buttons2
                        ]
                    ]
                ]
        else NEmpty 

    let app = App.app init update view


[< JavaScript >]
module GenForm =
    open ReactHtml

    type InputValidation =
        | VEmpty          
        | VNotLongerThan   of int
        | VCannotModify
        | VUnsupportedData of string
        | VPatternNotMatch of string * string

    type path = string list

    type Validation =
        | InputValidation of InputValidation
        | PathValidation  of path * InputValidation
        member this.reducePath () =
            match this with 
                | InputValidation v        -> this
                | PathValidation ([], v)   -> InputValidation v
                | PathValidation ([h], v)  -> InputValidation v
                | PathValidation (h::r, v) -> PathValidation (r, v)
        member this.addPath (path) =
            match this with 
                | InputValidation v        -> PathValidation ([path] , v)
                | PathValidation (p, v)    -> PathValidation (path::p, v)
        member this.headPathIs (head)      = 
            match this with 
                | PathValidation (head'::_, _) when head = head' -> true 
                | _ -> false

    type InputValidations = Set<InputValidation>
    type Validations      = Set<Validation>

    type Props = { title  : string
                   buttons: (string * string * (unit -> unit)) list
                   content: ReactNode seq }

    type Model = {
        processing  : bool
        message     : string
        debug       : bool
        modified    : bool
        validations : Set<Validation>
    }

    let init = {
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


    let view (props: Props) (model: Model) processMessages =
        let buttons2 = ((".", "btn-xs btn-default  pull-right", (fun () -> not model.debug |> SetDebug |> processMessages)) :: props.buttons) 
                       |> Dialog.rButtons 
        let msg = if   model.message = "" 
                  then NEmpty
                  else Span [ Class "alert validation"        ; NText model.message ]
        Div [ Class                 "panel panel-info flex flexgrow"
              Div [ Class           "panel-heading heading"         
                    Label   [ Class "panel-title text-center" ; NText <| (if model.modified then "*" else "") + props.title ]
                    msg             
                    Div     [ Class "btn-toolbar pull-right"   ] |> addChildren buttons2
                ]                   
              Div           [ Class "panel-body flex flexgrow" ] |> addChildren props.content
            ]

    let app = App.app init update view

[< JavaScript >]
module Fields =
    open GenForm

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
        let options2 = options |> Seq.map (fun (key:string, opt) -> OptionA [Key key ; Value key ; NText opt] )
        let input (onChange': string -> unit) attrs' =
            Select [ Value (value |> Option.defaultV "") ]
               |> addAttributes attrs'
               |> addChildren   options2
               |> OnChange      (fun e -> onChange' e?target?value)
        inputWValidator  label         input             onChange                  attrs  (Set[])  (fun _ -> ()) validateNothing_
