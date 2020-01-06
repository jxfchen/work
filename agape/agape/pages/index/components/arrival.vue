<template>
	<view class="main">
		<view class="input">
			<input class="input_text" placeholder="搜索商家、商品名称" />
		</view>
			<view class="nav_list">
				<view class="nav1">
					<view class="nav1_tit">全部商家</view>
					<image class="nav1_img" src="../../../static/image/arrival/arrow_down.png"></image>
				</view>
				<view class="nav2">
					<view class="nav1_tit">附近</view>
					<image class="nav1_img" src="../../../static/image/arrival/arrow_down.png"></image>
				</view>
				<view class="nav2">
					<view class="nav1_tit">智能排序</view>
					<image class="nav1_img" src="../../../static/image/arrival/arrow_down.png"></image>
				</view>
				<view class="nav2">
					<view class="nav1_tit">筛选</view>
					<image class="nav1_img" src="../../../static/image/arrival/arrow_down.png"></image>
				</view>
			</view>
		
		<view class="store_list" @click="openshop">
			<view class="list_left">
				<image class="left_img" src="../../../static/image/arrival/store2.png"></image>
			</view>
			<view class="list_right">
				<view class="store_name">渔庭仙</view>
				<view class="store_star">
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<view class="star_people">¥ 25/人</view>
					<view class="mi">280m</view>
				</view>
				<view class="type">快餐 | 工作午餐 | 增广路 </view>
				<view class="people_num">20122人消费</view>
				<view class="right_line"></view>
				<view class="right_des">6人餐 398元，8人餐 588元，10人餐...</view>
				<view class="right_discount">每逢100减8（买单立享）</view>
			</view>
		</view>
		<view class="store_list">
			<view class="list_left">
				<image class="left_img" src="../../../static/image/arrival/store2.png"></image>
			</view>
			<view class="list_right">
				<view class="store_name">渔庭仙</view>
				<view class="store_star">
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<view class="star_people">¥ 25/人</view>
					<view class="mi">280m</view>
				</view>
				<view class="type">快餐 | 工作午餐 | 增广路 </view>
				<view class="people_num">20122人消费</view>
				<view class="right_line"></view>
				<view class="right_des">6人餐 398元，8人餐 588元，10人餐...</view>
				<view class="right_discount">每逢100减8（买单立享）</view>
			</view>
		</view>
		<view class="store_list">
			<view class="list_left">
				<image class="left_img" src="../../../static/image/arrival/store2.png"></image>
			</view>
			<view class="list_right">
				<view class="store_name">渔庭仙</view>
				<view class="store_star">
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<image src="../../../static/image/arrival/star.png" class="star"></image>
					<view class="star_people">¥ 25/人</view>
					<view class="mi">280m</view>
				</view>
				<view class="type">快餐 | 工作午餐 | 增广路 </view>
				<view class="people_num">20122人消费</view>
				<view class="right_line"></view>
				<view class="right_des">6人餐 398元，8人餐 588元，10人餐...</view>
				<view class="right_discount">每逢100减8（买单立享）</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	
	data() {
		return {
		};
	},
	onLoad() {
	},
	methods: {
		openshop() {
			uni.navigateTo({
				url: '../arrival_shop/arrival_shop',
				success: res => {},
				fail: () => {},
				complete: () => {}
			})
		}
	}
};
</script>

<style>
.main{
	background:rgba(244,245,247,1);
}
.input{
}
.input_text{
	width:686upx;
	height:70upx;
	background:rgba(255,255,255,1);
	border-radius:35upx;
	text-align: center;
	font-size:28upx;
	margin: 14upx 32upx 16upx 32upx;
}
.nav_list{
	background-color: white;
	width: 750upx;
	height: 58upx;
}
.nav1{
	margin-left: 70upx;
	padding-top: 22upx;
	float: left;
}
.nav1_tit{
	font-size:30upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(38,38,38,1);
	float: left;
}
.nav1_img{
	width: 20upx;
	height: 14upx;
	margin-top: 18upx;
	margin-left: 8upx;
}
.nav2{
	margin-left: 52upx;
	padding-top: 22upx;
	float: left;
}
.store_list{
	width:750upx;
	height:380upx;
	background:rgba(255,255,255,1);
	margin-bottom: 20upx;
}
.list_left{
	float: left;
	height: 380upx;
	width: 268upx;
}
.left_img{
	width: 200upx;
	height: 200upx;
	margin-left: 28upx;
	margin-top: 40upx;
}
.list_right{
	padding-top: 40upx;
}
.store_name{
	font-size:34upx;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(51,51,51,1);
}
.store_star{
	margin-top: 12upx;
}
.star{
	width: 26upx;
	height: 26upx;
	float: left;
}
.star_people{
	font-size:24upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(153,153,153,1);
	padding-left: 434upx;
	line-height:24upx;
}
.mi{
	float: right;
	width:84upx;
	height:36upx;
	background:rgba(84,86,89,0.1);
	border-radius:2upx;
	font-size:24upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(226,42,45,1);
	line-height:36upx;
	text-align: center;
	margin-right: 28upx;
	margin-top: 20upx;
}
.type{
	margin-top: 20upx;
	font-size:24upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(153,153,153,1);
}
.people_num{
	font-size:24upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(153,153,153,1);
	margin-top: 20upx;
}
.right_line{
	width:446upx;
	height:2upx;
	background-color: #EEEEEE;
	margin-top: 20upx;
	margin-left:  268upx;
}
.right_des{
	font-size:24upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(153,153,153,1);
	margin-top: 20upx;
}
.right_discount{
	font-size:24upx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(226,42,45,1);
	margin-top: 20upx;
}
</style>
