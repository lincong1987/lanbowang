<?php
/*!
 * Action Lib
 *
 * Author: lincong1987@gmail.com
 *
 * Date: 2011/10/7
 */
include("../function.php");

$action = isset($_REQUEST["action"]) ? $_REQUEST["action"] : "";

if($action == "add"){
	$user = new user();	
	$result = $user->add();
	switch($result){
		case "success" : 
			error("添加成功！", "alertGoTo", $_SERVER['HTTP_REFERER']);
		break;
		case "error" : 
			error($user->getActionError, "alertGoTo", $_SERVER['HTTP_REFERER']);
		break;		
		
		}	
	}



?>