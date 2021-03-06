define([ "jquery" ], function() {
    var feiyeTb,userType,
        feiyeData = {};
    
    function inituseTb($el) {
        //加载实例数据
        return $('#feiyeTb', $el).dataTable({
            'sAjaxSource': './HuishouFeiyeAction_loadAllFeiye.do',
            'bDestroy': true,
            'bStateSave': true,
            "bPaginate": true, //开关，是否显示分页器
            "bInfo": false, //开关，是否显示表格的一些信息
            "aaSorting": [[1, 'desc']],
            'aoColumnDefs': [
                             //多选框禁用排序
                             {"bSortable": false, "aTargets": [0]},
                             {"aTargets":[1],"sClass":"link"}
                         ],
            //使用post方式传递数据
            'fnServerData': function (sSource, aoData, fnCallback) {
                $.ajax({
                    "type": "post",
                    "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                    "url": sSource,
                    "dataType": "json",
                    "data": "",
                    shelter:'正在加载，请稍侯…',
                    success: function (data) {
                    	 var dealData=[],
                         i,items,item;

                     if(data.status&&data.content){
                         for(items=data.content.hsfyData,i=items.length;(item=(items[--i]));) {
                             dealData.push([
                        
									item.huishou_id,
									item.huishou_wpName,
									item.huishou_liang,
									item.huishou_jldanwei,
									item.huishou_songName,
									item.huishou_shouName,
									item.huishou_danwei,
									item.huishou_inORout=="yes"?"进":"出"
                             ]);
                             feiyeData[item.feiye_wpName] = item;
                         }
                     }else {
                         app.alert('申请单信息', data.errorMsg || '加载采购申请单信息错误', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                     }

                     fnCallback({'aaData': dealData});
                    }, error: function (xhr, status, errMsg) {
                        fnCallback({'aaData': []});
                    }
                });
            }
        });
    }
        
    return {
        // 模块加载结束后，会触发该方法
        load : function($el, scope, handler) {
        	$.ajax({
        		"type": "post",
        		"contentType": "application/x-www-form-urlencoded;charset=utf-8",
        		"url": "UserManagerAction_loadNowUser.do",
        		"dataType": "json",
        		"data": {},
        		shelter:'正在加载当前用户数据，请稍侯…',
        		success: function (data) {
        			if (data.status) {
        				userType = data.content.userVO.usertype;	
        				if(userType=="1"){
        					$(".gutter-bottom").hide()
        				}
        			} else {
        				alert(data.errorMsg);
        			}
        		}, error: function (xhr, status, errMsg) {
        			alert(errMsg);
        		}
        	});

            /*数据加载*/
            //初始化用户表格
        	feiyeTb=inituseTb($el);
            

            
            
            /*函数定义*/
            handler.fn = {
	            //创建回收入库处理
            	feiyeinCallback: function (context, $ele) {              
                    $("#feiyeincrtBtn").click(function(){
                    	 $.ajax({
                             "type": "post",
                             "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                             url: 'HuishouFeiyeAction_addHuishou.do',
                             data: {
                            	hswpname:$("#hswpname").val(),
                            	hsliang:$("#hsliang").val(),
                            	hsjldanwei:$("#hsjldanwei").val(),
                            	hsSongName:$("#hsSongName").val(),
                            	hsShouName:$("#hsShouName").val(),
                            	hsdanwei:$("#hsdanwei").val(),
                            	hsiOo:"yes"
                             },
                             shelter:'正在创建，请稍侯…',
                             success: function (data) {
                                 if (data.status) {
                                    var vo = data.content.hs;

                                     feiyeTb.fnAddData([
                        
                                         vo.huishou_id,
                                         vo.huishou_wpName,
                                         vo.huishou_liang,
                                         vo.huishou_jldanwei,
                                         vo.huishou_songName,
                                         vo.huishou_shouName,
                                         vo.huishou_danwei,
                                         vo.huishou_inORout=="yes"?"进":"出"
                                     ]);

                                     feiyeData[vo.feiye_wpName] = vo;

                                     app.alert('创建信息成功！',app.alertShowType.SUCCESS);
                                     context.hide();
                                 } else {
                                     app.alert('错误信息', data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                                 }
                             }
                         });                        
                    }) 
                                        
            },
          //创建回收不入库处理
        	feiyeCallback: function (context, $ele) {              
                $("#feiyecrtBtn").click(function(){
                	 $.ajax({
                         "type": "post",
                         "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                         url: 'HuishouFeiyeAction_addHuishou.do',
                         data: {
                        	hswpname:$("#hswpname").val(),
                        	hsliang:$("#hsliang").val(),
                        	hsjldanwei:$("#hsjldanwei").val(),
                        	hsSongName:$("#hsSongName").val(),
                        	hsShouName:$("#hsShouName").val(),
                        	hsdanwei:$("#hsdanwei").val(),
                        	hsiOo:"no"
                         },
                         shelter:'正在创建，请稍侯…',
                         success: function (data) {
                             if (data.status) {
                                var vo = data.content.hs;

                                 feiyeTb.fnAddData([
                    
										vo.huishou_id,
										vo.huishou_wpName,
										vo.huishou_liang,
										vo.huishou_jldanwei,
										vo.huishou_songName,
										vo.huishou_shouName,
										vo.huishou_danwei,
										vo.huishou_inORout=="yes"?"进":"出"
                                 ]);

                                 feiyeData[vo.feiye_wpName] = vo;

                                 app.alert('创建信息成功！',app.alertShowType.SUCCESS);
                                 context.hide();
                             } else {
                                 app.alert('错误信息', data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                             }
                         }
                     });                        
                }) 
                                    
        },
            }
           
            
            this.delegateEvents({
                'click #feiyeinCreBtn':function() {
                    //设置创建回收表单
                    app.formControl
                        .set('创建回收信息', $('#feiyeinTempcrt').html(), handler.fn.feiyeinCallback)
                        .show();
                },
                'click #feiyeCreBtn':function() {
                    //设置创建回收表单
                    app.formControl
                        .set('创建回收信息', $('#feiyeTempcrt').html(), handler.fn.feiyeCallback)
                        .show();
                },
            });
            
         	
 
        },

        // 模块销毁前触发
        unload : function(handler) {
         
        },
        // 暂停
        pause : function($el, attr, handler) {
        },
        // 恢复
        resume : function($el, attr, handler) {

        }

    };
});