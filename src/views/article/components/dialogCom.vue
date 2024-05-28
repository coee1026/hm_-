<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { baseURL } from '@/utils/request'
import { ElMessage } from 'element-plus'
import axios from 'axios'

import { getArticleContent, pubArticle, updateArticle } from '@/api/article'
const drawer = ref(false)
const title = ref('添加文章')
// const imageUrl = ref('')
const dataRef = ref()
const data = ref({
  id: '',
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
})
const editRef = ref()
const imageUrl = ref('')
const showDrawer = async (row) => {
  data.value = {
    id: '',
    title: '',
    cate_id: '',
    content: '',
    cover_img: '',
    state: ''
  }
  imageUrl.value = ''
  drawer.value = true
  if (row.id) {
    title.value = '编辑文章'
    const res = await getArticleContent(row.id)
    data.value.id = res.data.data.id
    data.value.title = res.data.data.title
    data.value.cate_id = res.data.data.cate_id
    data.value.content = res.data.data.content
    data.value.state = res.data.data.state
    imageUrl.value = baseURL + res.data.data.cover_img
    data.value.cover_img = await imageUrlToFileObject(imageUrl.value)
  } else {
    title.value = '添加文章'
    editRef.value.setHTML('')
  }
}
const rules = {
  title: [
    { required: true, message: '标题不能为空', trigger: 'blur' },
    { pattern: /^\w{5,10}$/, message: '标题应为5~10位字符', trigger: 'blur' }
  ],
  cate_id: [{ required: true, message: '分类不能为空', trigger: 'blur' }],
  cover_img: [{ required: true, message: '请添加一个封面', trigger: 'change' }],
  content: [{ required: true, message: '内容不能为空', trigger: 'change' }]
}
// 将网络图片地址转化为文件对象
async function imageUrlToFileObject(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'blob' })
    const blob = response.data
    // 获取文件名
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1)
    // 创建File对象
    const file = new File([blob], fileName, { type: blob.type })
    return file
  } catch (error) {
    console.error('Error fetching image:', error)
    throw error
  }
}

defineProps({
  cateList: Array
})
// 文章发布或草稿
const publicArticle = async (state) => {
  await dataRef.value.validate()
  data.value.state = state
  const fd = new FormData()
  for (let key in data.value) {
    fd.append(key, data.value[key])
  }
  if (data.value.id) {
    await updateArticle(fd)
    ElMessage.success('更新成功')
  } else {
    await pubArticle(fd)
    ElMessage.success('添加成功')
  }
  drawer.value = false
}
const onSelectFile = (file) => {
  // 注意事项
  imageUrl.value = URL.createObjectURL(file.raw)
  data.value.cover_img = file.raw
}
defineExpose({ showDrawer })
</script>

<template>
  <el-drawer v-model="drawer" size="40%" :direction="direction">
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <div>
        <el-form :model="data" :rules="rules" ref="dataRef">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="data.title"></el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="cate_id">
            <el-select v-model="data.cate_id">
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :value="item.id"
                :label="item.cate_name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="文章封面" prop="cover_img">
            <el-upload
              class="avatar-uploader"
              :auto-upload="false"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-change="onSelectFile"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <div class="edit">
              <QuillEditor
                theme="snow"
                content-type="html"
                v-model:content="data.content"
                ref="editRef"
              />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="publicArticle('草稿')" type="success"
          >草稿</el-button
        >
        <el-button type="primary" @click="publicArticle('已发布')"
          >发布</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
