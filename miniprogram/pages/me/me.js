var c = require("../../utils/http.js");
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        nicname:'',
    },

    copyTBL: function (e) {
        var self = this;
        wx.setClipboardData({
            data: self.data.list.user_info.invite_code,
            success: function (res) {
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.init();
    },
    init: function(){
      var self = this;
      var date = {
        list: '',
      }
      var that = this;
      var list = [];
      var openid = "";
      wx.getStorage({
        key: 'openid',
        success: function (res) {
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
          c.request("wechatuser/index", {
            openid: that.data.openid
          }, function (res) {
            that.setData({
              info: res.info,
            });
            var list_str = JSON.stringify(res.info);
            list = JSON.parse(list_str);
            date.list = list;
            self.setData(date);
            console.log(list);
          }, function () {
            console.log('fail');
          })
        },
        fail: function (res) {
        }

      });
      this.setData(date);
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
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
        var nicname = this.data.nicname;
        var avatar = wx.getStorageSync('avatarurl');
        var nicname = wx.getStorageSync('nickname');
        console.log(avatar)
        console.log(nicname)
        this.setData({
            avatar: avatar,
            nicname: nicname
        })

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