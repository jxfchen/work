// pages/push_sheet/push_sheet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    istarget:true,
    showModal: false,
    swiperCurrent: 0,
    background: ["/images/push_banner.png", "/images/push_banner.png", "/images/push_banner.png"],
    items: [
      { name: '日常工作餐', value: '日常工作餐', checked: 'true' },
      { name: '会议用餐', value: '会议用餐' },
      { name: '剧组餐', value: '剧组餐' },
      { name: '食堂承包', value: '食堂承包' },
    ],
    allGoodsFilte: [
      { name: '早餐', value: '0', checked: true },
      { name: '午餐', value: '1', checked: false },
      { name: '晚餐', value: '2', checked: false },
    ],  
  },
  breakfastTap: function (e) {
    console.log(1111);
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

  /**
   * 图片手动滑动时，获取当前的轮播id
   */
  imageChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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