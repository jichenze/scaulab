package cn.com.agree.aweb.util;

import static org.junit.Assert.*;

import org.junit.Test;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;


/**
 * 数据结构转换，适合前台js使用
 * @author liyuansheng  liyuansheng@agree.com.cn
 * 2016年5月10日
 *
 */
public class GetStrutsMsg {
	
	/**
	 * table数据格式转换
	 * @param key			指标名
	 * @param jsondata  	待处理的json
	 * @param configjson	格式配置json
	 * @return				json数组，符合table需求
	 * @throws Exception
	 */
	public static JSONArray getTableMsg(String key,JSONArray jsondata,JSONObject configjson) throws Exception{
		
		if(jsondata==null){
			return null;
		}
		if(configjson==null){
			return null;
		}
		//获得指标的配置
		JSONArray array = (JSONArray) configjson.get(key);
		
		if(array==null){
			return null;
		}
		//初始化返回值
		JSONArray tablejson=new JSONArray();
		
		for(int i=0;i<jsondata.size();i++){
			
			JSONObject tempObj=new JSONObject();
			JSONObject cjson = (JSONObject) jsondata.get(i);
			
			for(int j=0;j<array.size();j++){
				
				tempObj.put(array.getString(j), cjson.get(array.getString(j)));
				
			}
			tablejson.add(tempObj);
			
		}
		
		return tablejson;
		
	}
	
	/**
	 * 折线图、柱状图数据转换
	 * @param key			指标名
	 * @param jsondata  	待处理的json
	 * @param configjson	格式配置json
	 * @return				json对象，符合line/bar需求
	 * @throws Exception
	 */
	public static JSONObject getLineMsg(String key,JSONArray jsondata,JSONObject configjson) throws Exception{
		
		if(jsondata==null){
			return null;
		}
		if(configjson==null){
			return null;
		}
		//获得指标的配置
		JSONArray array = (JSONArray) configjson.get(key);
		
		if(array==null){
			return null;
		}
		//暂存二维数组
		String[][] temparr=new String[array.size()][jsondata.size()];
		//初始化返回值
		JSONObject linejson=new JSONObject();
		
		for (int i = 0; i < temparr.length; i++) {
			
			for (int j = 0; j < jsondata.size(); j++) {
				
				JSONObject object=(JSONObject) jsondata.get(j);
				temparr[i][j]=(String) object.get(array.get(i));
				
			}
			
			linejson.put(array.getString(i), temparr[i]);
		}
		
		return linejson;
		
	}
	
	/**
	 * 饼状图数据转换
	 * @param key			指标名
	 * @param jsondata  	待处理的json
	 * @param configjson	格式配置json
	 * @return				json数组，符合pie需求
	 * @throws Exception
	 */
	public static JSONArray getPieMsg(String key,JSONArray jsondata,JSONObject configjson) throws Exception{
		
		if(jsondata==null){
			return null;
		}
		if(configjson==null){
			return null;
		}
		//获得指标的配置
		JSONArray array = (JSONArray) configjson.get(key);
		
		if(array==null){
			return null;
		}
		//初始化返回值
		JSONArray piejson=new JSONArray();
		
		for(int i=0;i<jsondata.size();i++){
			
			JSONObject tempObj=new JSONObject();
			JSONObject object = (JSONObject) jsondata.get(i);
			
			tempObj.put("name", object.get(array.get(0)));
			tempObj.put("value", object.get(array.get(1)));
			
			piejson.add(tempObj);
		}
		
		return piejson;
		
	}
	public static JSONArray getPie2Msg(String key,JSONArray jsondata,JSONObject configjson) throws Exception{
		
		if(jsondata==null){
			return null;
		}
		if(configjson==null){
			return null;
		}
		//获得指标的配置
		JSONArray array = (JSONArray) configjson.get(key);
		
		if(array==null){
			return null;
		}
		//初始化返回值
		JSONArray piejson=new JSONArray();
		
		for(int i=0;i<jsondata.size();i++){
			
			JSONObject tempObj=new JSONObject();
			JSONObject object = (JSONObject) jsondata.get(i);
			
			tempObj.put("name", object.get(array.get(0)));
			tempObj.put("value", object.get(array.get(1)));
			
			piejson.add(tempObj);
		}
		
		return piejson;
		
	}

}
