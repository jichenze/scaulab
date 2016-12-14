<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<%--页面前缀 event--%>
<style type="text/css">
.event-invoices-ctn {
	height: 80px;
}

.event-invoices-cct {
	background-color: rgba(2, 22, 22, .1);
	height: 75px;
	width: 48%;
	float: left;
	margin-right: 2%;
	box-shadow: 1px #222222;
	border-radius: 5px;
}

.event-module {
	/* margin-top: 0.2%;
	margin-left: 1%;
	margin-right: 1%; */
	float: left;
	background-color: rgba(2, 22, 22, .2);
}

.event-number {
	float: left;
	margin-left: 2%;
	width: 30%;
	height: 50%;
}

.event-number-icon {
	margin-left: 20%;
	/* margin-top:20%; */
}

.form_datetime-input {
	width: 100px;
}

.event-common-input {
	width: 120px;
}

/*代办详情*/
.agentDtl {
	margin-left: 30%;
	padding-top: 10%;
	margin-right: 30%;
}

/* 事件详细 start */
.event-dtl-info {
	height: 100px;
	width: 23%;
	margin: .5%;
	border: 1px solid black;
	float: left;
}

.event-dtl-info2 {
	height: 100px;
	width: 49%;
	float: left;
	margin: .5%;
	border: 1px solid black;
}

.event-dtl-data {
	height: 200px;
	width: 270px;
	margin: 1%;
	float: left;
	border: solid 1px red;
}

.event-dtl-operation {
	height: 200px;
	width: 98%;
	margin: 1%;
	border: solid 1px red;
	float: left;
}

.event-echarts-grid-detail {
	float: left;
	height: 250px;
	width: 250px;
	margin-left: 15px;
	margin-bottom: 10px;
	margin-top: 10px;
	background-color: rgba(22, 22, 22, .1);
}
/*  .echarts-grid-module{
    float: left;
	height: 270px;
} */
.echarts-grid-info {
	float: left;
	height: 250px;
	width: 60px;
	margin-bottom: 10px;
	margin-top: 10px;
	background-color: rgba(22, 22, 22, .1);
}

.event-echarts-grid-detail .echarts-grid-piece {
	height: 250px;
	width: 250px;
	background-color: rgba(22, 22, 22, .4);
}
/* 事件详细 end */
</style>


<!--  start-->
<div class="event-module" style="width: 95%">
	<div style="padding-top: 10px; margin-left: 10px;">
		事件名：<input type="text" id="eventName" class="event-common-input"
			placeholder="请输入事件名..." /> 起始时间：
		<div class="input-append date form_datetime" data-date="">
			<input size="8" type="text" id="startTime" value="" readonly
				class="form_datetime-input" placeholder="请输开始日期..."> <span
				class="add-on"><i class="icon-remove"></i></span> <span
				class="add-on"><i class="icon-calendar"></i></span>
		</div>
		结束时间：
		<div class="input-append date form_datetime" data-date="">
			<input size="8" type="text" id="endTime" value="" readonly
				class="form_datetime-input" placeholder="请输结束日期..."> <span
				class="add-on"><i class="icon-remove"></i></span> <span
				class="add-on"><i class="icon-calendar"></i></span>
		</div>
		事件状态：<input type="text" id="eventState" placeholder="请输入事件状态..."
			class="event-common-input" />
		<button data-role="eventBtn" id="eventBtn"
			style="margin-left: 2%; margin-bottom: 15px;" class="btn">
			<img src="img/search.png" />
		</button>
		<button id="alleventBtn" style="margin-bottom: 15px" class="btn">返回</button>
	</div>
	<div style="height: auto">
		<table class="table display" data-role="eventTb">
			<thead>
				<tr>
					<th>事件渠道</th>
					<th>系统名称</th>
					<th>事件源</th>
					<th>事件摘要</th>
					<th>最后发生时间</th>
					<th>事件类型</th>
					<th>事件状态</th>
					<th style="width: 20%">事件操作</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</div>
<!-- end-->

<!-- 跳转按钮start -->
<div class="event-change"
	style="position: fixed; left: 95%; padding-top: 20%">
	<span style="text-align: center;">
		<button type="button" id="change1" class="btn btn-large btn-circle"
			style="background: transparent">
			<i class="icon-chevron-right"></i>
		</button>
	</span>
</div>
<!-- end -->

<!-- 转代办详情start -->
<div data-role="agentDtlTemp" class="modal fade hide sltModal modal-lg"
	tabindex="-1" role="dialog" aria-labelledby="myModalLabel1"
	aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">&times;</button>
		<h4>
			<strong>代办详情</strong>
		</h4>
	</div>
	<div class="agentDtl">
		<div class="control-group">
			<label class="control-label span6" for="time"><font size=4>预期恢复时间：</font></label>
			<div class="controls">
				<input id="time" name="time" type="text" class="span9" />
			</div>
		</div>

		<div class="control-group">
			<label class="control-label span6" for="state"><font size=4>新告警阈值：</font></label>
			<div class="controls">
				<input id="warn" name="warn" type="text" class="span9" />
			</div>
		</div>
		<br>
		<br>
		<div style="float: right">
			<button id="dtlCreSmtBtn" type="button" class="btn btn-inverse">确定</button>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<button type="reset" class="btn">重置</button>
		</div>
	</div>
</div>
<!-- end -->

<!-- 事件详情start -->
<div data-role="eventDtlTemp" class="modal fade hide sltModal modal-lg"
	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">&times;</button>
		<h4>
			<strong>事件详情</strong>
		</h4>
	</div>
	<div class="modal-body">
		<div>
			<div class="event-dtl-info">基本信息</div>
			<div class="event-dtl-info">事件扩展信息</div>
			<div class="event-dtl-info2">事件概况</div>
		</div>

		<div class="echarts-grid-module">
			<div class="echarts-grid-info">说明</div>
			<div class="event-echarts-grid-detail">
				<div data-role="successRateCtn" class="echarts-grid-piece"></div>
			</div>
			<div class="event-echarts-grid-detail">
				<div data-role="tradeNumCtn" class="echarts-grid-piece"></div>
			</div>
			<div class="event-echarts-grid-detail">
				<div data-role="useTimeCtn" class="echarts-grid-piece"></div>
			</div>
		</div>

		<div class="echarts-grid-module">
			<div class="echarts-grid-info">说明</div>
			<div class="event-echarts-grid-detail">
				<div data-role="cpuCtn" class="echarts-grid-piece"></div>
			</div>
			<div class="event-echarts-grid-detail">
				<div data-role="swapCtn" class="echarts-grid-piece"></div>
			</div>
			<div class="event-echarts-grid-detail">
				<div data-role="fileCtn" class="echarts-grid-piece"></div>
			</div>
		</div>

		<div class="echarts-grid-module hide">
			<div class="echarts-grid-info">说明</div>
			<div class="event-echarts-grid-detail">
				<div data-role="cpuCtn" class="echarts-grid-piece"></div>
			</div>
			<div class="event-echarts-grid-detail">
				<div data-role="swapCtn" class="echarts-grid-piece"></div>
			</div>
			<div class="event-echarts-grid-detail">
				<div data-role="fileCtn" class="echarts-grid-piece"></div>
			</div>
		</div>
		<div>
			<div class="event-dtl-operation">操作</div>
		</div>
	</div>
	<div class="modal-footer">
		<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
	</div>
</div>
<!-- 事件详情end -->

