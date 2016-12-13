

<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@ page session="false"%>
 <%--操作部分 Start--%>
    <div class="gutter-bottom">
        <div class="btn-group">
            <button class="btn btn-inverse dropdown-toggle hvr-radial-out" data-toggle="dropdown">更多操作<span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li><a id="replyUpdBtn" class="hvr-bounce-to-left disabled" href="javascript:"><i class="fa fa-edit"></i>审核</a></li>               
            </ul>
        </div>
    </div>
    <%--操作部分 End--%>
    <%--申请单表格 Start--%>
    <div>
        <table id="replyTb" class="display dataTable table" style="width:100%;">
            <colgroup>
                <col width="3%"/>
                <col width="2%"/>
                <col width="8%"/>
                <col width="8%"/>
                <col width="10%"/>
                <col width="20%"/>
                <col width="10%"/>
                <col width="31%"/>
                 <col width="8%"/>
            </colgroup>
            <thead>
            <tr>
               <th><input id="replySelAllBtn" type="checkbox"/></th>
               <th>时间</th>
              <th>申请人</th>
		      <th>学号/工号</th>
		      <th>联系方式</th>
		      <th>申购物品名称</th>
		      <th>申请数量</th>
		      <th>申购原因</th>
		      <th>审核</th>
            </tr>
            </thead>
        </table>
    </div>
<%--申请单表格 End--%>
 <%--审核界面 Temp Start--%>
    <div id="replyTemp" class="hide">
    	<div class="control-group">
            <label class="control-label" for="cgid">申请时间：</label>
            <div class="controls">
                <input id="cgid" name="cgid"  type="text" placeholder="时间" class="span8" disabled>
                <span  class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="cgname">申请人：</label>
            <div class="controls">
                <input id="cgname" name="cgname"  type="text" placeholder="申请人" class="span8" disabled>
                <span  class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="cgpid">学号/工号：</label>
            <div class="controls">
                <input id="cgpid" name="cgpid" type="text" placeholder="学号/工号" class="span8"disabled>
                <span class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="cgnumber">联系方式：</label>
            <div class="controls">
                <input id="cgnumber" name="cgnumber" type="text" placeholder="联系方式" class="span8"disabled>
                <span class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="cgwpname">申购物品名称：</label>
            <div class="controls">
                <input id="cgwpname" name="cgwpname" type="text" placeholder="申购物品名称" class="span8"disabled>
                <span class="help-inline hide"></span>
            </div>
        </div>
        
        <div class="control-group">
            <label class="control-label" for="cgwpsl">申请数量：</label>
            <div class="controls">
                <input id="cgwpsl" name="cgwpsl" type="text" placeholder="申请数量" class="span8" disabled>
            </div>
        </div>
          <div class="control-group">
            <label class="control-label" for="cgyy">申购原因：</label>
            <div class="controls">
                <input id="cgyy" name="cgyy" type="text" placeholder="申购原因" class="span8" disabled>
            </div>
        </div>
        <div>
        	<label class="radio inline ">
			  <input type="radio" name="cgyn"  id="cgyn1" value="yes" checked>
				 通过
			</label>
			<label class="radio inline">
			  <input type="radio" name="cgyn"  id="cgyn2" value="no">
			  	不通过
			</label>
        </div>
        <div class="shownopass">
        	<textarea rows="3" id="cgshyy"></textarea>
        </div>
        <div class="showpass">
			 <div class="control-group">
			    <label class="control-label" for="cgdate">采购时间：</label>
			    <div class="controls">
			        <input id="cgdate" name="cgdate" type="datetime" readonly="" placeholder="请选择时间" class="span8 form_datetime">
			        <span class="help-inline hide">请选择时间</span>
			    </div>
			</div>
        	<div class="control-group">
	            <label class="control-label" for="cgpl">采购批量：</label>
	            <div class="controls">
	                <input id="cgpl" name="cgpl"  type="text" placeholder="采购批量" class="span8" >
	                <span  class="help-inline hide"></span>
	            </div>
	        </div>
        </div>
        <div class="form-actions">
            <button id="replyBtn" type="button" class="btn btn-inverse">保存</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    </div>
    <%--审核界面Temp End--%>


    

	