define([ "jquery" ], function() {
    return {

        // 模块加载结束后，会触发该方法
        load : function($el, scope, handler) {
            var roledata = [];

            /*数据加载*/
            //加载实例数据
            var roleTb = $('#roleTb', $el).dataTable({
                'sAjaxSource': './RoleManagerAction_loadAllRole.do',
                "bPaginate": true, //开关，是否显示分页器
                "bInfo": false, //开关，是否显示表格的一些信息
                'bStateSave': true,
                "aaSorting": [[4, 'desc']],
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
                        shelter:'正在加载用户数据，请稍候…',
                        success: function (data) {
                            var dealData = {
                                "aaData":[]
                            };
                            for(var i = 0 ; i<data.content.aaData.length;i++){
                                var lineObj = data.content.aaData[i];
                                var tempLine = [];
                                tempLine.push('<input type="checkbox" name="checkbox" id="' + lineObj.roleId + '"/>');
                                tempLine.push(lineObj.roleId);
                                tempLine.push(lineObj.name);
                                tempLine.push(lineObj.createUser);
                                tempLine.push(lineObj.createTime);
                                tempLine.push(lineObj.updateTime);
                                tempLine.push(lineObj.state=="0"?"未启用":"启用");
                                tempLine.push(lineObj.remark);
                                dealData.aaData.push(tempLine);

                                roledata[lineObj.roleId] = lineObj;
                            }
                            fnCallback(dealData); //服务器端返回的对象的resp部分是要求的格式


                            /*-------------------表单加载完后绑定事件--------------------*/
                            //绑定双击事件-配置角色
                            dbClick();
                        }, error: function (xhr, status, errMsg) {
                            fnCallback({'aaData': []});
                            app.alert('错误' + status, errMsg, 'msg');
                        }
                    });
                }
            });







            /*--------------------------事件绑定----------------------------*/
            var $tbody = $('#roleTb', $el).children('tbody');
            /*监听绑定*/
            //全选按钮
            var insSelComponent=app.selectComponent({
                $context:$el,
                btnSelector:'#roleSelAllBtn',
                tbodySelector:'#roleTb>tbody',
                isDataTable:true,
                operationButtons:{
                    list:'#roleAccessBtn,#roleUpdBtn,#roleDelBtn',
                    status:{
                        '_default':['#roleAccessBtn,#roleUpdBtn,#roleDelBtn','#roleDelBtn']
                    }
                },
                addMethod:function(list,elem){
                    var $parent = $(elem).parent();
                    list[elem.id] = {
                        checked: elem.checked,
                        name: $parent.siblings(':eq(1)').text(),
                        node:$parent[0],
                        parent:$parent.parent()[0]
                    };
                },
                getIDMethod:function(elem){
                    return elem.id;
                },
                getNode:function(list,id){
                    return list[id].node;
                },
                getStatusMethod:function() {
                    return '_default';
                }
            });



            //添加按钮绑定事件
            $('#roleCreBtn', $el).click(function () {
                //设置创建用户表单
                app.formControl.set('创建角色', $('#roleCreTemp').html(), handler.fn.formControlCallback);
                app.formControl.show();
            });


            //删除按钮绑定事件
            $('#roleDelBtn', $el).click(function () {
                if(insSelComponent.selectSize()>0){
                    var doDel = function(){         //当删除按钮能使用时
                        var ids = "";

                        $('input:checkbox[name="checkbox"]:checked').each(function(idx,elem){
                            ids += elem.id;
                            ids += ",";
                        });
                        ids = ids.substr(0,(ids.length-1));
                        $.ajax({
                            "type": "post",
                            "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                            url: 'RoleManagerAction_doDeleteRole.do',
                            data: {"roleIDS":ids},
                            shelter:'正在删除用户角色，请稍候…',
                            success: function (data) {
                                if (data.status) {
                                    //移除表内数据
                                    var roleTb = $('#roleTb', $el).dataTable();

                                    var roleList = insSelComponent.list();
                                    insSelComponent.clear();
                                    for (var role in roleList) {
                                        roleTb.fnDeleteRow(roleTb.fnGetPosition(roleList[role].parent));
                                    }

                                    /*
                                    for (var role in roleSelected) {
                                        roleTb.fnDeleteRow(roleTb.fnGetPosition(roleSelected[role][0]));
                                    }*/

                                    app.alert('角色管理', '角色删除成功！',app.alertShowType.SUCCESS);

                                } else {
                                    app.alert('错误信息', data.errorMsg, 'msg');
                                }
                            }, error: function (xhr, status, errMsg) {
                                app.alert('错误' + status, errMsg, 'msg');
                            }
                        })
                    };
                    
                    app.confirm({
                        btnCancel:'否',
                        btnConfirm:'是',
                        confirmHandler:function(){doDel();},
                        content:'是否执行该操作?',
                        title:'提示'});
                    
                }else{
                    app.alert("角色管理",'请先选择需要删除的角色！', app.alertShowType.WARNING);
                }
            });


            //配置角色绑定操作事件
            $('#roleAccessBtn', $el).click(function () {
                if(insSelComponent.selectSize()==1){           //当配置角色按钮能使用时
                    showRserRelevanceAccess(1,$('input:checkbox[name="checkbox"]:checked',$tbody)[0].id);
                }else if(insSelComponent.selectSize()==0){
                    app.alert("角色管理",'请先选择需要绑定操作权限的角色！', app.alertShowType.WARNING);
                }else{
                    app.alert("角色管理",'只能为单个角色绑定操作权限！', app.alertShowType.WARNING);
                }
            });

            //双击事件-角色配置
            function dbClick(){
                $("#roleTb tbody tr", $el).dblclick(function(e){
                    var index = $(this).context._DT_RowIndex;
                    if (index >= 0 ){
                        var roleID = $(this.cells[0].innerHTML)[0].id;
                        if(roleID!=null&&roleID!="")
                            showRserRelevanceAccess(1,roleID);
                    }
                });
            }
            //执行角色关联权限
            function showRserRelevanceAccess(checked_num,roleID){
                if(checked_num == 1 && roleID != ""){
                    app.domain.exports('role', {'roleID': roleID});
                    //设置关联权限
                    app.formControl.set('关联操作权限', $('#roleAccessTemp').html(), handler.fn.RoleAccessCallback);
                    app.formControl.show();
                }else if(checked_num == 0){
                    app.alert("角色管理","请先选择需要配置权限的角色！",app.alertShowType.WARNING);
                }else if(checked_num >1){
                    app.alert("角色管理","只能配置单个角色权限!",app.alertShowType.WARNING);
                }
            }

            /*内部全局函数定义*/
            handler.fn = {
                //添加角色显示以及执行
                formControlCallback: function (context, $ele) {
                    $('#roleCreSmtBtn', $ele).click(function () {           //创建事件验证
                        var validateResult = app.validate.validate({
                            $context: $ele,
                            data: [{
                                id: 'rolename',
                                value: $("#rolename", $ele).val(),
                                filter: {
                                    require: true,
                                    minLen: 2,
                                    maxLen: 30
                                }
                            },
                            {
                                id: "state",
                                value: $("#state", $ele).bootstrapSwitch('state')==true?"1":"0",
                                filter: {}
                            },
                            {
                                id: "remark",
                                value: $("#remark", $ele).val(),
                                filter: {}
                            }],
                            errorCallback: function ($el, errMsg) {
                                $el.closest('.control-group').addClass('error');
                                $el.next().removeClass('hide').text(errMsg);
                            },
                            correctCallback: function ($el, correctMsg) {
                                $el.closest('.control-group').removeClass('error');
                                $el.next().addClass('hide');
                            }
                        });

                        //验证通过后执行
                        if (validateResult.bResult) {
                            $.ajax({
                                "type": "post",
                                "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                                url: 'RoleManagerAction_doAddRole.do',
                                data: $.param(validateResult.oDatas),
                                shelter:'正在添加用户角色，请稍候…',
                                success: function (data) {
                                    if (data.status) {
                                        var roleTb = $('#roleTb', $el).dataTable(),
                                            vo = data.content.vo;
                                        roleTb.fnAddData([
                                                '<input type="checkbox" name="checkbox" id="' + vo.roleId  + '"/>',
                                                vo.roleId,
                                                vo.name,
                                                vo.createUser,
                                                vo.createTime,
                                                vo.updateTime,
                                                vo.state=="0"?"未启用":"启用",
                                                vo.remark
                                            ]);

                                        //重新绑定监听checkbox事件
                                        //listenCheckbox();

                                        //绑定双击事件
                                        dbClick();

                                        //更新
                                        roledata[vo.roleId] = vo;

                                        app.alert('创建角色', '角色：' + vo.name + ' 创建成功！',app.alertShowType.SUCCESS);
                                        context.hide();
                                    } else {
                                        app.alert('错误信息', data.errorMsg, 'msg');
                                    }
                                }, error: function (xhr, status, errMsg) {
                                    app.alert('错误' + status, errMsg, 'msg');
                                }
                            })
                        }

                    });
                },


                //角色关联操作权限
                RoleAccessCallback: function (context, $ele) {
                    var roleID = app.domain.get("role","roleID");
                    var zTreeObj;
                    var setting = {
                        view: {showLine: true},
                        data: {simpleData: {enable: true,idKey: "id",pIdKey: "pId",rootPId: 1}},
                        check: {
                            enable: true,
                            chkboxType: { "Y": "ps", "N": "s" }
                        },
                        view: {
                            showIcon: false
                        },
                        callback: {}
                    };
                    $.ajax({
                        "type": "post",
                        "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                        url: 'RoleManagerAction_loadAllAccess.do',
                        data: {"roleID":roleID},
                        shelter:'正在加载关联，请稍候…',
                        success: function (data) {
                            if (data.status) {
                                zTreeObj = $.fn.zTree.init($("#allAccessTree", $ele), setting, data.content.treeDatas);
                            }
                        }, error: function (xhr, status, errMsg) {
                            app.alert('错误' + status, errMsg, 'msg');
                        }
                    });

                    $('#roleAccessSmtBtn', $ele).click(function () {            //执行关联
                        var nodes = zTreeObj.getCheckedNodes(true);
                        var accessIDS = [];
                        for(var i in nodes){
                            accessIDS.push(nodes[i].remark);
                        }
                        $.ajax({
                            "type": "post",
                            "contentType": "application/x-www-form-urlencoded;charset=utf-8",
                            url: 'RoleManagerAction_doRoleRelevanceAccess.do',
                            shelter:'正在角色关联，请稍侯…',
                            data: {
                                roleID : roleID,
                                accessIDS : accessIDS.join(",")
                            },
                            success: function (data) {
                                if (data.status) {
                                    app.alert('角色关联权限', '关联权限成功！',app.alertShowType.SUCCESS);
                                    context.hide();
                                }
                            }, error: function (xhr, status, errMsg) {
                                app.alert('错误' + status, errMsg, 'msg');
                            }
                        })

                    });
                },

                //角色编辑
                roleEditCallback: function (context, $ele) {
                    //初始赋值
                    var role = app.domain.get("role","role");
                    $("#editroleid",$ele).val(role.roleId);
                    $("#editrolename",$ele).val(role.name);
                    $("#editstate",$ele).bootstrapSwitch({
                        'state':role.state=="1"?true:false
                    });
                    $("#editremark",$ele).val(role.remark);


                    $('#roleEditSmtBtn', $ele).click(function () {          //提交
                        var validateResult = app.validate.validate({
                            $context: $ele,
                            data: [{
                                id: "editroleid",
                                value: role.roleId,
                                filter: {}
                            },
                            {
                                id: "editstate",
                                value: $("#editstate", $ele).bootstrapSwitch('state')==true?"1":"0",
                                filter: {}
                            },
                            {
                                id: "editremark",
                                value: $("#editremark", $ele).val(),
                                filter: {}
                            }],
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
                                url: 'RoleManagerAction_doEditRole.do',
                                data: $.param(validateResult.oDatas),
                                shelter:'正在提交角色编辑，请稍侯…',
                                success: function (data) {
                                    if (data.status) {
                                        //删除原有数据
                                        //移除表内数据
                                        var roleTb = $('#roleTb', $el).dataTable();

                                        var roleList = insSelComponent.list();
                                        insSelComponent.clear();
                                        for (var role in roleList) {
                                            roleTb.fnDeleteRow(roleTb.fnGetPosition(roleList[role].parent));
                                        }

                                        /*for (var role in roleSelected) {
                                            roleTb.fnDeleteRow(roleTb.fnGetPosition(roleSelected[role][0]));
                                        }*/

                                        var vo = data.content.vo;
                                        roleTb.fnAddData([
                                                '<input type="checkbox" name="checkbox" id="' + vo.roleId  + '"/>',
                                                vo.roleId,
                                                vo.name,
                                                vo.createUser,
                                                vo.createTime,
                                                vo.updateTime,
                                                vo.state=="0"?"未启用":"启用",
                                                vo.remark
                                            ]);

                                        //重新绑定监听checkbox事件
                                        //listenCheckbox();

                                        //绑定双击事件
                                        dbClick();

                                        //更新userdata中数据
                                        roledata[vo.roleID] = vo;

                                        app.alert('修改角色', '角色修改成功！',app.alertShowType.SUCCESS);
                                        context.hide();
                                    } else {
                                        app.alert('错误信息', data.errorMsg, 'msg');
                                    }
                                }, error: function (xhr, status, errMsg) {
                                    app.alert('错误' + status, errMsg, 'msg');
                                }
                            })
                        }
                    });
                }
            };




            //修改角色
            $('#roleUpdBtn', $el).click(function () {
                if(insSelComponent.selectSize()==1){           //当编辑按钮能使用时
                    var roleId = $('input:checkbox[name="checkbox"]:checked',$tbody)[0].id;
                    var role = roledata[roleId];
                    app.domain.exports('role',{'role': role});
                    app.formControl.set('修改角色', $('#roleEditTemp').html(), handler.fn.roleEditCallback);
                    app.formControl.show();
                }else if(insSelComponent.selectSize()==0){
                    app.alert("角色管理",'请先选择需要修改的角色！', app.alertShowType.WARNING);
                }else{
                    app.alert("角色管理",'只能修改单个角色', app.alertShowType.WARNING);
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
            /*数据加载*/
            //设置创建的页面
            app.formControl.set('创建角色', $('#roleCreTemp').html(), handler.fn.formControlCallback);
        }

    };
});