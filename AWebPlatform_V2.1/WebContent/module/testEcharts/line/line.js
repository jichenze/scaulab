define([ "jquery" ], function() {
	var testLineChart;//折线的Echarts对象

        return {

        load : function($el, scope, handler) {
            /*全局、局部常量、变量的定义*/
            var $testLineCtn=$('[data-role=testLineCtn]',$el),  //折线的jQuery对象
                options= {
                    title : {
                        text: '折线标题',
                        subtext: '副标题'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['最新成交价', '预购队列']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    dataZoom : {
                        show : false,
                        start : 0,
                        end : 100
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : true,
                            data : (function (){
                                var now = new Date();
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                                    now = new Date(now - 2000);
                                }
                                return res;
                            })()
                        },
                        {
                            type : 'category',
                            boundaryGap : true,
                            data : (function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push(len + 1);
                                }
                                return res;
                            })()
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            scale: true,
                            name : '价格',
                            boundaryGap: [0.2, 0.2]
                        },
                        {
                            type : 'value',
                            scale: true,
                            name : '预购量',
                            boundaryGap: [0.2, 0.2]
                        }
                    ],
                    series : [
                        {
                            name:'预购队列',
                            type:'line',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data:(function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push(Math.round(Math.random() * 1000));
                                }
                                return res;
                            })()
                        },
                        {
                            name:'最新成交价',
                            type:'line',
                            data:(function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push((Math.random()*10 + 5).toFixed(1) - 0);
                                }
                                return res;
                            })()
                        }
                    ]
                };


            /*全局、内部函数的定义*/
            //动态更新数据
            function refreshLineData() {
                handler.setInterval(function () {
                    $.ajax({
                        'type': 'post',
                        'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
                        'url': './TestChartsAction_loadNewLineOrBarData.do',
                        'dataType': 'json',
                        'data': $.param({
                            size: 2
                        }),
                        shelter: '正在加载设备信息，请稍侯…',
                        'success': function (data) {
                            if (data && data.status) {
                                var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, ''),
                                    aaData = data.content.aaData;

                                // 动态数据接口 addData
                                testLineChart.addData([
                                    [
                                        0,        // 系列索引
                                        Math.round(aaData[0] * 1000), // 新增数据
                                        true,     // 新增数据是否从队列头部插入
                                        false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                                    ],
                                    [
                                        1,        // 系列索引
                                        ((aaData[1] * 10 + 5).toFixed(1) - 0), // 新增数据
                                        false,    // 新增数据是否从队列头部插入
                                        false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                                        axisData  // 坐标轴标签，axisDta为空时，直接使用索引
                                    ]
                                ]);
                            }
                        }
                    });
                }, 5000);
            }


            /*数据加载*/
            //定义高度、宽度
            $testLineCtn.css({
                width: $el.width() * .9,
                height: $el.closest('.main').height() * .9
            });
            //初始化折线的echarts对象,并设置主题
            testLineChart=echarts.init($testLineCtn[0],echarts.config.skin.BLUE);
            testLineChart.setOption(options);

            //动态更新数据
            refreshLineData();

            /*绑定监听*/

            //改变 echart图形大小
            app.screen.addResizeHandler({
                uid:handler.uid,
                callback:function(){
                    $testLineCtn.css({
                        width: $el.width() * .9,
                        height: $el.closest('.main').height() * .9
                    });
                    testLineChart.resize();
                    console.log('line');
                }
            });
            
        },

		unload : function(handler) {
            testLineChart&&testLineChart.dispose&&testLineChart.dispose();//手动清理内存
            if(window.CollectGarbage){
                window.CollectGarbage();
            }
            testLineChart=null;

            //解绑resize函数
            app.screen.removeResizeHandler(handler.uid);
		},
		
		pause : function($el, scope, handler) {
		},
		
		resume : function($el, scope, handler) {
            //模拟resize函数
		    app.screen.triggerResizeHandler(handler.uid);
		}
	};
});