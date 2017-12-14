describe('Start page', function() {
  it('.should() - assert that <title> is correct', function() {
    cy.visit('http://localhost:3000');
    cy.title().should('include', 'GnoMe Syndicate');
  });
});
