describe("Appointments", () => {
  beforeEach(() => {
    cy.request('GET','http://localhost:8001/api/debug/reset');
    cy.visit('/');
    cy.contains('Tuesday');
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save")
      .click();
  });

});
