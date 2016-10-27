define([ "jquery" ], function() {
	var testLineChart2;//柱形图的Echarts对象
        return {

        load : function($el, scope, handler) {
            /*全局、局部常量、变量的定义*/
            var $testLineCtn2=$('[data-role=testLineCtn2]',$el),  //柱形图的jQuery对象
                getRandomData=function(){
                    var res = [],
                        len = 50;
                    while (len--) {
                        res.push(Math.round(Math.random() * 100));
                    }
                    return res;
                },
                options= {
                    title : {
                        text: '柱形图标题',
                        subtext: '副标题'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['主机1', '主机2']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            //mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            //restore : {show: true},
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
                            data : (function (){
                                var now = new Date();
                                var res = [];
                                var len = 50;
                                while (len--) {
                                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                                    now = new Date(now - 2000);
                                }
                                return res;
                            })()
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            scale: false,//数据更新是坐标是否变
                            name : 'CPU占比（%）'
                        }
                    ],
                    series : [
                        {
                            name:'主机1',
                            type:'line',
                            data:getRandomData()
                        },
                        {
                            name:'主机2',
                            type:'line',
                            data:getRandomData()
                        }
                    ]
                };


            /*全局、内部函数的定义*/
            //动态更新数据
            function refreshBarData() {
                handler.setInterval(function () {
                    $.ajax({
                        'type': 'post',
                        'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
                        'url': './TestChartsAction_loadNewLineOrBarData.do',
                        'dataType': 'json',
                        'data': $.param({
                            size: 10
                        }),
                        shelter: '正在加载设备信息，请稍侯…',
                        'success': function (data) {
                            testLineChart2.setOption({animation:false});//禁用动画效果
                            if (data && data.status) {
                                var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, ''),
                                    aaData = data.content.aaData;

                                // 动态数据接口 addData
                                for(var i=0;i<5;i++) {
                                    testLineChart2.addData([
                                        [
                                            0,        // 系列索引
                                            Math.round(aaData[i] * 100), // 新增数据
                                            false,     // 新增数据是否从队列头部插入
                                            false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                                        ],
                                        [
                                            1,        // 系列索引
                                            Math.round(aaData[i+5] * 100), // 新增数据//((aaData[1] * 10 + 5).toFixed(1) - 0), // 新增数据
                                            false,    // 新增数据是否从队列头部插入
                                            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                                            axisData  // 坐标轴标签，axisDta为空时，直接使用索引
                                        ]
                                    ]);
                                }
                            }
                        }
                    });
                }, 2000);
            }


            /*数据加载*/
            //定义高度、宽度
            $testLineCtn2.css({
                width: $el.width(),
                height: $el.closest('.main').height()
            });
            //初始化柱形图的echarts对象,并设置主题
            testLineChart2=echarts.init($testLineCtn2[0],echarts.config.skin.MACARONS);
            testLineChart2.setOption(options);

            //动态更新数据
            refreshBarData();

            /*绑定监听*/
            //改变 echart图形大小
            app.screen.addResizeHandler({
                uid:handler.uid,
                callback:function(){
                    $testLineCtn2.css({
                        width: $el.width() * .9,
                        height: $el.closest('.main').height() * .9
                    });
                    testLineChart2.resize();
                    console.log('line2');
                }
            });
        },

		unload : function(handler) {
            testLineChart2&&testLineChart2.dispose&&testLineChart2.dispose();//手动清理内存
            if(window.CollectGarbage){
                window.CollectGarbage();
            }
            testLineChart2=null;

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