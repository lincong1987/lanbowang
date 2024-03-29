/**
 * 农历显示
 * @call WEATHER.RunGLNL()
 */
var WEATHER={RunGLNL:function(){var c=new Date();var a=c.getDate(),b=c.getMonth()+1,j=c.getFullYear();var h=["周日","周一","周二","周三","周四","周五","周六"];var e=h[c.getDay()];var g=j+"年"+b+"月"+a+"日 "+e;var f="今天是："+this.CnDateofDateStr(c);$("#chinese_date").html(f);$("#western_date").html(g)},DaysNumberofDate:function(a){return parseInt((Date.parse(a)-Date.parse(a.getFullYear()+"/1/1"))/86400000,10)+1},CnDateofDate:function(q){var h=[22,42,218,0,131,73,182,5,14,100,187,0,25,178,91,0,135,106,87,4,18,117,43,0,29,182,149,0,138,173,85,2,21,85,170,0,130,85,108,7,13,201,118,0,23,100,183,0,134,228,174,5,17,234,86,0,27,109,42,0,136,90,170,4,20,173,85,0,129,170,213,9,11,82,234,0,22,169,109,0,132,169,93,6,15,212,174,0,26,234,77,0,135,186,85,4];var g=[];var j=[];var k;var a;var l=[];var n;var b;var f;var m;var d;var p;var e=q.getFullYear();var c=q.getMonth()+1;var o=q.getDate();if(e<100){e+=1900}if((e<1997)||(e>2020)){return 0}l[0]=h[(e-1997)*4];l[1]=h[(e-1997)*4+1];l[2]=h[(e-1997)*4+2];l[3]=h[(e-1997)*4+3];if((l[0]&128)!==0){g[0]=12}else{g[0]=11}k=(l[0]&127);b=l[1];b=b<<8;b=b|l[2];a=l[3];for(n=15;n>=0;n--){j[15-n]=29;if(((1<<n)&b)!==0){j[15-n]++}if(g[15-n]===a){g[15-n+1]=-a}else{if(g[15-n]<0){g[15-n+1]=-g[15-n]+1}else{g[15-n+1]=g[15-n]+1}if(g[15-n+1]>12){g[15-n+1]=1}}}f=this.DaysNumberofDate(q)-1;if(f<=(j[0]-k)){if((e>1901)&&(this.CnDateofDate(new Date((e-1)+"/12/31"))<0)){d=-g[0]}else{d=g[0]}p=k+f}else{m=j[0]-k;n=1;while((m<f)&&(m+j[n]<f)){m+=j[n];n++}d=g[n];p=f-m}if(d>0){return d*100+p}else{return d*100-p}},CnYearofDate:function(a){var b=a.getFullYear();var d=a.getMonth()+1;var c=parseInt(Math.abs(this.CnDateofDate(a))/100,10);if(b<100){b+=1900}if(c>d){b--}b-=1864;return this.CnEra(b)+"年"},CnMonthofDate:function(b){var c=["零","正","二","三","四","五","六","七","八","九","十","冬","腊"];var a;a=parseInt(this.CnDateofDate(b)/100,10);if(a<0){return"闰"+c[-a]+" 月"}else{return c[a]+"月"}},CnDayofDate:function(b){var a=["零","初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十"];var c;c=(Math.abs(this.CnDateofDate(b)))%100;return a[c]},CnEra:function(c){var a=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];var b=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];return a[c%10]+b[c%12]},CnDateofDateStr:function(a){if(this.CnMonthofDate(a)==="零月"){return"　请调整您的计算机日期!"}else{return"农历"+this.CnYearofDate(a)+" "+this.CnMonthofDate(a)+this.CnDayofDate(a)}}};

