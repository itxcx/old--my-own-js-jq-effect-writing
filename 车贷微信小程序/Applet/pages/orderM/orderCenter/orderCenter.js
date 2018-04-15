// pages/orderM/orderCenter111/orderCenter111.js
const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
const convert = require('../../../utils/convert.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {    
    ocs_i:false,
    oc_nav: [],
    swiperI:0,
    swiperHeight:300,    
    sv_list:[],    
    pageIndex:[],
    pageMax:[],
    confVal:'',
    liWidth:'',
    pageEnter:'',
    WorkGroupId:'',
    options:{},
    inpValue:''
  },
  //搜索框
  ocs_confirm:function(e){
    let that = this;
    let confVal = that.data.confVal;
    let pageMax = that.data.pageMax;
    let pageEnter = that.data.pageEnter;
    let WorkGroupId = that.data.WorkGroupId;
    confVal = e.detail.value;
    that.setData({
      confVal: confVal
    });
    let openId = wx.getStorageSync('wxOpenID');
    var sv_list = that.data.sv_list;    
    if (pageEnter == 'ddglList') {
      for (let i = 0; i < 4; i++) {
        let data = { OpenId: openId, PageSize: 5, PageIndex: 1, QueryType: i, KeyValue: confVal };
        util.myPost(
          Url.orderList,
          { OpenId: openId, PageSize: 5, PageIndex: 1, QueryType: i, KeyValue: confVal },
          function (res) {
            console.log(res);
            pageMax[i] = parseInt(res.data.Count / 5) + 1;
            sv_list[i].d = res.data.OrderList;
            sv_list[i].l = {};
            //   sv_list[i].l.p = false;
            // sv_list[i].l.t = '正在加载';
            if (pageMax[i] < 2) {
              sv_list[i].l.p = true;
              sv_list[i].l.t = '';
            }
            else {
              sv_list[i].l.p = false;
              sv_list[i].l.t = '正在加载';
            }
            that.setData({
              sv_list: sv_list
            });           
          },
          true);
      }
    }
    else if (pageEnter == 'gpsazList'){
      for (let i = 0; i < 3; i++) {
        util.myPost(
          Url.gpsList,
          { OpenId: openId, PageSize: 5, PageIndex: 1, QueryType: i, KeyValue: confVal,WorkGroupId: WorkGroupId},          
          function (res) {
            console.log(res);
            pageMax[i] = parseInt(res.data.records / 5) + 1;
            sv_list[i].d = res.data.rows;
            sv_list[i].l = {};
            // sv_list[i].l.p = false;
            // sv_list[i].l.t = '正在加载';            
            if (pageMax[i] < 2) {
              sv_list[i].l.p = true;
              sv_list[i].l.t = '';
            }
            else {
              sv_list[i].l.p = false;
              sv_list[i].l.t = '正在加载';
            }
            that.setData({
              sv_list: sv_list
            });
          },
          true);
      }
    }    
    else if (pageEnter == 'gpsjkList') {
      util.myPost(
        Url.gpsList,
        { OpenId: openId, PageSize: 5, PageIndex: 1, QueryType: 2, KeyValue: confVal, WorkGroupId: WorkGroupId },
        function (res) {
          let i = 0;
          pageMax[i] = parseInt(res.data.records / 5) + 1;          
          sv_list[i].d = res.data.rows;
          sv_list[i].l = {};
          // sv_list[i].l.p = false;
          // sv_list[i].l.t = '正在加载';
          if (pageMax[i] < 2) {
            sv_list[i].l.p = true;
            sv_list[i].l.t = '';
          }
          else {
            sv_list[i].l.p = false;
            sv_list[i].l.t = '正在加载';
          }
          that.setData({
            sv_list: sv_list
          });
        },
        true);
    } 
    else if (pageEnter == 'dydjList') {
      for (let i = 0; i < 3; i++) {
        util.myPost(
          Url.mortgageList,
          { OpenId: openId, PageSize: 5, PageIndex: 1, QueryType: i, KeyValue: confVal, WorkGroupId: WorkGroupId },
          function (res) {
            pageMax[i] = parseInt(res.data.records / 5) + 1;
            sv_list[i].d = res.data.rows;
            sv_list[i].l = {}; 
            // sv_list[i].l.p = false;
            // sv_list[i].l.t = '正在加载';
            if (pageMax[i] < 2) {
              sv_list[i].l.p = true;
              sv_list[i].l.t = '';
            }
            else {
              sv_list[i].l.p = false;
              sv_list[i].l.t = '正在加载';
            }
            that.setData({
              sv_list: sv_list
            });
          },
          true);
      }
    }
  },
  //下拉功能
  scrollLoading:function(option){    
    console.log('-------------------');
    console.log(1);
    let that = this;
    let swiperI = that.data.swiperI;
    let pageIndex = that.data.pageIndex;    
    let isHideLoadMore = that.data.isHideLoadMore; 
    let loadText = that.data.loadText; 
    let sv_list = that.data.sv_list; 
    let pageMax = that.data.pageMax; 
    let confVal = that.data.confVal;    
    let pageEnter = that.data.pageEnter;
    let WorkGroupId = that.data.WorkGroupId;
    let openId = wx.getStorageSync('wxOpenID');     
    if (pageIndex[swiperI] < pageMax[swiperI]) {
      pageIndex[swiperI]++;
      that.setData({
        pageIndex: pageIndex        
      });      
      if (pageEnter == 'ddglList') {
        var pUrl = Url.orderList;        
        var pData = { OpenId: openId, PageSize: 5, PageIndex: pageIndex[swiperI], QueryType: swiperI, KeyValue: confVal };
      }
      else if (pageEnter == 'gpsazList') {
        var pUrl = Url.gpsList;
        var pData = { OpenId: openId, PageIndex: pageIndex[swiperI], QueryType: swiperI, KeyValue: confVal, WorkGroupId: WorkGroupId };
      }
      else if (pageEnter == 'gpsjkList') {
        var pUrl = Url.gpsList;
        var pData = { OpenId: openId, PageIndex: pageIndex[swiperI], QueryType: 2, KeyValue: confVal, WorkGroupId: WorkGroupId };
      }
      else if (pageEnter == 'dydjList') {
        var pUrl = Url.mortgageList;
        var pData = { OpenId: openId, PageIndex: pageIndex[swiperI], QueryType: swiperI, KeyValue: confVal, WorkGroupId: WorkGroupId };
      }           
      util.myPost(pUrl, pData, callBack, true);
      function callBack(res) {   
        console.log(res);
        console.log(that.data.pageEnter);  
        let orderList = '';
        if (that.data.pageEnter == 'ddglList') {
          orderList = 'OrderList'
        }
        else {
          orderList = 'rows'
        }                 
        sv_list[swiperI].d = sv_list[swiperI].d.concat(res.data[orderList]);        
        sv_list[swiperI].l = {},
        sv_list[swiperI].l.p=false;
        sv_list[swiperI].l.t ='正在加载';        
        that.setData({
          'sv_list': sv_list,          
        });
        if (pageIndex[swiperI] == pageMax[swiperI]){         
          sv_list[swiperI].l.p = true;
          sv_list[swiperI].l.t ='--已经到底了--';
          that.setData({
            'sv_list': sv_list            
          });
        }
      };      
    }    
    else{

    }
  },  
  //左右滑动效果
  switchTab:function(e){    
    var index = e.detail.current;
    this.setData({
      swiperI: index
    });
  },
  //点击导航栏
  navTap: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      swiperI: index
    });
  },
  //搜索框背景消失显示
  ocs_inp:function(e){
    var ocs_i = this.data.ocs_i;    
    if (e.detail.value==''){
      ocs_i=false
    }
    else{
      ocs_i=true
    };    
    this.setData({
      ocs_i: ocs_i
    });
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  //初始化
  onLoad: function (options) {            
    this.setData({
      options: options
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let options = this.options;
    console.log(options);
    var that = this;
    var swiperHeight = that.data.swiperHeight;
    let pageMax = that.data.pageMax;
    let oc_nav = that.data.oc_nav;
    let sv_list = that.data.sv_list;
    let pageEnter = that.data.pageEnter;
    let WorkGroupId = that.data.WorkGroupId;
    pageEnter = options.EnCode + 'List';
    if (options.GroupId == 'null') {
      options.GroupId = null;
    }
    WorkGroupId = options.GroupId;
    // console.log(options);
    that.setData({
      pageEnter: pageEnter,
      WorkGroupId: WorkGroupId
    });
    let liWidth = that.data.liWidth;
    let pageIndex = that.data.pageIndex;
    wx.getSystemInfo({
      success: function (res) {        
        if (that.data.pageEnter =='gpsjkList'){
          swiperHeight = (res.windowHeight) * 2;
        }
        else{
          swiperHeight = (res.windowHeight - 88) * 2;
        }        
        that.setData({
          swiperHeight: swiperHeight
        });
      }
    });
    let openId = wx.getStorageSync('wxOpenID');
    //订单管理
    if (options.EnCode == 'ddgl') {
      wx.setNavigationBarTitle({
        title: '订单管理'
      });
      liWidth = '25%';
      oc_nav = ['全部', '进行中', '已完成', '未成交'];
      sv_list = [{}, {}, {}, {}];
      pageIndex = [1, 1, 1, 1];
      for (let i = 0; i < 4; i++) {
        util.myPost(
          Url.orderList,
          { OpenId: openId, PageSize: 5, PageIndex: 1, QueryType: i, KeyValue: '' },
          function (res) {
            console.log(res);
            pageMax[i] = parseInt(res.data.Count / 5) + 1;
            sv_list[i].d = res.data.OrderList;
            sv_list[i].l = {};
            sv_list[i].s = options.EnCode;
            if (pageMax[i] < 2) {
              sv_list[i].l.p = true;
              sv_list[i].l.t = '';
            }
            else {
              sv_list[i].l.p = false;
              sv_list[i].l.t = '正在加载';
            }
            that.setData({
              sv_list: sv_list,
              oc_nav: oc_nav,
              pageIndex: pageIndex,
              liWidth: liWidth
            });
          },
          true);
      }
    }
    //gps安装    
    else if (options.EnCode == 'gpsaz') {
      wx.setNavigationBarTitle({
        title: 'GPS安装'
      });
      liWidth = '33.3%';
      oc_nav = ['全部', '进行中', '已安装'];
      sv_list = [{}, {}, {}];
      pageIndex = [1, 1, 1];
      for (let i = 0; i < 3; i++) {
        util.myPost(
          Url.gpsList,
          { OpenId: openId, PageIndex: 1, QueryType: i, KeyValue: '', WorkGroupId: options.GroupId },
          function (res) {
            console.log('gps安装');
            console.log(res);
            pageMax[i] = parseInt(res.data.records / 5) + 1;
            sv_list[i].d = res.data.rows;
            sv_list[i].l = {};
            sv_list[i].s = options.EnCode;
            if (pageMax[i] < 2) {
              sv_list[i].l.p = true;
              sv_list[i].l.t = '';
            }
            else {
              sv_list[i].l.p = false;
              sv_list[i].l.t = '正在加载';
            }
            that.setData({
              sv_list: sv_list,
              oc_nav: oc_nav,
              pageIndex: pageIndex,
              liWidth: liWidth
            });
            // console.log(sv_list);
          },
          true);
      }
    }
    //gps监控    
    else if (options.EnCode == 'gpsjk') {
      wx.setNavigationBarTitle({
        title: 'GPS监控'
      });
      liWidth = '33.3%';
      oc_nav = [];
      sv_list = [{}];
      pageIndex = [1];
      for (let i = 0; i < 1; i++) {
        util.myPost(
          Url.gpsList,
          { OpenId: openId, PageIndex: 1, QueryType: 2, KeyValue: '', WorkGroupId: options.GroupId },
          function (res) {
            console.log('gps监控');
            console.log(res);
            pageMax[i] = parseInt(res.data.records / 5) + 1;
            sv_list[i].d = res.data.rows;
            sv_list[i].l = {};
            sv_list[i].s = options.EnCode;
            if (pageMax[i] < 2) {
              sv_list[i].l.p = true;
              sv_list[i].l.t = '';
            }
            else {
              sv_list[i].l.p = false;
              sv_list[i].l.t = '正在加载';
            }
            that.setData({
              sv_list: sv_list,
              oc_nav: oc_nav,
              pageIndex: pageIndex,
              liWidth: liWidth
            });
          },
          true);
      }
    }
    //抵押登记
    else if (options.EnCode == 'dydj') {
      wx.setNavigationBarTitle({
        title: '抵押登记'
      });
      liWidth = '33.3%';
      oc_nav = ['全部', '进行中', '已审核'];
      sv_list = [{}, {}, {}];
      pageIndex = [1, 1, 1];
      for (let i = 0; i < 3; i++) {
        util.myPost(
          Url.mortgageList,
          { OpenId: openId, PageIndex: 1, QueryType: i, KeyValue: '', WorkGroupId: options.GroupId },
          function (res) {
            console.log('抵押登记');
            console.log(res);
            pageMax[i] = parseInt(res.data.records / 5) + 1;
            sv_list[i].d = res.data.rows;
            sv_list[i].l = {};
            sv_list[i].s = options.EnCode;
            if (pageMax[i] < 2) {
              sv_list[i].l.p = true;
              sv_list[i].l.t = '';
            }
            else {
              sv_list[i].l.p = false;
              sv_list[i].l.t = '正在加载';
            }
            that.setData({
              sv_list: sv_list,
              oc_nav: oc_nav,
              pageIndex: pageIndex,
              liWidth: liWidth
            });

          },
          true);
      }
    }
  },
  imageError:function(e){    
    let s = e.detail.errMsg;
    s = s.substring(s.indexOf('ogo/') + 4, s.indexOf('.'))    
    let obj = wx.getStorageSync('carError')||{};
    if(obj[s]){

    }
    else{
      obj[s] = 0
    }
    wx.setStorageSync('carError', obj);
    console.log('-----------------------');
    console.log(wx.getStorageSync('carError'));
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh(); 
    console.log(11111111111);
    let options = this.options;
    console.log(options);
    var that = this;    
    let pageMax = that.data.pageMax;
    let oc_nav = that.data.oc_nav;
    let sv_list = that.data.sv_list;
    let pageEnter = that.data.pageEnter;
    let WorkGroupId = that.data.WorkGroupId;
    pageEnter = options.EnCode + 'List';
    if (options.GroupId == 'null') {
      options.GroupId = null;
    }
    WorkGroupId = options.GroupId;
    // console.log(options);
    that.setData({
      pageEnter: pageEnter,
      WorkGroupId: WorkGroupId,
      confVal:'',
      inpValue:''  
    });    
    let liWidth = that.data.liWidth;
    let pageIndex = that.data.pageIndex;    
    let openId = wx.getStorageSync('wxOpenID');
    //订单管理
    if (options.EnCode == 'ddgl') {
      wx.setNavigationBarTitle({
        title: '订单管理'
      });
      liWidth = '25%';
      oc_nav = ['全部', '进行中', '已完成', '未成交'];
      sv_list = [{}, {}, {}, {}];
      pageIndex = [1, 1, 1, 1];
      for (let i = 0; i < 4; i++) {
        util.myPost(
          Url.orderList,
          { OpenId: openId, PageSize: 5, PageIndex: 1, QueryType: i, KeyValue: '' },
          function (res) {
            console.log(res);
            pageMax[i] = parseInt(res.data.Count / 5) + 1;
            sv_list[i].d = res.data.OrderList;
            sv_list[i].l = {};
            sv_list[i].s = options.EnCode;
            if (pageMax[i] < 2) {
              sv_list[i].l.p = true;
              sv_list[i].l.t = '';
            }
            else {
              sv_list[i].l.p = false;
              sv_list[i].l.t = '正在加载';
            }
            that.setData({
              sv_list: sv_list,
              oc_nav: oc_nav,
              pageIndex: pageIndex,
              liWidth: liWidth
            });
          },
          true);
      }
    }
    //gps安装    
    else if (options.EnCode == 'gpsaz') {
      wx.setNavigationBarTitle({
        title: 'GPS安装'
      });
      liWidth = '33.3%';
      oc_nav = ['全部', '进行中', '已安装'];
      sv_list = [{}, {}, {}];
      pageIndex = [1, 1, 1];
      for (let i = 0; i < 3; i++) {
        util.myPost(
          Url.gpsList,
          { OpenId: openId, PageIndex: 1, QueryType: i, KeyValue: '', WorkGroupId: options.GroupId },
          function (res) {
            console.log('gps安装');
            console.log(res);
            pageMax[i] = parseInt(res.data.records / 5) + 1;
            sv_list[i].d = res.data.rows;
            sv_list[i].l = {};
            sv_list[i].s = options.EnCode;
            if (pageMax[i] < 2) {
              sv_list[i].l.p = true;
              sv_list[i].l.t = '';
            }
            else {
              sv_list[i].l.p = false;
              sv_list[i].l.t = '正在加载';
            }
            that.setData({
              sv_list: sv_list,
              oc_nav: oc_nav,
              pageIndex: pageIndex,
              liWidth: liWidth
            });
            // console.log(sv_list);
          },
          true);
      }
    }
    //gps监控    
    else if (options.EnCode == 'gpsjk') {
      wx.setNavigationBarTitle({
        title: 'GPS监控'
      });
      liWidth = '33.3%';
      oc_nav = [];
      sv_list = [{}];
      pageIndex = [1];
      for (let i = 0; i < 1; i++) {
        util.myPost(
          Url.gpsList,
          { OpenId: openId, PageIndex: 1, QueryType: 2, KeyValue: '', WorkGroupId: options.GroupId },
          function (res) {
            console.log('gps监控');
            console.log(res);
            pageMax[i] = parseInt(res.data.records / 5) + 1;
            sv_list[i].d = res.data.rows;
            sv_list[i].l = {};
            sv_list[i].s = options.EnCode;
            if (pageMax[i] < 2) {
              sv_list[i].l.p = true;
              sv_list[i].l.t = '';
            }
            else {
              sv_list[i].l.p = false;
              sv_list[i].l.t = '正在加载';
            }
            that.setData({
              sv_list: sv_list,
              oc_nav: oc_nav,
              pageIndex: pageIndex,
              liWidth: liWidth
            });
          },
          true);
      }
    }
    //抵押登记
    else if (options.EnCode == 'dydj') {
      wx.setNavigationBarTitle({
        title: '抵押登记'
      });
      liWidth = '33.3%';
      oc_nav = ['全部', '进行中', '已审核'];
      sv_list = [{}, {}, {}];
      pageIndex = [1, 1, 1];
      for (let i = 0; i < 3; i++) {
        util.myPost(
          Url.mortgageList,
          { OpenId: openId, PageIndex: 1, QueryType: i, KeyValue: '', WorkGroupId: options.GroupId },
          function (res) {
            console.log('抵押登记');
            console.log(res);
            pageMax[i] = parseInt(res.data.records / 5) + 1;
            sv_list[i].d = res.data.rows;
            sv_list[i].l = {};
            sv_list[i].s = options.EnCode;
            if (pageMax[i] < 2) {
              sv_list[i].l.p = true;
              sv_list[i].l.t = '';
            }
            else {
              sv_list[i].l.p = false;
              sv_list[i].l.t = '正在加载';
            }
            that.setData({
              sv_list: sv_list,
              oc_nav: oc_nav,
              pageIndex: pageIndex,
              liWidth: liWidth
            });
          },
          true);
      }
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onPageScroll:function(){
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})