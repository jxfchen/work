var c = require("../../utils/http.js");
var wxParse = require('../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    background: ["/images/banner.png", "/images/banner.png", "/images/banner.png", "/images/banner.png", "/images/banner.png"],
    pushList: [],
    id: undefined,
    status:"true",
  },
    ellipsisbtn: function () {
        var status=this.data.status;
        var that=this;
        if (status =="false")
        {
            that.setData({
                status:"true"
            })
        }else{
            that.setData({
                status:"false"
            }) 
        }
        console.log(status);
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = this.data.id;
    id = options.title;
    this.setData({
      id: id
    })
    console.log(id);
    c.request("restaurant/getDetailById", {
      id: id
    }, function (res) {
      console.log(res.info);
      var description = res.info.description
      var des = res.info.description.split(',')
      console.log(des)
      that.setData({
        infos: res.info,
        des: res.info.description.split(','),
        key: res.info.keywords.split(',')
      });
      var temp = wxParse.wxParse('article', 'html', res.info.article, that, 5);
    }, function () {
      console.log('fail');
    })
  },
  home: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})