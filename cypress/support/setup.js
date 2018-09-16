/// <reference types="cypress"/>

const _ = require('lodash')
const faker = require('faker')

module.exports = {
  setup: () => {
    cy.viewport('iphone-6+')
    cy.visit('http://localhost:3000', {
      onBeforeLoad: (win) => {
        win.localStorage.clear()
        win.addEventListener('mocks', () => {
          faker.seed(2)
          win.mocks = {
            DateTime: () => new Date(0),
            Item: (...args) => {
              console.log(args)
              return _.defaults(args[1].data, {
                name: () => faker.commerce
                  .productName()
                  .split(' ')
                  .slice(1)
                  .join(' '),
                description: () => faker.lorem.paragraph(),
                imageUrl: () => faker.image.avatar(),
                quantityUnits: 'count',
                reusable: false,
                quantity: () => faker.random.number(20),
              })
            },

            Query: () => ({
              items: () => new win.MockList(20),
            }),
          }
        })
      },
    })
  },
}
