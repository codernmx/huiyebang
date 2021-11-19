
const app=getApp()
// pages/teacher/HomeworkCorrectingAfter/HomeworkCorrectingAfter.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value:'',
        pics:'',
        list:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            value:options.value,
            pics:JSON.parse(options.model)[0].url,
            list:JSON.parse(options.model1)
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

    previousPage:function(){
        wx.navigateBack
    },

    previousPag:function(){
       wx.navigateBack({
         delta: 1,
       })
    },

    async confirm(){
        this.data.list.attachment=this.data.pics,
        this.data.list.remark=this.data.value,
        this.data.list.status=4
        await app.http('public/compositioncorrection/add','POST',this.data.list);
        wx.redirectTo({
            url: '../HomeworkCorrecting/HomeworkCorrecting',
          })
    }
})