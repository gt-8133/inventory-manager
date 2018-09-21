import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminView from './components/AdminView.vue'
import LoginView from './components/LoginView.vue'
import camera from './components/camera.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: camera,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AdminView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/camera',
    name: 'camera',
    component: camera,
  },
]

export default new VueRouter({
  mode: 'hash',
  routes,
})
