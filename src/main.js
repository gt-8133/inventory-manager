import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import colors from 'vuetify/es5/util/colors'

// Paste your endpoint for the Simple API here.
// Info: https://github.com/graphcool-examples/vue-apollo-instagram-example#2-create-graphql-api-with-graphcool
const networkInterface = createNetworkInterface({ uri: "http://localhost:60000/simple/v1/cjllndxls00020107o32kr4h3"});

const apolloClient = new ApolloClient({
  networkInterface,
})

// Install the vue plugin
Vue.use(VueApollo)
Vue.use(Vuetify)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

// Start the app
new Vue({
  el: '#app',
  router,
  apolloProvider,
  render: h => h(App)
})
