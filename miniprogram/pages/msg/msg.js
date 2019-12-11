// pages/msg/msg.js
var c = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    hasMore: true,
    lists: [],
    list: [],
    status: 1,
    msgList: '',
    page1: 1,
    page2: 2,
  },
  click1tap: function() {
    var status = this.data.status;
    status = 1;
    var that = this;
    that.setData({
      status: status,
    })
    console.log(status);
  },
  click2tap: function() {
    var status = this.data.status;
    status = 2;
    var that = this;
    that.setData({
      status: status,
    })
    console.log(status);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMsgList();
    var self = this;
    var date = {
      list: '',
      msgList: '',
    }
    var openid = "";
    var that = this;
    var list = this.data.list;
    var msgList = this.data.msgList;
    c.request("index/getNoticeList", {
      page: 1,
      size: 10,
    }, function(res) {
      console.log(res.info);
      that.setData({
        infos: res.info,
      });
      var list_str = JSON.stringify(res.info);
      list = JSON.parse(list_str);
      date.list = list;
      self.setData(date);
    }, function() {
      console.log('fail');
    })
    var openid = "";
    wx.getStorage({
      key: 'openid',
      success: function(res) {
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
        //   c.request("message/getMessageList", {
        //       openid: that.data.openid,
        //       page:1,
        //       size:10,
        //   }, function (res) {
        //       console.log(res)
        //       that.setData({
        //           info: res.info,
        //       });
        //       var msgList_str = JSON.stringify(res.info);
        //       msgList = JSON.parse(msgList_str);
        //       date.msgList = msgList;
        //       self.setData(date);
        //       console.log(msgList);
        //   }, function () {
        //       console.log('fail');
        //   })
      },
      fail: function(res) {
        console.log("fail")
      }

    });
    this.setData(date);
  },
  //     this.getMsgList();
  //   },
  getMsgList: function(isNext = false) {
    var _this = this,
      openid = wx.getStorageSync('openid');
    c.request("message/getMessageList", {
      openid: openid,
      page: 1,
      size: 1000
    }, function(res) {
      console.log(res.info)
      var list_str = JSON.stringify(res.info);
      var list = JSON.parse(list_str);
      
      if (res.info == null || res.info.length == 0) {
        _this.setData({
          hasMore: false,
          lists: res.info
        });
      }else{
        _this.setData({
          lists: res.info
        });
      }
      // if (isPage) {
      //   //下一页的数据拼接在原有数据后面
      //   list = _this.data.list.concat(list);
      //   _this.setData({
      //     lists: list
      //   });
      // } else {
      //   //第一页数据直接赋值
      //   _this.setData({
      //     lists: list
      //   });
      // }
    }, function() {
      console.log('fail');
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
      });
      _this.getMsgList(true);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})