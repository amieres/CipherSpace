#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype4\bin\CIPHERPrototype4.dll"
#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype4\packages\WebSharper.3.6.19.242\lib\net40\WebSharper.Main.dll"
#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype4\packages\WebSharper.3.6.19.242\lib\net40\WebSharper.Core.dll"
#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype4\packages\WebSharper.3.6.19.242\lib\net40\WebSharper.Collections.dll"
#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype4\packages\WebSharper.3.6.19.242\lib\net40\WebSharper.JavaScript.dll"

namespace CIPHERSpace

open WebSharper
open WebSharper.JavaScript
open Model
open Model2
open Rop
open ReactHtml

[<JavaScript>]
module DataTube =

//    type Datum<'KD, 'KL when 'KD : comparison and 'KL : comparison> = {
//        mutable data      : Map<'KD, obj>
//        mutable listeners : Map<'KD, Map<'KL, (obj -> unit)>>
//    } with
//        static member New (v: obj) = { data = Map.empty ; listeners = Map.empty  }

    type Tube<'KD, 'KL when 'KD : comparison and 'KL : comparison> = {
        id                : System.IComparable
        mutable data      : Map<'KD list, obj>
        mutable listeners : Map<'KD list, Map<'KL, (obj option -> unit)>>
    } with
        static member New (id: System.IComparable) = { id = id ; data = Map.empty ; listeners = Map.empty }
        member this.getDataO        key                 =                   Map.tryFind key   this.data
        member this.remove          key                 = this.data      <- Map.remove  key   this.data
        member this.setOnly         key (v :obj)        = this.data      <- Map.add     key v this.data
        member this.setOnlyO        key (vO:obj option) = match vO with | None -> this.remove key | Some v -> this.setOnly key v
        member this.setAndTriggerO  key (vO:obj option) = this.setOnlyO                 key vO
                                                          Map.tryFind key this.listeners |> Option.iter (fun dict -> dict |> Map.toSeq |> Seq.iter (fun (_, f) -> f       vO))
        member this.setAndTrigger   key (v :obj)        = this.setAndTriggerO           key (Some v)
        member this.setDataO        key (vO:obj option) = if this.getDataO key <> vO 
                                                              then this.setAndTriggerO  key vO
        member this.setData         key (v :obj)        = if this.getDataO key <> Some v 
                                                              then this.setAndTrigger   key v
        member this.subscribe       kd     kl      f    = this.listeners <- 
                                                              Map.tryFind kd this.listeners 
                                                              |> Option.defaultV Map.empty 
                                                              |> Map.add  kl f
                                                              |> Map.add  kd 
                                                              <| this.listeners
        member this.subCell subKey                      = Cell(this, [subKey])
                                                  
    and  Cell<'D, 'KD, 'KL when 'KD : comparison and 'KL : comparison> = Cell of Tube<'KD, 'KL> * 'KD list
      with
        member this.getDataO      ()             = match this with Cell (tube, key) -> tube.getDataO        key |> Option.map unbox<'D>
        member this.setOnly       (v :'D)        = match this with Cell (tube, key) -> tube.setOnly         key v
        member this.setAndTrigger (v :'D)        = match this with Cell (tube, key) -> tube.setAndTrigger   key v
        member this.setData       (v :'D)        = match this with Cell (tube, key) -> tube.setData         key v
        member this.setDataO      (vO:'D option) = match this with Cell (tube, key) -> tube.setDataO        key (vO |> Option.map box)
        member this.subscribe   listenKey  f     = match this with Cell (tube, key) -> tube.subscribe       key listenKey (fun oO -> oO |> Option.map unbox<'D> |> f)
        member this.subCell subKey               = match this with Cell (tube, key) -> Cell(tube, subKey :: key)

    let generalCell () = Tube<string, string>.New("X").subCell("V")

[<JavaScript>]
module Util =
    let waitImg = Img [ Src "/EPFileX/image/loader.gif" ]
    let swapParms g_ b a         = g_ a b
    let pass2th   f_ b a         = f_ a b
    let pass4th   f_ d a b c     = f_ a b c d
    let pass6th   f_ f a b c d e = f_ a b c d e f

    let combineNodes a b =
        match a, b with 
        | NEmpty, bN     -> bN
        | aN    , NEmpty -> aN
        | aN    , bN     -> Div [ aN ; bN ]

    open ReactHtml

    let text v = NText v
    let H4 v = H4 [ NText v ]

    let file (v:string) = v.Replace("|", "/")

    let mergeDIH nodes =
        let dihNodes, other = nodes 
                              |> Seq.toList
                              |> List.partition (
                                   function 
                                   | NAttribute (name, value) -> name = "dangerouslySetInnerHTML"
                                   | _ -> false)
        let html            = dihNodes 
                              |> List.map (
                                   function 
                                   | NAttribute (name, value) -> value?__html
                                   | _ -> "")
                              |> String.concat ""
        let node            = NAttribute("dangerouslySetInnerHTML", newAttr "__html" html)
        node::other

[<JavaScript>]
module DynNode =
 
    type Props    = { nodeF      : unit -> CipherNode
                      subscribe  : (unit -> unit) -> unit }
    type Model    = App.Dummy
    let init      = App.DummyNew
    type Message  = Dummy
    let update (props: Props) (msg: Message)  model = model

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        props.subscribe (fun () -> Dummy |> processMessages) 
        props.nodeF()

    let app = App.App(init, update, view)

    let node nodeF sub = app.node { nodeF = nodeF ; subscribe = sub }

[<JavaScript>]
module RenderReact =

    type ReactLayoutFunc<'T> = ('T -> CipherNode) option -> CipherNode

    let map (f:'a -> 'b) (rF:ReactLayoutFunc<'a>) : ReactLayoutFunc<'b> =
        fun (callBackBO: ('b -> CipherNode) option) ->
            let callBackAO = callBackBO |> Option.map (fun callBackB -> f >> callBackB)
            rF callBackAO

    let bind (g:'a -> ReactLayoutFunc<'b>) (f:ReactLayoutFunc<'a>) : ReactLayoutFunc<'b> =
        let reactLayoutFunc x = (Util.swapParms g x) |> Some |> f
        reactLayoutFunc

    type Builder() =
        member this.Bind (wrapped, restOfCExpr)       = wrapped  |> bind restOfCExpr 
        member this.ReturnFrom (x)                    = x
        member this.Return (a: CipherNode    )         = function | Some f -> f a         | None -> a
        member this.Return (a: CipherNode seq)         = function | Some f -> f a         | None -> Div a
        member this.Return (a: string       )         = function | Some f -> f a         | None -> NText a
//        member this.Return (a: obj          )         = function | Some f -> f a         | None -> ReactObj a
//        member this.Return (a: unit         )         = function | Some f -> f a         | None -> ReactObj a
//        member this.Zero() : ReactLayoutFunc<CipherNode>     = function | Some f -> f NEmpty    | None -> NEmpty
//        member this.Zero() : ReactLayoutFunc<CipherNode seq> = function | Some f -> f []        | None -> NEmpty
//        member this.Zero() : ReactLayoutFunc<string>        = function | Some f -> f ""        | None -> NEmpty
//        member this.Zero() : ReactLayoutFunc<obj>           = function | Some f -> f ("":>obj) | None -> NEmpty
//        member this.Zero() : ReactLayoutFunc<unit>          = function | Some f -> f ()        | None -> NEmpty
        member this.Combine(a:ReactLayoutFunc<'a>, b:ReactLayoutFunc<'b>) :ReactLayoutFunc<'b> =
            fun f0 -> match f0 with
                      | Some f         -> a None , b (Some f) 
                      | None           -> a None , b None    
                      ||> Util.combineNodes
        member this.Delay      (f)                    = f()

    let render = new Builder()

[<JavaScript>]
module Hoverable =

    type Props    = { node       : CipherNode
                      attributes : CipherNode seq }
    type Model    = { hover : bool  }
    let init      = { hover = false }
    type Message  = SetHover of bool
    let update (props: Props) (msg: Message)  model = match msg with SetHover hov  -> { hover = hov }

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        props.node
        |> if model.hover 
           then addAttributes props.attributes
             >> OnMouseLeave (fun _ -> false |> SetHover |> processMessages)
           else OnMouseEnter (fun _ -> true  |> SetHover |> processMessages)

    let app = App.App(init, update, view)

    let make attributes node = app.node { node = node ; attributes = attributes }

    let test       node = app.run       { node = H1 [ NText "Hola" ] ; attributes = [Class "bg-info"] } node
    let testIncDom node = app.runIncDom { node = H1 [ NText "Hola" ] ; attributes = [Class "bg-info"] } node

[<JavaScript>]
module Layouts =

    let BasicContainer bootstrap overflow header footer center =
        let addBootstrap elem = if bootstrap then addChildren elem else id
        Div [ _Style       [ _flex "1 1 0%"   ; _display  "flex" ; _overflow overflow ]
              Div [ _Style [ _flex "0 0 auto"                                         ]  ] |> addChildren header |> addBootstrap [ Class "panel-heading heading" ]
              Div [ _Style [ _flex "1 1 auto" ; _display  "flex" ; _overflow overflow ]  ] |> addChildren center |> addBootstrap [ Class "panel-body"            ]
              Div [ _Style [ _flex "0 0 auto"                                         ]  ] |> addChildren footer |> addBootstrap [ Class "panel-footer footer"   ]
            ]                                                                                                    |> addBootstrap [ Class "panel panel-info" ]

    let Children = function | NElement  (_, children) -> children | _ -> [||]

    let HorizontalSplitter bootsrap overflow header footer left right center =
        center
        |> BasicContainer false    overflow left   right 
        |> addAttribute (_Style [ _flexFlow "row"    ])
        |> Children
        |> BasicContainer bootsrap overflow header footer
        |> addAttribute (_Style [ _flexFlow "column" ])

    let VerticalSplitter bootsrap overflow header footer left right center =
        center
        |> BasicContainer bootsrap overflow header footer
        |> addAttribute (_Style [ _flexFlow "column" ])
        |> Children
        |> BasicContainer false    overflow left   right 
        |> addAttribute (_Style [ _flexFlow "row"    ])

    let Stretch  elem = addAttribute <| _Style [ _top "0Px" ; _left "0Px" ; _bottom "0Px" ; _right "0Px" ] <| elem //_position "absolute"; 
    let Absolute elem = addAttribute <| _Style [ _position "absolute" ] <| elem  

    let defArgs one many = match one with | Some n -> seq[n] | _ -> match many with | Some ns -> ns | _ -> seq[]

    type Props = {
        Content    : CipherNode seq
        Header     : CipherNode seq
        Footer     : CipherNode seq
        Left       : CipherNode seq
        Right      : CipherNode seq
        Horizontal : bool
        Stretch    : bool
        Absolute   : bool
        Bootstrap  : bool
        Overflow   : string
    }
    type PropsC () =
      static member New
               (?contents   : CipherNode seq
               ,?headers    : CipherNode seq
               ,?footers    : CipherNode seq
               ,?lefts      : CipherNode seq
               ,?rights     : CipherNode seq
               ,?content    : CipherNode
               ,?header     : CipherNode 
               ,?footer     : CipherNode 
               ,?left       : CipherNode 
               ,?right      : CipherNode 
               ,?horizontal : bool
               ,?stretch    : bool
               ,?absolute   : bool
               ,?bootstrap  : bool
               ,?overflow   : string) =
        { Content     = defArgs    content    contents
          Header      = defArgs    header     headers
          Footer      = defArgs    footer     footers
          Left        = defArgs    left       lefts
          Right       = defArgs    right      rights
          Horizontal  = defaultArg horizontal false
          Stretch     = defaultArg stretch    false
          Absolute    = defaultArg absolute   false
          Bootstrap   = defaultArg bootstrap  false
          Overflow    = defaultArg overflow   "auto"
          }

    type Model = App.Dummy

    let  init  = App.DummyNew

    type Message =
        | Dummy

    let update (props: Props) (msg: Message)  model =
        match msg with
        | Dummy  -> model

    let view (props:Props) (model: Model) (processMessages: Message -> unit) =
        match props.Horizontal with
        | true  -> HorizontalSplitter 
        | false -> VerticalSplitter
        <| props.Bootstrap <| props.Overflow
        <| props.Header    <| props.Footer   <| props.Left <| props.Right <| props.Content
        |> if props.Stretch  then Stretch   else id
        |> if props.Absolute then Absolute  else id

    let app: App.App<Props, Model, Message> = App.App(init, update, view)

    let leftAndContentNode  lefts   contents =
        PropsC.New(
                contents  = contents
              , lefts     = lefts
        ) |> app.node

    let leftContentRightNode lefts   contents rights =
        PropsC.New(
                contents   = contents
              , lefts      = lefts
              , rights     = rights
              , horizontal = true
              , stretch    = true
        ) |> app.node

    let headerAndContentNode headers contents =
        PropsC.New(
                contents  = contents
              , headers   = headers
        ) |> app.node

    let bootstrapPanel headers contents footers =
        PropsC.New(
                contents  = contents
              , headers   = headers
              , footers   = footers
              , bootstrap = true
        ) |> app.node

[< JavaScript >]    
module Option =
    let func f vO = match vO with | None -> id | Some v -> f v

[<JavaScript>]
module ItemRender =

    type Item = System.IComparable

    type Props           = { 
                             name       : string
                             selected   : bool
                             hoverable  : bool
                             icon       : CipherNode option
                             onClick    : (obj -> unit) option
                             layout     : (CipherNode seq -> CipherNode) option
                           }

    let preventDefault ev               = (ev?preventDefault :> FuncWithOnlyThis<obj, unit>).CallUnsafe(ev, null) |> ignore
    let setData        ev (data:string) = (ev?dataTransfer?setData :> FuncWithOnlyThis<obj, unit  >).CallUnsafe(ev?dataTransfer, "text", data) |> ignore
    let getData        ev      :string  = (ev?dataTransfer?getData :> FuncWithOnlyThis<obj, string>).CallUnsafe(ev?dataTransfer, "text") |> unbox

    let node (props: Props) =
        let onClick      = props.onClick |> Option.func OnClick
        let layout       = props.layout  |> Option.defaultV Div
        let hoverable    = if props.hoverable then Hoverable.make [ _Style [ _background  "#e6e6e6" ] ] else id
        let icon         = props.icon 
                           |> Option.map (fun icon -> [H4 [ icon ; _Style [ _display "inline" ; _fontFamily "Glyphicons Halflings" ] ]] |> insertChildren) 
                           |> Option.defaultV id
        let bStyle, back = if props.selected 
                           then "groove", "lightblue" 
                           else "none"  , "transparent"
        layout 
            [ _Style [ _padding     "4px"
                       _borderStyle bStyle
                       _background  back 
                       _borderWidth "1px"
                       _cursor      "pointer"]
              H4 [ NText props.name ; _Style [ _display "inline" ;  _paddingLeft  "0.5ch" ] ] 
              Draggable true
            ] 
        |> onClick
        |> icon
        |> hoverable
//        |> OnDrop     (fun ev -> preventDefault ev
//                                 getData ev |> findItem |> props.selectItem
//                      )
//        |> OnDragStart(fun ev -> setData ev <| sprintf "%A" props.item)
//        |> OnDragOver (fun ev -> if (getData ev).StartsWith "Dimension" then preventDefault ev)

    let next symbol name selected onClick nextNodeO = 
        node { 
            name       = name
            selected   = selected
            onClick    = onClick
            icon       = symbol
            hoverable  = true
            layout     = nextNodeO
        }

    let next2 symbol nextNodeO (name, selected, onClick) = next symbol name selected onClick nextNodeO

[<JavaScript>]
module ListRender =

    type Item = ItemRender.Item

    type Props           = { 
                             items      : Item                          seq
                             toString   : (Item -> string) option
                             itemLayout : (string * bool * (obj -> unit) option -> CipherNode) option
                             layout     : (Model * (Message -> unit) * CipherNode seq -> CipherNode)  option
                           }
    and  Model           = { selected   : Item option }
    and  Message         =                | Select of Item option
    let  init            = { selected   = None        }

    let skip f a = f

    let update (props: Props) (msg: Message)  model = match msg with | Select itmO -> { model with selected = itmO }

    let defLayout            (_, _, nodes) = Ul nodes
    let defLayoutCb callback (m, p, nodes) = callback(m.selected) ; defLayout (m, p, nodes)

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        let toString       = props.toString   |> Option.defaultV (sprintf "%A")
        let layout         = props.layout     |> Option.defaultV (fun (_, _, nodes) -> Ul nodes)
        let itemLayout     = props.itemLayout |> Option.defaultV (ItemRender.next2 None None)
        let selectItem itm = itm |> Some      |> Select |> processMessages
        let findItem  fitm = props.items      |> Seq.choose (fun item -> if fitm =  (sprintf "%A" item) then Some item else None) |> Seq.head 
        let items          = props.items      |> Seq.map    (fun item -> ( toString     item
                                                                         , model.selected = Some item
                                                                         , Some <| fun _ -> item |> selectItem
                                                                         ) |> itemLayout)
        layout (model, processMessages, items)

    let app = App.App(init, update, view)

    let next items toString itemLayout nextNodeO = 
        app.node { 
            items      = items
            toString   = toString
            itemLayout = itemLayout
            layout     = nextNodeO
        }

    let nextCb items toString itemLayout callback = next items toString itemLayout (defLayoutCb callback |> Some)
