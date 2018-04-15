/**
 * Created by hell_fun on 2017/4/6.
 */

/**
 * 加载页面执行
 */
$(function(){
    //把默认页面选项的值为整个大厦
    // $("#aside_select_list").val("0");
    //加载左侧树
    historyRecordZtreeAjax();
    //初始化jqgrid
    initJqGrid();
    //加载年月周点击事件
    initEvent();
    //屏幕自适应
    resizeWH();
});

/**
 * 页面初始化点击事件
 */
function initEvent() {
    //周单击事件
    $("#history-week").click(function () {
        var organization = getOrganizationId();
        console.log(organization)
        if (!organization.status) {
            alert(organization.msg);
            return;
        }
        //构建参数
        var param = {dataAnalysisOrganizations: organization.data, queryType: "W"};
        console.log(param)
        //执行数据查询
        historyData(param, organization.name);
    });
    //月单击事件
    $("#history-month").click(function () {
        var organization = getOrganizationId();
        // if (!organization.status) {
        //     alert(organization.msg);
        //     return;
        // }
        //构建参数
        var param = {dataAnalysisOrganizations: organization.data, queryType: "M"};
        //执行数据查询
        historyData(param, organization.name);
    });
    //年单击事件
    $("#history-year").click(function () {
        var organization = getOrganizationId();
        // if (!organization.status) {
        //     alert(organization.msg);
        //     return;
        // }
        //构建参数
        var param = {dataAnalysisOrganizations: organization.data, queryType: "Y"};
        //执行数据查询
        historyData(param, organization.name);
    });
    //高级查询单击事件
    $("#history-query").click(function () {
        var organization = getOrganizationId();
        // if (!organization.status) {
        //     alert(organization.msg);
        //     return;
        // }
        //构建参数
        var param = {dataAnalysisOrganizations: organization.data, queryType: "G"};
        //执行数据查询
        historyData(param, organization.name);
    });

    /*    $("#history-download").click(function(){
     var organization = getOrganizationId();
     if (!organization.status) {
     alert(organization.msg);
     return;
     }
     //构建参数
     var param = {dataAnalysisOrganizations: organization.data, queryType: "G"};

     });*/
}

/**
 * 获取左侧组织机构
 */
