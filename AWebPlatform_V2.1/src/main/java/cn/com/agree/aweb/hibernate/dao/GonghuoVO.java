package cn.com.agree.aweb.hibernate.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Description: 供货表
 * @Title: CaigouShenqingVO.java 
 * @Package com.agree.framework.beanVO 
 */
@Entity
@Table(name="gonghuo")
public class GonghuoVO {
	

	@Id
	@Column(name="gonghuo_ID", unique=true)
	private String gonghuo_id;
	
	@Column(name="gonghuo_FaName")
	private String gonghuo_fname;
	
	@Column(name="gonghuo_time")
	private String gonghuo_time;
	
	@Column(name="gonghuo_Phone")
	private String gonghuo_phone;
	
	@Column(name="gonghuo_ShouName")
	private String gonghuo_sname;
	
	@Column(name="gonghuo_shuliang")
	private String gonghuo_sl;
	
	@Column(name="gonghuo_Name")
	private String gonghuo_name;
	
	public GonghuoVO(){
		super();
	}

	public String getGonghuo_id() {
		return gonghuo_id;
	}

	public void setGonghuo_id(String gonghuo_id) {
		this.gonghuo_id = gonghuo_id;
	}

	public String getGonghuo_fname() {
		return gonghuo_fname;
	}

	public void setGonghuo_fname(String gonghuo_fname) {
		this.gonghuo_fname = gonghuo_fname;
	}

	public String getGonghuo_time() {
		return gonghuo_time;
	}

	public void setGonghuo_time(String gonghuo_time) {
		this.gonghuo_time = gonghuo_time;
	}

	public String getGonghuo_phone() {
		return gonghuo_phone;
	}

	public void setGonghuo_phone(String gonghuo_phone) {
		this.gonghuo_phone = gonghuo_phone;
	}

	public String getGonghuo_sname() {
		return gonghuo_sname;
	}

	public void setGonghuo_sname(String gonghuo_sname) {
		this.gonghuo_sname = gonghuo_sname;
	}

	public String getGonghuo_sl() {
		return gonghuo_sl;
	}

	public void setGonghuo_sl(String gonghuo_sl) {
		this.gonghuo_sl = gonghuo_sl;
	}

	public String getGonghuo_name() {
		return gonghuo_name;
	}

	public void setGonghuo_name(String gonghuo_name) {
		this.gonghuo_name = gonghuo_name;
	}
}
