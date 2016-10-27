/*
 * Copyright(C) 2013 Agree Corporation. All rights reserved.
 * 
 * Contributors:
 *     Agree Corporation - initial API and implementation
 */


import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
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
 *
 *
 * @author Bean
 * @date 2016年5月10日 下午5:43:37
 * @version 1.0
 *
 */
public class AgentDemo1 {

    public static void main(String[] args) {
        List<URL> urls = new ArrayList<URL>();
        // 添加所要连接的AIM节点信息
        urls.add(new URL("21.5.18.78", 8090));
        AimConnector connector = null;
        try {
            connector = new AimConnector(urls, "Agent0", "app001", "trade001", 5,
                    new MyProtocolListener());
        } catch (AimConnetorException e) {
            e.printStackTrace();
        }
        
        Map<String, Object> public_req_map = new HashMap<String, Object>();
        public_req_map.put("userid","10000010001");
        public_req_map.put("_opertype_","1");
        public_req_map.put("_currpage_","1");
        public_req_map.put("_pagenum_","10");
        JSONObject public_req_data = new JSONObject(public_req_map);
        
        Map<String, Object> private_req_map = new HashMap<String, Object>();
        private_req_map.put("appid","001");
        JSONObject private_req_data = new JSONObject(private_req_map);
        
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("public_req", public_req_data);
        map.put("private_req", private_req_map);
        JSONObject data = new JSONObject(map);
        try {
            IFuture future = connector.request("EVENT", "ListEVENT", (byte) 2, data,
                    "aimcsl", 20000);
            // 同步获取响应结果
            try {
                JSONObject json = future.get();
                System.out.println("request响应：" + json);
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

