// pages/menu/menu.js
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
    goods: [],
    remList:[],
    listPro: [],
    allPro: [],
    count: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    catId: 1,
    toView: '0',
    scrollTop: 100,
    foodCounts: 1,
    totalPrice: 0, // 总价格
    totalCount: 0, // 总商品数
    carArray: [],
    minPrice: 20, //起送價格
    deliveryPrice: 4, //配送費
    fold: true,
    selectFoods: [{
      price: 20,
      count: 2
    }],
    cartShow: 'none',
    status: 0,

    scrollTop: 20,
    sumMonney:0,
    scrollHeight : 0,

     time: {},
  },
  /**
   * 选择分类
   */
  toGoodsDetail: function () {
    wx.navigateTo({
      url: '../goodsDetails/goodsDetails'
    })
  },

  selectMenu: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
        toView: 'order' + index.toString(),
        catId: index
      }),
      wx.request({
        //url: 'http://25h82466p1.wicp.vip/AppPro/catProList',
      url: 'http://meimingzi.store:9080/orderSystem/AppPro/catProList',
        method: 'get',
        data: {
          id: this.data.catId
        },
        success: res => {
          var list = res.data.listPro;
          var that = this;
          if (list.length == 0) {
            wx.showToast({
              title: '该分类下没有商品!',
              icon: 'none'
            })
          }
          that.setData({
            listPro: list
          })
        }
      })
    console.log(this.data.toView);
  },

