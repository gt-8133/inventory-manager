import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false


import { init } from './browserServer'
 

async function start() {

  await init()

  console.log('init')
  
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
}

start()