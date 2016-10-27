package cn.com.agree.aweb.struts2.action;

import java.util.Date;
import java.util.Iterator;
import java.util.Set;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CommonUtils;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

/**
 * Created by lijianheng@cfischina.com on 2015/10/29 0029.
 */
public class TestChartsAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3967419208319187857L;
	private String type;
	private int size;
	private long total;
	private String nodes;
	
	private String staticType;

	private StrutsMessage strutsMessage;

	private String reqParams;

	private JSONObject requestParams;

	/*
	 * size 获取随机数的大小
	 * */
	public String loadNewLineOrBarData() {
		if(size>0) {
			JSONArray aaData = new JSONArray();

			for (int i = 0; i < size; i++) {
				aaData.add(Math.random());
			}
			strutsMessage=StrutsMessage.successMessage().addParameter("aaData",aaData);
		}
		return SUCCESS;
	}


	/*
	 * 随机生成拓扑图
	 * */
	public String loadTopologyData(){

		if(size>0) {
			JSONObject types = new JSONObject();
			JSONArray nodes=new JSONArray();
			JSONArray links=new JSONArray();
			String[] typeList = {"柜面", "手机", "网银", "POS", "AFA", "ESB", "AFE", "AS4000"};
			String[] nodeIds=new String[typeList.length*size];

			for(int i=0;i<typeList.length;i++) {
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("index", i);
				types.put(typeList[i], jsonObject);

				for(int j=0,nodeSize=size;j<nodeSize;j++) {
					JSONObject node = new JSONObject();
					node.put("id", java.util.UUID.randomUUID().toString());
					node.put("category", i);
					node.put("name", typeList[i] + j);
					node.put("value", i * 2 + 1);

					nodeIds[i*nodeSize+j]=node.getString("id");

					nodes.add(node);
				}

				if(i>0){
					for(int j=0,linkSize=size*2;j<linkSize;j++) {
						JSONObject link = new JSONObject();
						int sourceIndex = (int) (Math.random() * i * size);
						int targetIndex = i * size + (int) (Math.random() * size);
						int weight = 10;

						link.put("sourceID", nodes.getJSONObject(sourceIndex).getString("id"));//id是非必需的，只是为了显示图例时容易找到
						link.put("source", nodes.getJSONObject(sourceIndex).getString("name"));
						link.put("targetID", nodes.getJSONObject(targetIndex).getString("id"));
						link.put("target", nodes.getJSONObject(targetIndex).getString("name"));
						link.put("weight", weight);

						links.add(link);
					}
				}
			}

			strutsMessage=StrutsMessage.successMessage()
					.addParameter("types",types)
					.addParameter("nodes",nodes)
					.addParameter("links", links)
					.addParameter("nodeIds",nodeIds)
					.addParameter("nodeInfos", loadNodeInfo(nodeIds));

		}

		return SUCCESS;
	}



	public String loadTopologyDataByRelative(){
		JSONObject types = new JSONObject();
		JSONArray nodes=new JSONArray();
		JSONArray links=new JSONArray();
		String[] typeList = {"柜面", "手机", "网银", "POS", "AFA", "AFE","ESB", "AS4000"};
		int[][] typeLink = {{-1,-1},{-1,-1},{-1,-1},{-1,-1},{0,3},{4,4},{5,5},{6,6}};
		String[] nodeIds=new String[typeList.length+2];

		for(int i=0;i<typeList.length;i++) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("index", i);
			types.put(typeList[i], jsonObject);

			JSONObject node = new JSONObject();
			node.put("id", java.util.UUID.randomUUID().toString());
			node.put("category", i);
			node.put("name", typeList[i]);
			node.put("value", i * 2 + 1);

			nodeIds[i] = node.getString("id");

			nodes.add(node);

			for(int start=typeLink[i][0],end=typeLink[i][1];start>=0&&start<=end;start++) {
				JSONObject link = new JSONObject();
				int sourceIndex = start;
				int targetIndex = i;
				int weight = 10;

				link.put("sourceID", nodes.getJSONObject(sourceIndex).getString("id"));//id是非必需的，只是为了显示图例时容易找到
				link.put("source", nodes.getJSONObject(sourceIndex).getString("name"));
				link.put("targetID", nodes.getJSONObject(targetIndex).getString("id"));
				link.put("target", nodes.getJSONObject(targetIndex).getString("name"));
				link.put("weight", weight);

				links.add(link);
			}
		}

		int i=typeLink.length;

		JSONObject node = new JSONObject();
		node.put("id", java.util.UUID.randomUUID().toString());
		node.put("category", i);
		node.put("name", typeList[5]+1);
		node.put("value", i * 2 + 1);
		nodeIds[i] = node.getString("id");
		nodes.add(node);

		JSONObject link = new JSONObject();
		int sourceIndex = i;
		int targetIndex = typeLink.length-1;
		int weight = 10;
		link.put("sourceID", nodes.getJSONObject(sourceIndex).getString("id"));//id是非必需的，只是为了显示图例时容易找到
		link.put("source", nodes.getJSONObject(sourceIndex).getString("name"));
		link.put("targetID", nodes.getJSONObject(targetIndex).getString("id"));
		link.put("target", nodes.getJSONObject(targetIndex).getString("name"));
		link.put("weight", weight);

		links.add(link);


		node = new JSONObject();
		node.put("id", java.util.UUID.randomUUID().toString());
		node.put("category", ++i);
		node.put("name", typeList[4]+1);
		node.put("value", i * 2 + 1);

		nodeIds[i] = node.getString("id");

		nodes.add(node);


		link = new JSONObject();
		sourceIndex = i;
		targetIndex = i-1;

		link.put("sourceID", nodes.getJSONObject(sourceIndex).getString("id"));//id是非必需的，只是为了显示图例时容易找到
		link.put("source", nodes.getJSONObject(sourceIndex).getString("name"));
		link.put("targetID", nodes.getJSONObject(targetIndex).getString("id"));
		link.put("target", nodes.getJSONObject(targetIndex).getString("name"));
		link.put("weight", weight);

		links.add(link);






		strutsMessage=StrutsMessage.successMessage()
				.addParameter("types",types)
				.addParameter("nodes",nodes)
				.addParameter("links", links)
				.addParameter("nodeIds",nodeIds)
				.addParameter("nodeInfos", loadNodeInfo(nodeIds));

		return SUCCESS;
	}


	public String loadNodeInfo(){
		if(nodes!=null){
			strutsMessage=StrutsMessage.successMessage()
					.addParameter("nodeInfo", loadNodeInfo(nodes.split(",")));
		}else{
			strutsMessage=StrutsMessage.errorMessage("节点ID不能为空！");
		}
		return SUCCESS;
	};

	private JSONArray loadNodeInfo(String[] nodeIds) {
		JSONArray nodeInfos=new JSONArray();
		for(String nodeId :nodeIds){
			JSONObject node=new JSONObject();
			node.put("id",nodeId);
			node.put("systemInfo",(long)(Math.random()*10000000)+"KW");
			node.put("desktop",(long)(Math.random()*1000)+"KW");
			node.put("phone",(long)(Math.random()*1000)+"KW");
			node.put("network",(long)(Math.random()*1000)+"KW");
			node.put("internation",(long)(Math.random()*1000)+"KW");
			node.put("core",(long)(Math.random()*1000)+"KW");

			nodeInfos.add(node);
		}

		return nodeInfos;
	}


	/*
	 * 随机地图节点
	 * */

	public String loadMapNodes(){

		if(size>0){
			JSONArray nodes=new JSONArray();
			JSONObject properties=new JSONObject();
			int totalSize=size;

			//混合型的
			size++;
			while (--size>0) {
				JSONObject node = new JSONObject();

				node.put("customerId", java.util.UUID.randomUUID().toString());
				node.put("lat", Math.random() * 1.62 + 39.23);
				node.put("lng", Math.random() * 2.09 + 115.41);
				node.put("telNo", (long) (Math.random() * 1000000) + 10000000000L);
				node.put("memo", "备注" + (long) (Math.random() * 1000000));


				JSONObject currentDetail = new JSONObject();
				currentDetail.put("tranCode", (long) (Math.random() * 1000000));
				currentDetail.put("tranTime", CommonUtils.formatTime(new Date().getTime()));
				node.put("currentDetail", currentDetail);

				JSONObject passDetail = new JSONObject();
				passDetail.put("tranCode", (long) (Math.random() * 1000000));
				Date passDate = new Date();
				passDate.setTime((int) (Math.random() * 24) * -1 - 2);
				passDetail.put("tranTime", CommonUtils.formatTime(passDate.getTime()));
				node.put("passDetail", passDetail);

				nodes.add(node);
			}

			//仅仅5分钟内的
			size=totalSize/2;
			while (--size>0) {
				JSONObject node = new JSONObject();

				node.put("customerId", java.util.UUID.randomUUID().toString());
				node.put("lat", Math.random() * 1.62 + 39.23);
				node.put("lng", Math.random() * 2.09 + 115.41);
				node.put("telNo", (long) (Math.random() * 1000000) + 10000000000L);
				node.put("memo", "备注" + (long) (Math.random() * 1000000));


				JSONObject currentDetail = new JSONObject();
				currentDetail.put("tranCode", (long) (Math.random() * 1000000));
				currentDetail.put("tranTime", CommonUtils.formatTime(new Date().getTime()));
				node.put("currentDetail", currentDetail);

				nodes.add(node);
			}


			//过去一小时的
			size=totalSize/2;
			while (--size>0) {
				JSONObject node = new JSONObject();

				node.put("customerId", java.util.UUID.randomUUID().toString());
				node.put("lat", Math.random() * 1.62 + 39.23);
				node.put("lng", Math.random() * 2.09 + 115.41);
				node.put("telNo", (long) (Math.random() * 1000000) + 10000000000L);
				node.put("memo", "备注" + (long) (Math.random() * 1000000));

				JSONObject passDetail = new JSONObject();
				passDetail.put("tranCode", (long) (Math.random() * 1000000));
				Date passDate = new Date();
				passDate.setTime((int) (Math.random() * 24) * -1 - 2);
				passDetail.put("tranTime", CommonUtils.formatTime(passDate.getTime()));
				node.put("passDetail", passDetail);

				nodes.add(node);
			}


			//添加属性
			JSONObject customerId=new JSONObject();
			customerId.put("name","客户号");
			customerId.put("icon","<i class='text-info fa fa-user'></i>");
			properties.put("customerId",customerId);

			JSONObject telNo=new JSONObject();
			telNo.put("name","手机号");
			telNo.put("icon","<i class='text-info fa fa-phone'></i>");
			properties.put("telNo",telNo);

			JSONObject memo=new JSONObject();
			memo.put("name","备注");
			memo.put("icon","<i class='text-info fa fa-reorder'></i>");
			properties.put("memo",memo);

			JSONObject tranCode=new JSONObject();
			tranCode.put("name","交易码");
			tranCode.put("icon","<i class='text-info fa fa-barcode'></i>");
			properties.put("tranCode",tranCode);

			JSONObject tranTime=new JSONObject();
			tranTime.put("name","交易时间");
			tranTime.put("icon","<i class='text-info fa fa-clock-o'></i>");
			properties.put("tranTime",tranTime);

			String[] attributeList={"customerId", "telNo", "memo"};
			String[] currentAttributeList={"tranCode", "tranTime"};
			String[] passAttributeList={"tranCode", "tranTime"};
			//主属性
			properties.put("attributeList",attributeList);
			//过去5分钟显示的数据
			properties.put("currentAttributeList",currentAttributeList);
			//过去一个小时显示的数据
			properties.put("passAttributeList",passAttributeList);


			strutsMessage=StrutsMessage.successMessage().addParameter("aaData",nodes).addParameter("attr",properties);
		}else{
			strutsMessage=StrutsMessage.errorMessage("节点大小必需大于0！");
		}
		return SUCCESS;
	}



	/*
	 * 获取进度条进度
	 * type:'start','process'
	 * */
	public String loadProcessData() {

		if(type!=null){
			try{
				long timeRest=Long.parseLong(type);
				timeRest*=(1+Math.random()*.05);

				if(timeRest>=total){
					strutsMessage=StrutsMessage.successMessage()
							.addParameter("type", type)
							.addParameter("total",total)
							.addParameter("finish",total);
				}else{
					strutsMessage=StrutsMessage.successMessage()
							.addParameter("type", timeRest)
							.addParameter("total",total)
							.addParameter("finish",timeRest);

				}
			}catch(NumberFormatException ex) {
				long total= (new Date()).getTime();
				long timeRest=total+((long)(Math.random()*600000+600000));
				double finished=total*0.2F;

				strutsMessage=StrutsMessage.successMessage()
						.addParameter("type",timeRest)
						.addParameter("total",total)
						.addParameter("finish",finished);
			}
		}else{
			strutsMessage=StrutsMessage.errorMessage("传输类型不能为空");
		}


		return SUCCESS;
	}


	public String loadTableInfo(){
		JSONArray tradeInfo = new JSONArray();
		for(int i = 0 ; i < 12 ; i++){
			JSONObject obj = new JSONObject();
			obj.put("column", "column");
			tradeInfo.add(obj);
		}

		strutsMessage= StrutsMessage.successMessage().addParameter("tableInfo", tradeInfo);
		return SUCCESS;
	}
	
	public String loadTable(){
		requestParams =JSONObject.parseObject(reqParams);
		String columnName = requestParams.getString("columnName");
		String iDisplayStart = requestParams.getString("iDisplayStart");
		String iDisplayLength = requestParams.getString("iDisplayLength");
		String state = requestParams.getString("state");
		
		
		JSONArray tableData = new JSONArray();
		JSONArray aoColumns = new JSONArray();
		int num = iDisplayLength == null? 43:Integer.parseInt(iDisplayLength);
		for(int i = 0; i< 10; i++){
			JSONObject th = new JSONObject();
			th.put("sTitle", "列名"+columnName);
			th.put("mDataProp", "column"+i);
			aoColumns.add(th);
		}
		//配置格式
		//[{"sTitle":"列名","mDataProp":"字段名"},{"sTitle":"列名","mDataProp":"字段名"},{"sTitle":"列名","mDataProp":"字段名"},{"sTitle":"列名","mDataProp":"字段名"}]
		//返回值格式
		//[{"字段名":"字段名对应的值"},{"字段名":"字段名对应的值"},{"字段名":"字段名对应的值"},{"字段名":"字段名对应的值"},{"字段名":"字段名对应的值"}]
		
		for(int i = 0 ; i < num ; i++){
			JSONObject obj = new JSONObject();
			for(int j =0; j< 10; j++){
				obj.put("column"+j, "column值"+(iDisplayStart == null?"非分页":iDisplayStart));
			}
			tableData.add(obj);
		}
		
		JSONObject chartsData = new JSONObject();

		chartsData.put("tableData", tableData);
		chartsData.put("aoColumns", aoColumns);
		chartsData.put("totalRecords", 40);
		strutsMessage= StrutsMessage.successMessage().addParameter("chartsData", chartsData);
				
		return SUCCESS;
	}

	
	public String loadData(){
		requestParams =JSONObject.parseObject(reqParams);
		String classify = requestParams.getString("classify");
		String showType = requestParams.getString("showType");
		String state = requestParams.getString("state");
		JSONObject chartsData = new JSONObject();
		
		if(showType.equals("line")){
			
			if(!state.equals("02")){
				JSONArray legends = new JSONArray();
				JSONArray seriesDatas = new JSONArray();
				JSONArray xAxisData = new JSONArray();
				if(state.equals("11")){
					//动态图例&动态x轴
					String [] names = {"磁盘C","磁盘D","磁盘E","磁盘F","磁盘G","磁盘H"};
					String [] xData = {"磁盘C","磁盘D","磁盘E","磁盘F","磁盘G","磁盘H"};
					int num = (int) (Math.random()*6+1);
					for(int i = 0; i < num; i++){
						String name = names[i];
						legends.add(name);
						JSONObject series = new JSONObject();
						JSONArray data = new JSONArray();
						series.put("name", name);
						for(int j =0; j < num; j++){
							data.add(Math.random()*100+"");
						}
						
						series.put("data", data);
						series.put("type", "line");
						seriesDatas.add(series);
					} 
					for(int i =0, len = seriesDatas.size();i < len ; i++){
						xAxisData.add(i+"");
					}
					
				}else if(state.equals("01")){
					legends.add("成功率");
					legends.add("失败率");

					int num = (int) (Math.random()*6);
					for(int i = 0, len = legends.size(); i < len; i++){
						JSONObject series = new JSONObject();
						JSONArray data = new JSONArray();
						series.put("name", legends.get(i));
						for(int j =0; j < num; j++){
							data.add(Math.random()*100+"");
						}
						
						series.put("data", data);
						series.put("type", "line");
						seriesDatas.add(series);
					} 
					for(int i =0;i < num ; i++){
						xAxisData.add(i+"");
					}
				}
				

				chartsData.put("title", "标题"+classify);
				chartsData.put("yAxisName", "y轴名称");
				chartsData.put("legend", legends);
				chartsData.put("xAxis", xAxisData);
				chartsData.put("seriesData", seriesDatas);
			}else{
				JSONArray legends = new JSONArray();
				JSONArray seriesDatas = new JSONArray();
				seriesDatas.add(Math.round(Math.random()*100));
				seriesDatas.add(Math.round(Math.random()*100));
				legends.add("成功率");
				legends.add("失败率");

				chartsData.put("xNum", 7);
				chartsData.put("title", "标题"+classify);
				chartsData.put("yAxisName", "y轴名称");
				chartsData.put("legend", legends);
				chartsData.put("seriesData", seriesDatas);
			}
			
		}else if(showType.equals("pie")){
			
			JSONArray legends = new JSONArray();
			JSONArray seriesDatas = new JSONArray();
			if(state.equals("0")){
				chartsData.put("title", "固定图例测试标题:"+classify);
				chartsData.put("seriesName", "固定图例测试:"+classify);
				legends.add("成功率");
				legends.add("失败率");

				for(int i =0, len = legends.size(); i < len; i++){
					JSONObject data = new JSONObject();
					String name = legends.getString(i);
					String value = Math.random()*100+"";
					data.put("name", name);
					data.put("value", value);
					seriesDatas.add(data);
				}
			}else if(state.equals("1")){
				chartsData.put("title", "动态图例测试标题:"+classify);
				chartsData.put("seriesName", "动态图例测试:"+classify);
	            String [] names = {"磁盘C","磁盘D","磁盘E","磁盘F","磁盘G","磁盘H"};
				int num = (int) (Math.random()*6+1);
				for(int i = 0; i < num; i++){
					String name = names[i];
					legends.add(name);
					String value = Math.random()*100+"";
					JSONObject data = new JSONObject();
					data.put("name", name);
					data.put("value", value);
					seriesDatas.add(data);
				}
			}

			chartsData.put("legend", legends);
			chartsData.put("seriesData", seriesDatas);
			
		}
		
		strutsMessage= StrutsMessage.successMessage().addParameter("chartsData", chartsData);
		return SUCCESS;
	}
	
	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public void setNodes(String nodes) {
		this.nodes = nodes;
	}


	public String getStaticType() {
		return staticType;
	}


	public void setStaticType(String staticType) {
		this.staticType = staticType;
	}


	public String getReqParams() {
		return reqParams;
	}


	public void setReqParams(String reqParams) {
		this.reqParams = reqParams;
	}


	public JSONObject getRequestParams() {
		return requestParams;
	}


	public void setRequestParams(JSONObject requestParams) {
		this.requestParams = requestParams;
	}







}