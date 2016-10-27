package cn.com.agree.aweb.struts2.action.support;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.slf4j.Logger;

import cn.com.agree.aweb.exception.AWebException;
import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.hibernate.dao.support.StandardDbSupport;

import com.opensymphony.xwork2.ActionSupport;


/**
 * 为action增加Hibernate支持，提供部分常用方法
 *
 * @author lihao lihao01@cfischina.com
 * Jul 23, 2015
 */
public class StandardActionSupport extends ActionSupport {

	private static final long serialVersionUID = 2386522933505206017L;
	
	/**
	 * Hibernate Support
	 * 
	 * spring注入
	 */
	protected StandardDbSupport dbOperation;
	
	/**
	 * 获取HttpServletRequest
	 * @return
	 */
	protected HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}
	
	/**
	 * 获取HttpServletResponse
	 * @return
	 */
	protected HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}
	
	/**
	 * 获取本次会话HttpSession
	 * @return
	 */
	protected HttpSession getSession() {
		return getRequest().getSession(false);
	}
	
	/**
	 * 异常处理
	 * 
	 * @param code
	 * @param cause
	 * @throws Throwable 
	 */
	protected void handleException(Object code, Throwable cause) throws AWebException {
		if (code instanceof ExceptionTypes.AWEB) {
			ExceptionTypes.AWEB afaCode = (ExceptionTypes.AWEB) code;
			throw new AWebException(afaCode.getErrorCode(), 
					afaCode.getErrorMsg(), 
					cause);
		} else {
			throw new AWebException(ExceptionTypes.AWEB.AWEB99.getErrorCode(), 
					ExceptionTypes.AWEB.AWEB99.getErrorMsg(), 
					cause);
		}
		
	}
	
	/**
	 * 异常处理
	 * 
	 * @param code
	 * @param cause
	 * @throws Throwable 
	 */
	protected void handleException(Throwable cause) throws Throwable {
		handleException(null, cause);
	}
	
	/**
	 * 记录debug日志
	 * @param log
	 * @param debug
	 */
	protected void logDebug(Logger log, String debug) {
		if (log.isDebugEnabled())
			log.debug(debug);
	}

	public StandardDbSupport getDbOperation() {
		return dbOperation;
	}

	public void setDbOperation(StandardDbSupport dbOperation) {
		this.dbOperation = dbOperation;
	}
	
}
