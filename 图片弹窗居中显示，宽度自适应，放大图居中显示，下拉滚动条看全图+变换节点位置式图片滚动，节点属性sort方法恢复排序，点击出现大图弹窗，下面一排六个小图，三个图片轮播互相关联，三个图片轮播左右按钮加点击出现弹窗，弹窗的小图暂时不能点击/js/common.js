//本网站效果由昆明天度网络IRIS原创制作
function navScrollTop(_navid,_top){
	var _nav = $("#"+_navid);
	$(window).scroll(function(){
		var _now = $(window).scrollTop();
		if(_now >= _top){
			_nav.css({"position":"fixed","top":"0"});
		}else{
			_nav.css({"position":"absolute","top":_top+"px"});
		}
	});
}

//导航下拉
function pcNavDown(boxid,_name,_hover,_down){
	var _box = $(boxid);
	var _arr = _box.find(_name);
	var _index = _box.find("."+_hover).index();

	for(var i=0;i<_arr.length;i++){
		var _onearr = _arr.eq(i).find("menu p");
		var _mm = _arr.eq(i).find("menu");
		var _ww = 0;
		for(var j=0;j<_onearr.length;j++){
			_ww += _onearr.eq(j).find("a").html().length*12+41;
		}
		_mm.width(_ww);
		var _ll = -_ww/2;
		_mm.css("margin-left",_ll+"px");
	}

	_arr.hover(function(){
		$(this).addClass(_hover).siblings().removeClass(_hover);
		if($(this).find(_down).is(":animated")){
			$(this).find(_down).stop(true,true);
		}
		$(this).find(_down).slideDown(300);
	},function(){
		if($(this).find(_down).is(":animated")){
			$(this).find(_down).stop(true,true);
		}
		$(this).find(_down).slideUp(300);
	});
	_box.mouseleave(function(){
		_arr.eq(_index).addClass(_hover).siblings().removeClass(_hover);
	});

}


//首页顶部
function indexTopVideo(boxid,objid,_top){
	var _box = $(boxid);
	var _obj = $(objid);
	var _height = $(window).height()-_top;
	var _scroll = $(window).scrollTop();

	var heightsize = function(){
		_height = $(window).height()-_top;
		_box.height(_height);
	};//fun END
	heightsize();

	$("#mainhead").css({
		"position":"absolute",
		"top":"0"
	});
	var _boxtop = $("#mainhead").offset().top;

	$(window).resize(function(){
		heightsize();

		_boxtop = $("#mainhead").offset().top;
	});

	$(window).scroll(function(){
		_scroll = $(window).scrollTop();
		_obj.css({
			"transform":"translate3d(0,"+_scroll+"px,0)",
			"-webkit-transform":"translate3d(0,"+_scroll+"px,0)"
		});

		var _nowtop = $(window).scrollTop();
		if(_nowtop >= _boxtop-32){
			$("#mainhead").css({
				"position":"fixed",
				"top":"32px"
			});
		}else{
			$("#mainhead").css({
				"position":"absolute",
				"top":"0"
			});
		}

	});

}

//banner幻灯片通用
function pcBannerCartoon(boxid,_name,numid,_numname,_hover,_antime,_speed,_bool,lastid,nextid){
	var _box = $(boxid);
	var _arr = _box.find(_name);
	var _length = _arr.length;
	var _index = 0;
	var _numbox = $(numid);
	var _cartoon;

	_arr.eq(_index).css("display","block").siblings().css("display","none");

	var _numsrc = "";
	for(var i=0;i<_length;i++){
		var _nn = i + 1;
		_numsrc += "<"+_numname+">"+_nn+"</"+_numname+">";
	}
	_numbox.html(_numsrc);
	var _num = _numbox.find(_numname);
	_num.eq(_index).addClass(_hover).siblings().removeClass(_hover);

	var _movego = function(){
		if(_arr.eq(_index).is(":animated")){_arr.eq(_index).stop(true,true);}
		_arr.eq(_index).fadeIn(_antime).siblings().css("display","none");
		_num.eq(_index).addClass(_hover).siblings().removeClass(_hover);
	};
	var _lastshow = function(){
		_index--;
		if(_index < 0){ _index = _length-1;}
		_movego();
	};
	var _nextshow = function(){
		_index++;
		if(_index >= _length){ _index = 0;}
		_movego();
	};
	if(_bool){
		_cartoon = setInterval(_nextshow,_speed);
	}

	if(lastid != ""){
		$(lastid).click(function(){
			_lastshow();
		});
		$(lastid).hover(function(){
			if(_bool){ clearInterval(_cartoon); }
		},function(){
			if(_bool){ _cartoon = setInterval(_nextshow,_speed); }
		});
	}
	if(nextid != ""){
		$(nextid).click(function(){
			_nextshow();
		});
		$(nextid).hover(function(){
			if(_bool){ clearInterval(_cartoon); }
		},function(){
			if(_bool){ _cartoon = setInterval(_nextshow,_speed); }
		});
	}

	_num.hover(function(){
		_index = $(this).index();
		_movego();
		if(_bool){ clearInterval(_cartoon); }
	},function(){
		if(_bool){ _cartoon = setInterval(_nextshow,_speed); }
	});

}


