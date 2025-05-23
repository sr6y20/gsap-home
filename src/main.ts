import './styles/main.scss'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import './assets/icons/iconfont.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useMessage } from 'naive-ui'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// PWA
// if ("serviceWorker" in navigator) {
//     const message = useMessage()
//     navigator.serviceWorker.addEventListener('controllerchange', () => {
//         message.success("站点已更新，刷新后生效");
//     })
// }