
#r """packages\FSharp.Data.2.3.2\lib\net40\FSharp.Data.dll"""
open FSharp.Data

let camelize (name: string) =
    name.Trim().Split '-'
    |> Array.mapi (fun i text -> if i = 0 then text.ToLower() else text.[0..0].ToUpper() + text.[1..].ToLower())
    |> String.concat ""

let processAttribute name (value:string) =
    match name with
        | "style" -> 
            value.Split ';'
            |> Array.choose (fun style ->
                style.Split ':'
                |> (function 
                    | [| sName |]        -> Some(camelize sName, "")
                    | [| sName; sValue|] -> Some(camelize sName, sValue.Trim())
                    | _                  -> None
                   )
            ) 
            |> Array.map (fun (sName, sValue) -> sprintf "%A: %A" sName sValue)
            |> String.concat ", "
            |> sprintf "style = JSON.Parse(\"\"\"{%s}\"\"\")"
            |> Some
        | "class"     -> Some(sprintf "className = %A" value)
        | "type"      -> Some(sprintf "``type``  = %A" value)
        | "tabindex"  -> Some(sprintf "tabIndex  = %A" value)
        | "onsubmit"  -> Some(sprintf "onSubmit  = (fun _ -> %s)" (value.Replace("return ","")))
        | "hidefocus" -> None
        | "XXXX"      -> None                                
        | s           -> Some(sprintf "%s = %A" (camelize s)  value)

let rec fromHtmlToFReact lvl (e: HtmlNode)  =
    let name = 
        match e.Name() with
//            | "class" -> "className"
            | s       -> s
    if name = "" then
        sprintf "\"\"\"%s\"\"\"" <| e.DirectInnerText()
    else
        let children =
            e.Elements()
            |> List.map (fromHtmlToFReact (lvl + 1))
        let attrs = 
            e.Attributes()
            |> List.choose (fun a ->
                processAttribute (a.Name()) (a.Value())
            )
            |> String.concat ", "
            |> function 
            | "" when children.Length = 0 -> []
            | s                           -> [ sprintf "Attrs(%s)" s ]
        [
            [ sprintf "%A" name] @ attrs
            |> String.concat ", "
        ] @ children
        |> String.concat (sprintf "\n%s  , " (String.replicate lvl "    "))
        |> sprintf "R.E(%s)"



