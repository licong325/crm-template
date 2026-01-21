/**
 * 本地存储工具
 */

const PREFIX = 'crm_'

/**
 * 设置本地存储
 */
export function setStorage<T>(key: string, value: T): void {
  try {
    const data = JSON.stringify(value)
    localStorage.setItem(PREFIX + key, data)
  } catch (error) {
    console.error('setStorage error:', error)
  }
}

/**
 * 获取本地存储
 */
export function getStorage<T>(key: string, defaultValue?: T): T | undefined {
  try {
    const data = localStorage.getItem(PREFIX + key)
    if (data) {
      return JSON.parse(data) as T
    }
    return defaultValue
  } catch (error) {
    console.error('getStorage error:', error)
    return defaultValue
  }
}

/**
 * 移除本地存储
 */
export function removeStorage(key: string): void {
  localStorage.removeItem(PREFIX + key)
}

/**
 * 清空本地存储 (仅清除带前缀的)
 */
export function clearStorage(): void {
  const keys = Object.keys(localStorage)
  keys.forEach(key => {
    if (key.startsWith(PREFIX)) {
      localStorage.removeItem(key)
    }
  })
}

/**
 * 设置会话存储
 */
export function setSessionStorage<T>(key: string, value: T): void {
  try {
    const data = JSON.stringify(value)
    sessionStorage.setItem(PREFIX + key, data)
  } catch (error) {
    console.error('setSessionStorage error:', error)
  }
}

/**
 * 获取会话存储
 */
export function getSessionStorage<T>(key: string, defaultValue?: T): T | undefined {
  try {
    const data = sessionStorage.getItem(PREFIX + key)
    if (data) {
      return JSON.parse(data) as T
    }
    return defaultValue
  } catch (error) {
    console.error('getSessionStorage error:', error)
    return defaultValue
  }
}

/**
 * 移除会话存储
 */
export function removeSessionStorage(key: string): void {
  sessionStorage.removeItem(PREFIX + key)
}
