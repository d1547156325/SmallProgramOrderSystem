var app = getApp();
Page({
  data: {
    orders: [],
    customers: {},
    userInfo: {},
    status: null,
    scrollHeight: 0,
  },


  onPullDownRefresh: function () {
    this.onLoad()
  },

  onLoad: function(options) {
    var showtype = 0;
    var user = app.globalData.userInfo
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight - 40
        });
        console.log("ff" + that.data.scrollHeight)
      }
    }),
    that.setData({
      status: showtype,
      userInfo: user
    });
    console.log(that.data.status)
    wx.getStorage({
      key: 'sessionId',
      success: function(res) {
        if (showtype == 0) {
          wx.request({
            //url: 'http://25h82466p1.wicp.vip/AppOrd/searchOrder',
            url: 'http://meimingzi.store:9080/orderSystem/AppOrd/searchOrder',
            method: 'get',
            data: {
              openid: res.data
            },
            success: res => {
              var list = res.data.orders;
              var customer = res.data.customers
              console.log(list[0])
              console.log(customer)
              that.setData({
                orders: list,
                customers: customer
              })
            },
          })
        }
      },
      fail: function (res) {
        that.setData({
          orders: {},
        })
        wx.showToast({
          title: '您未登陆',
        })
      }
    })
  },

  onShow:function(e){
    this.onLoad()
  },


  toOrderDetail: function (e) {
    var that = this;
    var totalprice = null;
    var odatetime = null;
    var index = e.currentTarget.dataset.index;
    for (var i in that.data.orders) {
      if (that.data.orders[i].id == index) {
        totalprice = that.data.orders[i].totalprice;
        odatetime = that.data.orders[i].odatetime;
      }
    }
    console.log(index)
    wx.navigateTo({
      url: '../orderDetails/orderDetails?oid=' + index + '&pid=' + that.data.customers.id + '&totalprice=' + totalprice + '&odatetime=' + odatetime
    })

  },

  tabChange: function(e) {
    var showtype = e.target.dataset.type;
    var user = app.globalData.userInfo;
    var that = this;
    that.setData({
      status: showtype,
      userInfo: user
    });
    console.log(that.data.status)
    wx.getStorage({
      key: 'sessionId',
      success: function(res) {
        if (showtype == 0) {
          wx.request({
            //url: 'http://25h82466p1.wicp.vip/AppOrd/searchOrder',
            url:'http://meimingzi.store:9080/orderSystem/AppOrd/searchOrder',
            method: 'get',
            data: {
              openid: res.data
            },
            success: res => {
              var list = res.data.orders;
              var customer = res.data.customers;
              console.log(list[0])
              console.log(customer)
              that.setData({
                orders: list,
                customers: customer
              })
              if (list == null || list == ""){
                wx.showToast({
                  title: '无订单',
                })
              }
            }

          })
        } else {

          wx.request({
            //url: 'http://25h82466p1.wicp.vip/AppOrd/searchOrderBySta',
            url: 'http://meimingzi.store:9080/orderSystem/AppOrd/searchOrderBySta',
            method: 'get',
            data: {
              openid: res.data,
              sid: showtype
            },
            success: res => {
              var list = res.data.orders;
              var customer = res.data.customers
              console.log(list[0])
              that.setData({
                orders: list,
                customers: customer
              })
              if (list == null || list == "") {
                wx.showToast({
                  title: '无订单',
                })
              }
            }
          })
        }
      },

      fail:function(res){
        that.setData({
          list : null
        })
          wx.showToast({
            title: '您未登陆',
          })
      }
    })
  },

})