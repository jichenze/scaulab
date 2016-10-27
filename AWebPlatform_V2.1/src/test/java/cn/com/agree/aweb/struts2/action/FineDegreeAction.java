package cn.com.agree.aweb.struts2.action;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.hibernate.dao.FineDegreeVo;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CommonUtils;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

 
/**
* @ClassName: FineDegreeAction
* @Description: 健康度开发页面action
* @author mailikuan@office.cgbchina
* @date 2016年5月26日 下午4:28:38
*
*/
public class FineDegreeAction extends StandardActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3967419208319187857L;
	 

	private StrutsMessage strutsMessage;

	private String userId;
	
	private String systemName;
	
    private String searchText;
    
	@SuppressWarnings("unchecked")
	public String loadFine() throws DBSupportException {
		System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
		/*
		 * String string="{\ "content\":{ public_rsp:{'querystatus
		 * ':'1','errorcode ':'000000','errormsg ':'查询成功',' totalrownum ':'2',
		 * 'totalpagenum ':'1','nowpagenum ':'1', ,'pagerownum ':'2'},
		 * private_rsp:{‘中间’：{健康度：50，中间：2，应用：5，。。。}，‘’：{}} }, "errorMsg":null,
		 * "errorMsgList":null, "status":true }";
		 */
		JSONArray data = new JSONArray();
		JSONArray sortedJsonArray = new JSONArray();
		for (int i = 0; i < 5; i++) {
			String str = "{\"systemName\":\"cpu" + (i + 1) + "\",\"fine\":\""+20+ "\"," + "\"a\":\""
					+ 1 + "\",\"b\":\"" + 1 + "\",\"c\":\"" + 2 + "\",\"d\":\""
					+ 2 + "\"}";
			JSONObject object = JSONObject.parseObject(str);
			data.add(object);

		}
		 
		List<JSONObject>  jsonValues = new ArrayList<JSONObject>();
         
		for (int i = 0; i < data.size(); i++) {
			 List<FineDegreeVo>fineVOs=(List<FineDegreeVo>) this.dbOperation.queryDataByClass(FineDegreeVo.class,"SYSTEMNAME",data.getJSONObject(i).get("systemName"));
			if (fineVOs.size()<1) {
				 data.getJSONObject(i).put("liked","false");
			}else {
				 data.getJSONObject(i).put("liked","true");
			}
		   
			jsonValues.add(data.getJSONObject(i));
		}
		System.out.println(jsonValues.toString());
	 /*	for (int i = 0; i < jsonValues.size(); i++) {
			for (int j = 0; j < jsonValues.size()-i-1; j++) {
				int left=Integer.parseInt(jsonValues.get(j).getString("fine"));
				int right=Integer.parseInt(jsonValues.get(j+1).getString("fine"));
				if (left > right ) {
					 JSONObject jsonObject = jsonValues.get(j);
					 
				}
			}
		} */
		// 使用java 自带集合排序接口 进行排序
		  Collections.sort(jsonValues, new Comparator<JSONObject>() {
			private static final String KEY_NAME = "fine";
			private static final String KEY_FINE = "liked";
			@Override
			public int compare(JSONObject a, JSONObject b) {
				int	valA =  Integer.parseInt(a.getString(KEY_NAME));
				int	valB = Integer.parseInt(b.getString(KEY_NAME));
				String valA1 = a.getString(KEY_FINE);
				String valB1 = b.getString(KEY_FINE);
				System.out.println(valA1);
				System.out.println(valB1);
				 
				if (valA > valB) {
					return 1;
				}else if (valA < valB) {
					return -1;
				}else {
					if (valA1.trim().equals("true")&& valB1.trim().equals("false")) {
						System.out.println("不换"); 
						return -1;
					}else{ 
						System.out.println("换");
					return 0;
					}
				}
			}
		});  
		// 重新转换成json 数组,返回页面，易于解析
		for (int i = 0; i < jsonValues.size(); i++) {
			sortedJsonArray.add(jsonValues.get(i));
		}

		System.out.println(sortedJsonArray.toString());
		strutsMessage = StrutsMessage.successMessage().addParameter("fineData",
				sortedJsonArray);
		return SUCCESS;
	}
     
    @SuppressWarnings("unchecked")
	public String fineCollect() throws DBSupportException{
 	   String nowUserName = (String) getSession().getAttribute(Constants.SESSION_USERNAME);
 	 //  List<FineVO>fineVOs=(List<FineVO>) this.dbOperation.queryDataByClass(FineVO.class,"SYSTEMNAME",systemName);
 	  FineDegreeVo fineVO=new FineDegreeVo();
 	   fineVO.setSystemName(systemName);
 	   fineVO.setUserId(nowUserName);
 	   this.dbOperation.saveOrUpdateSingleData(fineVO);
 	   
 	   strutsMessage=StrutsMessage.successMessage().addParameter("iscollect", true);
 	   return SUCCESS;
    }
    
   public String fineCancle() throws DBSupportException{
	  // String nowUserName = (String) getSession().getAttribute(Constants.SESSION_USERNAME);
	   @SuppressWarnings("unchecked")
	   List<FineDegreeVo>fineVOs=(List<FineDegreeVo>) this.dbOperation.queryDataByClass(FineDegreeVo.class,"SYSTEMNAME",systemName);
       for (FineDegreeVo fineVO:fineVOs) {
		if (fineVO.getSystemName().trim().equals(systemName)) {
			this.dbOperation.deleteSingleData(fineVO);
		}
	    
       }
	   //strutsMessage=StrutsMessage.successMessage().addParameter(key, value);
	   return SUCCESS;
   }
   
   @SuppressWarnings("unchecked")
