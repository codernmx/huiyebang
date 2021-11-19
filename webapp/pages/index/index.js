// pages/index/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: {
      page: 1,
      pageSize: 5,
      total: 0,
      last_page: 1, //最后一页的页码
      completeLoad: false, //是否加载完成
    } //分页操作
  },


  /**
   * 生命周期函数--监听页面加载
   */
  previewImg(e) {
    const url = e.currentTarget.dataset.url
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  getData(data,page) {
    const arr = [];
    data.list.length && data.list.forEach(item => {
      arr.push({
        id: item.cs_id, //
        nickname: item.nickname, //
        pics: item.pics, //
        name: item.name, //
        created_time_f: item.created_time_f, //
        avatar: item.avatar, 
      })
    })
    return page == 1 ? arr : [...this.data.list,...arr];
  },
  onLoad: function (options) {
    this.getList()
    // const _this = this
    // let url = BASE_URL + 'public/composition/pagetea'
    // wx.request({
    //   url,
    //   method: 'GET',
    //   data: {
    //     pageSize: 10,
    //     page: 1,
    //   },
    //   success(res) {
    //     console.log(res, '-----------') +
    //       _this.setData({
    //         list: res.data.data.list
    //       })
    //   }
    // })
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
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.page.completeLoad) this.getList();
  },

  async getList() {
    console.log(this.data.page)
    const {
      completeLoad,
      page,
      pageSize,
      last_page
    } = this.data.page;
    //数据已全部加载完成
    if (completeLoad) return;
    const request_data = {
      page,
      pageSize
    };
    const res = await app.http('public/composition/pagetea', 'get', request_data);
    //判断数据不存在
    if (!res.data.page.total) {
      this.setData({
        'page.completeLoad': true
      });
      return;
    }
    //判断为第一页,保存总数据量total,计算总页数,并赋值显示
    if (page == 1) {
      const all_page = Math.ceil(res.data.page.total / pageSize);
      this.setData({
        'page.total': res.data.page.total,
        'page.last_page': all_page,
        'page.completeLoad': page + 1 > all_page,
        list: this.getData(res.data,page)
      });
    } else {
      this.setData({
        'page.completeLoad': page + 1 > last_page,
        list: this.getData(res.data,page)
      });
    }
    //数据还未加载完,page+1
    if (!this.data.page.completeLoad) {
      this.setData({
        'page.page': page + 1
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})