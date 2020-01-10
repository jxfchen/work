// pages/msg/msg.js
var c = require("../../utils/http.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasMore: true,
        lists: [],
        list: [],
        status: 1,
        msgList: '',
        page1: 1,
        page2: 2,
        pageNo: 1,
    },
    click1tap: function() {
        var status = this.data.status;
        status = 1;
        var that = this;
        that.setData({
            status: status,
        })
        console.log(status);
    },
    click2tap: function() {
        var status = this.data.status;
        status = 2;
        var that = this;
        that.setData({
            status: status,
        })
        console.log(status);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getMsgList();
        this.getList();
        var self = this;
        var date = {
            list: '',
            msgList: '',
        }
        var openid = "";
        var that = this;
        var list = this.data.list;
        var msgList = this.data.msgList;
    },
    getList: function(isPage = false, isChangeTab = true) {
        var _this = this;
        c.request("index/getNoticeList", {
            page: _this.data.pageNo,
            size: "20",
        }, function(res) {
            console.log(res.info);
            if (2000 == res.code) {
                if (res.info == null || res.info.length == 0) {
                    _this.setData({
                        hasMore: false,
                    });
                    return false;
                }
                _this.setData({
                    info: res.info,
                });
                var list_str = JSON.stringify(res.info);
                var msgList = JSON.parse(list_str);
                for (let i = 0; i < msgList.length; i++) {
                    msgList[i].position = "center";
                    msgList[i].height = '';
                }
                if (isPage) {
                    //下一页的数据拼接在原有数据后面
                    msgList = _this.data.msgList.concat(msgList);
                    _this.setData({
                        msgList: msgList
                    });
                } else {
                    //第一页数据直接赋值
                    _this.setData({
                        msgList: msgList
                    });
                }
            } else {
                if (isChangeTab) {
                    _this.setData({
                        msgList: []
                    });
                }
                wx.showToast({
                    title: "没有更多了" || "获取失败",
                    icon: "none"
                })
            }
        }, function() {
            console.log('fail');
        })
    },
    //     this.getMsgList();
    //   },
    getMsgList: function(isPage = false, isChangeTab = true) {
        var _this = this;
        var openid = wx.getStorageSync('openid');
        c.request("message/getMessageList", {
            openid: openid,
            page: _this.data.pageNo,
            size: "20"
        }, function(res) {
            console.log(res.info)
            if (2000 == res.code) {
                if (res.info == null || res.info.length == 0) {
                    _this.setData({
                        hasMore: false,
                    });
                    return false;
                }
                _this.setData({
                    info: res.info,
                });
                var list_str = JSON.stringify(res.info);
                var list = JSON.parse(list_str);
                for (let i = 0; i < list.length; i++) {
                    list[i].position = "center";
                    list[i].height = '';
                }
                if (isPage) {
                    //下一页的数据拼接在原有数据后面
                    list = _this.data.list.concat(list);
                    _this.setData({
                        list: list
                    });
                } else {
                    //第一页数据直接赋值
                    _this.setData({
                        list: list
                    });
                    wx.showToast({
                        title: "没有更多了",
                        icon: "none"
                    })
                }
            } else {
                if (isChangeTab) {
                    _this.setData({
                        list: []
                    });
                }
                wx.showToast({
                    title: "没有更多了" || "获取失败",
                    icon: "none"
                })
            }
        }, function() {
            console.log('fail');
        })
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
        let _this = this;
        if (_this.data.hasMore) {
            _this.setData({
                pageNo: _this.data.pageNo + 1
            });
            _this.getMsgList(true, false);
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})