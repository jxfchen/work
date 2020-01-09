<template>
	<view class="content">
		<image src="../../static/image/takeaway_shop/shop_img.png" class="shop_bg"></image>
		<view class="shop_out">
			<view class="shop_card">
				<view class="card_top">
					<image src="../../static/image/takeOut/store_img.png" class="shop_header"></image>
					<view class="card_right">
						<view class="card_tit">
							<view class="card_title">乌拓力日式烧烤</view>
							<view class="card_follow">关注</view>
						</view>
						<view class="card_num">
							<image src="../../static/image/takeaway_shop/fanse.png" class="fanse_img"></image>
							<view class="fanse_num">2560</view>
							<image src="../../static/image/takeaway_shop/zan.png" class="zan_img"></image>
							<view class="zan_num">2.8W</view>
						</view>
						<view class="card_main">
							<view class="main_left">蜂鸟转送</view>
							<view class="main_time">平均27分钟</view>
							<view class="main_right">免配送费</view>
						</view>
					</view>
				</view>
				<view class="card_buttom">公告：本店团餐业务即日起正式启动，爱加倍专享价格低至8折</view>
			</view>
		</view>
		<view class="add_tit">
			<view class="tit_txt">#中式快餐、#工作午餐、#现做现卖、#日式烧烤</view>
			<view class="tit_line"></view>
		</view>
		<view class="add1">
			<image src="../../static/image/index/address.png" class="add1_img"></image>
			<image src="../../static/image/takeOut/nav.png" class="nav_img"></image>
			<view class="add1_text1">朝阳区广渠路乌拓力日式烧烤</view>
			<view class="add1_text2">据您约568米，步行5分钟</view>
		</view>
		<view class="add1">
			<image src="../../static/image/takeOut/store.png" class="add1_img"></image>
			<image src="../../static/image/takeOut/phone.png" class="nav_img"></image>
			<view class="add1_text1">朝阳区广渠路乌拓力日式烧烤</view>
			<view class="add1_text2">据您约568米，步行5分钟</view>
		</view>
		<view class="butt">
			<view class="btn_left">宴请</view>
			<view class="btn_right">外卖/自提入口</view>
		</view>
		<view class="shop_nav">
			<view class="nav1" data-tabindex="0" @tap="changeTab">
				<view :class="tabIndex==0?'nav1_after':'nav_tit'">点菜</view>
			</view>
			<view class="nav2" data-tabindex="1" @tap="changeTab">
				<view class="nav2_crile"></view>
				<view :class="tabIndex==1?'nav1_after':'nav_tit'">动态</view>
				<view class="nav_num">(66条)</view>
			</view>
			<view class="nav3" data-tabindex="2" @tap="changeTab">
				<view class="nav3_crile"></view>
				<view :class="tabIndex==2?'nav1_after':'nav_tit'">优惠券</view>
				<view class="nav_num">(26个)</view>
			</view>
		</view>
		<orderdishes :detail="mealOrderDetail" v-if="tabIndex == 0"></orderdishes>
		<dynamic v-if="tabIndex == 1"></dynamic>
		<coupon v-if="tabIndex == 2"></coupon>
	</view>
</template>

<script>
import orderdishes from './components/orderdishes.vue';
import dynamic from './components/dynamic.vue';
import coupon from './components/coupon.vue';
export default {
	components: {
		orderdishes,
		dynamic,
		coupon
	},
	data() {
		return {
			tabIndex: 0,
			mealOrderDetail: null
		};
	},
	onLoad() {
		this.mealOrderDetail = {
			test: 1
		};
	},
	methods: {
		changeTab(e) {
			console.log(e);
			this.tabIndex = e.currentTarget.dataset.tabindex;
		}
	}
};
</script>

