var c = require("../../utils/http.js");
var baseUrl = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infos: null,
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOpenid(options.id)
  },
  getOpenid: function(id) {
    var _this = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        console.log(res)
        _this.setData({
          openid: res.data
        }, function() {
          _this.geDetailInfo(id);
        })
      }
    });
  },
  getDetail: function(e) {
    this.geDetailInfo(e.currentTarget.dataset.nextid == "" ? 0 : e.currentTarget.dataset.nextid);
  },
  geDetailInfo: function(id) {
    let _this = this;
    c.request("servicedialy/getDetailById", {
      id: id,
      openid: _this.data.openid
    }, function(res) {
      if (2000 == res.code) {
        res.info.article = _this.delHtmlTag(res.info.article);
        res.info.avatarurl = res.info.avatarurl.indexOf('http') >= 0 ? res.info.avatarurl : baseUrl.config.image_base_url + res.info.avatarurl;
        _this.setData({
          infos: res,
        });
      } else {
        wx.showToast({
          title: res.msg || '未找到信息',
          icon: "none"
        })
      }
    }, function() {
      console.log('fail');
    })
  },
  delHtmlTag: function(str) {
    var reg = new RegExp("<[^>]+>", "g");
    var result = str.replace(reg, '');
    return result;
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