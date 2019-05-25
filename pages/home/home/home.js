// pages/home/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 1,
        banners: [{
            imageUrl: '../../../img/banner1.png'
        }, {
            imageUrl: '../../../img/banner2.png'
        }],
        albums: [],
        exclusive: [],
        show:false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        avatarUrl:'../../../img/touxiang.png',
        nickName:'未命名',
        gender:undefined,
        province:'',
        city:'',
        phone:'',
        mvActive:0,
        newMv:[],
        playCount:[],
        recommendMv:[],
        playTime:[],
        rankingMv:[]
    },
    // 改变标签页
    onChange(event) {
        // console.log(this.data.canIUse)
        if (event.detail.index == 0 && this.data.canIUse){
            this.setData({
                show:true,
                canIUse:false
            })
        }
        if (event.detail.index == 2){
            this.newMv();
        }
    },
    // 跳转到歌单页面
    songList(){
        wx.navigateTo({
            url: '../songList/songList',
        })
    },
    // 跳转到歌手页面
    goSinger(){
        wx.navigateTo({
            url: '../singer/singer',
        })
    },
    // 跳转到推荐页面
    recommend(){
        wx.navigateTo({
            url: '../recommend/recommend',
        })
    },
    // 跳转到电台
    radio(){
        wx.navigateTo({
            url: '../radio/radio',
        })
    },
    // 退出登录
    backBtn(){
        wx.reLaunch({
            url: '../../login/login/login'
        })
    },
    // 最新mv
    newMv(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/mv/first',
            data: {
                limit: 10
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                // console.log(res.data.data)
                that.setData({
                    newMv: res.data.data
                })
                that.getPlayCount()
            }
        })
    },
    // 推荐mv
    recommendMv(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/personalized/mv',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                // console.log(res.data.result)
                that.setData({
                    recommendMv: res.data.result
                })
                that.getPlayTime()
            }
        })
    },
    // 最新mv播放次数
    getPlayCount() {
        const newMv = this.data.newMv;
        for (var i = 0; i < newMv.length; i++) {
            if (newMv[i].playCount >= 100000) {
                var playCount = Math.round(newMv[i].playCount / 10000);
                playCount = playCount + "万";
                this.setData({
                    playCount: this.data.playCount.concat(playCount)
                })
            } else {
                this.setData({
                    playCount: this.data.playCount.concat(newMv[i].playCount)
                })
            }
        }
    },
    // 推荐mv播放次数
    getPlayTime(){
        const recommendMv = this.data.recommendMv;
        for (var i = 0; i < recommendMv.length; i++) {
            if (recommendMv[i].playCount >= 100000) {
                var playTime = Math.round(recommendMv[i].playCount / 10000);
                playTime = playTime + "万";
                this.setData({
                    playTime: this.data.playTime.concat(playTime)
                })
            } else {
                this.setData({
                    playTime: this.data.playTime.concat(recommendMv[i].playCount)
                })
            }
        }
    },
    // mv排行
    rankingMv(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/top/mv',
            data:{
                limit:10
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                // console.log(res.data.data)
                that.setData({
                    rankingMv: res.data.data
                })
            }
        })
    },
    // 视频标签页
    mvChange(event) {
        console.log(event.detail.index)
        if (event.detail.index ==0){
            this.newMv()
        }
        if (event.detail.index==1){
            this.recommendMv()
        }
        if (event.detail.index == 2){
            this.rankingMv()
        }
    },
    // 搜索
    search() {
        wx.navigateTo({
            url: '../search/search',
        })
    },
    // 个人信息
    msg() {
        console.log("msg");
    },
    // 排行榜
    goRanking() {
        wx.navigateTo({
            url: '../ranking/ranking'
        })
    },
    // 新碟上架
    newAlbum() {
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/top/album',
            data: {
                limit: 6
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    albums: res.data.albums
                })
            }
        })
    },
    // 独家放送
    exclusive() {
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/personalized/privatecontent',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                // console.log(res.data);
                that.setData({
                    exclusive: res.data.result
                })
            }
        })
    },
    // 获取用户信息
    bindGetUserInfo(e) {
        console.log(e.detail.userInfo)
        this.setData({
            avatarUrl: e.detail.userInfo.avatarUrl,
            nickName: e.detail.userInfo.nickName,
            gender: e.detail.userInfo.gender,
            province: e.detail.userInfo.province,
            city: e.detail.userInfo.city
        })
    },
    //取消获取个人信息
    meCancel(){
        this.setData({
            active:1,
            show:false
        })
    },
    // 确定获取个人信息
    meSure(){
        this.setData({
            show:false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/banner',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                // console.log(res.data.banners)
                that.setData({
                    banners: res.data.banners
                })
            }
        })
        this.newAlbum();
        this.exclusive();
        // 查看是否授权
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success(res) {
                            // console.log(res.userInfo)
                            that.setData({
                                nickName: res.userInfo.nickName,
                                avatarUrl: res.userInfo.avatarUrl,
                                gender: res.userInfo.gender,
                                province: res.userInfo.province,
                                city: res.userInfo.city
                            })
                        }
                    })
                }
            }
        })
        const phone = wx.getStorageSync('phone')
        this.setData({
            phone:phone
        })
    },
    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})