<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
#despList tr>td:first-child,#colorList tr>td:first-child,#filterList tr>td:first-child,#expandList tr>td:first-child,#otherList tr>td:first-child,#queryList tr>td:first-child
	{
	padding-left: 50px !important;
	width: 200px !important;
}

#displayList tr>td:first-child {
	padding-left: 50px !important;
	width: 250px !important;
}

#colorList tr>td input,#expandList tr>td input,#filterList tr>td input {
	/* padding-left: 20px !important;  */
	width: 180px !important;
}

.nav.nav-tabs.gutter-bottom .active {
	background-color: white;
	color: black;
	font-weight: bold;
}
/* 表格的最小宽度 */
.flow-table-width {
	min-width: 7em;
}

.que-conditions {
	width: 97.5%;
	height: 130px;
	margin-top: 0.8%;
	margin-left: 1%;
	padding: 1px;
	padding-top: 0.8%;
	padding-left: 1%;
	box-shadow: 1px 1px 7px #CBE;
	background: rgba(121, 104, 146, .2);
	margin-bottom: 10px;
}

.que-conditions td {
	padding: 2px 2px 2px;
}

.que-conditions input[type='text'] {
	width: 15em;
}

#statisticsAllTb tr td input {
	width: 10em;
}

#statisticsAllTb tr td select {
	width: 11em;
}
</style>
<button type="button" class="btn" data-toggle="collapse"
	data-target="#statisticDisplayCtn">收/展统计数据</button>
<%-- 全口径交易流水配置 End --%>
<span data-role="configCtn">
	<button type="button" id="pageConfigBtn" class="btn">显示配置</button>
	<button type="button" id="expandConfigBtn" class="btn">扩展字段配置</button>
</span>
<%-- 全口径交易流水配置 End --%>

<div id="statisticDisplayCtn" class="collapse in">
	<div class="que-conditions">
		<table id="statisticsAllTb">
			<tbody>
				<tr>
					<td>筛选条件：</td>
					<td><select id="selectType">
							<option value="00000">按全口径</option>
							<option value="01000">按应用</option>
							<option value="00100">按交易</option>
							<option value="10000">按渠道</option>
					</select></td>
					<td>数据更新时间间隔：</td>
					<td><select id="loopTime">
							<option value="1">1分钟</option>
							<option value="2">2分钟</option>
							<option value="3">5分钟</option>
							<option value="4">10分钟</option>
					</select></td>
					<td>时间区间开始：</td>
					<td><input id="startDate" name="expiredtime" type="datetime"
						readonly="" placeholder="请选择开始时间" class="span8 form_datetime"></td>
					<td>时间区间结束：</td>
					<td><input id="endDate" name="expiredtime" type="datetime"
						readonly="" placeholder="请选择结束时间" class="span8 form_datetime"></td>
				</tr>
				<tr></tr>
				<tr>
					<td>系统处理总笔数：</td>
					<td><input id="sysAllCount" type="text" disabled="disabled"></td>
					<td>系统处理成功笔数：</td>
					<td><input id="sysSucCount" type="text" disabled="disabled"></td>
					<td>业务处理总笔数：</td>
					<td><input id="busiAllCount" type="text" disabled="disabled"></td>
					<td>业务处理成功笔数：</td>
					<td><input id="busiSucCount" type="text" disabled="disabled"></td>
				</tr>
				<tr>
					<td>最大处理时间：</td>
					<td><input id="maxExecutedTime" type="text"
						disabled="disabled"></td>
					<td>最小处理时间：</td>
					<td><input id="minExecutedTime" type="text"
						disabled="disabled"></td>
					<td>平均处理时间：</td>
					<td><input id="avgExecutedTime" type="text"
						disabled="disabled"></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<div id="statisticsCtn" class="hide" style="padding-top: 10px">
	<table data-role="statisticsTb"
		class="display dataTable table table-bordered no-footer"
		style="width: 100%">
	</table>
</div>
<div id="allFlowCtn">
	<%-- 交易流水滚动屏 Start --%>
	<div class="gutter-bottom gutter-top">
		<div id="flowTb"></div>
	</div>
</div>
<%-- 交易流水滚动屏 End --%>

