<script setup lang="ts">
import { ref } from 'vue'

const welcomeMessage = ref('欢迎使用 ViralPulse 管理系统')
</script>

<template>
  <div class="dashboard-container">
    <el-card class="welcome-card">
      <h2>{{ welcomeMessage }}</h2>
      <div class="dashboard-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card shadow="hover" class="data-card">
              <template #header>
                <div class="card-header">
                  <span>总用户数</span>
                </div>
              </template>
              <div class="card-value">128</div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" class="data-card">
              <template #header>
                <div class="card-header">
                  <span>今日活跃</span>
                </div>
              </template>
              <div class="card-value">45</div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" class="data-card">
              <template #header>
                <div class="card-header">
                  <span>系统消息</span>
                </div>
              </template>
              <div class="card-value">12</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.welcome-card {
  margin-bottom: 20px;
}

.dashboard-content {
  margin-top: 20px;
}

.data-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-value {
    font-size: 28px;
    font-weight: bold;
    color: #409EFF;
    text-align: center;
    padding: 20px 0;
  }
}
</style>