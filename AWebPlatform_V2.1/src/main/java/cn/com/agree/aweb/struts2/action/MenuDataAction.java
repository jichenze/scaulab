package cn.com.agree.aweb.struts2.action;

import java.util.List;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.hibernate.dao.AWebUserVO;
import cn.com.agree.aweb.hibernate.dao.AccessMenuVO;
import cn.com.agree.aweb.hibernate.dao.AWebDeviceVO;
import cn.com.agree.aweb.platform.access.AccessService;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

import com.aim.alibaba.fastjson.JSONArray;

/**
 * 获取菜单数据
 *
 * @author lihao lihao01@cfischina.com
 * Oct 15, 2015
 */
public class MenuDataAction extends StandardActionSupport {
	
	private static final long serialVersionUID = 4153459105735166064L;

	private StrutsMessage strutsMessage;
	
	/**
	 * 获取当前的文件系统信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String disposeMenu() {
		AWebUserVO userVO = (AWebUserVO) this.getSession().getAttribute(Constants.SESSION_USERVO);
		AccessService.disposeUserAccess(userVO,dbOperation);
		//动态域树
		List<AWebDeviceVO> treemenuAccess = (List<AWebDeviceVO>) this.getSession().getAttribute(Constants.SESSION_USER_ACCESS_LIST_TREE_MENU);
		strutsMessage = StrutsMessage.successMessage().addParameter("menuData", new DisposeMenuDataService((JSONArray) JSONArray.toJSON(treemenuAccess)).disposeData());
		
		//菜单
		List<AccessMenuVO> menuAccess = (List<AccessMenuVO>) this.getSession().getAttribute(Constants.SESSION_USER_MENUACCESS_VOS_SET);
		strutsMessage.addParameter("menuAccess", menuAccess);
		
		return SUCCESS;
	}
	
	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}
	
	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
}
