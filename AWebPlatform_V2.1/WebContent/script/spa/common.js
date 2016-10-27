/**
 * [公共方法]
 * @param  {[undefined]} undefined [确保undefined未被重定义]
 * @author lijiancheng@cfischina.com
 */
( /*<global>*/ function (undefined) {

    (function (factory) {
        "use strict";

        //amd module
        if(typeof define === "function" && define.amd) {
            define(factory);
        }
        //global
        else{
            factory();
        }

    })(function () {
        "use strict";

        //控制按钮是否可执行
        var addOrRemoveDisabled = function(ids,isDisabled,___$context){
            if(ids!=null&&ids!=""){
                //改变数据可执行的按钮
                var idss = ids.split(",");
                for (var i = 0; i <= idss.length; i++) {
                    if(isDisabled){
                        $(idss[i],___$context).addClass('disabled');
                    }else{
                        $(idss[i],___$context).removeClass('disabled');
                    }

                }
            }
        }

        return {
            addOrRemoveDisabled:addOrRemoveDisabled
        }

    });

})();