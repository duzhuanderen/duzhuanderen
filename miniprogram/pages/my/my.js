// pages/my/my.js
var common=require('../../utils/common.js')
const db=wx.cloud.database()
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
   num:0,
   isLogin:false,
   isExist:false
  },

  //登录
  login:function(e){
    common.goToLogin()
},
  //上传也跳转
  goToUploading: function (options) {
    if(this.data.isLogin){
      wx.navigateTo({
        url: '../uploading/uploading',
      })
    }else{
      wx.showToast({
        title: '请登录',
        icon:'none'
      })
    }
  },
  // 更多
  goMore(){
    if(this.data.isLogin){
      common.goToFavMore(app.globalData.loginName)
    }else{
      wx.showToast({
        title: '请先登录',
        icon:"none"
      })
    }
  },
  // 意见反馈
  feedback(){
    if(this.data.isLogin){
       common.goToFeedBack()

    }else{
      wx.showToast({
        title: '请先登录',
        icon:"none"
      })
    }
  },
  // 设置
  set(){

  },
  //退出登录
  loginOut(){
    let that=this
    if(app.globalData.isLogin){
      wx.showModal({
        title: '提示',
        content: '确定退出登录吗？',
        success (res) {
          if (res.confirm) {
            app.globalData.isLogin=false
            // for(let i in app.globalData){
            //   app.globalData[i]=""
            // }
            that.setData({
              isLogin:app.globalData.isLogin,
              src:"",
              nickName:""
            })
            that.getMyFavorites()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '你还没有登录，是否登录？',
        success (res) {
          if (res.confirm) {
            common.goToLogin()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
   
  },
//收藏列表
getMyFavorites:function(){
  db.collection("users").where({
    username:this.data.nickName
  }).get({
    success: res => {
      this.setData({
        shoucang: res.data
      })
      let info= res.data
      let num = info.length; //收藏的总数
      let myList = [];
      for (var i = 0; i < num; i++) {
        let obj0 = info[i]
        let obj=obj0.shoucang
        myList.push(obj)
      }
      this.setData({
        myList: myList,
        num: num,
        isExist:true
      })
     
    }
  })
},
//路由跳转
goToDetail:function(e){
  common.goToDetail(e.currentTarget.dataset.id)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //更新列表
     if(app.globalData.isLogin==false){
      if(app.weiChart.isLogin){
        app.globalData.isLogin=app.weiChart.isLogin
        app.globalData.loginAccount=app.weiChart.loginAccount
        app.globalData.loginAvatar=app.weiChart.loginAvatar
        app.globalData.loginName=app.weiChart.loginName
      }else if(app.account.isLogin){
        app.globalData.isLogin=app.account.isLogin
        app.globalData.loginAccount=app.account.loginAccount
        app.globalData.loginAvatar=app.account.loginAvatar
        app.globalData.loginName=app.account.loginName
        app.globalData.userInfo={
          nickName:app.account.loginName,
          avatarUrl:app.account.loginAvatar
        }
      }
    }
    if(app.globalData.isLogin){
      this.setData({
        isLogin:app.globalData.isLogin,
        src:app.globalData.loginAvatar,
        nickName:app.globalData.loginName
      })
    this.getMyFavorites();
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
  onHide:function () {

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
    let that=this
    return {
      title: '分享给你我的收藏影视'
     
    }
  }
})