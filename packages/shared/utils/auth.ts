/**
 * 认证相关工具
 */

import { getStorage, setStorage, removeStorage } from './storage'

const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refresh_token'

/**
 * 获取 Token
 */
export function getToken(): string | undefined {
  return getStorage<string>(TOKEN_KEY)
}

/**
 * 设置 Token
 */
export function setToken(token: string): void {
  setStorage(TOKEN_KEY, token)
}

/**
 * 移除 Token
 */
export function removeToken(): void {
  removeStorage(TOKEN_KEY)
}

/**
 * 获取刷新 Token
 */
export function getRefreshToken(): string | undefined {
  return getStorage<string>(REFRESH_TOKEN_KEY)
}

/**
 * 设置刷新 Token
 */
export function setRefreshToken(token: string): void {
  setStorage(REFRESH_TOKEN_KEY, token)
}

/**
 * 移除刷新 Token
 */
export function removeRefreshToken(): void {
  removeStorage(REFRESH_TOKEN_KEY)
}

/**
 * 清除所有认证信息
 */
export function clearAuth(): void {
  removeToken()
  removeRefreshToken()
}

/**
 * 检查是否已登录
 */
export function isLoggedIn(): boolean {
  return !!getToken()
}
