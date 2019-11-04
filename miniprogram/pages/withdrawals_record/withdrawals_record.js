// pages/withdrawals_record/withdrawals_record.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[{
                title:"微信提现",
                state: "提现成功",
                application_time:"2019.09.01  09:20",
                payment_date:"2019.09.01  10:20",
                money:"286"
            },
            {
                title: "支付宝提现",
                state: "审核中",
                application_time: "2019.09.01  09:20",
                payment_date: "2019.09.01  10:20",
                money: "540"
            },
            {
                title: "微信提现",
                state: "提现成功",
                application_time: "2019.09.01  09:20",
                payment_date: "2019.09.01  10:20",
                money: "30"
            }
        ]
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