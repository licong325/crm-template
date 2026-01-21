<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@shared/stores'
import { asyncRoutes } from '@/router'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

// 获取菜单项
const menuList = computed(() => {
  return asyncRoutes.filter(item => !item.meta?.hidden)
})

// 当前激活的菜单
const activeMenu = computed(() => {
  return route.path
})

// 菜单点击
const handleMenuClick = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="sidebar" :class="{ collapsed: appStore.sidebarCollapsed }">
    <!-- Logo -->
    <div class="logo">
      <img src="/vite.svg" alt="logo" class="logo-img" />
      <span v-show="!appStore.sidebarCollapsed" class="logo-text">CRM 系统</span>
    </div>

    <!-- 菜单 -->
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="appStore.sidebarCollapsed"
        :collapse-transition="false"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
      >
        <template v-for="menu in menuList" :key="menu.path">
          <!-- 有子菜单 -->
          <el-sub-menu v-if="menu.children && menu.children.length > 1" :index="menu.path">
            <template #title>
              <el-icon v-if="menu.meta?.icon">
                <component :is="menu.meta.icon" />
              </el-icon>
              <span>{{ menu.meta?.title }}</span>
            </template>
            <el-menu-item
              v-for="child in menu.children"
              :key="child.path"
              :index="`${menu.path}/${child.path}`"
              @click="handleMenuClick(`${menu.path}/${child.path}`)"
            >
              <el-icon v-if="child.meta?.icon">
                <component :is="child.meta.icon" />
              </el-icon>
              <span>{{ child.meta?.title }}</span>
            </el-menu-item>
          </el-sub-menu>

          <!-- 单个菜单项 -->
          <el-menu-item
            v-else
            :index="menu.redirect || menu.path"
            @click="handleMenuClick(menu.redirect || menu.path)"
          >
            <el-icon v-if="menu.children?.[0]?.meta?.icon || menu.meta?.icon">
              <component :is="menu.children?.[0]?.meta?.icon || menu.meta?.icon" />
            </el-icon>
            <span>{{ menu.children?.[0]?.meta?.title || menu.meta?.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 220px;
  background-color: #304156;
  transition: width 0.3s;
  z-index: 1001;
  overflow: hidden;

  &.collapsed {
    width: 64px;
  }
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 16px;
  background-color: #2b3a4a;

  .logo-img {
    width: 32px;
    height: 32px;
  }

  .logo-text {
    margin-left: 12px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
  }
}

:deep(.el-menu) {
  border-right: none;
}
</style>
