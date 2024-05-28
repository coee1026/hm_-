<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { updateAvatar } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const uploadRef = ref()
const imageUrl = ref('')
imageUrl.value = userStore.userinfo.user_pic
const changeImg = (file) => {
  // imageUrl.value = URL.createObjectURL(file.raw)
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}
const loadImg = async () => {
  console.log(imageUrl.value)
  const res = await updateAvatar(imageUrl.value)
  ElMessage.success(res.data.message)
}
</script>
<template>
  <el-container>
    <el-header><h2>更换头像</h2></el-header>
    <el-main style="padding-top: 30px">
      <el-upload
        :on-change="changeImg"
        ref="uploadRef"
        style="width: 240px; height: 240px"
        class="avatar-uploader"
        :show-file-list="false"
        :auto-upload="false"
      >
        <img
          style="height: 240px; width: 240px"
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar"
        />
        <img
          style="height: 240px; width: 240px"
          v-else
          src="../../assets/avatar.jpg"
          alt=""
        />
      </el-upload>

      <div class="button" style="margin: 20px 0 0 6px">
        <el-button
          type="primary"
          @click="uploadRef.$el.querySelector('input').click()"
          :icon="Plus"
          >选择图片</el-button
        >
        <el-button type="success" :icon="Upload" @click="loadImg"
          >上传图片</el-button
        >
      </div>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped></style>
