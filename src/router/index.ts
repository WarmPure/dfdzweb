import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
/* Layout */
import Layout from '@/layout/index.vue'
Vue.use(VueRouter)

export const constantRoutes: RouteConfig[] = [
    {
        path: '/',
        redirect: '/area'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/index',
        component: Layout,
        redirect: '/index',
        meta: {
            hidden: true
        },
        children: [
            {
                path: '/area',
                name: 'Area',
                component: () => import('@/views/Area/Index.vue'),
                meta: {
                    title: '小区管理',
                    icon: 'area',
                }
            },
            {
                path: '/house',
                name: 'House',
                component: () => import('@/views/House/Index.vue'),
                meta: {
                    title: '住户管理',
                    icon: 'house',
                }
            },
            {
                path: '/account',
                name: 'Account',
                component: () => import('@/views/Account/Index.vue'),
                meta: {
                    title: '账单管理',
                    icon: 'account',
                }
            },
            {
                path: '/service',
                name: 'Service',
                component: () => import('@/views/Service/Index.vue'),
                meta: {
                    title: '服务记录',
                    icon: 'service',
                }
            },
        ]
    },
]

const createRouter = () => new VueRouter({
    // model: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router as any
