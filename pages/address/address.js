var app = getApp();
var QQMapWX = require('../../qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    openid : null,
    list : {},
    id: '先生',
    city: '点击选择',
    caddress:null,
    name: '',
    phone: '',
    cityDetail: '',
    address: '',   //当前定位的城市
    nothing: false
  },
  onLoad: function () {
    var that = this;
    console.log(app.globalData.sopenid)
    wx.getStorage({
      key: 'sessionId',
      success: function(res) {
        wx.request({
          //url: 'http://25h82466p1.wicp.vip/AppCus/searchCus',
          url: 'http://meimingzi.store:9080/orderSystem/AppCus/searchCus',
          method: 'get',
          data: {
            openid: res.data
          },
          success: function (res) {
            console.log(res.data.customer)
            var cus = res.data.customer;
            that.setData({
              list: cus
            })
            console.log(that.data.list);
          },
        })
      },
      fail:function(res){
        wx.reLaunch({
          url: '../mine/mine',
        })
        wx.showToast({
          title: '您没有登录',
        })
      }
    })
  },

  getAddress: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        /*
        if (res.address.length > 10) {
          res.address = res.address.substr(0, 10) + '...'
        }
        */
        that.setData({
          city: res.address
        })
      },
    })
  },
  chooseId: function(e) {
    var type = e.currentTarget.dataset.id;
    this.setData({
      id: type
    })
  },
  toEditAddress: function() {
    this.setData({
      pageType: 2
    })
  },
  noChoose: function() {
    this.setData({
      pageType: 1,
      city: '点击选择',
    })
  },
  setName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  setPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  setCityDetail: function(e) {
    this.setData({
      cityDetail: e.detail.value
    })
  },
  // saveAddress: function() {
  //   console.log(this.data)
  //   wx.navigateBack({
  //     url: '../address/address',
  //   })   
  //   wx.request({
  //     url: '',
  //     data: this.data,
  //     success: function(res) {
  //       console.log(res)
  //     }
  //   })
  // },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var openid = app.globalData.sopenid
    console.log(openid)
    if (e.detail.value.name == ""){
      wx.showToast({
        title: '请填写姓名',
      })
    }
    else if (e.detail.value.city == "点击选择"){
      wx.showToast({
        title: '请选择地址',
      })
    }else {
      var customer = {
        cname : e.detail.value.name,
        sex : e.detail.value.sex,
        ctel : e.detail.value.phone,
        caddress : e.detail.value.city + e.detail.value.cityDetail,
        openid : openid
      }
      console.log(customer)
      wx.request({
        //url: 'http://25h82466p1.wicp.vip/AppCus/rvmCus',
        url: 'http://meimingzi.store:9080/orderSystem/AppCus/rvmCus',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method:'post',
        data:customer,
        success:res=>{
          console.log(res.data.success)
          if(res.data.success == true){
            wx.showToast({
              title: '保存成功',
            })
            setTimeout(function () {
              wx.switchTab({
                url: '../mine/mine',
              })
            }, 1000)
          }else{
            wx.showToast({
              title: '保存失败',
            })
          }
        }
      })
    }
  },


  formReset: function () {
    console.log('form发生了reset事件')
  }
})