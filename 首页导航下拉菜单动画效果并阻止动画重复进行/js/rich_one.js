
//////////////////////////////////////////////////click free
function one_out(obj,obj_show){
	var ang = rich('.'+obj)[0];
	var ang_img = rich('.'+obj_show)[0];
	var onOff = true;
		ang.onclick = function()
		{
			if(onOff)
			{
				ang_img.style.display = 'block';		
			}else{
				ang_img.style.display = 'none';
			}
			onOff=!onOff;
		};
};
/////////////////////////////////////////////
/////////////////////////////////////////////sub_nav   javascript
//function sub_nav(){
//	var nav_box = rich('.header .li02')[0];
//	var nav = rich('.nav a');
//	var sub = rich('.sub_nav')[0];
//	var sub_nav =rich('.sub_nav dd');
//	//////////经过上端时候 sub——nav出现 并且 里面的子元素 背景变换
//	for(var i=1;i<nav.length;i++){
//		nav[i].index = i;
//		nav[i].onmouseover = function(){
//			sub.style.display = 'block';
//			this.className = 'blue';
//			sub_nav[this.index-1].className = 'blue';
//			nav_box.style.background ='#459df5';
//			for(var i=0;i<nav.length;i++){
//				nav[i].style.color = 'white';
//			};
//			richMove(sub,{
//				opacity:100
//			},20)
//		};
//		///////////清除所有
//		nav[i].onmouseout = function(){
//			for(var i=0;i<nav.length;i++){
//				nav[i].className ='';
//				nav_box.style.color ='';
//			};
//			for(var i=0;i<sub_nav.length;i++){
//				sub_nav[i].className ='';
//			};
//		};
//	};
//	////////////////////sub_nav背景变动 以及 影响上方背景
//	for(var j=0;j<sub_nav.length;j++){
//		sub_nav[j].index = j;
//		sub_nav[j].onmouseover = function(){
//			for(var j=0;j<sub_nav.length;j++){
//				sub_nav[j].className ='';
//			};
//			for(var k=0;k<nav.length;k++){
//				nav[k].className ='';
//			};
//			this.className ='blue';
//			nav[this.index+1].className ='blue';
//		};
//	};
//	///////////////////离开父级时候  sub——nav消失
//	nav_box.onmouseleave = function(){
//			richMove(sub,{
//				opacity:0
//			},20);
//		sub.style.display = 'none';
//		nav_box.style.background ='';
//		for(var i=0;i<nav.length;i++){
//				nav[i].style.color = '';
//				nav[i].className = '';
//			};
//	};
//};
//首页下拉菜单动画效果
function sub_nav1(){
	var a = $(".header .li02 .nav .nav_li");
	var menu = $(".header .li02 .nav .nav_li menu");
	a.mouseenter(function(){
		if($(this).children("menu").is(":animated")){return false}
		else{$(this).children("menu").slideDown(200);}
	});
	a.mouseleave(function(){
		$(this).children("menu").slideUp(200);
	});
}
$(function(){
	sub_nav1();
})
///////////////////////////////////////
/////////////////////////////////////切换
function changes(obj,obj_show,sty){
	var ang = rich(obj);
	var ang_img = rich(obj_show);
	ang_img[0].style.display = 'block';
	ang[0].className = sty;
	for(var i=0;i<ang.length;i++){
		ang[i].index = i;
		ang[i].onmouseover = function(){
			for(var i=0;i<ang.length;i++){
				ang_img[i].style.display = 'none';
				ang[i].className = '';
			};
			this.className = sty;
			ang_img[this.index].style.display = 'block';
		};
	};
};

function changes_j(obj,obj_show,sty){
	var ang = rich(obj);
	var ang_img = rich(obj_show);
	ang_img[0].style.display = 'block';
	ang[0].className = sty;
	for(var i=0;i<ang.length;i++){
		ang[i].index = i;
		ang[i].onmouseover = function(){
			for(var i=0;i<ang.length;i++){
				ang_img[i].style.display = 'none';
				ang[i].className = '';
			};
			var name = this.id;
			$.ajax({
				type: "POST",
				url: "/Index-sgdw_j",
				data: {name:name},
				dataType: "json",
				success: function(data){
					$('.bulit_left').html(data);
				}
			});
			this.className = sty;
			ang_img[this.index].style.display = 'block';
		};
	};
};


