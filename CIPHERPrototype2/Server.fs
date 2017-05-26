namespace CIPHERPrototype1
open Model
open Model2
open System
open System.Data
open System.Data.SqlClient
open WebSharper
open WebSharper.Web
open Rop

module Server =
    open Repository

    [<JavaScript>]
    let inline callServerDo wrapped restOfCExpr handleErrors =
        async {
            let! resultR     = wrapped
            Rop.flow {
                do!  Rop.tryProtection()
                let! result  = resultR
                restOfCExpr result
            } |> handleErrors
        } |> fun asy -> Async.StartWithContinuations(
                                asy
                            ,   fun _ -> ()
                            ,   fun exc -> Rop.failException exc |> Rop.notifyMessages
                            ,   fun can -> Rop.failException can |> Rop.notifyMessages
        )

    let inline callServerDo2 wrapped restOfCExpr =
        async {
            let! result     = wrapped
            let  result     = restOfCExpr result
            return Rop.succeed result
        } |> fun asy -> Async.StartWithContinuations(
                                asy
                            ,   fun _ -> ()
                            ,   fun exc -> Rop.failException exc |> Rop.notifyMessages
                            ,   fun can -> Rop.failException can |> Rop.notifyMessages
        )

    [<JavaScript>]
    type callServerBuilder(handleErrors) =
        member this.Bind<'a>   (wrapped: Async<Result<'a>>, restOfCExpr: 'a -> unit) = callServerDo   wrapped restOfCExpr    handleErrors
        member this.Bind<'a>   (wrapped: Result<'a>       , restOfCExpr: 'a -> unit) = wrapped |> Rop.liftTry restOfCExpr |> handleErrors
        member this.Zero       ()                        = ()
        member this.Return     (x)                       = Rop.succeed x
        member this.Delay      (f)                       = f()
        member this.Combine    (a, b)                    =
            match (a,b) with
                | Success (v1, m1), Success(v2, m2) -> Success(v2, m1 @ m2)
                | Success (v1, m1), Failure(    m2) -> Failure(    m1 @ m2)
                | Failure (    m1), Success(v2, m2) -> Failure(    m1 @ m2)
                | Failure (    m1), Failure(    m2) -> Failure(    m1 @ m2)

    [<JavaScript>]
    let        call               = new callServerBuilder(Rop.notifyMessages)
    [<JavaScript>]
    let inline callR handleErrors = new callServerBuilder(handleErrors)

    let inline asyncCall wrapped restOfCExpr =
        async {
            let! result =  wrapped
            let  resultR = (Rop.doTry restOfCExpr) result
            return resultR
        }

    type createAsyncBuilder(handleErrors) =
        member inline this.Bind<'a, 'b>   (wrapped: Async< 'a>, restOfCExpr: 'a -> Result<'b> ) = asyncCall wrapped restOfCExpr
        member this.Bind<'a, 'b>          (wrapped: Result<'a>, restOfCExpr: 'a -> Result<'b> ) = wrapped |> Rop.bindTry restOfCExpr
        member this.Zero       ()                        = Rop.succeed ()
        member this.Return     (x)                       = Rop.succeed x
        member this.ReturnFrom (x)                       = x
        member this.Delay      (f)                       = f()
        member this.Combine    (a, b)                    =
            match (a,b) with
                | Success (v1, m1), Success(v2, m2) -> Success(v2, m1 @ m2)
                | Success (v1, m1), Failure(    m2) -> Failure(    m1 @ m2)
                | Failure (    m1), Success(v2, m2) -> Failure(    m1 @ m2)
                | Failure (    m1), Failure(    m2) -> Failure(    m1 @ m2)

    let asyncR = new createAsyncBuilder() 

    let private getTableDefinitions user dc = 
        let systemTables =
            [
                TableDefinition(SystemTable "Accounts"  , "Accounts"  , keys = [|0|], rowsF = Repository.getAccountsR              user dc)
                TableDefinition(SystemTable "Companies" , "Companies" , keys = [|0|], rowsF = Repository.getCompaniesR             user dc)
                TableDefinition(SystemTable "Parameters", "Parameters", keys = [|0|], rowsF = Repository.getClientParametersTableR user dc)
            ]
        let dimensionTables=
            user.dimensionsR_ dc
            |> Rop.mapR (
                Array.map (fun dimension ->
                    TableDefinition(DimensionTable dimension, dimension.name_ dc, keys = [|1|], rowsF = (fun _ -> dimension.loadDataR_ ()))
                )
            )
            |> Rop.ifError [||]
            |> Seq.toList 
        systemTables @ dimensionTables

    type User with
        member private this.tableDefinitionsR (dc:DataCache) = dc.getR (KUserTables this) (fun () -> getTableDefinitions this dc |> Rop.succeed)
        member         this.tablesR   dc = this.tableDefinitionsR dc |> Rop.mapR 
                                            (Seq.map (
                                                function  TableDefinition(table, _, _, _) as tableDef -> 
                                                            dc.setR (KTable table) (Rop.succeed tableDef)
                                                            table
                                             )>> Seq.toArray)

    let private getTableDefinitionR user dc table = 
        getTableDefinitions user dc
        |> Seq.tryFind (function TableDefinition(table', title, _, _)  -> table'           = table)
        |> Rop.fromOption (ErrTableDefinitionNotFound table)


    type Table with
        member this.definitionR_ user (dc: DataCache) = dc.getR (KTable this) (fun () -> getTableDefinitionR user dc this)
        member this.nameR_       user  dc     = this.definitionR_ user dc |> Rop.mapR (function TableDefinition(_, name, _, _) -> name)
        member this.name_        user  dc     = this.nameR_ user dc |> Rop.ifError (sprintf "<invalid %A>" this)

    let fetchTablePanels user dc = 
        getTableDefinitions user dc 
        |> List.map(function TableDefinition(table, title, _, _) -> PanelTable(table, title))

    let GetConnectionR (client: Client) dc =
        Rop.flow {
            let! connString        = client.designerConnStrR_ dc
            let  conn              = new SqlConnection()
            conn.ConnectionString <- connString
            conn.Open()
            return conn
        }

    let GetTableSchemaR client dc readData select =
        Rop.flow {
            let! connection        = GetConnectionR client dc
            use  selectCm          = new SqlCommand(select, connection)
            use  rdr               = selectCm.ExecuteReader(CommandBehavior.SchemaOnly)
            let  schema            = rdr.GetSchemaTable()
            rdr.Close                ()
            let  adapter           = new SqlDataAdapter(select, connection)
            let  table             = new DataTable()
            if readData then
                adapter.Fill         table                      |> ignore
            else
                adapter.FillSchema   (table, SchemaType.Source) |> ignore
                table.Columns 
                |> Seq.cast<DataColumn> 
                |> Seq.iter (fun col -> col.ReadOnly  <- false)
            return connection, table, schema, adapter
        }

    let getTableInfoR user dc (table:Table) =
        getTableDefinitions user dc
        |> List.choose(function TableDefinition(table', title, keys, f) when table = table' -> Some (keys, f) | _ -> None)
        |> function | []   -> Rop.fail <| ErrTableDefinitionNotFound table
                    | h::_ -> Rop.succeed h


    let RpcNoTokenValidation (f: User -> Client -> DataCache -> Result<'a>) =
        let context = Remoting.GetContext()
        asyncR {
            let! userCodeOS    = context.UserSession.GetLoggedInUser()
            let! userCodeS     = userCodeOS |> Rop.fromOption ErrUserIsNotLoggedIn
            let  userCode      = new Guid(userCodeS)
            let  user          = User userCode
            let  dc            = DataCache()
            let! client        = user.currentClientR_ dc
            return! f user client dc
        }

    let RpcWithTokenValidation (token:Auth.Token) (f: User -> Client -> DataCache -> Result<'a>) =
        let context = Remoting.GetContext()
        asyncR {
            let! userCodeOS    = context.UserSession.GetLoggedInUser()
            let! userCodeS     = userCodeOS |> Rop.fromOption ErrUserIsNotLoggedIn
            let  userCode      = new Guid(userCodeS)
            let  validate1      = Auth.Generate token.Name
            let  validate2      = userCode = token.Name
            do! (validate1 = token && validate2) |> Rop.assertR <| ErrInvalidToken (sprintf "2.- %A %A %A" validate1 userCode token)
            let  user          = User userCode
            let  dc            = DataCache()
            let! client        = user.currentClientR_ dc
            return! f user client dc
        }

    let RpcSaveWithTokenValidation (token:Auth.Token) (f: bool -> User -> Client -> DataCache -> Result<'a>) =
        let context = Remoting.GetContext()
        RpcWithTokenValidation token <| fun user client dc ->
            Rop.flow {
                let  guest                = user.isGuest_()
                let! userSave, clientSave = if guest
                                            then fetchNewUserClientR_()
                                            else (user, client) |> Rop.succeed
                if user.isGuest_() then context.UserSession.LoginUser (userSave.userCode.ToString()) |> Async.RunSynchronously
                return! f guest userSave clientSave dc
            }

    let SaveDataR client dc (select:string) (keys: string[]) (columns: string[]) (deleted : string [][]) (changed : string [][]) (added : string [][]) = 
        let setPrimaryKey (table: DataTable)=
            keys
            |> Array.map (fun c -> table.Columns.[c])
            |> fun pk -> table.PrimaryKey <- pk
        let getValue (values:string[]) column : string =
            columns
            |> Array.findIndex (fun col -> col = column)
            |> fun idx -> Array.get values idx
        let setKeyValues (row:DataRow) (values:string[]) =
            keys
            |> Array.iter      (fun k -> row.SetField (k, getValue values k))
        let setValues (row:DataRow) (fs: string[])  (vs:string[]) =
            Array.zip          fs vs 
            |> Array.iter      (fun (k, v) -> row.SetField (k,v))
        let getRow (table:DataTable) (fs: string[])  (vs:string[]) =
            let row          = table.NewRow()
            setValues          row fs vs
            table.Rows.Add     row
            row
        let getRowWKeys (table:DataTable) (vs:string[]) =
            let row          = table.NewRow()
            setKeyValues       row vs
            table.Rows.Add     row
            row
        let fieldsAndParms concat fields =
            fields  |> Array.map (fun c -> c + " = @" + c) |> String.concat concat
        let fields =
            columns |> String.concat ", "
        let parms =
            columns |> Array.map ((+)"@") |> String.concat ", "
        let condition  =
            keys 
            |> fieldsAndParms " AND "
        let columnsSet =
            columns 
            |> Array.filter (fun c -> keys |> Array.exists (fun k -> k = c) |> not) 
            |> fieldsAndParms ", "
        let sqlParm (schema:DataTable) (column:string) =
            schema.Rows 
            |> Seq.cast<DataRow> 
            |> Seq.find(fun row -> row.["ColumnName"] = (column :> obj))
            |> fun c -> ("@" + column, c.["ProviderType"] :?> System.Data.SqlDbType, c.["ColumnSize"] :?> int, column)
        let addParameters (cm : SqlCommand) schema (fields : string[]) =
            fields 
            |> Array.map (sqlParm schema)
            |> Array.map cm.Parameters.Add
            |> ignore
        Rop.flow {
            do! Rop.tryProtection()
            let! cn, tb, sc, ad    = select |> GetTableSchemaR client dc false
            use  connection        = cn
            use  table             = tb
            use  schema            = sc
            use  adapter           = ad
            adapter.DeleteCommand <- new SqlCommand("DELETE FROM " + table.TableName                        + " WHERE " + condition, connection)
            adapter.UpdateCommand <- new SqlCommand("UPDATE "      + table.TableName + " SET " + columnsSet + " WHERE " + condition, connection)
            adapter.InsertCommand <- new SqlCommand("INSERT INTO " + table.TableName + " (" + fields + ") VALUES (" + parms + ")"  , connection)
            keys                  |> addParameters adapter.DeleteCommand schema
            columns               |> addParameters adapter.UpdateCommand schema
            columns               |> addParameters adapter.InsertCommand schema
            let deletes            = deleted |> Array.map (fun ks -> getRow      table keys ks                        )
            let changes            = changed |> Array.map (fun vs -> getRowWKeys table      vs |> (fun row -> vs, row))
            table.AcceptChanges      ()
            deletes               |> Array.iter (fun      row  -> row.Delete()                      )
            changes               |> Array.iter (fun (vs, row) -> setValues row columns vs          )
            added                 |> Array.iter (fun  vs       -> getRow table  columns vs |> ignore)
            let n                  = adapter.Update table
            return                   "changes saved."
        }

    /// fun client -> ReportDefinition list
    let fetchReportPanels_ (user: User) dc =
        Rop.flow {
            let! client     = user.currentClientR_ dc
            let! webService = client.parameterR_   dc EnumClientParameter.``Web Services Prefix``    
            let! repository = client.parameterR_   dc EnumClientParameter.``Application Studio Repository``
            let! catalog    = client.parameterR_   dc EnumClientParameter.``Application Studio Catalog``   
            let! project    = client.parameterR_   dc EnumClientParameter.``Application Studio Project``   
            let! reports    = user.reportsR_       dc
            let  panels     =
                reports 
                |> Seq.choose (fun report -> 
                    Rop.flow {
                        let! name        = report.nameR_              dc
                        let! uniqueId    = report.uniqueIdR_          dc
                        let! options     = report.optionsR_           dc
                        let! serverOlap  = client.serverOlapByIdR_ "MainModel"
                        let! serverModel = serverOlap.serverModelR_   dc
                        let! pwd         = serverOlap.serverConnectR_ dc
                        let  url         = webService + "/default.aspx?directLink=true" 
                                         + "&"                                   + options
                                         + "&showLogin=0"
                                         + "&loginName="                         + serverModel
                                         + "&loginPW="                           + pwd
                                         + "&loginRepository="                   + repository 
                                         + "&loginAuthSys=Basic&loginProject="   + project 
                                         + "&loginReportCatalog="                + catalog
                                         + "&useStartReport=0&reportGUID="       + uniqueId
                                         + "&showTree=0&showTopFrame=0&keepSession=1&skipFailedConnections=1&autologout=1&InstanceId=1"
                        return PanelReport(report, name, url)
                    }
                    |> Rop.toOption
                )
                |> Seq.toList
            return panels
        } |> Rop.ifError []

    let toObjArrArray_ a = a |> Array.map       (fun os -> os |> Array.map (fun o -> o :> obj ))

    [<Rpc>]
    let FetchQueryDataAR_ (token:Auth.Token) (table: Table) =
        RpcWithTokenValidation token <| fun user client dc ->
            Rop.flow {
                let! keys, rowsF   = getTableInfoR user dc table
                let! data, columns = rowsF ()
                return data, columns, keys
            }

    [<Rpc>]
    let SaveDataAR_  token (table: Table) columns (deleted : string [][], changed : string [][], added : string [][]) =
        RpcWithTokenValidation token <| fun user client dc ->
            let  select, keys  = ("", [|""|]) //getTableInfo2 tableName
            table.saveDataR_ columns (toObjArrArray_ deleted) (toObjArrArray_ changed) (toObjArrArray_ added)

    [<Rpc>]
    let LoginAR_ (userEmail: string) (pwd:string) =
        let context = Remoting.GetContext()
        asyncR {
            let! priorUserCodeOS = context.UserSession.GetLoggedInUser()
            let  user            = getUserFromEMail userEmail |> Rop.ifError (User Guid.Empty)
            let  dc              = DataCache()
            let! check, settings = user.checkPasswordR pwd
            do!                    check |> Rop.assertR <| ErrLoginFailed userEmail 
            if not settings then
                do!                user.setPasswordR dc pwd
            let! client          = user.currentClientR_ dc
            context.UserSession.LoginUser (user.userCode.ToString()) |> Async.RunSynchronously
            return Auth.Generate user.userCode
        }

    [<Rpc>]
    let guestLoginAR_() =
        let context = Remoting.GetContext()
        asyncR {
            let! priorUserCodeO = context.UserSession.GetLoggedInUser()
            let  user            = User (new Guid("ef047959-15b4-43dc-b131-39646009a706"))
            let  dc              = DataCache()
            let! client          = user.currentClientR_ dc
            context.UserSession.LoginUser (user.userCode.ToString()) |> Async.RunSynchronously
            return user.userCode |> Auth.Generate
        }

    [<Rpc>]
    let fetchTokenAR_() =
        let context = Remoting.GetContext()
        asyncR {
            let! userCodeOS        = context.UserSession.GetLoggedInUser()
            let! userCodeS = userCodeOS |> Rop.fromOption ErrUserIsNotLoggedIn
            return           Auth.Generate (new Guid(userCodeS))
        }

    [<Rpc>]
    let fetchPanelsAR_() =
        RpcNoTokenValidation <| fun user client dc ->
            let  repPanels  = fetchReportPanels_ user dc
            let  tabPanels  = fetchTablePanels  user dc
            List.append repPanels tabPanels |> Rop.succeed

    [<Rpc>]
    let fetchObjectBlobAR_ (obj: ObjectT) =
        RpcNoTokenValidation <| fun user client dc -> obj.blobR_ dc client |> Rop.mapR System.Text.Encoding.Unicode.GetString

    [<Rpc>]
    let fetchSingleRecordData_ (formId: InputFormId) =
        RpcNoTokenValidation <| fun user client dc -> formId.fetchSingleRecordDataR(user, client)

    [<Rpc>]
    let saveSingleRecordData_  (formId: InputFormId) (data:DataStorage) =
        RpcNoTokenValidation <| fun user client dc -> formId.updateSingleRecordDataR(user, client) data

    [<Rpc>]
    let FetchDimRelsAR_        token (dimension: Dimension) =
        RpcWithTokenValidation token <| fun user client dc ->
            Rop.flow {
                let! keys, rowsF   = getTableInfoR user dc (DimensionTable dimension)
                let! data, columns = rowsF ()
                let! elements      = dimension.ElementsR_ dc
                let! rels          = dimension.ElemElemsR_ dc
                let! attributes    = dimension.AttributesR_()
                let! attValues     = dimension.AttValsR_()
                let aTyp2Str aTyp  = match aTyp with
                                     | 0s -> "string"
                                     | 1s -> "int"
                                     | 2s -> "Date"
                                     | 3s -> "bool"
                                     | _  -> "Object"
                let  columnsAtt    = attributes
                                     |> Array.mapi(fun i att -> 
                                                      Column(
                                                            id          = att.attribute_code.ToString()
                                                            ,field      = (i + 5)
                                                            ,name       = att.attribute_name
                                                            ,dataType   = aTyp2Str att.attribute_type
                                                            ,selectable = true
                                                            ,resizable  = true
                                                            ,focusable  = true
                                                            ,sortable   = true
                                                      )
                                                 )
                                     |> Array.append columns
                let  elements      = elements 
                                     |> Array.map(fun elem ->
                                         elem.dimension_code
                                        ,elem.element_code
                                        ,elem.element_name
                                        ,elem.element_description
                                        ,elem.element_order
                                        ,attributes
                                         |> Array.map(fun att ->
                                            attValues
                                            |> Array.tryFind(fun attVal -> attVal.attribute_code = att.attribute_code && attVal.element_code = elem.element_code)
                                            |> Option.map(fun v -> v.value_string |> Option.defaultV "") |> Option.defaultV ""
                                            |> box
                                         )
                                      )
                let  rels          = rels     |> Array.map(fun rel  -> (rel.child_code, rel.parent_code, rel.weight, rel.child_order))
                return elements, columnsAtt, keys, rels
            }

    [<Rpc>]
    let SaveRelsDataAR_        token (dimension: Dimension) (deleted : string [][], changed : string [][], added : string [][]) (relations: (string * string) []) =
        RpcSaveWithTokenValidation token <| fun guest user client dc -> 
            Rop.flow {
                let! dimensionName = dimension.nameR_ dc
                let! dimension     = client.dimByNameR_ dimensionName
                let! result        = dimension.saveRelsDataR_ (toObjArrArray_ deleted) (toObjArrArray_ changed) (toObjArrArray_ added) relations
                return guest, result
            }


    open Alea

    let aleaServer (client: Client) dc f =
        let serverR = client.serverOlapByIdR_ "MainModel"
        let rec funcRetry retry (server: ServerOlap) =
            server.connectR_ dc |> ignore
            f                server
            |> function | Failure([ErrAleaError(1020999,_)]) when retry ->
                            let res = server.disconnectR_ dc
                            funcRetry false server
                        | r -> r
        serverR |> Rop.bindR (funcRetry true)
        

    [<Rpc>]
    let UpdateOLAPDimensionAR_ token (dimension: Dimension) =
        RpcSaveWithTokenValidation token <| fun guest user client dc ->
            aleaServer client dc <| fun server ->
            Rop.flow {
                let! result           = if guest then ErrGuestUserNotActivated |> Rop.fail else () |> Rop.succeed
                let  dimOlap          = (dimension.name_ (DataCache()), server) |> DimOlap
                let attTable          = AttTableOlap(1s, dimOlap)
                let! elements         = dimension.ElementsR_ dc
                let! rels             = dimension.ElemElemsR_ dc
                let! res              = dimOlap.editBeginR_ dc true None
                let  elements2        = elements
                                        |> Seq.sortBy (fun elem -> sortOrder elem.element_order elem.element_name)
                                        |> Seq.cache
                let! res              = elements2
                                        |> Seq.map    (fun elem -> dimOlap.addElementR_ dc "N" elem.element_name "" 1.0)
                                        |> Rop.seqCheck
                let  getElement_ code = elements2 |> Seq.find(fun elem -> elem.element_code = code)
                let  rels2            = rels
                                        |> Seq.map    (fun rel -> 
                                            let child  = rel.child_code |> getElement_
                                            let parent = rel.parent_code |> getElement_
                                            child.element_name, parent.element_name, rel.weight |> Option.defaultV 1.0, rel.child_order |> Option.defaultV (child.element_order |> Option.defaultV child.element_name))
                                        |> Seq.sortBy (fun (_, _, _, order) -> order)
                let! res              = rels2
                                         |> Seq.map(fun (child, parent, weight, _) -> dimOlap.addElementR_ dc "N" child parent weight)
                                         |> (fun names -> if   names |> Seq.exists(function | Failure _    -> true    | _ -> false)
                                                          then names |> Seq.pick  (function | Failure ms   -> Some ms | _ -> None ) |> Failure
                                                          else names |> Seq.map   (function | Success(v,_) -> v       | _ -> false) |> Rop.succeed
                                         )
                let! res              = dimOlap.editCommitR_ dc true
                let! attribs          = dimension.AttributesR_()
                let  getAttrib_ code  = attribs |> Seq.find(fun attr -> attr.attribute_code = code)
                let getDes des name   = des |> Option.defaultV name
                let checkField (aField: AttFieldOlap) descP aTypP lengP decP =
                                    Rop.flow {
                                        let! desc   = aField.getInfoDescR_    dc
                                        let! aTyp   = aField.getInfoAtypR_    dc
                                        let! leng   = aField.getInfoLengthR_  dc
                                        let! dec    = aField.getInfoDecimalR_ dc
                                        return desc = descP && aTyp = aTypP && leng = lengP && dec = decP
                                    } |> function Success _ -> true | _ -> false
                let  descF            = AttFieldOlap("desc" , attTable)
                let  orderF           = AttFieldOlap("order", attTable)
                let  verify           = attribs
                                        |> Seq.forall (fun attr -> 
                                            let aField = AttFieldOlap(attr.attribute_name, attTable)
                                            checkField aField (getDes attr.attribute_description attr.attribute_name) attr.attribute_type attr.attribute_length attr.attribute_precision 
                                        )
                                        && checkField descF  "Description" 0s 200s 0s
                                        && checkField orderF "Order"       0s  50s 0s
                if not verify then
                    let  res          = attTable.deleteR_      dc
                    let! handle       = attTable.createBeginR_ dc
                    let! res          = attTable.fieldAddR_ handle descF.name  "Description" 0s 200s 0s
                    let! res          = attTable.fieldAddR_ handle orderF.name "Order"       0s  50s 0s
                    let! res          = attribs
                                        |> Seq.map (fun attr -> attTable.fieldAddR_ handle attr.attribute_name (getDes attr.attribute_description attr.attribute_name) attr.attribute_type attr.attribute_length attr.attribute_precision)
                                        |> Rop.seqCheck
                    let! res          = attTable.createCommitR_ handle
                    ()
                let! attValues        = dimension.AttValsR_()
                let putVal elem (aField: AttFieldOlap) v len = 
                                    v |> Option.map (fun v -> aField.putValueR_ dc (left len v) elem)
                                      |> Option.defaultV (true |> Rop.succeed)
                let! res              = elements2
                                        |> Seq.map (fun elem ->
                                           let d = putVal elem.element_name descF  elem.element_description 200
                                           let o = putVal elem.element_name orderF elem.element_order        50
                                           d
                                        )
                                        |> Rop.seqCheck
                let! res              = attValues
                                        |> Array.map (fun attV ->
                                           let elem = getElement_ attV.element_code
                                           let attr = getAttrib_  attV.attribute_code
                                           let aField = AttFieldOlap(attr.attribute_name, attTable)
                                           putVal elem.element_name aField attV.value_string (attr.attribute_length |> int)
                                        )
                                        |> Rop.seqCheck
                return sprintf "Dimension %s updated" dimOlap.name
            }
//            } |> function | Success(v,ms) -> Success(v,ms) | Failure ms -> Failure(trace @ ms)

    [<Rpc>]
    let FetchCubeOlapDimsAR_ token (cube: CubeOlap) =
        RpcWithTokenValidation token <| fun user client dc ->
            aleaServer client dc <| fun server ->
            Rop.flow {
                let! dims   = cube.dimensionsR_ dc
                let! inputs = dims
                              |> Array.map(fun dim ->
                                  dim.inputsR_ dc
                              )
                              |> Rop.seqCheck
                let  vals   = inputs
                              |> Seq.map Seq.head
                              |> Seq.toArray
                return dims, vals
            }

    [<Rpc>]
    let FetchElemOlapAR_ token (dim: DimOlap) =
        RpcWithTokenValidation token <| fun user client dc ->
            aleaServer client dc <| fun server ->
                Rop.flow {
                    let! elements = dim.elementsR_ dc
                    let! result   = elements 
                                    |> Array.map (fun eOlap -> eOlap.childrenR_ dc |> Rop.mapR (fun children -> eOlap, children))
                                    |> Rop.seqCheck
                    return result |> Seq.toArray
                }

    [<Rpc>]
    let UploadCubeDataAR_ token (cube: CubeOlap) (data: (string * string[]) []) =
        RpcSaveWithTokenValidation token <| fun guest user client dc ->
            aleaServer client dc <| fun server ->
            Rop.flow {
                let! result           = if guest then ErrGuestUserNotActivated |> Rop.fail else () |> Rop.succeed
                let! dims             = cube.dimensionsR_ dc
                let  defVal, defElems = data |> Seq.head
                let! res              = CubeOlap.bulkTransferBeginR_ 0
                let  added, rejected  = data
                                        |> Seq.skip 1
                                        |> Seq.map(fun (value, elems) ->
                                            elems |> Array.iteri(fun i elem -> if elem = null || elem.Trim() = "" then elems.[i] <- defElems.[i])
                                            let mutable rowR: Array = elems :> Array
                                            match cube.putValueExR_ dc value (ref rowR) with
                                            | Success(true, _) -> (1, 0)
                                            | _                -> (0, 1)
                                        )
                                        |> Seq.reduce (fun (g, b) (g', b') -> g + g', b + b')
                let result    = ref ""
                let! res              = CubeOlap.bulkTransferCommitR_ 0 false result
                return sprintf "Data Uploaded: %d accepted, %d rejected %s" added rejected result.contents
            }


    [<Rpc>]
    let ReplicateClientAR_       token =
        RpcWithTokenValidation token <| fun user client dc -> Replicate.replicateClientR_ client

