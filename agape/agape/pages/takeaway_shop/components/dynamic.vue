<template>
	<view>
		<view class="sort">
			<view class="sort1">全部</view>
			<view class="sort2">#视频·8</view>
		</view>
		<view class="water-fill">
			<template v-if="waterList.length != 0">
				<view class="water-wrapper" @touchstart='handletouchstart' @touchmove='handletouchmove' @touchend='handletouchend'>
					<refreshView ref="refreshView" />
					<view class="water-box">
						<view class="water-sub" v-for="(items,index) in waterList" :key="index">
							<view class="water-item" v-for="(item,index) in items" :key="index">
								<view class="water-top">
									<image :src="item.cover" mode="widthFix"></image>
									<h3 v-html="item.title"></h3>
								</view>
								<view class="water-bottom">
									<view class="water-bottom-item">
										<view class="img-box">
											<image class="water-avatar" :src="item.photo" mode="widthFix"></image>
										</view>
										<text class="water-name" v-html="item.name"></text>
									</view>
									<view class="water-bottom-item">
										<!-- <image src="../static/xiaohuangya-waterFull/icon_good.svg" mode="widthFix"></image> -->
										<text v-html="item.likeCount"></text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<view class="water-none" v-if="waterList.length == 0">
				<!-- <image src="../static/xiaohuangya-waterFull/icon_nodatas.png" mode="widthFix"></image> -->
				<text>暂无数据</text>
			</view>
		</view>
	</view>
</template>

<script>
import Vue from 'vue';
	import refreshView from '../../../components/Refresh/Refresh.vue'
	export default {
		components: {
			refreshView
		},
		name: 'waterFill',
		data() {
			return {
				waterList: [],
				errorimage: 'this.src="' + '"',
				arr : [{ cover: "http://pic1.win4000.com/wallpaper/2018-03-28/5abafe0c311e6.jpg", id: "1084", isLiked: "0", likeCount: 0, name: "笑饮孤鸿", photo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173486008&di=68514e7684d0753c5100994fae6456cb&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F07%2F20161207195613_xuEFP.thumb.700_0.jpeg", title: "虽然你我会下落不明", }]
			}
		},
		methods: {
			 giveData(arr) { 
				 let that = this;
				 that.$refs.waterFill.handleLoad(arr); 
			},
			// 将数组拆分成可使用状态,减少代码
			groupCut(array, subGroupLength) {
				let index = 0;
				let newArray = [];
				while (index < array.length) {
					newArray.push(array.slice(index, index += subGroupLength));
				}
				return newArray;
			},
			handleLoad(arr) {
				// 如果arr存在,即在父组件刷新的值  若不存在就是下拉请求刷新
				if (arr) {
					let length = arr.length;
					this.waterList = this.groupCut(arr, length / 2)
				} else {
					console.log('写请求数据接口，将数据赋值给waterList')
				}
				uni.showToast({
					title: '刷新啦'
				})
			},
			// 监听页面下拉刷新
			//触摸开始
			handletouchstart: function(e) {
				let that = this;
				that.$refs.refreshView.handletouchstart(e)
			},

			//触摸移动
			handletouchmove: function(e) {
				let that = this;
				that.$refs.refreshView.handletouchmove(e)
			},
			//触摸结束
			handletouchend: function(e) {
				let that = this;
				that.$refs.refreshView.handletouchend(e);
				that.handleLoad();
			}
		},
	}
</script>

<style lang="less" scoped>
.sort {
	width: 750upx;
	height: 100upx;
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
.water-fill {
		.water-wrapper {
			.water-box {
				display: flex;
				width: 100%;
				box-sizing: border-box;
				font-size: 0;
				justify-content: space-between;
				background-color: #f5f8f9;
				padding: 10px 5px;

				.water-sub {
					display: flex;
					width: 49%;
					overflow: hidden;
					flex-direction: column;

					.water-item {
						width: 100%;
						border-radius: 12upx;
						overflow: hidden;
						background-color: #FFFFFF;
						margin-bottom: 10upx;

						.water-top {
							image {
								width: 100%;
							}

							h3 {
								font-family: PingFangHK-Medium;
								font-size: 28upx;
								font-weight: 600;
								line-height: 40upx;
								color: #333333;
								text-align: justify;
								margin: 20upx;
								.n-ellipsis(2);
							}
						}

						.water-bottom {
							display: flex;
							justify-content: space-between;
							margin: 0 20upx 20upx 20upx;
							font-size: 24upx;

							.water-bottom-item {
								display: flex;
								align-items: center;

								.img-box {
									display: flex;
									align-items: center;
									justify-content: center;
									width: 50upx;
									height: 50upx;
									border-radius: 50%;
									overflow: hidden;

									.water-avatar {
										width: 50upx;
									}
								}

								.water-name {
									max-width: 160upx;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
								}

								text {
									line-height: 32upx;
									font-size: 24upx;
									color: #333;
									margin-left: 14upx;
								}

								image {
									width: 28upx;
								}
							}
						}
					}
				}
			}
		}

		.water-none {
			// position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			image {
				width: 200upx;
			}

			text {
				padding-top: 40upx;
				font-size: 24upx;
				color: #999;
			}
		}
	}


	//多行文本省略
	.n-ellipsis(@n) {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: @n;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		word-break: break-all;
	}
</style>
