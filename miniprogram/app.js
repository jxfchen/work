//app.js
var e = require("./utils/http.js");
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          e.request("wechat/login", {
            code: res.code,
          }, function (res) {
            console.log(res)
            wx.setStorage({
              key: 'openid',
              data: res.info.openid,
            })
          }
          )
          
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 授权跳转
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          console.log(1)//已授权
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
              wx.setStorage({
                key: 'avatarUrl',
                data: res.userInfo.avatarUrl
              })
              wx.setStorage({
                key: 'name',
                data: res.userInfo.nickName
              })
            }
          })
        } else {
          console.log(2)//未授权
          wx.redirectTo({
            url: '/pages/authorized_login/authorized_login',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})