import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo } from '@/api/user'

export const useUserStore = defineStore(
  'big-event-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 用户个人信息
    const userinfo = ref({
      email: '',
      id: '',
      nickname: '',
      user_pic: '',
      username: ''
    })
    const setUserinfo = async () => {
      const {
        data: { data }
      } = await getUserInfo()
      userinfo.value.email = data.email
      userinfo.value.id = data.id
      userinfo.value.nickname = data.nickname
      userinfo.value.user_pic = data.user_pic
      userinfo.value.username = data.username
    }
    const removeUserinfo = () => {
      userinfo.value = {
        email: '',
        id: '',
        nickname: '',
        user_pic: '',
        username: ''
      }
    }
    return {
      // 登录信息
      token,
      setToken,
      // 用户个人信息
      userinfo,
      setUserinfo,
      removeUserinfo
    }
  },
  {
    persist: true
  }
)
