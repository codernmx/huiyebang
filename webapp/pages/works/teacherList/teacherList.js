// pages/works/teacherList/teacherList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    currentTeacher: 0, //默认选中第一位老师
    data:{}, //上一页提交过来的数据
  },
  /**
   * 切换老师
   */
  changeTeacher(e) {
    this.setData({
      currentTeacher: e.currentTarget.dataset.index
    })
  },
  /**
   * 跳转支付页面
   */
  handleStep() {
    const data = {
      ...this.data.data,
      teacher:this.data.list[this.data.currentTeacher]
    }
    wx.navigateTo({
      url: `/pages/works/pay/pay?data=${encodeURIComponent(JSON.stringify(data))}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.setData({data:JSON.parse(decodeURIComponent(options.data))});
    this.getTeacherList();
  },

  /**
   * 获取教师列表
   */
  async getTeacherList(){
    const res = await app.http('public/user/query','get',{is_teacher:1});
    const arr = [];
    res.data.length && res.data.forEach(item=>{
      arr.push({
        uid: item.uid ,
        img: item.avatar,
        name: item.nickname,
        desc: item.sumary ? item.sumary:'',
      })
    })
    this.setData({ list:arr })
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