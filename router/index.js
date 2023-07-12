import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Landing',
            component: () => import('../src/components/Landing.vue'),
            meta: {
                bodyClass: 'landing-body',
            },
        },
        {
            path: '/main',
            name: 'Main-page',
            component: () => import('../src/components/Main_page.vue'),
            meta: {
                bodyClass: 'main-body',
            },
        },
    ],
});

export default router;
