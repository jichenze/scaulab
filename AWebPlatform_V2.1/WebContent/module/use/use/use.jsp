<%@ page contentType="text/html;charset=UTF-8" language="java"
	session="false"%>
<%@ page session="false"%>
<%--操作部分 Start--%>
<div class="gutter-bottom">
	<button id="useCreBtn" type="button"
		class="btn btn-inverse hvr-radial-out">
		<i class="fa fa-plus"></i>&nbsp;创建
	</button>
<!-- 	<div class="btn-group"> -->
<!-- 		<button class="btn btn-inverse dropdown-toggle hvr-radial-out" -->
<!-- 			data-toggle="dropdown"> -->
<!-- 			更多操作<span class="caret"></span> -->
<!-- 		</button> -->
<!-- 		<ul class="dropdown-menu"> -->
<!-- 			<li><a id="useUpdBtn" class="hvr-bounce-to-left disabled" -->
<!-- 				href="javascript:"><i class="fa fa-edit"></i>查看</a></li> -->
<!-- 		</ul> -->
<!-- 	</div> -->
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
			<col width="10%" />
			<col width="10%" />
			<col width="5%" />
			<col width="5%" />
			<col width="5%" />
		</colgroup>
		<thead>
			<tr>
				<th>时间</th>
				<th>物品</th>
				<th>类型</th>
				<th>数量</th>
				<th>单位</th>
				<th>领用人</th>
				<th>学号</th>
				<th>联系方式</th>
				<th>领用人2</th>
				<th>学号2</th>
				<th>联系方式2</th>
				<th>发放人</th>
				<th>是否预约</th>
			</tr>
		</thead>
	</table>
</div>
<%--发放表格 End--%>
<%--发放界面 Temp Start--%>
<!-- <div id="useTemp" class="hide"> -->
<!-- 	<div class="control-group"> -->
<!-- 		<label class="control-label" for="cgname">申请人：</label> -->
<!-- 		<div class="controls"> -->
<!-- 			<input id="cgname" name="cgname" type="text" placeholder="申请人" -->
<!-- 				class="span8" disabled> <span class="help-inline hide"></span> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- 	<div class="control-group"> -->
<!-- 		<label class="control-label" for="cgpid">学号/工号：</label> -->
<!-- 		<div class="controls"> -->
<!-- 			<input id="cgpid" name="cgpid" type="text" placeholder="学号/工号" -->
<!-- 				class="span8" disabled> <span class="help-inline hide"></span> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- 	<div class="control-group"> -->
<!-- 		<label class="control-label" for="cgnumber">联系方式：</label> -->
<!-- 		<div class="controls"> -->
<!-- 			<input id="cgnumber" name="cgnumber" type="text" placeholder="联系方式" -->
<!-- 				class="span8" disabled> <span class="help-inline hide"></span> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- 	<div class="control-group"> -->
<!-- 		<label class="control-label" for="cgwpname">物品名称：</label> -->
<!-- 		<div class="controls"> -->
<!-- 			<input id="cgwpname" name="cgwpname" type="text" placeholder="申购物品名称" -->
<!-- 				class="span8" disabled> <span class="help-inline hide"></span> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- 	<div class="control-group"> -->
<!-- 		<label class="control-label" for="cgwpsl">类型：</label> -->
<!-- 		<div class="controls"> -->
<!-- 			<input id="cgwpsl" name="cgwpsl" type="text" placeholder="申请数量" -->
<!-- 				class="span8" disabled> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- 	<div class="control-group"> -->
<!-- 		<label class="control-label" for="cgwpsl">申请数量：</label> -->
<!-- 		<div class="controls"> -->
<!-- 			<input id="cgwpsl" name="cgwpsl" type="text" placeholder="申请数量" -->
<!-- 				class="span8" disabled> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- 	<div class="control-group"> -->
<!-- 		<label class="control-label" for="cgwpsl">计量单位：</label> -->
<!-- 		<div class="controls"> -->
<!-- 			<input id="cgwpsl" name="cgwpsl" type="text" placeholder="申请数量" -->
<!-- 				class="span8" disabled> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- 	<div class="control-group"> -->
<!-- 		<label class="control-label" for="cgyy">申请原因：</label> -->
<!-- 		<div class="controls"> -->
<!-- 			<input id="cgyy" name="cgyy" type="text" placeholder="申购原因" -->
<!-- 				class="span8" disabled> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- 	<div class="control-group"> -->
<!-- 		<label class="control-label" for="cgyy">实际领用数量：</label> -->
<!-- 		<div class="controls"> -->
<!-- 			<input id="cgyy" name="cgyy" type="text" class="span8"> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- 	<div class="control-group"> -->
<!-- 		<label class="control-label" for="cgyy">实际领用人：</label> -->
<!-- 		<div class="controls"> -->
<!-- 			<input id="cgyy" name="cgyy" type="text" class="span8"> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- 	<div class="control-group"> -->
<!-- 		<label class="control-label" for="cgyy">发放人：</label> -->
<!-- 		<div class="controls"> -->
<!-- 			<input id="cgyy" name="cgyy" type="text" class="span8"> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- 	<div class="form-actions"> -->
<!-- 		<button id="useBtn" type="button" class="btn btn-inverse">保存</button> -->
<!-- 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
<!-- 	</div> -->
<!-- </div> -->
<%--发放界面Temp End--%>


<%--创建界面 Temp Start--%>
<div id="uesTempcrt" class="hide">
<div class="control-group">
		<label class="control-label" for="lywpName">物品名称：</label>
		<div class="controls">
			<input id="lywpName" name="lywpName" type="text" placeholder="物品名称"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="lywplx">类型：</label>
		<div class="controls">
			<input id="lywplx" name="lywplx" type="text" placeholder="类型"
				class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="lysl">数量：</label>
		<div class="controls">
			<input id="lysl" name="lysl" type="text" placeholder="数量"
				class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="lyjldw">计量单位：</label>
		<div class="controls">
			<input id="lyjldw" name="lyjldw" type="text" class="span8">
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="lyrname">领用人：</label>
		<div class="controls">
			<input id="lyrname" name="lyrname" type="text" placeholder="领用人"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="lyrid">学号/工号：</label>
		<div class="controls">
			<input id="lyrid" name="lyrid" type="text" placeholder="学号/工号"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="lyrpn">联系方式：</label>
		<div class="controls">
			<input id="lyrpn" name="lyrpn" type="text" placeholder="联系方式"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
		<div class="control-group">
		<label class="control-label" for="lyrname2">领用人：</label>
		<div class="controls">
			<input id="lyrname2" name="lyrname2" type="text" placeholder="领用人"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="lyrid2">学号/工号：</label>
		<div class="controls">
			<input id="lyrid2" name="lyrid2" type="text" placeholder="学号/工号"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label" for="lyrpn2">联系方式：</label>
		<div class="controls">
			<input id="lyrpn2" name="lyrpn2" type="text" placeholder="联系方式"
				class="span8"> <span class="help-inline hide"></span>
		</div>
	</div>
	
	<div class="control-group">
		<label class="control-label" for="lyfName">发放人：</label>
		<div class="controls">
			<input id="lyfName" name="lyfName" type="text" class="span8">
		</div>
	</div>
		<div class="control-group">
		<label class="control-label" for="lyyyYN">是否预约：</label>
		<div class="controls">
			<input id="lyyyYN" name="lyyyYN" type="text" class="span8">
		</div>
	</div>
	<div class="form-actions">
		<button id="usecrtBtn" type="button" class="btn btn-inverse">创建</button>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	</div>
</div>
<%--创建界面Temp End--%>




