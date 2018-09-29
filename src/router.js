import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminView from './components/AdminView.vue'
import LoginView from './components/LoginView.vue'
import FileInput from './components/FileInput.vue'

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
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/import',
    name: 'import',
    component: FileInput,
  },
]

export default new VueRouter({
  mode: 'hash',
  routes,
})
