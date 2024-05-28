<script setup>
import { ref } from 'vue'
import { addArticleCate, putCate, getCate } from '@/api/article'
const dialogFormVisible = ref(false)
const form = ref({
  cate_name: '',
  cate_alias: ''
})
const title = ref('编辑分类')
const isAdd = ref(false)
const id = ref(0)
const showDialog = (flag, row) => {
  dialogFormVisible.value = true
  if (flag) {
    id.value = row.id

    isAdd.value = false
    title.value = '编辑分类'
    form.value.cate_name = row.cate_name
    form.value.cate_alias = row.cate_alias
  } else {
    isAdd.value = true
    form.value = {
      cate_name: '',
      cate_alias: ''
    }
    title.value = '添加分类'
  }
}
const formref = ref()
const emit = defineEmits(['updateTable'])
const changeCate = async () => {
  await formref.value.validate()
  if (isAdd.value) {
    const res = await addArticleCate(form.value)
    ElMessage({
      message: res.data.message,
      type: 'success'
    })
  } else {
    // console.log(id.value, '===', form.value, 'put')
    const res = await putCate(id, form.value.cate_name, form.value.cate_alias)
    console.log(res.data.message)
    ElMessage({
      message: res.data.message,
      type: 'success'
    })
  }
  dialogFormVisible.value = false
  const res = await getCate()
  emit('updateTable', res.data.data)
}
const rules = {
  cate_name: [
    { required: true, message: '分类名称不能为空', trigger: 'blur' },
    { pattern: /^\w{3,10}$/, message: '分类名称应为3~10位字符组成' }
  ],
  cate_alias: [
    { required: true, message: '分类别名不能为空', trigger: 'blur' },
    { pattern: /^\w{3,10}$/, message: '分类别名应为3~10位字符组成' }
  ]
}
defineExpose({
  showDialog
})
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="500">
    <el-form ref="formref" :model="form" :rules="rules">
      <el-form-item
        label="分类名称"
        prop="cate_name"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.cate_name"
          autocomplete="off"
          placeholder="请输入分类名称"
        />
      </el-form-item>
      <el-form-item
        label="分类别名"
        prop="cate_alias"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.cate_alias"
          autocomplete="off"
          placeholder="请输入分类别名"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="changeCate"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
