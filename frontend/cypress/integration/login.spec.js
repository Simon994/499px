/// <reference types="Cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=navbar-login]').click()
  })
  
  it('errors when invalid credentials are provided', () => {
    cy.get('[data-cy=email').type('justtypinganything')
    cy.get('[data-cy=password').type('justtypinganything')
    cy.get('form').submit()

    cy.contains('span', 'Please provide the correct details')
  })

  it('logs in when valid credentials are provided', () => {
    const email = '5bobbybobbyson@email.com'
    const password = Cypress.env('password')

    cy.get('[data-cy=email').type(email)
    cy.get('[data-cy=password').type(password)
    cy.get('form').submit()
    cy.location('pathname').should('equal', '/photoshome')
  })
})