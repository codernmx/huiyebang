// pages/works/pay/pay.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    currentPackage: 0, //当前选中的套餐
    data: {}, //上一页提交过来的数据
  },

  /**
   * 切换套餐
   */
  changePackage(e) {
    this.setData({
      currentPackage: e.currentTarget.dataset.index
    })
  },

  /**
   * 立即支付
   */
  async handlePay() {
    this.setData({
      data: {
        ...this.data.data,
        package: this.data.list[+this.data.currentPackage]
      }
    });
    //提交选择的作品和老师以及套餐
    await app.http('/public/composition/stuupdate','post',{
      cs_id: this.data.data.id, //作品id
      tea_uid:this.data.data.teacher.uid,  //老师id
      csm_id: this.data.data.package.csm_id //套餐id
    });
    //发起支付
    const res = await app.http('/public/compositionstudent/pay', 'post', {
      cs_id: this.data.data.id
    });
    app.wxPayment({
      payment: {
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
      },
      success: () => {
        app.toast({title:'支付成功',icon:'success',callback:()=>{
          //保存页面刷新标记
          wx.setStorageSync('refresh', 1)
          wx.switchTab({
            url: '/pages/works/index',
          })
        }})
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.setData({
      data: JSON.parse(decodeURIComponent(options.data))
    });
    this.getCompositionsetmenu();
  },

  /**
   * 获取套餐列表
   */
  async getCompositionsetmenu() {
    const res = await app.http('/public/compositionsetmenu/query', 'get');
    const arr = [];
    res.data.length && res.data.forEach(item => {
      arr.push({
        csm_id: item.csm_id,
        title: item.name,
        desc: item.content,
        price: item.price
      })
    })
    this.setData({
      list: arr
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