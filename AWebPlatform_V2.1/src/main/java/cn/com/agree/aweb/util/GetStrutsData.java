package cn.com.agree.aweb.util;

import java.util.ArrayList;
import java.util.List;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;
/**
 * 把Afa平台数据通过配置转换为js需要的数据
 * @author liyuansheng  liyuansheng@agree.com.cn
 * 2016年5月19日
 *
 */
public class GetStrutsData {
	/**
	 * 
	 * @param config	json配置
	 * @param jsonData  afa平台的私有报文
	 * @return			固定图例的饼状图需要的option动态部分
	 */
	public static JSONObject getPieMsg0(JSONObject config, JSONObject jsonData) {
		
		JSONObject returnv = new JSONObject();
		
		JSONArray seriesData = new JSONArray();
		String title = config.getString("title");
		String seriesName = config.getString("seriesName");
		
		JSONArray columns = config.getJSONArray("columns");
		JSONArray legend = config.getJSONArray("legend");
		
		for (int i = 0; i < columns.size(); i++) {
			
			JSONObject temp = new JSONObject();
			String[] array = (String[]) jsonData.get(columns.getString(i));
			
			temp.put("name", legend.getString(i));
			temp.put("value", array[0]);
			
			seriesData.add(temp);
		}
		
		returnv.put("title", title);
		returnv.put("legend", legend);
		returnv.put("seriesData", seriesData);
		returnv.put("seriesName", seriesName);
		
		return returnv;
	}
	/**
	 * 
	 * @param config	json配置
	 * @param jsonData  afa平台的私有报文
	 * @return			动态图例的饼状图需要的option动态部分
	 */
	public static JSONObject getPieMsg1(JSONObject config, JSONObject jsonData) {
		
		JSONObject returnv = new JSONObject();
		
		String title = config.getString("title");
		JSONArray legend = jsonData.getJSONArray(config.getString("legend"));
		
		JSONArray seriesData = new JSONArray();

		JSONArray columns = jsonData.getJSONArray(config.getString("columns"));
		
		String seriesName = config.getString("seriesName");
		for (int i = 0; i < columns.size(); i++) {
			
			JSONObject temp = new JSONObject();
			
			temp.put("name", legend.getString(i));
			temp.put("value", columns.getString(i));
			
			seriesData.add(temp);
		}
		
		returnv.put("title", title);
		returnv.put("legend", legend);
		returnv.put("seriesData", seriesData);
		returnv.put("seriesName", seriesName);
		
		return returnv;
	}
	/**
	 * 
	 * @param config	json配置
	 * @param jsonData  afa平台的私有报文
	 * @return			固定图例动态x轴的柱状图状图需要的option动态部分
	 */
	public static JSONObject getLineMsg_01(JSONObject config, JSONObject jsonData) {
		
		JSONObject returnv = new JSONObject();
		
		String title = config.getString("title");
		JSONArray legend = config.getJSONArray("legend");
		JSONArray xAxis = jsonData.getJSONArray(config.getString("xAxis"));
		//需要的字段名的集合
		
		JSONArray columns = config.getJSONArray("columns");
		JSONArray seriesData = new JSONArray();
		for (int i = 0; i < columns.size(); i++) {
			
			JSONObject temp = new JSONObject();
			
			//每个字段的值的集合
			JSONArray columnData = jsonData.getJSONArray(columns.getString(i));
			
			temp.put("name", legend.getString(i));
			temp.put("data", columnData);
			temp.put("type", "line");
			
			seriesData.add(temp);
		}
		
		returnv.put("title", title);
		returnv.put("legend", legend);
		returnv.put("seriesData", seriesData);
		returnv.put("xAxis", xAxis);
		
		return returnv;
	}
	/**
	 * 
	 * @param config	json配置
	 * @param jsonData  afa平台的私有报文
	 * @return			动态图例动态x轴的柱状图需要的option动态部分
	 */
	public static JSONObject getLineMsg_11(JSONObject config, JSONObject jsonData) {
		
		JSONObject returnv = new JSONObject();
		JSONArray seriesData = new JSONArray();
		String title = config.getString("title");
		
		JSONArray legendtemp = jsonData.getJSONArray(config.getString("legend"));
		JSONArray xAxistemp = jsonData.getJSONArray(config.getString("xAxis"));
		
		JSONArray columns = config.getJSONArray("columns");
		
		//去除legend字段中的重复值
		List<String> legenddata = new ArrayList<String>();
		for (int i = 0; i < legendtemp.size(); i++) {
			if (!(legenddata.contains(legendtemp.getString(i)))) {
				legenddata.add(legendtemp.getString(i));
			}
		}
		JSONArray legend = new JSONArray();
		for (String string : legenddata) {
			legend.add(string);
		}
		
		//去除xAxis字段中的重复值
		List<String> xAxisdata = new ArrayList<String>();
		for (int i = 0; i < legendtemp.size(); i++) {
			if (!(xAxisdata.contains(xAxistemp.getString(i)))) {
				xAxisdata.add(xAxistemp.getString(i));
			}
		}
		JSONArray xAxis = new JSONArray();
		for (String string : xAxisdata) {
			xAxis.add(string);
		}
		
		for (int i = 0; i < columns.size(); i++) {
			
			JSONArray columnData = jsonData.getJSONArray(columns.getString(i));
			//初始化角标
			int index = 0;
			
			for (int j = 0; j < legend.size(); j++) {
				
				JSONObject tempObject = new JSONObject();
				JSONArray tempArr = new JSONArray();
				
				for (int k = 0; k < xAxis.size(); k++) {
					
					tempArr.add(columnData.getString(index));
					index++;
					
				}
				
				tempObject.put("name", legend.getString(j));
				tempObject.put("data", tempArr);
				tempObject.put("type", "line");
				
				seriesData.add(tempObject);
			}
		}
		
		returnv.put("seriesData", seriesData);
		returnv.put("title", title);
		returnv.put("xAxis", xAxis);
		returnv.put("legend", legend);
		
		return returnv;
	}
	/**
	 * 
	 * @param config	json配置
	 * @param jsonData  afa平台的私有报文
	 * @return			动态加点的固定图例柱状图需要的option动态部分
	 */
	public static JSONObject getLineMsg_02(JSONObject config, JSONObject jsonData){
		
		JSONObject returnv = new JSONObject();
		JSONArray seriesData = new JSONArray();
		String title = config.getString("title");
		JSONArray legend = config.getJSONArray("legend");
		
		JSONArray columns = config.getJSONArray("columns");
		String xNum = config.getString("xNum");
		
		for (int i = 0; i < columns.size(); i++) {
			seriesData.add((jsonData.getJSONArray(columns.getString(i))).get(0));
		}
		
		returnv.put("seriesData", seriesData);
		returnv.put("title", title);
		returnv.put("xNum", xNum);
		returnv.put("legend", legend);
		return returnv;
		
	}
	/**
	 * 
	 * @param config	json配置
	 * @param jsonData  afa平台的私有报文
	 * @return			动态加点的动态图例柱状图需要的option动态部分
	 */
	public static JSONObject getLineMsg_12(JSONObject config, JSONObject jsonData){
		
		JSONObject returnv = new JSONObject();
		JSONArray seriesData = new JSONArray();
		
		String title = config.getString("title");
		JSONArray legend= jsonData.getJSONArray(config.getString("legend"));
		String xNum = config.getString("xNum");
		
		JSONArray columnData=jsonData.getJSONArray(config.getString("columns"));
		for (int i = 0; i < columnData.size(); i++) {
			seriesData.add(columnData.getString(i));
		}
		
		returnv.put("seriesData", seriesData);
		returnv.put("title", title);
		returnv.put("xNum", xNum);
		returnv.put("legend", legend);
		return returnv;
		
	}
	/**
	 * 
	 * @param config	json配置
	 * @param jsonData  afa平台的私有报文
	 * @return			前端分页数据返回
	 */
	public static JSONObject getTableMsg_0(JSONObject config, JSONObject jsonData){
		
		JSONObject returnv = new JSONObject();
		JSONArray aoColumns=config.getJSONArray("aoColumns");
		JSONArray tableData=new JSONArray();
		String title=config.getString("title");
		
		for (int i = 0; i < jsonData.getJSONArray(aoColumns.getJSONObject(0).getString("mDataProp")).size(); i++) {
			
			JSONObject tempobj=new JSONObject();
			
			for (int j = 0; j < aoColumns.size(); j++) {
				
				String tempKey=aoColumns.getJSONObject(j).getString("mDataProp");
				tempobj.put(tempKey, jsonData.getJSONArray(tempKey).get(i));
				
				
			}
			
			tableData.add(tempobj);
		}
		
		returnv.put("title", title);
		returnv.put("tableData", tableData);
		returnv.put("aoColumns", aoColumns);
		return returnv;
		
	}
	/**
	 * 
	 * @param config	json配置
	 * @param jsonData  afa平台的私有报文
	 * @return			服务端分页数据返回
	 */
	public static JSONObject getTableMsg_1(JSONObject config, JSONObject jsonData){
		JSONObject returnv = getTableMsg_0(config,jsonData);
		returnv.put("totalRecords", "50");
		return returnv;
	}
}
