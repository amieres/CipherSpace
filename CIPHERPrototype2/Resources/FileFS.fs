namespace CIPHERPrototype1

open WebSharper
open Model
open Model2
open Rop
open ReactHtml

[<JavaScript>]
module TestFS =

    let viewFile (file: FileInfo) =
        Div [ Class "label-warning"
              A [ Href  <| sprintf "/EPFile/%s/%s" file.folderName file.name
                  NText <| sprintf "%s/%s" file.folderName file.name
                ]
            ]

    let viewFiles (files: FileInfo[]) =
        files 
        |> Seq.sortBy (fun f -> f.folderName.ToLower(), f.name.ToLower())
        |> Seq.map viewFile |> Seq.toList
        |> Div



