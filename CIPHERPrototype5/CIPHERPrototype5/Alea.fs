namespace CIPHERSpace
open Model
open Model2
open FSharp.Data
open FSharp.Data.SqlClient
open Rop
open Repository

module Alea =

    let private g  = new MdsAut.GeneralClass()
    let private s  = new MdsAut.ServersClass()
    let private d  = new MdsAut.DimensionsClass()
    let private c  = new MdsAut.TablesClass()
    let private at = new MdsAut.AttributeTablesClass()
    let private e  = new MdsAut.ElementsClass()
    let private l  = new MdsAut.DataCellsClass()

    let res = g.MdsInit(0)

    let callR_<'T> (v: obj) =
        let err  = g.MdsGetLastError()
        let errN = unbox<int> err
        if  errN <> 0 && v = err
        then Rop.fail (ErrAleaError (errN, g.MdsError errN |> unbox<string>))
        else v |> unbox<'T> |> Rop.succeed

    let (|*>) result f = Rop.bindR f result

    type ServerOlap with
        member this.connectR_    dc = this.serverAddressR_ dc |*> fun address -> s.ServerConnectEx (address, "Admin", "") |> callR_<bool>
        member this.disconnectR_ dc = this.serverAddressR_ dc |*> fun address -> s.ServerDisconnect(address             ) |> callR_<bool>

    type DimOlap with
        member this.server                                   = match this with DimOlap(_, server) -> server
        member this.withR_<'T>             dc f              = this.server.serverAddressR_ dc |> Rop.bindR (fun servAd -> f servAd this.name |> callR_<'T>)
        member this.editBeginR_            dc clear desc     = this.withR_<bool  > dc <| fun servAd dimN -> d.DimensionEditBegin     (servAd, dimN, clear, desc |> Option.defaultValue dimN)
        member this.addElementR_           dc eType elem parent weight = this.withR_<bool  > dc <| fun servAd dimN -> d.DimensionEditAddElement(servAd, dimN, eType, elem, parent, weight, "")
        member this.editCommitR_           dc commit         = this.withR_<bool  > dc <| fun servAd dimN -> d.DimensionEditCommit    (servAd, dimN, commit) 
        member this.elementsCountR_        dc                = this.withR_<int   > dc <| fun servAd dimN -> e.ElementsCount          (servAd, dimN) 
        member this.elementsNameR_         dc i              = this.withR_<string> dc <| fun servAd dimN -> e.ElementsName           (servAd, dimN, i) 
    
    type ElemOlap with
        member this.dimension                                = match this with ElemOlap (_, dimension) -> dimension
        member this.withR_<'T>             dc f              = this.dimension.withR_<'T> dc <| fun servAd dimN    -> f servAd dimN this.name
        member this.childrenCountR_        dc                = this.withR_<int   > dc <| fun servAd dimN elemN -> e.ElementChildrenCount   (servAd, dimN, elemN) 
        member this.childrenNameR_  dc i                     = this.withR_<string> dc <| fun servAd dimN elemN -> e.ElementChildrenName    (servAd, dimN, elemN, i)
        member this.childrenR_      dc                       = this.dimension.server.serverAddressR_ dc |> Rop.bindR (fun servAd ->
                                                                   Rop.flow {
                                                                       let! n     = this.childrenCountR_ dc
                                                                       let! elems = seq[ for i in 1..n do
                                                                                            yield this.childrenNameR_  dc i
                                                                                    ] |> Rop.seqCheck
                                                                       return elems |> Seq.map (fun e -> ElemOlap(e, this.dimension)) |> Seq.toArray
                                                                   })
    type DimOlap with
        member this.elementsR_             dc                      = this.server.serverAddressR_ dc |> Rop.bindR (fun servAd ->
                                                                   Rop.flow {
                                                                       let! n     = this.elementsCountR_ dc
                                                                       let! names = seq[ for i in 1..n do
                                                                                            yield this.elementsNameR_  dc i
                                                                                    ] |> Rop.seqCheck
                                                                       let  elems = names |> Seq.map (fun e -> ElemOlap(e, this))
                                                                       return elems |> Seq.toArray
                                                                   }
                                                               ) 
        member this.inputsR_        dc                       = this.server.serverAddressR_ dc |> Rop.bindR (fun servAd ->
                                                                   Rop.flow {
                                                                       let! n     = this.elementsCountR_ dc
                                                                       let! elems = seq[ for i in 1..n do
                                                                                            yield
                                                                                                Rop.flow {
                                                                                                    let! elemN  = this.elementsNameR_  dc i
                                                                                                    let  eOlap  = ElemOlap(elemN, this)
                                                                                                    let! childN = eOlap.childrenCountR_ dc
                                                                                                    return 
                                                                                                        if childN = 0 
                                                                                                        then Some eOlap
                                                                                                        else None
                                                                                                }
                                                                                    ]
                                                                                    |> Rop.seqCheck
                                                                       return elems |> Seq.choose id |> Seq.toArray
                                                                   }
                                                               ) 

    type AttTableOlap = AttTableOlap of int16  * DimOlap with
        member this.dimension                                = match this with AttTableOlap(_ , dimension) -> dimension
        member this.nS                                       = match this with AttTableOlap(nS, _        ) -> nS
        member this.withR_<'T>       dc f                    = this.dimension.withR_<'T> dc <| fun servAd dimN    -> f servAd dimN this.nS
        member this.deleteR_         dc                      = this.withR_<bool>         dc <| fun servAd dimN nS -> at.ATableDelete     (servAd, dimN, nS |> int)
        member this.createBeginR_    dc                      = this.withR_<int >         dc <| fun servAd dimN nS -> at.ATableCreateBegin(servAd, dimN, nS - 1s  )
        member this.fieldAddR_       handle name desc nType len dec = at.ATableFieldAdd(int16 handle, name, desc, nType, len, dec) |> callR_<bool>
        member this.createCommitR_   handle                  = at.ATableCreateCommit(int16 handle) |> callR_<bool>

    type AttFieldOlap = AttFieldOlap of string * AttTableOlap with
        member this.attTable                                 = match this with AttFieldOlap(_   , attTable) -> attTable
        member this.name                                     = match this with AttFieldOlap(name, _       ) -> name
        member this.withR_<'T>       dc f                    = this.attTable.withR_<'T>  dc <| fun servAd dimN nS       -> f servAd dimN nS this.name
        member this.getInfoDescR_    dc                      = this.withR_<string>       dc <| fun servAd dimN nS field -> at.ATableFieldGetInfo(servAd, dimN, nS, field, 2)
        member this.getInfoAtypR_    dc                      = this.withR_<int16 >       dc <| fun servAd dimN nS field -> at.ATableFieldGetInfo(servAd, dimN, nS, field, 3)
        member this.getInfoLengthR_  dc                      = this.withR_<int16 >       dc <| fun servAd dimN nS field -> at.ATableFieldGetInfo(servAd, dimN, nS, field, 4)
        member this.getInfoDecimalR_ dc                      = this.withR_<int16 >       dc <| fun servAd dimN nS field -> at.ATableFieldGetInfo(servAd, dimN, nS, field, 5)
        member this.putValueR_       dc v elem               = this.withR_<bool  >       dc <| fun servAd dimN nS field -> at.ATableFieldPutValue(v, servAd, dimN, nS |> int, elem, field)

    type CubeOlap with
        member this.server                                    = match this with CubeOlap(_, server) -> server
        member this.withR_<'T>           dc f                 = this.server.serverAddressR_ dc |> Rop.bindR (fun servAd -> f servAd this.name |> callR_<'T>)
        static member bulkTransferBeginR_  lType              = l.BulkTransferBegin(lType)             |> callR_<bool>
        static member bulkTransferCommitR_ lType stop log     = l.BulkTransferCommit(lType, stop, log) |> callR_<bool>
        member this.dimensionsCountR_    dc                   = this.withR_<int       >     dc <| fun servAd cubeN -> c.TableDimensionsCount(servAd, cubeN)
        member this.dimensionsNameR_     dc i                 = this.withR_<string    >     dc <| fun servAd cubeN -> c.TableDimensionsName (servAd, cubeN, i)
        member this.putValueExR_         dc v elems           = this.withR_<bool      >     dc <| fun servAd cubeN -> l.DataPutValueEx (servAd, cubeN, v, elems)
        member this.dimensionsR_         dc                   = this.server.serverAddressR_ dc |> Rop.bindR (fun servAd -> 
                                                                   Rop.flow {
                                                                        let! n    = this.dimensionsCountR_ dc
                                                                        let! dims = seq [
                                                                                         for i in 1..n do 
                                                                                             yield (this.dimensionsNameR_ dc i)
                                                                                    ]
                                                                                    |> Rop.seqCheck
                                                                        return dims |> Seq.map (fun dimN -> DimOlap(dimN, this.server)) |>Seq.toArray
                                                                   }
                                                               )