//通用悬停选项卡
function menuCheckShow(menuid,mname,sumid,sname,_hover,_starnum){
	var _menu = $("#"+menuid).find(mname);
	var _arr = $("#"+sumid).find(sname);
	var _index = _starnum;
	_menu.eq(_index).addClass(_hover).siblings().removeClass(_hover);
	_arr.eq(_index).css("display","block").siblings().css("display","none");
	_menu.hover(function(){
		_index = $(this).index();
		_menu.eq(_index).addClass(_hover).siblings().removeClass(_hover);
		_arr.eq(_index).fadeIn(300).siblings().fadeOut(300);
	});
}


//滚动广告
function rollingTextShow(boxid,sumid,_name,_width,_part,_speed){
	var _box = $(boxid);
	var _sum = _box.find(sumid);
	var _arr = _sum.find(_name);
	var _length = _arr.length;
	var _allwidth = 0;
	var _index = 0;

	_box.css({
		"position":"relative",
		"width":_width+"px",
		"overflow":"hidden"
	});
	_sum.css({
		"position":"relative",
		"width":"99999px",
		"left":"0px"
	});
	_arr.css({
		"position":"relative",
		"float":"left",
		"display":"inline-block",
		"*display":"inline",
		"*zoom":"1",
		"padding-right":_part+"px",
		"white-space":"nowrap"
	});

	for(var i=0;i<_length;i++){
		_allwidth += _arr.eq(i).width()+40;
	}//END for

	var _listmove = function(){
		_index++;
		if(_index >= _allwidth){ _index = 0;}
		_sum.css("left",-_index+"px");
	};

	if(_width <= _allwidth){
		_sum.append(_sum.html());
		var _cartoon = setInterval(_listmove,_speed);
		_box.hover(function(){
			clearInterval(_cartoon);
		},function(){
			_cartoon = setInterval(_listmove,_speed);
		});
	}//END if

}

//单张滚动
function rollingOneMove(boxid,sumid,liid,_name,showwidth,_move,_max,_bool,_speed,lastid,nextid){
	var _box = $(boxid);
	var _sum = $(boxid).find(sumid);
	var _li = $(boxid).find(liid);
	var _arr = _li.find(_name);
	var _length = _arr.length;
	var _index = 0;

	_box.css({"overflow":"hidden","width":showwidth+"px"});
	_box.append("<div style='clear:both;width:100%;'></div>");

	var _liwidth = _move * _length;
	_li.css({"float":"left","width":_liwidth+"px"});
	_arr.css({"float":"left"});

	var _sumwidth = _liwidth * 2 + 50;//以防万一多加50
	_sum.css({"position":"relative","width":_sumwidth+"px"});

	var _moveGo = function(){
		if(_sum.is(":animated")){_sum.stop(true,true);}
		var _go = -_move * _index;
		_sum.animate({left:_go+"px"},200);
	};

	var _nextbox = function(){
		_index++;
		if(_index > _length){
			_index = 1;
			var _addleft = 0;
			_sum.css("left",_addleft+"px");
		}
		_moveGo();
	};
	var _lastbox = function(){
		_index--;
		if(_index < 0){
			_index = _length - 1;
			var _addleft = -_move * _length;
			_sum.css("left",_addleft+"px");
		}
		_moveGo();
	};

	if(_length > _max){
		_sum.append(_sum.html());
		$(lastid).click(function(){ _lastbox(); });
		$(nextid).click(function(){ _nextbox(); });
	}

	if(_bool){
		var _cartoon = setInterval(_nextbox,_speed);
		_box.hover(function(){
			clearInterval(_cartoon);
		},function(){
			_cartoon = setInterval(_nextbox,_speed);
		});
		$(lastid).hover(function(){
			clearInterval(_cartoon);
		},function(){
			_cartoon = setInterval(_nextbox,_speed);
		});
		$(nextid).hover(function(){
			clearInterval(_cartoon);
		},function(){
			_cartoon = setInterval(_nextbox,_speed);
		});
	}//if END

}


