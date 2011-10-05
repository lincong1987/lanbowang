// JavaScript Document
var WEATHER = {
    RunGLNL: function() {
        var c = new Date();
        var a = c.getDate(),
        b = c.getMonth() + 1,
        j = c.getFullYear();
        var h = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var e = h[c.getDay()];
        var g = j + "年" + b + "月" + a + "日 " + e;
        var f = "今天是：" + this.CnDateofDateStr(c);
        $("#chinese_date").innerHTML = f;
        $("#western_date").innerHTML = g
    },
    DaysNumberofDate: function(a) {
        return parseInt((Date.parse(a) - Date.parse(a.getFullYear() + "/1/1")) / 86400000, 10) + 1
    },
    CnDateofDate: function(q) {
        var h = [22, 42, 218, 0, 131, 73, 182, 5, 14, 100, 187, 0, 25, 178, 91, 0, 135, 106, 87, 4, 18, 117, 43, 0, 29, 182, 149, 0, 138, 173, 85, 2, 21, 85, 170, 0, 130, 85, 108, 7, 13, 201, 118, 0, 23, 100, 183, 0, 134, 228, 174, 5, 17, 234, 86, 0, 27, 109, 42, 0, 136, 90, 170, 4, 20, 173, 85, 0, 129, 170, 213, 9, 11, 82, 234, 0, 22, 169, 109, 0, 132, 169, 93, 6, 15, 212, 174, 0, 26, 234, 77, 0, 135, 186, 85, 4];
        var g = [];
        var j = [];
        var k;
        var a;
        var l = [];
        var n;
        var b;
        var f;
        var m;
        var d;
        var p;
        var e = q.getFullYear();
        var c = q.getMonth() + 1;
        var o = q.getDate();
        if (e < 100) {
            e += 1900
        }
        if ((e < 1997) || (e > 2020)) {
            return 0
        }
        l[0] = h[(e - 1997) * 4];
        l[1] = h[(e - 1997) * 4 + 1];
        l[2] = h[(e - 1997) * 4 + 2];
        l[3] = h[(e - 1997) * 4 + 3];
        if ((l[0] & 128) !== 0) {
            g[0] = 12
        } else {
            g[0] = 11
        }
        k = (l[0] & 127);
        b = l[1];
        b = b << 8;
        b = b | l[2];
        a = l[3];
        for (n = 15; n >= 0; n--) {
            j[15 - n] = 29;
            if (((1 << n) & b) !== 0) {
                j[15 - n]++
            }
            if (g[15 - n] === a) {
                g[15 - n + 1] = -a
            } else {
                if (g[15 - n] < 0) {
                    g[15 - n + 1] = -g[15 - n] + 1
                } else {
                    g[15 - n + 1] = g[15 - n] + 1
                }
                if (g[15 - n + 1] > 12) {
                    g[15 - n + 1] = 1
                }
            }
        }
        f = this.DaysNumberofDate(q) - 1;
        if (f <= (j[0] - k)) {
            if ((e > 1901) && (this.CnDateofDate(new Date((e - 1) + "/12/31")) < 0)) {
                d = -g[0]
            } else {
                d = g[0]
            }
            p = k + f
        } else {
            m = j[0] - k;
            n = 1;
            while ((m < f) && (m + j[n] < f)) {
                m += j[n];
                n++
            }
            d = g[n];
            p = f - m
        }
        if (d > 0) {
            return d * 100 + p
        } else {
            return d * 100 - p
        }
    },
    CnYearofDate: function(a) {
        var b = a.getFullYear();
        var d = a.getMonth() + 1;
        var c = parseInt(Math.abs(this.CnDateofDate(a)) / 100, 10);
        if (b < 100) {
            b += 1900
        }
        if (c > d) {
            b--
        }
        b -= 1864;
        return this.CnEra(b) + "年"
    },
    CnMonthofDate: function(b) {
        var c = ["零", "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
        var a;
        a = parseInt(this.CnDateofDate(b) / 100, 10);
        if (a < 0) {
            return "闰" + c[ - a] + " 月"
        } else {
            return c[a] + "月"
        }
    },
    CnDayofDate: function(b) {
        var a = ["零", "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
        var c;
        c = (Math.abs(this.CnDateofDate(b))) % 100;
        return a[c]
    },
    CnEra: function(c) {
        var a = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
        var b = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
        return a[c % 10] + b[c % 12]
    },
    CnDateofDateStr: function(a) {
        if (this.CnMonthofDate(a) === "零月") {
            return "　请调整您的计算机日期!"
        } else {
            return "农历" + this.CnYearofDate(a) + " " + this.CnMonthofDate(a) + this.CnDayofDate(a)
        }
    }
};

$(document).ready(function() {
    WEATHER.RunGLNL();
    if (typeof render_header == "function") {
        render_header()
    }
    new tab_auto_change().initialize(document.getElementById("home_news"), "auto_", 8);
    var a = new Date();
    var f = a.getMonth() + 1;
    var e = a.getDate();
    if (f < 10) {
        f = "0" + f
    }
    if (e < 10) {
        e = "0" + e
    }
    f_d = a.getFullYear() + "-" + f + "-" + e;
    dates = document.getElementById("links").getElementsByTagName("INPUT");
    for (var c = 0; c < dates.length; c++) {
        if (dates[c].className == "date") {
            dates[c].value = f_d
        }
    }
    Rank.init("rank_music_select");
    Rank.init("rank_movie_select");
    Rank.init("rank_books_select");
    var b = CSS.find("tab-title");
    for (var c in b) {
        if (b[c].nodeType == 1) {
            TAB.hook(b[c])
        }
    } (function() {
        MONAV.Search.init({
            tab_box: "search_tab_box",
            logo: "search_engine_logo",
            href: "search_engine_href",
            submit_btn: "search_engine_button",
            search_input: "search_input",
            iframetabs: {
                taobao_shopping: "taobao_frame",
                baidu_web: "baidu_frame"
            },
            form: document.form1
        });
        MONAV.Tab.init_tabs({
            tab_box: "bussiness_query_box"
        });
        SUGGEST.init();
        MONAV.Tracer.init()
    })();
    $(function() {
        var k = $(".scrollNews");
        var j;
        k.hover(function() {
            clearInterval(j)
        },
        function() {
            j = setInterval(function() {
                d(k)
            },
            6000)
        }).trigger("mouseleave")
    });
    $(function() {
        var k = $(".horScroll");
        var j;
        k.hover(function() {
            clearInterval(j)
        },
        function() {
            j = setInterval(function() {
                h(k)
            },
            10000)
        }).trigger("mouseleave")
    });
    function d(k) {
        var l = k.find("ul:first");
        var j = l.find("li:first").height();
        l.animate({
            marginTop: -j + "px"
        },
        600, 
        function() {
            l.css({
                marginTop: 0
            }).find("li:first").appendTo(l)
        })
    }
    function h(k) {
        var l = k.find("ul:first");
        var j = l.find("li:first").width();
        l.animate({
            marginLeft: -j + "px"
        },
        500, 
        function() {
            l.css({
                marginLeft: 0
            }).find("li:first").appendTo(l)
        })
    }
    TAB.random_show_one("ff_garden_store", 0.5);
    TAB.random_show_one("shopping_taobao_panel", 0.7);
    TAB.random_show_one("ranking_music", 0.33);
    TAB.random_show_one("ranking_movie", 0.66);
    document.getElementById("search_input").setAttribute("autocomplete", "off");
    var g = el("banner_show1").getElementsByTagName("iframe")[0].src;
    el("banner_show1").getElementsByTagName("iframe")[0].src = g;
    $(function() {
        $(".paging").show();
        $(".paging a:first").addClass("active");
        rotate = function() {
            var k = $active.attr("rel") - 1;
            var j = $(".selected_box");
            $(".paging a").removeClass("active");
            $active.addClass("active");
            j.children().css("display", "none");
            $(j.children()[k]).css("display", "block")
        };
        rotateSwitch = function() {
            play = setInterval(function() {
                $active = $(".paging a.active").next();
                if ($active.length === 0) {
                    $active = $(".paging a:first")
                }
                rotate()
            },
            6000)
        };
        rotateSwitch();
        $(".paging a").hover(function() {
            $active = $(this);
            clearInterval(play);
            rotate()
        },
        function() {
            rotateSwitch()
        })
    })
});
var __ie__ = el("__ie__");
if (!__ie__) {
    window.__event__ = function(a) {
        return a
    }
}
function observe_event(b, a, c) {
    if (b.addEventListener) {
        b.addEventListener(a, c, false)
    } else {
        b.attachEvent("on" + a, c)
    }
}
function stop_event(a) {
    a = window.event ? window.event: a;
    if (a) {
        if (__ie__) {
            a.cancelBubble = true;
            a.returnValue = false
        } else {
            a.stopPropagation();
            a.preventDefault();
            a.target.blur()
        }
    }
}
var UTIL = {
    map: function(e, c) {
        var b = [];
        var a = c.length;
        var d;
        for (d = 0; d < a; d++) {
            b.push(e(c[d]))
        }
        return b
    },
    get_height: function() {
        return document.body.scrollHeight
    },
    getRel: function(b) {
        if ( !! b.getAttribute("rel")) {
            return b.getAttribute("rel")
        }
        var a = /rel-([^ ]+)/i.exec(b.className);
        if ( !! a && a.length === 2) {
            return a[1]
        }
    },
    set_hversion: function() {
        PREF.set("homepage_version", "old");
        location.href = "http://i.g-fox.cn/index_former.html"
    }
};
var CSS = {
    is: function(c, a) {
        var b = new RegExp("(^|\\s)" + a + "(\\s|$)");
        if (b.test(c.className)) {
            return true
        } else {
            return false
        }
    },
    add: function(c, b) {
        if (this.is(c, b)) {
            return
        }
        var a = c.className.split(" ");
        a.push(b);
        c.className = a.join(" ")
    },
    del: function(d, b) {
        var a = d.className.split(" ");
        var c;
        for (c in a) {
            if (a[c] === b) {
                a.splice(c, 1);
                d.className = a.join(" ");
                return
            }
        }
    },
    find: function(a, b) {
        if (!b) {
            b = document
        }
        if (b.getElementsByClassName) {
            return b.getElementsByClassName(a)
        } else {
            if (b.querySelectorAll) {
                return b.querySelectorAll("." + a)
            } else {
                if (document.getElementsByClassName) {
                    return document.getElementsByClassName.call(b, a)
                }
            }
        }
    }
};
function setTab(b, c, e) {
    for (i = 1; i <= e; i++) {
        var d = document.getElementById(b + i);
        var a = document.getElementById("con_" + b + "_" + i);
        if (i == c) {
            CSS.add(d, "hover");
            a.style.display = "block"
        } else {
            CSS.del(d, "hover");
            a.style.display = "none"
        }
    }
}

var SUGGEST = {
    list: null,
    box: null,
    inbox: null,
    save: null,
    sign: null,
    init: function() {
        on = true;
        list = document.getElementById("suggestlist");
        box = document.getElementById("suggestbox");
        inbox = document.getElementById("search_input");
        save = document.getElementById("search_input").value;
        inbox.onfocus = function() {
            if (this.check !== null) {
                clearInterval(this.check)
            }
            this.check = setInterval(SUGGEST.get_suggest, 300)
        };
        inbox.onblur = function() {
            clearInterval(SUGGEST.check)
        };
        inbox.onclick = function() {
            box.style.display = "none"
        };
        document.body.onclick = function(a) {
            el("suggestbox").style.display = "none"
        };
        inbox.onkeydown = function(a) {
            if (box.style.display === "none") {
                return
            }
            var c = window.event ? window.event: a;
            var b = c.keyCode;
            if (b === 38) {
                SUGGEST.movekey("up")
            } else {
                if (b === 40) {
                    SUGGEST.movekey("down")
                }
            }
        };
        window.baidu = {};
        window.baidu.sug = function(c) {
            list.innerHTML = "";
            save = c.q;
            var f,
            d;
            if (c.s.length === 0) {
                box.style.display = "none"
            } else {
                var e = [];
                for (f = 0; f < c.s.length; f++) {
                    var b = "<li><p>" + c.s[f] + "</p></li>";
                    e.push(b)
                }
                list.innerHTML = e.join("");
                box.style.display = "block";
                for (f = 0; f < list.childNodes.length; f++) {
                    var a = list.childNodes[f];
                    a.onclick = function(g) {
                        inbox.value = this.childNodes[0].innerHTML;
                        save = inbox.value;
                        el("search_engine_button").click()
                    };
                    a.onmouseover = function(g) {
                        SUGGEST.set_curr(this)
                    }
                }
                box.onmouseout = function() {
                    for (d = 0; d < list.childNodes.length; d++) {
                        CSS.del(list.childNodes[d], "currkey")
                    }
                }
            }
        }
    },
    isvalid: function(b) {
        if (b === "") {
            box.style.display = "none";
            return false
        } else {
            if (b === save) {
                return false
            }
        }
        return true
    },
    get_suggest: function() {
        var b = inbox.value;
        if (SUGGEST.isvalid(b)) {
            if ((sign === "map") || (sign === "shopping")) {
                return
            } else {
                var a = document.createElement("script");
                document.body.appendChild(a);
                a.charset = "gb2312";
                switch (sign) {
                case "web":
                    a.src = "http://suggestion.baidu.com/su?wd=" + encodeURIComponent(b);
                    break;
                case "music":
                    a.src = "http://nssug.baidu.com/su?wd=" + encodeURIComponent(b) + "&prod=mp3";
                    break;
                case "image":
                    a.src = "http://nssug.baidu.com/su?wd=" + encodeURIComponent(b) + "&prod=image";
                    break;
                case "news":
                    a.src = "http://nssug.baidu.com/su?wd=" + encodeURIComponent(b) + "&prod=news";
                    break;
                case "video":
                    a.src = "http://nssug.baidu.com/su?wd=" + encodeURIComponent(b) + "&prod=video";
                    break;
                case "zhidao":
                    a.src = "http://nssug.baidu.com/su?wd=" + encodeURIComponent(b) + "&prod=zhidao";
                    break
                }
            }
        }
    },
    movekey: function(c) {
        var b = "";
        var a = "";
        b = SUGGEST.get_curr();
        if (b) {
            if (c === "up") {
                a = b.previousSibling
            } else {
                if (c === "down") {
                    a = b.nextSibling
                }
            }
            if (a === null) {
                SUGGEST.del_curr()
            }
        } else {
            if (c === "up") {
                a = list.lastChild
            } else {
                if (c === "down") {
                    a = list.firstChild
                }
            }
        }
        if (a !== null) {
            SUGGEST.set_curr(a);
            save = inbox.value = a.childNodes[0].innerHTML
        }
    },
    get_curr: function() {
        var a = CSS.find("currkey", this.list)[0];
        return a
    },
    set_curr: function(a) {
        this.del_curr();
        CSS.add(a, "currkey")
    },
    del_curr: function() {
        var a;
        for (a = 0; a < list.childNodes.length; a++) {
            CSS.del(list.childNodes[a], "currkey")
        }
    },
    turn: function(b) {
        sign = b
    }
};
var MAIL = {
    popmail: function() {
        var c = el("mailbox");
        var a = /^p(\d+)/;
        if (a.test(c.value)) {
            var b = c.value.replace(a, "$1");
            MONAV.Tracer.trace_link_item("", c.children[c.selectedIndex].innerHTML, "popmail");
            switch (b) {
            case "1":
                window.open("http://mail.google.com/");
                break;
            case "2":
                window.open("http://mail.live.com/");
                break;
            case "3":
                window.open("http://email.163.com/");
                break;
            case "4":
                window.open("http://email.126.com/");
                break;
            case "5":
                window.open("http://mail.yeah.net/");
                break;
            case "6":
                window.open("http://mail.qq.com/");
                break;
            case "7":
                window.open("http://mail.263.net/");
                break;
            case "8":
                window.open("http://www.kaixin001.com/");
                break;
            default:
                break
            }
            c.selectedIndex = 0
        }
    },
    checkmail: function() {
        var a = el("mailbox");
        var j = el("mail_form");
        var g = el("username").value;
        var h = el("password").value;
        var b = [];
        var f = [];
        MAIL.remove_inputs("mail_form");
        var c = /^m(\d+)/;
        if (c.test(a.value)) {
            var e = a.value.replace(c, "$1");
            MONAV.Tracer.trace_link_item("", a.children[a.selectedIndex].innerHTML, "checkmail");
            switch (e) {
            case "1":
                j.action = "http://mail.sina.com.cn/cgi-bin/cnlogin.php";
                b = ["u", "psw"];
                f = [g, h];
                MAIL.insert_inputs(b, f);
                break;
            case "2":
                j.action = "http://mail.sina.com.cn/cgi-bin/login.cgi";
                b = ["u", "psw"];
                f = [g, h];
                MAIL.insert_inputs(b, f);
                break;
            case "3":
                j.action = "http://passport.sohu.com/login.jsp";
                var d = g + "@sohu.com";
                b = ["loginid", "passwd", "fl", "vr", "appid", "ct", "sg", "ru"];
                f = [d, h, "1", "1|1", "1000", "1173080990", "5082635c77272088ae7241ccdf7cf062", "http://login.mail.sohu.com/servlet/LoginServlet"];
                MAIL.insert_inputs(b, f);
                break;
            case "4":
                d = g + "@yahoo.cn";
                j.action = "https://edit.bjs.yahoo.com/config/login";
                b = ["login", "passwd", ".intl", "domainss", ".done"];
                f = [d, h, "cn", "yahoo", "http://mail.cn.yahoo.com/inset.html"];
                MAIL.insert_inputs(b, f);
                break;
            case "5":
                d = g + "@yahoo.com.cn";
                j.action = "https://edit.bjs.yahoo.com/config/login";
                b = ["login", "passwd", ".intl", "domainss", "src", ".done"];
                f = [d, h, "cn", "yahoo", "ym", "http://mail.cn.yahoo.com/inset.html"];
                MAIL.insert_inputs(b, f);
                break;
            case "6":
                j.action = "http://login.mail.tom.com/cgi/login";
                b = ["user", "pass"];
                f = [g, h];
                MAIL.insert_inputs(b, f);
                break;
            case "7":
                j.action = "http://passport.21cn.com/maillogin.jsp";
                b = ["UserName", "passwd"];
                f = [g, h];
                MAIL.insert_inputs(b, f);
                break;
            case "8":
                j.action = "https://mail.10086.cn/Login/Login.ashx";
                b = ["UserName", "Password", "clientid"];
                f = [g, h, "5024"];
                MAIL.insert_inputs(b, f);
                break;
            case "9":
                j.action = "https://passport.baidu.com/?login";
                b = ["username", "password"];
                f = [g, h];
                MAIL.insert_inputs(b, f);
                break;
            case "10":
                j.action = "http://passport.renren.com/PLogin.do";
                b = ["email", "password"];
                f = [g, h];
                MAIL.insert_inputs(b, f);
                break;
            case "11":
                j.action = "http://passport.51.com/login.5p";
                b = ["passport_51_user", "passport_51_password", "gourl"];
                f = [g, h, "http%3A%2F%2Fmy.51.com%2Fwebim%2Findex.php"];
                MAIL.insert_inputs(b, f);
                break;
            case "12":
                j.action = "http://passport.sohu.com/login.jsp";
                b = ["loginid", "passwd", "fl", "vr", "appid", "ct", "sg", "ru"];
                f = [g, h, "1", "1|1", "1005", "1282560903", "5365e2f819144cbb0d83b07a2976a01d", "http://profile.chinaren.com/urs/setcookie.jsp?burl=http://alumni.chinaren.com/"];
                MAIL.insert_inputs(b, f);
                break;
            default:
                break
            }
            j.submit()
        }
    },
    remove_inputs: function(c) {
        var a = el(c);
        var e = [];
        var d = a.getElementsByTagName("input");
        if (d.length > 0) {
            var b;
            for (b = 0; b < d.length; b++) {
                if (d[b].type === "hidden") {
                    e.push(d[b])
                }
            }
            for (b = 0; b < e.length; b++) {
                a.removeChild(e[b])
            }
        }
    },
    insert_inputs: function(a, c) {
        var b;
        for (b = 0; b < a.length; b++) {
            MAIL.insert_child("mail_form", a[b], c[b])
        }
    },
    insert_child: function(c, b, d) {
        c = el(c);
        var a = document.createElement("input");
        a.name = b;
        a.value = d;
        a.type = "hidden";
        c.appendChild(a)
    }
};
var PREF = {
    backend: null,
    init: function() {
        if (window.localStorage) {
            this.backend = localStorage;
            this.backend.__type__ = "ls"
        } else {
            if (window.globalStorage) {
                this.backend = globalStorage[document.domain];
                this.backend.__type__ = "gs"
            } else {
                if (document.cookie) {
                    this.backend = {
                        getItem: function(b) {
                            var a = document.cookie.split(";");
                            var d = new RegExp("^ ?" + b + "=");
                            var c;
                            for (c in a) {
                                if (d.test(a[c])) {
                                    var e = a[c];
                                    return unescape(e.substr(e.indexOf("=") + 1))
                                }
                            }
                        },
                        setItem: function(b, a) {
                            document.cookie = b + "=" + escape(a) + "; domain=" + document.domain + "; expires=" + ((new Date("December 31, 2100")).toGMTString())
                        },
                        __type__: "cookie"
                    }
                } else {
                    this.backend = {
                        getItem: function() {
                            return null
                        },
                        setItem: function() {},
                        __type__: "dummy"
                    }
                }
            }
        }
    },
    get: function(b, e) {
        var a = null;
        try {
            a = this.backend.getItem(b);
            if (a !== null) {
                a = JSON.parse(a + "") || e
            } else {
                a = e
            }
        } catch(c) {
            a = e
        }
        return a
    },
    set: function(b, a) {
        try {
            this.backend.setItem(b, JSON.stringify(a))
        } catch(c) {}
    }
};
PREF.init();
var TAB = {
    cbs: [],
    hook: function(a) {
        var b = this;
        a.onmouseover = function(c) {
            a.__cehp_tab_moving = true;
            if (!__ie__) {
                window.setTimeout(function() {
                    b.change(c)
                },
                100)
            } else {
                window.setTimeout(function() {
                    b.change(a)
                },
                100)
            }
            b.on_tab_switch(a)
        };
        a.onmouseout = function() {
            a.__cehp_tab_moving = false
        }
    },
    add_cb_on_tab_switch: function(a) {
        this.cbs.push(a)
    },
    on_tab_switch: function(b) {
        var a;
        for (a in this.cbs) {
            this.cbs[a](b)
        }
    },
    change: function(a) {
        try {
            if (!__ie__) {
                a = __event__(a);
                var d = a.target
            } else {
                var d = a
            }
            if (!d.__cehp_tab_moving) {
                return
            }
            var c = d;
            while (c.nodeName.toLowerCase() != "ul") {
                c = c.parentNode
            }
            var h = CSS.find("tab-title-current", c);
            var b;
            for (b in h) {
                if (h[b].nodeType != 1) {
                    continue
                }
                document.getElementById(UTIL.getRel(h[b])).style.display = "none";
                CSS.del(h[b], "tab-title-current")
            }
            CSS.add(d, "tab-title-current");
            var j = UTIL.getRel(d);
            var f = document.getElementById(j);
            f.style.display = "block"
        } catch(g) {}
    },
    random_show: function(d, c) {
        var a = Math.floor(Math.random() * c) + 1;
        if (a > c) {
            a = c
        }
        var b = d + a;
        var e = el(b);
        TAB.auto_change(e)
    },
    random_show_one: function(d, b) {
        var a = Math.random();
        if (a > b) {
            var c = el(d);
            TAB.auto_change(c)
        }
    },
    auto_change: function(f) {
        var b = f;
        while (b.nodeName.toLowerCase() != "ul") {
            b = b.parentNode
        }
        var d = CSS.find("tab-title-current", b);
        for (var a in d) {
            if (d[a].nodeType != 1) {
                continue
            }
            document.getElementById(UTIL.getRel(d[a])).style.display = "none";
            CSS.del(d[a], "tab-title-current")
        }
        CSS.add(f, "tab-title-current");
        var e = UTIL.getRel(f);
        var c = document.getElementById(e);
        c.style.display = "block"
    }
};
function CityPicker() {}
CityPicker.prototype = {
    initialize: function(b, e, d, a, c) {
        this.placeIn = e ? e: document.body;
        this.input = b;
        this.cities = d;
        this.sign = a;
        this.more = c;
        this.picker = null;
        this.initPicker();
        this.initEventListeners()
    },
    initPicker: function() {
        this.picker = document.createElement("DIV");
        this.picker.className = "city-picker widget round-box trans-box";
        this.picker.style.display = "none";
        var c = document.createElement("UL");
        this.picker.appendChild(c);
        for (var b in this.cities) {
            var d = document.createElement("LI");
            d.innerHTML = '<a href="javascript:void(0);" title="' + this.cities[b] + '">' + this.cities[b] + "</a>";
            var a = this;
            d.childNodes[0].onclick = function(f) {
                if (a.sign == 0) {
                    a.input.value = this.innerHTML
                } else {
                    if (a.sign == 1) {
                        a.input.innerHTML = this.innerHTML
                    }
                }
                a.picker.style.display = "none";
                f = __event__(f);
                var e = f.target;
                if (e.parentNode.parentNode.parentNode.parentNode.children[1].id == "tuan_city_input") {
                    TUAN.change()
                }
            };
            c.appendChild(d)
        }
        if (this.more) {
            var d = document.createElement("li");
            d.innerHTML = "<a target='_blank' href=" + this.more + ">更多</a>";
            c.appendChild(d)
        }
        this.placeIn.appendChild(this.picker)
    },
    initEventListeners: function() {
        var a = this;
        this.input.onclick = function(b) {
            a.picker.style.display = "block"
        };
        this.input.onkeydown = function(b) {
            a.picker.style.display = "none"
        };
        this.picker.onmousedown = function(b) {
            stop_event(b)
        };
        observe_event(document.body, "mousedown", 
        function(b) {
            a.picker.style.display = "none"
        },
        false);
        TAB.add_cb_on_tab_switch(function(b) {
            if ((b.className == "tab-title rel-links_hotel") || (b.className == "tab-title rel-mblog")) {
                a.picker.style.display = "none"
            }
        })
    }
};
function tab_auto_change() {}
tab_auto_change.prototype = {
    initialize: function(a, c, b) {
        this.li = a;
        this.tab_pre = c;
        this.interval = null;
        this.total_num = b;
        this.initEventListeners()
    },
    initEventListeners: function() {
        var a = this;
        a.li.onmouseover = function() {
            window.clearInterval(a.interval)
        };
        var b = a.li.getElementsByTagName("div")[0].getElementsByTagName("ul")[0].getElementsByTagName("li").length - 2;
        a.change_tab(0, b)
    },
    auto_change: function(f) {
        var b = f;
        while (b.nodeName.toLowerCase() != "ul") {
            b = b.parentNode
        }
        var d = CSS.find("tab-title-current", b);
        for (var a in d) {
            if (d[a].nodeType != 1) {
                continue
            }
            document.getElementById(UTIL.getRel(d[a])).style.display = "none";
            CSS.del(d[a], "tab-title-current")
        }
        CSS.add(f, "tab-title-current");
        var e = UTIL.getRel(f);
        var c = document.getElementById(e);
        c.style.display = "block"
    },
    change_tab: function(a, c) {
        var b = this;
        var d = b.tab_pre;
        b.interval = setInterval(function() {
            a++;
            var f = a % c;
            f += "";
            var g = d + f;
            var e = CSS.find(g)[0];
            b.auto_change(e)
        },
        5000)
    }
};
var XHR = {
    get: function(b, a) {
        var c = new XMLHttpRequest();
        c.onreadystatechange = function() {
            if (c.readyState == 4) {
                a(c.responseText)
            }
        };
        c.open("GET", b, true);
        c.send("")
    }
};
var NOTIFY = {
    panel: null,
    mask: null,
    mask_iframe: null,
    timer: null,
    confirm: function(c, a) {
        if (this.panel == null) {
            this.panel = el("notify_confirm")
        }
        if (this.mask == null) {
            this.mask = el("notify_mask")
        }
        if (this.mask_iframe == null) {
            this.mask_iframe = el("notify_mask_iframe")
        }
        this.panel.getElementsByTagName("p")[0].innerHTML = c;
        this.panel.style.display = "block";
        this.mask.style.display = "block";
        this.mask_iframe.style.display = "block";
        this.setPos();
        window.clearInterval(this.timer);
        var b = this;
        this.timer = window.setInterval(function() {
            b.setPos()
        },
        1000);
        this.onconfirm.callback = a
    },
    onconfirm: function(a) {
        window.clearInterval(this.timer);
        this.panel.style.display = "none";
        this.mask.style.display = "none";
        this.mask_iframe.style.display = "none";
        CSS.find("cancel-btn", this.panel)[0].style.display = "inline";
        if (this.onconfirm.callback) {
            this.onconfirm.callback(a)
        }
    },
    setPos: function() {
        this.panel.style.top = this.mask.offsetHeight / 2 - this.panel.offsetHeight / 2 + "px"
    },
    alert: function(b, a) {
        this.confirm(b, a);
        CSS.find("cancel-btn", this.panel)[0].style.display = "none"
    }
};
var AD = {
    ads: null,
    algorithm: null,
    iframe: [],
    init: function(c, a) {
        for (var b = 0; b < 2; b++) {
            this.iframe[b] = document.createElement("IFRAME");
            this.iframe[b].style.display = "none";
            this.iframe[b].style.width = "468px";
            this.iframe[b].style.height = "60px";
            this.iframe[b].scrolling = "no";
            el("banner_show1").appendChild(this.iframe[b])
        }
        this.ads = c;
        this.algorithm = typeof a == "function" ? a: this.algr_left_first;
        var e = Math.random() >= 0.5;
        this.showAd(e);
        this.showAd(!e);
        var d = el("banner_show1").getElementsByTagName("iframe")[0].src;
        el("banner_show1").getElementsByTagName("iframe")[0].src = d
    },
    showAd: function(b) {
        var a = this.algorithm(this.ads, b);
        this.showItem(this.createItem(this.ads[a]), b);
        this.ads.splice(a, 1)
    },
    algr_random: function(c) {
        for (var b = 0; b < 3; b++) {
            var a = Math.floor(Math.random() * (c.length));
            if (a >= c.length) {
                a = c.length - 1
            }
            if (true != c[a].picked) {
                return a
            }
        }
        return 0
    },
    algr_left_first: function(a, b) {
        if (b) {
            return 0
        } else {
            a[0].picked = true;
            return this.algr_half_first(a)
        }
    },
    algr_half_first: function(c) {
        if (true != c[0].picked) {
            if (Math.random() >= 0.75) {
                c[0].picked = true;
                return 0
            }
        }
        var a = c.length - 1;
        var b = Math.floor(Math.random() * a);
        if (b >= a) {
            b = a - 1
        }
        return b + 1
    },
    createItem: function(c) {
        var d = null;
        if (c.type == 1) {
            for (var b = 0; b < this.iframe.length; b++) {
                if (this.iframe[b].src == "") {
                    d = this.iframe[b]
                }
            }
            d.name = "banner_ads_iframe_" + new Date().getTime();
            d.id = d.name;
            d.src = c.url + "#" + new Date().getTime();
            d.style.display = "block"
        } else {
            if (c.type == 2) {
                d = document.createElement("EMBED");
                d.src = c.url
            } else {
                d = document.createElement("A");
                d.target = "_blank";
                var a = new Image();
                a.alt = c.title;
                a.src = c.img;
                d.appendChild(a);
                d.href = c.url;
                d.title = c.title
            }
        }
        return d
    },
    getLeftArea: function() {
        return el("banner_show1").getElementsByTagName("DIV")[0]
    },
    getRightArea: function() {
        return el("banner_show1").getElementsByTagName("DIV")[1]
    },
    showItem: function(a, b) { (true == b ? this.getLeftArea() : this.getRightArea()).appendChild(a)
    }
};
var Calender = {
    HS_DateAdd: function(a, c, b) {
        c = parseInt(c);
        if (typeof(b) == "string") {
            var b = new Date(b.split("-")[0], b.split("-")[1], b.split("-")[2])
        }
        if (typeof(b) == "object") {
            var b = b
        }
        switch (a) {
        case "y":
            return new Date(b.getFullYear() + c, b.getMonth(), b.getDate());
            break;
        case "m":
            return new Date(b.getFullYear(), b.getMonth() + c, this.checkDate(b.getFullYear(), b.getMonth() + c, b.getDate()));
            break;
        case "d":
            return new Date(b.getFullYear(), b.getMonth(), b.getDate() + c);
            break;
        case "w":
            return new Date(b.getFullYear(), b.getMonth(), 7 * c + b.getDate());
            break
        }
    },
    checkDate: function(d, e, c) {
        var a = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
        var b = "";
        if (d % 4 == 0) {
            a[1] = "29"
        }
        if (c > a[e]) {
            b = a[e]
        } else {
            b = c
        }
        return b
    },
    WeekDay: function(a) {
        var b;
        if (typeof(a) == "string") {
            b = new Date(a.split("-")[0], a.split("-")[1], a.split("-")[2])
        }
        if (typeof(a) == "object") {
            b = a
        }
        return b.getDay()
    },
    HS_calender: function() {
        var r = "";
        var a = "";
        var d;
        if (typeof(arguments[0]) == "string") {
            selectDate = arguments[0].split("-");
            var q = selectDate[0];
            var p = parseInt(selectDate[1]) - 1 + "";
            var e = selectDate[2];
            d = new Date(q, p, e)
        } else {
            if (typeof(arguments[0]) == "object") {
                d = arguments[0]
            }
        }
        var b = this.HS_DateAdd("d", "-1", d.getFullYear() + "-" + d.getMonth() + "-01").getDate();
        var h = this.WeekDay(d.getFullYear() + "-" + d.getMonth() + "-01");
        var o = this.HS_DateAdd("d", "-1", d.getFullYear() + "-" + (parseInt(d.getMonth()) + 1).toString() + "-01");
        var n = o.getDate();
        var m = o.getDay();
        var k = new Date();
        today = k.getFullYear() + "-" + k.getMonth() + "-" + k.getDate();
        for (i = 0; i < h; i++) {
            r = "<li class='lastMonthDate'>" + b + "</li>" + r;
            b--
        }
        for (i = 1; i <= n; i++) {
            month_temp = parseInt(d.getMonth()) + 1;
            day_temp = i;
            if (month_temp < 10) {
                month_temp = "0" + month_temp
            }
            if (day_temp < 10) {
                day_temp = "0" + day_temp
            }
            if (today == d.getFullYear() + "-" + d.getMonth() + "-" + i) {
                var g = d.getFullYear() + "-" + month_temp + "-" + day_temp;
                r += "<li><a href=javascript:void(0) class='today' onclick='Calender.selectThisDay(this)' title='" + d.getFullYear() + "-" + month_temp + "-" + day_temp + "'>" + i + "</a></li>"
            } else {
                r += "<li><a href=javascript:void(0) onclick='Calender.selectThisDay(this)' title='" + d.getFullYear() + "-" + month_temp + "-" + day_temp + "'>" + i + "</a></li>"
            }
        }
        var f = 1;
        for (i = m; i < 6; i++) {
            r += "<li class='nextMonthDate'>" + f + "</li>";
            f++
        }
        r += a;
        var l = "<a href='javascript:void(0)' class='NextMonth' onclick=Calender.HS_calender(Calender.HS_DateAdd('m',1,'" + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "'),this) title='Next Month'>&raquo;</a>";
        l += "<a href='javascript:void(0)' class='LastMonth' onclick=Calender.HS_calender(Calender.HS_DateAdd('m',-1,'" + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "'),this) title='Previous Month'>&laquo;</a>";
        l += "<span class='selectThisYear'><a href='javascript:void(0)' onclick='Calender.CalenderselectYear(this)' title='Click here to select other year' >" + d.getFullYear() + "</a></span>年<span class='selectThisMonth'><a href='javascript:void(0)' onclick='Calender.CalenderselectMonth(this)' title='Click here to select other month'>" + (parseInt(d.getMonth()) + 1).toString() + "</a>< /span>月";
        if (arguments.length > 1) {
            arguments[1].parentNode.parentNode.getElementsByTagName("ul")[1].innerHTML = r;
            arguments[1].parentNode.innerHTML = l
        } else {
            var c = a + "<div class='calender'><div class='calenderTitle'>" + l + "</div><div class='calenderBody'><ul class='day'><li>日</li><li>一</li><li>二& lt;/li><li>三</li><li>四</li><li>五< /li><li>六</li></ul><ul class='date' id='thisMonthDate'>" + r + "</ul></div><div class='calenderBottom'><a href='javascript:void(0)' class='closeCalender' onclick='Calender.closeCalender(this)'>&times;</a><span><span><a href=javascript:void(0) onclick='Calender.selectThisDay(this)' title='" + g + "'>今天</a></span></span></div>< /div>";
            return c
        }
    },
    selectThisDay: function(b) {
        var a = b.parentNode.parentNode.parentNode.parentNode.parentNode;
        a.targetObj.value = b.title;
        a.parentNode.removeChild(a)
    },
    closeCalender: function(b) {
        var a = b.parentNode.parentNode.parentNode;
        a.parentNode.removeChild(a)
    },
    CalenderselectYear: function(c) {
        var b = "";
        var a = c.innerHTML;
        for (i = 2010; i <= 2011; i++) {
            if (i == a) {
                b += "<option value=" + i + " selected>" + i + "</option>"
            } else {
                b += "<option value=" + i + ">" + i + "</option>"
            }
        }
        b = "<select onblur='selectThisYear(this)' onchange='selectThisYear(this)' style='font-size:11px'>" + b + "</select>";
        c.parentNode.innerHTML = b
    },
    selectThisYear: function(a) {
        this.HS_calender(a.value + "-" + a.parentNode.parentNode.getElementsByTagName("span")[1].getElementsByTagName("a")[0].innerHTML + "-1", a.parentNode)
    },
    CalenderselectMonth: function(c) {
        var b = "";
        var a = c.innerHTML;
        for (i = 1; i <= 12; i++) {
            if (i == a) {
                b += "<option value=" + i + " selected>" + i + "</option>"
            } else {
                b += "<option value=" + i + ">" + i + "</option>"
            }
        }
        b = "<select onblur='selectThisMonth(this)' onchange='selectThisMonth(this)' style='font-size:11px'>" + b + "</select>";
        c.parentNode.innerHTML = b
    },
    selectThisMonth: function(a) {
        HS_calender(a.parentNode.parentNode.getElementsByTagName("span")[0].getElementsByTagName("a")[0].innerHTML + "-" + a.value + "-1", a.parentNode)
    },
    HS_setDate: function(b) {
        var e = b.parentNode;
        var d = b.parentNode.parentNode;
        if (CSS.find("calender", e).length == 0) {
            if (CSS.find("calender", d).length > 0) {
                var a = b.parentNode.parentNode.getElementsByTagName("span")[0];
                a.parentNode.removeChild(a)
            }
            var c = document.createElement("span");
            c.innerHTML = this.HS_calender(new Date());
            c.style.position = "absolute";
            c.setAttribute("class", "calender_dates");
            c.targetObj = b;
            b.parentNode.insertBefore(c, b.nextSibling)
        }
    },
    close_pop_window: function(j, e) {
        var a = e;
        var d = el("links_ticket");
        var b = el("links_hotel");
        var h = CSS.find("calender", d);
        var g = CSS.find("calender", b);
        var f;
        if ((h.length > 0) || (g.length > 0)) {
            if (h.length > 0) {
                f = h
            } else {
                f = g
            }
            while (a.nodeName.toLowerCase() != "body") {
                if ((a.getAttribute("class") == "calender") || (a.getAttribute("class") == "date")) {
                    break
                }
                a = a.parentNode
            }
            if (a.nodeName.toLowerCase() == "body") {
                for (var c = 0; c < f.length; c++) {
                    var k = f[c].parentNode;
                    f[c].parentNode.parentNode.removeChild(k)
                }
            }
        }
    },
    close_on_tab_switch: function(c) {
        if ((c.getAttribute("class") == "tab-title rel-links_hotel") || (c.getAttribute("class") == "tab-title rel-links_ticket")) {
            var d = CSS.find("calender");
            if (d.length > 0) {
                for (var b = 0; b < d.length; b++) {
                    var a = d[b].parentNode;
                    a.parentNode.removeChild(a)
                }
            }
        }
    }
};
TAB.add_cb_on_tab_switch(Calender.close_on_tab_switch);
var TUAN = {
    endtime: [],
    append_goods: function(c, b) {
        if (!c) {
            c = []
        }
        for (var a in b) {
            c.push(b[a])
        }
        return c
    },
    init_list: function(b) {
        if (!b) {
            return
        }
        for (var a = 0; a < b.childNodes.length; a++) {
            var c = b.childNodes[a];
            if (!c.tagName) {
                b.removeChild(b.childNodes[a]);
                a--;
                continue
            }
        }
        for (var a = 0; a < b.childNodes.length; a++) {
            CSS.del(b.childNodes[a], "current")
        }
    },
    change: function(h) {
        var d;
        var e;
        window.clearInterval(this.timer);
        if (h) {
            e = h;
            var g = el("tuan_cities");
            TUAN.init_list(g);
            switch (h) {
            case "北京":
                CSS.add(g.childNodes[0], "current");
                break;
            case "上海":
                CSS.add(g.childNodes[1], "current");
                break;
            case "广州":
                CSS.add(g.childNodes[2], "current");
                break;
            case "深圳":
                CSS.add(g.childNodes[3], "current");
                break;
            default:
                CSS.add(g.childNodes[0], "current");
                break
            }
        } else {
            e = el("tuan_city_input").value
        }
        var f = new Array();
        for (d in tuan_content) {
            if (d == e) {
                for (var b in tuan_content[d]) {
                    f[b] = tuan_content[d][b]
                }
            }
        }
        if (this.len(f) == 0) {
            if (e == "") {
                alert("请选择城市")
            } else {
                if (tuan_content.length > 0) {
                    alert("您查询的城市尚未开通")
                }
            }
            el("tuan_city_input").value = "北京";
            TUAN.change();
            return
        }
        var c = [];
        if (this.len(f) == 1) {
            for (d in f) {
                if (f[d].length == 1) {
                    c.push(f[d][0]);
                    c.push(f[d][0])
                } else {
                    var a = TUAN.select_two(f[d]);
                    c.push(a[0]);
                    c.push(a[1])
                }
            }
        }
        if (this.len(f) >= 2) {
            var f = this.select_two_origin(f);
            for (var d in f) {
                if (this.len(f[d]) == 1) {
                    c.push(f[d][0])
                } else {
                    var a = this.select_one(f[d]);
                    c.push(a)
                }
            }
        }
        this.show_items(c)
    },
    len: function(c) {
        var a = 0,
        b;
        for (b in c) {
            if (c[b] != null) {
                a++
            }
        }
        return a
    },
    in_array: function(b, a) {
        for (i in b) {
            if (b[i] == a) {
                return true
            }
        }
        return false
    },
    select_one: function(b) {
        var a = this.random_num(this.len(b));
        return b[a]
    },
    select_two: function(c) {
        var b = [];
        var a = this.random_num(c.length);
        b.push(c[a]);
        c.splice(a, 1);
        b.push(this.select_one(c));
        return b
    },
    select_two_origin: function(n) {
        var l = [];
        var b = [];
        var f = [];
        var m = [];
        var h = ["lashou", "manzuo"];
        var c = ["meituan2", "nuomi"];
        var k = ["juqi2", "jumei2"];
        var a = ["quan24", "nala"];
        var d = ["meituan", "juqi", "jumei", "nuomi", "quan24"];
        this.delete_empty_data(h, n);
        this.delete_empty_data(c, n);
        this.delete_empty_data(k, n);
        this.delete_empty_data(a, n);
        this.delete_empty_data(d, n);
        var e = this.random_num(h.length);
        l.push(n[h[e]]);
        b.push(h[e]);
        for (var g in h) {
            if ((g != e) && (!this.in_array(b, h[g]))) {
                l.push(n[h[g]]);
                b.push(h[g])
            }
        }
        if ((l.length < 2) && n.nala) {
            l.push(n.nala)
        }
        e = this.random_num(c.length);
        l.push(n[c[e]]);
        e = this.random_num(k.length);
        l.push(n[k[e]]);
        e = this.random_num(a.length);
        l.push(n[a[e]]);
        var j = 0;
        while (l.length < 5) {
            if (j != e) {
                l.push(n[a[j]])
            }
            j++
        }
        for (var g in d) {
            if (l.length < 8) {
                l.push(n[d[g]])
            }
        }
        return l
    },
    delete_empty_data: function(c, b) {
        for (var a = 0; a < c.length; a++) {
            if (!b[c[a]]) {
                c.splice(a, 1)
            }
        }
    },
    random_num: function(a) {
        var b = a * Math.random();
        b = Math.floor(b);
        var c = 0;
        if (b < a) {
            c = b
        } else {
            c = b - 1
        }
        return c
    },
    remove_children: function(c) {
        var b = c.childNodes;
        var d = new Array();
        var a;
        for (a = 0; a < b.length; a++) {
            if (b[a].nodeType == 1) {
                d.push(b[a])
            }
        }
        for (a = 0; a < d.length; a++) {
            c.removeChild(d[a])
        }
    },
    show_items: function(a) {
        TUAN.remove_children(el("tuan"));
        TUAN.remove_children(el("tuan_small_image"));
        var c = "";
        for (i = 0; i < 1; i++) {
            var f;
            var d = '"' + a[i].img + '"';
            var e = '"' + a[i].url + '"';
            var b = '"' + a[i].oriurl + '"';
            c += "<div class='tuan_content'>\n";
            c += "<div class='des'>";
            c += "<a target='_blank' href=" + e + "title='" + a[i].description + "'>" + a[i].description + "</a>\n";
            c += "</div>\n";
            c += "<div class='tuan_pic'>\n";
            c += "<a target='_blank' href=" + e + "title='" + a[i].description + "'>\n";
            c += "<img alt='' src=" + d + "/>\n";
            c += "</a>\n";
            c += "</div>\n";
            c += "<div class='tuan_bottom'>\n";
            c += "<div class='price'>\n";
            c += "原价： <strong style='text-decoration:line-through;'>￥" + a[i].value + "</strong& gt;\n";
            c += "<a target='_blank' href=" + e + ">\n";
            c += "<strong>￥" + a[i].price + "</strong>\n";
            c += "</a>\n";
            c += "</div>\n";
            c += "<div class='button'>\n";
            c += "<a target='_blank' href=" + b + ">\n";
            c += "</a>\n";
            c += "</div>\n";
            c += "</div>\n";
            c += "</div>\n"
        }
        c += "<ul class='tuan_list news-list link-trace rel-tuangou-list'>\n";
        for (i = 1; i < a.length; i++) {
            if (i < 5) {
                var e = '"' + a[i].url + '"';
                c += "<li class='disc'>\n";
                c += "<a class='ellipsis' target='_blank' href=" + e + "title='" + a[i].description + "'>" + a[i].description + "</a>\n";
                c += "</li>\n"
            }
        }
        c += "</ul>\n";
        el("tuan").innerHTML += c;
        c = "";
        for (i = 5; i < a.length; i++) {
            if (i < 8) {
                var d = '"' + a[i].img + '"';
                var e = '"' + a[i].url + '"';
                var b = '"' + a[i].oriurl + '"';
                c += "<div class='";
                if (i == 7) {
                    c += "last "
                }
                c += "small_image link-trace rel-tuan_small_image'>\n";
                c += "<div class='image'>\n";
                c += "<a target='_blank' href=" + e + "title='" + a[i].description + "'>\n";
                c += "<img alt='' src=" + d + "/>\n";
                c += "</a>\n";
                c += "</div>\n";
                c += "<div class='des_box'>\n";
                c += "<div class='des'>\n";
                c += "<a target='_blank' href=" + e + "title='" + a[i].description + "'>" + a[i].description + "</a>\n";
                c += "</div>\n";
                c += "<div class='price'>\n";
                c += "<p>团购价: <a target='_blank' href=" + e + "><strong>" + a[i].price + "</strong></a> 元</p>\n";
                c += "<p>原价：<span>" + a[i].value + " 元</span></p>\n";
                c += "</div>\n";
                c += "<div class='button'>\n";
                c += "<a target='_blank' href=" + b + "></a>\n";
                c += "</div>\n";
                c += "</div>\n";
                c += "</div>\n"
            }
        }
        el("tuan_small_image").innerHTML += c
    },
    enterkey: function(a) {
        var b;
        if (window.event) {
            b = a.keyCode
        } else {
            if (a.which) {
                b = a.which
            }
        }
        if (b == 13) {
            this.change()
        }
    }
};
var Rank = {
    init: function(c) {
        var d = el(c);
        if (!d) {
            return
        }
        for (var b = 0; b < d.childNodes.length; b++) {
            var e = d.childNodes[b];
            if (!e.tagName) {
                d.removeChild(d.childNodes[b]);
                b--;
                continue
            }
            e.onclick = function() {
                Rank.switch_to(UTIL.getRel(this), d)
            }
        }
        var a = TUAN.random_num(d.childNodes.length);
        do_click(d.childNodes[a])
    },
    switch_to: function(c, d) {
        for (var b = 0, a = d.childNodes.length; b < a; b++) {
            CSS.del(d.childNodes[b], "selected");
            el(UTIL.getRel(d.childNodes[b])).style.display = "none";
            if (UTIL.getRel(d.childNodes[b]) == c) {
                CSS.add(d.childNodes[b], "selected");
                el(UTIL.getRel(d.childNodes[b])).style.display = "block"
            }
        }
    }
};
var SetStyle = {
    wide_screen: function(a) {
        PREF.set("homepage_width", a);
        if (a == "wide") {
            var b = "http://" + window.location.host + "/index_w.html";
            location.href = b
        }
        if (a == "normal") {
            var b = "http://" + window.location.host;
            location.href = b
        }
    }
};
function do_click(c) {
    var a = document.createEvent("MouseEvents");
    a.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    if (window.XMLHttpRequest) {
        try {
            c.dispatchEvent(a)
        } catch(b) {
            c.click()
        }
    } else {
        c.click()
    }
}
function el(a) {
    return document.getElementById(a)
}
function log(c) {
    var b = el("log");
    var a = document.createElement("p");
    a.appendChild(document.createTextNode(new Date() + ": " + c));
    b.appendChild(a)
}
window.setTimeout(function() {
    var b = new XMLHttpRequest();
    var a = "http://" + window.location.host + "/static/refresh.gif?" + Math.random();
    b.open("GET", a, true);
    b.onreadystatechange = function() {
        if (b.readyState == 4) {
            if ((b.status == 200)) {
                var c = window.location.search;
                if (c.length > 1) {
                    c = c.substring(1).split("&");
                    c.push("rv=1");
                    c = "?" + c.join("&")
                } else {
                    c = "?rv=1"
                }
                window.location.href = [window.location.protocal, "//", window.location.host, window.location.pathname, c].join("")
            }
        }
    };
    b.send(null)
},
1000 * 1800);