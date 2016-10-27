define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {
			
            /*公用变量定义*/
            			var $echartsList=[],             //存放echarts的Jquery对象,用于refresh
            				echRand,                	 //每次加载页面出来的echarts数量,小于10
            			    $ctn,	                     //echarts的组件容器
            			    echChart,				     //每一个echart的实例对象
            				$echChart,					 //每一个echart的jquery对象
            				refreshClock,				 //刷新数据的循环
            				result; 
            			$.ajax({
            				'type': 'post',
            				'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
            				'url': 'TestChartsAction_loadFine.do',
            				'dataType': 'json',
            				'data': " ",
            				'success': function (resp) {
            					if(resp.status==true){
            					    result= eval(resp);
        				            for(var i=0;i<resp.content.fineData.length;i++){
        				            	 
//              						alert(resp.content.fineData[i].systemName+" "+resp.content.fineData[i].a+" "+resp.content.fineData[i].b+" "+resp.content.fineData[i].c+" "+resp.content.fineData[i].d);
        				            	$ctn=$('#echCtn',$el);             //获取加载模板的容器
        	                        	$echChart=$($("#echTemp",$el).html());    //获取模板$对象
        	                        	$ctn.append($echChart);                   
        	                        	echChart=$("#echFig",$echChart)[0];
        	                        	//设置表头
        	                        	$('[data-role="echHead"]',$echChart).text(resp.content.fineData[i].systemName);
        	                        	$('[data-role="echFigNum"]',$echChart).text(resp.content.fineData[i].fine+"%");
        	                        	$('[data-role="echApp"]',$echChart).text(resp.content.fineData[i].a);
        	                        	$('[data-role="echMiddle"]',$echChart).text(resp.content.fineData[i].b);
        	                        	$('[data-role="echSystem"]',$echChart).text(resp.content.fineData[i].c);
        	                        	$('[data-role="echSql"]',$echChart).text(resp.content.fineData[i].d);
        	                        	var a=resp.content.fineData[i].systemName;
        	                        	 
           	                            $('[data-role="echLiked"]',$echChart).click(function(){
           	                        	 
           	                        	  $.ajax({
           	                 				'type': 'post',
           	                 				'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
           	                 				'url': 'TestChartsAction_fineCollect.do',
           	                 				'dataType': 'json',
           	                 				'data': {"systemName":"cpu1"},
           	                 				'success': function (resp) {
           	                 					
           	                 				} 
        	                        	 });
           	                        	 
           	                            }); 
        	                        	$echartsList.push($echChart);
        	                        	//根据健康度设置健康度样式
        	                        	if(resp.content.fineData[i].fine<=30){
        	                        		$('[data-role="echFigNum"]',$echChart).css("color","#FF4530");
            	                        	$('[data-role="echImg"]',$echChart).attr("src","img/p1.png");	
            	                        	}else if(resp.content.fineData[i].fine > 30 && resp.content.fineData[i].fine < 60){
            	                        		$('[data-role="echFigNum"]',$echChart).css("color","#FFED32");
                	                        	$('[data-role="echImg"]',$echChart).attr("src","img/p2.png");	
            	                        	}else{
            	                        		$('[data-role="echFigNum"]',$echChart).css("color","#32FF34");
                	                        	$('[data-role="echImg"]',$echChart).attr("src","img/p3.png");	
            	                        		
            	                        	}
        	                       
            				    	
            				    } 
            						
            					}
            				}
            			});
            			
            			 
            			//定义加载echartTemp模板函数
                        function addEchTemp(){
                        	$ctn=$('#echCtn',$el);             //获取加载模板的容器
                        	
                        	$echChart=$($("#echTemp",$el).html());    //获取模板$对象
                        
                        	$ctn.append($echChart);                   
                        	
                        	echChart=$("#echFig",$echChart)[0];
                        	
                        	
                        	//设置表头
                        	$('[data-role="echHead"]',$echChart).text(echInfo.head());
                        	//设置是否收藏
                        /*	$('[data-role="echLiked"]',$echChart).css({
                           	   'color':function(){
                           		   
                          		   return echInfo.liked()?("#a11"):("#333")
                          	   }
                             });*/
                        	  
                        	$echartsList.push($echChart);
                        }
                       
                        
            /*页面加载*/
 
                     /*   refresh();
                        refreshClock=handler.setInterval(refresh,300000,true);*/
                        
                        
                     
            	        
            /* 绑定监听*/
                           //定义收藏点击切换事件,
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});