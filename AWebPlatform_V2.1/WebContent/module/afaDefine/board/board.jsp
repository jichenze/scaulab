<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<%--页面前缀 bor--%>
<style>
.bor-menu {
	position: relative;
	top: 15px;
	left: 15px;
	margin: 8px 0;
	z-index: 1000;
	width: 60px;
	height: 60px;
	text-align: center;
	border-radius: 30px;
	background-color: rgba(0, 0, 0, 0.2);
	display: block;
}

.bor-menu>span {
	color: #fff;
	line-height: 60px;
	font-size: 25px;
}

.bor-box {
	position: absolute;
	margin: 0;
	padding: 0;
	text-align: center;
}

.bor-inner-box {
	position: absolute;
	width: 100%;
	height: 90%;
}

.bor-tip {
	position: absolute;
	top: 0;
	width: 100%;
	height: 30px;
	line-height: 30px;
	background-color: rgba(0, 0, 0, 0.3);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#4C000000,
		endColorstr=#4C000000);
	text-align: right;
	letter-spacing: 5px;
	color: #fff;
}

.bor-tip-icon {cursor：pointer;
	
}

.bor-edit-head {
	display: inline-block;
	width: 100px;
	font-size: 16px;
	text-indent: 10px;
}

.bor-config-ser {
	margin-right: 10px;
	color: #aaa;
	font-size: 10px;
	float: right;
}
</style>


<div id="borCtn" class="bor-ctn">

	<%--添加菜单Start--%>
	<div id="borMenu">
		<a class="bor-menu" data-toggle="modal"> <span id="borPlus"
			class="fa fa-plus"></span>
		</a> <a class="bor-menu"> <span id="borCheck" class="fa fa-check"></span>
		</a>

	</div>
	<%--添加菜单Start--%>
</div>


<%--编辑组件modal框Strat --%>
<div id="borEditModal" class="modal fade hide">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">&times;</button>
		<h4>请编辑组件信息</h4>
	</div>
	<div id="borEditModalBody" class="modal-body row">
		<label> <span class="bor-edit-head">系统</span> <select
			id="borEditSysSel">
				<option>系统一</option>
				<option>系统二</option>
				<option>系统三</option>
				<option>系统四</option>
		</select>
		</label> <label> <span class="bor-edit-head">服务器</span> <select
			id="borEditSerSel">
				<option>服务器一</option>
				<option>服务器二</option>
				<option>服务器三</option>
				<option>服务器四</option>
		</select>
		</label> <label> <span class="bor-edit-head">指针归类</span> <select
			id="borEditPoiSel">
				<option>操作系统</option>
				<option>中间件</option>
				<option>应用</option>
		</select>
		</label> <label> <span class="bor-edit-head">指标</span> <select
			id="borEditClaSel">
				<option>cpu</option>
				<option>swap</option>
				<option>jvm</option>
		</select>
		</label> <label> <span class="bor-edit-head">图表类型</span> <select
			id="borEditTypSel">
				<option>line</option>
				<option>pie</option>
				<option>table</option>
		</select>
		</label> <label> <span class="bor-edit-head">子类型</span> <select
			id="borEditStaSel">
				<option>0</option>
				<option>1</option>
				<option>2</option>
				<option>01</option>
				<option>02</option>
				<option>12</option>
				<option>11</option>
		</select>
		</label>
	</div>
	<div class="modal-footer">
		<i id="modalOk" class="btn btn-info" data-dismiss="modal">完成</i>
	</div>
</div>
<%--编辑组件modal框End --%>




<%--组件容器模板Start --%>
<div data-role="borEchTemp" class="hide">
	<div id="_id_" data-role="borBox" class="bor-box well">
		<h4 data-role="borConfigSys" class="bor-config-sys">系统</h4>
		<span data-role="borConfigSer" class="bor-config-ser">服务器</span>

		<div data-role="borInnerBox" class="bor-inner-box"></div>

		<div data-role="borTip" class="bor-tip">
			<span data-role="borTipMenu" data-toggle="modal"
				class="bor-tip-icon fa fa-bars"></span> <span data-role="borTipDel"
				class="bor-tip-icon fa fa-trash"></span>
		</div>
	</div>
</div>
<%--组件容器模板Start --%>