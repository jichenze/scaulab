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
@Table(name="lingyong")
public class LingyongVO {

	@Id
	@Column(name="lingyong_ID", unique=true)
	private String lingyong_id;
	
	@Column(name="lingyong_wpName")
	private String lingyong_wpName;
	
	@Column(name="lingyong_wpleixing")
	private String lingyong_wpleixing;

	@Column(name="lingyong_sl")
	private String lingyong_sl;
	
	@Column(name="lingyong_jldanwei")
	private String lingyong_jldanwei;
	
	@Column(name="lingyong_renName")
	private String lingyong_renName;
	
	@Column(name="lingyong_renID")
	private String lingyong_renID;
	
	@Column(name="lingyong_phNumber")
	private String lingyong_phNumber;
	
	@Column(name="lingyong_renName2")
	private String lingyong_renName2;
	
	@Column(name="lingyong_renID2")
	private String lingyong_renID2;
	
	@Column(name="lingyong_phNumber2")
	private String lingyong_phNumber2;
	
	@Column(name="lingyong_yyYN")
	private String lingyong_yyYN;
	
	@Column(name="lingyong_frName")
	private String lingyong_frName;
	
	public LingyongVO(){
		super();
	}

	public String getLingyong_id() {
		return lingyong_id;
	}

	public void setLingyong_id(String lingyong_id) {
		this.lingyong_id = lingyong_id;
	}

	public String getLingyong_wpName() {
		return lingyong_wpName;
	}

	public void setLingyong_wpName(String lingyong_wpName) {
		this.lingyong_wpName = lingyong_wpName;
	}

	public String getLingyong_wpleixing() {
		return lingyong_wpleixing;
	}

	public void setLingyong_wpleixing(String lingyong_wpleixing) {
		this.lingyong_wpleixing = lingyong_wpleixing;
	}

	public String getLingyong_sl() {
		return lingyong_sl;
	}

	public void setLingyong_sl(String lingyong_sl) {
		this.lingyong_sl = lingyong_sl;
	}

	public String getLingyong_jldanwei() {
		return lingyong_jldanwei;
	}

	public void setLingyong_jldanwei(String lingyong_jldanwei) {
		this.lingyong_jldanwei = lingyong_jldanwei;
	}

	public String getLingyong_renName() {
		return lingyong_renName;
	}

	public void setLingyong_renName(String lingyong_renName) {
		this.lingyong_renName = lingyong_renName;
	}

	public String getLingyong_renID() {
		return lingyong_renID;
	}

	public void setLingyong_renID(String lingyong_renID) {
		this.lingyong_renID = lingyong_renID;
	}

	public String getLingyong_phNumber() {
		return lingyong_phNumber;
	}

	public void setLingyong_phNumber(String lingyong_phNumber) {
		this.lingyong_phNumber = lingyong_phNumber;
	}

	public String getLingyong_renName2() {
		return lingyong_renName2;
	}

	public void setLingyong_renName2(String lingyong_renName2) {
		this.lingyong_renName2 = lingyong_renName2;
	}

	public String getLingyong_renID2() {
		return lingyong_renID2;
	}

	public void setLingyong_renID2(String lingyong_renID2) {
		this.lingyong_renID2 = lingyong_renID2;
	}

	public String getLingyong_phNumber2() {
		return lingyong_phNumber2;
	}

	public void setLingyong_phNumber2(String lingyong_phNumber2) {
		this.lingyong_phNumber2 = lingyong_phNumber2;
	}

	public String getLingyong_yyYN() {
		return lingyong_yyYN;
	}

	public void setLingyong_yyYN(String lingyong_yyYN) {
		this.lingyong_yyYN = lingyong_yyYN;
	}

	public String getLingyong_frName() {
		return lingyong_frName;
	}

	public void setLingyong_frName(String lingyong_frName) {
		this.lingyong_frName = lingyong_frName;
	}
}
