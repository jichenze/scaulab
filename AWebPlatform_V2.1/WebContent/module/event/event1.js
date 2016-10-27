define([ "jquery" ], function() {
	var eventTable1;
	
	return {
		load : function($el, scope, handler) {

			//时间控件
			$(".form_datetime", $el).datetimepicker({
				format: "yyyy-mm-dd",
				autoclose: true,
				todayBtn: true,
				startDate: "1970-04-26",
				minuteStep: 60,
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
			
			eventTable1 = $('[data-role=eventTb1]', $el).dataTable(tbOption);
			showTable({});
			
			//数据转换
			function formateDate(date1){
				  
		    	var date = new Date();
		    	var y = date1.getFullYear();  
		        var m = date1.getMonth() + 1;  
		        m = m < 10 ? ('0' + m) : m;  
		        var d = date1.getDate();  
		        d = d < 10 ? ('0' + d) : d;  
		        var h = date1.getHours(); 
		        h = h < 10 ? ('0' + h) : h;  
		        var minute = date1.getMinutes(); 
		        minute = minute < 10 ? ('0' + minute) : minute;  
		        var second = date1.getSeconds();
		        second = second < 10 ? ('0' + second) : second; 
		        date = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
		        return date;
		    }
			
			function changestates(states){
		    	if(states=="0"){
		    		states = "待处理";
		    	}else if(states == "1"){
		    		states = "已受理";
		    	}else{
		    		states = "已解除";
		    	}
		    	return states;
		    };
		    		
		    function changeastates(astates){
		    	if(astates=="0"){
		    		astates = "未代办";
		    	}else{
		    		astates = "已代办";
		    	}
		    	return astates;
		    };
		    		
		    function changetype(type){
		    	if(type=="0"){
		    		type = "通知";
		    	}else if(type == "1"){
		    		type = "预警";
		    	}else{
		    		type = "告警";
		    	}
		    	return type;
		    }
			
		    function showTable(params){
                   $.ajax({
						'type': 'post',
						'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
						'url': './EventAction_change1.do',
						'dataType': 'json',
						'data':params,
						'success': function (data) {
							eventTable1.fnClearTable();
							if(data.status){
								if(data.content.tableInfo){
									var tableInfo = data.content.tableInfo;
									for(var i = 0; i < tableInfo.length; i++){
										var obj = tableInfo[i];
										var date = new Date(obj[4].time);
										var tempLine = [];
										var id = (obj[8]).toString();
										if(obj[6]=='1'){
											tempLine.push([
		                                                    obj[0],
		                                                    obj[1],
		                                                    obj[2],
		                                                    obj[3],
		                                                    formateDate(date),
		                                                    changetype(obj[5]),
		                                                    changestates(obj[6]),
		                                                    changeastates(obj[7]),
					                                        '<a href="javascript:">转工单</a>&nbsp;&nbsp;<a href="javascript:return false">代办</a>&nbsp;&nbsp;<a href="javascript:return false">已受理</a>&nbsp;&nbsp;<a href="javascript:">导航</a><span class="hide">'+id+'</span>'
					                                    ]);	
										}else{
											tempLine.push([
		                                                    obj[0],
		                                                    obj[1],
		                                                    obj[2],
		                                                    obj[3],
		                                                    formateDate(date),
		                                                    changetype(obj[5]),
		                                                    changestates(obj[6]),
		                                                    changeastates(obj[7]),
					                                        '<a href="javascript:">转工单</a>&nbsp;&nbsp;<a href="javascript:return false">代办</a>&nbsp;&nbsp;<a href="javascript:">受理</a>&nbsp;&nbsp;&nbsp;<a href="javascript:">导航</a><span class="hide">'+id+'</span>'
					                                    ]);	
										}
										eventTable1.fnAddData(tempLine);
									}
								}
							}else{
								app.alert('错误', data.errorMsg, app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
							}
						}, 
						"error": function (xhr, status, errMsg) {
							app.alert('错误' + status, errMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
						}
					});
			};
					
			//图表
		    var option = {
		    	    title : {
		    	        text: '未来一周气温变化',
		    	    },
		    	    tooltip : {
		    	        trigger: 'axis'
		    	    },
		    	    legend: {
		    	        data:['最高气温']
		    	    },
		    	    grid: { // 控制图的大小，
						x: '15%',
						y2: '10%',
						width:'70%',
						borderWidth:'1'
					},
		    	    toolbox: {
		    	        show : true,
		    	        orient: 'vertical',
		    	        feature : {
		    	            dataView : {show: true, readOnly: false},
		    	            magicType : {show: true, type: ['line', 'bar']},
		    	            restore : {show: true},
		    	            saveAsImage : {show: true}
		    	        }
		    	    },
		    	    calculable : true,
		    	    xAxis : [
		    	        {
		    	            type : 'category',
		    	            boundaryGap : false,
		    	            data : ['周一','周二','周三','周四','周五','周六','周日']
		    	        }
		    	    ],
		    	    yAxis : [
		    	        {
		    	            type : 'value',
		    	            axisLabel : {
		    	                formatter: '{value} °C'
		    	            }
		    	        }
		    	    ],
		    	    series : [
		    	        {
		    	            name:'最高气温',
		    	            type:'line',
		    	            data:[11, 11, 15, 13, 12, 13, 10],
		    	            markLine : {
		    	                data : [
		    	                    {type : 'average', name: '平均值'}
		    	                ]
		    	            }
		    	        }
		    	    ]
		    	};
		    
		    var option2 = {
		    	    title : {
		    	        text: '某地区蒸发量和降水量',
		    	    },
		    	    tooltip : {
		    	        trigger: 'axis'
		    	    },
		    	    legend: {
		    	        data:['蒸发量']
		    	    },
		    	    grid: { // 控制图的大小，
						x: '15%',
						y2: '10%',
						width:'70%',
						borderWidth:'1'
					},
		    	    toolbox: {
		    	        show : true,
		    	        orient: 'vertical',
		    	        feature : {
		    	            dataView : {show: true, readOnly: false},
		    	            magicType : {show: true, type: ['line', 'bar']},
		    	            restore : {show: true},
		    	            saveAsImage : {show: true}
		    	        }
		    	    },
		    	    calculable : true,
		    	    xAxis : [
		    	        {
		    	            type : 'category',
		    	            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
		    	        }
		    	    ],
		    	    yAxis : [
		    	        {
		    	            type : 'value'
		    	        }
		    	    ],
		    	    series : [
		    	        {
		    	            name:'蒸发量',
		    	            type:'bar',
		    	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
		    	            markLine : {
		    	                data : [
		    	                    {type : 'average', name: '平均值'}
		    	                ]
		    	            }
		    	        }
		    	    ]
		    	};	
		    var $successRateCtn = $('[data-role = successRateCtn]', $el);
		    var successRateEcharts = echarts.init($successRateCtn[0]);
		    successRateEcharts.setOption(option);
		    
		    var $tradeNumCtn = $('[data-role = tradeNumCtn]', $el);
		    var tradeNumEcharts = echarts.init($tradeNumCtn[0]);
		    tradeNumEcharts.setOption(option);
		    
		    var $useTimeCtn = $('[data-role = useTimeCtn]', $el);
		    var useTimeEcharts = echarts.init($useTimeCtn[0]);
		    useTimeEcharts.setOption(option);
		    
		    var $cpuCtn = $('[data-role = cpuCtn]', $el);
		    var cpuEcharts = echarts.init($cpuCtn[0]);
		    cpuEcharts.setOption(option);
		    
		    var $swapCtn = $('[data-role = swapCtn]', $el);
		    var swapEcharts = echarts.init($swapCtn[0]);
		    swapEcharts.setOption(option);
		    
		    var $fileCtn = $('[data-role = fileCtn]', $el);
		    var fileEcharts = echarts.init($fileCtn[0]);
		    fileEcharts.setOption(option2);
					    
		    this.delegateEvents({
		    	
		    	//查询事件
				'click #eventBtn1':function(resp){
					var eventName = $("#eventName1").val();
					var eventState = $("#eventState1").val();
					var startTime = $("#startTime1").val();
					var endTime = $("#endTime1").val();
					var states = "";
						if(eventState=="待处理"){
							states="0";
						}else if(eventState=="已受理"){
							states="1";
						}else if(eventState=="已解除"){
							states="2";
						}else{
							states="";
						}
					$.ajax({
						"type":"POST",
						"url":"./EventAction_query1.do",
						"dataType":"json",
						"data":{
							"eventName":eventName,
							"states":states,
							"first_time":startTime,
							"last_time":endTime
						},
					    "success":function(data){
								if((eventName=="") && (eventState=="") && (startTime=="") && (endTime=="")){
									app.alert("请输入查询条件");
							    }else{
							    	var tableInfo0 = data.content.tableInfo1;
									eventTable1.fnClearTable();
									var tempLine1 = [];
									for(var i = 0; i < tableInfo0.length; i++){
											var obj1 = tableInfo0[i];
											var date = new Date(obj1[4].time);
											var id = (obj1[8]).toString();
											if(obj1[7]=='1'){
												tempLine1.push([
			                                                    obj1[0],
			                                                    obj1[1],
			                                                    obj1[2],
			                                                    obj1[3],
			                                                    formateDate(date),
			                                                    changetype(obj1[5]),
			                                                    changestates(obj1[6]),
			                                                    changeastates(obj1[7]),
						                                        '<a href="javascript:">转工单</a>&nbsp;&nbsp;<a href="javascript:">转代办</a>&nbsp;&nbsp;<a href="javascript:return false">已受理</a>&nbsp;&nbsp;<a href="javascript:">导航</a><span class="hide">'+id+'</span>'
						                                    ]);	
											}else{
												tempLine1.push([
			                                                    obj1[0],
			                                                    obj1[1],
			                                                    obj1[2],
			                                                    obj1[3],
			                                                    formateDate(date),
			                                                    changetype(obj1[5]),
			                                                    changestates(obj1[6]),
			                                                    changeastates(obj1[7]),
						                                        '<a href="javascript:">转工单</a>&nbsp;&nbsp;<a href="javascript:">转代办</a>&nbsp;&nbsp;<a href="javascript:">受理</a>&nbsp;&nbsp;&nbsp;<a href="javascript:">导航</a><span class="hide">'+id+'</span>'
						                                    ]);	
											}
															
								    }
									eventTable1.fnAddData(tempLine1);
							}}, 
							"error": function (xhr, status, errMsg) {
							app.alert('错误' + status, errMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
						}
					})
				},
				
				//返回列表按钮
				'click #alleventBtn1':function(){
					showTable({});
					$("#eventName1").val('');
					$("#eventState1").val('');
					$("#startTime1").val('');
					$("#endTime1").val('');
				},
		    	
		       //转换返回按钮
				'click #change2':function(){
					handler.stepTo(0);
				},
				
				//表格点击事件
				'click [data-role=eventTb1]>tbody': function (event) {
					var $td = $(event.target || window.event.srcElement).closest('td');
					if ($td.index() == 8 ) {
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
							//app.dispatcher.load.apply(app.dispatcher, ['转工单测试','event']);
						}else if(type ==="转代办"){
							
						}else if(type ==="受理"){
							var $id = $a.next().next();
							var id = $id.text();
							$.ajax({
								"type":"POST",
								"url":"./EventAction_deal.do",
								"dataType":"json",
								"data":{"id":id},
								"success":function(data){
									eventTable1.fnClearTable();
									if(data.status){
											showTable({});
									}else{
										app.alert('错误', data.errorMsg, app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
									}
								},
								"error": function (xhr, status, errMsg) {
										app.alert('错误' + status, errMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
								}
							})
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
		//销毁表格对象
		eventTable1 && eventTable1.fnDestroy(), eventTable1 = null;
	},
	pause : function($el, attr, handler) {
	},
	resume : function($el, attr, handler) {
	}
	}})

						