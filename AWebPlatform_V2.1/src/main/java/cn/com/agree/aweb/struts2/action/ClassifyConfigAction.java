package cn.com.agree.aweb.struts2.action;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.hibernate.dao.ClassifyConfigVO;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

public class ClassifyConfigAction extends StandardActionSupport {

	private static final long serialVersionUID = -1216692973924529007L;

	private StrutsMessage strutsMessage;

	private String mainClassify;

	private String subClassify;

	private String showType;


	/**
	 * 所有指标集合
	 * @return
	 */
	public String queryMainClassifys(){
		try {
			List<String> mainClassifyList = queryMain();
			strutsMessage = StrutsMessage.successMessage().addParameter("mainClassifyList", mainClassifyList);
		} catch (DBSupportException e) {
			e.printStackTrace();
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 所有指标属性集合
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String queryAllSubClassifys(){
		try {
			List<String> allSubClassifyList = new ArrayList<String>();
			List<ClassifyConfigVO> voList = (List<ClassifyConfigVO>) this.dbOperation.queryAllDataByClass(ClassifyConfigVO.class);
			Set<String> distinctSet = new HashSet<String>();
			if(voList != null){
				for(int i = 0, len = voList.size(); i < len; i++){
					ClassifyConfigVO vo = voList.get(i);
					if(distinctSet.add(vo.getSubClassify())){
						allSubClassifyList.add(vo.getSubClassify());
					}
				}
			}
			strutsMessage = StrutsMessage.successMessage().addParameter("allSubClassifyList", allSubClassifyList);

		} catch (DBSupportException e) {
			e.printStackTrace();
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}

	/**
	 * 指标下的属性集合
	 * @return
	 */
	public String querySubClassifys(){
		try {
			List<String> subClassifyList = querySubByMain(mainClassify);
			strutsMessage = StrutsMessage.successMessage().addParameter("subClassifyList", subClassifyList);

		} catch (DBSupportException e) {
			e.printStackTrace();
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}



	/**
	 * 获取某指标下的某个指标属性所有显示图表类型
	 * @return
	 */
	public String queryTypeByManinSub(){

		try {
			List<String> showTypeList = queryTypeByManinSub(mainClassify, subClassify);
			strutsMessage = StrutsMessage.successMessage().addParameter("showTypeList", showTypeList);

		} catch (DBSupportException e) {
			e.printStackTrace();
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 获取某个指标属性所有显示图表类型
	 * @return
	 */
	public String queryTypeBySub(){
		try {
			List<String> showTypeList = queryTypeBySub(subClassify);
			strutsMessage = StrutsMessage.successMessage().addParameter("showTypeList", showTypeList);

		} catch (DBSupportException e) {
			e.printStackTrace();
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}


	/**
	 * 获取某个指标的某个指标属性的某个图表类型的子类型
	 * @return
	 */
	public String queryStateByMainSubType(){
		try {
			List<String> stateList = queryStateByMainSubType(mainClassify, subClassify,showType);
			strutsMessage = StrutsMessage.successMessage().addParameter("stateList", stateList);
		} catch (DBSupportException e) {
			e.printStackTrace();
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 获取某个指标属性的某个图表类型的子类型
	 * @return
	 */
	public String queryStateBySubType(){
		try {
			List<String> stateList = queryStateBySubType(subClassify,showType);
			strutsMessage = StrutsMessage.successMessage().addParameter("stateList", stateList);
		} catch (DBSupportException e) {
			e.printStackTrace();
			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
		}
		return SUCCESS;
	}
	//======================================================

	/**
	 * 所有指标集合
	 * @return
	 * @throws DBSupportException 
	 */
	@SuppressWarnings("unchecked")
	public List<String>  queryMain() throws DBSupportException{
		List<String> mainClassifyList = new ArrayList<String>();
		List<ClassifyConfigVO> voList = (List<ClassifyConfigVO>) this.dbOperation.queryAllDataByClass(ClassifyConfigVO.class);
		Set<String> distinctSet = new HashSet<String>();
		if(voList != null){
			for(int i = 0, len = voList.size(); i < len; i++){
				ClassifyConfigVO vo = voList.get(i);
				if(distinctSet.add(vo.getMainClassify())){
					mainClassifyList.add(vo.getMainClassify());
				}
			}
		}
		return mainClassifyList;
	}



	/**
	 * 查找指标下的属性
	 * @return
	 * @throws DBSupportException 
	 */
	@SuppressWarnings("unchecked")
	public List<String> querySubByMain(String mainClassify) throws DBSupportException{
		List<String> subClassifyList = new ArrayList<String>();
		List<ClassifyConfigVO> voList = (List<ClassifyConfigVO>) this.dbOperation.queryDataByClass(ClassifyConfigVO.class,"mainClassify", mainClassify);
		Set<String> distinctSet = new HashSet<String>();
		if(voList != null){
			for(int i = 0, len = voList.size(); i < len; i++){
				ClassifyConfigVO vo = voList.get(i);
				if(distinctSet.add(vo.getSubClassify())){
					subClassifyList.add(vo.getSubClassify());
				}
			}
		}
		return subClassifyList;
	}


	/**
	 * 获取某指标下的某个指标属性所有显示图表类型
	 * @return
	 * @throws DBSupportException 
	 */
	@SuppressWarnings("unchecked")
	public List<String > queryTypeByManinSub(String mainClassify, String subClassify) throws DBSupportException{
		String [] params = {"mainClassify","subClassify"};
		String [] values = {mainClassify, subClassify};
		List<String> showTypeList = new ArrayList<String>();
		List<ClassifyConfigVO> voList = (List<ClassifyConfigVO>) this.dbOperation.queryDataByClass(ClassifyConfigVO.class,params,values);
		Set<String> distinctSet = new HashSet<String>();
		if(voList != null){
			for(int i = 0, len = voList.size(); i < len; i++){
				ClassifyConfigVO vo = voList.get(i);
				if(distinctSet.add(vo.getShowType())){
					showTypeList.add(vo.getShowType());
				}
			}
		}
		return showTypeList;
	}
	
	/**
	 * 获取某个指标属性所有显示图表类型
	 * @return
	 * @throws DBSupportException 
	 */
	@SuppressWarnings("unchecked")
	public List<String > queryTypeBySub(String subClassify) throws DBSupportException{
		String [] params = {"subClassify"};
		String [] values = {subClassify};
		List<String> showTypeList = new ArrayList<String>();
		List<ClassifyConfigVO> voList = (List<ClassifyConfigVO>) this.dbOperation.queryDataByClass(ClassifyConfigVO.class,params,values);
		Set<String> distinctSet = new HashSet<String>();
		if(voList != null){
			for(int i = 0, len = voList.size(); i < len; i++){
				ClassifyConfigVO vo = voList.get(i);
				if(distinctSet.add(vo.getShowType())){
					showTypeList.add(vo.getShowType());
				}
			}
		}
		return showTypeList;
	}



	/**
	 * 获取某个指标的某个指标属性的某个图表类型的子类型
	 * @return
	 * @throws DBSupportException 
	 */
	@SuppressWarnings("unchecked")
	public List<String> queryStateByMainSubType(String mainClassify, String subClassify,String showType) throws DBSupportException{
		String [] params = {"mainClassify","subClassify","showType"};
		String [] values = {mainClassify, subClassify,showType};
		List<String> stateList = new ArrayList<String>();
		List<ClassifyConfigVO> voList = (List<ClassifyConfigVO>) this.dbOperation.queryDataByClass(ClassifyConfigVO.class,params,values);
		Set<String> distinctSet = new HashSet<String>();
		if(voList != null){
			for(int i = 0, len = voList.size(); i < len; i++){
				ClassifyConfigVO vo = voList.get(i);
				if(distinctSet.add(vo.getState())){
					stateList.add(vo.getState());
				}
			}
		}
		return stateList;
	}
	
	/**
	 * 获取某个指标属性的某个图表类型的子类型
	 * @return
	 * @throws DBSupportException 
	 */
	@SuppressWarnings("unchecked")
	public List<String> queryStateBySubType(String subClassify,String showType) throws DBSupportException{
		String [] params = {"subClassify","showType"};
		String [] values = {subClassify,showType};
		List<String> stateList = new ArrayList<String>();
		List<ClassifyConfigVO> voList = (List<ClassifyConfigVO>) this.dbOperation.queryDataByClass(ClassifyConfigVO.class,params,values);
		Set<String> distinctSet = new HashSet<String>();
		if(voList != null){
			for(int i = 0, len = voList.size(); i < len; i++){
				ClassifyConfigVO vo = voList.get(i);
				if(distinctSet.add(vo.getState())){
					stateList.add(vo.getState());
				}
			}
		}
		return stateList;
	}

	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}

	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
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


}

