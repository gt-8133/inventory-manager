/// <reference types="cypress"/>

describe('Main', () => {
  after(() => new Promise(res => setTimeout(res, 1000)))
  beforeEach(() => {
    // cy.viewport('iphone-6')
  })
  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      win.localStorage.clear()
    })
  })
  describe('/dashboard', () => {
    beforeEach(() => cy.visit('http://localhost:3000'))
    it('can view items', () => {
      cy.get('tbody tr').should('have.length', 20)
    })
    it('can create item', () => {
      cy.get('tbody tr').should('have.length', 20)
      cy.contains('button', 'New Item').click()
      cy.waitForActive('input')
        .type('Mr mole')
        .tab()
        .type('asdf')
        .tab()
        .type('asdf')
        .tab()
        .type('foobar123')
      cy.get('[data-test="edit-image"]').click()
      cy.waitForActive('[data-test="imageUrl"]')
        .type(
          '{selectall}{del}http://images3.wikia.nocookie.net/__cb20120830122040/scratchpad/images/3/36/JamjarsBanjoTooie.png',
          { delay: 10 },
        )
        .type('{enter}')
    })
    it('can delete', () => {
      cy.get('tbody tr')
        .should('have.length', 20)
        .should('contain', 'Concrete Pizza')
      cy.contains('tr', 'Concrete Pizza')
        .find('[data-test="delete"]')
        .click()
      cy.get('tbody tr')
        .should('have.length', 19)
        .should('not.contain', 'Concrete Pizza')
    })
    it('can update', () => {
      cy.contains('tr', 'Concrete Pizza')
        .find('[data-test="edit"]')
        .click()
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
    it('can create an empty item', () => {
      cy.contains('button', 'New Item').click()
      cy.waitForActive('input')
        .type('{enter}')
      cy.get('tbody tr').should('have.length', 21)
        .eq(0).contains('0')
    })
  })
  describe('/login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/#/login')
    })
    it('can login', () => {
      cy.get('input').eq(0).type('foo@bar.com')
      cy.get('input').eq(1).type('password123')
      cy.contains('button', 'Login').click()
      cy.url().should('eq', 'http://localhost:3000/#/dashboard')
    })
  })

  describe('/scanner', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/#/scanner')
    })
    it('can scan items', () => {
      cy.waitDemo(1000)
      cy.window().then(win => win.scanQrCode('Concrete Chair'))
      cy.contains('.v-dialog', 'Concrete Chair')
      cy.contains('button', 'close').click()
      cy.get('section').contains('Concrete Chair')
      cy.waitDemo(1000)
      cy.window().then(win => win.scanQrCode('Wooden Computer'))
      cy.contains('.v-dialog', 'Wooden Computer')
      cy.contains('button', 'close').click()
      cy.get('section').contains('Concrete Chair')
        .get('section').contains('Wooden Computer')
    })
  })
})
