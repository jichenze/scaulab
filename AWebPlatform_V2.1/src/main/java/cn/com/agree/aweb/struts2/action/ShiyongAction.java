package cn.com.agree.aweb.struts2.action;

import java.io.Serializable;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.agree.aweb.exception.AWebException;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.hibernate.dao.YuyueVO;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CommonUtils;

/**
 * 处理用户使用操作
 * 
 */
public class ShiyongAction  extends StandardActionSupport {

	private static final long serialVersionUID = -1184260097560420240L;
	
	private static final Logger log = LoggerFactory.getLogger(ShiyongAction.class);

	private StrutsMessage strutsMessage;
	
	private String syid;
	private String syname;
	private String sypid;
	private String synumber;
	private String sywpname;
	private String sylx;//预约类型
	private String sywpsl;
	private String syjldw;//计量单位
	private String syyy;//预约原因
	private String syyn;//审核是否通过
	private String syshyy;//审核原因
	
	/**
	 * 预约操作
	 * @return
	 * @throws Throwable 
	 */
	public String shenQing() {
		try {
				YuyueVO yy= new YuyueVO();
				
				//设置属性名和 表中的 name属性 值 相同，录入数据
				this.setSyid(CommonUtils.getNowTime());
				yy.setYuyue_id(syid);
				yy.setYuyue_name(syname);
				yy.setYuyue_rid(sypid);
				yy.setYuyue_pn(synumber);
				yy.setYuyue_wpname(sywpname);
				yy.setYuyue_leixing(sylx);
				yy.setYuyue_sl(sywpsl);
				yy.setYuyue_jldanwei(syjldw);//计量单位
				yy.setYuyue_yy(syyy);
				
				//this.dbOperation.saveSingleData(yy);
				this.dbOperation.saveOrUpdateSingleData(yy);
				strutsMessage = StrutsMessage.successMessage();
				strutsMessage.addParameter("yy",yy);
			} catch (DBSupportException e) {
				strutsMessage = StrutsMessage.errorMessage(e.getMessage());
			}
		
		return SUCCESS;
	}
	
	/**
	 * 预约列表
	 * @return
	 * @throws Throwable 
	 */
	public String loadAllYuyue()  throws AWebException {
		try {
			Object  o = dbOperation.queryAllDataByClass(YuyueVO.class);
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("yyData", o);//把查到的预约纪录 存储在strutsMessage 中 
		} catch (DBSupportException e) {
			log.error("加载所有预约单",e);
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 审核表
	 * @return
	 * @throws Throwable 
	 */
	public String shenHe() throws AWebException {
		try {
			YuyueVO yy= (YuyueVO)this.dbOperation.queryDataById
										(YuyueVO.class, syid);
			
			if(yy != null){
				yy.setYuyue_yn(syyn);
				if(syyn.equals("no")){
					yy.setYuyueshenhe_yy(syyn);
				}
				
				this.dbOperation.updateSingleData(yy);
				strutsMessage = StrutsMessage.successMessage();
				strutsMessage.addParameter("yy",yy);
			}else{
				strutsMessage = StrutsMessage.errorMessage("预约单不存在！");
			}
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			log.error("审核预约单", strutsMessage.getErrorMsg());
		}else{
			log.info("审核预约单",  syid);
		}
		return SUCCESS;
	}

	
	public String getSyid() {
		return syid;
	}

	public void setSyid(String syid) {
		this.syid = syid;
	}

	public String getSyname() {
		return syname;
	}

	public void setSyname(String syname) {
		this.syname = syname;
	}

	public String getSypid() {
		return sypid;
	}

	public void setSypid(String sypid) {
		this.sypid = sypid;
	}

	public String getSynumber() {
		return synumber;
	}

	public void setSynumber(String synumber) {
		this.synumber = synumber;
	}

	public String getSywpname() {
		return sywpname;
	}

	public void setSywpname(String sywpname) {
		this.sywpname = sywpname;
	}

	public String getSywpsl() {
		return sywpsl;
	}

	public void setSywpsl(String sywpsl) {
		this.sywpsl = sywpsl;
	}

	public String getSyyn() {
		return syyn;
	}

	public void setSyyn(String syyn) {
		this.syyn = syyn;
	}

	public String getSyyy() {
		return syyy;
	}

	public void setSyyy(String syyy) {
		this.syyy = syyy;
	}

	public String getSylx() {
		return sylx;
	}

	public void setSylx(String sylx) {
		this.sylx = sylx;
	}

	public String getSyjldw() {
		return syjldw;
	}

	public void setSyjldw(String syjldw) {
		this.syjldw = syjldw;
	}

	public String getSyshyy() {
		return syshyy;
	}

	public void setSyshyy(String syshyy) {
		this.syshyy = syshyy;
	}

	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}
	
	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
}
