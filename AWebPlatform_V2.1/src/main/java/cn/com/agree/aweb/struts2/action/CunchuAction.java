package cn.com.agree.aweb.struts2.action;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.hibernate.dao.CunchuVO;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

/**
 * 存储
 * 根据物品名称自动更新数量和时间
 */
public class CunchuAction  extends StandardActionSupport {

	private static final long serialVersionUID = 5385955825311023488L;

	private static final Logger log = LoggerFactory.getLogger(GonghuoAction.class);
	
	private String cclx;//物品类型
	private String ccName;//物品名称
	private String ccliang;//物品数量
	private String ccdw;//物品单位
	private String ccdd;//物品存储地点
	private String ccudtime;//物品最后更新时间
	
	private StrutsMessage strutsMessage;
	
	/**
	 * @Description: 获取所有存储信息
	 * 首先在双击时传递一个 物品类型参数， 从而获得输出 是哪种类型的物品（一般是“1”，有毒是“2”）
	 */
	public String loadAllCunchu(){
		try {
			Object  o = dbOperation.queryDataByClass(CunchuVO.class, "cunchu_leixing", cclx);
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("ccData", o);//把查到的 用户纪录 存储在strutsMessage 中 
		} catch (DBSupportException e) {
			log.error("加载所有存储信息",e);
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}

	public String getCclx() {
		return cclx;
	}

	public void setCclx(String cclx) {
		this.cclx = cclx;
	}

	public String getCcName() {
		return ccName;
	}

	public void setCcName(String ccName) {
		this.ccName = ccName;
	}

	public String getCcliang() {
		return ccliang;
	}

	public void setCcliang(String ccliang) {
		this.ccliang = ccliang;
	}

	public String getCcdw() {
		return ccdw;
	}

	public void setCcdw(String ccdw) {
		this.ccdw = ccdw;
	}

	public String getCcdd() {
		return ccdd;
	}

	public void setCcdd(String ccdd) {
		this.ccdd = ccdd;
	}

	public String getCcudtime() {
		return ccudtime;
	}

	public void setCcudtime(String ccudtime) {
		this.ccudtime = ccudtime;
	}

	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}

	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
	
	
}
