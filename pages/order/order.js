// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 'tab1',
        current_scroll: 'tab1',
        pageResult: {
            code: null,
            page: 1,
            message: '',
            status: 0,
            per: 10,
            total: 0,
            user_id: 34,
            order_number: '',
            search: '',
            data: {},
        },
        page: 1,
        results: [],
        more: true,
        payTotal: 0,


    },

    handleChange({detail}) {

        this.setData({
            current: detail.key,
            current_scroll: detail.key,
        });
    },

    detailHandler: function (e) {
        console.log(e.currentTarget.dataset.item)
        let item = e.currentTarget.dataset.item
        let that = this;
        let orderInfo = {
            data: item
        };

        wx.navigateTo({
            url: './detail/detail?orderInfo=' + JSON.stringify(orderInfo)
        })
    },

    handleAll() {
        console.log("点击了全部")
        let that = this
        that.setData({
            page: 1,
        })
        that.getAll()
    },

    getAll(e) {
        let that = this;
        if (that.data.page === 1 || that.data.page === 0) {
            that.setData({
                results: [],
            })
        }
        let pageResult = that.data.pageResult;
        pageResult.page = that.data.page;
        pageResult.status = 0;
        that.getOrderList(pageResult)
    },


    handleNotPay() {
        console.log("点击了待付款");
        let that = this;
        that.setData({
            page: 1,
        })
        that.getNotPay()
    },

    getNotPay(e) {

        let that = this;
        let pageResult = that.data.pageResult;
        console.log(pageResult)
        pageResult.page = that.data.page
        pageResult.status = 2
        if (that.data.page === 1 || that.data.page === 0) {
            that.setData({
                results: [],
            })
        }
        that.getOrderList(pageResult)
    },

    getNotPayCount() {
        let that = this;
        wx.request({
            url: "https://mini.xhxblog.cn/order/notpay/count",
            method: "POST",
            header: {'content-type': 'application/x-www-form-urlencoded'},
            data: {
                user_id: 34
            },
            success: res => {
                console.log(res)
                if (res.data.code === 10000) {
                    that.setData({
                        payTotal: res.data.data
                    })
                }
            }
        })
    },

    handlePay() {
        console.log("点击了已支付")
        let that = this
        that.setData({
            page: 1,
        })
        that.getPay()
    },

    getPay(e) {
        console.log(e)
        let that = this;

        let pageResult = that.data.pageResult;
        pageResult.page = that.data.page
        pageResult.status = 3;
        if (that.data.page === 1 || that.data.page === 0) {
            that.setData({
                results: [],
            })
        }
        that.getOrderList(pageResult)
    },

    getOrderList(pageResult) {
        console.log(pageResult)
        let that = this;
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            mask: true
        });

        wx.request({
            url: "https://mini.xhxblog.cn/order/list",
            method: "POST",
            data: JSON.stringify(pageResult),
            header: {
                'Content-Type': 'application/json',
            },
            success: res => {
                if (res.data.code === 10000) {
                    let tmp = res.data.data;
                    console.log(that.data.results)
                    if (tmp.length === 0) {
                        that.setData({
                            more: false
                        })
                    }
                    for (let i = 0; i < tmp.length; i++) {

                        if (tmp[i].HotelItem !== "") {
                            tmp[i].HotelItemParse = JSON.parse(tmp[i].HotelItem);
                        }
                        if (tmp[i].RealInfo !== "") {
                            tmp[i].RealInfoParse = JSON.parse(tmp[i].RealInfo);
                        }
                        if (tmp[i].RoomInfo !== "") {
                            tmp[i].RoomInfoParse = JSON.parse(tmp[i].RoomInfo);
                        }
                    }
                    that.setData({
                        results: that.data.results.concat(tmp)
                    })


                    if (pageResult.status === 2) {
                        that.setData({
                            payTotal: res.data.total,
                        })
                    }

                    console.log(that.data.results)
                    wx.hideToast()
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.setData({
            results: [],
            page: 0,
            more: true,
        })
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
        if (that.data.current_scroll === 'tab1') {
            that.getAll()
        } else if (that.data.current_scroll === 'tab2') {
            that.getNotPay()
        } else {
            that.getPay()
        }
        that.getNotPayCount()
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
        let that = this;
        that.setData({
            page: that.data.pageResult.page + 1
        })
        console.log(that.data.page)
        if (that.data.current_scroll === 'tab1') {
            that.getAll()
        } else if (that.data.current_scroll === 'tab2') {
            that.getNotPay()
        } else {
            that.getPay()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})