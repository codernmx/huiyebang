// pages/works/completeWork/completeWork.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beforeDetail: {},
    afterDetail: {},
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
   * 保存到相册
   */
  handleSaveImg(e) {
    const url = e.currentTarget.dataset.img;
    let that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.writePhotosAlbum'] == false) {
          wx.openSetting({
            success: (result) => {
              console.log(result);
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success: function (res) {
                  console.log("授权成功");
                  that.loadImg(url);
                }
              })
            },
            fail: (err) => {
              console.log(err);
              app.toast({
                title: '授权失败',
                icon: 'none'
              });
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function (res) {
              console.log("授权成功");
              that.loadImg(url)
            }
          })
        }
      }
    })
  },
  /**
   * 将图片保存到手机
   * @param {*} url 
   */
  loadImg(url) {
    wx.downloadFile({
      url,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            app.toast({
              title: '保存成功'
            });
          },
          fail: (err) => {
            app.toast({
              title: '保存失败',
              icon: 'none'
            });
          }
        })
      }
    })
  },

  //获取学生作品详情
  async getDetail(id) {
    const res = await app.http('/public/compositionstudent/find', 'get', {
      cs_id: id
    });
    this.setData({
      beforeDetail: {
        title: res.data.name,
        desc: res.data.summary,
        time: res.data.created_time ? app.moment(res.data.created_time * 1000).format('YYYY-MM-DD HH:mm') : app.moment().format('YYYY-MM-DD HH:mm'), //作品创建时间
        img: res.data.pics
      }
    })
  },

    //获取作品批改后详情
    async getAfterDetail(id) {
      const res = await app.http('/public/compositioncorrection/find', 'get', {
        cs_id: id
      });
      if(!res.data) return;
      this.setData({
        afterDetail: {
          title: res.data.name,
          desc: res.data.comment,
          time: res.data.created_time ? app.moment(res.data.created_time * 1000).format('YYYY-MM-DD HH:mm') : app.moment().format('YYYY-MM-DD HH:mm'), //作品创建时间
          img: res.data.pics
        }
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    if(options.id) this.getDetail(options.id),this.getAfterDetail(options.id);
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