<template>
	<view>
		<image src="../../../static/image/index/banner.png" class="banner_img"></image>
		<view class="notice" :style="status === 0 ? 'display:none' : ''">
			<view class="notice_content">{{ notice }}</view>
			<image class="notice_del" src="../../../static/image/index/delete.png" @click="delclick"></image>
		</view>
		<view class="meal_register">
			<view class="meal_title">
				<view class="title_top">
					<view class="top_left">报餐登记</view>
					<view class="top_right">销售1部</view>
				</view>
				<view class="title_logo"></view>
			</view>
			<view class="meal_content">
				<view class="content_list">
					<view class="list_title">就餐人</view>
					<view class="uni-list">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{ array[index] }}</view>
							<image src="../../../static/image/index/arrow.png" class="arrow"></image>
						</picker>
					</view>
				</view>
				<view class="content_line"></view>
				<view class="content_list">
					<view class="list_title">就餐日期</view>
					<view class="uni-list">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{ date }}</view>
							<image src="../../../static/image/index/arrow.png" class="arrow"></image>
						</picker>
					</view>
				</view>
				<view class="content_line"></view>
				<view class="content_list">
					<view class="list_title">就餐时段</view>
					<view class="uni-list">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{ array[index] }}</view>
							<image src="../../../static/image/index/arrow.png" class="arrow"></image>
						</picker>
					</view>
					<view class="content_tips">报餐截止时间：10月5日 18：00前</view>
				</view>
				<view class="content_line"></view>
				<view class="content_list">
					<view class="list_title">午餐菜谱</view>
					<view class="uni-list"><image src="../../../static/image/index/arrow.png" class="arrow"></image></view>
				</view>
			</view>
			<view class="part">
				<view class="part_left">
					<view class="left_top">¥278</view>
					<view class="left_bottom">早餐餐卷支付20元+微信支付1元</view>
				</view>
				<view class="part_right">9人</view>
			</view>
			<view class="btn" @tap="sendMealOrder">确认报餐</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			notice: '北京银行石景山支行：十一放假期间订餐注意事项！',
			array: ['中国', '美国', '巴西', '日本'],
			date: currentDate,
			index: 0,
			status: 1
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	props: {
		detail: {
			type: Object,
			default: function() {
				return {};
			}
		}
	},
	created() {
		console.log(this.detail);
	},
	updated() {
		console.log(this.detail);
	},
	methods: {
		sendMealOrder () {
			// 请求示例，1为商家接口地址，2为企业接口地址，3为平台接口地址
			// 接口统一用post this.$http.post(a,b) 参数a（Number）为请求接口地址类型；参数b（Object）为请求参数，
			this.$http.post(1, {
				do: 'login',
				openid: "oftDD5O5aXbcVo3g3evPgZ_8wdQw"
			}).then((res)=>{
				// 请求后的操作
				
			}).catch((err)=>{
				// 前端请求异常捕获
				
				console.log(err);
			})
		},
		delclick() {
			this.status = 0;
			console.log(this.status);
		},
		changeTab(e) {
			this.tabIndex = e.target.dataset.tabindex;
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.index = e.target.value;
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		}
	}
};
</script>

<style>
.banner_img {
	width: 750upx;
	height: 360upx;
}
.notice {
	height: 92upx;
	background-color: #ffffff;
}
.notice_content {
	width: 630upx;
	height: 52upx;
	background: rgba(254, 245, 222, 1);
	border-radius: 26upx;
	float: left;
	font-size: 24upx;
	font-weight: 500;
	color: rgba(250, 113, 0, 1);
	margin-left: 36upx;
	margin-top: 20upx;
	line-height: 52upx;
	text-align: center;
}
.notice_del {
	width: 34upx;
	height: 34upx;
	margin-left: 16upx;
	margin-top: 30upx;
}
.meal_register {
	background-color: #f4f5f7;
	height: 100%;
}
.title_top {
	width: 100%;
}
.top_left {
	font-size: 36upx;
	font-weight: 500;
	color: rgba(75, 75, 75, 1);
	float: left;
	margin-left: 36upx;
	margin-top: 28upx;
}
.top_right {
	float: right;
	font-size: 30upx;
	font-weight: 500;
	color: rgba(128, 131, 141, 1);
	margin-right: 36upx;
	margin-top: 32upx;
}
.meal_title {
	height: 102upx;
}
.title_logo {
	background-color: #e22a2d;
	width: 28upx;
	height: 4upx;
	margin-left: 40upx;
	clear: both;
}
.meal_content {
	width: 750upx;
	height: 418upx;
	background: rgba(255, 255, 255, 1);
}
.content_list {
}
.list_title {
	float: left;
	margin-left: 36upx;
	margin-top: 24upx;
	margin-bottom: 24upx;
}
.uni-list {
	float: right;
	margin-top: 28upx;
	margin-right: 20upx;
}
.content_line {
	clear: both;
	margin: 0 auto;
	width: 650upx;
	height: 2upx;
	background-color: #f3f5f6;
}
.uni-input {
	float: left;
}
.arrow {
	width: 12upx;
	height: 20upx;
	float: right;
	margin-right: 38upx;
	margin-top: 14upx;
	padding-left: 20upx;
}
.content_tips {
	clear: both;
	margin-left: 286upx;
	font-size: 26upx;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
	margin-bottom: 18upx;
}
.part {
	width: 750upx;
	height: 158upx;
	background: rgba(255, 255, 255, 1);
	margin-top: 20upx;
}
.part_left {
	float: left;
	width: 80%;
	padding-left: 36upx;
	margin-top: 40upx;
}
.left_top {
	font-size: 30upx;
	font-weight: 500;
	color: rgba(226, 42, 45, 1);
}
.left_bottom {
	font-size: 26upx;
	font-weight: 400;
	color: rgba(156, 156, 156, 1);
}
.part_right {
	padding-top: 68upx;
}
.btn {
	width: 630upx;
	height: 92upx;
	background: rgba(226, 42, 45, 1);
	border-radius: 50upx;
	font-size: 30upx;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	line-height: 92upx;
	text-align: center;
	margin: 40upx 60upx 48upx 60upx;
}
</style>
