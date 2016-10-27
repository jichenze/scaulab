define([ "jquery" ], function() {
	
	var global = {};
	
	return {

		// 模块加载结束后，会触发该方法
		load : function($el, scope, handler) {
			var grid = new app.Grid($("#homeGrid", $el), $("#template", $el).clone()), 
				$cell, 
				gridConf = new Array(9), 
				_this = this;
			
			grid.config({
				"fileSystem": {
					"title": "文件系统监控", 
					"subscribe": false, 
					"appType": "host.fileSystem.request", 
					"path": "/gridhome/fileSystem/grid"
				}, 
				"cpu": {
					"title": "CPU监控", 
					"subscribe": false, 
					"appType": "host.cpu.request", 
					"path": "/gridhome/cpu/grid"
				}, 
				"swap": {
					"title": "内存监控", 
					"subscribe": false, 
					"appType": "host.swap.request", 
					"path": "/gridhome/swap/grid"
				}, 
				"flow": {
					"title": "交易流水监控", 
					"subscribe": true, 
					"appType": "host.flow.request", 
					"path": "/gridhome/flow/grid"
				}
			});
			
			//根据配置，生成添加页面的topic选项
			for (var key in grid.items) {
				var item = grid.items[key];
				$("#topicSel", $el).append('<option data-type="' + key + '" value="' + 
						item.appType + '" subscribe=' + item.subscribe + '>' + item.title + '</option>');
			}
			
			//查询已经配置过的单元格
			$.ajax({
				"type": "POST",
				"url": "GridOperAction_queryContent.do",
				"success": function (data) {
					if (data.status && data.content.gridConf) {
						gridConf = data.content.gridConf
					}
					for (var i = 0; i < gridConf.length; i++) {
						var itemConf = gridConf[i];
						$cell = $(".row-fluid>div[data-index=" + i + "]");
						
						if (itemConf && itemConf.topic) {
							grid.bind($cell, grid.items[itemConf.topic], {
								"target": itemConf.agent, 
								"appType": grid.items[itemConf.topic].appType
							}, (function ($c) {
								return function () {
									var index = $c.data("index"), 
										$add = $('<a href="#" data-toggle="click">添加</a>');
									gridConf[index] = undefined;
									
									updateContent();
									$add.click(function () {
										$("#selectModal", $el).modal("show");
										
										$cell = $(this).parent();
									});
									$c.append($add);
								}
							})($cell));
						} else {
							$cell.append('<a href="#" data-toggle="click">添加</a>');
						}
					}
					
					delegateEvents.call(_this);
					
					global.grid = grid;

                    /*app.contentCtnResize.add(handler.uid,function(){
                        grid.resize();
                    });*/
				}
			});
			
			function delegateEvents() {
				this.delegateEvents({
					"click [data-toggle=click]": function () {
						$("#selectModal", $el).modal("show");
						
						$cell = $(this).parent();
					}, 
					
					"click #closeBtn": function () {
						$("#selectModal", $el).modal("hide");
					}, 
					
					"click #saveBtn": function () {
						var dataType = $("#topicSel option:selected", $el).attr("data-type"), 
							appType = $("#topicSel", $el).val(), 
							agent = $("#agentSel", $el).val(), 
							index = $cell.data("index");
						
						$cell.empty();
						$("#selectModal", $el).modal("hide");
						grid.bind($cell, grid.items[dataType], {
							"target": agent, 
							"appType": appType
						}, (function ($c) {
							return function () {
								var index = $c.data("index"), 
									$add = $('<a href="#" data-toggle="click">添加</a>');
								gridConf[index] = undefined;
								
								updateContent();
								$add.click(function () {
									$("#selectModal", $el).modal("show");
									
									$cell = $(this).parent();
								});
								$c.append($add);
							}
						})($cell));
						
						gridConf[index] = {
							"topic": dataType, 
							"agent": agent
						};
						
						updateContent();
					}, 
					
					"change #topicSel": function () {
						if ($(this).find("option:selected").attr("subscribe") === "true") {
							$("#agentSel, #agentLabel", $el).hide();
						} else {
							$("#agentSel, #agentLabel", $el).show();
						}
					}
				});
			}
			
			function updateContent() {
				$.ajax({
					"type": "POST",
					"url": "GridOperAction_updateContent.do", 
					"data": {
						gridConf: JSON.stringify(gridConf)
					}
				});
			}
		},

		// 模块销毁前触发
		unload : function(handler) {
			global.grid.destroy();
			//解绑resize函数
			//app.contentCtnResize.remove(handler.uid);
		},
		// 暂停
		pause : function($el, attr, handler) {
			global.grid.pause();
		},
		// 恢复
		resume : function($el, attr, handler) {
			global.grid.resume();
		}

	};
});