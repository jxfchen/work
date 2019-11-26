// pages/push_sheet/push_sheet.js
var c = require("../../utils/http.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rad: '-1',
    istarget: true,
    showModal: false,
    swiperCurrent: 0,
    background: ["/images/push_banner.png", "/images/push_banner.png", "/images/push_banner.png"],
    project_type_id: [],
    contentList: [
      {
        name: "联系我",
        id: 0,
      }, {
        name: "直接联系客户",
        id: 1,
      }
    ],
    roleList: [
      {
        name: "我是推荐人",
        id: 1,
      }, {
        name: "我申请为项目合伙人",
        id: 2,
      }
    ],
  },
  // 项目类型
  clas: function (e) {
    var that = this
    var a = e.currentTarget.dataset.index
    that.setData({
      rad: a,
      restaurant_id: e.currentTarget.dataset.id, // 服务id
    })
    console.log(that.data.restaurant_id)
  },
  //餐次
  checkboxChange(e) {
    var that = this
    let string = "mealist[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.mealist[e.target.dataset.index].selected
    })
    let detailValue = this.data.mealist.filter(it => it.selected).map(it => it.id+ ':' + it.price)
    var k
    var i
    var myhash = []
    for (k in detailValue) {
      var a = detailValue[k].split(':');
      for (i in a) {
        myhash[a[0]] = a[1]
      }
    }
    that.setData({
      project_type_id: detailValue, // 项目类型id
      myhash: myhash
    })
    console.log(that.data.fwid)
  },
  // 价格
  slider: function (e){
    var that = this
    var num = e.detail.value
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    that.data.mealist[index].price = e.detail.value
    var hash = that.data.myhash
    hash[id] = num
    var arr = []
    for (var i = 0; i < hash.length; i++) {
      if (hash[i] != undefined){
      var a = i + ':' + hash[i]
      arr.push(a)
      }
    }
    // console.log(arr)
    that.setData({
      mealist: that.data.mealist,
      myhash: hash,
      fwid: arr
    })
    console.log(that.data.fwid)
  },
  //就餐人数
  numberInput: function (e) {
    this.setData({
      peopleNumber: e.detail.value
    })
    console.log(this.data.peopleNumber)
  },
  //联系方式
  mePhoneInput: function (e) {
    this.setData({
      mePhone: e.detail.value
    })
    console.log(this.data.mePhone)
  },
  customerPhoneInput: function (e) {
    this.setData({
      customerPhone: e.detail.value
    })
    console.log(this.data.customerPhone)
  },
  //优先联系
  content: function (e) {
    var that = this
    var a = e.currentTarget.dataset.index
    that.setData({
      cont: a,
      content_id: e.currentTarget.dataset.id, // 服务id
    })
    console.log(this.data.content_id)
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
    var that = this;
    var openid = wx.getStorageSync('openid');
    var code = options.title;
    that.setData({
      openid: openid,//类型
      code: code,//餐次
    })
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
          selected: false,
          price: 0,
        }
      })
      console.log(newArr)
      that.setData({
        prolist: res.project_list,//类型
        mealist: newArr,//餐次
      })
    }, function () {
    })
  },
  bindClick: function (e) {
    let that = this;
    // console.log(that.data.openid)
    // console.log(that.data.code)//服务id
    // console.log(that.data.restaurant_id)//项目类型id
    console.log(that.data.fwid)//餐次，价格
    // console.log(that.data.peopleNumber)//就餐人数
    // console.log(that.data.mePhone)//联系方式
    // console.log(that.data.customerPhone)//客户联系方式
    // console.log(that.data.content_id)//优先联系人
    // console.log(that.data.role_id)//您的角色
    c.request("pushersheet/postPusherSheet", {
      openid: that.data.openid,
      restaurant_id: that.data.code,//服务id
      project_type_id: that.data.restaurant_id,//项目类型id
      meals: that.data.fwid,// 餐次，价格
      eating_num: that.data.peopleNumber,//就餐人数
      contact: that.data.mePhone,// 联系方式
      contact_customer: that.data.customerPhone,//客户联系方式
      first_contact: that.data.content_id,//优先联系人
      role: that.data.role_id,//您的角色
    }, function (res) {
      console.log(res)
    }, function () {
    })
  },
  wqd: function (e) {
    var that = this
    var a = e.currentTarget.dataset.index
    that.setData({
      rol: a,
      role_id: e.currentTarget.dataset.id, // 服务id
    })
    console.log(this.data.role_id)
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