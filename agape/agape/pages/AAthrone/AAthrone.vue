<template>
	<view class="content">
		<view class="part1">
			<view class="part1_title">
				<image class="AA_logo" src="../../static/image/takeaway_shop/AA.png"></image>
				<view class="part1_tit">宫保鸡丁套餐 x2</view>
				<view class="AApeople">
					<view class="people_tit">已分配：</view>
					<view class="people">粱露x1、郜莎婕x1</view>
				</view>
				<view class="remarks">*备注：未分配的自动默认为本人</view>
			</view>
		</view>
		<view class="part2">
			<view class="part2_tit">公司同事</view>
			<view class="part2_logo"></view>
		</view>
		<view class="part3">
			<view class="top">
				<view class="top1">
					<view class="top1_tit">常A同事</view>
					<view class="top1_logo"></view>
				</view>
				<view class="top1">
					<view class="top1_tit">二级分类</view>
					<view class="top1_logo"></view>
				</view>
				<view class="top1">
					<view class="top1_tit">三级分类</view>
					<view class="top1_logo"></view>
				</view>
			</view>
			<view class="line"></view>
			<view class="buttom">
				<view class="buttom_list">
					<image class="choice_img" src="../../static/image/choice1.png"></image>
					<view class="choice_tit">宫保鸡丁</view>
					<view class="example-body">
						<uni-number-box :min="0" :max="9" :value="5" />
					</view>
				</view>
				<view class="list_line"></view>
				<view class="buttom_list">
					<image class="choice_img" src="../../static/image/choice1.png"></image>
					<view class="choice_tit">宫保鸡丁</view>
					<view class="example-body">
						<uni-number-box :min="0" :max="9" :value="5" />
					</view>
				</view>
				<view class="list_line"></view>
				<view class="buttom_list">
					<image class="choice_img" src="../../static/image/choice1.png"></image>
					<view class="choice_tit">宫保鸡丁</view>
					<view class="example-body">
						<uni-number-box :min="0" :max="9" :value="5" />
					</view>
				</view>
			</view>
		</view>
		<view class="btn">确认</view>
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
	.content{
		background:rgba(244,245,247,1);
	}
	.part1{
		width:750upx;
		height:298upx;
		background:rgba(255,255,255,1);
	}
	.part1_title{
		width:700upx;
		height:102upx;
		background:rgba(245,215,216,1);
		border-radius:51upx;
		margin-left: 26upx;
		margin-top: 22upx;
	}
	.AA_logo{
		width:38upx;
		height:38upx;
		float: left;
		margin-top: 32upx;
		margin-left: 46upx;
	}
	.part1_tit{
		padding-left: 116upx;
		padding-top: 30upx;
	}
	.AApeople{
		padding-top: 66upx;
		margin-left: 36upx;
	}
	.people_tit{
		font-size:30upx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(38,38,38,1);
		float: left;
	}
	.people{
		font-size:26upx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(38,38,38,1);
		padding-top: 4upx;
	}
	.remarks{
		clear: both;
		font-size:26upx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(156,156,156,1);
		margin-top: 22upx;
		margin-left: 36upx;
	}
	.part2{
		margin-left: 36upx;
		padding-bottom: 20upx;
	}
	.part2_tit{
		font-size:36upx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(75,75,75,1);
		padding-top: 26upx;
	}
	.part2_logo{
		width:28upx;
		height:4upx;
		background-color: #CE393C;
		margin-left: 4upx;
	}
	.part3{
		width:750upx;
		height:354upx;
		background:rgba(255,255,255,1);
	}
	.line{
		width:750upx;
		height:2upx;
		background-color: #F3F5F6;
		float: left;
		margin-top: 18upx;
		margin-bottom: 10upx;
	}
	.btn{
		width:700upx;
		height:102upx;
		background:rgba(226,42,45,1);
		border-radius:51upx;
		margin-top: 60upx;
		margin-left: 26upx;
		font-size:34upx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:102upx;
		text-align: center;
	}
	.top{
		padding-top: 20upx;
		margin-left: 104upx;
	}
	.top1{
		margin-right: 56upx;
		float: left;
	}
	.top1_tit{
		font-size:30upx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(38,38,38,1);
		float: left;
	}
	.top1_logo{
		width:18upx;
		height:10upx;
		background-color: #AFAFB0;
		margin-top: 18upx;
		margin-left: 120upx;
	}
	.buttom{
		margin-left: 38upx;
	}
	.buttom_list{
		width: 750upx;
		height: 60upx;
		float: left;
		margin-top: 20upx;
	}
	.choice_img{
		width: 40upx;
		height: 40upx;
		float: left;
	}
	.choice_tit{
		font-size:30upx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(38,38,38,1);
		float: left;
		margin-left: 50upx;
	}
	.list_line{
		width:650upx;
		height:2upx;
		background-color: #F3F5F6;
		float: left;
		margin-bottom: 10rpx;
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
		float: right;
		flex-direction: column;
		background-color: #ffffff;
	}
	.uni-numbox__minus.data-v-c03a0ed8{
		background-color: #D8D8D8!important;
		border-color: white!important;
		border-radius: 50upx!important;
		width:40upx!important;
		height:40upx!important;
	}
	.uni-numbox__value.data-v-c03a0ed8{
		font-size:30upx!important;
		border-color: white!important;
		height: 24upx!important;
	}
	.uni-numbox__plus.data-v-c03a0ed8{
		background-color: rgba(226,42,45,1)!important;
		border-color: white!important;
		border-radius: 50upx!important;
		width:40upx!important;
		height:40upx!important;
	}
	.uni-numbox--text.data-v-c03a0ed8{
		color: white!important;
	}
	.uni-numbox.data-v-c03a0ed8{
		height: 20upx!important;
	}
</style>
