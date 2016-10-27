<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<%--页面前缀 appall--%>
<style>
 
 /*系统列表*/
 
 .ech-ctt{
	margin:7px;
	padding:8px;
	border-radius:8px;
	height:190px;
	background-color: rgba(50,50,50,0.1);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#33333333,endColorstr=#33333333); 
}

.ech-ctt>i{
	position:relative;
	top:-4px;
	left:92%;
	font-size:19px;
	cursor:pointer;
}
.ech-ctt-header{
	margin:-30px 0 0 0;
}
.ech-ctt-header>h4{
	width:100%;
	font-size:12px;
	font-weight:bold;
	text-align:center;
}
.ech-fig{
	margin:-10px 0 15px 0;
	height:60%;
	line-height:12px;
	font-size:20px;
	text-align:center;
}
.ech-fig>.ech-img{
	width:55%;
}
.ech-fig>h6,.ech-fig>span{
	position:relative;
	top:-100px;
}
.ech-fig>span{
	font-size:30px;
}
.ech-attr{
	height:15%;
	font-size:12px;
	text-align:center;
}
.ech-attr>span{
	font-size:24px;
}
</style>
<!-- 工单 start-->
<div>
   <select style="width:100px;"><option>全部</option></select>
   <input id="searchfine" type="text" style="width:100px;margin-left:10px;"/>
   <img src="img/search.png" id="search" style="margin-left:-30px;margin-bottom:20px;"/>
   <div style="float:right;">排序：<select style="width:100px;"><option value="1">1</option><option value="2">2</option></select></div>
</div>
<!-- 工单 end-->


<%--表格插入区域Start --%>
<div id="echCtn" class="echCtn row"></div>
<%--表格插入区域Start --%>

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
			<br/>
			<img src="img/p2.png" data-role="echImg" class="ech-img">
			<h6 data-role="echFigHead">健康度</h6>
			<span data-role="echFigNum">30%</span>
		</div>
		<%--图片初始化容器End --%>
		<%--图片表尾Start --%>
		<div class="ech-ctt-footer row-fluid">
			<div class="ech-attr span12">
				应用<br/>
				<span data-role="echApp" class="echApp">
				0
				</span>
			</div>
			<div class="ech-attr span12">
				中间件<br/>
				<span data-role="echMiddle" class="echMiddle">0</span>
			</div>
			<div class="ech-attr span12">
				系统<br/>
				<span data-role="echSystem" class="echSystem">0</span>
			</div>
			<div class="ech-attr span12">
				数据库<br/>
				<span data-role="echSql" class="echSql">0</span>
			</div>
		</div>
		<%--图片表尾Start --%>
		
	</div>
</div>
<%--模板  添加echart组件模板 Temp End--%>
