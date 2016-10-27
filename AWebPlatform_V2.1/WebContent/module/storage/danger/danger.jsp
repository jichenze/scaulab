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
        background-color:#02634
    }
    .dev-css-docs-color10 {
        background-color:#025642
    }
    .dev-css-docs-color11 {
        background-color:#024a38
    }
    h4{
    	display:inline!important;
    }
    a{
    	color:black!important;
    }
</style>
<div class=hero-unit>
	<h2>供货信息</h2>
</div>
<button id="creatdanger" type="button" data-role="dangerview" class="btn btn-success pull-right">创建</button>

<button type="button" class="btn btn-danger" data-toggle="collapse" data-target="#demo-danger">详细列表</button>
 
<div id="demo-danger" class="collapse in">
	<div class="accordion" id="accordion2">
		  <div class="accordion-group">
		    <div class="accordion-heading">
		      <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne-danger">
		        XX1存储信息
		      </a>
		    </div>
		    <div id="collapseOne-danger" class="accordion-body collapse in">
		      <div class="accordion-inner">
		      	<div class=row>
		      	 	 <div class="span6">
		       		 	<h4>名称：</h4>
		       		 </div>
		       		 <div class="span4">
		       		 	<span>111</span>
		       		 </div>
		        </div>
		        <div class=row>
		      	 	 <div class="span6">
		       		 	<h4>所属单位：</h4>
		       		 </div>
		       		 <div class="span4">
		       		 	<span>111</span>
		       		 </div>
		        </div>
		        <div class=row>
		      	 	 <div class="span6">
		       		 	<h4>总量：</h4>
		       		 </div>
		       		 <div class="span4">
		       		 	<span>111</span>
		       		 </div>
		        </div>
		        <div class=row>
		      	 	 <div class="span6">
		       		 	<h4>存储地点：</h4>
		       		 </div>
		       		 <div class="span4">
		       		 	<span>111</span>
		       		 </div>
		        </div>
		       	<div class=row>
		      	 	 <div class="span6">
		       		 	<h4>入库日期：</h4>
		       		 </div>
		       		 <div class="span4">
		       		 	<span>111</span>
		       		 </div>
		        </div>
		        <div class=row>
		      	 	 <div class="span6">
		       		 	<h4>入库量：</h4>
		       		 </div>
		       		 <div class="span4">
		       		 	<span>111</span>
		       		 </div>
		        </div>
		        <div class=row>
		      	 	 <div class="span6">
		       		 	<h4>物品类型：</h4>
		       		 </div>
		       		 <div class="span4">
		       		 	<span>111</span>
		       		 </div>
		        </div>
		        <div class=row>
		      	 	 <div class="span6">
		       		 	<h4>存储方式：</h4>
		       		 </div>
		       		 <div class="span4">
		       		 	<span>111</span>
		       		 </div>
		        </div>
		        <div class=row>
		      	 	 <div class="span6">
		       		 	<h4>负责人：</h4>
		       		 </div>
		       		 <div class="span4">
		       		 	<span>111</span>
		       		 </div>
		        </div>
		        <div class=row>
		      	 	 <div class="span6">
		       		 	<h4>负责人：</h4>
		       		 </div>
		       		 <div class="span4">
		       		 	<span>111</span>
		       		 </div>
		        </div>
		        <div class=row>
		      	 	 <div class="span6">
		       		 	<h4>备注：</h4>
		       		 </div>
		       		 <div class="span4">
		       		 	<span>111</span>
		       		 </div>
		        </div>
		        <div class=row>
		      	 	 <div class="span6">
		       		 	<h4>剩余量：</h4>
		       		 </div>
		       		 <div class="span4">
		       		 	<span>111</span>
		       		 </div>
		        </div>
		      </div>
		    </div>
		  </div>
	</div>
 </div>                     
  <!--创建新的存储信息-->
<div id="dangerview" class="modal fade hide modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
		  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		  <h3>创建存储信息</h3>
		</div>
		<div class="modal-body">
			<form class="form-horizontal">
			  <div class="control-group">
			    <label class="control-label">名称:</label>
			    <div class="controls">
			      <input type="text" id="experimentationName">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">所属单位:</label>
			    <div class="controls">
			      <input type="text" id="experimentationCom">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">总量:</label>
			    <div class="controls">
			      <input type="text" id="experimentationAll">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">存储地点:</label>
			    <div class="controls">
			      <input type="text" id="experimentationAddr">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">入库时间:</label>
			    <div class="controls">
			       <input id="datetimePickerExample" name="datetimePickerExample" type="datetime" placeholder="请选择时间" class="form_datetime">
			       <span class="help-inline hide">请选择时间</span>
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">入库量:</label>
			    <div class="controls">
			      <input type="text" id="experimentationH">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">物品类型:</label>
			    <div class="controls">
			      <input type="text" id="experimentationType">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">存储方式:</label>
			    <div class="controls">
			      <input type="text" id="experimentationMenth">
			    </div>
			  </div>
			   <div class="control-group">
			    <label class="control-label">负责人:</label>
			    <div class="controls">
			      <input type="text" id="experimentationMan">
			    </div>
			  </div>
			   <div class="control-group">
			    <label class="control-label">备注:</label>
			    <div class="controls">
			      <input type="text" id="experimentationBeizhu">
			    </div>
			  </div>
			   <div class="control-group">
			    <label class="control-label">剩余量:</label>
			    <div class="controls">
			      <input type="text" id="experimentationYu">
			    </div>
			  </div>
			</form>
		</div>
		<div class="modal-footer">
		    <a href="#" class="btn" data-dismiss="modal" aria-hidden="true">关闭</a>
		    <a href="#" class="btn btn-info">创建</a>
		</div>
 		
</div>