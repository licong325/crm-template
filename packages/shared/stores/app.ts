import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { LANGUAGE, THEME } from '../constants'

type LanguageType = (typeof LANGUAGE)[keyof typeof LANGUAGE]
type ThemeType = (typeof THEME)[keyof typeof THEME]

export const useAppStore = defineStore(
  'app',
  () => {
    // 状态
    const language = ref<LanguageType>(LANGUAGE.ZH_CN)
    const theme = ref<ThemeType>(THEME.LIGHT)
    const sidebarCollapsed = ref(false)
    const loading = ref(false)

    // 计算属性
    const isDark = computed(() => {
      if (theme.value === THEME.AUTO) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return theme.value === THEME.DARK
    })

    // 切换语言
    function setLanguage(lang: LanguageType): void {
      language.value = lang
    }

    // 切换主题
    function setTheme(newTheme: ThemeType): void {
      theme.value = newTheme
      applyTheme()
    }

    // 应用主题到 DOM
    function applyTheme(): void {
      const html = document.documentElement
      if (isDark.value) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }

    // 切换侧边栏
    function toggleSidebar(): void {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

    // 设置侧边栏状态
    function setSidebarCollapsed(collapsed: boolean): void {
      sidebarCollapsed.value = collapsed
    }

    // 设置全局 loading
    function setLoading(status: boolean): void {
      loading.value = status
    }

    return {
      // 状态
      language,
      theme,
      sidebarCollapsed,
      loading,
      // 计算属性
      isDark,
      // 方法
      setLanguage,
      setTheme,
      applyTheme,
      toggleSidebar,
      setSidebarCollapsed,
      setLoading
    }
  },
  {
    persist: {
      key: 'crm_app',
      paths: ['language', 'theme', 'sidebarCollapsed']
    }
  }
)
