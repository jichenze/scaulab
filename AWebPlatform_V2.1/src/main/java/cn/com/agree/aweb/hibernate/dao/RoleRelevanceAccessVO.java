package cn.com.agree.aweb.hibernate.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import cn.com.agree.aweb.util.CommonUtils;


/**
 * 
 * @Description: 角色权限关联表
 * @Title: RoleRelevanceAccessVO.java 
 * @Package com.agree.framework.beanVO
 * @author Athrun tang.pm@cfischina.com
 * @date 2014年9月23日 下午5:21:33 
 * @version V1.0
 */
@Entity
@Table(name="aweb_relevancy_role_access")
public class RoleRelevanceAccessVO {
	
	@Id
	@Column(name="ID", unique=true)
	private String id;
	
	@Column(name="ROLE_ID")
	private String roleID;
	
	@Column(name="ACCESS_ID")
	private String accessId;
	
	public RoleRelevanceAccessVO(){
		super();
		this.id = CommonUtils.getUUID();
	}
	
	public RoleRelevanceAccessVO(String roleID, String accessId) {
		super();
		this.id = CommonUtils.getUUID();
		this.roleID = roleID;
		this.accessId = accessId;
	}
	
	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getRoleID() {
		return roleID;
	}

	public void setRoleID(String roleID) {
		this.roleID = roleID;
	}

	public String getAccessId() {
		return accessId;
	}

	public void setAccessId(String accessId) {
		this.accessId = accessId;
	}
	
	
	
}
