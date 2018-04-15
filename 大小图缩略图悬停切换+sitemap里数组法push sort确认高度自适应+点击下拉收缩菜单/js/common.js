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

//about_02分页器宽度
function pageWidth(){
	var wrap = $(".about_01 .con .page");
	var ul = $(".con .page ul");
	wrap.width(ul.width()+72)
}
//com_01按钮宽度
function iconWidth(){
	var wrap = $(".about_01 .title ul");
	var li = $(".about_01 .title li");
	wrap.width(li.width()*li.length)
}
//com_01选项卡
function tab(){
	var icon = $(".about_01 .title li");
	var option = $(".com_pic");
	icon.click(function(){
		$(this).addClass("sel").siblings().removeClass("sel");
		var index = $(this).index();
		option.eq(index).addClass("show").siblings().removeClass("show");
	}
)}
//dec_02_details 缩略图
function pic(){
	var lpic = $(".con .details .pic .littlepic a img");
	var bpic = $(".con .details .pic .bigpic img");
	var littleli = $(".con .details .pic .littlepic li");
	lpic.mouseenter(function(){
		bpic.attr("src",$(this).attr("src"));
		littleli.removeClass("blue");
		$(this).parents(".con .details .pic .littlepic li").addClass("blue")
	});
}
//sitemap li高度自适应
function liHeight(){
	var li = $(".about_01 .title_sitemap .list li");
    var arr = [];
		for(var i=0;i<li.length;i++){
			arr.push(li.eq(i).find("a").length);
		}
	arr.sort();
	var maxNum = arr[arr.length-1];
	var a = $(".about_01 .title_sitemap .list li a");
	var allAHeight = a.eq(0).innerHeight()* maxNum;
	var nowLi = $(".about_01 .title_sitemap .list li");
	nowLi.height(allAHeight);
}
//06谛脉招聘-招聘职位 下拉
function slideToggle(){
	//设变量
	var title = $(".about_01 .con .main .recuit_post .post .name");
	var btn = $(".about_01 .con .main .recuit_post .post .loca");
	var slideLayer = $(".about_01 .con .main .recuit_post .post .post_con");
	//点击事件
	btn.click(function(){
		var _index = btn.index($(this));
		$(this).toggleClass("on");
		title.eq(_index).toggleClass("on");
		slideLayer.eq(_index).slideToggle();
	})
}

$(function(){
	pageWidth();
	iconWidth();
	pic();
});