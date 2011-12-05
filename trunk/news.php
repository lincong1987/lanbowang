<?php include("function.php");
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : "";

if(empty($id)){
	error("非法访问！");
	}

$newsClass = new news();
$news = $newsClass->getNewsById($id);

$index = new index();

//获取首页置顶消息
$index_msg = $index->getIndexMsg();

//获取首页置顶消息
$index_top_msg = $index->getTopMsg();

//获取首页置顶消息
//$index_slide_images = $index->getIndexSlideImages(10);

//检查是否登陆
$isLogin = login::isLogin();

//
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
	JS_JQUERY.
	JS_COMMON.
	JS_BASE.
	JS_DIALOG;
?>
<script>
var isLogin = <?php echo json_encode($isLogin);?>;

var user = <?php echo json_encode($user);?>;

var system = <?php echo json_encode($system);?>;

$(document).ready(function(){

	});
</script>
</head>

<body>
<?php
	include("html/header.php");
?>

<div class="clearFix"></div>

<div class="news">
	<div class="news_header"><?php echo $news[0]["news_title"];?></div>
    <div class="news_datetime"><?php echo $news[0]["news_post_time"];?></div>
	<div class="news_body"><?php echo $news[0]["news_content"];?></div>
    <div class="news_footer"><a href="javascript:void(0);" onclick="window.close()">【关闭】</a> <a href="javascript:void(0);" onclick="window.print();">【打印】</a></div>
</div>
<div class="clearFix"></div>
<?php
	include("html/footer.php");
?>

</body>
</html>