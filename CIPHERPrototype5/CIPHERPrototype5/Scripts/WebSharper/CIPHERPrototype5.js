(function()
{
 "use strict";
 var Global,CIPHERSpace,Model,User,Client,Language,Report,Dimension,Cube,ServerOlap,CubeOlap,DimOlap,ElemOlap,Connection,Workspace,ObjectT,Password,ElemOlapRel,Rop,Option,Rop$1,ropBuilder,ARop,Builder,SC$1,Model2,Auth,Token,Server,callServerBuilder,SC$2,R,ReactDOM,ReactHtml,App,Dummy,MailboxState,App$1,SetNode,Props,Popup,Props$1,Model$1,Dialog,Props$2,Model$2,GenForm,Validation,Props$3,Model$3,Fields,SC$3,Entry,FileTreeNode,Props$4,Model$4,FileTree,Props$5,Model$5,UploadForm,Props$6,Model$6,SC$4,LoginForm,Model$7,CIPHERPrototype5_GeneratedPrintf,GeneratedPrintf,IntelliFactory,Runtime,WebSharper,Unchecked,Strings,List,Enumerator,Operators,Seq,MatchFailureException,Concurrency,Slice,Arrays,Control,MailboxProcessor,Html,Client$1,Attr,Tags,Operators$1,Collections,FSharpSet,Set,BalancedTree,Remoting,AjaxRemotingProvider,PrintfHelpers;
 Global=window;
 CIPHERSpace=Global.CIPHERSpace=Global.CIPHERSpace||{};
 Model=CIPHERSpace.Model=CIPHERSpace.Model||{};
 User=Model.User=Model.User||{};
 Client=Model.Client=Model.Client||{};
 Language=Model.Language=Model.Language||{};
 Report=Model.Report=Model.Report||{};
 Dimension=Model.Dimension=Model.Dimension||{};
 Cube=Model.Cube=Model.Cube||{};
 ServerOlap=Model.ServerOlap=Model.ServerOlap||{};
 CubeOlap=Model.CubeOlap=Model.CubeOlap||{};
 DimOlap=Model.DimOlap=Model.DimOlap||{};
 ElemOlap=Model.ElemOlap=Model.ElemOlap||{};
 Connection=Model.Connection=Model.Connection||{};
 Workspace=Model.Workspace=Model.Workspace||{};
 ObjectT=Model.ObjectT=Model.ObjectT||{};
 Password=Model.Password=Model.Password||{};
 ElemOlapRel=Model.ElemOlapRel=Model.ElemOlapRel||{};
 Rop=Global.Rop=Global.Rop||{};
 Option=Rop.Option=Rop.Option||{};
 Rop$1=Rop.Rop=Rop.Rop||{};
 ropBuilder=Rop$1.ropBuilder=Rop$1.ropBuilder||{};
 ARop=Rop.ARop=Rop.ARop||{};
 Builder=ARop.Builder=ARop.Builder||{};
 SC$1=Global.StartupCode$CIPHERPrototype5$Rop=Global.StartupCode$CIPHERPrototype5$Rop||{};
 Model2=CIPHERSpace.Model2=CIPHERSpace.Model2||{};
 Auth=CIPHERSpace.Auth=CIPHERSpace.Auth||{};
 Token=Auth.Token=Auth.Token||{};
 Server=CIPHERSpace.Server=CIPHERSpace.Server||{};
 callServerBuilder=Server.callServerBuilder=Server.callServerBuilder||{};
 SC$2=Global.StartupCode$CIPHERPrototype5$Server=Global.StartupCode$CIPHERPrototype5$Server||{};
 R=CIPHERSpace.R=CIPHERSpace.R||{};
 ReactDOM=CIPHERSpace.ReactDOM=CIPHERSpace.ReactDOM||{};
 ReactHtml=CIPHERSpace.ReactHtml=CIPHERSpace.ReactHtml||{};
 App=CIPHERSpace.App=CIPHERSpace.App||{};
 Dummy=App.Dummy=App.Dummy||{};
 MailboxState=App.MailboxState=App.MailboxState||{};
 App$1=App.App=App.App||{};
 SetNode=CIPHERSpace.SetNode=CIPHERSpace.SetNode||{};
 Props=SetNode.Props=SetNode.Props||{};
 Popup=CIPHERSpace.Popup=CIPHERSpace.Popup||{};
 Props$1=Popup.Props=Popup.Props||{};
 Model$1=Popup.Model=Popup.Model||{};
 Dialog=CIPHERSpace.Dialog=CIPHERSpace.Dialog||{};
 Props$2=Dialog.Props=Dialog.Props||{};
 Model$2=Dialog.Model=Dialog.Model||{};
 GenForm=CIPHERSpace.GenForm=CIPHERSpace.GenForm||{};
 Validation=GenForm.Validation=GenForm.Validation||{};
 Props$3=GenForm.Props=GenForm.Props||{};
 Model$3=GenForm.Model=GenForm.Model||{};
 Fields=CIPHERSpace.Fields=CIPHERSpace.Fields||{};
 SC$3=Global.StartupCode$CIPHERPrototype5$GenForm=Global.StartupCode$CIPHERPrototype5$GenForm||{};
 Entry=CIPHERSpace.Entry=CIPHERSpace.Entry||{};
 FileTreeNode=CIPHERSpace.FileTreeNode=CIPHERSpace.FileTreeNode||{};
 Props$4=FileTreeNode.Props=FileTreeNode.Props||{};
 Model$4=FileTreeNode.Model=FileTreeNode.Model||{};
 FileTree=CIPHERSpace.FileTree=CIPHERSpace.FileTree||{};
 Props$5=FileTree.Props=FileTree.Props||{};
 Model$5=FileTree.Model=FileTree.Model||{};
 UploadForm=CIPHERSpace.UploadForm=CIPHERSpace.UploadForm||{};
 Props$6=UploadForm.Props=UploadForm.Props||{};
 Model$6=UploadForm.Model=UploadForm.Model||{};
 SC$4=Global.StartupCode$CIPHERPrototype5$UploadForm=Global.StartupCode$CIPHERPrototype5$UploadForm||{};
 LoginForm=CIPHERSpace.LoginForm=CIPHERSpace.LoginForm||{};
 Model$7=LoginForm.Model=LoginForm.Model||{};
 CIPHERPrototype5_GeneratedPrintf=Global.CIPHERPrototype5_GeneratedPrintf=Global.CIPHERPrototype5_GeneratedPrintf||{};
 GeneratedPrintf=Global.GeneratedPrintf=Global.GeneratedPrintf||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 WebSharper=Global.WebSharper;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Strings=WebSharper&&WebSharper.Strings;
 List=WebSharper&&WebSharper.List;
 Enumerator=WebSharper&&WebSharper.Enumerator;
 Operators=WebSharper&&WebSharper.Operators;
 Seq=WebSharper&&WebSharper.Seq;
 MatchFailureException=WebSharper&&WebSharper.MatchFailureException;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Slice=WebSharper&&WebSharper.Slice;
 Arrays=WebSharper&&WebSharper.Arrays;
 Control=WebSharper&&WebSharper.Control;
 MailboxProcessor=Control&&Control.MailboxProcessor;
 Html=WebSharper&&WebSharper.Html;
 Client$1=Html&&Html.Client;
 Attr=Client$1&&Client$1.Attr;
 Tags=Client$1&&Client$1.Tags;
 Operators$1=Client$1&&Client$1.Operators;
 Collections=WebSharper&&WebSharper.Collections;
 FSharpSet=Collections&&Collections.FSharpSet;
 Set=Collections&&Collections.Set;
 BalancedTree=Collections&&Collections.BalancedTree;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 PrintfHelpers=WebSharper&&WebSharper.PrintfHelpers;
 User=Model.User=Runtime.Class({
  isGuest_:function()
  {
   return Unchecked.Equals(new User({
    $:0,
    $0:"ef047959-15b4-43dc-b131-39646009a706"
   }),this);
  },
  get_userCode:function()
  {
   return this.$0;
  }
 },null,User);
 Client=Model.Client=Runtime.Class({
  get_clientCode:function()
  {
   return this.$0;
  }
 },null,Client);
 Language=Model.Language=Runtime.Class({
  get_languageCode:function()
  {
   return this.$0;
  }
 },null,Language);
 Language.get_defaultL=function()
 {
  return new Language({
   $:0,
   $0:"en"
  });
 };
 Report=Model.Report=Runtime.Class({
  get_reportId:function()
  {
   return this.$0;
  }
 },null,Report);
 Dimension=Model.Dimension=Runtime.Class({
  get_dimensionId:function()
  {
   return this.$0;
  }
 },null,Dimension);
 Cube=Model.Cube=Runtime.Class({
  get_cubeId:function()
  {
   return this.$0;
  }
 },null,Cube);
 ServerOlap=Model.ServerOlap=Runtime.Class({
  get_serverId:function()
  {
   return this.$0;
  }
 },null,ServerOlap);
 CubeOlap=Model.CubeOlap=Runtime.Class({
  get_name:function()
  {
   return this.$0;
  },
  get_cubeOlapId:function()
  {
   return this.$0.toUpperCase();
  }
 },null,CubeOlap);
 DimOlap=Model.DimOlap=Runtime.Class({
  get_name:function()
  {
   return this.$0;
  },
  get_dimOlapId:function()
  {
   return this.$0.toUpperCase();
  }
 },null,DimOlap);
 ElemOlap=Model.ElemOlap=Runtime.Class({
  get_name:function()
  {
   return this.$0;
  },
  get_elemOlapId:function()
  {
   var _this;
   _this=this.$0.toLowerCase();
   return Strings.Replace(_this," ","");
  }
 },null,ElemOlap);
 Connection=Model.Connection=Runtime.Class({
  get_ConnectionId:function()
  {
   return this.$0;
  }
 },null,Connection);
 Workspace=Model.Workspace=Runtime.Class({
  get_getObject:function()
  {
   return new ObjectT({
    $:0,
    $0:this.$0
   });
  }
 },null,Workspace);
 ObjectT=Model.ObjectT=Runtime.Class({
  get_objectId:function()
  {
   return this.$0;
  }
 },null,ObjectT);
 Password.New=function(hash,salt,settings)
 {
  return{
   hash:hash,
   salt:salt,
   settings:settings
  };
 };
 ElemOlapRel=Model.ElemOlapRel=Runtime.Class({
  AddChild:function(elem)
  {
   this._children=this._children;
  },
  get_GetChildren:function()
  {
   return this._children;
  },
  get_Elem:function()
  {
   return this.elem;
  }
 },null,ElemOlapRel);
 ElemOlapRel.New=Runtime.Ctor(function(elem)
 {
  this.elem=elem;
  this._children=new List.T({
   $:0
  });
 },ElemOlapRel);
 Model.dockerFromText=function(a)
 {
  return a==="DckSingle"?{
   $:1
  }:a==="DckGoldenLayout"?{
   $:2
  }:a==="DckWCDocker"?{
   $:3
  }:a==="DckPhosphor"?{
   $:4
  }:a==="DckDockSpawn"?{
   $:5
  }:{
   $:0
  };
 };
 Option.modify=function(modifier)
 {
  var f,g,v;
  f=function(o)
  {
   return o==null?null:{
    $:1,
    $0:modifier(o.$0)
   };
  };
  g=(v=Global.id,function(a)
  {
   return Option.defaultValue(v,a);
  });
  return function(x)
  {
   return g(f(x));
  };
 };
 Option.apply=function(vO,fO)
 {
  var $1;
  return((vO!=null?vO.$==1:false)?(fO!=null?fO.$==1:false)?($1=[fO.$0,vO.$0],true):false:false)?{
   $:1,
   $0:$1[0]($1[1])
  }:null;
 };
 Option.iterFO=function(vO,fO)
 {
  if(vO!=null?vO.$==1:false)
   if(fO!=null?fO.$==1:false)
    fO.$0(vO.$0);
 };
 Option.iterF=function(v,a)
 {
  if(a!=null?a.$==1:false)
   a.$0(v);
 };
 Option.call=function(v,a)
 {
  return(a!=null?a.$==1:false)?{
   $:1,
   $0:a.$0(v)
  }:null;
 };
 Option.defaultValue=function(v,a)
 {
  return(a!=null?a.$==1:false)?a.$0:v;
 };
 ropBuilder=Rop$1.ropBuilder=Runtime.Class({
  For:function(sequence,body)
  {
   var $this;
   $this=this;
   return this.Using(Enumerator.Get(sequence),function(_enum)
   {
    return $this.While(function()
    {
     return _enum.MoveNext();
    },$this.Delay(function()
    {
     return body(_enum.Current());
    }));
   });
  },
  While:function(guard,body)
  {
   var $this;
   $this=this;
   return!guard()?this.Zero():this.Bind(body(),function()
   {
    return $this.While(guard,body);
   });
  },
  Combine:function(a,b)
  {
   return a.$==1?b.$==1?{
    $:1,
    $0:List.append(a.$0,b.$0)
   }:{
    $:1,
    $0:List.append(a.$0,b.$1)
   }:b.$==1?{
    $:1,
    $0:List.append(a.$1,b.$0)
   }:{
    $:0,
    $0:b.$0,
    $1:List.append(a.$1,b.$1)
   };
  },
  Delay:function(f)
  {
   return f();
  },
  Zero:function()
  {
   return Rop$1.succeed();
  },
  Using:function(disposable,restOfCExpr)
  {
   return Operators.Using(disposable,restOfCExpr);
  },
  Bind:function(wrapped,restOfCExpr)
  {
   return(Rop$1.bindTry(restOfCExpr))(wrapped);
  },
  ReturnFrom:Global.id,
  Return:function(x)
  {
   return Rop$1.succeed(x);
  }
 },null,ropBuilder);
 ropBuilder.New=Runtime.Ctor(function()
 {
 },ropBuilder);
 Rop$1.seqCheck=function(s)
 {
  var m,p,c,m$1;
  m=(p=function(a)
  {
   return a.$==1?true:false;
  },function(s$1)
  {
   return Seq.exists(p,s$1);
  }(s));
  return m?{
   $:1,
   $0:(c=function(a)
   {
    return a.$==1?{
     $:1,
     $0:a.$0
    }:null;
   },function(s$1)
   {
    return Seq.pick(c,s$1);
   }(s))
  }:Rop$1.succeed((m$1=function(a)
  {
   if(a.$==0)
    return a.$0;
   else
    throw new MatchFailureException.New("Rop.fs",217,69);
  },function(s$1)
  {
   return Seq.map(m$1,s$1);
  }(s)));
 };
 Rop$1.messagesDo=function(f,a)
 {
  return a.$==1?f(true,a.$0):f(false,a.$1);
 };
 Rop$1.notifyMessages=function(R$1)
 {
  if(R$1.$==1)
   Rop$1.processMessages("E",R$1.$0);
  else
   Rop$1.processMessages("N",R$1.$1);
 };
 Rop$1.processMessages=function(mtype,msgs)
 {
  var a;
  a=function(o)
  {
   var m,f;
   m=mtype+": "+(f=function($1,$2)
   {
    return $1(CIPHERPrototype5_GeneratedPrintf.p($2));
   },(function($1)
   {
    return function($2)
    {
     return f($1,$2);
    };
   }(Global.id))(o));
   Global.alert(m);
   Global.console.log(o);
  };
  (function(l)
  {
   List.iter(a,l);
  }(msgs));
 };
 Rop$1.ifError=function(def,a)
 {
  return a.$==0?a.$0:def;
 };
 Rop$1.assertR=function(v,m)
 {
  return v?Rop$1.succeed():Rop$1.fail(m);
 };
 Rop$1.tryProtection=function()
 {
  return Rop$1.succeed();
 };
 Rop$1.toOption=function(a)
 {
  return a.$==0?{
   $:1,
   $0:a.$0
  }:null;
 };
 Rop$1.fromOption=function(m,a)
 {
  return(a!=null?a.$==1:false)?Rop$1.succeed(a.$0):Rop$1.fail(m);
 };
 Rop$1.fromChoice=function(context,c)
 {
  return c.$==1?Rop$1.fail({
   $:1,
   $0:c.$0
  }):Rop$1.succeed(c.$0);
 };
 Rop$1.flow=function()
 {
  SC$1.$cctor();
  return SC$1.flow;
 };
 Rop$1.liftTry=function(f)
 {
  var f$1;
  f$1=Rop$1.callTry(f);
  return function(r)
  {
   return Rop$1.bindR(f$1,r);
  };
 };
 Rop$1.bindTry=function(f)
 {
  var f$1;
  f$1=function(v)
  {
   return Rop$1.doTry(f,v);
  };
  return function(r)
  {
   return Rop$1.bindR(f$1,r);
  };
 };
 Rop$1.callTry=function(f)
 {
  var f$1;
  f$1=function(x)
  {
   return Rop$1.succeed(f(x));
  };
  return function(v)
  {
   return Rop$1.doTry(f$1,v);
  };
 };
 Rop$1.doTry=function(f,v)
 {
  try
  {
   return f(v);
  }
  catch(e)
  {
   return Rop$1.failException(e);
  }
 };
 Rop$1.failException=function(e)
 {
  return Rop$1.fail({
   $:1,
   $0:Global.String(e)
  });
 };
 Rop$1.failIfNoneR=function(message,a)
 {
  return a==null?Rop$1.fail(message):a.$0;
 };
 Rop$1.failIfNone=function(message,a)
 {
  return a==null?Rop$1.fail(message):Rop$1.succeed(a.$0);
 };
 Rop$1.valueOrDefault=function(f,result)
 {
  return result.$==1?f(result.$0):result.$0;
 };
 Rop$1.mapMessagesR=function(f,result)
 {
  return result.$==1?{
   $:1,
   $0:List.map(f,result.$0)
  }:{
   $:0,
   $0:result.$0,
   $1:List.map(f,result.$1)
  };
 };
 Rop$1.failureTee=function(f,result)
 {
  return Rop$1.either(function(a,a$1)
  {
   return{
    $:0,
    $0:a,
    $1:a$1
   };
  },function(e)
  {
   return Rop$1.fFailure2(f,e);
  },result);
 };
 Rop$1.fFailure2=function(f,errs)
 {
  f(errs);
  return{
   $:1,
   $0:errs
  };
 };
 Rop$1.successTee=function(f,result)
 {
  return Rop$1.either(function(x,msgs)
  {
   f(x,msgs);
   return{
    $:0,
    $0:x,
    $1:msgs
   };
  },function(a)
  {
   return{
    $:1,
    $0:a
   };
  },result);
 };
 Rop$1.mapR=function(v)
 {
  return function(r)
  {
   return Rop$1.liftR(v,r);
  };
 };
 Rop$1.op_LessBangGreater=function()
 {
  SC$1.$cctor();
  return SC$1.op_LessBangGreater;
 };
 Rop$1.lift4R=function(f,result1,result2,result3,result4)
 {
  var _f;
  _f=Rop$1.lift3R(f,result1,result2,result3);
  return Rop$1.applyR(_f,result4);
 };
 Rop$1.lift3R=function(f,result1,result2,result3)
 {
  var _f;
  _f=Rop$1.lift2R(f,result1,result2);
  return Rop$1.applyR(_f,result3);
 };
 Rop$1.lift2R=function(f,result1,result2)
 {
  var _f;
  _f=Rop$1.liftR(f,result1);
  return Rop$1.applyR(_f,result2);
 };
 Rop$1.liftR=function(f,result)
 {
  var _f;
  _f=Rop$1.succeed(f);
  return Rop$1.applyR(_f,result);
 };
 Rop$1.op_LessMultiplyGreater=function()
 {
  SC$1.$cctor();
  return SC$1.op_LessMultiplyGreater;
 };
 Rop$1.applyR=function(f,result)
 {
  var $1,$2;
  switch(f.$==1?result.$==1?($1=[f.$0,result.$0],2):($1=[f.$0,result.$1],1):result.$==1?($1=[result.$0,f.$1],1):($1=[f.$0,f.$1,result.$1,result.$0],0))
  {
   case 0:
    $2=$1[0]($1[3]);
    return{
     $:0,
     $0:$2,
     $1:List.append($1[1],$1[2])
    };
    break;
   case 1:
    return{
     $:1,
     $0:List.append($1[0],$1[1])
    };
    break;
   case 2:
    return{
     $:1,
     $0:List.append($1[0],$1[1])
    };
    break;
  }
 };
 Rop$1.bindR=function(f,result)
 {
  return Rop$1.either(function(x,m)
  {
   return Rop$1.fSuccess1(f,x,m);
  },function(a)
  {
   return{
    $:1,
    $0:a
   };
  },result);
 };
 Rop$1.fSuccess1=function(f,x,msgs)
 {
  var r;
  r=f(x);
  return Rop$1.mergeMessages(msgs,r);
 };
 Rop$1.mergeMessages=function(msgs,result)
 {
  return Rop$1.either(function(x,m)
  {
   return Rop$1.fSuccess0(msgs,x,m);
  },function(e)
  {
   return Rop$1.fFailure1(msgs,e);
  },result);
 };
 Rop$1.fFailure1=function(msgs,errs)
 {
  return{
   $:1,
   $0:List.append(errs,msgs)
  };
 };
 Rop$1.fSuccess0=function(msgs,x,msgs2)
 {
  return{
   $:0,
   $0:x,
   $1:List.append(msgs,msgs2)
  };
 };
 Rop$1.either=function(fSuccess,fFailure,a)
 {
  return a.$==1?fFailure(a.$0):fSuccess(a.$0,a.$1);
 };
 Rop$1.fail=function(msg)
 {
  return{
   $:1,
   $0:List.ofArray([msg])
  };
 };
 Rop$1.succeedWithMsg=function(x,msg)
 {
  return{
   $:0,
   $0:x,
   $1:List.ofArray([msg])
  };
 };
 Rop$1.succeed=function(x)
 {
  return{
   $:0,
   $0:x,
   $1:new List.T({
    $:0
   })
  };
 };
 Builder=ARop.Builder=Runtime.Class({
  Delay:function(f)
  {
   return f();
  },
  Return:function(x)
  {
   return{
    $:3,
    $0:x
   };
  },
  Zero:function()
  {
   return{
    $:3,
    $0:null
   };
  },
  Bind:function(wrapped,restOfCExpr)
  {
   return ARop.bind(restOfCExpr,{
    $:4,
    $0:wrapped
   });
  },
  Bind$1:function(wrapped,restOfCExpr)
  {
   return ARop.bind(restOfCExpr,{
    $:0,
    $0:wrapped
   });
  },
  Bind$2:function(wrapped,restOfCExpr)
  {
   return ARop.bind(restOfCExpr,{
    $:2,
    $0:wrapped
   });
  },
  Bind$3:function(wrapped,restOfCExpr)
  {
   return ARop.bind(restOfCExpr,wrapped);
  }
 },null,Builder);
 Builder.New=Runtime.Ctor(function()
 {
 },Builder);
 ARop.call=function(wb)
 {
  var c;
  c=function(R$1)
  {
   Rop$1.notifyMessages(R$1);
  };
  (function(w)
  {
   ARop.getR(c,w);
  }(wb));
 };
 ARop.getR=function(callback,wb)
 {
  if(wb.$==4)
  {
   if(wb.$0==null)
    callback(Rop$1.fail({
     $:30
    }));
   else
    callback(Rop$1.succeed(wb.$0.$0));
  }
  else
   if(wb.$==0)
    callback(wb.$0);
   else
    if(wb.$==1)
     Concurrency.StartWithContinuations(wb.$0,function(v)
     {
      callback(Rop$1.succeed(v));
     },function(exc)
     {
      callback(Rop$1.failException(exc));
     },function(can)
     {
      callback(Rop$1.failException(can));
     },null);
    else
     if(wb.$==2)
      Concurrency.StartWithContinuations(wb.$0,callback,function(exc)
      {
       callback(Rop$1.failException(exc));
      },function(can)
      {
       callback(Rop$1.failException(can));
      },null);
     else
      callback(Rop$1.succeed(wb.$0));
 };
 ARop.wrap=function()
 {
  SC$1.$cctor();
  return SC$1.wrap;
 };
 ARop.bind=function(f,wa)
 {
  var $1,$2,$3,ms,m;
  switch(wa.$==4?wa.$0==null?1:($1=wa.$0.$0,0):wa.$==0?wa.$0.$==1?($1=wa.$0.$0,2):wa.$0.$1.$==0?($1=wa.$0.$0,0):($1=[wa.$0.$0,wa.$0.$1],3):wa.$==1?($1=wa.$0,4):wa.$==2?($1=wa.$0,5):($1=wa.$0,0))
  {
   case 0:
    return f($1);
    break;
   case 1:
    return{
     $:4,
     $0:null
    };
    break;
   case 2:
    return{
     $:0,
     $0:{
      $:1,
      $0:$1
     }
    };
    break;
   case 3:
    ms=$1[1];
    m=f($1[0]);
    switch(m.$==3?($3=m.$0,0):m.$==0?m.$0.$==1?($3=m.$0.$0,2):m.$0.$1.$==0?($3=m.$0.$0,0):($3=[m.$0.$0,m.$0.$1],1):m.$==1?($3=m.$0,3):m.$==2?($3=m.$0,4):5)
    {
     case 0:
      $2={
       $:0,
       $0:{
        $:0,
        $0:$3,
        $1:ms
       }
      };
      break;
     case 1:
      $2={
       $:0,
       $0:{
        $:0,
        $0:$3[0],
        $1:List.append(ms,$3[1])
       }
      };
      break;
     case 2:
      $2={
       $:0,
       $0:{
        $:1,
        $0:List.append(ms,$3)
       }
      };
      break;
     case 3:
      $2={
       $:2,
       $0:Concurrency.Delay(function()
       {
        return Concurrency.Bind($3,function(a)
        {
         return Concurrency.Return({
          $:0,
          $0:a,
          $1:ms
         });
        });
       })
      };
      break;
     case 4:
      $2={
       $:2,
       $0:Concurrency.Delay(function()
       {
        return Concurrency.Bind($3,function(a)
        {
         return Concurrency.Return(Rop$1.mergeMessages(ms,a));
        });
       })
      };
      break;
     case 5:
      throw new MatchFailureException.New("Rop.fs",246,43);
      $2=void 0;
      break;
    }
    return $2;
    break;
   case 4:
    return{
     $:2,
     $0:Concurrency.Delay(function()
     {
      return Concurrency.Bind($1,function(a)
      {
       var x,m$1;
       x=f(a);
       m$1=new List.T({
        $:0
       });
       return ARop.wb2arb(m$1,x);
      });
     })
    };
    break;
   case 5:
    return{
     $:2,
     $0:Concurrency.Delay(function()
     {
      return Concurrency.Bind($1,function(a)
      {
       var ms$1,a$1;
       return a.$==1?(ms$1=a.$0,Concurrency.Delay(function()
       {
        return Concurrency.Return({
         $:1,
         $0:ms$1
        });
       })):(a$1=f(a.$0),ARop.wb2arb(a.$1,a$1));
      });
     })
    };
    break;
  }
 };
 ARop.wb2arb=function(ms,a)
 {
  var arb,rb,b,b$1,ab;
  return a.$==2?(arb=a.$0,Concurrency.Delay(function()
  {
   return Concurrency.Bind(arb,function(a$1)
   {
    return Concurrency.Return(Rop$1.mergeMessages(ms,a$1));
   });
  })):a.$==0?(rb=a.$0,Concurrency.Delay(function()
  {
   return Concurrency.Return(Rop$1.mergeMessages(ms,rb));
  })):a.$==3?(b=a.$0,Concurrency.Delay(function()
  {
   return Concurrency.Return({
    $:0,
    $0:b,
    $1:ms
   });
  })):a.$==4?a.$0==null?Concurrency.Delay(function()
  {
   return Concurrency.Return({
    $:1,
    $0:new List.T({
     $:1,
     $0:{
      $:30
     },
     $1:ms
    })
   });
  }):(b$1=a.$0.$0,Concurrency.Delay(function()
  {
   return Concurrency.Return({
    $:0,
    $0:b$1,
    $1:ms
   });
  })):(ab=a.$0,Concurrency.Delay(function()
  {
   return Concurrency.Bind(ab,function(a$1)
   {
    return Concurrency.Return({
     $:0,
     $0:a$1,
     $1:ms
    });
   });
  }));
 };
 SC$1.$cctor=Runtime.Cctor(function()
 {
  SC$1.op_LessMultiplyGreater=function(f)
  {
   return function(r)
   {
    return Rop$1.applyR(f,r);
   };
  };
  SC$1.op_LessBangGreater=function(f)
  {
   return function(r)
   {
    return Rop$1.liftR(f,r);
   };
  };
  SC$1.flow=new ropBuilder.New();
  SC$1.wrap=new Builder.New();
  SC$1.$cctor=Global.ignore;
 });
 Model2.sortOrder=function(order,alt)
 {
  return(order!=null?order.$==1:false)?Strings.Trim(order.$0)!==""?Strings.Trim(order.$0):alt:alt;
 };
 Model2.left=function(n,s)
 {
  return s.length<=n?s:Slice.string(s,{
   $:1,
   $0:0
  },{
   $:1,
   $0:n-1
  });
 };
 Model2.strToKey=function(s)
 {
  var _this;
  _this=s.toLowerCase();
  return Strings.Replace(_this," ","");
 };
 Model2.callF=function(f,p1,p2)
 {
  return Runtime.CreateFuncWithArgs(f).apply(null,[p1,p2]);
 };
 Token.New=function(Name,Hash)
 {
  return{
   Name:Name,
   Hash:Hash
  };
 };
 callServerBuilder=Server.callServerBuilder=Runtime.Class({
  Combine:function(a,b)
  {
   return a.$==1?b.$==1?{
    $:1,
    $0:List.append(a.$0,b.$0)
   }:{
    $:1,
    $0:List.append(a.$0,b.$1)
   }:b.$==1?{
    $:1,
    $0:List.append(a.$1,b.$0)
   }:{
    $:0,
    $0:b.$0,
    $1:List.append(a.$1,b.$1)
   };
  },
  Delay:function(f)
  {
   return f();
  },
  Return:function(x)
  {
   return Rop$1.succeed(x);
  },
  Zero:function()
  {
  },
  Bind:function(wrapped,restOfCExpr)
  {
   this.handleErrors((Rop$1.liftTry(restOfCExpr))(wrapped));
  },
  Bind$1:function(wrapped,restOfCExpr)
  {
   Server.callServerDo(wrapped,restOfCExpr,this.handleErrors);
  }
 },null,callServerBuilder);
 callServerBuilder.New=Runtime.Ctor(function(handleErrors)
 {
  this.handleErrors=handleErrors;
 },callServerBuilder);
 Server.callR=function(handleErrors)
 {
  return new callServerBuilder.New(handleErrors);
 };
 Server.call=function()
 {
  SC$2.$cctor();
  return SC$2.call;
 };
 Server.callServerDo=function(wrapped,restOfCExpr,handleErrors)
 {
  var asy;
  asy=Concurrency.Delay(function()
  {
   return Concurrency.Bind(wrapped,function(a)
   {
    var b;
    handleErrors((b=Rop$1.flow(),b.Delay(function()
    {
     return b.Bind(Rop$1.tryProtection(),function()
     {
      return b.Bind(a,function(a$1)
      {
       restOfCExpr(a$1);
       return b.Zero();
      });
     });
    })));
    return Concurrency.Return(null);
   });
  });
  Concurrency.StartWithContinuations(asy,function()
  {
  },function(exc)
  {
   Rop$1.notifyMessages(Rop$1.failException(exc));
  },function(can)
  {
   Rop$1.notifyMessages(Rop$1.failException(can));
  },null);
 };
 SC$2.$cctor=Runtime.Cctor(function()
 {
  SC$2.call=new callServerBuilder.New(function(R$1)
  {
   Rop$1.notifyMessages(R$1);
  });
  SC$2.$cctor=Global.ignore;
 });
 R=CIPHERSpace.R=Runtime.Class({},null,R);
 R.E00=function(elem,attrs,children)
 {
  var reduceAtt,m,r,a,a$1;
  reduceAtt=(m=Arrays.length(attrs)===0,m?{}:(r=function(a$2,b)
  {
   return Global.$.extend(true,{},a$2,b);
  },function(a$2)
  {
   return Arrays.reduce(r,a$2);
  }(attrs)));
  a=(a$1=[elem,reduceAtt],function(a$2)
  {
   return a$1.concat(a$2);
  }(children));
  return Global.React.createElement.apply(null,a);
 };
 R.E0=function(elem,attrs,children)
 {
  var reduceAtt,r,a,a$1;
  reduceAtt=attrs.$==0?{}:(r=function(a$2,b)
  {
   return Global.$.extend(true,{},a$2,b);
  },function(l)
  {
   return Seq.reduce(r,l);
  }(attrs));
  a=new List.T({
   $:1,
   $0:elem,
   $1:new List.T({
    $:1,
    $0:reduceAtt,
    $1:List.ofSeq(children)
   })
  });
  return a.$==0?Global.React.createElement.apply(null,[elem,reduceAtt]):(a$1=Arrays.ofList(a),Global.React.createElement.apply(null,a$1));
 };
 R.New=Runtime.Ctor(function()
 {
 },R);
 ReactDOM=CIPHERSpace.ReactDOM=Runtime.Class({},null,ReactDOM);
 ReactDOM.New=Runtime.Ctor(function()
 {
 },ReactDOM);
 ReactHtml.reactContainerClass=function(className,afterRender)
 {
  var options,r;
  options=(r={},r.displayName="containerClass",r.componentDidMount=function()
  {
   afterRender(this,Global.ReactDOM.findDOMNode(this));
  },r.shouldComponentUpdate=function()
  {
   return false;
  },r.render=function()
  {
   return ReactHtml.toReact(ReactHtml.Div([ReactHtml.Class(className)]));
  },r);
  return Global.React.createClass(options);
 };
 ReactHtml.toIncrementalDom=function(node)
 {
  var attributeR;
  function elementR(a)
  {
   var $1,tag,children,v,s,attrs,a$1,r,m,v$1;
   switch(a.$==1?1:a.$==6?2:a.$==7?3:a.$==4?4:a.$==5?4:a.$==2?4:a.$==3?4:a.$==8?4:0)
   {
    case 0:
     tag=a.$0;
     children=a.$1;
     v=(s=[],function(p)
     {
      return ReactHtml.elementOpen(tag,null,s,p);
     }((attrs=(a$1=Arrays.collect(attributeR,children),Arrays.length(a$1)===0?{}:(r=function(a$2,b)
     {
      return Global.$.extend(true,{},a$2,b);
     },function(s$1)
     {
      return Seq.reduce(r,s$1);
     }(a$1))),m=function(name)
     {
      return[name==="className"?"class":Strings.StartsWith(name,"on")?name.toLowerCase():name,attrs[name]];
     },function(a$2)
     {
      return Arrays.collect(m,a$2);
     }(Global.Object.keys(attrs)))));
     v$1=Arrays.map(elementR,children);
     return ReactHtml.elementClose(tag);
     break;
    case 1:
     return ReactHtml.textIDom(a.$0);
     break;
    case 2:
     return elementR(a.$0.CIPHERSpace_ReactHtml_IUIObject$view());
     break;
    case 3:
     return a.$0.CIPHERSpace_ReactHtml_IUIApp$nodeIncDom(a.$1);
     break;
    case 4:
     return null;
     break;
   }
  }
  attributeR=function(a)
  {
   var $1;
   switch(a.$==3?1:a.$==0?2:a.$==1?2:a.$==4?2:a.$==5?2:a.$==6?2:a.$==7?2:a.$==8?2:0)
   {
    case 0:
     return[ReactHtml.newAttr(a.$0,a.$1)];
     break;
    case 1:
     return a.$0;
     break;
    case 2:
     return[];
     break;
   }
  };
  return elementR(node);
 };
 ReactHtml.textIDom=function(txt)
 {
  var x;
  x=Global.window.IncrementalDOM;
  return x.text.apply(x,[txt]);
 };
 ReactHtml.elementClose=function(tag)
 {
  var x;
  x=Global.window.IncrementalDOM;
  return x.elementClose.apply(x,[tag]);
 };
 ReactHtml.elementOpen=function(tag,key,statics,pairs)
 {
  var x;
  x=Global.window.IncrementalDOM;
  return x.elementOpen.apply(x,[tag,key,statics].concat(pairs));
 };
 ReactHtml.patchInner=function(container,f)
 {
  var x;
  x=Global.window.IncrementalDOM;
  x.patchInner.apply(x,[container,f]);
 };
 ReactHtml.patchOuter=function(container,f)
 {
  var x;
  x=Global.window.IncrementalDOM;
  x.patchOuter.apply(x,[container,f]);
 };
 ReactHtml.toReact=function(node)
 {
  var attributeR,a;
  function elementR(a$1)
  {
   var $1,children,subNodes,attributes;
   switch(a$1.$==1?1:a$1.$==4?2:a$1.$==5?3:a$1.$==6?4:a$1.$==7?5:a$1.$==8?6:a$1.$==2?7:a$1.$==3?7:0)
   {
    case 0:
     children=a$1.$1;
     subNodes=Arrays.choose(elementR,children);
     attributes=Arrays.collect(attributeR,children);
     return{
      $:1,
      $0:R.E00(a$1.$0,attributes,subNodes)
     };
     break;
    case 1:
     return{
      $:1,
      $0:a$1.$0
     };
     break;
    case 2:
     return{
      $:1,
      $0:a$1.$0
     };
     break;
    case 3:
     return{
      $:1,
      $0:Global.React.createElement.apply(null,[a$1.$0])
     };
     break;
    case 4:
     return elementR(a$1.$0.CIPHERSpace_ReactHtml_IUIObject$view());
     break;
    case 5:
     return{
      $:1,
      $0:a$1.$0.CIPHERSpace_ReactHtml_IUIApp$nodeR(a$1.$1)
     };
     break;
    case 6:
     return{
      $:1,
      $0:null
     };
     break;
    case 7:
     return null;
     break;
   }
  }
  attributeR=function(a$1)
  {
   var $1;
   switch(a$1.$==3?1:a$1.$==0?2:a$1.$==1?2:a$1.$==4?2:a$1.$==5?2:a$1.$==6?2:a$1.$==7?2:a$1.$==8?2:0)
   {
    case 0:
     return[ReactHtml.newAttr(a$1.$0,a$1.$1)];
     break;
    case 1:
     return a$1.$0;
     break;
    case 2:
     return[];
     break;
   }
  };
  a=elementR(node);
  return Option.defaultValue(null,a);
 };
 ReactHtml.__outerHtml=function(html)
 {
  var d,b;
  d={
   $:8
  };
  return function(a)
  {
   return Rop$1.ifError(d,a);
  }((b=Rop$1.flow(),b.Delay(function()
  {
   return b.Bind(Rop$1.tryProtection(),function()
   {
    var n,elem,tag,x,x$1,m,m$1,s,t;
    n=html.indexOf(Global.String.fromCharCode(62));
    return b.Return(n>0?(elem=Global.document.createElement("div"),(elem.innerHTML=html,tag=elem.firstElementChild,x=(x$1=(m=function(a)
    {
     return ReactHtml.outerAttrs(a.name,a.value);
    },function(s$1)
    {
     return Seq.map(m,s$1);
    }((m$1=function(i)
    {
     return tag.attributes.item(i);
    },function(s$1)
    {
     return Seq.map(m$1,s$1);
    }(List.ofSeq(Operators.range(0,tag.attributes.length-1)))))),(s=List.ofArray([ReactHtml.__innerHtml(tag.innerHTML)]),Seq.append(s,x$1))),t=tag.localName,ReactHtml.NewTag(t,x))):{
     $:8
    });
   });
  })));
 };
 ReactHtml.outerAttrs=function(name,value)
 {
  return name==="class"?ReactHtml.NewAttr("className",value):ReactHtml.NewAttr(name,value);
 };
 ReactHtml.__innerHtml=function(html)
 {
  return{
   $:2,
   $0:"dangerouslySetInnerHTML",
   $1:{
    __html:html
   }
  };
 };
 ReactHtml._Style=function(styles)
 {
  var r;
  return ReactHtml.Style((r=function(a,b)
  {
   var a$1;
   a$1=Global.jQuery.extend.apply(Global.jQuery,[{}].concat([a]));
   return Global.jQuery.extend.apply(Global.jQuery,[a$1].concat([b]));
  },function(s)
  {
   return Seq.reduce(r,s);
  }(styles)));
 };
 ReactHtml._border=function(brd)
 {
  return ReactHtml.newAttr("border",brd);
 };
 ReactHtml._textAlign=function(alg)
 {
  return ReactHtml.newAttr("textAlign",alg);
 };
 ReactHtml._textOverflow=function(tov)
 {
  return ReactHtml.newAttr("textOverflow",tov);
 };
 ReactHtml._whiteSpace=function(wsp)
 {
  return ReactHtml.newAttr("whiteSpace",wsp);
 };
 ReactHtml._fontFamily=function(fml)
 {
  return ReactHtml.newAttr("fontFamily",fml);
 };
 ReactHtml._background=function(clr)
 {
  return ReactHtml.newAttr("background",clr);
 };
 ReactHtml._overflow=function(ove)
 {
  return ReactHtml.newAttr("overflow",ove);
 };
 ReactHtml._marginBottom=function(mar)
 {
  return ReactHtml.newAttr("marginBottom",mar);
 };
 ReactHtml._borderWidth=function(wid)
 {
  return ReactHtml.newAttr("borderWidth",wid);
 };
 ReactHtml._borderStyle=function(sty)
 {
  return ReactHtml.newAttr("borderStyle",sty);
 };
 ReactHtml._paddingBottom=function(bot)
 {
  return ReactHtml.newAttr("paddingBottom",bot);
 };
 ReactHtml._paddingTop=function(top)
 {
  return ReactHtml.newAttr("paddingTop",top);
 };
 ReactHtml._paddingRight=function(rig)
 {
  return ReactHtml.newAttr("paddingRight",rig);
 };
 ReactHtml._paddingLeft=function(lef)
 {
  return ReactHtml.newAttr("paddingLeft",lef);
 };
 ReactHtml._padding=function(pad)
 {
  return ReactHtml.newAttr("padding",pad);
 };
 ReactHtml._flexShrink=function(gro)
 {
  return ReactHtml.newAttr("flexShrink",gro);
 };
 ReactHtml._flexGrow=function(gro)
 {
  return ReactHtml.newAttr("flexGrow",gro);
 };
 ReactHtml._flexBasis=function(bas)
 {
  return ReactHtml.newAttr("flexBasis",bas);
 };
 ReactHtml._flex=function(fle)
 {
  return ReactHtml.newAttr("flex",fle);
 };
 ReactHtml._flexFlow=function(flo)
 {
  return ReactHtml.newAttr("flexFlow",flo);
 };
 ReactHtml._display=function(dis)
 {
  return ReactHtml.newAttr("display",dis);
 };
 ReactHtml._position=function(pos)
 {
  return ReactHtml.newAttr("position",pos);
 };
 ReactHtml._zIndex=function(zid)
 {
  return ReactHtml.newAttr("zIndex",zid);
 };
 ReactHtml._maxWidth=function(wid)
 {
  return ReactHtml.newAttr("maxWidth",wid);
 };
 ReactHtml._minWidth=function(wid)
 {
  return ReactHtml.newAttr("minWidth",wid);
 };
 ReactHtml._width=function(wid)
 {
  return ReactHtml.newAttr("width",wid);
 };
 ReactHtml._maxHeight=function(hei)
 {
  return ReactHtml.newAttr("maxHeight",hei);
 };
 ReactHtml._minHeight=function(hei)
 {
  return ReactHtml.newAttr("minHeight",hei);
 };
 ReactHtml._height=function(hei)
 {
  return ReactHtml.newAttr("height",hei);
 };
 ReactHtml._right=function(rig)
 {
  return ReactHtml.newAttr("right",rig);
 };
 ReactHtml._left=function(lef)
 {
  return ReactHtml.newAttr("left",lef);
 };
 ReactHtml._bottom=function(bot)
 {
  return ReactHtml.newAttr("bottom",bot);
 };
 ReactHtml._top=function(top)
 {
  return ReactHtml.newAttr("top",top);
 };
 ReactHtml._alignSelf=function(alg)
 {
  return ReactHtml.newAttr("alignSelf",alg);
 };
 ReactHtml._fontWeight=function(wei)
 {
  return ReactHtml.newAttr("fontWeight",wei);
 };
 ReactHtml._fontStyle=function(stl)
 {
  return ReactHtml.newAttr("fontStyle",stl);
 };
 ReactHtml._fontSize=function(siz)
 {
  return ReactHtml.newAttr("fontSize",siz);
 };
 ReactHtml._margin=function(mar)
 {
  return ReactHtml.newAttr("margin",mar);
 };
 ReactHtml._cursor=function(cur)
 {
  return ReactHtml.newAttr("cursor",cur);
 };
 ReactHtml._color=function(col)
 {
  return ReactHtml.newAttr("color",col);
 };
 ReactHtml.newAttr=function(name,value)
 {
  var a;
  a={};
  a[name]=value;
  return a;
 };
 ReactHtml.OnAfterRender=function(f)
 {
  return ReactHtml.Ref(function(e)
  {
   if(!(!e))
    f(e);
  });
 };
 ReactHtml.Ref=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"ref",
   $1:f
  });
 };
 ReactHtml.OnKeyDown=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onKeyDown",
   $1:f
  });
 };
 ReactHtml.OnDragOver=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onDragOver",
   $1:f
  });
 };
 ReactHtml.OnDragStart=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onDragStart",
   $1:f
  });
 };
 ReactHtml.OnDrop=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onDrop",
   $1:f
  });
 };
 ReactHtml.OnMouseUp=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onMouseUp",
   $1:f
  });
 };
 ReactHtml.OnMouseMove=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onMouseMove",
   $1:f
  });
 };
 ReactHtml.OnMouseDown=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onMouseDown",
   $1:f
  });
 };
 ReactHtml.OnMouseOut=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onMouseOut",
   $1:f
  });
 };
 ReactHtml.OnMouseOver=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onMouseOver",
   $1:f
  });
 };
 ReactHtml.OnMouseLeave=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onMouseLeave",
   $1:f
  });
 };
 ReactHtml.OnMouseEnter=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onMouseEnter",
   $1:f
  });
 };
 ReactHtml.OnChange=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onChange",
   $1:f
  });
 };
 ReactHtml.OnSubmit=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onSubmit",
   $1:f
  });
 };
 ReactHtml.OnClick=function(f)
 {
  return(ReactHtml.addAttribute())({
   $:2,
   $0:"onClick",
   $1:f
  });
 };
 ReactHtml.Draggable=function(drg)
 {
  return{
   $:2,
   $0:"draggable",
   $1:drg
  };
 };
 ReactHtml.Checked=function(chk)
 {
  return{
   $:2,
   $0:"checked",
   $1:chk
  };
 };
 ReactHtml.MaxLength=function(len)
 {
  return{
   $:2,
   $0:"maxLength",
   $1:len
  };
 };
 ReactHtml.Placeholder=function(txt)
 {
  return{
   $:2,
   $0:"placeholder",
   $1:txt
  };
 };
 ReactHtml.Disabled=function(dis)
 {
  return{
   $:2,
   $0:"disabled",
   $1:dis
  };
 };
 ReactHtml.AutoFocus=function(foc)
 {
  return{
   $:2,
   $0:"autoFocus",
   $1:foc
  };
 };
 ReactHtml.TabIndex=function(idx)
 {
  return{
   $:2,
   $0:"tabIndex",
   $1:idx
  };
 };
 ReactHtml.Value=function(value)
 {
  return{
   $:2,
   $0:"value",
   $1:value
  };
 };
 ReactHtml.Type=function(typ)
 {
  return{
   $:2,
   $0:"type",
   $1:typ
  };
 };
 ReactHtml.Class=function(clas)
 {
  return{
   $:2,
   $0:"className",
   $1:clas
  };
 };
 ReactHtml.Style=function(style)
 {
  return{
   $:2,
   $0:"style",
   $1:style
  };
 };
 ReactHtml.Href=function(href)
 {
  return{
   $:2,
   $0:"href",
   $1:href
  };
 };
 ReactHtml.Src=function(src)
 {
  return{
   $:2,
   $0:"src",
   $1:src
  };
 };
 ReactHtml.Role=function(role)
 {
  return{
   $:2,
   $0:"role",
   $1:role
  };
 };
 ReactHtml.Key=function(key)
 {
  return{
   $:2,
   $0:"key",
   $1:key
  };
 };
 ReactHtml.Id=function(id)
 {
  return{
   $:2,
   $0:"id",
   $1:id
  };
 };
 ReactHtml.NewAttr=function(name,value)
 {
  return{
   $:2,
   $0:name,
   $1:value
  };
 };
 ReactHtml.NewTag=function(tag,children)
 {
  return ReactHtml.NElement(tag,children);
 };
 ReactHtml.Button=function(children)
 {
  return ReactHtml.NElement("button",children);
 };
 ReactHtml.OptionA=function(children)
 {
  return ReactHtml.NElement("option",children);
 };
 ReactHtml.Select=function(children)
 {
  return ReactHtml.NElement("select",children);
 };
 ReactHtml.Input=function(children)
 {
  return ReactHtml.NElement("input",children);
 };
 ReactHtml.Label=function(children)
 {
  return ReactHtml.NElement("label",children);
 };
 ReactHtml.B=function(children)
 {
  return ReactHtml.NElement("b",children);
 };
 ReactHtml.A=function(children)
 {
  return ReactHtml.NElement("a",children);
 };
 ReactHtml.P=function(children)
 {
  return ReactHtml.NElement("p",children);
 };
 ReactHtml.Td=function(children)
 {
  return ReactHtml.NElement("td",children);
 };
 ReactHtml.Tr=function(children)
 {
  return ReactHtml.NElement("tr",children);
 };
 ReactHtml.TBody=function(children)
 {
  return ReactHtml.NElement("tbody",children);
 };
 ReactHtml.Th=function(children)
 {
  return ReactHtml.NElement("th",children);
 };
 ReactHtml.THead=function(children)
 {
  return ReactHtml.NElement("thead",children);
 };
 ReactHtml.Table=function(children)
 {
  return ReactHtml.NElement("table",children);
 };
 ReactHtml.Br=function(children)
 {
  return ReactHtml.NElement("br",children);
 };
 ReactHtml.Hr=function(children)
 {
  return ReactHtml.NElement("hr",children);
 };
 ReactHtml.H6=function(children)
 {
  return ReactHtml.NElement("h6",children);
 };
 ReactHtml.H5=function(children)
 {
  return ReactHtml.NElement("h5",children);
 };
 ReactHtml.H4=function(children)
 {
  return ReactHtml.NElement("h4",children);
 };
 ReactHtml.H3=function(children)
 {
  return ReactHtml.NElement("h3",children);
 };
 ReactHtml.H2=function(children)
 {
  return ReactHtml.NElement("h2",children);
 };
 ReactHtml.H1=function(children)
 {
  return ReactHtml.NElement("h1",children);
 };
 ReactHtml.Li=function(children)
 {
  return ReactHtml.NElement("li",children);
 };
 ReactHtml.Ul=function(children)
 {
  return ReactHtml.NElement("ul",children);
 };
 ReactHtml.Img=function(children)
 {
  return ReactHtml.NElement("img",children);
 };
 ReactHtml.Form=function(children)
 {
  return ReactHtml.NElement("form",children);
 };
 ReactHtml.Menu=function(children)
 {
  return ReactHtml.NElement("menu",children);
 };
 ReactHtml.Span=function(children)
 {
  return ReactHtml.NElement("span",children);
 };
 ReactHtml.Div=function(children)
 {
  return ReactHtml.NElement("div",children);
 };
 ReactHtml.addAttribute=function()
 {
  SC$3.$cctor();
  return SC$3.addAttribute;
 };
 ReactHtml.addAttributes=function()
 {
  SC$3.$cctor();
  return SC$3.addAttributes;
 };
 ReactHtml.addChild=function(child)
 {
  var n;
  n=List.ofArray([child]);
  return function(n$1)
  {
   return ReactHtml.addChildren(n,n$1);
  };
 };
 ReactHtml.addChildren=function(newChildren,node)
 {
  return node.$==1?ReactHtml.NElement("div",Seq.append([node],newChildren)):node.$==2?ReactHtml.NElement("div",Seq.append([node],newChildren)):node.$==3?ReactHtml.NElement("div",Seq.append([node],newChildren)):node.$==4?node:node.$==5?node:node.$==6?node:node.$==7?node:node.$==8?ReactHtml.NElement("div",newChildren):ReactHtml.NElement(node.$0,Seq.append(node.$1,newChildren));
 };
 ReactHtml.insertChildren=function(newChildren,node)
 {
  return node.$==1?ReactHtml.NElement("div",Seq.append(newChildren,[node])):node.$==2?ReactHtml.NElement("div",Seq.append(newChildren,[node])):node.$==3?ReactHtml.NElement("div",Seq.append(newChildren,[node])):node.$==4?node:node.$==5?node:node.$==6?node:node.$==7?node:node.$==8?ReactHtml.NElement("div",newChildren):ReactHtml.NElement(node.$0,Seq.append(newChildren,node.$1));
 };
 ReactHtml.NElement=function(name,children)
 {
  return{
   $:0,
   $0:name,
   $1:Arrays.ofSeq(children)
  };
 };
 Dummy.New=function(dummy)
 {
  return{
   dummy:dummy
  };
 };
 MailboxState=App.MailboxState=Runtime.Class({
  setLatest:function(l)
  {
   this.latestModel=l;
   this.get_latest().__ref=this;
  },
  get_latest:function()
  {
   return this.latestModel;
  }
 },null,MailboxState);
 MailboxState.New=function(agent,count,latestModel)
 {
  return new MailboxState({
   agent:agent,
   count:count,
   latestModel:latestModel
  });
 };
 App$1=App.App=Runtime.Class({
  renderNodeIncDom:function(props)
  {
   var $this,anchor,mail;
   function forceUpdate()
   {
    ReactHtml.patchOuter(mail.element,function()
    {
     var v;
     v=ReactHtml.toIncrementalDom(getCipherNode());
    });
   }
   function getCipherNode()
   {
    return(($this.view(props))(mail.get_latest()))(function(m)
    {
     $this.processMessages_(props,mail,forceUpdate,m);
    });
   }
   $this=this;
   anchor=ReactHtml.textIDom("");
   !anchor.state?anchor.state=App.mailbox(this.init,null):void 0;
   mail=anchor.state;
   mail.element=ReactHtml.toIncrementalDom(getCipherNode());
   return mail.element;
  },
  renderIncDom:function(props,container)
  {
   var $this,mail,forceUpdate,cipherNode;
   $this=this;
   !container.state?container.state=App.mailbox(this.init,null):void 0;
   mail=container.state;
   forceUpdate=function()
   {
    $this.renderIncDom(props,container);
   };
   cipherNode=((this.view(props))(mail.get_latest()))(function(m)
   {
    $this.processMessages_(props,mail,forceUpdate,m);
   });
   ReactHtml.patchInner(container,function()
   {
    var v;
    v=ReactHtml.toIncrementalDom(cipherNode);
   });
  },
  renderReact:function(_this)
  {
   var $this,forceUpdate_,forceUpdate,mail,props;
   $this=this;
   forceUpdate_=_this.forceUpdate;
   forceUpdate=function()
   {
    var v;
    v=forceUpdate_.apply(_this,[]);
   };
   mail=_this.state;
   props=_this.props;
   return ReactHtml.toReact(((this.view(props))(mail.get_latest()))(function(m)
   {
    $this.processMessages_(props,mail,forceUpdate,m);
   }));
  },
  processMessages_:function(props,mail,forceUpdate,msg)
  {
   var $this,_this,u,v;
   $this=this;
   _this=mail.agent;
   v=_this.mailbox.AddLast((u=(this.update(function(m)
   {
    $this.processMessages_(props,mail,forceUpdate,m);
   }))(props),function(o)
   {
    return $this.doMsg(mail,function($1,$2)
    {
     return(u($1))($2);
    },msg,forceUpdate,o);
   }));
   _this.resume();
  },
  doMsg:function(mail,update,msg,forceUpdate,oldState)
  {
   var p,m,newState;
   p=(m=update(msg,oldState),m.$==1?[m.$0,false]:m.$==2?[oldState,false]:[m.$0,true]);
   newState=p[0];
   mail.setLatest(newState);
   p[1]?forceUpdate():void 0;
   return newState;
  },
  run:function(props,container)
  {
   if(!Global.window.IncrementalDOM)
    this.runReact(props,container);
   else
    this.runIncDom(props,container);
  },
  runReact:function(props,container)
  {
   var elem;
   elem=this.nodeR(props);
   Global.ReactDOM.render(elem,container);
  },
  runIncDom:function(props,container)
  {
   this.renderIncDom(props,container);
  },
  node:function(props)
  {
   return{
    $:7,
    $0:this,
    $1:props
   };
  },
  nodeIncDom:function(props)
  {
   return this.renderNodeIncDom(props);
  },
  nodeR:function(props)
  {
   return Global.React.createElement.apply(null,[this.reactClass,props]);
  },
  get_view:function()
  {
   return this.view;
  },
  get_update:function()
  {
   return this.update;
  },
  get_init:function()
  {
   return this.init;
  },
  CIPHERSpace_ReactHtml_IUIApp$run:function(props,container)
  {
   this.run(props,container);
  },
  CIPHERSpace_ReactHtml_IUIApp$nodeIncDom:function(props)
  {
   return this.nodeIncDom(props);
  },
  CIPHERSpace_ReactHtml_IUIApp$nodeR:function(props)
  {
   return this.nodeR(props);
  }
 },null,App$1);
 App$1.New=Runtime.Ctor(function(init,update2,view)
 {
  App$1.New$2.call(this,init,Runtime.Curried(function($1,$2,msg,model)
  {
   return{
    $:0,
    $0:update2(msg,model)
   };
  },4),view);
 },App$1);
 App$1.New$1=Runtime.Ctor(function(init,update3,view)
 {
  App$1.New$2.call(this,init,Runtime.Curried(function($1,props,msg,model)
  {
   return{
    $:0,
    $0:update3(props,msg,model)
   };
  },4),view);
 },App$1);
 App$1.New$2=Runtime.Ctor(function(init,update,view)
 {
  var $this,i;
  $this=this;
  this.init=init;
  this.update=update;
  this.view=view;
  this.reactClass=Global.React.createClass({
   displayName:"rootClass",
   getInitialState:(i=this.init,function()
   {
    return App.mailbox(i,void 0);
   }),
   render:function()
   {
    return $this.renderReact(this);
   }
  });
 },App$1);
 App.mailbox=function(init,u)
 {
  var mail,_this,v;
  App.set_mailboxes(App.mailboxes()+1);
  mail=MailboxState.New(MailboxProcessor.Start(function(inbox)
  {
   function messageLoop(oldState)
   {
    return Concurrency.Delay(function()
    {
     var x;
     x=inbox.Receive(null);
     return Concurrency.Bind(x,function(a)
     {
      return messageLoop(a(oldState));
     });
    });
   }
   return messageLoop(Global.jQuery.extend.apply(Global.jQuery,["object"].concat([init])));
  },null),App.mailboxes(),init);
  _this=mail.agent;
  v=_this.mailbox.AddLast(function(initState)
  {
   mail.setLatest(initState);
   return initState;
  });
  _this.resume();
  return mail;
 };
 App.mailboxes=function()
 {
  SC$3.$cctor();
  return SC$3.mailboxes;
 };
 App.set_mailboxes=function($1)
 {
  SC$3.$cctor();
  SC$3.mailboxes=$1;
 };
 App.withContainerDo=function(className,f)
 {
  var x,x$1,f$1;
  x=(x$1=[Attr.Attr().NewAttr("class",className)],Tags.Tags().NewTag("div",x$1));
  f$1=function(container)
  {
   f(container);
  };
  (function(w)
  {
   Operators$1.OnAfterRender(f$1,w);
  }(x));
  return x;
 };
 App.DummyNew=function()
 {
  SC$3.$cctor();
  return SC$3.DummyNew;
 };
 Props.New=function(node,attributes)
 {
  return{
   node:node,
   attributes:attributes
  };
 };
 SetNode.run=function(rnode,node)
 {
  SetNode.app().run(Props.New(rnode,[]),node);
 };
 SetNode.app=function()
 {
  SC$3.$cctor();
  return SC$3.app;
 };
 SetNode.view=function(props,model,processMessages)
 {
  return props.node;
 };
 SetNode.update=function(props,msg,model)
 {
  return model;
 };
 SetNode.init=function()
 {
  SC$3.$cctor();
  return SC$3.init;
 };
 Props$1.New=function(menuItems)
 {
  return{
   menuItems:menuItems
  };
 };
 Model$1.New=function(show,top,left,baseX,baseY)
 {
  return{
   show:show,
   top:top,
   left:left,
   baseX:baseX,
   baseY:baseY
  };
 };
 Popup.app=function()
 {
  SC$3.$cctor();
  return SC$3.app$1;
 };
 Popup.view=function(props,model,processMessages)
 {
  var item,x,x$1,f,f$1;
  item=function(text,func_)
  {
   return ReactHtml.Li(List.ofSeq(Seq.delay(function()
   {
    return Seq.append(text==="-"?[ReactHtml.Class("divider")]:[],Seq.delay(function()
    {
     var x$2;
     return[(x$2=ReactHtml.A([ReactHtml.TabIndex("-1"),ReactHtml.Href("#"),{
      $:1,
      $0:text
     }]),(ReactHtml.OnClick(function()
     {
      processMessages({
       $:2
      });
      func_();
     }))(x$2))];
    }));
   })));
  };
  return model.show?(x=ReactHtml.Div([ReactHtml.Class("dropdown clearfix"),ReactHtml._Style([ReactHtml._display("block"),ReactHtml._position("fixed"),ReactHtml._height("95%"),ReactHtml._width("95%"),ReactHtml._zIndex("100")]),(x$1=ReactHtml.Menu([ReactHtml.Class("dropdown-menu"),ReactHtml.Role("menu"),ReactHtml._Style([ReactHtml._display("block"),ReactHtml._position("fixed"),ReactHtml._marginBottom("5px"),ReactHtml._top((f=function($1,$2)
  {
   return $1($2.toFixed(6)+"px");
  },(function($1)
  {
   return function($2)
   {
    return f($1,$2);
   };
  }(Global.id))(model.top+model.baseY))),ReactHtml._left((f$1=function($1,$2)
  {
   return $1($2.toFixed(6)+"px");
  },(function($1)
  {
   return function($2)
   {
    return f$1($1,$2);
   };
  }(Global.id))(model.left+model.baseX)))])]),ReactHtml.addChildren(Seq.map(function($1)
  {
   return item($1[0],$1[1]);
  },props.menuItems),x$1))]),(ReactHtml.OnClick(function()
  {
   processMessages({
    $:2
   });
  }))(x)):{
   $:8
  };
 };
 Popup.update=Runtime.Curried3(function(props,m,m$1)
 {
  return Popup.update_(m,m$1);
 });
 Popup.update_=function(message,model)
 {
  return message.$==0?Model$1.New(true,message.$1,message.$0,model.baseX,model.baseY):message.$==1?Model$1.New(model.show,model.top,model.left,message.$0,message.$1):Model$1.New(false,model.top,model.left,model.baseX,model.baseY);
 };
 Popup.init=function()
 {
  SC$3.$cctor();
  return SC$3.init$1;
 };
 Props$2.New=function(title,buttons,content,show,close_)
 {
  return{
   title:title,
   buttons:buttons,
   content:content,
   show:show,
   close_:close_
  };
 };
 Model$2.New=function(dummy)
 {
  return{
   dummy:dummy
  };
 };
 Dialog.app=function()
 {
  SC$3.$cctor();
  return SC$3.app$2;
 };
 Dialog.view=function(props,model,processMessages)
 {
  var buttons2,m,x,m$1,v,n,n$1;
  return props.show?(buttons2=Dialog.rButtons((m=function(a,b,f)
  {
   return[a,b,function()
   {
    f();
    Option.iterF(null,props.close_);
   }];
  },function(s)
  {
   return Seq.map(function($1)
   {
    return m($1[0],$1[1],$1[2]);
   },s);
  }(props.buttons))),ReactHtml.Div([ReactHtml.Id("dialog"),ReactHtml.Role("dialog"),ReactHtml.Class("modal"),ReactHtml._Style([ReactHtml._display("block"),ReactHtml._position("fixed"),ReactHtml._marginBottom("5px")]),ReactHtml.Div([ReactHtml.Class("modal-dialog"),ReactHtml.Div([ReactHtml.Class("modal-content"),ReactHtml.Div([ReactHtml.Class("modal-header"),(x=(m$1=function(close)
  {
   var x$1;
   x$1=ReactHtml.Button([ReactHtml.Class("close"),{
    $:1,
    $0:"×"
   }]);
   return(ReactHtml.OnClick(close))(x$1);
  },function(o)
  {
   return o==null?null:{
    $:1,
    $0:m$1(o.$0)
   };
  }(props.close_)),(v=ReactHtml.Span([]),Option.defaultValue(v,x))),ReactHtml.H4([ReactHtml.Class("modal-title"),{
   $:1,
   $0:props.title
  }])]),(n=props.content,function(n$2)
  {
   return ReactHtml.addChildren(n,n$2);
  }(ReactHtml.Div([ReactHtml.Class("modal-body")]))),(n$1=ReactHtml.Div([ReactHtml.Class("modal-footer")]),ReactHtml.addChildren(buttons2,n$1))])])])):{
   $:8
  };
 };
 Dialog.rButtons=function(buttons)
 {
  var m;
  return List.ofSeq((m=function(text,className,func_)
  {
   var x;
   x=ReactHtml.Button([ReactHtml.Class(className),ReactHtml.Disabled(false),{
    $:1,
    $0:text
   }]);
   return(ReactHtml.OnClick(func_))(x);
  },function(s)
  {
   return Seq.map(function($1)
   {
    return m($1[0],$1[1],$1[2]);
   },s);
  }(buttons)));
 };
 Dialog.update=Runtime.Curried3(function(props,m,m$1)
 {
  return Dialog.update_(m,m$1);
 });
 Dialog.update_=function(message,model)
 {
  return Model$2.New(message.$0);
 };
 Dialog.init=function()
 {
  SC$3.$cctor();
  return SC$3.init$2;
 };
 Validation=GenForm.Validation=Runtime.Class({
  headPathIs:function(head)
  {
   return this.$==1?this.$0.$==1?head===this.$0.$0?true:false:false:false;
  },
  addPath:function(path)
  {
   return this.$==1?new Validation({
    $:1,
    $0:new List.T({
     $:1,
     $0:path,
     $1:this.$0
    }),
    $1:this.$1
   }):new Validation({
    $:1,
    $0:List.ofArray([path]),
    $1:this.$0
   });
  },
  reducePath:function()
  {
   return this.$==1?this.$0.$==1?this.$0.$1.$==0?new Validation({
    $:0,
    $0:this.$1
   }):new Validation({
    $:1,
    $0:this.$0.$1,
    $1:this.$1
   }):new Validation({
    $:0,
    $0:this.$1
   }):this;
  }
 },null,Validation);
 Props$3.New=function(title,buttons,content)
 {
  return{
   title:title,
   buttons:buttons,
   content:content
  };
 };
 Model$3.New=function(processing,message,debug,modified,validations)
 {
  return{
   processing:processing,
   message:message,
   debug:debug,
   modified:modified,
   validations:validations
  };
 };
 GenForm.app=function()
 {
  SC$3.$cctor();
  return SC$3.app$3;
 };
 GenForm.view=function(props,model,processMessages)
 {
  var buttons2,msg,n,n$1;
  buttons2=Dialog.rButtons(new List.T({
   $:1,
   $0:[".","btn-xs btn-default  pull-right",function()
   {
    processMessages({
     $:3,
     $0:!model.debug
    });
   }],
   $1:props.buttons
  }));
  msg=model.message===""?{
   $:8
  }:ReactHtml.Span([ReactHtml.Class("alert validation"),{
   $:1,
   $0:model.message
  }]);
  return ReactHtml.Div([ReactHtml.Class("panel panel-info flex flexgrow"),ReactHtml.Div([ReactHtml.Class("panel-heading heading"),ReactHtml.Label([ReactHtml.Class("panel-title text-center"),{
   $:1,
   $0:(model.modified?"*":"")+props.title
  }]),msg,(n=ReactHtml.Div([ReactHtml.Class("btn-toolbar pull-right")]),ReactHtml.addChildren(buttons2,n))]),(n$1=props.content,function(n$2)
  {
   return ReactHtml.addChildren(n$1,n$2);
  }(ReactHtml.Div([ReactHtml.Class("panel-body flex flexgrow")])))]);
 };
 GenForm.update=Runtime.Curried3(function(props,m,m$1)
 {
  return GenForm.update_(m,m$1);
 });
 GenForm.update_=function(message,model)
 {
  var model$1,v;
  model$1=message.$==1?(v=GenForm.addValidationsFor(message.$0,model.validations,message.$1),Model$3.New(model.processing,model.message,model.debug,model.modified,v)):message.$==2?Model$3.New(model.processing,model.message,model.debug,message.$0,model.validations):message.$==3?Model$3.New(model.processing,model.message,message.$0,model.modified,model.validations):Model$3.New(message.$1,message.$0,model.debug,model.modified,model.validations);
  Global.window.onbeforeunload=model$1.modified?function(e)
  {
   e.returnValue="Changes you made may not be saved.";
  }:function()
  {
  };
  return model$1;
 };
 GenForm.getValidationsFor=function(name,validations)
 {
  var a,c;
  a=(c=function(v)
  {
   return v.headPathIs(name)?{
    $:1,
    $0:v.reducePath()
   }:null;
  },function(s)
  {
   return Seq.choose(c,s);
  }(validations));
  return new FSharpSet.New(a);
 };
 GenForm.addValidationsFor=function(name,validations,newValidations)
 {
  var x,p,s,m;
  x=(p=function(a)
  {
   return a.$==1?a.$0.$==1?a.$0.$0!==name:true:true;
  },function(s$1)
  {
   return Set.Filter(p,s$1);
  }(validations));
  s=(m=function(v)
  {
   return v.addPath(name);
  },function(s$1)
  {
   return new FSharpSet.New$1(BalancedTree.OfSeq(Seq.map(m,s$1)));
  }(newValidations));
  return new FSharpSet.New$1(BalancedTree.OfSeq(Seq.append(s,x)));
 };
 GenForm.init=function()
 {
  SC$3.$cctor();
  return SC$3.init$3;
 };
 Fields.selectWoValidator=function(label,value,onChange,options,attrs)
 {
  var options2,m,input;
  options2=(m=function(key,opt)
  {
   return ReactHtml.OptionA([ReactHtml.Key(key),ReactHtml.Value(key),{
    $:1,
    $0:opt
   }]);
  },function(s)
  {
   return Seq.map(function($1)
   {
    return m($1[0],$1[1]);
   },s);
  }(options));
  input=function(_onChange,_attrs)
  {
   var x,n,x$1;
   x=(n=(x$1=ReactHtml.Select([ReactHtml.Value(Option.defaultValue("",value))]),((ReactHtml.addAttributes())(_attrs))(x$1)),ReactHtml.addChildren(options2,n));
   return(ReactHtml.OnChange(function(e)
   {
    _onChange(e.target.value);
   }))(x);
  };
  return Fields.inputWValidator(label,function($1)
  {
   return function($2)
   {
    return input($1,$2);
   };
  },onChange,attrs,new FSharpSet.New(new List.T({
   $:0
  })),function()
  {
  },Fields.validateNothing_);
 };
 Fields.textWoValidator=function(label,value,onChange,attrs)
 {
  return Fields.textWValidator(label,value,onChange,attrs,new FSharpSet.New(new List.T({
   $:0
  })),function()
  {
  },Fields.validateNothing_);
 };
 Fields.textNotEmpty=function(label,value,onChange,attrs,validations,addValidations)
 {
  return Fields.textWValidator(label,value,onChange,attrs,validations,addValidations,Fields.validateEmpty_);
 };
 Fields.textWValidator=function(label,value,onChange,attrs,validations,addValidations,validator)
 {
  var input;
  input=function(_onChange,_attrs)
  {
   var x,x$1;
   x=(x$1=ReactHtml.Input([ReactHtml.Type("text"),ReactHtml.Value(value)]),((ReactHtml.addAttributes())(_attrs))(x$1));
   return(ReactHtml.OnChange(function(e)
   {
    _onChange(e.target.value);
   }))(x);
  };
  return Fields.inputWValidator(label,function($1)
  {
   return function($2)
   {
    return input($1,$2);
   };
  },onChange,attrs,validations,addValidations,validator);
 };
 Fields.inputWValidator=function(label,input,onChange,attrs,validations,addValidations,validator)
 {
  var _validations,classAlert,s,m,f;
  _validations=Fields.getValidationsFor(label,validations);
  classAlert=Seq.length(_validations)===0?"":" alert-danger";
  return ReactHtml.Div([ReactHtml.Class("form-group flex1"),ReactHtml.Label([ReactHtml.Class("textInputLabel"),{
   $:1,
   $0:label
  }]),Fields.validationMsg((s=(m=(f=function($1,$2)
  {
   return $1(CIPHERPrototype5_GeneratedPrintf.p$8($2));
  },function($1)
  {
   return function($2)
   {
    return f($1,$2);
   };
  }(Global.id)),function(s$1)
  {
   return new FSharpSet.New$1(BalancedTree.OfSeq(Seq.map(m,s$1)));
  }(_validations)),Strings.concat(", ",s))),(input(function(v)
  {
   onChange(v);
   return addValidations({
    $:1,
    $0:label,
    $1:validator(v)
   });
  }))(List.ofSeq(Seq.delay(function()
  {
   return Seq.append([ReactHtml.Class("form-control"+classAlert)],Seq.delay(function()
   {
    return attrs;
   }));
  })))]);
 };
 Fields.validationMsg=function(msg)
 {
  return msg===""?{
   $:8
  }:ReactHtml.Span([ReactHtml.Class("alert validation"),{
   $:1,
   $0:msg
  }]);
 };
 Fields.getValidationsFor=function(name,validations)
 {
  var a,c;
  a=(c=function(v)
  {
   return v.headPathIs(name)?{
    $:1,
    $0:v.reducePath()
   }:null;
  },function(s)
  {
   return Seq.choose(c,s);
  }(validations));
  return new FSharpSet.New(a);
 };
 Fields.validateEmpty_=function(v)
 {
  var a;
  a=v!==""?new List.T({
   $:0
  }):List.ofArray([new Validation({
   $:0,
   $0:{
    $:0
   }
  })]);
  return new FSharpSet.New(a);
 };
 Fields.validateEmail_=function(email)
 {
  var emailPattern,a;
  emailPattern=new Global.RegExp("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
  a=(email===""?true:emailPattern.test(email))?new List.T({
   $:0
  }):List.ofArray([new Validation({
   $:0,
   $0:{
    $:4,
    $0:"not a valid email",
    $1:email
   }
  })]);
  return new FSharpSet.New(a);
 };
 Fields.validateNothing_=function(a)
 {
  return new FSharpSet.New(new List.T({
   $:0
  }));
 };
 Fields.op_PlusPlus=function(a,b,v)
 {
  return new FSharpSet.New$1(BalancedTree.OfSeq(Seq.append(a(v),b(v))));
 };
 SC$3.$cctor=Runtime.Cctor(function()
 {
  SC$3.addAttributes=function(n)
  {
   return function(n$1)
   {
    return ReactHtml.addChildren(n,n$1);
   };
  };
  SC$3.addAttribute=ReactHtml.addChild;
  SC$3.DummyNew=Dummy.New(true);
  SC$3.mailboxes=0;
  SC$3.init=App.DummyNew();
  SC$3.app=new App$1.New$1(SetNode.init(),SetNode.update,Runtime.Curried3(SetNode.view));
  SC$3.init$1=Model$1.New(false,-1,-1,0,0);
  SC$3.app$1=new App$1.New$1(Popup.init(),function($1,$2,$3)
  {
   return((Popup.update($1))($2))($3);
  },Runtime.Curried3(Popup.view));
  SC$3.init$2=Model$2.New(false);
  SC$3.app$2=new App$1.New$1(Dialog.init(),function($1,$2,$3)
  {
   return((Dialog.update($1))($2))($3);
  },Runtime.Curried3(Dialog.view));
  SC$3.init$3=Model$3.New(false,"",false,false,new FSharpSet.New(new List.T({
   $:0
  })));
  SC$3.app$3=new App$1.New$1(GenForm.init(),function($1,$2,$3)
  {
   return((GenForm.update($1))($2))($3);
  },Runtime.Curried3(GenForm.view));
  SC$3.$cctor=Global.ignore;
 });
 Entry=CIPHERSpace.Entry=Runtime.Class({
  get_parentId:function()
  {
   return this.$==1?this.$0.parentCode:this.$0.parentCode;
  },
  get_isFolder:function()
  {
   return this.$==1?false:true;
  },
  get_modified:function()
  {
   return this.$==1?this.$0.modified:"";
  },
  get_size:function()
  {
   return this.$==1?this.$0.size.toLocaleString():"";
  },
  get_content:function()
  {
   return this.$==1?this.$0.contentType:"";
  },
  get_theme:function()
  {
   return this.$==1?this.$0.tags:"";
  },
  get_name:function()
  {
   return this.$==1?this.$0.name:this.$0.name;
  },
  get_children:function()
  {
   return this.$==1?[]:this.$1;
  },
  get_id:function()
  {
   return this.$==1?this.$0.id:this.$0.id;
  }
 },null,Entry);
 Props$4.New=function(entry,expanded,selected,level,setExpanded,setSelected,onClick)
 {
  return{
   entry:entry,
   expanded:expanded,
   selected:selected,
   level:level,
   setExpanded:setExpanded,
   setSelected:setSelected,
   onClick:onClick
  };
 };
 Model$4.New=function(hover)
 {
  return{
   hover:hover
  };
 };
 FileTreeNode.app=function()
 {
  SC$4.$cctor();
  return SC$4.app;
 };
 FileTreeNode.view=function(props,model,processMessages)
 {
  var hasChildren,x,x$1,x$2,x$3,x$4,x$5,x$6,f,a,x$7,a$1;
  hasChildren=!Seq.isEmpty(props.entry.get_children());
  x=(x$1=(x$2=ReactHtml.Tr([ReactHtml.Td([ReactHtml._Style([ReactHtml._overflow("hidden"),ReactHtml._textOverflow("ellipsis")]),(x$3=(x$4=(x$5=(x$6=ReactHtml.Div([{
   $:1,
   $0:hasChildren?props.expanded?"\ue114 ":"\ue080 ":"\ue235 "
  },ReactHtml._Style([ReactHtml._display("inline"),ReactHtml._fontFamily("Glyphicons Halflings"),ReactHtml._fontSize("11px"),ReactHtml._cursor("pointer"),ReactHtml._paddingLeft((f=function($1,$2)
  {
   return $1(Global.String($2)+"ch");
  },(function($1)
  {
   return function($2)
   {
    return f($1,$2);
   };
  }(Global.id))(props.level*4)))])]),(a=model.hover?List.ofArray([ReactHtml._Style([ReactHtml._background("#e6e6e6")])]):new List.T({
   $:0
  }),((ReactHtml.addAttributes())(a))(x$6))),(ReactHtml.OnMouseOver(function()
  {
   if(!model.hover)
    processMessages({
     $:0,
     $0:true
    });
  }))(x$5)),(ReactHtml.OnMouseOut(function()
  {
   processMessages({
    $:0,
    $0:false
   });
  }))(x$4)),(ReactHtml.OnClick(function()
  {
   props.setExpanded([props.entry.get_id(),!props.expanded]);
  }))(x$3)),ReactHtml.Div([{
   $:1,
   $0:props.entry.get_name()
  },ReactHtml._Style([ReactHtml._display("inline"),ReactHtml._paddingRight("1ch")]),ReactHtml.Draggable(true)])])]),(FileTreeNode.addMoreFields(ReactHtml.Td,List.ofArray([{
   $:1,
   $0:props.entry.get_theme()
  },(x$7=ReactHtml.Div([{
   $:1,
   $0:":::"
  },ReactHtml._Style([ReactHtml._textAlign("center")])]),(ReactHtml.OnClick(function(ev)
  {
   props.setSelected({
    $:1,
    $0:props.entry.get_id()
   });
   props.onClick(ev);
  }))(x$7)),{
   $:1,
   $0:props.entry.get_content()
  },ReactHtml.Div([{
   $:1,
   $0:props.entry.get_size()
  },ReactHtml._Style([ReactHtml._textAlign("right")])]),{
   $:1,
   $0:props.entry.get_modified()
  }])))(x$2)),(a$1=props.selected?List.ofArray([ReactHtml._Style([ReactHtml._background("lightblue")])]):new List.T({
   $:0
  }),((ReactHtml.addAttributes())(a$1))(x$1)));
  return(ReactHtml.OnClick(function()
  {
   props.setSelected({
    $:1,
    $0:props.entry.get_id()
   });
  }))(x);
 };
 FileTreeNode.addMoreFields=function(tag,fields)
 {
  var n,m;
  n=(m=function(v)
  {
   return tag(List.ofArray([ReactHtml._Style([ReactHtml._paddingLeft("0.5ch"),ReactHtml._paddingRight("0.5ch"),ReactHtml._overflow("hidden"),ReactHtml._textOverflow("ellipsis")]),v]));
  },function(l)
  {
   return List.map(m,l);
  }(fields));
  return function(n$1)
  {
   return ReactHtml.addChildren(n,n$1);
  };
 };
 FileTreeNode.update=function(props,msg,model)
 {
  return Model$4.New(msg.$0);
 };
 FileTreeNode.init=function()
 {
  SC$4.$cctor();
  return SC$4.init;
 };
 Props$5.New=function(entries,onClick)
 {
  return{
   entries:entries,
   onClick:onClick
  };
 };
 Model$5.New=function(sortBy,expanded,selected)
 {
  return{
   sortBy:sortBy,
   expanded:expanded,
   selected:selected
  };
 };
 FileTree.app=function()
 {
  SC$4.$cctor();
  return SC$4.app$1;
 };
 FileTree.view=function(props,model,processMessages)
 {
  var x,x$1,a;
  function elemRows(model$1,level,elems)
  {
   var m;
   m=function(elem)
   {
    var hasChildren,expanded,item,f,f$1,x$2,$1;
    hasChildren=!Seq.isEmpty(elem.get_children());
    expanded=model$1.expanded.Contains(elem.get_id());
    item=FileTreeNode.app().node(Props$4.New(elem,expanded,Unchecked.Equals(model$1.selected,{
     $:1,
     $0:elem.get_id()
    }),level,(f=function(a$1,a$2)
    {
     return{
      $:0,
      $0:a$1,
      $1:a$2
     };
    },function(x$3)
    {
     return processMessages(f.apply(null,x$3));
    }),(f$1=function(a$1)
    {
     return{
      $:1,
      $0:a$1
     };
    },function(x$3)
    {
     return processMessages(f$1(x$3));
    }),props.onClick));
    return(hasChildren?expanded:false)?Seq.append([item],(x$2=elem.get_children(),($1=level+1,function($2)
    {
     return elemRows(model$1,$1,$2);
    }(x$2)))):[item];
   };
   return function(s)
   {
    return Seq.collect(m,s);
   }(elems);
  }
  x=ReactHtml.Table([ReactHtml._Style([ReactHtml._whiteSpace("nowrap")]),ReactHtml.THead([(x$1=ReactHtml.Tr([ReactHtml.Th([{
   $:1,
   $0:"Element"
  },ReactHtml._Style([ReactHtml._paddingLeft("3ch")])])]),(FileTreeNode.addMoreFields(ReactHtml.Th,List.ofArray([{
   $:1,
   $0:"Theme"
  },{
   $:1,
   $0:"Action"
  },{
   $:1,
   $0:"Content"
  },{
   $:1,
   $0:"Size"
  },{
   $:1,
   $0:"Modified"
  }])))(x$1))]),ReactHtml.TBody(elemRows(model,0,props.entries))]);
  a=List.ofArray([ReactHtml._Style([ReactHtml._margin("5px"),ReactHtml._overflow("auto")])]);
  return((ReactHtml.addAttributes())(a))(x);
 };
 FileTree.update=Runtime.Curried3(function(props,m,m$1)
 {
  return FileTree.update_(m,m$1);
 });
 FileTree.update_=function(msg,model)
 {
  var e;
  return msg.$==0?(e=((msg.$1?function(v)
  {
   return function(s)
   {
    return s.Add(v);
   };
  }:function(v)
  {
   return function(s)
   {
    return s.Remove(v);
   };
  })(msg.$0))(model.expanded),Model$5.New(model.sortBy,e,model.selected)):Model$5.New(model.sortBy,model.expanded,msg.$0);
 };
 FileTree.init=function()
 {
  SC$4.$cctor();
  return SC$4.init$1;
 };
 Props$6.New=function(title,token)
 {
  return{
   title:title,
   token:token
  };
 };
 Model$6.New=function(entries,form,popup,dialog,fileTree,uploadName,uploadFolder,themeTags,showDialog,client,lastUpload,timerHandler)
 {
  return{
   entries:entries,
   form:form,
   popup:popup,
   dialog:dialog,
   fileTree:fileTree,
   uploadName:uploadName,
   uploadFolder:uploadFolder,
   themeTags:themeTags,
   showDialog:showDialog,
   client:client,
   lastUpload:lastUpload,
   timerHandler:timerHandler
  };
 };
 UploadForm.showForm_=function(title,themeTags,client)
 {
  return App.withContainerDo("container",function(container)
  {
   var b;
   ARop.call((b=ARop.wrap(),b.Delay(function()
   {
    return b.Bind$2((new AjaxRemotingProvider.New()).Async("CIPHERPrototype5:CIPHERSpace.Server.fetchTokenAR_:2146392328",[]),function(a)
    {
     return b.Bind$3(UploadForm.fetchEntries_(a,FileTree.init().sortBy),function(a$1)
     {
      var initV1,app;
      initV1=UploadForm.init(themeTags,client,a$1);
      app=new App$1.New$1(initV1,UploadForm.update,Runtime.Curried3(UploadForm.view));
      app.run(Props$6.New(title,a),container.Dom);
      return b.Zero();
     });
    });
   })));
  });
 };
 UploadForm.view=function(props,model,processMessages)
 {
  var showProcessing,showCompleted,reloadFiles_,callServerReloadFiles,deleteFile_,renameFile_,moveTo_,renameFolder_,createFolder_,doUpload_,getFolder,getFolderPath,getEntryPath,setTargetFolder,setParentFolder,p,validations,processValidations,f,uploadFolder,o,setUploadFolder,m,$1,$2,$3,$4,$5,f$1,f$2,$6,$7,f$3,$8,$9,f$4,entry,f$5,$10,x,t,f$6,f$7,reUpload,m$1,$11,x$1,f$8,props$1,f$9,props$2,f$10,props$3,withSelectedentry,f$11,x$2,f$12,g,f$13,f$14;
  function uploadFile_(upload)
  {
   while(true)
    return ARop.call((function(upload$1)
    {
     return function(b)
     {
      return b.Delay(function()
      {
       return b.Bind$1(UploadForm.getUploadFileRO_(),function(a)
       {
        var a$1;
        a$1=function(file)
        {
         processMessages({
          $:11,
          $0:function(model$1)
          {
           var o$1;
           o$1=model$1.timerHandler;
           o$1==null?void 0:Global.clearInterval(o$1.$0);
           return UploadForm.update(props,{
            $:5,
            $0:null
           },model$1);
          }
         });
         processMessages({
          $:3,
          $0:upload$1
         });
         doUpload_(file,upload$1);
         startReUploadTimer(upload$1);
        };
        (function(o$1)
        {
         if(o$1==null)
          ;
         else
          a$1(o$1.$0);
        }(a));
        return b.Zero();
       });
      });
     };
    }(upload))(ARop.wrap()));
  }
  function startReUploadTimer(upload)
  {
   processMessages({
    $:5,
    $0:{
     $:1,
     $0:Global.setInterval(function($12)
     {
      return checkForReUpload(upload,$12);
     },2000)
    }
   });
  }
  function checkForReUpload(upload)
  {
   var uploadName,newModified;
   uploadName=upload.$0;
   newModified=UploadForm.getFileTime_();
   return(uploadName===UploadForm.getFileName_()?upload.$4!==newModified:false)?uploadFile_({
    $:0,
    $0:uploadName,
    $1:upload.$1,
    $2:upload.$2,
    $3:upload.$3,
    $4:newModified
   },null):null;
  }
  function path_(folder)
  {
   var m$2,parent,a,o$1,p$1;
   return(m$2=folder.parentCode,(m$2!=null?m$2.$==1:false)?(parent=m$2.$0,(a=(o$1=(p$1=function(fd)
   {
    return Unchecked.Equals(fd.id,parent);
   },function(s)
   {
    return Seq.tryFind(p$1,s);
   }(UploadForm.getFolders(model))),o$1==null?null:{
    $:1,
    $0:path_(o$1.$0)
   }),Option.defaultValue("",a))):"")+"/"+folder.name;
  }
  function folders_()
  {
   var p$1,s,m$2;
   return Arrays.ofSeq((p$1=function(t$1)
   {
    return t$1[1];
   },function(s$1)
   {
    return Seq.sortBy(p$1,s$1);
   }((s=[["","/"]],function(s$1)
   {
    return Seq.append(s,s$1);
   }((m$2=function(fd)
   {
    return[Global.String(fd.id),path_(fd)];
   },function(s$1)
   {
    return Seq.map(m$2,s$1);
   }(UploadForm.getFolders(model))))))));
  }
  UploadForm.set_renders(UploadForm.renders()+1);
  showProcessing=function(txt)
  {
   processMessages({
    $:7,
    $0:{
     $:0,
     $0:txt,
     $1:true
    }
   });
  };
  showCompleted=function(txt)
  {
   processMessages({
    $:7,
    $0:{
     $:0,
     $0:txt,
     $1:false
    }
   });
  };
  reloadFiles_=function(message)
  {
   var b;
   ARop.call((b=ARop.wrap(),b.Delay(function()
   {
    return b.Bind$3(UploadForm.fetchEntries_(props.token,model.fileTree.sortBy),function(a)
    {
     processMessages({
      $:4,
      $0:a
     });
     showCompleted(message);
     return b.Zero();
    });
   })));
  };
  callServerReloadFiles=function(call)
  {
   var b;
   ARop.call((b=ARop.wrap(),b.Delay(function()
   {
    return b.Bind$2(call,function(a)
    {
     reloadFiles_(a);
     return b.Zero();
    });
   })));
  };
  deleteFile_=function(entry$1)
  {
   return callServerReloadFiles((new AjaxRemotingProvider.New()).Async("CIPHERPrototype5:CIPHERSpace.UploadFormServer.DeleteFileAR_:-1987641171",[props.token,entry$1.get_id(),entry$1.get_isFolder()]));
  };
  renameFile_=function(fileId,newName,tags)
  {
   return callServerReloadFiles((new AjaxRemotingProvider.New()).Async("CIPHERPrototype5:CIPHERSpace.UploadFormServer.RenameFileAR_:-739456173",[props.token,fileId,newName,tags]));
  };
  moveTo_=function(entry$1,newId)
  {
   return callServerReloadFiles((new AjaxRemotingProvider.New()).Async("CIPHERPrototype5:CIPHERSpace.UploadFormServer.MoveToAR_:-844966758",[props.token,entry$1.get_id(),entry$1.get_isFolder(),newId]));
  };
  renameFolder_=function(folderId,newName)
  {
   return callServerReloadFiles((new AjaxRemotingProvider.New()).Async("CIPHERPrototype5:CIPHERSpace.UploadFormServer.RenameFolderAR_:74399420",[props.token,folderId,newName]));
  };
  createFolder_=function(name,folderId)
  {
   return callServerReloadFiles((new AjaxRemotingProvider.New()).Async("CIPHERPrototype5:CIPHERSpace.UploadFormServer.CreateFolderAR_:778215497",[props.token,name,folderId]));
  };
  doUpload_=function(file,a)
  {
   var uploadName,uploadFolder$1,themeTags,client,b;
   uploadName=a.$0;
   uploadFolder$1=a.$1;
   themeTags=a.$2;
   client=a.$3;
   return ARop.call((b=ARop.wrap(),b.Delay(function()
   {
    return b.Bind$1(Rop$1.tryProtection(),function()
    {
     var f$15,rdr;
     showProcessing((f$15=function($12,$13)
     {
      return $12("Uploading file "+PrintfHelpers.toSafe($13)+" ...");
     },(function($12)
     {
      return function($13)
      {
       return f$15($12,$13);
      };
     }(Global.id))(file.name)));
     rdr=new Global.FileReader();
     rdr.onloadend=function()
     {
      return callServerReloadFiles((new AjaxRemotingProvider.New()).Async("CIPHERPrototype5:CIPHERSpace.UploadFormServer.UploadFileAR_:664510523",[props.token,uploadName,uploadFolder$1,rdr.result,file.type,file.size,themeTags,client]));
     };
     rdr.readAsDataURL(file);
     return b.Zero();
    });
   })));
  };
  getFolder=function(id)
  {
   var p$1;
   p$1=function(fd)
   {
    return Unchecked.Equals(fd.id,id);
   };
   return function(s)
   {
    return Seq.tryFind(p$1,s);
   }(UploadForm.getFolders(model));
  };
  getFolderPath=function(idO)
  {
   var a,o$1;
   a=(o$1=idO==null?null:getFolder(idO.$0),o$1==null?null:{
    $:1,
    $0:path_(o$1.$0)
   });
   return Option.defaultValue("",a);
  };
  getEntryPath=function(entry$1)
  {
   var f$15;
   return((f$15=function($12,$13,$14)
   {
    return $12(PrintfHelpers.toSafe($13)+"/"+PrintfHelpers.toSafe($14));
   },(Runtime.Curried3(f$15))(Global.id))(getFolderPath(entry$1.get_parentId())))(entry$1.get_name());
  };
  setTargetFolder=function(entry$1)
  {
   processMessages({
    $:2,
    $0:entry$1.get_isFolder()?{
     $:1,
     $0:entry$1.get_id()
    }:entry$1.get_parentId()
   });
  };
  setParentFolder=function(entry$1)
  {
   processMessages({
    $:2,
    $0:entry$1.get_parentId()
   });
  };
  p=(validations=model.form.validations,(processValidations=(f=function(a)
  {
   return{
    $:7,
    $0:a
   };
  },function(x$3)
  {
   return processMessages(f(x$3));
  }),(uploadFolder=(o=model.uploadFolder,o==null?null:{
   $:1,
   $0:Global.String(o.$0)
  }),(setUploadFolder=function(v)
  {
   return{
    $:2,
    $0:v===""?null:{
     $:1,
     $0:v
    }
   };
  },(m=model.showDialog,m.$==2?["Move to",List.ofArray([["Ok","btn",($1=m.$0,($2=model.uploadFolder,function($12)
  {
   return moveTo_($1,$2,$12);
  }))],["Cancel","btn",function()
  {
  }]]),List.ofArray([Fields.selectWoValidator("Folder",uploadFolder,function(x$3)
  {
   return processMessages(setUploadFolder(x$3));
  },folders_(),[])])]:m.$==3?["Rename File",List.ofArray([["Ok","btn",($3=m.$0.get_id(),($4=model.uploadName,($5=model.themeTags,function($12)
  {
   return renameFile_($3,$4,$5,$12);
  })))],["Cancel","btn",function()
  {
  }]]),List.ofArray([Fields.textNotEmpty("File Name",model.uploadName,(f$1=function(a)
  {
   return{
    $:1,
    $0:a
   };
  },function(x$3)
  {
   return processMessages(f$1(x$3));
  }),[ReactHtml.Placeholder("enter file name"),ReactHtml.MaxLength(100)],validations,processValidations),Fields.textWoValidator("Theme tags",model.themeTags,(f$2=function(a)
  {
   return{
    $:0,
    $0:a
   };
  },function(x$3)
  {
   return processMessages(f$2(x$3));
  }),List.ofArray([ReactHtml.Placeholder("enter tags"),ReactHtml.MaxLength(200)]))])]:m.$==4?["Rename Folder",List.ofArray([["Ok","btn",($6=m.$0.get_id(),($7=model.uploadName,function($12)
  {
   return renameFolder_($6,$7,$12);
  }))],["Cancel","btn",function()
  {
  }]]),List.ofArray([Fields.textNotEmpty("File Name",model.uploadName,(f$3=function(a)
  {
   return{
    $:1,
    $0:a
   };
  },function(x$3)
  {
   return processMessages(f$3(x$3));
  }),[ReactHtml.Placeholder("enter file name"),ReactHtml.MaxLength(100)],validations,processValidations)])]:m.$==1?["Create Folder",List.ofArray([["Ok","btn",($8=model.uploadName,($9=model.uploadFolder,function($12)
  {
   return createFolder_($8,$9,$12);
  }))],["Cancel","btn",function()
  {
  }]]),List.ofArray([Fields.selectWoValidator("Parent Folder",uploadFolder,function(x$3)
  {
   return processMessages(setUploadFolder(x$3));
  },folders_(),[]),Fields.textNotEmpty("Folder Name",model.uploadName,(f$4=function(a)
  {
   return{
    $:1,
    $0:a
   };
  },function(x$3)
  {
   return processMessages(f$4(x$3));
  }),[ReactHtml.Placeholder("enter folder name"),ReactHtml.MaxLength(100)],validations,processValidations)])]:m.$==5?(entry=m.$0,["Confirm Delete ",List.ofArray([["DELETE","btn",function($12)
  {
   return deleteFile_(entry,$12);
  }],["Cancel","btn",function()
  {
  }]]),List.ofArray([{
   $:1,
   $0:((f$5=function($12,$13,$14)
   {
    return $12("Delete "+PrintfHelpers.toSafe($13)+" "+PrintfHelpers.toSafe($14)+"?");
   },(Runtime.Curried3(f$5))(Global.id))(entry.get_isFolder()?"folder":"file"))(entry.get_name())
  }])]):m.$==6?["",new List.T({
   $:0
  }),new List.T({
   $:0
  })]:["Upload File",List.ofArray([["Upload","btn",($10={
   $:0,
   $0:model.uploadName,
   $1:model.uploadFolder,
   $2:model.themeTags,
   $3:model.client,
   $4:UploadForm.getFileTime_()
  },function($12)
  {
   return uploadFile_($10,$12);
  })],["Cancel","btn",function()
  {
  }]]),List.ofArray([ReactHtml.Label([{
   $:1,
   $0:"Select File:"
  },ReactHtml._Style([ReactHtml._paddingRight("1ch"),ReactHtml._paddingBottom("1em")])]),(x=ReactHtml.Button([{
   $:1,
   $0:(t=UploadForm.getFileName_(),t===""?"...":t)
  }]),(ReactHtml.OnClick(function()
  {
   return Global.jQuery("#filesel").click();
  }))(x)),Fields.textNotEmpty("File Name",model.uploadName,(f$6=function(a)
  {
   return{
    $:1,
    $0:a
   };
  },function(x$3)
  {
   return processMessages(f$6(x$3));
  }),[ReactHtml.Placeholder("enter file name"),ReactHtml.MaxLength(100)],validations,processValidations),Fields.selectWoValidator("Folder",uploadFolder,function(x$3)
  {
   return processMessages(setUploadFolder(x$3));
  },folders_(),[]),Fields.textWoValidator("Theme tags",model.themeTags,(f$7=function(a)
  {
   return{
    $:0,
    $0:a
   };
  },function(x$3)
  {
   return processMessages(f$7(x$3));
  }),List.ofArray([ReactHtml.Placeholder("enter tags"),ReactHtml.MaxLength(200)]))])])))));
  reUpload=(m$1=model.lastUpload,((m$1!=null?m$1.$==1:false)?UploadForm.getFileName_()!==""?($11=m$1.$0,true):false:false)?(x$1=ReactHtml.Input([ReactHtml.Type("button"),ReactHtml.Value((f$8=function($12,$13)
  {
   return $12("Re"+CIPHERPrototype5_GeneratedPrintf.p$10($13));
  },(function($12)
  {
   return function($13)
   {
    return f$8($12,$13);
   };
  }(Global.id))($11))),ReactHtml._Style([ReactHtml._flex("0 0"),ReactHtml._alignSelf("flex-start")])]),(ReactHtml.OnClick(function($12)
  {
   return uploadFile_($11,$12);
  }))(x$1)):{
   $:8
  });
  props$1=Props$3.New(props.title,List.ofArray([["New Folder","btn    btn-default  pull-right",function()
  {
   processMessages({
    $:6,
    $0:{
     $:1
    }
   });
  }],["Upload File","btn    btn-default  pull-right",function()
  {
   processMessages({
    $:1,
    $0:UploadForm.getFileName_()
   });
   processMessages({
    $:6,
    $0:{
     $:0
    }
   });
  }]]),List.ofArray([{
   $:1,
   $0:(f$9=function($12,$13)
   {
    return $12("Renders: "+Global.String($13));
   },(function($12)
   {
    return function($13)
    {
     return f$9($12,$13);
    };
   }(Global.id))(UploadForm.renders()))
  },(props$2=Props$2.New(p[0],p[1],p[2],!Unchecked.Equals(model.showDialog,{
   $:6
  }),{
   $:1,
   $0:function()
   {
    processMessages({
     $:6,
     $0:{
      $:6
     }
    });
   }
  }),Dialog.view(props$2,model.dialog,(f$10=function(a)
  {
   return{
    $:9,
    $0:a
   };
  },function(x$3)
  {
   return processMessages(f$10(x$3));
  }))),(props$3=Props$1.New((withSelectedentry=function(f$15)
  {
   var a;
   a=function(sel)
   {
    var s,p$1;
    s=(p$1=function(e)
    {
     return Unchecked.Equals(e.get_id(),sel);
    },function(s$1)
    {
     return Seq.filter(p$1,s$1);
    }(UploadForm.flatEntries(model)));
    Seq.iter(f$15,s);
   };
   (function(o$1)
   {
    if(o$1==null)
     ;
    else
     a(o$1.$0);
   }(model.fileTree.selected));
  },List.ofArray([["Upload file",function()
  {
   withSelectedentry(function(entry$1)
   {
    setTargetFolder(entry$1);
    processMessages({
     $:1,
     $0:UploadForm.getFileName_()
    });
    processMessages({
     $:6,
     $0:{
      $:0
     }
    });
   });
  }],["Open ",function()
  {
   withSelectedentry(function(entry$1)
   {
    var v,f$15;
    if(!entry$1.get_isFolder())
     {
      v=Global.window.open((f$15=function($12,$13)
      {
       return $12("/EPFile"+PrintfHelpers.toSafe($13));
      },(function($12)
      {
       return function($13)
       {
        return f$15($12,$13);
       };
      }(Global.id))(getEntryPath(entry$1))),"blank");
     }
   });
  }],["New folder",function()
  {
   withSelectedentry(function(entry$1)
   {
    setTargetFolder(entry$1);
    processMessages({
     $:6,
     $0:{
      $:1
     }
    });
   });
  }],["Move",function()
  {
   withSelectedentry(function(entry$1)
   {
    setParentFolder(entry$1);
    processMessages({
     $:6,
     $0:{
      $:2,
      $0:entry$1
     }
    });
   });
  }],["Rename",function()
  {
   withSelectedentry(function(entry$1)
   {
    var renameObject;
    renameObject=entry$1.get_isFolder()?function(a)
    {
     return{
      $:4,
      $0:a
     };
    }:(processMessages({
     $:0,
     $0:entry$1.get_theme()
    }),function(a)
    {
     return{
      $:3,
      $0:a
     };
    });
    processMessages({
     $:1,
     $0:entry$1.get_name()
    });
    processMessages({
     $:6,
     $0:renameObject(entry$1)
    });
   });
  }],["-",function()
  {
  }],["Delete",function()
  {
   withSelectedentry(function(entry$1)
   {
    processMessages({
     $:6,
     $0:{
      $:5,
      $0:entry$1
     }
    });
   });
  }]]))),Popup.view(props$3,model.popup,(f$11=function(a)
  {
   return{
    $:8,
    $0:a
   };
  },function(x$3)
  {
   return processMessages(f$11(x$3));
  }))),(x$2=ReactHtml.Input([ReactHtml.Type("file"),ReactHtml.Id("filesel"),ReactHtml._Style([ReactHtml._display("none")])]),(ReactHtml.OnChange((f$12=(g=function(a)
  {
   return{
    $:1,
    $0:a
   };
  },function(x$3)
  {
   return g(UploadForm.getFileName_(x$3));
  }),function(x$3)
  {
   return processMessages(f$12(x$3));
  })))(x$2)),reUpload,FileTree.view(Props$5.New(model.entries,function(e)
  {
   var r;
   r=e.target.getBoundingClientRect.call(e.target,null);
   processMessages({
    $:8,
    $0:{
     $:0,
     $0:r.left,
     $1:r.top
    }
   });
  }),model.fileTree,(f$13=function(a)
  {
   return{
    $:10,
    $0:a
   };
  },function(x$3)
  {
   return processMessages(f$13(x$3));
  }))]));
  return GenForm.view(props$1,model.form,(f$14=function(a)
  {
   return{
    $:7,
    $0:a
   };
  },function(x$3)
  {
   return processMessages(f$14(x$3));
  }));
 };
 UploadForm.renders=function()
 {
  SC$4.$cctor();
  return SC$4.renders;
 };
 UploadForm.set_renders=function($1)
 {
  SC$4.$cctor();
  SC$4.renders=$1;
 };
 UploadForm.flatEntries=function(model)
 {
  return UploadForm.flattenEntries(model.entries);
 };
 UploadForm.getFolders=function(model)
 {
  var c;
  c=function(a)
  {
   return a.$==0?{
    $:1,
    $0:a.$0
   }:null;
  };
  return function(s)
  {
   return Seq.choose(c,s);
  }(model.entries);
 };
 UploadForm.fetchEntries_=function(token,sortBy)
 {
  var b;
  b=ARop.wrap();
  return b.Delay(function()
  {
   return b.Bind$2((new AjaxRemotingProvider.New()).Async("CIPHERPrototype5:CIPHERSpace.UploadFormServer.GetFilesInfoAR_:1270683949",[token]),function(a)
   {
    var folders,files,childrenFolders,childrenFiles;
    function getChildren(folderId)
    {
     var m,m$1;
     return Seq.append((m=function(fd)
     {
      return new Entry({
       $:0,
       $0:fd,
       $1:getChildren({
        $:1,
        $0:fd.id
       })
      });
     },function(s)
     {
      return Seq.map(m,s);
     }(childrenFolders(folderId))),(m$1=function(a$1)
     {
      return new Entry({
       $:1,
       $0:a$1
      });
     },function(s)
     {
      return Seq.map(m$1,s);
     }(childrenFiles(folderId))));
    }
    folders=a[0];
    files=a[1];
    childrenFolders=function(parent)
    {
     var p,p$1;
     p=function(folder)
     {
      return folder.name.toLowerCase();
     };
     return function(s)
     {
      return Seq.sortBy(p,s);
     }((p$1=function(folder)
     {
      return Unchecked.Equals(folder.parentCode,parent);
     },function(s)
     {
      return Seq.filter(p$1,s);
     }(folders)));
    };
    childrenFiles=function(parent)
    {
     var p,p$1;
     p=function(file)
     {
      var m;
      m=function(by)
      {
       return by.$==1?file.modified:by.$==2?file.tags.toLowerCase():by.$==3?file.contentType.toLowerCase():by.$==4?file.size:file.name.toLowerCase();
      };
      return function(l)
      {
       return List.map(m,l);
      }(sortBy);
     };
     return function(s)
     {
      return Seq.sortBy(p,s);
     }((p$1=function(file)
     {
      return Unchecked.Equals(file.parentCode,parent);
     },function(s)
     {
      return Seq.filter(p$1,s);
     }(files)));
    };
    return b.Return(getChildren(null));
   });
  });
 };
 UploadForm.getFileTime_=function()
 {
  var a,b;
  a=(b=Rop$1.flow(),b.Delay(function()
  {
   return b.Bind(UploadForm.getUploadFileRO_(),function(a$1)
   {
    var a$2,m;
    return b.Return((a$2=(m=function(f)
    {
     return f.lastModifiedDate.toUTCString();
    },function(o)
    {
     return o==null?null:{
      $:1,
      $0:m(o.$0)
     };
    }(a$1)),Option.defaultValue("",a$2)));
   });
  }));
  return Rop$1.ifError("",a);
 };
 UploadForm.getFileName_=function()
 {
  var a,b;
  a=(b=Rop$1.flow(),b.Delay(function()
  {
   return b.Bind(UploadForm.getUploadFileRO_(),function(a$1)
   {
    var a$2,m;
    return b.Return((a$2=(m=function(f)
    {
     return f.name;
    },function(o)
    {
     return o==null?null:{
      $:1,
      $0:m(o.$0)
     };
    }(a$1)),Option.defaultValue("",a$2)));
   });
  }));
  return Rop$1.ifError("",a);
 };
 UploadForm.getUploadFileRO_=function()
 {
  var b;
  b=Rop$1.flow();
  return b.Delay(function()
  {
   return b.Bind(Rop$1.tryProtection(),function()
   {
    var files;
    files=Global.document.getElementById("filesel").files;
    return b.Return(Arrays.tryPick(function(a)
    {
     return{
      $:1,
      $0:a
     };
    },files));
   });
  });
 };
 UploadForm.update=function(props,message,model)
 {
  var f,f$1,f$2;
  model.form.debug?(f=function($1,$2)
  {
   return $1(CIPHERPrototype5_GeneratedPrintf.p$12($2));
  },(function($1)
  {
   return function($2)
   {
    return f($1,$2);
   };
  }(function(s)
  {
   Global.console.log(s);
  }))(message)):void 0;
  return message.$==1?Model$6.New(model.entries,model.form,model.popup,model.dialog,model.fileTree,message.$0,model.uploadFolder,model.themeTags,model.showDialog,model.client,model.lastUpload,model.timerHandler):message.$==2?Model$6.New(model.entries,model.form,model.popup,model.dialog,model.fileTree,model.uploadName,message.$0,model.themeTags,model.showDialog,model.client,model.lastUpload,model.timerHandler):message.$==3?Model$6.New(model.entries,model.form,model.popup,model.dialog,model.fileTree,model.uploadName,model.uploadFolder,model.themeTags,model.showDialog,model.client,{
   $:1,
   $0:message.$0
  },model.timerHandler):message.$==5?Model$6.New(model.entries,model.form,model.popup,model.dialog,model.fileTree,model.uploadName,model.uploadFolder,model.themeTags,model.showDialog,model.client,model.lastUpload,message.$0):message.$==0?Model$6.New(model.entries,model.form,model.popup,model.dialog,model.fileTree,model.uploadName,model.uploadFolder,message.$0,model.showDialog,model.client,model.lastUpload,model.timerHandler):message.$==4?Model$6.New(message.$0,model.form,model.popup,model.dialog,model.fileTree,model.uploadName,model.uploadFolder,model.themeTags,model.showDialog,model.client,model.lastUpload,model.timerHandler):message.$==6?Model$6.New(model.entries,model.form,model.popup,model.dialog,model.fileTree,model.uploadName,model.uploadFolder,model.themeTags,message.$0,model.client,model.lastUpload,model.timerHandler):message.$==7?(f$1=GenForm.update_(message.$0,model.form),Model$6.New(model.entries,f$1,model.popup,model.dialog,model.fileTree,model.uploadName,model.uploadFolder,model.themeTags,model.showDialog,model.client,model.lastUpload,model.timerHandler)):message.$==8?Model$6.New(model.entries,model.form,Popup.update_(message.$0,model.popup),model.dialog,model.fileTree,model.uploadName,model.uploadFolder,model.themeTags,model.showDialog,model.client,model.lastUpload,model.timerHandler):message.$==9?Model$6.New(model.entries,model.form,model.popup,Dialog.update_(message.$0,model.dialog),model.fileTree,model.uploadName,model.uploadFolder,model.themeTags,model.showDialog,model.client,model.lastUpload,model.timerHandler):message.$==10?(f$2=FileTree.update_(message.$0,model.fileTree),Model$6.New(model.entries,model.form,model.popup,model.dialog,f$2,model.uploadName,model.uploadFolder,model.themeTags,model.showDialog,model.client,model.lastUpload,model.timerHandler)):message.$0(model);
 };
 UploadForm.init=function(themeTags,client,entries)
 {
  return Model$6.New(entries,GenForm.init(),Popup.init(),Dialog.init(),FileTree.init(),"",null,themeTags,{
   $:6
  },client,null,null);
 };
 UploadForm.flattenEntries=function(entries)
 {
  var m;
  return Seq.append(entries,(m=function(entry)
  {
   return UploadForm.flattenEntries(entry.get_children());
  },function(s)
  {
   return Seq.collect(m,s);
  }(entries)));
 };
 SC$4.$cctor=Runtime.Cctor(function()
 {
  SC$4.init=Model$4.New(false);
  SC$4.app=new App$1.New$1(FileTreeNode.init(),FileTreeNode.update,Runtime.Curried3(FileTreeNode.view));
  SC$4.init$1=Model$5.New(List.ofArray([{
   $:0
  },{
   $:2
  },{
   $:1
  },{
   $:3
  },{
   $:4
  }]),new FSharpSet.New(new List.T({
   $:0
  })),null);
  SC$4.app$1=new App$1.New$1(FileTree.init(),function($1,$2,$3)
  {
   return((FileTree.update($1))($2))($3);
  },Runtime.Curried3(FileTree.view));
  SC$4.renders=0;
  SC$4.$cctor=Global.ignore;
 });
 Model$7.New=function(userName,password,inProgress,goLink,error)
 {
  return{
   userName:userName,
   password:password,
   inProgress:inProgress,
   goLink:goLink,
   error:error
  };
 };
 LoginForm.showForm_=function(goLink,error)
 {
  return App.withContainerDo("",function(node)
  {
   var app;
   app=new App$1.New$1(LoginForm.init(goLink,error),LoginForm.update,Runtime.Curried3(LoginForm.view));
   app.run(App.DummyNew(),node.Dom);
  });
 };
 LoginForm.view=function(props,model,processMessages)
 {
  var disabledClass,form,x,x$1,f,f$1,f$2,g,g$1,x$2,f$3,f$4,f$5,g$2,g$3,x$3,m;
  disabledClass=model.inProgress?" disabled":"";
  form=(x=ReactHtml.Form([(x$1=ReactHtml.Input([ReactHtml.Type("text"),ReactHtml.Class("form-control"+disabledClass),ReactHtml.Placeholder("User Name"),ReactHtml.Value(model.userName),ReactHtml.Disabled(model.inProgress)]),(ReactHtml.OnChange((f=(f$1=(f$2=function(o)
  {
   return o.target;
  },(g=function(o)
  {
   return o.value;
  },function(x$4)
  {
   return g(f$2(x$4));
  })),(g$1=function(a)
  {
   return{
    $:0,
    $0:a
   };
  },function(x$4)
  {
   return g$1(f$1(x$4));
  })),function(x$4)
  {
   return processMessages(f(x$4));
  })))(x$1)),ReactHtml.Br([]),(x$2=ReactHtml.Input([ReactHtml.Type("password"),ReactHtml.Class("form-control"+disabledClass),ReactHtml.Placeholder("Password"),ReactHtml.Value(model.password),ReactHtml.Disabled(model.inProgress)]),(ReactHtml.OnChange((f$3=(f$4=(f$5=function(o)
  {
   return o.target;
  },(g$2=function(o)
  {
   return o.value;
  },function(x$4)
  {
   return g$2(f$5(x$4));
  })),(g$3=function(a)
  {
   return{
    $:1,
    $0:a
   };
  },function(x$4)
  {
   return g$3(f$4(x$4));
  })),function(x$4)
  {
   return processMessages(f$3(x$4));
  })))(x$2)),ReactHtml.Br([]),ReactHtml.Button([ReactHtml.Type("submit"),ReactHtml.Class("btn btn-primary btn-block"+disabledClass),{
   $:1,
   $0:"Login"
  }]),ReactHtml.Div([ReactHtml.Class("flex-row"),ReactHtml.Div([ReactHtml.Class("flexgrow"),ReactHtml.Hr([])]),ReactHtml.Div([ReactHtml.Class("flexgrow-1-5 text-center"),ReactHtml.H5([{
   $:1,
   $0:"or"
  }])]),ReactHtml.Div([ReactHtml.Class("flexgrow"),ReactHtml.Hr([])])]),(x$3=ReactHtml.Button([ReactHtml.Type("button"),ReactHtml.Class("btn btn-info btn-block"+disabledClass),{
   $:1,
   $0:"Enter as Guest"
  }]),(ReactHtml.OnClick(function()
  {
   var b,f$6;
   processMessages({
    $:2
   });
   b=Server.callR((f$6=function(failed,ms)
   {
    var f$7;
    return failed?processMessages({
     $:3,
     $0:(f$7=function($1,$2)
     {
      return $1(PrintfHelpers.printList(function($3)
      {
       return CIPHERPrototype5_GeneratedPrintf.p($3);
      },$2));
     },(function($1)
     {
      return function($2)
      {
       return f$7($1,$2);
      };
     }(Global.id))(ms))
    }):null;
   },function(a)
   {
    Rop$1.messagesDo(f$6,a);
   }));
   b.Delay(function()
   {
    b.Bind$1((new AjaxRemotingProvider.New()).Async("CIPHERPrototype5:CIPHERSpace.Server.guestLoginAR_:2146392328",[]),function()
    {
     Global.window.location.href=model.goLink;
     b.Zero();
    });
   });
  }))(x$3)),ReactHtml.Br([]),ReactHtml.Div(List.ofSeq(Seq.delay(function()
  {
   return Seq.append([ReactHtml.Class("text-center")],Seq.delay(function()
   {
    return model.inProgress?[ReactHtml.Img([ReactHtml.Src("/EPFileX/image/loader.gif")])]:[];
   }));
  }))),ReactHtml.Div((m=model.error,m==null?new List.T({
   $:0
  }):List.ofArray([ReactHtml.Class("alert alert-danger"),{
   $:1,
   $0:m.$0
  }])))]),(ReactHtml.OnSubmit(function(e)
  {
   var b,f$6;
   e.preventDefault();
   processMessages({
    $:2
   });
   b=Server.callR((f$6=function(failed,ms)
   {
    var f$7;
    return failed?processMessages({
     $:3,
     $0:(f$7=function($1,$2)
     {
      return $1(PrintfHelpers.printList(function($3)
      {
       return CIPHERPrototype5_GeneratedPrintf.p($3);
      },$2));
     },(function($1)
     {
      return function($2)
      {
       return f$7($1,$2);
      };
     }(Global.id))(ms))
    }):null;
   },function(a)
   {
    Rop$1.messagesDo(f$6,a);
   }));
   b.Delay(function()
   {
    b.Bind$1((new AjaxRemotingProvider.New()).Async("CIPHERPrototype5:CIPHERSpace.Server.LoginAR_:67530287",[model.userName,model.password]),function()
    {
     Global.window.location.href=model.goLink;
     b.Zero();
    });
   });
  }))(x));
  return ReactHtml.Div([ReactHtml.Class("flex-row flex-align-center flexgrow"),ReactHtml.Div([ReactHtml.Class("blur"),ReactHtml._Style([ReactHtml._position("absolute"),ReactHtml._top("0Px"),ReactHtml._left("0Px"),ReactHtml._bottom("0Px"),ReactHtml._right("0Px"),ReactHtml.newAttr("backgroundImage","url('/EPFileX/image/BI_CONSULTANCY.jpg')"),ReactHtml.newAttr("backgroundSize","cover"),ReactHtml.newAttr("backgroundPosition","center center")])]),ReactHtml.Div([ReactHtml.Class("container"),ReactHtml.Div([ReactHtml.Class("row"),ReactHtml.Div([ReactHtml.Class("col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3"),ReactHtml.Div([ReactHtml.Class("panel panel-default shadow"),ReactHtml.Div([ReactHtml.Class("panel-body"),ReactHtml.Div([ReactHtml._Style([ReactHtml._textAlign("center")]),ReactHtml.Img([{
   $:2,
   $0:"alt",
   $1:"Brand"
  },ReactHtml.Src("/EPFileX/image/LOGO_cipher2.png"),ReactHtml._Style([ReactHtml._width("200px")])]),form])])])])])])]);
 };
 LoginForm.update=function(props,msg,model)
 {
  return msg.$==1?Model$7.New(model.userName,msg.$0,model.inProgress,model.goLink,null):msg.$==2?Model$7.New(model.userName,model.password,true,model.goLink,model.error):msg.$==3?Model$7.New(model.userName,model.password,false,model.goLink,{
   $:1,
   $0:msg.$0
  }):Model$7.New(msg.$0,model.password,model.inProgress,model.goLink,null);
 };
 LoginForm.init=function(goLink,error)
 {
  return Model$7.New("","",false,goLink,error);
 };
 CIPHERPrototype5_GeneratedPrintf.p=function($1)
 {
  return $1.$==30?"ErrOptionIsNone":$1.$==29?"ErrGuestUserNotActivated":$1.$==28?"ErrAleaError ("+PrintfHelpers.prettyPrint($1.$0)+", "+PrintfHelpers.prettyPrint($1.$1)+")":$1.$==27?"ErrNoRecordsProcessed":$1.$==26?"ErrUnsuportedDataStorage":$1.$==25?"ErrWebSharperCompiler "+PrintfHelpers.prettyPrint($1.$0):$1.$==24?"ErrFSharpCompiler "+PrintfHelpers.prettyPrint($1.$0):$1.$==23?"ErrFeatureNotImplemented "+PrintfHelpers.prettyPrint($1.$0):$1.$==22?"ErrRecordNotFound ("+PrintfHelpers.prettyPrint($1.$0)+", "+PrintfHelpers.prettyPrint($1.$1)+")":$1.$==21?"ErrRecordWasNotUpdated "+PrintfHelpers.prettyPrint($1.$0):$1.$==20?"ErrDockerIsNotPresent "+CIPHERPrototype5_GeneratedPrintf.p$4($1.$0):$1.$==19?"ErrObjectNotFound "+CIPHERPrototype5_GeneratedPrintf.p$7($1.$0):$1.$==18?"ErrNoProvisionedClientAvailable":$1.$==17?"ErrClientNotFound "+CIPHERPrototype5_GeneratedPrintf.p$6($1.$0):$1.$==16?"ErrUserIsNotDefined "+PrintfHelpers.prettyPrint($1.$0):$1.$==15?"ErrUserIsNotAssociatedToClient "+CIPHERPrototype5_GeneratedPrintf.p$5($1.$0):$1.$==14?"ErrDockerDataNotFound "+CIPHERPrototype5_GeneratedPrintf.p$4($1.$0):$1.$==13?"ErrUniqueIdNotDefinedForReport "+CIPHERPrototype5_GeneratedPrintf.p$1($1.$0):$1.$==12?"ErrDockerDefinitionNotFound "+CIPHERPrototype5_GeneratedPrintf.p$4($1.$0):$1.$==11?"ErrTableDefinitionNotFound "+CIPHERPrototype5_GeneratedPrintf.p$2($1.$0):$1.$==10?"ErrReportDefinitionNotFound "+CIPHERPrototype5_GeneratedPrintf.p$1($1.$0):$1.$==9?"ErrInvalidContentPageForClient "+PrintfHelpers.prettyPrint($1.$0):$1.$==8?"ErrInvalidToken "+PrintfHelpers.prettyPrint($1.$0):$1.$==7?"ErrLoginFailed "+PrintfHelpers.prettyPrint($1.$0):$1.$==6?"ErrUserIsNotLoggedIn":$1.$==5?"ErrValueIsNull ("+PrintfHelpers.prettyPrint($1.$0)+", "+PrintfHelpers.prettyPrint($1.$1)+")":$1.$==4?"ErrParameterMissing "+PrintfHelpers.prettyPrint($1.$0):$1.$==3?"ErrDuplicatedKeys ("+PrintfHelpers.prettyPrint($1.$0)+", "+PrintfHelpers.printArray(PrintfHelpers.prettyPrint,$1.$1)+")":$1.$==2?"ErrUndefinedKeys ("+PrintfHelpers.prettyPrint($1.$0)+", "+PrintfHelpers.printArray(PrintfHelpers.prettyPrint,$1.$1)+")":$1.$==1?"ErrExceptionThrown "+PrintfHelpers.prettyPrint($1.$0):"WarnNotification "+PrintfHelpers.prettyPrint($1.$0);
 };
 CIPHERPrototype5_GeneratedPrintf.p$7=function($1)
 {
  return"OWorkspace "+PrintfHelpers.prettyPrint($1.$0);
 };
 CIPHERPrototype5_GeneratedPrintf.p$6=function($1)
 {
  return"Client "+PrintfHelpers.prettyPrint($1.$0);
 };
 CIPHERPrototype5_GeneratedPrintf.p$5=function($1)
 {
  return"User "+PrintfHelpers.prettyPrint($1.$0);
 };
 CIPHERPrototype5_GeneratedPrintf.p$4=function($1)
 {
  return $1.$==5?"DckDockSpawn":$1.$==4?"DckPhosphor":$1.$==3?"DckWCDocker":$1.$==2?"DckGoldenLayout":$1.$==1?"DckSingle":"DckEmpty";
 };
 CIPHERPrototype5_GeneratedPrintf.p$2=function($1)
 {
  return $1.$==2?"ExternalTable ("+PrintfHelpers.prettyPrint($1.$0)+", "+PrintfHelpers.prettyPrint($1.$1)+")":$1.$==1?"SystemTable "+PrintfHelpers.prettyPrint($1.$0):"DimensionTable "+CIPHERPrototype5_GeneratedPrintf.p$3($1.$0);
 };
 CIPHERPrototype5_GeneratedPrintf.p$3=function($1)
 {
  return"Dimension "+PrintfHelpers.prettyPrint($1.$0);
 };
 CIPHERPrototype5_GeneratedPrintf.p$1=function($1)
 {
  return"Report "+PrintfHelpers.prettyPrint($1.$0);
 };
 CIPHERPrototype5_GeneratedPrintf.p$8=function($1)
 {
  return $1.$==1?"PathValidation ("+PrintfHelpers.printList(PrintfHelpers.prettyPrint,$1.$0)+", "+CIPHERPrototype5_GeneratedPrintf.p$9($1.$1)+")":"InputValidation "+CIPHERPrototype5_GeneratedPrintf.p$9($1.$0);
 };
 CIPHERPrototype5_GeneratedPrintf.p$9=function($1)
 {
  return $1.$==4?"VPatternNotMatch ("+PrintfHelpers.prettyPrint($1.$0)+", "+PrintfHelpers.prettyPrint($1.$1)+")":$1.$==3?"VUnsupportedData "+PrintfHelpers.prettyPrint($1.$0):$1.$==2?"VCannotModify":$1.$==1?"VNotLongerThan "+PrintfHelpers.prettyPrint($1.$0):"VEmpty";
 };
 CIPHERPrototype5_GeneratedPrintf.p$10=function($1)
 {
  return"Upload ("+PrintfHelpers.prettyPrint($1.$0)+", "+CIPHERPrototype5_GeneratedPrintf.p$11($1.$1)+", "+PrintfHelpers.prettyPrint($1.$2)+", "+CIPHERPrototype5_GeneratedPrintf.p$6($1.$3)+", "+PrintfHelpers.prettyPrint($1.$4)+")";
 };
 CIPHERPrototype5_GeneratedPrintf.p$11=function($1)
 {
  return $1==null?"null":"Some "+PrintfHelpers.prettyPrint($1.$0);
 };
 CIPHERPrototype5_GeneratedPrintf.p$12=function($1)
 {
  return $1.$==11?"DoAction "+"<fun>":$1.$==10?"ToFileTreeMsg "+CIPHERPrototype5_GeneratedPrintf.p$19($1.$0):$1.$==9?"ToDialogMsg "+CIPHERPrototype5_GeneratedPrintf.p$18($1.$0):$1.$==8?"ToPopupMsg "+CIPHERPrototype5_GeneratedPrintf.p$17($1.$0):$1.$==7?"ToFormMsg "+CIPHERPrototype5_GeneratedPrintf.p$16($1.$0):$1.$==6?"ShowDialog "+CIPHERPrototype5_GeneratedPrintf.p$14($1.$0):$1.$==5?"SetTimerHandler "+CIPHERPrototype5_GeneratedPrintf.p$13($1.$0):$1.$==4?"SetEntries "+PrintfHelpers.prettyPrint($1.$0):$1.$==3?"SetLastUpload "+CIPHERPrototype5_GeneratedPrintf.p$10($1.$0):$1.$==2?"SetUploadFolder "+CIPHERPrototype5_GeneratedPrintf.p$11($1.$0):$1.$==1?"SetUploadName "+PrintfHelpers.prettyPrint($1.$0):"SetThemeTags "+PrintfHelpers.prettyPrint($1.$0);
 };
 CIPHERPrototype5_GeneratedPrintf.p$19=function($1)
 {
  return $1.$==1?"SetSelected "+CIPHERPrototype5_GeneratedPrintf.p$11($1.$0):"SetExpanded ("+PrintfHelpers.prettyPrint($1.$0)+", "+PrintfHelpers.prettyPrint($1.$1)+")";
 };
 CIPHERPrototype5_GeneratedPrintf.p$18=function($1)
 {
  return"Dummy "+PrintfHelpers.prettyPrint($1.$0);
 };
 CIPHERPrototype5_GeneratedPrintf.p$17=function($1)
 {
  return $1.$==2?"HidePopUp":$1.$==1?"AdjustBase ("+PrintfHelpers.prettyPrint($1.$0)+", "+PrintfHelpers.prettyPrint($1.$1)+")":"ShowPopUp ("+PrintfHelpers.prettyPrint($1.$0)+", "+PrintfHelpers.prettyPrint($1.$1)+")";
 };
 CIPHERPrototype5_GeneratedPrintf.p$16=function($1)
 {
  return $1.$==3?"SetDebug "+PrintfHelpers.prettyPrint($1.$0):$1.$==2?"SetModified "+PrintfHelpers.prettyPrint($1.$0):$1.$==1?"AddValidation ("+PrintfHelpers.prettyPrint($1.$0)+", "+PrintfHelpers.prettyPrint($1.$1)+")":"ShowInfo ("+PrintfHelpers.prettyPrint($1.$0)+", "+PrintfHelpers.prettyPrint($1.$1)+")";
 };
 CIPHERPrototype5_GeneratedPrintf.p$14=function($1)
 {
  return $1.$==6?"NoDialog":$1.$==5?"ConfirmDelete "+CIPHERPrototype5_GeneratedPrintf.p$15($1.$0):$1.$==4?"RenameFolder "+CIPHERPrototype5_GeneratedPrintf.p$15($1.$0):$1.$==3?"RenameFile "+CIPHERPrototype5_GeneratedPrintf.p$15($1.$0):$1.$==2?"Move "+CIPHERPrototype5_GeneratedPrintf.p$15($1.$0):$1.$==1?"CreateFolder":"UploadFile";
 };
 CIPHERPrototype5_GeneratedPrintf.p$15=function($1)
 {
  return $1.$==1?"EFile "+GeneratedPrintf.p$1($1.$0):"EFolder ("+GeneratedPrintf.p($1.$0)+", "+PrintfHelpers.prettyPrint($1.$1)+")";
 };
 GeneratedPrintf.p$1=function($1)
 {
  return"{"+("id = "+PrintfHelpers.prettyPrint($1.id))+"; "+("name = "+PrintfHelpers.prettyPrint($1.name))+"; "+("folderName = "+PrintfHelpers.prettyPrint($1.folderName))+"; "+("parentCode = "+CIPHERPrototype5_GeneratedPrintf.p$11($1.parentCode))+"; "+("contentType = "+PrintfHelpers.prettyPrint($1.contentType))+"; "+("size = "+PrintfHelpers.prettyPrint($1.size))+"; "+("tags = "+PrintfHelpers.prettyPrint($1.tags))+"; "+("modified = "+PrintfHelpers.prettyPrint($1.modified))+"}";
 };
 GeneratedPrintf.p=function($1)
 {
  return"{"+("id = "+PrintfHelpers.prettyPrint($1.id))+"; "+("name = "+PrintfHelpers.prettyPrint($1.name))+"; "+("parentCode = "+CIPHERPrototype5_GeneratedPrintf.p$11($1.parentCode))+"}";
 };
 CIPHERPrototype5_GeneratedPrintf.p$13=function($1)
 {
  return $1==null?"null":"Some "+PrintfHelpers.prettyPrint($1.$0);
 };
}());
