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
            header: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            success: res => {
                if (res.data.code === 10000) {
                    that.globalData.token = res.data.data.token
                    console.log(res)
                    wx.setStorageSync('token', res.data.data.token);
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