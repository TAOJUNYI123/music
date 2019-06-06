// pages/home/song/song.js
const innerAudioContext = wx.createInnerAudioContext()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        height: 0,
        name: '',
        start: false,
        img: '',
        id: '',
        url: '',
        currentTime:'00:00',
        value:0,
        show:false,
        lyric:''
    },
    // 获取音乐url
    songUrl() {
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/song/url',
            data: {
                id: that.data.id
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                // console.log(res.data.data[0].url);
                that.setData({
                    url: res.data.data[0].url?res.data.data[0].url:''
                })
                innerAudioContext.src = that.data.url;
                if (res.data.data[0].url==null) {
                    wx.showModal({
                        title: '温馨提示',
                        content: '抱歉，没有获取到相应音频哦~',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        }
                    })
                }
            }
        })
    },
    // 开始播放
    start() {
        innerAudioContext.src = this.data.url;
        const that = this;
        innerAudioContext.play();
        innerAudioContext.onPlay(() => {
            console.log('开始播放')
            that.setData({
                start: true
            })
        })
        setTimeout(() => {
            innerAudioContext.onTimeUpdate(() => {
                var currentTime = Math.round(innerAudioContext.currentTime)
                that.setData({
                    value: 100 * currentTime / innerAudioContext.duration
                })
                that.changeTimeBySecond(currentTime)
                if (that.data.value == 99.7) {
                    this.setData({
                        value: 0,
                        currentTime: '00:00',
                        start: false
                    })
                }
            })
        }, 1000)
    },
    // 总时长转换
    changeTimeBySecond(second) {
        var hourTime = 0;
        var minuteTime = 0;
        var secondTime = 0;
        if (second > 60) {  //如果秒数大于60
            minuteTime = Math.floor(second / 60);
            secondTime = Math.floor(second % 60);
            if (minuteTime >= 60) {  //如果分钟大于60
                hourTime = Math.floor(minuteTime / 60);
                minuteTime = Math.floor(minuteTime % 60);
            } else {
                hourTime = 0;
            }
        } else {
            hourTime = 0;
            minuteTime = 0;
            if (second == 60) {  //如果秒数等于60
                minuteTime = 1;
                secondTime = 0;
            } else {
                secondTime = second;
            }
        }
        var timeResult = this.addZero(minuteTime) + ':' + this.addZero(secondTime);
        // console.log(timeResult);
        this.setData({
            currentTime: timeResult
        })
    },
    addZero(time) {
        let str = time;
        if (time < 10) {
            str = '0' + time;
        }
        return str;
    },
    // 暂停播放
    stop() {
        innerAudioContext.src = this.data.url;
        innerAudioContext.pause();
        const that = this;
        innerAudioContext.onPause(() => {
            console.log('暂停播放')
            that.setData({
                start: false
            })
        })
    },
    // 停止播放
    stopMusic(){
        innerAudioContext.src = this.data.url;
        innerAudioContext.stop();
        const that = this;
        innerAudioContext.onPause(() => {
            console.log('停止播放')
            that.setData({
                start: false
            })
        })
    },
    // 进度条改变
    onChange(event) {
        // console.log(event.detail)
    },
    // 歌词
    songText(){
        const that = this;
        wx.request({
            url: 'http://192.168.43.54:3000/lyric',
            data: {
                id: that.data.id
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                // console.log(res.data.lrc.lyric);
                var str = res.data.lrc ? res.data.lrc.lyric:'[00:00.00]暂无歌词';
                str = str.replace(/\]\[/g, '] [');
                var arr = str.match(/(\[\d{2}:\d{2}\.\d{2,3}\])(.[^\[\]]*)?/g);
                var time = [], txt = [];
                for (var i = 0; i < arr.length; i++) {
                    /^(\[\d{2}:\d{2}\.\d{2,3}\])(.[^\[\]]*)?$/.exec(arr[i]);
                    time.push(RegExp.$1);
                    txt.push(RegExp.$2);
                }
                // console.log(arr);
                // console.log(time);
                // console.log(txt);
                that.setData({
                    lyric: txt
                })
            }
        })
    },
    // 显示歌词
    showText(){
        this.setData({
            show:true
        })
    },
    onClose(){
        this.setData({
            show: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options.id)
        this.setData({
            name: options.name,
            img: options.img ? decodeURIComponent(options.img) :'../../../img/playMusic.png',
            id: options.id
        })
        const that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    height: res.windowHeight
                })
            }
        })
        this.songUrl();
        
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
            title: this.data.name
        })
        this.songText()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        this.stopMusic()
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        this.stopMusic()
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