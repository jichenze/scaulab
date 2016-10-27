package cn.com.agree.aweb.sdk;

import static org.junit.Assert.*;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.junit.Test;

import cn.com.agree.afa.aim.connector.util.URL;
import cn.com.agree.aweb.util.XMLUtil;

/**
 * 读取URL配置
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年5月30日
 */
public class URLConfigLoader implements URLXMLConfLables{
	/**
	 * 
	 * @return		url配置map，key为agentName，value为URL的list
	 * @throws Exception
	 */
	public static Map<String,List<URL>> getURLConfigs() throws Exception{
		
		//加载缓存
		Map<String, List<URL>> configCache = URLConfigCache.getConfigCache();
		
		if(configCache==null){
			Map<String,List<URL>> urlconfig=new HashMap<String,List<URL>>();
			//获取urlconf.xml输入流
			InputStream in = URLConfigLoader.class.getClassLoader().getResourceAsStream("./urlconf.xml");
		
			try {
			
				Element urlconfigIn = XMLUtil.getRootElement(in);
				
				if(urlconfig!=null){
				
					List<Element> elements = urlconfigIn.elements();
				
					if(elements.size()==0){
						throw new RuntimeException("请至少配置一条配置");
					}
				
					for (Element agent : elements) {
						
						List<Element> temp = agent.elements();
						List<URL> urls=new ArrayList<URL>();
						String agentName = agent.attributeValue("name");
						
						if(temp.size()==0){
							throw new RuntimeException("请至少配置一个agent");
						}
						
						for (Element url : temp) {
							
							String prot = url.element(PORT).getText();
							String ip=url.element(IP).getText();
							urls.add(new URL(ip, Integer.parseInt(prot)));
							
						}
						
						urlconfig.put(agentName, urls);
					}
				}
			} catch (Exception e) {
				throw e;
			}
				URLConfigCache.setConfigCache(urlconfig);
				return urlconfig;
		}else{
			return configCache;
		}
	}
}
