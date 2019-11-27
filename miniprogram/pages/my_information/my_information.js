// pages/my_information/my_information.js
var c = require("../../utils/http.js");
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        date: '2016-09-01',
        region: ['广东省', '广州市', '海珠区'],
    },
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
    bindRegionChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value
        })
    },
    changeAvatar: function () {
        var that = this;
        var avatar = this.data.list.user_info.avatarurl;
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数，默认9
            sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function (res) {
                // console.log(res.tempFilePaths)
                var avatar = res.tempFilePaths;
                that.setData({
                    avatar: avatar,
                    upAvatar: true
                })

            },
            fail: function () {
                console.log("fail");
            },
            complete: function () {
                // complete
            }
        })
    },
    
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
    var self = this;
    var date = {
        list: '',
    }
    var openid = "";
    var that = this;
    var list = this.data.list;
    wx.getStorage({
        key: 'openid',
        success: function(res) {
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
            c.request("wechatuser/getWechatInfo", {
                openid: that.data.openid
            }, function(res) {
                that.setData({
                    info: res.info,
                    avatar: res.info.user_info.avatarurl
                });
                var list_str = JSON.stringify(res.info);
                list = JSON.parse(list_str);
                date.list = list;
                self.setData(date);
                console.log(list);
            }, function() {
                console.log('fail');
            })
        },
        fail: function(res) {
            console.log(res + "fail")
        }

    });
    this.setData(date);
    
    
},
    // 切换头像
    
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