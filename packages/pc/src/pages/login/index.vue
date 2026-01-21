<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@shared/stores'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 表单数据
const loginForm = reactive({
  username: 'user1',
  password: '123456'
})

// 表单引用
const formRef = ref<FormInstance>()

// 加载状态
const loading = ref(false)

// 验证规则
const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

// 登录
const handleLogin = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    await userStore.login({
      username: loginForm.username,
      password: loginForm.password
    })
    ElMessage.success('登录成功')

    // 跳转
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (error) {
    ElMessage.error((error as Error).message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <!-- Logo -->
      <div class="login-header">
        <img src="/vite.svg" alt="logo" class="logo" />
        <h1 class="title">CRM 管理系统</h1>
        <p class="subtitle">企业级客户关系管理平台</p>
      </div>

      <!-- 表单 -->
      <el-form ref="formRef" :model="loginForm" :rules="rules" class="login-form" size="large">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="User" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            prefix-icon="Lock"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" class="login-btn" @click="handleLogin">
            登 录
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 底部 -->
      <div class="login-footer">
        <p>演示账号: user1 / 123456</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  .logo {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
  }

  .title {
    margin: 0 0 8px;
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }

  .subtitle {
    margin: 0;
    font-size: 14px;
    color: #999;
  }
}

.login-form {
  .login-btn {
    width: 100%;
  }
}

.login-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 12px;
  color: #999;

  p {
    margin: 0;
  }
}
</style>
