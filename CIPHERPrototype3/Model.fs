namespace CIPHERSpace
open WebSharper
open System

[< JavaScript >]   
module Model=
                                                                                               
    type PossibleMessages =
        | WarnNotification               of string
        | ErrExceptionThrown             of System.Exception
        | ErrUndefinedKeys               of int * obj[]
        | ErrDuplicatedKeys              of int * obj[]
        | ErrParameterMissing            of parameter: string
        | ErrValueIsNull                 of field: string * source: string
        | ErrUserIsNotLoggedIn           
        | ErrLoginFailed                 of string
        | ErrInvalidToken                of string
        | ErrInvalidContentPageForClient of string
        | ErrReportDefinitionNotFound    of Report
        | ErrTableDefinitionNotFound     of Table
        | ErrDockerDefinitionNotFound    of Docker
        | ErrUniqueIdNotDefinedForReport of Report
        | ErrDockerDataNotFound          of Docker
        | ErrUserIsNotAssociatedToClient of User
        | ErrUserIsNotDefined            of string
        | ErrClientNotFound              of Client
        | ErrNoProvisionedClientAvailable
        | ErrObjectNotFound              of ObjectT
        | ErrDockerIsNotPresent          of Docker
        | ErrRecordWasNotUpdated         of string
        | ErrRecordNotFound              of string * string
        | ErrFeatureNotImplemented       of string
        | ErrFSharpCompiler              of string
        | ErrWebSharperCompiler          of string
        | ErrUnsuportedDataStorage
        | ErrNoRecordsProcessed
        | ErrAleaError                   of int * string
        | ErrGuestUserNotActivated 
        | ErrOptionIsNone
      
    and Result<'TSuccess> =             
        | Success of 'TSuccess * PossibleMessages list     
        | Failure of PossibleMessages list                 

    and  User       = User       of Guid                with member this.userCode      = match this with User      (userCode      ) -> userCode
    and  Client     = Client     of Guid                with member this.clientCode    = match this with Client    (clientCode    ) -> clientCode
    and  Language   = Language   of string              with member this.languageCode  = match this with Language  (languageCode  ) -> languageCode
    and  Report     = Report     of Guid                with member this.reportId      = match this with Report    (reportId      ) -> reportId
    and  Dimension  = Dimension  of Guid                with member this.dimensionId   = match this with Dimension (dimensionId   ) -> dimensionId
    and  Cube       = Cube       of Guid                with member this.cubeId        = match this with Cube      (cubeId        ) -> cubeId
    and  ServerOlap = ServerOlap of Guid                with member this.serverId      = match this with ServerOlap(serverId      ) -> serverId
    and  CubeOlap   = CubeOlap   of string * ServerOlap with member this.cubeOlapId    = match this with CubeOlap  (cubeId     , _) -> cubeId.ToUpper()
    and  DimOlap    = DimOlap    of string * ServerOlap with member this.dimOlapId     = match this with DimOlap   (dimensionId, _) -> dimensionId.ToUpper()
    and  ElemOlap   = ElemOlap   of string * DimOlap    with member this.elemOlapId    = match this with ElemOlap  (elemId     , _) -> elemId.ToLower().Replace(" ", "")
    and  Connection = Connection of Guid                with member this.ConnectionId  = match this with Connection(connectionId  ) -> connectionId
    and  Workspace  = Workspace  of Guid                with member this.getObject     = match this with Workspace (objectId      ) -> OWorkspace objectId
    and  ObjectT    =
        | OWorkspace of Guid
                                              with member this.objectId      = match this with OWorkspace(workspaceId  ) -> workspaceId
    and  Table      = 
        | DimensionTable    of Dimension 
        | SystemTable       of string    
        | ExternalTable     of string * string   

    and  Language with
        static member defaultL = Language "en"

    and  PasswordSettings =
        | PasswordV1 of int * int * int * int
        | PasswordV2 of int * int * int * int

    and  Password = {
        hash: string
        salt: string
        settings: PasswordSettings
    }

    and  Docker =
        | DckEmpty
        | DckSingle
        | DckGoldenLayout
        | DckWCDocker
        | DckPhosphor
        | DckDockSpawn

    let dockerFromText =
        function
            | "DckSingle"       -> DckSingle
            | "DckGoldenLayout" -> DckGoldenLayout
            | "DckWCDocker"     -> DckWCDocker
            | "DckPhosphor"     -> DckPhosphor
            | "DckDockSpawn"    -> DckDockSpawn
            | _                 -> DckEmpty


    type CubeOlap with         
        member this.name         = match this with CubeOlap(cubeName, _ ) -> cubeName

    type DimOlap with
        member this.name         = match this with DimOlap (dimName , _ ) -> dimName

    type ElemOlap with
        member this.name         = match this with ElemOlap(elemName, _ ) -> elemName

    type ElemOlapRel(elem:ElemOlap) =
        let mutable _children = List<ElemOlap>.Empty
        member this.Elem = elem
        member this.GetChildren = _children
        member this.AddChild (elem:ElemOlap) = 
            _children <- _children

        
    type User with
        member this.isGuest_ () = System.Guid("ef047959-15b4-43dc-b131-39646009a706") |> User = this

