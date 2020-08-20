// <reference types='Cypress' />

before(() => {
  cy.login();
});

beforeEach(() => {
  cy.setupApiMocks();
  cy.stubProductGroups('domains');
  cy.stubEmptyQueryService();
  cy.stubSubscriptionsApi('single-domain');
  cy.navigate();
});

describe('domains section #godaddy', () => {
  it('displays the domain section and a domain properly', () => {
    cy.get('#Domains')
      .should('be.visible');

    cy.get('.product-label')
      .contains('happygolucky12345.net')
      .should('be.visible');

    cy.get('.btn_dns')
      .contains('DNS')
      .should('be.visible');
  });

  it('redirects to the correct url when clicking Manage All', () => {
    const linkElement = '.ux-card-title-nav';
    const urlString = 'https://dcc';

    cy.testManageAllLink(linkElement, urlString);
  });

  it('redirects to the correct url when clicking Manage', () => {
    const buttonElement = '.manage-setup';
    const urlString1 = 'https://dcc';
    const urlString2 = 'HAPPYGOLUCKY12345.NET/settings';
    // clicks the Manage button
    cy.testManageButton(buttonElement, urlString1, urlString2);
  });

  it('redirects to the correct url when clicking DNS', () => {
    cy.get('.btn_dns')
      .contains('DNS')
      .click();

    cy.url()
      .should('contain', 'https://dcc')
      .and('contain', 'HAPPYGOLUCKY12345.NET/dns');
  });
});
