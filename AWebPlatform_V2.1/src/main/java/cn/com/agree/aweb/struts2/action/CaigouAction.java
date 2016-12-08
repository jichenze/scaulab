package cn.com.agree.aweb.struts2.action;

import java.io.Serializable;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.agree.aweb.exception.AWebException;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.hibernate.dao.AWebUserVO;
import cn.com.agree.aweb.hibernate.dao.CaigouVO;
import cn.com.agree.aweb.platform.access.UserManagerAction;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CommonUtils;

/**
 * 处理用户采购操作
 *
 */
public class CaigouAction extends StandardActionSupport {
	
	private static final long serialVersionUID = -6127679625394328088L;
	
	private static final Logger log = LoggerFactory.getLogger(CaigouAction.class);
	
	private String cgid;
	private String cgname;
	private String cgpid;
	private String cgnumber;
	private String cgwpname;
	private String cgwpsl;
	private String cgyy;
	private String cgyn;
	private String cgpl;
	private String cgdate;
	private String cgshyy;
	
	private StrutsMessage strutsMessage;
	
	/**
	 * 申请录入操作
	 * @return
	 * @throws Throwable 
	 */
	public String shenQing() {
		try {
				CaigouVO cg= new CaigouVO();
				
				//设置属性名和 表中的 name属性 值 相同，录入数据
				this.setCgid(CommonUtils.getNowTime());
				cg.setCaigou_id(cgid);
				cg.setCaigou_name(cgname);
				cg.setCaigou_pid(cgpid);
				cg.setCaigou_pn(cgnumber);
				cg.setCaigou_hxn(cgwpname);
				cg.setCaigou_sl(cgwpsl);
				cg.setCaigou_yy(cgyy);
				
				//this.dbOperation.saveSingleData(cg);
				this.dbOperation.saveOrUpdateSingleData(cg);
				strutsMessage = StrutsMessage.successMessage();
				strutsMessage.addParameter("cg",cg);
			} catch (DBSupportException e) {
				strutsMessage = StrutsMessage.errorMessage(e.getMessage());
			}
		
		return SUCCESS;
	}
	
	
	/**
	 * 申请审核操作
	 * 
	 * 首先是“查询展示申请的信息”， 然后插入 “审核”信息。
	 * @return
	 * @throws Throwable 
	 */
	@SuppressWarnings("unchecked")
//	public List<CaigouShenqingVO> findAllShenqing()  throws AWebException {
//		List<CaigouShenqingVO> sqList= null;
//		try {
//			sqList = (List<CaigouShenqingVO>)this.dbOperation.queryAllDataByClass
//										(CaigouShenqingVO.class);
//			
//			if(sqList.size() >=1)
//				return sqList;
//		} catch (DBSupportException e) {
//			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
//			handleException(ExceptionTypes.AWEB.AWEB50, e);
//		}
//		
//		return null;
//	}
	
	/**
	 * 采购列表
	 * @return
	 * @throws Throwable 
	 */
	public String loadAllShenqing()  throws AWebException {
		try {
			Object  o = dbOperation.queryAllDataByClass(CaigouVO.class);
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("sqData", o);//把查到的 用户纪录 存储在strutsMessage 中 
		} catch (DBSupportException e) {
			log.error("加载所有申请单",e);
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
			CaigouVO cg= (CaigouVO)this.dbOperation.queryDataById
										(CaigouVO.class, cgid);
			
			if(cg != null){
				cg.setCaigou_yn(cgyn);
				if(cgyn=="yes"){
					cg.setCaigou_pl(cgpl);
					cg.setCaigou_date(cgdate);
				}else{
					cg.setCaigoushenhe_yy(cgshyy);
				}
				
				this.dbOperation.updateSingleData(cg);
				strutsMessage = StrutsMessage.successMessage();
				strutsMessage.addParameter("cg",cg);
			}else{
				strutsMessage = StrutsMessage.errorMessage("申请表不存在！");
			}
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			log.error("审核采购表", strutsMessage.getErrorMsg());
		}else{
			log.info("审核采购表",  cgid);
		}
		return SUCCESS;
	}
	

	public String getCgid() {
		return cgid;
	}


	public void setCgid(String cgid) {
		this.cgid = cgid;
	}


	public String getCgname() {
		return cgname;
	}


	public void setCgname(String cgname) {
		this.cgname = cgname;
	}


	public String getCgpid() {
		return cgpid;
	}


	public void setCgpid(String cgpid) {
		this.cgpid = cgpid;
	}


	public String getCgnumber() {
		return cgnumber;
	}


	public void setCgnumber(String cgnumber) {
		this.cgnumber = cgnumber;
	}


	public String getCgwpname() {
		return cgwpname;
	}


	public void setCgwpname(String cgwpname) {
		this.cgwpname = cgwpname;
	}


	public String getCgwpsl() {
		return cgwpsl;
	}


	public void setCgwpsl(String cgwpsl) {
		this.cgwpsl = cgwpsl;
	}


	public String getCgyy() {
		return cgyy;
	}


	public void setCgyy(String cgyy) {
		this.cgyy = cgyy;
	}


	public String getCgyn() {
		return cgyn;
	}


	public void setCgyn(String cgyn) {
		this.cgyn = cgyn;
	}


	public String getCgpl() {
		return cgpl;
	}


	public void setCgpl(String cgpl) {
		this.cgpl = cgpl;
	}


	public String getCgdate() {
		return cgdate;
	}


	public void setCgdate(String cgdate) {
		this.cgdate = cgdate;
	}


	public String getCgshyy() {
		return cgshyy;
	}


	public void setCgshyy(String cgshyy) {
		this.cgshyy = cgshyy;
	}


	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}


	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
}
