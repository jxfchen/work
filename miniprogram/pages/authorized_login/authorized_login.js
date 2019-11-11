//index.js

//获取应用实例
const app = getApp()
// 引入接口
var c = require("../../utils/http.js");

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo(e) {
    //查看是否授权
    wx.getSetting({
      success(res) {
        wx.getUserInfo({
          success(res) {
            console.log(res.userInfo)
            wx.setStorage({
              key: 'avatarurl',
              data: res.userInfo.avatarUrl
            })
            wx.setStorage({
              key: 'nickname',
              data: res.userInfo.nickName
            })
            c.request("wechat/setUserinfo", {
              openid: wx.getStorageSync('openid'),
              nickname: res.userInfo.nickName,
              gender: res.userInfo.gender,
              avatarurl: res.userInfo.avatarUrl,
              city: res.userInfo.city,
              province: res.userInfo.province,
              country: res.userInfo.country,
              language: res.userInfo.language,
            }, function (res) {
              wx.switchTab({
                url: '../index/index',
              })
              console.log(res)
            }, function () {
              wx.showToast({
                title: '加载数据失败',
              })
              console.log('shibai')
            }
            )
          }
        })
      }
    })
  },
  onLoad: function () {
    
  },
  
})
