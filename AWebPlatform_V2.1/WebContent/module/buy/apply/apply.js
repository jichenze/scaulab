define([ "jquery" ], function() {
        return {

        load : function($el, scope, handler) {
        	console.log("页面加载时，进入了load方法");
			this.delegateEvents({
                'click [data-role^=formControl]':function(){
                    switch($(this).attr('data-role')) {
                        case 'formControlShow1':
			                app.formControl.set('申请单', $('[data-role="formControlTemp1"]', $el).html(), function (context, $form) {
			                    //提交按钮事件绑定
			                    $('#formControlSmtBtn',$form).click(function(){
			                    	if($(".applybuyName").val()==""||$(".applybuyNum").val()==""||$(".applyId").val()==""||$(".applyName").val()==""||$(".applyPhone").val()==""||$(".applybuyWhy").val()==""){
			                    		alert("请填写完整申请单");
			                    	}else{
				                    	$.ajax({
				                    		"type": "post",
				                    		"contentType": "application/x-www-form-urlencoded;charset=utf-8",
				                    		"url":'CaigouAction_shenQing.do',
				                    		"dataType": "json",
				                    		"data":{
				                    			cgname:$("#cgname").val(),	
				                    			cgpid:$("#cgpid").val(),		
				                    			cgnumber:$("#cgnumber").val(),
				                    			cgwpname:$("#cgwpname").val(),
				                    			cgwpsl:$("#cgwpsl").val(),	
				                    			cgyy:$("#cgyy").val()
				                    		},
				                    		shelter: '正在提交申购单，请稍侯…',
				                    		success:function(){
				                    			alert("提交成功");
				                    			app.formControl.hide();
				                    		},
				            				error: function (xhr, status, errMsg) {
				            					alert('错误' + status, errMsg, 'msg');
				            				}
				                    	});				                    	
				                    	
			                    	}
			                    });
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