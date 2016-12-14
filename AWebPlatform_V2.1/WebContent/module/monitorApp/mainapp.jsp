<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<%--页面前缀 mainapp--%>
<style type="text/css">
.mainapp-invoices-ctn {
	height: 80px;
	width: 100%;
}

.mainapp-invoices-cct {
	background-color: rgba(2, 22, 22, .2);
	height: 75px;
	width: 30%;
	float: left;
	margin-left: 3%;
	box-shadow: 1px #222222;
	border-radius: 5px;
}

.mainapp-invoices-cct-div {
	float: left;
	width: 40%;
	height: 100%;
	font-size: 1.5em;
	border-right: 1px dotted white;
}

.mainapp-invoices-cct-div>div {
	margin: 30px 10px 10px 20px;
}

.mainapp-invoices-cct-div2 {
	float: left;
	width: 50%;
	height: 100%;
	padding: 20px 10px;
}

.mainapp-echarts-ctn {
	position: relative;
	margin: 20px 20px 20px 12px;
	height: 250px;
	width: 100%;
}

.mainapp-echarts-ctn-detail {
	height: 250px;
	width: 30%;
	float: left;
	margin-left: 2%;
	box-shadow: 1px #222222;
	border-radius: 5px;
}

.mainapp-system-ctn {
	heigth: auto;
	width: 98%;
}

.mainapp-system-ctn-detail {
	background-color: rgba(2, 22, 22, .2);
	height: 190px;
	width: 18%;
	float: left;
	margin: 1%;
	box-shadow: 1px #222222;
	border-radius: 5px;
}

.event-echarts-grid {
	height: 280px;
	width: 30%;
	margin-left: 2.3%;
	float: left;
	position: relative;
	min-width: 300px;
	margin-bottom: 10px;
	margin-top: 10px;
	background-color: rgba(22, 22, 22, .1);
}

.event-echarts-grid .event-echarts-grid-piece {
	height: 250px;
	width: 100%;
	background-color: rgba(22, 22, 22, .4);
}

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

.event-img {
	width: 1.2em;
	height: 1.2em;
}

/*系统列表*/
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
</style>

<!-- 工单 start-->
<div data-role="" class="mainapp-invoices-ctn ">
	<div data-role="" class="mainapp-invoices-cct">
		<div class="mainapp-invoices-cct-div">
			<div>监控工单</div>
		</div>
		<div class="mainapp-invoices-cct-div2">
			<div style="display: inline;">
				已处理<span id="monHdlVoucher" style="color: green; font-size: 1em"></span>单
			</div>
			<div style="display: inline;">
				未处理<span id="monNotHdlVoucher" style="color: green; font-size: 1em"></span>单
			</div>
			<div>
				<div class="progress progress-success " style="width: 90%;">
					<div id="monStatistic" class="bar" style="width: 0%"></div>
				</div>
			</div>
		</div>

	</div>
	<div data-role="" class="mainapp-invoices-cct">
		<div class="mainapp-invoices-cct-div">
			<div>服务工单</div>
		</div>
		<div class="mainapp-invoices-cct-div2">
			<div style="display: inline;">
				已处理<span id="servHdlVoucher" style="color: green; font-size: 1em"></span>单
			</div>
			<div style="display: inline;">
				未处理<span id="servNotHdlVoucher" style="color: green; font-size: 1em"></span>单
			</div>
			<div>
				<div class="progress progress-success " style="width: 90%;">
					<div id="servStatistic" class="bar" style="width: 0%"></div>
				</div>
			</div>
		</div>
	</div>
	<div data-role="" class="mainapp-invoices-cct">
		<div class="mainapp-invoices-cct-div">
			<div>事件工单</div>
		</div>
		<div class="mainapp-invoices-cct-div2">
			<div style="display: inline;">
				已处理<span id="eventHdlVoucher" style="color: green; font-size: 1em"></span>单
			</div>
			<div style="display: inline;">
				未处理<span id="eventNotHdlVoucher"
					style="color: green; font-size: 1em"></span>单
			</div>
			<div>
				<div class="progress progress-success " style="width: 90%;">
					<div id="eventStatistic" class="bar" style="width: 0%"></div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 工单 end-->
<div id="homeGrid">
	<div class="row-fluid">
		<div class="hm-cell" data-index="0" id="monitor" data-role="test"></div>
		<div class="hm-cell" data-index="1" id="service"></div>
		<div class="hm-cell" data-index="2" id="things"></div>
	</div>
