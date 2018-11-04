import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import ApolloClient from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import faker from 'faker'
import {
  addMockFunctionsToSchema,
  makeExecutableSchema,
  MockList,
  mergeSchemas,
  // AddResolveFunctionsToSchema,
} from 'graphql-tools'
import * as _ from 'lodash'
import gql from 'graphql-tag'
import Promise from 'bluebird'
import schemafile from '../server/generated/schema.graphql'

function getEmojiUrl(offset) {
  return `https://assets-cdn.github.com/images/icons/emoji/unicode/1f3${offset}.png?`
}


export const createMockClient = () => {
  const schema1 = makeExecutableSchema({
    typeDefs: schemafile,
  })

  faker.seed(2)

  const mocks = {
    DateTime: (...args) => {
      if (args[3].operation.operation === 'mutation') {
        return new Date()
      }
      return faker.date.past(1)
    },
    Item: (...args) => _.defaults(args[1].data, {
      name: () => faker.commerce
        .productName()
        .split(' ')
        .slice(1)
        .join(' '),
      description: () => faker.lorem.paragraph(),
      imageUrl: () => getEmojiUrl(faker.random.number({ min: 41, max: 94 })),
      quantityUnits: 'count',
      reusable: false,
      quantity: () => faker.random.number(20),
      threshold: () => faker.random.number(20),
    }),

    Query: () => ({
      items: () => new MockList(20),
    }),
  }

  window.MockList = MockList
  window.mocks = mocks

  const event = new Event('mocks')
  window.dispatchEvent(event)

  addMockFunctionsToSchema({
    schema: schema1,
    preserveResolvers: true,
    mocks: window.mocks,
  })

  const schema2 = makeExecutableSchema({
    typeDefs: gql`
    type Query {
      dummy: String
    }
    type Mutation {
      authenticateUser(email:String!, password:String!): LoginResponse
    }
    type LoginResponse {
      token: String
    }
    `,
  })

  addMockFunctionsToSchema({
    schema: schema2,
    mocks: {
      LoginResponse: (...args) => Promise.resolve({
        token: args[1].email,
      }).delay(200),
    },
    preserveResolvers: true,
  })

  const schema = mergeSchemas({
    schemas: [schema1, schema2],
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
