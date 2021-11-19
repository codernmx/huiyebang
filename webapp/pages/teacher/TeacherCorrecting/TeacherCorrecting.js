// pages/teacher/TeacherCorrecting/TeacherCorrecting.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fileList: [
           
          ],
        uploaderon:"0",
        textheight:{
            maxHeight: 400, minHeight: 50
        },
        value:'',
        list:{}
    },
    daleteimg(){
        this.setData({uploaderon:"0"})
        this.setData({fileList:[]})
    },
    updateimg(e){
        this.setData({uploaderon:"1"})
        this.setData({fileList:[{url: e.detail.file.url}]})
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            list:JSON.parse(options.model)
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

    correcting:function(){
        if(this.data.fileList.length==0)
        {
            wx.showToast({
              title: '请添加图片',
              icon:'none'
            })
        }else{
             var model=JSON.stringify(this.data.fileList)
            var model1=JSON.stringify(this.data.list)
            wx.navigateTo({
             url: '../HomeworkCorrectingAfter/HomeworkCorrectingAfter?model='+model+'&model1='+model1+'&value='+this.data.value,
            })
        }
        
    },

    onChange:function(event){
        this.setData({
            value:event.detail
        })
    }

})