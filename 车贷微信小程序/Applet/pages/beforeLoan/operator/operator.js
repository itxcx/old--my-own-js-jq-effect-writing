const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
let time
Page({
    data: {
        phoneNumber: '',
        gary: '',
        serverName: '',
        serverPass: false,
        serverNumber:'',
        timer: true,
        timerText: '60秒后再次发送',
        num: 60,
        skip:0,
        show:false
    },
    onLoad: function (options) {
        let that = this, Mobile = '', serverName = '',
            data = { OrderId: wx.getStorageSync('OrderId'), CustomerId: wx.getStorageSync('CustomerId'), CarId: wx.getStorageSync('CarId') }
        util.myPost(Url.GetCustomerInfo, data, function (res) {
            
            if (res.code == 0) {
              let mydata = res.data.T_CustomerEntity
                Mobile = mydata.Mobile
                serverName = res.data.catName
                  that.setData({
                      phoneNumber: Mobile,
                      serverName: serverName
                  })
            }
        }, true)
    },
    onReady: function () {

    },
    onShow: function () {
        let that=this
        util.myPost(Url.userInfo, { OpenId: wx.getStorageSync('wxOpenID')},function(res){
            let mydata=res.data
            that.setData({
                UserId: mydata.UserId,
                UserName: mydata.UserName
            })
        },true)
    },
    formsubmit: function (e) {
        wx.showLoading({
            title: '验证中',
            mask: true
        })
        let that = this,
            obj = e.detail.value,
            mobile = that.data.phoneNumber,
            OrderId = wx.getStorageSync('OrderId'),
            CustomerId = wx.getStorageSync('CustomerId'),
            serverPass = obj.serverPass,
            skip=that.data.skip,
            data = { OrderId: OrderId, CustomerId: CustomerId, cell_phone_num: mobile, spassword: serverPass };
            if(!obj.mark){
                if (serverPass == '') {
                    util.openMess('请输入服务密码')
                } else {
                    util.myPost(Url.PhoneMSGVerification, data, function (res) {
                        let mydata = res.data;
                        if (res.code == 0) {
                            if (mydata.phase_status == "WAIT_CODE") {
                                that.setData({
                                    serverPass: true
                                })
                                time = setInterval(that.countdown, 1000)
                                util.openMess('发送成功','success');
                            } else if (mydata.phase_status == "DONE_FAIL") {
                                util.openMess(mydata.description);
                                
                            } else if (mydata.phase_status == "DONE_SUCC"){
                                util.openMess('验证成功','success');
                                that.changeOrderStatus();
                               /*setTimeout(function(){
                                   wx.switchTab({
                                       url: '/pages/index/index',
                                   })
                               },1500)*/
                            }
                        } else {
                            util.openMess(res.desc);
                        }
                    }, false)
                }
            }else{
                data.input = obj.mark;
                util.myPost(Url.PhoneVerificationCode, data, function (res) {
                    let mydata = res.data;
                    if (res.code == 0) {
                        if (mydata.result) {
                            util.openMess('验证成功', 'success');
                            that.changeOrderStatus();
                        } else {
                            skip++;
                            if(skip>3){
                                taht.setData({
                                    show:true
                                })
                            }
                            util.openMess(mydata.description);
                        }
                    } else {
                        util.openMess(res.desc)
                    }
                }, false)
            }
    },
    getMark: function () {
        let mobile = this.data.phoneNumber,
            pass = this.data.serverNumber,
            OrderId = wx.getStorageSync('OrderId'),
            CustomerId = wx.getStorageSync('CustomerId'),
            data = { OrderId: OrderId, CustomerId: CustomerId, cell_phone_num: mobile, spassword:pass};
        this.setData({
            timer: true
        })
        time = setInterval(this.countdown, 1000)
        util.myPost(Url.ReSendSMSCode, data, function (res) {
               let mydata=res.data;
               if(res.code==0){
                   if (mydata.finished){
                       util.openMess('发送成功', 'success');
                   }else{
                       util.openMess('发送失败');
                   }
               }else{
                   util.openMess(res.desc);
               }
        },false)
    },
    getServerPass:function(e){
          let val=e.detail.value;
          this.setData({
              serverNumber:val
          })
    },
    countdown: function () {
        let num = this.data.num;
        num--
        if (num > 0) {
            this.setData({
                num: num,
                timerText: num + "秒后再次发送"
            })
        } else {
            clearInterval(time)
            this.setData({
                num: 60,
                timer: false,
                timerText: '60秒后再次发送',
            })
        }
    },
    skipCheck:function(){
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    changeOrderStatus:function(){
        let mobile = this.data.phoneNumber,
            pass = this.data.serverNumber,
            OrderId = wx.getStorageSync('OrderId'),
            CustomerId = wx.getStorageSync('CustomerId'),
            userId=this.data.UserId,
            userName = this.data.UserName,
            data1 = { OrderId: OrderId},
            data2 = { UserId: userId, UserName: userName, OrderId, CustomerId: CustomerId, cell_phone_num: mobile, spassword: pass };
            
        util.myPost(Url.UpdateOrderStatus, data1, function (res) {
            console.log(res)
              if(res.code==0){
                  util.myPost(Url.SendNoticeTask, data2, function (res) {
                      console.log(res)
                      if (res.code != 0) {
                          util.openMess(res.desc);
                      } else{
                              wx.switchTab({
                                  url: '/pages/index/index',
                              })
                      }
                  })
              }else{
                  util.openMess(res.desc);
              }
        },false);
    }
})