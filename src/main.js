import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import axios from 'axios'
import VueAxios from 'vue-axios'

const thalaindApp = createApp(App)
thalaindApp.use(router)
thalaindApp.use(VueAxios, axios)

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
