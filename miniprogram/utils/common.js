/**
 * 自定义函数--跳转浏览页
 */
function goToDetail(id){
  wx.navigateTo({
    url: '../detail/detail?id='+id,
  })
}
 module.exports ={
  goToDetail:goToDetail
 }
