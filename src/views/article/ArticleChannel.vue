<script setup>
import { ref } from 'vue'
import { getCate, delArticleCate } from '@/api/article'
import dialogCom from './components/dialogCate.vue'
const tableData = ref([])
const dialog = ref()
const loading = ref(false)

getCate().then((res) => {
  loading.value = true
  tableData.value = res.data.data
  loading.value = false
})
const addCate = () => {
  dialog.value.showDialog(false)
}
const handleEdit = (index, row) => {
  dialog.value.showDialog(true, row)
}
const handleDelete = async (index, row) => {
  loading.value = true
  const res = await delArticleCate(row.id)
  ElMessage({
    message: res.data.message,
    type: 'success'
  })
  const newtable = await getCate()
  tableData.value = newtable.data.data
  loading.value = false
}
const update = (newvalue) => {
  tableData.value = newvalue
}
</script>
<template>
  <el-container>
    <el-header
      style="
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        height: 40px;
        margin-bottom: 20px;
      "
    >
      <h2>文章分类</h2>
      <el-button type="primary" @click="addCate">添加分类</el-button>
    </el-header>
    <el-main>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="cate_name" label="分类名称" />
        <el-table-column prop="cate_alias" label="分类别名" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <dialogCom ref="dialog" @update-table="update"></dialogCom>
    </el-main>
  </el-container>
</template>
