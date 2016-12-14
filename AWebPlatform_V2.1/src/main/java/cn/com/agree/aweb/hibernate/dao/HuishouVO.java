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
@Table(name="huishou")
public class HuishouVO {

	@Id
	@Column(name="huishou_ID", unique=true)
	private String huishou_id;
	
	@Column(name="huishou_wpName")
	private String huishou_wpName;
	
	@Column(name="huishou_liang")
	private String huishou_liang;

	@Column(name="huishou_jldanwei")
	private String huishou_jldanwei;
	
	@Column(name="huishou_songName")
	private String huishou_songName;
	
	@Column(name="huishou_shouName")
	private String huishou_shouName;
	
	@Column(name="huishou_danwei")
	private String huishou_danwei;
	
	@Column(name="huishou_inORout")
	private String huishou_inORout;
	
	public HuishouVO(){
		super();
	}

	public String getHuishou_id() {
		return huishou_id;
	}

	public void setHuishou_id(String huishou_id) {
		this.huishou_id = huishou_id;
	}

	public String getHuishou_wpName() {
		return huishou_wpName;
	}

	public void setHuishou_wpName(String huishou_wpName) {
		this.huishou_wpName = huishou_wpName;
	}

	public String getHuishou_liang() {
		return huishou_liang;
	}

	public void setHuishou_liang(String huishou_liang) {
		this.huishou_liang = huishou_liang;
	}

	public String getHuishou_jldanwei() {
		return huishou_jldanwei;
	}

	public void setHuishou_jldanwei(String huishou_jldanwei) {
		this.huishou_jldanwei = huishou_jldanwei;
	}

	public String getHuishou_songName() {
		return huishou_songName;
	}

	public void setHuishou_songName(String huishou_songName) {
		this.huishou_songName = huishou_songName;
	}

	public String getHuishou_shouName() {
		return huishou_shouName;
	}

	public void setHuishou_shouName(String huishou_shouName) {
		this.huishou_shouName = huishou_shouName;
	}

	public String getHuishou_danwei() {
		return huishou_danwei;
	}

	public void setHuishou_danwei(String huishou_danwei) {
		this.huishou_danwei = huishou_danwei;
	}

	public String getHuishou_inORout() {
		return huishou_inORout;
	}

	public void setHuishou_inORout(String huishou_inORout) {
		this.huishou_inORout = huishou_inORout;
	}
}
