/**
 * 系统管理 API
 */
import { get, post, put, del } from './request'
import type { UserInfo, RoleInfo, DeptInfo, PageResult } from '../types'

// ==================== 用户管理 ====================

/** 用户列表参数 */
export interface UserListParams {
  page?: number
  pageSize?: number
  keyword?: string
  status?: number
  deptId?: string
}

/** 获取用户列表 */
export function getUserList(params: UserListParams) {
  return get<PageResult<UserInfo>>('/system/users', params)
}

/** 获取用户详情 */
export function getUserDetail(id: string) {
  return get<UserInfo>(`/system/users/${id}`)
}

/** 创建用户 */
export function createUser(data: Partial<UserInfo>) {
  return post<void>('/system/users', data)
}

/** 更新用户 */
export function updateUser(id: string, data: Partial<UserInfo>) {
  return put<void>(`/system/users/${id}`, data)
}

/** 删除用户 */
export function deleteUser(id: string) {
  return del<void>(`/system/users/${id}`)
}

// ==================== 角色管理 ====================

/** 角色列表参数 */
export interface RoleListParams {
  page?: number
  pageSize?: number
  keyword?: string
  status?: number
}

/** 获取角色列表 */
export function getRoleList(params?: RoleListParams) {
  return get<PageResult<RoleInfo>>('/system/roles', params)
}

/** 获取角色详情 */
export function getRoleDetail(id: string) {
  return get<RoleInfo>(`/system/roles/${id}`)
}

/** 创建角色 */
export function createRole(data: Partial<RoleInfo>) {
  return post<void>('/system/roles', data)
}

/** 更新角色 */
export function updateRole(id: string, data: Partial<RoleInfo>) {
  return put<void>(`/system/roles/${id}`, data)
}

/** 删除角色 */
export function deleteRole(id: string) {
  return del<void>(`/system/roles/${id}`)
}

// ==================== 部门管理 ====================

/** 获取部门树 */
export function getDeptTree() {
  return get<DeptInfo[]>('/system/depts')
}

/** 获取部门详情 */
export function getDeptDetail(id: string) {
  return get<DeptInfo>(`/system/depts/${id}`)
}

/** 创建部门 */
export function createDept(data: Partial<DeptInfo>) {
  return post<void>('/system/depts', data)
}

/** 更新部门 */
export function updateDept(id: string, data: Partial<DeptInfo>) {
  return put<void>(`/system/depts/${id}`, data)
}

/** 删除部门 */
export function deleteDept(id: string) {
  return del<void>(`/system/depts/${id}`)
}

// ==================== 菜单管理 ====================

import type { MenuInfo } from '../types'

/** 获取菜单树 */
export function getMenuTree() {
  return get<MenuInfo[]>('/system/menus')
}
