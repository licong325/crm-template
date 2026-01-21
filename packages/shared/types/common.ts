/**
 * 选项类型
 */
export interface OptionItem {
  label: string
  value: string | number
  disabled?: boolean
  children?: OptionItem[]
}

/**
 * 字典项
 */
export interface DictItem {
  label: string
  value: string
  type: string
  sort: number
  status: 0 | 1
  remark?: string
}

/**
 * 树形结构基类
 */
export interface TreeNode {
  id: string
  parentId: string
  children?: TreeNode[]
}

/**
 * 操作日志
 */
export interface OperationLog {
  id: string
  userId: string
  username: string
  module: string
  action: string
  method: string
  url: string
  ip: string
  params?: string
  result?: string
  status: 0 | 1 // 0-失败 1-成功
  errorMsg?: string
  duration: number
  createTime: string
}
