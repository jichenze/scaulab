package cn.com.agree.aweb.hibernate.dao;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Description: 权限菜单表
 * @Title: AccessMenuVO.java 
 * @Package com.agree.framework.beanVO 
 * @author Athrun tang.pm@cfischina.com
 * @date 2015年1月5日 上午11:50:15 
 * @version V1.0
 */
@Entity
@Table(name="aweb_access_menu")
public class AccessMenuVO implements Serializable{
	
	private static final long serialVersionUID = -399019486539094608L;

	@Id
	@Column(name="ID", unique=true)
	private String id;
	
	@Column(name="PID")
	private String pid;

	@Column(name="NAME")
	private String name;

	@Column(name="VALUE")
	private String value;

	@Column(name="ISPARENT")
	private String isparent;

	@Column(name="OPEN")
	private String open;

	@Column(name="STATE")
	private String state;
	
	@Column(name="SORT")
	private String sort;

	@Column(name="REMARK")
	private String remark;	
	
	public AccessMenuVO(){
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getIsparent() {
		return isparent;
	}

	public void setIsparent(String isparent) {
		this.isparent = isparent;
	}

	public String getOpen() {
		return open;
	}

	public void setOpen(String open) {
		this.open = open;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}
	
}
