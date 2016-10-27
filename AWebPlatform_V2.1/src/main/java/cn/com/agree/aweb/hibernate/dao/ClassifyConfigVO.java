package cn.com.agree.aweb.hibernate.dao;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.hibernate.dao.support.ClassifyConfigKey;

@Entity
@Table(name="aweb_classify_config")
@IdClass(ClassifyConfigKey.class)
public class ClassifyConfigVO implements Serializable{
	
	private static final long serialVersionUID = -7892714606794027588L;

	@Column(name="MAINCLASSIFY")
	private String mainClassify;
	
	@Id
	private String subClassify;
	
	@Id
	private String state;
	
	@Id
	private String showType;

	@Column(name="COLUMNCONFIG", columnDefinition="BLOB")
	private byte[] columnConfig;
	
	
	public byte[] getColumnConfig() {
		return columnConfig;
	}

	public String getStringConfig() {
		try {
			return new String(columnConfig, Constants.ENCODING_UTF8);
		} catch (UnsupportedEncodingException e) {
			return "";
		}
	}

	public void setColumnConfig(byte[] columnConfig) {
		this.columnConfig = columnConfig;
	}

	public void setColumnConfig(String columnConfig) throws UnsupportedEncodingException {
		this.columnConfig = columnConfig.getBytes(Constants.ENCODING_UTF8);
	}
	
	public String getMainClassify() {
		return mainClassify;
	}

	public void setMainClassify(String mainClassify) {
		this.mainClassify = mainClassify;
	}

	public String getSubClassify() {
		return subClassify;
	}

	public void setSubClassify(String subClassify) {
		this.subClassify = subClassify;
	}
	public String getShowType() {
		return showType;
	}

	public void setShowType(String showType) {
		this.showType = showType;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	
	
}
