<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue'
import AppNotification from './AppNotification.vue'

defineEmits(['toggle-sidebar'])
</script>

<template>
  <div class="app-header">
    <div class="left-section">
      <el-icon class="toggle-button" @click="$emit('toggle-sidebar')">
        <Fold />
      </el-icon>
      <h1 class="title">ViralPulse Admin</h1>
    </div>
    <div class="right-section">
      <AppNotification />
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="32" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          <span class="username">Admin</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.app-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.left-section {
  display: flex;
  align-items: center;
}

.toggle-button {
  font-size: 20px;
  cursor: pointer;
  margin-right: 15px;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.right-section {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin-left: 8px;
  font-size: 14px;
  color: #606266;
}
</style>