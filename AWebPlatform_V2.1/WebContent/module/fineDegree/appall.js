define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {
			
            /*公用变量定义*/
            			var $echartsList=[],             //存放echarts的Jquery对象,用于refresh
            				echRand,                	 //每次加载页面出来的echarts数量,小于10
            			    $ctn,	                     //echarts的组件容器
            			    echChart,				     //每一个echart的实例对象
            				$echChart,					 //每一个echart的jquery对象
            				refreshClock;				 //刷新数据的循环
            	//初始化页面 --ajax
            			$.ajax({
            				'type': 'post',
            				'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
            				'url': 'FineDegreeAction_loadFine.do',
            				'dataType': 'json',
            				'data': " ",
            				'success': function (resp) {
            					var resp=eval(resp);
            					for(var i=0;i<resp.content.fineData.length;i++){
            						addEchTemp(resp.content.fineData[i].liked,resp.content.fineData[i].systemName,resp.content.fineData[i].fine,resp.content.fineData[i].a,resp.content.fineData[i].b,resp.content.fineData[i].c,resp.content.fineData[i].d);
            					    fresh(resp.content.fineData[i].systemName,resp.content.fineData[i].fine,resp.content.fineData[i].a,resp.content.fineData[i].b,resp.content.fineData[i].c,resp.content.fineData[i].d,resp.content.fineData[i].liked,i);
            						
            					}
            					
            				}
            			
            			});
            /*公用函数的定义*/
                        //表尾四个属性值对应的颜色,可自行配置修改
                        function echAttrColor(){
                    		switch($(this).text()){
                    		case "0":return "#32FF34"          //绿
                    		case "1":return "#FFED32"		   //黄
                    		case "2":return "#FF4530"		   //红
                    		}
                    	}
                        //表中不同健康度对应的颜色,可自行配置修改
                        function echFigColor(size){
                        	var num=parseInt($(this).text(),10);
                        	if(num<=30){
                        		$(this).css("color","#FF4530");
                        		size=1;
                        	}else if(num>30&&num<=60){
                        		$(this).css("color","#FFED32");
                        		size=2;
                        	}else if(num>60){
                        		$(this).css("color","#32FF34");
                        		size=3;
                        	}
                        }
                        
                        //初始化或更新页面
                        function fresh(systemName,fine,a,b,c,d,liked,i){
                        	 
                        var	$health=$('[data-role="echFigNum"]',$echartsList[i]),
                			$healthImg=$('[data-role="echImg"]',$echartsList[i]),
                            	healthNum=fine; 
                    		$health.text(healthNum+"%");
                        	if(healthNum<=40){
                        		$health.css("color","#FF4530");
                        		$healthImg.attr("src","img/p1.png");
                        	}else if(healthNum>40&&healthNum<=70){
                        		$health.css("color","#FFED32");
                        		$healthImg.attr("src","img/p2.png");
                        	}else if(healthNum>70&&healthNum<=95){
                        		$health.css("color","#32FF34");
                        		$healthImg.attr("src","img/p3.png");
                        	}else if(healthNum>95){
                        		$health.css("color","#32FF34");
                        		$healthImg.attr("src","img/p4.png");
                        	}
                        	
                    		$('[data-role="echApp"]',$echartsList[i]).text(a);        //从json源echInfo配置应用数据
                    		$('[data-role="echApp"]',$echartsList[i]).css("color",echAttrColor);
                    		
                    		$('[data-role="echMiddle"]',$echartsList[i]).text(b);   //从json源echInfo配置中间数据
                    		$('[data-role="echMiddle"]',$echartsList[i]).css("color",echAttrColor);
                    		
                    		$('[data-role="echSystem"]',$echartsList[i]).text(c);   //从json源echInfo配置系统数据
                    		$('[data-role="echSystem"]',$echartsList[i]).css("color",echAttrColor);
                    		
                    		$('[data-role="echSql"]',$echartsList[i]).text(d);      //从json源echInfo配置数据库数据
                    		$('[data-role="echSql"]',$echartsList[i]).css("color",echAttrColor);
                    		$('[data-role="echLiked"]',$echartsList[i]).click(function(){
                    			if(liked=="true"){
                    				$('[data-role="echLiked"]',$echartsList[i]).css({'color':function(){
                            			return '#333'
                            		}});
                    				$.ajax({
                        				'type': 'post',
                        				'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
                        				'url': 'FineDegreeAction_fineCancle.do',
                        				'dataType': 'json',
                        				'data':{"systemName":systemName},
                        				'success': function (resp) {
                        					$ctn=$('#echCtn',$el).empty();//清空 页面
                        					$echartsList.length=0;//清空jquery 对象
                        					$.ajax({
                                				'type': 'post',
                                				'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
                                				'url': 'FineDegreeAction_loadFine.do',
                                				'dataType': 'json',
                                				'data': " ",
                                				'success': function (resp) {
                                				 	  
                                					for(var i=0;i<resp.content.fineData.length;i++){
                                						
                                						addEchTemp(resp.content.fineData[i].liked,resp.content.fineData[i].systemName,resp.content.fineData[i].fine,resp.content.fineData[i].a,resp.content.fineData[i].b,resp.content.fineData[i].c,resp.content.fineData[i].d);
                                					    fresh(resp.content.fineData[i].systemName,resp.content.fineData[i].fine,resp.content.fineData[i].a,resp.content.fineData[i].b,resp.content.fineData[i].c,resp.content.fineData[i].d,resp.content.fineData[i].liked,i);
                                						
                                					}
                                					
                                				}
                                			
                                			}); 
                        					 
                        					
                        				}
                        			
                        			});
                    			}else{
                    				$('[data-role="echLiked"]',$echartsList[i]).css({'color':function(){
                            			return '#a11'
                            		}});
                    				$.ajax({
                        				'type': 'post',
                        				'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
                        				'url': 'FineDegreeAction_fineCollect.do',
                        				'dataType': 'json',
                        				'data':{"systemName":systemName},
                        				'success': function (resp) {
                    
                        					$ctn=$('#echCtn',$el).empty();
                        					$echartsList.length=0;
                        					$.ajax({
                                				'type': 'post',
                                				'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
                                				'url': 'FineDegreeAction_loadFine.do',
                                				'dataType': 'json',
                                				'data': " ",
                                				'success': function (resp) {
                                				 	  
                                					for(var i=0;i<resp.content.fineData.length;i++){
                                						
                                						addEchTemp(resp.content.fineData[i].liked,resp.content.fineData[i].systemName,resp.content.fineData[i].fine,resp.content.fineData[i].a,resp.content.fineData[i].b,resp.content.fineData[i].c,resp.content.fineData[i].d);
                                					    fresh(resp.content.fineData[i].systemName,resp.content.fineData[i].fine,resp.content.fineData[i].a,resp.content.fineData[i].b,resp.content.fineData[i].c,resp.content.fineData[i].d,resp.content.fineData[i].liked,i);
                                						
                                					}
                                					
                                				}
                                			
                                			});

                        					 
                        					
                        				}
                        			
                        			});
                    			}
                    			
                    		});
                        	 
                        	
                        }
                      
                        
            			//定义加载echartTemp模板函数
                        function addEchTemp(liked,head,fine,a,b,c,d){
                        	$ctn=$('#echCtn',$el);             //获取加载模板的容器
                        	
                        	$echChart=$($("#echTemp",$el).html());    //获取模板$对象
                        
                        	$ctn.append($echChart);                   
                        	
                        	echChart=$("#echFig",$echChart)[0];
                        	
                        	
                        	//设置表头
                        	$('[data-role="echHead"]',$echChart).text(head);
                        	$('[data-role="echFigNum"]',$echChart).text(fine+"%");
                        	$('[data-role="echApp"]',$echChart).text(a);
                        	$('[data-role="echMiddle"]',$echChart).text(b);
                        	$('[data-role="echSystem"]',$echChart).text(c);
                        	$('[data-role="echSql"]',$echChart).text(d);
                        	//设置是否收藏
                        	if(liked=="true"){
                        		$('[data-role="echLiked"]',$echChart).css({'color':function(){
                        			return '#a11'
                        		}});	
                        	}
                        	$echartsList.push($echChart);
                        }
                       
                        this.delegateEvents({
                        	'click #search':function(){
                        		var searchtext=$("#searchfine").val();
            					$.ajax({
                    				'type': 'post',
                    				'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
                    				'url': 'FineDegreeAction_searchFine.do',
                    				'dataType': 'json',
                    				'data':{"searchText":searchtext},
                    				'success': function (resp) {
                    					$ctn=$('#echCtn',$el).empty();
                    					$echartsList.length=0; 
                    					for(var i=0;i<resp.content.fineData.length;i++){
                    						
                    						addEchTemp(resp.content.fineData[i].liked,resp.content.fineData[i].systemName,resp.content.fineData[i].fine,resp.content.fineData[i].a,resp.content.fineData[i].b,resp.content.fineData[i].c,resp.content.fineData[i].d);
                    					    fresh(resp.content.fineData[i].systemName,resp.content.fineData[i].fine,resp.content.fineData[i].a,resp.content.fineData[i].b,resp.content.fineData[i].c,resp.content.fineData[i].d,resp.content.fineData[i].liked,i);
                    						
                    					}
                    					
                    				}
                    			
                    			});	
                        		
                        	}
                        });
                        //刷新echart数据,时间间隔3秒
                      /*  refresh();*/
                      //  refreshClock=handler.setInterval(refresh,300000,true);
            
            
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});