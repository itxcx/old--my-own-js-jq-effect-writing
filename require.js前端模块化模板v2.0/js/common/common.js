//define定义模块 只有define过才能在别的文件require加载,否则别的文件得用require.config的shim参数配置比较麻烦
//define优点 define(function(){...})同(function(){...})() 块作用域防止污染全局变量
//define第一个参数是依赖的模块 没有可以空着 所谓依赖还得再研究
define(['jquery'],function ($) {
    $(function(){
        //common.js 调用部分
        //不带参的公共函数才能放这里 注意 每个页面都会调
        common1();
    });
    //在下面定义我们的公共函数
    //不带参的公共函数
    function common1(){
        alert('我是每个页面都一样的函数，不需传参才能这样搞注意')
    }
    //带参的公共函数
    function ajax(){
        alert('我是公共ajax函数')
    }
    function bootstrapTabel(){
        alert('我是公共bootstrapTabel函数')
    }
    function layer(){
        alert('我是公共layer函数')
    }
    function zTree(){
        alert('我是公共zTree函数')
    }
    //把带参的方法返回出去,以便别的地方能调用
    //好像除了return还有别的暴露出去的方法 如exports？待研究
    return {
        ajax:ajax,
        bootstrapTabel:bootstrapTabel,
        layer:layer,
        zTree:zTree
    };
});