/**
 * Created by yinzhx on 2017-03-31.
 */


/**
 * 页面初始化
 */
var myChart = null;
$(function () {

    //默认展示经济大厦
    //$("#aside_select_list").val("0");
    //初始化按钮事件
    //initEvent();
    //页面初始化本月操作
    //$("#monthQId").click();
    //query("", "经济大厦");
    // 饼图
    //allChartData();
    //index aside treeview
    indexAjaxZtree();
    //回车搜索功能
    enterSearch();
});
// ztree参数配置
var setting = {
    //外观
    view: {
        //鼠标移动到节点上时，显示隐藏用户自定义控件
        // addHoverDom: addHoverDom,
        // removeHoverDom: removeHoverDom
        //是否显示连接线
        //showLine:true,
        //是否显示节点图标
        showIcon: true
    },
    //选择
    check: {
        //设置 zTree 的节点上是否显示 checkbox / radio
        //enable: true
    },
    //编辑
    edit: {
        //节点编辑名称 input 初次显示时,设置 txt 内容是否为全选状态
        editNameSelectAll: true
    },
    //数据
    data: {
        //简单数据模式
        simpleData: {
            //启用
            enable: true,
            idKey: "id",
            pIdKey: "pId",
            //?
            system: "system",
            rootPId: ""
        }
    },
    //回调函数
    callback: {
        //用于捕获 checkbox / radio 被勾选 或 取消勾选的事件回调函数
        onCheck: function (event, treeId, node) {
            // var childNode = node.children;
            // var search = $.trim($('#searchstr').val());  //获取筛选框的值
            // console.log(childNode);
            // console.log(search);
        },
        //点击的事件回调函数
        onClick: function (event, treeId, treeNode) {
            if (query != undefined) {
                query(treeNode.id, treeNode.name);
            }
        }
    }

};
//准备获取ajax返回值的变量
var dataObj;
//重新加载树
function InitialZtree() {
    //初始化方法，创建 zTree
    $.fn.zTree.init($("#zTreeIndex"), setting, dataObj);
}
//回车搜索功能
function enterSearch() {
    var btn = $('#searchstr');
    btn.keydown(function(e){
        var e = e||window.event;
        if(e.keyCode==13){
            mySearch(this);
        }
    })
}
//搜索功能
function mySearch(textObj) {
    // var textObj = $()
    // var textObj = $('#searchstr');
    // console.log(textObj.val());
    //如果input的字符串值的长度存在
    if (textObj.value.length > 0) {
        //重新加载树
        InitialZtree();
        //将找到的节点更新至Ztree内
        //根据 treeId 获取 zTree 对象的方法  获取id是zTreeIndex的ztree
        var zTree = $.fn.zTree.getZTreeObj("zTreeIndex");
        //根据节点数据的属性搜索，获取条件模糊匹配的节点数据 JSON 对象集合
        //一参属性名 二参属性值
        //var data = zTree.getNodesByParamFuzzy("name", textObj.value);
        var data = zTree.getNodesByParamFuzzy("name", textObj.value);
        //data返回的模糊搜索的节点数据集合
        //重新渲染
        $.fn.zTree.init($("#zTreeIndex"), setting, data);
        //showMenu();
    } else {
        //如果input的字符串值的长度不存在
        zTreeObj = $.fn.zTree.init($("#zTreeIndex"), setting, dataObj);
        var nodes = zTreeObj.getNodes();
        //设置第一个节点展开
        for (var i = 0; i < nodes.length; i++) {
            zTreeObj.expandNode(nodes[i], true, false, true);
        }
    }
}
//显示树
// function showMenu() {
//     var cityObj = $("#searchstr");
//     var cityOffset = $("#searchstr").offset();
//     $(".main_left").css({
//         left: cityOffset.left + "px",
//         top: cityOffset.top + cityObj.outerHeight() + "px"
//     }).slideDown("slow");
// }

