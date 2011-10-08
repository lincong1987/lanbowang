<?php
/*!
 * Action Lib :: domain/action.php :: 管理前台请求
 *
 * Author: lincong1987@gmail.com
 *
 * Date: 2011/10/7
 */
 
include("function.php");

$action = isset($_REQUEST["action"]) ? $_REQUEST["action"] : "";

//登陆
if($action == "login"){
	$login = new login();
	$result = $login->loginIn();
	switch($result){
		case "success" : 
			//error($login->getActionError, "alertGoTo", $_SERVER['HTTP_REFERER']);
			header("location:".WEB_HOST."index.php");
		break;
		case "error" : 
			//print_r ($login->getActionError());
			//die();
			error($login->getActionError(), "alertGoTo", $_SERVER['HTTP_REFERER']);
			//header("location:".WEB_HOST."index.php");
		break;
		}
	
	}

//退出
if($action == "loginOut"){
	$rs = login::loginOut();
	error("", "goTo", WEB_HOST."INDEX.PHP");
	}




?>