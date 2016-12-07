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
	
	@Column(name="cunchu_xingzhi")
	private String cunchu_xz;
	
	@Column(name="cunchu_danwei")
	private String cunchu_dw;
	
	@Column(name="cunchu_didian")
	private String cunchu_dd;
	
	@Column(name="cunchu_date")
	private String cunchu_date;
	
	@Column(name="cunchu_liang")
	private String cunchu_liang;
	
	@Column(name="cunchu_renName")
	private String cunchu_rname;
	
	@Column(name="cunchu_shengYu")
	private String cunchu_sy;
	
	public CunchuVO(){
		super();
	}

	public String getCunchu_name() {
		return cunchu_name;
	}

	public void setCunchu_name(String cunchu_name) {
		this.cunchu_name = cunchu_name;
	}

	public String getCunchu_xz() {
		return cunchu_xz;
	}

	public void setCunchu_xz(String cunchu_xz) {
		this.cunchu_xz = cunchu_xz;
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

	public String getCunchu_date() {
		return cunchu_date;
	}

	public void setCunchu_date(String cunchu_date) {
		this.cunchu_date = cunchu_date;
	}

	public String getCunchu_liang() {
		return cunchu_liang;
	}

	public void setCunchu_liang(String cunchu_liang) {
		this.cunchu_liang = cunchu_liang;
	}

	public String getCunchu_rname() {
		return cunchu_rname;
	}

	public void setCunchu_rname(String cunchu_rname) {
		this.cunchu_rname = cunchu_rname;
	}

	public String getCunchu_sy() {
		return cunchu_sy;
	}

	public void setCunchu_sy(String cunchu_sy) {
		this.cunchu_sy = cunchu_sy;
	}
}
