define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {
			
			var selectTitle = ['cpu','jvm'];
			Mycharts = new app.chartsCollection({
				$context: $el,
				handler: handler,
				selector: "#testChartsCtn",
				selectTitle:selectTitle,
				updateTime: 2000
			});
			Mycharts.showDatas();
            
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});