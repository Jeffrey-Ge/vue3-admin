<template>
  <el-menu class="navbar" mode="horizontal">
    <Hamburger class="hamburger-container" :is-active="opened" @toggleClick="toggleSideBar" />
    <Breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <img :src="avatar ? avatar : '/img/logo.png'" class="user-avatar" />
      <span class="fs-14">科技科</span>
      <span class="loginOut" @click="loginOut">
        退出登录
      </span>
    </div>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'

const router = useRouter()
const store = useStore()
const opened = computed(() => store.state.app.sidebar.opened)
const avatar = computed(() => store.state.user.avatar)

const toggleSideBar = () => {
  store.dispatch('app/toggleSideBar')
}

const editPossword = () => {
  ElMessage.warning('请联系管理员')
}

const loginOut = () => {
  ElMessageBox.confirm('退出登录', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      store.dispatch('user/logout').then(() => {
        router.push('/login')
      })
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 64px;
  overflow: hidden;
  line-height: 64px;

  .hamburger-container {
    float: left;
    height: 64px;
    padding: 0 10px;
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  :deep(.right-menu) {
    display: flex;
    float: right;
    height: 100%;
    align-items: center;
    margin-right: 20px;
    &:focus {
      outline: none;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 50%;
      margin-right: 10px;
    }
    .loginOut{
      font-size: 14px;
      color: #97a8be;
      margin-left: 20px;
    }
  }
}
</style>
