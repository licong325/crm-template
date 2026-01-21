/**
 * 枚举常量
 */

// 状态
export const STATUS = {
  DISABLED: 0,
  ENABLED: 1
} as const

export const STATUS_TEXT: Record<number, string> = {
  [STATUS.DISABLED]: '禁用',
  [STATUS.ENABLED]: '启用'
}

// 性别
export const GENDER = {
  UNKNOWN: 0,
  MALE: 1,
  FEMALE: 2
} as const

export const GENDER_TEXT: Record<number, string> = {
  [GENDER.UNKNOWN]: '未知',
  [GENDER.MALE]: '男',
  [GENDER.FEMALE]: '女'
}

// 菜单类型
export const MENU_TYPE = {
  DIRECTORY: 'directory',
  MENU: 'menu',
  BUTTON: 'button'
} as const

export const MENU_TYPE_TEXT: Record<string, string> = {
  [MENU_TYPE.DIRECTORY]: '目录',
  [MENU_TYPE.MENU]: '菜单',
  [MENU_TYPE.BUTTON]: '按钮'
}

// 语言
export const LANGUAGE = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US'
} as const

// 主题
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
} as const
