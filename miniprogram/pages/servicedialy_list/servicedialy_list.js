//index.js
//获取应用实例
const app = getApp()
// var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
// var qqmapsdk;
var c = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  sheetlist: function (e) {
    // console.log(123)
    wx.navigateTo({
      url: '../sheetlist/sheetlist',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var date = {
      address_img: "/images/address.png",
      region: ['山东省', '济南市', '济南市'],
      arrow_img: "/images/arrow.png",
      notice_img: "/images/notice.png",
      logo1: "/images/task1.png",
      background: "",
      pushList: '',
    }
    var that = this;
    var list = this.data.list;
    
    //服务日记
    that.getServiceDaily();
  },
  getServiceDaily: function (isPage = false) {
    let _this = this;
    c.request("index/getServiceDialy", {
      page: _this.data.pageNo,
      size: "6",
    }, function (res) {
      if (res.info == null || res.info.length == 0) {
        _this.setData({
          hasMore: false,
        });
        return false;
      }
      _this.setData({
        info: res.info,
      });
      var list_str = JSON.stringify(res.info);
      var list = JSON.parse(list_str);
      for (let i = 0; i < list.length; i++) {
        list[i].position = "center";
        list[i].height = '';
      }
      if (isPage) {
        //下一页的数据拼接在原有数据后面
        list = _this.data.list.concat(list);
        _this.setData({
          list: list
        });
      } else {
        //第一页数据直接赋值
        _this.setData({
          list: list
        });
      }
    }, function () {
      console.log('fail');
    })
  },
  //到达底部
  scrollToLower: function (e) {
    let _this = this;
    if (_this.data.hasMore) {
      _this.setData({
        pageNo: _this.data.pageNo + 1
      })
      _this.getServiceDaily(true);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  imageLoadLeft: function (e) {

    //获取图片的原始宽度和高度

    let originalWidth = e.detail.width;

    let originalHeight = e.detail.height;

    let picHeight = this.data.picHeight
    picHeight = 165 / originalWidth * originalHeight

    var list = this.data.list

    let index = e.currentTarget.dataset.index
    list[index].height = picHeight
    this.setData({
      list: list
    })

    this.data.leftHeight += picHeight

  },
  darmore: function (e) {

  },
  //右边的图片高度之和
  imageLoadRight: function (e) {

    //获取图片的原始宽度和高度

    let originalWidth = e.detail.width;

    let originalHeight = e.detail.height;

    let picHeight = this.data.picHeight
    picHeight = 165 / originalWidth * originalHeight

    var list = this.data.list

    let index = e.currentTarget.dataset.index
    list[index].height = picHeight
    this.setData({
      list: list
    })

    this.data.rightHeight += picHeight

  },
  height_: function () {
    var that = this
    var list = that.data.list
    setTimeout(() => {
      var leftHeight = that.data.leftHeight
      var rightHeight = that.data.rightHeight
      var disparity_ = ''
      disparity_ = Math.abs(leftHeight - rightHeight)
      var min_ = {
        a: 300,
        index: 0
      }
      // console.log(disparity_)

      if (leftHeight > rightHeight && disparity_ > 100) {
        for (var i = 0; i < list.length; i += 2) {
          var tmp = Math.abs(list[i].height - disparity_) / 2
          if (tmp < min_.a) {
            min_ = {
              a: tmp,
              index: i
            }
            // console.log(min_)
          }

          // console.log(list[i].height, disparity_)

        }
        list[min_.index].position = 'right'
      }
      if (leftHeight < rightHeight && disparity_ > 100) {
        for (var i = 1; i < list.length; i += 2) {
          var tmp = Math.abs(list[i].height - disparity_) / 2
          if (tmp < min_.a) {
            min_ = {
              a: tmp,
              index: i
            }
            // console.log(min_)
          }

          // console.log(list[i].height, disparity_)
        }
        list[min_.index].position = 'left'
      }
      // console.log(list)
      this.setData({
        list: list
      })
    }, 1000)
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
    let _this = this;
    if (_this.data.hasMore) {
      _this.setData({
        pageNo: _this.data.pageNo + 1
      });
      _this.getServiceDaily(true);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})