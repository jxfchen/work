// pages/task/task.js
var c = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskList: null,
    moneyInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid();
    this.getTaskList();
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
  getTaskList: function () {
    var self = this;
    c.request("activity/index", {
    }, function (res) {
      if (2000 == res.code) {
        self.setData({
          taskList: res.info
        })
      }
    }, function () {
      console.log('fail');
    })
  },
  getMyMoney: function (openid = null) {
    var self = this;
    if (openid != null) {
      c.request("wechatuser/getAccount", {
        openid: openid
      }, function (res) {
        if (2000 == res.code) {
          self.setData({
            moneyInfo: res.info
          })
        }
      }, function () {
        console.log('fail');
      })
    }
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