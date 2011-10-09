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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

#
# Dumping data for table lbw_user
#
LOCK TABLES `lbw_user` WRITE;
/*!40000 ALTER TABLE `lbw_user` DISABLE KEYS */;

INSERT INTO `lbw_user` VALUES (1,'admin','管理员',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'0000-00-00',20,2,NULL,NULL,'1');
INSERT INTO `lbw_user` VALUES (2,'lincong','林聪',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'0000-00-00',20,2,NULL,NULL,'1');
INSERT INTO `lbw_user` VALUES (3,'aa','adsasd','asdasd',2,'asd','asd','asd','asd','asd','asd','1987-12-12',23,1,'asdasdasd',NULL,'0');
INSERT INTO `lbw_user` VALUES (4,'jianglili','江黎俐','1267f3785ebfea0eaa89a3d1595e718f',2,'0571-886617786','15925711961','159257119','llll@live.com','88234636','lincong1987@gmail.com','2011-05-01',20,3,'杭州滨江','e7a5f0bbca4dc5bfbf','1');
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

CREATE TABLE `lbw_web_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_title` varchar(255) NOT NULL DEFAULT '未命名的新闻',
  `news_content` text,
  `news_content_short` varchar(50) DEFAULT NULL,
  `uid` varchar(16) DEFAULT NULL,
  `isPublish` int(1) NOT NULL DEFAULT '1',
  `news_post_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
