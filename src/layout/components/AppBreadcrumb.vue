<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const breadcrumbs = ref([])

const getBreadcrumbs = () => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  breadcrumbs.value = matched.map(item => ({
    title: item.meta.title,
    path: item.path
  }))
}

watch(() => route.path, getBreadcrumbs, { immediate: true })
</script>

<template>
  <el-breadcrumb separator="/" class="app-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">
      首页
    </el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="item in breadcrumbs"
      :key="item.path"
      :to="{ path: item.path }"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>
.app-breadcrumb {
  margin: 15px 0;
  font-size: 14px;
}
</style>