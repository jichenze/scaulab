package cn.com.agree.aweb.hibernate.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * 用户VO
 *
 * @author lihao lihao01@cfischina.com
 * Jul 23, 2015
 */
@Entity
@Table(name="aweb_user")
public class AWebUserVO {

	@Id
	@Column(name="USERNAME", nullable=false, unique=true)
	private String username;

	@Column(name="PASSWORD")
	private String password;

	@Column(name="NICKNAME")
	private String nickname;

	@Column(name="IP")
	private String ip;

	@Column(name="MAILBOX")
	private String mailbox;

	@Column(name="TELEPHONE")
	private String telephone;

	@Column(name="CREATEUSER")
	private String createUser;

	@Column(name="CREATETIME")
	private String createTime;

	@Column(name="UPDATETIME")
	private String updateTime;

	@Column(name="LOGINTIME")
	private String loginTime;

	@Column(name="LOCKTIME")
	private String locktime;
	
	@Column(name="CONTINUOUSERRORNUM")
	private String continuouserrornum;		//连续登录错误次数

	@Column(name="USERTYPE")
	private String usertype;

	@Column(name="STATE")
	private String state;	//状态：是否生效

	@Column(name="REMARK")
	private String remark;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMailbox() {
		return mailbox;
	}

	public void setMailbox(String mailbox) {
		this.mailbox = mailbox;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

	public String getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(String loginTime) {
		this.loginTime = loginTime;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getUsertype() {
		return usertype;
	}

	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getLocktime() {
		return locktime;
	}

	public void setLocktime(String locktime) {
		this.locktime = locktime;
	}

	public String getContinuouserrornum() {
		return continuouserrornum;
	}

	public void setContinuouserrornum(String continuouserrornum) {
		this.continuouserrornum = continuouserrornum;
	}
}
