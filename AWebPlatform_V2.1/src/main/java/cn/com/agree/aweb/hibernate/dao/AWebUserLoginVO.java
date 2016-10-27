package cn.com.agree.aweb.hibernate.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="aweb_user_login")
public class AWebUserLoginVO {

	@Id
	@Column(name="USERNAME", nullable=false, unique=true)
	private String username;

	@Column(name="SESSIONID")
	private String sessionId;

	@Column(name="LASTHOST")
	private String lastHost;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public String getLastHost() {
		return lastHost;
	}

	public void setLastHost(String lastHost) {
		this.lastHost = lastHost;
	}

}
