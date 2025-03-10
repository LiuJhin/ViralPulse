<script setup lang="ts">
import { ref } from 'vue'
import { ElAside, ElContainer, ElHeader, ElMain } from 'element-plus'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import AppBreadcrumb from './components/AppBreadcrumb.vue'
import AppTags from './components/AppTags.vue'
import AppToolbar from './components/AppToolbar.vue'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()
const isCollapse = ref(false)

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <el-container class="layout-container" :class="{ 'is-dark': settingsStore.theme.isDark }">
    <el-header class="layout-header">
      <AppHeader @toggle-sidebar="toggleSidebar" />
    </el-header>
    <el-container class="layout-body">
      <el-aside :width="isCollapse ? '64px' : '200px'" class="layout-sidebar">
        <AppSidebar :is-collapse="isCollapse" />
      </el-aside>
      <el-container class="layout-content">
        <div class="layout-toolbar">
          <AppBreadcrumb v-if="settingsStore.layout.showBreadcrumb" />
          <AppToolbar />
        </div>
        <AppTags v-if="settingsStore.layout.showTags" />
        <el-main class="layout-main">
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
}

.layout-header {
  padding: 0;
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);
}

.layout-body {
  height: calc(100vh - 60px);
}

.layout-sidebar {
  background-color: #304156;
  transition: width 0.3s;
  overflow: hidden;
}

.layout-content {
  display: flex;
  flex-direction: column;
}

.layout-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);
}

.layout-main {
  padding: 20px;
  background-color: var(--el-bg-color-page);
  overflow-y: auto;
}

/* 页面切换动画 */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 暗色主题适配 */
.is-dark {
  color: var(--el-text-color-primary);
  background-color: var(--el-bg-color);
}
</style>