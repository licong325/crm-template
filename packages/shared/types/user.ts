/**
 * 用户信息
 */
export interface UserInfo {
  id: string
  username: string
  nickname: string
  avatar: string
  email: string
  phone: string
  gender: 0 | 1 | 2 // 0-未知 1-男 2-女
  status: 0 | 1 // 0-禁用 1-启用
  deptId: string
  deptName: string
  roleIds: string[]
  roleNames: string[]
  createTime: string
  lastLoginTime: string
}

/**
 * 登录请求参数
 */
export interface LoginParams {
  username: string
  password: string
  captcha?: string
  captchaId?: string
}

/**
 * 登录响应数据
 */
export interface LoginResult {
  token: string
  refreshToken: string
  expiresIn: number
  userInfo: UserInfo
}

/**
 * 部门信息
 */
export interface DeptInfo {
  id: string
  name: string
  parentId: string
  sort: number
  leader: string
  phone: string
  email: string
  status: 0 | 1
  children?: DeptInfo[]
}

/**
 * 角色信息
 */
export interface RoleInfo {
  id: string
  name: string
  code: string
  description: string
  status: 0 | 1
  sort: number
  menuIds: string[]
  createTime: string
}
