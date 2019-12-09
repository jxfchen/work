// pages/push_team/push_team.js
var c = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: '1',
  },
  bindManager(e) {
    const that = this;
    var flag = this.data.flag;
    var flag = '1';
    that.setData({
      flag: flag,
    })
    console.log(flag)
  },
  bindstaff(e) {
    const that = this;
    var flag = this.data.flag;
    var flag = '2';
    that.setData({
      flag: flag,
    })
    console.log(flag)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    var date = {
      list: '',
      melist: '',
    }
    var openid = "";
    var that = this;
    var list = [];
    var melist = [];
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
        c.request("wechatuser/getMyTeam", {
          openid: that.data.openid
        }, function(res) {
          that.setData({
            info: res.info,
          });
          var list_str = JSON.stringify(res.info);
          list = JSON.parse(list_str);
          date.list = list;
          self.setData(date);
          console.log(list);
        }, function() {
          console.log('fail');
        })
        c.request("wechatuser/getWechatInfo", {
          openid: that.data.openid
        }, function(res) {
          that.setData({
            info: res.info,
          });
          var melist_str = JSON.stringify(res.info);
          melist = JSON.parse(melist_str);
          date.melist = melist;
          self.setData(date);
          console.log(melist);
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