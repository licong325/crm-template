/**
 * 验证工具
 */

/**
 * 验证手机号
 */
export function isPhone(value: string): boolean {
  return /^1[3-9]\d{9}$/.test(value)
}

/**
 * 验证邮箱
 */
export function isEmail(value: string): boolean {
  return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)
}

/**
 * 验证身份证号
 */
export function isIdCard(value: string): boolean {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
}

/**
 * 验证 URL
 */
export function isUrl(value: string): boolean {
  return /^https?:\/\/.+/.test(value)
}

/**
 * 验证是否为空
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true
  }
  if (typeof value === 'string') {
    return value.trim() === ''
  }
  if (Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }
  return false
}

/**
 * 验证密码强度 (至少8位，包含大小写字母和数字)
 */
export function isStrongPassword(value: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
}

/**
 * 验证用户名 (4-16位字母、数字、下划线)
 */
export function isUsername(value: string): boolean {
  return /^[a-zA-Z0-9_]{4,16}$/.test(value)
}
