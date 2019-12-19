var c = require("../../utils/http.js");
var baseUrl = require("../../utils/config.js");
// pages/xinpin/xinpin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clkindex: '0',
    list: [],
  },
  clk: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../guide/guidea?code='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    c.request("article/getAssociationList", {
    }, function (res) {
      console.log(res)
      that.setData({
        list: res.infos,
        url: baseUrl.config.image_base_url,
      })
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
    var that = this
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
    //   let _this = this;
    //   if (_this.data.hasMore) {
    //       _this.setData({
    //           pageNo: _this.data.pageNo + 1
    //       })
    //       _this.getList(true, false);
    //   }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})