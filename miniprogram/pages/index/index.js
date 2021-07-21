var common = require('../../utils/common.js')
const db=wx.cloud.database()
const videos=db.collection('videos')
var row=6
var page=0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videosList:[]
  },
  
  //详情页面跳转
  goToDetail: function (e) {
    common.goToDetail(e.currentTarget.dataset.id)
  },
  //总页跳转
  goToAllList:function (options){
    common.goToAllList()
  },
  //取消搜索
  onCancel:function(e){
    //获取列表
    this.setData({
      searchlist: ''
    })
  },
  /**
   * 自定义函数--搜索关键词
   */
  onSearch: function (e) {
    //获取关键词
    let word = e.detail
    //使用正则模糊查询 
    videos.where({
      title:db.RegExp({
        regexp:word,
        options:"i"
      })
    }).orderBy('date','asc').get({
      success: res => {
        this.setData({ 
          searchlist: res.data
        })
      },
      fail:res=>{
        wx.showToast({
          title: '不存在',
          icon:"none"
        })
      }
    })
  }, 
  /**
  * 获取视频列表
  */
  getVideosList: function () {
    videos.get({
      success: res => {
        searchlist: res.data
      }
    })
  },

 onShow:function(){

 },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    videos.limit(row).get({
      success:res=>{
        this.setData({videosList:res.data})
      }
    })
  },
  /**
   *页面下拉触底事件的处理函数
   * */
   onReachBottom:function(){
     page++
     videos.skip(row*page).limit(row).get({
       success:res=>{
         let old_data=this.data.videosList
         
         let new_data=res.data
        
         this.setData({
           videosList:old_data.cantant(new_data)
         }
         ) 
       
       }
     })
   },
   /**
    * 下拉刷新
    */
   onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    page++
    videos.skip(row*page).limit(row).get({
      success:res=>{
        if(res.data!=""){
        this.setData({
          videosList:res.data
        }) 
      }else{
  
        page=0
        this.onLoad()
      }
    }
    })
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000);
  },
})