public String searchFine() throws DBSupportException{
	   JSONArray data = new JSONArray();
		JSONArray sortedJsonArray = new JSONArray();
		for (int i = 0; i < 5; i++) {
			String str = "{\"systemName\":\"cpu" + (i + 1) + "\",\"fine\":\""+20+ "\"," + "\"a\":\""
					+ 1 + "\",\"b\":\"" + 1 + "\",\"c\":\"" + 2 + "\",\"d\":\""
					+ 2 + "\"}";
			JSONObject object = JSONObject.parseObject(str);
			data.add(object);

		}
		 
		List<JSONObject>  jsonValues = new ArrayList<JSONObject>();
        
		for (int i = 0; i < data.size(); i++) {
			 List<FineDegreeVo>fineVOs=(List<FineDegreeVo>) this.dbOperation.queryDataByClass(FineDegreeVo.class,"SYSTEMNAME",data.getJSONObject(i).get("systemName"));
			if (fineVOs.size()<1) {
				 data.getJSONObject(i).put("liked","false");
			}else {
				 data.getJSONObject(i).put("liked","true");
			}
			
		    if (data.getJSONObject(i).getString("systemName").contains(searchText)) {
		    	jsonValues.add(data.getJSONObject(i));
			}
			
		}
		System.out.println(jsonValues.toString());
	 /*	for (int i = 0; i < jsonValues.size(); i++) {
			for (int j = 0; j < jsonValues.size()-i-1; j++) {
				int left=Integer.parseInt(jsonValues.get(j).getString("fine"));
				int right=Integer.parseInt(jsonValues.get(j+1).getString("fine"));
				if (left > right ) {
					 JSONObject jsonObject = jsonValues.get(j);
					 
				}
			}
		} */
		// 使用java 自带集合排序接口 进行排序
		  Collections.sort(jsonValues, new Comparator<JSONObject>() {
			private static final String KEY_NAME = "fine";
			private static final String KEY_FINE = "liked";
			@Override
			public int compare(JSONObject a, JSONObject b) {
				int	valA =  Integer.parseInt(a.getString(KEY_NAME));
				int	valB = Integer.parseInt(b.getString(KEY_NAME));
				String valA1 = a.getString(KEY_FINE);
				String valB1 = b.getString(KEY_FINE);
				if (valA > valB) {
					return 1;
				}else if (valA < valB) {
					return -1;
				}else {
					if (valA1.trim().equals("true")&& valB1.trim().equals("false")) {
						 return -1;	
					}else{ 
					return 0;
					}
				}
			}
		});  
		// 重新转换成json 数组,返回页面，易于解析
		for (int i = 0; i < jsonValues.size(); i++) {
			sortedJsonArray.add(jsonValues.get(i));
		}

		System.out.println(sortedJsonArray.toString());
		strutsMessage = StrutsMessage.successMessage().addParameter("fineData",
				sortedJsonArray);
		return SUCCESS;
   }
	
	
	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}


	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getSystemName() {
		return systemName;
	}

	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}

	public String getSearchText() {
		return searchText;
	}

	public void setSearchText(String searchText) {
		this.searchText = searchText;
	}
	
	 
}