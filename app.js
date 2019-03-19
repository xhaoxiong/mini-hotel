//app.js
const {$Toast} = require('./dist/base/index');
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        let userInfo = wx.getStorageSync("userInfo");
        let openid = wx.getStorageSync("openid");
        let token = wx.getStorageSync("token");
        this.globalData.openid = openid;
        this.globalData.userInfo = userInfo;
        this.globalData.token = token;
        if (this.globalData.token == '') {
            this.getOpenid();
        }
    },

    //获取用户信息
    getUserInfo: function (cb) {
        let that = this;
        wx.getUserInfo({
            success: function (res) {
                that.globalData.userInfo = res.userInfo;
                wx.setStorageSync('userInfo', res.userInfo);
                if (that.globalData.openid === '') {
                    console.log("获取openid");
                    that.getOpenid();
                } else {
                    $Toast({
                        content: '登陆成功',
                        type: 'success'
                    });
                }
            },
            error: function (res) {
                console.log(res);
            }
        })
    },

    //获取openid 和token
    getOpenid: function () {
        let that = this;
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
                            console.log(res);
                            if (res.data.code === 10000) {
                                that.globalData.openid = res.data.userinfo.openid;
                                that.globalData.token = res.data.userinfo.token;
                                that.globalData.sessionKey = res.data.userinfo.sessionKey;
                                console.log()
                                wx.setStorageSync('openid', res.data.userinfo.openid);
                                wx.setStorageSync('sessionKey', res.data.userinfo.sessionKey);
                                wx.setStorageSync('token', res.data.userinfo.token);
                                if (that.globalData.userInfo === null && that.globalData.openid === '') {
                                    // that.setUserInfo()
                                } else {
                                    wx.showToast({
                                        title: '登陆成功'

                                    })
                                }
                            } else {
                                console.log('登陆失败');
                            }
                        }
                    })
                }
            }
        })
    },

    setUserInfo: function () {
        let that = this;

        wx.request({
            url: "https://mini.xhxblog.cn/auth/userinfo",
            method: 'POST',
            data: {

                openid: that.globalData.openid,
                userinfo: that.globalData.userInfo,
            },
            header: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${that.globalData.token}`
            },
            success: res => {
                if (res.data.code === 10000) {
                    wx.showToast({
                        title: '登陆成功'

                    })
                }
            }
        })
    },
    globalData: {
        userInfo: '',
        defaultCity: '',
        defaultCounty: '',
        defaultDomain: 'https://mini.xhxblog.cn',
        openid: '',
        token: '',
        sessionKey: ''
    }
})