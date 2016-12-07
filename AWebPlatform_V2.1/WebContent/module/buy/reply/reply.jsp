<%-- <%@ page contentType="text/html;charset=UTF-8" language="java" %> --%>
<%-- <%@ page session="false"%> --%>
<!-- <style type="text/css"> -->

<!-- </style> -->

<!-- <table class="table table-striped table-hover"> -->
<!--   <thead> -->
<!--     <tr> -->
<!--       <th>申请单</th> -->
<!--       <th>申请人</th> -->
<!--       <th>申购化学品名称</th> -->
<!--     </tr> -->
<!--   </thead> -->
<!--   <tbody class="replybody"> -->
<!--     <tr> -->
<!--       <td class="applyid">1</td> -->
<!--       <td>郭逸坤</td> -->
<!--       <td>高锰酸钾 </td> -->
<!-- 	  <td><button type="button" class="btn btn-success btn-small pull-right reply">审核</button> -->
<!--       </td> -->
<!--     </tr> -->
<!--      <tr> -->
<!--       <td class="applyid">2</td> -->
<!--       <td>郭逸坤</td> -->
<!--       <td>高锰酸钾 </td> -->
<!-- 	  <td><button type="button" class="btn btn-success btn-small pull-right reply">审核</button> -->
<!--       </td> -->
<!--     </tr> -->
<!--   </tbody> -->
<!-- </table> -->
            
<!--  <!--审核框--> -->
<!-- <div id="replyshow" class="modal fade hide modal-lg" tabindex="-1" role="dialog" aria-hidden="true"> -->
<!-- 	<div class="modal-header"> -->
<!-- 	  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
<!-- 	  <h3>回复申购信息</h3> -->
<!-- 	</div> -->
<!-- 	<div class="modal-body"> -->
<!-- 		<table class="table table-striped table-bordered"> -->
<!-- 		  <thead> -->
<!-- 		    <tr> -->
<!-- 		      <th>申请人</th> -->
<!-- 		      <th>学号/工号</th> -->
<!-- 		      <th>联系方式</th> -->
<!-- 		      <th>申购物品名称</th> -->
<!-- 		      <th>申请数量</th> -->
<!-- 		      <th>申购原因</th> -->
<!-- 		    </tr> -->
<!-- 		  </thead> -->
<!-- 		  <tbody class="replybody"> -->
<!-- 		    <tr> -->
<!-- 		      <td>郭逸坤</td> -->
<!-- 		      <td>201430340407 </td> -->
<!-- 			  <td>13724064007</td> -->
<!-- 		      <td>高锰酸钾 </td> -->
<!-- 		      <td>100g</td> -->
<!-- 		      <td>xxxx</td> -->
<!-- 		    </tr> -->
<!-- 		  </tbody> -->
<!-- 		</table> -->
<!--     	<div> -->
<!--     		<label class="radio inline"> -->
<!-- 			  <input type="radio" name="pass" id="pass" value="option1" checked> -->
<!-- 			    通过 -->
<!-- 			</label> -->
<!-- 			<label class="radio inline"> -->
<!-- 			  <input type="radio" name="pass" id="nopass" value="option2"> -->
<!-- 			    不通过 -->
<!-- 			</label> -->
<!--     	</div> -->
<!--     	 不通过 -->
<!--     	<div class="shownopass"> -->
<!--     		<h2>原因</h2> -->
<!--     		<textarea rows="3"></textarea> -->
<!--     	</div> -->
<!--     	 通过 -->
<!--     	<div class="showpass"> -->
<!-- 	    	<div> -->
<!-- 	    		<h2>采购方式</h2> -->
<!-- 	    		<label class="radio inline"> -->
<!-- 				  <input type="radio" name="optionsRadios" id="big" value="1" checked> -->
<!-- 				    大批量 -->
<!-- 				</label> -->
<!-- 				<label class="radio inline"> -->
<!-- 				  <input type="radio" name="optionsRadios" id="small" value="2"> -->
<!-- 				  小批量 -->
<!-- 				</label> -->
<!-- 	    	</div> -->
<!-- 	    	<div class="showpass_small"> -->
<!-- 	    		<label class="control-label" for="buyn">采购员：</label> -->
<!-- 	    		<select class="buyname" id="buyn" name="buyn"> -->
<!-- 				  <option>1</option> -->
<!-- 				  <option>2</option> -->
<!-- 				  <option>3</option> -->
<!-- 				  <option>4</option> -->
<!-- 				  <option>5</option> -->
<!-- 				</select> -->
	    		
<!-- 			    <label class="control-label" for="datetimePickerExample">采购时间：</label> -->
<!-- 			    <div class="controls"> -->
<!-- 			        <input id="datetimePickerExample" name="datetimePickerExample" type="datetime" placeholder="请选择时间" class="span8 form_datetime"> -->
<!-- 			        <span class="help-inline hide">请选择时间</span> -->
<!-- 			    </div> -->
<!-- 	    	</div> -->
<!-- 	    	<div class="showpass_big"> -->
<!-- 	    		<label class="control-label" for="datetimePickerExample2">预计采购时间：</label> -->
<!-- 			    <div class="controls"> -->
<!-- 			        <input id="datetimePickerExample2" name="datetimePickerExample2" type="datetime" placeholder="请选择时间" class="span8 form_datetime"> -->
<!-- 			        <span class="help-inline hide">请选择时间</span> -->
<!-- 			    </div> -->
<!-- 	    	</div> -->
<!--     	</div> -->
<!--   	</div> -->
<!--   	<div class="modal-footer"> -->
<!-- 	    <a href="#" class="btn">关闭</a> -->
<!-- 	    <a href="#" class="btn btn-info">回复</a> -->
<!-- 	</div> -->
 		
