<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style type="text/css">
.ztree {
	overflow: auto;
}
</style>
<%--用户操作部分 Start--%>
<div class="gutter-bottom">
	<button id="roleCreBtn" type="button"
		class="btn btn-inverse hvr-radial-out">
		<i class="fa fa-plus"></i>&nbsp;创建
	</button>
	<button id="roleAccessBtn" type="button"
		class="btn btn-inverse hvr-radial-out disabled">
		<i class="fa fa-gear"></i>&nbsp;配置操作权限
	</button>
	<div class="btn-group">
		<button class="btn btn-inverse dropdown-toggle hvr-radial-out"
			data-toggle="dropdown">
			更多操作<span class="caret"></span>
		</button>
		<ul class="dropdown-menu">
			<li><a id="roleDelBtn" class="hvr-bounce-to-left disabled"
				href="javascript:"><i class="fa fa-trash"></i>删除</a></li>
			<li><a id="roleUpdBtn" class="hvr-bounce-to-left disabled"
				href="javascript:"><i class="fa fa-edit"></i>编辑</a></li>
		</ul>
	</div>
</div>
<%--用户操作部分 End--%>
<%--用户表格 Start--%>
<div>
	<table id="roleTb" class="display dataTable table" style="width: 100%;">
		<colgroup>
			<col width="5%" />
			<col width="10%" />
			<col width="10%" />
			<col width="10%" />
			<col width="15%" />
			<col width="15%" />
			<col width="10%" />
			<col width="10%" />
		</colgroup>
		<thead>
			<tr>
				<th><input id="roleSelAllBtn" type="checkbox" /></th>
				<th>角色ID</th>
				<th>角色名</th>
				<th>创建人</th>
				<th>创建时间</th>
				<th>更新时间</th>
				<th>状态</th>
				<th>备注</th>
			</tr>
		</thead>
	</table>
	<div class="tips-table">
		<span>* 提示：可通过</span> <span class="tips-table-key">“双击”</span> <span>来修改角色对应的权限。</span>
		</br> <span>* 提示：删除、编辑、配置权限按钮需要</span> <span class="tips-table-key">“选中对应用户”</span>
		<span>才能使用。</span>
	</div>
</div>
<%--用户表格 End--%>



<%--创建角色 Temp Start--%>
<div id="roleCreTemp" class="hide">
	<div class="control-group">
		<label class="control-label" for="rolename">角色名：</label>

		<div class="controls">
			<input id="rolename" name="rolename" type="text" placeholder="用户名"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>

	<div class="control-group">
		<label class="control-label" for="state">是否生效：</label>
		<div class="controls">
			<input id="state" name="state" data-inner-switcher="true"
				type="checkbox" />
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="remark">备注：</label>

		<div class="controls">
			<input id="remark" name="remark" type="text" placeholder="备注"
				class="span8">
		</div>
	</div>
	<div class="form-actions">
		<button id="roleCreSmtBtn" type="button" class="btn btn-inverse">创建</button>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<button type="reset" class="btn">重置</button>
	</div>
</div>
<%--创建角色 Temp End--%>



<%--修改角色 Temp Start--%>
<div id="roleEditTemp" class="hide">
	<input id="editroleid" name="roleID" type="text" class="hide">
	<div class="control-group">
		<label class="control-label" for="editrolename">角色名：</label>

		<div class="controls">
			<input id="editrolename" name="rolename" type="text"
				placeholder="用户名" class="span8" disabled> <span
				class="help-inline hide"></span>
		</div>
	</div>

	<div class="control-group">
		<label class="control-label" for="editstate">是否生效：</label>

		<div class="controls">
			<input id="editstate" name="state" type="checkbox" />
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="editremark">备注：</label>

		<div class="controls">
			<input id="editremark" name="remark" type="text" placeholder="备注"
				class="span8">
		</div>
	</div>
	<div class="form-actions">
		<button id="roleEditSmtBtn" type="button" class="btn btn-inverse">修改</button>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
</div>
<%--修改角色 Temp End--%>




<%--关联操作权限 Temp Start--%>
<div id="roleAccessTemp" class="hide">
	<div id="allAccessTree" class="ztree"></div>
	<div class="form-actions">
		<button id="roleAccessSmtBtn" type="button" class="btn btn-inverse">执行关联</button>
	</div>
</div>
<%--关联操作权限 Temp Start--%>


</p>