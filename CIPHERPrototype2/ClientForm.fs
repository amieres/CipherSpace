namespace CIPHERPrototype1
open Model
open Model2
open WebSharper
open WebSharper.Web
open WebSharper.JavaScript
open WebSharper.Html.Client
open Rop
open FSharp.Data
open FSharp.Data.Sql

type TServerOlapR = {
    code   : System.Guid
    name   : string
    server : string
    model  : string
}

type TReportR = {
    code     : System.Guid
    name     : string
    typeR    : string
    uniqueId : string
    options  : string
}

type TParameterR = {
    code  : string
    name  : string
    value : string
}

type TClientR = {
    code          : System.Guid
    name          : string
    industry      : string option
    serverOlaps   : TServerOlapR []
    reports       : TReportR     []
    parameters    : TParameterR  []
}

module ClientFormServer =
    open UserFormServer
    open Repository
    
    [<Rpc>]
    let getClientRecordsAR_ token =
        Server.RpcWithTokenValidation token <| fun user client dc ->
            let clientQ = 
                query {
                    for row in ctx.Cs.Client do
                    where (row.ClientCode = client.clientCode)
                    select row
                } |> Seq.head
            let parameters = 
                clientQ.``CS.Client_Parameter by client_code`` 
                |> Seq.map(fun p -> 
                    let parm = p.``CS.Parameter by parameter_code`` |> Seq.head
                    let parmName = parm.``CS.Label by label_code``  |> Seq.head
                    { code  = p.ParameterCode
                      name  = parmName.LabelDescription
                      value = p.ParameterValue |> Option.defaultV ""
                    }
                ) |> Seq.toArray
            let serverOlaps = 
                query {
                    for row in clientQ.``dbo.Server_Olap by client_code`` do
                    select { TServerOlapR.code   = row.ServerCode
                             TServerOlapR.name   = row.ServerId 
                             TServerOlapR.server = row.ServerName
                             TServerOlapR.model  = row.ModelName
                           }
                } |> Seq.toArray
            let reports = 
                query {
                    for row in clientQ.``FIN.Report_Definition by client_code`` do
                    select { TReportR.code     = row.ReportId
                             TReportR.name     = row.ReportName 
                             TReportR.typeR    = row.ReportType     |> Option.defaultV ""
                             TReportR.uniqueId = row.ReportUniqueId |> Option.defaultV ""
                             TReportR.options  = row.Options        |> Option.defaultV ""
                           }
                } |> Seq.toArray
            let client = {
                code        = clientQ.ClientCode
                name        = clientQ.ClientName
                industry    = clientQ.IndustryType
                serverOlaps = serverOlaps
                reports     = reports
                parameters  = parameters
            }
            client |> Rop.succeed

    [<Rpc>]
    let saveClientRecordAR_ token (clientData: TClientR) =
        Server.RpcSaveWithTokenValidation token <| fun guest user client dc ->
            let clientQ = 
                query {
                    for row in ctx.Cs.Client do
                    where (row.ClientCode = client.clientCode)
                    select row
                } |> Seq.head
            let serverOlapQ = 
                query {
                    for row in clientQ.``dbo.Server_Olap by client_code`` do
                    select row
                }
            clientQ.ClientName   <- clientData.name       
            clientQ.IndustryType <- clientData.industry   
            clientQ.``CS.Client_Parameter by client_code`` 
            |> Seq.iter(fun p -> 
                clientData.parameters
                |> Array.tryFind(fun cdP -> cdP.code = p.ParameterCode)
                |> Option.iter  (fun cdP ->
                    p.ParameterValue <- Some cdP.value
                )
            )
            clientQ.``dbo.Server_Olap by client_code``
            |> Seq.iter(fun s ->
                clientData.serverOlaps
                |> Array.tryFind(fun cdS -> cdS.code = s.ServerCode)
                |> Option.iter  (fun cdS ->
                    s.ServerId   <- cdS.name
                    s.ServerName <- cdS.server
                    s.ModelName  <- cdS.model
                )
            )
            clientQ.``FIN.Report_Definition by client_code``
            |> Seq.iter(fun r ->
                clientData.reports
                |> Array.tryFind(fun cdR -> cdR.code = r.ReportId)
                |> Option.iter  (fun cdR ->
                    r.ReportName     <- cdR.name
                    r.ReportType     <- Some cdR.typeR
                    r.ReportUniqueId <- Some cdR.uniqueId
                    r.Options        <- Some cdR.options
                )
            )
            ctx.SubmitUpdates()
            (guest, "saved.") |> Rop.succeed
                
