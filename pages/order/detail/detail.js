// pages/order/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderInfo: {},
        hotelItem: {},
        roomInfo: {},
        createdAt: '',
        visible1: false,
        visible2: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.setData({
            createdAt: that.formatCreatedAt(JSON.parse(options.orderInfo).data.CreatedAt),
            orderInfo: JSON.parse(options.orderInfo),
            hotelItem: JSON.parse(JSON.parse(options.orderInfo).data.HotelItem),
            roomInfo: JSON.parse(JSON.parse(options.orderInfo).data.RoomInfo)
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    handleOpen1(e) {
        this.setData({
            visible1: true,
        });
    },

    handleOpen2(e) {
        this.setData({
            visible2: true,
        });
    },
    cancelOrder(e) {
        this.setData({
            visible1: false
        });
        let that = this;
        wx.showToast({
            title: '取消订单中',
            icon: 'loading',
            mask: true
        });
        wx.request({
            url: "https://mini.xhxblog.cn/order/update",
            method: 'POST',
            data: {
                ID: that.data.orderInfo.data.ID,
                Status: 4
            },
            header: {
                'Content-Type': 'application/json',
            },
            success: res => {
                if (res.data.code === 10000) {
                    wx.showToast({
                        title: '取消成功',
                        icon: 'success',
                        mask: true
                    })
                    setTimeout(function () {
                        wx.hideToast()
                        wx.switchTab({
                            url: '../order'
                        })
                    }, 1500)
                }
            }
        })
    },
    handleClose2(e) {
        this.setData({
            visible2: false
        });
    },
    payOrder(e) {
        this.setData({
            visible1: false
        });
        let that = this;
        wx.showToast({
            title: '支付中',
            icon: 'loading',
            mask: true
        });
        wx.request({
            url: "https://mini.xhxblog.cn/order/update",
            method: 'POST',
            data: {
                ID: that.data.orderInfo.data.ID,
                Status: 3
            },
            header: {
                'Content-Type': 'application/json',
            },
            success: res => {
                if (res.data.code === 10000) {
                    wx.showToast({
                        title: '支付成功',
                        icon: 'success',
                        mask: true
                    })
                    setTimeout(function () {
                        wx.hideToast()
                        wx.switchTab({
                            url: '../order'
                        })
                    }, 1500)
                }
            }
        })
    },
    formatCreatedAt(cellValue) {
        let date = new Date(Date.parse(cellValue));
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D + h + m + s //呀麻碟
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