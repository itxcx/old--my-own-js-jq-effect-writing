
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ocs_i: false,
        oc_nav: [
            { name: '全部' },
            { name: '进行中' },
            { name: '已安装' }
        ],
        swiperI: 0,
        swiperHeight: 300,
        sv_list: [
            {
                link: '../../beforeLoan/vehicleEvaluation/loan/loan',
                sex: 0, upName: '刘四友', upPhone: '13915525458', upStatus: '进行中', midSrc: '/images/ocl_pic01.png', midTit: '奥迪A4(进口) 2013款 40TFSI allroad quattro...', midNum: '苏E7A90A', midPri: '10.25万', midTime: '12期', downName: '苏州虎丘分店', downMin: '1分钟前'
            },
            {
                link: '../../beforeLoan/vehicleEvaluation/loan/loan',
                sex: 0, upName: '刘四友', upPhone: '13915525458', upStatus: '已安装', midSrc: '/images/ocl_pic01.png', midTit: '奥迪A4(进口) 2013款 40TFSI allroad quattro...', midNum: '苏E7A90A', midPri: '10.25万', midTime: '12期', downName: '苏州虎丘分店', downMin: '1分钟前'
            },
            {
                link: '../../beforeLoan/vehicleEvaluation/loan/loan',
                sex: 0, upName: '刘四友', upPhone: '13915525458', upStatus: '进行中', midSrc: '/images/ocl_pic01.png', midTit: '奥迪A4(进口) 2013款 40TFSI allroad quattro...', midNum: '苏E7A90A', midPri: '10.25万', midTime: '12期', downName: '苏州虎丘分店', downMin: '1分钟前'
            },
            {
                link: '../../beforeLoan/vehicleEvaluation/loan/loan',
                sex: 0, upName: '刘四友', upPhone: '13915525458', upStatus: '已安装', midSrc: '/images/ocl_pic01.png', midTit: '奥迪A4(进口) 2013款 40TFSI allroad quattro...', midNum: '苏E7A90A', midPri: '10.25万', midTime: '12期', downName: '苏州虎丘分店', downMin: '1分钟前'
            },
            {
                link: '../../beforeLoan/vehicleEvaluation/loan/loan',
                sex: 0, upName: '刘四友', upPhone: '13915525458', upStatus: '已安装', midSrc: '/images/ocl_pic01.png', midTit: '奥迪A4(进口) 2013款 40TFSI allroad quattro...', midNum: '苏E7A90A', midPri: '10.25万', midTime: '12期', downName: '苏州虎丘分店', downMin: '1分钟前'
            }
        ]
    },
    switchTab: function (e) {
        var index = e.detail.current;
        this.setData({
            swiperI: index
        });
    },
    navTap: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            swiperI: index
        });
    },
    ocs_inp: function (e) {
        var ocs_i = this.data.ocs_i;
        if (e.detail.value == '') {
            ocs_i = false
        }
        else {
            ocs_i = true
        };
        this.setData({
            ocs_i: ocs_i
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var swiperHeight = this.data.swiperHeight;
        wx.getSystemInfo({
            success: function (res) {
                swiperHeight = (res.windowHeight - 88) * 2;
                that.setData({
                    swiperHeight: swiperHeight
                });
            }
        });
    },
    onReady: function () {

    },
    onShow: function () {

    },
    onHide: function () {

    }
})