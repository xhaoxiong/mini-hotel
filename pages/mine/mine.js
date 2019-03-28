// pages/mine/mine.js
const app = getApp();
const {$Toast} = require('../../dist/base/index');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userinfo: null,
        isbind: false,
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        openid: '',
        token: ''
    },

    getInfo: function () {
        let that = this;
        wx.getUserInfo({
            success(res) {
                that.setData({
                    userinfo: res.userInfo
                })
                wx.login({
                    success: function (res) {
                        let code = res.code;
                        if (code) {
                            wx.request({
                                url: 'https://mini.xhxblog.cn/auth/openid',
                                method: 'POST',
                                data: {code: code},
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded',
                                },
                                success: res => {
                                    console.log(res.data)
                                    if (res.data.code === 10000) {
                                        that.setData({
                                            openid: res.data.data.openid,
                                            token: res.data.data.token,
                                        })
                                        that.createUser()
                                    }
                                }
                            })
                        }
                    }
                })

            }
        })
    },


    createUser: function () {
        let that = this;
        let userinfo = that.data.userinfo;
        let token = that.data.token;
        let openid = that.data.openid;
        let sessionKey = that.data.sessionKey;
        wx.request({
            url: "https://mini.xhxblog.cn/auth/userinfo",
            method: 'POST',
            data: {
                id: 0,
                userinfo: userinfo,
                openid: openid
            },
            header: {
                'content-type': 'application/json',
            },
            success: res => {
                wx.setStorageSync('userinfo', res.data.data)
                wx.setStorageSync('token', token);
                wx.setStorageSync('openid', openid);
                wx.setStorageSync('sessionKey', sessionKey);
                app.globalData.openid = openid;
                app.globalData.token = token;
                app.globalData.userinfo = res.data.data
                app.globalData.sessionKey = sessionKey;
                that.setData({
                    hasUserInfo: true,
                    userinfo: res.data.data
                });
                $Toast({
                    content: '获取用户信息成功',
                    type: 'success'
                });
            }
        })
    },

    mobileHandle: function () {

        let userinfo = wx.getStorageSync('userinfo');
        console.log(userinfo);
        if (userinfo !== '') {
            wx.navigateTo({
                url: '../login/login',
            })
        }
    },
    feedbackHandle: function () {
        wx.navigateTo({
            url: '../feedback/feedback',
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;

        let userinfo = wx.getStorageSync('userinfo');
        if (userinfo !== '') {
            that.setData({
                userinfo: userinfo,
                hasUserInfo: true,
            })
        } else {
            wx.getSetting({
                success(res) {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        wx.getUserInfo({
                            success(res) {
                                that.setData({
                                    userinfo: res.userInfo,
                                    hasUserInfo: true
                                })
                            }
                        })
                    }
                }
            })
        }

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