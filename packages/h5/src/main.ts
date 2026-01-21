import { createApp } from 'vue'
import 'vant/lib/index.css'

import App from './App.vue'
import router from './router'
import pinia from '@shared/stores'

import './styles/index.css'

// 启动 MSW Mock (仅开发环境)
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('../../../mock/browser')
    return worker.start({
      onUnhandledRequest: 'bypass'
    })
  }
}

enableMocking().then(() => {
  const app = createApp(App)

  app.use(pinia)
  app.use(router)

  app.mount('#app')
})
