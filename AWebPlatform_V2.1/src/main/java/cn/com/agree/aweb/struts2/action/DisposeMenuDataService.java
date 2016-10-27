package cn.com.agree.aweb.struts2.action;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

/**
 * 
 *
 * @author lihao lihao01@cfischina.com
 * Oct 15, 2015
 */
public class DisposeMenuDataService implements MenuLables {
	
	private JSONObject result;
	private JSONArray originalData;
	
	public DisposeMenuDataService(JSONArray originalData) {
		result = new JSONObject();
		this.originalData = originalData;
	}
	
	/**
	 * 
	 * @param arrayData
	 * @return
	 */
	public JSONObject disposeData() {
		
		if (originalData == null) 
			return result;
		
		initRootNode();
		disposeSubNode(result);
		
		return result;
	}
	
	/**
	 * 
	 * @param parentNode
	 */
	private void disposeSubNode(JSONObject parentNode) {
		String parentPath = parentNode.getString(LABEL_PATH);
		JSONArray children = parentNode.getJSONArray(LABEL_CHILDRENT);
		
		for (int i = 0, size = originalData.size(); i < size; i++) {
			JSONObject menuJson = originalData.getJSONObject(i);
			
			if (parentPath.equals(menuJson.getString(LABEL_PARENTPATH))) {
				menuJson.put(LABEL_CHILDRENT, new JSONArray());
				menuJson.put(LABEL_HREF, DeviceEnum.getModulePathByDevType(
						menuJson.getString(LABEL_DEVTYPE)));
				
				children.add(menuJson);
				disposeSubNode(menuJson);
			}
			
		}
	}
	
	/**
	 * 
	 */
	private void initRootNode() {
		for (int i = 0, size = originalData.size(); i < size; i++) {
			JSONObject menuJson = originalData.getJSONObject(i);
			
			if (ROOTPATH.equals(menuJson.getString(LABEL_PARENTPATH))) {
				result = menuJson;
				menuJson.put(LABEL_HREF, DeviceEnum.getModulePathByDevType(
						menuJson.getString(LABEL_DEVTYPE)));
				result.put(LABEL_CHILDRENT, new JSONArray());
				
				break;
			}
		}
	}

}
