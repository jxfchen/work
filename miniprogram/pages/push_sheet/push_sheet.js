// pages/push_sheet/push_sheet.js
var c = require("../../utils/http.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        rad: '0',
        istarget: true,
        showModal: false,
        swiperCurrent: 0,
        background: ["/images/push_banner.png", "/images/push_banner.png", "/images/push_banner.png"],
        project_type_id:[],
        contentList:[
            {
                name:"联系我",
                id:0,
            }, {
                name: "直接联系客户",
                id: 1,
            }
        ],
        roleList: [
            {
                name: "我是推荐人",
                id: 1,
            }, {
                name: "我申请为项目合伙人",
                id: 2,
            }
        ],
    },
    
    breakfastTap: function (e) {
        if (e.detail.istarget === false) {
            this.setData({
                istarget: true,
            })
        }
        else {
            this.setData({
                istarget: false,
            })
        }
    },
    serviceValChange: function (e) {
        var allGoodsFilte = this.data.allGoodsFilte;
        var checkArr = e.detail.value;
        for (var i = 0; i < allGoodsFilte.length; i++) {
            if (checkArr.indexOf(i + "") != -1) {
                allGoodsFilte[i].checked = true;
            } else {
                allGoodsFilte[i].checked = false;
            }
        }
        this.setData({
            allGoodsFilte: allGoodsFilte
        })
    },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
    swiperChange(e) {
        const that = this;
        that.setData({
            swiperCurrent: e.detail.current
        })
    },
    // 项目类型
    clas: function (e) {
        var that = this
        var a = e.currentTarget.dataset.index
        that.setData({
            rad: a,
            restaurant_id: e.currentTarget.dataset.id, // 服务id
        })
    },
    //餐次
    checkboxChange(e) {
        var that = this
        let string = "mealist[" + e.target.dataset.index + "].selected"
        this.setData({
            [string]: !this.data.mealist[e.target.dataset.index].selected
        })
        let nickname = e.currentTarget.dataset.nickname
        let detailValue = this.data.mealist.filter(it => it.selected).map(it => it.nickname + '_id' + ':' + it.id)
        that.setData({
            project_type_id: detailValue, // 项目类型id
        })
    },
    //就餐人数
    numberInput: function (e) {
        this.setData({
            peopleNumber: e.detail.value
        })
    },
    //联系方式
    mePhoneInput: function (e) {
        this.setData({
            mePhone: e.detail.value
        })
    },
    customerPhoneInput: function (e) {
        this.setData({
            customerPhone: e.detail.value
        })
    },
    //优先联系
    content: function (e) {
        var that = this
        var a = e.currentTarget.dataset.index
        that.setData({
            cont: a,
            content_id: e.currentTarget.dataset.id, // 服务id
        })
    },
    /**
     * 图片手动滑动时，获取当前的轮播id
     */
    imageChange(e) {
        const that = this;
        that.setData({
            swiperCurrent: e.currentTarget.id
        })
    },
    slider: function (e) {
        this.setData({
            a: e.detail.value
        })
        
        if (e.currentTarget.dataset.name =="breakfast_price"){
            let breakfast_price = e.detail.value;
            this.setData({
                breakfast_price: breakfast_price
            })
        }
        else if (e.currentTarget.dataset.name == "lunch_price"){
            let lunch_price = e.detail.value;
            this.setData({
                lunch_price: lunch_price
            })
        } 
        else if (e.currentTarget.dataset.name == "dinner_price"){
            let dinner_price = e.detail.value;
            this.setData({
                dinner_price: dinner_price
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var openid = wx.getStorageSync('openid');
        var code = options.title;
        that.setData({
            openid: openid,//类型
            code: code,//餐次
        })
        c.request("pushersheet/getProjectType", {
        }, function (res) {
            console.log(res)
            var arr = res.meal_list
            let newArr = arr.map(obj => {
                return {
                    id: obj.id,
                    pid: obj.pid,
                    type: obj.type,
                    name: obj.name,
                    nickname: obj.nickname,
                    selected: false
                }
            })
            console.log(newArr)
            that.setData({
                prolist: res.project_list,//类型
                mealist: res.meal_list,//餐次
            })
        }, function () {
        })
    },
    bindClick: function (e) {
        let that = this;
        let foot = that.data.project_type_id;
        let openid=that.data.openid;
        let code=that.data.code;
        let restaurant_id =that.data.restaurant_id;
        let breakfast_price = that.data.breakfast_price;
        let lunch_price = that.data.lunch_price;
        let dinner_price = that.data.dinner_price;
        let eating_num=that.data.peopleNumber;
        let mePhone = that.data.mePhone;
        let customerPhone = that.data.customerPhone;
        let first_contact = that.data.content_id;
        let role = this.data.role_id;
        let footList="";
        for (let i = 0; i < foot.length; i++) {
            footList = footList+foot[i];
        }
        let flag = true;
        //判断餐次需求是否为空
        if(footList.length==0){
            flag = false;
        }
        //就餐人数是否为空
        if (eating_num == '' || eating_num == null || eating_num == undefined ){
            flag = false;
        }

        if (mePhone == '' || mePhone == null || mePhone == undefined) {
            flag = false;
        }

        if (customerPhone == '' || customerPhone == null || customerPhone == undefined) {
            flag = false;
        }
        console.log(first_contact);
        if ( first_contact == null || first_contact == undefined) {
            flag = false;
        }

        if (role == '' || role == null || role == undefined) {
            flag = false;
        }

        if (flag){
            c.request("pushersheet/postPuserSheet", {
                openid: openid,
                restaurant_id: code,
                project_type_id: restaurant_id,
                footList,
                breakfast_price: breakfast_price,
                dinner_price: dinner_price,
                eating_num: eating_num,
                contact: mePhone,
                contact_customer: customerPhone,
                first_contact: first_contact,
                role: role,
            }, function (res) {
                wx.showToast({
                    title: '成功',
                })
            }, function () {
            })
        }else{
            wx.showToast({
                title: '请将信息补全',
                icon:'none',
            })
        }
            
        
    },
    wqd: function (e) {
        var that = this
        var a = e.currentTarget.dataset.index
        that.setData({
            rol: a,
            role_id: e.currentTarget.dataset.id, // 服务id
        })
        console.log(this.data.role_id)
        this.setData(
            {
                showModal: true
            }
        )
    },
    ok: function () {
        this.setData({
            showModal: false
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})