/*导航*/
var LBW = {};
$.NAV = {
		init : function(){
			$('#nav-tab ul li a').each(function(){
				$(this).before($(this).clone().removeClass().addClass('hoverMenu'));
				if($.type($(this).attr("sub")) != "undefined"){$(this).addClass("hasSub");}
			});
			
			$('#nav-tab ul li').hover(function(){
				$(".sub").slideUp(50);
				$(this).find('.hoverMenu').stop().animate({marginTop:'0px'},200,function(){
					var _main = $(this);
					if($.type($(this).attr("sub")) != "undefined"){
						var _sub = $(this).attr("sub");						
						$("#"+_sub+"[class=sub]").css({left:_main.offset().left+"px"}).slideDown(300);
						}
					});
			},
			function(){
							
				$(this).find('.hoverMenu').stop().animate({marginTop:'-34px'},200,function(){
					var _main = $(this);
					if($.type($(this).attr("sub")) != "undefined"){
						var _sub = $(this).attr("sub");
						$("#"+_sub+"[class=sub]").mouseleave(function(){
							$(this).slideUp(300);
							})
						}
					});
			});				
			}
	}

$.SET = {
	title : function(){
		if(arguments.length<1){
			return document.title;
			}else{
				var Args = Array.prototype.slice.call(arguments, 0);
				document.title = Args[0] + " - " + document.title;
				}		
		},
	/*设置状态栏*/
	stauts : function(){
		var s = window.status ? window.status : window.defaultStatus;
		if(arguments.length<1){
			return s;
			}else{
				var Args = Array.prototype.slice.call(arguments, 0);
				window.status = window.defaultStatus = Args[0];
				}	
		}
	}

$.PAGER = {
	cfg : {
		page : 1,
		pageCount : 20,
		totalCount : 1,
		url : "?page=",
		obj : null
		},
	init : function(cfg){
		var that = this;
		that.cfg = cfg;
		//alert(cfg.obj.size())
		if(that.cfg.obj.size() < 1){alert("pagerElement is not found!"); return false;}
		var PageClick = function(pageclickednumber) {
			//var that = this;
			location.href = that.cfg.url + pageclickednumber;
			}		
		that.cfg.obj.pager({ 
			pagenumber : cfg.page || that.cfg.page,
			pagecount: cfg.pageCount || that.cfg.pageCount,
			totalCount: cfg.totalCount || that.cfg.totalCount,
			buttonClickCallback : PageClick
			});
		}
	}





/**
 * 输出欢迎语
 * @author lincong
 * @date 2011/10/7
 */
//输出欢迎信息
function getHello(){var now=new Date(),hour=now.getHours();if(hour<6){return"凌晨好!"}else if(hour<9){return"早上好!"}else if(hour<12){return"上午好!"}else if(hour<14){return"中午好!"}else if(hour<17){return"下午好!"}else if(hour<19){return"傍晚好!"}else if(hour<22){return"晚上好!"}else{return"夜深了!"}}

/**
 *
 *
 */
function show_fastLoginForm_div(o){
	$.dialog({
		id: "__fastLoginForm_div",
		title: "用户登录",
		content: document.getElementById("fastLoginForm_div"),
		lock: true,
		background: '#000', // 背景色
		opacity: 0.87
		});
	
	}


/**
 * 快速登录
 * @author lincong
 * @date 2011/10/6
 */
function fastLogin(){

	var form = $("#fastLoginForm");
	var uid = form.find('#uid');
	var pwd = form.find('#pwd');
 
	if(uid.val().length > 12 || uid.val().length < 3 || $.trim(uid.val())==""){
		art.dialog({icon:"warning", content:"用户名长度错误", time:5, id:"FN_fastLogin_01", ok:function(){uid.focus();}});
		return false;
		}
	if(pwd.val().length > 12 || pwd.val().length < 3 || $.trim(pwd.val())==""){
		art.dialog({icon:"warning", content:"密码长度错误", time:5, id:"FN_fastLogin_01", ok:function(){pwd.focus();}});
		return false;
		}
	form.attr("action", "action.php?action=login").submit();
 
	
	}	

