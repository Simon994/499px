/// <reference types="Cypress" />

describe('Page visit', () => {
  it('test url works', () => {
    cy.visit('http://localhost:3000/')
  })
  it('test signup link exists', () => {
    cy.get('[data-cy=home-signup]')
      .click()
  })
})