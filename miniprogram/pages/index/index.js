var common = require('../../utils/common.js')
const db=wx.cloud.database()
const news=db.collection('news')
const row=5
var page=0 
Page({
  /**
   * 页面的初始数据
   */
  data: {
 
  },
  goToDetail:function(e){
   common.goToDetail(e.currentTarget.dataset.id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    news.limit(row).get({
      success:res=>{
        this.setData({newsList:res.data})
      }
    })
  },
  /**
   *页面下拉触底事件的处理函数
   * */
   onReachBottom:function(){
     page++
     news.skip(row*page).limit(row).get({
       success:res=>{
         let old_data=this.data.newsList
         let new_data=res.data
         yhis.setData({
           newsList:old_data.cantant(new_data)
         }) 
       }
     })
   },
})