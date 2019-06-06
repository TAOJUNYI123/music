// pages/home/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:'',
        id:'',
        coverImgUrl:'',
        description:'',
        tracks:[]
    },
    // 获取歌单详情
    getDetail(){
        const that = this;
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'http://192.168.43.54:3000/playlist/detail',
            data:{
                id:that.data.id
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log(res.data);
                that.setData({
                    coverImgUrl: res.data.playlist.coverImgUrl,
                    description: res.data.playlist.description,
                    tracks: res.data.playlist.tracks
                })
                wx.hideLoading()
            }
        })
    },
    // 跳转到音乐播放页面
    goSong(e) {
        console.log(e.target.dataset.img)
        console.log(e.target.dataset.name)
        console.log(e.target.dataset.id)
        this.setData({
            img: e.target.dataset.img,
            name: e.target.dataset.name
        })
        wx.navigateTo({
            url: '../song/song?img=' + encodeURIComponent(e.target.dataset.img) + '&name=' + e.target.dataset.name + '&id=' + e.target.dataset.id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id)
        this.setData({
            name: options.name,
            id:options.id
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
        wx.setNavigationBarTitle({
            title: this.data.name
        })
        this.getDetail()
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