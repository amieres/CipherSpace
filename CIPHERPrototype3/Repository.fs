namespace CIPHERSpace

module Repository =
    open Model
    open Model2
    open FSharp.Data
    open FSharp.Data.SqlClient
    open Rop

    type Settings = FSharp.Configuration.AppSettings<"web.config">

    let actualCS = Settings.ConnectionStrings.CipherSpaceDb

    [<Literal>]
    let designCS = """Data Source=192.168.195.26;Initial Catalog=CIPHERSpaceDB;User ID=CIPHERSpaceUser;Password=cipher"""

    [<Literal>]
    let private QueryParameters = 
        "SELECT l.label_description, parameter_code 
             FROM CS.Parameter p 
        LEFT JOIN CS.Label     l on l.label_code = p.label_code"
    type EnumParameter = SqlEnumProvider<QueryParameters, designCS>

    [<Literal>]
    let private QueryConnections = 
        "SELECT l.label_description, parameter_value
           FROM CS.Client_Parameter c
      LEFT JOIN CS.Parameter        p on p.parameter_code = c.parameter_code
      LEFT JOIN CS.Label            l on l.label_code     = p.label_code
          WHERE c.parameter_code in ('" + EnumParameter.``Designer Connection String`` + "')
            AND c.client_code = CAST('e858264a-cef5-47ef-a838-711d5012590a' as UNIQUEIDENTIFIER)
        "
    type private EnumdesignCSs = SqlEnumProvider<QueryConnections, designCS>

    [<Literal>]
    let private QueryParameterType = 
        """SELECT l.label_description, t.parameter_type 
             FROM CS.Parameter_Type t 
        LEFT JOIN CS.Label          l on l.label_code = t.label_code"""
    type private EnumParameterType = SqlEnumProvider<QueryParameterType, designCS>

    [<Literal>]
    let private QueryLanguage = 
        "SELECT language_description, language_code
             FROM CS.Language"
    type private EnumLanguage = SqlEnumProvider<QueryLanguage, designCS>

    [<Literal>]
    let private QueryClientParameters = 
        "SELECT l.label_description, parameter_code 
             FROM CS.Parameter p 
        LEFT JOIN CS.Label     l on l.label_code = p.label_code
            WHERE p.parameter_type = '" + EnumParameterType.``Client Parameter`` + "'"
    type EnumClientParameter = SqlEnumProvider<QueryClientParameters, designCS>

    let jsonStrToPassword pwd =
        Rop.flow {
            do!  Rop.tryProtection()
            let  jsonVal      = WebSharper.Core.Json.Parse pwd
            let  jsonProvider = WebSharper.Core.Json.Provider.Create()
            let  decoder      = jsonProvider.GetDecoder<Password>()
            return              decoder.Decode jsonVal
        }        

    type private SqlUserCode = SqlCommandProvider<"SELECT user_code FROM CS.[User] WHERE user_email = @userEMail", designCS, SingleRow = true>
    let getUserFromEMail email =
        Rop.flow {
            do!  Rop.tryProtection()
            use  cmd      = new SqlUserCode(actualCS)
            let  record   = cmd.Execute(email)
            let! userCode = record |> Rop.fromOption (ErrUserIsNotDefined (email))
            return          User userCode
        }
        

    type private SqlUser = SqlCommandProvider<"SELECT * FROM CS.[User] WHERE user_code = @userCode", designCS, SingleRow = true>
    let  private getSqlUserRecordR (user: User) =
        Rop.flow {
            do!  Rop.tryProtection()
            use  cmd     = new SqlUser(actualCS)
            let  record  = cmd.Execute(user.userCode)
            return!        record |> Rop.fromOption (ErrUserIsNotDefined (user.userCode.ToString()))
        }

    let passPhrase = "getSqlUserRecordR"

    type User with
        member private this.userRecordR_     (dc:DataCache) = dc.getR (KUser this) (function () -> getSqlUserRecordR this)
        member         this.passwordRO_       dc        = this.userRecordR_ dc |> Rop.mapR(fun record -> record.user_password)
        member         this.emailR_           dc        = this.userRecordR_ dc |> Rop.mapR(fun record -> record.user_email)
        member         this.nameRO_           dc        = this.userRecordR_ dc |> Rop.mapR(fun record -> record.user_name )
        member         this.languageRO_       dc        = this.userRecordR_ dc |> Rop.mapR(fun record -> record.language_code |> Option.map Language)
        member         this.nameO_            dc        = this.nameRO_      dc |> Rop.ifError  None
        member         this.name_             dc        = this.nameO_       dc |> Option.defaultV "----"
        member         this.language_         dc        = this.languageRO_  dc |> Rop.ifError  None |> Option.defaultV Language.defaultL
        member         this.errorUser_        dc        = this.userRecordR_ dc |> function | Success _ -> None | Failure m -> Some m
        member         this.themeTagsR_       dc        = this.userRecordR_ dc |> Rop.mapR(fun record -> record.theme_tags |> Option.defaultV "")

    let passwordToJsonStr pwd =
        Rop.flow {
            do!  Rop.tryProtection()
            let jsonProvider = WebSharper.Core.Json.Provider.Create()
            let encoder      = jsonProvider.GetEncoder<Password>()
            let jsonVal      = jsonProvider.Pack (encoder.Encode pwd)
            return             WebSharper.Core.Json.Stringify jsonVal
        }

    type private SqlSetPassword = SqlCommandProvider<"
        DECLARE @pwd     varchar(max)
        DECLARE @phrase  nvarchar(max)
        DECLARE @authen  nvarchar(max)
        SET @pwd    = @password
        SET @phrase = @passPhrase
        UPDATE CS.[User] 
        SET user_password = EncryptByPassPhrase(@phrase, @pwd, 1, CONVERT(VARCHAR(MAX), user_code))
        WHERE user_code = @userCode", designCS, SingleRow = true>
    let  private setSqlPassword (user: User) pwd =
        Rop.flow {
            do!  Rop.tryProtection()
            use  cmd     = new SqlSetPassword(actualCS)
            let  pwd     = Auth.getPwdHash pwd
            let! pwdJson = passwordToJsonStr pwd
            let  record  = cmd.Execute(pwdJson, passPhrase, user.userCode)
            do!  record = 1 |> Rop.assertR <| ErrRecordWasNotUpdated "setSqlUserPassword"
        }

    type User with
        member         this.setPasswordR dc pwd = setSqlPassword this pwd

    type private SqlCheckPassword = SqlCommandProvider<"
        DECLARE @phrase  nvarchar(max)
        DECLARE @authen  nvarchar(max)
        SET @phrase = @passPhrase
        SELECT password = CONVERT(VARCHAR(max), DecryptByPassPhrase(@phrase, user_password, 1, CONVERT(VARCHAR(MAX), user_code)))
        FROM CS.[User] 
        WHERE user_code = @userCode", designCS, SingleRow = true>
    let  private sqlCheckPassword (user: User) pwd =
        Rop.flow {
            do!  Rop.tryProtection()
            let  pwdRO     = user.passwordRO_ (DataCache())
            if pwdRO = Success(None, []) then
                return true, false
            else
                use  cmd      = new SqlCheckPassword(actualCS)
                let  result   = cmd.Execute(passPhrase, user.userCode)
                let  jsonPwd  = result |> Option.defaultV None
                let! password = match jsonPwd with 
                                    | None       -> Rop.succeed (Auth.getPwdHash "impossibleToMatch")
                                    | Some jsonP -> jsonStrToPassword jsonP
                return Auth.checkPwd password pwd, Auth.checkSettings password
        }

    type User with
        member         this.checkPasswordR  pwd   = sqlCheckPassword this pwd

    type private SqlUserClients = SqlCommandProvider<"SELECT *, today = GETDATE()  FROM CS.Client_User WHERE user_code = @userCode ORDER BY current_client desc", designCS>
    let  private getSqlUserClientsR (user: User) =
        Rop.flow {
            do!  Rop.tryProtection()
            use  cmd     = new SqlUserClients(actualCS)
            let  records = cmd.Execute(user.userCode)
            return         records |> Seq.toArray
        }

    type User with
        member private this.userClientsRecordR(dc:DataCache) = dc.getR (KUserClients this) (function () -> getSqlUserClientsR this)
        member         this.clients_ (dc)         = this.userClientsRecordR dc 
                                                   |> Rop.ifError [||] 
                                                   |> Array.choose (fun record ->
                                                        if record.today < (record.effective_date  |> Option.defaultV record.today) ||
                                                           record.today > (record.expiration_date |> Option.defaultV record.today) 
                                                        then None
                                                        else Some (Client record.client_code))
        member         this.currentClientR_ (dc) = this.clients_ dc
                                                   |> fun clients ->
                                                         if clients.Length > 0 
                                                         then Rop.succeed clients.[0] 
                                                         else Rop.fail (ErrUserIsNotAssociatedToClient this)

    type private SqlClientParameters = SqlCommandProvider<"SELECT parameter_code, parameter_value FROM CS.Client_Parameter WHERE Client_Code = @ClientCode", designCS>
    let private getClientParametersR (client: Client) = 
        Rop.flow {
            do! Rop.tryProtection()
            use  cmd  = new SqlClientParameters(actualCS)
            let records = cmd.Execute(client.clientCode)
            return records |> Seq.toArray
        }

    type Client with
        member private this.parametersR_ (dc:DataCache) = dc.getR (Key.KClientParameters this) (fun () -> getClientParametersR this)
        member         this.parameterR_   dc parm       = Rop.flow { 
                                                             let! parameters = this.parametersR_ dc
                                                             let  parameterO = parameters |> Array.tryFind (fun record -> record.parameter_code = parm)
                                                             let! parameter  = parameterO |> Rop.fromOption (ErrParameterMissing parm)
                                                             let! value      = parameter.parameter_value |> Rop.fromOption (ErrValueIsNull ("parameter_value", parm))
                                                             return value
                                                          }
        member         this.designerConnStrR_ dc        = this.parameterR_ dc EnumClientParameter.``Designer Connection String``

    type private SqlReportDefinitions = SqlCommandProvider<"Select * from FIN.Report_Definition WHERE client_code = @ClientCode", designCS>
    let private getReportDefinitionsR (user: User) dc = 
        Rop.flow {
            do! Rop.tryProtection()
            let! client  = user.currentClientR_ dc
            use  cmd     = new SqlReportDefinitions(actualCS)
            let  records = cmd.Execute(client.clientCode)
            return  records
                    |> Seq.toArray
        }

    type User with
        member private this.reportDefinitionsR_ (dc:DataCache) = dc.getR (KUserReports this) (fun () -> getReportDefinitionsR this dc)
        member         this.reportsR_   dc = this.reportDefinitionsR_ dc 
                                             |> Rop.mapR(
                                                 Array.map (
                                                     fun record -> 
                                                         let report = Report record.report_id
                                                         dc.setR (KReport report) (Rop.succeed record)
                                                         report
                                                 ))

    type private SqlDimensionDefinitions = SqlCommandProvider<"Select * from dbo.Dimension WHERE client_code = @ClientCode", designCS, ResultType.DataTable>
    let private getDimensionDefinitionsR (user: User) dc = 
        Rop.flow {
            do! Rop.tryProtection()
            let! client  = user.currentClientR_ dc
            use  cmd     = new SqlDimensionDefinitions(actualCS)
            let  records = cmd.Execute(client.clientCode)
            return  records.Rows
                    |> Seq.toArray
        }

    type User with
        member private this.dimensionDefinitionsR_ (dc:DataCache) = dc.getR (KUserDimensions this) (fun () -> getDimensionDefinitionsR this dc)
        member         this.dimensionsR_   dc = this.dimensionDefinitionsR_ dc 
                                                |> Rop.mapR(
                                                    Array.map (
                                                        fun record -> 
                                                            let dimension = Dimension record.dimension_code
                                                            dc.setR (KDimension dimension) (Rop.succeed record)
                                                            dimension
                                                ))
        member         this.dimsDataR_     dc = this.dimensionDefinitionsR_ dc 
                                                |> Rop.mapR(
                                                    Array.map (
                                                        fun record -> 
                                                            let dimension = Dimension record.dimension_code
                                                            dc.setR (KDimension dimension) (Rop.succeed record)
                                                            (dimension, record.client_code, record.dimension_name, record.dimension_description)
                                                ))

    type private SqlReportDefinition = SqlCommandProvider<"Select * from FIN.Report_Definition WHERE report_id = @ReportId", designCS, SingleRow = true>
    let private getReportDefinitionR (report:Report) = 
        Rop.flow {
            do! Rop.tryProtection()
            use  cmd     = new SqlReportDefinition(actualCS)
            let  record  = cmd.Execute(report.reportId)
            let! record  = record |> Rop.fromOption (ErrReportDefinitionNotFound report)
            return record
        }

    type Report with
        member private this.reportDefinitionR_ (dc:DataCache) = dc.getR (KReport this) (fun () -> getReportDefinitionR this)
        member         this.nameR_     dc = this.reportDefinitionR_ dc |> Rop.mapR  (fun record -> record.report_name)
        member         this.uniqueIdR_ dc = this.reportDefinitionR_ dc |> Rop.bindR (fun record -> record.report_unique_id |> Rop.fromOption (ErrUniqueIdNotDefinedForReport this))
        member         this.optionsR_  dc = this.reportDefinitionR_ dc |> Rop.mapR  (fun record -> record.options |> Option.defaultV ""   )
        member         this.name_      dc = this.nameR_ dc |> Rop.ifError (sprintf "<invalid %A>" this)


    type private SqlClient = SqlCommandProvider<"Select * from CS.Client WHERE client_code = @clientCode", designCS, SingleRow = true>
    let private getClientR (client: Client) = 
        Rop.flow {
            do! Rop.tryProtection()
            use  cmd     = new SqlClient(actualCS)
            let  record  = cmd.Execute(client.clientCode)
            let! record  = record |> Rop.fromOption (ErrClientNotFound client)
            return record
        }

    type ObjectHierarchy = XmlProvider<"SampleObjectHierarchy.Xml", Global=true>

    type Client with
        member private this.clientRecordR_ (dc:DataCache) = dc.getR (KClient this) (fun () -> getClientR this)
        member         this.nameR_            dc = this.clientRecordR_ dc |> Rop.mapR (fun record -> record.client_name)
        member         this.name_             dc = this.nameR_         dc |> Rop.ifError (sprintf "%A" (this.nameR_ dc))
        member         this.industryTypeRO_   dc = this.clientRecordR_ dc |> Rop.mapR (fun record -> record.industry_type)
        member         this.objectHierarchyR_ dc = Rop.flow {
                                                    let! record = this.clientRecordR_ dc
                                                    let! hier   = record.object_hierarchy |> Rop.fromOption (ErrValueIsNull ("object_hierarchy", "CS.Client"))
                                                    return ObjectHierarchy.Parse hier
                                                 }


    type private SqlObject = SqlCommandProvider<"SELECT * FROM FIN.UI_OBJECT WHERE object_code = @objectCode and client_code = @clientCode", designCS, SingleRow = true>
    let  private getObjectR (obj: ObjectT) (client: Client) =
        Rop.flow {
            do! Rop.tryProtection()
            use  cmd     = new SqlObject(actualCS)
            let  record  = cmd.Execute(obj.objectId, client.clientCode)
            return!        record |> Rop.fromOption (ErrObjectNotFound obj)
        }

    type ObjectT with
        member private this.objectRecordR_ (dc:DataCache) client = dc.getR (KObject this) (fun () -> getObjectR this client)
        member         this.nameR_           dc client = this.objectRecordR_ dc client |> Rop.mapR    (fun record -> record.object_name |> Option.defaultV "")
        member         this.blobR_           dc client = this.objectRecordR_ dc client |> Rop.bindR   (fun record -> record.object_blob |> Rop.fromOption (ErrValueIsNull ("object_blob", "FIN.UI_OBJECT")))
        member         this.name_            dc client = this.nameR_         dc client |> Rop.ifError (sprintf "%A" (this.nameR_ dc))

    let private fetchTableSchema designCS query =
        use  conn    = new System.Data.SqlClient.SqlConnection()
        conn.ConnectionString <- actualCS
        conn.Open()
        use  command = new System.Data.SqlClient.SqlCommand(query, conn)
        let  table   = new System.Data.DataTable()
        use  rdr     = command.ExecuteReader(System.Data.CommandBehavior.SchemaOnly)
        let  schema  = rdr.GetSchemaTable()
        rdr.Close      ()
        schema

    let  c    = actualCS
    let  u    = using
    let  rT f = (Rop.doTry   f) ()
    let  rC f =  Rop.callTry f 

    type DB = SqlProgrammabilityProvider<designCS>

    type private QIFDimension = SqlCommandProvider<"SELECT *              FROM dbo.Dimension       WHERE dimension_code = @dimensionCode ", designCS, ResultType = ResultType.DataReader>
    type private QServerOlap  = SqlCommandProvider<"SELECT *              FROM dbo.Server_Olap     WHERE server_code    = @serverCode    ", designCS, SingleRow = true>
    type private QServerById  = SqlCommandProvider<"SELECT server_code    FROM dbo.Server_Olap     WHERE server_id      = @serverId  
                                                                                                     AND client_code    = @clientCode    ", designCS, SingleRow = true>
    type private DimByName    = SqlCommandProvider<"SELECT *              FROM dbo.Dimension       WHERE dimension_name = @dimensionName 
                                                                                                     AND client_code    = @clientCode    ", designCS, SingleRow = true>
    type private DimElements  = SqlCommandProvider<"SELECT *              FROM dbo.Element         WHERE dimension_code = @dimensionCode ", designCS, ResultType = ResultType.DataReader>
    type private DimAttribs   = SqlCommandProvider<"SELECT *              FROM dbo.Attribute       WHERE dimension_code = @dimensionCode ", designCS>
    type private DimAttVals   = SqlCommandProvider<"SELECT *              FROM dbo.Attribute_Value WHERE attribute_code in 
                                                   (SELECT attribute_code FROM  dbo.Attribute 
                                                                                                   WHERE dimension_code = @dimensionCode)", designCS, ResultType = ResultType.DataReader>
    type private DimAttValsId = SqlCommandProvider<"SELECT *              FROM dbo.Attribute_Value WHERE attribute_code = @attributeCode ", designCS, ResultType = ResultType.DataReader>
    type private AddLFSJob    = SqlCommandProvider<"INSERT INTO _Jobs(JobId, JobType, JobObject) 
                                                      SELECT (SELECT MAX(JobId)+1     FROM _Jobs), @jobType, @jobObject ", designCS>
    type private DelElemElem  = SqlCommandProvider<"DELETE                FROM dbo.Elem_Elem       WHERE child_code     = @childCode 
                                                                                                     AND parent_code    = @parentCode    ", designCS>
    type private RelElemElems = SqlCommandProvider<"SELECT *              FROM dbo.Elem_Elem       WHERE child_code  in 
                                                   (SELECT element_code   FROM dbo.Element         WHERE dimension_code = @dimensionCode)", designCS, ResultType = ResultType.DataReader>
    type private RelWithNames = SqlCommandProvider<"SELECT r.*
                                                         , child_name  = c.element_name,  child_description = c.element_description
                                                         , parent_name = p.element_name, parent_description = p.element_description
                                                      FROM dbo.Elem_Elem r
                                                INNER JOIN dbo.Element   c ON c.element_code = r.child_code
                                                INNER JOIN dbo.Element   p ON p.element_code = r.parent_code
                                                                                                   WHERE c.dimension_code = @dimensionCode", designCS>
    type private DelElementElem   = SqlCommandProvider<"Declare @ElemCode uniqueidentifier
                                                    SET     @ElemCode = @elementCode;
                                                    DELETE                 FROM dbo.Elem_Elem      WHERE child_code  = @ElemCode
                                                                                                      OR parent_code = @ElemCode", designCS>
    type private DelElemElems   = SqlCommandProvider<"
                                        WITH codes as (SELECT element_code FROM dbo.Element        WHERE dimension_code = @dimensionCode)
                                                      DELETE               FROM dbo.Elem_Elem      WHERE child_code  in (select * from codes)                                          
                                                                                                      OR parent_code in (select * from codes)", designCS>
    type private AddElemElem    = SqlCommandProvider<"INSERT INTO dbo.Elem_Elem(child_code, parent_code) 
                                                      SELECT @childCode, @parentCode", designCS>
              
    let tblQIFDimension dC f    = rT (fun () -> u (new QIFDimension   (c)) (fun cmd -> u (cmd.Execute dC    ) (fun rdr -> u (new DB.dbo.Tables.Dimension      ()) (fun tbl -> tbl.Load(rdr); f tbl))))
    let tblElements     dC f    = rT (fun () -> u (new DimElements    (c)) (fun cmd -> u (cmd.Execute dC    ) (fun rdr -> u (new DB.dbo.Tables.Element        ()) (fun tbl -> tbl.Load(rdr); f tbl))))
    let tblAttribs      dC      = rC (fun () -> u (new DimAttribs     (c)) (fun cmd ->    cmd.Execute dC      |> Seq.toArray ) ) ()
    let tblAttVals      dC f    = rT (fun () -> u (new DimAttVals     (c)) (fun cmd -> u (cmd.Execute dC    ) (fun rdr -> u (new DB.dbo.Tables.Attribute_Value()) (fun tbl -> tbl.Load(rdr); f tbl))))
    let tblAttValsbyId  id f    = rT (fun () -> u (new DimAttValsId   (c)) (fun cmd -> u (cmd.Execute id    ) (fun rdr -> u (new DB.dbo.Tables.Attribute_Value()) (fun tbl -> tbl.Load(rdr); f tbl))))
    let tblElemElems    dC f    = rT (fun () -> u (new RelElemElems   (c)) (fun cmd -> u (cmd.Execute dC    ) (fun rdr -> u (new DB.dbo.Tables.Elem_Elem      ()) (fun tbl -> tbl.Load(rdr); f tbl))))
    let getServerOlapR  sC      = rT (fun () -> u (new QServerOlap    (c)) (fun cmd ->    cmd.Execute sC      |> Rop.fromOption (ErrRecordNotFound("ServerOlap", sC.ToString()))) )                                           
    let getServerByIdR  sI cC   = rT (fun () -> u (new QServerById    (c)) (fun cmd ->    cmd.Execute(sI, cC) |> Rop.fromOption (ErrRecordNotFound("ServerOlap", sI           ))) )                                           
    let getDimByNameR   cC n    = rC (fun () -> u (new DimByName      (c)) (fun cmd ->    cmd.Execute(n, cC )) ) ()                                            
    let qryRelWithNames dC      = rC (fun () -> u (new RelWithNames   (c)) (fun cmd ->    cmd.Execute dC     ) ) ()

    type dimElement = DB.dbo.Tables.Element.Row

    type Client with
        member private this.getDimRecordByNameR_ name = getDimByNameR this.clientCode name
        member         this.dimByNameR_          name = this.getDimRecordByNameR_ name |> Rop.bindR (Option.map (fun r -> r.dimension_code |> Dimension) >> Rop.fromOption (ErrRecordNotFound("dimension", name)))
        member this.serverOlapByIdR_ id = getServerByIdR id this.clientCode |> Rop.mapR ServerOlap

    type User with
        member         this.dimByNameR_  (dc:DataCache) name = dc.getR (KUserDimensionName(this, name)) (fun () -> this.currentClientR_ dc |> Rop.bindR (fun client -> client.dimByNameR_ name))

    type ServerOlap with
        member private this.serverRecordR_  (dc:DataCache) = dc.getR (KServerOlap          this) (fun () -> getServerOlapR this.serverId)
        member this.serverModelR_            dc            = this.serverRecordR_ dc |> Rop.mapR (fun record -> record.model_name)
        member this.serverConnectR_          dc            = this.serverRecordR_ dc |> Rop.mapR (fun record -> record.server_connect)
        member this.serverAddressR_          dc            = this.serverRecordR_ dc |> Rop.mapR (fun record -> record.server_name + "/" + record.model_name)

    type Dimension with
        member private this.dimensionRecordR_  (dc:DataCache) = dc.getR (KDimension          this) (fun () -> tblQIFDimension this.dimensionId <| fun tbl -> tbl.Rows.[0]            |> Rop.succeed)
        member         this.ElementsR_         (dc:DataCache) = dc.getR (KDimensionElems     this) (fun () -> tblElements     this.dimensionId <| fun tbl -> tbl.Rows |> Seq.toArray |> Rop.succeed)
        member         this.ElemElemsR_        (dc:DataCache) = dc.getR (KDimensionElemElems this) (fun () -> tblElemElems    this.dimensionId <| fun tbl -> tbl.Rows |> Seq.toArray |> Rop.succeed)
        member         this.AttributesR_       ()      = tblAttribs  this.dimensionId 
        member         this.AttValsR_          ()      = tblAttVals  this.dimensionId <| fun tbl -> tbl.Rows |> Seq.toArray |> Rop.succeed
        member         this.AttValsByIdR_      attId   = tblAttValsbyId  attId        <| fun tbl -> tbl.Rows |> Seq.toArray |> Rop.succeed
        member         this.RelWithNamesR_     ()      = qryRelWithNames this.dimensionId
        member         this.nameR_              dc     = this.dimensionRecordR_   dc |> Rop.mapR(fun record -> record.dimension_name          )
        member         this.clientR_            dc     = this.dimensionRecordR_   dc |> Rop.mapR(fun record -> record.client_code    |> Client)
        member         this.name_               dc     = this.nameR_              dc |> Rop.ifError  (this.dimensionId.ToString())
        member         this.deleteElemElemsR_  ()      = Rop.liftTry (fun _ -> u (new DelElemElems(c)) (fun cmd -> cmd.Execute(this.dimensionId               ))) (Rop.succeed ())
