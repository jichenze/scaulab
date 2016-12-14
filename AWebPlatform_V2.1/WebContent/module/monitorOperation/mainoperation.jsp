<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<%--页面前缀 mainoperation--%>
<style type="text/css">
.mainoperation-echarts-ctn {
	margin: 10px;
	height: 250px;
	width: 100%;
}

.mainoperation-echarts-ctn-detail {
	height: 250px;
	width: 30%;
	float: left;
	margin-left: 2%;
	box-shadow: 1px #222222;
	border-radius: 5px;
	background-color: rgba(50, 50, 50, .1);
}

.mainoperation-system-ctn {
	heigth: auto;
	width: 98%;
}

.mainoperation-system-ctn-detail {
	background-color: rgba(50, 50, 50, .1);
	height: 190px;
	width: 18%;
	float: left;
	margin: 1%;
	box-shadow: 1px #222222;
	border-radius: 5px;
}

/*系统列表start*/
.ech-ctt {
	margin: 7px;
	padding: 8px;
	border-radius: 8px;
	height: 190px;
	background-color: rgba(50, 50, 50, 0.1);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#33333333,
		endColorstr=#33333333);
}

.ech-ctt>i {
	position: relative;
	top: -4px;
	left: 92%;
	font-size: 19px;
	cursor: pointer;
}

.ech-ctt-header {
	margin: -30px 0 0 0;
}

.ech-ctt-header>h4 {
	width: 100%;
	font-size: 12px;
	font-weight: bold;
	text-align: center;
}

.ech-fig {
	margin: -10px 0 15px 0;
	height: 60%;
	line-height: 12px;
	font-size: 20px;
	text-align: center;
}

.ech-fig>.ech-img {
	width: 55%;
}

.ech-fig>h6,.ech-fig>span {
	position: relative;
	top: -100px;
}

.ech-fig>span {
	font-size: 30px;
}

.ech-attr {
	height: 15%;
	font-size: 12px;
	text-align: center;
}

.ech-attr>span {
	font-size: 24px;
}
/*系统列表end*/
ul,li {
	margin: 0;
	padding: 0
}

#scrollDiv {
	width: 300px;
	height: 100px;
	min-height: 25px;
	line-height: 25px;
	border: #ccc 1px solid;
	overflow: hidden
}

#scrollDiv li {
	height: 25px;
	padding-left: 10px;
}
</style>

<!-- 图表 start-->
<div data-role="" class="mainoperation-echarts-ctn">
	<div data-role="testLineCtn1" class="mainoperation-echarts-ctn-detail"></div>
	<div data-role="testLineCtn2" class="mainoperation-echarts-ctn-detail"></div>
	<div data-role="testLineCtn3" class="mainoperation-echarts-ctn-detail"></div>
</div>
<!-- 图表 end-->

<!-- 事件滚动start -->
<div id="scrollDiv"
	style="border: 1px dotted red; width: 99%; margin: 15px;">
	<ul style="overflow: hidden">
		<li>这是公告标题的第一行</li>
		<li>这是公告标题的第二行</li>
		<li style="overflow: hidden">这是公告标题的第三行
			这是公告标题的第三行这是公告标题的第三行这是公告标题的第三行这是公告标题的第三行这是公告标题的第三行这是公告标题的第三行这是公告标题的第三行这是公告标题的第三行这是公告标题的第三行这是公告标题的第三行这是公告标题的第三行这是公告标题的第三行</li>
		<li>这是公告标题的第四行</li>
		<li>这是公告标题的第五行</li>
		<li>这是公告标题的第六行</li>
		<li>这是公告标题的第七行</li>
		<li>这是公告标题的第八行</li>
	</ul>
</div>
<!-- 事件滚动 end -->

<!-- 系统列表start-->
<div>
	<button data-role="eventBtn" style="width: 10%; margin-left: 2%"
		class="btn">事件列表</button>
</div>
<!-- 系统列表end-->

<%--系统图表区域Start --%>
<div id="echCtn" class="echCtn row"></div>
<%--系统图表区域 end --%>


<%--模板  添加echart组件模板 Temp Start--%>
<div id="echTemp" class="hide">
	<div class="ech-ctt span8 well">
		<%--图片表头Start --%>
		<i data-role="echLiked" class="echLiked fa fa-heart"></i>
		<div class="ech-ctt-header">
			<h4 data-role="echHead" class="echHead"></h4>
		</div>
		<%--图片表头End --%>

		<%--图片初始化容器Start --%>
		<div data-role="echFig" class="ech-fig">
			<br /> <img src="img/p1.png" data-role="echImg" class="ech-img">
			<h6 data-role="echFigHead">健康度</h6>
			<span data-role="echFigNum">30%</span>
		</div>
		<%--图片初始化容器End --%>
		<%--图片表尾Start --%>
		<div class="ech-ctt-footer row-fluid">
			<div class="ech-attr span12">
				应用<br /> <span data-role="echApp" class="echApp"> 0 </span>
			</div>
			<div class="ech-attr span12">
				中间件<br /> <span data-role="echMiddle" class="echMiddle">0</span>
			</div>
			<div class="ech-attr span12">
				系统<br /> <span data-role="echSystem" class="echSystem">0</span>
			</div>
			<div class="ech-attr span12">
				数据库<br /> <span data-role="echSql" class="echSql">0</span>
			</div>
		</div>
		<%--图片表尾Start --%>
	</div>
</div>
<%--模板  添加echart组件模板 Temp End--%>

