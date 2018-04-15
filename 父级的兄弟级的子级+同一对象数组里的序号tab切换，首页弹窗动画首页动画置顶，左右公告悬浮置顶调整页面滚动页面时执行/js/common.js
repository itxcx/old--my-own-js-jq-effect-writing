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
//首页banner 动画
//function ba(){
//	var l = $("#adlast");
//	var r = $("#adnext");
//	var banner = $(".bannerbox");
//	banner.mouseenter(
//		function(){
//			l.animate({"left":"0","transition":"left 1s"});
//			r.animate({"right":"0","transition":"right 1s"});
//		}
//	)
//}
//首页bannner按钮宽度
function bannerBtn(){
	var main = $(".index_banner_main");
	main.width($(window).width());
}
//首页infos层 tab切换
function infosTab(){
	var btn = $(".infos .main article .infos_btn a");
	var con = $(".infos .main article .info_con");
	btn.click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var _index = $(this).index();
		con.eq(_index).addClass("on").siblings().removeClass("on");
	})
}
//首页class_guid层 tab切换
function class_guid(){
	var btn = $(".class_guid .main .guid_btn ul li a");
	var con = $(".class_guid .main .guid_con");
	btn.click(function(){
		$(this).addClass("on").parents(".class_guid .main .guid_btn ul li").siblings().find("a").removeClass("on");
		var _index = $(btn).index(this);
		con.eq(_index).addClass("on").siblings().removeClass("on");
	})
}
//首页video tab切换
function videoTab(){
	var btn = $(".video .main .guid_btn ul li a");
	var con = $(".video .main .video_cate");
	btn.click(function(){
		$(this).addClass("on").parents(".video .main .guid_btn ul li").siblings().find("a").removeClass("on");
		var _index = $(btn).index(this);
		con.eq(_index).addClass("on").siblings().removeClass("on");
	})
}
//首页 books传送带 宽度调整
function ajust(){
	//$(".books .books_banner").width(1077);
	$(".books .books_banner ul li").width(250).height(401);
	$(".books .books_banner").width(1104);
	var length = $(".books .books_banner ul li").length;
	var liWidth = $(".books .books_banner ul li").outerWidth(true);
	var allLiWidth = liWidth*length;
	$(".books .books_banner ul").css({"width":allLiWidth,"left":"-1104px"});
}
//首页 弹窗动画
function hoverQQ(){
	var con = $(".hover .hover_btn ul li.hover_btn_qq .hover_btn_qq_con");
	var btn = $(".hover .hover_btn ul li.hover_btn_qq a");
	var quit = $(".hover .hover_btn ul li.hover_btn_qq .hover_btn_qq_con .top .sec");
	btn.click(function(){
		con.animate({"left":"-141px"})
	});
	quit.click(function(){
		con.animate({"left":"50px"})
	})
}
//首页置顶事件
function stick(){
	var btn = $(".hover .hover_btn ul li.hover_btn_top a");
	btn.click(function(){
		$('html,body').animate({scrollTop:0},500);
	})
}
//招考资讯-招考公告 左右间距
function lr(l,r){
	var l = $(l);
	var r = $(r);
	var m = ($(window).width()-1200)/2;
	l.css({"left":m});
	r.css({"right":m});
	var Top;
	$(window).scroll(function(){
		//console.log(l.offset().top);
		Top = $(window).scrollTop();
		console.log($(window).scrollTop());
		if(Top>=172){l.css({"top":"0"});r.css({"top":"0"})}
		else{l.css({"top": 172-Top+"px"});r.css({"top": 172-Top+"px"})}
	})

	$(window).resize(function(){1
		l = $(l);
		r = $(r);
		m = ($(window).width()-1200)/2;
		l.css({"left":m});
		r.css({"right":m});
	})
}
//9.0搜索 左浮动
function r1(l,r){
	var r = $(r);
	var m = ($(window).width()-1200)/2;
	r.css({"left":m});
}

//首页 banner插件调整
function allWidth(){
	var a = $(".teacher_style .ts_banner");
	a.width(1200);
}