<?php
include("../function.php");

$action = isset($_REQUEST["action"]) ? $_REQUEST["action"] : "";

if($action == "add"){
	$news= new news();
	$result = $news->add();
	switch($result){
		case "success" : 
			error("添加成功！", "alertGoTo", $_SERVER['HTTP_REFERER']);
		break;
		case "error" : 
			error($news->getActionError(), "alertGoTo", $_SERVER['HTTP_REFERER']);
		break;		
		}	
	}

if($action == "doRm"){
	
	$id = isset($_POST["id"]) ? intval($_POST["id"]) : "";
	if(empty($id)){jsonError("fail", "id为空");}
	
	$sql = "delete {$mysqlConfig["db_perfix"]}web_news where id = {$id} limit 1";
	sqlExecute($sql, "", "json");
	
	jsonError("succ");
	}
	
if($action == "doMod"){
	$news= new news();
	$result = $news->modi();
	switch($result){
		case "success" : 
			error("添加成功！", "alertGoTo", $_SERVER['HTTP_REFERER']);
		break;
		case "error" : 
			error($news->getActionError(), "alertGoTo", $_SERVER['HTTP_REFERER']);
		break;		
		}	
	}	
	
	
	
jsonError("fail", "action is null");
?>