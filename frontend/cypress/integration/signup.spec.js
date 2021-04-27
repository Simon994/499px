/// <reference types="Cypress" />

describe('Signup', () => {
  it('signup a new user from homepage hero-link', () => {
    const email = '6bobbybobbyson@email.com'
    const password = Cypress.env('password')
    const firstName = 'bobby'
    const lastName = 'bobbyson'
    const username = '6bobbybobbyson'
    const fileName = 'test-avatar.jpg'

    cy.exec('npm run flush-testdb')

    cy.visit('http://localhost:3000/')

    //Navigate to signup form
    cy.get('[data-cy=home-signup]')
      .click()
    cy.location('pathname').should('equal', '/join')
    cy.get('[data-cy=join-email-signup]')
      .click()
    cy.location('pathname').should('equal', '/signup')

    //Fill in and submit the Signup form
    cy.get('[data-cy=signup-email]').type(email)
    cy.get('[data-cy=signup-password]').type(password)
    cy.get('form').submit()
    cy.location('pathname').should('equal', '/gettoknow')

    //attach a test pic as a fixture and check it is uploaded
    cy.get('input[type="file"]').invoke('removeAttr', 'class')
    cy.get('input[type="file"]').attachFile(fileName)
    cy.get('[data-cy=uploaded-avatar]')

    //type registration info
    cy.get('[data-cy=gtk-first-name]').type(firstName)
    cy.get('[data-cy=gtk-last-name]').type(lastName)
    cy.get('[data-cy=gtk-username]').type(username)
    
    //Submit the GetToKnow form
    cy.get('form').submit()
    cy.location('pathname').should('equal', '/login')

  })
})