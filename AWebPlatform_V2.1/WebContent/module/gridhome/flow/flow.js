define([ "jquery" ], function() {
	var FlowTable, StatisticsTable;
	return {

		// 模块加载结束后，会触发该方法
		load : function($el, scope, handler) {
			
			var loopTime = parseInt($('#loopTime', $el).val())*60*1000;//统计数据轮询时间
			var statisticIntervalId; //所有交易统计定时器
			//按应用、交易、渠道统计交易数据表格参数
			var tbOption = {
					'bStateSave': true,
					"bSort": true,
	                "aaSorting": [[0, 'desc']],
	                'bInfo': false,
	                'bDestroy': true,
	                "fnDrawCallback":function(){
						$('[data-role=statisticsTb] tbody tr td',$el).each( function() {
							this.setAttribute( 'title', this.innerHTML );
						} );
						$('[data-role=statisticsTb] thead tr th',$el).each( function() {
							this.setAttribute( 'title', this.innerHTML );
						} );
					},
	                'aoColumns':[
	                             { "sTitle": "应用代码" },
	                             { "sTitle": "系统处理总笔数" },
	                             { "sTitle": "系统成功处理笔数" },
	                             { "sTitle": "业务处理总笔数" },
	                             { "sTitle": "业务处理成功笔数" },
	                             { "sTitle": "最大处理时间（毫秒）" },
	                             { "sTitle": "最小处理时间（毫秒）" },
	                             { "sTitle": "平均处理时间（毫秒）" },
	                             { "sTitle": "系统处理成功率（%）" },
	                             { "sTitle": "系统处理失败率（%）" },
	                             { "sTitle": "业务处理成功过率（%）" },
	                             { "sTitle": "业务处理失败率（%）" }
	                             ]
			};
			

			
			/*全口径交易流水封装*/
			FlowTable = app.FlowTable({
				$context: $el,
				handler: handler,
				tableSelector: '#flowTb',//交易流水表格容器
				getAllFlowConfigDespUrl: 'FlowConfigAction_getAllFlowConfigDesp.do',//获取字段对应中文名的所有配置
				getFlowConfigColorUrl: 'FlowConfigAction_getFlowConfigColor.do',//获取错误返回码errorcode对应内容颜色配置
			    getFlowConfigFilterUrl: 'FlowConfigAction_getFlowConfigFilter.do',//获取字段过滤配置的url
				getFlowUrl: 'FlowConfigAction_getFlowInfo.do',//从后台采集数据的Url
				getFlowUrlParams: {},//从后台采集数据的请求参数
				flowConfigQuery: {'channelcode':'', 'mc':'', 'tc':'','tradestatus':''},//多维度条件查询
				scrollDirection: "upToDown",//滚屏方向,默认自上而下(upToDown)/自下而上（downToUp）
				pageSize: 10,//默认页面显示条数。
				maxCapacity: 5000,//交易流水缓存最大容量  。
				rollingSpeed: 1000,//滚屏速度
				midCapacity: 3000,//达到该值时，需加快滚屏速度为rollingFastSpeed。
				rollingFastSpeed: 100,//达到midCapacity值时，加快滚屏的速度，单位毫秒。
				flowObtainTime: 5000//从后台采集交易流水的时间间隔，单位毫秒。
			});
			//按应用、交易、渠道统计交易数据
			StatisticsTable = app.StatisticsTable({
				$context: $el,
				handler: handler,
				tableSelector: '[data-role=statisticsTb]',//按应用，渠道，交易的统计数据表格容器
				tableOption: tbOption,//表格option
				getStatisticsUrl:'FlowConfigAction_getStatistics.do',//获取统计数据Url
				getStatisticsParam:{filterType: 'mcType'},//获取统计数据的请求参数，初始化时给定一个条件
				pollingTime: loopTime //统计数据更新时间间隔
			});
			
			StatisticsTable.init();
			
			FlowTable.start();
			//按全口径的统计数据
			allStatisticsData();
			statisticIntervalId = handler.setInterval(allStatisticsData, loopTime);
			
			function allStatisticsData(){
				$.ajax({
					'type': 'post',
					'dataType': 'json',
					'url': 'FlowConfigAction_getStatistics.do',
					'data': {},
					'success':function(data){
						if(data.status){
							var statistics = data.content.statistics;
							var aaData = [];
							for(var i = 0; i < statistics.length; i++){
								var obj = statistics[i];
								$('#sysAllCount', $el).val(obj.sysAllCount);
								$('#sysSucCount', $el).val(obj.sysSucCount);
								$('#busiAllCount', $el).val(obj.busiAllCount);
								$('#busiSucCount', $el).val(obj.busiSucCount);
								$('#maxExecutedTime', $el).val(obj.maxExecutedTime+"（毫秒）");
								$('#minExecutedTime', $el).val(obj.minExecutedTime+"（毫秒）");
								$('#avgExecutedTime', $el).val(obj.avgExecutedTime+"（毫秒）");
							}
							
						}else{
							app.alert('获取数据', '统计数据获取失败，'+data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
						}
					}
				});
			}
			
			this.delegateEvents({
				/*点击配置事件*/
				'click #pageConfigBtn':function (event) {
					FlowTable.initParams();//重新从数据库中获取初始数据，因为扩展字段可能发生了变化
					$('[data-role=pageConfigTemp]' , $el).modal('show');
					var headDatas = FlowTable.getHeadDatas();
					var flowConfigFilter = FlowTable.getFlowConfigFilter();
					var headDesp = FlowTable.getFlowConfigDesp();
					var scrollDirection = FlowTable.getScrollDirection();
					var errorCodeColor = FlowTable.getFlowConfigColor();
					var pageSize = FlowTable.getPageSize();
					var maxCapacity = FlowTable.getMaxCapacity();
					var midCapacity = FlowTable.getMidCapacity();
					var flowConfigQuery = FlowTable.getFlowConfigQuery();
					//字段显隐
					$('#displayList', $el).empty();
					for(var columnName in headDesp){
						var columnDesp = headDesp[columnName];
						$('#displayList', $el).append('<tr class="tr-hover-bg"><td style="width: 300px; padding-left: 20px">'+columnDesp+'</td><td><input id ="'+columnName+'_display" type="checkbox" checked data-inner-switcher="true"></input></td></tr>');
						if(headDatas.indexOf(columnName) != -1){
							$("#"+columnName+'_display', $el).bootstrapSwitch({
								'state': true 
							});
						}else{
							$("#"+columnName+'_display', $el).bootstrapSwitch({
								'state': false 
							});
						}
					}
					
					//非扩展字段中文名
					$.ajax({
						'type': 'post',
						'dataType': 'json',
						'url': 'FlowConfigAction_getFlowConfigDesp.do',
						'data': {},
						'success':function(data){
							if(data.status){
								var flowConfigDespList = data.content.flowConfigDespList;
								$('#despList', $el).empty();
								for(var i  = 0; i < flowConfigDespList.length; i++ ){
									var configObj = flowConfigDespList[i];
									var columnName = configObj.columnName;
									var columnDesp = configObj.columnDesp;
									$('#despList', $el).append('<tr class="tr-hover-bg"><td style="width: 300px; padding-left: 20px">'+columnName+'</td><td><input id ="'+columnName+'_desp" type="text" value="'+columnDesp+'"></input></td></tr>');
								}
							}else{
								app.alert('配置', data.errorMsg, app.alertShowType.ERROR);
							}
						}
					});
					
					//返回码颜色配置
					$('#colorList', $el).empty();
					for(var errorCode in errorCodeColor){
						var rowColor = errorCodeColor[errorCode];
						$('#colorList', $el).append('<tr class="tr-hover-bg"><td style="width: 300px; padding-left: 20px"><input type="text" value="'+errorCode+'"/></td><td><input type="text" value="'+rowColor+'"></input><small><i class="fa  fa-minus-circle colorConfig buildingColor"></i></small></td></tr>');
						$(".fa-minus-circle.colorConfig", $el).click(function(){//点击删除当前返回码颜色配置项事件绑定
							var $tr = $(this).closest('tr');
							$($tr[0]).remove();//删除当前行
						});
					}
					
					//字段内容过滤
					$('#filterList', $el).empty();
					for(var filterKey in flowConfigFilter){
						var filterDataArr = flowConfigFilter[filterKey];
						var columnDesp = headDesp[filterKey]!==undefined ? headDesp[filterKey] : filterKey;
						$('#filterList', $el).append('<tr class="tr-hover-bg"><td style="width: 300px; padding-left: 20px"><input type="text" value="'+filterKey+'"/></td><td><input type="text" value="'+filterDataArr.join('@')+'"></input><small><i class="fa  fa-minus-circle filterConfig buildingColor"></i></small></td></tr>');
						$(".fa-minus-circle.filterConfig", $el).click(function(){//点击删除当前返回码颜色配置项事件绑定
							var $tr = $(this).closest('tr');
							$($tr[0]).remove();//删除当前行
						});
					}
					
					//其他配置
					$("#scrollDirection option[value="+scrollDirection+"]").attr("selected",true);
					$('#pageSize', $el).val(pageSize);
					$('#maxCapacity', $el).val(maxCapacity);
					$('#midCapacity', $el).val(midCapacity);
					//查询条件
					for(var key in flowConfigQuery){
						if(key === 'mc'){
							$('#queryMc', $el).val(flowConfigQuery[key]);
						}else if(key === 'tc'){
							$('#queryTc', $el).val(flowConfigQuery[key]);
						}else if(key === 'channelcode'){
							$('#queryChannelCode', $el).val(flowConfigQuery[key]);
						}else if(key === 'tradestatus'){
							$('#queryTradeStatus', $el).val(flowConfigQuery[key]);
						}
					}
					
				},
				/*点击确定配置修改事件*/
				'click #setPageConfigBtn':function (event) {
					var headDesp = FlowTable.getFlowConfigDesp();
					var headDatas = FlowTable.getHeadDatas();
					var flowConfigFilter = {};
					var pageSize = $('#pageSize', $el).val();
					var maxCapacity = $('#maxCapacity', $el).val();
					var midCapacity = $('#midCapacity', $el).val();
					var scrollDirection = $('#scrollDirection', $el).val();
					var errorCodeColor = {};
					
					//返回码颜色配置获取
					$.each($("#colorList", $el).children(),function(n, value) { 
						var errorCode = $.trim($($(value).find('input')[0]).val());
						var rowColor = $.trim($($(value).find('input')[1]).val());
						if(errorCode && errorCode !="" && rowColor && rowColor !=""){
							if(errorCodeColor[errorCode]){
								app.alert('','存在重复的返回码：“'+errorCode+"”，覆盖前面配置的返回码",app.alertShowType.WARINING);
							}
							errorCodeColor[errorCode]= rowColor;
						}
					});
					
					//字段过滤内容获取
					$.each($("#filterList", $el).children(),function(n, value) { 
						var columnName = $.trim($($(value).find('input')[0]).val());
						var filterContent = $.trim($($(value).find('input')[1]).val());
						if(columnName && columnName !="" && filterContent && filterContent !=""){
							if(flowConfigFilter[columnName]){
								app.alert('','存在重复的字段名：“'+columnName+"”，覆盖前面配置的字段名",app.alertShowType.WARINING);
							}
							flowConfigFilter[columnName]= filterContent.split("@"); ;
						}
					});
					
					if(!/^\d+$/.test(pageSize)){
						app.alert('提示', "页面显示条数，请输入整数值！", app.alertShowType.ERROR,app.alertMsgType.WARNING);
						return;
					}
					if(!/^\d+$/.test(maxCapacity)){
						app.alert('提示', "缓存最大容量，请输入整数值！", app.alertShowType.ERROR,app.alertMsgType.WARNING);
						return;
					}
					if(!/^\d+$/.test(midCapacity)){
						app.alert('提示', "达到容量加快滚屏速度，请输入整数值！", app.alertShowType.ERROR,app.alertMsgType.WARNING);
						return;
					}
					
					//字段显隐
					var headDisplays = {};
					for(var headKey in headDesp){
						var state = $("#"+headKey+'_display', $el).bootstrapSwitch('state');
						headDisplays[headKey] = state+"";
					}
					
					//确定中文名配置按钮
					for(var headKey in headDesp){
						var headDespName = $("#"+headKey+'_desp', $el).val();
						if(headDespName){
							headDesp[headKey]= headDespName;
						}
					}
					var notExpandHeadDesp = headDesp;
					$.ajax({
						'type': 'post',
						'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
						'url': './FlowConfigAction_setFlowConfigDesp.do',
						'dataType': 'json',
						'data': {
							'flowConfigDesp': JSON.stringify(headDesp),
							'flowConfigDisplay': JSON.stringify(headDisplays)
						},
						'success': function (data) {
							if(data.status){
								//返回码颜色配置
								$.ajax({
									'type': 'post',
									'dataType': 'json',
									'url': 'FlowConfigAction_setFlowConfigColor.do',
									'data': {
										'flowConfigColor':JSON.stringify(errorCodeColor)
									},
									'success':function(data){
										if(data.status){
											//过滤字段配置
											$.ajax({
												'type': 'post',
												'dataType': 'json',
												'url': 'FlowConfigAction_setFlowConfigFilter.do',
												'data': {
													'flowConfigFilter':JSON.stringify(flowConfigFilter)
												},
												'success':function(data){
													if(data.status){
														//从数据库中更新配置
														FlowTable.initParams();
													}else{
														app.alert('配置', data.errorMsg, app.alertShowType.ERROR);
													}
												}
											});
										}else{
											app.alert('配置', data.errorMsg, app.alertShowType.ERROR);
										}
									}
								});
								
							}else{
								app.alert('配置', data.errorMsg, app.alertShowType.ERROR);
							}
						}
					});
					var flowConfigQuery = {};
					console.log( $('#queryMc', $el).val());
					flowConfigQuery['mc'] = $.trim($('#queryMc', $el).val());
					flowConfigQuery['tc'] = $.trim($('#queryTc', $el).val());
					flowConfigQuery['channelcode'] = $.trim($('#queryChannelCode', $el).val());
					flowConfigQuery['tradestatus'] = $.trim($('#queryTradeStatus', $el).val());
					FlowTable.updFlowConfigQuery(flowConfigQuery);
					FlowTable.updPageSize(pageSize);
					FlowTable.updMaxCapacity(maxCapacity);
					FlowTable.updMidCapacity(midCapacity);
					//滚屏方向
					FlowTable.updScrollDirection(scrollDirection);
					
					$('[data-role=pageConfigTemp]' , $el).modal('hide');
				},
				
				/*添加返回码颜色配置项*/
				'click .fa-plus-circle.color': function(){
					$('#colorList', $el).append('<tr class="tr-hover-bg"><td><input type="text"/></td><td><input type="text"/><small><i class="fa  fa-minus-circle colorConfig buildingColor"></i></small></td></tr>');
					$(".fa-minus-circle.colorConfig", $el).click(function(){//点击删除当前返回码颜色配置项事件绑定
						var $tr = $(this).closest('tr');
						$($tr[0]).remove();//删除当前行
					});
				},
				/*添加字段过滤内容配置项*/
				'click .fa-plus-circle.filter': function(){
					$('#filterList', $el).append('<tr class="tr-hover-bg"><td><input type="text"/></td><td><input type="text"/><small><i class="fa  fa-minus-circle filterConfig buildingColor"></i></small></td></tr>');
					$(".fa-minus-circle.filterConfig", $el).click(function(){//点击删除当前字段过滤内容配置项事件绑定
						var $tr = $(this).closest('tr');
						$($tr[0]).remove();//删除当前行
					});
				},
				/*添加扩展字段配置项*/
				'click .fa-plus-circle.expand': function(){
					$('#expandList', $el).append('<tr class="tr-hover-bg"><td><input type="text"/></td><td><input type="text"/><small><i class="fa  fa-minus-circle expandConfig buildingColor"></i></small></td></tr>');
					$(".fa-minus-circle.expandConfig", $el).click(function(){//点击删除当前扩展字段配置项事件绑定
						var $tr = $(this).closest('tr');
						$($tr[0]).remove();//删除当前行
					});
				},
				/*扩展字段配置点击事件*/
				'click #expandConfigBtn':function (event) {
					$('[data-role=expandConfigTemp]' , $el).modal('show');
					
					$.ajax({
						'type': 'post',
						'dataType': 'json',
						'url': 'FlowConfigAction_getExpandFlowConfigDesp.do',
						'data': {},
						'success':function(data){
							if(data.status){
								var flowConfigDespList = data.content.flowConfigDespList;
								$('#expandList', $el).empty();
								for(var i  = 0; i < flowConfigDespList.length; i++ ){
									var configObj = flowConfigDespList[i];
									var columnName = configObj.columnName;
									var columnDesp = configObj.columnDesp;
									$('#expandList', $el).append('<tr class="tr-hover-bg"><td style="width: 300px; padding-left: 20px"><input type="text" value="'+columnName+'"/></td><td><input type="text" value="'+columnDesp+'"></input><small><i class="fa  fa-minus-circle expandConfig buildingColor"></i></small></td></tr>');
									$(".fa-minus-circle.expandConfig", $el).click(function(){//点击删除当前返回码颜色配置项事件绑定
										var $tr = $(this).closest('tr');
										$($tr[0]).remove();//删除当前行
									});
								}
							}else{
								app.alert('配置', data.errorMsg, app.alertShowType.ERROR);
							}
						}
					});
					
				},
				/*扩展字段配置确定事件*/
				'click #setExpandConfigBtn':function (event) {
					
					var expandHeadDesp = {};
					$.each($("#expandList", $el).children(),function(n, value) { 
						var columnName = $.trim($($(value).find('input')[0]).val());
						var columnDesp = $.trim($($(value).find('input')[1]).val());
						if(columnName && columnName !="" && columnDesp && columnDesp !=""){
							if(expandHeadDesp[columnName]){
								app.alert('','存在重复的扩展字段名：“'+columnName+"”，覆盖前面配置的扩展字段名",app.alertShowType.WARINING);
							}
							expandHeadDesp[columnName]= columnDesp;
						}
					});
					$.ajax({
						'type': 'post',
						'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
						'url': './FlowConfigAction_setExpandFlowConfigDesp.do',
						'dataType': 'json',
						'data': {
							'flowConfigDesp': JSON.stringify(expandHeadDesp)
						},
						'success': function (data) {
							if(data.status){
								FlowTable.initParams();
								app.alert('配置', "扩展字段配置成功", app.alertShowType.SUCCESS);
							}else{
								app.alert('配置', data.errorMsg, app.alertShowType.ERROR);
							}
						}
					});
					
					$('[data-role=expandConfigTemp]' , $el).modal('hide');
				},
				'change #selectType': function(){
					var selectType = $('#selectType', $el).val();
					var selectName = {'01000':'应用代码','00100':'交易代码','10000':'交易所属渠道'};
					if(selectType !== '00000'){
						$('#allFlowCtn', $el).addClass('hide');
						$('#statisticsCtn', $el).removeClass('hide');
						$('[data-role=configCtn]', $el).addClass('hide');
						StatisticsTable.setStatisticsParam({filterType:selectType});
						tbOption.aoColumns[0]={ "sTitle": selectName[selectType] };
						StatisticsTable.setTableOption(tbOption);
						StatisticsTable.init();
						/*可以移动*/
						var colResizeTable = app.colResizeTable({
			                $table:$('[data-role=statisticsTb]', $el),
			                $context: $el,
			                isDataTable:true,
			                isSave:true
			            });
			            app.contentCtnResize.add(handler.uid,function(){
			                colResizeTable.resize();
			            });
					}else{
						$('#statisticsCtn', $el).addClass('hide');
						$('#allFlowCtn', $el).removeClass('hide');
						$('[data-role=configCtn]', $el).removeClass('hide');
					}
				},
				'change #loopTime': function(){
					var newLoopTime = parseInt($('#loopTime', $el).val())*60*1000;
					if(statisticIntervalId){//更新全口径统计的轮询时间
						handler.clearInterval(statisticIntervalId);
						statisticIntervalId = handler.setInterval(allStatisticsData, newLoopTime);
					}
					StatisticsTable.updatePolling(newLoopTime);//更新按应用或交易或渠道的统计轮询时间
				}
			});
		},

		// 模块销毁前触发
		unload : function(handler) {
			if(FlowTable){
				console.log('取消交易流水订阅');
				FlowTable.cancelSubscibe();//取消订阅
				FlowTable = null;
				delete FlowTable;
			}
			if(StatisticsTable){
				StatisticsTable.destroy();//销毁
				StatisticsTable = null;
				delete StatisticsTable;
			}
		},
		// 暂停
		pause : function($el, scope, handler) {
			
		},
		// 恢复
		resume : function($el, scope, handler) {
			if(FlowTable){
				//FlowTable.emptyRowFlowDatas();//恢复时清空交易缓存内容,以滚动最新的交易流水信息
			}
		}

	};
});