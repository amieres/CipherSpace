namespace Rop
open CIPHERSpace.Model
open WebSharper

[< JavaScript >]    
module Option =
    let defaultV def = 
        function
        | None   -> def
        | Some v -> v

    let call v = 
        function
        | None   -> None
        | Some f -> f v |> Some

    let iterF v = 
        function
        | None   -> ()
        | Some f -> f v

    let iterFO vO fO = 
        match vO, fO with
        | Some v, Some f -> f v
        | _     , _      -> ()

    let apply vO fO =
        match vO, fO with
        | Some v, Some f -> f v |> Some
        | _     , _      -> None

    let modify modifier = Option.map (fun f -> modifier f) >> defaultV id
      

#nowarn "25"

[< JavaScript >] 
module Rop =

    let succeed x =                                 // create a Success with no messages
        Success (x,[])

    let succeedWithMsg x msg =                      // create a Success with a message
        Success (x,[msg])

    let fail msg =                                  // create a Failure with a message
        Failure [msg]

    let either fSuccess fFailure = function         // A function that applies either fSuccess or fFailure depending on the case.
        | Success (x,msgs) -> fSuccess (x,msgs) 
        | Failure errors -> fFailure errors 

    let fSuccess0 msgs (x,msgs2) = 
        Success (x, msgs @ msgs2) 
    let fFailure1 msgs errs = 
        Failure (errs @ msgs) 
    let mergeMessages msgs result =                 // merge messages with a result
        either (fSuccess0 msgs) (fFailure1 msgs) result

    let fSuccess1 f (x,msgs) =                          // apply it only if the result is on the Success branch
        f x |> mergeMessages msgs                       // merge any existing messages with the new result
    let bindR f result =                                // given a function that generates a new RopResult
        either (fSuccess1 f) Failure result

    let applyR f result =                               // given a function wrapped in a result
        match f,result with                             // and a value wrapped in a result
        | Success (f,msgs1), Success (x,msgs2) ->       // apply the function to the value only if both are Success
            (f x, msgs1@msgs2) |> Success 
        | Failure errs, Success (_,msgs) 
        | Success (_,msgs), Failure errs -> 
            errs @ msgs |> Failure
        | Failure errs1, Failure errs2 -> 
            errs1 @ errs2 |> Failure 

    let (<*>) = applyR                                  // infix version of apply

    let inline liftR f result =                               /// given a function that transforms a value
        let f' =  f |> succeed                          // apply it only if the result is on the Success branch
        applyR f' result 

    let lift2R f result1 result2 =                      // given two values wrapped in results apply a function to both
        let f' = liftR f result1
        applyR f' result2 

    let lift3R f result1 result2 result3 =              // given three values wrapped in results apply a function to all
        let f' = lift2R f result1 result2 
        applyR f' result3

    let lift4R f result1 result2 result3 result4 =      // given four values wrapped in results apply a function to all
        let f' = lift3R f result1 result2 result3 
        applyR f' result4

    let (<!>) = liftR                                   // infix version of liftR

//    let mapR = liftR                                    // synonym for liftR
    let inline mapR v = liftR v

    let successTee f result =                           // given an RopResult, call a unit function on the success branch
        let fSuccess (x,msgs) =                         // and pass thru the result
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

    let failException e = e |> ErrExceptionThrown |> fail

    /// call catching Exceptions
    let doTry f v =                            
        try       f v
        with e -> failException e

    let callTry f = 
        doTry (f >> succeed)

    let bindTry f =
        doTry f 
        |> bindR

    let liftTry f =                     
        callTry f
        |> bindR

    type ropBuilder() =
        member this.Return     (x)                       = succeed x
        member this.ReturnFrom (x)                       = x
        member this.Bind       (wrapped, restOfCExpr)    = bindTry restOfCExpr wrapped
        member this.Using      (disposable, restOfCExpr) = using disposable restOfCExpr
        member this.Zero       ()                        = succeed ()
        member this.Delay      (f)                       = f()
//        member this.Run        (f)                       = f
        member this.Combine    (a, b)                    =
            match (a,b) with
                | Success (v1, m1), Success(v2, m2) -> Success(v2, m1 @ m2)
                | Success (v1, m1), Failure(    m2) -> Failure(    m1 @ m2)
                | Failure (    m1), Success(v2, m2) -> Failure(    m1 @ m2)
                | Failure (    m1), Failure(    m2) -> Failure(    m1 @ m2)
        member this.While(guard, body) =
            if not (guard()) 
            then this.Zero() 
            else this.Bind( body(), fun () -> 
                this.While(guard, body))  
        member this.For(sequence:seq<_>, body) =
            this.Using(sequence.GetEnumerator(),fun enum -> 
                this.While(enum.MoveNext, 
                    this.Delay(fun () -> body enum.Current)))

    let flow  = new ropBuilder()
