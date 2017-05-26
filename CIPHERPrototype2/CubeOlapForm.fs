namespace CIPHERPrototype1

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open Model
open Model2
open Rop

(*[<JavaScript>]
module CubeOlapForm2 =
    open SlickGrid

    type private ThisFormsState = {
        title              : string
        processing         : bool
        message            : string
        debug              : bool
        dimensions         : DimOlap []
        defaults           : ElemOlap[]
        selectedFile       : string
    }

    type private SuperState = {
        formState          : ThisFormsState
        cubeGridProcessorO : (SimpleGridInMessage -> unit) option
        itemsCallback      : (Result<obj[]   >    -> unit) option
        columnsCallback    : (Result<Column[]>    -> unit) option
    }

    type private Message =
        | ShowInfo           of string * bool
        | FromCubeGrid       of SimpleGridOutMessage
        | ToCubeGrid         of SimpleGridInMessage
        | Dimensions         of DimOlap  []
        | Defaults           of ElemOlap []
        | WhenReceiveItems   of (Result<obj   []> -> unit)
        | WhenReceiveColumns of (Result<Column[]> -> unit)
        | ToggleDebug

    let private createForm_ cube title (container: Element) token isGuestUser = 
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
            | ToCubeGrid   msg -> superState.cubeGridProcessorO  |> Option.iter(fun f -> msg |> f); superState
            | FromCubeGrid msg -> match msg with                                  
                                  | SimpleGridOutMessage.ShowInfo        (a,b)  -> Message.ShowInfo(a,b) |> updateState superState
                                  | SimpleGridOutMessage.MessageProcessor f     -> {superState with cubeGridProcessorO  = Some f}
                                  | Items                                 data  -> superState.itemsCallback     |> Option.iter (fun f -> f (Rop.succeed data          )) ; {superState with itemsCallback   = None }
                                  | Columns                               cols  -> superState.columnsCallback   |> Option.iter (fun f -> f (Rop.succeed cols          )) ; {superState with columnsCallback = None }
            | WhenReceiveItems       callback                                   -> {superState with itemsCallback     = Some callback }
            | WhenReceiveColumns     callback                                   -> {superState with columnsCallback   = Some callback }
            | Dimensions             dims                                       -> setState {state with dimensions  = dims            }
            | Defaults               elems                                      -> setState {state with defaults    = elems           }
            | ToggleDebug                                                       -> setState {state with debug       = not state.debug }  

        let globalSetState = "not allowed to use globalSetState from here onwards"

        let initial     = { 
            ThisFormsState.title = title
            processing           = true
            message              = "Initializing..."
            debug                = false
            dimensions           = [||]
            defaults             = [||]
            selectedFile         = ""
        }
        let superInitial = {
            formState            = initial
            cubeGridProcessorO   = None
            itemsCallback        = None
            columnsCallback      = None
        }
        let processMessages = 
            let processor = processorAgent superInitial updateState
            fun message -> processor.Post message

        let showProcessing txt = (txt, true ) |> Message.ShowInfo |> processMessages
        let showCompleted  txt = (txt, false) |> Message.ShowInfo |> processMessages

        let cubeGridGetDataAR_ () =            
            Async.FromContinuations (fun (callback, ecnt, cancel) ->
               callback |> Message.WhenReceiveItems        |> processMessages
               SimpleGridInMessage.SendItems |> ToCubeGrid |> processMessages
            )

        let cubeGridGetColumnsAR_ () =            
            Async.FromContinuations (fun (callback, ecnt, cancel) ->
               callback |> Message.WhenReceiveColumns        |> processMessages
               SimpleGridInMessage.SendColumns |> ToCubeGrid |> processMessages
            )


        let toggleDebug_       () = ToggleDebug                                 |> processMessages
        let cubeGridClear_     () = SimpleGridInMessage.Clear    |> ToCubeGrid  |> processMessages

        let defaultsRow (defaults: ElemOlap[]) =
            defaults |> Array.map(fun elem -> elem.name) |> Array.append <| [| "" |]

        let readFile_ (state: ThisFormsState) = 
            Server.call {
                let! columns = cubeGridGetColumnsAR_()
                let  cols    = columns |> Array.mapi(fun i col -> i, col.field |> unbox<int>) |> Array.sortBy(fun (_, field) -> field)
                let  files   = JS.Document.GetElementById("filesel")?files |> unbox<obj[]>
                if files.Length > 0 then
                    let  file    = files.[0]
                    let  reader  = new FileReader()
                    reader.onload(fun e ->
                        (e?target?result  |> unbox<string>).Split("\r\n".ToCharArray())
                        |> Array.map(fun line ->
                            let row = line.Split("\t".ToCharArray(), System.StringSplitOptions.None)
                            cols |> Array.map(fun (i, _) -> if i >= row.Length then "" else row.[i])
                            |> box
                        )
                        |> Array.append [| defaultsRow state.defaults |> box |]
                        |> SimpleGridInMessage.SetItems |> ToCubeGrid |> processMessages
                    )
                    reader.readAsText file
            }

        let cubeUploadData_ (state: ThisFormsState) =
            Server.call {
                showProcessing "Importing data ..."
                let! data  = cubeGridGetDataAR_()
                let  data2 = data
                             |> Array.map(fun row ->
                                 row |> unbox<string[]> 
                                 |> fun row -> row.[state.dimensions.Length], state.dimensions 
                                                                              |> Array.mapi(fun i _ -> row.[i])
                             )
                let! result = Server.UploadCubeDataAR_ token cube data2
                showCompleted result
            }

//         createNew=function(item)
//         {
//          return function(id)
//          {
//           var value;
//           item.id=id;
//           value=(!item?true:Arrays.length(item)<Arrays.length(cols)+1)?Arrays.create(Arrays.length(cols)+1,""):item;
//           return[id,value];
//          };
//         };
//         return _builder_.Bind1(SlickGrid.SimpleGrid(cols,[defaultsRow(vals)],createNew,{
//          $:1,
//          $0:processRelGridMessages
//         },container1),function()
//         {
//          showCompleted("");
//          return _builder_.Zero();
//         });
//        });
//       });
//      };
//     });

        let processCubeGridMessages  (msg: SimpleGridOutMessage ) = msg |> FromCubeGrid  |> processMessages
        let cubeGridClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                Server.call {
                    showProcessing "loading..."
                    let! dims, vals = Server.FetchCubeOlapDimsAR_ token cube
                    dims |> Dimensions |> processMessages
                    vals |> Defaults   |> processMessages
                    let cols        = dims 
                                      |> Array.mapi(fun i dim ->
                                                Column(
                                                     id     = dim.dimOlapId
                                                    ,name   = dim.name
                                                    ,field  = i
                                                    ,editor = Slick.Editors.Text
                                                )
                                      )
                                      |> Array.append <| [|  
                                                Column(
                                                     id     = "#"
                                                    ,name   = "Value"
                                                    ,field  = dims.Length
                                                    ,editor = Slick.Editors.Text
                                                )
                                      |]
                    let createNew (item:obj) (id:int) = box id, if isUndefined item || item |> unbox<obj[]> |> Array.length < cols.Length + 1 
                                                                then Array.create (cols.Length + 1) "" |> box
                                                                else item 
                    let! res = SlickGrid.SimpleGrid cols [| defaultsRow vals |] createNew (Some processCubeGridMessages) container
                    showCompleted ""
                }
            )

        let renderForm (state: ThisFormsState) (setState: ThisFormsState -> unit) =
            setGlobalSetState setState
            let disabled = state.processing || isGuestUser
            let setState = "not allowed to use setState from here onwards"
            R.E                   ("div"          , Attrs (className= "panel panel-info flex flexgrow" )
                , R.E             ("div"          , Attrs (className= "panel-heading heading"          )
                    , R.E         ("label"        , Attrs (className= "panel-title text-center"        )
                        , R.t state.title
                    )
                    , ClientForm.validationMsg state.message
                    , R.E         ("div"          , Attrs (className= "btn-toolbar pull-right" )
                        , R.E     ("button"       , Attrs (className= "btn-xs btn-default  pull-right", disabled = disabled, onClick = toggleDebug_ ), R.t ".")
                        , R.E     ("button"       , Attrs (className= "btn btn-default  pull-right"   , disabled = disabled, onClick = (fun _ -> cubeUploadData_ state)), R.t "Upload data")
                        , R.E     ("div"          , Attrs (className= "btn-group pull-right" )
                            , R.E ("button"       , Attrs (className= "btn btn-default"               , disabled = disabled, onClick = cubeGridClear_), R.t "remove all")
                        )
                        , R.E     ("input"        , Attrs (className= "file" , ``type`` = "file" , id = "filesel", disabled = disabled, onChange = (fun _ -> readFile_ state)))
                        , R.E     ("button"       , Attrs (className= "btn"  ,                                     disabled = disabled, onClick  = (fun _ -> readFile_ state)), R.t "reload file")
                    )             
                )                 
                , R.E             ("div"          , Attrs (className = "flex-row flexgrow")
                    , R.E         (cubeGridClass )
                )
            )

        ClientForm.reactRoot2 initial container.Dom renderForm

    let cubeOlapForm_ (cube: CubeOlap) title isGuestUser =
        Browser.withContainerDo "container flex flexgrow" (fun container ->
            Server.call { 
                let! token = Server.fetchTokenAR_()
                createForm_ cube title container token isGuestUser
            }
        )
        *)

