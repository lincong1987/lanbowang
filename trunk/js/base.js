//
// jquery pager 修改版 
// By lincong
// @icinfo.cn
//
// 调用方式
// $("#pager").pager({ pagenumber: 当前的page, pagecount: 总页数, buttonClickCallback:PageClick回调, totalCount:总记录数（注：可以为空）});
//绑定PageClick，这里使用的是跳转，也可以改成AJAX方式 pageclickednumber 点击的
//PageClick = function(pageclickednumber) {window.location.href="<?php echo $url; ?>"+pageclickednumber;}

(function($) {	
    $.fn.pager = function(options) {
        var opts = $.extend({},
        $.fn.pager.defaults, options);
        return this.each(function() {
            $(this).empty().append(renderpager(parseInt(options.pagenumber), parseInt(options.pagecount), options.buttonClickCallback,parseInt(options.totalCount)));
			
            $('.pages li').mouseover(function() {
                document.body.style.cursor = "pointer"

            }).mouseout(function() {
                document.body.style.cursor = "auto"

            })

        })

    };
    function renderpager(pagenumber, pagecount, buttonClickCallback,totalCount) {
		//alert(totalCount)
        var $pager = $('<ul class="pages"></ul>');
		
        $pager.append(renderButton('第一页', pagenumber, pagecount, buttonClickCallback)).append(renderButton('前一页', pagenumber, pagecount, buttonClickCallback));
        var startPoint = 1;
        var endPoint = 9;
        if (pagenumber > 4) {
            startPoint = pagenumber - 4;
            endPoint = pagenumber + 4

        }
        if (endPoint > pagecount) {
            startPoint = pagecount - 8;
            endPoint = pagecount

        }
        if (startPoint < 1) {
            startPoint = 1

        }
        for (var page = startPoint; page <= endPoint; page++) {
            var currentButton = $('<li class="page-number">' + (page) + '</li>');
            page == pagenumber ? currentButton.addClass('pgCurrent') : currentButton.click(function() {
                buttonClickCallback(this.firstChild.data)

            });
            currentButton.appendTo($pager)

        }
        $pager.append(renderButton('下一页', pagenumber, pagecount, buttonClickCallback)).append(renderButton('最后一页', pagenumber, pagecount, buttonClickCallback));
		var totalCount = isNaN(totalCount) ? "" : "共"+totalCount+"条数据 ";
		pn = pagecount == 0 ? 0 : pagenumber;
		$pager.append("<li class='pgDetail'>"+totalCount+" 共"+pagecount+"页 现在显示第"+pn+"页</li>");
        return $pager

    }
    function renderButton(buttonLabel, pagenumber, pagecount, buttonClickCallback) {
        var $Button = $('<li class="pgNext">' + buttonLabel + '</li>');
        var destPage = 1;
        switch (buttonLabel) {
            case "第一页":
            destPage = 1;
            break;
            case "前一页":
            destPage = pagenumber - 1;
            break;
            case "下一页":
            destPage = pagenumber + 1;
            break;
            case "最后一页":
            destPage = pagecount;
            break

        }
        if (buttonLabel == "第一页" || buttonLabel == "前一页") {
            pagenumber <= 1 ? $Button.addClass('pgEmpty') : $Button.click(function() {
                buttonClickCallback(destPage)

            })

        } else {
            pagenumber >= pagecount ? $Button.addClass('pgEmpty') : $Button.click(function() {
                buttonClickCallback(destPage)

            })

        }
        return $Button

    }
    $.fn.pager.defaults = {
        pagenumber: 1,
        pagecount: 1,
		totalCount:0
    }
})(jQuery);

/*
 * jQuery UI 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
;jQuery.ui || (function($) {

var _remove = $.fn.remove,
	isFF2 = $.browser.mozilla && (parseFloat($.browser.version) < 1.9);

//Helper functions and ui object
$.ui = {
	version: "1.7.2",

	// $.ui.plugin is deprecated.  Use the proxy pattern instead.
	plugin: {
		add: function(module, option, set) {
			var proto = $.ui[module].prototype;
			for(var i in set) {
				proto.plugins[i] = proto.plugins[i] || [];
				proto.plugins[i].push([option, set[i]]);
			}
		},
		call: function(instance, name, args) {
			var set = instance.plugins[name];
			if(!set || !instance.element[0].parentNode) { return; }

			for (var i = 0; i < set.length; i++) {
				if (instance.options[set[i][0]]) {
					set[i][1].apply(instance.element, args);
				}
			}
		}
	},

	contains: function(a, b) {
		return document.compareDocumentPosition
			? a.compareDocumentPosition(b) & 16
			: a !== b && a.contains(b);
	},

	hasScroll: function(el, a) {

		//If overflow is hidden, the element might have extra content, but the user wants to hide it
		if ($(el).css('overflow') == 'hidden') { return false; }

		var scroll = (a && a == 'left') ? 'scrollLeft' : 'scrollTop',
			has = false;

		if (el[scroll] > 0) { return true; }

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[scroll] = 1;
		has = (el[scroll] > 0);
		el[scroll] = 0;
		return has;
	},

	isOverAxis: function(x, reference, size) {
		//Determines when x coordinate is over "b" element axis
		return (x > reference) && (x < (reference + size));
	},

	isOver: function(y, x, top, left, height, width) {
		//Determines when x, y coordinates is over "b" element
		return $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left, width);
	},

	keyCode: {
		BACKSPACE: 8,
		CAPS_LOCK: 20,
		COMMA: 188,
		CONTROL: 17,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		INSERT: 45,
		LEFT: 37,
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SHIFT: 16,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
};

// WAI-ARIA normalization
if (isFF2) {
	var attr = $.attr,
		removeAttr = $.fn.removeAttr,
		ariaNS = "http://www.w3.org/2005/07/aaa",
		ariaState = /^aria-/,
		ariaRole = /^wairole:/;

	$.attr = function(elem, name, value) {
		var set = value !== undefined;

		return (name == 'role'
			? (set
				? attr.call(this, elem, name, "wairole:" + value)
				: (attr.apply(this, arguments) || "").replace(ariaRole, ""))
			: (ariaState.test(name)
				? (set
					? elem.setAttributeNS(ariaNS,
						name.replace(ariaState, "aaa:"), value)
					: attr.call(this, elem, name.replace(ariaState, "aaa:")))
				: attr.apply(this, arguments)));
	};

	$.fn.removeAttr = function(name) {
		return (ariaState.test(name)
			? this.each(function() {
				this.removeAttributeNS(ariaNS, name.replace(ariaState, ""));
			}) : removeAttr.call(this, name));
	};
}

//jQuery plugins
$.fn.extend({
	remove: function() {
		// Safari has a native remove event which actually removes DOM elements,
		// so we have to use triggerHandler instead of trigger (#3037).
		$("*", this).add(this).each(function() {
			$(this).triggerHandler("remove");
		});
		return _remove.apply(this, arguments );
	},

	enableSelection: function() {
		return this
			.attr('unselectable', 'off')
			.css('MozUserSelect', '')
			.unbind('selectstart.ui');
	},

	disableSelection: function() {
		return this
			.attr('unselectable', 'on')
			.css('MozUserSelect', 'none')
			.bind('selectstart.ui', function() { return false; });
	},

	scrollParent: function() {

		var scrollParent;
		if(($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.curCSS(this,'position',1)) && (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		}

		return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
	}
});


//Additional selectors
$.extend($.expr[':'], {
	data: function(elem, i, match) {
		return !!$.data(elem, match[3]);
	},

	focusable: function(element) {
		var nodeName = element.nodeName.toLowerCase(),
			tabIndex = $.attr(element, 'tabindex');
		return (/input|select|textarea|button|object/.test(nodeName)
			? !element.disabled
			: 'a' == nodeName || 'area' == nodeName
				? element.href || !isNaN(tabIndex)
				: !isNaN(tabIndex))
			// the element and all of its ancestors must be visible
			// the browser may report that the area is hidden
			&& !$(element)['area' == nodeName ? 'parents' : 'closest'](':hidden').length;
	},

	tabbable: function(element) {
		var tabIndex = $.attr(element, 'tabindex');
		return (isNaN(tabIndex) || tabIndex >= 0) && $(element).is(':focusable');
	}
});


// $.widget is a factory to create jQuery plugins
// taking some boilerplate code out of the plugin code
function getter(namespace, plugin, method, args) {
	function getMethods(type) {
		var methods = $[namespace][plugin][type] || [];
		return (typeof methods == 'string' ? methods.split(/,?\s+/) : methods);
	}

	var methods = getMethods('getter');
	if (args.length == 1 && typeof args[0] == 'string') {
		methods = methods.concat(getMethods('getterSetter'));
	}
	return ($.inArray(method, methods) != -1);
}

$.widget = function(name, prototype) {
	var namespace = name.split(".")[0];
	name = name.split(".")[1];

	// create plugin method
	$.fn[name] = function(options) {
		var isMethodCall = (typeof options == 'string'),
			args = Array.prototype.slice.call(arguments, 1);

		// prevent calls to internal methods
		if (isMethodCall && options.substring(0, 1) == '_') {
			return this;
		}

		// handle getter methods
		if (isMethodCall && getter(namespace, name, options, args)) {
			var instance = $.data(this[0], name);
			return (instance ? instance[options].apply(instance, args)
				: undefined);
		}

		// handle initialization and non-getter methods
		return this.each(function() {
			var instance = $.data(this, name);

			// constructor
			(!instance && !isMethodCall &&
				$.data(this, name, new $[namespace][name](this, options))._init());

			// method call
			(instance && isMethodCall && $.isFunction(instance[options]) &&
				instance[options].apply(instance, args));
		});
	};

	// create widget constructor
	$[namespace] = $[namespace] || {};
	$[namespace][name] = function(element, options) {
		var self = this;

		this.namespace = namespace;
		this.widgetName = name;
		this.widgetEventPrefix = $[namespace][name].eventPrefix || name;
		this.widgetBaseClass = namespace + '-' + name;

		this.options = $.extend({},
			$.widget.defaults,
			$[namespace][name].defaults,
			$.metadata && $.metadata.get(element)[name],
			options);

		this.element = $(element)
			.bind('setData.' + name, function(event, key, value) {
				if (event.target == element) {
					return self._setData(key, value);
				}
			})
			.bind('getData.' + name, function(event, key) {
				if (event.target == element) {
					return self._getData(key);
				}
			})
			.bind('remove', function() {
				return self.destroy();
			});
	};

	// add widget prototype
	$[namespace][name].prototype = $.extend({}, $.widget.prototype, prototype);

	// TODO: merge getter and getterSetter properties from widget prototype
	// and plugin prototype
	$[namespace][name].getterSetter = 'option';
};

$.widget.prototype = {
	_init: function() {},
	destroy: function() {
		this.element.removeData(this.widgetName)
			.removeClass(this.widgetBaseClass + '-disabled' + ' ' + this.namespace + '-state-disabled')
			.removeAttr('aria-disabled');
	},

	option: function(key, value) {
		var options = key,
			self = this;

		if (typeof key == "string") {
			if (value === undefined) {
				return this._getData(key);
			}
			options = {};
			options[key] = value;
		}

		$.each(options, function(key, value) {
			self._setData(key, value);
		});
	},
	_getData: function(key) {
		return this.options[key];
	},
	_setData: function(key, value) {
		this.options[key] = value;

		if (key == 'disabled') {
			this.element
				[value ? 'addClass' : 'removeClass'](
					this.widgetBaseClass + '-disabled' + ' ' +
					this.namespace + '-state-disabled')
				.attr("aria-disabled", value);
		}
	},

	enable: function() {
		this._setData('disabled', false);
	},
	disable: function() {
		this._setData('disabled', true);
	},

	_trigger: function(type, event, data) {
		var callback = this.options[type],
			eventName = (type == this.widgetEventPrefix
				? type : this.widgetEventPrefix + type);

		event = $.Event(event);
		event.type = eventName;

		// copy original event properties over to the new event
		// this would happen if we could call $.event.fix instead of $.Event
		// but we don't have a way to force an event to be fixed multiple times
		if (event.originalEvent) {
			for (var i = $.event.props.length, prop; i;) {
				prop = $.event.props[--i];
				event[prop] = event.originalEvent[prop];
			}
		}

		this.element.trigger(event, data);

		return !($.isFunction(callback) && callback.call(this.element[0], event, data) === false
			|| event.isDefaultPrevented());
	}
};

$.widget.defaults = {
	disabled: false
};


/** Mouse Interaction Plugin **/

$.ui.mouse = {
	_mouseInit: function() {
		var self = this;

		this.element
			.bind('mousedown.'+this.widgetName, function(event) {
				return self._mouseDown(event);
			})
			.bind('click.'+this.widgetName, function(event) {
				if(self._preventClickEvent) {
					self._preventClickEvent = false;
					event.stopImmediatePropagation();
					return false;
				}
			});

		// Prevent text selection in IE
		if ($.browser.msie) {
			this._mouseUnselectable = this.element.attr('unselectable');
			this.element.attr('unselectable', 'on');
		}

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind('.'+this.widgetName);

		// Restore text selection in IE
		($.browser.msie
			&& this.element.attr('unselectable', this._mouseUnselectable));
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		// TODO: figure out why we have to use originalEvent
		event.originalEvent = event.originalEvent || {};
		if (event.originalEvent.mouseHandled) { return; }

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var self = this,
			btnIsLeft = (event.which == 1),
			elIsCancel = (typeof this.options.cancel == "string" ? $(event.target).parents().add(event.target).filter(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				self.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return self._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return self._mouseUp(event);
		};
		$(document)
			.bind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.bind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		// preventDefault() is used to prevent the selection of text here -
		// however, in Safari, this causes select boxes not to be selectable
		// anymore, so this fix is needed
		($.browser.safari || event.preventDefault());

		event.originalEvent.mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// IE mouseup check - mouseup happened when mouse was out of window
		if ($.browser.msie && !event.button) {
			return this._mouseUp(event);
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		$(document)
			.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		if (this._mouseStarted) {
			this._mouseStarted = false;
			this._preventClickEvent = (event.target == this._mouseDownEvent.target);
			this._mouseStop(event);
		}

		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(event) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(event) {},
	_mouseDrag: function(event) {},
	_mouseStop: function(event) {},
	_mouseCapture: function(event) { return true; }
};

$.ui.mouse.defaults = {
	cancel: null,
	distance: 1,
	delay: 0
};

})(jQuery);
/*
 * jQuery UI Draggable 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	ui.core.js
 */
(function($) {

$.widget("ui.draggable", $.extend({}, $.ui.mouse, {

	_init: function() {

		if (this.options.helper == 'original' && !(/^(?:r|a|f)/).test(this.element.css("position")))
			this.element[0].style.position = 'relative';

		(this.options.addClasses && this.element.addClass("ui-draggable"));
		(this.options.disabled && this.element.addClass("ui-draggable-disabled"));

		this._mouseInit();

	},

	destroy: function() {
		if(!this.element.data('draggable')) return;
		this.element
			.removeData("draggable")
			.unbind(".draggable")
			.removeClass("ui-draggable"
				+ " ui-draggable-dragging"
				+ " ui-draggable-disabled");
		this._mouseDestroy();
	},

	_mouseCapture: function(event) {

		var o = this.options;

		if (this.helper || o.disabled || $(event.target).is('.ui-resizable-handle'))
			return false;

		//Quit if we're not on a valid handle
		this.handle = this._getHandle(event);
		if (!this.handle)
			return false;

		return true;

	},

	_mouseStart: function(event) {

		var o = this.options;

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		//Cache the helper size
		this._cacheHelperProportions();

		//If ddmanager is used for droppables, set the global draggable
		if($.ui.ddmanager)
			$.ui.ddmanager.current = this;

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Store the helper's css position
		this.cssPosition = this.helper.css("position");
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.element.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		//Generate the original position
		this.originalPosition = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if 'cursorAt' is supplied
		if(o.cursorAt)
			this._adjustOffsetFromHelper(o.cursorAt);

		//Set a containment if given in the options
		if(o.containment)
			this._setContainment();

		//Call plugins and callbacks
		this._trigger("start", event);

		//Recache the helper size
		this._cacheHelperProportions();

		//Prepare the droppable offsets
		if ($.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(this, event);

		this.helper.addClass("ui-draggable-dragging");
		this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		return true;
	},

	_mouseDrag: function(event, noPropagation) {

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		//Call plugins and callbacks and use the resulting position if something is returned
		if (!noPropagation) {
			var ui = this._uiHash();
			this._trigger('drag', event, ui);
			this.position = ui.position;
		}

		if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
		if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';
		if($.ui.ddmanager) $.ui.ddmanager.drag(this, event);

		return false;
	},

	_mouseStop: function(event) {

		//If we are using droppables, inform the manager about the drop
		var dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour)
			dropped = $.ui.ddmanager.drop(this, event);

		//if a drop comes from outside (a sortable)
		if(this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}

		if((this.options.revert == "invalid" && !dropped) || (this.options.revert == "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
			var self = this;
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				self._trigger("stop", event);
				self._clear();
			});
		} else {
			this._trigger("stop", event);
			this._clear();
		}

		return false;
	},

	_getHandle: function(event) {

		var handle = !this.options.handle || !$(this.options.handle, this.element).length ? true : false;
		$(this.options.handle, this.element)
			.find("*")
			.andSelf()
			.each(function() {
				if(this == event.target) handle = true;
			});

		return handle;

	},

	_createHelper: function(event) {

		var o = this.options;
		var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : (o.helper == 'clone' ? this.element.clone() : this.element);

		if(!helper.parents('body').length)
			helper.appendTo((o.appendTo == 'parent' ? this.element[0].parentNode : o.appendTo));

		if(helper[0] != this.element[0] && !(/(fixed|absolute)/).test(helper.css("position")))
			helper.css("position", "absolute");

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if(obj.left != undefined) this.offset.click.left = obj.left + this.margins.left;
		if(obj.right != undefined) this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		if(obj.top != undefined) this.offset.click.top = obj.top + this.margins.top;
		if(obj.bottom != undefined) this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
	},

	_getParentOffset: function() {

		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if(this.cssPosition == 'absolute' && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if((this.offsetParent[0] == document.body) //This needs to be actually done for all browsers, since pageX/pageY includes this information
		|| (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && $.browser.msie)) //Ugly IE fix
			po = { top: 0, left: 0 };

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition == "relative") {
			var p = this.element.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.element.css("marginLeft"),10) || 0),
			top: (parseInt(this.element.css("marginTop"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var o = this.options;
		if(o.containment == 'parent') o.containment = this.helper[0].parentNode;
		if(o.containment == 'document' || o.containment == 'window') this.containment = [
			0 - this.offset.relative.left - this.offset.parent.left,
			0 - this.offset.relative.top - this.offset.parent.top,
			$(o.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
			($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
		];

		if(!(/^(document|window|parent)$/).test(o.containment) && o.containment.constructor != Array) {
			var ce = $(o.containment)[0]; if(!ce) return;
			var co = $(o.containment).offset();
			var over = ($(ce).css("overflow") != 'hidden');

			this.containment = [
				co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,
				co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,
				co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,
				co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top
			];
		} else if(o.containment.constructor == Array) {
			this.containment = o.containment;
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) pos = this.position;
		var mod = d == "absolute" ? 1 : -1;
		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top																	// The absolute mouse position
				+ this.offset.relative.top * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.top * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left																// The absolute mouse position
				+ this.offset.relative.left * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.left * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		// This is another very weird special case that only happens for relative elements:
		// 1. If the css position is relative
		// 2. and the scroll parent is the document or similar to the offset parent
		// we have to refresh the relative offset during the scroll so there are no jumps
		if(this.cssPosition == 'relative' && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
			this.offset.relative = this._getRelativeOffset();
		}

		var pageX = event.pageX;
		var pageY = event.pageY;

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options

			if(this.containment) {
				if(event.pageX - this.offset.click.left < this.containment[0]) pageX = this.containment[0] + this.offset.click.left;
				if(event.pageY - this.offset.click.top < this.containment[1]) pageY = this.containment[1] + this.offset.click.top;
				if(event.pageX - this.offset.click.left > this.containment[2]) pageX = this.containment[2] + this.offset.click.left;
				if(event.pageY - this.offset.click.top > this.containment[3]) pageY = this.containment[3] + this.offset.click.top;
			}

			if(o.grid) {
				var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
				pageY = this.containment ? (!(top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3]) ? top : (!(top - this.offset.click.top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
				pageX = this.containment ? (!(left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2]) ? left : (!(left - this.offset.click.left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY																// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX																// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_clear: function() {
		this.helper.removeClass("ui-draggable-dragging");
		if(this.helper[0] != this.element[0] && !this.cancelHelperRemoval) this.helper.remove();
		//if($.ui.ddmanager) $.ui.ddmanager.current = null;
		this.helper = null;
		this.cancelHelperRemoval = false;
	},

	// From now on bulk stuff - mainly helpers

	_trigger: function(type, event, ui) {
		ui = ui || this._uiHash();
		$.ui.plugin.call(this, type, [event, ui]);
		if(type == "drag") this.positionAbs = this._convertPositionTo("absolute"); //The absolute position has to be recalculated after plugins
		return $.widget.prototype._trigger.call(this, type, event, ui);
	},

	plugins: {},

	_uiHash: function(event) {
		return {
			helper: this.helper,
			position: this.position,
			absolutePosition: this.positionAbs, //deprecated
			offset: this.positionAbs
		};
	}

}));

$.extend($.ui.draggable, {
	version: "1.7.2",
	eventPrefix: "drag",
	defaults: {
		addClasses: true,
		appendTo: "parent",
		axis: false,
		cancel: ":input,option",
		connectToSortable: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		delay: 0,
		distance: 1,
		grid: false,
		handle: false,
		helper: "original",
		iframeFix: false,
		opacity: false,
		refreshPositions: false,
		revert: false,
		revertDuration: 500,
		scope: "default",
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		snap: false,
		snapMode: "both",
		snapTolerance: 20,
		stack: false,
		zIndex: false
	}
});

$.ui.plugin.add("draggable", "connectToSortable", {
	start: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options,
			uiSortable = $.extend({}, ui, { item: inst.element });
		inst.sortables = [];
		$(o.connectToSortable).each(function() {
			var sortable = $.data(this, 'sortable');
			if (sortable && !sortable.options.disabled) {
				inst.sortables.push({
					instance: sortable,
					shouldRevert: sortable.options.revert
				});
				sortable._refreshItems();	//Do a one-time refresh at start to refresh the containerCache
				sortable._trigger("activate", event, uiSortable);
			}
		});

	},
	stop: function(event, ui) {

		//If we are still over the sortable, we fake the stop event of the sortable, but also remove helper
		var inst = $(this).data("draggable"),
			uiSortable = $.extend({}, ui, { item: inst.element });

		$.each(inst.sortables, function() {
			if(this.instance.isOver) {

				this.instance.isOver = 0;

				inst.cancelHelperRemoval = true; //Don't remove the helper in the draggable instance
				this.instance.cancelHelperRemoval = false; //Remove it in the sortable instance (so sortable plugins like revert still work)

				//The sortable revert is supported, and we have to set a temporary dropped variable on the draggable to support revert: 'valid/invalid'
				if(this.shouldRevert) this.instance.options.revert = true;

				//Trigger the stop of the sortable
				this.instance._mouseStop(event);

				this.instance.options.helper = this.instance.options._helper;

				//If the helper has been the original item, restore properties in the sortable
				if(inst.options.helper == 'original')
					this.instance.currentItem.css({ top: 'auto', left: 'auto' });

			} else {
				this.instance.cancelHelperRemoval = false; //Remove the helper in the sortable instance
				this.instance._trigger("deactivate", event, uiSortable);
			}

		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), self = this;

		var checkPos = function(o) {
			var dyClick = this.offset.click.top, dxClick = this.offset.click.left;
			var helperTop = this.positionAbs.top, helperLeft = this.positionAbs.left;
			var itemHeight = o.height, itemWidth = o.width;
			var itemTop = o.top, itemLeft = o.left;

			return $.ui.isOver(helperTop + dyClick, helperLeft + dxClick, itemTop, itemLeft, itemHeight, itemWidth);
		};

		$.each(inst.sortables, function(i) {
			
			//Copy over some variables to allow calling the sortable's native _intersectsWith
			this.instance.positionAbs = inst.positionAbs;
			this.instance.helperProportions = inst.helperProportions;
			this.instance.offset.click = inst.offset.click;
			
			if(this.instance._intersectsWith(this.instance.containerCache)) {

				//If it intersects, we use a little isOver variable and set it once, so our move-in stuff gets fired only once
				if(!this.instance.isOver) {

					this.instance.isOver = 1;
					//Now we fake the start of dragging for the sortable instance,
					//by cloning the list group item, appending it to the sortable and using it as inst.currentItem
					//We can then fire the start event of the sortable with our passed browser event, and our own helper (so it doesn't create a new one)
					this.instance.currentItem = $(self).clone().appendTo(this.instance.element).data("sortable-item", true);
					this.instance.options._helper = this.instance.options.helper; //Store helper option to later restore it
					this.instance.options.helper = function() { return ui.helper[0]; };

					event.target = this.instance.currentItem[0];
					this.instance._mouseCapture(event, true);
					this.instance._mouseStart(event, true, true);

					//Because the browser event is way off the new appended portlet, we modify a couple of variables to reflect the changes
					this.instance.offset.click.top = inst.offset.click.top;
					this.instance.offset.click.left = inst.offset.click.left;
					this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
					this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;

					inst._trigger("toSortable", event);
					inst.dropped = this.instance.element; //draggable revert needs that
					//hack so receive/update callbacks work (mostly)
					inst.currentItem = inst.element;
					this.instance.fromOutside = inst;

				}

				//Provided we did all the previous steps, we can fire the drag event of the sortable on every draggable drag, when it intersects with the sortable
				if(this.instance.currentItem) this.instance._mouseDrag(event);

			} else {

				//If it doesn't intersect with the sortable, and it intersected before,
				//we fake the drag stop of the sortable, but make sure it doesn't remove the helper by using cancelHelperRemoval
				if(this.instance.isOver) {

					this.instance.isOver = 0;
					this.instance.cancelHelperRemoval = true;
					
					//Prevent reverting on this forced stop
					this.instance.options.revert = false;
					
					// The out event needs to be triggered independently
					this.instance._trigger('out', event, this.instance._uiHash(this.instance));
					
					this.instance._mouseStop(event, true);
					this.instance.options.helper = this.instance.options._helper;

					//Now we remove our currentItem, the list group clone again, and the placeholder, and animate the helper back to it's original size
					this.instance.currentItem.remove();
					if(this.instance.placeholder) this.instance.placeholder.remove();

					inst._trigger("fromSortable", event);
					inst.dropped = false; //draggable revert needs that
				}

			};

		});

	}
});

$.ui.plugin.add("draggable", "cursor", {
	start: function(event, ui) {
		var t = $('body'), o = $(this).data('draggable').options;
		if (t.css("cursor")) o._cursor = t.css("cursor");
		t.css("cursor", o.cursor);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if (o._cursor) $('body').css("cursor", o._cursor);
	}
});

$.ui.plugin.add("draggable", "iframeFix", {
	start: function(event, ui) {
		var o = $(this).data('draggable').options;
		$(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {
			$('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>')
			.css({
				width: this.offsetWidth+"px", height: this.offsetHeight+"px",
				position: "absolute", opacity: "0.001", zIndex: 1000
			})
			.css($(this).offset())
			.appendTo("body");
		});
	},
	stop: function(event, ui) {
		$("div.ui-draggable-iframeFix").each(function() { this.parentNode.removeChild(this); }); //Remove frame helpers
	}
});

$.ui.plugin.add("draggable", "opacity", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data('draggable').options;
		if(t.css("opacity")) o._opacity = t.css("opacity");
		t.css('opacity', o.opacity);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if(o._opacity) $(ui.helper).css('opacity', o._opacity);
	}
});

$.ui.plugin.add("draggable", "scroll", {
	start: function(event, ui) {
		var i = $(this).data("draggable");
		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') i.overflowOffset = i.scrollParent.offset();
	},
	drag: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options, scrolled = false;

		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') {

			if(!o.axis || o.axis != 'x') {
				if((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed;
				else if(event.pageY - i.overflowOffset.top < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed;
			}

			if(!o.axis || o.axis != 'y') {
				if((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed;
				else if(event.pageX - i.overflowOffset.left < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed;
			}

		} else {

			if(!o.axis || o.axis != 'x') {
				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
			}

			if(!o.axis || o.axis != 'y') {
				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
			}

		}

		if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(i, event);

	}
});

$.ui.plugin.add("draggable", "snap", {
	start: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options;
		i.snapElements = [];

		$(o.snap.constructor != String ? ( o.snap.items || ':data(draggable)' ) : o.snap).each(function() {
			var $t = $(this); var $o = $t.offset();
			if(this != i.element[0]) i.snapElements.push({
				item: this,
				width: $t.outerWidth(), height: $t.outerHeight(),
				top: $o.top, left: $o.left
			});
		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options;
		var d = o.snapTolerance;

		var x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
			y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

		for (var i = inst.snapElements.length - 1; i >= 0; i--){

			var l = inst.snapElements[i].left, r = l + inst.snapElements[i].width,
				t = inst.snapElements[i].top, b = t + inst.snapElements[i].height;

			//Yes, I know, this is insane ;)
			if(!((l-d < x1 && x1 < r+d && t-d < y1 && y1 < b+d) || (l-d < x1 && x1 < r+d && t-d < y2 && y2 < b+d) || (l-d < x2 && x2 < r+d && t-d < y1 && y1 < b+d) || (l-d < x2 && x2 < r+d && t-d < y2 && y2 < b+d))) {
				if(inst.snapElements[i].snapping) (inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
				inst.snapElements[i].snapping = false;
				continue;
			}

			if(o.snapMode != 'inner') {
				var ts = Math.abs(t - y2) <= d;
				var bs = Math.abs(b - y1) <= d;
				var ls = Math.abs(l - x2) <= d;
				var rs = Math.abs(r - x1) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left - inst.margins.left;
			}

			var first = (ts || bs || ls || rs);

			if(o.snapMode != 'outer') {
				var ts = Math.abs(t - y1) <= d;
				var bs = Math.abs(b - y2) <= d;
				var ls = Math.abs(l - x1) <= d;
				var rs = Math.abs(r - x2) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left - inst.margins.left;
			}

			if(!inst.snapElements[i].snapping && (ts || bs || ls || rs || first))
				(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
			inst.snapElements[i].snapping = (ts || bs || ls || rs || first);

		};

	}
});

$.ui.plugin.add("draggable", "stack", {
	start: function(event, ui) {

		var o = $(this).data("draggable").options;

		var group = $.makeArray($(o.stack.group)).sort(function(a,b) {
			return (parseInt($(a).css("zIndex"),10) || o.stack.min) - (parseInt($(b).css("zIndex"),10) || o.stack.min);
		});

		$(group).each(function(i) {
			this.style.zIndex = o.stack.min + i;
		});

		this[0].style.zIndex = o.stack.min + group.length;

	}
});

$.ui.plugin.add("draggable", "zIndex", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data("draggable").options;
		if(t.css("zIndex")) o._zIndex = t.css("zIndex");
		t.css('zIndex', o.zIndex);
	},
	stop: function(event, ui) {
		var o = $(this).data("draggable").options;
		if(o._zIndex) $(ui.helper).css('zIndex', o._zIndex);
	}
});

})(jQuery);




/*
 * jQuery UI Dialog 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 *	ui.resizable.js
 */
(function($) {

var setDataSwitch = {
		dragStart: "start.draggable",
		drag: "drag.draggable",
		dragStop: "stop.draggable",
		maxHeight: "maxHeight.resizable",
		minHeight: "minHeight.resizable",
		maxWidth: "maxWidth.resizable",
		minWidth: "minWidth.resizable",
		resizeStart: "start.resizable",
		resize: "drag.resizable",
		resizeStop: "stop.resizable"
	},
	
	uiDialogClasses =
		'ui-dialog ' +
		'ui-widget ' ;
		
		

$.widget("ui.dialog", {

	_init: function() {
		this.originalTitle = this.element.attr('title');

		var self = this,
			options = this.options,

			title = options.title || this.originalTitle || '&nbsp;',
			titleId = $.ui.dialog.getTitleId(this.element),

			uiDialog = (this.uiDialog = $('<div/>'))
				.appendTo(document.body)
				.hide()
				.addClass(uiDialogClasses + options.dialogClass)
				.css({
					position: 'absolute',
					overflow: 'hidden',
					zIndex: options.zIndex
				})
				// setting tabIndex makes the div focusable
				// setting outline to 0 prevents a border on focus in Mozilla
				.attr('tabIndex', -1).css('outline', 0).keydown(function(event) {
					(options.closeOnEscape && event.keyCode
						&& event.keyCode == $.ui.keyCode.ESCAPE && self.close(event));
				})
				.attr({
					role: 'dialog',
					'aria-labelledby': titleId
				})
				.mousedown(function(event) {
					self.moveToTop(false, event);
				}),

			uiDialogContent = this.element
				.show()
				.removeAttr('title')
				.addClass(
					'ui-dialog-content ')
					
				.appendTo(uiDialog),

			uiDialogTitlebar = (this.uiDialogTitlebar = $('<div></div>'))
				.addClass(
					'ui-dialog-titlebar ' +
					'ui-widget-header ' +
					'ui-helper-clearfix'
					
				)
				.prependTo(uiDialog),

//			uiDialogTitlebarClose = $('<a href="#"/>')
//				.addClass(
//					'ui-dialog-titlebar-close ' +
//					'ui-corner-all'
//				)
//				.attr('role', 'button')
//				.hover(
//					function() {
//						uiDialogTitlebarClose.addClass('ui-state-hover');
//					},
//					function() {
//						uiDialogTitlebarClose.removeClass('ui-state-hover');
//					}
//				)
//				.focus(function() {
//					uiDialogTitlebarClose.addClass('ui-state-focus');
//				})
//				.blur(function() {
//					uiDialogTitlebarClose.removeClass('ui-state-focus');
//				})
//				.mousedown(function(ev) {
//					ev.stopPropagation();
//				})
//				.click(function(event) {
//					self.close(event);
//					return false;
//				})
//				.appendTo(uiDialogTitlebar),
//
//			uiDialogTitlebarCloseText = (this.uiDialogTitlebarCloseText = $('<span/>'))
//				.addClass(
//					'ui-icon ' +
//					'ui-icon-closethick'
//				)
//				.text(options.closeText)
//				.appendTo(uiDialogTitlebarClose),

//			uiDialogTitle = $('<span/>')
//				.addClass('ui-dialog-title')
//				.attr('id', titleId)
//				.html(title)
//				.prependTo(uiDialogTitlebar);
		
			uiDialogFirstLeftDiv = $('<div/>')
			.addClass('ui-dialog-left')
			.html(title)
			.prependTo(uiDialogTitlebar);
			

		uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();

		(options.draggable && $.fn.draggable && this._makeDraggable());
		(options.resizable && $.fn.resizable && this._makeResizable());

		this._createButtons(options.buttons);
		this._isOpen = false;

		(options.bgiframe && $.fn.bgiframe && uiDialog.bgiframe());
		(options.autoOpen && this.open());
		
	},

	destroy: function() {
		(this.overlay && this.overlay.destroy());
		this.uiDialog.hide();
		this.element
			.unbind('.dialog')
			.removeData('dialog')
			.removeClass('ui-dialog-content')
			.hide().appendTo('body');
		this.uiDialog.remove();

		(this.originalTitle && this.element.attr('title', this.originalTitle));
	},

	close: function(event) {
		var self = this;
		
		if (false === self._trigger('beforeclose', event)) {
			return;
		}

		(self.overlay && self.overlay.destroy());
		self.uiDialog.unbind('keypress.ui-dialog');

		(self.options.hide
			? self.uiDialog.hide(self.options.hide, function() {
				self._trigger('close', event);
			})
			: self.uiDialog.hide() && self._trigger('close', event));

		$.ui.dialog.overlay.resize();

		self._isOpen = false;
		
		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		if (self.options.modal) {
			var maxZ = 0;
			$('.ui-dialog').each(function() {
				if (this != self.uiDialog[0]) {
					maxZ = Math.max(maxZ, $(this).css('z-index'));
				}
			});
			$.ui.dialog.maxZ = maxZ;
		}
	},

	isOpen: function() {
		return this._isOpen;
	},

	// the force parameter allows us to move modal dialogs to their correct
	// position on open
	moveToTop: function(force, event) {

		if ((this.options.modal && !force)
			|| (!this.options.stack && !this.options.modal)) {
			return this._trigger('focus', event);
		}
		
		if (this.options.zIndex > $.ui.dialog.maxZ) {
			$.ui.dialog.maxZ = this.options.zIndex;
		}
		(this.overlay && this.overlay.$el.css('z-index', $.ui.dialog.overlay.maxZ = ++$.ui.dialog.maxZ));

		//Save and then restore scroll since Opera 9.5+ resets when parent z-Index is changed.
		//  http://ui.jquery.com/bugs/ticket/3193
		var saveScroll = { scrollTop: this.element.attr('scrollTop'), scrollLeft: this.element.attr('scrollLeft') };
		this.uiDialog.css('z-index', ++$.ui.dialog.maxZ);
		this.element.attr(saveScroll);
		this._trigger('focus', event);
	},

	open: function() {
		if (this._isOpen) { return; }

		var options = this.options,
			uiDialog = this.uiDialog;
		this.overlay = options.modal ? new $.ui.dialog.overlay(this) : null;
		(uiDialog.next().length && uiDialog.appendTo('body'));
		this._size();
		this._position(options.position);
		uiDialog.show(options.show);
		this.moveToTop(true);

		// prevent tabbing out of modal dialogs
		(options.modal && uiDialog.bind('keypress.ui-dialog', function(event) {
			if (event.keyCode != $.ui.keyCode.TAB) {
				return;
			}

			var tabbables = $(':tabbable', this),
				first = tabbables.filter(':first')[0],
				last  = tabbables.filter(':last')[0];

			if (event.target == last && !event.shiftKey) {
				setTimeout(function() {
					first.focus();
				}, 1);
			} else if (event.target == first && event.shiftKey) {
				setTimeout(function() {
					last.focus();
				}, 1);
			}
		}));

		// set focus to the first tabbable element in the content area or the first button
		// if there are no tabbable elements, set focus on the dialog itself
		if(options.autoFirst)//自动选中第一个元素
		{
			$([])
				.add(uiDialog.find('.ui-dialog-content :tabbable:first'))
				.add(uiDialog.find('.ui-dialog-buttonpane :tabbable:first'))
				.add(uiDialog)
				.filter(':first')
				.focus();
		}

		this._trigger('open');
		this._isOpen = true;
	},

	_createButtons: function(buttons) {
		var self = this,
			hasButtons = false,
			uiDialogButtonPane = $('<div></div>')
				.addClass(
					'ui-dialog-buttonpane ' +
					'ui-helper-clearfix'
					
				);

		// if we already have a button pane, remove it
		this.uiDialog.find('.ui-dialog-buttonpane').remove();

		(typeof buttons == 'object' && buttons !== null &&
			$.each(buttons, function() { return !(hasButtons = true); }));
		if (hasButtons) {
			$.each(buttons, function(name, fn) {
				$('<button type="button"></button>')
					.addClass(
						'ui-state-default ' +
						'ui-corner-all'
					)
					.text(name)
					.click(function() { fn.apply(self.element[0], arguments); })
					.hover(
						function() {
							$(this).addClass('ui-state-hover');
						},
						function() {
							$(this).removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						$(this).addClass('ui-state-focus');
					})
					.blur(function() {
						$(this).removeClass('ui-state-focus');
					})
					.appendTo(uiDialogButtonPane);
			});
			uiDialogButtonPane.appendTo(this.uiDialog);
		}
	},

	_makeDraggable: function() {
		var self = this,
			options = this.options,
			heightBeforeDrag;

		this.uiDialog.draggable({
			cancel: '.ui-dialog-content',
			handle: '.ui-dialog-titlebar',
			containment: 'document',
			start: function() {
				heightBeforeDrag = options.height;
				$(this).height($(this).height()).addClass("ui-dialog-dragging");
				(options.dragStart && options.dragStart.apply(self.element[0], arguments));
			},
			drag: function() {
				(options.drag && options.drag.apply(self.element[0], arguments));
			},
			stop: function() {
				$(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
				(options.dragStop && options.dragStop.apply(self.element[0], arguments));
				$.ui.dialog.overlay.resize();
			}
		});
	},

	_makeResizable: function(handles) {
		handles = (handles === undefined ? this.options.resizable : handles);
		var self = this,
			options = this.options,
			resizeHandles = typeof handles == 'string'
				? handles
				: 'n,e,s,w,se,sw,ne,nw';

		this.uiDialog.resizable({
			cancel: '.ui-dialog-content',
			alsoResize: this.element,
			maxWidth: options.maxWidth,
			maxHeight: options.maxHeight,
			minWidth: options.minWidth,
			minHeight: options.minHeight,
			start: function() {
				$(this).addClass("ui-dialog-resizing");
				(options.resizeStart && options.resizeStart.apply(self.element[0], arguments));
			},
			resize: function() {
				(options.resize && options.resize.apply(self.element[0], arguments));
			},
			handles: resizeHandles,
			stop: function() {
				$(this).removeClass("ui-dialog-resizing");
				options.height = $(this).height();
				options.width = $(this).width();
				(options.resizeStop && options.resizeStop.apply(self.element[0], arguments));
				$.ui.dialog.overlay.resize();
			}
		})
		.find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
	},

	_position: function(pos) {
		var wnd = $(window), doc = $(document),
			pTop = doc.scrollTop(), pLeft = doc.scrollLeft(),
			minTop = pTop;

		if ($.inArray(pos, ['center','top','right','bottom','left']) >= 0) {
			pos = [
				pos == 'right' || pos == 'left' ? pos : 'center',
				pos == 'top' || pos == 'bottom' ? pos : 'middle'
			];
		}
		if (pos.constructor != Array) {
			pos = ['center', 'middle'];
		}
		if (pos[0].constructor == Number) {
			pLeft += pos[0];
		} else {
			switch (pos[0]) {
				case 'left':
					pLeft += 0;
					break;
				case 'right':
					pLeft += wnd.width() - this.uiDialog.outerWidth();
					break;
				default:
				case 'center':
					pLeft += (wnd.width() - this.uiDialog.outerWidth()) / 2;
			}
		}
		if (pos[1].constructor == Number) {
			pTop += pos[1];
		} else {
			switch (pos[1]) {
				case 'top':
					pTop += 0;
					break;
				case 'bottom':
					pTop += wnd.height() - this.uiDialog.outerHeight();
					break;
				default:
				case 'middle':
					pTop += (wnd.height() - this.uiDialog.outerHeight()) / 2;
			}
		}

		// prevent the dialog from being too high (make sure the titlebar
		// is accessible)
		pTop = Math.max(pTop, minTop);
		this.uiDialog.css({top: pTop, left: pLeft});
	},

	_setData: function(key, value){
		(setDataSwitch[key] && this.uiDialog.data(setDataSwitch[key], value));
		switch (key) {
			case "buttons":
				this._createButtons(value);
				break;
			case "closeText":
				this.uiDialogTitlebarCloseText.text(value);
				break;
			case "dialogClass":
				this.uiDialog
					.removeClass(this.options.dialogClass)
					.addClass(uiDialogClasses + value);
				break;
			case "draggable":
				(value
					? this._makeDraggable()
					: this.uiDialog.draggable('destroy'));
				break;
			case "height":
				this.uiDialog.height(value);
				break;
			case "position":
				this._position(value);
				break;
			case "resizable":
				var uiDialog = this.uiDialog,
					isResizable = this.uiDialog.is(':data(resizable)');

				// currently resizable, becoming non-resizable
				(isResizable && !value && uiDialog.resizable('destroy'));

				// currently resizable, changing handles
				(isResizable && typeof value == 'string' &&
					uiDialog.resizable('option', 'handles', value));

				// currently non-resizable, becoming resizable
				(isResizable || this._makeResizable(value));
				break;
			case "title":
				$(".ui-dialog-title", this.uiDialogTitlebar).html(value || '&nbsp;');
				break;
			case "width":
				this.uiDialog.width(value);
				break;
		}

		$.widget.prototype._setData.apply(this, arguments);
	},

	_size: function() {
		/* If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		 * divs will both have width and height set, so we need to reset them
		 */
		var options = this.options;

		// reset content sizing
		this.element.css({
			height: 0,
			minHeight: 0,
			width: 'auto'
		});

		// reset wrapper sizing
		// determine the height of all the non-content elements
		var nonContentHeight = this.uiDialog.css({
				height: 'auto',
				width: options.width
			})
			.height();

		this.element
			.css({
				minHeight: Math.max(options.minHeight - nonContentHeight, 0),
				height: options.height == 'auto'
					? 'auto'
					: Math.max(options.height - nonContentHeight, 0)
			});
	}
});

$.extend($.ui.dialog, {
	version: "1.7.2",
	defaults: {
		autoOpen: true,
		bgiframe: false,
		buttons: {},
		closeOnEscape: true,
		closeText: 'close',
		dialogClass: '',
		draggable: true,
		hide: null,
		height: 'auto',
		maxHeight: false,
		maxWidth: false,
		minHeight: 150,
		minWidth: 150,
		modal: false,
		position: 'center',
		resizable: true,
		show: null,
		stack: true,
		title: '',
		width: 300,
		zIndex: 1000,
		autoFirst: true
	},

	getter: 'isOpen',

	uuid: 0,
	maxZ: 0,

	getTitleId: function($el) {
		return 'ui-dialog-title-' + ($el.attr('id') || ++this.uuid);
	},

	overlay: function(dialog) {
		this.$el = $.ui.dialog.overlay.create(dialog);
	}
});

$.extend($.ui.dialog.overlay, {
	instances: [],
	maxZ: 0,
	events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
		function(event) { return event + '.dialog-overlay'; }).join(' '),
	create: function(dialog) {
		if (this.instances.length === 0) {
			// prevent use of anchors and inputs
			// we use a setTimeout in case the overlay is created from an
			// event that we're going to be cancelling (see #2804)
			setTimeout(function() {
				// handle $(el).dialog().dialog('close') (see #4065)
				if ($.ui.dialog.overlay.instances.length) {
					$(document).bind($.ui.dialog.overlay.events, function(event) {
						var dialogZ = $(event.target).parents('.ui-dialog').css('zIndex') || 0;
						return (dialogZ > $.ui.dialog.overlay.maxZ);
					});
				}
			}, 1);

			// allow closing by pressing the escape key
			$(document).bind('keydown.dialog-overlay', function(event) {
				(dialog.options.closeOnEscape && event.keyCode
						&& event.keyCode == $.ui.keyCode.ESCAPE && dialog.close(event));
			});

			// handle window resize
			$(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
		}

		var stroverlay="<div></div>";
		if($.browser.msie && parseInt($.browser.version) <= 6){
			stroverlay='<div><div style="position:absolute;z-index:1000;left:0;top:0;">'+  
            '<iframe id="dialogframe" style="width:'+this.width()+';height:'+ this.height()+';filter:alpha(opacity=0);-moz-opacity:0" src="/resources/common/js/mzblank.html"></iframe>'+   
            '</div></div>';
		}
		
		var $el = $(stroverlay).appendTo(document.body)
			.addClass('ui-widget-overlay').css({
				width: this.width(),
				height: this.height()
			});
		
		

		(dialog.options.bgiframe && $.fn.bgiframe && $el.bgiframe());

		this.instances.push($el);
		return $el;
	},

	destroy: function($el) {
		this.instances.splice($.inArray(this.instances, $el), 1);

		if (this.instances.length === 0) {
			$([document, window]).unbind('.dialog-overlay');
		}

		$el.remove();
		
		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		var maxZ = 0;
		$.each(this.instances, function() {
			maxZ = Math.max(maxZ, this.css('z-index'));
		});
		this.maxZ = maxZ;
	},

	height: function() {
		// handle IE 6
		if ($.browser.msie && $.browser.version < 7) {
			var scrollHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight
			);
			var offsetHeight = Math.max(
				document.documentElement.offsetHeight,
				document.body.offsetHeight
			);

			if (scrollHeight < offsetHeight) {
				return $(window).height() + 'px';
			} else {
				return scrollHeight + 'px';
			}
		// handle "good" browsers
		} else {
			return $(document).height() + 'px';
		}
	},

	width: function() {
		// handle IE 6
		if ($.browser.msie && $.browser.version < 7) {
			var scrollWidth = Math.max(
				document.documentElement.scrollWidth,
				document.body.scrollWidth
			);
			var offsetWidth = Math.max(
				document.documentElement.offsetWidth,
				document.body.offsetWidth
			);

			if (scrollWidth < offsetWidth) {
				return $(window).width() + 'px';
			} else {
				return scrollWidth + 'px';
			}
		// handle "good" browsers
		} else {
			return $(document).width() + 'px';
		}
	},

	resize: function() {
		/* If the dialog is draggable and the user drags it past the
		 * right edge of the window, the document becomes wider so we
		 * need to stretch the overlay. If the user then drags the
		 * dialog back to the left, the document will become narrower,
		 * so we need to shrink the overlay to the appropriate size.
		 * This is handled by shrinking the overlay before setting it
		 * to the full document size.
		 */
		var $overlays = $([]);
		$.each($.ui.dialog.overlay.instances, function() {
			$overlays = $overlays.add(this);
		});

		$overlays.css({
			width: 0,
			height: 0
		}).css({
			width: $.ui.dialog.overlay.width(),
			height: $.ui.dialog.overlay.height()
		});
	}
});

$.extend($.ui.dialog.overlay.prototype, {
	destroy: function() {
		$.ui.dialog.overlay.destroy(this.$el);
	}
});

})(jQuery);

/*
 * jQuery UI Tabs 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	ui.core.js
 */
(function($) {

$.widget("ui.tabs", {

	_init: function() {
		if (this.options.deselectable !== undefined) {
			this.options.collapsible = this.options.deselectable;
		}
		this._tabify(true);
	},

	_setData: function(key, value) {
		if (key == 'selected') {
			if (this.options.collapsible && value == this.options.selected) {
				return;
			}
			this.select(value);
		}
		else {
			this.options[key] = value;
			if (key == 'deselectable') {
				this.options.collapsible = value;
			}
			this._tabify();
		}
	},

	_tabId: function(a) {
		return a.title && a.title.replace(/\s/g, '_').replace(/[^A-Za-z0-9\-_:\.]/g, '') ||
			this.options.idPrefix + $.data(a);
	},

	_sanitizeSelector: function(hash) {
		return hash.replace(/:/g, '\\:'); // we need this because an id may contain a ":"
	},

	_cookie: function() {
		var cookie = this.cookie || (this.cookie = this.options.cookie.name || 'ui-tabs-' + $.data(this.list[0]));
		return $.cookie.apply(null, [cookie].concat($.makeArray(arguments)));
	},

	_ui: function(tab, panel) {
		return {
			tab: tab,
			panel: panel,
			index: this.anchors.index(tab)
		};
	},

	_cleanup: function() {
		// restore all former loading tabs labels
		this.lis.filter('.ui-state-processing').removeClass('ui-state-processing')
				.find('span:data(label.tabs)')
				.each(function() {
					var el = $(this);
					el.html(el.data('label.tabs')).removeData('label.tabs');
				});
	},

	_tabify: function(init) {

		this.list = this.element.children('ul:first');
		this.lis = $('li:has(a[href])', this.list);
		this.anchors = this.lis.map(function() { return $('a', this)[0]; });
		this.panels = $([]);

		var self = this, o = this.options;

		var fragmentId = /^#.+/; // Safari 2 reports '#' for an empty hash
		this.anchors.each(function(i, a) {
			var href = $(a).attr('href');

			// For dynamically created HTML that contains a hash as href IE < 8 expands
			// such href to the full page url with hash and then misinterprets tab as ajax.
			// Same consideration applies for an added tab with a fragment identifier
			// since a[href=#fragment-identifier] does unexpectedly not match.
			// Thus normalize href attribute...
			var hrefBase = href.split('#')[0], baseEl;
			if (hrefBase && (hrefBase === location.toString().split('#')[0] ||
					(baseEl = $('base')[0]) && hrefBase === baseEl.href)) {
				href = a.hash;
				a.href = href;
			}

			// inline tab
			if (fragmentId.test(href)) {
				self.panels = self.panels.add(self._sanitizeSelector(href));
			}

			// remote tab
			else if (href != '#') { // prevent loading the page itself if href is just "#"
				$.data(a, 'href.tabs', href); // required for restore on destroy

				// TODO until #3808 is fixed strip fragment identifier from url
				// (IE fails to load from such url)
				$.data(a, 'load.tabs', href.replace(/#.*$/, '')); // mutable data

				var id = self._tabId(a);
				a.href = '#' + id;
				var $panel = $('#' + id);
				if (!$panel.length) {
					$panel = $(o.panelTemplate).attr('id', id).addClass('ui-tabs-panel ui-widget-content ui-corner-bottom')
						.insertAfter(self.panels[i - 1] || self.list);
					$panel.data('destroy.tabs', true);
				}
				self.panels = self.panels.add($panel);
			}

			// invalid tab href
			else {
				o.disabled.push(i);
			}
		});

		// initialization from scratch
		if (init) {

			// attach necessary classes for styling
			//this.element.addClass('ui-tabs ui-widget ui-widget-content ui-corner-all');
			this.element.addClass('ui-tabs');
//			this.list.addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
//			this.lis.addClass('ui-state-default ui-corner-top');
//			this.panels.addClass('ui-tabs-panel ui-widget-content ui-corner-bottom');

			// Selected tab
			// use "selected" option or try to retrieve:
			// 1. from fragment identifier in url
			// 2. from cookie
			// 3. from selected class attribute on <li>
			if (o.selected === undefined) {
				if (location.hash) {
					this.anchors.each(function(i, a) {
						if (a.hash == location.hash) {
							o.selected = i;
							return false; // break
						}
					});
				}
				if (typeof o.selected != 'number' && o.cookie) {
					o.selected = parseInt(self._cookie(), 10);
				}
				if (typeof o.selected != 'number' && this.lis.filter('.ui-tabs-selected').length) {
					o.selected = this.lis.index(this.lis.filter('.ui-tabs-selected'));
				}
				o.selected = o.selected || 0;
			}
			else if (o.selected === null) { // usage of null is deprecated, TODO remove in next release
				o.selected = -1;
			}

			// sanity check - default to first tab...
			o.selected = ((o.selected >= 0 && this.anchors[o.selected]) || o.selected < 0) ? o.selected : 0;

			// Take disabling tabs via class attribute from HTML
			// into account and update option properly.
			// A selected tab cannot become disabled.
			o.disabled = $.unique(o.disabled.concat(
				$.map(this.lis.filter('.ui-state-disabled'),
					function(n, i) { return self.lis.index(n); } )
			)).sort();

			if ($.inArray(o.selected, o.disabled) != -1) {
				o.disabled.splice($.inArray(o.selected, o.disabled), 1);
			}

			// highlight selected tab
			this.panels.addClass('ui-tabs-hide');
			this.lis.removeClass('ui-tabs-selected');
			if (o.selected >= 0 && this.anchors.length) { // check for length avoids error when initializing empty list
				this.panels.eq(o.selected).removeClass('ui-tabs-hide');
				this.lis.eq(o.selected).addClass('ui-tabs-selected');

				// seems to be expected behavior that the show callback is fired
				self.element.queue("tabs", function() {
					self._trigger('show', null, self._ui(self.anchors[o.selected], self.panels[o.selected]));
				});
				
				this.load(o.selected);
			}

			// clean up to avoid memory leaks in certain versions of IE 6
			$(window).bind('unload', function() {
				self.lis.add(self.anchors).unbind('.tabs');
				self.lis = self.anchors = self.panels = null;
			});

		}
		// update selected after add/remove
		else {
			o.selected = this.lis.index(this.lis.filter('.ui-tabs-selected'));
		}

		// update collapsible
		this.element[o.collapsible ? 'addClass' : 'removeClass']('ui-tabs-collapsible');

		// set or update cookie after init and add/remove respectively
		if (o.cookie) {
			this._cookie(o.selected, o.cookie);
		}

		// disable tabs
		for (var i = 0, li; (li = this.lis[i]); i++) {
			$(li)[$.inArray(i, o.disabled) != -1 &&
				!$(li).hasClass('ui-tabs-selected') ? 'addClass' : 'removeClass']('ui-state-disabled');
		}

		// reset cache if switching from cached to not cached
		if (o.cache === false) {
			this.anchors.removeData('cache.tabs');
		}

		// remove all handlers before, tabify may run on existing tabs after add or option change
		this.lis.add(this.anchors).unbind('.tabs');

		if (o.event != 'mouseover') {
			var addState = function(state, el) {
				if (el.is(':not(.ui-state-disabled)')) {
					//el.addClass('ui-state-' + state);
				}
			};
			var removeState = function(state, el) {
				el.removeClass('ui-state-' + state);
			};
			this.lis.bind('mouseover.tabs', function() {
				addState('hover', $(this));
			});
			this.lis.bind('mouseout.tabs', function() {
				removeState('hover', $(this));
			});
			this.anchors.bind('focus.tabs', function() {
				addState('focus', $(this).closest('li'));
			});
			this.anchors.bind('blur.tabs', function() {
				removeState('focus', $(this).closest('li'));
			});
		}

		// set up animations
		var hideFx, showFx;
		if (o.fx) {
			if ($.isArray(o.fx)) {
				hideFx = o.fx[0];
				showFx = o.fx[1];
			}
			else {
				hideFx = showFx = o.fx;
			}
		}

		// Reset certain styles left over from animation
		// and prevent IE's ClearType bug...
		function resetStyle($el, fx) {
			$el.css({ display: '' });
			if ($.browser.msie && fx.opacity) {
				$el[0].style.removeAttribute('filter');
			}
		}

		// Show a tab...
		var showTab = showFx ?
			function(clicked, $show) {
				$(clicked).closest('li').removeClass('ui-state-default').addClass('ui-tabs-selected ui-state-active');
				$show.hide().removeClass('ui-tabs-hide') // avoid flicker that way
					.animate(showFx, showFx.duration || 'normal', function() {
						resetStyle($show, showFx);
						self._trigger('show', null, self._ui(clicked, $show[0]));
					});
			} :
			function(clicked, $show) {
				$(clicked).closest('li').removeClass('ui-state-default').addClass('ui-tabs-selected ui-state-active');
				$show.removeClass('ui-tabs-hide');
				self._trigger('show', null, self._ui(clicked, $show[0]));
			};

		// Hide a tab, $show is optional...
		var hideTab = hideFx ?
			function(clicked, $hide) {
				$hide.animate(hideFx, hideFx.duration || 'normal', function() {
					self.lis.removeClass('ui-tabs-selected ui-state-active').addClass('ui-state-default');
					$hide.addClass('ui-tabs-hide');
					resetStyle($hide, hideFx);
					self.element.dequeue("tabs");
				});
			} :
			function(clicked, $hide, $show) {
				self.lis.removeClass('ui-tabs-selected ui-state-active').addClass('ui-state-default');
				$hide.addClass('ui-tabs-hide');
				self.element.dequeue("tabs");
			};

		// attach tab event handler, unbind to avoid duplicates from former tabifying...
		this.anchors.bind(o.event + '.tabs', function() {
			var el = this, $li = $(this).closest('li'), $hide = self.panels.filter(':not(.ui-tabs-hide)'),
					$show = $(self._sanitizeSelector(this.hash));

			// If tab is already selected and not collapsible or tab disabled or
			// or is already loading or click callback returns false stop here.
			// Check if click handler returns false last so that it is not executed
			// for a disabled or loading tab!
			if (($li.hasClass('ui-tabs-selected') && !o.collapsible) ||
				$li.hasClass('ui-state-disabled') ||
				$li.hasClass('ui-state-processing') ||
				self._trigger('select', null, self._ui(this, $show[0])) === false) {
				this.blur();
				return false;
			}

			o.selected = self.anchors.index(this);

			self.abort();

			// if tab may be closed
			if (o.collapsible) {
				if ($li.hasClass('ui-tabs-selected')) {
					o.selected = -1;

					if (o.cookie) {
						self._cookie(o.selected, o.cookie);
					}

					self.element.queue("tabs", function() {
						hideTab(el, $hide);
					}).dequeue("tabs");
					
					this.blur();
					return false;
				}
				else if (!$hide.length) {
					if (o.cookie) {
						self._cookie(o.selected, o.cookie);
					}
					
					self.element.queue("tabs", function() {
						showTab(el, $show);
					});

					self.load(self.anchors.index(this)); // TODO make passing in node possible, see also http://dev.jqueryui.com/ticket/3171
					
					this.blur();
					return false;
				}
			}

			if (o.cookie) {
				self._cookie(o.selected, o.cookie);
			}

			// show new tab
			if ($show.length) {
				if ($hide.length) {
					self.element.queue("tabs", function() {
						hideTab(el, $hide);
					});
				}
				self.element.queue("tabs", function() {
					showTab(el, $show);
				});
				
				self.load(self.anchors.index(this));
			}
			else {
				throw 'jQuery UI Tabs: Mismatching fragment identifier.';
			}

			// Prevent IE from keeping other link focussed when using the back button
			// and remove dotted border from clicked link. This is controlled via CSS
			// in modern browsers; blur() removes focus from address bar in Firefox
			// which can become a usability and annoying problem with tabs('rotate').
			if ($.browser.msie) {
				this.blur();
			}

		});

		// disable click in any case
		this.anchors.bind('click.tabs', function(){return false;});

	},

	destroy: function() {
		var o = this.options;

		this.abort();
		
		this.element.unbind('.tabs')
			.removeClass('ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible')
			.removeData('tabs');

		this.list.removeClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');

		this.anchors.each(function() {
			var href = $.data(this, 'href.tabs');
			if (href) {
				this.href = href;
			}
			var $this = $(this).unbind('.tabs');
			$.each(['href', 'load', 'cache'], function(i, prefix) {
				$this.removeData(prefix + '.tabs');
			});
		});

		this.lis.unbind('.tabs').add(this.panels).each(function() {
			if ($.data(this, 'destroy.tabs')) {
				$(this).remove();
			}
			else {
				$(this).removeClass([
					'ui-state-default',
					'ui-corner-top',
					'ui-tabs-selected',
					'ui-state-active',
					'ui-state-hover',
					'ui-state-focus',
					'ui-state-disabled',
					'ui-tabs-panel',
					'ui-widget-content',
					'ui-corner-bottom',
					'ui-tabs-hide'
				].join(' '));
			}
		});

		if (o.cookie) {
			this._cookie(null, o.cookie);
		}
	},

	add: function(url, label, index) {
		if (index === undefined) {
			index = this.anchors.length; // append by default
		}

		var self = this, o = this.options,
			$li = $(o.tabTemplate.replace(/#\{href\}/g, url).replace(/#\{label\}/g, label)),
			id = !url.indexOf('#') ? url.replace('#', '') : this._tabId($('a', $li)[0]);

		$li.addClass('ui-state-default ui-corner-top').data('destroy.tabs', true);

		// try to find an existing element before creating a new one
		var $panel = $('#' + id);
		if (!$panel.length) {
			$panel = $(o.panelTemplate).attr('id', id).data('destroy.tabs', true);
		}
		$panel.addClass('ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide');

		if (index >= this.lis.length) {
			$li.appendTo(this.list);
			$panel.appendTo(this.list[0].parentNode);
		}
		else {
			$li.insertBefore(this.lis[index]);
			$panel.insertBefore(this.panels[index]);
		}

		o.disabled = $.map(o.disabled,
			function(n, i) { return n >= index ? ++n : n; });

		this._tabify();

		if (this.anchors.length == 1) { // after tabify
			$li.addClass('ui-tabs-selected ui-state-active');
			$panel.removeClass('ui-tabs-hide');
			this.element.queue("tabs", function() {
				self._trigger('show', null, self._ui(self.anchors[0], self.panels[0]));
			});
				
			this.load(0);
		}

		// callback
		this._trigger('add', null, this._ui(this.anchors[index], this.panels[index]));
	},

	remove: function(index) {
		var o = this.options, $li = this.lis.eq(index).remove(),
			$panel = this.panels.eq(index).remove();

		// If selected tab was removed focus tab to the right or
		// in case the last tab was removed the tab to the left.
		if ($li.hasClass('ui-tabs-selected') && this.anchors.length > 1) {
			this.select(index + (index + 1 < this.anchors.length ? 1 : -1));
		}

		o.disabled = $.map($.grep(o.disabled, function(n, i) { return n != index; }),
			function(n, i) { return n >= index ? --n : n; });

		this._tabify();

		// callback
		this._trigger('remove', null, this._ui($li.find('a')[0], $panel[0]));
	},

	enable: function(index) {
		var o = this.options;
		if ($.inArray(index, o.disabled) == -1) {
			return;
		}

		this.lis.eq(index).removeClass('ui-state-disabled');
		o.disabled = $.grep(o.disabled, function(n, i) { return n != index; });

		// callback
		this._trigger('enable', null, this._ui(this.anchors[index], this.panels[index]));
	},

	disable: function(index) {
		var self = this, o = this.options;
		if (index != o.selected) { // cannot disable already selected tab
			this.lis.eq(index).addClass('ui-state-disabled');

			o.disabled.push(index);
			o.disabled.sort();

			// callback
			this._trigger('disable', null, this._ui(this.anchors[index], this.panels[index]));
		}
	},

	select: function(index) {
		if (typeof index == 'string') {
			index = this.anchors.index(this.anchors.filter('[href$=' + index + ']'));
		}
		else if (index === null) { // usage of null is deprecated, TODO remove in next release
			index = -1;
		}
		if (index == -1 && this.options.collapsible) {
			index = this.options.selected;
		}

		this.anchors.eq(index).trigger(this.options.event + '.tabs');
	},

	load: function(index) {
		var self = this, o = this.options, a = this.anchors.eq(index)[0], url = $.data(a, 'load.tabs');

		this.abort();

		// not remote or from cache
		if (!url || this.element.queue("tabs").length !== 0 && $.data(a, 'cache.tabs')) {
			this.element.dequeue("tabs");
			return;
		}

		// load remote from here on
		this.lis.eq(index).addClass('ui-state-processing');

		if (o.spinner) {
			var span = $('span', a);
			span.data('label.tabs', span.html()).html(o.spinner);
		}

		this.xhr = $.ajax($.extend({}, o.ajaxOptions, {
			url: url,
			success: function(r, s) {
				$(self._sanitizeSelector(a.hash)).html(r);

				// take care of tab labels
				self._cleanup();

				if (o.cache) {
					$.data(a, 'cache.tabs', true); // if loaded once do not load them again
				}

				// callbacks
				self._trigger('load', null, self._ui(self.anchors[index], self.panels[index]));
				try {
					o.ajaxOptions.success(r, s);
				}
				catch (e) {}

				// last, so that load event is fired before show...
				self.element.dequeue("tabs");
			}
		}));
	},

	abort: function() {
		// stop possibly running animations
		this.element.queue([]);
		this.panels.stop(false, true);

		// terminate pending requests from other tabs
		if (this.xhr) {
			this.xhr.abort();
			delete this.xhr;
		}

		// take care of tab labels
		this._cleanup();

	},

	url: function(index, url) {
		this.anchors.eq(index).removeData('cache.tabs').data('load.tabs', url);
	},

	length: function() {
		return this.anchors.length;
	}

});

$.extend($.ui.tabs, {
	version: '1.7.2',
	getter: 'length',
	defaults: {
		ajaxOptions: null,
		cache: false,
		cookie: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
		collapsible: false,
		disabled: [],
		event: 'click',
		fx: null, // e.g. { height: 'toggle', opacity: 'toggle', duration: 200 }
		idPrefix: 'ui-tabs-',
		panelTemplate: '<div></div>',
		spinner: '<em>Loading&#8230;</em>',
		tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>'
	}
});

/*
 * Tabs Extensions
 */

/*
 * Rotate
 */
$.extend($.ui.tabs.prototype, {
	rotation: null,
	rotate: function(ms, continuing) {

		var self = this, o = this.options;
		
		var rotate = self._rotate || (self._rotate = function(e) {
			clearTimeout(self.rotation);
			self.rotation = setTimeout(function() {
				var t = o.selected;
				self.select( ++t < self.anchors.length ? t : 0 );
			}, ms);
			
			if (e) {
				e.stopPropagation();
			}
		});
		
		var stop = self._unrotate || (self._unrotate = !continuing ?
			function(e) {
				if (e.clientX) { // in case of a true click
					self.rotate(null);
				}
			} :
			function(e) {
				t = o.selected;
				rotate();
			});

		// start rotation
		if (ms) {
			this.element.bind('tabsshow', rotate);
			this.anchors.bind(o.event + '.tabs', stop);
			rotate();
		}
		// stop rotation
		else {
			clearTimeout(self.rotation);
			this.element.unbind('tabsshow', rotate);
			this.anchors.unbind(o.event + '.tabs', stop);
			delete this._rotate;
			delete this._unrotate;
		}
	}
});

})(jQuery);
/*
 * jQuery UI Datepicker 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	ui.core.js
 */

(function($) { // hide the namespace

$.extend($.ui, { datepicker: { version: "1.7.2" } });

var PROP_NAME = 'datepicker';

/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this.debug = false; // Change this to true to start debugging
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = 'ui-datepicker-div'; // The ID of the main datepicker division
	this._inlineClass = 'ui-datepicker-inline'; // The name of the inline marker class
	this._appendClass = 'ui-datepicker-append'; // The name of the append marker class
	this._triggerClass = 'ui-datepicker-trigger'; // The name of the trigger marker class
	this._dialogClass = 'ui-datepicker-dialog'; // The name of the dialog marker class
	this._disableClass = 'ui-datepicker-disabled'; // The name of the disabled covering marker class
	this._unselectableClass = 'ui-datepicker-unselectable'; // The name of the unselectable cell marker class
	this._currentClass = 'ui-datepicker-current-day'; // The name of the current day marker class
	this._dayOverClass = 'ui-datepicker-days-cell-over'; // The name of the day hover marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		closeText: 'Done', // Display text for close link
		prevText: 'Prev', // Display text for previous month link
		nextText: 'Next', // Display text for next month link
		currentText: 'Today', // Display text for current month link
		monthNames: ['January','February','March','April','May','June',
			'July','August','September','October','November','December'], // Names of months for drop-down and formatting
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'], // Column headings for days starting at Sunday
		dateFormat: 'mm/dd/yy', // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		isRTL: false // True if right-to-left language, false if left-to-right
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: 'focus', // 'focus' for popup on focus,
			// 'button' for trigger button, or 'both' for either
		showAnim: 'show', // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		appendText: '', // Display text following the input box, e.g. showing the format
		buttonText: '...', // Text for trigger button
		buttonImage: '', // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearRange: '-10:+10', // Range of years to display in drop-down,
			// either relative to current year (-nn:+nn) or absolute (nnnn:nnnn)
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: '+10', // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with '+' for current year + value
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: 'normal', // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '',
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: '', // Selector for an alternate field to store selected dates into
		altFormat: '', // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false, // True to show button panel, false to not show it
		divIndex : 100
	};
	$.extend(this._defaults, this.regional['']);
	this.dpDiv = $('<div  id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>');
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: 'hasDatepicker',

	/* Debug logging (if enabled). */
	log: function () {
		if (this.debug)
			console.log.apply('', arguments);
	},

	/* Override the default settings for all instances of the date picker.
	   @param  settings  object - the new settings to use as defaults (anonymous object)
	   @return the manager object */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span
	   @param  settings  object - the new settings to use for this date picker instance (anonymous) */
	_attachDatepicker: function(target, settings) {
		// check for settings on the control itself - in namespace 'date:'
		var inlineSettings = null;
		for (var attrName in this._defaults) {
			var attrValue = target.getAttribute('date:' + attrName);
			if (attrValue) {
				inlineSettings = inlineSettings || {};
				try {
					inlineSettings[attrName] = eval(attrValue);
				} catch (err) {
					inlineSettings[attrName] = attrValue;
				}
			}
		}
		var nodeName = target.nodeName.toLowerCase();
		var inline = (nodeName == 'div' || nodeName == 'span');
		if (!target.id)
			target.id = 'dp' + (++this.uuid);
		var inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {}, inlineSettings || {});
		if (nodeName == 'input') {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([:\[\]\.])/g, '\\\\$1'); // escape jQuery meta chars
		return {id: id, input: target, // associated target
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
			drawMonth: 0, drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : // presentation div
			$('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName))
			return;
		var appendText = this._get(inst, 'appendText');
		var isRTL = this._get(inst, 'isRTL');
		if (appendText) {
			inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
			input[isRTL ? 'before' : 'after'](inst.append);
		}
		var showOn = this._get(inst, 'showOn');
		if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field
			input.focus(this._showDatepicker);
		if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked
			var buttonText = this._get(inst, 'buttonText');
			var buttonImage = this._get(inst, 'buttonImage');
			inst.trigger = $(this._get(inst, 'buttonImageOnly') ?
				$('<img/>').addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$('<button type="button"></button>').addClass(this._triggerClass).
					html(buttonImage == '' ? buttonText : $('<img/>').attr(
					{ src:buttonImage, alt:buttonText, title:buttonText })));
			input[isRTL ? 'before' : 'after'](inst.trigger);
			inst.trigger.click(function() {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput == target)
					$.datepicker._hideDatepicker();
				else
					$.datepicker._showDatepicker(target);
				return false;
			});
		}
		input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).
			bind("setData.datepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key) {
				return this._get(inst, key);
			});
		$.data(target, PROP_NAME, inst);
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName))
			return;
		divSpan.addClass(this.markerClassName).append(inst.dpDiv).
			bind("setData.datepicker", function(event, key, value){
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key){
				return this._get(inst, key);
			});
		$.data(target, PROP_NAME, inst);
		this._setDate(inst, this._getDefaultDate(inst));
		this._updateDatepicker(inst);
		this._updateAlternate(inst);
	},

	/* Pop-up the date picker in a "dialog" box.
	   @param  input     element - ignored
	   @param  dateText  string - the initial date to display (in the current format)
	   @param  onSelect  function - the function(dateText) to call when a date is selected
	   @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	   @param  pos       int[2] - coordinates for the dialog's position within the screen or
	                     event - with x/y coordinates or
	                     leave empty for default (screen centre)
	   @return the manager object */
	_dialogDatepicker: function(input, dateText, onSelect, settings, pos) {
		var inst = this._dialogInst; // internal instance
		if (!inst) {
			var id = 'dp' + (++this.uuid);
			this._dialogInput = $('<input type="text" id="' + id +
				'" size="1" style="position: absolute; top: -100px;"/>');
			this._dialogInput.keydown(this._doKeyDown);
			$('body').append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], PROP_NAME, inst);
		}
		extendRemove(inst.settings, settings || {});
		this._dialogInput.val(dateText);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			var browserWidth = window.innerWidth || document.documentElement.clientWidth ||	document.body.clientWidth;
			var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		// move input on screen for focus, but hidden behind dialog
		this._dialogInput.css('left', this._pos[0] + 'px').css('top', this._pos[1] + 'px');
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI)
			$.blockUI(this.dpDiv);
		$.data(this._dialogInput[0], PROP_NAME, inst);
		return this;
	},

	/* Detach a datepicker from its control.
	   @param  target    element - the target input field or division or span */
	_destroyDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		$.removeData(target, PROP_NAME);
		if (nodeName == 'input') {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).
				unbind('focus', this._showDatepicker).
				unbind('keydown', this._doKeyDown).
				unbind('keypress', this._doKeyPress);
		} else if (nodeName == 'div' || nodeName == 'span')
			$target.removeClass(this.markerClassName).empty();
	},

	/* Enable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_enableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = false;
			inst.trigger.filter('button').
				each(function() { this.disabled = false; }).end().
				filter('img').css({opacity: '1.0', cursor: ''});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().removeClass('ui-state-disabled');
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_disableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = true;
			inst.trigger.filter('button').
				each(function() { this.disabled = true; }).end().
				filter('img').css({opacity: '0.5', cursor: 'default'});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().addClass('ui-state-disabled');
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	   @param  target    element - the target input field or division or span
	   @return boolean - true if disabled, false if enabled */
	_isDisabledDatepicker: function(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] == target)
				return true;
		}
		return false;
	},

	/* Retrieve the instance data for the target control.
	   @param  target  element - the target input field or division or span
	   @return  object - the associated instance data
	   @throws  error if a jQuery problem getting data */
	_getInst: function(target) {
		try {
			return $.data(target, PROP_NAME);
		}
		catch (err) {
			throw 'Missing instance data for this datepicker';
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span
	   @param  name    object - the new settings to update or
	                   string - the name of the setting to change or retrieve,
	                   when retrieving also 'all' for all instance settings or
	                   'defaults' for all global defaults
	   @param  value   any - the new value for the setting
	                   (omit if above is an object or to retrieve a value) */
	_optionDatepicker: function(target, name, value) {
		var inst = this._getInst(target);
		if (arguments.length == 2 && typeof name == 'string') {
			return (name == 'defaults' ? $.extend({}, $.datepicker._defaults) :
				(inst ? (name == 'all' ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
		}
		var settings = name || {};
		if (typeof name == 'string') {
			settings = {};
			settings[name] = value;
		}
		if (inst) {
			if (this._curInst == inst) {
				this._hideDatepicker(null);
			}
			var date = this._getDateDatepicker(target);
			extendRemove(inst.settings, settings);
			this._setDateDatepicker(target, date);
			this._updateDatepicker(inst);
		}
	},

	// change method deprecated
	_changeDatepicker: function(target, name, value) {
		this._optionDatepicker(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span */
	_refreshDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	   @param  target   element - the target input field or division or span
	   @param  date     Date - the new date
	   @param  endDate  Date - the new end date for a range (optional) */
	_setDateDatepicker: function(target, date, endDate) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date, endDate);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	   @param  target  element - the target input field or division or span
	   @return Date - the current date or
	           Date[2] - the current dates for a range */
	_getDateDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst && !inst.inline)
			this._setDateFromField(inst);
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes. */
	_doKeyDown: function(event) {
		var inst = $.datepicker._getInst(event.target);
		var handled = true;
		var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing)
			switch (event.keyCode) {
				case 9:  $.datepicker._hideDatepicker(null, '');
						break; // hide on tab out
				case 13: var sel = $('td.' + $.datepicker._dayOverClass +
							', td.' + $.datepicker._currentClass, inst.dpDiv);
						if (sel[0])
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
						else
							$.datepicker._hideDatepicker(null, $.datepicker._get(inst, 'duration'));
						return false; // don't submit the form
						break; // select the value on enter
				case 27: $.datepicker._hideDatepicker(null, $.datepicker._get(inst, 'duration'));
						break; // hide on escape
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.datepicker._get(inst, 'stepBigMonths') :
							-$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.datepicker._get(inst, 'stepBigMonths') :
							+$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey) $.datepicker._clearDate(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
				case 36: if (event.ctrlKey || event.metaKey) $.datepicker._gotoToday(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
				case 37: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									-$.datepicker._get(inst, 'stepBigMonths') :
									-$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +left on Mac
						break;
				case 38: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, -7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
				case 39: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									+$.datepicker._get(inst, 'stepBigMonths') :
									+$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +right
						break;
				case 40: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, +7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
				default: handled = false;
			}
		else if (event.keyCode == 36 && event.ctrlKey) // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		else {
			handled = false;
		}
		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function(event) {
		var inst = $.datepicker._getInst(event.target);
		if ($.datepicker._get(inst, 'constrainInput')) {
			var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
			var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
			return event.ctrlKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
		}
	},

	/* Pop-up the date picker for a given input field.
	   @param  input  element - the input field attached to the date picker or
	                  event - if triggered by focus */
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() != 'input') // find from button/image trigger
			input = $('input', input.parentNode)[0];
		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) // already here
			return;
		var inst = $.datepicker._getInst(input);
		var beforeShow = $.datepicker._get(inst, 'beforeShow');
		extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
		$.datepicker._hideDatepicker(null, '');
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);
		if ($.datepicker._inDialog) // hide cursor
			input.value = '';
		if (!$.datepicker._pos) { // position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}
		var isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css('position') == 'fixed';
			return !isFixed;
		});
		if (isFixed && $.browser.opera) { // correction for Opera when fixed and scrolled
			$.datepicker._pos[0] -= document.documentElement.scrollLeft;
			$.datepicker._pos[1] -= document.documentElement.scrollTop;
		}
		var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;
		inst.rangeStart = null;
		// determine sizing offscreen
		inst.dpDiv.css({position: 'absolute', display: 'block', top: '-1000px','z-index':this.divIndex});
		$.datepicker._updateDatepicker(inst);
		// fix width for dynamic number of date pickers
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
			left: offset.left + 'px', top: offset.top + 'px'});
		inst.dpDiv.css('z-index',2000);
		if (!inst.inline) {
			var showAnim = $.datepicker._get(inst, 'showAnim') || 'show';
			var duration = $.datepicker._get(inst, 'duration');
			var postProcess = function() {
				$.datepicker._datepickerShowing = true;
				if ($.browser.msie && parseInt($.browser.version,10) < 7) // fix IE < 7 select problems
					$('iframe.ui-datepicker-cover').css({width: inst.dpDiv.width() + 4,
						height: inst.dpDiv.height() + 4});
			};
			if ($.effects && $.effects[showAnim])
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[showAnim](duration, postProcess);
			if (duration == '')
				postProcess();
			if (inst.input[0].type != 'hidden')
				inst.input[0].focus();
			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		var dims = {width: inst.dpDiv.width() + 4,
			height: inst.dpDiv.height() + 4};
		var self = this;
		inst.dpDiv.empty().append(this._generateHTML(inst))
			.find('iframe.ui-datepicker-cover').
				css({width: dims.width, height: dims.height})
			.end()
			
			
			.find('.' + this._dayOverClass + ' a')
				.trigger('mouseover')
			.end();
		var numMonths = this._getNumberOfMonths(inst);
		var cols = numMonths[1];
		var width = 17;
		if (cols > 1) {
			inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
		} else {
			inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
		}
		inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
			'Class']('ui-datepicker-multi');
		inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
			'Class']('ui-datepicker-rtl');
		if (inst.input && inst.input[0].type != 'hidden' && inst == $.datepicker._curInst)
			$(inst.input[0]).focus();
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth();
		var dpHeight = inst.dpDiv.outerHeight();
		var inputWidth = inst.input ? inst.input.outerWidth() : 0;
		var inputHeight = inst.input ? inst.input.outerHeight() : 0;
		var viewWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + $(document).scrollLeft();
		var viewHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + $(document).scrollTop();

		offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
		offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
		offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

		// now check if datepicker is showing outside window viewport - move to a better place if so.
		offset.left -= (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0;
		offset.top -= (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(offset.top + dpHeight + inputHeight*2 - viewHeight) : 0;

		return offset;
	},

	/* Find an object's position on the screen. */
	_findPos: function(obj) {
        while (obj && (obj.type == 'hidden' || obj.nodeType != 1)) {
            obj = obj.nextSibling;
        }
        var position = $(obj).offset();
	    return [position.left, position.top];
	},

	/* Hide the date picker from view.
	   @param  input  element - the input field attached to the date picker
	   @param  duration  string - the duration over which to close the date picker */
	_hideDatepicker: function(input, duration) {
		var inst = this._curInst;
		if (!inst || (input && inst != $.data(input, PROP_NAME)))
			return;
		if (inst.stayOpen)
			this._selectDate('#' + inst.id, this._formatDate(inst,
				inst.currentDay, inst.currentMonth, inst.currentYear));
		inst.stayOpen = false;
		if (this._datepickerShowing) {
			duration = (duration != null ? duration : this._get(inst, 'duration'));
			var showAnim = this._get(inst, 'showAnim');
			var postProcess = function() {
				$.datepicker._tidyDialog(inst);
			};
			if (duration != '' && $.effects && $.effects[showAnim])
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'),
					duration, postProcess);
			else
				inst.dpDiv[(duration == '' ? 'hide' : (showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide')))](duration, postProcess);
			if (duration == '')
				this._tidyDialog(inst);
			var onClose = this._get(inst, 'onClose');
			if (onClose)
				onClose.apply((inst.input ? inst.input[0] : null),
					[(inst.input ? inst.input.val() : ''), inst]);  // trigger custom callback
			this._datepickerShowing = false;
			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
				if ($.blockUI) {
					$.unblockUI();
					$('body').append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
		this._curInst = null;
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst)
			return;
		var $target = $(event.target);
		if (($target.parents('#' + $.datepicker._mainDivId).length == 0) &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.hasClass($.datepicker._triggerClass) &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI))
			$.datepicker._hideDatepicker(null, '');
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function(id, offset, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._isDisabledDatepicker(target[0])) {
			return;
		}
		this._adjustInstDate(inst, offset +
			(period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
			period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		}
		else {
		var date = new Date();
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function(id, select, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		inst._selectingMonthYear = false;
		inst['selected' + (period == 'M' ? 'Month' : 'Year')] =
		inst['draw' + (period == 'M' ? 'Month' : 'Year')] =
			parseInt(select.options[select.selectedIndex].value,10);
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Restore input focus after not changing month/year. */
	_clickMonthYear: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (inst.input && inst._selectingMonthYear && !$.browser.msie)
			inst.input[0].focus();
		inst._selectingMonthYear = !inst._selectingMonthYear;
	},

	/* Action for selecting a day. */
	_selectDay: function(id, month, year, td) {
		var target = $(id);
		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
			return;
		}
		var inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $('a', td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		if (inst.stayOpen) {
			inst.endDay = inst.endMonth = inst.endYear = null;
		}
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
		if (inst.stayOpen) {
			inst.rangeStart = this._daylightSavingAdjust(
				new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
			this._updateDatepicker(inst);
		}
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		inst.stayOpen = false;
		inst.endDay = inst.endMonth = inst.endYear = inst.rangeStart = null;
		this._selectDate(target, '');
	},

	/* Update the input field with the selected date. */
	_selectDate: function(id, dateStr) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (inst.input)
			inst.input.val(dateStr);
		this._updateAlternate(inst);
		var onSelect = this._get(inst, 'onSelect');
		if (onSelect)
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
		else if (inst.input)
			inst.input.trigger('change'); // fire the change event
		if (inst.inline)
			this._updateDatepicker(inst);
		else if (!inst.stayOpen) {
			this._hideDatepicker(null, this._get(inst, 'duration'));
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) != 'object')
				inst.input[0].focus(); // restore focus
			this._lastInput = null;
		}
	},

	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function(inst) {
		var altField = this._get(inst, 'altField');
		if (altField) { // update alternate field too
			var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
			var date = this._getDate(inst);
			dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	   @param  date  Date - the date to customise
	   @return [boolean, string] - is this date selectable?, what is its CSS class? */
	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ''];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	   @param  date  Date - the date to get the week for
	   @return  number - the number of the week within the year that contains this date */
	iso8601Week: function(date) {
		var checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		var firstMon = new Date(checkDate.getFullYear(), 1 - 1, 4); // First week always contains 4 Jan
		var firstDay = firstMon.getDay() || 7; // Day of week: Mon = 1, ..., Sun = 7
		firstMon.setDate(firstMon.getDate() + 1 - firstDay); // Preceding Monday
		if (firstDay < 4 && checkDate < firstMon) { // Adjust first three days in year if necessary
			checkDate.setDate(checkDate.getDate() - 3); // Generate for previous year
			return $.datepicker.iso8601Week(checkDate);
		} else if (checkDate > new Date(checkDate.getFullYear(), 12 - 1, 28)) { // Check last three days in year
			firstDay = new Date(checkDate.getFullYear() + 1, 1 - 1, 4).getDay() || 7;
			if (firstDay > 4 && (checkDate.getDay() || 7) < firstDay - 3) { // Adjust if necessary
				return 1;
			}
		}
		return Math.floor(((checkDate - firstMon) / 86400000) / 7) + 1; // Weeks to given date
	},

	/* Parse a string value into a date object.
	   See formatDate below for the possible formats.

	   @param  format    string - the expected format of the date
	   @param  value     string - the date in the above format
	   @param  settings  Object - attributes include:
	                     shortYearCutoff  number - the cutoff year for determining the century (optional)
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  Date - the extracted date value or null if value is blank */
	parseDate: function (format, value, settings) {
		if (format == null || value == null)
			throw 'Invalid arguments';
		value = (typeof value == 'object' ? value.toString() : value + '');
		if (value == '')
			return null;
		var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		var year = -1;
		var month = -1;
		var day = -1;
		var doy = -1;
		var literal = false;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Extract a number from the string value
		var getNumber = function(match) {
			lookAhead(match);
			var origSize = (match == '@' ? 14 : (match == 'y' ? 4 : (match == 'o' ? 3 : 2)));
			var size = origSize;
			var num = 0;
			while (size > 0 && iValue < value.length &&
					value.charAt(iValue) >= '0' && value.charAt(iValue) <= '9') {
				num = num * 10 + parseInt(value.charAt(iValue++),10);
				size--;
			}
			if (size == origSize)
				throw 'Missing number at position ' + iValue;
			return num;
		};
		// Extract a name from the string value and convert to an index
		var getName = function(match, shortNames, longNames) {
			var names = (lookAhead(match) ? longNames : shortNames);
			var size = 0;
			for (var j = 0; j < names.length; j++)
				size = Math.max(size, names[j].length);
			var name = '';
			var iInit = iValue;
			while (size > 0 && iValue < value.length) {
				name += value.charAt(iValue++);
				for (var i = 0; i < names.length; i++)
					if (name == names[i])
						return i + 1;
				size--;
			}
			throw 'Unknown name at position ' + iInit;
		};
		// Confirm that a literal character matches the string value
		var checkLiteral = function() {
			if (value.charAt(iValue) != format.charAt(iFormat))
				throw 'Unexpected literal at position ' + iValue;
			iValue++;
		};
		var iValue = 0;
		for (var iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					checkLiteral();
			else
				switch (format.charAt(iFormat)) {
					case 'd':
						day = getNumber('d');
						break;
					case 'D':
						getName('D', dayNamesShort, dayNames);
						break;
					case 'o':
						doy = getNumber('o');
						break;
					case 'm':
						month = getNumber('m');
						break;
					case 'M':
						month = getName('M', monthNamesShort, monthNames);
						break;
					case 'y':
						year = getNumber('y');
						break;
					case '@':
						var date = new Date(getNumber('@'));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'"))
							checkLiteral();
						else
							literal = true;
						break;
					default:
						checkLiteral();
				}
		}
		if (year == -1)
			year = new Date().getFullYear();
		else if (year < 100)
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				var dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim)
					break;
				month++;
				day -= dim;
			} while (true);
		}
		var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
			throw 'Invalid date'; // E.g. 31/02/*
		return date;
	},

	/* Standard date formats. */
	ATOM: 'yy-mm-dd', // RFC 3339 (ISO 8601)
	COOKIE: 'D, dd M yy',
	ISO_8601: 'yy-mm-dd',
	RFC_822: 'D, d M y',
	RFC_850: 'DD, dd-M-y',
	RFC_1036: 'D, d M y',
	RFC_1123: 'D, d M yy',
	RFC_2822: 'D, d M yy',
	RSS: 'D, d M y', // RFC 822
	TIMESTAMP: '@',
	W3C: 'yy-mm-dd', // ISO 8601

	/* Format a date object into a string value.
	   The format can be combinations of the following:
	   d  - day of month (no leading zero)
	   dd - day of month (two digit)
	   o  - day of year (no leading zeros)
	   oo - day of year (three digit)
	   D  - day name short
	   DD - day name long
	   m  - month of year (no leading zero)
	   mm - month of year (two digit)
	   M  - month name short
	   MM - month name long
	   y  - year (two digit)
	   yy - year (four digit)
	   @ - Unix timestamp (ms since 01/01/1970)
	   '...' - literal text
	   '' - single quote

	   @param  format    string - the desired format of the date
	   @param  date      Date - the date value to format
	   @param  settings  Object - attributes include:
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  string - the date in the above format */
	formatDate: function (format, date, settings) {
		if (!date)
			return '';
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Format a number, with leading zero if necessary
		var formatNumber = function(match, value, len) {
			var num = '' + value;
			if (lookAhead(match))
				while (num.length < len)
					num = '0' + num;
			return num;
		};
		// Format a name, short or long as requested
		var formatName = function(match, value, shortNames, longNames) {
			return (lookAhead(match) ? longNames[value] : shortNames[value]);
		};
		var output = '';
		var literal = false;
		if (date)
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal)
					if (format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						output += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							output += formatNumber('d', date.getDate(), 2);
							break;
						case 'D':
							output += formatName('D', date.getDay(), dayNamesShort, dayNames);
							break;
						case 'o':
							var doy = date.getDate();
							for (var m = date.getMonth() - 1; m >= 0; m--)
								doy += this._getDaysInMonth(date.getFullYear(), m);
							output += formatNumber('o', doy, 3);
							break;
						case 'm':
							output += formatNumber('m', date.getMonth() + 1, 2);
							break;
						case 'M':
							output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
							break;
						case 'y':
							output += (lookAhead('y') ? date.getFullYear() :
								(date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
							break;
						case '@':
							output += date.getTime();
							break;
						case "'":
							if (lookAhead("'"))
								output += "'";
							else
								literal = true;
							break;
						default:
							output += format.charAt(iFormat);
					}
			}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function (format) {
		var chars = '';
		var literal = false;
		for (var iFormat = 0; iFormat < format.length; iFormat++)
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					chars += format.charAt(iFormat);
			else
				switch (format.charAt(iFormat)) {
					case 'd': case 'm': case 'y': case '@':
						chars += '0123456789';
						break;
					case 'D': case 'M':
						return null; // Accept anything
					case "'":
						if (lookAhead("'"))
							chars += "'";
						else
							literal = true;
						break;
					default:
						chars += format.charAt(iFormat);
				}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function(inst) {
		var dateFormat = this._get(inst, 'dateFormat');
		var dates = inst.input ? inst.input.val() : null;
		inst.endDay = inst.endMonth = inst.endYear = null;
		var date = defaultDate = this._getDefaultDate(inst);
		var settings = this._getFormatConfig(inst);
		try {
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;
		} catch (event) {
			this.log(event);
			date = defaultDate;
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = (dates ? date.getDate() : 0);
		inst.currentMonth = (dates ? date.getMonth() : 0);
		inst.currentYear = (dates ? date.getFullYear() : 0);
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function(inst) {
		var date = this._determineDate(this._get(inst, 'defaultDate'), new Date());
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		date = (minDate && date < minDate ? minDate : date);
		date = (maxDate && date > maxDate ? maxDate : date);
		return date;
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function(date, defaultDate) {
		var offsetNumeric = function(offset) {
			var date = new Date();
			date.setDate(date.getDate() + offset);
			return date;
		};
		var offsetString = function(offset, getDaysInMonth) {
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
			var matches = pattern.exec(offset);
			while (matches) {
				switch (matches[2] || 'd') {
					case 'd' : case 'D' :
						day += parseInt(matches[1],10); break;
					case 'w' : case 'W' :
						day += parseInt(matches[1],10) * 7; break;
					case 'm' : case 'M' :
						month += parseInt(matches[1],10);
						day = Math.min(day, getDaysInMonth(year, month));
						break;
					case 'y': case 'Y' :
						year += parseInt(matches[1],10);
						day = Math.min(day, getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			return new Date(year, month, day);
		};
		date = (date == null ? defaultDate :
			(typeof date == 'string' ? offsetString(date, this._getDaysInMonth) :
			(typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : date)));
		date = (date && date.toString() == 'Invalid Date' ? defaultDate : date);
		if (date) {
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(date);
	},

	/* Handle switch to/from daylight saving.
	   Hours may be non-zero on daylight saving cut-over:
	   > 12 when midnight changeover, but then cannot generate
	   midnight datetime, so jump to 1AM, otherwise reset.
	   @param  date  (Date) the date to check
	   @return  (Date) the corrected date */
	_daylightSavingAdjust: function(date) {
		if (!date) return null;
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly. */
	_setDate: function(inst, date, endDate) {
		var clear = !(date);
		var origMonth = inst.selectedMonth;
		var origYear = inst.selectedYear;
		date = this._determineDate(date, new Date());
		inst.selectedDay = inst.currentDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
		if (origMonth != inst.selectedMonth || origYear != inst.selectedYear)
			this._notifyChange(inst);
		this._adjustInstDate(inst);
		if (inst.input) {
			inst.input.val(clear ? '' : this._formatDate(inst));
		}
	},

	/* Retrieve the date(s) directly. */
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null :
			this._daylightSavingAdjust(new Date(
			inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateHTML: function(inst) {
		var today = new Date();
		today = this._daylightSavingAdjust(
			new Date(today.getFullYear(), today.getMonth(), today.getDate())); // clear time
		var isRTL = this._get(inst, 'isRTL');
		var showButtonPanel = this._get(inst, 'showButtonPanel');
		var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
		var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
		var numMonths = this._getNumberOfMonths(inst);
		var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
		var stepMonths = this._get(inst, 'stepMonths');
		var stepBigMonths = this._get(inst, 'stepBigMonths');
		var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
		var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		var drawMonth = inst.drawMonth - showCurrentAtPos;
		var drawYear = inst.drawYear;
		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - numMonths[1] + 1, maxDate.getDate()));
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;
		var prevText = this._get(inst, 'prevText');
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));
		var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' + inst.id + '\', -' + stepMonths + ', \'M\');"' +
			' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+ prevText +'"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
		var nextText = this._get(inst, 'nextText');
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));
		var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' + inst.id + '\', +' + stepMonths + ', \'M\');"' +
			' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+ nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
		var currentText = this._get(inst, 'currentText');
		var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
		currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
		var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery.datepicker._hideDatepicker();">' + this._get(inst, 'closeText') + '</button>' : '');
		var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : '') +
			(this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery.datepicker._gotoToday(\'#' + inst.id + '\');"' +
			'>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
		var firstDay = parseInt(this._get(inst, 'firstDay'),10);
		firstDay = (isNaN(firstDay) ? 0 : firstDay);
		var dayNames = this._get(inst, 'dayNames');
		var dayNamesShort = this._get(inst, 'dayNamesShort');
		var dayNamesMin = this._get(inst, 'dayNamesMin');
		var monthNames = this._get(inst, 'monthNames');
		var monthNamesShort = this._get(inst, 'monthNamesShort');
		var beforeShowDay = this._get(inst, 'beforeShowDay');
		var showOtherMonths = this._get(inst, 'showOtherMonths');
		var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
		var endDate = inst.endDay ? this._daylightSavingAdjust(
			new Date(inst.endYear, inst.endMonth, inst.endDay)) : currentDate;
		var defaultDate = this._getDefaultDate(inst);
		var html = '';
		for (var row = 0; row < numMonths[0]; row++) {
			var group = '';
			for (var col = 0; col < numMonths[1]; col++) {
				var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
				var cornerClass = ' ui-corner-all';
				var calender = '';
				if (isMultiMonth) {
					calender += '<div class="ui-datepicker-group ui-datepicker-group-';
					switch (col) {
						case 0: calender += 'first'; cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left'); break;
						case numMonths[1]-1: calender += 'last'; cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right'); break;
						default: calender += 'middle'; cornerClass = ''; break;
					}
					calender += '">';
				}
				calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' +
					(/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') +
					(/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					selectedDate, row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					'</div><table class="ui-datepicker-calendar"><thead>' +
					'<tr>';
				var thead = '';
				for (var dow = 0; dow < 7; dow++) { // days of the week
					var day = (dow + firstDay) % 7;
					thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' +
						'<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
				}
				calender += thead + '</tr></thead><tbody>';
				var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7)); // calculate the number of rows to generate
				var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					calender += '<tr>';
					var tbody = '';
					for (var dow = 0; dow < 7; dow++) { // create date picker days
						var daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
						var otherMonth = (printDate.getMonth() != drawMonth);
						var unselectable = otherMonth || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						tbody += '<td class="' +
							((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + // highlight weekends
							(otherMonth ? ' ui-datepicker-other-month' : '') + // highlight days from other months
							((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							' ' + this._dayOverClass : '') + // highlight selected day
							(unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled': '') +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
							(printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? // in current range
							' ' + this._currentClass : '') + // highlight selected day
							(printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
							(unselectable ? '' : ' onclick="DP_jQuery.datepicker._selectDay(\'#' +
							inst.id + '\',' + drawMonth + ',' + drawYear + ', this);return false;"') + '>' + // actions
							(otherMonth ? (showOtherMonths ? printDate.getDate() : '&#xa0;') : // display for other months
							(unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' +
							(printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') +
							(printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? // in current range
							' ui-state-active' : '') + // highlight selected day
							'" href="#">' + printDate.getDate() + '</a>')) + '</td>'; // display for this month
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					calender += tbody + '</tr>';
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				calender += '</tbody></table>' + (isMultiMonth ? '</div>' + 
							((numMonths[0] > 0 && col == numMonths[1]-1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
				group += calender;
			}
			html += group;
		}
		html += buttonPanel + ($.browser.msie && parseInt($.browser.version,10) < 7 && !inst.inline ?
			'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
		inst._keyEvent = false;
		return html;
	},

	/* Generate the month and year header. */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			selectedDate, secondary, monthNames, monthNamesShort) {
		minDate = (inst.rangeStart && minDate && selectedDate < minDate ? selectedDate : minDate);
		var changeMonth = this._get(inst, 'changeMonth');
		var changeYear = this._get(inst, 'changeYear');
		var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
		var html = '<div class="ui-datepicker-title">';
		var monthHtml = '';
		// month selection
		if (secondary || !changeMonth)
			monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span> ';
		else {
			var inMinYear = (minDate && minDate.getFullYear() == drawYear);
			var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
			monthHtml += '<select class="ui-datepicker-month" ' +
				'onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'M\');" ' +
				'onclick="DP_jQuery.datepicker._clickMonthYear(\'#' + inst.id + '\');"' +
			 	'>';
			for (var month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) &&
						(!inMaxYear || month <= maxDate.getMonth()))
					monthHtml += '<option value="' + month + '"' +
						(month == drawMonth ? ' selected="selected"' : '') +
						'>' + monthNamesShort[month] + '</option>';
			}
			monthHtml += '</select>';
		}
		if (!showMonthAfterYear)
			html += monthHtml + ((secondary || changeMonth || changeYear) && (!(changeMonth && changeYear)) ? '&#xa0;' : '');
		// year selection
		if (secondary || !changeYear)
			html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
		else {
			// determine range of years to display
			var years = this._get(inst, 'yearRange').split(':');
			var year = 0;
			var endYear = 0;
			if (years.length != 2) {
				year = drawYear - 10;
				endYear = drawYear + 10;
			} else if (years[0].charAt(0) == '+' || years[0].charAt(0) == '-') {
				year = drawYear + parseInt(years[0], 10);
				endYear = drawYear + parseInt(years[1], 10);
			} else {
				year = parseInt(years[0], 10);
				endYear = parseInt(years[1], 10);
			}
			year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
			endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
			html += '<select class="ui-datepicker-year" ' +
				'onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'Y\');" ' +
				'onclick="DP_jQuery.datepicker._clickMonthYear(\'#' + inst.id + '\');"' +
				'>';
			for (; year <= endYear; year++) {
				html += '<option value="' + year + '"' +
					(year == drawYear ? ' selected="selected"' : '') +
					'>' + year + '</option>';
			}
			html += '</select>';
		}
		if (showMonthAfterYear)
			html += (secondary || changeMonth || changeYear ? '&#xa0;' : '') + monthHtml;
		html += '</div>'; // Close datepicker_header
		return html;
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period == 'Y' ? offset : 0);
		var month = inst.drawMonth + (period == 'M' ? offset : 0);
		var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
			(period == 'D' ? offset : 0);
		var date = this._daylightSavingAdjust(new Date(year, month, day));
		// ensure it is within the bounds set
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		date = (minDate && date < minDate ? minDate : date);
		date = (maxDate && date > maxDate ? maxDate : date);
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period == 'M' || period == 'Y')
			this._notifyChange(inst);
	},

	/* Notify change of month/year. */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, 'onChangeMonthYear');
		if (onChange)
			onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
	},

	/* Determine the number of months to show. */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, 'numberOfMonths');
		return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
	},

	/* Determine the current maximum date - ensure no time components are set - may be overridden for a range. */
	_getMinMaxDate: function(inst, minMax, checkRange) {
		var date = this._determineDate(this._get(inst, minMax + 'Date'), null);
		return (!checkRange || !inst.rangeStart ? date :
			(!date || inst.rangeStart > date ? inst.rangeStart : date));
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function(year, month) {
		return 32 - new Date(year, month, 32).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst);
		var date = this._daylightSavingAdjust(new Date(
			curYear, curMonth + (offset < 0 ? offset : numMonths[1]), 1));
		if (offset < 0)
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function(inst, date) {
		// during range selection, use minimum of selected date and range start
		var newMinDate = (!inst.rangeStart ? null : this._daylightSavingAdjust(
			new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)));
		newMinDate = (newMinDate && inst.rangeStart < newMinDate ? inst.rangeStart : newMinDate);
		var minDate = newMinDate || this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		return ((!minDate || date >= minDate) && (!maxDate || date <= maxDate));
	},

	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, 'shortYearCutoff');
		shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, 'dayNamesShort'), dayNames: this._get(inst, 'dayNames'),
			monthNamesShort: this._get(inst, 'monthNamesShort'), monthNames: this._get(inst, 'monthNames')};
	},

	/* Format the given date for display. */
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day == 'object' ? day :
			this._daylightSavingAdjust(new Date(year, month, day))) :
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
	}
});

/* jQuery extend now ignores nulls! */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props)
		if (props[name] == null || props[name] == undefined)
			target[name] = props[name];
	return target;
};

/* Determine whether an object is an array. */
function isArray(a) {
	return (a && (($.browser.safari && typeof a == 'object' && a.length) ||
		(a.constructor && a.constructor.toString().match(/\Array\(\)/))));
};

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
                    Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){

	/* Initialise the date picker. */
	if (!$.datepicker.initialized) {
		$(document).mousedown($.datepicker._checkExternalClick).
			find('body').append($.datepicker.dpDiv);
		$.datepicker.initialized = true;
	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate'))
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	return this.each(function() {
		typeof options == 'string' ?
			$.datepicker['_' + options + 'Datepicker'].
				apply($.datepicker, [this].concat(otherArgs)) :
			$.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "1.7.2";

// Workaround for #4055
// Add another global to avoid noConflict issues with inline event handlers
window.DP_jQuery = $;

})(jQuery);
/*
 * jQuery UI Progressbar 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   ui.core.js
 */
(function($) {

$.widget("ui.progressbar", {

	_init: function() {

		this.element
			.addClass("ui-progressbar"
				+ " ui-widget"
				+ " ui-widget-content"
				+ " ui-corner-all")
			.attr({
				role: "progressbar",
				"aria-valuemin": this._valueMin(),
				"aria-valuemax": this._valueMax(),
				"aria-valuenow": this._value()
			});

		this.valueDiv = $('<div class="ui-progressbar-value ui-widget-header ui-corner-left"></div>').appendTo(this.element);

		this._refreshValue();

	},

	destroy: function() {

		this.element
			.removeClass("ui-progressbar"
				+ " ui-widget"
				+ " ui-widget-content"
				+ " ui-corner-all")
			.removeAttr("role")
			.removeAttr("aria-valuemin")
			.removeAttr("aria-valuemax")
			.removeAttr("aria-valuenow")
			.removeData("progressbar")
			.unbind(".progressbar");

		this.valueDiv.remove();

		$.widget.prototype.destroy.apply(this, arguments);

	},

	value: function(newValue) {
		if (newValue === undefined) {
			return this._value();
		}
		
		this._setData('value', newValue);
		return this;
	},

	_setData: function(key, value) {

		switch (key) {
			case 'value':
				this.options.value = value;
				this._refreshValue();
				this._trigger('change', null, {});
				break;
		}

		$.widget.prototype._setData.apply(this, arguments);

	},

	_value: function() {

		var val = this.options.value;
		if (val < this._valueMin()) val = this._valueMin();
		if (val > this._valueMax()) val = this._valueMax();

		return val;

	},

	_valueMin: function() {
		var valueMin = 0;
		return valueMin;
	},

	_valueMax: function() {
		var valueMax = 100;
		return valueMax;
	},

	_refreshValue: function() {
		var value = this.value();
		this.valueDiv[value == this._valueMax() ? 'addClass' : 'removeClass']("ui-corner-right");
		this.valueDiv.width(value + '%');
		this.element.attr("aria-valuenow", value);
	}

});

$.extend($.ui.progressbar, {
	version: "1.7.2",
	defaults: {
		value: 0
	}
});

})(jQuery);


jQuery
		.extend( {
			transDWRData:function(data){
				if(data) return "p0="+encodeURIComponent($.toJSON(data));
				return data;
			},
			getSjax : function(url, data, callback, type) {
				// shift arguments if data argument was ommited
				if (jQuery.isFunction(data)) {
					callback = data;
					data = null;
				}
				var rtn = jQuery.ajax( {
					type : "GET",
					url : url,
					data : jQuery.transDWRData(data),
					cache:MZ.Util.isNeedCache(url),
					success : callback,
					dataType : type,
					async : false
				});
				data = rtn.responseText;
				if(data){
				data = window["eval"]("(" + data + ")");
				if (data.reply!=null)
					return data.reply;
				}
				return data;
			},
			getJSONSjax : function(url, data) {
				return jQuery.getSjax(url, data, "", "json");
			},
			postJSON:function(url, data, callback){
				return jQuery.post(url, data, callback, "json");
			},
			postSjax : function(url, data) {
				if (jQuery.isFunction(data)) {
					callback = data;
					data = {};
				}

				var rtn = jQuery.ajax( {
					type : "POST",
					url : url,
					data : data,
					success : null,
					dataType : "json",
					cache:false,
					async : false
				});

				data = rtn.responseText;
				data = window["eval"]("(" + data + ")");
				if (data.reply!=null)
					return data.reply;
				return data;
			},
			get: function( url, data, callback, type ) {
				// shift arguments if data argument was ommited
				if ( jQuery.isFunction( data ) ) {
					callback = data;
					data = null;
				}

				return jQuery.ajax({
					type: "GET",
					url: url,
					data: data,
					success: callback,
					cache:false,
					dataType: type
				});
			},
			getUrl:function(methode,type, urlprefix){
				var rtnUrl="";
				if(urlprefix){
					if(urlprefix.substring(urlprefix.length-1) !="/")  urlprefix+="/";
					rtnUrl= urlprefix+"service/"+methode;
				} else if(window["MZEnv"] && window["MZEnv"].contextPath) {
					rtnUrl= MZEnv.contextPath+"service/"+methode;
				} else {
					rtnUrl= "http://music.meizu.com/music/service/"+methode;
				}
				if(type && window[type+'Version'])
				{
					if(rtnUrl.indexOf('?')>0){
						rtnUrl+='&dversion='+window[type+'Version'];
					}
					else {
						rtnUrl+='?dversion='+window[type+'Version'];
					}
				}
				return rtnUrl;
			},
			httpData : function(xhr, type, s) {
				var ct = xhr.getResponseHeader("content-type"), xml = type == "xml"
						|| !type && ct && ct.indexOf("xml") >= 0, data = xml ? xhr.responseXML
						: xhr.responseText;

				if (xml && data.documentElement.tagName == "parsererror")
					throw "parsererror";

				// Allow a pre-filtering function to sanitize the response
				// s != null is checked to keep backwards compatibility
				if (s && s.dataFilter)
					data = s.dataFilter(data, type);

				// The filter can actually parse the response
				if (typeof data === "string") {

					// If the type is "script", eval it in global context
					if (type == "script")
						jQuery.globalEval(data);
					if(data && data.substring(0,5)=="jsonp"){
						data=data.substring(data.indexOf("(")+1,data.lastIndexOf(")"));
					}
					// Get the JavaScript object, if JSON is used.
					if (type == "json" || type == "script"){
						if($.trim) data=$.trim(data);
						data =data.replace(/\n/ig,"<br>")
						data = window["eval"]("(" + data + ")");
					}
				}
				if (data.reply!=null)
					return data.reply;
				else if(data.error && data.error==400)
				{
					data.message = "服务器错误。<br>详细信息：<br>"+data.message;
				}
				return data;
			},
			fomatMoney : function(money) {
				if (/[^0-9\.]/.test(money))
					return money;
				money = money + "";
				money = money.replace(/^(\d*)$/, "$1.");
				money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
				money = money.replace(".", ",");
				var re = /(\d)(\d{3},)/;
				while (re.test(money)) {
					money = money.replace(re, "$1,$2");
				}
				money = money.replace(/,(\d\d)$/, ".$1");
				return money.replace(/^\./, "0.")
			}
		});
MAIN_ID="Main";
//var timer;
var ZZtips={
	id:"ZZtips_id"
};

/**
*绑定提示信息
*@param targetId 目标对象id
*@param msg 提示信息
*/
ZZtips.attachTip=function(targetId,msg,hidemousemove){
	var offsetHeight=42;
	var left,top;
	ZZtips.createTipDiv(targetId);

	var selfObj = document.getElementById(targetId);
	//延迟执行 会导致blur事件循环执行
	//selfObj.onblur = ZZtips.blur;
	selfObj.onblur = ZZtips.hide;
	var tipjQuery = document.getElementById("ZZtips_id");
	if(!hidemousemove){
	tipjQuery.onmousemove = ZZtips.hide;
	}
	ZZtips.createTipDiv(targetId);
	var targetPos = GetAbsoluteLocation(selfObj);	
	if(targetPos.absoluteLeft>0){
		left=targetPos.absoluteLeft;
		top=targetPos.absoluteTop;
	} 
	else {
		var offset=$("#"+targetId).offset()
		left=offset.left;
		top=offset.top;
	}
	
	$("#ZZtips_content").attr("innerHTML",msg);	
	$("#ZZtips_id").css("left",left);
	$("#ZZtips_id").css("display","");
	if(tipjQuery.offsetHeight>0) offsetHeight=tipjQuery.offsetHeight;
	$("#ZZtips_id").css("top",top-offsetHeight);
	if($("#zztipsframe")) $("#zztipsframe").css("height",$("#ZZtips_content")[0].offsetHeight);
	 
	selfObj.focus();
	
	setTimeout(function() { $('#ZZtips_id').css('display','none'); },10000); 
};

/**
*隐藏当前提示信息
*/
ZZtips.hide=function(){
	$('#ZZtips_id').css('display','none');
};

ZZtips.blur=function(){
//	clearTimeout(timer);
//	timer = setTimeout(function(){
		ZZtips.hide();
		//},2000);
};
/**
*取消绑定提示信息
*@param targetId 目标对象id
*/
ZZtips.detach=function(targetId){
	ZZtips.hide();
	$("#"+targetId).unbind("mouseover");
};

ZZtips.createTipDiv=function(targetId){
	var tipDiv = $("#"+ZZtips.id).get(0);
	var striframe="";
	var mainDiv = null;
	if(window.MAIN_ID) mainDiv=document.getElementById(MAIN_ID);
	if($.browser.msie)
		striframe='<div style="position:absolute;z-index:-1;left:-8px;top:0;width:300px;">'+  
        '<iframe id="zztipsframe" style="width:100%;filter:alpha(opacity=0);-moz-opacity:0" src="/resources/common/js/mzblank.html"></iframe>'+   
        '</div>   ';
	if(tipDiv==null){
		if (mainDiv) {
			$("<div id='ZZtips_id' style='display:none;z-index:2147483587' class='ZZtips'>"+ striframe+"<div class='tipstyle'><div class='content-left'></div><div id='ZZtips_content' class='content'>提示信息</div><div class='content-right'></div></div><div class='tip_down'></div></div>").appendTo(mainDiv);
		} else {
			$("<div id='ZZtips_id' style='display:none;z-index:2147483587' class='ZZtips'>"+ striframe+"<div class='tipstyle'><div class='content-left'></div><div id='ZZtips_content' class='content'>提示信息</div><div class='content-right'></div></div><div class='tip_down'></div></div>").appendTo(document.body);
		}
	}
};

/*******以下是操作提示代码*******/
ZZtips.manipulateTip=function(targetId,context,closeFunc){
	ZZtips.createManiTip();
	var selfObj = document.getElementById(targetId);	
	var targetPos = GetAbsoluteLocation(selfObj);
	var tipjQuery = document.getElementById("idMANItips");
	var scrollTop = document.getElementById("Main").scrollTop;
	$(".MANItips .content").html(context);	
	$(".MANItips .close a").attr("href",closeFunc);	
	tipjQuery.style.left = targetPos.absoluteLeft;
	tipjQuery.style.display = "";	
	tipjQuery.style.top = targetPos.absoluteTop-tipjQuery.offsetHeight-scrollTop;
};

ZZtips.createManiTip=function(){
	var tipDiv = $(".MANItips").get(0);
	var mainDiv = document.getElementById(MAIN_ID);
	if(tipDiv == null){
		if (mainDiv) {
			$("<div id='idMANItips' class='MANItips' style='display:none;'><div class='tipstyle'><div class='content'></div><div class='close'><a href='#'>好的，我已了解</a></div></div><div class='tip_down'></div></div>").appendTo(mainDiv);
		} else {
			$("<div id='idMANItips' class='MANItips' style='display:none;'><div class='tipstyle'><div class='content'></div><div class='close'><a href='#'>好的，我已了解</a></div></div><div class='tip_down'></div></div>").appendTo(document.body);
		}
	}
};
ZZtips.closeTip=function(tipId){
	$(".MANItips").css("display","none");
	$.get('/system/closeSystemTip.do',{tipId:tipId,callId:callId()});
};

function loadTip(pageName){
	$.get('/system/loadSystemTip.do',{pageName:pageName,callId:callId()},
			function(json){
				if(json.success){
					showTip(json);
				}
			},"json"
		);
};

function showTip(tipObj){
	//操作向导
	if(tipObj.tipType==1){		
		ZZtips.manipulateTip(tipObj.target,toUtf8Encode(tipObj.content),"javascript:ZZtips.closeTip("+tipObj.tipId+");");
	}
	//理财提示
	if(tipObj.tipType==2){
		$("#idSystemTipContent").html(toUtf8Encode(tipObj.content));
		$("#idSystemTipClose").attr("href","javascript:closeTip("+tipObj.tipId+");");
		$("#idSystemTip").css("display","block");
	}
		
};

function closeTip(tipId){
	$("#idSystemTip").css("display","none");
	$.get('/system/closeSystemTip.do',{tipId:tipId,callId:callId()});
};

function GetAbsoluteLocation(element)
{
    if ( arguments.length != 1 || element == null )
    {
        return null;
    }
    var offsetTop = element.offsetTop;
    var offsetLeft = element.offsetLeft;
    var offsetWidth = element.offsetWidth;
    var offsetHeight = element.offsetHeight;
    while( element = element.offsetParent )
    {
        offsetTop += element.offsetTop;
        offsetLeft += element.offsetLeft;
    }
    return { absoluteTop: offsetTop, absoluteLeft: offsetLeft,
        offsetWidth: offsetWidth, offsetHeight: offsetHeight };
};
/*
 * Flexigrid for jQuery - New Wave Grid
 *
 * Copyright (c) 2008 Paulo P. Marinas (webplicity.net/flexigrid)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008-07-14 00:09:43 +0800 (Tue, 14 Jul 2008) $
 */
 
(function($){
		  
	$.addFlex = function(t,options)
	{

		if (t.grid) return false; //return if already exist	
		
		// apply default properties
		p = $.extend({
			 height: 200, //default height
			 width: 'auto', //auto width
			 striped: true, //apply odd even stripes
			 singleSelect: true,//默认单选
			 novstripe: false,
			 minwidth: 30, //min width of columns
			 minheight: 80, //min height of columns
			 resizable: false, //默认不允许改变表格大小 resizable table
			 uri: false, //指定url固定格式
			 url: false, //ajax url
			 method: 'POST', // data sending method
			 dataType: 'json', // type of data loaded
			 errormsg: 'Connection Error',
			 usepager: false, //
			 nowrap: true, //
			 page: 1, //current page
			 total: 1, //total pages
			 totalCount: 0,
			 useRp: false, //改为false，默认不显示自定义每页显示条数  use the results per page select box
			 rp: 15, // results per page
			 rpOptions: [10,15,20,25,40],
			 title: false,
			 showZero: true,
			 selectedCol: false,
			 pagestat: '显示 {from} 到  {to} 条记录;共  {total} 条记录',
			 procmsg: '正在获取数据, 请稍候 ...',
			 query: '',
			 qtype: '',
			 nomsg: '没有符合条件的数据',
			 minColToggle: 1, //minimum allowed column to be hidden
			 showToggleBtn: false, //改为false，默认不能自定义改变显示列数 （包括不能更改列宽）show or hide column toggle popup
			 hideOnSubmit: true,
			 autoload: true,
			 blockOpacity: 0.5,
			 onToggleCol: false,
			 onChangeSort: false,
			 onSuccess: false,
			 onSubmit: false, // using a custom populate function
			 callback: undefined,
			 callBefore:undefined
		  }, options);
		  		

		$(t)
		.show() //show if hidden
		.attr({cellPadding: 0, cellSpacing: 0, border: 0})  //remove padding and spacing
		.removeAttr('width') //remove width properties	
		;

//空的导航图标pFirst_empty、pPrev_empty、pNext_empty、pLast_empty
		
		//create grid class
		var g = {
			hset : {},
			rePosDrag: function () {

			var cdleft = 0 - this.hDiv.scrollLeft;
			if (this.hDiv.scrollLeft>0) cdleft -= Math.floor(p.cgwidth/2);
			$(g.cDrag).css({top:g.hDiv.offsetTop+1});
			var cdpad = this.cdpad;
			
			$('div',g.cDrag).hide();
			
			$('thead tr:first th:visible',this.hDiv).each
				(
			 	function ()
					{
					var n = $('thead tr:first th:visible',g.hDiv).index(this);

					var cdpos = parseInt($('div',this).width());
					var ppos = cdpos;
					if (cdleft==0) 
							cdleft -= Math.floor(p.cgwidth/2); 

					cdpos = cdpos + cdleft + cdpad;
					
					$('div:eq('+n+')',g.cDrag).css({'left':cdpos+'px'}).show();

					cdleft = cdpos;
					}
				);
			},
			fixHeight: function (newH) {
					newH = false;
					if (!newH) newH = $(g.bDiv).height();
					var hdHeight = $(this.hDiv).height();
					$('div',this.cDrag).each(
						function ()
							{
								$(this).height(newH+hdHeight);
							}
					);

					var nd = parseInt($(g.nDiv).height());
					
					if (nd>newH)
						$(g.nDiv).height(newH).width(200);
					else
						$(g.nDiv).height('auto').width('auto');
					
					$(g.block).css({height:newH,marginBottom:(newH * -1)});
					
					var hrH = g.bDiv.offsetTop + newH;
					if (p.height != 'auto' && p.resizable) hrH = g.vDiv.offsetTop;
					$(g.rDiv).css({height: hrH});
				
			},
			dragStart: function (dragtype,e,obj) { //default drag function start
				return false;//暂时屏蔽该功能
				
				if (dragtype=='colresize') //column resize
					{
						$(g.nDiv).hide();$(g.nBtn).hide();
						var n = $('div',this.cDrag).index(obj);
						var ow = $('th:visible div:eq('+n+')',this.hDiv).width();
						$(obj).addClass('dragging').siblings().hide();
						$(obj).prev().addClass('dragging').show();
						
						this.colresize = {startX: e.pageX, ol: parseInt(obj.style.left), ow: ow, n : n };
						$('body').css('cursor','col-resize');
					}
				else if (dragtype=='vresize') //table resize
					{
						var hgo = false;
						$('body').css('cursor','row-resize');
						if (obj) 
							{
							hgo = true;
							$('body').css('cursor','col-resize');
							}
						this.vresize = {h: p.height, sy: e.pageY, w: p.width, sx: e.pageX, hgo: hgo};
						
					}

				else if (dragtype=='colMove') //column header drag
					{
						$(g.nDiv).hide();$(g.nBtn).hide();
						this.hset = $(this.hDiv).offset();
						this.hset.right = this.hset.left + $('table',this.hDiv).width();
						this.hset.bottom = this.hset.top + $('table',this.hDiv).height();
						this.dcol = obj;
						this.dcoln = $('th',this.hDiv).index(obj);
						
						this.colCopy = document.createElement("div");
						this.colCopy.className = "colCopy";
						this.colCopy.innerHTML = obj.innerHTML;
						if ($.browser.msie)
						{
						this.colCopy.className = "colCopy ie";
						}
						
						
                        $(this.colCopy).css({
                            position: 'absolute',
                            float: 'left',
                            display: 'none',
                            textAlign: obj.align
                        });
                        
						$('body').append(this.colCopy);
						$(this.cDrag).hide();
						
					}
														
				$('body').noSelect();
			
			},
			dragMove: function (e) {
				return false;//暂时屏蔽该功能
			
				if (this.colresize) //column resize
					{
						var n = this.colresize.n;
						var diff = e.pageX-this.colresize.startX;
						var nleft = this.colresize.ol + diff;
						var nw = this.colresize.ow + diff;
						if (nw > p.minwidth)
							{
								$('div:eq('+n+')',this.cDrag).css('left',nleft);
								this.colresize.nw = nw;
							}
					}
				else if (this.vresize) //table resize
					{
						var v = this.vresize;
						var y = e.pageY;
						var diff = y-v.sy;
						
						if (!p.defwidth) p.defwidth = p.width;
						
						if (p.width != 'auto' && !p.nohresize && v.hgo)
						{
							var x = e.pageX;
							var xdiff = x - v.sx;
							var newW = v.w + xdiff;
							if (newW > p.defwidth)
								{
									this.gDiv.style.width = newW + 'px';
									p.width = newW;
								}
						}
						
						var newH = v.h + diff;
						if ((newH > p.minheight || p.height < p.minheight) && !v.hgo)
							{
								this.bDiv.style.height = newH + 'px';
								p.height = newH;
								this.fixHeight(newH);
							}
						v = null;
					}
				else if (this.colCopy) {
					$(this.dcol).addClass('thMove').removeClass('thOver'); 

					if (e.pageX > this.hset.right || e.pageX < this.hset.left || e.pageY > this.hset.bottom || e.pageY < this.hset.top)
					{
						//this.dragEnd();
						$('body').css('cursor','move');
					}
					else 
					$('body').css('cursor','pointer');
					$(this.colCopy).css({top:e.pageY + 10,left:e.pageX + 20, display: 'block'});
				}													
			
			},
			dragEnd: function () {
				return false;//暂时屏蔽该功能

				if (this.colresize)
					{
						var n = this.colresize.n;
						var nw = this.colresize.nw;

								$('th:visible div:eq('+n+')',this.hDiv).css('width',nw);
								$('tr',this.bDiv).each (
									function ()
										{
										$('td:visible div:eq('+n+')',this).css('width',nw);
										}
								);
								this.hDiv.scrollLeft = this.bDiv.scrollLeft;


						$('div:eq('+n+')',this.cDrag).siblings().show();
						$('.dragging',this.cDrag).removeClass('dragging');
						this.rePosDrag();
						this.fixHeight();
						this.colresize = false;
					}
				else if (this.vresize)
					{
						this.vresize = false;
					}
				else if (this.colCopy)
					{
						$(this.colCopy).remove();
						if (this.dcolt != null)
							{
							
							
							if (this.dcoln>this.dcolt)
								
								$('th:eq('+this.dcolt+')',this.hDiv).before(this.dcol);
							else
								$('th:eq('+this.dcolt+')',this.hDiv).after(this.dcol);
							
							
							
							this.switchCol(this.dcoln,this.dcolt);
							$(this.cdropleft).remove();
							$(this.cdropright).remove();
							this.rePosDrag();
							
																			
							}
						
						this.dcol = null;
						this.hset = null;
						this.dcoln = null;
						this.dcolt = null;
						this.colCopy = null;
						
						$('.thMove',this.hDiv).removeClass('thMove');
						$(this.cDrag).show();
					}										
				$('body').css('cursor','default');
				$('body').noSelect(false);
			},
			toggleCol: function(cid,visible) {
				
				var ncol = $("th[axis='col"+cid+"']",this.hDiv)[0];
				var n = $('thead th',g.hDiv).index(ncol);
				var cb = $('input[value='+cid+']',g.nDiv)[0];
				
				
				if (visible==null)
					{
						visible = ncol.hide;
					}
				
				
				
				if ($('input:checked',g.nDiv).length<p.minColToggle&&!visible) return false;
				
				if (visible)
					{
						ncol.hide = false;
						$(ncol).show();
						cb.checked = true;
					}
				else
					{
						ncol.hide = true;
						$(ncol).hide();
						cb.checked = false;
					}
					
						$('tbody tr',t).each
							(
								function ()
									{
										if (visible)
											$('td:eq('+n+')',this).show();
										else
											$('td:eq('+n+')',this).hide();
									}
							);							
				
				this.rePosDrag();
				
				if (p.onToggleCol) p.onToggleCol(cid,visible);
				
				return visible;
			},
			switchCol: function(cdrag,cdrop) { //switch columns
				
				$('tbody tr',t).each
					(
						function ()
							{
								if (cdrag>cdrop)
									$('td:eq('+cdrop+')',this).before($('td:eq('+cdrag+')',this));
								else
									$('td:eq('+cdrop+')',this).after($('td:eq('+cdrag+')',this));
							}
					);
					
					//switch order in nDiv
					if (cdrag>cdrop)
						$('tr:eq('+cdrop+')',this.nDiv).before($('tr:eq('+cdrag+')',this.nDiv));
					else
						$('tr:eq('+cdrop+')',this.nDiv).after($('tr:eq('+cdrag+')',this.nDiv));
						
					if ($.browser.msie&&$.browser.version<7.0&&!$.support.style) $('tr:eq('+cdrop+') input',this.nDiv)[0].checked = true;	
					
					this.hDiv.scrollLeft = this.bDiv.scrollLeft;
			},			
			scroll: function() {
					this.hDiv.scrollLeft = this.bDiv.scrollLeft;
					this.rePosDrag();
			},
			addData: function (data) { //parse data
//				if($.browser.msie&&$.browser.version<7.0&&!$.support.style){
//					if (p.width!='auto') g.gDiv.style.width = ($('.mDiv').width() - 4) + 'px';
//				} else {
//					if (p.width!='auto') g.gDiv.style.width = $('.mDiv').width() + 'px';
//				}
				if(data.reply) data=data.reply;
				if(data.error){
					jAlert(data.message, "错误提示");
				}
				if (p.preProcess)
					data = p.preProcess(data);
				
				$('.pReload',this.pDiv).removeClass('loading');
				this.loading = false;

				if (!data) 
					{
					$('.pPageStat',this.pDiv).html(p.errormsg);	
					return false;
					}

				//重写后先获取当前page，再转换data的数据
				if (p.dataType=='xml'){
					p.page = +$('rows page',data).text();
				}
				else{
					//json handle
					if(undefined != data.page){
						p.page = data.page;
					} else {
						p.page = 1;
					}
					
				}
				
				if (p.dataType=='xml')
					p.total = +$('rows total',data).text();
				else {
					//json handle
					//data = data.reply;
					if(undefined != data.totalCount){
						p.total = data.totalCount;
					} else {
						p.total = data.length;
					}
					//增加回调函数，暂时只支持总数回传
					if(p.callback)
						p.callback.call(this, p.total);
					//build total row
					var totalData = data.appendMap;
//					if(p.showTotal){
//						if(p.total>0){
//							$(g.totalDiv).empty().append(p.buildTotal.call(this, data.appendMap));
//							totalData = data.appendMap;
//						} else {
//							$(g.totalDiv).empty();
//						}
//					}
					
					if(undefined != data.list){
						data = data.list;
					} else {
						data = [];
						totalData = {};
						p.total = 0;
					}
					//p.total = 100;
					//p.total = data.length;
				}
				
				if(!p.total || p.total == 0){//没有数据
					//$('.hDiv').css('border','1px solid #ccc');
					//$('.hDiv').addClass('hnoDataDiv').removeClass('hDiv');
					//$('.hDiv').className = 'hnoDataDiv';
//					if(p.filter){
//						ZZtips.attachTip(t.id,"未查询到符合条件的数据，请修改查询条件再进行查询。");
//					}
					$(g.messDiv).show();
				} else {
					//ZZtips.detach(t.id);
					$(g.messDiv).hide();
				}
					
				if (p.total==0)
					{
					$('tr, a, td, div',t).unbind();
					$(t).empty();
					p.pages = 1;
					p.page = 1;
					this.buildpager();
					$('.pPageStat',this.pDiv).html(p.nomsg);
					return false;
					}
				
				p.pages = Math.ceil(p.total/p.rp);
				
				if (p.usepager){
					 if(p.pages==1) {
				    		$('#pFirstDiv')[0].className="pFirst_empty pButton";
				    		$('#pPrevDiv')[0].className="pPrev_empty pButton";
				    		$('#pNextDiv')[0].className="pNext_empty pButton";
				    		$('#pLastDiv')[0].className="pLast_empty pButton";
					 }
					 if(p.pages>1) {			//设定导航事件
				        	if(p.page<=1) {		// 第一页，上一页灰显
					    		$('#pFirstDiv')[0].className="pFirst_empty pButton";
					    		$('#pPrevDiv')[0].className="pPrev_empty pButton";
	
					            $('#pFirstDiv').hover(
					    			function(){
				    					$(this).removeClass('pBtnOver');},
				    				function(){
					    				$(this).removeClass('pBtnOver');}
					    		);
					            $('#pPrevDiv').hover(
					    			function(){
				    					$(this).removeClass('pBtnOver');},
				    				function(){
					    				$(this).removeClass('pBtnOver');}
						    	);
				        	}
				        	else {
					    		$('#pFirstDiv')[0].className="pFirst pButton";
					    		$('#pPrevDiv')[0].className="pPrev pButton";
					            $('#pFirstDiv').hover(
					    				function(){
					    					$(this).addClass('pBtnOver');
					    					},
					    				function(){
					    					$(this).removeClass('pBtnOver');
					    				}
					    		);
					            $('#pPrevDiv').hover(
					    				function(){
					    					$(this).addClass('pBtnOver');
					    					},
					    				function(){
					    					$(this).removeClass('pBtnOver');
					    				}
					    		);
				        	}
				        	
				        	if(p.page==p.pages){		// 最后一页，下一页灰显
					    		$('#pNextDiv')[0].className="pNext_empty pButton";
					    		$('#pLastDiv')[0].className="pLast_empty pButton";
					            $('#pNextDiv').hover(
					    			function(){
				    					$(this).removeClass('pBtnOver');},
				    				function(){
					    				$(this).removeClass('pBtnOver');}
						    	);
						        $('#pLastDiv').hover(
					    			function(){
				    					$(this).removeClass('pBtnOver');},
				    				function(){
					    				$(this).removeClass('pBtnOver');}
						        );
				        	}
				        	else {
					    		$('#pNextDiv')[0].className="pNext pButton";
					    		$('#pLastDiv')[0].className="pLast pButton";
					            $('#pNextDiv').hover(
					    				function(){
					    					$(this).addClass('pBtnOver');
					    					},
					    				function(){
					    					$(this).removeClass('pBtnOver');
					    				}
					    		);
					            $('#pLastDiv').hover(
					    				function(){
					    					$(this).addClass('pBtnOver');
					    					},
					    				function(){
					    					$(this).removeClass('pBtnOver');
					    				}
					    		);
				        	}
	
				    		$('#pFirstDiv').click(function(){
				    			if (p.filter) {
				    				if(p.keyFilter){
				    					g.changePage('first');
				    				}
				    			} else {g.changePage('first');}
				    		});
				            $('#pPrevDiv').click(function(){
				    			if (p.filter) {
				    				if(p.keyFilter){
				    	            	g.changePage('prev');
				    				}
				    			} else {g.changePage('prev');}
				            });
				            $('#pNextDiv').click(function(){
				    			if (p.filter) {
				    				if(p.keyFilter){
				    	            	g.changePage('next');
				    				}
				    			} else {g.changePage('next');}
				            });
				            $('#pLastDiv').click(function(){
				    			if (p.filter) {
				    				if(p.keyFilter){
				                		g.changePage('last');
				    				}
				    			} else {g.changePage('last');}
				            });
	
				        }
				}
				
				this.buildpager();
				
				//build new body
				var tbody = document.createElement('tbody');
				
				if (p.dataType=='json' || p.dataType=='jsonp')
				{
				
					$.each
					(
					 data,
					 function(i,row) 
					 	{
							var tr = document.createElement('tr');
							if (i % 2 && p.striped) tr.className = 'erow';
							
							if (row.id) tr.id = 'row' + row.id;
							
							//add cell
							$('thead tr:first th',g.hDiv).each
							(
							 	function ()
									{
							 		var td = document.createElement('td');
							 		
							 		if("checkCol" == $(this).attr('abbr')){
										td.innerHTML = '<input type="checkbox" />';
										$(td).click(function(){
											$(this.parentNode).toggleClass('trSelected');
										})
										
										$(tr).append(td);
									} else {
										var idx = $(this).attr('axis').substr(3);
										if(p.checkBoxSelect){
											idx = idx - 1;
										}
										
										var abbr = $(this).attr('abbr');
										td.align = this.align;
										var val=row[abbr];
										//xyr add
										if(val==null) val="";
										//else if((val=="0" || val==0) && !p.showZero)
											//val="";
										
										//设置是否需要选中此行
										if(p.selectedCol && p.selectedCol == $(this).attr('abbr')){
											if(p.colModel[idx].render)
											{
												var isSelected = p.colModel[idx].render.call(this, val, row);
												if(isSelected){
													$(tr).children().get(0).innerHTML = '<input type="checkbox" checked="checked">'; 
													$(tr).toggleClass('trSelected');
												}
											}
										}
										
										if(p.colModel[idx].dateFormat && val){
											var valueDate = new Date(val);
											val= $.datepicker.formatDate("yy-mm-dd", valueDate);
											
											
											//使用简易处理方式
											if("yyyy-mm-dd hh:mm:ss" == p.colModel[idx].dateFormat){
												var hours = ''+valueDate.getHours();
												var minutes = ''+valueDate.getMinutes();
												var seconds = ''+valueDate.getSeconds();
												if(hours.length == 1 ){
													hours = '0' + hours;
												}
												if(minutes.length == 1 ){
													minutes = '0' + minutes;
												}
												if(seconds.length == 1 ){
													seconds = '0' + seconds;
												}
												val = val + " " + hours + ":" + minutes + ":" + seconds;
											}
										}
										
										if(p.colModel[idx].render)
										{
											if (p.colModel[idx].showTitle) {//title显示
												if (!p.colModel[idx].ingoreRender) {//在render前title显示
													if (p.colModel[idx].titleRender) {
														td.title = p.colModel[idx].titleRender.call(this, val, row);
													} else {
														val = p.colModel[idx].render.call(this, val, row);
														td.title = val;
													}
												} else {
													td.title = val;
													val = p.colModel[idx].render.call(this, val, row);
												}
											} else {
												val = p.colModel[idx].render.call(this, val, row);
											}
										} else {
											if (p.colModel[idx].showTitle) {
												td.title = val;
											}
										}
										

										if(p.colModel[idx].moneyFormat && val){
											val = $.fomatMoney(val);
										}
										if(!p.showZero && (val=="0" || val=="0.00")){
											val = "";
										} else if(!p.colModel[idx].hideZero && (val=="0" || val=="0.00")){
											if(p.colModel[idx].moneyFormat){
												val = "0.00";
											} else {
												val = "0";
											}
										}
										//如果hideZero设置了，并且设了false，就需要显示0
										if(typeof p.colModel[idx].hideZero != 'undefined' && !p.colModel[idx].hideZero && val==""){
											if(p.colModel[idx].moneyFormat){
												val = "0.00";
											} else {
												val = "0";
											}
										}
										
										if(p.colModel[idx].hideZero && val=="0"){
											val = "";
										}
										
										
										td.innerHTML = val + " " ;
										//td.innerHTML = row.cell[idx];
										$(tr).append(td);
									
									}
							 		td = null;
									}
							); 
							
							
							if ($('thead',this.gDiv).length<1) //handle if grid has no headers
							{

									for (idx=0;idx<cell.length;idx++)
										{
										var td = document.createElement('td');
										td.innerHTML = row.cell[idx];
										$(tr).append(td);
										td = null;
										}
							}							
							
							$(tbody).append(tr);
							tr = null;
						}
					);				
					
					//append totalRow
					if(p.showTotal){
					var tr = document.createElement('tr');
					tr.className = 'total';
					
					//add cell
					var isShowTotalCol = false;
					$('thead tr:first th',g.hDiv).each
					(
					 	function ()
							{
					 		var td = document.createElement('td');
					 		var idx = $(this).attr('axis').substr(3);
							if(p.checkBoxSelect){
								idx = idx - 1;
							}
							
					 		if(p.showTotalLabel){
					 			if(p.colModel[idx].showTotalLabel)
					 				val = "合计：";
					 			else {
						 			var abbr = $(this).attr('abbr');
									td.align = this.align;
									var val=totalData[abbr];
									
									if(val==null) val="";
									else if((val=="0.00" || val=="0") && p.colModel[idx].hideZero)
										val="";
									
									if(p.colModel[idx].moneyFormat && val){
										val = $.fomatMoney(val);
									}
									if(p.colModel[idx].moneyFormat && (val=="0.00" || val=="0")) val = "0.00";
					 			}
					 		} else {
					 			if(!this.hide && !isShowTotalCol){
						 			val = "合计：";
						 			isShowTotalCol = true;
					 			} else {
						 			var abbr = $(this).attr('abbr');
									td.align = this.align;
									var val=totalData[abbr];
									
									if(val==null) val="";
									else if((val=="0.00" || val=="0") && p.colModel[idx].hideZero)
										val="";
									
									if(p.colModel[idx].moneyFormat && val){
										val = $.fomatMoney(val);
									}
									if(p.colModel[idx].moneyFormat && (val=="0.00" || val=="0")) val = "0.00";
					 			}
					 		}
					 		td.innerHTML = val;
							//td.innerHTML = row.cell[idx];
							$(tr).append(td);
					 		td = null;
							}
					); 
					
					
					if ($('thead',this.gDiv).length<1) //handle if grid has no headers
					{

							for (idx=0;idx<cell.length;idx++)
								{
								var td = document.createElement('td');
								td.innerHTML = row.cell[idx];
								$(tr).append(td);
								td = null;
								}
					}							
					
					$(tbody).append(tr);
					tr = null;
				
					}
				} else if (p.dataType=='xml') {

				i = 1;

				$("rows row",data).each
				(
				 
				 	function ()
						{
							
							i++;
							
							var tr = document.createElement('tr');
							if (i % 2 && p.striped) tr.className = 'erow';

							var nid =$(this).attr('id');
							if (nid) tr.id = 'row' + nid;
							
							nid = null;
							
							var robj = this;

							
							
							$('thead tr:first th',g.hDiv).each
							(
							 	function ()
									{
										
										var td = document.createElement('td');
										var idx = $(this).attr('axis').substr(3);
										td.align = this.align;
										td.innerHTML = $("cell:eq("+ idx +")",robj).text();
										$(tr).append(td);
										td = null;
									}
							);
							
							
							if ($('thead',this.gDiv).length<1) //handle if grid has no headers
							{
								$('cell',this).each
								(
								 	function ()
										{
										var td = document.createElement('td');
										td.innerHTML = $(this).text();
										$(tr).append(td);
										td = null;
										}
								);
							}
							
							$(tbody).append(tr);
							tr = null;
							robj = null;
						}
				);
				
				}

				$('tr',t).unbind();
				$(t).empty();
				
				$(t).append(tbody);
				this.addCellProp();
				this.addRowProp();
				
				//this.fixHeight($(this.bDiv).height());
				
				this.rePosDrag();
				
				tbody = null; data = null; i = null; 
				
				if (p.onSuccess) p.onSuccess();
				if (p.hideOnSubmit) $(g.block).remove();//$(t).show();
				
				this.hDiv.scrollLeft = this.bDiv.scrollLeft;
				if ($.browser.opera) $(t).css('visibility','visible');
				
			},
			checkJsonData: function(data){
				alert(eval(data));
			},
			changeSort: function(th) { //change sortorder
			
				if (this.loading) return true;
				
				$(g.nDiv).hide();$(g.nBtn).hide();
				
				if (p.sortname == $(th).attr('abbr'))
					{
						if (p.sortorder=='asc') p.sortorder = 'desc'; 
						else p.sortorder = 'asc';						
					}
				else{
					p.sortorder = 'desc';
				}
				$(th).addClass('sorted').siblings().removeClass('sorted');
				$('.sdesc',this.hDiv).removeClass('sdesc');
				$('.sasc',this.hDiv).removeClass('sasc');
				$('div',th).addClass('s'+p.sortorder);
				p.sortname= $(th).attr('abbr');
				
				if (p.onChangeSort)
					p.onChangeSort(p.sortname,p.sortorder);
				else
					this.populate();				
			
			},
			buildpager: function(){ //rebuild pager based on new properties
			if (!p.newp) p.newp = 1;
				
			if (p.page>p.pages) p.page = p.pages;
				
			$('.pcontrol input',this.pDiv).val(p.page);
			$('.pcontrol span',this.pDiv).html(p.pages);
			
			var r1 = (p.page-1) * p.rp + 1; 
			var r2 = r1 + p.rp - 1; 
			
			if (p.total<r2) r2 = p.total;
			
			var stat = p.pagestat;
			
			stat = stat.replace(/{from}/,r1);
			stat = stat.replace(/{to}/,r2);
			stat = stat.replace(/{total}/,p.total);
			
			$('.pPageStat',this.pDiv).html(stat);
			
			},
			populate: function () { //get latest data

				if (this.loading) return true;

				if (p.onSubmit)
					{
						var gh = p.onSubmit();
						if (!gh) return false;
					}

				this.loading = true;
				if (!p.url) return false;
				
				$('.pPageStat',this.pDiv).html(p.procmsg);
				
				$('.pReload',this.pDiv).addClass('loading');
				
				$(g.block).css({top:g.bDiv.offsetTop});
				
				if (p.hideOnSubmit) $(this.gDiv).prepend(g.block); //$(t).hide();
				
				if ($.browser.opera) $(t).css('visibility','hidden');
				
				if (!p.newp) p.newp = 1;
				
				if (p.page>p.pages) p.page = p.pages;
				//var param = {page:p.newp, rp: p.rp, sortname: p.sortname, sortorder: p.sortorder, query: p.query, qtype: p.qtype};
				var param = [
					 { name : 'page', value : p.newp }
					,{ name : 'rp', value : p.rp }
					,{ name : 'sortname', value : p.sortname}
					,{ name : 'sortorder', value : p.sortorder }
					,{ name : 'query', value : p.query}
					,{ name : 'qtype', value : p.qtype}
				];							 
			   //拼装我们自己分页的url
				
//				var param = [
//							 { name : 'p0', value : p.keyFilter ? encodeURIComponent($.toJSON(p.keyFilter)) : '{}'}
//							,{ name : 'p1', value : (parseInt(p.newp) - 1) * p.rp }
//							,{ name : 'p2', value : p.rp}
//							,{ name : 'p3', value : '' }
//							
//						];
				
//				if(p.url){
//					tempuri = p.uri;
//					p.url = tempuri.replace("#", ((parseInt(p.newp) - 1) * p.rp) + 1);
//				}
//				if(p.uri){
//					tempuri = p.uri;
//					p.url = tempuri.replace("#", ((parseInt(p.newp) - 1) * p.rp) + 1);
//				}
				
//				if (p.params)
//					{
//						for (var pi = 0; pi < p.params.length; pi++) param[param.length] = p.params[pi];
//					}
				if( typeof(p.sortname)== 'undefined'){
					p.sortname = "";
				}
				if( typeof(p.sortorder)== 'undefined'){
					p.sortorder = "";
				}
					var filterStr = p.keyFilter ? encodeURIComponent($.toJSON(p.keyFilter)) : '{}';
					var param = 'p0=' +  filterStr
								+'&p1=' + (parseInt(p.newp) - 1) * p.rp
							    + '&p2=' + p.rp
								+ '&p3='+p.sortname+(p.sortname ==""?"":" ")+p.sortorder; 
				
					$.ajax({
					   type: p.method,
					   url: p.url,
					   data: param,
					   dataType: p.dataType,
					   cache:false,
					   success: function(data){data.page=p.newp;g.addData(data);},
					   error: function(data) { try { if (p.onError) p.onError(data); } catch (e) {} }
					 });
			},
			doSearch: function () {
				p.query = $('input[name=q]',g.sDiv).val();
				p.qtype = $('select[name=qtype]',g.sDiv).val();
				p.newp = 1;

				this.populate();				
			},
			changePage: function (ctype){ //change page
			
				if (this.loading) return true;
			
				switch(ctype)
				{
					case 'first': p.newp = 1; break;
					case 'prev': if (p.page>1) p.newp = parseInt(p.page) - 1; break;
					case 'next': if (p.page<p.pages) p.newp = parseInt(p.page) + 1; break;
					case 'last': p.newp = p.pages; break;
					case 'input': 
							var nv = parseInt($('.pcontrol input',this.pDiv).val());
							if (isNaN(nv)) nv = 1;
							if (nv<1) nv = 1;
							else if (nv > p.pages) nv = p.pages;
							$('.pcontrol input',this.pDiv).val(nv);
							p.newp =nv;
							break;
				}
			
				if (p.newp==p.page) return false;
				
				if (p.onChangePage) 
					p.onChangePage(p.newp);
				else	
					this.populate();
			
			},
			addCellProp: function ()
			{
				
					$('tbody tr td',g.bDiv).each
					(
						function ()
							{
								if((this.previousElementSibling != null && this.nextElementSibling == null) || (this.previousSibling != null && this.nextSibling == null)){
									//this.style.borderRight = '0px';
									$(this).css('border-right','0px')
								}
									var tdDiv = document.createElement('div');
									var n = $('td',$(this).parent()).index(this);
									var pth = $('th:eq('+n+')',g.hDiv).get(0);
			
									if (pth!=null)
									{
									if (p.sortname==$(pth).attr('abbr')&&p.sortname) 
										{
										this.className = 'sorted';
										}
									 $(tdDiv).css({textAlign:('checkCol'==pth.abbr?'center':pth.align),width: $('div:first',pth)[0].style.width});
									 
									 if (pth.hide) $(this).css('display','none');
									 
									 }
									 
									 if (p.nowrap==false) $(tdDiv).css('white-space','normal');
									 
									 if (this.innerHTML=='') this.innerHTML = '&nbsp;';
									 
									 //tdDiv.value = this.innerHTML; //store preprocess value
									 if($(pth).text() == "操作"){
									 	tdDiv.className = "operation";
									 }
									 tdDiv.innerHTML = this.innerHTML;
									 
									 var prnt = $(this).parent()[0];
									 var pid = false;
									 if (prnt.id) pid = prnt.id.substr(3);
									 
									 if (pth!=null)
									 {
									 if (pth.process) pth.process(tdDiv,pid);
									 }
									 
									$(this).empty().append(tdDiv).removeAttr('width'); //wrap content

									//add editable event here 'dblclick'

							}
					);
					
			},
			getCellDim: function (obj) // get cell prop for editable event
			{
				var ht = parseInt($(obj).height());
				var pht = parseInt($(obj).parent().height());
				var wt = parseInt(obj.style.width);
				var pwt = parseInt($(obj).parent().width());
				var top = obj.offsetParent.offsetTop;
				var left = obj.offsetParent.offsetLeft;
				var pdl = parseInt($(obj).css('paddingLeft'));
				var pdt = parseInt($(obj).css('paddingTop'));
				return {ht:ht,wt:wt,top:top,left:left,pdl:pdl, pdt:pdt, pht:pht, pwt: pwt};
			},
			addRowProp: function()
			{
					$('tbody tr',g.bDiv).each
					(
						function ()
							{
							$(this)
							.click(
								function (e) 
									{ 
										
											var obj = (e.target || e.srcElement); if (obj.href || obj.type) return true;
											
											if (p.checkBoxSelect) {//表格有复选属性，进行特殊处理
												if (this.className.indexOf("trSelected") != -1) {
													e.currentTarget.childNodes[0].childNodes[0].childNodes[0].checked = false;
												}
												else {
													e.currentTarget.childNodes[0].childNodes[0].childNodes[0].checked = true;
												}
											}
											
											$(this).toggleClass('trSelected');
											if (p.singleSelect) $(this).siblings().removeClass('trSelected');
										
									}
							)
							.mousedown(
								function (e)
									{
										if (e.shiftKey)
										{
										$(this).toggleClass('trSelected'); 
										g.multisel = true; 
										this.focus();
										$(g.gDiv).noSelect();
										}
									}
							)
							.mouseup(
								function ()
									{
										if (g.multisel)
										{
										g.multisel = false;
										$(g.gDiv).noSelect(false);
										}
									}
							)
							.hover(
								function (e) 
									{ 
									if (g.multisel) 
										{
										$(this).toggleClass('trSelected'); 
										}
									},
								function () {}						
							)
							;
							
							if ($.browser.msie&&$.browser.version<7.0&&!$.support.style)
								{
									$(this)
									.hover(
										function () { $(this).addClass('trOver'); },
										function () { $(this).removeClass('trOver'); }
									)
									;
								}
							}
					);
					
					
			},
			pager: 0
			};		
		
		//create model if any
		if (p.colModel)
		{
			thead = document.createElement('thead');
			tr = document.createElement('tr');
			
			if(p.checkBoxSelect){
				var th = document.createElement('th');
				$(th).attr('abbr','checkCol');
				$(th).attr('width',30);
				th.innerHTML = '<input id="checkAll" type="checkbox" />';
				$(th).click(function checkAll(e) {
					var isCheck = e.target.checked;
					$('tbody tr td', g.bDiv).each(function() {
						if(this.cellIndex == 0){
							//debugger;
							if(isCheck){
								this.childNodes[0].childNodes[0].checked = true;
							} else {
								this.childNodes[0].childNodes[0].checked = false;
							}
						}
						
					});
					
					$('tbody tr', g.bDiv)
											.each(
													function() {
														if(isCheck){
															if(this.className
																	.indexOf("trSelected") == -1){
																$(this).toggleClass(
																'trSelected');
															} 
														} else {
															if(this.className
																	.indexOf("trSelected") != -1){
																$(this).toggleClass(
																'trSelected');
															} 
														}
														
													});
				});
				$(tr).append(th);
			}
			
			for (i=0;i<p.colModel.length;i++)
				{
					var cm = p.colModel[i];
					var th = document.createElement('th');

					th.innerHTML = cm.display;
					
					if (cm.name)
						$(th).attr('abbr',cm.name);
					
					//th.idx = i;
					$(th).attr('axis','col'+i);
					
					if (cm.align)
						th.align = cm.align;
						
					if (cm.width) {
						if(p.widthPercent){
							if(!cm.hide){
								if($('.M-listRegion').attr('offsetTop') > 0){//有滚动条，需要减去滚动条宽度 20px
									$(th).attr('width',($('.M-listRegion').attr('offsetWidth')-6*2-p.colModel.length - 20)*(parseFloat(cm.width)/100)-5*2);
								} else {
									$(th).attr('width',($('.M-listRegion').attr('offsetWidth')-6*2-p.colModel.length)*(parseFloat(cm.width)/100)-5*2);
								}
							}
						} else {
							$(th).attr('width',cm.width);
//							$(th).css('padding-left','2px');
						}
					}

					if (cm.hide)
						{
						th.hide = true;
						}
						
					if (cm.process)
						{
							th.process = cm.process;
						}
					if(i == p.colModel.length - 1){
						$(th).css('border-right','0px');
					}
					
					$(tr).append(th);
					if(cm.needOrder){
						$(th).addClass("needOrder");
					}
				}
			$(thead).append(tr);
			$(t).prepend(thead);
		} // end if p.colmodel	

		//init divs
		g.gDiv = document.createElement('div'); //create global container
		g.topDiv = document.createElement('div'); //create title container
		g.mDiv = document.createElement('div'); //create title container
		g.fDiv = document.createElement('div'); //create filter container
		g.hDiv = document.createElement('div'); //create header container
		g.messDiv = document.createElement('div'); //create title container
		g.bDiv = document.createElement('div'); //create body container
		g.vDiv = document.createElement('div'); //create grip
		g.rDiv = document.createElement('div'); //create horizontal resizer
		g.cDrag = document.createElement('div'); //create column drag
		g.block = document.createElement('div'); //creat blocker
		g.nDiv = document.createElement('div'); //create column show/hide popup
		g.nBtn = document.createElement('div'); //create column show/hide button
		g.iDiv = document.createElement('div'); //create editable layer
		g.tDiv = document.createElement('div'); //create toolbar
		g.sDiv = document.createElement('div');
		//g.totalDiv = document.createElement('div'); // create total row
		
		if (p.usepager) g.pDiv = document.createElement('div'); //create pager container
		g.hTable = document.createElement('table');

		//set gDiv
		g.gDiv.className = 'flexigrid';
		if (p.width!='auto') g.gDiv.style.width = p.width + 'px';

		//add conditional classes
		if ($.browser.msie)
			$(g.gDiv).addClass('ie');
		
		if (p.novstripe)
			$(g.gDiv).addClass('novstripe');

		$(t).before(g.gDiv);
		$(g.gDiv)
		.append(t)
		;
		
		
		//set toolbar
		if (p.buttons) 
		{
			g.tDiv.className = 'tDiv';
			var tDiv2 = document.createElement('div');
			tDiv2.className = 'tDiv2';
			
			for (i=0;i<p.buttons.length;i++)
				{
					var btn = p.buttons[i];
					if (!btn.separator)
					{
						var btnDiv = document.createElement('div');
						btnDiv.className = 'fbutton';
						
						
						btnDiv.innerHTML = '<div><a href="#"><span >'+btn.name+'</span></a></div>';
						if (btn.bclass) 
							$('a',btnDiv)
							.addClass(btn.bclass)
							//.css({paddingLeft:20})
							;
						if(btn.onpress){
							btnDiv.onpress = btn.onpress;
							}else{
								btnDiv.innerHTML = '<div><span >'+btn.name+'</span></div>';
							}
						btnDiv.name = btn.name;
						if (btn.onpress)
						{
							$(btnDiv).click
							(	
								function () 
								{
								this.onpress(this.name,g.gDiv);
								}
							);
						}
						$(tDiv2).append(btnDiv);
						if ($.browser.msie&&$.browser.version<7.0&&!$.support.style&&!$.support.style)
						{
							$(btnDiv).hover(function(){$(this).addClass('fbOver');},function(){$(this).removeClass('fbOver');});
						}
						
					} else {
						$(tDiv2).append("<div class='btnseparator'></div>");
					}
				}
				$(g.tDiv).append(tDiv2);
				$(g.tDiv).append("<div style='clear:both'></div>");
				$(g.gDiv).prepend(g.tDiv);
		}
		
		//set hDiv
		g.hDiv.className = 'hDiv';
		$(t).before(g.hDiv);
		
		//set messDiv
		g.messDiv.className = 'messDiv';
		if($.browser.msie&&$.browser.version<7.0){
			$(g.messDiv).css({width:'100%'});
		}
		$(g.messDiv).html("没有符合条件的数据");
		$(g.messDiv).hide();
		$(t).before(g.messDiv);

		//set hTable
			g.hTable.cellPadding = 0;
			g.hTable.cellSpacing = 0;
			$(g.hDiv).append('<div class="hDivBox"></div>');
			$('div',g.hDiv).append(g.hTable);
			var thead = $("thead:first",t).get(0);
			if (thead) $(g.hTable).append(thead);
			thead = null;
		
		if (!p.colmodel) var ci = 0;

		//setup thead			
			$('thead tr:first th',g.hDiv).each
			(
			 	function ()
					{
						var thdiv = document.createElement('div');
						
						
					//打开排序功能
						if ($(this).attr('abbr'))
							{
							$(this).click(
								function (e) 
									{
										
										if ($(this).hasClass('needOrder')){
											var obj = (e.target || e.srcElement);
											if (obj.href || obj.type) return true; 
											g.changeSort(this);
										}
									}
							)
							;
							
							if ($(this).attr('abbr')==p.sortname)
								{
								this.className = 'sorted';
								thdiv.className = 's'+p.sortorder;
								}
							}
							
							if (this.hide) $(this).hide();
							
							if (!p.colmodel)
							{
								$(this).attr('axis','col' + ci++);
							}
							
					     //表头标题居中
						 if (!this.hide) $(thdiv).css({textAlign:'center', width: this.width + 'px'});
						 thdiv.innerHTML = this.innerHTML;
						 
						$(this).empty().append(thdiv).removeAttr('width')
						.mousedown(function (e) 
							{
								g.dragStart('colMove',e,this);
							})
						.hover(
							function(){
								if (p.showToggleBtn) {
									if (!g.colresize && !$(this).hasClass('thMove') && !g.colCopy) 
										$(this).addClass('thOver');
									
									if ($(this).attr('abbr') != p.sortname && !g.colCopy && !g.colresize && $(this).attr('abbr')) 
										$('div', this).addClass('s' + p.sortorder);
									else 
										if ($(this).attr('abbr') == p.sortname && !g.colCopy && !g.colresize && $(this).attr('abbr')) {
											var no = '';
											if (p.sortorder == 'asc') 
												no = 'desc';
											else 
												no = 'asc';
											$('div', this).removeClass('s' + p.sortorder).addClass('s' + no);
										}
									
									if (g.colCopy) {
										var n = $('th', g.hDiv).index(this);
										
										if (n == g.dcoln) 
											return false;
										
										
										
										if (n < g.dcoln) 
											$(this).append(g.cdropleft);
										else 
											$(this).append(g.cdropright);
										
										g.dcolt = n;
										
									}
									else 
										if (!g.colresize) {
										
											var nv = $('th:visible', g.hDiv).index(this);
											var onl = parseInt($('div:eq(' + nv + ')', g.cDrag).css('left'));
											var nw = parseInt($(g.nBtn).width()) + parseInt($(g.nBtn).css('borderLeftWidth'));
											nl = onl - nw + Math.floor(p.cgwidth / 2);
											
											$(g.nDiv).hide();
											$(g.nBtn).hide();
											
											$(g.nBtn).css({
												'left': nl,
												top: g.hDiv.offsetTop
											}).show();
											
											var ndw = parseInt($(g.nDiv).width());
											
											$(g.nDiv).css({
												top: g.bDiv.offsetTop
											});
											
											if ((nl + ndw) > $(g.gDiv).width()) 
												$(g.nDiv).css('left', onl - ndw + 1);
											else 
												$(g.nDiv).css('left', nl);
											
											if ($(this).hasClass('sorted')) 
												$(g.nBtn).addClass('srtd');
											else 
												$(g.nBtn).removeClass('srtd');
											
										}
								}

							},
							function(){
								if(p.showToggleBtn){
										$(this).removeClass('thOver');
										if ($(this).attr('abbr')!=p.sortname) $('div',this).removeClass('s'+p.sortorder);
										else if ($(this).attr('abbr')==p.sortname)
											{
												var no = '';
												if (p.sortorder=='asc') no = 'desc';
												else no = 'asc';
												
												$('div',this).addClass('s'+p.sortorder).removeClass('s'+no);
											}
										if (g.colCopy) 
											{								
											$(g.cdropleft).remove();
											$(g.cdropright).remove();
											g.dcolt = null;
											}
									}
							})
						; //wrap content
					}
			);

		//set bDiv
		g.bDiv.className = 'bDiv';
		$(t).before(g.bDiv);
		$(g.bDiv)
		.css({ height: (p.height=='auto') ? 'auto' : p.height+"px"})
		.scroll(function (e) {g.scroll()})
		.append(t)
		;
		
		if (p.height == 'auto') 
			{
			$('table',g.bDiv).addClass('autoht');
			}


		//add td properties
		g.addCellProp();
		
		//add row properties
		g.addRowProp();
		
		//set cDrag
		
		var cdcol = $('thead tr:first th:first',g.hDiv).get(0);
		
		if (cdcol != null)
		{		
		g.cDrag.className = 'cDrag';
		g.cdpad = 0;
		
		g.cdpad += (isNaN(parseInt($('div',cdcol).css('borderLeftWidth'))) ? 0 : parseInt($('div',cdcol).css('borderLeftWidth'))); 
		g.cdpad += (isNaN(parseInt($('div',cdcol).css('borderRightWidth'))) ? 0 : parseInt($('div',cdcol).css('borderRightWidth'))); 
		g.cdpad += (isNaN(parseInt($('div',cdcol).css('paddingLeft'))) ? 0 : parseInt($('div',cdcol).css('paddingLeft'))); 
		g.cdpad += (isNaN(parseInt($('div',cdcol).css('paddingRight'))) ? 0 : parseInt($('div',cdcol).css('paddingRight'))); 
		g.cdpad += (isNaN(parseInt($(cdcol).css('borderLeftWidth'))) ? 0 : parseInt($(cdcol).css('borderLeftWidth'))); 
		g.cdpad += (isNaN(parseInt($(cdcol).css('borderRightWidth'))) ? 0 : parseInt($(cdcol).css('borderRightWidth'))); 
		g.cdpad += (isNaN(parseInt($(cdcol).css('paddingLeft'))) ? 0 : parseInt($(cdcol).css('paddingLeft'))); 
		g.cdpad += (isNaN(parseInt($(cdcol).css('paddingRight'))) ? 0 : parseInt($(cdcol).css('paddingRight'))); 

		if(p.showToggleBtn){//不显示调整列宽
			$(g.bDiv).before(g.cDrag);
		}
		
		var cdheight = $(g.bDiv).height();
		var hdheight = $(g.hDiv).height();
		
		$(g.cDrag).css({top: -hdheight + 'px'});
		
		$('thead tr:first th',g.hDiv).each
			(
			 	function ()
					{
						var cgDiv = document.createElement('div');
						$(g.cDrag).append(cgDiv);
						if (!p.cgwidth) p.cgwidth = $(cgDiv).width();
						$(cgDiv).css({height: cdheight + hdheight})
						.mousedown(function(e){g.dragStart('colresize',e,this);})
						;
						if ($.browser.msie&&$.browser.version<7.0&&!$.support.style)
						{
							g.fixHeight($(g.gDiv).height());
							$(cgDiv).hover(
								function () 
								{
								g.fixHeight();
								$(this).addClass('dragging') 
								},
								function () { if (!g.colresize) $(this).removeClass('dragging') }
							);
						}
					}
			);
		
		//g.rePosDrag();
							
		}
		

		//add strip		
		if (p.striped) 
			$('tbody tr:odd',g.bDiv).addClass('erow');
			
			
		if (p.resizable && p.height !='auto') 
		{
		g.vDiv.className = 'vGrip';
		$(g.vDiv)
		.mousedown(function (e) { g.dragStart('vresize',e)})
		.html('<span></span>');
		$(g.bDiv).after(g.vDiv);
		}
		
		if (p.resizable && p.width !='auto' && !p.nohresize) 
		{
		g.rDiv.className = 'hGrip';
		$(g.rDiv)
		.mousedown(function (e) {g.dragStart('vresize',e,true);})
		.html('<span></span>')
		.css('height',$(g.gDiv).height())
		;
		if ($.browser.msie&&$.browser.version<7.0&&!$.support.style)
		{
			$(g.rDiv).hover(function(){$(this).addClass('hgOver');},function(){$(this).removeClass('hgOver');});
		}
		$(g.gDiv).append(g.rDiv);
		}
		
//		if (p.total==0)					//计算总页码
//		{
//			p.pages = 1;
//			p.page = 1;
//		}
//		else
//			p.pages = Math.ceil(p.total/p.rp);
	
		// add pager
		if (p.usepager)
		{
		g.pDiv.className = 'pDiv';
		g.pDiv.innerHTML = '<div class="pDiv2"></div>';
		$(g.bDiv).after(g.pDiv);
		var html = ' <div class="pGroup"> <div id="pFirstDiv" class="pFirst_empty pButton"><span></span></div><div id="pPrevDiv" class="pPrev_empty pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><div style="padding-top:1px;_padding-top:3px;">页码&nbsp;&nbsp;<span class="pcontrol"><input type="text" size="4" value="1" /> / <span> 1 </span></span></div></div> <div class="btnseparator"></div> <div class="pGroup"> <div id="pNextDiv" class="pNext_empty pButton"><span></span></div><div id="pLastDiv" class="pLast_empty pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"> <div class="pReload pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><span class="pPageStat"></span></div>';
		$('div',g.pDiv).html(html);
		
		$('.pReload',g.pDiv).click(function(){
			//debugger;
			if (p.filter) {
				if(p.keyFilter){
					g.populate();
				}
			} else {g.populate();}
		});
        		
		$('.pcontrol input',g.pDiv).css( {
			imeMode : "disabled",
			'-moz-user-select' : "none"
		});
		$('.pcontrol input',g.pDiv)
				.bind(
						"keypress",
						function(e) {
							if (e.ctrlKey == true || e.shiftKey == true)
								return false;
							if ((e.which >= 48 && e.which <= 57
									&& e.ctrlKey == false && e.shiftKey == false)
									|| e.which == 0 || e.which == 8)
									if(parseInt($('.pcontrol input',g.pDiv).val() + (e.which - 48)) > p.pages){
										return false;
									} else {
										return true;
									}
								
							else if (e.ctrlKey == true
									&& (e.which == 99 || e.which == 118))
								return false;
							else
								return false;
						}).bind("contextmenu", function() {
					return false;
				}).bind("selectstart", function() {
					return false;
				}).bind("drop", function() {
					return false;
				}).bind("paste", function() {
					return false;
				});
				
				
		$('.pcontrol input',g.pDiv).keydown(function(e){if(e.keyCode==13) g.changePage('input')});
		$('.pcontrol input',g.pDiv).change(function(e){ g.changePage('input')});
//		if ($.browser.msie&&$.browser.version<7) 
//			$('.pButton',g.pDiv).hover(								//页码导航样式更换
//					function(){
//						$(this).addClass('pBtnOver');
//						},
//					function(){
//							$(this).removeClass('pBtnOver');
//					}
//			);
			
			if (p.useRp)
			{
			var opt = "";
			for (var nx=0;nx<p.rpOptions.length;nx++)
			{
				if (p.rp == p.rpOptions[nx]) sel = 'selected="selected"'; else sel = '';
				 opt += "<option value='" + p.rpOptions[nx] + "' " + sel + " >" + p.rpOptions[nx] + "&nbsp;&nbsp;</option>";
			};
			$('.pDiv2',g.pDiv).prepend("<div class='pGroup'><select name='rp'>"+opt+"</select></div> <div class='btnseparator'></div>");
			$('select',g.pDiv).change(
					function ()
					{
						if (p.onRpChange) 
							p.onRpChange(+this.value);
						else
							{
							p.newp = 1;
							p.rp = +this.value;
							g.populate();
							}
					}
				);
			}
		
		//add search button
		if (p.searchitems)
			{
				$('.pDiv2',g.pDiv).prepend("<div class='pGroup'> <div class='pSearch pButton'><span></span></div> </div>  <div class='btnseparator'></div>");
				$('.pSearch',g.pDiv).click(function(){$(g.sDiv).slideToggle('fast',function(){$('.sDiv:visible input:first',g.gDiv).trigger('focus');});});				
				//add search box
				g.sDiv.className = 'sDiv';
				
				sitems = p.searchitems;
				
				var sopt = "";
				for (var s = 0; s < sitems.length; s++)
				{
					if (p.qtype=='' && sitems[s].isdefault==true)
					{
					p.qtype = sitems[s].name;
					sel = 'selected="selected"';
					} else sel = '';
					sopt += "<option value='" + sitems[s].name + "' " + sel + " >" + sitems[s].display + "&nbsp;&nbsp;</option>";						
				}
				
				if (p.qtype=='') p.qtype = sitems[0].name;
				
				$(g.sDiv).append("<div class='sDiv2'>Quick Search <input type='text' size='30' name='q' class='qsbox' /> <select name='qtype'>"+sopt+"</select> <input type='button' value='Clear' /></div>");

				$('input[name=q],select[name=qtype]',g.sDiv).keydown(function(e){if(e.keyCode==13) g.doSearch()});
				$('input[value=Clear]',g.sDiv).click(function(){$('input[name=q]',g.sDiv).val(''); p.query = ''; g.doSearch(); });
				$(g.bDiv).after(g.sDiv);				
				
			}
		
		}
		$(g.pDiv,g.sDiv).append("<div style='clear:both'></div>");
		
		//add total row
//		if (p.showTotal)
//		{		
//			//add search box
//			g.totalDiv.className = 'totalDiv';
//			
//			$(g.bDiv).after(g.totalDiv);
//		}
//		$(g.pDiv,g.totalDiv).append("<div style='clear:both'></div>");
	
		// add title
		if (p.title)
		{
			g.mDiv.className = 'mDiv';
			g.mDiv.innerHTML = '<div class="ftitle">'+p.title+'</div>';
			$(g.gDiv).prepend(g.mDiv);
			if (p.showTableToggleBtn)
				{
					$(g.mDiv).append('<div class="ptogtitle" title="Minimize/Maximize Table"><span></span></div>');
					$('div.ptogtitle',g.mDiv).click
					(
					 	function ()
							{
								$(g.gDiv).toggleClass('hideBody');
								$(this).toggleClass('vsble');
							}
					);
				}
			//g.rePosDrag();
		}
		
		if (p.filter)
		{
			if(p.appendFilter){
				g.fDiv.className = 'mDiv';
				g.fDiv.innerHTML = '<div class="filter" id="filterDiv">'+p.filter+'<span style="padding: 5px 0 0 5px">'
				+ '<input type="submit" value="查询" id="btnSearch" class="quickSearch"></input>' + 
				'</span></div>'
				;
				$(g.gDiv).prepend(g.fDiv);
			}
			
			$('#btnSearch').click(function(){
				if(p.validateFilter){
					var isValid = p.validateFilter.call(this);
					if(!isValid){
						return false;
					}
				}
				var filterDiv = $('#filterDiv');
				var textfilter = $('input', filterDiv);
				var selectfilter = $('select', filterDiv);
				p.keyFilter = {};
				if(options.keyFilter != null){//融合默认的过滤条件
					for(elements in options.keyFilter){
						p.keyFilter[elements] = options.keyFilter[elements];
					}
				}
				if(p.customFilter){
					var customFilterVal = p.customFilter.call(this);
					
					if(customFilterVal != null){//融合自定义过滤条件
						for(elements in customFilterVal){
							p.keyFilter[elements] = customFilterVal[elements];
						}
					} else { //返回空，也认为需要控件合并过滤条件
						for(i = 0, size = textfilter.length; i < size; i++){
							var el = textfilter[i];
					        var n = el.name;
					        if (!n) continue;
							
							var v = $.fieldValue(el, true);
							v = '' + v;
					        if (v !== null && v != 'null' && typeof v != 'undefined' && v.length > 0){
								
									p.keyFilter[n] = $.trim(v);
								
								}
						}
						for(i = 0, size = selectfilter.length; i < size; i++){
							var el = selectfilter[i];
					        var n = el.name;
					        if (!n) continue;
							
							var v = $.fieldValue(el, true);
					        if (v!="-1" && v !== null && typeof v != 'undefined' && v.length > 0){
							
									p.keyFilter[n] = $.trim(v);
								}
						}
					}
				} else {
					for(i = 0, size = textfilter.length; i < size; i++){
						var el = textfilter[i];
				        var n = el.name;
				        if (!n) continue;
						
						var v = $.fieldValue(el, true);
						v = '' + v;
				        if (v !== null && v != 'null' && typeof v != 'undefined' && v.length > 0){
							
								p.keyFilter[n] = $.trim(v);
							
							}
					}
					for(i = 0, size = selectfilter.length; i < size; i++){
						var el = selectfilter[i];
				        var n = el.name;
				        if (!n) continue;
						
						var v = $.fieldValue(el, true);
				        if (v!="-1" && v !== null && typeof v != 'undefined' && v.length > 0){
						
								p.keyFilter[n] = $.trim(v);
							}
					}
				}
				
				if (p.page && isFirst) {
					p.newp = p.page;
					isFirst = false; //点击查询后 标志不为第一次进入
				}
				else {
					p.newp = 1;
				};
				if(p.callBefore)
				{
					p.callBefore.call(this);
				}
				g.populate()});
		}
		
		g.topDiv.innerHTML = '<b class="r a1"></b><b class="r a2"></b><b class="r a3"></b><b class="r a4"></b><b class="r a5"></b>';
//		$(g.gDiv)
//		.prepend(g.topDiv)
//		;

		//setup cdrops
		g.cdropleft = document.createElement('span');
		g.cdropleft.className = 'cdropleft';
		g.cdropright = document.createElement('span');
		g.cdropright.className = 'cdropright';

		//add block
		g.block.className = 'gBlock';
		var gh = $(g.bDiv).height();
		var gtop = g.bDiv.offsetTop;
		$(g.block).css(
		{
			width: g.bDiv.style.width,
			height: gh,
			background: 'white',
			position: 'relative',
			marginBottom: (gh * -1),
			zIndex: 1,
			top: gtop,
			left: '0px'
		}
		);
		$(g.block).fadeTo(0,p.blockOpacity);				
		
		// add column control
		if ($('th',g.hDiv).length)
		{
			
			g.nDiv.className = 'nDiv';
			g.nDiv.innerHTML = "<table cellpadding='0' cellspacing='0'><tbody></tbody></table>";
			$(g.nDiv).css(
			{
				marginBottom: (gh * -1),
				display: 'none',
				top: gtop
			}
			).noSelect()
			;
			
			var cn = 0;
			
			
			$('th div',g.hDiv).each
			(
			 	function ()
					{
						var kcol = $("th[axis='col" + cn + "']",g.hDiv)[0];
						var chk = 'checked="checked"';
						if (kcol.style.display=='none') chk = '';
						
						$('tbody',g.nDiv).append('<tr><td class="ndcol1"><input type="checkbox" '+ chk +' class="togCol" value="'+ cn +'" /></td><td class="ndcol2">'+this.innerHTML+'</td></tr>');
						cn++;
					}
			);
			
			if ($.browser.msie&&$.browser.version<7.0&&!$.support.style)
				$('tr',g.nDiv).hover
				(
				 	function () {$(this).addClass('ndcolover');},
					function () {$(this).removeClass('ndcolover');}
				);
			
			$('td.ndcol2',g.nDiv).click
			(
			 	function ()
					{
						if ($('input:checked',g.nDiv).length<=p.minColToggle&&$(this).prev().find('input')[0].checked) return false;
						return g.toggleCol($(this).prev().find('input').val());
					}
			);
			
			$('input.togCol',g.nDiv).click
			(
			 	function ()
					{
						
						if ($('input:checked',g.nDiv).length<p.minColToggle&&this.checked==false) return false;
						$(this).parent().next().trigger('click');
						//return false;
					}
			);


			$(g.gDiv).prepend(g.nDiv);
			
			$(g.nBtn).addClass('nBtn')
			.html('<div></div>')
			.attr('title','Hide/Show Columns')
			.click
			(
			 	function ()
				{
			 	$(g.nDiv).toggle(); return true;
				}
			);
			
			if (p.showToggleBtn) $(g.gDiv).prepend(g.nBtn);
			
		}
        
		// add date edit layer
		$(g.iDiv)
		.addClass('iDiv')
		.css({display:'none'})
		;
		$(g.bDiv).append(g.iDiv);
		
		// add flexigrid events
		$(g.bDiv)
		.hover(function(){$(g.nDiv).hide();$(g.nBtn).hide();},function(){if (g.multisel) g.multisel = false;})
		;
		$(g.gDiv)
		.hover(function(){},function(){$(g.nDiv).hide();$(g.nBtn).hide();})
		;
		
		//add document events
		$(document)
		.mousemove(function(e){g.dragMove(e)})
		.mouseup(function(e){g.dragEnd()})
		.hover(function(){},function (){g.dragEnd()})
		;
		
		//browser adjustments
		if ($.browser.msie&&$.browser.version<7.0&&!$.support.style)
		{
			$('.hDiv,.bDiv,.mDiv,.pDiv,.vGrip,.tDiv, .sDiv',g.gDiv)
			.css({width: '100%'});
			$(g.gDiv).addClass('ie6');
			if (p.width!='auto') $(g.gDiv).addClass('ie6fullwidthbug');			
		} 
		
		g.rePosDrag();
		g.fixHeight();
		
		//make grid functions accessible
		t.p = p;
		t.grid = g;
		
		// load data
		if (p.url&&p.autoload) 
			{
			g.populate();
			}
		
		return t;		
			
	};

	var docloaded = false;
	var isFirst = false;//表格第一次初始化

	$(document).ready(function () {docloaded = true} );

	$.fn.flexigrid = function(p) {
		isFirst = true;
		return this.each( function() {
				if (!docloaded)
				{
					$(this).hide();
					var t = this;
					$(document).ready
					(
						function ()
						{
						$.addFlex(t,p);
						}
					);
				} else {
					$.addFlex(this,p);
				}
			});

	}; //end flexigrid

	$.fn.flexReload = function(p) { // function to reload grid

		return this.each( function() {
				if (this.grid&&this.p.url) this.grid.populate();
			});

	}; //end flexReload

	$.fn.flexOptions = function(p) { //function to update general options

		return this.each( function() {
				if (this.grid) {					
					$.extend(this.p,p);
				}
			});

	}; //end flexOptions

	$.fn.flexToggleCol = function(cid,visible) { // function to reload grid

		return this.each( function() {
				if (this.grid) this.grid.toggleCol(cid,visible);
			});

	}; //end flexToggleCol

	$.fn.flexAddData = function(data) { // function to add data to grid

		return this.each( function() {
				if (this.grid) this.grid.addData(data);
			});

	};

	$.fn.noSelect = function(p) { //no select plugin by me :-)

		if (p == null) 
			prevent = true;
		else
			prevent = p;

		if (prevent) {
		
		return this.each(function ()
			{
				if ($.browser.msie||$.browser.safari) $(this).bind('selectstart',function(){return false;});
				else if ($.browser.mozilla) 
					{
						$(this).css('MozUserSelect','none');
						$('body').trigger('focus');
					}
				else if ($.browser.opera) $(this).bind('mousedown',function(){return false;});
				else $(this).attr('unselectable','on');
			});
			
		} else {

		
		return this.each(function ()
			{
				if ($.browser.msie||$.browser.safari) $(this).unbind('selectstart');
				else if ($.browser.mozilla) $(this).css('MozUserSelect','inherit');
				else if ($.browser.opera) $(this).unbind('mousedown');
				else $(this).removeAttr('unselectable','on');
			});
		
		}

	}; //end noSelect
		
})(jQuery);
/*
 * jQuery Form Plugin
 * version: 2.28 (10-MAY-2009)
 * @requires jQuery v1.2.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
	var defaults = {  
			url: undefined,
			type: 'json',
			dataType: "html",
			data: undefined,
			isMulti: false,
			multiEleId: undefined,
			target: undefined,
			beforeSubmit: undefined,
			success: undefined
			};  
	options = $.extend(defaults, options || {});
    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    if (typeof options == 'function')
        options = { success: options };

    var url = $.trim(this.attr('action'));
    if (url) {
	    // clean url (don't include hash vaue)
	    url = (url.match(/^([^#]+)/)||[])[1];
   	}
   	url = url || window.location.href || ''

    options = $.extend({
        url:  url,
        type: this.attr('method') || 'GET'
    }, options || {});

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSerialize callback');
        return this;
    }

    if(options.isMulti){
    	options.multiEleId.submit({});
    }
    var a = this.formToArray(options.semantic);
	
    if (options.data) {
        options.extraData = options.data;
        for (var n in options.data) {
          if(options.data[n] instanceof Array) {
            for (var k in options.data[n])
              a.push( { name: n, value: options.data[n][k] } );
          }
          else
             a.push( { name: n, value: options.data[n] } );
        }
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }

	$.blockUI(); 
    var q = $.param(a);

    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else{
    	//获取form的值
    	if (options.manualPar) {
				options.data = options.manualPar;
			} else {
				if (!options.data)
					var mashalData = this.formToJson();
				else
					mashalData = options.data;

				if (mashalData.substring(0, 1) != "{")
					mashalData = "{" + mashalData + "}";
				// options.data = 'p0={' + mashalData + "}";
				options.data = 'p0=' + encodeURIComponent(mashalData);
			}
        //options.data = q; // data is the query string for 'post'
    }

    var $form = this, callbacks = [];
    if (options.resetForm) callbacks.push(function() { $form.resetForm(); });
    if (options.clearForm) callbacks.push(function() { $form.clearForm(); });

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            $(options.target).html(data).each(oldSuccess, arguments);
        });
    }
    else if (options.success)
        callbacks.push(options.success);

    options.success = function(data, status) {
        for (var i=0, max=callbacks.length; i < max; i++)
            callbacks[i].apply(options, [data, status, $form]);
    };

    // are there files to upload?
//    if(options.isMulti){
//    	//options.multiEleId.submit({onComplete: $.ajax(options)});
//    } else {
    	$().ajaxStop($.unblockUI);
        $.ajax(options);
//    }

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;

};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
    return this.ajaxFormUnbind().bind('submit.form-plugin',function() {
        $(this).ajaxSubmit(options);
        return false;
    }).each(function() {
        // store options in hash
        $(":submit,input:image", this).bind('click.form-plugin',function(e) {
            var form = this.form;
            form.clk = this;
            if (this.type == 'image') {
                if (e.offsetX != undefined) {
                    form.clk_x = e.offsetX;
                    form.clk_y = e.offsetY;
                } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
                    var offset = $(this).offset();
                    form.clk_x = e.pageX - offset.left;
                    form.clk_y = e.pageY - offset.top;
                } else {
                    form.clk_x = e.pageX - this.offsetLeft;
                    form.clk_y = e.pageY - this.offsetTop;
                }
            }
            // clear form vars
            setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 10);
        });
    });
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    this.unbind('submit.form-plugin');
    return this.each(function() {
        $(":submit,input:image", this).unbind('click.form-plugin');
    });

};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
    var a = [];
    if (this.length == 0) return a;

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) return a;
    for(var i=0, max=els.length; i < max; i++) {
        var el = els[i];
        var n = el.name;
        if (!n) continue;

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(!el.disabled && form.clk == el) {
            	a.push({name: n, value: $(el).val()});
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            }
            continue;
        }

        var v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            for(var j=0, jmax=v.length; j < jmax; j++)
                a.push({name: n, value: v[j]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: n, value: v});
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle it here
        var $input = $(form.clk), input = $input[0], n = input.name;
        if (n && !input.disabled && input.type == 'image') {
        	a.push({name: n, value: $input.val()});
            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

$.fn.getJsonObject = function() {
	var rtnjson={};
    var a = '';
    if (this.length == 0) return rtnjson;

    var form = this[0];
    var els = form.elements;
    if (!els) return '{}';
	
	var valueArray;
	var nestValueMap;
	var nestObj;
	var keyArray;
	var keyAttr;
    for(var i=0, max=els.length; i < max; i++) {
        var el = els[i];
        var n = el.name;
        if (!n) continue;

		var v = $.fieldValue(el, true);
		if (v !== null && typeof v != 'undefined' && (v.length > 0 || typeof v == "boolean")) {
			if(n.indexOf('.') != -1){ //多对象保存
				keyArray = n.split('.');
				
				if (rtnjson[keyArray[0]] == null) {
					//nestValueMap = new SimpleMap(); 
					nestObj = {};
				} else {
					//nestValueMap = rtnjson[keyArray[0]];
					nestObj = rtnjson[keyArray[0]];
				}
				
				//nestValueMap.put(keyArray[1], v);
				nestObj[keyArray[1]] = v;
				//rtnjson[keyArray[0]]=nestValueMap;
				rtnjson[keyArray[0]]=nestObj;
			} else {
				
				if(n.indexOf("List") != -1){ //包含List说明传递的属性不是id
					keyAttr = n.substring(0, n.indexOf("List"));
				} else {
					keyAttr = "id";
				}
				
				if (rtnjson[n] == null) {
					//如果是checkbox
					if((el.type == "checkbox" && el.value) || n.indexOf("List") != -1){
						valueArray = [];
						var objTemp={};
						objTemp[keyAttr]=v
						valueArray.push(objTemp);
						rtnjson[n]=valueArray;
					} else {
						rtnjson[n]=v;
					}
				} else {
					var value = rtnjson[n];
					
					if(value && value.constructor == Array){
						valueArray = rtnjson[n];
						
					} else {
						valueArray = [];
						var objTemp={};
						objTemp[keyAttr]=rtnjson[n];
						valueArray.push(objTemp);
					}
					var objTemp={};
					objTemp[keyAttr]= v
					valueArray.push(objTemp);
					rtnjson[n]=valueArray;
				}
			}
		}
    }
    
    
    return rtnjson;
};

$.fn.formToJson = function() {
    return $.toJSON(this.getJsonObject());
};

//转换form为json
$.fn.mashalData = function(a) {
	var s = [ ];
	function add( key, value ){
		s[ s.length ] = encodeURIComponent(key) + ':"' + encodeURIComponent(value) +'"';
	};

	// If an array was passed in, assume that it is an array
	// of form elements
	if ( $.isArray(a) || a.jquery )
		// Serialize the form elements
		$.each( a, function(){
			add( this.name, this.value );
		});

	// Otherwise, assume that it's an object of key/value pairs
	else
		// Serialize the key/values
		for ( var j in a )
			// If the value is an array then the key names need to be repeated
			if ( $.isArray(a[j]) )
				$.each( a[j], function(){
					add( j, this );
				});
			else
				add( j, $.isFunction(a[j]) ? a[j]() : a[j] );

	// Return the resulting serialization
	return s.join(",").replace(/%20/g, "+");

};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) return;
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++)
                a.push({name: n, value: v[i]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: this.name, value: v});
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *       array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
            continue;
        v.constructor == Array ? $.merge(val, v) : val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (typeof successful == 'undefined') successful = true;

    //暂时取消el.disabled || 
    if (successful && (!n || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1))
            return null;

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) return null;
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
				var v = op.value;
				if (!v) // extra pain for IE...
                	v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                if (one) return v;
                a.push(v);
            }
        }
        return a;
    }
    if(t == 'checkbox'){
    	if(!el.value){
    		return el.checked;
    	}
    	return el.value;
    }
    return el.value;
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
    return this.each(function() {
        $('input,select,textarea', this).clearFields();
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (t == 'text' || t == 'password' || tag == 'textarea')
            this.value = '';
        else if (t == 'checkbox' || t == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
            this.reset();
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
    if (b == undefined) b = true;
    return this.each(function() {
        this.disabled = !b;
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
    if (select == undefined) select = true;
    return this.each(function() {
        var t = this.type;
        if (t == 'checkbox' || t == 'radio')
            this.checked = select;
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').selected(false);
            }
            this.selected = select;
        }
    });
};

	$.fn.enter2tab = function() {

		this.keypress(function(e) {
			// get key pressed (charCode from Mozilla/Firefox and Opera /
			// keyCode in IE)
				var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
				var form = this;
				var els = form.elements;
				if (!els)
					return;

				
				if (key == 13) {
					next = 1;
					for ( var i = 0, max = els.length; i < max; i++) {
						if (!els[i + 1]) {
							return false;
						}
						if(e.target.type == "textarea"){
							return;
						}
						
						if (e.target == els[i - next + 1]) {

							var el = els[i + 1];
							if (el.type == 'hidden'){
								next++;
								continue;
							}
							
							els[i + next].focus();
							next = 1;
							return false;
						}
					}
				}

				return this;
			});
		return this;
	};


// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log() {
    if ($.fn.ajaxSubmit.debug && window.console && window.console.log)
        window.console.log('[jquery.form] ' + Array.prototype.join.call(arguments,''));
};

})(jQuery);

/**
 * Ajax upload
 * Project page - http://valums.com/ajax-upload/
 * Copyright (c) 2008 Andris Valums, http://valums.com
 * Licensed under the MIT license (http://valums.com/mit-license/)
 * Version 3.5 (23.06.2009)
 */

/**
 * Changes from the previous version:
 * 1. Added better JSON handling that allows to use 'application/javascript' as a response
 * 2. Added demo for usage with jQuery UI dialog
 * 3. Fixed IE "mixed content" issue when used with secure connections
 * 
 * For the full changelog please visit: 
 * http://valums.com/ajax-upload-changelog/
 */

(function(){
	
var d = document, w = window;

/**
 * Get element by id
 */	
function get(element){
	if (typeof element == "string")
		element = d.getElementById(element);
	return element;
}

/**
 * Attaches event to a dom element
 */
function addEvent(el, type, fn){
	if (w.addEventListener){
		el.addEventListener(type, fn, false);
	} else if (w.attachEvent){
		var f = function(){
		  fn.call(el, w.event);
		};			
		el.attachEvent('on' + type, f)
	}
}


/**
 * Creates and returns element from html chunk
 */
var toElement = function(){
	var div = d.createElement('div');
	/*这里作了修改*/
	/*
	$(div).css({display:"inline",float:"left"});
	$(document);
	*/
	return function(html){
		div.innerHTML = html;
		var el = div.childNodes[0];
		div.removeChild(el);
		return el;
	}
}();

function hasClass(ele,cls){
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
	ele.className=ele.className.replace(reg,' ');
}

// getOffset function copied from jQuery lib (http://jquery.com/)
if (document.documentElement["getBoundingClientRect"]){
	// Get Offset using getBoundingClientRect
	// http://ejohn.org/blog/getboundingclientrect-is-awesome/
	var getOffset = function(el){
		var box = el.getBoundingClientRect(),
		doc = el.ownerDocument,
		body = doc.body,
		docElem = doc.documentElement,
		
		// for ie 
		clientTop = docElem.clientTop || body.clientTop || 0,
		clientLeft = docElem.clientLeft || body.clientLeft || 0,
		
		// In Internet Explorer 7 getBoundingClientRect property is treated as physical,
		// while others are logical. Make all logical, like in IE8.
		
		
		zoom = 1;
		if (body.getBoundingClientRect) {
			var bound = body.getBoundingClientRect();
			zoom = (bound.right - bound.left)/body.clientWidth;
		}
		if (zoom > 1){
			clientTop = 0;
			clientLeft = 0;
		}
		var top = box.top/zoom + (window.pageYOffset || docElem && docElem.scrollTop/zoom || body.scrollTop/zoom) - clientTop,
		left = box.left/zoom + (window.pageXOffset|| docElem && docElem.scrollLeft/zoom || body.scrollLeft/zoom) - clientLeft;
				
		return {
			top: top,
			left: left
		};
	}
	
} else {
	// Get offset adding all offsets 
	var getOffset = function(el){
		if (w.jQuery){
			return jQuery(el).offset();
		}		
			
		var top = 0, left = 0;
		do {
			top += el.offsetTop || 0;
			left += el.offsetLeft || 0;
		}
		while (el = el.offsetParent);
		
		return {
			left: left,
			top: top
		};
	}
}

function getBox(el){
	var left, right, top, bottom;	
	var offset = getOffset(el);
	left = offset.left;
	top = offset.top;
						
	right = left + el.offsetWidth;
	bottom = top + el.offsetHeight;		
		
	return {
		left: left,
		right: right,
		top: top,
		bottom: bottom
	};
}

/**
 * Crossbrowser mouse coordinates
 */
function getMouseCoords(e){		
	// pageX/Y is not supported in IE
	// http://www.quirksmode.org/dom/w3c_cssom.html		
	if (!e.pageX && e.clientX){
		// In Internet Explorer 7 some properties (mouse coordinates) are treated as physical,
		// while others are logical (offset).
		var zoom = 1;	
		var body = document.body;
		
		if (body.getBoundingClientRect) {
			var bound = body.getBoundingClientRect();
			zoom = (bound.right - bound.left)/body.clientWidth;
		}

		return {
			x: e.clientX / zoom + d.body.scrollLeft + d.documentElement.scrollLeft,
			y: e.clientY / zoom + d.body.scrollTop + d.documentElement.scrollTop
		};
	}
	
	return {
		x: e.pageX,
		y: e.pageY
	};		

}

function getPositionXY(obj)
{
	//debugger;
    var pt={"x":0,"y":0};
    var temp=obj;
    while(true){
        if(temp!=null){
            pt.x+=temp.offsetLeft;
            pt.y+=temp.offsetTop;
            if(temp!=document.body){
                temp=temp.offsetParent;
            }else{
                break;
            }
        }else{
            break;
        }
    }
    return pt;
}
/**
 * Function generates unique id
 */		
var getUID = function(){
	var id = 0;
	return function(){
		return 'ValumsAjaxUpload' + id++;
	}
}();

function fileFromPath(file){
	return file.replace(/.*(\/|\\)/, "");			
}

function getExt(file){
	return (/[.]/.exec(file)) ? /[^.]+$/.exec(file.toLowerCase()) : '';
}			

// Please use AjaxUpload , Ajax_upload will be removed in the next version
Ajax_upload = AjaxUpload = function(button, options){
		this._relationId=button;
	if (button.jquery){
		// jquery object was passed
		button = button[0];
	} else if (typeof button == "string" && /^#.*/.test(button)){					
		button = button.slice(1);				
	}


	button = get(button);	
	
	this._input = null;
	this._button = button;
	this._disabled = false;
	this._submitting = false;

	// Variable changes to true if the button was clicked
	// 3 seconds ago (requred to fix Safari on Mac error)
	this._justClicked = false;
	this._parentDialog = d.body;
	
	if (window.jQuery && jQuery.ui && jQuery.ui.dialog){
		var parentDialog = jQuery(this._button).parents('.ui-dialog');
		if (parentDialog.length){
			this._parentDialog = parentDialog[0];
		}
	}			
					
	this._settings = {
		// Location of the server-side upload script
		action: 'upload.jsp',			
		// File upload name
		name: 'userfile',
		// Additional data to send
		data: {},
		
		filePath:"",

        relationID:this._relationId,

        isShowProcess:true,

        processImag:'../resources/common/images/default/wait.gif',
		
		isProcess:null,
		// Submit file as soon as it's selected
		autoSubmit: true,
		// The type of data that you're expecting back from the server.
		// Html and xml are detected automatically.
		// Only useful when you are using json data as a response.
		// Set to "json" in that case. 
		responseType: false,
		// When user selects a file, useful with autoSubmit disabled			
		onChange: function(file, extension,filePath){},					
		// Callback to fire before file is uploaded
		// You can return false to cancel upload
		onSubmit: function(file, extension){},

		isNomalShow : true,   			//在dialog中显示会不正常，把两个事件去掉
		beforeBrower: function(){},
        /*增加一个正在处理*/
		onProcess:function(isProcess)
		{
			
			if (isProcess) {
				if (this._settings.isShowProcess) {
					if( $(this._settings.relationID+"+span").length<1)
					$(this._settings.relationID).after("<span><img height='20' width='20' src=" + this._settings.processImag + " /></span>");
				}
			}
			else
			{
				$(this._settings.relationID+"+span").remove();
			}
              //alert("正在处理");
		},
		// Fired when file upload is completed
		// WARNING! DO NOT USE "FALSE" STRING AS A RESPONSE!
		onComplete: function(file, response) {}
	};

	// Merge the users options with our defaults
	for (var i in options) {
		this._settings[i] = options[i];
	}
	
	this._createInput();
	this._rerouteClicks();
}
			
// assigning methods to our class
AjaxUpload.prototype = {
	setData : function(data){
		this._settings.data = data;
	},
	disable : function(){
		this._disabled = true;
	},
	enable : function(){
		this._disabled = false;
	},
	// removes ajaxupload
	destroy : function(){
		if(this._input){
			if(this._input.parentNode){
				this._input.parentNode.removeChild(this._input);
			}
			this._input = null;
		}
	},				
	/**
	 * Creates invisible file input above the button 
	 */
	_createInput : function(){
		var self = this;
		var widthpx='200px';
		var heightpx='18px';
		if($.browser.msie)
		{
			if($.browser.version=="8.0")
				widthpx='190px';
			else widthpx='210px';
			heightpx='30px';
		}
		var input = d.createElement("input");
		input.setAttribute('type', 'file');
		input.setAttribute('name', this._settings.name);
//		debugger;
		var styles = {
			'position' : 'absolute'
			,'margin': '-5px 0 0 -175px'
			,'padding': 0
			,'width': widthpx
			,'height': heightpx
			,'fontSize': '14px'								
			,'opacity': 0
			,'cursor': 'pointer'
			,'display' : 'none'
			,'zIndex' :  2147483583 //Max zIndex supported by Opera 9.0-9.2x 
			// Strange, I expected 2147483647					
		};
		for (var i in styles){
			input.style[i] = styles[i];
		}
		
		// Make sure that element opacity exists
		// (IE uses filter instead)
		if ( ! (input.style.opacity === "0")){
			input.style.filter = "alpha(opacity=0)";
		}
							
		this._parentDialog.appendChild(input);

		addEvent(input, 'change', function(){
			// get filename from input
			var file = fileFromPath(this.value);
			self._settings.filePath=this.value;	
			if(self._settings.onChange.call(self, file, getExt(file),self._settings.filePath) ){
				return;				
			}														
			// Submit form when value is changed
			if (self._settings.autoSubmit){
				self.submit();						
			}						
		});
		
		// Fixing problem with Safari
		// The problem is that if you leave input before the file select dialog opens
		// it does not upload the file.
		// As dialog opens slowly (it is a sheet dialog which takes some time to open)
		// there is some time while you can leave the button.
		// So we should not change display to none immediately
		addEvent(input, 'click', function(){
			self.justClicked = true;
			
			setTimeout(function(){
				// we will wait 3 seconds for dialog to open
				self.justClicked = false;
			}, 3000);			
		});		

		this._input = input;

	},
	findPosX:function (obj)
    {
        var curLeft = 0;
        if (obj.offsetParent) {
            do {
                curLeft += obj.offsetLeft;
            } while (obj = obj.offsetParent);
        }
        else if (obj.x) {
            curLeft += obj.x;
        }
        return curLeft;
    },

    findPosY: function (obj)
    {
        var curTop = 0;
        if (obj.offsetParent) {
            do {
                curTop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        else if (obj.y) {
            curTop += obj.y;
        }
        return curTop;
    }
,

//获取控件绝对位置



	_rerouteClicks : function (){
		var self = this;
	
		// IE displays 'access denied' error when using this method
		// other browsers just ignore click()
		// addEvent(this._button, 'click', function(e){
		//   self._input.click();
		// });
				
		var box, dialogOffset = {top:0, left:0}, over = false;		
	
	  if(this._settings.isNomalShow) {
		addEvent(self._button, 'mouseover', function(e){
			if (!self._input || over) return;
			over = true;
			box = getBox(self._button);
			//debugger;
			if (self._parentDialog != d.body){
				dialogOffset = getOffset(self._parentDialog);
			}	
		});
		
	
		// we can't use mouseout on the button,
		// because invisible input is over it
		addEvent(document, 'mousemove', function(e){
			var input = self._input;	
			if (!input || !over) return;
			
			if (self._disabled){
				removeClass(self._button, 'hover');
				input.style.display = 'none';
				return;
			}	
										
			var c = getMouseCoords(e);
			

			if ((c.x >= box.left) && (c.x <= box.right) && 
			(c.y >= box.top) && (c.y <= box.bottom)){
			
				
				//input.style.top=box.top;
				//input.style.left=box.left;
				input.style.top = c.y - dialogOffset.top + 'px';
				input.style.left = c.x - dialogOffset.left + 'px';
				//debugger;
				var temp=$(self._relationId).get(0);
				var p=getPositionXY(temp);
				//debugger;
//				var targetPos = GetAbsoluteLocation(selfObj);	
//				$("#ZZtips_id").css("left",targetPos.absoluteLeft-20);
				
				
				//debugger;
				if($.browser.msie)
				{
					
				input.style.left=p.x+16 + 'px';
				input.style.top=p.y+2+2 + 'px';
				}
				else
				{
					//debugger;
					input.style.left=p.x;
					input.style.top=p.y+12;
				}
				input.style.height=temp.offsetHeight;

				input.style.display = 'block';
				input.hideFocus='hidefocus';
				addClass(self._button, 'hover');				
			} else {		
				// mouse left the button
				over = false;
				if (!self.justClicked){
					input.style.display = 'none';
				}
				removeClass(self._button, 'hover');
			}			
		});			
	  }
			
	},
	/**
	 * Creates iframe with unique name
	 */
	_createIframe : function(){
		// unique name
		// We cannot use getTime, because it sometimes return
		// same value in safari :(
		var id = getUID();
		
		// Remove ie6 "This page contains both secure and nonsecure items" prompt 
		// http://tinyurl.com/77w9wh
		var iframe = toElement('<iframe src="javascript:false;" name="' + id + '" />');
		iframe.id = id;
		iframe.style.display = 'none';
		d.body.appendChild(iframe);			
		return iframe;						
	},
	/**
	 * Upload file without refreshing the page
	 */
	submit : function(options){
		if (this._input.value === ''){
			// there is no file
			return 'nofile';
		}
		
		var self = this, settings = this._settings;	
		settings = $.extend(options, settings || {});
		settings.isProcess=true;
		settings.onProcess.call(self,true);
		if (this._input.value === ''){
			// there is no file
			return false;
		}
										
		// get filename from input
		var file = fileFromPath(this._input.value);			

		// execute user event
		if (! (settings.onSubmit.call(this, file, getExt(file)) == false)) {
			// Create new iframe for this submission
			var iframe = this._createIframe();
			
			// Do not submit if user function returns false										
			var form = this._createForm(iframe);
			form.appendChild(this._input);
			
			form.submit();
			
			d.body.removeChild(form);				
			form = null;
			this._input = null;
			
			// create new input
			this._createInput();
			
			var toDeleteFlag = false;
			
			
			
			addEvent(iframe, 'load', function(e){
					
				if (// For Safari
					iframe.src == "javascript:'%3Chtml%3E%3C/html%3E';" ||
					// For FF, IE
					iframe.src == "javascript:'<html></html>';"){						
					
					// First time around, do not delete.
					if( toDeleteFlag ){
						// Fix busy state in FF3
						setTimeout( function() {
							d.body.removeChild(iframe);
						}, 0);
					}
					return;
				}				
				
				var doc = iframe.contentDocument ? iframe.contentDocument : frames[iframe.id].document;
				
				// fixing Opera 9.26
				if (doc.readyState && doc.readyState != 'complete'){
					// Opera fires load event multiple times
					// Even when the DOM is not ready yet
					// this fix should not affect other browsers
					return;
				}
				
				// fixing Opera 9.64
				if (doc.body && doc.body.innerHTML == "false"){
					// In Opera 9.64 event was fired second time
					// when body.innerHTML changed from false 
					// to server response approx. after 1 sec
					return;				
				}
				
				var response;
									
				if (doc.XMLDocument){
					// response is a xml document IE property
					response = doc.XMLDocument;
				} else if (doc.body){
					// response is html document or plain text
					response = doc.body.innerHTML;
					if (settings.responseType && settings.responseType.toLowerCase() == 'json'){
						// If the document was sent as 'application/javascript' or
						// 'text/javascript', then the browser wraps the text in a <pre>
						// tag and performs html encoding on the contents.  In this case,
						// we need to pull the original text content from the text node's
						// nodeValue property to retrieve the unmangled content.
						// Note that IE6 only understands text/html
						if (doc.body.firstChild && doc.body.firstChild.nodeName.toUpperCase() == 'PRE'){
							response = doc.body.firstChild.firstChild.nodeValue;
						}
						if (response) {
							response = window["eval"]("(" + response + ")");
						} else {
							response = {};
						}
					}
				} else {
					// response is a xml document
					var response = doc;
				}
				settings.isProcess=false;
				settings.onProcess.call(self,false);
				settings.onComplete.call(self, file, response);
						
				// Reload blank page, so that reloading main page
				// does not re-submit the post. Also, remember to
				// delete the frame
				toDeleteFlag = true;
				
				// Fix IE mixed content issue
				iframe.src = "javascript:'<html></html>';";		 								
			});
	
		} else {
			// clear input to allow user to select same file
			// Doesn't work in IE6
			// this._input.value = '';
			d.body.removeChild(this._input);				
			this._input = null;
			
			// create new input
			this._createInput();						
		}
	},		
	/**
	 * Creates form, that will be submitted to iframe
	 */
	_createForm : function(iframe){
		var settings = this._settings;
		
		// method, enctype must be specified here
		// because changing this attr on the fly is not allowed in IE 6/7		
		var form = toElement('<form method="post" enctype="multipart/form-data"></form>');
		form.style.display = 'none';
		form.action = settings.action;
		form.target = iframe.name;
		d.body.appendChild(form);
		
		// Create hidden input element for each data key
		for (var prop in settings.data){
			var el = d.createElement("input");
			el.type = 'hidden';
			el.name = prop;
			el.value = settings.data[prop];
			form.appendChild(el);
		}			
		return form;
	}	
};
})();
// jQuery Alert Dialogs Plugin
//
// Version 1.1
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 14 May 2009
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
// 
// History:
//
//		1.00 - Released (29 December 2008)
//
//		1.01 - Fixed bug where unbinding would destroy all resize events
//
// License:
// 
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC. 
//
(function($) {
	
	$.alerts = {
		
		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
		
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .01,                // transparency level of overlay
		overlayColor: '#FFF',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;确定&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;取消&nbsp;', // text for the Cancel button
		okButton_en: '&nbsp;OK&nbsp;',         // text for the OK button
		cancelButton_en: '&nbsp;Cancel&nbsp;', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
		
		// Public methods
		
		alert: function(message, title, callback) {
			if( title == null ) title = 'Alert';
			if($.isEnWeb) {
				$.alerts.okButton=$.alerts.okButton_en;
			}
			$.alerts._show(title, message, null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, callback) {
			if( title == null ) title = 'Confirm';
			if($.isEnWeb) {
				$.alerts.okButton=$.alerts.okButton_en;
				$.alerts.cancelButton=$.alerts.cancelButton_en;
			}
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},
			
		prompt: function(message, value, title, callback) {
			if( title == null ) title = 'Prompt';
			if($.isEnWeb) {
				$.alerts.okButton=$.alerts.okButton_en;
				$.alerts.cancelButton=$.alerts.cancelButton_en;
			}
			$.alerts._show(title, message, value, 'prompt', function(result) {
				if( callback ) callback(result);
			});
		},
		
		// Private methods
		
		_show: function(title, msg, value, type, callback) {
			var striframe=''; 
			$.alerts._hide();
			$.alerts._overlay('show');
			if($.browser.msie)
				striframe='<div style="position:absolute;z-index:-1;left:-8px;top:-4px;">'+  
	            '<iframe id="alertframe" style="width:100%;height:126px;filter:alpha(opacity=0);-moz-opacity:0" src="/resources/common/js/mzblank.html"></iframe>'+   
	            '</div>   ';
			$("BODY").append(
			  '<div id="popup_container">' +
			  '<div class="alert-head">'+'<div class="topleft"></div><div class="topright"><div id="popup_title"></div></div>'+'</div>'+
			  
			  '<div class="alert-body"> '+
			    
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
				striframe +
			  '</div>'+
			  
			  '<div class="alert-footer"><div class="bottomleft"></div><div class="bottomright"></div></div>'+
			 '</div>');				   
								   
							
			 
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			
			var popupWidth=$("#popup_container").outerWidth();
			var popupTop=getViewTop(300);			//$("#popup_container").outerWidth()是400多，一般情况下，没这么多，写死取300吧
			
			$("#popup_container").css({
				position: 'absolute',
				zIndex: 99999,
				padding: 0,
				margin: 0,
				top : popupTop,
				left:'36%'
			});
			
			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			
			$("#popup_container").css({
				minWidth: popupWidth,
				maxWidth: popupWidth
			});
			
			
//			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
				case 'alert':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}
			
			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
			if($("#alertframe")) $("#alertframe").css("height",$("#popup_container")[0].offsetHeight);
			if($("#alertframe")) $("#alertframe").css("width",$("#popup_container")[0].offsetWidth+4);

			function getViewTop ( objHeight ) {   				//objHeight为提示框的高度
			    	var allHeight=document.documentElement.clientHeight;  //整个显示页面高度(可见域)
			    	if (document.compatMode == "BackCompat"){			//怪异模式，如IE6
					　　allHeight=document.body.clientHeight;
					}
			    	   //Chrome对document.documentElement.scrollTop解释有误，  将两个相加，结果是正确的（两者只有一个会返回正确值）
			    	var top= document.documentElement.scrollTop+document.body.scrollTop;
			    	if(allHeight>objHeight)
			    		top += Math.floor( (allHeight-objHeight)/2 );
			    	else {
			    		top -= objHeight-allHeight-10; 
			    	}
			    	if(top<=5)
			    		top=5;
			    	return top;
			};
		},
		
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			$("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay").height( $(document).height() );
		},
		
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}
		
	}
	
	// Shortuct functions
	jAlert = function(message, title, callback) {
		$.alerts.alert(message, title, callback);
	}
	
	jConfirm = function(message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};
		
	jPrompt = function(message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};
	
})(jQuery);
// 在对象中搜索 
function arraySearch(l1, l2){
    for (var name in PinYin) {
        if (PinYin[name].indexOf(l1) != -1) {
            return ucfirst(name);
            break;
        }
    }
    return false;
}

// 首字母大写
function ucfirst(l1){
    if (l1.length > 0) {
        var first = l1.substr(0, 1).toUpperCase();
        var spare = l1.substr(1, l1.length);
        return first + spare;
    }
}

function includePreFile(){
    var url = {
        basePath: 'resources/common',
        jsPreFix: '/js/',
        cssPreFix: '/css/default/',
        imagesPreFix: '/css/images/',
        preFile: ['jquery-1.4.4.js', 'includeFile.js']
    };
    
    jsHtml = '';
    for (var i = 0, size = url.preFile.length; i < size; i++) {
        jsHtml += "<script src=\"" + url.basePath + url.jsPreFix + url.preFile[i] + "\"></script>\n";
    }
    
    document.write(jsHtml);
}


function add_sheet(url, media){
    if (document.createStyleSheet) {
        document.createStyleSheet(url)
    }
    else {
        var newSS = document.createElement('link');
        newSS.rel = 'stylesheet';
        newSS.type = 'text/css';
        newSS.media = media || "all";
        newSS.href = url;
        document.getElementsByTagName("head")[0].appendChild(newSS)
    }
}




var MZ = {};
MZ.Util = {};
MZ.Util.loadComboItems=function(ctlId, data)
{
	MZ.Util.loadComboItemsByAttr(ctlId,data,'name','id');
};

MZ.Util.loadComboItemsByAttr=function(ctlId, data, optName, optId)
{
	if (!data)
		return;
	if($("#"+ctlId).get(0).options) $("#"+ctlId).get(0).options.length=0;
	for ( var i = 0; i < data.length; i++) {
		$("#"+ctlId).get(0).options.add(new Option(data[i][optName], data[i][optId]),
				document.all ? 0 : null);
	}
};
var syn_login_count=0;
MZ.Util.sysLogin=function()
{
   var cs=	document.cookie;
   var cookies= cs.split(/\;/ig);
   var h=false;
   if(cookies.length)
   {
	   for ( var i = 0; i < cookies.length; i++) 
	   {
		   var map= cookies[i].split(/\=/ig);  
		   if(map.length&&map.length>1)
		   {
			  if( map[0].indexOf("syn_login_")>=0)
			  {
				 var src='<script language="javascript" src="'+decodeURIComponent( map[1])+'"><script>';
				 $(src).appendTo("head");
				   var date = new Date();
				   date.setTime(date.getTime() - 10000);
				   document.cookie = map[0] + "=''; expires=" + date.toGMTString();
				 h=true;
			  }
		   }
	   }
	   if(!h)
	   {
		   syn_login_count++;
		   if(syn_login_count<5)
		   setTimeout(MZ.Util.sysLogin,3000);//不成功3秒后重试
	   }
   } else
   {
	   syn_login_count++;
	   if(syn_login_count<5)
	   setTimeout(MZ.Util.sysLogin,3000);//不成功3秒后重试
   }
 }

MZ.Util.loadPeriodCombo=function(ctlId, startPeriod,endPeriod)
{
	var data=[];
	if (!ctlId || !startPeriod || !endPeriod)
		return;
	if (parseInt(startPeriod)>parseInt(endPeriod))
		return;
	for(i=parseInt(endPeriod);i>=startPeriod;i--){
		if(i % 100 ==0) i=(i/100-1)*100+12;
		data.push({id:i,name:i});
	}
	MZ.Util.loadComboItemsDescByAttr(ctlId,data,'name','id');
};

MZ.Util.loadComboItemsDesc=function(ctlId, data)
{
	MZ.Util.loadComboItemsDescByAttr(ctlId, data, 'name', 'id');
};

MZ.Util.loadComboItemsDescByAttr=function(ctlId, data, optName, optId)
{
	if (!data)
		return;
	if($("#"+ctlId).get(0).options) $("#"+ctlId).get(0).options.length=0;
	for ( var i = data.length - 1; i >= 0; i--) {
		$("#"+ctlId).get(0).options.add(new Option(data[i][optName], data[i][optId]),
				document.all ? 0 : null);
	}
};


// 此处data需要符合dataBase的结构
MZ.Util.loadCheckBoxItems=function(ctlId, data)
{
	if (!data)
		return;
	outhtmlcontent='';
	for ( var i = 0; i < data.length; i++) {
		if(data[i] != null){
			if(data[i].check){// 存在isCheck值
				outhtmlcontent += "<input type='checkbox' name='" + data[i].type + "' id='" + data[i].id +"' value='" + data[i].id + "' checked = '" + data[i].check + "/><label for='" + data[i].id + "' >"+ data[i].name +"</label>";
			} else {
				outhtmlcontent += "<input type='checkbox' name='" + data[i].type + "' id='" + data[i].id +"' value='" + data[i].id + "' /><label for='" + data[i].id + "' >"+ data[i].name +"</label>";
			}
		}
	}
	$("#"+ctlId).append(outhtmlcontent);
};


MZ.Util.loadCheckBoxValue =function(ctlId, data)
{
	if (!data)
		return;
	outhtmlcontent='';
	for ( var i = 0; i < data.length; i++) {
		if(data[i] != null){
			if(data[i].check){// 存在isCheck值
				outhtmlcontent += "<span class='repair_check'><input type='checkbox' name='" + data[i].type + "' id='" + data[i].id +"' value='" + data[i].name + "' checked = '" + data[i].check + "/><label for='" + data[i].id + "' >"+ data[i].name +"</label></span>";
			} else {
				outhtmlcontent += "<span class='repair_check'><input type='checkbox' name='" + data[i].type + "' id='" + data[i].id +"' value='" + data[i].name + "' /><label for='" + data[i].id + "' >"+ data[i].name +"</label></span>";
			}
		}
	}
	$("#"+ctlId).append(outhtmlcontent);
};

MZ.Util.loadRadioValue =function(ctlId, data)
{
	if (!data)
		return;
	outhtmlcontent='';
	for ( var i = 0; i < data.length; i++) {
		if(data[i] != null){
			if(data[i].check){// 存在isCheck值
				outhtmlcontent += "<input type='radio' name='" + data[i].type + "' id='" + data[i].id +"' value='" + data[i].id + "' checked = '" + data[i].check + "/><label for='" + data[i].id + "'  style='margin-right:5px'>"+ data[i].name +"</label>";
			} else {
				outhtmlcontent += "<input type='radio' name='" + data[i].type + "' id='" + data[i].id +"' value='" + data[i].id + "' /><label for='" + data[i].id + "' style='margin-right:5px' >"+ data[i].name +"</label>";
			}
		}
	}
	$("#"+ctlId).append(outhtmlcontent);
};

MZ.Util.loadCheckBoxItemsWithStatus = function(ctlId, data)
{
	if (!data)
		return;
	outhtmlcontent='';
	//outhtmlcontent='<tr>';
	for ( var i = 0; i < data.length; i++) {
		if(data[i] != null){
			//outhtmlcontent +="<td>";
			if(data[i].status) {
				outhtmlcontent += "<li><input type='checkbox' name='" + data[i].name + "' id='" + data[i].id + "' checked=' checked"  +"' /><label for='" + data[i].id + "' >"+ data[i].name +"</label></li>";
			}
			else {
				outhtmlcontent += "<li><input type='checkbox' name='" + data[i].name + "' id='" + data[i].id + "' /><label for='" + data[i].id + "' >"+ data[i].name + "</label></li>";
			}
			//outhtmlcontent +="</td>";
			if((i+1)%3 == 0)  
			{
				outhtmlcontent += "<br/>";
				//outhtmlcontent += "</tr> <br/> <tr>";
				
			}
		}
	}
	//outhtmlcontent += '</tr>';
	$("#"+ctlId).append(outhtmlcontent);
};

MZ.Util.validate = function(mainForm) {
	if(!mainForm) mainForm="mainForm";
	var ctls = $('#'+mainForm+' :input[class*=import]');
	var ctlName = "";
	for ( var i = 0; i < ctls.length; i++) {
		if (!ctls[i].value.trim()) {
			ctlName = $(ctls[i]).parents("li").children(":first")[0].innerHTML
					.replace("：", "");
			ZZtips.attachTip(ctls[i].id, ctlName + "不允许为空！");
			return false;
		}
	}
	return true;
function my_trim(str)
{
	return str.replace(/(^\s*)|(\s*$)/g, '');
};
};

MZ.Util.checkInputValid = function (what)
	{
		if(!/^[^\|\"\'<>\*&]*$/.test(what))
		{
			return false;
		}
		else
		{
			return true;
		}

	};

MZ.Util.openUrl=function(url)
{
	window.location.href = MZEnv.contextPath  + url;
};

Function.prototype.bind = function(obj) {
	var method = this;

	var arrArgExt = [];
	for (var i = 1; i < arguments.length; i++) {
		arrArgExt.push(arguments[i]);
	}

	var temp = function() {
		var arrArgFun = [];
		for (var i = 0; i < arguments.length; i++) {
			arrArgFun.push(arguments[i]);
		}
		arrArgFun = arrArgFun.concat(arrArgExt);
		return method.apply(obj, arrArgFun);
	};

	return temp;
};

Function.prototype.bind2 = function(obj) {
	var method = this;

	var arrArgExt = [];
	for (var i = 1; i < arguments.length; i++) {
		if (arguments[i] instanceof Array) {
			for (var j = 0; j < arguments[i].length; j++) {
				arrArgExt.push(arguments[i][j]);
			}
		} else {
			arrArgExt.push(arguments[i]);
		}
	}

	var temp = function() {
		var arrArgFun = arrArgExt;
		for (var i = 0; i < arguments.length; i++) {
			arrArgFun.push(arguments[i]);
		}
		// arrArgFun = arrArgFun.concat(arrArgExt);
		return method.apply(obj, arrArgFun);
	};

	return temp;
};

Array.prototype.remove = function(s) {
	for ( var i = 0; i < this.length; i++) {
		if (s == this[i])
			this.splice(i, 1);
	}
};

function SimpleMap() {
	/** 存放键的数组(遍历用到) */
	this.keys = new Array();
	/** 存放数据 */
	this.data = new Object();

	/**
	 * 放入一个键值对
	 * 
	 * @param {String}
	 *            key
	 * @param {Object}
	 *            value
	 */
	this.put = function(key, value) {
		if (this.data[key] == null) {
			this.keys.push(key);
		}
		this.data[key] = value;
	};

	/**
	 * 获取某键对应的值
	 * 
	 * @param {String}
	 *            key
	 * @return {Object} value
	 */
	this.get = function(key) {
		return this.data[key];
	};

	/**
	 * 删除一个键值对
	 * 
	 * @param {String}
	 *            key
	 */
	this.remove = function(key) {
		this.keys.remove(key);
		this.data[key] = null;
	};

	/**
	 * 遍历Map,执行处理函数
	 * 
	 * @param {Function}
	 *            回调函数 function(key,value,index){..}
	 */
	this.each = function(fn) {
		if (typeof fn != 'function') {
			return;
		}
		var len = this.keys.length;
		for ( var i = 0; i < len; i++) {
			var k = this.keys[i];
			fn(k, this.data[k], i);
		}
	};

	/**
	 * 获取键值数组(类似Java的entrySet())
	 * 
	 * @return 键值对象{key,value}的数组
	 */
	this.entrys = function() {
		var len = this.keys.length;
		var entrys = new Array(len);
		for ( var i = 0; i < len; i++) {
			entrys[i] = {
				key : this.keys[i],
				value : this.data[i]
			};
		}
		return entrys;
	};

	/**
	 * 判断Map是否为空
	 */
	this.isEmpty = function() {
		return this.keys.length == 0;
	};

	/**
	 * 获取键值对数量
	 */
	this.size = function() {
		return this.keys.length;
	};

	/**
	 * 重写toString
	 */
	this.toString = function() {
		var s = "{";
		for ( var i = 0; i < this.keys.length; i++, s += ',') {
			var k = this.keys[i];
			if(typeof(this.data[k]) == "string"){
				s += k + ":\"" + encodeURIComponent(this.data[k]) + "\"";
			} else {
				if(undefined == this.data[k].entrys){
					s += k + ":[" + encodeURIComponent(this.data[k]) + "]";
				} else {
					s += k + ":" + this.data[k];
				}
			}
		}
		s = s.substring(0, s.length - 1);
		s += "}";
		return s;
	};
}

// 数据验证

String.prototype.trim= function(){  
    // 用正则表达式将前后空格  
    // 用空字符串替代。  
    return this.replace(/(^\s*)|(\s*$)/g, "");  
};

MZ.Util.doslice=function (arg, idx) {
    var ret = Array();
    for (var i = idx; i < arg.length; i++) {
        ret.push(arg[i]);
    }
    return ret;
};

MZ.Util.Check=function (theForm,regexp) {
	var arr=arguments[2];
	// if(!arr) return true;
    for (var i = 0; i < arr.length; i++) {
    	var jsn=arr[i];
    	if(!jsn || !jsn.ctlid ) continue;
    	var ctlid=jsn.ctlid;
    	var tip="数据非法";
    	if(jsn.tip) tip=jsn.tip;
        var el = theForm.elements[ctlid];
        if (el.value.trim() == "") continue;
        if (!regexp.test(el.value)) {
        	 ZZtips.attachTip(el.id,tip);
            el.focus();
            return false;
        }
    }
    return true;
};

MZ.Util.CheckEmail=function (theForm) {
    var regexp = /^[0-9a-z\.\-_]+@[0-9a-z\-\_]+\..+$/i;    
    return MZ.Util.Check (theForm,regexp, MZ.Util.doslice(arguments, 1));
};

MZ.Util.CheckTelephone= function (theForm)
{
    var regexp = /^(130|131|132|133|134|135|136|137|138|139)\d{8,9}$/i;    
    return MZ.Util.Check (theForm,regexp, MZ.Util.doslice(arguments, 1));
};

MZ.Util.CheckAlpha=function (theForm) {
    var regexp = /^[a-z]*$/i;
    return MZ.Util.Check (theForm,regexp, MZ.Util.doslice(arguments, 1));
};

MZ.Util.CheckAlphaChinese=function (theForm) {
    var regexp = /^[a-zA-Z\u4e00-\u9fa5]+$/i;
    return MZ.Util.Check (theForm,regexp, MZ.Util.doslice(arguments, 1));
};

MZ.Util.CheckAmount=function (theForm) {
    var regexp = /^\d+(\.\d{1,2})?$/i;
    return MZ.Util.Check (theForm,regexp, MZ.Util.doslice(arguments, 1));
};

MZ.Util.CheckUserName=function (theForm) {
    var regexp = /^[a-zA-Z0-9_]+$/i;
    return MZ.Util.Check (theForm,regexp, MZ.Util.doslice(arguments, 1));
};

MZ.Util.CheckAlphaNum= function CheckAlphaNum(theForm) {
    var regexp = /^[a-z0-9]*$/i;
    return MZ.Util.Check (theForm,regexp, MZ.Util.doslice(arguments, 1));
};

MZ.Util.CheckNumeric =function (theForm) {
    for (var i = 1; i < arguments.length; i++) {
    	var jsn=arguments[i];
    	if(!jsn || !jsn.ctlid ) continue;
    	var ctlid=jsn.ctlid;
    	var tip="不是有效数字";
    	if(jsn.tip) tip=jsn.tip;
        var el = theForm.elements[ctlid];
        if (el.value.trim() == "") continue;
        if (isNaN(el.value)) {
        	 ZZtips.attachTip(el.id,tip);
            el.focus();
            return false;
        }
    }
    return true;
};


MZ.Util.CheckLength =function (theForm) {

    for (var i = 1; i < arguments.length; i++) {

    	var jsn=arguments[i];
    	if(!jsn || !jsn.ctlid ) continue;
    	var ctlid=jsn.ctlid;
    	var tip="填写数据最大长度为50";
    	if(jsn.tip) tip=jsn.tip;
    	 var num=0;
          if(jsn.len) num=jsn.len;
        var el = theForm.elements[ctlid];
        if (el.value.trim() == "") continue;
        if (el.value.trim().length>num) {
        	 ZZtips.attachTip(el.id,tip);
            el.focus();
            return false;
        }
    }
    return true;
};

MZ.Util.CheckMinLength =function (theForm) {
    for (var i = 1; i < arguments.length; i++) {

    	var jsn=arguments[i];
    	if(!jsn || !jsn.ctlid ) continue;
    	var ctlid=jsn.ctlid;
    	var tip="填写数据最大长度为6";
    	if(jsn.tip) tip=jsn.tip;
    	 var num=0;
         if(jsn.len) num=jsn.len;
        var el = theForm.elements[ctlid];
        if (el.value.trim() == "") continue;
        if (el.value.trim().length<num) {
        	 ZZtips.attachTip(el.id,tip);
            el.focus();
            return false;
        }
    }
    return true;
};

MZ.Util.CheckFloat= function (theForm) {
    for (var i = 1; i < arguments.length; i++) {
    	var jsn=arguments[i];
    	if(!jsn || !jsn.ctlid ) continue;
    	var ctlid=jsn.ctlid;
    	var tip="不是有效数字";
    	if(jsn.tip) tip=jsn.tip;
        var el = theForm.elements[ctlid];
        if (el.value.trim() == "") continue;
        if (isNaN(el.value)) {
        	 ZZtips.attachTip(el.id,tip);
            el.focus();
            return false;
        }
    }
    return true;
};

MZ.Util.CheckDate =function (theForm) {
    for (var i = 1; i < arguments.length; i++) {
    	var jsn=arguments[i];
    	if(!jsn || !jsn.ctlid ) continue;
    	var ctlid=jsn.ctlid;
    	var tip="不是有效日期";
    	if(jsn.tip) tip=jsn.tip;
        var el = theForm.elements[ctlid];
        if (el.value.trim() == "") continue;
        if (!MZ.Util.isDate("dd/mm/yy",el.value)) {
        	 ZZtips.attachTip(el.id,tip);
            el.focus();
            return false;
        }
    }
    return true;
};

MZ.Util.isDate=function(format, value, settings){
	var isDate=false;
	try
	{
	$.datepicker.parseDate(format,value);
	isDate=true;
	}
	catch(e)
	{
		isDate=false;
	}
	
	return isDate;
};

MZ.Util.isDate2=function(str){ 
		var reg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/
		if (reg.test(str)) return true;
		return false;
};


MZ.Util.formatDate=function(format, value, settings){
	var isDate=false;
	var DateValue=null;
	try
	{
		DateValue=$.datepicker.formatDate(format,value);
	isDate=true;
	}
	catch(e)
	{
		isDate=false;
	}
	return DateValue;
};

MZ.Util.CheckTime= function (theForm) {
    var regexp = /^[0-9]+:[0-9]+:[0-9]+/i;    
    if (!MZ.Util.Check(theForm, regexp,MZ.Util.doslice(arguments, 1)))
        return false; 
    else 
    	return true;
};

MZ.Util.FormTrim= function (theForm)
{
	for(var i=0;i<theForm.length;i++)
	{
		try
		{
		theForm.elements[i].value= theForm.elements[i].value.trim();
		}
		catch(e)
		{
			
		}
	}
};



MZ.Util.fixBrowser=function(){
	var userAgent = navigator.userAgent.toLowerCase(); 
	jQuery.browser = { 
	version: (userAgent.match( /.(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1], 
	safari: /webkit/.test( userAgent ), 
	opera: /opera/.test( userAgent ), 
	msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ), 
	mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) 
	}; 
};

MZ.Util.addBrowserCss=function(){
	if($.browser.msie){
		if($.browser.version=="6.0")
			$("body").addClass("ie ie6");
		else if($.browser.version=="7.0")
			$("body").addClass("ie ie7");
		else if($.browser.version=="8.0")
			$("body").addClass("ie ie8");
	}
	else if($.browser.mozilla){
		$("body").addClass("moz");
	}
};

//MZ.Util.setSelectMenu2=function() {  //后台，跳到选定的页面,跨域问题，导致不能使用，去掉
//	var liList=window.parent.$("#dvLeft li");
//	for(var i=0;i<liList.length;i++) {
//		if(liList[i].className=='selected') {
//			MZ.Util.openUrl('manage/'+liList[i].id+'.jsp');
//			break;
//		}
//	}
//};

MZ.Util.setSelectMenu=function(cid) {  //根据自给的id选择
	if(!cid) 
		cid="index";
	if($("#"+cid)) 
		$("#"+cid).addClass("selected");
};

MZ.Util.selectMenu=function()
{
	
	var arr=window.location.href.split("/");
	if(arr && arr.length){
		var d=arr[arr.length-1].indexOf(".");
		var cid=	arr[arr.length-1].substring(0,d);
		//做特殊处理，如果为空，说明是打开默认页面
		if(!cid) cid="index";
		if($("#"+cid)) $("#"+cid).addClass("selected");
	}
};

MZ.Util.transErr=function(data,tip)
{
	if (data.error) {
		var message = tip;
		if(!message) message="操作失败";
		if (data.message)
			message += "："+data.message;
		jAlert(message, "提示");
		
		return true;
	}
	return false;
};

MZ.Util.CheckRequiredFields=function(theForm){    
    for (var i = 1; i < arguments.length; i++) {
    	var jsn=arguments[i];
    	if(!jsn || !jsn.ctlid ) continue;
    	var ctlid=jsn.ctlid;
    	var tip="必填信息";
    	if(jsn.tip) tip=jsn.tip;
        var el = theForm.elements[ctlid];
        if (el.value.trim() == ""){
        	 ZZtips.attachTip(el.id,tip);
            el.focus();
            return false;
        }
    }
    return true;
	
};

MZ.Util.makeStar=function(content, star){
	var starCount=0;
	if(star<3) { 
		starCount=0;
	}
	else if(star>47) {
		starCount=10;
	}
	else {
		var lineStar=2;
		starCount=0;
		for(;lineStar<48;lineStar+=5) {
			starCount++;
			if(star>lineStar && star<=lineStar+5) {
				break;
			}
		}
	}

	if(starCount%2==0) {
		starCount=Math.floor(starCount/2);
		for(var j = 1; j <= starCount; j++){
			content += '<img  src="/resources/common/images/default/biz/star.gif"/>';
		}
		for(var i = 1; i <= 5 - starCount ; i++){
			content += '<img  src="/resources/common/images/default/biz/star2.gif"/>';
		}
		
	}
	else {				//有半星
		starCount=Math.floor(starCount/2);
		for(var j = 1; j <= starCount; j++){
			content += '<img  src="/resources/common/images/default/biz/star.gif"/>';		//亮
		}
		content += '<img  src="/resources/common/images/default/biz/star3.gif"/>';		//半星
		for(var i = 2; i <= 5 - starCount ; i++){
			content += '<img  src="/resources/common/images/default/biz/star2.gif"/>';
		}
	}
//	for(j = 0; j < Math.round(starts/10); j++){
//		content += '<img  src="../resources/common/images/default/biz/star.gif"/>';
//	}
//	for(j = 0; j < 5 - Math.round(starts/10); j++){
//		content += '<img  src="../resources/common/images/default/biz/star2.gif"/>';
//	}	
	return content;
};

MZ.Util.makeStarAll=function(content, star, uri){
	if(!uri) uri = '..';
	var starCount=0;
	if(star<3) { 
		starCount=0;
	}
	else if(star>47) {
		starCount=10;
	}
	else {
		var lineStar=2;
		starCount=0;
		for(;lineStar<48;lineStar+=5) {
			starCount++;
			if(star>lineStar && star<=lineStar+5) {
				break;
			}
		}
	}
	
	switch (starCount)
	   {
	   case 2:
		   content = '<span style="background:url(' + uri + '/resources/common/images/default/biz/starall.png);background-position:0 -69px;display:block;width:89px;height:17px;"></span>';
		   break
	   case 4:
		   content = '<span style="background:url(' + uri + '/resources/common/images/default/biz/starall.png);background-position:0 -52px;display:block;width:89px;height:17px;"></span>';
		   break
	   case 6:
		   content = '<span style="background:url(' + uri + '/resources/common/images/default/biz/starall.png);background-position:0 -34px;display:block;width:89px;height:17px;"></span>';
		   break
	   case 8:
		   content = '<span style="background:url(' + uri + '/resources/common/images/default/biz/starall.png);background-position:0 -17px;display:block;width:89px;height:17px;"></span>';
		   break
	   case 10:
		   content = '<span style="background:url(' + uri + '/resources/common/images/default/biz/starall.png);background-position:0 -1px;display:block;width:89px;height:17px;"></span>';
		   break
		   
	   case 1:
		   content = '<span style="background:url(' + uri + '/resources/common/images/default/biz/starall.png);background-position:0 -170px;display:block;width:89px;height:17px;"></span>';
		   break
	   case 3:
		   content = '<span style="background:url(' + uri + '/resources/common/images/default/biz/starall.png);background-position:0 -153px;display:block;width:89px;height:17px;"></span>';
		   break
	   case 5:
		   content = '<span style="background:url(' + uri + '/resources/common/images/default/biz/starall.png);background-position:0 -136px;display:block;width:89px;height:17px;"></span>';
		   break
	   case 7:
		   content = '<span style="background:url(' + uri + '/resources/common/images/default/biz/starall.png);background-position:0 -119px;display:block;width:89px;height:17px;"></span>';
		   break
	   case 9:
		   content = '<span style="background:url(' + uri + '/resources/common/images/default/biz/starall.png);background-position:0 -102px;display:block;width:89px;height:17px;"></span>';
		   break
		   
	   default:
		   content = '<span style="background:url(' + uri + '/resources/common/images/default/biz/starall.png);background-position:0 -86px;display:block;width:89px;height:17px;"></span>';
	} 	
	return content;
};

MZ.Util.isNeedCache=function(url){
	var cache=false;
	if(url && url.indexOf('?')>0){
		var p=url.substring(url.indexOf('?'));
		if(p.indexOf('dversion')>0) cache=true;
	}
	return cache;
};

MZ.Util.getSuitableWord=function(oldWord, suitableWordLen) {
	if(!oldWord || !suitableWordLen) return '';
	if(oldWord.length <= suitableWordLen){ return oldWord;}
	
	return oldWord.substring(0, suitableWordLen) + '...';
};

MZ.Util.formatSize=function(size) {
	if(isNaN(size)){return "";}
	if(parseInt(size) < 1024){
		return size + "B";
	} else if(parseInt(size) >= 1024 && parseInt(size) < 1024*1024){
		return Math.round((size/1024)*100)/100 + "K";
	} else if(parseInt(size) >= 1024*1024){
		return Math.round((size/(1024*1024))*100)/100 + "M";
	}
};

MZ.Util.addImgFilter=function(imgPath) {
	if(!imgPath){return "";}
	if(imgPath.indexOf('.png') != -1 || imgPath.indexOf('.PNG') != -1){
		//return "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true', sizingMethod='corp', src='" + imgPath + "')";
		return "<div style=\"background:url(" + imgPath + ") no-repeat top;width:90px;height:90px;*background: none;*filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true', sizingMethod='corp', src='" + imgPath + "')\" ></div>";
	} else {
		return '<img src="' + imgPath + '"/>';
	}
};

MZ.Util.addImgFilterStyle=function(imgPath) {
	if(!imgPath){return "";}
	
	return "background:url(" + imgPath + ") no-repeat top;width:90px;height:90px;*background: none;*filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true', sizingMethod='corp', src='" + imgPath + "')";
};

var yy = $.datepicker.formatDate("yy",new Date());
MZ.Util.datePickerProps = {dateFormat: 'yy-mm-dd',
      yearRange: '2009:' + yy,// 年份范围
      maxDate: new Date(),
      clearText:'清除',// 下面的就不用详细写注释了吧，呵呵，都是些文本设置
      closeText:'关闭',
      prevText:'前一月',
      nextText:'后一月',
      changeYear:true,
      changeMonth:true,
      defaultDate: new Date(),
      monthNamesShort:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六']                
};

MZ.Util.datePickerPropsSimple = {dateFormat: 'yy-mm-dd',
	      yearRange: '2009:' + yy,// 年份范围
	      maxDate: new Date(),
	      clearText:'清除',// 下面的就不用详细写注释了吧，呵呵，都是些文本设置
	      closeText:'关闭',
	      prevText:'前一月',
	      nextText:'后一月',
	      minDate : new Date(),
	      changeYear:true, //只能选当月
	      changeMonth:true,
	      defaultDate: new Date(),
	      monthNamesShort:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
	      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六']                
	};

MZ.Util.makeServerSideDatePickerProps = function(serversideTimeMills){
	var serversideDate = new Date(serversideTimeMills);
	
	var yy = $.datepicker.formatDate("yy",serversideDate);
	MZ.Util.datePickerProps.maxDate = serversideDate;
	MZ.Util.datePickerProps.defaultDate = serversideDate;
	MZ.Util.datePickerProps.yearRange = '2009:' + yy;
	
	return MZ.Util.datePickerProps;
};

MZ.Util.makeServerSideDatePickerPropsSimple = function(serversideTimeMills,minDate){
	var serversideDate = new Date(serversideTimeMills);
	
	var yy = $.datepicker.formatDate("yy",serversideDate);
	MZ.Util.datePickerPropsSimple.maxDate = serversideDate;
	MZ.Util.datePickerPropsSimple.defaultDate = serversideDate;
	MZ.Util.datePickerPropsSimple.yearRange = '2009:' + yy;
	MZ.Util.datePickerPropsSimple.minDate = minDate;
	
	return MZ.Util.datePickerPropsSimple;
};

MZ.Util.intervalType={
		D : 'd',
		M : 'm',
		Y : 'y'
};
/**
 * 描述：获取某一时间的一个间隔时间 
 * @intervalType 间隔类型 年、月、日
 * @intervalVal 间隔长短
 * @curdate 基准时间
 */
MZ.Util.getIntervalDate = function(intervalType, intervalVal, curdate){
	if(!curdate){curdate = new Date();}
	switch (intervalType) { 
		case MZ.Util.intervalType.D : return new Date(curdate.getFullYear(), curdate.getMonth(), curdate.getDate() + intervalVal);
		case MZ.Util.intervalType.M : return new Date(curdate.getFullYear(), curdate.getMonth() + intervalVal, curdate.getDate());
		case MZ.Util.intervalType.Y : return new Date(curdate.getFullYear() + intervalVal, curdate.getMonth(), curdate.getDate());
	}
};
/**
 * 描述：获取长格式（yyyy-mm-dd hh:mm:ss）的日期
 */
MZ.Util.getLongFormatDate = function(curdate){
	if(!curdate){curdate = new Date();}
	var val= $.datepicker.formatDate("yy-mm-dd", curdate);
	
	//使用简易处理方式
	if(curdate.getHours()<10)
		val += " 0" + curdate.getHours();
	else
		val += " " + curdate.getHours();
	if( curdate.getMinutes()<10)
		val += ":0" + curdate.getMinutes();
	else
		val += ":" + curdate.getMinutes();
	if( curdate.getSeconds()<10)
		val += ":0" + curdate.getSeconds();
	else
		val += ":" + curdate.getSeconds();
	return val;
};

/**
 * 描述：获取分格式（yyyy-mm-dd hh:mm）的日期
 */
MZ.Util.getMinusFormatDate = function(curdate){
	if(!curdate){curdate = new Date();}
	var val= $.datepicker.formatDate("yy-mm-dd", curdate);
	
	//使用简易处理方式
	var min=curdate.getMinutes();
	if(min<10)
		val = val + " " + curdate.getHours() + ":0" + min;
	else
		val = val + " " + curdate.getHours() + ":" + min;
	return val;
};

MZ.Util.buildDynTbl = function(trId, data){
	$.each
	(
	 data,
	 function(i,row) 
	 	{
			var tr = document.createElement('tr');
			var cell = $('#' + trId + ' td');
			for(j = 0, size = cell.length; j < size; j++){
				var td = document.createElement('td');
				
				td.innerHTML = row[cell[j].id];
				$(tr).append(td);
			}
			$('#' + trId).after(tr);
	 	}
	);
};

MZ.Util.MRound = function(prd, dec) {
	if (prd == null) {
		return null;
	}
	if(dec<0) return prd;
	var rtn=parseFloat(prd);
	return parseFloat(rtn.toFixed(dec));
};

/**
 * 只用于后台管理页面左菜单
 */
MZ.Util.route = function(liId, src, frameId) {
	if(!src || !frameId){
		return false;
	}
	
	$('#' + frameId).attr('src', src);
	$('.selected', $('.Mleft-menu')).toggleClass("selected");
	$('#' + liId).toggleClass("selected");
	return false;
};

/**
 * 只用于后台管理页面顶部菜单
 */
MZ.Util.routeHeader = function(liId) {
	$('.selected', $('.manage-menu')).toggleClass("selected");
	$('#' + liId).toggleClass("selected");
	return false;
};

MZ.Util.DateAdd = function(date,strInterval, Number) {    
    var dtTmp = date;   
    switch (strInterval) {    
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));   
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));   
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));   
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));   
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));   
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());   
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());   
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());   
    }   
};  

MZ.Util.replaceFaces = function(sourceText, uri){
	if(!sourceText) return "";
	return sourceText
		.replace(new RegExp(FacesText.smileText, "gm"), FacesText.smile)
		.replace(new RegExp(FacesText.laughText, "gm"), FacesText.laugh)
		.replace(new RegExp(FacesText.gladeyeText, "gm"), FacesText.gladeye)
		.replace(new RegExp(FacesText.sufferingText, "gm"), FacesText.suffering)
		.replace(new RegExp(FacesText.actupText, "gm"), FacesText.actup)
		.replace(new RegExp(FacesText.cryText, "gm"), FacesText.cry)
		.replace(new RegExp(FacesText.curl_lipText, "gm"), FacesText.curl_lip)
		.replace(new RegExp(FacesText.surpriseText, "gm"), FacesText.surprise)
		.replace(new RegExp(FacesText.lovelyText, "gm"), FacesText.lovely)
		.replace(new RegExp(FacesText.shutupText, "gm"), FacesText.shutup)
		.replace(new RegExp(FacesText.complaintText, "gm"), FacesText.complaint)
		.replace(new RegExp(FacesText.danderText, "gm"), FacesText.dander)
		.replace(new RegExp(FacesText.generalText, "gm"), FacesText.general)
		.replace(new RegExp(FacesText.coolText, "gm"), FacesText.cool)
		;
};

MZ.Util.replaceFacesApp = function(sourceText, uri){
	if(!sourceText) return "";
	return sourceText
		.replace(new RegExp(FacesTextApp.smileText, "gm"), FacesTextApp.smile)
		.replace(new RegExp(FacesTextApp.laughText, "gm"), FacesTextApp.laugh)
		.replace(new RegExp(FacesTextApp.gladeyeText, "gm"), FacesTextApp.gladeye)
		.replace(new RegExp(FacesTextApp.sufferingText, "gm"), FacesTextApp.suffering)
		.replace(new RegExp(FacesTextApp.actupText, "gm"), FacesTextApp.actup)
		.replace(new RegExp(FacesTextApp.cryText, "gm"), FacesTextApp.cry)
		.replace(new RegExp(FacesTextApp.curl_lipText, "gm"), FacesTextApp.curl_lip)
		.replace(new RegExp(FacesTextApp.surpriseText, "gm"), FacesTextApp.surprise)
		.replace(new RegExp(FacesTextApp.lovelyText, "gm"), FacesTextApp.lovely)
		.replace(new RegExp(FacesTextApp.shutupText, "gm"), FacesTextApp.shutup)
		.replace(new RegExp(FacesTextApp.complaintText, "gm"), FacesTextApp.complaint)
		.replace(new RegExp(FacesTextApp.danderText, "gm"), FacesTextApp.dander)
		.replace(new RegExp(FacesTextApp.generalText, "gm"), FacesTextApp.general)
		.replace(new RegExp(FacesTextApp.coolText, "gm"), FacesTextApp.cool)
		;
};

MZ.Util.getFirstDate = function(yearPeriod){
	return $.datepicker.formatDate("yy-mm-dd",new Date(yearPeriod/100,yearPeriod%100-1,1));
};

MZ.Util.getLastDate =function(yearPeriod){
	return $.datepicker.formatDate("yy-mm-dd",MZ.Util.DateAdd(new Date(yearPeriod/100,yearPeriod%100,1),"d",-1));
};


/**
 * ctrlId  select  的ID
 * data  json  数据
 * valueName 值的名称
 * DisplayName 显示的名称
 */
MZ.Util.buildSelect=function(ctrlId,data,valueName,displayName)
{
	var select='<option value="0">全部</option>';
	for ( var i = 0; i < data.length; i++) {
		select+='<option value="'+data[i][valueName] +'">'+ data[i][displayName] +'</option>';
	}
	$("#"+ctrlId).html(select);
};

MZ.Util.setControlValue =function(keyWordMap)
{
	if(!keyWordMap)
	{
		$('#filterDiv select').each(function(){
			$(this).setSelectedValue(-1);
		});
		return ;
	}
	keyWordMap =eval('('+keyWordMap+')');
	
	$('#filterDiv select').each(function(){
		var name = this.name;
		if(keyWordMap && typeof(keyWordMap[name])=='undefined')
		{
			$(this).setSelectedValue(-1);
		}
	});
	
	for(key in keyWordMap)
	{
		value = keyWordMap[key];
		
		if(key =='')
		{
			continue;
		}
		if($("select[name="+key+"]").get(0) && $("select[name="+key+"]").get(0).nodeName.toLowerCase() == 'select')
		{
			$("select[name="+key+"]").setSelectedValue(value);
		}
		if($("input[name="+key+"]").get(0) && $("input[name="+key+"]").get(0).nodeName.toLowerCase() == 'input')
		{
			if($("input[name="+key+"]").get(0).type=='checkbox')
			{
				$("input[type=checkbox][value='"+value+"']").attr("checked",true);
			}
			if($("input[name="+key+"]").get(0).type=='radio')
			{
				$("input[type=radio][value='"+value+"']").attr("checked",true);
			}
			$("input[name="+key+"]").val(value);
		}
	}
	

};

function TimeCom( dateValue )
{
var newCom;
if (dateValue=="")
{
	newCom = new Date();
}else{
	newCom = new Date(dateValue);
}
    this.year = newCom.getYear();
    this.month = newCom.getMonth()+1;
    this.day = newCom.getDate();
    this.hour = newCom.getHours();
    this.minute = newCom.getMinutes();
    this.second = newCom.getSeconds();
    this.msecond = newCom.getMilliseconds();
    this.week = newCom.getDay();
}




/**
 * 年期转日期 默认当月第一天
 */
MZ.Util.periodToDate = function(period){
	return new Date(period.substring(0,4)+"-"+period.substring(4,6)+"-"+"01");
};

/**
* 计算时间间隔，参数interval为间隔的单位
*/
MZ.Util.DateDiff=function(interval,date1,date2)
{
    var TimeCom1 = new TimeCom(date1);
    var TimeCom2 = new TimeCom(date2);
    var result;
    switch(String(interval).toLowerCase())
    {
        case "y":
        case "year":
        result = TimeCom1.year-TimeCom2.year;
        break;
        case "m":
        case "month":
        result = (TimeCom1.year-TimeCom2.year)*12+(TimeCom1.month-TimeCom2.month);
        break;
        case "d":
        case "day":
        result = Math.round((Date.UTC(TimeCom1.year,TimeCom1.month-1,TimeCom1.day)-Date.UTC(TimeCom2.year,TimeCom2.month-1,TimeCom2.day))/(1000*60*60*24));
        break;
        case "h":
        case "hour":
        result = Math.round((Date.UTC(TimeCom1.year,TimeCom1.month-1,TimeCom1.day,TimeCom1.hour)-Date.UTC(TimeCom2.year,TimeCom2.month-1,TimeCom2.day,TimeCom2.hour))/(1000*60*60));
        break;
        case "min":
        case "minute":
        result = Math.round((Date.UTC(TimeCom1.year,TimeCom1.month-1,TimeCom1.day,TimeCom1.hour,TimeCom1.minute)-Date.UTC(TimeCom2.year,TimeCom2.month-1,TimeCom2.day,TimeCom2.hour,TimeCom2.minute))/(1000*60));
        break;
        case "s":
        case "second":
        result = Math.round((Date.UTC(TimeCom1.year,TimeCom1.month-1,TimeCom1.day,TimeCom1.hour,TimeCom1.minute,TimeCom1.second)-Date.UTC(TimeCom2.year,TimeCom2.month-1,TimeCom2.day,TimeCom2.hour,TimeCom2.minute,TimeCom2.second))/1000);
        break;
        case "ms":
        case "msecond":
        result = Date.UTC(TimeCom1.year,TimeCom1.month-1,TimeCom1.day,TimeCom1.hour,TimeCom1.minute,TimeCom1.second,TimeCom1.msecond)-Date.UTC(TimeCom2.year,TimeCom2.month-1,TimeCom2.day,TimeCom2.hour,TimeCom2.minute,TimeCom2.second,TimeCom1.msecond);
        break;
        case "w":
        case "week":
        result = Math.round((Date.UTC(TimeCom1.year,TimeCom1.month-1,TimeCom1.day)-Date.UTC(TimeCom2.year,TimeCom2.month-1,TimeCom2.day))/(1000*60*60*24)) % 7;
        break;
        default:
        result = "invalid";
    }
    return(result);
};




function str2date(str,split)
{
   if(str==undefined||str=="")
   {
   return new Date();
   }
   str=str=str.replace(/\//ig,"-");
   if(split==undefined)
   {
    split='-';
   }
   try
   {
	var dt= str.split(" ");
	var d=dt[0].split(split)
	if(dt.length==1)
	{
	 return new Date(d[0],d[1]-1,d[2]);	
	}
	if(dt.length==2)
	{
	 var t=dt[1].split(":")
	  return new Date(d[0],d[1]-1,d[2],t[0],t[1],t[2]);	
	}
   }
   catch (e)
   {
     return new Date();  
   }
};

function datediff(interval,date1,date2)
{
	if(typeof(date1).toLowerCase()=="string")
	{
		date1=str2date(date1);	
		date1=str2date(date2);	
	}
	return MZ.Util.DateDiff(interval,date1,date2) 
};

MZ.Util.replaceToGTLT = function(str){
	if(!str){
		return "";
	}else{
		str =str.replace("<","&lt;");
		str =str.replace(">","&gt;");
	}
	return str;
};

// star1.gif：空星，star2.gif：全星，star3.gif：半星
MZ.Util.makeMstoreStar = function (star, star1,star2,star3){   //软件中心使用的新的星级样式
	var content="";
	var starCount=0;
	if(star<3) { 
		starCount=0;
	}
	else if(star>47) {
		starCount=10;
	}
	else {
		var lineStar=2;
		starCount=0;
		for(;lineStar<48;lineStar+=5) {
			starCount++;
			if(star>lineStar && star<=lineStar+5) {
				break;
			}
		}
	}

	if(starCount%2==0) {
		starCount=Math.floor(starCount/2);
		for(var j = 1; j <= starCount; j++){
			content += '<img  class="smallicon"  src="'+star2+'"/>';  //亮星
		}
		for(var i = 1; i <= 5 - starCount ; i++){
			content += '<img  src="'+star1+'"/>';  //暗星
		}
		
	}
	else {				//有半星
		starCount=Math.floor(starCount/2);
		for(var j = 1; j <= starCount; j++){
			content += '<img  class="smallicon"  src="'+star2+'"/>';  //亮星
		}
		content += '<img  class="smallicon"  src="'+star3+'"/>';  //半星
		for(var i = 2; i <= 5 - starCount ; i++){
			content += '<img  src="'+star1+'"/>';  //暗星
		}
	}
	return content;
};

(function ($) {
//得到select项的个数
$.fn.optSize = function(){
    return $(this).get(0).options.length;
}

//获得选中项的索引
$.fn.getSelectedIndex = function(){
    return $(this).get(0).selectedIndex;
}

//获得当前选中项的文本
$.fn.getSelectedText = function(){
    if(this.size() == 0)  return null;
    else{
        var index = this.getSelectedIndex();      
        return $(this).get(0).options[index].text;
    }
}

//获得当前选中项的值
$.fn.getSelectedValue = function(){
    if(this.size() == 0) 
        return null;
    
    else
    {
    	var index = this.getSelectedIndex();      
        return $(this).get(0).options[index].value;
    }
}

//设置select中值为value的项为选中
$.fn.setSelectedValue = function(value){
  //  $(this).get(0).value = value;
     try
     {
    	
	 $(this).eq(0).val( value);
     }
     catch(e)
     {
    	 
     }

}

//设置select中文本为text的第一项被选中
$.fn.setSelectedText = function(text)
{
    var isExist = false;
    var count = this.size();
    for(var i=0;i<count;i++)
    {
        if($(this).get(0).options[i].text == text)
        {
            $(this).get(0).options[i].selected = true;
            isExist = true;
            break;
        }
    }
    if(!isExist)
    {
        alert("下拉框中不存在该项");
    }
}
//设置选中指定索引项
$.fn.setSelectedIndex = function(index)
{
    var count = this.size();    
    if(index >= count || index < 0)
    {
        alert("选中项索引超出范围");
    }
    else
    {
        $(this).get(0).selectedIndex = index;
    }
}
//判断select项中是否存在值为value的项
$.fn.isExistItem = function(value)
{
    var isExist = false;
    var count = this.size();
    for(var i=0;i<count;i++)
    {
        if($(this).get(0).options[i].value == value)
        {
            isExist = true;
            break;
        }
    }
    return isExist;
}
//向select中添加一项，显示内容为text，值为value,如果该项值已存在，则提示
$.fn.addOption = function(text,value)
{
    if(this.isExistItem(value))
    {
        alert("待添加项的值已存在");
    }
    else
    {
        $(this).get(0).options.add(new Option(text,value));
    }
}
//删除select中值为value的项，如果该项不存在，则提示
$.fn.removeItem = function(value)
{    
    if(this.isExistItem(value))
    {
        var count = this.size();        
        for(var i=0;i<count;i++)
        {
            if($(this).get(0).options[i].value == value)
            {
                $(this).get(0).remove(i);
                break;
            }
        }        
    }
    else
    {
        alert("待删除的项不存在!");
    }
}
//删除select中指定索引的项
$.fn.removeIndex = function(index)
{
    var count = this.size();
    if(index >= count || index < 0)
    {
        alert("待删除项索引超出范围");
    }
    else
    {
        $(this).get(0).remove(index);
    }
}
//删除select中选定的项
$.fn.removeSelected = function()
{
    var index = this.getSelectedIndex();
    this.removeIndex(index);
}
//清除select中的所有项
$.fn.clearAll = function()
{
    if($(this).get(0).options) $(this).get(0).options.length = 0;
}

})(jQuery); 
/*
 * jQuery JSON Plugin
 * version: 2.1 (2009-08-14)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris wrote this plugin. It is based somewhat on the JSON.org 
 * website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.
 *
 * It is also influenced heavily by MochiKit's serializeJSON, which is 
 * copyrighted 2005 by Bob Ippolito.
 */
 
(function($) {
    /** jQuery.toJSON( json-serializble )
        Converts the given argument into a JSON respresentation.

        If an object has a "toJSON" function, that will be used to get the representation.
        Non-integer/string keys are skipped in the object, as are keys that point to a function.

        json-serializble:
            The *thing* to be converted.
     **/
    $.toJSON = function(o)
    {
    	//不使用浏览器原生JSON
//        if (typeof(JSON) == 'object' && JSON.stringify)
//            return JSON.stringify(o);
        
        var type = typeof(o);
    
        if (o === null)
            return "null";
    
        if (type == "undefined")
            return undefined;
        
        if (type == "number" || type == "boolean")
            return o + "";
    
        if (type == "string")
            return $.quoteString(o);
    
        if (type == 'object')
        {
            if (typeof o.toJSON == "function") 
                return $.toJSON( o.toJSON() );
            
            if (o.constructor === Date)
            {
                var month = o.getUTCMonth() + 1;
                if (month < 10) month = '0' + month;

                var day = o.getUTCDate();
                if (day < 10) day = '0' + day;

                var year = o.getUTCFullYear();
                
                var hours = o.getUTCHours();
                if (hours < 10) hours = '0' + hours;
                
                var minutes = o.getUTCMinutes();
                if (minutes < 10) minutes = '0' + minutes;
                
                var seconds = o.getUTCSeconds();
                if (seconds < 10) seconds = '0' + seconds;
                
                var milli = o.getUTCMilliseconds();
                if (milli < 100) milli = '0' + milli;
                if (milli < 10) milli = '0' + milli;

                return '"' + year + '-' + month + '-' + day + 'T' +
                             hours + ':' + minutes + ':' + seconds + 
                             '.' + milli + 'Z"'; 
            }

            if (o.constructor === Array) 
            {
                var ret = [];
                for (var i = 0; i < o.length; i++)
                    ret.push( $.toJSON(o[i]) || "null" );

                return "[" + ret.join(",") + "]";
            }
        
            var pairs = [];
            for (var k in o) {
                var name;
                var type = typeof k;

                if (type == "number")
                    name = '"' + k + '"';
                else if (type == "string")
                    name = $.quoteString(k);
                else
                    continue;  //skip non-string or number keys
            
                if (typeof o[k] == "function") 
                    continue;  //skip pairs where the value is a function.
            
                var val = $.toJSON(o[k]);
            
                pairs.push(name + ":" + val);
            }

            return "{" + pairs.join(", ") + "}";
        }
    };

    /** jQuery.evalJSON(src)
        Evaluates a given piece of json source.
     **/
    $.evalJSON = function(src)
    {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);
        return eval("(" + src + ")");
    };
    
    /** jQuery.secureEvalJSON(src)
        Evals JSON in a way that is *more* secure.
    **/
    $.secureEvalJSON = function(src)
    {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);
        
        var filtered = src;
        filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
        filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        
        if (/^[\],:{}\s]*$/.test(filtered))
            return eval("(" + src + ")");
        else
            throw new SyntaxError("Error parsing JSON, source is not valid.");
    };

    /** jQuery.quoteString(string)
        Returns a string-repr of a string, escaping quotes intelligently.  
        Mostly a support function for toJSON.
    
        Examples:
            >>> jQuery.quoteString("apple")
            "apple"
        
            >>> jQuery.quoteString('"Where are we going?", she asked.')
            "\"Where are we going?\", she asked."
     **/
    $.quoteString = function(string)
    {
        if (string.match(_escapeable))
        {
            return '"' + string.replace(_escapeable, function (a) 
            {
                var c = _meta[a];
                if (typeof c === 'string') return c;
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };
    
    var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    
    var _meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    };
})(jQuery);

﻿/*
* jQuery pager plugin
* Version 1.0 (12/22/2008)
* @requires jQuery v1.2.6 or later
*
* Example at: http://jonpauldavies.github.com/JQuery/Pager/PagerDemo.html
*
* Copyright (c) 2008-2009 Jon Paul Davies
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
* 
* Read the related blog post and contact the author at http://www.j-dee.com/2008/12/22/jquery-pager-plugin/
*
* This version is far from perfect and doesn't manage it's own state, therefore contributions are more than welcome!
*
* Usage: .pager({ pagenumber: 1, pagecount: 15, buttonClickCallback: PagerClickTest });
*
* Where pagenumber is the visible page number
*       pagecount is the total number of pages to display
*       buttonClickCallback is the method to fire when a pager button is clicked.
*
* buttonClickCallback signiture is PagerClickTest = function(pageclickednumber) 
* Where pageclickednumber is the number of the page clicked in the control.
*
* The included Pager.CSS file is a dependancy but can obviously tweaked to your wishes
* Tested in IE6 IE7 Firefox & Safari. Any browser strangeness, please report.
*/
(function($) {

    $.fn.pager = function(options) {

        var opts = $.extend({}, $.fn.pager.defaults, options);

        return this.each(function() {

        // empty out the destination element and then render out the pager with the supplied options
            $(this).empty().append(renderpager(parseInt(options.pagenumber), parseInt(options.pagecount), options.buttonClickCallback, options.meizuStyle, opts));
            
            // specify correct cursor activity
            $('.pages li').mouseover(function() { document.body.style.cursor = "pointer"; }).mouseout(function() { document.body.style.cursor = "auto"; });
        });
    };

    // render and return the pager with the supplied options
    function renderpager(pagenumber, pagecount, buttonClickCallback, meizuStyle, options) {

        // setup $pager to hold render
        var $pager;
		if(!meizuStyle){
			$pager = $('<ul class="pages" id=\"pager_pages_id\"></ul>');
		} else {
			$pager = $('<ul></ul>');
		}

        // add in the previous and next buttons
        $pager.append(renderButton('first', pagenumber, pagecount, buttonClickCallback)).append(renderButton('prev', pagenumber, pagecount, buttonClickCallback));

        // pager currently only handles 10 viewable pages ( could be easily parameterized, maybe in next version ) so handle edge cases
        var startPoint = 1;
        var endPoint = options.endPoint;

        var temp = Math.floor(options.endPoint/2);
        if (pagenumber > temp) {
            startPoint = pagenumber - temp;
            endPoint = pagenumber + temp;
        }

        if (endPoint > pagecount) {
            startPoint = pagecount - (options.endPoint-1);
            endPoint = pagecount;
        }

        if (startPoint < 1) {
            startPoint = 1;
        }

        // loop thru visible pages and render buttons
        for (var page = startPoint; page <= endPoint; page++) {

            var currentButton = $('<li >' + (page) + '</li>');

            page == pagenumber ? currentButton.addClass('current') : currentButton.click(function() { buttonClickCallback(this.firstChild.data); });
            currentButton.appendTo($pager);
        }

        // render in the next and last buttons before returning the whole rendered control back.
        $pager.append(renderButton('next', pagenumber, pagecount, buttonClickCallback)).append(renderButton('last', pagenumber, pagecount, buttonClickCallback));

        return $pager;
    }

    // renders and returns a 'specialized' button, ie 'next', 'previous' etc. rather than a page number button
    function renderButton(buttonLabel, pagenumber, pagecount, buttonClickCallback) {

        var $Button = $('<li class="pgNext">' + buttonLabel + '</li>');

        var destPage = 1;

        // work out destination page for required button type
        switch (buttonLabel) {
            case "first":
                destPage = 1;
				$Button = $('<li class="nav-first">' + '首页' + '</li>');
                break;
            case "prev":
                destPage = pagenumber - 1;
				$Button = $('<li class="nav-prev">' + '前一页' + '</li>');
                break;
            case "next":
                destPage = pagenumber + 1;
				$Button = $('<li class="nav-next">' + '后一页' + '</li>');
                break;
            case "last":
                destPage = pagecount;
				$Button = $('<li class="nav-last">' + '末页' + '</li>');
                break;
        }

        // disable and 'grey' out buttons if not needed.
        if (buttonLabel == "first" || buttonLabel == "prev") {
            pagenumber <= 1 ? $Button.addClass('pgEmpty') : $Button.click(function() { buttonClickCallback(destPage); });
        }
        else {
            pagenumber >= pagecount ? $Button.addClass('pgEmpty') : $Button.click(function() { buttonClickCallback(destPage); });
        }

        return $Button;
    }

    // pager defaults. hardly worth bothering with in this case but used as placeholder for expansion in the next version
    $.fn.pager.defaults = {
        pagenumber: 1,
        pagecount: 1,
        endPoint: 9
    };

})(jQuery);






/*
 * 	Easy Slider 1.5 - jQuery plugin
 *	written by Alen Grakalic	
 *	http://cssglobe.com/post/4004/easy-slider-15-the-easiest-jquery-plugin-for-sliding
 *
 *	Copyright (c) 2009 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
 
/*
 *	markup example for $("#slider").easySlider();
 *	
 * 	<div id="slider">
 *		<ul>
 *			<li><img src="images/01.jpg" alt="" /></li>
 *			<li><img src="images/02.jpg" alt="" /></li>
 *			<li><img src="images/03.jpg" alt="" /></li>
 *			<li><img src="images/04.jpg" alt="" /></li>
 *			<li><img src="images/05.jpg" alt="" /></li>
 *		</ul>
 *	</div>
 *
 */

(function($) {

	$.fn.easySlider = function(options){
	  
		// default configuration properties
		var defaults = {			
			prevId: 		'prevBtn',
			prevText: 		'Previous',
			nextId: 		'nextBtn',	
			nextText: 		'Next',
			controlsShow:	true,
			controlsBefore:	'',
			sliderId: 'slider',
			controlsAfter:	'',	
			controlsFade:	true,
			firstId: 		'firstBtn',
			firstText: 		'First',
			firstShow:		false,
			lastId: 		'lastBtn',	
			lastText: 		'Last',
			lastShow:		false,				
			vertical:		false,
			speed: 			1500,
			auto:			false,
			pause:			2000,
			continuous:		false
		}; 
		
		var options = $.extend(defaults, options);  
				
		this.each(function() {  
			var obj = $(this); 				
			var s = $("li", obj).length;
			var w = $("li", obj).width();
			if(options.liWidth){
				w = options.liWidth;
				$("li", obj).width(options.liWidth);
			}
			var h = $("li", obj).height(); 
			if(options.liHeight){
				h = options.liHeight;
				$("li", obj).height(options.liHeight);
			}
			obj.width(w); 
			obj.height(h); 
			obj.css("overflow","hidden");
			//obj.css("border","1px solid #dce0e5");
			var ts = s-1;
			var t = 0;
			$("ul", obj).css('width',s*w);			
			if(!options.vertical) $("li", obj).css('float','left');
			
			if(options.controlsShow && $("li", obj).length > 0){
				var html = options.controlsBefore;
				if(options.firstShow) html += '<span id="'+ options.firstId +'"><a href=\"javascript:void(0);\">'+ options.firstText +'</a></span>';
				html += ' <span id="'+ options.prevId +'" class="easySlider-prevBtn"><a href=\"javascript:void(0);\"><span style="display:none">'+ options.prevText +'</span></a></span>';
				html += ' <span id="'+ options.nextId +'" class="easySlider-nextBtn" style="left:';
				if(options.nextBtnLeft){
					html += options.nextBtnLeft
				}
				html += 'px"><a href=\"javascript:void(0);\"><span style="display:none">'+ options.nextText +'</span></a></span>';
				if(options.lastShow) html += ' <span id="'+ options.lastId +'"><a href=\"javascript:void(0);\">'+ options.lastText +'</a></span>';
				html += options.controlsAfter;						
				$(obj).after(html);										
			};
			
			$("img",obj).click(function(e){	
				var leftVal = getLeft(this);
				if(e.clientX > this.offsetWidth - this.width + this.width/2 + leftVal){
					animate("next",true);
				} else {
					animate("prev",true);
				}
			});
			
			$("a","#"+options.nextId).click(function(){		
				animate("next",true);
			});
			$("a","#"+options.prevId).click(function(){		
				animate("prev",true);				
			});	
			$("a","#"+options.firstId).click(function(){		
				animate("first",true);
			});				
			$("a","#"+options.lastId).click(function(){		
				animate("last",true);				
			});	
			
			navA = $("a", "#" + options.sliderId + "nav");
			$("a", "#" + options.sliderId + "nav").click(function(){		
				animate($(this).text(),true,$(this).text());
//				for(i = 0, size = navA.length; i < size; i++){
//					this.parentNode.children[i].className = '';
//				}
//				this.className = 'active';
				toggleNavClass(this);
			});	
			
			function toggleNavClass(activeNav, navIndex){
				navA = $("a", "#" + options.sliderId + "nav");
				if(navIndex || 0 == navIndex){
					activeNav =  navA[navIndex];
				}
				
				
				for(i = 0, size = navA.length; i < size; i++){
					activeNav.parentNode.children[i].className = '';
				}
				activeNav.className = 'active';
			}
			
			function getLeft(e){
				var offset=e.offsetLeft;
				if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
				return offset;
				}
			
			function animate(dir,clicked,aText){
				var ot = t;				
				switch(dir){
					case "next":
						t = (ot>=ts) ? (options.continuous ? 0 : ts) : t+1;	
						toggleNavClass("", t);
						break; 
					case "prev":
						t = (t<=0) ? (options.continuous ? ts : 0) : t-1;
						toggleNavClass("", t);
						break; 
					case "first":
						t = 0;
						toggleNavClass("", t);
						break; 
					case "last":
						t = ts;
						toggleNavClass(null, t);
						break; 
					default:
						break; 
				};	
				if(aText){
					t = parseInt(aText) - 1;
				}
				if(t > ts){return;}
				
				var diff = Math.abs(ot-t);
				var speed = diff*options.speed;						
				if(!options.vertical) {
					p = (t*w*-1);
					$("ul",obj).animate(
						{ marginLeft: p }, 
						speed
					);				
				} else {
					p = (t*h*-1);
					$("ul",obj).animate(
						{ marginTop: p }, 
						speed
					);					
				};
				
				if(!options.continuous && options.controlsFade){					
					if(t==ts){
						$("a","#"+options.nextId).hide();
						$("a","#"+options.lastId).hide();
					} else {
						$("a","#"+options.nextId).show();
						$("a","#"+options.lastId).show();					
					};
					if(t==0){
						$("a","#"+options.prevId).hide();
						$("a","#"+options.firstId).hide();
					} else {
						$("a","#"+options.prevId).show();
						$("a","#"+options.firstId).show();
					};					
				};				
				
				if(clicked) clearTimeout(timeout);
				if(options.auto && dir=="next" && !clicked){;
					timeout = setTimeout(function(){
						animate("next",false);
					},diff*options.speed+options.pause);
				};
				
			};
			// init
			var timeout;
			if(options.auto){;
				timeout = setTimeout(function(){
					animate("next",false);
				},options.pause);
			};		
		
			if(!options.continuous && options.controlsFade){					
				$("a","#"+options.prevId).hide();
				$("a","#"+options.firstId).hide();				
			};				
			
		});
	  
	};

})(jQuery);




﻿/*!
 * jQuery blockUI plugin
 * Version 2.28 (02-DEC-2009)
 * @requires jQuery v1.2.3 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2008 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */

;(function($) {

if (/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery) || /^1.1/.test($.fn.jquery)) {
	alert('blockUI requires jQuery v1.2.3 or later!  You are using v' + $.fn.jquery);
	return;
}

$.fn._fadeIn = $.fn.fadeIn;

// this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
// retarded userAgent strings on Vista)
var mode = document.documentMode || 0;
var setExpr = $.browser.msie && (($.browser.version < 8 && !mode) || mode < 8);
var ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !mode;

// global $ methods for blocking/unblocking the entire page
$.blockUI   = function(opts) { install(window, opts); };
$.unblockUI = function(opts) { remove(window, opts); };

// convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
$.growlUI = function(title, message, timeout, onClose) {
	var $m = $('<div class="growlUI"></div>');
	if (title) $m.append('<h1>'+title+'</h1>');
	if (message) $m.append('<h2>'+message+'</h2>');
	if (timeout == undefined) timeout = 3000;
	$.blockUI({
		message: $m, fadeIn: 700, fadeOut: 1000, centerY: false,
		timeout: timeout, showOverlay: false,
		onUnblock: onClose, 
		css: $.blockUI.defaults.growlCSS
	});
};

// plugin method for blocking element content
$.fn.block = function(opts) {
	return this.unblock({ fadeOut: 0 }).each(function() {
		if ($.css(this,'position') == 'static')
			this.style.position = 'relative';
		if ($.browser.msie)
			this.style.zoom = 1; // force 'hasLayout'
		install(this, opts);
	});
};

// plugin method for unblocking element content
$.fn.unblock = function(opts) {
	return this.each(function() {
		remove(this, opts);
	});
};

$.blockUI.version = 2.28; // 2nd generation blocking at no extra cost!

// override these in your code to change the default behavior and style
$.blockUI.defaults = {
	// message displayed when blocking (use null for no message)
	message:  '<h2>正在处理，请稍候...</h2>',

	title: null,	  // title string; only used when theme == true
	draggable: true,  // only used when theme == true (requires jquery-ui.js to be loaded)
	
	theme: false, // set to true to use with jQuery UI themes
	
	// styles for the message when blocking; if you wish to disable
	// these and use an external stylesheet then do this in your code:
	// $.blockUI.defaults.css = {};
	css: {
		padding:	0,
		margin:		0,
		width:		'30%',
		top:		'40%',
		left:		'35%',
		textAlign:	'center',
		color:		'#000',
		border:		'3px solid #aaa',
		backgroundColor:'#fff',
		cursor:		'wait'
	},
	
	// minimal style set used when themes are used
	themedCSS: {
		width:	'30%',
		top:	'40%',
		left:	'35%'
	},

	// styles for the overlay
	overlayCSS:  {
		backgroundColor: '#000',
		opacity:	  	 0.6,
		cursor:		  	 'wait'
	},

	// styles applied when using $.growlUI
	growlCSS: {
		width:  	'350px',
		top:		'10px',
		left:   	'',
		right:  	'10px',
		border: 	'none',
		padding:	'5px',
		opacity:	0.6,
		cursor: 	'default',
		color:		'#fff',
		backgroundColor: '#000',
		'-webkit-border-radius': '10px',
		'-moz-border-radius':	 '10px'
	},
	
	// IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
	// (hat tip to Jorge H. N. de Vasconcelos)
	iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

	// force usage of iframe in non-IE browsers (handy for blocking applets)
	forceIframe: false,

	// z-index for the blocking overlay
	baseZ: 1000,

	// set these to true to have the message automatically centered
	centerX: true, // <-- only effects element blocking (page block controlled via css above)
	centerY: true,

	// allow body element to be stetched in ie6; this makes blocking look better
	// on "short" pages.  disable if you wish to prevent changes to the body height
	allowBodyStretch: true,

	// enable if you want key and mouse events to be disabled for content that is blocked
	bindEvents: true,

	// be default blockUI will supress tab navigation from leaving blocking content
	// (if bindEvents is true)
	constrainTabKey: true,

	// fadeIn time in millis; set to 0 to disable fadeIn on block
	fadeIn:  200,

	// fadeOut time in millis; set to 0 to disable fadeOut on unblock
	fadeOut:  400,

	// time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
	timeout: 0,

	// disable if you don't want to show the overlay
	showOverlay: true,

	// if true, focus will be placed in the first available input field when
	// page blocking
	focusInput: true,

	// suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
	applyPlatformOpacityRules: true,

	// callback method invoked when unblocking has completed; the callback is
	// passed the element that has been unblocked (which is the window object for page
	// blocks) and the options that were passed to the unblock call:
	//	 onUnblock(element, options)
	onUnblock: null,

	// don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
	quirksmodeOffsetHack: 4
};

// private data and functions follow...

var pageBlock = null;
var pageBlockEls = [];

function install(el, opts) {
	var full = (el == window);
	var msg = opts && opts.message !== undefined ? opts.message : undefined;
	opts = $.extend({}, $.blockUI.defaults, opts || {});
	opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
	var css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
	var themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
	msg = msg === undefined ? opts.message : msg;

	// remove the current block (if there is one)
	if (full && pageBlock)
		remove(window, {fadeOut:0});

	// if an existing element is being used as the blocking content then we capture
	// its current place in the DOM (and current display style) so we can restore
	// it when we unblock
	if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
		var node = msg.jquery ? msg[0] : msg;
		var data = {};
		$(el).data('blockUI.history', data);
		data.el = node;
		data.parent = node.parentNode;
		data.display = node.style.display;
		data.position = node.style.position;
		if (data.parent)
			data.parent.removeChild(node);
	}

	var z = opts.baseZ;

	// blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
	// layer1 is the iframe layer which is used to supress bleed through of underlying content
	// layer2 is the overlay layer which has opacity and a wait cursor (by default)
	// layer3 is the message content that is displayed while blocking

	var lyr1 = ($.browser.msie || opts.forceIframe) 
		? $('<iframe class="blockUI" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>')
		: $('<div class="blockUI" style="display:none"></div>');
	var lyr2 = $('<div class="blockUI blockOverlay" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
	
	var lyr3;
	if (opts.theme && full) {
		var s = '<div class="blockUI blockMsg blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:fixed">' +
					'<div class="ui-widget-header ui-dialog-titlebar blockTitle">'+(opts.title || '&nbsp;')+'</div>' +
					'<div class="ui-widget-content ui-dialog-content"></div>' +
				'</div>';
		lyr3 = $(s);
	}
	else {
		lyr3 = full ? $('<div class="blockUI blockMsg blockPage" style="z-index:'+z+';display:none;position:fixed"></div>')
					: $('<div class="blockUI blockMsg blockElement" style="z-index:'+z+';display:none;position:absolute"></div>');
	}						   

	// if we have a message, style it
	if (msg) {
		if (opts.theme) {
			lyr3.css(themedCSS);
			lyr3.addClass('ui-widget-content');
		}
		else 
			lyr3.css(css);
	}

	// style the overlay
	if (!opts.applyPlatformOpacityRules || !($.browser.mozilla && /Linux/.test(navigator.platform)))
		lyr2.css(opts.overlayCSS);
	lyr2.css('position', full ? 'fixed' : 'absolute');

	// make iframe layer transparent in IE
	if ($.browser.msie || opts.forceIframe)
		lyr1.css('opacity',0.0);

	$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
	
	if (opts.theme && opts.draggable && $.fn.draggable) {
		lyr3.draggable({
			handle: '.ui-dialog-titlebar',
			cancel: 'li'
		});
	}

	// ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
	var expr = setExpr && (!$.boxModel || $('object,embed', full ? null : el).length > 0);
	if (ie6 || expr) {
		// give body 100% height
		if (full && opts.allowBodyStretch && $.boxModel)
			$('html,body').css('height','100%');

		// fix ie6 issue when blocked element has a border width
		if ((ie6 || !$.boxModel) && !full) {
			var t = sz(el,'borderTopWidth'), l = sz(el,'borderLeftWidth');
			var fixT = t ? '(0 - '+t+')' : 0;
			var fixL = l ? '(0 - '+l+')' : 0;
		}

		// simulate fixed position
		$.each([lyr1,lyr2,lyr3], function(i,o) {
			var s = o[0].style;
			s.position = 'absolute';
			if (i < 2) {
				full ? s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"')
					 : s.setExpression('height','this.parentNode.offsetHeight + "px"');
				full ? s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"')
					 : s.setExpression('width','this.parentNode.offsetWidth + "px"');
				if (fixL) s.setExpression('left', fixL);
				if (fixT) s.setExpression('top', fixT);
			}
			else if (opts.centerY) {
				if (full) s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
				s.marginTop = 0;
			}
			else if (!opts.centerY && full) {
				var top = (opts.css && opts.css.top) ? parseInt(opts.css.top) : 0;
				var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';
				s.setExpression('top',expression);
			}
		});
	}

	// show the message
	if (msg) {
		if (opts.theme)
			lyr3.find('.ui-widget-content').append(msg);
		else
			lyr3.append(msg);
		if (msg.jquery || msg.nodeType)
			$(msg).show();
	}

	if (($.browser.msie || opts.forceIframe) && opts.showOverlay)
		lyr1.show(); // opacity is zero
	if (opts.fadeIn) {
		if (opts.showOverlay)
			lyr2._fadeIn(opts.fadeIn);
		if (msg)
			lyr3.fadeIn(opts.fadeIn);
	}
	else {
		if (opts.showOverlay)
			lyr2.show();
		if (msg)
			lyr3.show();
	}

	// bind key and mouse events
	bind(1, el, opts);

	if (full) {
		pageBlock = lyr3[0];
		pageBlockEls = $(':input:enabled:visible',pageBlock);
		if (opts.focusInput)
			setTimeout(focus, 20);
	}
	else
		center(lyr3[0], opts.centerX, opts.centerY);

	if (opts.timeout) {
		// auto-unblock
		var to = setTimeout(function() {
			full ? $.unblockUI(opts) : $(el).unblock(opts);
		}, opts.timeout);
		$(el).data('blockUI.timeout', to);
	}
};

// remove the block
function remove(el, opts) {
	var full = (el == window);
	var $el = $(el);
	var data = $el.data('blockUI.history');
	var to = $el.data('blockUI.timeout');
	if (to) {
		clearTimeout(to);
		$el.removeData('blockUI.timeout');
	}
	opts = $.extend({}, $.blockUI.defaults, opts || {});
	bind(0, el, opts); // unbind events
	
	var els;
	if (full) // crazy selector to handle odd field errors in ie6/7
		els = $('body').children().filter('.blockUI').add('body > .blockUI');
	else
		els = $('.blockUI', el);

	if (full)
		pageBlock = pageBlockEls = null;

	if (opts.fadeOut) {
		els.fadeOut(opts.fadeOut);
		setTimeout(function() { reset(els,data,opts,el); }, opts.fadeOut);
	}
	else
		reset(els, data, opts, el);
};

// move blocking element back into the DOM where it started
function reset(els,data,opts,el) {
	els.each(function(i,o) {
		// remove via DOM calls so we don't lose event handlers
		if (this.parentNode)
			this.parentNode.removeChild(this);
	});

	if (data && data.el) {
		data.el.style.display = data.display;
		data.el.style.position = data.position;
		if (data.parent)
			data.parent.appendChild(data.el);
		$(el).removeData('blockUI.history');
	}

	if (typeof opts.onUnblock == 'function')
		opts.onUnblock(el,opts);
};

// bind/unbind the handler
function bind(b, el, opts) {
	var full = el == window, $el = $(el);

	// don't bother unbinding if there is nothing to unbind
	if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked')))
		return;
	if (!full)
		$el.data('blockUI.isBlocked', b);

	// don't bind events when overlay is not in use or if bindEvents is false
	if (!opts.bindEvents || (b && !opts.showOverlay)) 
		return;

	// bind anchors and inputs for mouse and key events
	var events = 'mousedown mouseup keydown keypress';
	b ? $(document).bind(events, opts, handler) : $(document).unbind(events, handler);

// former impl...
//	   var $e = $('a,:input');
//	   b ? $e.bind(events, opts, handler) : $e.unbind(events, handler);
};

// event handler to suppress keyboard/mouse events when blocking
function handler(e) {
	// allow tab navigation (conditionally)
	if (e.keyCode && e.keyCode == 9) {
		if (pageBlock && e.data.constrainTabKey) {
			var els = pageBlockEls;
			var fwd = !e.shiftKey && e.target == els[els.length-1];
			var back = e.shiftKey && e.target == els[0];
			if (fwd || back) {
				setTimeout(function(){focus(back)},10);
				return false;
			}
		}
	}
	// allow events within the message content
	if ($(e.target).parents('div.blockMsg').length > 0)
		return true;

	// allow events for content that is not being blocked
	return $(e.target).parents().children().filter('div.blockUI').length == 0;
};

function focus(back) {
	if (!pageBlockEls)
		return;
	var e = pageBlockEls[back===true ? pageBlockEls.length-1 : 0];
	if (e)
		e.focus();
};

function center(el, x, y) {
	var p = el.parentNode, s = el.style;
	var l = ((p.offsetWidth - el.offsetWidth)/2) - sz(p,'borderLeftWidth');
	var t = ((p.offsetHeight - el.offsetHeight)/2) - sz(p,'borderTopWidth');
	if (x) s.left = l > 0 ? (l+'px') : '0';
	if (y) s.top  = t > 0 ? (t+'px') : '0';
};

function sz(el, p) {
	return parseInt($.css(el,p))||0;
};

})(jQuery);

if($.browser.msie && $.browser.version == 6.0)
	{
	var minWidth = parseInt($('body').css('min-width'));
	$('body').each(function(){
	  if ($(this).width() < minWidth)
	    $(this).width(minWidth);
	});
}

/**
 * 描述：数据检证
 * 作者： 张军强
 * 创建时间：2010-03-20 
 * 
 * @since v0.1
 * 
 */


/* 显示提示信息函数 */
function showTip($id, $message) {
	//alert($message);
	ZZtips.attachTip($id,$message);
}


/* 回调函数只要返回真或假 */
/*长度比较*/
function len(str, len) {
	if (str.length < len)
		return false;
	else
		return true;
}


/*长度小于返回真*/
function lt_len(str, len) {
	if (str.length < len)
		return true;
	else
		return false;
}

/*长度大小返回真*/
function gt_len(str, len) {
	if (str.length < len)
		return true;
	else
		return false;
}

/* 是否相等到*/
function cmp(str,str2)
{
	if (str==str2)
		return false;
	else
		return true;
}



/**
 * 正则
 * @param $str
 * @param $pattern
 * @return 返回真假
 */
function test($str, $pattern) {
	switch ($pattern) {
	case "notnull":
		$pattern = /^$/;
		$str = $str.replace(/(\s*$)/g, "");
		if ($str.length == 0)
			return false;
		else
			return true;
		break;
	case "idcard":
		$pattern = /^(1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5]|8[12]|91)\d{2}[01238]\d{1}$/;
		break;
	case "english":
		$pattern = /^[A-Za-z]+$/;
		break;
	case "chinese":
		$pattern = /^[\u0391-\uFFE5]+$/;
		break;
	case "username":
		$pattern = /^[a-z]\w{2,19}$/;
		break;
	case "email":
		$pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		break;
	case "int":
		$pattern = /^[-\+]?\d+$/;
		break;
	case "number":
		$pattern = /^\d+$/;
		break;
	case "double":
		$pattern = /^[-\+]?\d+(\.\d+)?$/;
		break;
	case "price":
		$pattern = /^\d+(\.\d+)?$/;
		break;
	case "zip":
		$pattern = /^[1-9]\d{5}$/;
		break;
	case "qq":
		$pattern = /^[1-9]\d{4,9}$/;
		break;
	case "phone":
		$pattern = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
		break;
	case "mobile":
		$pattern = /^((\(\d{2,3}\))|(\d{3}\-))?(1[35][0-9]|189)\d{8}$/;
		break;
	case "url":
		$pattern = /^(http|https|ftp):\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\/:+!]*([^<>\""])*$/;
		break;
	case "domain":
		$pattern = /^[A-Za-z0-9\-]+\.([A-Za-z]{2,4}|[A-Za-z]{2,4}\.[A-Za-z]{2})$/;
		break;
	case "ip":
		$pattern = /^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/;
		break;
	case "date":
		$pattern =/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/
	break;
	}
	// return preg_match("/". $pattern."/", $str)>0?true:false;
	return $pattern.exec($str) ? true : false;

}

/* 数据校验函数 */
function checkData($id, $rule, $message, $func) {
	var $str = document.getElementById($id).value;
	if (test($rule, /function\:?\w*/)) {
		$params = $rule.split(":");
		if (typeof ($func) == "function") {
			if ($params.length > 1) {
				if (!$func($str, $params.slice(1))) {
					showTip($id, $message);
					return false;
				}
				else
				{
					return true;
				}
			} else {
				if (!$func($str)) {
					showTip($id, $message);
					return false;
				}
				else
				{
					return true;
				}
			}
		} else {
			alert("未定义回调函数");
			return false;
			return;
		}

	} else {
		if (!test($str, $rule)) {
			showTip($id, $message);
			return false;
		}
		else
		{
			return true;
		}
		;
	}
}



/**
 * Copyright (c) 2009 meizu (common) $date 2009-09-05
 */
(function($) {
	$.fn.onlypressnum = function() {
		$(this).css( {
			imeMode : "disabled",
			'-moz-user-select' : "none"
		});
		$(this)
				.bind(
						"keypress",
						function(e) {
							if (e.ctrlKey == true || e.shiftKey == true)
								return false;
							if ((e.which >= 48 && e.which <= 57
									&& e.ctrlKey == false && e.shiftKey == false)) {
								if ($(this).val()
										&& $(this).val().indexOf('.') != -1
										&& $(this).val().split('.')[1].length > 1) {
									if ($(this).attr('maxlength')) {
										if (this.selectionStart) {
											if (this.selectionStart < $(this)
													.attr('maxlength') - 1) {
												if (this.selectionStart < $(
														this).val()
														.indexOf('.') + 1) {
													return true;
												} else {
													return false;
												}
											}
										} else {
											rng = document.selection
													.createRange();
											rngText = rng.text;
											rng
													.moveStart(
															"character",
															-event.srcElement.value.length);
											if (rng.text.length < $(this).val()
													.indexOf('.') + 1) {
												return true;
											}
											if (rngText == event.srcElement.value) {
												return true;
											}
											if (this.value.length == $(this)
													.attr('maxlength')) {
												return true;
											} else {
												return false;
											}
										}
									}
									return false;
								}
								return true;
							} else if (e.which == 0 || e.which == 8)
								return true;
							else if (e.ctrlKey == true
									&& (e.which == 99 || e.which == 118))
								return false;
							else if (e.which == 46 || e.which == 46)
								return $(this).val().indexOf('.') < 0;
							else
								return false;
						}).bind("contextmenu", function() {
					return true;
				}).bind("selectstart", function() {
					return true;
				}).bind("drop", function() {
					return false;
				}).bind("paste", function() {
					return false;
				});
		if (!$.browser.msie) {
			$(this).bind("change", function() { // 去掉chrome浏览器的中文
						var regexp = /^\d+(\.\d{1,2})?$/i;
						if (!regexp.test($(this).val())) {
							var v = parseFloat($(this).val());
							if (!isNaN(v))
								$(this).val(v);
							else
								$(this).val('');
						}
						return false;
					});
		}
	};

})(jQuery);

(function($) {
	$.fn.onlypressnumandletter = function() {
		$(this).css( {
			imeMode : "disabled",
			'-moz-user-select' : "none"
		});
		$(this)
				.bind(
						"keypress",
						function(e) {
							if (e.which == 46)
								return false;
							if (e.ctrlKey == true || e.shiftKey == true)
								return false;
							if ((e.which >= 48 && e.which <= 57
									&& e.ctrlKey == false && e.shiftKey == false)
									|| (e.which >= 65 && e.which <= 90)
									|| (e.which >= 97 && e.which <= 122)) {
								if ($(this).val()
										&& $(this).val().indexOf('.') != -1
										&& $(this).val().split('.')[1].length > 1) {
									return false;
								}
								return true;
							} else if (e.which == 0 || e.which == 8)
								return true;
							else if (e.ctrlKey == true
									&& (e.which == 99 || e.which == 118))
								return false;
							else if (e.which == 46 || e.which == 46)
								return $(this).val().indexOf('.') < 0;
							else
								return false;
						}).bind("contextmenu", function() {
					return true;
				}).bind("selectstart", function() {
					return true;
				}).bind("drop", function() {
					return false;
				}).bind("paste", function() {
					return false;
				});
		if (!$.browser.msie) {
			$(this).bind("change", function() { // 去掉chrome浏览器的中文
//						var regexp = /^\d+(\.\d{1,2})?$/i;
						var regexp =  /^[A-Za-z0-9]+$/i;
						if (!regexp.test($(this).val())) {
							var v = parseFloat($(this).val());
							if (!isNaN(v))
								$(this).val(v);
							else
								$(this).val('');
						}
						return false;
					});
		}
	};

	$.fn.inputSelect = function(o) {
		var obj = this;

		jQuery.each(obj, function(i, obj_sub) {
			var inputerId = "_inputer" + obj_sub.id;

			var iset = $("input[id=" + obj_sub.id + "]").position();
			if ($('#' + inputerId).length > 0) {
				$('#' + inputerId).clearAll();
				$.each(o, function(ovar, opt) {
					$("select[id=" + inputerId + "]").addOption(ovar, opt);
				});
				return;
			}
			$("input[id=" + obj_sub.id + "]").after(
					"<select id='" + inputerId + "' name='" + inputerId
							+ "'></select>");

			// IE和FF有一点点区别
				$("select[id=" + inputerId + "]").width(
						$(obj_sub).width() + ($.browser.msie ? 4 : 4) + "px");

				$("select[id=" + inputerId + "]").css(
						{
							position : "absolute",
							display : "none",
							left : function() {
								return iset.left;
							},
							top : function() {
								 return $.browser.msie ? iset.top : ($.browser.safari? iset.top-1:iset.top+1)
										+ "px"
							},
							clip : "rect(1px "
									+ ($("select[id=" + inputerId + "]")
											.width()
											+ ($.browser.msie ? 6 : 8) + "px")
									+ " "
									+ (($("input[id=" + obj_sub.id + "]")
											.height() - 2)
											+ ($.browser.msie ? 3 : 2) + "px")
									+ " "
									+ ($("select[id=" + inputerId + "]")
											.width() - 18 + "px") + ")",
							"font-size" : obj.css("font-size")
						});

				// var option = "<option value=''></option>";
				$.each(o, function(ovar, opt) {
					// option += '<option value=' + ovar + '>' + opt +
						// '</option>';
						$("select[id=" + inputerId + "]").addOption(ovar, opt);
					});

				$("select[id=" + inputerId + "]")// .html(option)
						.css( {
							display : "block"
						}).change(
								function() {
									$("input[id=" + obj_sub.id + "]").val(
											$("option:selected", this).html());
								});
			});

	};
})(jQuery);

(function($) {
	$.fn.onlypressnumnodot = function() {
		$(this).css( {
			imeMode : "disabled",
			'-moz-user-select' : "none"
		});
		$(this)
				.bind(
						"keypress",
						function(e) {
							if (e.which == 46)
								return false;
							if (e.ctrlKey == true || e.shiftKey == true)
								return false;
							if ((e.which >= 48 && e.which <= 57
									&& e.ctrlKey == false && e.shiftKey == false)) {
								if ($(this).val()
										&& $(this).val().indexOf('.') != -1
										&& $(this).val().split('.')[1].length > 1) {
									return false;
								}
								return true;
							} else if (e.which == 0 || e.which == 8)
								return true;
							else if (e.ctrlKey == true
									&& (e.which == 99 || e.which == 118))
								return false;
							else if (e.which == 46 || e.which == 46)
								return $(this).val().indexOf('.') < 0;
							else
								return false;
						}).bind("contextmenu", function() {
					return false;
				}).bind("selectstart", function() {
					return false;
				}).bind("drop", function() {
					return false;
				}).bind("paste", function() {
					return false;
				});
		if (!$.browser.msie) {
			$(this).bind("change", function() { // 去掉chrome浏览器的中文
						var regexp = /^\d+(\.\d{1,2})?$/i;
						if (!regexp.test($(this).val())) {
							var v = parseFloat($(this).val());
							if (!isNaN(v))
								$(this).val(v);
							else
								$(this).val('');
						}
						return false;
					});
		}
	};

})(jQuery);

$(document).ready(function(){
	if($("#devNavSlider").length>0){
		$("#devNavSlider").lavaLamp({
			fx: "backout", 
	    	speed: 700,
	    	click: function(event, menuItem) {
				//window.location.href=event.target.href;
				return true;
	    	}
		});
	}
});

/**
 * LavaLamp - A menu plugin for jQuery with cool hover effects.
 * @requires jQuery v1.1.3.1 or above
 *
 * http://gmarwaha.com/blog/?p=7
 *
 * Copyright (c) 2007 Ganeshji Marwaha (gmarwaha.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 0.1.0
 */

/**
 * Creates a menu with an unordered list of menu-items. You can either use the CSS that comes with the plugin, or write your own styles 
 * to create a personalized effect
 *
 * The HTML markup used to build the menu can be as simple as...
 *
 *       <ul class="lavaLamp">
 *           <li><a href="#">Home</a></li>
 *           <li><a href="#">Plant a tree</a></li>
 *           <li><a href="#">Travel</a></li>
 *           <li><a href="#">Ride an elephant</a></li>
 *       </ul>
 *
 * Once you have included the style sheet that comes with the plugin, you will have to include 
 * a reference to jquery library, easing plugin(optional) and the LavaLamp(this) plugin.
 *
 * Use the following snippet to initialize the menu.
 *   $(function() { $(".lavaLamp").lavaLamp({ fx: "backout", speed: 700}) });
 *
 * Thats it. Now you should have a working lavalamp menu. 
 *
 * @param an options object - You can specify all the options shown below as an options object param.
 *
 * @option fx - default is "linear"
 * @example
 * $(".lavaLamp").lavaLamp({ fx: "backout" });
 * @desc Creates a menu with "backout" easing effect. You need to include the easing plugin for this to work.
 *
 * @option speed - default is 500 ms
 * @example
 * $(".lavaLamp").lavaLamp({ speed: 500 });
 * @desc Creates a menu with an animation speed of 500 ms.
 *
 * @option click - no defaults
 * @example
 * $(".lavaLamp").lavaLamp({ click: function(event, menuItem) { return false; } });
 * @desc You can supply a callback to be executed when the menu item is clicked. 
 * The event object and the menu-item that was clicked will be passed in as arguments.
 */
(function($) {
$.fn.lavaLamp = function(o) {
    o = $.extend({ fx: "linear", speed: 500, click: function(){} }, o || {});

    return this.each(function() {
        var me = $(this), noop = function(){},
            $back = $('<li class="back"><div class="left"></div></li>').appendTo(me),
            $li = $("li", this), 
            curr = null;
        	if(typeof($("li.current", this)[0]) != "undefined")
            curr = $($("li.current", this)[0]).addClass("current")[0];

        $li.not(".back").hover(function() {
            move(this);
        }, noop);

        $(this).hover(noop, function() {
        	if(curr == null){
        		curr = this;
        	}
            move(curr);
        });

        $li.click(function(e) {
            setCurr(this);
            return o.click.apply(this, [e, this]);
        });
        if(curr != null)
        {
        	setCurr(curr);
        }
        else{
        	$back.hide();
        }

        function setCurr(el) {
            $back.css({ "left": el.offsetLeft+"px", "width": el.offsetWidth+"px" });
            curr = el;
        };

        function move(el) {
        	if(curr != null){
	            $back.each(function() {
	                $.dequeue(this, "fx"); }
	            ).animate({
	                width: el.offsetWidth,
	                left: el.offsetLeft
	            }, o.speed, o.fx);
        	}else{
        		$back.show();
        		 setCurr(el);
        	}
        };

    });
};
})(jQuery);

/*
 * jQuery Easing v1.1 - http://gsgd.co.uk/sandbox/jquery.easing.php
 *
 * Uses the built in easing capabilities added in jQuery 1.1
 * to offer multiple easing options
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */
jQuery.easing={easein:function(x,t,b,c,d){return c*(t/=d)*t+b},easeinout:function(x,t,b,c,d){if(t<d/2)return 2*c*t*t/(d*d)+b;var a=t-d/2;return-2*c*a*a/(d*d)+2*c*a/d+c/2+b},easeout:function(x,t,b,c,d){return-c*t*t/(d*d)+2*c*t/d+b},expoin:function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}return a*(Math.exp(Math.log(c)/d*t))+b},expoout:function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}return a*(-Math.exp(-Math.log(c)/d*(t-d))+c+1)+b},expoinout:function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}if(t<d/2)return a*(Math.exp(Math.log(c/2)/(d/2)*t))+b;return a*(-Math.exp(-2*Math.log(c/2)/d*(t-d))+c+1)+b},bouncein:function(x,t,b,c,d){return c-jQuery.easing['bounceout'](x,d-t,0,c,d)+b},bounceout:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b}},bounceinout:function(x,t,b,c,d){if(t<d/2)return jQuery.easing['bouncein'](x,t*2,0,c,d)*.5+b;return jQuery.easing['bounceout'](x,t*2-d,0,c,d)*.5+c*.5+b},elasin:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},elasout:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},elasinout:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b},backin:function(x,t,b,c,d){var s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},backout:function(x,t,b,c,d){var s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},backinout:function(x,t,b,c,d){var s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},linear:function(x,t,b,c,d){return c*t/d+b}};
/*
 * Copyright (c) 2009 Tom Coote (http://www.tomcoote.co.uk)
 * This is licensed under GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/*jslint  eqeqeq: true, browser: true */
/*global jQuery */
 
/**
 * Turn a text box into an auto suggest box which search's and 
 * displays results specified in a JSON string
 * 
 *
 * @name jsonSuggest
 * @type jQuery
 * @param searchData :	[required] Can be one of three things; a JSON string which specified the search data, an object that is representative of a parsed JSON string or a function which returns either of these two things.
 *					expected object format example; (either as raw object or JSON string)
 					[
						{
							id: 1,
							text: 'Thomas',
							image: 'img/avator1.jpg',	// optional
							extra: 'www.thomas.com'	// optional
						},
						{
							id: 2,
							text: 'Frederic',
							image: 'img/avator2.jpg',	// optional
							extra: 'www.freddy.com'	// optional
						},
						{
							id: 2,
							text: 'James',
							image: 'img/avator2.jpg',	// optional
							extra: 'www.james.com'	// optional
						}
					]
 * @param Object settings;	[optional]
 *			minCharacters :	[default 1] Number of characters that the input should accept before running a search.
 *			maxResults:	[default undefined] If set then no more results than this number will be found.
 *			wildCard :		[default ''] A character to be used as a match all wildcard when searching. Leaving empty will mean results are matched inside
 *						strings but if a wildCard is present then results are matched from the beginning of strings.
 *			caseSensitive :	[defautl false] True if the filter search's are to be case sensitive.
 *			notCharacter :	[default !] The character to use at the start of any search text to specify that the results should NOT contain the following text.
 *			maxHeight :	[default 350] This is the maximum height that the results box can reach before scroll bars are shown instead of getting taller.	
 *			highlightMatches: [default true] This will add strong tags around the text that matches the search text in each result.
 *			onSelect : 		[default undefined] Function that gets called once a result has been selected, gets passed in the object version of the result as specified in the json string
 *			ajaxResults : 	[default false] If this is set to true then you must specify a function as the searchData construction parameter. This is because when this
 *						settings is true then results are retrieved from an external function each time they are needed instead of being retrieved from the data given on 
 * 						contruction. The searchData function must return a JSON string of resulting objects or the object which represents the JSON string. The function is
 *						passed the following paramenters;
 *						1. The search text typed into the input box
 *						2. The current wildCard setting
 *						3. The current caseSensitive setting
 *						4. The current notCharacter setting 
 * @author Tom Coote (www.tomcoote.co.uk)
 * @version 1.2.3
 */

(function($){

	$.fn.jsonSuggest = function(searchData, settings) {
		var defaults = {  
			uri: undefined,
			minCharacters: 1,
			maxResults: 20,
			wildCard: "",
			caseSensitive: false,
			autoConvert: false,
			notCharacter: "!",
			maxHeight: 350,
			highlightMatches: true,
			onSelect: undefined,
			ajaxResults: false,
			idInput: false,
			matchField: "name", //匹配的字段，默认为name
			valueMoreThanOne :undefined,//大于等于一个结果集
			minSearchLength:undefined,//提示的最小长度
			mouseBlur : undefined,
			defaultSelect : undefined,//是否默认选中第一个
			selectCall : undefined,//选中一个后的回调函数
			waitTimemillisecond : 500
			};  
		settings = $.extend(defaults, settings);  
		isChange = false;
		return this.each(function() {
			
			function regexEscape(txt, omit) {
				var specials = ['/', '.', '*', '+', '?', '|',
								'(', ')', '[', ']', '{', '}', '\\'];
				
				if (omit) {
					for (var i=0; i < specials.length; i++) {
						if (specials[i] === omit) { specials.splice(i,1); }
					}
				}
				
				var escapePatt = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
				return txt.replace(escapePatt, '\\$1');
			}
			
			var obj = $(this),
				wildCardPatt = new RegExp(regexEscape(settings.wildCard || ''),'g'),
				results = $('<div />'),
				currentSelection, pageX, pageY;
			
			// When an item has been selected then update the input box,
			// hide the results again and if set, call the onSelect function
			function selectResultItem(item) {
				obj.val(item[settings.matchField]);
				if(settings.idInput){
					$('#' + settings.idInput).val(item['id']);
				}
				$(results).html('').hide();
				
				if (typeof settings.onSelect === 'function') {
					settings.onSelect(item);
				}
			}

			// Used to get rid of the hover class on all result item elements in the
			// current set of results and add it only to the given element. We also
			// need to set the current selection to the given element here.
			function setHoverClass(el) {
				$('div.resultItem', results).removeClass('hover');
				$(el).addClass('hover');
				currentSelection = el;
			}

			
			// Build the results HTML based on an array of objects that matched
			// the search criteria, highlight the matches if feature is turned on in
			// the settings.
			function buildResults(resultObjects, sFilterTxt) {
				sFilterTxt = "(" + sFilterTxt + ")";
			
				var bOddRow = true, i, iFound = 0,
					filterPatt = settings.caseSensitive ? new RegExp(sFilterTxt, "g") : new RegExp(sFilterTxt, "ig");
					
				$(results).html('').hide();
				if(resultObjects.length>=1&& settings.valueMoreThanOne){
					settings.valueMoreThanOne.call(this);
				}
				for (i = 0; i < resultObjects.length; i += 1) {
					var item = $('<div />'),
						text = resultObjects[i][settings.matchField];
					if(settings.defaultSelect && i==0)
					{
						item.addClass('hover');
					}
					if (settings.highlightMatches === true) {
						text = text.replace(filterPatt, "<strong>$1</strong>");
					}
					
					$(item).append('<p class="text">' + text + '</p>');
					
					if (typeof resultObjects[i].extra === 'string') {
						$(item).append('<p class="extra">' + resultObjects[i].extra + '</p>');
					}
					
					if (typeof resultObjects[i].image === 'string') {
						$(item).prepend('<img src="' + resultObjects[i].image + '" />').
							append('<br style="clear:both;" />');
					}
					
					$(item).addClass('resultItem').
						addClass((bOddRow) ? 'odd' : 'even').
						click(function(n) { return function() {
							selectResultItem(resultObjects[n]);						
						};}(i)).
						mouseover(function(el) { return function() { 
							setHoverClass(el); 
						};}(item));
					
					$(results).append(item);
					bOddRow = !bOddRow;
					
					iFound += 1;
					if (typeof settings.maxResults === 'number' && iFound >= settings.maxResults) {
						break;
					}
				}
				
				if ($('div', results).length > 0) {
					currentSelection = undefined;
					$(results).show().css('height', 'auto');
					
					if ($(results).height() > settings.maxHeight) {
						$(results).css({'overflow': 'auto', 'height': settings.maxHeight + 'px'});
					}
				}
			}
			
			// Prepare the search string based on the settings for this plugin,
			// run it against each item in the searchData and display any 
			// results on the page allowing selection by the user.
			function runSuggest(what,e) {	
				if(what)
				{
					what = what.currentTarget;
				}
				if (what.value.length < settings.minCharacters) {
					$(results).html('').hide();
					if(settings.valueMoreThanOne && settings.mouseBlur){
						settings.mouseBlur.call(this);
					}
					return false;
				}
				
				var resultObjects = [],
					sFilterTxt = (!settings.wildCard) ? regexEscape(what.value) : regexEscape(what.value, settings.wildCard).replace(wildCardPatt, '.*'),
					bMatch = true, 
					filterPatt, i;
						
				if (settings.notCharacter && sFilterTxt.indexOf(settings.notCharacter) === 0) {
					sFilterTxt = sFilterTxt.substr(settings.notCharacter.length,sFilterTxt.length);
					if (sFilterTxt.length > 0) { bMatch = false; }
				}
				sFilterTxt = sFilterTxt || '.*';
				sFilterTxt = settings.wildCard ? '^' + sFilterTxt : sFilterTxt;
				filterPatt = settings.caseSensitive ? new RegExp(sFilterTxt) : new RegExp(sFilterTxt,"i");
				
				// Get the results from the correct place. If settings.ajaxResults then results are retrieved from
				// an external function each time they are needed else they are retrieved from the data
				// given on contruction.
				if (settings.ajaxResults === true) {
//					var timeoutId;
					matchValue = what.value;
					
//					clearTimeout(timeoutId);
		            //对于服务器端进行交互延迟500ms，避免快速打字造成的频繁请求
//		            timeoutId = setTimeout(function(){
						option = {};
						if(settings.minSearchLength)
						{
							if(matchValue.length<settings.minSearchLength)
							{
								return ;
							}
						}
						var jsonData = '{maxResults:' + settings.maxResults + ', matchFields:["' + settings.matchField + '"], matchValue:"' + encodeURI(matchValue) + '", caseSensitive:'
							+ settings.caseSensitive + ', autoConvert:' + settings.autoConvert + '}';
						option.data = 'p0=' + encodeURIComponent(jsonData);
						option.url = settings.uri + "getSuggestData.jsonp";
                        option.success = function(data){
                            buildResults(data, sFilterTxt);
                        }
						$.ajax({type:"GET",
								url: option.url, 
								data: option.data, 
								success: option.success,
								dataType: 'json'});
						
//					}, settings.waitTimemillisecond);
					
															
					if (typeof resultObjects === 'string') {
						resultObjects = JSON.parse(resultObjects);
					}
				}
				else {
					// Look for the required match against each single search data item. When the not
					// character is used we are looking for a false match. 
					var searchDataStr;
					for (i = 0; i < searchData.length; i += 1) {
						if(settings.autoConvert){
							searchDataStr = CC2PY(searchData[i][settings.matchField]);
							if (filterPatt.test(searchDataStr) === bMatch || filterPatt.test(searchData[i][settings.matchField]) === bMatch) {
								resultObjects.push(searchData[i]);
							}
						} else {
							searchDataStr = searchData[i][settings.matchField];
							if (filterPatt.test(searchDataStr) === bMatch) {
								resultObjects.push(searchData[i]);
							}
						}
						
					}
					buildResults(resultObjects, sFilterTxt);
				}
				
				
			}
			
			// To call specific actions based on the keys pressed in the input
			// box. Special keys are up, down and return. All other keys
			// act as normal.
			function keyListener(e) {
				switch (e.keyCode) {
					case 13: // return key
						$(currentSelection).trigger('click');
					
						return false;
					case 40: // down key
						if (typeof currentSelection === 'undefined') {
							currentSelection = $('div.resultItem:first', results).get(0);
						}
						else {
							currentSelection = $(currentSelection).next().get(0);
						}
						
						setHoverClass(currentSelection);
						if (currentSelection) {
							$(results).scrollTop(currentSelection.offsetTop);
						}
						
						return false;
					case 38: // up key
						if (typeof currentSelection === 'undefined') {
							currentSelection = $('div.resultItem:last', results).get(0);
						}
						else {
							currentSelection = $(currentSelection).prev().get(0);
						}
						
						setHoverClass(currentSelection);
						if (currentSelection) {
							$(results).scrollTop(currentSelection.offsetTop);
						}
						
						return false;
					default:
							
						if(!isChange)
						{	isChange = true;
							setTimeout(function(){
							runSuggest.apply(this, [e]);
							isChange = false;
							}, settings.waitTimemillisecond);
						}
				}
			}
			
			// Prepare the input box to show suggest results by adding in the events
			// that will initiate the search and placing the element on the page
			// that will show the results.
			$(results).addClass('jsonSuggestResults').
				css({
					'top': (obj.position().top + obj.height() + 5) + 'px',
					'left': obj.position().left + 'px',
					'width': obj.width() + 'px'
				}).hide();
				
			obj.after(results).
				keyup(keyListener).
				blur(function(e) {
					// We need to make sure we don't hide the result set
					// if the input blur event is called because of clicking on
					// a result item.
					var resPos = $(results).offset();
					if(settings.valueMoreThanOne && settings.mouseBlur){
						settings.mouseBlur.call(this);
					}
					resPos.bottom = resPos.top + $(results).height();
					resPos.right = resPos.left + $(results).width();
					
					if (pageY < resPos.top || pageY > resPos.bottom || pageX < resPos.left || pageX > resPos.right) {
						$(results).hide();
					}
					if(settings.defaultSelect)
					{
						var temp_text = $('.jsonSuggestResults div.hover').text();
						if(temp_text =='')
						{
							return;
						}
						$(this).val(temp_text);
						if(settings.selectCall)
						{
							settings.selectCall.call(this,temp_text);
						}
						
					}
				}).
				focus(function(e) {
					if ($('div', results).length > 0) {
						$(results).show();
						if(settings.valueMoreThanOne){
							settings.valueMoreThanOne.call(this);
						}
					}
				}).
				attr('autocomplete', 'off');
			$().mousemove(function(e) {
				pageX = e.pageX;
				pageY = e.pageY;
			});
			
			// Opera doesn't seem to assign a keyCode for the down
			// key on the keyup event. why?
			if ($.browser.opera) {
				obj.keydown(function(e) {
					if (e.keyCode === 40) { // up key
						return keyListener(e);
					}
				});
			}
			
			// Escape the not character if present so that it doesn't act in the regular expression
			settings.notCharacter = regexEscape(settings.notCharacter || '');
			
			// We need to get the javascript array type data from the searchData setting.
			// Setting can either be a string, already an array or a function that returns one
			// of those things. We only get this data if it isn't being provided using ajax on
			// each search
			if (!settings.ajaxResults) {
				if (typeof searchData === 'function') {
					searchData = searchData();
				}
				if (typeof searchData === 'string') {
					searchData = JSON.parse(searchData);
				}
			}
		});
	};

})(jQuery);
/*
  @author: remy sharp / http://remysharp.com
  @params:
    feedback - the selector for the element that gives the user feedback. Note that this will be relative to the form the plugin is run against.
    hardLimit - whether to stop the user being able to keep adding characters. Defaults to true.
    useInput - whether to look for a hidden input named 'maxlength' instead of the maxlength attribute. Defaults to false.
    words - limit by characters or words, set this to true to limit by words. Defaults to false.
  @license: Creative Commons License - ShareAlike http://creativecommons.org/licenses/by-sa/3.0/
  @version: 1.2
  @changes: code tidy via Ariel Flesler and fix when pasting over limit and including \t or \n
*/
var tipFun=function(cid){
	ZZtips.attachTip(cid,'超出字数限制，已经自动截取有效长度的字符!');
};

(function ($) {

$.fn.maxlength = function (settings) {

    if (typeof settings == 'string') {
        settings = { feedback : settings };
    }

    settings = $.extend({}, $.fn.maxlength.defaults, settings);

    function length(el) {
    	var parts = el.value;
    	if ( settings.words )
    		parts = el.value.length ? parts.split(/\s+/) : { length : 0 };
    	return parts.length;
    }
    
    return this.each(function () {
        var field = this,
        	$field = $(field),
        	$form = $(field.form),
        	limit = settings.useInput ? $form.find('input[name=maxlength]').val() : $field.attr('maxlength'),
        	$charsLeft = $form.find(settings.feedback);

    	function limitCheck(event) {
        	var len = length(this),
        	    exceeded = len >= limit,
        		code = event.keyCode;

        	if ( !exceeded )
        		return;

            switch (code) {
                case 8:  // allow delete
                case 9:
                case 17:
                case 36: // and cursor keys
                case 35:
                case 37: 
                case 38:
                case 39:
                case 40:
                case 46:
                case 65:
                    return;

                default:
                    return settings.words && code != 32 && code != 13 && len == limit;
            }
        }


        var updateCount = function () {
            var len = length(field),
            	diff = limit - len;

            $charsLeft.html( diff || "0" );

            // truncation code
            if (settings.hardLimit && diff < 0) {
            	field.value = settings.words ? 
            	    // split by white space, capturing it in the result, then glue them back
            		field.value.split(/(\s+)/, (limit*2)-1).join('') :
            		field.value.substr(0, limit);
                updateCount();
                setTimeout("tipFun('"+ this.id+"')",500);
                //ZZtips.attachTip(this.id,"超出字数限制，会自动截取有效长度的字符!", "信息提示");
            }
        };

        $field.keyup(updateCount).change(updateCount);
        if (settings.hardLimit) {
            $field.keydown(limitCheck);
        }

        updateCount();
    });
};

$.fn.maxlength.defaults = {
    useInput : false,
    hardLimit : true,
    feedback : '.charsLeft',
    words : false
};

})(jQuery);