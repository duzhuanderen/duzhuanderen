// pages/forGet/forGet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFind:false,
    getPassword:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  formSubmit(e){
    wx.cloud.database().collection("admin").where({
      account:e.detail.value.account,
      telNumber:e.detail.value.telNumber
    }).get({
      success: res => {
          if(res.data.length==1){  //登录账号密码
              this.setData({
                isFind:true,
                getPassword:res.data[0].password
              })
          }else{
            wx.showToast({
              title: '此账号/手机号不存在',
              icon:"none"
            })
          }
      },
      fail:res=>{
        console.log(res)
      }
    })
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