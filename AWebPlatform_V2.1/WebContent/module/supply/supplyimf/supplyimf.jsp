<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<%--操作部分 Start--%>
<div class="gutter-bottom">
	<button id="supplyCreBtn" type="button"
		class="btn btn-inverse hvr-radial-out">
		<i class="fa fa-plus"></i>&nbsp;创建
	</button>
</div>
<%--操作部分 End--%>
<%--供货表格 Start--%>
<div>
	<table id="supplyTb" class="display dataTable table"
		style="width: 100%;">
		<colgroup>
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
			<col width="5%" />
			<col width="5%" />

		</colgroup>
		<thead>
			<tr>
				<th>供货商</th>
				<th>供货商编号</th>
				<th>供货时间</th>
				<th>联系电话</th>
				<th>接收人</th>
				<th>产品名称</th>
				<th>类型</th>
				<th>数量</th>
				<th>单位</th>
				<th>所属单位</th>
				<th>存储地点</th>
			</tr>
		</thead>
	</table>
</div>
<%--供货表格 End--%>
<%--创建界面 Temp Start--%>
<div id="supplyTemp" class="hide">
	<div class="control-group">
		<label class="control-label" for="ghrname">供货商：</label>
		<div class="controls">
			<input id="ghrname" name="ghrname" type="text" placeholder="供货商"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghid">供货商编号：</label>
		<div class="controls">
			<input id="ghid" name="ghid" type="text" placeholder="供货商编号"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghtime">供货时间：</label>
		<div class="controls">
			<input id="ghtime" name="ghtime" type="text" placeholder="供货时间"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghpn">联系方式：</label>
		<div class="controls">
			<input id="ghpn" name="ghpn" type="text" placeholder="联系方式"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>

	<div class="control-group">
		<label class="control-label" for="ghsrname">接收人：</label>
		<div class="controls">
			<input id="ghsrname" name="ghsrname" type="text" placeholder="接收人"
				class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghwpname">产品名称：</label>
		<div class="controls">
			<input id="ghwpname" name="ghwpname" type="text" placeholder="产品名称"
				class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghlx">类型：</label>
		<div class="controls">
			<input id="ghlx" name="ghlx" type="text" placeholder="类型"
				class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghsl">数量：</label>
		<div class="controls">
			<input id="ghsl" name="ghsl" type="text" placeholder="数量"
				class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghjldw">单位：</label>
		<div class="controls">
			<input id="ghjldw" name="ghjldw" type="text" placeholder="单位"
				class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghccdw">所属单位：</label>
		<div class="controls">
			<input id="ghccdw" name="ghccdw" type="text" placeholder="所属单位"
				class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="ghccdd">存储地点：</label>
		<div class="controls">
			<input id="ghccdd" name="ghccdd" type="text" placeholder="存储地点"
				class="span8">
		</div>
	</div>
	<div class="form-actions">
		<button id="supplyBtn" type="button" class="btn btn-inverse">创建</button>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
</div>
<%--创建供货界面Temp End--%>




