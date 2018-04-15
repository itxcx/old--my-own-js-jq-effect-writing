//index.js
//获取应用实例
const Url = require('../../config.js')
const util = require('../../utils/util.js')
const app = getApp()
Page({
    data: {
        StatsData:{},
        ModuleList:[],
        NoticeList:[],
        dotC: false,
        GroupId:'',
        ShopId:'',
        areaList: { isShow: true, showDistrict:true}
    },
    //事件处理函数  
    onLoad: function () {
        // util.myPost(Url.GetAreaList, { 'KeyValue': '' }, function (res) {
        //     console.log(res)
        // }, true)
    },
    onShow:function(){
        let that = this,
            openid = wx.getStorageSync('wxOpenID'),
            data = { OpenId: openid };
        let GroupId = that.data.GroupId;
        let ShopId = that.data.ShopId;
        // //个人信息
        util.myPost(Url.userInfo, data, function (res) {
            let mydata = res.data, menu;
            wx.setStorageSync('UserId',mydata.UserId);            
            GroupId = mydata.GroupId;
            ShopId = mydata.ShopId;
            that.newsList(GroupId, ShopId)
        }, true);                
    },
    newsList: function (GroupId, ShopId){
        let that = this, menu, StatsData,
            data = { OpenId: wx.getStorageSync('wxOpenID') };
        util.myPost(Url.homeIndex, data, function (res) {
            if(res.code==0){
                let mData = res.data, StatsData = mData.StatsData
                menu = mData.ModuleList
                for (let i = 0; i < menu.length; i++) {
                    if (menu[i].Description == "订单录入") {
                        menu[i].UrlAddress = "/pages/beforeLoan/vehicleEvaluation/index/index"
                    } else if (menu[i].Description == "订单管理") {
                        menu[i].UrlAddress = "/pages/orderM/orderCenter/orderCenter?EnCode=ddgl"
                    }
                    else if (menu[i].Description == "GPS安装") {
                        menu[i].UrlAddress = `/pages/orderM/orderCenter/orderCenter?EnCode=gpsaz&GroupId=${GroupId}&ShopId=${ShopId}`
                    }
                    else if (menu[i].Description == "GPS监控") {
                        menu[i].UrlAddress = "/pages/orderM/orderCenter/orderCenter?EnCode=gpsjk"
                    }
                    else if (menu[i].Description == "抵押登记") {
                        menu[i].UrlAddress = "/pages/orderM/orderCenter/orderCenter?EnCode=dydj"
                    }
                    else if (menu[i].Description == "贷款计算器") {
                        menu[i].UrlAddress = "/pages/lenderCalculator/lenderCalculator"
                    }
                }
                StatsData.CompleteRate = StatsData.CompleteRate.toFixed(2)
                that.setData({
                    StatsData: StatsData,
                    ModuleList: menu,
                    NoticeList: mData.NoticeList,
                    UnReadCount: mData.UnReadCount
                })
            }else{
                console.log(res.desc)
                util.openMess(res.desc);
            }
           
        },true)    
    }
})