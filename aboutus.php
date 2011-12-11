<?php include("function.php");
$index = new index();

$paramKey = isset($_GET["paramKey"]) ? $_GET["paramKey"] : "";
if(trim($paramKey) == ""){
	error("应用程序没有获取到需要的参数paramKey，建议您关闭浏览器后重试。");
	die();
	}

$param = new param();

$paramValue = $param->getParamValue($paramKey);

//获取首页置顶消息
$index_msg = $index->getIndexMsg();

//获取首页置顶消息
$index_top_msg = $index->getTopMsg();

//获取首页置顶消息
$index_slide_images = $index->getIndexSlideImages(10);

//检查是否登陆
$isLogin = login::isLogin();



$user = user::getUserSession();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php
//导入meta数据及js库
echo $systemHead["meta"].
	$systemHead["title"].
	CSS_BASE.
	JS_JQUERY;
?>


<script>
var index_msg = <?php echo json_encode($index_msg);?>;

var index_top_msg = <?php echo json_encode($index_top_msg);?>;

var index_slide_images = <?php echo json_encode($index_slide_images);?>;

var isLogin = <?php echo json_encode($isLogin);?>;

var user = <?php echo json_encode($user);?>;

var system = <?php echo json_encode($system);?>;

</script>

<style type="text/css">

</style>

</head>

<body>
<?php
	include("html/header.php");
?>
<div class="clearFix"></div>

<div class="main" style="margin-top:0"><img src="src/images/level_banner_2.gif" /></div>

<div class="clearFix"></div>

<div class="main">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="250" valign="top">
    	<div style="width:250px"><img src="src/images/aboutnumberone.gif" width="250" height="69" /></div>
    	
    	<div style="width:250px" class="left_menu">
       	  <ul>
            	<li><a href="aboutus.php?paramKey=aboutus">蓝博旺简介</a></li>
                <li><a href="aboutus.php?paramKey=philosophy">企业理念</a></li>
                <li><a href="aboutus.php?paramKey=honor">企业荣誉</a></li>
                <li><a href="aboutus.php?paramKey=business">业务范围</a></li>
                <li><a href="aboutus.php?paramKey=organization">组织架构</a></li>
                <li><a href="aboutus.php?paramKey=team">精英团队</a></li>
            </ul>
        </div>
    </td>
    <td width="0" valign="top">
    <div class="article_top">
    	<table width="100%" border="0" cellpadding="0" cellspacing="0">
        	<tr>
            	<td width="200"><span class="">走进蓝博旺</span></td>
                <td><span>走进蓝博旺</span></td>
            </tr>
        </table>
    </div>
    <div class="article_body">
    	<?php echo $paramValue;?>    
    </div>
    </td>
  </tr>
</table>


</div>

<div class="clearFix"></div>
<?php
	include("html/footer.php");
?>
<?php echo JS_COMMON.
	JS_BASE.
	JS_DIALOG;?>
<script>

$(document).ready(function(){
	

</script>

</body>
</html>

