/**
 * API 响应基础类型
 */
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  page: number
  pageSize: number
}

/**
 * 分页响应数据
 */
export interface PaginationResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/**
 * 分页结果别名（兼容用法）
 */
export type PageResult<T> = PaginationResult<T>

/**
 * 列表查询参数基类
 */
export interface BaseListParams extends PaginationParams {
  keyword?: string
  startTime?: string
  endTime?: string
}
