<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<%--页面前缀 mainsys--%>
<style type="text/css">
 .mainsys-invoices-ctn{
    height:80px;
    width:100%;
 }
 .mainsys-invoices-cct{
    background-color:rgba(2,22,22,.2);
    height: 75px;
    width: 23.5%;
    float:left;
    margin-left:1.5%;
    box-shadow: 1px #222222;
    border-radius:5px;
 }
 .mainsys-invoices-cct-piece{
 
 }
  .mainsys-statistic-cct{
    background-color:rgba(2,22,22,.2);
    height: auto;
    width: 23.5%;
    float:left;
    margin-left:1.5%;
    margin-top:.5%;
    box-shadow: 1px #222222;
    border-radius:5px;
 }
 
 .mainsys-invoices-cct-div{
    float:left;
    width:35%;
    height:100%;
    font-size:1.2em;
    border-right:1px dotted white;
 }
 .mainsys-invoices-cct-div>div{
    margin:30px 10px 10px 20px;
 }
 .mainsys-invoices-cct-div2{
   float:left;
   width:55%;
   height:100%;
   padding:20px 10px;
   font-size:.5em;
 }
 .mainsys-statistic-piece{
    height: 800px;
 }
 .mainsys-statistic-small{
    height: 140px;
    border-bottom:1px dotted white;
 }
 .mainsys-statistic-small div{
    float:left;
    width:50%;
 }

</style>
<!-- 工单 start-->
<div data-role="" class="mainsys-invoices-ctn ">
   <div data-role="" class="mainsys-invoices-cct">
       <div class="mainsys-invoices-cct-div" ><div>操作系统</div></div>
       <div class="mainsys-invoices-cct-div2">
          <div style="display:inline; ">已处理<span style="color:green;font-size:1em">110单</span></div>
          <div style="display:inline;">未处理<span style="color:green;font-size:1em">10单</span></div>
          <div><div class="progress progress-success " style="width:90%;">
              <div class="bar" style="width: 90%"></div>
          </div></div>
       </div>
   </div>
   <div data-role="" class="mainsys-invoices-cct">
       <div class="mainsys-invoices-cct-div" ><div>中间件</div></div>
       <div class="mainsys-invoices-cct-div2">
          <div style="display:inline; ">已处理<span style="color:green;font-size:1em">110单</span></div>
          <div style="display:inline;">未处理<span style="color:green;font-size:1em">10单</span></div>
          <div><div class="progress progress-success " style="width:90%;">
              <div class="bar" style="width: 90%"></div>
          </div></div>
       </div>
   </div>
   <div data-role="" class="mainsys-invoices-cct">
       <div class="mainsys-invoices-cct-div" ><div>数据库</div></div>
       <div class="mainsys-invoices-cct-div2">
          <div style="display:inline; ">已处理<span style="color:green;font-size:1em">110单</span></div>
          <div style="display:inline;">未处理<span style="color:green;font-size:1em">10单</span></div>
          <div><div class="progress progress-success " style="width:90%;">
              <div class="bar" style="width: 90%"></div>
          </div></div>
       </div>
   </div>
   <div data-role="" class="mainsys-invoices-cct">
       <div class="mainsys-invoices-cct-div" ><div>硬件</div></div>
       <div class="mainsys-invoices-cct-div2">
          <div style="display:inline; ">已处理<span style="color:green;font-size:1em">110单</span></div>
          <div style="display:inline;">未处理<span style="color:green;font-size:1em">10单</span></div>
          <div><div class="progress progress-success " style="width:90%;">
              <div class="bar" style="width: 90%"></div>
          </div></div>
       </div>
       </div>
   </div>
</div>
<!-- 工单 end-->

<!--start-->
<div data-role="" class="mainsys-invoices-ctn ">
   <div data-role="" class="mainsys-statistic-cct">
       <div class="mainsys-statistic-piece">
          <div class="mainsys-statistic-small">
             <div>window</div>
             <div><span>系统总数</span></div>
          </div>
          <div class="mainsys-statistic-small">
             <div>window</div>
             <div><span>系统总数</span></div>
          </div>
          <div class="mainsys-statistic-small">
             <div>window</div>
             <div><span>系统总数</span></div>
          </div>
          <div class="mainsys-statistic-small">
             <div>window</div>
             <div><span>系统总数</span></div>
          </div>
          <div class="mainsys-statistic-small">
             <div>window</div>
             <div><span>系统总数</span></div>
          </div>
       </div>
   </div>
   <div data-role="" class="mainsys-statistic-cct">
       <div>中间件</div>
   </div>
   <div data-role="" class="mainsys-statistic-cct">
       <div class="mainsys-statistic-piece" style="height:400px;">数据库</div>
   </div>
   <div data-role="" class="mainsys-statistic-cct">
       <div class="mainsys-statistic-piece">硬件</div>
   </div>
</div>
<!--  end-->