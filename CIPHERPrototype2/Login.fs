namespace CIPHERPrototype1

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client

[<JavaScript>]
module LoginForm =
    open Rop

    type LoginData = 
        {
            UserName  : string
            Password  : string
            InProgress: bool
            Error     : option<string>
        }

    type Change =
        | ChangeUserName of string
        | ChangePassword of string
        | Submit
        | LogonFailed    of string

    let newModel model change =
        Console.Log("New Model: " + JSON.Stringify(model) + ", Change: " + change.ToString())
        match change with
            | ChangeUserName username -> {model with   UserName = username; Error = None}
            | ChangePassword pwd      -> {model with   Password = pwd     ; Error = None}
            | Submit                  -> {model with InProgress = true                  }
            | LogonFailed err         -> {model with InProgress = false   ; Error = Some err }

    let LoginReactForm goLink error =
        let InitialStatus () =
            {
                UserName   = ""
                Password   = ""
                InProgress = false
                Error      = error
            }

        let f = 
            R.createClass("LRF", InitialStatus
              , FuncWithOnlyThis(fun this ->
                    let setState_                      = this?setState :> FuncWithArgs<obj * obj, obj>
                    let setState (newState: LoginData) = setState_.ApplyUnsafe(this, [| newState |]) |> ignore
                    let state : LoginData              = this?state
                    let submit          (e:Attrs)      = 
                        e.preventDefault()
                        Submit |> newModel state |> setState
                        Server.callR (Rop.messagesDo (fun failed ms -> if failed then (LogonFailed (sprintf "%A" ms) |> newModel state |> setState)))
                            {
                            let! token               = Server.LoginAR_ state.UserName state.Password
                            Browser.globalToken      <- token
                            JS.Window.Location.Href  <- goLink
                        }
                    let submitGuest     (e:Attrs)      =
                        Submit |> newModel state |> setState
                        Server.callR (Rop.messagesDo (fun failed ms -> if failed then (LogonFailed (sprintf "%A" ms) |> newModel state |> setState)))
                            {
                            let! token                = Server.guestLoginAR_()
                            Browser.globalToken      <- token
                            JS.Window.Location.Href  <- goLink
                        }
                    let usernameChange  (e:Attrs)      = ChangeUserName e?target?value |> newModel state |> setState
                    let passwordChange  (e:Attrs)      = ChangePassword e?target?value |> newModel state |> setState
                    let disabledClass = (if state.InProgress then " disabled" else "")
                    let elems = 
                        match state.Error with
                                    | Some e -> if not state.InProgress then [| R.E("div", Attrs(key = "_7", className = "alert alert-danger"), R.t e) |] else [| |]
                                    | None   -> [| |]
                              |> Array.append 
                                ( 
                                match state.InProgress with
                                | true  -> [| R.E("div", Attrs(key = "_8", className = "text-center"), R.E("img", Attrs( src = "/Resources/images/loader.gif" )) ) |]
                                | false -> [| |]
                                )
                              |> Array.append  
                              [|
                                R.E("input" , Attrs(key = "_1", ``type`` = "text", className = "form-control" + disabledClass, placeholder = "User Name", value = state.UserName, onChange = usernameChange, disabled = state.InProgress))
                                R.E("br"    , Attrs(key = "_2"))
                                R.E("input" , Attrs(key = "_3", ``type`` = "password", className = "form-control", placeholder = "Password", value = state.Password, onChange = passwordChange, disabled = state.InProgress))
                                R.E("br"    , Attrs(key = "_4"))
                                R.E("button", Attrs(key = "_5", ``type`` = "submit", className = "btn btn-primary btn-block" + disabledClass), R.t "Login")
                                R.E("div"   , Attrs(key = "_6", className = "flex-row") 
                                      , R.E("div", Attrs(className = "flexgrow")                , R.E("hr", Attrs())       )
                                      , R.E("div", Attrs(className = "flexgrow-1-5 text-center"), R.E("h5", Attrs(), R.t "or") )
                                      , R.E("div", Attrs(className = "flexgrow")                , R.E("hr", Attrs())       ))
                                R.E("button", Attrs(key = "_9", ``type`` = "button", className = "btn btn-info btn-block"    + disabledClass, onClick = submitGuest), R.t "Enter as Guest")
                                R.E("br", Attrs(key = "_10"))
                              |]
                    R.tag "form" [Attrs(onSubmit = submit)] (elems |> Seq.toList)
                    )
                )
            
        let content = Div [] |>! OnAfterRender (fun e -> ReactDOM.render(R.E(f), e.Dom))
        content
                    
    let render() =
        Div [
            Input [Attr.Type "text"]
                -< [Attr.Class "form-control"]
                -< [Attr.PlaceHolder "User Name"]
            Br []
            Input [Attr.Type "password"]
                -< [Attr.Class "form-control"]
                -< [Attr.PlaceHolder "Password"]
            Br []
            Button [Attr.Type "submit"]
                -< [Attr.Class "btn btn-primary btn-block"]
                -< [Text "Login"]
            Br []
        ]