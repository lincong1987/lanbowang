<?php include("function.php");
$index = new index();

//获取首页置顶消息
$index_msg = $index->getIndexMsg();

//获取首页置顶消息
$index_top_msg = $index->getTopMsg();

//获取首页置顶消息
$index_slide_images = $index->getIndexSlideImages(10);

//检查是否登陆
$isLogin = login::isLogin();

$news = new news();

$newsList = $news->get(10);

$newsTypeList = $news->getNewsType();

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
	CSS_BASE;
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
        	<li><a class="normalMenu on" href="<?php echo WEB_HOST."index.php";?>">首页</a></li>
            <li><a class="normalMenu" sub="aboutus" href="<?php echo WEB_HOST."index.php";?>">关于我们</a></li>
            <li><a class="normalMenu" href="<?php echo WEB_HOST."index.php";?>">企业文化</a></li>            
            <li><a class="normalMenu" sub="news" href="<?php echo WEB_HOST."news.php";?>">新闻中心</a></li>
            <li><a class="normalMenu" href="<?php echo WEB_HOST."index.php";?>">楼盘中心</a></li>
            <li><a class="normalMenu" href="<?php echo WEB_HOST."index.php";?>">人才中心</a></li>            
        </ul>
        <ul></ul>
    </div>
    <div id="aboutus" class="sub">
        <ul><li><a>测试</a></li><li><a>测试</a></li><li><a>测试</a></li><li><a>测试</a></li><li><a>测试</a></li></ul>
    </div>
    
    <div id="news" class="sub">
        <ul><?php
        foreach($newsTypeList as $key=>$value){
			echo "<li><a href='".WEB_HOST."news.php?type=".$value["id"]."'>{$value["name"]}</a></li>";
			}
		?></ul>
    </div>
</div>

<div class="clearFix"></div>
<div class="main_clearfix"></div>
<div id="index_slide_images"></div>
<div class="main_clearfix"></div>
<div id="main">

</div>
	<table align="center" width="950" border="0" cellpadding="0" cellspacing="0">
    	<tr>
        	<td width="250">
            	<div id="index-aboutus">
                	<div class="head">
                    	关于蓝博旺 about us
                    </div>
                    <div>
                    	<?php $param = new param(); echo $param->getParamValue("index-aboutus");?>
                    </div>
                    <div></div>
                </div>
            </td>
        	<td width="0">
            <div class="tab-show">
            	<ol>
                	<li><a>项目产品</a></li>
                    <li class="more"><a>more...</a></li>
                </ol>
                <ul>
                	<li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                </ul>
            </div>            
            </td>
        	<td width="250">
            <div class="tab-show">
            	<ol>
                	<li><a>项目产品</a></li>
                    <li class="more"><a>more...</a></li>
                </ol>
                <ul>
                	<li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                    <li><a>测试测试测试测试测试测试</a> <span>2011-09-25</span></li>
                </ul>
            </div>            
            </td>
        </tr>        
    </table>

<?php
	include("html/footer.php");
?>
<?php echo 	JS_JQUERY.
	JS_COMMON.
	JS_BASE.
	JS_DIALOG;?>
<script>

$(document).ready(function(){
	
	//构造slide图
	$("#index_slide_images").append('<div id="piclist"></div><div id="numlist"></div>');
	$.each(index_slide_images, function(i, n){
		$("#index_slide_images #piclist").append('<a href="'+(n.href==''?'#':n.href)+'" id="index_slide_images_img_'+(i+1)+'" title="'+n.content+'"><img src="'+n.imagePath+'" width="950" height="260"/></a>');
		$("#index_slide_images #numlist").append('<a href="javascript:;" id="index_slide_images_a_'+(i+1)+'">'+(i+1)+'</a>');
		});
		
		
		
	$('#numlist a').hover(function(){  
		var $index = $('#numlist a').index(this);
		showIndex($index);  
	});
	  
	$('#index_slide_images').hover(function(){  
		if(timer){clearInterval(timer);}  
	},function(){  
		timer=setInterval(function(){  
			showIndex(index)  
			index++;  
			if(index==5){index=0;}  
		},4000);  
	});  
	  
	var index=0;  
	var timer=setInterval(function(){  
		showIndex(index)  
		index++;  
		if(index==5){index=0;}  
	},4000);  
	  
	function showIndex(i){  
		$('#numlist a').eq(i).addClass('select').siblings('a').removeClass('select');  
		$('#piclist a').eq(i).fadeIn(500).siblings('a').fadeOut(200);  
	} 

	//显示弹窗消息
	if(index_msg!=0){
		art.dialog({id:"index_msg", title:"重要消息", content:index_msg[0].content, width:400, lock:true, ok:function(){}});
		}

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

</body>
</html>

