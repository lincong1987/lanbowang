<?php
//session 开始
session_start();
/*
	全局调试
		@param true , false
*/
$debug = false;

/*
	错误报告 
		@param args[0]
			0 , E_ERROR | E_WARNING | E_PARSE , E_ALL
*/
error_reporting(E_ALL);



//设置PHP执行时间为无限制
set_time_limit(0);


define('debug', $debug);
define('HOST', 'localhost');

//本地文档目录
define('WEB_ROOT', dirname(__FILE__));
//设置项目的工作路径 domain/{NAME_SPACE}/index...
define("NAME_SPACE", "");

define('WEB_HOST', 'http://'.$_SERVER['HTTP_HOST'].'/'.NAME_SPACE);
define('WEB_PATH', WEB_HOST);

//二级目录
define('WEB_SRC', WEB_HOST.NAME_SPACE."/src");
define('WEB_JS', WEB_HOST.NAME_SPACE."js/");
define('WEB_CSS', WEB_HOST.NAME_SPACE."css/");
define('HTML_PATH', WEB_HOST.NAME_SPACE."/html");

//已上传文件路径
define('WEB_UPLOAD_PATH', WEB_HOST.NAME_SPACE."upload/");		

//本地文档上传目录
define('UPLOADFILE_ROOT', realpath(dirname(WEB_ROOT)."/upload"));

define('UPLOAD_FILE_MAX_SIZE', 1000000000);

//定义允许上传的文件扩展名
$uploadExt = array(
	'image' => array('gif', 'jpg', 'jpeg', 'png', 'bmp', 'tiff', 'ico'),
	'flash' => array('swf', 'flv'),
	'media' => array('swf', 'flv', 'mp3', 'wav', 'wma', 'wmv', 'mid', 'avi', 'mpg', 'asf', 'rm', 'rmvb'),
	'file' => array('doc', 'docx', 'xls', 'xlsx', 'ppt', 'htm', 'html', 'txt', 'zip', 'rar', 'gz', 'bz2', 'swf', 'flv', 'mp3', 'wav', 'wma', 'wmv', 'mid', 'avi', 'mpg', 'asf', 'rm', 'rmvb', 'gif', 'jpg', 'jpeg', 'png', 'bmp', 'tiff', 'ico', '7z', 'psd', 'pdf', 'sql', 'url', 'exe'),
);

//数据库相关配置
$mysqlConfig = array(
	"db_host" => 'localhost',
	"db_port" => '3306',
	"db_user" => 'hx_exam',
	"db_pass" => '86617786',
	"db_name" => 'lbw',
	"db_perfix" => 'lbw_',	
	"db_charset" => 'utf8'
);



//系统
$system = array(
	"company" => "蓝博旺不动产营运集团",
	"name" => "蓝博旺不动产营运集团 官方网站",
	"host" => HOST,
	"WEB_HOST" => WEB_HOST,
	"HTML_PATH" => HTML_PATH,
	"WEB_JS" => WEB_JS,
	"WEB_CSS" => WEB_CSS,
	"WEB_SRC" => WEB_SRC,
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
    <meta http-equiv="X-UA-Compatible" content="IE=7" />
		<meta name="copyright" content="'.$system["host"].',版权所有" />
		<meta name="description" content="'.$system["description"].'" />
		<meta name="keywords" content="'.$system["keywords"].'" />
		<meta name="author" contect="'.$system["author"].'" />
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
	对话框皮肤 默认default
		@param $dialogSkin 对话框主题, 有以下列表可选择
			default, aero, black, blue, chrome, green, idialog, opera, simple, twitter

*/
$dialogSkin = 'idialog';

/*
	jquery版本
	@param $jqueryVersion jquery的版本，
		可选 1.5.2 , 1.6.2 , 1.6.4，
			有新版本需要在js/下添加
*/
$jqueryVersion = '1.6.2';

/**
 * Silvery Aqua
 */
$ligerUISkin = 'Silvery';

/*
	定义各种JS库的路径
*/
define("dialogPath", WEB_PATH."src/artDialog/jquery.artDialog.js?skin=".$dialogSkin);
define("dialogToolsPath", WEB_PATH."src/artDialog/plugins/iframeTools.js");
define("JS_DIALOG", '<script src="'.dialogPath.'" language="javascript" type="text/javascript"></script>
					<script src="'.dialogToolsPath.'" language="javascript" type="text/javascript"></script>
					');
define("jqueryPath", WEB_PATH."js/jquery-".$jqueryVersion.".min.js?ver=".$jqueryVersion);
define("JS_JQUERY", '<script src="'.jqueryPath.'" language="javascript" type="text/javascript"></script>
					');
define("JS_COMMON", '<script src="'.WEB_JS.'common.js" charset="utf-8" language="javascript" type="text/javascript"></script>
					');					
define("JS_BASE", '<script src="'.WEB_JS.'base.js" charset="utf-8" language="javascript" type="text/javascript"></script>
					');
define("KINDEDITOR", '<script src="'.WEB_PATH.'src/kindeditor/kindeditor-min.js" language="javascript" type="text/javascript"  charset="utf-8"></script>
					<script src="'.WEB_PATH.'src/kindeditor/lang/zh_CN.js" language="javascript" type="text/javascript"  charset="utf-8"></script>
					');				
define("LIB_LIGERUI", '<link href="'.WEB_PATH.'src/LigerUI/lib/ligerUI/skins/'.$ligerUISkin.'/css/ligerui-all.css" rel="stylesheet" type="text/css" />
					 <script src="'.WEB_PATH.'src/LigerUI/lib/ligerUI/js/ligerui.min.js" type="text/javascript"></script>
					 <script src="'.WEB_PATH.'src/LigerUI/lib/jquery-validation/jquery.validate.min.js" type="text/javascript"></script>
					 <script src="'.WEB_PATH.'src/LigerUI/lib/jquery-validation/jquery.metadata.js" type="text/javascript"></script>
					 <script src="'.WEB_PATH.'src/LigerUI/lib/jquery-validation/messages_cn.js" type="text/javascript"></script>');

define("CSS_BASE", '<link rel="stylesheet" type="text/css" href="'.WEB_CSS.'base.css"/>
					');



/*
	连接数据库
	
*/
$conn = @mysql_connect($mysqlConfig["db_host"].":".$mysqlConfig["db_host"], $mysqlConfig["db_user"], $mysqlConfig["db_pass"]);
if (!$conn) {
    error(mysql_error()."<br>请联系系统管理员 <a href='mailto:{$system["adminMail"]}'>发送邮件</a>。");
}
$mysql_db = @mysql_select_db($mysqlConfig["db_name"], $conn);
if (!$mysql_db){
    error(mysql_error()."<br>请联系系统管理员 <a href='mailto:{$system["adminMail"]}'>发送邮件</a>。");
}



?>