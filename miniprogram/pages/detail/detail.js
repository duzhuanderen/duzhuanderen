// pages/detail/detail.js
var common=require('../../utils/common.js')
Page({
  addFavorites:function(){
    let article=this.data.article;
    wx.setStorageSync(article._id, article);
    this.setData({isAdd:true});
  },
  cancelFavorites:function(){
    let article=this.data.article;
    wx.removeStorageSync(article._id);
    this.setData({isAdd:false});
  },
  /**
   * 页面的初始数据
   */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示loading提示框
    wx.showLoading({
      title: '数据加载中'
    })
    //获取编号
    let id=options.id
    //根据ID查找是否在收藏夹中
    let article=wx.getStorageSync(id)
    //在收藏夹中
    if(article!=''){
      //更新页面信息和状态
      this.setData({
        article:article,
        isAdd:true
      })
      //隐藏提示框
      wx.hideLoading()
    }
    //不在收藏夹
    else{
      //根据ID在云数据集中查找内容
      news.doc(id).get({
        success:res=>{
          //更新信息状态
          this.setData({
            article:res.data,
            isAdd:false
          })
          //隐藏loading提示框
          wx.hideLoading()
        }
      })
    }
  }
})