// pages/home/searchDetail/searchDetail.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:'',
        img:'',
        keywords:'',
        index:0,
        songs:[],
        albums:[],
        publishTime:[],
        artists:[],
        djRadios:[],
        videos:[],
        durationms:[],
        playTime:[]
    },
    // 切换标签
    onChange(event) {
        this.setData({
            index: event.detail.index
        })
        if(this.data.index==0){
            this.getSongs()
        }
        if(this.data.index==1){
            this.getAlbum();
        }
        if(this.data.index==2){
            this.getSinger();
        }
        if(this.data.index==3){
            this.getRadio();
        }
        if(this.data.index==4){
            this.getVideo();
        }
    },
    // 获取单曲
    getSongs(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/search',
            data: {
                keywords: that.data.keywords,
                type:1
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log(res.data.result.songs);
                that.setData({
                    songs: res.data.result.songs
                })
            }
        })
    },
    // 获取专辑
    getAlbum(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/search',
            data: {
                keywords: that.data.keywords,
                type: 10
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log(res.data.result);
                that.setData({
                    albums: res.data.result.albums
                })
                that.publishTime();
            }
        })
    },
    // 获取歌手
    getSinger(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/search',
            data: {
                keywords: that.data.keywords,
                type: 100
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                // console.log(res.data.result.artists);
                that.setData({
                    artists: res.data.result.artists
                })
            }
        })
    },
    // 获取电台
    getRadio(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/search',
            data: {
                keywords: that.data.keywords,
                type: 1009
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                // console.log(res.data.result.djRadios);
                that.setData({
                    djRadios: res.data.result.djRadios
                })

            }
        })
    },
    // 获取视频
    getVideo(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/search',
            data: {
                keywords: that.data.keywords,
                type: 1014
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log(res.data.result);
                that.setData({
                    videos: res.data.result.videos
                })
                that.formatDuring();
                that.getPlayTime();
            }
        })
    },
    // 发布时间
    publishTime(){
        for(var i = 0;i < this.data.albums.length;i++){
            var publishTime = this.data.albums[i].publishTime;
            var da = new Date(publishTime);
            var year = da.getFullYear();
            var month = da.getMonth() + 1;
            var date = da.getDate();
            this.setData({
                publishTime: this.data.publishTime.concat([year, month, date].join('-'))
            })
        }
    },
    // 视频时长
    formatDuring() {
        const videos = this.data.videos;
        for (var i = 0;i < videos.length;i++){
            var minutes = parseInt((videos[i].durationms % (1000 * 60 * 60)) / (1000 * 60));
            if(minutes < 10){
                minutes = "0"+minutes;
            }
            var seconds = Math.round((videos[i].durationms % (1000 * 60)) / 1000);
            if(seconds < 10){
                seconds = "0"+seconds;
            }
            var durationms = minutes + " : " + seconds;
            this.setData({
                durationms: this.data.durationms.concat(durationms)
            })
        }
    },
    getPlayTime(){
        const videos = this.data.videos;
        for (var i = 0; i < videos.length; i++) {
            if(videos[i].playTime>=100000){
                var playTime = Math.round(videos[i].playTime / 10000) ;
                playTime = playTime + "万";
                this.setData({
                    playTime:this.data.playTime.concat(playTime)
                })
            }else{
                this.setData({
                    playTime: this.data.playTime.concat(videos[i].playTime)
                })
            }
        }
    },
    goSong(e){
        // console.log(e.target.dataset.img)
        // console.log(e.target.dataset.name)
        // console.log(e.target.dataset.id)
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
        this.setData({
            keywords:options.name
        })
        this.getSongs();
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
            title: this.data.keywords
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