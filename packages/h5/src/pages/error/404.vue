<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.replace('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="error-page">
    <van-empty
      image="error"
      image-size="160"
      description="页面不存在"
    >
      <template #description>
        <p class="error-code">404</p>
        <p class="error-text">抱歉，您访问的页面不存在</p>
      </template>
      <div class="btn-group">
        <van-button type="primary" round @click="goHome">返回首页</van-button>
        <van-button round @click="goBack">返回上页</van-button>
      </div>
    </van-empty>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7f8fa;
}

.error-code {
  font-size: 80px;
  font-weight: bold;
  color: #1989fa;
  margin: 0 0 8px;
  line-height: 1;
}

.error-text {
  font-size: 14px;
  color: #969799;
  margin: 0;
}

.btn-group {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}
</style>