function navFn(nav1class,nav2class,bgid){
	var _nav1= $("."+nav1class),
		_bg = $("#"+bgid);
	_nav1.each(function(){
		var _this = $(this),
			_sub = _this.siblings("."+nav2class);
		if(_sub.size() > 0){
			_this.hover(function(){
				_sub.stop(true,true).delay(300).fadeIn();
				bgFnShow();
			},function(){
				_sub.stop(true,true).delay(100).fadeOut();
				bgFnHide(100)
			});
			_sub.hover(function(){
				$(this).stop(true,true).fadeIn();
				bgFnShow()
			},function(){
				$(this).stop(true,true).fadeOut();
				bgFnHide(100)
			});
		}
	});
	function bgFnShow(){
		_bg.stop(true,true).animate({"height":100});
	}
	function bgFnHide(dl){
		_bg.stop(true,true).delay(dl).animate({"height":0});
	}
};


function banner(_win,wrapid,h,bannerid,banneritemclass,menuid){
	var _wrap = $("#"+wrapid),
		_bannerbox = $("#"+bannerid),
		_item =  _bannerbox.find("."+banneritemclass),
		_size = _item.size(),
		_img = _item.find("img"),
		_menu = $("#"+menuid),
		_h = 0,
		_w = 0,
		_curi = 0,
		_prev = 0,
		_isrun = true,
		_bodyscroll = true;
	for(var x=0;x<_size;x++){
		if(x==0){
			_menu.append('<i class="trans sel"></i>')
		}else{
			_menu.append('<i class="trans"></i>')
		}
	};
	var _menuitem = _menu.find("i");
	setHeight();//设置高度
	// 窗口缩放修改高度_wrap,_item,_h
	_win.resize(function() {
		setHeight();
	});

	_menuitem.click(function(){
		if(!$(this).hasClass('sel')){
			_prev = _menu.find(".sel").index();
			_curi = $(this).index();
			fn(_prev,_curi);
		}
	});

	function setHeight(){
		_w = _win.width()<1200?1200:_win.width();
		_h = _win.height() - h;
		_wrap.height(_h);
		_item.height(_h);
		_img.css("top",(_h-(_w*0.5625))/2);

	};

	function fn(prev,cur){
		// _item.eq(cur).stop(true,true).animate({"z-index":2},function(){
		// 	$(this).css("z-index",4);
		// });
		// _item.eq(prev).stop(true,true).animate({"z-index":4},800,function(){
		// 	$(this).css("z-index",1);
		// });
		// _item.eq(cur).siblings().stop(true,true).animate({"z-index":3,"height":0},800,"easeInOutCirc",function(){
		// 	$(this).css({"z-index":1,"height":_h});
		// });
		_item.eq(cur).stop(true,true).fadeIn(600);
		_item.eq(cur).siblings().stop(true,true).fadeOut(600);
		_menuitem.eq(cur).addClass('sel');
		_menuitem.eq(cur).siblings().removeClass('sel');
	}
	_wrap.mousewheel(function(event, delta){
		var _curitem = _bannerbox.find("."+banneritemclass+".sel");
		if(!_curitem.is(":animated") && _isrun){
			_isrun=false;
			_prev = _curi;
			if(delta>0){
				// 上
				if(_curi!=0){
					_curi--;
					fn(_prev,_curi);
				}
				toIndex();
			}else if(delta<0){
				//下
				if(_curi!=_size-1){
					_curi++;
					fn(_prev,_curi);
				}else{
					toIndex(_win.height());
				}
			}
			setTimeout(function(){_isrun=true},800);
		}
		event.stopPropagation();
		event.preventDefault();
	});
};

