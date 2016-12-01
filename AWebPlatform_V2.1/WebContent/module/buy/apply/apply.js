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
			                    	app.domain.exports("studentbuybiao",{
			                    		"studentbuyname":$(".applybuyName").val(),
		                    			"studentbuynum":$(".applybuyNum").val(),
		                    			"studentid":$(".applyId").val(),
		                    			"studentname":$(".applyName").val(),	
		                    			"studentphone":$(".applyPhone").val(),
		                    			"studentuse":$(".applybuyWhere").val(),	
		                    			"studentwhy":$(".applybuyWhy").val()
		                    		});
//			                    	$.ajax({
//			                    		url:'http://rap.taobao.org/mockjsdata/10584/sumitstudentbuy',
//			                    		data:{
//			                    			studentbuyname:1,
//			                    			studentbuynum:1,
//			                    			studentid:1,
//			                    			studentname:1,	
//			                    			studentphone:1,
//			                    			studentteacher:1,
//			                    			studentuse:1,	
//			                    			studentwhy:1
//			                    		},
//			                    		success:function(){
//			                    			alert("ok")
//			                    		}
//			                    	})
			                    	app.formControl.hide();
			                    	alert("提交成功")
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