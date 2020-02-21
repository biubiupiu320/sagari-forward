import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: () => import('../views/home/Home')
    },
    {
        path: '/publish',
        component: () => import('../views/publish/Publish')
    },
    {
        path: '/article/:articleId',
        component: () => import('../views/article/Article')
    },
    {
        path: '/sign_in',
        component: () => import('../views/sign_in/SignIn')
    },
    {
        path: '/sign_up',
        component: () => import('../views/sign_up/SignUp')
    },
    {
        path: '/uc',
        redirect: '/uc/profile',
        component: () => import('../views/uc/UC'),
        children: [
            {
                path: 'profile',
                component: () => import('../views/uc/profile/Profile')
            },
            {
                path: 'article',
                component: () => import('../views/uc/article/MyArticle')
            },
            {
                path: 'favorite',
                component: () => import('../views/uc/favorite/Favorite')
            },
            {
                path: 'follow',
                component: () => import('../views/uc/follow/Follow')
            },
            {
                path: 'fans',
                component: () => import('../views/uc/fans/Fans')
            },
            {
                path: 'my-tag',
                component: () => import('../views/uc/myTag/MyTag')
            }
        ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
