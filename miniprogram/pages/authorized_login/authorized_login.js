//index.js

//获取应用实例
const app = getApp()
// 引入接口
var c = require("../../utils/http.js");

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hide: true
  },
  getPhoneNumber: function (e) {//点击获取手机号码按钮
    var that = this;
    wx.checkSession({
      success: function () {
        console.log(e)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        var openid = wx.getStorageSync('openid')
        var sessionKey = wx.getStorageSync('session_key')
        var encryptedData = e.detail.encryptedData
        var iv = e.detail.iv
        c.request("wechat/getUserPhone", {
          openid: openid,
          sessionKey: sessionKey,
          encryptedData: encryptedData,
          iv: iv
        }, function (res) {
          console.log(res)
          that.setData({
            hide: false,
          })
          wx.setStorage({
            key: 'phone',
            data: res.phoneNumber,
          })
        }, function () {
          console.log('fail');
        })
      },
    });
  },
  ret:function(e){
    var that = this
    that.setData({
      hide: false,
    })
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
            }, function(res) {
              wx.switchTab({
                url: '../index/index',
              })
              console.log(res)
            }, function() {
              wx.showToast({
                title: '加载数据失败',
              })
              console.log('shibai')
            })
          }
        })
      }
    })
  },
  onLoad: function() {

  },

})