import axios from 'axios'
import { useUserStore } from '@/stores'
// 弹窗组件
import { ElMessage } from 'element-plus'
//
import router from '@/router'
const instance = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    if (userStore.token) {
      // ElMessage({ message: 'hello', type: 'error' })
      config.headers.Authorization = userStore.token
      return config
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log(response)
    if (response.data.code === 0) {
      return response
    }
    // console.log(222)
    ElMessage({ message: response.data.message || '服务错误', type: 'error' })
    return Promise.reject(response.data)
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // console.log(error)
    if (!error.response) {
      ElMessage({
        message: error.message || '服务异常',
        type: 'error'
      })
    } else {
      ElMessage({
        message: error.response.data.message || '服务异常',
        type: 'error'
      })
    }

    // console.log(error)
    if (error.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
export const baseURL = 'http://big-event-vue-api-t.itheima.net'
