import Toast from '@vant/weapp/toast/toast';
const app = getApp();
const BASE_URL = app.globalData.BASE_URL

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    height: 44, //导航栏高度,
    paddingTop: 40, //导航栏上内边距对应状态栏高度
    list: [],
    showDialog: false,
    withdrawalValue: '',
    cash_account: '',
    remark: '',
    page: {
      page: 1,
      pageSize: 5,
      total: 0,
      last_page: 1, //最后一页的页码
      completeLoad: false, //是否加载完成
    } //分页操作
  },
  getData(data, page) {
    const arr = [];
    data.list.length && data.list.forEach(item => {
      arr.push({
        money: item.money, //
        reason: item.reason, //
        pics: item.pics, //
        name: item.name, //
        created_time_f: item.created_time_f, //
        avatar: item.avatar,
      })
    })
    return page == 1 ? arr : [...this.data.list, ...arr];
  },
  back() {
    console.log('back')
    wx.navigateBack({
      delta: 1, // 返回上一级页面。
      success: function () {
        console.log('成功！')
      }
    })
  },
  async getList() {
    // console.log(this.data.page)
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
    const res = await app.http('public/logbalance/page', 'get', request_data);
    // console.log('res',res);
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
        list: this.getData(res.data, page)
      });
    } else {
      this.setData({
        'page.completeLoad': page + 1 > last_page,
        list: this.getData(res.data, page)
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
   * 生命周期函数--监听页面加载
   */
  withdrawal() {
    this.setData({
      showDialog: true
    })
  },
  withdrawalConfirm() {
    let _this = this
    const balance = this.data.info.balance
    const value = this.data.withdrawalValue
    console.log(value, balance)
    if (value > balance) {
      Toast('输入金额大于可提现金额！');
    } else {
      if (_this.data.cash_account && _this.data.remark) {
        wx.getStorage({
          key: 'token',
          success(res) {
            console.log(res.data)
            const url = BASE_URL + 'public/applycash/add'
            wx.request({
              url,
              method: 'POST',
              header: {
                'Authorization': res.data // 默认值
              },
              data: {
                money: value,
                cash_account: _this.data.cash_account,
                remark: _this.data.remark,
              },
              success(res) {
                _this.refresh()
                if (res.data.status == 0){
                  var info = _this.data.info
                  info.balance = info.balance-value
                  _this.setData({
                    info: info
                  })
                }
                Toast(res.data.msg);
              }
            })
          }
        })
      } else {
        Toast('请输入所有信息');
      }
    }
  },
  onClose() {
    this.setData({
      showDialog: false
    })
  },
  onLoad: function (options) {
    this.getList()
    console.log(options, 'op')
    this.setData({
      info: options
    })



  },
  refresh: function(){
        const _this = this
    wx.getStorage({
      key: 'token',
      success(res) {
        const url = BASE_URL + 'public/logbalance/page'
        wx.request({
          url,
          method: 'GET',
          header: {
            'Authorization': res.data // 默认值
          },
          data: {
            pageSize: 10,
            page: 1,
          },
          success(res) {
            console.log(res, '-----------')
            _this.setData({
              list: res.data.data.list
            })
          }
        })
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
    this.getList()
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