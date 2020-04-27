import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('@/views/home/Home')
    },
    {
        path: '/publish',
        component: () => import('@/views/publish/Publish')
    },
    {
        path: '/article/:articleId',
        component: () => import('@/views/article/Article')
    },
    {
        path: '/sign_in',
        component: () => import('@/views/sign_in/SignIn')
    },
    {
        path: '/sign_up',
        component: () => import('@/views/sign_up/SignUp')
    },
    {
        path: '/uc',
        redirect: '/uc/profile',
        component: () => import('@/views/uc/UC'),
        children: [
            {
                path: 'profile',
                component: () => import('@/views/uc/profile/Profile')
            },
            {
                path: 'article',
                component: () => import('@/views/uc/articleManagement/ArticleManagement')
            },
            {
                path: 'favorite',
                component: () => import('@/views/uc/favorite/Favorite')
            },
            {
                path: 'follow',
                component: () => import('@/views/uc/follow/Follow')
            },
            {
                path: 'fans',
                component: () => import('@/views/uc/fans/Fans')
            },
            {
                path: 'my-tag',
                component: () => import('@/views/uc/myTag/MyTag')
            },
            {
                path: 'comment-notice',
                component: () => import('@/views/uc/commentNotice/CommentNotice')
            },
            {
                path: 'follow-notice',
                component: () => import('@/views/uc/followNotice/FollowNotice')
            },
            {
                path: 'good-notice',
                component: () => import('@/views/uc/goodNotice/GoodNotice')
            },
            {
                path: 'private-letter',
                component: () => import('@/views/uc/privateLetter/PrivateLetter')
            },
            {
                path: 'system-notice',
                component: () => import('@/views/uc/systemNotice/SystemNotice')
            },
            {
                path: 'ban-record',
                component: () => import('@/views/uc/banRecord/BanRecord')
            },
            {
                path: 'modify-password',
                component: () => import('@/views/uc/modifyPassword/ModifyPassword')
            },
            {
                path: 'modify-email',
                component: () => import('@/views/uc/modifyEmail/ModifyEmail')
            },
            {
                path: 'bind-account',
                component: () => import('@/views/uc/bindAccount/BindAccount')
            },
            {
                path: 'login-history',
                component: () => import('@/views/uc/loginHistory/LoginHistory')
            }
        ]
    },
    {
        path: '/user/:userId',
        component: () => import('@/views/user/User')
    },
    {
        path: '/reset-password/:userId?',
        component: () => import('@/views/resetPassword/ResetPassword')
    },
    {
        path: '/search',
        component: () => import('@/views/search/Search')
    },
    {
        path: '/qq_callback',
        component: () => import('@/views/qq/QQCallback')
    },
    {
        path: '/qq_signup',
        name: 'qq_signup',
        component: () => import('@/views/qq/QQSignUp')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
