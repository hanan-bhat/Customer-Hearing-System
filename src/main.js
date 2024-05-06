import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// createApp(App).mount('#app')

const app = createApp(App).provide('store', store)

app.use(router)

app.mount('#app')
