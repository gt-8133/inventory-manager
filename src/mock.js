import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import ApolloClient from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import faker from 'faker'
import {
  addMockFunctionsToSchema,
  makeExecutableSchema,
  MockList,
  // AddResolveFunctionsToSchema,
} from 'graphql-tools'
import * as _ from 'lodash'
import schemafile from '../server/generated/schema.graphql'

function randomEmoji() {
  return `https://assets-cdn.github.com/images/icons/emoji/unicode/1f3${Math.round(
    Math.random() * 40 + 40,
  )}.png?`
}

export const createMockClient = () => {
  const schema = makeExecutableSchema({ typeDefs: schemafile })

  const mocks = {
    DateTime: () => new Date(),
    Item: (...args) => {
      console.log(args)
      return _.defaults(args[1].data, {
        name: () => faker.commerce
          .productName()
          .split(' ')
          .slice(1)
          .join(' '),
        description: () => faker.lorem.paragraph(),
        imageUrl: () => randomEmoji(),
        quantityUnits: 'count',
        reusable: false,
        quantity: () => faker.random.number(20),
      })
    },

    Query: () => ({
      items: () => new MockList(10),
    }),
  }

  window.MockList = MockList
  window.mocks = mocks

  const event = new Event('mocks')
  window.dispatchEvent(event)

  addMockFunctionsToSchema({
    schema,
    preserveResolvers: true,
    mocks: window.mocks,
  })

  const cache = new InMemoryCache()

  return persistCache({
    cache,
    storage: window.localStorage,
  }).then(
    () => new ApolloClient({
      link: new SchemaLink({ schema }),
      cache,
    }),
  )
}
