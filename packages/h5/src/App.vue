<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@shared/stores'

const appStore = useAppStore()

onMounted(() => {
  appStore.applyTheme()
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" />
  </router-view>
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
