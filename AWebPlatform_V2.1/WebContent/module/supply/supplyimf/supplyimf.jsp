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
<button id="creatsupply" type="button" data-role="supplyview" class="btn btn-success pull-right">创建新的供货信息</button>

<button type="button" class="btn btn-danger">供货信息列表</button>
 
<div class="collapse in">
		  <div class="accordion-group">
		    <div class="accordion-heading">
		      <a class="accordion-toggle supplytitle">
		        	双氧水供货信息
		      </a>
		    </div>
		  </div>
 </div>            
 <!--创建新的供货信息-->
<div id="supplyview" class="modal fade hide modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
		  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		  <h3>创建供货信息</h3>
		</div>
		<div class="modal-body">
			<form class="form-horizontal">
			  <div class="control-group">
			    <label class="control-label">供货商:</label>
			    <div class="controls">
			      <input type="text" id="Supplier">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">供货商编号:</label>
			    <div class="controls">
			      <input type="text" id="SupplierId">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">供货时间:</label>
			    <div class="controls">
			      <input type="text" id="SupplierTime">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">联系方式:</label>
			    <div class="controls">
			      <input type="text" id="SupplierPhone">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">接收人:</label>
			    <div class="controls">
			      <input type="text" id="SupplierPerson">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">采购数量:</label>
			    <div class="controls">
			      <input type="text" id="SupplierNum">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">产品名称:</label>
			    <div class="controls">
			      <input type="text" id="SupplierName">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">是否验收:</label>
			    <div class="controls">
			        <select id="SupplierCheck">
					  <option>是</option>
					  <option>否</option>
					</select>
			    </div>
			  </div>
			</form>
		</div>
		<div class="modal-footer">
		    <a href="#" class="btn closenewsupply">关闭</a>
		    <a href="#" class="btn btn-info creatnewsupply">创建</a>
		</div>
 		
</div>

<!--供货信息详情框-->
<div id="supplydetail" class="modal fade hide modal-lg" aria-hidden="true">
	<div class="modal-header">
	  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	  <h3>供货信息</h3>
	</div>
	<div class="modal-body">
		<table class="table table-striped table-bordered">
		  <thead>
		    <tr>
		      <th>供货商</th>
		      <th>供货商编号/th>
		      <th>供货时间</th>
		      <th>联系电话</th>
		      <th>接收人</th>
		      <th>产品名称</th>
		      <th>数量</th>
		      <th>是否已验收</th>
		    </tr>
		  </thead>
		  <tbody class="replybody">
		    <tr>
		      <td>广州XX</td>
		      <td>215489635 </td>
			  <td>2016-11-28</td>
		      <td>13724064007 </td>
		      <td>杨老师</td>
		      <td>高锰酸钾 </td>
		      <td>100g</td>
		      <td>是</td>
		    </tr>
		  </tbody>
		</table>
	</div>
  	<div class="modal-footer">
	    <a href="#" class="btn">关闭</a>
	</div>
 		
</div>