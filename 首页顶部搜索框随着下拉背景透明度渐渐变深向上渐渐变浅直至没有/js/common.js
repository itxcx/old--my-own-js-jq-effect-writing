//页面计算问题
function setRootSize() {
	var deviceWidth = document.documentElement.clientWidth; 
	if(deviceWidth>750){deviceWidth = 750;}
	document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}
setRootSize();
window.addEventListener('resize', function () {
    setRootSize();
}, false);
$(document).ready(function(){
	setRootSize();
});

//首页banner效果 - 本效果由昆明天度网络IRIS原创制作
function indexBanner(boxid,sumid,sname,_go,_speed,numid,nname,nhover,lastid,nextid){
	var startX,startY,endX,endY,startPos;//定义判断变量
	var _box = $(boxid);
	var _sum = $(sumid);
	var _arr = _sum.find(sname);
	var _length = _arr.length;
	var _numbox = $(numid);
	var _index = 0;
	var _nexti = 0;
	
	_sum.append(_sum.html());
	_arr = _sum.find(sname);
	_box.css({"overflow":"hidden"});
	_sum.css({"position":"relative","left":"0"});
	_arr.css({"display":"block","float":"left"});
	
	//数字切换
	var _numstr = "";
	for(var i=0;i<_length;i++){
		var thenum = i+1;
		_numstr += "<"+nname+">"+thenum+"</"+nname+">";
		}
	_numbox.html(_numstr);
	var _num = _numbox.find(nname);
	_num.eq(_index).addClass(nhover);
	
	//计算宽度
	var _width = _box.width();
	var _sumwidth = _length*2*_width;
	var _resize = function(){
		_width = _box.width();
		_sumwidth = _length*2*_width;
		_arr.width(_width);
		_sum.width(_sumwidth);
		var _move = -_width * _index;
		_sum.css("left",_move+"px");
		};
	_resize();
	$(window).resize(function(){_resize();});
	
	var movego = function(){
		if(_sum.is(":animated")){
			_sum.stop(true,true);
			}
		var _move = -_width * _nexti;
		_sum.animate({left:_move+"px"},_go);
		_num.eq(_index).addClass(nhover).siblings().removeClass(nhover);
	};
	
	var nextImg = function(){
		_index++;
		_nexti++;
		
		if(_index >= _length){
			_index = 0;
			}
		if(_nexti > _length){
			_nexti = _index;
			_sum.css("left","0px");
			}
		movego();
	};
	
	var lastImg = function(){
		_index--;
		_nexti--;
		
		if(_index < 0){
			_index = _length-1;
			}
		if(_nexti < 0){
			var _m = -_width * _length;
			_sum.css("left",_m+"px");
			_nexti = _index;
			}
		movego();
	};
	
	var cartoon = setInterval(nextImg,_speed);
	
	var touchStart = function(event){
		clearInterval(cartoon);
		var touch = event.originalEvent.touches[0];
		endX = 0;
		endY = 0;
		startPos = +new Date;
        startX = touch.pageX;
		startY = touch.pageY;
		};
	var touchMove = function(event){
		var touch = event.originalEvent.touches[0];
		var endPos = {x:startX-touch.pageX,y:startY-touch.pageY};
		var isScrolling = Math.abs(endPos.x)< Math.abs(endPos.y) ? 1:0;//isScrolling为1时，表示纵向滑动，0为横向滑动
		if(isScrolling === 0){
			event.preventDefault();//这里很重要！！！
			endX = (startX-touch.pageX);
		    //endY = (startY-touch.pageY);
			}
		};
	var touchEnd = function(event){
		var duration = +new Date - startPos;    // 滑动的持续时间
		if (Number(duration) > 100){
		  if(endX > 50){ nextImg(); }
		  if(endX < -50){ lastImg(); }
		}//time if
		cartoon = setInterval(nextImg,_speed);
		};
	
	_box.bind("touchstart",touchStart);
	_box.bind("touchmove",touchMove);
	_box.bind("touchend",touchEnd);
	
	_num.click(function(){
		_nexti = _index = $(this).index();
		movego();
		});
	
	if(lastid != ""){
		$(lastid).click(function(){ lastImg(); });
	}
	if(nextid != ""){
		$(nextid).click(function(){ nextImg(); });
	}
	
}//该方法结束

//搜索框部分 - 本效果由昆明天度网络IRIS原创制作
function searchTextClear(_name,_text,color01,color02){
	var _obj = $(_name);
	_obj.val(_text);
	_obj.css("color",color01);
	_obj.click(function(){
		var _now = _obj.val();
		if(_now == _text){
			_obj.val("");
			_obj.css("color",color02);
		}
	});
	_obj.blur(function(){
		var _now = _obj.val();
		if(_now == ""){
			_obj.val(_text);
			_obj.css("color",color01);
		}
	});
}

//高度计算 - 本效果由昆明天度网络IRIS原创制作
function winShowHeight(boxid,_height){
	var _nowh;
	var _heightadd = function(){
		_nowh = $(window).height() - _height;
		$(boxid).height(_nowh);
		};
    _heightadd();
	$(window).resize(function(){
		_heightadd();
		});
}

