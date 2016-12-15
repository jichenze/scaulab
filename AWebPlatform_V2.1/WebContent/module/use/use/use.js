define([ "jquery" ], function() {
    var useTb,userType,
        useData = {};
    
    function inituseTb($el) {
        //加载实例数据
        return $('#useTb', $el).dataTable({
            'sAjaxSource': './LingyongAction_loadAllLingyong.do',
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
                    shelter:'正在加载领用单，请稍侯…',
                    success: function (data) {
                    	 var dealData=[],
                         i,items,item;

                     if(data.status&&data.content){
                         for(items=data.content.lyData,i=items.length;(item=(items[--i]));) {
                             dealData.push([   
                                            item.lingyong_id,
                                            item.lingyong_wpName,
                                            item.lingyong_wpleixing,
                                            item.lingyong_sl,
                                            item.lingyong_jldanwei,
                                            item.lingyong_renName,
                                            item.lingyong_renID,
                                            item.lingyong_phNumber,
                                            item.lingyong_renName2,
                                            item.lingyong_renID2,
                                            item.lingyong_phNumber2,
                                            item.lingyong_frName,
                                            item.lingyong_yyYN
                             ]);
                             useData[item.lingyong_wpName] = item;
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
        	useTb=inituseTb($el);
            

            
            
            /*函数定义*/
            handler.fn = {
////	            //已审核发放处理
//	            useCallback: function (context, $ele) {
//
////	                //变量定义
//	            	var cgid=app.domain.get("user","cgid");
//	                var cgname = app.domain.get("user", "cgname");
//	                var cgpid = app.domain.get("user", "cgpid");
//	                var cgnumber = app.domain.get("user", "cgnumber");
//	                var cgwpname = app.domain.get("user", "cgwpname");
//	                var cgwpsl = app.domain.get("user", "cgwpsl");
//	                var cgyy = app.domain.get("user", "cgyy");
//
//	                //初始赋值
//	                $("#cgname", $ele).val(cgname);
//	                $("#cgpid", $ele).val(cgpid);
//	                $("#cgnumber", $ele).val(cgnumber);
//	                $("#cgwpname", $ele).val(cgwpname);
//	                $("#cgwpsl", $ele).val(cgwpsl);
//	                $("#cgyy", $ele).val(cgyy);
//
//	                //提交
//	                $('#useBtn', $ele).click(function () {                   
//	                        $.ajax({
//	                            "type": "post",
//	                            "contentType": "application/x-www-form-urlencoded;charset=utf-8",
//	                            url: 'CaigouAction_shenHe.do',
//	                            data: {
//	                					cgid:cgid,
//	                					cgyn:$('input:radio[name="cgyn"]:checked').val(),
//	                					cgpl:$("#cgpl").val(),
//	                					cgdate:$("#cgdate").val(),
//	                					cgshyy:$("#cgshyy").val()
//	            				},
//	                            shelter: '正在修改，请稍侯…',
//	                            success: function (data) {
//	                                if (data.status) {
//	                                   alert("登记成功")
//	                                   
//	                                } else {
//	                                    app.alert('错误信息', data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
//	                                }
//	                            }
//	                        });       
//	                });
//	         
//	            },
	            //创建处理
	            useCreCallback: function (context, $ele) {              
                    $("#usecrtBtn").click(function(){
                    	 $.ajax({
                             "type": "post",
                             "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                             url: 'LingyongAction_doAddLingyong.do',
                             data: {
                            	 lywpName:$("#lywpName").val(),
                            	 lywplx:$("#lywplx").val(),
                            	 lysl:$("#lysl").val(),
                            	 lyjldw:$("#lyjldw").val(),
                            	 lyrname:$("#lyrname").val(),
                            	 lyrid:$("#lyrid").val(),
                            	 lyrpn:$("#lyrpn").val(),
                            	 lyrname2:$("#lyrname2").val(),
                            	 lyrid2:$("#lyrid2").val(),
                            	 lyrpn2:$("#lyrpn2").val(),
                            	 lyyyYN:$("#lyyyYN").val(),
                            	 lyfName:$("#lyfName").val(),
                             },
                             shelter:'正在添加，请稍侯…',
                             success: function (data) {
                                 if (data.status) {
                                    var vo = data.content.ly;

                                     useTb.fnAddData([
                                       
                                                      vo.lingyong_id,
                                                      vo.lingyong_wpName,
                                                      vo.lingyong_wpleixing,
                                                      vo.lingyong_sl,
                                                      vo.lingyong_jldanwei,
                                                      vo.lingyong_renName,
                                                      vo.lingyong_renID,
                                                      vo.lingyong_phNumber,
                                                      vo.lingyong_renName2,
                                                      vo.lingyong_renID2,
                                                      vo.lingyong_phNumber2,
                                                      vo.lingyong_frName,
                                                      vo.lingyong_yyYN
                                     ]);

                                     useData[vo.lingyong_wpName] = vo;

                                     app.alert('创建领用信息成功！',app.alertShowType.SUCCESS);
                                     context.hide();
                                 } else {
                                     app.alert('错误信息', data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                                 }
                             }
                         });                        
                    }) 
                                        
            },
            }
           
            
//            /*监听绑定*/
//            //全选按钮
//            userSelectComponent=app.selectComponent({
//                $context:$el,
//                btnSelector:'#useSelAllBtn',
//                tbodySelector:'#useTb>tbody',
//                isDataTable:true,
//                operationButtons:{
//                    list:'#useUpdBtn',
//                    status:{
//                        '_default':['#useUpdBtn'],
//                        'lock':['#useUpdBtn']
//                    }
//                },
//                addMethod:function(list,elem){
//                   var $parent = $(elem).parent();
//                    list[1] = {
////                        checked: elem.checked,
//                    	cgid: $parent.siblings(':eq(0)').text(),
//                        cgname: $parent.siblings(':eq(1)').text(),
//                        cgpid: $parent.siblings(':eq(2)').text(),
//                        cgnumber: $parent.siblings(':eq(3)').text(),
//                        cgwpname: $parent.siblings(':eq(4)').text(),
//                        cgwpsl: $parent.siblings(':eq(5)').text(),
//                        cgyy:$parent.siblings(':eq(6)').text(),
////                        node:$parent[0],
////                        parent:$parent.parent()[0],
//                    };
//                    app.domain.exports('user', list[1])
//
//                },
//                getIDMethod:function(elem){        	
//                    return elem.id;
//                },
//                getNode:function(list,id){
//                    return list[id].node;
//                },
//                getStatusMethod:function(list) {
//
//                    return '_default';
//                }
//            });
         
            this.delegateEvents({
//                //审核
//                'click #useUpdBtn':function () {
//
//                    if(!$(this).hasClass('disabled')) {
//
//                        app.formControl
//                            .set('审核', $('#useTemp').html(), handler.fn.useCallback)
//                            .show();
//                    
//                        
//                    }
//                },
                'click #useCreBtn':function() {
                    //设置创建用户表单
                    app.formControl
                        .set('创建领用信息', $('#uesTempcrt').html(), handler.fn.useCreCallback)
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