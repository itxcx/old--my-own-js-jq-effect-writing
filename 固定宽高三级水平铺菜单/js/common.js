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
//通用悬停选项卡
function menuCheckShowClick(menuid,mname,sumid,sname,_hover,_starnum){
	var _menu = $("#"+menuid).find(mname);
	var _arr = $("#"+sumid).find(sname);
	var _index = _starnum;
	_menu.eq(_index).addClass(_hover).siblings().removeClass(_hover);
	_arr.eq(_index).css("display","block").siblings().css("display","none");
	_menu.click(function(){
		_index = $(this).index();
		_menu.eq(_index).addClass(_hover).siblings().removeClass(_hover);
	_arr.eq(_index).fadeIn(300).siblings().fadeOut(300);
		});
}
function searchShow(){
 $(".searchbg .chear").click(function(){
    $(this).addClass("sel");
    $(".search_show").slideToggle();
  });
 $(".search_show a").click(function(e){
  var ev = e||window.event;
  //阻止事件冒泡
  ev.stopPropagation();
  ev.preventDefault();
    $(".search_show").slideUp();
    $(".searchbg .chear").removeClass("sel");
  //取值，赋值
  $(".searchbg .chear .but").text($(this).text());
  });
} 

function linkShow(){
 var li = $(".link_choer ul li");
 li.each(function(i,d){
 	$(d).click(function(){
 		$(this).addClass("sel").siblings().children(".link_show").slideUp();
	    $(this).children(".link_show").slideToggle();
 	});
 	var a = $(d).children(".link_show").children("a");
 	a.click(function(e){
 		var ev = e||window.event;
		  //阻止事件冒泡
		  ev.stopPropagation();
		  ev.preventDefault();
		    $(this).parent(".link_show").slideUp();
		    $(this).parents(".link_choer ul li").removeClass("sel");
		  //取值，赋值
		  $(this).parents(".link_choer ul li").children("a").text($(this).text());
 	})
 })
} 

//导航下拉2
function pcNavDown2(boxid,_name,_hover,_down,_height){
	var _box = $(boxid);
	var _arr = _box.children(_name);
	var _index = _box.children("."+_hover).index();
	$(_down).css({'display':"none"});


	var _height1 = $(_height).height();
    $(_down).css({'height':_height1});


	$(_arr).hover(function(){
		$(this).addClass(_hover).siblings().removeClass(_hover);
		if($(this).find(_down).is(":animated")){
	       $(this).find(_down).stop(true,true);
		   }
			$(this).find(_down).show();
		},function(){
			if($(this).find(_down).is(":animated")){
	           $(this).find(_down).stop(true,true);
		       }
		    $(this).find(_down).hide();
			});
		_box.mouseleave(function(){
			_arr.removeClass(_hover);
			});
}


//首页banner轮播
function indexBanner(all,oul,l,r,btnwrap){
	var ul = $(oul);
	var li = ul.children("li");
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
	var a = $(btnwrap).find("a");
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
	var header = $(all);
	header.hover(
		function(){
			prevBtn.add(nextBtn).fadeIn();
		},
		function(){
			prevBtn.add(nextBtn).fadeOut();
		}
	)
}



//首页banner轮播
function indexBanner2(all,oul,l,r,btnwrap,csk){
	var ul = $(oul);
	var li = ul.children("li");
	li.width($(csk));
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
	var a = $(btnwrap).find("a");
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
	var header = $(all);
	header.hover(
		function(){
			prevBtn.add(nextBtn).fadeIn();
		},
		function(){
			prevBtn.add(nextBtn).fadeOut();
		}
	)
}