</div>
<table data-role="test3"></table>
<!-- 图表 start-->
<div data-role="" class="mainapp-echarts-ctn">
	<div class="event-echarts-grid" draggable="true">
		<div id="monConfigBtn" style="margin: 2px; float: right;">
			<img src="img/config.png" class="event-img"><a
				href="javascript:" style="">配置</a>
		</div>
		<div data-role="monLineCtn" class="event-echarts-grid-piece"></div>
	</div>
	<div class="event-echarts-grid">
		<div id="servConfigBtn" style="margin: 2px; float: right;">
			<img src="img/config.png" class="event-img"></img><a
				href="javascript:" style="">配置</a>
		</div>
		<div data-role="servLineCtn" class="event-echarts-grid-piece"></div>
	</div>
	<div class="event-echarts-grid">
		<div id="eventConfigBtn" style="margin: 2px; float: right;">
			<img src="img/config.png" class="event-img"></img><a
				href="javascript:" style="">配置</a>
		</div>
		<div data-role="eventLineCtn" class="event-echarts-grid-piece"></div>
	</div>
</div>
<!-- 图表 end-->



<!-- 系统列表start-->
<div>
	<input type="text" style="width: 200px; margin-left: 10px;" /> <img
		src="img/search.png" id="search"
		style="margin-left: -30px; margin-bottom: 20px;" />
	<button data-role="eventBtn" style="width: 10%; margin-left: 2%"
		class="btn">事件列表</button>
</div>
<!-- 系统列表end-->

<!-- 事件滚动start -->
<div id="scrollDiv"
	style="border: 1px dotted red; width: 99%; margin: 15px;">
	<ul style="overflow: hidden">
		<li>这是公告标题的第一行</li>
		<li>这是公告标题的第二行</li>
		<li>这是公告标题的第三行这是公告标题的第三行这是公告标题的第三行这是这是公告标题的第三行</li>
		<li>这是公告标题的第四行</li>
		<li>这是公告标题的第五行</li>
		<li>这是公告标题的第六行</li>
		<li>这是公告标题的第七行</li>
		<li>这是公告标题的第八行</li>
	</ul>
</div>
<!-- 事件滚动 end -->

<%--系统健康度展示区域Start --%>
<div id="echCtn" class="echCtn row"></div>
<%--系统健康度展示区域Start --%>

<!-- 系统列表 end-->


<!-- 模态框start -->
<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">×</button>
		<h3 id="myModalLabel">指标配置</h3>
	</div>
	<div class="modal-body">
		<table style="margin-left: 30px;">
			<tr>
				<td>指标</td>
				<td><select data-role="classifySel">
						<option value="">--请选择--</option>
						<!--  <option value="cpu">cpu</option>
				      <option value="jvm">jvm</option> -->
				</select></td>
			</tr>
			<tr>
				<td>图表类型</td>
				<td><select data-role="showTypeSel">
						<option value="">--请选择--</option>
						<!-- <option value="line">line</option>
					  <option value="pie">pie</option> -->
				</select></td>
			</tr>
			<tr>
				<td>类型</td>
				<td><select data-role="stateSel">
						<option value="">--请选择--</option>
						<!--  <option value="0_1">固定图例动态x轴</option>
						<option value="1_1">动态图例动态x轴</option>
						<option value="2">固定图例动态点</option>
						<option value="0">饼状图固定图例动态点</option>
						<option value="1">饼状图图例动态点</option> -->
				</select></td>
			</tr>

		</table>
	</div>
	<div class="modal-footer">
		<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
		<button class="btn btn-inverse btn-small" data-role="saveBtn">保存</button>
	</div>
</div>
<!-- 模态框end-->

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

<div id="selectModal" class="modal hide fade">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">&times;</button>
		<h3>选择需要展现的模块</h3>
	</div>
	<div class="modal-body">
		<!--		<fieldset>
			<legend>选择需要展现的模块</legend>-->

		<label>选择监控项</label> <select id="topicSel">

		</select> <label id="agentLabel">选择代理</label> <select id="agentSel">
			<option value="TestAgent">测试代理</option>
		</select>
		<!--</fieldset>-->
	</div>
	<div class="modal-footer">
		<a id="closeBtn" href="#" class="btn">关闭</a> <a id="saveBtn" href="#"
			class="btn btn-info">保存</a>
	</div>
</div>

