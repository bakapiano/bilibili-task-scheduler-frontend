import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: () => import('../views/home.vue')},
        { path: '/login', component: () => import('../views/login.vue')},
    ]
})

export default router
