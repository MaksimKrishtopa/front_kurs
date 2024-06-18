import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import store from './store/auth'

createApp(App).use(router).use(store).mount('#app')
