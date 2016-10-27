<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<%--页面前缀 def--%>
<style>

.def-ctt{
	height:200px;
	cursor:pointer;
	text-align:center;
}
.def-item-box{
	margin:0;
	padding:0;
	height:160px;
	
}
.def-item-add-btn{
	line-height:160px;
	font-size:60px;
	color:#aaa;
}
.def-tip{
	
	height:30px;
	line-height:30px;
	
	background-color:rgba(0,0,0,0.3);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#4C000000,endColorstr=#4C000000);
	
	text-align:right;
	letter-spacing:5px;
	color:#fff;
}
.def-item{
	line-height:30px;
	
	color:#999;
	
	font-size:18px;
} 
.def-item-name{
	margin-top:5px;
}
.def-item-edit-btn{
	line-height:35px;
	color:#aaa;
	font-size:23px;
	
}
.def-item-input{
	width:100%;
}
.def-item-config{
	text-indent:10px;
}

</style>

<div id="defCtn" class="def-ctn row">
	<div id="defCtt" class="def-ctt span10">
		<div id="defAddBox" class="def-item-box well">
			<a href="#defModal" data-toggle="modal" class="def-item-add-btn fa fa-plus" ></a>
		</div>
		<span data-role="defItem" class="def-item">新建项目</span>
	</div>
</div>

<%-- 自定义页面缩略图模板 Start --%>
<div id="defTemp" class="hide">
	<div id="_id_" data-role="defCtt" class="def-ctt span10">
		<div data-role="defItemBox" class="def-item-box well">
			<div data-role="defTip" class="def-tip " >
				<span data-role="defTipShare" data-toggle="modal" class="def-tip-icon fa fa-share-alt"></span>
				<span data-role="defTipDel" class="def-tip-icon fa fa-trash"></span>			
			</div>
		</div>
		<div data-role="defItem1" class="def-item row">
			<div data-role="defItemName" class="def-item-name span6 offset2">
				_name_
			</div>
			<span data-role="defItemNameEdit" class="def-item-edit-btn fa fa-edit span2"></span>
		</div>	
		
		<div data-role="defItem2" class="def-item row hide">
			<div class="def-item-name span6"><input type="text" data-role="defItemInput" class="def-item-input"></div>
			<div data-role="defItem2Edit" class="span4">
				<span data-role="defItemNameEditX" class="def-item-edit-btn fa fa-times-circle"></span>&nbsp;
				<span data-role="defItemNameEditOK" class="def-item-edit-btn fa fa-check"></span> 
			</div>
		</div>
		
	</div>
</div>
<%-- 自定义页面缩略图模板 End --%>

<%-- 编辑项目信息模态框Start --%>
	<div id="defModal" class="modal fade hide">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			<h4>项目信息</h4>
		</div>
		<div id="defModalBody" class="modal-body row">
				
		</div>
		<div class="modal-footer">
			<i class="btn" data-dismiss="modal">取消</i>
			<i id="itemNameSubmit" class="btn btn-info">完成</i>
		</div>
	</div> 
<%--编辑项目信息模态框End --%>
    
   
<%--编辑 新建和菜单模态框内容模板Start --%>
<div data-role="defItemMenuTemp" class="hide">
	<label class="def-item-config">
		项目名称&nbsp;:&nbsp;&nbsp;&nbsp;
		<input data-role="defItemNameInput" type="text" class="span12" autofocus>
	</label>
</div>
<%--编辑 菜单模态框内容模板Start --%>
	
	
<%--编辑 分享模态框内容模板Start --%>
<div id="defItemShareTemp" class="hide">
	
</div>
<%--编辑 分享模态框内容模板Start --%>

<!-- <div id="defItemInputTemp" class="hide">
	<div data-role="defItemNameTemp">
		<input type="text" data-role="defItemInput" class="def-item-input">
		<span data-role="defItemNameEditX" class="def-item-name-editing fa fa-times-circle"></span>
		<span data-role="defItemNameEditOK" class="def-item-name-editing fa fa-check"></span>
	</div>
</div> -->