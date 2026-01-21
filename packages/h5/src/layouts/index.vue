<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 是否显示 TabBar
const showTabBar = computed(() => route.meta.showTabBar)

// TabBar 配置
const tabBarItems = [
  { name: 'home', path: '/home', title: '首页', icon: 'home-o' },
  { name: 'customer', path: '/customer', title: '客户', icon: 'friends-o' },
  { name: 'mine', path: '/mine', title: '我的', icon: 'user-o' }
]

// 当前激活项
const activeTab = computed(() => route.name as string)

// 切换 Tab
const handleTabChange = (name: string | number) => {
  const item = tabBarItems.find(t => t.name === name)
  if (item) {
    router.push(item.path)
  }
}
</script>

<template>
  <div class="layout">
    <router-view />

    <!-- 底部 TabBar -->
    <van-tabbar
      v-if="showTabBar"
      v-model:model-value="activeTab"
      fixed
      placeholder
      safe-area-inset-bottom
      @change="handleTabChange"
    >
      <van-tabbar-item
        v-for="item in tabBarItems"
        :key="item.name"
        :name="item.name"
        :icon="item.icon"
      >
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100%;
  background-color: #f7f8fa;
}
</style>
