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
          name: 'users',
          path: '/users',
          component: UserList
        },
        {
          name: 'roles',
          path: '/roles',
          component: Role
        },
        {
          name: 'rights',
          path: '/rights',
          component: Permission
        }]
    }
  ]
})
