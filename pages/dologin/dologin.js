// pages/dologin/dologin.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //事件处理函数
  doLogin(e) {
    console.log(e.detail);
    wx.login({
      success: (res) => {
        console.log(res);
        // 获取登录临时凭证
        const { code } = res;
        // 调用后端，获取微信的sessi    0on_key, 

        wx.request({

          // 自行补上自己的 APPID 和 SECRET

          //url: 'http://localhost:8080/AppLogin/doLogin',
          //url: 'http://25h82466p1.wicp.vip/AppLogin/doLogin',
          url: 'http://meimingzi.store:9080/orderSystem/AppLogin/doLogin',
          method: 'get',
          data: {
            //appid: wx8d87127163bbef11,

            code: res.code
          },
          success: res => {

            // 获取到用户的 sessionId
            var that = this
            console.log("用户的sessionId:" + res.data.sessionId);
            wx.setStorage({
              key: 'sessionId',
              data: res.data.sessionId,
            })
            wx.getStorage({
              key: 'sessionId',
              success: function (res) {
                console.log(res.data)
                app.globalData.sopenid = res.data
              },
            })
          }
        });
        app.globalData.judge = true;
        wx.reLaunch({
          url: '../empower/empower'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})