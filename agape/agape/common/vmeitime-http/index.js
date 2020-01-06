import http from './interface'
import configs from '../configs'
import helper from '../functions'
 
export const post = (apiType, data) => {
	let timestamp = helper.getTimeStamp();
	let token = uni.getStorageSync('token');
	// 请求接口地址
	let requestUrl = '';
	// 请求接口类型 1 商家 2 企业 3 平台
	let requestType = apiType;
	
	switch (requestType){
		case 1:
			// 如果是请求商家接口,加密请求参数
			data.i = configs.shopWxapp;
			data.t = 0;
			data.v = configs.shopWxappVersoin;
			data.from = 'wxapp';
			data.c = 'entry';
			data.a = 'wxapp';
			data.m = 'qfwm';
			
			// 加密请求内容
			data = { 'params': helper.encode(data, configs.shopSiteSecret) };
			requestUrl = configs.shopSiteUrl;
			break;
		case 2:
			requestUrl = configs.bizSiteUrl;
			break;
		case 3:
			requestUrl = configs.platformSiteUrl;
			break;
	}
	
	
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'timestamp': timestamp
		}
		config.method = 'POST';
		switch (requestType){
			case 1:
				break;
			case 2:
				config.header.secret = configs.shopSiteSecret;
				config.header.token = token;
				break;
			case 3:
				config.header.secret = configs.shopSiteSecret;
				config.header.token = token;
				break;
			default:
				break;
		}
	}
	
	//设置请求结束后拦截器
	// http.interceptor.response = (response) => {
	// 	if (1200 == response.data.code) {
	// 		uni.setStorageSync('userInfo', null);
	// 		uni.navigateTo({
	// 			url: '/pages/user/login'
	// 		})
	// 	}
	// 	return response;
	// }
	
	if (requestUrl == '') console.log('请求地址不能为空,');
    return http.request({
		url: requestUrl,
        data
    })
}

export const get = (apiType, data) => {
	let timestamp = helper.getTimeStamp();
	let token = uni.getStorageSync('token');
	// 请求接口地址
	let requestUrl = '';
	// 请求接口类型 1 商家 2 企业 3 平台
	let requestType = apiType;
	
	switch (requestType){
		case 1:
			// 如果是请求商家接口,加密请求参数
			data.i = configs.shopWxapp;
			data.t = 0;
			data.v = configs.shopWxappVersoin;
			data.from = 'wxapp';
			data.c = 'entry';
			data.a = 'wxapp';
			data.m = 'qfwm';
			
			// 加密请求内容
			data = { 'params': helper.encode(data, configs.shopSiteSecret) };
			requestUrl = configs.shopSiteUrl;
			break;
		case 2:
			requestUrl = configs.bizSiteUrl;
			break;
		case 3:
			requestUrl = configs.platformSiteUrl;
			break;
	}
	
	
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'timestamp': timestamp
		}
		config.method = 'POST';
		switch (requestType){
			case 1:
				break;
			case 2:
				config.header.secret = configs.shopSiteSecret;
				config.header.token = token;
				break;
			case 3:
				config.header.secret = configs.shopSiteSecret;
				config.header.token = token;
				break;
			default:
				break;
		}
	}
	
	//设置请求结束后拦截器
	// http.interceptor.response = (response) => {
	// 	if (1200 == response.data.code) {
	// 		uni.setStorageSync('userInfo', null);
	// 		uni.navigateTo({
	// 			url: '/pages/user/login'
	// 		})
	// 	}
	// 	return response;
	// }
	
	if (requestUrl == '') console.log('请求地址不能为空,');
    return http.request({
        url: url,
        data
    })
}

export default {
	post,
	get
}