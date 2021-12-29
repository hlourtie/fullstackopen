/* eslint-disable no-undef */
describe('testing a blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('Log in')
    cy.contains('name')
  })
  describe('testing the login functionalities', () => {
    it('testing the login fails', () => {
      cy.contains('Log into').click()
      cy.get('#name').type('bluehank')
      cy.get('#password').type('HelloWorld!')
      cy.get('#loginbutton').click()
      cy.contains('Wrong')
    })

    it('testing the login works', () => {
      cy.contains('Log into').click()
      cy.get('#name').type('bluehank')
      cy.get('#password').type('HelloWorld')
      cy.get('#loginbutton').click()
      cy.contains('logged in')
    })
  })
  describe('When logged in succesfully', () => {

    beforeEach(() => {
      cy.login({ username: 'bluehank', password: 'HelloWorld' })
    })

    it('A blog can be created', () => {
      cy.get('#new-for-button').click()
      cy.get('#author').type('hk rowling')
      cy.get('#title').type('hp at school')
      cy.get('#url').type('www.poudelard.com')
      cy.get('#new-note-submit-butt').click()
      cy.contains('rowling')
    })
    it('A blog can be liked', () => {
      cy.get('#new-for-button').click()
      cy.get('#author').type('hk rowling')
      cy.get('#title').type('hp at school')
      cy.get('#url').type('www.poudelard.com')
      cy.get('#new-note-submit-butt').click()
      cy.get('.viewButton').click()
      cy.get('.likebutton').click()
      cy.contains('likes 1')
    })
    it('A blog can be deleted', () => {
      cy.get('#new-for-button').click()
      cy.get('#author').type('hk rowling')
      cy.get('#title').type('hp at school')
      console.log(localStorage)
      cy.get('#url').type('www.poudelard.com')
      cy.get('#new-note-submit-butt').click()
      cy.get('.deleteButton').click()

    })
  })
})