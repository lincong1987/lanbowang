<?php
header('Content-Type: text/html; charset=utf-8');
include("inc/config.php");

$mysqlError = mysql_error();














function error($str="", $type="die"){
	$str = !empty($str) ? $str : "未定义的错误";
	$err_img = WEB_HOST."/src/img/icon_error.gif";
	switch($type){
		case "die" :
		die("<html><body><div style='font-size:12px; font-family:Verdana;background:url({$err_img}) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px; border:1px solid #8cb7d7; margin:10px; color:#369'><br>错误:{$str}</div></body></html>");
		break;
		case "json" :
		jsonError("fail", $str);
		break;
		default:
		echo "<html><body><div style='font-size:12px; font-family:Verdana;background:url({$err_img}) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px; border:1px solid #8cb7d7; margin:10px; color:#369'><br>错误:{$str}</div></body></html>";
		break;		
		}
	}

//////////////////////////////////////////
//jsonError
//////////////////////////////////////////
function jsonError($state="undefined",$msg="undefined",$error="undefined", $type='json'){
		
	$tmp = array("state" => $state, "msg" => $msg, "error" => $error);
	switch($type){		
		case "easyui" : 
		$tmp = array("rows" => $msg, "total" => $state, "debug" => $error);
		header('Content-type: application/json; charset=UTF-8');
		die(json_encode($tmp));
		exit();
		break;
		case "return" : 
		//$tmp = array("state" => $state, "msg" => $msg, "error" => $error);
		return (json_encode($tmp));
		break;		
		}
	header('Content-type: application/json; charset=UTF-8');	
	$jsoncallback = isset($_GET["jsoncallback"]) ? $_GET["jsoncallback"] : "";
	if(empty($jsoncallback)){die(json_encode($tmp));}else{die($jsoncallback."(".json_encode($tmp).")");}
	}














?>