function toIndex(i){
	if(arguments.length<1){
		$("html,body").stop(true,true).animate({scrollTop:0})
	}else{
		$("html,body").stop(true,true).animate({scrollTop:i})
	}
};

//图片居中
function midImages(imgclass){
	var _obj = $("."+imgclass);
	_obj.each(function() {
		//获取外框宽高
		var _this = $(this),
			_parent = _this.parent();
		_pw = _parent.width(),
			_ph = _parent.height(),
			_cw = _this.width(),
			_ch = _this.height(),
			_pflag = _pw/_ph,
			_cflag = _cw/_ch;
		if(_pflag != _cflag){
			if(_pflag<_cflag){
				_ch = parseInt(_pw/_cflag);
				_this.css({"width":_pw,"top":(_ph-_ch)/2})
			}else{
				_cw = _ph*_cflag;
				_this.css({"left":(_pw-_cw)/2,"height":"100%","width":_cw})
			}
		}

	});
};


//function imgLoads(imgclass){
//	var t_img; // 定时器
//	var isLoad = true; // 控制变量

//// 判断图片加载状况，加载完成后回调
//isImgLoad(function(){
//    // 加载完成
//    var _obj = $("."+imgclass);
//		_obj.each(function() {
//			//获取外框宽高
//			var _this = $(this),
//				_parent = _this.parent();
//				_pw = _parent.width(),
//				_ph = _parent.height(),
//				_cw = _this.width(),
//				_ch = _this.height(),
//				_pflag = _pw/_ph,
//				_cflag = _cw/_ch;
//			if(_pflag != _cflag){
//				if(_pflag<_cflag){
//					_ch = parseInt(_pw/_cflag);
//					_this.css({"width":_pw,"top":(_ph-_ch)/2})
//				}else{
//					_cw = _ph*_cflag;
//					_this.css({"left":(_pw-_cw)/2,"height":"100%","width":_cw})
//				}
//			}
//
//		});
//});

// 判断图片加载的函数
//	function isImgLoad(callback){
//	    // 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
//	    // 查找所有封面图，迭代处理
//	    $('.'+imgclass).each(function(){
//	        // 找到为0就将isLoad设为false，并退出each
//	        if(this.height === 0){
//	            isLoad = false;
//	            return false;
//	        }
//	    });
//	    // 为true，没有发现为0的。加载完毕
//	    if(isLoad){
//	        clearTimeout(t_img); // 清除定时器
//	        // 回调函数
//	        callback();
//	    // 为false，因为找到了没有加载完成的图，将调用定时器递归
//	    }else{
//	        isLoad = true;
//	        t_img = setTimeout(function(){
//	            isImgLoad(callback); // 递归扫描
//	        },500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
//	    }
//	}
////}


//function floatShowImage(_win,_doc,wrapid,containerid,imgwrapid,margins){
//	var _wrap = $("#"+wrapid),
//		_container = $("#"+containerid),
//		_imgwrap = $("#"+imgwrapid),
//		_winh = 0,
//		_winw = 0,
//		_warph = 0;
//	(function winResize(){
//		_winh = _win.height();
//		_winw = _win.width();
//		_winw = _winw>1200?_winw:1200;
//		_warph = _winh-margins;
//		_wrap.css({
//			"height":_warph,
//			"margin-top":-_warph/2
//		});
//
//		_container.css({
//			"height":_warph-40,
//			"width":920
//		});
//		_imgwrap.css({
//			"height":_warph-40,
//			"width":920
//		});
//
//	})();
//};

