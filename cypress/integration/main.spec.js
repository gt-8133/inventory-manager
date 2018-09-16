/// <reference types="cypress"/>

const _ = require('lodash')
const faker = require('faker')

describe('Main', () => {
  beforeEach(() => {
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
  })
  it('can view items', () => {
    cy.get('tbody tr').should('have.length', 20)
  })
  it('can create item', () => {
    cy.get('tbody tr').should('have.length', 20)
    cy.contains('button', 'New Item').click()
    cy.window().should(win => win.document.activeElement.tagName === 'INPUT')
    cy.focused()
      .type('Mr mole')
      .tab()
      .type('asdf')
      .tab()
      .type('asdf')
      .tab()
      .type('foobar123')
    cy.get('[data-test="edit-image"]').click()
    cy.wait(200)
    cy.focused()
      .type(
        '{selectall}{del}https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fimages3.wikia.nocookie.net%2F__cb20120830122040%2Fscratchpad%2Fimages%2F3%2F36%2FJamjarsBanjoTooie.png&f=1',
      )
      .type('{enter}')
  })
  it('can delete', () => {
    cy.get('tbody tr')
      .should('have.length', 20)
      .should('contain', 'Concrete Pizza')
    cy.get('[data-test="delete"]')
      .eq(2)
      .click()
    cy.get('tbody tr')
      .should('have.length', 19)
      .should('not.contain', 'Concrete Pizza')
  })
  it('can update', () => {
    cy.get('[data-test="edit"]')
      .eq(2)
      .click()
    cy.wait(200)
    cy.tab()
      .tab()
      .type('NEW VALUE')
      .tab()
      .tab()
      .tab()
      .type('123456{enter}')
    cy.get('tbody tr')
      .should('have.length', 20)
      .should('not.contain', 'Concrete Pizza')
      .should('contain', 'NEW VALUE')
  })
})
