-- phpMyAdmin SQL Dump
-- version 3.3.2
-- http://www.phpmyadmin.net
--
-- 主机: localhost:3306
-- 生成日期: 2011 年 12 月 04 日 20:43
-- 服务器版本: 5.1.28
-- PHP 版本: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `lbw`
--

-- --------------------------------------------------------

--
-- 表的结构 `lbw_index_msg`
--

DROP TABLE IF EXISTS `lbw_index_msg`;
CREATE TABLE IF NOT EXISTS `lbw_index_msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `uid` varchar(16) DEFAULT NULL,
  `nid` varchar(16) DEFAULT NULL,
  `addTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `stopTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `lbw_index_msg`
--

INSERT INTO `lbw_index_msg` (`id`, `content`, `uid`, `nid`, `addTime`, `stopTime`) VALUES
(1, 'asd测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n项目产品\r\nmore...\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n测试测试测试测试测试测试 2011-09-25\r\n', 'asda', 'asdad', '2011-10-05 17:12:31', '2011-10-05 19:12:31');

-- --------------------------------------------------------

--
-- 表的结构 `lbw_index_slide_images`
--

DROP TABLE IF EXISTS `lbw_index_slide_images`;
CREATE TABLE IF NOT EXISTS `lbw_index_slide_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imagePath` varchar(255) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `lbw_index_slide_images`
--

INSERT INTO `lbw_index_slide_images` (`id`, `imagePath`, `href`, `content`) VALUES
(1, 'http://localhost/upload/show_2.jpg', 'http://baidu.com/', 'adsasdaasdadadasdasd'),
(2, 'http://localhost/upload/show_4.jpg', 'http://google.com/', 'asdadsadadasdaddassssssssssssssssssssssssssssssssssssssss'),
(3, 'http://localhost/upload/show_2.jpg', 'http://baidu.com/', 'adsasdaasdadadasdasd'),
(4, 'http://localhost/upload/show_4.jpg', 'http://google.com/', 'asdadsadadasdaddassssssssssssssssssssssssssssssssssssssss'),
(5, 'http://localhost/upload/show_2.jpg', 'http://baidu.com/', 'adsasdaasdadadasdasd'),
(6, 'http://localhost/upload/show_4.jpg', 'http://google.com/', 'asdadsadadasdaddassssssssssssssssssssssssssssssssssssssss');

-- --------------------------------------------------------

--
-- 表的结构 `lbw_index_top_msg`
--

DROP TABLE IF EXISTS `lbw_index_top_msg`;
CREATE TABLE IF NOT EXISTS `lbw_index_top_msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `href` varchar(64) NOT NULL DEFAULT '#',
  `uid` varchar(16) DEFAULT NULL,
  `nid` varchar(16) DEFAULT NULL,
  `addTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `stopTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `lbw_index_top_msg`
--

INSERT INTO `lbw_index_top_msg` (`id`, `content`, `href`, `uid`, `nid`, `addTime`, `stopTime`) VALUES
(1, '------------------sssss\r\n\r\nasdasd\r\n大杀四方\r\nadsfas ', '#', 'asda', 'asdad', '2011-10-11 17:12:31', '2011-10-11 19:12:31');

-- --------------------------------------------------------

--
-- 表的结构 `lbw_param`
--

DROP TABLE IF EXISTS `lbw_param`;
CREATE TABLE IF NOT EXISTS `lbw_param` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `param_key` varchar(255) DEFAULT NULL,
  `param_value` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `lbw_param`
--

INSERT INTO `lbw_param` (`id`, `param_key`, `param_value`) VALUES
(1, 'index-aboutus', '挂吧用我们'),
(2, 'asdasd', 'adasdasdad'),
(3, 'aasdasd', 'asdasd'),
(4, 'asdasdasd', 'asd');

-- --------------------------------------------------------

--
-- 表的结构 `lbw_user`
--

