//index.js

//获取应用实例
const app = getApp()
// 引入接口
var e = require("../../utils/http.js");

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
              var openid = wx.getStorageSync('openid')
              console.log(openid)
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
