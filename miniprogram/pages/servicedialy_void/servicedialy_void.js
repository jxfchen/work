var c = require("../../utils/http.js");
var baseUrl = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infos: null,
    nextId: 0,
    prevId: 0,
    hasMore: true,
    flag: 0,
    openid: '',
    direction: 0,
    oldInfos: null,
    id: 0,
    isCommend: false,
    heig: '',
    commendTimes: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOpenid(options.id)
    this.data.id = options.id;
    this.videoContext = wx.createVideoContext('myVideo')

  },
  getOpenid: function(id) {
    var _this = this;

    wx.getStorage({
      key: 'openid',
      success: function(res) {
        console.log(res)
        _this.setData({
          openid: res.data
        }, function() {
          _this.geDetailInfo(id);
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  geDetailInfo: function(id) {
    let _this = this;
    _this.setData({
      infos: []
    });
    // wx.showLoading({
    //   title: '加载中',
    // })
    console.log(id)
    console.log(_this.data.openid)
    c.request("servicedialy/getDetailById", {
      id: id,
      openid: _this.data.openid
    }, function(res) {
      console.log(res)
      wx.hideLoading();
      if (2000 == res.code) {
        res.info.article = _this.delHtmlTag(res.info.article);
          res.info.avatarurl = res.info.avatarurl.substr(0, 8).toLowerCase() == 'https://' ? res.info.avatarurl : baseUrl.config.image_base_url + res.info.avatarurl;
        // res.info.avatarurl = res.info.avatarurl.substr(0, 7).toLowerCase() == 'http://' ? res.info.avatarurl : baseUrl.config.image_base_url + res.info.avatarurl;
        _this.setData({
          infos: res,
          oldInfos: res,
          isCommend: res.is_commend ? true : false,
          commendTimes: res.info.commend_times,
          nextId: res.next_id != "" ? res.next_id : 0,
          prevId: res.prev_id != "" ? res.prev_id : 0
        });
      } else {
        _this.setData({
          infos: _this.data.oldInfos
        });
        wx.showToast({
          title: _this.data.direction == 4 ? '已经到顶啦' : '已经到底啦',
          icon: "none"
        })
      }
      _this.videoContext.play();
    }, function() {
      console.log('fail');
    })
  },
  delHtmlTag: function(str) {
    var reg = new RegExp("<[^>]+>", "g");
    var result = str.replace(reg, '');
    return result;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  clickLike: function() {
    let _this = this;
    if (_this.data.openid != '') {
      console.log(_this.data.id)
      console.log(_this.data.openid)
      console.log(_this.data.isCommend ? 2 : 1)
      c.request("servicedialy/updateCommendTimes", {
        id: _this.data.id,
        openid: _this.data.openid,
        commend_type: _this.data.isCommend ? 2 : 1
      }, function(res) {
        _this.setData({
          isCommend: !_this.data.isCommend,
          commendTimes: !_this.data.isCommend ? _this.data.commendTimes + 1 : _this.data.commendTimes - 1
        })
      })
    }
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
    // wx.stopPullDownRefresh();
    // let _this = this;
    // if (_this.data.hasMore && _this.data.prevId > 0) {
    //   _this.geDetailInfo(_this.data.prevId);
    // }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // let _this = this;
    // if (_this.data.hasMore && _this.data.nextId > 0) {
    //   _this.geDetailInfo(_this.data.nextId);
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  handletouchmove: function(event) {
    if (this.data.flag !== 0) {
      return
    }
    this.setData({
      infos: []
    })
    let currentX = event.touches[0].pageX;
    let currentY = event.touches[0].pageY;
    let tx = currentX - this.data.lastX;
    let ty = currentY - this.data.lastY;
    let text = "";
    this.videoContext.pause();
    let _this = this;
    //左右方向滑动
    if (Math.abs(tx) <= Math.abs(ty)) {
      //上下方向滑动
      if (ty < 0) {
        // bounceInDown
        // 上拉
        this.setData({
          direction: 3,
          flag: 3,
          infos: []
        })
        setTimeout(function() {
          _this.geDetailInfo(_this.data.nextId);
        }, 300)
      } else if (ty > 0) {
        // bounceInUp
        // 下拉
        this.setData({
          direction: 4,
          flag: 4,
          infos: []
        })
        setTimeout(function() {
          _this.geDetailInfo(_this.data.prevId);
        }, 300)
      }
    }
    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX;
    this.data.lastY = currentY;
  },
  handletouchstart: function(event) {
    // console.log(event)
    this.data.lastX = event.touches[0].pageX;
    this.data.lastY = event.touches[0].pageY;
  },
  handletouchend: function(event) {
    this.data.flag = 0
  }
})