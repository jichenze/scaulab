package cn.com.agree.aweb.struts2.action;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.agree.aweb.exception.AWebException;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.hibernate.dao.HuishouFeiyeVO;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CommonUtils;

/**
 * 处理废液回收操作
 *
 */
public class HuishouFeiyeAction extends StandardActionSupport {

	private static final long serialVersionUID = -2439085972617342997L;

private static final Logger log = LoggerFactory.getLogger(HuishouFeiyeAction.class);
	
	private String hsid;//自动使用时间作为id
	private String hswpname;//回收物品名称
	private String hsliang;//回收量
	private String hsjldanwei;//回收计量单位
	private String hsSongName;//回收送的人名称
	private String hsShouName;//回收收的人名称
	private String hsdanwei;//回收单位
	private String hsiOo;//回收进或出库
	
	private StrutsMessage strutsMessage;
	
	/**
	 * 回收列表
	 * @return
	 * @throws Throwable 
	 */
	public String loadAllFeiye()  throws AWebException {
		try {
			Object  o = dbOperation.queryAllDataByClass(HuishouFeiyeVO.class);
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("hsfyData", o);//把查到的 用户纪录 存储在strutsMessage 中 
		} catch (DBSupportException e) {
			log.error("加载所有废液回收表",e);
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 新建回收表操作
	 * @return
	 * @throws Throwable 
	 */
	public String addHuishou() {
		try {
				HuishouFeiyeVO hs= new HuishouFeiyeVO();
				
				//设置属性名和 表中的 name属性 值 相同，录入数据
				this.setHsid(CommonUtils.getNowTime());
				hs.setHuishou_id(hsid);
				hs.setHuishou_wpName(hswpname);
				hs.setHuishou_liang(hsliang);
				hs.setHuishou_jldanwei(hsjldanwei);
				hs.setHuishou_inORout(hsiOo);
				hs.setHuishou_songName(hsSongName);
				hs.setHuishou_shouName(hsShouName);
				hs.setHuishou_danwei(hsdanwei);
				
				//this.dbOperation.saveSingleData(cg);
				this.dbOperation.saveOrUpdateSingleData(hs);
//				System.out.println(hsiOo);
//				if(hsiOo.equals("yes"))
//						updateCunchu();
				
				strutsMessage = StrutsMessage.successMessage();
				strutsMessage.addParameter("hs",hs);
			} catch (DBSupportException e) {
				strutsMessage = StrutsMessage.errorMessage(e.getMessage());
			}
		
		return SUCCESS;
	}


	public String getHsid() {
		return hsid;
	}


	public void setHsid(String hsid) {
		this.hsid = hsid;
	}


	public String getHswpname() {
		return hswpname;
	}


	public void setHswpname(String hswpname) {
		this.hswpname = hswpname;
	}


	public String getHsliang() {
		return hsliang;
	}


	public void setHsliang(String hsliang) {
		this.hsliang = hsliang;
	}


	public String getHsjldanwei() {
		return hsjldanwei;
	}


	public void setHsjldanwei(String hsjldanwei) {
		this.hsjldanwei = hsjldanwei;
	}


	public String getHsSongName() {
		return hsSongName;
	}


	public void setHsSongName(String hsSongName) {
		this.hsSongName = hsSongName;
	}


	public String getHsShouName() {
		return hsShouName;
	}


	public void setHsShouName(String hsShouName) {
		this.hsShouName = hsShouName;
	}


	public String getHsdanwei() {
		return hsdanwei;
	}


	public void setHsdanwei(String hsdanwei) {
		this.hsdanwei = hsdanwei;
	}


	public String getHsiOo() {
		return hsiOo;
	}


	public void setHsiOo(String hsiOo) {
		this.hsiOo = hsiOo;
	}


	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}


	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
}