//getOrganizationId  这个函数需要修改，没有selectIndex框了
function getOrganizationId() {
    var data = {status: false, msg: "请选择左侧节点！", data: [], name: ""};
    //var selectIndex = $("#aside_select_list").val();
    // if (selectIndex == "0") {//经济大厦
    //     data.status = true;
    //     data.name = "经济大厦";
    // } else
    //if (selectIndex == "1") {//楼层
    var treeObj = $.fn.zTree.getZTreeObj("zTreeIndex");
    var node = treeObj.getSelectedNodes();
    if (node != null && node.length > 0) {
        data.status = true;
        data.data = node;
        data.name = node[0].text;
    }
    // } else if (selectIndex == "2") {//部门
    //     var node = [];
    //     var ctext = $(".upRing .words").text();
    //     if (node != null && node.length > 0) {
    //         data.status = true;
    //         data.data = node;
    //         data.name = node[0].text;
    //     }
    // }
    else {
        data.msg = "左侧树形分类异常！";
    }
    return data;
}
function historyData(param, name){
    switch(param.queryType)
    {
        case 'W':
            $.ajax({
                url:basePath+"/history/findHistoryWeekData",
                type:'post',
                data:{type:param.dataAnalysisOrganizations.length > 0 ? param.dataAnalysisOrganizations[0].dictionary.code :'', id:param.dataAnalysisOrganizations .length == 0 ? '' : param.dataAnalysisOrganizations[0].id},
                error:function(){console.log('ajax调用失败')},
                success:function (rt) {
                    allBranchE(rt.data[0], rt.data[1], rt.data[2], rt.data[3], name);
                    //quickQuery(param.dataAnalysisOrganizations .length == 0 ? '' :param.dataAnalysisOrganizations[0].dictionary.code, param.dataAnalysisOrganizations .length == 0 ? '' : param.dataAnalysisOrganizations[0].id, param.queryType, $("#start").val(), $("#end").val());
                }
            });
            quickQuery(
                param.dataAnalysisOrganizations .length > 0 ? param.dataAnalysisOrganizations[0].dictionary.code :'',
                param.dataAnalysisOrganizations .length > 0 ? param.dataAnalysisOrganizations[0].id:'',
                param.queryType,
                $("#start").val(),
                $("#end").val());
            break;
        case 'M':
            $.ajax({
                url:basePath+"/history/findHistoryMonthData",
                type:'post',
                data:{type:param.dataAnalysisOrganizations .length == 0 ? '' :param.dataAnalysisOrganizations[0].dictionary.code, id:param.dataAnalysisOrganizations .length == 0 ? '' : param.dataAnalysisOrganizations[0].id},
                error:function(){console.log('ajax调用失败')},
                success:function (rt) {
                    allBranchE(rt.data[0], rt.data[1], rt.data[2], rt.data[3], name);
                }
            });
            quickQuery(param.dataAnalysisOrganizations .length == 0 ? '' :param.dataAnalysisOrganizations[0].dictionary.code, param.dataAnalysisOrganizations .length == 0 ? '' : param.dataAnalysisOrganizations[0].id, param.queryType, $("#start").val(), $("#end").val());
            break;
        case 'Y':
            $.ajax({
                url:basePath+"/history/findHistoryYearData",
                type:'post',
                data:{type:param.dataAnalysisOrganizations .length == 0 ? '' :param.dataAnalysisOrganizations[0].dictionary.code, id:param.dataAnalysisOrganizations .length == 0 ? '' : param.dataAnalysisOrganizations[0].id},
                error:function(){console.log('ajax调用失败')},
                success:function (rt) {
                    allBranchE(rt.data[0], rt.data[1], rt.data[2], rt.data[3], name);
                }
            });
            quickQuery(param.dataAnalysisOrganizations .length == 0 ? '' :param.dataAnalysisOrganizations[0].dictionary.code, param.dataAnalysisOrganizations .length == 0 ? '' : param.dataAnalysisOrganizations[0].id, param.queryType, $("#start").val(), $("#end").val());
            break;
        case 'G':
            $.ajax({
                url:basePath+"/history/findHistoryTimeData",
                type:'post',
                data:{type:param.dataAnalysisOrganizations .length == 0 ? '' :param.dataAnalysisOrganizations[0].dictionary.code, id:param.dataAnalysisOrganizations .length == 0 ? '' : param.dataAnalysisOrganizations[0].id, start:$("#start").val(), end:$("#end").val()},
                error:function(){console.log('ajax调用失败')},
                success:function (rt) {
                    fiveGuageChart(rt);
                }
            });
            quickQuery(param.dataAnalysisOrganizations .length == 0 ? '' :param.dataAnalysisOrganizations[0].dictionary.code, param.dataAnalysisOrganizations .length == 0 ? '' : param.dataAnalysisOrganizations[0].id, param.queryType, $("#start").val(), $("#end").val());
            break;
    }
}
//historyRecord 总能耗 echarts
function allBranchE(data1, data2, data3, data4, name){
    // 基于准备好的dom，初始化echarts图表
    var myChart = echarts.init($('.total_energy')[0]);
    var myChart1 = echarts.init($('.total_energy')[1]);
    /**
     * 横坐标计算
     */
    var array  = new Array();
    switch (data1.length)
    {
        case 7:
            var array = ['星期一','星期二','星期三','星期四','星期五','星期六','星期天'];
            break;
        case 12:
            array = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
            break;
        case 24:
            array = ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];
            break;
        default:
            for (var i = 0; i < data1.length; i++){
                array[i] = String(i+1);
            }
            break;
    }

    //分能耗表
    var option1 = {
        title: {
            text: name
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['空调用电','智能插座用电','动力用电','其它用电']
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : array
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value}'
                },
                name: '耗电量(kW)'
            }
        ],
        series : [
            {
                name:'空调用电',
                type:'line',
                //data:[110, 101, 105, 103, 102, 103, 100, 101, 105, 103, 102, 103, 100, 101, 105, 103, 102, 103, 100, 101, 105, 103, 102, 103, 100]
                data : data1
            },
            {
                name:'智能插座用电',
                type:'line',
                //data:[120, 101, 105, 103, 102, 103, 100, 101, 105, 103, 102, 103, 100, 121, 105, 103, 102, 103, 100, 101, 105, 103, 102, 103, 100]
                data : data2
            },
            {
                name:'动力用电',
                type:'line',
                //data:[160, 101, 105, 103, 102, 103, 100, 101, 105, 103, 102, 103, 100, 121, 105, 103, 102, 103, 100, 101, 105, 103, 102, 103, 160]
                data : data3
            },
            {
                name:'其它用电',
                type:'line',
                //data:[120, 101, 105, 103, 102, 103, 100, 101, 175, 103, 102, 103, 100, 121, 105, 103, 102, 103, 100, 101, 105, 103, 190, 103, 100]
                data : data4
            }
        ]
    };
    // 为echarts对象加载数据
    myChart1.setOption(option1);

    /**
     *计算总能耗
     */
    var sumData=new Array(data1.length);
    for (var i = 0; i < data1.length; i++){
        sumData[i]=(Number(data1[i])+Number(data2[i])+Number(data3[i])+Number(data4[i])).toFixed(4);
    }
    //总能耗
    var option = {
        title: {
            text: name
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['总能耗']
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : array
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value}'
                },
                name: '耗电量(kW)'
            }
        ],
        series : [
            {
                name:'总能耗',
                type:'line',
                //data:[-101, 101, 105, 103, 102, 103, 100, 101, 105, 103, 102, 103, 100, -101, 105, 103, 102, 103, 100, 101, 105, 103, 102, 103, -200]
                data:sumData
            }
        ]
    };
    // 为echarts对象加载数据
    myChart.setOption(option);
    //打印功能
    //printBtn
    var printBtn0 = $(".lineChart .allPrint")[0];
    printBtn0.onclick = function () {
        //第一个echarts canvas生成的图
        var img0 = myChart.getImage();
        //新建一个窗口
        var picWin0 = window.open();
        //获取新窗口的document属性
        var d = $(picWin0).attr("document");
        //获取新窗口的body
        var b = $(d).find("body");
        //新窗口body的样式
        b.css({"text-align": "center"});
        //插入生成的图
        b.append(img0);
        //利用jquery的动画方法中的回调函数，做到图片加载完就执行打印新窗口页面
        $(img0).animate({left: '1px'}, function () {
            picWin0.print()
        });
    };
    var printBtn1 = $(".lineChart .branchPrint")[0];
    printBtn1.onclick = function () {
        //第一个echarts canvas生成的图
        var img0 = myChart1.getImage();
        //新建一个窗口
        var picWin0 = window.open();
        //获取新窗口的document属性
        var d = $(picWin0).attr("document");
        //获取新窗口的body
        var b = $(d).find("body");
        //新窗口body的样式
        b.css({"text-align": "center"});
        //插入生成的图
        b.append(img0);
        //利用jquery的动画方法中的回调函数，做到图片加载完就执行打印新窗口页面
        $(img0).animate({left: '1px'}, function () {
            picWin0.print()
        });
    };
    //echarts自适应
    window.addEventListener("resize",myChart.resize);
    window.addEventListener("resize",myChart1.resize)
}
//five echarts表
function fiveGuageChart(res) {
    console.log(res.data);
    var sum = (Number(res.data[0])+Number(res.data[1])+Number(res.data[2])+Number(res.data[3])).toFixed(4);
    var array = [ sum,res.data[0], res.data[1], res.data[2], res.data[3]];
    var myChart0 = echarts.init($(".fiveGuageChart .total_energy")[0]);
    //echarts series对象
    var myseries = {
        name: '%',
        type: 'gauge',
        center: ['25%', '50%'],    // 默认全局居中
        min: 0,
        max: 100,
        radius: '25%',
        splitNumber: 5,
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                width:5
            }
        },
        axisTick: {            // 坐标轴小标记
            length: 10,        // 属性length控制线长
            lineStyle: {       // 属性lineStyle控制线条样式
                color: 'auto'
            }
        },
        splitLine: {           // 分隔线
            length: 5,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
            }
        },
        title: {
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: 10,
                fontStyle: 'italic'
            }
        },
        detail: {
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: 10
            },
            formatter: '{value}'
        },
        pointer: {
            width:3,
        },
        data: [{value: 50, name: 'A相电压'}]//===
    };

    var myarr = [];
    var b = [];
    var centerArray = [['50%', '35%'], ['10%', '80%'], ['35%', '80%'], ['65%', '80%'], ['90%', '80%']];
    var name = ['总用电量百分比','空调用电量百分比','照明用电量百分比','动力用电量百分比','其他用电量百分比'];
    var radius = ['65%','40%','40%','40%','40%'];
