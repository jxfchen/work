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
    openid: '',
    hasMore: true,
    hiddenmodalputname: true,
    name: '',
    pusher_id: '',
  },
  modalinputname: function(e) {
    var pusher_id = this.data.pusher_id;
    pusher_id = e.currentTarget.dataset['id'];
    this.setData({
      hiddenmodalputname: !this.data.hiddenmodalputname,
      pusher_id: pusher_id,
    });
  },
  cancelname: function() {
    var name = this.data.name;
    this.setData({
      hiddenmodalputname: true,
      name: '',
    });
  },
  confirmname: function(e) {
    var pusher_id = this.data.pusher_id;
    this.setData({
      hiddenmodalputname: true
    })
    var name = this.data.name;
    var openid = wx.getStorageSync('openid');
    if (name == '') {
      wx.showToast({
        title: '备注推单名称为空',
        icon: 'none',
      })
    } else {
      console.log(name, openid, pusher_id)
      c.request("pushersheet/updatePusherSheetTitle", {
        openid: openid,
        title: name,
        pusher_id: pusher_id,
      }, function(res) {
        console.log("name_success");
      }, function() {
        console.log("name_fail");
      })
      this.onLoad();
    }

  },
  getName(e) {
    var name = this.data.name;
    name = e.detail.value;
    this.setData({
      name: name
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOpenid()
  },
  getOpenid: function() {
    var _this = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        _this.setData({
          openid: res.data
        }, function() {
          _this.getList();
        });
      }
    });
  },
  changeStatus: function(e) {
    let _this = this;
    // _this.data.status = e.target.dataset.status;
    _this.setData({
      status: e.target.dataset.status,
      pageNo: 1
    });
    _this.getList(false);
  },
  getList: function(isPage = false, isChangeTab = true) {
    let _this = this;
    console.log(_this.data.openid)
    console.log(_this.data.status)
    console.log(_this.data.pageNo)
    console.log(_this.data.size)
    c.request("pushersheet/getPusherSheetList", {
      openid: _this.data.openid,
      status: _this.data.status,
      page: _this.data.pageNo,
      size: _this.data.size
    }, function(res) {
      console.log(res)
      if (2000 == res.code) {
        if (res.info == null || res.info.length == 0) {
          _this.setData({
            hasMore: false,
          });
          return false;
        }
        _this.setData({
          list: res.info,
        });
      } else {
        if (isChangeTab) {
          _this.setData({
            list: []
          });
        }
        wx.showToast({
          title: res.msg || "获取失败",
          icon: "none"
        })
      }
    }, function() {
      console.log('fail');
    })
  },
  //到达底部
  scrollToLower: function(e) {

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
    let _this = this;
    if (_this.data.hasMore) {
      _this.setData({
        pageNo: _this.data.pageNo + 1
      })
      _this.getList(true, false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})