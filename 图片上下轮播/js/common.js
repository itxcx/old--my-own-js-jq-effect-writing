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
			console.log(i)
		}
	}
	//定时器
	function setInter(){
		p = setInterval(downToTop,delay)
	};
	setInter();
}