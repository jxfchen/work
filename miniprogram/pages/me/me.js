var c = require("../../utils/http.js");
var baseUrl = require("../../utils/config.js");
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
      userInfo: {},
      hasUserInfo: false,
      nicname:'',
      hide: false,
    },
    msgList: function (e) {
        wx.navigateTo({
            url: '../msg/msg',
        })
    },
    copyTBL: function (e) {
      var self = this;
      wx.setClipboardData({
        data: self.data.list.user_info.invite_code,
          success: function (res) {
        }
      });
    },
    // 认证判断
    rz:function(e){
      var that = this
      var openid = wx.getStorageSync('openid')
      c.request("wechatuser/getAttestation1", {
        openid: openid
      }, function (res) {
        var yq = res.is_recommend//0:false,1:true
        var rz = that.data.rz//0:false,1:true
        if(yq == 0){
          wx.navigateTo({
            url: '../identity_authentication/identity_authentication',
          })
        } else if (yq == 1 && rz == 0){
          wx.navigateTo({
            url: '../certification_first/certification_first',
          })
        } else if (yq == 1 || rz == 0){
          return
        }
        console.log('yq:', yq,'rz:',rz)
      }, function () {
        console.log('fail');
      })
    },
    guide:function(e){
      var code = e.currentTarget.dataset.id
      // console.log(code)
      wx.navigateTo({
        url: '../guide/guide?code=' + code,
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.init();
      this.setData({
        imgurl: baseUrl.config.image_base_url
      })
    },
    ewm:function(e){
      var openid = wx.getStorageSync('openid')
      var that = this
      c.request("activity/qrcode", {
        openid: openid
      }, function (res) {
        console.log(res)
        var img = that.data.imgurl
        // console.log(img + res.qrcode)
        that.setData({
          ewm: img + res.qrcode,
          hide: true
        })
      }, function () {
        console.log('fail');
      })
    },
    close: function (e) {
      var that = this
      that.setData({
        hide: false
      })
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
              rz: res.info.user_info.card_status
            });
            var list_str = JSON.stringify(res.info);
            list = JSON.parse(list_str);
            date.list = list;
            self.setData(date);
            console.log(res);
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