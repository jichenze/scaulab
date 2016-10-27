package cn.com.agree.aweb.hibernate.dao.support;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import cn.com.agree.aweb.exception.DBSupportException;

/**
 * DaoSupport实现类
 *
 * @author Athrun tang.pm@cfischina.com Jul 23, 2015
 */
public class StandardDbSupport extends HibernateDaoSupport implements
		IDbSupport {

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#queryAllDataByClass(java.lang.Class)
	 */
	@Override
	public List<?> queryAllDataByClass(final Class<?> clazz) throws DBSupportException {
		try {
			return this.getHibernateTemplate().find("from " + clazz.getName());
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		return emptyList();
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#queryAllDataByClass(java.lang.Class, java.util.Map)
	 */
	@Override
	public List<?> queryAllDataByClass(final Class<?> clazz,
			Map<String, String> order) throws DBSupportException {
		StringBuffer hql = new StringBuffer();
		hql.append("from " + clazz.getName());
		hql.append(" order by ");
		int i = 0;
		for (String key : order.keySet()) {
			String ordervalue = order.get(key);
			if (i != 0) {
				hql.append(" , ");
			}
			hql.append(key + " " + ordervalue);
			i++;
		}
		
		try {
			return this.getHibernateTemplate().find(hql.toString());
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		return emptyList();
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#queryDataByClass(java.lang.Class, java.lang.String, java.lang.Object)
	 */
	@Override
	public List<?> queryDataByClass(final Class<?> clazz, String param,
			Object value) throws DBSupportException {
		StringBuffer hql = new StringBuffer();
		hql.append("from " + clazz.getName() + " where ");
		hql.append(param + " in (:" + param + ")");
		
		
		try {
			return this.getHibernateTemplate().findByNamedParam(hql.toString(),
					param, value);
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		return emptyList();
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#queryDataByClass(java.lang.Class, java.lang.String, java.lang.Object, java.util.Map)
	 */
	@Override
	public List<?> queryDataByClass(final Class<?> clazz, String param,
			Object value, Map<String, String> order) throws DBSupportException {
		StringBuffer hql = new StringBuffer();
		hql.append("from " + clazz.getName() + " where ");
		hql.append(param + " in (:" + param + ")");
		hql.append(" order by ");
		int i = 0;
		for (String key : order.keySet()) {
			String ordervalue = order.get(key);
			if (i != 0) {
				hql.append(" , ");
			}
			hql.append(key + " " + ordervalue);
			i++;
		}
		
		try {
			return this.getHibernateTemplate().findByNamedParam(hql.toString(),
					param, value);
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		return emptyList();
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#queryDataByClass(java.lang.Class, java.lang.String[], java.lang.Object[])
	 */
	@Override
	public List<?> queryDataByClass(final Class<?> clazz, String[] param,
			Object[] values) throws DBSupportException {
		StringBuffer hql = new StringBuffer();
		hql.append("from " + clazz.getName() + " where ");
		for (int i = 0; i < param.length; i++) {
			if (i != 0) {
				hql.append(" and ");
			}
			hql.append(param[i] + " in (:" + param[i] + ")");
		}
		
		try {
			return this.getHibernateTemplate().findByNamedParam(hql.toString(),
					param, values);
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		return emptyList();
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#queryDataBySql(java.lang.String)
	 */
	@Override
	public List<?> queryDataBySql(String sql) throws DBSupportException {
		
		try {
			Session session = this.getSessionFactory().getCurrentSession();
			session.beginTransaction();
			List<?> list = session.createSQLQuery(sql).list();
			session.close();
			return list;
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		return emptyList();
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#queryDataByHql(java.lang.String)
	 */
	@Override
	public List<?> queryDataByHql(String hql) throws DBSupportException {
		try {
			Session session = this.getSessionFactory().getCurrentSession();
			session.beginTransaction();
			List<?> list = session.createQuery(hql).list();
			session.close();
			return list;
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		return emptyList();
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#queryDataById(java.lang.Class, java.io.Serializable)
	 */
	@Override
	public Object queryDataById(Class<?> model, Serializable id) throws DBSupportException {
		if (id == null) {
			return null;
		}
		
		try {
			return this.getHibernateTemplate().get(model, id);
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#queryTotalCount(java.lang.String, java.util.Map)
	 */
	@Override
	public int queryTotalCount(String hql, Map<?, ?> map) throws DBSupportException {
		try {
			Session session = this.getSessionFactory().getCurrentSession();
			session.beginTransaction();
			Query query = session.createQuery(hql);
			Iterator<?> it = map.keySet().iterator();
			while (it.hasNext()) {
				Object key = it.next();
				query.setParameter(key.toString(), map.get(key));
			}
			List<?> list = query.list();
			session.close();
			return list.size();
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		return 0;
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#queryByPage(java.lang.String, int, int, java.util.Map)
	 */
	@Override
	public List<?> queryByPage(final String hql, final int offset,
			final int length, final Map<?, ?> map) throws DBSupportException {
		try {
			List<?> list = this.getHibernateTemplate().executeFind(
					new HibernateCallback<Object>() {
						@Override
						public Object doInHibernate(Session session)
								throws RuntimeException, SQLException {
							Query query = session.createQuery(hql);
							// 设置参数
							Iterator<?> it = map.keySet().iterator();
							while (it.hasNext()) {
								Object key = it.next();
								query.setParameter(key.toString(), map.get(key));
							}
							query.setFirstResult(offset);
							query.setMaxResults(length);
							return query.list();
						}

					});
			return list;
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		return emptyList();
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#deleteSingleData(java.lang.Object)
	 */
	@Override
	public void deleteSingleData(Object obj) throws DBSupportException {
		try {
			super.getHibernateTemplate().delete(obj);
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#deleteSingleDataById(java.lang.Class, java.io.Serializable)
	 */
	@Override
	public void deleteSingleDataById(Class<?> clazz, Serializable id) throws DBSupportException {
		super.getHibernateTemplate().delete(this.queryDataById(clazz, id));
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#deleteDatasByCollection(java.util.Collection)
	 */
	@Override
	public void deleteDatasByCollection(Collection<?> entities) throws DBSupportException {
		try {
			super.getHibernateTemplate().deleteAll(entities);
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
	}

	/**
	 * 
	 * @param clazz
	 * @param param
	 * @param value
	 * @throws DBSupportException 
	 * @throws RuntimeException 
	 */
	public void deteleDataByClass(final Class<?> clazz, String param,
			Object value) throws DBSupportException {
		this.getHibernateTemplate().deleteAll(
				queryDataByClass(clazz, param, value));
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#saveSingleData(java.lang.Object)
	 */
	@Override
	public Serializable saveSingleData(Object obj) throws DBSupportException {
		try {
			Serializable flag;
			flag = super.getHibernateTemplate().save(obj);
			return flag;
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		
		return null;
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#saveOrUpdateAllData(java.util.Collection)
	 */
	@Override
	public void saveOrUpdateAllData(Collection<?> allData) throws DBSupportException {
		try {
			super.getHibernateTemplate().saveOrUpdateAll(allData);
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#updateSingleData(java.lang.Object)
	 */
	@Override
	public void updateSingleData(Object obj) throws DBSupportException {
		try {
			super.getHibernateTemplate().update(obj);
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#saveOrUpdateSingleData(java.lang.Object)
	 */
	@Override
	public void saveOrUpdateSingleData(Object obj) throws DBSupportException {
		try {
			super.getHibernateTemplate().saveOrUpdate(obj);
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#executeHQL(java.lang.String, java.util.Map)
	 */
	@Override
	public boolean executeHQL(String hql, Map<?, ?> parameters) throws DBSupportException {
		try {
			
			Session session = this.getSessionFactory().getCurrentSession();
			boolean close = false;
			if (session == null || session.isOpen()) {
				session = this.getSessionFactory().openSession();
				close = true;
			}
			
			Query query = session.createQuery(hql);
			
			Iterator<?> it = parameters.keySet().iterator();
			while (it.hasNext()) {
				Object key = it.next();
				Object value = parameters.get(key);
				if (value instanceof Collection) {
					query.setParameterList(key.toString(), (Collection<?>) value);
				} else {
					query.setParameter(key.toString(), value);
				}
			}
			int i = query.executeUpdate(); // i表示更新的条数
			
			if (close) {
				session.close();
			}
			
			return i >= 0 ? Boolean.TRUE : Boolean.FALSE;
			
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		
		return Boolean.FALSE;
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#executeHQL(java.lang.String)
	 */
	@Override
	public boolean executeHQL(String hql) throws DBSupportException {
		try {
			Session session = this.getSessionFactory().getCurrentSession();
			boolean close = false;
			if (session == null || session.isOpen()) {
				session = this.getSessionFactory().openSession();
				close = true;
			}
			Query query = session.createQuery(hql);
			int i = query.executeUpdate();
			if (close) {
				session.close();
			}
			return i >= 0 ? Boolean.TRUE : Boolean.FALSE;
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		
		return Boolean.FALSE;
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#executeSQL(java.lang.String)
	 */
	@Override
	public boolean executeSQL(String sql) throws DBSupportException {
		try {
			Session session = this.getSessionFactory().getCurrentSession();
			boolean close = false;
			if (session == null || session.isOpen()) {
				session = this.getSessionFactory().openSession();
				close = true;
			}
			Query query = session.createSQLQuery(sql);
			int i = query.executeUpdate(); // i表示更新的条数
			if (close) {
				session.close();
			}
			return i >= 0 ? Boolean.TRUE : Boolean.FALSE;
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		
		return Boolean.FALSE;
	}

	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#executeSQLQuery(java.lang.String, java.util.List)
	 */
	@Override
	public List<?> executeSQLQuery(final String sql, final List<Object> params) throws DBSupportException {
		try {
			return (List<?>) this.getHibernateTemplate().execute(
					new HibernateCallback<Object>() {
						public Object doInHibernate(final Session session)
								throws RuntimeException, SQLException {
							final SQLQuery query = session.createSQLQuery(sql);

							if (params != null) {
								for (int i = 0; i < params.size(); i++) {
									query.setParameter(i, params.get(i));
								}
							}
							return query.list();
						}
					});
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
		
		return emptyList();
	}
	
	/*
	 * (non-Javadoc)
	 * @see cn.com.agree.aweb.hibernate.dao.support.IDbSupport#clearCache()
	 */
	@Override
	public void clearCache() throws DBSupportException {
		try {
			getHibernateTemplate().clear();
		} catch (RuntimeException e) {
			handleRuntimeException(e);
		}
	}
	
	/**
	 * 返回新的session，需要手动关闭
	 * @return
	 */
	public Session newSession() {
		return this.getSessionFactory().openSession();
	}

	/**
	 * 将RuntimeException转为DBSupportException抛出
	 * @param e
	 * @throws DBSupportException
	 */
	private static void handleRuntimeException(RuntimeException e) throws DBSupportException {
		throw new DBSupportException(e);
	}
	
	/**
	 * 返回空列表
	 * @return
	 */
	private static List<?> emptyList() {
		return new ArrayList<Object>();
	}
	
}
