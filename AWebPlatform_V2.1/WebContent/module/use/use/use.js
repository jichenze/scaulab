define([ "jquery" ], function() {
    var useTb,
        useData = {};
    
    function inituseTb($el) {
        //加载实例数据
        return $('#useTb', $el).dataTable({
//            'sAjaxSource': './CaigouAction_loadAllShenqing.do',
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
                                 item.caigou_yn=="yes"?"通过":"不通过"
                             ]);
                             useData[item.caigou_name] = item;
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


            /*数据加载*/
            //初始化用户表格
        	useTb=inituseTb($el);
            

            
            
            /*函数定义*/
            handler.fn = {
//	            //已审核发放处理
	            useCallback: function (context, $ele) {

//	                //变量定义
	            	var cgid=app.domain.get("user","cgid");
	                var cgname = app.domain.get("user", "cgname");
	                var cgpid = app.domain.get("user", "cgpid");
	                var cgnumber = app.domain.get("user", "cgnumber");
	                var cgwpname = app.domain.get("user", "cgwpname");
	                var cgwpsl = app.domain.get("user", "cgwpsl");
	                var cgyy = app.domain.get("user", "cgyy");

	                //初始赋值
	                $("#cgname", $ele).val(cgname);
	                $("#cgpid", $ele).val(cgpid);
	                $("#cgnumber", $ele).val(cgnumber);
	                $("#cgwpname", $ele).val(cgwpname);
	                $("#cgwpsl", $ele).val(cgwpsl);
	                $("#cgyy", $ele).val(cgyy);

	                //提交
	                $('#useBtn', $ele).click(function () {                   
	                        $.ajax({
	                            "type": "post",
	                            "contentType": "application/x-www-form-urlencoded;charset=utf-8",
	                            url: 'CaigouAction_shenHe.do',
	                            data: {
	                					cgid:cgid,
	                					cgyn:$('input:radio[name="cgyn"]:checked').val(),
	                					cgpl:$("#cgpl").val(),
	                					cgdate:$("#cgdate").val(),
	                					cgshyy:$("#cgshyy").val()
	            				},
	                            shelter: '正在修改，请稍侯…',
	                            success: function (data) {
	                                if (data.status) {
	                                   alert("登记成功")
	                                   
	                                } else {
	                                    app.alert('错误信息', data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
	                                }
	                            }
	                        });       
	                });
	         
	            },
	            //创建处理
	            useCreCallback: function (context, $ele) {              
                    $("#usecrtBtn").click(function(){
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
                             	ghname:$("#ghname").val(),
                             	ghsl:$("#ghsl").val(),
                             },
                             shelter:'正在添加，请稍侯…',
                             success: function (data) {
                                 if (data.status) {
                                    var vo = data.content.gh;

                                     useTb.fnAddData([
                                         '<input type="checkbox" id="' + vo.gonghuo_fname + '"/>',
                                         vo.gonghuo_fname,
                                         vo.gonghuo_id,
                                         vo.gonghuo_time,
                                         vo.gonghuo_phone,
                                         vo.gonghuo_sname,
                                         vo.gonghuo_name,
                                         vo.gonghuo_sl,
                                     ]);

                                     supplyData[vo.gonghuo_fname] = vo;

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
           
            
            /*监听绑定*/
            //全选按钮
            userSelectComponent=app.selectComponent({
                $context:$el,
                btnSelector:'#useSelAllBtn',
                tbodySelector:'#useTb>tbody',
                isDataTable:true,
                operationButtons:{
                    list:'#useUpdBtn',
                    status:{
                        '_default':['#useUpdBtn'],
                        'lock':['#useUpdBtn']
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
                'click #useUpdBtn':function () {

                    if(!$(this).hasClass('disabled')) {

                        app.formControl
                            .set('审核', $('#useTemp').html(), handler.fn.useCallback)
                            .show();
                    
                        
                    }
                },
                'click #useCreBtn':function() {
                    //设置创建用户表单
                    app.formControl
                        .set('创建供货信息', $('#uesTempcrt').html(), handler.fn.useCreCallback)
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