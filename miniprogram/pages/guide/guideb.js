// pages/guide/guidea.js
var c = require("../../utils/http.js");
var wxParse = require('../../wxParse/wxParse.js');
var baseUrl = require("../../utils/config.js");
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
    // console.log(options.code)
    console.log(options.id)
    if (options.code == 'article/getOperationManualList'){
      // console.log('操作手册')
      var url = 'article/getDetailById'
    } else if (options.code == 'index/getQuestionLists'){
      // console.log('常见问题')
      var url = 'index/getQuestionDetail'
    }
    console.log(url)
    c.request(url, {
      id: options.id
    }, function (res) {
      console.log(res)
      that.setData({
        info: res.info,
        url: baseUrl.config.image_base_url,
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