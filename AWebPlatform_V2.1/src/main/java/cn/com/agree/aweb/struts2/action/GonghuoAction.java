package cn.com.agree.aweb.struts2.action;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.hibernate.dao.CunchuVO;
import cn.com.agree.aweb.hibernate.dao.GonghuoVO;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CommonUtils;

/**
 * 供货信息
 * add , loadAll
 */
public class GonghuoAction extends StandardActionSupport {
	
	private static final long serialVersionUID = -4115634323066773207L;

	private static final Logger log = LoggerFactory.getLogger(GonghuoAction.class);
	
	private String ghid;
	private String ghrname;
	private String ghtime;
	private String ghpn;
	private String ghsrname;//接收人
	private String ghwpname;
	private String ghsl;
	private String ghlx;//物品类型
	private String ghccdw;//物品存储单位
	private String ghccdd;//物品存储地点
	
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
			gh.setGonghuo_wpname(ghwpname);
			gh.setGonghuo_wplx(ghlx);
			gh.setGonghuo_ccdd(ghccdd);
			gh.setGonghuo_ccdw(ghccdw);
				
			this.dbOperation.saveSingleData(gh);
			
			//对存储信息进行保存或修改记录,  此处使用的 id 参数 是否需要与CunchuVO 的id 名称相同？
			updateCunchu();
			
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
	
	/**
	 * 更新存储信息
	 * 
	 */
	@SuppressWarnings("null")
	public void updateCunchu(){
		try {
			CunchuVO cc = (CunchuVO) this.dbOperation.queryDataById(CunchuVO.class, ghwpname);
			if(cc!=null){		//物品存在，则增加其数量，修改其更新时间
				int a= Integer.parseInt(cc.getCunchu_liang());
				int b= Integer.parseInt(ghsl);
				int count= a+b;
				String s= ""+count;//此处可能有bug
				cc.setCunchu_liang(s);
				cc.setCunchu_updatetime(CommonUtils.getNowTime());
				
			}else{		//物品不存在，则新增物品信息
				cc.setCunchu_name(ghwpname);
				cc.setCunchu_lx(ghlx);
				cc.setCunchu_liang(ghsl);
				cc.setCunchu_dw(ghccdw);
				cc.setCunchu_dd(ghccdd);
				cc.setCunchu_updatetime(CommonUtils.getNowTime());				
			}
			
			this.dbOperation.saveOrUpdateSingleData(cc);
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("cc",cc);
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			log.error("更新存储信息", strutsMessage.getErrorMsg());
		}else{
			log.info("更新存储信息",  ghwpname);
		}
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

	public String getGhsl() {
		return ghsl;
	}

	public void setGhsl(String ghsl) {
		this.ghsl = ghsl;
	}

	public String getGhwpname() {
		return ghwpname;
	}

	public void setGhwpname(String ghwpname) {
		this.ghwpname = ghwpname;
	}

	public String getGhlx() {
		return ghlx;
	}

	public void setGhlx(String ghlx) {
		this.ghlx = ghlx;
	}

	public String getGhccdw() {
		return ghccdw;
	}

	public void setGhccdw(String ghccdw) {
		this.ghccdw = ghccdw;
	}

	public String getGhccdd() {
		return ghccdd;
	}

	public void setGhccdd(String ghccdd) {
		this.ghccdd = ghccdd;
	}

	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}

	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
}
