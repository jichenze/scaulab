package cn.com.agree.aweb.util;

import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONObject;
import cn.com.agree.aweb.hibernate.dao.ClassifyConfigVO;
import cn.com.agree.aweb.hibernate.dao.support.StandardDbSupport;
import cn.com.agree.aweb.interfaces.ConfigLoader;

/**
 * 从数据库中读取配置，并把读取后的配置存入缓存
 * 
 * @author liyuansheng liyuansheng@agree.com.cn 
 * 2016年5月19日
 */
public class DataBaseConfigLoader implements ConfigLoader {

	@Override
	@SuppressWarnings("unchecked")
	public JSONObject ConfigReder(String key) throws Exception {
		// 加载缓存
		Map<String, JSONObject> configCache = DisplayCofigCache.getCofigCache();

		// 如果缓存中没有该配置，读取配置
		if (configCache == null || configCache.get(key) == null) {
			
			//获得数据库操作对象
			StandardDbSupport bean = (StandardDbSupport) SpringUtil.getBean("hibernateDao");
			String[] values = key.split("_");
			String[] param = { "subclassify", "showtype", "state" };
			
			List<ClassifyConfigVO> configs = (List<ClassifyConfigVO>) bean.queryDataByClass(ClassifyConfigVO.class,
					param, values);
			
			String stringConfig = configs.get(0).getStringConfig();
			JSONObject config = JSONObject.parseObject(stringConfig);
			
			//把配置存入缓存
			configCache.put(key, config);
			return config;
		} else {
			return configCache.get(key);
		}
	}

}
