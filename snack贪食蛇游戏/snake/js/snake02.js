//调用部分
$(function(){
	//全局变量
	globalV();	
})
//全局变量
var logic,x,y,btn,layer,dot,dotWidth,dotHeight,con,conWidth,conHeight,speed,randomDot,count,countN=0,funny,directionN,bgm,timer0,timer1,timer2,timer3,timerT=150,coor,direF0,direF1,direF2,direF3;
function globalV(){
	//login
	login=false;
	//坐标x,y
	coor=[{x:0,y:0}],	
	x = coor[0].x;
	y = coor[0].y;
	//渲染初始点
	//容器	
	con=$('.wrap');
	con.append("<div class='dot'></div>");	
	btn = $('.start');
	layer = $('.layer');
	dot = $('.dot');	
	dotWidth = dot.width();
	dotHeight = dot.height();	
	//容器宽高
	conWidth = con.width();
	conHeight = con.height();
	speed = 20;
	randomDot = $('.randomDot');
	count = $('.count');
	funny = $('.funny');
	bgm = $('.bgm');	
	//速度调节
	adjustS();
	//开始
	start(speed);
}
//定义部分
//速度调节
function adjustS(){
	var btn = $('.adjustSpeed .btn');
	var v = $('.adjustSpeed .v');
	btn.click(function(){		
		timerT = parseInt(v.val());		
	})
}
function start(s){	
	//jq命名空间
	//console.log($.fn);	
	//jq版本
	//console.log($.fn.jquery);	
	btn.click(function(){
		inner(s);
	});
	$(document).keydown(function(e){
		var e=e||window.event;
		if(e.keyCode==13&&login==false){
			inner(s);
			login=true;
		}
	});
	function inner(s){		
		//音频播放
		//bgm[0].play();
		btn.add(layer).hide();
		dot.show();
		//上下左右键
		direction(s);
		//随机生成点
		randomDotF();
	}
}
function direction(s){
	$(document).keydown(function(e){
		var e=e||window.event;		
		//console.log(e.keyCode);		
		//左
		if(e.keyCode==37){						
			clearInterval(timer1);
			clearInterval(timer2);
			clearInterval(timer3);
			direF1=false;
			direF2=false;
			direF3=false;
			if(direF0!=true){
				direF0=true;
				timer0 = setInterval(function(){
													
					x=x-s;
					cssXY();				
				},timerT);	
			}			
			directionN=0;
		}
		//上
		if(e.keyCode==38){
			clearInterval(timer0);
			clearInterval(timer2);
			clearInterval(timer3);
			direF0=false;					
			direF2=false;
			direF3=false;
			if(direF1!=true){
				direF1=true;
				timer1 = setInterval(function(){
														
					y=y-s;
					cssXY();				
				},timerT);	
			}						
			directionN=1;
		}
		//右		
		if(e.keyCode==39){
			clearInterval(timer0);
			clearInterval(timer1);
			clearInterval(timer3);
			direF0=false;
			direF1=false;					
			direF3=false;
			if(direF2!=true){				
				direF2=true;
				timer2 = setInterval(function(){
					
									
					x=x+s;					
					cssXY();				
				},timerT);	
			}						
			directionN=2;
		}
		//下
		if(e.keyCode==40){
			clearInterval(timer0);
			clearInterval(timer1);
			clearInterval(timer2);
			direF0=false;
			direF1=false;
			direF2=false;
			if(direF3!=true){
				direF3=true;					
				timer3 = setInterval(function(){					
					
					y=y+s;
					cssXY();				
				},timerT);	
			}						
			directionN=3;
		}	
		//边界判定
		function cssXY(){
			x<0?x=0:x;
			x>conWidth-dotWidth?x=conWidth-dotWidth:x;
			y<0?y=0:y;
			y>conHeight-dotHeight?y=conHeight-dotHeight:y;
			// console.log(x+'px');
			dot.css('transform','translate('+x+'px,'+y+'px)');			
					//人物碰撞
			randomDot = $('.randomDot');
			var foodX = parseInt(randomDot.css('left'));
			var foodY = parseInt(randomDot.css('top'));
			if(x==foodX&&y==foodY){
				randomDot.hide();
				//身体变长
				//根据direction方向，在不同方位长身体
				//渲染身体
				//先算出坐标---------------
				console.log(directionN);
				countN++;
				count.text('老婆已吃草莓'+countN+'颗');
				if(countN==3){
					funny.text('嗯！草莓好吃！');
				}			
				var fx = parseInt(Math.random()*((conWidth-dotWidth)/dotWidth))*dotWidth+'px';			
				var fy = parseInt(Math.random()*((conWidth-dotWidth)/dotWidth))*dotWidth+'px';
				randomDot.css({'left':fx,'top':fy});
				randomDot.show();
			}
		}
	})
}
//随机生成点
function randomDotF(){
	randomDot.show();
}