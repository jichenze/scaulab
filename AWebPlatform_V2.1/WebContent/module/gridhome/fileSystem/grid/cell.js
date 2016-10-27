define([ "jquery" ], function() {
	var myChart,$hmCell,refreshTimeHandler;
	return {

		// 模块加载结束后，会触发该方法
		load : function($el, scope, handler) {
			$hmCell=$("#main", $el);
				var option = {
					title : {
						text : '文件系统',
						x : 'center'
					},
					tooltip : {
						trigger : 'item',
						formatter : "{a} <br/>{b} : {c} ({d}%)"
					},
					legend : {
						orient : 'vertical',
						x : 'left',
						data : [ '空闲空间', '已用空间']
					},
					toolbox : {
						show : false
					},
					calculable : true,
					series : [{
						name : "/data",
						type : 'pie',
						radius : '55%',
						center : [ '50%', '60%' ],
						data : [
							{value : Math.random() * 50,name : '空闲空间'},
							{value : Math.random() * 50,name : '已用空间'}
						]
					}]
				};
			//动态更新数据
			function refreshPieData() {
				handler.setInterval(function() {
					myChart.setOption({
						animation: false,//禁用动态效果
						series: [{
							data: [
								{value: Math.random() * 50, name: '空闲空间'},
								{value: Math.random() * 50, name: '已用空间'}
							]
						}]
					});
				},5000);
			}
			//初始化饼状图的echarts对象,并设置主题
			myChart=echarts.init($hmCell[0],echarts.config.skin.MACARONS);
			myChart.setOption(option);
			//动态更新数据
			refreshPieData();
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
		//改变窗口大小时echart自适应
		resize: function ($el) {
			console.log($el.width());
			$hmCell.css({
				width: $el.width()
			});
			myChart.resize();
		}

	};
});