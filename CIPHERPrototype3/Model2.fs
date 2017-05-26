namespace CIPHERSpace
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
//        | CPTestJM  
//        | CPDocker    of Docker * Request
//        | CPTable     of Table 
//        | CPReport    of Report  
//        | CPDimension of Dimension
//        | CPCubeOlap  of CubeOlap
//        | CPInputForm of InputFormId
//        | CPAbout   
//        | CPSiteMap
//        | CPFancyTreeTest
//        | CPClientForm
//        | CPUserForm
        | CPInclude   of string * string * string
        | CPNode      of string * string
        | CPEntry of string
        | CPLogout
        | CPHomePage
        | CPUploadForm

    type EndPoint =
        | [< WebSharper.Sitelets.EndPoint "/" >] 
          EPEntry
        | EPHome    
        | EPContent of ContentPage
        | EPLogout
        | [<WebSharper.Sitelets.Wildcard                     >] EPFile       of string
        | [<WebSharper.Sitelets.Wildcard                     >] EPJavaScript of string        


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


    [< Inline """(!$v)""">]
    let isUndefined v = true   
        
    [< Inline """($o[$p])""">]
    let prop p o            = null
//    let getJVSProp obj prop = null
        
    [< Inline """($obj[$prop] = $v)""">]
    let setJVSProp obj prop v = ()

    [< JavaScript >]
    let callF f p1 p2 = f |> WebSharper.JavaScript.FuncWithArgs<(obj * obj), _> |> fun f -> f.Call(p1, p2)
        
    [< Inline "$f.call($this, $p1)" >]
    let call f this p1 = ()
        
    [<JavaScript>]
    let inline strToKey (s:string) = s.ToLower().Replace(" ", "")

    [<JavaScript>]
    let left n (s:string) = if s.Length <= n then s else s.[0..n-1]

    [<JavaScript>]
    let sortOrder (order: string option) (alt:string) = match order with | Some(v) when v.Trim() <> "" -> v.Trim() | _ -> alt

    [< Inline "$n.toLocaleString()" >]
    let toLocaleString n = ""
    [< Inline "console.log($s)" >] 
    let consoleLog s = ()

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

    type QueryResult =  Result<obj[][] * Column[]>

    type TableDefinition =
        TableDefinition of Table * title: string * keys: int [] * rowsF: (unit -> QueryResult)

    type KeyValue = System.IComparable

    open System.Text.RegularExpressions

    let (|InterpretedMatch|_|) pattern input =
        if input = null then None
        else
            let m = Regex.Match(input, pattern)
            if m.Success then Some [for x in m.Groups -> x]
            else None
    
    ///Match the pattern using a cached compiled Regex
    let (|CompiledMatch|_|) pattern input =
        if input = null then None
        else
            let m = Regex.Match(input, pattern, RegexOptions.IgnorePatternWhitespace + RegexOptions.Compiled)
            if m.Success then Some [for x in m.Groups -> x]
            else None