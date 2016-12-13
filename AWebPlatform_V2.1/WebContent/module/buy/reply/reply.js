//define([ "jquery" ], function() {
//     return {
//
//	        load : function($el, scope, handler) {
//	        	console.log("页面加载时，进入了load方法");
//	        	//进入页面加载采购申请列表
////	        	$.ajax({
////            		"type": "post",
////            		"contentType": "application/x-www-form-urlencoded;charset=utf-8",
////            		"url":'',
////            		"dataType": "json",
////            		"data":{
////            			
////            		},
////            		success:function(data2){
////            			for(var i=0;i<data2.length;i++){
////            				$(".replybody").append("<tr>"+
////            					  "<td>"+data2[i].xx+"</td>"+
////                      		      "<td>"+data2[i].xxx+"</td>"+
////                      		      "<td>"+data2[i].xxx+"</td>"+
////                      			  "<td><button type='button' class='btn btn-success btn-small pull-right reply'>审核</button>"+
////                      		      "</td>"+
////                      		    "</tr>")
////            			}
////            	
////            		},
////    				error: function (xhr, status, errMsg) {
////    					alert('采购申请列表加载错误' + status, errMsg, 'msg');
////    				}
////            	});				                    		
//	        	
//
//	        	
//	        	
//			//处理审核框中的审核结果
//				$('.reply',$el).click(function(){
//					 $('#replyshow').modal('show');
//					 console.log($(this).parent("tr").find("td").eq(0).text());
//					 $.ajax({
//		            		"type": "post",
//		            		"contentType": "application/x-www-form-urlencoded;charset=utf-8",
//		            		"url":'',
//		            		"dataType": "json",
//		            		"data":{
////		            			xxx:$('.reply').siblings(".applyid")
//		            		},
//		            		success:function(data2){
//		            			for(var i=0;i<data2.length;i++){
//		            				$(".replybody").append("<tr>"+
//		            					  "<td>"+data2[i].xx+"</td>"+
//		                      		      "<td>"+data2[i].xxx+"</td>"+
//		                      		      "<td>"+data2[i].xxx+"</td>"+
//		                      			  "<td><button type='button' class='btn btn-success btn-small pull-right reply'>审核</button>"+
//		                      		      "</td>"+
//		                      		    "</tr>")
//		            			}
//		            	
//		            		},
//		    				error: function (xhr, status, errMsg) {
//		    					alert('错误' + status, errMsg, 'msg');
//		    				}
//		            	});				                    
//				})
//				$('.shownopass',$el).hide();
//				$('.showpass_small',$el).hide();
//				$('#pass',$el).click(function(){
//					$('.shownopass',$el).hide();
//					$('.showpass',$el).show();
//				});
//				$('#nopass',$el).click(function(){
//					$('.shownopass',$el).show();
//					$('.showpass',$el).hide();
//				})
//				$('#big',$el).click(function(){
//					$('.showpass_small',$el).hide();
//					$('.showpass_big',$el).show();
//				});
//				$('#small',$el).click(function(){
//					$('.showpass_small',$el).show();
//					$('.showpass_big',$el).hide();
//				});
//				$('#datetimePickerExample',$el).datetimepicker({
//				    format: 'yyyy-mm-dd'
//				});
//				$('#datetimePickerExample2',$el).datetimepicker({
//				    format: 'yyyy-mm-dd'
//				});
//	        },
//	
//			unload : function(handler) {
//				console.log("页面关闭时，进入了unload方法");
//			},
//			
//			pause : function($el, scope, handler) {
//				console.log("页面未关闭，但是打开了另一个页面，进入了pause方法");
//			},
//			
//			resume : function($el, scope, handler) {
//				console.log("重新进入页面，进入了resume方法");
//			}
//	};
//});

