 // pages/cash_withdrawal/cash_withdrawal.js
 var c = require("../../utils/http.js");
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     prolist: [{
       name: "1元",
       id: 1,
     }, {
       name: "100元",
       id: 100,
     }, {
       name: "200元",
       id: 200,
     }, {
       name: "500元",
       id: 500,
     }, {
       name: "1000元",
       id: 1000,
     }, {
       name: "2000元",
       id: 2000,
     }],
     money: '',
   },
   clas: function(e) {
     let that = this;
     let a = e.currentTarget.dataset.index;
     let money = e.currentTarget.dataset.id;
     that.setData({
       rad: a,
       money: money, // 服务id
     })
     console.log(money);
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     var that = this
     wx.getStorage({
       key: 'openid',
       success: function (res) {
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
         c.request("wechatuser/getAccountLog", {
           openid: that.data.openid,
           page: '1',
           size: '9',
         }, function (res) {
           console.log(res)
           that.setData({
             info: res.info,
             moneya: res.info.money_info
           });
         }, function () {
           console.log('fail');
         })
       },
       fail: function (res) {
         console.log(res + "fail")
       }
     });
   },
   bindClick(e) {
     var that = this;
     var money = that.data.money;
     var openid = wx.getStorageSync('openid');
     console.log(money)
     c.request("wechatuser/getWithdraw", {
       openid: openid,
       money: money,
     }, function(res) {

       wx.showToast({
         title: res.msg || '发起提现成功，请等待审核',
         icon: 'none'
       })
     }, function() {
       console.log('fail');
     })
   },
   /**
    * 
    * 
    * 
    * 
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

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {

   }
 })