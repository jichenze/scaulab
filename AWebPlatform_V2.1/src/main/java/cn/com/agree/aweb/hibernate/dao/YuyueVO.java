package cn.com.agree.aweb.hibernate.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Description: 预约申请审核表
 * @Title: YuyueShenqingVO.java 
 * @Package com.agree.framework.beanVO 
 */
@Entity
@Table(name="yuyue")
public class YuyueVO {

	@Id
	@Column(name="yuyue_ID", unique=true)
	private String yuyue_id;
	
	@Column(name="yuyue_Name")
	private String yuyue_name;
	
	@Column(name="yuyue_renID")
	private String yuyue_rid;
	
	@Column(name="yuyue_phoneNumber")
	private String yuyue_pn;
	
	@Column(name="yuyue_wupinName")
	private String yuyue_wpname;
	
	@Column(name="yuyue_shuliang")
	private String yuyue_sl;
	
	@Column(name="yuyue_jldanwei")
	private String yuyue_jldw;
	
	@Column(name="yuyue_didian")
	private String yuyue_dd;
	
	@Column(name="yuyue_yuanyin")
	private String yuyue_yy;
	
	@Column(name="yuyue_YN")
	private String yuyue_yn;
	
	@Column(name="yuyueshenhe_yuanyin")
	private String yuyueshenhe_yy;
	
	public YuyueVO(){
		super();
	}

	public String getYuyue_id() {
		return yuyue_id;
	}

	public void setYuyue_id(String yuyue_id) {
		this.yuyue_id = yuyue_id;
	}

	public String getYuyue_name() {
		return yuyue_name;
	}

	public void setYuyue_name(String yuyue_name) {
		this.yuyue_name = yuyue_name;
	}

	public String getYuyue_rid() {
		return yuyue_rid;
	}

	public void setYuyue_rid(String yuyue_rid) {
		this.yuyue_rid = yuyue_rid;
	}

	public String getYuyue_pn() {
		return yuyue_pn;
	}

	public void setYuyue_pn(String yuyue_pn) {
		this.yuyue_pn = yuyue_pn;
	}

	public String getYuyue_wpname() {
		return yuyue_wpname;
	}

	public void setYuyue_wpname(String yuyue_wpname) {
		this.yuyue_wpname = yuyue_wpname;
	}

	public String getYuyue_sl() {
		return yuyue_sl;
	}

	public void setYuyue_sl(String yuyue_sl) {
		this.yuyue_sl = yuyue_sl;
	}
	
	public String getYuyue_jldw() {
		return yuyue_jldw;
	}

	public void setYuyue_jldw(String yuyue_jldw) {
		this.yuyue_jldw = yuyue_jldw;
	}

	public String getYuyue_dd() {
		return yuyue_dd;
	}

	public void setYuyue_dd(String yuyue_dd) {
		this.yuyue_dd = yuyue_dd;
	}

	public String getYuyue_yy() {
		return yuyue_yy;
	}

	public void setYuyue_yy(String yuyue_yy) {
		this.yuyue_yy = yuyue_yy;
	}

	public String getYuyue_yn() {
		return yuyue_yn;
	}

	public void setYuyue_yn(String yuyue_yn) {
		this.yuyue_yn = yuyue_yn;
	}

	public String getYuyueshenhe_yy() {
		return yuyueshenhe_yy;
	}

	public void setYuyueshenhe_yy(String yuyueshenhe_yy) {
		this.yuyueshenhe_yy = yuyueshenhe_yy;
	}
}
