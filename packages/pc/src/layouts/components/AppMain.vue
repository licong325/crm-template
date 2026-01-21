<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// 需要缓存的组件
const cachedViews = computed(() => {
  const views: string[] = []
  route.matched.forEach(item => {
    if (item.meta?.keepAlive && item.name) {
      views.push(item.name as string)
    }
  })
  return views
})
</script>

<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  padding: 16px;
  overflow: auto;
  background-color: #f0f2f5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
