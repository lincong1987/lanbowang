<?php
/**
 *	用户密码修改
 *	
 */
if($action == "userPasswordModi"){
	$user = new user();
	$result = $user->ModiPassword();
	switch ($result){
		case "success" : 
			jsonError("success");
		break;
		case "error" : 
			jsonError("error", $user->getActionError());
		break;
		}
	}




?>