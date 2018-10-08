import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routes = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
  // {
  //   path:'/',
  //   redirect:'/dashboard'//重定向
  // },
  {
    path: '/',
    name: 'HelloWorld',
    component: () => import('@/views/HelloWorld'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

export default routes;