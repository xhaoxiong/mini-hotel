// pages/hotel/detail/detail.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');


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

        results: [
            {
                "id": 1
            },
            {
                "id": 2
            }
        ],
        result: {}
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
        console.log(e.target.dataset.item);
        this.setData({
            result: e.target.dataset.item,
            visible1: true,

        });
    },

    handleClose1() {
        this.setData({
            visible1: false
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