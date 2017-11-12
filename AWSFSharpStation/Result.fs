namespace Rop

open WebSharper
open System

[<JavaScript>]
module Option =
    let defaultValue v =
        function
        | Some x -> x
        | None   -> v

    let defaultWith f =
        function
        | Some x -> x
        | None   -> f()

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

    let modify modifier = Option.map (fun f -> modifier f) >> defaultValue id
      

#nowarn "25"
type ErrMsg = 
    abstract member ErrMsg   : string
    abstract member IsWarning: bool

[<JavaScript>]
type ExceptionThrown(exn:Exception) =
    interface ErrMsg with
        member this.ErrMsg   : string = sprintf "%A" exn
        member this.IsWarning: bool   = false

[<JavaScript>]
type ErrOptionIsNone() =
    interface ErrMsg with
        member this.ErrMsg   : string = "Option is None"
        member this.IsWarning: bool   = false

[<JavaScript>]
type Result<'TSuccess> = Result of 'TSuccess option * ErrMsg list     

[<JavaScript>]
module Result =
    let inline succeed             x       = Result (Some x           , [  ]             )
    let inline succeedWithMsg      x  m    = Result (Some x           , [m ]             )
    let inline succeedWithMsgs     x  ms   = Result (Some x           ,  ms              )
    let inline fail                   m    = Result (None             , [m ]             )
    let inline failWithMsgs           ms   = Result (None             ,  ms              )
    let inline map       f (Result(o, ms)) = Result (o |> Option.map f,  ms              )
    let inline mapMsg    f (Result(o, ms)) =        (o                ,  ms |> List.map f)
    let inline mapMsgs   f (Result(o, ms)) =        (o                ,  ms |>          f)
    let inline getOption   (Result(o, _ )) =         o                   
    let inline getMsgs     (Result(_, ms)) =                             ms
    let inline mergeMsgs              ms r = Result (r |> mapMsgs   ((@) ms) )
    let inline combine     (Result(_, ms)) = mergeMsgs ms
    let inline bind      f (Result(o, ms)) = 
        match o with
        | Some x   -> match f x with Result(o2, ms2) -> Result(o2, ms @ ms2)
        | None     -> Result(None, ms)
    let inline apply (Result(fO, fMs))  (Result(o , ms)) = 
        match fO, o with
        | Some f, Some x -> Result(f x |> Some, fMs @ ms)
        | _              -> Result(None       , fMs @ ms)


    let (|Success|Failure|) =
        function 
        | Result(Some x, ms) -> Success (x, ms) 
        | Result(None  , ms) -> Failure     ms  

    let x = function
              | Success (x, ms) -> "yes"
              | Failure     ms  -> "No"

//    let successTee f result =                           // given an RopResult, call a unit function on the success branch
//        let fSuccess (x,msgs) =                         // and pass thru the result
//            f (x,msgs)
//            Success (x,msgs) 
//        either fSuccess Failure result
//
//    let fFailure2 f errs = 
//        f errs
//        Failure errs 
//    let failureTee f result =                           /// given an RopResult, call a unit function on the failure branch
//        either Success (fFailure2 f) result
//
//    let mapMessagesR f result =                         /// given an RopResult, map the messages to a different error type
//        match result with 
//        | Success (x,msgs) -> 
//            let msgs' = List.map f msgs
//            Success (x, msgs')
//        | Failure errors -> 
//            let errors' = List.map f errors 
//            Failure errors' 
//
//    let valueOrDefault f result =                       /// given an RopResult, in the success case, return the value.
//        match result with                               /// In the failure case, determine the value to return by 
//        | Success (x,_) -> x                            /// applying a function to the errors in the failure case
//        | Failure errors -> f errors
//
//    let failIfNone message = function                   /// lift an option to a RopResult.
//        | Some x -> succeed x                           /// Return Success if Some
//        | None -> fail message                          /// or the given message if None
//
//    let failIfNoneR message = function                  /// given an RopResult option, return it
//        | Some rop -> rop                               /// or the given message if None
//        | None -> fail message 

    let failException e = ExceptionThrown(e) :> ErrMsg

