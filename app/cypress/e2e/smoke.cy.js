describe('Smoke Test', () => {
  it('Can view the home page', () => {
    cy.visit('/')
    cy.contains('BOILERPLATE API-FLASK-REACT')
  })
})
