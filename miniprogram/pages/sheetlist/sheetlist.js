var app = getApp();
var c = require("../../utils/http.js");
Page({
  data: {
    // 左侧点击类样式
    scrollTop: 0,
    listHeight: '',
    inputShowed: false,
    inputVal: "",
    list: [],
    curNav: 0,
    subclass: [],
  },
  onLoad: function (options) {
    // wx.showToast({
    //   icon: 'none',
    //   title: "成功",
    // })
    var that = this
    c.request("restaurant/getRestaurantType", {

    }, function (res) {
      console.log(res.info)
      that.setData({
        list: res.info,
        lid: res.info[0].id
      })
      wx.request({
        url: 'https://www.infinitybuild.cn/api.php/restaurant/getRestaurantList',
        data:{
          type: that.data.lid,
          page: 1,
          size: 20,
        },
        success: function (res) {
          console.log(res.data.infos)
          that.setData({
            lt: res.data.infos
          })
        }
      })
    }, function () {
      
    })
  },
  onShow: function () {
    var that = this
    
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {
    
  },
  //点击左侧 tab ，右侧列表相应位置联动 置顶
  switchRightTab: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var pid = e.currentTarget.dataset.id
    console.log(pid)
    app.pid = pid
    this.setData({
      scrollTopId: index,
      // 左侧点击类样式
      curNav: index,
      toView: index,
      vid: pid
    })
    console.log(that.data.vid)
    wx.request({
      url: 'https://www.teckwrap.cn/api.php/index/getCateByPid',
      data: {
        pid: that.data.vid
      },
      success: function (res) {
        console.log(res.data.info)
        that.setData({
          subclass: res.data.info
        })
      }
    })
  },
})