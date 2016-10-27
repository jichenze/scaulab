package cn.com.agree.aweb.hibernate.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import cn.com.agree.aweb.util.CommonUtils;


/**
 * 关联bean-用户、角色
 * @Description: TODO(用一句话描述该文件做什么) 
 * @Title: RelevancyUserRoleVO.java 
 * @Package com.agree.framework.beanVO 
 * @author Athrun tang.pm@cfischina.com
 * @date 2014年9月9日 下午3:39:22 
 * @version V1.0
 */
@Entity
@Table(name="aweb_relevancy_user_role")
public class UserRelevancyRoleVO {
	
	@Id
	@Column(name="ID", unique=true)
	private String id;
	
	@Column(name="USERNAME")
	private String username;
	
	@Column(name="ROLE_ID")
	private String roleId;
	
	public UserRelevancyRoleVO(){
		super();
		this.id = CommonUtils.getUUID();
	}
	
	public UserRelevancyRoleVO(String username, String roleId) {
		super();
		this.id = CommonUtils.getUUID();
		this.username = username;
		this.roleId = roleId;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
