define([ "jquery" ], function() {
        return {

        load : function($el, scope, handler) {
        	console.log("页面加载时，进入了load方法");
        	$('.yuyue_detail',$el).click(function(){
				 $('#yuyuedtail').modal('show');
			});
			$('.yuyueshownopass',$el).hide();
			$('.yuyueshowpass_small',$el).hide();
			$('#yuyuepass',$el).click(function(){
				$('.yuyueshownopass',$el).hide();
				$('.yuyueshowpass',$el).show();
			});
			$('#yuyuenopass',$el).click(function(){
				$('.yuyueshownopass',$el).show();
				$('.yuyueshowpass',$el).hide();
			})
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