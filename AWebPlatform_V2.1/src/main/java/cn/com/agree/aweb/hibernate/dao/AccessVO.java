package cn.com.agree.aweb.hibernate.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @权限表
 * @Title: AccessVO.java
 * @Package com.agree.framework.beanVO
 * @author Athrun tang.pm@cfischina.com
 * @date 2014年9月9日 下午2:59:42
 * @version V1.0
 */
@Entity
@Table(name="aweb_access")
public class AccessVO {
	
	@Id
	@Column(name="ID", unique=true)
	private String id;

	@Column(name="ELEMENT_ID")
	private String elementId;

	@Column(name="TYPE")
	private String type;

	@Column(name="NAME")
	private String name;

	@Column(name="PID")
	private String pid;

	@Column(name="STATE")
	private String state; // 是否生效 true/flase

	public String getElementId() {
		return elementId;
	}

	public void setElementId(String elementId) {
		this.elementId = elementId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Override
	public String toString() {
		StringBuffer s = new StringBuffer();
		s.append(elementId != null ? elementId : "");
		s.append(type != null ? type : "");
		s.append(name != null ? name : "");
		s.append(pid != null ? pid : "");
		s.append(state != null ? state : "");
		return s.toString();
	}

}
