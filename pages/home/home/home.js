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
        show:false
    },
    // 改变标签页
    onChange(event) {
        if (event.detail.index==0){
            this.setData({
                show:true
            })
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
        console.log("msg")
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