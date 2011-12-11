<?php
include("../function.php");

$action = isset($_REQUEST["action"]) ? $_REQUEST["action"] : "";

if($action == "add"){
	$param= new param();
	$result = $param->saveParam();
	switch($result){
		case "success" : 
			error("添加成功！", "alertGoTo", $_SERVER['HTTP_REFERER']);
		break;
		case "error" : 
			error($news->getActionError(), "alertGoTo", $_SERVER['HTTP_REFERER']);
		break;		
		}	
	}

if($action == "doMod"){
	
	$paramKey = isset($_REQUEST["paramKey"]) ? $_REQUEST["paramKey"] : "";
	$paramValue = isset($_REQUEST["paramValue"]) ? $_REQUEST["paramValue"] : "";
	
	if(trim($paramKey) =="" ){
		jsonError("fail", "paramKey is NULL");
		}
	
	$param= new param();
	$result = $param->setParamValue($paramKey, $paramValue);
	switch($result){
		case "success" : 
			jsonError("succ");
		break;
		case "error" : 
			jsonError("fail", $param->getActionError());
		break;		
		}	
	}

if($action == "doAdd"){
	$param= new param();
	$result = $param->add();
	switch($result){
		case "success" : 
			error("添加成功！", "alertGoTo", $_SERVER['HTTP_REFERER']);
		break;
		case "error" : 
			error($news->getActionError(), "alertGoTo", $_SERVER['HTTP_REFERER']);
		break;		
		}	
	}
?>