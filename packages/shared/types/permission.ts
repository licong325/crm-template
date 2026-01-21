/**
 * 菜单类型
 */
export type MenuType = 'directory' | 'menu' | 'button'

/**
 * 菜单/权限信息
 */
export interface MenuInfo {
  id: string
  parentId: string
  name: string
  path?: string // 路由路径（按钮类型无需）
  component?: string // 组件路径（按钮类型无需）
  redirect?: string
  icon?: string
  sort: number
  type: MenuType
  permission?: string // 权限标识
  visible?: boolean // 是否显示（按钮类型无需）
  keepAlive?: boolean // 是否缓存（按钮类型无需）
  status: 0 | 1
  children?: MenuInfo[]
}

/**
 * 路由元信息
 */
export interface RouteMeta {
  title: string
  icon?: string
  keepAlive?: boolean
  permission?: string
  hidden?: boolean
  affix?: boolean // 是否固定在标签页
  breadcrumb?: boolean // 是否显示面包屑
}

/**
 * 用户权限信息
 */
export interface UserPermission {
  menus: MenuInfo[]
  permissions: string[] // 按钮权限标识列表
}
