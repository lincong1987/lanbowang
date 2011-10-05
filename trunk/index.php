<?php include("function.php");

//获取首页置顶消息
$index_msg = index::getIndexMsg();

//获取首页置顶消息
$index_msg = index::getIndexMsg();

//获取首页置顶消息
$index_slide_images = index::getIndexSlideImages(10);


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php
//导入meta数据及js库
echo $systemHead["meta"].
	$systemHead["title"].
	JS_JQUERY.
	JS_DIALOG;
?>
<script src="js/common.js" language="javascript" type="text/javascript"></script>
<script>
var index_msg = <?php echo json_encode($index_msg);?>;
var index_slide_images = <?php echo json_encode($index_slide_images);?>;

$(document).ready(function(){
	$("#index_slide_images").append('<div id="piclist"></div><div id="numlist"></div>');
	$.each(index_slide_images, function(i, n){
		$("#index_slide_images #piclist").append('<a href="'+(n.href==''?'#':n.href)+'"><img src="'+n.imagePath+'" width="950" height="260"/></a>');
		$("#index_slide_images #numlist").append('<a href="javascript:;"></a>');
		});
	
	
	
	art.dialog({id:"index_msg", title:"重要消息", content:index_msg[0].content, width:400, lock:true, ok:function(){}});
	});
	
</script>
<link rel="stylesheet" type="text/css" href="css/base.css"/> 
<style type="text/css">

</style>
</head>

<body>
<div id="login_nav">
	<ul>
        <li class="head-login">
        	用户名 <input class="text" maxlength="12" size="12" />
            密码 <input class="text"  maxlength="12" size="12" />
            <input class="btn" type="button" value="登陆" /></li>
        <li class="head-content">
        <marquee truespeed="truespeed" onmouseover="this.stop()" onmouseout="this.start()"><a href="#">系统公告显示</a></marquee></li>
    </ul>    
</div>


<div id="nav">
	<div id="logo">
    	<img src="src/flash/logo.png" width="208" height="80" />
        <div id="logo-r">
       	  <ul>
            	<li><span id="chinese_date">12</span> <span id="western_date">23</span> </li>
                <li><span id="western_date">23</span></li>
            </ul>
        </div>
  </div>
    <div class="clearFix"></div>
<div id="nav-tab">
		<ul style="width:20px"></ul>
    	<ul>
        	<li><a>首页</a></li>
            <li><a>关于我们</a></li>
            <li><a>企业文化</a></li>            
            <li><a>新闻中心</a></li>
            <li><a>楼盘中心</a></li>
            <li><a>人才中心</a></li>            
        </ul>
        <ul></ul>
    </div>
</div>

<div class="clearFix"></div>

<div id="index_slide_images"></div>

<div id="main">

</div>
	<table align="center" width="950" border="0" cellpadding="0" cellspacing="0">
    	<tr>
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
            </div></td>
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
</body>
</html>


<script>

$(document).ready(function(){
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
		},2000);  
	});  
	  
	var index=0;  
	var timer=setInterval(function(){  
		showIndex(index)  
		index++;  
		if(index==5){index=0;}  
	},2000);  
	  
	function showIndex(i){  
		$('#numlist a').eq(i).addClass('select').siblings('a').removeClass('select');  
		$('#piclist a').eq(i).fadeIn(500).siblings('a').fadeOut(200);  
	} 
});

$(document).ready(function (){
	WEATHER.RunGLNL();
});
</script>
