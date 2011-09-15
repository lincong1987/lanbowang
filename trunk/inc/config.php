<?php 
//
error_reporting(0);
//
session_start();
//设置PHP执行时间为无限制
set_time_limit(0);

define('WEB_HOST', 'http://'.$_SERVER['HTTP_HOST'].'/');
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
	"meta" => '<meta name="description" content="{$system["description"]}">
				<meta name="keywords" content="{$system["keywords"]}">
				<meta name="author" contect="{$system["author"]}">
				<meta http-equiv="Content-Type" content="text/html; charset={$system["charset"]}" />'		
);


$systemFoot = array(
	"foot" => "<div class='foot'>foot</div>"
);

if($system["close"]){
		die("{$system["name"]}未开启, 请联系系统管理员 <a href='mailto:{$system["adminMail"]}'>发送邮件</a>");
	}




















$conn = @mysql_connect($mysqlConfig["db_host"].":".$mysqlConfig["db_host"], $mysqlConfig["db_user"], $mysqlConfig["db_pass"]);
if (!$conn) {
    error(mysql_error()."<br>请联系系统管理员 <a href='mailto:{$system["adminMail"]}'>发送邮件</a>。");
}
$mysql_db = @mysql_select_db($mysqlConfig["db_name"], $conn);
if (!$mysql_db){
    error(mysql_error()."<br>请联系系统管理员 <a href='mailto:{$system["adminMail"]}'>发送邮件</a>。");
}



?>