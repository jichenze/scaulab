define(["jquery"],function(){
	
	return {
		
		load:function($el,scope,handler){
			
//公有变量定义
			var configArr=[],					//从后台获得的json数据
				pageId,							//已有的项目的id
				itemName,						//项目名称
				editName,						//编辑菜单时保存的原项目名,用于inputComplete事件中
				db,								//taffy用的数据库
				rows,							//traffy用的行
				tuples,							//traffy用的元组
				temp,							//获取模板的dom对象
				$temp,							//获取模板的$对象		
				$itemBottom;					//获取正在编辑的对象的名字文本,在编辑完成后更新它
			
//公有函数定义
			function editInputComplete(val){   //修改项目名称
				
				itemName=val;   //获取设置的用户名
				
				if(!itemName){											  //完成时名字不能为空,否则返回,下面不执行
					app.alert("项目名称不能为空");
					$('[data-role="defItemNameInput"]',$temp).focus();
					return
				}
			
				var noSame=true;							//判断是否有重名
				db().each(function(tuple){
					
					if(itemName==tuple.name&&itemName!=editName){	//不能与其他项目重名,与原名也不同,则提示且停止遍历
				   
							app.alert("此名称已有项目使用，修改失败");
							noSame=false;
							return
					}
				});
				if(noSame==true){				//没有重名则执行
					
					$.ajax({
		                url:'./CamaComponentPagesAction_create.do',
		                data:{
		                    id:db({
								"name":editName
							}).first().id,
		                    name:itemName
		                },
		                type:'POST',
		                contentType:'application/x-www-form-urlencoded;charset=utf-8',
		                dataType:'json',
		                shelter:'正在修改，请稍侯…',
		                success:function(data){
		                    if(data.status){
		                        
		                        db({
									"name":editName
								}).update({
									"name":itemName
								});
								$itemBottom.text(itemName); 
		                        
		                    }else{
		                        app.alert('添加CAMA组件页面错误',data.errorMsg,app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
		                    }
		                }
					});
				}
			}
			function inputComplete(){		//新建项目
				
				itemName=$('[data-role="defItemNameInput"]',$el).val();   //获取设置的用户名
				if(!itemName){											  //完成时名字不能为空,否则返回,下面不执行
					app.alert("项目名称不能为空");
					$('[data-role="defItemNameInput"]',$temp).focus();
					return
				}

					$.ajax({				//新建数据
		                url:'./CamaComponentPagesAction_create.do',
		                type:'POST',
		                contentType:'application/x-www-form-urlencoded;charset=utf-8',
		                dataType:'json',
		                shelter:'正在新建项目，请稍侯…',
		                data:{
		                    name:itemName,
		                    config:"{}",
		                },
		                success:function(data){
		                    if(data.status){
		                    	
		                    	pageId=data.content.id;
		                        
		                        $("#defModal").modal("hide");
							  
		                        temp=$("#defTemp").html();
								
								temp=temp.replace(/_name_/,itemName);
								temp=temp.replace(/_id_/,pageId);
								$temp=$(temp);
								
								$("#defCtn",$el).append($temp[0]);
		                        
		                        db.insert({												//将新项目信息更新进db
								"id":pageId,
								"name":itemName
							});
							
		                        app.domain.exports("afaDefine",{"newpage":{
		    						"id":pageId,
		    						"name":itemName
		    					}});			        //将pageId发送给board
		                      
		                        app.dispatcher.load({
								    title:itemName,
								    moduleId:"afaDefine",
								    section:"board",
								    id:pageId,
								});
		                    }else{
		                        app.alert('添加CAMA组件页面错误',data.errorMsg,app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
		                    }
		                }
		            });
			};
			
			
//数据加载
			//后台获取数据并create
			$.ajax({
                url:'./CamaComponentPagesAction_queryList.do',
                success:function(data){
                    if(data.status){
                    	configArr=data.content.aaData;
                    	
                    	db=app.taffy();
                    	if(configArr.length!=0){			//如果有数据开始加载
                    		
                    		for(var i=0,length=configArr.length;i<length;i++){
                    			
                    			db.insert({
                					id:configArr[i][0],
                					name:configArr[i][1],
	                    			createUser:configArr[i][2],
	                    			createTime:configArr[i][3],
                    			});
                    			
                    		}
    			
    						if(db().count){
    							
    							db().each(function(tuple,index){
    								itemName=tuple.name;
    								pageId=tuple.id;
    								
    								temp=$("#defTemp").html()
    								
    								temp=temp.replace(/_name_/,itemName);
    								temp=temp.replace(/_id_/,pageId);
    								$temp=$(temp);
    								
    								$("#defCtn",$el).append($temp[0]);
    							});
    						}
    							$('[data-role="defTip"]').hide();
    				}
                    }else{
                        app.alert('查找CAMA组件页面错误',data.errorMsg,app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
                    }
                }
            });
			
			
//事件绑定监听
		this.delegateEvents({
			"click #defAddBox":function(){								   //新建项目
				
				$("#defModalBody",$el).empty();
				$temp=$($('[data-role="defItemMenuTemp"]',$el).html());
				$("#defModalBody",$el).append($temp);
				isEdit=false;			//非编辑状态,即新建
			},
			"click #defModal":function(e){							        //新建项目完成按钮
				
				var $elem=$(e.target||window.event.srcElement);
				if($elem.closest("#itemNameSubmit").length){
					
					inputComplete();
				};
			},
			"click #defCtn":function(e){
				
				var $elem=$(e.target||window.event.srcElement),
					$ctt=$elem.closest('[data-role="defCtt"]');
				
				if($ctt.length&&!$elem.closest('[data-role="defItemInput"]').length){		//点击项目
				
					if($elem.closest('[data-role="defTipDel"]').length){		//删除事件
						
						//保存确认框
						app.confirm({
							title:'确认',
							content:'确认删除项目吗?',
							btnConfirm:'是',
							btnCancel:'否',
							confirmHandler:function(){
								
								pageId=$ctt.attr("id");
								
								db({
									"id":pageId
								}).remove();
								
								$ctt.remove();
						
								var ids=[pageId].join(',');
								$.ajax({
					                url:'./CamaComponentPagesAction_delete.do',
					                type:'POST',
					                contentType:'application/x-www-form-urlencoded;charset=utf-8',
					                dataType:'json',
					                data:{
					                    id:ids
					                },
					                success:function(data){
					                    if(data.status){
					                    	
					                        for(var results=data.content.aaData,l=results.length,r;r=(results[--l]);){
					                        
					                            if(r.successMsg){
					                                app.alert('删除CAMA组件页面成功', r.successMsg,app.alertShowType.SUCCESS,app.alertMsgType.TIPS);
					                            
					                            }else{
					                                app.alert('删除CAMA组件页面失败', r.errorMsg,app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
					                            }
					                          //关闭已打开的公共配置详细窗口
		                                        if (r.successID)
		                                        	app.tab.close("", r.successID);
					                        	}
					                    }else{
					                        app.alert('删除CAMA组件页面错误',data.errorMsg,app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
					                    }
					                }
					            });
								
							},
							cancelHandler:function(h,g){
								
							},
				
						});
						return
					}else if($elem.closest('[data-role="defItemNameEdit"]').length){		//编辑项目信息
						
						$('[data-role="defItem1"]',$ctt).addClass("hide");
						$('[data-role="defItem2"]',$ctt).removeClass("hide");
						
						itemName=db({			
							"id":$ctt.attr("id")
						}).select("name")[0];
						
						$('[data-role="defItemInput"]',$ctt)
						.focus()
						.val(itemName);			//将相应项目的名字写入输入框
						
						return
					}else if($elem.closest('[data-role="defItem2Edit"]').length){			//编辑项目信息完成
						
						
						if($elem.closest('[data-role="defItemNameEditOK"]').length){
							
							editName=itemName;		//传入项目原名
							
							$itemBottom=$('[data-role="defItemName"]',$elem.closest('[data-role="defCtt"]'));
							
							editInputComplete($('[data-role="defItemInput"]',$ctt).val());
							
						}
						
						$('[data-role="defItem1"]',$ctt).removeClass("hide");
						$('[data-role="defItem2"]',$ctt).addClass("hide");
						
						return
					}
				
					pageId=$ctt.attr("id");
				
					itemName=db({
						"id":pageId
					}).select("name")[0];
					
					app.domain.exports("afaDefine",{"newpage":{
						"id":pageId,
						"name":itemName
					}});			        //将pageId发送给board
				
					app.dispatcher.load({
					    title:itemName,
					    moduleId:"afaDefine",
					    section:"board",
					    id:pageId,
					});
				}
			},
			"mouseover #defCtn":function(e){									//悬浮项目菜单
				var $elem=$(e.target||window.event.srcElement),
					$defItemBox=$elem.closest('[data-role="defItemBox"]'),		
					$defTip=$('[data-role="defTip"]',$defItemBox);
				
					$defTip.stop().slideDown();
					
					if($elem.closest('[data-role="defItem2Edit"]').length){		//处理blur与click冲突的bug
					
						$('[data-role="defItemInput"]',$el).off("blur");
					}
			},
			"mouseout #defCtn":function(e){										//悬浮项目菜单
				var $elem=$(e.target||window.event.srcElement),
					$defItemBox=$elem.closest('[data-role="defItemBox"]'),		
					$defTip=$('[data-role="defTip"]',$defItemBox);
				
					$defTip.stop().slideUp();
					
					if($elem.closest('[data-role="defItem2Edit"]').length){		//处理blur与click冲突的bug
				
						$('[data-role="defItemInput"]',$el).on("blur",function(){
						
						$('[data-role="defItem1"]',$el).removeClass("hide");
							$('[data-role="defItem2"]',$el).addClass("hide");
						});
					}
			},
		});
			
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});