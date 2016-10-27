package cn.com.agree.aweb.struts2.action;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.hibernate.dao.*;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CommonUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import java.io.UnsupportedEncodingException;
import java.util.*;

/**
 * Created by lijiancheng@cfischina.com on 2016/5/13 2037.
 */
public class CamaComponentPagesAction extends StandardActionSupport {

    private static final long serialVersionUID = -1527240071313726499L;

    /*dim*/
    private String id;
    private String name;
    private String config;
    private String createUser=getSession().getAttribute(Constants.SESSION_USERNAME).toString();


    private StrutsMessage strutsMessage;


    /*getter & setter*/

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setConfig(String config) {
        this.config = config;
    }

    public StrutsMessage getStrutsMessage() {
        return strutsMessage;
    }


    /*新增某个页面、保存某个页面*/
    @SuppressWarnings("unchecked")
    public String create(){
        CamaComponentPagesVO camaComponentPagesVO=null;
        String[] result;
        try {
            if (id != null) {
                //这个为更新保存
                camaComponentPagesVO = (CamaComponentPagesVO) this.dbOperation.queryDataById(CamaComponentPagesVO.class, id);
                if (camaComponentPagesVO == null) {
                    strutsMessage = StrutsMessage.errorMessage("找不到该ID[" + id + "]对应的CAMA组件页面，请确认是否已被删除！");
                } else {
                    camaComponentPagesVO.setUpdateTime(CommonUtils.formatTime(new Date().getTime()));
                }
            } else{
                String[] keys = {"name"};
                Object[] values = {name};
                List<CamaComponentPagesVO> pagesVOList = (List<CamaComponentPagesVO>) dbOperation.queryDataByClass(CamaComponentPagesVO.class, keys, values);
                if (pagesVOList.size() > 0) {
                    strutsMessage = StrutsMessage.errorMessage("当前CAMA组件页面(" + name + ")已存在，不能重复创建");
                } else {
                    //新建保存或另存为
                    camaComponentPagesVO = new CamaComponentPagesVO();
                }
            }

            if (camaComponentPagesVO != null) {
                if(name!=null){
                    camaComponentPagesVO.setName(name);
                }
                camaComponentPagesVO.setCreateUser(createUser);
                if(config!=null){
                    camaComponentPagesVO.setConfig(config);
                }

                this.dbOperation.saveOrUpdateSingleData(camaComponentPagesVO);
                strutsMessage = StrutsMessage.successMessage().addParameter("id",camaComponentPagesVO.getId());
            }

        } catch (DBSupportException e) {
            strutsMessage = StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB50, e);
        }  catch (UnsupportedEncodingException e) {
            strutsMessage = StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB03, e);
        }

        return SUCCESS;
    }


    /*删除某个配置页面*/
    public String delete(){
        String[] ids=id.split(",");
        JSONArray jsonArray=new JSONArray();
        try{
            for(int i=0;i<ids.length;i++){
                CamaComponentPagesVO camaComponentPagesVO = (CamaComponentPagesVO)this.dbOperation.queryDataById(CamaComponentPagesVO.class,ids[i]);
                JSONObject jsonObject=new JSONObject();
                if(camaComponentPagesVO!=null){
                   this.dbOperation.deleteSingleData(camaComponentPagesVO);
                    jsonObject.put("successMsg", "删除schema(" + camaComponentPagesVO.getName() + ")成功！");
                    
                    jsonObject.put("successID", camaComponentPagesVO.getId());
                }else{
                    jsonObject.put("errorMsg","该CAMA组件页面("+ids[i]+")不存在，可能已被删除");
                }
                jsonArray.add(jsonObject);
            }
            strutsMessage = StrutsMessage.successMessage().addParameter("aaData", jsonArray);
        }catch (DBSupportException e){
            strutsMessage = StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB50, e);
        }
        return SUCCESS;
    }


    /*返回所有页面的列表*/
    /*
    * 查多个
    * */
    @SuppressWarnings("unchecked")
    public String queryList() {
        try {
            Map<String, String> order = new HashMap<String, String>();
            order.put("createTime", "desc");
            List<CamaComponentPagesVO> pagesVOList = (ArrayList<CamaComponentPagesVO>) this.dbOperation
                    .queryAllDataByClass(CamaComponentPagesVO.class, order);
            JSONArray jsonArray = new JSONArray();

            for (int i = 0; i < pagesVOList.size(); i++) {
                JSONArray item = new JSONArray();
                CamaComponentPagesVO camaComponentPagesVO = pagesVOList.get(i);
                item.add(camaComponentPagesVO.getId());
                item.add(camaComponentPagesVO.getName());
                item.add(camaComponentPagesVO.getCreateUser());
                item.add(camaComponentPagesVO.getCreateTime());
                jsonArray.add(item);
            }

            strutsMessage = StrutsMessage.successMessage().addParameter("aaData", jsonArray);
        } catch (DBSupportException e) {
            strutsMessage = StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB50, e);
        }

        return SUCCESS;
    }


    /*返回某个页面的配置*/
    public String querySingle(){
        if (id == null) {
            strutsMessage = StrutsMessage.errorMessage("CAMA组件页面ID不能为空！");
        } else {
            try {
                CamaComponentPagesVO camaComponentPagesVO = (CamaComponentPagesVO) this.dbOperation.queryDataById(CamaComponentPagesVO.class, id);
                JSONObject jsonObject=new JSONObject();

                jsonObject.put("id",camaComponentPagesVO.getId());
                jsonObject.put("name",camaComponentPagesVO.getName());
                jsonObject.put("createTime",camaComponentPagesVO.getCreateTime());
                jsonObject.put("createUser",camaComponentPagesVO.getCreateUser());
                jsonObject.put("config",camaComponentPagesVO.getConfigStr());


                strutsMessage = StrutsMessage.successMessage().addParameter("page", jsonObject);
            } catch (DBSupportException e) {
                strutsMessage = StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB50, e);
            }
        }

        return SUCCESS;
    }
}
