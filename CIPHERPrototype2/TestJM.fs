namespace CIPHERPrototype1
open Model

module TestJM =
    open System
    open System.Data
    open System.Data.SqlClient
    open WebSharper.Html.Server
    open Rop

    let GetDataR client dc =
        Rop.flow {
            use! conn    = Server.GetConnectionR client dc
            let  query   = "select id, name, alre from tblAccounts"
            use  command = new SqlCommand(query, conn)
            let  table   = new DataTable()
            let  sda     = new SqlDataAdapter(command)
            let  result  = sda.Fill(table)
            return         table
        }

    let PrepareData (table:DataTable) :Element = 
        let result = 
            Tags.Table [Class "table"] -< [
                Tags.TR [
                    TH [Text "id"]
                    TH [Text "name"]
                    TH [Text "alre"]
                    ]
                ]
        result -< (
            table.Select() |> Array.map(
                fun dr -> 
                    TR [
                        TD [Text (dr.["id"].ToString())] 
                        TD [Text (dr.["name"].ToString())] 
                        TD [Text (dr.["alre"].ToString())] 
                        ]))

    let htmlMessages ms = 
        ms 
        |> Seq.map (fun m -> Div [ Text (sprintf "%A" m)]) 
        |> Seq.toList
        |> Div

    let RenderData client dc =
        Rop.flow {
            let! data = GetDataR client dc
            return 
                Div [Attr.Class "flexgrow"]
                    -< [PrepareData data]
        } |> function
                | Success (html, n) -> html
                | Failure ms        -> htmlMessages ms

    let RenderHomePage_ () =
        let CreateCard_ (imageURL:string) (title:string) (content:string) =
            Div [Class "col-lg-3 col-md-4"]
                -< [
                   Div [Class "thumbnail"]
                      -< [
                         Img [Class "img-responsive"] -< [Src imageURL]
                         Div [Class "caption"]
                            -< [
                               H3 [Text title]
                               P [Text content]
                               A [Class "btn btn-primary"] -< [Text "Go"]
                               ]
                         ]
                   ]

        let card_content =
            "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id " +
            "elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies " +
            "vehicula ut id elit."

        Div [Class "container"]
            -< [ 
                Div [Class "row"]
                    -< [ Div [Class "col-md-12"]
                            -< [ Div [Class "jumbotron"]
                                    -< [ 
                                        H1 [Text "Welcome to CipherSpace"]
                                        H2 [Text "Everything you need for your Financial Analysis, all in one place"]
                                       ]
                                ]
                        ]
                Div [Class "row"]
                    -< [
                        CreateCard_ "/EPFile/images/financial_statements.png" "Financial Statements" card_content
                        CreateCard_ "/EPFile/images/administration.png"       "Administration"       card_content
                        CreateCard_ "/EPFile/images/modeling.png"             "Modeling"             card_content
                        CreateCard_ "/EPFile/images/configuration.png"        "Configuration"        card_content
                        CreateCard_ "/EPFile/images/agenda.png"               "Agenda"               card_content
                        ]
                ]