//选项卡部分
function menuCheckShow(menuid,mname,sumid,sname,_hover,_starnum){
	var _menu = $("#"+menuid).find(mname);
	var _arr = $("#"+sumid).find(sname);
	var _index = _starnum;
	_menu.eq(_index).addClass(_hover).siblings().removeClass(_hover);
	_arr.eq(_index).css("display","block").siblings().css("display","none");
	_menu.hover(function(){
		_index = $(this).index();
		_menu.eq(_index).addClass(_hover).siblings().removeClass(_hover);
	_arr.eq(_index).css("display","block").siblings().css("display","none");
		});
	_menu.click(function(){
		_index = $(this).index();
		_menu.eq(_index).addClass(_hover).siblings().removeClass(_hover);
	_arr.eq(_index).css("display","block").siblings().css("display","none");
		});
}

//评价星星效果
function reviewsBox(boxid,_name,_hover){
	var _box = $(boxid);
	var _arr = _box.find(_name);
	var _index = 0;
	var _now = _box.find("."+_hover).length;
	
	var _checkNow = function(_num){
		_arr.removeClass(_hover);
			for(var i=0;i<=_num;i++){
			  _arr.eq(i).addClass(_hover);
			  }
		};//fun END
	_arr.hover(function(){
		_index = $(this).index();
		_checkNow(_index);
		},function(){
			_checkNow(_now-1);
			});
	_arr.click(function(){
		    _now = $(this).index();
		    for(var i=0;i<=_now;i++){
			  _arr.eq(i).addClass(_hover);
			  }
			_now += 1;
		});
}

//横向左右滑动
function listInfeedMove(boxid,_sum,_name,_num){
	var startX,startY,endX,endY;//定义判断变量
	var _box = $("#"+boxid);
	var _thesum = _box.find(_sum);
	var _arr = _box.find(_name);
	var _length = _arr.length;
	var _width = _box.width();
	var _index = 0;
	var _out = document.getElementById(boxid);
	
	//设置必要属性
	_box.css({"overflow":"hidden"});
	_thesum.css({"width":"99999px","position":"relative","left":"0"});
	_arr.css({"float":"left","display":"block"});
	
	var widthwin = function(){
		_width = _box.width()/_num;
		_arr.width(_width);
		var _mm = -_index*_width;
		_thesum.css({"left":_mm+"px"});
	};
	widthwin();
	$(window).resize(function(){widthwin();});
	
	//移动的主要方法
	var movenav = function(){
		if(_thesum.is(":animated")){_thesum.stop(true,true);}
		var _mm = -_index*_width;
		_thesum.animate({left:_mm+"px"},200);
	};
	
	var _nextnav = function(){
		_index++;
		if(_index > _length-_num){_index = _length-_num;}
		if(_length > _num){
			movenav();
			}
		};
	var _lastnav = function(){
		_index--;
		if(_index < 0){_index = 0;}
		if(_length > _num){
			movenav();
			}
		};
	
	var touchStart = function(event){
		var touch = event.touches[0];
		endX = 0;
		endY = 0;
        startX = touch.pageX;
		startY = touch.pageY;
		};
	var touchMove = function(event){
		var touch = event.touches[0];
		var endPos = {x:startX-touch.pageX,y:startY-touch.pageY};
		var isScrolling = Math.abs(endPos.x)< Math.abs(endPos.y) ? 1:0;//isScrolling为1时，表示纵向滑动，0为横向滑动
		if(isScrolling === 0){
			event.preventDefault();//这里很重要！！！
			endX = (startX-touch.pageX);
		    //endY = (startY-touch.pageY);
			}
		};
	var touchEnd = function(event){
		if(endX > 50){
			_nextnav();
			}
		if(endX < -50){
			_lastnav();
			}
		};
	
	_out.addEventListener("touchstart", touchStart, false);
    _out.addEventListener("touchmove", touchMove, false);
    _out.addEventListener("touchend", touchEnd, false);
	
}