///            tryCall: (exn -> Result<'b>) ->  ('a -> Result<'b>) -> 'a -> Result<'b> =
    let inline tryCall (f:'a -> Result<'b>) (v:'a) : Result<'b> = try f v with e -> failException e |> fail

    type ropBuilder() =
        member inline this.Return     (x)                       = succeed x
        member inline this.ReturnFrom (x)                       = x
        member        this.Bind       (w:Result<'a>, r: 'a -> Result<'b>) = bind (tryCall r) w
        member inline this.Using      (disposable, restOfCExpr) = using disposable restOfCExpr
        member inline this.Zero       ()                        = succeed ()
        member inline this.Delay      (f)                       = f()
        member inline this.Combine    (a, b)                    = combine a b
//        member this.Run        (f)                       = f
//        member this.While(guard, body) =
//            if not (guard()) 
//            then this.Zero() 
//            else this.Bind( body(), fun () -> 
//                this.While(guard, body))  
//        member this.For(sequence:seq<_>, body) =
//            this.Using(sequence.GetEnumerator(),fun enum -> 
//                this.While(enum.MoveNext, 
//                    this.Delay(fun () -> body enum.Current)))

    let result = ropBuilder()
//    let inline flow_ () = new ropBuilder ()

    let fromChoice context c =
        match c with | Choice1Of2 v -> succeed v
                     | Choice2Of2 e -> fail    e

    let fromOption m =
        function | None   -> fail    m
                 | Some v -> succeed v

    let toOption (Result(o, _)) = o

    let tryProtection() : Result<unit> = succeed ()

    let failIfFalse m v : Result<unit>  = if v then succeed () else m |> fail 
    let failIfTrue  m v : Result<unit>  = if v then m |> fail  else succeed () 
            
    let ifError   def (Result(o, _ )) = o |> Option.defaultValue            def
    let withError f   (Result(o, ms)) = o |> Option.defaultWith  (fun () -> f ms)

//    let processMessages mtype (msgs: PossibleMessages list) =
//        msgs
//        |> List.iter (fun o -> WebSharper.JavaScript.JS.Alert     <| mtype + ": " + (sprintf "%A" o)
//                               WebSharper.JavaScript.Console.Log o)
//
//    let notifyMessages R =
//        match R with | Success (_, m) -> processMessages "N" m
//                     | Failure     m  -> processMessages "E" m
//
//    let messagesDo f =
//        function | Success (_, ms) -> f false ms
//                 | Failure     ms  -> f true  ms

    let seqCheck s = 
        s 
        |> (fun elems -> match      elems |> Seq.exists(function | Failure _    -> true    | _ -> false) with
                         | true  -> elems |> Seq.pick  (function | Failure ms   -> Some ms | _ -> None ) |> failWithMsgs
                         | false -> elems |> Seq.map   (function | Success(v,_) -> v                   ) |> succeed
        )

    let getMessages (ms: ErrMsg list) =
        if ms = [] then "" else
        let errors   = ms |> List.filter(fun m -> m.IsWarning |> not)
        let warnings = ms |> List.filter(fun m -> m.IsWarning       )
        sprintf "%d errors, %d warnings\n%s"
        <| errors  .Length
        <| warnings.Length
        <| (ms |> List.map (fun m -> m.ErrMsg) |> String.concat "\n")
 
open Result

[<JavaScript>]
module Wrap =
    let errOptionIsNone = ErrOptionIsNone() :> ErrMsg

    type Wrapper<'T> =
    | WResult of Result<'T>
    | WAsync  of Async<'T>
    | WAsyncR of Async<Result<'T>>
    | WSimple of 'T
    | WOption of 'T option

    let wb2arb ms = 
        function
        | WAsync       ab  -> async { let!   b = ab
                                      return succeedWithMsgs b                   ms }
        | WAsyncR     arb  -> async { let!   rb = arb                               
                                      return rb |> mergeMsgs                     ms }
        | WResult      rb  -> async { return rb |> mergeMsgs                     ms }
        | WSimple       b                                                           
        | WOption (Some b) -> async { return succeedWithMsgs b                   ms }
        | WOption None     -> async { return failWithMsgs      (errOptionIsNone::ms)}

    let tryCall (f: 'a -> Wrapper<'b>) (a:'a) = 
        try f a 
        with e -> failException e |> fail |> WResult

    let bind (f: 'a -> Wrapper<'b>) (wa: Wrapper<'a>) :Wrapper<'b> =
        match wa with
        | WSimple         a       
        | WOption(Some    a)       
        | WResult(Success(a, [])) -> tryCall f a
        | WOption None            -> None            |> WOption
        | WResult(Failure    ms ) -> failWithMsgs ms |> WResult 
        | WResult(Success(a, ms)) -> tryCall f a
                                     |> function
                                     | WSimple         b              
                                     | WResult(Success(b, [])) -> succeedWithMsgs b  ms             |> WResult 
                                     | WResult(Success(b, m2)) -> succeedWithMsgs b (ms @ m2)       |> WResult 
                                     | WResult(Failure    m2)  -> failWithMsgs      (ms @ m2)       |> WResult 
                                     | WAsync  ab              -> async { let!  b = ab
                                                                          return succeedWithMsgs b ms
                                                                  } |> WAsyncR
                                     | WAsyncR arb             -> async { let! rb = arb
                                                                          return mergeMsgs ms rb
                                                                  } |> WAsyncR
        | WAsync         aa       -> async {
                                         let! a  = aa
                                         return! tryCall f a |> wb2arb []
                                     } |> WAsyncR
        | WAsyncR       ara       -> async {
                                         let! ar  = ara
                                         let  arb = match ar with
                                                    | Success(a, ms) -> tryCall f a |> wb2arb ms
                                                    | Failure    ms  -> async { return failWithMsgs ms }
                                         return! arb
                                     } |> WAsyncR

    let wrapper2Async (f: 'a -> Wrapper<'b>) a : Async<Result<'b>> =
        let wb = tryCall f a
        match wb with
        | WSimple _
        | WOption _               -> wb |> wb2arb []
        | WResult (Result(_, ms)) -> wb |> wb2arb ms
        | WAsync  ab              -> async { let!   b = ab
                                             return succeed b }
        | WAsyncR arb              -> arb

    let addMsgs errOptionIsNone ms wb =
        if ms = [] then wb else
        match wb with
        | WSimple          v       
        | WOption (Some    v)      -> WResult (succeedWithMsgs                        v ms)
        | WOption (None     )      -> WResult (fail errOptionIsNone |> Result.mergeMsgs ms)
        | WResult r                -> WResult (r                    |> Result.mergeMsgs ms)
        | WAsync           va      -> async {
                                        let! v = va
                                        return succeedWithMsgs v ms
                                      } |> WAsyncR
        | WAsyncR          vra     -> async {
                                        let! vr = vra
                                        return vr                    |> Result.mergeMsgs ms
                                      } |> WAsyncR

    let combine errOptionIsNone wa wb =
        match wa with
        | WSimple          _
        | WOption (Some    _)
        | WResult (Result (_, []))
        | WAsync           _       -> wb
        | WAsyncR          _       -> wb
        | WOption (None     )      -> wb |> addMsgs errOptionIsNone [errOptionIsNone]
        | WResult (Result(_, ms))  -> wb |> addMsgs errOptionIsNone ms

    type Builder() =
//        member        this.Bind (wrapped: Async<Result<'a>>, restOfCExpr: 'a -> Wrapper<'b>) = wrapped |> WAsyncR |> bind restOfCExpr //<< cannot differentiate from next 
        member        this.Bind (wrapped: Wrapper<'a>      , restOfCExpr: 'a -> Wrapper<'b>) = wrapped            |> bind restOfCExpr 
        member        this.Bind (wrapped: Async<'a>        , restOfCExpr: 'a -> Wrapper<'b>) = wrapped |> WAsync  |> bind restOfCExpr  
        member        this.Bind (wrapped: Result<'a>       , restOfCExpr: 'a -> Wrapper<'b>) = wrapped |> WResult |> bind restOfCExpr 
        member        this.Bind (wrapped: 'a option        , restOfCExpr: 'a -> Wrapper<'b>) = wrapped |> WOption |> bind restOfCExpr 
        member inline this.Zero         ()  = WSimple ()
        member inline this.Return       (x) = WSimple x
        member inline this.ReturnFrom   (w) = w
        member inline this.Delay        (f) = f()
        member        this.Combine   (a, b) = combine errOptionIsNone a b
        member        this.Using (resource, body: 'a -> Wrapper<'b>) =
            async.Using(resource, wrapper2Async body) |> WAsyncR
                    
    let wrapper = Builder()

    let getResult callback (wb: Wrapper<'T>) =
        match wb with
        | WSimple      s  -> s               |> succeed                                      |> callback
        | WOption(Some s) -> s               |> succeed                                      |> callback
        | WOption None    -> errOptionIsNone |> fail                                         |> callback
        | WResult      rb -> rb                                                              |> callback
        | WAsync       ab -> Async.StartWithContinuations(ab , (fun v   -> succeed v         |> callback), 
                                                               (fun exc -> failException exc |> fail |> callback), 
                                                                fun can -> failException can |> fail |> callback)
        | WAsyncR     arb -> Async.StartWithContinuations(arb,                                          callback , 
                                                               (fun exc -> failException exc |> fail |> callback), 
                                                                fun can -> failException can |> fail |> callback)

    let getAsyncR (wb: Wrapper<'T>) =
        match wb with
        | WAsync      va  -> async {
                               let! v = va
                               return      succeed                           v}
        | WSimple     v   -> async.Return (succeed                           v)
        | WOption     v   -> async.Return (Result.fromOption errOptionIsNone v)
        | WResult     v   -> async.Return                                    v
        | WAsyncR     vra -> vra
        
    let getAsyncWithDefault f (wb: Wrapper<'T>) = 
        async {
            let!   vR = getAsyncR wb
            return vR |> Result.withError f
        }

//    let call wb = wb |> getR Rop.notifyMessages

