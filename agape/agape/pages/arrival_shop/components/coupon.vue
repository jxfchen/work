<template>
	<view class="main">
		<view class="sort">
			<view class="sort1">全部</view>
			<view class="sort2">#视频·8</view>
			<view class="sort2">#视频·8</view>
			<view class="sort2">#视频·8</view>
			<view class="sort2">#视频·8</view>
		</view>
		<view class="coupon_list">
			<view class="part">
				<image class="coupon_img" src="../../../static/image/takeOut/pic1.png"></image>
				<view class="coupon_titlt">【乌拓力】10店可用</view>
				<view class="coupon_text">88元工作午餐秒杀券</view>
				<view class="coupon_num">
					<view class="people_num">1.2k人已买券</view>
					<view class="money_num">10元购买</view>
				</view>
				<view class="coupon_btn">外卖秒杀券</view>
			</view>
			<view class="part">
				<image class="coupon_img" src="../../../static/image/takeOut/pic1.png"></image>
				<view class="coupon_titlt">【乌拓力】10店可用</view>
				<view class="coupon_text">88元工作午餐秒杀券</view>
				<view class="coupon_num">
					<view class="people_num">1.2k人已买券</view>
					<view class="money_num">10元购买</view>
				</view>
				<view class="coupon_btn">外卖秒杀券</view>
			</view>
			<view class="part">
				<image class="coupon_img" src="../../../static/image/takeOut/pic1.png"></image>
				<view class="coupon_titlt">【乌拓力】10店可用</view>
				<view class="coupon_text">88元工作午餐秒杀券</view>
				<view class="coupon_num">
					<view class="people_num">1.2k人已买券</view>
					<view class="money_num">10元购买</view>
				</view>
				<view class="coupon_btn">外卖秒杀券</view>
			</view>
			<view class="part">
				<image class="coupon_img" src="../../../static/image/takeOut/pic1.png"></image>
				<view class="coupon_titlt">【乌拓力】10店可用</view>
				<view class="coupon_text">88元工作午餐秒杀券</view>
				<view class="coupon_num">
					<view class="people_num">1.2k人已买券</view>
					<view class="money_num">10元购买</view>
				</view>
				<view class="coupon_btn">外卖秒杀券</view>
			</view>
			<view class="part">
				<image class="coupon_img" src="../../../static/image/takeOut/pic1.png"></image>
				<view class="coupon_titlt">【乌拓力】10店可用</view>
				<view class="coupon_text">88元工作午餐秒杀券</view>
				<view class="coupon_num">
					<view class="people_num">1.2k人已买券</view>
					<view class="money_num">10元购买</view>
				</view>
				<view class="coupon_btn">外卖秒杀券</view>
			</view>
			<view class="part">
				<image class="coupon_img" src="../../../static/image/takeOut/pic1.png"></image>
				<view class="coupon_titlt">【乌拓力】10店可用</view>
				<view class="coupon_text">88元工作午餐秒杀券</view>
				<view class="coupon_num">
					<view class="people_num">1.2k人已买券</view>
					<view class="money_num">10元购买</view>
				</view>
				<view class="coupon_btn">外卖秒杀券</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {
	},
	data() {
		return {
		};
	},
	props: {
		
	},
	methods: {
	}
};
</script>

<style>
	.main{
		float: left;
		background:rgba(244,245,247,1);
	}
	.sort{
		width: 100%;
	}
.sort1 {
	width: 90upx;
	height: 42upx;
	background: rgba(226, 42, 45, 1);
	border-radius: 21upx;
	font-size: 21upx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	line-height: 42upx;
	text-align: center;
	margin-top: 40upx;
	margin-left: 40upx;
	float: left;
}
.sort2 {
	width: 114upx;
	height: 42upx;
	background: rgba(175, 175, 176, 1);
	border-radius: 21upx;
	font-size: 21upx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	line-height: 42upx;
	margin-top: 40upx;
	margin-left: 22upx;
	float: left;
	text-align: center;
}
.coupon_list{
	margin-left: 40upx;
	margin-top: 8upx;
}
.part{
	width:326upx;
	height:428upx;
	background:rgba(255,255,255,1);
	border-radius:8upx;
	border:1upx solid rgba(232,232,232,1);
	float: left;
	margin-top: 18upx;
	margin-right: 18upx;
	margin-bottom: 40upx;
}
.coupon_img{
	width: 286upx;
	height: 168upx;
	margin: 20upx;
}
.coupon_titlt{
	font-size:30upx;
	font-weight:500;
	color:rgba(75,75,75,1);
	margin-left: 20upx;
}
.coupon_text{
	font-size:26upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(156,156,156,1);
	margin-top: 4upx;
	margin-left: 20upx;
}
.coupon_num{
	margin-left: 20upx;
	margin-top: 24upx;
}
.people_num{
	font-size:20upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(156,156,156,1);
	float: left;
}
.money_num{
	width:126upx;
	height:40upx;
	background:linear-gradient(180deg,rgba(243,84,89,1) 0%,rgba(226,42,45,1) 100%);
	box-shadow:0upx 4upx 8upx 0upx rgba(187,0,3,0.39);
	border-radius:24upx;
	font-size:20upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(255,255,255,1);
	line-height:40upx;
	text-align: center;
	float: right;
	margin-right: 20upx;
}
.coupon_btn{
	width:326upx;
	height:60upx;
	background:rgba(247,181,0,1);
	border-radius:0upx 0upx 8upx 8upx;
	font-size:26upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(255,255,255,1);
	line-height:60upx;
	text-align: center;
	float: left;
	margin-top: 20upx;
}
</style>