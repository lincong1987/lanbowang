<div class="header">
<div id="login_form">
    	<ul>
        	<li><a href="javascript:void(0);" onclick="show_fastLoginForm_div();">登陆</a></li>
            <li><span>|</span></li>
            <li><a>注册</a></li>
        </ul>
    </div>
</div>
<div id="fastLoginForm_div">
	
	<div><h3>用户登录</h3><hr size="1"></div>
    <script>
	$(function(){
			if(isLogin){
				$("#login_form").addClass("isLogin").find("ul").replaceWith("<ul><li>"+getHello() + user.nid + ", 欢迎登陆" + system.company + "。<a href='/admin/'>[后台]</a> <a href='javascript:;' onclick='loginOut()'>[退出]</a></li></ul>");
			}
		});
    </script>
	<form method="post" id="fastLoginForm" name="fastLoginForm" action="">
        <label>用户名 <input class="text" name="uid" id="uid" maxlength="12" size="12" /></label>
        <label>密码 <input class="text" type="password" name="pwd" id="pwd" maxlength="12" size="12" /></label>
        <input class="btn" type="button" value="登陆" onclick="fastLogin()" />
        <input class="btn" type="button" value="管理" onclick="adminLogin()" />
    </form>
</div>
<div class="clearFix"></div>
<div class="header_bar"></div>
<div class="clearFix"></div>

<div class="nav">
	<ul>
    	<li><a href="index.php">首页</a></li>
        <li><span>|</span></li>
        <li><a href="aboutus.php?paramKey=aboutus">走进蓝博旺</a></li>
        <li><span>|</span></li>
        <li><a href="newsList.php?type=1">动态资讯</a></li>
        <li><span>|</span></li>
        <li><a href="newsList.php?type=2">项目展示</a></li>
        <li><span>|</span></li>
        <li><a href="newsList.php?type=3">人力资源</a></li>
        <li><span>|</span></li>
        <li><a href="index.php">联系我们</a></li>
    </ul>
    <ul class="fast_search">
    	<form id="fast_search">
        	<input id="fast_search_text" name="fast_search_text" /> <input type="image" src="src/images/search_btn.gif"/>
        </form>
    </ul>
</div>