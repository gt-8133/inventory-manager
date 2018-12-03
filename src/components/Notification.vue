<template>
  <v-tooltip bottom>
    <v-btn slot="activator" icon @click.stop="rightDrawer = !rightDrawer">
      <v-badge :color="$store.getters.notificationUnreadCount ? 'red' : 'rgba(0,0,0,0)'" overlap>
        <span slot="badge" v-if="$store.getters.notificationUnreadCount">{{$store.getters.notificationUnreadCount}}</span>
        <v-icon>notifications</v-icon>
      </v-badge>
    </v-btn>
    <span>{{$store.getters.notificationUnreadCount}} unread notifications</span>
  </v-tooltip>
</template>
<script lang="ts">
import Vue from 'vue'
import io from 'socket.io-client'
import { mapState, mapGetters } from 'vuex';

const socket = io('http://localhost:3333')
console.log('socketio', socket)

export default Vue.extend({
  mounted() {
    this.$store.dispatch('fetchNotifications')
    socket.on('notification', () => {
      this.$store.dispatch('notification')
      console.log('NEW EVENT')

    })
  },
})
</script>
