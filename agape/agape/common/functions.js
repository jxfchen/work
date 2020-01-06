import CryptoJS from '../node_modules/crypto-js/crypto-js.js'
import constConfig from './configs.js'

// 获取文件名
const getUrlName = function getUrlName(url) {
	let tmp= new Array();//临时变量，保存分割字符串
	tmp = url.split("/");//按照"/"分割
	let pp = tmp[tmp.length-1];//获取最后一部分，即文件名和参数
	tmp = pp.split("?");//把参数和文件名分割开
	return tmp[0];
}
// 解密字符串
const decrypt = function decrypt(data, key) {
	key = key ? key : constConfig.shopSiteSecret;
	let hash = CryptoJS.MD5(key).toString();
	return JSON.parse(CryptoJS.AES.decrypt(data, hash).toString(CryptoJS.enc.Utf8));
}
// 加密字符串
const encode = function encode(data, key) {
	key = key ? key : constConfig.shopSiteSecret;
	data = JSON.stringify(data);
	let hash = CryptoJS.MD5(key).toString();
	return CryptoJS.AES.encrypt(data, hash).toString();
}
// 获取当前时间戳
const getTimeStamp = function getTimeStamp() {
	let NowTime = new Date();   
		NowTime = NowTime.getTime(); 
	return NowTime/1000;
}

export default {  
	getUrlName,
	decrypt,
	encode,
	getTimeStamp
}  