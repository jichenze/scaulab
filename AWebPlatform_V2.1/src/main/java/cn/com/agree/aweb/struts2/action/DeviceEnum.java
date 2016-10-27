package cn.com.agree.aweb.struts2.action;

/**
 * 此处配置devType与实际模块路径的映射
 *
 * @author lihao lihao01@cfischina.com
 * Oct 16, 2015
 */
public enum DeviceEnum {
	
	BANK("0", "appAll#system"), 
	BRANCH("1", ""), 
//	CLASS("1", "test#testModule"), 
	CLASS("2", "appAll#system#os"), 
	APP("3","appAll#system#device"),
	BACKUP("4","appAll#system#database"),
	SYSTEM("5", "appAll#system#apply");
	
	
	private String devType;
	private String modulePath;
	
	private DeviceEnum(String devType, String modulePath) {
		this.devType = devType;
		this.modulePath = modulePath;
	}
	
	/**
	 * 
	 * @param devType
	 * @return
	 */
	public static String getModulePathByDevType(String devType) {
		for (DeviceEnum deviceEnum: values()) {
			if (devType.equals(deviceEnum.getDevType())) {
				return deviceEnum.getModulePath();
			}
		} 
		
		return null;
	}
	
	public String getDevType() {
		return devType;
	}
	
	public String getModulePath() {
		return modulePath;
	}
}
