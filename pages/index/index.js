//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        enterCommon: 'enterCommon',
        enterCity: 'enterCity',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        location: app.globalData.defaultCity,
        county: app.globalData.defaultCounty,
        visible1: true,
    },
    //事件处理函数
    bindViewTap: function () {
        wx.switchTab({
            url: '../logs/logs'
        })
    },

    loginTap: function () {
        let that = this
        wx.login({
            success: res => {
                let code = res.code
                console.log("获取code:" + code)
                if (code) {
                    wx.request({
                        url: 'https://mini.xhxblog.cn/auth/bind',
                        method: 'POST',
                        data: {code: code},
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                            console.log(res.data);
                        }
                    })
                }
            }
        })
    },
    bindEnterCommonTap: function () {
        wx.switchTab({
            url: '../common/common',
        })
    },
    bindEnterCityTap: function () {
        wx.navigateTo({
            url: '../switchcity/switchcity',
        })
    },
    onLoad: function () {

        // 查看是否授权
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success(res) {
                            console.log(res.userInfo)
                        }
                    })
                }
            }
        })


        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    onShow: function () {
        this.setData({
            location: app.globalData.defaultCity,
            county: app.globalData.defaultCounty
        })
    },

})
