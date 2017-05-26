//#load /FScript/Layouts.fsx
#load          @"Layouts.fsx"

namespace CIPHERSpace

open WebSharper
open WebSharper.JavaScript
open Model
open Model2
open Rop
open ReactHtml


[<JavaScript>]
module MenuBar =
    
    type MenuEntry = {
                      id          : System.Guid
                      name        : string
                      description : string 
                      order       : string 
                      template    : string option
                      content     : string option
                      children    : MenuEntry list
    }

    type Props    = App.Dummy

    type Model    = { 
                      entries    : MenuEntry list
                    }

    let init = { entries = [] }

    type Message =
        | SetMenuEntries       of MenuEntry list

    let update (props: Props) (msg: Message)  model =
        match msg with
        | SetMenuEntries es  -> { model with entries = es }

    let loadMenuEntriesW_ token navDim =
        ARop.wrap {
            let! elements, columns, keys, rels = Server.FetchDimRelsAR_  token navDim
            let  getColO_ colname              = columns  |> Seq.choose(fun col -> if col.name = colname then col.field |> unbox<int> |> Some else None) |> Seq.tryHead
            let  getElement (eid: System.Guid) = elements |> Seq.tryFind (fun (_, id, _, _, _, _) -> eid = id)
            let rec menuEntry eid              = getElement eid |> Option.map(fun (_, id, name, desc, order, attribs:obj[]) ->
                                                    {
                                                        id          = eid
                                                        name        = name
                                                        description = desc  |> Option.filter (fun s -> s.Trim() <> "") |> Option.defaultV name
                                                        order       = order |> Option.filter (fun s -> s.Trim() <> "") |> Option.defaultV name
                                                        template    = getColO_ "TemplatePage" |> Option.map (fun i -> attribs.[i - 5] |> unbox)
                                                        content     = getColO_ "ContentPage"  |> Option.map (fun i -> attribs.[i - 5] |> unbox)
                                                        children    = getChildren eid |> Seq.sortBy (fun (c, o) -> Option.defaultV c.order o) |> Seq.map fst |> Seq.toList
                                                    }
                                                 )
            and  getChildren   eid             = rels |> Seq.choose(fun (child, parent, _, order) -> if eid = parent then menuEntry child |> Option.map (fun e -> (e, order)) else None)
            return
                elements 
                |> Seq.choose (fun (_, eid, _, _, _, _) -> if rels |> Seq.exists(fun (child, _, _, _) -> child = eid) |> not then menuEntry eid else None) 
                |> Seq.sortBy (fun e -> e.order) |> Seq.toList
        }

    let menu (model: Model) name classes = 
        let entries = model.entries |> Seq.choose (fun e -> if e.name = name then Some e.children else None) |> Seq.tryHead |> Option.defaultV []
        let rec dropDown level (e:MenuEntry) =
            Li [ 
                 A [ 
                     yield Span [ NAttribute("dangerouslySetInnerHTML", newAttr "__html" e.description :> obj) ]
                     //yield Span [ NText e.description ]
                     match e.content with | Some content when content.Trim() <> "" -> yield Href ("/EPContent/CPEntry/" + e.name) | _ -> ()
                   ]
                 |> addChildren
                      (if e.children.Length = 0 then []
                       else [ Class "dropdown-toggle"
                              NewAttr "role" "button"
                            ])
                 |> addChildren
                      (if e.children.Length = 0 || level > 0 then []
                       else [ Span [ Class "caret"] ])
               ] 
            |> addChildren
                  (if e.children.Length = 0 then []
                   else [ Class (if level > 0 then "dropdown-submenu" else "dropdown")
                          Ul [ Class "dropdown-menu" ] 
                          |> addChildren (e.children |> Seq.map (dropDown (level + 1))) 
                        ])
        Ul [ Class classes ]
        |> addChildren (entries |> Seq.map (dropDown 0))


    let getDimByNameR_ dimensions dimName =
        dimensions 
        |> Seq.choose (fun (dim, cc, name, desc) -> if name = dimName then Some dim else None) 
        |> Seq.tryHead
        |> Rop.fromOption (ErrRecordNotFound ("dimension", dimName))

    let view (props:Props) (model: Model) (processMessages: Message -> unit) =
        let loadData (_:obj) =
            ARop.wrap {
                do!  Rop.tryProtection()
                let! token      = Server.fetchTokenAR_()      
                let! dimensions = Server2.fetchDimensionsAR_()
                let! navDim     = getDimByNameR_ dimensions "_Navigation"
                let! entries    = loadMenuEntriesW_ token navDim
                SetMenuEntries entries |> processMessages
            } |> ARop.call

        if model.entries.Length = 0 
        then Util.waitImg |> OnAfterRender loadData
        else 
            let logo = A [ Href      "/EPHome"
                           Img [ Src "/EPFile/LOGO.png"; _Style [_maxWidth "20rem" ; _maxHeight "6rem" ; _width "20rem" ; _height "6rem"] ] ] 
                       |> Hoverable.make [ _Style [_background "lightblue"] ]
            Layouts.PropsC.New(
                 left       = logo
                ,contents   = [ menu model "Main Menu"   "nav navbar-nav"                                               ]
                ,rights     = [ menu model "Second Menu" "nav navbar-nav navbar-right" ; _Style [ _paddingRight "2ch" ] ]
                ,overflow   = ""
             ) |> Layouts.app.node
 
    let loader = BootstrapLoad()
    let app = App.App(init, update, view)

    let node () = app.node App.DummyNew

