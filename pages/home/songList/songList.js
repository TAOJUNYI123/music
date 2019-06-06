// pages/home/songList/songList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        songList:[]
    },
    getList(){
        const that = this;
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'http://192.168.43.54:3000/top/playlist?limit=6',
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                // console.log(res.data);
                that.setData({
                    songList: res.data.playlists
                })
                wx.hideLoading()
            }
        })
    },
    // 跳转到歌单详情
    goList(e){
        // console.log(e.currentTarget.id)
        wx.navigateTo({
            url: '../list/list?name=' + e.currentTarget.dataset.name + '&id=' + e.currentTarget.id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getList()
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
            title: '歌单'
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