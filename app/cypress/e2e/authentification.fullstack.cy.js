describe('Smoke Test', () => {
  it('Can view the login page', () => {
    cy.visit('/')
    cy.contains('BOILERPLATE API-FLASK-REACT')
  })
  it('Authentification Error', () => {
    cy.visit('/')
    cy.get('#usermail').type('fabien.guntz@univ-lemans.fr')
    cy.get('#userpassword').type('test')
    cy.get('[data-testid=login-submit]').click()
    cy.contains('Invalid credentials')
  })
  it('Can authenticate', () => {
    cy.visit('/')
    cy.get('#usermail').type('fabien.guntz@univ-lemans.fr')
    cy.get('#userpassword').type('toto')
    cy.get('[data-testid=login-submit]').click()
    cy.contains('Home')
  })
})
