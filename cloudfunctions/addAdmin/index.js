// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.action == 'addAdmin') {   //注册
    return await cloud.database()
      .collection("admin")
      .add({
        data: {
          name:event.name,
          account:event.account,
          password:event.password,
          telNumber:event.telNumber
        }
      }).then(res => {
        console.log("添加账户成功", res)
        return res
      })
      .catch(res => {
        console.log("添加账户失败", res)
        return res
      })
  } else if (event.action == 'forgetAdmin') {   //找回密码
    return await cloud.database()
    .collection('admin')
    .doc(event.id)
    .update({
      data: {
        account:event.account,
        telNumber:event.telNumber
      }
    }).then(res => {
      console.log("找回密码成功", res)
      return res
    })
    .catch(res => {
      console.log("找回密码失败", res)
      return res
    })
  }

}