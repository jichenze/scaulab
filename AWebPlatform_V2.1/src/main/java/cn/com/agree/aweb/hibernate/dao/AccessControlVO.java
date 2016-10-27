package cn.com.agree.aweb.hibernate.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Description: 权限控制表（按钮等）
 * @Title: AccessControlVO.java 
 * @Package com.agree.framework.beanVO 
 * @author Athrun tang.pm@cfischina.com
 * @date 2015年1月5日 上午11:50:44 
 * @version V1.0
 */
@Entity
@Table(name="aweb_access_control")
public class AccessControlVO {
	
	@Id
	@Column(name="ID", unique=true)
	private String id;
	
	@Column(name="NAME")
	private String name;

	@Column(name="VALUE")
	private String value;

	@Column(name="STATE")
	private String state;	//是否生效 true/flase

	@Column(name="REMARK")
	private String remark;
	
	
	public AccessControlVO(){
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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
	
	
	
}
