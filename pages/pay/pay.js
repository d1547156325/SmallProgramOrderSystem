var app = getApp();
var util = require("../../utils/util.js");


var timestamp =

  Date.parse(new Date());

//返回当前时间毫秒数

timestamp = timestamp / 1000;

//获取当前时间

var n = timestamp *
  1000;

var date = new Date(n);

//年

var Y =
  date.getFullYear();
//月

var M = (date.getMonth()

  + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//日

var D = date.getDate()

  < 10 ? '0' + date.getDate() :

  date.getDate();

//时

var h =

  date.getHours();

//分

var m =

  date.getMinutes();

//秒

var s =

  date.getSeconds();



Page({
  data: {
    block: false,
    restaurant: false,
    check: true,
    cararray : [],
    totalPrice : 0,
    customer : {},
    time : {},

    showPayPwdInput: false,  //是否展示密码输入层

    pwdVal: '',  //输入的密码

    payFocus: true, //文本框焦点
  },


  onLoad: function() {

    var that = this;
    var carArray = app.globalData.carArray2
    var totalPrice = app.globalData.totalPrice
    console.log(carArray)

    wx.getSystemInfo({
      success: function(res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight + 15
        });
        console.log("ff" + that.data.scrollHeight)
      }
    })

    that.setData({
      time: h+ ":" + m,
    });

    var openid = app.globalData.sopenid
    that.setData({
      cararray :carArray,
      totalPrice : totalPrice
    })
    wx.getStorage({
      key: 'sessionId',
      success: function (res) {
        wx.request({
          //url: 'http://25h82466p1.wicp.vip/AppCus/searchCus',
          url: 'http://meimingzi.store:9080/orderSystem/AppCus/searchCus',
          method:'get',
          data:{
              openid : res.data
          },
          success:res=>{
            var customer = res.data.customer
            that.setData({
              customer : customer
            })
            console.log(that.data.customer)
          }
        })
      },

      fail:function(res) {
        wx.switchTab({
          url: '../mine/mine',
        })
        setTimeout(function () {
          wx.showToast({
            title: '您未登录',
          })
        },1000)
      }
    })
    
  },


  calling: function() {
    wx.makePhoneCall({
      phoneNumber: '18271344955',
      success: function() {
        console.log("拨打电话成功！")
      },
      fail: function() {
        console.log("拨打电话失败！")
      }
    })
  },

  Block: function() {
    this.setData({
      block: true
    })
  },
  takeOut: function() {
    this.setData({
      restaurant: false
    })
  },
  Cancel: function() {
    this.setData({
      block: false,
      check: true,
      restaurant: false
    })
  },
  Ok: function() {
    var that = this;
    this.setData({
      block: false,
    })
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res);
        that.setData({
          restaurant: true
        })
      },
      fail: (res) => {
        that.setData({
          restaurant: false,
          check: true
        });
      }
    })
  },

  toMyAddress: function() {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },


  submitOrder: function() {
    var that = this
    var cid = that.data.customer.id
    var totalPrice = that.data.totalPrice
    var carArray = that.data.cararray

    console.log(carArray)
    var indexs = new Array();
    var counts = new Array();
    for(var i in carArray){
      indexs[i] = carArray[i].index
      counts[i] = carArray[i].num
    }

    if (that.data.customer.cname == "" || that.data.customer.cname == null){
      setTimeout(function () {
        wx.showToast({
          title: '请填写信息',
        },1000)

        wx.navigateTo({
          url: '../address/address',
        }, 2000)
      })
    }else{
      this.showInputLayer()
      //---
    }
  },



/**
   * 显示支付密码输入层
   */
showInputLayer: function() {
  this.setData({ 
    showPayPwdInput: true, 
    payFocus: true 
  });
},


/**
 * 隐藏支付密码输入层
 */
hidePayLayer: function() {
  var that = this

  var val = that.data.pwdVal;
  var password = that.data.customer.ctel

  var cid = that.data.customer.id
  var totalPrice = that.data.totalPrice
  var carArray = that.data.cararray

  console.log(carArray)
  var indexs = new Array();
  var counts = new Array();
  for (var i in carArray) {
    indexs[i] = carArray[i].index
    counts[i] = carArray[i].num
  }

  that.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' }, function () {
    if (val == password.substring(5, password.length)) {
      wx.request({
        //url: 'http://25h82466p1.wicp.vip/AppOrd/Buy',
        url: 'http://meimingzi.store:9080/orderSystem/AppOrd/Buy',
        method: 'get',
        data: {
          cId: cid,
          totalPrice: totalPrice,
          pid: indexs,
          ocount: counts
        },
        success: res => {
          if (res.data.success == true) {
            app.globalData.totalPrice = 0;
            app.globalData.carArray2 = null;
            setTimeout(function () {
              wx.showToast({
                title: '购买成功',
              },1000)
              wx.switchTab({
                url: '../order/order',
              }, 2000)
            })
          }
        },
      })
    //--
    }
    else {
      wx.showToast({
        title: '支付失败',
      })
    }
  });
},

/**
 * 忘记密码
 */
forGet:function(){
  var that = this
  var password = that.data.customer.ctel

  wx.showModal({
    title: '提示',
    content: '您的密码为：' + password.substring(5, password.length),
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else {
        console.log('用户点击取消')
      }
    }
  })
},

/**
 * 获取焦点
 */
getFocus: function() {
  this.setData({ 
    payFocus: true 
    });
},
/**
 * 输入密码监听
 */
inputPwd: function(e) {
  this.setData({ pwdVal: e.detail.value });

  if (e.detail.value.length >= 6) {
    this.hidePayLayer();
  }
}
})
