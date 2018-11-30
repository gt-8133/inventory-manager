import Vue from 'vue'
import Router, { RouterOptions, RouteConfig } from 'vue-router'
import AdminView from './components/AdminView.vue'
import LoginView from './components/LoginView.vue'
import scanner from './components/scanner.vue'
import EventsView from './components/EventsView.vue'
Vue.use(Router)

const routes: RouteConfig[] = [
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
    path: '/scanner',
    name: 'scanner',
    component: scanner,
  },
  {
    path: '/events',
    name: 'events',
    component: EventsView,
  },
]

export default new Router({
  mode: 'hash',
  routes,
})
