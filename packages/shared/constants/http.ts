/**
 * HTTP 相关常量
 */

// API 成功状态码
export const API_SUCCESS_CODE = 0

// HTTP 状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
} as const

// HTTP 错误消息
export const HTTP_ERROR_MESSAGE: Record<number, string> = {
  [HTTP_STATUS.BAD_REQUEST]: '请求参数错误',
  [HTTP_STATUS.UNAUTHORIZED]: '登录已过期，请重新登录',
  [HTTP_STATUS.FORBIDDEN]: '没有权限访问',
  [HTTP_STATUS.NOT_FOUND]: '请求资源不存在',
  [HTTP_STATUS.INTERNAL_ERROR]: '服务器内部错误',
  [HTTP_STATUS.BAD_GATEWAY]: '网关错误',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: '服务不可用',
  [HTTP_STATUS.GATEWAY_TIMEOUT]: '网关超时'
}

// 请求超时时间 (ms)
export const REQUEST_TIMEOUT = 30000

// Content-Type
export const CONTENT_TYPE = {
  JSON: 'application/json',
  FORM: 'application/x-www-form-urlencoded',
  FORM_DATA: 'multipart/form-data'
} as const
