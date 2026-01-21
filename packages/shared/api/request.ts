/**
 * Axios 请求封装
 */
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import { getToken, clearAuth } from '../utils'
import { API_SUCCESS_CODE, HTTP_ERROR_MESSAGE, REQUEST_TIMEOUT, CONTENT_TYPE } from '../constants'
import type { ApiResponse } from '../types'

// 请求配置扩展
export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  showError?: boolean
}

// 创建 Axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': CONTENT_TYPE.JSON
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { code, message, data } = response.data

    // 业务成功
    if (code === API_SUCCESS_CODE) {
      return data as unknown as AxiosResponse
    }

    // 处理业务错误
    handleBusinessError(code, message)
    return Promise.reject(new Error(message || '请求失败'))
  },
  (error) => {
    handleHttpError(error)
    return Promise.reject(error)
  }
)

// 处理业务错误
function handleBusinessError(code: number, message: string): void {
  switch (code) {
    case 401:
      // Token 过期，清除登录状态
      clearAuth()
      // 触发未授权事件，由各端自行处理跳转
      window.dispatchEvent(new CustomEvent('unauthorized'))
      break
    case 403:
      console.error('没有权限访问')
      break
    default:
      console.error(message || '请求失败')
  }
}

// 处理 HTTP 错误
function handleHttpError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const message = HTTP_ERROR_MESSAGE[status || 0] || '网络请求失败'
    console.error(message)
  } else {
    console.error('网络请求失败')
  }
}

/**
 * 通用请求方法
 */
export async function request<T>(config: RequestConfig): Promise<T> {
  const response = await instance.request<T, T>(config)
  return response
}

/**
 * GET 请求
 */
export function get<T>(url: string, params?: object, config?: RequestConfig): Promise<T> {
  return request<T>({ ...config, method: 'GET', url, params })
}

/**
 * POST 请求
 */
export function post<T>(url: string, data?: object, config?: RequestConfig): Promise<T> {
  return request<T>({ ...config, method: 'POST', url, data })
}

/**
 * PUT 请求
 */
export function put<T>(url: string, data?: object, config?: RequestConfig): Promise<T> {
  return request<T>({ ...config, method: 'PUT', url, data })
}

/**
 * DELETE 请求
 */
export function del<T>(url: string, params?: object, config?: RequestConfig): Promise<T> {
  return request<T>({ ...config, method: 'DELETE', url, params })
}

export default instance