//let html = HtmlDocument.Load("http://www.google.co.uk/search?q=FSharp.Data")
//let html = HtmlDocument.Parse("""<div class="flex flexgrow" style="float: left ; width: 40%;">Copy/Paste the Children - Parent relations<div><button>Remove Relations</button><button>Apply</button><button>Close</button></div><div class="flex flexgrow slickgrid_447177 ui-widget" style="overflow: hidden; outline: 0px;"><div tabindex="0" hidefocus="" style="position:fixed;width:0;height:0;top:0;left:0;outline:0;"></div><div class="slick-header ui-state-default" style="overflow:hidden;position:relative;"><div class="slick-header-columns ui-sortable" style="left: -1000px; width: 1563px;" unselectable="on"><div class="ui-state-default slick-header-column ui-sortable-handle" id="slickgrid_447177child" title="" style="width: 82.8889px;"><span class="slick-column-name">child</span><div class="slick-resizable-handle"></div></div><div class="ui-state-default slick-header-column ui-sortable-handle" id="slickgrid_447177parent" title="" style="width: 82.8889px;"><span class="slick-column-name">parent</span><div class="slick-resizable-handle"></div></div></div></div><div class="slick-headerrow ui-state-default" style="overflow: hidden; position: relative; display: none;"><div class="slick-headerrow-columns" style="width: 184px;"></div><div style="display: block; height: 1px; position: absolute; top: 0px; left: 0px; width: 203px;"></div></div><div class="slick-top-panel-scroller ui-state-default" style="overflow: hidden; position: relative; display: none;"><div class="slick-top-panel" style="width:10000px"></div></div><div class="slick-viewport" style="width: 100%; overflow: auto; outline: 0px; position: relative; height: 140px;"><div class="grid-canvas" style="height: 4875px; width: 184px;"><div class="ui-widget-content slick-row active even" style="top:0px"><div class="slick-cell l0 r0 active selected">Id</div><div class="slick-cell l1 r1 selected">Parent</div></div><div class="ui-widget-content slick-row odd" style="top:25px"><div class="slick-cell l0 r0 selected">100D1</div><div class="slick-cell l1 r1 selected">D1</div></div><div class="ui-widget-content slick-row even" style="top:50px"><div class="slick-cell l0 r0 selected">100D2</div><div class="slick-cell l1 r1 selected">D2</div></div><div class="ui-widget-content slick-row odd" style="top:75px"><div class="slick-cell l0 r0 selected">100R1</div><div class="slick-cell l1 r1 selected">R1</div></div><div class="ui-widget-content slick-row even" style="top:100px"><div class="slick-cell l0 r0 selected">100R2</div><div class="slick-cell l1 r1 selected">R2</div></div><div class="ui-widget-content slick-row odd" style="top:125px"><div class="slick-cell l0 r0 selected">100R3</div><div class="slick-cell l1 r1 selected">R3</div></div><div class="ui-widget-content slick-row even" style="top:150px"><div class="slick-cell l0 r0 selected">200D1</div><div class="slick-cell l1 r1 selected">D1</div></div><div class="ui-widget-content slick-row odd" style="top:175px"><div class="slick-cell l0 r0 selected">200D2</div><div class="slick-cell l1 r1 selected">D2</div></div><div class="ui-widget-content slick-row even" style="top:200px"><div class="slick-cell l0 r0 selected">200R1</div><div class="slick-cell l1 r1 selected">R1</div></div><div class="ui-widget-content slick-row odd" style="top:225px"><div class="slick-cell l0 r0 selected">200R2</div><div class="slick-cell l1 r1 selected">R2</div></div></div></div><div tabindex="0" hidefocus="" style="position:fixed;width:0;height:0;top:0;left:0;outline:0;"></div></div></div>""")
let html = HtmlDocument.Parse("""<div class="content"><div class="most-popular clearfix ui-tabs ui-widget ui-widget-content ui-corner-all"><ul class="most-tabs ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist"><li class="ui-state-default ui-corner-top ui-tabs-active ui-state-active" role="tab" tabindex="0" aria-controls="most-popular" aria-labelledby="ui-id-1" aria-selected="true"><a href="#most-popular" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-1">Most Read</a></li></ul><div id="most-popular" class="most-list ui-tabs-panel ui-widget-content ui-corner-bottom" aria-labelledby="ui-id-1" role="tabpanel" aria-expanded="true" aria-hidden="false">
<script type="text/javascript">
function advagg_mod_1() {
// Count how many times this function is called.
advagg_mod_1.count = ++advagg_mod_1.count || 1;
try {
if (advagg_mod_1.count <= 40) {
(function() {
var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
script.src = 'http://cdn.feeds.ibt.com/tm-hits-widget.js?story_type=analysis%2Carticle%2Ccolumn%2Ceditorial%2Cinterview%2Cop_ed%2Copinion%2Cpulse%2Cslideshow&created=1473354294&syndication=1&numbered=0&placeholder_id=most_popular_widget&include_categories=0&include_images=1&include_shares=0&limit=5&site=www.newsweek.com';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);
})();
// Set this to 100 so that this function only runs once.
advagg_mod_1.count = 100;
}
}
catch(e) {
if (advagg_mod_1.count >= 40) {
// Throw the exception if this still fails after running 40 times.
throw e;
}
else {
// Try again in 250 ms.
window.setTimeout(advagg_mod_1, 250);
}
}
}
function advagg_mod_1_check() {
if (window.jQuery && window.Drupal && window.Drupal.settings) {
advagg_mod_1();
}
else {
window.setTimeout(advagg_mod_1_check, 250);
}
}
advagg_mod_1_check();</script>
<div id="most_popular_widget"> <ul class="most-popular-list">         <li class="item item-1 clearfix">                                   <div class="item-image">             <a href="http://www.newsweek.com/2016/09/23/donald-trump-foreign-business-deals-national-security-498081.html"><img src="http://s.newsweek.com/sites/www.newsweek.com/files/styles/thumbnail/public/2016/09/12/0923trump07.jpg" alt="The Trump Organization’s Secretive Global Financial Web"></a>          </div>                 <div class="item-link">           <a href="http://www.newsweek.com/2016/09/23/donald-trump-foreign-business-deals-national-security-498081.html?rel=most_read1">The Trump Organization’s Secretive Global Financial Web</a>        </div>               </li>         <li class="item item-2 clearfix">                                   <div class="item-image">             <a href="http://www.newsweek.com/2016/09/23/george-w-bush-white-house-lost-22-million-emails-497373.html"><img src="http://s.newsweek.com/sites/www.newsweek.com/files/styles/thumbnail/public/2016/09/12/0909bushemails04.jpg" alt="George W. Bush’s White House ‘Lost’ 22 Million Emails"></a>          </div>                 <div class="item-link">           <a href="http://www.newsweek.com/2016/09/23/george-w-bush-white-house-lost-22-million-emails-497373.html?rel=most_read2">George W. Bush’s White House ‘Lost’ 22 Million Emails</a>        </div>               </li>         <li class="item item-3 clearfix">                                   <div class="item-image">             <a href="http://www.newsweek.com/hillary-clinton-body-double-conspiracy-497732"><img src="http://s.newsweek.com/sites/www.newsweek.com/files/styles/thumbnail/public/2016/09/12/0912clintonbodydouble.jpg" alt="No, This Isn’t Hillary Clinton's Body Double"></a>          </div>                 <div class="item-link">           <a href="http://www.newsweek.com/hillary-clinton-body-double-conspiracy-497732?rel=most_read3">No, This Isn’t Hillary Clinton's Body Double</a>        </div>               </li>         <li class="item item-4 clearfix">                                   <div class="item-image">             <a href="http://www.newsweek.com/sport-rio-2016-olympics-usain-bolt-wayde-van-niekerk-496714"><img src="http://s.newsweek.com/sites/www.newsweek.com/files/styles/thumbnail/public/2016/09/08/wayde-van-niekerk.jpg" alt="Wayde van Niekerk: I’m Chasing Bolt’s Olympic Records"></a>          </div>                 <div class="item-link">           <a href="http://www.newsweek.com/sport-rio-2016-olympics-usain-bolt-wayde-van-niekerk-496714?rel=most_read4">Wayde van Niekerk: I’m Chasing Bolt’s Olympic Records</a>        </div>               </li>         <li class="item item-5 clearfix">                                   <div class="item-image">             <a href="http://www.newsweek.com/ukraine-reports-russian-soldier-surrender-east-donbas-497498"><img src="http://s.newsweek.com/sites/www.newsweek.com/files/styles/thumbnail/public/2016/09/12/ukrainian-serviceman.jpg" alt="Ukraine Reports Surrender of Russian Soldier in East"></a>          </div>                 <div class="item-link">           <a href="http://www.newsweek.com/ukraine-reports-russian-soldier-surrender-east-donbas-497498?rel=most_read5">Ukraine Reports Surrender of Russian Soldier in East</a>        </div>               </li>   </ul>  <script type="text/javascript">   if (typeof jQuery != 'undefined') {     (function($){       if ($('.item-shares-wrapper').length != 0) {         $('.item-shares-wrapper').mouseenter(function() {           $(this).find('.item-shares').addClass('hidden');           $(this).find('.addthis_toolbox').removeClass('hidden');         });                  $('.item-shares-wrapper').mouseleave(function() {           $(this).find('.item-shares').removeClass('hidden');           $(this).find('.addthis_toolbox').addClass('hidden');         });         addthis.toolbox('.addthis_toolbox');       }             })(jQuery)   } </script></div></div></div></div>""")


let html2 = """<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Modal Header</h4>
      </div>
      <div class="modal-body">
        <p>Some text in the modal.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>"""

HtmlDocument.Parse(html2).Elements()
|> Seq.skip 0
//|> Seq.take 2
|> Seq.map (fromHtmlToFReact 2)
|> String.concat ", "
|> printfn "        %s"

camelize "aria-controls"