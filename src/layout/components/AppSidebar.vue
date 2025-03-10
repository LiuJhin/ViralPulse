<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Menu,
  Location,
  Document,
  Setting,
  User,
  Monitor
} from '@element-plus/icons-vue'

defineProps({
  isCollapse: {
    type: Boolean,
    required: true
  }
})

const router = useRouter()
const activeMenu = ref('/dashboard')

const handleSelect = (key: string) => {
  router.push(key)
}
</script>

<template>
  <el-menu
    :default-active="activeMenu"
    class="sidebar-menu"
    :collapse="isCollapse"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    unique-opened
    router
    @select="handleSelect"
  >
    <el-menu-item index="/dashboard">
      <el-icon><Monitor /></el-icon>
      <template #title>仪表盘</template>
    </el-menu-item>

    <el-sub-menu index="/system">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/system/user">
        <el-icon><User /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
      <el-menu-item index="/system/role">
        <el-icon><User /></el-icon>
        <template #title>角色管理</template>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="/content">
      <template #title>
        <el-icon><Document /></el-icon>
        <span>内容管理</span>
      </template>
      <el-menu-item index="/content/article">
        <el-icon><Document /></el-icon>
        <template #title>文章管理</template>
      </el-menu-item>
      <el-menu-item index="/content/category">
        <el-icon><Menu /></el-icon>
        <template #title>分类管理</template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.sidebar-menu {
  height: 100%;
  border-right: none;
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 200px;
}

:deep(.el-menu-item) {
  height: 50px;
  line-height: 50px;
}

:deep(.el-sub-menu__title) {
  height: 50px;
  line-height: 50px;
}

:deep(.el-menu-item.is-active) {
  background-color: #263445 !important;
}

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  background-color: #263445 !important;
}
</style>