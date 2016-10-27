package cn.com.agree.aweb.struts2.action;

import java.sql.Date;
import java.util.List;

import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

/**
 * @author jiwenhui jiwenhui@cfischina.com
 *
 * 2016年5月26日 下午4:24:50
 */
public class EventAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6388481585549418214L;
	private String eventName;
	private String states;
	private Date last_time;
	private Date first_time;
	private String astates;
	private int id;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAstates() {
		return astates;
	}

	public void setAstates(String astates) {
		this.astates = astates;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public String getStates() {
		return states;
	}

	public void setStates(String states) {
		this.states = states;
	}

	public Date getLast_time() {
		return last_time;
	}

	public void setLast_time(Date last_time) {
		this.last_time = last_time;
	}

	public Date getFirst_time() {
		return first_time;
	}

	public void setFirst_time(Date first_time) {
		this.first_time = first_time;
	}

	private StrutsMessage strutsMessage;

	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}

	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}

	/**
	 * 加载页面
	 * @return 
	 */
	public String loadTableInfo() {

		String sql = "select channel,application_name,target_id,event_desc,last_time,type,status,id from test where astatus='0'";
		try {
			List<?> list = dbOperation.queryDataBySql(sql);
			strutsMessage = StrutsMessage.successMessage().addParameter(
					"tableInfo", list);
		} catch (DBSupportException e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**
	 * 条件查询
	 * @return
	 */
	public String query() {
		
		String sql = new String();
		StringBuffer sqlStr = new StringBuffer();
		sqlStr.append("select channel,application_name,target_id,event_desc,last_time,type,status,id from test where 1=1 and astatus='0'");
		if(eventName!=null && !eventName.equals("")){
			sqlStr.append(" and (application_name = '"+eventName+"' or target_id = '"+eventName+"' or event_desc = '"+eventName+"')");
		}
		if(last_time!=null && !last_time.equals("")){
			sqlStr.append(" and last_time <= '"+last_time+"'");
		}
		if(first_time!=null && !first_time.equals("")){
			sqlStr.append(" and last_time >= '"+first_time+"'");
		}
		if(states!=null && !states.equals("")){
			sqlStr.append(" and status = '"+states+"'");			
		}
		sql = sqlStr.toString();
	    try {
			List<?> list1 = dbOperation.queryDataBySql(sql);
			strutsMessage = StrutsMessage.successMessage().addParameter("tableInfo1", list1);
		} catch (DBSupportException e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**
	 * 受理
	 * @return
	 */
	public String deal() {

		String sql1 = "update test set status='1' where status='0' and id="+id;
		try {  
			this.dbOperation.executeSQL(sql1);
			strutsMessage = StrutsMessage.successMessage();
		} catch (DBSupportException e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**
	 * 跳转页面到代办
	 * @return
	 */
	public String change1() {

		String sql = "select channel,application_name,target_id,event_desc,last_time,type,status,astatus,id from test where astatus='1'";
		try {
			List<?> list = dbOperation.queryDataBySql(sql);
			strutsMessage = StrutsMessage.successMessage().addParameter(
					"tableInfo", list);
		} catch (DBSupportException e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**
	 * 代办页面条件查询
	 * @return
	 */
	public String query1() {
			
		String sql = new String();
		StringBuffer sqlStr = new StringBuffer();
		sqlStr.append("select channel,application_name,target_id,event_desc,last_time,type,status,astatus,id from test where 1=1 and astatus='1'");
		if(eventName!=null && !eventName.equals("")){
			sqlStr.append(" and (application_name = '"+eventName+"' or target_id = '"+eventName+"' or event_desc = '"+eventName+"')");
		}
		if(last_time!=null && !last_time.equals("")){
			sqlStr.append(" and last_time <= '"+last_time+"'");
		}
		if(first_time!=null && !first_time.equals("")){
			sqlStr.append(" and last_time >= '"+first_time+"'");
		}
		if(states!=null && !states.equals("")){
			sqlStr.append(" and status = '"+states+"'");			
		}
		sql = sqlStr.toString();
		try {
			List<?> list1 = dbOperation.queryDataBySql(sql);
				strutsMessage = StrutsMessage.successMessage().addParameter("tableInfo1", list1);
		} catch (DBSupportException e) {
				e.printStackTrace();
		}
		return SUCCESS;
		}
	
}
