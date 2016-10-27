$(function () {
    var CODE_ENTER = 13,
        FIELD_USERNAME = "usernameField",
        FIELD_PASSWORD = "passwordField",
        BUTTON_SUBMIT = "submitButton";

    errornum = 0;
    errortime = "";

    function login() {
        var usernameValue = $("#" + FIELD_USERNAME).val(),
            passwordValue = $("#" + FIELD_PASSWORD).val();

        if (!usernameValueCheck(usernameValue))
            return;

        if (!passwordValueCheck(passwordValue))
            return;

        $.ajax({
            "type": "POST",
            "url": "LoginAction_signIn.do",
            "data": {
                username: usernameValue,
                password: passwordValue
            },
            shelter:'正在登录，请稍候…',
            "success": function (data) {
                if (data.status) {

                    $("#redirectForm").submit();
                } else {
                    $("#tips").html(data.errorMsg);
                }
            },
            "error": function (data) {

            }
        });
    }

    function usernameValueCheck(usernameValue) {
        if (!usernameValue){
            $("#tips").html("用户名不能为空");
            $("#"+FIELD_USERNAME).focus();
        }

        return !!usernameValue;
    }

    function passwordValueCheck(passwordValue) {
        if (!passwordValue){
            $("#tips").html("密码不能为空");
            $("#"+FIELD_PASSWORD).focus();
        }

        return !!passwordValue;
    }

    $('#loginVideo').on('canplay',function(){
        $(this).fadeIn();
        $('.login-container').css({
            'background-image': 'none',
            'background-color': 'rgba(255, 255, 255, 0.6)'
        })
    });
    //登陆处理
    $("#" + BUTTON_SUBMIT).click(login);

    //焦点切换
    var $tab=$('[data-tab="tab-focus"]');
    $tab.eq(0).focus();
    $tab.each(function(index,elem){
        $(this).on('keydown',{index:index},function(e){
            var key = e.which || window.event.keyCode;

            if (9===key) { //tab
                $tab.eq((e.data.index+1+$tab.length)%$tab.length).focus();
                return false;
            }
        });
    });

	//页面监听回车事件
	$(document).keydown(function (event) {
		var keyCode = event.which,
			target = event.target;

		if (keyCode == CODE_ENTER) {
			if (target.id === FIELD_USERNAME)
				$("#" + FIELD_PASSWORD).focus();
			else if (target.id === FIELD_PASSWORD)
				login();
		}
	});
    $(document).on('unload',function(){
        $(this).fadeOut();
    });
});


