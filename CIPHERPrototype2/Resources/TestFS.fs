namespace CIPHERPrototype1

open WebSharper
open Model
open Model2
open Rop
open ReactHtml

[<JavaScript>]
module TestFS =

    type Model = {
        text   : string
        token  : Auth.Token
        files  : FileInfo[]
        folders: Folder[]
    }
    let update (a:string) (b:Model) = { b with text = a }

    let viewFile (file: FileInfo) =
        Li [ Key   <| file.id.ToString()
             NText <| sprintf "%A" file
           ]

    let viewFiles (files: FileInfo[]) =
        files 
        |> Array.map viewFile
        |> Div

    let showForm_  container =
        let view (model: Model) (processMessages: (string)->unit) =
            Div [ Class "col-md-6"
                  Div [ H6  [ NText "Foundation for" ]
                        Fields.textWoValidator   "Enter:" model.text processMessages [ Placeholder "just type some text..." ; MaxLength 150 ]
                        H2  [ NText <| sprintf "%s: %A" model.text model.files.Length ]
                        viewFiles model.files
                        Img [ Src "/EPFile/image/inky-template.svg" ]
                        P   [ NText "Our email framework helps you craft responsive HTML emails that can be read anywhere on any device. Foundation for Emails helps navigate the how different email clients handle HTML and provide tested patterns that work with Outlook as well as all the other major email clients." ]
                        P   [ Class "link"; NText "Learn more about Foundation for Emails" ]
                      ]
                ]

        Server.call {
            let! token          = Server.fetchTokenAR_()
            let! folders, files = UploadFormServer.GetFilesInfoAR_ token
            let initModel = {
                text               = ""
                token              = token
                folders            = folders
                files              = files
            }
            App.app
                <| initModel
                <| update
                <| view 
            |> App.run container
        }

