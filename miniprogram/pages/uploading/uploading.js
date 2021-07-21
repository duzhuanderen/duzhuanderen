// pages/uploading/uploading.js
var app=getApp()
const db=wx.cloud.database()
const videos=db.collection('videos')
var common=require('../../utils/common.js')
let comment=[]
//格式化当前日期
function formatDate(){
  var now=new Date()
  var year=now.getFullYear()
  var month=now.getMonth()+1
  var day=now.getDate()
  if(month<10)month='0'+month
  if(day<10)day='0'+day
  return year+'-'+month+'-'+day
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
   
    title:'',
    keyword:[],
    introduction:'',
    imgs:[],
    videos:[]
  },
  title_input:function(e){
    let that=this
    that.setData({
      title:e.detail.value
    })
  },
  keyword_input: function (e) {
    let that = this
    let keys=e.detail.value
    let keyss=keys.split(',')
    that.setData({
      keyword: keyss
    })
  },
  introduction_input: function (e) {
    let that = this
    that.setData({
      introduction: e.detail.value
    })
  },

  /**
   * 上传视频
   */
  chooseVideo:function(){
    let that=this
    //选择视频文件
    wx.chooseVideo({
      sourceType:['album','camera'],
      camera:'back',
      success:function(res){
        wx.showLoading({
          title: '添加视频中',
          icon:"none"
        })
        //获取文件临时地址
        const filePath=res.tempFilePath
        //自定义云端文件名称
        const cloudPath='video/'+Math.floor(Math.random()*1000000)+filePath.match(/.[^.]+?$/)[0]
        //上传到云存储
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success:res=>{
            wx.showLoading({
              title: '添加成功',
              icon:"none"
            })
            that.setData({
              videos:that.data.videos.concat(res.fileID)
            })
          },
          fail:e=>{
            console.error(e)
          },
          complete: e => {
            //关闭提示框
            wx.hideLoading()
          }
        })
      },
      fail:e=>{
          console.error(e)
      },
      complete:e=>{
        //关闭提示框
        wx.hideLoading()
      }
    })
  },
  //选择图片
  chooseImg: function () {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        const tempFilePaths = res.tempFilePaths[0]
        const cloudPath = 'imgs/' + Math.floor(Math.random() * 1000000) + tempFilePaths.match(/.[^.]+?$/)[0]
        const filePath=tempFilePaths
        wx.cloud.uploadFile({
          filePath,
          cloudPath,
          success:res=>{
            that.setData({
              imgs:that.data.imgs.concat(res.fileID)
            })
          },
          fail:res=>{

          }
        })
        
      }
    })
  },
  /**
   * 删除所选图片视频
   */
  deleteImg:function(e){
    let that=this
    var id=e.currentTarget.dataset.id;
    var img=that.data.imgs;
    img.splice(id,1)
    that.setData({
      img:img
    })
    wx.cloud.deleteFile({
      fileList:[e.currentTarget.dataset.src],
      success:res=>{
        this.setData({
          imgs:this.data.imgs
        })
      },
      fail:err=>{
        console.log('err')
      }
    })
  },
  deleteVideo: function (e) {
    let that = this
    var id = e.currentTarget.dataset.id;
    var video = that.data.videos;
    video.splice(id, 1)
    that.setData({
      video: video
    })
    wx.cloud.deleteFile({
      fileList: [e.currentTarget.dataset.src],
      success: res => {
        this.setData({
          videos:this.data.videos
        })
      },
      fail: err => {
        console.log('err')
      }
    })
  },
/**
 * 上传
 */
submit:function(e){
   let that=this
   //判断条件
  if (e.detail.title!== '' && e.detail.keyword!== '' && e.detail.introduction!== ''&&that.data.imgs.length!==0&&that.data.videos.length!==0 ){
    //获取个人信息
    let userinfo=app.globalData.userInfo
    //获取当前日期
    let today = formatDate()
    //向云数据集添加数据
    videos.add({
      data:{
        zan:0,
        shuliang:0,
        comment:'',
        province:userinfo.province,
        country:userinfo.country,
        nickName:userinfo.nickName,
        avatarUrl:userinfo.avatarUrl,
        date:today,
        title: that.data.title,
        keyword: that.data.keyword,
        introduction: that.data.introduction,
        videourl:that.data.videos,
        imgurl:that.data.imgs
      },success:function(res){
        wx.showToast({
          title: '上传成功',
        })
        wx.redirectTo({
          url: '../uploading/uploading',
        })
      }
    })
  }else{
    wx.showToast({
      title: '你还有未填信息',
      icon:"none"
    })
  }
},
/**
 * 下拉刷新
 */
onPullDownRefresh:function(){
  let that=this
  wx.redirectTo({
    url: '../uploading/uploading',
  })
},
/**
 * 获取记录
 *
getHistoryVideos:function(){
  //获取用户openid
  let openid=app.globalData.openid
  //查钊上传记录
  videos.where({
    _openid:openid
  }).get({
    success:res=>{
      this.setData({historyVideos:res.data})
    }
  })
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