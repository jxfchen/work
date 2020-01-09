<template>
	<view class="main">
		<view class="recommend">店长推荐</view>
		<view>
			<view class="list" v-for="(item, index) in food" :key="index">
				<view class="food_list">
					<image :src="item.food_img" class="list_img"></image>
					<view class="list_tit">{{ item.fond_title }}</view>
					<view class="list_des">{{ item.food_describe }}</view>
					<view class="con">
						<view class="money">￥{{ item.money }}</view>
						<view class="num">吃我</view>
					</view>
				</view>
			</view>
		</view>
		<view class="guess">猜你喜欢（我常点的）</view>
		<view class="guess_list">
			<view class="guess_left">
				<view class="guess_tit">西红柿炒鸡蛋套餐</view>
				<view class="guess_text">西红柿炒鸡蛋+手撕包菜+米饭+鸡蛋汤/爱加倍专享</view>
			</view>
			<view class="guess_right"><view class="guess_money">¥28</view></view>
		</view>
		<view class="staple">主食</view>
		<view class="staple_list">
			<view class="guess_left">
				<view class="guess_tit">红豆卷</view>
				<view class="guess_text">爱加倍专享</view>
			</view>
			<view class="guess_right"><view class="guess_money">¥28</view></view>
		</view>
		<view class="buttom">
			<image class="gopay_bgm" src="../../../static/image/takeaway_shop/pay_bgm.png"></image>
			<image src="../../../static/image/takeaway_shop/shop.png" class="shop_img"></image>
			<view class="shop_num">
				<view class="shop_total">总计¥78</view>
				<view class="shop_spart">餐补¥18 + 个人¥60</view>
			</view>
			<navigator url="/pages/confirmorder/confirmorder"><view class="topay">去支付</view></navigator>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			food: [
				{
					food_img: '../../../static/image/takeOut/pic1.png',
					fond_title: '川北凉粉',
					food_describe: '丝丝入滑的口感，浓厚…',
					money: '278'
				},
				{
					food_img: '../../../static/image/takeOut/pic2.png',
					fond_title: '经典小串',
					food_describe: '丝丝入滑的口感，浓厚…',
					money: '278'
				},
				{
					food_img: '../../../static/image/takeOut/pic2.png',
					fond_title: '经典小串',
					food_describe: '丝丝入滑的口感，浓厚…',
					money: '278'
				},
				{
					food_img: '../../../static/image/takeOut/pic2.png',
					fond_title: '经典小串',
					food_describe: '丝丝入滑的口感，浓厚…',
					money: '278'
				}
			]
		};
	},
	props: {},
	methods: {}
};
</script>

<style>
.main {
	background: rgba(244, 245, 247, 1);
}
.recommend {
	margin-top: 40upx;
	margin-left: 40upx;
	font-size: 34upx;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
}
.list {
	margin-left: 40upx;
}
.food_list {
	width: 326upx;
	height: 368upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 8upx;
	border: 1upx solid rgba(232, 232, 232, 1);
	margin-right: 18upx;
	float: left;
	margin-top: 20upx;
}
.list_img {
	width: 286upx;
	height: 168upx;
	margin-top: 20upx;
	margin-left: 20upx;
}
.list_tit {
	font-size: 30upx;
	font-weight: 500;
	color: rgba(75, 75, 75, 1);
	margin-top: 20upx;
	margin-left: 20upx;
}
.list_des {
	font-size: 26upx;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	margin-left: 20upx;
	margin-top: 4upx;
}
.con {
	margin-left: 20upx;
	margin-top: 16upx;
}
.money {
	float: left;
	font-size: 30upx;
	font-weight: 500;
	color: rgba(226, 42, 45, 1);
}
.num {
	width: 104upx;
	height: 40upx;
	background: rgba(226, 42, 45, 1);
	border-radius: 24upx;
	font-size: 26upx;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 40upx;
	text-align: center;
	float: right;
	margin-right: 20upx;
}
.guess {
	margin-top: 40upx;
	margin-left: 40upx;
	font-size: 34upx;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
	clear: both;
}
.guess_list {
	width: 670upx;
	height: 204upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 8upx;
	border: 1upx solid rgba(232, 232, 232, 1);
	margin-top: 20upx;
	margin-left: 40upx;
}
.staple {
	font-size: 34upx;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
	margin-top: 40upx;
	margin-left: 40upx;
}
.staple_list {
	width: 670upx;
	height: 156upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 8upx;
	border: 1upx solid rgba(232, 232, 232, 1);
	margin-top: 20upx;
	margin-left: 40upx;
}
.buttom {
}
.guess_left {
	width: 360upx;
	margin-left: 20upx;
	float: left;
}
.guess_tit {
	font-size: 30upx;
	font-weight: 500;
	color: rgba(75, 75, 75, 1);
	margin-top: 34upx;
}
.guess_text {
	font-size: 26upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	margin-top: 4upx;
}
.guess_right {
}
.guess_money {
	float: left;
	font-size: 30upx;
	font-weight: 500;
	color: rgba(164, 164, 164, 1);
	margin-top: 82upx;
	margin-left: 78upx;
}
.shop_img {
	width: 132upx;
	height: 132upx;
	position: relative;
	top: -120rpx;
	left: 4upx;
}
.shop_num {
	position: relative;
	top: -235rpx;
	left: 130upx;
}
.shop_total {
	font-size: 30upx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
}
.shop_spart {
	font-size: 26upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
}
.topay {
	font-size: 34upx;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	position: relative;
	top: -298rpx;
	left: 560rpx;
}
.gopay_bgm {
	width: 700upx;
	height: 102upx;
	margin-top: 54upx;
	margin-left: 26upx;
}
</style>
