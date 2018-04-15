const Url = require('../../../config.js')
const util = require('../../../utils/util.js')
Page({
    data: {
        myData: {},
        imgs: [{ id: '', src: '../../../images/iApic01.png', picType: 'GIDCardPoriginalpath' }, { id: '', src: '../../../images/iApic02.png', picType: 'GIDCardOoriginalpath' }],  //, { 'src': '/images/iApic03.png', 'type': 'GIDCardOHoriginalpath' }
        live: { arr: {}, address: '', mess: '' },
        work: { arr: {}, address: '', mess: '' },
        idcard: {},
        value: [0, 0, 0],
        myAnimation: {},
        indexName: ''
    },

    onLoad: function (options) {
        let that = this,
            live = that.data.live,
            work = that.data.work,
            idcard = this.data.idcard;
        let data = { CustomerId: wx.getStorageSync('CustomerId'), OrderId: wx.getStorageSync('OrderId'), 'CarId': '' };
        util.myPost(Url.basicInfo, data, function (res) {
            console.log(res);
            let myData = res.data.T_CustomerEntity;
            if (res.code == 0) {
                let add1 = myData.GuarantorPAddress,
                    add2 = myData.GuarantorRAddress
                idcard.Value = myData.GuarantorIDcard
                idcard.Name = myData.GuarantorName

                if (add1 != '') {
                    add1 = JSON.parse(add1)
                    add2 = JSON.parse(add2)
                    live.arr = add1
                    work.arr = add2
                    if (!add1.DistrictName) {
                        add1.DistrictName = ''
                    }
                    if (!add2.DistrictName) {
                        add2.DistrictName = ''
                    }
                    live.address = add1.ProvinceName + add1.CityName + add1.DistrictName
                    work.address = add2.ProvinceName + add2.CityName + add2.DistrictName
                    live.mess = add1.Address
                    work.mess = add2.Address
                }
                that.setData({
                    myData: myData,
                    live: live,
                    work: work,
                    idcard: idcard
                })
            }
        }, true)

    },
    onReady: function () {

    },
    onShow: function () {
        this.getPicInfo()
    },
    getPicInfo: function () {
        let that = this,
            imgs = that.data.imgs,
            data = { 'OrderId': wx.getStorageSync('OrderId'), 'PicsType': 36, 'ChildPicsType': 'Customer' }
        util.myPost(Url.GetPicsList, data, function (res) {
            if (res.code == 0) {
                let mydata = res.data
                if (mydata.length > 0) {
                    for (let i = 0; i < mydata.length; i++) {
                        if (mydata[i].FilePath) {
                            mydata[i].FilePath = util.getImgUrl(mydata[i].FilePath)
                            let ChildPicsType = mydata[i].ChildPicsType
                            if (ChildPicsType == 6) {
                                imgs[0].src = mydata[i].FilePath
                                imgs[0].id = mydata[i].PicsId
                            } else if (ChildPicsType == 7) {
                                imgs[1].src = mydata[i].FilePath
                                imgs[1].id = mydata[i].PicsId
                            }
                        }
                    }
                    that.setData({
                        imgs: imgs
                    })
                }
            } else {
                util.openMess(res.desc)
            }

        }, false)

    },
    getPhoto: function (e) {
        let val = e.target.dataset.value;
        let ind = parseInt(e.currentTarget.dataset.name),
            _type = e.currentTarget.dataset.type,
            id = e.currentTarget.dataset.id,
            that = this,
            disabled = that.data.disabled,
            data = { 'OrderId': wx.getStorageSync('OrderId'), 'pictype': _type, 'PicPathType': 'Customer', 'CarPicId': id },
            imgs = that.data.imgs;
        util.choosePic(1, Url.upLoadPic, data, function (res, src) {
            that.getPicInfo()
        })

    },
    formSubmit: function (e) {
        let sub = e.detail.value, data = {}, imgs = this.data.imgs, cont = true,
            live = this.data.live,
            work = this.data.work,
            mydata = this.data.myData,
            MaritalStatus = sub.MaritalStatus,
            CustomerId = wx.getStorageSync('CustomerId'),
            GuarantorName, GuarantorGender, GuarantorIDcard, GuarantorMobile, liveAddress, workAddress, GuarantorPAddress, GuarantorRAddress;
        GuarantorName = sub.GuarantorName,
            GuarantorGender = sub.GuarantorGender,
            GuarantorIDcard = sub.GuarantorIDcard,
            GuarantorMobile = sub.GuarantorMobile,
            GuarantorPAddress = live.arr,
            GuarantorRAddress = work.arr;

        if (GuarantorName == '') {
            util.openMess('请输入担保人姓名')
            return false;
        }
        if (GuarantorIDcard == '') {
            util.openMess('请选输入担保人身份证')
            return false;
        } else {
            if (!util.Verification.idCard(GuarantorIDcard)) {
                util.openMess('身份证不合法')
                return false;
            } else if (GuarantorIDcard == mydata.IDcard) {
                util.openMess('身份证重复')
                return false;
            }
        }
        if (GuarantorMobile == '') {
            util.openMess('请选担保人手机号码')
            return false;
        } else {
            if (!util.Verification.telephone(GuarantorMobile)) {
                util.openMess('手机号码不合法')
                return false;
            } else if (GuarantorMobile == mydata.Mobile) {
                util.openMess('手机号码重复')
                return false;
            }
        }
        if (sub.liveMess == '' || sub.live == '') {
            util.openMess('请完善户籍地址')
            return false;
        }
        if (sub.workMess == '' || sub.work == '') {
            util.openMess('请完善居住地址')
            return false;
        }
        for (let i = 0; i < imgs.length; i++) {
            let src = imgs[i].src,
                j = i + 1
            if (src == '/images/iApic0' + j + '.png') {
                util.openMess('证件图片不完善');
                cont = false
                break;
            }
        }
        if (!cont) {
            return false
        }
        data.CustomerId = CustomerId
        data.GuarantorGender = parseInt(GuarantorGender)
        data.GuarantorName = GuarantorName
        data.GuarantorIDcard = GuarantorIDcard
        data.GuarantorMobile = GuarantorMobile
        data.GuarantorPAddress = GuarantorPAddress ? JSON.stringify(GuarantorPAddress) : ''
        data.GuarantorRAddress = GuarantorRAddress ? JSON.stringify(GuarantorRAddress) : ''
        console.log(data)
        util.myPost(Url.submitGI, data, callBack, false);
        function callBack(res) {
            if (res.code == 0) {
                util.openMess('提交成功', 'success');
                setTimeout(function () {
                    wx.navigateBack();
                }, 1500)
            } else {
                util.openMess(res.desc);
            }
        }
    },
    navBack: function () {
        wx.navigateBack({})
    },
    getCardPhoto: function (e) {
        let name = e.currentTarget.dataset.id,
            that = this,
            live = this.data.live
        util.ImageRecognition(name, function (res) {
            if (res.code == 0) {
                let mydata = res.data
              
                if (name == 'idcard') {
                    let address = JSON.parse(mydata.Address)
                    if (!address.DistrictName) {
                        address.DistrictName == ''
                    }
                    live.arr = address
                    live.address = address.ProvinceName + address.CityName + address.DistrictName
                    live.mess = address.Address
                    console.log(live)
                    that.setData({
                        idcard: mydata,
                        live: live
                    })
                    wx.hideLoading();
                } else {
                    util.openMess('识别错误')
                }
            }
        }, true,2)
    },
    showPickerArea: function (e) {
        let name = e.currentTarget.dataset.name
        let proviceData = this.data.proviceData
        this.animation = util.animation
        util.animation.bottom(0).step()
        this.setData({
            isShow: true,
            myAnimation: util.animation.export(),
            value: [0, 0, 0],
            indexName: name
        });
        this.getProvice();
    },

    bindChange: function (e) {
        const current_value = e.detail.value, _data = this.data, that = this;
        if (current_value.length > 2) {
            if (this.data.value[0] !== current_value[0] && this.data.value[1] === current_value[1] && this.data.value[2] === current_value[2]) {
                // 滑动省份
                that.getCity(_data.proviceData[current_value[0]].AreaCode)
                current_value[1] = 0
                current_value[2] = 0

            } else if (this.data.value[0] === current_value[0] && this.data.value[1] !== current_value[1] && this.data.value[2] === current_value[2]) {
                that.getDistrict(_data.cityData[current_value[1]].AreaCode)
                current_value[2] = 0
            } else if (this.data.value[0] === current_value[0] && this.data.value[1] === current_value[1] && this.data.value[2] !== current_value[2]) {
                // 滑动地区
                // that.getDistrict(_data.cityData[current_value[2]].AreaCode)
            }
        }

        that.setData({
            value: current_value,
        })
    },
    getProvice: function () {
        let that = this, live = that.data.live, work = that.data.work
        util.myPost(Url.GetAreaList, { 'KeyValue': '' }, function (res) {
            if (res.code == 0) {
                console.log(res)
                let mydata = res.data
                //   util.addDot(mydata);
                const firstProvince = mydata[0];
                that.getCity(firstProvince.AreaCode)
                console.log(mydata)
                that.setData({
                    proviceData: mydata,
                    'selectedProvince.index': 0,
                    'selectedProvince.code': firstProvince.AreaCode,
                    'selectedProvince.fullName': firstProvince.AreaName,
                });
            }
        }, true)
    },
    getCity: function (code) {
        let that = this
        util.myPost(Url.GetAreaList, { 'KeyValue': code }, function (res) {
            if (res.code == 0) {
                let mydata = res.data
                // util.addDot(mydata);
                const firstCity = mydata[0];
                that.getDistrict(firstCity.AreaCode)
                that.setData({
                    cityData: res.data,
                    'selectedCity.index': 0,
                    'selectedCity.code': firstCity.AreaCode,
                    'selectedCity.fullName': firstCity.AreaName,
                });
            }
        }, true)
    },
    getDistrict: function (code) {
        let that = this
        util.myPost(Url.GetAreaList, { 'KeyValue': code }, function (res) {
            if (res.code == 0) {
                let mydata = res.data
                // util.addDot(mydata);
                const firstDistrict = mydata[0];
                that.setData({
                    districtData: res.data,
                });
            }
        }, true)
    },
    hidePicker: function () {
        this.animation = util.animation
        util.animation.bottom("-100%").step()
        this.setData({
            isShow: false,
            myAnimation: util.animation.export()
        });
    },
    confirmAddress: function () {
        let _data = this.data,
            value = this.data.value,
            proviceName = _data.proviceData[value[0]].AreaName,
            proviceCode = _data.proviceData[value[0]].AreaCode,
            cityName = _data.cityData[value[1]].AreaName,
            cityCode = _data.cityData[value[1]].AreaCode, districtName = '', districtCode = ''
        if (_data.districtData.length > 0) {
            districtName = _data.districtData[value[2]].AreaName
            districtCode = _data.districtData[value[2]].AreaCode
        }

        let address = { "ProvinceCode": proviceCode, "ProvinceName": proviceName, "CityCode": cityCode, "CityName": cityName, "DistrictCode": districtCode, "DistrictName": districtName, "Address": "" },
            addressMess = proviceName + cityName + districtName,
            indexName = this.data.indexName,
            live = this.data.live,
            work = this.data.work
        if (indexName == 'live') {
            address.Address = live.mess
            live.arr = address
            live.address = addressMess
        } else {
            address.Address = work.mess
            work.arr = address
            work.address = addressMess
        }
        this.setData({
            live: live,
            work: work
        })
        this.hidePicker()
    },
    changeMess: function (e) {
        let name = e.currentTarget.dataset.name,
            val = e.detail.value,
            live = this.data.live,
            work = this.data.work
        if (name == 'liveMess') {
            live.mess = val
            live.arr.Address = val
        } else {
            work.mess = val
            work.arr.Address = val
        }
        this.setData({
            live: live,
            work: work
        })
    }
})