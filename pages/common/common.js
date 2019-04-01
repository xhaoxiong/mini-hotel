// pages/common/common.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
const {$Toast} = require('../../dist/base/index');
import utils from '../../utils/utils'

const appinstance = getApp();

const {
    isNotEmpty,
    safeGet,
    getCityListSortedByInitialLetter,
    getLocationUrl,
    getCountyListUrl,
    getIndexUrl
} = utils;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            'https://img.hacpai.com/e/058f3d6dc19d49d8a8a83533c8347c20.jpeg',
            'https://img.hacpai.com/e/9f90a8c8b3d34871933af3deae92ca6d.jpeg',
            'https://img.hacpai.com/e/ebfeabad7a0e4cdca14fd39c31fb9489.jpeg'
        ],
        current: 'homepage',
        date: '2018-10-01',
        time: '12:00',
        dateInTime: null,
        dateOutTime: null,
        dateInTimeArray: null,
        startYear: 2000,
        endYear: 2050,
        Inday: '',
        Outday: '',
        location: appinstance.globalData.defaultCity,
        county: appinstance.globalData.defaultCounty,
        city: "定位中",
        currentCityCode: '',
    },

    searchHandle: function () {
        wx.navigateTo({
            url: '../search/search'
        })
    },
    getLocation: function () {
        console.log("正在定位城市");
        this.setData({county: ''});
        wx.getLocation({
            type: 'wgs84',
            success: res => {
                const {latitude, longitude} = res
                wx.request({
                    url: getLocationUrl(latitude, longitude),
                    success: res => {
                        const {city, adcode, district} = safeGet(['data', 'result', 'ad_info'], res)
                        this.setData({
                            location: city,
                            currentCityCode: adcode,
                            county: district
                        })
                        appinstance.globalData.defaultCity = city
                    }
                })
            },
            fail: () => {
                console.error("定位失败，请重试")
            }
        })
    },

    tabBarChange({detail}) {
        console.log(detail);
        if (detail.key == "homepage") {
            wx.switchTab({
                url: './common'
            })
        }
        this.setData({
            current: detail.key
        })
    },

    handleClick() {

        //查询以一下该城市是否支持
        wx.request({
            url: "https://mini.xhxblog.cn/hotel/city/check",
            method: "post",
            data: {city: this.data.location},
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            success: res => {
                console.log(res)
                if (res.data.code === 10000) {
                    appinstance.globalData.realCity = res.data.data.realName;
                    wx.navigateTo({
                        url: '../hotel/hotel'
                    })
                } else {
                    $Toast({
                        content: '该城市暂时没有酒店信息',
                        type: 'error'
                    });
                }
            }
        })


    },
    bindEnterCityTap: function () {
        wx.navigateTo({
            url: '../switchcity/switchcity',
        })
    },

    bindTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: e.detail.value
        })
    },
    changeDateInTimeColumn(e) {
        let arr = this.data.dateInTime, dateArr = this.data.dateInTimeArray;

        arr[e.detail.column] = e.detail.value;

        console.log(arr);
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
        //console.log(arr);
        this.setData({
            dateInTimeArray: dateArr,
            dateInTime: arr,
            Inday: dateArr[2][arr[2]].substring(0, 3),
        });
    },
    changeDateOutTimeColumn(e) {
        let arr = this.data.dateOutTime, dateArr = this.data.dateOutTimeArray;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
        //console.log(arr);
        this.setData({
            dateOutTimeArray: dateArr,
            dateOutTime: arr,
            Outday: dateArr[2][arr[2]].substring(0, 3),
        });


    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        let time = dateTimePicker.getHourMinu();
        obj.dateTime[2] = parseInt((obj.defaultDay).substring(0, 2)) - 1; //day 字符串 'xx日' 转 'int'
        this.setData({
            dateInTime: obj.dateTime,
            dateInTimeArray: obj.dateTimeArray,
            dateOutTime: obj.dateTime,
            dateOutTimeArray: obj.dateTimeArray,
            Outday: obj.defaultDay,
            Inday: obj.defaultDay,
            time: time
        });
        this.getLocation();
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
        this.setData({
            location: appinstance.globalData.defaultCity,
            county: appinstance.globalData.defaultCounty
        })
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