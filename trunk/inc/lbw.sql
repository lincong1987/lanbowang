# MySQL-Front 5.1  (Build 3.57)

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40101 SET SQL_MODE='' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;
/*!40103 SET SQL_NOTES='ON' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;


# Host: localhost    Database: lbw
# ------------------------------------------------------
# Server version 5.1.28-rc-community

DROP DATABASE IF EXISTS `lbw`;
CREATE DATABASE `lbw` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `lbw`;

#
# Source for table lbw_index_msg
#

DROP TABLE IF EXISTS `lbw_index_msg`;
CREATE TABLE `lbw_index_msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `uid` varchar(16) DEFAULT NULL,
  `nid` varchar(16) DEFAULT NULL,
  `addTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `stopTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Dumping data for table lbw_index_msg
#
LOCK TABLES `lbw_index_msg` WRITE;
/*!40000 ALTER TABLE `lbw_index_msg` DISABLE KEYS */;

INSERT INTO `lbw_index_msg` VALUES (1,'asd测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n项目产品\r\nmore...\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n','asda','asdad','2011-10-05 17:12:31','2011-10-05 19:12:31');
/*!40000 ALTER TABLE `lbw_index_msg` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table lbw_index_slide_images
#

DROP TABLE IF EXISTS `lbw_index_slide_images`;
CREATE TABLE `lbw_index_slide_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imagePath` varchar(255) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Dumping data for table lbw_index_slide_images
#
LOCK TABLES `lbw_index_slide_images` WRITE;
/*!40000 ALTER TABLE `lbw_index_slide_images` DISABLE KEYS */;

INSERT INTO `lbw_index_slide_images` VALUES (1,'http://localhost/upload/show_2.jpg','http://baidu.com/','adsasdaasdadadasdasd');
INSERT INTO `lbw_index_slide_images` VALUES (2,'http://localhost/upload/show_4.jpg','http://google.com/','asdadsadadasdaddassssssssssssssssssssssssssssssssssssssss');
INSERT INTO `lbw_index_slide_images` VALUES (3,'http://localhost/upload/show_2.jpg','http://baidu.com/','adsasdaasdadadasdasd');
INSERT INTO `lbw_index_slide_images` VALUES (4,'http://localhost/upload/show_4.jpg','http://google.com/','asdadsadadasdaddassssssssssssssssssssssssssssssssssssssss');
INSERT INTO `lbw_index_slide_images` VALUES (5,'http://localhost/upload/show_2.jpg','http://baidu.com/','adsasdaasdadadasdasd');
INSERT INTO `lbw_index_slide_images` VALUES (6,'http://localhost/upload/show_4.jpg','http://google.com/','asdadsadadasdaddassssssssssssssssssssssssssssssssssssssss');
/*!40000 ALTER TABLE `lbw_index_slide_images` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table lbw_index_top_msg
#

DROP TABLE IF EXISTS `lbw_index_top_msg`;
CREATE TABLE `lbw_index_top_msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `href` varchar(64) NOT NULL DEFAULT '#',
  `uid` varchar(16) DEFAULT NULL,
  `nid` varchar(16) DEFAULT NULL,
  `addTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `stopTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Dumping data for table lbw_index_top_msg
#
LOCK TABLES `lbw_index_top_msg` WRITE;
/*!40000 ALTER TABLE `lbw_index_top_msg` DISABLE KEYS */;

INSERT INTO `lbw_index_top_msg` VALUES (1,'------------------sssss\r\n\r\nasdasd\r\n大杀四方\r\nadsfas ','#','asda','asdad','2011-10-11 17:12:31','2011-10-11 19:12:31');
/*!40000 ALTER TABLE `lbw_index_top_msg` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table lbw_user
#

DROP TABLE IF EXISTS `lbw_user`;
CREATE TABLE `lbw_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(12) DEFAULT NULL,
  `nid` varchar(16) DEFAULT NULL,
  `pwd` varchar(32) DEFAULT NULL,
  `sex` int(1) DEFAULT '0',
  `tel` varchar(16) DEFAULT NULL,
  `mob` varchar(16) DEFAULT NULL,
  `qq` varchar(16) DEFAULT NULL,
  `msn` varchar(32) DEFAULT NULL,
  `tel2` varchar(32) DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `entryDate` date DEFAULT '0000-00-00',
  `age` int(11) DEFAULT '20',
  `depart` int(11) DEFAULT '2',
  `address` longtext,
  `idNumber` varchar(18) DEFAULT NULL,
  `isAdmin` varchar(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

#
# Dumping data for table lbw_user
#
LOCK TABLES `lbw_user` WRITE;
/*!40000 ALTER TABLE `lbw_user` DISABLE KEYS */;

