package cn.com.agree.aweb.struts2.action;

import java.io.Serializable;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.exception.AWebException;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.hibernate.dao.AWebUserVO;
import cn.com.agree.aweb.hibernate.dao.GonghuoVO;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CommonUtils;
import cn.com.agree.aweb.util.DES;

/**
 * 供货信息增加与查询
 * add , findAll
 */
public class GonghuoAction extends StandardActionSupport {
	
	private static final long serialVersionUID = -4115634323066773207L;

	private static final Logger log = LoggerFactory.getLogger(GonghuoAction.class);
	
	private String ghid;
	private String ghrname;
	private String ghtime;
	private String ghpn;
	private String ghsrname;
	private String ghname;
	private String ghsl;
	
	private StrutsMessage strutsMessage;
	
	/**
	 * @Description: 获取所有供货信息
	 * 
	 */
	public String loadAllGonghuo(){
		try {
			Object  o = dbOperation.queryAllDataByClass(GonghuoVO.class);
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("ghData", o);//把查到的 用户纪录 存储在strutsMessage 中 
		} catch (DBSupportException e) {
			log.error("加载所有供货信息",e);
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 添加供货信息
	 * @return
	 */
	public String doAddGonghuo(){
		try {
			GonghuoVO gh= new GonghuoVO();
			
			gh.setGonghuo_id(ghid);
			gh.setGonghuo_fname(ghrname);
			gh.setGonghuo_time(ghtime);
			gh.setGonghuo_phone(ghpn);
			gh.setGonghuo_sname(ghsrname);
			gh.setGonghuo_sl(ghsl);
			gh.setGonghuo_name(ghname);
				
			this.dbOperation.saveSingleData(gh);
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("gh",gh);
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			log.error("创建供货信息", strutsMessage.getErrorMsg());
		}else{
			log.info("创建供货信息",  ghid);
		}
		return SUCCESS;
	}

	public String getGhid() {
		return ghid;
	}

	public void setGhid(String ghid) {
		this.ghid = ghid;
	}

	public String getGhrname() {
		return ghrname;
	}

	public void setGhrname(String ghrname) {
		this.ghrname = ghrname;
	}

	public String getGhtime() {
		return ghtime;
	}

	public void setGhtime(String ghtime) {
		this.ghtime = ghtime;
	}

	public String getGhpn() {
		return ghpn;
	}

	public void setGhpn(String ghpn) {
		this.ghpn = ghpn;
	}

	public String getGhsrname() {
		return ghsrname;
	}

	public void setGhsrname(String ghsrname) {
		this.ghsrname = ghsrname;
	}

	public String getGhname() {
		return ghname;
	}

	public void setGhname(String ghname) {
		this.ghname = ghname;
	}

	public String getGhsl() {
		return ghsl;
	}

	public void setGhsl(String ghsl) {
		this.ghsl = ghsl;
	}

	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}

	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
}
