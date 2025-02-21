import { createApp } from 'vue'
import 'virtual:uno.css'
import './style.css'
import { router } from './router'
import { pinia } from './store'
import App from './App.vue'

createApp(App).use(router).use(pinia).mount('#app')