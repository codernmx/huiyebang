const app =getApp()
// pages/teacher/HomeworkCorrecting/HomeworkCorrecting.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        page:1,
        on:'on',
        on1:'',
        id:0,
        status:3,
        index:0,
        longLength:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.isLogin();
        this.getCates();
    },

    async getCates(){
        if(this.data.id==1){
            this.setData({
                status:4
            })
        }else{
            this.setData({
                status:3
            })
        }
        const res = await app.http('public/compositionstudent/waitcorrection','GET',{page:this.data.page,pageSize:15,status:this.data.status});
        const total=res.data.page.total
        this.data.longLength=Math.ceil(total/15)
        this.setData({list:[...this.data.list,...res.data.list]})
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
    scrolltoupper(){
        if(this.data.page>=this.data.longLength){
            wx.showToast({
              title: '没有下一页',
              icon:'none'
            })
        }else{
            this.data.page++
            this.getCates()
        }
    },
    onReachBottom(){

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    newPage:function(e){
        var model=e.currentTarget.id
        wx.navigateTo({
          url: '../HomeworkCorrectings/HomeworkCorrectings?model='+model,
        })
    },

    handleItemTap(e){
        if(e.target.dataset.id==1){
            this.setData({
                on:'',
                on1:'on',
                id:1
            })
        }else{
            this.setData({
                on:'on',
                on1:'',
                id:0
            })
        }
        this.setData({
            list:[],
            page:1
        })
        this.getCates()
    }
})