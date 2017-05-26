module DataTube =

    type Tube<'KD, 'KL when 'KD : comparison and 'KL : comparison> = {
        id                : System.IComparable
        mutable data      : Map<'KD list, obj>
        mutable listeners : Map<'KD list, Map<'KL, (obj option -> unit)>>
    } with
        static member New (id: System.IComparable) = { id = id ; data = Map.empty ; listeners = Map.empty }
        member this.getDataO        key                 =                   Map.tryFind key   this.data
        member this.remove          key                 = this.data      <- Map.remove  key   this.data
        member this.setOnly         key (v :obj)        = this.data      <- Map.add     key v this.data
        member this.setOnlyO        key (vO:obj option) = match vO with | None -> this.remove key | Some v -> this.setOnly key v
        member this.setAndTriggerO  key (vO:obj option) = this.setOnlyO                 key vO
                                                          Map.tryFind key this.listeners |> Option.iter (fun dict -> dict |> Map.toSeq |> Seq.iter (fun (_, f) -> f       vO))
        member this.setAndTrigger   key (v :obj)        = this.setAndTriggerO           key (Some v)
        member this.setDataO        key (vO:obj option) = if this.getDataO key <> vO 
                                                              then this.setAndTriggerO  key vO
        member this.setData         key (v :obj)        = if this.getDataO key <> Some v 
                                                              then this.setAndTrigger   key v
        member this.subscribe       kd     kl      f    = this.listeners <- 
                                                              Map.tryFind kd this.listeners 
                                                              |> Option.defaultValue Map.empty 
                                                              |> Map.add  kl f
                                                              |> Map.add  kd 
                                                              <| this.listeners
        member this.subCell subKey                      = Cell(this, [subKey])
                                                  
    and  Cell<'D, 'KD, 'KL when 'KD : comparison and 'KL : comparison> = Cell of Tube<'KD, 'KL> * 'KD list
      with
        member this.getDataO      ()             = match this with Cell (tube, key) -> tube.getDataO        key |> Option.map unbox<'D>
        member this.setOnly       (v :'D)        = match this with Cell (tube, key) -> tube.setOnly         key v
        member this.setAndTrigger (v :'D)        = match this with Cell (tube, key) -> tube.setAndTrigger   key v
        member this.setData       (v :'D)        = match this with Cell (tube, key) -> tube.setData         key v
        member this.setDataO      (vO:'D option) = match this with Cell (tube, key) -> tube.setDataO        key (vO |> Option.map box)
        member this.subscribe   listenKey  f     = match this with Cell (tube, key) -> tube.subscribe       key listenKey (fun oO -> oO |> Option.map unbox<'D> |> f)
        member this.subCell subKey               = match this with Cell (tube, key) -> Cell(tube, subKey :: key)

    //let generalCell () = Tube<string, string>.New("X").subCell("V")

open DataTube

type V<'T>    =
    | Constant of 'T
    | CellV    of Cell<'T, int, int>
with member this.getValue = 
               match this with
               | Constant v -> v 
               | CellV    c -> c.getDataO() |> Option.get

let inline defV< ^R> (p: obj) : V< ^R> =
    match p.GetType().ReflectedType with
    | null                       -> Constant (p |> unbox)
    | r when r.Name = "DataTube" -> CellV    (p |> unbox)
    | r when r.Name = "V`1"      -> p           |> unbox
    | _                          -> Constant (p |> unbox)

type Context<'F, 'r> = {
    func     : 'F
    callingF : obj[] -> 'r
    nParms   : int
    parms    : obj []
}
with member inline this.call () = this.callingF this.parms

let inline callV p f : ^b =
    let v = defV p
    match v with
    | Constant p' -> f p' 
    | CellV    c  -> c.subscribe 1 (Option.iter (f >> ignore))
                     c.getDataO() |> Option.get |> f 

let inline fv1  f p = callV p f 
let inline fv2  f p = callV p f |> fv1
let inline fv3  f p = callV p f |> fv2
let inline fv4  f p = callV p f |> fv3
let inline fv5  f p = callV p f |> fv4
let inline fv6  f p = callV p f |> fv5
let inline fv7  f p = callV p f |> fv6
let inline fv8  f p = callV p f |> fv7
let inline fv9  f p = callV p f |> fv8
let inline fv10 f p = callV p f |> fv9

let inline unpack v = 
    match unbox v with
    | Constant p' -> p' 
    | CellV    c  -> c.getDataO() |> Option.get

let inline call1 f (parms: obj[]) = f <| unpack parms.[0] 
let inline call2 f (parms: obj[]) = f <| unpack parms.[0] <| unpack parms.[1] 
let inline call3 f (parms: obj[]) = f <| unpack parms.[0] <| unpack parms.[1] <| unpack parms.[2]
let inline call4 f (parms: obj[]) = f <| unpack parms.[0] <| unpack parms.[1] <| unpack parms.[2] <| unpack parms.[3]

let context n f c = {
    func     = f
    callingF = c
    nParms   = n
    parms    = [| for i  in 0..n - 1 do yield i :> obj |]
}

let inline storeParm (ctx: Context<_,_>) i (p: V< ^p>) =
    match p with
    | CellV  c  -> c.subscribe 1 (fun _ -> ctx.call () |> ignore)
    | _         -> ()
    ctx.parms.[ctx.nParms - i] <- p |> box

let inline defVf1 f p = p |> defV |> f 
let inline defVf2 f p = p |> defV |> f |> defVf1
let inline defVf3 f p = p |> defV |> f |> defVf2
let inline defVf4 f p = p |> defV |> f |> defVf3

let inline firstCall1 f ctx (p: V< ^p>) = storeParm ctx 1 p ;             f p.getValue            
let inline firstCall2 f ctx (p: V< ^p>) = storeParm ctx 2 p ; firstCall1 (f p.getValue) ctx
let inline firstCall3 f ctx (p: V< ^p>) = storeParm ctx 3 p ; firstCall2 (f p.getValue) ctx
let inline firstCall4 f ctx (p: V< ^p>) = storeParm ctx 4 p ; firstCall3 (f p.getValue) ctx

let inline f1 f = call1 f |> context 1 f |> firstCall1 f |> defVf1
let inline f2 f = call2 f |> context 2 f |> firstCall2 f |> defVf2
let inline f3 f = call3 f |> context 3 f |> firstCall3 f |> defVf3
let inline f4 f = call4 f |> context 4 f |> firstCall4 f |> defVf4

let sprN   p = f1 (sprintf "%d")    p
let print2 p = f2 (printfn "%s %d") p

sprN 88
print2 "hola" 55


let d : Tube<int, int> = DataTube.Tube<int, int>.New "Tests"
let c : Cell<string, int, int> = d.subCell 1
c.setData "hello"
print2 c 55
c.setData "hx"

