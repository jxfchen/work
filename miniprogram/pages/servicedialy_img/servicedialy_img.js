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
    this.setData({
      id: options.id,
    })
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
      console.log(e)
      var nextid = e.currentTarget.dataset.nextid;
      if(nextid==""){
          wx.showToast({
              title: '已是最后一页',
              icon: 'none'
          })
      }else{
          var openid = wx.getStorageSync('openid');
          let _this = this;
          c.request("servicedialy/getDetailById", {
              id: nextid,
              openid: openid
          }, function (res) {
              console.log(res)
              if (2000 == res.code) {
                  res.info.article = _this.delHtmlTag(res.info.article);
                  res.info.avatarurl = res.info.avatarurl.indexOf('http') >= 0 ? res.info.avatarurl : baseUrl.config.image_base_url + res.info.avatarurl;
                  _this.setData({
                      infos: res,
                      commend_times: res.info.commend_times,
                      is_commend: res.is_commend,
                      url: baseUrl.config.image_base_url
                  });
              } else {
                  wx.showToast({
                      title: res.msg || '未找到信息',
                      icon: "none"
                  })
              }
          }, function () {
              console.log('fail');
          })
      }
      
  },
  geDetailInfo: function(id) {
      let _this = this;
      console.log(id)
    c.request("servicedialy/getDetailById", {
      id: _this.data.id,
      openid: _this.data.openid
    }, function(res) {
      console.log(res)
      if (2000 == res.code) {
        res.info.article = _this.delHtmlTag(res.info.article);
        res.info.avatarurl = res.info.avatarurl.indexOf('http') >= 0 ? res.info.avatarurl : baseUrl.config.image_base_url + res.info.avatarurl;
        _this.setData({
          infos: res,
          commend_times: res.info.commend_times,
          is_commend: res.is_commend,
          url: baseUrl.config.image_base_url
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
  clickLike: function () {
    let _this = this;
    var openid = wx.getStorageSync('openid')
    if (_this.data.openid != '') {
      console.log(_this.data.id)
      console.log(openid)
      console.log(_this.data.isCommend ? 2 : 1)
      c.request("servicedialy/updateCommendTimes", {
        id: _this.data.id,
        openid: _this.data.openid,
        commend_type: _this.data.isCommend ? 2 : 1
      }, function (res) {
        console.log(res)
        _this.setData({
          commend_times: res.commend_times,
          is_commend: _this.data.isCommend ? 2 : 1,
          isCommend: !_this.data.isCommend,
          commendTimes: !_this.data.isCommend ? _this.data.commendTimes + 1 : _this.data.commendTimes - 1
        })
      })
    }
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