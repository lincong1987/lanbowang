<?php
/*
	全局调试
		@param true , false
*/
$debug = false;

/*
	错误报告 
		@param 0 , E_ERROR | E_WARNING | E_PARSE , E_ALL
*/
error_reporting(E_ALL);

//session 开始
//session_start();
//设置PHP执行时间为无限制
set_time_limit(0);

//
define('debug', $debug);
define('HOST', 'localhost');
define('WEB_HOST', 'http://'.$_SERVER['HTTP_HOST'].'/');
define('WEB_PATH', 'http://'.$_SERVER['HTTP_HOST'].'/');

//二级目录
define('WEB_SRC', WEB_HOST."/src");
define('WEB_JS', WEB_HOST."/js");
define('WEB_CSS', WEB_HOST."/css");
define('HTML_PATH', WEB_HOST."/html");

define('WEB_ROOT', dirname(__FILE__));




//数据库相关配置
$mysqlConfig = array(
	"db_host" => 'localhost',
	"db_port" => '3306',
	"db_user" => 'hx_exam',
	"db_pass" => '86617786',
	"db_name" => 'lbw',
	"db_charset" => 'utf8'
);



//系统
$system = array(
	"name" => "蓝博旺不动产营运集团 官方网站",
	"host" => HOST,
	"version" => "1.0.0.1",
	"author" => "林聪; lincong1987@gmail.com",
	"adminMail" => "lincong1987@gmail.com",
	"charset" => "utf-8",
	"description" => "中国最具执行力房地产策划机构、中国优秀商业地产实操机构、中国十佳房地产策划机构",
	"keywords" => "蓝博旺,房地产,蓝博旺不动产营运集团",
	"title" => "我明示支点，您撬动地球 - 蓝博旺不动产营运集团",
	"close" => false	
);


$systemHead = array(
	"meta" => '<link rel="icon" href="'.WEB_PATH.'favicon.ico" type="image/x-icon" />
		<link rel="shortcut icon" href="'.WEB_PATH.'favicon.ico" type="image/x-icon" />
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
		<meta name="copyright" content="'.$system["host"].',版权所有"/>
		<meta name="description" content="'.$system["description"].'">
		<meta name="keywords" content="'.$system["keywords"].'">
		<meta name="author" contect="'.$system["author"].'">
		<meta http-equiv="Content-Type" content="text/html; charset='.$system["charset"].'" />',
	"title" => "<title>".$system["title"]."</title>"	
);


$systemFoot = array(
	//"foot" => include(WEB_HOST."/footer.php")
);

if($system["close"]){
		die("{$system["name"]}未开启, 请联系系统管理员 <a href='mailto:{$system["adminMail"]}'>发送邮件</a>");
	}



/*
	对话框皮肤
	默认default, 有以下列表可选择
		@param $dialogSkin = default, aero, black, blue, chrome, green, idialog, opera, simple, twitter

*/
$dialogSkin = 'default';

/*
	jquery版本
	@param $jqueryVersion = 1.5.2 , 1.6.2 , 1.6.4
	
*/
$jqueryVersion = '1.5.2';

















define("dialogPath", WEB_PATH."src/artDialog/artDialog.js?skin=".$dialogSkin);
define("JS_DIALOG", '<script src="'.dialogPath.'" language="javascript" type="text/javascript"></script>');
define("jqueryPath", WEB_PATH."js/jquery-".$jqueryVersion.".min.js?ver=".$jqueryVersion);
define("JS_JQUERY", '<script src="'.jqueryPath.'" language="javascript" type="text/javascript"></script>');











$conn = @mysql_connect($mysqlConfig["db_host"].":".$mysqlConfig["db_host"], $mysqlConfig["db_user"], $mysqlConfig["db_pass"]);
if (!$conn) {
    error(mysql_error()."<br>请联系系统管理员 <a href='mailto:{$system["adminMail"]}'>发送邮件</a>。");
}
$mysql_db = @mysql_select_db($mysqlConfig["db_name"], $conn);
if (!$mysql_db){
    error(mysql_error()."<br>请联系系统管理员 <a href='mailto:{$system["adminMail"]}'>发送邮件</a>。");
}



?>