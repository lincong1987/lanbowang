<?php
/*!
 * Action Lib
 *
 * Author: lincong1987@gmail.com
 *
 * Date: 2011/10/7
 */
 
include("function.php");

$action = isset($_REQUEST["action"]) ? $_REQUEST["action"] : "";

//登陆
if($action == "login"){
	$uid = isset($_REQUEST["uid"]) ? trim($_REQUEST["uid"]) : "";
	if(empty($uid)){error("用户名为空", "alertGoBack");}
	$pwd = isset($_REQUEST["pwd"]) ? $_REQUEST["pwd"] : "";
	if(empty($uid)){error("密码为空", "alertGoBack");}
	//返回后台地址
	$redirect = login::loginIn($uid, $pwd);	
	header("location:".WEB_HOST."index.php");
	}

//退出
if($action == "loginOut"){
	$rs = login::loginOut();
	error("", "goTo", WEB_HOST."INDEX.PHP");
	}




?>