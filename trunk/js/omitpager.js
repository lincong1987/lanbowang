/*
* 省略号的分页js
* 如下
*   上一页 1 2 ... 5 6 7 ...  12 下一页
*   
*  @author: huihuang
*/
(function($) {

    $.fn.omitpager = function(options) {

        var opts = $.extend({}, $.fn.omitpager.defaults, options);     //初始化
        
    	if(opts.showpage<5) {
    		opts.showpage=5;
    		opts.sidecount=1;
    	}
    	else if(opts.showpage>9) {
    		opts.showpage=9;
    		opts.sidecount=3;
    	}
    	else if(opts.showpage==6 || opts.showpage==8 ) {
    		opts.showpage -= 1;
    	}
    	opts.sidecount = (opts.showpage - 3)/2;

        return this.each(function() {
            $(this).empty();
            renderpager($(this),parseInt(options.page), parseInt(options.pageSize), options.buttonClickCallback, opts);            
        });
    };

    function renderpager($pager,page, pageSize, buttonClickCallback, options) {    //计算分页
    	if(page<1)  //边界检查
			page=1;
		if(pageSize<1)
			pageSize=1;
		if(page>pageSize) 
			page=pageSize;

		if(pageSize==1) {      				//只有一页，不显示
//			$pager.css('display','none');   //div不显示了
			return "";
		}

		var showpage=options.showpage;
		var sidecount=options.sidecount;
		
//        var $pager=$("#omitpager"); 		// $("#omitpager") 页面的div的id=omitpager

	    if(options.isshowbutton)
	    	$pager.append(renderPrevOrNext('prev', page, pageSize, buttonClickCallback));  //增加上一页button
        
		var content;
	    if(pageSize<=showpage) {      //直接显示，没有省略号
	    	for(var i=1; i<=pageSize; i++) {
	    		if(page==i) {
	    			content="<a class='selected' >"+i+"</a>";
	    			$pager.append(content);
	    		}
	    		else {
	    			content=$("<a >"+i+"</a>");
	    			content.bind('click',i,buttonClickCallback);
	    			content.appendTo($pager);
	    		}
	    	}
	    }
	    else {
		    if(page<showpage-sidecount) {    //在前面，只在后边加入省略号...
		    	for(var i=1; i<showpage; i++) {
		    		if(page==i) {
		    			content="<a class='selected' >"+i+"</a>";
		    			$pager.append(content);
		    		}
		    		else {
		    			content=$("<a >"+i+"</a>");
		    			content.bind('click',i,buttonClickCallback);
		    			content.appendTo($pager);
		    		}
		    	}
    			content="<span>...</span>";
    			$pager.append(content);
    			
    			content=$("<a >"+pageSize+"</a>");     //最后一页
    			content.bind('click',pageSize,buttonClickCallback);
    			content.appendTo($pager);
    			
		    }
		    else if( page > pageSize-showpage+1+sidecount) {    //在最后，只在前边加入省略号...
    			content=$("<a >1</a>");     //第一页
    			content.bind('click',1,buttonClickCallback);
    			content.appendTo($pager);

    			content="<span>...</span>";
    			$pager.append(content);
    			
		    	for(var i=pageSize-showpage+2; i<=pageSize; i++) {
		    		if(page==i) {
		    			content="<a class='selected' >"+i+"</a>";
		    			$pager.append(content);
		    		}
		    		else {
		    			content=$("<a >"+i+"</a>");
		    			content.bind('click',i,buttonClickCallback);
		    			content.appendTo($pager);
		    		}
		    	}
		    }
		    else {      //在中间，两边都要加入省略号...
    			content=$("<a >1</a>");     //第一页
    			content.bind('click',1,buttonClickCallback);
    			content.appendTo($pager);

    			content="<span>...</span>";
    			$pager.append(content);
		    	
		    	for(var i=page-sidecount; i<=page+sidecount; i++) {
		    		if(page==i) {
		    			content="<a class='selected' >"+i+"</a>";
		    			$pager.append(content);
		    		}
		    		else {
		    			content=$("<a >"+i+"</a>");
		    			content.bind('click',i,buttonClickCallback);
		    			content.appendTo($pager);
		    		}
		    	}

    			content="<span>...</span>";
    			$pager.append(content);

    			content=$("<a >"+pageSize+"</a>");     //最后一页
    			content.bind('click',pageSize,buttonClickCallback);
    			content.appendTo($pager);
		    }
	    }
	    
	    if(options.isshowbutton)
	    	$pager.append(renderPrevOrNext('next', page, pageSize, buttonClickCallback));   // 增加下一页
 
    }

    // 计算上一页(prev)，下一页(next)
    function renderPrevOrNext(buttonLabel, page, pageSize, buttonClickCallback) {
		var $Button = '';    //空值，这里需要再调试下，确认
        switch (buttonLabel) {
            case "prev":
            	if(page>1) {
            		var destPage = page - 1;
            		$Button = $("<a id='prev"+ destPage +"'>&lt;上一页</a>");
            		$Button.bind('click',destPage,buttonClickCallback);
            	}
                break;
            case "next":
    	    	if(page<pageSize) {
    	    		var destPage = page + 1;
					$Button = $("<a id='next"+ destPage +"'>下一页&gt;</a>");
            		$Button.bind('click',destPage,buttonClickCallback);
        		}
                break;
        }

        return $Button;
    }

    //页码控件的默认值
    $.fn.omitpager.defaults = {
    	page: 1,
    	pageSize: 1,
        sidecount: 2,	  		//选中页码两边应显示的页码个数
        showpage: 7,       		//显示的页码个数，应为奇数，只能取5,7,9三个数
        isshowbutton: true      //是否显示上一页，下一页
    };

})(jQuery);




