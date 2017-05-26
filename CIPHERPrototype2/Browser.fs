namespace CIPHERPrototype1
open Model
open Model2
open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open Rop

[< JavaScript >]
module Browser =
    let withContainerDo className f =
        let container = 
            Div [ Attr.Class className] 
            |>! OnAfterRender (fun container -> f container)
        container

    let mutable globalToken = { Auth.Token.Name = new System.Guid("00000000-0000-0000-0000-000000000000"); Auth.Token.Hash = ""}

    let LoginBox goLink =
        let login    = Input [ Attr.PlaceHolder "User email" ] 
//                       |> Validator.
        let password = Input [ Attr.PlaceHolder "Password"
                               Attr.Type "password"        ]
        let errors   = P []
        Div [
            errors
            login
            password
            Input [Attr.Type "button"; Attr.Value "Enter"]
            |>! OnClick (fun e args ->
                Server.callR (Rop.messagesDo (fun failed ms -> if failed then errors.Text <- sprintf "%A" ms))
                    {
                    let! token               = Server.LoginAR_ login.Value password.Value
                    globalToken             <- token
                    JS.Window.Location.Href <- goLink
               }
            )
        ]

    let createPanelTable (options: Auth.Token * string * Table) =
        let token, title, table            = options
        let elements, divGrid, afterRender = SlickGrid.GridSync token table
        let container                      = Div elements -< [ 
                                                                 Attr.Class "flex flexgrow"
                                                                 Attr.Style "position: relative; height: 100%; width: 100%; " 
                                                             ]
        title, container, (fun () -> divGrid.Dom |> afterRender)

    let mutable         mouseStatus = 0
    let onMouseDown _ = mouseStatus <- mouseStatus + 1
    let onMouseUp   _ = mouseStatus <- mouseStatus - 1
    let registerMouseEvents =
        JSEvent.addEventListener(JS.Document?body, "mousedown", onMouseDown)
        JSEvent.addEventListener(JS.Document?body, "mouseup"  , onMouseUp  )

    let mutable instance:int = 1
    let createPanelReport (options: Auth.Token * string * string) =
        let token, report, url   = options
        instance                <- instance + 1
        let cover                = Div [ Attr.Class "iframe-cover-on" ] 
                                   |>! OnMouseEnter (fun cover _ -> 
                                                       if JS.Document?body?style?cursor = "" && mouseStatus = 0 then
                                                                  cover.RemoveClass "iframe-cover-on"
                                                                  cover.AddClass    "iframe-cover-off")
        let iFrame               = IFrame [ 
                                              Attr.Class "flex flexgrow"
                                              Attr.Src (url + instance.ToString())
                                              Attr.FrameBorder "0"
                                              Attr.Height      "100%"
                                              Attr.Width       "100%"
                                          ] |>! OnMouseLeave (fun _ _ -> 
                                                                  cover.RemoveClass "iframe-cover-off"
                                                                  cover.AddClass    "iframe-cover-on")
        let container             = Div [     
                                              Attr.Class "flex flexgrow"
                                              Attr.Style "position: relative; height: 100%; width: 100%; " 
                                        ] -< [ cover; iFrame ]
        report, container, (fun () -> ())

    let getPanelRegister (token: Auth.Token) (panel: PanelBrowser) =
        match panel with
            | PanelTable (table , title     ) -> sprintf "%A" table , fun () -> createPanelTable  (token, title, table)
            | PanelReport(report, title, url) -> sprintf "%A" report, fun () -> createPanelReport (token, title, url  )
    let allPanels (token: Auth.Token) (panels: PanelBrowser list) = 
        panels
        |> List.map (getPanelRegister token)

    let findPanelFromEndPoint contentPage panels =
        panels
        |> List.tryFind (fun panel -> 
                            contentPage = match panel with | PanelTable (table , title    ) -> CPTable (table )
                                                           | PanelReport(report, title,  _) -> CPReport(report)
        ) |> Rop.fromOption ((sprintf "%A" contentPage) |> ErrInvalidContentPageForClient)

    let showPanel (contentPage: ContentPage) =
        withContainerDo "flex flexgrow" (fun container ->
            Server.call {
                let! token              = Server.fetchTokenAR_()
                let! panels             = Server.fetchPanelsAR_()
                let! panel              = findPanelFromEndPoint contentPage panels
                let title, f            = getPanelRegister token panel
                let _, element, after   = f()
                container              -< [ element ] |> ignore
                after                     ()
            }
        )

    let createDockEnvironment (createDock) =
        withContainerDo "flex flexgrow" (fun container ->
            Server.call {
                let! token           = Server.fetchTokenAR_()
                let! panels          = Server.fetchPanelsAR_()
                let  buttonSave      = Button [Text "save"   ]
                let  buttonRestore   = Button [Text "restore"]
                let  allPanels       = allPanels token panels
                container -< 
                    [
                        Div [
                            buttonSave  
                            buttonRestore
                        ]
                        Div [Attr.Class "flex flexgrow" ; Attr.Id "SinglePane"]
                        |>! OnAfterRender (createDock allPanels buttonSave buttonRestore)
                    ] |> ignore
            }
        )

    let createCanvasNone() = 
        withContainerDo "flex flexgrow" (fun _ -> ())




[< JavaScript >]
module DckSingle =
    let createPanel (f:unit -> string * Element * (unit -> unit)) (docker: Element) =
        let title, container, after = f()
        docker -< [ container ] |> ignore
        after()

    let mutable globalDocker: Element option = None
    let mutable globalPanels: (string * (unit -> string * Element * (unit -> unit))) list = []

    let createDockManager(allPanels: (string * (unit -> string * Element * (unit -> unit))) list) (buttonSave:Pagelet) (buttonRestore:Pagelet) (element: Element) =
        Rop.flow {
            do! Rop.tryProtection()
            //buttonSave    |>! OnClick (fun _ _ -> savedLayout <- docker.save()                         ) |> ignore
            //buttonRestore |>! OnClick (fun _ _ ->                docker.restore(savedLayout)           ) |> ignore
            globalDocker <- Some element
            globalPanels <- allPanels
        } |> Rop.notifyMessages

    let addPanel id =
        globalDocker |> Option.map(fun docker ->     
            JQuery.JQuery.Of(docker.Dom).Children().Remove() |> ignore
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

