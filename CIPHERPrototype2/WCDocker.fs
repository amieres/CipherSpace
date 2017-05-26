namespace CIPHERPrototype1

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open Rop
open Rop

[< JavaScript >]
module DckWCDocker =

    [< Sealed >]
    type WCDockerLoader() =
        inherit WebSharper.Core.Resources.BaseResource("/"
            , "Resources/SlickGrid-2.2.6/lib/jquery-ui-1.11.3.min.js"
            , "Resources/jqueryContextMenu/jquery.contextMenu.js"
            , "Resources/jqueryContextMenu/jquery.contextMenu.css"
            , "Resources/fontAwesome/css/font-awesome.css"
            , "Resources/wcDocker/wcDocker.js"
            , "Resources/wcDocker/wcDocker.css"
            )


    [< Require(typeof<WCDockerLoader>) ; AllowNullLiteral   >]
    type wcLayoutTable [< JavaScript ; Inline "new wcLayout()" >]  ()       =
        [< JavaScript; Inline "$0.addItem($item)" >]   member this.addItem(item) = ()

    type wcPanel [< JavaScript ; Inline "new wcPanel()" >]  ()       =
        [< JavaScript; Inline "$0.layout() "      >]   member this.layout ()         : wcLayoutTable = X<_>
        [< JavaScript; Inline "$0.title($t)"      >]   member this.title  (t:string) : string        = X<_>
        

    type wcIFrame [< JavaScript ; Inline "new wcIFrame($container, $panel)" >]  (container, panel: obj)  =
        [< JavaScript; Inline "$0.openURL($url)"  >]   member this.openURL (url:string) = ()

    type JSEventCallback = FuncWithArgs<wcPanel * (Auth.Token * string * string), unit>

    type wcDocker [< JavaScript ; Inline "new wcDocker($dom.Dom, {themePath:'/Resources/css'})" >]  (dom : Element)       =
        [< JavaScript; Inline "$0.registerPanelType($name, {onCreate: $f})" >]   
                                                         member this.registerPanelType (name:string, f:obj) = ()
        [< JavaScript; Inline "$0.save()"           >]   member this.save    ()              = ""
        [< JavaScript; Inline "$0.restore($layout)" >]   member this.restore (layout:string) = ()
        [< JavaScript; Inline "$0.addPanel($id, 'top')"    >]   member this.addPanel (id:string)    = ()

    let createPanelWC (f:unit -> string * Element * (unit -> unit)) (docker: wcPanel) =
        let title, container, after = f()
        docker.layout().addItem(container.Dom)
        docker.title(title) |> ignore
        after()

    let mutable savedLayout = """{"floating":[],"root":{"type":"wcSplitter","horizontal":true,"isDrawer":false,"pane0":{"type":"wcSplitter","horizontal":false,"isDrawer":false,"pane0":{"type":"wcFrame","floating":false,"isFocus":false,"tabOrientation":"top","pos":{"x":0.5,"y":0.5},"size":{},"tab":2,"panels":[{"type":"wcPanel","panelType":"Report 2","size":{"x":-1,"y":-1},"customData":{}},{"type":"wcPanel","panelType":"Report 3","size":{"x":101,"y":829},"customData":{}},{"type":"wcPanel","panelType":"Report 4","size":{"x":101,"y":829},"customData":{}}]},"pane1":{"type":"wcFrame","floating":false,"isFocus":false,"tabOrientation":"top","pos":{"x":1.525381492236894,"y":1.276168043596031},"size":{"x":949,"y":413},"tab":0,"panels":[{"type":"wcPanel","panelType":"Table \"Parameters\"","size":{"x":949,"y":413},"customData":{}}]},"pos":0.7080711438817885},"pane1":{"type":"wcSplitter","horizontal":false,"isDrawer":false,"pane0":{"type":"wcFrame","floating":false,"isFocus":false,"tabOrientation":"top","pos":{"x":0.5,"y":0.5},"size":{},"tab":0,"panels":[{"type":"wcPanel","panelType":"Report 6","size":{"x":1270,"y":584},"customData":{}}]},"pane1":{"type":"wcFrame","floating":false,"isFocus":false,"tabOrientation":"top","pos":{"x":3.1477656138118864,"y":1.276168043596031},"size":{"x":611,"y":413},"tab":0,"panels":[{"type":"wcPanel","panelType":"Table \"Companies\"","size":{"x":611,"y":413},"customData":{}}]},"pos":0.6862802598082903},"pos":0.6751044053843781},"collapsers":{"left":{"size":0,"drawer":{"closeSize":0,"frame":{"type":"wcFrame","floating":false,"isFocus":false,"tabOrientation":"left","pos":{"x":0.5,"y":0.5},"size":{"x":400,"y":400},"tab":-1,"panels":[]}}},"right":{"size":18,"drawer":{"closeSize":18,"frame":{"type":"wcFrame","floating":false,"isFocus":false,"tabOrientation":"right","pos":{"x":"Infinity","y":1.0907949997603528},"size":{"x":950,"y":827},"tab":-1,"panels":[{"type":"wcPanel","panelType":"Table \"Accounts\"","size":{"x":950,"y":827},"customData":{}}]}}},"bottom":{"size":0,"drawer":{"closeSize":0,"frame":{"type":"wcFrame","floating":false,"isFocus":false,"tabOrientation":"bottom","pos":{"x":0.5,"y":0.5},"size":{"x":400,"y":400},"tab":-1,"panels":[]}}}}}"""

    let mutable globalDocker: wcDocker option = None

    let createDockManager (allPanels: (string * (unit -> string * Element * (unit -> unit))) list) buttonSave buttonRestore (element:Element) =
        Rop.flow {
            do! Rop.tryProtection()
            let docker = new wcDocker(element)
            allPanels |> List.iter (fun  (id, f) ->
                docker.registerPanelType (id, createPanelWC f)
            )
            globalDocker <- Some docker
            buttonSave    |>! OnClick (fun _ _ -> savedLayout <- docker.save(); Console.Log(savedLayout) ) |> ignore
            buttonRestore |>! OnClick (fun _ _ ->                docker.restore(savedLayout)             ) |> ignore
        } |> Rop.notifyMessages

    let addPanel id =
        globalDocker |> Option.map(fun docker ->     
            docker.addPanel(id))
        |> ignore

    let loadWorkspace (workspace: Model.Workspace) =
        Server.call {
            let! docker     = globalDocker |> Rop.fromOption (Model.ErrDockerIsNotPresent Model.DckGoldenLayout)
            let! blob       = Server.fetchObjectBlobAR_ workspace.getObject
            docker.restore blob
        }

    let createDockEnvironment (request: Model2.Request) =
        let funCall p1 p2 p3 p4 =
            createDockManager p1 p2 p3 p4
            match request with
                | Model2.LoadWorkspace(workspace) -> loadWorkspace workspace
                | Model2.LoadPanel(panel)         -> addPanel      (sprintf "%A" panel)
                | _                              -> ()
        Browser.createDockEnvironment funCall
