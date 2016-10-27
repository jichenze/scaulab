import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.sdk.GetDataBySdk;

/**
 * 类描述
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年5月30日
 */
public class Test {
	@org.junit.Test
	public void testName() throws Exception {
		JSONObject data=new JSONObject();
		JSONObject temp=new JSONObject();
		temp.put("devtype", "portmonitor");
		temp.put("PROPERTY_GRP".toLowerCase(), "reports");
		temp.put("PROPERTY_NAME".toLowerCase(), "ISACTIVE");
		data.put("private_req", temp);
		JSONObject dataBySdk = GetDataBySdk.getDataBySdk("VISUAL", "VIS00004", (byte) 2, data, "aimcsl", 2000);
		System.out.println("ok");
	}
}
