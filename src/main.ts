import './styles/main.scss'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

import './assets/icons/iconfont.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createDiscreteApi } from 'naive-ui'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()).use(router)

app.mount('#app')

const { message } = createDiscreteApi(['message'])
// PWA
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        message.success("站点已更新，刷新后生效");
    })
}