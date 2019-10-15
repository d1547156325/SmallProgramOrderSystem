var app = getApp();

Page({
  data: {
    userInfo: {},
    judge: false
  },

  gotologin: function (e) {
    wx.navigateTo({
      url: '../dologin/dologin',
    })
  },

  /**
 * 退出账号，删除session
 */
  removeSession: function (e) {
    var that = this
    /*
    wx.getStorage({
      key: 'sessionId',
      success: function (res) {
        console.log(res.data)
        wx.request({
          url: 'http://25h82466p1.wicp.vip/AppLogin/rvmsession',
          method: 'get',
          data: {
            sessionId: res.data
          },
          success: res => {
            that.setData({
              judge : false
            })
            wx.showToast({
              title: '退出成功',
            })
            that.onLoad()//重点 
          }
        })
      }
    }),
    */

    wx.removeStorage({
      key: 'sessionId',
      success: function (res) {
        app.globalData.judge = false
        app.globalData.sopenid = null
        that.setData({
          judge: false
        })
        wx.showToast({
          title: '退出成功',
        })
        that.onLoad()//重点 
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onshow:function(){
    var that = this;
    /**
     * 判断是否登录状态
     */
    wx.getStorage({
      key: 'sessionId',
      success: function (res) {
        console.log(res.data)
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
                judge: true
              });
            }
            else {
              app.globalData.judge = false
              wx.removeStorage({
                key: 'sessionId',
                success: function(res) {},
              })
              that.setData({
                judge: false
              });
            }
            console.log(that.data.judge)
          }
        })
      },
    });
  },




/**
 * 初级进入页面
 */
  onLoad: function (option) {
    var that = this;
    this.data.userInfo = app.globalData.userInfo
    that.data.judge = app.globalData.judge
    /**
     * 判断是否登录状态
     */
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
                userInfo : that.data.userInfo
              });
              wx.showToast({
                title: '登录成功',
              })
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
      },
    });
    /*
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo
            })
          }
        })
      }
    });
    */
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    var that = this;
    /**
     * 判断是否登录状态
     */
    wx.getStorage({
      key: 'sessionId',
      success: function (res) {
        console.log(res.data)
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
                judge: true
              });
            }
            else {
              app.globalData.judge = false
              that.setData({
                judge: false
              });
            }
            console.log(that.data.judge)
          }
        })
      },
    });
  },
})