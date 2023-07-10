import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import './style.css'
import App from '../src/components/App.vue'
import router from '../router/index'

const app = createApp(App)

app.use(router)
app.mount('#app')
