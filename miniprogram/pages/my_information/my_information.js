// pages/my_information/my_information.js
var c = require("../../utils/http.js");
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        date: '',
        region: ['', '', ''],
        avatar: '',
        nicname: '',
        phone: '',
        hiddenmodalput: true,
        hiddenmodalphone: true,
    },
    //昵称
    modalinput: function() {
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput
        })
    },
    //取消按钮
    cancel: function() {
        this.setData({
            hiddenmodalput: true
        });
    },
    //确认
    confirm: function() {
        this.setData({
            hiddenmodalput: true
        })
        var nicname = this.data.nicname;
        var openid = wx.getStorageSync('openid');
        if (nicname == '') {
            wx.showToast({
                title: '昵称不能为空',
                icon: 'none',
            })
        } else {
            console.log(nicname, openid)
            c.request("wechatuser/updateUserNicheng", {
                openid: openid,
                nicheng: nicname,
            }, function(res) {
                console.log("nicname_success");
            }, function() {
                console.log("nicname_fail");
            })
        }

    },
    //获取昵称
    getNicname(e) {
        var nicname = this.data.nicname;
        nicname = e.detail.value;
        this.setData({
            nicname: nicname
        });
    },
    //手机号
    modalinputphone: function() {
        this.setData({
            hiddenmodalphone: !this.data.hiddenmodalphone
        })
    },
    //取消按钮
    cancelphone: function() {
        this.setData({
            hiddenmodalphone: true
        });
    },
    //确认
    confirmphone: function() {
        this.setData({
            hiddenmodalphone: true
        })
        var phone = this.data.phone;
        var openid = wx.getStorageSync('openid');
        var reg = /^1[34578]\d{9}$/;
        if (phone == '') {
            wx.showToast({
                title: '手机号码不能为空',
                icon: 'none',
            })
        } else if (!phone.match(reg)) {
            wx.showToast({
                title: '手机号码格式错误',
                icon: 'none',
            })
        } else {
            console.log(phone);
            c.request("wechatuser/updateUserPhone", {
                openid: openid,
                phone: phone,
            }, function(res) {
                console.log("phone_success");
            }, function() {
                console.log("phone_fail");
            })
        }
    },
    //获取手机号
    getPhone(e) {
        var phone = this.data.phone;
        phone = e.detail.value;
        this.setData({
            phone: phone
        });
    },

    bindDateChange: function(e) {
        var date = this.data.date;
        this.setData({
            date: e.detail.value
        })
    },
    bindRegionChange: function(e) {
        var region = this.data.region;
        this.setData({
            region: e.detail.value
        })
    },
    changeAvatar: function() {
        var that = this;
        var avatar = this.data.avatar;
        avatar = this.data.list.user_info.avatarurl;
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数，默认9
            sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function(res) {
                // console.log(res.tempFilePaths)
                var avatar = res.tempFilePaths;
                that.setData({
                    avatar: avatar,
                    upAvatar: true
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
    sexBind: function() {
        wx.showToast({
            title: '性别不可更改',
            icon: 'none',
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
                        avatar: res.info.user_info.avatarurl,
                        nicname: res.info.user_info.nicheng,
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
                console.log("fail")
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
        var openid = wx.getStorageSync('openid');
        var avatar = this.data.avatar;
        var region = this.data.region;
        var date = this.data.date;
        var nicname = this.data.nicname;
        console.log(avatar, nicname);
        wx.setStorage({
            key: 'avatar',
            data: avatar,
        })
        wx.setStorage({
            key: 'nicname',
            data: nicname,
        })
        c.request("wechatuser/updateAvatar", {
            openid: openid,
            avatarurl: avatar,
        }, function(res) {
            console.log("avatar_success");
        }, function() {
            console.log("avatar_fail");
        })
        c.request("wechatuser/updateBirthday", {
            openid: openid,
            birthday: date,
        }, function(res) {
            console.log("date_success");
        }, function() {
            console.log("date_fail");
        })
        c.request("wechatuser/updateArea", {
            openid: openid,
            province: region[0],
            city: region[1],
            xian: region[2],
        }, function(res) {
            console.log("region_success");
        }, function() {
            console.log("region_fail");
        })
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