function checkManyBox(boxid,sumid,sumname,numid,numname,_hover,_bool){
	var startX,startY,endX,endY,startPos;//定义判断变量
	var _box = $(boxid);
	var _now,_nowbox,_nownum,_index,_nowsum,_width,_nowlength,_narr,_next;
	
	//相关方法定义
	var mainmove = function(){
		var _move = _width * _next;
		var _str_m = "translateX(-"+_move+"px)";
		var one_s = _nowbox.attr("adspeed");
		one_s = one_s/1000;
		_nowsum.css({
			"transition":"all "+one_s+"s ease-in-out",
			"-webkit-transition":"all "+one_s+"s ease-in-out",
			"transform":_str_m,
			"-webkit-transform":_str_m
			});
		_narr.eq(_index).addClass(_hover).siblings().removeClass(_hover);
	}; 
	var nextImg = function(){		
		_index++;
		_next++;
		if(_index >= _nowlength){
			_index = 0;
			}
		if(_next == 1){
			_nowsum.css({
			    "transition":"none",
			    "-webkit-transition":"none",
			    "transform":"translateX(0px)",
			    "-webkit-transform":"translateX(0px)"
			  });  
		    }
		setTimeout(mainmove,5);
	};
	var lastImg = function(){		
		_index--;
		_next--;
		if(_index < 0){
			_index = _nowlength-1;
			}
		if(_next < 0){
			_next = _nowlength-1;
			var _mm = _nowlength * _width;
			_nowsum.css({
			    "transition":"none",
			    "-webkit-transition":"none",
			    "transform":"translateX(-"+_mm+"px)",
			    "-webkit-transform":"translateX(-"+_mm+"px)"
			  });  
		    }
		setTimeout(mainmove,5);
	};
	
	//循环使用
	for(var i=0;i<_box.length;i++){
		var _one = _box.eq(i);
		var one_s = _one.attr("adspeed");
		one_s = one_s/1000;
		var one_sum = _one.find(sumid);
		var one_l =	one_sum.find(sumname).length;
		one_sum.append(one_sum.html());
		one_sum.css({
		  "width":"99999px",
		  "overflow":"hidden",
		  "transition":"all "+one_s+"s ease-in-out",
		  "-webkit-transition":"all "+one_s+"s ease-in-out"
		});
		_one.css({"overflow":"hidden"});
		var _str ="";
		for(var j=1;j<=one_l;j++){
			_str +="<"+numname+">"+j+"</"+numname+">";
			}
		_one.find(numid).html(_str);
		_one.find(numid).find(numname).eq(0).addClass(_hover);
		
	}//for END
	
	var starinfo = function(){
		for(var i=0;i<_box.length;i++){
			var _one = _box.eq(i);
			var one_sum = _one.find(sumid);
			var one_arr = one_sum.find(sumname);
		    var one_width = _one.width();
			one_arr.css({
		        "width":one_width+"px",
		        "overflow":"hidden",
		        "float":"left"
		    });
		}
	};//fun END
	starinfo();
	$(window).resize(function(){
		starinfo();
		});
		
	var touchStart = function(event){
		_now = _box.index($(this));
		_nowbox = _box.eq(_now);
		_nowsum = _nowbox.find(sumid);
		_nownum = _nowbox.find(numid);
		_index = _nownum.find("."+_hover).index();
		_next = _index;
		_width = _nowbox.width();
		_narr = _nownum.find(numname);
		_nowlength = _narr.length;
		
		var touch = event.originalEvent.touches[0];
		endX = 0;
		endY = 0;
		startPos = +new Date;
        startX = touch.pageX;
		startY = touch.pageY;
		};
	var touchMove = function(event){
		var touch = event.originalEvent.touches[0];
		var endPos = {x:startX-touch.pageX,y:startY-touch.pageY};
		var isScrolling = Math.abs(endPos.x)< Math.abs(endPos.y) ? 1:0;//isScrolling为1时，表示纵向滑动，0为横向滑动
		if(isScrolling === 0){
			event.preventDefault();//这里很重要！！！
			endX = (startX-touch.pageX);
		    //endY = (startY-touch.pageY);
			}
		};
	var touchEnd = function(event){
		var duration = +new Date - startPos;    // 滑动的持续时间
		if (Number(duration) > 100){
		  if(endX > 50){ nextImg(); }
		  if(endX < -50){ lastImg(); }
		}//time if
		};
	
	_box.bind("touchstart",touchStart);
	_box.bind("touchmove",touchMove);
	_box.bind("touchend",touchEnd);
}
//qxn start
//I-2简历2 图片上传
function picUpload(){
	var btn = $(".personal_infomation .upload .unload_pic ul li span");
	btn.click(function(){
		$(this).parents("li").remove();
	})
}
//H-1帮助中心1 列表下拉
function listDrop(){
	var btn = $(".help_center_lists ul li .parent");
	var drop = $(".help_center_lists ul li .subclass");
	btn.click(function(){		
		if($(this).hasClass("sel")){$(this).removeClass("sel")}
		else{$(this).addClass("sel");}
		$(this).siblings().slideToggle();	
		$(this).parent().siblings().find(".parent").removeClass("sel");
		$(this).parent().siblings().find(".subclass").slideUp();
	})
}
//A-1-首页 搜索框背景变化
function indexSearchBg(){
	var scroll = 0;
	var head = $(".index_search_wrap");
	var headHeight = $(".index_search_wrap").height();
	var bannerHeight = $(".index_head").height();
	var change = 0;	
	$(document).scroll(function(){
		scroll = $("body").scrollTop();		
		if(scroll<=bannerHeight-headHeight){			
			change = .85*(scroll/(bannerHeight-headHeight));			
			head.css("background","rgba(236,111,31,"+change+")")			
		}
		else{
			
		}
	});	
}
//筛选下拉
function filterDrop(btn){	
	var btn = $(btn);	
	btn.click(function(){
		$(this).siblings().removeClass("sel");
		$(this).siblings().find(".places").slideUp();
		if(!$(this).hasClass("sel")){$(this).addClass("sel")}
		else{$(this).removeClass("sel")};
		$(this).find(".places").slideToggle().css({"margin-left":-$(this).offset().left});		
	});
	
}
