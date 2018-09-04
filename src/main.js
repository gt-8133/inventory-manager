import Vue from "vue"
import App from "./App.vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.css"
import router from "./router"

import ApolloClient from "apollo-client"
import VueApollo from "vue-apollo"
import { InMemoryCache } from "apollo-cache-inmemory"
import { SchemaLink } from "apollo-link-schema"
import { createHttpLink } from "apollo-link-http";
import schemafile from "../schema.graphql"
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools"

let apolloClient

if (process.env.MOCKED) {
  const schema = makeExecutableSchema({ typeDefs: schemafile })
  const mocks = {
    DateTime: () => new Date(),
    Item: () => ({
      imageUrl: () =>
        "https://assets-cdn.github.com/images/icons/emoji/unicode/1f359.png?",
      quantityUnits: "count",
      quantity: ()=>Math.round(Math.random()*10)
      ,name: ()=>"Some random item"
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
    link: createHttpLink({uri: "http://localhost:60000/simple/v1/cjllndxls00020107o32kr4h3"}),
    cache: new InMemoryCache()
  })
}

Vue.use(VueApollo)
Vue.use(Vuetify)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

// Start the app
new Vue({
  el: "#app",
  router,
  apolloProvider,
  render: h => h(App)
})