INSERT INTO `lbw_user` VALUES (1,'admin','管理员','1267f3785ebfea0eaa89a3d1595e718f',0,NULL,NULL,NULL,NULL,NULL,NULL,'0000-00-00',20,2,NULL,NULL,'1');
INSERT INTO `lbw_user` VALUES (2,'lincong','林聪','1267f3785ebfea0eaa89a3d1595e718f',0,NULL,NULL,NULL,NULL,NULL,NULL,'0000-00-00',20,2,NULL,NULL,'1');
INSERT INTO `lbw_user` VALUES (3,'aa','adsasd','1267f3785ebfea0eaa89a3d1595e718f',2,'asd','asd','asd','asd','asd','asd','1987-12-12',23,1,'asdasdasd',NULL,'0');
INSERT INTO `lbw_user` VALUES (4,'jianglili','江黎俐','1267f3785ebfea0eaa89a3d1595e718f',2,'0571-886617786','15925711961','159257119','llll@live.com','88234636','lincong1987@gmail.com','2011-05-01',20,3,'杭州滨江','e7a5f0bbca4dc5bfbf','1');
INSERT INTO `lbw_user` VALUES (5,'gaochen','高晨','21232f297a57a5a743894a0e4a801fc3',2,'','','','','','gaochen@icinfo.com.cn','2011-10-05',20,2,'河南','d41d8cd98f00b204e9','0');
INSERT INTO `lbw_user` VALUES (6,'zhangjun','章军','e10adc3949ba59abbe56e057f20f883e',1,'','','','','','zj@xx.xx','2011-10-26',20,2,'ss','fe73f687e5bc528021','1');
INSERT INTO `lbw_user` VALUES (7,'huangli','黄丽','1267f3785ebfea0eaa89a3d1595e718f',2,'','','','','','huangli@icinfo.com','2011-01-03',20,5,'啊啊','1a100d2c0dab19c443','1');
/*!40000 ALTER TABLE `lbw_user` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table lbw_web_nav
#

DROP TABLE IF EXISTS `lbw_web_nav`;
CREATE TABLE `lbw_web_nav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT '0',
  `name` varchar(32) DEFAULT NULL COMMENT '链接名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='lbw_web_nav';

#
# Dumping data for table lbw_web_nav
#
LOCK TABLES `lbw_web_nav` WRITE;
/*!40000 ALTER TABLE `lbw_web_nav` DISABLE KEYS */;

/*!40000 ALTER TABLE `lbw_web_nav` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table lbw_web_news
#

DROP TABLE IF EXISTS `lbw_web_news`;
CREATE TABLE `lbw_web_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_title` varchar(255) NOT NULL DEFAULT '未命名的新闻',
  `news_content` text,
  `news_content_short` varchar(50) DEFAULT NULL,
  `news_post_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `news_type_id` int(11) DEFAULT '1',
  `uid` varchar(16) DEFAULT NULL,
  `isPublish` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Dumping data for table lbw_web_news
#
LOCK TABLES `lbw_web_news` WRITE;
/*!40000 ALTER TABLE `lbw_web_news` DISABLE KEYS */;

