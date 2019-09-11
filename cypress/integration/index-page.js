describe("index page", () => {
  beforeEach(() => {
    cy.log('visiting todolist app')
    cy.visit('/')
  })

  it('should load client', () => {
    expect('.todolist').to.exist
  })

  it('Does not do much!', function() {
    expect('#addmodal').to.exist
    cy.get('#addbutton').click()
    cy.get('.additem').click()

  })
})
