//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    imgUrls: [
      '../../images/1.png',
      '../../images/3.png',
      '../../images/4.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  
  gomenu: function () {
    wx.navigateTo({
      url: '../menu/menu'
    })
  },

  onShow: function (e) {
    this.onLoad()
  },

  onLoad:function(){
    /**
    * 判断是否登录状态
    */
    var that = this
    wx.getStorage({
      key: 'sessionId',
      success: function (res) {
        console.log(res.data)
        app.globalData.sopenid = res.data
        wx.request({
          //url: 'http://25h82466p1.wicp.vip/AppLogin/session',
          url: 'http://meimingzi.store:9080/orderSystem/AppLogin/session',
          method: 'get',
          data: {
            sessionId: res.data
          },
          success: res => {
            console.log(res.data.success)
            if (res.data.success) {
              app.globalData.judge = true
              that.setData({
                judge: true,
                userInfo: that.data.userInfo
              });
            }
            else {
              app.globalData.judge = false
              that.setData({
                judge: false
              });
              wx.removeStorage({
                key: 'sessionId',
                success: function (res) { },
              })
            }
          }
        })
      }
    })
  },


  onPullDownRefresh: function () {
    this.onLoad()
  },

})



