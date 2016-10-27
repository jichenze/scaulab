/**
 * 避免污染全局变量
 */
$(function () {
	"use strict";
	var pwStrength = 0, user;	//密码强度

	//新用户第一次登录需更改密码
	//验证密码
	function validataUserPassword(userPW){
		pwStrength = 0;
		var password = $("#user_password").val(),
		$tips=$("#user_passwordTips");
		if(password==undefined||password==""){
			$tips.closest('.control-group').addClass('error');
			$tips.removeClass('hide').text("密码不能为空！");
			pwStrength = 0;
			return false;
		}else if(password.length<6||password.length>30){
			$tips.closest('.control-group').addClass('error');
			$tips.removeClass('hide').text("密码长度需在6-30之间！");
			pwStrength = 0;
			return false;
		}else if(userPW==password){
			$tips.closest('.control-group').addClass('error');
			$tips.removeClass('hide').text("不能与原密码相同！");
			pwStrength = 0;
			return false;
		}else {
			$tips.closest('.control-group').removeClass('error');
			$("#user_passwordTips").addClass('hide');

			//密码强度
			if(password.match(/[a-z]/g)){pwStrength++;}
			if(password.match(/[0-9]/g)){pwStrength++;}
			if(password.match(/(.[^a-z0-9])/g)){pwStrength++;}
			if(pwStrength > 3){pwStrength=3;}
			return true;
			
		}
	}
	//验证重复密码
	function revalidataUserPassword(){
		if($("#user_repassword").val()!=$("#user_password").val()){
			$("#user_repasswordTips").closest('.control-group').addClass('error');
			$("#user_repasswordTips").removeClass('hide').text("密码不一致！");
			return false;
		}else{
			$("#user_repasswordTips").closest('.control-group').removeClass('error');
			$("#user_repasswordTips").addClass('hide');
			return true;
		}
	}
	//重置密码修改框内容
	function resetPassword(){
		$("#user_repasswordTips").closest('.control-group').removeClass('error');
		$("#user_repasswordTips").addClass('hide');
		$("#user_passwordTips").closest('.control-group').removeClass('error');
		$("#user_passwordTips").addClass('hide');
		$("#user_password").val("");
		$("#user_repassword").val("");
	}
	//验证密码格式
	$("#user_password").blur(function(){
		validataUserPassword(user.password);
	});

	//验证重复密码是否匹配
	$('#user_repassword').blur(function(){
		revalidataUserPassword();
	});

	//绑定重置密码修改框内容
	$("#resetPasswordbtn").click(function() {
		resetPassword();
	});
	//绑定修改密码提交事件
	$("#upPasswordbtn").click(function() {
		if(validataUserPassword(user.password)&&revalidataUserPassword()){
			$.ajax({
				"type": "post",
				"contentType": "application/x-www-form-urlencoded;charset=utf-8",
				"url": "UserManagerAction_doEditPassword.do",
				"dataType": "json",
				shelter:'正在修改用户密码，请稍候…',
				"data": {
					username:user.username,
					password:$("#user_password").val()
				},
				success: function (data2) {
					if (data2.status) {
						alert("密码修改成功,请重新登录！");
						$("#signOut").click();
					} else {
						alert(data2.errorMsg);
					}
				}, error: function (xhr, status, errMsg) {
					alert('错误' + status, errMsg, 'msg');
				}
			});
		}
	});

	$.ajax({
		"type": "post",
		"contentType": "application/x-www-form-urlencoded;charset=utf-8",
		"url": "UserManagerAction_loadNowUser.do",
		"dataType": "json",
		"data": {},
		shelter:'正在加载当前用户数据，请稍侯…',
		success: function (data) {
			if (data.status) {
				user = data.content.userVO;
				//判断是否初始登录
				if(user.updateTime==undefined||user.updateTime==""){
					//修改初始密码
					$('#upPasswordTemp').removeClass('hide');
					$('#upPasswordTemp').modal({
						"show" : true,
						'keyboard' : false
					});
				}else{
				}
			} else {
				alert(data.errorMsg);
			}
		}, error: function (xhr, status, errMsg) {
			alert(errMsg);
		}
	});

	/*当前时间*/
	function showLocale(objD) {
		var str;
		var yy = objD.getYear();
		if (yy < 1900) yy = yy + 1900;
		var MM = objD.getMonth() + 1;
		if (MM < 10) MM = '0' + MM;
		var dd = objD.getDate();
		if (dd < 10) dd = '0' + dd;
		var hh = objD.getHours();
		if (hh < 10) hh = '0' + hh;
		var mm = objD.getMinutes();
		if (mm < 10) mm = '0' + mm;
		var ss = objD.getSeconds();
		if (ss < 10) ss = '0' + ss;
		var ww = objD.getDay();
		if (ww == 0) ww = "星期日";
		if (ww == 1) ww = "星期一";
		if (ww == 2) ww = "星期二";
		if (ww == 3) ww = "星期三";
		if (ww == 4) ww = "星期四";
		if (ww == 5) ww = "星期五";
		if (ww == 6) ww = "星期六";
		str = yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss + "  " + ww ;
		return (str);
	}

	window.setInterval(function(){
		$('#nowTime').text(showLocale(new Date()));
	},1000);

	/*Date.prototype.Format = function (fmt) { //
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}*/


	/*顶部nav*/
	//帮助文档,消息中心用户显隐藏
	var $banner=$('#banner'),
	__bannerCtns={
		'skinChangeShowBtn':'#skinChangeContainer',
		'messageCenterShowBtn':'#messageCenterContainer'
	};
	$('body').click(function(e){
		var $el=$(e.target||window.event.srcElement),
		$link= $el.closest('a')[0],
		$ctn=$el.closest('[id$=Container]')[0];

		if($link&&$link.id in __bannerCtns){
			if(!__bannerCtns.currentContainer||(__bannerCtns.currentContainer===$link.id&&$(__bannerCtns[$link.id],$banner).css('display')==='none')){
				$(__bannerCtns.currentContainer=__bannerCtns[$link.id],$banner).slideDown(100);
			}else if(__bannerCtns.currentContainer!==__bannerCtns[$link.id]){
				$(__bannerCtns.currentContainer,$banner).slideUp(100);
				$(__bannerCtns.currentContainer=__bannerCtns[$link.id],$banner).slideDown(100);
			}else{
				$(__bannerCtns.currentContainer,$banner).slideUp(100);
				__bannerCtns.currentContainer=null;
			}
		}else if(!(__bannerCtns.currentContainer&&$ctn&&$ctn.id&&~__bannerCtns.currentContainer.indexOf($ctn.id))){
			//不为被点击的容器id时，收起
			$(__bannerCtns.currentContainer,$banner).slideUp(100);
			__bannerCtns.currentContainer=null;
		}
	});

	$("#usersafebtn",$banner).click(function() {
		resetPassword();
		//修改密码
		$('#upPasswordTemp').modal().find('.close').removeClass('hide');
	});

	//注销
	$("#signOut",$banner).click(signOut);
	function signOut() {
		$.ajax({
			"type": "POST",
			"url": "LoginAction_signOut.do",
			shelter:'正在注销，请稍候…',
			"success": function (data) {
				//app.io.disconnect();
				if (data.status)
					$("#redirectForm").submit();
			},
			"error": function (data) {

			}
		});
	}

	/*左侧边栏*/
	$('#asideMenu').click(function () {
		app.screen(app.screen.fullScreen.LEFT);
	});

	//加载左侧边栏
	$.ajax({
		"type": "POST",
		"url": "MenuDataAction_disposeMenu.do",
		"success": function (resp) {
			if (resp.status) {
				var rootJson = resp.content.menuData;
				var menuAccess = resp.content.menuAccess;
				//加载权限菜单树
				appendAccessMenu(menuAccess,rootJson);
			} else {
				app.alert('解析菜单', resp.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
			}

			/*事件绑定*/
			var leftAsideClickHandler;
			//美化左边菜单栏滚动条
			$('#asideMenuList').slimScroll({
				height : '100%',
				color : '#fff'
			});
			$('a','#leftAside').addClass('no-select').click(function(event) {
				var $this = $(this);
				//双击事件
				if(leftAsideClickHandler){
					window.clearTimeout(leftAsideClickHandler);
					leftAsideClickHandler=null;
					if (!$this.hasClass('accordion-toggle')) {
						// 显示容器
						var title,section,path;
						if ($this.attr('data-href')) {
							title=$.trim($this.text());
							section=$this.attr('data-href').split('#');
							path=$this.attr("data-path");
							if(path){
								//缓存
								app.domain.exportMenuParam({
									path:path,
									type:$this.attr('data-type')
								});
								//转跳
								app.dispatcher.load({
									title:title,
									moduleId: section[0],
									section:section.slice(1),
									id:path
								});
							}else {
								app.dispatcher.load.apply(app.dispatcher, [title].concat(section));
							}
						}
					}else{
						// 双击第一层菜单
						var title,section,path;
						var href = $this.attr('href');
						if (href &&(href==='#monitorApp' || href==='#monitorOperation' || href==='#monitorSystem' || href==='#appAll' ||href==="#fineDegree"|| href==='#workSpace')) {
							title=$.trim($this.text());
							section=$this.attr('href').split('#');
							section = [section[1]];
							path=$this.attr("data-path");
							if(path){
								//缓存
								app.domain.exportMenuParam({
									path:path,
									type:$this.attr('data-type')
								});
								//转跳
								app.dispatcher.load({
									title:title,
									moduleId: section[0],
									section:section.slice(1),
									id:path
								});
							}else {
								app.dispatcher.load.apply(app.dispatcher, [title].concat(section));
							}
						}

					}
				}else{//单击事件
					leftAsideClickHandler=window.setTimeout(function(){
						leftAsideClickHandler=null;
						var timeout = .35,
						$ul = $this.next('ul');
						if($ul.length){
							$this.toggleClass('collapsed');
							$ul.slideToggle(200);
							$('li', $ul).each(function (index, elem) {
								TweenLite&&TweenLite.fromTo(elem, .5, {
									x: '-10%',
									y: '-15%',
									opacity: 0,
									ease: Quint.easeOut
								}, {
									x: '+=10%',
									y: '+=15%',
									opacity: 1,
									ease: Quint.easeOut,
									delay: timeout
								});
								timeout += .045;
							});
						}
					},250);//单击延时0.25s
				}
			});
		}
	});

	//加载权限菜单树
	function appendAccessMenu(menuAccess,rootJson){
		if(menuAccess!=null){
			var map = [];
			for(var i=0;i<menuAccess.length;i++){
				var vo = menuAccess[i];
				if(map[vo.pid] == undefined){
					map[vo.pid] = [];
				}
				map[vo.pid][vo.sort]=vo;
			}
			var $asideMenuList = $("#asideMenuList");
			if(map["access"]!= undefined){
				var ifloadTree = false;
				for(var i1=0 ; i1<map["access"].length;i1++){
					if(map["access"][i1]!=undefined){
						var vo1 = map["access"][i1];
						var html = "";
						html += '<div class="accordion-group"><div class="accordion-heading">';
						html += '<a class="accordion-toggle collapsed hvr-bounce-to-left" data-toggle="collapse" data-parent="#asideMenuList" href="#' + vo1.id + '" title="' + vo1.name + '" >';
						html += '<i class="fa  fa-'+(vo1.icon||'cloud')+'"></i><span>&nbsp;'+vo1.name+'</span><i class="fa fa-angle-down"></i></a></div>';
						if(map[vo1.id] != undefined){
							html += '<div id="'+vo1.id+'" class="accordion-body collapse">';
							html += '<div class="accordion-inner"><ul class="nav nav-list">';
							for(var i2=0 ; i2<map[vo1.id].length;i2++){
								if(map[vo1.id][i2]!=undefined){
									var vo2 = map[vo1.id][i2];
									html += '<li title="' + vo2.name + '"><a data-href="' + vo2.id + '">' + vo2.name + '</a></li>';
								}
							}
							html += '</ul></div></div>';
						}
						if(vo1.id=="appAll"){
							//动态域树
							html += '<div id="'+vo1.id+'" class="accordion-body collapse">';
							html += '<div class="accordion-inner"><ul id="menuData" class="nav nav-list"></ul></div>';
							ifloadTree = true;
						}
						html += '</div>';
						$asideMenuList.append(html);
					}
				}
				if(ifloadTree){
					var $menuData = $("#menuData");
					if (rootJson && rootJson.children && rootJson.children.length) {//防止数据库为空时，报错
						$menuData.append(appendMenu(1, {children: [rootJson]}));
					}
				}
			}
		}
	}
	//加载域树
	function appendMenu(level, json) {
		var html='',childrenHTML;
		$.each(json.children,function(index,children){
			if(children.devtype!=='6'){
				typeof children.href ==='string'?'':(children.href='');
				html += '<li class="accordion-toggle" title="' + children.path + '"><a class="collapsed" data-path="' + children.path +
				'" data-href="' + children.href + '" data-type="'+children.devtype  +'">'+
				children.desp ;
				if (children.children && children.children.length > 0) {
					childrenHTML=appendMenu(level + 1, children);
					if(childrenHTML.length){
						html += '<i class="fa fa-angle-down"></i></a> <ul>' + childrenHTML + '</ul>';
					}
					childrenHTML=null;
				}
			}
		});
		html=html?(html+'</a></li>'):html;

		return html;
	}

	//美化左边菜单栏滚动条
	$('#asideMenuList').slimScroll({
		height : '100%',
		color : '#fff'
	});

	//窗口改变大小时弹出框自适应
	function setModalLgSize(){
		var modal = {
				h:'', w:'', l:'', t:''},modalStyle,modalBodyHeight,maxHeight,
				$modalStyle = $('#modalStyles'),
				$body = $('body'),
				$mHeader = $('.modal-header'),
				$mBody = $('.modal-body');
		//定义modal大小
		modal.h = $body.height();
		modal.w = $body.width()*0.8;
		modal.l = -(modal.w*0.5);
		modal.t = -(modal.h*0.5);
		modalStyle = 'width:'+modal.w+'px;'+
		'height:'+modal.h+'px;'+
		'margin-left:'+modal.l+'px;'+
		'margin-top:'+modal.t+'px;'+
		'left:50%;top:'+($(window).height()/2-20)+'px;'+
		'transition:all linear .3s';
		maxHeight = modal.h-$mHeader.outerHeight()-($mBody.outerHeight()-$mBody.height())*2-10;
		modalBodyHeight = 'max-height:'+maxHeight+'px;min-height:'+maxHeight+'px;';
		if($modalStyle.length==0){
			var $style = $('<style id="modalStyles">');
			$style.append('.modal-lg.fade.in{'+modalStyle+'}'+'.modal-lg.fade.in .modal-body{'+modalBodyHeight+'}');
			$('head').append($style);
		}
		else{
			$modalStyle.empty().append('.modal-lg.fade.in{'+modalStyle+'}'+'.modal-lg.fade.in .modal-body{'+modalBodyHeight+'}');
		}
	}
	app.screen.addResizeHandler({
		isGlobal: true,
		callback: setModalLgSize,
		uid:app.global.getUniqueId()
	});
	setModalLgSize();

	$(document).unload(function () {
		signOut();
	});
});
