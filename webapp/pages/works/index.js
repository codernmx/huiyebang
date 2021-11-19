// pages/works/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addCardInfo: {
      title: '我的作品',
      desc: '去添加更多作品'
    }, //添加作品卡片
    currentTab: 1, //当前选中tab
    list: [], //作品列表
    popover: '', //气泡组件
    currentStatus: '', //操作的当前作品的状态
    currentWorksId: '', //操作的当前作品id
    page: {
      page: 1,
      pageSize: 5,
      total: 0,
      last_page: 1, //最后一页的页码
      completeLoad: false, //是否加载完成
    }, //分页操作
    isLogin:false, //是否已登录
  },

  /**
   * 切换tab 
   */
  handleChangeTab(e) {
    const id = e.currentTarget.dataset.id;
    if (this.data.currentTab == id) return;
    this.data.popover.onHide();
    this.setData({
      currentTab: id,
      list:[],
      page: {
        page: 1,
        pageSize: 5,
        total: 0,
        last_page: 1,
        completeLoad: false,
      }, //初始化分页数据
    });
    this.getList(); //请求作品列表数据
  },

  /**
   * 跳转添加页面
   */
  jumpAdd() {
    wx.navigateTo({
      url: '/pages/works/add/add?type=add',
    })
  },

  /**
   * 批改后的作品跳转详情页
   */
  toDetail(e) {
    const status = e.currentTarget.dataset.status;
    const index = e.currentTarget.dataset.index;
    // 获取按钮元素的坐标信息
    var id = `#button${index}` // 或者 e.target.id 获取点击元素的 ID 值
    wx.createSelectorQuery().select(id).boundingClientRect(res => {
      // 调用自定义组件 popover 中的 onDisplay 方法
      this.data.popover.onDisplay(res);
    }).exec();
    this.setData({
      currentStatus: status,
      currentWorksId: this.data.list[index].id
    });
  },

  /**
   * 操作作品
   * @param {*} e 
   */
  handleWorks(e) {
    const type = e.currentTarget.dataset.type;
    if (type == 'apply') {
      wx.navigateTo({
        url: `/pages/works/applyCorrecting/applyCorrecting?id=${this.data.currentWorksId}`,
      })
      return;
    }
    if (type == 'edit') { //批改
      wx.navigateTo({
        url: `/pages/works/add/add?type=edit&id=${this.data.currentWorksId}`,
      })
      return;
    }
    if (type == 'del') {
      wx.showModal({
        title: '提示',
        content: '确定删除此作品吗?',
        success: (res) => {
          if (res.confirm) this.delWorks();
        }
      })
      return;
    }
    if (type == 'detail') {
      if (this.data.currentStatus == '4') { //跳转批改后的作品详情,保存批改后的图片
        wx.navigateTo({
          url: `/pages/works/completeWork/completeWork?id=${this.data.currentWorksId}`,
        })
      } else { //跳转作品详情

      }
    }
  },

  /**
   * 删除作品
   */
  async delWorks() {
    const res = await app.http('/public/compositionstudent/delete', 'get', {
      cs_id: this.data.currentWorksId
    });
    app.toast({
      title: '删除成功',
      icon: 'success',
      callback: () => {
        this.data.popover.onHide();
        //遍历出list中删除项索引值
        const index = this.data.list.findIndex(item => item.id == this.data.currentWorksId);
        //从list数组中移除该项
        const data = JSON.parse(JSON.stringify(this.data.list));
        data.splice(index,1);
        this.setData({ list:data });
      }
    });
  },

  /**
   * 图片预览
   */
  handlePreView(e) {
    const url = e.currentTarget.dataset.url;
    if (!url) return;
    wx.previewImage({
      urls: [url]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 获取全部作品列表以及已批改作品列表
   */
  async getList() {
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
    if (this.data.currentTab == '2') request_data.status = 4; //判断currentTab为2,则是请求已批改列表数据
    const res = await app.http('public/compositionstudent/page', 'get', request_data);
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
   * 获取作品列表,以及获取已批改作品列表
   */
  // async getCompleteList() {
  //   const res = await app.http('public/compositionstudent/page', 'get', {
  //     page: this.data.page.page,
  //     pageSize: this.data.page.pageSize,
  //     status: 4
  //   });
  //   this.getData(res.data)
  // },

  /**
   * 获取作品状态文字
   * @param {*} status 
   */
  getWorkStatus(status) {
    switch (status) {
      case 1:
        return '已上传';
      case 2:
        return '待支付';
      case 3:
        return '已支付/待批改';
      case 4:
        return '批改完成';
      case 5:
        return '已申请退款/退款中';
      case 6:
        return '已拒绝退款';
      case 7:
        return '已退款';
    }
  },

  /**
   * 包装数据
   */
  getData(data,page) {
    const arr = [];
    data.list.length && data.list.forEach(item => {
      arr.push({
        id: item.cs_id, //作品id
        uid: item.uid, //作者id
        desc: item.summary, //作品描述
        img: item.pics, //作品图片
        title: item.name, //作品名称
        status: item.status, //作品状态1 已上传 2 待支付 3 已支付/待批改 4批改完成  5 已申请退款/退款中  6.已拒绝退款 7 已退款
        status_text: this.getWorkStatus(item.status),
        time: item.created_time ? app.moment(item.created_time * 1000).format('YYYY-MM-DD HH:mm') : app.moment().format('YYYY-MM-DD HH:mm'), //作品创建时间
      })
    })
    return page == 1 ? arr : [...this.data.list,...arr];
  },

  // 响应popover组件中的子元素点击事件
  onClickA(e) {
    wx.showToast({
      title: '你点击了A',
      icon: 'none'
    });
    // 调用自定义组件 popover 中的 onHide 方法
    this.popover.onHide();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 生命周期函数 onReady 中获取自定义的 popover 组件，根据id获取
    this.setData({
      popover: this.selectComponent('#popover')
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('token')) {
      //添加编辑和支付成功后,刷新页面
      if(wx.getStorageSync('refresh') == '1'){
        this.setData({
          list:[],
          page: {
            page: 1,
            pageSize: 5,
            total: 0,
            last_page: 1,
            completeLoad: false,
          }, //初始化分页数据
        });
        this.getList();
        wx.removeStorageSync('refresh');
        return;
      }
      if(!this.data.isLogin || !this.data.list.length){ //判断为登录后的第一次操作
        this.getList();
        this.setData({isLogin:true});
      }
    } else {
      wx.switchTab({
        url: '/pages/my/index'
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.data.popover.onHide();
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
    if (!this.data.page.completeLoad) this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})