function loginOut(){
	art.dialog.confirm('你确定要退出吗？', function () {
			location.href = system.WEB_HOST+"action.php?action=loginOut";
			//alert("http://" + host + "/action.php?action=loginOut")
		});
	}

/**
 * 管理登录
 * @author lincong
 * @date 2011/10/6
 */
function adminLogin(){
	location.href = "admin/login.php";
	}
	
	
	
/**
 * 管理登录
 * @author lincong
 * @date 2011/10/6
 */
function userPasswordModi(){
	var FN_userPasswordModi = art.dialog({
		title : "密码修改",
		lock : true,
		drag : false,
		init : function(){
			var that = this;
			var form =   '<style>#form_userPasswordModi .l-table-edit-td{ padding:4px;}</style>'
							+'<form name="form_userPasswordModi" method="post" id="form_userPasswordModi">'
								+'<table cellpadding="0" cellspacing="0" class="l-table-edit">'
									+'<tr><td align="right" class="l-table-edit-td">旧密码:</td><td align="left" class="l-table-edit-td">'
											+'<input name="oldPwd" type="password" id="oldPwd" ltype="password" validate="{required:true,minlength:3,maxlength:12}"/>'
									+'</td><td align="left"></td></tr>'
									+'<tr><td align="right" class="l-table-edit-td">新密码:</td><td align="left" class="l-table-edit-td">'
											+'<input name="newPwd" type="password" id="newPwd" ltype="password" validate="{required:true,minlength:3,maxlength:12}"/>'
									+'</td><td align="left"></td></tr>'
									+'<tr><td align="right" class="l-table-edit-td">再次输入新密码:</td><td align="left" class="l-table-edit-td">'
											+'<input name="newPwd_1" type="password" id="newPwd_1" ltype="password" validate="{required:true,minlength:3,maxlength:12,equalTo:\'#newPwd\'}"/></td><td align="left"></td></tr></table>'
						+'</form>'
			this.content(form);
			
			$.metadata.setType("attr", "validate");

			var v = $("#form_userPasswordModi").validate({
				debug: true,
				errorPlacement: function(lable, element) {
					if (element.hasClass("l-textarea")){
						element.ligerTip({content: lable.html(),appendIdTo: lable});
						}else if (element.hasClass("l-text-field")){
							element.parent().ligerTip({content: lable.html(),appendIdTo: lable});
							}else{
								lable.appendTo(element.parents("td:first").next("td"))
								}
				},
				success: function(lable) {
					lable.ligerHideTip();
				},
				submitHandler: function() {
					$("#form_userPasswordModi .l-text,.l-textarea").ligerHideTip(); 
					art.dialog.tips('数据正在提交..', 8);				
					$.ajax({
						type:'POST',
						url: system.WEB_HOST + "user/action.php?action=userPasswordModi",
						data:$("#form_userPasswordModi").serialize(),
						success:function(json){
							if(json.state == "error"){
								art.dialog({id: 'Tips'}).close();
								var E_MSG = "";
								if($.type(json.msg)=='object'){
									$.each(json.msg, function(i, n){
										E_MSG += "["+i+"]"+n+"<br>"
										});
									}
								$("#form_userPasswordModi").ligerTip({ content: E_MSG!=""?E_MSG:json.msg});
								}
							if(json.state == "success"){
								$("form .l-text,.l-textarea").ligerHideTip();
								art.dialog.tips('修改成功', 2);
								that.close();
								}
							}
						});
				}
			});

			$("#form_userPasswordModi").ligerForm();
			},
		ok : function(){
			//alert($("#form_userPasswordModi").serialize());
			//this.content()
			$("#form_userPasswordModi").submit();
			return false;
			},
		okVal : "修改",	
		cancel : function(){
			$("form .l-text,.l-textarea").ligerHideTip();
			}	
		});
	
	
	
	}
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		