// pages/home/recommend/recommend.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recommendMusic:[]
    },
    // 推荐新音乐
    recommendMusic(){
        const that = this;
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'http://192.168.43.54:3000/personalized/newsong',
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log(res.data.result);
                that.setData({
                    recommendMusic: res.data.result
                })
            },
            complete() {
                wx.hideLoading()
            }
        })
    },
    // 跳转到播放音乐页面
    goSong(e) {
        // console.log(e)
        // console.log(e.target.dataset.name)
        console.log(e.target.dataset.id)
        this.setData({
            img: e.target.dataset.img,
            name: e.target.dataset.name
        })
        wx.navigateTo({
            url: '../song/song?name=' + e.target.dataset.name + '&id=' + e.target.dataset.id + '&img=' + encodeURIComponent(e.target.dataset.img)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.recommendMusic()
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
            title: '推荐新音乐'
        })
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