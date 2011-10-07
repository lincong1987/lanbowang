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
	$user = array(
		"uid" => isset($_POST["uid"]) ? trim($_POST["uid"]) : "",
		"nid" => isset($_POST["nid"]) ? trim($_POST["nid"]) : "",
		"pwd" => isset($_POST["pwd"]) ? md5(trim($_POST["pwd"])) : "",
		"pwd2" => isset($_POST["pwd2"]) ? md5(($_POST["pwd2"])) : "",
		"idNumber" => isset($_POST["idNumber"]) ? md5(($_POST["idNumber"])) : "",
		"sex" => isset($_POST["sex"]) ? trim($_POST["sex"]) : 1,
		"tel" => isset($_POST["tel"]) ? trim($_POST["tel"]) : "",
		"tel2" => isset($_POST["tel2"]) ? trim($_POST["tel2"]) : "",
		"mob" => isset($_POST["mob"]) ? trim($_POST["mob"]) : "",
		"qq" => isset($_POST["qq"]) ? trim($_POST["qq"]) : "",
		"msn" => isset($_POST["msn"]) ? trim($_POST["msn"]) : "",
		"email" => isset($_POST["email"]) ? trim($_POST["email"]) : "",
		"entryDate" => isset($_POST["entryDate"]) ? trim($_POST["entryDate"]) : date("Y-m-d", time()),
		"age" => isset($_POST["age"]) ? trim($_POST["age"]) : 20,
		"depart" => isset($_POST["depart"]) ? trim($_POST["depart"]) : 2,
		"address" => isset($_POST["address"]) ? trim($_POST["address"]) : "未填写"	
		);
	
	if(empty($user["uid"]))error("用户名为空", "alertGoBack");
	if(empty($user["pwd"]))error("密码为空", "alertGoBack");
	if($user["pwd"] != $user["pwd2"])error("密码不一致", "alertGoBack");
	
	$result = user::add($user);
	if($result){
		error("添加成功！", "alertGoTo", $_SERVER['HTTP_REFERER']);
		}
	}



?>