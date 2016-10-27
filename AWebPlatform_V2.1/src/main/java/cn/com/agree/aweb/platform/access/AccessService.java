package cn.com.agree.aweb.platform.access;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.hibernate.dao.AccessMenuVO;
import cn.com.agree.aweb.hibernate.dao.AWebUserVO;
import cn.com.agree.aweb.hibernate.dao.AWebDeviceVO;
import cn.com.agree.aweb.hibernate.dao.AccessVO;
import cn.com.agree.aweb.hibernate.dao.RoleRelevanceAccessVO;
import cn.com.agree.aweb.hibernate.dao.UserRelevancyRoleVO;
import cn.com.agree.aweb.hibernate.dao.support.IDbSupport;

/**
 * @Description: 
 * @Title: AccessService.java 
 * @Package cn.com.agree.aweb.struts2.action 
 * @author Athrun tang.pm@cfischina.com
 * @date 2015年8月10日 下午4:42:53 
 * @version V1.0
 */
public class AccessService {
	
	/**
	 * @Description: 处理用户操作权限
	 * @author Athrun tang.pm@cfischina.com
	 * @date 2015年8月10日 下午4:46:03 
	 * @version V1.0
	 */
	@SuppressWarnings("unchecked")
	public static void disposeUserAccess(AWebUserVO userVO,IDbSupport dbOperation){
		HttpSession session = ServletActionContext.getRequest().getSession();
		
		List<String> accessList = new ArrayList<String>();				//所有权限集合：菜单、控制、显示
		Set<String> menuAccessSet = new HashSet<String>();  	//菜单权限集合
		Set<String>treeMenuAccessSet  = new HashSet<String>();  	//动态菜单树结构菜单权限ID集合
		String rootPath="/";
		List<AWebDeviceVO> treeMenuAccessList = new ArrayList<AWebDeviceVO>();			//动态菜单树结构菜单权限集合
		List<AccessMenuVO> menuAccessVOSet = new ArrayList<AccessMenuVO>();			//权限过滤后的菜单
		Set<String> controlAccessSet = new HashSet<String>();  //控制权限集合
		Set<String> showAccessSet = new HashSet<String>();  //显示权限集合
		
		boolean isAdmin = false;		//判断是否为管理员,
		if(userVO.getUsertype().equals(Constants.DB_AGREEUSER_TYPE_0)){
			isAdmin = true;
		}
		
		try {
			List<UserRelevancyRoleVO> urrlist = null;
			if(!isAdmin){
				//获取对应角色
				urrlist = (List<UserRelevancyRoleVO>) dbOperation.queryDataByClass(UserRelevancyRoleVO.class, "username", userVO.getUsername());
			}
			
			if((urrlist!=null&&urrlist.size()>0)||isAdmin){
				List<AccessVO> accesslist;
				List<AWebDeviceVO> treeAccesslist;
				if(isAdmin){		
					//管理员拥有所有权限
					accesslist = (List<AccessVO>) dbOperation.queryAllDataByClass(AccessVO.class);
					treeAccesslist = (List<AWebDeviceVO>) dbOperation.queryAllDataByClass(AWebDeviceVO.class);
				}else{
					//获取用户对应的角色IDS
					List<String> roleIDS = new ArrayList<String>();
					for(UserRelevancyRoleVO vo : urrlist){
						roleIDS.add(vo.getRoleId());
					}
					
					List<RoleRelevanceAccessVO> rralist = (List<RoleRelevanceAccessVO>) dbOperation.queryDataByClass(RoleRelevanceAccessVO.class,"roleID",roleIDS);
					
					if(rralist.size()>0){
						List<String> accessIDS = new ArrayList<String>();
						for(RoleRelevanceAccessVO vo : rralist){
							accessIDS.add(vo.getAccessId());
						}
						accesslist = (List<AccessVO>) dbOperation.queryDataByClass(AccessVO.class, "id", accessIDS);
						treeAccesslist = (List<AWebDeviceVO>) dbOperation.queryDataByClass(AWebDeviceVO.class, "path", accessIDS);
					}else{
						accesslist = null;
						treeAccesslist = null;
					}
				}
				
				if(accesslist!=null){
					for(AccessVO vo : accesslist){
						if(Constants.DB_ACCESS_STATE_TRUE.equals(vo.getState())){		//判断权限是否生效
							accessList.add(vo.getId());
							
							switch(Integer.valueOf(vo.getType())){
								case 0 :	
									menuAccessSet.add(vo.getElementId());
									break;
								case 1 :	
									controlAccessSet.add(vo.getElementId());
									break;
								case 2 :	
									showAccessSet.add(vo.getId());
									break;
							}
						}
					}
					if(treeAccesslist!=null){
						for(AWebDeviceVO vo : treeAccesslist){
							rootPath=getRoot(rootPath,vo.getPath());
							accessList.add(vo.getPath());
							treeMenuAccessSet.add(vo.getPath());
							treeMenuAccessList.add(vo);
						}
					
						menuAccessVOSet = (List<AccessMenuVO>) dbOperation.queryDataByClass(AccessMenuVO.class,"id",menuAccessSet);
					}
				}
			}
			//将权限集合放入session
			session.setAttribute(Constants.SESSION_USER_PATH, rootPath);
			session.setAttribute(Constants.SESSION_USER_ACCESS_LIST, accessList);
			session.setAttribute(Constants.SESSION_USER_ACCESS_IDS_TREE_MENU, treeMenuAccessSet);
			session.setAttribute(Constants.SESSION_USER_ACCESS_LIST_TREE_MENU, treeMenuAccessList);
			session.setAttribute(Constants.SESSION_USER_ACCESS_LIST_MENU, menuAccessSet);
			session.setAttribute(Constants.SESSION_USER_MENUACCESS_VOS_SET, menuAccessVOSet);
			session.setAttribute(Constants.SESSION_USER_ACCESS_LIST_CONTROL, controlAccessSet);
			session.setAttribute(Constants.SESSION_USER_ACCESS_LIST_SHOW, showAccessSet);
				
		} catch (DBSupportException e) {
			e.printStackTrace();
		}
		
	}
	
	private static String getRoot(String path1,String path2){
		String root="/";
		if(null==path1||path1.equals("/")||null==path2||path2.equals("/")){
			if(null==path2||path2.equals("/")){
				root=(null==path1?"/":path1);
			}else{
				root=(null==path2?"/":path2);
			}
		}else{
			String[] strs1=path1.split("/");
			String[] strs2=path1.split("/");
			for(int i=0;i<(strs1.length<strs2.length?strs1.length:strs2.length);i++){
				if(strs1[i].equals(strs2[i])){
					root=root+"/"+strs1[i];
				}else{
					break;
				}
			}
		}
		return root;
	}
	
	
	
}
