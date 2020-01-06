<template>
	<view class="content">
		<view class="change_time">
			<view class="time_title">{{ time }}</view>
			<view class="time_week" v-for="(item, index) in week" :key="index">
				<view class="week">{{ item }}</view>
			</view>
			<view class="time_day" v-for="(item, index) in day" :key="index" @click="dayclick">
				<view class="day">{{ item }}</view>
			</view>
		</view>
		<view class="change_meal">
			<view class="meal_title">
				<view class="meal_top">选择餐次</view>
				<view class="meal_logo"></view>
			</view>
			<view class="meal_content">
				<view class="time_list" v-for="(item, index) in meal" :key="index">
					<view class="list">
						<view class="list_title">{{ item.foot }}</view>
						<view class="list_main">{{ item.latest }}</view>
						<view class="list_btn">{{ item.isreserve }}</view>
					</view>
				</view>
				<view class="meal_time">HU/10-10 12:00</view>
				<view class="meal_adress">北京银行石景山支行（午餐）</view>
			</view>
		</view>
		<view class="all_meal">
			<view class="meal_title">
				<view class="meal_top">全部餐次</view>
				<view class="meal_logo"></view>
			</view>
			<view class="store_card" v-for="(item, index) in store" :key="index">
				<view class="card">
					<image class="store_bg" src="../../../static/image/takeOut/store_background.png"></image>
					<view class="store">
						<image class="store_img" src="../../../static/image/takeOut/store_img.png"></image>
						<view class="store_right">
							<view class="store_name">{{ item.store_name }}</view>
							<view class="store_tag" v-for="(item2, index) in item.tag" :key="index">
								<view class="list_tag">{{ item2 }}</view>
							</view>
						</view>
					</view>
					<view class="store_nav">
						<view class="nav_tit">{{ item.title}}</view>
						<view class="nav_content" @click="openshop">
							<view class="nav_main">进入店铺</view>
							<image class="nav_arrow" src="../../../static/image/index/arrow.png"></image>
						</view>
					</view>
					<view class="foot_list" v-for="(item3, index) in item.foot" :key="index">
						<view class="foot_card">
							<image :src="item3.foot_img" class="food_img"></image>
							<view class="fond_title">{{ item3.font_title }}</view>
							<view class="food_text">{{ item3.foot_describe }}</view>
							<view class="food_mon">￥{{ item3.money }}</view>
							<image class="like_img" :src="item3.like == 0 ? '../../../static/image/takeOut/dislike.png' : '../../../static/image/takeOut/like.png'"></image>
							<view class="food_btn">吃我</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			time: '2019年12月',
			week: ['四', '五', '六', '日', '一', '二', '三'],
			day: ['09', '10', '11', '12', '13', '14', '15'],
			status: 0,
			meal: [
				{
					foot: '早餐（08:00）',
					latest: '最晚订餐时间09日18:00前',
					isreserve: '已预定'
				},
				{
					foot: '午餐（12:00）',
					latest: '最晚订餐时间10日10:00前',
					isreserve: '未预定'
				},
				{
					foot: '晚餐（18:00）',
					latest: '最晚订餐时间 10日15:00前',
					isreserve: '未预定'
				}
			],
			store: [
				{
					store_name: '乌拓力日式烤肉',
					store_img: '../../../static/image/takeOut/store_img.png',
					tag: ['爱加倍专享', '免配送费'],
					title: '员工餐厅、工匠好菜',
					foot: [
						{
							foot_img: '../../../static/image/takeOut/pic1.png',
							font_title: '川北凉粉',
							foot_describe: '丝丝入滑的口感，浓厚…',
							money: '278',
							like: 0
						},
						{
							foot_img: '../../../static/image/takeOut/pic2.png',
							font_title: '经典小串',
							foot_describe: '丝丝入滑的口感，浓厚…',
							money: '278',
							like: 1
						}
					]
				},
				{
					store_name: '食刻 SHIKE',
					store_img: '../../../static/image/takeOut/store_img.png',
					tag: ['爱加倍专享', '免配送费'],
					title: '员工餐厅、工匠好菜',
					foot: [
						{
							foot_img: '../../../static/image/takeOut/pic3.png',
							font_title: '黄焖鸡串串',
							foot_describe: '丝丝入滑的口感，浓厚…',
							money: '278',
							like: 0
						},
						{
							foot_img: '../../../static/image/takeOut/pic4.png',
							font_title: '仙姑面',
							foot_describe: '本店招牌！独特口味…',
							money: '278',
							like: 1
						}
					]
				}
			]
		};
	},
	props: {},
	methods: {
		dayclick() {
			this.status = 1;
		},
		openshop() {
			uni.navigateTo({
				url: '../takeaway_shop/takeaway_shop',
				success: res => {},
				fail: () => {},
				complete: () => {}
			})
		}
	}
};
</script>

