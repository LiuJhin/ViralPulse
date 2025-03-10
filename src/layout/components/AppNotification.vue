<script setup lang="ts">
import { ref } from 'vue'
import { Bell } from '@element-plus/icons-vue'

interface Notification {
  id: number
  title: string
  content: string
  time: string
  read: boolean
}

const notifications = ref<Notification[]>([
  {
    id: 1,
    title: '系统通知',
    content: '欢迎使用 ViralPulse Admin 系统',
    time: '2024-01-01 12:00',
    read: false
  },
  {
    id: 2,
    title: '待办提醒',
    content: '您有一个新的待办任务需要处理',
    time: '2024-01-01 13:00',
    read: false
  }
])

const unreadCount = ref(2)

const markAsRead = (notification: Notification) => {
  notification.read = true
  unreadCount.value = notifications.value.filter(n => !n.read).length
}

const clearAll = () => {
  notifications.value.forEach(n => n.read = true)
  unreadCount.value = 0
}
</script>

<template>
  <el-popover
    placement="bottom"
    :width="300"
    trigger="click"
    popper-class="notification-popover"
  >
    <template #reference>
      <div class="notification-badge">
        <el-badge :value="unreadCount" :hidden="unreadCount === 0">
          <el-icon :size="20"><Bell /></el-icon>
        </el-badge>
      </div>
    </template>

    <template #default>
      <div class="notification-header">
        <span>通知中心</span>
        <el-button link type="primary" @click="clearAll">全部已读</el-button>
      </div>
      <el-scrollbar max-height="300px">
        <div v-if="notifications.length === 0" class="empty-text">
          暂无通知
        </div>
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ 'is-read': notification.read }"
          @click="markAsRead(notification)"
        >
          <div class="notification-title">{{ notification.title }}</div>
          <div class="notification-content">{{ notification.content }}</div>
          <div class="notification-time">{{ notification.time }}</div>
        </div>
      </el-scrollbar>
    </template>
  </el-popover>
</template>

<style scoped>
.notification-badge {
  cursor: pointer;
  padding: 0 8px;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #e6e6e6;
}

.notification-item {
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}

.notification-item:hover {
  background-color: #f5f7fa;
}

.notification-item.is-read {
  opacity: 0.6;
}

.notification-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.notification-content {
  font-size: 13px;
  color: #606266;
  margin-bottom: 4px;
}

.notification-time {
  font-size: 12px;
  color: #909399;
}

.empty-text {
  text-align: center;
  padding: 20px;
  color: #909399;
}
</style>