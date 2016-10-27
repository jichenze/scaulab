package cn.com.agree.aweb.platform.access;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import org.hibernate.Session;
import org.hibernate.Transaction;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.hibernate.dao.AWebDeviceVO;
import cn.com.agree.aweb.hibernate.dao.AWebUserVO;
import cn.com.agree.aweb.hibernate.dao.AccessVO;
import cn.com.agree.aweb.hibernate.dao.RoleRelevanceAccessVO;
import cn.com.agree.aweb.hibernate.dao.RoleVO;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CommonUtils;

public class RoleManagerAction extends StandardActionSupport{
	private static final long serialVersionUID = 304026419083070881L;
	
	private String rolename;
	private String state;
	private String remark;
	
	private String roleIDS;


	private String roleID;		//角色ID
	
	private String accessIDS;
	
	private String instanceIDS;
	
	private StrutsMessage strutsMessage;
	
	
	public String loadAllRole(){
		try {
			Object  o = dbOperation.queryAllDataByClass(RoleVO.class);
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("aaData", o);
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}
	
	
	/**
	 * 添加角色
	 * @return
	 */
	public String doAddRole(){
		try {
				String nowUserName = (String) getSession().getAttribute(Constants.SESSION_USERNAME);
				
				RoleVO vo = new RoleVO();
				vo.setName(rolename);
				vo.setCreateUser(nowUserName);
				vo.setState(state);
				vo.setCreateTime(CommonUtils.getNowTime());
				vo.setUpdateTime(CommonUtils.getNowTime());
				vo.setRemark(remark);
				
				this.dbOperation.saveSingleData(vo);
				strutsMessage = StrutsMessage.successMessage();
				//AfaLogger.loggerSuc("创建角色", AfaLogMsg.ROLE, vo.getRoleId());
				strutsMessage.addParameter("vo",vo);
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			//AfaLogger.loggerErr("创建角色", AfaLogMsg.ROLE, rolename,strutsMessage.getErrorMsg());
		}
		return SUCCESS;
	}
	
	
	/**
	 * 修改角色
	 * @return
	 */
	public String doEditRole(){
		try {
			RoleVO vo = (RoleVO) this.dbOperation.queryDataById(RoleVO.class, roleID);
			if(vo!=null){		//角色存在
				vo.setUpdateTime(CommonUtils.getNowTime());
				vo.setState(state);
				vo.setRemark(remark);
				
				this.dbOperation.updateSingleData(vo);
				strutsMessage = StrutsMessage.successMessage();
				strutsMessage.addParameter("vo",vo);
			}else{
				strutsMessage = StrutsMessage.errorMessage("角色不存在！");
			}
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			//AfaLogger.loggerErr("修改角色", AfaLogMsg.ROLE, roleID,strutsMessage.getErrorMsg());
		}else{
			//AfaLogger.loggerSuc("修改角色", AfaLogMsg.ROLE, roleID);
		}
		return SUCCESS;
	}
	
	
	
	/**
	 * 删除角色
	 * @return
	 */
	public String doDeleteRole(){
		Session session = this.dbOperation.getSessionFactory().getCurrentSession();
		Transaction tx = null;
		
		try{
			String hql = "",hql2 = "";
			String[] ids = roleIDS.split(",");
			for(int i=0; i<ids.length; i++) {
				if(i == 0) {
					hql = "roleId='"+ids[i]+"'";
					hql2 = "roleID='"+ids[i]+"'";
				} else {
					hql = hql + " or roleId='"+ids[i]+"'";
					hql2 = hql2 + " or roleID='"+ids[i]+"'";
				}
			}
			
			tx = session.beginTransaction();//通过session启动事务
			
			this.dbOperation.executeHQL("delete from RoleVO where " + hql);
			this.dbOperation.executeHQL("delete from UserRelevancyRoleVO where " + hql);
			this.dbOperation.executeHQL("delete from RoleRelevanceAccessVO where " + hql2);
			
			tx.commit();//事务提交
			
			strutsMessage = StrutsMessage.successMessage();
		}catch(Exception e){
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
			tx.rollback();
		}finally{
			if(session.isOpen()) {
				session.close();
			}
		}
		if(strutsMessage.isStatus() ==false){
			//AfaLogger.loggerErr("删除角色", AfaLogMsg.ROLE, roleIDS,strutsMessage.getErrorMsg());
		}else{
			//AfaLogger.loggerSuc("删除角色", AfaLogMsg.ROLE, roleIDS);
		}
		return SUCCESS;
	}
	
	
	
	/**
	 * @Description: 展示权限列表
	 * @author Athrun tang.pm@cfischina.com
	 * @date 2015年8月14日 下午5:00:16 
	 * @version V1.0
	 */
	@SuppressWarnings("unchecked")
	public String loadAllAccess(){
		List<Object> treeDatas = new ArrayList<Object>();
		try {
			List<RoleRelevanceAccessVO> list = (List<RoleRelevanceAccessVO>) this.dbOperation.queryDataByClass(RoleRelevanceAccessVO.class, "roleID", roleID);
			
			List<AccessVO> allAccess = (List<AccessVO>) this.dbOperation.queryAllDataByClass(AccessVO.class);
			List<AWebDeviceVO> allDevice = (List<AWebDeviceVO>) this.dbOperation.queryAllDataByClass(AWebDeviceVO.class);
			if(allAccess!=null){
				for(AccessVO avo : allAccess){
					if(Constants.DB_ACCESS_STATE_TRUE.equals(avo.getState())){		
						JSONObject obj = new JSONObject();
						obj.put("id", avo.getElementId());
						obj.put("pId", avo.getPid());
						obj.put("name", avo.getName());
						obj.put("open", Boolean.TRUE);
						obj.put("remark", avo.getId());
						obj.put("checked", "false");
						for(RoleRelevanceAccessVO rvo : list){				//判断是否已有权限
							if(avo.getId().equals(rvo.getAccessId())){
								obj.put("checked", "true");
							}
						}
						treeDatas.add(obj);
					}
				}
			}
			
			if(allDevice!=null){
				for(AWebDeviceVO vo : allDevice){
					JSONObject obj = new JSONObject();
					obj.put("id", vo.getPath());
					if("/".equals(vo.getParentpath())){
						obj.put("pId", "appAll");
					}else{
						obj.put("pId", vo.getParentpath());
					}
					obj.put("name", vo.getName());
					obj.put("open", Boolean.TRUE);
					obj.put("remark", vo.getPath());
					obj.put("checked", "false");
					for(RoleRelevanceAccessVO rvo : list){				//判断是否已有权限
						if(vo.getPath().equals(rvo.getAccessId())){
							obj.put("checked", "true");
						}
					}
					treeDatas.add(obj);
				}
			}
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("treeDatas", treeDatas);
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		
		
		return SUCCESS;
	}
	
	/**
	 * @Description: 执行用户关联角色
	 * @author Athrun tang.pm@cfischina.com
	 * @date 2014年9月23日 下午3:13:28 
	 * @version V1.0
	 * @throws AfaException 
	 */
	public String doRoleRelevanceAccess(){
		try{
			this.dbOperation.deteleDataByClass(RoleRelevanceAccessVO.class, "roleID" , roleID);
			
			List<RoleRelevanceAccessVO> list  = new ArrayList<RoleRelevanceAccessVO>();
			for(String accessID : accessIDS.split(",")){
				list.add(new RoleRelevanceAccessVO(roleID,accessID));
			}
			this.dbOperation.saveOrUpdateAllData(list);
			
			//更新用户session中的权限信息
			AccessService.disposeUserAccess((AWebUserVO)getSession().getAttribute(Constants.SESSION_USERVO),dbOperation);
			
			strutsMessage = StrutsMessage.successMessage();
		}catch(Exception e){
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			//AfaLogger.loggerErr("角色配置操作权限", AfaLogMsg.ROLE, roleID,strutsMessage.getErrorMsg());
		}else{
			//AfaLogger.loggerSuc("角色配置操作权限", AfaLogMsg.ROLE, roleID);
		}
		return SUCCESS;
	}
	
	

	public String getRolename() {
		return rolename;
	}


	public void setRolename(String rolename) {
		this.rolename = rolename;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	public String getRemark() {
		return remark;
	}


	public void setRemark(String remark) {
		this.remark = remark;
	}


	public String getRoleIDS() {
		return roleIDS;
	}


	public void setRoleIDS(String roleIDS) {
		this.roleIDS = roleIDS;
	}


	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}


	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}


	public String getRoleID() {
		return roleID;
	}


	public void setRoleID(String roleID) {
		this.roleID = roleID;
	}


	public String getAccessIDS() {
		return accessIDS;
	}


	public void setAccessIDS(String accessIDS) {
		this.accessIDS = accessIDS;
	}


	public String getInstanceIDS() {
		return instanceIDS;
	}


	public void setInstanceIDS(String instanceIDS) {
		this.instanceIDS = instanceIDS;
	}
	
	
}
