<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Close } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

interface TagItem {
  title: string
  path: string
  fullPath: string
}

const visitedTags = ref<TagItem[]>([])

const addTag = () => {
  const { name, meta, path, fullPath } = route
  if (!name || !meta?.title) return

  const tag: TagItem = {
    title: meta.title as string,
    path,
    fullPath
  }

  if (!visitedTags.value.some(v => v.path === tag.path)) {
    visitedTags.value.push(tag)
  }
}

const removeTag = (tag: TagItem) => {
  const index = visitedTags.value.findIndex(v => v.path === tag.path)
  if (index === -1) return

  visitedTags.value.splice(index, 1)
  if (tag.path === route.path) {
    const lastTag = visitedTags.value[visitedTags.value.length - 1]
    if (lastTag) {
      router.push(lastTag.fullPath)
    } else {
      router.push('/')
    }
  }
}

watch(() => route.path, addTag, { immediate: true })
</script>

<template>
  <div class="app-tags">
    <el-scrollbar>
      <div class="tags-wrapper">
        <el-tag
          v-for="tag in visitedTags"
          :key="tag.path"
          :effect="route.path === tag.path ? 'dark' : 'plain'"
          closable
          @click="router.push(tag.fullPath)"
          @close.prevent="removeTag(tag)"
        >
          {{ tag.title }}
        </el-tag>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.app-tags {
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
}

.tags-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}

.el-tag {
  cursor: pointer;
  user-select: none;
}

.el-tag:first-child {
  margin-left: 15px;
}
</style>