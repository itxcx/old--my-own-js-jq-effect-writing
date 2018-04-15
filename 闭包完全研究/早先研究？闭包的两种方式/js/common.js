//多功能树
function multi_function_tree(){
    //tree
    var tree = $(".container .left .tree");
    //第一步获取ajax数据，保存下来
    //楼层部门数据
    function getFloorDepartData(callback) {
        $.ajax({
            url: 'json/findFloorTree.jsp',
            data: null,
            dataType: 'json',
            type: 'post',
            error: function () {
                console.log("ajax调用失败")
            },
            success: function (res) {
                callback(res);
                tree.text(JSON.stringify(res));
            }
        });
    };
    //闭包获取回调函数的值到别的函数中
    getFloorDepartData(function(res){
        console.log(res)
        return(res);
    });

    //console.log(getFloorDepartData());
    //部门数据
    function getDepartData(){
        $.ajax({
            url:'json/findDepartTree.jsp',
            data:null,
            dataType:'json',
            type:'post',
            error:function(){console.log("ajax调用失败")},
            success:function(res){
                //console.log(res);
                var result = tree.text(JSON.stringify(res));
                return result;
            }
        });
    }
    //闭包方式一
    //select时把getFloorDepartData函数作为参数传进去，形成闭包，接着进行回调函数
    //闭包方式二
    //把getDepartData得到的值，用return返回回来，调用函数名，得到结果
    //select事件
    function select(callback){
        var select = $(".select");
        select.change(function(){
            //方法一
            callback();
            //方法二
            getDepartData();
        })
    };
    select(getFloorDepartData)
}
//作用域试验
function scope(){
    var num=1;
    function a(callback) {
        num=2;
        function c(callback){
            num=4;
            //b的位置实施，b获取到想要的c函数里的值
            callback();
        };
        // function b(){
        //    console.log(num);
        // };
        //而二。再把b作为参数传到c里去
        c(callback);
    };
    function b(){
        console.log(num);
    };
    //一。把b作为参数传到a里去
    a(b);
}
