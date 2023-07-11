import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from '../router/index'
import './style.css'
import App from '../src/components/App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia);

app.use(router)
app.mount('#app')
