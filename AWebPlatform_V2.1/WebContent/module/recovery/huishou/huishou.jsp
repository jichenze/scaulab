<%@ page contentType="text/html;charset=UTF-8" language="java"
	session="false"%>
<%@ page session="false"%>
<%--操作部分 Start--%>
<div class="gutter-bottom">
	<button id="huishouinCreBtn" type="button"
		class="btn btn-inverse hvr-radial-out">
		<i class="fa fa-plus"></i>&nbsp;创建回收入库表
	</button>
	<button id="huishouCreBtn" type="button"
		class="btn btn-inverse hvr-radial-out">
		<i class="fa fa-plus"></i>&nbsp;创建回收不入库表
	</button>
</div>
<%--操作部分 End--%>
<%--回收表格 Start--%>
<div>
	<table id="huishouTb" class="display dataTable table" style="width: 100%;">
		<colgroup>
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
		</colgroup>
		<thead>
			<tr>
				<th>时间</th>
				<th>名称</th>
				<th>数量</th>
				<th>单位</th>
				<th>提供人</th>
				<th>接收人</th>
				<th>接收单位</th>
				<th>入库</th>
			</tr>
		</thead>
	</table>
</div>
<%--回收表格 End--%>

<%--创建回收入库界面 Temp Start--%>
<div id="huishouinTempcrt" class="hide">
	<div class="control-group">
		<label class="control-label" for="hswpname">名称：</label>
		<div class="controls">
			<input id="hswpname" name="hswpname" type="text" 
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="hsliang">数量：</label>
		<div class="controls">
			<input id="hsliang" name="hsliang" type="text" 
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="hsjldanwei">单位：</label>
		<div class="controls">
			<input id="hsjldanwei" name="hsjldanwei" type="text" 
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="hsSongName">提供人：</label>
		<div class="controls">
			<input id="hsSongName" name="hsSongName" type="text" 
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="hsdanwei">接收单位：</label>
		<div class="controls">
			<input id="hsdanwei" name="hsdanwei" type="text" class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="hsShouName">接收人：</label>
		<div class="controls">
			<input id="hsShouName" name="hsShouName" type="text" class="span8">
		</div>
	</div>
	<div class="form-actions">
		<button id="huishouincrtBtn" type="button" class="btn btn-inverse">创建</button>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
</div>
<%--创建收入界面Temp End--%>


<%--创建回收不入库界面 Temp Start--%>
<div id="huishouTempcrt" class="hide">
	<div class="control-group">
		<label class="control-label" for="hswpname">名称：</label>
		<div class="controls">
			<input id="hswpname" name="hswpname" type="text" 
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="hsliang">数量：</label>
		<div class="controls">
			<input id="hsliang" name="hsliang" type="text" 
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="hsjldanwei">单位：</label>
		<div class="controls">
			<input id="hsjldanwei" name="hsjldanwei" type="text" 
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="hsSongName">提供人：</label>
		<div class="controls">
			<input id="hsSongName" name="hsSongName" type="text" 
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="hsdanwei">接收单位：</label>
		<div class="controls">
			<input id="hsdanwei" name="hsdanwei" type="text" class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="hsShouName">接收人：</label>
		<div class="controls">
			<input id="hsShouName" name="hsShouName" type="text" class="span8">
		</div>
	</div>
	<div class="form-actions">
		<button id="huishoucrtBtn" type="button" class="btn btn-inverse">创建</button>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
</div>
<%--创建不收入界面Temp End--%>

