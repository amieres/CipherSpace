namespace CIPHERPrototype1
open Model
open Model2
open WebSharper
open WebSharper.Web
open WebSharper.JavaScript
open WebSharper.Html.Client
open Rop
open FSharp.Data
open FSharp.Data.SqlClient
open Repository
open FSharp.Data.Sql


type TUserR = {
    name          : string option
    email         : string
    language      : string option
    currentClient : System.Guid
    themeTags     : string
}

module UserFormServer =
    
    type sql = SqlDataProvider< 
                  ConnectionString = designCS,
                  DatabaseVendor = Common.DatabaseProviderTypes.MSSQLSERVER,
                  IndividualsAmount = 1000,
                  UseOptionTypes = true >
    let ctx = sql.GetDataContext(actualCS)
    FSharp.Data.Sql.Common.QueryEvents.SqlQueryEvent |> Event.add ((sprintf "Executing SQL: %s") >> System.Diagnostics.Debug.WriteLine)

    [<Rpc>]
    let getUserRecordsAR_ token =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            let userQ = 
                query {
                    for row in ctx.Cs.User do
                    where (row.UserCode = user.userCode)
                    select row
                } |> Seq.head
            let clientsL = userQ.``CS.Client_User by user_code``
                          |> Seq.sortBy (fun relC -> if (relC.CurrentClient |> Option.defaultV false) then 0 else 1 )
            let userR = { name          = userQ.UserName
                          email         = userQ.UserEmail
                          language      = userQ.LanguageCode
                          currentClient = clientsL |> Seq.head |> (fun relC -> relC.ClientCode)
                          themeTags     = userQ.ThemeTags |> Option.defaultV ""
                          }
            let clients = clientsL
                          |> Seq.map (fun relC -> relC.``CS.Client by client_code`` 
                                                  |> Seq.head 
                                                  |> (fun h -> h.ClientCode.ToString(), h.ClientName))
                          |> Seq.toArray
            let languages =
                query {
                    for row in ctx.Cs.Language do
                    select (row.LanguageCode,  row.LanguageDescription |> Option.defaultV row.LanguageCode)
                } |> Seq.toArray
            (userR, clients, languages) |> Rop.succeed

    [<Rpc>]
    let saveUserRecordAR_ token (userData: TUserR) =
        Server.RpcSaveWithTokenValidation token <| fun guest user client dc ->
            let  userQ    = 
                query {
                    for row in ctx.Cs.User do
                    where (row.UserCode = user.userCode)
                    select row
                } |> Seq.head
            userQ.``CS.Client_User by user_code``
            |> Seq.iter(fun cl -> 
                cl.CurrentClient <- userData.currentClient = cl.ClientCode |> Some 
            )
            userQ.UserName     <- userData.name
            userQ.UserEmail    <- userData.email
            userQ.LanguageCode <- userData.language
            userQ.ThemeTags    <- userData.themeTags |> Some
            ctx.SubmitUpdates()
            (guest, "saved.") |> Rop.succeed
                
