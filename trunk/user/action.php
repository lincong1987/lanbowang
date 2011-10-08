<?php
/*!
 * Action Lib :: domain/user/action.php :: 管理用户后台请求
 *
 * Author: lincong1987@gmail.com
 *
 * Date: 2011/10/7
 */
include("../function.php");

$action = isset($_REQUEST["action"]) ? $_REQUEST["action"] : "";

//修改密码
include("user_password_modi_action.php");




?>