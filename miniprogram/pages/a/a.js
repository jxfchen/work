//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function (options) {
    var that = this;
    var scene = decodeURIComponent(options.scene)
    wx.request({
      url: 'https://www.infinitybuild.cn?access_token=',
      data: {
        scene: '000',//邀请码
        page: ""
      },
      success(res) {
        console.log(res)
        var src2 = wx.arrayBufferToBase64(res.data);  //对数据进行转换操作
        that.setData({
          src2
        })
      },
      fail(e) {
        console.log(e)
      }
    })


  },

})