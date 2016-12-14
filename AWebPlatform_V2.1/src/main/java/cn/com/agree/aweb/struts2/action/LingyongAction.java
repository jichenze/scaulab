package cn.com.agree.aweb.struts2.action;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.hibernate.dao.CunchuVO;
import cn.com.agree.aweb.hibernate.dao.LingyongVO;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CommonUtils;

/**
 * 处理用户领用操作
 * add , loadAll
 */
public class LingyongAction extends StandardActionSupport {

	private static final long serialVersionUID = -7427879022589051936L;

	private static final Logger log = LoggerFactory.getLogger(LingyongAction.class);
	
	private String lyid;
	private String lywpName;//物品名称
	private String lywplx;//物品类型
	private String lysl;//数量
	private String lyjldw;//计量单位
	private String lyrname;//领用人
	private String lyrid;//领用人id
	private String lyrpn;//领用人联系方式
	private String lyrname2;
	private String lyrid2;
	private String lyrpn2;
	private String lyyyYN;//是否预约
	private String lyfName;//发放人
	
	private StrutsMessage strutsMessage;
	
	/**
	 * @Description: 获取所有领用信息
	 * 
	 */
	public String loadAllLingyong(){
		try {
			Object  o = dbOperation.queryAllDataByClass(LingyongVO.class);
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("lyData", o);//把查到的 领用纪录 存储在strutsMessage 中 
		} catch (DBSupportException e) {
			log.error("加载所有领用信息",e);
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 添加领用信息
	 * @return
	 */
	public String doAddLingyong(){
		try {
			LingyongVO ly= new LingyongVO();
			
			//设置属性名和 表中的 name属性 值 相同，录入数据
			this.setLyid(CommonUtils.getNowTime());
			ly.setLingyong_id(lyid);
			ly.setLingyong_wpName(lywpName);
			ly.setLingyong_wpleixing(lywplx);
			ly.setLingyong_sl(lysl);
			ly.setLingyong_jldanwei(lyjldw);
			ly.setLingyong_renName(lyrname);
			ly.setLingyong_renID(lyrid);
			ly.setLingyong_phNumber(lyrpn);
			ly.setLingyong_renName2(lyrname2);
			ly.setLingyong_renID2(lyrid2);
			ly.setLingyong_phNumber2(lyrpn2);
			ly.setLingyong_yyYN(lyyyYN);
			ly.setLingyong_frName(lyfName);
				
			this.dbOperation.saveSingleData(ly);
			
			//对存储信息进行保存或修改记录,  此处使用的 id 参数 是否需要与CunchuVO 的id 名称相同？
			updateCunchu();
			
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("ly",ly);
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			log.error("创建领用信息", strutsMessage.getErrorMsg());
		}else{
			log.info("创建领用信息",  lyid);
		}
		return SUCCESS;
	}
	
	/**
	 * 更新存储信息
	 * 暂时不确定是否要有数量不足的弹框提示，此处和 供货不同
	 * @return
	 */
	public boolean updateCunchu(){
		try {
			CunchuVO cc = (CunchuVO) this.dbOperation.queryDataById(CunchuVO.class, lywpName);
			if(cc!=null){		//物品存在，则减少其数量，修改其更新时间
				int a= Integer.parseInt(cc.getCunchu_liang());
				int b= Integer.parseInt(lysl);
				if(a>=b){
					int count= a-b;
					String s= ""+count;//此处可能有bug
					cc.setCunchu_liang(s);
					cc.setCunchu_updatetime(CommonUtils.getNowTime());
					
					this.dbOperation.saveOrUpdateSingleData(cc);
					strutsMessage = StrutsMessage.successMessage();
					strutsMessage.addParameter("cc",cc);
					
					return true;
				}else{
					strutsMessage = StrutsMessage.errorMessage("物品数量不足！");
					return false;
				}				
			}else{
				strutsMessage = StrutsMessage.errorMessage("物品不存在！");		
				return false;
			}			
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			log.error("更新存储信息", strutsMessage.getErrorMsg());
		}else{
			log.info("更新存储信息",  lywpName);
		}
		
		return true;
	}

	public String getLyid() {
		return lyid;
	}

	public void setLyid(String lyid) {
		this.lyid = lyid;
	}

	public String getLywpName() {
		return lywpName;
	}

	public void setLywpName(String lywpName) {
		this.lywpName = lywpName;
	}

	public String getLywplx() {
		return lywplx;
	}

	public void setLywplx(String lywplx) {
		this.lywplx = lywplx;
	}

	public String getLysl() {
		return lysl;
	}

	public void setLysl(String lysl) {
		this.lysl = lysl;
	}

	public String getLyjldw() {
		return lyjldw;
	}

	public void setLyjldw(String lyjldw) {
		this.lyjldw = lyjldw;
	}

	public String getLyrname() {
		return lyrname;
	}

	public void setLyrname(String lyrname) {
		this.lyrname = lyrname;
	}

	public String getLyrid() {
		return lyrid;
	}

	public void setLyrid(String lyrid) {
		this.lyrid = lyrid;
	}

	public String getLyrpn() {
		return lyrpn;
	}

	public void setLyrpn(String lyrpn) {
		this.lyrpn = lyrpn;
	}

	public String getLyrname2() {
		return lyrname2;
	}

	public void setLyrname2(String lyrname2) {
		this.lyrname2 = lyrname2;
	}

	public String getLyrid2() {
		return lyrid2;
	}

	public void setLyrid2(String lyrid2) {
		this.lyrid2 = lyrid2;
	}

	public String getLyrpn2() {
		return lyrpn2;
	}

	public void setLyrpn2(String lyrpn2) {
		this.lyrpn2 = lyrpn2;
	}

	public String getLyyyYN() {
		return lyyyYN;
	}

	public void setLyyyYN(String lyyyYN) {
		this.lyyyYN = lyyyYN;
	}

	public String getLyfName() {
		return lyfName;
	}

	public void setLyfName(String lyfName) {
		this.lyfName = lyfName;
	}

	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}

	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
}
