describe('Smoke Test', () => {
  it('Can view the login page', () => {
    cy.visit('/')
    cy.contains('BOILERPLATE API-FLASK-REACT')
  })
  it('Authentification Error', () => {
    cy.intercept('POST', 'http://localhost:5000/api/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' }
    })
    cy.visit('/')
    // cy.get('#usermail').type(email)
    // cy.get('#userpassword').type('test')
    cy.get('[data-testid=login-submit]').click()
    cy.contains('Invalid credentials')
  })
  it('Can authenticate', () => {
    cy.intercept('POST', 'http://localhost:5000/api/login', {
      statusCode: 200,
      body: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjgwNTkyMTkzLCJqdGkiOiIxY2JmZTc0ZC0wMTliLTQ2ODYtOGQ0YS0zODZkYmI0YTBlZTQiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2ODA1OTIxOTMsImV4cCI6MTY4MDU5MzA5MywiaXNfYWRtaW4iOnRydWV9.jUMTwSmG2j0Jo-gD8hIIRfQWJSzMBluPcDCmyfyoNow',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4MDU5MjE5MywianRpIjoiNjI4ZDM0ZWUtYTY4My00NDU0LTkwMWYtN2IyOGZhNjI0M2NjIiwidHlwZSI6InJlZnJlc2giLCJzdWIiOjEsIm5iZiI6MTY4MDU5MjE5MywiZXhwIjoxNjgzMTg0MTkzLCJpc19hZG1pbiI6dHJ1ZX0.HFoJmnkFWu71L9PimKJSQW3Q96qvKiv6fWnUpFOW0xI',
        user_id: 1
      }
    })
    cy.visit('/')
    // cy.get('#usermail').type('fabien.guntz@univ-lemans.fr')
    // cy.get('#userpassword').type('toto')
    cy.get('[data-testid=login-submit]').click()
    cy.contains('Home')
  })
})
