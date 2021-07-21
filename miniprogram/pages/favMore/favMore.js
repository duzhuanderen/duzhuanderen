// pages/favMore/favMore.js
var common=require('../../utils/common.js')
const db=wx.cloud.database()
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("users").where({
      username:options.loginName
    }).get({
      success: res => {
        this.setData({
          videosList: res.data
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
  goToDetail(e){
    common.goToDetail(e.currentTarget.dataset.id)
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