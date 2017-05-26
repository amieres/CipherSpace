namespace CIPHERPrototype1
open Model
open Model2
open FSharp.Data
open FSharp.Data.SqlClient
open Rop
open Repository


module Replicate =
    type private QFKChildren    = SqlCommandProvider<"SELECT schema_ref = sr.name
                                                           ,  table_ref =  r.name
	                                                       , schema_chi = sc.name
                                                           ,  table_chi =  c.name
                                                           ,               k.name
	                                                       ,  k.parent_object_id
	                                                       ,  k.referenced_object_id
                                                        FROM sys.foreign_keys k
                                                        inner join Sys.objects c  on  c.[object_id] = k.parent_object_id
                                                        inner join Sys.schemas sc on sc.[schema_id] = c.[schema_id]
                                                        inner join Sys.objects r  on  r.[object_id] = k.referenced_object_id
                                                        inner join Sys.schemas sr on sr.[schema_id] = r.[schema_id]
                                                        WHERE sr.name = @schema and r.name = @table", designCS>

    type private QFKParents     = SqlCommandProvider<"SELECT schema_ref = sr.name
                                                           ,  table_ref =  r.name
	                                                       , schema_chi = sc.name
                                                           ,  table_chi =  c.name
                                                           ,               k.name
	                                                       ,  k.parent_object_id
	                                                       ,  k.referenced_object_id
                                                           ,  k.[object_id]
                                                        FROM sys.foreign_keys k
                                                        inner join Sys.objects c  on  c.[object_id] = k.parent_object_id
                                                        inner join Sys.schemas sc on sc.[schema_id] = c.[schema_id]
                                                        inner join Sys.objects r  on  r.[object_id] = k.referenced_object_id
                                                        inner join Sys.schemas sr on sr.[schema_id] = r.[schema_id]
                                                        WHERE sc.name = @schema and c.name = @table", designCS>

    type private QTBColumns      = SqlCommandProvider<"SELECT schema_table = sc.name
                                                            ,  table_name   = tb.name
                                                            ,               cl.*
                                                         FROM sys.columns cl
                                                   inner join Sys.objects tb on tb.[object_id] = cl.[object_id]
                                                   inner join Sys.schemas sc on sc.[schema_id] = tb.[schema_id]
                                                        WHERE sc.name = @schema and tb.name = @table", designCS>

    type private QFKColumns     = SqlCommandProvider<"WITH Columns as (
                                                            SELECT schema_table = sc.name
                                                                ,  table_name   = tb.name
                                                      		    ,  table_id     = tb.[object_id]
                                                                ,               cl.*
                                                             FROM Sys.columns cl
                                                       inner join Sys.objects tb on tb.[object_id] = cl.[object_id]
                                                       inner join Sys.schemas sc on sc.[schema_id] = tb.[schema_id]
                                                      )
                                                      , Rels as (
                                                      SELECT parent_schema = r.schema_table
                                                            ,parent_table  = r.table_name
                                                            ,parent_column = r.name
                                                            ,child_schema  = c.schema_table
                                                            ,child_table   = c.table_name
                                                            ,child_column  = c.name
                                                            ,constraint_object_id
                                                            ,constraint_column_id
		                                                    ,rel_name = f.name
                                                        FROM sys.foreign_key_columns k
	                                                    inner join sys.foreign_keys f on f.[object_id] = k.constraint_object_id
                                                        inner join Columns c on c.table_id  = k.parent_object_id
                                                                            AND c.column_id = k.parent_column_id
                                                        inner join Columns r on r.table_id  = k.referenced_object_id
                                                                            AND r.column_id = k.referenced_column_id)
                                                       SELECT * FROM Rels
                                                       WHERE constraint_object_id = @constrainId", designCS>

    type private QPKColumns     = SqlCommandProvider<"SELECT schema_table = sc.name
                                                          ,  table_name   = tb.name
                                                		  ,  column_name  = cl.name
                                                          ,  column_type  = cl.system_type_id
                                                       FROM Sys.columns       cl
                                                 inner join Sys.objects       tb ON tb.[object_id] = cl.[object_id]
                                                 inner join Sys.schemas       sc ON sc.[schema_id] = tb.[schema_id]
                                                 inner join Sys.indexes       ix ON ix.[object_id] = tb.[object_id]
                                                 inner join Sys.index_columns ic ON ic.[object_id] = tb.[object_id]
                                                                                AND ic.index_id    = ix.index_id
                                                								AND ic.column_id   = cl.column_id
                                                      WHERE sc.name = @schema and tb.name = @table
                                                	    AND is_primary_key = 1", designCS>

    type private QUpdateAtt   = SqlCommandProvider<"UPDATE Attribute_Value SET value_string = @newValue 
                                                      WHERE attribute_code = @attCode and element_code = @elemCode", designCS>


    type RTable  = RTable  of string * string
    type RColumn = RColumn of RTable * string 
    type RKey    = RKey    of RTable * Map<RColumn, KeyValue>
    type RRow    = System.Collections.Generic.Dictionary<string, obj>

    type KDict = System.Collections.Generic.Dictionary<RKey, RKey>

    let getRecords key : System.Data.DataTable =
        match key with 
        RKey(RTable(schema, tableN), keyVals) ->
            use  conn              = new System.Data.SqlClient.SqlConnection(actualCS)
            conn.Open()
            let select             = keyVals
                                     |> Map.toArray
                                     |> Array.map(function (RColumn(_, col), _) -> sprintf "[%s] = @%s" col col)
                                     |> String.concat " AND "
                                     |> sprintf "SELECT * FROM [%s].[%s] WHERE %s" schema tableN
            use  selectCm          = new System.Data.SqlClient.SqlCommand(select, conn)
            keyVals 
            |> Map.toArray
            |> Array.iter(function (RColumn(_, col), v) -> selectCm.Parameters.AddWithValue("@" + col, v) |> ignore)
            use  adapter           = new System.Data.SqlClient.SqlDataAdapter(selectCm)
            let  table             = new System.Data.DataTable()
            adapter.Fill             table                      |> ignore
            table

    let insertRow table (row: RRow) =
        match table with
        RTable(schema, name) ->
            let cols = row.Keys |> Seq.map(fun col -> sprintf "[%s]" col) |> String.concat ", "
            let vals = row.Keys |> Seq.map(fun col -> sprintf "@%s"  col) |> String.concat ", "
            use  conn              = new System.Data.SqlClient.SqlConnection(actualCS)
            conn.Open()
            let insert             = sprintf "INSERT INTO [%s].[%s] (%s) VALUES(%s)" schema name cols vals
            use  cmd               = new System.Data.SqlClient.SqlCommand(insert, conn)
            row.Keys |> Seq.iter(fun col -> cmd.Parameters.AddWithValue("@" + col, row.[col]) |> ignore)
            cmd.ExecuteNonQuery() |> ignore

    let getRecord key =
        use data = getRecords key
        Seq.zip
            (data.Columns |> Seq.cast<System.Data.DataColumn> |> Seq.map(fun col -> col.ColumnName))
            data.Rows.[0].ItemArray
        |> Map

    let getPrimaryKeyFromRow table (row: System.Data.DataRow) = 
        match table with
        RTable(schema, tableN) ->
            use cmd  =  new QPKColumns(actualCS)
            let cols =  cmd.Execute(schema, tableN)
            RKey(table, cols 
                        |> Seq.map(fun col -> 
                                RColumn(table, col.column_name |> Option.defaultV "")
                                , row.Item(col.column_name |> Option.defaultV "") |> unbox<System.IComparable>)
                        |> Map.ofSeq)

    let getChildrenTables table= 
        match table with
        RTable(schema, name) ->
            use cmd        = new QFKChildren(actualCS)
            let children   = cmd.Execute(schema, name)
            children |> Seq.map(fun child -> RTable(child.schema_chi, child.table_chi))

    let getParentTables   table = 
        match table with
        RTable(schema, name) ->
            use cmd        = new QFKParents(actualCS)
            let parents    = cmd.Execute(schema, name)
            parents |> Seq.map(fun parent -> RTable(parent.schema_ref, parent.table_ref), parent.object_id)

    let getForeignKeys table (row: Lazy<Map<string, obj>>)  =
        getParentTables  table
        |> Seq.choose(function 
            (RTable(schemaP, nameP) as tableP, relId)->
                match table with
                RTable(schema, name) ->
                    use cmd        = new QFKColumns(actualCS)
                    let columns    = cmd.Execute(relId)
                    if columns |> Seq.exists(fun col -> row.Value.Item(col.child_column  |> Option.defaultV "") = box System.DBNull.Value) 
                    then None
                    else Some(
                              RKey(tableP, columns 
                                           |> Seq.map(fun col -> 
                                                let colP = col.parent_column |> Option.defaultV ""
                                                let colC = col.child_column  |> Option.defaultV ""
                                                RColumn(tableP, colP), row.Value.Item colC |> unbox<System.IComparable>) |> Map.ofSeq)
                            , RKey(table , columns 
                                           |> Seq.map(fun col -> 
                                                let colC = col.child_column  |> Option.defaultV ""
                                                RColumn(table , colC), row.Value.Item colC  |> unbox<System.IComparable>) |> Map.ofSeq)
                            , columns
                              |> Seq.map(fun col -> 
                                  let colP = col.parent_column |> Option.defaultV ""
                                  let colC = col.child_column  |> Option.defaultV ""
                                  colC, colP)
                              |> Map.ofSeq
                            )
        )

    let getMatchingForeignKeys table fKey =
        match fKey with 
        RKey(RTable(schemaP, nameP) as tableP, keyVals) ->
            getParentTables table
            |> Seq.choose(function 
                | (RTable(schemaK, nameK), relId) when schemaK = schemaP && nameP = nameK ->
                    use cmd        = new QFKColumns(actualCS)
                    let columns    = cmd.Execute(relId)
                    Some(RKey(table, columns
                                     |> Seq.map(fun col -> 
                                            let colP = col.parent_column |> Option.defaultV ""
                                            let colC = col.child_column  |> Option.defaultV ""
                                            RColumn(table, colC), keyVals.Item (RColumn(tableP, colP))
                                        )
                                     |> Map.ofSeq))
                | _ -> None
            )

    let rec newParentKey (dc: KDict) key =
        match dc.ContainsKey key with
        | true  -> dc.Item key
        | false -> 
            let row       = lazy getRecord key
            match key with
            RKey(table, keyVals) ->
                getForeignKeys table row
                |> Seq.exists(fun (parentKey, _, _) ->
                    let newKey = newParentKey dc parentKey
                    newKey <> parentKey
                ) 
                |> function
                   | true  -> createNewRecord dc key
                   | false -> key
               
    and    createNewRecord   (dc: KDict) sourceKey =
        match sourceKey with
        RKey(table, keyVals) ->
            let row        = new Lazy<Map<string, obj>>((fun () -> getRecord sourceKey), false)
            let newRow     = RRow()
            row.Value |> Map.iter(fun col v -> newRow.Add(col, v))
            let newKeyVals = keyVals
                             |> Map.toSeq
                             |> Seq.map(function 
                                (RColumn(_, col), v)  ->
                                    let newVal = System.Guid.NewGuid()
                                    newRow.Item(col) <- newVal
                                    RColumn(table, col), newVal :> System.IComparable)
                             |> Map.ofSeq
            dc.Add(sourceKey, RKey(table, newKeyVals))
            let fKeys    = getForeignKeys table row
            fKeys
            |> Seq.iter(fun (parentKey, childKey, colMap) ->
                let newKey = newParentKey dc parentKey
                match (childKey, newKey) with
                (RKey(_, childKeyVals), RKey(tableP, newKeyVals)) ->
                    childKeyVals
                    |> Map.toSeq
                    |> Seq.iter(function (RColumn(_, col), _) -> newRow.Item(col) <- newKeyVals.Item(RColumn(tableP, colMap.Item(col)))) 
            )
            insertRow table newRow
            getChildrenTables table
            |> Seq.iter (fun child -> copySourceRecords dc child sourceKey)
            RKey(table, newKeyVals)

    and     getNewKey        (dc:KDict) sourceKey =
        match dc.ContainsKey sourceKey with
        | true  -> dc.Item sourceKey
        | false -> createNewRecord dc sourceKey  

    and     copySourceRecords dc table sourceParentKey =
        getMatchingForeignKeys table sourceParentKey
        |> Seq.iter (fun key ->
            use data = getRecords key
            data.Rows 
            |> Seq.cast<System.Data.DataRow>
            |> Seq.iter(fun sourceRow ->
                let sourceKey  = getPrimaryKeyFromRow table sourceRow
                getNewKey   dc sourceKey |> ignore
            )
        )

    let replaceNavigation (client:Client)  (dc:KDict) =
        Rop.flow {
            let  dict = dc.Keys
                        |> Seq.choose(fun key -> match key, dc.Item(key) with
                                                 RKey(_, keyF), RKey(_, keyT) ->
                                                    if keyF.Count = 1
                                                    then
                                                        let keyVF = keyF |> Map.toSeq |> Seq.head
                                                        let keyVT = keyT |> Map.toSeq |> Seq.head
                                                        match keyVF, keyVT with
                                                        (_, vF), (_, vT) -> Some(unbox<System.Guid> vF, unbox<System.Guid> vT)
                                                    else None
                                     )
                        |> Map.ofSeq
            let! _Navigation = client.dimByNameR_ "_Navigation"
            let! attributes  = _Navigation.AttributesR_  ()
            let! attCPage    = attributes |> Array.tryFind(fun attr -> attr.attribute_name = "ContentPage") |> Rop.fromOption (ErrRecordNotFound("Attribute", "ContentPage"))
            let! pageLinks   = _Navigation.AttValsByIdR_  attCPage.attribute_code
            let  cmd         = new QUpdateAtt(actualCS)
            let  pattern     = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
            let  regex       = new System.Text.RegularExpressions.Regex(pattern, System.Text.RegularExpressions.RegexOptions.IgnoreCase)
            let rec replaceR input list =
                let m = regex.Match(input)
                if m.Success
                then 
                    let newV = m.Value |> System.Guid |> dict.TryFind
                               |> function
                                   | None   -> m.Value
                                   | Some v -> v.ToString()
                    let rest    = input.Substring(m.Index + m.Length)
                    let newList = newV :: (input |> left m.Index)  :: list
                    replaceR rest newList 
                else input :: list
            let replace input = replaceR input [] |> List.rev |> String.concat ""
            let! r =
                pageLinks
                |> Seq.map(fun attV ->
                    attV.value_string 
                    |> Option.map(fun value ->
                        let newValue = replace value
                        if newValue <> value then
                            let nRecs = cmd.Execute(newValue, attV.attribute_code, attV.element_code)
                            nRecs = 1 |> Rop.assertR <| ErrRecordWasNotUpdated newValue
                        else Rop.succeed ()
                    ) |> Option.defaultV (Rop.succeed ())
                )
                |> Rop.seqCheck
            ()
        }

    let replicateClientR_ (client:Client) =
        Rop.flow {
            do!  Rop.tryProtection()
            let  dc = KDict()
            let  table = RTable("CS", "Client")
            let  key   = RKey(table, Map [ RColumn(table, "client_code"), client.clientCode :> System.IComparable ])
            let  newKey = createNewRecord dc key
            let  newClient =
                match newKey with
                RKey(_, m) -> m.Item(RColumn(table, "client_code")) |> unbox<System.Guid> |> Client
            do!  replaceNavigation newClient dc
            return newClient
        }