//index aside treeview
function indexAjaxZtree() {
    // //大厦树
    // $(".a0").treeview({
    //     data:[{text:'经济大厦'}]
    // });
    // $(".aside_tree").eq(0).show();
    // //楼层ajax
    // function floorAjax(a,d,c){
    //     $.ajax({
    //         url:basePath+"/history/findTree",
    //         type:'post',
    //         data:{type:a},
    //         dataType:'json',
    //         error:function(){console.log('ajax调用失败')},
    //         success:function(res){
    //             //楼层tree
    //             $(d).treeview({
    //                 //楼层构建
    //                 data:res.data,
    //                 showCheckbox:c,
    //                 //onNodeSelected楼层选中时
    //                 onNodeSelected:function(event,data){
    //                     //选中楼层时
    //                     // if(data.dictionary.code=='floor'){
    //                     //     $.ajax({
    //                     //
    //                     //     })
    //                     // }
    //                     // //选中部门时
    //                     // else if(data.dictionary.code=='dep'){
    //                     //     $.ajax({
    //                     //
    //                     //     })
    //                     // }
    //                     // //选中子部门时
    //                     // else if(data.dictionary.code=='dc'){
    //                     //     $.ajax({
    //                     //
    //                     //     })
    //                     // }
    //                 }
    //             });
    //         }
    //     });
    // }
    // floorAjax("floor",".a1",false);
    // //部门ajax
    // floorAjax("dep",".a2",false);
    // //select
    // var select = $(".main .main_left .aside_select");
    // var data = null;
    // select.change(function(){
    //     var show = $(".upRing .words");
    //     var choose = $(".upRing .laydateBtn");
    //     data = $(this)[0].value;
    //     $(".aside_tree").eq(data).show().siblings().hide();
    //     //如果选到大厦
    //     if(data==0){
    //         $(".upRing .laydateBtn:last").addClass('ban');
    //         if(show.text()=='横向对比'){
    //             show.text(choose.eq(0).text());
    //         }
    //         upRing();
    //     }
    //     //如果选到楼层
    //     else if(data==1){
    //         $(".upRing .laydateBtn:last").addClass('ban');
    //         if(show.text()=='横向对比'){
    //             show.text(choose.eq(0).text());
    //         }
    //         upRing();
    //     }
    //     //如果选到部门
    //     else if(data==2){
    //         $(".upRing .laydateBtn:last").removeClass('ban');
    //         upRing();
    //     }
    //     //tree search功能
    //     var btn = $(".main .main_left .aside_search .btn");
    //     var input = $(".main .main_left .aside_search .text");
    //     btn.click(function(){
    //         var searchValue = input.val();
    //         $(".aside_tree").treeview('search',[searchValue,{
    //             ignoreCase: true,     // case insensitive
    //             exactMatch: false,    // like or equals
    //             revealResults: true  // reveal matching nodes
    //         }]);
    //         if(searchValue != null&&searchValue !=""){
    //             var lists = $(".treeview .list-group-item");
    //             var liResult = $(".search-result");
    //             lists.hide();
    //             liResult.show();
    //         }
    //     })
    // });

    // ztree 树
    $.ajax({
        url: basePath + "/organization/getZTree",// 请求地址
        type: "post",// 请求提交地址
        dataType: "json",// 相应数据格式，xml,json,text,html
        data: {
            // open: true
            // id: id
        },// 发送回去的数据 JSON.stringify(data)
        error:function(){console.log('ajax失败')},
        success: function (data) {
            //data赋给全局变量
            dataObj = data;
            zTreeObj = $.fn.zTree.init($("#zTreeIndex"), setting, data);
            //展开全部节点
            // zTreeObj.expandAll(true);
            //zTreeObj.getNodes 获取 zTree 的全部节点数据
            var nodes = zTreeObj.getNodes();
            //console.log(nodes[0].children)
            //zTreeObj.expandNode 展开 / 折叠 指定的节点
            //展开第一个节点
            for (var i = 0; i < nodes.length; i++) { //设置节点展开
                zTreeObj.expandNode(nodes[i], true, false, true);
                //       展开节点  展开或是折叠  是否影响孙节点 焦点进入可视区域
            }
            //模拟第一个节点执行单击事件
            zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, zTreeObj.getNodes()[0]);
        }
    });
}
/**
 * 初始化事件
 */
// var initEvent = function () {
//     //本月查询事件
//     $("#monthQId").click(function () {
//         // alert("你点击了本月按钮");
//         var organization = getOrganizationId();
//         if (!organization.status) {
//             alert(organization.msg);
//             return;
//         }
//         var beginDate = cic.util.date.getMonthStartDate();
//         var endDate = cic.util.date.getMonthEndDate();
//         //执行数据查询
//         query(organization.id, organization.name, beginDate, endDate);
//     });
//     //本周查询事件
//     $("#weekQId").click(function () {
//         // alert("你点击了本周按钮");
//         var organization = getOrganizationId();
//         if (!organization.status) {
//             alert(organization.msg);
//             return;
//         }
//         var beginDate = cic.util.date.getWeekStartDate();
//         var endDate = cic.util.date.getWeekEndDate();
//         //执行数据查询
//         query(organization.id, organization.name, beginDate, endDate);
//     });
//     //本日查询事件
//     $("#dayQId").click(function () {
//         // alert("你点击了本日按钮");
//         var currentDate = cic.util.date.formatDate(new Date());
//         var organization = getOrganizationId();
//         if (!organization.status) {
//             alert(organization.msg);
//             return;
//         }
//         var beginDate = currentDate;
//         var endDate = currentDate;
//         //执行数据查询
//         query(organization.id, organization.name, beginDate, endDate);
//     });
//     //高级查询事件
//     $("#advQId").click(function () {
//         // alert("你点击了高级查询按钮");
//         var currentDate = cic.util.date.formatDate(new Date());
//         var organization = getOrganizationId();
//         if (!organization.status) {
//             alert(organization.msg);
//             return;
//         }
//         var beginDate = $("#start").val();
//         var endDate = $("#end").val();
//         if ($.trim(beginDate) == "" || $.trim(endDate) == "") {
//             alert("请选择时间范围！");
//             return false;
//         }
//         //执行数据查询
//         query(organization.id, organization.name, beginDate, endDate);
//     });
// }