DROP TABLE IF EXISTS `lbw_user`;
CREATE TABLE IF NOT EXISTS `lbw_user` (
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `lbw_user`
--

INSERT INTO `lbw_user` (`id`, `uid`, `nid`, `pwd`, `sex`, `tel`, `mob`, `qq`, `msn`, `tel2`, `email`, `entryDate`, `age`, `depart`, `address`, `idNumber`, `isAdmin`) VALUES
(1, 'admin', '管理员', '1267f3785ebfea0eaa89a3d1595e718f', 0, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', 20, 2, NULL, NULL, '1'),
(2, 'lincong', '林聪', '1267f3785ebfea0eaa89a3d1595e718f', 0, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', 20, 2, NULL, NULL, '1'),
(3, 'aa', 'adsasd', '1267f3785ebfea0eaa89a3d1595e718f', 2, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '1987-12-12', 23, 1, 'asdasdasd', NULL, '0'),
(4, 'jianglili', '江黎俐', '1267f3785ebfea0eaa89a3d1595e718f', 2, '0571-886617786', '15925711961', '159257119', 'llll@live.com', '88234636', 'lincong1987@gmail.com', '2011-05-01', 20, 3, '杭州滨江', 'e7a5f0bbca4dc5bfbf', '1'),
(5, 'gaochen', '高晨', '21232f297a57a5a743894a0e4a801fc3', 2, '', '', '', '', '', 'gaochen@icinfo.com.cn', '2011-10-05', 20, 2, '河南', 'd41d8cd98f00b204e9', '0'),
(6, 'zhangjun', '章军', 'e10adc3949ba59abbe56e057f20f883e', 1, '', '', '', '', '', 'zj@xx.xx', '2011-10-26', 20, 2, 'ss', 'fe73f687e5bc528021', '1'),
(7, 'huangli', '黄丽', '1267f3785ebfea0eaa89a3d1595e718f', 2, '', '', '', '', '', 'huangli@icinfo.com', '2011-01-03', 20, 5, '啊啊', '1a100d2c0dab19c443', '1');

-- --------------------------------------------------------

--
-- 表的结构 `lbw_web_nav`
--

DROP TABLE IF EXISTS `lbw_web_nav`;
CREATE TABLE IF NOT EXISTS `lbw_web_nav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT '0',
  `name` varchar(32) DEFAULT NULL COMMENT '链接名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='lbw_web_nav' AUTO_INCREMENT=1 ;

--
-- 转存表中的数据 `lbw_web_nav`
--


-- --------------------------------------------------------

--
-- 表的结构 `lbw_web_news`
--

DROP TABLE IF EXISTS `lbw_web_news`;
CREATE TABLE IF NOT EXISTS `lbw_web_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_title` varchar(255) NOT NULL DEFAULT '未命名的新闻',
  `news_content` text,
  `news_content_short` varchar(50) DEFAULT NULL,
  `news_post_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `news_type_id` int(11) DEFAULT '1',
  `uid` varchar(16) DEFAULT NULL,
  `isPublish` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `lbw_web_news`
--

INSERT INTO `lbw_web_news` (`id`, `news_title`, `news_content`, `news_content_short`, `news_post_time`, `news_type_id`, `uid`, `isPublish`) VALUES
(1, '未命名的新闻', '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', '11111111111111111111111111111111111111111111111111', '2011-10-10 00:55:41', 1, 'lincong', 1),
(2, 'asdasdasd', 'asdasd', 'asdasd', '2011-09-26 02:36:00', 1, 'lincong', 1),
(3, '12312312312', '<img alt="" src="http://maps.googleapis.com/maps/api/staticmap?center=31.230393%2C121.473704&amp;zoom=11&amp;size=558x360&amp;maptype=roadmap&amp;markers=31.230393%2C121.473704&amp;language=zh_CN&amp;sensor=false" />', '', '2011-10-28 02:37:00', 1, 'lincong', 1),
(4, '132123', 'asdasdasd', 'asdasdasd', '0000-00-00 00:00:00', 1, 'lincong', 1),
(5, 'asdasd', 'sdasd', 'sdasd', '0000-00-00 00:00:00', 1, 'lincong', 1),
(6, 'asdasd', 'sdasd', 'sdasd', '0000-00-00 00:00:00', 1, 'lincong', 1),
(7, 'wqdqwda', '<img src="/upload/image/20111010/20111010183531_53931.jpg" alt="" />', '此条新闻没有文本内容', '0000-00-00 00:00:00', 1, 'lincong', 1);

-- --------------------------------------------------------

--
-- 表的结构 `lbw_web_news_type`
--

DROP TABLE IF EXISTS `lbw_web_news_type`;
CREATE TABLE IF NOT EXISTS `lbw_web_news_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(12) DEFAULT NULL,
  `sort` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `lbw_web_news_type`
--

INSERT INTO `lbw_web_news_type` (`id`, `name`, `sort`) VALUES
(1, '新闻', 0);
