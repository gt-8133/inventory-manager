import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import schemafile from '../schema.graphql'
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  MockList,
  addResolveFunctionsToSchema
} from 'graphql-tools'
import { persistCache } from 'apollo-cache-persist'
import * as _ from 'lodash'

import faker from 'faker'

export const createMockClient = () => {
  const schema = makeExecutableSchema({ typeDefs: schemafile })

  const mocks = {
    DateTime: () => new Date(),
    Item: (ctx, args, ctx2, info) => {
      console.log(ctx, args, ctx2, info)
      return _.defaults(args, {
        name: () =>
          faker.commerce
            .productName()
            .split(' ')
            .slice(1)
            .join(' '),
        // ['Awesome Item', 'Cool Item', 'Useful Item', 'Some object'][
        //   Math.round(Math.random() * 3)
        // ],
        description: () => faker.lorem.paragraph(),
        imageUrl: () => randomEmoji(),
        quantityUnits: 'count',
        reusable: false,
        quantity: () => faker.random.number(20) // Math.round(Math.random() * 20)
      })
    },

    Query: () => ({
      allItems: () => new MockList(10)
    })
  }

  addMockFunctionsToSchema({
    schema,
    preserveResolvers: true,
    mocks
  })

  const cache = new InMemoryCache()

  return persistCache({
    cache,
    storage: window.localStorage
  }).then(() => {
    return new ApolloClient({
      link: new SchemaLink({ schema }),
      cache
    })
  })
}

function randomEmoji() {
  return (
    'https://assets-cdn.github.com/images/icons/emoji/unicode/1f3' +
    Math.round(Math.random() * 40 + 40) +
    '.png?'
  )
}
