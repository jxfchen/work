<template>
	<view class="content">
		<view class="top"></view>
		<view class="address">
			<image class="address_logo" src="../../static/image/index/address.png"></image>
			<view class="address_text">
				<view class="text1">北京市石景山区中铁建设大厦20层101室</view>
				<view class="text2">郜莎婕： 185 1568 8888</view>
			</view>
			<image class="address_arrow" src="../../static/image/index/arrow.png"></image>
		</view>
		<view class="gettime">
			<view class="gettime_tit">送达时间</view>
			<image class="gettime_arrow" src="../../static/image/index/arrow.png"></image>
			<view class="gettime_text">粱露、郜莎婕、董荣··等8人</view>
		</view>
		<view class="store_title">
			<view class="store_name">乌拓力日式烧烤</view>
			<navigator url="/pages/AAthrone/AAthrone">
				<view class="AA_tit">神器开关</view>
				<image class="AA_logo" src="../../static/image/takeaway_shop/AA.png"></image>
			</navigator>
		</view>
		<view class="food_list">
			<view class="list1">
				<view class="list_left">
					<view class="food-name">宫保鸡丁</view>
					<view class="food_num">X2</view>
					<view class="food_desc">订单人：粱露、郜莎婕、董荣</view>
				</view>
				<view class="list_right">
					<view class="cost_price">￥98</view>
					<view class="now_price">¥57</view>
					<view class="num_add"></view>
				</view>
			</view>
			<view class="list1">
				<view class="list_left">
					<view class="food-name">宫保鸡丁</view>
					<view class="food_num">X2</view>
					<view class="food_desc">订单人：粱露、郜莎婕、董荣</view>
				</view>
				<view class="list_right">
					<view class="cost_price">￥98</view>
					<view class="now_price">¥57</view>
					<view class="num_add"></view>
				</view>
			</view>
			<view class="list1">
				<view class="list_left">
					<view class="food-name">宫保鸡丁</view>
					<view class="food_num">X2</view>
					<view class="food_desc">订单人：粱露、郜莎婕、董荣</view>
				</view>
				<view class="list_right">
					<view class="cost_price">￥98</view>
					<view class="now_price">¥57</view>
					<view class="num_add"></view>
				</view>
			</view>
		</view>
		<view class="top"></view>
		<view class="order">
			<view class="order_title1">订单 ¥78 优惠¥28</view>
			<view class="order_title2">个人支持¥50</view>
			<view class="order_main">
				<view class="main1">AA账单：粱露要向您支付1元</view>
				<view class="main2">详情：郜莎婕合计消费·宫保鸡丁套餐 x1：18元（优惠后）+ 餐盒1元，合计19元。郜莎婕餐补支付18元，您为梁璐支付1元。</view>
			</view>
		</view>
		<view class="gopay">
			<image class="gopay_bgm" src="../../static/image/takeaway_shop/pay_bgm.png"></image>
			<view class="gopay_text">
				<view class="gopay_text1">个人支付¥50</view>
				<view class="gopay_text2">去支付</view>
			</view>
		</view>

		<!-- <view class="example-body">
				<uni-number-box :min="2" :max="9" :value="5" />
			</view> -->
	</view>
</template>

<script>
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
import uniSection from '@/components/uni-section/uni-section.vue';
export default {
	components: {
		uniNumberBox,
		uniSection
	},
	data() {
		return {
			numberValue: 0
		};
	},
	methods: {
		change(value) {
			this.numberValue = value;
		}
	}
};
</script>

