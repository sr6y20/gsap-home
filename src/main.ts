import './styles/main.scss'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

import './assets/icons/iconfont.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import autolog from "autolog.js";
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()).use(router)

app.mount('#app')

// PWA
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        autolog.log("站点已更新，刷新后生效", "success", 3000);
    })
}