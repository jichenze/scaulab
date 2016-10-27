<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<%--页面前缀 os--%>
<style type="text/css">
.os-info{
    height: 100px;
}

.os-info-div{
   height:100px;
   float:left;
   backgroup-color:green;
   margin-left: 1%;
   background-color:rgba(2,22,22,.1);
}
.os-echarts{
   margin-top:20px;
   height: 200px;
}
.os-echarts-div{
   height:200px;
   float:left;
   width:32%;
   margin-left: 1%;
   background-color:rgba(2,22,22,.1);
}
.os-table{
   margin-top:20px;
   height: 200px;
   margin-bottom:20px;
}
.os-table-div{
   height: 200px;
   background-color:rgba(2,22,22,.1);
   float:left;
   margin-left:1%;
   width:48.5%;
}
</style>
<!--  start-->
<div class="os-info">
   <div class="os-info-div" style="width:32%">
       <div>基本信息</div>
   </div>
   <div class="os-info-div" style="width:16%">
       <div>健康度</div>
   </div>
   <div class="os-info-div" style="width:48%">
       <div>系统属性</div>
   </div>
</div>
<!-- end-->

<div id="testChartsCtn"></div>
<!-- 事件详情start -->
<div data-role="echartsDtlTemp" class="modal fade hide sltModal modal-lg" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">&times;</button>
		<h4>
			<strong>详细信息</strong>
		</h4>
	</div>
	<div class="modal-body">
		<div data-role="echartsDtlCtn">
		</div>
	</div>
	<div class="modal-footer">
		<button class="btn" data-dismiss="modal" aria-hidden="true" data-role="deleteBtn">取消</button>
	</div>
</div>
<!-- 事件详情end -->
<!-- start-->
<!-- <div class="os-echarts">
   <div class="os-echarts-div"></div>
   <div class="os-echarts-div"></div>
   <div class="os-echarts-div"></div>
</div> -->
<!-- end-->
<div class="clearfix"></div>
<!-- start-->
<!-- <div class="os-echarts">
   <div class="os-echarts-div" style="width:65%"></div>
   <div class="os-echarts-div" style="width:32%"></div>
</div> -->
<!-- end-->


<!-- start-->
<div class="os-table ">
   <div class="os-table-div"></div>
   <div class="os-table-div"></div>
</div>
<!-- end-->