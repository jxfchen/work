<template>
	<view class="content">
		<!-- <view>
			<view class="status_bar">
				<view class="bar_text">爱加倍</view>
			</view>
		</view> -->
		<view class="nav_list">
			<!-- 需调整样式 -->
			<scroll-view scroll-x="true">
				<view :class="tabIndex==0?'nav_title_after':'nav_title'" data-tabindex="0" @tap="changeTab">报餐</view>
				<view :class="tabIndex==1?'nav_title_after':'nav_title'" data-tabindex="1" @tap="changeTab">外卖</view>
				<view :class="tabIndex==2?'nav_title_after':'nav_title'" data-tabindex="2" @tap="changeTab">到店</view>
				<view :class="tabIndex==3?'nav_title_after':'nav_title'" data-tabindex="3" @tap="changeTab">小卖部</view>
				<view :class="tabIndex==4?'nav_title_after':'nav_title'" data-tabindex="4" @tap="changeTab">管理员入口</view>
				<view :class="tabIndex==5?'nav_title_after':'nav_title'" data-tabindex="5" @tap="changeTab">GO FUN</view>
			</scroll-view>
		</view>
		<meal-order :detail="mealOrderDetail" v-if="tabIndex == 0"></meal-order>
		<take-out v-if="tabIndex == 1"></take-out>
		<arrival v-if="tabIndex == 2"></arrival>
		<canteen v-if="tabIndex == 3"></canteen>
		<admin-user v-if="tabIndex == 4"></admin-user>
		<gofun v-if="tabIndex == 5"></gofun>
	</view>
</template>

<script>
import mealOrder from './components/mealOrder.vue';
import takeOut from './components/takeOut.vue';
import arrival from './components/arrival.vue';
import canteen from './components/canteen.vue';
import adminUser from './components/adminUser.vue';
import gofun from './components/gofun.vue';
export default {
	components: {
		mealOrder,
		takeOut,
		arrival,
		canteen,
		adminUser,
		gofun
	},
	data() {
		return {
			tabIndex: 0,
			mealOrderDetail: null,
		};
	},
	onLoad() {
		this.mealOrderDetail = {
			test: 1
		};
	},
	methods: {
		changeTab(e) {
			this.tabIndex = e.target.dataset.tabindex;
		}
	}
};
</script>

<style>
.content {
	background-color: #f4f5f7;
}

/* .status_bar {
	height: var(--status-bar-height);
	width: 100%;
	margin-top: 56rpx;
} 

.bar_text{
	font-size:38upx;
	font-weight:500; 
	color:rgba(226,42,45,1);
}*/

.nav_list {
	margin-top: 10upx;
	white-space: nowrap;
	height: 60upx;
	background-color: #ffffff;
	padding-bottom: 10upx;
}

.nav_title {
	margin-left: 50upx;
	font-size: 30upx;
	color: #262626;
	display: inline-table;
}
.nav_title_after{
	width:72upx;
	height:50upx;
	font-size:36upx;
	font-weight:600;
	color:rgba(226,42,45,1);
	line-height:60upx;
	display: inline-table;
	margin-left: 50upx;
	border-bottom: #E22A2D 4upx solid;
}
</style>
