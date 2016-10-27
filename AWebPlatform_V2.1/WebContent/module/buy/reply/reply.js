define([ "jquery" ], function() {
     return {

	        load : function($el, scope, handler) {
	        	console.log("页面加载时，进入了load方法");
			
				$('.reply',$el).click(function(){
					 $('#userRoleTemp').modal('show');
				})
				$('.shownopass',$el).hide();
				$('.showpass_small',$el).hide();
				$('#pass',$el).click(function(){
					$('.shownopass',$el).hide();
					$('.showpass',$el).show();
				});
				$('#nopass',$el).click(function(){
					$('.shownopass',$el).show();
					$('.showpass',$el).hide();
				})
				$('#big',$el).click(function(){
					$('.showpass_small',$el).hide();
					$('.showpass_big',$el).show();
				});
				$('#small',$el).click(function(){
					$('.showpass_small',$el).show();
					$('.showpass_big',$el).hide();
				});
				$('#datetimePickerExample',$el).datetimepicker({
				    format: 'yyyy-mm-dd'
				});
				$('#datetimePickerExample2',$el).datetimepicker({
				    format: 'yyyy-mm-dd'
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