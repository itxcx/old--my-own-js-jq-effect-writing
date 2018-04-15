// pages/beforeLoan/vehicleEvaluation/index.js
var util = require('../../../../utils/util.js')
var Url = require('../../../../config.js')

let animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 1000,
    timingFunction: "ease",
    delay: 0
})
Page({
    /**
     * 页面的初始数据
     */
    data: {
        indexCar: 0,
        carplate: [],
        indexColor: 0,
        colorArr: ['请选择'],
        date1: '请选择上牌时间',
        date2: '请选择出厂时间',
        nowdate: '',
        chooseColor: '',
        errorMess: '',
        carColor: '',
        animationData: {},
        Distinguish: { Value: '', Name: '' },
        carNum: '',
        myData: {},
        pickerCar: { arr: ['请选择'], Id: [''], model: '', index: 0 },
        pickerColor: { arr: ['请选择'], color: '', index: 0 },
        idcard: {},
        carChoose: {},
        myAddress: { address: {}, addressMess: '', addressDetail: '' }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            nowdate: new Date()
        })

        animation.height(0).step()
        this.setData({
            animationData: animation.export()
        })
        let data1 = {},
            data2 = {},
            data3 = {},
            that = this;

        //车牌
        util.myPost(Url.GetCarNum, data1, function (res) {
            let car = res.data.CarNumList
            let first = { 'Province': '请选择', 'City': '请选择', 'Code': '请选择' }
            car.unshift(first)
            that.setData({
                carplate: car
            })
        }, true);
        //颜色
        util.myPost(Url.GetCarColor, data2, function (res) {
            if (res.code == 0) {
                let color = res.data.CarColor
                let colorArr = that.data.colorArr
                colorArr = colorArr.concat(color)
                that.setData({
                    colorArr: colorArr
                });
            }

        }, true);
        //订单录入赋值        
        if (options.reApply) {
            that.getOrderInfo()
        }
    },

    onReady: function () {

    },

    onShow: function () {

    },
    getOrderInfo: function () {
        let that = this, pickerCar = that.data.pickerCar
        util.myPost(Url.reApply, { OrderId: wx.getStorageSync('OrderId') }, function (res) {
            if (res.code == 0) {
                let info = res.data
                that.getCarName(info.Vin, function () {
                    for (let i = 0; i < pickerCar.Id.length; i++) {
                        if (pickerCar.Id[i] == info.CarModelId) {
                            pickerCar.index = (i + 1)
                        }
                    }
                })

                //车牌
                util.myPost(Url.GetCarNum, {}, function (res3) {
                    res3.data.CarNumList.unshift({ 'Province': '请选择', 'City': '请选择', 'Code': '请选择' });
                    for (let i = 0; i < res3.data.CarNumList.length; i++) {
                        if (res3.data.CarNumList[i].Code == res.data.CarNumArea) {
                            that.setData({
                                indexCar: i,
                                carChoose: { 'Province': res.data.CarProvinceName, 'City': res.data.CarCityName, 'Code': res.data.CarNumArea },
                                carColor: res.data.CarColor
                            })
                        }
                    }
                }, true);
                //颜色
                util.myPost(Url.GetCarColor, {}, function (res4) {
                    res4.data.CarColor.unshift('请选择');
                    for (let i = 0; i < res4.data.CarColor.length; i++) {
                        if (res4.data.CarColor[i] == res.data.CarColor) {
                            that.setData({
                                indexColor: i
                            })
                        }
                    }
                }, true);
                that.setData({
                    myData: res.data,
                    'idcard.Value': res.data.IdCard,
                    'idcard.Name': res.data.Name,
                    'carvin.Value': res.data.Vin,
                    date2: util.getTime(res.data.ManufactureDate, 4),
                    pickerCar: pickerCar,
                    c1: '#444',
                    c2: '#444',
                    c3: '#444',
                    c4: '#444',
                    c5: '#999',
                    date1: util.getTime(res.data.FirstLicenceTime, 4),
                    carNum: res.data.CarNum
                });
            }
            else {
                util.openMess(res.desc);
            }
        }, true);
    },
    getCarMess: function (e) {
        let val = e.detail.value
        if (val != null && val != '') {
            this.getCarName(val)
        }
    },
    getCarName: function (num, callback) {
        let that = this, pickerCar = that.data.pickerCar
        pickerCar.arr = ['请选择']
        pickerCar.Id = ['']
        util.myPost(Url.GetCarModelByVin, { 'OpenId': wx.getStorageSync('wxOpenID'), 'Vin': num }, function (res) {
            if (res.code == 0) {
                let mydata = res.data.CarModelInfo
                let arr = pickerCar.arr, id = pickerCar.Id
                for (let i = 0; i < mydata.length; i++) {
                    arr.push(mydata[i].ModelName)
                    id.push(mydata[i].CarModelId)
                }
                pickerCar.arr = arr
                pickerCar.Id = id
                pickerCar.index = 0
                that.setData({
                    pickerCar: pickerCar
                }, function () {
                    if (callback) {
                        callback()
                    }
                })
            }
        }, true);
    },
    plateChange: function (e) {
        var ind = parseInt(e.detail.value), color = '#999'
        if (ind != 0) {
            color = '#444'
        }
        this.setData({
            indexCar: ind,
            c1: color,
            carChoose: this.data.carplate[ind]
        })
    },
    bindColorChange: function (e) {
        let ind = e.detail.value,
            color = '',
            colorArr = this.data.colorArr,
            carColor;
        if (ind == 0) {
            color = '#999'
        } else {
            color = '#444'
        }

        for (let i = 0; i < colorArr.length; i++) {
            if (i == parseInt(ind)) {
                carColor = colorArr[i]
            }
        }
        this.setData({
            indexColor: ind,
            c2: color,
            carColor: carColor
        })
    },
    bindDateChange: function (e) {
        this.setData({
            date1: e.detail.value,
            c3: '#444'
        })
    },
    bindFactureChange: function (e) {
        this.setData({
            date2: e.detail.value,
            c4: '#444'
        })
    },
    bindCarChange: function (e) {
        let ind = e.detail.value, color, pickerCar = this.data.pickerCar
        if (ind == 0) {
            color = '#999'
        } else {
            color = '#444'
        }
        pickerCar.index = ind
        pickerCar.model = pickerCar.Id[ind]
        this.setData({
            pickerCar: pickerCar,
            c5: color
        })
    },
    getPhoto: function (e) {
        let name = e.currentTarget.dataset.id,
            that = this,
            pickerCar = that.data.pickerCar,
            myAddress = that.data.myAddress
        //address:{},addressMess:'',addressDetail:''
        util.ImageRecognition(name, function (res) {
            if (res.code == 0) {
                let mydata = res.data
                if (name == 'idcard') {
                    let Address = JSON.parse(mydata.Address)
                    myAddress.address = Address
                    myAddress.addressDetail = Address.Address
                    if (!Address.DistrictName){
                        Address.DistrictName=''
                    }
                    myAddress.addressMess = Address.ProvinceName + Address.CityName + Address.DistrictName
                    that.setData({
                        idcard: mydata,
                        myAddress: myAddress
                    })
                } else {
                    pickerCar.index = 0
                    that.setData({
                        carvin: mydata,
                        pickerCar: pickerCar
                    })
                    that.getCarName(mydata.Value)
                }
                wx.hideLoading();
            } else {
                util.openMess('请手动输入');
            }
        }, true,2)
    },
    changVal: function (e) {
        let val = e.detail.value
        val = val.toUpperCase()
        this.setData({
            carNum: val
        })
    },
    formSubmit: function (e) {
        let v = e.detail.value,
            that = this,
            Vin = v.Vin,
            IdCard = v.IdCard,
            Name = v.Name,
            PermanentAddress = '',
            indexCar = parseInt(that.data.indexCar),
            Mobile = v.Mobile,
            OpenId = wx.getStorageSync('wxOpenID'),
            idcard = that.data.idcard,
            pickerCar = that.data.pickerCar,
            CarModelId = pickerCar.model,
            carChoose = that.data.carChoose,
            CarProvinceName = '',
            CarCityName = '',
            CarNumArea = '',
            CarNum = v.CarNum,
            ApparentMileage = parseFloat(v.ApparentMileage).toFixed(2),
            CarColor = that.data.carColor == '请选择' ? '' : that.data.carColor,
            // CarModelName = pickerCar.index == '0' ? '' : pickerCar.index,
            FirstLicenceTime = v.FirstLicenceTime == '请选择上牌时间' ? '' : v.FirstLicenceTime,
            ManufactureDate = v.ManufactureDate == '请选择出厂时间' ? '' : v.ManufactureDate,
            TransferNum = v.TransferNum;


        let address = v.Address,
            addressMess = v.AddressMess
        if (address == '') {
            util.openMess('请选择户籍地址')
            return false
        }
        if (addressMess == '') {
            util.openMess('请输入户籍详细地址')
            return false
        }
        PermanentAddress = JSON.stringify(that.data.myAddress.address)

        if (pickerCar.index == 0) {
            util.openMess('请选择车型')
            return false
        }
        if (indexCar == 0) {
            util.openMess('请选择车辆')
            return false
        } else {
            CarProvinceName = carChoose.Province
            CarCityName = carChoose.City
            CarNumArea = carChoose.Code
        }

        if (Vin == '' || IdCard == '' || Mobile == '' || CarProvinceName == '' || PermanentAddress == '' || CarCityName == '' || CarNumArea == '' || CarNum == '' || ApparentMileage == '' || CarColor == '' || FirstLicenceTime == '' || ManufactureDate == '' || TransferNum == '') {
            animation.height(40).step()
            that.setData({
                errorMess: '请完善资料',
                animationData: animation.export()
            }, function () {
                setTimeout(function () {
                    animation.height(0).step()
                    that.setData({
                        errorMess: '',
                        animationData: animation.export()
                    })
                }, 3000)
            })
        } else {
            let M = util.Verification.telephone(Mobile),
                V = util.Verification.carFrame(Vin),
                C = util.Verification.carNumber(CarNum);
            if (M && V && C) {
                let data = {
                    OpenId: OpenId,
                    CarModelId: CarModelId,
                    Vin: Vin,
                    PermanentAddress: PermanentAddress,
                    Name: Name,
                    Mobile: Mobile,
                    IdCard: IdCard,
                    CarProvinceName: CarProvinceName,
                    CarCityName: CarCityName,
                    CarNumArea: CarNumArea,
                    CarNum: CarNum,
                    ApparentMileage: ApparentMileage,
                    CarColor: CarColor,
                    FirstLicenceTime: FirstLicenceTime,
                    ManufactureDate: ManufactureDate,
                    TransferNum: TransferNum,
                    FilePath: idcard.FilePath
                }
                util.myPost(Url.CreateOrder, data, function (res) {
                    if (res.code == 0) {
                        let mydata = res.data
                        wx.setStorageSync('OrderId', mydata.OrderId)
                        wx.setStorageSync('CustomerId', mydata.CustomerId)
                        wx.setStorageSync('CarId', mydata.CarId)
                        util.openMess('录入成功', 'seccess')
                        setTimeout(function () {
                            wx.redirectTo({
                                url: '/pages/beforeLoan/vehicleEvaluation/evaluationMess/evaluationMess?OrderId=' + mydata.OrderId,
                            })
                        }, 1500)
                    } else {
                        util.openMess(res.desc)
                    }
                }, false);
            }
        }
    },
    showPickerArea: function () {
        let proviceData = this.data.proviceData;
        this.animation = util.animation
        util.animation.bottom(0).step()
        this.setData({
            isShow: true,
            myAnimation: util.animation.export(),
            value: [0, 0, 0]
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
        let that = this
        util.myPost(Url.GetAreaList, { 'KeyValue': '' }, function (res) {
            if (res.code == 0) {
                let mydata = res.data
                //   util.addDot(mydata);
                const firstProvince = mydata[0];
                that.getCity(firstProvince.AreaCode)
                that.setData({
                    proviceData: mydata,
                    // 'selectedProvince.index': 0,
                    // 'selectedProvince.code': firstProvince.AreaCode,
                    // 'selectedProvince.fullName': firstProvince.AreaName,
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
                    // 'selectedCity.index': 0,
                    // 'selectedCity.code': firstCity.AreaCode,
                    // 'selectedCity.fullName': firstCity.AreaName,
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
                    // 'selectedDistrict.index': 0,
                    // 'selectedDistric.code': firstDistrict.AreaCode,
                    // 'selectedDistric.fullName': firstDistrict.AreaName,
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
            myAddress = this.data.myAddress,
            proviceName = _data.proviceData[value[0]].AreaName,
            proviceCode = _data.proviceData[value[0]].AreaCode,
            cityName = _data.cityData[value[1]].AreaName,
            cityCode = _data.cityData[value[1]].AreaCode, districtName = '', districtCode = ''
        if (_data.districtData.length>0){
            districtName = _data.districtData[value[2]].AreaName
             districtCode = _data.districtData[value[2]].AreaCode
        }
        let  address = { "ProvinceCode": proviceCode, "ProvinceName": proviceName, "CityCode": cityCode, "CityName": cityName, "DistrictCode": districtCode, "DistrictName": districtName, "Address": "" },
            addressMess = proviceName + cityName + districtName
        myAddress.address = address
        myAddress.addressMess = addressMess
        this.setData({
            myAddress: myAddress
        })
        this.hidePicker()
    },
    addressDetailChange: function (e) {
        let add = e.detail.value,
            myAddress = this.data.myAddress
        myAddress.address.Address = myAddress.addressDetail = add
        this.setData({
            myAddress: myAddress
        })
    }
})