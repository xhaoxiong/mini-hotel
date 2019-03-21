// pages/hotel/detail/detail.js
let dateTimePicker = require('../../../utils/dateTimePicker.js');
const appinstance = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        visible1: false,
        date: '2018-10-01',
        time: '12:00',
        dateInTime: null,
        dateOutTime: null,
        dateInTimeArray: null,
        startYear: 2000,
        endYear: 2050,
        Inday: '',
        Outday: '',
        date: '',
        hotelItem: {},
        results: [
            // {
            //     roomNameCn: "雅致单间",
            //     bedDescription: "大床",
            //     area: "38m2",
            //     floor: "30-31",
            //     isExtraBed: "收费加床"
            // },
            // {
            //     roomNameCn: "雅致单间",
            //     bedDescription: "大床",
            //     area: "38m2",
            //     floor: "30-31",
            //     isExtraBed: "收费加床"
            // },
            // {
            //     roomNameCn: "雅致单间",
            //     bedDescription: "大床",
            //     area: "38m2",
            //     floor: "30-31",
            //     isExtraBed: "收费加床"
            // }
        ],
        result: {},
        roomInfo: {},
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

    handleOpen1(e) {

        this.setData({
            result: e.target.dataset.item,
            visible1: true,

        });
    },

    handleClose1(e) {

        this.setData({
            visible1: false
        });
    },

    payOrder(e) {
        let that = this;
        console.log(this.data.result);
        console.log(this.data.roomInfo);


        //此处开始预下单

        //需要携带的参数
        /**
         * 入住和离开时间
         * 实际付款
         * 房型信息
         *
         */
        that.preOrder()
        this.setData({
            visible1: false
        });
    },

    preOrder: function () {
        let that = this;
        console.log(that.data.result);
        console.log(that.data.roomInfo);
        let orderInfo = {
            HotelId: that.data.hotelItem.hotelId + "",
            HotelItem: JSON.stringify(that.data.hotelItem),
            RoomId: that.data.roomInfo.roomId + "",
            RoomInfo: JSON.stringify(that.data.roomInfo),
            Status: 2,
            UserId: 34,
        }


        wx.request({
            url: "https://mini.xhxblog.cn/order/create",
            method: 'POST',
            data: JSON.stringify(orderInfo),
            header: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${appinstance.globalData.token}`
            },
            success: res => {
                let orderInfo = JSON.stringify(res.data)
                wx.navigateTo({
                    url: '../../order/detail/detail?orderInfo=' + orderInfo,
                })

            }
        })
    },

    getRoomList: function () {
        let that = this;
        let reqParams = {
            hotelId: that.data.hotelItem.hotelId + "",
            inDate: that.data.date,
        }

        wx.showToast({
            title: '加载中',
            icon: 'loading'
        });
        wx.request({
            url: "https://mini.xhxblog.cn/hotel/room/price",
            method: 'POST',
            data: JSON.stringify(reqParams),
            header: {
                'Content-Type': 'application/json',
            },
            success: res => {
                console.log(res)
                let results = res.data.data;

                for (let i = 0; i < results.length; i++) {
                    results[i].status = false;
                }

                that.setData({
                    results: results
                })
                wx.hideToast();
            },
            error: res => {
                wx.showToast({
                    title: '获取信息失败',
                    icon: 'error'
                });
            }
        })
    },

    showPannel: function (e) {
        console.log(e);
        let that = this;
        let results = that.data.results;
        results[e.currentTarget.dataset.index].status = !results[e.currentTarget.dataset.index].status;
        that.setData({
            results: results,
            roomInfo: e.currentTarget.dataset.item
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        let time = dateTimePicker.getHourMinu();
        obj.dateTime[2] = parseInt((obj.defaultDay).substring(0, 2)) - 1; //day 字符串 'xx日' 转 'int'
        let M = obj.dateTime[1] + 1;
        let D = obj.dateTime[2] + 1;
        let Ms = "";
        let Ds = "";
        if (M < 10) {
            Ms = "0" + M
        } else {
            Ms = M
        }
        if (D < 10) {
            Ds = "0" + D
        } else {
            Ds = D
        }
        this.setData({
            dateInTime: obj.dateTime,
            dateInTimeArray: obj.dateTimeArray,
            dateOutTime: obj.dateTime,
            dateOutTimeArray: obj.dateTimeArray,
            Outday: obj.defaultDay,
            Inday: obj.defaultDay,
            time: time,
            hotelItem: JSON.parse(options.hotelItem),
            date: "20" + obj.dateTime[0] + "-" + Ms + "-" + Ds,
        });
        that.getRoomList()
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