<style>
.content {
	background: #f4f5f7;
}
.top {
	height: 20upx;
	width: 100%;
	background: #f4f5f7;
	float: left;
}
.address {
	width: 750upx;
	height: 166upx;
	background: rgba(255, 255, 255, 1);
	margin-bottom: 14upx;
}
.address_logo {
	width: 28upx;
	height: 36upx;
	float: left;
	margin-top: 40upx;
	margin-left: 30upx;
	margin-right: 24upx;
}
.address_text {
	width: 80%;
	float: left;
	margin-top: 40upx;
}
.text1 {
	font-size: 30upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(38, 38, 38, 1);
	line-height: 42upx;
}
.text2 {
	font-size: 26upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
}
.address_arrow {
	float: right;
	width: 12upx;
	height: 20upx;
	margin-top: 70upx;
	margin-right: 38upx;
}
.gettime {
	width: 750upx;
	height: 92upx;
	background: rgba(255, 255, 255, 1);
}
.gettime_tit {
	margin-top: 24upx;
	margin-left: 36upx;
	float: left;
}
.gettime_text {
	margin-top: 28upx;
	margin-right: 20upx;
	float: right;
	font-size: 26upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
}
.gettime_arrow {
	width: 12upx;
	height: 20upx;
	float: right;
	margin-right: 38upx;
	margin-top: 34upx;
}
.store_name {
	font-size: 34upx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
	margin-left: 40upx;
	margin-top: 20upx;
	float: left;
}
.store_title {
	height: 88upx;
	width: 750upx;
}
.AA_tit {
	font-size: 30upx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(226, 42, 45, 1);
	float: right;
	margin-top: 24upx;
	margin-right: 36upx;
}
.AA_logo {
	width: 38upx;
	height: 38upx;
	float: right;
	margin-top: 24upx;
	margin-right: 14upx;
}
.food_list {
	width: 750upx;
	background: rgba(255, 255, 255, 1);
	float: left;
}
.list_left {
	width: 60%;
	float: left;
	margin-left: 36upx;
	margin-top: 32upx;
}
.food-name {
	font-size: 30upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(38, 38, 38, 1);
	float: left;
}
.food_num {
	font-size: 26upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	padding-left: 140upx;
	margin-top: 4upx;
}
.food_desc {
	font-size: 26upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	clear: both;
	margin-top: 20upx;
	margin-bottom: 48upx;
}
.list_right {
	float: right;
	margin-top: 32upx;
	margin-right: 38upx;
}
.line {
	width: 650upx;
	height: 2upx;
	margin-left: 50upx;
	margin-top: 30upx;
	padding-bottom: 30upx;
}
.cost_price {
	width: 54upx;
	height: 42upx;
	font-size: 30upx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(167, 167, 167, 1);
	line-height: 42upx;
	text-decoration: line-through;
	float: left;
}
.now_price {
	width: 54upx;
	height: 42upx;
	font-size: 30upx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(59, 59, 59, 1);
	line-height: 42upx;
	float: left;
	margin-left: 25upx;
}
.num_add {
	width: 40upx;
	height: 40upx;
	background: rgba(226, 42, 45, 1);
	border-radius: 40upx;
	margin-top: 2upx;
	margin-left: 148upx;
}
.order {
	width: 750upx;
	background: rgba(255, 255, 255, 1);
	height: 332upx;
	clear: both;
}
.order_title1 {
	font-size: 30upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(38, 38, 38, 1);
	float: left;
	margin-left: 36upx;
	margin-top: 24upx;
}
.order_title2 {
	font-size: 30upx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(226, 42, 45, 1);
	padding-left: 525rpx;
	padding-top: 24upx;
}
.order_main {
	width: 670upx;
	height: 210upx;
	background: rgba(244, 245, 247, 1);
	border-radius: 20upx;
	margin-left: 40upx;
	margin-top: 24upx;
}
.main1 {
	font-size: 30upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(38, 38, 38, 1);
	padding: 20upx 0 10upx 20upx;
}
.main2 {
	width: 632upx;
	height: 108upx;
	font-size: 26upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	padding-left: 20upx;
}
.gopay_bgm {
	width: 706upx;
	height: 102upx;
	margin-left: 26upx;
	margin-top: 40upx;
}
.gopay {
	margin-bottom: 100upx;
}
.gopay_text {
	position: relative;
	top: -80upx;
}
.gopay_text1 {
	font-size: 30upx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	float: left;
	margin-left: 82upx;
}
.gopay_text2 {
	font-size: 34upx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	float: right;
	margin-right: 86upx;
}
/* #ifndef APP-NVUE */
.example-body {
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	font-size: 14px;
	background-color: #ffffff;
}
/* #endif */
.example-body {
	flex-direction: column;
	padding: 15px;
	background-color: #ffffff;
}
</style>
