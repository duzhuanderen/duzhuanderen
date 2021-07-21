var common = require('../../utils/common.js')
const db = wx.cloud.database()
const videos = db.collection('videos')
var row=20
var page = 0 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  //详情页面跳转
  goToDetail: function (e) {
    common.goToDetail(e.currentTarget.dataset.id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    videos.get({
      success: res => {
        this.setData({ videosList: res.data })
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
    videos.limit(row).get({
      success: res => {
        this.setData({ newsList: res.data })
      }
    })
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
    page++
    videos.skip(row * page).limit(row).get({
      success: res => {
        let old_data = this.data.newsList
        let new_data = res.data
        this.setData({
          videosList: old_data.cantant(new_data)
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})