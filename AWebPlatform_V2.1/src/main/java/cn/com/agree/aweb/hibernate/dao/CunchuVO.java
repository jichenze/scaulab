package cn.com.agree.aweb.hibernate.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Description: 存储表
 * @Title: CaigouCunchuVO.java 
 * @Package com.agree.framework.beanVO 
 */
@Entity
@Table(name="cunchu")
public class CunchuVO {

	@Id
	@Column(name="cunchu_Name", unique=true)
	private String cunchu_name;
	
	@Column(name="cunchu_leixing")
	private String cunchu_lx;
	
	@Column(name="cunchu_danwei")
	private String cunchu_dw;
	
	@Column(name="cunchu_didian")
	private String cunchu_dd;
	
	@Column(name="cunchu_updatetime")
	private String cunchu_updatetime;
	
	@Column(name="cunchu_liang")
	private String cunchu_liang;
	
	public CunchuVO(){
		super();
	}

	public String getCunchu_name() {
		return cunchu_name;
	}

	public void setCunchu_name(String cunchu_name) {
		this.cunchu_name = cunchu_name;
	}

	public String getCunchu_lx() {
		return cunchu_lx;
	}

	public void setCunchu_lx(String cunchu_lx) {
		this.cunchu_lx = cunchu_lx;
	}

	public String getCunchu_dw() {
		return cunchu_dw;
	}

	public void setCunchu_dw(String cunchu_dw) {
		this.cunchu_dw = cunchu_dw;
	}

	public String getCunchu_dd() {
		return cunchu_dd;
	}

	public void setCunchu_dd(String cunchu_dd) {
		this.cunchu_dd = cunchu_dd;
	}

	public String getCunchu_updatetime() {
		return cunchu_updatetime;
	}

	public void setCunchu_updatetime(String cunchu_updatetime) {
		this.cunchu_updatetime = cunchu_updatetime;
	}

	public String getCunchu_liang() {
		return cunchu_liang;
	}

	public void setCunchu_liang(String cunchu_liang) {
		this.cunchu_liang = cunchu_liang;
	}
}
