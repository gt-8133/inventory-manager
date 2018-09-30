/// <reference types="cypress"/>

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

Cypress.Commands.add('waitForActive', selector => cy.document().its('activeElement').should('match', selector).should('be.visible'))
Cypress.Commands.add('waitDemo', time => (Cypress.env('DEMO') ? cy.wait(time) : null))

if (Cypress.env('DEMO')) {
  console.log('demo mode');
  ['click', 'visit', 'type'].forEach((commandName) => {
    Cypress.Commands.overwrite(commandName, (originalFn, ...args) => {
      const a = args[0]
      // debugger
      if (a && a.get) {
        a[0].scrollIntoViewIfNeeded({ behavior: 'smooth' })
      }
      // debugger
      return new Promise(res => setTimeout(console.log('waiting') || res, 500)).then(() => originalFn(...args))
    })
  })


  // const origType = cy.type
  // cy.type = function (...args) {
  //   console.log(args)
  //   const defaults = {
  //     delay: 100,
  //   }
  //   args[1] = args[1] || {}
  //   args[1] = Object.assign({}, defaults, args[1])
  //   return origType.apply(this, args)
  // }

  Cypress.Commands.overwrite('type', (originalFn, ...args) => {
    console.log(args)
    const defaults = {
      delay: 100,
    }
    args[2] = args[2] || {}
    args[2] = Object.assign({}, defaults, args[2])
    return originalFn(...args)
  })

  afterEach(() => { cy.wait(2000) })

  beforeEach(() => {
    cy.on('window:load', (win) => {
    // const coverEl = win.document.createElement('div')
    // coverEl.className = 'cover-element'
    // coverEl.style.cssText = `
    //     position:fixed;
    //     background-color: salmon;
    //     width: 1000px;
    //     height: 1000px;
    //     z-index: 10000001;
    //   `

    // setTimeout(() => win.document.body.appendChild(coverEl), 300)
    })
    cy.on('window:before:load', (win) => {
    // const oldFn = win.HTMLElement.prototype.scrollIntoView
    // win.HTMLElement.prototype.scrollIntoView = function () {
    //   return oldFn.call(this, { behavior: 'smooth' })
    // }
      const style = win.document.createElement('style')
      const css = `
    // .cypress_touch_enter {
    //   opacity: 0.5;
    // }
    .cypress_touch_enter {
      opacity:0;
      transform: scale(0);
    }
    .cypress_touch_exit {
      opacity:0;
      // transform: scale(0);
    }
    `
      style.type = 'text/css'
      if (style.styleSheet) {
        style.styleSheet.cssText = css
      } else {
        style.appendChild(document.createTextNode(css))
      }

      win.document.head.appendChild(style)
      win.onclick = (e) => {
        const el = win.document.createElement('div')
        el.style.cssText = `
        position:fixed;
        top:${e.clientY - 10}px;
        left:${e.clientX - 10}px;
        background-color: darkgrey;
        width: 20px;
        height: 20px;
        z-index: 1000000;
        transition: all .2s;
        border-radius: 50%;
      `
        el.className = 'cypress_touch_enter'

        win.document.body.appendChild(el)
        // el.style.cssText += 'opacity: 1'
        setTimeout(() => el.className = '', 0)
        setTimeout(() => el.className = 'cypress_touch_exit', 200)
        setTimeout(() => el.remove(),
          1000)
      }
    })
  })
}
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

module.exports = {
  // waitForActive(selector) {
  //   return cy.document().its('activeElement').should('match', selector).should('be.visible')
  // },
}
