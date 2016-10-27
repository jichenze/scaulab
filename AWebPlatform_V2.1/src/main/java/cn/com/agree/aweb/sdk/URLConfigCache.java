package cn.com.agree.aweb.sdk;

import java.util.List;
import java.util.Map;

import cn.com.agree.afa.aim.connector.util.URL;

/**
 * url配置缓存
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年5月30日
 */
public class URLConfigCache {
	private static Map<String,List<URL>> ConfigCache;

	public static Map<String,List<URL>> getConfigCache() {
		return ConfigCache;
	}

	public static void setConfigCache(Map<String,List<URL>> configCache) {
		ConfigCache = configCache;
	}
}
