<script setup lang="ts">
import { useAppStore } from '@shared/stores'

const appStore = useAppStore()

// 应用主题
onMounted(() => {
  appStore.applyTheme()
})
</script>

<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
