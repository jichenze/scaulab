package cn.com.agree.aweb.struts2.action;

import java.util.ArrayList;
import java.util.List;

import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.hibernate.dao.MonitorVO;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

import com.aim.alibaba.fastjson.JSONObject;

public class QueryMonitorAction extends StandardActionSupport{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	String group_name1[];
	String group_close_num1[];
	String group_unclose_num1[];
	String close_num1;
	String unclose_num1;
	
	String group_name2[];
	String group_close_num2[];
	String group_unclose_num2[];
	String close_num2;
	String unclose_num2;
	
	String group_name3[];
	String group_close_num3[];
	String group_unclose_num3[];
	String close_num3;
	String unclose_num3;

	
	private StrutsMessage strutsMessage;
	public String loadDataInfo(){
		JSONObject jObject = new JSONObject();
		List<String[]> list = new ArrayList<String[]>();
		
		
		String sql = "select * from aweb_monitor_infoquery where query_flag = '1'";
		try {
			@SuppressWarnings("unchecked")
			List<MonitorVO> list1 = (List<MonitorVO>) dbOperation.queryAllDataByClass(MonitorVO.class);//获取对应数据库所有数据
			
			for(MonitorVO m:list1){
				
				if("监控工单".equals(m.getDetail_arr())){
					group_name1 = m.getGroup_name().split(",");
					group_close_num1 = m.getGroup_close_num().split(",");
					group_unclose_num1 = m.getGroup_unclose_num().split(",");
					close_num1 = m.getClose_num();
					unclose_num1 = m.getUnclose_num();
				}
				if("服务工单".equals(m.getDetail_arr())){
					group_name2 = m.getGroup_name().split(",");
					group_close_num2 = m.getGroup_close_num().split(",");
					group_unclose_num2 = m.getGroup_unclose_num().split(",");
					close_num2 = m.getClose_num();
					unclose_num2 = m.getUnclose_num();
				}
				if("事件工单".equals(m.getDetail_arr())){
					group_name3 = m.getGroup_name().split(",");
					group_close_num3 = m.getGroup_close_num().split(",");
					group_unclose_num3 = m.getGroup_unclose_num().split(",");
					close_num3 = m.getClose_num();
					unclose_num3 = m.getUnclose_num();
				}
			}
		} catch (DBSupportException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
//		String group_name[] = {"工单1","工单2","工单3","工单4","工单5","工单6"};  //分组名
//		String group_close_num[]={"12","2","34","5","21","2"};     //未处理工单
//		String group_unclose_num[]={"14","43","25","19","3","90"};   //已处理工单数
		
		
		list.add(group_unclose_num1);
		list.add(group_close_num1);
		list.add(group_unclose_num2);
		list.add(group_close_num2);
		list.add(group_unclose_num3);
		list.add(group_close_num3);
		
		jObject.put("group_name1", group_name1);
		jObject.put("close_num1",close_num1);
		jObject.put("unclose_num1",unclose_num1);
		jObject.put("group_name2", group_name2);
		jObject.put("close_num2",close_num2);
		jObject.put("unclose_num2",unclose_num2);
		jObject.put("group_name3", group_name3);
		jObject.put("close_num3",close_num3);
		jObject.put("unclose_num3",unclose_num3);

		strutsMessage = StrutsMessage.successMessage().addParameter("jObject", jObject).addParameter("list", list);
		return SUCCESS;
	}
	
	
	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}
	public static void main(String[] args) {
		new QueryMonitorAction().loadDataInfo();
	}
}	
