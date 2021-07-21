// pages/login/login.js
var common=require('../../utils/common.js')
import WxValidate from '../../plugin/wx-validate.js'
var app=getApp()
Page({
 // 初始化表单校验
 initValidate(){
  // 创建实例对象
  this.validate = new WxValidate({
    name:{
      required: true,
      maxlength: 6
    },
      account: {
          required: true,
          maxlength: 9
      },
      password: {
        required: true
      },
      passwordAgain: {
        required: true,
        equalTo: "password"
      },
      telnumber: {
        required: true,
        tel:true
      }
  }, {
    name:{
      required: "请输入昵称",
      maxlength: "昵称最长为6位"
    },
    account: {
      required: '请输入账号!',
      maxlength: '名称不得超过9字!'
    },
    password: {
      required: '请输入密码!',
    },
    passwordAgain: {
      required: '请再次输入密码!',
      equalTo: "两次输入密码不一致"
    },
    telnumber: {
      required: '请输入手机号!',
      tel : '手机号格式不对!'
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
  getPassword(e){
  },
  // 注册
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
        name:e.detail.value.name,
        password:e.detail.value.password
      }).get({
        success: res => {
            if(res.data.length==1){  //登录账号密码
                wx.showToast({
                  title: '账户已存在！',
                })
            }else{
              wx.cloud.callFunction({
                name:"addAdmin",
                data:{
                  action:"addAdmin",
                  name:e.detail.value.name,
                  account:e.detail.value.account,
                  password:e.detail.value.password,
                  telNumber:e.detail.value.telnumber
                }
              }).then(res=>{
                wx.showToast({
                  title: '注册成功',
                })
                setTimeout(function(){
                  common.goToLogin()
                },1500)

              }).catch(res=>{
                wx.showToast({
                  title: '注册失败',
                })
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