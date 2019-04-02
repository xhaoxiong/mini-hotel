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
            'cityName': '',
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
        minPrice: '',
        maxPrice: '',
        hotelList: [],
        page: 0,
        showLoading: false,
        cityName: '',
    },

    minPriceBind: function (e) {
        if (e.detail != null) {
            this.setData({
                minPrice: e.detail.value
            })
        }
    },
    maxPriceBind: function (e) {
        if (e.detail != null) {
            this.setData({
                maxPrice: e.detail.value
            })
        }
    },
    exchangeCity: function () {
        wx.navigateTo({
            url: '../switchcity/switchcity',
        })
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

        let params = that.data.searchParams;
        params.cityName = app.globalData.realCity + '';
        params.minPrice = that.data.minPrice;
        params.maxPrice = that.data.maxPrice;
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        });
        wx.request({
            url: "https://mini.xhxblog.cn/hotel/search",
            method: 'POST',
            data: JSON.stringify(params),
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

                } else {
                    $Toast({
                        content: '获取酒店信息失败,请稍后再试试~',
                        type: 'error'
                    });
                }

            }
        })
    },


    getCityHotelList: function () {
        let that = this;
        that.handleClick()
    },
    getOnloadHotelList: function () {
        let that = this;
        that.onLoad()
    },

    distanceBind: function () {
        let that = this;
        that.setData({
            distanceState: !that.data.distanceState,
            areaState: false,
            selectState: false,
        })
    },

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
            page: 0,


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
        that.setData({
            cityName: app.globalData.defaultCity,
        })
    },
    handleClick() {
        let that = this;
        //查询以一下该城市是否支持
        wx.request({
            url: "https://mini.xhxblog.cn/hotel/city/check",
            method: "post",
            data: {city: app.globalData.defaultCity},
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            success: res => {
                console.log(res)
                if (res.data.code === 10000) {
                    app.globalData.realCity = res.data.data.realName;
                    that.onLoad()
                } else {
                    $Toast({
                        content: '该城市暂时没有酒店信息',
                        type: 'error'
                    });
                }
            }
        })


    },

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