//        member         this.addElemElemR_ child parent = Rop.liftTry "addElemElem"     (fun _ -> u (new addElemElem (c)) (fun cmd -> cmd.Execute(this.dimensionId, child, parent))) (Rop.succeed ())
        member         this.updateOLAPModelR_  dc      = Rop.liftTry (fun _ -> u (new AddLFSJob   (c)) (fun cmd -> cmd.Execute(1, this.name_ dc))) (Rop.succeed ())
        member         this.loadDataR_         ()      = 
            tblElements this.dimensionId
            <| fun table -> 
                let rows =
                    table.Rows
                    |> Seq.sortBy (fun row -> row.element_order |> Option.defaultV row.element_name)
                    |> Seq.map (fun element ->
                        element.ItemArray
                    )
                    |> Seq.toArray
                let columns =
                    table.Columns
                    |> Seq.cast<System.Data.DataColumn>
                    |> Seq.mapi (fun i col -> 
                        Column(
                            id          = col.ColumnName
                            ,name       = col.ColumnName
                            ,dataType   = col.DataType.Name
                            ,field      = i
                            ,selectable = true
                            ,resizable  = true
                            ,focusable  = true
                            ,sortable   = true
                        )
                    )
                    |> Seq.skip 2
                    |> Seq.toArray
                Rop.succeed (rows, columns)
        member         this.saveDataR_  (deleted : obj [][]) (changed : obj [][]) (added : obj [][]) =
            tblElements this.dimensionId
            <| fun table -> 
                Rop.flow {
                    do! Rop.tryProtection()
                    table.PrimaryKey <- [| table.Columns.element_code |]
                    table.BeginLoadData()
                    let nDeleted =
                        table.Rows
                        |> Seq.filter(fun row' ->  deleted |> Array.exists( fun key -> row'.element_name = unbox key.[0] ))
                        |> Seq.map   (fun row' ->  row'.Delete())
                        |> Seq.length
                    changed
                    |> Array.iter (fun row ->
                        table.LoadDataRow(row, System.Data.LoadOption.Upsert) |> ignore
                    )
                    let addedNewRows =
                        added
                        |> Array.map (fun row ->
                            let newId = System.Guid.NewGuid()
                            row.[0] <- box this.dimensionId  
                            row.[1] <- box newId
                            table.LoadDataRow(row, System.Data.LoadOption.Upsert) |> ignore
                            row
                        )
                    table.EndLoadData()
                    use conn = new System.Data.SqlClient.SqlConnection(c)
                    conn.Open()
                    let tran = conn.BeginTransaction()
                    let nTotal = table.Update(conn, tran)
                    tran.Commit()
                    let nDifference = (deleted.Length + added.Length + changed.Length - nTotal)
                    let message =
                        if nDifference <> 0
                        then sprintf "warning, %d record(s) skipped, %d record(s) updated." nDifference nTotal 
                        else sprintf "%d records updated." nTotal 
                    return message, addedNewRows
                }

        member         this.saveRelsDataR_  (deleted : obj [][]) (changed : obj [][]) (added : obj [][]) (relationsP: (string * string) []) =
            tblAttVals  this.dimensionId
            <| fun tableAtt ->
            tblElements this.dimensionId
            <| fun table -> 
                Rop.flow {
                    do! Rop.tryProtection()
                    let! attributes    = this.AttributesR_()
                    let findElementCode (name: string) =
                        table.Rows
                        |> Seq.filter (fun row -> row.RowState <> System.Data.DataRowState.Deleted)
                        |> Seq.tryFind(fun row -> row.element_name |> strToKey = name)
                        |> Option.map (fun row -> row.element_code)
                    let saveElementsData =
                        table.PrimaryKey <- [| table.Columns.element_code |]
                        tableAtt.PrimaryKey <- [| tableAtt.Columns.attribute_code; tableAtt.Columns.element_code |]
                        table.BeginLoadData()
                        tableAtt.BeginLoadData()
                        use cmdDel = new DelElementElem(c)
                        let nDeleted =
                            table.Rows
                            |> Seq.filter(fun row' ->  deleted |> Array.exists( fun key -> row'.element_code.ToString() = unbox<string> key.[0] ))
                            |> Seq.map   (fun row' ->  
                                            cmdDel.Execute row'.element_code |> ignore
                                            row'.Delete())
                            |> Seq.length
                        let getAttV (att: DimAttribs.Record) v =
                            if att.attribute_type = 0s
                            then v |> unbox<string> |> left (att.attribute_length |> int) |> box
                            else v
                        changed
                        |> Array.iter (fun row ->
                            table.LoadDataRow(row.[0..4], System.Data.LoadOption.Upsert) |> ignore
                            attributes
                            |> Array.iteri(fun i attribute ->
                                tableAtt.LoadDataRow([| box attribute.attribute_code; row.[1] ; getAttV attribute row.[i + 5] |], System.Data.LoadOption.Upsert) |> ignore
                            )
                        )
                        let addedNewRows =
                            added
                            |> Array.map (fun row ->
                                let newId = System.Guid.NewGuid() |> box
                                attributes
                                |> Array.iteri(fun i attribute ->
                                    if i+5 < row.Length then
                                        row.[i + 5] <- getAttV attribute row.[i + 5]
                                        tableAtt.LoadDataRow([| box attribute.attribute_code; newId ; row.[i + 5] |], System.Data.LoadOption.Upsert) |> ignore
                                )
                                row.[0] <- box this.dimensionId  
                                row.[1] <-     newId
                                table.LoadDataRow(row.[0..4], System.Data.LoadOption.Upsert) |> ignore
                                row
                            )
                        table.EndLoadData()
                        tableAtt.EndLoadData()
                        use conn        = new System.Data.SqlClient.SqlConnection(c)
                        conn.Open()     
                        let nTotal      = table.Update(conn)
                        let nTotal2     = tableAtt.Update(conn)
                        let nDifference = (deleted.Length + added.Length + changed.Length - nTotal)
                        nTotal + nTotal2, nDifference, addedNewRows
                    let nTotal, nDifference,addedNewRows = saveElementsData
                    let! currentRels = this.RelWithNamesR_ () 
                    let  currents   = currentRels |> Seq.map   (fun rel             -> rel.child_name |> strToKey, rel.parent_name |> strToKey, rel.child_code, rel.parent_code) |> Seq.toArray
                    let  relations2 = relationsP  |> Array.map (fun (child, parent) ->     child      |> strToKey,     parent      |> strToKey )
                    let cmdAdd = new AddElemElem(c)
                    let added =
                        relations2
                        |> Seq.filter(fun (child, parent) -> currents |> Array.exists(fun (child', parent', _, _)  -> child' = child && parent' = parent) |> not)
                        |> Seq.map   (fun (child, parent) -> child 
                                                             |> findElementCode
                                                             |> Option.map(fun childCode -> 
                                                                parent
                                                                |> findElementCode
                                                                |> Option.map(fun parentCode -> cmdAdd.Execute(childCode, parentCode))
                                                                |> Option.defaultV 0
                                                             )
                                                             |> Option.defaultV 0
                                     )
                        |> Seq.sum
                    use cmdDel = new DelElemElem(c)
                    let deleted =
                        currents
                        |> Seq.filter(fun (child', parent', _, _) -> relations2 |> Array.exists(fun (child, parent) -> child' = child && parent' = parent) |> not)
                        |> Seq.map   (fun (_, _, childCode, parentCode) -> cmdDel.Execute(childCode, parentCode))
                        |> Seq.sum
                    let nTotal  = nTotal + deleted + added
                    let message =  sprintf "%d records updated." nTotal 
//                        if nDifference <> 0
//                        then sprintf "warning, %d record(s) skipped, %d record(s) updated." nDifference nTotal 
//                        else sprintf "%d records updated." nTotal 
                    return message, addedNewRows
                }

    type Table with
        member         this.saveDataR_ (columns: string[]) (deleted : obj [][]) (changed : obj [][]) (added : obj [][]) =
            match this with
                | DimensionTable    dimension -> dimension.saveDataR_ deleted changed added
                | _                           -> Rop.fail (ErrFeatureNotImplemented "saving data for non DimensionTables")

        

    type private QAvailableClient = SqlCommandProvider<"SELECT TOP 1 client_code 
                                                          FROM CS.Client c 
                                                         WHERE client_name = 'Genesis'
                                                           AND NOT Exists(SELECT user_code 
                                                                            FROM CS.Client_User cu 
                                                                           WHERE cu.client_code = c.client_code) ", designCS, SingleRow = true>
    type private QCreateGuest    = SqlCommandProvider<"INSERT INTO CS.[User] (user_code, user_name, user_email, language_code)
                                                           VALUES(@userCode, 'Guest', '', 'eng')", designCS>

    type private QAttachUser2Client = SqlCommandProvider<"INSERT INTO CS.Client_User (user_code, client_code)
                                                           VALUES(@userCode, @clientCode)", designCS>


    let fetchNewUserClientR_ () =
        Rop.flow {
            do!  Rop.tryProtection()
            use  cmdAC         = new QAvailableClient  (actualCS)
            use  cmdCG         = new QCreateGuest      (actualCS)
            use  cmdAU         = new QAttachUser2Client(actualCS)
            let! newClientCode = cmdAC.Execute() |> Rop.fromOption ErrNoProvisionedClientAvailable
            let  newClient     = newClientCode         |> Client
            let  newGuest      = System.Guid.NewGuid() |> User
            let  res           = cmdCG.Execute(newGuest.userCode)
            let  res           = cmdAU.Execute(newGuest.userCode, newClient.clientCode)
            return newGuest, newClient
        }


    type private QInsertObject  = SqlCommandProvider<"MERGE FIN.UI_Object o
                                                      USING (SELECT client_code  = @clientCode
                                                                  , object_name  = @objectName
                                                                  , folder_code  = @folderCode
                                                                  , object_blob  = @content   
                                                                  , create_user  = @userCode  
                                                                  , content_type = @contentType
                                                                  , file_size    = @fileSize
                                                                  , theme_tags   = @tags) s
                                                      ON s.client_code = o.client_code 
                                                     AND s.object_name = o.object_name 
                                                     AND IsNull(s.folder_code, '00000000-0000-0000-0000-000000000000') = IsNull(o.folder_code, '00000000-0000-0000-0000-000000000000') 
                                                     AND IsNull(s.theme_tags, '') = IsNull(o.theme_tags, '')
                                                      WHEN MATCHED THEN
                                                        UPDATE SET o.object_blob      = s.object_blob
                                                                 , o.content_type     = s.content_type
                                                                 , o.file_size        = s.file_size
                                                                 , o.update_user      = s.create_user
                                                                 , o.update_timestamp = GetDate()
                                                      WHEN NOT MATCHED THEN
                                                        INSERT(  client_code,   object_name,   folder_code,   theme_tags,   object_blob,   create_user,   content_type,   file_size, create_timestamp, editable_flag)
                                                        VALUES(s.client_code, s.object_name, s.folder_code, s.theme_tags, s.object_blob, s.create_user, s.content_type, s.file_size, GetDate()       , 1            );", designCS, AllParametersOptional = true>

    type private QGetFiles      = SqlCommandProvider<"WITH RFolder as (
	                                                        SELECT folderC = folder_code, folderN =CONVERT(nvarchar(MAX), folder_name), parentF = parent_folder
	                                                          FROM Folder
	                                                        UNION ALL
	                                                        SELECT r.folderC, f.folder_name + '/' + r.folderN, f.parent_folder
	                                                          FROM RFolder   r
	                                                        INNER JOIN Folder f ON f.folder_code = r.parentF
                                                        )
                                                        SELECT folder = IsNull(f.folderN, ''), o.*
                                                        FROM fin.UI_Object o
                                                        LEFT JOIN RFolder  f ON f.folderC = o.folder_code AND f.parentF is Null
                                                        WHERE object_name = @objectName
                                                          AND IsNull(f.folderN, '') = @folderName
                                                          AND client_code in (@clientCode, '00000000-0000-0000-0000-000000000000')", designCS>

    type private QGetFilesInfo  = SqlCommandProvider<"WITH RFolder as (
	                                                        SELECT folderC = folder_code, folderN =CONVERT(nvarchar(MAX), folder_name), parentF = parent_folder
	                                                          FROM Folder
	                                                        UNION ALL
	                                                        SELECT r.folderC, f.folder_name + '/' + r.folderN, f.parent_folder
	                                                          FROM RFolder   r
	                                                        INNER JOIN Folder f ON f.folder_code = r.parentF
                                                        )
                                                        SELECT folder = IsNull(f.folderN, ''), object_name, theme_tags, client_code, content_type, object_code, create_timestamp, update_timestamp, file_size
                                                        FROM fin.UI_Object o
                                                        LEFT JOIN RFolder  f ON f.folderC = o.folder_code AND f.parentF is Null
                                                        WHERE object_name = @objectName
                                                          AND IsNull(f.folderN, '') = @folderName
                                                          AND client_code in (@clientCode, '00000000-0000-0000-0000-000000000000')", designCS>

    type private QGetObjectsInfo = SqlCommandProvider<"WITH RFolder as (
	                                                        SELECT folderC = folder_code, folderN =CONVERT(nvarchar(MAX), folder_name), parentF = parent_folder
	                                                          FROM Folder
	                                                        UNION ALL
	                                                        SELECT r.folderC, f.folder_name + '/' + r.folderN, f.parent_folder
	                                                          FROM RFolder   r
	                                                        INNER JOIN Folder f ON f.folder_code = r.parentF
                                                        )
                                                        SELECT folder = IsNull(f.folderN, ''), folder_code, object_name, theme_tags, client_code, content_type, object_code, create_timestamp, update_timestamp, file_size
                                                        FROM fin.UI_Object o
                                                        LEFT JOIN RFolder  f ON f.folderC = o.folder_code AND f.parentF is Null
                                                        WHERE client_code = @clientCode", designCS>

    type private QGetFolders      = SqlCommandProvider<"SELECT * FROM     Folder                                               WHERE client_code = @clientCode", designCS>
    type private QDeleteFolder    = SqlCommandProvider<"DELETE   FROM     Folder                                               WHERE client_code = @clientCode AND folder_code = @folderCode", designCS>
    type private QDeleteFile      = SqlCommandProvider<"DELETE   FROM fin.UI_Object                                            WHERE client_code = @clientCode AND object_code = @objectCode", designCS>
    type private QMoveFileTo      = SqlCommandProvider<"UPDATE  fin.UI_Object SET folder_code   = @folderCode                  WHERE client_code = @clientCode AND object_code = @objectCode", designCS, AllParametersOptional = true>
    type private QMoveFolderTo    = SqlCommandProvider<"UPDATE      Folder    SET parent_folder = @parentCode                  WHERE client_code = @clientCode AND folder_code = @objectCode", designCS, AllParametersOptional = true>
    type private QRenameFolder    = SqlCommandProvider<"UPDATE      Folder    SET folder_name   = @newName                     WHERE client_code = @clientCode AND folder_code = @objectCode", designCS>
    type private QCreateFolder    = SqlCommandProvider<"INSERT INTO Folder(folder_name, client_code, parent_folder) values(@newName, @clientCode, @parentCode)", designCS, AllParametersOptional = true>
    type private QRenameFile      = SqlCommandProvider<"UPDATE  fin.UI_Object SET object_name   = @newName, theme_tags = @tags WHERE client_code = @clientCode AND object_code = @objectCode", designCS>

    let matchedTags (tags: string) (matchTo: string) =
        let ts = matchTo.Split([|' '|])
        tags.Split([|' '|])
        |> Array.map(fun t ->
            if ts |> Array.contains t
            then (-1, 0)
            else (-1, 1)
        )
        |> Seq.reduce (fun (a1,a2) (b1, b2) -> (a1 + b1, a2 + b2))

    type Client with
        member this.uploadFileR_ (filename: string) (folderCode) (content: byte[]) (user: User) (contentType: string) (size: int) (tags: string) =
            Rop.flow {
                use  cmd    = new QInsertObject(actualCS)
                let  ret    = cmd.Execute(this.clientCode |> Some
                                  , filename              |> Some
                                  , folderCode             
                                  , content               |> Some
                                  , user.userCode         |> Some
                                  , contentType           |> Some
                                  , size                  |> Some
                                  , if tags.Trim() = "" then None else tags |> Some)
                do!  ret = 1 |> Rop.assertR <| (ErrRecordWasNotUpdated filename)
                return  filename + " " + tags + " Uploaded successfuly"
            }
        member this.uploadFilesR_ (files: System.Web.HttpPostedFileBase seq) folder (user: User) dc =
            Rop.flow {
                let! tags   = user.themeTagsR_ dc
                use  cmd    = new QInsertObject(actualCS)
                let! ret    = files
                              |> Seq.map(fun file ->
                                  use rdr = new System.IO.BinaryReader(file.InputStream)
                                  this.uploadFileR_ file.FileName folder (rdr.ReadBytes file.ContentLength) user file.ContentType file.ContentLength tags
                              ) |> Rop.seqCheck
                return ret |> String.concat "\n"
            }
        member this.getFileInfoR_ (filename: string) (user: User) dc =
            Rop.flow {
                let! tags         = user.themeTagsR_ dc
                use  cmd          = new QGetFilesInfo(actualCS)
                let  filePath     = filename.Split([| '/' ; '|' |], System.StringSplitOptions.RemoveEmptyEntries)
                let  folder       = if filePath.Length < 2 then "" else filePath.[0.. filePath.Length - 2] |> String.concat "/"
                let  records      = cmd.Execute(filePath.[filePath.Length - 1], folder, this.clientCode)
                let  res          = records 
                                    |> Seq.sortBy(fun record ->
                                          record.theme_tags |> Option.defaultV "" |> matchedTags tags 
                                        , record.client_code = System.Guid.Empty)
                                    |> Seq.head
//                let  content = res.content_type |> Option.defaultV "text/plain"
                let  lastModified = res.update_timestamp |> Option.defaultV (res.create_timestamp |> Option.defaultV (System.DateTime()))
                return res, lastModified
            }
        member this.getFileR_ (filename: string) (user: User) dc =
            Rop.flow {
                let! tags         = user.themeTagsR_ dc
                use  cmd          = new QGetFiles(actualCS)
                let  filePath     = filename.Split([| '/' ; '|' |], System.StringSplitOptions.RemoveEmptyEntries)
                let  folder       = if filePath.Length < 2 then "" else filePath.[0.. filePath.Length - 2] |> String.concat "/"
                let  records      = cmd.Execute(filePath.[filePath.Length - 1], folder, this.clientCode)
                let  res          = records 
                                    |> Seq.sortBy(fun record ->
                                          record.theme_tags |> Option.defaultV "" |> matchedTags tags 
                                        , record.client_code = System.Guid.Empty)
                                    |> Seq.head
                let! blob         = res.object_blob      |> Rop.fromOption (ErrValueIsNull ("object_blob", filename))
                let  content      = res.content_type     |> Option.defaultV "text/plain"
                let  lastModified = res.update_timestamp |> Option.defaultV (res.create_timestamp |> Option.defaultV (System.DateTime()))
                return blob, content, res.object_code, lastModified
            }
            
        member this.getFilesInfoR_ () =
            Rop.flow {
                use cmd     = new QGetObjectsInfo(actualCS)
                let ret     = cmd.Execute(this.clientCode)
                return ret
            }
        member this.getFoldersR_ () =
            Rop.flow {
                use cmd     = new QGetFolders(actualCS)
                let ret     = cmd.Execute(this.clientCode)
                return ret
            }
        member this.deleteFileR_ fileId =
            Rop.flow {
                use cmd     = new QDeleteFile(actualCS)
                let ret     = cmd.Execute(this.clientCode, fileId)
                do!  ret = 1 |> Rop.assertR  <| (ErrRecordNotFound (fileId.ToString(), "FIN.UI_Object"))
                return sprintf "File deleted %A" fileId
            }
        member this.renameFolderR_ folderId (newName: string) =
            Rop.flow {
                use cmd     = new QRenameFolder(actualCS)
                let ret     = cmd.Execute(newName, this.clientCode, folderId)
                do!  ret = 1 |> Rop.assertR  <| (ErrRecordNotFound (folderId.ToString(), "Folder"))
                return "Folder renamed " + newName
            }
        member this.createFolderR_ (newName: string) (parentFolder: System.Guid option) =
            Rop.flow {
                use cmd     = new QCreateFolder(actualCS)
                let ret     = cmd.Execute(Some newName, Some this.clientCode, parentFolder)
                do!  ret = 1 |> Rop.assertR  <| (ErrRecordWasNotUpdated "Folder")
                return "Folder created " + newName
            }
        member this.renameFileR_ fileId (newName: string) (tags: string) =
            Rop.flow {
                use cmd     = new QRenameFile(actualCS)
                let ret     = cmd.Execute(newName, tags, this.clientCode, fileId)
                do!  ret = 1 |> Rop.assertR  <| (ErrRecordNotFound (fileId.ToString(), "FIN.UI_Object"))
                return "File renamed " + newName
            }
        member this.deleteFolderR_ folderId =
            Rop.flow {
                use cmd     = new QDeleteFolder(actualCS)
                let ret     = cmd.Execute(this.clientCode, folderId)
                do!  ret = 1 |> Rop.assertR  <| (ErrRecordNotFound (folderId.ToString(), "Folder"))
                return sprintf "Folder deleted %A" folderId
            }
        member this.moveFileToR_ fileId (newFolder: System.Guid option) =
            Rop.flow {
                use cmd     = new QMoveFileTo(actualCS)
                let ret     = cmd.Execute(newFolder, Some this.clientCode, Some fileId)
                do!  ret = 1 |> Rop.assertR  <| (ErrRecordNotFound (fileId.ToString(), "FIN.UI_Object"))
                return sprintf "File moved to %A" newFolder
            }
        member this.moveFolderToR_ folderId (parentFolder: System.Guid option) =
            Rop.flow {
                use cmd     = new QMoveFolderTo(actualCS)
                let ret     = cmd.Execute(parentFolder, Some this.clientCode, Some folderId)
                do!  ret = 1 |> Rop.assertR  <| (ErrRecordNotFound (folderId.ToString(), "Folder"))
                return sprintf "Folder moved to %A" parentFolder
            }
