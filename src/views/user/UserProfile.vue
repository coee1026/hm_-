<script setup>
import { updateInfo } from '@/api/user'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const userInfo = ref({})
// const getUsermes = async () => {
//   const res = await getUserInfo()
//   console.log(res.data.data)
//   userInfo.value = res.data.data
// }
const getUsermes = () => {
  userStore.setUserinfo()
  userInfo.value = userStore.userinfo
}
getUsermes()
const formRef = ref()
const rules = {
  nickname: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { pattern: /^\w{1,10}$/, message: '用户名应为1~10位字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    {
      pattern: /^\w+(@\w+)+(\.\w+)+$/,
      message: '该邮箱不合法',
      trigger: 'blur'
    }
  ]
}
const changeInfo = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    await updateInfo(userInfo.value)
    ElMessage.success('个人信息更新成功')
  }
}
</script>
<template>
  <el-container>
    <el-header><h2>基本资料</h2></el-header>
    <el-main style="padding-top: 30px">
      <el-form
        ref="formRef"
        :rules="rules"
        :model="userInfo"
        label-position="Right"
        label-width="auto"
        style="max-width: 900px; margin-left: 30px"
      >
        <el-form-item label="账号名" style="margin-bottom: 40px">
          <el-input
            placeholder="请输入账号名"
            v-model="userInfo.username"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="nickname"
          style="margin-bottom: 40px"
        >
          <el-input
            placeholder="请输入用户名"
            v-model="userInfo.nickname"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            placeholder="请输入邮箱"
            v-model="userInfo.email"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin: 60px 0 0 64px">
          <el-button type="primary" @click="changeInfo">提交修改</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
