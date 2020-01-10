// pages/demo/demo.js
let City = require('../../utils/allcity.js');
var c = require("../../utils/http.js");
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  data: {
    city: [],
    config: {
      horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
      animation: true, // 过渡动画是否开启
      search: true, // 是否开启搜索
      searchHeight: 45, // 搜索条高度
      suctionTop: true, // 是否开启标题吸顶
      nowprovince:'',
        nowcity:'',
        nowdistrict:'',
        addressList:'',
        address:'',
    }
  },
  onLoad() {
      var self = this;
      var date = {
          addressList: '',
      }
      var that = this;
      var addressList = this.data.addressList;
      var json=[];
      //地址
      c.request("index/getOpenCity", {}, function (res) {
          that.setData({
              open_city: res.open_city,
          });
          var addressList_str = JSON.stringify(res.open_city);
          addressList = JSON.parse(addressList_str);
          date.addressList = addressList;
        //   json = {
        //       title: "热门城市", type: 'hot', item: [{ "name": addressList,"key": "热门","test":"testValue"}] }
        //     var city=''; 
        //   city=City;
        //   city.push(json)
        //   console.log(city)
        //   date.city = city;
          self.setData(date);
      }, function () {
          console.log('fail');
      })

      // 实例化腾讯地图API核心类
      qqmapsdk = new QQMapWX({
          key: 'M6FBZ-VQQKX-D6Y43-TYKVN-VCP3K-Z5FY4' // 必填
      });
      //获取当前经纬度
      var nowprovince = this.data.nowprovince;
      var nowcity = this.data.nowcity;
      var nowdistrict = this.data.nowdistrict;
      var that = this;
      wx.getLocation({
          type: 'wgs84',
          success(res) {
              //使用腾讯地图的reverseGeocoder方法获取地址信息
              qqmapsdk.reverseGeocoder({
                  location: {
                      latitude: res.latitude, //纬度
                      longitude: res.longitude //经度
                  },
                  success: function (addressRes) {
                      console.log(addressRes)
                      nowprovince = addressRes.result.address_component.province; //当前位置信息
                      nowcity = addressRes.result.address_component.city;
                      nowdistrict = addressRes.result.address_component.district;
                      that.setData({
                          nowprovince: nowprovince,
                          nowcity: nowcity,
                          nowdistrict: nowdistrict,
                      })
                  }
              });
          }
      })
    // wx.showLoading({
    //   title: '加载数据中...',
    // })
    // // 模拟服务器请求异步加载数据
    // setTimeout(()=>{
      this.setData({
          city: City
      })

    
    //   wx.hideLoading()
    // },2000)

  },
  bindtap(e) {
    var address=this.data.address;
      address = e.detail.name;
    var that=this;
    that.setData({
        address: address
    })
      wx.navigateBack({
          url:"/pages/index/index"
      })
  },
    hottap(e){
        console.log(e)
        var address = this.data.address;
        var hotcity = e.currentTarget.dataset.hotcity;
        var that = this;
        that.setData({
            address: hotcity
        })
        wx.navigateBack({
            url: "/pages/index/index"
        })
    },
    mycitytap(e) {
        console.log(e)
        var address = this.data.address;
        var mycity = e.currentTarget.dataset.mycity;
        var that = this;
        that.setData({
            address: mycity
        })
        wx.navigateBack({
            url: "/pages/index/index"
        })
    },
    onUnload: function () {
        var address = this.data.address;
        wx.setStorage({
            key: 'address',
            data: address,
        })
    }

})

