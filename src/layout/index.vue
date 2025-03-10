<script setup lang="ts">
import { ref } from 'vue'
import { ElAside, ElContainer, ElHeader, ElMain } from 'element-plus'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'

const isCollapse = ref(false)
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <AppHeader @toggle-sidebar="toggleSidebar" />
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'" class="layout-sidebar">
        <AppSidebar :is-collapse="isCollapse" />
      </el-aside>
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
}

.layout-header {
  padding: 0;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
}

.layout-sidebar {
  background-color: #304156;
  transition: width 0.3s;
}

.layout-main {
  padding: 20px;
  background-color: #f0f2f5;
}
</style>