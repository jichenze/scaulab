/*==============================================================*/
/* DBMS name:      Sybase SQL Anywhere 12                       */
/* Created on:     2016/4/11 10:55:44                           */
/*==============================================================*/


drop table if exists aweb_user_login;

drop table if exists aweb_access;

drop table if exists aweb_access_control;

drop table if exists aweb_access_menu;

drop table if exists aweb_access_page;

drop table if exists aweb_relevancy_role_access;

drop table if exists aweb_relevancy_user_role;

drop table if exists aweb_role;

drop table if exists aweb_user;

drop table if exists aweb_device;

drop table if exists aweb_device_type;

drop table if exists aweb_classify_config;
/*==============================================================*/
/* Table: aweb_user_login                                        */
/*==============================================================*/
create table aweb_user_login 
(
   USERNAME             varchar(50)                    not null,
   SESSIONID            varchar(50)                    not null,
   LASTHOST             varchar(25)                    not null,
   constraint PK_AWEB_USER_LOGIN primary key (USERNAME)
)
ENGINE=InnoDB CHARSET=utf8;

/*==============================================================*/
/* Table: aweb_access                                          */
/*==============================================================*/
create table aweb_access 
(
   ID                   varchar(50)                    not null,
   ELEMENT_ID           varchar(100)                   null,
   TYPE                 varchar(10)                    null,
   NAME                 varchar(100)                   null,
   PID                  varchar(100)                   null,
   STATE                varchar(5)                      null,
   constraint PK_AWEB_ACCESS primary key (ID)
)
ENGINE=InnoDB CHARSET=utf8;

/*==============================================================*/
/* Table: aweb_access_control                                  */
/*==============================================================*/
create table aweb_access_control 
(
   ID                   varchar(100)                   not null,
   NAME                 varchar(100)                   null,
   VALUE                varchar(200)                   null,
   STATE                varchar(1)                     null,
   REMARK               varchar(200)                   null,
   constraint PK_AWEB_ACCESS_CONTROL primary key (ID)
)
ENGINE=InnoDB CHARSET=utf8;

/*==============================================================*/
/* Table: aweb_access_menu                                     */
/*==============================================================*/
create table aweb_access_menu 
(
   ID          VARCHAR(100) NOT NULL,
   PID         VARCHAR(100) DEFAULT NULL COMMENT '父节点ID',
   NAME        VARCHAR(100) DEFAULT NULL COMMENT '节点名',
   VALUE       VARCHAR(200) DEFAULT NULL COMMENT 'url值，为空时，无对应的页面',
   ISPARENT    VARCHAR(5)   DEFAULT NULL COMMENT '是否为父节点',
   OPEN        VARCHAR(5)   DEFAULT NULL COMMENT '初始化时是否打开',
   ICON        VARCHAR(20)  DEFAULT NULL COMMENT '图标',
   STATE       VARCHAR(1)   DEFAULT NULL,
   SORT        VARCHAR(5)   DEFAULT NULL,
   REMARK      VARCHAR(200) DEFAULT NULL COMMENT '备注信息',
   constraint PK_AWEB_ACCESS_MENU primary key (ID)
)
ENGINE=InnoDB CHARSET=utf8;


/*==============================================================*/
/* Table: aweb_access_page                                     */
/*==============================================================*/
create table aweb_access_page 
(
   ID                   varchar(100)                   not null,
   NAME                 varchar(100)                   null,
   VALUE                varchar(200)                   null,
   STATE                varchar(1)                     null,
   REMARK               varchar(200)                   null,
   constraint PK_AWEB_ACCESS_PAGE primary key (ID)
)
ENGINE=InnoDB CHARSET=utf8;

/*==============================================================*/
/* Table: aweb_relevancy_role_access                           */
/*==============================================================*/
create table aweb_relevancy_role_access 
(
   ID                   varchar(50)                    not null,
   ROLE_ID              varchar(50)                    null,
   ACCESS_ID            varchar(50)                    null,
   constraint PK_AWEB_RELEVANCY_ROLE_ACCESS primary key (ID)
)
ENGINE=InnoDB CHARSET=utf8;

