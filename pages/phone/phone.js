var app = getApp()
Page({
  data: {
    time: "获取验证码",
    currentTime: 61,
    disabled: false,
    suffix: '',
    data_phone: '',
    data_code: '',
    re_code:'',
  },

  // 获取输入框的值
  getInputKey(e) {
    let key = e.currentTarget.dataset.name;
    let value = e.detail.value;
    console.log(key)
    console.log(value)
    this.setData({
      [key]: value
    })
  },

  //获取手机验证码
  getCode(phone) {

  },

  // 获取验证码
  getVerificationCode() {
    let _this = this;
    if (!_this.data.disabled) {
      _this.getCode1();
    }
  },

  /**
   * 判断验证码
   */
  judgeNumber: function (e) {
    var that = this;
    var number = that.data.data_code;
    let phone = that.data.data_phone;
    if (that.isPhoneAvailable(phone)) {
      if (number == that.data.re_code && number != '' && that.data.disabled == true) {
        that.setData({
          data_code: '',
          re_code: ''
        })
        wx.request({
          //url: 'http://25h82466p1.wicp.vip/AppLogin/rvmCusNum',
          url: 'http://meimingzi.store:9080/orderSystem/AppLogin/rvmCusNum',
          method:'get',
          data:{
              openid : app.globalData.sopenid,
              phone : phone
          },
          success:res=>{
            if(res.data.success == true){
              that.showToast('success', "绑定成功")
              wx.reLaunch({
                url: '../mine/mine',
              })
            }else{
              that.showToast('none', "绑定失败")
            }
          }
        })
      }
      else {
        that.showToast('success', "验证码错误")
      }
    } else {
      that.showToast('none', '请输入正确的手机号码');
    }
  },

  getCode1() {
    let _this = this;
    // 设置发送验证码按钮样式
    let phone = _this.data.data_phone;
    if (_this.isPhoneAvailable(phone)){
            wx.request({
              //url: 'http://25h82466p1.wicp.vip/AppLogin/SMS',
              url: 'http://meimingzi.store:9080/orderSystem/AppLogin/SMS',
              method:'get',
              data: {
                telephone: phone
              },
              success:res=>{
                _this.showToast('success', "已发送");
                _this.setData({
                  disabled: true,
                  re_code : res.data.code
                })
                console.log(_this.data.re_code)
              }
              /*
              => {
                _this.showToast('none', "发送失败")
                */
            })

          let interval = null;
          let currentTime = _this.data.currentTime;

          interval = setInterval(function () {
            currentTime--;
            _this.setData({
              time: currentTime,
              suffix: '秒后可重新获取'
            })
            if (currentTime <= 0) {
              clearInterval(interval)
              _this.setData({
                time: '重新发送',
                suffix: '',
                currentTime: 61,
                disabled: false
              })
            }
          }, 1000)
          }else{
            _this.showToast('none', '请输入正确的手机号码');
          }
        } ,

    // 验证手机号码是否有效
    isPhoneAvailable(phone) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(phone)) {
      return false;
    } 
    else {
      return true;
    }
  },

//小程序弹框提示
  showToast(icon, msg, duration = 2000) {
    wx.showToast({
      title: msg,
      duration: duration,
      icon: icon
    })
  }

})