//多个滚动
function slideItem(wrap,item,menu){
	var _wrap = $("#"+wrap),
		_item = _wrap.find(item),
		_size = _item.size(),
		_menu =	$("#"+menu);
	if(_size>4){
		var _menuitemsize = parseInt(_size/4),
			_cur = 0;
		if(_size%4>0){
			_menuitemsize++;
		}
		_menu.append('<i class="sel"></i>');
		for(var i=1; i<_menuitemsize; i++){
			_menu.append('<i></i>')
		}
		_menuitem = _menu.find("i");

		function fn(curitem){
			_menuitem.removeClass('sel');
			_menuitem.eq(curitem).addClass('sel');
			_wrap.stop(true,true).animate({"left":-1264*curitem},1000);
		}
		_menuitem.hover(function(){
			var _curindex = $(this).index();
			fn(_curindex);
		},function(){});
	}
}
function marqueeUp(wrap,spaceHeight,speed){
	var _wrap = $("#"+wrap),
		_h = _wrap.height(),
		_html = _wrap.html();
	if(_h>spaceHeight){
		_wrap.html(_html+_html);
		var _timer  = null;
		_timer =setInterval(function(){
			var _curtop = parseInt(_wrap.css("top"));
			_curtop--;
			if(_curtop==-_h){
				_curtop = 0;
			}
			_wrap.css("top",_curtop);
		},speed);
		_wrap.hover(function(){
			clearInterval(_timer);
		},function(){
			_timer =setInterval(function(){
				var _curtop = parseInt(_wrap.css("top"));
				_curtop--;
				if(_curtop==-_h){
					_curtop = 0;
				}
				_wrap.css("top",_curtop);
			},speed);
		});

	}
};



