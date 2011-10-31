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
	
	$sql = "delete {$mysqlConfig["db_perfix"]}param where id = {$id} limit 1";
	sqlExecute($sql, "", "json");
	
	jsonError("succ");
	}
	
if($action == "doMod"){
	
	$id = isset($_POST["id"]) ? intval($_POST["id"]) : "";
	if(empty($id)){jsonError("fail", "id为空");}
	
	$paramKey = isset($_POST["paramKey"]) ? $_POST["paramKey"] : "";
	if(empty($paramKey)){jsonError("fail", "paramKey为空");}	
	
	$paramValue = isset($_POST["paramValue"]) ? $_POST["paramValue"] : "";
	if(empty($paramValue)){jsonError("fail", "paramValue为空");}	
		
	$sql = "update {$mysqlConfig["db_perfix"]}param set param_value = '{$paramValue}', param_key = '{$paramKey}',  where id = {$id} limit 1";
	sqlExecute($sql, "", "json");
	
	jsonError("succ");
	}	
	
	
	
jsonError("fail", "action is null");
?>