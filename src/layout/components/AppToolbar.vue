<script setup lang="ts">
import { ref } from 'vue'
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()
const isFullscreen = ref(false)

const handleRefresh = () => {
  window.location.reload()
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const toggleTheme = () => {
  settingsStore.toggleTheme()
}
</script>

<template>
  <div class="app-toolbar">
    <el-tooltip content="刷新页面" placement="bottom">
      <el-icon class="toolbar-icon" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>
    <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏显示'" placement="bottom">
      <el-icon class="toolbar-icon" @click="toggleFullscreen"><FullScreen /></el-icon>
    </el-tooltip>
    <el-tooltip content="主题设置" placement="bottom">
      <el-icon class="toolbar-icon" @click="toggleTheme"><Setting /></el-icon>
    </el-tooltip>
  </div>
</template>

<style scoped>
.app-toolbar {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 15px;
  height: 100%;
}

.toolbar-icon {
  font-size: 18px;
  cursor: pointer;
  color: #606266;
  transition: color 0.3s;
}

.toolbar-icon:hover {
  color: var(--el-color-primary);
}
</style>