//复制一个对象及对象属性内的数组和对象时
//对象深复制法deepCopy()通过for in遍历全部复制全部对象属性或 构造函数法function A()（对象创造器）,var a=new A(),通过构造函数得到一个新对象，拥有构造函数的全部属性
//深复制方法
    function deepCopy(p, c) {
        //新对象c
        var c = c || {};
        //遍历老对象p中所有属性
        for (var i in p) {
            //如果此属性是个对象
            if (typeof p[i] === 'object') {
                //则此属性的原型指向constructor是Array则创建一个数组，原型指向constructor是Object则创建一个对象
                c[i] = (p[i].constructor === Array) ? [] : {};
                //递归一层方法，遍历数组或对象中的值或属性
                deepCopy(p[i], c[i]);
            } else {
                //直接复制属性到新对象
                c[i] = p[i];
            }
        }
        //遍历结束，返回c，即新对象
        return c;
    }

    for (var i = 0; i < 5; i++) {
        b[i] = deepCopy(myseries);
        //位置等
        b[i].center = centerArray[i];
        //值
        b[i].data[0].name = name[i],
            //名字
            b[i].data[0].value = array[i];
        //radius
        b[i].radius = radius[i];
        myarr.push(b[i])
    }
    var option = {
        tooltip: {
            //formatter: "{b} : {c}"
            formatter: function (params) {
                var res = null;
                var myseries = option.series;
                for (var i = 0; i < myseries.length; i++) {
                    for (var j = 0; j < myseries[i].data.length; j++) {
                        if (myseries[i].data[j].name == params.name) {
                            res = '电量'+' : '+ myseries[i].data[j].value + myseries[i].name+'<br/>'+myseries[i].data[j].name + ' : ' + myseries[i].data[j].value + myseries[i].name;
                        }
                    }
                }
                return res;
            }
        },
        series: myarr
    };
    myChart0.setOption(option);
    //打印功能
    //printBtn
    var printBtn0 = $(".fiveGuageChart .allPrint")[0];
    printBtn0.onclick = function () {
        //第一个echarts canvas生成的图
        var img0 = myChart0.getImage();
        //新建一个窗口
        var picWin0 = window.open();
        //获取新窗口的document属性
        var d = $(picWin0).attr("document");
        //获取新窗口的body
        var b = $(d).find("body");
        //新窗口body的样式
        b.css({"text-align": "center"});
        //插入生成的图
        b.append(img0);
        //利用jquery的动画方法中的回调函数，做到图片加载完就执行打印新窗口页面
        $(img0).animate({left: '1px'}, function () {
            picWin0.print()
        });
    };
    //echarts自适应
    window.onresize = myChart0.resize;
}
//全局变量
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
        // onClick: function (event, treeId, treeNode) {}
    }

};
//准备获取ajax返回值的变量
var dataObj;
//historyRecord aside Ztree
function historyRecordZtreeAjax(){
    //楼层ajax
    function floorAjax(a,d,c){
        $.ajax({
            url: basePath + "/organization/getZTree",
            type:'post',
            //data:{type:a},
            dataType:'json',
            error:function(){console.log('ajax调用失败')},
            success:function(data){
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
                // zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, zTreeObj.getNodes()[0]);
                //选中第一个节点
                if (nodes.length>0) {
                    zTreeObj.selectNode(nodes[0]);
                }
                //默认点击事件为周
                $("#history-week").click();
            }
        });
    }
    floorAjax();
}

