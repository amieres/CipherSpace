#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype2\bin\CIPHERPrototype2.dll"
#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype2\packages\WebSharper.3.6.18.241\lib\net40\WebSharper.Main.dll"
#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype2\packages\WebSharper.3.6.18.241\lib\net40\WebSharper.Core.dll"
#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype2\packages\WebSharper.3.6.18.241\lib\net40\WebSharper.Core.JavaScript.dll"
#r @"D:\Abe\CIPHERWorkspace\CipherSpace\CIPHERPrototype2\packages\WebSharper.3.6.18.241\lib\net40\WebSharper.JavaScript.dll"

namespace test

open WebSharper
open WebSharper.JavaScript

[<JavaScript>]
module test =

    type Result<'TSuccess> =             
         | Success of 'TSuccess * string list     
         | Failure of string list                 


    let succeed x =                                
        Success (x,[])

    let applyR f result =                          
        match f,result with                        
        | Success (f,msgs1), Success (x,msgs2) -> (f x, msgs1@msgs2) |> Success 
        | Failure errs, Success (_,msgs) 
        | Success (_,msgs), Failure errs       ->  errs  @ msgs      |> Failure
        | Failure errs1, Failure errs2         ->  errs1 @ errs2     |> Failure 

    let inline liftR f result =                    
        let f' =  f |> succeed                     
        applyR f' result 

    let inline mapR v = liftR v

    let nR  () = 5 |> succeed
    let n2Ra () = nR () |> liftR (fun n -> n * 2)
    let n2Rb () = nR () |> mapR (fun n -> n * 2)
//    let showN2Ra = WebSharper.JavaScript.Console.Log(sprintf "%A" n2Ra)
//    let showN2Rb = WebSharper.JavaScript.Console.Log(sprintf "%A" n2Rb)