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
	<h2>预约审核</h2>
</div>

<button type="button" class="btn btn-danger" data-toggle="collapse" data-target="#yuyue">预约列表</button>
 
<div id="yuyue" class="collapse in">
	<table class="table table-striped table-bordered">
	  <thead>
	    <tr>
	      <th>申请人</th>
	      <th>物品名称</th>
	    </tr>
	  </thead>
	  <tbody class="replybody">
	    <tr>
	      <td>郭逸坤</td>
	      <td>高锰酸钾 </td>
		  <td><button type="button" data-role="formControlShow1" class="btn btn-success btn-small pull-right yuyue_detail">查看详情</button>
	      </td>
	    </tr>
	  </tbody>
	</table>
 </div>            
 <!--预约详情框-->
<div id="yuyuedtail" class="modal fade hide modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
	  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	  <h3>详细信息</h3>
	</div>
	<div class="modal-body">
		<table class="table table-striped table-bordered">
		  <thead>
		    <tr>
		      <th>申请人</th>
		      <th>学号/工号</th>
		      <th>联系方式</th>
		      <th>使用地点</th>
		      <th>物品名称</th>
		      <th>申请数量</th>
		      <th>原因</th>
		    </tr>
		  </thead>
		  <tbody class="replybody">
		    <tr>
		      <td>郭逸坤</td>
		      <td>201430340407 </td>
			  <td>13724064007</td>
		      <td>宿舍</td>
		      <td>高锰酸钾 </td>
		      <td>100g</td>
		      <td>1213456498</td>
		    </tr>
		  </tbody>
		</table>
    	<div>
    		<label class="radio inline">
			  <input type="radio" name="pass" id="yuyuepass" value="option1" checked>
			    通过
			</label>
			<label class="radio inline">
			  <input type="radio" name="pass" id="yuyuenopass" value="option2">
			    不通过
			</label>
    	</div>
    	 <!--不通过-->
    	<div class="yuyueshownopass">
    		<h2>原因</h2>
    		<textarea rows="3"></textarea>
    	</div>
  	</div>
  	<div class="modal-footer">
	    <a href="#" class="btn">关闭</a>
	    <a href="#" class="btn btn-info">回复</a>
	</div>
 		
</div>

	