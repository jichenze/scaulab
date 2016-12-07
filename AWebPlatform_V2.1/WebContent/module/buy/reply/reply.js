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
    var userSelectComponent,userRoleSelectComponent,
        userTb, userRoleTb,
        userData = {};
    
    function initUserTb($el) {
        //加载实例数据
        return $('#userTb', $el).dataTable({
            'sAjaxSource': './CaigouAction_loadAllShenqing.do',
            'bDestroy': true,
            'bStateSave': true,
            "bPaginate": true, //开关，是否显示分页器
            "bInfo": false, //开关，是否显示表格的一些信息
            "aaSorting": [[7, 'desc']],
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
                            for(items=data.content.aaData,i=items.length;(item=(items[--i]));) {
                                dealData.push([
                                    '<input type="checkbox" id="' + item.cgname + '"/>',
                                    item.cgname,
                                    item.cgpid,
                                    item.cgnumber,
                                    item.cgwpname,
                                    item.cgwpsl,
                                    item.cgyy
                                ]);
                                userData[ item.cgname] = item;
                            }
                        }else {
                            app.alert('信息', data.errorMsg || '加载信息错误', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
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


            /*函数定义*/
            handler.fn = {
                userCreCallback: function (context, $ele) {

                    $('#username', $ele).blur(function(){
                        //验证用户名是否重复
                        if($("#username", $ele).val()){
                            $.ajax({
                                type: "post",
                                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                                url: 'UserManagerAction_validateUsername.do',
                                data: {"username":$(this).val()},
                                shelter:'正在校验用户名，请稍侯…',
                                success: function (data) {
                                    if (data.status) {
                                        $("#usernameTips", $ele).addClass('hide');
                                    } else {
                                        $("#usernameTips")
                                            .addClass('error')
                                            .text(data.errorMsg)
                                            .removeClass('hide');
                                    }
                                    isUserValidate = data.status;
                                }
                            });
                        }
                    });

                    //创建事件验证
                    $('#userCreSmtBtn', $ele).click(function () {
                        if(isUserValidate){
                            //需要验证的数据
                            var validateData = [{
                                id: 'username',
                                value: $("#username", $ele).val(),
                                filter: {
                                    require: true,
                                    minLen: 4,
                                    maxLen: 30
                                }
                            }, {
                                id: 'nickname',
                                value: $("#nickname", $ele).val(),
                                filter: {}
                            }, {
                                id: "mailbox",
                                value: $("#mailbox", $ele).val(),
                                filter: {
                                    "type": "email"
                                }
                            }, {
                                id: "telephone",
                                value: $("#telephone", $ele).val(),
                                filter: {
                                    "type": "mobile"
                                }
                            }, {
                                id: "userType",
                                value: $('#userType option:checked', $ele).attr("id"),
                                filter: {
                                    require: true,
                                }
                            }, {
                                id: "state",
                                value: $("#state", $ele).bootstrapSwitch('state') == true ? "1" : "0",
                                filter: {}
                            }, {
                                id: "remark",
                                value: $("#remark", $ele).val(),
                                filter: {}
                            }];

                            var validateResult = app.validate.validate({
                                $context: $ele,
                                data: validateData,
                                errorCallback: function ($el, errMsg) {
                                    $el.closest('.control-group').addClass('error');
                                    $el.next().removeClass('hide').text(errMsg);
                                },
                                correctCallback: function ($el, correctMsg) {
                                    $el.closest('.control-group').removeClass('error');
                                    $el.next().addClass('hide');
                                }
                            });

                            if (validateResult.bResult) {
                                $.ajax({
                                    "type": "post",
                                    "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                                    url: 'UserManagerAction_doAddUser.do',
                                    data: $.param(validateResult.oDatas),
                                    shelter:'正在添加用户，请稍侯…',
                                    success: function (data) {
                                        if (data.status) {
                                            var vo = data.content.vo;

                                            userTb.fnAddData([
                                                '<input type="checkbox" id="' + vo.username + '"/>',
                                                vo.username || '',
                                                vo.nickname,
                                                vo.mailbox,
                                                vo.telephone,
                                                vo.createUser,
                                                vo.createTime,
                                                vo.loginTime,
                                                vo.state == "0" ? "未启用" : "启用",
                                                vo.remark,
                                            ]);

                                            //将新添的数据加入userdata中
                                            userData[vo.username] = vo;

                                            app.alert('创建用户', '用户：' + vo.username + ' 创建成功！',app.alertShowType.SUCCESS);
                                            context.hide();
                                        } else {
                                            app.alert('错误信息', data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                //用户编辑
                userEditCallback: function (context, $ele) {
                    //变量定义
                    var user = app.domain.get("user", "user");

                    //初始赋值
                    $("#editusername", $ele).val(user.username);
                    $("#editmailbox", $ele).val(user.mailbox);
                    $("#edittelephone", $ele).val(user.telephone);
                    $("#editnickname", $ele).val(user.nickname);
                    //如果用户为管理员，则把用户类型选项禁用，否则则置为当前需要修改的用户
                    if (user.usertype == 0) {
                        $("#editUserType option[id=1]", $ele).text("超级用户");
                        $("#editUserType", $ele).attr("disabled", "disabled");
                    } else {
                        $("#editUserType option", $ele).each(function () {
                            if ($(this).val() == user.usertype) {
                                $(this).attr("selected", "selected");
                            }
                        });
                    }

                    $("#editstate", $ele).bootstrapSwitch({
                        'state': user.state == "1" ? true : false
                    });
                    $("#editremark", $ele).val(user.remark);
                    //提交
                    $('#userEditSmtBtn', $ele).click(function () {
                        //需要验证的数据
                        var validateData = [{
                                id: "editusername",
                                value: user.username,
                                filter: {}
                            }, {
                                id: "editnickname",
                                value: $("#editnickname", $ele).val(),
                                filter: {}
                            }, {
                                id: "editmailbox",
                                value: $("#editmailbox", $ele).val(),
                                filter: {
                                    "type": "email"
                                }
                            }, {
                                id: "editpassword",
                                value: $("#editpassword", $ele).bootstrapSwitch('state') == true ? "1" : "0",
                                filter: {}
                            }, {
                                id: "edittelephone",
                                value: $("#edittelephone", $ele).val(),
                                filter: {
                                    "type": "mobile"
                                }
                            }, {
                                id: "editUserType",
                                value: $('#editUserType option:checked', $ele).val(),
                                filter: {}
                            }, {
                                id: "editstate",
                                value: $("#editstate", $ele).bootstrapSwitch('state') == true ? "1" : "0",
                                filter: {}
                            }, {
                                id: "editremark",
                                value: $("#editremark", $ele).val(),
                                filter: {}
                            }];

                        var validateResult = app.validate.validate({
                            $context: $ele,
                            data: validateData,
                            errorCallback: function ($el, errMsg) {
                                $el.closest('.control-group').addClass('error');
                                $el.next().removeClass('hide').text(errMsg);
                            },
                            correctCallback: function ($el, correctMsg) {
                                $el.closest('.control-group').removeClass('error');
                                $el.next().addClass('hide');
                            }
                        });


                        if (validateResult.bResult) {
                            $.ajax({
                                "type": "post",
                                "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                                url: 'UserManagerAction_doEditUser.do',
                                data: $.param(validateResult.oDatas),
                                shelter: '正在提交用户修改，请稍侯…',
                                success: function (data) {
                                    if (data.status) {
                                        //移除表内数据
                                        var userTb = $('#userTb', $el).dataTable();
                                        var insList = app.domain.get("user","node");
                                        userSelectComponent.clear();
                                        for (var ins in insList) {
                                            userTb.fnDeleteRow(userTb.fnGetPosition(insList[ins].parent));
                                        }

                                        //新增
                                        var vo = data.content.vo;
                                        userTb.fnAddData([
                                            '<input type="checkbox" name="checkbox" id="' + vo.username + '"/>',
                                            vo.username,
                                            vo.nickname || '',
                                            vo.mailbox,
                                            vo.telephone,
                                            vo.createUser,
                                            vo.createTime,
                                            vo.loginTime,
                                            vo.state == "0" ? "未启用" : "启用",
                                            vo.remark,
                                        ]);

                                        //更新userdata中数据
                                        userData[vo.username] = vo;

                                        app.alert('修改用户', '用户修改成功！', app.alertShowType.SUCCESS);
                                        context.hide();
                                    } else {
                                        app.alert('错误信息', data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                                    }
                                }
                            });
                        }
                    });
                }
            };


            //执行用户关联角色
            function doUserRelevanceRole(userID) {
                if (userID) {
                    g_userID=userID;
                    //userRole选中数据
                    
                    $.ajax({
                        "type": "post",
                        "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                        "url": "UserManagerAction_loadUserRelevanceRole.do",
                        "dataType": "json",
                        "data": {userID: userID},
                        shelter: '正在加载关联用户，请稍侯…',
                        success: function (data) {
                            var roles,
                                ids=[], i,role,
                                $modal;
                            if (data.status) {
                                roles=data.content.userRoles;

                                $modal=$('#userRoleTemp', $el);


                                for(i=roles.length;(role=roles[--i]);) {
                                    ids.push(role.roleId);
                                }

                                if(roles.length) {
                                    $('#' + ids.join(',#'), $modal).attr('checked','checked').each(function(){
                                        userRoleSelectComponent.add(this);
                                    });
                                }

                                $('#userRoleTemp', $el).modal('show');

                            } else {
                                app.alert('错误信息', data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                            }
                        }
                    });
                }
            }
            
            /*数据加载*/
            //初始化用户表格
            userTb = initUserTb($el);
            
            function format (oData) {
                return TEMP.replace(/_content_/, IDE_ICONS.tokenIcon+'Token: ' + TOKEN_DATA[oData.token] )+
                TEMP.replace(/_content_/, IDE_ICONS.projectIcon+'项目组: ' + (oData.projectGroup.name || "") )+
                TEMP.replace(/_content_/, IDE_ICONS.timeIcon+'过期时间: ' + oData.expiredTime );
            }
            
            $('#userTb tbody', $el).on('click', 'tr td.details-control', function () {
                var tr = $(this).closest('tr');
                var api = userTb.api(true);
                var row = api.row(tr);
                
                if (row.child.isShown()) {
                    tr.removeClass('shown');
                    row.child.hide();
                } else {
                    tr.addClass('shown');
                    row.child(format(userData[row.data()[1]])).show();
                }
            });
            
            //初始化关联角色表格
            userRoleTb = initUserRoleTb($el);

            /*监听绑定*/
            //全选按钮
            userSelectComponent=app.selectComponent({
                $context:$el,
                btnSelector:'#userSelAllBtn',
                tbodySelector:'#userTb>tbody',
                isDataTable:true,
                operationButtons:{
                    list:'#userUpdBtn,#userRoleBtn,#userDelBtn,#unlockuserBtn',
                    status:{
                        '_default':['#userUpdBtn,#userRoleBtn,#userDelBtn','#userDelBtn'],
                        'lock':['#userUpdBtn,#userRoleBtn,#userDelBtn,#unlockuserBtn','#userDelBtn,#unlockuserBtn']
                    }
                },
                addMethod:function(list,elem){
                    var $parent = $(elem).parent();
                    list[elem.id] = {
                        checked: elem.checked,
                        name: $parent.siblings(':eq(1)').text(),
                        node:$parent[0],
                        parent:$parent.parent()[0],
                        lockState:$parent.siblings(':eq(10)').text()
                    };
                },
                getIDMethod:function(elem){
                    return elem.id;
                },
                getNode:function(list,id){
                    return list[id].node;
                },
                getStatusMethod:function(list) {
                    var isLock = false;

                    for (var p in list) {
                        if (list[p].lockState === '锁定') {
                            isLock = true;
                        }
                    }


                    return isLock ? 'lock' : '_default';
                }
            });
            userRoleSelectComponent=app.selectComponent({
                $context:$el,
                btnSelector:'#userRoleSltAllBtn',
                tbodySelector:'#userRoleTb>tbody',
                isDataTable:true,
                addMethod:function(list,elem){
                    list[elem.id] = {
                        node: $(elem).parent()
                    };
                },
                getIDMethod:function(elem){
                    return elem.id;
                },
                getNode:function(list,id) {
                    return list[id].node;
                }
            });


            this.delegateEvents({
                //角色配置
                'click #userTb>tbody':function(e) {
                    var $e = $(e.target || window.event.srcElement).closest('td'),
                        userName;

                    if ($e.index() === 1&& (userName=$e.parent().find(':checkbox').attr('id'))) {
                        doUserRelevanceRole(userName);
                    }
                },
                //添加按钮绑定事件
                'click #userCreBtn':function() {
                    //设置创建用户表单
                    app.formControl
                        .set('创建用户', $('#userCreTemp').html(), handler.fn.userCreCallback)
                        .show();
                },
                //删除按钮绑定事件
                'click #userDelBtn':function () {
                    var list=userSelectComponent.list(),
                        ids=userSelectComponent.clear();
                    if(ids.length){
                        app.confirm({
                            btnCancel: '否',
                            btnConfirm: '是',
                            confirmHandler: function (list,ids) {           //当删除按钮能使用时
                                $.ajax({
                                    "type": "post",
                                    "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                                    url: 'UserManagerAction_doDeleteUser.do',
                                    data: {"userIDS": ids.join(',')},
                                    shelter: '正在删除用户，请稍侯…',
                                    success: function (data) {
                                        if (data.status) {
                                            for (var item in list) {
                                                userTb.fnDeleteRow(userTb.fnGetPosition(list[item].node)[0]);
                                            }

                                            app.alert('删除用户', '用户删除成功！', app.alertShowType.SUCCESS);
                                        } else {
                                            app.alert('错误信息', data.errorMsg, app.alertShowType.ERROR);
                                        }
                                    }
                                });
                            },
                            content: '确定执行该操作？',
                            title: '提示',
                            args:[list,ids]
                        });

                    }else{
                        app.alert("用户管理",'请先选择需要删除的用户！', app.alertShowType.WARNING);
                    }
                },
                //修改用户
                'click #userUpdBtn':function () {
                    if(!$(this).hasClass('disabled')) {
                        app.domain.exports('user', {
                            'node': userSelectComponent.list(),
                            'user': userData[userSelectComponent.clear()[0]]
                        });

                        app.formControl
                            .set('修改用户', $('#userEditTemp').html(), handler.fn.userEditCallback)
                            .show();
                    }
                },
                //解锁用户
                'click #unlockuserBtn':function () {
                    var list,ids;

                    if(!$(this).hasClass('disabled')) {
                        list=userSelectComponent.list();
                        ids=userSelectComponent.clear();
                        $.ajax({
                            "type": "post",
                            "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                            url: 'UserManagerAction_doUnlockUser.do',
                            data: {"userIDS":ids.join(',')},
                            shelter:'正在解除用户，请稍侯…',
                            success: function (data) {
                                if (data.status) {
                                    //更新表内数据
                                    for (var user in list) {
                                        userTb.fnUpdate("启用", userTb.fnGetPosition(list[user].node)[0], 9);
                                    }
                                    app.alert('用户解锁', '用户解锁成功！', app.alertShowType.SUCCESS);
                                } else {
                                    app.alert('错误信息', data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                                }
                            }
                        });
                    }
                },
                //配置角色绑定事件
                'click #userRoleBtn':function () {
                    var $this = $(this),
                        ids;

                    if (!$this.hasClass('disabled')) {
                        ids = userSelectComponent.clear();
                        doUserRelevanceRole(ids[0]);
                    }
                },
                //绑定关联确认事件
                'click #douserRoleBtn':function() {
                    var ids = userRoleSelectComponent.clear();

                    if (ids.length > 0) {
                        $.ajax({
                            type: "post",
                            contentType: "application/x-www-form-urlencoded;charset=utf-8",
                            url: 'UserManagerAction_doUserRelevanceRole.do',
                            dataType: "json",
                            shelter: '正在关联用户角色，请稍侯…',
                            data: {
                                userID: g_userID,
                                roleIDS: ids.join(',')
                            },
                            success: function (data) {
                                if (data.status) {
                                    $('#userRoleTemp', $el).modal('hide');
                                    app.alert('用户管理', '关联角色成功！', app.alertShowType.SUCCESS);
                                } else {
                                    app.alert('错误信息', data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                                }
                            }
                        });
                    } else {
                        app.alert('错误', '请先选择角色!', app.alertShowType.WARNING);
                    }
                },
                'hidden #userRoleTemp':function(e) {
                    userRoleSelectComponent.clear();
                }
            });

            window.userRoleSelectComponent=userRoleSelectComponent;
        },

        // 模块销毁前触发
        unload : function(handler) {
            userSelectComponent&&userSelectComponent.dispose();
            userRoleSelectComponent&&userRoleSelectComponent.dispose();
            userTb&&userTb.fnDestroy(), userTb = null;
            userRoleTb&&userRoleTb.fnDestroy(), userRoleTb = null;
        },
        // 暂停
        pause : function($el, attr, handler) {
        },
        // 恢复
        resume : function($el, attr, handler) {
            userTb = initUserTb($el);
            userRoleTb = initUserRoleTb($el);
        }

    };
});