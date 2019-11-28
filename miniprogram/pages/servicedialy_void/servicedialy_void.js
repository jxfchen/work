var c = require("../../utils/http.js");
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
    direction: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid(options.id)
    this.videoContext = wx.createVideoContext('myVideo')
  },
  getOpenid: function (id) {
    var _this = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res)
        _this.setData({
          openid: res.data
        }, function () {
          _this.geDetailInfo(id);
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  geDetailInfo: function (id) {
    let _this = this;
    c.request("servicedialy/getDetailById", {
      id: id,
      openid: _this.data.openid
    }, function (res) {
      if(2000 == res.code) {
        res.info.article = _this.delHtmlTag(res.info.article);
        _this.setData({
          infos: res,
          nextId: res.next_id != "" ? res.next_id : 0,
          prevId: res.prev_id != "" ? res.prev_id : 0
        });
        setTimeout(function(){
          _this.videoContext.play();
        },700);
      }else{
        wx.showToast({
          title: _this.data.flag == 4 ? '已经到顶啦' : '已经到底啦',
          icon: "none"
        })
      }
    }, function () {
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
    // wx.stopPullDownRefresh();
    // let _this = this;
    // if (_this.data.hasMore && _this.data.prevId > 0) {
    //   _this.geDetailInfo(_this.data.prevId);
    // }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // let _this = this;
    // if (_this.data.hasMore && _this.data.nextId > 0) {
    //   _this.geDetailInfo(_this.data.nextId);
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handletouchmove: function (event) {
    if (this.data.flag !== 0) {
      return
    }
    let currentX = event.touches[0].pageX;
    let currentY = event.touches[0].pageY;
    let tx = currentX - this.data.lastX;
    let ty = currentY - this.data.lastY;
    let text = "";

    let _this = this;
    //左右方向滑动
    if (Math.abs(tx) <= Math.abs(ty)) {
      //上下方向滑动
      if (ty < 0) {
        // bounceInDown
        // 上拉
        this.setData({
          direction: 3,
          infos: []
        })
        this.data.flag = 3;
        setTimeout(function(){
          _this.geDetailInfo(_this.data.nextId);
        },300)
      }
      else if (ty > 0) {
        // bounceInUp
        // 下拉
        this.setData({
          direction: 4,
          infos: []
        })
        this.data.flag = 4;
        setTimeout(function () {
          _this.geDetailInfo(_this.data.prevId);
        }, 300)
      }
    }
    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX;
    this.data.lastY = currentY;
  },
  handletouchstart: function (event) {
    // console.log(event)
    this.data.lastX = event.touches[0].pageX;
    this.data.lastY = event.touches[0].pageY;
  },
  handletouchend: function (event) {
    this.data.flag = 0
  }
})