// pages/medetail/medetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product : null,
    scrollHeight:0,
    userinfo:null,
    remList:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var product;
    var that = this
    for (var i in app.globalData.allPro) {
      if (app.globalData.allPro[i].id == options.index) {
        product = app.globalData.allPro[i]
      }
    }
    that.setData({
      product:product,
      userinfo:app.globalData.userInfo
    })

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
        console.log("ff" + that.data.scrollHeight)
      }
    });

    wx.request({
      //url: 'http://25h82466p1.wicp.vip/AppRem/allRem',
      url: 'http://meimingzi.store:9080/orderSystem/AppRem/allRem',
      method: 'get',
      success: res => {
        var list = res.data.remList;
        that.setData({
          remList: list
        })
      },
    })
    
  },

  onPullDownRefresh: function () {
    this.onLoad();
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