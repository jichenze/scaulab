<%@ page contentType="text/html;charset=UTF-8" language="java"
	session="false"%>
<%@ page session="false"%>
<%--操作部分 Start--%>
<div class="gutter-bottom">
	<button id="useCreBtn" type="button"
		class="btn btn-inverse hvr-radial-out">
		<i class="fa fa-plus"></i>&nbsp;创建
	</button>
	<div class="btn-group">
		<button class="btn btn-inverse dropdown-toggle hvr-radial-out"
			data-toggle="dropdown">
			更多操作<span class="caret"></span>
		</button>
		<ul class="dropdown-menu">
			<li><a id="useUpdBtn" class="hvr-bounce-to-left disabled"
				href="javascript:"><i class="fa fa-edit"></i>查看</a></li>
		</ul>
	</div>
</div>
<%--操作部分 End--%>
<%--发放表格 Start--%>
<div>
	<table id="useTb" class="display dataTable table" style="width: 100%;">
		<colgroup>
			<col width="3%" />
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
				<th><input id="useSelAllBtn" type="checkbox" /></th>
				<th>发放时间</th>
				<th>申请人</th>
				<th>物品名称</th>
				<th>类型</th>
				<th>申请数量</th>
				<th>计量单位</th>
				<th>发放</th>
			</tr>
		</thead>
	</table>
</div>
<%--发放表格 End--%>
<%--发放界面 Temp Start--%>
<div id="useTemp" class="hide">
	<div class="control-group">
		<label class="control-label" for="cgname">申请人：</label>
		<div class="controls">
			<input id="cgname" name="cgname" type="text" placeholder="申请人"
				class="span8" disabled> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgpid">学号/工号：</label>
		<div class="controls">
			<input id="cgpid" name="cgpid" type="text" placeholder="学号/工号"
				class="span8" disabled> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgnumber">联系方式：</label>
		<div class="controls">
			<input id="cgnumber" name="cgnumber" type="text" placeholder="联系方式"
				class="span8" disabled> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgwpname">物品名称：</label>
		<div class="controls">
			<input id="cgwpname" name="cgwpname" type="text" placeholder="申购物品名称"
				class="span8" disabled> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgwpsl">类型：</label>
		<div class="controls">
			<input id="cgwpsl" name="cgwpsl" type="text" placeholder="申请数量"
				class="span8" disabled>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgwpsl">申请数量：</label>
		<div class="controls">
			<input id="cgwpsl" name="cgwpsl" type="text" placeholder="申请数量"
				class="span8" disabled>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgwpsl">计量单位：</label>
		<div class="controls">
			<input id="cgwpsl" name="cgwpsl" type="text" placeholder="申请数量"
				class="span8" disabled>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgyy">申请原因：</label>
		<div class="controls">
			<input id="cgyy" name="cgyy" type="text" placeholder="申购原因"
				class="span8" disabled>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgyy">实际领用数量：</label>
		<div class="controls">
			<input id="cgyy" name="cgyy" type="text" class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgyy">实际领用人：</label>
		<div class="controls">
			<input id="cgyy" name="cgyy" type="text" class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgyy">发放人：</label>
		<div class="controls">
			<input id="cgyy" name="cgyy" type="text" class="span8">
		</div>
	</div>
	<div class="form-actions">
		<button id="useBtn" type="button" class="btn btn-inverse">保存</button>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
</div>
<%--发放界面Temp End--%>


<%--创建界面 Temp Start--%>
<div id="uesTempcrt" class="hide">
	<div class="control-group">
		<label class="control-label" for="cgname">领用人：</label>
		<div class="controls">
			<input id="cgname" name="cgname" type="text" placeholder="申请人"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgpid">学号/工号：</label>
		<div class="controls">
			<input id="cgpid" name="cgpid" type="text" placeholder="学号/工号"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgnumber">联系方式：</label>
		<div class="controls">
			<input id="cgnumber" name="cgnumber" type="text" placeholder="联系方式"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgwpname">物品名称：</label>
		<div class="controls">
			<input id="cgwpname" name="cgwpname" type="text" placeholder="领用物品名称"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgwpsl">类型：</label>
		<div class="controls">
			<input id="cgwpsl" name="cgwpsl" type="text" class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgwpsl">数量：</label>
		<div class="controls">
			<input id="cgwpsl" name="cgwpsl" type="text" placeholder="数量"
				class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgwpsl">计量单位：</label>
		<div class="controls">
			<input id="cgwpsl" name="cgwpsl" type="text" class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="cgyy">发放人：</label>
		<div class="controls">
			<input id="cgyy" name="cgyy" type="text" class="span8">
		</div>
	</div>
	<div class="form-actions">
		<button id="usecrtBtn" type="button" class="btn btn-inverse">保存</button>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
</div>
<%--创建界面Temp End--%>