(*[< JavaScript >]
module ClientFormClient2 =
    open UserFormClient2
    open SlickGrid

    type private SuperState = {
        formState            : FormState<TClientR>
        serverGridProcessorO : (SimpleGridInMessage -> unit) option
        reportGridProcessorO : (SimpleGridInMessage -> unit) option
        paramGridProcessorO  : (SimpleGridInMessage -> unit) option
        itemsCallback        : (Result<obj[]   >    -> unit) option
    }

    type private Message =
        | ShowInfo           of string * bool
        | SetState           of FormState<TClientR>
        | FromServerGrid     of SimpleGridOutMessage
        | ToServerGrid       of SimpleGridInMessage
        | FromReportGrid     of SimpleGridOutMessage
        | ToReportGrid       of SimpleGridInMessage
        | FromParamGrid      of SimpleGridOutMessage
        | ToParamGrid        of SimpleGridInMessage
        | WhenReceiveItems   of (Result<obj   []> -> unit)
        | ToggleDebug

    let private createForm_ initial (container: Element) token = 

        let mutable globalSetState =  None
        let inline setGlobalSetState f =  match globalSetState with
                                          | None   -> globalSetState <- Some f
                                          | Some _ -> ()

        let rec updateState superState message =
            let state = superState.formState
            if state.debug then printfn "%A" message
            let setState s = 
                globalSetState |> Option.map (fun f -> f s) |> ignore
                { superState with formState = s }
            match message with
            | Message.ShowInfo(msg, p) -> setState {state with message = msg; processing = p}
            | SetState       newState  -> setState newState
            | ToServerGrid  msg  -> superState.serverGridProcessorO |> Option.iter(fun f -> msg |> f); superState
            | ToReportGrid  msg  -> superState.reportGridProcessorO |> Option.iter(fun f -> msg |> f); superState
            | ToParamGrid   msg  -> superState.paramGridProcessorO  |> Option.iter(fun f -> msg |> f); superState
            | FromServerGrid msg -> match msg with                                  
                                    | SimpleGridOutMessage.ShowInfo        (a,b)  -> Message.ShowInfo(a,b) |> updateState superState
                                    | SimpleGridOutMessage.MessageProcessor f     -> {superState with serverGridProcessorO  = Some f}
                                    | Items                                 data  -> superState.itemsCallback     |> Option.iter (fun f -> f (Rop.succeed data          )) ; {superState with itemsCallback   = None }
                                    | _                                           -> superState
            | FromReportGrid msg -> match msg with                                  
                                    | SimpleGridOutMessage.ShowInfo        (a,b)  -> Message.ShowInfo(a,b) |> updateState superState
                                    | SimpleGridOutMessage.MessageProcessor f     -> {superState with reportGridProcessorO  = Some f}
                                    | Items                                 data  -> superState.itemsCallback     |> Option.iter (fun f -> f (Rop.succeed data          )) ; {superState with itemsCallback   = None }
                                    | _                                           -> superState
            | FromParamGrid msg  -> match msg with                                  
                                    | SimpleGridOutMessage.ShowInfo        (a,b)  -> Message.ShowInfo(a,b) |> updateState superState
                                    | SimpleGridOutMessage.MessageProcessor f     -> {superState with paramGridProcessorO  = Some f}
                                    | Items                                 data  -> superState.itemsCallback     |> Option.iter (fun f -> f (Rop.succeed data          )) ; {superState with itemsCallback   = None }
                                    | _                                           -> superState
            | WhenReceiveItems       callback                                     -> {superState with itemsCallback     = Some callback }
            | ToggleDebug                                                         -> setState {state with debug       = not state.debug }  

        let globalSetState = "not allowed to use globalSetState from here onwards"

        let superInitial = {
            formState             = initial
            serverGridProcessorO  = None
            reportGridProcessorO  = None
            paramGridProcessorO   = None
            itemsCallback         = None
        }

        let processMessages = 
            let processor = processorAgent superInitial updateState
            fun message -> processor.Post message

        let showProcessing txt = (txt, true ) |> Message.ShowInfo |> processMessages
        let showCompleted  txt = (txt, false) |> Message.ShowInfo |> processMessages

        let saveData_ state () =
            if state.validations |> Set.count = 0 
            then Server.call {
                    showProcessing "saving..."
                    let! guest, result = ClientFormServer.saveClientRecordAR_ token state.detail
                    showCompleted result
                    if guest then JS.Window.Location.Reload()
                }
            else state.validations |> Seq.toArray |> sprintf "cannot save: %A" |> showCompleted

        let execOrderX_        () = Server.call { 
                                        showProcessing "replicating customer..."
                                        let! r = Server.ReplicateClientAR_ token
                                        showCompleted <| sprintf "replicated %A" r 
                                    }

        let processServerGridMessages  (msg: SimpleGridOutMessage ) = msg |> FromServerGrid  |> processMessages
        let serverGridClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                    let cols = [|
                                                Column(
                                                     id     = "name"
                                                    ,name   = "Alias"
                                                    ,field  = "name"
                                                )
                                                Column(
                                                     id     = "Server"
                                                    ,name   = "Server"
                                                    ,field  = "server"
                                                    ,editor = Slick.Editors.Text
                                                )
                                                Column(
                                                     id     = "Model"
                                                    ,name   = "Model"
                                                    ,field  = "model"
                                                    ,editor = Slick.Editors.Text
                                                )
                               |]
                    let createNew (item:obj) (id:int) = box id, box null
                    let servers = initial.detail.serverOlaps |> Array.map box
                    let res = SlickGrid.SimpleGrid cols servers createNew (Some processServerGridMessages) container
                    ()
            )

        let processReportGridMessages  (msg: SimpleGridOutMessage ) = msg |> FromReportGrid  |> processMessages
        let reportGridClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                    let cols = [|
                                                Column(
                                                     id     = "Name"
                                                    ,name   = "Name"
                                                    ,field  = "name"
                                                )
                                                Column(
                                                     id     = "Type"
                                                    ,name   = "Report Type"
                                                    ,field  = "typeR"
                                                )
                                                Column(
                                                     id     = "uniqueId"
                                                    ,name   = "Unique Id"
                                                    ,field  = "uniqueId"
                                                    ,editor = Slick.Editors.Text
                                                )
                                                Column(
                                                     id     = "options"
                                                    ,name   = "Options"
                                                    ,field  = "options"
                                                    ,editor = Slick.Editors.Text
                                                )
                               |]
                    let createNew (item:obj) (id:int) = box id, box { code = ""; name = ""; value = ""}
                    let reports = initial.detail.reports |> Array.map box
                    let res = SlickGrid.SimpleGrid cols reports createNew (Some processReportGridMessages) container
                    ()
            )

        let processParamGridMessages  (msg: SimpleGridOutMessage ) = msg |> FromParamGrid  |> processMessages
        let paramGridClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                    let cols = [|
                                                Column(
                                                     id     = "Parameter"
                                                    ,name   = "Parameter"
                                                    ,field  = "name"
                                                )
                                                Column(
                                                     id     = "Value"
                                                    ,name   = "Value"
                                                    ,field  = "value"
                                                    ,editor = Slick.Editors.Text
                                                )
                               |]
                    let createNew (item:obj) (id:int) = box id, box { code = ""; name = ""; value = ""}
                    let parameters = initial.detail.parameters |> Array.map box
                    let res = SlickGrid.SimpleGrid cols parameters createNew (Some processParamGridMessages) container
                    ()
            )

        let nameChange_       state (v: obj) = { state.detail      with TClientR.name =             (unbox v)                          } |> setDetail state
        let industryChange_   state (v: obj) = { state.detail      with industry      =        Some (unbox v)                          } |> setDetail state

        let renderForm (state: FormState<TClientR>) (setState: FormState<TClientR> -> unit) =
            setGlobalSetState setState
            let setState newState =  newState |> SetState |> processMessages //"not allowed to use setState from here onwards"

            let toggleDebug_    ()         = { state             with debug         = not state.debug                                } |> setState
            let labelValsNothing = labelVals state setState validateNothing_
            let labelValsNoEmpty = labelVals state setState validateEmpty_
            let labelValsEmail   = labelVals state setState (validateEmail_ ++ validateEmpty_)

            R.E               ("div"          , Attrs (className= "panel panel-info flex flexgrow" )
                , R.E         ("div"          , Attrs (className= "panel-heading heading"          )
                    , R.E     ("label"        , Attrs (className= "panel-title text-center"        )
                        , state.title
                    )
                    , ClientForm.validationMsg state.message
                    , R.E     ("div"          , Attrs (className= "btn-toolbar pull-right" )
                        , R.E     ("button"   , Attrs (className= "btn-xs btn-default  pull-right", onClick = toggleDebug_ ), ".")
                        , R.E     ("button"   , Attrs (className= "btn-xs btn-default  pull-right", disabled = (state.processing), onClick = execOrderX_  ), "X")
                        , R.E     ("button"   , Attrs (className= "btn    btn-default  pull-right", onClick = saveData_ state), "Save")
                    )
                )
                , R.E (        "div"          , Attrs (className = "panel-body")
                    , renderInput     (labelValsNoEmpty "Name"       nameChange_      ) (Some state.detail.name      )                 "text"  "enter name"     150 None
                    , renderInput     (labelValsNothing "Industry"   industryChange_  ) (     state.detail.industry  )                 "text"  "enter industry"  50 None
                ) 
                , R.E             ("div"      , Attrs (className = "flex flexgrow flex1")
                    , R.E         (reportGridClass )
                )
                , R.E             ("div"      , Attrs (className = "flex flexgrow flex1")
                    , R.E         (paramGridClass )
                )
                , R.E             ("div"      , Attrs (className = "flex flexgrow flex1")
                    , R.E         (serverGridClass )
                )
            )

        ClientForm.reactRoot2 initial container.Dom renderForm
        



    let showForm_  title =
        Browser.withContainerDo "flex flexgrow" (fun container ->
            Server.call { 
                let! token              = Server.fetchTokenAR_()
                let! client             = ClientFormServer.getClientRecordsAR_ token
                let initial     = { 
                            title       = title
                            processing  = false
                            message     = ""
                            debug       = false
                            validations = Set []
                            detail      = client
                        }
                createForm_ initial container token
            }
        )
