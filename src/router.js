import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminView from './components/AdminView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: AdminView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AdminView,
  },
]

export default new VueRouter({
  mode: 'hash',
  routes,
})