//    let inline flow_ () = new ropBuilder ()

    let fromChoice context c =
        match c with | Choice1Of2 v -> succeed v
                     | Choice2Of2 e -> fail <| ErrExceptionThrown e

    let fromOption m =
        function | None   -> fail    m
                 | Some v -> succeed v

    let toOption =
        function | Failure     _  -> None
                 | Success (v, _) -> Some v

    let tryProtection() : Result<unit> = succeed ()

    let assertR v m : Result<unit>  =
        if v
            then succeed ()
            else m |> fail 
            
    let ifError def =
        function 
        | Success (v, m) -> v
        | _            -> def

    let processMessages mtype (msgs: PossibleMessages list) =
        msgs
        |> List.iter (fun o -> WebSharper.JavaScript.JS.Alert     <| mtype + ": " + (sprintf "%A" o)
                               WebSharper.JavaScript.Console.Log o)

    let notifyMessages R =
        match R with | Success (_, m) -> processMessages "N" m
                     | Failure     m  -> processMessages "E" m

    let messagesDo f =
        function | Success (_, ms) -> f false ms
                 | Failure     ms  -> f true  ms

    let seqCheck s = s 
                     |> (fun elems -> match      elems |> Seq.exists(function | Failure _    -> true    | _ -> false) with
                                      | true  -> elems |> Seq.pick  (function | Failure ms   -> Some ms | _ -> None ) |> Failure
                                      | false -> elems |> Seq.map   (function | Success(v,_) -> v                   ) |> succeed
                     )
 
[<JavaScript>]
module ARop =
    type Wrapper<'T> =
    | WResult of Result<'T>
    | WAsync  of Async<'T>
    | WAsyncR of Async<Result<'T>>
    | WSimple of 'T
    | WOption of 'T option

    let wb2arb ms = function
                    | WAsync       ab  -> async { let!    b = ab
                                                  return Success(b,                ms) }
                    | WAsyncR     arb  -> async { let!   rb = arb
                                                  return rb |> Rop.mergeMessages   ms  }
                    | WResult      rb  -> async { return rb |> Rop.mergeMessages   ms  }
                    | WSimple       b  -> async { return Success(b,                ms) }
                    | WOption (Some b) -> async { return Success(b,                ms) }
                    | WOption None     -> async { return Failure (ErrOptionIsNone::ms) }

    let bind (f: 'A -> Wrapper<'B>) (wa: Wrapper<'A>) :Wrapper<'B> = 
        match wa with
        | WSimple         a       
        | WOption(Some    a)       
        | WResult(Success(a, [])) -> f a
        | WOption None            -> None       |> WOption
        | WResult(Failure    ms ) -> Failure ms |> WResult 
        | WResult(Success(a, ms)) -> match f a with
                                     | WSimple         b              
                                     | WResult(Success(b, [])) -> Success(b, ms     )       |> WResult 
                                     | WResult(Success(b, m2)) -> Success(b, ms @ m2)       |> WResult 
                                     | WResult(Failure    m2)  -> Failure(   ms @ m2)       |> WResult 
                                     | WAsync  ab              -> async { let!  b = ab
                                                                          return Success(b, ms) 
                                                                  } |> WAsyncR
                                     | WAsyncR arb             -> async { let! rb = arb
                                                                          return Rop.mergeMessages ms rb
                                                                  } |> WAsyncR
        | WAsync         aa       -> async {
                                         let! a  = aa
                                         return! f a |> wb2arb []
                                     } |> WAsyncR
        | WAsyncR       ara       -> async {
                                         let! ar  = ara
                                         let  arb = match ar with
                                                    | Success(a, ms) -> f a |> wb2arb ms
                                                    | Failure    ms  -> async { return Failure ms }
                                         return! arb
                                     } |> WAsyncR

    type Builder() =
        member this.Bind<'a, 'b> (wrapped: Wrapper<'a>      , restOfCExpr: 'a -> Wrapper<'b>) = wrapped            |> bind restOfCExpr 
        member this.Bind<'a, 'b> (wrapped: Async<Result<'a>>, restOfCExpr: 'a -> Wrapper<'b>) = wrapped |> WAsyncR |> bind restOfCExpr 
//      member this.Bind<'a, 'b> (wrapped: Async<'a>        , restOfCExpr: 'a -> Wrapper<'b>) = wrapped |> WAsync  |> bind restOfCExpr  << cannot differentiate from prior
        member this.Bind<'a, 'b> (wrapped: Result<'a>       , restOfCExpr: 'a -> Wrapper<'b>) = wrapped |> WResult |> bind restOfCExpr 
        member this.Bind<'a, 'b> (wrapped: 'a option        , restOfCExpr: 'a -> Wrapper<'b>) = wrapped |> WOption |> bind restOfCExpr 
        member this.Zero         ()  = WSimple ()
        member this.Return       (x) = WSimple x
        member this.Delay        (f) = f()

    let wrap = new Builder()

    let getR callback (wb: Wrapper<'T>) =
        match wb with
        | WSimple      s  -> s               |> Rop.succeed                               |> callback
        | WOption(Some s) -> s               |> Rop.succeed                               |> callback
        | WOption None    -> ErrOptionIsNone |> Rop.fail                                  |> callback
        | WResult      rb -> rb                                                           |> callback
        | WAsync       ab -> Async.StartWithContinuations(ab , (fun v -> v |> Rop.succeed |> callback), 
                                                        (fun exc -> Rop.failException exc |> callback), 
                                                         fun can -> Rop.failException can |> callback)
        | WAsyncR     arb -> Async.StartWithContinuations(arb,                               callback , 
                                                        (fun exc -> Rop.failException exc |> callback), 
                                                         fun can -> Rop.failException can |> callback)

    let call wb = wb |> getR Rop.notifyMessages

