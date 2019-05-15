// pages/home/radio/radio.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        djRadios:[]
    },
    // 电台推荐
    radio(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/dj/recommend',
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                // console.log(res.data);
                that.setData({
                    djRadios: res.data.djRadios
                })
            }
        })
    },
    // 跳转到电台详情
    radioDetail(e){
        // console.log(e.currentTarget.dataset.name)
        wx.navigateTo({
            url: '../radioDetail/radioDetail?id=' + e.currentTarget.id + '&name=' + e.currentTarget.dataset.name
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.radio()
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
            title: '精选电台 - 订阅更精彩'
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