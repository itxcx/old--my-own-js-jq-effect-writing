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
//首页nav宽度居中
function navCenter(){
	var ul = $(".nav ul");
	var li = $(".nav ul li");
	var allWidth=0;
	li.each(function(i,d){
		allWidth += $(d).width();
	});
	ul.width(allWidth);
	ul.css({"margin":"0 auto"});
}
//首页吸顶菜单
function navTop(){
	var _nav = $(".nav");
	$(window).scroll(function(){
		if($(window).scrollTop()>700){
			_nav.addClass("navTop");
			$(".package").css({"margin-top":"90px"});
		}
		else{
			_nav.removeClass("navTop");
			$(".package").css({"margin-top":"0px"});
		}
	});
}

function convey(){
	//初始变量
	var ul = $(".package .bottom .con ul");
	var li = $(".package .bottom .con ul li");
	//console.log(li.eq(0));
	var cloneLi = li.clone(true);
	ul.append(cloneLi);
	cloneLi = li.clone(true);
	ul.prepend(cloneLi);
	//设ul的宽度
	li = $(".package .bottom .con ul li");
	var oneLiWidth = li.eq(0).outerWidth(true);
	var liWidth = oneLiWidth*li.length+75;
	ul.width(liWidth);
//中间加class
	li.eq(li.length/3+2).addClass("sel");
//ul定位
	var startLeft = -(oneLiWidth*(li.length/3));
	ul.css({"position":"absolute","left":startLeft});
	//左右点击事件
	var lBtn = $(".package .bottom .prev");
	var rBtn = $(".package .bottom .next");
	//计数
	var i = 0,j = 0;
	//左按钮
	function lBtnF(){
		clearInterval(p);
		//console.log(ul.css("left"));
		//边界判定
		if(ul.is(":animated")){return false}
		else{i++;}
		//console.log(ul.css("left"));
		if(ul.css("left") == -oneLiWidth+"px"){
			ul.css({"left":-oneLiWidth*(li.length/3+1)+"px"});
			i=0;
			ul.stop().animate({"left":startLeft + oneLiWidth*i});

			li.parents().find(".sel").find(".circle").css({"display":"none"});
			li.parents().find(".sel").removeClass("sel");
			li.eq(li.length/3+2).addClass("sel");
			li.parents().find(".sel").find(".circle").css({"display":"block"});
			j=i;
		}
		else{
			ul.stop().animate({"left":startLeft + oneLiWidth*i});
			li.parents().find(".sel").find(".circle").css({"display":"none"});
			li.parents().find(".sel").removeClass("sel").prev().addClass("sel");
			li.parents().find(".sel").find(".circle").css({"display":"block"});
			j = i;}
		//setInter()
		//console.log(ul.css("left"));
	}
	lBtn.click(lBtnF);
	//右按钮
	rBtn.click(function(){
		clearInterval(p);
		//console.log(ul.css("left"));
		if(ul.is(":animated")){return false}
		else{j--;}
		//边界判定
		if(ul.css("left") == -oneLiWidth*(li.length/3*2)+"px"){
			//console.log(1);
			ul.css({"left":-oneLiWidth*(li.length/3)+"px"});
			j = -1;
			ul.stop().animate({"left":startLeft + oneLiWidth*j});

			li.parents().find(".sel").find(".circle").css({"display":"none"});
			li.parents().find(".sel").removeClass("sel");
			li.eq(li.length/3+2).next().addClass("sel");
			li.parents().find(".sel").find(".circle").css({"display":"block"});
			i=j;
		}
		else{
			ul.stop().animate({"left":startLeft + oneLiWidth*j});
			li.parents().find(".sel").find(".circle").css({"display":"none"});
			li.parents().find(".sel").removeClass("sel").next().addClass("sel");
			li.parents().find(".sel").find(".circle").css({"display":"block"});
			i = j;
		}
		//console.log(ul.css("left"));
		//setInter()
	});
	//自动执行
	var p;
	function setInter(){
		p = setInterval(lBtnF,3000);
	}
	//setInter();
	window.setTimeout(function(){
		//console.log(li.is(".sel"));
		li.parents().find(".sel").find(".circle").stop().show();
	},0);
	var p1;
	var _index;
	//li.hover(function(){
	//	$(this).addClass("sel").siblings().removeClass("sel");
	//	var _this = $(this);
	//		window.setTimeout(function(){
	//			_this.siblings().find(".circle").stop().hide();
	//			li.parents().find(".sel").find(".circle").stop().show();
	//		},0);
	//},function(){
	//})
	//li.mouseenter(function(){
	//	$(this).addClass("sel").siblings().removeClass("sel");
	//	var _this = $(this);
	//	_index = $(this).index();
	//	window.setTimeout(function(){
	//		li.eq(_index).siblings().find(".circle").stop().hide();
	//		li.eq(_index).find(".circle").stop().show();
	//	},500);
	//});
}
//首页story_roll
function storyRoll(){
	var ul = $(".story .story_slide ul");
	var img = $(".story .story_slide ul li a img");
	//ul宽度
	var totalWidth = 0;
	img.each(function(i,d){
		totalWidth += $(d).width()
		//console.log($(d).width())
	});
	//console.log(totalWidth)
	ul.width(totalWidth);

	//ul层鼠标拖动效果
//jq方法
	//鼠标按下
	var c = 0;
	var l = 0;

	ul.mousedown(function(e){
		//检测
		//console.log(1)
		//火狐谷歌事件兼容
		var ev = e||event;
		//取消图片默认事件
		ev.preventDefault();
		ev.stopPropagation();
		$(this).bind("mousemove","");
		//得出鼠标偏移值
		var div = $(".story .story_slide");
		var disX = ev.clientX - div.offset().left;
		//var disY = ev.offsetY;
		//console.log(ev.clientY)
		//console.log(ul.offset().left)
		//console.log(ul.offset().top)
		//console.log(ev.clientY);
		//console.log(ev.offsetX);
		//console.log(ev.offsetY);
		//console.log(disX)
		//console.log(disY)
		//鼠标移动事件

		$(document).mousemove(function(e){
			//火狐谷歌事件兼容
			var ev = e||event;
			//取消图片默认事件
			ev.cancelBubble=true;
			ev.returnValue = false;
			//ie
			window.event.cancelBubble = true;//停止冒泡
			window.event.returnValue = false;//阻止事件的默认行为
			//检测
			//console.log(1)
			l = ev.pageX - div.offset().left - disX+c;
			var y = ev.pageX - div.offset().left - disX;
			//console.log(l)
			//边界检测
			if(l>=0){l=0;}
			if(l<=-ul.width()+div.width()){l=-ul.width()+div.width();}
			//赋值
			ul.css({"left":l+"px"});
			//鼠标松开事件
			$(document).mouseup(function(){
				//检测
				//console.log(1);
				c = l;
				$(document).unbind("mousemove","");
				$(document).unbind("mouseup","")
				//console.log(Math.abs(y));
				if(Math.abs(y)>10){img.unbind("click","")}
				window.setTimeout(function(){
					//图片点击放大
					var largePic = $(".enlarge img");
					img.click(function (){
						//alert()
						$(".enlarge").css({"display":"block"});
						$("body").css({"overflow":"hidden"});
						largePic.attr("src",$(this).attr("src"));
					})
					$(".enlarge").click(function(){
						$(".enlarge").css({"display":"none"});
						$("body").css({"overflow":"visible"});
					});
				},100)
			})
		})
	})
var p = $(".story .comment");
	img.mouseenter(function(){
		var _index = $(this).parents("li").index();
		p.eq(_index).fadeIn();
		p.eq(_index).siblings("p").fadeOut();
	})
	}
//首页自动淡入淡出轮播
function fadeBanner(){
	//变量
	var a = $(".index .banner01");
	var i = 0;
	a.eq(0).css({"display":"block"});
	function bannerSwitch(){
		i++;
		a.eq(i).fadeIn("slow").siblings().fadeOut("slow");
		if(i == a.length-1){i=-1;}
	};
	window.setInterval(bannerSwitch,4000)
}
