import request from '@/utils/request'
// 文章管理 获取文章列表
export const getArticle = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}
// 删除文章
export const deleteArticle = (id) => {
  return request({
    url: '/my/article/info',
    method: 'DELETE',
    params: { id }
  })
}

// 获取文章的分类
export const getCate = () => {
  return request.get('/my/cate/list')
}
// 增加文章分类
export const addArticleCate = (data) => {
  return request.post('/my/cate/add', data)
}
// 修改文章分类
export const putCate = (id, cate_name, cate_alias) => {
  console.log(id)
  const newId = Number(id.value)
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id: newId,
      cate_name,
      cate_alias
    }
  })
}
// 删除文章分类
export const delArticleCate = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: { id }
  })
}
// 发布文章
export const pubArticle = (data) => {
  // return request.post('/my/article/add', data)
  return request({
    url: '/my/article/add',
    method: 'POST',
    data
  })
}
// 更新文章
export const updateArticle = (data) => {
  return request({
    url: '/my/article/info',
    method: 'PUT',
    data
  })
}
// 获取文章详情
export const getArticleContent = (id) => {
  return request({
    url: '/my/article/info',
    params: { id }
  })
}
