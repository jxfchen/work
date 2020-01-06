// pages/withdrawals_record/withdrawals_record.js
var c = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
    backtap(){
        wx.switchTab({
            url: '/pages/me/me'
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    var date = {
      list: '',
    }
    var openid = "";
    var that = this;
    var list = [];
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openid: res.data,
        })
        if (that.data.openid.length == 0) {
          that.setData({
            status: false
          });
        } else {
          that.setData({
            status: true
          })
        }
        c.request("wechatuser/getWithdrawLog", {
          openid: that.data.openid,
          page: "1",
          size: '9',
        }, function(res) {
          that.setData({
            info: res.info.account_log,
          });
          var list_str = JSON.stringify(res.info);
          list = JSON.parse(list_str);
          date.list = list;
          self.setData(date);
          console.log(res.info);
        }, function() {
          console.log('fail');
        })
      },
      fail: function(res) {
        console.log(res + "fail")
      }

    });
    this.setData(date);
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