(*[< JavaScript >]
module UserFormClient2 =

    let addValidationsFor name validations (newValidations:Validations) =
        validations 
        |> Set.filter (function |PathValidation(h::_, _) -> h <> name | _ -> true)
        |> Set.union (newValidations |> Set.map(fun v -> v.addPath name))
    let getValidationsFor name (validations:Validations) =
        validations
        |> Seq.choose (fun v -> if v.headPathIs name then Some (v.reducePath()) else None)
        |> Set

    type private ThisFormsState = {
        user      : TUserR
        clients   : (string * string) []
        languages : (string * string) []
    }

    type FormState<'S> = {
        title       : string
        processing  : bool
        message     : string
        debug       : bool
        validations : Set<Validation>
        detail      : 'S
    }

    let renderSelect labelVals value options =
        let label, (validations: Validations), onChange = labelVals
        let classAlert = if validations |> Seq.length = 0 then "" else " alert-danger"
        let attrs = 
            Attrs (   value       = (value |> Option.defaultV "")
                    , onChange    = fun (e:obj) -> onChange e?target?value
                    , className   = "form-control" + classAlert
            )
        R.E("div", Attrs ( className= "form-group flex1")
            , R.E("label", Attrs ( className= "textInputLabel"), label)
            , ClientForm.validationMsg (validations |> Seq.map (sprintf "%A") |> String.concat ", ")
            , R.E("select", attrs
                , options 
                |> Seq.map (fun (key, opt) ->
                    R.E("option", Attrs(key = key, value = key), opt)
                ) |> Seq.toArray
            )
        )

    type textInputState = { 
        text       : string 
        priorProp  : string 
    }

    let private reactClassInputRenderer (this:obj) : obj =
        let props                                = this?props
        let state              : textInputState  = this?state
        let onChange_                            = props?onChange :> FuncWithArgs<obj      , obj>
        let setState_                            = this?setState  :> FuncWithArgs<obj * obj, obj>
        let onChange  (newV: string)             = onChange_.ApplyUnsafe (this, [| newV     |]) |> ignore
        let setState  (newState: textInputState) = setState_.ApplyUnsafe (this, [| newState |]) |> ignore
        let currentProp : string = props?value
        let v = if currentProp = state.text
                then currentProp
                else if currentProp = state.priorProp
                     then state.text
                     else currentProp
        if currentProp <> state.priorProp ||  v <> state.text then setJVSProp state "text" v;  setJVSProp state "priorProp" currentProp
        let newProps = Attrs()
        JQuery.JQuery.Extend(newProps, props) |> ignore
        newProps.onChange <- fun (e:obj) -> setState {state with text = e?target?value}; onChange e?target?value
        newProps.value    <- v 
        R.E("input", newProps)

    let reactClassInput = lazy R.createClass("reactClassInput", (fun () -> { textInputState.text = ""; priorProp = "------INITIAL--------" }), FuncWithOnlyThis(reactClassInputRenderer))

    let renderInput labelVals text iType placeholder maxLen postButton =
        let label, (validations: Validations), onChange = labelVals
        let classAlert = if validations |> Seq.length = 0 then "" else " alert-danger"
        let attrs = 
            Attrs (``type``        = iType
                    , placeholder  = placeholder
                    , value        = (text |> Option.defaultV "")
                    , onChange     = onChange
                    , className    = "form-control" + classAlert
            )
        if maxLen > 0 then attrs.maxLength <- maxLen
        let input = R.E(reactClassInput.Value, attrs)
        let entry =
            match postButton with
            | Some (postText, postAction) -> 
                R.E("div", Attrs( className = "input-group"), 
                    input, 
                    R.E("span", Attrs ( className= "input-group-btn")
                        , R.E ("button"  , Attrs (``type``= "button", className = "btn btn-default", onClick = postAction), postText)))
            | None -> input
        R.E("div", Attrs ( className= "form-group flex1")
            , R.E("label", Attrs ( className= "textInputLabel"), label)
            , ClientForm.validationMsg (validations |> Seq.map (sprintf "%A") |> String.concat ", ")
            , entry
        )

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

    let validateNothing_ = (fun _ -> Set[])

    let (++) (a: string -> Validations) (b: string -> Validations) =
        fun v -> Set.union (a v)  (b v)       

    let         setDetail       state     detail = { state             with detail        = detail                                         } 
    let private addValidations  state name vs    = { state   with FormState.validations   = (addValidationsFor name  state.validations vs) } 
    let private setUser         state     user   = { state.detail      with user          = user                                           } |> setDetail state
    let private nameChange_     state v          = { state.detail.user with name          =        Some (unbox v)                          } |> setUser   state
    let private emailChange_    state v          = { state.detail.user with email         =             (unbox v)                          } |> setUser   state
    let private languageChange_ state v          = { state.detail.user with language      =        Some (unbox v)                          } |> setUser   state 
    let private clientChange_   state v          = { state.detail.user with currentClient = System.Guid (unbox<string> v)                  } |> setUser   state
    let private themeChange_    state v          = { state.detail.user with themeTags     =             (unbox<string> v)                  } |> setUser   state

    let labelVals (state:FormState<'S>) (setState: FormState<'S>->unit) (validator: string -> Validations) name (onChange: FormState<'S>->string->FormState<'S>) =
        let onChange v =
            let newState = onChange state v
            validator v 
            |> addValidations newState name 
            |> setState
        (name, getValidationsFor name state.validations, onChange)
        
    let private createForm_ initial (container: Element) token = 

        let renderForm (state: FormState<ThisFormsState>) (setState: (FormState<ThisFormsState> -> FormState<ThisFormsState>) -> unit) =
            let showProcessing  txt = (fun state -> { state with message = txt; processing = true  }) |> setState
            let showCompleted   txt = (fun state -> { state with message = txt; processing = false }) |> setState 
            let toggleDebug_    ()  = (fun state -> { state with debug   = not state.debug         }) |> setState
            let emailVerify_    ()  = showCompleted "email verified..."
            let labelValsF          = labelVals state (fun s -> setState (fun state -> s))
            let labelValsNothing    = labelValsF validateNothing_
            let labelValsNoEmpty    = labelValsF validateEmpty_
            let labelValsEmail      = labelValsF (validateEmail_ ++ validateEmpty_)
            let user                = state.detail.user
            let saveData_ () =
                if state.validations |> Set.count = 0 
                then Server.call {
                        showProcessing "saving..."
                        let! guest, result = UserFormServer.saveUserRecordAR_ token user
                        showCompleted result
                        if guest then JS.Window.Location.Reload()

                    }
                else state.validations |> Seq.toArray |> sprintf "cannot save: %A" |> showCompleted

            R.E               ("div"          , Attrs (className= "panel panel-info flex flexgrow" )
                , R.E         ("div"          , Attrs (className= "panel-heading heading"          )
                    , R.E     ("label"        , Attrs (className= "panel-title text-center"        )
                        , state.title
                    )
                    , ClientForm.validationMsg state.message
                    , R.E     ("div"          , Attrs (className= "btn-toolbar pull-right" )
                        , R.E     ("button"   , Attrs (className= "btn-xs btn-default  pull-right", onClick = toggleDebug_ ), ".")
                        , R.E     ("button"   , Attrs (className= "btn    btn-default  pull-right", onClick = saveData_ ), "Save")
                    )
                )
                , R.E (        "div"          , Attrs (className = "panel-body")
                    , R.E (        "div"      , Attrs (className = "flex-row flexgrow")
                        , renderInput     (labelValsNoEmpty "Name"  nameChange_    )       user.name                        "text"  "enter name"  150 None
                        , renderInput     (labelValsEmail   "Email" emailChange_   ) (Some user.email)                      "email" "enter email" 200 (Some("Verify", emailVerify_))
                        , if state.detail.clients |> Array.length > 1         
                            then renderSelect (labelValsNothing "Current client" clientChange_  ) (Some (user.currentClient.ToString())) state.detail.clients
                            else box ""
                    )                                              
                    , R.E (        "div"      , Attrs (className = "flex-row flexgrow")
                        , renderInput         (labelValsNothing "Theme"    themeChange_   ) (Some user.themeTags)           "text"  "enter tags"  150 None
                        , renderSelect        (labelValsNothing "Language" languageChange_)       user.language                    state.detail.languages
                    )                                              
                ) 
            )

        ClientForm.reactRoot initial container.Dom renderForm



    let showForm_  title =
        Browser.withContainerDo "flex flexgrow" (fun container ->
            Server.call { 
                let! token = Server.fetchTokenAR_()
                let! userR, clients, languages = UserFormServer.getUserRecordsAR_ token
                let initial     = { 
                            title       = title
                            processing  = false
                            message     = ""
                            debug       = false
                            validations = Set []
                            detail      = {
                                            user      = userR
                                            clients   = clients
                                            languages = languages 
                            }
                        }
                createForm_ initial container token
            }
        )
