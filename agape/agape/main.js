import Vue from 'vue'
import App from './App'
import http from '@/common/vmeitime-http/'
import helper from '@/common/functions'
Vue.config.productionTip = false

App.mpType = 'app'

// 请求
Vue.prototype.$http = http
// 公共方法
Vue.prototype.$helper = helper


const app = new Vue({
    ...App
})
app.$mount()
