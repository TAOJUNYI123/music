// pages/home/singer/singer.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        chineseMen:[],
        chineseWomen:[],
        westernMen:[],
        westernWomen:[]
    },
    // 改变标签页
    onChange(event) {
        console.log(event.detail.index)
        if (event.detail.index == 0) {
            this.chineseMen()
        }
        if (event.detail.index==1){
            this.chineseWomen()
        }
        if (event.detail.index ==2){
            this.westernMen()
        }
        if (event.detail.index == 3) {
            this.westernWomen()
        }
    },
    // 华语男歌手
    chineseMen(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/artist/list',
            data: {
                cat: 1001
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                // console.log(res.data.artists);
                that.setData({
                    chineseMen: res.data.artists
                })
            }
        })
    },
    // 华语女歌手
    chineseWomen(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/artist/list',
            data: {
                cat: 1002
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                // console.log(res.data.artists);
                that.setData({
                    chineseWomen: res.data.artists
                })
            }
        })
    },
    // 欧美男歌手
    westernMen(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/artist/list',
            data: {
                cat: 2001
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                that.setData({
                    westernMen: res.data.artists
                })
            }
        })
    },
    // 欧美女歌手
    westernWomen(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/artist/list',
            data: {
                cat: 2002
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log(res.data.artists);
                that.setData({
                    westernWomen: res.data.artists
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.chineseMen();
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