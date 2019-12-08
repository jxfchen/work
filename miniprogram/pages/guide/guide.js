// pages/msg_content/msg_content.js
var wxParse = require('../../wxParse/wxParse.js');
var c = require("../../utils/http.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      code: options.code
    })
    console.log(that.data.code)
    this.getMsgList();
  },
  getMsgList: function (isNext = false) {
    var that = this
    var openid = wx.getStorageSync('openid');
    var code = 'article/' + that.data.code
    console.log(this.data.code)
    c.request(code, {}, function (res) {
      console.log(res)
      that.setData({
        info: res.info
      })
      var temp = wxParse.wxParse('article', 'html', res.info.article, that, 5);
    }, function () {
      console.log('fail');
    })
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