(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,React,CIPHERPrototype1,ClientForm,Browser,AboutForm,List,T,ReactHtml,Html,Client,Attr,Tags,Server,PrintfHelpers,Rop,Rop1,Remoting,AjaxRemotingProvider,window,EventsPervasives,Operators,document,String,SlickGrid,Unchecked,Seq,Arrays,Option,Model2,FieldDefinition,Strings,Collections,FSharpSet,BalancedTree,ReactDOM,SetModule,Validation,R,RegExp,GenForm,Dialog,Popup,Slick,Fields,Option1,ClientFormClient,App,console,CubeOlapForm,Concurrency,FileReader,DckDockSpawn,dockspawn,DckGoldenLayout,GoldenLayout,JSON,DckPhosphor,phosphorDockPanel,phosphorWidget,DckSingle,jQuery,DckWCDocker,wcDocker,DimModel,Seq1,Lazy,ARop,Layouts,DimensionForm,Slice,parseInt,DataView,FancyTree,$,LoginForm,MenuBar,SearchFlickr,Model,Language,User,ObjectT,Control,MailboxProcessor,Impure,callServerBuilder,RowT,Operators1,Enumerator,setTimeout,TestFS,UploadForm,UserFormClient,Builder,ropBuilder,alert,MatchFailureException;
 Runtime.Define(Global,{
  CIPHERPrototype1:{
   AboutForm:{
    createForm_:function(initial,container)
    {
     var renderForm;
     renderForm=function()
     {
      return function()
      {
       return React.createElement("div",{
        className:"col-md-6"
       },React.createElement("a",{
        href:"emails.html"
       },React.createElement("img",{
        src:"/EPFile/image/inky-template.svg"
       }),React.createElement("h6",{},"Foundation for"),React.createElement("h2",{},"Emails"),React.createElement("p",{},"Our email framework helps you craft responsive HTML emails that can be read anywhere on any device. Foundation for Emails helps navigate the how different email clients handle HTML and provide tested patterns that work with Outlook as well as all the other major email clients."),React.createElement("p",{
        className:"link"
       },"Learn more about Foundation for Emails")));
      };
     };
     return ClientForm.reactRoot2(initial,container.Dom,renderForm);
    },
    showForm_:function()
    {
     return Browser.withContainerDo("container flex flexgrow",function(container)
     {
      return AboutForm.createForm_(Runtime.New(T,{
       $:0
      }),container);
     });
    }
   },
   App:{
    app:function(init,update,view)
    {
     return{
      Model:init,
      Update:update,
      View:view
     };
    },
    run:function(container,app)
    {
     var render;
     render=function(state)
     {
      return function(setState)
      {
       var processMessages,node;
       processMessages=function(msg)
       {
        return setState(function(state1)
        {
         return(app.Update.call(null,msg))(state1);
        });
       };
       node=(app.View.call(null,state))(processMessages);
       return ReactHtml.toReact(node);
      };
     };
     return ClientForm.reactRoot(app.Model,container,render);
    }
   },
   Browser:{
    LoginBox:function(goLink)
    {
     var x,login,x1,password,x2,errors,arg10,x3,x4,arg00;
     x=List.ofArray([Attr.Attr().NewAttr("placeholder","User email")]);
     login=Tags.Tags().NewTag("input",x);
     x1=List.ofArray([Attr.Attr().NewAttr("placeholder","Password"),Attr.Attr().NewAttr("type","password")]);
     password=Tags.Tags().NewTag("input",x1);
     x2=Runtime.New(T,{
      $:0
     });
     errors=Tags.Tags().NewTag("p",x2);
     x3=List.ofArray([Attr.Attr().NewAttr("type","button"),Attr.Attr().NewAttr("value","Enter")]);
     x4=Tags.Tags().NewTag("input",x3);
     arg00=function()
     {
      return function()
      {
       var _builder_,f;
       f=function(failed)
       {
        return function(ms)
        {
         var _,_1,_2,_3,_4,_5,_6,_7,_8;
         if(failed)
          {
           _1=function(_9)
           {
            return _9.$==29?"ErrGuestUserNotActivated":_9.$==28?"ErrAleaError ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==27?"ErrNoRecordsProcessed":_9.$==26?"ErrUnsuportedDataStorage":_9.$==25?"ErrWebSharperCompiler "+PrintfHelpers.prettyPrint(_9.$0):_9.$==24?"ErrFSharpCompiler "+PrintfHelpers.prettyPrint(_9.$0):_9.$==23?"ErrFeatureNotImplemented "+PrintfHelpers.prettyPrint(_9.$0):_9.$==22?"ErrRecordNotFound ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==21?"ErrRecordWasNotUpdated "+PrintfHelpers.prettyPrint(_9.$0):_9.$==20?"ErrDockerIsNotPresent "+_5(_9.$0):_9.$==19?"ErrObjectNotFound "+_8(_9.$0):_9.$==18?"ErrNoProvisionedClientAvailable":_9.$==17?"ErrClientNotFound "+_7(_9.$0):_9.$==16?"ErrUserIsNotDefined "+PrintfHelpers.prettyPrint(_9.$0):_9.$==15?"ErrUserIsNotAssociatedToClient "+_6(_9.$0):_9.$==14?"ErrDockerDataNotFound "+_5(_9.$0):_9.$==13?"ErrUniqueIdNotDefinedForReport "+_2(_9.$0):_9.$==12?"ErrDockerDefinitionNotFound "+_5(_9.$0):_9.$==11?"ErrTableDefinitionNotFound "+_3(_9.$0):_9.$==10?"ErrReportDefinitionNotFound "+_2(_9.$0):_9.$==9?"ErrInvalidContentPageForClient "+PrintfHelpers.prettyPrint(_9.$0):_9.$==8?"ErrInvalidToken "+PrintfHelpers.prettyPrint(_9.$0):_9.$==7?"ErrLoginFailed "+PrintfHelpers.prettyPrint(_9.$0):_9.$==6?"ErrUserIsNotLoggedIn":_9.$==5?"ErrValueIsNull ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==4?"ErrParameterMissing "+PrintfHelpers.prettyPrint(_9.$0):_9.$==3?"ErrDuplicatedKeys ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.printArray(function(_a)
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
           _=errors.set_Text(PrintfHelpers.printList(function(_9)
           {
            return _1(_9);
           },ms));
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
        return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:15",[login.get_Value(),password.get_Value()]),function(_arg1)
        {
         Browser.globalToken=function()
         {
          return _arg1;
         };
         window.location.href=goLink;
         return _builder_.Zero();
        });
       });
      };
     };
     EventsPervasives.Events().OnClick(arg00,x4);
     arg10=List.ofArray([errors,login,password,x4]);
     return Tags.Tags().NewTag("div",arg10);
    },
    allPanels:function(token,panels)
    {
     var mapping;
     mapping=function(panel)
     {
      return Browser.getPanelRegister(token,panel);
     };
     return List.map(mapping,panels);
    },
    createCanvasNone:function()
    {
     return Browser.withContainerDo("flex flexgrow",function()
     {
      return null;
     });
    },
    createDockEnvironment:function(createDock)
    {
     return Browser.withContainerDo("flex flexgrow",function(container)
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:17",[]),function(_arg1)
       {
        return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:18",[]),function(_arg2)
        {
         var x,buttonSave,x1,buttonRestore,allPanels,value,arg10,arg101,x2,f;
         x=List.ofArray([Tags.Tags().text("save")]);
         buttonSave=Tags.Tags().NewTag("button",x);
         x1=List.ofArray([Tags.Tags().text("restore")]);
         buttonRestore=Tags.Tags().NewTag("button",x1);
         allPanels=Browser.allPanels(_arg1,_arg2);
         arg10=List.ofArray([buttonSave,buttonRestore]);
         arg101=List.ofArray([Attr.Attr().NewAttr("class","flex flexgrow"),Attr.Attr().NewAttr("id","SinglePane")]);
         x2=Tags.Tags().NewTag("div",arg101);
         f=((createDock(allPanels))(buttonSave))(buttonRestore);
         Operators.OnAfterRender(f,x2);
         value=Operators.add(container,List.ofArray([Tags.Tags().NewTag("div",arg10),x2]));
         return _builder_.Zero();
        });
       });
      });
     });
    },
    createPanelReport:function(_,_1,_2)
    {
     var options,url,token,report,_3,x,x1,arg00,cover1,x2,x3,arg001,iFrame,container,arg10;
     options=[_,_1,_2];
     url=options[2];
     token=options[0];
     report=options[1];
     _3=Browser.instance()+1;
     Browser.instance=function()
     {
      return _3;
     };
     x=List.ofArray([Attr.Attr().NewAttr("class","iframe-cover-on")]);
     x1=Tags.Tags().NewTag("div",x);
     arg00=function(cover)
     {
      return function()
      {
       var _4;
       if(document.body.style.cursor===""?Browser.mouseStatus()===0:false)
        {
         cover["HtmlProvider@33"].RemoveClass(cover.get_Body(),"iframe-cover-on");
         _4=cover["HtmlProvider@33"].AddClass(cover.get_Body(),"iframe-cover-off");
        }
       else
        {
         _4=null;
        }
       return _4;
      };
     };
     EventsPervasives.Events().OnMouseEnter(arg00,x1);
     cover1=x1;
     x2=List.ofArray([Attr.Attr().NewAttr("class","flex flexgrow"),Attr.Attr().NewAttr("src",url+String(Browser.instance())),Attr.Attr().NewAttr("frameborder","0"),Attr.Attr().NewAttr("height","100%"),Attr.Attr().NewAttr("width","100%")]);
     x3=Tags.Tags().NewTag("iframe",x2);
     arg001=function()
     {
      return function()
      {
       cover1["HtmlProvider@33"].RemoveClass(cover1.get_Body(),"iframe-cover-off");
       return cover1["HtmlProvider@33"].AddClass(cover1.get_Body(),"iframe-cover-on");
      };
     };
     EventsPervasives.Events().OnMouseLeave(arg001,x3);
     iFrame=x3;
     arg10=List.ofArray([Attr.Attr().NewAttr("class","flex flexgrow"),Attr.Attr().NewAttr("style","position: relative; height: 100%; width: 100%; ")]);
     container=Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([cover1,iFrame]));
     return[report,container,function()
     {
      return null;
     }];
    },
    createPanelTable:function(token,title,table)
    {
     var patternInput,elements,divGrid,afterRender,container;
     patternInput=SlickGrid.GridSync(token,table);
     elements=patternInput[0];
     divGrid=patternInput[1];
     afterRender=patternInput[2];
     container=Operators.add(Tags.Tags().NewTag("div",elements),List.ofArray([Attr.Attr().NewAttr("class","flex flexgrow"),Attr.Attr().NewAttr("style","position: relative; height: 100%; width: 100%; ")]));
     return[title,container,function()
     {
      return afterRender(divGrid.Dom);
     }];
    },
    findPanelFromEndPoint:function(contentPage,panels)
    {
     var predicate,x,arg0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,m;
     predicate=function(panel)
     {
      var _,report,table;
      if(panel.$==1)
       {
        panel.$1;
        report=panel.$0;
        _={
         $:3,
         $0:report
        };
       }
      else
       {
        panel.$1;
        table=panel.$0;
        _={
         $:2,
         $0:table
        };
       }
      return Unchecked.Equals(contentPage,_);
     };
     x=Seq.tryFind(predicate,panels);
     _1=function(_)
     {
      return _.$==15?"CPHomePage":_.$==14?"CPLogout":_.$==13?"CPUploadForm":_.$==12?"CPUserForm":_.$==11?"CPClientForm":_.$==10?"CPFancyTreeTest":_.$==9?"CPSiteMap":_.$==8?"CPAbout":_.$==7?"CPInputForm "+_b(_.$0):_.$==6?"CPInclude ("+PrintfHelpers.prettyPrint(_.$0)+", "+PrintfHelpers.prettyPrint(_.$1)+", "+PrintfHelpers.prettyPrint(_.$2)+")":_.$==5?"CPCubeOlap "+_9(_.$0):_.$==4?"CPDimension "+_6(_.$0):_.$==3?"CPReport "+_7(_.$0):_.$==2?"CPTable "+_5(_.$0):_.$==1?"CPDocker ("+_2(_.$0)+", "+_3(_.$1)+")":"CPTestJM";
     };
     _2=function(_)
     {
      return _.$==5?"DckDockSpawn":_.$==4?"DckPhosphor":_.$==3?"DckWCDocker":_.$==2?"DckGoldenLayout":_.$==1?"DckSingle":"DckEmpty";
     };
     _3=function(_)
     {
      return _.$==2?"LoadWorkspace "+_8(_.$0):_.$==1?"LoadPanel "+_4(_.$0):"NoRequest";
     };
     _4=function(_)
     {
      return _.$==1?"PanelReport ("+_7(_.$0)+", "+PrintfHelpers.prettyPrint(_.$1)+", "+PrintfHelpers.prettyPrint(_.$2)+")":"PanelTable ("+_5(_.$0)+", "+PrintfHelpers.prettyPrint(_.$1)+")";
     };
     _5=function(_)
     {
      return _.$==2?"ExternalTable ("+PrintfHelpers.prettyPrint(_.$0)+", "+PrintfHelpers.prettyPrint(_.$1)+")":_.$==1?"SystemTable "+PrintfHelpers.prettyPrint(_.$0):"DimensionTable "+_6(_.$0);
     };
     _6=function(_)
     {
      return"Dimension "+PrintfHelpers.prettyPrint(_.$0);
     };
     _7=function(_)
     {
      return"Report "+PrintfHelpers.prettyPrint(_.$0);
     };
     _8=function(_)
     {
      return"Workspace "+PrintfHelpers.prettyPrint(_.$0);
     };
     _9=function(_)
     {
      return"CubeOlap ("+PrintfHelpers.prettyPrint(_.$0)+", "+_a(_.$1)+")";
     };
     _a=function(_)
     {
      return"ServerOlap "+PrintfHelpers.prettyPrint(_.$0);
     };
     _b=function(_)
     {
      return _.$==2?"IFDimension "+_6(_.$0):_.$==1?"IFUser":"IFClient";
     };
     arg0=_1(contentPage);
     m={
      $:9,
      $0:arg0
     };
     return Rop1.fromOption(m,x);
    },
    getPanelRegister:function(token,panel)
    {
     var _,url,title,report,loop,title1,table,_1,_2;
     if(panel.$==1)
      {
       url=panel.$2;
       title=panel.$1;
       report=panel.$0;
       loop=[];
       loop[1]=report;
       loop[0]=1;
       while(loop[0])
        {
         loop[0]=0;
         loop[1]="Report "+PrintfHelpers.prettyPrint(loop[1].$0);
        }
       _=[loop[1],function()
       {
        return Browser.createPanelReport(token,title,url);
       }];
      }
     else
      {
       title1=panel.$1;
       table=panel.$0;
       _1=function(_3)
       {
        return _3.$==2?"ExternalTable ("+PrintfHelpers.prettyPrint(_3.$0)+", "+PrintfHelpers.prettyPrint(_3.$1)+")":_3.$==1?"SystemTable "+PrintfHelpers.prettyPrint(_3.$0):"DimensionTable "+_2(_3.$0);
       };
       _2=function(_3)
       {
        return"Dimension "+PrintfHelpers.prettyPrint(_3.$0);
       };
       _=[_1(table),function()
       {
        return Browser.createPanelTable(token,title1,table);
       }];
      }
     return _;
    },
    globalToken:Runtime.Field(function()
    {
     return{
      Name:"00000000-0000-0000-0000-000000000000",
      Hash:""
     };
    }),
    instance:Runtime.Field(function()
    {
     return 1;
    }),
    mouseStatus:Runtime.Field(function()
    {
     return 0;
    }),
    onMouseDown:function()
    {
     var _;
     _=Browser.mouseStatus()+1;
     Browser.mouseStatus=function()
     {
      return _;
     };
     return;
    },
    onMouseUp:function()
    {
     var _;
     _=Browser.mouseStatus()-1;
     Browser.mouseStatus=function()
     {
      return _;
     };
     return;
    },
    registerMouseEvents:Runtime.Field(function()
    {
     document.body.addEventListener("mousedown",function(_arg00_)
     {
      return Browser.onMouseDown(_arg00_);
     });
     return document.body.addEventListener("mouseup",function(_arg00_)
     {
      return Browser.onMouseUp(_arg00_);
     });
    }),
    showPanel:function(contentPage)
    {
     return Browser.withContainerDo("flex flexgrow",function(container)
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:17",[]),function(_arg1)
       {
        return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:18",[]),function(_arg2)
        {
         return _builder_.Bind1(Browser.findPanelFromEndPoint(contentPage,_arg2),function(_arg3)
         {
          var patternInput,f,patternInput1,element,after,value;
          patternInput=Browser.getPanelRegister(_arg1,_arg3);
          patternInput[0];
          f=patternInput[1];
          patternInput1=f(null);
          element=patternInput1[1];
          after=patternInput1[2];
          value=Operators.add(container,List.ofArray([element]));
          after(null);
          return _builder_.Zero();
         });
        });
       });
      });
     });
    },
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
   ClientForm:{
    dataStorageToDataValue:function(dS)
    {
     var _,dV;
     if(dS.$==0)
      {
       dV=dS.$0;
       _=dV;
      }
     else
      {
       _={
        $:4
       };
      }
     return _;
    },
    dataValueToString:function(dV)
    {
     var _,s,loop;
     if(dV.$==0)
      {
       s=dV.$0;
       _=s;
      }
     else
      {
       if(dV.$==3)
        {
         _="";
        }
       else
        {
         loop=[];
         loop[1]=dV;
         loop[0]=1;
         while(loop[0])
          {
           if(loop[1].$==4)
            {
             loop[0]=0;
             loop[1]="DUnsupported";
            }
           else
            {
             if(loop[1].$==3)
              {
               loop[0]=0;
               loop[1]="DNull";
              }
             else
              {
               if(loop[1].$==2)
                {
                 loop[0]=0;
                 loop[1]="DFloat "+PrintfHelpers.prettyPrint(loop[1].$0);
                }
               else
                {
                 if(loop[1].$==1)
                  {
                   loop[0]=0;
                   loop[1]="DInt "+PrintfHelpers.prettyPrint(loop[1].$0);
                  }
                 else
                  {
                   loop[0]=0;
                   loop[1]="DText "+PrintfHelpers.prettyPrint(loop[1].$0);
                  }
                }
              }
            }
          }
         _="<"+loop[1]+">";
        }
      }
     return _;
    },
    fieldsFromColumns:function(columns)
    {
     var mapping,x,mapping2,x2;
     mapping=function(i)
     {
      return function(c)
      {
       var getter,setter,inputRecord,fieldName,labelO,maxLen,canBeNull,canBeEmpty,typeF;
       getter=function(ds)
       {
        var _,data;
        if(ds.$==1)
         {
          data=ds.$0;
          _=Arrays.get(data,i);
         }
        else
         {
          _={
           $:4
          };
         }
        return _;
       };
       setter=function(v)
       {
        return function(ds)
        {
         var _,data,mapping1,tupledArg,_arg10_,_arg11_,_arg12_,option;
         if(ds.$==1)
          {
           data=ds.$0;
           mapping1=function(arg0)
           {
            return{
             $:1,
             $0:arg0
            };
           };
           tupledArg=[c.ColumnName,i,v];
           _arg10_=tupledArg[0];
           _arg11_=tupledArg[1];
           _arg12_=tupledArg[2];
           option=ClientForm.newDataArray(data,_arg10_,_arg11_,_arg12_);
           _=Option.map(mapping1,option);
          }
         else
          {
           _={
            $:0
           };
          }
         return _;
        };
       };
       inputRecord=Model2.defField(getter);
       fieldName=c.ColumnName;
       labelO=c.Caption;
       maxLen=c.MaxLength;
       canBeNull=c.AllowDBNull;
       canBeEmpty=c.AllowDBNull;
       typeF=c.DataTypeName;
       return Runtime.New(FieldDefinition,{
        fieldName:fieldName,
        getter:inputRecord.getter,
        setter:setter,
        labelO:labelO,
        placeholderO:inputRecord.placeholderO,
        typeF:typeF,
        maxLen:maxLen,
        hidden:inputRecord.hidden,
        canBeNull:canBeNull,
        canBeEmpty:canBeEmpty,
        isReadOnly:inputRecord.isReadOnly,
        trimText:inputRecord.trimText,
        blankspaces:inputRecord.blankspaces,
        validation:inputRecord.validation,
        preButton:inputRecord.preButton,
        postButton:inputRecord.postButton,
        inputType:inputRecord.inputType
       });
      };
     };
     x=Seq.mapi(mapping,columns);
     mapping2=function(fd)
     {
      var matchValue,_,labelO,_1,validation;
      matchValue=fd.fieldName;
      if(matchValue==="industry_type")
       {
        labelO={
         $:1,
         $0:"Industry"
        };
        _=Runtime.New(FieldDefinition,{
         fieldName:fd.fieldName,
         getter:fd.getter,
         setter:fd.setter,
         labelO:labelO,
         placeholderO:fd.placeholderO,
         typeF:fd.typeF,
         maxLen:fd.maxLen,
         hidden:fd.hidden,
         canBeNull:fd.canBeNull,
         canBeEmpty:fd.canBeEmpty,
         isReadOnly:fd.isReadOnly,
         trimText:fd.trimText,
         blankspaces:fd.blankspaces,
         validation:fd.validation,
         preButton:fd.preButton,
         postButton:fd.postButton,
         inputType:fd.inputType
        });
       }
      else
       {
        if(Strings.EndsWith(matchValue,"_email"))
         {
          validation={
           $:1,
           $0:function(dv)
           {
            var _2,x1,set1;
            if((fd.canBeNull?true:fd.canBeEmpty)?Unchecked.Equals(dv,{
             $:3
            })?true:Unchecked.Equals(dv,{
             $:0,
             $0:""
            }):false)
             {
              _2=FSharpSet.New(Runtime.New(T,{
               $:0
              }));
             }
            else
             {
              x1=fd.basicValidations(dv);
              set1=ClientForm.validateEmailP(dv);
              _2=FSharpSet.New1(BalancedTree.OfSeq(Seq.append(set1,x1)));
             }
            return _2;
           }
          };
          _1=Runtime.New(FieldDefinition,{
           fieldName:fd.fieldName,
           getter:fd.getter,
           setter:fd.setter,
           labelO:fd.labelO,
           placeholderO:fd.placeholderO,
           typeF:fd.typeF,
           maxLen:fd.maxLen,
           hidden:fd.hidden,
           canBeNull:fd.canBeNull,
           canBeEmpty:fd.canBeEmpty,
           isReadOnly:fd.isReadOnly,
           trimText:fd.trimText,
           blankspaces:fd.blankspaces,
           validation:validation,
           preButton:fd.preButton,
           postButton:"Verify",
           inputType:"email"
          });
         }
        else
         {
          _1=fd;
         }
        _=_1;
       }
      return _;
     };
     x2=Seq.map(mapping2,x);
     return Seq.toList(x2);
    },
    inputForm:function(formId)
    {
     var x,x1,f,container1;
     x=List.ofArray([Attr.Attr().NewAttr("class","flex flexgrow")]);
     x1=Tags.Tags().NewTag("div",x);
     f=function(container)
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:20",[formId]),function(_arg1)
       {
        var title,data,columns,fields,initial,domElement,children,children1;
        title=_arg1[0];
        data=_arg1[2];
        columns=_arg1[1];
        fields=ClientForm.fieldsFromColumns(columns);
        initial={
         data:data,
         validations:FSharpSet.New(Runtime.New(T,{
          $:0
         }))
        };
        domElement=container.Dom;
        children=function(state)
        {
         return function(setState)
         {
          return ClientForm.renderFormFields(fields,state,setState);
         };
        };
        children1=function(state)
        {
         return function(setState)
         {
          return ClientForm.renderInputForm(formId,title,children,state,setState);
         };
        };
        ClientForm.reactRoot(initial,domElement,children1);
        return _builder_.Zero();
       });
      });
     };
     Operators.OnAfterRender(f,x1);
     container1=x1;
     return container1;
    },
    newDataArray:function(_,_1,_2,_3)
    {
     var change,v,i,mapping,arg0;
     change=[_1,_2,_3];
     v=change[2];
     i=change[1];
     change[0];
     mapping=function(_i_)
     {
      return function(_v_)
      {
       return i===_i_?v:_v_;
      };
     };
     arg0=Arrays.mapi(mapping,_);
     return{
      $:1,
      $0:arg0
     };
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
       return React.createElement("div",{
        className:className
       });
      }
     });
    },
    reactRoot:function(initial,domElement,children)
    {
     var virtualChildrenRenderer,rootClass;
     virtualChildrenRenderer=function()
     {
      var setState_,setState,_this=this,state;
      setState_=this.setState;
      setState=function(newStateF)
      {
       var value;
       value=setState_.apply(_this,[newStateF]);
       return;
      };
      state=_this.state;
      return(children(state))(setState);
     };
     rootClass=React.createClass({
      displayName:"rootClass",
      getInitialState:function()
      {
       return initial;
      },
      render:virtualChildrenRenderer
     });
     return ReactDOM.render(React.createElement(rootClass),domElement);
    },
    reactRoot2:function(initial,domElement,children)
    {
     var virtualChildrenRenderer,rootClass;
     virtualChildrenRenderer=function()
     {
      var setState_,setState,_this=this,state;
      setState_=this.setState;
      setState=function(newState)
      {
       var value;
       value=setState_.apply(_this,[newState]);
       return;
      };
      state=_this.state;
      return(children(state))(setState);
     };
     rootClass=React.createClass({
      displayName:"rootClass",
      getInitialState:function()
      {
       return initial;
      },
      render:virtualChildrenRenderer
     });
     return ReactDOM.render(React.createElement(rootClass),domElement);
    },
    renderFormFields:function(fields,state,setState)
    {
     var addValidationsFor,getValidationsFor,chooser1,fieldsR,arg001;
     addValidationsFor=function(name)
     {
      return function(validations)
      {
       var predicate,set,set2;
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
       set=state.validations;
       set2=SetModule.Filter(predicate,set);
       return FSharpSet.New1(BalancedTree.OfSeq(Seq.append(validations,set2)));
      };
     };
     getValidationsFor=function(name)
     {
      var chooser,source,arg00;
      chooser=function(v)
      {
       return v.headPathIs(name)?{
        $:1,
        $0:v.reducePath()
       }:{
        $:0
       };
      };
      source=state.validations;
      arg00=Seq.choose(chooser,source);
      return FSharpSet.New(arg00);
     };
     chooser1=function(fd)
     {
      var _,arg0;
      if(fd.hidden)
       {
        _={
         $:0
        };
       }
      else
       {
        arg0=ClientForm.renderStringInputDM(fd,{
         data:{
          $:0,
          $0:fd.getter.call(null,state.data)
         },
         validations:getValidationsFor(fd.fieldName)
        },function(subState)
        {
         var matchValue,_1,dV,x,action;
         matchValue=subState.data;
         if(matchValue.$==0)
          {
           dV=matchValue.$0;
           x=(fd.setter.call(null,dV))(state.data);
           action=function(newData)
           {
            return setState(function()
            {
             var mapping,set,x1;
             mapping=function(v)
             {
              return v.addPath(fd.fieldName);
             };
             set=subState.validations;
             x1=FSharpSet.New1(BalancedTree.OfSeq(Seq.map(mapping,set)));
             return{
              data:newData,
              validations:(addValidationsFor(fd.fieldName))(x1)
             };
            });
           };
           _1=Option.iter(action,x);
          }
         else
          {
           _1=setState(function(state1)
           {
            return{
             data:state1.data,
             validations:FSharpSet.New(List.ofArray([Runtime.New(Validation,{
              $:0,
              $0:{
               $:3,
               $0:"Expected SingleValue"
              }
             })]))
            };
           });
          }
         return _1;
        });
        _={
         $:1,
         $0:arg0
        };
       }
      return _;
     };
     fieldsR=List.choose(chooser1,fields);
     arg001=List.ofArray([R.className("panel-body flex flexgrow")]);
     return R.div(arg001,fieldsR);
    },
    renderInputForm:function(formId,title,children,state,setState)
    {
     var submit,x,mapping,strings,x1,validationMsgs;
     submit=function(e)
     {
      var _,_builder_;
      if(state.validations.get_Count()===0)
       {
        _builder_=Server.call();
        _=_builder_.Delay(function()
        {
         return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:21",[formId,state.data]),function()
         {
          window.location.reload();
          return _builder_.Zero();
         });
        });
       }
      else
       {
        _=null;
       }
      return e.preventDefault();
     };
     x=state.validations;
     mapping=function(v)
     {
      var _,_1;
      _=function(_2)
      {
       return _2.$==1?"PathValidation ("+PrintfHelpers.printList(function(_3)
       {
        return PrintfHelpers.prettyPrint(_3);
       },_2.$0)+", "+_1(_2.$1)+")":"InputValidation "+_1(_2.$0);
      };
      _1=function(_2)
      {
       return _2.$==4?"VPatternNotMatch ("+PrintfHelpers.prettyPrint(_2.$0)+", "+PrintfHelpers.prettyPrint(_2.$1)+")":_2.$==3?"VUnsupportedData "+PrintfHelpers.prettyPrint(_2.$0):_2.$==2?"VCannotModify":_2.$==1?"VNotLongerThan "+PrintfHelpers.prettyPrint(_2.$0):"VEmpty";
      };
      return _(v);
     };
     strings=Seq.map(mapping,x);
     x1=Strings.concat(",  ",strings);
     validationMsgs=ClientForm.validationMsg(x1);
     return React.createElement("form",{
      className:"panel panel-info",
      onSubmit:submit
     },React.createElement("div",{
      className:"panel-heading"
     },React.createElement("label",{
      className:"panel-title text-center"
     },title)),React.createElement("div",{
      className:"panel-body"
     },(children(state))(setState)),React.createElement("div",{
      className:"panel-footer"
     },React.createElement("input",{
      type:"submit",
      placeholder:"Post",
      className:"btn btn-primary",
      disabled:state.validations.get_Count()>0
     }),validationMsgs));
    },
    renderStringInput:function(fieldDef,text,validations,setText)
    {
     var groupClass,preButton,postButton,classAlert,onChange,attrs,mapping,strings;
     groupClass=(fieldDef.preButton===""?fieldDef.postButton==="":false)?"":"input-group ";
     preButton=fieldDef.preButton===""?"":React.createElement("span",{
      className:"input-group-btn"
     },React.createElement("button",{
      type:"button",
      className:"btn btn-default"
     },fieldDef.preButton));
     postButton=fieldDef.postButton===""?"":React.createElement("span",{
      className:"input-group-btn"
     },React.createElement("button",{
      type:"button",
      className:"btn btn-default"
     },fieldDef.postButton));
     classAlert=validations.get_Count()===0?"":" alert-danger";
     onChange=function(e)
     {
      return setText(e.target.value);
     };
     attrs={
      type:fieldDef.inputType,
      placeholder:fieldDef.get_placeholder(),
      value:text,
      onChange:onChange,
      className:"form-control"+classAlert
     };
     fieldDef.maxLen>0?void(attrs.maxLength=fieldDef.maxLen):null;
     mapping=function(_)
     {
      var loop;
      loop=[];
      loop[1]=_;
      loop[0]=1;
      while(loop[0])
       {
        if(loop[1].$==4)
         {
          loop[0]=0;
          loop[1]="VPatternNotMatch ("+PrintfHelpers.prettyPrint(loop[1].$0)+", "+PrintfHelpers.prettyPrint(loop[1].$1)+")";
         }
        else
         {
          if(loop[1].$==3)
           {
            loop[0]=0;
            loop[1]="VUnsupportedData "+PrintfHelpers.prettyPrint(loop[1].$0);
           }
          else
           {
            if(loop[1].$==2)
             {
              loop[0]=0;
              loop[1]="VCannotModify";
             }
            else
             {
              if(loop[1].$==1)
               {
                loop[0]=0;
                loop[1]="VNotLongerThan "+PrintfHelpers.prettyPrint(loop[1].$0);
               }
              else
               {
                loop[0]=0;
                loop[1]="VEmpty";
               }
             }
           }
         }
       }
      return loop[1];
     };
     strings=FSharpSet.New1(BalancedTree.OfSeq(Seq.map(mapping,validations)));
     return React.createElement("div",{
      className:"form-group",
      key:fieldDef.fieldName
     },React.createElement("label",{
      className:"textInputLabel"
     },fieldDef.get_label()),ClientForm.validationMsg(Strings.concat(", ",strings)),React.createElement("div",{
      className:groupClass
     },preButton,React.createElement("input",attrs),postButton));
    },
    renderStringInputDM:function(fieldDef,state,setState)
    {
     var dS,value,text,mapping,chooser,source,source1,arg00,validations,setText;
     dS=state.data;
     value=ClientForm.dataStorageToDataValue(dS);
     text=ClientForm.dataValueToString(value);
     mapping=function(v)
     {
      return v.reducePath();
     };
     chooser=function(_arg1)
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
     };
     source=state.validations;
     source1=Seq.map(mapping,source);
     arg00=Seq.choose(chooser,source1);
     validations=FSharpSet.New(arg00);
     setText=function(text1)
     {
      var value1,mapping1,set;
      value1=(fieldDef.canBeNull?text1==="":false)?{
       $:3
      }:{
       $:0,
       $0:text1
      };
      mapping1=function(v)
      {
       return Runtime.New(Validation,{
        $:0,
        $0:v
       });
      };
      set=fieldDef.validations(value1);
      return setState({
       data:{
        $:0,
        $0:value1
       },
       validations:FSharpSet.New1(BalancedTree.OfSeq(Seq.map(mapping1,set)))
      });
     };
     return ClientForm.renderStringInput(fieldDef,text,validations,setText);
    },
    validateEmailP:function(email)
    {
     var emailPattern,emailStr;
     emailPattern=new RegExp("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
     emailStr=ClientForm.dataValueToString(email);
     return emailPattern.test(emailStr)?FSharpSet.New(Runtime.New(T,{
      $:0
     })):FSharpSet.New(List.ofArray([{
      $:4,
      $0:"not a valid email",
      $1:emailStr
     }]));
    },
    validationMsg:function(msg)
    {
     return msg===""?"":React.createElement("span",{
      className:"alert validation"
     },msg);
    }
   },
   ClientFormClient:{
    init:function(title,client)
    {
     return{
      form:GenForm.init(title),
      dialog:Dialog.init(),
      popup:Popup.init(),
      client:client,
      serverGridProcessorO:{
       $:0
      },
      reportGridProcessorO:{
       $:0
      },
      paramGridProcessorO:{
       $:0
      },
      itemsCallback:{
       $:0
      }
     };
    },
    runApp_:function(token,container,initModel)
    {
     var globalProcessor,setGlobalProcessor_,processMessages,showProcessing,showCompleted,saveData_,execOrderX_,processServerGridMessages,serverGridClass,processReportGridMessages,reportGridClass,processParamGridMessages,paramGridClass,view,update,app;
     globalProcessor=[{
      $:0
     }];
     setGlobalProcessor_=function(processMsg)
     {
      return globalProcessor[0].$==0?void(globalProcessor[0]=processMsg):null;
     };
     processMessages=function(msg)
     {
      var mapping,option,value;
      mapping=function(f)
      {
       return f(msg);
      };
      option=globalProcessor[0];
      value=Option.map(mapping,option);
      return;
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
       $:0,
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
       $:0,
       $0:arg01
      });
     };
     saveData_=function(model)
     {
      return function()
      {
       var set,_,_builder_,source,x,_2,_3;
       set=model.form.validations;
       if(set.get_Count()===0)
        {
         _builder_=Server.call();
         _=_builder_.Delay(function()
         {
          showProcessing("saving...");
          return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:1",[token,model.client]),function(_arg1)
          {
           var result,guest,_1;
           result=_arg1[1];
           guest=_arg1[0];
           showCompleted(result);
           if(guest)
            {
             window.location.reload();
             _1=_builder_.Zero();
            }
           else
            {
             _1=_builder_.Zero();
            }
           return _1;
          });
         });
        }
       else
        {
         source=model.form.validations;
         x=Seq.toArray(source);
         _2=function(_1)
         {
          return _1.$==1?"PathValidation ("+PrintfHelpers.printList(function(_4)
          {
           return PrintfHelpers.prettyPrint(_4);
          },_1.$0)+", "+_3(_1.$1)+")":"InputValidation "+_3(_1.$0);
         };
         _3=function(_1)
         {
          return _1.$==4?"VPatternNotMatch ("+PrintfHelpers.prettyPrint(_1.$0)+", "+PrintfHelpers.prettyPrint(_1.$1)+")":_1.$==3?"VUnsupportedData "+PrintfHelpers.prettyPrint(_1.$0):_1.$==2?"VCannotModify":_1.$==1?"VNotLongerThan "+PrintfHelpers.prettyPrint(_1.$0):"VEmpty";
         };
         _=showCompleted("cannot save: "+PrintfHelpers.printArray(function(_1)
         {
          return _2(_1);
         },x));
        }
       return _;
      };
     };
     execOrderX_=function()
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       showProcessing("replicating customer...");
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:28",[token]),function(_arg2)
       {
        var loop;
        loop=[];
        loop[1]=_arg2;
        loop[0]=1;
        while(loop[0])
         {
          loop[0]=0;
          loop[1]="Client "+PrintfHelpers.prettyPrint(loop[1].$0);
         }
        showCompleted("replicated "+loop[1]);
        return _builder_.Zero();
       });
      });
     };
     processServerGridMessages=function(msg)
     {
      return processMessages({
       $:6,
       $0:msg
      });
     };
     serverGridClass=ClientForm.reactContainerClass("flex flexgrow",function()
     {
      return function(container1)
      {
       var cols,createNew,mapping,array,servers;
       cols=[{
        id:"name",
        name:"Alias",
        field:"name"
       },{
        id:"Server",
        name:"Server",
        field:"server",
        editor:Slick.Editors.Text
       },{
        id:"Model",
        name:"Model",
        field:"model",
        editor:Slick.Editors.Text
       }];
       createNew=function()
       {
        return function(id)
        {
         return[id,null];
        };
       };
       mapping=function(value)
       {
        return value;
       };
       array=initModel.client.serverOlaps;
       servers=Arrays.map(mapping,array);
       SlickGrid.SimpleGrid(cols,servers,createNew,{
        $:1,
        $0:processServerGridMessages
       },container1);
       return null;
      };
     });
     processReportGridMessages=function(msg)
     {
      return processMessages({
       $:8,
       $0:msg
      });
     };
     reportGridClass=ClientForm.reactContainerClass("flex flexgrow",function()
     {
      return function(container1)
      {
       var cols,createNew,mapping,array,reports;
       cols=[{
        id:"Name",
        name:"Name",
        field:"name"
       },{
        id:"Type",
        name:"Report Type",
        field:"typeR"
       },{
        id:"uniqueId",
        name:"Unique Id",
        field:"uniqueId",
        editor:Slick.Editors.Text
       },{
        id:"options",
        name:"Options",
        field:"options",
        editor:Slick.Editors.Text
       }];
       createNew=function()
       {
        return function(id)
        {
         return[id,{
          code:"",
          name:"",
          value:""
         }];
        };
       };
       mapping=function(value)
       {
        return value;
       };
       array=initModel.client.reports;
       reports=Arrays.map(mapping,array);
       SlickGrid.SimpleGrid(cols,reports,createNew,{
        $:1,
        $0:processReportGridMessages
       },container1);
       return null;
      };
     });
     processParamGridMessages=function(msg)
     {
      return processMessages({
       $:10,
       $0:msg
      });
     };
     paramGridClass=ClientForm.reactContainerClass("flex flexgrow",function()
     {
      return function(container1)
      {
       var cols,createNew,mapping,array,parameters;
       cols=[{
        id:"Parameter",
        name:"Parameter",
        field:"name"
       },{
        id:"Value",
        name:"Value",
        field:"value",
        editor:Slick.Editors.Text
       }];
       createNew=function()
       {
        return function(id)
        {
         return[id,{
          code:"",
          name:"",
          value:""
         }];
        };
       };
       mapping=function(value)
       {
        return value;
       };
       array=initModel.client.parameters;
       parameters=Arrays.map(mapping,array);
       SlickGrid.SimpleGrid(cols,parameters,createNew,{
        $:1,
        $0:processParamGridMessages
       },container1);
       return null;
      };
     });
     view=function(model)
     {
      return function(processMessages1)
      {
       var buttons,content,buttons1,content1,model1,processMessages2,menuItems,model2,processMessages3,_arg1,model3,processMessages4;
       setGlobalProcessor_({
        $:1,
        $0:processMessages1
       });
       buttons=List.ofArray([["x","btn-xs btn-default  pull-right",execOrderX_],["Save","btn    btn-default  pull-right",saveData_(model)]]);
       buttons1=Runtime.New(T,{
        $:0
       });
       content1=Runtime.New(T,{
        $:0
       });
       model1=model.dialog;
       processMessages2=function(msg)
       {
        return processMessages1({
         $:1,
         $0:msg
        });
       };
       menuItems=List.ofArray([["-",function(x)
       {
        return x;
       }]]);
       model2=model.popup;
       processMessages3=function(msg)
       {
        return processMessages1({
         $:2,
         $0:msg
        });
       };
       _arg1=model.client.industry;
       content=List.ofArray([Dialog.view("title",buttons1,content1,model1,processMessages2),Popup.view(menuItems,model2,processMessages3),ReactHtml.Div(List.ofArray([ReactHtml.Class("flex flexgrow"),Fields.textNotEmpty("Name",model.client.name,function(x)
       {
        return processMessages1({
         $:4,
         $0:x
        });
       },List.ofArray([ReactHtml.Placeholder("enter name"),ReactHtml.MaxLength(150)]),model.form.validations,function(x)
       {
        return processMessages1({
         $:0,
         $0:x
        });
       }),Fields.textWoValidator("Industry",Option1.defaultV("",_arg1),function(x)
       {
        return processMessages1({
         $:5,
         $0:x
        });
       },List.ofArray([ReactHtml.Placeholder("enter industry"),ReactHtml.MaxLength(200)]))])),ReactHtml.Div(List.ofArray([ReactHtml.Class("flex flexgrow flex1"),{
        $:5,
        $0:reportGridClass
       }])),ReactHtml.Div(List.ofArray([ReactHtml.Class("flex flexgrow flex1"),{
        $:5,
        $0:paramGridClass
       }])),ReactHtml.Div(List.ofArray([ReactHtml.Class("flex flexgrow flex1"),{
        $:5,
        $0:serverGridClass
       }]))]);
       model3=model.form;
       processMessages4=function(msg)
       {
        return processMessages1({
         $:0,
         $0:msg
        });
       };
       return GenForm.view(buttons,content,model3,processMessages4);
      };
     };
     update=function(message)
     {
      return function(model)
      {
       return ClientFormClient.update(message,model);
      };
     };
     app=App.app(initModel,update,view);
     return App.run(container,app);
    },
    showForm_:function(title)
    {
     return Browser.withContainerDo("flex flexgrow",function(container)
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:17",[]),function(_arg1)
       {
        return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:0",[_arg1]),function(_arg2)
        {
         var container1,initModel;
         container1=container.Dom;
         initModel=ClientFormClient.init(title,_arg2);
         ClientFormClient.runApp_(_arg1,container1,initModel);
         return _builder_.Zero();
        });
       });
      });
     });
    },
    update:function(message,model)
    {
     var _,clo1,_a,msg,popup,msg1,dialog,f,v,inputRecord,client,v1,inputRecord1,industry,client1,msg2,action,option,msg3,action1,option1,msg4,action2,option2,msg5,_b,b,a,arg0,message1,f2,serverGridProcessorO,data,action3,option3,itemsCallback,msg6,_c,b1,a1,arg01,message2,f3,reportGridProcessorO,data1,action4,option4,itemsCallback1,msg7,_d,b2,a2,arg02,message3,f4,paramGridProcessorO,data2,action5,option5,itemsCallback2,callback,itemsCallback3,msg8;
     if(model.form.debug)
      {
       clo1=function(_1)
       {
        var s,_2,_3,_4,_5,_6,_7;
        _2=function(_8)
        {
         return _8.$==12?"WhenReceiveItems "+PrintfHelpers.prettyPrint(_8.$0):_8.$==11?"ToParamGrid "+_7(_8.$0):_8.$==10?"FromParamGrid "+_6(_8.$0):_8.$==9?"ToReportGrid "+_7(_8.$0):_8.$==8?"FromReportGrid "+_6(_8.$0):_8.$==7?"ToServerGrid "+_7(_8.$0):_8.$==6?"FromServerGrid "+_6(_8.$0):_8.$==5?"IndustryChange "+PrintfHelpers.prettyPrint(_8.$0):_8.$==4?"NameChange "+PrintfHelpers.prettyPrint(_8.$0):_8.$==3?"DoAction "+PrintfHelpers.prettyPrint(_8.$0):_8.$==2?"ToPopupMsg "+_5(_8.$0):_8.$==1?"ToDialogMsg "+_4(_8.$0):"ToFormMsg "+_3(_8.$0);
        };
        _3=function(_8)
        {
         return _8.$==3?"SetDebug "+PrintfHelpers.prettyPrint(_8.$0):_8.$==2?"SetModified "+PrintfHelpers.prettyPrint(_8.$0):_8.$==1?"AddValidation ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.prettyPrint(_8.$1)+")":"ShowInfo ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.prettyPrint(_8.$1)+")";
        };
        _4=function(_8)
        {
         return"ShowDialog "+PrintfHelpers.prettyPrint(_8.$0);
        };
        _5=function(_8)
        {
         return _8.$==2?"HidePopUp":_8.$==1?"AdjustBase ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.prettyPrint(_8.$1)+")":"ShowPopUp ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.prettyPrint(_8.$1)+")";
        };
        _6=function(_8)
        {
         return _8.$==3?"Columns "+PrintfHelpers.printArray(function(_9)
         {
          return PrintfHelpers.prettyPrint(_9);
         },_8.$0):_8.$==2?"Items "+PrintfHelpers.printArray(function(_9)
         {
          return PrintfHelpers.prettyPrint(_9);
         },_8.$0):_8.$==1?"MessageProcessor "+PrintfHelpers.prettyPrint(_8.$0):"ShowInfo ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.prettyPrint(_8.$1)+")";
        };
        _7=function(_8)
        {
         return _8.$==3?"SetItems "+PrintfHelpers.printArray(function(_9)
         {
          return PrintfHelpers.prettyPrint(_9);
         },_8.$0):_8.$==2?"SendColumns":_8.$==1?"SendItems":"Clear";
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
     if(message.$==2)
      {
       msg=message.$0;
       popup=Popup.update(msg,model.popup);
       _a={
        form:model.form,
        dialog:model.dialog,
        popup:popup,
        client:model.client,
        serverGridProcessorO:model.serverGridProcessorO,
        reportGridProcessorO:model.reportGridProcessorO,
        paramGridProcessorO:model.paramGridProcessorO,
        itemsCallback:model.itemsCallback
       };
      }
     else
      {
       if(message.$==1)
        {
         msg1=message.$0;
         dialog=Dialog.update(msg1,model.dialog);
         _a={
          form:model.form,
          dialog:dialog,
          popup:model.popup,
          client:model.client,
          serverGridProcessorO:model.serverGridProcessorO,
          reportGridProcessorO:model.reportGridProcessorO,
          paramGridProcessorO:model.paramGridProcessorO,
          itemsCallback:model.itemsCallback
         };
        }
       else
        {
         if(message.$==3)
          {
           f=message.$0;
           _a=f(model);
          }
         else
          {
           if(message.$==4)
            {
             v=message.$0;
             inputRecord=model.client;
             client={
              code:inputRecord.code,
              name:v,
              industry:inputRecord.industry,
              serverOlaps:inputRecord.serverOlaps,
              reports:inputRecord.reports,
              parameters:inputRecord.parameters
             };
             _a={
              form:GenForm.update({
               $:2,
               $0:true
              },model.form),
              dialog:model.dialog,
              popup:model.popup,
              client:client,
              serverGridProcessorO:model.serverGridProcessorO,
              reportGridProcessorO:model.reportGridProcessorO,
              paramGridProcessorO:model.paramGridProcessorO,
              itemsCallback:model.itemsCallback
             };
            }
           else
            {
             if(message.$==5)
              {
               v1=message.$0;
               inputRecord1=model.client;
               industry={
                $:1,
                $0:v1
               };
               client1={
                code:inputRecord1.code,
                name:inputRecord1.name,
                industry:industry,
                serverOlaps:inputRecord1.serverOlaps,
                reports:inputRecord1.reports,
                parameters:inputRecord1.parameters
               };
               _a={
                form:GenForm.update({
                 $:2,
                 $0:true
                },model.form),
                dialog:model.dialog,
                popup:model.popup,
                client:client1,
                serverGridProcessorO:model.serverGridProcessorO,
                reportGridProcessorO:model.reportGridProcessorO,
                paramGridProcessorO:model.paramGridProcessorO,
                itemsCallback:model.itemsCallback
               };
              }
             else
              {
               if(message.$==7)
                {
                 msg2=message.$0;
                 action=function(f1)
                 {
                  return f1(msg2);
                 };
                 option=model.serverGridProcessorO;
                 Option.iter(action,option);
                 _a=model;
                }
               else
                {
                 if(message.$==9)
                  {
                   msg3=message.$0;
                   action1=function(f1)
                   {
                    return f1(msg3);
                   };
                   option1=model.reportGridProcessorO;
                   Option.iter(action1,option1);
                   _a=model;
                  }
                 else
                  {
                   if(message.$==11)
                    {
                     msg4=message.$0;
                     action2=function(f1)
                     {
                      return f1(msg4);
                     };
                     option2=model.paramGridProcessorO;
                     Option.iter(action2,option2);
                     _a=model;
                    }
                   else
                    {
                     if(message.$==6)
                      {
                       msg5=message.$0;
                       if(msg5.$==0)
                        {
                         b=msg5.$1;
                         a=msg5.$0;
                         arg0={
                          $:0,
                          $0:a,
                          $1:b
                         };
                         message1={
                          $:0,
                          $0:arg0
                         };
                         _b=ClientFormClient.update(message1,model);
                        }
                       else
                        {
                         if(msg5.$==1)
                          {
                           f2=msg5.$0;
                           serverGridProcessorO={
                            $:1,
                            $0:f2
                           };
                           _b={
                            form:model.form,
                            dialog:model.dialog,
                            popup:model.popup,
                            client:model.client,
                            serverGridProcessorO:serverGridProcessorO,
                            reportGridProcessorO:model.reportGridProcessorO,
                            paramGridProcessorO:model.paramGridProcessorO,
                            itemsCallback:model.itemsCallback
                           };
                          }
                         else
                          {
                           if(msg5.$==2)
                            {
                             data=msg5.$0;
                             action3=function(f1)
                             {
                              return f1(Rop1.succeed(data));
                             };
                             option3=model.itemsCallback;
                             Option.iter(action3,option3);
                             itemsCallback={
                              $:0
                             };
                             _b={
                              form:model.form,
                              dialog:model.dialog,
                              popup:model.popup,
                              client:model.client,
                              serverGridProcessorO:model.serverGridProcessorO,
                              reportGridProcessorO:model.reportGridProcessorO,
                              paramGridProcessorO:model.paramGridProcessorO,
                              itemsCallback:itemsCallback
                             };
                            }
                           else
                            {
                             _b=model;
                            }
                          }
                        }
                       _a=_b;
                      }
                     else
                      {
                       if(message.$==8)
                        {
                         msg6=message.$0;
                         if(msg6.$==0)
                          {
                           b1=msg6.$1;
                           a1=msg6.$0;
                           arg01={
                            $:0,
                            $0:a1,
                            $1:b1
                           };
                           message2={
                            $:0,
                            $0:arg01
                           };
                           _c=ClientFormClient.update(message2,model);
                          }
                         else
                          {
                           if(msg6.$==1)
                            {
                             f3=msg6.$0;
                             reportGridProcessorO={
                              $:1,
                              $0:f3
                             };
                             _c={
                              form:model.form,
                              dialog:model.dialog,
                              popup:model.popup,
                              client:model.client,
                              serverGridProcessorO:model.serverGridProcessorO,
                              reportGridProcessorO:reportGridProcessorO,
                              paramGridProcessorO:model.paramGridProcessorO,
                              itemsCallback:model.itemsCallback
                             };
                            }
                           else
                            {
                             if(msg6.$==2)
                              {
                               data1=msg6.$0;
                               action4=function(f1)
                               {
                                return f1(Rop1.succeed(data1));
                               };
                               option4=model.itemsCallback;
                               Option.iter(action4,option4);
                               itemsCallback1={
                                $:0
                               };
                               _c={
                                form:model.form,
                                dialog:model.dialog,
                                popup:model.popup,
                                client:model.client,
                                serverGridProcessorO:model.serverGridProcessorO,
                                reportGridProcessorO:model.reportGridProcessorO,
                                paramGridProcessorO:model.paramGridProcessorO,
                                itemsCallback:itemsCallback1
                               };
                              }
                             else
                              {
                               _c=model;
                              }
                            }
                          }
                         _a=_c;
                        }
                       else
                        {
                         if(message.$==10)
                          {
                           msg7=message.$0;
                           if(msg7.$==0)
                            {
                             b2=msg7.$1;
                             a2=msg7.$0;
                             arg02={
                              $:0,
                              $0:a2,
                              $1:b2
                             };
                             message3={
                              $:0,
                              $0:arg02
                             };
                             _d=ClientFormClient.update(message3,model);
                            }
                           else
                            {
                             if(msg7.$==1)
                              {
                               f4=msg7.$0;
                               paramGridProcessorO={
                                $:1,
                                $0:f4
                               };
                               _d={
                                form:model.form,
                                dialog:model.dialog,
                                popup:model.popup,
                                client:model.client,
                                serverGridProcessorO:model.serverGridProcessorO,
                                reportGridProcessorO:model.reportGridProcessorO,
                                paramGridProcessorO:paramGridProcessorO,
                                itemsCallback:model.itemsCallback
                               };
                              }
                             else
                              {
                               if(msg7.$==2)
                                {
                                 data2=msg7.$0;
                                 action5=function(f1)
                                 {
                                  return f1(Rop1.succeed(data2));
                                 };
                                 option5=model.itemsCallback;
                                 Option.iter(action5,option5);
                                 itemsCallback2={
                                  $:0
                                 };
                                 _d={
                                  form:model.form,
                                  dialog:model.dialog,
                                  popup:model.popup,
                                  client:model.client,
                                  serverGridProcessorO:model.serverGridProcessorO,
                                  reportGridProcessorO:model.reportGridProcessorO,
                                  paramGridProcessorO:model.paramGridProcessorO,
                                  itemsCallback:itemsCallback2
                                 };
                                }
                               else
                                {
                                 _d=model;
                                }
                              }
                            }
                           _a=_d;
                          }
                         else
                          {
                           if(message.$==12)
                            {
                             callback=message.$0;
                             itemsCallback3={
                              $:1,
                              $0:callback
                             };
                             _a={
                              form:model.form,
                              dialog:model.dialog,
                              popup:model.popup,
                              client:model.client,
                              serverGridProcessorO:model.serverGridProcessorO,
                              reportGridProcessorO:model.reportGridProcessorO,
                              paramGridProcessorO:model.paramGridProcessorO,
                              itemsCallback:itemsCallback3
                             };
                            }
                           else
                            {
                             msg8=message.$0;
                             _a={
                              form:GenForm.update(msg8,model.form),
                              dialog:model.dialog,
                              popup:model.popup,
                              client:model.client,
                              serverGridProcessorO:model.serverGridProcessorO,
                              reportGridProcessorO:model.reportGridProcessorO,
                              paramGridProcessorO:model.paramGridProcessorO,
                              itemsCallback:model.itemsCallback
                             };
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
      }
     return _a;
    }
   },
   CubeOlapForm:{
    cubeOlapForm_:function(cube,title,isGuestUser)
    {
     return Browser.withContainerDo("flex flexgrow",function(container)
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:17",[]),function(_arg1)
       {
        var container1,initModel;
        container1=container.Dom;
        initModel=CubeOlapForm.init(title,isGuestUser);
        CubeOlapForm.runApp_(_arg1,cube,container1,initModel);
        return _builder_.Zero();
       });
      });
     });
    },
    init:function(title,isGuestUser)
    {
     return{
      form:GenForm.init(title),
      dialog:Dialog.init(),
      popup:Popup.init(),
      dimensions:[],
      defaults:[],
      isGuestUser:isGuestUser,
      cubeGridProcessorO:{
       $:0
      },
      itemsCallback:{
       $:0
      },
      columnsCallback:{
       $:0
      }
     };
    },
    runApp_:function(token,cube,container,initModel)
    {
     var globalProcessor,setGlobalProcessor_,processMessages,showProcessing,showCompleted,cubeGridClear_,cubeGridGetDataAR_,cubeGridGetColumnsAR_,defaultsRow,readFile_,cubeUploadData_,processCubeGridMessages,cubeGridClass,test_,view,update,app;
     globalProcessor=[{
      $:0
     }];
     setGlobalProcessor_=function(processMsg)
     {
      return globalProcessor[0].$==0?void(globalProcessor[0]=processMsg):null;
     };
     processMessages=function(msg)
     {
      var mapping,option,value;
      mapping=function(f)
      {
       return f(msg);
      };
      option=globalProcessor[0];
      value=Option.map(mapping,option);
      return;
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
       $:0,
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
       $:0,
       $0:arg01
      });
     };
     cubeGridClear_=function()
     {
      var arg0;
      arg0={
       $:0
      };
      return processMessages({
       $:4,
       $0:arg0
      });
     };
     cubeGridGetDataAR_=function()
     {
      return Concurrency.FromContinuations(function(tupledArg)
      {
       var callback,arg0;
       callback=tupledArg[0];
       tupledArg[1];
       tupledArg[2];
       processMessages({
        $:7,
        $0:callback
       });
       arg0={
        $:1
       };
       return processMessages({
        $:4,
        $0:arg0
       });
      });
     };
     cubeGridGetColumnsAR_=function()
     {
      return Concurrency.FromContinuations(function(tupledArg)
      {
       var callback,arg0;
       callback=tupledArg[0];
       tupledArg[1];
       tupledArg[2];
       processMessages({
        $:8,
        $0:callback
       });
       arg0={
        $:2
       };
       return processMessages({
        $:4,
        $0:arg0
       });
      });
     };
     defaultsRow=function(defaults)
     {
      var mapping,array1,array2;
      mapping=function(elem)
      {
       return elem.get_name();
      };
      array1=Arrays.map(mapping,defaults);
      array2=[""];
      return array1.concat(array2);
     };
     readFile_=function(model)
     {
      return function()
      {
       var _builder_;
       _builder_=Server.call();
       return _builder_.Delay(function()
       {
        return _builder_.Bind(cubeGridGetColumnsAR_(null),function(_arg1)
        {
         var mapping,projection,array,cols,value1,_,file,reader,_1;
         mapping=function(i)
         {
          return function(col)
          {
           var value;
           value=col.field;
           return[i,value];
          };
         };
         projection=function(tupledArg)
         {
          var field;
          tupledArg[0];
          field=tupledArg[1];
          return field;
         };
         array=Arrays.mapi(mapping,_arg1);
         cols=Arrays.sortBy(projection,array);
         value1=document.getElementById("filesel").files;
         if(Arrays.length(value1)>0)
          {
           file=Arrays.get(value1,0);
           reader=new FileReader();
           _1=function(e)
           {
            var value,x,mapping1,x1,array1,value3,x2,x3;
            value=e.target.result;
            x=Strings.SplitChars(value,Strings.ToCharArray("\r\n"),1);
            mapping1=function(line)
            {
             var row,mapping2,value2;
             row=Strings.SplitChars(line,Strings.ToCharArray("\u0009"),0);
             mapping2=function(tupledArg)
             {
              var i;
              i=tupledArg[0];
              tupledArg[1];
              return i>=Arrays.length(row)?"":Arrays.get(row,i);
             };
             value2=Arrays.map(mapping2,cols);
             return value2;
            };
            x1=Arrays.map(mapping1,x);
            value3=defaultsRow(model.defaults);
            array1=[value3];
            x2=array1.concat(x1);
            x3={
             $:3,
             $0:x2
            };
            return processMessages({
             $:4,
             $0:x3
            });
           };
           reader.onload=_1;
           reader.readAsText(file);
           _=_builder_.Zero();
          }
         else
          {
           _=_builder_.Zero();
          }
         return _;
        });
       });
      };
     };
     cubeUploadData_=function(model)
     {
      return function()
      {
       var _builder_;
       _builder_=Server.call();
       return _builder_.Delay(function()
       {
        showProcessing("Importing data ...");
        return _builder_.Bind(cubeGridGetDataAR_(null),function(_arg2)
        {
         var mapping,data2;
         mapping=function(row)
         {
          var mapping1,array;
          mapping1=function(i)
          {
           return function()
           {
            return Arrays.get(row,i);
           };
          };
          array=model.dimensions;
          return[Arrays.get(row,Arrays.length(model.dimensions)),Arrays.mapi(mapping1,array)];
         };
         data2=Arrays.map(mapping,_arg2);
         return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:27",[token,cube,data2]),function(_arg3)
         {
          showCompleted(_arg3);
          return _builder_.Zero();
         });
        });
       });
      };
     };
     processCubeGridMessages=function(msg)
     {
      return processMessages({
       $:3,
       $0:msg
      });
     };
     cubeGridClass=ClientForm.reactContainerClass("flex flexgrow",function()
     {
      return function(container1)
      {
       var _builder_;
       _builder_=Server.call();
       return _builder_.Delay(function()
       {
        showProcessing("loading...");
        return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:25",[token,cube]),function(_arg4)
        {
         var vals,dims,mapping,array1,array2,cols,createNew;
         vals=_arg4[1];
         dims=_arg4[0];
         processMessages({
          $:5,
          $0:dims
         });
         processMessages({
          $:6,
          $0:vals
         });
         mapping=function(i)
         {
          return function(dim)
          {
           return{
            id:dim.get_dimOlapId(),
            name:dim.get_name(),
            field:i,
            editor:Slick.Editors.Text
           };
          };
         };
         array1=Arrays.mapi(mapping,dims);
         array2=[{
          id:"#",
          name:"Value",
          field:Arrays.length(dims),
          editor:Slick.Editors.Text
         }];
         cols=array1.concat(array2);
         createNew=function(item)
         {
          return function(id)
          {
           var _,value;
           if(!item?true:item.length<Arrays.length(cols)+1)
            {
             value=Arrays.create(Arrays.length(cols)+1,"");
             _=value;
            }
           else
            {
             _=item;
            }
           return[id,_];
          };
         };
         return _builder_.Bind1(SlickGrid.SimpleGrid(cols,[defaultsRow(vals)],createNew,{
          $:1,
          $0:processCubeGridMessages
         },container1),function()
         {
          showCompleted("");
          return _builder_.Zero();
         });
        });
       });
      };
     });
     test_=function()
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       if(console)
        {
         console.log("loading...");
        }
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:25",[token,cube]),function(_arg6)
       {
        var vals,dims,action;
        vals=_arg6[1];
        dims=_arg6[0];
        action=function(d)
        {
         var a,_builder_1;
         a="Dim: "+PrintfHelpers.toSafe(d.get_name());
         if(console)
          {
           console.log(a);
          }
         _builder_1=Server.call();
         return _builder_1.Delay(function()
         {
          return _builder_1.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:26",[token,d]),function(_arg7)
          {
           var action1;
           action1=function(tupledArg)
           {
            var e,children,_,_1,_2,a1,action2;
            e=tupledArg[0];
            children=tupledArg[1];
            _=d.get_name();
            _1=e.get_elemOlapId();
            _2=e.get_name();
            a1="==> Dim: "+PrintfHelpers.toSafe(_)+", Id: "+PrintfHelpers.toSafe(_1)+", Elem: "+PrintfHelpers.toSafe(_2);
            console?console.log(a1):undefined;
            action2=function(child)
            {
             var a2;
             a2="==>==> Child: "+PrintfHelpers.toSafe(child.get_name());
             return console?console.log(a2):undefined;
            };
            return Arrays.iter(action2,children);
           };
           Arrays.iter(action1,_arg7);
           return _builder_1.Zero();
          });
         });
        };
        Arrays.iter(action,dims);
        return _builder_.Zero();
       });
      });
     };
     view=function(model)
     {
      return function(processMessages1)
      {
       var disabled,buttons,content,buttons1,content1,model1,processMessages2,menuItems,model2,processMessages3,model3,processMessages4;
       setGlobalProcessor_({
        $:1,
        $0:processMessages1
       });
       disabled=model.form.processing?true:model.isGuestUser;
       buttons=List.ofArray([["Upload data","btn btn-default",disabled?function(x)
       {
        return x;
       }:cubeUploadData_(model)],["remove all","btn btn-default",disabled?function(x)
       {
        return x;
       }:cubeGridClear_],["read file","btn btn-default",disabled?function(x)
       {
        return x;
       }:readFile_(model)],["Test!","btn btn-info",test_]]);
       buttons1=Runtime.New(T,{
        $:0
       });
       content1=Runtime.New(T,{
        $:0
       });
       model1=model.dialog;
       processMessages2=function(msg)
       {
        return processMessages1({
         $:1,
         $0:msg
        });
       };
       menuItems=List.ofArray([["-",function(x)
       {
        return x;
       }]]);
       model2=model.popup;
       processMessages3=function(msg)
       {
        return processMessages1({
         $:2,
         $0:msg
        });
       };
       content=List.ofArray([Dialog.view("title",buttons1,content1,model1,processMessages2),Popup.view(menuItems,model2,processMessages3),ReactHtml.Input(List.ofArray([ReactHtml.Type("file"),ReactHtml.Id("filesel")])),ReactHtml.Div(List.ofArray([ReactHtml.Class("flex-row flexgrow"),{
        $:5,
        $0:cubeGridClass
       }]))]);
       model3=model.form;
       processMessages4=function(msg)
       {
        return processMessages1({
         $:0,
         $0:msg
        });
       };
       return GenForm.view(buttons,content,model3,processMessages4);
      };
     };
     update=function(message)
     {
      return function(model)
      {
       return CubeOlapForm.update(message,model);
      };
     };
     app=App.app(initModel,update,view);
     return App.run(container,app);
    },
    update:function(message,model)
    {
     var _,clo1,_d,msg,popup,msg1,dialog,msg2,action,option,msg3,_e,data,action1,option1,itemsCallback,cols,action2,option2,columnsCallback,f1,cubeGridProcessorO,b,a,arg0,message1,callback,itemsCallback1,callback1,columnsCallback1,dims,elems,msg4;
     if(model.form.debug)
      {
       clo1=function(_1)
       {
        var s,_2,_3,_4,_5,_6,_7,_8,_9,_a;
        _2=function(_b)
        {
         return _b.$==8?"WhenReceiveColumns "+PrintfHelpers.prettyPrint(_b.$0):_b.$==7?"WhenReceiveItems "+PrintfHelpers.prettyPrint(_b.$0):_b.$==6?"Defaults "+PrintfHelpers.printArray(function(_c)
         {
          return _a(_c);
         },_b.$0):_b.$==5?"Dimensions "+PrintfHelpers.printArray(function(_c)
         {
          return _8(_c);
         },_b.$0):_b.$==4?"ToCubeGrid "+_7(_b.$0):_b.$==3?"FromCubeGrid "+_6(_b.$0):_b.$==2?"ToPopupMsg "+_5(_b.$0):_b.$==1?"ToDialogMsg "+_4(_b.$0):"ToFormMsg "+_3(_b.$0);
        };
        _3=function(_b)
        {
         return _b.$==3?"SetDebug "+PrintfHelpers.prettyPrint(_b.$0):_b.$==2?"SetModified "+PrintfHelpers.prettyPrint(_b.$0):_b.$==1?"AddValidation ("+PrintfHelpers.prettyPrint(_b.$0)+", "+PrintfHelpers.prettyPrint(_b.$1)+")":"ShowInfo ("+PrintfHelpers.prettyPrint(_b.$0)+", "+PrintfHelpers.prettyPrint(_b.$1)+")";
        };
        _4=function(_b)
        {
         return"ShowDialog "+PrintfHelpers.prettyPrint(_b.$0);
        };
        _5=function(_b)
        {
         return _b.$==2?"HidePopUp":_b.$==1?"AdjustBase ("+PrintfHelpers.prettyPrint(_b.$0)+", "+PrintfHelpers.prettyPrint(_b.$1)+")":"ShowPopUp ("+PrintfHelpers.prettyPrint(_b.$0)+", "+PrintfHelpers.prettyPrint(_b.$1)+")";
        };
        _6=function(_b)
        {
         return _b.$==3?"Columns "+PrintfHelpers.printArray(function(_c)
         {
          return PrintfHelpers.prettyPrint(_c);
         },_b.$0):_b.$==2?"Items "+PrintfHelpers.printArray(function(_c)
         {
          return PrintfHelpers.prettyPrint(_c);
         },_b.$0):_b.$==1?"MessageProcessor "+PrintfHelpers.prettyPrint(_b.$0):"ShowInfo ("+PrintfHelpers.prettyPrint(_b.$0)+", "+PrintfHelpers.prettyPrint(_b.$1)+")";
        };
        _7=function(_b)
        {
         return _b.$==3?"SetItems "+PrintfHelpers.printArray(function(_c)
         {
          return PrintfHelpers.prettyPrint(_c);
         },_b.$0):_b.$==2?"SendColumns":_b.$==1?"SendItems":"Clear";
        };
        _8=function(_b)
        {
         return"DimOlap ("+PrintfHelpers.prettyPrint(_b.$0)+", "+_9(_b.$1)+")";
        };
        _9=function(_b)
        {
         return"ServerOlap "+PrintfHelpers.prettyPrint(_b.$0);
        };
        _a=function(_b)
        {
         return"ElemOlap ("+PrintfHelpers.prettyPrint(_b.$0)+", "+_8(_b.$1)+")";
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
     if(message.$==2)
      {
       msg=message.$0;
       popup=Popup.update(msg,model.popup);
       _d={
        form:model.form,
        dialog:model.dialog,
        popup:popup,
        dimensions:model.dimensions,
        defaults:model.defaults,
        isGuestUser:model.isGuestUser,
        cubeGridProcessorO:model.cubeGridProcessorO,
        itemsCallback:model.itemsCallback,
        columnsCallback:model.columnsCallback
       };
      }
     else
      {
       if(message.$==1)
        {
         msg1=message.$0;
         dialog=Dialog.update(msg1,model.dialog);
         _d={
          form:model.form,
          dialog:dialog,
          popup:model.popup,
          dimensions:model.dimensions,
          defaults:model.defaults,
          isGuestUser:model.isGuestUser,
          cubeGridProcessorO:model.cubeGridProcessorO,
          itemsCallback:model.itemsCallback,
          columnsCallback:model.columnsCallback
         };
        }
       else
        {
         if(message.$==4)
          {
           msg2=message.$0;
           action=function(f)
           {
            return f(msg2);
           };
           option=model.cubeGridProcessorO;
           Option.iter(action,option);
           _d=model;
          }
         else
          {
           if(message.$==3)
            {
             msg3=message.$0;
             if(msg3.$==2)
              {
               data=msg3.$0;
               action1=function(f)
               {
                return f(Rop1.succeed(data));
               };
               option1=model.itemsCallback;
               Option.iter(action1,option1);
               itemsCallback={
                $:0
               };
               _e={
                form:model.form,
                dialog:model.dialog,
                popup:model.popup,
                dimensions:model.dimensions,
                defaults:model.defaults,
                isGuestUser:model.isGuestUser,
                cubeGridProcessorO:model.cubeGridProcessorO,
                itemsCallback:itemsCallback,
                columnsCallback:model.columnsCallback
               };
              }
             else
              {
               if(msg3.$==3)
                {
                 cols=msg3.$0;
                 action2=function(f)
                 {
                  return f(Rop1.succeed(cols));
                 };
                 option2=model.columnsCallback;
                 Option.iter(action2,option2);
                 columnsCallback={
                  $:0
                 };
                 _e={
                  form:model.form,
                  dialog:model.dialog,
                  popup:model.popup,
                  dimensions:model.dimensions,
                  defaults:model.defaults,
                  isGuestUser:model.isGuestUser,
                  cubeGridProcessorO:model.cubeGridProcessorO,
                  itemsCallback:model.itemsCallback,
                  columnsCallback:columnsCallback
                 };
                }
               else
                {
                 if(msg3.$==1)
                  {
                   f1=msg3.$0;
                   cubeGridProcessorO={
                    $:1,
                    $0:f1
                   };
                   _e={
                    form:model.form,
                    dialog:model.dialog,
                    popup:model.popup,
                    dimensions:model.dimensions,
                    defaults:model.defaults,
                    isGuestUser:model.isGuestUser,
                    cubeGridProcessorO:cubeGridProcessorO,
                    itemsCallback:model.itemsCallback,
                    columnsCallback:model.columnsCallback
                   };
                  }
                 else
                  {
                   b=msg3.$1;
                   a=msg3.$0;
                   arg0={
                    $:0,
                    $0:a,
                    $1:b
                   };
                   message1={
                    $:0,
                    $0:arg0
                   };
                   _e=CubeOlapForm.update(message1,model);
                  }
                }
              }
             _d=_e;
            }
           else
            {
             if(message.$==7)
              {
               callback=message.$0;
               itemsCallback1={
                $:1,
                $0:callback
               };
               _d={
                form:model.form,
                dialog:model.dialog,
                popup:model.popup,
                dimensions:model.dimensions,
                defaults:model.defaults,
                isGuestUser:model.isGuestUser,
                cubeGridProcessorO:model.cubeGridProcessorO,
                itemsCallback:itemsCallback1,
                columnsCallback:model.columnsCallback
               };
              }
             else
              {
               if(message.$==8)
                {
                 callback1=message.$0;
                 columnsCallback1={
                  $:1,
                  $0:callback1
                 };
                 _d={
                  form:model.form,
                  dialog:model.dialog,
                  popup:model.popup,
                  dimensions:model.dimensions,
                  defaults:model.defaults,
                  isGuestUser:model.isGuestUser,
                  cubeGridProcessorO:model.cubeGridProcessorO,
                  itemsCallback:model.itemsCallback,
                  columnsCallback:columnsCallback1
                 };
                }
               else
                {
                 if(message.$==5)
                  {
                   dims=message.$0;
                   _d={
                    form:model.form,
                    dialog:model.dialog,
                    popup:model.popup,
                    dimensions:dims,
                    defaults:model.defaults,
                    isGuestUser:model.isGuestUser,
                    cubeGridProcessorO:model.cubeGridProcessorO,
                    itemsCallback:model.itemsCallback,
                    columnsCallback:model.columnsCallback
                   };
                  }
                 else
                  {
                   if(message.$==6)
                    {
                     elems=message.$0;
                     _d={
                      form:model.form,
                      dialog:model.dialog,
                      popup:model.popup,
                      dimensions:model.dimensions,
                      defaults:elems,
                      isGuestUser:model.isGuestUser,
                      cubeGridProcessorO:model.cubeGridProcessorO,
                      itemsCallback:model.itemsCallback,
                      columnsCallback:model.columnsCallback
                     };
                    }
                   else
                    {
                     msg4=message.$0;
                     _d={
                      form:GenForm.update(msg4,model.form),
                      dialog:model.dialog,
                      popup:model.popup,
                      dimensions:model.dimensions,
                      defaults:model.defaults,
                      isGuestUser:model.isGuestUser,
                      cubeGridProcessorO:model.cubeGridProcessorO,
                      itemsCallback:model.itemsCallback,
                      columnsCallback:model.columnsCallback
                     };
                    }
                  }
                }
              }
            }
          }
        }
      }
     return _d;
    }
   },
   DckDockSpawn:{
    addPanel:function(id)
    {
     var x,mapping,value;
     x=DckDockSpawn.globalDocker();
     mapping=function(docker)
     {
      var action,list;
      action=function(_arg1)
      {
       var _id_,_,f;
       _id_=_arg1[0];
       _arg1[1];
       if(id===_id_)
        {
         _arg1[0];
         f=_arg1[1];
         _=DckDockSpawn.createPanel(f,docker);
        }
       else
        {
         _=null;
        }
       return _;
      };
      list=DckDockSpawn.globalPanels();
      return Seq.iter(action,list);
     };
     value=Option.map(mapping,x);
     return;
    },
    createDockEnvironment:function(request)
    {
     var funCall;
     funCall=function(p1)
     {
      return function(p2)
      {
       return function(p3)
       {
        return function(p4)
        {
         var _,panel,_1,_2,_3,_4;
         DckDockSpawn.createDockManager(p1,p2,p3,p4);
         if(request.$==1)
          {
           panel=request.$0;
           _1=function(_5)
           {
            return _5.$==1?"PanelReport ("+_4(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+", "+PrintfHelpers.prettyPrint(_5.$2)+")":"PanelTable ("+_2(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+")";
           };
           _2=function(_5)
           {
            return _5.$==2?"ExternalTable ("+PrintfHelpers.prettyPrint(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+")":_5.$==1?"SystemTable "+PrintfHelpers.prettyPrint(_5.$0):"DimensionTable "+_3(_5.$0);
           };
           _3=function(_5)
           {
            return"Dimension "+PrintfHelpers.prettyPrint(_5.$0);
           };
           _4=function(_5)
           {
            return"Report "+PrintfHelpers.prettyPrint(_5.$0);
           };
           _=DckDockSpawn.addPanel(_1(panel));
          }
         else
          {
           _=null;
          }
         return _;
        };
       };
      };
     };
     return Browser.createDockEnvironment(function(arg00)
     {
      return funCall(arg00);
     });
    },
    createDockManager:function(allPanels,buttonSave,buttonRestore,element)
    {
     var _builder_,R1;
     _builder_=Rop1.flow();
     R1=_builder_.Delay(function()
     {
      return _builder_.Bind(Rop1.tryProtection(),function()
      {
       var dockManager,docManagerResize,_;
       dockManager=new dockspawn.DockManager(element.Dom);
       docManagerResize=function()
       {
        element["HtmlProvider@33"].SetAttribute(element.get_Body(),"style","");
        return dockManager.resize(element.Dom.clientWidth,element.Dom.clientHeight);
       };
       dockManager.initialize();
       window.addEventListener("resize",docManagerResize);
       docManagerResize(null);
       _={
        $:1,
        $0:dockManager
       };
       DckDockSpawn.globalDocker=function()
       {
        return _;
       };
       DckDockSpawn.globalPanels=function()
       {
        return allPanels;
       };
       return _builder_.Zero();
      });
     });
     return Rop1.notifyMessages(R1);
    },
    createPanel:function(f,docker)
    {
     var patternInput,title,container,after,panel,documentNode;
     patternInput=f(null);
     title=patternInput[0];
     container=patternInput[1];
     after=patternInput[2];
     panel=new dockspawn.PanelContainer(container.Dom,docker,title);
     documentNode=docker.context.model.documentManagerNode;
     docker.dockFill(documentNode,panel);
     return after(null);
    },
    globalDocker:Runtime.Field(function()
    {
     return{
      $:0
     };
    }),
    globalPanels:Runtime.Field(function()
    {
     return Runtime.New(T,{
      $:0
     });
    })
   },
   DckGoldenLayout:{
    addPanel:function(id)
    {
     var mapping,option,value;
     mapping=function(docker)
     {
      var panel;
      panel={
       type:"component",
       componentName:id,
       title:id
      };
      return Arrays.get(docker.root.contentItems,0).addChild(panel);
     };
     option=DckGoldenLayout.globalDocker();
     value=Option.map(mapping,option);
     return;
    },
    createDockEnvironment:function(request)
    {
     var funCall;
     funCall=function(p1)
     {
      return function(p2)
      {
       return function(p3)
       {
        return function(p4)
        {
         var _,workspace,panel,_1,_2,_3,_4;
         DckGoldenLayout.createDockManager(p1,p2,p3,p4);
         if(request.$==2)
          {
           workspace=request.$0;
           _=DckGoldenLayout.loadWorkspace(workspace);
          }
         else
          {
           if(request.$==1)
            {
             panel=request.$0;
             _1=function(_5)
             {
              return _5.$==1?"PanelReport ("+_4(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+", "+PrintfHelpers.prettyPrint(_5.$2)+")":"PanelTable ("+_2(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+")";
             };
             _2=function(_5)
             {
              return _5.$==2?"ExternalTable ("+PrintfHelpers.prettyPrint(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+")":_5.$==1?"SystemTable "+PrintfHelpers.prettyPrint(_5.$0):"DimensionTable "+_3(_5.$0);
             };
             _3=function(_5)
             {
              return"Dimension "+PrintfHelpers.prettyPrint(_5.$0);
             };
             _4=function(_5)
             {
              return"Report "+PrintfHelpers.prettyPrint(_5.$0);
             };
             _=DckGoldenLayout.addPanel(_1(panel));
            }
           else
            {
             _=null;
            }
          }
         return _;
        };
       };
      };
     };
     return Browser.createDockEnvironment(function(arg00)
     {
      return funCall(arg00);
     });
    },
    createDockManager:function(allPanels,buttonSave,buttonRestore,element)
    {
     var _builder_,R1;
     _builder_=Rop1.flow();
     R1=_builder_.Delay(function()
     {
      return _builder_.Bind(Rop1.tryProtection(),function()
      {
       var layout,dockManager,action,value,_,arg00,value1,arg001,value2;
       layout={
        content:[{
         type:"stack",
         content:[]
        }]
       };
       dockManager=new GoldenLayout(layout,element.Dom);
       action=function(tupledArg)
       {
        var id,f;
        id=tupledArg[0];
        f=tupledArg[1];
        return dockManager.registerComponent(id,function(c)
        {
         return DckGoldenLayout.createPanelGL(f,c);
        });
       };
       Seq.iter(action,allPanels);
       dockManager.init();
       value=dockManager.container.addClass("flex flexgrow");
       _={
        $:1,
        $0:dockManager
       };
       DckGoldenLayout.globalDocker=function()
       {
        return _;
       };
       arg00=function()
       {
        return function()
        {
         var _1,a;
         _1=JSON.stringify(dockManager.toConfig(),null,2);
         DckGoldenLayout.savedLayout=function()
         {
          return _1;
         };
         a=DckGoldenLayout.savedLayout();
         return console?console.log(a):undefined;
        };
       };
       EventsPervasives.Events().OnClick(arg00,buttonSave);
       value1=buttonSave;
       arg001=function()
       {
        return function()
        {
         dockManager.destroy();
         dockManager.config=JSON.parse(DckGoldenLayout.savedLayout());
         return dockManager.init();
        };
       };
       EventsPervasives.Events().OnClick(arg001,buttonRestore);
       value2=buttonRestore;
       return _builder_.Zero();
      });
     });
     return Rop1.notifyMessages(R1);
    },
    createPanelGL:function(f,c)
    {
     var patternInput,title,container,after,value;
     patternInput=f(null);
     title=patternInput[0];
     container=patternInput[1];
     after=patternInput[2];
     c.setTitle(title);
     value=c.getElement().append(container.Dom);
     return after(null);
    },
    globalDocker:Runtime.Field(function()
    {
     return{
      $:0
     };
    }),
    htmlMessages:function(ms)
    {
     var mapping,source,x1;
     mapping=function(m)
     {
      var arg10,x;
      x=PrintfHelpers.prettyPrint(m);
      arg10=List.ofArray([Tags.Tags().text(x)]);
      return Tags.Tags().NewTag("div",arg10);
     };
     source=Seq.map(mapping,ms);
     x1=Seq.toList(source);
     return Tags.Tags().NewTag("div",x1);
    },
    loadWorkspace:function(workspace)
    {
     var _builder_;
     _builder_=Server.call();
     return _builder_.Delay(function()
     {
      var x,m;
      x=DckGoldenLayout.globalDocker();
      m={
       $:20,
       $0:{
        $:2
       }
      };
      return _builder_.Bind1(Rop1.fromOption(m,x),function(_arg1)
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:19",[workspace.get_getObject()]),function(_arg2)
       {
        _arg1.destroy();
        _arg1.config=JSON.parse(_arg2);
        _arg1.init();
        return _builder_.Zero();
       });
      });
     });
    },
    savedLayout:Runtime.Field(function()
    {
     return"";
    })
   },
   DckPhosphor:{
    addPanel:function(id)
    {
     var x,mapping,value;
     x=DckPhosphor.globalDocker();
     mapping=function(docker)
     {
      var action,list;
      action=function(_arg1)
      {
       var _id_,_,f;
       _id_=_arg1[0];
       _arg1[1];
       if(id===_id_)
        {
         _arg1[0];
         f=_arg1[1];
         _=DckPhosphor.createPanel(f,docker);
        }
       else
        {
         _=null;
        }
       return _;
      };
      list=DckPhosphor.globalPanels();
      return Seq.iter(action,list);
     };
     value=Option.map(mapping,x);
     return;
    },
    createDockEnvironment:function(request)
    {
     var funCall;
     funCall=function(p1)
     {
      return function(p2)
      {
       return function(p3)
       {
        return function(p4)
        {
         var _,panel,_1,_2,_3,_4;
         DckPhosphor.createDockManager(p1,p2,p3,p4);
         if(request.$==1)
          {
           panel=request.$0;
           _1=function(_5)
           {
            return _5.$==1?"PanelReport ("+_4(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+", "+PrintfHelpers.prettyPrint(_5.$2)+")":"PanelTable ("+_2(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+")";
           };
           _2=function(_5)
           {
            return _5.$==2?"ExternalTable ("+PrintfHelpers.prettyPrint(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+")":_5.$==1?"SystemTable "+PrintfHelpers.prettyPrint(_5.$0):"DimensionTable "+_3(_5.$0);
           };
           _3=function(_5)
           {
            return"Dimension "+PrintfHelpers.prettyPrint(_5.$0);
           };
           _4=function(_5)
           {
            return"Report "+PrintfHelpers.prettyPrint(_5.$0);
           };
           _=DckPhosphor.addPanel(_1(panel));
          }
         else
          {
           _=null;
          }
         return _;
        };
       };
      };
     };
     return Browser.createDockEnvironment(function(arg00)
     {
      return funCall(arg00);
     });
    },
    createDockManager:function(allPanels,buttonSave,buttonRestore,element)
    {
     var _builder_,R1;
     _builder_=Rop1.flow();
     R1=_builder_.Delay(function()
     {
      return _builder_.Bind(Rop1.tryProtection(),function()
      {
       var sPanel,_;
       sPanel=new phosphorDockPanel.DockPanel();
       sPanel.addClass("flexgrow");
       sPanel.attach(element.Dom);
       window.addEventListener("resize",function()
       {
        return sPanel.update();
       });
       _={
        $:1,
        $0:sPanel
       };
       DckPhosphor.globalDocker=function()
       {
        return _;
       };
       DckPhosphor.globalPanels=function()
       {
        return allPanels;
       };
       return _builder_.Zero();
      });
     });
     return Rop1.notifyMessages(R1);
    },
    createPanel:function(f,docker)
    {
     var patternInput,title,container,after,widget,value;
     patternInput=f(null);
     title=patternInput[0];
     container=patternInput[1];
     after=patternInput[2];
     widget=new phosphorWidget.Widget();
     widget.title.text=title;
     widget.title.closable=true;
     value=widget.node.appendChild(container.Dom);
     docker.insertTabAfter(widget);
     docker.selectWidget(widget);
     return after(null);
    },
    globalDocker:Runtime.Field(function()
    {
     return{
      $:0
     };
    }),
    globalPanels:Runtime.Field(function()
    {
     return Runtime.New(T,{
      $:0
     });
    })
   },
   DckSingle:{
    addPanel:function(id)
    {
     var x,mapping,value1;
     x=DckSingle.globalDocker();
     mapping=function(docker)
     {
      var value,action,list;
      value=jQuery(docker.Dom).children().remove();
      action=function(_arg1)
      {
       var _id_,_,f;
       _id_=_arg1[0];
       _arg1[1];
       if(id===_id_)
        {
         _arg1[0];
         f=_arg1[1];
         _=DckSingle.createPanel(f,docker);
        }
       else
        {
         _=null;
        }
       return _;
      };
      list=DckSingle.globalPanels();
      return Seq.iter(action,list);
     };
     value1=Option.map(mapping,x);
     return;
    },
    createDockEnvironment:function(request)
    {
     var funCall;
     funCall=function(p1)
     {
      return function(p2)
      {
       return function(p3)
       {
        return function(p4)
        {
         var _,panel,_1,_2,_3,_4;
         DckSingle.createDockManager(p1,p2,p3,p4);
         if(request.$==1)
          {
           panel=request.$0;
           _1=function(_5)
           {
            return _5.$==1?"PanelReport ("+_4(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+", "+PrintfHelpers.prettyPrint(_5.$2)+")":"PanelTable ("+_2(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+")";
           };
           _2=function(_5)
           {
            return _5.$==2?"ExternalTable ("+PrintfHelpers.prettyPrint(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+")":_5.$==1?"SystemTable "+PrintfHelpers.prettyPrint(_5.$0):"DimensionTable "+_3(_5.$0);
           };
           _3=function(_5)
           {
            return"Dimension "+PrintfHelpers.prettyPrint(_5.$0);
           };
           _4=function(_5)
           {
            return"Report "+PrintfHelpers.prettyPrint(_5.$0);
           };
           _=DckSingle.addPanel(_1(panel));
          }
         else
          {
           _=null;
          }
         return _;
        };
       };
      };
     };
     return Browser.createDockEnvironment(function(arg00)
     {
      return funCall(arg00);
     });
    },
    createDockManager:function(allPanels,buttonSave,buttonRestore,element)
    {
     var _builder_,R1;
     _builder_=Rop1.flow();
     R1=_builder_.Delay(function()
     {
      return _builder_.Bind(Rop1.tryProtection(),function()
      {
       var _;
       _={
        $:1,
        $0:element
       };
       DckSingle.globalDocker=function()
       {
        return _;
       };
       DckSingle.globalPanels=function()
       {
        return allPanels;
       };
       return _builder_.Zero();
      });
     });
     return Rop1.notifyMessages(R1);
    },
    createPanel:function(f,docker)
    {
     var patternInput,container,after,value;
     patternInput=f(null);
     patternInput[0];
     container=patternInput[1];
     after=patternInput[2];
     value=Operators.add(docker,List.ofArray([container]));
     return after(null);
    },
    globalDocker:Runtime.Field(function()
    {
     return{
      $:0
     };
    }),
    globalPanels:Runtime.Field(function()
    {
     return Runtime.New(T,{
      $:0
     });
    })
   },
   DckWCDocker:{
    addPanel:function(id)
    {
     var mapping,option,value;
     mapping=function(docker)
     {
      return docker.addPanel(id,"top");
     };
     option=DckWCDocker.globalDocker();
     value=Option.map(mapping,option);
     return;
    },
    createDockEnvironment:function(request)
    {
     var funCall;
     funCall=function(p1)
     {
      return function(p2)
      {
       return function(p3)
       {
        return function(p4)
        {
         var _,workspace,panel,_1,_2,_3,_4;
         DckWCDocker.createDockManager(p1,p2,p3,p4);
         if(request.$==2)
          {
           workspace=request.$0;
           _=DckWCDocker.loadWorkspace(workspace);
          }
         else
          {
           if(request.$==1)
            {
             panel=request.$0;
             _1=function(_5)
             {
              return _5.$==1?"PanelReport ("+_4(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+", "+PrintfHelpers.prettyPrint(_5.$2)+")":"PanelTable ("+_2(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+")";
             };
             _2=function(_5)
             {
              return _5.$==2?"ExternalTable ("+PrintfHelpers.prettyPrint(_5.$0)+", "+PrintfHelpers.prettyPrint(_5.$1)+")":_5.$==1?"SystemTable "+PrintfHelpers.prettyPrint(_5.$0):"DimensionTable "+_3(_5.$0);
             };
             _3=function(_5)
             {
              return"Dimension "+PrintfHelpers.prettyPrint(_5.$0);
             };
             _4=function(_5)
             {
              return"Report "+PrintfHelpers.prettyPrint(_5.$0);
             };
             _=DckWCDocker.addPanel(_1(panel));
            }
           else
            {
             _=null;
            }
          }
         return _;
        };
       };
      };
     };
     return Browser.createDockEnvironment(function(arg00)
     {
      return funCall(arg00);
     });
    },
    createDockManager:function(allPanels,buttonSave,buttonRestore,element)
    {
     var _builder_,R1;
     _builder_=Rop1.flow();
     R1=_builder_.Delay(function()
     {
      return _builder_.Bind(Rop1.tryProtection(),function()
      {
       var docker,action,_,arg00,value,arg001,value1;
       docker=new wcDocker(element.Dom,{
        themePath:"/Resources/css"
       });
       action=function(tupledArg)
       {
        var id,f;
        id=tupledArg[0];
        f=tupledArg[1];
        return docker.registerPanelType(id,{
         onCreate:function(docker1)
         {
          return DckWCDocker.createPanelWC(f,docker1);
         }
        });
       };
       Seq.iter(action,allPanels);
       _={
        $:1,
        $0:docker
       };
       DckWCDocker.globalDocker=function()
       {
        return _;
       };
       arg00=function()
       {
        return function()
        {
         var _1,a;
         _1=docker.save();
         DckWCDocker.savedLayout=function()
         {
          return _1;
         };
         a=DckWCDocker.savedLayout();
         return console?console.log(a):undefined;
        };
       };
       EventsPervasives.Events().OnClick(arg00,buttonSave);
       value=buttonSave;
       arg001=function()
       {
        return function()
        {
         return docker.restore(DckWCDocker.savedLayout());
        };
       };
       EventsPervasives.Events().OnClick(arg001,buttonRestore);
       value1=buttonRestore;
       return _builder_.Zero();
      });
     });
     return Rop1.notifyMessages(R1);
    },
    createPanelWC:function(f,docker)
    {
     var patternInput,title,container,after,value;
     patternInput=f(null);
     title=patternInput[0];
     container=patternInput[1];
     after=patternInput[2];
     docker.layout().addItem(container.Dom);
     value=docker.title(title);
     return after(null);
    },
    globalDocker:Runtime.Field(function()
    {
     return{
      $:0
     };
    }),
    loadWorkspace:function(workspace)
    {
     var _builder_;
     _builder_=Server.call();
     return _builder_.Delay(function()
     {
      var x,m;
      x=DckWCDocker.globalDocker();
      m={
       $:20,
       $0:{
        $:2
       }
      };
      return _builder_.Bind1(Rop1.fromOption(m,x),function(_arg1)
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:19",[workspace.get_getObject()]),function(_arg2)
       {
        _arg1.restore(_arg2);
        return _builder_.Zero();
       });
      });
     });
    },
    savedLayout:Runtime.Field(function()
    {
     return"{\"floating\":[],\"root\":{\"type\":\"wcSplitter\",\"horizontal\":true,\"isDrawer\":false,\"pane0\":{\"type\":\"wcSplitter\",\"horizontal\":false,\"isDrawer\":false,\"pane0\":{\"type\":\"wcFrame\",\"floating\":false,\"isFocus\":false,\"tabOrientation\":\"top\",\"pos\":{\"x\":0.5,\"y\":0.5},\"size\":{},\"tab\":2,\"panels\":[{\"type\":\"wcPanel\",\"panelType\":\"Report 2\",\"size\":{\"x\":-1,\"y\":-1},\"customData\":{}},{\"type\":\"wcPanel\",\"panelType\":\"Report 3\",\"size\":{\"x\":101,\"y\":829},\"customData\":{}},{\"type\":\"wcPanel\",\"panelType\":\"Report 4\",\"size\":{\"x\":101,\"y\":829},\"customData\":{}}]},\"pane1\":{\"type\":\"wcFrame\",\"floating\":false,\"isFocus\":false,\"tabOrientation\":\"top\",\"pos\":{\"x\":1.525381492236894,\"y\":1.276168043596031},\"size\":{\"x\":949,\"y\":413},\"tab\":0,\"panels\":[{\"type\":\"wcPanel\",\"panelType\":\"Table \\\"Parameters\\\"\",\"size\":{\"x\":949,\"y\":413},\"customData\":{}}]},\"pos\":0.7080711438817885},\"pane1\":{\"type\":\"wcSplitter\",\"horizontal\":false,\"isDrawer\":false,\"pane0\":{\"type\":\"wcFrame\",\"floating\":false,\"isFocus\":false,\"tabOrientation\":\"top\",\"pos\":{\"x\":0.5,\"y\":0.5},\"size\":{},\"tab\":0,\"panels\":[{\"type\":\"wcPanel\",\"panelType\":\"Report 6\",\"size\":{\"x\":1270,\"y\":584},\"customData\":{}}]},\"pane1\":{\"type\":\"wcFrame\",\"floating\":false,\"isFocus\":false,\"tabOrientation\":\"top\",\"pos\":{\"x\":3.1477656138118864,\"y\":1.276168043596031},\"size\":{\"x\":611,\"y\":413},\"tab\":0,\"panels\":[{\"type\":\"wcPanel\",\"panelType\":\"Table \\\"Companies\\\"\",\"size\":{\"x\":611,\"y\":413},\"customData\":{}}]},\"pos\":0.6862802598082903},\"pos\":0.6751044053843781},\"collapsers\":{\"left\":{\"size\":0,\"drawer\":{\"closeSize\":0,\"frame\":{\"type\":\"wcFrame\",\"floating\":false,\"isFocus\":false,\"tabOrientation\":\"left\",\"pos\":{\"x\":0.5,\"y\":0.5},\"size\":{\"x\":400,\"y\":400},\"tab\":-1,\"panels\":[]}}},\"right\":{\"size\":18,\"drawer\":{\"closeSize\":18,\"frame\":{\"type\":\"wcFrame\",\"floating\":false,\"isFocus\":false,\"tabOrientation\":\"right\",\"pos\":{\"x\":\"Infinity\",\"y\":1.0907949997603528},\"size\":{\"x\":950,\"y\":827},\"tab\":-1,\"panels\":[{\"type\":\"wcPanel\",\"panelType\":\"Table \\\"Accounts\\\"\",\"size\":{\"x\":950,\"y\":827},\"customData\":{}}]}}},\"bottom\":{\"size\":0,\"drawer\":{\"closeSize\":0,\"frame\":{\"type\":\"wcFrame\",\"floating\":false,\"isFocus\":false,\"tabOrientation\":\"bottom\",\"pos\":{\"x\":0.5,\"y\":0.5},\"size\":{\"x\":400,\"y\":400},\"tab\":-1,\"panels\":[]}}}}}";
    })
   },
   Dialog:{
    init:Runtime.Field(function()
    {
     return{
      show:false
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
    update:function(message)
    {
     var show;
     show=message.$0;
     return{
      show:show
     };
    },
    view:function(title,buttons,content,model,processMessages)
    {
     var _,close_,mapping,buttons1,buttons2,x,node,node1;
     if(model.show)
      {
       close_=function()
       {
        return processMessages({
         $:0,
         $0:false
        });
       };
       mapping=function(tupledArg)
       {
        var a,b,f;
        a=tupledArg[0];
        b=tupledArg[1];
        f=tupledArg[2];
        return[a,b,function()
        {
         close_(null);
         return f(null);
        }];
       };
       buttons1=Seq.map(mapping,buttons);
       buttons2=Dialog.rButtons(buttons1);
       x=ReactHtml.Button(List.ofArray([ReactHtml.Class("close"),{
        $:1,
        $0:"×"
       }]));
       node=ReactHtml.Div(List.ofArray([ReactHtml.Class("modal-body")]));
       node1=ReactHtml.Div(List.ofArray([ReactHtml.Class("modal-footer")]));
       _=ReactHtml.Div(List.ofArray([ReactHtml.Id("dialog"),ReactHtml.Role("dialog"),ReactHtml.Class("modal"),ReactHtml._Style(List.ofArray([ReactHtml._display("block"),ReactHtml._position("fixed"),ReactHtml._marginBottom("5px")])),ReactHtml.Div(List.ofArray([ReactHtml.Class("modal-dialog"),ReactHtml.Div(List.ofArray([ReactHtml.Class("modal-content"),ReactHtml.Div(List.ofArray([ReactHtml.Class("modal-header"),(ReactHtml.OnClick(close_))(x),ReactHtml.H4(List.ofArray([ReactHtml.Class("modal-title"),{
        $:1,
        $0:title
       }]))])),ReactHtml.addChildren(content,node),ReactHtml.addChildren(buttons2,node1)]))]))]));
      }
     else
      {
       _={
        $:6
       };
      }
     return _;
    }
   },
   DimModel:{
    addMoreFields:function(model,processMessages,id,rowSelected,fields,tag)
    {
     var mapping,newChildren;
     mapping=function(i)
     {
      return function(v)
      {
       var i1,selected,_,matchValue,_1,b,a,current,_2,matchValue1,_3,_4,a1,id1,x,a2,styles,arg00,x1,x2,x4;
       i1=i+1;
       if(rowSelected)
        {
         matchValue=model.selection;
         if(matchValue[1].$==1)
          {
           b=matchValue[1].$0[1];
           a=matchValue[1].$0[0];
           _1=(i1>=a?i1<=b:false)?true:i1>=b?i1<=a:false;
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
       selected=_;
       if(rowSelected)
        {
         matchValue1=model.selection;
         if(matchValue1[0].$==1)
          {
           if(matchValue1[1].$==1)
            {
             a1=matchValue1[1].$0[0];
             matchValue1[1].$0[1];
             id1=matchValue1[0].$0[0];
             _4=Unchecked.Equals({
              $:1,
              $0:id1
             },id)?i1===a1:false;
            }
           else
            {
             _4=false;
            }
           _3=_4;
          }
         else
          {
           _3=false;
          }
         _2=_3;
        }
       else
        {
         _2=false;
        }
       current=_2;
       a2=List.ofArray([ReactHtml._paddingLeft("0.5ch"),ReactHtml._paddingRight("0.5ch"),ReactHtml._overflow("hidden"),ReactHtml._textOverflow("ellipsis")]);
       styles=List.append(a2,current?List.ofArray([ReactHtml._background("#EEEEEE"),ReactHtml._border("1px solid")]):selected?List.ofArray([ReactHtml._background(model.capturing?"#fb1009":"#b7ddfd"),ReactHtml._border("1px dotted")]):List.ofArray([ReactHtml._border("1px dotted transparent")]));
       x=tag(List.ofArray([ReactHtml._Style(styles),{
        $:1,
        $0:v
       }]));
       arg00=Seq.toList(Seq.delay(function()
       {
        return current?Seq.append([ReactHtml.TabIndex("1")],Seq.delay(function()
        {
         return[ReactHtml.AutoFocus("")];
        })):Seq.empty();
       }));
       x1=((ReactHtml.addAttributes())(arg00))(x);
       x2=(ReactHtml.OnMouseDown(function(ev)
       {
        var x3;
        DimModel.preventDefault(ev);
        DimModel.focusTable(ev);
        x3=[id,i1];
        return processMessages(((model.capturing?true:ev.shiftKey)?function(tupledArg)
        {
         var arg0,arg1;
         arg0=tupledArg[0];
         arg1=tupledArg[1];
         return{
          $:7,
          $0:arg0,
          $1:arg1
         };
        }:function(tupledArg)
        {
         var arg0,arg1;
         arg0=tupledArg[0];
         arg1=tupledArg[1];
         return{
          $:6,
          $0:arg0,
          $1:arg1
         };
        })(x3));
       }))(x1);
       x4=(ReactHtml.OnMouseOver(function()
       {
        var _5,tupledArg,arg0,arg1;
        if(model.capturing)
         {
          tupledArg=[id,i1];
          arg0=tupledArg[0];
          arg1=tupledArg[1];
          _5=processMessages({
           $:5,
           $0:arg0,
           $1:arg1
          });
         }
        else
         {
          _5=null;
         }
        return _5;
       }))(x2);
       return(ReactHtml.OnMouseUp(function()
       {
        var _5,tupledArg,arg0,arg1;
        if(model.capturing)
         {
          tupledArg=[id,i1];
          arg0=tupledArg[0];
          arg1=tupledArg[1];
          _5=processMessages({
           $:7,
           $0:arg0,
           $1:arg1
          });
         }
        else
         {
          _5=null;
         }
        return _5;
       }))(x4);
      };
     };
     newChildren=List.mapi(mapping,fields);
     return function(node)
     {
      return ReactHtml.addChildren(newChildren,node);
     };
    },
    "double":function(a)
    {
     var mapping;
     mapping=function(a1)
     {
      return[a1,a1];
     };
     return Option.map(mapping,a);
    },
    elemRows:function(model,level,elems)
    {
     var mapping;
     mapping=function(elem)
     {
      var source,value,hasChildren,expanded,matchValue,symbol,item,_,level1,elems1;
      source=elem.children;
      value=Seq.isEmpty(source);
      hasChildren=!value;
      expanded=model.expanded.Contains(elem.id);
      matchValue=[hasChildren,expanded];
      symbol=matchValue[0]?matchValue[1]?"\ue114 ":"\ue080 ":"\ue235 ";
      item=[elem,expanded,symbol,level];
      if(hasChildren?expanded:false)
       {
        level1=level+1;
        elems1=elem.children;
        _=Seq.append(List.ofArray([item]),DimModel.elemRows(model,level1,elems1));
       }
      else
       {
        _=List.ofArray([item]);
       }
      return _;
     };
     return Seq.collect(mapping,elems);
    },
    focusTable:function(ev)
    {
     var table,value;
     table=ev.target.closest.apply(ev.target,["table"]);
     value=table.focus.apply(table,null);
     return;
    },
    getCurrentCol1:function(model)
    {
     var matchValue,_,a;
     matchValue=model.selection;
     if(matchValue[1].$==1)
      {
       matchValue[1].$0[1];
       a=matchValue[1].$0[0];
       _={
        $:1,
        $0:a
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
    getCurrentCol2:function(model)
    {
     var matchValue,_,b;
     matchValue=model.selection;
     if(matchValue[1].$==1)
      {
       b=matchValue[1].$0[1];
       matchValue[1].$0[0];
       _={
        $:1,
        $0:b
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
    getCurrentId1:function(model)
    {
     var matchValue,_,id1;
     matchValue=model.selection;
     if(matchValue[0].$==1)
      {
       matchValue[0].$0[1];
       id1=matchValue[0].$0[0];
       _={
        $:1,
        $0:id1
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
    getCurrentId2:function(model)
    {
     var matchValue,_,id2;
     matchValue=model.selection;
     if(matchValue[0].$==1)
      {
       id2=matchValue[0].$0[1];
       matchValue[0].$0[0];
       _={
        $:1,
        $0:id2
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
    getFirstCol:function()
    {
     return{
      $:1,
      $0:1
     };
    },
    getFirstId:function(model)
    {
     var mapping,source,option;
     mapping=function(elem)
     {
      return elem.id;
     };
     source=model.elements;
     option=Seq1.tryHead(source);
     return Option.map(mapping,option);
    },
    getLastCol:function(model)
    {
     var mapping,option;
     mapping=function(dim)
     {
      return dim.attributes.get_Length()+3;
     };
     option=model.dimension;
     return Option.map(mapping,option);
    },
    getLastId:function(model)
    {
     var mapping,elems,source,option;
     mapping=function(tupledArg)
     {
      var elem;
      elem=tupledArg[0];
      tupledArg[1];
      tupledArg[2];
      tupledArg[3];
      return elem.id;
     };
     elems=model.elements;
     source=DimModel.elemRows(model,0,elems);
     option=Seq1.tryLast(source);
     return Option.map(mapping,option);
    },
    getNextCol0:function(model,currCol)
    {
     var binder,option;
     binder=function(x)
     {
      var binder1;
      binder1=function(i)
      {
       return i>=x?{
        $:0
       }:{
        $:1,
        $0:i+1
       };
      };
      return Option.bind(binder1,currCol);
     };
     option=DimModel.getLastCol(model);
     return Option.bind(binder,option);
    },
    getNextCol1:function(model)
    {
     var currCol;
     currCol=DimModel.getCurrentCol1(model);
     return DimModel.getNextCol0(model,currCol);
    },
    getNextCol2:function(model)
    {
     var currCol;
     currCol=DimModel.getCurrentCol2(model);
     return DimModel.getNextCol0(model,currCol);
    },
    getNextId0:function(model,currId)
    {
     var rows,binder;
     rows=Lazy.Create(function()
     {
      return DimModel.elemRows(model,0,model.elements);
     });
     binder=function(id)
     {
      var predicate,mapping,source,_arg1,option,_,i,_1,i1;
      predicate=function(tupledArg)
      {
       var elem;
       elem=tupledArg[0];
       tupledArg[1];
       tupledArg[2];
       tupledArg[3];
       return Unchecked.Equals(elem.id,id);
      };
      mapping=function(j)
      {
       var _arg2,elem;
       _arg2=Seq.nth(j,rows.eval());
       elem=_arg2[0];
       return elem.id;
      };
      source=rows.eval();
      _arg1=Seq.tryFindIndex(predicate,source);
      if(_arg1.$==1)
       {
        i=_arg1.$0;
        if(i+1<Seq.length(rows.eval()))
         {
          i1=_arg1.$0;
          _1={
           $:1,
           $0:i1+1
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
      option=_;
      return Option.map(mapping,option);
     };
     return Option.bind(binder,currId);
    },
    getNextId1:function(model)
    {
     var currId;
     currId=DimModel.getCurrentId1(model);
     return DimModel.getNextId0(model,currId);
    },
    getNextId2:function(model)
    {
     var currId;
     currId=DimModel.getCurrentId2(model);
     return DimModel.getNextId0(model,currId);
    },
    getPriorCol0:function(model,currCol)
    {
     var binder,option;
     binder=function(x)
     {
      var binder1;
      binder1=function(i)
      {
       return i<=x?{
        $:0
       }:{
        $:1,
        $0:i-1
       };
      };
      return Option.bind(binder1,currCol);
     };
     option=DimModel.getFirstCol(model);
     return Option.bind(binder,option);
    },
    getPriorCol1:function(model)
    {
     var currCol;
     currCol=DimModel.getCurrentCol1(model);
     return DimModel.getPriorCol0(model,currCol);
    },
    getPriorCol2:function(model)
    {
     var currCol;
     currCol=DimModel.getCurrentCol2(model);
     return DimModel.getPriorCol0(model,currCol);
    },
    getPriorId0:function(model,currId)
    {
     var rows,binder;
     rows=Lazy.Create(function()
     {
      return DimModel.elemRows(model,0,model.elements);
     });
     binder=function(id)
     {
      var predicate,mapping,source,_arg1,option,_,i,_1,i1;
      predicate=function(tupledArg)
      {
       var elem;
       elem=tupledArg[0];
       tupledArg[1];
       tupledArg[2];
       tupledArg[3];
       return Unchecked.Equals(elem.id,id);
      };
      mapping=function(j)
      {
       var _arg2,elem;
       _arg2=Seq.nth(j,rows.eval());
       elem=_arg2[0];
       return elem.id;
      };
      source=rows.eval();
      _arg1=Seq.tryFindIndex(predicate,source);
      if(_arg1.$==1)
       {
        i=_arg1.$0;
        if(i>0)
         {
          i1=_arg1.$0;
          _1={
           $:1,
           $0:i1-1
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
      option=_;
      return Option.map(mapping,option);
     };
     return Option.bind(binder,currId);
    },
    getPriorId1:function(model)
    {
     var currId;
     currId=DimModel.getCurrentId1(model);
     return DimModel.getPriorId0(model,currId);
    },
    getPriorId2:function(model)
    {
     var currId;
     currId=DimModel.getCurrentId2(model);
     return DimModel.getPriorId0(model,currId);
    },
    handleKey:function(model,processMessages,ev)
    {
     var value,_,_1,_2,action,option,_3,_4,action1,option1,_5,_6,action2,option2,_7,_8,action3,option3,_9,_a,action4,option5,_b,_c,action6,option6,_d,_e,action7,option7,_f,_10,action8,option8,_11,_12,action9,option9,_13,_14,actiona,optiona,_15,_16,actionb,optionb,_17,_18,actionc,optionc,_19,_1a,actiond,optiond,_1b,_1c,actione,optione,_1d,_1e,actionf,optionf,_1f,_20,action10,option10,_21,_22,action11,option11,_23,_24,action12,option12,_25,_26,action13,option13,_27,_28,action14,option14,_29,_2a,action15,option15,_2b,_2c,action16,option16,_2d,_2e,action17,option17,_2f,_30,action18,option18,_31,_32,action19,option19,_33,_34,action1a,option1a,_35,_36,action1b,option1b,_37,_38,action1c,option1c,_39,_3a,action1d,option1d,_3b,_3c,action1e,option1e,_3d,_3e,action1f,option1f,_3f,_40,action20,option20,_41,_42,action21,option21,_43,_44,action22,option22,_45,_46,action23,option23,_47,_48,action24,option24,_49,_4a,action25,option25,_4b,_4c,action26,option26,_4d,_4e,action27,option27,_4f,_50,action28,option28,_51,_52,action29,option29,_53,_54,action2a,option2a,_55,_56,action2b,option2b,_57,_58,action2c,option2c,_59,_5a,action2d,option2d,_5b,_5c,action2e,option2e,_5d,_5e,action2f,option2f,_5f,_60,action30,option30,_61,_62,action31,option31,_63,_64,action32,option32,_65,_66,action33,option33,_67,_68,action34,option34,_69,_6a,action35,option35,_6b,_6c,action36,option36,_6d,_6e,action37,option37,_6f,_70,action38,option38,_71,_72,action39,option39,_73,_74,action3a,option3a,_75,_76,action3b,option3b,_77,_78,action3c,option3c,_79,_7a,action3d,option3d,_7b,_7c,action3e,option3e,_7d,_7e,action3f,option3f,_7f,_80,action40,option40,_81,_82,action41,option41,_83,_84,action42,option42,_85,_86,action43,option43,_87,_88,action44,option44,_89,_8a,action45,option45,_8b,_8c,action46,option46,_8d,_8e,action47,option47,_8f,_90,action48,option48,_91,_92,action49,option49,_93,_94,action4a,option4a,_95,_96,action4b,option4b,_97,_98,action4c,option4c,_99,_9a,action4d,option4d,_9b,_9c,action4e,option4e,_9d,_9e,action4f,option4f,_9f,_a0,action50,option50,_a1,_a2,action51,option51,_a3,_a4,action52,option52,_a5,_a6,action53,option53,_a7,_a8,action54,option54,_a9,_aa,action55,option55,_ab,_ac,action56,option56,_ad,_ae,action57,option57,_af,_b0,action58,option58,_b1,_b2,action59,option59,_b3,_b4,action5a,option5a,_b5,_b6,action5b,option5b,_b7,_b8,action5c,option5c,_b9,_ba,action5d,option5d,_bb,_bc,action5e,option5e,_bd,_be,action5f,option5f,_bf,_c0,action60,option60,_c1,_c2,action61,option61,_c3,_c4,action62,option62,_c5,_c6,action63,option63,_c7,_c8,action64,option64,_c9,_ca,action65,option65,_cb,_cc,action66,option66,_cd,_ce,action67,option67,_cf,_d0,action68,option68,_d1,_d2,action69,option69,_d3,_d4,action6a,option6a,_d5,_d6,action6b,option6b,_d7,_d8,action6c,option6c,_d9,_da,action6d,option6d,_db,_dc,action6e,option6e,_dd,_de,action6f,option6f,_df,_e0,action70,option70,_e1,_e2,action71,option71,_e3,_e4,action72,option72,_e5,_e6,action73,option73,_e7,_e8,action74,option74,_e9,_ea,action75,option75,_eb,_ec,action76,option76,_ed,_ee,action77,option77,_ef,_f0,action78,option78,_f1,_f2,action79,option79,_f3,_f4,action7a,option7a,_f5,_f6,action7b,option7b,_f7,_f8,action7c,option7c,_f9,_fa,action7d,option7d,_fb,_fc,action7e,option7e,_fd,_fe,action7f,option7f,_ff,_100,action80,option80,_101,_102,action81,option81,_103,_104,action82,option82,_105,_106,action83,option83,_107,_108,action84,option84,_109,_10a,action85,option85,_10b,_10c,action86,option86,_10d,_10e,action87,option87,_10f,_110,action88,option88,_111,_112,action89,option89,_113,_114,action8a,option8a,_115,_116,action8b,option8b,_117,_118,action8c,option8c,_119,_11a,action8d,option8d,_11b,_11c,action8e,option8e,_11d,_11e,action8f,option8f,_11f,_120,action90,option90,_121,_122,action91,option91,_123,_124,action92,option92,_125,_126,action93,option93,_127,_128,action94,option94,_129,_12a,action95,option95,_12b,_12c,action96,option96,_12d,_12e,action97,option97,_12f,_130,action98,option98,_131,_132,action99,option99,_133,_134,action9a,option9a,_135,_136,action9b,option9b,_137,_138,action9c,option9c,_139,_13a,action9d,option9d,_13b,_13c,action9e,option9e,_13d,_13e,action9f,option9f,_13f,_140,actiona0,optiona0,_141,_142,actiona1,optiona1,_143,_144,actiona2,optiona2,_145,_146,actiona3,optiona3,_147,_148,actiona4,optiona4,_149,_14a,actiona5,optiona5,_14b,_14c,actiona6,optiona6,_14d,_14e,actiona7,optiona7,_14f,_150,actiona8,optiona8,_151,_152,actiona9,optiona9,_153,_154,actionaa,optionaa,_155,_156,actionab,optionab,_157,_158,actionac,optionac,_159,_15a,actionad,optionad,_15b,_15c,actionae,optionae,_15d,_15e,actionaf,optionaf,_15f,_160,actionb0,optionb0,_161,_162,actionb1,optionb1,_163,_164,actionb2,optionb2,_165,_166,actionb3,optionb3,_167,_168,actionb4,optionb4,_169,_16a,actionb5,optionb5,_16b,_16c,actionb6,optionb6,_16d,_16e,actionb7,optionb7,_16f,_170,actionb8,optionb8,_171,_172,actionb9,optionb9,_173,_174,actionba,optionba,_175,_176,actionbb,optionbb,_177,_178,actionbc,optionbc,_179,_17a,actionbd,optionbd,_17b,_17c,actionbe,optionbe,_17d,_17e,actionbf,optionbf,_17f,_180,actionc0,optionc0,_181,_182,actionc1,optionc1,_183,_184,actionc2,optionc2,_185,_186,actionc3,optionc3,_187,_188,actionc4,optionc4,_189,_18a,actionc5,optionc5,_18b,_18c,actionc6,optionc6,_18d,_18e,actionc7,optionc7,_18f,_190,actionc8,optionc8,_191,_192,actionc9,optionc9,_193,_194,actionca,optionca,_195,_196,actioncb,optioncb,_197,_198,actioncc,optioncc,_199,_19a,actioncd,optioncd,_19b,_19c,actionce,optionce,_19d,_19e,actioncf,optioncf,_19f,_1a0,actiond0,optiond0,_1a1,_1a2,actiond1,optiond1,_1a3,_1a4,actiond2,optiond2,_1a5,_1a6,actiond3,optiond3,_1a7,_1a8,actiond4,optiond4,_1a9,_1aa,actiond5,optiond5,_1ab,_1ac,actiond6,optiond6,_1ad,_1ae,actiond7,optiond7,_1af,_1b0,actiond8,optiond8,_1b1,_1b2,actiond9,optiond9,_1b3,_1b4,actionda,optionda,_1b5,_1b6,actiondb,optiondb,_1b7,_1b8,actiondc,optiondc,_1b9,_1ba,actiondd,optiondd,_1bb,_1bc,actionde,optionde,_1bd,_1be,actiondf,optiondf,_1bf,_1c0,actione0,optione0,_1c1,_1c2,actione1,optione1,_1c3,_1c4,actione2,optione2,_1c5,_1c6,actione3,optione3,_1c7,_1c8,actione4,optione4,_1c9,_1ca,actione5,optione5,_1cb,_1cc,actione6,optione6,_1cd,_1ce,actione7,optione7,_1cf,_1d0,actione8,optione8,_1d1,_1d2,actione9,optione9,_1d3,_1d4,actionea,optionea,_1d5,_1d6,actioneb,optioneb,_1d7,_1d8,actionec,optionec,_1d9,_1da,actioned,optioned,_1db,_1dc,actionee,optionee,_1dd,_1de,actionef,optionef,_1df,_1e0,actionf0,optionf0,_1e1,_1e2,actionf1,optionf1,_1e3,_1e4,actionf2,optionf2,_1e5,_1e6,actionf3,optionf3,_1e7,_1e8,actionf4,optionf4,_1e9,_1ea,actionf5,optionf5,_1eb,_1ec,actionf6,optionf6,_1ed,_1ee,actionf7,optionf7,_1ef,_1f0,actionf8,optionf8,_1f1,_1f2,actionf9,optionf9,_1f3,_1f4,actionfa,optionfa,_1f5,_1f6,actionfb,optionfb,_1f7,_1f8,actionfc,optionfc,_1f9,_1fa,actionfd,optionfd,_1fb,_1fc,actionfe,optionfe,_1fd,_1fe,actionff,optionff;
     value=ev.key;
     if(value==="Esc")
      {
       _=processMessages({
        $:4,
        $0:{
         $:0
        },
        $1:{
         $:0
        }
       });
      }
     else
      {
       if(value==="ArrowUp")
        {
         if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
          {
           action=function(id)
           {
            var a;
            a=DimModel.getCurrentCol1(model);
            return processMessages({
             $:4,
             $0:{
              $:1,
              $0:[id,id]
             },
             $1:DimModel["double"](a)
            });
           };
           option=DimModel.getPriorId1(model);
           _2=Option.iter(action,option);
          }
         else
          {
           if(value==="ArrowDown")
            {
             if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
              {
               action1=function(id)
               {
                var a;
                a=DimModel.getCurrentCol1(model);
                return processMessages({
                 $:4,
                 $0:{
                  $:1,
                  $0:[id,id]
                 },
                 $1:DimModel["double"](a)
                });
               };
               option1=DimModel.getNextId1(model);
               _4=Option.iter(action1,option1);
              }
             else
              {
               if(value==="ArrowLeft")
                {
                 if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                  {
                   action2=function(i)
                   {
                    var a;
                    a=DimModel.getCurrentId1(model);
                    return processMessages({
                     $:4,
                     $0:DimModel["double"](a),
                     $1:{
                      $:1,
                      $0:[i,i]
                     }
                    });
                   };
                   option2=DimModel.getPriorCol1(model);
                   _6=Option.iter(action2,option2);
                  }
                 else
                  {
                   if(value==="ArrowRight")
                    {
                     if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                      {
                       action3=function(i)
                       {
                        var a;
                        a=DimModel.getCurrentId1(model);
                        return processMessages({
                         $:4,
                         $0:DimModel["double"](a),
                         $1:{
                          $:1,
                          $0:[i,i]
                         }
                        });
                       };
                       option3=DimModel.getNextCol1(model);
                       _8=Option.iter(action3,option3);
                      }
                     else
                      {
                       if(value==="ArrowUp")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action4=function(id)
                           {
                            var action5,option4;
                            action5=function(c)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentCol1(model);
                            return Option.iter(action5,option4);
                           };
                           option5=DimModel.getPriorId1(model);
                           _a=Option.iter(action4,option5);
                          }
                         else
                          {
                           if(value==="ArrowDown")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action6=function(id)
                               {
                                var action5,option4;
                                action5=function(c)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentCol1(model);
                                return Option.iter(action5,option4);
                               };
                               option6=DimModel.getNextId1(model);
                               _c=Option.iter(action6,option6);
                              }
                             else
                              {
                               if(value==="ArrowLeft")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action7=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option7=DimModel.getPriorCol1(model);
                                   _e=Option.iter(action7,option7);
                                  }
                                 else
                                  {
                                   if(value==="ArrowRight")
                                    {
                                     if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                      {
                                       action8=function(c)
                                       {
                                        var action5,option4;
                                        action5=function(id)
                                        {
                                         return processMessages({
                                          $:7,
                                          $0:{
                                           $:1,
                                           $0:id
                                          },
                                          $1:c
                                         });
                                        };
                                        option4=DimModel.getCurrentId1(model);
                                        return Option.iter(action5,option4);
                                       };
                                       option8=DimModel.getNextCol1(model);
                                       _10=Option.iter(action8,option8);
                                      }
                                     else
                                      {
                                       _10=null;
                                      }
                                     _f=_10;
                                    }
                                   else
                                    {
                                     _f=null;
                                    }
                                   _e=_f;
                                  }
                                 _d=_e;
                                }
                               else
                                {
                                 if(value==="ArrowRight")
                                  {
                                   if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                    {
                                     action9=function(c)
                                     {
                                      var action5,option4;
                                      action5=function(id)
                                      {
                                       return processMessages({
                                        $:7,
                                        $0:{
                                         $:1,
                                         $0:id
                                        },
                                        $1:c
                                       });
                                      };
                                      option4=DimModel.getCurrentId1(model);
                                      return Option.iter(action5,option4);
                                     };
                                     option9=DimModel.getNextCol1(model);
                                     _12=Option.iter(action9,option9);
                                    }
                                   else
                                    {
                                     _12=null;
                                    }
                                   _11=_12;
                                  }
                                 else
                                  {
                                   _11=null;
                                  }
                                 _d=_11;
                                }
                               _c=_d;
                              }
                             _b=_c;
                            }
                           else
                            {
                             if(value==="ArrowLeft")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 actiona=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 optiona=DimModel.getPriorCol1(model);
                                 _14=Option.iter(actiona,optiona);
                                }
                               else
                                {
                                 if(value==="ArrowRight")
                                  {
                                   if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                    {
                                     actionb=function(c)
                                     {
                                      var action5,option4;
                                      action5=function(id)
                                      {
                                       return processMessages({
                                        $:7,
                                        $0:{
                                         $:1,
                                         $0:id
                                        },
                                        $1:c
                                       });
                                      };
                                      option4=DimModel.getCurrentId1(model);
                                      return Option.iter(action5,option4);
                                     };
                                     optionb=DimModel.getNextCol1(model);
                                     _16=Option.iter(actionb,optionb);
                                    }
                                   else
                                    {
                                     _16=null;
                                    }
                                   _15=_16;
                                  }
                                 else
                                  {
                                   _15=null;
                                  }
                                 _14=_15;
                                }
                               _13=_14;
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   actionc=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   optionc=DimModel.getNextCol1(model);
                                   _18=Option.iter(actionc,optionc);
                                  }
                                 else
                                  {
                                   _18=null;
                                  }
                                 _17=_18;
                                }
                               else
                                {
                                 _17=null;
                                }
                               _13=_17;
                              }
                             _b=_13;
                            }
                           _a=_b;
                          }
                         _9=_a;
                        }
                       else
                        {
                         if(value==="ArrowDown")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actiond=function(id)
                             {
                              var action5,option4;
                              action5=function(c)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentCol1(model);
                              return Option.iter(action5,option4);
                             };
                             optiond=DimModel.getNextId1(model);
                             _1a=Option.iter(actiond,optiond);
                            }
                           else
                            {
                             if(value==="ArrowLeft")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 actione=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 optione=DimModel.getPriorCol1(model);
                                 _1c=Option.iter(actione,optione);
                                }
                               else
                                {
                                 if(value==="ArrowRight")
                                  {
                                   if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                    {
                                     actionf=function(c)
                                     {
                                      var action5,option4;
                                      action5=function(id)
                                      {
                                       return processMessages({
                                        $:7,
                                        $0:{
                                         $:1,
                                         $0:id
                                        },
                                        $1:c
                                       });
                                      };
                                      option4=DimModel.getCurrentId1(model);
                                      return Option.iter(action5,option4);
                                     };
                                     optionf=DimModel.getNextCol1(model);
                                     _1e=Option.iter(actionf,optionf);
                                    }
                                   else
                                    {
                                     _1e=null;
                                    }
                                   _1d=_1e;
                                  }
                                 else
                                  {
                                   _1d=null;
                                  }
                                 _1c=_1d;
                                }
                               _1b=_1c;
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action10=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option10=DimModel.getNextCol1(model);
                                   _20=Option.iter(action10,option10);
                                  }
                                 else
                                  {
                                   _20=null;
                                  }
                                 _1f=_20;
                                }
                               else
                                {
                                 _1f=null;
                                }
                               _1b=_1f;
                              }
                             _1a=_1b;
                            }
                           _19=_1a;
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action11=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option11=DimModel.getPriorCol1(model);
                               _22=Option.iter(action11,option11);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action12=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option12=DimModel.getNextCol1(model);
                                   _24=Option.iter(action12,option12);
                                  }
                                 else
                                  {
                                   _24=null;
                                  }
                                 _23=_24;
                                }
                               else
                                {
                                 _23=null;
                                }
                               _22=_23;
                              }
                             _21=_22;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action13=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option13=DimModel.getNextCol1(model);
                                 _26=Option.iter(action13,option13);
                                }
                               else
                                {
                                 _26=null;
                                }
                               _25=_26;
                              }
                             else
                              {
                               _25=null;
                              }
                             _21=_25;
                            }
                           _19=_21;
                          }
                         _9=_19;
                        }
                       _8=_9;
                      }
                     _7=_8;
                    }
                   else
                    {
                     if(value==="ArrowUp")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         action14=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         option14=DimModel.getPriorId1(model);
                         _28=Option.iter(action14,option14);
                        }
                       else
                        {
                         if(value==="ArrowDown")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action15=function(id)
                             {
                              var action5,option4;
                              action5=function(c)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentCol1(model);
                              return Option.iter(action5,option4);
                             };
                             option15=DimModel.getNextId1(model);
                             _2a=Option.iter(action15,option15);
                            }
                           else
                            {
                             if(value==="ArrowLeft")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action16=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option16=DimModel.getPriorCol1(model);
                                 _2c=Option.iter(action16,option16);
                                }
                               else
                                {
                                 if(value==="ArrowRight")
                                  {
                                   if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                    {
                                     action17=function(c)
                                     {
                                      var action5,option4;
                                      action5=function(id)
                                      {
                                       return processMessages({
                                        $:7,
                                        $0:{
                                         $:1,
                                         $0:id
                                        },
                                        $1:c
                                       });
                                      };
                                      option4=DimModel.getCurrentId1(model);
                                      return Option.iter(action5,option4);
                                     };
                                     option17=DimModel.getNextCol1(model);
                                     _2e=Option.iter(action17,option17);
                                    }
                                   else
                                    {
                                     _2e=null;
                                    }
                                   _2d=_2e;
                                  }
                                 else
                                  {
                                   _2d=null;
                                  }
                                 _2c=_2d;
                                }
                               _2b=_2c;
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action18=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option18=DimModel.getNextCol1(model);
                                   _30=Option.iter(action18,option18);
                                  }
                                 else
                                  {
                                   _30=null;
                                  }
                                 _2f=_30;
                                }
                               else
                                {
                                 _2f=null;
                                }
                               _2b=_2f;
                              }
                             _2a=_2b;
                            }
                           _29=_2a;
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action19=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option19=DimModel.getPriorCol1(model);
                               _32=Option.iter(action19,option19);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action1a=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option1a=DimModel.getNextCol1(model);
                                   _34=Option.iter(action1a,option1a);
                                  }
                                 else
                                  {
                                   _34=null;
                                  }
                                 _33=_34;
                                }
                               else
                                {
                                 _33=null;
                                }
                               _32=_33;
                              }
                             _31=_32;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action1b=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option1b=DimModel.getNextCol1(model);
                                 _36=Option.iter(action1b,option1b);
                                }
                               else
                                {
                                 _36=null;
                                }
                               _35=_36;
                              }
                             else
                              {
                               _35=null;
                              }
                             _31=_35;
                            }
                           _29=_31;
                          }
                         _28=_29;
                        }
                       _27=_28;
                      }
                     else
                      {
                       if(value==="ArrowDown")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action1c=function(id)
                           {
                            var action5,option4;
                            action5=function(c)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentCol1(model);
                            return Option.iter(action5,option4);
                           };
                           option1c=DimModel.getNextId1(model);
                           _38=Option.iter(action1c,option1c);
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action1d=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option1d=DimModel.getPriorCol1(model);
                               _3a=Option.iter(action1d,option1d);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action1e=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option1e=DimModel.getNextCol1(model);
                                   _3c=Option.iter(action1e,option1e);
                                  }
                                 else
                                  {
                                   _3c=null;
                                  }
                                 _3b=_3c;
                                }
                               else
                                {
                                 _3b=null;
                                }
                               _3a=_3b;
                              }
                             _39=_3a;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action1f=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option1f=DimModel.getNextCol1(model);
                                 _3e=Option.iter(action1f,option1f);
                                }
                               else
                                {
                                 _3e=null;
                                }
                               _3d=_3e;
                              }
                             else
                              {
                               _3d=null;
                              }
                             _39=_3d;
                            }
                           _38=_39;
                          }
                         _37=_38;
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action20=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option20=DimModel.getPriorCol1(model);
                             _40=Option.iter(action20,option20);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action21=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option21=DimModel.getNextCol1(model);
                                 _42=Option.iter(action21,option21);
                                }
                               else
                                {
                                 _42=null;
                                }
                               _41=_42;
                              }
                             else
                              {
                               _41=null;
                              }
                             _40=_41;
                            }
                           _3f=_40;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action22=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option22=DimModel.getNextCol1(model);
                               _44=Option.iter(action22,option22);
                              }
                             else
                              {
                               _44=null;
                              }
                             _43=_44;
                            }
                           else
                            {
                             _43=null;
                            }
                           _3f=_43;
                          }
                         _37=_3f;
                        }
                       _27=_37;
                      }
                     _7=_27;
                    }
                   _6=_7;
                  }
                 _5=_6;
                }
               else
                {
                 if(value==="ArrowRight")
                  {
                   if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                    {
                     action23=function(i)
                     {
                      var a;
                      a=DimModel.getCurrentId1(model);
                      return processMessages({
                       $:4,
                       $0:DimModel["double"](a),
                       $1:{
                        $:1,
                        $0:[i,i]
                       }
                      });
                     };
                     option23=DimModel.getNextCol1(model);
                     _46=Option.iter(action23,option23);
                    }
                   else
                    {
                     if(value==="ArrowUp")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         action24=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         option24=DimModel.getPriorId1(model);
                         _48=Option.iter(action24,option24);
                        }
                       else
                        {
                         if(value==="ArrowDown")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action25=function(id)
                             {
                              var action5,option4;
                              action5=function(c)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentCol1(model);
                              return Option.iter(action5,option4);
                             };
                             option25=DimModel.getNextId1(model);
                             _4a=Option.iter(action25,option25);
                            }
                           else
                            {
                             if(value==="ArrowLeft")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action26=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option26=DimModel.getPriorCol1(model);
                                 _4c=Option.iter(action26,option26);
                                }
                               else
                                {
                                 if(value==="ArrowRight")
                                  {
                                   if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                    {
                                     action27=function(c)
                                     {
                                      var action5,option4;
                                      action5=function(id)
                                      {
                                       return processMessages({
                                        $:7,
                                        $0:{
                                         $:1,
                                         $0:id
                                        },
                                        $1:c
                                       });
                                      };
                                      option4=DimModel.getCurrentId1(model);
                                      return Option.iter(action5,option4);
                                     };
                                     option27=DimModel.getNextCol1(model);
                                     _4e=Option.iter(action27,option27);
                                    }
                                   else
                                    {
                                     _4e=null;
                                    }
                                   _4d=_4e;
                                  }
                                 else
                                  {
                                   _4d=null;
                                  }
                                 _4c=_4d;
                                }
                               _4b=_4c;
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action28=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option28=DimModel.getNextCol1(model);
                                   _50=Option.iter(action28,option28);
                                  }
                                 else
                                  {
                                   _50=null;
                                  }
                                 _4f=_50;
                                }
                               else
                                {
                                 _4f=null;
                                }
                               _4b=_4f;
                              }
                             _4a=_4b;
                            }
                           _49=_4a;
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action29=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option29=DimModel.getPriorCol1(model);
                               _52=Option.iter(action29,option29);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action2a=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option2a=DimModel.getNextCol1(model);
                                   _54=Option.iter(action2a,option2a);
                                  }
                                 else
                                  {
                                   _54=null;
                                  }
                                 _53=_54;
                                }
                               else
                                {
                                 _53=null;
                                }
                               _52=_53;
                              }
                             _51=_52;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action2b=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option2b=DimModel.getNextCol1(model);
                                 _56=Option.iter(action2b,option2b);
                                }
                               else
                                {
                                 _56=null;
                                }
                               _55=_56;
                              }
                             else
                              {
                               _55=null;
                              }
                             _51=_55;
                            }
                           _49=_51;
                          }
                         _48=_49;
                        }
                       _47=_48;
                      }
                     else
                      {
                       if(value==="ArrowDown")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action2c=function(id)
                           {
                            var action5,option4;
                            action5=function(c)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentCol1(model);
                            return Option.iter(action5,option4);
                           };
                           option2c=DimModel.getNextId1(model);
                           _58=Option.iter(action2c,option2c);
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action2d=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option2d=DimModel.getPriorCol1(model);
                               _5a=Option.iter(action2d,option2d);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action2e=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option2e=DimModel.getNextCol1(model);
                                   _5c=Option.iter(action2e,option2e);
                                  }
                                 else
                                  {
                                   _5c=null;
                                  }
                                 _5b=_5c;
                                }
                               else
                                {
                                 _5b=null;
                                }
                               _5a=_5b;
                              }
                             _59=_5a;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action2f=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option2f=DimModel.getNextCol1(model);
                                 _5e=Option.iter(action2f,option2f);
                                }
                               else
                                {
                                 _5e=null;
                                }
                               _5d=_5e;
                              }
                             else
                              {
                               _5d=null;
                              }
                             _59=_5d;
                            }
                           _58=_59;
                          }
                         _57=_58;
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action30=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option30=DimModel.getPriorCol1(model);
                             _60=Option.iter(action30,option30);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action31=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option31=DimModel.getNextCol1(model);
                                 _62=Option.iter(action31,option31);
                                }
                               else
                                {
                                 _62=null;
                                }
                               _61=_62;
                              }
                             else
                              {
                               _61=null;
                              }
                             _60=_61;
                            }
                           _5f=_60;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action32=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option32=DimModel.getNextCol1(model);
                               _64=Option.iter(action32,option32);
                              }
                             else
                              {
                               _64=null;
                              }
                             _63=_64;
                            }
                           else
                            {
                             _63=null;
                            }
                           _5f=_63;
                          }
                         _57=_5f;
                        }
                       _47=_57;
                      }
                     _46=_47;
                    }
                   _45=_46;
                  }
                 else
                  {
                   if(value==="ArrowUp")
                    {
                     if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                      {
                       action33=function(id)
                       {
                        var action5,option4;
                        action5=function(c)
                        {
                         return processMessages({
                          $:7,
                          $0:{
                           $:1,
                           $0:id
                          },
                          $1:c
                         });
                        };
                        option4=DimModel.getCurrentCol1(model);
                        return Option.iter(action5,option4);
                       };
                       option33=DimModel.getPriorId1(model);
                       _66=Option.iter(action33,option33);
                      }
                     else
                      {
                       if(value==="ArrowDown")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action34=function(id)
                           {
                            var action5,option4;
                            action5=function(c)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentCol1(model);
                            return Option.iter(action5,option4);
                           };
                           option34=DimModel.getNextId1(model);
                           _68=Option.iter(action34,option34);
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action35=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option35=DimModel.getPriorCol1(model);
                               _6a=Option.iter(action35,option35);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action36=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option36=DimModel.getNextCol1(model);
                                   _6c=Option.iter(action36,option36);
                                  }
                                 else
                                  {
                                   _6c=null;
                                  }
                                 _6b=_6c;
                                }
                               else
                                {
                                 _6b=null;
                                }
                               _6a=_6b;
                              }
                             _69=_6a;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action37=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option37=DimModel.getNextCol1(model);
                                 _6e=Option.iter(action37,option37);
                                }
                               else
                                {
                                 _6e=null;
                                }
                               _6d=_6e;
                              }
                             else
                              {
                               _6d=null;
                              }
                             _69=_6d;
                            }
                           _68=_69;
                          }
                         _67=_68;
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action38=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option38=DimModel.getPriorCol1(model);
                             _70=Option.iter(action38,option38);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action39=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option39=DimModel.getNextCol1(model);
                                 _72=Option.iter(action39,option39);
                                }
                               else
                                {
                                 _72=null;
                                }
                               _71=_72;
                              }
                             else
                              {
                               _71=null;
                              }
                             _70=_71;
                            }
                           _6f=_70;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action3a=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option3a=DimModel.getNextCol1(model);
                               _74=Option.iter(action3a,option3a);
                              }
                             else
                              {
                               _74=null;
                              }
                             _73=_74;
                            }
                           else
                            {
                             _73=null;
                            }
                           _6f=_73;
                          }
                         _67=_6f;
                        }
                       _66=_67;
                      }
                     _65=_66;
                    }
                   else
                    {
                     if(value==="ArrowDown")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         action3b=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         option3b=DimModel.getNextId1(model);
                         _76=Option.iter(action3b,option3b);
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action3c=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option3c=DimModel.getPriorCol1(model);
                             _78=Option.iter(action3c,option3c);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action3d=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option3d=DimModel.getNextCol1(model);
                                 _7a=Option.iter(action3d,option3d);
                                }
                               else
                                {
                                 _7a=null;
                                }
                               _79=_7a;
                              }
                             else
                              {
                               _79=null;
                              }
                             _78=_79;
                            }
                           _77=_78;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action3e=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option3e=DimModel.getNextCol1(model);
                               _7c=Option.iter(action3e,option3e);
                              }
                             else
                              {
                               _7c=null;
                              }
                             _7b=_7c;
                            }
                           else
                            {
                             _7b=null;
                            }
                           _77=_7b;
                          }
                         _76=_77;
                        }
                       _75=_76;
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action3f=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           option3f=DimModel.getPriorCol1(model);
                           _7e=Option.iter(action3f,option3f);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action40=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option40=DimModel.getNextCol1(model);
                               _80=Option.iter(action40,option40);
                              }
                             else
                              {
                               _80=null;
                              }
                             _7f=_80;
                            }
                           else
                            {
                             _7f=null;
                            }
                           _7e=_7f;
                          }
                         _7d=_7e;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action41=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option41=DimModel.getNextCol1(model);
                             _82=Option.iter(action41,option41);
                            }
                           else
                            {
                             _82=null;
                            }
                           _81=_82;
                          }
                         else
                          {
                           _81=null;
                          }
                         _7d=_81;
                        }
                       _75=_7d;
                      }
                     _65=_75;
                    }
                   _45=_65;
                  }
                 _5=_45;
                }
               _4=_5;
              }
             _3=_4;
            }
           else
            {
             if(value==="ArrowLeft")
              {
               if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                {
                 action42=function(i)
                 {
                  var a;
                  a=DimModel.getCurrentId1(model);
                  return processMessages({
                   $:4,
                   $0:DimModel["double"](a),
                   $1:{
                    $:1,
                    $0:[i,i]
                   }
                  });
                 };
                 option42=DimModel.getPriorCol1(model);
                 _84=Option.iter(action42,option42);
                }
               else
                {
                 if(value==="ArrowRight")
                  {
                   if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                    {
                     action43=function(i)
                     {
                      var a;
                      a=DimModel.getCurrentId1(model);
                      return processMessages({
                       $:4,
                       $0:DimModel["double"](a),
                       $1:{
                        $:1,
                        $0:[i,i]
                       }
                      });
                     };
                     option43=DimModel.getNextCol1(model);
                     _86=Option.iter(action43,option43);
                    }
                   else
                    {
                     if(value==="ArrowUp")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         action44=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         option44=DimModel.getPriorId1(model);
                         _88=Option.iter(action44,option44);
                        }
                       else
                        {
                         if(value==="ArrowDown")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action45=function(id)
                             {
                              var action5,option4;
                              action5=function(c)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentCol1(model);
                              return Option.iter(action5,option4);
                             };
                             option45=DimModel.getNextId1(model);
                             _8a=Option.iter(action45,option45);
                            }
                           else
                            {
                             if(value==="ArrowLeft")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action46=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option46=DimModel.getPriorCol1(model);
                                 _8c=Option.iter(action46,option46);
                                }
                               else
                                {
                                 if(value==="ArrowRight")
                                  {
                                   if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                    {
                                     action47=function(c)
                                     {
                                      var action5,option4;
                                      action5=function(id)
                                      {
                                       return processMessages({
                                        $:7,
                                        $0:{
                                         $:1,
                                         $0:id
                                        },
                                        $1:c
                                       });
                                      };
                                      option4=DimModel.getCurrentId1(model);
                                      return Option.iter(action5,option4);
                                     };
                                     option47=DimModel.getNextCol1(model);
                                     _8e=Option.iter(action47,option47);
                                    }
                                   else
                                    {
                                     _8e=null;
                                    }
                                   _8d=_8e;
                                  }
                                 else
                                  {
                                   _8d=null;
                                  }
                                 _8c=_8d;
                                }
                               _8b=_8c;
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action48=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option48=DimModel.getNextCol1(model);
                                   _90=Option.iter(action48,option48);
                                  }
                                 else
                                  {
                                   _90=null;
                                  }
                                 _8f=_90;
                                }
                               else
                                {
                                 _8f=null;
                                }
                               _8b=_8f;
                              }
                             _8a=_8b;
                            }
                           _89=_8a;
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action49=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option49=DimModel.getPriorCol1(model);
                               _92=Option.iter(action49,option49);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action4a=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option4a=DimModel.getNextCol1(model);
                                   _94=Option.iter(action4a,option4a);
                                  }
                                 else
                                  {
                                   _94=null;
                                  }
                                 _93=_94;
                                }
                               else
                                {
                                 _93=null;
                                }
                               _92=_93;
                              }
                             _91=_92;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action4b=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option4b=DimModel.getNextCol1(model);
                                 _96=Option.iter(action4b,option4b);
                                }
                               else
                                {
                                 _96=null;
                                }
                               _95=_96;
                              }
                             else
                              {
                               _95=null;
                              }
                             _91=_95;
                            }
                           _89=_91;
                          }
                         _88=_89;
                        }
                       _87=_88;
                      }
                     else
                      {
                       if(value==="ArrowDown")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action4c=function(id)
                           {
                            var action5,option4;
                            action5=function(c)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentCol1(model);
                            return Option.iter(action5,option4);
                           };
                           option4c=DimModel.getNextId1(model);
                           _98=Option.iter(action4c,option4c);
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action4d=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option4d=DimModel.getPriorCol1(model);
                               _9a=Option.iter(action4d,option4d);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action4e=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option4e=DimModel.getNextCol1(model);
                                   _9c=Option.iter(action4e,option4e);
                                  }
                                 else
                                  {
                                   _9c=null;
                                  }
                                 _9b=_9c;
                                }
                               else
                                {
                                 _9b=null;
                                }
                               _9a=_9b;
                              }
                             _99=_9a;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action4f=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option4f=DimModel.getNextCol1(model);
                                 _9e=Option.iter(action4f,option4f);
                                }
                               else
                                {
                                 _9e=null;
                                }
                               _9d=_9e;
                              }
                             else
                              {
                               _9d=null;
                              }
                             _99=_9d;
                            }
                           _98=_99;
                          }
                         _97=_98;
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action50=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option50=DimModel.getPriorCol1(model);
                             _a0=Option.iter(action50,option50);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action51=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option51=DimModel.getNextCol1(model);
                                 _a2=Option.iter(action51,option51);
                                }
                               else
                                {
                                 _a2=null;
                                }
                               _a1=_a2;
                              }
                             else
                              {
                               _a1=null;
                              }
                             _a0=_a1;
                            }
                           _9f=_a0;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action52=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option52=DimModel.getNextCol1(model);
                               _a4=Option.iter(action52,option52);
                              }
                             else
                              {
                               _a4=null;
                              }
                             _a3=_a4;
                            }
                           else
                            {
                             _a3=null;
                            }
                           _9f=_a3;
                          }
                         _97=_9f;
                        }
                       _87=_97;
                      }
                     _86=_87;
                    }
                   _85=_86;
                  }
                 else
                  {
                   if(value==="ArrowUp")
                    {
                     if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                      {
                       action53=function(id)
                       {
                        var action5,option4;
                        action5=function(c)
                        {
                         return processMessages({
                          $:7,
                          $0:{
                           $:1,
                           $0:id
                          },
                          $1:c
                         });
                        };
                        option4=DimModel.getCurrentCol1(model);
                        return Option.iter(action5,option4);
                       };
                       option53=DimModel.getPriorId1(model);
                       _a6=Option.iter(action53,option53);
                      }
                     else
                      {
                       if(value==="ArrowDown")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action54=function(id)
                           {
                            var action5,option4;
                            action5=function(c)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentCol1(model);
                            return Option.iter(action5,option4);
                           };
                           option54=DimModel.getNextId1(model);
                           _a8=Option.iter(action54,option54);
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action55=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option55=DimModel.getPriorCol1(model);
                               _aa=Option.iter(action55,option55);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action56=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option56=DimModel.getNextCol1(model);
                                   _ac=Option.iter(action56,option56);
                                  }
                                 else
                                  {
                                   _ac=null;
                                  }
                                 _ab=_ac;
                                }
                               else
                                {
                                 _ab=null;
                                }
                               _aa=_ab;
                              }
                             _a9=_aa;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action57=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option57=DimModel.getNextCol1(model);
                                 _ae=Option.iter(action57,option57);
                                }
                               else
                                {
                                 _ae=null;
                                }
                               _ad=_ae;
                              }
                             else
                              {
                               _ad=null;
                              }
                             _a9=_ad;
                            }
                           _a8=_a9;
                          }
                         _a7=_a8;
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action58=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option58=DimModel.getPriorCol1(model);
                             _b0=Option.iter(action58,option58);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action59=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option59=DimModel.getNextCol1(model);
                                 _b2=Option.iter(action59,option59);
                                }
                               else
                                {
                                 _b2=null;
                                }
                               _b1=_b2;
                              }
                             else
                              {
                               _b1=null;
                              }
                             _b0=_b1;
                            }
                           _af=_b0;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action5a=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option5a=DimModel.getNextCol1(model);
                               _b4=Option.iter(action5a,option5a);
                              }
                             else
                              {
                               _b4=null;
                              }
                             _b3=_b4;
                            }
                           else
                            {
                             _b3=null;
                            }
                           _af=_b3;
                          }
                         _a7=_af;
                        }
                       _a6=_a7;
                      }
                     _a5=_a6;
                    }
                   else
                    {
                     if(value==="ArrowDown")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         action5b=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         option5b=DimModel.getNextId1(model);
                         _b6=Option.iter(action5b,option5b);
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action5c=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option5c=DimModel.getPriorCol1(model);
                             _b8=Option.iter(action5c,option5c);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action5d=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option5d=DimModel.getNextCol1(model);
                                 _ba=Option.iter(action5d,option5d);
                                }
                               else
                                {
                                 _ba=null;
                                }
                               _b9=_ba;
                              }
                             else
                              {
                               _b9=null;
                              }
                             _b8=_b9;
                            }
                           _b7=_b8;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action5e=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option5e=DimModel.getNextCol1(model);
                               _bc=Option.iter(action5e,option5e);
                              }
                             else
                              {
                               _bc=null;
                              }
                             _bb=_bc;
                            }
                           else
                            {
                             _bb=null;
                            }
                           _b7=_bb;
                          }
                         _b6=_b7;
                        }
                       _b5=_b6;
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action5f=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           option5f=DimModel.getPriorCol1(model);
                           _be=Option.iter(action5f,option5f);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action60=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option60=DimModel.getNextCol1(model);
                               _c0=Option.iter(action60,option60);
                              }
                             else
                              {
                               _c0=null;
                              }
                             _bf=_c0;
                            }
                           else
                            {
                             _bf=null;
                            }
                           _be=_bf;
                          }
                         _bd=_be;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action61=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option61=DimModel.getNextCol1(model);
                             _c2=Option.iter(action61,option61);
                            }
                           else
                            {
                             _c2=null;
                            }
                           _c1=_c2;
                          }
                         else
                          {
                           _c1=null;
                          }
                         _bd=_c1;
                        }
                       _b5=_bd;
                      }
                     _a5=_b5;
                    }
                   _85=_a5;
                  }
                 _84=_85;
                }
               _83=_84;
              }
             else
              {
               if(value==="ArrowRight")
                {
                 if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                  {
                   action62=function(i)
                   {
                    var a;
                    a=DimModel.getCurrentId1(model);
                    return processMessages({
                     $:4,
                     $0:DimModel["double"](a),
                     $1:{
                      $:1,
                      $0:[i,i]
                     }
                    });
                   };
                   option62=DimModel.getNextCol1(model);
                   _c4=Option.iter(action62,option62);
                  }
                 else
                  {
                   if(value==="ArrowUp")
                    {
                     if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                      {
                       action63=function(id)
                       {
                        var action5,option4;
                        action5=function(c)
                        {
                         return processMessages({
                          $:7,
                          $0:{
                           $:1,
                           $0:id
                          },
                          $1:c
                         });
                        };
                        option4=DimModel.getCurrentCol1(model);
                        return Option.iter(action5,option4);
                       };
                       option63=DimModel.getPriorId1(model);
                       _c6=Option.iter(action63,option63);
                      }
                     else
                      {
                       if(value==="ArrowDown")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action64=function(id)
                           {
                            var action5,option4;
                            action5=function(c)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentCol1(model);
                            return Option.iter(action5,option4);
                           };
                           option64=DimModel.getNextId1(model);
                           _c8=Option.iter(action64,option64);
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action65=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option65=DimModel.getPriorCol1(model);
                               _ca=Option.iter(action65,option65);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action66=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option66=DimModel.getNextCol1(model);
                                   _cc=Option.iter(action66,option66);
                                  }
                                 else
                                  {
                                   _cc=null;
                                  }
                                 _cb=_cc;
                                }
                               else
                                {
                                 _cb=null;
                                }
                               _ca=_cb;
                              }
                             _c9=_ca;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action67=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option67=DimModel.getNextCol1(model);
                                 _ce=Option.iter(action67,option67);
                                }
                               else
                                {
                                 _ce=null;
                                }
                               _cd=_ce;
                              }
                             else
                              {
                               _cd=null;
                              }
                             _c9=_cd;
                            }
                           _c8=_c9;
                          }
                         _c7=_c8;
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action68=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option68=DimModel.getPriorCol1(model);
                             _d0=Option.iter(action68,option68);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action69=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option69=DimModel.getNextCol1(model);
                                 _d2=Option.iter(action69,option69);
                                }
                               else
                                {
                                 _d2=null;
                                }
                               _d1=_d2;
                              }
                             else
                              {
                               _d1=null;
                              }
                             _d0=_d1;
                            }
                           _cf=_d0;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action6a=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option6a=DimModel.getNextCol1(model);
                               _d4=Option.iter(action6a,option6a);
                              }
                             else
                              {
                               _d4=null;
                              }
                             _d3=_d4;
                            }
                           else
                            {
                             _d3=null;
                            }
                           _cf=_d3;
                          }
                         _c7=_cf;
                        }
                       _c6=_c7;
                      }
                     _c5=_c6;
                    }
                   else
                    {
                     if(value==="ArrowDown")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         action6b=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         option6b=DimModel.getNextId1(model);
                         _d6=Option.iter(action6b,option6b);
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action6c=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option6c=DimModel.getPriorCol1(model);
                             _d8=Option.iter(action6c,option6c);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action6d=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option6d=DimModel.getNextCol1(model);
                                 _da=Option.iter(action6d,option6d);
                                }
                               else
                                {
                                 _da=null;
                                }
                               _d9=_da;
                              }
                             else
                              {
                               _d9=null;
                              }
                             _d8=_d9;
                            }
                           _d7=_d8;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action6e=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option6e=DimModel.getNextCol1(model);
                               _dc=Option.iter(action6e,option6e);
                              }
                             else
                              {
                               _dc=null;
                              }
                             _db=_dc;
                            }
                           else
                            {
                             _db=null;
                            }
                           _d7=_db;
                          }
                         _d6=_d7;
                        }
                       _d5=_d6;
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action6f=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           option6f=DimModel.getPriorCol1(model);
                           _de=Option.iter(action6f,option6f);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action70=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option70=DimModel.getNextCol1(model);
                               _e0=Option.iter(action70,option70);
                              }
                             else
                              {
                               _e0=null;
                              }
                             _df=_e0;
                            }
                           else
                            {
                             _df=null;
                            }
                           _de=_df;
                          }
                         _dd=_de;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action71=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option71=DimModel.getNextCol1(model);
                             _e2=Option.iter(action71,option71);
                            }
                           else
                            {
                             _e2=null;
                            }
                           _e1=_e2;
                          }
                         else
                          {
                           _e1=null;
                          }
                         _dd=_e1;
                        }
                       _d5=_dd;
                      }
                     _c5=_d5;
                    }
                   _c4=_c5;
                  }
                 _c3=_c4;
                }
               else
                {
                 if(value==="ArrowUp")
                  {
                   if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                    {
                     action72=function(id)
                     {
                      var action5,option4;
                      action5=function(c)
                      {
                       return processMessages({
                        $:7,
                        $0:{
                         $:1,
                         $0:id
                        },
                        $1:c
                       });
                      };
                      option4=DimModel.getCurrentCol1(model);
                      return Option.iter(action5,option4);
                     };
                     option72=DimModel.getPriorId1(model);
                     _e4=Option.iter(action72,option72);
                    }
                   else
                    {
                     if(value==="ArrowDown")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         action73=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         option73=DimModel.getNextId1(model);
                         _e6=Option.iter(action73,option73);
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action74=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option74=DimModel.getPriorCol1(model);
                             _e8=Option.iter(action74,option74);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action75=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option75=DimModel.getNextCol1(model);
                                 _ea=Option.iter(action75,option75);
                                }
                               else
                                {
                                 _ea=null;
                                }
                               _e9=_ea;
                              }
                             else
                              {
                               _e9=null;
                              }
                             _e8=_e9;
                            }
                           _e7=_e8;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action76=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option76=DimModel.getNextCol1(model);
                               _ec=Option.iter(action76,option76);
                              }
                             else
                              {
                               _ec=null;
                              }
                             _eb=_ec;
                            }
                           else
                            {
                             _eb=null;
                            }
                           _e7=_eb;
                          }
                         _e6=_e7;
                        }
                       _e5=_e6;
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action77=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           option77=DimModel.getPriorCol1(model);
                           _ee=Option.iter(action77,option77);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action78=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option78=DimModel.getNextCol1(model);
                               _f0=Option.iter(action78,option78);
                              }
                             else
                              {
                               _f0=null;
                              }
                             _ef=_f0;
                            }
                           else
                            {
                             _ef=null;
                            }
                           _ee=_ef;
                          }
                         _ed=_ee;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action79=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option79=DimModel.getNextCol1(model);
                             _f2=Option.iter(action79,option79);
                            }
                           else
                            {
                             _f2=null;
                            }
                           _f1=_f2;
                          }
                         else
                          {
                           _f1=null;
                          }
                         _ed=_f1;
                        }
                       _e5=_ed;
                      }
                     _e4=_e5;
                    }
                   _e3=_e4;
                  }
                 else
                  {
                   if(value==="ArrowDown")
                    {
                     if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                      {
                       action7a=function(id)
                       {
                        var action5,option4;
                        action5=function(c)
                        {
                         return processMessages({
                          $:7,
                          $0:{
                           $:1,
                           $0:id
                          },
                          $1:c
                         });
                        };
                        option4=DimModel.getCurrentCol1(model);
                        return Option.iter(action5,option4);
                       };
                       option7a=DimModel.getNextId1(model);
                       _f4=Option.iter(action7a,option7a);
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action7b=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           option7b=DimModel.getPriorCol1(model);
                           _f6=Option.iter(action7b,option7b);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action7c=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option7c=DimModel.getNextCol1(model);
                               _f8=Option.iter(action7c,option7c);
                              }
                             else
                              {
                               _f8=null;
                              }
                             _f7=_f8;
                            }
                           else
                            {
                             _f7=null;
                            }
                           _f6=_f7;
                          }
                         _f5=_f6;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action7d=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option7d=DimModel.getNextCol1(model);
                             _fa=Option.iter(action7d,option7d);
                            }
                           else
                            {
                             _fa=null;
                            }
                           _f9=_fa;
                          }
                         else
                          {
                           _f9=null;
                          }
                         _f5=_f9;
                        }
                       _f4=_f5;
                      }
                     _f3=_f4;
                    }
                   else
                    {
                     if(value==="ArrowLeft")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         action7e=function(c)
                         {
                          var action5,option4;
                          action5=function(id)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentId1(model);
                          return Option.iter(action5,option4);
                         };
                         option7e=DimModel.getPriorCol1(model);
                         _fc=Option.iter(action7e,option7e);
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action7f=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option7f=DimModel.getNextCol1(model);
                             _fe=Option.iter(action7f,option7f);
                            }
                           else
                            {
                             _fe=null;
                            }
                           _fd=_fe;
                          }
                         else
                          {
                           _fd=null;
                          }
                         _fc=_fd;
                        }
                       _fb=_fc;
                      }
                     else
                      {
                       if(value==="ArrowRight")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action80=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           option80=DimModel.getNextCol1(model);
                           _100=Option.iter(action80,option80);
                          }
                         else
                          {
                           _100=null;
                          }
                         _ff=_100;
                        }
                       else
                        {
                         _ff=null;
                        }
                       _fb=_ff;
                      }
                     _f3=_fb;
                    }
                   _e3=_f3;
                  }
                 _c3=_e3;
                }
               _83=_c3;
              }
             _3=_83;
            }
           _2=_3;
          }
         _1=_2;
        }
       else
        {
         if(value==="ArrowDown")
          {
           if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
            {
             action81=function(id)
             {
              var a;
              a=DimModel.getCurrentCol1(model);
              return processMessages({
               $:4,
               $0:{
                $:1,
                $0:[id,id]
               },
               $1:DimModel["double"](a)
              });
             };
             option81=DimModel.getNextId1(model);
             _102=Option.iter(action81,option81);
            }
           else
            {
             if(value==="ArrowLeft")
              {
               if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                {
                 action82=function(i)
                 {
                  var a;
                  a=DimModel.getCurrentId1(model);
                  return processMessages({
                   $:4,
                   $0:DimModel["double"](a),
                   $1:{
                    $:1,
                    $0:[i,i]
                   }
                  });
                 };
                 option82=DimModel.getPriorCol1(model);
                 _104=Option.iter(action82,option82);
                }
               else
                {
                 if(value==="ArrowRight")
                  {
                   if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                    {
                     action83=function(i)
                     {
                      var a;
                      a=DimModel.getCurrentId1(model);
                      return processMessages({
                       $:4,
                       $0:DimModel["double"](a),
                       $1:{
                        $:1,
                        $0:[i,i]
                       }
                      });
                     };
                     option83=DimModel.getNextCol1(model);
                     _106=Option.iter(action83,option83);
                    }
                   else
                    {
                     if(value==="ArrowUp")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         action84=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         option84=DimModel.getPriorId1(model);
                         _108=Option.iter(action84,option84);
                        }
                       else
                        {
                         if(value==="ArrowDown")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action85=function(id)
                             {
                              var action5,option4;
                              action5=function(c)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentCol1(model);
                              return Option.iter(action5,option4);
                             };
                             option85=DimModel.getNextId1(model);
                             _10a=Option.iter(action85,option85);
                            }
                           else
                            {
                             if(value==="ArrowLeft")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action86=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option86=DimModel.getPriorCol1(model);
                                 _10c=Option.iter(action86,option86);
                                }
                               else
                                {
                                 if(value==="ArrowRight")
                                  {
                                   if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                    {
                                     action87=function(c)
                                     {
                                      var action5,option4;
                                      action5=function(id)
                                      {
                                       return processMessages({
                                        $:7,
                                        $0:{
                                         $:1,
                                         $0:id
                                        },
                                        $1:c
                                       });
                                      };
                                      option4=DimModel.getCurrentId1(model);
                                      return Option.iter(action5,option4);
                                     };
                                     option87=DimModel.getNextCol1(model);
                                     _10e=Option.iter(action87,option87);
                                    }
                                   else
                                    {
                                     _10e=null;
                                    }
                                   _10d=_10e;
                                  }
                                 else
                                  {
                                   _10d=null;
                                  }
                                 _10c=_10d;
                                }
                               _10b=_10c;
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action88=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option88=DimModel.getNextCol1(model);
                                   _110=Option.iter(action88,option88);
                                  }
                                 else
                                  {
                                   _110=null;
                                  }
                                 _10f=_110;
                                }
                               else
                                {
                                 _10f=null;
                                }
                               _10b=_10f;
                              }
                             _10a=_10b;
                            }
                           _109=_10a;
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action89=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option89=DimModel.getPriorCol1(model);
                               _112=Option.iter(action89,option89);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action8a=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option8a=DimModel.getNextCol1(model);
                                   _114=Option.iter(action8a,option8a);
                                  }
                                 else
                                  {
                                   _114=null;
                                  }
                                 _113=_114;
                                }
                               else
                                {
                                 _113=null;
                                }
                               _112=_113;
                              }
                             _111=_112;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action8b=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option8b=DimModel.getNextCol1(model);
                                 _116=Option.iter(action8b,option8b);
                                }
                               else
                                {
                                 _116=null;
                                }
                               _115=_116;
                              }
                             else
                              {
                               _115=null;
                              }
                             _111=_115;
                            }
                           _109=_111;
                          }
                         _108=_109;
                        }
                       _107=_108;
                      }
                     else
                      {
                       if(value==="ArrowDown")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action8c=function(id)
                           {
                            var action5,option4;
                            action5=function(c)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentCol1(model);
                            return Option.iter(action5,option4);
                           };
                           option8c=DimModel.getNextId1(model);
                           _118=Option.iter(action8c,option8c);
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action8d=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option8d=DimModel.getPriorCol1(model);
                               _11a=Option.iter(action8d,option8d);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action8e=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option8e=DimModel.getNextCol1(model);
                                   _11c=Option.iter(action8e,option8e);
                                  }
                                 else
                                  {
                                   _11c=null;
                                  }
                                 _11b=_11c;
                                }
                               else
                                {
                                 _11b=null;
                                }
                               _11a=_11b;
                              }
                             _119=_11a;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action8f=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option8f=DimModel.getNextCol1(model);
                                 _11e=Option.iter(action8f,option8f);
                                }
                               else
                                {
                                 _11e=null;
                                }
                               _11d=_11e;
                              }
                             else
                              {
                               _11d=null;
                              }
                             _119=_11d;
                            }
                           _118=_119;
                          }
                         _117=_118;
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action90=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option90=DimModel.getPriorCol1(model);
                             _120=Option.iter(action90,option90);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action91=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option91=DimModel.getNextCol1(model);
                                 _122=Option.iter(action91,option91);
                                }
                               else
                                {
                                 _122=null;
                                }
                               _121=_122;
                              }
                             else
                              {
                               _121=null;
                              }
                             _120=_121;
                            }
                           _11f=_120;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action92=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option92=DimModel.getNextCol1(model);
                               _124=Option.iter(action92,option92);
                              }
                             else
                              {
                               _124=null;
                              }
                             _123=_124;
                            }
                           else
                            {
                             _123=null;
                            }
                           _11f=_123;
                          }
                         _117=_11f;
                        }
                       _107=_117;
                      }
                     _106=_107;
                    }
                   _105=_106;
                  }
                 else
                  {
                   if(value==="ArrowUp")
                    {
                     if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                      {
                       action93=function(id)
                       {
                        var action5,option4;
                        action5=function(c)
                        {
                         return processMessages({
                          $:7,
                          $0:{
                           $:1,
                           $0:id
                          },
                          $1:c
                         });
                        };
                        option4=DimModel.getCurrentCol1(model);
                        return Option.iter(action5,option4);
                       };
                       option93=DimModel.getPriorId1(model);
                       _126=Option.iter(action93,option93);
                      }
                     else
                      {
                       if(value==="ArrowDown")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action94=function(id)
                           {
                            var action5,option4;
                            action5=function(c)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentCol1(model);
                            return Option.iter(action5,option4);
                           };
                           option94=DimModel.getNextId1(model);
                           _128=Option.iter(action94,option94);
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action95=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option95=DimModel.getPriorCol1(model);
                               _12a=Option.iter(action95,option95);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   action96=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   option96=DimModel.getNextCol1(model);
                                   _12c=Option.iter(action96,option96);
                                  }
                                 else
                                  {
                                   _12c=null;
                                  }
                                 _12b=_12c;
                                }
                               else
                                {
                                 _12b=null;
                                }
                               _12a=_12b;
                              }
                             _129=_12a;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action97=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option97=DimModel.getNextCol1(model);
                                 _12e=Option.iter(action97,option97);
                                }
                               else
                                {
                                 _12e=null;
                                }
                               _12d=_12e;
                              }
                             else
                              {
                               _12d=null;
                              }
                             _129=_12d;
                            }
                           _128=_129;
                          }
                         _127=_128;
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action98=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option98=DimModel.getPriorCol1(model);
                             _130=Option.iter(action98,option98);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action99=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option99=DimModel.getNextCol1(model);
                                 _132=Option.iter(action99,option99);
                                }
                               else
                                {
                                 _132=null;
                                }
                               _131=_132;
                              }
                             else
                              {
                               _131=null;
                              }
                             _130=_131;
                            }
                           _12f=_130;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action9a=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option9a=DimModel.getNextCol1(model);
                               _134=Option.iter(action9a,option9a);
                              }
                             else
                              {
                               _134=null;
                              }
                             _133=_134;
                            }
                           else
                            {
                             _133=null;
                            }
                           _12f=_133;
                          }
                         _127=_12f;
                        }
                       _126=_127;
                      }
                     _125=_126;
                    }
                   else
                    {
                     if(value==="ArrowDown")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         action9b=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         option9b=DimModel.getNextId1(model);
                         _136=Option.iter(action9b,option9b);
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             action9c=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             option9c=DimModel.getPriorCol1(model);
                             _138=Option.iter(action9c,option9c);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 action9d=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 option9d=DimModel.getNextCol1(model);
                                 _13a=Option.iter(action9d,option9d);
                                }
                               else
                                {
                                 _13a=null;
                                }
                               _139=_13a;
                              }
                             else
                              {
                               _139=null;
                              }
                             _138=_139;
                            }
                           _137=_138;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               action9e=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               option9e=DimModel.getNextCol1(model);
                               _13c=Option.iter(action9e,option9e);
                              }
                             else
                              {
                               _13c=null;
                              }
                             _13b=_13c;
                            }
                           else
                            {
                             _13b=null;
                            }
                           _137=_13b;
                          }
                         _136=_137;
                        }
                       _135=_136;
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           action9f=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           option9f=DimModel.getPriorCol1(model);
                           _13e=Option.iter(action9f,option9f);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actiona0=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optiona0=DimModel.getNextCol1(model);
                               _140=Option.iter(actiona0,optiona0);
                              }
                             else
                              {
                               _140=null;
                              }
                             _13f=_140;
                            }
                           else
                            {
                             _13f=null;
                            }
                           _13e=_13f;
                          }
                         _13d=_13e;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actiona1=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optiona1=DimModel.getNextCol1(model);
                             _142=Option.iter(actiona1,optiona1);
                            }
                           else
                            {
                             _142=null;
                            }
                           _141=_142;
                          }
                         else
                          {
                           _141=null;
                          }
                         _13d=_141;
                        }
                       _135=_13d;
                      }
                     _125=_135;
                    }
                   _105=_125;
                  }
                 _104=_105;
                }
               _103=_104;
              }
             else
              {
               if(value==="ArrowRight")
                {
                 if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                  {
                   actiona2=function(i)
                   {
                    var a;
                    a=DimModel.getCurrentId1(model);
                    return processMessages({
                     $:4,
                     $0:DimModel["double"](a),
                     $1:{
                      $:1,
                      $0:[i,i]
                     }
                    });
                   };
                   optiona2=DimModel.getNextCol1(model);
                   _144=Option.iter(actiona2,optiona2);
                  }
                 else
                  {
                   if(value==="ArrowUp")
                    {
                     if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                      {
                       actiona3=function(id)
                       {
                        var action5,option4;
                        action5=function(c)
                        {
                         return processMessages({
                          $:7,
                          $0:{
                           $:1,
                           $0:id
                          },
                          $1:c
                         });
                        };
                        option4=DimModel.getCurrentCol1(model);
                        return Option.iter(action5,option4);
                       };
                       optiona3=DimModel.getPriorId1(model);
                       _146=Option.iter(actiona3,optiona3);
                      }
                     else
                      {
                       if(value==="ArrowDown")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actiona4=function(id)
                           {
                            var action5,option4;
                            action5=function(c)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentCol1(model);
                            return Option.iter(action5,option4);
                           };
                           optiona4=DimModel.getNextId1(model);
                           _148=Option.iter(actiona4,optiona4);
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actiona5=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optiona5=DimModel.getPriorCol1(model);
                               _14a=Option.iter(actiona5,optiona5);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   actiona6=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   optiona6=DimModel.getNextCol1(model);
                                   _14c=Option.iter(actiona6,optiona6);
                                  }
                                 else
                                  {
                                   _14c=null;
                                  }
                                 _14b=_14c;
                                }
                               else
                                {
                                 _14b=null;
                                }
                               _14a=_14b;
                              }
                             _149=_14a;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 actiona7=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 optiona7=DimModel.getNextCol1(model);
                                 _14e=Option.iter(actiona7,optiona7);
                                }
                               else
                                {
                                 _14e=null;
                                }
                               _14d=_14e;
                              }
                             else
                              {
                               _14d=null;
                              }
                             _149=_14d;
                            }
                           _148=_149;
                          }
                         _147=_148;
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actiona8=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optiona8=DimModel.getPriorCol1(model);
                             _150=Option.iter(actiona8,optiona8);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 actiona9=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 optiona9=DimModel.getNextCol1(model);
                                 _152=Option.iter(actiona9,optiona9);
                                }
                               else
                                {
                                 _152=null;
                                }
                               _151=_152;
                              }
                             else
                              {
                               _151=null;
                              }
                             _150=_151;
                            }
                           _14f=_150;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actionaa=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optionaa=DimModel.getNextCol1(model);
                               _154=Option.iter(actionaa,optionaa);
                              }
                             else
                              {
                               _154=null;
                              }
                             _153=_154;
                            }
                           else
                            {
                             _153=null;
                            }
                           _14f=_153;
                          }
                         _147=_14f;
                        }
                       _146=_147;
                      }
                     _145=_146;
                    }
                   else
                    {
                     if(value==="ArrowDown")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         actionab=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         optionab=DimModel.getNextId1(model);
                         _156=Option.iter(actionab,optionab);
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actionac=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optionac=DimModel.getPriorCol1(model);
                             _158=Option.iter(actionac,optionac);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 actionad=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 optionad=DimModel.getNextCol1(model);
                                 _15a=Option.iter(actionad,optionad);
                                }
                               else
                                {
                                 _15a=null;
                                }
                               _159=_15a;
                              }
                             else
                              {
                               _159=null;
                              }
                             _158=_159;
                            }
                           _157=_158;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actionae=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optionae=DimModel.getNextCol1(model);
                               _15c=Option.iter(actionae,optionae);
                              }
                             else
                              {
                               _15c=null;
                              }
                             _15b=_15c;
                            }
                           else
                            {
                             _15b=null;
                            }
                           _157=_15b;
                          }
                         _156=_157;
                        }
                       _155=_156;
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actionaf=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optionaf=DimModel.getPriorCol1(model);
                           _15e=Option.iter(actionaf,optionaf);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actionb0=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optionb0=DimModel.getNextCol1(model);
                               _160=Option.iter(actionb0,optionb0);
                              }
                             else
                              {
                               _160=null;
                              }
                             _15f=_160;
                            }
                           else
                            {
                             _15f=null;
                            }
                           _15e=_15f;
                          }
                         _15d=_15e;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actionb1=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optionb1=DimModel.getNextCol1(model);
                             _162=Option.iter(actionb1,optionb1);
                            }
                           else
                            {
                             _162=null;
                            }
                           _161=_162;
                          }
                         else
                          {
                           _161=null;
                          }
                         _15d=_161;
                        }
                       _155=_15d;
                      }
                     _145=_155;
                    }
                   _144=_145;
                  }
                 _143=_144;
                }
               else
                {
                 if(value==="ArrowUp")
                  {
                   if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                    {
                     actionb2=function(id)
                     {
                      var action5,option4;
                      action5=function(c)
                      {
                       return processMessages({
                        $:7,
                        $0:{
                         $:1,
                         $0:id
                        },
                        $1:c
                       });
                      };
                      option4=DimModel.getCurrentCol1(model);
                      return Option.iter(action5,option4);
                     };
                     optionb2=DimModel.getPriorId1(model);
                     _164=Option.iter(actionb2,optionb2);
                    }
                   else
                    {
                     if(value==="ArrowDown")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         actionb3=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         optionb3=DimModel.getNextId1(model);
                         _166=Option.iter(actionb3,optionb3);
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actionb4=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optionb4=DimModel.getPriorCol1(model);
                             _168=Option.iter(actionb4,optionb4);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 actionb5=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 optionb5=DimModel.getNextCol1(model);
                                 _16a=Option.iter(actionb5,optionb5);
                                }
                               else
                                {
                                 _16a=null;
                                }
                               _169=_16a;
                              }
                             else
                              {
                               _169=null;
                              }
                             _168=_169;
                            }
                           _167=_168;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actionb6=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optionb6=DimModel.getNextCol1(model);
                               _16c=Option.iter(actionb6,optionb6);
                              }
                             else
                              {
                               _16c=null;
                              }
                             _16b=_16c;
                            }
                           else
                            {
                             _16b=null;
                            }
                           _167=_16b;
                          }
                         _166=_167;
                        }
                       _165=_166;
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actionb7=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optionb7=DimModel.getPriorCol1(model);
                           _16e=Option.iter(actionb7,optionb7);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actionb8=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optionb8=DimModel.getNextCol1(model);
                               _170=Option.iter(actionb8,optionb8);
                              }
                             else
                              {
                               _170=null;
                              }
                             _16f=_170;
                            }
                           else
                            {
                             _16f=null;
                            }
                           _16e=_16f;
                          }
                         _16d=_16e;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actionb9=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optionb9=DimModel.getNextCol1(model);
                             _172=Option.iter(actionb9,optionb9);
                            }
                           else
                            {
                             _172=null;
                            }
                           _171=_172;
                          }
                         else
                          {
                           _171=null;
                          }
                         _16d=_171;
                        }
                       _165=_16d;
                      }
                     _164=_165;
                    }
                   _163=_164;
                  }
                 else
                  {
                   if(value==="ArrowDown")
                    {
                     if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                      {
                       actionba=function(id)
                       {
                        var action5,option4;
                        action5=function(c)
                        {
                         return processMessages({
                          $:7,
                          $0:{
                           $:1,
                           $0:id
                          },
                          $1:c
                         });
                        };
                        option4=DimModel.getCurrentCol1(model);
                        return Option.iter(action5,option4);
                       };
                       optionba=DimModel.getNextId1(model);
                       _174=Option.iter(actionba,optionba);
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actionbb=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optionbb=DimModel.getPriorCol1(model);
                           _176=Option.iter(actionbb,optionbb);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actionbc=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optionbc=DimModel.getNextCol1(model);
                               _178=Option.iter(actionbc,optionbc);
                              }
                             else
                              {
                               _178=null;
                              }
                             _177=_178;
                            }
                           else
                            {
                             _177=null;
                            }
                           _176=_177;
                          }
                         _175=_176;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actionbd=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optionbd=DimModel.getNextCol1(model);
                             _17a=Option.iter(actionbd,optionbd);
                            }
                           else
                            {
                             _17a=null;
                            }
                           _179=_17a;
                          }
                         else
                          {
                           _179=null;
                          }
                         _175=_179;
                        }
                       _174=_175;
                      }
                     _173=_174;
                    }
                   else
                    {
                     if(value==="ArrowLeft")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         actionbe=function(c)
                         {
                          var action5,option4;
                          action5=function(id)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentId1(model);
                          return Option.iter(action5,option4);
                         };
                         optionbe=DimModel.getPriorCol1(model);
                         _17c=Option.iter(actionbe,optionbe);
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actionbf=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optionbf=DimModel.getNextCol1(model);
                             _17e=Option.iter(actionbf,optionbf);
                            }
                           else
                            {
                             _17e=null;
                            }
                           _17d=_17e;
                          }
                         else
                          {
                           _17d=null;
                          }
                         _17c=_17d;
                        }
                       _17b=_17c;
                      }
                     else
                      {
                       if(value==="ArrowRight")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actionc0=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optionc0=DimModel.getNextCol1(model);
                           _180=Option.iter(actionc0,optionc0);
                          }
                         else
                          {
                           _180=null;
                          }
                         _17f=_180;
                        }
                       else
                        {
                         _17f=null;
                        }
                       _17b=_17f;
                      }
                     _173=_17b;
                    }
                   _163=_173;
                  }
                 _143=_163;
                }
               _103=_143;
              }
             _102=_103;
            }
           _101=_102;
          }
         else
          {
           if(value==="ArrowLeft")
            {
             if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
              {
               actionc1=function(i)
               {
                var a;
                a=DimModel.getCurrentId1(model);
                return processMessages({
                 $:4,
                 $0:DimModel["double"](a),
                 $1:{
                  $:1,
                  $0:[i,i]
                 }
                });
               };
               optionc1=DimModel.getPriorCol1(model);
               _182=Option.iter(actionc1,optionc1);
              }
             else
              {
               if(value==="ArrowRight")
                {
                 if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                  {
                   actionc2=function(i)
                   {
                    var a;
                    a=DimModel.getCurrentId1(model);
                    return processMessages({
                     $:4,
                     $0:DimModel["double"](a),
                     $1:{
                      $:1,
                      $0:[i,i]
                     }
                    });
                   };
                   optionc2=DimModel.getNextCol1(model);
                   _184=Option.iter(actionc2,optionc2);
                  }
                 else
                  {
                   if(value==="ArrowUp")
                    {
                     if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                      {
                       actionc3=function(id)
                       {
                        var action5,option4;
                        action5=function(c)
                        {
                         return processMessages({
                          $:7,
                          $0:{
                           $:1,
                           $0:id
                          },
                          $1:c
                         });
                        };
                        option4=DimModel.getCurrentCol1(model);
                        return Option.iter(action5,option4);
                       };
                       optionc3=DimModel.getPriorId1(model);
                       _186=Option.iter(actionc3,optionc3);
                      }
                     else
                      {
                       if(value==="ArrowDown")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actionc4=function(id)
                           {
                            var action5,option4;
                            action5=function(c)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentCol1(model);
                            return Option.iter(action5,option4);
                           };
                           optionc4=DimModel.getNextId1(model);
                           _188=Option.iter(actionc4,optionc4);
                          }
                         else
                          {
                           if(value==="ArrowLeft")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actionc5=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optionc5=DimModel.getPriorCol1(model);
                               _18a=Option.iter(actionc5,optionc5);
                              }
                             else
                              {
                               if(value==="ArrowRight")
                                {
                                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                  {
                                   actionc6=function(c)
                                   {
                                    var action5,option4;
                                    action5=function(id)
                                    {
                                     return processMessages({
                                      $:7,
                                      $0:{
                                       $:1,
                                       $0:id
                                      },
                                      $1:c
                                     });
                                    };
                                    option4=DimModel.getCurrentId1(model);
                                    return Option.iter(action5,option4);
                                   };
                                   optionc6=DimModel.getNextCol1(model);
                                   _18c=Option.iter(actionc6,optionc6);
                                  }
                                 else
                                  {
                                   _18c=null;
                                  }
                                 _18b=_18c;
                                }
                               else
                                {
                                 _18b=null;
                                }
                               _18a=_18b;
                              }
                             _189=_18a;
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 actionc7=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 optionc7=DimModel.getNextCol1(model);
                                 _18e=Option.iter(actionc7,optionc7);
                                }
                               else
                                {
                                 _18e=null;
                                }
                               _18d=_18e;
                              }
                             else
                              {
                               _18d=null;
                              }
                             _189=_18d;
                            }
                           _188=_189;
                          }
                         _187=_188;
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actionc8=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optionc8=DimModel.getPriorCol1(model);
                             _190=Option.iter(actionc8,optionc8);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 actionc9=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 optionc9=DimModel.getNextCol1(model);
                                 _192=Option.iter(actionc9,optionc9);
                                }
                               else
                                {
                                 _192=null;
                                }
                               _191=_192;
                              }
                             else
                              {
                               _191=null;
                              }
                             _190=_191;
                            }
                           _18f=_190;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actionca=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optionca=DimModel.getNextCol1(model);
                               _194=Option.iter(actionca,optionca);
                              }
                             else
                              {
                               _194=null;
                              }
                             _193=_194;
                            }
                           else
                            {
                             _193=null;
                            }
                           _18f=_193;
                          }
                         _187=_18f;
                        }
                       _186=_187;
                      }
                     _185=_186;
                    }
                   else
                    {
                     if(value==="ArrowDown")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         actioncb=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         optioncb=DimModel.getNextId1(model);
                         _196=Option.iter(actioncb,optioncb);
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actioncc=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optioncc=DimModel.getPriorCol1(model);
                             _198=Option.iter(actioncc,optioncc);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 actioncd=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 optioncd=DimModel.getNextCol1(model);
                                 _19a=Option.iter(actioncd,optioncd);
                                }
                               else
                                {
                                 _19a=null;
                                }
                               _199=_19a;
                              }
                             else
                              {
                               _199=null;
                              }
                             _198=_199;
                            }
                           _197=_198;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actionce=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optionce=DimModel.getNextCol1(model);
                               _19c=Option.iter(actionce,optionce);
                              }
                             else
                              {
                               _19c=null;
                              }
                             _19b=_19c;
                            }
                           else
                            {
                             _19b=null;
                            }
                           _197=_19b;
                          }
                         _196=_197;
                        }
                       _195=_196;
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actioncf=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optioncf=DimModel.getPriorCol1(model);
                           _19e=Option.iter(actioncf,optioncf);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actiond0=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optiond0=DimModel.getNextCol1(model);
                               _1a0=Option.iter(actiond0,optiond0);
                              }
                             else
                              {
                               _1a0=null;
                              }
                             _19f=_1a0;
                            }
                           else
                            {
                             _19f=null;
                            }
                           _19e=_19f;
                          }
                         _19d=_19e;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actiond1=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optiond1=DimModel.getNextCol1(model);
                             _1a2=Option.iter(actiond1,optiond1);
                            }
                           else
                            {
                             _1a2=null;
                            }
                           _1a1=_1a2;
                          }
                         else
                          {
                           _1a1=null;
                          }
                         _19d=_1a1;
                        }
                       _195=_19d;
                      }
                     _185=_195;
                    }
                   _184=_185;
                  }
                 _183=_184;
                }
               else
                {
                 if(value==="ArrowUp")
                  {
                   if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                    {
                     actiond2=function(id)
                     {
                      var action5,option4;
                      action5=function(c)
                      {
                       return processMessages({
                        $:7,
                        $0:{
                         $:1,
                         $0:id
                        },
                        $1:c
                       });
                      };
                      option4=DimModel.getCurrentCol1(model);
                      return Option.iter(action5,option4);
                     };
                     optiond2=DimModel.getPriorId1(model);
                     _1a4=Option.iter(actiond2,optiond2);
                    }
                   else
                    {
                     if(value==="ArrowDown")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         actiond3=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         optiond3=DimModel.getNextId1(model);
                         _1a6=Option.iter(actiond3,optiond3);
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actiond4=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optiond4=DimModel.getPriorCol1(model);
                             _1a8=Option.iter(actiond4,optiond4);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 actiond5=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 optiond5=DimModel.getNextCol1(model);
                                 _1aa=Option.iter(actiond5,optiond5);
                                }
                               else
                                {
                                 _1aa=null;
                                }
                               _1a9=_1aa;
                              }
                             else
                              {
                               _1a9=null;
                              }
                             _1a8=_1a9;
                            }
                           _1a7=_1a8;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actiond6=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optiond6=DimModel.getNextCol1(model);
                               _1ac=Option.iter(actiond6,optiond6);
                              }
                             else
                              {
                               _1ac=null;
                              }
                             _1ab=_1ac;
                            }
                           else
                            {
                             _1ab=null;
                            }
                           _1a7=_1ab;
                          }
                         _1a6=_1a7;
                        }
                       _1a5=_1a6;
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actiond7=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optiond7=DimModel.getPriorCol1(model);
                           _1ae=Option.iter(actiond7,optiond7);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actiond8=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optiond8=DimModel.getNextCol1(model);
                               _1b0=Option.iter(actiond8,optiond8);
                              }
                             else
                              {
                               _1b0=null;
                              }
                             _1af=_1b0;
                            }
                           else
                            {
                             _1af=null;
                            }
                           _1ae=_1af;
                          }
                         _1ad=_1ae;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actiond9=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optiond9=DimModel.getNextCol1(model);
                             _1b2=Option.iter(actiond9,optiond9);
                            }
                           else
                            {
                             _1b2=null;
                            }
                           _1b1=_1b2;
                          }
                         else
                          {
                           _1b1=null;
                          }
                         _1ad=_1b1;
                        }
                       _1a5=_1ad;
                      }
                     _1a4=_1a5;
                    }
                   _1a3=_1a4;
                  }
                 else
                  {
                   if(value==="ArrowDown")
                    {
                     if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                      {
                       actionda=function(id)
                       {
                        var action5,option4;
                        action5=function(c)
                        {
                         return processMessages({
                          $:7,
                          $0:{
                           $:1,
                           $0:id
                          },
                          $1:c
                         });
                        };
                        option4=DimModel.getCurrentCol1(model);
                        return Option.iter(action5,option4);
                       };
                       optionda=DimModel.getNextId1(model);
                       _1b4=Option.iter(actionda,optionda);
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actiondb=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optiondb=DimModel.getPriorCol1(model);
                           _1b6=Option.iter(actiondb,optiondb);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actiondc=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optiondc=DimModel.getNextCol1(model);
                               _1b8=Option.iter(actiondc,optiondc);
                              }
                             else
                              {
                               _1b8=null;
                              }
                             _1b7=_1b8;
                            }
                           else
                            {
                             _1b7=null;
                            }
                           _1b6=_1b7;
                          }
                         _1b5=_1b6;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actiondd=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optiondd=DimModel.getNextCol1(model);
                             _1ba=Option.iter(actiondd,optiondd);
                            }
                           else
                            {
                             _1ba=null;
                            }
                           _1b9=_1ba;
                          }
                         else
                          {
                           _1b9=null;
                          }
                         _1b5=_1b9;
                        }
                       _1b4=_1b5;
                      }
                     _1b3=_1b4;
                    }
                   else
                    {
                     if(value==="ArrowLeft")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         actionde=function(c)
                         {
                          var action5,option4;
                          action5=function(id)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentId1(model);
                          return Option.iter(action5,option4);
                         };
                         optionde=DimModel.getPriorCol1(model);
                         _1bc=Option.iter(actionde,optionde);
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actiondf=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optiondf=DimModel.getNextCol1(model);
                             _1be=Option.iter(actiondf,optiondf);
                            }
                           else
                            {
                             _1be=null;
                            }
                           _1bd=_1be;
                          }
                         else
                          {
                           _1bd=null;
                          }
                         _1bc=_1bd;
                        }
                       _1bb=_1bc;
                      }
                     else
                      {
                       if(value==="ArrowRight")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actione0=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optione0=DimModel.getNextCol1(model);
                           _1c0=Option.iter(actione0,optione0);
                          }
                         else
                          {
                           _1c0=null;
                          }
                         _1bf=_1c0;
                        }
                       else
                        {
                         _1bf=null;
                        }
                       _1bb=_1bf;
                      }
                     _1b3=_1bb;
                    }
                   _1a3=_1b3;
                  }
                 _183=_1a3;
                }
               _182=_183;
              }
             _181=_182;
            }
           else
            {
             if(value==="ArrowRight")
              {
               if((!ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                {
                 actione1=function(i)
                 {
                  var a;
                  a=DimModel.getCurrentId1(model);
                  return processMessages({
                   $:4,
                   $0:DimModel["double"](a),
                   $1:{
                    $:1,
                    $0:[i,i]
                   }
                  });
                 };
                 optione1=DimModel.getNextCol1(model);
                 _1c2=Option.iter(actione1,optione1);
                }
               else
                {
                 if(value==="ArrowUp")
                  {
                   if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                    {
                     actione2=function(id)
                     {
                      var action5,option4;
                      action5=function(c)
                      {
                       return processMessages({
                        $:7,
                        $0:{
                         $:1,
                         $0:id
                        },
                        $1:c
                       });
                      };
                      option4=DimModel.getCurrentCol1(model);
                      return Option.iter(action5,option4);
                     };
                     optione2=DimModel.getPriorId1(model);
                     _1c4=Option.iter(actione2,optione2);
                    }
                   else
                    {
                     if(value==="ArrowDown")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         actione3=function(id)
                         {
                          var action5,option4;
                          action5=function(c)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentCol1(model);
                          return Option.iter(action5,option4);
                         };
                         optione3=DimModel.getNextId1(model);
                         _1c6=Option.iter(actione3,optione3);
                        }
                       else
                        {
                         if(value==="ArrowLeft")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actione4=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optione4=DimModel.getPriorCol1(model);
                             _1c8=Option.iter(actione4,optione4);
                            }
                           else
                            {
                             if(value==="ArrowRight")
                              {
                               if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                                {
                                 actione5=function(c)
                                 {
                                  var action5,option4;
                                  action5=function(id)
                                  {
                                   return processMessages({
                                    $:7,
                                    $0:{
                                     $:1,
                                     $0:id
                                    },
                                    $1:c
                                   });
                                  };
                                  option4=DimModel.getCurrentId1(model);
                                  return Option.iter(action5,option4);
                                 };
                                 optione5=DimModel.getNextCol1(model);
                                 _1ca=Option.iter(actione5,optione5);
                                }
                               else
                                {
                                 _1ca=null;
                                }
                               _1c9=_1ca;
                              }
                             else
                              {
                               _1c9=null;
                              }
                             _1c8=_1c9;
                            }
                           _1c7=_1c8;
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actione6=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optione6=DimModel.getNextCol1(model);
                               _1cc=Option.iter(actione6,optione6);
                              }
                             else
                              {
                               _1cc=null;
                              }
                             _1cb=_1cc;
                            }
                           else
                            {
                             _1cb=null;
                            }
                           _1c7=_1cb;
                          }
                         _1c6=_1c7;
                        }
                       _1c5=_1c6;
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actione7=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optione7=DimModel.getPriorCol1(model);
                           _1ce=Option.iter(actione7,optione7);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actione8=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optione8=DimModel.getNextCol1(model);
                               _1d0=Option.iter(actione8,optione8);
                              }
                             else
                              {
                               _1d0=null;
                              }
                             _1cf=_1d0;
                            }
                           else
                            {
                             _1cf=null;
                            }
                           _1ce=_1cf;
                          }
                         _1cd=_1ce;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actione9=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optione9=DimModel.getNextCol1(model);
                             _1d2=Option.iter(actione9,optione9);
                            }
                           else
                            {
                             _1d2=null;
                            }
                           _1d1=_1d2;
                          }
                         else
                          {
                           _1d1=null;
                          }
                         _1cd=_1d1;
                        }
                       _1c5=_1cd;
                      }
                     _1c4=_1c5;
                    }
                   _1c3=_1c4;
                  }
                 else
                  {
                   if(value==="ArrowDown")
                    {
                     if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                      {
                       actionea=function(id)
                       {
                        var action5,option4;
                        action5=function(c)
                        {
                         return processMessages({
                          $:7,
                          $0:{
                           $:1,
                           $0:id
                          },
                          $1:c
                         });
                        };
                        option4=DimModel.getCurrentCol1(model);
                        return Option.iter(action5,option4);
                       };
                       optionea=DimModel.getNextId1(model);
                       _1d4=Option.iter(actionea,optionea);
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actioneb=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optioneb=DimModel.getPriorCol1(model);
                           _1d6=Option.iter(actioneb,optioneb);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actionec=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optionec=DimModel.getNextCol1(model);
                               _1d8=Option.iter(actionec,optionec);
                              }
                             else
                              {
                               _1d8=null;
                              }
                             _1d7=_1d8;
                            }
                           else
                            {
                             _1d7=null;
                            }
                           _1d6=_1d7;
                          }
                         _1d5=_1d6;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actioned=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optioned=DimModel.getNextCol1(model);
                             _1da=Option.iter(actioned,optioned);
                            }
                           else
                            {
                             _1da=null;
                            }
                           _1d9=_1da;
                          }
                         else
                          {
                           _1d9=null;
                          }
                         _1d5=_1d9;
                        }
                       _1d4=_1d5;
                      }
                     _1d3=_1d4;
                    }
                   else
                    {
                     if(value==="ArrowLeft")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         actionee=function(c)
                         {
                          var action5,option4;
                          action5=function(id)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentId1(model);
                          return Option.iter(action5,option4);
                         };
                         optionee=DimModel.getPriorCol1(model);
                         _1dc=Option.iter(actionee,optionee);
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actionef=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optionef=DimModel.getNextCol1(model);
                             _1de=Option.iter(actionef,optionef);
                            }
                           else
                            {
                             _1de=null;
                            }
                           _1dd=_1de;
                          }
                         else
                          {
                           _1dd=null;
                          }
                         _1dc=_1dd;
                        }
                       _1db=_1dc;
                      }
                     else
                      {
                       if(value==="ArrowRight")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actionf0=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optionf0=DimModel.getNextCol1(model);
                           _1e0=Option.iter(actionf0,optionf0);
                          }
                         else
                          {
                           _1e0=null;
                          }
                         _1df=_1e0;
                        }
                       else
                        {
                         _1df=null;
                        }
                       _1db=_1df;
                      }
                     _1d3=_1db;
                    }
                   _1c3=_1d3;
                  }
                 _1c2=_1c3;
                }
               _1c1=_1c2;
              }
             else
              {
               if(value==="ArrowUp")
                {
                 if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                  {
                   actionf1=function(id)
                   {
                    var action5,option4;
                    action5=function(c)
                    {
                     return processMessages({
                      $:7,
                      $0:{
                       $:1,
                       $0:id
                      },
                      $1:c
                     });
                    };
                    option4=DimModel.getCurrentCol1(model);
                    return Option.iter(action5,option4);
                   };
                   optionf1=DimModel.getPriorId1(model);
                   _1e2=Option.iter(actionf1,optionf1);
                  }
                 else
                  {
                   if(value==="ArrowDown")
                    {
                     if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                      {
                       actionf2=function(id)
                       {
                        var action5,option4;
                        action5=function(c)
                        {
                         return processMessages({
                          $:7,
                          $0:{
                           $:1,
                           $0:id
                          },
                          $1:c
                         });
                        };
                        option4=DimModel.getCurrentCol1(model);
                        return Option.iter(action5,option4);
                       };
                       optionf2=DimModel.getNextId1(model);
                       _1e4=Option.iter(actionf2,optionf2);
                      }
                     else
                      {
                       if(value==="ArrowLeft")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actionf3=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optionf3=DimModel.getPriorCol1(model);
                           _1e6=Option.iter(actionf3,optionf3);
                          }
                         else
                          {
                           if(value==="ArrowRight")
                            {
                             if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                              {
                               actionf4=function(c)
                               {
                                var action5,option4;
                                action5=function(id)
                                {
                                 return processMessages({
                                  $:7,
                                  $0:{
                                   $:1,
                                   $0:id
                                  },
                                  $1:c
                                 });
                                };
                                option4=DimModel.getCurrentId1(model);
                                return Option.iter(action5,option4);
                               };
                               optionf4=DimModel.getNextCol1(model);
                               _1e8=Option.iter(actionf4,optionf4);
                              }
                             else
                              {
                               _1e8=null;
                              }
                             _1e7=_1e8;
                            }
                           else
                            {
                             _1e7=null;
                            }
                           _1e6=_1e7;
                          }
                         _1e5=_1e6;
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actionf5=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optionf5=DimModel.getNextCol1(model);
                             _1ea=Option.iter(actionf5,optionf5);
                            }
                           else
                            {
                             _1ea=null;
                            }
                           _1e9=_1ea;
                          }
                         else
                          {
                           _1e9=null;
                          }
                         _1e5=_1e9;
                        }
                       _1e4=_1e5;
                      }
                     _1e3=_1e4;
                    }
                   else
                    {
                     if(value==="ArrowLeft")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         actionf6=function(c)
                         {
                          var action5,option4;
                          action5=function(id)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentId1(model);
                          return Option.iter(action5,option4);
                         };
                         optionf6=DimModel.getPriorCol1(model);
                         _1ec=Option.iter(actionf6,optionf6);
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actionf7=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optionf7=DimModel.getNextCol1(model);
                             _1ee=Option.iter(actionf7,optionf7);
                            }
                           else
                            {
                             _1ee=null;
                            }
                           _1ed=_1ee;
                          }
                         else
                          {
                           _1ed=null;
                          }
                         _1ec=_1ed;
                        }
                       _1eb=_1ec;
                      }
                     else
                      {
                       if(value==="ArrowRight")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actionf8=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optionf8=DimModel.getNextCol1(model);
                           _1f0=Option.iter(actionf8,optionf8);
                          }
                         else
                          {
                           _1f0=null;
                          }
                         _1ef=_1f0;
                        }
                       else
                        {
                         _1ef=null;
                        }
                       _1eb=_1ef;
                      }
                     _1e3=_1eb;
                    }
                   _1e2=_1e3;
                  }
                 _1e1=_1e2;
                }
               else
                {
                 if(value==="ArrowDown")
                  {
                   if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                    {
                     actionf9=function(id)
                     {
                      var action5,option4;
                      action5=function(c)
                      {
                       return processMessages({
                        $:7,
                        $0:{
                         $:1,
                         $0:id
                        },
                        $1:c
                       });
                      };
                      option4=DimModel.getCurrentCol1(model);
                      return Option.iter(action5,option4);
                     };
                     optionf9=DimModel.getNextId1(model);
                     _1f2=Option.iter(actionf9,optionf9);
                    }
                   else
                    {
                     if(value==="ArrowLeft")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         actionfa=function(c)
                         {
                          var action5,option4;
                          action5=function(id)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentId1(model);
                          return Option.iter(action5,option4);
                         };
                         optionfa=DimModel.getPriorCol1(model);
                         _1f4=Option.iter(actionfa,optionfa);
                        }
                       else
                        {
                         if(value==="ArrowRight")
                          {
                           if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                            {
                             actionfb=function(c)
                             {
                              var action5,option4;
                              action5=function(id)
                              {
                               return processMessages({
                                $:7,
                                $0:{
                                 $:1,
                                 $0:id
                                },
                                $1:c
                               });
                              };
                              option4=DimModel.getCurrentId1(model);
                              return Option.iter(action5,option4);
                             };
                             optionfb=DimModel.getNextCol1(model);
                             _1f6=Option.iter(actionfb,optionfb);
                            }
                           else
                            {
                             _1f6=null;
                            }
                           _1f5=_1f6;
                          }
                         else
                          {
                           _1f5=null;
                          }
                         _1f4=_1f5;
                        }
                       _1f3=_1f4;
                      }
                     else
                      {
                       if(value==="ArrowRight")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actionfc=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optionfc=DimModel.getNextCol1(model);
                           _1f8=Option.iter(actionfc,optionfc);
                          }
                         else
                          {
                           _1f8=null;
                          }
                         _1f7=_1f8;
                        }
                       else
                        {
                         _1f7=null;
                        }
                       _1f3=_1f7;
                      }
                     _1f2=_1f3;
                    }
                   _1f1=_1f2;
                  }
                 else
                  {
                   if(value==="ArrowLeft")
                    {
                     if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                      {
                       actionfd=function(c)
                       {
                        var action5,option4;
                        action5=function(id)
                        {
                         return processMessages({
                          $:7,
                          $0:{
                           $:1,
                           $0:id
                          },
                          $1:c
                         });
                        };
                        option4=DimModel.getCurrentId1(model);
                        return Option.iter(action5,option4);
                       };
                       optionfd=DimModel.getPriorCol1(model);
                       _1fa=Option.iter(actionfd,optionfd);
                      }
                     else
                      {
                       if(value==="ArrowRight")
                        {
                         if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                          {
                           actionfe=function(c)
                           {
                            var action5,option4;
                            action5=function(id)
                            {
                             return processMessages({
                              $:7,
                              $0:{
                               $:1,
                               $0:id
                              },
                              $1:c
                             });
                            };
                            option4=DimModel.getCurrentId1(model);
                            return Option.iter(action5,option4);
                           };
                           optionfe=DimModel.getNextCol1(model);
                           _1fc=Option.iter(actionfe,optionfe);
                          }
                         else
                          {
                           _1fc=null;
                          }
                         _1fb=_1fc;
                        }
                       else
                        {
                         _1fb=null;
                        }
                       _1fa=_1fb;
                      }
                     _1f9=_1fa;
                    }
                   else
                    {
                     if(value==="ArrowRight")
                      {
                       if((ev.shiftKey?!ev.ctrlKey:false)?!ev.altKey:false)
                        {
                         actionff=function(c)
                         {
                          var action5,option4;
                          action5=function(id)
                          {
                           return processMessages({
                            $:7,
                            $0:{
                             $:1,
                             $0:id
                            },
                            $1:c
                           });
                          };
                          option4=DimModel.getCurrentId1(model);
                          return Option.iter(action5,option4);
                         };
                         optionff=DimModel.getNextCol1(model);
                         _1fe=Option.iter(actionff,optionff);
                        }
                       else
                        {
                         _1fe=null;
                        }
                       _1fd=_1fe;
                      }
                     else
                      {
                       _1fd=null;
                      }
                     _1f9=_1fd;
                    }
                   _1f1=_1f9;
                  }
                 _1e1=_1f1;
                }
               _1c1=_1e1;
              }
             _181=_1c1;
            }
           _101=_181;
          }
         _1=_101;
        }
       _=_1;
      }
     return _;
    },
    init:Runtime.Field(function()
    {
     return{
      dimension:{
       $:0
      },
      elements:Runtime.New(T,{
       $:0
      }),
      expanded:FSharpSet.New(Runtime.New(T,{
       $:0
      })),
      hover:{
       $:0
      },
      selection:[{
       $:0
      },{
       $:0
      }],
      capturing:false
     };
    }),
    preventDefault:function(ev)
    {
     var value;
     value=ev.preventDefault.apply(ev,null);
     return;
    },
    selectDimension_:function(token,processMessages,dim)
    {
     var _builder_,wb;
     _builder_=ARop.wrap();
     wb=_builder_.Delay(function()
     {
      return _builder_.Bind1(AjaxRemotingProvider.Async("CIPHERPrototype2:12",[]),function(_arg1)
      {
       return _builder_.Bind1(AjaxRemotingProvider.Async("CIPHERPrototype2:22",[token,dim]),function(_arg2)
       {
        var rels,keys,elements,columns,chooser,source2,dimEntryO,getElement,elemEntry,getChildren,chooser2,x3,projection1,x4,elems;
        rels=_arg2[3];
        keys=_arg2[2];
        elements=_arg2[0];
        columns=_arg2[1];
        chooser=function(tupledArg)
        {
         var d,id,name,descO,_,mapping,source,source1;
         d=tupledArg[0];
         id=tupledArg[1];
         name=tupledArg[2];
         descO=tupledArg[3];
         if(Unchecked.Equals(d,dim))
          {
           mapping=function(col)
           {
            return col.name;
           };
           source=Seq.skip(3,columns);
           source1=Seq.map(mapping,source);
           _={
            $:1,
            $0:{
             dim:dim,
             id:id,
             name:name,
             description:descO,
             attributes:Seq.toList(source1)
            }
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
        source2=Seq.choose(chooser,_arg1);
        dimEntryO=Seq1.tryHead(source2);
        processMessages({
         $:0,
         $0:dimEntryO
        });
        getElement=function(eid)
        {
         var predicate;
         predicate=function(tupledArg)
         {
          var id;
          tupledArg[0];
          id=tupledArg[1];
          tupledArg[2];
          tupledArg[3];
          tupledArg[4];
          tupledArg[5];
          return Unchecked.Equals(eid,id);
         };
         return Seq.tryFind(predicate,elements);
        };
        elemEntry=function(eid)
        {
         var x,mapping;
         x=getElement(eid);
         mapping=function(tupledArg)
         {
          var _arg6,id,name,desc,order,attribs,mapping1,source,x1,projection,mapping2,source1,x2;
          _arg6=tupledArg[0];
          id=tupledArg[1];
          name=tupledArg[2];
          desc=tupledArg[3];
          order=tupledArg[4];
          attribs=tupledArg[5];
          mapping1=function(value)
          {
           return value;
          };
          source=Seq.map(mapping1,attribs);
          x1=getChildren(eid);
          projection=function(tupledArg1)
          {
           var c,o,def,_arg11,def1;
           c=tupledArg1[0];
           o=tupledArg1[1];
           def=c.name;
           _arg11=c.order;
           def1=Option1.defaultV(def,_arg11);
           return Option1.defaultV(def1,o);
          };
          mapping2=function(tuple)
          {
           return tuple[0];
          };
          source1=Seq.sortBy(projection,x1);
          x2=Seq.map(mapping2,source1);
          return{
           id:eid,
           name:name,
           description:desc,
           order:order,
           attributes:Seq.toList(source),
           children:Seq.toList(x2)
          };
         };
         return Option.map(mapping,x);
        };
        getChildren=function(eid)
        {
         var chooser1;
         chooser1=function(tupledArg)
         {
          var child,parent,order,_,mapping,option;
          child=tupledArg[0];
          parent=tupledArg[1];
          tupledArg[2];
          order=tupledArg[3];
          if(Unchecked.Equals(eid,parent))
           {
            mapping=function(e)
            {
             return[e,order];
            };
            option=elemEntry(child);
            _=Option.map(mapping,option);
           }
          else
           {
            _={
             $:0
            };
           }
          return _;
         };
         return Seq.choose(chooser1,rels);
        };
        chooser2=function(tupledArg)
        {
         var _arg11,eid,_arg12,_arg13,_arg14,predicate,value;
         _arg11=tupledArg[0];
         eid=tupledArg[1];
         _arg12=tupledArg[2];
         _arg13=tupledArg[3];
         _arg14=tupledArg[4];
         tupledArg[5];
         predicate=function(tupledArg1)
         {
          var child;
          child=tupledArg1[0];
          tupledArg1[1];
          tupledArg1[2];
          tupledArg1[3];
          return Unchecked.Equals(child,eid);
         };
         value=Seq.exists(predicate,rels);
         return!value?elemEntry(eid):{
          $:0
         };
        };
        x3=Seq.choose(chooser2,elements);
        projection1=function(e)
        {
         var predicate,def,option,_arg11;
         predicate=function(s)
         {
          return Strings.Trim(s)!=="";
         };
         def=e.name;
         option=e.order;
         _arg11=Option.filter(predicate,option);
         return Option1.defaultV(def,_arg11);
        };
        x4=Seq.sortBy(projection1,x3);
        elems=Seq.toList(x4);
        processMessages({
         $:1,
         $0:elems
        });
        return _builder_.Zero();
       });
      });
     });
     return ARop.call(wb);
    },
    update:function(msg,model)
    {
     var endSelection,_6,els,idO,b,a,selection3,b1,a1,selection4,r1,c3,r2,c4,model1,id2,exp,expanded,dim;
     endSelection=function(r,c)
     {
      var matchValue,_,_1,_2,c1,selection,_3,c11,c2,id,id1,selection1,_4,_5,c12,selection2;
      matchValue=[r,model.selection];
      if(matchValue[0].$==1)
       {
        if(matchValue[1][0].$==0)
         {
          if(matchValue[1][1].$==1)
           {
            c1=matchValue[1][1].$0[0];
            matchValue[1][1].$0[1];
            selection=[{
             $:0
            },{
             $:1,
             $0:[c1,c]
            }];
            _2={
             dimension:model.dimension,
             elements:model.elements,
             expanded:model.expanded,
             hover:model.hover,
             selection:selection,
             capturing:model.capturing
            };
           }
          else
           {
            _2=model;
           }
          _1=_2;
         }
        else
         {
          if(matchValue[1][1].$==1)
           {
            c11=matchValue[1][1].$0[0];
            c2=matchValue[1][1].$0[1];
            id=matchValue[0].$0;
            id1=matchValue[1][0].$0[0];
            matchValue[1][0].$0[1];
            selection1=[{
             $:1,
             $0:[id1,id]
            },{
             $:1,
             $0:[c11,c]
            }];
            _3={
             dimension:model.dimension,
             elements:model.elements,
             expanded:model.expanded,
             hover:model.hover,
             selection:selection1,
             capturing:model.capturing
            };
           }
          else
           {
            _3=model;
           }
          _1=_3;
         }
        _=_1;
       }
      else
       {
        if(matchValue[1][0].$==0)
         {
          if(matchValue[1][1].$==1)
           {
            c12=matchValue[1][1].$0[0];
            matchValue[1][1].$0[1];
            selection2=[{
             $:0
            },{
             $:1,
             $0:[c12,c]
            }];
            _5={
             dimension:model.dimension,
             elements:model.elements,
             expanded:model.expanded,
             hover:model.hover,
             selection:selection2,
             capturing:model.capturing
            };
           }
          else
           {
            _5=model;
           }
          _4=_5;
         }
        else
         {
          _4=model;
         }
        _=_4;
       }
      return _;
     };
     if(msg.$==1)
      {
       els=msg.$0;
       _6={
        dimension:model.dimension,
        elements:els,
        expanded:model.expanded,
        hover:model.hover,
        selection:model.selection,
        capturing:model.capturing
       };
      }
     else
      {
       if(msg.$==3)
        {
         idO=msg.$0;
         _6={
          dimension:model.dimension,
          elements:model.elements,
          expanded:model.expanded,
          hover:idO,
          selection:model.selection,
          capturing:model.capturing
         };
        }
       else
        {
         if(msg.$==4)
          {
           b=msg.$1;
           a=msg.$0;
           selection3=[a,b];
           _6={
            dimension:model.dimension,
            elements:model.elements,
            expanded:model.expanded,
            hover:model.hover,
            selection:selection3,
            capturing:model.capturing
           };
          }
         else
          {
           if(msg.$==6)
            {
             b1=msg.$1;
             a1=msg.$0;
             selection4=[DimModel["double"](a1),{
              $:1,
              $0:[b1,b1]
             }];
             _6={
              dimension:model.dimension,
              elements:model.elements,
              expanded:model.expanded,
              hover:model.hover,
              selection:selection4,
              capturing:true
             };
            }
           else
            {
             if(msg.$==5)
              {
               r1=msg.$0;
               c3=msg.$1;
               _6=endSelection(r1,c3);
              }
             else
              {
               if(msg.$==7)
                {
                 r2=msg.$0;
                 c4=msg.$1;
                 model1=endSelection(r2,c4);
                 _6={
                  dimension:model1.dimension,
                  elements:model1.elements,
                  expanded:model1.expanded,
                  hover:model1.hover,
                  selection:model1.selection,
                  capturing:false
                 };
                }
               else
                {
                 if(msg.$==2)
                  {
                   id2=msg.$0;
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
                   })(id2))(model.expanded);
                   _6={
                    dimension:model.dimension,
                    elements:model.elements,
                    expanded:expanded,
                    hover:model.hover,
                    selection:model.selection,
                    capturing:model.capturing
                   };
                  }
                 else
                  {
                   dim=msg.$0;
                   _6={
                    dimension:dim,
                    elements:Runtime.New(T,{
                     $:0
                    }),
                    expanded:model.expanded,
                    hover:model.hover,
                    selection:model.selection,
                    capturing:model.capturing
                   };
                  }
                }
              }
            }
          }
        }
      }
     return _6;
    },
    view:function(model,processMessages)
    {
     var elemView,x5,_9,dim,x6,x7,x8,elems,source,tuple,arg001,x9,header,_arg13,footer,xa;
     elemView=function(priorRowSelected)
     {
      return function(tupledArg)
      {
       var elem,expanded,symbol,level,hover,matchValue,rowSelected,_,b,a,_1,matchValue1,nextRowSelected,_2,b1,a1,_3,_4,b2,a2,_5,_6,b3,a3,_7,x,x1,arg00,x2,x3,x4,_arg11,_arg12;
       elem=tupledArg[0];
       expanded=tupledArg[1];
       symbol=tupledArg[2];
       level=tupledArg[3];
       hover=Unchecked.Equals(model.hover,{
        $:1,
        $0:elem.id
       });
       matchValue=model.selection;
       if(matchValue[0].$==1)
        {
         b=matchValue[0].$0[1];
         a=matchValue[0].$0[0];
         if(Unchecked.Equals(a,elem.id)?true:Unchecked.Equals(b,elem.id))
          {
           matchValue[0].$0[0];
           matchValue[0].$0[1];
           _1=true;
          }
         else
          {
           _1=priorRowSelected;
          }
         _=_1;
        }
       else
        {
         _=matchValue[1].$==1?true:priorRowSelected;
        }
       rowSelected=_;
       matchValue1=model.selection;
       if(matchValue1[0].$==1)
        {
         b1=matchValue1[0].$0[1];
         a1=matchValue1[0].$0[0];
         if(Unchecked.Equals(a1,elem.id)?Unchecked.Equals(b1,a1):false)
          {
           matchValue1[0].$0[0];
           matchValue1[0].$0[1];
           _3=false;
          }
         else
          {
           if(matchValue1[0].$==1)
            {
             b2=matchValue1[0].$0[1];
             a2=matchValue1[0].$0[0];
             if(Unchecked.Equals(a2,elem.id)?true:Unchecked.Equals(b2,elem.id))
              {
               matchValue1[0].$0[0];
               matchValue1[0].$0[1];
               _5=!priorRowSelected;
              }
             else
              {
               _5=rowSelected;
              }
             _4=_5;
            }
           else
            {
             _4=rowSelected;
            }
           _3=_4;
          }
         _2=_3;
        }
       else
        {
         if(matchValue1[0].$==1)
          {
           b3=matchValue1[0].$0[1];
           a3=matchValue1[0].$0[0];
           if(Unchecked.Equals(a3,elem.id)?true:Unchecked.Equals(b3,elem.id))
            {
             matchValue1[0].$0[0];
             matchValue1[0].$0[1];
             _7=!priorRowSelected;
            }
           else
            {
             _7=rowSelected;
            }
           _6=_7;
          }
         else
          {
           _6=rowSelected;
          }
         _2=_6;
        }
       nextRowSelected=_2;
       x1=ReactHtml.Div(List.ofArray([{
        $:1,
        $0:symbol
       },ReactHtml._Style(List.ofArray([ReactHtml._display("inline"),ReactHtml._fontFamily("Glyphicons Halflings"),ReactHtml._fontSize("11px"),ReactHtml._cursor("pointer"),ReactHtml._paddingLeft(Global.String(level*4)+"ch")]))]));
       arg00=hover?List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._background("#e6e6e6")]))]):Runtime.New(T,{
        $:0
       });
       x2=((ReactHtml.addAttributes())(arg00))(x1);
       x3=(ReactHtml.OnMouseOver(function()
       {
        var _8,arg0,arg01;
        if(!Unchecked.Equals({
         $:1,
         $0:elem.id
        },model.hover))
         {
          arg0=elem.id;
          arg01={
           $:1,
           $0:arg0
          };
          _8=processMessages({
           $:3,
           $0:arg01
          });
         }
        else
         {
          _8=null;
         }
        return _8;
       }))(x2);
       x4=(ReactHtml.OnMouseOut(function()
       {
        var arg0;
        arg0={
         $:0
        };
        return processMessages({
         $:3,
         $0:arg0
        });
       }))(x3);
       x=ReactHtml.Tr(List.ofArray([ReactHtml.Td(List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._overflow("hidden"),ReactHtml._textOverflow("ellipsis")])),(ReactHtml.OnClick(function()
       {
        var tupledArg1,arg0,arg1;
        tupledArg1=[elem.id,!expanded];
        arg0=tupledArg1[0];
        arg1=tupledArg1[1];
        return processMessages({
         $:2,
         $0:arg0,
         $1:arg1
        });
       }))(x4),ReactHtml.Div(List.ofArray([{
        $:1,
        $0:elem.name
       },ReactHtml._Style(List.ofArray([ReactHtml._display("inline"),ReactHtml._paddingRight("1ch")])),ReactHtml.Draggable(true)]))]))]));
       _arg11=elem.description;
       _arg12=elem.order;
       return[(DimModel.addMoreFields(model,processMessages,{
        $:1,
        $0:elem.id
       },rowSelected,Runtime.New(T,{
        $:1,
        $0:elem.name,
        $1:Runtime.New(T,{
         $:1,
         $0:Option1.defaultV("",_arg11),
         $1:Runtime.New(T,{
          $:1,
          $0:Option1.defaultV("",_arg12),
          $1:elem.attributes
         })
        })
       }),function(children)
       {
        return ReactHtml.Td(children);
       }))(x),nextRowSelected];
      };
     };
     x5=model.dimension;
     if(x5.$==1)
      {
       dim=x5.$0;
       x8=ReactHtml.Tr(List.ofArray([ReactHtml.Th(List.ofArray([{
        $:1,
        $0:"Element"
       },ReactHtml._Style(List.ofArray([ReactHtml._paddingLeft("3ch")]))]))]));
       elems=model.elements;
       source=DimModel.elemRows(model,0,elems);
       tuple=Seq.mapFold(elemView,false,source);
       x7=ReactHtml.Table(List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._whiteSpace("nowrap")])),ReactHtml.TabIndex("1"),ReactHtml.THead(List.ofArray([(DimModel.addMoreFields(model,processMessages,{
        $:0
       },false,Runtime.New(T,{
        $:1,
        $0:"Code",
        $1:Runtime.New(T,{
         $:1,
         $0:"Description",
         $1:Runtime.New(T,{
          $:1,
          $0:"Order",
          $1:dim.attributes
         })
        })
       }),function(children)
       {
        return ReactHtml.Th(children);
       }))(x8)])),ReactHtml.TBody(tuple[0])]));
       arg001=List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._margin("5px"),ReactHtml._overflow("auto")]))]);
       x9=((ReactHtml.addAttributes())(arg001))(x7);
       x6=List.ofArray([(ReactHtml.OnKeyDown(function(ev)
       {
        return DimModel.handleKey(model,processMessages,ev);
       }))(x9)]);
       _arg13=dim.description;
       header=List.ofArray([ReactHtml.Span(List.ofArray([{
        $:1,
        $0:dim.name
       },ReactHtml._Style(List.ofArray([ReactHtml._margin("5px"),ReactHtml.newAttr("fontSize","24px")]))])),ReactHtml.Span(List.ofArray([{
        $:1,
        $0:" "+Option1.defaultV("",_arg13)
       }]))]);
       footer=Runtime.New(T,{
        $:0
       });
       xa=Layouts.BasicContainer(header,footer,x6);
       _9=((ReactHtml.addAttribute())(ReactHtml._Style(List.ofArray([ReactHtml._flexFlow("column")]))))(xa);
      }
     else
      {
       _9=ReactHtml.Div(Runtime.New(T,{
        $:0
       }));
      }
     return _9;
    }
   },
   DimensionForm:{
    dimensionForm_:function(dimension,title,isGuestUser)
    {
     return Browser.withContainerDo("flex flexgrow",function(container)
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:17",[]),function(_arg1)
       {
        var container1,initModel;
        container1=container.Dom;
        initModel=DimensionForm.init(title,isGuestUser);
        DimensionForm.runApp_(_arg1,dimension,container1,initModel);
        return _builder_.Zero();
       });
      });
     });
    },
    init:function(title,isGuestUser)
    {
     return{
      form:GenForm.init(title),
      dialog:Dialog.init(),
      popup:Popup.init(),
      showTable:true,
      showTree:true,
      showRelations:false,
      isGuestUser:isGuestUser,
      dimGridProcessorO:{
       $:0
      },
      relGridProcessorO:{
       $:0
      },
      treeViewProcessorO:{
       $:0
      },
      generalProcessorO:{
       $:0
      },
      relationsCallback:{
       $:0
      },
      itemsCallback:{
       $:0
      },
      saveDataCallback:{
       $:0
      }
     };
    },
    runApp_:function(token,dimension,container,initModel)
    {
     var globalProcessor,setGlobalProcessor_,processMessages,showProcessing,showCompleted,loadData_,treeViewGetRelationsAR,dimGridGetDataAR,validateData_,saveData_,relGridGetRelationsAR_,relGridApply_,aGet,iKey,vsName,vsTitle,nodeI,processGeneralInMessages,toggleRelations_,toggleTable_,toggleTree_,relGridClear_,dimGridClear_,dimGridLoad_,dimGridSave_,flattenHierarchy_,dimUpdateDimension_,columns1,processDimGridMessages,processRelGridMessages,processTreeViewMessages,dimGridClass,relGridClass,treeViewClass,view,arg091,x3,_initModel_,update,app;
     globalProcessor=[{
      $:0
     }];
     setGlobalProcessor_=function(processMsg)
     {
      return globalProcessor[0].$==0?void(globalProcessor[0]=processMsg):null;
     };
     processMessages=function(msg)
     {
      var mapping,option,value;
      mapping=function(f)
      {
       return f(msg);
      };
      option=globalProcessor[0];
      value=Option.map(mapping,option);
      return;
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
       $:0,
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
       $:0,
       $0:arg01
      });
     };
     loadData_=function()
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       showProcessing("loading...");
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:22",[token,dimension]),function(_arg1)
       {
        var rels,keys,elements,columns,projection,elements1,childrenOf,createNodes,chooser1,topLevel,arg0,arg01,mapping2,data,rowHeader,tupledArg2,arg02,arg1,arg2,arg03,arg04;
        rels=_arg1[3];
        keys=_arg1[2];
        elements=_arg1[0];
        columns=_arg1[1];
        projection=function(tupledArg)
        {
         var elem_name,elem_order;
         tupledArg[0];
         tupledArg[1];
         elem_name=tupledArg[2];
         tupledArg[3];
         elem_order=tupledArg[4];
         tupledArg[5];
         return Model2.sortOrder(elem_order,elem_name);
        };
        elements1=Arrays.sortBy(projection,elements);
        childrenOf=function(parentCode)
        {
         var chooser,projection1,mapping1,array,array1;
         chooser=function(tupledArg)
         {
          var _arg8,elem_code,elem_name,elem_description,elem_order,_arg9,predicate,x,mapping;
          _arg8=tupledArg[0];
          elem_code=tupledArg[1];
          elem_name=tupledArg[2];
          elem_description=tupledArg[3];
          elem_order=tupledArg[4];
          _arg9=tupledArg[5];
          predicate=function(tupledArg1)
          {
           var child_code,parent_code;
           child_code=tupledArg1[0];
           parent_code=tupledArg1[1];
           tupledArg1[2];
           tupledArg1[3];
           return Unchecked.Equals(elem_code,child_code)?Unchecked.Equals(parentCode,parent_code):false;
          };
          x=Arrays.tryFind(predicate,rels);
          mapping=function(tupledArg1)
          {
           var child_order,alt;
           tupledArg1[0];
           tupledArg1[1];
           tupledArg1[2];
           child_order=tupledArg1[3];
           alt=Model2.sortOrder(elem_order,elem_name);
           return[[elem_code,elem_name,elem_description],Model2.sortOrder(child_order,alt)];
          };
          return Option.map(mapping,x);
         };
         projection1=function(tupledArg)
         {
          var order;
          tupledArg[0];
          order=tupledArg[1];
          return order;
         };
         mapping1=function(tupledArg)
         {
          var elem;
          elem=tupledArg[0];
          tupledArg[1];
          return elem;
         };
         array=Arrays.choose(chooser,elements1);
         array1=Arrays.sortBy(projection1,array);
         return Arrays.map(mapping1,array1);
        };
        createNodes=function(elems)
        {
         var mapping;
         mapping=function(tupledArg)
         {
          var elem_code,elem_name,elem_description,children,title,_,s,_1,s1,key,tag,folder,children1;
          elem_code=tupledArg[0];
          elem_name=tupledArg[1];
          elem_description=tupledArg[2];
          children=childrenOf(elem_code);
          if(elem_description.$==1)
           {
            s=elem_description.$0;
            if(s!==elem_name)
             {
              s1=elem_description.$0;
              _1=" - "+s1;
             }
            else
             {
              _1="";
             }
            _=_1;
           }
          else
           {
            _="";
           }
          title=elem_name+_;
          key=String(elem_code);
          tag=Model2.strToKey(elem_name);
          folder=!Unchecked.Equals(children,[]);
          children1=createNodes(children);
          return{
           key:key,
           title:title,
           tag:tag,
           detail:null,
           folder:folder,
           children:children1
          };
         };
         return Arrays.map(mapping,elems);
        };
        chooser1=function(tupledArg)
        {
         var _arg13,elem_code,elem_name,elem_description,_arg14,_arg15,predicate,_arg2;
         _arg13=tupledArg[0];
         elem_code=tupledArg[1];
         elem_name=tupledArg[2];
         elem_description=tupledArg[3];
         _arg14=tupledArg[4];
         _arg15=tupledArg[5];
         predicate=function(tupledArg1)
         {
          var child_code;
          child_code=tupledArg1[0];
          tupledArg1[1];
          tupledArg1[2];
          tupledArg1[3];
          return Unchecked.Equals(elem_code,child_code);
         };
         _arg2=Seq.exists(predicate,rels);
         return _arg2?{
          $:0
         }:{
          $:1,
          $0:[elem_code,elem_name,elem_description]
         };
        };
        topLevel=Arrays.choose(chooser1,elements1);
        arg0=createNodes(topLevel);
        arg01={
         $:2,
         $0:arg0
        };
        processMessages({
         $:9,
         $0:arg01
        });
        mapping2=function(tupledArg)
        {
         var dim_code,elem_code,elem_name,elem_description,elem_order,attValues,array1;
         dim_code=tupledArg[0];
         elem_code=tupledArg[1];
         elem_name=tupledArg[2];
         elem_description=tupledArg[3];
         elem_order=tupledArg[4];
         attValues=tupledArg[5];
         array1=[dim_code,elem_code,elem_name,Option1.defaultV("",elem_description),Option1.defaultV("",elem_order)];
         return array1.concat(attValues);
        };
        data=Arrays.map(mapping2,elements1);
        rowHeader={
         id:"#",
         name:"",
         width:30,
         selectable:true,
         resizable:false,
         sortable:false,
         focusable:true,
         cssClass:"slick-header-column"
        };
        tupledArg2=[data,[rowHeader].concat(columns),keys];
        arg02=tupledArg2[0];
        arg1=tupledArg2[1];
        arg2=tupledArg2[2];
        arg03={
         $:0,
         $0:arg02,
         $1:arg1,
         $2:arg2
        };
        processMessages({
         $:7,
         $0:arg03
        });
        arg04={
         $:2,
         $0:false
        };
        processMessages({
         $:0,
         $0:arg04
        });
        return _builder_.Zero();
       });
      });
     };
     treeViewGetRelationsAR=function()
     {
      return Concurrency.FromContinuations(function(tupledArg)
      {
       var callback,arg0;
       callback=tupledArg[0];
       tupledArg[1];
       tupledArg[2];
       processMessages({
        $:14,
        $0:callback
       });
       arg0={
        $:3
       };
       return processMessages({
        $:9,
        $0:arg0
       });
      });
     };
     dimGridGetDataAR=function()
     {
      return Concurrency.FromContinuations(function(tupledArg)
      {
       var callback,arg0;
       callback=tupledArg[0];
       tupledArg[1];
       tupledArg[2];
       processMessages({
        $:16,
        $0:callback
       });
       arg0={
        $:3
       };
       return processMessages({
        $:7,
        $0:arg0
       });
      });
     };
     validateData_=function(values)
     {
      var _builder_;
      _builder_=Rop1.flow();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(Rop1.tryProtection(),function()
       {
        var mapping,projection,source,source1,keysPerRowGrouped,predicate,mapping1,mapping2,source2,source3,x,undefinedKeys;
        mapping=function(i)
        {
         return function(row)
         {
          var vs,_,vs1,vs2,s;
          if(row.$==1)
           {
            vs1=row.$1;
            _=vs1;
           }
          else
           {
            vs2=row.$1;
            _=vs2;
           }
          vs=_;
          s=Arrays.get(vs,2);
          return[i,Model2.strToKey(s)];
         };
        };
        projection=function(tupledArg)
        {
         var k;
         tupledArg[0];
         k=tupledArg[1];
         return k;
        };
        source=Seq.mapi(mapping,values);
        source1=Seq1.groupBy(projection,source);
        keysPerRowGrouped=Seq.toArray(source1);
        predicate=function(tupledArg)
        {
         var k;
         k=tupledArg[0];
         tupledArg[1];
         return!k;
        };
        mapping1=function(tupledArg)
        {
         var rs;
         tupledArg[0];
         rs=tupledArg[1];
         return rs;
        };
        mapping2=function(tupledArg)
        {
         var i,k;
         i=tupledArg[0];
         k=tupledArg[1];
         return{
          $:2,
          $0:i,
          $1:[k]
         };
        };
        source2=Seq.filter(predicate,keysPerRowGrouped);
        source3=Seq.collect(mapping1,source2);
        x=Seq.map(mapping2,source3);
        undefinedKeys=Seq.toList(x);
        return _builder_.Combine(_builder_.ReturnFrom(undefinedKeys.$==0?Rop1.succeed(null):{
         $:1,
         $0:undefinedKeys
        }),_builder_.Delay(function()
        {
         return _builder_.Bind(Rop1.tryProtection(),function()
         {
          var predicate1,mapping3,mapping4,source4,source5,x1,duplicatedKeys;
          predicate1=function(tupledArg)
          {
           var rs;
           tupledArg[0];
           rs=tupledArg[1];
           return Seq.length(rs)>1;
          };
          mapping3=function(tupledArg)
          {
           var rs;
           tupledArg[0];
           rs=tupledArg[1];
           return rs;
          };
          mapping4=function(tupledArg)
          {
           var i,k;
           i=tupledArg[0];
           k=tupledArg[1];
           return{
            $:3,
            $0:i,
            $1:[k]
           };
          };
          source4=Seq.filter(predicate1,keysPerRowGrouped);
          source5=Seq.collect(mapping3,source4);
          x1=Seq.map(mapping4,source5);
          duplicatedKeys=Seq.toList(x1);
          return _builder_.ReturnFrom(duplicatedKeys.$==0?Rop1.succeed(null):{
           $:1,
           $0:duplicatedKeys
          });
         });
        }));
       });
      });
     };
     saveData_=function()
     {
      var _builder_,f;
      f=function(failed)
      {
       return function(ms)
       {
        var _,_1,_2,_3,_4,_5,_6,_7,_8;
        if(failed)
         {
          _1=function(_9)
          {
           return _9.$==29?"ErrGuestUserNotActivated":_9.$==28?"ErrAleaError ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==27?"ErrNoRecordsProcessed":_9.$==26?"ErrUnsuportedDataStorage":_9.$==25?"ErrWebSharperCompiler "+PrintfHelpers.prettyPrint(_9.$0):_9.$==24?"ErrFSharpCompiler "+PrintfHelpers.prettyPrint(_9.$0):_9.$==23?"ErrFeatureNotImplemented "+PrintfHelpers.prettyPrint(_9.$0):_9.$==22?"ErrRecordNotFound ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==21?"ErrRecordWasNotUpdated "+PrintfHelpers.prettyPrint(_9.$0):_9.$==20?"ErrDockerIsNotPresent "+_5(_9.$0):_9.$==19?"ErrObjectNotFound "+_8(_9.$0):_9.$==18?"ErrNoProvisionedClientAvailable":_9.$==17?"ErrClientNotFound "+_7(_9.$0):_9.$==16?"ErrUserIsNotDefined "+PrintfHelpers.prettyPrint(_9.$0):_9.$==15?"ErrUserIsNotAssociatedToClient "+_6(_9.$0):_9.$==14?"ErrDockerDataNotFound "+_5(_9.$0):_9.$==13?"ErrUniqueIdNotDefinedForReport "+_2(_9.$0):_9.$==12?"ErrDockerDefinitionNotFound "+_5(_9.$0):_9.$==11?"ErrTableDefinitionNotFound "+_3(_9.$0):_9.$==10?"ErrReportDefinitionNotFound "+_2(_9.$0):_9.$==9?"ErrInvalidContentPageForClient "+PrintfHelpers.prettyPrint(_9.$0):_9.$==8?"ErrInvalidToken "+PrintfHelpers.prettyPrint(_9.$0):_9.$==7?"ErrLoginFailed "+PrintfHelpers.prettyPrint(_9.$0):_9.$==6?"ErrUserIsNotLoggedIn":_9.$==5?"ErrValueIsNull ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==4?"ErrParameterMissing "+PrintfHelpers.prettyPrint(_9.$0):_9.$==3?"ErrDuplicatedKeys ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.printArray(function(_a)
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
          _=showCompleted(PrintfHelpers.printList(function(_9)
          {
           return _1(_9);
          },ms));
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
       showProcessing("Saving...");
       return _builder_.Bind(treeViewGetRelationsAR(null),function(_arg5)
       {
        return _builder_.Bind(dimGridGetDataAR(null),function(_arg6)
        {
         var v,k,d,ch,c,ad;
         v=_arg6[0];
         k=_arg6[2];
         d=_arg6[3];
         ch=_arg6[4];
         c=_arg6[1];
         ad=_arg6[5];
         return _builder_.Bind1(validateData_(v),function()
         {
          return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:23",[token,dimension,d,ch,ad,_arg5]),function(_arg8)
          {
           var response,data,arg0,arg01;
           response=_arg8[1][0];
           _arg8[0];
           data=_arg8[1][1];
           arg0={
            $:1,
            $0:data
           };
           processMessages({
            $:7,
            $0:arg0
           });
           arg01={
            $:2,
            $0:false
           };
           processMessages({
            $:0,
            $0:arg01
           });
           showCompleted(response);
           return _builder_.Zero();
          });
         });
        });
       });
      });
     };
     relGridGetRelationsAR_=function()
     {
      return Concurrency.FromContinuations(function(tupledArg)
      {
       var callback,arg0;
       callback=tupledArg[0];
       tupledArg[1];
       tupledArg[2];
       processMessages({
        $:15,
        $0:callback
       });
       arg0={
        $:1
       };
       return processMessages({
        $:8,
        $0:arg0
       });
      });
     };
     relGridApply_=function()
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       showProcessing("Applying...");
       return _builder_.Bind(relGridGetRelationsAR_(null),function(_arg9)
       {
        var mapping,mapping1,array,arg0,x,arg01;
        mapping=function(obj)
        {
         return obj;
        };
        mapping1=function(rel)
        {
         return[Model2.strToKey(rel.child),Model2.strToKey(rel.parent)];
        };
        array=Arrays.map(mapping,_arg9);
        arg0=Arrays.map(mapping1,array);
        x={
         $:0,
         $0:arg0
        };
        processMessages({
         $:9,
         $0:x
        });
        showCompleted("");
        arg01={
         $:2,
         $0:true
        };
        processMessages({
         $:0,
         $0:arg01
        });
        return _builder_.Zero();
       });
      });
     };
     aGet=function(i,vs)
     {
      var _,v;
      if(Arrays.length(vs)<=i)
       {
        _="";
       }
      else
       {
        v=Arrays.get(vs,i);
        _=!v?"":v;
       }
      return _;
     };
     iKey=function(i)
     {
      return"i:"+String(i);
     };
     vsName=function(vs)
     {
      return Model2.strToKey(aGet(2,vs));
     };
     vsTitle=function(vs)
     {
      return aGet(2,vs)+" - "+aGet(3,vs);
     };
     nodeI=function(i,vs)
     {
      return[iKey(i),vsTitle(vs),vsName(vs)];
     };
     processGeneralInMessages=function(msg)
     {
      var _builder_,R1;
      _builder_=Rop1.flow();
      R1=_builder_.Delay(function()
      {
       return _builder_.Bind(Rop1.tryProtection(),function()
       {
        var _,_1,node,arg0,_2,arg00,arg01,arg02,arg03,_3,change,_4,_5,ks,_6,ks1,arg04,arg05,arg06,_7,_8,i,arg07,arg08,arg09,_9,_a,i1,vs,tupledArg,arg0a,arg1,arg2,arg0b,arg0c,n,vs1,tupledArg1,arg0d,arg11,arg21,arg0e,arg0f,addedRows,mapping,arg010,arg011,row,arg012,_b,key,ks2,arg013,_c,ks3,_d,ks4,vs3,tupledArg2,arg014,arg12,arg22,arg015,arg016,_e,_f,i2,vs4,tupledArg3,arg017,arg13,arg23,arg018,arg019,n1,vs5,tupledArg4,arg01a,arg14,arg24,arg01b,arg01c,addedRows1,mapping1,arg01d,arg01e,row1,arg01f,_10,key1,ks5,arg020,_11,_12,i3,vs6,tupledArg5,arg021,arg15,arg25,arg022,arg023,n2,vs7,tupledArg6,arg024,arg16,arg26,arg025,arg026,addedRows2,mapping2,arg027,arg028,row2,arg029,_13,key2,ks6,arg02a,_14,_15,i4,vs8,tupledArg7,arg02b,arg17,arg27,arg02c,arg02d,n3,vs9,tupledArg8,arg02e,arg18,arg28,arg02f,arg030,addedRows3,mapping3,arg031,arg032,row3,arg033,_16,key3,ks7,arg034,_17,_18,i5,arg035,arg036,arg037,_19,_1a,i6,vsa,tupledArg9,arg038,arg19,arg29,arg039,arg03a,n4,vsb,tupledArga,arg03b,arg1a,arg2a,arg03c,arg03d,addedRows4,mapping4,arg03e,arg03f,row4,arg040,_1b,key4,ks8,arg041,_1c,ks9,_1d,ksa,vsc,tupledArgb,arg042,arg1b,arg2b,arg043,arg044,_1e,_1f,i7,vsd,tupledArgc,arg045,arg1c,arg2c,arg046,arg047,n5,vse,tupledArgd,arg048,arg1d,arg2d,arg049,arg04a,addedRows5,mapping5,arg04b,arg04c,row5,arg04d,_20,key5,ksb,arg04e,_21,_22,i8,vsf,tupledArge,arg04f,arg1e,arg2e,arg050,arg051,n6,vs10,tupledArgf,arg052,arg1f,arg2f,arg053,arg054,addedRows6,mapping6,arg055,arg056,row6,arg057,_23,key6,ksc,arg058,_24,_25,i9,vs11,tupledArg10,arg059,arg110,arg210,arg05a,arg05b,n7,vs12,tupledArg11,arg05c,arg111,arg211,arg05d,arg05e,addedRows7,mapping7,arg05f,arg060,row7,arg061,_26,key7,ksd,arg062,_27,_28,ia,arg063,arg064,arg065,_29,_2a,ib,vs13,tupledArg12,arg066,arg112,arg212,arg067,arg068,n8,vs14,tupledArg13,arg069,arg113,arg213,arg06a,arg06b,addedRows8,mapping8,arg06c,arg06d,row8,arg06e,_2b,key8,kse,arg06f,_2c,ksf,_2d,ks10,vs15,tupledArg14,arg070,arg114,arg214,arg071,arg072,_2e,_2f,ic,vs16,tupledArg15,arg073,arg115,arg215,arg074,arg075,n9,vs17,tupledArg16,arg076,arg116,arg216,arg077,arg078,addedRows9,mapping9,arg079,arg07a,row9,arg07b,_30,key9,ks11,arg07c,_31,_32,id,vs18,tupledArg17,arg07d,arg117,arg217,arg07e,arg07f,na,vs19,tupledArg18,arg080,arg118,arg218,arg081,arg082,addedRowsa,mappinga,arg083,arg084,rowa,arg085,_33,keya,ks12,arg086,_34,_35,ie,vs1a,tupledArg19,arg087,arg119,arg219,arg088,arg089,nb,vs1b,tupledArg1a,arg08a,arg11a,arg21a,arg08b,arg08c,addedRowsb,mappingb,arg08d,arg08e,rowb,arg08f,_36,keyb,ks13,arg090;
        if(msg.$==1)
         {
          if(msg.$0.$==3)
           {
            node=msg.$0.$0;
            if(Strings.StartsWith(node.key,"i:"))
             {
              arg00=Slice.string(node.key,{
               $:1,
               $0:2
              },{
               $:0
              });
              arg01=parseInt(arg00);
              _2={
               $:1,
               $0:arg01
              };
             }
            else
             {
              arg02=[node.key];
              _2={
               $:0,
               $0:arg02
              };
             }
            arg0=_2;
            arg03={
             $:4,
             $0:arg0
            };
            processMessages({
             $:7,
             $0:arg03
            });
            _1=_builder_.Zero();
           }
          else
           {
            _1=_builder_.Zero();
           }
          _=_1;
         }
        else
         {
          if(msg.$0.$==2)
           {
            change=msg.$0.$0;
            if(change.$==2)
             {
              if(change.$0.$==0)
               {
                ks=change.$0.$0;
                if(Arrays.length(ks)===1)
                 {
                  ks1=change.$0.$0;
                  arg04=Arrays.get(ks1,0);
                  arg05={
                   $:5,
                   $0:arg04
                  };
                  processMessages({
                   $:9,
                   $0:arg05
                  });
                  arg06={
                   $:2,
                   $0:true
                  };
                  processMessages({
                   $:0,
                   $0:arg06
                  });
                  _6=_builder_.Zero();
                 }
                else
                 {
                  if(change.$==2)
                   {
                    if(change.$0.$==1)
                     {
                      i=change.$0.$0;
                      arg07=iKey(i);
                      arg08={
                       $:5,
                       $0:arg07
                      };
                      processMessages({
                       $:9,
                       $0:arg08
                      });
                      arg09={
                       $:2,
                       $0:true
                      };
                      processMessages({
                       $:0,
                       $0:arg09
                      });
                      _8=_builder_.Zero();
                     }
                    else
                     {
                      if(change.$==1)
                       {
                        if(change.$0.$==1)
                         {
                          i1=change.$0.$0;
                          vs=change.$0.$1;
                          tupledArg=nodeI(i1,vs);
                          arg0a=tupledArg[0];
                          arg1=tupledArg[1];
                          arg2=tupledArg[2];
                          arg0b={
                           $:7,
                           $0:arg0a,
                           $1:arg1,
                           $2:arg2
                          };
                          processMessages({
                           $:9,
                           $0:arg0b
                          });
                          arg0c={
                           $:2,
                           $0:true
                          };
                          processMessages({
                           $:0,
                           $0:arg0c
                          });
                          _a=_builder_.Zero();
                         }
                        else
                         {
                          _a=_builder_.Zero();
                         }
                        _9=_a;
                       }
                      else
                       {
                        if(change.$==0)
                         {
                          n=change.$0;
                          vs1=change.$1;
                          tupledArg1=nodeI(n,vs1);
                          arg0d=tupledArg1[0];
                          arg11=tupledArg1[1];
                          arg21=tupledArg1[2];
                          arg0e={
                           $:6,
                           $0:arg0d,
                           $1:arg11,
                           $2:arg21
                          };
                          processMessages({
                           $:9,
                           $0:arg0e
                          });
                          arg0f={
                           $:2,
                           $0:true
                          };
                          processMessages({
                           $:0,
                           $0:arg0f
                          });
                          _9=_builder_.Zero();
                         }
                        else
                         {
                          if(change.$==4)
                           {
                            addedRows=change.$0;
                            mapping=function(vs2)
                            {
                             return[Arrays.get(vs2,1),vsTitle(vs2),vsName(vs2)];
                            };
                            arg010=Arrays.map(mapping,addedRows);
                            arg011={
                             $:9,
                             $0:arg010
                            };
                            processMessages({
                             $:9,
                             $0:arg011
                            });
                            _9=_builder_.Zero();
                           }
                          else
                           {
                            if(change.$==6)
                             {
                              row=change.$0;
                              if(row.$==1)
                               {
                                key=row.$0;
                                _b=iKey(key);
                               }
                              else
                               {
                                ks2=row.$0;
                                _b=Arrays.get(ks2,0);
                               }
                              arg012=_b;
                              arg013={
                               $:10,
                               $0:arg012
                              };
                              processMessages({
                               $:9,
                               $0:arg013
                              });
                              _9=_builder_.Zero();
                             }
                            else
                             {
                              _9=_builder_.Zero();
                             }
                           }
                         }
                       }
                      _8=_9;
                     }
                    _7=_8;
                   }
                  else
                   {
                    if(change.$==1)
                     {
                      if(change.$0.$==0)
                       {
                        change.$0.$1;
                        ks3=change.$0.$0;
                        if(Arrays.length(ks3)===1)
                         {
                          ks4=change.$0.$0;
                          vs3=change.$0.$1;
                          tupledArg2=[Arrays.get(ks4,0),vsTitle(vs3),vsName(vs3)];
                          arg014=tupledArg2[0];
                          arg12=tupledArg2[1];
                          arg22=tupledArg2[2];
                          arg015={
                           $:7,
                           $0:arg014,
                           $1:arg12,
                           $2:arg22
                          };
                          processMessages({
                           $:9,
                           $0:arg015
                          });
                          arg016={
                           $:2,
                           $0:true
                          };
                          processMessages({
                           $:0,
                           $0:arg016
                          });
                          _d=_builder_.Zero();
                         }
                        else
                         {
                          if(change.$==1)
                           {
                            if(change.$0.$==1)
                             {
                              i2=change.$0.$0;
                              vs4=change.$0.$1;
                              tupledArg3=nodeI(i2,vs4);
                              arg017=tupledArg3[0];
                              arg13=tupledArg3[1];
                              arg23=tupledArg3[2];
                              arg018={
                               $:7,
                               $0:arg017,
                               $1:arg13,
                               $2:arg23
                              };
                              processMessages({
                               $:9,
                               $0:arg018
                              });
                              arg019={
                               $:2,
                               $0:true
                              };
                              processMessages({
                               $:0,
                               $0:arg019
                              });
                              _f=_builder_.Zero();
                             }
                            else
                             {
                              _f=_builder_.Zero();
                             }
                            _e=_f;
                           }
                          else
                           {
                            if(change.$==0)
                             {
                              n1=change.$0;
                              vs5=change.$1;
                              tupledArg4=nodeI(n1,vs5);
                              arg01a=tupledArg4[0];
                              arg14=tupledArg4[1];
                              arg24=tupledArg4[2];
                              arg01b={
                               $:6,
                               $0:arg01a,
                               $1:arg14,
                               $2:arg24
                              };
                              processMessages({
                               $:9,
                               $0:arg01b
                              });
                              arg01c={
                               $:2,
                               $0:true
                              };
                              processMessages({
                               $:0,
                               $0:arg01c
                              });
                              _e=_builder_.Zero();
                             }
                            else
                             {
                              if(change.$==4)
                               {
                                addedRows1=change.$0;
                                mapping1=function(vs2)
                                {
                                 return[Arrays.get(vs2,1),vsTitle(vs2),vsName(vs2)];
                                };
                                arg01d=Arrays.map(mapping1,addedRows1);
                                arg01e={
                                 $:9,
                                 $0:arg01d
                                };
                                processMessages({
                                 $:9,
                                 $0:arg01e
                                });
                                _e=_builder_.Zero();
                               }
                              else
                               {
                                if(change.$==6)
                                 {
                                  row1=change.$0;
                                  if(row1.$==1)
                                   {
                                    key1=row1.$0;
                                    _10=iKey(key1);
                                   }
                                  else
                                   {
                                    ks5=row1.$0;
                                    _10=Arrays.get(ks5,0);
                                   }
                                  arg01f=_10;
                                  arg020={
                                   $:10,
                                   $0:arg01f
                                  };
                                  processMessages({
                                   $:9,
                                   $0:arg020
                                  });
                                  _e=_builder_.Zero();
                                 }
                                else
                                 {
                                  _e=_builder_.Zero();
                                 }
                               }
                             }
                           }
                          _d=_e;
                         }
                        _c=_d;
                       }
                      else
                       {
                        if(change.$==1)
                         {
                          if(change.$0.$==1)
                           {
                            i3=change.$0.$0;
                            vs6=change.$0.$1;
                            tupledArg5=nodeI(i3,vs6);
                            arg021=tupledArg5[0];
                            arg15=tupledArg5[1];
                            arg25=tupledArg5[2];
                            arg022={
                             $:7,
                             $0:arg021,
                             $1:arg15,
                             $2:arg25
                            };
                            processMessages({
                             $:9,
                             $0:arg022
                            });
                            arg023={
                             $:2,
                             $0:true
                            };
                            processMessages({
                             $:0,
                             $0:arg023
                            });
                            _12=_builder_.Zero();
                           }
                          else
                           {
                            _12=_builder_.Zero();
                           }
                          _11=_12;
                         }
                        else
                         {
                          if(change.$==0)
                           {
                            n2=change.$0;
                            vs7=change.$1;
                            tupledArg6=nodeI(n2,vs7);
                            arg024=tupledArg6[0];
                            arg16=tupledArg6[1];
                            arg26=tupledArg6[2];
                            arg025={
                             $:6,
                             $0:arg024,
                             $1:arg16,
                             $2:arg26
                            };
                            processMessages({
                             $:9,
                             $0:arg025
                            });
                            arg026={
                             $:2,
                             $0:true
                            };
                            processMessages({
                             $:0,
                             $0:arg026
                            });
                            _11=_builder_.Zero();
                           }
                          else
                           {
                            if(change.$==4)
                             {
                              addedRows2=change.$0;
                              mapping2=function(vs2)
                              {
                               return[Arrays.get(vs2,1),vsTitle(vs2),vsName(vs2)];
                              };
                              arg027=Arrays.map(mapping2,addedRows2);
                              arg028={
                               $:9,
                               $0:arg027
                              };
                              processMessages({
                               $:9,
                               $0:arg028
                              });
                              _11=_builder_.Zero();
                             }
                            else
                             {
                              if(change.$==6)
                               {
                                row2=change.$0;
                                if(row2.$==1)
                                 {
                                  key2=row2.$0;
                                  _13=iKey(key2);
                                 }
                                else
                                 {
                                  ks6=row2.$0;
                                  _13=Arrays.get(ks6,0);
                                 }
                                arg029=_13;
                                arg02a={
                                 $:10,
                                 $0:arg029
                                };
                                processMessages({
                                 $:9,
                                 $0:arg02a
                                });
                                _11=_builder_.Zero();
                               }
                              else
                               {
                                _11=_builder_.Zero();
                               }
                             }
                           }
                         }
                        _c=_11;
                       }
                      _7=_c;
                     }
                    else
                     {
                      if(change.$==1)
                       {
                        if(change.$0.$==1)
                         {
                          i4=change.$0.$0;
                          vs8=change.$0.$1;
                          tupledArg7=nodeI(i4,vs8);
                          arg02b=tupledArg7[0];
                          arg17=tupledArg7[1];
                          arg27=tupledArg7[2];
                          arg02c={
                           $:7,
                           $0:arg02b,
                           $1:arg17,
                           $2:arg27
                          };
                          processMessages({
                           $:9,
                           $0:arg02c
                          });
                          arg02d={
                           $:2,
                           $0:true
                          };
                          processMessages({
                           $:0,
                           $0:arg02d
                          });
                          _15=_builder_.Zero();
                         }
                        else
                         {
                          _15=_builder_.Zero();
                         }
                        _14=_15;
                       }
                      else
                       {
                        if(change.$==0)
                         {
                          n3=change.$0;
                          vs9=change.$1;
                          tupledArg8=nodeI(n3,vs9);
                          arg02e=tupledArg8[0];
                          arg18=tupledArg8[1];
                          arg28=tupledArg8[2];
                          arg02f={
                           $:6,
                           $0:arg02e,
                           $1:arg18,
                           $2:arg28
                          };
                          processMessages({
                           $:9,
                           $0:arg02f
                          });
                          arg030={
                           $:2,
                           $0:true
                          };
                          processMessages({
                           $:0,
                           $0:arg030
                          });
                          _14=_builder_.Zero();
                         }
                        else
                         {
                          if(change.$==4)
                           {
                            addedRows3=change.$0;
                            mapping3=function(vs2)
                            {
                             return[Arrays.get(vs2,1),vsTitle(vs2),vsName(vs2)];
                            };
                            arg031=Arrays.map(mapping3,addedRows3);
                            arg032={
                             $:9,
                             $0:arg031
                            };
                            processMessages({
                             $:9,
                             $0:arg032
                            });
                            _14=_builder_.Zero();
                           }
                          else
                           {
                            if(change.$==6)
                             {
                              row3=change.$0;
                              if(row3.$==1)
                               {
                                key3=row3.$0;
                                _16=iKey(key3);
                               }
                              else
                               {
                                ks7=row3.$0;
                                _16=Arrays.get(ks7,0);
                               }
                              arg033=_16;
                              arg034={
                               $:10,
                               $0:arg033
                              };
                              processMessages({
                               $:9,
                               $0:arg034
                              });
                              _14=_builder_.Zero();
                             }
                            else
                             {
                              _14=_builder_.Zero();
                             }
                           }
                         }
                       }
                      _7=_14;
                     }
                   }
                  _6=_7;
                 }
                _5=_6;
               }
              else
               {
                if(change.$==2)
                 {
                  if(change.$0.$==1)
                   {
                    i5=change.$0.$0;
                    arg035=iKey(i5);
                    arg036={
                     $:5,
                     $0:arg035
                    };
                    processMessages({
                     $:9,
                     $0:arg036
                    });
                    arg037={
                     $:2,
                     $0:true
                    };
                    processMessages({
                     $:0,
                     $0:arg037
                    });
                    _18=_builder_.Zero();
                   }
                  else
                   {
                    if(change.$==1)
                     {
                      if(change.$0.$==1)
                       {
                        i6=change.$0.$0;
                        vsa=change.$0.$1;
                        tupledArg9=nodeI(i6,vsa);
                        arg038=tupledArg9[0];
                        arg19=tupledArg9[1];
                        arg29=tupledArg9[2];
                        arg039={
                         $:7,
                         $0:arg038,
                         $1:arg19,
                         $2:arg29
                        };
                        processMessages({
                         $:9,
                         $0:arg039
                        });
                        arg03a={
                         $:2,
                         $0:true
                        };
                        processMessages({
                         $:0,
                         $0:arg03a
                        });
                        _1a=_builder_.Zero();
                       }
                      else
                       {
                        _1a=_builder_.Zero();
                       }
                      _19=_1a;
                     }
                    else
                     {
                      if(change.$==0)
                       {
                        n4=change.$0;
                        vsb=change.$1;
                        tupledArga=nodeI(n4,vsb);
                        arg03b=tupledArga[0];
                        arg1a=tupledArga[1];
                        arg2a=tupledArga[2];
                        arg03c={
                         $:6,
                         $0:arg03b,
                         $1:arg1a,
                         $2:arg2a
                        };
                        processMessages({
                         $:9,
                         $0:arg03c
                        });
                        arg03d={
                         $:2,
                         $0:true
                        };
                        processMessages({
                         $:0,
                         $0:arg03d
                        });
                        _19=_builder_.Zero();
                       }
                      else
                       {
                        if(change.$==4)
                         {
                          addedRows4=change.$0;
                          mapping4=function(vs2)
                          {
                           return[Arrays.get(vs2,1),vsTitle(vs2),vsName(vs2)];
                          };
                          arg03e=Arrays.map(mapping4,addedRows4);
                          arg03f={
                           $:9,
                           $0:arg03e
                          };
                          processMessages({
                           $:9,
                           $0:arg03f
                          });
                          _19=_builder_.Zero();
                         }
                        else
                         {
                          if(change.$==6)
                           {
                            row4=change.$0;
                            if(row4.$==1)
                             {
                              key4=row4.$0;
                              _1b=iKey(key4);
                             }
                            else
                             {
                              ks8=row4.$0;
                              _1b=Arrays.get(ks8,0);
                             }
                            arg040=_1b;
                            arg041={
                             $:10,
                             $0:arg040
                            };
                            processMessages({
                             $:9,
                             $0:arg041
                            });
                            _19=_builder_.Zero();
                           }
                          else
                           {
                            _19=_builder_.Zero();
                           }
                         }
                       }
                     }
                    _18=_19;
                   }
                  _17=_18;
                 }
                else
                 {
                  if(change.$==1)
                   {
                    if(change.$0.$==0)
                     {
                      change.$0.$1;
                      ks9=change.$0.$0;
                      if(Arrays.length(ks9)===1)
                       {
                        ksa=change.$0.$0;
                        vsc=change.$0.$1;
                        tupledArgb=[Arrays.get(ksa,0),vsTitle(vsc),vsName(vsc)];
                        arg042=tupledArgb[0];
                        arg1b=tupledArgb[1];
                        arg2b=tupledArgb[2];
                        arg043={
                         $:7,
                         $0:arg042,
                         $1:arg1b,
                         $2:arg2b
                        };
                        processMessages({
                         $:9,
                         $0:arg043
                        });
                        arg044={
                         $:2,
                         $0:true
                        };
                        processMessages({
                         $:0,
                         $0:arg044
                        });
                        _1d=_builder_.Zero();
                       }
                      else
                       {
                        if(change.$==1)
                         {
                          if(change.$0.$==1)
                           {
                            i7=change.$0.$0;
                            vsd=change.$0.$1;
                            tupledArgc=nodeI(i7,vsd);
                            arg045=tupledArgc[0];
                            arg1c=tupledArgc[1];
                            arg2c=tupledArgc[2];
                            arg046={
                             $:7,
                             $0:arg045,
                             $1:arg1c,
                             $2:arg2c
                            };
                            processMessages({
                             $:9,
                             $0:arg046
                            });
                            arg047={
                             $:2,
                             $0:true
                            };
                            processMessages({
                             $:0,
                             $0:arg047
                            });
                            _1f=_builder_.Zero();
                           }
                          else
                           {
                            _1f=_builder_.Zero();
                           }
                          _1e=_1f;
                         }
                        else
                         {
                          if(change.$==0)
                           {
                            n5=change.$0;
                            vse=change.$1;
                            tupledArgd=nodeI(n5,vse);
                            arg048=tupledArgd[0];
                            arg1d=tupledArgd[1];
                            arg2d=tupledArgd[2];
                            arg049={
                             $:6,
                             $0:arg048,
                             $1:arg1d,
                             $2:arg2d
                            };
                            processMessages({
                             $:9,
                             $0:arg049
                            });
                            arg04a={
                             $:2,
                             $0:true
                            };
                            processMessages({
                             $:0,
                             $0:arg04a
                            });
                            _1e=_builder_.Zero();
                           }
                          else
                           {
                            if(change.$==4)
                             {
                              addedRows5=change.$0;
                              mapping5=function(vs2)
                              {
                               return[Arrays.get(vs2,1),vsTitle(vs2),vsName(vs2)];
                              };
                              arg04b=Arrays.map(mapping5,addedRows5);
                              arg04c={
                               $:9,
                               $0:arg04b
                              };
                              processMessages({
                               $:9,
                               $0:arg04c
                              });
                              _1e=_builder_.Zero();
                             }
                            else
                             {
                              if(change.$==6)
                               {
                                row5=change.$0;
                                if(row5.$==1)
                                 {
                                  key5=row5.$0;
                                  _20=iKey(key5);
                                 }
                                else
                                 {
                                  ksb=row5.$0;
                                  _20=Arrays.get(ksb,0);
                                 }
                                arg04d=_20;
                                arg04e={
                                 $:10,
                                 $0:arg04d
                                };
                                processMessages({
                                 $:9,
                                 $0:arg04e
                                });
                                _1e=_builder_.Zero();
                               }
                              else
                               {
                                _1e=_builder_.Zero();
                               }
                             }
                           }
                         }
                        _1d=_1e;
                       }
                      _1c=_1d;
                     }
                    else
                     {
                      if(change.$==1)
                       {
                        if(change.$0.$==1)
                         {
                          i8=change.$0.$0;
                          vsf=change.$0.$1;
                          tupledArge=nodeI(i8,vsf);
                          arg04f=tupledArge[0];
                          arg1e=tupledArge[1];
                          arg2e=tupledArge[2];
                          arg050={
                           $:7,
                           $0:arg04f,
                           $1:arg1e,
                           $2:arg2e
                          };
                          processMessages({
                           $:9,
                           $0:arg050
                          });
                          arg051={
                           $:2,
                           $0:true
                          };
                          processMessages({
                           $:0,
                           $0:arg051
                          });
                          _22=_builder_.Zero();
                         }
                        else
                         {
                          _22=_builder_.Zero();
                         }
                        _21=_22;
                       }
                      else
                       {
                        if(change.$==0)
                         {
                          n6=change.$0;
                          vs10=change.$1;
                          tupledArgf=nodeI(n6,vs10);
                          arg052=tupledArgf[0];
                          arg1f=tupledArgf[1];
                          arg2f=tupledArgf[2];
                          arg053={
                           $:6,
                           $0:arg052,
                           $1:arg1f,
                           $2:arg2f
                          };
                          processMessages({
                           $:9,
                           $0:arg053
                          });
                          arg054={
                           $:2,
                           $0:true
                          };
                          processMessages({
                           $:0,
                           $0:arg054
                          });
                          _21=_builder_.Zero();
                         }
                        else
                         {
                          if(change.$==4)
                           {
                            addedRows6=change.$0;
                            mapping6=function(vs2)
                            {
                             return[Arrays.get(vs2,1),vsTitle(vs2),vsName(vs2)];
                            };
                            arg055=Arrays.map(mapping6,addedRows6);
                            arg056={
                             $:9,
                             $0:arg055
                            };
                            processMessages({
                             $:9,
                             $0:arg056
                            });
                            _21=_builder_.Zero();
                           }
                          else
                           {
                            if(change.$==6)
                             {
                              row6=change.$0;
                              if(row6.$==1)
                               {
                                key6=row6.$0;
                                _23=iKey(key6);
                               }
                              else
                               {
                                ksc=row6.$0;
                                _23=Arrays.get(ksc,0);
                               }
                              arg057=_23;
                              arg058={
                               $:10,
                               $0:arg057
                              };
                              processMessages({
                               $:9,
                               $0:arg058
                              });
                              _21=_builder_.Zero();
                             }
                            else
                             {
                              _21=_builder_.Zero();
                             }
                           }
                         }
                       }
                      _1c=_21;
                     }
                    _17=_1c;
                   }
                  else
                   {
                    if(change.$==1)
                     {
                      if(change.$0.$==1)
                       {
                        i9=change.$0.$0;
                        vs11=change.$0.$1;
                        tupledArg10=nodeI(i9,vs11);
                        arg059=tupledArg10[0];
                        arg110=tupledArg10[1];
                        arg210=tupledArg10[2];
                        arg05a={
                         $:7,
                         $0:arg059,
                         $1:arg110,
                         $2:arg210
                        };
                        processMessages({
                         $:9,
                         $0:arg05a
                        });
                        arg05b={
                         $:2,
                         $0:true
                        };
                        processMessages({
                         $:0,
                         $0:arg05b
                        });
                        _25=_builder_.Zero();
                       }
                      else
                       {
                        _25=_builder_.Zero();
                       }
                      _24=_25;
                     }
                    else
                     {
                      if(change.$==0)
                       {
                        n7=change.$0;
                        vs12=change.$1;
                        tupledArg11=nodeI(n7,vs12);
                        arg05c=tupledArg11[0];
                        arg111=tupledArg11[1];
                        arg211=tupledArg11[2];
                        arg05d={
                         $:6,
                         $0:arg05c,
                         $1:arg111,
                         $2:arg211
                        };
                        processMessages({
                         $:9,
                         $0:arg05d
                        });
                        arg05e={
                         $:2,
                         $0:true
                        };
                        processMessages({
                         $:0,
                         $0:arg05e
                        });
                        _24=_builder_.Zero();
                       }
                      else
                       {
                        if(change.$==4)
                         {
                          addedRows7=change.$0;
                          mapping7=function(vs2)
                          {
                           return[Arrays.get(vs2,1),vsTitle(vs2),vsName(vs2)];
                          };
                          arg05f=Arrays.map(mapping7,addedRows7);
                          arg060={
                           $:9,
                           $0:arg05f
                          };
                          processMessages({
                           $:9,
                           $0:arg060
                          });
                          _24=_builder_.Zero();
                         }
                        else
                         {
                          if(change.$==6)
                           {
                            row7=change.$0;
                            if(row7.$==1)
                             {
                              key7=row7.$0;
                              _26=iKey(key7);
                             }
                            else
                             {
                              ksd=row7.$0;
                              _26=Arrays.get(ksd,0);
                             }
                            arg061=_26;
                            arg062={
                             $:10,
                             $0:arg061
                            };
                            processMessages({
                             $:9,
                             $0:arg062
                            });
                            _24=_builder_.Zero();
                           }
                          else
                           {
                            _24=_builder_.Zero();
                           }
                         }
                       }
                     }
                    _17=_24;
                   }
                 }
                _5=_17;
               }
              _4=_5;
             }
            else
             {
              if(change.$==2)
               {
                if(change.$0.$==1)
                 {
                  ia=change.$0.$0;
                  arg063=iKey(ia);
                  arg064={
                   $:5,
                   $0:arg063
                  };
                  processMessages({
                   $:9,
                   $0:arg064
                  });
                  arg065={
                   $:2,
                   $0:true
                  };
                  processMessages({
                   $:0,
                   $0:arg065
                  });
                  _28=_builder_.Zero();
                 }
                else
                 {
                  if(change.$==1)
                   {
                    if(change.$0.$==1)
                     {
                      ib=change.$0.$0;
                      vs13=change.$0.$1;
                      tupledArg12=nodeI(ib,vs13);
                      arg066=tupledArg12[0];
                      arg112=tupledArg12[1];
                      arg212=tupledArg12[2];
                      arg067={
                       $:7,
                       $0:arg066,
                       $1:arg112,
                       $2:arg212
                      };
                      processMessages({
                       $:9,
                       $0:arg067
                      });
                      arg068={
                       $:2,
                       $0:true
                      };
                      processMessages({
                       $:0,
                       $0:arg068
                      });
                      _2a=_builder_.Zero();
                     }
                    else
                     {
                      _2a=_builder_.Zero();
                     }
                    _29=_2a;
                   }
                  else
                   {
                    if(change.$==0)
                     {
                      n8=change.$0;
                      vs14=change.$1;
                      tupledArg13=nodeI(n8,vs14);
                      arg069=tupledArg13[0];
                      arg113=tupledArg13[1];
                      arg213=tupledArg13[2];
                      arg06a={
                       $:6,
                       $0:arg069,
                       $1:arg113,
                       $2:arg213
                      };
                      processMessages({
                       $:9,
                       $0:arg06a
                      });
                      arg06b={
                       $:2,
                       $0:true
                      };
                      processMessages({
                       $:0,
                       $0:arg06b
                      });
                      _29=_builder_.Zero();
                     }
                    else
                     {
                      if(change.$==4)
                       {
                        addedRows8=change.$0;
                        mapping8=function(vs2)
                        {
                         return[Arrays.get(vs2,1),vsTitle(vs2),vsName(vs2)];
                        };
                        arg06c=Arrays.map(mapping8,addedRows8);
                        arg06d={
                         $:9,
                         $0:arg06c
                        };
                        processMessages({
                         $:9,
                         $0:arg06d
                        });
                        _29=_builder_.Zero();
                       }
                      else
                       {
                        if(change.$==6)
                         {
                          row8=change.$0;
                          if(row8.$==1)
                           {
                            key8=row8.$0;
                            _2b=iKey(key8);
                           }
                          else
                           {
                            kse=row8.$0;
                            _2b=Arrays.get(kse,0);
                           }
                          arg06e=_2b;
                          arg06f={
                           $:10,
                           $0:arg06e
                          };
                          processMessages({
                           $:9,
                           $0:arg06f
                          });
                          _29=_builder_.Zero();
                         }
                        else
                         {
                          _29=_builder_.Zero();
                         }
                       }
                     }
                   }
                  _28=_29;
                 }
                _27=_28;
               }
              else
               {
                if(change.$==1)
                 {
                  if(change.$0.$==0)
                   {
                    change.$0.$1;
                    ksf=change.$0.$0;
                    if(Arrays.length(ksf)===1)
                     {
                      ks10=change.$0.$0;
                      vs15=change.$0.$1;
                      tupledArg14=[Arrays.get(ks10,0),vsTitle(vs15),vsName(vs15)];
                      arg070=tupledArg14[0];
                      arg114=tupledArg14[1];
                      arg214=tupledArg14[2];
                      arg071={
                       $:7,
                       $0:arg070,
                       $1:arg114,
                       $2:arg214
                      };
                      processMessages({
                       $:9,
                       $0:arg071
                      });
                      arg072={
                       $:2,
                       $0:true
                      };
                      processMessages({
                       $:0,
                       $0:arg072
                      });
                      _2d=_builder_.Zero();
                     }
                    else
                     {
                      if(change.$==1)
                       {
                        if(change.$0.$==1)
                         {
                          ic=change.$0.$0;
                          vs16=change.$0.$1;
                          tupledArg15=nodeI(ic,vs16);
                          arg073=tupledArg15[0];
                          arg115=tupledArg15[1];
                          arg215=tupledArg15[2];
                          arg074={
                           $:7,
                           $0:arg073,
                           $1:arg115,
                           $2:arg215
                          };
                          processMessages({
                           $:9,
                           $0:arg074
                          });
                          arg075={
                           $:2,
                           $0:true
                          };
                          processMessages({
                           $:0,
                           $0:arg075
                          });
                          _2f=_builder_.Zero();
                         }
                        else
                         {
                          _2f=_builder_.Zero();
                         }
                        _2e=_2f;
                       }
                      else
                       {
                        if(change.$==0)
                         {
                          n9=change.$0;
                          vs17=change.$1;
                          tupledArg16=nodeI(n9,vs17);
                          arg076=tupledArg16[0];
                          arg116=tupledArg16[1];
                          arg216=tupledArg16[2];
                          arg077={
                           $:6,
                           $0:arg076,
                           $1:arg116,
                           $2:arg216
                          };
                          processMessages({
                           $:9,
                           $0:arg077
                          });
                          arg078={
                           $:2,
                           $0:true
                          };
                          processMessages({
                           $:0,
                           $0:arg078
                          });
                          _2e=_builder_.Zero();
                         }
                        else
                         {
                          if(change.$==4)
                           {
                            addedRows9=change.$0;
                            mapping9=function(vs2)
                            {
                             return[Arrays.get(vs2,1),vsTitle(vs2),vsName(vs2)];
                            };
                            arg079=Arrays.map(mapping9,addedRows9);
                            arg07a={
                             $:9,
                             $0:arg079
                            };
                            processMessages({
                             $:9,
                             $0:arg07a
                            });
                            _2e=_builder_.Zero();
                           }
                          else
                           {
                            if(change.$==6)
                             {
                              row9=change.$0;
                              if(row9.$==1)
                               {
                                key9=row9.$0;
                                _30=iKey(key9);
                               }
                              else
                               {
                                ks11=row9.$0;
                                _30=Arrays.get(ks11,0);
                               }
                              arg07b=_30;
                              arg07c={
                               $:10,
                               $0:arg07b
                              };
                              processMessages({
                               $:9,
                               $0:arg07c
                              });
                              _2e=_builder_.Zero();
                             }
                            else
                             {
                              _2e=_builder_.Zero();
                             }
                           }
                         }
                       }
                      _2d=_2e;
                     }
                    _2c=_2d;
                   }
                  else
                   {
                    if(change.$==1)
                     {
                      if(change.$0.$==1)
                       {
                        id=change.$0.$0;
                        vs18=change.$0.$1;
                        tupledArg17=nodeI(id,vs18);
                        arg07d=tupledArg17[0];
                        arg117=tupledArg17[1];
                        arg217=tupledArg17[2];
                        arg07e={
                         $:7,
                         $0:arg07d,
                         $1:arg117,
                         $2:arg217
                        };
                        processMessages({
                         $:9,
                         $0:arg07e
                        });
                        arg07f={
                         $:2,
                         $0:true
                        };
                        processMessages({
                         $:0,
                         $0:arg07f
                        });
                        _32=_builder_.Zero();
                       }
                      else
                       {
                        _32=_builder_.Zero();
                       }
                      _31=_32;
                     }
                    else
                     {
                      if(change.$==0)
                       {
                        na=change.$0;
                        vs19=change.$1;
                        tupledArg18=nodeI(na,vs19);
                        arg080=tupledArg18[0];
                        arg118=tupledArg18[1];
                        arg218=tupledArg18[2];
                        arg081={
                         $:6,
                         $0:arg080,
                         $1:arg118,
                         $2:arg218
                        };
                        processMessages({
                         $:9,
                         $0:arg081
                        });
                        arg082={
                         $:2,
                         $0:true
                        };
                        processMessages({
                         $:0,
                         $0:arg082
                        });
                        _31=_builder_.Zero();
                       }
                      else
                       {
                        if(change.$==4)
                         {
                          addedRowsa=change.$0;
                          mappinga=function(vs2)
                          {
                           return[Arrays.get(vs2,1),vsTitle(vs2),vsName(vs2)];
                          };
                          arg083=Arrays.map(mappinga,addedRowsa);
                          arg084={
                           $:9,
                           $0:arg083
                          };
                          processMessages({
                           $:9,
                           $0:arg084
                          });
                          _31=_builder_.Zero();
                         }
                        else
                         {
                          if(change.$==6)
                           {
                            rowa=change.$0;
                            if(rowa.$==1)
                             {
                              keya=rowa.$0;
                              _33=iKey(keya);
                             }
                            else
                             {
                              ks12=rowa.$0;
                              _33=Arrays.get(ks12,0);
                             }
                            arg085=_33;
                            arg086={
                             $:10,
                             $0:arg085
                            };
                            processMessages({
                             $:9,
                             $0:arg086
                            });
                            _31=_builder_.Zero();
                           }
                          else
                           {
                            _31=_builder_.Zero();
                           }
                         }
                       }
                     }
                    _2c=_31;
                   }
                  _27=_2c;
                 }
                else
                 {
                  if(change.$==1)
                   {
                    if(change.$0.$==1)
                     {
                      ie=change.$0.$0;
                      vs1a=change.$0.$1;
                      tupledArg19=nodeI(ie,vs1a);
                      arg087=tupledArg19[0];
                      arg119=tupledArg19[1];
                      arg219=tupledArg19[2];
                      arg088={
                       $:7,
                       $0:arg087,
                       $1:arg119,
                       $2:arg219
                      };
                      processMessages({
                       $:9,
                       $0:arg088
                      });
                      arg089={
                       $:2,
                       $0:true
                      };
                      processMessages({
                       $:0,
                       $0:arg089
                      });
                      _35=_builder_.Zero();
                     }
                    else
                     {
                      _35=_builder_.Zero();
                     }
                    _34=_35;
                   }
                  else
                   {
                    if(change.$==0)
                     {
                      nb=change.$0;
                      vs1b=change.$1;
                      tupledArg1a=nodeI(nb,vs1b);
                      arg08a=tupledArg1a[0];
                      arg11a=tupledArg1a[1];
                      arg21a=tupledArg1a[2];
                      arg08b={
                       $:6,
                       $0:arg08a,
                       $1:arg11a,
                       $2:arg21a
                      };
                      processMessages({
                       $:9,
                       $0:arg08b
                      });
                      arg08c={
                       $:2,
                       $0:true
                      };
                      processMessages({
                       $:0,
                       $0:arg08c
                      });
                      _34=_builder_.Zero();
                     }
                    else
                     {
                      if(change.$==4)
                       {
                        addedRowsb=change.$0;
                        mappingb=function(vs2)
                        {
                         return[Arrays.get(vs2,1),vsTitle(vs2),vsName(vs2)];
                        };
                        arg08d=Arrays.map(mappingb,addedRowsb);
                        arg08e={
                         $:9,
                         $0:arg08d
                        };
                        processMessages({
                         $:9,
                         $0:arg08e
                        });
                        _34=_builder_.Zero();
                       }
                      else
                       {
                        if(change.$==6)
                         {
                          rowb=change.$0;
                          if(rowb.$==1)
                           {
                            keyb=rowb.$0;
                            _36=iKey(keyb);
                           }
                          else
                           {
                            ks13=rowb.$0;
                            _36=Arrays.get(ks13,0);
                           }
                          arg08f=_36;
                          arg090={
                           $:10,
                           $0:arg08f
                          };
                          processMessages({
                           $:9,
                           $0:arg090
                          });
                          _34=_builder_.Zero();
                         }
                        else
                         {
                          _34=_builder_.Zero();
                         }
                       }
                     }
                   }
                  _27=_34;
                 }
               }
              _4=_27;
             }
            _3=_4;
           }
          else
           {
            _3=_builder_.Zero();
           }
          _=_3;
         }
        return _;
       });
      });
      return Rop1.notifyMessages(R1);
     };
     toggleRelations_=function()
     {
      return processMessages({
       $:13
      });
     };
     toggleTable_=function()
     {
      return processMessages({
       $:11
      });
     };
     toggleTree_=function()
     {
      return processMessages({
       $:12
      });
     };
     relGridClear_=function()
     {
      var arg0;
      arg0={
       $:0
      };
      return processMessages({
       $:8,
       $0:arg0
      });
     };
     dimGridClear_=function()
     {
      var arg0,arg01,arg02;
      arg0={
       $:2
      };
      processMessages({
       $:7,
       $0:arg0
      });
      arg01={
       $:8
      };
      processMessages({
       $:9,
       $0:arg01
      });
      arg02={
       $:2,
       $0:true
      };
      return processMessages({
       $:0,
       $0:arg02
      });
     };
     dimGridLoad_=function()
     {
      return loadData_(null);
     };
     dimGridSave_=function()
     {
      return saveData_(null);
     };
     flattenHierarchy_=function()
     {
      var arg0,arg01;
      arg0={
       $:1
      };
      processMessages({
       $:9,
       $0:arg0
      });
      arg01={
       $:2,
       $0:true
      };
      return processMessages({
       $:0,
       $0:arg01
      });
     };
     dimUpdateDimension_=function()
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       showProcessing("Updating the model...");
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:24",[token,dimension]),function(_arg11)
       {
        showCompleted(_arg11);
        return _builder_.Zero();
       });
      });
     };
     columns1=[{
      id:"#",
      name:"",
      width:30,
      selectable:false,
      resizable:false,
      sortable:false,
      focusable:false,
      cssClass:"slick-header-column"
     },{
      id:"child",
      name:"child",
      field:"child",
      editor:Slick.Editors.Text
     },{
      id:"parent",
      name:"parent",
      field:"parent",
      editor:Slick.Editors.Text
     }];
     processDimGridMessages=function(msg)
     {
      return processMessages({
       $:3,
       $0:msg
      });
     };
     processRelGridMessages=function(msg)
     {
      return processMessages({
       $:4,
       $0:msg
      });
     };
     processTreeViewMessages=function(msg)
     {
      return processMessages({
       $:5,
       $0:msg
      });
     };
     dimGridClass=ClientForm.reactContainerClass("flex flexgrow",function()
     {
      return function(container1)
      {
       var dimDataView;
       dimDataView=DataView.New({
        $:1,
        $0:processDimGridMessages
       });
       return dimDataView.createGrid(dimDataView,container1);
      };
     });
     relGridClass=ClientForm.reactContainerClass("flex flexgrow",function()
     {
      return function(container1)
      {
       var createNew,R1;
       createNew=function(item)
       {
        return function(id)
        {
         return[id,item];
        };
       };
       R1=SlickGrid.SimpleGrid(columns1,[],createNew,{
        $:1,
        $0:processRelGridMessages
       },container1);
       return Rop1.notifyMessages(R1);
      };
     });
     treeViewClass=ClientForm.reactContainerClass("flex flexgrow",function()
     {
      return function(container1)
      {
       return FancyTree.createFancyTree(container1,{
        $:0
       },[],{
        $:1,
        $0:processTreeViewMessages
       });
      };
     });
     view=function(model)
     {
      return function(processMessages1)
      {
       var disabled,buttons,content,buttons1,content1,model1,processMessages2,menuItems,model2,processMessages3,clas,style,clas1,style1,clas2,style2,x1,x2,model3,processMessages4;
       setGlobalProcessor_({
        $:1,
        $0:processMessages1
       });
       disabled=model.form.processing?true:model.isGuestUser;
       buttons=List.ofArray([["Update model","btn btn-default",disabled?function(x)
       {
        return x;
       }:dimUpdateDimension_],["flatten hierarchy","btn btn-default",disabled?function(x)
       {
        return x;
       }:flattenHierarchy_],["save","btn btn-default",disabled?function(x)
       {
        return x;
       }:dimGridSave_],["remove all","btn btn-default",disabled?function(x)
       {
        return x;
       }:dimGridClear_],["reload","btn btn-default",disabled?function(x)
       {
        return x;
       }:dimGridLoad_],["TABLE","btn btn-"+(model.showTable?"info":"default"),toggleTable_],["TREE","btn btn-"+(model.showTree?"info":"default"),toggleTree_],["import hierarchy","btn btn-"+(model.showRelations?"info":"default"),disabled?function(x)
       {
        return x;
       }:toggleRelations_]]);
       buttons1=Runtime.New(T,{
        $:0
       });
       content1=Runtime.New(T,{
        $:0
       });
       model1=model.dialog;
       processMessages2=function(msg)
       {
        return processMessages1({
         $:1,
         $0:msg
        });
       };
       menuItems=List.ofArray([["-",function(x)
       {
        return x;
       }]]);
       model2=model.popup;
       processMessages3=function(msg)
       {
        return processMessages1({
         $:2,
         $0:msg
        });
       };
       clas="flex flexgrow"+(model.showTable?"":" hidden");
       style=JSON.parse("{\"flex\": \"1\"}");
       clas1="flex flexgrow"+(model.showTree?"":" hidden");
       style1=JSON.parse("{\"flex\": \"1\"}");
       clas2="panel panel-info flex flexgrow"+(model.showRelations?"":" hidden");
       style2=JSON.parse("{\"flex\": \"1\"}");
       x1=ReactHtml.Button(List.ofArray([ReactHtml.Class("btn btn-default"),ReactHtml.Disabled(model.form.processing),{
        $:1,
        $0:"clear"
       }]));
       x2=ReactHtml.Button(List.ofArray([ReactHtml.Class("btn btn-default"),ReactHtml.Disabled(model.form.processing),{
        $:1,
        $0:"apply"
       }]));
       content=List.ofArray([Dialog.view("title",buttons1,content1,model1,processMessages2),Popup.view(menuItems,model2,processMessages3),ReactHtml.Div(List.ofArray([ReactHtml.Class("flex-row flexgrow"),ReactHtml.Div(List.ofArray([ReactHtml.Class(clas),ReactHtml.Style(style),{
        $:5,
        $0:dimGridClass
       }])),ReactHtml.Div(List.ofArray([ReactHtml.Class(clas1),ReactHtml.Style(style1),{
        $:5,
        $0:treeViewClass
       }])),ReactHtml.Div(List.ofArray([ReactHtml.Class(clas2),ReactHtml.Style(style2),ReactHtml.Div(List.ofArray([ReactHtml.Class("panel-heading"),ReactHtml.Label(List.ofArray([ReactHtml.Class("panel-title text-center"),{
        $:1,
        $0:"Paste relations here (ctrl-v):   "
       },ReactHtml.Div(List.ofArray([ReactHtml.Class("btn-group pull-right"),(ReactHtml.OnClick(relGridClear_))(x1),(ReactHtml.OnClick(relGridApply_))(x2)]))]))])),{
        $:5,
        $0:relGridClass
       }]))]))]);
       model3=model.form;
       processMessages4=function(msg)
       {
        return processMessages1({
         $:0,
         $0:msg
        });
       };
       return GenForm.view(buttons,content,model3,processMessages4);
      };
     };
     arg091={
      $:0,
      $0:processGeneralInMessages
     };
     x3={
      $:6,
      $0:arg091
     };
     _initModel_=DimensionForm.update(x3,initModel);
     update=function(message)
     {
      return function(model)
      {
       return DimensionForm.update(message,model);
      };
     };
     app=App.app(_initModel_,update,view);
     App.run(container,app);
     return loadData_(null);
    },
    update:function(message,model)
    {
     var _,clo1,_15,msg,popup,msg1,dialog,msg2,action,option,msg3,action1,option1,msg4,action2,option2,msg5,action3,option3,msg6,_16,f1,dimGridProcessorO,arg0,x,v,k,d,ch,c,ad,action4,option4,saveDataCallback,b,a,arg01,message1,msg7,_17,f2,relGridProcessorO,data,action5,option5,itemsCallback,b1,a1,arg02,message2,msg8,_18,rels,action6,option6,relationsCallback,f3,treeViewProcessorO,arg03,x1,b2,a2,arg04,message3,msg9,f4,generalProcessorO,callback,relationsCallback1,callback1,itemsCallback1,callback2,saveDataCallback1,msga;
     if(model.form.debug)
      {
       clo1=function(_1)
       {
        var s,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11;
        _2=function(_12)
        {
         return _12.$==16?"WhenReceiveDimGridData "+PrintfHelpers.prettyPrint(_12.$0):_12.$==15?"WhenReceiveItems "+PrintfHelpers.prettyPrint(_12.$0):_12.$==14?"WhenReceiveRelations "+PrintfHelpers.prettyPrint(_12.$0):_12.$==13?"ToggleRelations":_12.$==12?"ToggleTree":_12.$==11?"ToggleTable":_12.$==10?"ToGeneral "+_11(_12.$0):_12.$==9?"ToTreeView "+_f(_12.$0):_12.$==8?"ToRelGrid "+_e(_12.$0):_12.$==7?"ToDimGrid "+_d(_12.$0):_12.$==6?"FromGeneral "+_c(_12.$0):_12.$==5?"FromTreeView "+_b(_12.$0):_12.$==4?"FromRelGrid "+_a(_12.$0):_12.$==3?"FromDimGrid "+_6(_12.$0):_12.$==2?"ToPopupMsg "+_5(_12.$0):_12.$==1?"ToDialogMsg "+_4(_12.$0):"ToFormMsg "+_3(_12.$0);
        };
        _3=function(_12)
        {
         return _12.$==3?"SetDebug "+PrintfHelpers.prettyPrint(_12.$0):_12.$==2?"SetModified "+PrintfHelpers.prettyPrint(_12.$0):_12.$==1?"AddValidation ("+PrintfHelpers.prettyPrint(_12.$0)+", "+PrintfHelpers.prettyPrint(_12.$1)+")":"ShowInfo ("+PrintfHelpers.prettyPrint(_12.$0)+", "+PrintfHelpers.prettyPrint(_12.$1)+")";
        };
        _4=function(_12)
        {
         return"ShowDialog "+PrintfHelpers.prettyPrint(_12.$0);
        };
        _5=function(_12)
        {
         return _12.$==2?"HidePopUp":_12.$==1?"AdjustBase ("+PrintfHelpers.prettyPrint(_12.$0)+", "+PrintfHelpers.prettyPrint(_12.$1)+")":"ShowPopUp ("+PrintfHelpers.prettyPrint(_12.$0)+", "+PrintfHelpers.prettyPrint(_12.$1)+")";
        };
        _6=function(_12)
        {
         return _12.$==3?"SaveData ("+PrintfHelpers.printArray(function(_13)
         {
          return _8(_13);
         },_12.$0)+", "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$1)+", "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$2)+", "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.printArray(function(_14)
          {
           return PrintfHelpers.prettyPrint(_14);
          },_13);
         },_12.$3)+", "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.printArray(function(_14)
          {
           return PrintfHelpers.prettyPrint(_14);
          },_13);
         },_12.$4)+", "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.printArray(function(_14)
          {
           return PrintfHelpers.prettyPrint(_14);
          },_13);
         },_12.$5)+")":_12.$==2?"SlickChange "+_7(_12.$0):_12.$==1?"MessageProcessor "+PrintfHelpers.prettyPrint(_12.$0):"ShowInfo ("+PrintfHelpers.prettyPrint(_12.$0)+", "+PrintfHelpers.prettyPrint(_12.$1)+")";
        };
        _7=function(_12)
        {
         return _12.$==6?"RowSelected "+_8(_12.$0):_12.$==5?"DataRead ("+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.printArray(function(_14)
          {
           return PrintfHelpers.prettyPrint(_14);
          },_13);
         },_12.$0)+", "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$1)+", "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$2)+")":_12.$==4?"DataSaved "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.printArray(function(_14)
          {
           return PrintfHelpers.prettyPrint(_14);
          },_13);
         },_12.$0):_12.$==3?"DeleteRows "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$0):_12.$==2?"DeleteRow "+_9(_12.$0):_12.$==1?"ChangeRow "+_8(_12.$0):"AddRow ("+PrintfHelpers.prettyPrint(_12.$0)+", "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$1)+")";
        };
        _8=function(_12)
        {
         return _12.$==1?"NewRow ("+PrintfHelpers.prettyPrint(_12.$0)+", "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$1)+")":"ExistingRow ("+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$0)+", "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$1)+", "+PrintfHelpers.prettyPrint(_12.$2)+")";
        };
        _9=function(_12)
        {
         return _12.$==1?"NewKey "+PrintfHelpers.prettyPrint(_12.$0):"ExistingKey "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$0);
        };
        _a=function(_12)
        {
         return _12.$==3?"Columns "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$0):_12.$==2?"Items "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$0):_12.$==1?"MessageProcessor "+PrintfHelpers.prettyPrint(_12.$0):"ShowInfo ("+PrintfHelpers.prettyPrint(_12.$0)+", "+PrintfHelpers.prettyPrint(_12.$1)+")";
        };
        _b=function(_12)
        {
         return _12.$==3?"NodeSelected "+PrintfHelpers.prettyPrint(_12.$0):_12.$==2?"Relations "+PrintfHelpers.printArray(function(_13)
         {
          return"("+PrintfHelpers.prettyPrint(_13[0])+", "+PrintfHelpers.prettyPrint(_13[1])+")";
         },_12.$0):_12.$==1?"MessageProcessor "+PrintfHelpers.prettyPrint(_12.$0):"ShowInfo ("+PrintfHelpers.prettyPrint(_12.$0)+", "+PrintfHelpers.prettyPrint(_12.$1)+")";
        };
        _c=function(_12)
        {
         return"MessageProcessor "+PrintfHelpers.prettyPrint(_12.$0);
        };
        _d=function(_12)
        {
         return _12.$==4?"SelectRow "+_9(_12.$0):_12.$==3?"SendData":_12.$==2?"Clear":_12.$==1?"Saved "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.printArray(function(_14)
          {
           return PrintfHelpers.prettyPrint(_14);
          },_13);
         },_12.$0):"Load ("+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.printArray(function(_14)
          {
           return PrintfHelpers.prettyPrint(_14);
          },_13);
         },_12.$0)+", "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$1)+", "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$2)+")";
        };
        _e=function(_12)
        {
         return _12.$==3?"SetItems "+PrintfHelpers.printArray(function(_13)
         {
          return PrintfHelpers.prettyPrint(_13);
         },_12.$0):_12.$==2?"SendColumns":_12.$==1?"SendItems":"Clear";
        };
        _f=function(_12)
        {
         return _12.$==10?"SelectNode "+PrintfHelpers.prettyPrint(_12.$0):_12.$==9?"Saved "+PrintfHelpers.printArray(function(_13)
         {
          return"("+PrintfHelpers.prettyPrint(_13[0])+", "+PrintfHelpers.prettyPrint(_13[1])+", "+PrintfHelpers.prettyPrint(_13[2])+")";
         },_12.$0):_12.$==8?"DataClear":_12.$==7?"SetTitle ("+PrintfHelpers.prettyPrint(_12.$0)+", "+PrintfHelpers.prettyPrint(_12.$1)+", "+PrintfHelpers.prettyPrint(_12.$2)+")":_12.$==6?"AddNode ("+PrintfHelpers.prettyPrint(_12.$0)+", "+PrintfHelpers.prettyPrint(_12.$1)+", "+PrintfHelpers.prettyPrint(_12.$2)+")":_12.$==5?"DeleteNode "+PrintfHelpers.prettyPrint(_12.$0):_12.$==4?"SendSelected":_12.$==3?"SendRelations":_12.$==2?"LoadNodes "+PrintfHelpers.printArray(function(_13)
         {
          return _10(_13);
         },_12.$0):_12.$==1?"FlattenHierarchy":"ApplyRelations "+PrintfHelpers.printArray(function(_13)
         {
          return"("+PrintfHelpers.prettyPrint(_13[0])+", "+PrintfHelpers.prettyPrint(_13[1])+")";
         },_12.$0);
        };
        _10=function(_12)
        {
         return"{"+("key = "+PrintfHelpers.prettyPrint(_12.key))+"; "+("title = "+PrintfHelpers.prettyPrint(_12.title))+"; "+("tag = "+PrintfHelpers.prettyPrint(_12.tag))+"; "+("detail = "+PrintfHelpers.prettyPrint(_12.detail))+"; "+("folder = "+PrintfHelpers.prettyPrint(_12.folder))+"; "+("children = "+PrintfHelpers.printArray(function(_13)
         {
          return _10(_13);
         },_12.children))+"}";
        };
        _11=function(_12)
        {
         return _12.$==1?"TreeOut "+_b(_12.$0):"SlickOut "+_6(_12.$0);
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
     if(message.$==2)
      {
       msg=message.$0;
       popup=Popup.update(msg,model.popup);
       _15={
        form:model.form,
        dialog:model.dialog,
        popup:popup,
        showTable:model.showTable,
        showTree:model.showTree,
        showRelations:model.showRelations,
        isGuestUser:model.isGuestUser,
        dimGridProcessorO:model.dimGridProcessorO,
        relGridProcessorO:model.relGridProcessorO,
        treeViewProcessorO:model.treeViewProcessorO,
        generalProcessorO:model.generalProcessorO,
        relationsCallback:model.relationsCallback,
        itemsCallback:model.itemsCallback,
        saveDataCallback:model.saveDataCallback
       };
      }
     else
      {
       if(message.$==1)
        {
         msg1=message.$0;
         dialog=Dialog.update(msg1,model.dialog);
         _15={
          form:model.form,
          dialog:dialog,
          popup:model.popup,
          showTable:model.showTable,
          showTree:model.showTree,
          showRelations:model.showRelations,
          isGuestUser:model.isGuestUser,
          dimGridProcessorO:model.dimGridProcessorO,
          relGridProcessorO:model.relGridProcessorO,
          treeViewProcessorO:model.treeViewProcessorO,
          generalProcessorO:model.generalProcessorO,
          relationsCallback:model.relationsCallback,
          itemsCallback:model.itemsCallback,
          saveDataCallback:model.saveDataCallback
         };
        }
       else
        {
         if(message.$==7)
          {
           msg2=message.$0;
           action=function(f)
           {
            return f(msg2);
           };
           option=model.dimGridProcessorO;
           Option.iter(action,option);
           _15=model;
          }
         else
          {
           if(message.$==8)
            {
             msg3=message.$0;
             action1=function(f)
             {
              return f(msg3);
             };
             option1=model.relGridProcessorO;
             Option.iter(action1,option1);
             _15=model;
            }
           else
            {
             if(message.$==9)
              {
               msg4=message.$0;
               action2=function(f)
               {
                return f(msg4);
               };
               option2=model.treeViewProcessorO;
               Option.iter(action2,option2);
               _15=model;
              }
             else
              {
               if(message.$==10)
                {
                 msg5=message.$0;
                 action3=function(f)
                 {
                  return f(msg5);
                 };
                 option3=model.generalProcessorO;
                 Option.iter(action3,option3);
                 _15=model;
                }
               else
                {
                 if(message.$==3)
                  {
                   msg6=message.$0;
                   if(msg6.$==1)
                    {
                     f1=msg6.$0;
                     dimGridProcessorO={
                      $:1,
                      $0:f1
                     };
                     _16={
                      form:model.form,
                      dialog:model.dialog,
                      popup:model.popup,
                      showTable:model.showTable,
                      showTree:model.showTree,
                      showRelations:model.showRelations,
                      isGuestUser:model.isGuestUser,
                      dimGridProcessorO:dimGridProcessorO,
                      relGridProcessorO:model.relGridProcessorO,
                      treeViewProcessorO:model.treeViewProcessorO,
                      generalProcessorO:model.generalProcessorO,
                      relationsCallback:model.relationsCallback,
                      itemsCallback:model.itemsCallback,
                      saveDataCallback:model.saveDataCallback
                     };
                    }
                   else
                    {
                     if(msg6.$==2)
                      {
                       arg0={
                        $:0,
                        $0:msg6
                       };
                       x={
                        $:10,
                        $0:arg0
                       };
                       _16=DimensionForm.update(x,model);
                      }
                     else
                      {
                       if(msg6.$==3)
                        {
                         v=msg6.$0;
                         k=msg6.$2;
                         d=msg6.$3;
                         ch=msg6.$4;
                         c=msg6.$1;
                         ad=msg6.$5;
                         action4=function(f)
                         {
                          return f(Rop1.succeed([v,c,k,d,ch,ad]));
                         };
                         option4=model.saveDataCallback;
                         Option.iter(action4,option4);
                         saveDataCallback={
                          $:0
                         };
                         _16={
                          form:model.form,
                          dialog:model.dialog,
                          popup:model.popup,
                          showTable:model.showTable,
                          showTree:model.showTree,
                          showRelations:model.showRelations,
                          isGuestUser:model.isGuestUser,
                          dimGridProcessorO:model.dimGridProcessorO,
                          relGridProcessorO:model.relGridProcessorO,
                          treeViewProcessorO:model.treeViewProcessorO,
                          generalProcessorO:model.generalProcessorO,
                          relationsCallback:model.relationsCallback,
                          itemsCallback:model.itemsCallback,
                          saveDataCallback:saveDataCallback
                         };
                        }
                       else
                        {
                         b=msg6.$1;
                         a=msg6.$0;
                         arg01={
                          $:0,
                          $0:a,
                          $1:b
                         };
                         message1={
                          $:0,
                          $0:arg01
                         };
                         _16=DimensionForm.update(message1,model);
                        }
                      }
                    }
                   _15=_16;
                  }
                 else
                  {
                   if(message.$==4)
                    {
                     msg7=message.$0;
                     if(msg7.$==1)
                      {
                       f2=msg7.$0;
                       relGridProcessorO={
                        $:1,
                        $0:f2
                       };
                       _17={
                        form:model.form,
                        dialog:model.dialog,
                        popup:model.popup,
                        showTable:model.showTable,
                        showTree:model.showTree,
                        showRelations:model.showRelations,
                        isGuestUser:model.isGuestUser,
                        dimGridProcessorO:model.dimGridProcessorO,
                        relGridProcessorO:relGridProcessorO,
                        treeViewProcessorO:model.treeViewProcessorO,
                        generalProcessorO:model.generalProcessorO,
                        relationsCallback:model.relationsCallback,
                        itemsCallback:model.itemsCallback,
                        saveDataCallback:model.saveDataCallback
                       };
                      }
                     else
                      {
                       if(msg7.$==2)
                        {
                         data=msg7.$0;
                         action5=function(f)
                         {
                          return f(Rop1.succeed(data));
                         };
                         option5=model.itemsCallback;
                         Option.iter(action5,option5);
                         itemsCallback={
                          $:0
                         };
                         _17={
                          form:model.form,
                          dialog:model.dialog,
                          popup:model.popup,
                          showTable:model.showTable,
                          showTree:model.showTree,
                          showRelations:model.showRelations,
                          isGuestUser:model.isGuestUser,
                          dimGridProcessorO:model.dimGridProcessorO,
                          relGridProcessorO:model.relGridProcessorO,
                          treeViewProcessorO:model.treeViewProcessorO,
                          generalProcessorO:model.generalProcessorO,
                          relationsCallback:model.relationsCallback,
                          itemsCallback:itemsCallback,
                          saveDataCallback:model.saveDataCallback
                         };
                        }
                       else
                        {
                         if(msg7.$==3)
                          {
                           _17=model;
                          }
                         else
                          {
                           b1=msg7.$1;
                           a1=msg7.$0;
                           arg02={
                            $:0,
                            $0:a1,
                            $1:b1
                           };
                           message2={
                            $:0,
                            $0:arg02
                           };
                           _17=DimensionForm.update(message2,model);
                          }
                        }
                      }
                     _15=_17;
                    }
                   else
                    {
                     if(message.$==5)
                      {
                       msg8=message.$0;
                       if(msg8.$==2)
                        {
                         rels=msg8.$0;
                         action6=function(f)
                         {
                          return f(Rop1.succeed(rels));
                         };
                         option6=model.relationsCallback;
                         Option.iter(action6,option6);
                         relationsCallback={
                          $:0
                         };
                         _18={
                          form:model.form,
                          dialog:model.dialog,
                          popup:model.popup,
                          showTable:model.showTable,
                          showTree:model.showTree,
                          showRelations:model.showRelations,
                          isGuestUser:model.isGuestUser,
                          dimGridProcessorO:model.dimGridProcessorO,
                          relGridProcessorO:model.relGridProcessorO,
                          treeViewProcessorO:model.treeViewProcessorO,
                          generalProcessorO:model.generalProcessorO,
                          relationsCallback:relationsCallback,
                          itemsCallback:model.itemsCallback,
                          saveDataCallback:model.saveDataCallback
                         };
                        }
                       else
                        {
                         if(msg8.$==1)
                          {
                           f3=msg8.$0;
                           treeViewProcessorO={
                            $:1,
                            $0:f3
                           };
                           _18={
                            form:model.form,
                            dialog:model.dialog,
                            popup:model.popup,
                            showTable:model.showTable,
                            showTree:model.showTree,
                            showRelations:model.showRelations,
                            isGuestUser:model.isGuestUser,
                            dimGridProcessorO:model.dimGridProcessorO,
                            relGridProcessorO:model.relGridProcessorO,
                            treeViewProcessorO:treeViewProcessorO,
                            generalProcessorO:model.generalProcessorO,
                            relationsCallback:model.relationsCallback,
                            itemsCallback:model.itemsCallback,
                            saveDataCallback:model.saveDataCallback
                           };
                          }
                         else
                          {
                           if(msg8.$==3)
                            {
                             arg03={
                              $:1,
                              $0:msg8
                             };
                             x1={
                              $:10,
                              $0:arg03
                             };
                             _18=DimensionForm.update(x1,model);
                            }
                           else
                            {
                             b2=msg8.$1;
                             a2=msg8.$0;
                             arg04={
                              $:0,
                              $0:a2,
                              $1:b2
                             };
                             message3={
                              $:0,
                              $0:arg04
                             };
                             _18=DimensionForm.update(message3,model);
                            }
                          }
                        }
                       _15=_18;
                      }
                     else
                      {
                       if(message.$==6)
                        {
                         msg9=message.$0;
                         f4=msg9.$0;
                         generalProcessorO={
                          $:1,
                          $0:f4
                         };
                         _15={
                          form:model.form,
                          dialog:model.dialog,
                          popup:model.popup,
                          showTable:model.showTable,
                          showTree:model.showTree,
                          showRelations:model.showRelations,
                          isGuestUser:model.isGuestUser,
                          dimGridProcessorO:model.dimGridProcessorO,
                          relGridProcessorO:model.relGridProcessorO,
                          treeViewProcessorO:model.treeViewProcessorO,
                          generalProcessorO:generalProcessorO,
                          relationsCallback:model.relationsCallback,
                          itemsCallback:model.itemsCallback,
                          saveDataCallback:model.saveDataCallback
                         };
                        }
                       else
                        {
                         if(message.$==11)
                          {
                           _15=model.showTable?{
                            form:model.form,
                            dialog:model.dialog,
                            popup:model.popup,
                            showTable:false,
                            showTree:true,
                            showRelations:false,
                            isGuestUser:model.isGuestUser,
                            dimGridProcessorO:model.dimGridProcessorO,
                            relGridProcessorO:model.relGridProcessorO,
                            treeViewProcessorO:model.treeViewProcessorO,
                            generalProcessorO:model.generalProcessorO,
                            relationsCallback:model.relationsCallback,
                            itemsCallback:model.itemsCallback,
                            saveDataCallback:model.saveDataCallback
                           }:{
                            form:model.form,
                            dialog:model.dialog,
                            popup:model.popup,
                            showTable:true,
                            showTree:model.showTree,
                            showRelations:false,
                            isGuestUser:model.isGuestUser,
                            dimGridProcessorO:model.dimGridProcessorO,
                            relGridProcessorO:model.relGridProcessorO,
                            treeViewProcessorO:model.treeViewProcessorO,
                            generalProcessorO:model.generalProcessorO,
                            relationsCallback:model.relationsCallback,
                            itemsCallback:model.itemsCallback,
                            saveDataCallback:model.saveDataCallback
                           };
                          }
                         else
                          {
                           if(message.$==12)
                            {
                             _15=model.showTree?{
                              form:model.form,
                              dialog:model.dialog,
                              popup:model.popup,
                              showTable:true,
                              showTree:false,
                              showRelations:false,
                              isGuestUser:model.isGuestUser,
                              dimGridProcessorO:model.dimGridProcessorO,
                              relGridProcessorO:model.relGridProcessorO,
                              treeViewProcessorO:model.treeViewProcessorO,
                              generalProcessorO:model.generalProcessorO,
                              relationsCallback:model.relationsCallback,
                              itemsCallback:model.itemsCallback,
                              saveDataCallback:model.saveDataCallback
                             }:{
                              form:model.form,
                              dialog:model.dialog,
                              popup:model.popup,
                              showTable:model.showTable,
                              showTree:true,
                              showRelations:false,
                              isGuestUser:model.isGuestUser,
                              dimGridProcessorO:model.dimGridProcessorO,
                              relGridProcessorO:model.relGridProcessorO,
                              treeViewProcessorO:model.treeViewProcessorO,
                              generalProcessorO:model.generalProcessorO,
                              relationsCallback:model.relationsCallback,
                              itemsCallback:model.itemsCallback,
                              saveDataCallback:model.saveDataCallback
                             };
                            }
                           else
                            {
                             if(message.$==13)
                              {
                               _15=model.showRelations?{
                                form:model.form,
                                dialog:model.dialog,
                                popup:model.popup,
                                showTable:model.showTable,
                                showTree:true,
                                showRelations:false,
                                isGuestUser:model.isGuestUser,
                                dimGridProcessorO:model.dimGridProcessorO,
                                relGridProcessorO:model.relGridProcessorO,
                                treeViewProcessorO:model.treeViewProcessorO,
                                generalProcessorO:model.generalProcessorO,
                                relationsCallback:model.relationsCallback,
                                itemsCallback:model.itemsCallback,
                                saveDataCallback:model.saveDataCallback
                               }:{
                                form:model.form,
                                dialog:model.dialog,
                                popup:model.popup,
                                showTable:false,
                                showTree:true,
                                showRelations:true,
                                isGuestUser:model.isGuestUser,
                                dimGridProcessorO:model.dimGridProcessorO,
                                relGridProcessorO:model.relGridProcessorO,
                                treeViewProcessorO:model.treeViewProcessorO,
                                generalProcessorO:model.generalProcessorO,
                                relationsCallback:model.relationsCallback,
                                itemsCallback:model.itemsCallback,
                                saveDataCallback:model.saveDataCallback
                               };
                              }
                             else
                              {
                               if(message.$==14)
                                {
                                 callback=message.$0;
                                 relationsCallback1={
                                  $:1,
                                  $0:callback
                                 };
                                 _15={
                                  form:model.form,
                                  dialog:model.dialog,
                                  popup:model.popup,
                                  showTable:model.showTable,
                                  showTree:model.showTree,
                                  showRelations:model.showRelations,
                                  isGuestUser:model.isGuestUser,
                                  dimGridProcessorO:model.dimGridProcessorO,
                                  relGridProcessorO:model.relGridProcessorO,
                                  treeViewProcessorO:model.treeViewProcessorO,
                                  generalProcessorO:model.generalProcessorO,
                                  relationsCallback:relationsCallback1,
                                  itemsCallback:model.itemsCallback,
                                  saveDataCallback:model.saveDataCallback
                                 };
                                }
                               else
                                {
                                 if(message.$==15)
                                  {
                                   callback1=message.$0;
                                   itemsCallback1={
                                    $:1,
                                    $0:callback1
                                   };
                                   _15={
                                    form:model.form,
                                    dialog:model.dialog,
                                    popup:model.popup,
                                    showTable:model.showTable,
                                    showTree:model.showTree,
                                    showRelations:model.showRelations,
                                    isGuestUser:model.isGuestUser,
                                    dimGridProcessorO:model.dimGridProcessorO,
                                    relGridProcessorO:model.relGridProcessorO,
                                    treeViewProcessorO:model.treeViewProcessorO,
                                    generalProcessorO:model.generalProcessorO,
                                    relationsCallback:model.relationsCallback,
                                    itemsCallback:itemsCallback1,
                                    saveDataCallback:model.saveDataCallback
                                   };
                                  }
                                 else
                                  {
                                   if(message.$==16)
                                    {
                                     callback2=message.$0;
                                     saveDataCallback1={
                                      $:1,
                                      $0:callback2
                                     };
                                     _15={
                                      form:model.form,
                                      dialog:model.dialog,
                                      popup:model.popup,
                                      showTable:model.showTable,
                                      showTree:model.showTree,
                                      showRelations:model.showRelations,
                                      isGuestUser:model.isGuestUser,
                                      dimGridProcessorO:model.dimGridProcessorO,
                                      relGridProcessorO:model.relGridProcessorO,
                                      treeViewProcessorO:model.treeViewProcessorO,
                                      generalProcessorO:model.generalProcessorO,
                                      relationsCallback:model.relationsCallback,
                                      itemsCallback:model.itemsCallback,
                                      saveDataCallback:saveDataCallback1
                                     };
                                    }
                                   else
                                    {
                                     msga=message.$0;
                                     _15={
                                      form:GenForm.update(msga,model.form),
                                      dialog:model.dialog,
                                      popup:model.popup,
                                      showTable:model.showTable,
                                      showTree:model.showTree,
                                      showRelations:model.showRelations,
                                      isGuestUser:model.isGuestUser,
                                      dimGridProcessorO:model.dimGridProcessorO,
                                      relGridProcessorO:model.relGridProcessorO,
                                      treeViewProcessorO:model.treeViewProcessorO,
                                      generalProcessorO:model.generalProcessorO,
                                      relationsCallback:model.relationsCallback,
                                      itemsCallback:model.itemsCallback,
                                      saveDataCallback:model.saveDataCallback
                                     };
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
              }
            }
          }
        }
      }
     return _15;
    }
   },
   FancyTree:{
    createFancyTree:function(container,options,nodes,processOutMessage_O)
    {
     var sendMessage_,glyphOptions,dnDOptions,tableOptions,doEvents,ftOptions,ftOptions1,_1,opt,value1,arg00,fancyTree,updateState,processor,processInMessages;
     sendMessage_=function(msg)
     {
      var action;
      action=function(f)
      {
       return f(msg);
      };
      return Option.iter(action,processOutMessage_O);
     };
     glyphOptions={
      map:{
       doc:"fa fa-file-o",
       docOpen:"fa fa-file-o",
       checkbox:"fa fa-square-o",
       checkboxSelected:"fa fa-check-square-o",
       checkboxUnknown:"fa fa-square",
       dragHelper:"fa fa-arrow-right",
       dropMarker:"fa fa-long-arrow-right",
       error:"fa fa-warning",
       expanderClosed:"fa fa-caret-right",
       expanderLazy:"fa fa-angle-right",
       expanderOpen:"fa fa-caret-down",
       folder:"fa fa-folder-o",
       folderOpen:"fa fa-folder-open-o",
       loading:"fa fa-spinner fa-pulse"
      }
     };
     dnDOptions={
      focusOnClick:true,
      dragStart:function()
      {
       return true;
      },
      dragEnter:function()
      {
       return true;
      },
      dragDrop:function(node,data)
      {
       data.otherNode.moveTo(node,data.hitMode);
       (node.hasChildren()?!node.isFolder():false)?void(node.folder=true):null;
       return node.setExpanded();
      }
     };
     tableOptions={};
     doEvents=[true];
     ftOptions={
      extensions:["glyph","clones","dnd"],
      clones:{
       highlightClones:true
      },
      glyph:glyphOptions,
      source:nodes,
      checkbox:false,
      dnd:dnDOptions,
      table:tableOptions,
      dblclick:function(event,data)
      {
       var _,value;
       if(doEvents[0])
        {
         value=data.node;
         _=sendMessage_({
          $:3,
          $0:value
         });
        }
       else
        {
         _=null;
        }
       return _;
      }
     };
     if(options.$==1)
      {
       opt=options.$0;
       value1=jQuery.extend.apply(jQuery,[ftOptions,opt]);
       _1=value1;
      }
     else
      {
       _1=ftOptions;
      }
     ftOptions1=_1;
     arg00=$(container).fancytree(ftOptions1);
     fancyTree=$(arg00).fancytree("getTree");
     updateState=function()
     {
      return function(msg)
      {
       var getNodeBy,convert,_2,ftNodes1,relations,action,getFlatNodes,source1,arg001,getRelations,array1,arg0,key,node1,_3,_4,action3,array2,array3,title,key1,id,node2,title1,key2,id1,value,nodes1,action4,key4,node3,_5,arg01;
       getNodeBy=function(f)
       {
        var findNode;
        findNode=function(baseNode)
        {
         var _,chooser,source;
         if(baseNode.hasChildren())
          {
           chooser=function(child)
           {
            return f(child)?{
             $:1,
             $0:child
            }:findNode(child);
           };
           source=baseNode.children;
           _=Seq.tryPick(chooser,source);
          }
         else
          {
           _={
            $:0
           };
          }
         return _;
        };
        return findNode(fancyTree.getRootNode());
       };
       convert=function(ftNodes)
       {
        var mapping;
        mapping=function(ftNode)
        {
         return{
          key:ftNode.key,
          title:ftNode.title,
          tag:ftNode.tag,
          detail:ftNode.detail,
          folder:ftNode.folder,
          children:convert(ftNode.children)
         };
        };
        return Arrays.map(mapping,ftNodes);
       };
       if(msg.$==2)
        {
         ftNodes1=msg.$0;
         fancyTree.reload(ftNodes1);
         _2=fancyTree.getRootNode().visit(function(node)
         {
          node.setExpanded(true);
         });
        }
       else
        {
         if(msg.$==0)
          {
           relations=msg.$0;
           action=function(tupledArg)
           {
            var child,parent,parentNode,childNode,action1;
            child=tupledArg[0];
            parent=tupledArg[1];
            parentNode=getNodeBy(function(node)
            {
             return node.data.tag===parent;
            });
            childNode=getNodeBy(function(node)
            {
             return node.data.tag===child;
            });
            action1=function(childN)
            {
             var action2;
             action2=function(parentN)
             {
              return childN.moveTo(parentN,"child");
             };
             return Option.iter(action2,parentNode);
            };
            return Option.iter(action1,childNode);
           };
           _2=Arrays.iter(action,relations);
          }
         else
          {
           if(msg.$==1)
            {
             getFlatNodes=function(baseNode)
             {
              var x,mapping,source;
              x=baseNode.children;
              mapping=function(node)
              {
               return Runtime.New(T,{
                $:1,
                $0:{
                 key:node.key,
                 title:node.title,
                 data:node.data,
                 folder:false,
                 children:[]
                },
                $1:node.hasChildren()?getFlatNodes(node):Runtime.New(T,{
                 $:0
                })
               });
              };
              source=Seq.collect(mapping,x);
              return Seq.toList(source);
             };
             source1=getFlatNodes(fancyTree.getRootNode());
             arg001=Seq.toArray(source1);
             _2=fancyTree.reload(arg001);
            }
           else
            {
             if(msg.$==3)
              {
               getRelations=function(baseNode)
               {
                var _,mapping,array;
                if(baseNode.hasChildren())
                 {
                  mapping=function(child)
                  {
                   return[[child.data.tag,baseNode.data.tag]].concat(getRelations(child));
                  };
                  array=baseNode.children;
                  _=Arrays.collect(mapping,array);
                 }
                else
                 {
                  _=[];
                 }
                return _;
               };
               array1=fancyTree.getRootNode().children;
               arg0=Arrays.collect(getRelations,array1);
               _2=sendMessage_({
                $:2,
                $0:arg0
               });
              }
             else
              {
               if(msg.$==5)
                {
                 key=msg.$0;
                 node1=fancyTree.getNodeByKey(key);
                 if(!(!node1))
                  {
                   if(node1.hasChildren())
                    {
                     action3=function(child)
                     {
                      return child.moveTo(node1,"before");
                     };
                     array2=node1.children;
                     array3=array2.slice();
                     _4=Arrays.iter(action3,array3);
                    }
                   else
                    {
                     _4=null;
                    }
                   _3=node1.remove();
                  }
                 else
                  {
                   _3=null;
                  }
                 _2=_3;
                }
               else
                {
                 if(msg.$==8)
                  {
                   _2=fancyTree.clear();
                  }
                 else
                  {
                   if(msg.$==7)
                    {
                     title=msg.$1;
                     key1=msg.$0;
                     id=msg.$2;
                     node2=fancyTree.getNodeByKey(key1);
                     node2.setTitle(title);
                     _2=void(node2.data.tag=id);
                    }
                   else
                    {
                     if(msg.$==6)
                      {
                       title1=msg.$1;
                       key2=msg.$0;
                       id1=msg.$2;
                       value=fancyTree.getRootNode().addNode({
                        key:key2,
                        title:title1,
                        folder:false,
                        tag:id1
                       });
                       _2=void value;
                      }
                     else
                      {
                       if(msg.$==9)
                        {
                         nodes1=msg.$0;
                         action4=function(tupledArg)
                         {
                          var key3,title2,id2,oldNodeO,action1;
                          key3=tupledArg[0];
                          title2=tupledArg[1];
                          id2=tupledArg[2];
                          oldNodeO=getNodeBy(function(node)
                          {
                           return node.data.tag===id2;
                          });
                          action1=function(oldNode)
                          {
                           var newNode,_,action2,array,array4;
                           newNode=oldNode.parent.addNode({
                            key:key3,
                            title:title2,
                            folder:oldNode.folder,
                            tag:id2
                           });
                           if(oldNode.hasChildren())
                            {
                             action2=function(child)
                             {
                              return child.moveTo(newNode,"child");
                             };
                             array=oldNode.children;
                             array4=array.slice();
                             _=Arrays.iter(action2,array4);
                            }
                           else
                            {
                             _=null;
                            }
                           return oldNode.remove();
                          };
                          return Option.iter(action1,oldNodeO);
                         };
                         _2=Arrays.iter(action4,nodes1);
                        }
                       else
                        {
                         if(msg.$==10)
                          {
                           key4=msg.$0;
                           node3=fancyTree.getNodeByKey(key4);
                           if(!(!node3))
                            {
                             doEvents[0]=false;
                             node3.setActive(true,{
                              noEvents:true,
                              noFocus:true
                             });
                             node3.makeVisible();
                             _5=void(doEvents[0]=true);
                            }
                           else
                            {
                             _5=null;
                            }
                           _2=_5;
                          }
                         else
                          {
                           arg01=fancyTree.getActiveNode();
                           _2=sendMessage_({
                            $:3,
                            $0:arg01
                           });
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
       return _2;
      };
     };
     processor=Model2.processorAgent(null,updateState);
     processInMessages=function(message)
     {
      processor.mailbox.AddLast(message);
      return processor.resume();
     };
     sendMessage_({
      $:1,
      $0:processInMessages
     });
     return null;
    }
   },
   FancyTreeTestClient:{
    createFancyTree_:function()
    {
     var x,innerPane,x1,gridPane,x2,leftPane,x3,rightPane,arg10,arg101,arg102,arg103;
     x=List.ofArray([Attr.Attr().NewAttr("class","flex flexgrow")]);
     innerPane=Tags.Tags().NewTag("div",x);
     x1=List.ofArray([Attr.Attr().NewAttr("class","flex flexgrow")]);
     gridPane=Tags.Tags().NewTag("div",x1);
     x2=List.ofArray([Attr.Attr().NewAttr("class","flex flexgrow")]);
     leftPane=Tags.Tags().NewTag("div",x2);
     x3=List.ofArray([Attr.Attr().NewAttr("class","flex flexgrow")]);
     rightPane=Tags.Tags().NewTag("div",x3);
     arg102=List.ofArray([Tags.Tags().text("save changes")]);
     arg103=List.ofArray([Tags.Tags().text("import parent child relations")]);
     arg101=List.ofArray([Tags.Tags().NewTag("button",arg102),Tags.Tags().NewTag("button",arg103)]);
     arg10=List.ofArray([Tags.Tags().NewTag("div",arg101),Operators.add(innerPane,List.ofArray([leftPane,rightPane]))]);
     return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Attr.Attr().NewAttr("class","flex flexgrow")]));
    }
   },
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
       x=ReactHtml.Select(List.ofArray([ReactHtml.Value(Option1.defaultV("",value))]));
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
      $:6
     }:ReactHtml.Span(List.ofArray([ReactHtml.Class("alert validation"),{
      $:1,
      $0:msg
     }]));
    }
   },
   GenForm:{
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
    init:function(title)
    {
     return{
      title:title,
      processing:false,
      message:"",
      debug:false,
      modified:false,
      validations:FSharpSet.New(Runtime.New(T,{
       $:0
      }))
     };
    },
    update:function(message,model)
    {
     var model1,_,vs,name,validations,modified,debug,p,msg;
     if(message.$==1)
      {
       vs=message.$1;
       name=message.$0;
       validations=GenForm.addValidationsFor(name,model.validations,vs);
       _={
        title:model.title,
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
          title:model.title,
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
            title:model.title,
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
            title:model.title,
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
    view:function(buttons,content,model,processMessages)
    {
     var buttons1,buttons2,msg,arg01,node,node1;
     buttons1=Runtime.New(T,{
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
      $1:buttons
     });
     buttons2=Dialog.rButtons(buttons1);
     msg=model.message===""?{
      $:6
     }:ReactHtml.Span(List.ofArray([ReactHtml.Class("alert validation"),{
      $:1,
      $0:model.message
     }]));
     arg01=(model.modified?"*":"")+model.title;
     node=ReactHtml.Div(List.ofArray([ReactHtml.Class("btn-toolbar pull-right")]));
     node1=ReactHtml.Div(List.ofArray([ReactHtml.Class("panel-body flex flexgrow")]));
     return ReactHtml.Div(List.ofArray([ReactHtml.Class("panel panel-info flex flexgrow"),ReactHtml.Div(List.ofArray([ReactHtml.Class("panel-heading heading"),ReactHtml.Label(List.ofArray([ReactHtml.Class("panel-title text-center"),{
      $:1,
      $0:arg01
     }])),msg,ReactHtml.addChildren(buttons2,node)])),ReactHtml.addChildren(content,node1)]));
    }
   },
   JSEvent:Runtime.Class({
    subscribe:function()
    {
     return null;
    }
   }),
   Layouts:{
    BasicContainer:function(header,footer,center)
    {
     var node,node1,node2;
     node=ReactHtml.Div(List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._flex("0 0 auto")]))]));
     node1=ReactHtml.Div(List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._flex("1 1 auto"),ReactHtml._overflow("auto")]))]));
     node2=ReactHtml.Div(List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._flex("0 0 auto")]))]));
     return ReactHtml.Div(List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._display("flex")])),ReactHtml.addChildren(header,node),ReactHtml.addChildren(center,node1),ReactHtml.addChildren(footer,node2)]));
    },
    Children:function(_arg1)
    {
     var _,children;
     if(_arg1.$==0)
      {
       children=_arg1.$1;
       _=children;
      }
     else
      {
       _=Runtime.New(T,{
        $:0
       });
      }
     return _;
    },
    HorizontalSplitter:function(header,footer,left,right,center)
    {
     var x,_arg1,x1,x2;
     x=Layouts.BasicContainer(left,right,center);
     _arg1=((ReactHtml.addAttribute())(ReactHtml._Style(List.ofArray([ReactHtml._flexFlow("row")]))))(x);
     x1=Layouts.Children(_arg1);
     x2=Layouts.BasicContainer(header,footer,x1);
     return((ReactHtml.addAttribute())(ReactHtml._Style(List.ofArray([ReactHtml._flexFlow("column")]))))(x2);
    },
    Stretch:function(elem)
    {
     return((ReactHtml.addAttribute())(ReactHtml._Style(List.ofArray([ReactHtml._position("absolute"),ReactHtml._top("0Px"),ReactHtml._left("0Px"),ReactHtml._bottom("0Px"),ReactHtml._right("0Px")]))))(elem);
    },
    VerticalSplitter:function(header,footer,left,right,center)
    {
     var x,_arg1,x1,x2;
     x=Layouts.BasicContainer(header,footer,center);
     _arg1=((ReactHtml.addAttribute())(ReactHtml._Style(List.ofArray([ReactHtml._flexFlow("column")]))))(x);
     x1=Layouts.Children(_arg1);
     x2=Layouts.BasicContainer(left,right,x1);
     return((ReactHtml.addAttribute())(ReactHtml._Style(List.ofArray([ReactHtml._flexFlow("row")]))))(x2);
    }
   },
   LoginForm:{
    LoginReactForm:function(goLink,error)
    {
     var InitialStatus,f,arg101,x2,f2,content;
     InitialStatus=function()
     {
      return{
       UserName:"",
       Password:"",
       InProgress:false,
       Error:error
      };
     };
     f=React.createClass({
      displayName:"LRF",
      getInitialState:InitialStatus,
      render:function()
      {
       var setState_,setState,_this=this,state,submit,submitGuest,usernameChange,passwordChange,disabledClass,matchValue,x,_b,e1,matchValue1,array1,x1,array11,elems,arg10,arg20;
       setState_=this.setState;
       setState=function(newState)
       {
        var value;
        value=setState_.apply(_this,[newState]);
        return;
       };
       state=_this.state;
       submit=function(e)
       {
        var change,_builder_,f1;
        e.preventDefault();
        change={
         $:2
        };
        setState(LoginForm.newModel(state,change));
        f1=function(failed)
        {
         return function(ms)
         {
          var _,change1,_1,_2,_3,_4,_5,_6,_7,_8;
          if(failed)
           {
            _1=function(_9)
            {
             return _9.$==29?"ErrGuestUserNotActivated":_9.$==28?"ErrAleaError ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==27?"ErrNoRecordsProcessed":_9.$==26?"ErrUnsuportedDataStorage":_9.$==25?"ErrWebSharperCompiler "+PrintfHelpers.prettyPrint(_9.$0):_9.$==24?"ErrFSharpCompiler "+PrintfHelpers.prettyPrint(_9.$0):_9.$==23?"ErrFeatureNotImplemented "+PrintfHelpers.prettyPrint(_9.$0):_9.$==22?"ErrRecordNotFound ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==21?"ErrRecordWasNotUpdated "+PrintfHelpers.prettyPrint(_9.$0):_9.$==20?"ErrDockerIsNotPresent "+_5(_9.$0):_9.$==19?"ErrObjectNotFound "+_8(_9.$0):_9.$==18?"ErrNoProvisionedClientAvailable":_9.$==17?"ErrClientNotFound "+_7(_9.$0):_9.$==16?"ErrUserIsNotDefined "+PrintfHelpers.prettyPrint(_9.$0):_9.$==15?"ErrUserIsNotAssociatedToClient "+_6(_9.$0):_9.$==14?"ErrDockerDataNotFound "+_5(_9.$0):_9.$==13?"ErrUniqueIdNotDefinedForReport "+_2(_9.$0):_9.$==12?"ErrDockerDefinitionNotFound "+_5(_9.$0):_9.$==11?"ErrTableDefinitionNotFound "+_3(_9.$0):_9.$==10?"ErrReportDefinitionNotFound "+_2(_9.$0):_9.$==9?"ErrInvalidContentPageForClient "+PrintfHelpers.prettyPrint(_9.$0):_9.$==8?"ErrInvalidToken "+PrintfHelpers.prettyPrint(_9.$0):_9.$==7?"ErrLoginFailed "+PrintfHelpers.prettyPrint(_9.$0):_9.$==6?"ErrUserIsNotLoggedIn":_9.$==5?"ErrValueIsNull ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==4?"ErrParameterMissing "+PrintfHelpers.prettyPrint(_9.$0):_9.$==3?"ErrDuplicatedKeys ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.printArray(function(_a)
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
            change1={
             $:3,
             $0:PrintfHelpers.printList(function(_9)
             {
              return _1(_9);
             },ms)
            };
            _=setState(LoginForm.newModel(state,change1));
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
         return Rop1.messagesDo(f1,_arg1);
        });
        return _builder_.Delay(function()
        {
         return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:15",[state.UserName,state.Password]),function(_arg1)
         {
          Browser.globalToken=function()
          {
           return _arg1;
          };
          window.location.href=goLink;
          return _builder_.Zero();
         });
        });
       };
       submitGuest=function()
       {
        var change,_builder_,f1;
        change={
         $:2
        };
        setState(LoginForm.newModel(state,change));
        f1=function(failed)
        {
         return function(ms)
         {
          var _,change1,_1,_2,_3,_4,_5,_6,_7,_8;
          if(failed)
           {
            _1=function(_9)
            {
             return _9.$==29?"ErrGuestUserNotActivated":_9.$==28?"ErrAleaError ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==27?"ErrNoRecordsProcessed":_9.$==26?"ErrUnsuportedDataStorage":_9.$==25?"ErrWebSharperCompiler "+PrintfHelpers.prettyPrint(_9.$0):_9.$==24?"ErrFSharpCompiler "+PrintfHelpers.prettyPrint(_9.$0):_9.$==23?"ErrFeatureNotImplemented "+PrintfHelpers.prettyPrint(_9.$0):_9.$==22?"ErrRecordNotFound ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==21?"ErrRecordWasNotUpdated "+PrintfHelpers.prettyPrint(_9.$0):_9.$==20?"ErrDockerIsNotPresent "+_5(_9.$0):_9.$==19?"ErrObjectNotFound "+_8(_9.$0):_9.$==18?"ErrNoProvisionedClientAvailable":_9.$==17?"ErrClientNotFound "+_7(_9.$0):_9.$==16?"ErrUserIsNotDefined "+PrintfHelpers.prettyPrint(_9.$0):_9.$==15?"ErrUserIsNotAssociatedToClient "+_6(_9.$0):_9.$==14?"ErrDockerDataNotFound "+_5(_9.$0):_9.$==13?"ErrUniqueIdNotDefinedForReport "+_2(_9.$0):_9.$==12?"ErrDockerDefinitionNotFound "+_5(_9.$0):_9.$==11?"ErrTableDefinitionNotFound "+_3(_9.$0):_9.$==10?"ErrReportDefinitionNotFound "+_2(_9.$0):_9.$==9?"ErrInvalidContentPageForClient "+PrintfHelpers.prettyPrint(_9.$0):_9.$==8?"ErrInvalidToken "+PrintfHelpers.prettyPrint(_9.$0):_9.$==7?"ErrLoginFailed "+PrintfHelpers.prettyPrint(_9.$0):_9.$==6?"ErrUserIsNotLoggedIn":_9.$==5?"ErrValueIsNull ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.prettyPrint(_9.$1)+")":_9.$==4?"ErrParameterMissing "+PrintfHelpers.prettyPrint(_9.$0):_9.$==3?"ErrDuplicatedKeys ("+PrintfHelpers.prettyPrint(_9.$0)+", "+PrintfHelpers.printArray(function(_a)
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
            change1={
             $:3,
             $0:PrintfHelpers.printList(function(_9)
             {
              return _1(_9);
             },ms)
            };
            _=setState(LoginForm.newModel(state,change1));
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
         return Rop1.messagesDo(f1,_arg1);
        });
        return _builder_.Delay(function()
        {
         return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:16",[]),function(_arg2)
         {
          Browser.globalToken=function()
          {
           return _arg2;
          };
          window.location.href=goLink;
          return _builder_.Zero();
         });
        });
       };
       usernameChange=function(e)
       {
        var change;
        change={
         $:0,
         $0:e.target.value
        };
        return setState(LoginForm.newModel(state,change));
       };
       passwordChange=function(e)
       {
        var change;
        change={
         $:1,
         $0:e.target.value
        };
        return setState(LoginForm.newModel(state,change));
       };
       disabledClass=state.InProgress?" disabled":"";
       matchValue=state.Error;
       if(matchValue.$==0)
        {
         _b=[];
        }
       else
        {
         e1=matchValue.$0;
         _b=!state.InProgress?[React.createElement("div",{
          key:"_7",
          className:"alert alert-danger"
         },e1)]:[];
        }
       x=_b;
       matchValue1=state.InProgress;
       array1=matchValue1?[React.createElement("div",{
        key:"_8",
        className:"text-center"
       },React.createElement("img",{
        src:"/Resources/images/loader.gif"
       }))]:[];
       x1=array1.concat(x);
       array11=[React.createElement("input",{
        key:"_1",
        type:"text",
        className:"form-control"+disabledClass,
        placeholder:"User Name",
        value:state.UserName,
        onChange:usernameChange,
        disabled:state.InProgress
       }),React.createElement("br",{
        key:"_2"
       }),React.createElement("input",{
        key:"_3",
        type:"password",
        className:"form-control",
        placeholder:"Password",
        value:state.Password,
        onChange:passwordChange,
        disabled:state.InProgress
       }),React.createElement("br",{
        key:"_4"
       }),React.createElement("button",{
        key:"_5",
        type:"submit",
        className:"btn btn-primary btn-block"+disabledClass
       },"Login"),React.createElement("div",{
        key:"_6",
        className:"flex-row"
       },React.createElement("div",{
        className:"flexgrow"
       },React.createElement("hr",{})),React.createElement("div",{
        className:"flexgrow-1-5 text-center"
       },React.createElement("h5",{},"or")),React.createElement("div",{
        className:"flexgrow"
       },React.createElement("hr",{}))),React.createElement("button",{
        key:"_9",
        type:"button",
        className:"btn btn-info btn-block"+disabledClass,
        onClick:submitGuest
       },"Enter as Guest"),React.createElement("br",{
        key:"_10"
       })];
       elems=array11.concat(x1);
       arg10=List.ofArray([{
        onSubmit:submit
       }]);
       arg20=Seq.toList(elems);
       return R.tag("form",arg10,arg20);
      }
     });
     arg101=Runtime.New(T,{
      $:0
     });
     x2=Tags.Tags().NewTag("div",arg101);
     f2=function(e)
     {
      return ReactDOM.render(React.createElement(f),e.Dom);
     };
     Operators.OnAfterRender(f2,x2);
     content=x2;
     return content;
    },
    newModel:function(model,change)
    {
     var a,_,pwd,Error,err,Error1,username,Error2;
     a="New Model: "+JSON.stringify(model)+", Change: "+String(change);
     console?console.log(a):undefined;
     if(change.$==1)
      {
       pwd=change.$0;
       Error={
        $:0
       };
       _={
        UserName:model.UserName,
        Password:pwd,
        InProgress:model.InProgress,
        Error:Error
       };
      }
     else
      {
       if(change.$==2)
        {
         _={
          UserName:model.UserName,
          Password:model.Password,
          InProgress:true,
          Error:model.Error
         };
        }
       else
        {
         if(change.$==3)
          {
           err=change.$0;
           Error1={
            $:1,
            $0:err
           };
           _={
            UserName:model.UserName,
            Password:model.Password,
            InProgress:false,
            Error:Error1
           };
          }
         else
          {
           username=change.$0;
           Error2={
            $:0
           };
           _={
            UserName:username,
            Password:model.Password,
            InProgress:model.InProgress,
            Error:Error2
           };
          }
        }
      }
     return _;
    },
    render:function()
    {
     var arg10,arg101,arg102,arg103,arg104,arg105,arg106;
     arg101=List.ofArray([Attr.Attr().NewAttr("type","text")]);
     arg102=Runtime.New(T,{
      $:0
     });
     arg103=List.ofArray([Attr.Attr().NewAttr("type","password")]);
     arg104=Runtime.New(T,{
      $:0
     });
     arg105=List.ofArray([Attr.Attr().NewAttr("type","submit")]);
     arg106=Runtime.New(T,{
      $:0
     });
     arg10=List.ofArray([Operators.add(Operators.add(Tags.Tags().NewTag("input",arg101),List.ofArray([Attr.Attr().NewAttr("class","form-control")])),List.ofArray([Attr.Attr().NewAttr("placeholder","User Name")])),Tags.Tags().NewTag("br",arg102),Operators.add(Operators.add(Tags.Tags().NewTag("input",arg103),List.ofArray([Attr.Attr().NewAttr("class","form-control")])),List.ofArray([Attr.Attr().NewAttr("placeholder","Password")])),Tags.Tags().NewTag("br",arg104),Operators.add(Operators.add(Tags.Tags().NewTag("button",arg105),List.ofArray([Attr.Attr().NewAttr("class","btn btn-primary btn-block")])),List.ofArray([Tags.Tags().text("Login")])),Tags.Tags().NewTag("br",arg106)]);
     return Tags.Tags().NewTag("div",arg10);
    }
   },
   MenuBar:{
    initW_:function(token,dim)
    {
     var _builder_;
     _builder_=ARop.wrap();
     return _builder_.Delay(function()
     {
      return _builder_.Bind(MenuBar.loadMenuEntriesW_(token,dim),function(_arg1)
      {
       return _builder_.Return({
        search1:SearchFlickr.init(),
        search2:SearchFlickr.init(),
        entries:_arg1
       });
      });
     });
    },
    loadMenuEntriesW_:function(token,navDim)
    {
     var _builder_;
     _builder_=ARop.wrap();
     return _builder_.Delay(function()
     {
      return _builder_.Bind1(AjaxRemotingProvider.Async("CIPHERPrototype2:22",[token,navDim]),function(_arg1)
      {
       var rels,keys,elements,columns,getColO_,getElement,menuEntry,getChildren,chooser1,projection1,source3,source4;
       rels=_arg1[3];
       keys=_arg1[2];
       elements=_arg1[0];
       columns=_arg1[1];
       getColO_=function(colname)
       {
        var chooser,source;
        chooser=function(col)
        {
         var _,value;
         if(col.name===colname)
          {
           value=col.field;
           _={
            $:1,
            $0:value
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
        source=Seq.choose(chooser,columns);
        return Seq1.tryHead(source);
       };
       getElement=function(eid)
       {
        var predicate;
        predicate=function(tupledArg)
        {
         var id;
         tupledArg[0];
         id=tupledArg[1];
         tupledArg[2];
         tupledArg[3];
         tupledArg[4];
         tupledArg[5];
         return Unchecked.Equals(eid,id);
        };
        return Seq.tryFind(predicate,elements);
       };
       menuEntry=function(eid)
       {
        var x,mapping;
        x=getElement(eid);
        mapping=function(tupledArg)
        {
         var _arg6,id,name,desc,order,attribs,predicate,_arg11,predicate1,_arg12,mapping1,option,mapping2,option1,projection,mapping3,source,source1,source2;
         _arg6=tupledArg[0];
         id=tupledArg[1];
         name=tupledArg[2];
         desc=tupledArg[3];
         order=tupledArg[4];
         attribs=tupledArg[5];
         predicate=function(s)
         {
          return Strings.Trim(s)!=="";
         };
         _arg11=Option.filter(predicate,desc);
         predicate1=function(s)
         {
          return Strings.Trim(s)!=="";
         };
         _arg12=Option.filter(predicate1,order);
         mapping1=function(i)
         {
          var value;
          value=Arrays.get(attribs,i-5);
          return value;
         };
         option=getColO_("TemplatePage");
         mapping2=function(i)
         {
          var value;
          value=Arrays.get(attribs,i-5);
          return value;
         };
         option1=getColO_("ContentPage");
         projection=function(tupledArg1)
         {
          var c,o;
          c=tupledArg1[0];
          o=tupledArg1[1];
          return Option1.defaultV(c.order,o);
         };
         mapping3=function(tuple)
         {
          return tuple[0];
         };
         source=getChildren(eid);
         source1=Seq.sortBy(projection,source);
         source2=Seq.map(mapping3,source1);
         return{
          id:eid,
          name:name,
          description:Option1.defaultV(name,_arg11),
          order:Option1.defaultV(name,_arg12),
          template:Option.map(mapping1,option),
          content:Option.map(mapping2,option1),
          children:Seq.toList(source2)
         };
        };
        return Option.map(mapping,x);
       };
       getChildren=function(eid)
       {
        var chooser;
        chooser=function(tupledArg)
        {
         var child,parent,order,_,mapping,option;
         child=tupledArg[0];
         parent=tupledArg[1];
         tupledArg[2];
         order=tupledArg[3];
         if(Unchecked.Equals(eid,parent))
          {
           mapping=function(e)
           {
            return[e,order];
           };
           option=menuEntry(child);
           _=Option.map(mapping,option);
          }
         else
          {
           _={
            $:0
           };
          }
         return _;
        };
        return Seq.choose(chooser,rels);
       };
       chooser1=function(tupledArg)
       {
        var _arg11,eid,_arg12,_arg13,_arg14,predicate,value;
        _arg11=tupledArg[0];
        eid=tupledArg[1];
        _arg12=tupledArg[2];
        _arg13=tupledArg[3];
        _arg14=tupledArg[4];
        tupledArg[5];
        predicate=function(tupledArg1)
        {
         var child;
         child=tupledArg1[0];
         tupledArg1[1];
         tupledArg1[2];
         tupledArg1[3];
         return Unchecked.Equals(child,eid);
        };
        value=Seq.exists(predicate,rels);
        return!value?menuEntry(eid):{
         $:0
        };
       };
       projection1=function(e)
       {
        return e.order;
       };
       source3=Seq.choose(chooser1,elements);
       source4=Seq.sortBy(projection1,source3);
       return _builder_.Return(Seq.toList(source4));
      });
     });
    },
    menu:function(model,name)
    {
     var chooser,source,source1,x,def,entries,mapping,source2;
     chooser=function(e)
     {
      return e.name===name?{
       $:1,
       $0:e.children
      }:{
       $:0
      };
     };
     source=model.entries;
     source1=Seq.choose(chooser,source);
     x=Seq1.tryHead(source1);
     def=Runtime.New(T,{
      $:0
     });
     entries=Option1.defaultV(def,x);
     mapping=function(e)
     {
      return ReactHtml.Ul(List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._alignSelf("center")])),{
       $:2,
       $0:"dangerouslySetInnerHTML",
       $1:ReactHtml.newAttr("__html",e.description)
      }]));
     };
     source2=Seq.map(mapping,entries);
     return Seq.toList(source2);
    },
    text:function(txt)
    {
     return List.ofArray([ReactHtml.H3(List.ofArray([{
      $:1,
      $0:txt
     }])),ReactHtml._Style(List.ofArray([ReactHtml._background(txt)]))]);
    },
    update:function(msg,model)
    {
     var _,msg1,search2,es,msg2;
     if(msg.$==1)
      {
       msg1=msg.$0;
       search2=SearchFlickr.update(msg1,model.search2);
       _={
        search1:model.search1,
        search2:search2,
        entries:model.entries
       };
      }
     else
      {
       if(msg.$==2)
        {
         es=msg.$0;
         _={
          search1:model.search1,
          search2:model.search2,
          entries:es
         };
        }
       else
        {
         msg2=msg.$0;
         _={
          search1:SearchFlickr.update(msg2,model.search1),
          search2:model.search2,
          entries:model.entries
         };
        }
      }
     return _;
    },
    view:function(model)
    {
     return Layouts.BasicContainer(List.ofArray([ReactHtml.Img(List.ofArray([ReactHtml.Src("/EPFile/LOGO.png"),ReactHtml._Style(List.ofArray([ReactHtml._maxWidth("20rem"),ReactHtml._maxHeight("6rem")]))]))]),Runtime.New(T,{
      $:1,
      $0:ReactHtml._Style(List.ofArray([ReactHtml._display("flex")])),
      $1:MenuBar.menu(model,"Second Menu")
     }),Runtime.New(T,{
      $:1,
      $0:ReactHtml._Style(List.ofArray([ReactHtml._display("flex")])),
      $1:MenuBar.menu(model,"Main Menu")
     }));
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
    FieldDefinition:Runtime.Class({
     basicValidations:function(value)
     {
      var arg00,_,s;
      if(value.$==0)
       {
        s=value.$0;
        _=this.validateString(s);
       }
      else
       {
        _=value.$==3?this.validateString(""):value.$==4?List.ofArray([{
         $:3,
         $0:""
        }]):Runtime.New(T,{
         $:0
        });
       }
      arg00=_;
      return FSharpSet.New(arg00);
     },
     get_label:function()
     {
      var x,s,def;
      x=this.labelO;
      s=Strings.Replace(this.fieldName,"_"," ");
      def=Slice.string(s,{
       $:1,
       $0:0
      },{
       $:1,
       $0:0
      }).toUpperCase()+Slice.string(s,{
       $:1,
       $0:1
      },{
       $:0
      });
      return Option1.defaultV(def,x);
     },
     get_placeholder:function()
     {
      var x,def;
      x=this.placeholderO;
      def="Enter "+this.get_label();
      return Option1.defaultV(def,x);
     },
     validateString:function(s)
     {
      var s1,_this=this;
      s1=this.trimText?Strings.Trim(s):s;
      return Seq.toList(Seq.delay(function()
      {
       return Seq.append((_this.maxLen>0?s1.length>_this.maxLen:false)?[{
        $:1,
        $0:_this.maxLen
       }]:Seq.empty(),Seq.delay(function()
       {
        return(!_this.canBeEmpty?s1==="":false)?[{
         $:0
        }]:Seq.empty();
       }));
      }));
     },
     validations:function(value)
     {
      var matchValue,_,f;
      matchValue=this.validation;
      if(matchValue.$==1)
       {
        f=matchValue.$0;
        _=f(value);
       }
      else
       {
        _=this.basicValidations(value);
       }
      return _;
     }
    }),
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
    callF:function(f,p1,p2)
    {
     var f1;
     f1=Runtime.CreateFuncWithArgs(f);
     return f1.apply(null,[p1,p2]);
    },
    defField:function(getter)
    {
     var setter,labelO,placeholderO;
     setter=function()
     {
      return function()
      {
       return{
        $:0
       };
      };
     };
     labelO={
      $:0
     };
     placeholderO={
      $:0
     };
     return Runtime.New(FieldDefinition,{
      fieldName:"",
      getter:getter,
      setter:setter,
      labelO:labelO,
      placeholderO:placeholderO,
      typeF:"string",
      maxLen:0,
      hidden:false,
      canBeNull:true,
      canBeEmpty:true,
      isReadOnly:false,
      trimText:true,
      blankspaces:true,
      validation:{
       $:0
      },
      preButton:"",
      postButton:"",
      inputType:"text"
     });
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
    processorAgent:function(initial,updateState)
    {
     return MailboxProcessor.Start(function(inbox)
     {
      var loop;
      loop=function(state)
      {
       return Concurrency.Delay(function()
       {
        return Concurrency.Bind(inbox.Receive({
         $:0
        }),function(_arg1)
        {
         var newStateR;
         newStateR=(Rop1.callTry(function()
         {
          return(updateState(state))(_arg1);
         }))(null);
         Rop1.notifyMessages(newStateR);
         return loop(Rop1.ifError(state,newStateR));
        });
       });
      };
      return loop(initial);
     },{
      $:0
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
    update:function(message,model)
    {
     var _,top,left,top1,left1;
     if(message.$==0)
      {
       top=message.$0;
       left=message.$1;
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
         top1=message.$0;
         left1=message.$1;
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
    view:function(menuItems,model,processMessages)
    {
     var item,_,x1,x2,top,lef,newChildren;
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
       newChildren=Seq.map(item,menuItems);
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
        $:6
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
       _1=React.createElement(elem,reduceAtt);
      }
     else
      {
       arg00=Arrays.ofSeq(_arg1);
       _1=React.createElement.apply(null,arg00);
      }
     return _1;
    },
    New:function()
    {
     return Runtime.New(this,{});
    },
    button:function(label,attrs,f)
    {
     var arg10,arg20;
     arg10=Runtime.New(T,{
      $:1,
      $0:{
       onClick:f
      },
      $1:attrs
     });
     arg20=List.ofArray([label]);
     return R.E0("button",arg10,arg20);
    },
    className:function(name)
    {
     return{
      className:name
     };
    },
    div:function(attrs,children)
    {
     return R.E0("div",attrs,children);
    },
    id:function(name)
    {
     return{
      id:name
     };
    },
    input:function(typeI,onChange,attrs)
    {
     var arg10,arg20;
     arg10=Runtime.New(T,{
      $:1,
      $0:{
       type:typeI,
       onChange:onChange
      },
      $1:attrs
     });
     arg20=Runtime.New(T,{
      $:0
     });
     return R.E0("input",arg10,arg20);
    },
    label:function(attrs,children)
    {
     return R.E0("label",attrs,children);
    },
    onChange:function(f)
    {
     return{
      onChange:f
     };
    },
    role:function(name)
    {
     return{
      role:name
     };
    },
    span:function(attrs,children)
    {
     return R.E0("span",attrs,children);
    },
    style:function(obj)
    {
     return{
      style:obj
     };
    },
    tag:function(tg,attrs,children)
    {
     return R.E0(tg,attrs,children);
    },
    type:function(name)
    {
     return{
      type:name
     };
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
     return{
      $:0,
      $0:"a",
      $1:children
     };
    },
    AutoFocus:function(foc)
    {
     return{
      $:2,
      $0:"autoFocus",
      $1:foc
     };
    },
    Br:function(children)
    {
     return{
      $:0,
      $0:"br",
      $1:children
     };
    },
    Button:function(children)
    {
     return{
      $:0,
      $0:"button",
      $1:children
     };
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
     return{
      $:0,
      $0:"div",
      $1:children
     };
    },
    Draggable:function(drg)
    {
     return{
      $:2,
      $0:"draggable",
      $1:drg
     };
    },
    H1:function(children)
    {
     return{
      $:0,
      $0:"h1",
      $1:children
     };
    },
    H2:function(children)
    {
     return{
      $:0,
      $0:"h2",
      $1:children
     };
    },
    H3:function(children)
    {
     return{
      $:0,
      $0:"h3",
      $1:children
     };
    },
    H4:function(children)
    {
     return{
      $:0,
      $0:"h4",
      $1:children
     };
    },
    H5:function(children)
    {
     return{
      $:0,
      $0:"h5",
      $1:children
     };
    },
    H6:function(children)
    {
     return{
      $:0,
      $0:"h6",
      $1:children
     };
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
     return{
      $:0,
      $0:"img",
      $1:children
     };
    },
    Input:function(children)
    {
     return{
      $:0,
      $0:"input",
      $1:children
     };
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
     return{
      $:0,
      $0:"label",
      $1:children
     };
    },
    Li:function(children)
    {
     return{
      $:0,
      $0:"li",
      $1:children
     };
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
     return{
      $:0,
      $0:"menu",
      $1:children
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
    OptionA:function(children)
    {
     return{
      $:0,
      $0:"option",
      $1:children
     };
    },
    P:function(children)
    {
     return{
      $:0,
      $0:"p",
      $1:children
     };
    },
    Placeholder:function(txt)
    {
     return{
      $:2,
      $0:"placeholder",
      $1:txt
     };
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
     return{
      $:0,
      $0:"select",
      $1:children
     };
    },
    Span:function(children)
    {
     return{
      $:0,
      $0:"span",
      $1:children
     };
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
     return{
      $:0,
      $0:"tbody",
      $1:children
     };
    },
    THead:function(children)
    {
     return{
      $:0,
      $0:"thead",
      $1:children
     };
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
     return{
      $:0,
      $0:"table",
      $1:children
     };
    },
    Td:function(children)
    {
     return{
      $:0,
      $0:"td",
      $1:children
     };
    },
    Th:function(children)
    {
     return{
      $:0,
      $0:"th",
      $1:children
     };
    },
    Tr:function(children)
    {
     return{
      $:0,
      $0:"tr",
      $1:children
     };
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
     return{
      $:0,
      $0:"ul",
      $1:children
     };
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
    _paddingLeft:function(lef)
    {
     return ReactHtml.newAttr("paddingLeft",lef);
    },
    _paddingRight:function(rig)
    {
     return ReactHtml.newAttr("paddingRight",rig);
    },
    _position:function(pos)
    {
     return ReactHtml.newAttr("position",pos);
    },
    _right:function(rig)
    {
     return ReactHtml.newAttr("right",rig);
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
       _={
        $:0,
        $0:"div",
        $1:Seq.append(List.ofArray([node]),newChildren)
       };
      }
     else
      {
       if(node.$==2)
        {
         _={
          $:0,
          $0:"div",
          $1:Seq.append(List.ofArray([node]),newChildren)
         };
        }
       else
        {
         if(node.$==3)
          {
           node.$0;
           _={
            $:0,
            $0:"div",
            $1:Seq.append(List.ofArray([node]),newChildren)
           };
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
                 _={
                  $:0,
                  $0:"div",
                  $1:newChildren
                 };
                }
               else
                {
                 name=node.$0;
                 children=node.$1;
                 _={
                  $:0,
                  $0:name,
                  $1:Seq.append(children,newChildren)
                 };
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
    toReact:function(node)
    {
     var attributeR,elementR,_arg11;
     attributeR=function(_arg1)
     {
      var _,value,name,attrs;
      if(_arg1.$==1)
       {
        _arg1.$0;
        _=Runtime.New(T,{
         $:0
        });
       }
      else
       {
        if(_arg1.$==4)
         {
          _arg1.$0;
          _=Runtime.New(T,{
           $:0
          });
         }
        else
         {
          if(_arg1.$==5)
           {
            _arg1.$0;
            _=Runtime.New(T,{
             $:0
            });
           }
          else
           {
            if(_arg1.$==2)
             {
              value=_arg1.$1;
              name=_arg1.$0;
              _=List.ofArray([ReactHtml.newAttr(name,value)]);
             }
            else
             {
              if(_arg1.$==3)
               {
                attrs=_arg1.$0;
                _=attrs;
               }
              else
               {
                if(_arg1.$==6)
                 {
                  _=Runtime.New(T,{
                   $:0
                  });
                 }
                else
                 {
                  _arg1.$0;
                  _arg1.$1;
                  _=Runtime.New(T,{
                   $:0
                  });
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
      var _,text,r,o,arg0,tag,children,source,subNodes,source1,attributes,arg01;
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
            arg0=React.createElement(o);
            _={
             $:1,
             $0:arg0
            };
           }
          else
           {
            if(_arg2.$==2)
             {
              _arg2.$1;
              _arg2.$0;
              _={
               $:0
              };
             }
            else
             {
              if(_arg2.$==3)
               {
                _arg2.$0;
                _={
                 $:0
                };
               }
              else
               {
                if(_arg2.$==6)
                 {
                  _={
                   $:1,
                   $0:null
                  };
                 }
                else
                 {
                  tag=_arg2.$0;
                  children=_arg2.$1;
                  source=Seq.choose(elementR,children);
                  subNodes=Seq.toList(source);
                  source1=Seq.collect(attributeR,children);
                  attributes=Seq.toList(source1);
                  arg01=R.tag(tag,attributes,subNodes);
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
      return _;
     };
     _arg11=elementR(node);
     return Option1.defaultV(null,_arg11);
    }
   },
   SearchFlickr:{
    Impure:{
     getJSON:function(cb,url)
     {
      return $.getJSON(url,cb);
     }
    },
    img:function(src)
    {
     return ReactHtml.Img(List.ofArray([ReactHtml.Src(src)]));
    },
    init:Runtime.Field(function()
    {
     return{
      search:"cats",
      images:Runtime.New(T,{
       $:0
      }),
      vertical:false
     };
    }),
    mediaUrl:Runtime.Field(function()
    {
     return function(x)
     {
      var o;
      o=x.media;
      return o.m;
     };
    }),
    showForm_:function(node)
    {
     var init,update,view,x;
     init=SearchFlickr.init();
     update=function(msg)
     {
      return function(model)
      {
       return SearchFlickr.update(msg,model);
      };
     };
     view=function(model)
     {
      return function(processMessages)
      {
       return SearchFlickr.view(model,processMessages);
      };
     };
     x=App.app(init,update,view);
     return App.run(node,x);
    },
    srcs:Runtime.Field(function()
    {
     var mapping;
     mapping=SearchFlickr.mediaUrl();
     return function(x)
     {
      var array,source;
      array=x.items;
      source=Arrays.map(mapping,array);
      return Seq.toList(source);
     };
    }),
    update:function(msg,model)
    {
     var _,is,vertical,s;
     if(msg.$==1)
      {
       is=msg.$0;
       _={
        search:model.search,
        images:is,
        vertical:model.vertical
       };
      }
     else
      {
       if(msg.$==2)
        {
         vertical=!model.vertical;
         _={
          search:model.search,
          images:model.images,
          vertical:vertical
         };
        }
       else
        {
         s=msg.$0;
         _={
          search:s,
          images:model.images,
          vertical:model.vertical
         };
        }
      }
     return _;
    },
    url:function(t)
    {
     return"http://api.flickr.com/services/feeds/photos_public.gne?tags="+t+"&format=json&jsoncallback=?";
    },
    view:function(model,processMessages)
    {
     var f,processJSON,left,x1,x2,x3,x4,mapping,list,l,images,splitter;
     f=SearchFlickr.srcs();
     processJSON=function(x)
     {
      var arg0;
      arg0=f(x);
      return processMessages({
       $:1,
       $0:arg0
      });
     };
     x1=ReactHtml.Input(List.ofArray([ReactHtml.Type("text"),ReactHtml.Value(model.search)]));
     x2=ReactHtml.Input(List.ofArray([ReactHtml.Type("button"),ReactHtml.Value("search")]));
     x3=ReactHtml.Input(List.ofArray([ReactHtml.Type("checkbox"),ReactHtml.Checked(model.vertical)]));
     x4=ReactHtml.Input(List.ofArray([ReactHtml.Type("checkbox"),ReactHtml.Checked(!model.vertical)]));
     left=List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._minWidth("222px"),ReactHtml._overflow("hidden")])),(ReactHtml.OnChange(function(x)
     {
      var o,arg0;
      o=x.target;
      arg0=o.value;
      return processMessages({
       $:0,
       $0:arg0
      });
     }))(x1),(ReactHtml.OnClick(function()
     {
      var t,url;
      t=model.search;
      url=SearchFlickr.url(t);
      return Impure.getJSON(processJSON,url);
     }))(x2),ReactHtml.Br(Runtime.New(T,{
      $:0
     })),(ReactHtml.OnChange(function()
     {
      return processMessages({
       $:2
      });
     }))(x3),{
      $:1,
      $0:"vertical"
     },ReactHtml.Br(Runtime.New(T,{
      $:0
     })),(ReactHtml.OnChange(function()
     {
      return processMessages({
       $:2
      });
     }))(x4),{
      $:1,
      $0:"horizontal"
     },ReactHtml.Br(Runtime.New(T,{
      $:0
     }))]);
     mapping=function(src)
     {
      return SearchFlickr.img(src);
     };
     list=model.images;
     l=List.map(mapping,list);
     images=Runtime.New(T,{
      $:1,
      $0:ReactHtml._Style(List.ofArray([ReactHtml._overflow("auto")])),
      $1:l
     });
     splitter=model.vertical?function(header)
     {
      return function(footer)
      {
       return function(left1)
       {
        return function(right)
        {
         return function(center)
         {
          return Layouts.VerticalSplitter(header,footer,left1,right,center);
         };
        };
       };
      };
     }:function(header)
     {
      return function(footer)
      {
       return function(left1)
       {
        return function(right)
        {
         return function(center)
         {
          return Layouts.HorizontalSplitter(header,footer,left1,right,center);
         };
        };
       };
      };
     };
     return((((splitter(List.ofArray([ReactHtml.H2(List.ofArray([{
      $:1,
      $0:"Search Flickr"
     }]))])))(List.ofArray([ReactHtml.H3(List.ofArray([{
      $:1,
      $0:"CIPHER BSC."
     }]))])))(left))(List.ofArray([ReactHtml.H1(List.ofArray([{
      $:1,
      $0:"HI"
     }]))])))(images);
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
   SlickGrid:{
    DataView:Runtime.Class({
     activeCell_:function()
     {
      var cell;
      cell=this.grid.getActiveCell();
      return Unchecked.Equals(cell,null)?{
       $:0
      }:{
       $:1,
       $0:[cell.row,cell.cell]
      };
     },
     addItem:function(item)
     {
      var R1;
      R1=this.addItem0_(item);
      return Rop1.notifyMessages(R1);
     },
     addItem0_:function(item)
     {
      var _builder_,_this=this;
      _builder_=Rop1.flow();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(Rop1.tryProtection(),function()
       {
        var tupledArg,arg0,arg1,change;
        _this.grid.invalidateRow(_this.getLength_());
        tupledArg=[_this.getNewRowId_(),item];
        arg0=tupledArg[0];
        arg1=tupledArg[1];
        change={
         $:0,
         $0:arg0,
         $1:arg1
        };
        _this.processChange_(change);
        return _builder_.Zero();
       });
      });
     },
     addItem_:function(item)
     {
      var _builder_,_this=this;
      _builder_=Rop1.flow();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(Rop1.tryProtection(),function()
       {
        _this.grid.invalidateRow(_this.getLength_());
        return _builder_.Bind(_this.addItem0_(item),function()
        {
         _this.grid.updateRowCount();
         _this.reRender_();
         return _builder_.Zero();
        });
       });
      });
     },
     calculateKey:function(values)
     {
      var x,folder,_this=this,state;
      x=this.keyIndexes;
      folder=function(ks)
      {
       return function(index)
       {
        return ks.concat([_this.getKeyValue(values,index)]);
       };
      };
      state=[];
      return Arrays.fold(folder,state,x);
     },
     composeRow_:function(values)
     {
      return Runtime.New(RowT,{
       $:0,
       $0:this.calculateKey(values),
       $1:values,
       $2:false
      });
     },
     createGrid:function(dv,el)
     {
      return this.createGrid_(dv,el);
     },
     createGrid_:function(datav,gridElement)
     {
      var _builder_,R1,_this=this;
      _builder_=Rop1.flow();
      R1=_builder_.Delay(function()
      {
       var arg0,msg1,grid,value;
       arg0=function(msg)
       {
        return _this.inMessagesProcessor(msg);
       };
       msg1={
        $:1,
        $0:arg0
       };
       _this.sendMessage_(msg1);
       _this.grid=new Slick.Grid(gridElement,datav,_this.columns,SlickGrid.gridOptions());
       _this.grid.setSelectionModel(new Slick.CellSelectionModel());
       _this.grid.registerPlugin(_this.columnSizePlugin);
       grid=_this.grid;
       _this.subscribeGrid_(grid);
       value=jQuery(gridElement).on("resize",function()
       {
        return _this.reRender_();
       });
       return _builder_.Zero();
      });
      return Rop1.notifyMessages(R1);
     },
     deleteRows_:function(rows)
     {
      var _builder_,R1,_this=this;
      _builder_=Rop1.flow();
      R1=_builder_.Delay(function()
      {
       return _builder_.Bind(Rop1.tryProtection(),function()
       {
        var _,change,row,_1;
        if(rows.length>0)
         {
          change={
           $:3,
           $0:rows
          };
          _this.processChange_(change);
          row=Arrays.min(rows);
          if(Arrays.length(_this.grid.getSelectedRows())>0)
           {
            _this.grid.setSelectedRows([row]);
            _1=_builder_.Zero();
           }
          else
           {
            _1=_builder_.Zero();
           }
          _=_builder_.Combine(_1,_builder_.Delay(function()
          {
           var mapping,option,value;
           mapping=function(tupledArg)
           {
            var col;
            tupledArg[0];
            col=tupledArg[1];
            return _this.grid.setActiveCell(row,col);
           };
           option=_this.activeCell_();
           value=Option.map(mapping,option);
           _this.grid.invalidateAllRows();
           _this.grid.updateRowCount();
           _this.reRender_();
           return _builder_.Zero();
          }));
         }
        else
         {
          _=_builder_.Zero();
         }
        return _;
       });
      });
      return Rop1.notifyMessages(R1);
     },
     editCell2_:function()
     {
      var x,mapping,_this=this,value;
      x=this.activeCell_();
      mapping=function(tupledArg)
      {
       var row,_arg2,_,item,R1,editor;
       row=tupledArg[0];
       _arg2=tupledArg[1];
       if(row>=_this.getLength_())
        {
         item=_this.emptyItem_();
         R1=_this.addItem_(item);
         _=Rop1.notifyMessages(R1);
        }
       else
        {
         _=null;
        }
       editor=_this.grid.getCellEditor();
       return Unchecked.Equals(editor,null)?_this.grid.editActiveCell():null;
      };
      value=Option.map(mapping,x);
      return;
     },
     editCell_:function()
     {
      return this.grid.editActiveCell();
     },
     emptyItem_:function()
     {
      var mapping,array;
      mapping=function(c)
      {
       return c.defaultV;
      };
      array=this.columns;
      return Arrays.map(mapping,array);
     },
     findInAddedRows_:function(addedRows,values)
     {
      var key,predicate,_this=this,_arg1,values1;
      key=this.calculateKey(values);
      predicate=function(_row_)
      {
       return Unchecked.Equals(_this.calculateKey(_row_),key);
      };
      _arg1=Arrays.tryFind(predicate,addedRows);
      values1=Option1.defaultV(values,_arg1);
      return _this.composeRow_(values1);
     },
     getItem:function(i)
     {
      return this.getItem_(i);
     },
     getItemMetadata:function()
     {
      return this.getItemMetadata0;
     },
     getItem_:function(i)
     {
      return i>=this.activeRows.length?this.emptyItem_():Arrays.get(this.activeRows,i).rowData_();
     },
     getItems:function()
     {
      var mapping,array;
      mapping=function(row)
      {
       return row.rowData_();
      };
      array=this.activeRows;
      return Arrays.map(mapping,array);
     },
     getKeyValue:function(values,index)
     {
      return Arrays.get(values,index);
     },
     getKeysPerRow_:function()
     {
      var x,mapping,_this=this;
      x=this.activeRows;
      mapping=function(i)
      {
       return function(_arg18)
       {
        var _,vs,_1,vs1,ks;
        if(_arg18.$==1)
         {
          vs=_arg18.$1;
          _=[i,_this.calculateKey(vs)];
         }
        else
         {
          if(_arg18.$2)
           {
            vs1=_arg18.$1;
            _1=[i,_this.calculateKey(vs1)];
           }
          else
           {
            ks=_arg18.$0;
            _1=[i,ks];
           }
          _=_1;
         }
        return _;
       };
      };
      return Seq.mapi(mapping,x);
     },
     getLength:function()
     {
      return this.getLength_();
     },
     getLength_:function()
     {
      return this.activeRows.length;
     },
     getNewRowId_:function()
     {
      var chooser,source,source1,newRowIds,_1,y;
      chooser=function(_arg1)
      {
       var _,i;
       if(_arg1.$==1)
        {
         i=_arg1.$0;
         _={
          $:1,
          $0:i
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
      source=this.activeRows;
      source1=Seq.choose(chooser,source);
      newRowIds=Seq.toArray(source1);
      if(newRowIds.length==0)
       {
        _1=1;
       }
      else
       {
        y=Seq.max(newRowIds);
        _1=1+y;
       }
      return _1;
     },
     getRowData_:function(rid)
     {
      var predicate,array,row;
      predicate=function(_arg11)
      {
       var _,id,id1;
       if(_arg11.$==1)
        {
         id=_arg11.$0;
         _=Unchecked.Equals({
          $:1,
          $0:id
         },rid);
        }
       else
        {
         id1=_arg11.$0;
         _=Unchecked.Equals({
          $:0,
          $0:id1
         },rid);
        }
       return _;
      };
      array=this.activeRows;
      row=Arrays.find(predicate,array);
      return row.rowData_();
     },
     getSaveData:function()
     {
      return this.getSaveData_();
     },
     getSaveData_:function()
     {
      var patternInput,deleted,changed,added;
      patternInput=this.prepareData_();
      deleted=patternInput[0];
      changed=patternInput[1];
      added=patternInput[2];
      return[this.activeRows,this.columns,this.keyIndexes,deleted,changed,added];
     },
     inMessagesProcessor:function(msg)
     {
      var _,keys,data,columns,addedRows,tupledArg,arg0,arg1,arg2,arg3,arg4,arg5,msg1,rowId;
      if(msg.$==0)
       {
        keys=msg.$2;
        data=msg.$0;
        columns=msg.$1;
        _=this.readData_(data,columns,keys);
       }
      else
       {
        if(msg.$==1)
         {
          addedRows=msg.$0;
          _=this.savedData_(addedRows);
         }
        else
         {
          if(msg.$==3)
           {
            tupledArg=this.getSaveData_();
            arg0=tupledArg[0];
            arg1=tupledArg[1];
            arg2=tupledArg[2];
            arg3=tupledArg[3];
            arg4=tupledArg[4];
            arg5=tupledArg[5];
            msg1={
             $:3,
             $0:arg0,
             $1:arg1,
             $2:arg2,
             $3:arg3,
             $4:arg4,
             $5:arg5
            };
            _=this.sendMessage_(msg1);
           }
          else
           {
            if(msg.$==4)
             {
              rowId=msg.$0;
              this.doEvents=false;
              this.selectRow_(rowId);
              _=void(this.doEvents=true);
             }
            else
             {
              _=this.removeData_();
             }
           }
         }
       }
      return _;
     },
     prepareData_:function()
     {
      var set,mapping,array,deleted,chooser,array1,changed,chooser1,array2,added,predicate,_this=this,patternInput,changedKey,changed1,mapping2,array21,deleted1,mapping3,array22,added1,mapping4,changed2,mapping5,deleted2,mapping6,changed3,mapping7,added2;
      set=this.deletedRows;
      mapping=function(vs)
      {
       var mapping1;
       mapping1=function(v)
       {
        return v;
       };
       return Arrays.map(mapping1,vs);
      };
      array=Seq.toArray(set);
      deleted=Arrays.map(mapping,array);
      chooser=function(_arg12)
      {
       var _,_1,id,row;
       if(_arg12.$==0)
        {
         if(_arg12.$2)
          {
           id=_arg12.$0;
           row=_arg12.$1;
           _1={
            $:1,
            $0:[id,row]
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
      };
      array1=this.activeRows;
      changed=Arrays.choose(chooser,array1);
      chooser1=function(_arg13)
      {
       var _,row;
       if(_arg13.$==1)
        {
         row=_arg13.$1;
         _={
          $:1,
          $0:row
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
      array2=this.activeRows;
      added=Arrays.choose(chooser1,array2);
      predicate=function(_arg14)
      {
       var row,id;
       row=_arg14[1];
       id=_arg14[0];
       return Unchecked.Equals(id,_this.calculateKey(row));
      };
      patternInput=Arrays.partition(predicate,changed);
      changedKey=patternInput[1];
      changed1=patternInput[0];
      mapping2=function(_arg15)
      {
       var id,mapping1;
       id=_arg15[0];
       mapping1=function(v)
       {
        return v;
       };
       return Arrays.map(mapping1,id);
      };
      array21=Arrays.map(mapping2,changedKey);
      deleted1=deleted.concat(array21);
      mapping3=function(_arg16)
      {
       var row;
       row=_arg16[1];
       return row;
      };
      array22=Arrays.map(mapping3,changedKey);
      added1=added.concat(array22);
      mapping4=function(_arg17)
      {
       var row;
       row=_arg17[1];
       return row;
      };
      changed2=Arrays.map(mapping4,changed1);
      mapping5=function(os)
      {
       var mapping1;
       mapping1=function(o)
       {
        return Unchecked.Equals(o,null)?"":String(o);
       };
       return Arrays.map(mapping1,os);
      };
      deleted2=Arrays.map(mapping5,deleted1);
      mapping6=function(os)
      {
       var mapping1;
       mapping1=function(o)
       {
        return Unchecked.Equals(o,null)?"":String(o);
       };
       return Arrays.map(mapping1,os);
      };
      changed3=Arrays.map(mapping6,changed2);
      mapping7=function(os)
      {
       var mapping1;
       mapping1=function(o)
       {
        return Unchecked.Equals(o,null)?"":String(o);
       };
       return Arrays.map(mapping1,os);
      };
      added2=Arrays.map(mapping7,added1);
      return[deleted2,changed3,added2];
     },
     processChange_:function(change)
     {
      var _,columnsIn,dataIn,keys,action,array,mapping,_this=this,addedRows,mapping1,x,x1,chooser,array1,_3,k1,objectArg,rows,patternInput,remaining,deleted,mapping2,mapping3,action1,array2,_4,k2,vals,predicate,array3,n,_arg4,_5,rid2,d,item,rowId,msg;
      if(change.$==5)
       {
        columnsIn=change.$1;
        dataIn=change.$0;
        keys=change.$2;
        this.keyIndexes=keys;
        this.columns=columnsIn;
        action=function(c)
        {
         c.editor=Slick.Editors.Text;
         return;
        };
        array=this.columns;
        Arrays.iter(action,array);
        mapping=function(values)
        {
         return _this.composeRow_(values);
        };
        this.activeRows=Arrays.map(mapping,dataIn);
        _=void(_this.deletedRows=FSharpSet.New(Runtime.New(T,{
         $:0
        })));
       }
      else
       {
        if(change.$==4)
         {
          addedRows=change.$0;
          _this.deletedRows=FSharpSet.New(Runtime.New(T,{
           $:0
          }));
          mapping1=function(values)
          {
           return _this.composeRow_(values);
          };
          x=Arrays.map(mapping1,addedRows);
          x1=_this.activeRows;
          chooser=function(row)
          {
           var _1,vs,k,_2;
           if(row.$==0)
            {
             vs=row.$1;
             k=row.$0;
             if(Unchecked.Equals(_this.calculateKey(vs),k))
              {
               row.$0;
               row.$1;
               _2={
                $:1,
                $0:row
               };
              }
             else
              {
               _2={
                $:0
               };
              }
             _1=_2;
            }
           else
            {
             _1={
              $:0
             };
            }
           return _1;
          };
          array1=Arrays.choose(chooser,x1);
          _this.activeRows=array1.concat(x);
          _=_this.grid.invalidateAllRows();
         }
        else
         {
          if(change.$==2)
           {
            if(change.$0.$==0)
             {
              k1=change.$0.$0;
              objectArg=_this.deletedRows;
              _3=void(_this.deletedRows=objectArg.Add(k1));
             }
            else
             {
              _3=null;
             }
            _=_3;
           }
          else
           {
            if(change.$==3)
             {
              rows=change.$0;
              patternInput=_this.separateRows_(rows);
              remaining=patternInput[1];
              deleted=patternInput[0];
              mapping2=function(tupledArg)
              {
               var r;
               tupledArg[0];
               r=tupledArg[1];
               return r;
              };
              _this.activeRows=Arrays.map(mapping2,remaining);
              mapping3=function(_arg2)
              {
               var _1,rid,arg0,rid1,arg01;
               if(_arg2[1].$==1)
                {
                 rid=_arg2[1].$0;
                 _arg2[0];
                 arg0={
                  $:1,
                  $0:rid
                 };
                 _1={
                  $:2,
                  $0:arg0
                 };
                }
               else
                {
                 rid1=_arg2[1].$0;
                 _arg2[0];
                 arg01={
                  $:0,
                  $0:rid1
                 };
                 _1={
                  $:2,
                  $0:arg01
                 };
                }
               return _1;
              };
              action1=function(change1)
              {
               return _this.processChange_(change1);
              };
              array2=Arrays.map(mapping3,deleted);
              _=Arrays.iter(action1,array2);
             }
            else
             {
              if(change.$==1)
               {
                if(change.$0.$==0)
                 {
                  k2=change.$0.$0;
                  vals=change.$0.$1;
                  predicate=function(_arg3)
                  {
                   var _1,_k_;
                   if(_arg3.$==0)
                    {
                     _k_=_arg3.$0;
                     _1=Unchecked.Equals(k2,_k_);
                    }
                   else
                    {
                     _1=false;
                    }
                   return _1;
                  };
                  array3=_this.activeRows;
                  n=Arrays.findINdex(predicate,array3);
                  _arg4=Arrays.get(_this.activeRows,n);
                  if(_arg4.$==0)
                   {
                    rid2=_arg4.$0;
                    d=_arg4.$1;
                    _5=Arrays.set(_this.activeRows,n,Runtime.New(RowT,{
                     $:0,
                     $0:rid2,
                     $1:d,
                     $2:true
                    }));
                   }
                  else
                   {
                    _5=null;
                   }
                  _4=_5;
                 }
                else
                 {
                  _4=null;
                 }
                _=_4;
               }
              else
               {
                if(change.$==0)
                 {
                  item=change.$1;
                  rowId=change.$0;
                  _=void(_this.activeRows=_this.activeRows.concat([Runtime.New(RowT,{
                   $:1,
                   $0:rowId,
                   $1:item
                  })]));
                 }
                else
                 {
                  _=null;
                 }
               }
             }
           }
         }
       }
      msg={
       $:2,
       $0:change
      };
      return _this.sendMessage_(msg);
     },
     push:function()
     {
      var item;
      item=this.emptyItem_();
      return this.addItem0_(item);
     },
     reRender:function()
     {
      return this.reRender_();
     },
     reRender_:function()
     {
      var _,_1;
      if(this.grid.getContainerNode().clientWidth>0)
       {
        if(Unchecked.Equals(this.haveAutoColumnSized,false))
         {
          this.haveAutoColumnSized=true;
          _1=this.columnSizePlugin.resizeAllColumns();
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
      return this.grid.render();
     },
     readData:function(data,cols,keys)
     {
      return this.readData_(data,cols,keys);
     },
     readData_:function(dataIn,columnsIn,keysIn)
     {
      var _builder_,_this=this;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       var change;
       change={
        $:5,
        $0:dataIn,
        $1:columnsIn,
        $2:keysIn
       };
       _this.processChange_(change);
       _this.grid.setColumns(_this.columns);
       _this.grid.updateRowCount();
       _this.haveAutoColumnSized=false;
       _this.reRender_();
       _this.showInfo_(false,"");
       return _builder_.Zero();
      });
     },
     removeData:function()
     {
      return this.removeData_();
     },
     removeData_:function()
     {
      var rows,array;
      array=this.activeRows;
      rows=Seq.toArray(Operators1.range(0,array.length-1));
      return this.deleteRows_(rows);
     },
     savedData:function(addedData)
     {
      return this.savedData_(addedData);
     },
     savedData_:function(addedRows)
     {
      var change;
      change={
       $:4,
       $0:addedRows
      };
      this.processChange_(change);
      return this.reRender_();
     },
     selectRow_:function(rowId)
     {
      var mapping,option,_arg1,col1,predicate,action,_this=this,source,option1;
      mapping=function(tupledArg)
      {
       var col;
       tupledArg[0];
       col=tupledArg[1];
       return col;
      };
      option=this.activeCell_();
      _arg1=Option.map(mapping,option);
      col1=Option1.defaultV(0,_arg1);
      predicate=function(row)
      {
       return Unchecked.Equals(row.rowId_(),rowId);
      };
      action=function(i)
      {
       return _this.grid.setActiveCell(i,col1);
      };
      source=_this.activeRows;
      option1=Seq.tryFindIndex(predicate,source);
      return Option.iter(action,option1);
     },
     sendMessage_:function(msg)
     {
      var mapping,option,value;
      mapping=function(f)
      {
       return f(msg);
      };
      option=this.processMessage_O;
      value=Option.map(mapping,option);
      return;
     },
     separateRows_:function(rows)
     {
      var mapping,predicate,source,source1,array;
      mapping=function(i)
      {
       return function(r)
       {
        return[i,r];
       };
      };
      predicate=function(tupledArg)
      {
       var i,predicate1;
       i=tupledArg[0];
       tupledArg[1];
       predicate1=function(y)
       {
        return i===y;
       };
       return Seq.exists(predicate1,rows);
      };
      source=this.activeRows;
      source1=Seq.mapi(mapping,source);
      array=Seq.toArray(source1);
      return Arrays.partition(predicate,array);
     },
     showInfo_:function(processing,msg)
     {
      var tupledArg,arg0,arg1,msg1;
      tupledArg=[msg,processing];
      arg0=tupledArg[0];
      arg1=tupledArg[1];
      msg1={
       $:0,
       $0:arg0,
       $1:arg1
      };
      return this.sendMessage_(msg1);
     },
     subscribeGrid_:function(grid)
     {
      var _this=this,rowChanged_,processPasteData,documentBody_,createCaptureArea_,selectionModel,getSelectedRange_,getSelectedText_,clearRange_,getCellEditor_,pasteData_,copyData_,deleteData_;
      grid.onAddNewRow.subscribe(function(event,args)
      {
       var _builder_,R1;
       _builder_=Rop1.flow();
       R1=_builder_.Delay(function()
       {
        return _builder_.Bind(Rop1.tryProtection(),function()
        {
         var item;
         item=args.item;
         return _builder_.Return(_this.addItem_(item));
        });
       });
       return Rop1.notifyMessages(R1);
      });
      rowChanged_=function(row)
      {
       var _builder_;
       _builder_=Rop1.flow();
       return _builder_.Delay(function()
       {
        return _builder_.Bind(Rop1.tryProtection(),function()
        {
         var _,array,arg0,change;
         if(_this.doEvents)
          {
           grid.invalidateRow(row);
           array=_this.activeRows;
           arg0=Arrays.get(array,row);
           change={
            $:1,
            $0:arg0
           };
           _this.processChange_(change);
           _=_builder_.Zero();
          }
         else
          {
           _=_builder_.Zero();
          }
         return _;
        });
       });
      };
      grid.onCellChange.subscribe(function(event,args)
      {
       var R1;
       R1=rowChanged_(args.row);
       Rop1.notifyMessages(R1);
       return _this.reRender_();
      });
      processPasteData=function(rangeO)
      {
       return function(text)
       {
        var action;
        action=function(range)
        {
         var x,mapping,source,rows,colDefs,nRows,mapping1,source1,nCols,inputSequence,enumerator,_,i,mR,inputSequence1,enumerator1,_1,j,mC,action1;
         x=Strings.SplitStrings(text,["\n\r","\n","\r"],0);
         mapping=function(row)
         {
          return Strings.SplitStrings(row,["\u0009"],0);
         };
         source=(Arrays.length(x)>1?Arrays.get(x,Arrays.length(x)-1)==="":false)?Slice.array(x,{
          $:1,
          $0:0
         },{
          $:1,
          $0:Arrays.length(x)-2
         }):x;
         rows=Seq.map(mapping,source);
         colDefs=grid.getColumns();
         nRows=Seq.length(rows);
         mapping1=function(cols)
         {
          return cols.length;
         };
         source1=Seq.map(mapping1,rows);
         nCols=Seq.max(source1);
         inputSequence=Operators1.step(range.fromRow,nRows,range.toRow);
         enumerator=Enumerator.Get(inputSequence);
         try
         {
          while(enumerator.MoveNext())
           {
            i=enumerator.get_Current();
            mR=range.fromRow===range.toRow?0:range.toRow-i+1;
            inputSequence1=Operators1.step(range.fromCell,nCols,range.toCell);
            enumerator1=Enumerator.Get(inputSequence1);
            try
            {
             while(enumerator1.MoveNext())
              {
               j=enumerator1.get_Current();
               mC=range.fromCell===range.toCell?0:range.toCell-j+1;
               action1=function(i1)
               {
                return function(cols)
                {
                 var _2,r,item,action2,R1;
                 if(mR===0?true:i1<mR)
                  {
                   r=i+i1;
                   item=r<Arrays.length(_this.activeRows)?Arrays.get(_this.activeRows,r).rowData_():_this.emptyItem_();
                   action2=function(j1)
                   {
                    return function(text1)
                    {
                     var _3,c,_4;
                     if(mC===0?true:j1<mC)
                      {
                       c=j+j1;
                       if(c<Arrays.length(colDefs)?!(!Arrays.get(colDefs,c).field):false)
                        {
                         item[Arrays.get(colDefs,c).field]=text1;
                         _4=text1;
                        }
                       else
                        {
                         _4=null;
                        }
                       _3=_4;
                      }
                     else
                      {
                       _3=null;
                      }
                     return _3;
                    };
                   };
                   Seq.iteri(action2,cols);
                   R1=r<Arrays.length(_this.activeRows)?rowChanged_(r):_this.addItem0_(item);
                   _2=Rop1.notifyMessages(R1);
                  }
                 else
                  {
                   _2=null;
                  }
                 return _2;
                };
               };
               Seq.iteri(action1,rows);
              }
            }
            finally
            {
             enumerator1.Dispose!=undefined?enumerator1.Dispose():null;
            }
           }
         }
         finally
         {
          enumerator.Dispose!=undefined?enumerator.Dispose():null;
         }
         grid.updateRowCount();
         return _this.reRender_();
        };
        return Option.iter(action,rangeO);
       };
      };
      documentBody_=function()
      {
       return(document.getElementsByTagName("body"))[0];
      };
      createCaptureArea_=function(text)
      {
       return function(processAfter_)
       {
        var ta,value,processCapture_,value2;
        ta=document.createElement("textarea");
        ta.style.position="absolute";
        ta.style.left="-2000px";
        ta.style.top=documentBody_(null).top;
        ta.value=text;
        value=documentBody_(null).appendChild(ta);
        ta.select();
        ta.focus();
        processCapture_=function()
        {
         var text1,value1;
         text1=ta.value;
         value1=documentBody_(null).removeChild(ta);
         return processAfter_(text1);
        };
        value2=setTimeout(processCapture_,100);
        return;
       };
      };
      selectionModel=new Slick.CellSelectionModel();
      getSelectedRange_=function()
      {
       var ranges,_,mapping,option;
       ranges=selectionModel.getSelectedRanges();
       if(Unchecked.Equals(ranges,[]))
        {
         mapping=function(tupledArg)
         {
          var r,c;
          r=tupledArg[0];
          c=tupledArg[1];
          return{
           fromRow:r,
           fromCell:c,
           toRow:r,
           toCell:c
          };
         };
         option=_this.activeCell_();
         _=Option.map(mapping,option);
        }
       else
        {
         _={
          $:1,
          $0:Arrays.get(ranges,0)
         };
        }
       return _;
      };
      getSelectedText_=function()
      {
       var x,mapping,_arg1;
       x=getSelectedRange_(null);
       mapping=function(range)
       {
        var colDefs,strings;
        colDefs=grid.getColumns();
        strings=Seq.toList(Seq.delay(function()
        {
         return Seq.collect(function(i)
         {
          var _,item,strings1;
          if(i<Arrays.length(_this.activeRows))
           {
            item=Arrays.get(_this.activeRows,i).rowData_();
            strings1=Seq.toList(Seq.delay(function()
            {
             return Seq.collect(function(j)
             {
              var _1,p;
              if(j<Arrays.length(colDefs)?!(!Arrays.get(colDefs,j).field):false)
               {
                p=Arrays.get(colDefs,j).field;
                _1=[item[p]];
               }
              else
               {
                _1=Seq.empty();
               }
              return _1;
             },Operators1.range(range.fromCell,range.toCell));
            }));
            _=[Strings.concat("\u0009",strings1)];
           }
          else
           {
            _=Seq.empty();
           }
          return _;
         },Operators1.range(range.fromRow,range.toRow));
        }));
        return Strings.concat("\n",strings);
       };
       _arg1=Option.map(mapping,x);
       return Option1.defaultV("",_arg1);
      };
      clearRange_=function(rangeO)
      {
       var action;
       action=function(range)
       {
        var colDefs,i,_,item,j,_1,R1;
        colDefs=grid.getColumns();
        for(i=range.fromRow;i<=range.toRow;i++){
         if(i<Arrays.length(_this.activeRows))
          {
           item=Arrays.get(_this.activeRows,i).rowData_();
           for(j=range.fromCell;j<=range.toCell;j++){
            if(j<Arrays.length(colDefs)?!(!Arrays.get(colDefs,j).field):false)
             {
              item[Arrays.get(colDefs,j).field]="";
              _1="";
             }
            else
             {
              _1=null;
             }
           }
           R1=rowChanged_(i);
           _=Rop1.notifyMessages(R1);
          }
         else
          {
           _=null;
          }
        }
        return _this.reRender_();
       };
       return Option.iter(action,rangeO);
      };
      getCellEditor_=function()
      {
       var value;
       value=grid.getCellEditor();
       return value;
      };
      pasteData_=function()
      {
       var matchValue,_,x;
       matchValue=getCellEditor_(null);
       if(Unchecked.Equals(matchValue,null)?true:matchValue.getValue()==="")
        {
         x=processPasteData(getSelectedRange_(null));
         _=(createCaptureArea_(""))(x);
        }
       else
        {
         _=null;
        }
       return _;
      };
      copyData_=function(processAfter)
      {
       var matchValue,_,text;
       matchValue=getCellEditor_(null);
       if(Unchecked.Equals(matchValue,null))
        {
         text=getSelectedText_(null);
         _=(createCaptureArea_(text))(processAfter);
        }
       else
        {
         _=null;
        }
       return _;
      };
      deleteData_=function()
      {
       var matchValue,_,range,_1,r,_2,r1,rows,_3,_4;
       matchValue=getCellEditor_(null);
       if(Unchecked.Equals(matchValue,null))
        {
         range=getSelectedRange_(null);
         if(range.$==1)
          {
           r=range.$0;
           if(r.fromCell===0?r.toCell===Arrays.length(_this.columns)-1:false)
            {
             r1=range.$0;
             rows=Seq.toArray(Operators1.range(r1.fromRow,r1.toRow));
             _2=_this.deleteRows_(rows);
            }
           else
            {
             if(range.$==1)
              {
               range.$0;
               _3=clearRange_(range);
              }
             else
              {
               _3=null;
              }
             _2=_3;
            }
           _1=_2;
          }
         else
          {
           if(range.$==1)
            {
             range.$0;
             _4=clearRange_(range);
            }
           else
            {
             _4=null;
            }
           _1=_4;
          }
         _=_1;
        }
       else
        {
         _=null;
        }
       return _;
      };
      grid.onKeyDown.subscribe(function(event)
      {
       var matchValue,_,_1,_2,c,_3,c1,_4,_5,_6,c2,_7,c3,_8,_9,_a,c4,_b,c5,_c,_d,_e,c6,_f,c7,_10,_11,_12,c8,_13,c9,_14,_15,_16,_17,ca,_18,cb,_19,_1a,_1b,cc,_1c,cd,_1d,_1e,_1f,ce,_20,cf;
       matchValue=[event.key,event.ctrlKey,event.altKey];
       if(matchValue[0]==="Insert")
        {
         if(matchValue[1])
          {
           _1=matchValue[2]?null:copyData_(function()
           {
            return null;
           });
          }
         else
          {
           if(matchValue[2])
            {
             _2=pasteData_(null);
            }
           else
            {
             c=matchValue[0];
             if(c.length===1)
              {
               c1=matchValue[0];
               _3=_this.editCell2_(c1);
              }
             else
              {
               _3=null;
              }
             _2=_3;
            }
           _1=_2;
          }
         _=_1;
        }
       else
        {
         if(matchValue[0]==="V")
          {
           if(matchValue[1])
            {
             _5=matchValue[2]?null:pasteData_(null);
            }
           else
            {
             if(matchValue[2])
              {
               _6=null;
              }
             else
              {
               c2=matchValue[0];
               if(c2.length===1)
                {
                 c3=matchValue[0];
                 _7=_this.editCell2_(c3);
                }
               else
                {
                 _7=null;
                }
               _6=_7;
              }
             _5=_6;
            }
           _4=_5;
          }
         else
          {
           if(matchValue[0]==="v")
            {
             if(matchValue[1])
              {
               _9=matchValue[2]?null:pasteData_(null);
              }
             else
              {
               if(matchValue[2])
                {
                 _a=null;
                }
               else
                {
                 c4=matchValue[0];
                 if(c4.length===1)
                  {
                   c5=matchValue[0];
                   _b=_this.editCell2_(c5);
                  }
                 else
                  {
                   _b=null;
                  }
                 _a=_b;
                }
               _9=_a;
              }
             _8=_9;
            }
           else
            {
             if(matchValue[0]==="C")
              {
               if(matchValue[1])
                {
                 _d=matchValue[2]?null:copyData_(function()
                 {
                  return null;
                 });
                }
               else
                {
                 if(matchValue[2])
                  {
                   _e=null;
                  }
                 else
                  {
                   c6=matchValue[0];
                   if(c6.length===1)
                    {
                     c7=matchValue[0];
                     _f=_this.editCell2_(c7);
                    }
                   else
                    {
                     _f=null;
                    }
                   _e=_f;
                  }
                 _d=_e;
                }
               _c=_d;
              }
             else
              {
               if(matchValue[0]==="c")
                {
                 if(matchValue[1])
                  {
                   _11=matchValue[2]?null:copyData_(function()
                   {
                    return null;
                   });
                  }
                 else
                  {
                   if(matchValue[2])
                    {
                     _12=null;
                    }
                   else
                    {
                     c8=matchValue[0];
                     if(c8.length===1)
                      {
                       c9=matchValue[0];
                       _13=_this.editCell2_(c9);
                      }
                     else
                      {
                       _13=null;
                      }
                     _12=_13;
                    }
                   _11=_12;
                  }
                 _10=_11;
                }
               else
                {
                 if(matchValue[0]==="Delete")
                  {
                   _14=matchValue[1]?null:matchValue[2]?copyData_(function()
                   {
                    return deleteData_(null);
                   }):deleteData_(null);
                  }
                 else
                  {
                   if(matchValue[0]==="X")
                    {
                     if(matchValue[1])
                      {
                       _16=matchValue[2]?null:copyData_(function()
                       {
                        return deleteData_(null);
                       });
                      }
                     else
                      {
                       if(matchValue[2])
                        {
                         _17=null;
                        }
                       else
                        {
                         ca=matchValue[0];
                         if(ca.length===1)
                          {
                           cb=matchValue[0];
                           _18=_this.editCell2_(cb);
                          }
                         else
                          {
                           _18=null;
                          }
                         _17=_18;
                        }
                       _16=_17;
                      }
                     _15=_16;
                    }
                   else
                    {
                     if(matchValue[0]==="x")
                      {
                       if(matchValue[1])
                        {
                         _1a=matchValue[2]?null:copyData_(function()
                         {
                          return deleteData_(null);
                         });
                        }
                       else
                        {
                         if(matchValue[2])
                          {
                           _1b=null;
                          }
                         else
                          {
                           cc=matchValue[0];
                           if(cc.length===1)
                            {
                             cd=matchValue[0];
                             _1c=_this.editCell2_(cd);
                            }
                           else
                            {
                             _1c=null;
                            }
                           _1b=_1c;
                          }
                         _1a=_1b;
                        }
                       _19=_1a;
                      }
                     else
                      {
                       if(matchValue[0]==="F2")
                        {
                         _1d=matchValue[1]?null:matchValue[2]?null:_this.editCell_();
                        }
                       else
                        {
                         if(matchValue[1])
                          {
                           _1e=null;
                          }
                         else
                          {
                           if(matchValue[2])
                            {
                             _1f=null;
                            }
                           else
                            {
                             ce=matchValue[0];
                             if(ce.length===1)
                              {
                               cf=matchValue[0];
                               _20=_this.editCell2_(cf);
                              }
                             else
                              {
                               _20=null;
                              }
                             _1f=_20;
                            }
                           _1e=_1f;
                          }
                         _1d=_1e;
                        }
                       _19=_1d;
                      }
                     _15=_19;
                    }
                   _14=_15;
                  }
                 _10=_14;
                }
               _c=_10;
              }
             _8=_c;
            }
           _4=_8;
          }
         _=_4;
        }
       return _;
      });
      grid.setSelectionModel(selectionModel);
      grid.onDblClick.subscribe(function(event,args)
      {
       var i,_,arg0,change;
       i=args.row;
       if(i<_this.activeRows.length)
        {
         arg0=Arrays.get(_this.activeRows,i);
         change={
          $:6,
          $0:arg0
         };
         _=_this.processChange_(change);
        }
       else
        {
         _=null;
        }
       return _;
      });
      return grid.onHeaderClick.subscribe(function(event,args)
      {
       var a;
       a="Event: "+Global.String(event)+", Args: "+Global.String(args);
       return console?console.log(a):undefined;
      });
     }
    },{
     New:function(processMessage_O)
     {
      var r;
      r=Runtime.New(this,{});
      r.processMessage_O=processMessage_O;
      r.activeRows=[];
      r.deletedRows=FSharpSet.New(Runtime.New(T,{
       $:0
      }));
      r.columns=[];
      r.grid=null;
      r.keyIndexes=[];
      r.doEvents=true;
      r.columnSizePlugin=new Slick.AutoColumnSize(500);
      r.haveAutoColumnSized=false;
      r.getItemMetadata0={};
      return r;
     }
    }),
    GridSync:function(token,table)
    {
     var dataView,readData,afterRender,x,divGrid,elements,arg10,arg101,x1,arg00,arg102,x2,arg001;
     dataView=DataView.New({
      $:0
     });
     readData=function()
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:13",[token,table]),function(_arg2)
       {
        var keys,data,columns;
        keys=_arg2[2];
        data=_arg2[0];
        columns=_arg2[1];
        dataView.readData(data,columns,keys);
        return _builder_.Zero();
       });
      });
     };
     afterRender=function(el)
     {
      dataView.createGrid(dataView,el);
      return readData(null);
     };
     x=List.ofArray([Attr.Attr().NewAttr("class","flex flexgrow")]);
     divGrid=Tags.Tags().NewTag("div",x);
     arg101=List.ofArray([Tags.Tags().text("reload")]);
     x1=Tags.Tags().NewTag("button",arg101);
     arg00=function()
     {
      return function()
      {
       return readData(null);
      };
     };
     EventsPervasives.Events().OnClick(arg00,x1);
     arg102=List.ofArray([Tags.Tags().text("save")]);
     x2=Tags.Tags().NewTag("button",arg102);
     arg001=function()
     {
      return function()
      {
       return null;
      };
     };
     EventsPervasives.Events().OnClick(arg001,x2);
     arg10=List.ofArray([x1,x2]);
     elements=List.ofArray([Tags.Tags().NewTag("div",arg10),divGrid]);
     return[elements,divGrid,function(arg002)
     {
      return afterRender(arg002);
     }];
    },
    RowT:Runtime.Class({
     rowData_:function()
     {
      var _,d,d1;
      if(this.$==1)
       {
        d=this.$1;
        _=d;
       }
      else
       {
        d1=this.$1;
        _=d1;
       }
      return _;
     },
     rowId_:function()
     {
      var _,key,key1;
      if(this.$==1)
       {
        key=this.$0;
        _={
         $:1,
         $0:key
        };
       }
      else
       {
        key1=this.$0;
        _={
         $:0,
         $0:key1
        };
       }
      return _;
     }
    }),
    SimpleGrid:function(columns,data,createNew,processOutMessage_O,gridElement)
    {
     var createNew1,_builder_;
     createNew1=function(item)
     {
      return function(id)
      {
       var patternInput,item1,id1;
       patternInput=(createNew(item))(id);
       item1=patternInput[1];
       id1=patternInput[0];
       item1.id=id1;
       return item1;
      };
     };
     _builder_=Rop1.flow();
     return _builder_.Delay(function()
     {
      var sendMessage_,dataView,grid,haveAutoColumnSized,activeCell_,editCell_,editCell2_,reRender_,processPasteData,createCaptureArea_,selectionModel,getSelectedRange_,getSelectedText_,clearRange_,getCellEditor_,pasteData_,copyData_,deleteData_,value3,setItems,inMessagesProcessor;
      sendMessage_=function(msg)
      {
       var action;
       action=function(f)
       {
        return f(msg);
       };
       return Option.iter(action,processOutMessage_O);
      };
      dataView=new Slick.Data.DataView({
       inlineFilters:false
      });
      grid=new Slick.Grid(gridElement,dataView,columns,SlickGrid.gridOptions());
      haveAutoColumnSized=[false];
      activeCell_=function()
      {
       var cell;
       cell=grid.getActiveCell();
       return Unchecked.Equals(cell,null)?{
        $:0
       }:{
        $:1,
        $0:[cell.row,cell.cell]
       };
      };
      editCell_=function()
      {
       return grid.editActiveCell();
      };
      editCell2_=function()
      {
       var x,action;
       x=activeCell_(null);
       action=function(tupledArg)
       {
        var row,_,arg00,editor;
        row=tupledArg[0];
        tupledArg[1];
        if(row>=dataView.getLength())
         {
          arg00=[];
          _=dataView.addItem((createNew1(arg00))(dataView.getLength()));
         }
        else
         {
          _=null;
         }
        editor=grid.getCellEditor();
        return Unchecked.Equals(editor,null)?grid.editActiveCell():null;
       };
       return Option.iter(action,x);
      };
      reRender_=function()
      {
       grid.getContainerNode().clientWidth>0?(Unchecked.Equals(haveAutoColumnSized[0],false)?dataView.getLength()>1:false)?void(haveAutoColumnSized[0]=true):null:null;
       return grid.render();
      };
      dataView.onRowCountChanged.subscribe(function()
      {
       grid.updateRowCount();
       return grid.render();
      });
      dataView.onRowsChanged.subscribe(function(event,args)
      {
       grid.invalidateRows(args.rows);
       return grid.render();
      });
      dataView.push=function(item)
      {
       return dataView.addItem((createNew1(item))(dataView.getLength()));
      };
      grid.onAddNewRow.subscribe(function(event,args)
      {
       grid.invalidateRow(dataView.getLength());
       dataView.addItem((createNew1(args.item))(dataView.getLength()));
       grid.updateRowCount();
       return reRender_(null);
      });
      grid.onCellChange.subscribe(function(event,args)
      {
       grid.invalidateRow(args.row);
       dataView.getItems();
       return reRender_(null);
      });
      processPasteData=function(rangeO)
      {
       return function(text)
       {
        var action;
        action=function(range)
        {
         var x,mapping,source,rows,colDefs,nRows,mapping1,source1,nCols,inputSequence,enumerator,_,i,mR,inputSequence1,enumerator1,_1,j,mC,action1;
         x=Strings.SplitStrings(text,["\n\r","\n","\r"],0);
         mapping=function(row)
         {
          return Strings.SplitStrings(row,["\u0009"],0);
         };
         source=(Arrays.length(x)>1?Arrays.get(x,Arrays.length(x)-1)==="":false)?Slice.array(x,{
          $:1,
          $0:0
         },{
          $:1,
          $0:Arrays.length(x)-2
         }):x;
         rows=Seq.map(mapping,source);
         dataView.beginUpdate();
         colDefs=grid.getColumns();
         nRows=Seq.length(rows);
         mapping1=function(cols)
         {
          return cols.length;
         };
         source1=Seq.map(mapping1,rows);
         nCols=Seq.max(source1);
         inputSequence=Operators1.step(range.fromRow,nRows,range.toRow);
         enumerator=Enumerator.Get(inputSequence);
         try
         {
          while(enumerator.MoveNext())
           {
            i=enumerator.get_Current();
            mR=range.fromRow===range.toRow?0:range.toRow-i+1;
            inputSequence1=Operators1.step(range.fromCell,nCols,range.toCell);
            enumerator1=Enumerator.Get(inputSequence1);
            try
            {
             while(enumerator1.MoveNext())
              {
               j=enumerator1.get_Current();
               mC=range.fromCell===range.toCell?0:range.toCell-j+1;
               action1=function(i1)
               {
                return function(cols)
                {
                 var _2,r,item,_3,arg00,action2;
                 if(mR===0?true:i1<mR)
                  {
                   r=i+i1;
                   if(r<dataView.getLength())
                    {
                     _3=dataView.getItem(r);
                    }
                   else
                    {
                     arg00=[];
                     _3=(createNew1(arg00))(r);
                    }
                   item=_3;
                   action2=function(j1)
                   {
                    return function(text1)
                    {
                     var _4,c,_5;
                     if(mC===0?true:j1<mC)
                      {
                       c=j+j1;
                       if(c<Arrays.length(colDefs)?!(!Arrays.get(colDefs,c).field):false)
                        {
                         item[Arrays.get(colDefs,c).field]=text1;
                         _5=text1;
                        }
                       else
                        {
                         _5=null;
                        }
                       _4=_5;
                      }
                     else
                      {
                       _4=null;
                      }
                     return _4;
                    };
                   };
                   Seq.iteri(action2,cols);
                   _2=r<dataView.getLength()?dataView.updateItem(item.id,item):dataView.addItem(item);
                  }
                 else
                  {
                   _2=null;
                  }
                 return _2;
                };
               };
               Seq.iteri(action1,rows);
              }
            }
            finally
            {
             enumerator1.Dispose!=undefined?enumerator1.Dispose():null;
            }
           }
         }
         finally
         {
          enumerator.Dispose!=undefined?enumerator.Dispose():null;
         }
         return dataView.endUpdate();
        };
        return Option.iter(action,rangeO);
       };
      };
      createCaptureArea_=function(text)
      {
       return function(processAfter_)
       {
        var ta,value,processCapture_,value2;
        ta=document.createElement("textarea");
        ta.style.position="absolute";
        ta.style.left="-2000px";
        ta.style.top=gridElement.top;
        ta.value=text;
        value=gridElement.appendChild(ta);
        ta.select();
        ta.focus();
        processCapture_=function()
        {
         var text1,value1;
         text1=ta.value;
         value1=gridElement.removeChild(ta);
         return processAfter_(text1);
        };
        value2=setTimeout(processCapture_,100);
        return;
       };
      };
      selectionModel=new Slick.CellSelectionModel();
      getSelectedRange_=function()
      {
       var ranges,_,mapping,option;
       ranges=selectionModel.getSelectedRanges();
       if(Unchecked.Equals(ranges,[]))
        {
         mapping=function(tupledArg)
         {
          var r,c;
          r=tupledArg[0];
          c=tupledArg[1];
          return{
           fromRow:r,
           fromCell:c,
           toRow:r,
           toCell:c
          };
         };
         option=activeCell_(null);
         _=Option.map(mapping,option);
        }
       else
        {
         _={
          $:1,
          $0:Arrays.get(ranges,0)
         };
        }
       return _;
      };
      getSelectedText_=function()
      {
       var x,mapping,_arg1;
       x=getSelectedRange_(null);
       mapping=function(range)
       {
        var colDefs,strings;
        colDefs=grid.getColumns();
        strings=Seq.toList(Seq.delay(function()
        {
         return Seq.collect(function(i)
         {
          var _,item,strings1;
          if(i<dataView.getLength())
           {
            item=dataView.getItem(i);
            strings1=Seq.toList(Seq.delay(function()
            {
             return Seq.collect(function(j)
             {
              var _1,p;
              if(j<Arrays.length(colDefs)?!(!Arrays.get(colDefs,j).field):false)
               {
                p=Arrays.get(colDefs,j).field;
                _1=[item[p]];
               }
              else
               {
                _1=Seq.empty();
               }
              return _1;
             },Operators1.range(range.fromCell,range.toCell));
            }));
            _=[Strings.concat("\u0009",strings1)];
           }
          else
           {
            _=Seq.empty();
           }
          return _;
         },Operators1.range(range.fromRow,range.toRow));
        }));
        return Strings.concat("\n",strings);
       };
       _arg1=Option.map(mapping,x);
       return Option1.defaultV("",_arg1);
      };
      clearRange_=function(rangeO)
      {
       var action;
       action=function(range)
       {
        var colDefs,i,_,item,j,_1;
        dataView.beginUpdate();
        colDefs=grid.getColumns();
        for(i=range.fromRow;i<=range.toRow;i++){
         if(i<dataView.getLength())
          {
           item=dataView.getItem(i);
           for(j=range.fromCell;j<=range.toCell;j++){
            if(j<Arrays.length(colDefs)?!(!Arrays.get(colDefs,j).field):false)
             {
              item[Arrays.get(colDefs,j).field]="";
              _1="";
             }
            else
             {
              _1=null;
             }
           }
           _=dataView.updateItem(item.id,item);
          }
         else
          {
           _=null;
          }
        }
        return dataView.endUpdate();
       };
       return Option.iter(action,rangeO);
      };
      getCellEditor_=function()
      {
       var value;
       value=grid.getCellEditor();
       return value;
      };
      pasteData_=function()
      {
       var matchValue,_,x;
       matchValue=getCellEditor_(null);
       if(Unchecked.Equals(matchValue,null)?true:matchValue.getValue()==="")
        {
         x=processPasteData(getSelectedRange_(null));
         _=(createCaptureArea_(""))(x);
        }
       else
        {
         _=null;
        }
       return _;
      };
      copyData_=function(processAfter)
      {
       var matchValue,_,text;
       matchValue=getCellEditor_(null);
       if(Unchecked.Equals(matchValue,null))
        {
         text=getSelectedText_(null);
         _=(createCaptureArea_(text))(processAfter);
        }
       else
        {
         _=null;
        }
       return _;
      };
      deleteData_=function()
      {
       var matchValue,_,range,_1,r,_2,r1,mapping,action,source,source1,_3,_4;
       matchValue=getCellEditor_(null);
       if(Unchecked.Equals(matchValue,null))
        {
         range=getSelectedRange_(null);
         if(range.$==1)
          {
           r=range.$0;
           if(r.fromCell===0?r.toCell===Arrays.length(columns)-1:false)
            {
             r1=range.$0;
             mapping=function(i)
             {
              return dataView.getItem(i).id;
             };
             action=function(arg00)
             {
              return dataView.deleteItem(arg00);
             };
             source=Seq.toList(Operators1.range(r1.fromRow,r1.toRow));
             source1=Seq.map(mapping,source);
             _2=Seq.iter(action,source1);
            }
           else
            {
             if(range.$==1)
              {
               range.$0;
               _3=clearRange_(range);
              }
             else
              {
               _3=null;
              }
             _2=_3;
            }
           _1=_2;
          }
         else
          {
           if(range.$==1)
            {
             range.$0;
             _4=clearRange_(range);
            }
           else
            {
             _4=null;
            }
           _1=_4;
          }
         _=_1;
        }
       else
        {
         _=null;
        }
       return _;
      };
      grid.onKeyDown.subscribe(function(event)
      {
       var matchValue,_,_1,_2,c,_3,c1,_4,_5,_6,c2,_7,c3,_8,_9,_a,c4,_b,c5,_c,_d,_e,c6,_f,c7,_10,_11,_12,c8,_13,c9,_14,_15,_16,_17,ca,_18,cb,_19,_1a,_1b,cc,_1c,cd,_1d,_1e,_1f,ce,_20,cf;
       matchValue=[event.key,event.ctrlKey,event.altKey];
       if(matchValue[0]==="Insert")
        {
         if(matchValue[1])
          {
           _1=matchValue[2]?null:copyData_(function()
           {
            return null;
           });
          }
         else
          {
           if(matchValue[2])
            {
             _2=pasteData_(null);
            }
           else
            {
             c=matchValue[0];
             if(c.length===1)
              {
               c1=matchValue[0];
               _3=editCell2_(c1);
              }
             else
              {
               _3=null;
              }
             _2=_3;
            }
           _1=_2;
          }
         _=_1;
        }
       else
        {
         if(matchValue[0]==="V")
          {
           if(matchValue[1])
            {
             _5=matchValue[2]?null:pasteData_(null);
            }
           else
            {
             if(matchValue[2])
              {
               _6=null;
              }
             else
              {
               c2=matchValue[0];
               if(c2.length===1)
                {
                 c3=matchValue[0];
                 _7=editCell2_(c3);
                }
               else
                {
                 _7=null;
                }
               _6=_7;
              }
             _5=_6;
            }
           _4=_5;
          }
         else
          {
           if(matchValue[0]==="v")
            {
             if(matchValue[1])
              {
               _9=matchValue[2]?null:pasteData_(null);
              }
             else
              {
               if(matchValue[2])
                {
                 _a=null;
                }
               else
                {
                 c4=matchValue[0];
                 if(c4.length===1)
                  {
                   c5=matchValue[0];
                   _b=editCell2_(c5);
                  }
                 else
                  {
                   _b=null;
                  }
                 _a=_b;
                }
               _9=_a;
              }
             _8=_9;
            }
           else
            {
             if(matchValue[0]==="C")
              {
               if(matchValue[1])
                {
                 _d=matchValue[2]?null:copyData_(function()
                 {
                  return null;
                 });
                }
               else
                {
                 if(matchValue[2])
                  {
                   _e=null;
                  }
                 else
                  {
                   c6=matchValue[0];
                   if(c6.length===1)
                    {
                     c7=matchValue[0];
                     _f=editCell2_(c7);
                    }
                   else
                    {
                     _f=null;
                    }
                   _e=_f;
                  }
                 _d=_e;
                }
               _c=_d;
              }
             else
              {
               if(matchValue[0]==="c")
                {
                 if(matchValue[1])
                  {
                   _11=matchValue[2]?null:copyData_(function()
                   {
                    return null;
                   });
                  }
                 else
                  {
                   if(matchValue[2])
                    {
                     _12=null;
                    }
                   else
                    {
                     c8=matchValue[0];
                     if(c8.length===1)
                      {
                       c9=matchValue[0];
                       _13=editCell2_(c9);
                      }
                     else
                      {
                       _13=null;
                      }
                     _12=_13;
                    }
                   _11=_12;
                  }
                 _10=_11;
                }
               else
                {
                 if(matchValue[0]==="Delete")
                  {
                   _14=matchValue[1]?null:matchValue[2]?copyData_(function()
                   {
                    return deleteData_(null);
                   }):deleteData_(null);
                  }
                 else
                  {
                   if(matchValue[0]==="X")
                    {
                     if(matchValue[1])
                      {
                       _16=matchValue[2]?null:copyData_(function()
                       {
                        return deleteData_(null);
                       });
                      }
                     else
                      {
                       if(matchValue[2])
                        {
                         _17=null;
                        }
                       else
                        {
                         ca=matchValue[0];
                         if(ca.length===1)
                          {
                           cb=matchValue[0];
                           _18=editCell2_(cb);
                          }
                         else
                          {
                           _18=null;
                          }
                         _17=_18;
                        }
                       _16=_17;
                      }
                     _15=_16;
                    }
                   else
                    {
                     if(matchValue[0]==="x")
                      {
                       if(matchValue[1])
                        {
                         _1a=matchValue[2]?null:copyData_(function()
                         {
                          return deleteData_(null);
                         });
                        }
                       else
                        {
                         if(matchValue[2])
                          {
                           _1b=null;
                          }
                         else
                          {
                           cc=matchValue[0];
                           if(cc.length===1)
                            {
                             cd=matchValue[0];
                             _1c=editCell2_(cd);
                            }
                           else
                            {
                             _1c=null;
                            }
                           _1b=_1c;
                          }
                         _1a=_1b;
                        }
                       _19=_1a;
                      }
                     else
                      {
                       if(matchValue[0]==="F2")
                        {
                         _1d=matchValue[1]?null:matchValue[2]?null:editCell_(null);
                        }
                       else
                        {
                         if(matchValue[1])
                          {
                           _1e=null;
                          }
                         else
                          {
                           if(matchValue[2])
                            {
                             _1f=null;
                            }
                           else
                            {
                             ce=matchValue[0];
                             if(ce.length===1)
                              {
                               cf=matchValue[0];
                               _20=editCell2_(cf);
                              }
                             else
                              {
                               _20=null;
                              }
                             _1f=_20;
                            }
                           _1e=_1f;
                          }
                         _1d=_1e;
                        }
                       _19=_1d;
                      }
                     _15=_19;
                    }
                   _14=_15;
                  }
                 _10=_14;
                }
               _c=_10;
              }
             _8=_c;
            }
           _4=_8;
          }
         _=_4;
        }
       return _;
      });
      grid.setSelectionModel(selectionModel);
      value3=jQuery(gridElement).bind("resize",function()
      {
       reRender_(null);
       return grid.autosizeColumns();
      });
      setItems=function(data1)
      {
       var action;
       action=function(i)
       {
        return function(item)
        {
         item.id=i;
        };
       };
       Arrays.iteri(action,data1);
       return dataView.setItems(data1);
      };
      setItems(data);
      grid.autosizeColumns();
      inMessagesProcessor=function(msg)
      {
       var _,data1,arg0,arg01;
       if(msg.$==0)
        {
         dataView.setItems([]);
         _=grid.autosizeColumns();
        }
       else
        {
         if(msg.$==3)
          {
           data1=msg.$0;
           setItems(data1);
           grid.invalidateAllRows();
           reRender_(null);
           _=grid.autosizeColumns();
          }
         else
          {
           if(msg.$==2)
            {
             arg0=grid.getColumns();
             _=sendMessage_({
              $:3,
              $0:arg0
             });
            }
           else
            {
             arg01=dataView.getItems();
             _=sendMessage_({
              $:2,
              $0:arg01
             });
            }
          }
        }
       return _;
      };
      sendMessage_({
       $:1,
       $0:inMessagesProcessor
      });
      return _builder_.Zero();
     });
    },
    gridOptions:Runtime.Field(function()
    {
     return{
      enableColumnReorder:true,
      enableCellNavigation:true,
      editable:true,
      enableAddRow:true,
      autoEdit:false,
      syncColumnCellResize:true,
      headerRowHeight:45
     };
    })
   },
   TestFS:{
    getData:function(ev)
    {
     var value;
     value=ev.dataTransfer.getData.apply(ev.dataTransfer,["text"]);
     return value;
    },
    getDimByNameR_:function(dimensions,dimName)
    {
     var chooser,source,x,m;
     chooser=function(tupledArg)
     {
      var dim,name;
      dim=tupledArg[0];
      tupledArg[1];
      name=tupledArg[2];
      tupledArg[3];
      return name===dimName?{
       $:1,
       $0:dim
      }:{
       $:0
      };
     };
     source=Seq.choose(chooser,dimensions);
     x=Seq1.tryHead(source);
     m={
      $:22,
      $0:"dimension",
      $1:dimName
     };
     return Rop1.fromOption(m,x);
    },
    initW_:function(dimensions,token,navDim)
    {
     var _builder_;
     _builder_=ARop.wrap();
     return _builder_.Delay(function()
     {
      return _builder_.Bind(MenuBar.initW_(token,navDim),function(_arg1)
      {
       return _builder_.Return({
        search1:SearchFlickr.init(),
        search2:SearchFlickr.init(),
        menuBar:_arg1,
        dimModel:DimModel.init(),
        token:token,
        dimensions:dimensions,
        selected:{
         $:0
        },
        hover:{
         $:0
        }
       });
      });
     });
    },
    preventDefault:function(ev)
    {
     var value;
     value=ev.preventDefault.apply(ev,null);
     return;
    },
    setData:function(ev,data)
    {
     var value;
     value=ev.dataTransfer.setData.apply(ev.dataTransfer,["text",data]);
     return;
    },
    showForm_:function(node)
    {
     var _builder_;
     _builder_=ARop.wrap();
     return ARop.call(_builder_.Delay(function()
     {
      return _builder_.Bind2(Rop1.tryProtection(),function()
      {
       return _builder_.Bind1(AjaxRemotingProvider.Async("CIPHERPrototype2:17",[]),function(_arg2)
       {
        return _builder_.Bind1(AjaxRemotingProvider.Async("CIPHERPrototype2:12",[]),function(_arg3)
        {
         return _builder_.Bind2(TestFS.getDimByNameR_(_arg3,"_Navigation"),function(_arg4)
         {
          return _builder_.Bind(TestFS.initW_(_arg3,_arg2,_arg4),function(_arg5)
          {
           App.run(node,App.app(_arg5,function(msg)
           {
            return function(model)
            {
             return TestFS.update(msg,model);
            };
           },function(model)
           {
            return function(processMessages)
            {
             return TestFS.view(model,processMessages);
            };
           }));
           return _builder_.Zero();
          });
         });
        });
       });
      });
     }));
    },
    text:function(txt)
    {
     return List.ofArray([ReactHtml.H3(List.ofArray([{
      $:1,
      $0:txt
     }])),ReactHtml._Style(List.ofArray([ReactHtml._background(txt)]))]);
    },
    update:function(msg,model)
    {
     var _,msg1,search2,msg2,menuBar,msg3,dimModel,dimO,idO,msg4;
     if(msg.$==1)
      {
       msg1=msg.$0;
       search2=SearchFlickr.update(msg1,model.search2);
       _={
        search1:model.search1,
        search2:search2,
        menuBar:model.menuBar,
        dimModel:model.dimModel,
        token:model.token,
        dimensions:model.dimensions,
        selected:model.selected,
        hover:model.hover
       };
      }
     else
      {
       if(msg.$==2)
        {
         msg2=msg.$0;
         menuBar=MenuBar.update(msg2,model.menuBar);
         _={
          search1:model.search1,
          search2:model.search2,
          menuBar:menuBar,
          dimModel:model.dimModel,
          token:model.token,
          dimensions:model.dimensions,
          selected:model.selected,
          hover:model.hover
         };
        }
       else
        {
         if(msg.$==3)
          {
           msg3=msg.$0;
           dimModel=DimModel.update(msg3,model.dimModel);
           _={
            search1:model.search1,
            search2:model.search2,
            menuBar:model.menuBar,
            dimModel:dimModel,
            token:model.token,
            dimensions:model.dimensions,
            selected:model.selected,
            hover:model.hover
           };
          }
         else
          {
           if(msg.$==5)
            {
             dimO=msg.$0;
             _={
              search1:model.search1,
              search2:model.search2,
              menuBar:model.menuBar,
              dimModel:model.dimModel,
              token:model.token,
              dimensions:model.dimensions,
              selected:dimO,
              hover:model.hover
             };
            }
           else
            {
             if(msg.$==4)
              {
               idO=msg.$0;
               _={
                search1:model.search1,
                search2:model.search2,
                menuBar:model.menuBar,
                dimModel:model.dimModel,
                token:model.token,
                dimensions:model.dimensions,
                selected:model.selected,
                hover:idO
               };
              }
             else
              {
               msg4=msg.$0;
               _={
                search1:SearchFlickr.update(msg4,model.search1),
                search2:model.search2,
                menuBar:model.menuBar,
                dimModel:model.dimModel,
                token:model.token,
                dimensions:model.dimensions,
                selected:model.selected,
                hover:model.hover
               };
              }
            }
          }
        }
      }
     return _;
    },
    view:function(model,processMessages)
    {
     var menu,_arg1,dimModel,findDimension,selectDimension,x1,mapping,dimensions,dimensionsTitle,x8,arg00,_arg12,dimensionsPane,x9,arg001,dimensionsView,l,xa,newChildren,xb,header,footer,left,right,xc;
     menu=MenuBar.view(model.menuBar,function(msg)
     {
      return processMessages({
       $:2,
       $0:msg
      });
     });
     _arg1=DimModel.view(model.dimModel,function(msg)
     {
      return processMessages({
       $:3,
       $0:msg
      });
     });
     dimModel=Layouts.Children(_arg1);
     findDimension=function(fdim)
     {
      var x,chooser,source;
      x=model.dimensions;
      chooser=function(tupledArg)
      {
       var dim,_arg11,loop;
       dim=tupledArg[0];
       _arg11=tupledArg[1];
       tupledArg[2];
       tupledArg[3];
       loop=[];
       loop[1]=dim;
       loop[0]=1;
       while(loop[0])
        {
         loop[0]=0;
         loop[1]="Dimension "+PrintfHelpers.prettyPrint(loop[1].$0);
        }
       return fdim===loop[1]?{
        $:1,
        $0:dim
       }:{
        $:0
       };
      };
      source=Seq.choose(chooser,x);
      return Seq.head(source);
     };
     selectDimension=function(dim)
     {
      var arg0;
      arg0={
       $:1,
       $0:dim
      };
      processMessages({
       $:5,
       $0:arg0
      });
      return DimModel.selectDimension_(model.token,function(x)
      {
       return processMessages({
        $:3,
        $0:x
       });
      },dim);
     };
     x1=model.dimensions;
     mapping=function(tupledArg)
     {
      var dim,_arg7,name,_arg8,hover,patternInput,back,bStyle,x,x2,x3,x5,x6,x7;
      dim=tupledArg[0];
      _arg7=tupledArg[1];
      name=tupledArg[2];
      _arg8=tupledArg[3];
      hover=Unchecked.Equals(model.hover,{
       $:1,
       $0:dim.get_dimensionId()
      });
      patternInput=Unchecked.Equals({
       $:1,
       $0:dim
      },model.selected)?["groove","lightblue"]:["none",hover?"#e6e6e6":"transparent"];
      back=patternInput[1];
      bStyle=patternInput[0];
      x=ReactHtml.Div(List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._padding("4px"),ReactHtml._borderStyle(bStyle),ReactHtml._borderWidth("1px"),ReactHtml._background(back),ReactHtml._cursor("pointer")])),ReactHtml.Draggable(true),ReactHtml.H4(List.ofArray([{
       $:1,
       $0:"\ue032 "
      },ReactHtml._Style(List.ofArray([ReactHtml._display("inline"),ReactHtml._fontFamily("Glyphicons Halflings")]))])),ReactHtml.H4(List.ofArray([{
       $:1,
       $0:name
      },ReactHtml._Style(List.ofArray([ReactHtml._display("inline")]))]))]));
      x2=(ReactHtml.OnDrop(function(ev)
      {
       TestFS.preventDefault(ev);
       return selectDimension(findDimension(TestFS.getData(ev)));
      }))(x);
      x3=(ReactHtml.OnDragStart(function(ev)
      {
       var loop,x4;
       loop=[];
       loop[1]=dim;
       loop[0]=1;
       while(loop[0])
        {
         loop[0]=0;
         loop[1]="Dimension "+PrintfHelpers.prettyPrint(loop[1].$0);
        }
       x4=loop[1];
       return TestFS.setData(ev,x4);
      }))(x2);
      x5=(ReactHtml.OnDragOver(function(ev)
      {
       var _,_1,arg0,arg01;
       if(Strings.StartsWith(TestFS.getData(ev),"Dimension"))
        {
         TestFS.preventDefault(ev);
         if(!Unchecked.Equals(model.hover,{
          $:1,
          $0:dim.get_dimensionId()
         }))
          {
           arg0=dim.get_dimensionId();
           arg01={
            $:1,
            $0:arg0
           };
           _1=processMessages({
            $:4,
            $0:arg01
           });
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
      }))(x3);
      x6=(ReactHtml.OnMouseOver(function()
      {
       var _,arg0,arg01;
       if(!Unchecked.Equals(model.hover,{
        $:1,
        $0:dim.get_dimensionId()
       }))
        {
         arg0=dim.get_dimensionId();
         arg01={
          $:1,
          $0:arg0
         };
         _=processMessages({
          $:4,
          $0:arg01
         });
        }
       else
        {
         _=null;
        }
       return _;
      }))(x5);
      x7=(ReactHtml.OnMouseOut(function()
      {
       var arg0;
       arg0={
        $:0
       };
       return processMessages({
        $:4,
        $0:arg0
       });
      }))(x6);
      return(ReactHtml.OnClick(function()
      {
       return selectDimension(dim);
      }))(x7);
     };
     dimensions=Seq.map(mapping,x1);
     dimensionsTitle=ReactHtml.Span(List.ofArray([{
      $:1,
      $0:"Dimensions"
     },ReactHtml._Style(List.ofArray([ReactHtml._margin("5px"),ReactHtml.newAttr("fontSize","30px")]))]));
     x8=Layouts.BasicContainer(List.ofArray([dimensionsTitle]),Runtime.New(T,{
      $:0
     }),dimensions);
     arg00=List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._flexFlow("column")]))]);
     _arg12=((ReactHtml.addAttributes())(arg00))(x8);
     dimensionsPane=Layouts.Children(_arg12);
     x9=Layouts.BasicContainer(dimensionsPane,Runtime.New(T,{
      $:0
     }),dimModel);
     arg001=List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._flexFlow("row"),ReactHtml._flex("1 0")]))]);
     dimensionsView=((ReactHtml.addAttributes())(arg001))(x9);
     xa=SearchFlickr.view(model.search2,function(msg)
     {
      return processMessages({
       $:1,
       $0:msg
      });
     });
     newChildren=List.ofArray([ReactHtml._Style(List.ofArray([ReactHtml._flex("1 0"),ReactHtml._background("lightsalmon")]))]);
     l=List.ofArray([dimensionsView,ReactHtml.addChildren(newChildren,xa)]);
     xb=Runtime.New(T,{
      $:1,
      $0:ReactHtml._Style(List.ofArray([ReactHtml._display("flex")])),
      $1:l
     });
     header=List.ofArray([menu]);
     footer=TestFS.text("green");
     left=TestFS.text("blue");
     right=TestFS.text("yellow");
     xc=Layouts.HorizontalSplitter(header,footer,left,right,xb);
     return Layouts.Stretch(xc);
    }
   },
   UploadForm:{
    createNodes:function(model)
    {
     var childrenFolders,childrenFiles,folderNode;
     childrenFolders=function(parent)
     {
      var predicate,source;
      predicate=function(folder)
      {
       return Unchecked.Equals(folder.parentCode,parent);
      };
      source=model.folders;
      return Seq.filter(predicate,source);
     };
     childrenFiles=function(parent)
     {
      var predicate,source,x,projection;
      predicate=function(file)
      {
       return Unchecked.Equals(file.parentCode,parent);
      };
      source=model.files;
      x=Seq.filter(predicate,source);
      projection=function(file)
      {
       var x1,mapping;
       x1=model.sortBy;
       mapping=function(by)
       {
        return by.$==1?file.modified:by.$==2?file.tags.toLowerCase():by.$==3?file.contentType.toLowerCase():by.$==4?file.size:file.name.toLowerCase();
       };
       return List.map(mapping,x1);
      };
      return Seq.sortBy(projection,x);
     };
     folderNode=function(folder)
     {
      var mapping,folderId,mapping1,source,subFolders,mapping2,source1,subFiles,mapping3,_arg1,key1,mapping4,_arg11,title1,mapping5,_arg12,detail,source2;
      mapping=function(folder1)
      {
       return folder1.id;
      };
      folderId=Option.map(mapping,folder);
      mapping1=function(x)
      {
       return folderNode({
        $:1,
        $0:x
       });
      };
      source=childrenFolders(folderId);
      subFolders=Seq.map(mapping1,source);
      mapping2=function(file)
      {
       var key,title,children;
       key=String(file.id);
       title=file.name;
       children=[];
       return{
        key:key,
        title:title,
        tag:"",
        detail:file,
        folder:false,
        children:children
       };
      };
      source1=childrenFiles(folderId);
      subFiles=Seq.map(mapping2,source1);
      mapping3=function(folder1)
      {
       return String(folder1.id);
      };
      _arg1=Option.map(mapping3,folder);
      key1=Option1.defaultV("/",_arg1);
      mapping4=function(folder1)
      {
       return folder1.name;
      };
      _arg11=Option.map(mapping4,folder);
      title1=Option1.defaultV("/",_arg11);
      mapping5=function(folder1)
      {
       return folder1;
      };
      _arg12=Option.map(mapping5,folder);
      detail=Option1.defaultV(null,_arg12);
      source2=Seq.append(subFolders,subFiles);
      return{
       key:key1,
       title:title1,
       tag:"",
       detail:detail,
       folder:true,
       children:Seq.toArray(source2)
      };
     };
     return folderNode({
      $:0
     }).children;
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
       _arg12=Option.map(mapping,_arg11);
       return _builder_.Return(Option1.defaultV("",_arg12));
      });
     });
     return Rop1.ifError("",_arg1);
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
       return _builder_.Return(Arrays.tryHead(files));
      });
     });
    },
    init:function(title,folders,files,themeTags,client)
    {
     var form,treeViewProcessorO,relationsCallback,sortBy;
     form=GenForm.init(title);
     treeViewProcessorO={
      $:0
     };
     relationsCallback={
      $:0
     };
     sortBy=List.ofArray([{
      $:0
     },{
      $:2
     },{
      $:1
     },{
      $:3
     },{
      $:4
     }]);
     return{
      form:form,
      dialog:Dialog.init(),
      popup:Popup.init(),
      treeViewProcessorO:treeViewProcessorO,
      relationsCallback:relationsCallback,
      folders:folders,
      files:files,
      sortBy:sortBy,
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
      }
     };
    },
    runApp_:function(token,container,initModel)
    {
     var globalProcessor,setGlobalProcessor_,processMessages,showProcessing,showCompleted,updateTreeView_,reloadFiles_,callServerReloadFiles,deleteFile_,renameFile_,moveTo_,renameFolder_,createFolder_,doUpload_,uploadFile_,setTargetFolder,setParentFolder,treeViewGetSelectedAR_,withSelectedNode,menuItems,processTreeViewMessages,treeViewClass,view,update1,app;
     globalProcessor=[{
      $:0
     }];
     setGlobalProcessor_=function(processMsg)
     {
      return globalProcessor[0].$==0?void(globalProcessor[0]=processMsg):null;
     };
     processMessages=function(msg)
     {
      var mapping,option,value;
      mapping=function(f)
      {
       return f(msg);
      };
      option=globalProcessor[0];
      value=Option.map(mapping,option);
      return;
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
       $:6,
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
       $:6,
       $0:arg01
      });
     };
     updateTreeView_=function()
     {
      var update;
      update=function(model)
      {
       var arg0,arg01,x;
       arg0=UploadForm.createNodes(model);
       arg01={
        $:2,
        $0:arg0
       };
       x={
        $:9,
        $0:arg01
       };
       return UploadForm.update(x,model);
      };
      return processMessages({
       $:12,
       $0:update
      });
     };
     reloadFiles_=function(message)
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:4",[token]),function(_arg1)
       {
        var folders,files,tupledArg,arg0,arg1;
        folders=_arg1[0];
        files=_arg1[1];
        tupledArg=[folders,files];
        arg0=tupledArg[0];
        arg1=tupledArg[1];
        processMessages({
         $:0,
         $0:arg0,
         $1:arg1
        });
        updateTreeView_(null);
        showCompleted(message);
        return _builder_.Zero();
       });
      });
     };
     callServerReloadFiles=function(call)
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(call,function(_arg2)
       {
        reloadFiles_(_arg2);
        return _builder_.Zero();
       });
      });
     };
     deleteFile_=function(node)
     {
      return function()
      {
       return callServerReloadFiles(AjaxRemotingProvider.Async("CIPHERPrototype2:5",[token,node.key,node.isFolder()]));
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
         return callServerReloadFiles(AjaxRemotingProvider.Async("CIPHERPrototype2:7",[token,fileId,newName,tags]));
        };
       };
      };
     };
     moveTo_=function(node)
     {
      return function(newId)
      {
       return function()
       {
        return callServerReloadFiles(AjaxRemotingProvider.Async("CIPHERPrototype2:6",[token,node.key,node.isFolder(),newId]));
       };
      };
     };
     renameFolder_=function(folderId)
     {
      return function(newName)
      {
       return function()
       {
        return callServerReloadFiles(AjaxRemotingProvider.Async("CIPHERPrototype2:8",[token,folderId,newName]));
       };
      };
     };
     createFolder_=function(name)
     {
      return function(folderId)
      {
       return function()
       {
        return callServerReloadFiles(AjaxRemotingProvider.Async("CIPHERPrototype2:9",[token,name,folderId]));
       };
      };
     };
     doUpload_=function(file)
     {
      return function(_arg3)
      {
       var uploadName,uploadFolder,themeTags,client,_builder_;
       uploadName=_arg3.$0;
       uploadFolder=_arg3.$1;
       themeTags=_arg3.$2;
       client=_arg3.$3;
       _builder_=Server.call();
       return _builder_.Delay(function()
       {
        return _builder_.Bind1(Rop1.tryProtection(),function()
        {
         var rdr;
         showProcessing("Uploading file "+PrintfHelpers.toSafe(file.name)+" ...");
         rdr=new FileReader();
         rdr.onloadend=function()
         {
          return callServerReloadFiles(AjaxRemotingProvider.Async("CIPHERPrototype2:10",[token,uploadName,uploadFolder,rdr.result,file.type,file.size,themeTags,client]));
         };
         rdr.readAsDataURL(file);
         return _builder_.Zero();
        });
       });
      };
     };
     uploadFile_=function(upload)
     {
      return function()
      {
       var _builder_;
       _builder_=Server.call();
       return _builder_.Delay(function()
       {
        return _builder_.Bind1(UploadForm.getUploadFileRO_(),function(_arg5)
        {
         var action;
         action=function(file)
         {
          processMessages({
           $:4,
           $0:upload
          });
          return(doUpload_(file))(upload);
         };
         Option.iter(action,_arg5);
         return _builder_.Zero();
        });
       });
      };
     };
     setTargetFolder=function(node)
     {
      var _arg1,arg0;
      _arg1=node.isFolder()?{
       $:1,
       $0:node.data.detail.id
      }:node.data.detail.parentCode;
      arg0=Option1.defaultV("",_arg1);
      return processMessages({
       $:3,
       $0:arg0
      });
     };
     setParentFolder=function(node)
     {
      var _arg1,arg0;
      _arg1=node.data.detail.parentCode;
      arg0=Option1.defaultV("",_arg1);
      return processMessages({
       $:3,
       $0:arg0
      });
     };
     treeViewGetSelectedAR_=function()
     {
      return Concurrency.FromContinuations(function(tupledArg)
      {
       var callback,arg0;
       callback=tupledArg[0];
       tupledArg[1];
       tupledArg[2];
       processMessages({
        $:11,
        $0:callback
       });
       arg0={
        $:4
       };
       return processMessages({
        $:9,
        $0:arg0
       });
      });
     };
     withSelectedNode=function(f)
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(treeViewGetSelectedAR_(null),function(_arg6)
       {
        f(_arg6);
        return _builder_.Zero();
       });
      });
     };
     menuItems=List.ofArray([["Upload file",function()
     {
      return withSelectedNode(function(node)
      {
       var arg0,arg01;
       setTargetFolder(node);
       arg0=UploadForm.getFileName_();
       processMessages({
        $:2,
        $0:arg0
       });
       arg01={
        $:0
       };
       return processMessages({
        $:5,
        $0:arg01
       });
      });
     }],["New folder",function()
     {
      return withSelectedNode(function(node)
      {
       var arg0;
       setTargetFolder(node);
       arg0={
        $:1
       };
       return processMessages({
        $:5,
        $0:arg0
       });
      });
     }],["Move",function()
     {
      return withSelectedNode(function(node)
      {
       var arg0;
       setParentFolder(node);
       arg0={
        $:2,
        $0:node
       };
       return processMessages({
        $:5,
        $0:arg0
       });
      });
     }],["Rename",function()
     {
      return withSelectedNode(function(node)
      {
       var renameObject,_,arg01,arg02,arg03;
       if(node.isFolder())
        {
         _=function(arg0)
         {
          return{
           $:4,
           $0:arg0
          };
         };
        }
       else
        {
         arg01=node.data.detail.tags;
         processMessages({
          $:1,
          $0:arg01
         });
         _=function(arg0)
         {
          return{
           $:3,
           $0:arg0
          };
         };
        }
       renameObject=_;
       arg02=node.title;
       processMessages({
        $:2,
        $0:arg02
       });
       arg03=renameObject(node);
       return processMessages({
        $:5,
        $0:arg03
       });
      });
     }],["-",function()
     {
      return null;
     }],["Delete",function()
     {
      return withSelectedNode(function(node)
      {
       var arg0;
       arg0={
        $:5,
        $0:node
       };
       return processMessages({
        $:5,
        $0:arg0
       });
      });
     }]]);
     processTreeViewMessages=function(msg)
     {
      return processMessages({
       $:10,
       $0:msg
      });
     };
     treeViewClass=ClientForm.reactContainerClass("flex flexgrow",function()
     {
      return function(container1)
      {
       var value,arg0,options,nodes;
       value=jQuery(container1).html("<table class=\"table table-hover\"><thead>\r\n                           <tr> <th>Name</th><th>Theme</th><th></th><th>Content</th> <th>Size</th> <th>Modified</th> </tr>\r\n                                                    </thead><tbody></tbody></table>");
       arg0={
        extensions:["glyph","clones","table","dnd"],
        dnd:{
         focusOnClick:true,
         dragStart:function()
         {
          return true;
         },
         dragEnter:function(node)
         {
          return node.isFolder();
         },
         dragDrop:function(node,data)
         {
          var arg01,arg02,arg03;
          arg01=node.data.detail.id;
          processMessages({
           $:3,
           $0:arg01
          });
          arg02=data.otherNode;
          arg03={
           $:2,
           $0:arg02
          };
          return processMessages({
           $:5,
           $0:arg03
          });
         }
        },
        renderColumns:function(event,data)
        {
         var value1,value2,cols,value3,value4,value5,_,value6,value7,value8,value9;
         value1=data.node;
         value2=value1.data.detail;
         value3=value1.tr;
         cols=jQuery(value3).find(">td");
         value4=cols.eq(2).html("<a href=\"#\"><span class=\"fancytree-title\">:::</span></a>").on("click",function()
         {
          var tupledArg,arg01,arg1,arg02;
          tupledArg=[this.getBoundingClientRect().top,this.getBoundingClientRect().left];
          arg01=tupledArg[0];
          arg1=tupledArg[1];
          arg02={
           $:0,
           $0:arg01,
           $1:arg1
          };
          return processMessages({
           $:8,
           $0:arg02
          });
         });
         value5=value1.isFolder();
         if(!value5)
          {
           value6=cols.eq(1).text(value2.tags);
           value7=cols.eq(3).text(value2.contentType);
           value8=cols.eq(4).text(value2.size.toLocaleString());
           value9=cols.eq(5).text(value2.modified);
           _=void value9;
          }
         else
          {
           _=null;
          }
         return _;
        }
       };
       options={
        $:1,
        $0:arg0
       };
       nodes=UploadForm.createNodes(initModel);
       return FancyTree.createFancyTree(container1.firstChild,options,nodes,{
        $:1,
        $0:processTreeViewMessages
       });
      };
     });
     view=function(model)
     {
      return function(processMessages1)
      {
       var patternInput,path_,folders_,matchValue1,_1,node,node1,node2,node3,_2,arg0,dlgTitle,dlgContent,dlgButtons,matchValue2,reUpload,_3,_4,upload,x2,value,_5,_6,_7,buttons,content,model1,processMessages2,model2,processMessages3,x3,model3,processMessages4;
       setGlobalProcessor_({
        $:1,
        $0:processMessages1
       });
       path_=function(folder)
       {
        var matchValue,p,_,parent,predicate,array,option,_arg1;
        matchValue=folder.parentCode;
        if(matchValue.$==1)
         {
          parent=matchValue.$0;
          predicate=function(folder1)
          {
           return Unchecked.Equals(folder1.id,parent);
          };
          array=model.folders;
          option=Arrays.tryFind(predicate,array);
          _arg1=Option.map(path_,option);
          _=Option1.defaultV("",_arg1);
         }
        else
         {
          _="";
         }
        p=_;
        return p+"/"+folder.name;
       };
       folders_=function()
       {
        var mapping,array,x,array1,x1,projection;
        mapping=function(folder)
        {
         return[String(folder.id),path_(folder)];
        };
        array=model.folders;
        x=Arrays.map(mapping,array);
        array1=[["","/"]];
        x1=array1.concat(x);
        projection=function(tupledArg)
        {
         var p;
         tupledArg[0];
         p=tupledArg[1];
         return p;
        };
        return Arrays.sortBy(projection,x1);
       };
       matchValue1=model.showDialog;
       if(matchValue1.$==2)
        {
         node=matchValue1.$0;
         _1=["Move to",List.ofArray([["Ok","btn",(moveTo_(node))(model.uploadFolder)],["Cancel","btn",function(x)
         {
          return x;
         }]]),List.ofArray([Fields.selectWoValidator("Folder",model.uploadFolder,function(x)
         {
          return processMessages1({
           $:3,
           $0:x
          });
         },folders_(null),Runtime.New(T,{
          $:0
         }))])];
        }
       else
        {
         if(matchValue1.$==3)
          {
           node1=matchValue1.$0;
           _1=["Rename File",List.ofArray([["Ok","btn",((renameFile_(node1.key))(model.uploadName))(model.themeTags)],["Cancel","btn",function(x)
           {
            return x;
           }]]),List.ofArray([Fields.textNotEmpty("File Name",model.uploadName,function(x)
           {
            return processMessages1({
             $:2,
             $0:x
            });
           },List.ofArray([ReactHtml.Placeholder("enter file name"),ReactHtml.MaxLength(100)]),model.form.validations,function(x)
           {
            return processMessages1({
             $:6,
             $0:x
            });
           }),Fields.textWoValidator("Theme tags",model.themeTags,function(x)
           {
            return processMessages1({
             $:1,
             $0:x
            });
           },List.ofArray([ReactHtml.Placeholder("enter tags"),ReactHtml.MaxLength(200)]))])];
          }
         else
          {
           if(matchValue1.$==4)
            {
             node2=matchValue1.$0;
             _1=["Rename Folder",List.ofArray([["Ok","btn",(renameFolder_(node2.key))(model.uploadName)],["Cancel","btn",function(x)
             {
              return x;
             }]]),List.ofArray([Fields.textNotEmpty("File Name",model.uploadName,function(x)
             {
              return processMessages1({
               $:2,
               $0:x
              });
             },List.ofArray([ReactHtml.Placeholder("enter file name"),ReactHtml.MaxLength(100)]),model.form.validations,function(x)
             {
              return processMessages1({
               $:6,
               $0:x
              });
             })])];
            }
           else
            {
             if(matchValue1.$==1)
              {
               _1=["Create Folder",List.ofArray([["Ok","btn",(createFolder_(model.uploadName))(model.uploadFolder)],["Cancel","btn",function(x)
               {
                return x;
               }]]),List.ofArray([Fields.selectWoValidator("Parent Folder",model.uploadFolder,function(x)
               {
                return processMessages1({
                 $:3,
                 $0:x
                });
               },folders_(null),Runtime.New(T,{
                $:0
               })),Fields.textNotEmpty("Folder Name",model.uploadName,function(x)
               {
                return processMessages1({
                 $:2,
                 $0:x
                });
               },List.ofArray([ReactHtml.Placeholder("enter folder name"),ReactHtml.MaxLength(100)]),model.form.validations,function(x)
               {
                return processMessages1({
                 $:6,
                 $0:x
                });
               })])];
              }
             else
              {
               if(matchValue1.$==5)
                {
                 node3=matchValue1.$0;
                 _2=node3.title;
                 arg0="Delete "+PrintfHelpers.toSafe(node3.isFolder()?"folder":"file")+" "+PrintfHelpers.toSafe(_2)+"?";
                 _1=["Confirm Delete ",List.ofArray([["DELETE","btn",deleteFile_(node3)],["Cancel","btn",function(x)
                 {
                  return x;
                 }]]),List.ofArray([{
                  $:1,
                  $0:arg0
                 }])];
                }
               else
                {
                 _1=matchValue1.$==6?["",Runtime.New(T,{
                  $:0
                 }),Runtime.New(T,{
                  $:0
                 })]:["Upload File",List.ofArray([["Upload","btn",uploadFile_({
                  $:0,
                  $0:model.uploadName,
                  $1:model.uploadFolder,
                  $2:model.themeTags,
                  $3:model.client
                 })],["Cancel","btn",function(x)
                 {
                  return x;
                 }]]),List.ofArray([Fields.textNotEmpty("File Name",model.uploadName,function(x)
                 {
                  return processMessages1({
                   $:2,
                   $0:x
                  });
                 },List.ofArray([ReactHtml.Placeholder("enter file name"),ReactHtml.MaxLength(100)]),model.form.validations,function(x)
                 {
                  return processMessages1({
                   $:6,
                   $0:x
                  });
                 }),Fields.selectWoValidator("Folder",model.uploadFolder,function(x)
                 {
                  return processMessages1({
                   $:3,
                   $0:x
                  });
                 },folders_(null),Runtime.New(T,{
                  $:0
                 })),Fields.textWoValidator("Theme tags",model.themeTags,function(x)
                 {
                  return processMessages1({
                   $:1,
                   $0:x
                  });
                 },List.ofArray([ReactHtml.Placeholder("enter tags"),ReactHtml.MaxLength(200)]))])];
                }
              }
            }
          }
        }
       patternInput=_1;
       dlgTitle=patternInput[0];
       dlgContent=patternInput[2];
       dlgButtons=patternInput[1];
       matchValue2=model.lastUpload;
       if(matchValue2.$==1)
        {
         matchValue2.$0;
         if(UploadForm.getFileName_()!=="")
          {
           upload=matchValue2.$0;
           _5=function(_)
           {
            return"Upload ("+PrintfHelpers.prettyPrint(_.$0)+", "+_6(_.$1)+", "+PrintfHelpers.prettyPrint(_.$2)+", "+_7(_.$3)+")";
           };
           _6=function(_)
           {
            return _.$==1?"Some "+PrintfHelpers.prettyPrint(_.$0):"None";
           };
           _7=function(_)
           {
            return"Client "+PrintfHelpers.prettyPrint(_.$0);
           };
           value="Re"+_5(upload);
           x2=ReactHtml.Input(List.ofArray([ReactHtml.Type("button"),ReactHtml.Value(value),ReactHtml._Style(List.ofArray([ReactHtml._flex("0 0"),ReactHtml.newAttr("alignSelf","flex-start")]))]));
           _4=(ReactHtml.OnClick(uploadFile_(upload)))(x2);
          }
         else
          {
           _4={
            $:6
           };
          }
         _3=_4;
        }
       else
        {
         _3={
          $:6
         };
        }
       reUpload=_3;
       buttons=List.ofArray([["New Folder","btn    btn-default  pull-right",function()
       {
        var arg01;
        arg01={
         $:1
        };
        return processMessages1({
         $:5,
         $0:arg01
        });
       }],["Upload File","btn    btn-default  pull-right",function()
       {
        var arg01,arg02;
        arg01=UploadForm.getFileName_();
        processMessages1({
         $:2,
         $0:arg01
        });
        arg02={
         $:0
        };
        return processMessages1({
         $:5,
         $0:arg02
        });
       }]]);
       model1=model.dialog;
       processMessages2=function(msg)
       {
        return processMessages1({
         $:7,
         $0:msg
        });
       };
       model2=model.popup;
       processMessages3=function(msg)
       {
        return processMessages1({
         $:8,
         $0:msg
        });
       };
       x3=ReactHtml.Input(List.ofArray([ReactHtml.Type("file"),ReactHtml.Id("filesel")]));
       content=List.ofArray([Dialog.view(dlgTitle,dlgButtons,dlgContent,model1,processMessages2),Popup.view(menuItems,model2,processMessages3),(ReactHtml.OnChange(function()
       {
        var arg01;
        arg01=UploadForm.getFileName_();
        return processMessages1({
         $:2,
         $0:arg01
        });
       }))(x3),reUpload,{
        $:5,
        $0:treeViewClass
       }]);
       model3=model.form;
       processMessages4=function(msg)
       {
        return processMessages1({
         $:6,
         $0:msg
        });
       };
       return GenForm.view(buttons,content,model3,processMessages4);
      };
     };
     update1=function(message)
     {
      return function(model)
      {
       return UploadForm.update(message,model);
      };
     };
     app=App.app(initModel,update1,view);
     return App.run(container,app);
    },
    showForm_:function(title,themeTags,client)
    {
     return Browser.withContainerDo("flex flexgrow",function(container)
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:17",[]),function(_arg1)
       {
        return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:4",[_arg1]),function(_arg2)
        {
         var folders,files,container1,initModel;
         folders=_arg2[0];
         files=_arg2[1];
         container1=container.Dom;
         initModel=UploadForm.init(title,folders,files,themeTags,client);
         UploadForm.runApp_(_arg1,container1,initModel);
         return _builder_.Zero();
        });
       });
      });
     });
    },
    update:function(message,model)
    {
     var _,clo1,_12,msg,msg1,popup,msg2,dialog,_model_,_13,message1,folders,files,name,folderId,uploadFolder,upload,lastUpload,tags,show,_14,x,arg0,arg01,message2,msg3,action,option,msg4,_15,b,a,arg02,message3,f1,treeViewProcessorO,node,action1,option1,relationsCallback,callback,relationsCallback1,f2;
     if(model.form.debug)
      {
       clo1=function(_1)
       {
        var s,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f;
        _2=function(_10)
        {
         return _10.$==12?"DoAction "+PrintfHelpers.prettyPrint(_10.$0):_10.$==11?"WhenReceiveSelected "+PrintfHelpers.prettyPrint(_10.$0):_10.$==10?"FromTreeView "+_f(_10.$0):_10.$==9?"ToTreeView "+_d(_10.$0):_10.$==8?"ToPopupMsg "+_c(_10.$0):_10.$==7?"ToDialogMsg "+_b(_10.$0):_10.$==6?"ToFormMsg "+_a(_10.$0):_10.$==5?"ShowDialog "+_9(_10.$0):_10.$==4?"SetLastUpload "+_6(_10.$0):_10.$==3?"SetUploadFolder "+PrintfHelpers.prettyPrint(_10.$0):_10.$==2?"SetUploadName "+PrintfHelpers.prettyPrint(_10.$0):_10.$==1?"SetThemeTags "+PrintfHelpers.prettyPrint(_10.$0):"SetFiles ("+PrintfHelpers.printArray(function(_11)
         {
          return _3(_11);
         },_10.$0)+", "+PrintfHelpers.printArray(function(_11)
         {
          return _5(_11);
         },_10.$1)+")";
        };
        _3=function(_10)
        {
         return"{"+("id = "+PrintfHelpers.prettyPrint(_10.id))+"; "+("name = "+PrintfHelpers.prettyPrint(_10.name))+"; "+("parentCode = "+_4(_10.parentCode))+"}";
        };
        _4=function(_10)
        {
         return _10.$==1?"Some "+PrintfHelpers.prettyPrint(_10.$0):"None";
        };
        _5=function(_10)
        {
         return"{"+("id = "+PrintfHelpers.prettyPrint(_10.id))+"; "+("name = "+PrintfHelpers.prettyPrint(_10.name))+"; "+("folderName = "+PrintfHelpers.prettyPrint(_10.folderName))+"; "+("parentCode = "+_4(_10.parentCode))+"; "+("contentType = "+PrintfHelpers.prettyPrint(_10.contentType))+"; "+("size = "+PrintfHelpers.prettyPrint(_10.size))+"; "+("tags = "+PrintfHelpers.prettyPrint(_10.tags))+"; "+("modified = "+PrintfHelpers.prettyPrint(_10.modified))+"}";
        };
        _6=function(_10)
        {
         return"Upload ("+PrintfHelpers.prettyPrint(_10.$0)+", "+_7(_10.$1)+", "+PrintfHelpers.prettyPrint(_10.$2)+", "+_8(_10.$3)+")";
        };
        _7=function(_10)
        {
         return _10.$==1?"Some "+PrintfHelpers.prettyPrint(_10.$0):"None";
        };
        _8=function(_10)
        {
         return"Client "+PrintfHelpers.prettyPrint(_10.$0);
        };
        _9=function(_10)
        {
         return _10.$==6?"NoDialog":_10.$==5?"ConfirmDelete "+PrintfHelpers.prettyPrint(_10.$0):_10.$==4?"RenameFolder "+PrintfHelpers.prettyPrint(_10.$0):_10.$==3?"RenameFile "+PrintfHelpers.prettyPrint(_10.$0):_10.$==2?"Move "+PrintfHelpers.prettyPrint(_10.$0):_10.$==1?"CreateFolder":"UploadFile";
        };
        _a=function(_10)
        {
         return _10.$==3?"SetDebug "+PrintfHelpers.prettyPrint(_10.$0):_10.$==2?"SetModified "+PrintfHelpers.prettyPrint(_10.$0):_10.$==1?"AddValidation ("+PrintfHelpers.prettyPrint(_10.$0)+", "+PrintfHelpers.prettyPrint(_10.$1)+")":"ShowInfo ("+PrintfHelpers.prettyPrint(_10.$0)+", "+PrintfHelpers.prettyPrint(_10.$1)+")";
        };
        _b=function(_10)
        {
         return"ShowDialog "+PrintfHelpers.prettyPrint(_10.$0);
        };
        _c=function(_10)
        {
         return _10.$==2?"HidePopUp":_10.$==1?"AdjustBase ("+PrintfHelpers.prettyPrint(_10.$0)+", "+PrintfHelpers.prettyPrint(_10.$1)+")":"ShowPopUp ("+PrintfHelpers.prettyPrint(_10.$0)+", "+PrintfHelpers.prettyPrint(_10.$1)+")";
        };
        _d=function(_10)
        {
         return _10.$==10?"SelectNode "+PrintfHelpers.prettyPrint(_10.$0):_10.$==9?"Saved "+PrintfHelpers.printArray(function(_11)
         {
          return"("+PrintfHelpers.prettyPrint(_11[0])+", "+PrintfHelpers.prettyPrint(_11[1])+", "+PrintfHelpers.prettyPrint(_11[2])+")";
         },_10.$0):_10.$==8?"DataClear":_10.$==7?"SetTitle ("+PrintfHelpers.prettyPrint(_10.$0)+", "+PrintfHelpers.prettyPrint(_10.$1)+", "+PrintfHelpers.prettyPrint(_10.$2)+")":_10.$==6?"AddNode ("+PrintfHelpers.prettyPrint(_10.$0)+", "+PrintfHelpers.prettyPrint(_10.$1)+", "+PrintfHelpers.prettyPrint(_10.$2)+")":_10.$==5?"DeleteNode "+PrintfHelpers.prettyPrint(_10.$0):_10.$==4?"SendSelected":_10.$==3?"SendRelations":_10.$==2?"LoadNodes "+PrintfHelpers.printArray(function(_11)
         {
          return _e(_11);
         },_10.$0):_10.$==1?"FlattenHierarchy":"ApplyRelations "+PrintfHelpers.printArray(function(_11)
         {
          return"("+PrintfHelpers.prettyPrint(_11[0])+", "+PrintfHelpers.prettyPrint(_11[1])+")";
         },_10.$0);
        };
        _e=function(_10)
        {
         return"{"+("key = "+PrintfHelpers.prettyPrint(_10.key))+"; "+("title = "+PrintfHelpers.prettyPrint(_10.title))+"; "+("tag = "+PrintfHelpers.prettyPrint(_10.tag))+"; "+("detail = "+PrintfHelpers.prettyPrint(_10.detail))+"; "+("folder = "+PrintfHelpers.prettyPrint(_10.folder))+"; "+("children = "+PrintfHelpers.printArray(function(_11)
         {
          return _e(_11);
         },_10.children))+"}";
        };
        _f=function(_10)
        {
         return _10.$==3?"NodeSelected "+PrintfHelpers.prettyPrint(_10.$0):_10.$==2?"Relations "+PrintfHelpers.printArray(function(_11)
         {
          return"("+PrintfHelpers.prettyPrint(_11[0])+", "+PrintfHelpers.prettyPrint(_11[1])+")";
         },_10.$0):_10.$==1?"MessageProcessor "+PrintfHelpers.prettyPrint(_10.$0):"ShowInfo ("+PrintfHelpers.prettyPrint(_10.$0)+", "+PrintfHelpers.prettyPrint(_10.$1)+")";
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
     if(message.$==6)
      {
       msg=message.$0;
       _12={
        form:GenForm.update(msg,model.form),
        dialog:model.dialog,
        popup:model.popup,
        treeViewProcessorO:model.treeViewProcessorO,
        relationsCallback:model.relationsCallback,
        folders:model.folders,
        files:model.files,
        sortBy:model.sortBy,
        uploadName:model.uploadName,
        uploadFolder:model.uploadFolder,
        themeTags:model.themeTags,
        showDialog:model.showDialog,
        client:model.client,
        lastUpload:model.lastUpload
       };
      }
     else
      {
       if(message.$==8)
        {
         msg1=message.$0;
         popup=Popup.update(msg1,model.popup);
         _12={
          form:model.form,
          dialog:model.dialog,
          popup:popup,
          treeViewProcessorO:model.treeViewProcessorO,
          relationsCallback:model.relationsCallback,
          folders:model.folders,
          files:model.files,
          sortBy:model.sortBy,
          uploadName:model.uploadName,
          uploadFolder:model.uploadFolder,
          themeTags:model.themeTags,
          showDialog:model.showDialog,
          client:model.client,
          lastUpload:model.lastUpload
         };
        }
       else
        {
         if(message.$==7)
          {
           msg2=message.$0;
           dialog=Dialog.update(msg2,model.dialog);
           _model_={
            form:model.form,
            dialog:dialog,
            popup:model.popup,
            treeViewProcessorO:model.treeViewProcessorO,
            relationsCallback:model.relationsCallback,
            folders:model.folders,
            files:model.files,
            sortBy:model.sortBy,
            uploadName:model.uploadName,
            uploadFolder:model.uploadFolder,
            themeTags:model.themeTags,
            showDialog:model.showDialog,
            client:model.client,
            lastUpload:model.lastUpload
           };
           if(msg2.$0)
            {
             _13=_model_;
            }
           else
            {
             message1={
              $:5,
              $0:{
               $:6
              }
             };
             _13=UploadForm.update(message1,_model_);
            }
           _12=_13;
          }
         else
          {
           if(message.$==0)
            {
             folders=message.$0;
             files=message.$1;
             _12={
              form:model.form,
              dialog:model.dialog,
              popup:model.popup,
              treeViewProcessorO:model.treeViewProcessorO,
              relationsCallback:model.relationsCallback,
              folders:folders,
              files:files,
              sortBy:model.sortBy,
              uploadName:"",
              uploadFolder:model.uploadFolder,
              themeTags:model.themeTags,
              showDialog:model.showDialog,
              client:model.client,
              lastUpload:model.lastUpload
             };
            }
           else
            {
             if(message.$==2)
              {
               name=message.$0;
               _12={
                form:model.form,
                dialog:model.dialog,
                popup:model.popup,
                treeViewProcessorO:model.treeViewProcessorO,
                relationsCallback:model.relationsCallback,
                folders:model.folders,
                files:model.files,
                sortBy:model.sortBy,
                uploadName:name,
                uploadFolder:model.uploadFolder,
                themeTags:model.themeTags,
                showDialog:model.showDialog,
                client:model.client,
                lastUpload:model.lastUpload
               };
              }
             else
              {
               if(message.$==3)
                {
                 folderId=message.$0;
                 uploadFolder=folderId===""?{
                  $:0
                 }:{
                  $:1,
                  $0:folderId
                 };
                 _12={
                  form:model.form,
                  dialog:model.dialog,
                  popup:model.popup,
                  treeViewProcessorO:model.treeViewProcessorO,
                  relationsCallback:model.relationsCallback,
                  folders:model.folders,
                  files:model.files,
                  sortBy:model.sortBy,
                  uploadName:model.uploadName,
                  uploadFolder:uploadFolder,
                  themeTags:model.themeTags,
                  showDialog:model.showDialog,
                  client:model.client,
                  lastUpload:model.lastUpload
                 };
                }
               else
                {
                 if(message.$==4)
                  {
                   upload=message.$0;
                   lastUpload={
                    $:1,
                    $0:upload
                   };
                   _12={
                    form:model.form,
                    dialog:model.dialog,
                    popup:model.popup,
                    treeViewProcessorO:model.treeViewProcessorO,
                    relationsCallback:model.relationsCallback,
                    folders:model.folders,
                    files:model.files,
                    sortBy:model.sortBy,
                    uploadName:model.uploadName,
                    uploadFolder:model.uploadFolder,
                    themeTags:model.themeTags,
                    showDialog:model.showDialog,
                    client:model.client,
                    lastUpload:lastUpload
                   };
                  }
                 else
                  {
                   if(message.$==1)
                    {
                     tags=message.$0;
                     _12={
                      form:model.form,
                      dialog:model.dialog,
                      popup:model.popup,
                      treeViewProcessorO:model.treeViewProcessorO,
                      relationsCallback:model.relationsCallback,
                      folders:model.folders,
                      files:model.files,
                      sortBy:model.sortBy,
                      uploadName:model.uploadName,
                      uploadFolder:model.uploadFolder,
                      themeTags:tags,
                      showDialog:model.showDialog,
                      client:model.client,
                      lastUpload:model.lastUpload
                     };
                    }
                   else
                    {
                     if(message.$==5)
                      {
                       show=message.$0;
                       if(!Unchecked.Equals(model.showDialog,show))
                        {
                         x={
                          form:model.form,
                          dialog:model.dialog,
                          popup:model.popup,
                          treeViewProcessorO:model.treeViewProcessorO,
                          relationsCallback:model.relationsCallback,
                          folders:model.folders,
                          files:model.files,
                          sortBy:model.sortBy,
                          uploadName:model.uploadName,
                          uploadFolder:model.uploadFolder,
                          themeTags:model.themeTags,
                          showDialog:show,
                          client:model.client,
                          lastUpload:model.lastUpload
                         };
                         arg0=!Unchecked.Equals(show,{
                          $:6
                         });
                         arg01={
                          $:0,
                          $0:arg0
                         };
                         message2={
                          $:7,
                          $0:arg01
                         };
                         _14=UploadForm.update(message2,x);
                        }
                       else
                        {
                         _14=model;
                        }
                       _12=_14;
                      }
                     else
                      {
                       if(message.$==9)
                        {
                         msg3=message.$0;
                         action=function(f)
                         {
                          return f(msg3);
                         };
                         option=model.treeViewProcessorO;
                         Option.iter(action,option);
                         _12=model;
                        }
                       else
                        {
                         if(message.$==10)
                          {
                           msg4=message.$0;
                           if(msg4.$==0)
                            {
                             b=msg4.$1;
                             a=msg4.$0;
                             arg02={
                              $:0,
                              $0:a,
                              $1:b
                             };
                             message3={
                              $:6,
                              $0:arg02
                             };
                             _15=UploadForm.update(message3,model);
                            }
                           else
                            {
                             if(msg4.$==1)
                              {
                               f1=msg4.$0;
                               treeViewProcessorO={
                                $:1,
                                $0:f1
                               };
                               _15={
                                form:model.form,
                                dialog:model.dialog,
                                popup:model.popup,
                                treeViewProcessorO:treeViewProcessorO,
                                relationsCallback:model.relationsCallback,
                                folders:model.folders,
                                files:model.files,
                                sortBy:model.sortBy,
                                uploadName:model.uploadName,
                                uploadFolder:model.uploadFolder,
                                themeTags:model.themeTags,
                                showDialog:model.showDialog,
                                client:model.client,
                                lastUpload:model.lastUpload
                               };
                              }
                             else
                              {
                               if(msg4.$==3)
                                {
                                 node=msg4.$0;
                                 action1=function(f)
                                 {
                                  return f(Rop1.succeed(node));
                                 };
                                 option1=model.relationsCallback;
                                 Option.iter(action1,option1);
                                 relationsCallback={
                                  $:0
                                 };
                                 _15={
                                  form:model.form,
                                  dialog:model.dialog,
                                  popup:model.popup,
                                  treeViewProcessorO:model.treeViewProcessorO,
                                  relationsCallback:relationsCallback,
                                  folders:model.folders,
                                  files:model.files,
                                  sortBy:model.sortBy,
                                  uploadName:model.uploadName,
                                  uploadFolder:model.uploadFolder,
                                  themeTags:model.themeTags,
                                  showDialog:model.showDialog,
                                  client:model.client,
                                  lastUpload:model.lastUpload
                                 };
                                }
                               else
                                {
                                 msg4.$0;
                                 _15=model;
                                }
                              }
                            }
                           _12=_15;
                          }
                         else
                          {
                           if(message.$==11)
                            {
                             callback=message.$0;
                             relationsCallback1={
                              $:1,
                              $0:callback
                             };
                             _12={
                              form:model.form,
                              dialog:model.dialog,
                              popup:model.popup,
                              treeViewProcessorO:model.treeViewProcessorO,
                              relationsCallback:relationsCallback1,
                              folders:model.folders,
                              files:model.files,
                              sortBy:model.sortBy,
                              uploadName:model.uploadName,
                              uploadFolder:model.uploadFolder,
                              themeTags:model.themeTags,
                              showDialog:model.showDialog,
                              client:model.client,
                              lastUpload:model.lastUpload
                             };
                            }
                           else
                            {
                             f2=message.$0;
                             _12=f2(model);
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
      }
     return _12;
    }
   },
   UserFormClient:{
    init:function(title,user,clients,languages)
    {
     return{
      form:GenForm.init(title),
      dialog:Dialog.init(),
      popup:Popup.init(),
      user:user,
      clients:clients,
      languages:languages
     };
    },
    runApp_:function(token,container,initModel)
    {
     var globalProcessor,setGlobalProcessor_,processMessages,showProcessing,showCompleted,saveData_,view,update,app;
     globalProcessor=[{
      $:0
     }];
     setGlobalProcessor_=function(processMsg)
     {
      return globalProcessor[0].$==0?void(globalProcessor[0]=processMsg):null;
     };
     processMessages=function(msg)
     {
      var mapping,option,value;
      mapping=function(f)
      {
       return f(msg);
      };
      option=globalProcessor[0];
      value=Option.map(mapping,option);
      return;
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
       $:0,
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
       $:0,
       $0:arg01
      });
     };
     saveData_=function(model)
     {
      return function()
      {
       var set,_,_builder_,source,x,_2,_3;
       set=model.form.validations;
       if(set.get_Count()===0)
        {
         _builder_=Server.call();
         _=_builder_.Delay(function()
         {
          showProcessing("saving...");
          return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:3",[token,model.user]),function(_arg1)
          {
           var result,guest,arg0,_1;
           result=_arg1[1];
           guest=_arg1[0];
           showCompleted(result);
           arg0={
            $:2,
            $0:false
           };
           processMessages({
            $:0,
            $0:arg0
           });
           if(guest)
            {
             window.location.reload();
             _1=_builder_.Zero();
            }
           else
            {
             _1=_builder_.Zero();
            }
           return _1;
          });
         });
        }
       else
        {
         source=model.form.validations;
         x=Seq.toArray(source);
         _2=function(_1)
         {
          return _1.$==1?"PathValidation ("+PrintfHelpers.printList(function(_4)
          {
           return PrintfHelpers.prettyPrint(_4);
          },_1.$0)+", "+_3(_1.$1)+")":"InputValidation "+_3(_1.$0);
         };
         _3=function(_1)
         {
          return _1.$==4?"VPatternNotMatch ("+PrintfHelpers.prettyPrint(_1.$0)+", "+PrintfHelpers.prettyPrint(_1.$1)+")":_1.$==3?"VUnsupportedData "+PrintfHelpers.prettyPrint(_1.$0):_1.$==2?"VCannotModify":_1.$==1?"VNotLongerThan "+PrintfHelpers.prettyPrint(_1.$0):"VEmpty";
         };
         _=showCompleted("cannot save: "+PrintfHelpers.printArray(function(_1)
         {
          return _2(_1);
         },x));
        }
       return _;
      };
     };
     view=function(model)
     {
      return function(processMessages1)
      {
       var buttons,content,buttons1,content1,model1,processMessages2,menuItems,model2,processMessages3,_arg1,array,_,arg0,model3,processMessages4;
       setGlobalProcessor_({
        $:1,
        $0:processMessages1
       });
       buttons=List.ofArray([["Save","btn    btn-default  pull-right",saveData_(model)]]);
       buttons1=Runtime.New(T,{
        $:0
       });
       content1=Runtime.New(T,{
        $:0
       });
       model1=model.dialog;
       processMessages2=function(msg)
       {
        return processMessages1({
         $:1,
         $0:msg
        });
       };
       menuItems=List.ofArray([["-",function(x)
       {
        return x;
       }]]);
       model2=model.popup;
       processMessages3=function(msg)
       {
        return processMessages1({
         $:2,
         $0:msg
        });
       };
       _arg1=model.user.name;
       array=model.clients;
       if(array.length>1)
        {
         arg0=String(model.user.currentClient);
         _=Fields.selectWoValidator("Current client",{
          $:1,
          $0:arg0
         },function(x)
         {
          return processMessages1({
           $:7,
           $0:x
          });
         },model.clients,Runtime.New(T,{
          $:0
         }));
        }
       else
        {
         _={
          $:6
         };
        }
       content=List.ofArray([Dialog.view("title",buttons1,content1,model1,processMessages2),Popup.view(menuItems,model2,processMessages3),Fields.textNotEmpty("Name",Option1.defaultV("",_arg1),function(x)
       {
        return processMessages1({
         $:4,
         $0:x
        });
       },List.ofArray([ReactHtml.Placeholder("enter name"),ReactHtml.MaxLength(150)]),model.form.validations,function(x)
       {
        return processMessages1({
         $:0,
         $0:x
        });
       }),Fields.textWValidator("Email",model.user.email,function(x)
       {
        return processMessages1({
         $:5,
         $0:x
        });
       },List.ofArray([ReactHtml.Placeholder("enter email"),ReactHtml.MaxLength(200),ReactHtml.Type("email")]),model.form.validations,function(x)
       {
        return processMessages1({
         $:0,
         $0:x
        });
       },function(v)
       {
        return Fields.op_PlusPlus(function(email)
        {
         return Fields.validateEmail_(email);
        },function(v1)
        {
         return Fields.validateEmpty_(v1);
        },v);
       }),_,ReactHtml.Div(List.ofArray([ReactHtml.Class("flex-row flexgrow"),Fields.textWoValidator("Theme",model.user.themeTags,function(x)
       {
        return processMessages1({
         $:6,
         $0:x
        });
       },List.ofArray([ReactHtml.Placeholder("enter tags"),ReactHtml.MaxLength(150)])),Fields.selectWoValidator("Language",model.user.language,function(x)
       {
        return processMessages1({
         $:8,
         $0:x
        });
       },model.languages,Runtime.New(T,{
        $:0
       }))]))]);
       model3=model.form;
       processMessages4=function(msg)
       {
        return processMessages1({
         $:0,
         $0:msg
        });
       };
       return GenForm.view(buttons,content,model3,processMessages4);
      };
     };
     update=function(message)
     {
      return function(model)
      {
       return UserFormClient.update(message,model);
      };
     };
     app=App.app(initModel,update,view);
     return App.run(container,app);
    },
    showForm_:function(title)
    {
     return Browser.withContainerDo("flex flexgrow",function(container)
     {
      var _builder_;
      _builder_=Server.call();
      return _builder_.Delay(function()
      {
       return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:17",[]),function(_arg1)
       {
        return _builder_.Bind(AjaxRemotingProvider.Async("CIPHERPrototype2:2",[_arg1]),function(_arg2)
        {
         var userR,languages,clients,container1,initModel;
         userR=_arg2[0];
         languages=_arg2[2];
         clients=_arg2[1];
         container1=container.Dom;
         initModel=UserFormClient.init(title,userR,clients,languages);
         UserFormClient.runApp_(_arg1,container1,initModel);
         return _builder_.Zero();
        });
       });
      });
     });
    },
    update:function(message,model)
    {
     var _,clo1,_7,msg,popup,msg1,dialog,f,v,inputRecord,user,v1,inputRecord1,user1,v2,inputRecord2,user2,v3,inputRecord3,user3,v4,inputRecord4,language,user4,msg2;
     if(model.form.debug)
      {
       clo1=function(_1)
       {
        var s,_2,_3,_4,_5;
        _2=function(_6)
        {
         return _6.$==8?"LanguageChange "+PrintfHelpers.prettyPrint(_6.$0):_6.$==7?"ClientChange "+PrintfHelpers.prettyPrint(_6.$0):_6.$==6?"ThemeChange "+PrintfHelpers.prettyPrint(_6.$0):_6.$==5?"EMailChange "+PrintfHelpers.prettyPrint(_6.$0):_6.$==4?"NameChange "+PrintfHelpers.prettyPrint(_6.$0):_6.$==3?"DoAction "+PrintfHelpers.prettyPrint(_6.$0):_6.$==2?"ToPopupMsg "+_5(_6.$0):_6.$==1?"ToDialogMsg "+_4(_6.$0):"ToFormMsg "+_3(_6.$0);
        };
        _3=function(_6)
        {
         return _6.$==3?"SetDebug "+PrintfHelpers.prettyPrint(_6.$0):_6.$==2?"SetModified "+PrintfHelpers.prettyPrint(_6.$0):_6.$==1?"AddValidation ("+PrintfHelpers.prettyPrint(_6.$0)+", "+PrintfHelpers.prettyPrint(_6.$1)+")":"ShowInfo ("+PrintfHelpers.prettyPrint(_6.$0)+", "+PrintfHelpers.prettyPrint(_6.$1)+")";
        };
        _4=function(_6)
        {
         return"ShowDialog "+PrintfHelpers.prettyPrint(_6.$0);
        };
        _5=function(_6)
        {
         return _6.$==2?"HidePopUp":_6.$==1?"AdjustBase ("+PrintfHelpers.prettyPrint(_6.$0)+", "+PrintfHelpers.prettyPrint(_6.$1)+")":"ShowPopUp ("+PrintfHelpers.prettyPrint(_6.$0)+", "+PrintfHelpers.prettyPrint(_6.$1)+")";
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
     if(message.$==2)
      {
       msg=message.$0;
       popup=Popup.update(msg,model.popup);
       _7={
        form:model.form,
        dialog:model.dialog,
        popup:popup,
        user:model.user,
        clients:model.clients,
        languages:model.languages
       };
      }
     else
      {
       if(message.$==1)
        {
         msg1=message.$0;
         dialog=Dialog.update(msg1,model.dialog);
         _7={
          form:model.form,
          dialog:dialog,
          popup:model.popup,
          user:model.user,
          clients:model.clients,
          languages:model.languages
         };
        }
       else
        {
         if(message.$==3)
          {
           f=message.$0;
           _7=f(model);
          }
         else
          {
           if(message.$==4)
            {
             v=message.$0;
             inputRecord=model.user;
             user={
              name:{
               $:1,
               $0:v
              },
              email:inputRecord.email,
              language:inputRecord.language,
              currentClient:inputRecord.currentClient,
              themeTags:inputRecord.themeTags
             };
             _7={
              form:GenForm.update({
               $:2,
               $0:true
              },model.form),
              dialog:model.dialog,
              popup:model.popup,
              user:user,
              clients:model.clients,
              languages:model.languages
             };
            }
           else
            {
             if(message.$==5)
              {
               v1=message.$0;
               inputRecord1=model.user;
               user1={
                name:inputRecord1.name,
                email:v1,
                language:inputRecord1.language,
                currentClient:inputRecord1.currentClient,
                themeTags:inputRecord1.themeTags
               };
               _7={
                form:GenForm.update({
                 $:2,
                 $0:true
                },model.form),
                dialog:model.dialog,
                popup:model.popup,
                user:user1,
                clients:model.clients,
                languages:model.languages
               };
              }
             else
              {
               if(message.$==6)
                {
                 v2=message.$0;
                 inputRecord2=model.user;
                 user2={
                  name:inputRecord2.name,
                  email:inputRecord2.email,
                  language:inputRecord2.language,
                  currentClient:inputRecord2.currentClient,
                  themeTags:v2
                 };
                 _7={
                  form:GenForm.update({
                   $:2,
                   $0:true
                  },model.form),
                  dialog:model.dialog,
                  popup:model.popup,
                  user:user2,
                  clients:model.clients,
                  languages:model.languages
                 };
                }
               else
                {
                 if(message.$==7)
                  {
                   v3=message.$0;
                   inputRecord3=model.user;
                   user3={
                    name:inputRecord3.name,
                    email:inputRecord3.email,
                    language:inputRecord3.language,
                    currentClient:v3,
                    themeTags:inputRecord3.themeTags
                   };
                   _7={
                    form:GenForm.update({
                     $:2,
                     $0:true
                    },model.form),
                    dialog:model.dialog,
                    popup:model.popup,
                    user:user3,
                    clients:model.clients,
                    languages:model.languages
                   };
                  }
                 else
                  {
                   if(message.$==8)
                    {
                     v4=message.$0;
                     inputRecord4=model.user;
                     language={
                      $:1,
                      $0:v4
                     };
                     user4={
                      name:inputRecord4.name,
                      email:inputRecord4.email,
                      language:language,
                      currentClient:inputRecord4.currentClient,
                      themeTags:inputRecord4.themeTags
                     };
                     _7={
                      form:GenForm.update({
                       $:2,
                       $0:true
                      },model.form),
                      dialog:model.dialog,
                      popup:model.popup,
                      user:user4,
                      clients:model.clients,
                      languages:model.languages
                     };
                    }
                   else
                    {
                     msg2=message.$0;
                     _7={
                      form:GenForm.update(msg2,model.form),
                      dialog:model.dialog,
                      popup:model.popup,
                      user:model.user,
                      clients:model.clients,
                      languages:model.languages
                     };
                    }
                  }
                }
              }
            }
          }
        }
      }
     return _7;
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
     var _,_1,ms,arg0,_2,a,a1,ms1,matchValue,_3,_4,m2,arg01,_5,b,arg02,b1,m21,arg03,ab,arg04,arb,arg05,b2,arg06,aa,arg07,ara,arg08,a3;
     if(wa.$==0)
      {
       if(wa.$0.$==1)
        {
         ms=wa.$0.$0;
         arg0={
          $:1,
          $0:ms
         };
         _1={
          $:0,
          $0:arg0
         };
        }
       else
        {
         if(wa.$0.$1.$==0)
          {
           a=wa.$0.$0;
           _2=f(a);
          }
         else
          {
           a1=wa.$0.$0;
           ms1=wa.$0.$1;
           matchValue=f(a1);
           if(matchValue.$==0)
            {
             if(matchValue.$0.$==1)
              {
               m2=matchValue.$0.$0;
               arg01={
                $:1,
                $0:List.append(ms1,m2)
               };
               _4={
                $:0,
                $0:arg01
               };
              }
             else
              {
               if(matchValue.$0.$1.$==0)
                {
                 b=matchValue.$0.$0;
                 arg02={
                  $:0,
                  $0:b,
                  $1:ms1
                 };
                 _5={
                  $:0,
                  $0:arg02
                 };
                }
               else
                {
                 b1=matchValue.$0.$0;
                 m21=matchValue.$0.$1;
                 arg03={
                  $:0,
                  $0:b1,
                  $1:List.append(ms1,m21)
                 };
                 _5={
                  $:0,
                  $0:arg03
                 };
                }
               _4=_5;
              }
             _3=_4;
            }
           else
            {
             if(matchValue.$==1)
              {
               ab=matchValue.$0;
               arg04=Concurrency.Delay(function()
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
               _3={
                $:2,
                $0:arg04
               };
              }
             else
              {
               if(matchValue.$==2)
                {
                 arb=matchValue.$0;
                 arg05=Concurrency.Delay(function()
                 {
                  return Concurrency.Bind(arb,function(_arg2)
                  {
                   return Concurrency.Return(Rop1.mergeMessages(ms1,_arg2));
                  });
                 });
                 _3={
                  $:2,
                  $0:arg05
                 };
                }
               else
                {
                 b2=matchValue.$0;
                 arg06={
                  $:0,
                  $0:b2,
                  $1:ms1
                 };
                 _3={
                  $:0,
                  $0:arg06
                 };
                }
              }
            }
           _2=_3;
          }
         _1=_2;
        }
       _=_1;
      }
     else
      {
       if(wa.$==1)
        {
         aa=wa.$0;
         arg07=Concurrency.Delay(function()
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
          $0:arg07
         };
        }
       else
        {
         if(wa.$==2)
          {
           ara=wa.$0;
           arg08=Concurrency.Delay(function()
           {
            return Concurrency.Bind(ara,function(_arg4)
            {
             var arb1,_6,ms2,ms3,a2,_arg1;
             if(_arg4.$==1)
              {
               ms2=_arg4.$0;
               _6=Concurrency.Delay(function()
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
               a2=_arg4.$0;
               _arg1=f(a2);
               _6=ARop.wb2arb(ms3,_arg1);
              }
             arb1=_6;
             return arb1;
            });
           });
           _={
            $:2,
            $0:arg08
           };
          }
         else
          {
           a3=wa.$0;
           _=f(a3);
          }
        }
      }
     return _;
    },
    call:function(wb)
    {
     var _,rb,ab,arb;
     if(wb.$==0)
      {
       rb=wb.$0;
       _=Rop1.notifyMessages(rb);
      }
     else
      {
       if(wb.$==1)
        {
         ab=wb.$0;
         _=Concurrency.StartWithContinuations(ab,function()
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
       else
        {
         if(wb.$==2)
          {
           arb=wb.$0;
           _=Concurrency.StartWithContinuations(arb,function(R1)
           {
            return Rop1.notifyMessages(R1);
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
         else
          {
           _=null;
          }
        }
      }
     return _;
    },
    wb2arb:function(ms,_arg1)
    {
     var _,b,arb,rb,ab;
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
     return _;
    },
    wrap:Runtime.Field(function()
    {
     return Builder.New();
    })
   },
   Option:{
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
       return _8.$==29?"ErrGuestUserNotActivated":_8.$==28?"ErrAleaError ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.prettyPrint(_8.$1)+")":_8.$==27?"ErrNoRecordsProcessed":_8.$==26?"ErrUnsuportedDataStorage":_8.$==25?"ErrWebSharperCompiler "+PrintfHelpers.prettyPrint(_8.$0):_8.$==24?"ErrFSharpCompiler "+PrintfHelpers.prettyPrint(_8.$0):_8.$==23?"ErrFeatureNotImplemented "+PrintfHelpers.prettyPrint(_8.$0):_8.$==22?"ErrRecordNotFound ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.prettyPrint(_8.$1)+")":_8.$==21?"ErrRecordWasNotUpdated "+PrintfHelpers.prettyPrint(_8.$0):_8.$==20?"ErrDockerIsNotPresent "+_4(_8.$0):_8.$==19?"ErrObjectNotFound "+_7(_8.$0):_8.$==18?"ErrNoProvisionedClientAvailable":_8.$==17?"ErrClientNotFound "+_6(_8.$0):_8.$==16?"ErrUserIsNotDefined "+PrintfHelpers.prettyPrint(_8.$0):_8.$==15?"ErrUserIsNotAssociatedToClient "+_5(_8.$0):_8.$==14?"ErrDockerDataNotFound "+_4(_8.$0):_8.$==13?"ErrUniqueIdNotDefinedForReport "+_1(_8.$0):_8.$==12?"ErrDockerDefinitionNotFound "+_4(_8.$0):_8.$==11?"ErrTableDefinitionNotFound "+_2(_8.$0):_8.$==10?"ErrReportDefinitionNotFound "+_1(_8.$0):_8.$==9?"ErrInvalidContentPageForClient "+PrintfHelpers.prettyPrint(_8.$0):_8.$==8?"ErrInvalidToken "+PrintfHelpers.prettyPrint(_8.$0):_8.$==7?"ErrLoginFailed "+PrintfHelpers.prettyPrint(_8.$0):_8.$==6?"ErrUserIsNotLoggedIn":_8.$==5?"ErrValueIsNull ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.prettyPrint(_8.$1)+")":_8.$==4?"ErrParameterMissing "+PrintfHelpers.prettyPrint(_8.$0):_8.$==3?"ErrDuplicatedKeys ("+PrintfHelpers.prettyPrint(_8.$0)+", "+PrintfHelpers.printArray(function(_9)
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
          _1=Operators1.Raise(MatchFailureException.New("D:\\Abe\\CIPHERWorkspace\\CipherSpace\\CIPHERPrototype2\\Rop.fs",194,69));
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
  React=Runtime.Safe(Global.React);
  CIPHERPrototype1=Runtime.Safe(Global.CIPHERPrototype1);
  ClientForm=Runtime.Safe(CIPHERPrototype1.ClientForm);
  Browser=Runtime.Safe(CIPHERPrototype1.Browser);
  AboutForm=Runtime.Safe(CIPHERPrototype1.AboutForm);
  List=Runtime.Safe(Global.WebSharper.List);
  T=Runtime.Safe(List.T);
  ReactHtml=Runtime.Safe(CIPHERPrototype1.ReactHtml);
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Attr=Runtime.Safe(Client.Attr);
  Tags=Runtime.Safe(Client.Tags);
  Server=Runtime.Safe(CIPHERPrototype1.Server);
  PrintfHelpers=Runtime.Safe(Global.WebSharper.PrintfHelpers);
  Rop=Runtime.Safe(Global.Rop);
  Rop1=Runtime.Safe(Rop.Rop);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  window=Runtime.Safe(Global.window);
  EventsPervasives=Runtime.Safe(Client.EventsPervasives);
  Operators=Runtime.Safe(Client.Operators);
  document=Runtime.Safe(Global.document);
  String=Runtime.Safe(Global.String);
  SlickGrid=Runtime.Safe(CIPHERPrototype1.SlickGrid);
  Unchecked=Runtime.Safe(Global.WebSharper.Unchecked);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  Arrays=Runtime.Safe(Global.WebSharper.Arrays);
  Option=Runtime.Safe(Global.WebSharper.Option);
  Model2=Runtime.Safe(CIPHERPrototype1.Model2);
  FieldDefinition=Runtime.Safe(Model2.FieldDefinition);
  Strings=Runtime.Safe(Global.WebSharper.Strings);
  Collections=Runtime.Safe(Global.WebSharper.Collections);
  FSharpSet=Runtime.Safe(Collections.FSharpSet);
  BalancedTree=Runtime.Safe(Collections.BalancedTree);
  ReactDOM=Runtime.Safe(Global.ReactDOM);
  SetModule=Runtime.Safe(Collections.SetModule);
  Validation=Runtime.Safe(Model2.Validation);
  R=Runtime.Safe(CIPHERPrototype1.R);
  RegExp=Runtime.Safe(Global.RegExp);
  GenForm=Runtime.Safe(CIPHERPrototype1.GenForm);
  Dialog=Runtime.Safe(CIPHERPrototype1.Dialog);
  Popup=Runtime.Safe(CIPHERPrototype1.Popup);
  Slick=Runtime.Safe(Global.Slick);
  Fields=Runtime.Safe(CIPHERPrototype1.Fields);
  Option1=Runtime.Safe(Rop.Option);
  ClientFormClient=Runtime.Safe(CIPHERPrototype1.ClientFormClient);
  App=Runtime.Safe(CIPHERPrototype1.App);
  console=Runtime.Safe(Global.console);
  CubeOlapForm=Runtime.Safe(CIPHERPrototype1.CubeOlapForm);
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  FileReader=Runtime.Safe(Global.FileReader);
  DckDockSpawn=Runtime.Safe(CIPHERPrototype1.DckDockSpawn);
  dockspawn=Runtime.Safe(Global.dockspawn);
  DckGoldenLayout=Runtime.Safe(CIPHERPrototype1.DckGoldenLayout);
  GoldenLayout=Runtime.Safe(Global.GoldenLayout);
  JSON=Runtime.Safe(Global.JSON);
  DckPhosphor=Runtime.Safe(CIPHERPrototype1.DckPhosphor);
  phosphorDockPanel=Runtime.Safe(Global.phosphorDockPanel);
  phosphorWidget=Runtime.Safe(Global.phosphorWidget);
  DckSingle=Runtime.Safe(CIPHERPrototype1.DckSingle);
  jQuery=Runtime.Safe(Global.jQuery);
  DckWCDocker=Runtime.Safe(CIPHERPrototype1.DckWCDocker);
  wcDocker=Runtime.Safe(Global.wcDocker);
  DimModel=Runtime.Safe(CIPHERPrototype1.DimModel);
  Seq1=Runtime.Safe(Global.Seq);
  Lazy=Runtime.Safe(Global.WebSharper.Lazy);
  ARop=Runtime.Safe(Rop.ARop);
  Layouts=Runtime.Safe(CIPHERPrototype1.Layouts);
  DimensionForm=Runtime.Safe(CIPHERPrototype1.DimensionForm);
  Slice=Runtime.Safe(Global.WebSharper.Slice);
  parseInt=Runtime.Safe(Global.parseInt);
  DataView=Runtime.Safe(SlickGrid.DataView);
  FancyTree=Runtime.Safe(CIPHERPrototype1.FancyTree);
  $=Runtime.Safe(Global.$);
  LoginForm=Runtime.Safe(CIPHERPrototype1.LoginForm);
  MenuBar=Runtime.Safe(CIPHERPrototype1.MenuBar);
  SearchFlickr=Runtime.Safe(CIPHERPrototype1.SearchFlickr);
  Model=Runtime.Safe(CIPHERPrototype1.Model);
  Language=Runtime.Safe(Model.Language);
  User=Runtime.Safe(Model.User);
  ObjectT=Runtime.Safe(Model.ObjectT);
  Control=Runtime.Safe(Global.WebSharper.Control);
  MailboxProcessor=Runtime.Safe(Control.MailboxProcessor);
  Impure=Runtime.Safe(SearchFlickr.Impure);
  callServerBuilder=Runtime.Safe(Server.callServerBuilder);
  RowT=Runtime.Safe(SlickGrid.RowT);
  Operators1=Runtime.Safe(Global.WebSharper.Operators);
  Enumerator=Runtime.Safe(Global.WebSharper.Enumerator);
  setTimeout=Runtime.Safe(Global.setTimeout);
  TestFS=Runtime.Safe(CIPHERPrototype1.TestFS);
  UploadForm=Runtime.Safe(CIPHERPrototype1.UploadForm);
  UserFormClient=Runtime.Safe(CIPHERPrototype1.UserFormClient);
  Builder=Runtime.Safe(ARop.Builder);
  ropBuilder=Runtime.Safe(Rop1.ropBuilder);
  alert=Runtime.Safe(Global.alert);
  return MatchFailureException=Runtime.Safe(Global.WebSharper.MatchFailureException);
 });
 Runtime.OnLoad(function()
 {
  Rop1.flow();
  ARop.wrap();
  SlickGrid.gridOptions();
  Server.call();
  SearchFlickr.srcs();
  SearchFlickr.mediaUrl();
  SearchFlickr.init();
  ReactHtml.addAttributes();
  ReactHtml.addAttribute();
  Popup.init();
  DimModel.init();
  Dialog.init();
  DckWCDocker.savedLayout();
  DckWCDocker.globalDocker();
  DckSingle.globalPanels();
  DckSingle.globalDocker();
  DckPhosphor.globalPanels();
  DckPhosphor.globalDocker();
  DckGoldenLayout.savedLayout();
  DckGoldenLayout.globalDocker();
  DckDockSpawn.globalPanels();
  DckDockSpawn.globalDocker();
  Browser.registerMouseEvents();
  Browser.mouseStatus();
  Browser.instance();
  Browser.globalToken();
  return;
 });
}());
