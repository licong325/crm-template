import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@shared/stores'
import Layout from '@/layouts/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/home/index.vue'),
        meta: { title: '首页', keepAlive: true, showTabBar: true }
      },
      {
        path: 'customer',
        name: 'Customer',
        component: () => import('@/pages/customer/index.vue'),
        meta: { title: '客户', keepAlive: true, showTabBar: true }
      },
      {
        path: 'mine',
        name: 'Mine',
        component: () => import('@/pages/mine/index.vue'),
        meta: { title: '我的', showTabBar: true }
      }
    ]
  },
  // 客户管理
  {
    path: '/customer/detail/:id',
    name: 'CustomerDetail',
    component: () => import('@/pages/customer/detail.vue'),
    meta: { title: '客户详情' }
  },
  {
    path: '/customer/create',
    name: 'CustomerCreate',
    component: () => import('@/pages/customer/form.vue'),
    meta: { title: '新建客户' }
  },
  {
    path: '/customer/edit/:id',
    name: 'CustomerEdit',
    component: () => import('@/pages/customer/form.vue'),
    meta: { title: '编辑客户' }
  },
  // 系统管理 - 用户
  {
    path: '/system/user',
    name: 'SystemUser',
    component: () => import('@/pages/system/user/index.vue'),
    meta: { title: '用户管理' }
  },
  {
    path: '/system/user/detail/:id',
    name: 'SystemUserDetail',
    component: () => import('@/pages/system/user/detail.vue'),
    meta: { title: '用户详情' }
  },
  {
    path: '/system/user/add',
    name: 'SystemUserAdd',
    component: () => import('@/pages/system/user/form.vue'),
    meta: { title: '新增用户' }
  },
  {
    path: '/system/user/edit/:id',
    name: 'SystemUserEdit',
    component: () => import('@/pages/system/user/form.vue'),
    meta: { title: '编辑用户' }
  },
  // 系统管理 - 角色
  {
    path: '/system/role',
    name: 'SystemRole',
    component: () => import('@/pages/system/role/index.vue'),
    meta: { title: '角色管理' }
  },
  {
    path: '/system/role/detail/:id',
    name: 'SystemRoleDetail',
    component: () => import('@/pages/system/role/detail.vue'),
    meta: { title: '角色详情' }
  },
  {
    path: '/system/role/add',
    name: 'SystemRoleAdd',
    component: () => import('@/pages/system/role/form.vue'),
    meta: { title: '新增角色' }
  },
  {
    path: '/system/role/edit/:id',
    name: 'SystemRoleEdit',
    component: () => import('@/pages/system/role/form.vue'),
    meta: { title: '编辑角色' }
  },
  // 系统管理 - 部门
  {
    path: '/system/dept',
    name: 'SystemDept',
    component: () => import('@/pages/system/dept/index.vue'),
    meta: { title: '部门管理' }
  },
  {
    path: '/system/dept/detail/:id',
    name: 'SystemDeptDetail',
    component: () => import('@/pages/system/dept/detail.vue'),
    meta: { title: '部门详情' }
  },
  {
    path: '/system/dept/add',
    name: 'SystemDeptAdd',
    component: () => import('@/pages/system/dept/form.vue'),
    meta: { title: '新增部门' }
  },
  {
    path: '/system/dept/edit/:id',
    name: 'SystemDeptEdit',
    component: () => import('@/pages/system/dept/form.vue'),
    meta: { title: '编辑部门' }
  },
  // 404
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/pages/error/404.vue'),
    meta: { title: '页面不存在' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

// 白名单
const whiteList = ['/login', '/404']

// 路由守卫
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()

  // 设置标题
  document.title = `${to.meta.title || ''} - CRM`

  if (userStore.isLoggedIn) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router
