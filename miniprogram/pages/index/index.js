//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customItem: '全部',
    list: [{
      pic: '/images/show.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show2.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show1.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show2.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show1.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show1.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show2.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show2.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show1.jpg',
      position: 'center',
      height: ''
    }],
    leftHeight: 0,
    rightHeight: 0,
    picHeight: '',
    swiperCurrent: 0,
    noticeList: [{
      content0: "恭喜02000号推客成功提现12800元！",
    },
    {
      content0: "恭喜02000号推客成功提现12800元！",
      }], 
    province: '',
    city: '',
    latitude: '',
    longitude: ''
  },

  
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.detail.current
    })
  },

  /**
   * 图片手动滑动时，获取当前的轮播id
   */
  imageChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.currentTarget.id
    })
  },


  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var list={
        address_img:"/images/address.png",
        region: ['山东省', '济南市', '全部'],
        arrow_img:"/images/arrow.png",
        background: ["/images/timg.jpg", "/images/timg.jpg", "/images/timg.jpg"],
        notice_img:"/images/address.png",
        logo1:"/images/task1.png"
      }
      this.setData(list);
    qqmapsdk = new QQMapWX({
      key: 'XXXX-XXXX-XXXX-XXXX' //这里自己的key秘钥进行填充
    });

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
    let vm = this;
    vm.getUserLocation();
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  imageLoadLeft: function (e) {

    //获取图片的原始宽度和高度

    let originalWidth = e.detail.width;

    let originalHeight = e.detail.height;

    let picHeight = this.data.picHeight
    picHeight = 165 / originalWidth * originalHeight

    var list = this.data.list

    let index = e.currentTarget.dataset.index
    list[index].height = picHeight
    this.setData({
      list: list
    })

    this.data.leftHeight += picHeight

  },

  //右边的图片高度之和
  imageLoadRight: function (e) {

    //获取图片的原始宽度和高度

    let originalWidth = e.detail.width;

    let originalHeight = e.detail.height;

    let picHeight = this.data.picHeight
    picHeight = 165 / originalWidth * originalHeight

    var list = this.data.list

    let index = e.currentTarget.dataset.index
    list[index].height = picHeight
    this.setData({
      list: list
    })

    this.data.rightHeight += picHeight

  },
  height_: function () {
    var that = this
    var list = that.data.list
    setTimeout(() => {
      var leftHeight = that.data.leftHeight
      var rightHeight = that.data.rightHeight
      var disparity_ = ''
      disparity_ = Math.abs(leftHeight - rightHeight)
      var min_ = { a: 300, index: 0 }
      // console.log(disparity_)

      if (leftHeight > rightHeight && disparity_ > 100) {
        for (var i = 0; i < list.length; i += 2) {
          var tmp = Math.abs(list[i].height - disparity_) / 2
          if (tmp < min_.a) {
            min_ = { a: tmp, index: i }
            // console.log(min_)
          }
          // console.log(list[i].height, disparity_)

        }
        list[min_.index].position = 'right'
      }
      if (leftHeight < rightHeight && disparity_ > 100) {
        for (var i = 1; i < list.length; i += 2) {
          var tmp = Math.abs(list[i].height - disparity_) / 2
          if (tmp < min_.a) {
            min_ = { a: tmp, index: i }
            // console.log(min_)
          }

          // console.log(list[i].height, disparity_)
        }
        list[min_.index].position = 'left'
      }
      console.log(list)
      this.setData({
        list: list
      })
    }, 1000)
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