<style>
.content {
	background-color: #f4f5f7;
}
.change_time {
	width: 750upx;
	height: 246upx;
	background: rgba(255, 255, 255, 1);
	padding-left: 30upx;
	margin-top: 20upx;
}
.time_title {
	font-size: 26upx;
	font-weight: 400;
	color: rgba(75, 75, 75, 1);
	padding-top: 40upx;
}
.time_week {
	font-size: 20upx;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	float: left;
	margin-top: 20upx;
}
.week {
	padding-right: 86upx;
}
.time_day {
	font-size: 46upx;
	font-weight: 400;
	color: rgba(75, 75, 75, 1);
	float: left;
	margin-top: 18upx;
}
.day {
	padding-right: 48upx;
}
.day_after {
	width: 70upx;
	height: 70upx;
	background: rgba(226, 42, 45, 1);
	border-radius: 50upx;
}

.meal_title {
	height: 114upx;
	width: 100%;
	padding-left: 36upx;
}
.meal_top {
	font-size: 36upx;
	font-weight: 500;
	color: rgba(75, 75, 75, 1);
	padding-top: 40upx;
}
.meal_logo {
	width: 28upx;
	height: 4upx;
	background-color: #ce393c;
	margin-left: 4upx;
}
.meal_content {
	width: 750upx;
	height: 388upx;
	background: rgba(255, 255, 255, 1);
}
.time_list {
	margin-left: 40upx;
}
.list {
	width: 212upx;
	height: 244upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 8upx;
	border: 1upx solid rgba(232, 232, 232, 1);
	float: left;
	margin-right: 16upx;
	margin-top: 20upx;
}
.list_title {
	font-size: 30upx;
	font-weight: 500;
	color: rgba(75, 75, 75, 1);
	text-align: center;
	padding-top: 24upx;
}
.list_main {
	width: 156upx;
	height: 82upx;
	font-size: 26upx;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	padding-top: 10upx;
	margin: 0 auto;
}
.list_btn {
	width: 210upx;
	height: 66upx;
	background: rgba(226, 42, 45, 1);
	font-size: 30upx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	text-align: center;
	line-height: 66upx;
	margin-top: 20upx;
	border-radius: 0 0 8upx 8upx;
}
.meal_time {
	font-size: 30upx;
	font-weight: 400;
	color: rgba(38, 38, 38, 1);
	text-align: center;
	padding-top: 22upx;
}
.meal_adress {
	font-size: 26upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	text-align: center;
	margin-top: 4upx;
}
.card {
	width: 710upx;
	height: 660upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 20upx;
	margin-left: 20upx;
	margin-bottom: 40upx;
}
.store_bg {
	width: 710upx;
	height: 128upx;
}
.store {
	position: relative;
	top: -108upx;
	left: 16upx;
}
.store_img {
	width: 122upx;
	height: 122upx;
	float: left;
	position: absolute;
}
.store_right {
	float: left;
	margin-left: 152upx;
	width: 500upx;
	position: absolute;
}
.store_name {
	font-size: 36upx;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
}
.list_tag {
	float: left;
	width: 108upx;
	height: 32upx;
	background: rgba(0, 0, 0, 0.2);
	border-radius: 4upx;
	font-size: 20upx;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 32upx;
	text-align: center;
	margin-right: 16upx;
	margin-top: 2upx;
}
.store_nav {
	margin-top: 34upx;
}
.nav_tit {
	width: 65%;
	font-size: 34upx;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
	float: left;
	margin-left: 16upx;
}
.nav_content {
	float: right;
	margin-right: 20upx;
}
.nav_main {
	font-size: 26upx;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	float: left;
	margin-top: 8upx;
}
.nav_arrow {
	width: 12upx;
	height: 20upx;
	margin-left: 20upx;
	margin-top: 16upx;
}
.foot_list {
	margin-top: 42upx;
	padding-left: 15upx;
	margin-top: 120upx;
}
.foot_card {
	width: 326upx;
	height: 368upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 8upx;
	border: 1upx solid rgba(232, 232, 232, 1);
	float: left;
	margin-right: 10upx;
}
.food_img {
	width: 286upx;
	height: 168upx;
	margin-top: 20upx;
	margin-left: 20upx;
}
.fond_title {
	font-size: 30upx;
	font-weight: 500;
	color: rgba(75, 75, 75, 1);
	padding-left: 20upx;
	margin-top: 20upx;
}
.food_text {
	font-size: 26upx;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	padding-left: 20upx;
	padding-top: 4upx;
}
.food_mon {
	font-size: 30upx;
	font-weight: 500;
	color: rgba(226, 42, 45, 1);
	padding-left: 20upx;
	margin-top: 16upx;
	float: left;
}
.like_img {
	width: 32upx;
	height: 30upx;
	float: left;
	margin-left: 56upx;
	margin-top: 24upx;
}
.food_btn {
	width: 104upx;
	height: 40upx;
	background: rgba(226, 42, 45, 1);
	border-radius: 24rpx;
	font-size: 26upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 40upx;
	margin-top: 18upx;
	margin-left: 22upx;
	float: left;
	text-align: center;
}
</style>
