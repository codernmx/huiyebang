const BASE_URL = getApp().globalData.BASE_URL
import Toast from '@vant/weapp/toast/toast';

const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isLogin: false,
        showLogin: false,
        userInfo: {},
        isGetUserInfo: false,
        hasUserInfo: false,
        getUserInfo: {}

    },
    async init() {
        wx.getStorage({
            key: 'token',
            success(res) {
                res = app.http('/public/user/myinfo', 'get');
                if (res.data) {
                    this.setData({
                        'userInfo.balance': res.data.balance,
                        'userInfo.phone': res.data.phone,
                        'userInfo.is_teacher': res.data.is_teacher,
                    })
                }
            },
            fail(err) {

            }
        })


        if (this.data.isLogin) {

        }
    },
    toHomeworkCorrecting() {
        wx.navigateTo({
            url: '/pages/teacher/HomeworkCorrecting/HomeworkCorrecting',
        })
    },
    getUserInfo() {
        wx.getUserProfile({
            desc: '展示用户信息',
            success: res => {
                console.log(res);
                // 直接存储到本地缓存中
                wx.setStorage({
                    key: 'getUserInfo',
                    data: res.userInfo
                })
                //直接设置到data
                this.setData({
                    getUserInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    },
    getPhoneNumber(e) {
        const _this = this
        // console.log(e)
        const iv = e.detail.iv
        const encrypted_data = e.detail.encryptedData
        const nickName = this.data.getUserInfo.nickName
        const avatarUrl = this.data.getUserInfo.avatarUrl
        //登录
        wx.login({
            success(res) {
                const url = BASE_URL + 'user/loginByWeappCode'
                if (res.code) {
                    //发起网络请求
                    // console.log(res)
                    wx.request({
                        url,
                        method: 'POST',
                        data: {
                            code: res.code,
                            iv,
                            encrypted_data,
                            nickName,
                            avatarUrl
                        },
                        success(res) {
                            const token = res.data.data.token
                            const user = res.data.data.user
                            if (res.data.data.token) {
                                wx.setStorageSync('token', token)
                                wx.setStorageSync('user', user)
                                _this.setData({
                                    showLogin: false,
                                    isLogin: true, //登录
                                    userInfo: user
                                })
                            } else {
                                Toast('登陆失败');
                            }
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    },
    toPayment(e) {
        const moblie = this.data.userInfo.phone
        const balance = this.data.userInfo.balance
        wx.navigateTo({
            url: '/pages/paymentDetail/index?mobile=' + moblie + '&balance=' + balance,
        })
    },
    toTeacherList(e) {
        const phone = this.data.userInfo.phone
        wx.navigateTo({
            url: '/pages/teacherWorksList/index?phone=' + phone,
        })
    },
    // 授权登录
    showLogin() {
        this.setData({
            showLogin: true
        })
        wx.hideTabBar()
    },
    onClose() {
        this.setData({
            showLogin: false
        })
        wx.showTabBar()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const _this = this
        wx.getStorage({
            key: 'token',
            success(res) {
                console.log(res.data)
                _this.setData({
                    isLogin: true
                })
            },
            fail(err) {
                console.log(err)
                _this.setData({
                    showLogin: true
                })
            }
        })
        wx.getStorage({
            key: 'user',
            success(res) {
                console.log(res.data)
                _this.setData({
                    userInfo: res.data
                })
            },
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
        this.init()
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