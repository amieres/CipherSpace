//#load /FScript/Layouts.fsx
//#load /FScript/menu.fsx
//#load /FScript/DimensionEditor.fsx
#load          @"Layouts.fsx"
#load          @"menu.fsx"
#load          @"DimensionEditor.fsx"

namespace CIPHERSpace

open WebSharper
open WebSharper.JavaScript
open Model
open Model2
open Rop
open ReactHtml


[<JavaScript>]
module SearchFlickr =

    type Props    = App.Dummy

    type Model    = { 
                      search   : string 
                      images   : string list
                      vertical : bool
                    }

    let init = {
                      search   = "cats"     
                      images   = []
                      vertical = false
                    }
    
    type Message =
                   | Search of string
                   | Images of string list
                   | Vertical 

    let update (props: Props) (msg: Message)  model =
        match msg with
                   | Search   s  -> { model with search   = s                  }
                   | Images   is -> { model with images   = is                 }
                   | Vertical    -> { model with vertical = not model.vertical }

    [< Inline """$.getJSON($url, $obj)""">]
    let jQueryGetJSON (url:obj) (obj:obj) : unit = X<_>

    module Impure =
      let getJSON cb  url       = jQueryGetJSON url cb

    let mediaUrl :obj->string   = prop "media" >> prop "m"
    let srcs  :obj->string list = prop "items" >> Array.map mediaUrl >> Seq.toList
                                
    let url t   = "http://api.flickr.com/services/feeds/photos_public.gne?tags=" + t + "&format=json&jsoncallback=?"
    let img src = Img [Src src ]

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        let processJSON : obj -> unit = srcs >> Images >> processMessages
        let lefts =
            [ _Style [ _minWidth "222px"; _overflow "hidden" ]
              Input  [Type "text"    ; Value model.search          ] |> OnChange (prop "target" >> prop "value" >> Search >> processMessages)
              Input  [Type "button"  ; Value "search"              ] |> OnClick  (fun _ -> model.search |> url |> Impure.getJSON processJSON)
              Br     []
              Input  [Type "checkbox"; Checked      model.vertical ] |> OnChange (fun _ -> Vertical |> processMessages)
              NText  "vertical"
              Br     []
              Input  [Type "checkbox"; Checked (not model.vertical)] |> OnChange (fun _ -> Vertical |> processMessages)
              NText  "horizontal"
              Br     []
            ]
        let images = model.images |> List.map img |> (fun l -> _Style [ _display "block" ] :: l) 
        Layouts.app.node (Layouts.PropsC.New(contents   = images
                                            ,header     = H2 [ NText "Search Flickr"]
                                            ,footer     = H3 [ NText "CIPHER BSC."  ]
                                            ,lefts      = lefts
                                            ,right      = H1 [ NText "HI"           ]
                                            ,horizontal = (not model.vertical)
                                        ))

    let app = App.App(init, update, view)

    let test node = app.run App.DummyNew node


[<JavaScript>]
module Test =

    type Props    = App.Dummy
    
    type Model    = App.Dummy

    type Message  = App.Dummy

    let update (props: Props) (msg: Message)  model = App.DummyNew

    let text txt    = [ H3 [NText txt] ; _Style [_background txt] ]

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        let search   = SearchFlickr.app.node App.DummyNew
        let contents = [ 
                         DimensionCombo.node None
                         Div [ search   ; _Style [ _background "lightsalmon" ; _display "flex" ;  _flex "1 1 0%"] ]
                       ]
        Layouts.app.node (Layouts.PropsC.New(contents   = contents
                                           , header     = MenuBar.app.node      App.DummyNew
                                           , footers    = text "green"
                                           , lefts      = text "blue"
                                           , rights     = text "yellow"
                                           , horizontal = true
                                           , stretch    = true
                                            ))

    type BootstrapLoader() = inherit WebSharper.Core.Resources.BaseResource("http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/"
                                                                            ,  "css/bootstrap.min.css"
                                                                            ,  "js/bootstrap.min.js")
                                
    type MainCssLoader()   = inherit WebSharper.Core.Resources.BaseResource("/EPFile/css/main.css")
                                
    [< Require(typeof<BootstrapLoader>) ; Require(typeof<MainCssLoader>) >]
    type Loader [< JavaScript ; Inline "{}" >]  () = [< DefaultValue >] val mutable xx : string

    let showForm_ node =
        let loader = Loader()
        let app = App.app App.DummyNew update view
        app.run App.DummyNew node

    let dimCombo node = 
        MainForm.run 
        <| DimensionCombo.node None
        <| node

    let dimCombo2 node =
        DimEditor.run 
        <| Some MainForm.leftAndContentNode 
        <| node


