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


router.beforeEach((to, from, next) => {
    const bodyClasses = document.body.classList;

    // Remove previous body class
    if (from.meta.bodyClass) {
        bodyClasses.remove(from.meta.bodyClass);
    }

    // Add current body class
    if (to.meta.bodyClass) {
        bodyClasses.add(to.meta.bodyClass);
    }

    next();
});



app.use(router)
app.mount('#app')