//首页banner轮播
function indexBanner3(all,oul,l,r,btnwrap,csk,stop,play,but){
	var ul = $(oul);
	var li = ul.children("li");
	li.width($(csk));
	var liWidth = li.width();
	ul.append(li.eq(0).clone(true));
	var prevBtn = $(l);
	var nextBtn = $(r);
	var _play = $(play);
	var _stop = $(stop);
	var i = 0;
	var a1 = $(but);
	a1.click(function(){
		console.log(a1)
		var _index1 = $(this).index();
		ul.css({"left":-liWidth*_index1});
		i = _index1;
	})


	//ul宽度
	ul.width(liWidth*ul.children().length);
	//banner_btn按钮自动生成
	var banner_btn = $(btnwrap);
	for(var j=0;j<li.length;j++){
		banner_btn.append('<a href="javascript:void(0)"></a>');
	}
	var a = $(btnwrap).find("a");
	a.eq(0).attr("class","on");
	prevBtn.click(function(){
			// clearInterval(p);
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
			// setInter();
		}
	);
	nextBtn.click(nextBtnClick);
	function nextBtnClick(){
		// clearInterval(p);
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
		// setInter();
	}
		// _play.click(function(){
		//  clearInterval(p);
		// });
    _stop.click(function(){
		if (_stop.attr("class")=="stop") {
			setInter();
	        $(this).addClass("play");
		} else{
			$(this).removeClass("play");
	    clearInterval(p);    
		};
	});
	
	a.mouseenter(function(){
		// clearInterval(p);
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
		// setInter();
	});
	//自动轮播
	var p;
	function setInter(){
		p = window.setInterval(nextBtnClick,2000)
	}
	// setInter();
	//按钮出现消失
	var header = $(all);
	// header.hover(
	// 	function(){
	// 		prevBtn.add(nextBtn).fadeIn();
	// 	},
	// 	function(){
	// 		prevBtn.add(nextBtn).fadeOut();
	// 	}
	// )
}



function Eqthree(box) {
    var _gord= $(box);
    for (var i = 0; i < 3; i++) {
        _gord.eq(i).addClass("sel");
    }
}

function Aceil_nav(btn,nav) {
    // 声明变量
	   var btn = $(btn);
	   var nav = $(nav);
	   var actual_height = nav.height();
	   //初始状态
	   if(nav.height()<=46){
	      btn.hide();
	   }
	   else{
	    nav.css({"height":"46px","overflow":"hidden"});
	    btn.show();
	   }
	   //点击事件
	   btn.click(function(){
	    if(btn.css("display")=="block"&&btn.attr("class")=="link_more"){
	      nav.animate({"height":actual_height},1000);
	      btn.addClass("sel");
	    }
	    else{
	      nav.animate({"height":"46px"});
	      btn.removeClass("sel");
	    }
	})
}

function prolMenuDown(obj,but){
	var _obj = $(obj);
	var _box = $(obj);
	var _but = $(but);
	var actual_height = _box.height();
	$(_but).click(function(){
		if(_obj.hasClass("sel")){
			_obj.removeClass("sel");
			_box.animate("display","none");
		}else{
			_obj.addClass("sel");
			_box.animate("display","block");
			}
	})
	
}


$(function(){
	$(window).on('scroll',function(){
		var st = $(document).scrollTop();
		if( st>0 ){
			if( $('#main-container').length != 0  ){
				var w = $(window).width(),mw = $('#main-container').width();
				if( (w-mw)/2 > 70 )
					$('#go-top').css({'left':(w-mw)/2+mw+20});
				else{
					$('#go-top').css({'left':'auto'});
				}
			}
			$('#go-top').fadeIn(function(){
				$(this).removeClass('dn');
			});
		}else{
			$('#go-top').fadeOut(function(){
				$(this).addClass('dn');
			});
		}	
	});
	$('#go-top .go').on('click',function(){
		$('html,body').animate({'scrollTop':0},500);
	});

});

function selectFun(itemclass,h){
	var _oitem = $(itemclass);
	_oitem.each(function(){
	  var _this = $(this),
	      _iheight = _this.height();
	  if(_iheight>h){
	    _this.parent().append('<a href="javascript:;" class="b_more">更多</a>');
	    _this.height(h);

	    var _omore = _this.siblings("a.b_more");
	    _omore.click(function(){
	      var _tham = $(this);
	      if(_tham.hasClass("up")){
	        _tham.removeClass("up").html("更多");
	        _this.height(h);
	      }else{
	        _tham.addClass("up").html("收起");
	        _this.height("auto");
	      }
	    });
	  }
	});
}