function changes_click(obj,obj_show,sty,eve){
	var ang = rich(obj);
	var ang_img = rich(obj_show);
	ang_img[0].style.display = 'block';
	ang[0].className = sty;
	for(var i=0;i<ang.length;i++){
		ang[i].index = i;
		ang[i][eve] = function(){
			for(var i=0;i<ang.length;i++){
				//ang_img[i].style.display = 'none';
				ang[i].className = '';
			};
			this.className = sty;
			ang_img[this.index].style.display = 'block';
		};
	};
};
//////////////////////////////////////////////////
/////////////////////////////////////复数切换
function changest(obj,obj_show,sty,obj_showtwo,eve){
	var ang = rich(obj);
	var ang_img = rich(obj_show);
	var ang_p = rich(obj_showtwo);
	ang_img[0].style.display = 'block';
	ang_p[0].style.display = 'block';
	ang[0].className = sty;
	for(var i=0;i<ang.length;i++){
		ang[i].index = i;
		ang[i][eve] = function(){
			for(var i=0;i<ang.length;i++){
				ang_img[i].style.display = 'none';
				ang_p[i].style.display = 'none';
				ang[i].className = '';
			};
			this.className = sty;
			ang_img[this.index].style.display = 'block';
			ang_p[this.index].style.display = 'block';
		};
	};
};
//////////////////////////////////////////////////
function garden(obj){
	var gar = rich('.'+obj);
	
	for(var i=0;i<gar.length;i++){
		gar_chang(gar[i]);	
	};
	function gar_chang(gr_obj){
		var btn = gr_obj.getElementsByTagName('span');
		var gar_show = gr_obj.getElementsByTagName('a')[0];
		var gar_img = gar_show.getElementsByTagName('img');
		//console.log(gar_img)
		gar_img[0].style.display = 'block';
		for(var i=0;i<btn.length;i++){
			btn[i].index = i;
			btn[i].onmouseover = function(){
				for(var i=0;i<btn.length;i++){
					gar_img[i].style.display = 'none';
				};
				gar_img[this.index].style.display = 'block';
			};
		};
	};
};
////////////////////////////////////////////////////我一种焦点图封装
function rich_banner01(obj,obj_btn,obj_text,sty){
	var oBox = rich(obj)[0];
	var oText = rich(obj_text);
	var oBtn = rich(obj_btn);
	var oLen = oBtn.length;
	var timer =null;
	var num = 0;
	//初始化
	oText[0].style.display = 'block';
	oBtn[0].className = sty;
	//全部消失
	function all_out(){
		for(var i=0;i<oText.length;i++){
			oText[i].style.display = 'none';
			oBtn[i].className = '';
		};
	};
	//鼠标经过开始
	for(var i=0;i<oBtn.length;i++){
		oBtn[i].index = i;
		oBtn[i].onmouseover = function(){
			richMove(oBox,{left:-this.index*700},10)
			all_out();
			oText[this.index].style.display = 'block';
			oBtn[this.index].className = sty;
		};
	};
	//移入停止 移开自动
	oBox.parentNode.onmouseover = function(){
		clearInterval(timer);
	};
	oBox.parentNode.onmouseout = function(){
		auto_go();
	};
	//自动滑动
	auto_go();
	function auto_go(){	
		timer = setInterval(function(){
			num++;
			num = num%oLen;
			richMove(oBox,{left:-num*700},10)
			all_out();
			oText[num].style.display = 'block';
			oBtn[num].className = sty;
		},4000);
	};
};	
//////////////////////////////////////////////
//////////////////////////////////////////左侧nav  点击变换
function click_change(obj,sty){		
	var aNew = rich(obj);
	aNew[0].className=sty;
	for(var i=0;i<aNew.length;i++){
		aNew[i].onclick = function(){
			for(var i=0;i<aNew.length;i++){
				aNew[i].className='';
			};
			this.className = sty;
		};
	};
};
//////////////////////////////////////////////
///////////////////////////////////////////弹性导航
function elas_nav(){
	var oGo = rich('.rent_nav nav span')[0];
	var oText = rich('.rent_nav nav a');
	var iSpeed = 0;
	var timer = null;
	//console.log(oText)
	//初始化
	oText[0].style.color ='#fff';
	for(var i=0;i<oText.length;i++){
		oText[i].index = i;
		oText[i].onclick = function(){
			for(var i=0;i<oText.length;i++){
				oText[i].style.color = '';
			};
			this.style.color = 'white';
				var aim = 220*this.index;
				rich_elas(oGo,"left",aim)
		};
	};	
	//弹性简易封装
	function rich_elas(obj,sty,aim){
		clearInterval(timer)
		timer = setInterval(function(){
			var loc = parseInt(richStyle(obj,sty));
			//console.log(loc)
			//速度计算
			iSpeed += (aim-loc)/7;
			iSpeed *=0.75;
			//位置调整
			if(Math.abs(iSpeed<=1) && Math.abs(aim-loc)<=1){
				iSpeed=0;
				loc =aim;
				obj.style[sty]= loc + iSpeed + 'px';
				clearInterval(timer)
			}else{
				obj.style[sty] = loc + iSpeed + 'px';
			};	
		},30);
	};
};
//////////////////////////////////////////////
////////////////////////////////////////////// 筛选 收起弹下
function sift(){
	var oBox = rich('.factory_rent_sell dd')[0];
	var oBtn = rich('.factory_rent_sell dt .btn')[0];
	var oBtn_img = rich('.factory_rent_sell dt .btn img');
	var oBtn_text = rich('.factory_rent_sell dt .btn label')[0];
	//console.log(oBtn_text)
	var onOff = true;
	//初始化
	oBtn_text.innerHTML = '收起';
	oBtn_img[1].style.display = 'block';
	oBtn.onclick = function(){
		if(onOff){
			richMove(oBox,{height:24},10);
			oBtn_img[0].style.display = 'block';
			oBtn_img[1].style.display = 'none';
			oBtn_text.innerHTML = '展开';
		}else{
			richMove(oBox,{height:328},10);
			oBtn_img[0].style.display = 'none';
			oBtn_img[1].style.display = 'block';
			oBtn_text.innerHTML = '收起';
		};
		onOff =!onOff;
	};
	
};

