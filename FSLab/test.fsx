#load "packages/FsLab/FsLab.fsx"
open FsLab

open Foogle
open Deedle
open FSharp.Data

let wb        = WorldBankData.GetDataContext()
let ve        = wb.Countries.``Venezuela, RB``.Indicators
let eu        = wb.Countries.``European Union``.Indicators
let veschool  = ve.``School enrollment, tertiary, male (% gross)``
let euschool  = eu.``School enrollment, tertiary, male (% gross)``
let veschool2 = veschool.Values |> Seq.zip veschool.Years |> Series.ofObservations
let euschool2 = euschool.Values |> Seq.zip euschool.Years |> Series.ofObservations

abs(veschool - euschool)
|> Series.sort
|> Series.rev
|> Series.take 5

ve.``School enrollment, tertiary (gross), gender parity index (GPI)``
|> fun ind -> ind.Values |> Seq.zip ind.Years |> Series.ofObservations

let toSeries_ (ind: Runtime.WorldBank.Indicator) = ind.Values |> Seq.zip ind.Years |> Series.ofObservations

type Runtime.WorldBank.Indicator
with
  static member toSeries (ind: Runtime.WorldBank.Indicator) : Series<int, float> = toSeries_ ind
  static member div (a:Runtime.WorldBank.Indicator, b:Runtime.WorldBank.Indicator) = (Runtime.WorldBank.Indicator.toSeries a) / (Runtime.WorldBank.Indicator.toSeries b)

let fem = ve.``School enrollment, tertiary, female (% gross)``
let mal = ve.``School enrollment, tertiary, male (% gross)``  

Runtime.WorldBank.Indicator.div(fem, mal)

#r @"C:\Program Files (x86)\AWS SDK for .NET\bin\Net45\AWSSDK.Lambda.dll"
#r @"C:\Program Files (x86)\AWS SDK for .NET\bin\Net45\AWSSDK.Core.dll"

let openGarage () =
    let client = new Amazon.Lambda.AmazonLambdaClient()
    let request = new Amazon.Lambda.Model.InvokeRequest()
    request.FunctionName <- "activateGarageDoor"
    client.Invoke request

openGarage ()