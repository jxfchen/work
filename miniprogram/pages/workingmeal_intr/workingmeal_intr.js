var c = require("../../utils/http.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        background: ["/images/banner.png", "/images/banner.png", "/images/banner.png", "/images/banner.png", "/images/banner.png"],
        pushList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var self = this;
        var date = {
            pushList:'',
        }
        var that = this;
        var pushList = this.data.pushList;
        var title = options.title;
        console.log(title);
        c.request("index/getRestaurant", {}, function (res) {
            that.setData({
                infos: res.infos,
            });
            for (let i = 0; i < res.infos.length; i++) {
                if (res.infos[i].id == title){
                    pushList = res.infos[i];
                }
                else{
                    continue;
                }
            }
            date.pushList = pushList;
            self.setData(date);
            console.log(pushList);
            console.log(res.infos)
        }, function () {
            console.log('fail');
        })          
        this.setData(date);
        
    },

    /**
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