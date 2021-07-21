// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if (event.action == 'sendComment') {  
    return await cloud.database()
      .collection("videos")
      .doc(event.id)
      .update({
        data: {
          pinglun: event.pinglun
        }
      })
      .then(res => {
        console.log("评论成功", res)
        return res
      })
      .catch(res => {
        console.log("评论失败", res)
        return res
      })
  } else if (event.action == "dianzan") {
    return await cloud.database()
      .collection('videos')
      .doc(event.id)
      .update({
        data: {
          zan: event.zan,
        }
      }).then(res => {
        console.log("点赞数量改变", res)
        return res
      })
      .catch(res => {
        console.log("点赞数量改变失败", res)
        return res
      })
  }else if (event.action == "isZan") {
    return await cloud.database()
      .collection('usersZan')
      .add({
        data: {
          dianzan:event.dianzan,
          username: event.username,
          zanArticle: event.zanArticle,
          biao: event.biao
        }
      }).then(res => {
        console.log("点赞成功", res)
        return res
      })
      .catch(res => {
        console.log("点赞失败", res)
        return res
      })
  }else if (event.action == 'noZan') {
    return await cloud.database()
      .collection('usersZan')
      .where({
        username: event.username
      }).where({
        biao: event.biao
      })
      .remove({
        sucess: res => {
          console.log("删除成功", res)
        },
        fail: res => {
          console.log("删除失败", res)
        }
      })
  }  else if (event.action == 'shoucang') {
    return await cloud.database()
      .collection('users')
      .add({
        data: {
          username: event.username,
          shoucang: event.shoucang,
          isAdd: event.isAdd,
          biao: event.biao
        }
      }).then(res => {
        console.log("收藏成功", res)
        return res
      })
      .catch(res => {
        return res
      })
  } else if (event.action == 'deshoucang') {
    return await cloud.database()
      .collection('users')
      .where({
        username: event.username
      }).where({
        biao: event.biao
      })
      .remove({
        sucess: res => {
          console.log("删除成功", res)
        },
        fail: res => {
          console.log("删除失败", res)
        }
      })
  } else if (event.action == 'shuliang') {
    return await cloud.database()
      .collection('videos')
      .doc(event.id)
      .update({
        data: {
          shuliang: event.shuliang
        }
      }).then(res => {

        return res
      })
      .catch(res => {

        return res
      })
  }
}