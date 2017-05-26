namespace CIPHERPrototype1

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open Rop

[< JavaScript >]
module DckGoldenLayout =

    [< Sealed >]
    type GoldenLayoutLoader() =
        inherit WebSharper.Core.Resources.BaseResource("/"
            , "Resources/GoldenLayout/js/goldenlayout.min.js"
            , "Resources/GoldenLayout/css/goldenlayout-base.css"
            , "Resources/GoldenLayout/css/goldenlayout-light-theme.css"
            )

    type LayoutConfigSettings [<Inline "{}">] () =
        [<DefaultValue>] val mutable hasHeaders               : bool
        [<DefaultValue>] val mutable constrainDragToContainer : bool
        [<DefaultValue>] val mutable reorderEnabled           : bool
        [<DefaultValue>] val mutable selectionEnabled         : bool
        [<DefaultValue>] val mutable popoutWholeStack         : bool  
        [<DefaultValue>] val mutable blockedPopoutsThrowError : bool
        [<DefaultValue>] val mutable closePopoutsOnUnload     : bool
        [<DefaultValue>] val mutable showPopoutIcon           : bool
        [<DefaultValue>] val mutable showMaximiseIcon         : bool  
        [<DefaultValue>] val mutable showCloseIcon            : bool

    type ItemConfig [<Inline "{}">] () = 
        [<DefaultValue>] val mutable ``type``           : string
        [<DefaultValue>] val mutable ``componentName``  : string
        [<DefaultValue>] val mutable ``componentState`` : obj
        [<DefaultValue>] val mutable ``content``        : ItemConfig[]
        [<DefaultValue>] val mutable ``id``             : string
        [<DefaultValue>] val mutable ``width``          : int
        [<DefaultValue>] val mutable ``height``         : int
        [<DefaultValue>] val mutable ``isClosable``     : bool
        [<DefaultValue>] val mutable ``title``          : string
        [<DefaultValue>] val mutable ``activeItemIndex``: int

    type LayoutConfigDimensions [<Inline "{}">] () = 
        [<DefaultValue>] val mutable borderWidth     : int
        [<DefaultValue>] val mutable minItemHeight   : int
        [<DefaultValue>] val mutable minItemWidth    : int
        [<DefaultValue>] val mutable headerHeight    : int
        [<DefaultValue>] val mutable dragProxyWidth  : int
        [<DefaultValue>] val mutable dragProxyHeight : int

    type LayoutConfigLabels [<Inline "{}">] () = 
        [<DefaultValue>] val mutable close    : string
        [<DefaultValue>] val mutable maximise : string
        [<DefaultValue>] val mutable minimise : string
        [<DefaultValue>] val mutable popout   : string

    type LayoutConfig [<Inline "{}">] () = 
        [<DefaultValue>] val mutable settings   : LayoutConfigSettings
        [<DefaultValue>] val mutable dimensions : LayoutConfigDimensions
        [<DefaultValue>] val mutable labels     : LayoutConfigLabels
        [<DefaultValue>] val mutable content    : ItemConfig[]

    let htmlMessages ms = 
        ms 
        |> Seq.map (fun m -> Div [ Text (sprintf "%A" m)]) 
        |> Seq.toList
        |> Div

    type Container [<JavaScript ; Inline "new Container()">] () =
        [<DefaultValue                            >] val mutable title                       : string       
        [<JavaScript ; Inline "$0.setTitle($t)"   >] member this.setTitle       (t:string)                   = ()
        [<JavaScript ; Inline "$0.getElement()"   >] member this.getElement     ()           : JQuery.JQuery = X<_>

    type ContentItem [<JavaScript ; Inline "new ContentItem()">] () =
        [<JavaScript ; Inline "$0.contentItems"   >] member this.contentItems()                  : ContentItem[] = X<_>
        [<JavaScript ; Inline "$0.addChild($item)">] member this.addChild    (item : ItemConfig) : unit          = X<_>
    
    type CompDef = FuncWithArgs<Container * obj, unit>
     
    [< Require(typeof<GoldenLayoutLoader>)  ; AllowNullLiteral  >]
    type GoldenLayout [<JavaScript ; Inline "new GoldenLayout($configuration, $container)">] (configuration: LayoutConfig, container: Dom.Element) =
        [<JavaScript ; Inline "$0.registerComponent($name, $comp )">] member this.registerComponent( name: string, comp: CompDef ) = ()
        [<JavaScript ; Inline "$0.toConfig()"                      >] member this.toConfig         ()                              = ()
        [<JavaScript ; Inline "$0.init()"                          >] member this.init             ()                              = ()
        [<JavaScript ; Inline "$0.destroy()"                       >] member this.destroy          ()                              = ()
        [<JavaScript ; Inline "$0.root"                            >] member this.root             () : ContentItem                = X<_>
        [<DefaultValue                                             >] val mutable container           : JQuery.JQuery       

    let createPanelGL (f:unit -> string * Element * (unit -> unit)) (c: Container) =
        let title, container, after = f()
        c.setTitle title
        c.getElement().Append(container.Dom) |> ignore
        after()

    let mutable savedLayout = ""

    let mutable globalDocker: GoldenLayout option = None

    let createDockManager (allPanels: (string * (unit -> string * Element * (unit -> unit))) list) buttonSave buttonRestore (element:Element) =
        Rop.flow {
            do! Rop.tryProtection()
            let layout = 
                new LayoutConfig(
                    content = [| 
                        new ItemConfig(
                             ``type``          = "stack"
                            ,``content``       = [| |]
                            ) |]
                )
            let dockManager = new GoldenLayout(layout, element.Dom)
            allPanels
            |> List.iter (fun (id, f) -> 
                dockManager.registerComponent(id, new CompDef(fun (c, s) -> createPanelGL f c))
            )
            dockManager.init()
            dockManager.container.AddClass("flex flexgrow") |> ignore
            globalDocker <- Some dockManager
            buttonSave    |>! OnClick (fun _ _ -> savedLayout <- JSON.Stringify(dockManager.toConfig(), null, 2); Console.Log(savedLayout) ) |> ignore
            buttonRestore |>! OnClick (fun _ _ -> dockManager.destroy(); dockManager?config <- JSON.Parse(savedLayout); dockManager.init()  ) |> ignore
        } |> Rop.notifyMessages

    let addPanel id =
        globalDocker |> Option.map(fun docker ->     
            let panel                  = 
                new ItemConfig(
                    ``type``           = "component"
                    ,``componentName`` = id
                    ,``title``         = id
                )
            docker.root().contentItems().[0].addChild(panel)
        ) |> ignore

    let loadWorkspace (workspace: Model.Workspace) =
        Server.call {
            let! docker     = globalDocker |> Rop.fromOption (Model.ErrDockerIsNotPresent Model.DckGoldenLayout)
            let! blob       = Server.fetchObjectBlobAR_ workspace.getObject
            docker.destroy()
            docker?config <- JSON.Parse blob
            docker.init()
        }

    let createDockEnvironment (request: Model2.Request) =
        let funCall p1 p2 p3 p4 =
            createDockManager p1 p2 p3 p4
            match request with
                | Model2.LoadWorkspace(workspace) -> loadWorkspace (workspace         )
                | Model2.LoadPanel(panel)         -> addPanel      (sprintf "%A" panel)
                | _                              -> ()
        Browser.createDockEnvironment funCall
