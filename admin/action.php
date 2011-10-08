<?php
/*!
 * Action Lib :: domain/admin/action.php :: 管理admin请求
 *
 * Author: lincong1987@gmail.com
 *
 * Date: 2011/10/7
 */
include("../function.php");

$action = isset($_REQUEST["action"]) ? $_REQUEST["action"] : "";

//新闻请求
include("news_manage_action.php");	
	
	
//用户管理请求
include("user_manage_action.php");
	
	
	
	
	
	
	
	
	
	
	
	
	
	
?>