import Vue from 'vue'
import Router from 'vue-router'
import user from './api/user'

Vue.use(Router)

function isLogged(to: any, from: any, next: { (): void; (url: string): void; }){
  if(user.isLogged()) {
    next();
  }else{
    next('/login');
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('./views/home.vue')
    },
    {
      path: '/app',
      beforeEnter: isLogged,
      name: 'Dashboard',
      redirect: '/app/dashboard',
      children: [
        { path: '/app/login',     component: require('./views/app/login.vue') },
        { path: '/app/dashboard', component: require('./views/app/dashboard.vue') },
        { path: '/app/income',    component: require('./views/app/income.vue') },
        { path: '/app/expenses',  component: require('./views/app/expenses.vue') },
        { path: '/app/settings',  component: require('./views/app/settings.vue') }
      ]
    },

    { path: '/login', redirect: '/app/login' },
    { path: '*', redirect: '/' },
    { path: '/app/*', redirect: '/app' }
  ]
})
