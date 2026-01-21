import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import pinia from '@shared/stores'
import { permissionDirective } from './directives/permission'

import './styles/index.scss'

// 启动 MSW Mock (仅开发环境)
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('../../../mock/browser')
    return worker.start({
      onUnhandledRequest: 'bypass' // 未匹配的请求直接放行
    })
  }
}

enableMocking().then(() => {
  const app = createApp(App)

  // 使用插件
  app.use(pinia)
  app.use(router)
  app.use(ElementPlus, { locale: zhCn })

  // 注册全局指令
  app.directive('permission', permissionDirective)

  // 挂载应用
  app.mount('#app')
})
