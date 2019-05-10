// pages/login/register/Register.js
import Notify from '../../../dist/notify/notify';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        height: 0,
        name: '',
        pwd: '',
        surePwd: '',
        loading: false
    },
    // 账号
    name(e) {
        this.setData({
            name: e.detail.value
        })
    },
    // 设置密码
    pwd(e) {
        this.setData({
            pwd: e.detail.value
        })
    },
    // 确认密码
    surePwd(e) {
        this.setData({
            surePwd: e.detail.value
        })
    },
    // 注册
    register() {
        const that = this;
        var reg = /^[0-9A-Za-z]{6,12}$/;
        
        if (!this.data.name) {
            Notify('账号不能为空');
        } else if (!this.data.pwd) {
            Notify('密码不能为空');
        } else if (!this.data.surePwd) {
            Notify('请确认密码');
        } else if (this.data.pwd != this.data.surePwd) {
            Notify('设置密码和确认密码不同，请检查')
        } else if (!reg.test(this.data.pwd) || this.data.pwd.length < 6 || this.data.pwd.length > 12) {
            Notify('密码应为6-12位数字或字母组成')
        } else {
            that.setData({
                loading: true
            })
            wx.request({
                url: 'https://www.apiopen.top/createUser',
                data: {
                    key: '26eafefc8e9e8593950f2d50c0e6f35a',
                    phone: that.data.name,
                    passwd: that.data.pwd
                },
                header: {
                    'content-type': 'application/json'
                },
                success(res) {
                    console.log(res.data)
                    if (!res.data.data) {
                        console.log(res.data.msg)
                        Notify(res.data.msg);
                    } else {
                        wx.showToast({
                            title: '注册成功',
                            icon: 'success',
                        })
                        wx.navigateTo({
                            url: '../login/login',
                        })
                    }
                },
                complete() {
                    that.setData({
                        loading: false
                    })
                }
            })

        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
            title: '注册账户'
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