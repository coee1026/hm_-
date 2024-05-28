<script setup>
import { getArticle, getCate } from '@/api/article'
import { ref } from 'vue'
import DialogCom from './components/dialogCom.vue'
import { formatTime } from '@/utils/format'
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const getArticleList = async () => {
  loading.value = true
  const res = await getArticle(params.value)
  tableData.value = res.data.data
  total.value = tableData.value.length
  loading.value = false
}
getArticleList()
const cateList = ref([])
const getCateList = async () => {
  const res = await getCate()
  cateList.value = res.data.data
  console.log(cateList.value)
}
getCateList()
const dialog = ref()
const handleEdit = async (index, row) => {
  dialog.value.showDrawer(row)
  await getArticleList()
}
const publish = async () => {
  dialog.value.showDrawer({})
  await getArticleList()
}
import { deleteArticle } from '@/api/article'
const centerDialogVisible = ref(false)
const id = ref(0)
const delArticle = async () => {
  deleteArticle(id.value)
  centerDialogVisible.value = false
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
  await getArticleList()
}
const handleDelete = (index, row) => {
  centerDialogVisible.value = true
  id.value = row.id
}
const reset = () => {
  params.value = {
    pagenum: 1,
    pagesize: 5,
    cate_id: '',
    state: ''
  }
}
const handleSizeChange = async (n) => {
  params.value.pagesize = n
  await getArticleList()
}
const handleCurrentChange = async (n) => {
  params.value.pagenum = n
  await getArticleList()
}
</script>

<template>
  <el-container>
    <el-header
      style="
        display: flex;
        justify-content: space-between;
        line-height: 100%;
        height: 30px;
      "
    >
      <h2>文章管理</h2>
      <div class="right">
        <el-button type="primary" @click="publish">发布文章</el-button>
      </div>
    </el-header>
    <el-main>
      <el-form inline>
        <el-form-item label="文章分类：">
          <el-select
            placeholder="请选择"
            style="width: 240px"
            v-model="params.cate_id"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.cate_name"
              size="large"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态：">
          <el-select style="width: 240px" size="large" v-model="params.state">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getArticleList">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="loading"
        :data="tableData"
        height="540px"
        style="width: 100%"
      >
        <el-table-column prop="title" label="文章标题" width="300" />
        <el-table-column prop="cate_name" label="分类" width="200" />
        <el-table-column prop="pub_date" label="发表时间">
          <template #default="{ row }">
            {{ formatTime(row.pub_date) }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" />
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
    </el-main>
    <el-footer>
      <DialogCom :cateList="cateList" ref="dialog"></DialogCom>
      <!--  -->
      <el-dialog v-model="centerDialogVisible" title="删除" width="500" center>
        <span> 确认删除？ </span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button @click="delArticle" type="primary"> 确认 </el-button>
          </div>
        </template>
      </el-dialog>
      <!--  -->
      <el-pagination
        style="justify-content: end"
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :page-sizes="[4, 8, 12]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-footer>
  </el-container>
</template>
