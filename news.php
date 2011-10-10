<?php include("function.php");
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : "";

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
var index_top_msg = <?php echo json_encode($index_top_msg);?>;

var isLogin = <?php echo json_encode($isLogin);?>;

var user = <?php echo json_encode($user);?>;

var system = <?php echo json_encode($system);?>;

$(document).ready(function(){
	//显示TOP滚动消息
	if(index_top_msg!=0){
		$.each(index_top_msg, function(i, n){
			var reg = /[\r\n]/g;			
			n.content = n.content.replace(reg,"");
			$(".head-content").find("marquee").append("<a id='index_top_msg_"+n.id+"' href='"+n.href+"' title='"+n.content+"'>"+n.content+"</a>")
			});		
		}else{$(".head-content").empty();}

	$("#fastLoginForm").find(".text").keydown(function(e){
		var e = e || e.event;
		if(e.keyCode == 13){
			fastLogin();
			}
		});

	if(isLogin){
		$("#fastLoginForm").replaceWith(getHello() + user.nid + ", 欢迎登陆" + system.company + "。<a href='/user/'>[后台]</a> <a href='javascript:;' onclick='loginOut()'>[退出]</a> ");
		}
	
	WEATHER.RunGLNL();
	$.NAV.init();
	
	});
</script>
</head>

<body>
<div id="login_nav">
	<ul>
        <li class="head-login">
            <form method="post" id="fastLoginForm" name="fastLoginForm" action="">
                <label>用户名 <input class="text" name="uid" id="uid" maxlength="12" size="12" /></label>
                <label>密码 <input class="text" type="password" name="pwd" id="pwd" maxlength="12" size="12" /></label>
                <input class="btn" type="button" value="登陆" onclick="fastLogin()" />
                <input class="btn" type="button" value="管理" onclick="adminLogin()" />
            </form>
        </li>
        <li class="head-content"><a href="#">系统公告:</a>
        <marquee truespeed="truespeed" onmouseover="this.stop()" onmouseout="this.start()"></marquee></li>
    </ul>    
</div>

<div class="main_clearfix"></div>

<div id="nav">
	<div id="logo">
    	<img src="src/flash/logo.png" width="208" height="80" />
        <div id="logo-r">
			<ul>
            	<li><span id="chinese_date">12</span> <span id="western_date">23</span> </li>
            </ul>
        </div>
 	</div>
    <div class="clearFix"></div>
	<div id="nav-tab">
		<ul style="width:20px"></ul>
    	<ul id="navigationMenu">
        	<li><a class="normalMenu" >首页</a></li>
            <li><a class="normalMenu" sub="aboutus">关于我们</a></li>
            <li><a class="normalMenu">企业文化</a></li>            
            <li><a class="normalMenu on" sub="news">新闻中心</a></li>
            <li><a class="normalMenu">楼盘中心</a></li>
            <li><a class="normalMenu">人才中心</a></li>            
        </ul>
        <ul></ul>
    </div>
    <div id="aboutus" class="sub">
        <ul><li><a>测试</a></li><li><a>测试</a></li><li><a>测试</a></li><li><a>测试</a></li><li><a>测试</a></li></ul>
    </div>
    
    <div id="news" class="sub">
        <ul><li><a>测试</a></li><li><a>测试</a></li><li><a>测试</a></li></ul>
    </div>
</div>

<div class="clearFix"></div>
<div class="main_clearfix"></div>

<div class="main_clearfix"></div>
<div id="main">
<style>
#news_body{}
#news_body{}
#news_body{}
#news_body{}
#news_body{}
#news_body{}

</style>

<div id="news_body"></div>
</div>

<?php
	include("html/footer.php");
?>

</body>
</html>