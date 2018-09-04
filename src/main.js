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

if (process.env.NODE_ENV === "development") {
  const schema = makeExecutableSchema({ typeDefs: schemafile })
  const mocks = {
    DateTime: () => new Date(),
    Item: () => ({
      imageUrl: () =>
        "https://ci6.googleusercontent.com/proxy/do5FnTcqK32WISiaYRn9ScDNjuPxamEV2Q8Zwh3g1OqW2zkVHR0Pf4m2hWjGIOxTFaBdfiR1ur84aJrlCxDuX-vJ6FLIZrsmLvuedqu7uWlC_N0WdFkNJxitjQ=s0-d-e1-ft#https://assets-cdn.github.com/images/icons/emoji/unicode/1f389.png?v7",
      quantityUnits: "count"
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

// const query = `
// mutation createItem {
//   createItem(
//     description:"adf"
//     name: "ppp"
//     quantity: 3
//     quantityUnits: "count"
//     reusable:true
//   ){
//     name
//   }
// }
// `

// graphql(schema, query).then(result=>console.log('got result', result))

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
