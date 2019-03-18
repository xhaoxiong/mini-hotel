// pages/hotel/hotel.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        distanceState: false,
        areaState: false,
        selectState: false
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

    onPageScroll() {
        console.log(1111);
        let that = this;
        that.setData({
            areaState: false,
            distanceState: false,
            selectState: false
        })
        // Do something when page scroll
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