/**
 * 跳转支付
 */
  goToPay:function(e){
    app.globalData.totalPrice = this.data.totalPrice
    wx.navigateTo({
      url: '../pay/pay',
    })
  },



  //移除商品
  decreaseCart: function(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var j
    var product
    for (var i in this.data.allPro) {
      if (this.data.allPro[i].id == index) {
        product = this.data.allPro[i]
        j = this.data.count[i] -= 1
        break;
      }
    }
    var num = j
    var mark = 'a' + index
    var price = product.pprice
    var name = product.pname;
    var ppic = product.ppic;
    var obj = {
      price: price,
      num: num,
      mark: mark,
      name: name,
      index: index,
      ppic: ppic
    };

    var carArray1
    if (this.data.carArray != {})
      carArray1 = this.data.carArray.filter(item => item.mark != mark);
    carArray1.push(obj);
    if (num == 0) {
      carArray1.pop(index, 1)
    }
    console.log(carArray1);
    this.setData({
      carArray: carArray1,
      //goods: this.data.goods
    })
    app.globalData.carArray2 = carArray1
    this.calTotalPrice()
    this.setData({
      payDesc: this.payDesc(),
    })

    //关闭弹起
    var count1 = 0
    for (let i = 0; i < carArray1.length; i++) {
      if (carArray1[i].num == 0) {
        count1++;
      }
    }

    //console.log(count1)
    if (count1 == carArray1.length) {
      if (num == 0) {
        this.setData({
          cartShow: 'none'
        })
      }
    }
  },

  /**
   * 清空购物车
   */
  empty: function(e) {
    var carArray1 = this.data.carArray

    console.log(carArray1.length)
    console.log(carArray1)
    for (let index = 1; index <= this.data.allPro.length; index++) {
      carArray1.pop(index, 1)
      this.data.count[index - 1] = 0
    }

    this.setData({
      count: this.data.count,
      carArray: carArray1,
      payDesc: this.payDesc()
    })
    app.globalData.carArray2 = carArray1

    this.calTotalPrice();
    //关闭弹起
    //console.log(count1)
    this.setData({
      cartShow: 'none'
    })
  },

  decreaseShopCart: function(e) {
    console.log('1');
    this.decreaseCart(e);
  },

  //跳转到商品详情
  goToDetail: function (e) {
    var index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: '../medetail/medetail?index=' + index,
      })
  },

  //添加到购物车
  addCart(e) {
    this.data.count.length = this.data.allPro.length;
    var index = e.currentTarget.dataset.index;
    var product;
    var j;
    //console.log(index)
    for(var i in this.data.allPro){
      if(this.data.allPro[i].id == index){
          product = this.data.allPro[i]
         this.data.count[i] += 1
          j = this.data.count[i]
      }
    }
    console.log(product)
    console.log(j)
    var mark = 'a' + index
    var price = product.pprice
    var num = j;
    var name = product.pname;
    var ppic = product.ppic;
    console.log(ppic)
    var obj = {
      price: price,
      num: num,
      mark: mark,
      name: name,
      index: index,
      ppic: ppic
    };
    var carArray1 = this.data.carArray.filter(item => item.mark != mark)
    carArray1.push(obj)
    this.setData({
      carArray: carArray1,
      //goods: this.data.goods
    })
    app.globalData.carArray2 = carArray1
    console.log(this.data.carArray);
    this.calTotalPrice();
    this.setData({
      payDesc: this.payDesc()
    })
  },

  addShopCart: function(e) {
    this.addCart(e);
  },

  //计算总价
  calTotalPrice: function() {
    //var carArray = this.data.carArray;
    var carArray = app.globalData.carArray2
    var totalPrice = 0;
    var totalCount = 0;
    if (carArray.length == 0) {
      this.setData({
        totalPrice: 0,
        totalCount: 0,
        payDesc: this.payDesc()
      });
    } else {
      for (var i = 0; i < carArray.length; i++) {
        totalPrice += carArray[i].price * carArray[i].num;
        totalCount += carArray[i].num
      }
      this.setData({
        totalPrice: totalPrice,
        totalCount: totalCount,
        payDesc: this.payDesc()
      });
    }
  },

  //差几元起送
  payDesc() {
    if (this.data.totalPrice === 0) {
      return `￥${this.data.minPrice}元起送`;
    } else if (this.data.totalPrice < this.data.minPrice) {
      let diff = this.data.minPrice - this.data.totalPrice;
      return '还差' + diff + '元起送';
    } else {
      return '去结算';
    }
  },

  //結算
  pay() {
    if (this.data.totalPrice < this.data.minPrice) {
      return;
    }
    // window.alert('支付' + this.totalPrice + '元');
    //确认支付逻辑
    var resultType = "success";
    wx.redirectTo({
      url: '../goods/pay/pay?resultType=' + resultType
    })
  },

  //彈起購物車
  toggleList: function() {
    if (!this.data.totalCount) {
      return;
    }
    this.setData({
      fold: !this.data.fold,
    })
    var fold = this.data.fold
    //console.log(this.data.fold);
    this.cartShow(fold)
  },


  cartShow: function(fold) {
    console.log(fold);
    if (fold == false) {
      this.setData({
        cartShow: 'block',
      })
    } else {
      this.setData({
        cartShow: 'none',
      })
    }
    console.log(this.data.cartShow);
  },

  tabChange: function(e) {
    var showtype = e.target.dataset.type;
    this.setData({
      status: showtype,
    });
  },


  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    /*
    this.setData({
      payDesc: this.payDesc()
    });
    */
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight-229.2
        });
        console.log("ff"+that.data.scrollHeight)
      }
    });

    wx.request({
        //url: 'http://25h82466p1.wicp.vip/AppCat/allCat',
      url: 'http://meimingzi.store:9080/orderSystem/AppCat/allCat',
        method: "post",
        success: res => {
          var goods = res.data.allCatList;
          var that = this;
          that.setData({
            goods: goods
          })
        }
      }),

      wx.request({
        //url: 'http://25h82466p1.wicp.vip/AppPro/allPro',
      url: 'http://meimingzi.store:9080/orderSystem/AppPro/allPro',
        method: 'get',
        success: res => {
          var list = res.data.listPro;
          var that = this;
          if (list.length == 0) {
            wx.showToast({
              title: '没有商品!',
              icon: 'loading'
            })
          }
          that.setData({
            listPro: list,
            allPro: list,
          })
          app.globalData.allPro = list
        }
      })

      wx.request({
        //url: 'http://25h82466p1.wicp.vip/AppRem/allRem',
        url: 'http://meimingzi.store:9080/orderSystem/AppRem/allRem',
        method:'get',
        success: res=>{
            var list = res.data.remList;
            that.setData({
              remList : list
            })
        },
      })
  },

  onPullDownRefresh: function () {
    this.onLoad();
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})