/*==============================================================*/
/* Table: aweb_relevancy_user_role                             */
/*==============================================================*/
create table aweb_relevancy_user_role 
(
   ID                   varchar(50)                    not null,
   USERNAME             varchar(50)                    null,
   ROLE_ID              varchar(50)                    null,
   constraint PK_AWEB_RELEVANCY_USER_ROLE primary key (ID)
)
ENGINE=InnoDB CHARSET=utf8;

/*==============================================================*/
/* Table: aweb_role                                            */
/*==============================================================*/
create table aweb_role 
(
   ID                   varchar(50)                    not null,
   NAME                 varchar(100)                   null,
   CREATEUSER           varchar(50)                    null,
   CREATETIME           varchar(30)                    null,
   UPDATETIME           varchar(30)                    null,
   STATE                varchar(1)                     null,
   REMARK               varchar(200)                   null,
   constraint PK_AWEB_ROLE primary key (ID)
)
ENGINE=InnoDB CHARSET=utf8;

/*==============================================================*/
/* Table: aweb_user                                            */
/*==============================================================*/
create table aweb_user 
(
   USERNAME             varchar(50)                    not null,
   PASSWORD             varchar(50)                    null,
   NICKNAME             varchar(50)                    null,
   IP                   varchar(20)                    null,
   MAILBOX              varchar(50)                    null,
   TELEPHONE            varchar(20)                    null,
   CREATEUSER           varchar(50)                    null,
   CREATETIME           varchar(30)                    null,
   UPDATETIME           varchar(30)                    null,
   LOGINTIME            varchar(30)                    null,
   LOCKTIME             varchar(30)                    null,
   CONTINUOUSERRORNUM   varchar(2)                     null,
   STATE                varchar(1)                     null,
   USERTYPE             varchar(1)                     null,
   REMARK               varchar(200)                   null,
   constraint PK_AWEB_USER primary key (USERNAME)
);

/*==============================================================*/
/* Table: aweb_device_type                                     */
/*==============================================================*/
create table aweb_device_type
(
	DEVTYPE VARCHAR(20) NOT NULL,
	DESP VARCHAR(20) NOT NULL,
	PRIMARY KEY(DEVTYPE)
)ENGINE=InnoDB CHARSET=UTF8;

/*==============================================================*/
/* Table: aweb_device                                     */
/*==============================================================*/
create table aweb_device
(
	PATH VARCHAR(100) NOT NULL,
	NAME VARCHAR(20) NOT NULL,
	DESP VARCHAR(20) NOT NULL,
	DEVTYPE VARCHAR(20) NOT NULL,
	PARENTPATH VARCHAR(100) NOT NULL,
	EXPAND VARCHAR(30),
	PRIMARY KEY(PATH),
	CONSTRAINT AD_F_ADT FOREIGN KEY(DEVTYPE) REFERENCES aweb_device_type(DEVTYPE)
)ENGINE=InnoDB CHARSET=UTF8;

/*==============================================================*/
/* Table: aweb_user_grid                                     */
/*==============================================================*/
drop table if exists aweb_user_grid;
CREATE TABLE aweb_user_grid (                                   
                 USERNAME varchar(50) NOT NULL COMMENT '用户名',           
                 GRIDCONF varchar(2000) DEFAULT NULL COMMENT '网格配置',  
                 PRIMARY KEY (USERNAME)                                       
) ENGINE=InnoDB DEFAULT CHARSET=utf8;   

/*==============================================================*/
/* Table: aweb_classify_config                                     */
/*==============================================================*/
create table aweb_classify_config(
   mainclassify varchar(20) DEFAULT '' COMMENT '大指标分类',                       
   subclassify varchar(20) NOT NULL DEFAULT '' COMMENT '小指标分类',               
   showtype varchar(20) NOT NULL COMMENT '显示类型',                                
   columnconfig blob COMMENT '数据字段配置，不同显示类型该配置不同',  
   state varchar(20) NOT NULL COMMENT '图例x轴状态',                               
   primary key(subclassify,showtype,state)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;