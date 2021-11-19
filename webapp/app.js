// app.js
App({
  util: require('./utils/util.js'),
  moment: require('moment'),
  onLaunch() {
    // 小程序主动更新
    this.updateManager();
  },

  //数据请求
  http(url, method = 'get', data = {}, loading) {
    //加载中默认配置
    const loading_config = {
      show: true,
      title: '加载中...',
      ...loading
    }
    if (loading_config.show) wx.showLoading({
      title: loading_config.title,
      mask: true
    }); //加载中
    return new Promise((resolve, reject) => {
      wx.request({
        header: {
          Authorization: wx.getStorageSync('token')
        },
        url: this.globalData.BASE_URL + url,
        method,
        data,
        success: (res) => {
          if (loading_config.show) wx.hideLoading(); //隐藏加载
          if (res.statusCode == 200) {
            const {
              status,
              msg
            } = res.data;
            const data = res.data;
            if (status == 0) {
              resolve(data);
            } else if (status == 40005) { //登录过期
              wx.clearStorageSync(); //清除所有登录信息
              wx.showModal({
                title: '提示',
                content: msg,
                confirmText: '立即登录',
                cancelText: '暂不登录',
                success(res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '/pages/my/index'
                    })
                  } else if (res.cancel) {
                    wx.switchTab({
                      url: '/pages/index/index'
                    })
                  }
                }
              })
            } else {
              this.toast({
                title: msg,
                icon: 'error'
              });
            }
          } else {
            this.toast({
              title: '接口错误，请稍后重试',
              icon: 'none'
            });
          }
        }
      })
    })
  },

  //发起微信支付
  wxPayment(option) {
    let options = Object.assign({
      payment: {},
      success: () => {},
      fail: () => {},
      complete: () => {},
    }, option);
    console.log(options)
    wx.requestPayment({
      timeStamp: options.payment.timeStamp,
      nonceStr: options.payment.nonceStr,
      package: options.payment.package,
      signType: options.payment.signType,
      paySign: options.payment.paySign,
      success(res) {
        options.success(res);
      },
      fail(res) {
        options.fail(res);
      },
      complete(res) {
        options.complete(res);
      }
    });
  },

  //图片上传前校验
  beforeRead(event) {
    const {
      file,
      callback
    } = event.detail;
    console.log(file);
    callback(file.type === 'image' && file.size <= 2097152);
    if (file.size > 2097152) {
      wx.showToast({
        title: '图片限制为2M',
        icon: 'none',
        mask: true
      });
    }
  },

  //图片上传
  afterRead(event, t) {
    const {
      file
    } = event.detail;
    const url = 'https://bang.huiyezhiguan.com';
    console.log(file);
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: `${url}/api/public/upload`, // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      success: (res) => {
        // 上传完成需要更新 fileList
        const {
          fileList = []
        } = t.data;
        fileList.push({
          ...file,
          url: url + JSON.parse(res.data).data.url,
          deletable: true
        });
        t.setData({
          fileList
        });
      },
    });
  },

  //toast
  toast(obj) {
    wx.showToast({
      title: obj.title,
      mask: true,
      icon: obj.icon || 'none',
      duration: obj.duration || 1500,
      image: obj.image || '',
      success: () => {
        setTimeout(() => {
          obj.callback && obj.callback();
        }, obj.duration || 1500);
      }
    })
  },


  /**
   * 判断是否登录过
   */
  isLogin() {
    const token = wx.getStorageSync('token');
    if (!token) { //未登录
      wx.navigateTo({
        url: '/pages/login/login'
      });
      return false;
    }
    return true;
  },

  /**
   * 小程序主动更新
   */
  updateManager() {
    if (!wx.canIUse('getUpdateManager')) {
      return false;
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，即将重启应用',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      });
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    });
  },

  globalData: {
    userInfo: null,
    BASE_URL: 'https://bang.huiyezhiguan.com/api/'
  }
})