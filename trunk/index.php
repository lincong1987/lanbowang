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
<div class="header">
<div id="login_form">
    	<ul>
        	<li><a>登陆</a></li>
            <li><span>|</span></li>
            <li><a>注册</a></li>
        </ul>
    </div>
</div>

<div class="clearFix"></div>
<div class="header_bar"></div>
<div class="clearFix"></div>

<div class="nav">
	<ul>
    	<li><a>首页</a></li>
        <li><span>|</span></li>
        <li><a>走进蓝博旺</a></li>
        <li><span>|</span></li>
        <li><a>项目展示</a></li>
        <li><span>|</span></li>
        <li><a>地产论坛</a></li>
        <li><span>|</span></li>
        <li><a>人力中心</a></li>
        <li><span>|</span></li>
        <li><a>联系我们</a></li>
    </ul>
    <ul class="fast_search">
    	<form id="fast_search">
        	<input id="fast_search_text" name="fast_search_text" /> <input type="image" src="src/images/search_btn.gif"/>
        </form>
    </ul>
</div>



<?php
	include("html/footer.php");
?>
<?php echo JS_COMMON.
	JS_BASE.
	JS_DIALOG;?>
<script>

$(document).ready(function(){
	
	//构造slide图
//	$("#index_slide_images").append('<div id="piclist"></div><div id="numlist"></div>');
//	$.each(index_slide_images, function(i, n){
//		$("#index_slide_images #piclist").append('<a href="'+(n.href==''?'#':n.href)+'" id="index_slide_images_img_'+(i+1)+'" title="'+n.content+'"><img src="'+n.imagePath+'" width="950" height="260"/></a>');
//		$("#index_slide_images #numlist").append('<a href="javascript:;" id="index_slide_images_a_'+(i+1)+'">'+(i+1)+'</a>');
//		});
//		
//		
//		
//	$('#numlist a').hover(function(){  
//		var $index = $('#numlist a').index(this);
//		showIndex($index);  
//	});
//	  
//	$('#index_slide_images').hover(function(){  
//		if(timer){clearInterval(timer);}  
//	},function(){  
//		timer=setInterval(function(){  
//			showIndex(index)  
//			index++;  
//			if(index==5){index=0;}  
//		},4000);  
//	});  
//	  
//	var index=0;  
//	var timer=setInterval(function(){  
//		showIndex(index)  
//		index++;  
//		if(index==5){index=0;}  
//	},4000);  
//	  
//	function showIndex(i){  
//		$('#numlist a').eq(i).addClass('select').siblings('a').removeClass('select');  
//		$('#piclist a').eq(i).fadeIn(500).siblings('a').fadeOut(200);  
//	} 
//
//	//显示弹窗消息
//	if(index_msg!=0){
//		art.dialog({id:"index_msg", title:"重要消息", content:index_msg[0].content, width:400, lock:true, ok:function(){}});
//		}
//
//	//显示TOP滚动消息
//	if(index_top_msg!=0){
//		$.each(index_top_msg, function(i, n){
//			var reg = /[\r\n]/g;			
//			n.content = n.content.replace(reg,"");
//			$(".head-content").find("marquee").append("<a id='index_top_msg_"+n.id+"' href='"+n.href+"' title='"+n.content+"'>"+n.content+"</a>")
//			});		
//		}else{$(".head-content").empty();}
//
//	$("#fastLoginForm").find(".text").keydown(function(e){
//		var e = e || e.event;
//		if(e.keyCode == 13){
//			fastLogin();
//			}
//		});
//
//	if(isLogin){
//		$("#fastLoginForm").replaceWith(getHello() + user.nid + ", 欢迎登陆" + system.company + "。<a href='/user/'>[后台]</a> <a href='javascript:;' onclick='loginOut()'>[退出]</a> ");
//		}
//	
//	WEATHER.RunGLNL();
//	$.NAV.init();

});
</script>

</body>
</html>

