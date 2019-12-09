// pages/task/task.js
var c = require("../../utils/http.js");
var baseUrl = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskList: null,
    moneyInfo: null,
    info: null,
    hide: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.getOpenid();
    // this.getTaskList();
    this.setData({
      imgurl: baseUrl.config.image_base_url
    })
    wx.getSystemInfo({
      success: function(res) {
        var Y = res.windowHeight * 80 / 100;
        that.setData({
          topValue: Y
        })
      }
    })
  },
  getOpenid: function() {
    var self = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        self.getMyMoney(res.data);
      }
    });
  },
  getMyMoney: function(openid = null) {
    var self = this;
    if (openid != null) {
      c.request("activity/index", {
        openid: openid
      }, function(res) {
        if (2000 == res.code) {
          self.setData({
            info: res,
            msg: res.info
          })
          console.log(res.info)
        }
      }, function() {
        console.log('fail');
      })
    }
  },
  saveImg: function () {
    let that = this
    wx.getSetting({
      success(res) {
        //未授权 先授权 然后保存
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(re) {
              that.saveToBlum();
            }
          })
        } else {
          //已授 直接调用保存到相册方法
          wx.showModal({
            title: '',
            content: '保存二维码到相册',
            confirmText: "保存",
            cancelText: "取消",
            success: function (res) {
              console.log(res);
              if (res.confirm) {
                that.saveToBlum();
              } else {
                return
              }
            }
          });
        }
      }
    })
  },
  saveToBlum: function () {
    var that = this
    let imgUrl = that.data.ewm;
    wx.getImageInfo({
      src: imgUrl,
      success: function (ret) {
        var path = ret.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(result) {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          },
        })
      }
    })
  },
  link: function(e) {
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
      }, function(res) {
        console.log(res)
        var img = that.data.imgurl
        // console.log(img + res.qrcode)
        that.setData({
          ewm: img + res.qrcode,
          hide: true
        })
      }, function() {
        console.log('fail');
      })
    }
  },
  close: function(e) {
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