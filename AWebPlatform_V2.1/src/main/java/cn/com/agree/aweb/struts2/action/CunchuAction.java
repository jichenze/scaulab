package cn.com.agree.aweb.struts2.action;

import java.io.Serializable;
import java.util.List;

import cn.com.agree.aweb.exception.AWebException;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.hibernate.dao.CunchuVO;
import cn.com.agree.aweb.hibernate.dao.GonghuoVO;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

/**
 * 存储
 * 只是查询 findAll
 */
public class CunchuAction  extends StandardActionSupport {

	private static final long serialVersionUID = 8107698908608602626L;
	private CunchuVO gh= new CunchuVO();
	private StrutsMessage strutsMessage;
	
	
	
	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}
	
	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
}
