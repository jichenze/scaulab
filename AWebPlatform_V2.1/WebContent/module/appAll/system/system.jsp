<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<%--页面前缀 system--%>
<style type="text/css">
/* .system-invoices-ctn {
	height: 125px;
} */

.system-invoices-cct {
	background-color: rgba(50, 50, 50, .1);
	height: 120px;
	width: 48%;
	float: left;
	margin-right: 2%;
	margin-bottom:20px;
	box-shadow: 1px #222222;
	border-radius: 5px;
}

.system-module {
	margin-top: 20px;
	margin-left: 1%;
	margin-right: 1%;
	background-color: rgba(50, 50, 50, .1);
}

.system-number {
	float: left;
	margin-left: 2%;
	width: 30%;
	height: 50%;
}

.system-number-icon {
	margin-left:20%;
	/* margin-top:20%; */
}

.form_datetime-input {
	width: 110px;
}
.system-common-input{
   width:120px;
}
</style>
<!-- 事件统计start-->
<div data-role="" class="system-module system-invoices-ctn ">
	<div data-role="" class="system-invoices-cct">
		<div class="system-number-icon">
			<img src="img/config.png" style="width:3.2em;height:3.2em"></img>事件
		</div>
		<div class="ech-ctt-footer row-fluid">
			<div class="ech-attr span12">
				<span data-role="echMiddle" class="echMiddle">0</span>
				<br/>事件总数
			</div>
			<div class="ech-attr span12">
				<span data-role="echSystem" class="echSystem">0</span>
				<br/>已处理事件数
			</div>
			<div class="ech-attr span12">
			    <span data-role="echSql" class="echSql">0</span><br/>
				未处理事件数
			</div>
		</div>
	</div>
	<div data-role="" class="system-invoices-cct">
		<div class="system-number-icon">
			<img src="img/config.png" style="width:3.2em;height:3.2em"></img>服务器
		</div>
		<div class="ech-ctt-footer row-fluid">
			<div class="ech-attr span12">
				<span data-role="echMiddle" class="echMiddle">0</span>
				<br/>事件总数
			</div>
			<div class="ech-attr span12">
				<span data-role="echSystem" class="echSystem">0</span>
				<br/>已处理事件数
			</div>
			<div class="ech-attr span12">
			    <span data-role="echSql" class="echSql">0</span><br/>
				未处理事件数
			</div>
		</div>
	</div>
</div>
<!-- 事件统计 end-->
<div class="clearfix"></div>
<!-- 事件列表start-->
<div class="system-module">
	<div style="padding-top:10px;margin-left:10px;">
		事件名：<input type="text" class="system-common-input" placeholder="请输入事件名..."/>
		起始时间：<div class="input-append date form_datetime" data-date="">
		<input size="8" type="text" value="" readonly class="form_datetime-input" placeholder="请输开始日期...">
		<span class="add-on"><i class="icon-remove"></i></span> <span
			class="add-on"><i class="icon-calendar"></i></span>
	</div>
		结束时间：<div class="input-append date form_datetime" data-date="">
		<input size="8" type="text" value="" readonly class="form_datetime-input" placeholder="请输结束日期...">
		<span class="add-on"><i class="icon-remove"></i></span> <span
			class="add-on"><i class="icon-calendar"></i></span>
	     </div>
		事件状态：<select style="width:100px;"><option>告警</option><option>预警</option></select>
		<button data-role="eventBtn" style="float:right;margin-right:10px;margin-bottom:15px;" class="btn"><img src="img/search.png"/></button>
	</div>
	<div style="height:500px">
		<table class="table display" data-role="eventTb">
			<thead>
				<tr>
					<th>事件源</th>
					<th>系统名称</th>
					<th>服务器</th>
					<th>事件摘要</th>
					<th>最后发生时间</th>
					<th>事件状态</th>
					<th style="width:20%">事件操作</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</div>
<!-- 事件列表end-->


<!-- 拓扑图start-->
<div class="system-module" style="margin-bottom:30px;">

   <div style="height:200px">拓扑图</div>
</div>
<!-- 拓扑图end-->
