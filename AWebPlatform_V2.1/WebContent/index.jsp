<!DOCTYPE html>
<%@ page isErrorPage="true" language="java" import="java.util.*"
	pageEncoding="UTF-8"%>
<%@ page import="cn.com.agree.aweb.Constants"%>
<%@ page session="false"%>
<%
	HttpSession session = request.getSession(false);
	//获取权限信息集合
	Object accessList = session
			.getAttribute(Constants.SESSION_USER_ACCESS_LIST_MENU);
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <meta name="msapplication-tap-highlight" content="no"/>
    <meta content="minimal-ui" name="viewport"/>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            name="viewport"/>
    <meta content="yes" name="apple-mobile-web-app-capable"/>
    <title>AWeb 2.1</title>
    <style id="#bgStyle"></style>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css"
          href="css/bootstrap-responsive.min.css"/>
    <link rel="stylesheet" type="text/css" href="css/bootstrap-switch.css"/>
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="./css/jquery.jOrgChart.css"/>
    <link rel="stylesheet" type="text/css" href="./css/jquery-ui.css"/>
    <link rel="stylesheet" type="text/css"
          href="css/zTreeStyle/zTreeStyle.css">
    <link rel="stylesheet" type="text/css" href="css/common.css"/>
    <!--[if lt IE 10]>
    <link rel="stylesheet" type="text/css" href="css/compatibleIE.css"/>
    <![endif]-->
