/**
 * 自定义函数--跳转浏览页
 */
//视频页面
function goToDetail(id){
  wx.navigateTo({
    url: '../video/video?id='+id,
  })
}
function goTodetail(id) {
  wx.navigateTo({
    url: '../detail/detail?keyword=' + id,
  })
}
//全部视频列表
function goToAllList(){
  wx.navigateTo({
    url: '../alllist/alllist',
  })
}
// 登录页面
function goToLogin(){
  wx.navigateTo({
    url: '../login/login',
  })
}
// 注册页面
function goToRegister(){
  wx.navigateTo({
    url: '../register/register',
  })
}
function gotoForget(){
  wx.navigateTo({
    url: '../forGet/forGet',
  })
}
//回到个人主页
function goToMy(){
  wx.reLaunch({
    url: '../my/my'
  })
}
//更多收藏
function goToFavMore(e){
  wx.navigateTo({
    url: '../favMore/favMore?loginName='+e
  })
}
// 反馈
function goToFeedBack(){
  wx.navigateTo({
    url: '../feedBack/feedBack'
  })
}
 module.exports ={
  goToDetail:goToDetail,
  goToAllList:goToAllList,
  goToMy:goToMy,
  goToLogin:goToLogin,
  goToRegister:goToRegister,
  goToFavMore:goToFavMore,
  gotoForget:gotoForget,
  goToFeedBack:goToFeedBack
 }
