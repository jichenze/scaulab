package cn.com.agree.aweb.struts2.action;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.hibernate.dao.AwebUserGridVO;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

/**
 * 
 *
 * @author lihao lihao01@cfischina.com
 * Oct 21, 2015
 */
public class GridOperAction extends StandardActionSupport {
	
	private static final long serialVersionUID = -1005611096413974810L;
	
	private StrutsMessage strutsMessage;
	private String gridConf;
	
	private static final Logger log = LoggerFactory.getLogger(GridOperAction.class);
	
	/**
	 * 查询配置信息
	 * @return
	 */
	public String queryContent() {
		String username = (String) getSession().getAttribute(Constants.SESSION_USERNAME);
		try {
			AwebUserGridVO vo = (AwebUserGridVO) dbOperation.queryDataById(AwebUserGridVO.class, username);
			
			if (vo != null) {
				gridConf = vo.getGridConf();
				strutsMessage = StrutsMessage.successMessage().addParameter("gridConf", gridConf);
			} else {
				strutsMessage = StrutsMessage.successMessage().addParameter("gridConf", "");
			}
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB50, e);
			log.error("", e);
		}
		
		return SUCCESS;
	}
	
	/**
	 * 更新配置信息
	 * @return
	 */
	public String updateContent() {
		String username = (String) getSession().getAttribute(Constants.SESSION_USERNAME);
		try {
			AwebUserGridVO vo = new AwebUserGridVO();
			vo.setUsername(username);
			vo.setGridConf(gridConf);
			
			dbOperation.saveOrUpdateSingleData(vo);
			strutsMessage = StrutsMessage.successMessage();
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB50, e);
			log.error("", e);
		}
		
		return SUCCESS;
	}
	
	public String getGridConf() {
		return gridConf;
	}
	
	public void setGridConf(String gridConf) {
		this.gridConf = gridConf;
	}
	
	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}
	
	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
	
}
