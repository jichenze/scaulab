define([ "jquery" ], function() {
	var globalEcharts = {};
	return {
		load : function($el, scope, handler) {
			//
			
			var option1 ={
					title : {
						text: '监控工单处理情况',
						x:'center',
						
						},
						grid : {
							x: '8%',
							y: '20%',
							x2: '8%',
							y2: '20%'
						},
						tooltip : {
							trigger: 'axis'
						},
						legend: {
							 orient : 'vertical',
						      x : 'left',
							data:['已处理','未处理'],
							itemWidth :10,
							itemHeight :7
						},
						toolbox: {
							orient:'vertical',
							show : true,
							itemSize: 10,
							feature : {
								mark : {show: true},
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
						        	 data : []
						         }
						         ],
						 yAxis : [
						            {
						             type : 'value'
						          }
						          ],
						                  series : [
						                            {	
						                            	name:'已处理',
						                            	type:'bar',
						                            //	data:[2, 5, 7, 23, 26, 76],
						                            	// jsonArray.content.jsonObject1.1 = gd1
						                            	data : []
						                            },
						                            {
						                            	name:'未处理',
						                            	type:'bar',
						                            	data:[]
						                            	
						                            }
						                            ]};
			var option2 ={
					title : {
						text: '服务工单处理情况',
						x:'center',
						
						},
						grid : {
							x: '8%',
							y: '20%',
							x2: '8%',
							y2: '20%'
						},
						tooltip : {
							trigger: 'axis'
						},
						legend: {
							 orient : 'vertical',
						      x : 'left',
							data:['已处理','未处理'],
							itemWidth :10,
							itemHeight :7
						},
						toolbox: {
							orient:'vertical',
							show : true,
							itemSize: 10,
							feature : {
								mark : {show: true},
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
						        	 data : ['工单1','工单2','工单3','工单4','工单5','工单6']
						         }
						         ],
						         yAxis : [
						                  {
						                	  type : 'value'
						                  }
						                  ],
						                  series : [
						                            {	
						                            	name:'已处理',
						                            	type:'bar',
						                            	data : []
						                            },
						                            {
						                            	name:'未处理',
						                            	type:'bar',
						                            	data:[]
						                            	
						                            }
						                            ]};
			var option3 ={
					title : {
						text: '事件工单处理情况',
						x:'center',
						
						},
						grid : {
							x: '8%',
							y: '20%',
							x2: '8%',
							y2: '20%'
						},
						tooltip : {
							trigger: 'axis'
						},
						legend: {
							 orient : 'vertical',
						      x : 'left',
							data:['已处理','未处理'],
							itemWidth :10,
							itemHeight :7
						},
						toolbox: {
							orient:'vertical',
							show : true,
							itemSize: 10,
							feature : {
								mark : {show: true},
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
						        	 data : []
						         }
						         ],
						         yAxis : [
						                  {
						                	  type : 'value'
						                  }
						                  ],
						                  series : [
						                            {	
						                            	name:'已处理',
						                            	type:'bar',
						                            	data : []
						                            },
						                            {
						                            	name:'未处理',
						                            	type:'bar',
						                            	data:[]
						                            	
						                            }
						                            ]};
			
			
			
			var $monitor = $('#monitor', $el);
			var monitorEachrts = echarts.init($monitor[0]);
			
			var $service = $('#service',$el);
			var serviceEcharts = echarts.init($service[0]);
			
			var $things = $('#things',$el);
			var thingsEcharts = echarts.init($things[0])
			
			function showData(params){
				$.ajax({
					'type': 'post',
					'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
					'url': './QueryMonitorAction_loadDataInfo.do',
					'dataType': 'json',
					'data': params,
					shelter: '正在加载设备信息，请稍侯…',
					'success': function (resp) {
						if (resp && resp.status) {
							var jsonobj = eval(resp);
		                    //读取横坐标值
//		                    option1.xAxis.data = jsonobj.jObject;
		                    option1.xAxis[0].data = resp.content.jObject.group_name1;
//		                    var series_arr = jsonobj.group_unclose_num;
		                    //驱动图表生成的数据内容，数组中每一项代表一个系列的特殊选项及数据
		                    option1.series[0].data = resp.content.list[0];
		                    option1.series[1].data = resp.content.list[1];
		                     // 为echarts对象加载数据
		                    monitorEachrts.setOption(option1);
		                    
		                    option2.xAxis[0].data = resp.content.jObject.group_name2;
		                    option2.series[0].data = resp.content.list[2];
		                    option2.series[1].data = resp.content.list[3];
		                    console.log(JSON.stringify(option2));
		                    serviceEcharts.setOption(option2);
		                    
		                    option3.xAxis[0].data = resp.content.jObject.group_name3;
		                    option3.series[0].data = resp.content.list[4];
		                    option3.series[1].data = resp.content.list[5];
		                    thingsEcharts.setOption(option3);
		                    
		                    //给监控工单填数据
		                    var monHdlVoucher = parseInt(resp.content.jObject.close_num1);
		    				var monNotHdlVoucher = parseInt(resp.content.jObject.unclose_num1);
		    				var monPercent = (parseFloat(monHdlVoucher*100/(monHdlVoucher+monNotHdlVoucher))).toFixed(2);
		    				$('#monHdlVoucher', $el).text(monHdlVoucher);
		    				$('#monNotHdlVoucher', $el).text(monNotHdlVoucher);
		    				$('#monStatistic', $el).attr("style","width:"+monPercent+"%;");
						
		    				//给服务工单填数据
		    				var servHdlVoucher = parseInt(resp.content.jObject.close_num2);
		    				var servNotHdlVoucher = parseInt(resp.content.jObject.unclose_num2);
		    				var servPercent = (parseFloat(servHdlVoucher*100/(servHdlVoucher+servNotHdlVoucher))).toFixed(2);
		    				$('#servHdlVoucher', $el).text(servHdlVoucher);
		    				$('#servNotHdlVoucher', $el).text(servNotHdlVoucher);
		    				$('#servStatistic', $el).attr("style","width:"+servPercent+"%;");
		    				
		    				//给事件工单填数据
		    				var eventHdlVoucher = parseInt(resp.content.jObject.close_num3);
		    				var eventNotHdlVoucher = parseInt(resp.content.jObject.unclose_num3);
		    				var eventPercent = (parseFloat(eventHdlVoucher*100/(eventHdlVoucher+eventNotHdlVoucher))).toFixed(2);
		    				$('#eventHdlVoucher', $el).text(eventHdlVoucher);
		    				$('#eventNotHdlVoucher', $el).text(eventNotHdlVoucher);
		    				$('#eventStatistic', $el).attr("style","width:"+eventPercent+"%;");
						}
					}
				});
			}
			showData($.param({
				size: 1
			}));
			//设置自动刷新事件
			handler.setInterval(function(){
				showData($.param({
					size: 1
				}));
			},3000);

			//事件滚动模拟添加数据
			//滚动插件
			(function($){
				$.fn.extend({
					Scroll:function(opt,callback){
						//参数初始化
						if(!opt) var opt={};
						var _this=this.eq(0).find("ul:first");
						var     lineH=_this.find("li:first").height(), //获取行高
						line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10), //每次滚动的行数，默认为一屏，即父容器高度
								speed=opt.speed?parseInt(opt.speed,10):500, //卷动速度，数值越大，速度越慢（毫秒）
										timer=opt.timer?parseInt(opt.timer,10):3000; //滚动的时间间隔（毫秒）
										if(line==0) {
											line=1;
										}
										var upHeight=0-line*lineH;
										var timerID;
										//滚动函数
										scrollUp = function(){
											_this.animate({
												marginTop:upHeight
											},speed,function(){
												for(i=1;i<=line;i++){
													_this.find("li:first").appendTo(_this);
												}
												_this.css({marginTop:0});
											});
										}
										//鼠标事件绑定
										_this.hover(function(){
											handler.clearInterval(timerID);
										},function(){
											timerID=handler.setInterval("scrollUp()",timer);
										}).mouseout();
					}        
				})
			})(jQuery);

			$("#scrollDiv", $el).Scroll({line:1,speed:500,timer:1000});
			//事件概述滚动End

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

			this.delegateEvents({
				'click [data-role=eventBtn]': function(){
					app.dispatcher.load.apply(app.dispatcher, ["事件列表"].concat(['event']));
				},
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


			//


			/*公用变量定义*/
			var $echartsList=[],             //存放echarts的Jquery对象,用于refresh
			echRand,                	 //每次加载页面出来的echarts数量,小于10
			$ctn,	                     //echarts的组件容器
			echChart,				     //每一个echart的实例对象
			$echChart,					 //每一个echart的jquery对象
			refreshClock;				 //刷新数据的循环

			//假设一个获取到的json数据
			echInfo={
					"head":function(){
						switch((Math.random()*3).toFixed(0)){      //模拟获取的表头
						case "0":
							return "中间业务平台"
						case "3":
							return "直销银行"
						case "2":
							return "个人网银系统"
						case "1":
							return "信用卡手机银行系统"
						}
					},
					"health":function(){           //模拟实时获取的健康度
						return (Math.random()*100).toFixed(0);
					},
					"liked":function(){
						return	((Math.random()*1).toFixed(0)=="1")?true:false;           
					},                           
					"app":function(){             //应用数目
						return (Math.random()*2).toFixed(0);
					},       					        
					"middle":function(){          //中间件  
						return (Math.random()*2).toFixed(0);
					},   

					"system":function(){          //系统   
						return (Math.random()*2).toFixed(0);
					},					       
					"sql":function(){             //数据库
						return (Math.random()*2).toFixed(0);
					},

			}; 

			/*公用函数的定义*/
			//表尾四个属性值对应的颜色,可自行配置修改
			function echAttrColor(){
				switch($(this).text()){
				case "0":return "#32FF34"          //绿
				case "1":return "#FFED32"		   //黄
				case "2":return "#FF4530"		   //红
				}
			}
			//表中不同健康度对应的颜色,可自行配置修改
			function echFigColor(size){
				var num=parseInt($(this).text(),10);
				if(num<=30){
					$(this).css("color","#FF4530");
					size=1;
				}else if(num>30&&num<=60){
					$(this).css("color","#FFED32");
					size=2;
				}else if(num>60){
					$(this).css("color","#32FF34");
					size=3;
				}
			}
			//定义刷新数据函数
			function refresh(){
				var leng=$echartsList.length
				for(var i=0;i<leng;i++){

					var $health=$('[data-role="echFigNum"]',$echartsList[i]),
					$healthImg=$('[data-role="echImg"]',$echartsList[i]),
					healthNum=echInfo.health(); 


					$health.text(healthNum+"%");
					if(healthNum<=40){
						$health.css("color","#FF4530");
						$healthImg.attr("src","img/p1.png");
					}else if(healthNum>40&&healthNum<=70){
						$health.css("color","#FFED32");
						$healthImg.attr("src","img/p2.png");
					}else if(healthNum>70&&healthNum<=95){
						$health.css("color","#32FF34");
						$healthImg.attr("src","img/p3.png");
					}else if(healthNum>95){
						$health.css("color","#32FF34");
						$healthImg.attr("src","img/p4.png");
					}

					$('[data-role="echApp"]',$echartsList[i]).text(echInfo.app());        //从json源echInfo配置应用数据
					$('[data-role="echApp"]',$echartsList[i]).css("color",echAttrColor);

					$('[data-role="echMiddle"]',$echartsList[i]).text(echInfo.middle());   //从json源echInfo配置中间数据
					$('[data-role="echMiddle"]',$echartsList[i]).css("color",echAttrColor);

					$('[data-role="echSystem"]',$echartsList[i]).text(echInfo.system());   //从json源echInfo配置系统数据
					$('[data-role="echSystem"]',$echartsList[i]).css("color",echAttrColor);

					$('[data-role="echSql"]',$echartsList[i]).text(echInfo.sql());      //从json源echInfo配置数据库数据
					$('[data-role="echSql"]',$echartsList[i]).css("color",echAttrColor);
				};


			}

			//定义加载echartTemp模板函数
			function addEchTemp(){
				$ctn=$('#echCtn',$el);             //获取加载模板的容器

				$echChart=$($("#echTemp",$el).html());    //获取模板$对象

				$ctn.append($echChart);                   

				echChart=$("#echFig",$echChart)[0];


				//设置表头
				$('[data-role="echHead"]',$echChart).text(echInfo.head());
				//设置是否收藏
				$('[data-role="echLiked"]',$echChart).css({
					'color':function(){

						return echInfo.liked()?("#a11"):("#333")
					}
				});

				$echartsList.push($echChart);
			}


			/*页面加载*/
			//执行加载echarts函数
			echRand=(Math.random()*10).toFixed(2);
			for(var i=0;i<echRand;i++){
				addEchTemp();
			};

			//刷新echart数据,时间间隔3秒
			refresh();
			refreshClock=handler.setInterval(refresh,5000,true);


			/* 绑定监听*/
			//定义收藏点击切换事件,
			this.delegateEvents({
				'click [data-role="echLiked"]':function(){
					if(echInfo.liked()){     //判断以服务器传来的Json信息为准,此echInfo为模拟随机数据,点击时验证仅为随机布尔值,点击时随机变化

						$(this).css("color","#333");
					}else if(echInfo.liked()){

						$(this).css("color","#a11");
					}
					//向服务器发送收藏信息,并刷新
					/*$.ajax(


                        		);
                        		 refresh();
					 */

				}
			});


		},
		unload : function(handler) {
			for(var obj in globalEcharts){
				globalEcharts[obj]&&globalEcharts[obj].dispose&&globalEcharts[obj].dispose();//手动清理内存
				delete globalEcharts[obj];
			}
			globalEcharts = null;
			if(window.CollectGarbage){
				window.CollectGarbage();
			}
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});