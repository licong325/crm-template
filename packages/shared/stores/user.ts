import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo, LoginParams, LoginResult } from '../types'
import { setToken, setRefreshToken, clearAuth, getToken } from '../utils'
import { authApi } from '../api'

export const useUserStore = defineStore(
  'user',
  () => {
    // 状态
    const token = ref<string>(getToken() || '')
    const userInfo = ref<UserInfo | null>(null)

    // 计算属性
    const isLoggedIn = computed(() => !!token.value)
    const userId = computed(() => userInfo.value?.id || '')
    const username = computed(() => userInfo.value?.username || '')
    const nickname = computed(() => userInfo.value?.nickname || '')
    const avatar = computed(() => userInfo.value?.avatar || '')
    const roles = computed(() => userInfo.value?.roleNames || [])

    // 登录
    async function login(params: LoginParams): Promise<LoginResult> {
      const result = await authApi.login(params)
      token.value = result.token
      userInfo.value = result.userInfo

      // 保存到本地存储
      setToken(result.token)
      if (result.refreshToken) {
        setRefreshToken(result.refreshToken)
      }

      return result
    }

    // 获取用户信息
    async function getUserInfo(): Promise<UserInfo> {
      const info = await authApi.getUserInfo()
      userInfo.value = info
      return info
    }

    // 登出
    async function logout(): Promise<void> {
      try {
        await authApi.logout()
      } catch {
        // 即使接口失败也要清除本地状态
      } finally {
        resetState()
      }
    }

    // 重置状态
    function resetState(): void {
      token.value = ''
      userInfo.value = null
      clearAuth()
    }

    // 设置 Token
    function setUserToken(newToken: string): void {
      token.value = newToken
      setToken(newToken)
    }

    return {
      // 状态
      token,
      userInfo,
      // 计算属性
      isLoggedIn,
      userId,
      username,
      nickname,
      avatar,
      roles,
      // 方法
      login,
      getUserInfo,
      logout,
      resetState,
      setUserToken
    }
  },
  {
    persist: {
      key: 'crm_user',
      paths: ['token']
    }
  }
)
