import Vue from 'vue'
import Vuex from 'vuex'
import { User, Notification, Transaction } from 'server/entity/Entities'
import models from '../server/models/models'
// import { UserSession } from 'server/models/models'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null, // as UserSession | null
    events: [],
    items: [],
    notifications: [] as Notification[]
  },
  mutations: {
    load_notifications(state, notifications) {
      state.notifications = notifications
    },
    load_events(state, events) {
      state.events = events
    },
    load_items(state, items) {
      state.items = items
    }
  },
  getters: {
    notificationUnreadCount(state) {
      return state.notifications.filter(n => n.unread).length
    }
  },
  actions: {
    login({ commit, state }, user) {
      state.user = user
      commit('login')
    },
    async fetchEvents({ commit, state }) {
      const events = await models.getEvents()
      console.log('mounted item', events)
      commit('load_events', events)
    },
    async fetchItems({ commit, state }) {
      const items = await models.getItems()
      console.log('mounted item', items)
      commit('load_items', items)
    },
    async fetchNotifications({ commit, state }) {
      const notifications = await models.getNotifications()
      console.log('fetchNotificatoins', notifications)
      commit('load_notifications', notifications)
    },
    async notification({ dispatch }) {
      dispatch('fetchEvents')
      dispatch('fetchItems')
      dispatch('fetchNotifications')
    },
    async viewEvent({ dispatch, state }, id: Transaction['id']) {
      const notification = state.notifications.filter(
        v => v.transaction.id === id
      )
      if (notification.length) {
        await models.read(notification[0].id)
        await dispatch('notification')
      }
    }
  }
})
