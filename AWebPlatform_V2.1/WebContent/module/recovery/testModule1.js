define([ "jquery" ], function() {
        return {

        load : function($el, scope, handler) {
        	alert("页面加载时，进入了load方法");
this.delegateEvents({
				
				//查询事件
				'click #eventBtn':function(resp){
					
					alert("您点击了提交按钮");
				}
				
			});
        },

		unload : function(handler) {
			alert("页面关闭时，进入了unload方法");
		},
		
		pause : function($el, scope, handler) {
			alert("页面未关闭，但是打开了另一个页面，进入了pause方法");
		},
		
		resume : function($el, scope, handler) {
			alert("重新进入页面，进入了resume方法");
		}
	};
});