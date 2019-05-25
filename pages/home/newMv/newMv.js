// pages/home/newMv/newMv.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:'',
        url:''
    },
    // 获取视频地址
    mvUrl(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/mv/url',
            data: {
                id: that.data.id
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                // console.log(res.data.data.url)
                that.setData({
                    url: res.data.data.url
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: options.name
        })
        this.setData({
            id: options.id
        })
        this.mvUrl()
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