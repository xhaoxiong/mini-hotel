// pages/feedback/feedback.js
const app = getApp();
const {$Toast} = require('../../dist/base/index');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: ''
    },

    bindTextAreaBlur: function (e) {
        let that = this;
        console.log(e)
        that.setData({
            content: e.detail.value,
        })
    },

    feedBackSubmit() {

        let that = this;
        console.log(that.data.content);
        wx.request({
            url: "https://mini.xhxblog.cn/feedback/create",
            method: 'post',
            data: {
                UserId: app.globalData.userinfo.ID,
                Content: that.data.content
            },
            header: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${app.globalData.token}`
            },
            success: res => {

                if (res.data.code === 10000) {
                    wx.showToast({
                        title: '反馈成功'
                    })
                    that.setData({
                        content: ''
                    })
                } else {

                }
            }
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
