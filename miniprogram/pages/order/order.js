var c = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 100,
    pageNo: 1,
    size: 10,
    list: [],
    role: 1,
    openid: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid();
  },
  getOpenid: function () {
    var _this = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        _this.setData({
          openid: res.data
        }, function () {
          _this.getList();
        });
      }
    });
  },
  changeStatus: function (status) {
    let _this = this;
    _this.data.status = status;
    _this.getList();
  },
  getList: function (isPage = false) {
    let _this = this;
    c.request("pushersheet/getPusherSheetList", {
      openid: _this.data.openid,
      role: _this.data.role,
      status: _this.data.status,
      page: _this.data.pageNo,
      size: _this.data.size
    }, function (res) {
      if (2000 == res.code) {
        _this.setData({
          list: res.info
        });
      }else{
        wx.showToast({
          title: res.msg || "获取失败",
          icon: "none"
        })
      }
    }, function () {
      console.log('fail');
    })
  },
  //到达底部
  scrollToLower: function (e) {
    let _this = this;
    _this.setData({
      pageNo: _this.data.pageNo + 1
    })
    _this.getList(true);
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