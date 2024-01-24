import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueClipboards from 'vue-clipboard2'

const app = createApp(App)
app.use(VueClipboards)
app.mount('#app')