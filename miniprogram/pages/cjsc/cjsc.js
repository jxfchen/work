var c = require("../../utils/http.js");
// pages/cjsc/cjsc.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasMore: true,
        pageNo: 1,
        code: '',
        list: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var list = this.data.list;
        var code = this.data.code;
        code = options.code;
        var that = this;
        that.setData({
            code: code
        })
        this.getList();
    },
    cen: function(e) {
        var that = this
        var id = e.currentTarget.dataset.id
        var code = that.data.code
        wx.navigateTo({
            url: '../guide/guideb?code=' + code + '&id=' + id,
        })
    },

    getList: function(isPage = false, isChangeTab = true) {
        var code = this.data.code;
        let _this = this;
        c.request(code, {
            page: _this.data.pageNo,
            size: "10"
        }, function(res) {
            console.log(res)
            if (2000 == res.code) {
                if (res.infos == null || res.infos.length == 0) {
                    _this.setData({
                        hasMore: false,
                    });
                    return false;
                }
                _this.setData({
                    infos: res.infos,
                    code: code
                });
                var list_str = JSON.stringify(res.infos);
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
        console.log("111");
        let _this = this;
        if (_this.data.hasMore) {
            _this.setData({
                pageNo: _this.data.pageNo + 1
            })
            _this.getList(true, false);
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})