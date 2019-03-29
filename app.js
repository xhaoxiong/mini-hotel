//app.js
const {$Toast} = require('./dist/base/index');
App({
    onLaunch: function () {
        let that = this
        //调用API从本地缓存中获取数据
        let openid = wx.getStorageSync("openid");
        let userinfo = wx.getStorageSync("userinfo");
        if (userinfo !== null) {
            that.globalData.userinfo = userinfo
        }
        if (openid !== '') {
            that.exchangeToken(openid)
        }
    },

    //通过openid 换取token
    exchangeToken(openid) {
        let that = this
        wx.request({
            url: "https://mini.xhxblog.cn/auth/generate/token",
            method: 'post',
            data: {'openid': openid},

            success: res => {
                if (res.data.code === 10000) {
                    that.globalData.token = res.data.data.token
                    wx.setStorageSync('token', res.data.data.token);
                    that.exchangeUserInfo(openid)
                }
            }
        })
    },

    exchangeUserInfo(openid) {
        let that = this;
        wx.request({
            url: "https://mini.xhxblog.cn/auth/user",
            method: 'post',
            data: {openid: openid},
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${that.globalData.token}`
            },
            success: res => {
                if (res.data.code === 10000) {
                    wx.setStorageSync('userinfo', res.data.data);
                    that.setData({
                        userinfo: res.data.data,
                    })
                }
            }
        })
    },


    globalData: {
        userinfo: '',
        defaultCity: '',
        defaultCounty: '',
        defaultDomain: 'https://mini.xhxblog.cn',
        openid: '',
        token: '',
        sessionKey: ''
    }
})