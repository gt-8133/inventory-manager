<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      width="250"
      persistent
      :mini-variant="miniVariant"
      fixed
      app
    >
      <v-toolbar
        flat
        class="transparent"
        dense
        prominent
      >
        <v-list
          class="pa-0"
          :class="{'list-border-bottom' : miniVariant}"
        >
          <v-list-tile>
            <v-list-tile-action v-if="!miniVariant">
              <v-icon
                large
                color="primary"
              >dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content v-if="!miniVariant">
              <v-list-tile-title><h2>Inventory</h2></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                icon
                @click.stop="miniVariant = !miniVariant"
              >
                <v-icon>{{ miniVariant ? 'chevron_right' : 'chevron_left' }}</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider />

      <v-tooltip
        right
        :disabled="!miniVariant"
      >
        <v-toolbar
          slot="activator"
          flat
          class="transparent"
          dense
        >
          <v-list
            class="pa-0"
            :class="{'list-border-bottom' : miniVariant}"
          >
            <v-list-tile
              to="/"
              exact
            >
              <v-list-tile-action>
                <v-icon>home</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Home</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <span>Home</span>
      </v-tooltip>
      <v-divider />

      <v-list
        subheader
        :class="{'list-border-bottom' : miniVariant}"
      >
        <template>
          <v-tooltip
            v-for="(item,i) in drawerMenuItems"
            :key="i"
            right
            :disabled="!miniVariant"
          >
            <v-list-tile
              :key="item.icon"
              slot="activator"
              :to="item.link"
              exact
            >
              <v-list-tile-action>
                <v-icon> {{ item.icon }} </v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title" />
              </v-list-tile-content>
            </v-list-tile>
            <span
              v-text="item.title"
            />
          </v-tooltip>
        </template>
      </v-list>
      <v-divider />
    </v-navigation-drawer>

    <v-toolbar
      app
      dense
      color="primary"
      dark
      prominent
    >
      <v-toolbar-side-icon
        class="hidden-lg-and-up"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title>Inventory</v-toolbar-title>
      <v-spacer />

      <v-tooltip bottom>
        <v-btn
          slot="activator"
          icon
          @click.stop="rightDrawer = !rightDrawer"
        >
          <v-badge
            color="red"
            overlap
          >
            <span slot="badge">2</span>
            <v-icon>notifications</v-icon>
          </v-badge>
        </v-btn>
        <span>2 unread notifications</span>
      </v-tooltip>

      <v-menu
        bottom
        left
      >
        <v-btn
          slot="activator"
          icon
        >
          <v-avatar
            class="white"
            size="32"
          >
            <v-icon color="primary">person</v-icon>
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-avatar
                class="primary"
                size="48px"
              >
                <v-icon dark>person</v-icon>
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Doe</v-list-tile-title>
              <v-list-tile-sub-title>Administrator</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider />

          <v-list-tile key="profile">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My Profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider />

          <v-list-tile key="lock_open">
            <v-list-tile-action>
              <v-icon>lock_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
    <v-btn
      v-if="isMocked"
      fab
      dark
      color
      fixed
      bottom
      right
      @click="clearCache()"
    >
      <v-icon
        dark
        class="spin"
      >cached</v-icon>
    </v-btn>

  </v-app>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      drawer: false,
      drawerMenuItems: [
        {
          icon: 'assignment',
          title: 'Admin View',
          link: '/dashboard',
        },
      ],
      miniVariant: false,
      rightDrawer: false,
    }
  },
  computed: {
    isMocked() {
      return process.env.MOCKED
    },
  },
  methods: {
    clearCache() {
      window.localStorage.clear()
      this.$router.go({
        path: this.$router.path,
      })
    },
  },
}
</script>

<style scoped>
</style>