define([ "jquery" ], function() {
    var userSelectComponent,
        userData = {};
    
    function initReplyTb($el) {
        //加载实例数据
        return $('#replyTb', $el).dataTable({
            'sAjaxSource': './CaigouAction_loadAllShenqing.do',
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
                    shelter:'正在加载采购申请单，请稍侯…',
                    success: function (data) {
                    	 var dealData=[],
                         i,items,item;

                     if(data.status&&data.content){
                         for(items=data.content.sqData,i=items.length;(item=(items[--i]));) {
                             dealData.push([
                                 '<input type="checkbox" id="' + item.username + '"/>',
                                 item.caigou_id,
                                 item.caigou_name,
                                 item.caigou_pid,
                                 item.caigou_pn,
                                 item.caigou_hxn,
                                 item.caigou_sl,
                                 item.caigou_yy,
                                 item.caigou_yn=="yes"?"通过":item.caigou_yn=="no"?"不通过":""
                             ]);
                             userData[item.caigou_name] = item;
                         }
                     }else {
                         app.alert('采购申请单信息', data.errorMsg || '加载采购申请单信息错误', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
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

        	
        	
        	
            /*变量定义*/
            var TEMP = "<p class='term'>_content_</p>",
                isUserValidate = false,
                g_userID;

            /*数据加载*/
            //初始化用户表格
           initReplyTb($el);
            

            
            
            /*函数定义*/
            handler.fn = {
//	            //用户编辑
	            userEditCallback: function (context, $ele) {
	            	$('#cgyn1',$ele).click(function(){
	    				$('.shownopass',$ele).hide();
	    				$('.showpass',$ele).show();
	    			});
	    			$('#cgyn2',$ele).click(function(){
	    				$('.shownopass',$ele).show();
	    				$('.showpass',$ele).hide();
	    			})
	    			$('#cgdate',$ele).datetimepicker({
	    			    format: 'yyyy-mm-dd'
	    			});
	    			$('.shownopass',$ele).hide();
//	                //变量定义
	            	var cgid=app.domain.get("user","cgid");
	                var cgname = app.domain.get("user", "cgname");
	                var cgpid = app.domain.get("user", "cgpid");
	                var cgnumber = app.domain.get("user", "cgnumber");
	                var cgwpname = app.domain.get("user", "cgwpname");
	                var cgwpsl = app.domain.get("user", "cgwpsl");
	                var cgyy = app.domain.get("user", "cgyy");

	                //初始赋值
	                $("#cgid", $ele).val(cgid);
	                $("#cgname", $ele).val(cgname);
	                $("#cgpid", $ele).val(cgpid);
	                $("#cgnumber", $ele).val(cgnumber);
	                $("#cgwpname", $ele).val(cgwpname);
	                $("#cgwpsl", $ele).val(cgwpsl);
	                $("#cgyy", $ele).val(cgyy);

	                //提交
	                $('#replyBtn', $ele).click(function () {                   
	                        $.ajax({
	                            "type": "post",
	                            "contentType": "application/x-www-form-urlencoded;charset=utf-8",
	                            url: 'CaigouAction_shenHe.do',
	                            data: {
	                					cgid:$("#cgid").val(),
	                					cgyn:$('input:radio[name="cgyn"]:checked').val(),
	                					cgpl:$("#cgpl").val(),
	                					cgdate:$("#cgdate").val(),
	                					cgshyy:$("#cgshyy").val()
	            				},
	                            shelter: '正在修改，请稍侯…',
	                            success: function (data) {
	                                if (data.status) {
	                                   alert("审核成功")
	                                   
	                                } else {
	                                    app.alert('错误信息', data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
	                                }
	                            }
	                        });       
	                });
	         
	            }
            }
           
            
            /*监听绑定*/
            //全选按钮
            userSelectComponent=app.selectComponent({
                $context:$el,
                btnSelector:'#replySelAllBtn',
                tbodySelector:'#replyTb>tbody',
                isDataTable:true,
                operationButtons:{
                    list:'#replyUpdBtn',
                    status:{
                        '_default':['#replyUpdBtn'],
                        'lock':['#replyUpdBtn']
                    }
                },
                addMethod:function(list,elem){
                   var $parent = $(elem).parent();
                    list[1] = {
//                        checked: elem.checked,
                    	cgid: $parent.siblings(':eq(0)').text(),
                        cgname: $parent.siblings(':eq(1)').text(),
                        cgpid: $parent.siblings(':eq(2)').text(),
                        cgnumber: $parent.siblings(':eq(3)').text(),
                        cgwpname: $parent.siblings(':eq(4)').text(),
                        cgwpsl: $parent.siblings(':eq(5)').text(),
                        cgyy:$parent.siblings(':eq(6)').text(),
//                        node:$parent[0],
//                        parent:$parent.parent()[0],
                    };
                    app.domain.exports('user', list[1])

                },
                getIDMethod:function(elem){        	
                    return elem.id;
                },
                getNode:function(list,id){
                    return list[id].node;
                },
                getStatusMethod:function(list) {

                    return '_default';
                }
            });
         
            this.delegateEvents({
                //审核
                'click #replyUpdBtn':function () {

                    if(!$(this).hasClass('disabled')) {

                        app.formControl
                            .set('审核', $('#replyTemp').html(), handler.fn.userEditCallback)
                            .show();
                    
                        
                    }
                }
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