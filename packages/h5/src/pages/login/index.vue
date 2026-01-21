<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@shared/stores'
import { showToast, showLoadingToast, closeToast } from 'vant'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: 'user1',
  password: '123456'
})

const handleLogin = async () => {
  if (!form.username) {
    showToast('请输入用户名')
    return
  }
  if (!form.password) {
    showToast('请输入密码')
    return
  }

  showLoadingToast({ message: '登录中...', forbidClick: true })

  try {
    await userStore.login(form)
    closeToast()
    showToast('登录成功')

    const redirect = (route.query.redirect as string) || '/'
    router.replace(redirect)
  } catch (error) {
    closeToast()
    showToast((error as Error).message || '登录失败')
  }
}
</script>

<template>
  <div class="login-page">
    <!-- Logo -->
    <div class="login-header">
      <img src="/vite.svg" alt="logo" class="logo" />
      <h1 class="title">CRM 移动端</h1>
      <p class="subtitle">企业级客户关系管理</p>
    </div>

    <!-- 表单 -->
    <div class="login-form">
      <van-cell-group inset>
        <van-field
          v-model="form.username"
          label="用户名"
          placeholder="请输入用户名"
          left-icon="user-o"
          clearable
        />
        <van-field
          v-model="form.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          left-icon="lock"
          clearable
        />
      </van-cell-group>

      <div class="login-btn-wrap">
        <van-button type="primary" block round @click="handleLogin">
          登 录
        </van-button>
      </div>

      <div class="login-tip">
        演示账号: user1 / 123456
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  padding: 60px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-header {
  text-align: center;
  margin-bottom: 48px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
}

.title {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 600;
  color: #fff;
}

.subtitle {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.login-form {
  padding: 24px 0;
}

.login-btn-wrap {
  padding: 24px 16px;
}

.login-tip {
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}
</style>
