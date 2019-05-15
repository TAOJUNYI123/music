// pages/home/radioDetail/radioDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:'',
        name:'',
        programs:[]
    },
    // 电台节目
    program(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/dj/program',
            data: {
                rid: that.data.id,
                limit:10
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log(res.data.programs);
                that.setData({
                    programs: res.data.programs
                })
            }
        })
    },
    // 跳转到音乐播放页面
    goSong(e){
        console.log(e.currentTarget.id)
        wx.navigateTo({
            url: '../song/song?img=' + encodeURIComponent(e.currentTarget.dataset.img) + '&name=' + e.currentTarget.dataset.name + '&id=' + e.currentTarget.id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options)
        this.setData({
            id: options.id,
            name:options.name
        })
        this.program()
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
            title: '电台'
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