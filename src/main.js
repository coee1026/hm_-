import './assets/main.scss'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import persist from 'pinia-plugin-persistedstate'
import pinia from './stores'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router/index'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(pinia)
app.use(router)

app.mount('#app')
