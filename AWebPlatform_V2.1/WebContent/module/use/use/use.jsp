<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
</style>

<div class=hero-unit>
	<h2>领用</h2>
</div>
<input type="text" id="yuyueId">
<a href="#" class="btn btn-info">查询</a>
<table class="table table-striped table-bordered">
	  <thead>
	    <tr>
	      <th>联系人</th>
	      <th>物品名称</th>
	      <th>数量</th>
	      <th><label class="control-label">发料人</label></th>
	      <th><label class="control-label">是否回收</label></th>
	      <th><label class="control-label">物品所属单位</label></th>
	      <th><label class="control-label">物品所属 存储地点</label></th>
	    </tr>
	  </thead>
	  <tbody>
	    <tr>
	      <td>郭逸坤</td>
	      <td>高锰酸钾 </td>
	      <td>1g </td>
	      <td>
			<div class="controls">
		        <select>
				  <option>小明</option>
				  <option>小红</option>
				</select>
		    </div>
		  </td>
		  <td>
		    <div class="controls">
		        <select>
				  <option>是</option>
				  <option>否</option>
				</select>
		    </div>
		  </td>
		  <td>
		    <div class="controls">
		        <select>
				  <option>数信</option>
				  <option>电子</option>
				</select>
		    </div>
		  </td>
		  <td>
		    <div class="controls">
		        <select>
				  <option>教三</option>
				  <option>教四</option>
				</select>
		    </div>
		  </td>
	    </tr>
	  </tbody>
	  <tfoot>
	  	<tr>
	  		<td></td>
	  		<td></td>
	  		<td></td>
	  		<td></td>
	  		<td></td>
	  		<td></td>
	  		<td><a href="#" class="btn btn-info pull-right">发放</a></td>
	  	</tr>
	  </tfoot>
	</table>
