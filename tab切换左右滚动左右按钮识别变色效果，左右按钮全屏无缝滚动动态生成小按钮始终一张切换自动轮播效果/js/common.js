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
//产品左侧列表 下拉功能
function leftDrop(){
	var tit = $(".con .fl .list ul li a");
	var menu = $(".con .fl .list ul li menu");
	tit.parent("li").children(".on").siblings().css({"display":"block"});
	tit.click(function(){
		$(this).addClass("on").parent().siblings().children().removeClass("on");
		$(this).siblings().slideToggle();
	})
}
//大小图片展示效果
function picExhi(){
	var smallPic = $(".con .lists_fr .det .pic_exhi .smallPic img");
	var bigPic = $(".con .lists_fr .det .pic_exhi .bigPic img");
	smallPic.mouseenter(function(){
		$(this).addClass("on").siblings().removeClass("on");
		bigPic.attr("src",$(this).attr("src"))
	})
}
//首页相关产品 tab滚动效果
function tabScroll(){
	var tabBtn = $(".related .in .tab a");
	var tabLayer = $(".related .in .pic");
	var leftBtn = $(".related .in .btn a.prev");
	var rightBtn = $(".related .in .btn a.next");
	var ul = $(".related .in .pic.on ul");
	var li = ul.children("li");
	var i = 0;
	//设ul宽度
	ul.width(li.outerWidth(true)*li.length);
	tabBtn.click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var _index = $(this).index();
		tabLayer.eq(_index).addClass("on").siblings().removeClass("on");
		//设ul宽度
		ul = $(".related .in .pic.on ul");
		li = ul.children("li");
		ul.width(li.outerWidth(true)*li.length);
		i = 0;
		ul.css({"left":"0px"});
		leftBtn.removeClass("on");
		rightBtn.addClass("on");
	});
	leftBtn.click(function(){
		if(i == 0){
		return false;}
		else{i--;$(this).parent().children().addClass("on");}
		ul.animate({"left":-li.outerWidth(true)*i})
		if(i == 0){$(this).removeClass("on");}
	});
	rightBtn.click(function(){
		//console.log(i)
		//console.log(li.length - 4)
		//console.log($(this))
		if(i == li.length - 3){return false;}
		else{i++;$(this).parent().children().addClass("on");}
		ul.animate({"left":-li.outerWidth(true)*i});
		if(i == li.length - 3){$(this).removeClass("on");}
	})
}
//首页banner轮播
function indexBanner(oul,l,r,btnwrap){
	var ul = $(oul);
	var li = ul.children("li");
	li.width(window.screen.width);
	var liWidth = li.width();
	//console.log(liWidth);
	ul.append(li.eq(0).clone(true));
	var prevBtn = $(l);
	var nextBtn = $(r);
	var i = 0;
	//console.log(liWidth);
	//console.log(ul.children().length);
	//ul宽度
	ul.width(liWidth*ul.children().length);
	//banner_btn按钮自动生成
	var banner_btn = $(btnwrap);
	for(var j=0;j<li.length;j++){
		banner_btn.append('<a href="javascript:void(0)"></a>');
	}
	var a = $(".index_h .banner_btn a");
	a.eq(0).attr("class","on");
	prevBtn.click(function(){
			clearInterval(p);
			if(i == 0){
//console.log(1)
//console.log(liWidth)
//console.log(ul.children().length-1)
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

$(function(){
	//产品左侧列表 下拉功能
	leftDrop();
});