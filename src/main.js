import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createHead } from '@vueuse/head'

const thalaindApp = createApp(App)
thalaindApp.use(router)
thalaindApp.use(createHead())

// Base componernt logic
const requireComponent = require.context(
  './components',
  true,
  /App[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName =
    baseComponentConfig.name ||
    fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
  thalaindApp.component(baseComponentName, baseComponentConfig)
})

thalaindApp.mount('#app')