<%-- 配置Start --%>
<div data-role="pageConfigTemp" class="modal fade hide" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">&times;</button>
		<h4>
			<strong>显示配置</strong>
		</h4>
	</div>
	<div class="modal-body">
		<ul class="nav nav-tabs gutter-bottom">
			<li class="active"><a href="#displayConfig"
				aria-controls="displayConfig" data-toggle="tab">字段显示</a></li>
			<li><a href="#despConfig" aria-controls="despConfig"
				data-toggle="tab"> 字段中文名 </a></li>
			<li><a href="#colorConfig" aria-controls="colorConfig"
				data-toggle="tab">返回码颜色</a></li>
			<li><a href="#filterConfig" aria-controls="filterConfig"
				data-toggle="tab">内容过滤</a></li>
			<li><a href="#otherConfig" aria-controls="otherConfig"
				data-toggle="tab">其他</a></li>
			<li><a href="#queryConfig" aria-controls="queryConfig"
				data-toggle="tab">查询</a></li>
		</ul>
		<%--主显示 内容 Start--%>
		<div class="tab-content">
			<%--字段显隐-面板 Start--%>
			<div class="tab-pane  active" id="displayConfig">
				<table class="table table-condensed">
					<thead>
						<tr class="tr-hover-bg">
							<th
								style="padding-left: 50px !important; width: 200px !important">字段中文名</th>
							<th>显示开关</th>
						</tr>
					</thead>
					<tbody id="displayList"></tbody>
				</table>
			</div>
			<%--字段显隐-面板 End--%>
			<%--字段中文名配置 Start--%>
			<div class="tab-pane" id="despConfig">
				<table class="table table-condensed">
					<thead>
						<tr class="tr-hover-bg">
							<th
								style="padding-left: 50px !important; width: 200px !important">字段名</th>
							<th>中文名</th>
						</tr>
					</thead>
					<tbody id="despList"></tbody>
				</table>
			</div>
			<%--字段中文名配置 End--%>
			<%--返回码颜色配置 Start--%>
			<div class="tab-pane" id="colorConfig">
				<div style="font-style: italic; font-size: .1em">
					<span><span style="color: red">* 提示：</span>颜色为颜色值，如#eee，或者red</span>
				</div>
				<table class="table table-condensed">
					<thead>
						<tr class="tr-hover-bg">
							<th
								style="padding-left: 50px !important; width: 200px !important">返回码</th>
							<th>颜色<small style="padding-left: 150px"><i
									class="fa  fa-plus-circle color Running"></i></small></th>
						</tr>
					</thead>
					<tbody id="colorList">
					</tbody>
				</table>
			</div>
			<%--返回码颜色配置 End--%>
			<%--字段内容过滤配置 Start--%>
			<div class="tab-pane" id="filterConfig">
				<div style="font-style: italic; font-size: .1em">
					<span><span style="color: red">* 提示：</span>字段名非字段中文名，字段过滤多个内容时以“@”分隔。如：过滤值1@过滤值2</span>
				</div>
				<table class="table table-condensed">
					<thead>
						<tr class="tr-hover-bg">
							<th
								style="padding-left: 50px !important; width: 200px !important">字段名</th>
							<th>过滤内容<small style="padding-left: 150px"><i
									class="fa  fa-plus-circle filter Running"></i></small></th>
						</tr>
					</thead>
					<tbody id="filterList"></tbody>
				</table>
			</div>
			<%--字段内容过滤配置 End--%>

			<%--其他配置 Start--%>
			<div class="tab-pane" id="otherConfig">

				<table class="table table-condensed">
					<tbody id="otherList">
						<tr>
							<td>滚屏方向:</td>
							<td><select style="width: 8em" id="scrollDirection"><option
										value="downToUp">自下而上</option>
									<option value="upToDown">自上而下</option></select></td>
						</tr>
						<tr>
							<td>页面显示条数:</td>
							<td><input type="text" id="pageSize" style="width: 8em" /></td>
						</tr>
						<tr>
							<td>缓存最大容量:</td>
							<td><input type="text" id="maxCapacity" style="width: 8em" /></td>
						</tr>

						<tr>
							<td>达到该缓存容量加快滚屏速度:</td>
							<td><input type="text" id="midCapacity" style="width: 8em" /></td>
						</tr>
					</tbody>
				</table>
			</div>
			<%--其他配置 End--%>

			<%--多维度查询配置 Start--%>
			<div class="tab-pane" id="queryConfig">
				<div style="font-style: italic; font-size: .1em">
					<span><span style="color: red">* 提示：</span>按条件显示指定值，若在过滤内容中已填写则会被过滤掉不会显示</span>
				</div>
				<table class="table table-condensed">
					<tbody id="queryList">
						<tr>
							<td>应用代码:</td>
							<td><input type="text" id="queryMc" /></td>
						</tr>
						<tr>
							<td>交易代码:</td>
							<td><input type="text" id="queryTc" /></td>
						</tr>
						<tr>
							<td>所属渠道:</td>
							<td><input type="text" id="queryChannelCode" /></td>
						</tr>
						<tr>
							<td>交易处理状态:</td>
							<td><input type="text" id="queryTradeStatus" /></td>
						</tr>
					</tbody>
				</table>
			</div>
			<%--多维度查询配置 End--%>
		</div>
	</div>
	<div class="modal-footer">
		<button id="setPageConfigBtn" class="btn btn-inverse hvr-radial-out ">确定</button>
		<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
	</div>
</div>
<%-- 配置End --%>

<%-- 配置Start --%>
<div data-role="expandConfigTemp" class="modal fade hide" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">&times;</button>
		<h4>
			<strong>扩展字段配置</strong>
		</h4>
	</div>
	<div class="modal-body">
		<table class="table table-condensed">
			<thead>
				<tr class="tr-hover-bg">
					<th style="padding-left: 50px !important; width: 200px !important">扩展字段名</th>
					<th>扩展字段中文名<small style="padding-left: 100px"><i
							class="fa  fa-plus-circle expand Running"></i></small></th>
				</tr>
			</thead>
			<tbody id="expandList">
			</tbody>
		</table>
	</div>
	<div class="modal-footer">
		<button id="setExpandConfigBtn"
			class="btn btn-inverse hvr-radial-out ">确定</button>
		<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
	</div>
</div>
<%-- 配置End --%>

