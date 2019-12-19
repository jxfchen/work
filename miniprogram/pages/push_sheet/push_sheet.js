// pages/push_sheet/push_sheet.js
var c = require("../../utils/http.js");
var u = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    rad: '-1',
    istarget: true,
    showModal: false,
    swiperCurrent: 0,
    background: ["/images/push_banner.png", "/images/push_banner.png", "/images/push_banner.png"],
    project_type_id: [],
    pricesum: 0,
    peoplenum: 0,
      daynum:0,
    status: true,
  },
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.detail.current
    })
  },

  /**
   * 图片手动滑动时，获取当前的轮播id
   */
  imageChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.currentTarget.id
    })
  },

  // 项目类型
  clas: function(e) {
    var that = this
    var a = e.currentTarget.dataset.index
    that.setData({
      rad: a,
      restaurant_id: e.currentTarget.dataset.id, // 服务id
    })
    console.log(that.data.restaurant_id)
  },
  //餐次
  checkboxChange(e) {
    var that = this
    let string = "mealist[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.mealist[e.target.dataset.index].selected
    })
    let detailValue = this.data.mealist.filter(it => it.selected).map(it => it.id + ':' + it.price)
    var k
    var i
    var myhash = []
    for (k in detailValue) {
      var a = detailValue[k].split(':');
      for (i in a) {
        myhash[a[0]] = a[1]
      }
    }
    that.setData({
      project_type_id: detailValue, // 项目类型id
      myhash: myhash,
      fwid: detailValue
    })
    console.log("fwid" + that.data.fwid)
  },
  // 价格
  slider: function(e) {
    var that = this
    var num = e.detail.value
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    that.data.mealist[index].price = e.detail.value
    var hash = that.data.myhash
    hash[id] = num
    var arr = []
    var arr1 = []
    for (var i = 0; i < hash.length; i++) {
      if (hash[i] != undefined) {
        var a = i + ':' + hash[i]
        arr.push(a)
      }
    }
    that.setData({
      mealist: that.data.mealist,
      myhash: hash,
      fwid: arr
    })
    for (var i = 0; i < hash.length; i++) {
      if (hash[i] != undefined) {
        var b = parseInt(hash[i])
        arr1.push(b)
      }
    }
    console.log(arr1)
    var pricesum = this.data.pricesum;
    pricesum
    for (var i = 0; i < arr1.length; i++) {
      pricesum += arr1[i];
    }
    that.setData({
      pricesum: pricesum
    })
    console.log("pricesum" + pricesum)
  },
  //就餐人数
  numberInput: function(e) {
    var peoplenum = this.data.peoplenum;
    this.setData({
      peopleNumber: e.detail.value
    })
    var that = this;
    peoplenum = parseInt(e.detail.value)
    that.setData({
      peoplenum: peoplenum
    })
    console.log(peoplenum)
  },
  //天数
    daynumInput: function (e) {
        var daynum = this.data.daynum;
        this.setData({
            daynum: e.detail.value
        })
        var that = this;
        daynum = parseInt(e.detail.value)
        that.setData({
            daynum: daynum
        })
        console.log(daynum)
    },

  //联系方式
  mePhoneInput: function(e) {
    this.setData({
      mePhone: e.detail.value
    })
    console.log(this.data.mePhone)
  },
  customerPhoneInput: function(e) {
    this.setData({
      customerPhone: e.detail.value
    })
    console.log(this.data.customerPhone)
  },
  //优先联系
  content: function(e) {
    var that = this
    var a = e.currentTarget.dataset.index
    that.setData({
      cont: a,
      content_id: e.currentTarget.dataset.id, // 服务id
    })
    console.log(this.data.content_id)
  },
  /**
   * 图片手动滑动时，获取当前的轮播id
   */
  imageChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.currentTarget.id
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
    var list = this.data.list;
    var that = this;
    var openid = wx.getStorageSync('openid');
    var code = options.title;
    that.setData({
      openid: openid, //类型
      code: code, //餐次
    })
    var a = wx.getStorageSync('phone')
    console.log(a)
    if(a == ''){
      self.setData({
        myphone: '您的联系方式，手机号/或者微信'
      })
    }else{
      self.setData({
        myphone: a,
        mePhone: a,
      })
    }
    // c.request("pushersheet/getProjectType", {}, function(res) {
    //   console.log(res)
    //   var arr = res.meal_list
    //   let newArr = arr.map(obj => {
    //     return {
    //       id: obj.id,
    //       pid: obj.pid,
    //       type: obj.type,
    //       name: obj.name,
    //       nickname: obj.nickname,
    //       selected: false,
    //       price: 0,
    //     }
    //   })
    //   that.setData({
    //     prolist: res.project_list, //类型
    //     mealist: newArr, //餐次
    //   })
    //   console.log(that.data.mealist)
    // }, function() {})

    var list = [];
    c.request("restaurant/getDetailById", {
      id: code,
    }, function(res) {
      console.log(res)
      var arr = res.meal_list
      let newArr = arr.map(obj => {
        return {
          id: obj.id,
          pid: obj.pid,
          type: obj.type,
          name: obj.name,
          nickname: obj.nickname,
          selected: false,
          price: 0,
        }
      })
      that.setData({
        info: res.info,
        prolist: res.project_list, //类型
        mealist: newArr, //餐次
      })
      if (that.data.mealist.length == 0){
        that.setData({
          emp: false
        })
      }else {
        that.setData({
          emp: true
        })
      }
      list = res.info;
      date.list = list;
      self.setData(date);
      console.log(res)
      var i;
      var k = res.info.relation_infos
      for (i in k) {
        console.log(k[i])
        if (k[i].remark == 'num') {
          that.setData({
            name: k[i].award
          })
        }
        if (k[i].remark == 'num_name') {
          that.setData({
            namea: k[i].award
          })
        }
      }
    }, function() {})
    this.setData(date);
  },
  bindClick: function(e) {
    let that = this;
    if (!that.data.openid) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return false;
    }
    if (!that.data.code) {
      wx.showToast({
        title: '非法请求',
        icon: 'none'
      })
      return false;
    }
    if (!that.data.restaurant_id) {
      wx.showToast({
        title: '请选择项目类型',
        icon: 'none'
      })
      return false;
    }
    if (that.data.emp != false){
      if (that.data.fwid == null || that.data.fwid.length == 0) {
        wx.showToast({
          title: '请选择餐次需求',
          icon: 'none'
        })
        return false;
      }
    }
    if (!that.data.peopleNumber) {
      wx.showToast({
        title: '请填写就餐人数',
        icon: 'none'
      })
      return false;
    }
    if (!that.data.mePhone) {
      wx.showToast({
        title: '请填写您的联系方式',
        icon: 'none'
      })
      return false;
    }
    if (!u.isMobile(that.data.mePhone) || that.data.mePhone.length > 11) {
      wx.showToast({
        title: '您的联系手机号格式不正确',
        icon: 'none'
      })
      return false;
    }
    if (!that.data.customerPhone) {
      wx.showToast({
        title: '请填写客户联系方式',
        icon: 'none'
      })
      return false;
    }
    if (!u.isMobile(that.data.customerPhone) || that.data.customerPhone.length > 11) {
      wx.showToast({
        title: '客户联系手机号格式不正确',
        icon: 'none'
      })
      return false;
    }
    if (that.data.mePhone == that.data.customerPhone) {
      wx.showToast({
        title: '两个联系号码不能一样',
        icon: 'none'
      })
      return false;
    }
    if (that.data.content_id == null) {
      wx.showToast({
        title: '请选择优先联系人',
        icon: 'none'
      })
      return false;
    }
    if (that.data.role_id == null) {
      wx.showToast({
        title: '请选择您的角色',
        icon: 'none'
      })
      return false;
    }
    c.request("pushersheet/postPusherSheet", {
      openid: that.data.openid,
      restaurant_id: that.data.code, //服务id
      project_type_id: that.data.restaurant_id, //项目类型id
      meals: that.data.fwid, // 餐次，价格
      eating_num: that.data.peopleNumber, //就餐人数
      contact: that.data.mePhone, // 联系方式
      contact_customer: that.data.customerPhone, //客户联系方式
      first_contact: that.data.content_id, //优先联系人
      role: that.data.role_id, //您的角色
      days: that.data.daynum
    }, function(res) {
      if (2000 == res.code) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: res.msg || '提交成功',
          success(res) {
            if (res.confirm) {
              wx.navigateBack();
            }
          }
        })
      } else {
        wx.showToast({
          title: res.msg || '提交失败',
          icon: 'none'
        })
      }
    }, function() {})
  },
  wqd: function(e) {
    var that = this
    var a = e.currentTarget.dataset.index
    that.setData({
      rol: a,
      role_id: e.currentTarget.dataset.id, // 服务id
    })
    console.log(this.data.role_id)
    this.setData({
      showModal: true,

    })
    var min_profit = '';
    var max_profit = '';
    var list = this.data.list;
    var pricesum = this.data.pricesum;
    var peoplenum = this.data.peoplenum;
    var daynum=this.data.daynum;
      if (daynum == 0 || isNaN(daynum)){
       var sum = pricesum * peoplenum
    }else{
        var sum = pricesum * peoplenum * daynum;
    }
    console.log(sum)
    var status = this.data.status;
    if (this.data.role_id == 1) {
      if (list.is_start_infomation == 0) {
        status = false;
        that.setData({
          status: status,
        })
      } else {
        status = true;
        that.setData({
          status: status,
        })
        if (sum < 100000) {
          that.setData({
            min_profit: 50
          })
        } else {
          that.setData({
            min_profit: 100
          })
        }
      }
      if (list.is_pusher_rate == 1) {
        that.setData({
          max_profit: list.pusher_profit / 100 * sum,
        })
      } else {
        that.setData({
          max_profit: list.pusher_profit,
        })
      }
    } else {
      if (list.is_start_infomation == 0) {
        status = false;
        that.setData({
          status: status,
        })
      } else {
        status = true;
        that.setData({
          status: status,
        })
        if (sum < 100000) {
          that.setData({
            min_profit: 50
          })
        } else {
          that.setData({
            min_profit: 100
          })
        }
      }
      if (list.is_partner_rate == 1) {
        that.setData({
          max_profit: list.partner_max_profit / 100 * sum,
        })
      } else {
        that.setData({
          max_profit: list.partner_max_profit,
        })
      }
    }
  },
  ok: function() {
    this.setData({
      showModal: false
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})