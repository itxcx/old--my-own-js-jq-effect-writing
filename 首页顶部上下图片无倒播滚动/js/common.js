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

//首页右边框去除
function removeRightBorder(omenu){
	var menu = $(omenu);
	menu.children().last().css({"border":"0"});
}
//首页顶部滚动
function indexTopScroll(div,speed,delay){
	if(speed >= delay){delay = speed + 100}
	//计数变量
	var i = 0;
	//定时器变量
	var p;
	//div
	var odiv = $(div);
	var oul = odiv.children();
	var oli = oul.children();
	//li的高度
	var liHeight = oli.eq(0).height();
	//clone第一个
	var clone = oli.eq(0).clone();
	//添加节点
	oul.append(clone);
	//从下往上滚动
	function downToTop(){
		if(i == oli.length){
			oul.css({"top":"0px"});
			i = 1;
			oul.animate({"top":-i*liHeight},speed);
		}
		else{
			i++;
			oul.animate({"top":-i*liHeight},speed);
		}
	}
	//定时器
	function setInter(){
		p = setInterval(downToTop,delay)
	};
	setInter();
}
//首页banner轮播
function indexBanner(oul,l,r,btnwrap,btnA){
	var ul = $(oul);
	var li = ul.find("a");
	li.width(window.screen.width);
	var liWidth = li.width();
	ul.append(li.eq(0).clone(true));
	var prevBtn = $(l);
	var nextBtn = $(r);
	var i = 0;
	//ul宽度
	ul.width(liWidth*ul.children().length);
	//banner_btn按钮自动生成
	var banner_btn = $(btnwrap);
	for(var j=0;j<li.length;j++){
		banner_btn.append('<a href="javascript:void(0)"></a>');
	}
	var a = $(btnA);
	a.eq(0).attr("class","on");
	prevBtn.click(function(){
			clearInterval(p);
			if(i == 0){
				ul.css({"left":-liWidth*(ul.children().length-1)});
				i = ul.children().length - 2;
				ul.stop().animate({"left":-liWidth*i});
				a.eq(i).addClass("on").siblings().removeClass("on");
			}
			else{
				i--;
				ul.stop().animate({"left":-liWidth*i});
				a.eq(i).addClass("on").siblings().removeClass("on");
			}
			setInter();
		}
	);
	nextBtn.click(nextBtnClick);

	function nextBtnClick(){
		clearInterval(p);
		if(i == ul.children().length - 2){
			a.eq(0).addClass("on").siblings().removeClass("on");
		}
		if(i == ul.children().length - 1){
			ul.css({"left":"0px"});
			i = 1;
			ul.stop().animate({"left":-liWidth*i});
			a.eq(1).addClass("on").siblings().removeClass("on");
		}
		else{
			i++;
			ul.stop().animate({"left":-liWidth*i});
			a.eq(i).addClass("on").siblings().removeClass("on");
		}
		setInter();
	}

	a.mouseenter(function(){
		clearInterval(p);
		var _index = $(this).index();
		if(_index == 0){
			ul.css({"left":-liWidth*(_index+1)});
		}
		else{
			ul.css({"left":-liWidth*(_index-1)});
		}
		$(this).addClass("on").siblings().removeClass("on");
		ul.stop().animate({"left":-liWidth*_index});
		i = _index;
		setInter();
	});
	//自动轮播
	var p;
	function setInter(){
		p = window.setInterval(nextBtnClick,4000)
	}
	setInter();
	//按钮出现消失
	var header = $(".index_h");
	header.hover(
		function(){
			prevBtn.add(nextBtn).fadeIn();
		},
		function(){
			prevBtn.add(nextBtn).fadeOut();
		}
	)
}
//首页drop1下拉 //首页drop2下拉 //首页drop3下拉
function drop(dom,className){
	//变量
	var odrop1;
	//触发
	var odl = $(dom);
	odl.mouseenter(function(){
		odrop1 = $(this).children(className);
		//阻止重复运动
		if(odrop1.is(":animated")){odrop1.stop(true,true);}
		odrop1.slideDown();
	});
	odl.mouseleave(function(){
		odrop1.slideUp();
	});
}
//首页dl轮播
function indexDlBanner(){
	//计数变量
	var i = 0;
	var j = 0;
	//定时器变量
	var p;
	//oul
	var oul = $(".search_for_job .bottom .fl1 .wrap");
	//li
	var oli = $(".search_for_job .bottom .fl1 .wrap .inside");
	//设li宽高度
	oli.width(852);
	oli.height(452);
	//clone
	var clone = oli.eq(0).clone();
	oul.append(clone);
	//设ul宽度
	var allLiWidth = (oli.length+1)*852;
	oul.css({"width":allLiWidth});
	//动态生成按钮
	var btnWrap = $(".search_for_job .btn");
	oli.each(function(i,d){
		var newA = $('<a href="javascript:void(0)"></a>');
		btnWrap.append(newA)
	});
	var btnA = btnWrap.children();
	btnA.eq(0).addClass("on");
	//从右往左移函数
	function rightToLeft(){
		if(i == oli.length){
			oul.css({"left":"0"});
			i = 1;
			oul.animate({"left":-i*852},2000);
		}
		else{
			i++;
			oul.animate({"left":-i*852},2000);
		}
		if(j == oli.length-1){j = 0;btnA.eq(j).addClass("on").siblings().removeClass("on");}
		else{j++;btnA.eq(j).addClass("on").siblings().removeClass("on");}
	}
	//定时器函数
	function setInter(){
		p = setInterval(rightToLeft,8000);
	}
	setInter();
	//鼠标悬停效果
	btnA.mouseenter(function(){
		clearInterval(p);
		var _index = $(this).index();
		btnA.eq(_index).addClass("on").siblings().removeClass("on");
		j = _index;
		i = _index;
		oul.stop().animate({"left":-i*852},2000);
		btnA.eq(j).addClass("on").siblings().removeClass("on");
		oul.css({"left":-852*i});
		setInter();
	})
}
//footer部分 左右滚动
function footerRoll(){
	//count
	var i = 0;
	//btn
	var rightBtn = $(".home_economics_footer .friendship_link1 .navs .r .right");
	var leftBtn = $(".home_economics_footer .friendship_link1 .navs .r .left");
	//menus
	var menu = $(".home_economics_footer .friendship_link1 .navs .m");
	//ul
	var ul = $(".home_economics_footer .friendship_link1 .navs .m_wrap .inside");
	//ul宽
	var allLiWidth = 0;
	//liWidth
	var liWidth = menu.width();
	menu.each(function(i,d){
		allLiWidth += $(d).width();
	});
	ul.width(allLiWidth);
	//函数
	function leftToRight(){
		if(i==0){i=menu.length}
		i--;
		ul.stop().animate({"left":-i*liWidth})
	}
	function rightToLeft(){
		if(i==menu.length-1){i=-1}
		i++;
		ul.stop().animate({"left":-i*liWidth})
	}
	//strike
	leftBtn.click(rightToLeft);
	rightBtn.click(leftToRight)
}
//图册效果
function photoEffect(){
	//smallpics
	var smallPics = $(".housekeeping_details .book .fl .rightSide img");
	//bigpic
	var bigPic = $(".housekeeping_details .book .fl .big");
	smallPics.mouseenter(function(){
		//class
		$(this).addClass("sel").siblings().removeClass("sel");
		//src
		var path = $(this).attr("src");
		bigPic.attr("src",path);
	})
}
//图文评价吸顶
function picScrollTop(){
	//tit
	var tit = $(".housekeeping_details .bottom .graphic_details .tit");
	var titOffset = tit.offset().top;
	var bodyScroll = 0;
	$(document).scroll(function(){
		bodyScroll = $("body").scrollTop();
		if(bodyScroll>=titOffset){
			tit.css({"position":"fixed"});
		}
		else{
			tit.css({"position":"static"});
		}
	});
}

$(function(){
	//footer部分 左右滚动
	footerRoll();
});
