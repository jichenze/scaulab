
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<%--操作部分 Start --%>
<div class="gutter-bottom">
	<button id="dangerCreBtn" type="button"
		class="btn btn-inverse hvr-radial-out">
		<i class="fa fa-plus"></i>&nbsp;创建
	</button>
</div>
<%--     操作部分 End --%>
<%--     存储表格 Start --%>
<div>
	<table id="dangerTb" class="display dataTable table"
		style="width: 100%;">
		<colgroup>
			<col width="10%" />
			<col width="20%" />
			<col width="17%" />
			<col width="10%" />
			<col width="15%" />
			<col width="15%" />
			<col width="14%" />
		</colgroup>
		<thead>
			<tr>
				<th>名称</th>
				<th>类型</th>
				<th>存储地点</th>
				<th>入库时间</th>
				<th>入库量</th>
			</tr>
		</thead>
	</table>
</div>
<%--存储表格 End --%>
<%--创建界面 Temp Start --%>
<div id="dangerTemp" class="hide">
	<div class="control-group">
		<label class="control-label" for="ghrname">名称：</label>
		<div class="controls">
			<input id="ghrname" name="ghrname" type="text" class="span8">
			<span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghtime">存储地点：</label>
		<div class="controls">
			<input id="ghtime" name="ghtime" type="text" class="span8"> <span
				class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghpn">存储时间：</label>
		<div class="controls">
			<input id="ghpn" name="ghpn" type="text" class="span8"> <span
				class="help-inline hide"></span>
		</div>
	</div>

	<div class="control-group">
		<label class="control-label" for="ghsrname">入库量：</label>
		<div class="controls">
			<input id="ghsrname" name="ghsrname" type="text" class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghname">负责人1：</label>
		<div class="controls">
			<input id="ghname" name="ghname" type="text" class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghname">负责人2：</label>
		<div class="controls">
			<input id="ghname" name="ghname" type="text" class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghsl">剩余量：</label>
		<div class="controls">
			<input id="ghsl" name="ghsl" type="text" class="span8">
		</div>
	</div>

	<div class="form-actions">
		<button id="dangerBtn" type="button" class="btn btn-inverse">创建</button>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
</div>
<%--     创建存储界面Temp End --%>




