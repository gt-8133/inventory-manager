import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import Promise from 'bluebird'
import ApolloClient from 'apollo-client'
import VueApollo from 'vue-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { createMockClient } from './mock'
import router from './router'
import App from './App.vue'

const start = () => {
  Promise.try(() => {
    if (process.env.MOCKED) {
      return createMockClient()
    }
    // Paste your endpoint for the Simple API here.
    // Info: https://github.com/graphcool-examples/vue-apollo-instagram-example#2-create-graphql-api-with-graphcool
    return new ApolloClient({
      link: new HttpLink({
        uri: 'http://localhost:60000/simple/v1/cjllndxls00020107o32kr4h3',
      }),
      cache: new InMemoryCache(),
    })
  }).then((apolloClient) => {
    Vue.use(VueApollo)
    Vue.use(Vuetify, {
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

    const apolloProvider = new VueApollo({
      defaultClient: apolloClient,
    })

    return new Vue({
      el: '#app',
      router,
      apolloProvider,
      render: h => h(App),
    })
  }
  addMockFunctionsToSchema({
    schema,
    preserveResolvers: true,
    mocks
  })
  apolloClient = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache()
  })
} else {
  // Paste your endpoint for the Simple API here.
  // Info: https://github.com/graphcool-examples/vue-apollo-instagram-example#2-create-graphql-api-with-graphcool
  
  apolloClient = new ApolloClient({
    link: createHttpLink({uri: "http://localhost:4466"}),
    cache: new InMemoryCache()
  })
}

// Start the app

start()