/**
 * 初始化jqgrid
 */
function initJqGrid() {
    $("#table_list").dataGrid({
        mtype: 'POST',
        datatype:'local',
        loadonce: false,
        height: 350,
        sortname: 'id',
        colModel: [{
            name: 'id',
            index: 'id',
            label: '序号',
            editable: true,
            width:135,
            sorttype: 'int',
            search: true,
            hidden: true
        },
            {name: 'depName', index: 'depName', label: '组织机构名称', editable: true, width: 160, search: true},
            {name: 'depPath', index: 'depPath', label: '组织机构归属', editable: true, width: 160, search: true},
            {
                name: 'incrementActiveEnergy',
                index: 'incrementActiveEnergy',
                label: '有功能耗',
                editable: true,
                width: 160,
                search: true
            },
            {
                name: 'incrementReactiveEnergy',
                index: 'incrementReactiveEnergy',
                label: '无功能耗',
                editable: true,
                width: 160,
                search: true
            },
            {name: 'date', index: 'date', label: '日期', editable: true, width: 160, search: true},
            {name: 'eleType', index: 'eleType', label: '用电类型', editable: true, width: 160, search: true}],
        // postData: {keyWord: $("#btn_search").val()},
        pager: "#pager_list",
        rowNum: 20,
        rowList: [10, 20, 30, 50, 100]
    });
}
/**
 * 重置宽高
 */
