/// <reference types="Cypress" />

describe('Page visit', () => {
  it('test url works', () => {
    cy.visit('http://localhost:3000/')
  })
})
describe('Homepage hero signup', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=home-signup]').click()
  })
  it('test signup link exists', () => {
  })
  it('test signup link directs to join page', () => {
    cy.location('pathname').should('equal', '/join')
  })
})