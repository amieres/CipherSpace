namespace CIPHERPrototype1

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open Rop

[< JavaScript >]
module DckPhosphor =

    [< Sealed >]
    type PhosphorLoader() =
        inherit WebSharper.Core.Resources.BaseResource("/"
            , "Resources/dockPanel.js"
            , "Resources/dockPanel.css"
            )

    type Widget [< JavaScript ; Inline "new phosphorWidget.Widget()" >]  ()       =
        [< JavaScript; Inline "$0.addClass($class0)"   >]   member this.addClass    (class0: string) = ()
        [< DefaultValue                                >]   val mutable node  : Dom.Element
        [< JavaScript; Inline "$0.show()"              >]   member this.show        ()               = ()
        [< JavaScript; Inline "$0.hide()"              >]   member this.hide        ()               = ()

//    type JSEventCallback = FuncWithArgs<wcPanel * (Auth.Token * string * string), unit>

    [< Require(typeof<PhosphorLoader>) ; AllowNullLiteral   >]
    type DockPanel [< JavaScript ; Inline "new phosphorDockPanel.DockPanel()" >]  ()       =
        [< JavaScript; Inline "$0.addClass($class0)"             >]   member this.addClass       (class0: string) = ()
        [< JavaScript; Inline "$0.insertTop($child)"             >]   member this.insertTop      (child : Widget) = ()
        [< JavaScript; Inline "$0.insertRight($child)"           >]   member this.insertRight    (child : Widget) = ()
        [< JavaScript; Inline "$0.insertTabAfter($child)"        >]   member this.insertTabAfter (child : Widget) = ()
        [< JavaScript; Inline "$0.selectWidget($child)"          >]   member this.selectWidget   (child : Widget) = ()
        [< JavaScript; Inline "$0.attach($dom)"                  >]   member this.attach         (dom   : obj   ) = ()
        [< JavaScript; Inline "$0.update()"                      >]   member this.update         ()               = ()
        [< JavaScript; Inline "$0.save()"                        >]   member this.save           ()               = ""
        [< JavaScript; Inline "$0.restore($layout)"              >]   member this.restore        (layout:string ) = ()
        [< DefaultValue                                          >]   val mutable id: string                   

    let createPanel (f:unit -> string * Element * (unit -> unit)) (docker: DockPanel) =
        let title, container, after = f()
        let widget = new Widget()
        widget?title?text      <- title
        widget?title?closable <- true
        widget.node.AppendChild(container.Dom) |> ignore
        widget |> docker.insertTabAfter
        docker.selectWidget(widget)
        after()

    let mutable globalDocker: DockPanel option = None
    let mutable globalPanels: (string * (unit -> string * Element * (unit -> unit))) list = []

    let createDockManager (allPanels: (string * (unit -> string * Element * (unit -> unit))) list) (buttonSave:Pagelet) (buttonRestore:Pagelet) (element:Element) =
        Rop.flow {
            do! Rop.tryProtection()
            let sPanel = new DockPanel()
            sPanel.addClass("flexgrow")
            //buttonSave    |>! OnClick (fun _ _ -> savedLayout <- docker.save()                         ) |> ignore
            //buttonRestore |>! OnClick (fun _ _ ->                docker.restore(savedLayout)           ) |> ignore
            sPanel.attach(element.Dom)
            JSEvent.addEventListener(JS.Window, "resize", fun _ -> sPanel.update())
            globalDocker <- Some sPanel
            globalPanels <- allPanels
        } |> Rop.notifyMessages

    let addPanel id =
        globalDocker |> Option.map(fun docker ->     
            globalPanels
            |> List.iter (function 
            | (id', f) when id = id' -> createPanel f  docker 
            | _                      -> ()                   )
        ) |> ignore

    let createDockEnvironment (request: Model2.Request) =
        let funCall p1 p2 p3 p4 =
            createDockManager p1 p2 p3 p4
            match request with
//                | Model.LoadWorkspace(Model.Workspace(id)) -> loadWorkspace (sprintf "%d" id   )
                | Model2.LoadPanel(panel)                   -> addPanel      (sprintf "%A" panel)
                | _                                        -> ()
        Browser.createDockEnvironment funCall

