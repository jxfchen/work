// pages/certification_third/certification_third.js
var c = require("../../utils/http.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectArray: [],
        avatar: '/images/certificates1.png',
        nowId: '',
    },
    getDate: function(e) {
        var that = this;
        var nowId = this.data.nowId;
        nowId = e.detail.id;
        that.setData({
            nowId: nowId
        })
    },
    pictureBind: function(e) {
        var that = this;
        var avatar = this.data.avatar;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // console.log(res.tempFilePaths)
                var avatar = res.tempFilePaths
                that.setData({
                    avatar: avatar
                })
            },
            fail: function() {
                console.log("fail");
            },
            complete: function() {
                // complete
            }
        })
    },
    clickBind: function(e) {
        var that = this;
        var openid = "";
        var avatar = this.data.avatar;
        var card_img_type = this.data.nowId;
        if (avatar == '' || avatar =='/images/certificates1.png') {
            wx.showToast({
                title: '身份证明照片不能为空',
                icon: 'none',
            })
        } else if (card_img_type == '') {
            wx.showToast({
                title: '名片选择不能为空',
                icon: 'none',
            })
        } else {
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
                    c.request("wechatuser/getAttestation4", {
                        openid: that.data.openid,
                        card_img_type: card_img_type,
                        card_no_img: avatar,
                    }, function(res) {
                        console.log('success');
                        wx.switchTab({
                            url: '/pages/me/me',
                            success: function(res) {},
                            fail: function(res) {},
                            complete: function(res) {},
                        })
                    }, function() {
                        console.log('fail');
                    })
                },
                fail: function(res) {}

            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var self = this;
        var date = {
            selectArray: '',
        }
        var that = this;
        var selectArray = this.data.selectArray;
        var openid = "";
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
                c.request("wechatuser/getCate", {
                    openid: that.data.openid
                }, function(res) {
                    that.setData({
                        info: res.info,
                    });
                    var selectArray_str = JSON.stringify(res.info);
                    selectArray = JSON.parse(selectArray_str);
                    date.selectArray = selectArray;
                    self.setData(date);
                    console.log(res.info);
                }, function() {
                    console.log('fail');
                })
            },
            fail: function(res) {}

        });
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