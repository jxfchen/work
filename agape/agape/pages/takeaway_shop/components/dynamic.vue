<template>
	<view>
		<view class="sort">
			<view class="sort1">全部</view>
			<view class="sort2">#视频·8</view>
		</view>
		<view class="tent"><WaterFull ref="waterFull" /></view>
	</view>
</template>
<script>
import WaterFull from '../../../components/WaterFull.vue';
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	components: {
		WaterFull
	},
	methods: {
		giveData(arr) {
			let that = this;
			that.$refs.waterFull.handleLoad(arr);
		}
	},
	mounted() {
		let that = this;
		let arr = [
			{
				cover: 'http://pic1.win4000.com/wallpaper/2018-03-28/5abafe0c311e6.jpg',
				id: '1084',
				isLiked: '0',
				likeCount: 0,
				name: '笑饮孤鸿',
				photo:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173486008&di=68514e7684d0753c5100994fae6456cb&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F07%2F20161207195613_xuEFP.thumb.700_0.jpeg',
				title: '虽然你我会下落不明'
			},
			{
				cover: 'http://img.51rry.com/note/2019-11-28/1574931683000.png',
				id: '1084',
				isLiked: '0',
				likeCount: 520,
				name: '残城碎梦',
				photo:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173486004&di=3ef63a12a8372b81bfe97b81adee093d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F07%2F20161207195604_jNSGc.thumb.700_0.jpeg',
				title: '你知道我曾为你动过情'
			},
			{
				cover:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173237976&di=4026f6a26b2c370611d6c6877aad1ded&imgtype=0&src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2Fqidai%2Fndmzsjbz%2F001.jpg',
				id: '1084',
				isLiked: '0',
				likeCount: 650,
				name: '梦里南柯',
				photo:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173486004&di=3ef63a12a8372b81bfe97b81adee093d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F07%2F20161207195604_jNSGc.thumb.700_0.jpeg',
				title: '我欲与君相知，长命无绝衰。山无陵，江水为竭。东雷震震，夏雨雪。天地合，乃敢与君绝'
			},
			{
				cover: 'http://img.51rry.com/note/2019-10-21/1571654591036.png',
				id: '1084',
				isLiked: '0',
				likeCount: 999,
				name: '无风',
				photo:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173620777&di=54b7ee5f59c30503096ccabbe0ed9a8e&imgtype=0&src=http%3A%2F%2Fp.store.itangyuan.com%2Fp%2Fchapter%2Fattachment%2Feg-VEBjtEA%2FEgfWEgMVEgjTe_-W4BEU40u3KhifeUL1HtDvHhsVgU9hK6LqG1opiMO.jpg',
				title: '晓看天色，暮看云，行也思君，坐也思君'
			},
			{
				cover: 'http://pic1.win4000.com/wallpaper/2018-10-31/5bd99d277748e.jpg',
				id: '1084',
				isLiked: '0',
				likeCount: 25,
				name: '君倾心',
				photo:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173486008&di=68514e7684d0753c5100994fae6456cb&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F07%2F20161207195613_xuEFP.thumb.700_0.jpeg',
				title: '众里寻她千百度，蓦然回首，那人却在，灯火阑珊处'
			},
			{
				cover:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173155133&di=9d77167bfd27f6937ffbccbd3eddb71e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201601%2F09%2F20160109201510_fucHC.jpeg',
				id: '1084',
				isLiked: '0',
				likeCount: 4,
				name: '青丝弄瑶玉',
				photo:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173620777&di=54b7ee5f59c30503096ccabbe0ed9a8e&imgtype=0&src=http%3A%2F%2Fp.store.itangyuan.com%2Fp%2Fchapter%2Fattachment%2Feg-VEBjtEA%2FEgfWEgMVEgjTe_-W4BEU40u3KhifeUL1HtDvHhsVgU9hK6LqG1opiMO.jpg',
				title: '死生契阔，与子成说。执子之手，与子偕老'
			}
		];
		that.giveData(arr);
	}
};
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
</style>
