//app.js
var e = require("./utils/http.js");
App({
  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          console.log(res.code)
          e.request("wechat/login", {
            code: res.code,
          }, function(res) {
            console.log(res)
            wx.setStorage({
              key: 'openid',
              data: res.info.openid,
            })
          },function(){
            console.log('接口报错')
          })
        }else{
          console.log('获取不到code')
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 授权跳转
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          console.log(1) //已授权
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
            }
          })
        } else {
          console.log(2) //未授权
          wx.redirectTo({
            url: '/pages/authorized_login/authorized_login',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  //多张图片上传
  uploadimg: function(data) {
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'fileData', //这里根据自己的实际情况改
      header: data.header,
      formData: {
        sequence: i + 1
      },
      success: (resp) => {
        success++;
        console.log(resp)
        console.log(i + "成功");
      },
      fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;
        if (i == data.path.length) { //当图片传完时，停止调用
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);

        } else { //若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  }
})