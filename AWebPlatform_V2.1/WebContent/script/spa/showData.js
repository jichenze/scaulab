/*!
 * Javascript library v3.0
 *
 */

/**
 * [指标数据图表展示]
 * @param  {[undefined]} undefined [确保undefined未被重定义]
 * @author 
 */
( /*<global>*/ function (undefined) {

	(function (factory) {
		"use strict";
		//amd module
		if(typeof define === "function" && define.amd) {
			define(["jquery", "echarts"], factory);
		}
		
		//global
		else{
			factory();
		}

	})(function () {
		"use strict";
		/*当前时间格式化*/
		var showLocale = function (objD) {
			var str;
			var yy = objD.getYear();
			if (yy < 1900) yy = yy + 1900;
			var MM = objD.getMonth() + 1;
			if (MM < 10) MM = '0' + MM;
			var dd = objD.getDate();
			if (dd < 10) dd = '0' + dd;
			var hh = objD.getHours();
			if (hh < 10) hh = '0' + hh;
			var mm = objD.getMinutes();
			if (mm < 10) mm = '0' + mm;
			var ss = objD.getSeconds();
			if (ss < 10) ss = '0' + ss;
			str = hh + ":" + mm + ":" + ss;
			return (str);
		}
		
		/*深度拷贝*/
		var deepClone = function(obj){
			function _clone(obj){
                var newObj;
                if (typeof obj === 'string') {
                    //字符串
                    newObj = '' + obj;
                } else if ($.isArray(obj)) {
                    //数组
                    newObj = $.map(obj, function (elem) {
                        return _clone(elem);
                    });
                } else if (typeof obj === 'object') {
                    //对象
                    newObj = {};
                    for (var name in obj) {
                        if (obj[name] instanceof Function) {
                            newObj[name] = obj[name];
                        } else {
                            newObj[name] = _clone(obj[name]);
                        }
                    }
                } else {
                    newObj = obj;
                }

                return newObj;
            }

            return _clone(obj);
		}
		
		
		/*echarts图表
		 * 
		 * selector：图表容器
		 * updateTime：数据更新时间间隔
		 * url：数据请求url
		 * urlParams:请求参数
		 * */
		var chartsCollection = function(options){
			var ___handler = options.handler,
			___$context = options.$context,
			___selector = options.selector,//图表容器
			___updateTime = options.updateTime,//数据更新时间间隔
			___url = options.url !== undefined ? options.url : './BaseAction_setBaseData.do' ,//未设定默认
			___urlParams = options.urlParams;//请求参数

			var ___dynamicLineFlag = false;//折线图动态点添加图表对象初始化标识，false标识未初始化
			var ___echartsObj, ___intervalId;

			//常量，图表类型，根据数据库配置规定的值进行相应修改
			var ECHARTS_TYPE = {
					LINE: 'line',
					PIE: 'pie'
			};
			var STATE_DYNAMIC = {//动态点
					STATIC: '02',//固定图例
					DYNAMIC: '12'//动态图例
			};
			
			 //theme为可选的主题，内置主题（'macarons', 'infographic'）直接传入名称,可选参数值可查看echarts-all-2.2.7.min.js中的换肤定义每种皮肤
			 /*skin: {
	                BLUE: "blue",
	                DARK: "dark",
	                GRAY: "gray",
	                GREEN: "green",
	                HELIANTHUS: "helianthus",
	                INFOGRAPHIC: "infographic",
	                MACARONS: "macarons",
	                MACARONS2: "macarons2",
	                MINT: "mint",
	                RED: "red",
	                ROMA: "roma",
	                SAKURA: "sakura",
	                SHINE: "shine"
	            }*/
			var echarts_skin = echarts.config.skin.MACARONS;
			//echarts表格默认初始化参数，可查阅官网API，查找相应配置做修改
			var ___optionConfig = {
					/*折线图*/
					lineOption: {
						title : {
							text: '',
							textStyle: {
								fontSize: 15,
							    fontWeight: 'bolder'
							},
			                y: 'top',
							x:'center'
						},
						tooltip : {
							trigger: 'axis'
						},
						grid: { // 控制图的大小，
							x: '15%',
							y2: '10%',
							width:'70%',
							borderWidth:'1'
						},
						legend: {
							/*orient : 'vertical',
							x : 'left',*/
							y: '15%',
							data:['-']
						},
						toolbox: {
							show : true,
							orient: 'vertical',
							feature : {
								/*mark : {show: true},*/
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
						        	 data : ['-']
						         }
						         ],
						         yAxis : [
						                  {
						                	  type : 'value',
						                	  name:''
						                  }
						                  ],
						                  series : [
						                            {
						                            	name:'-',
						                            	type:'line',
						                            	data:['-']
						                            }
						                            ]
					},
					/*饼状图*/
					pieOption:{
						title : {
							text: '',
							textStyle: {
								fontSize: 15,
							    fontWeight: 'bolder'
							},
							x:'center'
						},
						tooltip : {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						legend: {
							orient : 'vertical',
							x : 'left',
							y: '15%',
							data:['-']
						},
						toolbox: {
							show : true,
							orient: 'vertical',
							feature : {
								/*mark : {show: true},*/
								dataView : {show: true, readOnly: false},
								magicType : {
									show: true, 
									type: ['pie', 'funnel'],
									option: {
										funnel: {
											x: '25%',
											width: '50%',
											funnelAlign: 'left',
											max: 1548
										}
									}
								},
								restore : {show: true},
								saveAsImage : {show: true}
							}
						},
						calculable : true,
						series : [
						          {
						        	  name:'',
						        	  type:'pie',
						        	  radius : '45%',
						        	  center: ['50%', '60%'],
						        	  data:[{value:0, name:'-'}]
						          }
						          ]
					}
			}

			var $echartsCtn = $(___selector, ___$context);
			//
			/*初始化图表对象*/
			var initParams = function(){
				___echartsObj = echarts.init($echartsCtn[0], echarts_skin);//第二个参数theme为可选的主题，内置主题（'macarons', 'infographic'）直接传入名称
				initOption();
			}
			
			/*初始化图表对象参数*/
			var initOption = function(){
				if(___urlParams.showType === ECHARTS_TYPE.LINE){
					if(___urlParams.state !== STATE_DYNAMIC.STATIC && ___urlParams.state !== STATE_DYNAMIC.DYNAMIC){//非动态点添加
						___echartsObj.setOption(deepClone(___optionConfig.lineOption));
					}
				}else if(___urlParams.showType === ECHARTS_TYPE.PIE){
					___echartsObj.setOption(deepClone(___optionConfig.pieOption));
				}
			}

			/*说明：与后台Action规定好统一传回的数据格式和参数名，现在后台返回的统一参数名为chartsData，后期结合Action进行改动
			data.content的格式类如：{"chartsData":{"legend":["swap使用率","swap进程数"],"seriesData":["39","100"],"title":"动态swap使用率与进程数","xNum":"7"}}
			chartsData中的key根据图表类型的不同，与后台Action商定统一固定的值*/
			//加载数据
			var loadData = function(){
				$.ajax({
					'type': 'post',
					'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
					'url': ___url,
					'dataType': 'json',
					'data': {"reqParams":JSON.stringify(___urlParams)},
					'success': function (data) {
						if (data && data.status) {
							var chartsData = data.content.chartsData;
							if(___urlParams.showType === ECHARTS_TYPE.PIE){//饼状图
								___echartsObj.setOption({
									title:{
										text:chartsData.title
									},
									legend: {
										data:chartsData.legend
									},
									series : [
									          {
									        	  name:chartsData.seriesName,
									        	  data:chartsData.seriesData
									          }
									          ]
								});

							}else if(___urlParams.showType === ECHARTS_TYPE.LINE){//折线图
								if(___urlParams.state !== STATE_DYNAMIC.STATIC && ___urlParams.state !== STATE_DYNAMIC.DYNAMIC){//非动态点添加
									___echartsObj.setOption({
										title:{
											text:chartsData.title
										},
										legend: {
											data:chartsData.legend
										},
										xAxis:[{
											data:chartsData.xAxis
										}],
										series :chartsData.seriesData
									});
								}else{//动态点添加
									if(___dynamicLineFlag === false){//折线动态点添加未初始化，先进行初始化
										var xAxisData = [];
										for(var i =0 ; i < chartsData.xNum; i++){
											xAxisData.push('-');
										}
										var series = [];
										for(var i =0, len = chartsData.legend.length; i< len; i++){
											var temp = {};
											temp.name = chartsData.legend[i];
											temp.type = 'line';
											temp.data = xAxisData;
											series.push(temp);
										}
										var dynamicOption = deepClone(___optionConfig.lineOption);
										dynamicOption.title.text = chartsData.title;
										dynamicOption.legend.data = chartsData.legend;
										dynamicOption.xAxis[0].data = xAxisData;
										dynamicOption.xAxis[0].data = xAxisData;
										dynamicOption.series =series;
										___echartsObj.setOption(dynamicOption);
										___dynamicLineFlag = true;
									}
									//初始化完成后添加数据
									var addDatas = [];
									for(var i =0, len = chartsData.seriesData.length; i< len; i++){
										if(i == 0){
											addDatas.push([
					                                         i,        // 系列索引
					                                         chartsData.seriesData[i], // 新增数据
					                                         false,     // 新增数据是否从队列头部插入
					                                         false,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
					                                         showLocale(new Date)
					                                     ]);
										}else{
											addDatas.push([
					                                         i,        // 系列索引
					                                         chartsData.seriesData[i], // 新增数据
					                                         false,     // 新增数据是否从队列头部插入
					                                         false    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
					                                     ]);
										}
									}
									___echartsObj.addData(addDatas);
								}
							}
						}
					}
				});
			}
			
			
			
			/*销毁图表*/
			var dispose = function(){
				___handler.clearInterval(___intervalId);
				___echartsObj && ___echartsObj.dispose && ___echartsObj.dispose();
				___echartsObj =null;
				___intervalId = null;
				___dynamicLineFlag = false;
			}
			/*创建图表*/
			var start = function(){
				initParams();//初始化图表对象
				loadData();
				___intervalId = ___handler.setInterval(loadData,___updateTime);

			}

			return {
				/*修改参数*/
				updateUrlParams: function(urlParams){
					___urlParams = urlParams;
					dispose();
					start();
				},
				/*获取参数*/
				getUrlParams: function(){
					return ___urlParams;
				},
				/*创建图表*/
				start:start,
				/*销毁图表*/
				dispose: dispose
			}
		}
		
		
		/*datatable普通表格
		 * 
		 * selector：图表容器
		 * url：数据请求url
		 * urlParams:请求参数
		 * */
		var tableCollection = function(options){
			var ___handler = options.handler,
			___$context = options.$context,
			___urlParams = options.urlParams,
			___url = options.url !== undefined ? options.url : './BaseAction_setBaseData.do' ,//未设定默认
			___selector = options.selector;

			var ___Table, ___notInitFlag = true;//表格对象未初始化标识
			
			var TABLE_TYPE ={
					NORMAL: '0',
					PAGE: '1'
			}
			
			var ___optionConfig = {
					/*非分页表格初始化参数*/
					tbOption:{
						'bAutoWidth':true,//是否自动计算表格各列宽度，默认true
						'bFilter' : true, // 过滤功能，默认true
						'bLengthChange':true,//开关，是否显示一个每页长度的选择条（需要分页器支持），默认true
						'bPaginate':true,//开关，是否显示（使用）分页器，默认true
						"bSort": false,//是否可排序，默认true
						'bInfo': false,//开关，是否显示表格的一些信息
						'bStateSave': false,//开关，是否打开客户端状态记录功能，这个数据是记录在cookies中的，打开了这个记录后，即使刷新一次页面，或重新打开浏览器，之前的状态都是保存下来的，默认false
		                'bDestroy': true,//用于当要在同一个元素上执行新的dataTable绑定时，将之前的那个数据对象清除掉，换以新的对象设置，默认false
		                'iDisplayLength':10,//用于指定一屏显示的条数，需开启分页器，默认为10
		                'iDisplayStart': 0,//用于指定从哪一条数据开始显示到表格中去，默认为0
		                'aLengthMenu':[10, 25, 50, 100],//为选择每页的条目数，默认为[10, 25, 50, 100]
		                //…………等其他属性参数，可写入配置库中，个性化表格，添加需个性化的属性，在初始化参数时从配置库中获取修改即可
		                "fnDrawCallback":function(){
							$(___selector+' tbody tr td',___$context).each( function() {
								this.setAttribute( 'title', this.innerHTML );
							} );
							$(___selector+' thead tr th',___$context).each( function() {
								this.setAttribute( 'title', this.innerHTML );
							} );
						},
		                'aoColumns':[]
					},
					/*分页表格初始化参数*/
					tbOptionPage: {
						'sAjaxSource': ___url,//指定要从哪个URL获取数据
						'bAutoWidth':true,//是否自动计算表格各列宽度，默认true
						'bFilter' : true, // 过滤功能，默认true
						'bLengthChange':true,//开关，是否显示一个每页长度的选择条（需要分页器支持），默认true
						'bPaginate':true,//开关，是否显示（使用）分页器，默认true
						"bSort": false,//是否可排序，默认true
						'bInfo': false,//开关，是否显示表格的一些信息
						'bStateSave': false,//开关，是否打开客户端状态记录功能，这个数据是记录在cookies中的，打开了这个记录后，即使刷新一次页面，或重新打开浏览器，之前的状态都是保存下来的，默认false
		                'bDestroy': true,//用于当要在同一个元素上执行新的dataTable绑定时，将之前的那个数据对象清除掉，换以新的对象设置，默认false
		                'iDisplayLength':10,//用于指定一屏显示的条数，需开启分页器，默认为10
		                'iDisplayStart': 0,//用于指定从哪一条数据开始显示到表格中去，默认为0
		                'aLengthMenu':[10, 25, 50, 100],//为选择每页的条目数，默认为[10, 25, 50, 100]
		                //…………等其他属性参数
						"fnDrawCallback":function(){//在每次table被draw完后调用
							$(___selector+' tbody tr td',___$context).each( function() {
								this.setAttribute( 'title', this.innerHTML );
							} );
							$(___selector+' thead tr th',___$context).each( function() {
								this.setAttribute( 'title', this.innerHTML );
							} );
						},
						'bServerSide': true,//指定从服务器端获取数据
						'fnServerData': function (sSource, aoData, fnCallback) {//与后台交互获取数据的处理函数
							//获取参数
							var sEcho;
							for (var i = 0; i < aoData.length; i++) {//aoData中可获取到页面大小等参数值，如需知道aoData中存放了哪些数据，console.log(aoData)打印出来查看即可
								var obj = aoData[i];
								if(obj.name === "sEcho"){
									sEcho = obj.value;
								}
								if (obj.name === "iDisplayStart" || obj.name === "iDisplayLength"){
									var value = obj.value;
									___urlParams[obj.name] = value;
								}
							}
							$.ajax({
								'type': 'post',
								'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
								'url': sSource,
								'dataType': 'json',
								'data': {"reqParams":JSON.stringify(___urlParams)},
								'success': function (data) {
									if(data.status){
										var chartsData = data.content.chartsData;
										if(chartsData){
											var result ={};
											result.iTotalRecords = chartsData.totalRecords;
											result.iTotalDisplayRecords = chartsData.totalRecords;
											result.sEcho = sEcho;
											result.aaData = chartsData.tableData;
											fnCallback(result); //服务器端返回的对象的resp部分是要求的格式
										}
									}else{
										fnCallback({'aaData': []});
										app.alert('提示', data.errorMsg || '加载错误', app.alertShowType.ERROR);
									}
								}, error: function () {
									fnCallback({'aaData': []});
								}
							});
						},
						"aoColumns": []
				
					}
			}
			
			
			/*说明：与后台Action规定好统一传回的数据格式和参数名，现在后台返回的统一参数名为chartsData，后期结合Action进行改动
			data.content的格式类如：{"chartsData":{"legend":["swap使用率","swap进程数"],"seriesData":["39","100"],"title":"动态swap使用率与进程数","xNum":"7"}}
			chartsData中的key根据图表类型的不同，与后台Action商定统一固定的值*/
			/*非分页加载数据*/
			var loadData = function(){
				$.ajax({
					'type': 'post',
					'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
					'url': ___url,
					'dataType': 'json',
					'data': {"reqParams":JSON.stringify(___urlParams)},
					shelter: '正在加载数据，请稍侯…',
					'success': function (data) {
						if (data && data.status) {
							var chartsData = data.content.chartsData;
							if(chartsData){
								//未初始化datatable对象，从后台获取到的数据进行初始化
								if(___notInitFlag){
									var option = deepClone(___optionConfig.tbOption)
									option.aoColumns = chartsData.aoColumns;
									___Table = $('[data-role=showTb]', $(___selector, ___$context)).dataTable(option);
									___notInitFlag = false;
								}
								var tableData = chartsData.tableData;
								___Table.fnClearTable();
								tableData.length && ___Table.fnAddData(tableData);
							}
						}
					}
				});
			}
			
			/*说明：与后台Action规定好统一传回的数据格式和参数名，现在后台返回的统一参数名为chartsData，后期结合Action进行改动
			data.content的格式类如：{"chartsData":{"legend":["swap使用率","swap进程数"],"seriesData":["39","100"],"title":"动态swap使用率与进程数","xNum":"7"}}
			chartsData中的key根据图表类型的不同，与后台Action商定统一固定的值*/
			/*分页加载数据*/
			var loadPageData = function(){
				//加载datatable初始化数据，
				___urlParams.iDisplayStart = 0;
				___urlParams.iDisplayLength = 0;
				$.ajax({
					'type': 'post',
					'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
					'url': ___url,
					'dataType': 'json',
					'data': {"reqParams":JSON.stringify(___urlParams)},
					shelter: '正在加载数据，请稍侯…',
					'success': function (data) {
						if (data && data.status) {
							var chartsData = data.content.chartsData;
							if(chartsData){
								if(___notInitFlag){//未初始化
									//初始化datatable对象
									var option = deepClone(___optionConfig.tbOptionPage)
									option.aoColumns = chartsData.aoColumns;
									___Table = $('[data-role=showTb]', $(___selector, ___$context)).dataTable(option);
									___notInitFlag = false;
								}
							}
						}
					}
				});
			}
			
			var createTable = function(){
				$(___selector, ___$context).append('<table data-role="showTb" class="display dataTable table" style="width: 100%;"></table>');
				if(___urlParams.state === TABLE_TYPE.NORMAL){//普通表格
					loadData();
				}else if(___urlParams.state === TABLE_TYPE.PAGE){//分页表格
					loadPageData();
				}
			}
			
			/*创建表格*/
			var start = function(){
				createTable();
			}
			 
			/*销毁表格*/
			var dispose = function(){
				___Table && ___Table.fnDestroy && ___Table.fnDestroy(), ___Table = null;
				//$(___selector, ___$context).empty();
				___notInitFlag = true;
			}
			/*修改请求参数*/
			var setUrlParams = function(urlParams){
				dispose();
				___urlParams = urlParams;
				start();
			}
			/*获取请求参数*/
			var getUrlParams = function(){
				return ___urlParams
			}
			
			return {
				start:start,
				dispose: dispose,
				setUrlParams:setUrlParams,
				getUrlParams:getUrlParams
			}
		}

		return {
			chartsCollection: chartsCollection,
			tableCollection: tableCollection
		}

	});

})();