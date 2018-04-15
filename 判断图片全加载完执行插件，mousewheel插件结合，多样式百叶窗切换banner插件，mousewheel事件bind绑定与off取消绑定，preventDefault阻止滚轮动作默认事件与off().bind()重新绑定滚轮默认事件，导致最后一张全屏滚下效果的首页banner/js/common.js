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
		$("html,body").stop(true,true).animate({scrollTop:i},1000);
		$(".con_lev1").bind("mousewheel",function(event,delta){
			if(delta<0){
				event.preventDefault();
				window.event.returnValue = false;
			}
		});
		setTimeout(function(){
			$(".con_lev1").off("mousewheel").bind("mousewheel",function(event,delta){
				if(delta>0){
					$(".con_lev1").bind("mousewheel",function(event,delta){
						if(delta>0){
							event.preventDefault();
							window.event.returnValue = false;
							setTimeout(function(){
								$(".con_lev1").off("mousewheel").bind("mousewheel",function(event,delta){
									if(delta>0){
										$("html,body").animate({"scrollTop":0},200)
									}
								})
							},300)
						}
					});
				}
			});
		},1000)
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
			if (imgHeight >= imgWidth) {
				img.css({"max-height": "830px","position":"absolute","left":"50%","max-width":"none","width":"auto","top":"auto","margin-top":"0"});
				picWrap.css({"height":"830"});
				//改变后的宽度
				var nowHeight = $(".floatShowImage img").height();
				var nowWidth = $(".floatShowImage img").width();
				img.css({"margin-left":-nowWidth/2,"margin-top":-nowHeight/2,"top":"50%"});
				rightPart.show();
			}
			else{
				img.css({"max-width": "916px","position":"absolute","top":"50%","max-height":"none","left":"auto","margin-left":"0"});
				picWrap.css({"height":"830px"});
				//改变后的宽度
				var nowHeight = $(".floatShowImage img").height();
				var nowWidth = $(".floatShowImage img").width();
				img.css({"margin-top":-nowHeight/2,"margin-left":-nowWidth/2,"left":"50%"});
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
					picWrap.height(nowHeight).css({"min-height":"830px"});
					picWrap.width(nowWidth).css({"min-width":"916px"});
					p.css({"overflow":"visible"});
					floatPicWrap.width(screenWidth);
					floatPicWrap.css({"margin-left":-floatPicWrap.width()/2,"width":"auto"});
					if(nowHeight<picWrap.height()){
						//console.log(1)
						img.css({"margin-left":-nowWidth/2,"margin-top":-nowHeight/2,"top":"50%","position":"absolute"});
						floatPicWrap.css({"margin-left":-floatPicWrap.width()/2,"width":"auto"});
					}
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
					var nowHeight = $(".floatShowImage img").height();
					picWrap.width(nowWidth).css({"min-width":"916px"});
					//console.log(nowWidth)
					//console.log(picWrap.width())
					if(nowWidth<picWrap.width()){
						//console.log(1)
						img.css({"margin-left":-nowWidth/2,"margin-top":-nowHeight/2,"top":"50%","position":"absolute"});
					}
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
function tutor_style(){
	var _index = 0;
//页面轮播效果
	//bg
	var bg = $(".floatImagesBg");
	//tutor_style
	var pop = $(".tutor_style");
	//close
	var close = $(".tutor_style .tutor_style_close");
	//按钮
	var leftBtn = $(".innertchshowprev");
	var rightBtn = $(".innertchshownext");
	//变量
	var div = $(".innertchshowbox");
	var ul = div.children();
	var li = ul.children();
	var liWidth = li.outerWidth(true);
	//ul宽度
	var allLiWidth = 0;
	li.each(function(i,d){
		allLiWidth += $(d).outerWidth(true);
	});
	ul.width(allLiWidth);
	//计数变量
	var ii = 0;
	//函数
	//左至右
	function leftToRight(){
		if(ii==0){ii=-li.length+4}
		ii++;
		ul.stop().animate({"left":ii*liWidth},300)
	}
	//右至左
	function rightToLeft(){
		if(-ii==li.length-5){ii=1;}
		ii--;
		ul.stop().animate({"left":ii*liWidth},300)
	}
	//触发
	leftBtn.click(rightToLeft);
	rightBtn.click(leftToRight);
	//点击
	li.click(function (){
		//p
		var p = $(".tutor_style .comments li");
		bg.show();
		pop.show();
		_index = $(this).index();
		$(window).bind("wheel",function(e){
			var ev = e||window.event;
			ev.preventDefault();
			return false;
		});
		//弹窗效果
		var _obj = {
			"showbox":"#imgpartbox",//展示框id
			"showsum":"#imgpartsum",//展示移动集合id
			"showpart":"li",
			"showimg":".img",//展示图片的统一名
			"lastid":"#imglast",
			"nextid":"#imgnext",
			"showw":806,
			"showh":506,
			"menuid":"#imgpartmenu",
			"menunum":6,
			"menumove":125,
			"menulast":"#menulast",
			"menunext":"#menunext",
			"menusel":"sel",
			"gobool":true,
			"gospeed":3000
		};

		var _box = $(_obj.showbox);
		var _sum = $(_obj.showsum);
		var _arr = _sum.find(_obj.showpart);
		var _length = _arr.length;
		var _menu = $(_obj.menuid);

		var _mindex = 0;


		_box.css({"overflow":"hidden","width":_obj.showw+"px","height":_obj.showh+"px","position":"relative"});
		_arr.css({"width":_obj.showw+"px","height":_obj.showh+"px","float":"left"});
		var _sumwidth = _length * _obj.showw;
		_sum.css({"width":_sumwidth+"px","position":"relative","left":-_index* _obj.showw});

		_menu.append("<ul></ul>");
		var _menusum = _menu.find("ul");
		for(var i=0;i<_length;i++){
			var _mstr = "<li></li>";
			_menusum.append(_mstr);
			_menu.find("li").eq(i).append(_arr.eq(i).find(_obj.showimg).clone());
		}
		var b = 0;
		if(_index-5>0){b=_index-5}
		else{b=0;}
		var _marr = _menusum.find("li");
		_marr.eq(_index).addClass(_obj.menusel);
		p.eq(_index).fadeIn().siblings().fadeOut();
		_menusum.css({"position":"relative","left":-b* _obj.menumove,"width":_sumwidth+"px"});
		var _menuwidth = _obj.menumove * _obj.menunum;
		_menu.css({"overflow":"hidden","width":_menuwidth+"px"});
		_marr.css({"float":"left","position":"relative"});
		//起始位置


		//下一页
		var _nextpage = function(){
			_index++;
			if(_index >= _length){
				_index = 0;
				_mindex = 0;
				if(_menusum.is(":animated")){_menusum.stop(true,true);}
				_menusum.animate({left:0+"px"},300);
			}
			var _imgmove = -_index * _obj.showw;
			if(_sum.is(":animated")){_sum.stop(true,true);}
			_sum.animate({left:_imgmove+"px"},300);
			_marr.eq(_index).addClass(_obj.menusel).siblings().removeClass(_obj.menusel);
			p.eq(_index).fadeIn().siblings().fadeOut();
			var _jx = _mindex + _obj.menunum;
			if(_index == _jx){
				_mindex++;
				var _menumove = -_mindex * _obj.menumove;
				if(_menusum.is(":animated")){_menusum.stop(true,true);}
				_menusum.animate({left:_menumove+"px"},300);
			}
		};//fun END

		//上一页
		var _lastpage = function(){
			_index--;
			if(_index < 0){
				_index = _length-1;
				_mindex = _length - _obj.menunum;
				var _menumove = -_mindex * _obj.menumove;
				if(_menusum.is(":animated")){_menusum.stop(true,true);}
				_menusum.animate({left:_menumove+"px"},300);
			}
			var _imgmove = -_index * _obj.showw;
			if(_sum.is(":animated")){_sum.stop(true,true);}
			_sum.animate({left:_imgmove+"px"},300);
			_marr.eq(_index).addClass(_obj.menusel).siblings().removeClass(_obj.menusel);
			p.eq(_index).fadeIn().siblings().fadeOut();
			var _jx = _mindex;
			if(_index+1 == _jx && _jx > 0){
				_mindex--;
				var _menumove = -_mindex * _obj.menumove;
				if(_menusum.is(":animated")){_menusum.stop(true,true);}
				_menusum.animate({left:_menumove+"px"},300);
			}

		};//fun END


		$(_obj.nextid).unbind("click",_nextpage);
		$(_obj.lastid).unbind("click",_lastpage);
		$(_obj.menunext).unbind("click",_nextpage);
		$(_obj.menulast).unbind("click",_lastpage);
		$(_obj.nextid).bind("click",_nextpage);
		$(_obj.lastid).bind("click",_lastpage);
		$(_obj.menunext).bind("click",_nextpage);
		$(_obj.menulast).bind("click",_lastpage);
		var _cartoon;

		//if(_obj.gobool){
		//	_cartoon = setInterval(_nextpage,_obj.gospeed);
		//}

		_marr.hover(function(){
			_index = $(this).index();
			var _imgmove = -_index * _obj.showw;
			if(_sum.is(":animated")){_sum.stop(true,true);}
			_sum.animate({left:_imgmove+"px"},300);
			_marr.eq(_index).addClass(_obj.menusel).siblings().removeClass(_obj.menusel);
			p.eq(_index).fadeIn().siblings().fadeOut();
		});

		if(_obj.gobool){
			_box.hover(function(){
				clearInterval(_cartoon);
			},function(){
				//_cartoon = setInterval(_nextpage,_obj.gospeed);
			});
			_menu.hover(function(){
				clearInterval(_cartoon);
			},function(){
				//_cartoon = setInterval(_nextpage,_obj.gospeed);
			});
			$(_obj.menunext).hover(function(){
				clearInterval(_cartoon);
			},function(){
				//_cartoon = setInterval(_nextpage,_obj.gospeed);
			});
			$(_obj.menulast).hover(function(){
				clearInterval(_cartoon);
			},function(){
				//_cartoon = setInterval(_nextpage,_obj.gospeed);
			});
		}//if END
		//关闭
		close.click(function(){
			bg.hide();
			pop.hide();
			$(window).unbind("wheel");
			_marr.remove();
			_menusum.remove();
			$(_obj.nextid).unbind("click",_nextpage);
			$(_obj.lastid).unbind("click",_lastpage);
			$(_obj.menunext).unbind("click",_nextpage);
			$(_obj.menulast).unbind("click",_lastpage);
		});
	});
}
//获奖学生li弹窗效果
function winning_students(){
	//变量
	var li = $(".ff_teachlist li");
	var bg = $(".floatImagesBg");
	var studentPop = $(".students_details");
	var studentPopFl = studentPop.find(".fl");
	var closeBtn = $(".floatShowImagesclose");
	var smallClose = $(".floatShowImageTool span");
	//弹窗头像
	var imgF = $(".students_details .fr .inside img");
	li.click(function(){
		bg.show();
		studentPop.show();
		//赋图片路径
		var imgS = $(this).find("img").attr("src");
		imgF.attr("src",imgS);
		closeBtn.add(smallClose).click(function(){
			bg.hide();
			studentPop.hide();
		})
	})
}

//首页大banner
//图片加载
var t_img; // 定时器
var isLoad = true; // 控制变量
function isImgLoad1(callback){
	// 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
	// 查找所有封面图，迭代处理
	$('.slider img').each(function(){
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
			isImgLoad1(callback); // 递归扫描
		},500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
	}
}
//
(function(a) { (function() {
	var b = false;
	var c = (/xyz/.test(function() {
		xyz
	})) ? (/\b_super\b/) : (/.*/);
	this.Class = function() {};
	Class.extend = function(h) {
		var g = this.prototype;
		b = true;
		var f = new this();
		b = false;
		for (var e in h) {
			if (typeof h[e] == "function" && typeof g[e] == "function" && c.test(h[e])) {
				f[e] = (function(i, j) {
					return function() {
						var l = this._super;
						this._super = g[i];
						var k = j.apply(this, arguments);
						this._super = l;
						return k
					}
				})(e, h[e])
			} else {
				f[e] = h[e]
			}
		}
		function d() {
			if (!b && this.init) {
				this.init.apply(this, arguments)
			}
		}
		d.prototype = f;
		d.constructor = d;
		d.extend = arguments.callee;
		return d
	}
})();

	a.fn.lateralSlider = function(b) {


		var d = {
			displayDuration: 1500,
			animateDuration: 900,
			numColumns: 30,
			transitions: "fade,slideUp,slideDown,slideLeft,slideRight,slideUpAndDown,slideLeftAndRight,fadeAndSlideUp,fadeAndSlideDown,fadeAndSlideLeft,fadeAndSlideRight,fadeSlideUpAndRight,fadeSlideDownAndLeft",
			random: false,
			hidePrevAndNextArrows: false,
			hideSlideChooser: false,
			captionOpacity: 0.8
		};
		var c = a.extend({},
			d, b);
		this.each(function() {
			var j = a(this);
			var t = Class.extend({
				$imgs: null,
				size: null,
				displayImg: null,
				nextImg: null,
				numDivs: null,
				divWidth: null,
				baseCSS: null,
				$divs: null,
				transitions: [],
				transition: null,
				transitionCount: null,
				interval: null,
				width: null,
				init: function() {
					this.$imgs = a("a", j);
					this.size = this.$imgs.size();
					this.$imgs.hide();
					this.nextImg = 0;
					this.width = j.width();
					this.numDivs = c.numColumns;
					this.divWidth = this.width / this.numDivs;
					this.baseCSS = {
						width: this.divWidth,
						position: "absolute",
						top: 0,
						backgroundRepeat: "no-repeat"
					};
					this.createDivs();
					this.$divs = a("div", j);
					this.transitionCount = -1
				},
				createDivs: function() {
					for (var A = 0; A < this.numDivs; A++) {
						var B = a("<div></div>");
						B.css(this.baseCSS);
						B.css("left", this.divWidth * A);
						B.appendTo(j)
					}
				}
			});
			var y = new t();
			var g = Class.extend({
				baseDuration: null,
				originalOffset: null,
				offset: null,
				init: function() {
					this.baseDuration = c.animateDuration / 8;
					this.originalOffset = 7 * c.animateDuration / (8 * y.numDivs);
					this.offset = 7 * c.animateDuration / (8 * y.numDivs)
				},
				duration: function() {
					return this.baseDuration + this.offset
				},
				increment: function() {
					this.offset += this.originalOffset
				},
				reset: function() {
					this.offset = this.originalOffset
				},
				getCSS: function(A) {
					return {}
				},
				eachDiv: function() {
					return {}
				},
				applyTransition: function() {
					y.$divs.each(this.eachDiv);
					this.reset()
				}
			});
			var v = g.extend({
				applyTransition: function() {
					var A = this;
					y.$divs.each(function() {
						var B = A.eachDiv;
						if (typeof(A.eachDiv) == "function") {
							B = B()
						}
						a(this).animate(B, A.duration());
						A.increment()
					});
					this.reset()
				}
			});
			var m = v.extend({
				getCSSIndex: null,
				eachDivIndex: null,
				getCSSGroup: null,
				eachDivGroup: null,
				init: function() {
					this._super();
					this.getCSSGroup = new Array();
					this.eachDivGroup = new Array();
					this.getCSSIndex = 0;
					this.eachDivIndex = 0
				},
				getCSS: function(B) {
					var A = this.getCSSGroup[this.getCSSIndex];
					this.getCSSIndex = (this.getCSSIndex + 1) % this.getCSSGroup.length;
					return A(B)
				},
				addTransition: function(A) {
					this.getCSSGroup.push(A.getCSS);
					this.eachDivGroup.push(A.eachDiv)
				},
				applyTransition: function() {
					var A = this;
					y.$divs.each(function() {
						var B = A.eachDivGroup[A.eachDivIndex];
						if (typeof(B) == "function") {
							B = B()
						}
						a(this).animate(B, A.duration());
						A.eachDivIndex = (A.eachDivIndex + 1) % A.eachDivGroup.length;
						A.increment()
					});
					this.reset()
				}
			});
			var u = v.extend({
				getCSS: function(A) {
					return {
						opacity: 0
					}
				},
				eachDiv: {
					opacity: 1
				}
			});
			var f = v.extend({
				getCSS: function(A) {
					return {
						top: y.$imgs.eq(y.nextImg).height()
					}
				},
				eachDiv: {
					top: 0
				}
			});
			var h = v.extend({
				getCSS: function(A) {
					return {
						height: 0
					}
				},
				eachDiv: function() {
					return {
						height: y.$imgs.eq(y.nextImg).height()
					}
				}
			});
			var r = v.extend({
				getCSS: function(B) {
					var A = B.css("left");
					A = parseInt(A.substring(0, A.length - 2), 10);
					return {
						left: A + y.divWidth,
						width: 0
					}
				},
				eachDiv: {
					left: "-=" + y.divWidth,
					width: y.divWidth
				}
			});
			var q = v.extend({
				getCSS: function(A) {
					return {
						width: 0
					}
				},
				eachDiv: {
					width: y.divWidth
				}
			});
			var o = m.extend({
				addTransitions: function(A, B) {
					this.addTransition(A);
					this.addTransition(B)
				}
			});
			var w = m.extend({
				addTransitions: function(B, A) {
					this.addTransition(B);
					this.addTransition(A)
				}
			});
			var k = m.extend({
				addTransitions: function(A, B) {
					this.addTransition(A);
					this.addTransition(B)
				}
			});
			var n = m.extend({
				addTransitions: function(A, B) {
					this.addTransition(A);
					this.addTransition(B)
				}
			});
			var p = m.extend({
				addTransitions: function(A, B) {
					this.addTransition(A);
					this.addTransition(B)
				}
			});
			var e = m.extend({
				addTransitions: function(A, B) {
					this.addTransition(A);
					this.addTransition(B)
				}
			});
			var x = m.extend({
				addTransitions: function(A, C, B) {
					this.addTransition(A);
					this.addTransition(C);
					this.addTransition(B)
				}
			});
			var s = m.extend({
				addTransitions: function(C, A, B) {
					this.addTransition(C);
					this.addTransition(A);
					this.addTransition(B)
				}
			});
			var z = {
				fade: new u(),
				slideUp: new f(),
				slideDown: new h(),
				slideLeft: new r(),
				slideRight: new q(),
				slideUpAndDown: new o(),
				slideLeftAndRight: new w(),
				fadeAndSlideUp: new k(),
				fadeAndSlideDown: new n(),
				fadeAndSlideLeft: new p(),
				fadeAndSlideRight: new e(),
				fadeSlideUpAndRight: new x(),
				fadeSlideDownAndLeft: new s()
			};
			z.slideUpAndDown.addTransitions(z.slideUp, z.slideDown);
			z.slideLeftAndRight.addTransitions(z.slideLeft, z.slideRight);
			z.fadeAndSlideUp.addTransitions(z.slideUp, z.fade);
			z.fadeAndSlideDown.addTransitions(z.fade, z.slideDown);
			z.fadeAndSlideLeft.addTransitions(z.fade, z.slideLeft);
			z.fadeAndSlideRight.addTransitions(z.slideRight, z.fade);
			z.fadeSlideUpAndRight.addTransitions(z.slideUp, z.fade, z.slideRight);
			z.fadeSlideDownAndLeft.addTransitions(z.slideDown, z.fade, z.slideLeft);
			t.prototype.populateTransitions = function() {
				var B = c.transitions.split(/,\s*/g);
				for (var A in B) {
					this.transitions.push(z[B[A]])
				}
			};
			t.prototype.getTransition = function() {
				if (c.random) {
					var A = Math.floor(Math.random() * this.transitions.length);
					return this.transitions[A]
				} else {
					this.transitionCount = (this.transitionCount + 1) % this.transitions.length;
					return this.transitions[this.transitionCount]
				}
			};
			t.prototype.addDivCSS = function() {
				var B = this;
				var C = B.$imgs.eq(B.nextImg);
				var D = C.css("background-image");
				var A = C.height();
				this.$divs.each(function() {
					var E = a(this);
					E.css({
						backgroundImage: D,
						backgroundPosition: "-" + E.css("left") + " center",
						height: A
					});
					E.css(B.transition.getCSS(E))
				})
			};
			t.prototype.process = function() {
				j.css({
					backgroundImage: this.$imgs.eq(this.displayImg).css("background-image"),
					backgroundRepeat: "no-repeat"
				});
				this.transition = this.getTransition();
				this.addDivCSS();
				this.transition.applyTransition();
				j.animate({
						height: this.$imgs.eq(this.nextImg).height()
					},
					c.animateDuration);
				this.advanceShow()
			};
			t.prototype.updateCurrent = function() {
				a('.circle[rel="' + this.displayImg + '"]').removeClass("circle-current");
				a('.circle[rel="' + this.nextImg + '"]').addClass("circle-current")
			};
			t.prototype.advanceShow = function() {
				this.updateCurrent();
				this.displayImg = this.nextImg;
				if (this.nextImg == this.size - 1) {
					this.nextImg = 0
				} else {
					this.nextImg++
				}
			};
			t.prototype.stopShow = function() {
				window.clearInterval(this.interval)
			};
			t.prototype.goToSlide = function(A) {
				if (this.$divs.filter(":animated").size() > 0) {
					return
				}
				this.stopShow();
				this.nextImg = A;
				this.updateCurrent();
				this.runner();
				if (this.nextImg == 0) {
					this.displayImg = this.size - 1
				} else {
					this.displayImg = this.nextImg - 1
				}
			};
			t.prototype.applyLink = function() {
				var C = this.$imgs.eq(this.displayImg);
				var B = C.parent();
				if (B.is("a")) {
					B.removeAttr("style")
				}
				var A = this.$imgs.eq(this.nextImg);
				var D = A.parent();
				if (D.is("a")) {
					D.css({
						display: "block",
						textDecoration: "none",
						border: "0",
						width: j.width(),
						height: A.height(),
						position: "absolute",
						top: 0,
						left: 0,
						zIndex: 100
					})
				}
			};
			t.prototype.applyCaption = function() {
				var A = this.$imgs.eq(this.nextImg);
				var C = A.attr("title");
				var D = a(".caption", j);
				D.slideUp(function() {
					a(this).html(C)
				});
				if (C != "") {
					if (D.size() > 0) {
						if (!D.is(":visible")) {
							D.html(C)
						}
						D.slideDown()
					} else {
						var B = a('<div class="caption"><span>' + C + "</span></div>");
						B.css({
							opacity: c.captionOpacity,
							width: j.width(),
							position: "absolute",
							top: 0,
							left: 0,
							display: "none"
						});
						//B.appendTo(j);
						//B.slideDown()
					}
				}
			};
			t.prototype.runner = function() {
				this.applyLink();
				this.applyCaption();
				this.process()
			};
			t.prototype.begin = function() {
				var A = this.$imgs.eq(this.nextImg);
				j.css({
					backgroundImage: A.css("background-image"),
					height: A.height()
				});
				this.runner();
				this.transitionCount--;
			};
			var i = Class.extend({
				circleCount: null,
				init: function() {
					this.circleCount = 0
				},
				addAll: function() {
					this.addCircles();
					this.addPrevAndNextLinks();
					//
					var aaa = $(".a_wrap .circle");
					var aaaLength = aaa.length;
					var count = 0;
					$('#slider').bind("mousewheel",function(event, delta) {
						if(delta>0){
							count++;
							if(count==4){
								bb();
								count = 0;
							};
						}
						if(delta<0){
							count--;
							if(count==-4&&$(".a_wrap .circle.circle-current").index()<aaaLength-1){
								cc();
								count = 0;
							}
							if($(".a_wrap .circle.circle-current").index()==aaaLength-1){
								if(count==-10){
									toIndex($(window).height());
									count = 0;
								}
							}
							event.stopPropagation();
							event.preventDefault();
						}
					});
					//
					//_wrap.mousewheel(function(event, delta){
					//	var _curitem = _bannerbox.find("."+banneritemclass+".sel");
					//	if(!_curitem.is(":animated") && _isrun){
					//		_isrun=false;
					//		_prev = _curi;
					//		if(delta>0){
					//			// 上
					//			if(_curi!=0){
					//				_curi--;
					//				fn(_prev,_curi);
					//			}
					//			toIndex();
					//		}else if(delta<0){
					//			//下
					//			if(_curi!=_size-1){
					//				_curi++;
					//				fn(_prev,_curi);
					//			}else{
					//				toIndex(_win.height());
					//			}
					//		}
					//		setTimeout(function(){_isrun=true},800);
					//	}
					//	event.stopPropagation();
					//	event.preventDefault();
					//});
					//
					function bb(){
						a(".prev-link").trigger("click");
					};
					function cc(){
						a(".next-link").trigger("click");
					};


					a("a.circle").click(this.circleClickHandler);
					a(".prev-link").click(this.prevLinkHandler);
					a(".next-link").click(this.nextLinkHandler);
					if (c.hideSlideChooser) {
						a("a.circle").hide()
					}
					if (c.hidePrevAndNextArrows) {
						a(".prev-link, .next-link").hide()
					}
				},
				addCircles: function() {
					var A = this;
					var a_wrap = $("<div class='a_wrap'></div>");
					y.$imgs.each(function() {
						var B = a('<a href="#" rel="' + A.circleCount + '" class="circle"></a>');
						B.css({

						});
						B.appendTo(a_wrap);
						A.circleCount++
					});
					a_wrap.appendTo(j);
				},
				addPrevAndNextLinks: function() {
					a('<a href="#" class="prev-link"></a>').appendTo(j);
					a('<a href="#" class="next-link"></a>').appendTo(j)
				},
				circleClickHandler: function(B) {
					var A = parseInt(a(this).attr("rel"), 10);
					y.goToSlide(A);
					B.preventDefault()
				},
				prevLinkHandler: function(B) {
					var A = y.displayImg - 1;
					if (A < 0) {
						A = y.size - 1
					}
					y.goToSlide(A);
					B.preventDefault()
				},
				nextLinkHandler: function(B) {
					var A = y.displayImg + 1;
					if (A >= y.size) {
						A = 0
					}
					y.goToSlide(A);
					B.preventDefault()
				}
			});
			var l = new i();
			l.addAll();
			y.populateTransitions();
			y.begin()
		});
		return this
	}

})(jQuery);
/*
 本代码由97站长网收集并编辑整理;
 尊重他人劳动成果;
 转载请保留97站长网链接 - www.97zzw.com
 */
//
function con_lev1Top(){
	$(".con_lev1").bind("mousewheel",function(event,delta){
		if(delta>0){
			toIndex();
		}
		if(delta<0){

		}
	});
}
