package cn.com.agree.aweb.hibernate.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import cn.com.agree.aweb.util.CommonUtils;

@Entity
@Table(name="aweb_role")
public class RoleVO {
	
	@Id
	@Column(name="ID", unique=true)
	private String roleId;
	
	@Column(name="NAME")
	private String name;
	
	@Column(name="CREATEUSER")
	private String createUser;
	
	@Column(name="CREATETIME")
	private String createTime;
	
	@Column(name="UPDATETIME")
	private String updateTime;
	
	@Column(name="STATE")
	private String state;
	
	@Column(name="REMARK")
	private String remark;
	
	public RoleVO(){
		super();
		this.roleId = CommonUtils.getShowUUID();
	}
	
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
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
	
	
}
