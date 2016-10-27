package cn.com.agree.aweb.hibernate.dao;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * aweb_devic结构
 * @author wu.wj@cfischina.com
 *
 */
@Entity
@Table(name="aweb_device")
public class AWebDeviceVO implements Serializable{
	
     /**
	 * introduce:
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="PATH", nullable=false, unique=true)
	private String path;
     
	@Column(name="NAME")
     private String name;
     
	@Column(name="PARENTPATH")
     private String parentpath;
     
	@Column(name="DESP")
     private String desp;
     
	@Column(name="DEVTYPE")
     private String devtype;

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getParentpath() {
		return parentpath;
	}

	public void setParentpath(String parentpath) {
		this.parentpath = parentpath;
	}

	public String getDesp() {
		return desp;
	}

	public void setDesp(String desp) {
		this.desp = desp;
	}

	public String getDevtype() {
		return devtype;
	}

	public void setDevtype(String devtype) {
		this.devtype = devtype;
	}
         
}
