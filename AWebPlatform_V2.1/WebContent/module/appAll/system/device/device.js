define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {
			
            //系统列表获取
            var $systemListCtn = $('[data-role=systemListCtn]', $el);
            for(var i = 0; i < 15; i++){
            	var temp = '<div class="appall-system-ctn-detail"></div>';
            	$systemListCtn.append(temp);
            }
            
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});