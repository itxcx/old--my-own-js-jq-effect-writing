const Url = require('../../config.js')
const util = require('../../utils/util.js')
Page({

    data: {
        list: [],
        pageIndex: 1,
        rows: 10,
        total: 1,
        searchLoading: false,
        showLoad: true,
        scroll: true,
        noneList: false,
        user: ''
    },

    onLoad: function (options) {

    },

    onReady: function () {

    },

    onShow: function () {
        this.getCustem();
        this.setData({
            list: [],
            pageIndex: 1,
            searchLoading: false,
            showLoad: true
        })
        this.getNewsList();
    },
    newsDetail: function (e) {
        let that = this,
            val = e.currentTarget.dataset,
            orderId = val.orderid,
            ind = val.index,
            user = that.data.user,
            taskId = val.taskid,
            header = that.data.list[ind].NoticeHeaders,
            Receivedby = that.data.list[ind].Receivedby,
            read = parseInt(val.read),
            linkurl = '/pages/orderM/orderDetails/orderDetails?OrderId=' + orderId + '&pageEnter=ddgl';
        wx.setStorageSync('OrderId', orderId);
        if (user == "业务员") {
            if (header.indexOf('确认额度') > 0) {
                linkurl = '/pages/orderM/confirmquota/confirmquota'
            } else if (header.indexOf('评估完成') > 0) {
                linkurl = '/pages/beforeLoan/vehicleEvaluation/evaluationMess/evaluationMess?OrderId=' + orderId
            } else {
                linkurl = '/pages/orderM/orderDetails/orderDetails?OrderId=' + orderId + '&pageEnter=ddgl'
            }

        } else if (user == "门店经理") {
            linkurl = '/pages/orderM/orderDetails/orderDetails?OrderId=' + orderId + '&pageEnter=ddgl'

        } else if (user == "门店风控") {
            if (header.indexOf('放款申请')>0) {
                if (Receivedby.indexOf('GPS') > 0) {
                    linkurl = '/pages/orderM/orderDetails/orderDetails?OrderId=' + orderId + '&pageEnter=gpsaz'
                } else if (Receivedby.indexOf('抵押登记') > 0)
                    linkurl = '/pages/orderM/orderDetails/orderDetails?OrderId=' + orderId + '&pageEnter=dydj'
            } else if (header.indexOf('抵押登记') > 0) {
                linkurl = '/pages/orderM/orderDetails/orderDetails?OrderId=' + orderId + '&pageEnter=dydj'
            } else if (header.indexOf('GPS') > 0) {
                if (header.indexOf('安装完成')>0){
                    linkurl = '/pages/orderM/orderDetails/orderDetails?OrderId=' + orderId + '&pageEnter=gpsjk'
                } else if (header.indexOf('待完成') > 0){
                    linkurl = '/pages/orderM/orderDetails/orderDetails?OrderId=' + orderId + '&pageEnter=gpsaz'
                }
            }
        }
        console.log(linkurl)
        wx.navigateTo({
            url: linkurl
        })
        if (!read) {
            util.myPost(Url.SetIsRead + '?id=' + taskId, {}, function (res) {
                if (res.Success) {

                } else {

                }
            }, true)
        }
    },
    getCustem: function () {
        let that = this,
            token = wx.getStorageSync('Token'),
            openid = wx.getStorageSync('wxOpenID'),
            data = { OpenId: openid };
        util.myPost(Url.userInfo, data, function (res) {
            let myData = res.data
            that.setData({
                user: myData.PostName
            })
        }, true)
    },
    getNewsList: function () {
        let that = this, mtData = [], rows = that.data.rows, pageIndex = that.data.pageIndex, list = that.data.list,
            total = that.data.total, showLoad = true, noneList = false,
            data = { 'openId': wx.getStorageSync('wxOpenID'), 'queryType': 0, 'pageIndex': pageIndex, 'rows': rows }

        util.myPost(Url.GetNoticeContent, data, function (res) {
            if (res.Success) {
                mtData = res.ResultData
                list = list.concat(mtData)
                total = res.PaginationWechat.total
                if (total < 2) {
                    showLoad = false
                }
                if (total < 1) {
                    noneList = true
                }

                pageIndex++
                that.setData({
                    list: list,
                    total: total,
                    showLoad: showLoad,
                    pageIndex: pageIndex,
                    scroll: true,
                    noneList: noneList
                })
            } else {
                util.openMess(res.Message)
            }
        }, true);
    },
    scrollUp: function (e) {
        let that = this,
            total = that.data.total,
            pageIndex = that.data.pageIndex
        if (pageIndex <= total) {
            that.setData({
                scroll: false
            }, function () {
                that.getNewsList()
            })
        } else {
            that.setData({
                searchLoading: true
            })
        }
    }
})