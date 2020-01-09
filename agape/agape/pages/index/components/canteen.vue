<template>
	<view class="part">
		<image src="../../../static/image/canteen/banner.png" class="part_banner"></image>
		<view class="part1">
			<image class="part1_img" src="../../../static/image/canteen/activity.png"></image>
			<view class="part1_tit">
				<view class="part1_act">
					<view class="act_tit">活动：</view>
					<view class="act1_text">中秋特惠活动详情</view>
					<image class="part1_arrow" src="../../../static/image/index/arrow.png"></image>
				</view>
				<view class="part2_notice">
					<view class="act_tit">通知：</view>
					<view class="act1_text">喜讯，全场满100包邮</view>
				</view>
			</view>
		</view>
		<view class="category">
			<view class="category-wrapper" v-if="catrgoryList.length > 0">
				<!-- 左边导航 -->
				<scroll-view scroll-y="true" class="left-wrapper" scroll-with-animation="true" :scroll-top="left_scroll">
					<view class="left-content">
						<view class="title-content" :class="select_index === index ? 'onSelected' : ''" v-for="(title, index) in catrgoryList" :key="title.id" @tap="choose(index)">
							{{ title.name }}
						</view>
					</view>
				</scroll-view>
				<!-- 右边内容 -->
				<scroll-view scroll-y="true" class="right-wrapper" scroll-with-animation="true" :scroll-top="right_scroll" @scroll="myscroll">
					<view class="right-content">
						<!-- 产品区 -->
						<view class="product-wrapper">
							<view class="category-item" :id="'list' + c_index" v-for="(c_item, c_index) in catrgoryList" :key="c_item.id">
								<!-- <view class="category-title">{{ c_item.name }}</view> -->
								<view class="category-content">
									<view class="product-item" v-for="(p_item, p_index) in c_item.content" :key="p_item.id">
										<image class="product-img" :src="p_item.thumb"></image>
										<view class="product-right">
											<text class="product-title">{{ p_item.cname }}</text>
											<view class="product-label">#零食  #薯片</view>
											<view class="product-money">¥15.80</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			windows_height: 0, //屏幕高度
			swiperList: [
			],
			catrgoryList: [
				{
					name:"今日推荐",
					content:[
						{
							thumb:"../../../static/image/canteen/goods.png",
							cname:"旺旺 仙贝",
						},
						{
							cname:"乐事薯片超值分享装",
							thumb:"../../../static/image/canteen/goods.png"
						}
					]
				},
				{
					name:"学习用品",
					content:[
						{
							thumb:"../../../static/image/canteen/goods.png",
							cname:"旺旺 仙贝",
						}
					]
				},
				{
					name:"小吃零食"
				},
				{
					name:"瓜果蔬菜"
				},
				{
					name:"海鲜"
				},
				{
					name:"综合"
				}
			],
			select_index: 0,
			right_height: [], //右侧每个内容的高度集合
			right_scroll: 0, //右侧的滑动值
			left_height: 0, //左侧总高度
			left_scroll: 0, //左侧滑动值
			last: 0
		};
	},
	onLoad() {
		this.init();
		this.windows_height = uni.getSystemInfoSync().windowHeight;
	},
	methods: {
		// init() {
		// 	uni.request({
		// 		url: 'https://www.easy-mock.com/mock/5d351e87b5e1f213739d6498/shop/categoryList', //仅为示例，并非真实接口地址。
		// 		method: 'GET',
		// 		success: res => {
		// 			if (res.data.error === 0) {
		// 				this.catrgoryList = res.data.data.list;
		// 				this.swiperList = res.data.data.banner;
		// 				this.$nextTick(() => {
		// 					this.getHeightList();
		// 				});
		// 			}
		// 		}
		// 	});
		// },
		getHeightList() {
			let _this = this;
			let selectorQuery = uni.createSelectorQuery();
			selectorQuery.select('.left-content').boundingClientRect(function(rects) {
				_this.left_height = rects.height;
			});
			selectorQuery
				.selectAll('.category-item')
				.boundingClientRect(function(rects) {
					_this.right_height = rects.map(item => item.top);
					console.log(_this.right_height);
				})
				.exec();
		},
		choose(index) {
			if (this.select_index === index) {
				return;
			}
			this.select_index = index;
			// 加入防抖
			if (this.timeout) {
				clearTimeout(this.timeout); //清除计时器
			}
			this.timeout = setTimeout(() => {
				this.right_scroll = this.right_height[index] - 110;
			}, 300);
		},
		myscroll(e) {
			//引入节流
			let right_content_height = e.detail.scrollHeight - this.windows_height;
			if (right_content_height == e.detail.scrollTop) {
				return;
			}
			let scroll_top = e.detail.scrollTop + 110; //110是banner图的高度
			//判断当前的scrollTop在哪个区间内;
			let now = +new Date();
			if (now - this.last > 100) {
				this.last = now;
				let active_index = this.right_height.findIndex((value, index, arr) => value <= scroll_top && scroll_top < arr[index + 1]);
				this.select_index = active_index;
				if (this.left_height - this.windows_height) {
					//如果有超出部分
					let diff = this.left_height - this.windows_height;
					this.left_scroll = Math.round((active_index * diff) / (this.catrgoryList.length - 1));
				}
			}
		}
	}
};
</script>

