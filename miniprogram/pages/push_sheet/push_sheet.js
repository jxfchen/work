// pages/push_sheet/push_sheet.js
var c = require("../../utils/http.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rad: '0',
    istarget:true,
    showModal: false,
    swiperCurrent: 0,
    background: ["/images/push_banner.png", "/images/push_banner.png", "/images/push_banner.png"],
  },

  breakfastTap: function (e) {
    if (e.detail.istarget === false) {
      this.setData({
        istarget: true,
      })
    }
    else{
      this.setData({
        istarget: false,
      })
    }
  },
  serviceValChange: function (e) {
    var allGoodsFilte = this.data.allGoodsFilte;
    var checkArr = e.detail.value;
    for (var i = 0; i < allGoodsFilte.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        allGoodsFilte[i].checked = true;
      } else {
        allGoodsFilte[i].checked = false;
      }
    }
    this.setData({
      allGoodsFilte: allGoodsFilte
    })
  } ,
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.detail.current
    })
  },
  // 项目类型
  clas:function(e){
    var that = this
    var a = e.currentTarget.dataset.index
    that.setData({
      rad: a,
      restaurant_id: e.currentTarget.dataset.id, // 服务id
    })
    console.log(this.data.restaurant_id)
  },
  //餐次
  checkboxChange(e) {
    var that = this
    let string = "mealist[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.mealist[e.target.dataset.index].selected
    })
    let nickname = e.currentTarget.dataset.nickname
    let detailValue = this.data.mealist.filter(it => it.selected).map(it => it.nickname + '_id' +':'+ it.id)
    that.setData({
      project_type_id: detailValue, // 项目类型id
    })
    console.log(that.data.project_type_id)
  },
  /**
   * 图片手动滑动时，获取当前的轮播id
   */
  imageChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  slider: function (e) {
    this.setData({
      a: e.detail.value
    })
    console.log(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openid = wx.getStorageSync('openid')
    var code = options.title
    // console.log(openid, code)
    c.request("pushersheet/getProjectType", {
    }, function (res) {
      console.log(res)
      var arr = res.meal_list
      let newArr = arr.map(obj => {
        return {
          id: obj.id,
          pid: obj.pid,
          type: obj.type,
          name: obj.name,
          nickname: obj.nickname,
          selected: false
        }
      })
      console.log(newArr)
      that.setData({
        prolist: res.project_list,//类型
        mealist: res.meal_list,//餐次
      })
    }, function () {
    })
  },
  wqd: function (e) {
    this.setData(
      {
        showModal: true
      }
    )

  },
  ok: function () {
    this.setData({
      showModal: false
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