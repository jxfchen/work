var c = require("../../utils/http.js");
var baseUrl = require("../../utils/config.js");
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        nicname: '',
        avatar: '',
        hide: false,
        modalHidden: true,
        tiplist: '',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        hide2: true
    },
    getPhoneNumber: function (e) {//点击获取手机号码按钮
        var that = this;
        wx.checkSession({
            success: function () {
                console.log(e)
                console.log(e.detail.iv)
                console.log(e.detail.encryptedData)
                var openid = wx.getStorageSync('openid')
                var sessionKey = wx.getStorageSync('session_key')
                var encryptedData = e.detail.encryptedData
                var iv = e.detail.iv
                c.request("wechat/getUserPhone", {
                    openid: openid,
                    sessionKey: sessionKey,
                    encryptedData: encryptedData,
                    iv: iv
                }, function (res) {
                    console.log(res)
                    that.setData({
                        hide2: false,
                    })
                    wx.setStorage({
                        key: 'phone',
                        data: res.phoneNumber,
                    })
                }, function () {
                    console.log('fail');
                })
            },
        });
    },
    ret: function (e) {
        var that = this
        that.setData({
            hide2: false,
        })
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
        type_id = 64;
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
    infortap(){
        wx.navigateTo({
            url: '/pages/my_information/my_information?title=my_information',
        })
    },
    msgList: function(e) {
        wx.navigateTo({
            url: '../msg/msg',
        })
    },
    personaltap: function() {
        wx.navigateTo({
            url: '/pages/income_details/income_details',
        })
    },
    teamtap: function () {
        wx.navigateTo({
            url: '/pages/push_team/push_team',
        })
    },
    copyTBL: function(e) {
        var self = this;
        wx.setClipboardData({
            data: self.data.list.user_info.invite_code,
            success: function(res) {}
        });
    },
    shequn: function(e) {
        wx.navigateTo({
            url: '../shequn/shequn',
        })
    },
    //授权登录
    bindGetUserInfo(e) {
        //查看是否授权
        wx.getSetting({
            success(res) {
                wx.getUserInfo({
                    success(res) {
                        console.log(res.userInfo)
                        wx.setStorage({
                            key: 'avatarurl',
                            data: res.userInfo.avatarUrl
                        })
                        wx.setStorage({
                            key: 'nickname',
                            data: res.userInfo.nickName
                        })
                        c.request("wechat/setUserinfo", {
                            openid: wx.getStorageSync('openid'),
                            nickname: res.userInfo.nickName,
                            gender: res.userInfo.gender,
                            avatarurl: res.userInfo.avatarUrl,
                            city: res.userInfo.city,
                            province: res.userInfo.province,
                            country: res.userInfo.country,
                            language: res.userInfo.language,
                        }, function (res) {
                            var scene = app.globalData.scene;
                            wx.reLaunch({
                                url: '/pages/me/me?scene=' + scene,
                            })
                        }, function () {
                            wx.showToast({
                                title: '加载数据失败',
                            })
                            console.log('shibai')
                        })
                    }
                })
            }
        })
    },
    // 认证判断
    rz: function(e) {
        var that = this;
        var code = app.globalData.scene;
        if (code != '' && code !=undefined&&code!=null){
            var openid = wx.getStorageSync('openid')
            c.request("index/setRecommend", {
                openid: openid,
                invite_code: code,
            },
                function (res) {
                    if (res.code == 2000) {
                    } else {
                        //   console.log(res)
                        // wx.showToast({
                        //   title: res.msg,
                        //   icon: 'none'
                        // })
                    }
                },
                function () {
                    console.log('fail');
                })
        }
        var openid = wx.getStorageSync('openid')
        c.request("wechatuser/getAttestation1", {
            openid: openid
        }, function(res) {
            console.log(res)
            // var invest_code = wx.getStorageSync('invest_code');
            // console.log(invest_code);
            // if (invest_code == undefined){
            //     var yq=0;
            // }else{
            //     var yq=1;
            // }
            var yq = res.is_recommend //0:false,1:true
            var rz = that.data.rz //0:false,1:true
            if (yq == 0 && rz == 2) {
                wx.navigateTo({
                    url: '../identity_authentication/identity_authentication',
                })
            } else if (yq == 1 && rz == 2) {
                wx.navigateTo({
                    url: '../certification_first/certification_first',
                })
            } 
            console.log('yq:', yq, 'rz:', rz)
        }, function() {
            console.log('fail');
        })
    },
    guide: function(e) {
        var code = e.currentTarget.dataset.id
        // console.log(code)
        wx.navigateTo({
            url: '../guide/guide?code=' + code,
        })
    },
    cjsc: function(e) {
        var code = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../cjsc/cjsc?code=' + code,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options == undefined){}else{
            console.log(options);
            if (options.scene != '' && options.scene != undefined){
                app.globalData.scene = options.scene;
            }
        }
           
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                    // console.log(1) //已授权
                } else {
                    // console.log(2) //未授权
                    wx.redirectTo({
                        url: '/pages/index/index',
                    })
                }
            }
        })
        this.init();
        this.setData({
            imgurl: baseUrl.config.image_base_url
        })
        //var avatar=undefined
        // var nicname = undefined
        var avatar=this.data.avatar;
        console.log(avatar)
    },
    ewm: function(e) {
        var openid = wx.getStorageSync('openid')
        var that = this
        c.request("activity/qrcode", {
            openid: openid
        }, function(res) {
            console.log(res)
            var img = that.data.imgurl
            // console.log(img + res.qrcode)
            that.setData({
                ewm: img + res.qrcode,
                hide: true
            })
        }, function() {
            console.log('fail');
        })
    },
    close: function(e) {
        var that = this
        that.setData({
            hide: false
        })
    },
    init: function() {
        var self = this;
        var date = {
            list: '',
        }
        var that = this;
        var list = [];
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
                c.request("wechatuser/index", {
                    openid: that.data.openid
                }, function(res) {
                    that.setData({
                        info: res.info,
                        rz: res.info.user_info.card_status
                    });
                    var list_str = JSON.stringify(res.info);
                    list = JSON.parse(list_str);
                    date.list = list;
                    self.setData(date);
                    console.log(res);
                    var tx = wx.getStorageSync('avatarurl')
                    if (res.info.user_info.avatarurl == tx) {
                        wx.setStorageSync('avatar', res.info.user_info.avatarurl)
                    } else {
                        wx.getStorageSync('avatar')
                    }
                    that.setData({
                        avatar: wx.getStorageSync('avatar')
                    });
                }, function() {
                    console.log('fail');
                })
            },
            fail: function(res) {}

        });
        this.setData(date);
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })

    },
    saveImg: function() {
        let that = this
        wx.getSetting({
            success(res) {
                //未授权 先授权 然后保存
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success(re) {
                            that.saveToBlum();
                        }
                    })
                } else {
                    //已授 直接调用保存到相册方法
                    wx.showModal({
                        title: '',
                        content: '保存二维码到相册',
                        confirmText: "保存",
                        cancelText: "取消",
                        success: function(res) {
                            console.log(res);
                            if (res.confirm) {
                                that.saveToBlum();
                            } else {
                                return
                            }
                        }
                    });
                }
            }
        })
    },
    saveToBlum: function() {
        var that = this
        let imgUrl = that.data.ewm;
        wx.getImageInfo({
            src: imgUrl,
            success: function(ret) {
                var path = ret.path;
                wx.saveImageToPhotosAlbum({
                    filePath: path,
                    success(result) {
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success'
                        })
                    },
                })
            }
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
        this.onLoad()
        var nicname = this.data.nicname;
        var avatar = this.data.avatar;
        var avatar = wx.getStorageSync('avatar');
        var nicname = wx.getStorageSync('nicname');
        console.log(avatar)
        console.log(nicname)
        this.setData({
            avatar: avatar,
            nicname: nicname
        })

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