function ImgShowtj(_bigImg,_smallImg){
  var bigImg = $(_bigImg);
  var smallImg = $(_smallImg);
  console.log(bigImg)
  console.log(smallImg)
  smallImg.mouseenter(function(){
    var _attr = $(this).attr("src");
    bigImg.attr("src",_attr);
    var w = bigImg.width();
    var h = bigImg.height();
    console.log(w)
    console.log(h)
    bigImg.css({"position":"absolute","left":"50%","top":"50%","margin-top":-h/2,"margin-left":-w/2});
  })
}
function mebHover(obj){
     $(obj).hover(function(){
        $(this).find("span").addClass("sel");
        $(this).find(".down_show").show();
      },function(){
        $(this).find("span").removeClass("sel");
        $(this).find(".down_show").hide();
      });
}
function leftMenuDown(obj){
	var _obj = $(obj);
	var _box = _obj.parent().children(".list_list");
	if(_obj.hasClass("sel")){
		_obj.removeClass("sel");
		_box.slideUp(200);
		}else{
			_obj.addClass("sel");
			_box.slideDown(200);
	}
	
}


//图片居中
// function imgLoads(imgclass){
// 	var t_img; 
// 	var isLoad = true; 	 
// 	isImgLoad(function(){
// 	    var _obj = $("."+imgclass);
// 			_obj.each(function() {
// 				var _this = $(this),
// 					_parent = _this.parent();
// 					_pw = _parent.width(),
// 					_ph = _parent.height(),
// 					_cw = _this.width(),
// 					_ch = _this.height(),
// 					_pflag = _pw/_ph,
// 					_cflag = _cw/_ch;
// 				if(_pflag != _cflag){
// 					if(_pflag<_cflag){
// 						_ch = parseInt(_pw/_cflag);
// 						_this.css({"width":_pw,"top":(_ph-_ch)/2})
// 					}else{
// 						_cw = _ph*_cflag;
// 						_this.css({"left":(_pw-_cw)/2,"height":"100%","width":_cw})
// 					}
// 				}

// 			});	
// 	});	 


// 	function isImgLoad(callback){
// 	    $('.'+imgclass).each(function(){
// 	        if(this.height === 0){
// 	            isLoad = false;
// 	            return false;
// 	        }
// 	    });
// 	    if(isLoad){
// 	        clearTimeout(t_img);
// 	        callback();
// 	    }else{
// 	        isLoad = true;
// 	        t_img = setTimeout(function(){
// 	            isImgLoad(callback);
// 	        },500); 
// 	    }
// 	}
// }
function navAlign(){
	var row = 0;
	//触发点
	var li = $(".industry_info .title .side_mid ul li");
	//ul的offsetLeft
	var ulOffsetLeft = $(".industry_info .title .side_mid ul").offset().left;
	//li的个数
	var liLength = li.length;
	//li的行数
	var rowsNum = Math.ceil(liLength/11);
	li.mouseenter(function(e){
		var ev = e||window.event;
		ev.cancelable = true;
		ev.stopPropagation();
		//建数组
		var a = [];
		//a的宽度,li高度
		var aWidth = $(this).find(".a1").width();
		var liHeight = $(this).height();
		var nav = $(this).find("nav");
		//console.log(aWidth)
		//设a的宽度,li高度
		//$(this).find(".a1").width(aWidth);
		$(this).height(40);
		$(this).width(90);
		var _index = $(this).index();
		//console.log(rowsNum)
		//console.log((rowsNum-1)*11)
		if(_index>=(rowsNum-1)*11){li.eq(liLength-1).css({"height":nav.height()+50+"px"})}
		else{li.eq(Math.ceil((_index+1)/11)*11-1).css({"height":nav.height()+50+"px"});}
		//li的offset().left
		var liOffsetLeft = $(this).offset().left;
		//offset差值
		var minus = liOffsetLeft - ulOffsetLeft;
		//对应下拉层
		var nav = $(this).find("nav");
		//设置偏移量
		nav.css({"margin-left":-minus});
		})
	li.mouseleave(function(){
		li.each(function(i,d){
			$(d).css({"height":"40px"});
		})
	})
}
$(function(){
	$(window).resize(navAlign);
});