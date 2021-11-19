// pages/works/applyCorrecting/applyCorrecting.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
  },

  /**
   * 跳转选择批改老师页面
   */
  jumpSelectTeacher() {
    wx.navigateTo({
      url: `/pages/works/teacherList/teacherList?data=${encodeURIComponent(JSON.stringify(this.data.detail))}`,
    })
  },

      /**
   * 图片预览
   */
  handlePreView(e){
    const url = e.currentTarget.dataset.url;
    if(!url) return;
    wx.previewImage({
      urls:[url]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    if(options.id) this.getDetail(options.id);
  },

  //获取学生作品详情
  async getDetail(id) {
    const res = await app.http('/public/compositionstudent/find', 'get', {
      cs_id: id
    });
    this.setData({
      detail:{
        title: res.data.name,
        desc: res.data.summary,
        time:res.data.created_time ? app.moment(res.data.created_time * 1000).format('YYYY-MM-DD HH:mm') : app.moment().format('YYYY-MM-DD HH:mm'), //作品创建时间
        img: res.data.pics,
        id
      }
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

  }
})