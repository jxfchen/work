//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo(e) {
    var that = this;
    //获取用户信息
    wx.getUserInfo({
      success: function (res) {
        console.log(res); //得到用户信息
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              wx.switchTab({
                url: '../index/index',
              })
              wx.showToast({
                title: '授权成功',
              })
            } else {
              wx.showToast({
                title: '请您授权后使用',
              })
            }
          }
        })
      }
    })
  },
  onLoad: function () {
    
  },
  
})
