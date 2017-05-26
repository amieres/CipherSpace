module RopJS
open CIPHERPrototype1.Model

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open Rop

[< JavaScript >]
module RopJS =

    let succeed x =                                 /// create a Success with no messages
        Success (x,[])

    let succeedWithMsg x msg =                      /// create a Success with a message
        Success (x,[msg])

    let fail msg =                                  /// create a Failure with a message
        Failure [msg]

    let either fSuccess fFailure = function         /// A function that applies either fSuccess or fFailure depending on the case.
        | Success (x,msgs) -> fSuccess (x,msgs) 
        | Failure errors -> fFailure errors 

    let fSuccess0 msgs (x,msgs2) = 
        Success (x, msgs @ msgs2) 
    let fFailure1 msgs errs = 
        Failure (errs @ msgs) 
    let mergeMessages msgs result =                 /// merge messages with a result
        either (fSuccess0 msgs) (fFailure1 msgs) result

    let fSuccess1 f (x,msgs) =                         /// apply it only if the result is on the Success branch
        f x |> mergeMessages msgs                   /// merge any existing messages with the new result
    let bindR f result =                                /// given a function that generates a new RopResult
        either (fSuccess1 f) Failure result

    let applyR f result =                               /// given a function wrapped in a result
        match f,result with                             /// and a value wrapped in a result
        | Success (f,msgs1), Success (x,msgs2) ->       /// apply the function to the value only if both are Success
            (f x, msgs1@msgs2) |> Success 
        | Failure errs, Success (_,msgs) 
        | Success (_,msgs), Failure errs -> 
            errs @ msgs |> Failure
        | Failure errs1, Failure errs2 -> 
            errs1 @ errs2 |> Failure 

                                                        /// infix version of apply
    let (<*>) = applyR                                  

                                                        /// given a function that transforms a value
                                                        /// apply it only if the result is on the Success branch
    let liftR f result =                                
        let f' =  f |> succeed                          
        applyR f' result 

    let lift2R f result1 result2 =                      /// given two values wrapped in results apply a function to both
        let f' = liftR f result1
        applyR f' result2 

    let lift3R f result1 result2 result3 =              /// given three values wrapped in results apply a function to all
        let f' = lift2R f result1 result2 
        applyR f' result3

    let lift4R f result1 result2 result3 result4 =      /// given four values wrapped in results apply a function to all
        let f' = lift3R f result1 result2 result3 
        applyR f' result4

    let (<!>) = liftR                                   /// infix version of liftR

    let mapR = liftR                                    /// synonym for liftR

    let successTee f result =                           /// given an RopResult, call a unit function on the success branch
        let fSuccess (x,msgs) =                         /// and pass thru the result
            f (x,msgs)
            Success (x,msgs) 
        either fSuccess Failure result

    let fFailure2 f errs = 
        f errs
        Failure errs 
    let failureTee f result =                           /// given an RopResult, call a unit function on the failure branch
        either Success (fFailure2 f) result

    let mapMessagesR f result =                         /// given an RopResult, map the messages to a different error type
        match result with 
        | Success (x,msgs) -> 
            let msgs' = List.map f msgs
            Success (x, msgs')
        | Failure errors -> 
            let errors' = List.map f errors 
            Failure errors' 

    let valueOrDefault f result =                       /// given an RopResult, in the success case, return the value.
        match result with                               /// In the failure case, determine the value to return by 
        | Success (x,_) -> x                            /// applying a function to the errors in the failure case
        | Failure errors -> f errors

    let failIfNone message = function                   /// lift an option to a RopResult.
        | Some x -> succeed x                           /// Return Success if Some
        | None -> fail message                          /// or the given message if None

    let failIfNoneR message = function                  /// given an RopResult option, return it
        | Some rop -> rop                               /// or the given message if None
        | None -> fail message 

    let failException context e = ErrExceptionThrown (context, e.ToString()) |> fail

    let doTry context f v =                            /// call catching Exceptions
        try       f v
        with e -> failException context (e)

    let callTry context f = 
        doTry context (f >> succeed)

    let bindTry context f =
        doTry context f 
        |> bindR

    let liftTry context f =                     
        callTry context f
        |> bindR

    type ropBuilder(context: string) =
        member this.Return     (x)                       = succeed x
        member this.ReturnFrom (x)                       = x
        member this.Bind       (wrapped, restOfCExpr)    = bindTry context restOfCExpr wrapped
        member this.Using      (disposable, restOfCExpr) = using disposable restOfCExpr
        member this.Zero       ()                        = succeed ()
        member this.Delay      (f)                       = f()
        member this.Run        (f)                       = f
        member this.Combine    (a, b)                    =
            match (a,b) with
                | Success (v1, m1), Success(v2, m2) -> Success(v2, m1 @ m2)
                | Success (v1, m1), Failure(    m2) -> Failure(    m1 @ m2)
                | Failure (    m1), Success(v2, m2) -> Failure(    m1 @ m2)
                | Failure (    m1), Failure(    m2) -> Failure(    m1 @ m2)

    let flow context = new ropBuilder(context)

    let fromChoice context c =
        match c with | Choice1Of2 v -> succeed v
                     | Choice2Of2 e -> fail <| ErrExceptionThrown (context, e)

    let fromOption m =
        function | None   -> fail    m
                 | Some v -> succeed v

    let toOption =
        function | Failure     _  -> None
                 | Success (v, _) -> Some v

    let tryProtection () : Result<unit> = succeed ()

    let ifNotThen v m : Result<unit>  =
        if v
            then succeed ()
            else m |> fail 
            
    let processMessages mtype (msgs: PossibleMessages list) =
        msgs
        |> List.iter (fun o -> JS.Alert     <| mtype + ": " + (sprintf "%A" o)
                               Console.Log o)

    let notifyMessages R =
        match R with | Success (_, m) -> processMessages "N" m
                     | Failure     m  -> processMessages "E" m

    let messagesDo f =
        function | Success (_, ms) -> f false ms
                 | Failure     ms  -> f true  ms

[< JavaScript >]
module Async =
    let callServer context asy =
        Async.StartWithContinuations(asy
            ,   fun _ -> ()
            ,   fun exc -> RopJS.failException context exc |> RopJS.notifyMessages
            ,   fun can -> RopJS.failException context can |> RopJS.notifyMessages
        )
