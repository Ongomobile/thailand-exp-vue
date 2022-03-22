import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

const thalaindApp = createApp(App)
thalaindApp.use(router)
thalaindApp.mount('#app')
