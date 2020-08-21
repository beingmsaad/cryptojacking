"/*!\n\tColorbox v1.4.32 - 2013-10-16\n\tjQuery lightbox and modal window plugin\n\t(c) 2013 Jack Moore - http://www.jacklmoore.com/colorbox\n\tlicense: http://www.opensource.org/licenses/mit-license.php\n*/\n(function ($, document, window) {\n\tvar\n\t// Default settings object.\n\t// See http://jacklmoore.com/colorbox for details.\n\tdefaults = {\n\t\t// data sources\n\t\thtml: false,\n\t\tphoto: false,\n\t\tiframe: false,\n\t\tinline: false,\n\n\t\t// behavior and appearance\n\t\ttransition: \"elastic\",\n\t\tspeed: 300,\n\t\tfadeOut: 300,\n\t\twidth: false,\n\t\tinitialWidth: \"600\",\n\t\tinnerWidth: false,\n\t\tmaxWidth: false,\n\t\theight: false,\n\t\tinitialHeight: \"450\",\n\t\tinnerHeight: false,\n\t\tmaxHeight: false,\n\t\tscalePhotos: true,\n\t\tscrolling: true,\n\t\thref: false,\n\t\ttitle: false,\n\t\trel: false,\n\t\topacity: 0.9,\n\t\tpreloading: true,\n\t\tclassName: false,\n\t\toverlayClose: true,\n\t\tescKey: true,\n\t\tarrowKey: true,\n\t\ttop: false,\n\t\tbottom: false,\n\t\tleft: false,\n\t\tright: false,\n\t\tfixed: false,\n\t\tdata: undefined,\n\t\tcloseButton: true,\n\t\tfastIframe: true,\n\t\topen: false,\n\t\treposition: true,\n\t\tloop: true,\n\t\tslideshow: false,\n\t\tslideshowAuto: true,\n\t\tslideshowSpeed: 2500,\n\t\tslideshowStart: \"start slideshow\",\n\t\tslideshowStop: \"stop slideshow\",\n\t\tphotoRegex: /\\.(gif|png|jp(e|g|eg)|bmp|ico|webp)((#|\\?).*)?$/i,\n\n\t\t// alternate image paths for high-res displays\n\t\tretinaImage: false,\n\t\tretinaUrl: false,\n\t\tretinaSuffix: '@2x.$1',\n\n\t\t// internationalization\n\t\tcurrent: \"image {current} of {total}\",\n\t\tprevious: \"previous\",\n\t\tnext: \"next\",\n\t\tclose: \"close\",\n\t\txhrError: \"This content failed to load.\",\n\t\timgError: \"This image failed to load.\",\n\n\t\t// accessbility\n\t\treturnFocus: true,\n\t\ttrapFocus: true,\n\n\t\t// callbacks\n\t\tonOpen: false,\n\t\tonLoad: false,\n\t\tonComplete: false,\n\t\tonCleanup: false,\n\t\tonClosed: false\n\t},\n\t\n\t// Abstracting the HTML and event identifiers for easy rebranding\n\tcolorbox = 'colorbox',\n\tprefix = 'cbox',\n\tboxElement = prefix + 'Element',\n\t\n\t// Events\n\tevent_open = prefix + '_open',\n\tevent_load = prefix + '_load',\n\tevent_complete = prefix + '_complete',\n\tevent_cleanup = prefix + '_cleanup',\n\tevent_closed = prefix + '_closed',\n\tevent_purge = prefix + '_purge',\n\n\t// Cached jQuery Object Variables\n\t$overlay,\n\t$box,\n\t$wrap,\n\t$content,\n\t$topBorder,\n\t$leftBorder,\n\t$rightBorder,\n\t$bottomBorder,\n\t$related,\n\t$window,\n\t$loaded,\n\t$loadingBay,\n\t$loadingOverlay,\n\t$title,\n\t$current,\n\t$slideshow,\n\t$next,\n\t$prev,\n\t$close,\n\t$groupControls,\n\t$events = $('<a/>'),\n\t\n\t// Variables for cached values or use across multiple functions\n\tsettings,\n\tinterfaceHeight,\n\tinterfaceWidth,\n\tloadedHeight,\n\tloadedWidth,\n\telement,\n\tindex,\n\tphoto,\n\topen,\n\tactive,\n\tclosing,\n\tloadingTimer,\n\tpublicMethod,\n\tdiv = \"div\",\n\tclassName,\n\trequests = 0,\n\tpreviousCSS = {},\n\tinit;\n\n\t// ****************\n\t// HELPER FUNCTIONS\n\t// ****************\n\t\n\t// Convenience function for creating new jQuery objects\n\tfunction $tag(tag, id, css) {\n\t\tvar element = document.createElement(tag);\n\n\t\tif (id) {\n\t\t\telement.id = prefix + id;\n\t\t}\n\n\t\tif (css) {\n\t\t\telement.style.cssText = css;\n\t\t}\n\n\t\treturn $(element);\n\t}\n\t\n\t// Get the window height using innerHeight when available to avoid an issue with iOS\n\t// http://bugs.jquery.com/ticket/6724\n\tfunction winheight() {\n\t\treturn window.innerHeight ? window.innerHeight : $(window).height();\n\t}\n\n\t// Determine the next and previous members in a group.\n\tfunction getIndex(increment) {\n\t\tvar\n\t\tmax = $related.length,\n\t\tnewIndex = (index + increment) % max;\n\t\t\n\t\treturn (newIndex < 0) ? max + newIndex : newIndex;\n\t}\n\n\t// Convert '%' and 'px' values to integers\n\tfunction setSize(size, dimension) {\n\t\treturn Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : winheight()) / 100) : 1) * parseInt(size, 10));\n\t}\n\t\n\t// Checks an href to see if it is a photo.\n\t// There is a force photo option (photo: true) for hrefs that cannot be matched by the regex.\n\tfunction isImage(settings, url) {\n\t\treturn settings.photo || settings.photoRegex.test(url);\n\t}\n\n\tfunction retinaUrl(settings, url) {\n\t\treturn settings.retinaUrl && window.devicePixelRatio > 1 ? url.replace(settings.photoRegex, settings.retinaSuffix) : url;\n\t}\n\n\tfunction trapFocus(e) {\n\t\tif ('contains' in $box[0] && !$box[0].contains(e.target)) {\n\t\t\te.stopPropagation();\n\t\t\t$box.focus();\n\t\t}\n\t}\n\n\t// Assigns function results to their respective properties\n\tfunction makeSettings() {\n\t\tvar i,\n\t\t\tdata = $.data(element, colorbox);\n\t\t\n\t\tif (data == null) {\n\t\t\tsettings = $.extend({}, defaults);\n\t\t\tif (console && console.log) {\n\t\t\t\tconsole.log('Error: cboxElement missing settings object');\n\t\t\t}\n\t\t} else {\n\t\t\tsettings = $.extend({}, data);\n\t\t}\n\t\t\n\t\tfor (i in settings) {\n\t\t\tif ($.isFunction(settings[i]) && i.slice(0, 2) !== 'on') { // checks to make sure the function isn't one of the callbacks, they will be handled at the appropriate time.\n\t\t\t\tsettings[i] = settings[i].call(element);\n\t\t\t}\n\t\t}\n\t\t\n\t\tsettings.rel = settings.rel || element.rel || $(element).data('rel') || 'nofollow';\n\t\tsettings.href = settings.href || $(element).attr('href');\n\t\tsettings.title = settings.title || element.title;\n\t\t\n\t\tif (typeof settings.href === \"string\") {\n\t\t\tsettings.href = $.trim(settings.href);\n\t\t}\n\t}\n\n\tfunction trigger(event, callback) {\n\t\t// for external use\n\t\t$(document).trigger(event);\n\n\t\t// for internal use\n\t\t$events.trigger(event);\n\n\t\tif ($.isFunction(callback)) {\n\t\t\tcallback.call(element);\n\t\t}\n\t}\n\n\n\tvar slideshow = (function(){\n\t\tvar active,\n\t\t\tclassName = prefix + \"Slideshow_\",\n\t\t\tclick = \"click.\" + prefix,\n\t\t\ttimeOut;\n\n\t\tfunction clear () {\n\t\t\tclearTimeout(timeOut);\n\t\t}\n\n\t\tfunction set() {\n\t\t\tif (settings.loop || $related[index + 1]) {\n\t\t\t\tclear();\n\t\t\t\ttimeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);\n\t\t\t}\n\t\t}\n\n\t\tfunction start() {\n\t\t\t$slideshow\n\t\t\t\t.html(settings.slideshowStop)\n\t\t\t\t.unbind(click)\n\t\t\t\t.one(click, stop);\n\n\t\t\t$events\n\t\t\t\t.bind(event_complete, set)\n\t\t\t\t.bind(event_load, clear);\n\n\t\t\t$box.removeClass(className + \"off\").addClass(className + \"on\");\n\t\t}\n\n\t\tfunction stop() {\n\t\t\tclear();\n\t\t\t\n\t\t\t$events\n\t\t\t\t.unbind(event_complete, set)\n\t\t\t\t.unbind(event_load, clear);\n\n\t\t\t$slideshow\n\t\t\t\t.html(settings.slideshowStart)\n\t\t\t\t.unbind(click)\n\t\t\t\t.one(click, function () {\n\t\t\t\t\tpublicMethod.next();\n\t\t\t\t\tstart();\n\t\t\t\t});\n\n\t\t\t$box.removeClass(className + \"on\").addClass(className + \"off\");\n\t\t}\n\n\t\tfunction reset() {\n\t\t\tactive = false;\n\t\t\t$slideshow.hide();\n\t\t\tclear();\n\t\t\t$events\n\t\t\t\t.unbind(event_complete, set)\n\t\t\t\t.unbind(event_load, clear);\n\t\t\t$box.removeClass(className + \"off \" + className + \"on\");\n\t\t}\n\n\t\treturn function(){\n\t\t\tif (active) {\n\t\t\t\tif (!settings.slideshow) {\n\t\t\t\t\t$events.unbind(event_cleanup, reset);\n\t\t\t\t\treset();\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tif (settings.slideshow && $related[1]) {\n\t\t\t\t\tactive = true;\n\t\t\t\t\t$events.one(event_cleanup, reset);\n\t\t\t\t\tif (settings.slideshowAuto) {\n\t\t\t\t\t\tstart();\n\t\t\t\t\t} else {\n\t\t\t\t\t\tstop();\n\t\t\t\t\t}\n\t\t\t\t\t$slideshow.show();\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t}());\n\n\n\tfunction launch(target) {\n\t\tif (!closing) {\n\t\t\t\n\t\t\telement = target;\n\t\t\t\n\t\t\tmakeSettings();\n\t\t\t\n\t\t\t$related = $(element);\n\t\t\t\n\t\t\tindex = 0;\n\t\t\t\n\t\t\tif (settings.rel !== 'nofollow') {\n\t\t\t\t$related = $('.' + boxElement).filter(function () {\n\t\t\t\t\tvar data = $.data(this, colorbox),\n\t\t\t\t\t\trelRelated;\n\n\t\t\t\t\tif (data) {\n\t\t\t\t\t\trelRelated =  $(this).data('rel') || data.rel || this.rel;\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\treturn (relRelated === settings.rel);\n\t\t\t\t});\n\t\t\t\tindex = $related.index(element);\n\t\t\t\t\n\t\t\t\t// Check direct calls to Colorbox.\n\t\t\t\tif (index === -1) {\n\t\t\t\t\t$related = $related.add(element);\n\t\t\t\t\tindex = $related.length - 1;\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\t$overlay.css({\n\t\t\t\topacity: parseFloat(settings.opacity),\n\t\t\t\tcursor: settings.overlayClose ? \"pointer\" : \"auto\",\n\t\t\t\tvisibility: 'visible'\n\t\t\t}).show();\n\t\t\t\n\n\t\t\tif (className) {\n\t\t\t\t$box.add($overlay).removeClass(className);\n\t\t\t}\n\t\t\tif (settings.className) {\n\t\t\t\t$box.add($overlay).addClass(settings.className);\n\t\t\t}\n\t\t\tclassName = settings.className;\n\n\t\t\tif (settings.closeButton) {\n\t\t\t\t$close.html(settings.close).appendTo($content);\n\t\t\t} else {\n\t\t\t\t$close.appendTo('<div/>');\n\t\t\t}\n\n\t\t\tif (!open) {\n\t\t\t\topen = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.\n\t\t\t\t\n\t\t\t\t// Show colorbox so the sizes can be calculated in older versions of jQuery\n\t\t\t\t$box.css({visibility:'hidden', display:'block'});\n\t\t\t\t\n\t\t\t\t$loaded = $tag(div, 'LoadedContent', 'width:0; height:0; overflow:hidden');\n\t\t\t\t$content.css({width:'', height:''}).append($loaded);\n\n\t\t\t\t// Cache values needed for size calculations\n\t\t\t\tinterfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();\n\t\t\t\tinterfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();\n\t\t\t\tloadedHeight = $loaded.outerHeight(true);\n\t\t\t\tloadedWidth = $loaded.outerWidth(true);\n\n\t\t\t\t// Opens inital empty Colorbox prior to content being loaded.\n\t\t\t\tsettings.w = setSize(settings.initialWidth, 'x');\n\t\t\t\tsettings.h = setSize(settings.initialHeight, 'y');\n\t\t\t\t$loaded.css({width:'', height:settings.h});\n\t\t\t\tpublicMethod.position();\n\n\t\t\t\ttrigger(event_open, settings.onOpen);\n\t\t\t\t\n\t\t\t\t$groupControls.add($title).hide();\n\n\t\t\t\t$box.focus();\n\t\t\t\t\n\t\t\t\tif (settings.trapFocus) {\n\t\t\t\t\t// Confine focus to the modal\n\t\t\t\t\t// Uses event capturing that is not supported in IE8-\n\t\t\t\t\tif (document.addEventListener) {\n\n\t\t\t\t\t\tdocument.addEventListener('focus', trapFocus, true);\n\t\t\t\t\t\t\n\t\t\t\t\t\t$events.one(event_closed, function () {\n\t\t\t\t\t\t\tdocument.removeEventListener('focus', trapFocus, true);\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Return focus on closing\n\t\t\t\tif (settings.returnFocus) {\n\t\t\t\t\t$events.one(event_closed, function () {\n\t\t\t\t\t\t$(element).focus();\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}\n\t\t\tload();\n\t\t}\n\t}\n\n\t// Colorbox's markup needs to be added to the DOM prior to being called\n\t// so that the browser will go ahead and load the CSS background images.\n\tfunction appendHTML() {\n\t\tif (!$box && document.body) {\n\t\t\tinit = false;\n\t\t\t$window = $(window);\n\t\t\t$box = $tag(div).attr({\n\t\t\t\tid: colorbox,\n\t\t\t\t'class': $.support.opacity === false ? prefix + 'IE' : '', // class for optional IE8 & lower targeted CSS.\n\t\t\t\trole: 'dialog',\n\t\t\t\ttabindex: '-1'\n\t\t\t}).hide();\n\t\t\t$overlay = $tag(div, \"Overlay\").hide();\n\t\t\t$loadingOverlay = $([$tag(div, \"LoadingOverlay\")[0],$tag(div, \"LoadingGraphic\")[0]]);\n\t\t\t$wrap = $tag(div, \"Wrapper\");\n\t\t\t$content = $tag(div, \"Content\").append(\n\t\t\t\t$title = $tag(div, \"Title\"),\n\t\t\t\t$current = $tag(div, \"Current\"),\n\t\t\t\t$prev = $('<button type=\"button\"/>').attr({id:prefix+'Previous'}),\n\t\t\t\t$next = $('<button type=\"button\"/>').attr({id:prefix+'Next'}),\n\t\t\t\t$slideshow = $tag('button', \"Slideshow\"),\n\t\t\t\t$loadingOverlay\n\t\t\t);\n\n\t\t\t$close = $('<button type=\"button\"/>').attr({id:prefix+'Close'});\n\t\t\t\n\t\t\t$wrap.append( // The 3x3 Grid that makes up Colorbox\n\t\t\t\t$tag(div).append(\n\t\t\t\t\t$tag(div, \"TopLeft\"),\n\t\t\t\t\t$topBorder = $tag(div, \"TopCenter\"),\n\t\t\t\t\t$tag(div, \"TopRight\")\n\t\t\t\t),\n\t\t\t\t$tag(div, false, 'clear:left').append(\n\t\t\t\t\t$leftBorder = $tag(div, \"MiddleLeft\"),\n\t\t\t\t\t$content,\n\t\t\t\t\t$rightBorder = $tag(div, \"MiddleRight\")\n\t\t\t\t),\n\t\t\t\t$tag(div, false, 'clear:left').append(\n\t\t\t\t\t$tag(div, \"BottomLeft\"),\n\t\t\t\t\t$bottomBorder = $tag(div, \"BottomCenter\"),\n\t\t\t\t\t$tag(div, \"BottomRight\")\n\t\t\t\t)\n\t\t\t).find('div div').css({'float': 'left'});\n\t\t\t\n\t\t\t$loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;');\n\t\t\t\n\t\t\t$groupControls = $next.add($prev).add($current).add($slideshow);\n\n\t\t\t$(document.body).append($overlay, $box.append($wrap, $loadingBay));\n\t\t}\n\t}\n\n\t// Add Colorbox's event bindings\n\tfunction addBindings() {\n\t\tfunction clickHandler(e) {\n\t\t\t// ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.\n\t\t\t// See: http://jacklmoore.com/notes/click-events/\n\t\t\tif (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {\n\t\t\t\te.preventDefault();\n\t\t\t\tlaunch(this);\n\t\t\t}\n\t\t}\n\n\t\tif ($box) {\n\t\t\tif (!init) {\n\t\t\t\tinit = true;\n\n\t\t\t\t// Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.\n\t\t\t\t$next.click(function () {\n\t\t\t\t\tpublicMethod.next();\n\t\t\t\t});\n\t\t\t\t$prev.click(function () {\n\t\t\t\t\tpublicMethod.prev();\n\t\t\t\t});\n\t\t\t\t$close.click(function () {\n\t\t\t\t\tpublicMethod.close();\n\t\t\t\t});\n\t\t\t\t$overlay.click(function () {\n\t\t\t\t\tif (settings.overlayClose) {\n\t\t\t\t\t\tpublicMethod.close();\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t\t\n\t\t\t\t// Key Bindings\n\t\t\t\t$(document).bind('keydown.' + prefix, function (e) {\n\t\t\t\t\tvar key = e.keyCode;\n\t\t\t\t\tif (open && settings.escKey && key === 27) {\n\t\t\t\t\t\te.preventDefault();\n\t\t\t\t\t\tpublicMethod.close();\n\t\t\t\t\t}\n\t\t\t\t\tif (open && settings.arrowKey && $related[1] && !e.altKey) {\n\t\t\t\t\t\tif (key === 37) {\n\t\t\t\t\t\t\te.preventDefault();\n\t\t\t\t\t\t\t$prev.click();\n\t\t\t\t\t\t} else if (key === 39) {\n\t\t\t\t\t\t\te.preventDefault();\n\t\t\t\t\t\t\t$next.click();\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t});\n\n\t\t\t\tif ($.isFunction($.fn.on)) {\n\t\t\t\t\t// For jQuery 1.7+\n\t\t\t\t\t$(document).on('click.'+prefix, '.'+boxElement, clickHandler);\n\t\t\t\t} else {\n\t\t\t\t\t// For jQuery 1.3.x -> 1.6.x\n\t\t\t\t\t// This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.\n\t\t\t\t\t// This is not here for jQuery 1.9, it's here for legacy users.\n\t\t\t\t\t$('.'+boxElement).live('click.'+prefix, clickHandler);\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn true;\n\t\t}\n\t\treturn false;\n\t}\n\n\t// Don't do anything if Colorbox already exists.\n\tif ($.colorbox) {\n\t\treturn;\n\t}\n\n\t// Append the HTML when the DOM loads\n\t$(appendHTML);\n\n\n\t// ****************\n\t// PUBLIC FUNCTIONS\n\t// Usage format: $.colorbox.close();\n\t// Usage from within an iframe: parent.jQuery.colorbox.close();\n\t// ****************\n\t\n\tpublicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {\n\t\tvar $this = this;\n\t\t\n\t\toptions = options || {};\n\t\t\n\t\tappendHTML();\n\n\t\tif (addBindings()) {\n\t\t\tif ($.isFunction($this)) { // assume a call to $.colorbox\n\t\t\t\t$this = $('<a/>');\n\t\t\t\toptions.open = true;\n\t\t\t} else if (!$this[0]) { // colorbox being applied to empty collection\n\t\t\t\treturn $this;\n\t\t\t}\n\t\t\t\n\t\t\tif (callback) {\n\t\t\t\toptions.onComplete = callback;\n\t\t\t}\n\t\t\t\n\t\t\t$this.each(function () {\n\t\t\t\t$.data(this, colorbox, $.extend({}, $.data(this, colorbox) || defaults, options));\n\t\t\t}).addClass(boxElement);\n\t\t\t\n\t\t\tif (($.isFunction(options.open) && options.open.call($this)) || options.open) {\n\t\t\t\tlaunch($this[0]);\n\t\t\t}\n\t\t}\n\t\t\n\t\treturn $this;\n\t};\n\n\tpublicMethod.position = function (speed, loadedCallback) {\n\t\tvar\n\t\tcss,\n\t\ttop = 0,\n\t\tleft = 0,\n\t\toffset = $box.offset(),\n\t\tscrollTop,\n\t\tscrollLeft;\n\t\t\n\t\t$window.unbind('resize.' + prefix);\n\n\t\t// remove the modal so that it doesn't influence the document width/height\n\t\t$box.css({top: -9e4, left: -9e4});\n\n\t\tscrollTop = $window.scrollTop();\n\t\tscrollLeft = $window.scrollLeft();\n\n\t\tif (settings.fixed) {\n\t\t\toffset.top -= scrollTop;\n\t\t\toffset.left -= scrollLeft;\n\t\t\t$box.css({position: 'fixed'});\n\t\t} else {\n\t\t\ttop = scrollTop;\n\t\t\tleft = scrollLeft;\n\t\t\t$box.css({position: 'absolute'});\n\t\t}\n\n\t\t// keeps the top and left positions within the browser's viewport.\n\t\tif (settings.right !== false) {\n\t\t\tleft += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.right, 'x'), 0);\n\t\t} else if (settings.left !== false) {\n\t\t\tleft += setSize(settings.left, 'x');\n\t\t} else {\n\t\t\tleft += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);\n\t\t}\n\t\t\n\t\tif (settings.bottom !== false) {\n\t\t\ttop += Math.max(winheight() - settings.h - loadedHeight - interfaceHeight - setSize(settings.bottom, 'y'), 0);\n\t\t} else if (settings.top !== false) {\n\t\t\ttop += setSize(settings.top, 'y');\n\t\t} else {\n\t\t\ttop += Math.round(Math.max(winheight() - settings.h - loadedHeight - interfaceHeight, 0) / 2);\n\t\t}\n\n\t\t$box.css({top: offset.top, left: offset.left, visibility:'visible'});\n\t\t\n\t\t// this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,\n\t\t// but it has to be shrank down around the size of div#colorbox when it's done.  If not,\n\t\t// it can invoke an obscure IE bug when using iframes.\n\t\t$wrap[0].style.width = $wrap[0].style.height = \"9999px\";\n\t\t\n\t\tfunction modalDimensions() {\n\t\t\t$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = (parseInt($box[0].style.width,10) - interfaceWidth)+'px';\n\t\t\t$content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = (parseInt($box[0].style.height,10) - interfaceHeight)+'px';\n\t\t}\n\n\t\tcss = {width: settings.w + loadedWidth + interfaceWidth, height: settings.h + loadedHeight + interfaceHeight, top: top, left: left};\n\n\t\t// setting the speed to 0 if the content hasn't changed size or position\n\t\tif (speed) {\n\t\t\tvar tempSpeed = 0;\n\t\t\t$.each(css, function(i){\n\t\t\t\tif (css[i] !== previousCSS[i]) {\n\t\t\t\t\ttempSpeed = speed;\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t});\n\t\t\tspeed = tempSpeed;\n\t\t}\n\n\t\tpreviousCSS = css;\n\n\t\tif (!speed) {\n\t\t\t$box.css(css);\n\t\t}\n\n\t\t$box.dequeue().animate(css, {\n\t\t\tduration: speed || 0,\n\t\t\tcomplete: function () {\n\t\t\t\tmodalDimensions();\n\t\t\t\t\n\t\t\t\tactive = false;\n\t\t\t\t\n\t\t\t\t// shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.\n\t\t\t\t$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + \"px\";\n\t\t\t\t$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + \"px\";\n\t\t\t\t\n\t\t\t\tif (settings.reposition) {\n\t\t\t\t\tsetTimeout(function () {  // small delay before binding onresize due to an IE8 bug.\n\t\t\t\t\t\t$window.bind('resize.' + prefix, publicMethod.position);\n\t\t\t\t\t}, 1);\n\t\t\t\t}\n\n\t\t\t\tif (loadedCallback) {\n\t\t\t\t\tloadedCallback();\n\t\t\t\t}\n\t\t\t},\n\t\t\tstep: modalDimensions\n\t\t});\n\t};\n\n\tpublicMethod.resize = function (options) {\n\t\tvar scrolltop;\n\t\t\n\t\tif (open) {\n\t\t\toptions = options || {};\n\t\t\t\n\t\t\tif (options.width) {\n\t\t\t\tsettings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;\n\t\t\t}\n\n\t\t\tif (options.innerWidth) {\n\t\t\t\tsettings.w = setSize(options.innerWidth, 'x');\n\t\t\t}\n\n\t\t\t$loaded.css({width: settings.w});\n\t\t\t\n\t\t\tif (options.height) {\n\t\t\t\tsettings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;\n\t\t\t}\n\n\t\t\tif (options.innerHeight) {\n\t\t\t\tsettings.h = setSize(options.innerHeight, 'y');\n\t\t\t}\n\n\t\t\tif (!options.innerHeight && !options.height) {\n\t\t\t\tscrolltop = $loaded.scrollTop();\n\t\t\t\t$loaded.css({height: \"auto\"});\n\t\t\t\tsettings.h = $loaded.height();\n\t\t\t}\n\n\t\t\t$loaded.css({height: settings.h});\n\n\t\t\tif(scrolltop) {\n\t\t\t\t$loaded.scrollTop(scrolltop);\n\t\t\t}\n\t\t\t\n\t\t\tpublicMethod.position(settings.transition === \"none\" ? 0 : settings.speed);\n\t\t}\n\t};\n\n\tpublicMethod.prep = function (object) {\n\t\tif (!open) {\n\t\t\treturn;\n\t\t}\n\t\t\n\t\tvar callback, speed = settings.transition === \"none\" ? 0 : settings.speed;\n\n\t\t$loaded.empty().remove(); // Using empty first may prevent some IE7 issues.\n\n\t\t$loaded = $tag(div, 'LoadedContent').append(object);\n\t\t\n\t\tfunction getWidth() {\n\t\t\tsettings.w = settings.w || $loaded.width();\n\t\t\tsettings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;\n\t\t\treturn settings.w;\n\t\t}\n\t\tfunction getHeight() {\n\t\t\tsettings.h = settings.h || $loaded.height();\n\t\t\tsettings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;\n\t\t\treturn settings.h;\n\t\t}\n\t\t\n\t\t$loaded.hide()\n\t\t.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.\n\t\t.css({width: getWidth(), overflow: settings.scrolling ? 'auto' : 'hidden'})\n\t\t.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.\n\t\t.prependTo($content);\n\t\t\n\t\t$loadingBay.hide();\n\t\t\n\t\t// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.\n\t\t\n\t\t$(photo).css({'float': 'none'});\n\n\t\tcallback = function () {\n\t\t\tvar total = $related.length,\n\t\t\t\tiframe,\n\t\t\t\tframeBorder = 'frameBorder',\n\t\t\t\tallowTransparency = 'allowTransparency',\n\t\t\t\tcomplete;\n\t\t\t\n\t\t\tif (!open) {\n\t\t\t\treturn;\n\t\t\t}\n\t\t\t\n\t\t\tfunction removeFilter() { // Needed for IE7 & IE8 in versions of jQuery prior to 1.7.2\n\t\t\t\tif ($.support.opacity === false) {\n\t\t\t\t\t$box[0].style.removeAttribute('filter');\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tcomplete = function () {\n\t\t\t\tclearTimeout(loadingTimer);\n\t\t\t\t$loadingOverlay.hide();\n\t\t\t\ttrigger(event_complete, settings.onComplete);\n\t\t\t};\n\n\t\t\t\n\t\t\t$title.html(settings.title).add($loaded).show();\n\t\t\t\n\t\t\tif (total > 1) { // handle grouping\n\t\t\t\tif (typeof settings.current === \"string\") {\n\t\t\t\t\t$current.html(settings.current.replace('{current}', index + 1).replace('{total}', total)).show();\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t$next[(settings.loop || index < total - 1) ? \"show\" : \"hide\"]().html(settings.next);\n\t\t\t\t$prev[(settings.loop || index) ? \"show\" : \"hide\"]().html(settings.previous);\n\t\t\t\t\n\t\t\t\tslideshow();\n\t\t\t\t\n\t\t\t\t// Preloads images within a rel group\n\t\t\t\tif (settings.preloading) {\n\t\t\t\t\t$.each([getIndex(-1), getIndex(1)], function(){\n\t\t\t\t\t\tvar src,\n\t\t\t\t\t\t\timg,\n\t\t\t\t\t\t\ti = $related[this],\n\t\t\t\t\t\t\tdata = $.data(i, colorbox);\n\n\t\t\t\t\t\tif (data && data.href) {\n\t\t\t\t\t\t\tsrc = data.href;\n\t\t\t\t\t\t\tif ($.isFunction(src)) {\n\t\t\t\t\t\t\t\tsrc = src.call(i);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tsrc = $(i).attr('href');\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (src && isImage(data, src)) {\n\t\t\t\t\t\t\tsrc = retinaUrl(data, src);\n\t\t\t\t\t\t\timg = document.createElement('img');\n\t\t\t\t\t\t\timg.src = src;\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\t$groupControls.hide();\n\t\t\t}\n\t\t\t\n\t\t\tif (settings.iframe) {\n\t\t\t\tiframe = $tag('iframe')[0];\n\t\t\t\t\n\t\t\t\tif (frameBorder in iframe) {\n\t\t\t\t\tiframe[frameBorder] = 0;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tif (allowTransparency in iframe) {\n\t\t\t\t\tiframe[allowTransparency] = \"true\";\n\t\t\t\t}\n\n\t\t\t\tif (!settings.scrolling) {\n\t\t\t\t\tiframe.scrolling = \"no\";\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t$(iframe)\n\t\t\t\t\t.attr({\n\t\t\t\t\t\tsrc: settings.href,\n\t\t\t\t\t\tname: (new Date()).getTime(), // give the iframe a unique name to prevent caching\n\t\t\t\t\t\t'class': prefix + 'Iframe',\n\t\t\t\t\t\tallowFullScreen : true, // allow HTML5 video to go fullscreen\n\t\t\t\t\t\twebkitAllowFullScreen : true,\n\t\t\t\t\t\tmozallowfullscreen : true\n\t\t\t\t\t})\n\t\t\t\t\t.one('load', complete)\n\t\t\t\t\t.appendTo($loaded);\n\t\t\t\t\n\t\t\t\t$events.one(event_purge, function () {\n\t\t\t\t\tiframe.src = \"//about:blank\";\n\t\t\t\t});\n\n\t\t\t\tif (settings.fastIframe) {\n\t\t\t\t\t$(iframe).trigger('load');\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tcomplete();\n\t\t\t}\n\t\t\t\n\t\t\tif (settings.transition === 'fade') {\n\t\t\t\t$box.fadeTo(speed, 1, removeFilter);\n\t\t\t} else {\n\t\t\t\tremoveFilter();\n\t\t\t}\n\t\t};\n\t\t\n\t\tif (settings.transition === 'fade') {\n\t\t\t$box.fadeTo(speed, 0, function () {\n\t\t\t\tpublicMethod.position(0, callback);\n\t\t\t});\n\t\t} else {\n\t\t\tpublicMethod.position(speed, callback);\n\t\t}\n\t};\n\n\tfunction load () {\n\t\tvar href, setResize, prep = publicMethod.prep, $inline, request = ++requests;\n\t\t\n\t\tactive = true;\n\t\t\n\t\tphoto = false;\n\t\t\n\t\telement = $related[index];\n\t\t\n\t\tmakeSettings();\n\t\t\n\t\ttrigger(event_purge);\n\t\t\n\t\ttrigger(event_load, settings.onLoad);\n\t\t\n\t\tsettings.h = settings.height ?\n\t\t\t\tsetSize(settings.height, 'y') - loadedHeight - interfaceHeight :\n\t\t\t\tsettings.innerHeight && setSize(settings.innerHeight, 'y');\n\t\t\n\t\tsettings.w = settings.width ?\n\t\t\t\tsetSize(settings.width, 'x') - loadedWidth - interfaceWidth :\n\t\t\t\tsettings.innerWidth && setSize(settings.innerWidth, 'x');\n\t\t\n\t\t// Sets the minimum dimensions for use in image scaling\n\t\tsettings.mw = settings.w;\n\t\tsettings.mh = settings.h;\n\t\t\n\t\t// Re-evaluate the minimum width and height based on maxWidth and maxHeight values.\n\t\t// If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.\n\t\tif (settings.maxWidth) {\n\t\t\tsettings.mw = setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth;\n\t\t\tsettings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;\n\t\t}\n\t\tif (settings.maxHeight) {\n\t\t\tsettings.mh = setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight;\n\t\t\tsettings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;\n\t\t}\n\t\t\n\t\thref = settings.href;\n\t\t\n\t\tloadingTimer = setTimeout(function () {\n\t\t\t$loadingOverlay.show();\n\t\t}, 100);\n\t\t\n\t\tif (settings.inline) {\n\t\t\t// Inserts an empty placeholder where inline content is being pulled from.\n\t\t\t// An event is bound to put inline content back when Colorbox closes or loads new content.\n\t\t\t$inline = $tag(div).hide().insertBefore($(href)[0]);\n\n\t\t\t$events.one(event_purge, function () {\n\t\t\t\t$inline.replaceWith($loaded.children());\n\t\t\t});\n\n\t\t\tprep($(href));\n\t\t} else if (settings.iframe) {\n\t\t\t// IFrame element won't be added to the DOM until it is ready to be displayed,\n\t\t\t// to avoid problems with DOM-ready JS that might be trying to run in that iframe.\n\t\t\tprep(\" \");\n\t\t} else if (settings.html) {\n\t\t\tprep(settings.html);\n\t\t} else if (isImage(settings, href)) {\n\n\t\t\thref = retinaUrl(settings, href);\n\n\t\t\tphoto = document.createElement('img');\n\n\t\t\t$(photo)\n\t\t\t.addClass(prefix + 'Photo')\n\t\t\t.bind('error',function () {\n\t\t\t\tsettings.title = false;\n\t\t\t\tprep($tag(div, 'Error').html(settings.imgError));\n\t\t\t})\n\t\t\t.one('load', function () {\n\t\t\t\tvar percent;\n\n\t\t\t\tif (request !== requests) {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\t$.each(['alt', 'longdesc', 'aria-describedby'], function(i,val){\n\t\t\t\t\tvar attr = $(element).attr(val) || $(element).attr('data-'+val);\n\t\t\t\t\tif (attr) {\n\t\t\t\t\t\tphoto.setAttribute(val, attr);\n\t\t\t\t\t}\n\t\t\t\t});\n\n\t\t\t\tif (settings.retinaImage && window.devicePixelRatio > 1) {\n\t\t\t\t\tphoto.height = photo.height / window.devicePixelRatio;\n\t\t\t\t\tphoto.width = photo.width / window.devicePixelRatio;\n\t\t\t\t}\n\n\t\t\t\tif (settings.scalePhotos) {\n\t\t\t\t\tsetResize = function () {\n\t\t\t\t\t\tphoto.height -= photo.height * percent;\n\t\t\t\t\t\tphoto.width -= photo.width * percent;\n\t\t\t\t\t};\n\t\t\t\t\tif (settings.mw && photo.width > settings.mw) {\n\t\t\t\t\t\tpercent = (photo.width - settings.mw) / photo.width;\n\t\t\t\t\t\tsetResize();\n\t\t\t\t\t}\n\t\t\t\t\tif (settings.mh && photo.height > settings.mh) {\n\t\t\t\t\t\tpercent = (photo.height - settings.mh) / photo.height;\n\t\t\t\t\t\tsetResize();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tif (settings.h) {\n\t\t\t\t\tphoto.style.marginTop = Math.max(settings.mh - photo.height, 0) / 2 + 'px';\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tif ($related[1] && (settings.loop || $related[index + 1])) {\n\t\t\t\t\tphoto.style.cursor = 'pointer';\n\t\t\t\t\tphoto.onclick = function () {\n\t\t\t\t\t\tpublicMethod.next();\n\t\t\t\t\t};\n\t\t\t\t}\n\n\t\t\t\tphoto.style.width = photo.width + 'px';\n\t\t\t\tphoto.style.height = photo.height + 'px';\n\n\t\t\t\tsetTimeout(function () { // A pause because Chrome will sometimes report a 0 by 0 size otherwise.\n\t\t\t\t\tprep(photo);\n\t\t\t\t}, 1);\n\t\t\t});\n\t\t\t\n\t\t\tsetTimeout(function () { // A pause because Opera 10.6+ will sometimes not run the onload function otherwise.\n\t\t\t\tphoto.src = href;\n\t\t\t}, 1);\n\t\t} else if (href) {\n\t\t\t$loadingBay.load(href, settings.data, function (data, status) {\n\t\t\t\tif (request === requests) {\n\t\t\t\t\tprep(status === 'error' ? $tag(div, 'Error').html(settings.xhrError) : $(this).contents());\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\t}\n\t\t\n\t// Navigates to the next page/image in a set.\n\tpublicMethod.next = function () {\n\t\tif (!active && $related[1] && (settings.loop || $related[index + 1])) {\n\t\t\tindex = getIndex(1);\n\t\t\tlaunch($related[index]);\n\t\t}\n\t};\n\t\n\tpublicMethod.prev = function () {\n\t\tif (!active && $related[1] && (settings.loop || index)) {\n\t\t\tindex = getIndex(-1);\n\t\t\tlaunch($related[index]);\n\t\t}\n\t};\n\n\t// Note: to use this within an iframe use the following format: parent.jQuery.colorbox.close();\n\tpublicMethod.close = function () {\n\t\tif (open && !closing) {\n\t\t\t\n\t\t\tclosing = true;\n\t\t\t\n\t\t\topen = false;\n\t\t\t\n\t\t\ttrigger(event_cleanup, settings.onCleanup);\n\t\t\t\n\t\t\t$window.unbind('.' + prefix);\n\t\t\t\n\t\t\t$overlay.fadeTo(settings.fadeOut || 0, 0);\n\t\t\t\n\t\t\t$box.stop().fadeTo(settings.fadeOut || 0, 0, function () {\n\t\t\t\n\t\t\t\t$box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();\n\t\t\t\t\n\t\t\t\ttrigger(event_purge);\n\t\t\t\t\n\t\t\t\t$loaded.empty().remove(); // Using empty first may prevent some IE7 issues.\n\t\t\t\t\n\t\t\t\tsetTimeout(function () {\n\t\t\t\t\tclosing = false;\n\t\t\t\t\ttrigger(event_closed, settings.onClosed);\n\t\t\t\t}, 1);\n\t\t\t});\n\t\t}\n\t};\n\n\t// Removes changes Colorbox made to the document, but does not remove the plugin.\n\tpublicMethod.remove = function () {\n\t\tif (!$box) { return; }\n\n\t\t$box.stop();\n\t\t$.colorbox.close();\n\t\t$box.stop().remove();\n\t\t$overlay.remove();\n\t\tclosing = false;\n\t\t$box = null;\n\t\t$('.' + boxElement)\n\t\t\t.removeData(colorbox)\n\t\t\t.removeClass(boxElement);\n\n\t\t$(document).unbind('click.'+prefix);\n\t};\n\n\t// A method for fetching the current element Colorbox is referencing.\n\t// returns a jQuery object.\n\tpublicMethod.element = function () {\n\t\treturn $(element);\n\t};\n\n\tpublicMethod.settings = defaults;\n\n}(jQuery, document, window));\n"
