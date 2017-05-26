namespace CIPHERSpace
open System
open System.Collections.Generic
open System.Security
open System.Text
open System.Threading
open System.Web
open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open WebSharper.JQuery

module Auth =

    type Key = class end

    let Key = typeof<Key>.GUID.ToString()

    [<JavaScript>]
    type Token =
        {
            Name: System.Guid
            Hash: string
        }

    let private sha1 = Cryptography.SHA1.Create()

    let Generate (name: System.Guid) : Token =
        let hash = new StringBuilder()
        sprintf "%s:%s" (name.ToString()) Key
        |> Encoding.Unicode.GetBytes
        |> Cryptography.SHA1.Create().ComputeHash
        |> Array.iter (fun by -> hash.Append(by.ToString("X2")) |> ignore)
        {
            Name = name
            Hash = hash.ToString()
        }

    let Validate (token: Token) : bool =
        Generate token.Name = token

    let getSaltBytes () =
        use rng       = new System.Security.Cryptography.RNGCryptoServiceProvider()
        let saltBytes = Array.create 16 (new Byte())
        do              rng.GetBytes saltBytes
        saltBytes

    let sCrypt (pwd:string) saltBytes cost blockSize paralleln derivedKeyLength =
        let keyBytes = Encoding.UTF8.GetBytes(pwd)
        let maxThreads = System.Nullable<int>()
        let bytes = CryptSharp.Utility.SCrypt.ComputeDerivedKey(keyBytes, saltBytes, cost, blockSize, paralleln, maxThreads, derivedKeyLength)
        Convert.ToBase64String bytes        

    let pwdSettings =
        let cost             = 17
        let blockSize        = 8
        let paralleln        = 1
        let derivedKeyLength = 128
        Model.PasswordV2       (cost, blockSize, paralleln, derivedKeyLength)

    let calcHash (pwd: string) (salt: string) (settings: Model.PasswordSettings) =
        let saltBytes        = Encoding.UTF8.GetBytes(salt)
        match pwdSettings with
            | Model.PasswordV1         (cost, blockSize, paralleln, derivedKeyLength) ->
                sCrypt pwd saltBytes cost blockSize paralleln derivedKeyLength
            | Model.PasswordV2         (cost, blockSize, paralleln, derivedKeyLength) ->
                let cost             = pown 2 cost
                sCrypt pwd saltBytes cost blockSize paralleln derivedKeyLength 

    let getPwdHash (pwd:string) =
        let salt = Convert.ToBase64String  (getSaltBytes ())
        { 
            Model.hash     = calcHash pwd salt pwdSettings
            Model.salt     = salt
            Model.settings = pwdSettings
        }

    let checkPwd (password: Model.Password) (pwd: string) =
        let hash2 = calcHash pwd password.salt password.settings
        CryptSharp.Utility.SecureComparison.Equals(hash2, password.hash)
                
    let checkSettings (pwd: Model.Password) =
        pwd.settings = pwdSettings

module x =
    let rev values =
        let rec revAcc xs acc =
            match xs with
            | [] -> acc
            | h::t -> revAcc t (h::acc)
        let rev xs =
            match xs with
            | [] -> xs
            | [_] -> xs
            | h1::h2::t -> revAcc t [h2;h1] 
        let newValues = 
            values
            |> Seq.toList 
            |> rev
            |> Seq.toArray
        new System.String(newValues)
    
    let Text (text:string) =
        Html.Server.Tags.Text (text |> rev)


