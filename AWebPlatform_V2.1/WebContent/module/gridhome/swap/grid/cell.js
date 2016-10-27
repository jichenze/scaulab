define([ "jquery" ], function() {
	var myChart,$hmCell;
	return {

		// 模块加载结束后，会触发该方法
		load : function($el, scope, handler) {
			$hmCell = $("#main", $el);
			myChart = echarts.init($hmCell[0], "infographic");
			function initChart() {
				var option = {
					title : {
						text : '内存监控', 
						x : 'center'
					},
					legend : {
						data : [ 'swap'], 
						x : 'left'
					},
					toolbox : {
						show : false
					},
					calculable : true,
					xAxis : [{
						type : 'category',
						data : [ '10:10', '10:12', '10:14', '10:16', '10:18', '10:20', '10:22' ]
					}],
					yAxis : [{
						type : 'value', 
						min: 0, 
						max: 100
					}],
					series : [{
						name : 'swap',
						type : 'bar',
						data : [ parseInt(Math.random() * 80), parseInt(Math.random() * 80), parseInt(Math.random() * 80), parseInt(Math.random() * 80), 
						         parseInt(Math.random() * 80), parseInt(Math.random() * 80), parseInt(Math.random() * 80) ], 
						markLine : {
							data : [{
								type : 'average',
								name : '平均值'
							}]
						}
					}]
				};
					
				myChart.setOption(option);
				
				handler.setTimeout(function () {
					addData();
				}, 2000);
			}
			
			function addData() {
				myChart.addData(0, parseInt(Math.random() * 80), false, false);
				handler.setTimeout(function () {
					addData();
				}, 2000);
			}
			
			initChart();
		},

		// 模块销毁前触发
		unload : function(handler) {
			console.log("unload");
		},
		// 暂停
		pause : function($el, scope, handler) {
			console.log("pause");
		},
		// 恢复
		resume : function($el, scope, handler) {
			console.log("resume");
		},
		resize: function ($el) {
			console.log($el.width());
			$hmCell.css({
				width: $el.width()
			});
			myChart.resize();
		}
	};
});