[<JavaScript>]
module CubeOlapForm =
    open SlickGrid

    type Model = {
        form               : GenForm.Model
        dialog             : Dialog.Model
        popup              : Popup.Model
        dimensions         : DimOlap []
        defaults           : ElemOlap[]
        isGuestUser        : bool
        cubeGridProcessorO : (SimpleGridInMessage -> unit) option
        itemsCallback      : (Result<obj[]   >    -> unit) option
        columnsCallback    : (Result<Column[]>    -> unit) option
    }

    let init title isGuestUser = {
        form               = GenForm.init title
        dialog             = Dialog.init
        popup              = Popup.init
        dimensions         = [||]
        defaults           = [||]
        isGuestUser        = isGuestUser
        cubeGridProcessorO = None
        itemsCallback      = None
        columnsCallback    = None
    }

    type Message =
        | ToFormMsg          of GenForm.Message
        | ToDialogMsg        of Dialog.Message
        | ToPopupMsg         of Popup.Message
        | FromCubeGrid       of SimpleGridOutMessage
        | ToCubeGrid         of SimpleGridInMessage
        | Dimensions         of DimOlap  []
        | Defaults           of ElemOlap []
        | WhenReceiveItems   of (Result<obj   []> -> unit)
        | WhenReceiveColumns of (Result<Column[]> -> unit)

    let rec update message model =
        if model.form.debug then printfn "%A" message
        match message with
        | ToFormMsg     msg  -> {model with form         = GenForm.update msg model.form  }
        | ToPopupMsg    msg  -> {model with popup        = Popup.update   msg model.popup }
        | ToDialogMsg   msg  -> {model with dialog       = Dialog.update  msg model.dialog}
        | ToCubeGrid    msg  -> model.cubeGridProcessorO  |> Option.iter(fun f -> msg |> f); model
        | FromCubeGrid  msg  -> match msg with                                  
                                | SimpleGridOutMessage.ShowInfo        (a,b) -> GenForm.ShowInfo(a,b) |> ToFormMsg |> update <| model
                                | Items                                 data -> model.itemsCallback   |> Option.iter (fun f -> f (Rop.succeed data )) ; {model with itemsCallback   = None }
                                | Columns                               cols -> model.columnsCallback |> Option.iter (fun f -> f (Rop.succeed cols )) ; {model with columnsCallback = None }
                                | SimpleGridOutMessage.MessageProcessor f    -> {model with cubeGridProcessorO = Some f        }
        | WhenReceiveItems       callback                                    -> {model with itemsCallback      = Some callback }
        | WhenReceiveColumns     callback                                    -> {model with columnsCallback    = Some callback }
        | Dimensions             dims                                        -> {model with dimensions         = dims          }
        | Defaults               elems                                       -> {model with defaults           = elems         }

    open ReactHtml

    let runApp_ (token: Auth.Token) (cube: CubeOlap) container initModel =
        let mutable globalProcessor: (Message -> unit) option = None
        let setGlobalProcessor_ processMsg = match globalProcessor with | None -> globalProcessor <- processMsg | _    -> ()
        let processMessages msg = globalProcessor |> Option.map (fun f -> f msg) |> ignore

        let showProcessing txt = (txt, true ) |> GenForm.Message.ShowInfo |> ToFormMsg |> processMessages
        let showCompleted  txt = (txt, false) |> GenForm.Message.ShowInfo |> ToFormMsg |> processMessages

        let cubeGridClear_     () = SimpleGridInMessage.Clear    |> ToCubeGrid  |> processMessages

        let defaultsRow (defaults: ElemOlap[]) =
            defaults |> Array.map(fun elem -> elem.name) |> Array.append <| [| "" |]

        let cubeGridGetDataAR_ () =            
            Async.FromContinuations (fun (callback, ecnt, cancel) ->
               callback |> Message.WhenReceiveItems        |> processMessages
               SimpleGridInMessage.SendItems |> ToCubeGrid |> processMessages
            )

        let cubeGridGetColumnsAR_ () =            
            Async.FromContinuations (fun (callback, ecnt, cancel) ->
               callback |> Message.WhenReceiveColumns        |> processMessages
               SimpleGridInMessage.SendColumns |> ToCubeGrid |> processMessages
            )

        let defaultsRow (defaults: ElemOlap[]) =
            defaults |> Array.map(fun elem -> elem.name) |> Array.append <| [| "" |]

        let readFile_ (model: Model) () = 
            Server.call {
                let! columns = cubeGridGetColumnsAR_()
                let  cols    = columns |> Array.mapi(fun i col -> i, col.field |> unbox<int>) |> Array.sortBy(fun (_, field) -> field)
                let  files   = JS.Document.GetElementById("filesel")?files |> unbox<obj[]>
                if files.Length > 0 then
                    let  file    = files.[0]
                    let  reader  = new FileReader()
                    reader.onload(fun e ->
                        (e?target?result  |> unbox<string>).Split("\r\n".ToCharArray())
                        |> Array.map(fun line ->
                            let row = line.Split("\t".ToCharArray(), System.StringSplitOptions.None)
                            cols |> Array.map(fun (i, _) -> if i >= row.Length then "" else row.[i])
                            |> box
                        )
                        |> Array.append [| defaultsRow model.defaults |> box |]
                        |> SimpleGridInMessage.SetItems |> ToCubeGrid |> processMessages
                    )
                    reader.readAsText file
            }

        let cubeUploadData_ (model: Model) () =
            Server.call {
                showProcessing "Importing data ..."
                let! data  = cubeGridGetDataAR_()
                let  data2 = data
                             |> Array.map(fun row ->
                                 row |> unbox<string[]> 
                                 |> fun row -> row.[model.dimensions.Length], model.dimensions 
                                                                              |> Array.mapi(fun i _ -> row.[i])
                             )
                let! result = Server.UploadCubeDataAR_ token cube data2
                showCompleted result
            }

        let processCubeGridMessages  (msg: SimpleGridOutMessage ) = msg |> FromCubeGrid  |> processMessages
        let cubeGridClass =
            ClientForm.reactContainerClass "flex flexgrow" (fun this container ->
                Server.call {
                    showProcessing "loading..."
                    let! dims, vals = Server.FetchCubeOlapDimsAR_ token cube
                    dims |> Dimensions |> processMessages
                    vals |> Defaults   |> processMessages
                    let cols        = dims 
                                      |> Array.mapi(fun i dim ->
                                                Column(
                                                     id     = dim.dimOlapId
                                                    ,name   = dim.name
                                                    ,field  = i
                                                    ,editor = Slick.Editors.Text
                                                )
                                      )
                                      |> Array.append <| [|  
                                                Column(
                                                     id     = "#"
                                                    ,name   = "Value"
                                                    ,field  = dims.Length
                                                    ,editor = Slick.Editors.Text
                                                )
                                      |]
                    let createNew (item:obj) (id:int) = box id, if isUndefined item || item |> unbox<obj[]> |> Array.length < cols.Length + 1 
                                                                then Array.create (cols.Length + 1) "" |> box
                                                                else item 
                    let! res = SlickGrid.SimpleGrid cols [| defaultsRow vals |] createNew (Some processCubeGridMessages) container
                    showCompleted ""
                }
            )

        let test_ () =
                Server.call {
                    Console.Log "loading..."
                    let! dims, vals = Server.FetchCubeOlapDimsAR_ token cube
                    dims |> Array.iter (fun d -> 
                        Console.Log (sprintf "Dim: %s" d.name)
                        Server.call {
                            let! elements = Server.FetchElemOlapAR_ token d
                            elements |> Array.iter (fun (e, children) ->
                                Console.Log (sprintf "==> Dim: %s, Id: %s, Elem: %s" d.name e.elemOlapId e.name)
                                children |> Array.iter (fun child ->
                                    Console.Log (sprintf "==>==> Child: %s" child.name)
                                )
                            )
                        }
                        ) 
                }
             
        let view (model: Model) processMessages =
            setGlobalProcessor_ (Some processMessages)
            let disabled = model.form.processing || model.isGuestUser
            GenForm.view 
                            [ "Upload data"      , "btn btn-default"      , if disabled then id else cubeUploadData_ model
                              "remove all"       , "btn btn-default"      , if disabled then id else cubeGridClear_
                              "read file"        , "btn btn-default"      , if disabled then id else readFile_       model
                              "Test!"            , "btn btn-info"         , test_
                            ]
                    [ Dialog.view "title" [] [] <| model.dialog <| (fun msg -> msg |> ToDialogMsg |> processMessages)
                      Popup.view ["-", id]      <| model.popup  <| (fun msg -> msg |> ToPopupMsg  |> processMessages)
                      Input [ Type "file" ; Id "filesel" ]
                      Div   [ Class "flex-row flexgrow" ; ReactObj cubeGridClass ]
                    ]
            <| model.form <| (fun msg -> msg |> ToFormMsg |> processMessages)
        
        App.app
            <| initModel
            <| update
            <| view 
        |> App.run container

    let cubeOlapForm_ (cube: CubeOlap) title isGuestUser =
        Browser.withContainerDo "flex flexgrow" (fun container ->
            Server.call { 
                let! token  = Server.fetchTokenAR_()
                init title isGuestUser
                |> runApp_ token cube container.Dom 
            }
        )