var resizeWH = function () {
    //jqgrid窗口变化高度自适应
    //$("#table_list").setGridHeight($(window).height() - 170);
    //$("#table_list").setGridWidth($(window).width());
    $(window).resize(function () {
        //$("#table_list").setGridHeight($(window).height() - 170);
    })
}
//自定义值 暂时不用
/*var SetPosting = function (value) {
 if (value == "1") {
 return "是"
 }
 else {
 return "否"
 }
 }
 var SetPosting2 = function (value) {
 if (value == "00") {
 return "RS485"
 }
 else {
 return "无线"
 }
 }*/
/**
 * 快速查询
 */
function quickQuery(type, id, timeType, start, end ) {
    // console.log("start");
    // console.log(type);
    // console.log(id);
    $("#table_list").jqGrid('setGridParam', {
        url:basePath+"/history/findHistoryJqgridData",
        datatype: "json",
        postData: {type: type, id: id, timeType: timeType, start: start, end: end} //发送数据
    }).trigger("reloadGrid");
    //console.log("end");
    $("#history-download").click(function(){
        window.location.href = basePath + "/history/download?type=" + type
            +"&id=" + id
            +"&timeType=" + timeType
            + "&start=" + start
            +"&end=" + end;
    });

    /*$.ajax({
     url:basePath+"/history/findHistoryJqgridData",
     contentType:"application/json",
     type:'POST',
     data:'{"page":10}',
     error:function(){console.log('ajax调用失败')},
     success:function (rt) {
     console.log("asdasd");
     }
     });*/
}