<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<%--页面前缀 appall--%>
<style>
.appall-system-ctn {
	heigth: auto;
	width: 98%;
}

.appall-system-ctn-detail {
	background-color: rgba(2, 22, 22, .2);
	height: 100px;
	width: 12%;
	float: left;
	margin: 1%;
	box-shadow: 1px #222222;
	border-radius: 5px;
}
</style>
<!-- 工单 start-->
<div>
	<input type="text" style="width: 100px; margin-left: 10px;" /> <input
		type="text" style="width: 100px; margin-left: 10px;" />
	<div style="float: right;">
		排序：<select style="width: 100px;"><option value="1">1</option>
			<option value="2">2</option></select>
	</div>
</div>
<!-- 工单 end-->

<!-- 系统列表start-->
<div id="systemListCtn" class="appall-system-ctn">
	<div class="appall-system-ctn-detail"></div>
	<div class="appall-system-ctn-detail"></div>
	<div class="appall-system-ctn-detail"></div>
	<div class="appall-system-ctn-detail"></div>
	<div class="appall-system-ctn-detail"></div>
	<div class="appall-system-ctn-detail"></div>
	<div class="appall-system-ctn-detail"></div>
</div>
<!-- 系统列表end-->
