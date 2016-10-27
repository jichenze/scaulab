package cn.com.agree.aweb.sdk;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import cn.com.agree.afa.aim.connector.AimConnetorException;
import cn.com.agree.afa.aim.connector.AppHandlerException;
import cn.com.agree.afa.aim.connector.IProtocolListener;
import cn.com.agree.afa.aim.connector.aim.device.AimConnector;
import cn.com.agree.afa.aim.connector.future.IFuture;
import cn.com.agree.afa.aim.connector.util.URL;

import com.aim.alibaba.fastjson.JSONObject;

/**
 * 调用sdk获得平台数据
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年5月27日
 */
public class GetDataBySdk {
	/**
	 * 
	 * @param mc				请求mc
	 * @param tc				请求tc
	 * @param mode				模式
	 * @param data				请求json参数
	 * @param to				
	 * @param timeoutMillis		超时时间，单位毫秒
	 * @return	平台数据
	 * @throws Exception
	 */
	public static JSONObject getDataBySdk(String mc, String tc, byte mode, JSONObject data, String to,
			int timeoutMillis) throws Exception{
		//获得url配置
		Map<String, List<URL>> urlConfigs = URLConfigLoader.getURLConfigs();
		//注册连接
		AimConnector connector = Register(urlConfigs,"app001", "trade001", 5, new MyProtocolListener());
		
        try {
        	
            IFuture future = connector.request(mc, tc, mode, data,
            		to, timeoutMillis);
            
            // 同步获取响应结果
            try {
            	
                JSONObject json = future.get();
                return json;
                
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
            
            // 注销
            connector.unregister("app002", "trade002", data);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
		return null;
	}
	/**
	 * 注册连接
	 * @param conf					url配置
	 * @param registerMc			注册mc
	 * @param registerTc			注册tc
	 * @param heartbeatInterval		心跳频率
	 * @param listener				IProtocolListener实现类
	 * @return						sdk连接
	 */
	public static AimConnector Register(Map<String,List<URL>> conf, String registerMc, String registerTc, int heartbeatInterval, IProtocolListener listener){
		
		String agent="";
		List<URL> urls = null;
		
		for(String key:conf.keySet()){
			
			agent=key;
			urls=conf.get(key);
			
		}
		
		AimConnector connector = null;
		
		try {
			
            connector = new AimConnector(urls, agent, registerMc, registerTc, heartbeatInterval,
            		listener);
            
        } catch (AimConnetorException e) {
            e.printStackTrace();
        }
		
		return connector;
	}
	 static class MyProtocolListener implements IProtocolListener {

	        /*
	         * @see
	         * cn.com.agree.afa.aim.connector.IProtocolListener#reportListener(byte,
	         * com.aim.alibaba.fastjson.JSONObject)
	         */
	        @Override
	        public JSONObject reportListener(String mc, String tc, byte mode, JSONObject data)
	                throws AppHandlerException {
	            // 处理AIM节点主动推送的report消息
	            System.out.println("Report[mode=" + mode + ", data=" + data);
	            return null;
	        }

	        /*
	         * @see
	         * cn.com.agree.afa.aim.connector.IProtocolListener#deployListener(byte,
	         * com.aim.alibaba.fastjson.JSONObject)
	         */
	        @Override
	        public JSONObject deployListener(String mc, String tc, byte mode, JSONObject data)
	                throws AppHandlerException {
	            // 处理AIM节点主动推送的deploy消息
	            System.out.println("Deploy[mode=" + mode + ", data=" + data);
	            return data;
	        }

	        /*
	         * @see
	         * cn.com.agree.afa.aim.connector.IProtocolListener#requestListener(
	         * byte, com.aim.alibaba.fastjson.JSONObject)
	         */
	        @Override
	        public JSONObject requestListener(String mc, String tc, byte mode, JSONObject data)
	                throws AppHandlerException {
	            return data;
	        }

	        /*
	         * @see
	         * cn.com.agree.afa.aim.connector.IProtocolListener#controlListener(
	         * byte, com.aim.alibaba.fastjson.JSONObject)
	         */
	        @Override
	        public JSONObject controlListener(String mc, String tc, byte mode, JSONObject data)
	                throws AppHandlerException {
	            // 处理AIM节点主动推送的control消息
	            System.out.println("Control[mode=" + mode + ", data=" + data);
	            return data;
	        }
	    }
}
