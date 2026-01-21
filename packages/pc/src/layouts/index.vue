<script setup lang="ts">
import { useAppStore } from '@shared/stores'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'

const appStore = useAppStore()
</script>

<template>
  <div class="layout" :class="{ 'sidebar-collapsed': appStore.sidebarCollapsed }">
    <!-- 侧边栏 -->
    <Sidebar />

    <!-- 主内容区 -->
    <div class="main-container">
      <!-- 顶部导航 -->
      <Navbar />

      <!-- 内容区 -->
      <AppMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;
  width: 100%;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-left: 220px;
  transition: margin-left 0.3s;
}

.sidebar-collapsed .main-container {
  margin-left: 64px;
}
</style>
