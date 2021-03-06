define([ "jquery" ], function() {
    var dangerTb,
        dangerData = {};
    
    function initReplyTb($el) {
        //加载实例数据
        return $('#dangerTb', $el).dataTable({
            'sAjaxSource': './CunchuAction_loadAllCunchu.do',
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
                    "data": {
                    	cclx:"1"
                    },
                shelter:'正在加载供货单，请稍侯…',
                    success: function (data) {
                    	 var dealData=[],
                         i,items,item;

                     if(data.status&&data.content){
                         for(items=data.content.ccData,i=items.length;(item=(items[--i]));) {
                             dealData.push([
                                            item.cunchu_name,
                                            item.cunchu_lx=="1"?"有毒":"普通",
                                            item.cunchu_liang,
                                            item.cunchu_jldw,
                                            item.cunchu_dw,
                                            item.cunchu_dd,
                                            item.cunchu_updatetime,
                             ]);
                             dangerData[item.gonghuo_fname] = item;
                         }
                     }else {
                         app.alert('存储信息', data.errorMsg || '加载信息错误', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
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



            /*数据加载*/
            //初始化供货表格
            dangerTb=initReplyTb($el);
            

            
            
            /*函数定义*/
//            handler.fn = {
//                    dangerCreCallback: function (context, $ele) {              
//                            $("#dangerBtn").click(function(){
//                            	 $.ajax({
//                                     "type": "post",
//                                     "contentType": "application/x-www-form-urlencoded;charset=utf-8",
////                                     url: 'GonghuoAction_doAddGonghuo.do',
//                                     data: {
//                                     	ghrname:$("#ghrname").val(),
//                                     	ghid:$("#ghid").val(),
//                                     	ghtime:$("#ghtime").val(),
//                                     	ghpn:$("#ghpn").val(),
//                                     	ghsrname:$("#ghsrname").val(),
//                                     	ghname:$("#ghname").val(),
//                                     	ghsl:$("#ghsl").val(),
//                                     },
//                                     shelter:'正在添加，请稍侯…',
//                                     success: function (data) {
//                                         if (data.status) {
//                                            var vo = data.content.gh;
//
//                                             dangerTb.fnAddData([
//                                                 '<input type="checkbox" id="' + vo.gonghuo_fname + '"/>',
//                                                 vo.gonghuo_fname,
//                                                 vo.gonghuo_id,
//                                                 vo.gonghuo_time,
//                                                 vo.gonghuo_phone,
//                                                 vo.gonghuo_sname,
//                                                 vo.gonghuo_name,
//                                                 vo.gonghuo_sl,
//                                             ]);
//
//                                             dangerData[vo.gonghuo_fname] = vo;
//     
//                                             app.alert('创建存储信息成功！',app.alertShowType.SUCCESS);
//                                             context.hide();
//                                         } else {
//                                             app.alert('错误信息', data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
//                                         }
//                                     }
//                                 });                        
//                            }) 
//                                                
//                    },
//            }
//           
//            this.delegateEvents({
//            	   //添加按钮绑定事件
//                'click #dangerCreBtn':function() {
//                    //设置创建用户表单
//                    app.formControl
//                        .set('创建存储信息', $('#dangerTemp').html(), handler.fn.dangerCreCallback)
//                        .show();
//                },
//            });
//            
//         	
 
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