</head>
<body class="body-autoHeight">
	<%--背景 Start--%>
	<div id="imgBg" class="bg"></div>
	<%--背景 End--%>
	<%--左侧边栏 Start--%>
	<div data-role="leftAside" id="leftAside" class="aside aside-left">
		<!-- <img src="img/agree.png" class="aside-logo" /> -->

		<div class="accordion aside-menu" id="asideMenuList">
			<%--测试用 --%>
			<div class="accordion-group">
			    <div class="accordion-heading">
			        <a class="accordion-toggle collapsed hvr-bounce-to-left" data-toggle="collapse" data-parent="#asideMenuList" href="#asideDev1">
			            <i class="fa   fa-yelp"></i><span>&nbsp;采购</span>
			            <i class="fa fa-angle-down"></i>
			        </a>
			    </div>
			    <div id="asideDev1" class="accordion-body collapse">
			        <div class="accordion-inner">
			            <ul class="nav nav-list">
			                <!--子菜单项 Start-->
			                <li><a data-href="buy#apply">采购申请</a></li>
			                <li><a data-href="buy#reply">采购回复</a></li>
			                <!--子菜单项 End-->
			            </ul>
			        </div>
			    </div>
			</div>
			
			<div class="accordion-group">
			    <div class="accordion-heading">
			        <a class="accordion-toggle collapsed hvr-bounce-to-left" data-toggle="collapse" data-parent="#asideMenuList" href="#asideDev2">
			            <i class="fa   fa-yelp"></i><span>&nbsp;供货</span>
			            <i class="fa fa-angle-down"></i>
			        </a>
			    </div>
			    <div id="asideDev2" class="accordion-body collapse">
			        <div class="accordion-inner">
			            <ul class="nav nav-list">
			                <!--子菜单项 Start-->
			                <li><a data-href="supply#supplyimf">供货信息</a></li>
			                <!--子菜单项 End-->
			            </ul>
			        </div>
			    </div>
			</div>
			
			<div class="accordion-group">
			    <div class="accordion-heading">
			        <a class="accordion-toggle collapsed hvr-bounce-to-left" data-toggle="collapse" data-parent="#asideMenuList" href="#asideDev3">
			            <i class="fa   fa-yelp"></i><span>&nbsp;存储</span>
			            <i class="fa fa-angle-down"></i>
			        </a>
			    </div>
			    <div id="asideDev3" class="accordion-body collapse">
			        <div class="accordion-inner">
			            <ul class="nav nav-list">
			                <!--子菜单项 Start-->
			                <li><a data-href="storage#general">一般实验室物品</a></li>
			                <li><a data-href="storage#danger">易制毒、剧毒物品</a></li>
			                <!--子菜单项 End-->
			            </ul>
			        </div>
			    </div>
			</div>
			
			<div class="accordion-group">
			    <div class="accordion-heading">
			        <a class="accordion-toggle collapsed hvr-bounce-to-left" data-toggle="collapse" data-parent="#asideMenuList" href="#asideDev12">
			            <i class="fa   fa-yelp"></i><span>&nbsp;使用</span>
			            <i class="fa fa-angle-down"></i>
			        </a>
			    </div>
			    <div id="asideDev12" class="accordion-body collapse">
			        <div class="accordion-inner">
			            <ul class="nav nav-list">
			                <!--子菜单项 Start-->
			                <li><a data-href="buy#buy">采购</a></li>
			                <!--子菜单项 End-->
			            </ul>
			        </div>
			    </div>
			</div>
			
			<div class="accordion-group">
			    <div class="accordion-heading">
			        <a class="accordion-toggle collapsed hvr-bounce-to-left" data-toggle="collapse" data-parent="#asideMenuList" href="#asideDev5">
			            <i class="fa   fa-yelp"></i><span>&nbsp;回收</span>
			            <i class="fa fa-angle-down"></i>
			        </a>
			    </div>
			    <div id="asideDev5" class="accordion-body collapse">
			        <div class="accordion-inner">
			            <ul class="nav nav-list">
			                <!--子菜单项 Start-->
			                <li><a data-href="recovery#tuihui">退回表</a></li>
			                <li><a data-href="recovery#cunfan">存放表</a></li>
			                <li><a data-href="recovery#huishou">回收表</a></li>
			                <!--子菜单项 End-->
			            </ul>
			        </div>
			    </div>
			</div>
			
			<div class="accordion-group">
			    <div class="accordion-heading">
			        <a class="accordion-toggle collapsed hvr-bounce-to-left" data-toggle="collapse" data-parent="#asideMenuList" href="#asideDev12">
			            <i class="fa   fa-yelp"></i><span>&nbsp;个人中心</span>
			            <i class="fa fa-angle-down"></i>
			        </a>
			    </div>
			    <div id="asideDev12" class="accordion-body collapse">
			        <div class="accordion-inner">
			            <ul class="nav nav-list">
			                <!--子菜单项 Start-->
			                <!--子菜单项 End-->
			            </ul>
			        </div>
			    </div>
			</div>
			
			<div class="accordion-group">
                <div class="accordion-heading">
                    <a class="accordion-toggle collapsed hvr-bounce-to-left" data-toggle="collapse" data-parent="#asideMenuList" href="#asideDev19">
                        <i class="fa fa-yelp"></i>
                        <span>图表测试</span>
                        <i class="fa fa-angle-down"></i>
                    </a>
                </div>
                <div id="asideDev19" class="accordion-body collapse">
                    <div class="accordion-inner">
                        <ul class="nav nav-list">
                            <li><a data-href="testEcharts#line">折线</a></li>
                            <li><a data-href="testEcharts#line2">折线2</a></li>
                            <li><a data-href="testEcharts#bar">柱形图</a></li>
                            <li><a data-href="testEcharts#pie">饼状图</a></li>
                            <li><a data-href="gridhome">网格</a></li>
                            <li><a data-href="afaEchart">afaEchart</a></li>
                            <li><a data-href="echartsModule">test</a></li>
                             <li><a data-href="fineDegree">test2</a></li>
                            <li><a data-href="afaDefine">布局测试</a></li>
                        </ul>
                    </div>
                </div>
            </div>
			
            <div class="accordion-group">
                <div class="accordion-heading">
                    <a class="accordion-toggle collapsed hvr-bounce-to-left" data-toggle="collapse" data-parent="#asideMenuList" href="#asideDev">
                        <i class="fa fa-yelp"></i>
                        <span>开发者</span>
                        <i class="fa fa-angle-down"></i>
                    </a>
                </div>
                <div id="asideDev" class="accordion-body collapse">
                    <div class="accordion-inner">
                        <ul class="nav nav-list">
                            <li><a data-href="awebDevDocs#awebDevDescription">开发说明</a></li>
                            <li><a data-href="awebDevDocs#awebJSAPIs">前端JS API</a></li>
                            <li><a data-href="awebDevDocs#awebCssSpecification">前端CSS API</a></li>
                        </ul>
                    </div>
                </div>
            </div>
		</div>
	</div>
	<%--左侧边栏 End--%>
	<%--右侧边栏 Start--%>
	<div data-role="rightAside" id="rightAside"
		class="aside-right collapsed">
		<div class="page-header">
			<h2>
				<span id="rightAsideTitle">创建实例</span> <a id="rightAsideCloseBtn"
					title="关闭" class="close">&times;</a>
			</h2>
		</div>
		<form class="form-horizontal"></form>
	</div>
	<%--右侧边栏 End--%>
	<%--导航栏 Start--%>
	<div id="banner" data-role="banner" class="navbar banner">
		<div class="navbar-inner">
			<ul class="nav pull-left banner-menu">
			   <li><div style="height:60px;width:60px;padding:20px 0 20px 20px"><img src="img/login/logo2.png"></div></li>
			   <li><div style="height:60px;width:auto;padding:20px 0 20px 8px;color:#fff"><span style=" font-weight:bold;font-size:1.3em">CAMA集中监控系统</span><span id="nowTime" style="line-height:3.2em;display:block;opacity: 0.8;"></span></div></li>
			</ul>
            <ul id="bannerMenu" class="nav banner-menu"></ul>
            <ul class="nav pull-right banner-menu">
                <li class="dropdown"><a class="dropdown-toggle"
                                        data-toggle="dropdown" href="javascript:" title="帮助文档"> <i
                        class="fa fa-question-circle"></i>
                </a>
                    <ul class="dropdown-menu">
                        <li><a href="module/userGuide/userGuide.html" target="_blank"><i
                                class="fa fa-newspaper-o"></i>&nbsp;用户指南</a></li>
                        <li><a href="module/userGuide/frequentlyAsked.html" target="_blank"><i
                                class="fa fa-star"></i>&nbsp;常见问题</a></li>
                    </ul></li>
                <li><a id="skinChangeShowBtn" href="javascript:" title="皮肤设置"><i
                        class="fa fa-leaf"></i></a>
                    <div id="skinChangeContainer" class="skin-change in">
                        <h4 class="page-header">
                            <i class="fa fa-leaf"></i>&nbsp;皮肤设置<small id="skinClose"
                                                                       class="close fa fa-close" title="关闭"></small>
                        </h4>
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="#localPic" data-toggle="tab" data-role="tabs"><i class="fa fa-photo"></i>默认图片</a></li>
                            <li><a href="#onlinePic" data-toggle="tab"
                                                  data-role="tabs"><i class="fa fa-paw"></i>网络图片</a></li>
                            <li><a href="#custom" data-toggle="tab" data-role="tabs"><i class="fa fa-file-photo-o"></i>自定义图片</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="localPic">
                                <ul id="localPicList"></ul>
                            </div>
                            <div class="tab-pane" id="onlinePic">
                                <ul id="onlinePicList"></ul>
                                <div class="noNet hide"><i class="fa fa-frown-o"></i>网络不给力</div>
                                <a class="next-page-btn btn-green hvr-ripple-out" id="nextPagebtn">换一页</a>
                            </div>
                            <div class="tab-pane" id="custom">
                                <div class="text-center">
                                    <label for="imageUploadID">点击选择图片：</label>
                                    <div class="uploadIcon">
                                        <input id="imageUploadID" name="image" type="file" accept=".jpg,.jpeg,.bmp,.gif,.png" />
                                        <span class="help-inline hide"></span>
                                    </div>
                                    <button id="uploadPicBtn" class="btn btn-inverse hvr-radial-out">上传</button>
                                </div>
                            </div>
                        </div>
                    </div></li>
                <li><a id="messageCenterShowBtn" href="javascript:"
                       title="消息中心"><i class="fa fa-bell-o"></i></a>
                    <div id="messageCenterContainer" class="message-center collapsed">
                        <h3 class="page-header">
                            消息中心 <small><a title="清除全部" class="close">&times;清除全部</a></small>
                        </h3>
                        <ul id="messageCenterList" class="unstyled message-center-list"></ul>
                    </div></li>
                <%--<li><a href="javascript:" title="设置"><i class="fa fa-cogs"></i></a></li>--%>
                <li class="dropdown"><a class="dropdown-toggle"
                                        data-toggle="dropdown" href="javascript:" title="用户管理"> <i
                        class="fa fa-user"></i>
                </a>
                    <ul class="dropdown-menu">
                        <!-- <li><a href="javascript:" target="_blank"><i
                                class="fa fa-newspaper-o"></i>&nbsp;基本信息</a></li> -->
                        <li><a id="usersafebtn" href="javascript:">&nbsp;<i
                                class="fa fa-unlock-alt"></i>&nbsp;&nbsp;修改密码
                        </a></li>
                        <li><a id="signOut" href="javascript:" title="退出登录"><i
                                class="fa fa-sign-out"></i>&nbsp;退出登录</a></li>
                    </ul>
                <li>
            </ul>
		</div>
	</div>
	<%--导航栏 End--%>
	<!-- 修改密码 Temp Start -->
	<div id="upPasswordTemp" class="modal fade hide" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-header">
			<button type="button" class="close hide" data-dismiss="modal"
				aria-hidden="true">&times;</button>
			<h3>修改密码</h3>
		</div>
		<div class="modal-body">
			<form class="form-horizontal">
				<div class="control-group">
					<label class="control-label" for="user_password">密码：</label>
					<div class="controls">
						<input id="user_password" name="password" type="password"
							placeholder="密码" class="span8"> <span
							id="user_passwordTips" class="help-inline hide"></span>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="user_repassword">重复密码：</label>

					<div class="controls">
						<input id="user_repassword" name="repassword" type="password"
							placeholder="重复密码" class="span8"> <span
							id="user_repasswordTips" class="help-inline hide"></span>
					</div>
				</div>
			</form>
		</div>
		<div class="modal-footer">
			<a id="upPasswordbtn" href="javascript:"
				class="btn btn-inverse hvr-radial-out">修改</a> <a
				id="resetPasswordbtn" href="javascript:" class="btn hvr-radial-out">清空</a>
		</div>
	</div>
	<!--修改密码 Temp End-->
	<%--消息弹出 Start--%>
	<ul id="alertList" data-role="alertList" class="alert-list unstyled"></ul>
	<%--消息弹出 End--%>
	<%--内容 Start--%>
	<div data-role="container" class="content-container hidden">
		<%--选项卡 Start--%>
            <%--右键按钮 Start--%>
            <ul id="tabsContextMenu" class="tab-content-menu hide"></ul>
            <%--右键按钮 End--%>
		<div id="tabsContainer" class="tabs-container">
			<div class="tabs-left-group">
			<button id="asideMenu" class="brand" title="菜单">
                <i class="fa fa-navicon fa-2x"></i>
			</button>
			<button id="tabsLeft" type="button" title="左移标签"
				class="btn tabs-left hidden">
				<i class="fa fa-chevron-left"></i>
			</button>
			</div>
			<ul id="tabs" data-role="tab" class="nav nav-tabs tabs">
			</ul>
			<div class="tabs-right-group">
				<button id="tabsRight" type="button" title="右移标签"
					class="btn tabs-right hidden">
					<i class="fa fa-chevron-right"></i>
				</button>
				<button id="tabsFull" title="全屏" data-retract-title="还原" data-full-title="全屏" type="button" class="btn tabs-full">
					<i class="fa fa-expand"></i>
				</button>
			</div>
		</div>
		<%--选项卡 End--%>
		<%--显示内容 Start--%>
		<div id="awebPageFrame" class="main" data-role="content"></div>
		<%--显示内容 End--%>
	</div>
	<%--内容 End--%>
	<%--遮罩 Start--%>
	<div id="mask" class="mask" style="z-index: 4"></div>
	<%--遮罩 End--%>
	<%--模板 Start--%>
	<%--标签tab模板、信息alert模板 Start--%>
	<ul id="tabsTemp" class="hide">
		<li class="active" data-tab-id="{tabId}" data-href="{href}"
			<%--data-index="{index}" --%>title="{title}"><a>{title}</a>
			<button type="button" class="close">&times;</button></li>
		<li class="alert-showType">
			<div class="alert-container">
				<%--<h4>{title}</h4>--%>
				<div class="alert-content" title="{content}">{content}</div>
			</div>
			<button type="button" class="close alert-close">&times;</button>
		</li>
		<li title="{msg}">
			<h4>
				{title}<small class="pull-right">{time}</small>
			</h4>
			<div>{msg}</div>
			<button type="button" class="close">×</button>
		</li>
	</ul>
	<%--标签tab模板、信息alert模板 End--%>
	<%--模板 End--%>
	<%--引入脚本 Start--%>
    <script>/*设置背景图的*/
    (function(){
        function getCookie (name) {
            try {
                return unescape(document.cookie.match(new RegExp(name + '=([^;]+)'))[1]);
            } catch (ex) {
                return null;
            }
        }
        function setStyle(str) {
            var textNode = ".bg{background-image:url('" + str + "') })",
                    style = document.styleSheets[0],
                    body = document.getElementsByTagName('body');


            if(style.insertRule){
                style.insertRule(".bg{background-image:url('" + str + "') }",0);
            }else if(style.addRule){
                style.addRule('.bg',"background-image:url('" + str + "') ",0);
            }


            if(body[0]&&body[0].style){
                body[0].style.opacity=1;
            }
        }

        var defaultPath='img/bg.jpg',
                bgImg=new Image(),
                body=document.getElementsByTagName('body'),
                currentBody=body[0];
        //设置body的背景图片
        if(getCookie('imgPath')){
            defaultPath=getCookie('imgPath');
        }
        try{
            bgImg.onload=function() {
                setStyle(this.src);
            };
            bgImg.src=defaultPath;
        }catch (e){
            setStyle('img/bg.jpg');
        }
    })();
    </script>
	<script type="text/javascript" src="script/lib/require.js" data-main="bootloader"></script>
	<%--引入脚本 End--%>
	<%--登出跳转到登陆页面 Start--%>
	<form id="redirectForm" action="LoginAction_redirect.do" method="POST"></form>
	<%--登出跳转到登陆页面 End--%>
</body>
</html>