//相关作品图片弹出层
function relatedPicPop(){
	var t_img; // 定时器
	var isLoad = true; // 控制变量
// 判断图片加载的函数
	function isImgLoad(callback){
		// 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
		// 查找所有封面图，迭代处理
		$('.floatShowImage img').each(function(){
			// 找到为0就将isLoad设为false，并退出each
			if(this.height === 0){
				isLoad = false;
				return false;
			}
		});
		// 为true，没有发现为0的。加载完毕
		if(isLoad){
			clearTimeout(t_img); // 清除定时器
			// 回调函数
			callback();
			// 为false，因为找到了没有加载完成的图，将调用定时器递归
		}else{
			isLoad = true;
			t_img = setTimeout(function(){
				isImgLoad(callback); // 递归扫描
			},500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
		}
	}
	//p
	var p = $(".floatShowImage");
	//屏幕宽度
	var screenWidth = window.screen.width;
	//container
	var container = $(".floatShowImageContainer");
	container.css({"max-width":screenWidth});
	//右侧部分
	var rightPart = $(".floatShowImageinfo");
	//图片包裹层
	var picWrap = $(".floatShowImagebox");
	//叉
	var close = $(".floatShowImagesclose");
	//图片层
	var floatPicWrap = $(".floatShowImagesWrap");
	//背景层
	var floatBg = $(".floatImagesBg");
	//li
	var li = $(".innertchlist li");
	li.click(function(){
		container.css({"width":"1191px"});
		p.css({"overflow":"hidden"});
		floatPicWrap.css({"margin-left":"-600px"});
		close.show();
		picWrap.width(916);
		floatPicWrap.show();
		floatBg.show();
		//图片路径
		var path = $(this).find("img").attr("src");
		//调整图片尺寸
		var img = $(".floatShowImage").find("img");
		//赋路径
		img.attr({"src":path});
		// 判断图片加载状况，加载完成后回调
		isImgLoad(function(){
			//图片宽
			var imgWidth = img.width();
			//图片高
			var imgHeight = img.height();
			$("body").css({"overflow":"hidden"});
			if (imgHeight > imgWidth) {
				img.css({"max-height": "830px","position":"absolute","left":"50%","max-width":"none","width":"auto","top":"auto","margin-top":"0"});
				picWrap.css({"height":"830"});
				//改变后的宽度
				var nowWidth = $(".floatShowImage img").width();
				img.css({"margin-left":-nowWidth/2});
				rightPart.show();
			}
			else{
				img.css({"max-width": "916px","position":"absolute","top":"50%","max-height":"none","left":"auto","margin-left":"0"});
				picWrap.css({"height":"830px"});
				//改变后的宽度
				var nowHeight = $(".floatShowImage img").height();
				img.css({"margin-top":-nowHeight/2});
				rightPart.show();
			}
			//图片放大功能
			var enlarge = $(".floatShow_zoom");
			enlarge.click(function(){
				rightPart.hide();
				close.hide();
				if (imgHeight > imgWidth) {
					img.css({"max-width":screenWidth-40,"max-height":"none","position":"static","margin-left":"0","margin-top":"0"});
					var nowHeight = $(".floatShowImage img").height();
					var nowWidth = $(".floatShowImage img").width();
					picWrap.height(nowHeight);
					picWrap.width(nowWidth);
					p.css({"overflow":"visible"});
					floatPicWrap.width(screenWidth);
					floatPicWrap.css({"margin-left":-floatPicWrap.width()/2,"width":"auto"});
					//去掉竖滚动条
					container.css({"overflow-y":"auto","overflow-x":"hidden","width":"auto"});
					//计算floatPicWrap层的位置
					if(floatPicWrap.height()<=screenWidth){
						floatPicWrap.css({"margin-top":-floatPicWrap.height()/2});
					}
					else{
						floatPicWrap.css({"margin-top":"0","top":"0"});
					}
				}
				else{
					img.css({"max-height": "830px","max-width":"none","position":"static","margin-left":"0","margin-top":"0"});
					var nowWidth = $(".floatShowImage img").width();
					picWrap.width(nowWidth);
					//去掉竖滚动条
					container.css({"overflow-x":"auto","overflow-y":"hidden","width":"auto"});
					//计算floatPicWrap层的位置
					if(floatPicWrap.width()<=screenWidth){
						floatPicWrap.css({"width":"1273px"});
						floatPicWrap.css({"margin-left":-floatPicWrap.width()/2});
					}
					else{
						floatPicWrap.css({"margin-left":"0","left":"0"});
					}
				}
			});
		});
	});
	close.click(function(){
		$("body").css({"overflow":"visible"});
		floatPicWrap.hide();
		floatBg.hide();
	});
	//小叉
	var smallClose = $(".floatShow_close");
	smallClose.click(function(){
		$("body").css({"overflow":"visible"});
		floatPicWrap.hide();
		floatBg.hide();
	})
}

//导师风采效果
function tutorStyle(){
	//计次
	var times = 0;
	//逻辑变量
	var logic = false;
	var div = $(".innertchshowbox");
	var ul = div.children();
	var li = ul.children();
	//计数
	var i = 0;
	var j = 1;
	var q = 0;
	var w = 1;
	var e = 0;
	var r = 1;
	//按钮
	var leftBtn = $(".innertchshowprev");
	var rightBtn = $(".innertchshownext");
	//第一部分 左右滚动
	//计算ul宽度
	var allLiWidth = 0;
	li.each(function(i,d){
		allLiWidth += $(d).outerWidth(true);
	});
	ul.width(allLiWidth);
	//设置索引
	li.each(function(i,d){
		$(d).attr("index",i)
	});
	//pop的小图部分
	var popDownLeftBtn = $(".tutor_style_pop .down_banner .down_left");
	var popDownRightBtn = $(".tutor_style_pop .down_banner .down_right");
	var allPopDownLiWidth = 0;
	//小图标变量
	var popDown = $(".tutor_style_pop .down_banner .down_wrap");
	var popDownUl = popDown.children();
	var popDownLi = popDownUl.children();
	var popDownA = popDownLi.find("a");
	//红框
	var redFrame = 0;
	//从右往左移函数
	function rightToLeft(ul,li){
		if(ul.is(":animated")){return false}
		else{
			if(i == li.length){
				i = 1;
			}
			else{
				i++;
			}
			ul.animate({"left":-li.eq(0).outerWidth(true)},500,function(){
				li.eq(i-1).insertAfter(li.eq(i - 2));
				ul.css({"left":"0px"});
				//框右移
				if(redFrame==popDownLi.length-1){redFrame=0;}
				else{redFrame++;}
				popDownLi.each(function(i,d){
					if(parseInt($(d).attr("index"))==redFrame){
						$(d).find("a").addClass("sel").parent().siblings().children().removeClass("sel");
					}
				});
			});
			j = i + 1;
		}
	}
	//从右往左移函数
	function leftToRight(ul,li){
		if(ul.is(":animated")){return false}
		else{
			if(j == 1){
				j = li.length;
			}
			else{
				j--;
			}
			li.eq(j - 1).insertBefore(li.eq(j-li.length));
			ul.css({"left":-li.eq(0).outerWidth(true)});
			ul.animate({"left":0},500,function(){
				//框左移
				if (redFrame == 0) {
					redFrame = popDownLi.length - 1;
				}
				else {
					redFrame--;
				}
				popDownLi.each(function (i, d) {
					if (parseInt($(d).attr("index")) == redFrame) {
						$(d).find("a").addClass("sel").parent().siblings().children().removeClass("sel");
					}
				});
			});
			i = j - 1;
		}
	}
	//从右往左移函数
	function rightToLeft1(ul,li){
		if(ul.is(":animated")){return false}
		else{
			if(e == li.length){
				e = 1;
			}
			else{
				e++;
			}
			ul.animate({"left":-li.eq(0).outerWidth(true)},500,function(){
				li.eq(e-1).insertAfter(li.eq(e - 2));
				ul.css({"left":"0px"});
				//框右移
				if(redFrame==popDownLi.length-1){redFrame=0;}
				else{redFrame++;}
				popDownLi.each(function(i,d){
					if(parseInt($(d).attr("index"))==redFrame){
						$(d).find("a").addClass("sel").parent().siblings().children().removeClass("sel");
					}
				});
			});
			r = e + 1;
		}
	}
	//从右往左移函数
	function leftToRight1(ul,li){
		if(ul.is(":animated")){return false}
		else{
			if(r == 1){
				r = li.length;
			}
			else{
				r--;
			}
			li.eq(r - 1).insertBefore(li.eq(r-li.length));
			ul.css({"left":-li.eq(0).outerWidth(true)});
			ul.animate({"left":0},500,function(){
				//框左移
				if (redFrame == 0) {
					redFrame = popDownLi.length - 1;
				}
				else {
					redFrame--;
				}
				popDownLi.each(function (i, d) {
					if (parseInt($(d).attr("index")) == redFrame) {
						$(d).find("a").addClass("sel").parent().siblings().children().removeClass("sel");
					}
				});
			});
			e = r - 1;
		}
	}
	//触发
	leftBtn.click(function(){
		rightToLeft(ul,li)
	});
	rightBtn.click(function(){
		leftToRight(ul,li)
	});
	//第二部分 点击li现弹窗
	//计算ul宽度
	var popUl = $(".tutor_style_pop .up_banner .pic_wrap ul");
	var popLi = popUl.children();
	//设置索引
	popLi.each(function(i,d){
		$(d).attr("index",i)
	});
	var pop;
	var _index = 0;
	var _index1 = 0;
	li.click(function(){
		//恢复
		popDownLi.sort(function(a,b){
			var sort1 = a.getAttribute('index')*1;
			var sort2 = b.getAttribute('index')*1;
			var sortNum = 1;
			if (logic)
				sortNum = -1;
			if (sort1 > sort2)
				return 1 * sortNum;
			if (sort1 < sort2)
				return -1 * sortNum;
			return 0;
		});
		popDownLi.detach().appendTo(popDownUl);
		//恢复
		popLi.sort(function(a,b){
			var sort1 = a.getAttribute('index')*1;
			var sort2 = b.getAttribute('index')*1;
			var sortNum = 1;
			if (logic)
				sortNum = -1;
			if (sort1 > sort2)
				return 1 * sortNum;
			if (sort1 < sort2)
				return -1 * sortNum;
			return 0;
		});
		popLi.detach().appendTo(popUl);
		//设小图索引
		//设置索引
		popDownLi.each(function(i,d){
			$(d).attr("index",i)
		});
		_index1 = parseInt($(this).attr("index")) - _index;
		_index = parseInt($(this).attr("index"));
			//赋值
		e = _index;
		r = _index + 1;
		q = _index;
		w = _index + 1;
		//if(_index<=5){redFrame = _index}
		//else{
		//	q = _index - 5;
		//	w = _index - 4;
		//	redFrame = _index;
		//	popDownLi.eq(0).nextUntil(popDownLi.eq(_index)).andSelf().insertAfter(popDownLi.eq(popDownLi.length-1));
		//}
		//小图adddClass
		popDownA.eq(_index).addClass("sel").parent().siblings().find("a").removeClass("sel");
		//背景层
		var floatBg = $(".floatImagesBg");
		//弹出框
		var pop = $(".tutor_style_pop");
		pop.show();
		floatBg.show();
		$("body").css({"overflow":"hidden"});
		var allPopLiWidth = 0;
		popLi.each(function(i,d){
			allPopLiWidth += $(d).width();
		});
		popUl.width(allPopLiWidth);
		//之前节点全移位


		if(_index==0){
			popLi.eq(0).nextUntil(popLi.eq(_index)).insertAfter(popLi.eq(popLi.length-1));
			redFrame = _index;
			//恢复
			popDownLi.sort(function(a,b){
				var sort1 = a.getAttribute('index')*1;
				var sort2 = b.getAttribute('index')*1;
				var sortNum = 1;
				if (logic)
					sortNum = -1;
				if (sort1 > sort2)
					return 1 * sortNum;
				if (sort1 < sort2)
					return -1 * sortNum;
				return 0;
			});
			popDownLi.detach().appendTo(popDownUl);
		}
		else{
			popLi.eq(0).nextUntil(popLi.eq(_index)).andSelf().insertAfter(popLi.eq(popLi.length-1));
			redFrame = _index;
			popDownLi.eq(0).nextUntil(popDownLi.eq(_index)).andSelf().insertAfter(popDownLi.eq(popDownLi.length-1));
		}
		//小按钮点击的兼容做不好
		//if(_index<=5&&_index>=0){redFrame = _index}
		//else{
		//	q=_index-5;
		//	w=_index-4;
		//	redFrame = _index;
		//	popDownLi.eq(0).nextUntil(popDownLi.eq(_index-5)).andSelf().insertAfter(popDownLi.eq(popDownLi.length-1));
		//}

		//pop左右按钮
		var popLeftBtn = $(".tutor_style_pop .up_banner .up_left");
		var popRightBtn = $(".tutor_style_pop .up_banner .up_right");
		//触发
		popLeftBtn.click(function(){
			rightToLeft1(popUl,popLi);
			popDownLeftToRight(popDownUl,popDownLi);
		});
		popRightBtn.click(function(){
			leftToRight1(popUl,popLi);
			popDownRightToLeft(popDownUl,popDownLi);
		});

		//计算popDownUl 宽度
		popDownLi.each(function(i,d){
			allPopDownLiWidth += $(d).outerWidth(true);
		});
		popDownUl.width(allPopDownLiWidth);
		//左右按钮事件
		//从右往左移函数
		function popDownRightToLeft(ul,li){
			if(ul.is(":animated")){return false}
			else {
				if ($(".down_wrap ul li a.sel").parent().index() == 0) {
					if (w == 1) {
						w = li.length;
					}
					else {
						w--;
					}
					li.eq(w - 1).insertBefore(li.eq(w - li.length));
					ul.css({"left": -li.eq(0).outerWidth(true)});
					ul.animate({"left": 0}, 500);
					q = w - 1;
				}
			}
		}
		//从右往左移函数
		function popDownLeftToRight(ul,li){
			if(ul.is(":animated")){return false}
			else{
				if($(".down_wrap ul li a.sel").parent().index()==5){
					if(q == li.length){
						q = 1;
					}
					else{
						q++;
					}
					ul.animate({"left":-li.eq(0).outerWidth(true)},500,function(){
						li.eq(q-1).insertAfter(li.eq(q - 2));
						ul.css({"left":"0px"});
					});
					w = q + 1;
				}
			}
		}
		//触发
		popDownLeftBtn.click(function(){
			rightToLeft1(popUl,popLi);
			popDownLeftToRight(popDownUl,popDownLi);
		});
		popDownRightBtn.click(function(){
			leftToRight1(popUl,popLi);
			popDownRightToLeft(popDownUl,popDownLi);
		});
		//小按钮
		//popDownLi.click(function(){
		//	_index = parseInt($(this).attr("index"));
		//	redFrame = _index;
		//});
		//关闭按钮
		var closeBtn = $(".tutor_style_pop .tutor_style_close");
		closeBtn.click(function(){
			pop.hide();
			floatBg.hide();
			$("body").css({"overflow":"visible"});
			//恢复
			popDownLi.sort(function(a,b){
				var sort1 = a.getAttribute('index')*1;
				var sort2 = b.getAttribute('index')*1;
				var sortNum = 1;
				if (logic)
					sortNum = -1;
				if (sort1 > sort2)
					return 1 * sortNum;
				if (sort1 < sort2)
					return -1 * sortNum;
				return 0;
			});
			popDownLi.detach().appendTo(popDownUl);
		})
	})
}


