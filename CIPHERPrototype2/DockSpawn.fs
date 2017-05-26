namespace CIPHERPrototype1

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open Rop

[< JavaScript >]
module DckDockSpawn =

    [< Sealed >]
    type DockSpawnLoader() =
        inherit WebSharper.Core.Resources.BaseResource("/"
            , "Resources/DockSpawn/js/dockspawn.js"
            , "Resources/DockSpawn/css/dock-manager.css"
            , "Resources/DockSpawn/css/font-awesome.css"
            )

//    type JSEventCallback = FuncWithArgs<wcPanel * (Auth.Token * string * string), unit>

    [< Require(typeof<DockSpawnLoader>) ; AllowNullLiteral   >]
    type DockManager [< JavaScript ; Inline "new dockspawn.DockManager($elem)" >]  (elem: Dom.Element)       =
        [< JavaScript; Inline "$0.initialize()"            >]   member this.initialize    ()                     = ()
        [< JavaScript; Inline "$0.resize($width, $height)" >]   member this.resize        (width, height)        = ()
        [< JavaScript; Inline "$0.dockFill($node, $panel)" >]   member this.dockFill      (node: obj, panel:obj) = ()

    type PanelContainer [< JavaScript ; Inline "new dockspawn.PanelContainer($elem, $dm, $title)" >]  (elem: Dom.Element, dm: DockManager, title:string)       =
        [< JavaScript; Inline "$0.addClass($class0)"   >]   member this.addClass    (class0: string) = ()
        [< DefaultValue                                >]   val mutable elementContent : Dom.Element

    let createPanel (f:unit -> string * Element * (unit -> unit)) (docker: DockManager) =
        let title, container, after = f()
        let panel = new PanelContainer(container.Dom, docker, title)
        let documentNode = docker?context?model?documentManagerNode
        docker.dockFill(documentNode, panel)
        after()

    let mutable globalDocker: DockManager option = None
    let mutable globalPanels: (string * (unit -> string * Element * (unit -> unit))) list = []

    let createDockManager (allPanels: (string * (unit -> string * Element * (unit -> unit))) list) (buttonSave:Pagelet) (buttonRestore:Pagelet) (element:Element) =
        Rop.flow {
            do! Rop.tryProtection()
            let dockManager = new DockManager(element.Dom)
            let docManagerResize () =
                element.SetAttribute("style", "")
                dockManager.resize(element.Dom.ClientWidth, element.Dom.ClientHeight)
            dockManager.initialize()
            //buttonSave    |>! OnClick (fun _ _ -> savedLayout <- docker.save()                         ) |> ignore
            //buttonRestore |>! OnClick (fun _ _ ->                docker.restore(savedLayout)           ) |> ignore
            JSEvent.addEventListener (JS.Window, "resize", docManagerResize)
            docManagerResize()
            globalDocker <- Some dockManager
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
