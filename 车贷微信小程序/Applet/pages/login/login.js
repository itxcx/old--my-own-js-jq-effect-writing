const openIdUrl = require('../../config.js')
const utilmd5 = require('../../utils/MD5.js')
const util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        login: 0,
        nickName: '',
        userInfo: {},
        hasUserInfo: false,
        errorText: '错误信息',
        errorShow: false
        /*canIUse: wx.canIUse('button.open-type.getUserInfo')*/
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    onReady: function () {

    },

    onShow: function () {

    },
    formsubmit: function (e) {
        let  Account = e.detail.value.account,
            Password = e.detail.value.pass,
            logininfo = false,
            that = this;
        if (Account == '' || Account == null) {
            util.mess('用户名不能为空')
            return false;
        }
        if (Password == '' || Password == null) {
            util.mess('密码不能为空')
            return false;
        } else {
            Password = utilmd5.hexMD5(Password)
        }
        wx.getUserInfo({
            success: function (res) {
                that.setData({
                    login: 1,
                    nickName: res.rawData.nickName
                })
            },
            fail: function () {
                that.setData({
                    login: 0
                })

            }
        })
        let data = {
            Account: Account,
            Password: Password,
            OpenId: wx.getStorageSync('wxOpenID'),
            IsGrant: that.data.login,
            nickName: that.data.nickName
        }
       util.myPost(openIdUrl.loginUrl,data,function(res){
            if (res.code != 0) {
                that.setData({
                    errorText: res.desc,
                    errorShow: true
                }, function () {
                    setTimeout(function () {
                        that.setData({
                            errorShow: false
                        })
                    }, 2000);
                })
            } else {
                wx.setStorageSync('Token', res.data.Token);
                wx.setStorageSync('UserId', res.data.UserId);
                wx.switchTab({
                    url: '/pages/index/index',
                    success: function (e) {
                        var page = getCurrentPages().pop();
                        if (page == undefined || page == null) return;
                        page.onLoad();
                    }
                })
            }
        },true,'登陆中...');
    }
})

/*wx.showModal({
                    title: '警告',
                    content: '您点击了拒绝授权，将无法正常使用*****的功能体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        }
                    }
                })*/