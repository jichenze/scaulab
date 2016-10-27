/*!
 * Javascript library v3.0
 *
 * Date: 2015.02.17
 */

/**
 * [引导模块]
 *
 * 定初始化js路径，并定义模块间依赖关系
 * 初始化app基础功能，如路由、日志等
 * 初始化首页
 *
 * @param  [window] 执行上下文
 * @author lihao01@cfischina.com
 */
(function (scope) {
    "use strict";

    require.config({
        //依赖定义
        shim: {
            jquery: {
                exports: "$"
            },
            jqueryUi:{
            	deps:["jquery"]
            },
            bootstrap: {
                exports: "Bootstrap",
                deps: ["jquery","gsap"]
            },
            component:{
                deps: ["jquery"]
            },
            zTree: {
                deps: ["jquery"]
            },
            slimscroll: {
                deps: ["jquery"]
            },
            underscore: {
                exports: "_"
            },
            backbone: {
                exports: "Backbone",
                deps: ["underscore", "jquery"]
            },
            echarts: {
                exports: "echarts",
                deps: ["jquery"]
            },
            grid: {
            	deps: ["jquery"]
            },
            datatables: {
                deps: ["jquery"]
            },
            taffy:{
                deps: ["jquery"]
            },
            datetimepicker:{
                deps: ["jquery","bootstrap"]
            },
            dispatcher: {
                deps: ["jquery", "underscore", "backbone"]
            },
            global: {
                deps: ["jquery", "underscore", "backbone"]
            },
            jOrgChart:{
                deps: ["jquery","taffy","global"]
            },
            handler: {
                deps: ["jquery", "underscore", "backbone", "json2"]
            },
            v: {
                deps: ["jquery", "underscore", "backbone"]
            },
            vm: {
                deps: ["jquery", "underscore", "backbone"]
            },
            tab: {
                deps: ["jquery"]
            },
            swithcer:{
                deps:["jquery","bootstrap"]
            },
            ajaxUpload:{
                deps:["jquery"]
            },
            gsap:{
                deps:[]
            },
            common:{
                deps: ["jquery"]
            },
            confInfo:{
                deps:["jquery","global"]
            },
            skin:{
                desp:["jquery"]
            },
            showData:{
                exports: "showData",
                desp:["jquery"]
            },
            index: {
                deps: ["jquery","component"]
            }
        },

        //文件路径定义
        //script/lib文件夹中部分库包含注释版本及压缩版，此处为提高加载速度统一使用压缩版
        //如特殊情况需断点调试，请暂时指向注释版本并在完成调试后更改回压缩版
        paths: {
            //此处为开发外部库文件
            jquery: "script/lib/jquery-1.9.1",
            jqueryUi:"script/lib/jquery-ui-1.11.4",
            zTree: "script/lib/ztree/jquery.ztree.all-3.5.min",
            underscore: "script/lib/underscore-1.8.2.min",
            backbone: "script/lib/backbone-1.1.2",
            bootstrap: "script/lib/bootstrap-2.3.2",
            slimscroll:"script/lib/jquery.slimscroll.min",
            json2: "script/lib/json2",
            echarts: "script/lib/echarts-all-2.2.7.min",
            datatables:"script/lib/jquery.dataTables",
            datetimepicker:"script/lib/bootstrap-datetimepicker",
            taffy:"script/lib/jquery.jOrgChart-taffy",
            jOrgChart:"script/lib/jquery.jOrgChart",
            swithcer:"script/lib/bootstrap-switch",
            ajaxUpload:"script/lib/jQuery.ajaxfileupload",
            gsap:"script/lib/TweenLite.min",
          	//socketio
			//socketio: "script/lib/socket.io",
			moment: "script/lib/moment.min",

            //spa
            common: "script/spa/common",
            global: "script/spa/global",
            dispatcher: "script/spa/dispatcher",
            handler: "script/spa/handler",
            v: "script/spa/v",
            vm: "script/spa/vm",
            tab: "script/spa/tab",
            console: "script/spa/console",
            component: "script/spa/component",
            skin: "script/spa/skin",
            validate: "script/spa/validate",
            domain: "script/spa/domain",
            grid: "script/spa/grid",
            confInfo: "script/spa/confInfoComponent",
            showData: "script/spa/showData",
            //首页入口
            index: "index"
        }
    });

    require(['bootstrap',"component"], function (bootstrap,component) {
        var app = scope.app = {};
        //遮罩
        app.shelter=component.shelter;
       // app.shelter.show('正在加载页面，请稍候…',true);

        //消息中心
        app.alert = component.alert;
        app.alertShowType=component.showType;
        app.alertMsgType=component.msgType;

        //确定框
        app.confirm=component.confirm;

        //右侧边栏输入
        app.formControl=component.formControl;

        //屏幕
        app.screen=component.screen;

        //顶部导航栏banner
        app.banner=component.banner;

        //滚动到底部
        app.scrollTop=component.scrollTop;

        //多选
        app.selectComponent=component.selectComponent;
        
        //hsla颜色
        app.hsla=component.hsla;

        /**
         * [初始化app基础功能]
         * @param  {[object]} Global   [app全局变量]
         * @param  {[object]} Dispatcher
         * @param  {[object]} Console  [日志记录]
         * @param  {[object]} dev      [设备类型]
         * @param  {[object]} shelter  [遮罩]
         */
        require(["global", "dispatcher", "console", "domain", "slimscroll", "skin", "validate", "tab", 'taffy', 'common','confInfo','grid', 'showData', 'echarts', 'datatables', 'jOrgChart', 'zTree', 'swithcer', 'json2', 'ajaxUpload','gsap',"datetimepicker","jqueryUi"],
            function (Global, Dispatcher, Console, domain,slimscroll, skin, validate, Tab, taffy, common,confInfo,Grid,showData) {


                //前端参数关联至全局对象
                app.global = new Global();


                app.Grid = Grid;

                //校验
                app.validate = validate;

                //此处初始化空对象，用于后续存储session数据以及页面间数据传递
                app.domain = domain;
                app.domain.getSessionId();

                //公共配置树状结构函数
                app.taffy=taffy.taffy;

                //公共方法
                app.common=common;

                //公共组件、设备的配置信息参数、方法集
                app.confInfo=confInfo;
                //指标图表
                app.showData = showData;
                
                // 初始化控制台输出(web控制台及android logcat)
                app.log = new Console(app.global.get("debug")).log;
                app.log("***********Here's some basic information*************");
                app.log("Current Version: " + app.global.get("version"));
                app.log("OS: " + navigator.platform);
                app.log("UserAgent: " + navigator.userAgent);
                app.log("CookieEnabled: " + navigator.cookieEnabled);
                app.log("OnLine: " + navigator.onLine);
                app.log("*****************************************************");
                app.log("");
                app.shelter.hide();
                app.shelter.lowerZIndex();

                app.dispatcher = new Dispatcher();
                app.tab = new Tab();
                rewriteAjax();
                require(["index"]);
        });

        //加载过jq后，扩展ajax方法
        function rewriteAjax() {
        	var fnAjax = $.ajax;

    		$.ajax = function (oOpt) {
    			oOpt.shelter = oOpt.shelter||false;
                //oOpt.timeout=oOpt.timeout||1000000;
    			var jFn = $.extend({
    				complete: function (XMLHttpRequest, textStatus) {
    				},
    				error: function (XMLHttpRequest, textStatus, errorThrown) {
    				}
    			}, {
    				complete: oOpt.complete,
    				error: oOpt.error
    			});

    			var _oOpt = $.extend(oOpt, {
    				complete: function (XMLHttpRequest, textStatus, errorThrown) {
    					if (oOpt.shelter)
    						app.shelter.hide();
    					jFn.complete(XMLHttpRequest, textStatus, errorThrown);
    				},
    				error: function (XMLHttpRequest, textStatus, errorThrown) {
    					if (oOpt.shelter)
    						app.shelter.hide();

    					try{
    		        		var oErr = eval("(" + (XMLHttpRequest.response ?
    		        				XMLHttpRequest.response : XMLHttpRequest.responseText) + ")");
    		        		!oOpt.preventError && app.alert('错误信息', oErr.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
    		        	}catch(e) {

    		        	}

    					jFn.error(XMLHttpRequest, textStatus, errorThrown);
    				}
    			});

    			if (oOpt.shelter)
    				app.shelter.show(typeof(oOpt.shelter)==="boolean"?null:oOpt.shelter);
				fnAjax(_oOpt);
    		};
        }
    });

})(this);