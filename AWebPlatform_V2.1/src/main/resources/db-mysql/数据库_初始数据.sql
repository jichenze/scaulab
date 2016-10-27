INSERT INTO aweb_user (USERNAME,PASSWORD,NICKNAME,IP,MAILBOX,TELEPHONE,CREATEUSER,CREATETIME,UPDATETIME,LOGINTIME,LOCKTIME,USERTYPE,STATE,CONTINUOUSERRORNUM,REMARK) VALUES ('admin','0201060304','管理员','localhost','admin@agree.com','15088888888','admin','2015-01-01 00:00:00','2015-01-01 00:00:00','2015-01-01 00:00:00','','0','1','0','管理员');

INSERT INTO aweb_access_menu VALUES ('monitorApp', 'access', '一线监控-应用', null, 'true', 'true', 'users', '1', '1', null);
INSERT INTO aweb_access_menu VALUES ('monitorOperation', 'access', '一线监控-操作', null, 'true', 'true', 'users', '1', '2', null);
INSERT INTO aweb_access_menu VALUES ('monitorSystem', 'access', '一线监控-系统', null, 'true', 'true', 'users', '1', '3', null);
INSERT INTO aweb_access_menu VALUES ('appAll', 'access', '应用总览', null, 'true', 'true', 'users', '1', '4', null);
INSERT INTO aweb_access_menu VALUES ('workSpace', 'access', '工作空间', null, 'true', 'true', 'users', '1', '5', null);
INSERT INTO aweb_access_menu VALUES ('accessData', 'access', '权限管理', null, 'true', 'true', 'users', '1', '6', null);
INSERT INTO aweb_access_menu VALUES ('access#accessRole', 'accessData', '角色管理', 'accessRole.jsp', 'false', 'false', null, '1', '2', null);
INSERT INTO aweb_access_menu VALUES ('access#accessUser', 'accessData', '用户管理', 'accessUser.jsp', 'false', 'false', null, '1', '1', null);



INSERT INTO aweb_access (ID, ELEMENT_ID,TYPE,NAME,PID,STATE) VALUES('15010100000030000000','access','0','所有权限','accesssss','1');
INSERT INTO aweb_access (ID, ELEMENT_ID,TYPE,NAME,PID,STATE) VALUES('15010100000030000001','monitorApp','0','一线监控-应用','access','1');
INSERT INTO aweb_access (ID, ELEMENT_ID,TYPE,NAME,PID,STATE) VALUES('15010100000030000002','monitorOperation','0','一线监控-操作','access','1');
INSERT INTO aweb_access (ID, ELEMENT_ID,TYPE,NAME,PID,STATE) VALUES('15010100000030000003','monitorSystem','0','一线监控-系统','access','1');
INSERT INTO aweb_access (ID, ELEMENT_ID,TYPE,NAME,PID,STATE) VALUES('15010100000030000004','appAll','0','应用总览','access','1');
INSERT INTO aweb_access (ID, ELEMENT_ID,TYPE,NAME,PID,STATE) VALUES('15010100000030000005','workSpace','0','工作空间','access','1');
INSERT INTO aweb_access (ID, ELEMENT_ID,TYPE,NAME,PID,STATE) VALUES('15010100000030000006','accessData','0','权限管理','access','1');
INSERT INTO aweb_access (ID, ELEMENT_ID,TYPE,NAME,PID,STATE) VALUES('15010100000030000007','access#accessUser','0','用户管理','accessData','1');
INSERT INTO aweb_access (ID, ELEMENT_ID,TYPE,NAME,PID,STATE) VALUES('15010100000030000008','access#accessRole','0','角色管理','accessData','1');

INSERT INTO aweb_device_type(DEVTYPE,DESP) VALUES('0', '系统');
INSERT INTO aweb_device_type(DEVTYPE,DESP) VALUES('1', '主机');
INSERT INTO aweb_device_type(DEVTYPE,DESP) VALUES('2', '操作系统');
INSERT INTO aweb_device_type(DEVTYPE,DESP) VALUES('3', '中间件');
INSERT INTO aweb_device_type(DEVTYPE,DESP) VALUES('4', '数据库');
INSERT INTO aweb_device_type(DEVTYPE,DESP) VALUES('5', '应用');


