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
//首页传送带
function convey(){
	//初始变量
	var ul = $(".pav_syn .pav .show ul");
	var li = $(".pav_syn .pav .show ul li");
	var cloneLi = li.clone(true);
	ul.append(cloneLi);
	cloneLi = li.clone(true);
	ul.prepend(cloneLi);
	//设ul的宽度
	li = $(".pav_syn .pav .show ul li");
	var oneLiWidth = li.eq(0).outerWidth(true);
	var liWidth = oneLiWidth*li.length;
    ul.width(liWidth);
//ul定位
	var startLeft = -(oneLiWidth*4);
	ul.css({"position":"absolute","left":startLeft});
	//左右点击事件
	var lBtn = $(".pav_syn .main .show_btn a.prev");
	var rBtn = $(".pav_syn .main .show_btn a.next");
	//计数
	var i = 0,j = 0;
	//左按钮
	function lBtnF(){
		clearInterval(p);
		//console.log(ul.css("left"));
		//边界判定
		if(ul.is(":animated")){return false}
		else{i++;}
		if(ul.css("left") >= -oneLiWidth+"px"){
			ul.css({"left":-oneLiWidth*8+"px"});
			i = -3;
			ul.stop().animate({"left":startLeft + oneLiWidth*i});
		}
		else{
			ul.stop().animate({"left":startLeft + oneLiWidth*i});
			j = i;}
		setInter()
	}
		lBtn.click(lBtnF);
	//右按钮
	rBtn.click(function(){
		clearInterval(p);
		//console.log(ul.css("left"));
		if(ul.is(":animated")){return false}
		else{j--;}
		//边界判定
		if(ul.css("left") <= -oneLiWidth*7+"px"){
			console.log(1);
			ul.css({"left":0+"px"});
			j = 3;
			ul.stop().animate({"left":startLeft + oneLiWidth*j});
		}
		else{
			ul.stop().animate({"left":startLeft + oneLiWidth*j});
			i = j;
		}
		setInter()
	});
	//自动执行
	var p;
	function setInter(){
		p = setInterval(lBtnF,3000);
	}
	setInter();
}
//首页传送 奇偶样式   23
function oddEven(){
	var li = $(".pav_syn .pav .show ul li");
	var show_pic = li.find(".show_pic");
	var show_instru = li.find(".show_instru");
	li.find("h3").css({"margin-top":"23px"});
	li.mouseenter(function(){
		$(this).find(".show_instru").insertBefore($(this).find(".show_instru").siblings());
		$(this).find(".show_instru").siblings().css({"margin-top":"44px"})
	});
	li.mouseleave(function(){
		$(this).find(".show_pic").insertBefore($(this).find(".show_pic").siblings());
		$(this).find(".show_instru").siblings().css({"margin-top":"23px"})
	});
	//show_instru.mouseenter(function(i){
	//	$(this).insertBefore($(this).siblings());
	//	$(this).siblings().css({"margin-top":"44px"})
	//});
	//show_instru.mouseleave(function(i){
	//	$(this).insertBefore($(this).siblings());
	//	$(this).siblings().css({"margin-top":"23px"})
	//});
}

//exhi ul宽度
function ulWidth(){
	var ul = $(".value_vision .vv .show ul");
	var li = $(".value_vision .vv .show ul li");
	var allLiWidth = li.outerWidth(true)*4;
	ul.width(allLiWidth).css({"margin":"0 auto"});
}
//exhi分页器宽度
function pageWidth(){
	var wrap = $(".value_vision .page");
	var ul = $(".value_vision .page ul");
	//console.log(wrap);
	console.log(ul.width());
	wrap.width(ul.width()+72);
}
//04 men_acti 标题显示
function title(){
	var a = $(".value_vision .acti_list .main ul li article h3 a");
	var span = $(".value_vision .acti_list .main ul li article span.icon");
	a.mouseenter(function(){
			$(this).css({"color":"#66824e"});
			var _index = $(this).index();
			span.eq(_index).css({"background":"#66824e"});
	});
	a.mouseleave(function(){
		$(this).css({"color":"#999"});
		var _index = $(this).index();
		span.eq(_index).css({"background":"#999"});
	});
}
//04会员中心-资料下载 btn背景替换
function btnBg(){
	var btn = $(".value_vision .download .main ul li .btn a img");
	btn.mouseenter(function(){
		$(this).attr("src","images/download_pic1.png")
	});
	btn.mouseleave(function(){
		$(this).attr("src","images/download_pic0.png")
	})
}
//06-直销披露
function salesTab(){
	var li = $(".sales .main .tab .aside li");
	var con = $(".sales .main .tab .con");
	li.mouseenter(function(){
		$(this).addClass("hover").siblings().removeClass("hover");
		var _index = $(this).index();
		con.eq(_index).addClass("on").siblings().removeClass("on");
	})
}
//new_pro
function new_pro(){
	var ul = $(".main1 ul");
	var length = ul.length;
	var prev = $(".new_pro .main1 .dire a.prev");
	var next = $(".new_pro .main1 .dire a.next");
	var i = 0;
	var j = 0;
	//0
	//length-1
	next.click(function(){
		i++;
		if(i > length-1){i = 0}
		ul.eq(i).addClass("on").siblings().removeClass("on");
		j=i;
	});
	prev.click(function(){
		j--;
		if(j == -1){j = length-1}
		ul.eq(j).addClass("on").siblings().removeClass("on");
		i=j;
	});
}
