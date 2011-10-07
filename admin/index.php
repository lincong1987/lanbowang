<?php
include("../function.php");
//检查是否登陆
$isLogin = user::isLogin();
if(!$isLogin){errro("你没有权限", "alertGoTo", WEB_HOST.'index.php');}

//检查是否登陆
$isAdmin = user::isAdmin();
if(!$isAdmin){error("你没有权限", "alertGoTo", WEB_HOST.'index.php');}

$isLogin = login::isLogin();

//
$user = user::getUserSession();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="../css/base.css"/>
<?php
//导入meta数据及js库
echo $systemHead["meta"].
	$systemHead["title"].
	JS_JQUERY.
	JS_DIALOG.
	LIB_LIGERUI;
?>
<script src="../js/common.js" language="javascript" type="text/javascript"></script>
<script src="../js/base.js" language="javascript" type="text/javascript"></script>
<script>
var tab = null;
var accordion = null;
var tree = null;

var isLogin = <?php echo json_encode($isLogin);?>;

var user = <?php echo json_encode($user);?>;

var system = <?php echo json_encode($system);?>;

function f_addTab(tabid, text, url){ 
	tab.addTabItem({tabid : tabid,text: text, url: url });
}

$(document).ready(function(){
	$("#layout1").ligerLayout({leftWidth: 200, topHeight:50});
	
	//Tab
	var height = $(".l-layout-center").height();
	$("#framecenter").ligerTab({ height: height });

	//面板
	$("#accordion1").ligerAccordion({ height: height - 24, speed: null });	
	
	//树
	$("#tree1").ligerTree({
		checkbox: false,
		nodeWidth: 120,
		attribute: ['nodename', 'url'],
		onSelect: function (node)
		{
			if (!node.data.url) return;
			var tabid = $(node.target).attr("tabid");
			if (!tabid)
			{
				tabid = new Date().getTime();
				$(node.target).attr("tabid", tabid)
			}
			if ($(">ul >li", tab.tab.links).length >= 4)
			{
				var currentTabid = $("li.l-selected", tab.tab.links).attr("tabid"); //当前选择的tabid
				if (currentTabid == "home") return;
				tab.overrideTabItem(currentTabid, { tabid: tabid, url: node.data.url, text: node.data.text });
				return;
			}
			f_addTab(tabid, node.data.text, node.data.url);
		}
	});
	
	tab = $("#framecenter").ligerGetTabManager();
	accordion = $("#accordion1").ligerGetAccordionManager();
	tree = $("#tree1").ligerGetTreeManager();
	$("#pageloading").hide();	
	
	});
</script>
<style>
body{ text-align:inherit; overflow:hidden}
#pageloading{position:absolute; left:0px; top:0px; background:white url(../src/img/loading.gif) no-repeat center; width:100%; height:100%; height:700px; z-index:99999;}
.l-link{ display:block; height:26px; line-height:26px; padding-left:10px; text-decoration:underline; color:#333;}

.headerNav  { background-color:#030b1d; }
.headerNav .logo { background:url(../src/flash/logo_1.png) no-repeat; float:left; height:50px; text-indent:-1000px; width:250px;}
.headerNav .nav{ height:21px; position:absolute; right:0; top:8px; z-index:31;	 display:block; }
.headerNav .nav li { float:left; margin-left:-1px; padding:0 8px; line-height:11px; background:url(../src/img/listLine.png) no-repeat; }
.headerNav .nav li a { color:#b9ccda;}
.headerNav .nav ul{ margin:0; padding:0}

</style>
</head>

<body>
	<div id="pageloading"></div>
    
    <div id="layout1">
        <div position="top" style="background:#030b1d; color:White; height:50px; line-height:50px; padding-left:10px">
            
            
        
   			<div class="headerNav"> 
				<a class="logo" href="#">标志</a> 
				<ul class="nav">
					<li><a href="changepwd.html" target="dialog" width="600">设置</a></li> 
					<li><a href="http://www.cnblogs.com/dwzjs" target="_blank">博客</a></li> 
					<li><a href="http://weibo.com/dwzui" target="_blank">微博</a></li> 
					<li><a href="http://bbs.dwzjs.com" target="_blank">论坛</a></li> 
					<li><a href="#" onclick="loginOut();">退出</a></li> 
				</ul>
			</div>              
            
            
            
                  
        </div>
        
        
<!-- <div position="left">-->
        <div position="left"  title="主要菜单" id="accordion1"> 
                     <div title="功能列表" class="l-scroll">
                         <ul id="tree1" style="margin-top:3px;">
                            <li isexpand="true">
                            	<span>新闻管理</span>
                                <ul>
                                	<li url="user_manage_add.php"><span>添加新闻</span></li>
                                    <li url="user_manage.php"><span>新闻管理</span></li>                            
                            	</ul>
							</li>                         
                            <li isexpand="false">
                            	<span>用户</span>
                                <ul>
                                	<li url="user_manage_add.php"><span>添加用户</span></li>
                                    <li url="user_manage.php"><span>用户管理</span></li>                            
                            	</ul>
							</li>                         
                         </ul>
                    </div>
                    <div title="系统信息">
                    <div style=" height:7px;"></div>
                         <a class="l-link" href="javascript:f_addTab('listpage','红领巾','http://weibo.com/lincong1987')">联系开发</a> 
                    </div>     	
        </div>
        
        <div position="center" id="framecenter"> 
            <div tabid="home" title="我的主页" style="height:300px" >
                <iframe frameborder="0" name="home" src="welcome.php"></iframe>
            </div> 
        </div> 
        <div position="bottom">
           
        </div>
        
        
        
          
    </div> 

</body>
</html>