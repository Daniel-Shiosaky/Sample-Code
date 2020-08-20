export function testManageButton(buttonElement, urlString1, urlString2) {
  // clicks the Manage button
  cy.on('uncaught:exception', () => false);
  cy.get(buttonElement)
    .should('be.visible')
    .and('contain', 'Manage')
    .click();

  if (urlString1) {
    const chain = cy.url()
      .should('include', urlString1);

    if (urlString2) chain.and('include', urlString2);
  }
}
export function testSetupButton(buttonElement, urlString1, urlString2) {
  // clicks the Manage button
  cy.on('uncaught:exception', () => false);
  cy.get(buttonElement)
    .should('be.visible')
    .and('contain', 'Set up')
    .click();

  if (urlString1) {
    const chain = cy.url()
      .should('include', urlString1);

    if (urlString2) chain.and('include', urlString2);
  }
}
export function testOptionsButton(btnelent) {
  // clicks the options button
  cy.get(btnelent)
    .should('be.visible')
    .and('contain', 'Options')
    .click();
  // checks that the options popup id displayed
  cy.get('#muiPopupBg')
    .should('be.visible');
  // checks that  error message is not displayed
  cy.get('.mui-error-section')
    .should('not.be.visible');
  // closes the popup
  cy.get('#closeX').click();

}
export function testManageAllLink(linkElement, urlString) {
  // clicks the Manage all button
  cy.on('uncaught:exception', () => false);
  cy.get(linkElement)
    .should('be.visible')
    .and('contain', 'Manage All')
    .click();
  cy.url()
    .should('include', urlString);
}