*)

[< JavaScript >]
module UserFormClient =
    open Fields

    type Model = {
        form               : GenForm.Model
        dialog             : Dialog.Model
        popup              : Popup.Model
        user               : TUserR
        clients            : (string * string) []
        languages          : (string * string) []
    }

    let init title user clients languages  = {
        form               = GenForm.init title 
        dialog             = Dialog.init
        popup              = Popup.init
        user               = user
        clients            = clients
        languages          = languages
    }

    type Message =
        | ToFormMsg           of GenForm.Message
        | ToDialogMsg         of Dialog.Message
        | ToPopupMsg          of Popup.Message
        | DoAction            of (Model -> Model)
        | NameChange          of string
        | EMailChange         of string
        | ThemeChange         of string
        | ClientChange        of string
        | LanguageChange      of string

    let rec update message model =
        if model.form.debug then printfn "%A" message
        match message with
        | ToFormMsg            msg         -> {model with form         = GenForm.update msg model.form  }
        | ToPopupMsg           msg         -> {model with popup        = Popup.update   msg model.popup }
        | ToDialogMsg          msg         -> {model with dialog       = Dialog.update  msg model.dialog}
        | DoAction             f           -> f model
        | NameChange           v           -> {model with user = { model.user with name          =        Some v }; form = GenForm.update (GenForm.SetModified true) model.form}
        | EMailChange          v           -> {model with user = { model.user with email         =             v }; form = GenForm.update (GenForm.SetModified true) model.form}
        | ThemeChange          v           -> {model with user = { model.user with themeTags     =             v }; form = GenForm.update (GenForm.SetModified true) model.form}
        | ClientChange         v           -> {model with user = { model.user with currentClient = System.Guid v }; form = GenForm.update (GenForm.SetModified true) model.form}
        | LanguageChange       v           -> {model with user = { model.user with language      =        Some v }; form = GenForm.update (GenForm.SetModified true) model.form}

    open ReactHtml

    let runApp_ (token: Auth.Token) container initModel =
        let mutable globalProcessor: (Message -> unit) option = None
        let setGlobalProcessor_ processMsg = match globalProcessor with | None -> globalProcessor <- processMsg | _    -> ()
        let processMessages msg = globalProcessor |> Option.map (fun f -> f msg) |> ignore

        let showProcessing txt = (txt, true ) |> GenForm.Message.ShowInfo |> ToFormMsg |> processMessages
        let showCompleted  txt = (txt, false) |> GenForm.Message.ShowInfo |> ToFormMsg |> processMessages

        let saveData_ model () =
            if model.form.validations |> Set.count = 0 
            then Server.call {
                    showProcessing "saving..."
                    let! guest, result = UserFormServer.saveUserRecordAR_ token model.user
                    showCompleted result
                    GenForm.SetModified false |> ToFormMsg |> processMessages
                    if guest then JS.Window.Location.Reload()
                }
            else model.form.validations |> Seq.toArray |> sprintf "cannot save: %A" |> showCompleted

        let view (model: Model) processMessages =
            setGlobalProcessor_ (Some processMessages)
            GenForm.view 
                            [ "Save"  , "btn    btn-default  pull-right", saveData_ model]
                    [ Dialog.view "title" [] [] <| model.dialog <| (fun msg -> msg |> ToDialogMsg |> processMessages)
                      Popup.view ["-", id] <| model.popup <| (fun msg -> msg |> ToPopupMsg |> processMessages)
                      textNotEmpty   "Name"  (model.user.name |> Option.defaultV "") (NameChange  >> processMessages) [ Placeholder "enter name"  ; MaxLength 150 ]                model.form.validations (ToFormMsg >> processMessages)
                      textWValidator "Email"  model.user.email                       (EMailChange >> processMessages) [ Placeholder "enter email" ; MaxLength 200 ; Type "email" ] model.form.validations (ToFormMsg >> processMessages) (validateEmail_ ++ validateEmpty_) //(Some("Verify", emailVerify_))
                      (if model.clients |> Array.length > 1         
                       then selectWoValidator "Current client" (model.user.currentClient.ToString() |> Some) (ClientChange >> processMessages) model.clients []
                       else NEmpty)
                      Div [ Class "flex-row flexgrow"
                            textWoValidator   "Theme"    model.user.themeTags (ThemeChange    >> processMessages)                 [ Placeholder "enter tags" ; MaxLength 150 ]
                            selectWoValidator "Language" model.user.language  (LanguageChange >> processMessages) model.languages []
                          ]                                            
                    ]
            <| model.form <| (fun msg -> msg |> ToFormMsg |> processMessages)
        
        App.app
            <| initModel
            <| update
            <| view 
        |> App.run container


    let showForm_  title =
        Browser.withContainerDo "flex flexgrow" (fun container ->
            Server.call { 
                let! token = Server.fetchTokenAR_()
                let! userR, clients, languages = UserFormServer.getUserRecordsAR_ token
                init title userR clients languages
                |> runApp_ token container.Dom
            }
        )