insert into `aweb_device` (`PATH`, `NAME`, `DESP`, `DEVTYPE`, `PARENTPATH`, `EXPAND`) values('/测试系统','测试系统','测试系统','0','/',NULL);
insert into `aweb_device` (`PATH`, `NAME`, `DESP`, `DEVTYPE`, `PARENTPATH`, `EXPAND`) values('/测试系统/测试主机','测试主机','测试主机','1','/测试系统',NULL);
insert into `aweb_device` (`PATH`, `NAME`, `DESP`, `DEVTYPE`, `PARENTPATH`, `EXPAND`) values('/测试系统/测试主机/中间件','中间件','中间件','3','/测试系统/测试主机',NULL);
insert into `aweb_device` (`PATH`, `NAME`, `DESP`, `DEVTYPE`, `PARENTPATH`, `EXPAND`) values('/测试系统/测试主机/应用','应用','应用','5','/测试系统/测试主机',NULL);
insert into `aweb_device` (`PATH`, `NAME`, `DESP`, `DEVTYPE`, `PARENTPATH`, `EXPAND`) values('/测试系统/测试主机/操作系统','操作系统','操作系统','2','/测试系统/测试主机',NULL);
insert into `aweb_device` (`PATH`, `NAME`, `DESP`, `DEVTYPE`, `PARENTPATH`, `EXPAND`) values('/测试系统/测试主机/数据库','数据库','数据库','4','/测试系统/测试主机',NULL);


insert into `aweb_classify_config` (`mainclassify`, `subclassify`, `showtype`, `columnconfig`, `state`) values('test1','cpu','line','{\r\n	\"title\":\"cpu使用率与进程数\",\r\n	\"legend\":[\"cpu使用率\",\"cpu进程数\"],\r\n	\"columns\":[\"cpuUsed\",\"cpuNum\"],\r\n	\"xAxis\":\"cpuName\"\r\n}','01');
insert into `aweb_classify_config` (`mainclassify`, `subclassify`, `showtype`, `columnconfig`, `state`) values('test1','cpu','line','{\r\n	\"title\":\"动态cpu使用率与进程数\",\r\n	\"legend\":[\"cpu使用率\",\"cpu进程数\"],\r\n	\"columns\":[\"cpuUsed\",\"cpuNum\"],\r\n	\"xNum\":\"7\"\r\n}','02');
insert into `aweb_classify_config` (`mainclassify`, `subclassify`, `showtype`, `columnconfig`, `state`) values('test1','cpu','line','{\r\n	\"title\":\"各cpu使用率\",\r\n	\"legend\":\"cpuName\",\r\n	\"columns\":[\"cpuUsed\"],\r\n	\"xAxis\":\"date\"\r\n}','11');
insert into `aweb_classify_config` (`mainclassify`, `subclassify`, `showtype`, `columnconfig`, `state`) values('test1','cpu','line','{\r\n	\"title\":\"各cpu实时使用率\",\r\n	\"legend\":\"cpuName\",\r\n	\"columns\":\"cpuUsed\",\r\n	\"xNum\":\"7\"\r\n}','12');
insert into `aweb_classify_config` (`mainclassify`, `subclassify`, `showtype`, `columnconfig`, `state`) values('test1','cpu','pie','{\r\n	\"title\":\"cpu操作成功失败比\",\r\n	\"legend\":[\"成功\",\"失败\"],\r\n	\"columns\":[\"success\",\"fail\"],\r\n	\"seriesName\":\"cpu描述\"\r\n}','0');
insert into `aweb_classify_config` (`mainclassify`, `subclassify`, `showtype`, `columnconfig`, `state`) values('test1','cpu','pie','{\r\n	\"title\":\"cpu进程数量比\",\r\n	\"legend\":\"cpuName\",\r\n	\"columns\":\"cpuNum\",\r\n	\"seriesName\":\"cpu进程数\"\r\n}','1');
insert into `aweb_classify_config` (`mainclassify`, `subclassify`, `showtype`, `columnconfig`, `state`) values('test1','cpu','table','{\r\n    \"title\": \"cpu表\",\r\n    \"aoColumns\": [\r\n{\r\n            \"mDataProp\": \"cpuName\",\r\n            \"sTitle\": \"cpu名\"\r\n        },\r\n        {\r\n            \"mDataProp\": \"cpuUsed\",\r\n            \"sTitle\": \"cpu使用率\"\r\n        },\r\n        {\r\n            \"mDataProp\": \"cpuNum\",\r\n            \"sTitle\": \"cpu进程数\"\r\n        }\r\n        \r\n    ]\r\n}','0');
insert into `aweb_classify_config` (`mainclassify`, `subclassify`, `showtype`, `columnconfig`, `state`) values('test1','cpu','table','{\r\n    \"title\": \"cpu表\",\r\n    \"aoColumns\": [\r\n        {\r\n            \"mDataProp\": \"cpuName\",\r\n            \"sTitle\": \"cpu名\"\r\n        },\r\n        {\r\n            \"mDataProp\": \"cpuUsed\",\r\n            \"sTitle\": \"cpu使用率\"\r\n        },\r\n        {\r\n            \"mDataProp\": \"cpuNum\",\r\n            \"sTitle\": \"cpu进程数\"\r\n        }\r\n    ]\r\n}','1');

