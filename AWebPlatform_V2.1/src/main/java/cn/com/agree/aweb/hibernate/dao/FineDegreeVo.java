package cn.com.agree.aweb.hibernate.dao;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
/**
* @ClassName: FineDegreeVo
* @Description: 健康度关注表
* @author mailikuan@office.cgbchina
* @date 2016年5月26日 下午4:24:40
*
*/
@Entity
@Table(name="aweb_finedegree")
public class FineDegreeVo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
    
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID",unique=true)
	private int id;
	@Column(name="USERID")
    private String userId;
    
	@Column(name="SYSTEMNAME")
    private String systemName;
    
	@Column(name="VIEWID")
    private String  viewId;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getSystemName() {
		return systemName;
	}

	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}

	public String getViewId() {
		return viewId;
	}

	public void setViewId(String viewId) {
		this.viewId = viewId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
}
