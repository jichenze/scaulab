<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
  .workspace-module{
    position:relative;
    width:30%;
    height: 150px;
    float:left;
    margin-left:3%;
    margin-bottom: 20px;
    background-color:rgba(22,22,22,.1);
  }
  .workspace-module-img{
     position: absolute;
     left: 33%;
     top: 20px;
     width: 107px;
     height: 107px;
  }
</style>
<div data-role="workspaceCtn">
  <div class="workspace-module"></div>
  <div class="workspace-module" id="addCtn"><img src="img/plus_white.png" class="workspace-module-img"></div>
</div>
