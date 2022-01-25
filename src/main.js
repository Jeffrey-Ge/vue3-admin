import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/packages/theme-chalk/src/base.scss'
import 'element-plus/lib/theme-chalk/index.css'
import './styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'
import locale from '@/utils/zh-cn.js'

import './permission' // permission control

const app = createApp(App)
app.use(ElementPlus, { locale })
app.use(router).use(store).mount('#app')

export default app
