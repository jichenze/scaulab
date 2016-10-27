define([ "jquery" ], function() {
	var testPieChart;//饼状图的Echarts对象
        return {

        load : function($el, scope, handler) {
            /*全局、局部常量、变量的定义*/
            var $testPieCtn=$('[data-role=testPieCtn]',$el),  //饼状图的jQuery对象
                refreshTimeHandler,
                options = {
                    title : {
                        text: '饼状图标题',
                        subtext: '饼状图副标题',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient : 'vertical',
                        x : 'left',
                        data:['第一部分','第二部分','第三部分','第四部分','第五部分']
                    },
                    //工具栏
                    /*toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {
                                show: true,
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        x: '15%',
                                        width: '70%',
                                        funnelAlign: 'center',
                                        max: 335
                                    }
                                }
                            },
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },*/
                    calculable : false,//是否可以拖拽
                    series : [
                        {
                            name:'比例（单位：个）',
                            type:'pie',
                            radius : '70%',//饼图大小
                            center: ['50%', '60%'],//饼图位置
                            data:[
                                {value:20, name:'第一部分'},
                                {value:40, name:'第二部分'},
                                {value:60, name:'第三部分'},
                                {value:80, name:'第四部分'},
                                {value:100, name:'第五部分'}
                            ]
                        }
                    ]
                };


            /*全局、内部函数的定义*/
            //动态更新数据
            function refreshPieData() {
                handler.setInterval(function () {
                    $.ajax({
                        'type': 'post',
                        'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
                        'url': './TestChartsAction_loadNewLineOrBarData.do',
                        'dataType': 'json',
                        'data': $.param({
                            size: 5
                        }),
                        shelter: '正在加载设备信息，请稍侯…',
                        'success': function (data) {
                            if (data && data.status) {
                                var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, ''),
                                    aaData = data.content.aaData;

                                // 动态数据接口 addData
                                testPieChart.setOption({
                                    animation: false,//禁用动态效果
                                    series: [{
                                        data: [
                                            {value: Math.ceil(aaData[0] * 100), name: '第一部分'},
                                            {value: Math.ceil(aaData[1] * 100), name: '第二部分'},
                                            {value: Math.ceil(aaData[2] * 100), name: '第三部分'},
                                            {value: Math.ceil(aaData[3] * 100), name: '第四部分'},
                                            {value: Math.ceil(aaData[4] * 100), name: '第五部分'}
                                        ]
                                    }]
                                });
                                app.alert('update');
                            }
                        }
                    });
                }, 5000);
            }


            /*数据加载*/
            //定义高度、宽度
            $testPieCtn.css({
                width: $el.width() * .9,
                height: $el.closest('.main').height() * .9
            });
            //初始化饼状图的echarts对象,并设置主题
            testPieChart=echarts.init($testPieCtn[0],echarts.config.skin.MACARONS);
            testPieChart.setOption(options);

            //动态更新数据
            refreshPieData();

            /*绑定监听*/

            //改变 echart图形大小
            app.screen.addResizeHandler({
                uid:handler.uid,
                callback:function(){
                    $testPieCtn.css({
                        width: $el.width() * .9,
                        height: $el.closest('.main').height() * .9
                    });
                    testPieChart.resize();
                    console.log('bar');
                }
            });

        },

		unload : function(handler) {
            testPieChart&&testPieChart.dispose&&testPieChart.dispose();//手动清理内存
            if(window.CollectGarbage){
                window.CollectGarbage();
            }
            testPieChart=null;

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