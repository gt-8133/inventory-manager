import Vue from 'vue'
import Vuex from 'vuex'
import { User } from 'server/entity/Entities'
import { UserSession } from 'server/models/models'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notifications: 0,
    user: null as UserSession | null
  },
  mutations: {
    eventNotification(state) {
      state.notifications++
    }
  },
  actions: {
    login({ commit, state }, user) {
      state.user = user
      commit('login')
    }
  }
})
