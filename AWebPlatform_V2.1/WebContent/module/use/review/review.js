define([ "jquery" ], function() {
    var reviewSelectComponent,userType
        reviewData = {};
    
    function initreviewTb($el) {
        //加载实例数据
        return $('#reviewTb', $el).dataTable({
           'sAjaxSource': './ShiyongAction_loadAllYuyue.do',
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
                         for(items=data.content.yyData,i=items.length;(item=(items[--i]));) {
                             dealData.push([
                                 '<input type="checkbox" id="' + item.yuyue_name + '"/>',
                                 item.yuyue_id,
                                 item.yuyue_name,
                                 item.yuyue_rid,
                                 item.yuyue_pn,
                                 item.yuyue_wpname,
                                 item.yuyue_sl,
                                 item.yuyue_jldw,
                                 item.yuyue_dd,
                                 item.yuyue_yy,
                                 item.yuyue_yn=="yes"?"通过":item.yuyue_yn=="no"?"不通过":""
                             ]);
                             reviewData[item.yuyue_name] = item;
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
           initreviewTb($el);
            

            
            
            /*函数定义*/
            handler.fn = {
//	            //用户编辑
	            reviewCallback: function (context, $ele) {
	            	$('#cgyn1',$ele).click(function(){
	    				$('.shownopass',$ele).hide();
	    			});
	    			$('#cgyn2',$ele).click(function(){
	    				$('.shownopass',$ele).show();
	    			})
	    			$('.shownopass',$ele).hide();
//	                //变量定义
	            	var syid=app.domain.get("user","syid");
	                var syname = app.domain.get("user", "syname");
	                var sypid = app.domain.get("user", "sypid");
	                var synumber = app.domain.get("user", "synumber");
	                var sywpname = app.domain.get("user", "sywpname");
	                var sywpsl = app.domain.get("user", "sywpsl");
	                var syjldw = app.domain.get("user", "syjldw");
	                var sydd=app.domain.get("user", "sydd");
	                var syyy = app.domain.get("user", "syyy");
	                //初始赋值
	                $("#syname", $ele).val(syname);
	                $("#sypid", $ele).val(sypid);
	                $("#synumber", $ele).val(synumber);
	                $("#sywpname", $ele).val(sywpname);
	                $("#syjldw", $ele).val(syjldw);
	                $("#sywpsl", $ele).val(sywpsl);
	                $("#syyy", $ele).val(syyy);
	                $("#sydd", $ele).val(sydd);
	                //提交
	                $('#reviewBtn', $ele).click(function () {                   
	                        $.ajax({
	                            "type": "post",
	                            "contentType": "application/x-www-form-urlencoded;charset=utf-8",
	                            url: 'ShiyongAction_shenHe.do',
	                            data: {
	                					syid:syid,
	                					syyn:$('input:radio[name="syyn"]:checked').val(),
	                					syshyy:$("#syshyy").val()
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
                btnSelector:'#reviewSelAllBtn',
                tbodySelector:'#reviewTb>tbody',
                isDataTable:true,
                operationButtons:{
                    list:'#reviewUpdBtn',
                    status:{
                        '_default':['#reviewUpdBtn'],
                        'lock':['#reviewUpdBtn']
                    }
                },
                addMethod:function(list,elem){
                   var $parent = $(elem).parent();
                    list[1] = {
//                        checked: elem.checked,
                    	syid: $parent.siblings(':eq(0)').text(),
                    	syname: $parent.siblings(':eq(1)').text(),
                    	sypid: $parent.siblings(':eq(2)').text(),
                    	synumber: $parent.siblings(':eq(3)').text(),
                    	sywpname: $parent.siblings(':eq(4)').text(),
                    	sywpsl:$parent.siblings(':eq(5)').text(),
                    	syjldw: $parent.siblings(':eq(6)').text(),
                    	sydd: $parent.siblings(':eq(7)').text(),
                    	syyy: $parent.siblings(':eq(8)').text(),
                    	
                    	
//                    	node:$parent[0],
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
                'click #reviewUpdBtn':function () {

                    if(!$(this).hasClass('disabled')) {

                        app.formControl
                            .set('审核', $('#reviewTemp').html(), handler.fn.reviewCallback)
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