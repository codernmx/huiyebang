import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    userInfo:null,
  },
  dele(e) {
    const info = e.currentTarget.dataset.info
    Dialog.confirm({
        title: '是否删除？',
        message: '操作不可撤销是否确定删除？',
      })
      .then(() => {
        // on confirm
        const _this = this
        wx.getStorage({
          key: 'token',
          success(res) {
            console.log(res.data)
            wx.request({
              url: 'https://bang.huiyezhiguan.com/api/public/compositionteacher/delete',
              method: 'GET',
              header: {
                'Authorization': res.data // 默认值
              },
              data: {
                ct_id: info.ct_id,
                name: info.name,
              },
              success(res) {
                console.log(res, '-----------')
                _this.init()
              }
            })
          }
        })
      })
      .catch(() => {
        // on cancel
      });
  },
  previewImg(e) {
    const url = e.currentTarget.dataset.url
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({userInfo:options})
    this.init()
  },
  init(){
    const _this = this
    wx.getStorage({
      key: 'token',
      success(res) {
        console.log(res.data)
        wx.request({
          url: 'https://bang.huiyezhiguan.com/api/public/compositionteacher/query',
          method: 'GET',
          header: {
            'Authorization': res.data // 默认值
          },
          data: {
            pageSize: 10,
            page: 1,
          },
          success(res) {
            console.log(res, '-----------') +
              _this.setData({
                list: res.data.data
              })
          }
        })
      }
    })
  },
  openAdd() {
    wx.navigateTo({
      url: '/pages/works/teaadd/add',
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