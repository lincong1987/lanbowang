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

$newsList = $news->get(3);
$newsList2 = $news->get(4);
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
<?php
	include("html/header.php");
?>
<div class="clearFix"></div>

<div class="main">
<table width="100%" border="0" height="272">
  <tr>
    <td valign="top" width="224">
   	  <div class="main_left_slider" style="width:224px; height:182px">
        	<ul>
            	<li><a><img src="src/images/1_34.png" width="56" height="182" /></a></li>
                <li><a><img src="src/images/1_36.png" width="56" height="182" /></a></li>
                <li><a><img src="src/images/1_38.png" width="56" height="182" /></a></li>
                <li><a><img src="src/images/1_40.gif" width="56" height="182" /></a></li>
            </ul>
        </div>
        <div style="width:224px; height:88px">
        	<a><img src="src/images/1_46.png" width="224" height="88" /></a>
        </div>
    </td>
    <td valign="top">
    	<div>
        	<ul>
            	<li><a><img src="src/images/1_42.png" width="478" height="182" /></a></li>
            </ul>
        </div>

         <table width="337" style="margin:8px 5px">
            <tr>
                <td width="146" height="75">
                	<img src="src/images/1_47.png" width="146" height="75" />
                </td>
                <td>                
                    <div class="index_news_panel" style=" width:330px; margin-left:3px">
                        <ul>
                        	<?php 
							foreach($newsList as $k => $v){
								echo  "<li><a href='news.php?id={$v['id']}'><span class='index_news_panel_title'>{$v['news_title']}</span><span class='index_news_panel_time'>{$v['news_post_time']}</span></a></li>";
								}
							?>                            
                        </ul>
                    </div>
                </td>
            </tr>
        </table>

    </td>
    <td valign="top" width="223" height="272"><a href="#"><img src="src/images/1_43.png" width="223" height="272" border="0" /></a></td>
  </tr>
</table>

</div>

<div class="proj">
<table>
    <tr>
      <td>
        	<div style="width:475px; overflow:hidden">
            	<a><img src="src/images/1_54.png" /></a>
                <a><img src="src/images/1_55.png" /></a>
                <a><img src="src/images/1_56.png" /></a>
                <a><img src="src/images/1_58.png" /></a>
            </div>
			<div class="index_news_panel index_news_panel2" style=" width:470px; margin-left:3px">
                <ul>
                    <?php 
                    foreach($newsList2 as $k => $v){
                        echo  "<li><a href='news.php?id={$v['id']}'><span class='index_news_panel_title'>{$v['news_title']}</span><span class='index_news_panel_time'>{$v['news_post_time']}</span></a></li>";
                        }
                    ?>                            
                </ul>
            </div>
            <div style="margin-top:10px; text-align:left">
            	<a><img src="src/images/1_68.png" width="218" height="61" style="margin-right:30px" /></a>
                <a><img src="src/images/1_70.png" width="220" height="61" /></a>
          </div>
      </td>
    	<td align="right"  width="470" height="26">
        	<div style=" text-align:right; width:454px; height:26px;">
            	<img src="src/images/1_61.png" width="454" height="26" />           
      		</div>
            <div>            
            	<img src="src/images/1_64.png" /><img src="src/images/1_65.png" />      
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

