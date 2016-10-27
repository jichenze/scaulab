package cn.com.agree.aweb.hibernate.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="aweb_monitor_infoquery")
public class MonitorVO {
	@Id
	@Column(name="detail_arr", nullable=false, unique=true)
	private String detail_arr;
	
	@Column(name="query_flag")
	private String query_flag;
	
	@Column(name="close_num")
	private String close_num;
	
	@Column(name="unclose_num")
	private String unclose_num;
	
	@Column(name="group_name")
	private String group_name;
	
	@Column(name="group_close_num")
	private String group_close_num;
	
	@Column(name="group_unclose_num")
	private String group_unclose_num;
	public MonitorVO(){}
	public MonitorVO(String query_flag, String close_num, String unclose_num,
			String detail_arr, String group_name, String group_close_num,
			String group_unclose_num) {
		this.query_flag = query_flag;
		this.close_num = close_num;
		this.unclose_num = unclose_num;
		this.detail_arr = detail_arr;
		this.group_name = group_name;
		this.group_close_num = group_close_num;
		this.group_unclose_num = group_unclose_num;
	}


	public String getQuery_flag() {
		return query_flag;
	}


	public void setQuery_flag(String query_flag) {
		this.query_flag = query_flag;
	}


	public String getClose_num() {
		return close_num;
	}


	public void setClose_num(String close_num) {
		this.close_num = close_num;
	}


	public String getUnclose_num() {
		return unclose_num;
	}


	public void setUnclose_num(String unclose_num) {
		this.unclose_num = unclose_num;
	}


	public String getDetail_arr() {
		return detail_arr;
	}


	public void setDetail_arr(String detail_arr) {
		this.detail_arr = detail_arr;
	}


	public String getGroup_name() {
		return group_name;
	}


	public void setGroup_name(String group_name) {
		this.group_name = group_name;
	}


	public String getGroup_close_num() {
		return group_close_num;
	}


	public void setGroup_close_num(String group_close_num) {
		this.group_close_num = group_close_num;
	}


	public String getGroup_unclose_num() {
		return group_unclose_num;
	}


	public void setGroup_unclose_num(String group_unclose_num) {
		this.group_unclose_num = group_unclose_num;
	}

}