*)

[< JavaScript >]
module ClientFormClient =
    open Fields
    open SlickGrid

    type Model = {
        form                 : GenForm.Model
        dialog               : Dialog.Model
        popup                : Popup.Model
        client               : TClientR
        serverGridProcessorO : (SimpleGridInMessage -> unit) option
        reportGridProcessorO : (SimpleGridInMessage -> unit) option
        paramGridProcessorO  : (SimpleGridInMessage -> unit) option
        itemsCallback        : (Result<obj[]   >    -> unit) option
    }

    let init title client = {
        form                 = GenForm.init title 
        dialog               = Dialog.init
        popup                = Popup.init
        client               = client
        serverGridProcessorO = None
        reportGridProcessorO = None
        paramGridProcessorO  = None
        itemsCallback        = None
    }

    type Message =
        | ToFormMsg           of GenForm.Message
        | ToDialogMsg         of Dialog.Message
        | ToPopupMsg          of Popup.Message
        | DoAction            of (Model -> Model)
        | NameChange          of string
        | IndustryChange      of string
        | FromServerGrid     of SimpleGridOutMessage
        | ToServerGrid       of SimpleGridInMessage
        | FromReportGrid     of SimpleGridOutMessage
        | ToReportGrid       of SimpleGridInMessage
        | FromParamGrid      of SimpleGridOutMessage
        | ToParamGrid        of SimpleGridInMessage
        | WhenReceiveItems   of (Result<obj   []> -> unit)

    let rec update message model =
        if model.form.debug then printfn "%A" message
        match message with
        | ToFormMsg            msg         -> {model with form         = GenForm.update msg model.form  }
        | ToPopupMsg           msg         -> {model with popup        = Popup.update   msg model.popup }
        | ToDialogMsg          msg         -> {model with dialog       = Dialog.update  msg model.dialog}
        | DoAction             f           -> f model
        | NameChange           v           -> {model with client = { model.client with name     =      v }; form = GenForm.update (GenForm.SetModified true) model.form}
        | IndustryChange       v           -> {model with client = { model.client with industry = Some v }; form = GenForm.update (GenForm.SetModified true) model.form}
        | ToServerGrid  msg  -> model.serverGridProcessorO |> Option.iter(fun f -> msg |> f); model
        | ToReportGrid  msg  -> model.reportGridProcessorO |> Option.iter(fun f -> msg |> f); model
        | ToParamGrid   msg  -> model.paramGridProcessorO  |> Option.iter(fun f -> msg |> f); model
        | FromServerGrid msg -> match msg with                                  
                                | SimpleGridOutMessage.ShowInfo        (a,b)  -> GenForm.ShowInfo(a,b) |> ToFormMsg |> update <| model
                                | SimpleGridOutMessage.MessageProcessor f     -> {model with serverGridProcessorO  = Some f}
                                | Items                                 data  -> model.itemsCallback     |> Option.iter (fun f -> f (Rop.succeed data          )) ; {model with itemsCallback   = None }
                                | _                                           -> model
        | FromReportGrid msg -> match msg with                                  
                                | SimpleGridOutMessage.ShowInfo        (a,b)  -> GenForm.ShowInfo(a,b) |> ToFormMsg |> update <| model
                                | SimpleGridOutMessage.MessageProcessor f     -> {model with reportGridProcessorO  = Some f}
                                | Items                                 data  -> model.itemsCallback     |> Option.iter (fun f -> f (Rop.succeed data          )) ; {model with itemsCallback   = None }
                                | _                                           -> model
        | FromParamGrid msg  -> match msg with                                  
                                | SimpleGridOutMessage.ShowInfo        (a,b)  -> GenForm.ShowInfo(a,b) |> ToFormMsg |> update <| model
                                | SimpleGridOutMessage.MessageProcessor f     -> {model with paramGridProcessorO  = Some f}
                                | Items                                 data  -> model.itemsCallback     |> Option.iter (fun f -> f (Rop.succeed data          )) ; {model with itemsCallback   = None }
                                | _                                           -> model
        | WhenReceiveItems       callback                                     -> {model with itemsCallback     = Some callback }

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
                    let! guest, result = ClientFormServer.saveClientRecordAR_ token model.client 
                    showCompleted result
                    if guest then JS.Window.Location.Reload()

                }
            else model.form.validations |> Seq.toArray |> sprintf "cannot save: %A" |> showCompleted

        let execOrderX_        () = 
            Server.call { 
                showProcessing "replicating customer..."
                let! r = Server.ReplicateClientAR_ token
                showCompleted <| sprintf "replicated %A" r 
            }

        let processServerGridMessages  (msg: SimpleGridOutMessage ) = msg |> FromServerGrid  |> processMessages
        let serverGridClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                    let cols = [|
                                                Column(
                                                     id     = "name"
                                                    ,name   = "Alias"
                                                    ,field  = "name"
                                                )
                                                Column(
                                                     id     = "Server"
                                                    ,name   = "Server"
                                                    ,field  = "server"
                                                    ,editor = Slick.Editors.Text
                                                )
                                                Column(
                                                     id     = "Model"
                                                    ,name   = "Model"
                                                    ,field  = "model"
                                                    ,editor = Slick.Editors.Text
                                                )
                               |]
                    let createNew (item:obj) (id:int) = box id, box null
                    let servers = initModel.client.serverOlaps |> Array.map box
                    let res = SlickGrid.SimpleGrid cols servers createNew (Some processServerGridMessages) container
                    ()
            )

        let processReportGridMessages  (msg: SimpleGridOutMessage ) = msg |> FromReportGrid  |> processMessages
        let reportGridClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                    let cols = [|
                                                Column(
                                                     id     = "Name"
                                                    ,name   = "Name"
                                                    ,field  = "name"
                                                )
                                                Column(
                                                     id     = "Type"
                                                    ,name   = "Report Type"
                                                    ,field  = "typeR"
                                                )
                                                Column(
                                                     id     = "uniqueId"
                                                    ,name   = "Unique Id"
                                                    ,field  = "uniqueId"
                                                    ,editor = Slick.Editors.Text
                                                )
                                                Column(
                                                     id     = "options"
                                                    ,name   = "Options"
                                                    ,field  = "options"
                                                    ,editor = Slick.Editors.Text
                                                )
                               |]
                    let createNew (item:obj) (id:int) = box id, box { code = ""; name = ""; value = ""}
                    let reports = initModel.client.reports |> Array.map box
                    let res = SlickGrid.SimpleGrid cols reports createNew (Some processReportGridMessages) container
                    ()
            )

        let processParamGridMessages  (msg: SimpleGridOutMessage ) = msg |> FromParamGrid  |> processMessages
        let paramGridClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                    let cols = [|
                                                Column(
                                                     id     = "Parameter"
                                                    ,name   = "Parameter"
                                                    ,field  = "name"
                                                )
                                                Column(
                                                     id     = "Value"
                                                    ,name   = "Value"
                                                    ,field  = "value"
                                                    ,editor = Slick.Editors.Text
                                                )
                               |]
                    let createNew (item:obj) (id:int) = box id, box { code = ""; name = ""; value = ""}
                    let parameters = initModel.client.parameters |> Array.map box
                    let res = SlickGrid.SimpleGrid cols parameters createNew (Some processParamGridMessages) container
                    ()
            )

        let view (model: Model) processMessages =
            setGlobalProcessor_ (Some processMessages)
            GenForm.view 
                            [ "x"   , "btn-xs btn-default  pull-right", execOrderX_ 
                              "Save", "btn    btn-default  pull-right", saveData_   model
                            ]
                    [ Dialog.view "title" [] [] <| model.dialog <| (fun msg -> msg |> ToDialogMsg |> processMessages)
                      Popup.view ["-", id] <| model.popup <| (fun msg -> msg |> ToPopupMsg |> processMessages)
                      Div [ Class "flex flexgrow"
                            textNotEmpty      "Name"      model.client.name                            (NameChange     >> processMessages) [ Placeholder "enter name"     ; MaxLength 150 ] model.form.validations (ToFormMsg >> processMessages)
                            textWoValidator   "Industry" (model.client.industry |> Option.defaultV "") (IndustryChange >> processMessages) [ Placeholder "enter industry" ; MaxLength 200 ] 
                          ]
                      Div [ Class "flex flexgrow flex1" ; ReactObj reportGridClass ]
                      Div [ Class "flex flexgrow flex1" ; ReactObj paramGridClass  ]
                      Div [ Class "flex flexgrow flex1" ; ReactObj serverGridClass ]
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
                let! token  = Server.fetchTokenAR_()
                let! client = ClientFormServer.getClientRecordsAR_ token
                init title client
                |> runApp_ token container.Dom
            }
        )
