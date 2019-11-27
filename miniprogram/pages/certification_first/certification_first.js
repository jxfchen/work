// pages/certification_first/certification_first.js
var c = require("../../utils/http.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:'',
        number:'',
    },
    // 获取姓名
    getName: function (e) {
        var name = e.detail.value;
        this.setData({
            name: name
        });
        console.log(name);
    }, 
    getNumber: function (e) {
        var number = e.detail.value;
        this.setData({
            number: number
        });
        console.log(number);
    },
    nextStepBind: function (e) {
        var name=this.data.name;
        var number=this.data.number;
        var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
        var regname = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/;
        if (name==''){
            wx.showToast({
                title: '姓名不能为空',
                icon: 'none',
            })  
        }
        else if(number==''){
            wx.showToast({
                title: '身份证件不能为空',
                icon: 'none',
            })
        }
        else if (!number || !number.match(reg)){
            wx.showToast({
                title: '身份证件格式错误',
                icon: 'none',
            })
        }
        else if (!name.match(regname)){
            wx.showToast({
                title: '姓名格式错误',
                icon: 'none',
            })
        }
        else{
            var openid = wx.getStorageSync('openid');
            c.request("wechatuser/getAttestation2", {
                openid: openid,
                truename:name,
                card_id:number,
            }, function (res) {
                console.log("success")
            }, function () {
            })
            wx.navigateTo({
                url: '/pages/certification_second/certification_second',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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