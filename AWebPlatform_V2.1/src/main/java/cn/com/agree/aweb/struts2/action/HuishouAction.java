package cn.com.agree.aweb.struts2.action;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.agree.aweb.exception.AWebException;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.hibernate.dao.CunchuVO;
import cn.com.agree.aweb.hibernate.dao.HuishouVO;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CommonUtils;

/**
 * 处理用户回收操作
 *
 */
public class HuishouAction extends StandardActionSupport {

	private static final long serialVersionUID = 544148222215313800L;
	
	private static final Logger log = LoggerFactory.getLogger(HuishouAction.class);
	
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
	public String loadAllShenqing()  throws AWebException {
		try {
			Object  o = dbOperation.queryAllDataByClass(HuishouVO.class);
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("hsData", o);//把查到的 用户纪录 存储在strutsMessage 中 
		} catch (DBSupportException e) {
			log.error("加载所有回收表",e);
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
				HuishouVO hs= new HuishouVO();
				
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
				if(hsiOo.equals("yes"))
						updateCunchu();
				
				strutsMessage = StrutsMessage.successMessage();
				strutsMessage.addParameter("hs",hs);
			} catch (DBSupportException e) {
				strutsMessage = StrutsMessage.errorMessage(e.getMessage());
			}
		
		return SUCCESS;
	}
	
	/**
	 * 更新存储信息
	 * @return
	 */
	public void updateCunchu(){
		try {
			CunchuVO cc = (CunchuVO) this.dbOperation.queryDataById(CunchuVO.class, hswpname);
			if(cc!=null){		//物品存在，则增加其数量，修改其更新时间
				int a= Integer.parseInt(cc.getCunchu_liang());
				int b= Integer.parseInt(hsliang);
				int count= a+b;
				String s= ""+count;//此处可能有bug
				cc.setCunchu_liang(s);
				cc.setCunchu_updatetime(CommonUtils.getNowTime());
				
				this.dbOperation.saveOrUpdateSingleData(cc);
				strutsMessage = StrutsMessage.successMessage();
				strutsMessage.addParameter("cc",cc);
				
			}else{		//
				strutsMessage = StrutsMessage.errorMessage("物品不存在！");				
			}
			
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			log.error("更新存储信息", strutsMessage.getErrorMsg());
		}else{
			log.info("更新存储信息",  hswpname);
		}
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
