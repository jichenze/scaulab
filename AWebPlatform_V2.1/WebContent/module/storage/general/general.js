define([ "jquery" ], function() {
    var generalTb,
        generalData = {};
    
    function initReplyTb($el) {
        //加载实例数据
        return $('#generalTb', $el).dataTable({
//            'sAjaxSource': './GonghuoAction_loadAllGonghuo.do',
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
                                 '<input type="checkbox" id="' + item.gonghuo_fname + '"/>',
                                 item.gonghuo_fname,
                                 item.gonghuo_id,
                                 item.gonghuo_time,
                                 item.gonghuo_phone,
                                 item.gonghuo_sname,
                                 item.gonghuo_name,
                                 item.gonghuo_sl,
                             ]);
                             generalData[item.gonghuo_fname] = item;
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
            generalTb=initReplyTb($el);
            

            
            
            /*函数定义*/
            handler.fn = {
                    generalCreCallback: function (context, $ele) {              
                            $("#generalBtn").click(function(){
                            	 $.ajax({
                                     "type": "post",
                                     "contentType": "application/x-www-form-urlencoded;charset=utf-8",
//                                     url: 'GonghuoAction_doAddGonghuo.do',
                                     data: {
                                     	ghrname:$("#ghrname").val(),
                                     	ghid:$("#ghid").val(),
                                     	ghtime:$("#ghtime").val(),
                                     	ghpn:$("#ghpn").val(),
                                     	ghsrname:$("#ghsrname").val(),
                                     	ghname:$("#ghname").val(),
                                     	ghsl:$("#ghsl").val(),
                                     },
                                     shelter:'正在添加，请稍侯…',
                                     success: function (data) {
                                         if (data.status) {
                                            var vo = data.content.gh;

                                             generalTb.fnAddData([
                                                 '<input type="checkbox" id="' + vo.gonghuo_fname + '"/>',
                                                 vo.gonghuo_fname,
                                                 vo.gonghuo_id,
                                                 vo.gonghuo_time,
                                                 vo.gonghuo_phone,
                                                 vo.gonghuo_sname,
                                                 vo.gonghuo_name,
                                                 vo.gonghuo_sl,
                                             ]);

                                             generalData[vo.gonghuo_fname] = vo;
     
                                             app.alert('创建存储信息成功！',app.alertShowType.SUCCESS);
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
                'click #genrealCreBtn':function() {
                    //设置创建用户表单
                    app.formControl
                        .set('创建存储信息', $('#generalTemp').html(), handler.fn.generalCreCallback)
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