<style>
.content {
	background-color: #f4f5f7;
}
.shop_bg {
	width: 750upx;
	height: 296upx;
}
.shop_out {
	position: relative;
	top: -145upx;
	left: 40upx;
}
.shop_card {
	width: 670upx;
	height: 252upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 20upx;
	position: absolute;
}
.shop_nav {
	width: 670upx;
	height: 98upx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0upx 1upx 0upx 0upx rgba(244, 245, 247, 1);
	border-radius: 20upx;
	margin-top: 40upx;
	margin-left: 40upx;
}
.shop_header {
	width: 122upx;
	height: 122upx;
	margin-top: 40upx;
	margin-left: 20upx;
	float: left;
}
.card_right {
	height: 122upx;
	padding-left: 172upx;
	padding-top: 40upx;
}
.card_title {
	font-size: 34upx;
	font-weight: 500;
	color: rgba(26, 26, 26, 1);
	float: left;
	width: 70%;
}
.card_follow {
	float: right;
	width: 104upx;
	height: 40upx;
	background: rgba(226, 42, 45, 1);
	border-radius: 24upx;
	font-size: 26upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 40upx;
	margin-right: 20upx;
	text-align: center;
}
.card_num {
	float: left;
	width: 70%;
}
.fanse_img {
	width: 20upx;
	height: 20upx;
	float: left;
	margin-top: 8upx;
}
.fanse_num {
	font-size: 20upx;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	float: left;
	margin-top: 6upx;
	margin-left: 8upx;
}
.zan_img {
	width: 20upx;
	height: 20upx;
	margin-top: 8upx;
	float: left;
	margin-left: 20upx;
}
.zan_num {
	font-size: 20upx;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	float: left;
	margin-top: 6upx;
	margin-left: 8upx;
}
.card_main {
	float: left;
	margin-top: 10upx;
}
.main_left {
	width: 90upx;
	height: 32upx;
	background: rgba(206, 57, 60, 0.2);
	border-radius: 4upx;
	font-size: 20upx;
	font-weight: 400;
	color: rgba(226, 42, 45, 1);
	line-height: 32upx;
	text-align: center;
	float: left;
}
.main_time {
	font-size: 20upx;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	float: left;
	margin-left: 20upx;
}
.main_right {
	font-size: 20upx;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	float: left;
	margin-left: 20upx;
}
.card_buttom {
	font-size: 20upx;
	font-weight: 400;
	color: rgba(255, 78, 84, 1);
	margin-top: 22upx;
	margin-left: 20upx;
}
.nav1 {
	float: left;
	margin-left: 128upx;
	margin-top: 22upx;
}
.nav1_after{
	font-size:36upx;
	font-family:PingFangSC-Semibold,PingFang SC;
	font-weight:600;
	color:rgba(206,57,60,1);
	border-bottom: #E22A2D 4upx solid;
}
.nav2 {
	float: left;
	margin-left: 100upx;
	margin-top: 22upx;
}
.nav_tit {
	font-size: 30upx;
	font-weight: 400;
	color: rgba(38, 38, 38, 1);
}
.nav_num {
	font-size: 16upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	text-align: center;
}
.nav2_crile{
	width:10upx;
	height:10upx;
	background:rgba(226,42,45,1);
	border-radius: 10upx;
	position: absolute;
	left: 400upx;
	top: 1010upx;
}
.nav3 {
	float: left;
	margin-left: 100upx;
	margin-top: 22upx;
}
.nav3_crile{
	width:10upx;
	height:10upx;
	background:rgba(226,42,45,1);
	border-radius: 10upx;
	position: absolute;
	left: 590upx;
	top: 1010upx;
}
.add_tit{
	margin-top: 124upx;
	height: 92upx;
	width: 750upx;
	background-color: white;
}
.tit_txt{
	font-size:26upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(156,156,156,1);
	padding-top: 36upx;
	padding-left: 40upx;
}
.add1{
	width:750upx;
	height:166upx;
	background:rgba(255,255,255,1);
}
.add1_img{
	width: 35upx;
	height: 40upx;
	margin-top: 36upx;
	margin-left: 24upx;
	float: left;
}
.add1_text1{
	font-size:30upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(38,38,38,1);
	padding-top: 36upx;
	padding-left: 82upx;
}
.add1_text2{
	font-size:26upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(156,156,156,1);
	padding-top: 10upx;
	padding-left: 82upx;
}
.tit_line{
	width:650upx;
	height:2upx;
	margin-top: 20upx;
	margin-left: 50upx;
}
.nav_img{
	width: 60upx;
	height: 60upx;
	float: right;
	margin-right: 40upx;
	margin-top: 36upx;
}
.btn_left{
	width:376upx;
	height:100upx;
	background:rgba(226,42,45,1);
	float: left;
	font-size:34upx;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(255,255,255,1);
	line-height:100upx;
	text-align: center;
}
.btn_right{
	width:374upx;
	height:100upx;
	background:rgba(32,36,50,1);
	font-size:34upx;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(255,255,255,1);
	line-height:100upx;
	text-align: center;
	margin-left: 376upx;
}
</style>
