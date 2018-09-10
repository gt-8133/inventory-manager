import Vue from "vue"
import App from "./App.vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.css"
import router from "./router"

import ApolloClient from "apollo-client"
import VueApollo from "vue-apollo"
import { InMemoryCache } from "apollo-cache-inmemory"
import { SchemaLink } from "apollo-link-schema"
import { createHttpLink, HttpLink } from "apollo-link-http";
import schemafile from "../schema.graphql"
import { makeExecutableSchema, addMockFunctionsToSchema, MockList, addResolveFunctionsToSchema } from "graphql-tools"
import { persistCache } from 'apollo-cache-persist'

let apolloClient

if (process.env.MOCKED) {
  const schema = makeExecutableSchema({ typeDefs: schemafile })

  const items = [
    {name:'Default Item', id:'111'}
  ]

  // "https://assets-cdn.github.com/images/icons/emoji/unicode/1f345.png?"
  const mocks = {
    DateTime: () => new Date(),
    Item: () => ({
      name: () => ['Awesome Item', 'Cool Item', 'Useful Item', 'Some object'][Math.round(Math.random()*3)],
      imageUrl: () =>
        "https://assets-cdn.github.com/images/icons/emoji/unicode/1f3"+Math.round(Math.random()*40+40)+".png?",
      quantityUnits: "count",
      reusable: false,
      quantity: ()=>Math.round(Math.random()*20)
    }),
    Query: () => ({
      allItems: () => items
    }),
    Mutation: () => ({
      createItem: (root, args, context, info)=>{
        console.log(args)
        items.push(args)
        return args
      }
    })
  }

  addMockFunctionsToSchema({
    schema,
    preserveResolvers: true,
    mocks
  })

  const cache = new InMemoryCache()
  
  // persistCache({
  //   cache,
  //   storage: window.localStorage
  // })

  apolloClient = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache
  })
} else {
  // Paste your endpoint for the Simple API here.
  // Info: https://github.com/graphcool-examples/vue-apollo-instagram-example#2-create-graphql-api-with-graphcool
  
  apolloClient = new ApolloClient({
    link: new HttpLink({uri: "http://localhost:60000/simple/v1/cjllndxls00020107o32kr4h3"}),
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
