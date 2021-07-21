var common = require('../../utils/common.js')
const db = wx.cloud.database()
const videos = db.collection('videos')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateItems: [
      {
        cate_id: 1,
        cate_name: "电影相关",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '美剧',
              image: "http://ae01.alicdn.com/kf/H8ff80490e6c942ad9aaf99e616aa510aD.jpg"
            },
            {
              child_id: 2,
              name: '国产',
              image: "https://bkimg.cdn.bcebos.com/pic/267f9e2f070828388b356ad9ba99a9014d08f1c7?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg"
            },
            {
              child_id: 3,
              name: '韩剧',
              image: "https://bkimg.cdn.bcebos.com/pic/d833c895d143ad4b7b6849d08a025aafa40f065f?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg"
            },
            {
              child_id: 4,
              name: '日剧',
              image: "https://bkimg.cdn.bcebos.com/pic/bf096b63f6246b60fcccd5d6edf81a4c500fa256?x-bce-process=image/resize,m_lfit,w_220,h_220,limit_1"
            }
          ]
      },
      {
        cate_id: 2,
        cate_name: "电视剧",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '战争',
              image: "http://img0.imgtn.bdimg.com/it/u=3008048927,2154087899&fm=26&gp=0.jpg"
            },
            {
              child_id: 2,
              name: '仙侠',
              image: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2965482191,3091742796&fm=26&gp=0.jpg"
            },
            {
              child_id: 3,
              name: '朋克',
              image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1783997765,3179021384&fm=26&gp=0.jpg"
            },
            {
              child_id: 4,
              name: '武打',
              image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1808916037,199430899&fm=26&gp=0.jpg"
            },
            {
              child_id: 5,
              name: '黑帮',
              image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2283067573,653374976&fm=26&gp=0.jpg"
            },
            {
              child_id: 6,
              name: '都市',
              image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2926079853,1622518127&fm=15&gp=0.jpg"
            },
            {
              child_id: 7,
              name: '生活',
              image: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3991754071,2554450130&fm=26&gp=0.jpg"
            },
            {
              child_id: 8,
              name: '爱情',
              image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2362022280,2091765259&fm=26&gp=0.jpg"
            }
          ]
      },
      {
        cate_id: 3,
        cate_name: "纪录片",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '人物传记',
              image: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4240123927,2758277374&fm=15&gp=0.jpg"
            },
            {
              child_id: 2,
              name: '自然',
              image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4172664515,4149773060&fm=26&gp=0.jpg"
            },
            {
              child_id: 3,
              name: '科技',
              image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=814400522,3949755455&fm=26&gp=0.jpg"
            },
            {
              child_id: 4,
              name: '历史',
              image: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2662594914,416852371&fm=26&gp=0.jpg"
            }
          ]
      },
      {
        cate_id: 4,
        cate_name: "书评",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '科幻',
            image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3504023743,693776329&fm=26&gp=0.jpg"
          },
          {
            child_id: 2,
            name: '经典',
            image: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=218793208,4035660123&fm=26&gp=0.jpg"
          },
          {
            child_id: 3,
            name: '搞笑',
            image: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4197772651,269631634&fm=26&gp=0.jpg"
          },
          {
            child_id: 4,
            name: '情感',
            image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1410774458,3454185164&fm=26&gp=0.jpg"
          }
        ]
      }
    ],
    curNav: 1,
    curIndex: 0
  },
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
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