////////////////////////////////////////////// 
////////////////////////////////////////////// 施工单位弹窗
function win_show(){
	var oUt = rich('.win_out')[0];
	oUt.style.display = 'block';
};
function win_hide(){
	var oUt = rich('.win_out')[0];
	oUt.style.display = 'none';
};
//////////////////////////////////////////////图片变换
function img_change(){
	var oBox = rich('.fml_detal01_scrooll')[0];
	var oLeft =rich('.fml_detal01_center dt section .left')[0];
	var oRight =rich('.fml_detal01_center dt section .right')[0];
	var oImg = rich('.fml_detal01_center dt .img img')[0];
	var angle = rich('.fml_detal01_scrooll div span');
	var aDiv = oBox.children;
	var num=0;
	//初始化
	aDiv[0].style.marginLeft = '0px';
	aDiv[0].className = 'bor';
	oImg.src = aDiv[0].children[0].src;
	angle[0].style.display = 'block';
	//计算盒子长度
	oBox.style.width = aDiv.length*70 +'px';
	//左右键移动
	oRight.onclick = function(){
			num++;
			if(num>aDiv.length-4){
				num=aDiv.length-4;
			};
			var le = -num*68;
			richMove(oBox,{left:le},10)
		};
	oLeft.onclick = function(){
		num--;
		if(num<0){
			num=0;
		};
		var le01= -num*68;
		richMove(oBox,{left:le01},10)
	};
	//点击切换图片
	for(var i=0;i<aDiv.length;i++){
		aDiv[i].onclick = function(){
			for(var i=0;i<aDiv.length;i++){
				aDiv[i].className = '';
				angle[i].style.display = 'none';
			};
			this.className = 'bor';		
			oImg.src = this.children[0].src;
			this.children[1].style.display = "block";
		};
		
	};
};
//////////////////////////////////////////////
//首页厂房租售 li03切换效果
function li03showHide(){
	var a = $("#box04 .hire_title .li01 a");
	var con = $(".content .index_box04 .li03");
	a.mouseenter(function(){
		var _index = $(this).index();
		con.eq(_index).addClass("on").siblings(".li03").removeClass("on");
	})
}
//////////////////////////////////////////////
////////////////////////////////////////////// index 左侧悬浮窗
function win_guide(){
	var oGui = rich('.win_guide')[0];
	var aDd = oGui.children;
	var aSpan = oGui.getElementsByTagName('span');
	//初始化
	var saw =(document.documentElement.clientWidth-1200)/2;
	var wi = parseInt(richStyle(oGui,'width'));
	oGui.style.left = (saw - wi -20)+"px";
	//判断出现位置 出现
	//var posit01 = richPos(rich('.index_box01 .li02')[0]).top-600;

	var posit02 = richPos(rich('.index_box02')[0]).top-600;
	var posit03 = richPos(rich('.index_box02')[1]).top-600;
	var posit04 = richPos(rich('.index_box04')[0]).top-600;
	var posit05 = richPos(rich('.index_box04')[1]).top-600;
	var posit06 = richPos(rich('.index_box05')[0]).top-600;
	var posit09 = richPos(rich('.index_box05')[0]).top;
	//滚轮跳动
	window.onscroll = function(){
		var scro = document.documentElement.scrollTop || document.body.scrollTop;
		//console.log(scro)
		if(scro>posit02 && saw>wi && scro<posit09){
			oGui.style.display = 'block';
		}else{
			oGui.style.display = 'none';
		};

		if(scro>=posit02 &&scro<posit03 ){
			all_hide();
			aDd[0].className = 'yell';
			aSpan[0].style.display = 'block';
		}else if(scro>=posit03 && scro<posit04){
			all_hide();
			aDd[1].className = 'yell';
			aSpan[1].style.display = 'block';
		}else if(scro>=posit04 && scro<posit05){
			all_hide();
			aDd[2].className = 'yell';
			aSpan[2].style.display = 'block';
		}else if(scro>=posit05 && scro<posit06){
			all_hide();
			aDd[3].className = 'yell';
			aSpan[3].style.display = 'block';
		}else if(scro>=posit06 && scro<posit09){
			all_hide();
			aDd[4].className = 'yell';
			aSpan[4].style.display = 'block';
		}
//		//点击滑动页面
//		aDd[0].onclick = function(){
//			scro=posit01;
//			console.log(scro)
//		};
	};
	function all_hide(){
		for(var i=0;i<aSpan.length;i++){
			aSpan[i].style.display = 'none';
			aDd[i].className ='';
		};
	};
		
};


