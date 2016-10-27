define([ "jquery" ], function() {
	var globalEcharts = {};//存储图表对象
	var tableObj ;
	return {
		load : function($el, scope, handler) {

			//表格
			var tableParams = {"classify":"cpu","showType":"table","state":"1"};
			tableObj = new app.showData.tableCollection({
				$context: $el,
				handler: handler,
				selector: "#testTableCtn",//图表外部容器
				//url:"./TestChartsAction_loadTable.do",
				urlParams:tableParams,//showType、state分别表示图表类型和图表类型的子类型，必填，其他字段再扩展添加
				updateTime: 2000
			});
			tableObj.start();
			if(tableParams.state === "0"){
				$('#loadTableBtn', $el).text("更改为分页表格");
			}else if(tableParams.state === "1"){
				$('#loadTableBtn', $el).text("更改为普通表格");
			}




			//三个灰色框中的图表，可切换
			var monLineEcharts = new app.showData.chartsCollection({
				$context: $el,
				handler: handler,
				selector: "[data-role=monLineCtn]",//图表外部容器
				//url:"./TestChartsAction_loadLine2.do",
				urlParams:{"classify":"cpu","showType":"pie","state":"0"},
				updateTime: 2000
			});
			monLineEcharts.start();
			globalEcharts.monLineEcharts = monLineEcharts;


			var servLineEcharts = new app.showData.chartsCollection({
				$context: $el,
				handler: handler,
				selector: "[data-role=servLineCtn]",//图表外部容器
				//url:"./TestChartsAction_loadLine.do",
				urlParams:{"classify":"cpu","showType":"line","state":"11"},
				updateTime: 2000
			});
			servLineEcharts.start();
			globalEcharts.servLineEcharts = servLineEcharts;

			var eventLineEcharts = new app.showData.chartsCollection({
				$context: $el,
				handler: handler,
				selector: "[data-role=eventLineCtn]",//图表外部容器
				//url:"./TestChartsAction_loadPie.do",
				urlParams:{"classify":"cpu","showType":"line","state":"02"},
				updateTime: 2000
			});
			eventLineEcharts.start();
			globalEcharts.eventLineEcharts = eventLineEcharts;



			/*初始化下拉框*/
			function initAllSel(){
				$('[data-role=classifySel]',$el).empty();
				$('[data-role=showTypeSel]',$el).empty();
				$('[data-role=stateSel]',$el).empty();
				$('[data-role=classifySel]',$el).append('<option value="">--请选择--</option>');
				$('[data-role=showTypeSel]',$el).append('<option value="">--请选择--</option>');
				$('[data-role=stateSel]',$el).append('<option value="">--请选择--</option>');
				//加载配置
				$.ajax({
					"type": "POST",
					"url": "ClassifyConfigAction_queryAllSubClassifys.do",
					"data": {},
					shelter:'正在加载数据，请稍候…',
					"success": function (data) {
						if (data.status) {
							var allSubClassifyList = data.content.allSubClassifyList;
							if(allSubClassifyList && allSubClassifyList.length>0){
								for(var i =0, len = allSubClassifyList.length; i < len; i++){
									$('[data-role=classifySel]',$el).append('<option value="'+allSubClassifyList[i]+'">'+allSubClassifyList[i]+'</option>');
								}
							}
						}
					}
				});
			}

			//三个灰色框中的图表的按钮事件
			this.delegateEvents({
				'click #monConfigBtn': function(){
					$('#myModal', $el).modal('show');
					app.domain.exports('echartsName',{'name':'monLineEcharts'});
					initAllSel();
				},
				'click #servConfigBtn': function(){
					$('#myModal', $el).modal('show');
					app.domain.exports('echartsName',{'name':'servLineEcharts'});
					initAllSel();
				},
				'click #eventConfigBtn': function(){
					$('#myModal', $el).modal('show');
					app.domain.exports('echartsName',{'name':'eventLineEcharts'});
					initAllSel();
				},
				'click [data-role=saveBtn]': function(){
					var echartsName = app.domain.get('echartsName','name');
					//app.domain.clearScope('echartsName');
					var classify = $('[data-role=classifySel] ' ,$el).val();
					var showType = $('[data-role=showTypeSel] ' ,$el).val();
					var state = $('[data-role=stateSel] ' ,$el).val();
					var params = globalEcharts[echartsName].getUrlParams();
					if(classify&&classify!==''&&showType&&showType!==''&&state&&state!==''){
						params.state =state;
						params.classify = classify;
						params.showType = showType;
						globalEcharts[echartsName].updateUrlParams(params);
						$('#myModal', $el).modal('hide');
					}else{
						app.alert("无可选切换图表，请完善选择！");
					}
				},
				'change [data-role=classifySel]':function(){
					var value = $(this).val();
					//加载配置
					$.ajax({
						"type": "POST",
						"url": "ClassifyConfigAction_queryTypeBySub.do",
						"data": {subClassify:value},
						shelter:'正在加载数据，请稍候…',
						"success": function (data) {
							if (data.status) {
								var showTypeList = data.content.showTypeList;
								$('[data-role=showTypeSel]',$el).empty();
								$('[data-role=stateSel]',$el).empty();
								$('[data-role=showTypeSel]',$el).append('<option value="">--请选择--</option>');
								$('[data-role=stateSel]',$el).append('<option value="">--请选择--</option>');
								for(var i =0, len = showTypeList.length; i < len; i++){
									$('[data-role=showTypeSel]',$el).append('<option value="'+showTypeList[i]+'">'+showTypeList[i]+'</option>');
								}

							}
						}
					});
				},
				'change [data-role=showTypeSel]':function(){
					var subClassify = $('[data-role=classifySel]', $el).val();
					var showType = $(this).val();
					//加载配置
					$.ajax({
						"type": "POST",
						"url": "ClassifyConfigAction_queryStateBySubType.do",
						"data": {subClassify:subClassify,showType:showType},
						shelter:'正在加载数据，请稍候…',
						"success": function (data) {
							if (data.status) {
								var stateList = data.content.stateList;
								$('[data-role=stateSel]',$el).empty();
								$('[data-role=stateSel]',$el).append('<option value="">--请选择--</option>');
								for(var i =0, len = stateList.length; i < len; i++){
									$('[data-role=stateSel]',$el).append('<option value="'+stateList[i]+'">'+stateList[i]+'</option>');
								}

							}
						}
					});
				}
			});


			//其他按钮事件
			this.delegateEvents({
				'click #loadTableBtn': function(event){
					var tableParams =  tableObj.getUrlParams();
					if(tableParams.state === "0"){
						$('#loadTableBtn', $el).text("更改为分页表格");
						tableObj.setUrlParams($.extend({},tableParams,{'state':'1'}));

					}else if(tableParams.state === "1"){
						$('#loadTableBtn', $el).text("更改为普通表格");
						tableObj.setUrlParams($.extend({},tableParams,{'state':'0'}));
					}

				},
				'click #loadLineDataBtn': function(){
					var reqParams = {"classify":"cpu","showType":"line","state":"01"};
					if(globalEcharts.Line){
						globalEcharts.Line.dispose();
					}
					var testObj = new app.showData.chartsCollection({
						$context: $el,
						handler: handler,
						selector: "#testLineCtn",//图表外部容器
						url:"./BaseAction_setBaseData.do",
						urlParams:reqParams,
						updateTime: 2000

					});
					testObj.start();
					globalEcharts.Line = testObj;
				},
				'click #loadLine2DataBtn': function(){
					var reqParams = {"classify":"cpu","showType":"line","state":"11"};
					if(globalEcharts.Line2){
						globalEcharts.Line2.dispose();
					}
					var testObj = new app.showData.chartsCollection({
						$context: $el,
						handler: handler,
						selector: "#testLine2Ctn",//图表外部容器
						url:"./BaseAction_setBaseData.do",
						urlParams:reqParams,
						updateTime: 2000

					});
					testObj.start();
					globalEcharts.Line2 = testObj;
				},
				'click #loadLine3DataBtn': function(){
					var reqParams = {"classify":"cpu","showType":"line","state":"02"};
					if(globalEcharts.Line3){
						globalEcharts.Line3.dispose();
					}
					var testObj = new app.showData.chartsCollection({
						$context: $el,
						handler: handler,
						selector: "#testLine3Ctn",//图表外部容器
						url:"./BaseAction_setBaseData.do",
						urlParams:reqParams,
						updateTime: 2000

					});
					testObj.start();
					globalEcharts.Line3 = testObj;
				},
				'click #loadDataBtn': function(){
					var reqParams = {"classify":"cpu","showType":"pie","state":"0"};
					if(globalEcharts.Pie){
						globalEcharts.Pie.dispose();
					}
					var testObj = new app.showData.chartsCollection({
						$context: $el,
						handler: handler,
						selector: "#testPieCtn",//图表外部容器
						url:"./BaseAction_setBaseData.do",
						urlParams:reqParams,
						updateTime: 2000
					});
					testObj.start();
					globalEcharts.Pie = testObj;

				},
				'click #loadDataBtn2': function(){
					var reqParams = {"classify":"cpu","showType":"pie","state":"1"};
					if(globalEcharts.Pie2){
						globalEcharts.Pie2.dispose();
					}
					var testObj = new app.showData.chartsCollection({
						$context: $el,
						handler: handler,
						selector: "#testPie2Ctn",//图表外部容器
						url:"./BaseAction_setBaseData.do",
						urlParams:reqParams,
						updateTime: 2000
					});
					testObj.start();
					globalEcharts.Pie2 = testObj;

				}
			});
		},
		unload : function(handler) {
			//关闭页面时，清理销毁图表和表格对象
			for(var key in globalEcharts){
				globalEcharts[key] && globalEcharts[key].dispose && globalEcharts[key].dispose();
			}
			tableObj && tableObj.fnDestroy && tableObj.fnDestroy(), tableObj = null;
		},
		pause : function($el, attr, handler) {

		},
		resume : function($el, attr, handler) {

		}
	};
});