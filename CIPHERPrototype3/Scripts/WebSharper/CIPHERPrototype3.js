(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Html,Client,Operators,List,Attr,Tags,T,Concurrency,Remoting,AjaxRemotingProvider,EventsPervasives,React,CIPHERSpace,App,ReactHtml,ReactDOM,App1,MailboxState,Control,MailboxProcessor,jQuery,Dialog,Seq,Rop,Option,Option1,Collections,FSharpSet,Fields,PrintfHelpers,BalancedTree,Strings,RegExp,GenForm,Validation,FileTree,FileTreeNode,Unchecked,SetModule,window,LoginForm,Server,Rop1,Model,Language,User,ObjectT,Slice,Popup,$,Arrays,R,callServerBuilder,SetNode,ARop,Entry,UploadForm,document,console,FileReader,String,clearInterval,setInterval,Operators1,MatchFailureException,Builder,ropBuilder,alert,Enumerator;
 Runtime.Define(Global,{
  CIPHERPrototype3:{
   Client:{
    Main:function()
    {
     var input,arg10,x,output,arg101,x1,x2,arg00,arg102,arg103,arg104;
     arg10=List.ofArray([Attr.Attr().NewAttr("value","")]);
     input=Operators.add(Tags.Tags().NewTag("input",arg10),Runtime.New(T,{
      $:0
     }));
     x=Runtime.New(T,{
      $:0
     });
     output=Tags.Tags().NewTag("h1",x);
     x1=List.ofArray([Tags.Tags().text("Send")]);
     x2=Tags.Tags().NewTag("button",x1);
     arg00=function()
     {
      return function()
      {
       var arg001;
       arg001=Concurrency.Delay(function()
       {
        return Concurrency.Bind(AjaxRemotingProvider.Async("CIPHERPrototype3:7",[input.get_Value()]),function(_arg11)
        {
         output.set_Text(_arg11);
         return Concurrency.Return(null);
        });
       });
       return Concurrency.Start(arg001,{
        $:0
       });
      };
     };
     EventsPervasives.Events().OnClick(arg00,x2);
     arg102=Runtime.New(T,{
      $:0
     });
     arg103=List.ofArray([Attr.Attr().NewAttr("class","text-muted")]);
     arg104=List.ofArray([Attr.Attr().NewAttr("class","jumbotron")]);
     arg101=List.ofArray([input,x2,Tags.Tags().NewTag("hr",arg102),Operators.add(Tags.Tags().NewTag("h4",arg103),List.ofArray([Tags.Tags().text("The server responded:")])),Operators.add(Tags.Tags().NewTag("div",arg104),List.ofArray([output]))]);
     return Tags.Tags().NewTag("div",arg101);
    },
    Start:function(input,k)
    {
     var arg00;
     arg00=Concurrency.Delay(function()
     {
      return Concurrency.Bind(AjaxRemotingProvider.Async("CIPHERPrototype3:7",[input]),function(_arg1)
      {
       return Concurrency.Return(k(_arg1));
      });
     });
     return Concurrency.Start(arg00,{
      $:0
     });
    }
   }
  },
  CIPHERSpace:{
   App:{
    App:Runtime.Class({
     doMsg:function(mail,update,msg,forceUpdate,oldState)
     {
      var matchValue,patternInput,_,newState,newState1,refresh,newState2;
      matchValue=(update(msg))(oldState);
      if(matchValue.$==1)
       {
        newState=matchValue.$0;
        _=[newState,false];
       }
      else
       {
        if(matchValue.$==2)
         {
          matchValue.$0;
          _=[oldState,false];
         }
        else
         {
          newState1=matchValue.$0;
          _=[newState1,true];
         }
       }
      patternInput=_;
      refresh=patternInput[1];
      newState2=patternInput[0];
      mail.setLatest(newState2);
      refresh?forceUpdate(null):null;
      return newState2;
     },
     get_init:function()
     {
      return this["init@370"];
     },
     get_update:function()
     {
      return this["update@370"];
     },
     get_view:function()
     {
      return this["view@370"];
     },
     node:function(props)
     {
      var arg0;
      arg0=this.nodeR(props);
      return{
       $:4,
       $0:arg0
      };
     },
     nodeR:function(props)
     {
      return React.createElement.apply(null,[this.reactClass,props]);
     },
     processMessages_:function(props,mail,forceUpdate,msg)
     {
      var processM,_this=this,_this1,update;
      processM=function(msg1)
      {
       return _this.processMessages_(props,mail,forceUpdate,msg1);
      };
      _this1=mail.agent;
      update=(_this["update@370"].call(null,processM))(props);
      _this1.mailbox.AddLast(function(oldState)
      {
       return _this.doMsg(mail,update,msg,forceUpdate,oldState);
      });
      return _this1.resume();
     },
     renderIncDom:function(props,container)
     {
      var _,init,mail,forceUpdate,_this=this,cipherNode;
      if(!container.state)
       {
        init=this["init@370"];
        _=void(container.state=function(_arg10_)
        {
         return App.mailbox(init,_arg10_);
        });
       }
      else
       {
        _=null;
       }
      mail=container.state;
      forceUpdate=function()
      {
       return _this.renderIncDom(props,container);
      };
      cipherNode=((_this["view@370"].call(null,props))(mail.get_latest()))(function(msg)
      {
       return _this.processMessages_(props,mail,forceUpdate,msg);
      });
      return ReactHtml.patchOuter(container,function()
      {
       return ReactHtml.toIncrementalDom(cipherNode);
      });
     },
     renderReact:function(_this)
     {
      var forceUpdate_,forceUpdate,mail,props,node,_this1=this;
      forceUpdate_=_this.forceUpdate;
      forceUpdate=function()
      {
       var value;
       value=forceUpdate_.apply(_this,[]);
       return;
      };
      mail=_this.state;
      props=_this.props;
      node=((this["view@370"].call(null,props))(mail.get_latest()))(function(msg)
      {
       return _this1.processMessages_(props,mail,forceUpdate,msg);
      });
      return ReactHtml.toReact(node);
     },
     run:function(props,container)
     {
      return this.isIncrementalDom?ReactDOM.render(this.nodeR(props),container):this.renderIncDom(props,container);
     },
     setIncrementalDom:function(b)
     {
      this.isIncrementalDom=b;
      return;
     }
    },{
     New:function(init,update3,view)
     {
      return Runtime.New(this,App1.New2(init,function()
      {
       return function(props)
       {
        return function(msg)
        {
         return function(model)
         {
          var arg0;
          arg0=((update3(props))(msg))(model);
          return{
           $:0,
           $0:arg0
          };
         };
        };
       };
      },view));
     },
     New1:function(init,update2,view)
     {
      return Runtime.New(this,App1.New2(init,function()
      {
       return function()
       {
        return function(msg)
        {
         return function(model)
         {
          var arg0;
          arg0=(update2(msg))(model);
          return{
           $:0,
           $0:arg0
          };
         };
        };
       };
      },view));
     },
     New2:function(init,update,view)
     {
      var r,init1;
      r=Runtime.New(this,{});
      r["init@370"]=init;
      r["update@370"]=update;
      r["view@370"]=view;
      init1=r["init@370"];
      r.reactClass=React.createClass({
       displayName:"rootClass",
       getInitialState:function(_arg10_)
       {
        return App.mailbox(init1,_arg10_);
       },
       render:function()
       {
        return r.renderReact(this);
       }
      });
      r.isIncrementalDom=false;
      return r;
     }
    }),
    DummyNew:Runtime.Field(function()
    {
     return{
      dummy:true
     };
    }),
    MailboxState:Runtime.Class({
     get_latest:function()
     {
      return this.latestModel;
     },
     setLatest:function(l)
     {
      this.latestModel=l;
      this.get_latest().__ref=this;
      return;
     }
    }),
    mailbox:function(init)
    {
     var _,mail,_this;
     _=App.mailboxes()+1;
     App.mailboxes=function()
     {
      return _;
     };
     mail=Runtime.New(MailboxState,{
      agent:MailboxProcessor.Start(function(inbox)
      {
       var messageLoop,value;
       messageLoop=function(oldState)
       {
        return Concurrency.Delay(function()
        {
         return Concurrency.Bind(inbox.Receive({
          $:0
         }),function(_arg1)
         {
          var newState;
          newState=_arg1(oldState);
          return messageLoop(newState);
         });
        });
       };
       value=jQuery.extend.apply(jQuery,["object",init]);
       return messageLoop(value);
      },{
       $:0
      }),
      count:App.mailboxes(),
      latestModel:init
     });
     _this=mail.agent;
     _this.mailbox.AddLast(function(initState)
     {
      mail.setLatest(initState);
      return initState;
     });
     _this.resume();
     return mail;
    },
    mailboxes:Runtime.Field(function()
    {
     return 0;
    }),
    withContainerDo:function(className,f)
    {
     var arg10,x,f1,container1;
     arg10=List.ofArray([Attr.Attr().NewAttr("class",className)]);
     x=Tags.Tags().NewTag("div",arg10);
     f1=function(container)
     {
      return f(container);
     };
     Operators.OnAfterRender(f1,x);
     container1=x;
     return container1;
    }
   },
   Dialog:{
    app:Runtime.Field(function()
    {
     return App1.New(Dialog.init(),function(props)
     {
      return Dialog.update(props);
     },function(props)
     {
      return function(model)
      {
       return function(processMessages)
       {
        return Dialog.view(props,model,processMessages);
       };
      };
     });
    }),
    init:Runtime.Field(function()
    {
     return{
      dummy:false
     };
    }),
    rButtons:function(buttons)
    {
     var mapping,source;
     mapping=function(tupledArg)
     {
      var text,className,func_,x;
      text=tupledArg[0];
      className=tupledArg[1];
      func_=tupledArg[2];
      x=ReactHtml.Button(List.ofArray([ReactHtml.Class(className),ReactHtml.Disabled(false),{
       $:1,
       $0:text
      }]));
      return(ReactHtml.OnClick(func_))(x);
     };
     source=Seq.map(mapping,buttons);
     return Seq.toList(source);
    },
    update:function()
    {
     return function(message)
     {
      return function(model)
      {
       return Dialog.update_(message,model);
      };
     };
    },
    update_:function(message)
    {
     var dum;
     dum=message.$0;
     return{
      dummy:dum
     };
    },
    view:function(props)
    {
     var _,x,mapping,buttons,buttons2,mapping1,option,x2,def,newChildren,node,node1;
     if(props.show)
      {
       x=props.buttons;
       mapping=function(tupledArg)
       {
        var a,b,f;
        a=tupledArg[0];
        b=tupledArg[1];
        f=tupledArg[2];
        return[a,b,function()
        {
         var _arg1;
         f(null);
         _arg1=props.close_;
         return Option.iterF(null,_arg1);
        }];
       };
       buttons=Seq.map(mapping,x);
       buttons2=Dialog.rButtons(buttons);
       mapping1=function(close)
       {
        var x1;
        x1=ReactHtml.Button(List.ofArray([ReactHtml.Class("close"),{
         $:1,
         $0:"×"
        }]));
        return(ReactHtml.OnClick(close))(x1);
       };
       option=props.close_;
       x2=Option1.map(mapping1,option);
       def=ReactHtml.Span(Runtime.New(T,{
        $:0
       }));
       newChildren=props.content;
       node=ReactHtml.Div(List.ofArray([ReactHtml.Class("modal-body")]));
       node1=ReactHtml.Div(List.ofArray([ReactHtml.Class("modal-footer")]));
       _=ReactHtml.Div(List.ofArray([ReactHtml.Id("dialog"),ReactHtml.Role("dialog"),ReactHtml.Class("modal"),ReactHtml._Style(List.ofArray([ReactHtml._display("block"),ReactHtml._position("fixed"),ReactHtml._marginBottom("5px")])),ReactHtml.Div(List.ofArray([ReactHtml.Class("modal-dialog"),ReactHtml.Div(List.ofArray([ReactHtml.Class("modal-content"),ReactHtml.Div(List.ofArray([ReactHtml.Class("modal-header"),Option.defaultV(def,x2),ReactHtml.H4(List.ofArray([ReactHtml.Class("modal-title"),{
        $:1,
        $0:props.title
       }]))])),ReactHtml.addChildren(newChildren,node),ReactHtml.addChildren(buttons2,node1)]))]))]));
      }
     else
      {
       _={
        $:7
       };
      }
     return _;
    }
   },
   Entry:Runtime.Class({
    get_children:function()
    {
     var _,children;
     if(this.$==1)
      {
       this.$0;
       _=Runtime.New(T,{
        $:0
       });
      }
     else
      {
       this.$0;
       children=this.$1;
       _=children;
      }
     return _;
    },
    get_content:function()
    {
     var _,fl;
     if(this.$==1)
      {
       fl=this.$0;
       _=fl.contentType;
      }
     else
      {
       this.$0;
       this.$1;
       _="";
      }
     return _;
    },
    get_id:function()
    {
     var _,fl,fd;
     if(this.$==1)
      {
       fl=this.$0;
       _=fl.id;
      }
     else
      {
       fd=this.$0;
       _=fd.id;
      }
     return _;
    },
    get_isFolder:function()
    {
     var _;
     if(this.$==1)
      {
       this.$0;
       _=false;
      }
     else
      {
       this.$0;
       this.$1;
       _=true;
      }
     return _;
    },
    get_modified:function()
    {
     var _,fl;
     if(this.$==1)
      {
       fl=this.$0;
       _=fl.modified;
      }
     else
      {
       this.$0;
       this.$1;
       _="";
      }
     return _;
    },
    get_name:function()
    {
     var _,fl,fd;
     if(this.$==1)
      {
       fl=this.$0;
       _=fl.name;
      }
     else
      {
       fd=this.$0;
       this.$1;
       _=fd.name;
      }
     return _;
    },
    get_parentId:function()
    {
     var _,fl,fd;
     if(this.$==1)
      {
       fl=this.$0;
       _=fl.parentCode;
      }
     else
      {
       fd=this.$0;
       this.$1;
       _=fd.parentCode;
      }
     return _;
    },
    get_size:function()
    {
     var _,fl;
     if(this.$==1)
      {
       fl=this.$0;
       _=fl.size.toLocaleString();
      }
     else
      {
       this.$0;
       this.$1;
       _="";
      }
     return _;
    },
    get_theme:function()
    {
     var _,fl;
     if(this.$==1)
      {
       fl=this.$0;
       _=fl.tags;
      }
     else
      {
       this.$0;
       this.$1;
       _="";
      }
     return _;
    }
   }),
   Fields:{
    getValidationsFor:function(name,validations)
    {
     var chooser,arg00;
     chooser=function(v)
     {
      return v.headPathIs(name)?{
       $:1,
       $0:v.reducePath()
      }:{
       $:0
      };
     };
     arg00=Seq.choose(chooser,validations);
     return FSharpSet.New(arg00);
    },
    inputWValidator:function(label,input,onChange,attrs,validations,addValidations,validator)
    {
     var _validations_,classAlert,_onChange_,mapping,strings,clas;
     _validations_=Fields.getValidationsFor(label,validations);
     classAlert=Seq.length(_validations_)===0?"":" alert-danger";
     _onChange_=function(v)
     {
      onChange(v);
      return addValidations({
       $:1,
       $0:label,
       $1:validator(v)
      });
     };
     mapping=function(_)
     {
      var _1,_2;
      _1=function(_3)
      {
       return _3.$==1?"PathValidation ("+PrintfHelpers.printList(function(_4)
       {
        return PrintfHelpers.prettyPrint(_4);
       },_3.$0)+", "+_2(_3.$1)+")":"InputValidation "+_2(_3.$0);
      };
      _2=function(_3)
      {
       return _3.$==4?"VPatternNotMatch ("+PrintfHelpers.prettyPrint(_3.$0)+", "+PrintfHelpers.prettyPrint(_3.$1)+")":_3.$==3?"VUnsupportedData "+PrintfHelpers.prettyPrint(_3.$0):_3.$==2?"VCannotModify":_3.$==1?"VNotLongerThan "+PrintfHelpers.prettyPrint(_3.$0):"VEmpty";
      };
      return _1(_);
     };
     strings=FSharpSet.New1(BalancedTree.OfSeq(Seq.map(mapping,_validations_)));
     clas="form-control"+classAlert;
     return ReactHtml.Div(List.ofArray([ReactHtml.Class("form-group flex1"),ReactHtml.Label(List.ofArray([ReactHtml.Class("textInputLabel"),{
      $:1,
      $0:label
     }])),Fields.validationMsg(Strings.concat(", ",strings)),(input(_onChange_))(Runtime.New(T,{
      $:1,
      $0:ReactHtml.Class(clas),
      $1:attrs
     }))]));
    },
    op_PlusPlus:function(a,b,v)
    {
     return FSharpSet.New1(BalancedTree.OfSeq(Seq.append(a(v),b(v))));
    },
    selectWoValidator:function(label,value,onChange,options,attrs)
    {
     var mapping,options2,input;
     mapping=function(tupledArg)
     {
      var key,opt;
      key=tupledArg[0];
      opt=tupledArg[1];
      return ReactHtml.OptionA(List.ofArray([ReactHtml.Key(key),ReactHtml.Value(key),{
       $:1,
       $0:opt
      }]));
     };
     options2=Seq.map(mapping,options);
     input=function(_onChange_)
     {
      return function(_attrs_)
      {
       var x,node,x1;
       x=ReactHtml.Select(List.ofArray([ReactHtml.Value(Option.defaultV("",value))]));
       node=((ReactHtml.addAttributes())(_attrs_))(x);
       x1=ReactHtml.addChildren(options2,node);
       return(ReactHtml.OnChange(function(e)
       {
        return _onChange_(e.target.value);
       }))(x1);
      };
     };
     return Fields.inputWValidator(label,function(arg00)
     {
      return input(arg00);
     },onChange,attrs,FSharpSet.New(Runtime.New(T,{
      $:0
     })),function()
     {
      return null;
     },function(_arg1)
     {
      return Fields.validateNothing_(_arg1);
     });
    },
    textNotEmpty:function(label,value,onChange,attrs,validations,addValidations)
    {
     return Fields.textWValidator(label,value,onChange,attrs,validations,addValidations,function(v)
     {
      return Fields.validateEmpty_(v);
     });
    },
    textWValidator:function(label,value,onChange,attrs,validations,addValidations,validator)
    {
     var input;
     input=function(_onChange_)
     {
      return function(_attrs_)
      {
       var x,x1;
       x=ReactHtml.Input(List.ofArray([ReactHtml.Type("text"),ReactHtml.Value(value)]));
       x1=((ReactHtml.addAttributes())(_attrs_))(x);
       return(ReactHtml.OnChange(function(e)
       {
        return _onChange_(e.target.value);
       }))(x1);
      };
     };
     return Fields.inputWValidator(label,function(arg00)
     {
      return input(arg00);
     },onChange,attrs,validations,addValidations,validator);
    },
    textWoValidator:function(label,value,onChange,attrs)
    {
     return Fields.textWValidator(label,value,onChange,attrs,FSharpSet.New(Runtime.New(T,{
      $:0
     })),function()
     {
      return null;
     },function(_arg1)
     {
      return Fields.validateNothing_(_arg1);
     });
    },
    validateEmail_:function(email)
    {
     var emailPattern,arg00,_,arg0;
     emailPattern=new RegExp("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
     if(email===""?true:emailPattern.test(email))
      {
       _=Runtime.New(T,{
        $:0
       });
      }
     else
      {
       arg0={
        $:4,
        $0:"not a valid email",
        $1:email
       };
       _=List.ofArray([Runtime.New(Validation,{
        $:0,
        $0:arg0
       })]);
      }
     arg00=_;
     return FSharpSet.New(arg00);
    },
    validateEmpty_:function(v)
    {
     var arg00,_,arg0;
     if(v!=="")
      {
       _=Runtime.New(T,{
        $:0
       });
      }
     else
      {
       arg0={
        $:0
       };
       _=List.ofArray([Runtime.New(Validation,{
        $:0,
        $0:arg0
       })]);
      }
     arg00=_;
     return FSharpSet.New(arg00);
    },
    validateNothing_:function()
    {
     return FSharpSet.New(Runtime.New(T,{
      $:0
     }));
    },
    validationMsg:function(msg)
    {
     return msg===""?{
      $:7
     }:ReactHtml.Span(List.ofArray([ReactHtml.Class("alert validation"),{
      $:1,
      $0:msg
     }]));
    }
   },
   FileTree:{
    app:Runtime.Field(function()
    {
     return App1.New(FileTree.init(),function(props)
     {
      return FileTree.update(props);
     },function(props)
     {
      return function(model)
      {
       return function(processMessages)
       {
        return FileTree.view(props,model,processMessages);
       };
      };
     });
    }),
    init:Runtime.Field(function()
    {
     return{
      sortBy:List.ofArray([{
       $:0
      },{
       $:2
      },{
       $:1
      },{
       $:3
      },{
       $:4
      }]),
      expanded:FSharpSet.New(Runtime.New(T,{
       $:0
      })),
      selected:{
       $:0
      }
     };
    }),
    update:function()
    {
     return function(msg)
     {
      return function(model)
      {
       return FileTree.update_(msg,model);
      };
     };
    },
    update_:function(msg,model)
    {
     var _,id,exp,expanded,idO;
     if(msg.$==0)
      {
       id=msg.$0;
       exp=msg.$1;
       expanded=((exp?function(value)
       {
        return function(set)
        {
         return set.Add(value);
        };
       }:function(value)
       {
        return function(set)
        {
         return set.Remove(value);
        };
       })(id))(model.expanded);
       _={
        sortBy:model.sortBy,
        expanded:expanded,
        selected:model.selected
       };
      }
     else
      {
       idO=msg.$0;
       _={
        sortBy:model.sortBy,
        expanded:model.expanded,
        selected:idO
       };
      }
     return _;
    },
    view:function(props,model,processMessages)
    {
     var elemRows,x2,x3,x4,arg00;
     elemRows=function(model1)
     {
      return function(level)
      {
       return function(elems)
       {
        var mapping;
        mapping=function(elem)
        {
         var source,value,hasChildren,expanded,item,_,x1;
         source=elem.get_children();
         value=Seq.isEmpty(source);
         hasChildren=!value;
         expanded=model1.expanded.Contains(elem.get_id());
         item=FileTreeNode.app().node({
          entry:elem,
          expanded:expanded,
          selected:Unchecked.Equals(model1.selected,{
           $:1,
           $0:elem.get_id()
          }),
          level:level,
          setExpanded:function(x)
          {
           var arg0,arg1;
           arg0=x[0];
           arg1=x[1];
           return processMessages({
            $:0,
            $0:arg0,
            $1:arg1
           });
          },
          setSelected:function(x)
          {
           return processMessages({
            $:1,
            $0:x
           });
          },
          onClick:props.onClick
         });
         if(hasChildren?expanded:false)
          {
           x1=elem.get_children();
           _=Seq.append(List.ofArray([item]),((elemRows(model1))(level+1))(x1));
          }
         else
          {
           _=List.ofArray([item]);
          }
         return _;
        };
        return Seq.collect(mapping,elems);
       };
      };
     };
     x3=ReactHtml.Tr(List.ofArray([ReactHtml.Th(List.ofArray([{
      $:1,
      $0:"Element"
     },ReactHtml._Style(List.ofArray([ReactHtml._paddingLeft("3ch")]))]))]));
     x4=props.entries;
     x2=ReactHtml.Table(List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._whiteSpace("nowrap")])),ReactHtml.THead(List.ofArray([(FileTreeNode.addMoreFields(function(children)
     {
      return ReactHtml.Th(children);
     },List.ofArray([{
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
     }])))(x3)])),ReactHtml.TBody(((elemRows(model))(0))(x4))]));
     arg00=List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._margin("5px"),ReactHtml._overflow("auto")]))]);
     return((ReactHtml.addAttributes())(arg00))(x2);
    }
   },
   FileTreeNode:{
    addMoreFields:function(tag,fields)
    {
     var mapping,newChildren;
     mapping=function(v)
     {
      return tag(List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._paddingLeft("0.5ch"),ReactHtml._paddingRight("0.5ch"),ReactHtml._overflow("hidden"),ReactHtml._textOverflow("ellipsis")])),v]));
     };
     newChildren=List.map(mapping,fields);
     return function(node)
     {
      return ReactHtml.addChildren(newChildren,node);
     };
    },
    app:Runtime.Field(function()
    {
     return App1.New(FileTreeNode.init(),function(props)
     {
      return function(msg)
      {
       return function(model)
       {
        return FileTreeNode.update(props,msg,model);
       };
      };
     },function(props)
     {
      return function(model)
      {
       return function(processMessages)
       {
        return FileTreeNode.view(props,model,processMessages);
       };
      };
     });
    }),
    init:Runtime.Field(function()
    {
     return{
      hover:false
     };
    }),
    update:function(props,msg)
    {
     var hov;
     hov=msg.$0;
     return{
      hover:hov
     };
    },
    view:function(props,model,processMessages)
    {
     var source,value,hasChildren,matchValue,symbol,x,x1,arg00,x2,x3,x4,x5,x6,arg001,x7;
     source=props.entry.get_children();
     value=Seq.isEmpty(source);
     hasChildren=!value;
     matchValue=[hasChildren,props.expanded];
     symbol=matchValue[0]?matchValue[1]?"\ue114 ":"\ue080 ":"\ue235 ";
     x1=ReactHtml.Div(List.ofArray([{
      $:1,
      $0:symbol
     },ReactHtml._Style(List.ofArray([ReactHtml._display("inline"),ReactHtml._fontFamily("Glyphicons Halflings"),ReactHtml._fontSize("11px"),ReactHtml._cursor("pointer"),ReactHtml._paddingLeft(Global.String(props.level*4)+"ch")]))]));
     arg00=model.hover?List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._background("#e6e6e6")]))]):Runtime.New(T,{
      $:0
     });
     x2=((ReactHtml.addAttributes())(arg00))(x1);
     x3=(ReactHtml.OnMouseOver(function()
     {
      return!model.hover?processMessages({
       $:0,
       $0:true
      }):null;
     }))(x2);
     x4=(ReactHtml.OnMouseOut(function()
     {
      return processMessages({
       $:0,
       $0:false
      });
     }))(x3);
     x=ReactHtml.Tr(List.ofArray([ReactHtml.Td(List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._overflow("hidden"),ReactHtml._textOverflow("ellipsis")])),(ReactHtml.OnClick(function()
     {
      return props.setExpanded.call(null,[props.entry.get_id(),!props.expanded]);
     }))(x4),ReactHtml.Div(List.ofArray([{
      $:1,
      $0:props.entry.get_name()
     },ReactHtml._Style(List.ofArray([ReactHtml._display("inline"),ReactHtml._paddingRight("1ch")])),ReactHtml.Draggable(true)]))]))]));
     x6=ReactHtml.Div(List.ofArray([{
      $:1,
      $0:":::"
     },ReactHtml._Style(List.ofArray([ReactHtml._textAlign("center")]))]));
     x5=(FileTreeNode.addMoreFields(function(children)
     {
      return ReactHtml.Td(children);
     },List.ofArray([{
      $:1,
      $0:props.entry.get_theme()
     },(ReactHtml.OnClick(function(ev)
     {
      props.setSelected.call(null,{
       $:1,
       $0:props.entry.get_id()
      });
      return props.onClick.call(null,ev);
     }))(x6),{
      $:1,
      $0:props.entry.get_content()
     },ReactHtml.Div(List.ofArray([{
      $:1,
      $0:props.entry.get_size()
     },ReactHtml._Style(List.ofArray([ReactHtml._textAlign("right")]))])),{
      $:1,
      $0:props.entry.get_modified()
     }])))(x);
     arg001=props.selected?List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._background("lightblue")]))]):Runtime.New(T,{
      $:0
     });
     x7=((ReactHtml.addAttributes())(arg001))(x5);
     return(ReactHtml.OnClick(function()
     {
      return props.setSelected.call(null,{
       $:1,
       $0:props.entry.get_id()
      });
     }))(x7);
    }
   },
   GenForm:{
    Validation:Runtime.Class({
     addPath:function(path)
     {
      var _,v,p,v1;
      if(this.$==1)
       {
        v=this.$1;
        p=this.$0;
        _=Runtime.New(Validation,{
         $:1,
         $0:Runtime.New(T,{
          $:1,
          $0:path,
          $1:p
         }),
         $1:v
        });
       }
      else
       {
        v1=this.$0;
        _=Runtime.New(Validation,{
         $:1,
         $0:List.ofArray([path]),
         $1:v1
        });
       }
      return _;
     },
     headPathIs:function(head)
     {
      var _,_1,_head_,_2;
      if(this.$==1)
       {
        if(this.$0.$==1)
         {
          _head_=this.$0.$0;
          if(head===_head_)
           {
            this.$0.$0;
            _2=true;
           }
          else
           {
            _2=false;
           }
          _1=_2;
         }
        else
         {
          _1=false;
         }
        _=_1;
       }
      else
       {
        _=false;
       }
      return _;
     },
     reducePath:function()
     {
      var _,_1,_2,v,r,v1,v2;
      if(this.$==1)
       {
        if(this.$0.$==1)
         {
          if(this.$0.$1.$==0)
           {
            this.$0.$0;
            v=this.$1;
            _2=Runtime.New(Validation,{
             $:0,
             $0:v
            });
           }
          else
           {
            this.$0.$0;
            r=this.$0.$1;
            v1=this.$1;
            _2=Runtime.New(Validation,{
             $:1,
             $0:r,
             $1:v1
            });
           }
          _1=_2;
         }
        else
         {
          v2=this.$1;
          _1=Runtime.New(Validation,{
           $:0,
           $0:v2
          });
         }
        _=_1;
       }
      else
       {
        this.$0;
        _=this;
       }
      return _;
     }
    }),
    addValidationsFor:function(name,validations,newValidations)
    {
     var predicate,x,mapping,set1;
     predicate=function(_arg1)
     {
      var _,_1,h;
      if(_arg1.$==1)
       {
        if(_arg1.$0.$==1)
         {
          h=_arg1.$0.$0;
          _1=h!==name;
         }
        else
         {
          _1=true;
         }
        _=_1;
       }
      else
       {
        _=true;
       }
      return _;
     };
     x=SetModule.Filter(predicate,validations);
     mapping=function(v)
     {
      return v.addPath(name);
     };
     set1=FSharpSet.New1(BalancedTree.OfSeq(Seq.map(mapping,newValidations)));
     return FSharpSet.New1(BalancedTree.OfSeq(Seq.append(set1,x)));
    },
    app:Runtime.Field(function()
    {
     return App1.New(GenForm.init(),function(props)
     {
      return GenForm.update(props);
     },function(props)
     {
      return function(model)
      {
       return function(processMessages)
       {
        return GenForm.view(props,model,processMessages);
       };
      };
     });
    }),
    getValidationsFor:function(name,validations)
    {
     var chooser,arg00;
     chooser=function(v)
     {
      return v.headPathIs(name)?{
       $:1,
       $0:v.reducePath()
      }:{
       $:0
      };
     };
     arg00=Seq.choose(chooser,validations);
     return FSharpSet.New(arg00);
    },
    init:Runtime.Field(function()
    {
     return{
      processing:false,
      message:"",
      debug:false,
      modified:false,
      validations:FSharpSet.New(Runtime.New(T,{
       $:0
      }))
     };
    }),
    update:function()
    {
     return function(message)
     {
      return function(model)
      {
       return GenForm.update_(message,model);
      };
     };
    },
    update_:function(message,model)
    {
     var model1,_,vs,name,validations,modified,debug,p,msg;
     if(message.$==1)
      {
       vs=message.$1;
       name=message.$0;
       validations=GenForm.addValidationsFor(name,model.validations,vs);
       _={
        processing:model.processing,
        message:model.message,
        debug:model.debug,
        modified:model.modified,
        validations:validations
       };
      }
     else
      {
       if(message.$==2)
        {
         modified=message.$0;
         _={
          processing:model.processing,
          message:model.message,
          debug:model.debug,
          modified:modified,
          validations:model.validations
         };
        }
       else
        {
         if(message.$==3)
          {
           debug=message.$0;
           _={
            processing:model.processing,
            message:model.message,
            debug:debug,
            modified:model.modified,
            validations:model.validations
           };
          }
         else
          {
           p=message.$1;
           msg=message.$0;
           _={
            processing:p,
            message:msg,
            debug:model.debug,
            modified:model.modified,
            validations:model.validations
           };
          }
        }
      }
     model1=_;
     window.onbeforeunload=model1.modified?function(e)
     {
      e.returnValue="Changes you made may not be saved.";
     }:function()
     {
      return null;
     };
     return model1;
    },
    view:function(props,model,processMessages)
    {
     var buttons,buttons2,msg,arg01,node,newChildren,node1;
     buttons=Runtime.New(T,{
      $:1,
      $0:[".","btn-xs btn-default  pull-right",function()
      {
       var arg0;
       arg0=!model.debug;
       return processMessages({
        $:3,
        $0:arg0
       });
      }],
      $1:props.buttons
     });
     buttons2=Dialog.rButtons(buttons);
     msg=model.message===""?{
      $:7
     }:ReactHtml.Span(List.ofArray([ReactHtml.Class("alert validation"),{
      $:1,
      $0:model.message
     }]));
     arg01=(model.modified?"*":"")+props.title;
     node=ReactHtml.Div(List.ofArray([ReactHtml.Class("btn-toolbar pull-right")]));
     newChildren=props.content;
     node1=ReactHtml.Div(List.ofArray([ReactHtml.Class("panel-body flex flexgrow")]));
     return ReactHtml.Div(List.ofArray([ReactHtml.Class("panel panel-info flex flexgrow"),ReactHtml.Div(List.ofArray([ReactHtml.Class("panel-heading heading"),ReactHtml.Label(List.ofArray([ReactHtml.Class("panel-title text-center"),{
      $:1,
      $0:arg01
     }])),msg,ReactHtml.addChildren(buttons2,node)])),ReactHtml.addChildren(newChildren,node1)]));
    }
   },
   LoginForm:{
    init:function(goLink,error)
    {
     return{
      userName:"",
      password:"",
      inProgress:false,
      goLink:goLink,
      error:error
     };
    },
    showForm_:function(goLink,error)
    {
     return App.withContainerDo("",function(node)
     {
      var arg10;
      arg10=node.Dom;
      return App1.New(LoginForm.init(goLink,error),function(props)
      {
       return function(msg)
       {
        return function(model)
        {
         return LoginForm.update(props,msg,model);
        };
       };
      },function(props)
      {
       return function(model)
       {
        return function(processMessages)
        {
         return LoginForm.view(props,model,processMessages);
        };
       };
      }).run(App.DummyNew(),arg10);
     });
    },
    update:function(props,msg,model)
    {
     var _,pwd,error,err,error1,username,error2;
     if(msg.$==1)
      {
       pwd=msg.$0;
       error={
        $:0
       };
       _={
        userName:model.userName,
        password:pwd,
        inProgress:model.inProgress,
        goLink:model.goLink,
        error:error
       };
      }
     else
      {
       if(msg.$==2)
        {
         _={
          userName:model.userName,
          password:model.password,
          inProgress:true,
          goLink:model.goLink,
          error:model.error
         };
        }
       else
        {
         if(msg.$==3)
          {
           err=msg.$0;
           error1={
            $:1,
            $0:err
           };
           _={
            userName:model.userName,
            password:model.password,
            inProgress:false,
            goLink:model.goLink,
            error:error1
           };
          }
         else
          {
           username=msg.$0;
           error2={
            $:0
           };
           _={
            userName:username,
            password:model.password,
            inProgress:model.inProgress,
            goLink:model.goLink,
            error:error2
           };
          }
        }
      }
     return _;
    },
    view:function(props,model,processMessages)
    {
     var submit,submitGuest,disabledClass,x,x1,x3,x4,matchValue,children,_b,e1,form;
     submit=function(e)
     {
      var _builder_,f;
      e.preventDefault();
      processMessages({
       $:2
      });
      f=function(failed)
      {
       return function(ms)
       {
        var _,_1,_2,_3,_4,_5,_6,_7,_8;
        if(failed)
         {
          _1=function(_9)
          {
           return _9.$==30?"ErrOptionIsNone":_9.$==29?"ErrGuestUserNotActivated":_9.$==28?"ErrAleaError ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==27?"ErrNoRecordsProcessed":_9.$==26?"ErrUnsuportedDataStorage":_9.$==25?"ErrWebSharperCompiler "+PrintfHelpers.prettyPrint(_9.$0):_9.$==24?"ErrFSharpCompiler "+PrintfHelpers.prettyPrint(_9.$0):_9.$==23?"ErrFeatureNotImplemented "+PrintfHelpers.prettyPrint(_9.$0):_9.$==22?"ErrRecordNotFound ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==21?"ErrRecordWasNotUpdated "+PrintfHelpers.prettyPrint(_9.$0):_9.$==20?"ErrDockerIsNotPresent "+_5(_9.$0):_9.$==19?"ErrObjectNotFound "+_8(_9.$0):_9.$==18?"ErrNoProvisionedClientAvailable":_9.$==17?"ErrClientNotFound "+_7(_9.$0):_9.$==16?"ErrUserIsNotDefined "+PrintfHelpers.prettyPrint(_9.$0):_9.$==15?"ErrUserIsNotAssociatedToClient "+_6(_9.$0):_9.$==14?"ErrDockerDataNotFound "+_5(_9.$0):_9.$==13?"ErrUniqueIdNotDefinedForReport "+_2(_9.$0):_9.$==12?"ErrDockerDefinitionNotFound "+_5(_9.$0):_9.$==11?"ErrTableDefinitionNotFound "+_3(_9.$0):_9.$==10?"ErrReportDefinitionNotFound "+_2(_9.$0):_9.$==9?"ErrInvalidContentPageForClient "+PrintfHelpers.prettyPrint(_9.$0):_9.$==8?"ErrInvalidToken "+PrintfHelpers.prettyPrint(_9.$0):_9.$==7?"ErrLoginFailed "+PrintfHelpers.prettyPrint(_9.$0):_9.$==6?"ErrUserIsNotLoggedIn":_9.$==5?"ErrValueIsNull ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==4?"ErrParameterMissing "+PrintfHelpers.prettyPrint(_9.$0):_9.$==3?"ErrDuplicatedKeys ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.printArray(function(_a)
           {
            return PrintfHelpers.prettyPrint(_a);
           },_9.$1)+")":_9.$==2?"ErrUndefinedKeys ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.printArray(function(_a)
           {
            return PrintfHelpers.prettyPrint(_a);
           },_9.$1)+")":_9.$==1?"ErrExceptionThrown "+PrintfHelpers.prettyPrint(_9.$0):"WarnNotification "+PrintfHelpers.prettyPrint(_9.$0);
          };
          _2=function(_9)
          {
           return"Report "+PrintfHelpers.prettyPrint(_9.$0);
          };
          _3=function(_9)
          {
           return _9.$==2?"ExternalTable ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==1?"SystemTable "+PrintfHelpers.prettyPrint(_9.$0):"DimensionTable "+_4(_9.$0);
          };
          _4=function(_9)
          {
           return"Dimension "+PrintfHelpers.prettyPrint(_9.$0);
          };
          _5=function(_9)
          {
           return _9.$==5?"DckDockSpawn":_9.$==4?"DckPhosphor":_9.$==3?"DckWCDocker":_9.$==2?"DckGoldenLayout":_9.$==1?"DckSingle":"DckEmpty";
          };
          _6=function(_9)
          {
           return"User "+PrintfHelpers.prettyPrint(_9.$0);
          };
          _7=function(_9)
          {
           return"Client "+PrintfHelpers.prettyPrint(_9.$0);
          };
          _8=function(_9)
          {
           return"OWorkspace "+PrintfHelpers.prettyPrint(_9.$0);
          };
          _=processMessages({
           $:3,
           $0:PrintfHelpers.printList(function(_9)
           {
            return _1(_9);
           },ms)
          });
         }
        else
         {
          _=null;
         }
        return _;
       };
      };
      _builder_=Server.callR(function(_arg1)
      {
       return Rop1.messagesDo(f,_arg1);
      });
      return _builder_.Delay(function()
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype3:10",[model.userName,model.password]),function()
       {
        window.location.href=model.goLink;
        return _builder_.Zero();
       });
      });
     };
     submitGuest=function()
     {
      var _builder_,f;
      processMessages({
       $:2
      });
      f=function(failed)
      {
       return function(ms)
       {
        var _,_1,_2,_3,_4,_5,_6,_7,_8;
        if(failed)
         {
          _1=function(_9)
          {
           return _9.$==30?"ErrOptionIsNone":_9.$==29?"ErrGuestUserNotActivated":_9.$==28?"ErrAleaError ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==27?"ErrNoRecordsProcessed":_9.$==26?"ErrUnsuportedDataStorage":_9.$==25?"ErrWebSharperCompiler "+PrintfHelpers.prettyPrint(_9.$0):_9.$==24?"ErrFSharpCompiler "+PrintfHelpers.prettyPrint(_9.$0):_9.$==23?"ErrFeatureNotImplemented "+PrintfHelpers.prettyPrint(_9.$0):_9.$==22?"ErrRecordNotFound ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==21?"ErrRecordWasNotUpdated "+PrintfHelpers.prettyPrint(_9.$0):_9.$==20?"ErrDockerIsNotPresent "+_5(_9.$0):_9.$==19?"ErrObjectNotFound "+_8(_9.$0):_9.$==18?"ErrNoProvisionedClientAvailable":_9.$==17?"ErrClientNotFound "+_7(_9.$0):_9.$==16?"ErrUserIsNotDefined "+PrintfHelpers.prettyPrint(_9.$0):_9.$==15?"ErrUserIsNotAssociatedToClient "+_6(_9.$0):_9.$==14?"ErrDockerDataNotFound "+_5(_9.$0):_9.$==13?"ErrUniqueIdNotDefinedForReport "+_2(_9.$0):_9.$==12?"ErrDockerDefinitionNotFound "+_5(_9.$0):_9.$==11?"ErrTableDefinitionNotFound "+_3(_9.$0):_9.$==10?"ErrReportDefinitionNotFound "+_2(_9.$0):_9.$==9?"ErrInvalidContentPageForClient "+PrintfHelpers.prettyPrint(_9.$0):_9.$==8?"ErrInvalidToken "+PrintfHelpers.prettyPrint(_9.$0):_9.$==7?"ErrLoginFailed "+PrintfHelpers.prettyPrint(_9.$0):_9.$==6?"ErrUserIsNotLoggedIn":_9.$==5?"ErrValueIsNull ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==4?"ErrParameterMissing "+PrintfHelpers.prettyPrint(_9.$0):_9.$==3?"ErrDuplicatedKeys ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.printArray(function(_a)
           {
            return PrintfHelpers.prettyPrint(_a);
           },_9.$1)+")":_9.$==2?"ErrUndefinedKeys ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.printArray(function(_a)
           {
            return PrintfHelpers.prettyPrint(_a);
           },_9.$1)+")":_9.$==1?"ErrExceptionThrown "+PrintfHelpers.prettyPrint(_9.$0):"WarnNotification "+PrintfHelpers.prettyPrint(_9.$0);
          };
          _2=function(_9)
          {
           return"Report "+PrintfHelpers.prettyPrint(_9.$0);
          };
          _3=function(_9)
          {
           return _9.$==2?"ExternalTable ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==1?"SystemTable "+PrintfHelpers.prettyPrint(_9.$0):"DimensionTable "+_4(_9.$0);
          };
          _4=function(_9)
          {
           return"Dimension "+PrintfHelpers.prettyPrint(_9.$0);
          };
          _5=function(_9)
          {
           return _9.$==5?"DckDockSpawn":_9.$==4?"DckPhosphor":_9.$==3?"DckWCDocker":_9.$==2?"DckGoldenLayout":_9.$==1?"DckSingle":"DckEmpty";
          };
          _6=function(_9)
          {
           return"User "+PrintfHelpers.prettyPrint(_9.$0);
          };
          _7=function(_9)
          {
           return"Client "+PrintfHelpers.prettyPrint(_9.$0);
          };
          _8=function(_9)
          {
           return"OWorkspace "+PrintfHelpers.prettyPrint(_9.$0);
          };
          _=processMessages({
           $:3,
           $0:PrintfHelpers.printList(function(_9)
           {
            return _1(_9);
           },ms)
          });
         }
        else
         {
          _=null;
         }
        return _;
       };
      };
      _builder_=Server.callR(function(_arg1)
      {
       return Rop1.messagesDo(f,_arg1);
      });
      return _builder_.Delay(function()
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype3:11",[]),function()
       {
        window.location.href=model.goLink;
        return _builder_.Zero();
       });
      });
     };
     disabledClass=model.inProgress?" disabled":"";
     x1=ReactHtml.Input(List.ofArray([ReactHtml.Type("text"),ReactHtml.Class("form-control"+disabledClass),ReactHtml.Placeholder("User Name"),ReactHtml.Value(model.userName),ReactHtml.Disabled(model.inProgress)]));
     x3=ReactHtml.Input(List.ofArray([ReactHtml.Type("password"),ReactHtml.Class("form-control"+disabledClass),ReactHtml.Placeholder("Password"),ReactHtml.Value(model.password),ReactHtml.Disabled(model.inProgress)]));
     x4=ReactHtml.Button(List.ofArray([ReactHtml.Type("button"),ReactHtml.Class("btn btn-info btn-block"+disabledClass),{
      $:1,
      $0:"Enter as Guest"
     }]));
     matchValue=model.error;
     if(matchValue.$==0)
      {
       _b=Runtime.New(T,{
        $:0
       });
      }
     else
      {
       e1=matchValue.$0;
       _b=List.ofArray([ReactHtml.Class("alert alert-danger"),{
        $:1,
        $0:e1
       }]);
      }
     children=_b;
     x=ReactHtml.Form(List.ofArray([(ReactHtml.OnChange(function(x2)
     {
      var o,arg0;
      o=x2.target;
      arg0=o.value;
      return processMessages({
       $:0,
       $0:arg0
      });
     }))(x1),ReactHtml.Br(Runtime.New(T,{
      $:0
     })),(ReactHtml.OnChange(function(x2)
     {
      var o,arg0;
      o=x2.target;
      arg0=o.value;
      return processMessages({
       $:1,
       $0:arg0
      });
     }))(x3),ReactHtml.Br(Runtime.New(T,{
      $:0
     })),ReactHtml.Button(List.ofArray([ReactHtml.Type("submit"),ReactHtml.Class("btn btn-primary btn-block"+disabledClass),{
      $:1,
      $0:"Login"
     }])),ReactHtml.Div(List.ofArray([ReactHtml.Class("flex-row"),ReactHtml.Div(List.ofArray([ReactHtml.Class("flexgrow"),ReactHtml.Hr(Runtime.New(T,{
      $:0
     }))])),ReactHtml.Div(List.ofArray([ReactHtml.Class("flexgrow-1-5 text-center"),ReactHtml.H5(List.ofArray([{
      $:1,
      $0:"or"
     }]))])),ReactHtml.Div(List.ofArray([ReactHtml.Class("flexgrow"),ReactHtml.Hr(Runtime.New(T,{
      $:0
     }))]))])),(ReactHtml.OnClick(submitGuest))(x4),ReactHtml.Br(Runtime.New(T,{
      $:0
     })),ReactHtml.Div(Seq.toList(Seq.delay(function()
     {
      return Seq.append([ReactHtml.Class("text-center")],Seq.delay(function()
      {
       return model.inProgress?[ReactHtml.Img(List.ofArray([ReactHtml.Src("/EPFileX/image/loader.gif")]))]:Seq.empty();
      }));
     }))),ReactHtml.Div(children)]));
     form=(ReactHtml.OnSubmit(submit))(x);
     return ReactHtml.Div(List.ofArray([ReactHtml.Class("flex-row flex-align-center flexgrow"),ReactHtml.Div(List.ofArray([ReactHtml.Class("blur"),ReactHtml._Style(List.ofArray([ReactHtml._position("absolute"),ReactHtml._top("0Px"),ReactHtml._left("0Px"),ReactHtml._bottom("0Px"),ReactHtml._right("0Px"),ReactHtml.newAttr("backgroundImage","url('/EPFileX/image/BI_CONSULTANCY.jpg')"),ReactHtml.newAttr("backgroundSize","cover"),ReactHtml.newAttr("backgroundPosition","center center")]))])),ReactHtml.Div(List.ofArray([ReactHtml.Class("container"),ReactHtml.Div(List.ofArray([ReactHtml.Class("row"),ReactHtml.Div(List.ofArray([ReactHtml.Class("col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3"),ReactHtml.Div(List.ofArray([ReactHtml.Class("panel panel-default shadow"),ReactHtml.Div(List.ofArray([ReactHtml.Class("panel-body"),ReactHtml.Div(List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._textAlign("center")])),ReactHtml.Img(List.ofArray([{
      $:2,
      $0:"alt",
      $1:"Brand"
     },ReactHtml.Src("/EPFileX/image/LOGO_cipher2.png"),ReactHtml._Style(List.ofArray([ReactHtml._width("200px")]))])),form]))]))]))]))]))]))]));
    }
   },
   Model:{
    Client:Runtime.Class({
     get_clientCode:function()
     {
      var clientCode;
      clientCode=this.$0;
      return clientCode;
     }
    }),
    Connection:Runtime.Class({
     get_ConnectionId:function()
     {
      var connectionId;
      connectionId=this.$0;
      return connectionId;
     }
    }),
    Cube:Runtime.Class({
     get_cubeId:function()
     {
      var cubeId;
      cubeId=this.$0;
      return cubeId;
     }
    }),
    CubeOlap:Runtime.Class({
     get_cubeOlapId:function()
     {
      var cubeId;
      cubeId=this.$0;
      return cubeId.toUpperCase();
     },
     get_name:function()
     {
      var cubeName;
      cubeName=this.$0;
      return cubeName;
     }
    }),
    DimOlap:Runtime.Class({
     get_dimOlapId:function()
     {
      var dimensionId;
      dimensionId=this.$0;
      return dimensionId.toUpperCase();
     },
     get_name:function()
     {
      var dimName;
      dimName=this.$0;
      return dimName;
     }
    }),
    Dimension:Runtime.Class({
     get_dimensionId:function()
     {
      var dimensionId;
      dimensionId=this.$0;
      return dimensionId;
     }
    }),
    ElemOlap:Runtime.Class({
     get_elemOlapId:function()
     {
      var elemId;
      elemId=this.$0;
      return Strings.Replace(elemId.toLowerCase()," ","");
     },
     get_name:function()
     {
      var elemName;
      elemName=this.$0;
      return elemName;
     }
    }),
    ElemOlapRel:Runtime.Class({
     AddChild:function()
     {
      this._children=this._children;
      return;
     },
     get_Elem:function()
     {
      return this.elem;
     },
     get_GetChildren:function()
     {
      return this._children;
     }
    },{
     New:function(elem)
     {
      var r;
      r=Runtime.New(this,{});
      r.elem=elem;
      r._children=Runtime.New(T,{
       $:0
      });
      return r;
     }
    }),
    Language:Runtime.Class({
     get_languageCode:function()
     {
      var languageCode;
      languageCode=this.$0;
      return languageCode;
     }
    },{
     get_defaultL:function()
     {
      return Runtime.New(Language,{
       $:0,
       $0:"en"
      });
     }
    }),
    ObjectT:Runtime.Class({
     get_objectId:function()
     {
      var workspaceId;
      workspaceId=this.$0;
      return workspaceId;
     }
    }),
    Report:Runtime.Class({
     get_reportId:function()
     {
      var reportId;
      reportId=this.$0;
      return reportId;
     }
    }),
    ServerOlap:Runtime.Class({
     get_serverId:function()
     {
      var serverId;
      serverId=this.$0;
      return serverId;
     }
    }),
    User:Runtime.Class({
     get_userCode:function()
     {
      var userCode;
      userCode=this.$0;
      return userCode;
     },
     isGuest_:function()
     {
      return Unchecked.Equals(Runtime.New(User,{
       $:0,
       $0:"ef047959-15b4-43dc-b131-39646009a706"
      }),this);
     }
    }),
    Workspace:Runtime.Class({
     get_getObject:function()
     {
      var objectId;
      objectId=this.$0;
      return Runtime.New(ObjectT,{
       $:0,
       $0:objectId
      });
     }
    }),
    dockerFromText:function(_arg1)
    {
     return _arg1==="DckSingle"?{
      $:1
     }:_arg1==="DckGoldenLayout"?{
      $:2
     }:_arg1==="DckWCDocker"?{
      $:3
     }:_arg1==="DckPhosphor"?{
      $:4
     }:_arg1==="DckDockSpawn"?{
      $:5
     }:{
      $:0
     };
    }
   },
   Model2:{
    callF:function(f,p1,p2)
    {
     var f1;
     f1=Runtime.CreateFuncWithArgs(f);
     return f1.apply(null,[p1,p2]);
    },
    left:function(n,s)
    {
     return s.length<=n?s:Slice.string(s,{
      $:1,
      $0:0
     },{
      $:1,
      $0:n-1
     });
    },
    sortOrder:function(order,alt)
    {
     var _,v,_1,v1;
     if(order.$==1)
      {
       v=order.$0;
       if(Strings.Trim(v)!=="")
        {
         v1=order.$0;
         _1=Strings.Trim(v1);
        }
       else
        {
         _1=alt;
        }
       _=_1;
      }
     else
      {
       _=alt;
      }
     return _;
    },
    strToKey:function(s)
    {
     return Strings.Replace(s.toLowerCase()," ","");
    }
   },
   Popup:{
    app:Runtime.Field(function()
    {
     return App1.New(Popup.init(),function(props)
     {
      return Popup.update(props);
     },function(props)
     {
      return function(model)
      {
       return function(processMessages)
       {
        return Popup.view(props,model,processMessages);
       };
      };
     });
    }),
    init:Runtime.Field(function()
    {
     return{
      show:false,
      top:-1,
      left:-1,
      baseX:0,
      baseY:0
     };
    }),
    update:function()
    {
     return function(message)
     {
      return function(model)
      {
       return Popup.update_(message,model);
      };
     };
    },
    update_:function(message,model)
    {
     var _,top,left,top1,left1;
     if(message.$==0)
      {
       top=message.$1;
       left=message.$0;
       _={
        show:true,
        top:top,
        left:left,
        baseX:model.baseX,
        baseY:model.baseY
       };
      }
     else
      {
       if(message.$==1)
        {
         top1=message.$1;
         left1=message.$0;
         _={
          show:model.show,
          top:model.top,
          left:model.left,
          baseX:left1,
          baseY:top1
         };
        }
       else
        {
         _={
          show:false,
          top:model.top,
          left:model.left,
          baseX:model.baseX,
          baseY:model.baseY
         };
        }
      }
     return _;
    },
    view:function(props,model,processMessages)
    {
     var item,_,x1,x2,top,lef,source,newChildren;
     item=function(tupledArg)
     {
      var text,func_;
      text=tupledArg[0];
      func_=tupledArg[1];
      return ReactHtml.Li(Seq.toList(Seq.delay(function()
      {
       return Seq.append(text==="-"?[ReactHtml.Class("divider")]:Seq.empty(),Seq.delay(function()
       {
        var x;
        x=ReactHtml.A(List.ofArray([ReactHtml.TabIndex("-1"),ReactHtml.Href("#"),{
         $:1,
         $0:text
        }]));
        return[(ReactHtml.OnClick(function()
        {
         processMessages({
          $:2
         });
         return func_(null);
        }))(x)];
       }));
      })));
     };
     if(model.show)
      {
       top=(model.top+model.baseY).toFixed(6)+"px";
       lef=(model.left+model.baseX).toFixed(6)+"px";
       x2=ReactHtml.Menu(List.ofArray([ReactHtml.Class("dropdown-menu"),ReactHtml.Role("menu"),ReactHtml._Style(List.ofArray([ReactHtml._display("block"),ReactHtml._position("fixed"),ReactHtml._marginBottom("5px"),ReactHtml._top(top),ReactHtml._left(lef)]))]));
       source=props.menuItems;
       newChildren=Seq.map(item,source);
       x1=ReactHtml.Div(List.ofArray([ReactHtml.Class("dropdown clearfix"),ReactHtml._Style(List.ofArray([ReactHtml._display("block"),ReactHtml._position("fixed"),ReactHtml._height("95%"),ReactHtml._width("95%"),ReactHtml._zIndex("100")])),ReactHtml.addChildren(newChildren,x2)]));
       _=(ReactHtml.OnClick(function()
       {
        return processMessages({
         $:2
        });
       }))(x1);
      }
     else
      {
       _={
        $:7
       };
      }
     return _;
    }
   },
   R:Runtime.Class({},{
    E0:function(elem,attrs,children)
    {
     var reduceAtt,_,reduction,_arg1,_1,arg00;
     if(attrs.$==0)
      {
       _={};
      }
     else
      {
       reduction=function(a)
       {
        return function(b)
        {
         return $.extend(true,{},a,b);
        };
       };
       _=Seq.reduce(reduction,attrs);
      }
     reduceAtt=_;
     _arg1=Runtime.New(T,{
      $:1,
      $0:elem,
      $1:Runtime.New(T,{
       $:1,
       $0:reduceAtt,
       $1:Seq.toList(children)
      })
     });
     if(_arg1.$==0)
      {
       _1=React.createElement.apply(null,[elem,reduceAtt]);
      }
     else
      {
       arg00=Arrays.ofSeq(_arg1);
       _1=React.createElement.apply(null,arg00);
      }
     return _1;
    },
    E00:function(elem,attrs,children)
    {
     var matchValue,reduceAtt,_,reduction,array1,x;
     matchValue=Arrays.length(attrs)===0;
     if(matchValue)
      {
       _={};
      }
     else
      {
       reduction=function(a)
       {
        return function(b)
        {
         return $.extend(true,{},a,b);
        };
       };
       _=Arrays.reduce(reduction,attrs);
      }
     reduceAtt=_;
     array1=[elem,reduceAtt];
     x=array1.concat(children);
     return React.createElement.apply(null,x);
    },
    New:function()
    {
     return Runtime.New(this,{});
    }
   }),
   ReactDOM:Runtime.Class({},{
    New:function()
    {
     return Runtime.New(this,{});
    }
   }),
   ReactHtml:{
    A:function(children)
    {
     return ReactHtml.NElement("a",children);
    },
    AutoFocus:function(foc)
    {
     return{
      $:2,
      $0:"autoFocus",
      $1:foc
     };
    },
    B:function(children)
    {
     return ReactHtml.NElement("b",children);
    },
    Br:function(children)
    {
     return ReactHtml.NElement("br",children);
    },
    Button:function(children)
    {
     return ReactHtml.NElement("button",children);
    },
    Checked:function(chk)
    {
     return{
      $:2,
      $0:"checked",
      $1:chk
     };
    },
    Class:function(clas)
    {
     return{
      $:2,
      $0:"className",
      $1:clas
     };
    },
    Disabled:function(dis)
    {
     return{
      $:2,
      $0:"disabled",
      $1:dis
     };
    },
    Div:function(children)
    {
     return ReactHtml.NElement("div",children);
    },
    Draggable:function(drg)
    {
     return{
      $:2,
      $0:"draggable",
      $1:drg
     };
    },
    Form:function(children)
    {
     return ReactHtml.NElement("form",children);
    },
    H1:function(children)
    {
     return ReactHtml.NElement("h1",children);
    },
    H2:function(children)
    {
     return ReactHtml.NElement("h2",children);
    },
    H3:function(children)
    {
     return ReactHtml.NElement("h3",children);
    },
    H4:function(children)
    {
     return ReactHtml.NElement("h4",children);
    },
    H5:function(children)
    {
     return ReactHtml.NElement("h5",children);
    },
    H6:function(children)
    {
     return ReactHtml.NElement("h6",children);
    },
    Hr:function(children)
    {
     return ReactHtml.NElement("hr",children);
    },
    Href:function(href)
    {
     return{
      $:2,
      $0:"href",
      $1:href
     };
    },
    Id:function(id)
    {
     return{
      $:2,
      $0:"id",
      $1:id
     };
    },
    Img:function(children)
    {
     return ReactHtml.NElement("img",children);
    },
    Input:function(children)
    {
     return ReactHtml.NElement("input",children);
    },
    Key:function(key)
    {
     return{
      $:2,
      $0:"key",
      $1:key
     };
    },
    Label:function(children)
    {
     return ReactHtml.NElement("label",children);
    },
    Li:function(children)
    {
     return ReactHtml.NElement("li",children);
    },
    MaxLength:function(len)
    {
     return{
      $:2,
      $0:"maxLength",
      $1:len
     };
    },
    Menu:function(children)
    {
     return ReactHtml.NElement("menu",children);
    },
    NElement:function(name,children)
    {
     return{
      $:0,
      $0:name,
      $1:Seq.toArray(children)
     };
    },
    NewAttr:function(name,value)
    {
     return{
      $:2,
      $0:name,
      $1:value
     };
    },
    NewTag:function(tag,children)
    {
     return ReactHtml.NElement(tag,children);
    },
    OnAfterRender:function(f)
    {
     return ReactHtml.Ref(function(e)
     {
      return!(!e)?f(e):null;
     });
    },
    OnChange:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onChange",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OnClick:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onClick",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OnDragOver:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onDragOver",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OnDragStart:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onDragStart",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OnDrop:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onDrop",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OnKeyDown:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onKeyDown",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OnMouseDown:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onMouseDown",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OnMouseEnter:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onMouseEnter",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OnMouseLeave:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onMouseLeave",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OnMouseMove:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onMouseMove",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OnMouseOut:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onMouseOut",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OnMouseOver:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onMouseOver",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OnMouseUp:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onMouseUp",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OnSubmit:function(f)
    {
     var x;
     x={
      $:2,
      $0:"onSubmit",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    OptionA:function(children)
    {
     return ReactHtml.NElement("option",children);
    },
    P:function(children)
    {
     return ReactHtml.NElement("p",children);
    },
    Placeholder:function(txt)
    {
     return{
      $:2,
      $0:"placeholder",
      $1:txt
     };
    },
    Ref:function(f)
    {
     var x;
     x={
      $:2,
      $0:"ref",
      $1:f
     };
     return(ReactHtml.addAttribute())(x);
    },
    Role:function(role)
    {
     return{
      $:2,
      $0:"role",
      $1:role
     };
    },
    Select:function(children)
    {
     return ReactHtml.NElement("select",children);
    },
    Span:function(children)
    {
     return ReactHtml.NElement("span",children);
    },
    Src:function(src)
    {
     return{
      $:2,
      $0:"src",
      $1:src
     };
    },
    Style:function(style)
    {
     return{
      $:2,
      $0:"style",
      $1:style
     };
    },
    TBody:function(children)
    {
     return ReactHtml.NElement("tbody",children);
    },
    THead:function(children)
    {
     return ReactHtml.NElement("thead",children);
    },
    TabIndex:function(idx)
    {
     return{
      $:2,
      $0:"tabIndex",
      $1:idx
     };
    },
    Table:function(children)
    {
     return ReactHtml.NElement("table",children);
    },
    Td:function(children)
    {
     return ReactHtml.NElement("td",children);
    },
    Th:function(children)
    {
     return ReactHtml.NElement("th",children);
    },
    Tr:function(children)
    {
     return ReactHtml.NElement("tr",children);
    },
    Type:function(typ)
    {
     return{
      $:2,
      $0:"type",
      $1:typ
     };
    },
    Ul:function(children)
    {
     return ReactHtml.NElement("ul",children);
    },
    Value:function(value)
    {
     return{
      $:2,
      $0:"value",
      $1:value
     };
    },
    _Style:function(styles)
    {
     var reduction,style;
     reduction=function(a)
     {
      return function(b)
      {
       return jQuery.extend.apply(jQuery,[jQuery.extend.apply(jQuery,[{},a]),b]);
      };
     };
     style=Seq.reduce(reduction,styles);
     return ReactHtml.Style(style);
    },
    _alignSelf:function(alg)
    {
     return ReactHtml.newAttr("alignSelf",alg);
    },
    _background:function(clr)
    {
     return ReactHtml.newAttr("background",clr);
    },
    _border:function(brd)
    {
     return ReactHtml.newAttr("border",brd);
    },
    _borderStyle:function(sty)
    {
     return ReactHtml.newAttr("borderStyle",sty);
    },
    _borderWidth:function(wid)
    {
     return ReactHtml.newAttr("borderWidth",wid);
    },
    _bottom:function(bot)
    {
     return ReactHtml.newAttr("bottom",bot);
    },
    _color:function(col)
    {
     return ReactHtml.newAttr("color",col);
    },
    _cursor:function(cur)
    {
     return ReactHtml.newAttr("cursor",cur);
    },
    _display:function(dis)
    {
     return ReactHtml.newAttr("display",dis);
    },
    _flex:function(fle)
    {
     return ReactHtml.newAttr("flex",fle);
    },
    _flexBasis:function(bas)
    {
     return ReactHtml.newAttr("flexBasis",bas);
    },
    _flexFlow:function(flo)
    {
     return ReactHtml.newAttr("flexFlow",flo);
    },
    _flexGrow:function(gro)
    {
     return ReactHtml.newAttr("flexGrow",gro);
    },
    _flexShrink:function(gro)
    {
     return ReactHtml.newAttr("flexShrink",gro);
    },
    _fontFamily:function(fml)
    {
     return ReactHtml.newAttr("fontFamily",fml);
    },
    _fontSize:function(siz)
    {
     return ReactHtml.newAttr("fontSize",siz);
    },
    _fontStyle:function(stl)
    {
     return ReactHtml.newAttr("fontStyle",stl);
    },
    _fontWeight:function(wei)
    {
     return ReactHtml.newAttr("fontWeight",wei);
    },
    _height:function(hei)
    {
     return ReactHtml.newAttr("height",hei);
    },
    _left:function(lef)
    {
     return ReactHtml.newAttr("left",lef);
    },
    _margin:function(mar)
    {
     return ReactHtml.newAttr("margin",mar);
    },
    _marginBottom:function(mar)
    {
     return ReactHtml.newAttr("marginBottom",mar);
    },
    _maxHeight:function(hei)
    {
     return ReactHtml.newAttr("maxHeight",hei);
    },
    _maxWidth:function(wid)
    {
     return ReactHtml.newAttr("maxWidth",wid);
    },
    _minHeight:function(hei)
    {
     return ReactHtml.newAttr("minHeight",hei);
    },
    _minWidth:function(wid)
    {
     return ReactHtml.newAttr("minWidth",wid);
    },
    _overflow:function(ove)
    {
     return ReactHtml.newAttr("overflow",ove);
    },
    _padding:function(pad)
    {
     return ReactHtml.newAttr("padding",pad);
    },
    _paddingBottom:function(bot)
    {
     return ReactHtml.newAttr("paddingBottom",bot);
    },
    _paddingLeft:function(lef)
    {
     return ReactHtml.newAttr("paddingLeft",lef);
    },
    _paddingRight:function(rig)
    {
     return ReactHtml.newAttr("paddingRight",rig);
    },
    _paddingTop:function(top)
    {
     return ReactHtml.newAttr("paddingTop",top);
    },
    _position:function(pos)
    {
     return ReactHtml.newAttr("position",pos);
    },
    _right:function(rig)
    {
     return ReactHtml.newAttr("right",rig);
    },
    _textAlign:function(alg)
    {
     return ReactHtml.newAttr("textAlign",alg);
    },
    _textOverflow:function(tov)
    {
     return ReactHtml.newAttr("textOverflow",tov);
    },
    _top:function(top)
    {
     return ReactHtml.newAttr("top",top);
    },
    _whiteSpace:function(wsp)
    {
     return ReactHtml.newAttr("whiteSpace",wsp);
    },
    _width:function(wid)
    {
     return ReactHtml.newAttr("width",wid);
    },
    _zIndex:function(zid)
    {
     return ReactHtml.newAttr("zIndex",zid);
    },
    addAttribute:Runtime.Field(function()
    {
     return function(child)
     {
      return ReactHtml.addChild(child);
     };
    }),
    addAttributes:Runtime.Field(function()
    {
     return function(newChildren)
     {
      return function(node)
      {
       return ReactHtml.addChildren(newChildren,node);
      };
     };
    }),
    addChild:function(child)
    {
     var newChildren;
     newChildren=List.ofArray([child]);
     return function(node)
     {
      return ReactHtml.addChildren(newChildren,node);
     };
    },
    addChildren:function(newChildren,node)
    {
     var _,name,children;
     if(node.$==1)
      {
       node.$0;
       _=ReactHtml.NElement("div",Seq.append(List.ofArray([node]),newChildren));
      }
     else
      {
       if(node.$==2)
        {
         _=ReactHtml.NElement("div",Seq.append(List.ofArray([node]),newChildren));
        }
       else
        {
         if(node.$==3)
          {
           node.$0;
           _=ReactHtml.NElement("div",Seq.append(List.ofArray([node]),newChildren));
          }
         else
          {
           if(node.$==4)
            {
             node.$0;
             _=node;
            }
           else
            {
             if(node.$==5)
              {
               node.$0;
               _=node;
              }
             else
              {
               if(node.$==6)
                {
                 node.$0;
                 _=node;
                }
               else
                {
                 if(node.$==7)
                  {
                   _=ReactHtml.NElement("div",newChildren);
                  }
                 else
                  {
                   name=node.$0;
                   children=node.$1;
                   _=ReactHtml.NElement(name,Seq.append(children,newChildren));
                  }
                }
              }
            }
          }
        }
      }
     return _;
    },
    closeElement:function(tag)
    {
     var x,value;
     x=window.IncrementalDom;
     value=x.openElement.apply(x,[tag]);
     return;
    },
    insertChildren:function(newChildren,node)
    {
     var _,name,children;
     if(node.$==1)
      {
       node.$0;
       _=ReactHtml.NElement("div",Seq.append(newChildren,List.ofArray([node])));
      }
     else
      {
       if(node.$==2)
        {
         _=ReactHtml.NElement("div",Seq.append(newChildren,List.ofArray([node])));
        }
       else
        {
         if(node.$==3)
          {
           node.$0;
           _=ReactHtml.NElement("div",Seq.append(newChildren,List.ofArray([node])));
          }
         else
          {
           if(node.$==4)
            {
             node.$0;
             _=node;
            }
           else
            {
             if(node.$==5)
              {
               node.$0;
               _=node;
              }
             else
              {
               if(node.$==6)
                {
                 node.$0;
                 _=node;
                }
               else
                {
                 if(node.$==7)
                  {
                   _=ReactHtml.NElement("div",newChildren);
                  }
                 else
                  {
                   name=node.$0;
                   children=node.$1;
                   _=ReactHtml.NElement(name,Seq.append(newChildren,children));
                  }
                }
              }
            }
          }
        }
      }
     return _;
    },
    newAttr:function(name,value)
    {
     var a;
     a={};
     a[name]=value;
     return a;
    },
    openElement:function(tag,key,statics,pairs)
    {
     var x;
     x=window.IncrementalDom;
     return x.openElement.apply(x,[tag,key,statics].concat(pairs));
    },
    patchInner:function(container,f)
    {
     var x;
     x=window.IncrementalDom;
     return x.patchInner.apply(x,[container,f]);
    },
    patchOuter:function(container,f)
    {
     var x;
     x=window.IncrementalDom;
     return x.patchOuter.apply(x,[container,f]);
    },
    reactContainerClass:function(className,afterRender)
    {
     return React.createClass({
      displayName:"containerClass",
      componentDidMount:function()
      {
       return(afterRender(this))(ReactDOM.findDOMNode(this));
      },
      shouldComponentUpdate:function()
      {
       return false;
      },
      render:function()
      {
       var node;
       node=ReactHtml.Div(List.ofArray([ReactHtml.Class(className)]));
       return ReactHtml.toReact(node);
      }
     });
    },
    textIDom:function(txt)
    {
     var x,value;
     x=window.IncrementalDom;
     value=x.text.apply(x,[txt]);
     return;
    },
    toIncrementalDom:function(node)
    {
     var attributeR,elementR;
     attributeR=function(_arg1)
     {
      var _,value,name;
      if(_arg1.$==3)
       {
        _=[];
       }
      else
       {
        if(_arg1.$==0)
         {
          _=[];
         }
        else
         {
          if(_arg1.$==1)
           {
            _=[];
           }
          else
           {
            if(_arg1.$==4)
             {
              _=[];
             }
            else
             {
              if(_arg1.$==5)
               {
                _=[];
               }
              else
               {
                if(_arg1.$==6)
                 {
                  _=[];
                 }
                else
                 {
                  if(_arg1.$==7)
                   {
                    _=[];
                   }
                  else
                   {
                    value=_arg1.$1;
                    name=_arg1.$0;
                    _=[name,value];
                   }
                 }
               }
             }
           }
         }
       }
      return _;
     };
     elementR=function(_arg2)
     {
      var _,text,o,tag,children,x,statics;
      if(_arg2.$==1)
       {
        text=_arg2.$0;
        _=ReactHtml.textIDom(text);
       }
      else
       {
        if(_arg2.$==4)
         {
          _arg2.$0;
          _=null;
         }
        else
         {
          if(_arg2.$==5)
           {
            _arg2.$0;
            _=null;
           }
          else
           {
            if(_arg2.$==6)
             {
              o=_arg2.$0;
              _=elementR(o.view());
             }
            else
             {
              if(_arg2.$==7)
               {
                _=null;
               }
              else
               {
                if(_arg2.$==2)
                 {
                  _=null;
                 }
                else
                 {
                  if(_arg2.$==3)
                   {
                    _=null;
                   }
                  else
                   {
                    tag=_arg2.$0;
                    children=_arg2.$1;
                    x=Arrays.collect(attributeR,children);
                    statics=[];
                    ReactHtml.openElement(tag,null,statics,x);
                    Arrays.iter(elementR,children);
                    _=ReactHtml.closeElement(tag);
                   }
                 }
               }
             }
           }
         }
       }
      return _;
     };
     return elementR(node);
    },
    toReact:function(node)
    {
     var attributeR,elementR,_arg11;
     attributeR=function(_arg1)
     {
      var _,attrs,value,name;
      if(_arg1.$==3)
       {
        attrs=_arg1.$0;
        _=attrs;
       }
      else
       {
        if(_arg1.$==0)
         {
          _=[];
         }
        else
         {
          if(_arg1.$==1)
           {
            _=[];
           }
          else
           {
            if(_arg1.$==4)
             {
              _=[];
             }
            else
             {
              if(_arg1.$==5)
               {
                _=[];
               }
              else
               {
                if(_arg1.$==6)
                 {
                  _=[];
                 }
                else
                 {
                  if(_arg1.$==7)
                   {
                    _=[];
                   }
                  else
                   {
                    value=_arg1.$1;
                    name=_arg1.$0;
                    _=[ReactHtml.newAttr(name,value)];
                   }
                 }
               }
             }
           }
         }
       }
      return _;
     };
     elementR=function(_arg2)
     {
      var _,text,r,o,arg0,o1,tag,children,subNodes,attributes,arg01;
      if(_arg2.$==1)
       {
        text=_arg2.$0;
        _={
         $:1,
         $0:text
        };
       }
      else
       {
        if(_arg2.$==4)
         {
          r=_arg2.$0;
          _={
           $:1,
           $0:r
          };
         }
        else
         {
          if(_arg2.$==5)
           {
            o=_arg2.$0;
            arg0=React.createElement.apply(null,[o]);
            _={
             $:1,
             $0:arg0
            };
           }
          else
           {
            if(_arg2.$==6)
             {
              o1=_arg2.$0;
              _=elementR(o1.view());
             }
            else
             {
              if(_arg2.$==7)
               {
                _={
                 $:1,
                 $0:null
                };
               }
              else
               {
                if(_arg2.$==2)
                 {
                  _={
                   $:0
                  };
                 }
                else
                 {
                  if(_arg2.$==3)
                   {
                    _={
                     $:0
                    };
                   }
                  else
                   {
                    tag=_arg2.$0;
                    children=_arg2.$1;
                    subNodes=Arrays.choose(elementR,children);
                    attributes=Arrays.collect(attributeR,children);
                    arg01=R.E00(tag,attributes,subNodes);
                    _={
                     $:1,
                     $0:arg01
                    };
                   }
                 }
               }
             }
           }
         }
       }
      return _;
     };
     _arg11=elementR(node);
     return Option.defaultV(null,_arg11);
    }
   },
   Server:{
    call:Runtime.Field(function()
    {
     return callServerBuilder.New(function(R1)
     {
      return Rop1.notifyMessages(R1);
     });
    }),
    callR:function(handleErrors)
    {
     return callServerBuilder.New(handleErrors);
    },
    callServerBuilder:Runtime.Class({
     Bind:function(wrapped,restOfCExpr)
     {
      return Server.callServerDo(wrapped,restOfCExpr,this.handleErrors);
     },
     Bind1:function(wrapped,restOfCExpr)
     {
      return this.handleErrors.call(null,(Rop1.liftTry(restOfCExpr))(wrapped));
     },
     Combine:function(a,b)
     {
      var matchValue,_,_1,m1,m2,m11,m21,_2,m12,m22,m13,m23,v2;
      matchValue=[a,b];
      if(matchValue[0].$==1)
       {
        if(matchValue[1].$==1)
         {
          m1=matchValue[0].$0;
          m2=matchValue[1].$0;
          _1={
           $:1,
           $0:List.append(m1,m2)
          };
         }
        else
         {
          m11=matchValue[0].$0;
          m21=matchValue[1].$1;
          matchValue[1].$0;
          _1={
           $:1,
           $0:List.append(m11,m21)
          };
         }
        _=_1;
       }
      else
       {
        if(matchValue[1].$==1)
         {
          m12=matchValue[0].$1;
          m22=matchValue[1].$0;
          matchValue[0].$0;
          _2={
           $:1,
           $0:List.append(m12,m22)
          };
         }
        else
         {
          m13=matchValue[0].$1;
          m23=matchValue[1].$1;
          matchValue[0].$0;
          v2=matchValue[1].$0;
          _2={
           $:0,
           $0:v2,
           $1:List.append(m13,m23)
          };
         }
        _=_2;
       }
      return _;
     },
     Delay:function(f)
     {
      return f(null);
     },
     Return:function(x)
     {
      return Rop1.succeed(x);
     },
     Zero:function()
     {
      return null;
     }
    },{
     New:function(handleErrors)
     {
      var r;
      r=Runtime.New(this,{});
      r.handleErrors=handleErrors;
      return r;
     }
    }),
    callServerDo:function(wrapped,restOfCExpr,handleErrors)
    {
     var asy;
     asy=Concurrency.Delay(function()
     {
      return Concurrency.Bind(wrapped,function(_arg1)
      {
       var _builder_;
       _builder_=Rop1.flow();
       handleErrors(_builder_.Delay(function()
       {
        return _builder_.Bind(Rop1.tryProtection(),function()
        {
         return _builder_.Bind(_arg1,function(_arg3)
         {
          restOfCExpr(_arg3);
          return _builder_.Zero();
         });
        });
       }));
       return Concurrency.Return(null);
      });
     });
     return Concurrency.StartWithContinuations(asy,function()
     {
      return null;
     },function(exc)
     {
      var R1;
      R1=Rop1.failException(exc);
      return Rop1.notifyMessages(R1);
     },function(can)
     {
      var R1;
      R1=Rop1.failException(can);
      return Rop1.notifyMessages(R1);
     },{
      $:0
     });
    }
   },
   SetNode:{
    app:Runtime.Field(function()
    {
     return App1.New(SetNode.init(),function(props)
     {
      return function(msg)
      {
       return function(model)
       {
        return SetNode.update(props,msg,model);
       };
      };
     },function(props)
     {
      return function(model)
      {
       return function(processMessages)
       {
        return SetNode.view(props,model,processMessages);
       };
      };
     });
    }),
    init:Runtime.Field(function()
    {
     return App.DummyNew();
    }),
    run:function(rnode,node)
    {
     var arg00;
     arg00={
      node:rnode,
      attributes:[]
     };
     return SetNode.app().run(arg00,node);
    },
    update:function(props,msg,model)
    {
     return model;
    },
    view:function(props)
    {
     return props.node;
    }
   },
   UploadForm:{
    fetchEntries_:function(token,sortBy)
    {
     var _builder_;
     _builder_=ARop.wrap();
     return _builder_.Delay(function()
     {
      return _builder_.Bind1(AjaxRemotingProvider.Async("CIPHERPrototype3:0",[token]),function(_arg1)
      {
       var folders,files,childrenFolders,childrenFiles,getChildren;
       folders=_arg1[0];
       files=_arg1[1];
       childrenFolders=function(parent)
       {
        var predicate,projection,source;
        predicate=function(folder)
        {
         return Unchecked.Equals(folder.parentCode,parent);
        };
        projection=function(folder)
        {
         return folder.name.toLowerCase();
        };
        source=Seq.filter(predicate,folders);
        return Seq.sortBy(projection,source);
       };
       childrenFiles=function(parent)
       {
        var predicate,x,projection;
        predicate=function(file)
        {
         return Unchecked.Equals(file.parentCode,parent);
        };
        x=Seq.filter(predicate,files);
        projection=function(file)
        {
         var mapping;
         mapping=function(by)
         {
          return by.$==1?file.modified:by.$==2?file.tags.toLowerCase():by.$==3?file.contentType.toLowerCase():by.$==4?file.size:file.name.toLowerCase();
         };
         return List.map(mapping,sortBy);
        };
        return Seq.sortBy(projection,x);
       };
       getChildren=function(folderId)
       {
        var mapping,source,mapping1,source1;
        mapping=function(fd)
        {
         var arg0;
         arg0=fd.id;
         return Runtime.New(Entry,{
          $:0,
          $0:fd,
          $1:getChildren({
           $:1,
           $0:arg0
          })
         });
        };
        source=childrenFolders(folderId);
        mapping1=function(arg0)
        {
         return Runtime.New(Entry,{
          $:1,
          $0:arg0
         });
        };
        source1=childrenFiles(folderId);
        return Seq.append(Seq.map(mapping,source),Seq.map(mapping1,source1));
       };
       return _builder_.Return(getChildren({
        $:0
       }));
      });
     });
    },
    flatEntries:function(model)
    {
     return UploadForm.flattenEntries(model.entries);
    },
    flattenEntries:function(entries)
    {
     var mapping;
     mapping=function(entry)
     {
      return UploadForm.flattenEntries(entry.get_children());
     };
     return Seq.append(entries,Seq.collect(mapping,entries));
    },
    getFileName_:function()
    {
     var _builder_,_arg1;
     _builder_=Rop1.flow();
     _arg1=_builder_.Delay(function()
     {
      return _builder_.Bind(UploadForm.getUploadFileRO_(),function(_arg11)
      {
       var mapping,_arg12;
       mapping=function(f)
       {
        return f.name;
       };
       _arg12=Option1.map(mapping,_arg11);
       return _builder_.Return(Option.defaultV("",_arg12));
      });
     });
     return Rop1.ifError("",_arg1);
    },
    getFileTime_:function()
    {
     var _builder_,_arg1;
     _builder_=Rop1.flow();
     _arg1=_builder_.Delay(function()
     {
      return _builder_.Bind(UploadForm.getUploadFileRO_(),function(_arg11)
      {
       var mapping,_arg12;
       mapping=function(f)
       {
        return f.lastModifiedDate.toUTCString();
       };
       _arg12=Option1.map(mapping,_arg11);
       return _builder_.Return(Option.defaultV("",_arg12));
      });
     });
     return Rop1.ifError("",_arg1);
    },
    getFolders:function(model)
    {
     var chooser,source;
     chooser=function(_arg1)
     {
      var _,fd;
      if(_arg1.$==0)
       {
        fd=_arg1.$0;
        _={
         $:1,
         $0:fd
        };
       }
      else
       {
        _={
         $:0
        };
       }
      return _;
     };
     source=model.entries;
     return Seq.choose(chooser,source);
    },
    getUploadFileRO_:function()
    {
     var _builder_;
     _builder_=Rop1.flow();
     return _builder_.Delay(function()
     {
      return _builder_.Bind(Rop1.tryProtection(),function()
      {
       var files;
       files=document.getElementById("filesel").files;
       return _builder_.Return(Arrays.tryPick(function(arg0)
       {
        return{
         $:1,
         $0:arg0
        };
       },files));
      });
     });
    },
    init:function(themeTags,client,entries)
    {
     return{
      entries:entries,
      form:GenForm.init(),
      popup:Popup.init(),
      dialog:Dialog.init(),
      fileTree:FileTree.init(),
      uploadName:"",
      uploadFolder:{
       $:0
      },
      themeTags:themeTags,
      showDialog:{
       $:6
      },
      client:client,
      lastUpload:{
       $:0
      },
      timerHandler:{
       $:0
      }
     };
    },
    renders:Runtime.Field(function()
    {
     return 0;
    }),
    showForm_:function(title,themeTags,client)
    {
     var loader,f;
     loader={};
     f=function(container)
     {
      var _builder_,wb;
      _builder_=ARop.wrap();
      wb=_builder_.Delay(function()
      {
       return _builder_.Bind1(AjaxRemotingProvider.Async("CIPHERPrototype3:12",[]),function(_arg1)
       {
        return _builder_.Bind(UploadForm.fetchEntries_(_arg1,FileTree.init().sortBy),function(_arg2)
        {
         var initV1,app,arg00,arg10;
         initV1=UploadForm.init(themeTags,client,_arg2);
         app=App1.New(initV1,function(props)
         {
          return function(message)
          {
           return function(model)
           {
            return UploadForm.update(props,message,model);
           };
          };
         },function(props)
         {
          return function(model)
          {
           return function(processMessages)
           {
            return UploadForm.view(props,model,processMessages);
           };
          };
         });
         arg00={
          title:title,
          token:_arg1
         };
         arg10=container.Dom;
         app.run(arg00,arg10);
         return _builder_.Zero();
        });
       });
      });
      return ARop.call(wb);
     };
     return App.withContainerDo("container",f);
    },
    update:function(props,message,model)
    {
     var _,clo1,_10,name,folderId,upload,lastUpload,handler,tags,entries,show,msg,model1,form,msg1,model2,popup,msg2,model3,dialog,msg3,model4,fileTree,f;
     if(model.form.debug)
      {
       clo1=function(_1)
       {
        var s,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e;
        _2=function(_f)
        {
         return _f.$==11?"DoAction "+PrintfHelpers.prettyPrint(_f.$0):_f.$==10?"ToFileTreeMsg "+_e(_f.$0):_f.$==9?"ToDialogMsg "+_d(_f.$0):_f.$==8?"ToPopupMsg "+_c(_f.$0):_f.$==7?"ToFormMsg "+_b(_f.$0):_f.$==6?"ShowDialog "+_7(_f.$0):_f.$==5?"SetTimerHandler "+_6(_f.$0):_f.$==4?"SetEntries "+PrintfHelpers.prettyPrint(_f.$0):_f.$==3?"SetLastUpload "+_4(_f.$0):_f.$==2?"SetUploadFolder "+_3(_f.$0):_f.$==1?"SetUploadName "+PrintfHelpers.prettyPrint(_f.$0):"SetThemeTags "+PrintfHelpers.prettyPrint(_f.$0);
        };
        _3=function(_f)
        {
         return _f.$==1?"Some "+PrintfHelpers.prettyPrint(_f.$0):"None";
        };
        _4=function(_f)
        {
         return"Upload ("+PrintfHelpers.prettyPrint(_f.$0)+", "+_3(_f.$1)+", "+PrintfHelpers.prettyPrint(_f.$2)+", "+_5(_f.$3)+", "+PrintfHelpers.prettyPrint(_f.$4)+")";
        };
        _5=function(_f)
        {
         return"Client "+PrintfHelpers.prettyPrint(_f.$0);
        };
        _6=function(_f)
        {
         return _f.$==1?"Some "+PrintfHelpers.prettyPrint(_f.$0):"None";
        };
        _7=function(_f)
        {
         return _f.$==6?"NoDialog":_f.$==5?"ConfirmDelete "+_8(_f.$0):_f.$==4?"RenameFolder "+_8(_f.$0):_f.$==3?"RenameFile "+_8(_f.$0):_f.$==2?"Move "+_8(_f.$0):_f.$==1?"CreateFolder":"UploadFile";
        };
        _8=function(_f)
        {
         return _f.$==1?"EFile "+_a(_f.$0):"EFolder ("+_9(_f.$0)+", "+PrintfHelpers.prettyPrint(_f.$1)+")";
        };
        _9=function(_f)
        {
         return"{"+("id = "+PrintfHelpers.prettyPrint(_f.id))+"; "+("name = "+PrintfHelpers.prettyPrint(_f.name))+"; "+("parentCode = "+_3(_f.parentCode))+"}";
        };
        _a=function(_f)
        {
         return"{"+("id = "+PrintfHelpers.prettyPrint(_f.id))+"; "+("name = "+PrintfHelpers.prettyPrint(_f.name))+"; "+("folderName = "+PrintfHelpers.prettyPrint(_f.folderName))+"; "+("parentCode = "+_3(_f.parentCode))+"; "+("contentType = "+PrintfHelpers.prettyPrint(_f.contentType))+"; "+("size = "+PrintfHelpers.prettyPrint(_f.size))+"; "+("tags = "+PrintfHelpers.prettyPrint(_f.tags))+"; "+("modified = "+PrintfHelpers.prettyPrint(_f.modified))+"}";
        };
        _b=function(_f)
        {
         return _f.$==3?"SetDebug "+PrintfHelpers.prettyPrint(_f.$0):_f.$==2?"SetModified "+PrintfHelpers.prettyPrint(_f.$0):_f.$==1?"AddValidation ("+PrintfHelpers.prettyPrint(_f.$0)+", "+PrintfHelpers.prettyPrint(_f.$1)+")":"ShowInfo ("+PrintfHelpers.prettyPrint(_f.$0)+", "+PrintfHelpers.prettyPrint(_f.$1)+")";
        };
        _c=function(_f)
        {
         return _f.$==2?"HidePopUp":_f.$==1?"AdjustBase ("+PrintfHelpers.prettyPrint(_f.$0)+", "+PrintfHelpers.prettyPrint(_f.$1)+")":"ShowPopUp ("+PrintfHelpers.prettyPrint(_f.$0)+", "+PrintfHelpers.prettyPrint(_f.$1)+")";
        };
        _d=function(_f)
        {
         return"Dummy "+PrintfHelpers.prettyPrint(_f.$0);
        };
        _e=function(_f)
        {
         return _f.$==1?"SetSelected "+_3(_f.$0):"SetExpanded ("+PrintfHelpers.prettyPrint(_f.$0)+", "+PrintfHelpers.prettyPrint(_f.$1)+")";
        };
        s=_2(_1);
        return console?console.log(s):undefined;
       };
       _=clo1(message);
      }
     else
      {
       _=null;
      }
     if(message.$==1)
      {
       name=message.$0;
       _10={
        entries:model.entries,
        form:model.form,
        popup:model.popup,
        dialog:model.dialog,
        fileTree:model.fileTree,
        uploadName:name,
        uploadFolder:model.uploadFolder,
        themeTags:model.themeTags,
        showDialog:model.showDialog,
        client:model.client,
        lastUpload:model.lastUpload,
        timerHandler:model.timerHandler
       };
      }
     else
      {
       if(message.$==2)
        {
         folderId=message.$0;
         _10={
          entries:model.entries,
          form:model.form,
          popup:model.popup,
          dialog:model.dialog,
          fileTree:model.fileTree,
          uploadName:model.uploadName,
          uploadFolder:folderId,
          themeTags:model.themeTags,
          showDialog:model.showDialog,
          client:model.client,
          lastUpload:model.lastUpload,
          timerHandler:model.timerHandler
         };
        }
       else
        {
         if(message.$==3)
          {
           upload=message.$0;
           lastUpload={
            $:1,
            $0:upload
           };
           _10={
            entries:model.entries,
            form:model.form,
            popup:model.popup,
            dialog:model.dialog,
            fileTree:model.fileTree,
            uploadName:model.uploadName,
            uploadFolder:model.uploadFolder,
            themeTags:model.themeTags,
            showDialog:model.showDialog,
            client:model.client,
            lastUpload:lastUpload,
            timerHandler:model.timerHandler
           };
          }
         else
          {
           if(message.$==5)
            {
             handler=message.$0;
             _10={
              entries:model.entries,
              form:model.form,
              popup:model.popup,
              dialog:model.dialog,
              fileTree:model.fileTree,
              uploadName:model.uploadName,
              uploadFolder:model.uploadFolder,
              themeTags:model.themeTags,
              showDialog:model.showDialog,
              client:model.client,
              lastUpload:model.lastUpload,
              timerHandler:handler
             };
            }
           else
            {
             if(message.$==0)
              {
               tags=message.$0;
               _10={
                entries:model.entries,
                form:model.form,
                popup:model.popup,
                dialog:model.dialog,
                fileTree:model.fileTree,
                uploadName:model.uploadName,
                uploadFolder:model.uploadFolder,
                themeTags:tags,
                showDialog:model.showDialog,
                client:model.client,
                lastUpload:model.lastUpload,
                timerHandler:model.timerHandler
               };
              }
             else
              {
               if(message.$==4)
                {
                 entries=message.$0;
                 _10={
                  entries:entries,
                  form:model.form,
                  popup:model.popup,
                  dialog:model.dialog,
                  fileTree:model.fileTree,
                  uploadName:model.uploadName,
                  uploadFolder:model.uploadFolder,
                  themeTags:model.themeTags,
                  showDialog:model.showDialog,
                  client:model.client,
                  lastUpload:model.lastUpload,
                  timerHandler:model.timerHandler
                 };
                }
               else
                {
                 if(message.$==6)
                  {
                   show=message.$0;
                   _10={
                    entries:model.entries,
                    form:model.form,
                    popup:model.popup,
                    dialog:model.dialog,
                    fileTree:model.fileTree,
                    uploadName:model.uploadName,
                    uploadFolder:model.uploadFolder,
                    themeTags:model.themeTags,
                    showDialog:show,
                    client:model.client,
                    lastUpload:model.lastUpload,
                    timerHandler:model.timerHandler
                   };
                  }
                 else
                  {
                   if(message.$==7)
                    {
                     msg=message.$0;
                     model1=model.form;
                     form=GenForm.update_(msg,model1);
                     _10={
                      entries:model.entries,
                      form:form,
                      popup:model.popup,
                      dialog:model.dialog,
                      fileTree:model.fileTree,
                      uploadName:model.uploadName,
                      uploadFolder:model.uploadFolder,
                      themeTags:model.themeTags,
                      showDialog:model.showDialog,
                      client:model.client,
                      lastUpload:model.lastUpload,
                      timerHandler:model.timerHandler
                     };
                    }
                   else
                    {
                     if(message.$==8)
                      {
                       msg1=message.$0;
                       model2=model.popup;
                       popup=Popup.update_(msg1,model2);
                       _10={
                        entries:model.entries,
                        form:model.form,
                        popup:popup,
                        dialog:model.dialog,
                        fileTree:model.fileTree,
                        uploadName:model.uploadName,
                        uploadFolder:model.uploadFolder,
                        themeTags:model.themeTags,
                        showDialog:model.showDialog,
                        client:model.client,
                        lastUpload:model.lastUpload,
                        timerHandler:model.timerHandler
                       };
                      }
                     else
                      {
                       if(message.$==9)
                        {
                         msg2=message.$0;
                         model3=model.dialog;
                         dialog=Dialog.update_(msg2,model3);
                         _10={
                          entries:model.entries,
                          form:model.form,
                          popup:model.popup,
                          dialog:dialog,
                          fileTree:model.fileTree,
                          uploadName:model.uploadName,
                          uploadFolder:model.uploadFolder,
                          themeTags:model.themeTags,
                          showDialog:model.showDialog,
                          client:model.client,
                          lastUpload:model.lastUpload,
                          timerHandler:model.timerHandler
                         };
                        }
                       else
                        {
                         if(message.$==10)
                          {
                           msg3=message.$0;
                           model4=model.fileTree;
                           fileTree=FileTree.update_(msg3,model4);
                           _10={
                            entries:model.entries,
                            form:model.form,
                            popup:model.popup,
                            dialog:model.dialog,
                            fileTree:fileTree,
                            uploadName:model.uploadName,
                            uploadFolder:model.uploadFolder,
                            themeTags:model.themeTags,
                            showDialog:model.showDialog,
                            client:model.client,
                            lastUpload:model.lastUpload,
                            timerHandler:model.timerHandler
                           };
                          }
                         else
                          {
                           f=message.$0;
                           _10=f(model);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
     return _10;
    },
    view:function(props,model,processMessages)
    {
     var _,showProcessing,showCompleted,formView,popupView,dialogView,fileTreeView,reloadFiles_,callServerReloadFiles,deleteFile_,renameFile_,moveTo_,renameFolder_,createFolder_,doUpload_,uploadFile_,startReUploadTimer,checkForReUpload,path_,getFolder,getFolderPath,getEntryPath,contentMyDialog_,setTargetFolder,setParentFolder,menuItems,patternInput,dlgTitle,dlgContent,dlgButtons,showMenu,matchValue1,reUpload,_4,_5,upload1,x4,value1,_6,_7,_8,x5;
     _=UploadForm.renders()+1;
     UploadForm.renders=function()
     {
      return _;
     };
     showProcessing=function(txt)
     {
      var tupledArg,arg0,arg1,arg01;
      tupledArg=[txt,true];
      arg0=tupledArg[0];
      arg1=tupledArg[1];
      arg01={
       $:0,
       $0:arg0,
       $1:arg1
      };
      return processMessages({
       $:7,
       $0:arg01
      });
     };
     showCompleted=function(txt)
     {
      var tupledArg,arg0,arg1,arg01;
      tupledArg=[txt,false];
      arg0=tupledArg[0];
      arg1=tupledArg[1];
      arg01={
       $:0,
       $0:arg0,
       $1:arg1
      };
      return processMessages({
       $:7,
       $0:arg01
      });
     };
     formView=function(props1)
     {
      return GenForm.view(props1,model.form,function(x)
      {
       return processMessages({
        $:7,
        $0:x
       });
      });
     };
     popupView=function(props1)
     {
      return Popup.view(props1,model.popup,function(x)
      {
       return processMessages({
        $:8,
        $0:x
       });
      });
     };
     dialogView=function(props1)
     {
      return Dialog.view(props1,model.dialog,function(x)
      {
       return processMessages({
        $:9,
        $0:x
       });
      });
     };
     fileTreeView=function(props1)
     {
      return FileTree.view(props1,model.fileTree,function(x)
      {
       return processMessages({
        $:10,
        $0:x
       });
      });
     };
     reloadFiles_=function(message)
     {
      var _builder_,wb;
      _builder_=ARop.wrap();
      wb=_builder_.Delay(function()
      {
       return _builder_.Bind(UploadForm.fetchEntries_(props.token,model.fileTree.sortBy),function(_arg1)
       {
        processMessages({
         $:4,
         $0:_arg1
        });
        showCompleted(message);
        return _builder_.Zero();
       });
      });
      return ARop.call(wb);
     };
     callServerReloadFiles=function(call)
     {
      var _builder_,wb;
      _builder_=ARop.wrap();
      wb=_builder_.Delay(function()
      {
       return _builder_.Bind1(call,function(_arg2)
       {
        reloadFiles_(_arg2);
        return _builder_.Zero();
       });
      });
      return ARop.call(wb);
     };
     deleteFile_=function(entry)
     {
      return function()
      {
       return callServerReloadFiles(AjaxRemotingProvider.Async("CIPHERPrototype3:1",[props.token,entry.get_id(),entry.get_isFolder()]));
      };
     };
     renameFile_=function(fileId)
     {
      return function(newName)
      {
       return function(tags)
       {
        return function()
        {
         return callServerReloadFiles(AjaxRemotingProvider.Async("CIPHERPrototype3:3",[props.token,fileId,newName,tags]));
        };
       };
      };
     };
     moveTo_=function(entry)
     {
      return function(newId)
      {
       return function()
       {
        return callServerReloadFiles(AjaxRemotingProvider.Async("CIPHERPrototype3:2",[props.token,entry.get_id(),entry.get_isFolder(),newId]));
       };
      };
     };
     renameFolder_=function(folderId)
     {
      return function(newName)
      {
       return function()
       {
        return callServerReloadFiles(AjaxRemotingProvider.Async("CIPHERPrototype3:4",[props.token,folderId,newName]));
       };
      };
     };
     createFolder_=function(name)
     {
      return function(folderId)
      {
       return function()
       {
        return callServerReloadFiles(AjaxRemotingProvider.Async("CIPHERPrototype3:5",[props.token,name,folderId]));
       };
      };
     };
     doUpload_=function(file)
     {
      return function(_arg3)
      {
       var uploadName,uploadFolder,themeTags,client,_builder_,wb;
       uploadName=_arg3.$0;
       uploadFolder=_arg3.$1;
       themeTags=_arg3.$2;
       client=_arg3.$3;
       _builder_=ARop.wrap();
       wb=_builder_.Delay(function()
       {
        return _builder_.Bind2(Rop1.tryProtection(),function()
        {
         var rdr;
         showProcessing("Uploading file "+PrintfHelpers.toSafe(file.name)+" ...");
         rdr=new FileReader();
         rdr.onloadend=function()
         {
          return callServerReloadFiles(AjaxRemotingProvider.Async("CIPHERPrototype3:6",[props.token,uploadName,uploadFolder,rdr.result,file.type,file.size,themeTags,client]));
         };
         rdr.readAsDataURL(file);
         return _builder_.Zero();
        });
       });
       return ARop.call(wb);
      };
     };
     uploadFile_=function(upload)
     {
      return function()
      {
       var _builder_,wb;
       _builder_=ARop.wrap();
       wb=_builder_.Delay(function()
       {
        return _builder_.Bind2(UploadForm.getUploadFileRO_(),function(_arg5)
        {
         var action;
         action=function(file)
         {
          var arg0;
          arg0=function(model1)
          {
           var option,arg01,message;
           option=model1.timerHandler;
           Option1.iter(function(handle)
           {
            return clearInterval(handle);
           },option);
           arg01={
            $:0
           };
           message={
            $:5,
            $0:arg01
           };
           return UploadForm.update(props,message,model1);
          };
          processMessages({
           $:11,
           $0:arg0
          });
          processMessages({
           $:3,
           $0:upload
          });
          (doUpload_(file))(upload);
          return startReUploadTimer(upload);
         };
         Option1.iter(action,_arg5);
         return _builder_.Zero();
        });
       });
       return ARop.call(wb);
      };
     };
     startReUploadTimer=function(upload)
     {
      var arg0,arg01;
      arg0=setInterval(checkForReUpload(upload),2000);
      arg01={
       $:1,
       $0:arg0
      };
      return processMessages({
       $:5,
       $0:arg01
      });
     };
     checkForReUpload=function(upload)
     {
      return function()
      {
       var uploadName,uploadFolder,themeTags,modified,client,newModified;
       uploadName=upload.$0;
       uploadFolder=upload.$1;
       themeTags=upload.$2;
       modified=upload.$4;
       client=upload.$3;
       newModified=UploadForm.getFileTime_();
       return(uploadName===UploadForm.getFileName_()?modified!==newModified:false)?(uploadFile_({
        $:0,
        $0:uploadName,
        $1:uploadFolder,
        $2:themeTags,
        $3:client,
        $4:newModified
       }))(null):null;
      };
     };
     path_=function(folder)
     {
      var matchValue,p,_1,parent,predicate,source,option,_arg1;
      matchValue=folder.parentCode;
      if(matchValue.$==1)
       {
        parent=matchValue.$0;
        predicate=function(fd)
        {
         return Unchecked.Equals(fd.id,parent);
        };
        source=UploadForm.getFolders(model);
        option=Seq.tryFind(predicate,source);
        _arg1=Option1.map(path_,option);
        _1=Option.defaultV("",_arg1);
       }
      else
       {
        _1="";
       }
      p=_1;
      return p+"/"+folder.name;
     };
     getFolder=function(id)
     {
      var predicate,source;
      predicate=function(fd)
      {
       return Unchecked.Equals(fd.id,id);
      };
      source=UploadForm.getFolders(model);
      return Seq.tryFind(predicate,source);
     };
     getFolderPath=function(idO)
     {
      var option,_arg1;
      option=Option1.bind(getFolder,idO);
      _arg1=Option1.map(path_,option);
      return Option.defaultV("",_arg1);
     };
     getEntryPath=function(entry)
     {
      var _1,_2;
      _1=getFolderPath(entry.get_parentId());
      _2=entry.get_name();
      return PrintfHelpers.toSafe(_1)+"/"+PrintfHelpers.toSafe(_2);
     };
     contentMyDialog_=function(processMessages1)
     {
      var validations,processValidations,folders_,mapping1,option,uploadFolder,setUploadFolder,matchValue,_1,entry,entry1,entry2,entry3,_2,_3,arg01,x3,t;
      validations=model.form.validations;
      processValidations=function(x)
      {
       return processMessages1({
        $:7,
        $0:x
       });
      };
      folders_=function()
      {
       var mapping,source,x,source1,x1,projection,x2;
       mapping=function(fd)
       {
        return[String(fd.id),path_(fd)];
       };
       source=UploadForm.getFolders(model);
       x=Seq.map(mapping,source);
       source1=[["","/"]];
       x1=Seq.append(source1,x);
       projection=function(tuple)
       {
        return tuple[1];
       };
       x2=Seq.sortBy(projection,x1);
       return Seq.toArray(x2);
      };
      mapping1=function(id)
      {
       return String(id);
      };
      option=model.uploadFolder;
      uploadFolder=Option1.map(mapping1,option);
      setUploadFolder=function(v)
      {
       var arg0;
       arg0=v===""?{
        $:0
       }:{
        $:1,
        $0:v
       };
       return{
        $:2,
        $0:arg0
       };
      };
      matchValue=model.showDialog;
      if(matchValue.$==2)
       {
        entry=matchValue.$0;
        _1=["Move to",List.ofArray([["Ok","btn",(moveTo_(entry))(model.uploadFolder)],["Cancel","btn",function(x)
        {
         return x;
        }]]),List.ofArray([Fields.selectWoValidator("Folder",uploadFolder,function(x)
        {
         return processMessages1(setUploadFolder(x));
        },folders_(null),Runtime.New(T,{
         $:0
        }))])];
       }
      else
       {
        if(matchValue.$==3)
         {
          entry1=matchValue.$0;
          _1=["Rename File",List.ofArray([["Ok","btn",((renameFile_(entry1.get_id()))(model.uploadName))(model.themeTags)],["Cancel","btn",function(x)
          {
           return x;
          }]]),List.ofArray([Fields.textNotEmpty("File Name",model.uploadName,function(x)
          {
           return processMessages1({
            $:1,
            $0:x
           });
          },List.ofArray([ReactHtml.Placeholder("enter file name"),ReactHtml.MaxLength(100)]),validations,processValidations),Fields.textWoValidator("Theme tags",model.themeTags,function(x)
          {
           return processMessages1({
            $:0,
            $0:x
           });
          },List.ofArray([ReactHtml.Placeholder("enter tags"),ReactHtml.MaxLength(200)]))])];
         }
        else
         {
          if(matchValue.$==4)
           {
            entry2=matchValue.$0;
            _1=["Rename Folder",List.ofArray([["Ok","btn",(renameFolder_(entry2.get_id()))(model.uploadName)],["Cancel","btn",function(x)
            {
             return x;
            }]]),List.ofArray([Fields.textNotEmpty("File Name",model.uploadName,function(x)
            {
             return processMessages1({
              $:1,
              $0:x
             });
            },List.ofArray([ReactHtml.Placeholder("enter file name"),ReactHtml.MaxLength(100)]),validations,processValidations)])];
           }
          else
           {
            if(matchValue.$==1)
             {
              _1=["Create Folder",List.ofArray([["Ok","btn",(createFolder_(model.uploadName))(model.uploadFolder)],["Cancel","btn",function(x)
              {
               return x;
              }]]),List.ofArray([Fields.selectWoValidator("Parent Folder",uploadFolder,function(x)
              {
               return processMessages1(setUploadFolder(x));
              },folders_(null),Runtime.New(T,{
               $:0
              })),Fields.textNotEmpty("Folder Name",model.uploadName,function(x)
              {
               return processMessages1({
                $:1,
                $0:x
               });
              },List.ofArray([ReactHtml.Placeholder("enter folder name"),ReactHtml.MaxLength(100)]),validations,processValidations)])];
             }
            else
             {
              if(matchValue.$==5)
               {
                entry3=matchValue.$0;
                _2=entry3.get_isFolder()?"folder":"file";
                _3=entry3.get_name();
                arg01="Delete "+PrintfHelpers.toSafe(_2)+" "+PrintfHelpers.toSafe(_3)+"?";
                _1=["Confirm Delete ",List.ofArray([["DELETE","btn",deleteFile_(entry3)],["Cancel","btn",function(x)
                {
                 return x;
                }]]),List.ofArray([{
                 $:1,
                 $0:arg01
                }])];
               }
              else
               {
                if(matchValue.$==6)
                 {
                  _1=["",Runtime.New(T,{
                   $:0
                  }),Runtime.New(T,{
                   $:0
                  })];
                 }
                else
                 {
                  t=UploadForm.getFileName_();
                  x3=ReactHtml.Button(List.ofArray([{
                   $:1,
                   $0:t===""?"...":t
                  }]));
                  _1=["Upload File",List.ofArray([["Upload","btn",uploadFile_({
                   $:0,
                   $0:model.uploadName,
                   $1:model.uploadFolder,
                   $2:model.themeTags,
                   $3:model.client,
                   $4:UploadForm.getFileTime_()
                  })],["Cancel","btn",function(x)
                  {
                   return x;
                  }]]),List.ofArray([ReactHtml.Label(List.ofArray([{
                   $:1,
                   $0:"Select File:"
                  },ReactHtml._Style(List.ofArray([ReactHtml._paddingRight("1ch"),ReactHtml._paddingBottom("1em")]))])),(ReactHtml.OnClick(function()
                  {
                   return jQuery("#filesel").click();
                  }))(x3),Fields.textNotEmpty("File Name",model.uploadName,function(x)
                  {
                   return processMessages1({
                    $:1,
                    $0:x
                   });
                  },List.ofArray([ReactHtml.Placeholder("enter file name"),ReactHtml.MaxLength(100)]),validations,processValidations),Fields.selectWoValidator("Folder",uploadFolder,function(x)
                  {
                   return processMessages1(setUploadFolder(x));
                  },folders_(null),Runtime.New(T,{
                   $:0
                  })),Fields.textWoValidator("Theme tags",model.themeTags,function(x)
                  {
                   return processMessages1({
                    $:0,
                    $0:x
                   });
                  },List.ofArray([ReactHtml.Placeholder("enter tags"),ReactHtml.MaxLength(200)]))])];
                 }
               }
             }
           }
         }
       }
      return _1;
     };
     setTargetFolder=function(entry)
     {
      var arg0;
      arg0=entry.get_isFolder()?{
       $:1,
       $0:entry.get_id()
      }:entry.get_parentId();
      return processMessages({
       $:2,
       $0:arg0
      });
     };
     setParentFolder=function(entry)
     {
      var arg0;
      arg0=entry.get_parentId();
      return processMessages({
       $:2,
       $0:arg0
      });
     };
     menuItems=function(model1)
     {
      var c,withSelectedentry;
      c=model1.client;
      withSelectedentry=function(f)
      {
       var action,option;
       action=function(sel)
       {
        var predicate,source,source1;
        predicate=function(e)
        {
         return Unchecked.Equals(e.get_id(),sel);
        };
        source=UploadForm.flatEntries(model1);
        source1=Seq.filter(predicate,source);
        return Seq.iter(f,source1);
       };
       option=model1.fileTree.selected;
       return Option1.iter(action,option);
      };
      return List.ofArray([["Upload file",function()
      {
       return withSelectedentry(function(entry)
       {
        var arg0,arg01;
        setTargetFolder(entry);
        arg0=UploadForm.getFileName_();
        processMessages({
         $:1,
         $0:arg0
        });
        arg01={
         $:0
        };
        return processMessages({
         $:6,
         $0:arg01
        });
       });
      }],["Open ",function()
      {
       return withSelectedentry(function(entry)
       {
        var _1,value;
        if(!entry.get_isFolder())
         {
          value=window.open("/EPFile"+PrintfHelpers.toSafe(getEntryPath(entry)),"blank");
          _1=void value;
         }
        else
         {
          _1=null;
         }
        return _1;
       });
      }],["New folder",function()
      {
       return withSelectedentry(function(entry)
       {
        var arg0;
        setTargetFolder(entry);
        arg0={
         $:1
        };
        return processMessages({
         $:6,
         $0:arg0
        });
       });
      }],["Move",function()
      {
       return withSelectedentry(function(entry)
       {
        var arg0;
        setParentFolder(entry);
        arg0={
         $:2,
         $0:entry
        };
        return processMessages({
         $:6,
         $0:arg0
        });
       });
      }],["Rename",function()
      {
       return withSelectedentry(function(entry)
       {
        var renameObject,_1,arg01,arg02,arg03;
        if(entry.get_isFolder())
         {
          _1=function(arg0)
          {
           return{
            $:4,
            $0:arg0
           };
          };
         }
        else
         {
          arg01=entry.get_theme();
          processMessages({
           $:0,
           $0:arg01
          });
          _1=function(arg0)
          {
           return{
            $:3,
            $0:arg0
           };
          };
         }
        renameObject=_1;
        arg02=entry.get_name();
        processMessages({
         $:1,
         $0:arg02
        });
        arg03=renameObject(entry);
        return processMessages({
         $:6,
         $0:arg03
        });
       });
      }],["-",function()
      {
       return null;
      }],["Delete",function()
      {
       return withSelectedentry(function(entry)
       {
        var arg0;
        arg0={
         $:5,
         $0:entry
        };
        return processMessages({
         $:6,
         $0:arg0
        });
       });
      }]]);
     };
     patternInput=contentMyDialog_(processMessages);
     dlgTitle=patternInput[0];
     dlgContent=patternInput[2];
     dlgButtons=patternInput[1];
     showMenu=function(e)
     {
      var r,arg0;
      r=e.target.getBoundingClientRect.call(e.target,null);
      arg0={
       $:0,
       $0:r.left,
       $1:r.top
      };
      return processMessages({
       $:8,
       $0:arg0
      });
     };
     matchValue1=model.lastUpload;
     if(matchValue1.$==1)
      {
       matchValue1.$0;
       if(UploadForm.getFileName_()!=="")
        {
         upload1=matchValue1.$0;
         _6=function(_1)
         {
          return"Upload ("+PrintfHelpers.prettyPrint(_1.$0)+", "+_7(_1.$1)+", "+PrintfHelpers.prettyPrint(_1.$2)+", "+_8(_1.$3)+", "+PrintfHelpers.prettyPrint(_1.$4)+")";
         };
         _7=function(_1)
         {
          return _1.$==1?"Some "+PrintfHelpers.prettyPrint(_1.$0):"None";
         };
         _8=function(_1)
         {
          return"Client "+PrintfHelpers.prettyPrint(_1.$0);
         };
         value1="Re"+_6(upload1);
         x4=ReactHtml.Input(List.ofArray([ReactHtml.Type("button"),ReactHtml.Value(value1),ReactHtml._Style(List.ofArray([ReactHtml._flex("0 0"),ReactHtml._alignSelf("flex-start")]))]));
         _5=(ReactHtml.OnClick(uploadFile_(upload1)))(x4);
        }
       else
        {
         _5={
          $:7
         };
        }
       _4=_5;
      }
     else
      {
       _4={
        $:7
       };
      }
     reUpload=_4;
     x5=ReactHtml.Input(List.ofArray([ReactHtml.Type("file"),ReactHtml.Id("filesel"),ReactHtml._Style(List.ofArray([ReactHtml._display("none")]))]));
     return formView({
      title:props.title,
      buttons:List.ofArray([["New Folder","btn    btn-default  pull-right",function()
      {
       var arg0;
       arg0={
        $:1
       };
       return processMessages({
        $:6,
        $0:arg0
       });
      }],["Upload File","btn    btn-default  pull-right",function()
      {
       var arg0,arg01;
       arg0=UploadForm.getFileName_();
       processMessages({
        $:1,
        $0:arg0
       });
       arg01={
        $:0
       };
       return processMessages({
        $:6,
        $0:arg01
       });
      }]]),
      content:List.ofArray([{
       $:1,
       $0:"Renders: "+Global.String(UploadForm.renders())
      },dialogView({
       title:dlgTitle,
       buttons:dlgButtons,
       content:dlgContent,
       show:!Unchecked.Equals(model.showDialog,{
        $:6
       }),
       close_:{
        $:1,
        $0:function()
        {
         var arg0;
         arg0={
          $:6
         };
         return processMessages({
          $:6,
          $0:arg0
         });
        }
       }
      }),popupView({
       menuItems:menuItems(model)
      }),(ReactHtml.OnChange(function()
      {
       var arg0;
       arg0=UploadForm.getFileName_();
       return processMessages({
        $:1,
        $0:arg0
       });
      }))(x5),reUpload,fileTreeView({
       entries:model.entries,
       onClick:showMenu
      })])
     });
    }
   }
  },
  Rop:{
   ARop:{
    Builder:Runtime.Class({
     Bind:function(wrapped,restOfCExpr)
     {
      return ARop.bind(restOfCExpr,wrapped);
     },
     Bind1:function(wrapped,restOfCExpr)
     {
      var wa;
      wa={
       $:2,
       $0:wrapped
      };
      return ARop.bind(restOfCExpr,wa);
     },
     Bind2:function(wrapped,restOfCExpr)
     {
      var wa;
      wa={
       $:0,
       $0:wrapped
      };
      return ARop.bind(restOfCExpr,wa);
     },
     Bind3:function(wrapped,restOfCExpr)
     {
      var wa;
      wa={
       $:4,
       $0:wrapped
      };
      return ARop.bind(restOfCExpr,wa);
     },
     Delay:function(f)
     {
      return f(null);
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
     }
    },{
     New:function()
     {
      return Runtime.New(this,{});
     }
    }),
    bind:function(f,wa)
    {
     var _,_1,arg0,a,_2,ms,arg01,_3,a1,a2,ms1,matchValue,_4,b,arg02,_5,m2,arg03,_6,b1,arg04,b2,m21,arg05,ab,arg06,arb,arg07,aa,arg08,ara,arg09,a4;
     if(wa.$==4)
      {
       if(wa.$0.$==0)
        {
         arg0={
          $:0
         };
         _1={
          $:4,
          $0:arg0
         };
        }
       else
        {
         a=wa.$0.$0;
         _1=f(a);
        }
       _=_1;
      }
     else
      {
       if(wa.$==0)
        {
         if(wa.$0.$==1)
          {
           ms=wa.$0.$0;
           arg01={
            $:1,
            $0:ms
           };
           _2={
            $:0,
            $0:arg01
           };
          }
         else
          {
           if(wa.$0.$1.$==0)
            {
             a1=wa.$0.$0;
             _3=f(a1);
            }
           else
            {
             a2=wa.$0.$0;
             ms1=wa.$0.$1;
             matchValue=f(a2);
             if(matchValue.$==3)
              {
               b=matchValue.$0;
               arg02={
                $:0,
                $0:b,
                $1:ms1
               };
               _4={
                $:0,
                $0:arg02
               };
              }
             else
              {
               if(matchValue.$==0)
                {
                 if(matchValue.$0.$==1)
                  {
                   m2=matchValue.$0.$0;
                   arg03={
                    $:1,
                    $0:List.append(ms1,m2)
                   };
                   _5={
                    $:0,
                    $0:arg03
                   };
                  }
                 else
                  {
                   if(matchValue.$0.$1.$==0)
                    {
                     b1=matchValue.$0.$0;
                     arg04={
                      $:0,
                      $0:b1,
                      $1:ms1
                     };
                     _6={
                      $:0,
                      $0:arg04
                     };
                    }
                   else
                    {
                     b2=matchValue.$0.$0;
                     m21=matchValue.$0.$1;
                     arg05={
                      $:0,
                      $0:b2,
                      $1:List.append(ms1,m21)
                     };
                     _6={
                      $:0,
                      $0:arg05
                     };
                    }
                   _5=_6;
                  }
                 _4=_5;
                }
               else
                {
                 if(matchValue.$==1)
                  {
                   ab=matchValue.$0;
                   arg06=Concurrency.Delay(function()
                   {
                    return Concurrency.Bind(ab,function(_arg1)
                    {
                     return Concurrency.Return({
                      $:0,
                      $0:_arg1,
                      $1:ms1
                     });
                    });
                   });
                   _4={
                    $:2,
                    $0:arg06
                   };
                  }
                 else
                  {
                   if(matchValue.$==2)
                    {
                     arb=matchValue.$0;
                     arg07=Concurrency.Delay(function()
                     {
                      return Concurrency.Bind(arb,function(_arg2)
                      {
                       return Concurrency.Return(Rop1.mergeMessages(ms1,_arg2));
                      });
                     });
                     _4={
                      $:2,
                      $0:arg07
                     };
                    }
                   else
                    {
                     _4=Operators1.Raise(MatchFailureException.New("D:\\Abe\\CIPHERWorkspace\\CipherSpace\\CIPHERPrototype3\\Rop.fs",246,43));
                    }
                  }
                }
              }
             _3=_4;
            }
           _2=_3;
          }
         _=_2;
        }
       else
        {
         if(wa.$==1)
          {
           aa=wa.$0;
           arg08=Concurrency.Delay(function()
           {
            return Concurrency.Bind(aa,function(_arg3)
            {
             var x,ms2;
             x=f(_arg3);
             ms2=Runtime.New(T,{
              $:0
             });
             return ARop.wb2arb(ms2,x);
            });
           });
           _={
            $:2,
            $0:arg08
           };
          }
         else
          {
           if(wa.$==2)
            {
             ara=wa.$0;
             arg09=Concurrency.Delay(function()
             {
              return Concurrency.Bind(ara,function(_arg4)
              {
               var arb1,_7,ms2,ms3,a3,_arg1;
               if(_arg4.$==1)
                {
                 ms2=_arg4.$0;
                 _7=Concurrency.Delay(function()
                 {
                  return Concurrency.Return({
                   $:1,
                   $0:ms2
                  });
                 });
                }
               else
                {
                 ms3=_arg4.$1;
                 a3=_arg4.$0;
                 _arg1=f(a3);
                 _7=ARop.wb2arb(ms3,_arg1);
                }
               arb1=_7;
               return arb1;
              });
             });
             _={
              $:2,
              $0:arg09
             };
            }
           else
            {
             a4=wa.$0;
             _=f(a4);
            }
          }
        }
      }
     return _;
    },
    call:function(wb)
    {
     var callback;
     callback=function(R1)
     {
      return Rop1.notifyMessages(R1);
     };
     return ARop.getR(callback,wb);
    },
    getR:function(callback,wb)
    {
     var _,_1,msg,s,rb,ab,arb,s1;
     if(wb.$==4)
      {
       if(wb.$0.$==0)
        {
         msg={
          $:30
         };
         _1=callback(Rop1.fail(msg));
        }
       else
        {
         s=wb.$0.$0;
         _1=callback(Rop1.succeed(s));
        }
       _=_1;
      }
     else
      {
       if(wb.$==0)
        {
         rb=wb.$0;
         _=callback(rb);
        }
       else
        {
         if(wb.$==1)
          {
           ab=wb.$0;
           _=Concurrency.StartWithContinuations(ab,function(v)
           {
            return callback(Rop1.succeed(v));
           },function(exc)
           {
            return callback(Rop1.failException(exc));
           },function(can)
           {
            return callback(Rop1.failException(can));
           },{
            $:0
           });
          }
         else
          {
           if(wb.$==2)
            {
             arb=wb.$0;
             _=Concurrency.StartWithContinuations(arb,callback,function(exc)
             {
              return callback(Rop1.failException(exc));
             },function(can)
             {
              return callback(Rop1.failException(can));
             },{
              $:0
             });
            }
           else
            {
             s1=wb.$0;
             _=callback(Rop1.succeed(s1));
            }
          }
        }
      }
     return _;
    },
    wb2arb:function(ms,_arg1)
    {
     var _,arb,rb,b,_1,b1,ab;
     if(_arg1.$==2)
      {
       arb=_arg1.$0;
       _=Concurrency.Delay(function()
       {
        return Concurrency.Bind(arb,function(_arg3)
        {
         return Concurrency.Return(Rop1.mergeMessages(ms,_arg3));
        });
       });
      }
     else
      {
       if(_arg1.$==0)
        {
         rb=_arg1.$0;
         _=Concurrency.Delay(function()
         {
          return Concurrency.Return(Rop1.mergeMessages(ms,rb));
         });
        }
       else
        {
         if(_arg1.$==3)
          {
           b=_arg1.$0;
           _=Concurrency.Delay(function()
           {
            return Concurrency.Return({
             $:0,
             $0:b,
             $1:ms
            });
           });
          }
         else
          {
           if(_arg1.$==4)
            {
             if(_arg1.$0.$==0)
              {
               _1=Concurrency.Delay(function()
               {
                return Concurrency.Return({
                 $:1,
                 $0:Runtime.New(T,{
                  $:1,
                  $0:{
                   $:30
                  },
                  $1:ms
                 })
                });
               });
              }
             else
              {
               b1=_arg1.$0.$0;
               _1=Concurrency.Delay(function()
               {
                return Concurrency.Return({
                 $:0,
                 $0:b1,
                 $1:ms
                });
               });
              }
             _=_1;
            }
           else
            {
             ab=_arg1.$0;
             _=Concurrency.Delay(function()
             {
              return Concurrency.Bind(ab,function(_arg2)
              {
               return Concurrency.Return({
                $:0,
                $0:_arg2,
                $1:ms
               });
              });
             });
            }
          }
        }
      }
     return _;
    },
    wrap:Runtime.Field(function()
    {
     return Builder.New();
    })
   },
   Option:{
    apply:function(vO,fO)
    {
     var matchValue,_,_1,f,v,arg0;
     matchValue=[vO,fO];
     if(matchValue[0].$==1)
      {
       if(matchValue[1].$==1)
        {
         f=matchValue[1].$0;
         v=matchValue[0].$0;
         arg0=f(v);
         _1={
          $:1,
          $0:arg0
         };
        }
       else
        {
         _1={
          $:0
         };
        }
       _=_1;
      }
     else
      {
       _={
        $:0
       };
      }
     return _;
    },
    call:function(v,_arg1)
    {
     var _,f,arg0;
     if(_arg1.$==1)
      {
       f=_arg1.$0;
       arg0=f(v);
       _={
        $:1,
        $0:arg0
       };
      }
     else
      {
       _={
        $:0
       };
      }
     return _;
    },
    defaultV:function(def,_arg1)
    {
     var _,v;
     if(_arg1.$==1)
      {
       v=_arg1.$0;
       _=v;
      }
     else
      {
       _=def;
      }
     return _;
    },
    iterF:function(v,_arg1)
    {
     var _,f;
     if(_arg1.$==1)
      {
       f=_arg1.$0;
       _=f(v);
      }
     else
      {
       _=null;
      }
     return _;
    },
    iterFO:function(vO,fO)
    {
     var matchValue,_,_1,f,v;
     matchValue=[vO,fO];
     if(matchValue[0].$==1)
      {
       if(matchValue[1].$==1)
        {
         f=matchValue[1].$0;
         v=matchValue[0].$0;
         _1=f(v);
        }
       else
        {
         _1=null;
        }
       _=_1;
      }
     else
      {
       _=null;
      }
     return _;
    },
    modify:function(modifier)
    {
     var mapping,def;
     mapping=function(f)
     {
      return modifier(f);
     };
     def=function(x)
     {
      return x;
     };
     return function(x)
     {
      var _arg1;
      _arg1=Option1.map(mapping,x);
      return Option.defaultV(def,_arg1);
     };
    }
   },
   Rop:{
    applyR:function(f,result)
    {
     var matchValue,_,_1,errs1,errs2,arg0,errs,msgs,arg01,_2,errs3,msgs1,arg02,f1,msgs11,msgs2,x,tupledArg,arg03,arg1;
     matchValue=[f,result];
     if(matchValue[0].$==1)
      {
       if(matchValue[1].$==1)
        {
         errs1=matchValue[0].$0;
         errs2=matchValue[1].$0;
         arg0=List.append(errs1,errs2);
         _1={
          $:1,
          $0:arg0
         };
        }
       else
        {
         errs=matchValue[0].$0;
         msgs=matchValue[1].$1;
         arg01=List.append(errs,msgs);
         _1={
          $:1,
          $0:arg01
         };
        }
       _=_1;
      }
     else
      {
       if(matchValue[1].$==1)
        {
         errs3=matchValue[1].$0;
         msgs1=matchValue[0].$1;
         arg02=List.append(errs3,msgs1);
         _2={
          $:1,
          $0:arg02
         };
        }
       else
        {
         f1=matchValue[0].$0;
         msgs11=matchValue[0].$1;
         msgs2=matchValue[1].$1;
         x=matchValue[1].$0;
         tupledArg=[f1(x),List.append(msgs11,msgs2)];
         arg03=tupledArg[0];
         arg1=tupledArg[1];
         _2={
          $:0,
          $0:arg03,
          $1:arg1
         };
        }
       _=_2;
      }
     return _;
    },
    assertR:function(v,m)
    {
     return v?Rop1.succeed(null):Rop1.fail(m);
    },
    bindR:function(f,result)
    {
     return Rop1.either(function(tupledArg)
     {
      var x,msgs;
      x=tupledArg[0];
      msgs=tupledArg[1];
      return Rop1.fSuccess1(f,x,msgs);
     },function(arg0)
     {
      return{
       $:1,
       $0:arg0
      };
     },result);
    },
    bindTry:function(f)
    {
     var f1;
     f1=function(v)
     {
      return Rop1.doTry(f,v);
     };
     return function(result)
     {
      return Rop1.bindR(f1,result);
     };
    },
    callTry:function(f)
    {
     var f1;
     f1=function(x)
     {
      var x1;
      x1=f(x);
      return Rop1.succeed(x1);
     };
     return function(v)
     {
      return Rop1.doTry(f1,v);
     };
    },
    doTry:function(f,v)
    {
     var _,e;
     try
     {
      _=f(v);
     }
     catch(e)
     {
      _=Rop1.failException(e);
     }
     return _;
    },
    either:function(fSuccess,fFailure,_arg1)
    {
     var _,errors,x,msgs;
     if(_arg1.$==1)
      {
       errors=_arg1.$0;
       _=fFailure(errors);
      }
     else
      {
       x=_arg1.$0;
       msgs=_arg1.$1;
       _=fSuccess([x,msgs]);
      }
     return _;
    },
    fFailure1:function(msgs,errs)
    {
     return{
      $:1,
      $0:List.append(errs,msgs)
     };
    },
    fFailure2:function(f,errs)
    {
     f(errs);
     return{
      $:1,
      $0:errs
     };
    },
    fSuccess0:function(msgs,x,msgs2)
    {
     return{
      $:0,
      $0:x,
      $1:List.append(msgs,msgs2)
     };
    },
    fSuccess1:function(f,x,msgs)
    {
     var result;
     result=f(x);
     return Rop1.mergeMessages(msgs,result);
    },
    fail:function(msg)
    {
     return{
      $:1,
      $0:List.ofArray([msg])
     };
    },
    failException:function(e)
    {
     var msg;
     msg={
      $:1,
      $0:e
     };
     return Rop1.fail(msg);
    },
    failIfNone:function(message,_arg1)
    {
     var _,x;
     if(_arg1.$==0)
      {
       _=Rop1.fail(message);
      }
     else
      {
       x=_arg1.$0;
       _=Rop1.succeed(x);
      }
     return _;
    },
    failIfNoneR:function(message,_arg1)
    {
     var _,rop;
     if(_arg1.$==0)
      {
       _=Rop1.fail(message);
      }
     else
      {
       rop=_arg1.$0;
       _=rop;
      }
     return _;
    },
    failureTee:function(f,result)
    {
     return Rop1.either(function(tupledArg)
     {
      var arg0,arg1;
      arg0=tupledArg[0];
      arg1=tupledArg[1];
      return{
       $:0,
       $0:arg0,
       $1:arg1
      };
     },function(errs)
     {
      return Rop1.fFailure2(f,errs);
     },result);
    },
    flow:Runtime.Field(function()
    {
     return ropBuilder.New();
    }),
    fromChoice:function(context,c)
    {
     var _,e,msg,v;
     if(c.$==1)
      {
       e=c.$0;
       msg={
        $:1,
        $0:e
       };
       _=Rop1.fail(msg);
      }
     else
      {
       v=c.$0;
       _=Rop1.succeed(v);
      }
     return _;
    },
    fromOption:function(m,_arg1)
    {
     var _,v;
     if(_arg1.$==1)
      {
       v=_arg1.$0;
       _=Rop1.succeed(v);
      }
     else
      {
       _=Rop1.fail(m);
      }
     return _;
    },
    ifError:function(def,_arg1)
    {
     var _,v;
     if(_arg1.$==0)
      {
       v=_arg1.$0;
       _arg1.$1;
       _=v;
      }
     else
      {
       _=def;
      }
     return _;
    },
    lift2R:function(f,result1,result2)
    {
     var _f_;
     _f_=Rop1.liftR(f,result1);
     return Rop1.applyR(_f_,result2);
    },
    lift3R:function(f,result1,result2,result3)
    {
     var _f_;
     _f_=Rop1.lift2R(f,result1,result2);
     return Rop1.applyR(_f_,result3);
    },
    lift4R:function(f,result1,result2,result3,result4)
    {
     var _f_;
     _f_=Rop1.lift3R(f,result1,result2,result3);
     return Rop1.applyR(_f_,result4);
    },
    liftR:function(f,result)
    {
     var _f_;
     _f_=Rop1.succeed(f);
     return Rop1.applyR(_f_,result);
    },
    liftTry:function(f)
    {
     var f1;
     f1=Rop1.callTry(f);
     return function(result)
     {
      return Rop1.bindR(f1,result);
     };
    },
    mapMessagesR:function(f,result)
    {
     var _,errors,_errors_,x,msgs,_msgs_;
     if(result.$==1)
      {
       errors=result.$0;
       _errors_=List.map(f,errors);
       _={
        $:1,
        $0:_errors_
       };
      }
     else
      {
       x=result.$0;
       msgs=result.$1;
       _msgs_=List.map(f,msgs);
       _={
        $:0,
        $0:x,
        $1:_msgs_
       };
      }
     return _;
    },
    mapR:function(v)
    {
     return function(result)
     {
      return Rop1.liftR(v,result);
     };
    },
    mergeMessages:function(msgs,result)
    {
     return Rop1.either(function(tupledArg)
     {
      var x,msgs2;
      x=tupledArg[0];
      msgs2=tupledArg[1];
      return Rop1.fSuccess0(msgs,x,msgs2);
     },function(errs)
     {
      return Rop1.fFailure1(msgs,errs);
     },result);
    },
    messagesDo:function(f,_arg1)
    {
     var _,ms,ms1;
     if(_arg1.$==1)
      {
       ms=_arg1.$0;
       _=(f(true))(ms);
      }
     else
      {
       ms1=_arg1.$1;
       _=(f(false))(ms1);
      }
     return _;
    },
    notifyMessages:function(R1)
    {
     var _,m,m1;
     if(R1.$==1)
      {
       m=R1.$0;
       _=Rop1.processMessages("E",m);
      }
     else
      {
       m1=R1.$1;
       _=Rop1.processMessages("N",m1);
      }
     return _;
    },
    op_LessBangGreater:function(f)
    {
     return function(result)
     {
      return Rop1.liftR(f,result);
     };
    },
    op_LessMultiplyGreater:function(f)
    {
     return function(result)
     {
      return Rop1.applyR(f,result);
     };
    },
    processMessages:function(mtype,msgs)
    {
     var action;
     action=function(o)
     {
      var message,_,_1,_2,_3,_4,_5,_6,_7;
      _=function(_8)
      {
       return _8.$==30?"ErrOptionIsNone":_8.$==29?"ErrGuestUserNotActivated":_8.$==28?"ErrAleaError ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.prettyPrint(_8.$1)+")":_8.$==27?"ErrNoRecordsProcessed":_8.$==26?"ErrUnsuportedDataStorage":_8.$==25?"ErrWebSharperCompiler "+PrintfHelpers.prettyPrint(_8.$0):_8.$==24?"ErrFSharpCompiler "+PrintfHelpers.prettyPrint(_8.$0):_8.$==23?"ErrFeatureNotImplemented "+PrintfHelpers.prettyPrint(_8.$0):_8.$==22?"ErrRecordNotFound ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.prettyPrint(_8.$1)+")":_8.$==21?"ErrRecordWasNotUpdated "+PrintfHelpers.prettyPrint(_8.$0):_8.$==20?"ErrDockerIsNotPresent "+_4(_8.$0):_8.$==19?"ErrObjectNotFound "+_7(_8.$0):_8.$==18?"ErrNoProvisionedClientAvailable":_8.$==17?"ErrClientNotFound "+_6(_8.$0):_8.$==16?"ErrUserIsNotDefined "+PrintfHelpers.prettyPrint(_8.$0):_8.$==15?"ErrUserIsNotAssociatedToClient "+_5(_8.$0):_8.$==14?"ErrDockerDataNotFound "+_4(_8.$0):_8.$==13?"ErrUniqueIdNotDefinedForReport "+_1(_8.$0):_8.$==12?"ErrDockerDefinitionNotFound "+_4(_8.$0):_8.$==11?"ErrTableDefinitionNotFound "+_2(_8.$0):_8.$==10?"ErrReportDefinitionNotFound "+_1(_8.$0):_8.$==9?"ErrInvalidContentPageForClient "+PrintfHelpers.prettyPrint(_8.$0):_8.$==8?"ErrInvalidToken "+PrintfHelpers.prettyPrint(_8.$0):_8.$==7?"ErrLoginFailed "+PrintfHelpers.prettyPrint(_8.$0):_8.$==6?"ErrUserIsNotLoggedIn":_8.$==5?"ErrValueIsNull ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.prettyPrint(_8.$1)+")":_8.$==4?"ErrParameterMissing "+PrintfHelpers.prettyPrint(_8.$0):_8.$==3?"ErrDuplicatedKeys ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.printArray(function(_9)
       {
        return PrintfHelpers.prettyPrint(_9);
       },_8.$1)+")":_8.$==2?"ErrUndefinedKeys ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.printArray(function(_9)
       {
        return PrintfHelpers.prettyPrint(_9);
       },_8.$1)+")":_8.$==1?"ErrExceptionThrown "+PrintfHelpers.prettyPrint(_8.$0):"WarnNotification "+PrintfHelpers.prettyPrint(_8.$0);
      };
      _1=function(_8)
      {
       return"Report "+PrintfHelpers.prettyPrint(_8.$0);
      };
      _2=function(_8)
      {
       return _8.$==2?"ExternalTable ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.prettyPrint(_8.$1)+")":_8.$==1?"SystemTable "+PrintfHelpers.prettyPrint(_8.$0):"DimensionTable "+_3(_8.$0);
      };
      _3=function(_8)
      {
       return"Dimension "+PrintfHelpers.prettyPrint(_8.$0);
      };
      _4=function(_8)
      {
       return _8.$==5?"DckDockSpawn":_8.$==4?"DckPhosphor":_8.$==3?"DckWCDocker":_8.$==2?"DckGoldenLayout":_8.$==1?"DckSingle":"DckEmpty";
      };
      _5=function(_8)
      {
       return"User "+PrintfHelpers.prettyPrint(_8.$0);
      };
      _6=function(_8)
      {
       return"Client "+PrintfHelpers.prettyPrint(_8.$0);
      };
      _7=function(_8)
      {
       return"OWorkspace "+PrintfHelpers.prettyPrint(_8.$0);
      };
      message=mtype+": "+_(o);
      alert(message);
      return console?console.log(o):undefined;
     };
     return Seq.iter(action,msgs);
    },
    ropBuilder:Runtime.Class({
     Bind:function(wrapped,restOfCExpr)
     {
      return(Rop1.bindTry(restOfCExpr))(wrapped);
     },
     Combine:function(a,b)
     {
      var matchValue,_,_1,m1,m2,m11,m21,_2,m12,m22,m13,m23,v2;
      matchValue=[a,b];
      if(matchValue[0].$==1)
       {
        if(matchValue[1].$==1)
         {
          m1=matchValue[0].$0;
          m2=matchValue[1].$0;
          _1={
           $:1,
           $0:List.append(m1,m2)
          };
         }
        else
         {
          m11=matchValue[0].$0;
          m21=matchValue[1].$1;
          matchValue[1].$0;
          _1={
           $:1,
           $0:List.append(m11,m21)
          };
         }
        _=_1;
       }
      else
       {
        if(matchValue[1].$==1)
         {
          m12=matchValue[0].$1;
          m22=matchValue[1].$0;
          matchValue[0].$0;
          _2={
           $:1,
           $0:List.append(m12,m22)
          };
         }
        else
         {
          m13=matchValue[0].$1;
          m23=matchValue[1].$1;
          matchValue[0].$0;
          v2=matchValue[1].$0;
          _2={
           $:0,
           $0:v2,
           $1:List.append(m13,m23)
          };
         }
        _=_2;
       }
      return _;
     },
     Delay:function(f)
     {
      return f(null);
     },
     For:function(sequence,body)
     {
      var _this=this;
      return this.Using(Enumerator.Get(sequence),function(_enum)
      {
       return _this.While(function()
       {
        return _enum.MoveNext();
       },_this.Delay(function()
       {
        return body(_enum.get_Current());
       }));
      });
     },
     Return:function(x)
     {
      return Rop1.succeed(x);
     },
     ReturnFrom:function(x)
     {
      return x;
     },
     Using:function(disposable,restOfCExpr)
     {
      return Operators1.Using(disposable,restOfCExpr);
     },
     While:function(guard,body)
     {
      var _this=this;
      return!guard(null)?this.Zero():this.Bind(body(null),function()
      {
       return _this.While(guard,body);
      });
     },
     Zero:function()
     {
      return Rop1.succeed(null);
     }
    },{
     New:function()
     {
      return Runtime.New(this,{});
     }
    }),
    seqCheck:function(s)
    {
     var predicate,matchValue,_,chooser,arg0,mapping,x;
     predicate=function(_arg1)
     {
      return _arg1.$==1?true:false;
     };
     matchValue=Seq.exists(predicate,s);
     if(matchValue)
      {
       chooser=function(_arg2)
       {
        var _1,ms;
        if(_arg2.$==1)
         {
          ms=_arg2.$0;
          _1={
           $:1,
           $0:ms
          };
         }
        else
         {
          _1={
           $:0
          };
         }
        return _1;
       };
       arg0=Seq.pick(chooser,s);
       _={
        $:1,
        $0:arg0
       };
      }
     else
      {
       mapping=function(_arg3)
       {
        var _1,v;
        if(_arg3.$==0)
         {
          v=_arg3.$0;
          _1=v;
         }
        else
         {
          _1=Operators1.Raise(MatchFailureException.New("D:\\Abe\\CIPHERWorkspace\\CipherSpace\\CIPHERPrototype3\\Rop.fs",217,69));
         }
        return _1;
       };
       x=Seq.map(mapping,s);
       _=Rop1.succeed(x);
      }
     return _;
    },
    succeed:function(x)
    {
     return{
      $:0,
      $0:x,
      $1:Runtime.New(T,{
       $:0
      })
     };
    },
    succeedWithMsg:function(x,msg)
    {
     return{
      $:0,
      $0:x,
      $1:List.ofArray([msg])
     };
    },
    successTee:function(f,result)
    {
     var fSuccess;
     fSuccess=function(tupledArg)
     {
      var x,msgs;
      x=tupledArg[0];
      msgs=tupledArg[1];
      f([x,msgs]);
      return{
       $:0,
       $0:x,
       $1:msgs
      };
     };
     return Rop1.either(fSuccess,function(arg0)
     {
      return{
       $:1,
       $0:arg0
      };
     },result);
    },
    toOption:function(_arg1)
    {
     var _,v;
     if(_arg1.$==0)
      {
       v=_arg1.$0;
       _={
        $:1,
        $0:v
       };
      }
     else
      {
       _={
        $:0
       };
      }
     return _;
    },
    tryProtection:function()
    {
     return Rop1.succeed(null);
    },
    valueOrDefault:function(f,result)
    {
     var _,errors,x;
     if(result.$==1)
      {
       errors=result.$0;
       _=f(errors);
      }
     else
      {
       x=result.$0;
       _=x;
      }
     return _;
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Operators=Runtime.Safe(Client.Operators);
  List=Runtime.Safe(Global.WebSharper.List);
  Attr=Runtime.Safe(Client.Attr);
  Tags=Runtime.Safe(Client.Tags);
  T=Runtime.Safe(List.T);
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  EventsPervasives=Runtime.Safe(Client.EventsPervasives);
  React=Runtime.Safe(Global.React);
  CIPHERSpace=Runtime.Safe(Global.CIPHERSpace);
  App=Runtime.Safe(CIPHERSpace.App);
  ReactHtml=Runtime.Safe(CIPHERSpace.ReactHtml);
  ReactDOM=Runtime.Safe(Global.ReactDOM);
  App1=Runtime.Safe(App.App);
  MailboxState=Runtime.Safe(App.MailboxState);
  Control=Runtime.Safe(Global.WebSharper.Control);
  MailboxProcessor=Runtime.Safe(Control.MailboxProcessor);
  jQuery=Runtime.Safe(Global.jQuery);
  Dialog=Runtime.Safe(CIPHERSpace.Dialog);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  Rop=Runtime.Safe(Global.Rop);
  Option=Runtime.Safe(Rop.Option);
  Option1=Runtime.Safe(Global.WebSharper.Option);
  Collections=Runtime.Safe(Global.WebSharper.Collections);
  FSharpSet=Runtime.Safe(Collections.FSharpSet);
  Fields=Runtime.Safe(CIPHERSpace.Fields);
  PrintfHelpers=Runtime.Safe(Global.WebSharper.PrintfHelpers);
  BalancedTree=Runtime.Safe(Collections.BalancedTree);
  Strings=Runtime.Safe(Global.WebSharper.Strings);
  RegExp=Runtime.Safe(Global.RegExp);
  GenForm=Runtime.Safe(CIPHERSpace.GenForm);
  Validation=Runtime.Safe(GenForm.Validation);
  FileTree=Runtime.Safe(CIPHERSpace.FileTree);
  FileTreeNode=Runtime.Safe(CIPHERSpace.FileTreeNode);
  Unchecked=Runtime.Safe(Global.WebSharper.Unchecked);
  SetModule=Runtime.Safe(Collections.SetModule);
  window=Runtime.Safe(Global.window);
  LoginForm=Runtime.Safe(CIPHERSpace.LoginForm);
  Server=Runtime.Safe(CIPHERSpace.Server);
  Rop1=Runtime.Safe(Rop.Rop);
  Model=Runtime.Safe(CIPHERSpace.Model);
  Language=Runtime.Safe(Model.Language);
  User=Runtime.Safe(Model.User);
  ObjectT=Runtime.Safe(Model.ObjectT);
  Slice=Runtime.Safe(Global.WebSharper.Slice);
  Popup=Runtime.Safe(CIPHERSpace.Popup);
  $=Runtime.Safe(Global.$);
  Arrays=Runtime.Safe(Global.WebSharper.Arrays);
  R=Runtime.Safe(CIPHERSpace.R);
  callServerBuilder=Runtime.Safe(Server.callServerBuilder);
  SetNode=Runtime.Safe(CIPHERSpace.SetNode);
  ARop=Runtime.Safe(Rop.ARop);
  Entry=Runtime.Safe(CIPHERSpace.Entry);
  UploadForm=Runtime.Safe(CIPHERSpace.UploadForm);
  document=Runtime.Safe(Global.document);
  console=Runtime.Safe(Global.console);
  FileReader=Runtime.Safe(Global.FileReader);
  String=Runtime.Safe(Global.String);
  clearInterval=Runtime.Safe(Global.clearInterval);
  setInterval=Runtime.Safe(Global.setInterval);
  Operators1=Runtime.Safe(Global.WebSharper.Operators);
  MatchFailureException=Runtime.Safe(Global.WebSharper.MatchFailureException);
  Builder=Runtime.Safe(ARop.Builder);
  ropBuilder=Runtime.Safe(Rop1.ropBuilder);
  alert=Runtime.Safe(Global.alert);
  return Enumerator=Runtime.Safe(Global.WebSharper.Enumerator);
 });
 Runtime.OnLoad(function()
 {
  Rop1.flow();
  ARop.wrap();
  UploadForm.renders();
  SetNode.init();
  SetNode.app();
  Server.call();
  ReactHtml.addAttributes();
  ReactHtml.addAttribute();
  Popup.init();
  Popup.app();
  GenForm.init();
  GenForm.app();
  FileTreeNode.init();
  FileTreeNode.app();
  FileTree.init();
  FileTree.app();
  Dialog.init();
  Dialog.app();
  App.mailboxes();
  App.DummyNew();
  return;
 });
}());
