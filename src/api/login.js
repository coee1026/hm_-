import requset from '@/utils/request'

// 注册
export const registerServer = (username, password, repassword) => {
  return requset({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}
// 登录
export const loginServer = (username, password) => {
  return requset({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
