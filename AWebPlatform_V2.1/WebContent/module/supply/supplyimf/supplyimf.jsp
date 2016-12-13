<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>

<%--操作部分 Start--%>
    <div class="gutter-bottom">
        <button id="supplyCreBtn" type="button" class="btn btn-inverse hvr-radial-out">
            <i class="fa fa-plus"></i>&nbsp;创建
        </button>
    </div>
    <%--操作部分 End--%>
    <%--供货表格 Start--%>
    <div>
        <table id="supplyTb" class="display dataTable table" style="width:100%;">
            <colgroup>
                <col width="3%"/>
                <col width="10%"/>
                <col width="20%"/>
                <col width="17%"/>
                <col width="10%"/>
                <col width="15%"/>
                <col width="14%"/>
                <col width="11%"/>
            </colgroup>
            <thead>
            <tr>
               <th><input id="replySelAllBtn" type="checkbox"/></th>
               <th>供货商</th>
		      <th>供货商编号</th>
		      <th>供货时间</th>
		      <th>联系电话</th>
		      <th>接收人</th>
		      <th>产品名称</th>
		      <th>数量</th>
            </tr>
            </thead>
        </table>
    </div>
<%--供货表格 End--%>
 <%--创建界面 Temp Start--%>
    <div id="supplyTemp" class="hide">
        <div class="control-group">
            <label class="control-label" for="ghrname">供货商：</label>
            <div class="controls">
                <input id="ghrname" name="ghrname"  type="text" placeholder="供货商" class="span8" >
                <span  class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="ghid">供货商编号：</label>
            <div class="controls">
                <input id="ghid" name="ghid" type="text" placeholder="供货商编号" class="span8">
                <span class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="ghtime">供货时间：</label>
            <div class="controls">
                <input id="ghtime" name="ghtime" type="text" placeholder="供货时间" class="span8">
                <span class="help-inline hide"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="ghpn">联系方式：</label>
            <div class="controls">
                <input id="ghpn" name="ghpn" type="text" placeholder="联系方式" class="span8">
                <span class="help-inline hide"></span>
            </div>
        </div>
        
        <div class="control-group">
            <label class="control-label" for="ghsrname">接收人：</label>
            <div class="controls">
                <input id="ghsrname" name="ghsrname" type="text" placeholder="接收人" class="span8">
            </div>
        </div>
          <div class="control-group">
            <label class="control-label" for="ghname">产品名称：</label>
            <div class="controls">
                <input id="ghname" name="ghname" type="text" placeholder="产品名称" class="span8" >
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="ghsl">数量：</label>
            <div class="controls">
                <input id="ghsl" name="ghsl" type="text" placeholder="数量" class="span8" >
            </div>
        </div>

        <div class="form-actions">
            <button id="supplyBtn" type="button" class="btn btn-inverse">创建</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    </div>
    <%--创建供货界面Temp End--%>


    

