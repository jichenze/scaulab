define([ "jquery" ], function() {
        return {

        load : function($el, scope, handler) {
        	console.log("页面加载时，进入了load方法");
			this.delegateEvents({
               'click #creatsupply':function(){
            	  $('#supplyview').modal('show');
               }
			})
			$(".closenewsupply",$el).click(function(){
				 $('#supplyview').modal('hide');
			})
			$(".creatnewsupply",$el).click(function(){
				if($("#SupplierName").val()==""||$("#Supplier").val()==""||$("#SupplierId").val()==""||$("#SupplierTime").val()==""||$("#SupplierPhone").val()==""||$("#SupplierPerson").val()==""||$("#SupplierPerson").val()==""||$("#SupplierNum").val()==""||$("#SupplierName").val()==""){
					alert("请填写完整");
				}else{
							alert("创建成功");
							$('#supplyview').modal('hide');
//							$(".accordion",$el).append("<div class='accordion-group'>"+
//					    "<div class='accordion-heading'>"+
//					      "<a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion2' href='#collapseOne-supply'>"+
//					        $("#SupplierName").val()+"供货信息"+
//					      "</a>"+
//					    "</div>"+
//					    "<div id='collapseOne-supply' class='accordion-body collapse in'>"+
//					      "<div class='accordion-inner'>"+
//					      	"<div class='row'>"+
//					      	 	 "<div class='span6'>"+
//					       		 	"<h4>供货商：</h4>"+
//					       		 "</div>"+
//					       		 "<div class='span4'>"+
//					       		 	"<span>"+$("#Supplier").val()+"</span>"+
//					       		 "</div>"+
//					        "</div>"+
//					        "<div class=row>"+
//					      	 	 "<div class='span6'>"+
//					       		 	"<h4>供货商编号：</h4>"+
//					       		 "</div>"+
//					       		 "<div class='span4'>"+
//					       		 	"<span>"+$("#SupplierId").val()+"</span>"+
//					       		 "</div>"+
//					        "</div>"+
//					        "<div class=row>"+
//					      	 	 "<div class='span6'>"+
//					       		 	"<h4>供货时间：</h4>"+
//					       		 "</div>"+
//					       		 "<div class='span4'>"+
//					       		 	"<span>"+$("#SupplierTime").val()+"</span>"+
//					       		 "</div>"+
//					        "</div>"+
//					        "<div class=row>"+
//					      	 	 "<div class='span6'>"+
//					       		 	"<h4>联系电话：</h4>"+
//					       		 "</div>"+
//					       		 "<div class='span4'>"+
//					       		 	"<span>"+$("#SupplierPhone").val()+"</span>"+
//					       		 "</div>"+
//					        "</div>"+
//					       	"<div class=row>"+
//					      	 	 "<div class='span6'>"+
//					       		 	"<h4>接收人：</h4>"+
//					       		 "</div>"+
//					       		 "<div class='span4'>"+
//					       		 	"<span>"+$("#SupplierPerson").val()+"</span>"+
//					       		 "</div>"+
//					        "</div>"+
//					        "<div class=row>"+
//					      	 	 "<div class='span6'>"+
//					       		 	"<h4>采购数量：</h4>"+
//					       		 "</div>"+
//					       		 "<div class='span4'>"+
//					       		 	"<span>"+$("#SupplierNum").val()+"</span>"+
//					       		 "</div>"+
//					        "</div>"+
//					        "<div class=row>"+
//					      	 	 "<div class='span6'>"+
//					       		 	"<h4>产品名称：</h4>"+
//					       		 "</div>"+
//					       		 "<div class='span4'>"+
//					       		 	"<span>"+$("#SupplierName").val()+"</span>"+
//					       		 "</div>"+
//					        "</div>"+
//					        "<div class=row>"+
//					      	 	 "<div class='span6'>"+
//					       		 	"<h4>是否已验收：</h4>"+
//					       		 "</div>"+
//					       		 "<div class='span4'>"+
//					       		 	"<span>"+$("#SupplierCheck").find("option:selected").text()+"</span>"+
//					       		 "</div>"+
//					        "</div>"+
//					      "</div>"+
//					    "</div>"+
//					  "</div>");
//							
				}
				
			})
			$(".supplytitle").click(function(){
				$("#supplydetail").modal('show');
			})
        },

		unload : function(handler) {
			console.log("页面关闭时，进入了unload方法");
		},
		
		pause : function($el, scope, handler) {
			console.log("页面未关闭，但是打开了另一个页面，进入了pause方法");
		},
		
		resume : function($el, scope, handler) {
			console.log("重新进入页面，进入了resume方法");
		}
	};
});