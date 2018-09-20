// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// @ts-ignore
const tabSequence = require('ally.js/query/tabsequence')

Cypress.Commands.add('tab', { prevSubject: 'optional' }, () => {
  const subject = cy.state('window').document.activeElement
  const seq = tabSequence({
    strategy: 'quick',
    includeContext: false,
    includeOnlyTabbable: true,
    context: cy.state('window').document.documentElement,
  })


  let ind = 0
  if (subject) {
    ind = seq.indexOf(subject)
    if (ind === seq.length || ind === -1) {
      ind = 0
    }
  }

  const newElm = seq[ind + 1]

  if (newElm.select) newElm.select()
  newElm.focus()
  return cy.wrap(newElm)
})
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

module.exports = {
  waitForActive(selector) {
    return cy.document().its('activeElement').should('match', selector)
  },
}