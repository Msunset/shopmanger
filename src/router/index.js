import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Index from '@/components/index/index'
import UserList from '@/components/users/user'
import Role from '@/components/permissions/role'
import Permission from '@/components/permissions/permission'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: '',
      path: '/',
      component: Index,
      children: [
        {
          name: 'error',
          path: '/error',
          component: Error
        },
        {
          name: 'userList',
          path: '/userList',
          component: UserList
        },
        {
          name: 'role',
          path: '/role',
          component: Role
        },
        {
          name: 'permission',
          path: '/permission',
          component: Permission
        }]
    }
  ]
})
