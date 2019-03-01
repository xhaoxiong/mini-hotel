  // pages/login/login.js
const appinstance = getApp();
const {$Toast} = require('../../dist/base/index');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mobileValue: '',
        nameValue: '',
        cardValue: '',
        codeValue: '',
        isShowClear: false,
        isCountDown: false,
        countDown: false, //默认是没有倒计时的
        getmsg: '获取验证码',
        cardArray: ["身份证", "台湾居民来往大陆通行证", "港澳居民大陆通行证", "外籍护照"],
        cardIndex: 0
    },
    handleClick: function () {
        let mobileValue = this.data.mobileValue;
        let nameValue = this.data.nameValue;
        let cardValue = this.data.cardValue;
        let codeValue = this.data.codeValue;
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

        if (mobileValue == '' ||
            nameValue == '' ||
            cardValue == '') {
            $Toast({
                content: '请填写完整',
                type: 'error'
            });
            return
        }

        if (!myreg.test(mobileValue)) {
            $Toast({
                content: '请填写正确的手机号码',
                type: 'error'
            });
            return
        }

        if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(nameValue))) {
            $Toast({
                content: '请填写正确的姓名',
                type: 'error'
            });
            return
        }

        if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(cardValue))) {
            $Toast({
                content: '请填写正确的身份证号码',
                type: 'error'
            });
            return
        }
        let that = this;
        wx.request({
            url: 'https://mini.xhxblog.cn/auth/bind',
            method: 'POST',
            data: {
                mobile: mobileValue,
                username: nameValue,
                cate: that.data.cardIndex,
                card_number: cardValue,
                openid: appinstance.globalData.openid,
                sessionKey: appinstance.globalData.sessionKey,
                code: codeValue
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            success(res) {
                if (res.data.status === 10000) {
                    console.log(res);
                    wx.setStorageSync('token', res.data.token);
                    $Toast({
                        content: '绑定成功',
                        type: 'success'
                    });
                    wx.navigateBack({
                        delta: 1
                    })
                } else {
                    $Toast({
                        content: res.data.message,
                        type: 'error'
                    });
                }
            }
        })
    },


    sendSms: function () {

        let that = this;
        let mobile = that.data.mobileValue;
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (mobile == '' || !myreg.test(mobile)) {
            $Toast({
                content: '请输入正确的手机号码',
                type: 'error'
            });
            return
        }
        if (that.data.isCountDown) {
            return
        }
        if (!that.data.countDown) {
            that.setData({
                isCountDown: true
            });
            let time = 60;
            let inter = setInterval(function () {
                that.setData({
                    getmsg: time + "s后重新发送",
                });
                time--;
                if (time < 0) {
                    clearInterval(inter);
                    that.setData({
                        countDown: false,
                        isCountDown: false,
                        getmsg: '获取短信验证码',
                    })
                }
            }, 1000);

            wx.request({
                url: "https://mini.xhxblog.cn/auth/send/sms",
                method: 'POST',
                data: {mobile: mobile},
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    // 'Authorization': `Bearer ${appinstance.globalData.token}`
                },
                success: res => {
                    if (res.data.status === 10000) {
                        $Toast({
                            content: '发送成功',
                            type: 'success'
                        });
                    } else if (res.data.status === 10014) {
                        $Toast({
                            content: '验证失败',
                            type: 'error'
                        });
                    }
                }
            })
        }


    },

    codeTap: function (e) {
        if (e.detail != null) {
            this.setData({
                codeValue: e.detail.value
            })
        }
    },

    nameTap: function (e) {
        if (e.detail != null) {
            this.setData({
                nameValue: e.detail.value
            })
        }
    },
    mobileTap: function (e) {
        if (e.detail != null) {
            this.setData({
                isShowClear: true,
                mobileValue: e.detail.value
            })
        }
    },

    cardTap: function (e) {
        if (e.detail != null) {
            this.setData({
                cardValue: e.detail.value
            })
        }
    },

    bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            cardIndex: e.detail.value
        })
    },

    clearInput: function () {
        this.setData({
            mobileValue: ''
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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