// pages/msg_content/msg_content.js
var wxParse = require('../../wxParse/wxParse.js');
var c = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    page: '',
    lists: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var page = this.data.page;
    page = options.page;
    var title = this.data.title;
    title = options.title;
    this.setData({
      title: title,
      page: page,
    });
    var notice_id = options.id;
    var that = this;
    var openid = "";
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openid: res.data,
        })
        c.request("message/getDetail", {
          openid: that.data.openid,
          message_id: notice_id,
        }, function(res) {
          that.setData({
            info: res.info,
          });
          var temp = wxParse.wxParse('article', 'html', res.info.title, that, 5);
        }, function() {
          console.log('fail');
        })
      },
      fail: function(res) {
        console.log("fail")
      }
    });
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