import { defineStore } from 'pinia'

interface ThemeConfig {
  primaryColor: string
  isDark: boolean
}

interface LayoutConfig {
  showSidebar: boolean
  sidebarWidth: number
  fixedHeader: boolean
  showBreadcrumb: boolean
  showLogo: boolean
  showTags: boolean
}

interface SettingsState {
  theme: ThemeConfig
  layout: LayoutConfig
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    theme: {
      primaryColor: '#409EFF',
      isDark: false
    },
    layout: {
      showSidebar: true,
      sidebarWidth: 210,
      fixedHeader: true,
      showBreadcrumb: true,
      showLogo: true,
      showTags: true
    }
  }),
  actions: {
    // 切换主题模式
    toggleTheme() {
      this.theme.isDark = !this.theme.isDark
      // 应用主题
      document.documentElement.classList.toggle('dark', this.theme.isDark)
    },
    // 更新主题色
    updatePrimaryColor(color: string) {
      this.theme.primaryColor = color
      // 应用主题色
      document.documentElement.style.setProperty('--el-color-primary', color)
    },
    // 更新布局配置
    updateLayout(layout: Partial<LayoutConfig>) {
      this.layout = { ...this.layout, ...layout }
    }
  },
  persist: true
})