var c = require("../../utils/http.js");
var wxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    background: ["/images/banner.png", "/images/banner.png", "/images/banner.png", "/images/banner.png", "/images/banner.png"],
    pushList: [],
    id: undefined,
    status: "true",
      info: null,
      hide: false,
  },
  ellipsisbtn: function() {
    var status = this.data.status;
    var that = this;
    if (status == "false") {
      that.setData({
        status: "true"
      })
    } else {
      that.setData({
        status: "false"
      })
    }
    console.log(status);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var id = this.data.id;
    id = options.title;
    this.setData({
      id: id
    })
    console.log(id);
    c.request("restaurant/getDetailById", {
      id: id
    }, function(res) {
      console.log(res.info);
      console.log(res.info.title)
      app.title = res.info.title
      console.log(app.title)
      var description = res.info.description
      var des = res.info.description.split(',')
      console.log(des)
      that.setData({
        infos: res.info,
        des: res.info.description.split(','),
        key: res.info.keywords.split(',')
      });
      var temp = wxParse.wxParse('article', 'html', res.info.article, that, 5);
      
    }, function() {
      console.log('fail');
    })
    
  },
  home: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },
    getOpenid: function () {
        var self = this;
        wx.getStorage({
            key: 'openid',
            success: function (res) {
                self.getMyMoney(res.data);
            }
        });
    },
    getMyMoney: function (openid = null) {
        var self = this;
        if (openid != null) {
            c.request("activity/index", {
                openid: openid
            }, function (res) {
                if (2000 == res.code) {
                    self.setData({
                        info: res,
                        msg: res.info
                    })
                    console.log(res.info)
                }
            }, function () {
                console.log('fail');
            })
        }
    },
    link: function (e) {
        var id = e.currentTarget.dataset.id
        console.log(id)
        var that = this
        if (id == 'me/me') {
            wx.switchTab({
                url: '../' + id,
            })
        } else if (id == 'sheetlist/sheetlist') {
            wx.navigateTo({
                url: '../' + id,
            })
        } else if (id == 'yaoqing') {
            var openid = wx.getStorageSync('openid')
            c.request("activity/qrcode", {
                openid: openid
            }, function (res) {
                console.log(res)
                var img = that.data.imgurl
                // console.log(img + res.qrcode)
                that.setData({
                    ewm: img + res.qrcode,
                    hide: true
                })
            }, function () {
                console.log('fail');
            })
        }
    },
    close: function (e) {
        var that = this
        that.setData({
            hide: false
        })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})