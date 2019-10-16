//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customItem: '全部',
    list: [{
      pic: '/images/show.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show2.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show1.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show2.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show1.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show1.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show2.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show2.jpg',
      position: 'center',
      height: ''
    }, {
      pic: '/images/show1.jpg',
      position: 'center',
      height: ''
    }],
    leftHeight: 0,
    rightHeight: 0,
    picHeight: '',
    swiperCurrent: 0,
    noticeList: [{
      content0: "恭喜02000号推客成功提现12800元！",
    },
    {
      content0: "恭喜02000号推客成功提现12800元！",
    }]
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


  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var list={
        address_img:"/images/address.png",
        region: ['山东省', '济南市', '全部'],
        arrow_img:"/images/arrow.png",
        background: ["/images/timg.jpg", "/images/timg.jpg", "/images/timg.jpg"],
        notice_img:"/images/address.png",
        logo1:"/images/task1.png"
      }
      this.setData(list);
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
  imageLoadLeft: function (e) {

    //获取图片的原始宽度和高度

    let originalWidth = e.detail.width;

    let originalHeight = e.detail.height;

    let picHeight = this.data.picHeight
    picHeight = 165 / originalWidth * originalHeight

    var list = this.data.list

    let index = e.currentTarget.dataset.index
    list[index].height = picHeight
    this.setData({
      list: list
    })

    this.data.leftHeight += picHeight

  },

  //右边的图片高度之和
  imageLoadRight: function (e) {

    //获取图片的原始宽度和高度

    let originalWidth = e.detail.width;

    let originalHeight = e.detail.height;

    let picHeight = this.data.picHeight
    picHeight = 165 / originalWidth * originalHeight

    var list = this.data.list

    let index = e.currentTarget.dataset.index
    list[index].height = picHeight
    this.setData({
      list: list
    })

    this.data.rightHeight += picHeight

  },
  height_: function () {
    var that = this
    var list = that.data.list
    setTimeout(() => {
      var leftHeight = that.data.leftHeight
      var rightHeight = that.data.rightHeight
      var disparity_ = ''
      disparity_ = Math.abs(leftHeight - rightHeight)
      var min_ = { a: 300, index: 0 }
      // console.log(disparity_)

      if (leftHeight > rightHeight && disparity_ > 100) {
        for (var i = 0; i < list.length; i += 2) {
          var tmp = Math.abs(list[i].height - disparity_) / 2
          if (tmp < min_.a) {
            min_ = { a: tmp, index: i }
            // console.log(min_)
          }
          // console.log(list[i].height, disparity_)

        }
        list[min_.index].position = 'right'
      }
      if (leftHeight < rightHeight && disparity_ > 100) {
        for (var i = 1; i < list.length; i += 2) {
          var tmp = Math.abs(list[i].height - disparity_) / 2
          if (tmp < min_.a) {
            min_ = { a: tmp, index: i }
            // console.log(min_)
          }

          // console.log(list[i].height, disparity_)
        }
        list[min_.index].position = 'left'
      }
      console.log(list)
      this.setData({
        list: list
      })
    }, 1000)
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