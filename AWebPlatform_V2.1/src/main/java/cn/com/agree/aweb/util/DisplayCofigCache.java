package cn.com.agree.aweb.util;

import java.util.HashMap;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONObject;
/**
 * 指标配置缓存
 * @author liyuansheng  liyuansheng@agree.com.cn
 * 2016年5月19日
 *
 */
public class DisplayCofigCache {
	private static Map<String, JSONObject> cofigCache =new HashMap<String, JSONObject>();

	public static Map<String, JSONObject> getCofigCache() {
		return cofigCache;
	}

	public static void setCofigCache(Map<String, JSONObject> cofigCache) {
		DisplayCofigCache.cofigCache = cofigCache;
	}
}
