package cn.com.agree.aweb.platform.access;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.hibernate.dao.AWebUserVO;
import cn.com.agree.aweb.hibernate.dao.UserRelevancyRoleVO;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CommonUtils;
import cn.com.agree.aweb.util.DES;

public class UserManagerAction extends StandardActionSupport{
	private static final long serialVersionUID = 1077077254429617248L;

	private static final Logger log = LoggerFactory.getLogger(UserManagerAction.class);
	
	private String username;
	private String nickname;
	private String password;
	private String initPassword;
	private String mailbox;
	private String telephone;
	private String userType;
	private String state;
	private String remark;
	
	private String userIDS;
	
	private String userID;
	private String roleIDS;
	
	
	private StrutsMessage strutsMessage;
	
	private File image; //上传的背景图片
    private String imageFileName; //背景图片名称
    private String imageContentType; //背景图片类型
	
	/**
	 * @Description: 获取所有用户信息
	 * @author Athrun tang.pm@cfischina.com
	 * @date 2015年8月11日 下午3:36:23 
	 * @version V1.0
	 */
	public String loadAllUser(){
		try {
			Object  o = dbOperation.queryAllDataByClass(AWebUserVO.class);
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("aaData", o);//把查到的 用户纪录 存储在strutsMessage 中 
		} catch (DBSupportException e) {
			log.error("加载所有用户",e);
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 添加用户
	 * @return
	 */
	public String doAddUser(){
		try {
			if(validateUsername2()){		//判断用户是否重复
				String nowUserName = (String) getSession().getAttribute(Constants.SESSION_USERNAME);
				
				AWebUserVO vo = new AWebUserVO();
				vo.setUsername(username);
				vo.setNickname(nickname);
				vo.setPassword(DES.getEncString(Constants.USER_INIT_PASSWORD));
				vo.setMailbox(mailbox);
				vo.setTelephone(telephone);
				//用户类型为空则设置为普通用户 1
				vo.setUsertype(userType == null ? "1" : userType);
				vo.setCreateUser(nowUserName);
				vo.setCreateTime(CommonUtils.getNowTime());
				vo.setState(state);
				vo.setRemark(remark);
				vo.setContinuouserrornum("0");
				
				this.dbOperation.saveSingleData(vo);
				strutsMessage = StrutsMessage.successMessage();
				strutsMessage.addParameter("vo",vo);
			}else{
				strutsMessage = StrutsMessage.errorMessage("用户名重复，请重新输入！");
			}
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			log.error("创建用户", strutsMessage.getErrorMsg());
		}else{
			log.info("创建用户",  username);
		}
		return SUCCESS;
	}
	
	
	
	/**
	 * 修改用户
	 * @return
	 */
	public String doEditUser(){
		try {
			AWebUserVO vo = (AWebUserVO) this.dbOperation.queryDataById(AWebUserVO.class, username);
			if(vo!=null){		//用户存在
				if(initPassword.equals("1")){	//初始化密码
					vo.setPassword(DES.getEncString(Constants.USER_INIT_PASSWORD));
				}
				vo.setNickname(nickname);
				vo.setMailbox(mailbox);
				vo.setTelephone(telephone);
				vo.setUpdateTime(CommonUtils.getNowTime());
				vo.setState(state);
				vo.setRemark(remark);
				
				this.dbOperation.updateSingleData(vo);
				strutsMessage = StrutsMessage.successMessage();
				strutsMessage.addParameter("vo",vo);
			}else{
				strutsMessage = StrutsMessage.errorMessage("用户不存在！");
			}
		} catch (DBSupportException e) {
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			log.error("修改用户", strutsMessage.getErrorMsg());
		}else{
			log.info("修改用户",  username);
		}
		return SUCCESS;
	}
	
	
	
	
	/**
	 * @Description: 删除用户
	 * @author Athrun tang.pm@cfischina.com
	 * @date 2015年8月13日 下午4:49:10 
	 * @version V1.0
	 */
	@SuppressWarnings("unchecked")
	public String doDeleteUser(){
		try{
			List<String> ids = new ArrayList<String>();
			for(String id : userIDS.split(",")){
				ids.add(id);
			}
			//超级管理员和当前登录用户不能被删除
			List<AWebUserVO> lists = (List<AWebUserVO>)dbOperation.queryDataByClass(AWebUserVO.class, "USERNAME", ids);
			String nowUserName = (String) getSession().getAttribute(Constants.SESSION_USERNAME);
			for (AWebUserVO vo : lists) {
				if(vo.getUsername().equals(nowUserName)){
					throw new Exception("当前登录用户不能被删除");
				}
				if(vo.getUsertype() != null && vo.getUsertype().equals("0")){
					throw new Exception("超级管理员不能被删除");
				}
			}
			
			//后续更新为事务处理
			this.dbOperation.deleteDatasByCollection(lists);
			this.dbOperation.deteleDataByClass(UserRelevancyRoleVO.class, "username", ids);
			
			strutsMessage = StrutsMessage.successMessage();
		}catch(Exception e){
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			log.error("删除用户", strutsMessage.getErrorMsg());
		}else{
			log.info("删除用户", userIDS);
		}
		return SUCCESS;
	}
	
	/**
	 * @Description: 修改密码
	 * @author Athrun tang.pm@cfischina.com
	 * @date 2015年8月20日 下午2:58:36 
	 * @version V1.0
	 */
	public String doEditPassword(){
		if(username != null && username.length()>0) {
			try {
				AWebUserVO vo = (AWebUserVO) this.dbOperation.queryDataById(AWebUserVO.class, username);
				if(vo!=null){
					if(password!=null){
						if(!vo.getPassword().equals(DES.getEncString(password))){
							vo.setPassword(DES.getEncString(password));
							vo.setUpdateTime(CommonUtils.getNowTime());
							this.dbOperation.updateSingleData(vo);
							strutsMessage = StrutsMessage.successMessage();
						}else{
							strutsMessage = StrutsMessage.errorMessage("密码不能和原密码相同！");
						}
					}else{
						strutsMessage = StrutsMessage.errorMessage("密码不符合格式");
					}
				}else{
					strutsMessage = StrutsMessage.errorMessage("用户不存在！");
				}
			} catch (DBSupportException e) {
				strutsMessage = StrutsMessage.errorMessage(e.getMessage());
			}
		} else {
			strutsMessage = StrutsMessage.errorMessage("用户异常！");
		}
		if(strutsMessage.isStatus() ==false){
			log.error("修改用户密码", strutsMessage.getErrorMsg());
		}else{
			log.info("修改用户密码", username);
		}
		return SUCCESS;
	}
	
	/**
	 * @Description:获取当前用户 
	 * @author Athrun tang.pm@cfischina.com
	 * @date 2015年8月20日 下午5:46:25 
	 * @version V1.0
	 */
	public String loadNowUser(){
		strutsMessage = StrutsMessage.successMessage();
		strutsMessage.addParameter("userVO",this.getSession().getAttribute(Constants.SESSION_USERVO));
		return SUCCESS;
	}
	
	/**
	 * 验证用户名是否重复
	 * @return
	 * @throws DBSupportException 
	 */
	private boolean validateUsername2() throws DBSupportException{
			if(username != null && username.length()>0) {
				AWebUserVO vo = (AWebUserVO) this.dbOperation.queryDataById(AWebUserVO.class, username);
				if(vo!=null){
					return false;
				}else{
					return true;
				}
			} else {
				return false;
			}
	}
	
	/**
	 * 验证用户名是否重复
	 * @return
	 * @throws DBSupportException 
	 */
	public String validateUsername(){
			if(username != null && username.length()>0) {
				try {
					AWebUserVO vo = (AWebUserVO) this.dbOperation.queryDataById(AWebUserVO.class, username);
					if(vo!=null){
						strutsMessage = StrutsMessage.errorMessage("用户名重复，请重新输入！");
					}else{
						strutsMessage = StrutsMessage.successMessage();
					}
				} catch (DBSupportException e) {
					log.error("用户名验证", e);
					strutsMessage = StrutsMessage.errorMessage(e.getMessage());
				}
			} else {
				strutsMessage = StrutsMessage.errorMessage("请输入用户名！");
			}
			return SUCCESS;
	}
	
	
	
	/**
	 * 
	 * @Description: 执行用户关联角色
	 * @author Athrun tang.pm@cfischina.com
	 * @date 2014年9月23日 下午3:13:28 
	 * @version V1.0
	 */
	public String doUserRelevanceRole(){
		//事物 先删除此用户所有角色     然后添加所有
		try{
			this.dbOperation.deteleDataByClass(UserRelevancyRoleVO.class, "username" , userID);
			
			List<UserRelevancyRoleVO> list  = new ArrayList<UserRelevancyRoleVO>();
			for(String roleID : roleIDS.split(",")){
				list.add(new UserRelevancyRoleVO(userID,roleID));
			}
			this.dbOperation.saveOrUpdateAllData(list);
			
			
			//更新用户session中的权限信息
			AccessService.disposeUserAccess((AWebUserVO)getSession().getAttribute(Constants.SESSION_USERVO),dbOperation);
			
			strutsMessage = StrutsMessage.successMessage();
		}catch(Exception e){
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			log.error("用户关联角色", strutsMessage.getErrorMsg());
		}else{
			log.info("用户关联角色",userID);
		}
		return SUCCESS;
	}
	
	
	
	/**
	 * @Description:获取用户已有的角色 
	 * @author Athrun tang.pm@cfischina.com
	 * @date 2015年8月18日 上午11:16:57 
	 * @version V1.0
	 */
	@SuppressWarnings("unchecked")
	public String loadUserRelevanceRole(){
		try {
			List<UserRelevancyRoleVO> userRoles = (List<UserRelevancyRoleVO>) this.dbOperation.queryDataByClass(UserRelevancyRoleVO.class, "username" , userID);
			strutsMessage = StrutsMessage.successMessage();
			strutsMessage.addParameter("userRoles", userRoles);
		} catch (DBSupportException e) {
			log.error("加载用户权限", e);
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * @Description:解锁用户 
	 * @author Athrun tang.pm@cfischina.com
	 * @date 2015年8月24日 下午3:47:07 
	 * @version V1.0
	 */
	@SuppressWarnings("unchecked")
	public String doUnlockUser(){
		try{
			List<String> ids = new ArrayList<String>();
			for(String id : userIDS.split(",")){
				ids.add(id);
			}
			List<AWebUserVO> userList = (List<AWebUserVO>) this.dbOperation.queryDataByClass(AWebUserVO.class, "username" , ids);
			if(userList!=null&&userList.size()>0){
				for(AWebUserVO vo : userList){
					vo.setContinuouserrornum(Constants.DB_AGREEUSER_CONTINUOUSERRORNUM_MIX);
					vo.setState(Constants.DB_AGREEUSER_STATE_1);
				}
				this.dbOperation.saveOrUpdateAllData(userList);
			}
			strutsMessage = StrutsMessage.successMessage();
		}catch(Exception e){
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		if(strutsMessage.isStatus() ==false){
			log.error("解锁用户",strutsMessage.getErrorMsg());
		}else{
			log.info("解锁用户",  userIDS);
		}
		return SUCCESS;
	}
	/**
	 * @Description:背景图片自定义上传
	 * @author Athrun zengmeiling@cfischina.com
	 * @date 2016年1月4日 下午3:47:07 
	 */
	public String uploadCustomImage() throws Exception {
        String realpath = ServletActionContext.getServletContext().getRealPath("img/skin/customImg");
        if (image != null) {
        	//删除掉原来的bg图片
        	File file = new File(realpath);
        	if(file.exists()){
        		String[] tempList = file.list();  
        		File temp = null;
        		for(int i = 0;i < tempList.length; i++ ){
        			temp = new File(realpath + File.separator + tempList[i]);  
        			temp.delete();
        		}
        	}
        	imageFileName = "bg"+1000*Math.random()+imageFileName.substring(imageFileName.indexOf('.'));
            File saveFile = new File(new File(realpath), imageFileName);
            if (!saveFile.getParentFile().exists())
                saveFile.getParentFile().mkdirs();
            FileUtils.copyFile(image, saveFile);
            strutsMessage = StrutsMessage.successMessage().addParameter("filepath", saveFile.getPath());
        }
        return "uploadFile";
    }
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMailbox() {
		return mailbox;
	}

	public void setMailbox(String mailbox) {
		this.mailbox = mailbox;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
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

	public String getUserIDS() {
		return userIDS;
	}

	public void setUserIDS(String userIDS) {
		this.userIDS = userIDS;
	}

	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}

	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getRoleIDS() {
		return roleIDS;
	}

	public void setRoleIDS(String roleIDS) {
		this.roleIDS = roleIDS;
	}

	public String getInitPassword() {
		return initPassword;
	}

	public void setInitPassword(String initPassword) {
		this.initPassword = initPassword;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	
	public File getImage() {
		return image;
	}

	public void setImage(File image) {
		this.image = image;
	}
	public String getImageFileName() {
        return imageFileName;
    }

    public void setImageFileName(String imageFileName) {
        this.imageFileName = imageFileName;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }
}
