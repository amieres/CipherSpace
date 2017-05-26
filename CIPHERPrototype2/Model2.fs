namespace CIPHERPrototype1
open WebSharper
open Model
open Rop
open System

module Model2 =

    type PanelBrowser =
        | PanelTable  of Table  * title: string
        | PanelReport of Report * title: string * url: string

    type Request =
        | NoRequest
        | LoadPanel     of PanelBrowser
        | LoadWorkspace of Workspace

    type DockerDefinition<'T> = 
        DockerData of Docker * title: string * (Request -> Quotations.Expr<'T>)

    type InputFormId = 
        | IFClient
        | IFUser
        | IFDimension of Dimension
    
    type ContentPage =
        | CPTestJM  
        | CPDocker    of Docker * Request
        | CPTable     of Table 
        | CPReport    of Report  
        | CPDimension of Dimension
        | CPCubeOlap  of CubeOlap
        | CPInclude   of string * string * string
        | CPInputForm of InputFormId
        | CPAbout   
        | CPSiteMap
        | CPFancyTreeTest
        | CPClientForm
        | CPUserForm
        | CPUploadForm
        | CPLogout
        | CPHomePage

    type NavigationMenu =
        NM of String

    type EndPoint =
        | [< WebSharper.Sitelets.EndPoint "/" >] 
          EPEntry
        | EPHome    
        | EPContent of NavigationMenu * ContentPage
        | EPLogout
//        | [<WebSharper.Sitelets.EndPoint "POST /EPFileUpload">] EPFileUpload
        | [<WebSharper.Sitelets.Wildcard                     >] EPFile       of string
        | [<WebSharper.Sitelets.Wildcard                     >] EPJavaScript of string        

    type EditorType =
        | Text
        | LongText
        | Date
        | Checkbox

    type Column [<Inline "{}">] () =
        [<DefaultValue>] val mutable id        : string
        [<DefaultValue>] val mutable field     : obj
        [<DefaultValue>] val mutable name      : string
        [<DefaultValue>] val mutable dataType  : string
        [<DefaultValue>] val mutable width     : int
        [<DefaultValue>] val mutable selectable: bool
        [<DefaultValue>] val mutable resizable : bool
        [<DefaultValue>] val mutable sortable  : bool
        [<DefaultValue>] val mutable focusable : bool
        [<DefaultValue>] val mutable cssClass  : string
        [<DefaultValue>] val mutable editor    : EditorType
        [<DefaultValue>] val mutable defaultV  : obj

    type QueryResult =  Result<obj[][] * Column[]>

    type TableDefinition =
        TableDefinition of Table * title: string * keys: int [] * rowsF: (unit -> QueryResult)

    type KeyValue = 
        System.IComparable
    type FieldValues = 
        obj[]
    type KeyValues = 
        System.IComparable[]
    type TableChange =
        | RecordDeleted of key : KeyValues
        | RecordChanged of key : KeyValues * values : FieldValues
        | RecordAdded   of                   values : FieldValues

    type MenuDirection = 
        | Across
        | Down
        | Popup

    type LinkRef =
        | MEndPoint of EndPoint      * title: string option
        | MLink     of link:  string * title: string
        | OnClickR  of title: string * click: string

    type MenuEntry =
        | LinkME    of LinkRef
        | SubMenu   of Menu

    and  Menu = {
        entries  : MenuEntry list
        direction: MenuDirection
        name     : string
        link     : LinkRef
    }

    let mEndPoint endpoint = MEndPoint (endpoint, None) |> LinkME

    type Key =
        | KUser               of User
        | KUserClients        of User
        | KUserReports        of User
        | KUserDimensions     of User
        | KUserDimensionName  of User * string
        | KUserTables         of User
        | KClient             of Client
        | KClientParameters   of Client
        | KReport             of Report
        | KTable              of Table
        | KDocker             of Docker
        | KObject             of ObjectT
        | KDimension          of Dimension
        | KDimensionElems     of Dimension
        | KDimensionElemElems of Dimension
        | KCubeOlapDims       of CubeOlap
        | KDimOlapInputs      of DimOlap
        | KServerOlap         of ServerOlap
        | KReplicationNode    of schema: string * table: string

    type DataCache() = 
        let mutable dict = Map.empty<Key, obj>
        let setR_ (key: Key) (vR: Result<'v>) =
            if dict.ContainsKey key then ()
            else
                dict <- dict.Add(key, vR :> obj)
        let getR_ (key: Key) (getter: unit -> Result<'v>) : Result<'v> =
            dict.TryFind key
            |> function
                | Some v -> unbox v
                | None   ->
                    let vR = getter ()
                    dict <- dict.Add(key, box vR)
                    vR

        member this.getR key getter = getR_ key getter
        member this.setR key vR     = setR_ key vR
        member this.reset           = dict <- Map.empty<Key, obj>

    type InputValidation =
        | VEmpty          
        | VNotLongerThan   of int
        | VCannotModify
        | VUnsupportedData of string
        | VPatternNotMatch of string * string

    type path = string list
    [< JavaScript >]
    type Validation =
        | InputValidation of InputValidation
        | PathValidation  of path * InputValidation
        member this.reducePath () =
            match this with 
                | InputValidation v        -> this
                | PathValidation ([], v)   -> InputValidation v
                | PathValidation ([h], v)  -> InputValidation v
                | PathValidation (h::r, v) -> PathValidation (r, v)
        member this.addPath (path) =
            match this with 
                | InputValidation v        -> PathValidation ([path] , v)
                | PathValidation (p, v)    -> PathValidation (path::p, v)
        member this.headPathIs (head)      = 
            match this with 
                | PathValidation (head'::_, _) when head = head' -> true 
                | _ -> false

    type InputValidations = Set<InputValidation>
    type Validations      = Set<Validation>

    type ColumnDefinition = {
        ColumnName   : string
        Caption      : string option
        MaxLength    : int
        AllowDBNull  : bool
        DataTypeName : string
        Sensitive    : bool
    }

    [< JavaScript >]
    type DataValue = 
        | DText        of string
        | DInt         of int
        | DFloat       of float
        | DNull
        | DUnsupported 
//        | Money  of string

    type DataStorage =
        | SingleValue  of DataValue
        | SingleRow    of DataValue array
        | MultipleRows of DataValue array array

    [< JavaScript >]
    type FieldDefinition = {
        fieldName    : string
        getter       : DataStorage -> DataValue
        setter       : DataValue -> DataStorage -> DataStorage option
        labelO       : string option
        placeholderO : string option
        typeF        : string
        maxLen       : int
        hidden       : bool
        canBeNull    : bool
        canBeEmpty   : bool
        isReadOnly   : bool
        trimText     : bool
        blankspaces  : bool
        validation   : (DataValue -> InputValidations) option
        preButton    : string
        postButton   : string
        inputType    : string
    } with
        member this.label       = this.labelO       |> Option.defaultV (this.fieldName.Replace("_", " ") |> fun s -> s.[0..0].ToUpper() + s.[1..])
        member this.placeholder = this.placeholderO |> Option.defaultV ("Enter " + this.label)
        member this.validations      (value: DataValue) =
            match this.validation with
                | None   -> this.basicValidations value
                | Some f -> f value
        member private this.validateString(s:string) =
            let s = if this.trimText then s.Trim() else s
            [
                if  this.maxLen > 0      && s.Length > this.maxLen then yield VNotLongerThan this.maxLen
                if (not this.canBeEmpty) && s        = ""          then yield VEmpty
            ]
        member this.basicValidations (value: DataValue) = 
            match value with
                | DText s          -> this.validateString s
                | DNull            -> this.validateString ""
                | DUnsupported     -> [ VUnsupportedData "" ]
                | _ -> []
            |> Set

    [< JavaScript >]
    let defField getter = {
        fieldName    = ""
        getter       = getter
        setter       = (fun _ _ -> None)
        labelO       = None
        placeholderO = None
        typeF        = "string" 
        maxLen       = 0
        hidden       = false
        canBeEmpty   = true
        canBeNull    = true
        isReadOnly   = false
        trimText     = true
        blankspaces  = true
        validation   = None
        preButton    = ""
        postButton   = ""
        inputType    = "text"    
    }

    type DataModel = {
        data        : DataStorage
        validations : Validations
    }

    type FormType =
        | SingleRecordForm
        | MutipleRecordsForm

    type FormDefinition = {
        formId      : InputFormId
        formType    : FormType
        title       : string
        elements    : ElementDefinition list
        validationF : unit -> Validations
    }
    and ElementDefinition  = 
        | FormDef  of FormDefinition
//        | FieldDef of FieldDefinition<_,_>

    [< Inline """(!$v)""">]
    let isUndefined v = true   
        
    [< Inline """($o[$p])""">]
    let prop p o            = null
//    let getJVSProp obj prop = null
        
    [< Inline """($obj[$prop] = $v)""">]
    let setJVSProp obj prop v = ()

    [< JavaScript >]
    let callF f p1 p2 = f |> WebSharper.JavaScript.FuncWithArgs<(obj * obj), _> |> (fun f -> f.Call(p1, p2))
        
    [<JavaScript>]
    let processorAgent initial updateState = MailboxProcessor.Start ( fun inbox ->
        let rec loop state : Async<unit> =
            async {
                let! message  = inbox.Receive()
                let newStateR = Rop.callTry (fun () -> updateState state message) ()
                newStateR |> Rop.notifyMessages
                return! newStateR |> Rop.ifError state |> loop
            }
        loop initial
    )

    [<JavaScript>]
    let inline strToKey (s:string) = s.ToLower().Replace(" ", "")

    [<JavaScript>]
    let left n (s:string) = if s.Length <= n then s else s.[0..n-1]

    [<JavaScript>]
    let sortOrder (order: string option) (alt:string) = match order with | Some(v) when v.Trim() <> "" -> v.Trim() | _ -> alt

    [< Inline "$n.toLocaleString()" >]
    let toLocaleString n = ""

