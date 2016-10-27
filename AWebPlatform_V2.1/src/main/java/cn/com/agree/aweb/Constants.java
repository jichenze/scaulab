package cn.com.agree.aweb;

import java.util.HashMap;

import com.ibm.db2.jcc.a.d;

/**
 * 静态变量
 *
 * @author lihao lihao01@cfischina.com
 * Apr 24, 2015
 */
public class Constants {
	
	/**
	 * 全局参数
	 */
	private static HashMap<String, Object> globalParam = new HashMap<String, Object>();
	public static void setGlobalParam(String name, Object value) {
		globalParam.put(name, value);
	}
	public static Object getGlobalParam(String name) {
		return globalParam.get(name);
	}
	
	/**
	 * registry相关标签
	 */
	public static final String REGISTRY = "registry";
	public static final String REGISTRY_STARTUP = "startup";
	public static final String REGISTRY_CLASS = "class";
	public static final String REGISTRY_NAME = "name";
	public static final String REGISTRY_GLOBAL = "global";
	public static final String REGISTRY_INIT_PARAM = "init-param";
	public static final String REGISTRY_PARAM_NAME = "param-name";
	public static final String REGISTRY_PARAM_VALUE = "param-value";
	

	/**
	 * 时间格式
	 */
	public static final String FORMAT_TIME = "yyyy-MM-dd HH:mm:ss";
	/**
	 * 集群中签退时sessionid字段名
	 */
	public static final String AWEB_SESSIONID = "sid";
	
	/**
	 * 当前服务器监听端口
	 */
	public static final String SERVER_PORT = "8080";
	
	
	/**
	 * 用户初始密码
	 */
	public static final String USER_INIT_PASSWORD = "111111";
	
	/**
	 * 用户锁定间隔时间：12小时
	 * 单位:秒
	 */
	public static final int USER_LOCT_TIME = 43200;
	
	/**
	 * 用户登录错误次数上线：3次
	 */
	public static final int USER_LOGIN_ERROR_MAX = 5;
	
	
	
	/**
	 * 数据库-agree_user表-usertype字段   0：管理员
	 */
	public static final String DB_AGREEUSER_TYPE_0 = "0";
	/**
	 * 数据库-agree_user表-usertype字段   1：普通用户
	 */
	public static final String DB_AGREEUSER_TYPE_1 = "1";
	/**
	 * 数据库-agree_user表-usertype字段   2：IDE用户
	 */
	public static final String DB_AGREEUSER_TYEP_2 = "2";
	/**
	 * 数据库-agree_user表-state字段   0：未启用
	 */
	public static final String DB_AGREEUSER_STATE_0 = "0";
	/**
	 * 数据库-agree_user表-state字段   1：启用
	 */
	public static final String DB_AGREEUSER_STATE_1 = "1";
	/**
	 * 数据库-agree_user表-state字段   2：锁定
	 */
	public static final String DB_AGREEUSER_STATE_2 = "2";
	/**
	 * 数据库-agree_user表-continuouserrornum字段   初始值：0次
	 */
	public static final String DB_AGREEUSER_CONTINUOUSERRORNUM_MIX = "0";
	/**
	 * 数据库-agree_access表-权限状态：生效
	 */
	public static final String DB_ACCESS_STATE_TRUE = "1";
	
	
	/**
	 * session-->用户
	 */
	public static final String SESSION_USERVO = "userVO";
	/**
	 * session-->用户名
	 */
	public static final String SESSION_USERNAME = "username";
	
	
	/**
	 * session-->用户所有权限集合：菜单、控制、显示
	 */
	public static final String SESSION_USER_ACCESS_LIST = "userAccessList";
	/**
	 * session-->用户权限LIST-菜单
	 */
	public static final String SESSION_USER_ACCESS_LIST_MENU = "userMenuAccessList";
	/**
	 * session-->用户权限LIST-控制
	 */
	public static final String SESSION_USER_ACCESS_LIST_CONTROL = "userControlAccessList";
	/**
	 * session-->用户权限LIST-显示
	 */
	public static final String SESSION_USER_ACCESS_LIST_SHOW = "userShowAccessList";
	
	/**
	 * session-->用户实例权限LIST
	 */
	public static final String SESSION_USER_INSTANCE_LIST = "userInstanceList";
	
	/**
	 * session-->用户实例权限-IDS
	 */
	public static final String SESSION_USER_INSTANCE_IDS = "userInstanceIDS";
	

	/**
	 * session-->用户权限LIST-动态域树菜单IDS
	 */
	public static final String SESSION_USER_ACCESS_IDS_TREE_MENU = "userMenuAccessTreeIDS";
	/**
	 * session-->用户权限LIST-动态域树菜单
	 */
	public static final String SESSION_USER_ACCESS_LIST_TREE_MENU = "userMenuAccessTreeList";

	/**
	 * session-->用户所有权限集合：菜单、控制、显示
	 */
	public static final String SESSION_USER_MENUACCESS_VOS_SET = "userMenuAccessSet";
	
	/**
	 * session-->用户的最小父路径
	 */
	public static final String SESSION_USER_PATH = "userpath";
	
	
	/**
	 * 编码：UTF-8
	 */
	public static final String ENCODING_UTF8 = "UTF-8";
	
	
	public static final String DEPLOY_APPS = "apps";
	public static final String DEPLOY_SHARE = "share";
	public static final String DEPLOY_APPNAME = "appName";
	public static final String DEPLOY_RESOURCE = "resource";
	public static final String DEPLOY_UPLOAD_USER = "upload_user";
	public static final String DEPLOY_DESP = "desp";
	public static final String DEPLOY_SIZE = "appSize";
	public static final String DEPLOY_TYPE = "type";
	public static final String DEPLOY_VERSION = "version";
	public static final String DEPLOY_TRUE = "1";
	public static final String DEPLOY_FALSE = "0";
	public static final String DEPLOY_PATH = "path";
	public static final String DEPLOY_PATCH = "patch";
	public static final String DEPLOY_UPLOADSTATE = "uploadState";
	public static final String DEPLOY_PROJECTNAME = "projectName";
}
