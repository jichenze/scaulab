package cn.com.agree.aweb.interfaces;

import com.aim.alibaba.fastjson.JSONObject;
/**
 * 加载配置文件接口
 * @author liyuansheng  liyuansheng@agree.com.cn
 * 2016年5月19日
 *
 */
public interface ConfigLoader {
	public JSONObject ConfigReder(String key) throws Exception;
}
