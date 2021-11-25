import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: {
      title: '401'
    }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: { title: '首页', icon: 'el-icon-s-home', affix: true }
      },
      {
        path: '/dataTransmit',
        component: () => import('@/views/home/index.vue'),
        name: 'DataTransmit',
        meta: { title: '数据报送', icon: 'el-icon-s-home' }
      },
      {
        path: '/historicalData',
        component: () => import('@/views/home/index.vue'),
        name: 'HistoricalData',
        meta: { title: '历史数据查询', icon: 'el-icon-s-home' }
      },
      {
        path: '/noticeManagement',
        component: () => import('@/views/setting/index.vue'),
        name: 'NoticeManagement',
        meta: { title: '通知管理', icon: 'el-icon-bell' }
      },
      {
        path: '/accountSetting',
        component: () => import('@/views/setting/index.vue'),
        name: 'AccountSetting',
        meta: { title: '账户设置', icon: 'el-icon-s-tools' }
      }
    ]
  }
]

export const asyncRoutes = []

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
