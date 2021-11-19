// pages/works/add/add.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 44, //导航栏高度,
    paddingTop: 20, //导航栏上内边距对应状态栏高度
    isfixed: false, //顶部是否浮动
    formData:{
      title:'',
      desc:''
    },
    fileList:[],
    submitType:'add', //提交表单的类型(添加或编辑)
    id:'', //编辑作品时的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.navBarHeight();
    if(!!options.type && !!options.id && options.type == 'edit'){ //判断为编辑时,获取学生作品详情
       this.setData({ submitType:'edit',id:options.id });
       this.getDetail(options.id);
    }
  },

  //编辑学习作品时获取作品详情
  async getDetail(id){
    const res = await app.http('/public/compositionstudent/find','get',{cs_id:id});
    this.setData({
      formData:{
        title:res.data.name,
        desc:res.data.summary
      },
      fileList:[{ deletable:true,url:res.data.pics }]
    })
  },

  //导航栏高度自适应
  navBarHeight() {
    //导航栏自适应
    let systemInfo = wx.getSystemInfoSync();
    let reg = /ios/i;
    let pt = 20; //导航状态栏上内边距
    let h = 44; //导航状态栏高度
    if (reg.test(systemInfo.system)) {
      pt = systemInfo.statusBarHeight;
      h = 44;
    } else {
      pt = systemInfo.statusBarHeight;
      h = 48;
    }
    this.setData({
      height: h,
      paddingTop: pt
    })
  },

  //监听页面滚动,页面标题浮动在顶部
  onPageScroll(e) {
    let isfixed = false;
    if (parseInt(e.scrollTop) >= this.data.height) isfixed = true
    else isfixed = false;
    this.setData({
      isfixed
    });
  },
  
  //图片上传前校验
  beforeRead(event) {
     app.beforeRead(event);
  },
  //图片上传
  afterRead(event) {
     app.afterRead(event,this);
  },

  //提交表单
  async submit(){
    const { title,desc } = this.data.formData; 
    if(!title){
      app.toast({title:'请输入标题'});
      return;
    }
    if(!desc){
      app.toast({title:'请输入说明'});
      return;
    }
    if(!this.data.fileList.length){
      app.toast({title:'请上传图片'});
      return;
    }
    const data = {
      name:title,
      summary:desc,
      pics:this.data.fileList[0].url
    };
    if(this.data.submitType == 'add'){
      await app.http('/public/composition/stuadd','post',data);
      app.toast({ title:'添加成功',icon:'success',callback:()=>{
        //保存页面刷新标记
        wx.setStorageSync('refresh', 1)
        wx.switchTab({
          url: '/pages/works/index',
        })
      } })
      return;
    }
    if(this.data.submitType == 'edit'){
      await app.http('/public/composition/stuupdate','post',{...data,cs_id:+this.data.id});
      app.toast({ title:'保存成功',icon:'success',callback:()=>{
        //保存页面刷新标记
        wx.setStorageSync('refresh', 1)
        wx.switchTab({
          url: '/pages/works/index',
        })
      } })
      return;
    }
  },

  //删除图片
  deleteImg(){
    this.setData({ fileList:[] })
  },
  //返回页面
  back(){
    wx.switchTab({
      url: '/pages/works/index',
    });
  },

  //获取输入值
  onInputChange(e){
    const type = e.currentTarget.dataset.type;
    if(type == 'title'){
      this.setData({ 'formData.title':e.detail.trim() });
      return;
    }
    if(type == 'desc'){
      this.setData({ 'formData.desc':e.detail.trim() });
      return;
    }
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