<style lang="less">
.part {
	background: rgba(248, 248, 248, 1);
}
.part_banner {
	width: 750upx;
	height: 360upx;
}
.part1 {
	width: 750upx;
	height: 140upx;
	background: rgba(255, 255, 255, 1);
	margin-top: 20upx;
	margin-bottom: 20upx;
}
.part1_img {
	width: 100upx;
	height: 100upx;
	float: left;
	margin-top: 20upx;
	margin-left: 36upx;
}
.part1_tit {
	padding-left: 162rpx;
	padding-top: 20upx;
}
.act_tit {
	font-size: 30upx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(75, 75, 75, 1);
	float: left;
}
.act1_text {
	font-size: 26upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
}
.part1_arrow {
	float: right;
	margin-right: 30upx;
	width: 12upx;
	height: 20upx;
}
.part1_act {
}
.part2_notice {
	margin-top: 16upx;
}
.category {
}
.left-wrapper {
	width: 200rpx;
	flex: 0 0 200rpx;
	background-color: #f6f6f6;

	.left-content {
	}
}
.title-content {
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 25rpx;
	cursor: pointer;
	font-weight:400;

	&:last-child {
		border-bottom: 0;
	}

	&.onSelected {
		background-color: #fff;
		position: relative;
		color: rgba(51,51,51,1);
		font-weight:600;
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 10rpx;
			height: 100%;
			background: linear-gradient(124deg, #feb436 0%, #fb7c22 100%);
		}
	}
}
.category-wrapper {
	width: 100%;
	display: flex;
	flex-direction: row;

	.right-wrapper {
		flex: 1;

		.right-content {
			width: 100%;
			padding: 20rpx 0;
			border-left: 1rpx solid #efefef;
			box-sizing: border-box;
			background-color: white;
			.banner-wrapper {
				padding: 0 20rpx;

				.swiper-content {
					width: 100%;
					height: 180rpx;
					margin-bottom: 20rpx;

					.swiper-item {
						.swiper-img {
							width: 100%;
							height: 180rpx;
						}
					}
				}
			}

			.product-wrapper {
				.category-item {
					.category-title {
						height: 60rpx;
						font-size: 26rpx;
						line-height: 60rpx;
						font-weight: 500;
						background-color: #f6f6f6;
						padding-left: 20rpx;
						color: #000;
					}

					.category-content {
						display: flex;
						flex-direction: row;
						flex-flow: wrap;
						padding: 0 20rpx 0;

						.product-item {
							width: 100%;
							.product-img {
								width: 132upx;
								height: 132upx;
								float: left;
							}
							.product-right{
								margin-bottom: 42upx;
								margin-left: 160upx;
								.product-title {
									font-size:30upx;
									font-family:PingFangSC-Medium,PingFang SC;
									font-weight:500;
									color:rgba(51,51,51,1);
								}
								.product-label{
									font-size:26upx;
									font-family:PingFangSC-Regular,PingFang SC;
									font-weight:400;
									color:rgba(153,153,153,1);
									padding-top: 6upx;
								}
								.product-money{
									font-size:40upx;
									font-family:PingFangSC-Medium,PingFang SC;
									font-weight:500;
									color:rgba(255,59,48,1);
									padding-top: 6upx;
								}
							}
							
						}
					}
				}
			}
		}
	}
}
</style>
