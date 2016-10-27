<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
    .dev-css-docs-table{
        color: #000;
        border: 1px solid #05c697;
    }
    .dev-css-docs-table td{
        border: none;
        //text-align: center;
        vertical-align: middle;
    }
    .dev-css-docs-text1{
        color:rgba(5, 198, 151, 0.51);
    }
    .dev-css-docs-text2{
        color:#05ba8e;
    }
    .dev-css-docs-color1 {
        background-color: rgba(5, 198, 151, 0.51)
    }
    .dev-css-docs-color2 {
        background-color:#05ba8e
    }
    .dev-css-docs-color3 {
        background-color:#04ad84
    }
    .dev-css-docs-text4 {
        color:#04a17b
    }
    .dev-css-docs-color4 {
        background-color:#04a17b
    }
    .dev-css-docs-color9 {
        background-color:#02634b
    }
    .dev-css-docs-color10 {
        background-color:#025642
    }
    .dev-css-docs-color11 {
        background-color:#024a38
    }
    a{
    	color:black!important;
    }
</style>
<div class=hero-unit>
	<h2>采购回复</h2>
</div>

<button type="button" class="btn btn-danger" data-toggle="collapse" data-target="#shenggou">回复列表</button>
 
<div id="shenggou" class="collapse in">
	<table class="table table-striped table-bordered">
	  <thead>
	    <tr>
	      <th>申请人</th>
	      <th>申购化学品名称</th>
	      <th>申购原因</th>
	      <th>申购数量</th>
	    </tr>
	  </thead>
	  <tbody class="replybody">
	    <tr>
	      <td>郭逸坤</td>
	      <td>高锰酸钾 </td>
	      <td>实验 </td>
	      <td>1g </td>
		  <td><button type="button" data-role="formControlShow1" class="btn btn-success btn-small pull-right reply">审核</button>
	      </td>
	    </tr>
	  </tbody>
	</table>
 </div>            
 <!--审核框-->
<div id="userRoleTemp" class="modal fade hide modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
	  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	  <h3>回复申购信息</h3>
	</div>
	<div class="modal-body">
    	<div>
    		<label class="radio inline">
			  <input type="radio" name="pass" id="pass" value="option1" checked>
			    通过
			</label>
			<label class="radio inline">
			  <input type="radio" name="pass" id="nopass" value="option2">
			    不通过
			</label>
    	</div>
    	 <!--不通过-->
    	<div class="shownopass">
    		<h2>原因</h2>
    		<textarea rows="3"></textarea>
    	</div>
    	 <!--通过-->
    	<div class="showpass">
	    	<div>
	    		<h2>采购方式</h2>
	    		<label class="radio inline">
				  <input type="radio" name="optionsRadios" id="big" value="1" checked>
				    大批量
				</label>
				<label class="radio inline">
				  <input type="radio" name="optionsRadios" id="small" value="2">
				  小批量
				</label>
	    	</div>
	    	<div class="showpass_small">
	    		<label class="control-label" for="buyn">采购员：</label>
	    		<select class="buyname" id="buyn" name="buyn">
				  <option>1</option>
				  <option>2</option>
				  <option>3</option>
				  <option>4</option>
				  <option>5</option>
				</select>
	    		
			    <label class="control-label" for="datetimePickerExample">采购时间：</label>
			    <div class="controls">
			        <input id="datetimePickerExample" name="datetimePickerExample" type="datetime" placeholder="请选择时间" class="span8 form_datetime">
			        <span class="help-inline hide">请选择时间</span>
			    </div>
	    	</div>
	    	<div class="showpass_big">
	    		<label class="control-label" for="datetimePickerExample2">预计采购时间：</label>
			    <div class="controls">
			        <input id="datetimePickerExample2" name="datetimePickerExample2" type="datetime" placeholder="请选择时间" class="span8 form_datetime">
			        <span class="help-inline hide">请选择时间</span>
			    </div>
	    	</div>
    	</div>
  	</div>
  	<div class="modal-footer">
	    <a href="#" class="btn">关闭</a>
	    <a href="#" class="btn btn-info">回复</a>
	</div>
 		
</div>

	