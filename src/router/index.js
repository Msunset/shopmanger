import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Index from '@/components/index/index'
import UserList from '@/components/users/user'
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
      children:[{
        name:'userList',
        path:'/userList',
        component : UserList
      }]
    }
  ]
})
