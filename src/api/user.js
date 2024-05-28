import request from '@/utils/request'

// 获取用户个人信息
export const getUserInfo = () => {
  return request.get('/my/userinfo')
}
// 更新用户个人信息
export const updateInfo = (data) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data
  })
}
// 更新头像
export const updateAvatar = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: { avatar }
  })
}
// 更新密码
export const updatePassword = (data) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data
  })
}
