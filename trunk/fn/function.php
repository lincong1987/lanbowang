<?php
require("../inc/config.php");






function error(){
	
	$html = '<div class="error-notice-text">
            <div class="error-notice-text-wrap error1">
                <div class="error-notice-hd">很抱歉，您查看的宝贝不存在，可能已下架或者被转移。</div>
                <div class="error-notice-info"></div>
                <div class="error-notice-advice">
                    <div class="you-can">您可以：</div>
                    <ol>
                        <li>检查刚才的输入</li>>
                        <li>去其它地方逛逛: <a href="http://www.taobao.com" title="淘宝首页">淘宝首页</a> | <a href="http://i.taobao.com/my_taobao.htm" title="我的淘宝">我的淘宝</a> | <a href="http://list.taobao.com/browse/cat-0.htm" title="我要买">我要买</a> | <a href="http://forum.taobao.com/" title="淘宝社区">淘宝社区</a> | <a href="http://www.taojianghu.com/" title="淘江湖">淘江湖</a></li>
                    </ol>
                </div>
            </div>
        </div>';
	
	
	}









?>