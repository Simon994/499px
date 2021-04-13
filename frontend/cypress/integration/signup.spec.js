/// <reference types="Cypress" />

describe('Signup', () => {
  it('signup a new user from homepage hero-link', () => {
    const email = 'bobbybobbyson@email.com'
    const password = 'justvisiting'
    const firstName = 'bobby'
    const lastName = 'bobbyson'
    const username = 'bobbybobbyson'
    const fileName = 'test-avatar.jpg'

    cy.visit('http://localhost:3000/')

    cy.get('[data-cy=home-signup]')
      .click()
      .get('[data-cy=join-email-signup]')
      .click()

    //Fill in and submit the Signup form
    cy.get('[data-cy=signup-email]').type(email)
    cy.get('[data-cy=signup-password]').type(password)
    cy.get('form').submit()

    //attach a test pic as a fixture
    cy.get('input[type="file"]').invoke('removeAttr', 'class')
    cy.get('input[type="file"]').attachFile(fileName)

    // cy.fixture('test-avatar.png').then(fileContent => {
    //   cy.get('input[type="file"]').attachFile({
    //     fileContent: fileContent.toString(),
    //     fileName: 'test-avatar.png',
    //     mimeType: 'image/png'
    //   })
    // }) 


    //Fill in and submit the GetToLnow
    cy.get('[data-cy=gtk-first-name]').type(firstName)
    cy.get('[data-cy=gtk-last-name]').type(lastName)
    cy.get('[data-cy=gtk-username]').type(username)
    cy.get('form').submit()

  })
})