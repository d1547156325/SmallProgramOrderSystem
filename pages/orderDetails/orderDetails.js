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

  +
  1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//日

var D = date.getDate()

  <
  10 ? '0' + date.getDate() :

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
    orderId: null,
    list: [],
    pid : null,
    totalprice : 0,
    odatetime : null,
    customer : {},
    scrollHeight: 0,
    logistics: false,
    userInfo: '',
    orderStatus: 1, // 0未付款 1已接单 2派送中 3已完成
    time: {},
    markers: [{
        iconPath: "../../images/me.jpg",
        id: 0,
        latitude: 30.725313499999995,
        longitude: 111.3086213,
        width: 40,
        height: 40
      },
      {
        iconPath: "../../images/me.jpg",
        id: 1,
        latitude: 30.725313499999995,
        longitude: 111.3086213,
        width: 40,
        height: 40
      }
    ],
    polyline: [{
      points: [{
        longitude: 111.3086213,
        latitude: 30.725313499999995
      }, {
        longitude: 111.3086213,
        latitude: 30.725313499999995
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
  },
  //获取当前位置
  onLoad: function(options) {
    var that = this;
    that.setData({
      orderId: options.oid,
      pid : options.pid,
      totalprice : options.totalprice,
      odatetime : options.odatetime
    });
    wx.getSystemInfo({
        success: function(res) {
          console.info(res.windowHeight);
          that.setData({
            scrollHeight: res.windowHeight
          });
          console.log("ff" + that.data.scrollHeight)
        }
      }),
      that.setData({
        time: h + ":" + m,
      }),

      wx.request({
        url: 'http://meimingzi.store:9080/orderSystem/AppCus/CusById',
        method : 'get',
        data : {
          id : that.data.pid
        },
        success: function(res){
          console.log(res.data)
          var customer = res.data.cusOne;
          that.setData({
            customer: customer
          })
        }
      }),
      wx.request({
        url: 'http://meimingzi.store:9080/orderSystem/AppOrd/ordDetByOId',
        method: 'get',
        data: {
          Oid: that.data.orderId, 
        },
        success: function(res) {
          console.log(res.data)
          var orderitems = res.data.orderDetailList;
          that.setData({
            list: orderitems
          })
          console.log(that.data.list[0]);
        },

      }),
      wx.getUserInfo({
        success: function(res) {
          console.log(res)
          that.setData({
            userInfo: res.userInfo
          })
        }
      })
    if (this.data.orderStatus == 1) {
      var shopAddress = [{
        iconPath: "../../icons/商家.png",
        id: 0,
        name: '店家地址',
        desc: '店家地址',
        latitude: 30.725313499999995,
        longitude: 111.3086213,
        width: 16,
        height: 16,
        callout: {
          content: '店家地址',
          display: 'ALWAYS',
          borderRadius: 2,
          bgColor: '#ffe400',
          padding: 10
        },
      }];
      var callout = [{

      }]
      this.setData({
        markers: shopAddress,
        polyline: ''
      })
    }
    var that = this
    wx.getLocation({
      success: function(res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          }
        })
      }
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  calling: function() {
    wx.showModal({
      title: '',
      content: '催单成功，请耐心等待！',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  toApply: function() {
    wx.showModal({
      title: '',
      content: '你的退款申请已提交，等待商家处理！',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  logToTrue: function() {
    this.setData({
      logistics: true
    })
  },
  logToFalse: function() {
    this.setData({
      logistics: false
    })
  },
  toEvaluate: function() {
    wx.navigateTo({
      url: '../evaluate/evaluate',
    })
  }
})