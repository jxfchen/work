// pages/security-code/security-code.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputLength: 6, //验证码长度
        inputValue: '', //输入的验证码
        isFocus: true, //聚焦
        isLight: false,  //btn 是否高亮
        hideTip: true, // 错误提示
        idCard: '350105199506138487', //身份证
        title: '标题标题标题标题标题标题', //名称
    },

    // input 输入变化
    handleInputChange(ev) {
        let val = ev.detail.value;
        //判断用户是否已经输入
        let result = Boolean(val.length);
        this.setData({
            isLight: result,
            inputValue: val,
        });
    },
    // input 点击  聚焦
    handleInputTap() {
        this.setData({
            isFocus: true
        });
    },


    //身份证验证
    // handleValidata() {
    //     let userIn = this.data.inputValue;
    //     let real = this.data.idCard.slice(-6);
    //     this.setData({
    //         hideTip: true
    //     });
    //     //输入是否正确
    //     if (userIn === real) {
    //         wx.showToast({
    //             title: '验证成功',
    //         })
    //     } else {
    //         this.setData({
    //             hideTip: false
    //         });
    //     }
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //禁止转发
        wx.hideShareMenu()
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
        //加载数据
        this.getCustomerInfo();
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