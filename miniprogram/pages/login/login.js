// pages/login/login.js
var common=require('../../utils/common.js')
import WxValidate from '../../plugin/wx-validate.js'
var app=getApp()
Page({
 // 初始化表单校验
 initValidate(){
  // 创建实例对象
  this.validate = new WxValidate({
      account: {
          required: true,
          maxlength: 9
      },
      password: {
        required: true
      }
  }, {
    account: {
      required: '请输入账户名称!',
      maxlength: '名称不得超过9字!'

    },
    password: {
      required: '请输入密码!',
    }
  })
},

  /**
   * 页面的初始数据
   */
  data: {
      avatar:"",//微信头像
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initValidate()
  },
    //获取个人信息
  getMyInfo:function(e){
    let info=e.detail.userInfo;
    app.globalData.userInfo = e.detail.userInfo
    // 检测是否已获得用户openid信息
    if (app.globalData.openid==null) {
      wx.cloud.callFunction({
        name: 'getOpenid',
        complete: res => {
         app.weiChart.loginAccount= res.result.openid
        }
      })
    }
    this.setData({
      avatar:info.avatarUrl,
      isLogin:true,
      nickName:info.nickName
    })
    app.weiChart.isLogin=this.data.isLogin  //是否微信登录
    app.weiChart.loginName=info.nickName  //微信名
    app.weiChart.loginAvatar=info.avatarUrl  //微信头像
    app.weiChart.loginAccount=app.globalData.openid  //微信ID

    wx.showToast({
      title: '微信登录成功...',
    })
    setTimeout(function(){
      common.goToMy()
    },1500)
  },

  onClick(e){
    console.log(e)
  },
  // 登录
  formSubmit(e){
     // 校验表单
     if (!this.validate.checkForm(e.detail.value)){
      const error = this.validate.errorList[0];
      wx.showToast({
          title: `${error.msg} `,
          icon: 'none'
      })
      return false
    }else{
      wx.cloud.database().collection("admin").where({
        account:e.detail.value.account,
        password:e.detail.value.password
      }).get({
        success: res => {
            if(res.data.length==1){  //登录账号密码
                app.account.isLogin=true
                app.account.loginAccount=res.data[0].account,
                app.account.loginAvatar=res.data[0].avatar,
                app.account.loginName=res.data[0].name
                wx.showToast({
                  title: '登陆成功。。',
                })
                setTimeout(function(){
                  common.goToMy()
                },1500)
            }else{
              wx.showToast({
                title: '输入的账号/密码不正确',
                icon:"none"
              })
            }
        },
        fail:res=>{
          console.log(res)
        }
      })
    }
  // 保存操作...
  },
  // 注册
  gotoRegister(){
    common.goToRegister()
  },
  //忘记密码
  gotoForget(){
    common.gotoForget()
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