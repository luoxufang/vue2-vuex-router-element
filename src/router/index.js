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
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    name: '',
    iconCls: 'el-icon-setting',
    leaf: true,//是否只有一个节点
    component: () => import('@/views/home'),
    children: [
      { path: '/noPublishGoods', component: () => import('@/views/publishGoods/noPublishGoods'), name: '发布商品' }
    ]
  },
  {
    path: '/yesPublishGoods',
    component: () => import('@/views/home'),
    name: '',
    iconCls: 'fa fa-cog',
    leaf: true,//只有一个节点
    children: [
      { path: '/yesPublishGoods', component: () => import('@/views/publishGoods/yesPublishGoods'), name: '已发布商品' }
    ]
  },
  {
    path: '/train',
    component: () => import('@/views/home'),
    name: '',
    iconCls: 'fa fa-truck',
    leaf: true,//只有一个节点
    children: [
      { path: '/train', component: () => import('@/views/train/train'), name: '团长培训' }
    ]
  },
  {
    path: '/manage',
    component: () => import('@/views/home'),
    name: '',
    iconCls: 'fa fa-user',
    leaf: true,//只有一个节点
    children: [
      { path: '/manage', component: () => import('@/views/manage/manage'), name: '团长管理' }
    ]
  }
]

export default routes;