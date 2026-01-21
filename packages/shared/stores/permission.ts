import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MenuInfo } from '../types'
import { authApi } from '../api'

export const usePermissionStore = defineStore('permission', () => {
  // 状态
  const menus = ref<MenuInfo[]>([])
  const permissions = ref<string[]>([])
  const isLoaded = ref(false)

  // 计算属性 - 扁平化的菜单列表
  const flatMenus = computed(() => {
    const result: MenuInfo[] = []
    const flatten = (items: MenuInfo[]) => {
      items.forEach(item => {
        result.push(item)
        if (item.children?.length) {
          flatten(item.children)
        }
      })
    }
    flatten(menus.value)
    return result
  })

  // 获取权限数据
  async function loadPermissions(): Promise<void> {
    if (isLoaded.value) return

    const result = await authApi.getPermissions()
    menus.value = result.menus
    permissions.value = result.permissions
    isLoaded.value = true
  }

  // 检查是否有权限
  function hasPermission(permission: string): boolean {
    // 超级管理员拥有所有权限
    if (permissions.value.includes('*')) {
      return true
    }
    return permissions.value.includes(permission)
  }

  // 检查是否有任一权限
  function hasAnyPermission(permissionList: string[]): boolean {
    return permissionList.some(p => hasPermission(p))
  }

  // 检查是否有所有权限
  function hasAllPermissions(permissionList: string[]): boolean {
    return permissionList.every(p => hasPermission(p))
  }

  // 重置状态
  function resetState(): void {
    menus.value = []
    permissions.value = []
    isLoaded.value = false
  }

  return {
    // 状态
    menus,
    permissions,
    isLoaded,
    // 计算属性
    flatMenus,
    // 方法
    loadPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    resetState
  }
})
