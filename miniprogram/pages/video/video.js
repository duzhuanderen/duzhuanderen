//生成随机颜色
var common=require('../../utils/common.js')
const db = wx.cloud.database()
const videos = db.collection('videos')
const users=db.collection('users')
const _=db.command
var row = 5
var app=getApp()
let ID=''
//随机生成弹幕颜色
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color=Math.floor(Math.random()*256).toString(16)
    color =color.length==1?'0'+color:color
    rgb.push(color)
  }
  return '#'+rgb.join('')
}
Page({
  /**
   * 页面的初始数据
   */

  data:{
    sameId:"", //视频id
    zan:'',//赞
    shuliang:'',//浏览量
    collect:[],//视频数组
    pinglun:[],//评论数组
    shoucang:[],//收藏
    isCollect:false,
    article:'',
    isF: true,
    content:'',
    danmuTxt: '', 
    dianzanurl: '../../images/meizan.png',
    yizanurl: '../../images/yizan.png',
    isAdd:"",
    nickName:'',
    dianzan:false,
    danmuList:[],
  },
   /**
    * 获取弹幕
    */
  getDanmu:function(e){
    let that=this
    that.setData({
     danmuTxt:e.detail.value
    })
  }, 
  /**
   * 发送弹幕
   */
  sendDanmu:function(){
    let that=this
    let isLogin = app.globalData.isLogin

    if(isLogin){
      that.videoCtx.sendDanmu({
        text:that.data.danmuTxt,
        color:getRandomColor()
      })
      let userinfo = app.globalData.userInfo
      let nickName =userinfo.nickName
      let avatarUrl=userinfo.avatarUrl
      let pinglunItem={}
    pinglunItem.name=nickName
    pinglunItem.content=that.data.danmuTxt
    pinglunItem.avatarUrl=avatarUrl
    let pinglunArr=that.data.pinglun
    pinglunArr.push(pinglunItem)
    wx.cloud.callFunction({
      name:"caozuo",
      data:{
        action:"sendComment",
        id:ID,
        pinglun: pinglunArr
      }
    }).then(res=>{
      this.setData({
        pinglun:pinglunArr,
        content:""
      })
      wx.hideLoading()
    }).catch(res=>{
      console.log("发表失败",res)
    })
  }else{
    wx.showToast({
      title: '请先登录',
      icon: 'none',
    })
  }
},
  alertInfo(e){
console.log(e)

  },
  //监听滑块
  bindchange(e) {
    let index = e.detail.current;
    this.setData({
      navState: index
    })
  },
  //点击导航
  navSwitch: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      navState: index
    })
  },
  /**
   * 折叠
   */
  zhedie: function () {
    this.setData({
      isF: !this.data.isF
    })
  },
  /**
   * 获取视频列表
   */
  collect:function(e){
    let that=this
    db.collection("videos").where({
      keyword:e
    }).get({
      success:function(res){
        let arr=res.data
        if(res.data.length==1){
          that.setData({
            collect:arr,
            isCollect:false
          })
        }else{
          for(let i=0;i<arr.length;i++){
            if(arr[i]._id==that.sameId){
                arr.splice(i,1)
            }
          }
          that.setData({
            collect:arr,
            isCollect:true
          })
        }
      },
      fail:function(res){
        console.log('失败',res)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取编号
    ID = options.id
    this.sameId=ID
    //根据ID查找是否在收藏夹中    
    let isLogin = app.globalData.isLogin
    //查询videos数据
    wx.cloud.database().collection("videos").doc(ID).get().then(res => {
      let arr=[]  //弹幕
      if(res.data.pinglun){
        for(let i=0;i<res.data.pinglun.length;i++){
          arr.push({
            text:res.data.pinglun[i].content,
             color:getRandomColor(),
             time:i+1
          })
         }
      }
      
      this.setData({
        keyword:res.data.keyword,
        danmuList:arr, //弹幕列表
        pinglun: res.data.pinglun, //评论
        zan: res.data.zan, //点赞数
        shuliang: res.data.shuliang, //收藏数量
        article: res.data    
      })
      let keyword = res.data.keyword
      this.collect(keyword)
      let shuliang = res.data.shuliang
      this.getShuliang(shuliang)
      //已登录
      if(isLogin) { 
        //根据ID在云数据集中查找内容
        console.log(app.globalData)
        let userinfo = app.globalData.userInfo
        let nickName = userinfo.nickName
        db.collection("usersZan").where({  //点赞状态
          username:nickName,
          biao: ID
        }).get({
          success:res=>{
            if(res.data!=''){
            //更新信息状态
              this.setData({
                dianzan:true
              })
            }else{
              this.setData({
                dianzan:false
              })
            }
          },fail:res=>{ 
            this.setData({
              isAdd: false
            }) 
            console.log("失败",res)
            }
        })
        db.collection("users").where({  //收藏状态
          username:nickName,
          biao: ID
        }).get({
          success:res=>{
            if(res.data!=''){
            //更新信息状态
              this.setData({
                isAdd:true,
              })
            }else{
              this.setData({
                isAdd:false,
              })
            }
          },fail:res=>{ 
            this.setData({
              isAdd: false
            }) 
            console.log("失败",res)
            }
        })
      } else{
        //更新页面信息和状态
        this.setData({
          isAdd: false
        })
      }

    })

    videos.limit(row).get({
      success: res => {
        this.setData({ videosList: res.data })
      }
    })
    this.videoCtx = wx.createVideoContext('myVideo')
   
  },
  /**
  * 浏览量
  */
  getShuliang: function (e) {
    let shuliang = Number(e)
    shuliang++

    wx.cloud.callFunction({
      name: "caozuo",
      data: {
        action: "shuliang",
        id: ID,
        shuliang: shuliang
      }
    }).then(res => {
      this.setData({
        shuliang: shuliang
      })
    
    }).catch(res => {

    })
  },
  /**
   * 点赞
   */
  zan: function (e) {
    let that=this
    let isLogin = app.globalData.isLogin
    if (isLogin) {
      wx.cloud.database().collection("videos").doc(ID).get().then(res => {
        let zan = res.data.zan
          if(that.data.dianzan){
            zan--
            that.setData({
              zan:zan,
            })
          }else{
            zan+=1
            that.setData({
              zan:zan,
            })
          }
        //点赞数量
        wx.cloud.callFunction({
          name: "caozuo",
          data: {
            action: "dianzan",
            id: ID,
            zan:that.data.zan,
          }
        }).then(res => {
          // that.setData({
          //   zan:that.data.zan,
          // })
          console.log("点赞成功", res)
        }).catch(res => {
          console.log("点赞失败", res)
        })
      })

        //是否点赞
        let userinfo=app.globalData.userInfo
        let article = that.data.article;
        let biao=article._id
        let nickname=userinfo.nickName
        // 取消赞
        if(that.data.dianzan){
          wx.cloud.callFunction({
            name:"caozuo",
            data:{
              action:"noZan",
              username:nickname,
              biao:biao
            }
          }).then(res=>{
            that.setData({
              dianzan:false
            })
          }).catch(res=>{
            console.log("失败",res)
          })

        }else{                              //点赞
          wx.cloud.callFunction({
            name: "caozuo",
            data: {
              action: "isZan",
              dianzan:that.data.dianzan,
              zanArticle:article,
              username:nickname,
              biao:article._id
            }
          }).then(res => {
            that.setData({
              dianzan:true
            })
          }).catch(res => {
            console.log("点赞失败", res)
          })
        }
    }else{
      wx.showToast({
        title: '请先登录',
        icon:"none"
      })
    }
  },
  /**
   * 视频
   */
  playVideo: function (e) {
    let that=this
    that.videoCtx.stop()
    that.setData({
      src: e.currentTarget.dataset.url
    })
    that.videoCtx.play()
  },

  /**
   * 收藏
   */
  addFavorites: function () {
    let isLogin = app.globalData.isLogin
    if(isLogin){
    let article = this.data.article;
    let userinfo=app.globalData.userInfo
    let nickname=userinfo.nickName
  
    wx.cloud.callFunction({
      name: "caozuo",
      data: {
        action: "shoucang",
        shoucang:article,
        username:nickname,
        isAdd:true,
        biao:article._id
      }
    }).then(res => {
      this.setData({
        isAdd:true
      })
    }).catch(res => {
      console.log("收藏失败", res)
    })
    }else{
      wx.showToast({
        title: '请先登录',
        icon:"none"
      })
    }
  },
  /**
   * 取消收藏
   */
  cancelFavorites: function () {
    let article = this.data.article;
    let biao=article._id
    let userinfo = app.globalData.userInfo
    let nickname = userinfo.nickName
    wx.cloud.callFunction({
      name:"caozuo",
      data:{
        action:"deshoucang",
        username:nickname,
        biao:biao
      }
    }).then(res=>{
      this.setData({
        isAdd:false
      })
    }).catch(res=>{
      console.log("失败",res)
    })
  },
 
 
  //详情页面跳转
  goToDetail: function (e) {
    common.goToDetail(e.currentTarget.dataset.id)
  },
  /**
   * 获取评论
   */
  getComment(event){
    let that=this
    that.setData({
      content:event.detail.value
    })
  },
  /**
   * 发表评论
   */
sendComment(){
    let content=this.data.content
    if(content.length<3){
      wx.showToast({
        title: '评论太短了',
        icon:"none",
      })
      return
    }
    let pinglunItem={}
    let isLogin=app.globalData.isLogin
   
    if(isLogin){
      let userinfo = app.globalData.userInfo
      let nickName =userinfo.nickName
      let avatarUrl=userinfo.avatarUrl
    pinglunItem.name=nickName
    pinglunItem.content=content
    pinglunItem.avatarUrl=avatarUrl
    let pinglunArr=this.data.pinglun
    pinglunArr.push(pinglunItem)
    wx.showLoading({
      title: '发表中。。。',
    })
    wx.cloud.callFunction({
      name:"caozuo",
      data:{
        action:"sendComment",
        id:ID,
        pinglun: pinglunArr
      }
    }).then(res=>{
      this.setData({
        pinglun:pinglunArr,
        content:""
      })
      wx.hideLoading()
    }).catch(res=>{
      console.log("发表失败",res)
    })
  }else{
    wx.showToast({
      title: '请登录',
      icon: 'none',
    })
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
    let that=this
    return {
      title: '分享给你一部好视频',
      path: 'pages/videos/videos?id=' + that.data._id
    }
  }
})