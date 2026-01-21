/**
 * 认证相关 API
 */
import { get, post } from './request'
import type { LoginParams, LoginResult, UserInfo, UserPermission } from '../types'

export const authApi = {
  /**
   * 登录
   */
  login(params: LoginParams): Promise<LoginResult> {
    return post<LoginResult>('/auth/login', params)
  },

  /**
   * 登出
   */
  logout(): Promise<void> {
    return post<void>('/auth/logout')
  },

  /**
   * 获取当前用户信息
   */
  getUserInfo(): Promise<UserInfo> {
    return get<UserInfo>('/auth/user-info')
  },

  /**
   * 获取用户权限 (菜单 + 按钮权限)
   */
  getPermissions(): Promise<UserPermission> {
    return get<UserPermission>('/auth/permissions')
  },

  /**
   * 刷新 Token
   */
  refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    return post('/auth/refresh-token', { refreshToken })
  },

  /**
   * 修改密码
   */
  changePassword(params: { oldPassword: string; newPassword: string }): Promise<void> {
    return post<void>('/auth/change-password', params)
  }
}
