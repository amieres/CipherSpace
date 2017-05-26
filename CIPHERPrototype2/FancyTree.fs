namespace CIPHERPrototype1

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open Rop
open Model
open Model2

[<JavaScript >]
module FancyTree =

    [<Sealed >]
    type private FancyTreeLoader() =
        inherit WebSharper.Core.Resources.BaseResource("/"
            , "Resources/SlickGrid-2.2.6/lib/jquery-ui-1.11.3.min.js"
            , "Resources/fancytree/js/jquery.fancytree-all.min.js"
            , "Resources/fancytree/js/jquery.fancytree-clones.js"
            , "Resources/fancytree/css/skin-bootstrap/ui.fancytree.min.css"
            , "Resources/fontAwesome/css/font-awesome.min.css"
        )

    [< AllowNullLiteral >]
    type Node    [< Inline "{}">] ()  =
        [<DefaultValue                                >]          val mutable parent             : Node
        [<DefaultValue                                >]          val mutable key                : string
        [<DefaultValue                                >]          val mutable refKey             : string
        [<DefaultValue                                >]          val mutable title              : string
        [<DefaultValue                                >]          val mutable folder             : bool
        [<DefaultValue                                >]          val mutable data               : obj
        [<DefaultValue                                >]          val mutable detail             : obj
        [<DefaultValue                                >]          val mutable tag                : string
        [<DefaultValue                                >]          val mutable children           : Node[]
        [<JavaScript; Inline "$0.moveTo($node, $mode)">]          member this.moveTo (node:Node, mode:string) = ()
        [<JavaScript; Inline "$0.copyTo($node, $mode)">]          member this.copyTo (node:Node, mode:string) = ()
        [<JavaScript; Inline "$0.setTitle($t)        ">]          member this.setTitle    (t: string)      = ()
        [<JavaScript; Inline "$0.setExpanded()       ">]          member this.setExpanded ()               = ()
        [<JavaScript; Inline "$0.makeVisible()       ">]          member this.makeVisible ()               = ()
        [<JavaScript; Inline "$0.setActive($ac, {noEvents:true, noFocus: true}) ">]          member this.setActive (ac:bool)          = ()
        [<JavaScript; Inline "$0.remove()            ">]          member this.remove      ()               = ()
        [<JavaScript; Inline "$0.hasChildren()       ">]          member this.hasChildren ()               = true
        [<JavaScript; Inline "$0.isFolder()          ">]          member this.isFolder ()                  = true
        [<JavaScript; Inline "$0.addNode($node)      ">]          member this.addNode       (node:Node)  : Node = X<_>
                                                      
    type FancyTreeInMessage = 
        | ApplyRelations   of (string * string)[]
        | FlattenHierarchy
        | LoadNodes        of FTNodeIn[]
        | SendRelations
        | SendSelected
        | DeleteNode       of key: string
        | AddNode          of key: string * title: string * id: string
        | SetTitle         of key: string * title: string * id: string
        | DataClear
        | Saved            of (string * string * string) []
        | SelectNode       of string

    and FancyTreeOutMessage = 
        | ShowInfo         of string * bool
        | MessageProcessor of (FancyTreeInMessage  -> unit)
        | Relations        of (string * string)[]
        | NodeSelected     of Node

    and ParentChild = { id     : int
                        child  : string
                        parent : string
                      }

    and FTNodeIn = {
        key      : string
        title    : string
        tag      : string
        detail   : obj
        folder   : bool
        children : FTNodeIn[]
    }

    type GlyphOptionsMap  [<Inline "{}">] ()  =       
        [<DefaultValue                                >]          val mutable doc                : string
        [<DefaultValue                                >]          val mutable docOpen            : string
        [<DefaultValue                                >]          val mutable checkbox           : string
        [<DefaultValue                                >]          val mutable checkboxSelected   : string
        [<DefaultValue                                >]          val mutable checkboxUnknown    : string
        [<DefaultValue                                >]          val mutable dragHelper         : string
        [<DefaultValue                                >]          val mutable dropMarker         : string
        [<DefaultValue                                >]          val mutable error              : string
        [<DefaultValue                                >]          val mutable expanderClosed     : string
        [<DefaultValue                                >]          val mutable expanderLazy       : string
        [<DefaultValue                                >]          val mutable expanderOpen       : string
        [<DefaultValue                                >]          val mutable folder             : string
        [<DefaultValue                                >]          val mutable folderOpen         : string
        [<DefaultValue                                >]          val mutable loading            : string
                                                      
    type GlyphOptions     [<Inline "{}">] ()  =       
        [<DefaultValue                                >]          val mutable map                : GlyphOptionsMap
                                                      
    type ClonesOptions    [<Inline "{}">] ()  =       
        [<DefaultValue                                >]          val mutable highlightClones    : bool
                                                      
    type DnDOptions       [<Inline "{}">] ()  =       
        [<DefaultValue                                >]          val mutable focusOnClick       : bool
        [<DefaultValue                                >]          val mutable dragStart          : obj
        [<DefaultValue                                >]          val mutable dragEnter          : obj
        [<DefaultValue                                >]          val mutable dragDrop           : obj
        [<DefaultValue                                >]          val mutable draggable          : obj
                                                      
    type TableOptions     [<Inline "{}">]() =
        [<DefaultValue                                >]          val mutable nodeColumnIdx      : int

    [<Require(typeof<FancyTreeLoader>) >]
    type FancyTreeOptions [<Inline "{}">] ()  =       
        [<DefaultValue                                >]          val mutable extensions         : string[]
        [<DefaultValue                                >]          val mutable glyph              : GlyphOptions
        [<DefaultValue                                >]          val mutable clones             : ClonesOptions
        [<DefaultValue                                >]          val mutable dnd                : DnDOptions
        [<DefaultValue                                >]          val mutable table              : TableOptions
        [<DefaultValue                                >]          val mutable source             : FTNodeIn[]
        [<DefaultValue                                >]          val mutable checkbox           : bool
        [<DefaultValue                                >]          val mutable focus              : obj
        [<DefaultValue                                >]          val mutable dblclick           : obj
        [<DefaultValue                                >]          val mutable renderColumns      : obj

    [<Require(typeof<FancyTreeLoader>) >]
    type FancyTree  [<JavaScript ; Inline "{}" >]           () =
        [<JavaScript; Inline "$0.getActiveNode()"       >]        member this.getActiveNode ()                                           : Node        = X<_>
        [<JavaScript; Inline "$0.getRootNode()"         >]        member this.getRootNode   ()                                           : Node        = X<_>
        [<JavaScript; Inline "$0.clear()"               >]        member this.clear         ()                                                         = ()
        [<JavaScript; Inline "$0.reload($source)"       >]        member this.reload        (source:Node[])                                            = ()
        [<JavaScript; Inline "$0.reload($source)"       >]        member this.reload        (source:FTNodeIn[])                                            = ()
        [<JavaScript; Inline "$0.getNodeByKey($key)"    >]        member this.getNodeByKey  (key:string)                                 : Node        = X<_>
        [<JavaScript; Inline "$0.getNodeByRefKey($key)" >]        member this.getNodeByRefKey(key:string)                                 : Node        = X<_>
        [<JavaScript; Inline "$($dom).fancytree('getTree')">] static member getFancyTree_      (dom: Dom.Element)                           : FancyTree   = X<_>
        [<JavaScript; Inline "$($dom).fancytree($options)" >] static member createFancyTree_   (dom: Dom.Element, options:FancyTreeOptions) : Dom.Element = X<_>
        [<JavaScript; Inline "$0.getRootNode().visit(function(node){ node.setExpanded(true);})" >]
                                                                  member this.expandAll     ()                                                         = ()

    type DnDData          [<Inline "{}">]() =
        [<DefaultValue                                >]          val mutable node               : Node
        [<DefaultValue                                >]          val mutable otherNode          : Node
        [<DefaultValue                                >]          val mutable hitMode            : string
        [<DefaultValue                                >]          val mutable draggable          : obj
        [<DefaultValue                                >]          val mutable tree               : FancyTree

