define([ "jquery" ], function() {
	var globalEcharts = {};
	return {
		load : function($el, scope, handler) {

			var requireMethods;
			require(['script/spa/showData.js'], function (test) {
				requireMethods = test;

				var monLineEcharts = new requireMethods.chartsCollection({
					$context: $el,
					handler: handler,
					selector: "[data-role=testLineCtn1]",//图表外部容器
					//url:"./TestChartsAction_loadLine2.do",
					urlParams:{"classify":"cpu","showType":"pie","state":"1"},
					updateTime: 2000
				});
				monLineEcharts.start();
				globalEcharts.monLineEcharts = monLineEcharts;


				var servLineEcharts = new requireMethods.chartsCollection({
					$context: $el,
					handler: handler,
					selector: "[data-role=testLineCtn2]",//图表外部容器
					//url:"./TestChartsAction_loadLine.do",
					urlParams:{"classify":"cpu","showType":"line","state":"01"},
					updateTime: 2000
				});
				servLineEcharts.start();
				globalEcharts.servLineEcharts = servLineEcharts;

				var eventLineEcharts = new requireMethods.chartsCollection({
					$context: $el,
					handler: handler,
					selector: "[data-role=testLineCtn3]",//图表外部容器
					//url:"./TestChartsAction_loadPie.do",
					urlParams:{"classify":"cpu","showType":"pie","state":"0"},
					updateTime: 2000
				});
				eventLineEcharts.start();
				globalEcharts.eventLineEcharts = eventLineEcharts;

			});


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


			//系统列表获取
			var $systemListCtn = $('[data-role=systemListCtn]', $el);
			for(var i = 0; i < 15; i++){
				var temp = '<div class="mainoperation-system-ctn-detail"></div>';
				$systemListCtn.append(temp);
			}
			this.delegateEvents({
				'click [data-role=eventBtn]': function(){
					app.dispatcher.load.apply(app.dispatcher, ["事件列表"].concat(['event']));
				}
			});

			//系统列表



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
			refreshClock=handler.setInterval(refresh,300000,true);




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