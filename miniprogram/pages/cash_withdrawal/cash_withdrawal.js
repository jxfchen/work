// pages/cash_withdrawal/cash_withdrawal.js
var c = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      prolist: [
          {
              name: "100元",
              id: 100,
          }, {
              name: "200元",
              id: 200,
          }, {
              name: "500元",
              id: 500,
          }, {
              name: "1000元",
              id: 1000,
          }, {
              name: "2000元",
              id: 2000,
          }
      ],
      money:'',
  },
    clas: function (e) {
        let that = this;
        let a = e.currentTarget.dataset.index;
        let money = e.currentTarget.dataset.id;
        that.setData({
            rad: a,
            money: money, // 服务id
        })
        console.log(money);
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
  },
    bindClick(e) {
        var that = this;
        var money = that.data.money;
        var openid = wx.getStorageSync('openid');
        c.request("wechatuser/getWithdraw", {
            openid: openid,
            money: money,
        }, function (res) {
            wx.showToast({
                title: '提现成功',
            })
        }, function () {
            console.log('fail');
        })
    },
  /**
   * 
   * 
   * 
   * 
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