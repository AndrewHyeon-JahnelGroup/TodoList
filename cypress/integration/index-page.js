describe("index page", () => {
  beforeEach(() => {
    cy.log('visiting todolist app')
    cy.visit('/')
  })

  it('should load client', () => {
    expect('.todolist').to.exist
  })

  it('add, edit, and delete task', function() {
    cy.get('#addbutton').click()
    cy.get('#taskname').type('test')
    cy.get('#taskdesc').type('test descriptions')
    cy.get('.addbutton > .MuiButton-label').click()
    cy.get('.MuiListItemText-primary').contains('test')
    cy.get('.MuiListItemText-secondary').contains('test descriptions')
    cy.get('.deletebutton').click()
  })

  it('Completed checkbox should toggle strike through', () => {
    
  })

  // it('edit task', () => {
  //
  // }

  //server
  it('should respond success on when querying server for task list', () => {
    cy.request('GET', '/list')
      .then( (res) => {
        expect(res.status).to.equal(200)
      })
  })

  it('should respond success when adding task', () => {
    cy.request('POST', '/list')
      .then( (res) => {
        expect(res.status).to.equal(200)
      })
  })

  it('should respond success when editing task', () => {
    cy.request('POST', '/list/edit')
      .then( (res) => {
        expect(res.status).to.equal(200)
      })
  })

  it('should respond success when deleting task', () => {
    cy.request('POST', '/list/delete')
      .then( (res) => {
        expect(res.status).to.equal(200)
      })
  })
})