<!-- </div> -->


<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@ page session="false"%>

    <%--用户操作部分 Start--%>
    <div class="gutter-bottom">
        <button id="userCreBtn" type="button" class="btn btn-inverse hvr-radial-out">
            <i class="fa fa-plus"></i>&nbsp;创建
        </button>
        <div class="btn-group">
            <button class="btn btn-inverse dropdown-toggle hvr-radial-out" data-toggle="dropdown">更多操作<span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li><a id="userDelBtn" class="hvr-bounce-to-left disabled" href="javascript:"><i class="fa fa-trash"></i>删除</a></li>
                <li><a id="userUpdBtn" class="hvr-bounce-to-left disabled" href="javascript:"><i class="fa fa-edit"></i>编辑</a></li>
                <li><a id="userRoleBtn" class="hvr-bounce-to-left disabled" href="javascript:"><i class="fa fa-user"></i>配置角色</a></li>
                <li><a id="unlockuserBtn" class="hvr-bounce-to-left disabled" href="javascript:"><i class="fa fa-unlock-alt"></i>解除锁定</a></li>
            </ul>
        </div>
    </div>
    <%--用户操作部分 End--%>
    
    <%--用户表格 Start--%>
    <div>
        <table id="replyTb" class="display dataTable table" style="width:100%;">
            <colgroup>
                <col width="3%"/>
                <col width="8%"/>
                <col width="8%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="51%"/>
            </colgroup>
            <thead>
            <tr>
               <th><input id="userSelAllBtn" type="checkbox"/></th>
              <th>申请人</th>
		      <th>学号/工号</th>
		      <th>联系方式</th>
		      <th>申购物品名称</th>
		      <th>申请数量</th>
		      <th>申购原因</th>
            </tr>
            </thead>
        </table>
    </div>
<%--用户表格 End--%>



    <%--创建用户 Temp Start--%>
    <div id="userCreTemp" class="hide">
        <div class="control-group">
            <label class="control-label" for="username">用户名：</label>

            <div class="controls">
                <input id="username" name="username" type="text" placeholder="用户名" class="span8">
                <span id="usernameTips" class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="nickname">昵称：</label>

            <div class="controls">
                <input id="nickname" name="nickname" type="text" placeholder="昵称" class="span8">
                <span id="nikenameTips" class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="mailbox">邮箱：</label>

            <div class="controls">
                <input id="mailbox" name="mailbox" type="text" placeholder="邮箱" class="span8">
                <span class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="telephone">手机：</label>

            <div class="controls">
                <input id="telephone" name="telephone" type="text" placeholder="手机" class="span8">
                <span class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="state">是否生效：</label>

            <div class="controls">
                <input id="state" name="state" data-inner-switcher="true" type="checkbox" checked/>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="remark">备注：</label>

            <div class="controls">
                <input id="remark" name="remark" type="text" placeholder="备注" class="span8">
            </div>
        </div>
        <div class="form-actions">
            <button id="userCreSmtBtn" type="button" class="btn btn-inverse">创建</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="reset" class="btn">重置</button>
        </div>
        <div>
        	*提示：默认密码为“111111”
        </div>
    </div>
    <%--创建用户 Temp End--%>


    <%--修改用户 Temp Start--%>
    <div id="userEditTemp" class="hide">
        <div class="control-group">
            <label class="control-label" for="editusername">用户名：</label>

            <div class="controls">
                <input id="editusername" name="username" type="text" placeholder="用户名" class="span8" disabled>
                <span  class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="editnickname">昵称：</label>

            <div class="controls">
                <input id="editnickname" name="nickname" type="text" placeholder="昵称" class="span8">
                <span id="editnicknameTips" class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="editpassword">重置密码：</label>

            <div class="controls">
                <input id="editpassword" data-inner-switcher="true" name="initPassword" type="checkbox"/>
                <span style="color: #b94a48;">初始密码为：111111</span>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="editmailbox">邮箱：</label>

            <div class="controls">
                <input id="editmailbox" name="mailbox" type="text" placeholder="邮箱" class="span8">
                <span class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="edittelephone">手机：</label>

            <div class="controls">
                <input id="edittelephone" name="telephone" type="text" placeholder="手机" class="span8">
                <span class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="editstate">是否生效：</label>

            <div class="controls">
                <input id="editstate" name="state"  type="checkbox"/>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="editremark">备注：</label>

            <div class="controls">
                <input id="editremark" name="remark" type="text" placeholder="备注" class="span8">
            </div>
        </div>
        <div class="form-actions">
            <button id="userEditSmtBtn" type="button" class="btn btn-inverse">修改</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    </div>
    <%--修改用户 Temp End--%>


    <%--关联角色 Temp Start--%>
    <div id="userRoleTemp" class="modal fade hide modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h3>关联角色</h3>
      </div>
      <div class="modal-body">
        <table id="userRoleTb" class="display dataTable table" style="width:100%;">
            <colgroup>
                <col width="5%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="15%"/>
                <col width="15%"/>
                <col width="10%"/>
            </colgroup>
            <thead>
            <tr>
                <th><input id="userRoleSltAllBtn" type="checkbox"/></th>
                <th>角色名</th>
                <th>创建人</th>
                <th>创建时间</th>
                <th>更新时间</th>
                <th>备注</th>
            </tr>
            </thead>
        </table>
      </div>
      <div class="modal-footer">
        <a id="douserRoleBtn" href="javascript:" class="btn btn-inverse">关联</a>
      </div>
    </div>
    <%--关联角色 Temp End--%>
</p>

	