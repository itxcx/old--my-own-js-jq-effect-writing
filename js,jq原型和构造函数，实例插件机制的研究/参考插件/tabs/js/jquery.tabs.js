/* =================================================
// jQuery Tabs Plugins 1.0
// author:chenyg@5173.com
// URL:http://stylechen.com/jquery-tabs.html
// 4th Dec 2010
// =================================================*/

//$.fn==$.prototype  返回jquery实例（对象）所有继承来的属性数组
//$.constructor  返回的是创建jquery实例的构造函数
//jq中extend  将后一个对象覆盖前一个对象的属性
//jQuery.extend(object);为扩展jQuery类本身.为类添加新的方法 添加静态方法。 之前没有调用的实例  本身就是一个函数，可以直接调用
//比如$.extend({
//           add:function(a,b){returna+b;}
//           }); 调用时只需$.add   $.add(3,4); //return 7
//jQuery.fn.extend(object);给jQuery对象添加方法 添加实例方法。 所有jq实例可以调用
//比如+
// $.fn.extend({
// alertWhileClick:function(){
//     $(this).click(function(){
//         alert($(this).val());
//     });
// }
// });
//------------------------
// (1). jQuery.extend(object);
// 它是为jQuery类添加类方法，可以理解为添加静态方法。如：
// a.jQuery.extend({
//     min: function(a, b) { return a < b ? a : b; },
//     max: function(a, b) { return a > b ? a : b; }
// });
// jQuery.min(2,3); //  2
// jQuery.max(4,5); //  5
// b. jQuery.extend(target, object1, [objectN])用一个或多个其他对象来扩展一个对象，返回被扩展的对象。
// var settings = { validate: false, limit: 5, name: "foo" };
// var options = { validate: true, name: "bar" };
// jQuery.extend(settings, options);
// 结果：settings == { validate: true, limit: 5, name: "bar" }
//-----------------------------------
// (2). jQuery.fn.extend(object);
// $.fn是什么?
//     $.fn是指jQuery的命名空间，fn上的成员(方法function及属性property)，会对jQuery实例每一个有效。
// 查看jQuery代码，就不难发现。
// jQuery.fn = jQuery.prototype = {
//     init: function( selector, context ) {//....　
//     };
// 原来 jQuery.fn = jQuery.prototype.
//     所以，它是对jQuery.prototype进得扩展，就是为jQuery类添加“成员函数”。jQuery类的实例可以使用这个“成员函数”。
// 比如我们要开发一个插件，做一个特殊的编辑框，当它被点击时，便alert 当前编辑框里的内容。可以这么做：
// $.fn.extend({
//     doAlertWhileClick:function() {
//         $(this).click(function(){
//             alert($(this).val());
//         });
//     }
// });
// $("#input1").doAlertWhileClick(); // 页面上为：
// $("#input1")　为一个jQuery实例，当它调用成员方法 doAlertWhileClick后，便实现了扩展，每次被点击时它会先弹出目前编辑里的内容。
//--------------------------
// function A(){
//
// }
// A.staticMethof = function(){
//     alert('静态方法');
// }
// A.prototype.instaceMethod = function(){
//     alert('实例方法');
// }
// A.staticMethof(); //类A直接调用
// var instace = new A();
// instace.instaceMethod();//A的实例对象instace调用
//---------------------------------
// extend，这个函数的功能基本都是实现对象的拷贝功能，即将一个对象的所有属属性拷贝到另外一个对象上去，开发插件时经常用到。
// 看代码：
// jQuery.extend(object)
// 为jQuery类添加方法，即添加静态方法：
// jQuery.extend({
//     min: function(a, b) { return a < b ? a : b; },
//     max: function(a, b) { return a > b ? a : b; }
// });
// jQuery.min(2,3); //  2
// jQuery.max(4,5); //  5
//--------------------------------
// 你可以拓展一个对象到jQuery的prototype中去，这样的话就是插件机制了。
// (function( $ ){
//     $.fn.tooltip = function( options ) {
//     };
//     //等价于
//     var tooltip = {
//         function(options){
//         }
//     };
//     $.fn.extend(tooltip) = $.prototype.extend(tooltip) = $.fn.tooltip
// })( jQuery );
//--------------------------------
//$.extend,JQ扩展，添加JQ的静态方法，与具体JQ对象无关
//对象合并
// var person = { name: "zzl" };
// $.extend(person, { sex: "male" });
// alert(person.name + person.sex);
// //合并到JQ合局变量中
// $.extend({
//     hello: function () { alert('hello'); }
// });
// $.hello();
// $.extend({ net: {} }); //jq下的net命名空间
// $.extend($.net, {
//     nethello: function () { alert('hello'); }
// })
// $.net.nethello();
// var result = $.extend(true, {}, {//true表示深度拷贝，表示子对象location也会被合并
//     name: "zzl", info: { address: "beijing", work: "developer" }
// }, {
//     last: "zhanling", info: { work: "software developer", county: "China" }
// });
// 下在是实例扩展方法的例子、
// //$.fn.extend，添加JQ实例对象的方法扩展，$("#A1")它代表一个JQ对象
// $.fn.extend({ GetHtml: function () { alert($(this).html()); } });
// $("#a1").GetHtml();
//------------------------------
// 2.2 extend({},item1,item2,……)
// 用这个方法，可以将所得的结果全部合并在{}中，并返回，而且还不会破坏原有的项的结构。
// 示例：
// Var item={name:”olive”,age:23};
// Var item1={name:”Momo”,sex:”gril”};
// Var result=$.extend({},item,item1);
// 结果：
// Result={name:”Momo”,age:23,sex:”gril”};
//--------------------------
// Extend方法还有带bool型参数的重载。
// bool型参数为true表示深拷贝，为false时表示浅拷贝。具体可以通过一下示例来说明：
// 示例：
// var item={name：“olive”,age:23,address{provice:”河南”,city:”郑州”}};
// var item1={sex:”girl”,address{city:”北京”}};
// var result=$.extend(true,item,item1);
// var result1=$.extend(false,item,item1);
// 结果：
// Result={name：“olive”,age:23,sex:”gril”,address:{provice:”河南”,city:”北京”}};
// Result1={name：“olive”,age:23,sex:”gril”,address:{ city:”北京”}};
//-----------------------
//自己写几个$.extend和$.fn.extend小例子
//参照理解这个插件的写法
//自己写一些复杂的extend函数
;(function($){
	$.fn.extend({
		Tabs:function(options){
			// 处理参数
			options = $.extend({
				event : 'mouseover',
				timeout : 0,
				auto : 0,
				callback : null
			}, options);
			var self = $(this),
				tabBox = self.children( 'div.tab_box' ).children( 'div' ),
				menu = self.children( 'ul.tab_menu' ),
				items = menu.find( 'li' ),
				timer;
			var tabHandle = function( elem ){
					elem.siblings( 'li' )
						.removeClass( 'current' )
						.end()
						.addClass( 'current' );
						
					tabBox.siblings( 'div' )
						  .addClass( 'hide' )
						  .end()
						  .eq( elem.index() )
						  .removeClass( 'hide' );
				},
				delay = function( elem, time ){
					time ? setTimeout(function(){ tabHandle( elem ); }, time) : tabHandle( elem );
				},
				
				start = function(){
					if( !options.auto ) return;
					timer = setInterval( autoRun, options.auto );
				},
				
				autoRun = function(){
					var current = menu.find( 'li.current' ),
						firstItem = items.eq(0),
						len = items.length,
						index = current.index() + 1,
						item = index === len ? firstItem : current.next( 'li' ),
						i = index === len ? 0 : index;
					
					current.removeClass( 'current' );
					item.addClass( 'current' );
					
					tabBox.siblings( 'div' )
						.addClass( 'hide' )
						.end()
						.eq(i)
						.removeClass( 'hide' );
				};
							
			items.bind( options.event, function(){
				delay( $(this), options.timeout );
				if( options.callback ){
					options.callback( self );
				}
			});
			
			if( options.auto ){
				start();
				self.hover(function(){
					clearInterval( timer );
					timer = undefined;
				},function(){
					start();
				});
			}
			
			return this;
		}
	});
})(jQuery);