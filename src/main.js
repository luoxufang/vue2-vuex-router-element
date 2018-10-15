// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
// import './assets/theme/theme-darkblue/index.css';
// import './assets/theme/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './store'

Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
// this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
//   this.$router.push({ path: '/' }); //登录成功之后重定向到首页
// }).catch(err => {
//   this.$message.error(err); //登录失败提示错误
// });

// LoginByUsername({ commit }, userInfo) {
//   const username = userInfo.username.trim()
//   return new Promise((resolve, reject) => {
//     loginByUsername(username, userInfo.password).then(response => {
//       const data = response.data
//       Cookies.set('Token', response.data.token) //登录成功后将token存储在cookie之中
//       commit('SET_TOKEN', data.token)
//       resolve()
//     }).catch(error => {
//       reject(error)
//     });
//   });
// }

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403');
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');