INSERT INTO `lbw_web_news` VALUES (1,'未命名的新闻','1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111','11111111111111111111111111111111111111111111111111','2011-10-10 00:55:41',1,'lincong',1);
INSERT INTO `lbw_web_news` VALUES (2,'asdasdasd','asdasd','asdasd','2011-09-26 02:36:00',1,'lincong',1);
INSERT INTO `lbw_web_news` VALUES (3,'12312312312','<img alt=\"\" src=\"http://maps.googleapis.com/maps/api/staticmap?center=31.230393%2C121.473704&amp;zoom=11&amp;size=558x360&amp;maptype=roadmap&amp;markers=31.230393%2C121.473704&amp;language=zh_CN&amp;sensor=false\" />','','2011-10-28 02:37:00',1,'lincong',1);
INSERT INTO `lbw_web_news` VALUES (4,'132123','asdasdasd','asdasdasd','0000-00-00 00:00:00',1,'lincong',1);
INSERT INTO `lbw_web_news` VALUES (5,'asdasd','sdasd','sdasd','0000-00-00 00:00:00',1,'lincong',1);
INSERT INTO `lbw_web_news` VALUES (6,'asdasd','sdasd','sdasd','0000-00-00 00:00:00',1,'lincong',1);
INSERT INTO `lbw_web_news` VALUES (7,'wqdqwda','<img src=\"/upload/image/20111010/20111010183531_53931.jpg\" alt=\"\" />','此条新闻没有文本内容','0000-00-00 00:00:00',1,'lincong',1);
/*!40000 ALTER TABLE `lbw_web_news` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table lbw_web_news
#

DROP TABLE IF EXISTS `lbw_web_news`;
CREATE TABLE `lbw_web_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_title` varchar(255) NOT NULL DEFAULT '未命名的新闻',
  `news_content` text,
  `news_content_short` varchar(50) DEFAULT NULL,
  `news_post_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `news_type_id` int(11) DEFAULT '1',
  `uid` varchar(16) DEFAULT NULL,
  `isPublish` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Dumping data for table lbw_web_news
#
LOCK TABLES `lbw_web_news` WRITE;
/*!40000 ALTER TABLE `lbw_web_news` DISABLE KEYS */;

INSERT INTO `lbw_web_news` VALUES (1,'未命名的新闻','1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111','11111111111111111111111111111111111111111111111111','2011-10-10 00:55:41',1,'lincong',1);
INSERT INTO `lbw_web_news` VALUES (2,'asdasdasd','asdasd','asdasd','2011-09-26 02:36:00',1,'lincong',1);
INSERT INTO `lbw_web_news` VALUES (3,'12312312312','<img alt=\"\" src=\"http://maps.googleapis.com/maps/api/staticmap?center=31.230393%2C121.473704&amp;zoom=11&amp;size=558x360&amp;maptype=roadmap&amp;markers=31.230393%2C121.473704&amp;language=zh_CN&amp;sensor=false\" />','','2011-10-28 02:37:00',1,'lincong',1);
INSERT INTO `lbw_web_news` VALUES (4,'132123','asdasdasd','asdasdasd','0000-00-00 00:00:00',1,'lincong',1);
INSERT INTO `lbw_web_news` VALUES (5,'asdasd','sdasd','sdasd','0000-00-00 00:00:00',1,'lincong',1);
INSERT INTO `lbw_web_news` VALUES (6,'asdasd','sdasd','sdasd','0000-00-00 00:00:00',1,'lincong',1);
INSERT INTO `lbw_web_news` VALUES (7,'wqdqwda','<img src=\"/upload/image/20111010/20111010183531_53931.jpg\" alt=\"\" />','此条新闻没有文本内容','0000-00-00 00:00:00',1,'lincong',1);
/*!40000 ALTER TABLE `lbw_web_news` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table lbw_web_news_type
#

DROP TABLE IF EXISTS `lbw_web_news_type`;
CREATE TABLE `lbw_web_news_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(12) DEFAULT NULL,
  `sort` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Dumping data for table lbw_web_news_type
#
LOCK TABLES `lbw_web_news_type` WRITE;
/*!40000 ALTER TABLE `lbw_web_news_type` DISABLE KEYS */;

INSERT INTO `lbw_web_news_type` VALUES (1,'新闻',0);
/*!40000 ALTER TABLE `lbw_web_news_type` ENABLE KEYS */;
UNLOCK TABLES;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