/**
 *
 * @param organizationId
 * @param beginDate
 * @param endDate
 */
var query = function (organizationId, organizationName) {
    var url = basePath + "/home/minQuery";
    var data = {
        organizationId: organizationId,
        organizationName: organizationName
    };
    $.ajax({
        url: url,
        data: data,
        type: "post",
        dataType: "json",
        success: function (data) {
            fillPageData(organizationName, data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.responseText);
        }
    });
}

/**
 * 填充页面数据
 * @param data
 */
var fillPageData = function (organizationName, data) {
    /**
     * 设置当前页面总能耗、分项能耗的值和名称
     */
    $("#sOrganizationName1").html(organizationName);
    $("#sOrganizationName2").html(organizationName);
    $("#sOrganizationName3").html(organizationName);
    $("#totalEVal").html(data.totalEnergy);
    $("#airEVal").html(data.air);
    $("#lightingEVal").html(data.lighting);
    $("#powerEVal").html(data.power);
    $("#otherEVal").html(data.other);
    $("#carbonEVal").html(data.carbon);
    /**
     * 设置当前页面单元数据
     */
    $("#homeCellHtml").html("");
    if (data.cellItems != null && data.cellItems.length > 0) {
        for (var i = 0; i < data.cellItems.length; i++) {
            var cell = data.cellItems[i];
            var childHtml = createCellHtml(cell);
            $("#homeCellHtml").append(childHtml);
            allChartData(cell);
        }
    }
}

/**
 * 创建单元格HTML
 */
var createCellHtml = function (data) {
    var beyond = data.totalEnergy > data.baseEnergy ? "beyond" : "";
    var html = "<li class='sub'>" +
        "<h3 class='title " + beyond + "'>" +
        data.organizationName +
        "<span class='menu_btn'></span>" +
        "<div class='drop'>" +
        "<a href='' class='inner'>总能耗分析</a>" +
        "<a href='' class='inner'>分项能耗分析</a>" +
        "</div>" +
        "</h3>" +
        "<div class='bottom'>" +
        "<span class='target on'>标准</span>" +
        "<span class='target beyond'>超标</span>" +
        "<div id='" + data.organizationId + "' class='disc'>" + data.totalEnergy + " kWh</div>" +
        "</div>" +
        "</li>";
    return html;
}

/**
 * 获取左侧组织机构
 */
var getOrganizationId = function () {
    var data = {status: false, msg: "请选择左侧节点！", id: "", name: ""};
    var selectIndex = $("#aside_select_list").val();
    if (selectIndex == "0") {//经济大厦
        data.status = true;
        data.name = "经济大厦";
    } else if (selectIndex == "1") {//楼层
        var node = $(".a1").treeview("getSelected");
        if (node != null && node.length > 0) {
            data.status = true;
            data.id = node[0].id;
            data.name = node[0].text;
        }
    } else if (selectIndex == "2") {//部门
        var node = $(".a2").treeview("getSelected");
        if (node != null && node.length > 0) {
            data.status = true;
            data.id = node[0].id;
            data.name = node[0].text;
        }
    } else {
        data.msg = "左侧树形分类异常！";
    }

    return data;
};


function allChartData(data) {
    var subChart = $("#" + data.organizationId)[0];// document.getElementsByClassName('disc')[0];
    myChart = echarts.init(subChart);
    var legend = [], seriesItemData = [];
    if (data != null && data.itemEnergy != null && data.itemEnergy.length > 0) {
        for (var i = 0; i < data.itemEnergy.length; i++) {
            var item = data.itemEnergy[i];
            legend.push(item.electricityTypeName);
            seriesItemData.push({
                value:item.activeEnergy,
                name:item.electricityTypeName
            });;
        }
    }
    //option可配置选项
    var option = {
        title: {
            text: '',//data.organizationName,
            x: 'center'
        },
        legend: {
            orient: 'vertical',
            x: '76',
            data: legend//['电量能耗']
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        //拖拽重计算
        calculable: true,
        series: [
            {
                name: '',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: seriesItemData,
                //     [
                //     {value: 335, name: '电量能耗'}
                // ]
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', myChart.resize);
}