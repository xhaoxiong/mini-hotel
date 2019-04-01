// pages/hotel/hotel.js
const {$Toast} = require('../../dist/base/index');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        distanceState: false,
        areaState: false,
        selectState: false,
        searchParams: {
            'keywords': '',
            'page': '0',
            'cityName': '长沙',
            'iDate': '',
            'outDate': '',
            'sortCode': '',
            'returnFilter': '',
            'star': '',
            'feature': '',
            'minPrice': '',
            'maxPrice': '',
            'facility': '',
            'hotellablels': ''
        },
        hotelList: [],
        page: 0,
        showLoading: false,
    },

    showDetail: function (e) {
        let hotelItem = JSON.stringify(e.currentTarget.dataset.item);
        console.log(hotelItem);
        wx.navigateTo({
            url: './detail/detail?hotelItem=' + hotelItem,
        })
    },

    handleImageError: function (e) {
        let that = this;
        let list = that.data.hotelList;
        let index = e.target.dataset.index;
        list[index].picture = "https://img.hacpai.com/file/2019/04/hotelpicture-a4033054.jpg";
        that.setData({
            hotelList: list
        });
    },

    getHotelList: function () {
        let that = this;

        that.data.searchParams.page = that.data.page + "";

        if (that.data.searchParams.page === "NaN") {
            console.log(that.data.page)
            console.log(that.data.searchParams.page)
            return
        }
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        });
        wx.request({
            url: "https://mini.xhxblog.cn/hotel/search",
            method: 'POST',
            data: JSON.stringify(that.data.searchParams),
            header: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${app.globalData.token}`
            },
            success: res => {
                if (res.data.code === 10000) {
                    that.setData({
                        hotelList: that.data.hotelList.concat(res.data.data.hotelList),
                    });
                    wx.hideToast();
                    console.log(that.data.hotelList);
                } else {
                    $Toast({
                        content: '获取酒店信息失败,请稍后再试试~',
                        type: 'error'
                    });
                }

            }
        })
    },

    distanceBind: function () {
        let that = this;
        that.setData({
            distanceState: !that.data.distanceState,
            areaState: false,
            selectState: false,
        })
    }
    ,

    areaStateBind: function () {
        let that = this;
        that.setData({
            areaState: !that.data.areaState,
            distanceState: false,
            selectState: false
        })
    },

    selectStateBind: function () {
        let that = this;
        that.setData({
            selectState: !that.data.selectState,
            areaState: false,
            distanceState: false,
        })
    }
    ,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.setData({
            hotelList: [],
            page: 0
        });

        that.getHotelList();
    }
    ,


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    }
    ,

    onPageScroll() {
        let that = this;


        that.setData({
            areaState: false,
            distanceState: false,
            selectState: false,
        })
        // Do something when page scroll
    }
    ,


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this;

    }
    ,

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
    ,

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        that.setData({
            page: that.data.page + 1
        })
        that.getHotelList()
    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    showLoading: function () {
        this.setData({
            showLoading: true
        })
    },
    cancelLoading: function () {
        this.setData({
            showLoading: false
        })
    }
})