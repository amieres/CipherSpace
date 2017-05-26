#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype2\bin\CIPHERPrototype2.dll"
#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype2\packages\WebSharper.3.6.18.241\lib\net40\WebSharper.Main.dll"
#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype2\packages\WebSharper.3.6.18.241\lib\net40\WebSharper.Core.dll"
#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype2\packages\WebSharper.3.6.18.241\lib\net40\WebSharper.Collections.dll"
#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype2\packages\WebSharper.3.6.18.241\lib\net40\WebSharper.JavaScript.dll"

namespace CIPHERPrototype1

open WebSharper
open WebSharper.JavaScript
open Model
open Model2
open Rop

[<JavaScript>]
module Layouts =

    open ReactHtml

//    let Div = Div >> (addChild (_Style [ _borderStyle "dotted"; _borderWidth "1px"]))

    let BasicContainer header footer center  =
         Div [ _Style       [ _display  "flex" ]
               Div [ _Style [ _flex "0 0 auto" ]                    ] |> addChildren header
               Div [ _Style [ _flex "1 1 auto" ; _overflow "auto" ] ] |> addChildren center
               Div [ _Style [ _flex "0 0 auto" ]                    ] |> addChildren footer
             ]

    let Children = function | NElement  (_, children) -> children | _ -> seq []

    let HorizontalSplitter header footer left right center =
        center
        |> BasicContainer left   right 
        |> addAttribute (_Style [ _flexFlow "row"    ])
        |> Children
        |> BasicContainer header footer
        |> addAttribute (_Style [ _flexFlow "column" ])

    let VerticalSplitter header footer left right center =
        center
        |> BasicContainer header footer
        |> addAttribute (_Style [ _flexFlow "column" ])
        |> Children
        |> BasicContainer left   right 
        |> addAttribute (_Style [ _flexFlow "row"    ])

    let Stretch elem = addAttribute <| _Style [ _position "absolute"; _top "0Px" ; _left "0Px" ; _bottom "0Px" ; _right "0Px" ] <| elem