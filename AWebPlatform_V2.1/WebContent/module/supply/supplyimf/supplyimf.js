define([ "jquery" ], function() {
    var supplyTb,userType,
        supplyData = {};
    
    function initReplyTb($el) {
        //加载实例数据
        return $('#supplyTb', $el).dataTable({
            'sAjaxSource': './GonghuoAction_loadAllGonghuo.do',
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
                shelter:'正在加载供货单，请稍侯…',
                    success: function (data) {
                    	 var dealData=[],
                         i,items,item;

                     if(data.status&&data.content){
                         for(items=data.content.ghData,i=items.length;(item=(items[--i]));) {
                             dealData.push([
                                 item.gonghuo_fname,
                                 item.gonghuo_id,
                                 item.gonghuo_time,
                                 item.gonghuo_phone,
                                 item.gonghuo_sname,
                                 item.gonghuo_wpname,
                                 item.gonghuo_wplx=="1"?"有毒":"普通",
                                 item.gonghuo_sl,
                                 item.gonghuo_jldw,
                                 item.gonghuo_ccdw,
                                 item.gonghuo_ccdd
,
                             ]);
                             supplyData[item.gonghuo_fname] = item;
                         }
                     }else {
                         app.alert('供货单单信息', data.errorMsg || '加载信息错误', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
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
            //初始化供货表格
            supplyTb=initReplyTb($el);
            

            
            
            /*函数定义*/
            handler.fn = {
                    supplyCreCallback: function (context, $ele) {              
                            $("#supplyBtn").click(function(){
                            	 $.ajax({
                                     "type": "post",
                                     "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                                     url: 'GonghuoAction_doAddGonghuo.do',
                                     data: {
                                     	ghrname:$("#ghrname").val(),
                                     	ghid:$("#ghid").val(),
                                     	ghtime:$("#ghtime").val(),
                                     	ghpn:$("#ghpn").val(),
                                     	ghsrname:$("#ghsrname").val(),
                                     	ghwpname:$("#ghwpname").val(),
                                     	ghsl:$("#ghsl").val(),
                                     	ghjldw:$("#ghjldw").val(),
                                     	ghlx:$("#ghlx").val()=="有毒"?1:2,
                                     	ghccdw:$("#ghccdw").val(),
                                     	ghccdd:$("#ghccdd").val(),
                                     },
                                     shelter:'正在添加，请稍侯…',
                                     success: function (data) {
                                         if (data.status) {
                                            var vo = data.content.gh;

                                             supplyTb.fnAddData([
                                                                 vo.gonghuo_fname,
                                                                 vo.gonghuo_id,
                                                                 vo.gonghuo_time,
                                                                 vo.gonghuo_phone,
                                                                 vo.gonghuo_sname,
                                                                 vo.gonghuo_wpname,
                                                                 vo.gonghuo_wplx,
                                                                 vo.gonghuo_sl,
                                                                 vo.gonghuo_jldw,
                                                                 vo.gonghuo_ccdw,
                                                                 vo.gonghuo_ccdd
                                             ]);

                                             supplyData[vo.gonghuo_fname] = vo;
     
                                             app.alert('创建供货信息成功！',app.alertShowType.SUCCESS);
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
            	   //添加按钮绑定事件
                'click #supplyCreBtn':function() {
                    //设置创建用户表单
                    app.formControl
                        .set('创建供货信息', $('#supplyTemp').html(), handler.fn.supplyCreCallback)
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