const app =getApp()
// pages/teacher/HomeworkCorrectings/HomeworkCorrectings.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:{},
        id:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id:options.model
        })
        this.getCates()
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

    },

    async getCates(){
        const res = await app.http('public/compositionstudent/find','GET',{cs_id:this.data.id});
        this.setData({list:res.data})
    },

    previousPage:function(){
        wx.navigateBack
    },

    pics:function(){
        wx.navigateTo({
          url: '../WorkDetails/WorkDetails?pics='+this.data.list.pics,
        })
    },

    detailed:function(){
        var model=JSON.stringify(this.data.list)
            wx.navigateTo({
            url: '../TeacherCorrecting/TeacherCorrecting?model='+model,
            })
    },
})