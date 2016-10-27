define([
        "jquery"
        ],function(){
//公共函数定义
	
	
	function echartDispose(option){			//销毁echart
		
		var monLineEchartsDispose=new app.showData.chartsCollection(option?option:{});
			tableCollectionDispose=new app.showData.tableCollection(option?option:{});
		monLineEchartsDispose && monLineEchartsDispose.dispose();
		tableCollectionDispose && tableCollectionDispose.dispose();
		
	}
	
	
	return {
		
		load:function($el,scope,handler){
			
//公有变量定义
		
		var	
			db,					//taffy用的数据库
		    pageId,				//从afaDefind传过来的id
		    pageName,			//从afaDefind传过来的name
		    config,				//从后台获取跟pageId相匹配的数据
			tempId,				//模板id
			$modal,				//模态框的$对象
			$editModal,			//编辑模态框的$对象
			temp,				//组件模板dom对象
			$temp,				//组件模板$对象
			$ctn;				//实例echart的容器
			
			
//公有函数定义

			function creComponent(){								//创建空白div并设置样式
				
				if(db().get().length>=500){							//组件层最高为500，超过则提示并停止创建组件
					app.alert("已超出本页面最多500个组件");
					return
				}
				
				tempId=app.global.getUniqueId();					//为每一组件设置一个id
				temp=$('[data-role="borEchTemp"]',$el).html();
				temp=temp.replace(/_id_/,tempId);
				$temp=$(temp);     									//获取echart容器模板,存为组件$对象
				$temp.appendTo($("#borCtn",$el));
				$temp.css({
					"left":($el.width()-$temp.width())/2,
					"z-index":500,
					"width":200,
					"height":200,
				});
				var $borTip=$('[data-role="borTip"]',$temp);
				$temp.hover(function(){
					$borTip.stop().slideDown();
				},function(){
					$borTip.stop().slideUp();
				});
				db.insert({							//将新创建的组件信息储存在
					"id":tempId,                           			 
		            "left":$temp.position().left,
		            "top":$temp.position().top,
		            "width":$temp.width(),
		            "height":$temp.height(),
		            "zIndex":$temp.css("z-index"),
		            "urlParams":{
						"system":'',			//系统
						"serve":'',				//服务器
						"pointer":'',			//指针归类
						"classify":'',			//指标
						"showType":'',			//图标类型
						"state":'',				//子类
					},
					"updateTime":"2000"
				});
			};
			function echartStart(urlParams,$box){	//从list.json中获取showData路径并加载，$box为初始化外容器一般为$ctn，style目前有line（折线），pie（饼状）,table(表格)可选
				
				option={
						$context:$box,
						handler:handler,
						selector:'[data-role="borInnerBox"]',//图表外部容器
						urlParams:urlParams,
						updateTime:'2000'				//这里应改为2000
			}
			
			if(urlParams.showType=="table"){
			
				var tableCollection=app.showData.tableCollection(option);
				tableCollection.start();
				$box.resize && $box.off("resize"); 
				$box.resize(function(){		//因为obj.option只能在success内可见，故缩放绑定只能在success内进行
					
					tableCollection.dispose();	//table会叠加，必须start前dispose原来的
					
					$('[data-role="borInnerBox"]',$ctn).empty();
					
					tableCollection.start();
					
					});
				
			
			}else{
			
				var monLineEcharts =app.showData.chartsCollection(option);
				
				if(!db({"id":$box.attr("id")}).select("echartOldObj")[0]){
					db({
						"id":$box.attr("id")
					}).update({
						"echartOldObj":monLineEcharts,
					});
				}
				
				
				monLineEcharts.start();
				
				$box.resize && $box.off("resize"); 
				$box.resize(function(){		//因为obj.option只能在success内可见，故缩放绑定只能在success内进行
					
					db({"id":$box.attr("id")}).select("echartOldObj")[0].dispose();	
					db({
						"id":$box.attr("id")
					}).update({
						"echartOldObj":monLineEcharts,
					});
					
				    monLineEcharts.start();
					});
				
			}
			
			}

       //数据加载		
			
				$("#borCtn",$el).css("height",$el.parent().height());			//保证冒泡绑定时父元素#borCtn可以点击
				
				pageId=app.domain.get("afaDefine","newpage").id;		//获取从afaDefine传过来的pageId
				pageName=app.domain.get("afaDefine","newpage").name;
		
			
				$.ajax({
		                url:'./CamaComponentPagesAction_querySingle.do',
		                data:{
		                    id:pageId
		                },
		                dataType:'json',
		                shelter:'正在读取项目，请稍侯…',
		                contentType: 'application/x-www-form-urlencoded;charset=utf-8',
		                success:function(data){
		                    if(data.status){
		                    	config=data.content.page.config;
		                    	if(!$.isEmptyObject(config)){			//config不为空时才解析config,如果config为空,说明这是新建页面
		        					
		        					db=app.taffy(config);	
		        					
		        					db().each(function(tuple,index){	//读取数据并还原
		        						
		        						temp=$('[data-role="borEchTemp"]',$el).html();
		        						temp=temp.replace(/_id_/,tuple.id);
		        						$temp=$(temp);  
		        						$temp.appendTo($("#borCtn",$el));
		        						$temp.css({
		        								"top":tuple.top,
		        								"left":tuple.left,
		        								"width":tuple.width,
		        								"height":tuple.height,
		        								"z-index":tuple.zIndex,
		        							});	
		        						
		        						if(tuple.urlParams.showType){
			        						echartStart(tuple.urlParams,$temp);
			        						$('[data-role="borConfigSys"]',$temp).text(tuple.urlParams.system);	//设置系统
			        						$('[data-role="borConfigSer"]',$temp).text(tuple.urlParams.serve);	//设置服务器
		        						}
		        						
		        						var $borTip=$('[data-role="borTip"]',$temp);
		        						$borTip.hide();
		        						$temp.hover(function(){
		        							$borTip.stop().slideDown();
		        						},function(){
		        							$borTip.stop().slideUp();
		        						});
		        					});
		        					
		        				}else{
		        					db=app.taffy();
		        				};
		                    
		                    }else{
		                        app.alert('查找CAMA组件页面错误',data.errorMsg,app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
		                    }
		                },
		            });
			
	
				
	
//事件绑定监听
			
			this.delegateEvents({
					"click #borCheck":function(){
					//保存确认框
						app.confirm({
							title:'确认',
							content:'保存将覆盖原有版本,是否继续保存?',
							btnCancel:'否',
							btnConfirm:'是',
							confirmHandler:function(){
								
								//保存本页的id和配置
								db().each(function(tuple,index){
									
										var $obj=$("#"+tuple.id);
										db({
											"id":tuple.id,
										}).update({
											"id":tuple.id,
								            "left":$obj.position().left,
								            "top":$obj.position().top,
								            "width":$obj.width(),
								            "height":$obj.height(),
								            "zIndex":$obj.css("z-index"),
										});
								});
						
								//更新数据
								
						            $.ajax({
						                url:'./CamaComponentPagesAction_create.do',
						                type:'POST',
						                contentType:'application/x-www-form-urlencoded;charset=utf-8',
						                dataType:'json',
						                shelter:'正在保存项目，请稍侯…',
						                data:{
						                    id:pageId,
						                    config:JSON.stringify(db().get())
						                },
						                success:function(data){
						                    if(data.status){
						                        
						                    	app.alert("后台已成功保存");
						                    }else{
						                        app.alert('添加CAMA组件页面错误',data.errorMsg,app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
						                    }
						                }
						            });
								  
							},
							cancelHandler:function(h,g){
								
						
							},
				
						});
					
					},
				"mouseover #borCtn":function(e){
				
				var $elem=$(e.target||window.event.srcElement);
				
				if($elem.closest('[data-role="borBox"]').length){
					
					$elem.closest('[data-role="borBox"]')
						 .draggable({
										containment:$("#borCtn",$el),
										cursor:"move",
						 			})
						 .resizable({
							 			containment:$("#borCtn",$el),
							 			minHeight: 100,
							 		    minWidth: 100,
						 			});
					};
				},
				"mousedown #borCtn":function(e){
					
					var $elem=$(e.target||window.event.srcElement);
					
					if($elem.closest('[data-role="borBox"]').length){
						
						var zIndex=$elem.closest('[data-role="borBox"]').css("z-index");
						$elem.closest('[data-role="borBox"]').css("z-index",500);		//最高层为500
						
						$("[data-role='borBox']",$el).each(function(){
							if($(this).css("z-index")>=zIndex){
								
								$(this).css("z-index",function(key,value){
									return --value;
								});
							}
						});
					}
				},
				"click #borCtn":function(e){
					var $elem=$(e.target||window.event.srcElement);
				
					if($elem.closest("[data-role='borTipDel']").length){			//删除项目
						db({
							"id":$elem.closest("[data-role='borBox']").attr("id"),
						}).remove();
						$elem.closest("[data-role='borBox']").remove();
				
					}else if($elem.closest("[data-role='borTipMenu']").length){		//编辑项目名
						
						$editModal=$("#borEditModal",$el);
						$editModal.modal("show");
						
						$ctn=$elem.closest("[data-role='borBox']");		//把正在选择组件类型的容器传入，后面用做init方法
						
						var urlParams=db({						
							"id":$ctn.attr("id")
						}).select("urlParams")[0];
			
						//还原相应组件的模态框配置
						$('#borEditSysSel',$el).val(urlParams.system);
						$('#borEditSerSel',$el).val(urlParams.serve);
						$('#borEditPoiSel',$el).val(urlParams.pointer);
						$('#borEditClaSel',$el).val(urlParams.classify);
						$('#borEditTypSel',$el).val(urlParams.showType);
						$('#borEditStaSel',$el).val(urlParams.state);
		
					};
				},
				"click #borPlus":function(){
					
					creComponent();				//创建新组件并设定样式
		
				},
				"click #modalOk":function(){
						
					//储存相应组件的模态框配置
					db({
						"id":$ctn.attr("id")
					}).update({
						"urlParams":{
							"system":$('#borEditSysSel',$el).val(),
							"serve":$('#borEditSerSel',$el).val(),
							"pointer":$('#borEditPoiSel').val(),
							"classify":$('#borEditClaSel',$el).val(),
							"showType":$('#borEditTypSel',$el).val(),
							"state":$('#borEditStaSel',$el).val(),
						}
					});
					
					var urlParams=db({"id":$ctn.attr("id")}).select("urlParams")[0];
					
					$('[data-role="borConfigSys"]',$ctn).text(urlParams.system);	//设置系统
					$('[data-role="borConfigSer"]',$ctn).text(urlParams.serve);	//设置服务器
			
					if(urlParams.showType=="table"){
						$('[data-role="borInnerBox"]',$ctn).empty();
					}
					echartStart(urlParams,$ctn);	//设置echart类型
					
				},
			});
			
			

		},
		
		unload:function(handler){
			//echartDispose();
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});