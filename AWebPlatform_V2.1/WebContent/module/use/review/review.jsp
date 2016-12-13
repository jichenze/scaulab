<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@ page session="false"%>
 <%--操作部分 Start--%>
    <div class="gutter-bottom">
        <div class="btn-group">
            <button class="btn btn-inverse dropdown-toggle hvr-radial-out" data-toggle="dropdown">更多操作<span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li><a id="reviewUpdBtn" class="hvr-bounce-to-left disabled" href="javascript:"><i class="fa fa-edit"></i>审核</a></li>               
            </ul>
        </div>
    </div>
    <%--操作部分 End--%>
    <%--使用申请单表格 Start--%>
    <div>
        <table id="reviewTb" class="display dataTable table" style="width:100%;">
            <colgroup>
                <col width="3%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
            </colgroup>
            <thead>
            <tr>
               <th><input id="reviewSelAllBtn" type="checkbox"/></th>
               <th>时间</th>
              <th>申请人</th>
              <th>学号</th>
              <th>联系方式</th>
		      <th>物品</th>
		      <th>类型</th>
		      <th>申请数量</th>
		      <th>单位</th>
		      <th>原因</th>
		      <th>审核</th>
            </tr>
            </thead>
        </table>
    </div>
<%--使用申请单表格 End--%>
 <%--审核界面 Temp Start--%>
    <div id="reviewTemp" class="hide">
        <div class="control-group">
            <label class="control-label" for="syname">申请人：</label>
            <div class="controls">
                <input id="syname" name="syname"  type="text" placeholder="申请人" class="span8" disabled>
                <span  class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="sypid">学号/工号：</label>
            <div class="controls">
                <input id="sypid" name="sypid" type="text" placeholder="学号/工号" class="span8"disabled>
                <span class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="synumber">联系方式：</label>
            <div class="controls">
                <input id="synumber" name="synumber" type="text" placeholder="联系方式" class="span8"disabled>
                <span class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="sywpname">物品名称：</label>
            <div class="controls">
                <input id="sywpname" name="sywpname" type="text" placeholder="申购物品名称" class="span8"disabled>
                <span class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="sylx">类型：</label>
            <div class="controls">
                <input id="sylx" name="sylx" type="text" placeholder="申购物品名称" class="span8"disabled>
                <span class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="sywpsl">申请数量：</label>
            <div class="controls">
                <input id="sywpsl" name="sywpsl" type="text" placeholder="申请数量" class="span8" disabled>
            </div>
        </div>
         <div class="control-group">
            <label class="control-label" for="syjldw">计量单位：</label>
            <div class="controls">
                <input id="syjldw" name="syjldw" type="text" placeholder="申请数量" class="span8" disabled>
            </div>
        </div>
          <div class="control-group">
            <label class="control-label" for="syyy">申请原因：</label>
            <div class="controls">
                <input id="syyy" name="syyy" type="text" placeholder="申购原因" class="span8" disabled>
            </div>
        </div>
        <div>
        	<label class="radio inline ">
			  <input type="radio" name="syyn"  id="cgyn1" value="yes" checked>
				 通过
			</label>
			<label class="radio inline">
			  <input type="radio" name="syyn"  id="cgyn2" value="no">
			  	不通过
			</label>
        </div>
        <div class="shownopass">
        	<textarea rows="3" id="syshyy"></textarea>
        </div>
        <div class="form-actions">
            <button id="reviewBtn" type="button" class="btn btn-inverse">保存</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    </div>
    <%--审核界面Temp End--%>


    

	

	