//
//    let GetNodes container_id options =
//        async {
//            let! x = FancyTreeServer.GetNodes()
//            Rop.flow "GetNodes" {
//                let! x = x
//                new FancyTree(container_id, 
//                            new FancyTreeOptions (
//                                extensions = [| "glyph" |]
//                               ,glyph      = options
//                               ,source     = x
//                            )
//                        ) |> ignore
//            } |> ignore
////            match x with
////                | Success (xx, _) ->
////                    Console.Log(xx)
////                    let tree = 
////                        new FancyTree(container_id, 
////                            new FancyTreeOptions (
////                                extensions = [| "glyph" |]
////                               ,glyph      = options
////                               ,source     = xx
////                            )
////                        )
////                    ()
////                | Failure _ ->
////                    Console.Log("There was an error!") 
//        } |> Async.Start
//        Console.Log("Test!")
//
//    let test() = 
//        Div [Attr.Class "flexgrow"]
//            -< [Attr.Id "tree_container"]
//            |>! OnAfterRender(fun _ -> 
//                let glyphOptions = 
//                    new GlyphOptions(
//                        map = 
//                            new GlyphOptionsMap (
//                                doc              = "glyphicon glyphicon-file"
//                               ,docOpen          = "glyphicon glyphicon-file"
//                               ,checkbox         = "glyphicon glyphicon-unchecked"
//                               ,checkboxSelected = "glyphicon glyphicon-check"
//                               ,checkboxUnknown  = "glyphicon glyphicon-share"
//                               ,dragHelper       = "glyphicon glyphicon-play"
//                               ,dropMarker       = "glyphicon glyphicon-arrow-right"
//                               ,error            = "glyphicon glyphicon-warning-sign"
//                               ,expanderClosed   = "glyphicon glyphicon-menu-right"
//                               ,expanderLazy     = "glyphicon glyphicon-menu-right"  // glyphicon-plus-sign
//                               ,expanderOpen     = "glyphicon glyphicon-menu-down"   // glyphicon-collapse-down
//                               ,folder           = "glyphicon glyphicon-folder-close"
//                               ,folderOpen       = "glyphicon glyphicon-folder-open"
//                               ,loading          = "glyphicon glyphicon-refresh glyphicon-spin"
//                            )
//                    )
//                GetNodes "#tree_container" glyphOptions
//            )

    let createFancyTree container (options: FancyTreeOptions option) (nodes:FTNodeIn[]) (processOutMessage_O: (FancyTreeOutMessage -> unit) option) = 
        let sendMessage_  msg = processOutMessage_O |> Option.iter (fun f -> msg |> f)
        let glyphOptions = 
            GlyphOptions(
                map = 
                    GlyphOptionsMap (
//                         doc              = "glyphicon glyphicon-file"
//                        ,docOpen          = "glyphicon glyphicon-file"
//                        ,checkbox         = "glyphicon glyphicon-unchecked"
//                        ,checkboxSelected = "glyphicon glyphicon-check"
//                        ,checkboxUnknown  = "glyphicon glyphicon-share"
//                        ,dragHelper       = "glyphicon glyphicon-play"
//                        ,dropMarker       = "glyphicon glyphicon-arrow-right"
//                        ,error            = "glyphicon glyphicon-warning-sign"
//                        ,expanderClosed   = "glyphicon glyphicon-menu-right"
//                        ,expanderLazy     = "glyphicon glyphicon-menu-right"  // glyphicon-plus-sign
//                        ,expanderOpen     = "glyphicon glyphicon-menu-down"   // glyphicon-collapse-down
//                        ,folder           = "glyphicon glyphicon-folder-close"
//                        ,folderOpen       = "glyphicon glyphicon-folder-open"
//                        ,loading          = "glyphicon glyphicon-refresh glyphicon-spin"
                          doc              = "fa fa-file-o"
                        , docOpen          = "fa fa-file-o"
                        , checkbox         = "fa fa-square-o"
                        , checkboxSelected = "fa fa-check-square-o"
                        , checkboxUnknown  = "fa fa-square"
                        , dragHelper       = "fa fa-arrow-right"
                        , dropMarker       = "fa fa-long-arrow-right"
                        , error            = "fa fa-warning"
                        , expanderClosed   = "fa fa-caret-right"
                        , expanderLazy     = "fa fa-angle-right"
                        , expanderOpen     = "fa fa-caret-down"
                        , folder           = "fa fa-folder-o"
                        , folderOpen       = "fa fa-folder-open-o"
                        , loading          = "fa fa-spinner fa-pulse"
                    )

            )
        let dnDOptions =
            DnDOptions(
                  focusOnClick = true
                , dragStart    = FuncWithArgs(fun (node, data: DnDData) -> true                                     )
                , dragEnter    = FuncWithArgs(fun (node, data: DnDData) -> true                                     )
                , dragDrop     = FuncWithArgs(fun (node, data: DnDData) -> 
                                                data.otherNode.moveTo(node, data.hitMode)
                                                if node.hasChildren() && not (node.isFolder()) then 
                                                    node.folder <- true
                                                node.setExpanded()
                                             )
            )
        let tableOptions = TableOptions()

        let mutable doEvents = true
        let fancyTree = 
            let ftOptions = FancyTreeOptions (
                                  extensions    = [| "glyph" ; "clones" ; "dnd" |]
                                , clones        = ClonesOptions( highlightClones = true)
                                , glyph         = glyphOptions
                                , source        = nodes
                                , checkbox      = false
                                , dnd           = dnDOptions
                                , table         = tableOptions
                                , dblclick      = FuncWithArgs(fun (event, data) ->
                                                      if doEvents then
                                                         data?node |> unbox<Node> |> FancyTreeOutMessage.NodeSelected |> sendMessage_
                                                  )
                            )
            let ftOptions = 
                match options with
                | None     -> ftOptions
                | Some opt -> JQuery.JQuery.Extend(ftOptions, opt) |> box |> unbox<FancyTreeOptions>
            FancyTree.createFancyTree_(container, ftOptions)
            |> FancyTree.getFancyTree_

        let updateState () (msg: FancyTreeInMessage) =
            let getNodeBy f =
                let rec findNode (baseNode : Node) =
                    if baseNode.hasChildren() then
                        baseNode.children
                        |> Seq.tryPick (fun child -> 
                            if f child 
                            then Some child
                            else findNode child)
                    else None
                fancyTree.getRootNode()
                |> findNode 
            let rec convert ftNodes =
                ftNodes
                |> Array.map(fun ftNode ->
                                Node(
                                  key      = ftNode.key
                                , title    = ftNode.title
                                , tag      = ftNode.tag
                                , detail   = ftNode.detail
                                , folder   = ftNode.folder
                                , children = convert ftNode.children
                                ) 
                )
            match msg with
            | SendSelected                -> fancyTree.getActiveNode() |> NodeSelected |> sendMessage_
            | LoadNodes      ftNodes      -> ftNodes 
                                             //|> convert
                                             |> fancyTree.reload
                                             fancyTree.expandAll()
            | ApplyRelations relations    -> relations
                                             |> Array.iter (fun (child, parent) ->
                                                 let  parentNode = getNodeBy(fun node -> node.data?tag = parent)
                                                 let  childNode  = getNodeBy(fun node -> node.data?tag = child)
                                                 childNode |> Option.iter (fun childN -> parentNode |> Option.iter (fun parentN -> 
                                                     childN.moveTo(parentN, "child")
                                                  ))
                                             )
            | FlattenHierarchy            -> let rec getFlatNodes (baseNode : Node) =
                                                   baseNode.children
                                                   |> Seq.collect (fun node ->
                                                               Node(
                                                                 key      = node.key
                                                               , title    = node.title
                                                               , data     = node.data
                                                               , folder   = false
                                                               , children = [||]
                                                               ) :: if node.hasChildren() then getFlatNodes node else []
                                                   ) |> Seq.toList
                                             fancyTree.getRootNode()
                                             |> getFlatNodes
                                             |> Seq.toArray
                                             |> fancyTree.reload
            | SendRelations               -> let rec getRelations (baseNode : Node) =
                                                   if baseNode.hasChildren() then
                                                       baseNode.children
                                                       |> Array.collect (fun child -> 
                                                           Array.append
                                                               [| (unbox<string> child.data?tag, unbox<string> baseNode.data?tag) |]
                                                               (getRelations child)
                                                       )
                                                   else [||]
                                             fancyTree.getRootNode().children
                                             |> Array.collect getRelations
                                             |> FancyTreeOutMessage.Relations
                                             |> sendMessage_
            | DeleteNode  key             -> let node = fancyTree.getNodeByKey key
                                             if not (isUndefined node) then
                                                 if node.hasChildren() then
                                                     node.children
                                                     |> Array.copy
                                                     |> Array.iter (fun child -> child.moveTo(node, "before"))
                                                 node.remove()
            | DataClear                   -> fancyTree.clear()
            | SetTitle (key, title, id)   -> fancyTree.getNodeByKey key
                                             |> fun node -> node.setTitle(title) ; node.data?tag <- id
            | AddNode  (key, title, id)   -> fancyTree.getRootNode().addNode (Node(key = key, title = title, folder = false, tag = id)) |> ignore
            | Saved nodes                 -> nodes
                                             |> Array.iter(fun (key, title, id) ->
                                                let oldNodeO = getNodeBy(fun node -> (unbox<string> node.data?tag) = id)
                                                oldNodeO |> Option.iter (fun oldNode ->
                                                                let newNode = oldNode.parent.addNode(Node(key = key, title = title, folder = oldNode.folder, tag = id))
                                                                if oldNode.hasChildren() then
                                                                    oldNode.children
                                                                    |> Array.copy
                                                                    |> Array.iter (fun child -> child.moveTo(newNode, "child"))
                                                                oldNode.remove()
                                                            )
                                             )
            | SelectNode key              -> let node = fancyTree.getNodeByKey(key)
                                             if not (isUndefined node) 
                                             then doEvents <- false
                                                  node.setActive(true)
                                                  node.makeVisible()
                                                  doEvents <- true

        let processInMessages = 
            let processor = processorAgent () updateState
            fun message -> processor.Post message


        processInMessages |> FancyTreeOutMessage.MessageProcessor |> sendMessage_ 
        //fancyTree
        ()