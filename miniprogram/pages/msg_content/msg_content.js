// pages/msg_content/msg_content.js
var wxParse = require('../../wxParse/wxParse.js');
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
        this.getMsgList();
    },
    getMsgList: function (isNext = false) {
        var _this = this, openid = wx.getStorageSync('openid');
        c.request("message/getMessageList", {
            openid: openid,
            page: _this.data.pageNo,
            size: 10
        }, function (res) {
            var list_str = JSON.stringify(res.info);
            var list = JSON.parse(list_str);
            if (res.info == null || res.info.length == 0) {
                _this.setData({
                    hasMore: false,
                    lists: []
                });
                return false;
            }
            if (isPage) {
                //下一页的数据拼接在原有数据后面
                list = _this.data.list.concat(list);
                _this.setData({
                    lists: list
                });
            } else {
                //第一页数据直接赋值
                _this.setData({
                    lists: list
                });
            }
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