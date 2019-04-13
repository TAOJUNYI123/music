// pages/login/login/login.js
import Notify from '../../../dist/notify/notify';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        height: 0,
        accountNum: '',
        pwd: '',
        canLogin: false,
        loading:false
    },

    // 输入账号
    accountNum(e) {
        console.log()
        this.setData({
            accountNum: e.detail.value
        })
        if (this.data.pwd.length != 0 && this.data.accountNum.length != 0) {
            this.setData({
                canLogin: true
            })
        } else {
            this.setData({
                canLogin: false
            })
        }
    },

    //输入密码
    pwd(e) {
        this.setData({
            pwd: e.detail.value
        })
        if (this.data.pwd.length != 0 && this.data.accountNum.length != 0) {
            this.setData({
                canLogin: true
            })
        } else {
            this.setData({
                canLogin: false
            })
        }
    },
    // 登录
    login() {
        const that = this;
        that.setData({
            loading:true
        })
        wx.request({
            url: 'https://www.apiopen.top/login',
            data: {
                key: '26eafefc8e9e8593950f2d50c0e6f35a',
                phone: that.data.accountNum,
                passwd: that.data.pwd
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                // console.log(res.data);
                if (!res.data.data) {
                    Notify(res.data.msg);
                }else{
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                    })
                    wx.navigateTo({
                        url: '../../home/home/home',
                    })
                }
            },
            complete(){
                that.setData({
                    loading:false
                })
            }
        })
    },

    // 立即注册
    goRegister() {
        wx.navigateTo({
            url: '../register/Register',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    height: res.windowHeight
                })
            }
        })
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
        // wx.request({
        //     url: 'http://localhost:port/login/findPassWord', 
        //     data: {
        //         phone: '17853500997',
        //         y: ''
        //     },
        //     header: {
        //         'content-type': 'application/json' // 默认值
        //     },
        //     success(res) {
        //         console.log(res.data)
        //     }
        // })
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