[<JavaScript>]
module MainForm =

    type Props    = { contents : CipherNode seq
                      footers  : CipherNode seq
                      lefts    : CipherNode seq
                      rights   : CipherNode seq
                    }
    type Model    = App.Dummy
    let init      = App.DummyNew
    type Message  = Dummy
    let update (props: Props) (msg: Message)  model = match msg with Dummy -> model

    let view (props: Props) (model: Model) (processMessages: Message -> unit) =
        Layouts.PropsC.New(contents   = props.contents
                         , header     = MenuBar.app.node      App.DummyNew
                         , footers    = props.footers
                         , lefts      = props.lefts
                         , rights     = props.rights
                         , horizontal = true
                         , stretch    = true
                         , absolute   = false
                           )
        |> Layouts.app.node
        |> addAttribute (Key "MainForm")

    let app = App.App(init, update, view)

    let node content = 
        app.node { contents = [ content                  ]
                   footers  = [ _Style [ _height  "5%" ] ]
                   lefts    = [ _Style [ _width  "10%" ] ]
                   rights   = [ _Style [ _width  "10%" ] ]
                 }
                     
    let run content = 
        app.run  { contents = [ content                  ]
                   footers  = [ _Style [ _height  "5%" ] ]
                   lefts    = [ _Style [ _width  "10%" ] ]
                   rights   = [ _Style [ _width  "10%" ] ]
                 }
                     
    let leftAndContentNode lefts contents =
        app.node 
            { contents = contents
              lefts    = lefts
              footers  = [ _Style [ _height  "5%" ] ]
              rights   = [ _Style [ _width  "10%" ] ]
            }

    let leftContentRightNode lefts contents rights =
        app.node 
            { contents = contents
              lefts    = lefts
              footers  = [ _Style [ _height  "5%" ] ]
              rights   = rights
            }

    let leftAndContentRun  lefts contents node =
        app.run 
            { contents = contents
              lefts    = lefts
              footers  = [ _Style [ _height  "5%" ] ]
              rights   = [ _Style [ _width  "10%" ] ]
            }
            node

[<JavaScript>]
module JustForRun =

    type Props    = { node : CipherNode }
    type Model    = App.Dummy
    let init      = App.DummyNew
    type Message  = Dummy
    let update (props: Props) (msg: Message)  model = match msg with Dummy -> model

    let view (props: Props) (model: Model) (processMessages: Message -> unit) = props.node

    let app = App.App(init, update, view)

    let run cipherNode domNode = app.run { node = cipherNode } domNode
