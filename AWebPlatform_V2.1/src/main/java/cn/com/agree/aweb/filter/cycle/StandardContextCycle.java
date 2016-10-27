package cn.com.agree.aweb.filter.cycle;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 管理当前Context应用的周期
 *
 * @author lihao lihao01@cfischina.com
 * Jul 20, 2015
 */
public class StandardContextCycle implements ContextCycle{
	
	/**
	 * 
	 */
	
	@SuppressWarnings("unused")
    private final static Logger log = LoggerFactory.getLogger(StandardContextCycle.class);
	
	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.base.filter.ContextCycle#initialize(javax.servlet.ServletContext)
	 */
	@Override
	public void initialize(ServletContext servletContext) {
		
	}
	
	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.base.filter.ContextCycle#destroy(javax.servlet.ServletContext)
	 */
	@Override
	public void destroy(ServletContext servletContext) {
	}
	
	
}
