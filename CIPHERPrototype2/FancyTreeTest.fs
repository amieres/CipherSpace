namespace CIPHERPrototype1

open Model
open Model2
open WebSharper
open WebSharper.Html.Server
open FancyTree

module FancyTreeTestServer =
    open Rop
    open Repository
    open Model
    open FancyTree

    let rec GetNodesFromHierarchy (folders:ObjectHierarchy.Folder[]) (objects:ObjectHierarchy.Object[]) =
        let f =
            folders
            |> Array.map(fun f -> Node( title = f.Name, children = GetNodesFromHierarchy f.Folders f.Objects))
        let obj =
            objects
            |> Array.map(fun o -> Node( title = o.Name, children = Array.empty))
        Array.append f obj

    [<Rpc>]
    let GetNodesRA_ (dimension:Dimension) = 
        let context = Web.Remoting.GetContext()
        async {
            let! userCodeOS            = context.UserSession.GetLoggedInUser()
            return                
                Rop.flow {
                    let! userCodeS     = userCodeOS |> Rop.fromOption ErrUserIsNotLoggedIn
                    let  user          = User (new System.Guid(userCodeS))
                    let  dc            = DataCache()
//                    let! dimensions    = user.dimensionsR_       dc
//                    let  dimension     = dimensions.[0]
                    let! elements      = dimension.ElementsR_    dc
                    let! elemElems     = dimension.ElemElemsR_   dc
                    let  childrenOf parentCode =
                         elements
                         |> Array.choose (fun elem -> 
                                            elemElems 
                                            |> Array.tryFind (fun rel -> elem.element_code = rel.child_code && parentCode = rel.parent_code)
                                            |> Option.map    (fun rel -> elem , rel.child_order |> Option.defaultV (elem.element_order |> Option.defaultV elem.element_name)))
                         |> Array.sortBy (fun (elem, order) -> order)
                         |> Array.map    (fun (elem, order) -> elem )
                    let  rec createNodes elements =
                         elements
                         |> Array.map (fun (elem:dimElement) ->
                            let children = childrenOf elem.element_code
                            Node  (key      = elem.element_name
                                 , title    = elem.element_name + (match elem.element_description with |None -> "" | Some s -> " " + s)
                                 , folder   = not (children = [||])
                                 , children = createNodes children
                                  )
                         )
                    let  topLevel =
                         elements
                         |> Array.filter (fun elem -> 
                                elemElems |> Array.exists (fun rel -> elem.element_code = rel.child_code) |> not
                         )
                    return topLevel 
                           |> Array.sortBy (fun elem -> elem.element_order |> Option.defaultV elem.element_name)
                           |> createNodes 
                }
        }





[<JavaScript>]
module FancyTreeTestClient =
    open WebSharper.Html.Client
    open Repository
    open Model
    open FancyTree
    open WebSharper.JavaScript
    open Rop
    open FancyTree
     
    let createFancyTree_ () =
//        let mutable fancyTreeO: FancyTree option = None
        let innerPane   = Div [Attr.Class "flex flexgrow"]
        let gridPane    = Div [Attr.Class "flex flexgrow"]
        let leftPane    = Div [Attr.Class "flex flexgrow"] 
        let rightPane   = Div [Attr.Class "flex flexgrow"]
