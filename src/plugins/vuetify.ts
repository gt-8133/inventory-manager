import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#052956',
    secondary: '#a18956',
    accent: '#b7a268',
    error: '#b71c1c',

    // navy: #052956
    // gold metallic: #a18956
    // tech gold: #b7a268
    // airbnb orange: #fd5c63
  },
})
