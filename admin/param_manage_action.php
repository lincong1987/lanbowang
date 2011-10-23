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



?>