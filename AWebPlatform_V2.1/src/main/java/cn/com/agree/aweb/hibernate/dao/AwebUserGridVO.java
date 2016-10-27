package cn.com.agree.aweb.hibernate.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="aweb_user_grid")
public class AwebUserGridVO {

	@Id
	@Column(name="USERNAME", unique=true)
	private String username;
	
	@Column(name="GRIDCONF")
	private String gridConf;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getGridConf() {
		return gridConf;
	}
	public void setGridConf(String gridConf) {
		this.gridConf = gridConf;
	}
	
}
