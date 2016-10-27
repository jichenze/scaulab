define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {
			this.delegateEvents({
				'click #addCtn': function(){
					$(this).before('<div class="workspace-module"></div>');
				}
			});
		},
		unload : function(handler) {
			
		},
		pause : function($el, attr, handler) {
			
		},
		resume : function($el, attr, handler) {
			
		}
	};
});