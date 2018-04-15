//调用部分
$(function(){
	start();
})
//定义部分
//login
var login=false;
function start(){
	//jq命名空间
	//console.log($.fn);	
	//jq版本
	//console.log($.fn.jquery);	
	var btn = $('.start');
	var layer = $('.layer');
	var dot = $('.dot');
	btn.click(inner);
	$(document).keydown(function(e){
		var e=e||window.event;
		if(e.keyCode==13&&login==false){
			inner();
			login=true;
		}
	});
	function inner(){
		btn.add(layer).hide();
		dot.show();
		//上下左右键
		direction();
	}
}
function direction(){
	$(document).keydown(function(e){
		var e=e||window.event;
		var dot = $('.dot');
		//console.log(e.keyCode);
		//左
		if(e.keyCode==37){
			left(dot);
		}
		//上
		if(e.keyCode==38){
			up(dot);
		}
		//右		
		if(e.keyCode==39){
			right(dot);
		}
		//下
		if(e.keyCode==40){
			down(dot);
		}		
	})
}
//坐标x,y
var x=0,y=0;
function left(dom){	
	x=x-20;	
	dom.css('transform','translate('+x+'px,'+y+'px)');
}
function up(dom){		
	y=y-20;
	dom.css('transform','translate('+x+'px,'+y+'px)');
}
function right(dom){	
	x=x+20;	
	dom.css('transform','translate('+x+'px,'+y+'px)');
}
function down(dom){		
	y=y+20;
	dom.css('transform','translate('+x+'px,'+y+'px)');
}