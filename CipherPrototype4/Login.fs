namespace CIPHERSpace

open WebSharper
open WebSharper.JavaScript
open Rop
open Model2

[<JavaScript>]
module LoginForm =

    type Props = App.Dummy

    type Model =  {
            userName  : string
            password  : string
            inProgress: bool
            goLink    : string
            error     : option<string>
        }

    let init goLink error  = {
            userName   = ""
            password   = ""
            inProgress = false
            goLink     = goLink
            error      = error
        }

    type Message =
        | ChangeUserName of string
        | ChangePassword of string
        | Submit
        | LogonFailed    of string

    let update (props: Props) (msg: Message)  model =
        match msg with
            | ChangeUserName username -> {model with   userName = username; error = None     }
            | ChangePassword pwd      -> {model with   password = pwd     ; error = None     }
            | Submit                  -> {model with inProgress = true                       }
            | LogonFailed err         -> {model with inProgress = false   ; error = Some err }

    open ReactHtml

    let view (props:Props) (model:Model) (processMessages: Message -> unit) =
        let submit      (e:Attrs) = 
            e.preventDefault()
            Submit |> processMessages
            Server.callR (Rop.messagesDo (fun failed ms -> if failed then (LogonFailed (sprintf "%A" ms) |> processMessages)))
                {
                let! token               = Server.LoginAR_ model.userName model.password
                JS.Window.Location.Href  <- model.goLink
            }
        let submitGuest (e:Attrs) =
            Submit |> processMessages
            Server.callR (Rop.messagesDo (fun failed ms -> if failed then (LogonFailed (sprintf "%A" ms) |> processMessages)))
                {
                let! token                = Server.guestLoginAR_()
                JS.Window.Location.Href  <- model.goLink
            }
        let disabledClass = (if model.inProgress then " disabled" else "")
        let form = Form [ Input  [ Type "text"    ; Class ("form-control" + disabledClass); Placeholder "User Name"; Value model.userName; Disabled model.inProgress ]
                          |> OnChange (prop "target" >> prop "value" >> ChangeUserName >> processMessages)
                          Br []
                          Input  [ Type "password"; Class ("form-control" + disabledClass); Placeholder "Password" ; Value model.password; Disabled model.inProgress ]
                          |> OnChange (prop "target" >> prop "value" >> ChangePassword >> processMessages)
                          Br []
                          Button [ Type "submit"; Class ("btn btn-primary btn-block" + disabledClass)
                                   NText "Login"]
                          Div    [ Class "flex-row"
                                   Div [ Class "flexgrow"                ; Hr [           ] ]
                                   Div [ Class "flexgrow-1-5 text-center"; H5 [NText "or" ] ]
                                   Div [ Class "flexgrow"                ; Hr [           ] ]
                                 ]
                          Button [ Type "button"; Class ("btn btn-info btn-block"    + disabledClass)
                                   NText "Enter as Guest" ]
                          |> OnClick submitGuest
                          Br []
                          Div [ yield Class "text-center"
                                if model.inProgress then yield Img [ Src "/EPFileX/image/loader.gif" ]
                              ]
                          match model.error with | Some e -> [ Class "alert alert-danger"; NText e ] | None -> []
                          |> Div
                      ]
                   |> OnSubmit submit
        Div [ Class "flex-row flex-align-center flexgrow"
              Div [Class "blur" ; _Style [ _position "absolute"; _top "0Px" ; _left "0Px" ; _bottom "0Px" ; _right "0Px" 
                                           newAttr "backgroundImage"    "url('/EPFileX/image/BI_CONSULTANCY.jpg')"
                                           newAttr "backgroundSize"     "cover"
                                           newAttr "backgroundPosition" "center center"] ]
              Div [Class "container"
                   Div [Class "row"
                        Div [Class "col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3"
                             Div [Class "panel panel-default shadow"
                                  Div [Class "panel-body"
                                       Div [_Style [_textAlign "center" ]
                                            Img [ NAttribute("alt", "Brand") ; Src "/EPFileX/image/LOGO_cipher2.png" ; _Style [ _width  "200px"] ]
                                            form
                                           ]
                                      ]
                                 ]
                            ]
                       ]
                  ]
            ]

    let showForm_ goLink error =
        let loader = BootstrapLoad()
        App.withContainerDo "" <| fun node ->
            let app = App.App(init goLink error, update, view)
            app.run App.DummyNew node.Dom 
                    
