const chats = require("../../utils/echarts.simple.min.js")
const util = require('../../utils/util.js')
const Url = require('../../config.js')

Page({
    data: {
        current: 0,
        topbar: [{ name: '昨日概况', target: true }, { name: '详细数据', target: false }, { name: '用户分析', target: false }, { name: '业绩排行', target: false }],
        oldPicker:{index:0,data:['全部门店','苏州虎丘区门店']},
    },

    onLoad: function (options) {

    },

    onReady: function () {

    },

    onShow: function () {

    },

    barClick: function (e) {
        let ind = parseInt(e.currentTarget.dataset.index),
            topbar = this.data.topbar;
        for (let i = 0; i < topbar.length; i++) {
                topbar[i].target = false
            if (i == ind) {
                topbar[i].target = true
            }
        }
        this.setData({
            current: ind,
            topbar: topbar
        })
    },
    oldPickerChange:function(e){
        let ind = e.detail.value || e.detail.current;
        let oldPicker = this.data.oldPicker
        oldPicker.index = ind
        this.setData({
            oldPicker: oldPicker
        })
    },
    touchmove:function(e){
        let ind = e.detail.current,
            topbar = this.data.topbar;
        for (let i = 0; i < topbar.length; i++) {
            topbar[i].target = false
            if (i == ind) {
                topbar[i].target = true
            }
        }
        this.setData({
            current: ind,
            topbar: topbar
        })
    },
    brokenLine:function(){
       let option = {
            title: {
                text: '今日趋势'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['进件数']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'time',
                    boundaryGap: false
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '进件数',
                    type: 'line',
                    stack: '总量',
                    areaStyle: { normal: {} },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
            ]
        };

    }
})