//////////////////////////////////////////////
function click_scroll(){
	//var posit01 = richPos(rich('.index_box01 .li02')[0]).top-600;
	//var posit02 = richPos(rich('.index_box02')[0]).top-600;
	//var posit03 = richPos(rich('.index_box02')[1]).top-600;
	//var posit04 = richPos(rich('.index_box04')[0]).top-600;
	//var posit05 = richPos(rich('.index_box05')[0]).top-600;
	//var posit09 = richPos(rich('.index_box05')[0]).top;
	var posit02 = richPos(rich('.index_box02')[0]).top-600;
	var posit03 = richPos(rich('.index_box02')[1]).top-600;
	var posit04 = richPos(rich('.index_box04')[0]).top-600;
	var posit05 = richPos(rich('.index_box04')[1]).top-600;
	var posit06 = richPos(rich('.index_box05')[0]).top-600;
	var posit09 = richPos(rich('.index_box05')[0]).top;
	$('.win_guide dd').eq(0).click(function(){
			$("html, body").animate({
				"scroll-top":posit02+10
			},1000);
		});
	$('.win_guide dd').eq(1).click(function(){
			$("html, body").animate({
				"scroll-top":posit03
			},1000);
		});
	$('.win_guide dd').eq(2).click(function(){
			$("html, body").animate({
				"scroll-top":posit04
			},1000);
		});
	$('.win_guide dd').eq(3).click(function(){
			$("html, body").animate({
				"scroll-top":posit05
			},1000);
		});
	$('.win_guide dd').eq(4).click(function(){
			$("html, body").animate({
				"scroll-top":posit06
			},1000);
		});	
};

//////////////////////////////////////////////
//////////////////////////////////////////////个人中心
function nav_down(){
	var oBtn = rich('#account_information');
	var aImg = oBtn.getElementsByTagName('img');
	var onOff = true;
	oBtn.onclick = function(){
		if(onOff){
			richMove(oBtn,{height:240},4)
			aImg[0].style.display = 'none';
			aImg[1].style.display = 'block';
		}else{
			richMove(oBtn,{height:40},4)
			aImg[1].style.display = 'none';
			aImg[0].style.display = 'block';
		};
		onOff=!onOff;
	};
};
//////////////////////////////////////////////
function mail_down(obj_down,obj_btn,max,min){
	var oBtn = rich(obj_btn)[0];
	var oDown =rich(obj_down)[0];
//	var aImg = oBtn.getElementsByTagName('img');
	var onOff = true;
	oBtn.onclick = function(){
		if(onOff){
			richMove(oDown,{height:max},4)
		}else{
			richMove(oDown,{height:min},4)
		};
		onOff=!onOff;
	};
};
//////////////////////////////////////////////
function top_move(obj){
	var oNav = rich(obj)[0];
	var my_hi = richPos(oNav).top;
	//console.log(my_hi);
	window.onscroll = function(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollTop>my_hi){
			oNav.style.position = 'fixed';
			oNav.style.left = '0px';
			oNav.style.top = '0px';
		}else{
			oNav.style.position = 'relative';
			oNav.style.left = '0px';
			oNav.style.top = '0px';
		};
	};
};

//////////////////////////////////////////////
function top_move02(obj){
	var oNav = rich(obj)[0];
	var my_hi = richPos(oNav).top;
	//console.log(my_hi);
	window.onscroll = function(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollTop>my_hi){
			oNav.style.position = 'fixed';
			oNav.style.left = '0px';
			oNav.style.top = '0px';
			oNav.style.width="100%";
			oNav.style.zIndex=999999;
		}else{
			oNav.style.position = 'relative';
			oNav.style.left = '0px';
			oNav.style.top = '0px';
			oNav.style.width="924px";
		};
	};
};












































































































































































