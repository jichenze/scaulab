define([ "jquery" ], function() {
        return {

        load : function($el, scope, handler) {
        	console.log("页面加载时，进入了load方法");
			this.delegateEvents({

//				'click [data-role=confirm]':function(){
//                    app.confirm({
//                        title:'确认',
//                        content:'是否确认提交申请单？',
//                        btnConfirm:'是',
//                        btnCancel:'否',
//                        confirmHandler:function(h){app.alert("提交成功")},
//                        cancelHandler:function(h,g){app.alert("放弃提交")},
//                        context:$('body')[0],
//                        args:['是','否']
//                    });
//                },
                'click [data-role^=formControl]':function(){
                    switch($(this).attr('data-role')) {
                        case 'formControlShow1_use':
			                app.formControl.set('预约单', $('[data-role="formControlTemp1_use"]', $el).html(), function (context, $form) {
			                    //提交按钮事件绑定
			                    $('#formControlSmtBtn',$form).click(function(){
			                        //提交信息的校验
			                        var validateResult = app.validate.validate({
			                            $context: $form,
			                            data: [{
			                                id: 'formControlInput',
			                                msg: '请在这里数据数据',//如果此处不填的话，将使用默认的错误提示信息
			                                filter: {
			                                    require: true
			                                }
			                            }, {
			                                id: 'formControlTextarea',
			                                filter: {
			                                    require: true
			                                }
			                            }],
			                            /*
			                            * 输入错误的返回
			                            * $el   输入框的jQuery对象
			                            * errMsg    错误信息
			                            * */
			                            errorCallback: function ($el, errMsg) {
			                                $el.closest('.control-group').addClass('error');
			                                $el.next().removeClass('hide').text(errMsg);
			                            },
			                            /*
			                             * 输入正确的返回
			                             * $el   输入框的jQuery对象
			                             * correctMsg    正确信息
			                             * */
			                            correctCallback: function ($el, correctMsg) {
			                                $el.closest('.control-group').removeClass('error');
			                                $el.next().addClass('hide');
			                            }
			                        });
			                    });
			
			                    //context.hide(); 隐藏
			                }).show();
			                break;
                        case 'formControlShow2_use':
			                app.formControl.set('申请单', $('[data-role="formControlTemp2_use"]', $el).html(), function (context, $form) {
			                    //提交按钮事件绑定
			                    $('#formControlSmtBtn',$form).click(function(){
			                        //提交信息的校验
			                        var validateResult = app.validate.validate({
			                            $context: $form,
			                            data: [{
			                                id: 'formControlInput',
			                                msg: '请在这里数据数据',//如果此处不填的话，将使用默认的错误提示信息
			                                filter: {
			                                    require: true
			                                }
			                            }, {
			                                id: 'formControlTextarea',
			                                filter: {
			                                    require: true
			                                }
			                            }],
			                            /*
			                            * 输入错误的返回
			                            * $el   输入框的jQuery对象
			                            * errMsg    错误信息
			                            * */
			                            errorCallback: function ($el, errMsg) {
			                                $el.closest('.control-group').addClass('error');
			                                $el.next().removeClass('hide').text(errMsg);
			                            },
			                            /*
			                             * 输入正确的返回
			                             * $el   输入框的jQuery对象
			                             * correctMsg    正确信息
			                             * */
			                            correctCallback: function ($el, correctMsg) {
			                                $el.closest('.control-group').removeClass('error');
			                                $el.next().addClass('hide');
			                            }
			                        });
			                    });
			
			                    //context.hide(); 隐藏
			                }).show();
			                break;   
                    }
                    }
			});
        },

		unload : function(handler) {
			console.log("页面关闭时，进入了unload方法");
		},
		
		pause : function($el, scope, handler) {
			console.log("页面未关闭，但是打开了另一个页面，进入了pause方法");
		},
		
		resume : function($el, scope, handler) {
			console.log("重新进入页面，进入了resume方法");
		}
	};
});