package cn.com.agree.aweb.struts2.action;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.interfaces.ConfigLoader;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.DataBaseConfigLoader;
import cn.com.agree.aweb.util.GetStrutsData;
/**
 * 连接平台与返回前台需要的数据
 * @author liyuansheng  liyuansheng@agree.com.cn
 * 2016年5月19日
 *
 */
public class BaseAction extends StandardActionSupport{
	private static final long serialVersionUID = 4866481959963661268L;
	private StrutsMessage strutsMessage;
	private String reqParams;
	
	public String setBaseData() throws Exception{
		JSONObject params = (JSONObject) JSONObject.parse(reqParams);
		JSONObject msg = getMsg(params, params);
		strutsMessage = StrutsMessage.successMessage().addParameter("chartsData", msg);
		
		return SUCCESS;
	}
	private JSONObject getMsg(JSONObject params,JSONObject data) throws Exception{
		
		//拼接配置名
		String configName=params.getString("classify")+"_"+params.getString("showType")+"_"+params.getString("state");
		//获得相应的配置
		ConfigLoader loader=new DataBaseConfigLoader();
		JSONObject config = loader.ConfigReder(configName);
		
		if(params.getString("showType").equals("line")&&params.getString("state").equals("01")){
			//模拟数据
			JSONObject testData2=new JSONObject();
			JSONArray cpuNames1=new JSONArray();
			JSONArray cpuNums1=new JSONArray();
			JSONArray cpuUsed=new JSONArray();
			int random=(int) (Math.random()*10)+2;
			for(int i=0;i<random;i++){
				cpuNames1.add("cpu"+(i+1));
				cpuNums1.add(""+(int) (Math.random()*100));
				cpuUsed.add(""+(int) (Math.random()*100));
			}
			testData2.put("cpuName", cpuNames1);
			testData2.put("cpuNum", cpuNums1);
			testData2.put("cpuUsed", cpuUsed);
			//模拟数据
			return GetStrutsData.getLineMsg_01(config, testData2);
		}else if(params.getString("showType").equals("line")&&params.getString("state").equals("11")){
			//模拟数据
			JSONObject testData4=new JSONObject();
			JSONArray cpuName=new JSONArray();
			JSONArray date=new JSONArray();
			JSONArray cpuNum=new JSONArray();
			JSONArray cpuUseds=new JSONArray();
			int randoms=(int) ((Math.random()*10)+2);
			for (int i = 0; i < (int) (Math.random()*10)+1; i++) {
				for (int j = 0; j < randoms; j++) {
					cpuName.add("cpu"+(i+1));
					cpuNum.add(""+(int) (Math.random()*100));
					cpuUseds.add(""+(int) (Math.random()*100));
					date.add("2016010"+(j+1));
				}
			}
			testData4.put("cpuName", cpuName);
			testData4.put("date", date);
			testData4.put("cpuNum", cpuNum);
			testData4.put("cpuUsed", cpuUseds);
			//模拟数据
			return GetStrutsData.getLineMsg_11(config, testData4);
		}else if(params.getString("showType").equals("pie")&&params.getString("state").equals("0")){
			//模拟数据
			JSONObject testData=new JSONObject();
			int successv=(int) (Math.random()*100);
			String[] successvs={successv+""};
			String[] failv={(100-successv)+""};
			testData.put("success", successvs);
			testData.put("fail", failv);
			//模拟数据
			return GetStrutsData.getPieMsg0(config, testData);
		}else if(params.getString("showType").equals("pie")&&params.getString("state").equals("1")){
			//模拟数据
			JSONObject testData1=new JSONObject();
			JSONArray cpuNames=new JSONArray();
			JSONArray cpuNums=new JSONArray();
			for (int i = 0; i < 7; i++) {
				cpuNames.add("cpu"+(i+1));
				cpuNums.add(""+(int) (Math.random()*100));
			}
			testData1.put("cpuName", cpuNames);
			testData1.put("cpuNum", cpuNums);
			//模拟数据
			return GetStrutsData.getPieMsg1(config, testData1);
		}else if(params.getString("showType").equals("line")&&params.getString("state").equals("02")){
			//模拟数据
			JSONObject test=new JSONObject();
			JSONArray cpuNum=new JSONArray();
			cpuNum.add((int)(Math.random()*100)+1+"");
			JSONArray cpuUsed=new JSONArray();
			cpuUsed.add((int)(Math.random()*100)+1+"");
			test.put("cpuNum", cpuNum);
			test.put("cpuUsed", cpuUsed);
			//模拟数据
			return GetStrutsData.getLineMsg_02(config,test);
		}else if(params.getString("showType").equals("line")&&params.getString("state").equals("12")){
			//模拟数据
			JSONObject test=new JSONObject();
			JSONArray cpuName=new JSONArray();
			JSONArray cpuUsed=new JSONArray();
			for (int i = 0; i < 6; i++) {
				cpuUsed.add((int)(Math.random()*100)+1+"");
				cpuName.add("cpu"+(i+1));
			}
			test.put("cpuName", cpuName);
			test.put("cpuUsed", cpuUsed);
			//模拟数据
			return GetStrutsData.getLineMsg_12(config,test);
		}else if(params.getString("showType").equals("table")&&params.getString("state").equals("0")){
			//模拟数据
			JSONObject testData=new JSONObject();
			JSONArray cpuName=new JSONArray();
			JSONArray cpuUsed=new JSONArray();
			JSONArray cpuNum=new JSONArray();
			for (int i = 0; i < 20; i++) {
				cpuName.add("cpu"+(i+1));
				cpuUsed.add((int)(Math.random()*100)+"");
				cpuNum.add((int)(Math.random()*100)+"");
			}
			testData.put("cpuName", cpuName);
			testData.put("cpuUsed", cpuUsed);
			testData.put("cpuNum", cpuNum);
			//模拟数据
			return GetStrutsData.getTableMsg_0(config,testData);
		}else if(params.getString("showType").equals("table")&&params.getString("state").equals("1")){
			int pageRec=params.getInteger("iDisplayLength");
			//模拟数据
			JSONObject testData=new JSONObject();
			JSONArray cpuName=new JSONArray();
			JSONArray cpuUsed=new JSONArray();
			JSONArray cpuNum=new JSONArray();
			for (int i = 0; i < pageRec; i++) {
				cpuName.add("cpu"+(i+1));
				cpuUsed.add((int)(Math.random()*100)+"");
				cpuNum.add((int)(Math.random()*100)+"");
			}
			testData.put("cpuName", cpuName);
			testData.put("cpuUsed", cpuUsed);
			testData.put("cpuNum", cpuNum);
			//模拟数据
			return GetStrutsData.getTableMsg_1(config,testData);
		}
		return null;
		
	}
	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}
	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
	public String getReqParams() {
		return reqParams;
	}
	public void setReqParams(String reqParams) {
		this.reqParams = reqParams;
	}
}
