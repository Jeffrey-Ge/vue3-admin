<template>
  <div class="sidebar-container">
    <div class="logo" @click="$router.push('/')">
      <img class="logo-img" :src="logoSrc" alt="logo" />
      <transition name="el-zoom-in-center">
        <h1 v-show="opened" class="logo-text">经开区企业联网直报系统</h1>
      </transition>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :router="true"
        :default-active="$route.path"
        :collapse="isCollapse"
        :show-timeout="200"
        background-color="#12171f"
        text-color="#ffffff"
        active-text-color="#0b82ff"
      >
        <SidebarItem v-for="item in routerList" :key="item.path" :index="item.path" :nav="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { constantRoutes } from '@/router'
import { getRoles } from '@/utils/auth'
import SidebarItem from './SidebarItem.vue'
import logoSrc from '@img/logo.png'

const roles = getRoles()
const store = useStore()
const routerList = reactive([])
const opened = computed(() => store.state.app.sidebar.opened)
const isCollapse = computed(() => !opened.value)

onMounted(() => {
  filterRoutes()
})

/**
 * 权限过滤路由
 */
const filterRoutes = () => {
  constantRoutes.forEach((item) => {
    if (item.path === '/') {
      routerList.push(...item.children)
    }
  })
  for (let i = 0; i < routerList.length; i++) {
    if (routerList[i].meta && routerList[i].meta.roles && !routerList[i].meta.roles.includes(roles)) {
      routerList.splice(i, 1)
      i--
    }
  }
  filterChildrens(routerList)
}

/**
 * 权限过滤子路由
 */
const filterChildrens = (routers) => {
  const childrens = []
  routers.forEach((item) => {
    if ((item.meta && !item.meta.roles) || (item.meta && item.meta.roles && item.meta.roles.includes(roles))) {
      childrens.push(item)
      if (item.children) {
        filterChildrens(item.children)
      }
    }
  })
  routers.length = 0
  routers.push(...childrens)
}
</script>

<style lang="scss" scoped="scoped">
.logo {
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  height: 64px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  background-color: #1f2329;
  align-items: center;

  .logo-img {
    width: 29px;
    height: 28px;
    margin-right: 12px;
    margin-left: 12px;
  }

  .logo-text {
    display: inline-block;
    height: 64px;
    font-size: 14px;
    line-height: 64px;
    color: #F5F5F5;
    font-weight: 600;
    margin: 0;
  }
}
</style>
