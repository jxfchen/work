// pages/push_team/push_team.js
var c = require("../../utils/http.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag: '1',
        avatar: '',
        code: '',
        tiplist:[],
        type_id:0,
    },
    /**
   * 显示弹窗
   */
    buttonTap: function () {
        var self = this;
        var date = {
            tiplist: '',
        }
        var tiplist = this.data.tiplist;
        var type_id = this.data.type_id;
        type_id=65;
        var that=this;
        that.setData({
            type_id: type_id,
        })
        c.request("index/getTips", {
            type_id: type_id,
        }, function (res) {
            that.setData({
                info: res.info,
            });
            var list_str = JSON.stringify(res.info);
            tiplist = JSON.parse(list_str);
            date.tiplist = tiplist;
            self.setData(date);
            console.log(tiplist);
            wx.showModal({
                title: '',
                content: tiplist.content,
                showCancel:false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        }, function () {
            console.log('fail');
        })
        
    },
    button2Tap: function () {
        var self = this;
        var date = {
            tiplist: '',
        }
        var tiplist = this.data.tiplist;
        var type_id = this.data.type_id;
        type_id = 66;
        var that = this;
        that.setData({
            type_id: type_id,
        })
        c.request("index/getTips", {
            type_id: type_id,
        }, function (res) {
            that.setData({
                info: res.info,
            });
            var list_str = JSON.stringify(res.info);
            tiplist = JSON.parse(list_str);
            date.tiplist = tiplist;
            self.setData(date);
            console.log(tiplist);
            wx.showModal({
                title: '',
                content: tiplist.content,
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        }, function () {
            console.log('fail');
        })
    },

    navtap(){
        wx.navigateTo({
            url: '/pages/pushteam_details/pushteam_ details',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },

    bindManager(e) {
        const that = this;
        var flag = this.data.flag;
        var flag = '1';
        that.setData({
            flag: flag,
        })
        console.log(flag)
    },
    bindstaff(e) {
        const that = this;
        var flag = this.data.flag;
        var flag = '2';
        that.setData({
            flag: flag,
        })
        console.log(flag)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var self = this;
        var date = {
            list: '',
            melist: '',
            code: '',
        }
        var openid = "";
        var that = this;
        var list = [];
        var melist = [];
        var avatar = this.data.avatar;
        var code = this.data.code;
        avatar = wx.getStorageSync('avatarurl');
        that.setData({
            avatar: avatar
        })
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
                c.request("wechatuser/getMyTeam", {
                    openid: that.data.openid
                }, function(res) {
                    that.setData({
                        info: res.info,
                    });
                    var list_str = JSON.stringify(res.info);
                    list = JSON.parse(list_str);
                    date.list = list;
                    self.setData(date);
                    console.log(list);
                }, function() {
                    console.log('fail');
                })
                c.request("wechatuser/index", {
                    openid: that.data.openid
                }, function(res) {
                    that.setData({
                        info: res.info,
                    });
                    var list_str = JSON.stringify(res.info);
                    var codeList = JSON.parse(list_str);
                    var code = res.info.user_info.invite_code;
                    date.code = code;
                    self.setData(date);
                    console.log(code)
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
    // 分享
    onShareAppMessage: function(res) {
        console.log(res);
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        var code = this.data.code;
        return {
            title: '团餐推客',
            path: '/pages/index/index?invest_code='+code
        }
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
})