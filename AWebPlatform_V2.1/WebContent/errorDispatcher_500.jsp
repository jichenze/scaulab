<%@ page isErrorPage="true" contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="cn.com.agree.aweb.exception.*"%>
<%@page import="cn.com.agree.aweb.struts2.action.support.StrutsMessage"%>
<%
	String path = request.getContextPath();
	/*将异常处理为AWebException*/
	StrutsMessage message = null;
	message = StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, exception);
	
	/*判断是否为ajax请求*/
	String header = request.getHeader("X-Requested-With");  
    boolean isAjax = "XMLHttpRequest".equals(header);
%>

<%if(isAjax){%>
	<%response.setHeader("Content-Type", "application/json");out.clear();%><%=message.jsonString()%>
<%}%>