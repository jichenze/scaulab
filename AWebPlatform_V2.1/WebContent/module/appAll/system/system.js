define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {
			
            //系统列表获取
            var $systemListCtn = $('[data-role=systemListCtn]', $el);
            for(var i = 0; i < 15; i++){
            	var temp = '<div class="appall-system-ctn-detail"></div>';
            	$systemListCtn.append(temp);
            }
            
            //日期控件
            $(".form_datetime", $el).datetimepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                todayBtn: true,
                startDate: "1970-04-26",
                minuteStep: 10,
                pickerPosition: "bottom-left"
            });
            
          //表格
			var tbOption = {
					"bPaginate": false, //开关，是否显示分页器
					"bInfo": false, //开关，是否显示表格的一些信息
					'bStateSave': true,
					'bFilter' : false, // 过滤功能
					'bSort': false//禁用排序
			}
			
			var eventTable = $('[data-role=eventTb]', $el).dataTable(tbOption);
			showTable({});
			
		    function showTable(params){
		    	$.ajax({
					'type': 'post',
					'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
					'url': './TestChartsAction_loadTableInfo.do',
					'dataType': 'json',
					'shelter': '正在加载，请稍侯…',
					'data': params,
					'success': function (data) {
						if(data.status){
							if(data.content.tableInfo){
								var tableInfo = data.content.tableInfo;
								var aaData = [];
								for(var i = 0; i < tableInfo.length; i++){
									var obj = tableInfo[i];
									aaData.push([
                                                    obj.column,
			                                        obj.column,
			                                        obj.column,
			                                        obj.column,
			                                        obj.column,
			                                        obj.column,
			                                        '<a href="javascript:">转工单</a>&nbsp;&nbsp;<a href="javascript:">转代办</a>&nbsp;&nbsp;<a href="javascript:">受理</a>&nbsp;&nbsp;<a href="javascript:">导航</a>'
			                                    ]);
									
								}
								eventTable.fnClearTable();
								aaData.length && eventTable.fnAddData(aaData);
							}
						}else{
							app.alert('错误', data.errorMsg, app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
						}
					}, error: function (xhr, status, errMsg) {
						app.alert('错误' + status, errMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
					}
				});
		    }
		    
		    this.delegateEvents({
				//表格点击事件
				'click [data-role=eventTb]>tbody': function (event) {
					var $td = $(event.target || window.event.srcElement).closest('td');
					
					if ($td.index() == 6 ) {
						var $a = $(event.target || window.event.srcElement).closest('a');
						var type = $a.text();
						//页面跳转传参
						app.domain.exports('clusterList', {});
						var timestamp = new Date().getTime();
						if(type === '转工单'){
							app.dispatcher.load({
								title:'转工单测试'+timestamp,
								moduleId: 'event',
								id: timestamp
							});
						}else if(type ==="转代办"){
							app.dispatcher.load({
								title:'转代办测试'+timestamp,
								moduleId: 'appAll',
								section: ['system','os'],
								id: timestamp
							});
						}else if(type ==="受理"){
							app.dispatcher.load({
								title:'受理测试'+timestamp,
								moduleId: 'appAll',
								section: ['system','device'],
								id: timestamp
							});
						}else if(type ==="导航"){
							app.dispatcher.load({
								title:'导航测试'+timestamp,//跳转的节点名
								moduleId: 'appAll',
								section: ['system','database'],
								id: timestamp //改成要跳转节点的path属性值
							});
						}
					}else{
						$('[data-role=eventDtlTemp]' , $el).modal('show');
					}
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