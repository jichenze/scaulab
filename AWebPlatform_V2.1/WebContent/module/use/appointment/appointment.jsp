<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
</style>

<div class=hero-unit>
	<h2>预约申请</h2>
</div>
<div class="row">
	<div class="span8 offset8">
		<button type="button" data-role="formControlShow1_use" class="btn btn-success btn-large btn-block">填写预约单</button>
	</div>
</div>
<div data-role="formControlTemp1_use" class="hide">
	<div class="control-group">
	     <label class="control-label" for="formControlInput">联系人：</label>
	     <div class="controls">
	         <input id="formControlInput" name="formControlInput" type="text" placeholder="请输入姓名" class="span8">
	         <span class="help-inline hide">请在这里数据数据</span>
	     </div>
	 </div>
	 <div class="control-group">
	     <label class="control-label" for="formControlInput">学号：</label>
	     <div class="controls">
	         <input id="formControlInput" name="formControlInput" type="text" placeholder="请输入学号" class="span8">
	         <span class="help-inline hide">请在这里数据数据</span>
	     </div>
	 </div>
	 <div class="control-group">
	     <label class="control-label" for="formControlInput">联系方式：</label>
	     <div class="controls">
	         <input id="formControlInput" name="formControlInput" type="text" placeholder="请输入联系方式" class="span8">
	         <span class="help-inline hide">请在这里数据数据</span>
	     </div>
	 </div>
	 <div class="control-group">
	     <label class="control-label" for="formControlInput">物品名称：</label>
	     <div class="controls">
	         <input id="formControlInput" name="formControlInput" type="text" placeholder="请输入物品名称" class="span8">
	         <span class="help-inline hide">请在这里数据数据</span>
	     </div>
	 </div>
	 <div class="control-group">
	     <label class="control-label" for="formControlInput">申请数量：</label>
	     <div class="controls">
	         <input id="formControlInput" name="formControlInput" type="text" placeholder="请输入数量" class="span8">
	         <span class="help-inline hide">请在这里数据数据</span>
	     </div>
	 </div>
	 <div class="control-group">
	     <label class="control-label" for="formControlInput">使用地点：</label>
	     <div class="controls">
	         <input id="formControlInput" name="formControlInput" type="text" placeholder="请输入地点" class="span8">
	         <span class="help-inline hide">请在这里数据数据</span>
	     </div>
	 </div>
	 <div class="form-actions">
	     <button id="formControlSmtBtn" type="button" class="btn btn-inverse hvr-radial-out">提交</button>
	     <button type="reset" class="btn hvr-radial-out">重置</button>
	 </div>
 </div>    