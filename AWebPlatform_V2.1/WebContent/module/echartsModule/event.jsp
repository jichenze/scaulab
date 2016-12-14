<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style type="text/css">
.mainapp-echarts-ctn {
	position: relative;
	margin: 20px 20px 20px 12px;
	height: 250px;
	width: 100%;
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

.event-img {
	width: 1.2em;
	height: 1.2em;
}
</style>
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


<button id="loadTableBtn" draggable='true'>表格</button>
<div id="testTableCtn"
	style="width: 99%; height: 200px; border: solid 1px gray; margin: 12px 0 10px 0; box-shadow: 2px 2px 2px 2px gray; border-radius: 2px; overflow: scroll; padding-top: 10px;"></div>

<button id="loadLineDataBtn" draggable='true'>固定图例图例动态x轴加载数据</button>
<div id="testLineCtn" style="width: 100%; height: 250px"></div>
<button id="loadLine2DataBtn">动态x轴动态图例</button>
<div id="testLine2Ctn" style="width: 100%; height: 250px"></div>
<button id="loadLine3DataBtn">动态加点折线图</button>
<div id="testLine3Ctn" style="width: 100%; height: 250px"></div>
<button id="loadDataBtn">固定图例加载数据</button>
<button id="loadDataBtn2">动态图例加载数据</button>
<div id="testPieCtn" style="width: 100%; height: 250px"></div>
<div id="testPie2Ctn" style="width: 100%; height: 250px"></div>


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
				</select></td>
			</tr>
			<tr>
				<td>图表类型</td>
				<td><select data-role="showTypeSel">
						<option value="">--请选择--</option>
				</select></td>
			</tr>
			<tr>
				<td>类型</td>
				<td><select data-role="stateSel">
						<option value="">--请选择--</option>
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