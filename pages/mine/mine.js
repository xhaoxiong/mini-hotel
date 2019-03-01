// pages/mine/mine.js
const appinstance = getApp();
const {$Toast} = require('../../dist/base/index');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userinfo: null,
        isbind: false,
    },

    getInfo: function () {
        let that = this;

        wx.getUserInfo({
            success(res) {
                appinstance.globalData.userInfo = res.userInfo;
                wx.setStorageSync('userInfo', res.userInfo);
                that.setData({
                    userinfo: res.userInfo,
                });
                console.log(res)
                that.createUser();
            }
        })

    },


    createUser: function () {

        wx.request({
            url: "https://mini.xhxblog.cn/auth/userinfo",
            method: 'POST',
            data: {
                id: 0,
                userinfo: appinstance.globalData.userInfo,
                openid: appinstance.globalData.openid
            },
            header: {
                'content-type': 'application/json',
            },
            success: res => {
                $Toast({
                    content: '完善成功',
                    type: 'success'
                });
                console.log(res)
                // $Toast({
                //     content: res.message,
                //     type: 'error'
                // });
            }
        })
    },

    mobileHandle: function () {

        let userinfo = wx.getStorageSync('userInfo');
        let that = this;

        if (userinfo != '') {
            if (!that.data.isbind) {
                wx.navigateTo({
                    url: '../login/login',
                })
            }
        }
    },

    checkBind: function () {
        let that = this;
        wx.request({
            url: "https://mini.xhxblog.cn/auth/bind/check",
            method: 'POST',
            header: {'content-type': 'application/x-www-form-urlencoded'},
            data: {
                openid: appinstance.globalData.openid
            },
            success: res => {
                if (res.data.status === 10000) {
                    that.setData({
                        isbind: res.data.isBind
                    });
                }
            }
        })
    },

    cancelBind: function () {
        let that = this;

        wx.showModal({
            title: '提示',
            content: '您确定要取消绑定吗？',
            success: res => {
                if (res.confirm) {
                    wx.request({
                        url: "https://mini.xhxblog.cn/auth/bind/cancel",
                        method: 'post',
                        data: {openid: appinstance.globalData.openid},
                        header: {'content-type': 'application/x-www-form-urlencoded'},
                        success: res => {
                            if (res.data.status === 10000) {
                                that.setData({
                                    isbind: false
                                })
                            }
                        }
                    })
                }
            }
        })


    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.checkBind();
        if (appinstance.globalData.userInfo != '') {
            that.setData({
                userinfo: appinstance.globalData.userInfo
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
        let that = this;
        that.onLoad()
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