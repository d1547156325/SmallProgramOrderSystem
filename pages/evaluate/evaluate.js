var app = getApp();


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
    choose: false,
    imgPath: '../../images/pic.png',
    imgPath2: '',
    imgPath3: '',
    imgLen: 0,
    temp: [],
    pid:0,
    oid:0,
    content:'',
    time :''
  },
  
  choose: function() {
    this.setData({
      choose: !this.data.choose
    })
  },

  choosePic: function () {
    console.log(this.data.temp)
    var that = this;
    if (this.data.imgPath == '../../images/pic.png'){
     wx.chooseImage({
       count: 3,
       sizeType: ['original', 'compressed'],
       sourceType: ['album', 'camera'],
       success: function (res) {
         var len = res.tempFilePaths.length;
         var temp = [that.data.imgPath2, that.data.imgPath3, that.data.imgPath];
         if (that.data.imgLen == 0) {
           for (var i = 0; i < len; i++) {
             temp[i] = res.tempFilePaths[i];
           }
         } else {
           for (var i = that.data.imgLen, j = 0; j < len&&i<3; i++ , j++) {
             temp[i] = res.tempFilePaths[j];
             console.log(temp)
           }
         }
         var len2 = len + that.data.imgLen;
         if (len2>3){
            len2 = 3;
         }
         that.setData({
           imgLen: len2,
           temp: temp,
           imgPath2: temp[0],
           imgPath3: temp[1],
           imgPath: temp[2],
         });
       }
     })
   }
  },

  onLoad:function(options){
    console.log("+"+options.oid)
    console.log("+"+options.pid)
    this.setData({
      oid: options.oid,
      pid : options.pid
    })
  },

  bindWordLimit:function(e){
    var content = e.detail.value
    this.setData({
      content : content
    })
  },


  toSubmit: function (e) {
    var openid = app.globalData.sopenid;
    var oId = this.data.oid
    var content = this.data.content + + Y + "/" + M + "/" + D

    wx.getStorage({
      key: 'sessionId',
      success: function(res) {
        console.log(res.data)
        console.log(content)
        console.log(oId)
        wx.request({
          url: 'http://meimingzi.store:9080/orderSystem/AppRem/addRem',
          method:'get',
          data:{
            oId : oId,
            openid : res.data,
            content : content
          },
          success:res=>{
            console.log(res.data.success)
            if(res.data.success == 1){
              wx.showToast({
                title: '评价成功',
              })
              wx.reLaunch({
                url: '../order/order',
              })
            }
            else{
              wx.showToast({
                title: '评价失败',
              })
            }
          }
        })
      },
      fail:function(res){
        wx.showToast({
          title: '您未登陆',
        })
        wx.reLaunch({
          url: '../mine/mine',
        })
      }
    })

/*
    wx.uploadFile({
      url: '',
      filePath: this.data.imgPath,
      name: 'file',
      formData: {

      },
      success: function (res) {
        console.log(res);
      }
    })
    */
  },
  
  del: function(e) {
    var i = e.currentTarget.dataset.id;
    if(i==0){
      if (this.data.imgPath != '../../images/pic.png') {
        this.setData({
          imgPath2: this.data.imgPath3,
          imgPath3: this.data.imgPath,
          imgPath: '../../img/pic.jpg',
          imgLen: this.data.imgLen - 1
        })
      }else {
        this.setData({
          imgPath2: this.data.imgPath3,
          imgPath3: '',
          // imgPath2: '',
          imgLen: this.data.imgLen - 1
        })
      }      
    }else if(i==1) {
      if (this.data.imgPath != '../../images/pic.png') {
        this.setData({
          imgPath3: this.data.imgPath,
          imgPath: '../../images/food.jpg',
          imgLen: this.data.imgLen - 1
        })
      } else {
        this.setData({
          imgPath3: '',
          imgLen: this.data.imgLen - 1
        })
      }   
    }else if(i==2) {
      this.setData({
        imgPath: '../../images/pic.png',
        imgLen: this.data.imgLen - 1
      })
    }
  }
})