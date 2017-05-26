namespace CIPHERSpace
open Model
open Model2
open System
open System.Data
open System.Data.SqlClient
open WebSharper
open WebSharper.Web
open Rop

module Server2 =
    open Repository
    open Server

    [<Rpc>]
    let fetchDimensionsAR_() =
        RpcNoTokenValidation <| fun user client dc ->
            user.dimsDataR_ dc

