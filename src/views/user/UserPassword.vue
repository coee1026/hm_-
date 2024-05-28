<script setup>
import { ref } from 'vue'
import { updatePassword } from '@/api/user'
import { ElMessage } from 'element-plus'

const passwords = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const oldAndnew = (rule, value, callback) => {
  if (value === passwords.value.old_pwd) {
    return callback(new Error('新密码和旧密码一致！'))
  }
  if (!/^\w{6,15}$/.test(value)) {
    return callback(new Error('密码应为6~15位字符！'))
  }
  callback()
}
const oldAndre = (rule, value, callback) => {
  if (value !== passwords.value.new_pwd) {
    return callback(new Error('两次输入密码不一致！'))
  }
  callback()
}
const rules = {
  old_pwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { validator: oldAndnew, trigger: 'blur' }
    // { pattern: /^\w{6,15}$/, message: '密码应为6~15位字符', trigger: 'blur' }
  ],
  re_pwd: [{ validator: oldAndre, trigger: 'blur' }]
}
const passwordRef = ref()
const changePassword = async () => {
  await passwordRef.value.validate()
  const res = await updatePassword(passwords.value)
  ElMessage.success(res.data.message)
  passwords.value = {
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
  }
}
</script>
<template>
  <el-container>
    <el-header><h2>重置密码</h2></el-header>
    <el-main>
      <el-form
        :model="passwords"
        :rules="rules"
        ref="passwordRef"
        style="max-width: 900px; margin-left: 30px"
        label-width="auto"
      >
        <el-form-item
          style="margin-bottom: 40px"
          label="原密码"
          label-position="Right"
          prop="old_pwd"
          ><el-input type="password" v-model.trim="passwords.old_pwd"></el-input
        ></el-form-item>
        <el-form-item
          style="margin-bottom: 40px"
          label="新密码"
          label-position="Right"
          prop="new_pwd"
          ><el-input type="password" v-model.trim="passwords.new_pwd"></el-input
        ></el-form-item>
        <el-form-item label="确认新密码" label-position="Right" prop="re_pwd"
          ><el-input type="password" v-model.trim="passwords.re_pwd"></el-input
        ></el-form-item>
      </el-form>
      <div class="button" style="margin: 60px 0 0 124px">
        <el-button type="primary" size="large" @click="changePassword"
          >修改密码</el-button
        >
        <el-button
          size="large"
          style="width: 80px"
          @click="passwords = { old_pwd: '', new_pwd: '', re_pwd: '' }"
          >重置</el-button
        >
      </div>
    </el-main>
  </el-container>
</template>
