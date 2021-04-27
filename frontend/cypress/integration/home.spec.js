/// <reference types="Cypress" />

describe('Page visit', () => {
  it('test url works', () => {
    cy.visit('http://localhost:3000/')
  })
})
describe('Homepage hero signup', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  it('test signup link exists', () => {
    cy.get('[data-cy=home-signup]').as('signup')
  })
  it('test signup link directs to join page', () => {
    cy.get('[data-cy=home-signup]').click()
    cy.location('pathname').should('equal', '/join')
  })
})