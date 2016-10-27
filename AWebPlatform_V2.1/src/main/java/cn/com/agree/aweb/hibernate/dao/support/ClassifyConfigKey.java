package cn.com.agree.aweb.hibernate.dao.support;

import java.io.Serializable;

import javax.persistence.Column;

public class ClassifyConfigKey implements Serializable {

	private static final long serialVersionUID = -6197252211068482529L;

	@Column(name="SHOWTYPE")
	private String showType;
	
	@Column(name="SUBCLASSIFY")
	private String subClassify;
	
	@Column(name="STATE")
	private String state;

	public ClassifyConfigKey() {
	}


	public ClassifyConfigKey(String showType, String subClassify,String state) {
		super();
		this.showType = showType;
		this.subClassify = subClassify;
		this.state=state;
	}

	public String getShowType() {
		return showType;
	}


	public void setShowType(String showType) {
		this.showType = showType;
	}


	public String getSubClassify() {
		return subClassify;
	}


	public void setSubClassify(String subClassify) {
		this.subClassify = subClassify;
	}
	
	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((showType == null) ? 0 : showType.hashCode());
		result = prime * result + ((state == null) ? 0 : state.hashCode());
		result = prime * result + ((subClassify == null) ? 0 : subClassify.hashCode());
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ClassifyConfigKey other = (ClassifyConfigKey) obj;
		if (showType == null) {
			if (other.showType != null)
				return false;
		} else if (!showType.equals(other.showType))
			return false;
		if (state == null) {
			if (other.state != null)
				return false;
		} else if (!state.equals(other.state))
			return false;
		if (subClassify == null) {
			if (other.subClassify != null)
				return false;
		} else if (!subClassify.equals(other.subClassify))
			return false;
		return true;
	}


	
}
