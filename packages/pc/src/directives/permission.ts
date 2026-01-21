/**
 * 权限指令
 * 用法: v-permission="'system:user:add'" 或 v-permission="['system:user:add', 'system:user:edit']"
 */
import type { Directive, DirectiveBinding } from 'vue'
import { usePermissionStore } from '@shared/stores'

export const permissionDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    const permissionStore = usePermissionStore()

    if (value) {
      const hasPermission = Array.isArray(value)
        ? permissionStore.hasAnyPermission(value)
        : permissionStore.hasPermission(value)

      if (!hasPermission) {
        el.parentNode?.removeChild(el)
      }
    }
  }
}