//        let message     = Div []
//        let setMessage txt =
//            message.Clear()
//            message -< [ Text txt ] |> ignore            
//        let saveHierarchy  (fancyTree: FancyTree) =
//            Server.call {
//                setMessage "Preparing data... "
//                let elemElems =
//                    let root = fancyTree.getRootNode()
//                    let rec getRelations (baseNode : Node) =
//                        if not (baseNode.hasChildren()) then [] 
//                        else
//                            baseNode.children
//                            |> Seq.collect (fun node ->
//                                (node.key, baseNode.key)
//                                      :: getRelations node
//                            ) |> Seq.toList
//                    root.children
//                    |> Seq.collect getRelations
//                    |> Seq.toArray
//                setMessage "Sending data and waiting..." 
////                let! R = FancyTreeTestServer.SaveNodesRA(elemElems)
////                WebSharper.JavaScript.JS.Alert (sprintf "%A" R)
//                message.Clear()
//            } 
//        let pasteHierarchy (fancyTree: FancyTree) =
//            Rop.flow {
//                let closeLeftPane () =
//                    leftPane.Clear()
//                    innerPane                          -< [Attr.Style ""] |> ignore
//                    leftPane                           -< [Attr.Style ""] |> ignore
//                    rightPane                          -< [Attr.Style ""] |> ignore
//                let openLeftPane  () =
//                    closeLeftPane ()
//                    innerPane                          -< [Attr.Style "flex-direction: row;"     ] |> ignore
//                    leftPane                           -< [Attr.Style "float: left ; width: 40%;"] |> ignore
//                    rightPane                          -< [Attr.Style "float: right; width: 60%;"] |> ignore
//                openLeftPane ()
//                let buttonRemove = Button [Text "Remove Relations" ]
//                let buttonApply  = Button [Text "Apply"            ] 
//                let buttonClose  = Button [Text "Close"            ] |>! OnClick (fun _ _ -> closeLeftPane())
//                leftPane 
//                    -< [ Text "Copy/Paste the Children - Parent relations" ] 
//                    -< [
//                        Div [ buttonRemove; buttonApply; buttonClose ]
//                        gridPane 
//                    ] |> ignore
//                let  columns = 
//                    [| Column (
//                              id        = "child"
//                            , name      = "child"
//                            , field     = ("child"  :> obj)
//                            , editor    = Slick.Editors.Text
//                        )
//                       Column (
//                              id        = "parent"
//                            , name      = "parent"
//                            , field     = ("parent" :> obj)
//                            , editor    = Slick.Editors.Text
//                        )
//                    |]
////                let createNew (item:obj) id =
////                    { (unbox item) with id = id } :> obj
////                do! SlickGrid.SimpleGrid columns [||] createNew None gridPane.Dom
//                buttonRemove |>! OnClick (fun _ _ ->
//                    let root = fancyTree.getRootNode()
//                    let rec getFlatNodes (baseNode : Node) =
//                        baseNode.children
//                        |> Seq.collect (fun node ->
//                            Node  (key      = node.key
//                                 , title    = node.title
//                                 , folder   = node.folder
//                                 , children = [||]
//                                  ) :: if node.hasChildren() then getFlatNodes node else []
//                        ) |> Seq.toList
//                    getFlatNodes root 
//                    |> Seq.toArray
//                    |> fancyTree.reload
//                ) |> ignore
//            } |> Rop.notifyMessages
//        let RenderTree container =
//            Server.call {
//                let! nodes = FancyTreeTestServer.GetNodesRA_ (Dimension (new System.Guid("c381eb05-b55a-449e-84f9-4b0945aa3740")))
//                fancyTreeO <- createFancyTree container nodes None |> Some
//            } 
        Div [
            Div[
                Button [Text "save changes"                 ] //|>! OnClick (fun _ _ -> fancyTreeO |> Option.iter saveHierarchy )
                Button [Text "import parent child relations"] //|>! OnClick (fun _ _ -> fancyTreeO |> Option.iter pasteHierarchy)
//                message
            ]
            innerPane -< [
                leftPane
                rightPane
//                |>! OnAfterRender(fun container -> RenderTree container.Dom)
            ]
        ]  -< [Attr.Class "flex flexgrow"]
        
//    type MyTreeControl(container_id:string) =
//        inherit WebSharper.Web.Control()
//
//        [<JavaScript>]
//        override this.Body = createControlBody container_id :> _


module FancyTreeTest =

    let Render() =
        Div [Attr.Class "flex flexgrow"] 
            -< [ ClientSide <@  FancyTreeTestClient.createFancyTree_ () @>]
