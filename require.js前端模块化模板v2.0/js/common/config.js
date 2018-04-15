//为公共模块 配置模块路径
require.config({
    //注意:baseUrl开启后 路径是html文件上一个文件夹开始的相对路径 也就是html文件夹
    //注意:为了统一,我们用baseUrl,然后我们建html的层级必须固定。层级为html文件夹-子菜单文件夹-我们的html页面。不能在子菜单文件夹中再加子菜单文件夹，否则那个页面得自己写个require.config
    baseUrl:'../../js',
    //注意:未设置baseUrl时,paths的路径是相对于js文件的相对路径 也就是如home.js开始
    paths:{
        //模块路径必须省略.js
        //common 我们的common.js公共模块
        'common':['common/common'],
        //可配置多个路径 如网上jq加载失败就用本地的
        //jq
        'jquery':['http://libs.baidu.com/jquery/2.0.3/jquery','common/jquery.min']
        //echarts

        //layui

        //bootstrap table...等等

    }
    //用require.config 的shim属性配置不兼容的模块
// 格式  shim:{
//     '模块变量名':{
//         exports:'代表模块的参数',
//         deps:['依赖的模块变量名',''](可选)
//     }
// }
//require.js插件 1.domready插件，可以让回调函数在页面DOM结构加载完成后再运行
});