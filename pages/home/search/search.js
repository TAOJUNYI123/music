import Toast from '../../../dist/toast/toast';
// pages/home/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keywords: '',
        songs:[],
        hots:[]
    },
    // 改变搜索內容
    onChange(e) {
        this.setData({
            keywords:e.detail
        });
        if (this.data.keywords){
            this.getList()
        }
    },
    // 搜索
    search(e){
        console.log(e)
    },
    // 获取列表
    getList() {
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/search',
            data: {
                keywords: that.data.keywords,
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                // console.log(res.data.result);
                if (res.data.result.songCount!=0){
                    that.setData({
                        songs: res.data.result.songs
                    })
                }
            },
            complete() {
               
            }
        })
    },
    // 热搜
    getHot(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/search/hot',
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                // console.log(res.data.result.hots);
                that.setData({
                    hots: res.data.result.hots
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getHot();
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
        wx.setNavigationBarTitle({
            title: '搜索'
        })
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