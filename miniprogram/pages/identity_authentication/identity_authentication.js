// pages/security-code/security-code.js
var c = require("../../utils/http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputLength: 6, //验证码长度
    inputValue: '', //输入的验证码
    isFocus: false, //聚焦
    isLight: false, //btn 是否高亮
    hideTip: true, // 错误提示
  },

  // input 输入变化
  handleInputChange(ev) {
    let val = ev.detail.value;
    //判断用户是否已经输入
    let result = Boolean(val.length);
    this.setData({
      isLight: result,
      inputValue: val,
    });
    console.log(this.data.inputValue)
  },
  // input 点击  聚焦
  handleInputTap() {
    this.setData({
      isFocus: true
    });
  },


  //邀请码验证
  handleValidata() {
    let invest_code = this.data.inputValue;
    let userIn = this.data.inputValue.length;
    let real = this.data.inputLength;
    this.setData({
      hideTip: true
    });
    //输入是否正确
    if (userIn === 6 || userIn === 0) {
      // wx.showToast({
      //     title: '验证成功',
      // })
      var openid = "";
      var that = this;
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
          // console.log(invest_code)
          // return
          c.request("wechatuser/getAttestation", {
            openid: that.data.openid,
            invest_code: invest_code,
          }, function(res) {
            console.log(res)
            if (that.data.card == 2) {
              wx.navigateTo({
                url: '/pages/certification_first/certification_first',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            } else {
              wx.switchTab({
                url: '../me/me',
              })
            }
          }, function() {

          })
        },
        fail: function(res) {}

      })
    } else {
      wx.showToast({
        title: '邀请人编码输入不正确',
        icon: 'none',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var openid = wx.getStorageSync('openid')
    var that = this
    c.request("wechatuser/index", {
      openid: openid
    }, function(res) {
      console.log(res.info.user_info.card_status)
      that.setData({
        card: res.info.user_info.card_status
      })
    }, function() {
      console.log('fail')
    })
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
    //加载数据
    this.getCustomerInfo();
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