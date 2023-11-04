import { createRouter, createWebHistory } from 'vue-router'

import Master from '../views/master/master.vue'
import Home from '../views/home/home.vue'
import Users from '../views/users/users.vue'
import Roles from '../views/roles/roles.vue'
import UserRoles from '../views/user-roles/user-roles.vue'
import UserProfile from '../views/user-profile/user-profile.vue'
import Password from '../views/password/password.vue'
import Unauthorized from '../views/unauthorized/unauthorized.vue'
import NotFound from '../views/not-found/not-found.vue'
import { BaseInfoService } from '@/business'

export const routeNames: any = {
  login: 'login',
  home: 'home',
  users: 'users',
  roles: 'roles',
  userRoles: 'userRoles',
  userProfile: 'userProfile',
  password: 'password',
  unauthorized: 'unauthorized',
  notFound: 'notFound',
  about: 'about'
}

const getPath: Function = (hasHash: boolean = false) => (hasHash ? '/#' : '')
export const getRoutePaths: any = (hasHash = false): any => {
  return {
    home: getPath(hasHash) + '/home',
    login: getPath(hasHash) + '/login',
    users: getPath(hasHash) + '/users',
    roles: getPath(hasHash) + '/roles',
    userRoles: getPath(hasHash) + '/userroles',
    userProfile: getPath(hasHash) + '/userprofile',
    password: getPath(hasHash) + '/password',
    unauthorized: getPath(hasHash) + '/unauthorized',
    notFound: getPath(hasHash) + '/notfound'
  }
}
const exceptionList: string[] = [
  'unauthorized',
  'notFound',
  'login',
  'about',
  'home',
  'masterDefault'
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: Master,
      children: [
        {
          path: '',
          name: 'masterDefault',
          component: Home
        },
        {
          path: getRoutePaths(false)[routeNames.home],
          name: 'home',
          component: Home
        },
        {
          path: getRoutePaths(false)[routeNames.users],
          name: 'users',
          component: Users
        },
        {
          path: getRoutePaths(false)[routeNames.roles],
          name: 'roles',
          component: Roles
        },
        {
          path: getRoutePaths(false)[routeNames.userRoles],
          name: 'userRoles',
          component: UserRoles
        },
        {
          path: getRoutePaths(false)[routeNames.userProfile],
          name: 'userProfile',
          component: UserProfile
        },
        {
          path: getRoutePaths(false)[routeNames.password],
          name: 'password',
          component: Password
        },
        {
          path: getRoutePaths(false)[routeNames.unauthorized],
          name: 'unauthorized',
          component: Unauthorized
        },
        {
          path: getRoutePaths(false)[routeNames.notFound],
          name: 'notFound',
          component: NotFound
        },
        {
          path: '/unthorizationtest',
          name: 'unthorizationTest',
          component: Password
        },
        {
          path: ':catchAll(.*)',
          redirect: 'notFound'
        }
      ]
    },
    {
      path: getRoutePaths(false)[routeNames.about],
      name: 'about',
      component: () => import(/* webpackChunkName: "mix" */ '../views/about/about.vue')
    },
    {
      path: '/login/:url?',
      name: 'login',
      component: () => import(/* webpackChunkName: "mix" */ '../views/login/login.vue')
    },
    {
      path: '/',
      name: 'default',
      component: Master
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authorizationList: any = BaseInfoService.getAuthorization();
  const routeName: string = String(to.name);
  if ((!authorizationList || routeName && authorizationList.map((item: any) => item.routeName).indexOf(to.name) === -1)
    && exceptionList.indexOf(routeName) === -1) {
    if (to.name !== 'unauthorized') {
      next('/unauthorized');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
