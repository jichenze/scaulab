package cn.com.agree.aweb.hibernate.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Description: 采购申请审核表
 * @Title: CaigouVO.java 
 * @Package com.agree.framework.beanVO 
 */
@Entity
@Table(name="caigou")
public class CaigouVO {
	
	@Id
	@Column(name="caigou_ID", unique=true)
	private String caigou_id;
	
	@Column(name="caigou_PID")
	private String caigou_pid;
	
	@Column(name="caigou_name")
	private String caigou_name;

	@Column(name="caigou_phoneNumber")
	private String caigou_pn;
	
	@Column(name="caigou_HXName")
	private String caigou_hxn;
	
	@Column(name="caigou_shuliang")
	private String caigou_sl;

	@Column(name="caigou_jldanwei")
	private String caigou_jldw;
	
	@Column(name="caigou_yuanyin")
	private String caigou_yy;
	
	@Column(name="caigou_YN")
	private String caigou_yn;
	
	@Column(name="caigou_piliang")
	private String caigou_pl;
	
	@Column(name="caigou_date")
	private String caigou_date;
	
	@Column(name="caigoushenhe_yuanyin")
	private String caigoushenhe_yy;
	
	public CaigouVO(){
		super();
	}

	public String getCaigou_id() {
		return caigou_id;
	}

	public void setCaigou_id(String caigou_id) {
		this.caigou_id = caigou_id;
	}

	public String getCaigou_pid() {
		return caigou_pid;
	}

	public void setCaigou_pid(String caigou_pid) {
		this.caigou_pid = caigou_pid;
	}

	public String getCaigou_name() {
		return caigou_name;
	}

	public void setCaigou_name(String caigou_name) {
		this.caigou_name = caigou_name;
	}

	public String getCaigou_pn() {
		return caigou_pn;
	}

	public void setCaigou_pn(String caigou_pn) {
		this.caigou_pn = caigou_pn;
	}

	public String getCaigou_hxn() {
		return caigou_hxn;
	}

	public void setCaigou_hxn(String caigou_hxn) {
		this.caigou_hxn = caigou_hxn;
	}

	public String getCaigou_sl() {
		return caigou_sl;
	}

	public void setCaigou_sl(String caigou_sl) {
		this.caigou_sl = caigou_sl;
	}
	
	public String getCaigou_jldw() {
		return caigou_jldw;
	}

	public void setCaigou_jldw(String caigou_jldw) {
		this.caigou_jldw = caigou_jldw;
	}

	public String getCaigou_yy() {
		return caigou_yy;
	}

	public void setCaigou_yy(String caigou_yy) {
		this.caigou_yy = caigou_yy;
	}
	
	public String getCaigou_yn() {
		return caigou_yn;
	}

	public void setCaigou_yn(String caigou_yn) {
		this.caigou_yn = caigou_yn;
	}

	public String getCaigou_pl() {
		return caigou_pl;
	}

	public void setCaigou_pl(String caigou_pl) {
		this.caigou_pl = caigou_pl;
	}

	public String getCaigou_date() {
		return caigou_date;
	}

	public void setCaigou_date(String caigou_date) {
		this.caigou_date = caigou_date;
	}

	public String getCaigoushenhe_yy() {
		return caigoushenhe_yy;
	}

	public void setCaigoushenhe_yy(String caigoushenhe_yy) {
		this.caigoushenhe_yy = caigoushenhe_yy;
	}
}
